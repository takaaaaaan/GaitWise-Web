'use client'

import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useRouter } from 'next/navigation'
import React from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/ui'

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

type ParticipantsTableProps = {
  data: Participant[]
  path: string | string[]
  visibleColumns: { id: string; label: string; visible: boolean }[]
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

export default function UserTable({ data, path, visibleColumns }: ParticipantsTableProps) {
  const router = useRouter()

  // 可視列のみに基づいてカラム定義を動的に生成
  const columns: ColumnDef<Participant>[] = [
    {
      accessorKey: 'no',
      header: 'No.',
      cell: ({ row }) => <div>{row.index + 1}</div>, // インデックスを表示
    },
    ...visibleColumns.map((col) => ({
      accessorKey: col.id,
      header: col.label,
      cell: ({ row }) => {
        const value = row.getValue(col.id)
        if (col.id === 'createdAt' || col.id === 'updatedAt') {
          return <div>{formatDate(value)}</div>
        }
        return <div>{value}</div>
      },
    })),
  ]

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
                  const redirectUrl = `/participant/${path}/${row.original._id}`
                  router.push(redirectUrl)
                }}
                className="cursor-pointer hover:bg-gray-100"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No participants found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
