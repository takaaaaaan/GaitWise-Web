import axios from 'axios'
import { DiagnosisHistory, PatientList } from 'components'

import type { DiagnosisRecord, Diagnostic, Patient, PatientProfileType, User } from '@/app/types'
import { SideTabs } from '@/components/common/SideTabs'
import getAllPatients from '@/lib/services/Patients'

const getWalkingData = async (userId: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN

    const response = await axios.post(
      `${baseUrl}/api/user/walkingdata`, // Fixed template string usage
      { participantId: userId },
      { headers: { 'Content-Type': 'application/json' } }
    )

    if (response.status !== 200) {
      throw new Error(`Failed to fetch walking data for user: ${userId}`)
    }

    console.log('Walking data response:', response.data)
    return response.data.data
  } catch (error) {
    console.error('Error fetching walking data:', error.message || error)
    return null // Return null on error to prevent breaking the app
  }
}

const fetchProjectData = async (projectTitle: string) => {
  try {
    const query = new URLSearchParams({ project_name: projectTitle }).toString()
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN

    const response = await fetch(`${baseUrl}/api/project/pagedetails/?${query}`, {
      method: 'GET',
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch data for project: ${projectTitle}`)
    }

    const data = await response.json()
    return data.projectData
  } catch (error) {
    console.error('Error fetching project data:', error.message || error)
    return null // Return null if project data fetching fails
  }
}

function getProfileData<Patient>(participant: Patient): PatientProfileType {
  const profile: PatientProfileType = {}

  for (const key in participant) {
    if (participant) {
      const value = participant[key]
      if (value && typeof value !== 'object') {
        profile[key] = value
      }
    }
  }

  return profile
}

export default async function Home({ params }: { params: { projectTitle: string; username: string } }) {
  const { projectTitle, username } = params
  console.log('SSR params:', { projectTitle, username })

  // Fetch project data
  const projectData = await fetchProjectData(projectTitle)
  const participants: User[] = projectData?.participants || []

  // Fetch walking data
  const userId = '67479ff36bbd872dd55e3161' // Replace with dynamic userId if needed
  const walkingData = await getWalkingData(userId)

  // Fetch initial patient data
  const initialData = await getAllPatients()
  const participant: Patient | undefined = initialData.find((p) => p.name.includes('Jessica Taylor'))

  // Prepare profile and related data
  const profile = participant ? getProfileData(participant) : {}
  const diagnosisHistory: DiagnosisRecord[] = participant?.diagnosis_history || []
  const diagnoticList: Diagnostic[] = participant?.diagnostic_list || []
  const labResults: string[] = participant?.lab_results || []

  return (
    <main className="mx-4 mb-8 flex min-h-screen flex-wrap justify-center lg:grid lg:grid-flow-col lg:grid-cols-4 lg:grid-rows-1 lg:gap-x-8">
      <section className="mb-8 lg:mb-0">
        <PatientList participants={participants} projectTitle={projectTitle} />
      </section>
      <section className="col-start-2 col-end-4 mb-8 grid grid-cols-1 gap-8 lg:mb-0">
        <DiagnosisHistory diagnosisHistory={diagnosisHistory} />
      </section>
      <section className="mb-8 grid grid-cols-1 gap-8 lg:mb-0">
        <SideTabs profile={profile} labResults={labResults} walkingData={walkingData} />
      </section>
    </main>
  )
}
