import { promises as fs } from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

import { verifyTokenAndGetUser } from '@/db/actions'
import { dbConnect, Organization } from '@/db/models'

// アップロードされたファイルを保存
async function saveFile(file: File): Promise<string> {
  const uploadsDir = path.join(process.cwd(), 'public/uploads')
  await fs.mkdir(uploadsDir, { recursive: true })
  const filePath = path.join(uploadsDir, file.name)
  const fileBuffer = new Uint8Array(await file.arrayBuffer()) // Uint8Arrayに変換
  await fs.writeFile(filePath, fileBuffer) // Uint8Arrayを渡す
  return `/uploads/${file.name}`
}
/**
 *
 * @param req
 * @description 상태 코드(status) 적절화:
 * 401: 인증 실패 (토큰 검증 실패 시).
 * 400: 필수 필드 부족 (요청 데이터 오류).
 * 201: 생성 성공 (조직 생성 성공 시).
 * 500: 서버 오류 (예외 처리).
 * @returns message: 성공/실패 메시지, organization: 생성된 조직 정보.
 */
export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    // Authorization 헤더에서 토큰 가져오기
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.split('Bearer ')[1]

    if (!token) {
      return NextResponse.json({ message: 'Token not provided.', success: false }, { status: 401 })
    }

    // 토큰 검증 및 사용자 정보 가져오기
    const { user, error } = await verifyTokenAndGetUser(token)
    if (error || !user) {
      return NextResponse.json({ message: error || 'Token verification failed.', success: false }, { status: 401 })
    }

    // 폼 데이터 가져오기
    const formData = await req.formData()
    const organizationName = formData.get('organization_name') as string
    const organizationDescription = formData.get('organization_description') as string
    const file = formData.get('organization_profile_image') as File

    // 필수 필드 검증
    if (!organizationName) {
      return NextResponse.json({ message: 'Required fields are missing.', success: false }, { status: 400 })
    }

    // 파일 저장 및 경로 가져오기
    const organizationProfileImagePath = file ? await saveFile(file) : undefined

    // 새로운 조직 생성
    const newOrganization = new Organization({
      organization_name: organizationName,
      organization_description: organizationDescription,
      organization_profile_image: organizationProfileImagePath,
      creator: user.id, // 검증된 사용자 ID
      analysts: [user.id], // analysts 필드에 user.id 추가
    })

    await newOrganization.save()

    return NextResponse.json(
      {
        message: 'Organization created successfully.',
        success: true,
        organization: newOrganization,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('데이터 저장 중 오류 발생:', error)
    return NextResponse.json({ message: 'An error occurred on the server.', success: false }, { status: 500 })
  }
}
