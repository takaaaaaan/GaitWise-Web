import { PatientList, SideTabs } from 'components'
import Link from 'next/link'
import { Survey, User, Walking } from 'types'

import { WidgetsWapper } from '@/components/participants/Widgets'
import { Button } from '@/ui'

async function fetchProjectData(projectTitle: string) {
  const query = new URLSearchParams({ project_name: projectTitle }).toString()
  const baseUrl = process.env.SERVER_DOMAIN
  const response = await fetch(`${baseUrl}/api/project/pagedetails/?${query}`, {
    method: 'GET',
    cache: 'no-store', // 캐싱 방지
  })

  if (!response.ok) {
    throw new Error(`Failed to fetch data for project: ${projectTitle}`)
  }
  const data = await response.json()
  return data.projectData
}

export default async function Home({ params }: { params: { projectTitle: string; userid: string } }) {
  const { projectTitle, userid } = params
  console.log('SSR params:', projectTitle, userid)

  let projectData, participants, participant

  try {
    projectData = await fetchProjectData(projectTitle)

    if (projectData.participants) {
      participants = projectData.participants
    }

    participant = participants?.find((p: User) => p._id === userid)
    console.log('Participant:', participant)
  } catch (error) {
    console.error(`Error fetching project or participant data: ${(error as Error).message}`)
  }

  // Participant not found or no data
  if (!participant) {
    return (
      <main className="mx-4 flex min-h-[calc(100vh-7rem)] flex-wrap items-center justify-center">
        <section className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">Participant Not Found</h1>
          <p className="mt-2 text-gray-600">
            The participant with username (ID) <strong>{userid}</strong> could not be located in the project{' '}
            <strong>{projectTitle}</strong>.
          </p>
          <p className="mt-4 text-sm text-gray-500">Please check the project or participant details and try again.</p>
          <Button variant="default" color="primary" className="mt-4" asChild>
            <Link href={`/participant/${projectTitle}`}>Back Project Menu</Link>
          </Button>
        </section>
      </main>
    )
  }

  // Extract surveys and walkingHistory
  const survey = participant.surveys.map((survey: Survey) => ({
    essential_survey: survey.essential_survey,
    custom_survey: survey.custom_survey,
    createdAt: survey.createdAt,
  }))

  const walkingHistory = participant.walking_history.map((history: Walking) => ({
    _id: history._id,
    createdAt: history.createdAt,
    walking_time: history.walking_time,
  }))
  // Create the user profile object
  const userprofileData = {
    _id: participant._id,
    firstName: participant.firstName,
    lastName: participant.lastName,
    gender: participant.gender,
    age: participant.age,
    email: participant.email,
    height: participant.height,
    weight: participant.weight,
    job: participant.job,
    survey,
    walkingHistory,
  }

  return (
    <main className="mx-4 mb-8 flex min-h-screen flex-wrap justify-center p-8 lg:grid lg:grid-flow-col lg:grid-cols-4 lg:grid-rows-1 lg:gap-x-8">
      <section className="mb-8 lg:mb-0">
        <PatientList participants={participants} projectTitle={projectTitle} />
      </section>
      {/* <section className="col-start-2 col-end-4 mb-8 grid grid-cols-1 gap-8 lg:mb-0"> */}
      <section className="col-start-2 col-end-4 mb-8">
        <WidgetsWapper userid={userid} walkingHistory={walkingHistory} userData={userprofileData} />
      </section>
      <section className="mb-8 grid grid-cols-1 gap-8 lg:mb-0">
        <SideTabs profile={userprofileData} />
      </section>
    </main>
  )
}
