import bcrypt from 'bcryptjs'
import { SignJWT } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

import { getOrganizationIdByName, getOrganizationsAndProjectsByAnalyst, getProjectIdByName } from '@/db/actions'
import { Analyst, dbConnect, Organization, Project } from '@/db/models'

/**
 * POST 요청을 처리하는 함수
 * @param {NextRequest} request - 요청 객체
 * @returns {Promise<NextResponse>} 응답 객체
 */
export async function POST(request: NextRequest) {
  const body = await request.json()
  const { email, password, organization, project } = body
  try {
    // MongoDB에 접속
    await dbConnect()

    // 이메일 주소로 사용자를 검색
    const analyst = await Analyst.findOne({ email: email })

    if (!analyst) {
      // 사용자가 존재하지 않는 경우
      return NextResponse.json({ message: '사용자가 존재하지 않습니다', success: false })
    }

    // 비밀번호를 비교 (해시화된 비밀번호와 입력된 비밀번호를 비교)
    const isPasswordCorrect = await bcrypt.compare(password, analyst.password)

    if (!isPasswordCorrect) {
      // 비밀번호가 틀린 경우
      return NextResponse.json({ message: '비밀번호가 틀렸습니다', success: false })
    }

    // 1: JWT용 시크릿 키를 생성
    const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || '')

    // 2: JWT의 페이로드를 생성
    const payload = {
      role: 'analyst',
      id: analyst._id.toString(),
      email: analyst.email,
      firstname: analyst.firstname,
      lastname: analyst.lastname,
    }

    // 3: JWT로 토큰을 발행
    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('2h') // 유효 기간 2시간
      .sign(secretKey)

    const newAnalystId = analyst._id

    // Organization에 newAnalystId 추가 (organizationが存在する場合のみ)
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

    // Project에 newAnalystId 추가 (projectが存在する場合のみ)
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

    // 관련 Organization 및 Project 검색
    const { organizations } = await getOrganizationsAndProjectsByAnalyst(analyst._id.toString())
    const org_only = organizations.map((org) => org.name)

    let redirectUrl
    if (!organization && !project) {
      redirectUrl = `/organization/${org_only[0]}`
    } else if (organization && !project) {
      redirectUrl = `/organization/${organization}`
    } else if (organization && project) {
      redirectUrl = `/organization/project/${project}`
    } else if (!organization && project) {
      redirectUrl = '/error' // 不正な設定の場合
    }
    console.log('redirectUrl:', redirectUrl)
    // 로그인 성공 시 응답
    return NextResponse.json({ message: '로그인 성공', success: true, token: token, redirectUrl })
  } catch (error: unknown) {
    // 예기치 않은 오류가 발생한 경우의 처리
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ message: '로그인 실패', success: false, error: errorMessage })
  }
}
