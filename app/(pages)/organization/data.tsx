import { Organization } from 'types'

export const testOrganization: Organization = {
  _id: '648a1c2d9f0b123456789012', // MongoDB ObjectId
  organization_name: 'Health Solutions Inc.', // 조직 이름
  organization_description: '건강 기술 솔루션 분야의 선도적인 조직입니다.', // 조직 설명
  creator: '123e4567-e89b-12d3-a456-426614174000', // 생성자의 ID
  projects: ['proj1', 'proj2', 'proj3'], // 관련 프로젝트 ID 리스트
  analysts: ['analyst1', 'analyst2'], // 참여 중인 분석가 ID 리스트
  organization_profile_image: '', // 프로필 이미지 URL
  createdAt: new Date('2023-11-01T10:30:00Z'), // 생성 날짜
  updatedAt: new Date('2023-11-07T12:00:00Z'), // 업데이트 날짜
}
