'use client'
import Image from 'next/image'
// 画像をインポート
import { F1, F2, F3, F4, F5, M1, M2, M3, M4, M5 } from 'public'
import React from 'react'
import { User } from 'types'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

type BmiWidgetsProps = {
  userData: User
}

// BMI判定と画像を取得する関数
const getBmiImage = (bmi: number, gender: string) => {
  let image
  if (gender === 'Female') {
    if (bmi < 18.5)
      image = F1 // 低体重
    else if (bmi < 25.0)
      image = F2 // 普通体重
    else if (bmi < 30.0)
      image = F3 // 肥満（1度）
    else if (bmi < 35.0)
      image = F4 // 肥満（2度）
    else image = F5 // 肥満（3度、4度）
  } else if (gender === 'Male') {
    if (bmi < 18.5)
      image = M1 // 低体重
    else if (bmi < 25.0)
      image = M2 // 普通体重
    else if (bmi < 30.0)
      image = M3 // 肥満（1度）
    else if (bmi < 35.0)
      image = M4 // 肥満（2度）
    else image = M5 // 肥満（3度、4度）
  }
  return image
}

// BMI に基づく縁の色を決定する関数
const getCardBorderColor = (bmi: number): string => {
  if (bmi < 18.5) return 'border-blue-400' // 低体重
  if (bmi < 25.0) return 'border-green-400' // 普通体重
  if (bmi < 30.0) return 'border-yellow-400' // 肥満（1度）
  if (bmi < 35.0) return 'border-orange-400' // 肥満（2度）
  return 'border-red-400' // 肥満（3度、4度）
}

export default function BmiWidgets({ userData }: BmiWidgetsProps) {
  // 身長（cm）からメートルに変換
  const heightInMeters = userData.height / 100

  // 体重をkgに統一
  const weightInKg = userData.weight.type === 'kg' ? userData.weight.value : userData.weight.value * 0.453592 // ポンドをkgに変換

  // BMI 計算
  const bmi = weightInKg / (heightInMeters * heightInMeters)

  // BMI に応じた画像を取得
  const bmiImage = getBmiImage(bmi, userData.gender)

  // BMI に応じた縁の色を取得
  const borderColor = getCardBorderColor(bmi)

  return (
    <Card className={`w-[350px] overflow-hidden rounded-lg border-4 shadow-lg ${borderColor}`}>
      <CardHeader className="p-4">
        <CardTitle className="text-xl font-bold">BMI Widgets</CardTitle>
        <CardDescription>Track your body health with precise BMI calculation.</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center gap-4">
        <div>
          <p className="text-lg font-semibold">
            <strong>BMI:</strong> <span className="text-blue-600">{bmi.toFixed(2)}</span>
          </p>
          <p>
            <strong>Height:</strong> {userData.height} cm
          </p>
          <p>
            <strong>Weight:</strong> {userData.weight.value} {userData.weight.type}
          </p>
          <p>
            <strong>Sex:</strong> {userData.gender}
          </p>
        </div>
        <div className="w-[150px]">
          <Image src={bmiImage} alt="BMI category image" className="rounded-lg border border-gray-300" />
        </div>
      </CardContent>
    </Card>
  )
}
