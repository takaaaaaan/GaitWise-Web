'use client'

import { RefreshCcw } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

import { NewSurvey } from '@/dialog'
import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Input,
} from '@/ui'

import SurveyTable from './SurveyTable'

type Survey = {
  id: string
  status: string
  description: string
  title: string
  createdAt: string
  updatedAt: string
}

type SurveySearchWrapperProps = {
  data: Survey[]
  projectName: string
}

type ColumnsDropdownMenuProps = {
  columns: { id: string; label: string; visible: boolean }[]
  onChange: (columns: { id: string; label: string; visible: boolean }[]) => void
}

export default function SurveySearchWrapper({ data, projectName }: SurveySearchWrapperProps) {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const router = useRouter()

  // 初期 Columns データ
  const columns = [
    { id: 'status', label: 'Status', visible: true },
    { id: 'title', label: 'Title', visible: true },
    { id: 'description', label: 'Description', visible: true },
    { id: 'createdAt', label: 'Created At', visible: true },
    { id: 'updatedAt', label: 'Updated At', visible: true },
  ]

  const [columnFilters, setColumnFilters] = useState(columns)

  // フィルタリングされたデータを計算
  const filteredData = searchTerm
    ? data.filter((survey) => survey.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : data

  // 有効な列のみをテーブルに渡す
  const visibleColumns = columnFilters.filter((col) => col.visible)

  function handlerefresh() {
    router.refresh()
  }

  return (
    <div>
      {/* 検索フィールド */}
      <h2 className="mt-10 text-2xl font-semibold text-gray-800">Survey List</h2>
      <div className="mt-5">
        <div className="flex justify-between">
          <Input
            placeholder="Search Title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)} // 検索キーワードを更新
            className="max-w-sm"
          />
          <div className="flex space-x-2">
            <Button variant="default" onClick={handlerefresh}>
              <RefreshCcw />
            </Button>
            <ColumnsDropdownMenu columns={columnFilters} onChange={setColumnFilters} />
            <NewSurvey onSurveyCreated={handlerefresh} />
          </div>
        </div>
      </div>

      {/* フィルタリングされたデータを子コンポーネントに渡す */}
      <div className="mt-5">
        <SurveyTable
          data={filteredData}
          projectName={projectName}
          visibleColumns={visibleColumns}
          onDeleteComplete={handlerefresh}
        />
      </div>
      {/* フッター */}
      <div className="mt-5">
        <div className="flex justify-between">
          <Button variant="default">Back</Button>
        </div>
      </div>
    </div>
  )
}

function ColumnsDropdownMenu({ columns, onChange }: ColumnsDropdownMenuProps) {
  const toggleColumnVisibility = (id: string, visible: boolean) => {
    const updatedColumns = columns.map((col) => (col.id === id ? { ...col, visible } : col))
    onChange(updatedColumns)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Columns</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Visible Columns</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {columns.map((column) => (
          <DropdownMenuCheckboxItem
            key={column.id}
            checked={column.visible}
            onCheckedChange={(checked) => toggleColumnVisibility(column.id, checked)}
          >
            {column.label}
          </DropdownMenuCheckboxItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
