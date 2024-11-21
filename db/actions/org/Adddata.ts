import mongoose from 'mongoose'

import Organization from '@/db/models/organization'

/**
 * 指定された組織のanalystsフィールドに新しいanalystを追加する関数
 * @param organizationId 組織のID
 * @param analystId 追加するanalystのID
 * @returns 更新された組織のデータ
 */
export async function addAnalystToOrganization(organizationId: string, analystId: string) {
  try {
    // 組織を取得し、analysts配列にanalystIdを追加
    const updatedOrganization = await Organization.findByIdAndUpdate(
      organizationId,
      { $addToSet: { analysts: new mongoose.Types.ObjectId(analystId) } }, // 重複を防ぐため $addToSet を使用
      { new: true } // 更新後のデータを取得
    )

    if (!updatedOrganization) {
      throw new Error('Organization not found')
    }

    return updatedOrganization
  } catch (error) {
    console.error('Error adding analyst to organization:', error)
    throw error
  }
}

/**
 * 指定された組織のprojectsフィールドに新しいプロジェクトを追加する関数
 * @param organizationId 組織のID
 * @param projectId 追加するプロジェクトのID
 * @returns 更新された組織のデータ
 */
export async function addProjectToOrganization(organizationId: string, projectId: string) {
  try {
    // 組織を取得し、projects配列にprojectIdを追加
    const updatedOrganization = await Organization.findByIdAndUpdate(
      organizationId,
      { $addToSet: { projects: new mongoose.Types.ObjectId(projectId) } }, // 重複を防ぐため $addToSet を使用
      { new: true } // 更新後のデータを取得
    )

    if (!updatedOrganization) {
      throw new Error('Organization not found')
    }

    return updatedOrganization
  } catch (error) {
    console.error('Error adding project to organization:', error)
    throw error
  }
}
