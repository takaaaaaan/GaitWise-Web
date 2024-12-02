'use client'
import axios from 'axios'
import { Eye } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Walking } from 'types'

import { Button } from '@/components/ui'

import WalkingDataChart from './WalkingDataChart'
import { WalkingListSelecter } from './WalkingListSelecter'

type WidgetsWapperProps = {
  userid: string
  walkingHistory: Walking[]
}

export default function WidgetsWapper({ userid, walkingHistory }: WidgetsWapperProps) {
  const [walkingData, setWalkingData] = useState<any>(null)
  const [selectedWalkingId, setSelectedWalkingId] = useState<string | null>(null)

  // API からデータを取得
  const fetchWalkingData = async (walkingId: string) => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_DOMAIN
      const response = await axios.post(
        `${baseUrl}/api/project/graph`,
        { walkingId }
        // { headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-cache' } }
      )
      if (response.status !== 200) throw new Error(`Failed to fetch walking data for ID: ${walkingId}`)
      setWalkingData(response.data.data)
    } catch (error) {
      console.error('Error fetching walking data:', (error as Error).message)
      setWalkingData(null)
    }
  }

  // 選択された ID に応じてデータを取得
  useEffect(() => {
    if (selectedWalkingId) {
      fetchWalkingData(selectedWalkingId)
    }
  }, [selectedWalkingId])

  return (
    <div>
      <div className="flex h-10 gap-x-2">
        {/* selectedId を渡す */}
        <WalkingListSelecter
          walkingHistory={walkingHistory}
          selectedId={selectedWalkingId}
          onSelect={(walkingId) => setSelectedWalkingId(walkingId)}
        />
        <Button variant="outline" size="icon" className="w-13 aspect-square">
          <Eye />
        </Button>
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
    </div>
  )
}
