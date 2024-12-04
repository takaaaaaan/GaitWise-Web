import Cookies from 'js-cookie'
// 로그아웃 함수 정의
export const signout = async () => {
  try {
    Cookies.remove('token') // クライアント側でのトークン削除
    window.location.href = '/auth?type=sign-in' // 로그아웃 후 로그인 페이지로 리다이렉트
  } catch (error) {
    console.error('로그아웃 실패:', error)
  }
}
