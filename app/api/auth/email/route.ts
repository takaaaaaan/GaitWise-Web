import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'
import dbConnect from '@/db/dbConnect'
import Analyst from '@/db/models/analyst'
import Doctor from '@/db/models/doctor'
import VerificationCode from '@/db/models/VerificationCode'

/**
 * 랜덤한 숫자를 생성하는 함수
 * @returns {number} 6자리 랜덤 숫자
 */
const generateRandomNumber = () => {
  return Math.floor(100000 + Math.random() * 900000) // 6자리 랜덤 숫자
}

/**
 * POST 요청을 처리하는 함수
 * @param {NextRequest} request - 요청 객체
 * @returns {Promise<NextResponse>} 응답 객체
 */
export async function POST(request: NextRequest) {
  const body = await request.json()

  try {
    // MongoDB에 연결
    await dbConnect()

    // 요청에서 이메일 주소와 역할(role)을 가져옴
    const { email, role } = body

    if (!email || email.trim() === '') {
      return NextResponse.json({ message: '유효한 이메일을 입력해 주세요', flg: false }, { status: 400 })
    }

    let user

    // role에 따라 적절한 데이터베이스 모델에서 사용자 검색
    if (role === 'analyst') {
      user = await Analyst.findOne({ email })
    } else if (role === 'doctor') {
      user = await Doctor.findOne({ email })
    } else {
      return NextResponse.json({ message: '잘못된 역할입니다', flg: false }, { status: 400 })
    }

    // 사용자가 존재하지 않는 경우, 이메일을 보내지 않고 종료
    if (!user) {
      return NextResponse.json({ message: '사용자가 존재하지 않습니다', flg: false }, { status: 203 })
    }

    // 랜덤한 확인 코드를 생성
    const randomNumber = generateRandomNumber()

    // 확인 코드와 유효 기간을 데이터베이스에 저장 (유효 기간을 15분 후로 설정)
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000) // 15분 후

    await VerificationCode.findOneAndUpdate(
      { verificationCodeId: user._id }, // 検索条件, userの_idを利用
      { roleType: role, email, code: randomNumber, expiresAt }, // 更新内容
      { upsert: true } // 존재하지 않는 경우 새로 생성
    )

    // nodemailer로 이메일 전송 설정
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    })

    // 이메일 옵션 설정
    const mailOptions = {
      from: process.env.GMAIL_USER,
      to: email,
      subject: 'Your Verification Code',
      text: `Your verification code is ${randomNumber}`,
      html: `
        <h2>Your Verification Code ${randomNumber}</h2>
        `,
    }

    // 이메일을 전송
    await transporter.sendMail(mailOptions)
    return NextResponse.json({ message: '확인 코드가 전송되었습니다', flg: true }, { status: 200 })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error(errorMessage)
    return NextResponse.json({ message: '이메일 전송에 실패했습니다', error: errorMessage }, { status: 500 })
  }
}
