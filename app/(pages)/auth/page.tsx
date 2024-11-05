'use client'

import { Gaitwise } from '@/public'
import axios from 'axios' // axios를 임포트
import Cookies from 'js-cookie' // js-cookie를 임포트
import Image from 'next/image'
import { useSearchParams } from 'next/navigation' // useRouter를 임포트
import { Suspense, useState } from 'react'
import styled from 'styled-components'


import ForgetPasswordView from './ForgetPass'
import ResetPassView from './ResetPass'
import SignUpView from './Signup'

function AuthContent() {
  const searchParams = useSearchParams() // URL의 쿼리 파라미터를 가져옴
  const type = searchParams.get('type') // 'type' 쿼리 파라미터를 가져옴

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('analyst')
  const [isLoading, setIsLoading] = useState(false)

  const signIn = async () => {
    setIsLoading(true) // 로딩 중임을 표시
    try {
      // role에 따라 다른 엔드포인트로 요청을 보냄
      const endpoint =
        role === 'analyst'
          ? `${process.env.NEXT_PUBLIC_DOMAIN}/api/analyst/signin`
          : `${process.env.NEXT_PUBLIC_DOMAIN}/api/doctor/signin`

      const res = await axios.post(endpoint, {
        email,
        password,
      })

      const jsondata = res.data
      if (jsondata.flg) {
        // 성공하면, 토큰을 쿠키에 저장
        if ('token' in jsondata) {
          // 쿠키에 토큰을 저장
          Cookies.set('token', jsondata.token, {
            expires: 1, // 1일 후에 만료
            secure: process.env.NEXT_PUBLIC_SECURE === 'true', // 실제 환경에서만 HTTPS 연결에서만 전송됨
            sameSite: 'Strict', // 동일 사이트 간에만 쿠키가 전송됨
          })

          // 성공 메시지 표시
          alert(jsondata.message)

          // 로그인 후 페이지로 리다이렉트 (예: '/test')
          window.location.href = '/participant'
        }
      } else {
        alert(jsondata.message)
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error(errorMessage)
      alert('로그인 실패')
    } finally {
      setIsLoading(false) // 로딩 중임을 해제
    }
  }

  return (
    <Container>
      {type === 'sign-in' && (
        <LoginBox>
          <Image src={Gaitwise} alt="logo" width={100} height={100} layout="responsive" />
          <Title>Hi, Welcome Back!</Title>
          <Subtitle>Please select a Type</Subtitle>

          <RoleSelect>
            <label>
              <input
                type="radio"
                name="role"
                value="analyst"
                checked={role === 'analyst'}
                onChange={(e) => setRole(e.target.value)}
              />
              Analysts
            </label>
            <label>
              <input
                type="radio"
                name="role"
                value="doctor"
                checked={role === 'doctor'}
                onChange={(e) => setRole(e.target.value)}
              />
              Doctor
            </label>
          </RoleSelect>

          <InputField type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {isLoading ? (
            <LoginButton disabled={true}>Sign In...</LoginButton>
          ) : (
            <LoginButton onClick={signIn} disabled={!email.trim() || !password.trim() || isLoading}>
              Sign In
            </LoginButton>
          )}

          <Links>
            <a href="/auth?type=forgetpass">Forgot password?</a>
            <p>
              Don’t have an account yet? <a href="/auth?type=sign-up">Sign up</a>
            </p>
          </Links>
        </LoginBox>
      )}

      {type === 'sign-up' && <SignUpView />}

      {type === 'forgetpass' && <ForgetPasswordView />}

      {type === 'reset-pass' && <ResetPassView />}
    </Container>
  )
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <AuthContent />
    </Suspense>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
`

const LoginBox = styled.div`
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

const RoleSelect = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;

  label {
    margin: 0 1rem;
    font-size: 1rem;
  }
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

const LoginButton = styled.button`
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
