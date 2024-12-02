'use client'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Walking } from 'types'

import WalkingDataChart from './WalkingDataChart'
import { WalkingListSelecter } from './WalkingListSelecter'
import { WidgetsMenu } from './WidgetsMenu'

type WidgetsWapperProps = {
  userid: string
  walkingHistory: Walking[]
}

export default function WidgetsWapper({ userid, walkingHistory }: WidgetsWapperProps) {
  const [walkingData, setWalkingData] = useState<any>(null)
  const [selectedWalkingId, setSelectedWalkingId] = useState<string | null>(
    walkingHistory.length > 0 ? walkingHistory[0]._id : null // 初期選択を最初の項目に設定
  )

  // API からデータを取得
  const fetchWalkingData = async (walkingId: string) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
      const response = await axios.post(`${baseUrl}/api/project/graph`, { walkingId })
      if (response.status !== 200) throw new Error(`Failed to fetch walking data for ID: ${walkingId}`)
      setWalkingData(response.data.data)
    } catch (error) {
      console.error('Error fetching walking data:', (error as Error).message)
      setWalkingData(null)
    }
  }

  // 初期値のデータを取得
  useEffect(() => {
    if (selectedWalkingId) {
      fetchWalkingData(selectedWalkingId)
    }
  }, [selectedWalkingId])

  // 初期選択を設定
  useEffect(() => {
    if (walkingHistory.length > 0 && !selectedWalkingId) {
      setSelectedWalkingId(walkingHistory[0]._id)
    }
  }, [walkingHistory, selectedWalkingId])

  return (
    <div>
      {walkingHistory && walkingHistory.length > 0 ? (
        <>
          <div className="flex h-10 gap-x-2">
            <WalkingListSelecter
              walkingHistory={walkingHistory}
              selectedId={selectedWalkingId}
              onSelect={(walkingId) => setSelectedWalkingId(walkingId)}
            />
            <WidgetsMenu />
          </div>
          {walkingData ? (
            <section className="col-span-4">
              <h2 className="text-center text-lg font-bold">Walking Data Visualization</h2>
              <WalkingDataChart
                eventTime={walkingData.event_time}
                acc={walkingData.acc}
                gyro={walkingData.gyro}
                rot={walkingData.rot}
              />
            </section>
          ) : (
            <p>Loading Walking Data...</p>
          )}
        </>
      ) : (
        <div className="text-center">
          <p className="text-lg font-bold">No walking history available</p>
          <p>Please start recording your walks to see data here.</p>
        </div>
      )}
    </div>
  )
}
