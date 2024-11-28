import { NextRequest, NextResponse } from 'next/server'

import { getProjectIdByName } from '@/db/actions/project/fetch'
import { CustomSurvey, dbConnect } from '@/db/models'

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
      console.log('project_name:', project_name)

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
      { $set: body }, // リクエストボディでデータを更新
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
