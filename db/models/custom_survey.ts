import mongoose from 'mongoose'

const CustomSurveySchema = new mongoose.Schema(
  {
    selection: {
      type: [
        {
          content: { type: String, default: '' }, // 質問内容
          options: { type: [String], default: [] }, // 選択肢の配列
          type: { type: String, default: 'single-choice' }, // 質問タイプ ("single-choice", "multi-choice"など)
          min: { type: Number, default: null }, // 最小選択数 (オプション)
          max: { type: Number, default: null }, // 最大選択数 (オプション)
        },
      ],
      default: [],
    }, // 選択形式の質問リスト
    text_response: {
      type: [
        {
          content: { type: String, default: '' }, // テキスト形式の回答
        },
      ],
      default: [],
    }, // テキスト形式の回答リスト
    projectid: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: null }, // 関連プロジェクト
    title: { type: String, default: '' }, // カスタムアンケートのタイトル
    description: { type: String, default: '' }, // 説明
    status: { type: String, default: 'active' }, // アンケートの状態 ("active", "completed"など)
  },
  {
    timestamps: true,
    collection: 'customSurvey', // コレクション名
  }
)

const CustomSurvey = mongoose.models.CustomSurvey || mongoose.model('CustomSurvey', CustomSurveySchema)

export default CustomSurvey
