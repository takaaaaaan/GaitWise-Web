// db\models\walking.ts
import mongoose from 'mongoose'

// ====== Walking Schema
const WalkingSchema = new mongoose.Schema(
  {
    participant: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 참가자 ID
    acc: { type: mongoose.Schema.Types.ObjectId, ref: 'AccelerationData', required: true }, // 가속도 데이터 ID
    gyro: { type: mongoose.Schema.Types.ObjectId, ref: 'GyroscopeData', required: true }, // 자이로스코프 데이터 ID
    rot: { type: mongoose.Schema.Types.ObjectId, ref: 'RotationData', required: true }, // 회전 데이터 ID
    walking_time: { type: String, required: true }, // 걷기 시간 (예: "HH:MM:SS")
    step_count: { type: Number, required: true }, // 걸음 수
    shose: { type: String, required: true }, // 사용한 신발 정보
  },
  {
    timestamps: true, // 타임스탬프
    collection: 'walking', // 컬렉션 이름
    versionKey: false,
  }
)

const Walking = mongoose.models.Walking || mongoose.model('Walking', WalkingSchema)

export default Walking
