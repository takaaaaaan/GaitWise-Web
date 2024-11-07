// ====== Organization Type ======

export type Organization = {
  _id: string
  organization_name: string
  organization_description: string
  creator: string
  projects: string[]
  analysts: string[]
  organization_profile_image: string
  createdAt: Date
  updatedAt: Date
}
