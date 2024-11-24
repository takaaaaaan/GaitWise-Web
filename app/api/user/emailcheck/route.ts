import { NextRequest, NextResponse } from 'next/server'

import { dbConnect, User } from '@/db/models'

export async function GET(req: NextRequest) {
  try {
    await dbConnect()
    const email = req.nextUrl.searchParams.get('email')

    // 必須フィールドのチェック
    if (!email) {
      return NextResponse.json(
        {
          message: 'Required fields are missing.',
          success: false,
        },
        { status: 400 }
      )
    }

    // email の重複を確認
    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json(
        {
          message: 'Email is already registered.',
          success: false,
        },
        { status: 409 }
      ) // 409 Conflict
    }

    // email が存在しない場合のレスポンス
    return NextResponse.json(
      {
        message: 'Email is available for registration.',
        success: true,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json(
      {
        message: 'Server error occurred.',
        success: false,
      },
      { status: 500 }
    )
  }
}
