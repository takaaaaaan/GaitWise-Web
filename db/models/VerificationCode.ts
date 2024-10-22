import mongoose from 'mongoose'

const verificationCodeSchema = new mongoose.Schema(
  {
    verificationCodeId: { type: mongoose.Schema.Types.ObjectId, required: true },
    roleType: { type: String, enum: ['Analyst', 'Doctor'], required: true },
    email: { type: String, required: true },
    code: { type: String, required: true },
    expiresAt: { type: Date, required: true }, // 유효기간
  },
  {
    timestamps: true,
    collection: 'VerificationCode',
    versionKey: false,
  }
)

const VerificationCode = mongoose.models.VerificationCode || mongoose.model('VerificationCode', verificationCodeSchema)

export default VerificationCode
