import { Divider } from 'components'
import type { Organization } from 'types'

import DefaultImage from '@/utils/defaultImage'

export default async function OrganzationTitle({ Organzation }: { Organzation: Organization }) {
  return (
    <section role="list" className="divide-y divide-gray-100 rounded-3xl bg-white p-5">
      <div className="flex items-center pb-3">
        {/* 프로필 이미지 */}
        <div className="mr-4 h-16 w-16">
          <DefaultImage />
        </div>
        {/* 조직 이름 */}
        <h2 className="text-2xl font-medium">{Organzation.organization_name}</h2>
      </div>
      <Divider thickness={0.1} marginX={0} />
      {/* 조직 설명 */}
      <div className="flex items-center pt-3">
        <p className="ml-1 font-extralight">{Organzation.organization_description}</p>
      </div>
    </section>
  )
}
