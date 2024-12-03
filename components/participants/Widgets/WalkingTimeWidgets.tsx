'use client'
import React from 'react'
import Lottie from 'react-lottie-player'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import LottieJson from '@/public/lotties/walkingtime.json' // 適切なLottieアニメーションを指定

type WalkingTimeWidgetsProps = {
  walking_time: string // ウォーキング時間（フォーマット例: "00:30:00"）
}

export default function WalkingTimeWidgets({ walking_time }: WalkingTimeWidgetsProps) {
  const walkingTimeMessage = walking_time ? `${walking_time} times` : 'No walking time recorded'

  return (
    <Card className="h-[286px] w-[350px] overflow-hidden rounded-lg border-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">Walking Time</CardTitle>
        <CardDescription className="text-center">Information about the total walking time recorded.</CardDescription>
      </CardHeader>
      <div className="h-25 flex flex-col items-center justify-center">
        <Lottie loop animationData={LottieJson} play className="w-20" />
        <p className="text-lg font-semibold">
          <strong>Time:</strong> <span className="text-blue-600">{walkingTimeMessage}</span>
        </p>
      </div>
    </Card>
  )
}
