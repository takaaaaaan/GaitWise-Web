import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

import { Analyst, dbConnect, Organization } from '@/db/models'

export async function POST(request: NextRequest) {
  try {
    await dbConnect()

    // 요청 내용 가져오기
    const body = await request.json()
    const { email, _id: orgid } = body

    // 유효성 검사
    if (!email) {
      return NextResponse.json({ message: '이메일 주소가 누락되었습니다.', flg: false }, { status: 400 })
    }
    if (!orgid) {
      return NextResponse.json({ error: 'orgid 필수입니다.' }, { status: 400 })
    }
    // 데이터베이스에 연결
    // 데이터베이스에서 조직 검색
    const organization = await Organization.findOne({
      _id: orgid,
    })
    console.log(organization.analysts)
    // 데이터베이스에서 여러 프로젝트 검색
    const existinganalyts = await Analyst.find({ _id: organization.analysts })

    // 비교
    const isEmailExists = existinganalyts.some((analyst) => analyst.email === email)

    if (isEmailExists) {
      return NextResponse.json({ message: '이미 존재하는 이메일입니다.', flg: false }, { status: 400 })
    }

    // nodemailer 트랜스포터 설정
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    })

    // 이메일 옵션 설정
    const mailOptions = {
      from: process.env.GMAIL_USER, // 발신자 이메일 주소
      to: email, // 수신자 이메일 주소
      subject: 'Gaitwase: 메시지 알림', // 제목
      text: 'Gaitwase에서 초대장이 도착했습니다.', // 텍스트 형식 메시지
      html: `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; background-color: #f9f9f9;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <h1 style="color: #0078D4;">Gaitwase에서의 초대</h1>
              <p>안녕하세요!</p>
              <p>Gaitwase를 이용해 주셔서 감사합니다. 아래 링크를 클릭하여 초대를 수락해 주세요.</p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="${process.env.NEXT_PUBLIC_DOMAIN}/auth?type=sign-in" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #ffffff; background-color: #0078D4; text-decoration: none; border-radius: 4px;">
                  초대 수락하기
                </a>
              </div>
              <p>이 초대에 대해 기억나지 않으신다면, 이 이메일을 무시해 주세요.</p>
              <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 20px 0;" />
              <p style="font-size: 14px; color: #777;">
                이 이메일은 Gaitwase 시스템에 의해 자동 생성되었습니다. 문의 사항이 있으시면, <a href="mailto:${process.env.NEXT_PUBLIC_SUPPORT_EMAIL}" style="color: #0078D4; text-decoration: none;">support@gaitwase.com</a>으로 문의해 주세요.
              </p>
            </div>
          </div>
        `,
    }

    // 이메일 발송
    await transporter.sendMail(mailOptions)

    return NextResponse.json({ message: '이메일이 전송되었습니다.', flg: true }, { status: 200 })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : '예기치 않은 오류가 발생했습니다.'
    console.error('오류:', errorMessage)
    return NextResponse.json(
      { message: '이메일 전송에 실패했습니다.', error: errorMessage, flg: false },
      { status: 500 }
    )
  }
}
