// db\actions\org\fetch.ts
import Organization from '@/db/models/organization'

/**
 * 組織のIDから名前を取得する関数
 * @param organizationId 組織のID
 * @returns 組織の名前 (string)
 */
export async function getOrganizationNameById(organizationId: string) {
  try {
    const organization = await Organization.findById(organizationId).select('organization_name')

    if (!organization) {
      throw new Error('Organization not found')
    }

    return organization.organization_name
  } catch (error) {
    console.error('Error fetching organization name by ID:', error)
    throw error
  }
}

/**
 * 組織の名前からIDを取得する関数
 * @param organizationName 組織の名前
 * @returns 組織のID (string)
 */
export async function getOrganizationIdByName(organizationName: string) {
  try {
    const organization = await Organization.findOne({ organization_name: organizationName }).select('_id')

    if (!organization) {
      throw new Error('Organization not found')
    }

    return organization._id
  } catch (error) {
    console.error('Error fetching organization ID by name:', error)
    throw error
  }
}
