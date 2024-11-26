'use client'
import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { User } from 'types'

import { MenuIcon } from '@/components/icons'
import { Button, Card, CardFooter, Input } from '@/ui'

interface PatientListProps {
  participants: User[] // 親コンポーネントから受け取るprops
  projectTitle: string // 親コンポーネントから受け取るプロジェクトタイトル
}

const PatientList: React.FC<PatientListProps> = ({ participants: initialParticipants, projectTitle }) => {
  const router = useRouter()
  const [participants, setParticipants] = useState(initialParticipants)
  const [filteredParticipants, setFilteredParticipants] = useState(initialParticipants) // フィルタリング用
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('') // 検索クエリ
  const [newPatientId, setNewPatientId] = useState('')

  const handleSearch = () => {
    if (searchQuery.trim() === '') {
      setFilteredParticipants(participants) // 検索クエリが空の場合は全データ表示
    } else {
      // 検索クエリに一致するデータをフィルタリング
      const filtered = participants.filter(
        (participant) =>
          participant.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          participant.lastName.toLowerCase().includes(searchQuery.toLowerCase())
      )
      setFilteredParticipants(filtered)
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch() // Enterキーで検索
    }
  }

  const handleAddPatientClick = () => {
    setIsModalOpen(true) // モーダルを開く
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setNewPatientId('')
  }

  const handleAddPatient = () => {
    if (newPatientId.trim()) {
      const newPatient = {
        id: newPatientId,
        firstName: 'New',
        lastName: 'Patient', // デフォルト値
        gender: 'Unknown', // デフォルト値
        age: 'Unknown', // デフォルト値
        _id: newPatientId, // デフォルトで新しいIDを設定
      }
      setParticipants([...participants, newPatient]) // 新しい患者を追加
      setFilteredParticipants([...participants, newPatient]) // フィルタリング結果も更新
      handleCloseModal() // モーダルを閉じる
    }
  }

  const handleParticipantClick = (participantId: string) => {
    // リダイレクト先のURLを生成
    const redirectTo = `/participant/${projectTitle}/${participantId}`
    router.push(redirectTo)
  }

  return (
    <Card className="h-full">
      <ul role="list" className="divide-y divide-gray-100 rounded-3xl bg-white">
        {/* 検索バー */}
        <li className="flex w-full items-center justify-between gap-x-6 p-5">
          <Input
            type="text"
            placeholder="Search patients by first or last name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // 入力変更をトラッキング
            onKeyDown={handleKeyDown} // Enterキーを押した時の動作
            className="w-full"
          />
          <Button type="button" className="bg-teal-500 px-4 py-2 hover:bg-teal-600" onClick={handleSearch}>
            <Search />
          </Button>
        </li>
        {/* フィルタリングされた参加者のリスト */}
        {filteredParticipants.map((participant, index) => (
          <li
            key={index}
            className="flex cursor-pointer items-center justify-between gap-x-6 p-5 hover:bg-gray-200"
            onClick={() => handleParticipantClick(participant._id)} // クリック時にリダイレクト
          >
            <div className="flex min-w-0 gap-x-4">
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {participant.firstName} {participant.lastName}
                </p>
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Gender: {participant.gender}, Age: {participant.age}
                </p>
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-center">
              <MenuIcon />
            </div>
          </li>
        ))}

        {/* Add Patient Button */}
        <li className="flex items-center justify-center p-5">
          <CardFooter>
            <Button
              onClick={handleAddPatientClick}
              className="rounded-full bg-teal-500 px-4 py-2 font-bold text-white hover:bg-teal-600"
            >
              + Add Patient
            </Button>
          </CardFooter>
        </li>
      </ul>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="w-1/3 rounded-lg bg-white p-6">
            <h3 className="mb-4 text-xl font-bold">Add New Patient</h3>
            <input
              type="text"
              placeholder="Enter Patient ID"
              value={newPatientId}
              onChange={(e) => setNewPatientId(e.target.value)}
              className="mb-4 w-full rounded border border-gray-300 p-2"
            />
            <div className="flex justify-end">
              <button
                onClick={handleCloseModal}
                className="mr-2 rounded bg-gray-300 px-4 py-2 font-bold text-black hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleAddPatient}
                className="rounded bg-teal-500 px-4 py-2 font-bold text-white hover:bg-teal-600"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </Card>
  )
}

export default PatientList
