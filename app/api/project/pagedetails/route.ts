import { NextRequest, NextResponse } from 'next/server'

import { dbConnect, Project } from '@/db/models'

/**
 * @description プロジェクト名でプロジェクト詳細を取得します。
 * @searchParams project_name
 */
export async function GET(req: NextRequest) {
  try {
    await dbConnect()
    // クエリパラメータから project_name を取得
    const projectName = req.nextUrl.searchParams.get('project_name')

    if (!projectName) {
      return NextResponse.json({ error: 'project_name は必須です。' }, { status: 400 })
    }

    // データベースからプロジェクトを検索
    const project = await Project.findOne({ project_name: projectName })
      .populate('organization') // 組織情報を取得
      .populate('participants') // 参加者情報を取得
      .populate('analysts') // 分析者情報を取得
      .populate('surveys') // 関連する調査情報を取得

    if (!project) {
      return NextResponse.json({ error: '指定された名前のプロジェクトが見つかりません。' }, { status: 404 })
    }

    // 必要なデータを返す（スキーマのすべてのフィールドを含む）
    const projectData = {
      project_id: project._id,
      project_name: project.project_name,
      project_description: project.project_description,
      project_code: project.project_code,
      organization: project.organization,
      participants: project.participants,
      surveys: project.surveys,
      analysts: project.analysts,
      custom_survey: project.custom_survey
        ? {
            title: project.custom_survey.title,
            description: project.custom_survey.description,
            status: project.custom_survey.status,
            selection: project.custom_survey.selection.map(
              (sel: { content: string; options: string[]; type: string; min: number; max: number }) => ({
                content: sel.content,
                options: sel.options,
                type: sel.type,
                min: sel.min,
                max: sel.max,
              })
            ),
            text_response: project.custom_survey.text_response.map((text: { content: string }) => ({
              content: text.content,
            })),
          }
        : null,
      creator: project.creator,
      createdAt: project.createdAt, // 作成日時
      updatedAt: project.updatedAt, // 更新日時
    }

    return NextResponse.json(projectData, { status: 200 })
  } catch (error) {
    console.error('プロジェクト情報を取得中にエラーが発生しました:', error)
    return NextResponse.json({ error: '予期しないエラーが発生しました。後でもう一度お試しください。' }, { status: 500 })
  }
}
