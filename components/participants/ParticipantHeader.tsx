import { Card, CardActionArea } from '@mui/material'
import { GProject } from 'types'

import { DefaultImage } from '@/utils'

export default async function ProjectHeader({ projectdata }: { projectdata: GProject }) {
  const participantsCount = projectdata.participants?.length || 0
  const analystsCount = projectdata.analysts?.length || 0

  return (
    <CardActionArea>
      <Card variant="outlined" className="rounded-3xl bg-white duration-300">
        <div className="flex flex-col items-center space-y-4 p-6 md:flex-row md:space-x-6 md:space-y-0">
          {/* プロフィール画像 */}
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-100 shadow-md md:h-24 md:w-24">
            <DefaultImage width={70} height={70} />
          </div>

          {/* 組織の詳細 */}
          <div className="flex flex-col text-center md:text-left">
            {/* プロジェクト名 */}
            <h2 className="text-2xl font-bold text-gray-800">{projectdata.project_name}</h2>

            {/* プロジェクトの説明 */}
            <p className="mt-2 text-sm text-gray-600 md:text-base">{projectdata.project_description}</p>

            {/* プロジェクトコード */}
            <p className="mt-1 text-xs text-gray-500 md:text-sm">
              Project Code: <span className="font-medium text-gray-800">{projectdata.project_code}</span>
            </p>

            {/* その他の情報 */}
            <div className="mt-4 flex flex-col space-y-2 md:flex-row md:space-x-6 md:space-y-0">
              <p className="text-sm text-gray-600">
                Participants: <span className="font-bold text-gray-800">{participantsCount}</span>
              </p>
              <p className="text-sm text-gray-600">
                Analysts: <span className="font-bold text-gray-800">{analystsCount}</span>
              </p>
            </div>
          </div>
        </div>
      </Card>
    </CardActionArea>
  )
}
