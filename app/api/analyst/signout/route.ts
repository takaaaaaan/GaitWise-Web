import { NextRequest, NextResponse } from 'next/server'

// 로그아웃을 처리하는 함수
export async function GET(req: NextRequest) {
  // 쿠키에서 토큰을 제거
  const response = NextResponse.json({ message: '로그아웃 성공', flg: true })
  response.cookies.delete('token') // 쿠키에서 'token' 삭제
  
  return response
}
