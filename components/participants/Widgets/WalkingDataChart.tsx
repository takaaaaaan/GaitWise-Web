'use client'

import {
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
} from 'chart.js'
import React from 'react'
import { Line } from 'react-chartjs-2'

import { Card } from '@/ui'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const WalkingDataChart = ({ eventTime, data, label, color }) => {
  if (!eventTime || !data) {
    console.error('Missing data for WalkingDataChart:', { eventTime, data })
    return <p>No data available to display.</p>
  }

  // Helper functions for max/min points
  const findMaxMinIndices = (data: number[]) => {
    const maxIndex = data.indexOf(Math.max(...data))
    const minIndex = data.indexOf(Math.min(...data))
    return [maxIndex, minIndex]
  }

  const createPointRadiusForMaxMin = (data: number[]) => {
    const [maxIndex, minIndex] = findMaxMinIndices(data)
    return data.map((_, index) => (index === maxIndex || index === minIndex ? 5 : 0))
  }

  const createPointColorForMaxMin = (data: number[]) => {
    const [maxIndex, minIndex] = findMaxMinIndices(data)
    return data.map((_, index) => (index === maxIndex ? 'red' : index === minIndex ? 'blue' : 'rgba(0, 0, 0, 0.3)'))
  }

  // Chart data
  const chartData = {
    labels: eventTime,
    datasets: [
      {
        label,
        data,
        borderColor: color,
        backgroundColor: `${color}33`,
        fill: false,
        tension: 0.3,
        pointRadius: createPointRadiusForMaxMin(data),
        pointHoverRadius: 6,
        pointBorderColor: createPointColorForMaxMin(data),
        pointBackgroundColor: createPointColorForMaxMin(data),
      },
    ],
  }

  // Chart options
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'top' },
      tooltip: { mode: 'index', intersect: false },
    },
    scales: {
      x: {
        title: { display: true, text: 'Event Time' },
        ticks: { display: false },
        grid: { display: false },
      },
      y: { title: { display: true, text: 'Values' } },
    },
  }

  return (
    <Card className="mb-4 h-[330px]">
      <Line data={chartData} options={options} className="h-[200px]" />
    </Card>
  )
}

export default WalkingDataChart
