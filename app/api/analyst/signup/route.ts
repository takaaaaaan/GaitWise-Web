import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

import { getOrganizationIdByName, getProjectIdByName } from '@/db/actions'
import dbConnect from '@/db/dbConnect'
import Analyst from '@/db/models/analyst'
import Organization from '@/db/models/organization'
import Project from '@/db/models/project'

/**
 * POST 요청을 처리하는 함수 (Analyst 전용)
 * @param {NextRequest} request - 요청 객체
 * @returns {Promise<NextResponse>} 응답 객체
 */
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, firstname, lastname, password, organization, project } = body

  try {
    // MongoDB에 연결
    await dbConnect()

    // 이메일 주소로 이미 사용자가 존재하는지 확인
    const existingAnalyst = await Analyst.findOne({ email })

    if (existingAnalyst) {
      // 이메일 주소가 이미 존재하는 경우, 203 상태를 반환
      return NextResponse.json({ message: '이 이메일 주소는 이미 사용 중입니다', success: false }, { status: 203 })
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(password, 10)

    // 새로운 Analyst 사용자 생성 및 저장
    const newAnalyst = await Analyst.create({
      email,
      firstname,
      lastname,
      password: hashedPassword,
      analyst_report: [],
    })

    const newAnalystId = newAnalyst._id

    // Organization에 newAnalystId 추가 (organization이 있는 경우만)
    if (organization) {
      const organizationId = await getOrganizationIdByName(organization)
      const updatedOrganization = await Organization.findByIdAndUpdate(
        organizationId,
        { $push: { analysts: newAnalystId } },
        { new: true }
      )

      if (!updatedOrganization) {
        return NextResponse.json({ message: 'Organization 업데이트 실패', success: false }, { status: 400 })
      }
    }

    // Project에 newAnalystId 추가 (project가 있는 경우만)
    if (project) {
      const projectId = await getProjectIdByName(project)
      const updatedProject = await Project.findByIdAndUpdate(
        projectId,
        { $push: { analysts: newAnalystId } },
        { new: true }
      )

      if (!updatedProject) {
        return NextResponse.json({ message: 'Project 업데이트 실패', success: false }, { status: 400 })
      }
    }

    // 회원가입 성공 시 200 상태 반환과 함께 ID 포함
    return NextResponse.json(
      { message: '회원가입 성공', success: true, userId: newAnalystId.toString() },
      { status: 200 }
    )
  } catch (error) {
    // 에러 핸들링, 500 상태 반환
    return NextResponse.json({ message: `회원가입 실패: ${(error as Error).message}`, success: false }, { status: 500 })
  }
}
