'use client'

import axios from 'axios'
import Cookies from 'js-cookie'
import Image from 'next/image'
import { useState } from 'react'
import styled from 'styled-components'

import { useSigninMode } from '@/hooks/useSigninMode'
import { Gaitwise } from '@/public'

interface SigninViewProps {
  organization: string | null
  project: string | null
}

export default function SigninView({ organization, project }: SigninViewProps) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('analyst')
  const [isLoading, setIsLoading] = useState(false)

  const mode = useSigninMode(organization, project)

  const handleSignIn = () => {
    let redirectUrl = '/participant'

    if (mode === 'orginvitation') {
      redirectUrl = `/organization/${organization}` // Organization 招待の場合
    } else if (mode === 'projectinvitation') {
      redirectUrl = `/organization/${organization}/project/${project}` // Project 招待の場合
    } else if (mode === 'invalidConfig') {
      redirectUrl = '/error' // 不正な設定の場合
    }

    window.location.href = redirectUrl
  }

  const signIn = async () => {
    setIsLoading(true)
    try {
      const endpoint =
        role === 'analyst'
          ? `${process.env.NEXT_PUBLIC_DOMAIN}/api/analyst/signin`
          : `${process.env.NEXT_PUBLIC_DOMAIN}/api/doctor/signin`

      const res = await axios.post(endpoint, { email, password, organization, project })
      const jsondata = res.data

      if (jsondata.flg && jsondata.token) {
        Cookies.set('token', jsondata.token, {
          expires: 1,
          secure: process.env.NEXT_PUBLIC_SECURE === 'true',
          sameSite: 'Strict',
        })
        alert(jsondata.message)
        handleSignIn()
      } else {
        alert(jsondata.message)
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error'
      console.error(errorMessage)
      alert('ログ인 실패')
    } finally {
      setIsLoading(false)
    }
  }

  if (mode === 'invalidConfig') {
    return (
      <MessageBox>
        <p>Invalid configuration: Project cannot exist without an Organization. Please correct the issue.</p>
      </MessageBox>
    )
  }

  let messageContent
  if (mode === 'orginvitation') {
    messageContent = (
      <p>
        You have been invited to join the organization: <strong>{organization}</strong>.
      </p>
    )
  } else if (mode === 'projectinvitation') {
    messageContent = (
      <p>
        You have been invited to join the project: <strong>{project}</strong> under the organization:
        <strong>{organization}</strong>.
      </p>
    )
  }

  return (
    <LoginBox>
      <Image src={Gaitwise} alt="logo" width={100} height={100} layout="responsive" />
      <Title>Hi, Welcome Back!</Title>
      <Subtitle>Please select a Type</Subtitle>
      {messageContent && <Subtitle>{messageContent}</Subtitle>}
      {mode === 'default' && (
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
      )}
      <InputField type="email" placeholder="Your Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <InputField
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      {isLoading ? (
        <LoginButton disabled>Sign In...</LoginButton>
      ) : (
        <LoginButton onClick={signIn} disabled={!email.trim() || !password.trim() || isLoading}>
          Sign In
        </LoginButton>
      )}
      {mode === 'default' && (
        <Links>
          <a href="/auth?type=forgetpass">Forgot password?</a>
          <p>
            Don’t have an account yet? <a href="/auth?type=sign-up">Sign up</a>
          </p>
        </Links>
      )}
      {mode !== 'default' && (
        <Links>
          <a href="/auth?type=forgetpass">Forgot password?</a>
        </Links>
      )}
    </LoginBox>
  )
}

const MessageBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f4f8;
  text-align: center;

  p {
    color: #333;
    font-size: 1.2rem;
    margin: 0;

    strong {
      font-weight: bold;
      color: #2d3748;
    }
  }
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
