import { NextRequest, NextResponse } from 'next/server'

import dbConnect from '@/db/dbConnect'
import Analyst from '@/db/models/analyst'
import Organization from '@/db/models/organization'
import Project from '@/db/models/project'

/**
 * @description 조직 이름으로 조직 세부 정보를 가져옵니다.
 * @searchParams organizationName
 */
export async function GET(req: NextRequest) {
  try {
    // 데이터베이스 연결
    await dbConnect()

    // 쿼리 매개변수에서 organizationName 가져오기
    const organizationName = req.nextUrl.searchParams.get('organizationName')

    if (!organizationName) {
      return NextResponse.json({ error: 'organizationName은 필수입니다.' }, { status: 400 })
    }

    // 데이터베이스에서 조직 검색
    const organization = await Organization.findOne({
      organization_name: organizationName,
    })

    if (!organization) {
      return NextResponse.json({ error: '제공된 이름으로 조직을 찾을 수 없습니다.' }, { status: 404 })
    }

    // 프로젝트 및 분석가 정보 로드
    const projectdetaildatas = await Project.find({ _id: { $in: organization.projects } }).exec()
    const analystdetaildatas = await Analyst.find({ _id: { $in: organization.analysts } }).exec()

    // 필요한 데이터만 필터링
    const filteredData = {
      _id: organization._id,
      organization_name: organization.organization_name,
      organization_description: organization.organization_description,
      organization_profile_image: organization.organization_profile_image,
      projects: projectdetaildatas.map((project) => ({
        project_id: project._id,
        project_name: project.project_name,
        project_description: project.project_description,
        project_code: project.project_code,
        analysts: project.analysts,
        participants: project.participants,
        // custom_survey: project.custom_survey
        //   ? {
        //       title: project.custom_survey.title,
        //       description: project.custom_survey.description,
        //       status: project.custom_survey.status,
        //       selection: project.custom_survey.selection.map((sel) => ({
        //         content: sel.content,
        //         options: sel.options,
        //         type: sel.type,
        //       })),
        //       text_response: project.custom_survey.text_response.map((text) => ({
        //         content: text.content,
        //       })),
        //     }
        //   : null,
      })),
      analysts: analystdetaildatas.map((analyst) => ({
        analyst_id: analyst._id,
        firstname: analyst.firstname,
        lastname: analyst.lastname,
        email: analyst.email,
      })),
    }

    // 필터링된 데이터 반환
    return NextResponse.json(filteredData, { status: 200 })
  } catch (error) {
    console.error('조직 정보를 가져오는 중 오류 발생:', error)

    return NextResponse.json({ error: '예기치 않은 오류가 발생했습니다. 나중에 다시 시도해주세요.' }, { status: 500 })
  }
}

// ========One Organization Data========
// {
//   "_id": "6731c4625fd12994094ec99a",
//   "organization_name": "Gaitwase",
//   "organization_description": "A group focused on cutting-edge technology solutions.",
//   "creator": "672972444367a5235d2e9c92",
//   "projects": [
//       "6731d1b25fd12994094ec9ad",
//       "6731d1b25fd12994094ec9ae"
//   ],
//   "analysts": [
//       "6731dbbb5fd12994094ec9cf",
//       "67164075aedc1d7b1118ec65"
//   ],
//   "organization_profile_image": "https://example.com/default1.jpg",
//   "createdAt": "2024-11-01T12:00:00.000Z",
//   "updatedAt": "2024-11-01T12:00:00.000Z"
// }

// ========One Project Data========

// ========One Analyst Data========

