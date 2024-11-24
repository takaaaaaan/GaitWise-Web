'use client'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Link from 'next/link' // Link をインポート
import React from 'react'

import { GProject } from '@/app/types'

// ==== コンポーネント Props ====
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
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 'medium',
                color: '#1976d2',
              }}
            >
              Code: {project.project_code}
            </Typography>

            {/* Participants and Analysts */}
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'medium',
                }}
              >
                🧑‍🤝‍🧑: <strong>{project.participants?.length || 0}</strong>
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  fontSize: '1rem',
                  fontWeight: 'medium',
                }}
              >
                🧠: <strong>{project.analysts?.length || 0}</strong>
              </Typography>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}
