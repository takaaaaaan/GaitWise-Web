// ====== Survey

import { CustomSurvey } from './Project'
import { Weight } from './Weight'

export type Survey = {
  _id: string // MongoDB ObjectId
  project: string // 연결된 프로젝트 ID
  essential_survey: EssentialSurvey // 필수 설문 정보
  custom_survey: CustomSurvey // 사용자 정의 설문 정보
  participant: string // 참가자 ID
  createdAt: Date // 설문 생성 날짜
  updatedAt: Date // 설문 갱신 날짜
}

export type EssentialSurvey = {
  gender: string // 성별
  age: number // 나이
  weight: Weight // 체중 정보
  height: number // 키
  job: string // 직업
}
