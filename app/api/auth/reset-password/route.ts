import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/db/dbConnect'
import Analyst from '@/db/models/analyst'
import Doctor from '@/db/models/doctor'

/**
 * POST 요청을 처리하는 함수
 * @param {NextRequest} request - 요청 객체
 * @returns {Promise<NextResponse>} 응답 객체
 */
export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    // MongoDB에 연결
    await dbConnect()

    // 요청에서 이메일 주소와 역할(role)을 가져옴
    const { email, repassword, role } = body

    console.log(email, repassword, role)

    if (!email || email.trim() === '') {
      return NextResponse.json({ message: '유효하지 않은 이메일입니다.', flg: false }, { status: 400 })
    }

    // FIXME : 비밀번호 검증 (예: 8자 이상)
    // if (!repassword || repassword.length < 8) {
    //   return NextResponse.json({ message: '비밀번호는 최소 8자 이상이어야 합니다.', flg: false }, { status: 400 })
    // }

    // 비밀번호를 해시화
    const hashedPassword = await bcrypt.hash(repassword, 10)

    let user

    // role에 따라 적절한 데이터베이스 모델에서 사용자 검색 및 비밀번호 업데이트
    if (role === 'analyst') {
      user = await Analyst.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true } // 업데이트된 사용자를 반환
      )
    } else if (role === 'doctor') {
      user = await Doctor.findOneAndUpdate(
        { email },
        { password: hashedPassword },
        { new: true } // 업데이트된 사용자를 반환
      )
    } else {
      return NextResponse.json({ message: '잘못된 역할입니다', flg: false }, { status: 400 })
    }

    // 사용자가 존재하지 않는 경우
    if (!user) {
      return NextResponse.json({ message: '사용자가 존재하지 않습니다', flg: false }, { status: 203 })
    }

    // 비밀번호 변경 성공 메시지 표시
    return NextResponse.json({ message: '비밀번호가 성공적으로 변경되었습니다.', flg: true }, { status: 200 })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error(errorMessage)
    return NextResponse.json({ message: '비밀번호 변경에 실패했습니다.', error: errorMessage }, { status: 500 })
  }
}
