'use client'
import React from 'react'
import Lottie from 'react-lottie-player'

import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import LottieJson from '@/public/lotties/step-count.json'

type StepCountWidgetsProps = {
  step_count?: number
}

export default function StepCountWidgets({ step_count }: StepCountWidgetsProps) {
  const stepCountMessage = step_count && step_count > 0 ? `${step_count} steps` : 'No steps recorded'

  return (
    <Card className="h-[286px] w-[350px] overflow-hidden rounded-lg border-4 shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-xl font-bold">Step Count</CardTitle>
        <CardDescription className="text-center">
          Information about how many steps were taken at the time of this measurement.
        </CardDescription>
      </CardHeader>
      <div className="h-22 flex flex-col items-center justify-center">
        <Lottie loop animationData={LottieJson} play className="h-18 w-16" />
        <p className="text-lg font-semibold">
          <strong>Steps:</strong> <span className="text-blue-600">{stepCountMessage}</span>
        </p>
      </div>
    </Card>
  )
}
