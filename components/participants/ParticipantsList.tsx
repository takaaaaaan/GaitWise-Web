'use client'
import { Search, UsersRound } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { User } from 'types'

import { MenuIcon } from '@/components/icons'
import { Button, Card, Input } from '@/ui'

interface PatientListProps {
  participants: User[] // 親コンポーネントから受け取るprops
  projectTitle: string // 親コンポーネントから受け取るプロジェクトタイトル
}

const PatientList: React.FC<PatientListProps> = ({ participants: initialParticipants, projectTitle }) => {
  const router = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [participants, setParticipants] = useState(initialParticipants)
  const [filteredParticipants, setFilteredParticipants] = useState(initialParticipants) // フィルタリング用
  const [searchQuery, setSearchQuery] = useState('') // 検索クエリ

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

  const handleParticipantClick = (participantId: string) => {
    // リダイレクト先のURLを生成
    const redirectTo = `/participant/${projectTitle}/${participantId}`
    router.push(redirectTo)
  }

  return (
    <Card className="h-full">
      <ul role="list" className="divide-y divide-gray-100 rounded-3xl bg-white">
        <li className="mt-1 flex w-full items-center justify-between gap-x-6 px-5 py-3">
          <Button
            type="button"
            className="bg-teal-500 px-4 py-2 hover:bg-teal-600"
            onClick={() => router.push(`/participant/${projectTitle}`)}
          >
            <UsersRound />
          </Button>
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
      </ul>
    </Card>
  )
}

export default PatientList
