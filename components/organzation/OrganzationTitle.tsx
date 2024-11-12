import { Card, CardActionArea } from '@mui/material'
import type { Organization } from 'types'

import DefaultImage from '@/utils/defaultImage'

export default async function OrganzationTitle({ Organzation }: { Organzation: Organization }) {
  return (
    <CardActionArea>
      <Card variant="outlined" className="rounded-3xl bg-white duration-300">
        {/* <Card
        variant="outlined"
        className="rounded-3xl bg-white shadow-lg transition-shadow duration-300 hover:shadow-2xl"
      > */}
        <div className="flex flex-col items-center space-y-4 p-6 md:flex-row md:space-x-6 md:space-y-0">
          {/* プロフィール画像 */}
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gray-100 shadow-md md:h-24 md:w-24">
            <DefaultImage width={70} height={70} />
          </div>

          {/* 組織の詳細 */}
          <div className="flex flex-col text-center md:text-left">
            {/* 組織名 */}
            <h2 className="text-xl font-semibold text-gray-800 md:text-2xl">{Organzation.organization_name}</h2>
            {/* 組織説明 */}
            <p className="mt-2 text-sm text-gray-600 md:text-base">{Organzation.organization_description}</p>
          </div>
        </div>
      </Card>
    </CardActionArea>
  )
}
