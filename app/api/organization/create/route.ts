import { promises as fs } from 'fs'
import { NextRequest, NextResponse } from 'next/server'
import path from 'path'

import { verifyTokenAndGetUser } from '@/db/actions/verifyToken'
import dbConnect from '@/db/dbConnect'
import Organization from '@/db/models/organization'

// アップロードされたファイルを保存
async function saveFile(file: File): Promise<string> {
  const uploadsDir = path.join(process.cwd(), 'public/uploads')
  await fs.mkdir(uploadsDir, { recursive: true })
  const filePath = path.join(uploadsDir, file.name)
  const fileBuffer = new Uint8Array(await file.arrayBuffer()) // Uint8Arrayに変換
  await fs.writeFile(filePath, fileBuffer) // Uint8Arrayを渡す
  return `/uploads/${file.name}`
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    // Authorization ヘッダーからトークンを取得
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.split('Bearer ')[1]

    if (!token) {
      return NextResponse.json({ error: 'トークンが提供されていません。' }, { status: 401 })
    }

    // トークンを検証してユーザー情報を取得
    const { user, error } = await verifyTokenAndGetUser(token)
    if (error || !user) {
      return NextResponse.json({ error: error || 'トークンの検証に失敗しました。' }, { status: 401 })
    }

    // フォームデータを取得
    const formData = await req.formData()
    const organizationName = formData.get('organization_name') as string
    const organizationDescription = formData.get('organization_description') as string
    const file = formData.get('organization_profile_image') as File

    // 必須フィールドのチェック
    if (!organizationName) {
      return NextResponse.json({ error: '必須フィールドが不足しています。' }, { status: 400 })
    }

    // ファイルを保存してパスを取得
    const organizationProfileImagePath = file ? await saveFile(file) : undefined

    // 新しい組織を作成
    const newOrganization = new Organization({
      organization_name: organizationName,
      organization_description: organizationDescription,
      organization_profile_image: organizationProfileImagePath,
      creator: user.id, // 検証済みのユーザー ID を使用
      analysts: [user.id], // analysts フィールドに user.id を追加
    })

    await newOrganization.save()

    return NextResponse.json(
      { message: '組織が正常に作成されました。', organization: newOrganization },
      { status: 200 }
    )
  } catch (error) {
    console.error('データ保存中にエラーが発生:', error)
    return NextResponse.json({ error: 'サーバーでエラーが発生しました。' }, { status: 500 })
  }
}
