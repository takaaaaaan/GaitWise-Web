"use client"
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ExpandMoreIcon from './icons/ExpandMore';
import ArrowUpIcon from './icons/ArrowUp';
import ArrowDownIcon from './icons/ArrowDown';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

import { options, data } from "./utils/chartMockData";
import { diagnosticHistoryCards } from "./utils/diagnosisMockData";
import BaseCard from './BaseCard';

const DiagnosisHistory = () => {
    return (
        <section role="list" className="rounded-3xl p-5 bg-white divide-y divide-gray-100">
            <div className="flex items-center pb-10">
                <h2 className="text-2xl font-medium" >Diagnosis History</h2>
            </div> 
            <section className='grid grid-cols-3 grid-rows-1 bg-blue-50 p-5 rounded-xl' >
              <div className='grid col-span-2 row-span-1'>
                <div className='flex items-center justify-between h-12' >
                    <h2 className="text-xl font-medium">Blood Pressure</h2>
                    <p className='flex items-center text-sm mr-8'>
                        Last 6 Months 
                        <span className='ml-3'><ExpandMoreIcon />
                        </span> 
                    </p>
                </div>
                <div className='flex items-center'>
                    <Line options={options} data={data} /> 
                </div>
              </div>
              <div className='flex flex-wrap'>
                <div className='w-full grid grid-cols-1 grid-rows-3 text-md font-medium mb-4'>
                    <div className='flex items-center'>
                        <div className=' w-4 h-4 mr-2 bg-pink-400 rounded-full' ></div>
                        Systolic
                    </div>
                    <h3 className="py-1 flex items-center text-2xl font-medium">160</h3>
                    <div className='flex items-center'>
                        <ArrowUpIcon /> 
                        <p className='ml-1 font-extralight'>Higher than Average</p>
                    </div>
                </div>
                <div className='h-px w-full mr-2 bg-gray-400 mb-4' ></div>
                <div className='w-full grid grid-cols-1 grid-rows-3 text-md font-medium'>
                    <div className='flex items-center'>
                        <div className='w-4 h-4 mr-2 bg-purple-400 rounded-full' ></div>
                        Diastolic
                    </div>
                    <h3 className="py-1 flex items-center text-2xl font-medium">78</h3>
                    <div className='flex items-center'>
                        <ArrowDownIcon /> 
                        <p className='ml-1 font-extralight'>Lower than Average</p>
                    </div>
                </div>
                <div className='w-full h-14'>
                </div>
              </div>
            </section>
            <section className='grid grid-cols-3 grid-rows-1 mt-5 gap-5' >
            { diagnosticHistoryCards.map( (cardPros, index) => {
                return (<BaseCard key={index} cardProps={cardPros} />)
            })}
            </section>
             
        </section>
        )
}

export default DiagnosisHistory