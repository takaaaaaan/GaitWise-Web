/* eslint-disable no-useless-escape */
import mongoose from 'mongoose'

const DoctorSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, default: '' }, // 필수 필드, 기본값은 빈 문자열
    lastname: { type: String, required: true, default: '' }, // 필수 필드, 기본값은 빈 문자열
    email: { type: String, required: true, unique: true, index: true, match: /.+\@.+\..+/, default: '' }, // 필수 필드, 고유한 이메일 형식, 유효성 검사를 위한 정규 표현식 사용
    password: { type: String, required: true, minlength: 8, default: '' }, // 필수 필드, 비밀번호는 8자 이상
    reservation: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }], // 예약 정보 참조, Reservation 모델과 연관
    treatmentcomlpeted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TreatmentCompleted' }], // 치료 완료 정보 참조, TreatmentCompleted 모델과 연관
    review: [
      {
        rating: { type: Number, default: 0 }, // 리뷰 점수, 기본값은 0
        content: { type: String, default: '' }, // 리뷰 내용
        reviewer_id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'User',
        }, // 리뷰어 정보 참조, User 모델과 연관
      },
    ],
    createdAt: { type: Date, default: Date.now }, // 문서 생성 시간, 기본값은 현재 시간
    updatedAt: { type: Date, default: Date.now }, // 문서 업데이트 시간, 기본값은 현재 시간
  },
  {
    timestamps: true, // 자동으로 createdAt 및 updatedAt 필드 추가
    collection: 'doctor', // 컬렉션 이름을 'doctor'로 설정
    versionKey: false, // __v 필드를 비활성화
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password // 비밀번호 출력에서 제외
      },
    },
    strict: true, // 스키마에 정의되지 않은 필드 저장 금지
  }
)

// 모델 정의
const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema)

export default Doctor
