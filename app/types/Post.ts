// ====== Post
export type Post = {
  _id: string // MongoDB ObjectId
  title: string // 게시글 제목
  content: string // 게시글 내용
  author: string // 작성자 ID (User 컬렉션의 관련 ID)
  createAt: Date // 게시글 생성 날짜
  updateAt: Date // 게시글 갱신 날짜
}
