// db\models\project.ts
import mongoose from 'mongoose'

// ====== Selection Schema
const SelectionSchema = new mongoose.Schema({
  content: { type: String, required: true }, // 질문 내용
  options: { type: [String], required: true }, // 선택지 배열
  type: { type: String, required: true }, // 질문 유형 (예: "single-choice", "multi-choice")
  min: { type: Number, default: null }, // 최소 선택 수 (선택 사항)
  max: { type: Number, default: null }, // 최대 선택 수 (선택 사항)
})

// ====== TextResponse Schema
const TextResponseSchema = new mongoose.Schema({
  content: { type: String, required: true }, // 텍스트 형식의 답변
})

// ====== CustomSurvey Schema
export const CustomSurveySchema = new mongoose.Schema({
  selection: { type: [SelectionSchema], default: [] }, // 선택형 질문 목록
  text_response: { type: [TextResponseSchema], default: [] }, // 텍스트 답변 목록
  title: { type: String, required: true }, // 사용자 정의 설문 제목
  description: { type: String, default: '' }, // 설명
  status: { type: String, required: true, default: 'active' }, // 설문 상태 (예: "active", "completed")
})

// ====== GProject Schema
const ProjectSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', default: '' }, // 관련 조직
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }], // 참가자
    surveys: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Survey', default: [] }], // 설문 목록
    analysts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }], // 분석가
    project_name: { type: String, required: true }, // 프로젝트 이름
    project_description: { type: String, default: '' }, // 프로젝트 설명
    custom_survey: { type: CustomSurveySchema, default: null }, // 커스텀 설문 정보
    project_code: { type: String, required: true, unique: true }, // 프로젝트 코드
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 프로젝트 생성자
  },
  {
    timestamps: true,
    collection: 'project', // 컬렉션 이름
    versionKey: false,
  }
)

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema)

export default Project
