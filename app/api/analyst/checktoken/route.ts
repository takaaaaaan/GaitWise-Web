import { jwtVerify } from 'jose'
import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/db/dbConnect'
import Analyst from '@/db/models/analyst'

/**
 * 사용자 토큰을 검증하고 사용자 정보를 반환
 * @param {NextRequest} req - 요청 객체
 * @returns {Promise<NextResponse>} 응답 객체
 */
export async function GET(req: NextRequest) {
  try {
    // MongoDB 연결
    await dbConnect()

    // Authorization 헤더에서 토큰 추출
    const authHeader = req.headers.get('Authorization')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: '토큰이 없습니다', flg: false }, { status: 401 })
    }
    const token = authHeader.split(' ')[1] // "Bearer " 이후의 토큰 값

    // 1. JWT 시크릿 키
    const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || '')

    // 2. 토큰 검증 및 디코딩
    const { payload } = await jwtVerify(token, secretKey)

    // 3. 페이로드에서 사용자 정보 추출
    const userId = payload.id // JWT 페이로드의 id 필드
    if (!userId) {
      return NextResponse.json({ message: '유효하지 않은 토큰입니다', flg: false }, { status: 401 })
    }

    // 4. 데이터베이스에서 사용자 검색
    const analyst = await Analyst.findById(userId)
    if (!analyst) {
      return NextResponse.json({ message: '사용자가 존재하지 않습니다', flg: false }, { status: 404 })
    }

    // 5. 사용자 정보 반환
    return NextResponse.json({
      message: '사용자 확인 성공',
      flg: true,
      user: {
        id: analyst._id,
        email: analyst.email,
        firstname: analyst.firstname,
        lastname: analyst.lastname,
      },
    })
  } catch (error: unknown) {
    // 예외 처리
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json({ message: '사용자 확인 실패', flg: false, error: errorMessage }, { status: 500 })
  }
}
// fetch('/api/user', {
//   method: 'GET',
//   headers: {
//     Authorization: `Bearer ${token}`, // 로그인 시 받은 토큰
//   },
// })
//   .then((response) => response.json())
//   .then((data) => {
//     if (data.flg) {
//       console.log('사용자 정보:', data.user)
//     } else {
//       console.error('오류 메시지:', data.message)
//     }
//   })
