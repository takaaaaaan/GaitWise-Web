'use client'

import { useSearchParams } from 'next/navigation' // useRouter를 임포트
import { Suspense } from 'react'
import styled from 'styled-components'

import ForgetPasswordView from './ForgetPass'
import CreateOrganizationView from './organization'
import ResetPassView from './ResetPass'
import SigninView from './Signin'
import SignUpView from './Signup'

function AuthContent() {
  const searchParams = useSearchParams()
  const type = searchParams.get('type')
  const organization = searchParams.get('organization')
  const project = searchParams.get('project')

  const handleSignIn = () => {
    window.location.href = '/participant'
  }

  return (
    <Container>
      {type === 'sign-in' && <SigninView onSignIn={handleSignIn} />}
      {type === 'sign-up' && <SignUpView organization={organization} project={project} />}
      {type === 'forgetpass' && <ForgetPasswordView />}
      {type === 'reset-pass' && <ResetPassView />}
      {type === 'organization' && <CreateOrganizationView />}
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
