'use client'
import { Card } from '@mui/material'
import { AnalystList, OrganzationTitle, ProjectCard } from 'components'
import { FolderPlusIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect } from 'react'

import useAuth from '@/hooks/useAuth'
import useFetchOrganizationDetails from '@/hooks/useOrganizationDetails'

const OrganizationPage = () => {
  const params = useParams()
  const { organizationName } = params || {}
  const validOrganizationName = Array.isArray(organizationName) ? organizationName[0] : organizationName || ''
  const { data, loading, error } = useFetchOrganizationDetails(validOrganizationName)
  const loginUser = useAuth()

  // ==== Dev logs ====
  useEffect(() => {
    console.log('loginUser', loginUser)
    console.log('organizationName', organizationName)
    console.log('data', data)
    console.log('data.a', data?.analysts)
    console.log('data.projects', data?.projects)
  }, [loginUser, organizationName, data])

  return (
    <div>
      <div className="mx-4 mb-8 flex min-h-screen flex-wrap justify-center lg:grid lg:grid-flow-col lg:grid-cols-5 lg:grid-rows-1 lg:gap-x-8">
        <section className="mb-8 lg:mb-0">{/* FIXME : <ProjectList />を Header に移動 */}</section>
        <section className="col-start-2 col-end-5 mb-8 flex-col lg:mb-0">
          {loading && <p>Loading...</p>}
          {error && <p style={{ color: 'red' }}>Error: {error.message || 'Failed to fetch data.'}</p>}
          {data && <OrganzationTitle Organzation={data} />}
          <div className="flex-col items-center">
            <div className="mb-6 mt-8">
              <h2 className="text-2xl font-medium">Projects</h2>
            </div>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {(data?.projects?.length ?? 0 > 0) ? (
                data?.projects.map((project) => <ProjectCard key={project._id} project={project} />)
              ) : (
                <Card variant="outlined" className="flex flex-col items-center rounded-3xl bg-white p-3 duration-300">
                  <p>No projects available. Please create one.</p>
                  <Link
                    href={`/createproject/${organizationName}/`}
                    className="mt-4 flex items-center justify-center gap-3 rounded bg-teal-500 px-4 py-3 font-bold text-white hover:bg-teal-600"
                  >
                    <FolderPlusIcon />
                    Create Project
                  </Link>
                </Card>
              )}
            </div>
          </div>
        </section>
        <section className="mb-8 grid grid-cols-1 gap-8 lg:mb-0">
          {data?.analysts && <AnalystList organization_id={data._id} analysts={data?.analysts} />}
        </section>
      </div>
    </div>
  )
}

export default OrganizationPage
