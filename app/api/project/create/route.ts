import { NextRequest, NextResponse } from 'next/server'

import { checkAnalysts, sendEmail, verifyTokenAndGetUser } from '@/db/actions'
import { dbConnect, Organization, Project } from '@/db/models'

export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    // Authorization 헤더에서 토큰 획득
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.split('Bearer ')[1]

    if (!token) {
      return NextResponse.json({ message: 'Token not provided.', success: false }, { status: 401 })
    }

    // 토큰 검증 및 사용자 정보 획득
    const { user, error } = await verifyTokenAndGetUser(token)
    if (error || !user) {
      return NextResponse.json({ message: 'Token verification failed.', success: false }, { status: 401 })
    }

    // JSON 본문 파싱
    const body = await req.json()
    const { title, description, analysts_email, validOrganizationName, projectCode } = body

    // 필수 항목 체크
    if (!title || !validOrganizationName || !projectCode) {
      return NextResponse.json({ message: 'Required fields are missing.', success: false }, { status: 400 })
    }

    // 프로젝트명 중복 확인
    const existingProjectByName = await Project.findOne({ project_name: title })
    if (existingProjectByName) {
      return NextResponse.json(
        { message: 'A project with the same name already exists.', success: false },
        { status: 400 }
      )
    }

    // projectCode 중복 확인
    const existingProjectByCode = await Project.findOne({ project_code: projectCode })
    if (existingProjectByCode) {
      return NextResponse.json(
        { message: 'A project with the same code already exists.', success: false },
        { status: 400 }
      )
    }

    // Organization 검색
    const organization = await Organization.findOne({ organization_name: validOrganizationName })
    if (!organization) {
      return NextResponse.json({ message: 'Specified organization not found.', success: false }, { status: 404 })
    }

    // 이메일 주소 분류
    const { validUsers, nonExistentUsers, nonMemberUsers } = await checkAnalysts(analysts_email, organization._id)

    console.log('이미 이 Org의 팀원:', validUsers)
    console.log('이 Org에 소속돼 있지 않은 사용자:', nonMemberUsers)
    console.log('비회원:', nonExistentUsers)

    // 초대 메일 보내기
    for (const email of nonExistentUsers) {
      await sendEmail({
        email,
        type: 'invitation',
        invitationType: 'organization',
        recipientName: '',
        actionLink: `${process.env.NEXT_PUBLIC_DOMAIN}/auth?type=sign-up&organization=${organization.organization_name}&project=${title}`,
      })
    }
    for (const { email } of nonMemberUsers) {
      await sendEmail({
        email,
        type: 'invitation',
        invitationType: 'project',
        recipientName: '',
        actionLink: `${process.env.NEXT_PUBLIC_DOMAIN}/auth?type=sign-in&organization=${organization.organization_name}&project=${title}`,
      })
    }

    // 새로운 프로젝트 생성
    let newProject
    try {
      newProject = await Project.create({
        project_name: title,
        project_description: description || '',
        analysts: [...validUsers.map((u) => u.userId), user.id],
        organization: organization._id,
        project_code: projectCode,
        creator: user.id,
      })
    } catch {
      return NextResponse.json(
        { message: 'Error occurred while creating the new project.', success: false },
        { status: 500 }
      )
    }

    // Organization 에 프로젝트 ID 추가
    const updateData = { $push: { projects: newProject._id } }
    try {
      await Organization.updateOne({ _id: organization._id }, updateData)
    } catch {
      return NextResponse.json(
        { message: 'Error occurred while updating the organization.', success: false },
        { status: 500 }
      )
    }

    return NextResponse.json(
      {
        message: 'Project successfully created and added to the organization.',
        success: true,
        project: newProject,
      },
      { status: 200 }
    )
  } catch {
    return NextResponse.json({ message: 'Server error occurred.', success: false }, { status: 500 })
  }
}
