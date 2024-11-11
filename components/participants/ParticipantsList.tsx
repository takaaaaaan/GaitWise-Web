'use client'
import { useState } from 'react'

import { MenuIcon, SearchIcon } from '@/components/icons'
import { participants as initialPatients } from '@/utils/participantsMockData'

const PatientList = () => {
  const [participants, setPatients] = useState(initialPatients)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newPatientId, setNewPatientId] = useState('')

  const handleAddPatientClick = () => {
    setIsModalOpen(true) // 모달을 열기
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setNewPatientId('')
  }

  const handleAddPatient = () => {
    if (newPatientId.trim()) {
      const newPatient = {
        id: newPatientId,
        name: 'New Patient', // 기본 이름
        gender: 'Unknown', // 기본 성별
        age: 'Unknown', // 기본 나이
        isActive: false,
      }
      //setPatients([...participants, newPatient]); // 새로운 환자 추가
      handleCloseModal() // 모달 닫기
    }
  }

  return (
    <div>
      <ul role="list" className="divide-y divide-gray-100 rounded-3xl bg-white">
        <li className="flex items-center justify-between gap-x-6 p-5">
          <h2 className="text-2xl font-medium">Patients</h2>
          <SearchIcon />
        </li>
        {participants.map((participant, index) => (
          <li
            key={index}
            className={
              participant.isActive
                ? 'flex items-center justify-between gap-x-6 bg-gray-200 p-5'
                : 'flex items-center justify-between gap-x-6 p-5'
            }
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">participant ID</p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {participant.name}, {participant.gender}, {participant.age}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-center">
              <MenuIcon />
            </div>
          </li>
        ))}

        {/* Add Patient Button */}
        <li className="flex items-center justify-center p-5">
          <button
            onClick={handleAddPatientClick}
            className="rounded-full bg-teal-500 px-4 py-2 font-bold text-white hover:bg-teal-600"
          >
            + Add Patient
          </button>
        </li>
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="w-1/3 rounded-lg bg-white p-6">
            <h3 className="mb-4 text-xl font-bold">Add New Patient</h3>
            <input
              type="text"
              placeholder="Enter Patient ID"
              value={newPatientId}
              onChange={(e) => setNewPatientId(e.target.value)}
              className="mb-4 w-full rounded border border-gray-300 p-2"
            />
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="mr-2 rounded bg-gray-300 px-4 py-2 font-bold text-black hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPatient}
                className="rounded bg-teal-500 px-4 py-2 font-bold text-white hover:bg-teal-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default PatientList
