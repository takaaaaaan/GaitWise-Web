'use client'
import { useState } from 'react'

import { MenuIcon, SearchIcon } from '@/components/icons'
import { Card } from '@mui/material'
import Organization from '@/db/models/organization'
import { useParams } from 'next/navigation'

interface AnalystListProps {
  organization_id: string
  analysts: {
    analyst_id: string
    firstname: string
    lastname: string
    email: string
  }[]
}

const AnalystList = ({ analysts, organization_id }: AnalystListProps) => {
  const [analystList, setAnalystList] = useState(analysts || [])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [newAnalystEmail, setNewAnalystEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  console.log('organization_id:', organization_id)

  const handleAddAnalystClick = () => {
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setNewAnalystEmail('')
    setError(null)
    setSuccess(null)
  }

  const handleAddAnalyst = async () => {
    if (!newAnalystEmail.trim()) {
      setError('Email cannot be empty')
      return
    }

    // Eメール形式の確認
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/ // シンプルなEメール形式の正規表現
    if (!emailRegex.test(newAnalystEmail.trim())) {
      setError('Invalid email format')
      return
    }

    try {
      const response = await fetch('/api/analyst/invite-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: newAnalystEmail, _id: organization_id }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        setError(errorData.message || 'Failed to send invite')
        return
      }

      const responseData = await response.json()
      setSuccess('Invitation sent successfully')
      setNewAnalystEmail('')
      console.log('Response:', responseData)
    } catch (err) {
      console.error('Error inviting analyst:', err)
      setError('An unexpected error occurred')
    }
  }

  return (
    <Card variant="outlined">
      <ul role="list" className="divide-y divide-gray-100 rounded-3xl bg-white">
        <li className="flex items-center justify-between gap-x-6 p-5">
          <h2 className="text-2xl font-medium">Analysts</h2>
          <SearchIcon />
        </li>
        {(analystList || []).map((analyst, index) => (
          <li key={index} className="flex items-center justify-between gap-x-6 p-5">
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {analyst.firstname} {analyst.lastname}
                </p>
                <p className="mt-1 truncate text-xs leading-5 text-gray-500">Email: {analyst.email}</p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-center">
              <MenuIcon />
            </div>
          </li>
        ))}

        {/* Add Analyst Button */}
        <li className="flex items-center justify-center p-5">
          <button
            onClick={handleAddAnalystClick}
            className="rounded-full bg-teal-500 px-4 py-2 font-bold text-white hover:bg-teal-600"
          >
            + Add Analyst
          </button>
        </li>
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="w-1/4 rounded-lg bg-white p-6">
            <h3 className="mb-4 text-xl font-bold">Invite new Analyst</h3>
            <input
              type="text"
              placeholder="Enter Analyst Email"
              value={newAnalystEmail}
              onChange={(e) => setNewAnalystEmail(e.target.value)}
              className="mb-4 w-full rounded border border-gray-300 p-2"
            />
            {error && <p className="text-sm text-red-500">{error}</p>}
            {success && <p className="text-sm text-green-500">{success}</p>}
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="mr-2 rounded bg-gray-300 px-4 py-2 font-bold text-black hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAnalyst}
                className="rounded bg-teal-500 px-4 py-2 font-bold text-white hover:bg-teal-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

export default AnalystList
