'use client'
import { useState } from 'react'
import { PatientProfileType } from 'types'
import { formatDate } from 'utils'

import { CalendarTodayIcon, GenderMark, IdCard, InsuranceIcon, PencilIcon, PhoneIcon } from '@/components/icons'

const PatientProfile = ({ participant }: { participant: PatientProfileType }) => {
  // 상태로 입력 필드 관리
  const [participantData, setPatientData] = useState({
    name: participant.name,
    date_of_birth: formatDate(new Date(participant.date_of_birth)),
    gender: participant.gender,
    phone_number: participant.phone_number,
    insurance_type: participant.insurance_type,
    participant_code: 'PT-00123', // 임의의 환자 코드
  })

  const [isEditing, setIsEditing] = useState({
    date_of_birth: false,
    gender: false,
    phone_number: false,
    insurance_type: false,
  })

  // 입력 값 변경 핸들러
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setPatientData({
      ...participantData,
      [name]: value,
    })
  }

  // 수정 모드 토글
  const toggleEditMode = (field: keyof typeof isEditing) => {
    setIsEditing((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <section role="list" className="divide-y divide-gray-100 rounded-3xl bg-white p-5">
      <div className="grid grid-cols-1 justify-items-center gap-6 pb-4">
        <h2 className="text-2xl font-medium">Patient Profile</h2>
        <div className="grid w-full grid-cols-6 grid-rows-1 gap-8">
          {/* 아이콘 크기를 맞추기 위한 공통 스타일 */}
          {/* 환자 코드 */}
          <div className="col-span-1 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <IdCard />
          </div>
          <div className="col-span-5">
            <h3 className="font-light">Patient Code</h3>
            <p className="font-semibold">{participantData.participant_code}</p>
          </div>

          {/* 생년월일 수정 가능 */}
          <div className="col-span-1 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <CalendarTodayIcon />
          </div>
          <div className="col-span-4">
            <h3 className="font-light">Date Of Birth</h3>
            {isEditing.date_of_birth ? (
              <input
                type="date"
                name="date_of_birth"
                value={participantData.date_of_birth}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-2"
              />
            ) : (
              <p className="font-semibold">{participantData.date_of_birth}</p>
            )}
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <button onClick={() => toggleEditMode('date_of_birth')}>
              <PencilIcon />
            </button>
          </div>

          {/* 성별 수정 가능 */}
          <div className="col-span-1 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <GenderMark />
          </div>
          <div className="col-span-4">
            <h3 className="font-light">Gender</h3>
            {isEditing.gender ? (
              <select
                name="gender"
                value={participantData.gender}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-2"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            ) : (
              <p className="font-semibold">{participantData.gender}</p>
            )}
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <button onClick={() => toggleEditMode('gender')}>
              <PencilIcon />
            </button>
          </div>

          {/* 연락처 수정 가능 */}
          <div className="col-span-1 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <PhoneIcon />
          </div>
          <div className="col-span-4">
            <h3 className="font-light">Contact Info.</h3>
            {isEditing.phone_number ? (
              <input
                type="text"
                name="phone_number"
                value={participantData.phone_number}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-2"
              />
            ) : (
              <p className="font-semibold">{participantData.phone_number}</p>
            )}
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <button onClick={() => toggleEditMode('phone_number')}>
              <PencilIcon />
            </button>
          </div>

          {/* 보험사 수정 가능 */}
          <div className="col-span-1 flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
            <InsuranceIcon />
          </div>
          <div className="col-span-4">
            <h3 className="font-light">Insurance Provider</h3>
            {isEditing.insurance_type ? (
              <input
                type="text"
                name="insurance_type"
                value={participantData.insurance_type}
                onChange={handleInputChange}
                className="w-full rounded-md border border-gray-300 p-2"
              />
            ) : (
              <p className="font-semibold">{participantData.insurance_type}</p>
            )}
          </div>
          <div className="col-span-1 flex items-center justify-center">
            <button onClick={() => toggleEditMode('insurance_type')}>
              <PencilIcon />
            </button>
          </div>
        </div>
        <button className="mt-8 justify-self-center rounded-full bg-teal-300 px-12 py-4 font-semibold text-black hover:bg-teal-500">
          Show All Information
        </button>
      </div>
    </section>
  )
}

export default PatientProfile
