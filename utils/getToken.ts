import Cookies from 'js-cookie'

/**
 * トークンを取得する関数
 * @returns {string | undefined} トークンが存在する場合はその値、存在しない場合は undefined
 */
export const getToken = (): string | undefined => {
  return Cookies.get('token')
}
