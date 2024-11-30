import SurveySearchWrapper from '@/components/survey/SurveySearchWrapper'
import CardTitle from '@/components/survey/TitleCard'

type Survey = {
  id: string
  _id: string
  status: string
  description: string
  title: string
  createdAt: string
  updatedAt: string
}

export default async function Surveys({ params }: { params: { projectname: string } }) {
  const { projectname } = params

  // API データを取得
  const baseUrl = process.env.SERVER_DOMAIN
  const response = await fetch(`${baseUrl}/api/customsurvey?project_name=${projectname}`, {
    cache: 'no-store',
  })

  const json = await response.json()

  const data: Survey[] = json.success
    ? json.data.map((item: Survey) => ({
        id: item._id,
        status: item.status,
        description: item.description,
        title: item.title,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      }))
    : []

  const ProjectData = json.success ? json.projectdata : []

  return (
    <main className="mt-10 w-full flex-row px-11">
      {/* タイトルカード */}
      <div>{ProjectData && <CardTitle Organzation={ProjectData} />}</div>

      {/* 検索ラッパーコンポーネント */}
      <SurveySearchWrapper data={data} projectName={projectname} />
    </main>
  )
}
