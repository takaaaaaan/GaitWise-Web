import { NextRequest, NextResponse } from 'next/server'

import { dbConnect, Project } from '@/db/models'

/**
 * @description Get project details by project name.
 * @searchParams project_name
 */
export async function GET(req: NextRequest) {
  try {
    await dbConnect()
    // Get project_name from query parameters
    const projectName = req.nextUrl.searchParams.get('project_name')
    console.log('projectName:', projectName)
    if (!projectName) {
      return NextResponse.json({ message: 'project_name is required.', success: false }, { status: 400 })
    }

    // Search for the project in the database
    const project = await Project.findOne({ project_name: projectName })
      .populate('organization') // Get organization details
      .populate({
        path: 'participants',
        select: '-password', // Exclude the password field
      })
      .populate({
        path: 'analysts',
        select: '-password', // Exclude the password field
      })
      .populate('surveys') // Get related survey information
    console.log('project data:', project)
    if (!project) {
      return NextResponse.json(
        { message: 'No project found with the specified name.', success: false },
        { status: 203 }
      )
    }

    // Return the required data (including all schema fields)
    const projectData = {
      project_id: project._id,
      project_name: project.project_name,
      project_description: project.project_description,
      project_code: project.project_code,
      organization: project.organization,
      participants: project.participants,
      surveys: project.surveys,
      analysts: project.analysts,
      custom_survey: project.custom_survey,
      creator: project.creator,
      createdAt: project.createdAt, // Creation date
      updatedAt: project.updatedAt, // Update date
    }

    return NextResponse.json({ message: 'Data retrieved successfully.', success: true, projectData }, { status: 200 })
  } catch (error) {
    console.error('An error occurred while fetching project information:', error)
    return NextResponse.json(
      { message: 'An unexpected error occurred. Please try again later.', success: false },
      { status: 500 }
    )
  }
}
