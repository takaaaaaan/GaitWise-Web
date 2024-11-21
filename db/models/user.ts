// db\models\user.ts
import mongoose from 'mongoose'

import { getRandomDefaultImage } from '@/utils'

// ====== User Schema
const UserSchema = new mongoose.Schema(
  {
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: [] }], // 프로젝트 ID 배열
    surveys: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Survey', default: [] }], // 설문조사 ID 배열
    walking_history: [{ type: mongoose.Schema.Types.ObjectId, ref: 'WalkingHistory', default: [] }], // 걷기 이력 ID 배열
    firstName: { type: String, required: true }, // 사용자의 이름
    lastName: { type: String, required: true }, // 사용자의 성
    gender: { type: String, required: true }, // 성별
    age: { type: Number, required: true }, // 나이
    weight: {
      value: { type: Number, required: true }, // 체중 값
      type: { type: String, required: true, default: 'kg' }, // 단위 (예: kg, lbs)
    }, // 체중 정보
    height: { type: Number, required: true }, // 키
    job: { type: String, default: '' }, // 직업
    profile_image_url: { type: String, required: false, default: getRandomDefaultImage }, // 프로필 이미지 URL
    password: { type: String, required: true }, // 해시화된 비밀번호
  },
  {
    timestamps: true,
    collection: 'user', // 컬렉션 이름
    versionKey: false,
  }
)

const User = mongoose.models.User || mongoose.model('User', UserSchema)

export default User
