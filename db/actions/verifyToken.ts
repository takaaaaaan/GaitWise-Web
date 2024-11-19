import { jwtVerify } from 'jose'

import dbConnect from '@/db/dbConnect'
import Analyst from '@/db/models/analyst'

/**
 * 토큰을 검증하고 사용자 정보를 반환하는 함수
 * @param {string} token - JWT 토큰
 * @returns {Promise<{ user: object | null, error: string | null }>} 사용자 정보와 오류 메시지
 */
export async function verifyTokenAndGetUser(token: string): Promise<{ user: object | null; error: string | null }> {
  try {
    // MongoDB 연결
    await dbConnect()

    // JWT 시크릿 키
    const secretKey = new TextEncoder().encode(process.env.NEXT_PUBLIC_JWT_SECRET || '')

    // 토큰 검증 및 디코딩
    const { payload } = await jwtVerify(token, secretKey)

    // 페이로드에서 사용자 ID 추출
    const userId = payload.id
    if (!userId) {
      return { user: null, error: '유효하지 않은 토큰입니다' }
    }

    // 데이터베이스에서 사용자 검색
    const analyst = await Analyst.findById(userId)
    if (!analyst) {
      return { user: null, error: '사용자가 존재하지 않습니다' }
    }

    // 사용자 정보 반환
    return {
      user: {
        id: analyst._id.toString() as string,
        email: analyst.email as string,
        firstname: analyst.firstname as string,
        lastname: analyst.lastname as string,
      },
      error: null,
    }
  } catch (error: unknown) {
    // 예외 처리
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return { user: null, error: errorMessage }
  }
}
