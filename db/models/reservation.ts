// db\models\reservation.ts
import mongoose from 'mongoose'

const ReservationSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    doctor_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Doctor' },
    status: { type: String, default: '' },
    reservationTime: { type: Date, default: null },
  },
  {
    collection: 'reservation',
    versionKey: false,
  }
)

const Reservation = mongoose.models.Reservation || mongoose.model('Reservation', ReservationSchema)

export default Reservation
