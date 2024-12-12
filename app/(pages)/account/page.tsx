'use client'
import Cookies from 'js-cookie'
import { ObjectId } from 'mongodb'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { GProject, Organization } from 'types'

import { ContentLayout } from '@/components/admin-panel/content-layout'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useSidebar } from '@/hooks/use-sidebar'
import { useStore } from '@/hooks/use-store'

// 型定義
export type Analyst = {
  _id: ObjectId
  firstname: string
  lastname: string
  email: string
  projects: GProject[]
  organizations: Organization[]
  createdAt: string // Date型でもよいが、文字列として受け取る場合も考慮
  updatedAt: string
}

export default function AccountPage() {
  const [analystData, setAnalystData] = useState<Analyst | null>(null)
  const [error, setError] = useState<string | null>(null)
  const sidebar = useStore(useSidebar, (x) => x)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  // APIデータの取得
  useEffect(() => {
    const fetchAnalystData = async () => {
      try {
        const token = Cookies.get('token')
        const response = await fetch('/api/analyst/profile', {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`, // 必要に応じて認証トークンを設定
          },
        })

        if (!response.ok) {
          throw new Error('Failed to fetch analyst data')
        }

        const data: { Analystdata: Analyst } = await response.json() // 型指定
        setAnalystData(data.Analystdata)
      } catch (err) {
        setError((err as Error).message)
      }
    }

    fetchAnalystData()
  }, [])
  const handleSave = async () => {}
  if (!sidebar) return null
  const { settings, setSettings } = sidebar

  console.log('data:', analystData)

  return (
    <ContentLayout title="Account">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link href="#">Home</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Account</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex gap-6">
        {/* <div className="mt-6">
          <h2 className="text-xl font-bold">Edit Profile</h2>
          {error && <p className="text-red-500">{error}</p>}
          {analystData && (
            <div className="mt-3">
              <div>
                <Label htmlFor="firstname">First Name</Label>
                <input
                  id="firstname"
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-full rounded border p-2"
                />
              </div>
              <div>
                <Label htmlFor="lastname">Last Name</Label>
                <input
                  id="lastname"
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full rounded border p-2"
                />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded border p-2"
                />
              </div>
              <button onClick={handleSave} className="mt-3 rounded bg-blue-500 px-4 py-2 text-white">
                Save Changes
              </button>
            </div>
          )}
        </div> */}
        <div className="mt-6">
          <h2 className="text-xl font-bold">Analyst Profile</h2>
          {error ? (
            <p className="text-red-500">{error}</p>
          ) : analystData ? (
            <div className="mt-3">
              <p>
                <strong>First Name:</strong> {analystData.firstname}
              </p>
              <p>
                <strong>Last Name:</strong> {analystData.lastname}
              </p>
              <p>
                <strong>Email:</strong> {analystData.email}
              </p>
              {/* <div>
                <strong>Projects:</strong>
                <ul>
                  {analystData.projects.map((project) => (
                    <li key={project._id.toString()}>{project.project_name}</li>
                  ))}
                </ul>
              </div> */}
              {/* <div>
                <strong>Organizations:</strong>
                <ul>
                  {analystData.organizations.map((organization) => (
                    <li key={organization._id.toString()}>{organization.organization_name}</li>
                  ))}
                </ul>
              </div> */}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div>
          <div className="mt-6 flex gap-6">
            <h2 className="text-xl font-bold">Sidebar Setting</h2>
          </div>
          <TooltipProvider>
            <div className="mt-3 flex gap-6">
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="is-hover-open"
                      onCheckedChange={(x) => setSettings({ isHoverOpen: x })}
                      checked={settings.isHoverOpen}
                    />
                    <Label htmlFor="is-hover-open">Hover Open</Label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>When hovering on the sidebar in mini state, it will open</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="disable-sidebar"
                      onCheckedChange={(x) => setSettings({ disabled: x })}
                      checked={settings.disabled}
                    />
                    <Label htmlFor="disable-sidebar">Disable Sidebar</Label>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Hide sidebar</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </TooltipProvider>
        </div>
      </div>
    </ContentLayout>
  )
}
