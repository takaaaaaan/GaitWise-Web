// db\models\doctor.ts
import mongoose from 'mongoose'

const DoctorSchema = new mongoose.Schema(
  {
    firstname: { type: String, required: true, default: '' },
    lastname: { type: String, required: true, default: '' },
    email: { type: String, required: true, unique: true, index: true, default: '' },
    password: { type: String, required: true, default: '' },
    profileImage: { type: String, default: '' },
    job: { type: String, default: '' },
    workingtime: { type: String, default: '' },
    workplace: { type: String, default: '' },
    experience: { type: Number, default: 0 },
    introduction: { type: String, default: '' },
    reservation: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reservation' }],
    treatmentcompleted: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TreatmentCompleted' }],
    review: [
      {
        rating: { type: Number, default: 0 },
        content: { type: String, default: '' },
        reviewer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
      },
    ],
  },
  {
    timestamps: true,
    collection: 'doctor',
    versionKey: false,
  }
)

const Doctor = mongoose.models.Doctor || mongoose.model('Doctor', DoctorSchema)

export default Doctor
