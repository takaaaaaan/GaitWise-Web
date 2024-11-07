// ====== VerificationCode
export type VerificationCode = {
  _id: string // MongoDB ObjectId
  verificationCodeId: string // 고유 인증 코드 ID
  email: string // 관련된 이메일 주소
  roleType: string // 역할 유형 (예: "admin", "user" 등)
  expireAt: string // 인증 코드 만료 시간 (ISO 8601 형식 권장)
  code: string // 실제 인증 코드
  createAt: Date // 레코드 생성 날짜
  updateAt: Date // 레코드 갱신 날짜
}
