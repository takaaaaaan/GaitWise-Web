import nodemailer from 'nodemailer'

interface EmailSendOptions {
  email: string
  type: 'invitation' | 'notification' | 'custom'
  invitationType?: 'organization' | 'project' // 招待タイプ
  recipientName?: string
  actionLink?: string
  customSubject?: string
  customHtml?: string
}

// メール内容を生成する関数
function createEmailContent({
  type,
  invitationType,
  recipientName,
  actionLink,
  customSubject,
  customHtml,
}: Omit<EmailSendOptions, 'email'>) {
  let subject: string
  let html: string

  switch (type) {
    case 'invitation':
      if (invitationType === 'organization') {
        subject = 'Gaitwase: 조직에 대한 초대장이 도착했습니다！'
        html = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; background-color: #f9f9f9;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <h1 style="color: #0078D4;">${recipientName || '회원'}님, 조직에 초대되었습니다!</h1>
              <p>Gaitwase를 이용해 주셔서 감사합니다. 아래 링크를 클릭하여 조직 초대를 수락해 주세요.</p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="${actionLink}" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #ffffff; background-color: #0078D4; text-decoration: none; border-radius: 4px;">
                  조직 초대 수락하기
                </a>
              </div>
              <p>이 초대에 대해 기억나지 않으신다면, 이 이메일을 무시해 주세요.</p>
            </div>
          </div>
        `
      } else if (invitationType === 'project') {
        subject = 'Gaitwase: 프로젝트 초대장을 받았습니다！'
        html = `
          <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; background-color: #f9f9f9;">
            <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
              <h1 style="color: #0078D4;">Gaitwase에서의 초대</h1>
              <p>안녕하세요, ${recipientName || '회원'}님!</p>
              <p>Gaitwase를 이용해 주셔서 감사합니다. 아래 링크를 클릭하여 프로젝트 초대를 수락해 주세요.</p>
              <div style="text-align: center; margin: 20px 0;">
                <a href="${actionLink}" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #ffffff; background-color: #0078D4; text-decoration: none; border-radius: 4px;">
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
        `
      } else {
        throw new Error('유효하지 않은 invitationType입니다.')
      }
      break

    case 'notification':
      subject = 'Gaitwase: 새로운 알림이 있습니다.'
      html = `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; padding: 20px; background-color: #f9f9f9;">
          <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; padding: 20px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            <h1 style="color: #0078D4;">${recipientName || '사용자'}님, 새로운 알림이 있습니다!</h1>
            <p>알림을 확인하려면 아래 링크를 클릭하세요.</p>
            <div style="text-align: center; margin: 20px 0;">
              <a href="${actionLink || '#'}" style="display: inline-block; padding: 12px 24px; font-size: 16px; color: #ffffff; background-color: #0078D4; text-decoration: none; border-radius: 4px;">
                알림 확인
              </a>
            </div>
          </div>
        </div>
      `
      break

    case 'custom':
      subject = customSubject || 'Gaitwase: 알림'
      html = customHtml || '<p>사용자 정의 HTML 내용</p>'
      break

    default:
      throw new Error('유효하지 않은 이메일 타입입니다.')
  }

  return { subject, html }
}

// メール送信関数
export async function sendEmail({
  email,
  type,
  invitationType,
  recipientName,
  actionLink,
  customSubject,
  customHtml,
}: EmailSendOptions): Promise<boolean> {
  try {
    // nodemailer トランスポーター設定
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    })

    // メール内容を生成
    const { subject, html } = createEmailContent({
      type,
      invitationType,
      recipientName,
      actionLink,
      customSubject,
      customHtml,
    })

    // メールオプション設定
    const mailOptions = {
      from: process.env.GMAIL_USER, // 発信者のメールアドレス
      to: email, // 受信者のメールアドレス
      subject, // メールタイトル
      html, // HTML形式の本文
    }

    // メール送信
    await transporter.sendMail(mailOptions)
    return true
  } catch (error) {
    console.error('メール送信エラー:', error instanceof Error ? error.message : error)
    return false
  }
}

//=============== example =================//
// async function example() {
//   // 組織招待メールを送信
// const isOrganizationEmailSent = await sendEmail({
//   email: 'organization@example.com',
//   type: 'invitation',
//   invitationType: 'organization',
//   recipientName: '홍길동',
//   actionLink: 'https://gaitwase.com/organization-invite',
// })

// if (isOrganizationEmailSent) {
//   console.log('組織招待メールが正常に送信されました！')
// } else {
//   console.error('組織招待メール送信に失敗しました。')
// }

//   // プロジェクト招待メールを送信
//   const isProjectEmailSent = await sendEmail({
//     email: 'project@example.com',
//     type: 'invitation',
//     invitationType: 'project',
//     recipientName: '이순신',
//     actionLink: 'https://gaitwase.com/project-invite',
//   })

//   if (isProjectEmailSent) {
//     console.log('プロジェクト招待メールが正常に送信されました！')
//   } else {
//     console.error('プロジェクト招待メール送信に失敗しました。')
//   }
// }

// example()
//======================================//
