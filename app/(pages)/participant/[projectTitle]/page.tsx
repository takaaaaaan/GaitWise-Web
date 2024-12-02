import ProjectHeader from '@/components/participants/ParticipantHeader'
import TableWrapper from '@/components/participants/Table/TableWapper'

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

export default async function Home({ params }: { params: { projectTitle: string; username: string } }) {
  const { projectTitle, username } = params
  console.log('SSR params:', projectTitle, username)

  let projectData, participants
  try {
    projectData = await fetchProjectData(projectTitle)
    if (projectData.participants) {
      participants = projectData.participants
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error fetching project or participant data: ${error.message}`)
    } else {
      console.error('Error fetching project or participant data:', error)
    }
  }

  return (
    <main className="mt-10 w-full flex-row px-11">
      <ProjectHeader projectdata={projectData || []} />
      <h2 className="mt-10 text-2xl font-semibold text-gray-800">User List</h2>
      <div className="mt-5">
        <TableWrapper participants={participants} projectdata={projectData} />
      </div>
    </main>
  )
}
