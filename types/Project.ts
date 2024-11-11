export type GProject = {
  _id: string // MongoDB ObjectId
  organization: string // 関連する組織のIDリスト
  participants: string[] // 参加者のIDリスト
  surveys: string[] // 関連するサーベイのIDリスト
  analysts: string[] // 関与するアナリストのIDリスト
  project_name: string // プロジェクト名
  project_description: string // プロジェクトの説明
  custom_survey: CustomSurvey // カスタムサーベイの情報
  project_code: string // プロジェクトコード
  creator: string // プロジェクト作成者のID
  createdAt: Date // プロジェクト作成日時
  updatedAt: Date // プロジェクト更新日時
}

// ====== CustomSurvey
export type CustomSurvey = {
  selection: Selection[] // 선택형 질문 목록
  text_response: TextResponse[] // 텍스트 답변 목록
  title: string // 사용자 정의 설문 제목
  description: string // 설명
  status: string // 설문 상태 (예: "active", "completed")
}

// ====== Selection
export type Selection = {
  content: string // 질문 내용
  options: string[] // 선택지 배열
  type: string // 질문 유형 (예: "single-choice", "multi-choice")
  min?: number // 최소 선택 수 (옵션)
  max?: number // 최대 선택 수 (옵션)
}

// ====== TextResponse
export type TextResponse = {
  content: string // 텍스트 형식의 답변
}
