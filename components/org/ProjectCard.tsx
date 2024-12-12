'use client'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Link from 'next/link' // Link をインポート
import React from 'react'

import { GProject } from '@/app/types'

interface ProjectCardProps {
  project: GProject
}

export default function ProjectCard({ project }: ProjectCardProps) {
  console.log('ProjectCard:', project)
  return (
    <Link href={`/participant/${project.project_name}`} passHref>
      <Card
        variant="outlined"
        className="duration-300"
        sx={{
          width: '100%',
          minHeight: 200,
          display: 'flex',
          flexDirection: 'column',
          margin: '0 auto',
          mb: 4,
          p: 2,
          borderRadius: '12px',
          backgroundColor: '#fff',
          cursor: 'pointer', // カーソルをポインタに変更
          textDecoration: 'none', // Link タグの下線を削除
        }}
      >
        <CardContent sx={{ textAlign: 'left', flex: 1 }}>
          <div className="flex w-full flex-grow">
            <div className="flex w-full flex-col text-center md:text-left">
              {/* Project Name */}
              <Typography variant="h5" component="h2" sx={{ fontWeight: 'bold', mb: 1 }}>
                {project.project_name}
              </Typography>

              {/* Project Description */}
              <Typography
                variant="body1"
                sx={{
                  minHeight: 50,
                  color: 'text.secondary',
                  mb: 2,
                }}
              >
                {project.project_description}
              </Typography>
            </div>
          </div>
          {/* 横並びにする部分 */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginTop: 'auto',
              borderTop: '1px solid #ddd',
              paddingTop: '8px',
            }}
          >
            {/* Project Code */}
            <p className="mt-1 text-xs text-gray-500 md:text-sm">
              Project Code: <span className="font-medium text-gray-800">{project.project_code}</span>
            </p>
            {/* Participants and Analysts */}
            <div className="mt-4 flex flex-col space-y-2 md:flex-row md:space-x-6 md:space-y-0">
              <p className="text-sm text-gray-600">
                Participants: <span className="font-bold text-gray-800">{project.participants?.length || 0}</span>
              </p>
              <p className="text-sm text-gray-600">
                Analysts: <span className="font-bold text-gray-800">{project.analysts?.length || 0}</span>
              </p>
              <Link href={`/survey/${project.project_name}`} className="text-sm text-gray-600 hover:underline">
                Survey List
              </Link>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
