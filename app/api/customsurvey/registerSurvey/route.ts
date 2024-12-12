import { NextRequest, NextResponse } from 'next/server'

import { CustomSurvey, dbConnect, Project } from '@/db/models'

/**
 * @description Project の custom_survey を更新する PUT API
 * @param req
 * @returns
 */
export async function PUT(req: NextRequest) {
  try {
    // MongoDB に接続
    await dbConnect()

    // リクエストボディを解析
    const body = await req.json()
    const { customSurveyId } = body

    // customSurveyId のバリデーション
    if (!customSurveyId) {
      return NextResponse.json(
        {
          success: false,
          message: 'customSurveyId is required.',
        },
        { status: 400 }
      )
    }

    // CustomSurvey を検索し projectid を取得
    const survey = await CustomSurvey.findById(customSurveyId).lean()
    if (!survey || !survey.projectid) {
      return NextResponse.json(
        {
          success: false,
          message: 'CustomSurvey or associated project not found.',
        },
        { status: 404 }
      )
    }

    // projectid を使用して Project を検索し custom_survey を更新
    const updatedProject = await Project.findOneAndUpdate(
      { _id: survey.projectid },
      { custom_survey: customSurveyId },
      { new: true, runValidators: true } // 更新後のデータを返すオプション
    ).lean()
    console.log('updatedProject:', updatedProject)
    if (!updatedProject) {
      return NextResponse.json(
        {
          success: false,
          message: 'Project not found or update failed.',
        },
        { status: 404 }
      )
    }

    // 成功レスポンス
    return NextResponse.json(
      {
        success: true,
        message: 'Project updated successfully.',
        data: updatedProject,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error.',
      },
      { status: 500 }
    )
  }
}
