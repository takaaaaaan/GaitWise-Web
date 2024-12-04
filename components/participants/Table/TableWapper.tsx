'use client'

import { BookOpenCheck, Columns3, RefreshCcw } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation'
import { useState } from 'react'
import { GProject } from 'types'

import { QRDialog } from '@/dialog'
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

import UserTable from './UserTable'

type Participant = {
  _id: string
  firstName: string
  lastName: string
  gender: string
  age: number
  email: string
  height: number
  job: string
  status: string
  createdAt: string
  updatedAt: string
}

type WrapperProps = {
  participants: Participant[]
  projectdata: GProject
}

type ColumnsDropdownMenuProps = {
  columns: { id: string; label: string; visible: boolean }[]
  onChange: (columns: { id: string; label: string; visible: boolean }[]) => void
}

export default function TableWrapper({ participants, projectdata }: WrapperProps) {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [columnFilters, setColumnFilters] = useState([
    { id: 'firstName', label: 'First Name', visible: true },
    { id: 'lastName', label: 'Last Name', visible: true },
    { id: 'gender', label: 'Gender', visible: true },
    { id: 'age', label: 'Age', visible: true },
    { id: 'email', label: 'Email', visible: true },
    { id: 'height', label: 'Height', visible: true },
    { id: 'job', label: 'Job', visible: true },
    { id: 'status', label: 'Status', visible: true },
    { id: 'createdAt', label: 'Created At', visible: false },
    { id: 'updatedAt', label: 'Updated At', visible: false },
  ])
  const router = useRouter()
  const params = useParams()
  const projectTitle = params.projectTitle

  const filteredData = searchTerm
    ? participants.filter(
        (participant) =>
          participant.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
          participant.lastName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : participants

  // 可視列をフィルタリング
  const visibleColumns = columnFilters.filter((col) => col.visible)

  function handleRefresh() {
    router.refresh()
  }

  return (
    <main className="mt-5 w-full flex-row">
      <div className="mt-5 flex justify-between">
        {/* 検索フィールド */}
        <Input
          placeholder="Search by First or Last Name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex space-x-2">
          <Button variant="default" onClick={handleRefresh}>
            <RefreshCcw />
          </Button>
          <Button
            variant="outline"
            className="flex gap-3"
            onClick={() => router.push(`/survey/${projectdata.project_name}`)}
          >
            <BookOpenCheck />
            Survey List
          </Button>
          <ColumnsDropdownMenu columns={columnFilters} onChange={setColumnFilters} />
          <QRDialog projectdata={projectdata} />
        </div>
      </div>
      <div className="mt-5">
        <UserTable data={filteredData} path={projectTitle} visibleColumns={visibleColumns} />
      </div>
    </main>
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
        <Button variant="outline" className="flex gap-3">
          <Columns3 />
          Columns
        </Button>
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
