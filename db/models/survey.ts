import mongoose from 'mongoose'

const SurveySchema = new mongoose.Schema(
  {
    project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true }, // 연결된 프로젝트 ID
    essential_survey: {
      gender: { type: String, required: true }, // 성별
      age: { type: Number, required: true }, // 나이
      weight: {
        value: { type: Number, required: true }, // 체중 값
        type: { type: String, required: true, default: 'kg' }, // 단위 (예: kg, lbs)
      }, // 체중 정보
      height: { type: Number, required: true }, // 키
      job: { type: String, required: true }, // 직업
    }, // 필수 설문 정보
    custom_survey: {
      selection: {
        type: [
          {
            content: { type: String, default: '' }, // 질문 내용
            options: { type: [String], default: [] }, // 선택지 배열
            type: { type: String, default: 'single-choice' }, // 질문 유형 (예: "single-choice", "multi-choice")
            min: { type: Number, default: null }, // 최소 선택 수 (선택 사항)
            max: { type: Number, default: null }, // 최대 선택 수 (선택 사항)
          },
        ],
        default: [],
      }, // 선택형 질문 목록
      text_response: {
        type: [
          {
            content: { type: String, default: '' }, // 텍스트 형식의 답변
          },
        ],
        default: [],
      }, // 텍스트 답변 목록
      title: { type: String, default: '' }, // 사용자 정의 설문 제목
      description: { type: String, default: '' }, // 설명
      status: { type: String, default: 'active' }, // 설문 상태 (예: "active", "completed")
    }, // 사용자 정의 설문 정보
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
