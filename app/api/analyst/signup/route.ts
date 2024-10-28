import { NextRequest, NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import dbConnect from '@/../../db/dbConnect'
import Analyst from '@/../../db/models/analyst'

/**
 * POST 요청을 처리하는 함수 (Analyst 전용)
 * @param {NextRequest} request - 요청 객체
 * @returns {Promise<NextResponse>} 응답 객체
 */
export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    // MongoDB에 연결
    await dbConnect()

    // 이메일 주소로 이미 사용자가 존재하는지 확인
    const existingAnalyst = await Analyst.findOne({ email: body.email })

    if (existingAnalyst) {
      // 이메일 주소가 이미 존재하는 경우, 203 상태를 반환
      return NextResponse.json({ message: '이 이메일 주소는 이미 사용 중입니다', flg: false }, { status: 203 })
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(body.password, 10)

    // 새로운 Analyst 사용자 생성
    const newAnalyst = new Analyst({
      email: body.email,
      firstname: body.firstname,
      lastname: body.lastname,
      password: hashedPassword,
      analyst_report: [],
    })

    const savedAnalyst = await newAnalyst.save()

    // 회원가입 성공 시 200 상태 반환과 함께 ID 포함
    return NextResponse.json(
      { message: '회원가입 성공', flg: true, userId: savedAnalyst._id.toString() },
      { status: 200 }
    )
  } catch (error) {
    // 에러 핸들링, 500 상태 반환
    return NextResponse.json({ message: '회원가입 실패', flg: false, error: (error as Error).message }, { status: 500 })
  }
}
