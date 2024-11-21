import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/db/dbConnect'
import Project from '@/db/models/project'

/**
 * @description 프로젝트 데이터를 가져오면서 조직 정보를 제한된 필드로 포함합니다.
 * @method GET
 * @queryParams projectId: string
 */
export async function GET(req: NextRequest) {
  try {
    // 데이터베이스 연결
    await dbConnect()

    // 프로젝트 ID 가져오기
    const projectId = req.nextUrl.searchParams.get('projectId')
    if (!projectId) {
      return NextResponse.json(
        {
          message: '프로젝트 ID가 필요합니다.',
          success: false,
        },
        { status: 400 }
      )
    }

    // 프로젝트 검색 및 organization 필드 populate
    const project = await Project.findById(projectId).populate({
      path: 'organization', // organization 필드 populate
      select: 'organization_name _id', // 필요한 필드만 선택
    })

    if (!project) {
      return NextResponse.json(
        {
          message: '프로젝트를 찾을 수 없습니다.',
          success: false,
        },
        { status: 404 }
      )
    }

    // 성공 응답
    return NextResponse.json(
      {
        message: '프로젝트 데이터를 성공적으로 가져왔습니다.',
        success: true,
        project,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('프로젝트 데이터를 가져오는 중 오류가 발생했습니다:', error)

    return NextResponse.json(
      {
        message: '서버 오류가 발생했습니다. 나중에 다시 시도해주세요.',
        success: false,
      },
      { status: 500 }
    )
  }
}
