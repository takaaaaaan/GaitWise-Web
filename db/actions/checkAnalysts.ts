import Organization from '@/db/models/organization'
import User from '@/db/models/user'

/**
 * 指定されたメールアドレスが有効なユーザーであり、指定された組織に属しているかを確認します。
 *
 * @param emails 検証するメールアドレスの配列。
 * @param organizationId 検証対象の組織のID。
 * @returns validUsers, nonExistentUsers, nonMemberUsers を含むオブジェクト。
 */
export async function checkAnalysts(emails: string[], organizationId: string) {
  const validUsers: { email: string; userId: string }[] = []
  const nonExistentUsers: string[] = [] // 存在しないユーザーのメールアドレス
  const nonMemberUsers: { email: string; userId: string }[] = [] // 組織に属していないユーザーのメールとID

  for (const email of emails) {
    const user = await User.findOne({ email }) // ユーザーが存在するか確認
    if (!user) {
      nonExistentUsers.push(email) // 存在しない場合、配列に追加
      continue
    }

    // ユーザーが組織に属しているか確認
    const isMember = await Organization.findOne({
      _id: organizationId,
      analysts: user._id,
    })
    if (!isMember) {
      nonMemberUsers.push({ email, userId: user._id }) // メールとユーザーIDをセットで追加
      continue
    }

    // 有効な場合、有効なユーザーリストに追加
    validUsers.push({ email, userId: user._id })
  }

  return {
    validUsers, // メールアドレスとユーザーIDのペアを持つ有効なユーザーリスト
    nonExistentUsers, // 存在しないユーザーのメールアドレスリスト
    nonMemberUsers, // メールアドレスとユーザーIDのペアを持つ組織に属していないユーザーリスト
  }
}
//====== Response Example ======//
/**
 * If all succeed:
 * {
 *   "validUsers": [
 *    { "email": "valid@example.com", "userId": "64e1f6b3d38c9c001d53c9aa" }
 *  ],
 *  "nonExistentUsers": [],
 *  "nonMemberUsers": []
 * }
 *
 * If there is an error:
 * {
 * "validUsers": [
 *   { "email": "valid@example.com", "userId": "64e1f6b3d38c9c001d53c9aa" }
 * ],
 * "nonExistentUsers": ["notfound@example.com"],
 * "nonMemberUsers": [
 *   { "email": "notmember@example.com", "userId": "64e1f6b3d38c9c001d53c9ab" }
 * ]
 * }
 */
