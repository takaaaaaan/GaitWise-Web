import Link from 'next/link'

import { Navbar } from '@/components/admin-panel/navbar'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'

interface ContentLayoutProps {
  children: React.ReactNode
  params: {
    project_name?: string
    organization_name?: string
    userid?: string
    surveyid?: string
  }
}

export function HContentLayout({ children, params }: ContentLayoutProps) {
  const { project_name: projectName, organization_name: organizationName, userid } = params

  console.log('HContentLayout params:', params)

  return (
    <>
      {/* Navbarのタイトル */}
      <Navbar title={projectName ? projectName : organizationName} />

      <div className="container px-4 py-3 sm:px-8">
        <Breadcrumb>
          <BreadcrumbList>
            {/* Homeへのリンク */}
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/">Home</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>

            {/* organizationName のみ存在する場合 */}
            {!projectName && organizationName && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Org: {organizationName}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}

            {/* organizationName と projectName が両方存在する場合 */}
            {!userid && organizationName && projectName && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/organization/${organizationName}`}>Org: {organizationName}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Project: {projectName}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}

            {/* userid のみ存在する場合 */}
            {organizationName && projectName && userid && (
              <>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/organization/${organizationName}`}>Org: {organizationName}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link href={`/participant/${projectName}`}>Project: {projectName}</Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>User ID: {userid}</BreadcrumbPage>
                </BreadcrumbItem>
              </>
            )}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      {children}
    </>
  )
}
