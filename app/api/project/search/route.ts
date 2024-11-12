import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/db/dbConnect'
import Project from '@/db/models/project'

/**
 * @description 프로젝트 ID 목록을 사용하여 프로젝트 세부 정보를 가져옵니다.
 * @method POST
 * @bodyParams projectIds: string[]
 */
export async function POST(req: NextRequest) {
  try {
    // 데이터베이스에 연결
    await dbConnect()

    // 요청 본문에서 projectIds를 가져옴
    const { projectIds } = await req.json()
    if (!projectIds || !Array.isArray(projectIds)) {
      return NextResponse.json({ error: 'projectIds는 배열이어야 합니다.' }, { status: 400 })
    }

    // 데이터베이스에서 여러 프로젝트 검색
    const projects = await Project.find({ _id: { $in: projectIds } })

    if (!projects || projects.length === 0) {
      return NextResponse.json({ error: '제공된 ID와 일치하는 프로젝트를 찾을 수 없습니다.' }, { status: 404 })
    }

    // 프로젝트 정보를 반환
    return NextResponse.json(projects, { status: 200 })
  } catch (error) {
    console.error('프로젝트 정보를 가져오는 중 오류가 발생했습니다:', error)

    return NextResponse.json({ error: '예기치 않은 오류가 발생했습니다. 나중에 다시 시도해주세요.' }, { status: 500 })
  }
}
