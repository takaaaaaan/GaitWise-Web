'use client'

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { EllipsisVertical, NotebookPen } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

import { CustomAlertDialog, EditSurvey } from '@/dialog'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/ui'

type Survey = {
  id: string
  status: string
  description: string
  title: string
  createdAt: string
  updatedAt: string
}

type SurveyTableProps = {
  data: Survey[]
  projectName: string
  visibleColumns: { id: string; label: string; visible: boolean }[]
  onDeleteComplete: () => void
}

// 日時フォーマット関数
const formatDate = (dateString: string) => {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat('ko-KR', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date)
}

export default function SurveyTable({ data, projectName, visibleColumns, onDeleteComplete }: SurveyTableProps) {
  const router = useRouter()

  // 動的に作成された列を基に ColumnDef を作成
  const columns: ColumnDef<Survey>[] = visibleColumns.map((col) => ({
    accessorKey: col.id,
    header: col.label,
    cell: ({ row }) => {
      // createdAt または updatedAt の場合はフォーマットを適用
      if (col.id === 'createdAt' || col.id === 'updatedAt') {
        return <div>{formatDate(row.getValue(col.id))}</div>
      }
      return <div>{row.getValue(col.id)}</div>
    },
  }))

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length > 0 ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                onClick={() => {
                  const redirectUrl = `/survey/${projectName}/${row.original.id}`
                  console.log('Redirecting to:', redirectUrl) // デバッグ用
                  router.push(redirectUrl)
                }}
                className="cursor-pointer hover:bg-gray-100" // 行をクリック可能にする
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={(event) => {
                          event.stopPropagation() // 行のクリックイベントをキャンセル
                          console.log('Button clicked')
                        }}
                      >
                        <EllipsisVertical />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={(event) => {
                          event.stopPropagation() // イベント伝播を停止
                          event.preventDefault() // デフォルトのイベントをキャンセル
                        }}
                      >
                        <EditSurvey data={row.original} onEditComplete={onDeleteComplete} />
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={(event) => {
                          event.stopPropagation() // イベント伝播を停止
                          event.preventDefault() // デフォルトのイベントをキャンセル
                          const redirectUrl = `/survey/${projectName}/${row.original.id}`
                          router.push(redirectUrl)
                        }}
                      >
                        <NotebookPen />
                        Edit Survey
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={(event) => {
                          event.stopPropagation() // イベント伝播を停止
                          event.preventDefault() // デフォルトのイベントをキャンセル
                          console.log('Delete Survey clicked')
                        }}
                      >
                        <CustomAlertDialog deletedata={row.original} onDeleteComplete={onDeleteComplete} />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No results found. add a new survey.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
