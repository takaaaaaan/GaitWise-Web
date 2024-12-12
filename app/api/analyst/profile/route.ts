import { NextRequest, NextResponse } from 'next/server'

import { verifyTokenAndGetUser } from '@/db/actions'
import { Analyst, dbConnect } from '@/db/models'

export async function GET(req: NextRequest) {
  try {
    await dbConnect()

    // Authorization ヘッダーからトークンを取得
    const authHeader = req.headers.get('Authorization')
    const token = authHeader?.split('Bearer ')[1]

    if (!token) {
      return NextResponse.json({ message: 'Token not provided.', success: false }, { status: 401 })
    }

    // トークンを検証し、ユーザー情報を取得
    const { user, error } = await verifyTokenAndGetUser(token)
    if (error || !user) {
      return NextResponse.json({ message: error || 'Token verification failed.', success: false }, { status: 401 })
    }

    // Analystデータを取得し、projectsとorganizationsをpopulate
    const analystData = await Analyst.findById(user.id)
      .populate('projects') // projectsフィールドをpopulate
      .populate('organizations') // organizationsフィールドをpopulate
      .select('-password') // passwordフィールドを除外

    if (!analystData) {
      return NextResponse.json({ message: 'Analyst not found.', success: false }, { status: 404 })
    }

    return NextResponse.json(
      {
        message: 'Analyst data retrieved successfully.',
        success: true,
        Analystdata: analystData,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('データ取得中にエラーが発生:', error)
    return NextResponse.json({ message: 'An error occurred on the server.', success: false }, { status: 500 })
  }
}
