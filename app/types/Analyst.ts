// ====== Analyst Type ======
export type Analyst = {
  _id: string // MongoDB ObjectId
  projects: string[] // 프로젝트 ID를 저장하는 배열
  organizations: string[] // 조직 ID를 저장하는 배열
  firstname: string // 분석가의 이름
  lastname: string // 분석가의 성
  email: string // 분석가의 이메일 주소
  password: string // 해시화된 비밀번호
  createdAt: Date // 계정 생성 날짜
  updatedAt: Date // 계정 갱신 날짜
}
