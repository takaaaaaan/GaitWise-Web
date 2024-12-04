import { NextRequest, NextResponse } from 'next/server'

import { dbConnect, Project, Survey, Walking } from '@/db/models'

export async function GET(req: NextRequest) {
  try {
    await dbConnect()
    // Get project_name from query parameters
    const projectName = req.nextUrl.searchParams.get('project_name')
    console.log('projectName:', projectName)
    if (!projectName) {
      return NextResponse.json({ message: 'project_name is required.', success: false }, { status: 400 })
    }

    const project = await Project.findOne({ project_name: projectName })
      .populate('organization')
      .populate({
        path: 'participants',
        select: '-password',
        populate: [
          { path: 'walking_history', model: Walking, select: 'walking_time createdAt _id' },
          { path: 'surveys', model: Survey },
        ],
      })
      .populate({
        path: 'analysts',
        select: '-password', // Exclude the password field
      })
      .populate('surveys') // Get related survey information
    // console.log('project data:', project)
    if (!project) {
      return NextResponse.json(
        { message: 'No project found with the specified name.', success: false },
        { status: 203 }
      )
    }

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

    const response = NextResponse.json(
      { message: 'Data retrieved successfully.', success: true, projectData },
      { status: 200 }
    )

    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate')
    response.headers.set('Pragma', 'no-cache')
    response.headers.set('Expires', '0')

    return response
  } catch (error) {
    console.error('Error while fetching project information:', error)
    return NextResponse.json({ message: 'Internal server error.', success: false }, { status: 500 })
  }
}
