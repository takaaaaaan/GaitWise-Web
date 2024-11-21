import bcrypt from 'bcryptjs'
import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/db/dbConnect'
import User from '@/db/models/user'

export async function POST(req: NextRequest) {
  try {
    await dbConnect()

    // JSON 본문 파싱
    const body = await req.json()
    const { age, gender, height, weight, profile, email } = body

    // 必須フィールドのチェック
    if (
      !profile?.firstName ||
      !profile?.lastName ||
      !profile?.passwd ||
      !gender ||
      !age ||
      !email ||
      !weight.value ||
      !weight.type ||
      !height
    ) {
      return NextResponse.json({ message: 'Required fields are missing.', success: false }, { status: 400 })
    }

    // 비밀번호 해시화
    const hashedPassword = await bcrypt.hash(profile.passwd, 10)

    // 新しいユーザーを作成
    let newUser
    try {
      newUser = await User.create({
        firstName: profile.firstName,
        lastName: profile.lastName,
        email,
        gender,
        age,
        weight: {
          value: weight.value,
          type: weight.type || 'kg',
        },
        height,
        job: profile.job || '',
        profile_image_url: '',
        password: hashedPassword,
      })
    } catch (error) {
      console.error('Error creating user:', error)
      return NextResponse.json({ message: 'Error occurred while creating the user.', success: false }, { status: 500 })
    }

    return NextResponse.json({ message: 'User successfully created.', success: true, user: newUser }, { status: 200 })
  } catch (error) {
    console.error('Server error:', error)
    return NextResponse.json({ message: 'Server error occurred.', success: false }, { status: 500 })
  }
}
