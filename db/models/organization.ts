// db\models\organization.ts
import mongoose from 'mongoose'

import { getRandomDefaultImage } from '@/utils/RandomImage'

const OrganizationSchema = new mongoose.Schema(
  {
    organization_name: { type: String, required: true, unique: true },
    organization_description: { type: String, default: '' },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: '' },
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Project', default: [] }],
    analysts: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Analyst', default: [] }],
    organization_profile_image: { type: String, default: getRandomDefaultImage }, //무작위 이미지 링크
  },
  {
    timestamps: true,
    collection: 'organization',
    versionKey: false,
  }
)

const Organization = mongoose.models.Organization || mongoose.model('Organization', OrganizationSchema)

export default Organization
