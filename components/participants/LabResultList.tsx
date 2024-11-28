'use client'

import React from 'react'

import { DownloadIcon } from '@/components/icons'

interface LabResultsListProps {
  labResults: Array<string>
  walkingData: any
}

const LabResultsList: React.FC<LabResultsListProps> = ({ labResults, walkingData }) => {
  const downloadCSV = (data: any, filename = 'walking_data.csv') => {
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
      const rows = data.event_time.map((time: string, index: number) => {
        return [
          index + 1, // Add index (1-based)
          time,
          data.acc.accX[index],
          data.acc.accY[index],
          data.acc.accZ[index],
          data.gyro.gyroX[index],
          data.gyro.gyroY[index],
          data.gyro.gyroZ[index],
          data.rot.rotX[index],
          data.rot.rotY[index],
          data.rot.rotZ[index],
        ].join(',')
      })

      const csvContent = [headers, ...rows].join('\n')
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = filename
      link.click()
    } catch (error) {
      console.error('Error generating CSV:', error)
    }
  }

  const handleDownloadCSV = () => {
    if (walkingData) {
      downloadCSV(walkingData)
    } else {
      console.error('No walking data available to download.')
    }
  }

  const results = labResults.map((result, index) => {
    return { result, isActive: index === 1 ? true : false }
  })

  return (
    <ul role="list" className="w-full divide-y divide-gray-100 rounded-3xl bg-white px-5 pb-4">
      {results.map((result, index) => {
        return (
          <li
            key={index}
            className={
              result.isActive
                ? 'flex items-center justify-between gap-x-6 bg-gray-200 p-5'
                : 'flex items-center justify-between gap-x-6 p-5'
            }
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="font=light text-sm leading-6 text-gray-900">{result.result}</p>
              </div>
            </div>
            <div className="shrink-0 sm:flex sm:flex-col sm:items-center">
              <button onClick={handleDownloadCSV} className="rounded p-2 hover:bg-gray-300">
                <DownloadIcon />
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}

export default LabResultsList
