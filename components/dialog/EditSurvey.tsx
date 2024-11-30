'use client'

import { PencilLine } from 'lucide-react'
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

type EditProps = {
  id: string
  title: string
  description: string
}

type EditSurveyProps = {
  onEditComplete: () => void
  data: EditProps
}

export function EditSurvey({ data, onEditComplete }: EditSurveyProps) {
  const param = useParams()
  const [title, setTitle] = useState(data.title)
  const [description, setDescription] = useState(data.description)
  const [loading, setLoading] = useState(false)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const surveyid = data.id

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    console.log('handleSubmit start')
    try {
      const response = await fetch('/api/customsurvey?type=edit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surveyid,
          project_name: param.projectname,
          title,
          description,
        }),
      })

      const responseData = await response.json()

      if (response.ok) {
        console.log('Survey updated successfully:', responseData)
        setIsDialogOpen(false) // ダイアログを閉じる
        onEditComplete() // データをリフレッシュ
      } else {
        console.error('Failed to update survey:', responseData.message)
      }
    } catch (error) {
      console.error('Error updating survey:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button
          onClick={() => {
            setIsDialogOpen(true) // ダイアログを開く
            console.log('Dialog opened')
          }}
          className="flex items-center justify-center gap-x-2"
        >
          <PencilLine />
          Edit Base Info
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Base Info Survey</DialogTitle>
          <DialogDescription>
            Update the survey details below. Click &quot;Save&quot; to apply your changes.
          </DialogDescription>
        </DialogHeader>
        <form
          className="grid gap-4 py-4"
          onSubmit={(e) => {
            e.preventDefault()
            console.log('Form submit triggered') // 発火確認
            handleSubmit(e)
          }}
        >
          <div>
            <Label htmlFor="title" className="text-right">
              Title:
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
          <div>
            <Label htmlFor="description">Description:</Label>
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
            <Button
              onClick={(e) => {
                e.preventDefault()
                console.log('Button clicked')
                handleSubmit(e)
              }}
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
