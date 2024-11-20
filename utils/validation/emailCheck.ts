// utils/validateEmail.ts
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // シンプルなEメール形式の正規表現
  return emailRegex.test(email.trim())
}
