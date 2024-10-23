'use client'

import { Gaitwise } from '../../../public/images/svg'
import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'
import axios from 'axios'
import { useRouter } from 'next/navigation'

export default function SignUpView() {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('analyst')
  const [errorMessage, setErrorMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false) // 로딩 상태

  const router = useRouter()

  const signUp = async () => {
    setErrorMessage('')
    setIsLoading(true) // 로딩 상태 시작

    try {
      // role 따라 적절한 엔드포인트 선택
      const endpoint =
        role === 'analyst'
          ? `${process.env.NEXT_PUBLIC_DOMAIN}/api/analyst/signup`
          : `${process.env.NEXT_PUBLIC_DOMAIN}/api/doctor/signup`

      const res = await axios.post(endpoint, {
        firstname,
        lastname,
        email,
        password,
      })

      if (res.status === 200) {
        alert('계정 생성 성공')
        router.push('/auth?type=sign-in') // 로그인 페이지로 이동
      } else if (res.status === 203) {
        setErrorMessage(res.data.message || '이 이메일 주소는 이미 사용 중입니다')
      } else if (res.status === 500) {
        setErrorMessage(res.data.message || '회원가입 실패')
      }
    } catch {
      setErrorMessage('서버 오류가 발생했습니다')
    } finally {
      setIsLoading(false) // 로딩 상태 종료
    }
  }

  return (
    <SignUpBox>
      <Image src={Gaitwise} alt="logo" width={100} height={100} layout="responsive" />
      <Title>Create Account</Title>
      <Subtitle>Doctor must authenticate after Login</Subtitle>
      <RoleSelect>
        <label>
          <input
            type="radio"
            name="role"
            value="analyst"
            checked={role === 'analyst'}
            onChange={(e) => setRole(e.target.value)}
          />
          Analyst
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
      <InputField
        type="text"
        placeholder="First Name"
        value={firstname}
        onChange={(e) => setFirstname(e.target.value)}
      />
      <InputField type="text" placeholder="Last Name" value={lastname} onChange={(e) => setLastname(e.target.value)} />
      <InputField type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
      <SignUpButton
        onClick={signUp}
        disabled={isLoading || !firstname.trim() || !lastname.trim() || !email.trim() || !password.trim()}
      >
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </SignUpButton>
      <Links>
        <p>
          Already have an account?<a href="/auth?type=sign-in"> Sign In</a>
        </p>
      </Links>
    </SignUpBox>
  )
}

const SignUpBox = styled.div`
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

const SignUpButton = styled.button`
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

const ErrorMessage = styled.p`
  color: red;
  margin-bottom: 1rem;
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
