import Analyst from '@/db/models/analyst'
import Organization from '@/db/models/organization'

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
    const user = await Analyst.findOne({ email }) // ユーザーが存在するか確認
    console.log('user:', user)
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
  console.log('이미 이 Org의 팀원:', validUsers)
  console.log('이 Org에 소속돼 있지 않은 분석가:', nonMemberUsers)
  console.log('등록돼 있지 않은 분석가:', nonExistentUsers)
  return {
    validUsers,
    nonExistentUsers,
    nonMemberUsers,
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
