import { LucideIcon, Plus, Settings, SquarePen } from 'lucide-react'
import { GProject } from 'types'

type Submenu = {
  href: string
  label: string
  active?: boolean
}

type Menu = {
  href: string
  label: string
  active?: boolean
  icon: LucideIcon
  submenus?: Submenu[]
}

type Group = {
  groupLabel: string
  menus: Menu[]
}

interface OrganizationData {
  organization_name: string
  projects: GProject[]
}

export function getMenuList(organizationData: OrganizationData[] = []): Group[] {
  const organizationMenus = organizationData.map((org) => ({
    href: '',
    label: org.organization_name, // Organization name as menu label
    icon: SquarePen,
    submenus: [
      ...org.projects.map((project) => ({
        href: `/participant/${encodeURIComponent(project.project_name)}`, // Dynamic URL for projects
        label: project.project_name, // プロジェクト名を直接ラベルに指定
      })),
      // Add link to create a new project for this organization
      {
        href: `/createproject/${encodeURIComponent(org.organization_name)}/`, // Dynamic URL for creating a new project
        label: 'Create New Project', // Label for the new project creation link
      },
    ],
  }))

  // Add "New Organization" menu item
  organizationMenus.push({
    href: '/auth?type=organization',
    label: 'New Organization',
    icon: Plus,
    submenus: [],
  })

  return [
    {
      groupLabel: 'Organizations',
      menus: organizationMenus,
    },
    {
      groupLabel: 'Settings',
      menus: [
        {
          href: '/account',
          label: 'Account',
          icon: Settings,
        },
      ],
    },
  ]
}
