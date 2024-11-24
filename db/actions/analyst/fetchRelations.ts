import Organization from '@/db/models/organization'
import Project from '@/db/models/project'

/**
 * 특정 analyst ID를 기반으로 관련 Organization과 Project를 검색하는 함수
 * @param {string} analystId - Analyst의 ObjectId
 * @returns {Promise<{ organizations: { _id: string, name: string }[], projects: { _id: string, name: string }[] }>} - 관련 Organization과 Project 정보
 */
export async function getOrganizationsAndProjectsByAnalyst(analystId: string) {
  try {
    // Organization에서 analystId를 포함하는 조직 검색
    const organizations = await Organization.find({ analysts: analystId }).select('_id organization_name')

    // Project에서 analystId를 포함하는 프로젝트 검색
    const projects = await Project.find({ analysts: analystId }).select('_id project_name')

    // 데이터를 매핑하여 반환
    return {
      organizations: organizations.map((org) => ({
        _id: org._id.toString(),
        name: org.organization_name,
      })),
      projects: projects.map((proj) => ({
        _id: proj._id.toString(),
        name: proj.project_name,
      })),
    }
  } catch (error) {
    console.error('Error fetching organizations and projects:', error)
    throw new Error('Failed to fetch organizations and projects')
  }
}
