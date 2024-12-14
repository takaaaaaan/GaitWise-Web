'use client'
import { AnalystList, OrganizationTitle, ProjectCard } from 'components'
import { FolderPlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'
import { Organization } from 'types'

import { HContentLayout } from '@/components/admin-panel/h-content-layout'
import useFetchOrganizationDetails from '@/hooks/useOrganizationDetails'

const OrganizationPage = () => {
  const params = useParams()
  const { organizationName } = params || {}
  const validOrganizationName = Array.isArray(organizationName) ? organizationName[0] : organizationName || ''
  const { data, loading, error } = useFetchOrganizationDetails(validOrganizationName) as {
    data: Organization | null
    loading: boolean
    error: string | { message: string } | null
  }

  // ==== Dev logs ====
  useEffect(() => {
    console.log('params', params)
    console.log('organizationName', organizationName)
    console.log('data', data)
    console.log('data.a', data?.analysts)
    console.log('data.projects', data?.projects)
  }, [organizationName, data, params])

  // HContentLayoutに渡すデータを生成
  const hContentLayoutParams = {
    organization_name: data?.organization_name || validOrganizationName,
  }

  return (
    <HContentLayout params={hContentLayoutParams}>
      <div className="mb-8 flex min-h-screen w-full flex-wrap justify-center px-7 lg:grid lg:grid-flow-col lg:grid-cols-5 lg:grid-rows-1 lg:gap-x-8">
        <section className="col-start-1 col-end-5 mb-8 flex-col lg:mb-0">
          {loading && <p>Loading...</p>}
          {error && (
            <p style={{ color: 'red' }}>
              Error: {typeof error === 'string' ? error : error.message || 'Failed to fetch data.'}
            </p>
          )}
          {data && <OrganizationTitle Organzation={data} />}
          <div className="flex-col items-center">
            <div className="mb-6 mt-8">
              <h2 className="text-2xl font-medium">Projects</h2>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {Array.isArray(data?.projects) &&
                data.projects.length > 0 &&
                data.projects.map((project: string) => <ProjectCard key={project._id} project={project} />)}
            </div>
            <div className="flex flex-col items-center rounded-full bg-white p-3 duration-300">
              {!(Array.isArray(data?.projects) && data.projects.length > 0) && (
                <p>No projects available. Please create one.</p>
              )}
              <Link
                href={`/createproject/${organizationName}/`}
                className="mt-3 flex items-center justify-center gap-3 rounded bg-teal-500 px-4 py-3 font-bold text-white hover:bg-teal-600"
              >
                <FolderPlusIcon />
                Create Project
              </Link>
            </div>
          </div>
        </section>
        <section className="mb-8 grid h-full grid-cols-1 gap-8 lg:mb-0">
          {data?.analysts && <AnalystList organization_id={data._id} analysts={data?.analysts} />}
        </section>
      </div>
    </HContentLayout>
  )
}

export default OrganizationPage
