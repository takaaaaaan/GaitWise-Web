// db\models\post.ts
import mongoose from 'mongoose'

// ====== Post Schema
const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true }, // 게시글 제목
    content: { type: String, required: true }, // 게시글 내용
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // 작성자 ID (User 컬렉션의 관련 ID)
  },
  {
    timestamps: true, // 타임스탬프
    collection: 'post', // 컬렉션 이름
    versionKey: false,
  }
)

const Post = mongoose.models.Post || mongoose.model('Post', PostSchema)

export default Post
