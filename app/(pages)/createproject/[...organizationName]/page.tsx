'use client'
import { Card } from '@mui/material'
import Cookies from 'js-cookie'
import { Trash2 } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'

import { LoadingSpinner } from '@/components'
import { validateEmail } from '@/utils/emailCheck'

const ProjectPage = () => {
  const router = useRouter()
  const params = useParams()
  const { organizationName } = params || {}
  const validOrganizationName = Array.isArray(organizationName) ? organizationName[0] : organizationName || ''

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [projectCode, setProjectCode] = useState('')
  const [analystEmail, setAnalystEmail] = useState('')
  const [analysts_email, setAnalysts] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null) // フォームのバリデーションエラー
  const [APIerror, setAPIError] = useState<string | null>(null) // APIエラー
  const [loading, setLoading] = useState(false)

  const handleAddAnalyst = () => {
    if (!analystEmail.trim()) {
      setError('Email cannot be empty')
      return
    }

    if (!validateEmail(analystEmail.trim())) {
      setError('Invalid email format')
      return
    }

    setAnalysts([...analysts_email, analystEmail.trim()])
    setAnalystEmail('')
    setError(null)
  }

  const token = Cookies.get('token')

  const handleSubmit = async () => {
    setLoading(true)
    setAPIError(null) // APIエラーを初期化
    try {
      const response = await fetch('/api/project/create', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title,
          description,
          projectCode,
          analysts_email,
          validOrganizationName,
        }),
      })

      const data = await response.json()
      if (response.ok) {
        console.log('プロジェクト作成成功:', data)
        router.push(`/participant/${title}`) // 成功時にリダイレクト
      } else {
        setAPIError(data.message || 'An unexpected error occurred') // APIエラーメッセージを設定
        console.error('プロジェクト作成エラー:', data)
      }
    } catch (error) {
      setAPIError('Failed to connect to the server') // サーバー接続エラー
      console.error('エラーが発生しました:', error)
    } finally {
      setLoading(false)
    }
  }

  // リスト項目を削除する関数
  const handleRemoveAnalyst = (index: number) => {
    setAnalysts(analysts_email.filter((_, i) => i !== index))
  }
  return (
    <div className="flex min-h-[calc(100vh-10rem)] w-full items-center justify-center">
      <Card variant="outlined" className="max-w-2xl flex-col rounded-3xl bg-white p-8 duration-300">
        <h1 className="mb-4 text-2xl font-bold">Create New Project</h1>

        {/* Project Title */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Project Title<span className="text-sm text-red-500">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter project title"
            className="mt-1 w-full rounded border border-gray-300 p-2"
          />
        </div>

        {/* Project Description */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter project description"
            className="mt-1 w-full rounded border border-gray-300 p-2"
            rows={4}
          />
        </div>

        {/* Project Code */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Project Code <span className="text-sm text-red-500">*</span>
          </label>
          <input
            type="text"
            value={projectCode}
            onChange={(e) => setProjectCode(e.target.value)}
            placeholder="Enter project code"
            className="mt-1 w-full rounded border border-gray-300 p-2"
          />
        </div>

        {/* Add Analyst */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Add Analyst Email</label>
          <div className="flex">
            <input
              type="text"
              value={analystEmail}
              onChange={(e) => setAnalystEmail(e.target.value)}
              placeholder="Enter analyst Email"
              className="mt-1 w-full rounded border border-gray-300 p-2"
            />
            <button
              onClick={handleAddAnalyst}
              className="ml-2 rounded bg-teal-500 px-4 py-2 font-bold text-white hover:bg-teal-600"
            >
              Add
            </button>
          </div>
          {/* フォームエラー表示 */}
          {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        </div>

        {/* Analyst List */}
        <ul className="mb-4">
          <h3 className="text-sm font-medium text-gray-700">Analysts:</h3>
          {analysts_email.length > 0 ? (
            analysts_email.map((email, index) => (
              <li key={index} className="flex items-center justify-between border-b p-2 text-sm text-gray-600">
                <span>{email}</span>
                <button onClick={() => handleRemoveAnalyst(index)} className="ml-2 text-red-500 hover:text-red-700">
                  <Trash2 size={16} />
                </button>
              </li>
            ))
          ) : (
            <p className="text-sm text-gray-500">No analysts added yet.</p>
          )}
        </ul>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className={`w-full rounded px-4 py-2 font-bold text-white ${
            loading ? 'cursor-not-allowed bg-gray-400' : 'bg-teal-500 hover:bg-teal-600'
          }`}
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <LoadingSpinner />
              <span className="ml-2">Loading...</span>
            </div>
          ) : (
            'Create Project'
          )}
        </button>
        {/* API エラーメッセージ表示 */}
        {APIerror && <p className="mt-4 text-sm text-red-500">{APIerror}</p>}
      </Card>
    </div>
  )
}

export default ProjectPage
