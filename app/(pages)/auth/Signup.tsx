'use client'

import axios from 'axios'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import styled from 'styled-components'

import { useSigninMode } from '@/hooks/useSigninMode'
import { Gaitwise } from '@/public'

interface SignUpViewProps {
  organization: string | null
  project: string | null
}

export default function SignUpView({ organization, project }: SignUpViewProps) {
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('analyst')
  const [isLoading, setIsLoading] = useState(false)

  // UI 状態を管理
  const mode = useSigninMode(organization, project)

  const router = useRouter()

  const signUp = async () => {
    setIsLoading(true)

    try {
      const endpoint =
        role === 'analyst'
          ? `${process.env.NEXT_PUBLIC_DOMAIN}/api/analyst/signup`
          : `${process.env.NEXT_PUBLIC_DOMAIN}/api/doctor/signup`

      const res = await axios.post(endpoint, {
        firstname,
        lastname,
        email,
        password,
        organization, // 必要に応じて送信
        project, // 必要に応じて送信
      })

      if (res.status === 200) {
        alert('Account successfully created')
        router.push('/auth?type=sign-in')
      } else if (res.status === 203) {
        alert(res.data.message || 'This email is already in use')
      } else if (res.status === 500) {
        alert(res.data.message || 'Signup failed')
      }
    } catch {
      alert('A server error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  // UI の条件付きレンダリング
  if (mode === 'invalidConfig') {
    return (
      <MessageBox>
        <p>Invalid configuration: Project cannot exist without an Organization. Please correct the issue.</p>
      </MessageBox>
    )
  }
  // UI の条件付きレンダリング
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
        You have been invited to join the project: <strong>{project}</strong> under the organization:{' '}
        <strong>{organization}</strong>.
      </p>
    )
  }
  // Default sign-up form
  return (
    <SignUpBox>
      <Image src={Gaitwise} alt="logo" width={100} height={100} layout="responsive" />
      <Title>Create Account</Title>
      <Subtitle>Welcome! Please fill out the form below to create an account.</Subtitle>
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
      )}
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
      <SignUpButton
        onClick={signUp}
        disabled={isLoading || !firstname.trim() || !lastname.trim() || !email.trim() || !password.trim()}
      >
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </SignUpButton>
      {mode === 'default' && (
        <Links>
          <p>
            Already have an account?<a href="/auth?type=sign-in"> Sign In</a>
          </p>
        </Links>
      )}
    </SignUpBox>
  )
}

// UI メッセージ用のスタイル
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
