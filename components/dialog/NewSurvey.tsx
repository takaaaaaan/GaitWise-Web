'use client'

import { SquarePlus } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useState } from 'react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
} from '@/ui'

type NewSurveyProps = {
  onSurveyCreated: () => void
}

export function NewSurvey({ onSurveyCreated }: NewSurveyProps) {
  const param = useParams()

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/customsurvey?type=save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          project_name: param.projectname,
          title,
          description,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        console.log('Survey created successfully:', data)
        setIsDialogOpen(false)
        onSurveyCreated() // データリフレッシュ
      } else {
        console.error('Failed to create survey:', data.message)
      }
    } catch (error) {
      console.error('Error creating survey:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="default">
          <SquarePlus /> New Survey
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create a New Survey</DialogTitle>
          <DialogDescription>
            Enter the survey details below. Click &quot;Create&quot; to save your new survey.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-4 py-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <Input
              id="title"
              placeholder="Survey title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="description" className="text-right">
              Description
            </Label>
            <Input
              id="description"
              placeholder="Brief description of the survey"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="col-span-3"
              required
            />
          </div>
          <DialogFooter>
            <Button type="submit" disabled={loading}>
              {loading ? 'Creating...' : 'Create'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
