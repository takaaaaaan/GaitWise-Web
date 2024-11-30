import { Trash2 } from 'lucide-react'
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
  deletedata: SurveyData
  onDeleteComplete: () => void // 削除完了後に親に通知する関数
}

export function CustomAlertDialog({ deletedata, onDeleteComplete }: CustomAlertDialogProps) {
  const [loading, setLoading] = useState(false) // ローディング状態を管理

  const handleDelete = async () => {
    setLoading(true)
    try {
      const response = await fetch('/api/customsurvey', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          surveyid: deletedata.id, // API に送信するデータ
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        console.error('Failed to delete survey:', result.message)
        return
      }

      console.log('Survey deleted successfully:', result)

      // 削除完了を親に通知
      onDeleteComplete()
    } catch (error) {
      console.error('Error deleting survey:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="flex items-center justify-center gap-2">
          <Trash2 />
          Delete Survey
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            {deletedata.title ? `"${deletedata.title}" will be permanently deleted.` : 'This item will be deleted.'}
            <br />
            {deletedata.description || 'No description provided.'}
            <br />
            This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <AlertDialogAction
            className="bg-red-500 hover:bg-red-600"
            onClick={handleDelete} // 削除処理を呼び出す
            disabled={loading} // ローディング中はボタンを無効化
          >
            {loading ? (
              'Loading...'
            ) : (
              <>
                <Trash2 /> Delete
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
