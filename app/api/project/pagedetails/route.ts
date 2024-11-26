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

    if (!project) {
      return NextResponse.json(
        { message: 'No project found with the specified name.', success: false },
        { status: 404 }
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
      custom_survey: project.custom_survey
        ? {
            title: project.custom_survey.title,
            description: project.custom_survey.description,
            status: project.custom_survey.status,
            selection: project.custom_survey.selection.map(
              (sel: { content: string; options: string[]; type: string; min: number; max: number }) => ({
                content: sel.content,
                options: sel.options,
                type: sel.type,
                min: sel.min,
                max: sel.max,
              })
            ),
            text_response: project.custom_survey.text_response.map((text: { content: string }) => ({
              content: text.content,
            })),
          }
        : null,
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
