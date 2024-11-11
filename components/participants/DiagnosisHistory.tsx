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
import { Line } from 'react-chartjs-2'
import { BaseCard, DiagnosisRecord } from 'types'

import { ArrowDownIcon, ArrowUpIcon, ExpandMoreIcon } from '@/components/icons'
import { options } from '@/utils/chartMockData'
import { diagnosticHistoryCards } from '@/utils/diagnosisMockData'

import BaseCardDiagnosis from './BaseCardDiagnosis'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend)

const styleSystolic = {
  borderColor: 'rgb(230, 111, 210)',
  backgroundColor: 'rgba(230, 111, 210)',
  tension: 0.4,
  pointBorderWidth: 2,
  pointBorderColor: 'rgba(255,255,255)',
  pointRadius: 7,
  borderWidth: 2,
}

const styleDiastolic = {
  borderColor: 'rgb(140, 111, 230)',
  backgroundColor: 'rgba(140, 111, 230)',
  tension: 0.4,
  pointBorderWidth: 2,
  pointBorderColor: 'rgba(255,255,255)',
  pointRadius: 7,
  borderWidth: 2,
}

const DiagnosisHistory = ({ diagnosisHistory }: { diagnosisHistory: DiagnosisRecord[] }) => {
  const diastolics = diagnosisHistory.map((history) => history.blood_pressure.diastolic.value).reverse()
  const systolics = diagnosisHistory.map((history) => history.blood_pressure.systolic.value).reverse()
  const respiratoryRates = diagnosisHistory.map((history) => history.respiratory_rate.value).reverse()
  const heartRates = diagnosisHistory.map((history) => history.heart_rate.value).reverse()
  const temperatureRates = diagnosisHistory.map((history) => history.temperature.value).reverse()

  const systolicAverage = Math.floor(systolics.reduce((acc, systolic) => acc + systolic, 0) / systolics.length)
  const diastolicAverage = Math.floor(diastolics.reduce((acc, diastolic) => acc + diastolic, 0) / diastolics.length)
  const respiratoryRateAverage = Math.floor(
    respiratoryRates.reduce((acc, rate) => acc + rate, 0) / respiratoryRates.length
  )
  const heartRateAverage = Math.floor(heartRates.reduce((acc, rate) => acc + rate, 0) / heartRates.length)
  const temperatureRateAverage = Math.floor(
    temperatureRates.reduce((acc, rate) => acc + rate, 0) / temperatureRates.length
  )

  const historyCards = diagnosticHistoryCards
    .map((card) => {
      if (card.title.match('Respiratory Rate')) return { ...card, value: respiratoryRateAverage }
      if (card.title.match('Heart Rate')) return { ...card, value: heartRateAverage }
      if (card.title.match('Temperature')) return { ...card, value: temperatureRateAverage }
    })
    .filter((element) => element !== undefined) as BaseCard[]

  const labels = diagnosisHistory.map((history) => `${history.month.slice(0, 3)}, ${history.year}`).reverse()
  const dataChart = {
    labels: labels,
    datasets: [
      { ...styleDiastolic, data: diastolics },
      { ...styleSystolic, data: systolics },
    ],
  }

  return (
    <section role="list" className="divide-y divide-gray-100 rounded-3xl bg-white p-5">
      <div className="flex items-center pb-10">
        <h2 className="text-2xl font-medium">Diagnosis History</h2>
      </div>
      <section className="grid grid-cols-1 grid-rows-1 gap-y-12 rounded-xl bg-blue-50 px-5 pt-2 lg:grid-cols-3">
        <div className="col-span-2 row-span-1 grid gap-y-8 lg:gap-0">
          <div className="grid grid-cols-2 grid-rows-1">
            <h2 className="flex items-center text-xl font-medium">Blood Pressure</h2>
            <div className="grid grid-cols-1 text-sm md:mr-0 lg:mr-8">
              <p className="flex items-center justify-end">
                Last 6 Months{' '}
                <span className="ml-3">
                  <ExpandMoreIcon />
                </span>
              </p>
            </div>
          </div>
          <div className="flex w-10/12 items-center lg:w-full">
            <Line options={options} data={dataChart} />
          </div>
        </div>
        <div className="flex flex-wrap">
          <div className="text-md mb-4 grid w-full grid-cols-1 grid-rows-3 font-medium">
            <div className="flex items-center">
              <div className="mr-2 h-4 w-4 rounded-full bg-pink-400"></div>
              Systolic
            </div>
            <h3 className="flex items-center py-1 text-2xl font-medium">{systolicAverage}</h3>
            <div className="flex items-center">
              <ArrowUpIcon />
              <p className="ml-1 font-extralight">Higher than Average</p>
            </div>
          </div>
          <div className="mb-4 mr-2 h-px w-full bg-gray-400"></div>
          <div className="text-md grid w-full grid-cols-1 grid-rows-3 font-medium">
            <div className="flex items-center">
              <div className="mr-2 h-4 w-4 rounded-full bg-purple-400"></div>
              Diastolic
            </div>
            <h3 className="flex items-center py-1 text-2xl font-medium">{diastolicAverage}</h3>
            <div className="flex items-center">
              <ArrowDownIcon />
              <p className="ml-1 font-extralight">Lower than Average</p>
            </div>
          </div>
          <div className="hidden h-14 w-full lg:flex"></div>
        </div>
      </section>
      <section className="mt-5 grid grid-cols-1 grid-rows-1 justify-center gap-5 lg:grid-cols-3">
        {historyCards.map((cardPros, index) => {
          return <BaseCardDiagnosis key={index} cardProps={cardPros} />
        })}
      </section>
    </section>
  )
}

export default DiagnosisHistory
