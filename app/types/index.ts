import { ObjectId } from 'mongoose'

import { Acc, Gyro, ResponseData, Rot } from './AccGyroRot'
import { Analyst } from './Analyst'
import { CustomSurvey2 } from './CustomSurvey'
import { Organization } from './Organization'
import { Post } from './Post'
import { CustomSurvey, GProject, Selection, TextResponse } from './Project'
import { EssentialSurvey, Survey } from './Survey'
import { User } from './User'
import { VerificationCode } from './VerificationCode'
import { Walking } from './Walking'
import { Weight } from './Weight'

export type {
  Acc,
  Analyst,
  CustomSurvey,
  CustomSurvey2,
  EssentialSurvey,
  GProject,
  Gyro,
  Organization,
  Post,
  ResponseData,
  Rot,
  Selection,
  Survey,
  TextResponse,
  User,
  VerificationCode,
  Walking,
  Weight,
}

// ====== analyst PARAMS
export type CreateAnalystParams = {
  firstName: string
  lastName: string
  email: string
  analyst_report: Array<ObjectId>
}

export type UpdateAnalystParams = {
  firstName: string
  lastName: string
  email: string
  analyst_report: Array<ObjectId>
}

// ====== URL QUERY PARAMS
export type UrlQueryParams = {
  params: string
  key: string
  value: string | null
}

export type RemoveUrlQueryParams = {
  params: string
  keysToRemove: string[]
}

export type SearchParamProps = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export type Question = {
  id: number
  type: 'multiple' | 'text'
  question: string
  options: string[]
  max?: number
  min?: number
}

export type DragItem = {
  index: number
  id: number
  type: string
}

// ====== BaseCard
export type BaseCard = {
  src: string
  width: number
  height: number
  alt: string
  title: string
  value: number | undefined
  levels: string | undefined
}

export type Patient = {
  name: string
  gender: string
  age: number
  profile_picture: string
  date_of_birth: string
  phone_number: string
  emergency_contact: string
  insurance_type: string
  diagnosis_history?: DiagnosisRecord[]
  diagnostic_list?: Diagnostic[]
  lab_results?: string[]
}

export type PatientProfileType = Pick<
  Patient,
  | 'name'
  | 'gender'
  | 'age'
  | 'profile_picture'
  | 'date_of_birth'
  | 'phone_number'
  | 'emergency_contact'
  | 'insurance_type'
>

export type DiagnosisRecord = {
  month: string
  year: number
  blood_pressure: BloodPressure
  heart_rate: HealthMetric
  respiratory_rate: HealthMetric
  temperature: HealthMetric
}

export type BloodPressure = {
  systolic: HealthMetric
  diastolic: HealthMetric
}

export type HealthMetric = {
  value: number
  levels: string
}

export type Diagnostic = {
  name: string
  description: string
  status: string
}
