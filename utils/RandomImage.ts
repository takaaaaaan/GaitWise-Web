// デフォルト画像リンクのリスト
const defaultImages = [
  'https://example.com/default1.jpg',
  'https://example.com/default2.jpg',
  'https://example.com/default3.jpg',
]

// ランダムな画像リンクを返す関数
export const getRandomDefaultImage = () => {
  return defaultImages[Math.floor(Math.random() * defaultImages.length)]
}
