'use client'

import axios from 'axios'
import React, { useState } from 'react'

import { DownloadIcon } from '@/components/icons'

// API 호출 함수
const fetchWalkingDataForDownload = async (walkingId: string) => {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
    const response = await axios.post(
      `${baseUrl}/api/project/walking`,
      { walkingId },
      { headers: { 'Content-Type': 'application/json' } }
    )
    if (response.status !== 200) throw new Error(`Failed to fetch walking data for ID: ${walkingId}`)
    return response.data.data
  } catch (error) {
    console.error('Error fetching walking data:', error)
    return null
  }
}

// CSV 다운로드 함수
const downloadCSV = (data: any, index: number) => {
  if (!data || !data.event_time || !data.acc || !data.gyro || !data.rot) {
    console.error('Invalid walking data structure. Ensure all required fields are present.')
    return
  }

  const headers = [
    'index',
    'event_time',
    'accX',
    'accY',
    'accZ',
    'gyroX',
    'gyroY',
    'gyroZ',
    'rotX',
    'rotY',
    'rotZ',
  ].join(',')

  try {
    const rows = data.event_time.map((time: string, i: number) => {
      return [
        i + 1,
        time,
        data.acc.accX[i],
        data.acc.accY[i],
        data.acc.accZ[i],
        data.gyro.gyroX[i],
        data.gyro.gyroY[i],
        data.gyro.gyroZ[i],
        data.rot.rotX[i],
        data.rot.rotY[i],
        data.rot.rotZ[i],
      ].join(',')
    })

    const csvContent = [headers, ...rows].join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    link.href = URL.createObjectURL(blob)
    link.download = `walking_data_${index}.csv`
    link.click()
  } catch (error) {
    console.error('Error generating CSV:', error)
  }
}

// WalkingHistoryList 컴포넌트
const WalkingHistoryList = ({ participant }: { participant: { _id: string; walkingHistory: any[] } }) => {
  const [isDownloading, setIsDownloading] = useState<string | null>(null)
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

  // 날짜 필터링 함수
  const filterByDate = (history) => {
    if (!startDate || !endDate) return true
    const historyDate = new Date(history.createdAt)
    const start = new Date(startDate)
    const end = new Date(endDate)
    if (isNaN(start.getTime()) || isNaN(end.getTime())) return false
    return historyDate >= start && historyDate <= end
  }

  const handleDownload = async (walkingId: string, index: number) => {
    setIsDownloading(walkingId)
    try {
      const walkingData = await fetchWalkingDataForDownload(walkingId)
      if (walkingData) {
        downloadCSV(walkingData, index + 1)
      } else {
        console.error('No data to download.')
      }
    } catch (error) {
      console.error('Error during download:', error)
    } finally {
      setIsDownloading(null)
    }
  }

  const filteredHistory = participant.walkingHistory.filter(filterByDate)

  return (
    <div>
      {/* 날짜 선택 필터 */}
      <div className="mb-6 flex space-x-4">
        <div>
          <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            type="date"
            id="start-date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">
            End Date
          </label>
          <input
            type="date"
            id="end-date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          />
        </div>
      </div>

      {filteredHistory.length === 0 ? (
        <p className="text-center text-gray-500">No walking history found for the selected dates.</p>
      ) : (
        <ul role="list" className="w-full divide-y divide-gray-200 rounded-lg bg-gray-50 shadow-md">
          {filteredHistory.map((history, index) => (
            <li
              key={history._id}
              className="flex items-center justify-between px-6 py-4 transition duration-200 ease-in-out hover:bg-gray-100"
            >
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium text-gray-800">
                  <strong>Created At:</strong> {`${new Date(history.createdAt).getFullYear().toString().slice(-2)}.`}
                  {new Date(history.createdAt).toLocaleString('ko-KR', {
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit',
                    hour12: false,
                  })}
                </p>
                <p className="text-sm text-gray-600">
                  <strong>Walking Time:</strong> {history.walking_time || 'N/A'}
                </p>
              </div>

              <div className="shrink-0">
                <button
                  onClick={() => handleDownload(history._id, index)}
                  disabled={isDownloading === history._id}
                  className={`inline-flex h-10 w-10 items-center justify-center rounded-full bg-blue-500 text-white transition duration-200 ease-in-out hover:bg-blue-600 focus:ring-2 focus:ring-blue-300 ${
                    isDownloading === history._id ? 'cursor-not-allowed opacity-50' : ''
                  }`}
                >
                  {isDownloading === history._id ? '...' : <DownloadIcon />}
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default WalkingHistoryList
