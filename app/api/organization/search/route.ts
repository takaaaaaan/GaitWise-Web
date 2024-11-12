import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/db/dbConnect'
import Organization from '@/db/models/organization'

/**
 * @description 조직 이름으로 조직 세부 정보를 가져옵니다.
 * @searchParams organizationName
 */
export async function GET(req: NextRequest) {
  try {
    // 데이터베이스 연결
    await dbConnect()

    // 쿼리 매개변수에서 organizationName 가져오기
    const organizationName = req.nextUrl.searchParams.get('organizationName')

    if (!organizationName) {
      return NextResponse.json({ error: 'organizationName은 필수입니다.' }, { status: 400 })
    }

    // 데이터베이스에서 조직 검색
    const organization = await Organization.findOne({
      organization_name: organizationName,
    })

    if (!organization) {
      return NextResponse.json({ error: '제공된 이름으로 조직을 찾을 수 없습니다.' }, { status: 404 })
    }

    // 조직 세부 정보 반환
    return NextResponse.json(organization, { status: 200 })
  } catch (error) {
    console.error('조직 정보를 가져오는 중 오류 발생:', error)

    return NextResponse.json({ error: '예기치 않은 오류가 발생했습니다. 나중에 다시 시도해주세요.' }, { status: 500 })
  }
}
