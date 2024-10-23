'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { Gaitwise } from '../../../public/images/svg'
import Image from 'next/image'
import { useRouter, useSearchParams } from 'next/navigation'
import axios from 'axios' // axios를 임포트

function ResetPassView() {
  const searchParams = useSearchParams()
  //   FIXME : URL안에 데이터 해시화 필요
  const email = searchParams.get('email') // URL에서 'email'을 가져옴
  const role = searchParams.get('role') // URL에서 'role'을 가져옴
  const router = useRouter() // useRouter 훅을 사용

  const [repassword1, setRepassword1] = useState('') // 비밀번호1 상태
  const [repassword2, setRepassword2] = useState('') // 비밀번호2 상태
  const [loading, setLoading] = useState(false) // 로딩 상태 관리

  // 비밀번호를 재설정하는 함수
  const resetPass = async () => {
    if (repassword1 !== repassword2) {
      alert('비밀번호가 일치하지 않습니다')
      return
    }

    setLoading(true) // 로딩 시작

    try {
      const response = await axios.post('/api/auth/reset-password', {
        email,
        repassword: repassword1,
        role,
      })

      if (response.status === 200) {
        alert('비밀번호가 정상적으로 변경되었습니다')
        router.push('/auth?type=sign-in') // 로그인 페이지로 이동
      } else {
        alert(`오류가 발생했습니다: ${response.data.message}`)
      }
    } catch (error) {
      console.error(error)
      alert('비밀번호 변경 중 오류가 발생했습니다')
    } finally {
      setLoading(false) // 로딩 종료
    }
  }

  return (
    <ResetPassBox>
      <Image src={Gaitwise} alt="logo" width={100} height={100} layout="responsive" />
      <Title>Hi, Welcome Back!</Title>
      <Subtitle>Please reset your password</Subtitle>

      <InputField
        type="password"
        placeholder="New Password"
        value={repassword1}
        onChange={(e) => setRepassword1(e.target.value)}
      />
      <InputField
        type="password"
        placeholder="Confirm Password"
        value={repassword2}
        onChange={(e) => setRepassword2(e.target.value)}
      />

      <ResetPassButton onClick={resetPass} disabled={!repassword1.trim() || !repassword2.trim() || loading}>
        {loading ? 'Loading...' : 'Reset Password'}
      </ResetPassButton>

      <Links>
        <a href="/auth?type=forgetpass">Forgot password?</a>
        <p>
          Don’t have an account yet? <a href="/auth?type=sign-up">Sign up</a>
        </p>
      </Links>
    </ResetPassBox>
  )
}

export default ResetPassView

const ResetPassBox = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 350px;
`

const Title = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
`

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 1.5rem;
`

const InputField = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: #f9f9f9;
`

const ResetPassButton = styled.button`
  width: 100%;
  padding: 0.75rem;
  background-color: #2d3748;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #1a202c;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`

const Links = styled.div`
  margin-top: 1rem;

  a {
    color: #3182ce;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`