// ========result Data========
// {
//   "_id": "6731c4625fd12994094ec99a",
//   "organization_name": "Gaitwase",
//   "organization_description": "A group focused on cutting-edge technology solutions.",
//   "creator": "672972444367a5235d2e9c92",
//   "projects": [
//       {
//           "_id": "6731d1b25fd12994094ec9ad",
//           "participants": [
//               "6731d9765fd12994094ec9bb",
//               "6731d9765fd12994094ec9bc"
//           ],
//           "surveys": [
//               "6731d46b5fd12994094ec9b2"
//           ],
//           "analysts": [
//               "672972444367a5235d2e9c92"
//           ],
//           "project_name": "환경 연구 이니셔티브",
//           "project_description": "지속 가능한 관행을 촉진하기 위해 환경 데이터를 분석하는 데 중점을 둔 프로젝트입니다.",
//           "custom_survey": {
//               "selection": [
//                   {
//                       "min": null,
//                       "max": null,
//                       "_id": "6732d98b432f73f9fd56b63c",
//                       "content": "What is your primary concern about the environment?",
//                       "options": [
//                           "Air Pollution",
//                           "Deforestation",
//                           "Climate Change"
//                       ],
//                       "type": "single-choice"
//                   }
//               ],
//               "text_response": [
//                   {
//                       "_id": "6732d98b432f73f9fd56b63d",
//                       "content": "Describe a sustainable practice you follow in daily life."
//                   }
//               ],
//               "title": "Environmental Survey",
//               "description": "Understanding public opinion on environmental issues.",
//               "status": "active",
//               "_id": "6732d98b432f73f9fd56b63e"
//           },
//           "project_code": "ENV2024",
//           "creator": "64f6f7108d1c2e1d9e97bc95",
//           "createAt": "2024-11-01T08:00:00.000Z",
//           "updateAt": "2024-11-01T08:00:00.000Z",
//           "organization": "6731c4625fd12994094ec99a"
//       },
//       {
//           "_id": "6731d1b25fd12994094ec9ae",
//           "participants": [
//               "6731d9765fd12994094ec9bc"
//           ],
//           "surveys": [
//               "6731d46b5fd12994094ec9b2"
//           ],
//           "analysts": [
//               "672972444367a5235d2e9c92"
//           ],
//           "project_name": "기술 발전 연구",
//           "project_description": "기술이 현대 업무 환경에 미치는 영향을 연구합니다.",
//           "custom_survey": {
//               "selection": [
//                   {
//                       "min": null,
//                       "max": null,
//                       "_id": "6732d98b432f73f9fd56b63f",
//                       "content": "What technology do you use most in your work?",
//                       "options": [
//                           "Computers",
//                           "Smartphones",
//                           "Specialized Software"
//                       ],
//                       "type": "single-choice"
//                   }
//               ],
//               "text_response": [
//                   {
//                       "_id": "6732d98b432f73f9fd56b640",
//                       "content": "What improvements would you like to see in workplace technology?"
//                   }
//               ],
//               "title": "Technology Survey",
//               "description": "Surveying workplace technology trends.",
//               "status": "active",
//               "_id": "6732d98b432f73f9fd56b641"
//           },
//           "project_code": "TECH2024",
//           "creator": "64f6f7108d1c2e1d9e97bc9a",
//           "createAt": "2024-11-02T09:00:00.000Z",
//           "updateAt": "2024-11-02T09:00:00.000Z",
//           "organization": "6731c4625fd12994094ec99a"
//       }
//   ],
//   "analysts": [
//       {
//           "projects": [],
//           "organizations": [],
//           "_id": "67164075aedc1d7b1118ec65",
//           "firstname": "d",
//           "lastname": "d",
//           "email": "d",
//           "password": "$2a$10$LhHWMOmtzeoFP836ptku4esSDHT23zifbf4INB2aAdfQGCASvDr4S",
//           "analyst_report": [],
//           "createdAt": "2024-10-21T11:52:21.931Z",
//           "updatedAt": "2024-10-21T11:52:21.931Z"
//       }
//   ],
//   "organization_profile_image": "https://example.com/default1.jpg",
//   "createdAt": "2024-11-01T12:00:00.000Z",
//   "updatedAt": "2024-11-01T12:00:00.000Z"
// }
