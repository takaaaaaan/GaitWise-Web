'use client'
import React, { useMemo } from 'react'
import { Walking } from 'types'

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/ui'

type WalkingListSelecterProps = {
  walkingHistory: Walking[]
  selectedId: string | null // 選択中のID（親コンポーネントから渡される）
  onSelect: (selectedWalkingId: string) => void // 選択時のコールバック関数
}

export function WalkingListSelecter({ walkingHistory, selectedId, onSelect }: WalkingListSelecterProps) {
  // フォーマット関数
  const formatWalkingRecord = (walk: Walking) =>
    `${new Date(walk.createdAt).toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })} - Measured Time: ${walk.walking_time}`

  // フォーマット済みデータをメモ化
  const formattedWalkingHistory = useMemo(
    () => walkingHistory.map((walk) => ({ ...walk, formattedName: formatWalkingRecord(walk) })),
    [walkingHistory]
  )

  return (
    <Select onValueChange={onSelect} value={selectedId || ''}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select a walking record" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Walking Records</SelectLabel>
          {formattedWalkingHistory.map((walk) => (
            <SelectItem key={walk._id} value={walk._id}>
              {walk.formattedName}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}
