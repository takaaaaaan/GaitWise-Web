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
import Image from 'next/image';

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
              <div className='grid grid-cols-1 grid-rows-3'>
                <div className='grid grid-cols-1 grid-rows-3 text-md font-medium'>
                    <div className='flex items-center'>
                        <div className=' w-4 h-4 mr-2 bg-pink-400 rounded-full' ></div>
                        Systolic
                    </div>
                    <h3 className="flex items-center text-2xl font-medium">160</h3>
                    <div className='flex items-center'>
                        <ArrowUpIcon /> 
                        <p className='ml-1 font-extralight'>Higher than Average</p>
                    </div>
                </div>
                <div className='grid grid-cols-1 grid-rows-3 mt-4 text-md font-medium'>
                <div className=' w-full h-px mt-1 mr-1 bg-gray-400' ></div>
                    <div className='flex items-center'>
                        <div className=' w-4 h-4 mr-2 bg-purple-400 rounded-full' ></div>
                        Diastolic
                    </div>
                    <h3 className="flex items-center text-2xl font-medium">78</h3>
                    <div className='flex items-center'>
                        <ArrowDownIcon /> 
                        <p className='ml-1 font-extralight'>Lower than Average</p>
                    </div>
                </div>
              </div>
            </section>
            <section className='grid grid-cols-3 grid-rows-1 mt-5 gap-5' >
                <div className='pl-4 bg-blue-50 rounded-xl'>
                    <Image
                        className='py-5'
                        src="/images/respiratoryrate@2x.png"
                        width={90}
                        height={90}
                        alt="Temperature"
                    />
                    <h2 className='text-lg font-light' >Respiratory Rate</h2>
                    <p className='text-3xl font-bold'>20 bpm</p>
                    <p className='my-5'>Normal</p>
                </div>
                <div className='pl-4 bg-red-50 rounded-xl'>
                    <Image
                        className='py-5'
                        src="/images/temperature@2x.png"
                        width={90}
                        height={90}
                        alt="Temperature"
                    />
                    <h2 className='text-lg font-light' >Temperature</h2>
                    <p className='text-3xl font-bold'>98.6°F</p>
                    <p className='my-5'>Normal</p>
                </div>
                <div className='pl-4 bg-red-50 rounded-xl'>
                    <Image
                        className='py-5'
                        src="/images/HeartBPM@2x.png"
                        width={90}
                        height={90}
                        alt="Temperature"
                    />
                    <h2 className='text-lg font-light' >Heart Rate</h2>
                    <p className='text-3xl font-bold'>78 bpm</p>
                    <div className='flex items-center my-5'>
                        <ArrowDownIcon /> 
                        <p className='ml-1 font-extralight'>Lower than Average</p>
                    </div>
                </div>
            </section>
             
        </section>
        )
}

export default DiagnosisHistory