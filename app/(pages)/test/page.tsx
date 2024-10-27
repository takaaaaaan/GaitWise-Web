'use client'
import React from 'react'
import styled from 'styled-components'

import useAuth from '@/../../utils/useAuth'
// '../../../../app/utils/useAuth'

export default function Page() {
  const loginUser = useAuth()

  return (
    <Container>
      <Title>로그인 상태 확인</Title>
      <div>
        <h1>인증 테스트</h1>
        <p>사용자 firstname: {loginUser.firstname}</p>
        <p>사용자 lastname: {loginUser.lastname}</p>
        <p>사용자 id: {loginUser.id}</p>
        <p>사용자 role: {loginUser.role}</p>
        <p>이메일 주소: {loginUser.email}</p>
        <p>로그인 상태: {loginUser.email ? '로그인 중' : '로그아웃 중'}</p>
      </div>
    </Container>
  )
}

// styled-components로 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f0f4f8;
  padding: 20px;
  border-radius: 10px;
  max-width: 500px;
  margin: 40px auto;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin-bottom: 20px;
`
