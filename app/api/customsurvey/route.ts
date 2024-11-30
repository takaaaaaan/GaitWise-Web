import { NextRequest, NextResponse } from 'next/server'

import { getProjectIdByName } from '@/db/actions/project/fetch'
import { CustomSurvey, dbConnect, Project } from '@/db/models'

/**
 * @description customsurvey ルートの GET リクエストハンドラ
 * - CustomSurvey 데이터를 가져오는 데 사용됨
 * - project_name 또는 surveyid를 사용하여 데이터를 가져옴
 * - project_name이 제공되면 해당 프로젝트의 모든 설문을 가져옴
 * - surveyid가 제공되면 해당 설문을 가져옴
 * @param req
 * @returns
 */
export async function GET(req: NextRequest) {
  try {
    // リクエストから project_name と surveyid を取得
    const project_name = req.nextUrl.searchParams.get('project_name')
    const surveyid = req.nextUrl.searchParams.get('surveyid')

    // MongoDB に接続
    await dbConnect()

    // surveyid が指定されている場合
    if (surveyid) {
      console.log('surveyid:', surveyid)

      // CustomSurvey コレクションから _id または surveyid で検索
      const survey = await CustomSurvey.findOne({
        $or: [{ _id: surveyid }, { surveyid }],
      }).lean()

      if (!survey) {
        return NextResponse.json(
          {
            success: false,
            message: 'Survey not found',
          },
          { status: 404 }
        )
      }

      // 成功レスポンス
      return NextResponse.json(
        {
          success: true,
          Responsetype: 'surveyid',
          message: 'Survey retrieved successfully',
          data: survey,
        },
        { status: 200 }
      )
    }

    // project_name が指定されている場合
    if (project_name) {
      console.log('API data project_name:', project_name)

      // project_name から projectid を取得
      const projectId = await getProjectIdByName(project_name)

      if (!projectId) {
        console.log('Project not found')
        return NextResponse.json(
          {
            success: false,
            message: 'Project not found',
          },
          { status: 405 }
        )
      }

      const projectdata = await Project.findOne({ _id: projectId }).populate('creator').populate('custom_survey').lean()

      console.log('API projectdata:', projectdata)

      if (!projectdata) {
        console.log('Project data not found')
        return NextResponse.json(
          {
            success: false,
            message: 'Project data not found',
          },
          { status: 404 }
        )
      }

      // CustomSurvey コレクションから projectid を持つドキュメントを検索
      const surveys = await CustomSurvey.find({ projectid: projectId }).lean()

      if (!surveys || surveys.length === 0) {
        return NextResponse.json(
          {
            success: false,
            message: 'No surveys found for the given project',
          },
          { status: 404 }
        )
      }

      // 成功レスポンス
      return NextResponse.json(
        {
          success: true,
          Responsetype: 'project_name',
          message: 'Surveys retrieved successfully',
          data: surveys,
          projectdata: projectdata,
        },
        { status: 200 }
      )
    }

    // project_name も surveyid も指定されていない場合
    return NextResponse.json(
      {
        success: false,
        message: 'Either surveyid or project_name is required',
      },
      { status: 400 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    )
  }
}

/**
 * @description customsurvey ルートの POST リクエストハンドラ
 *  - CustomSurvey에 편집 된 데이터 저장용 (선택, 텍스트 응답 가공 기능 포함)
 * @param req
 * @returns
 */
export async function PUT(req: NextRequest) {
  try {
    // MongoDB に接続
    await dbConnect()

    // リクエストから surveyid を取得
    const surveyid = req.nextUrl.searchParams.get('surveyid')

    if (!surveyid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Survey ID is required',
        },
        { status: 400 }
      )
    }

    // リクエストボディを解析
    const body = await req.json()
    console.log('body.selection', body.selection)
    console.log('body.text_response', body.text_response)

    if (!body || Object.keys(body).length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'Request body cannot be empty',
        },
        { status: 400 }
      )
    }

    // surveyid を使って CustomSurvey を更新
    const updatedSurvey = await CustomSurvey.findOneAndUpdate(
      { $or: [{ _id: surveyid }, { surveyid }] }, // _id または surveyid を条件に検索
      {
        $set: {
          selection: body.selection, // selection フィールドを更新
          text_response: body.text_response, // text_response フィールドを更新
        },
      },
      { new: true, runValidators: true } // 更新後のデータを返すオプション
    ).lean()

    if (!updatedSurvey) {
      return NextResponse.json(
        {
          success: false,
          message: 'Survey not found or update failed',
        },
        { status: 404 }
      )
    }

    // 成功レスポンス
    return NextResponse.json(
      {
        success: true,
        message: 'Survey updated successfully',
        data: updatedSurvey,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    )
  }
}

/**
 * @description customsurvey ルートの POST リクエストハンドラ
 * - 新しい Survey を作成する
 * @param req
 * @returns
 */
export async function POST(req: NextRequest) {
  try {
    // MongoDB に接続
    await dbConnect()

    // リクエストボディを解析
    const body = await req.json()
    const { project_name, title, description } = body

    // 必須フィールドが存在するか確認
    if (!project_name || !title || !description) {
      return NextResponse.json(
        {
          success: false,
          message: 'Project name, title, and description are required',
        },
        { status: 400 }
      )
    }

    // project_name から projectid を取得
    const projectId = await getProjectIdByName(project_name)

    if (!projectId) {
      return NextResponse.json(
        {
          success: false,
          message: 'Project not found',
        },
        { status: 404 }
      )
    }

    // `create` を使用して新しい Survey を作成
    const newSurvey = await CustomSurvey.create({
      projectid: projectId, // 関連プロジェクトID
      title, // リクエストボディから取得
      description, // リクエストボディから取得
      status: 'active', // 初期状態を "active" に設定
    })

    // 成功レスポンスを返す
    return NextResponse.json(
      {
        success: true,
        message: 'Survey created successfully',
        data: newSurvey,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    )
  }
}

/**
 * @description customsurvey ルートの DELETE リクエストハンドラ
 * - CustomSurvey에서 _id를 기반으로 데이터를 삭제
 * @param req
 * @returns
 */
export async function DELETE(req: NextRequest) {
  try {
    // MongoDB に接続
    await dbConnect()

    // リクエストから _id を取得
    const body = await req.json()
    const { surveyid } = body

    if (!surveyid) {
      return NextResponse.json(
        {
          success: false,
          message: 'Survey ID is required',
        },
        { status: 400 }
      )
    }

    // CustomSurvey コレクションから指定された _id を削除
    const deletedSurvey = await CustomSurvey.findByIdAndDelete(surveyid).lean()

    if (!deletedSurvey) {
      return NextResponse.json(
        {
          success: false,
          message: 'Survey not found or already deleted',
        },
        { status: 404 }
      )
    }

    // 成功レスポンス
    return NextResponse.json(
      {
        success: true,
        message: 'Survey deleted successfully',
        data: deletedSurvey,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    )
  }
}
