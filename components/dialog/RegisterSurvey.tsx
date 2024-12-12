import { CircleCheck } from 'lucide-react'
import { useState } from 'react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/ui'

type SurveyData = {
  id: string
  status: string
  description: string
  title: string
  createdAt: string
  updatedAt: string
}

type CustomAlertDialogProps = {
  data: SurveyData
  registerSurvey: () => void
}

export function RegisterSurveyDialog({ data, registerSurvey }: CustomAlertDialogProps) {
  const [loading, setLoading] = useState(false) // ローディング状態を管理

  const handleRegister = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/customsurvey/registerSurvey', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          customSurveyId: data.id, // API に送信するデータ
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('Failed to register survey:', result.message)
        return
      }

      console.log('Survey registered successfully:', result)

      // 登録完了を親に通知
      registerSurvey()
    } catch (error) {
      console.error('Error registering survey:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center justify-center gap-2">
          <CircleCheck />
          Register
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Do you want to register this survey?</AlertDialogTitle>
          <AlertDialogDescription>
            {data.title ? `"${data.title}" will be registered to the project.` : 'This survey will be registered.'}
            <br />
            {data.description || 'No description provided.'}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            className="bg-blue-500 hover:bg-blue-600"
            onClick={handleRegister} // 登録処理を呼び出す
            disabled={loading} // ローディング中はボタンを無効化
          >
            {loading ? (
              'Loading...'
            ) : (
              <>
                <CircleCheck /> Register
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
