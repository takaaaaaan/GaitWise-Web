// db\actions\project\fetch.ts
import Project from '@/db/models/project'

/**
 * プロジェクトのIDから名前を取得する関数
 * @param projectId プロジェクトのID
 * @returns プロジェクトの名前 (string)
 */
export async function getProjectNameById(projectId: string) {
  try {
    const project = await Project.findById(projectId).select('project_name')

    if (!project) {
      throw new Error('Project not found')
    }

    return project.project_name
  } catch (error) {
    console.error('Error fetching project name by ID:', error)
    throw error
  }
}

/**
 * プロジェクトの名前からIDを取得する関数
 * @param projectName プロジェクトの名前
 * @returns プロジェクトのID (string)
 */
export async function getProjectIdByName(projectName: string) {
  try {
    const project = await Project.findOne({ project_name: projectName }).select('_id')

    if (!project) {
      throw new Error('Project not found')
    }

    return project._id
  } catch (error) {
    console.error('Error fetching project ID by name:', error)
    throw error
  }
}
