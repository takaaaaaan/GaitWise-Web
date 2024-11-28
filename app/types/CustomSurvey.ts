// ====== CustomSurvey Type ======

export type CustomSurvey2 = {
  _id: string // ObjectId
  selection: {
    content: string // 質問内容
    options: string[] // 選択肢の配列
    type: string // 質問タイプ ("single-choice", "multi-choice"など)
    min: number | null // 最小選択数 (オプション)
    max: number | null // 最大選択数 (オプション)
  }[]
  text_response: {
    content: string // テキスト形式の回答
  }[]
  projectid: string | null // 関連プロジェクト
  title: string // カスタムアンケートのタイトル
  description: string // 説明
  status: string // アンケートの状態 ("active", "completed"など)
  createdAt: Date
  updatedAt: Date
}
