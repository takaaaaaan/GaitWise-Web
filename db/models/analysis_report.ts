// db\models\analysis_report.ts
import mongoose from 'mongoose'

const AnalysisReportSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User ' },
    analyst_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Analyst' },
    content: { type: String, default: '' },
    password: { type: String, default: '' },
  },
  {
    timestamps: true,
    collection: 'analysis_report',
    versionKey: false,
  }
)

const AnalysisReport = mongoose.models.AnalysisReport || mongoose.model('AnalysisReport', AnalysisReportSchema)

export default AnalysisReport
