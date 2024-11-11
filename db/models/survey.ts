// db\models\survey.ts
import mongoose from 'mongoose'

import CustomSurveySchema from './project'

// ====== Weight Schema
const WeightSchema = new mongoose.Schema({
  value: { type: Number, required: true }, // 체중 값
  type: { type: String, required: true, default: 'kg' }, // 단위 (예: kg, lbs)
})

// ====== EssentialSurvey Schema
const EssentialSurveySchema = new mongoose.Schema({
  gender: { type: String, required: true }, // 성별
  age: { type: Number, required: true }, // 나이
  weight: { type: WeightSchema, required: true }, // 체중 정보
  height: { type: Number, required: true }, // 키
  job: { type: String, required: true }, // 직업
})

// ====== Survey Schema
const SurveySchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // 연결된 프로젝트 ID
    essential_survey: { type: EssentialSurveySchema, required: true }, // 필수 설문 정보
    custom_survey: { type: CustomSurveySchema, default: null }, // 사용자 정의 설문 정보
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 참가자 ID
  },
  {
    timestamps: true, // 타임스탬프
    collection: 'survey', // 컬렉션 이름
    versionKey: false,
  }
)

const Survey = mongoose.models.Survey || mongoose.model('Survey', SurveySchema)

export default Survey
