// app/api/organization-projects/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { Organization as OrgDataType } from 'types'

import { verifyTokenAndGetUser } from '@/db/actions'
import { dbConnect, Organization, Project } from '@/db/models'

export async function POST(req: NextRequest) {
  try {
    // Extract token from request headers
    const token = req.headers.get('Authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          message: 'Token is required',
        },
        { status: 401 }
      )
    }

    // Verify the token and get user information
    const { user, error } = await verifyTokenAndGetUser(token)
    if (error || !user) {
      return NextResponse.json(
        {
          success: false,
          message: error || 'Unable to identify the user',
        },
        { status: 403 }
      )
    }

    // Connect to MongoDB
    await dbConnect()

    // Find organizations the analyst belongs to
    const organizations = (await Organization.find({ analysts: user.id })
      .select('organization_name projects')
      .lean()) as OrgDataType[]
    if (!organizations || organizations.length === 0) {
      return NextResponse.json(
        {
          success: false,
          message: 'No organizations found for the user',
        },
        { status: 404 }
      )
    }

    // Get project IDs from organizations and find related projects
    const projectIds = organizations.flatMap((org) => org.projects)
    const projects = await Project.find({ _id: { $in: projectIds } })
      .select('project_name')
      .lean()
    console.log('Projects:', projects)

    // Group organizations and projects
    const response = organizations.map((org) => ({
      organization_name: org.organization_name,
      projects: projects
        .filter((project) => org.projects.some((id: string) => id.toString() === project._id.toString()))
        .map((project) => project.project_name),
    }))
    console.log('Response:', response)

    return NextResponse.json(
      {
        success: true,
        message: 'Data retrieved successfully',
        data: response,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      {
        success: false,
        message: 'Internal server error',
      },
      { status: 500 }
    )
  }
}
