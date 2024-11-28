import mongoose from 'mongoose'

const ProjectSchema = new mongoose.Schema(
  {
    organization: { type: mongoose.Schema.Types.ObjectId, ref: 'Organization', default: null }, // 관련 조직
    participants: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: [] }], // 참가자
    surveys: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Survey', default: [] }], // 설문 목록
    analysts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Analyst', default: [] }], // 분석가
    project_name: { type: String, required: true }, // 프로젝트 이름
    project_description: { type: String, default: '' }, // 프로젝트 설명
    custom_survey: { type: mongoose.Schema.Types.ObjectId, ref: 'custom_survey' }, // カスタムアンケートの参照ID // 커스텀 설문 정보
    project_code: { type: String, unique: true }, // 프로젝트 코드
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // 프로젝트 생성자
  },
  {
    timestamps: true,
    collection: 'project', // 컬렉션 이름
    versionKey: false,
  }
)

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema)

export default Project
