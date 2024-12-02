'use client'
import { ChartSpline, Eye, FlipHorizontal2, Plus, RefreshCcw } from 'lucide-react'
import { useEffect, useState } from 'react'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/ui'

export function WidgetsMenu() {
  // ローカルストレージキー
  const LOCAL_STORAGE_KEY = 'activeItems'

  // アクティブなアイテムを管理
  const [activeItems, setActiveItems] = useState<string[]>(() => {
    // 初期化時にローカルストレージから値を取得
    if (typeof window !== 'undefined') {
      const storedItems = localStorage.getItem(LOCAL_STORAGE_KEY)
      return storedItems ? JSON.parse(storedItems) : []
    }
    return []
  })

  // アクティブアイテムが変更されたときにローカルストレージに保存
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(activeItems))
    }
  }, [activeItems])

  // アイテムを追加または削除する関数
  const toggleItem = (item: string) => {
    setActiveItems((prev) => (prev.includes(item) ? prev.filter((i) => i !== item) : [...prev, item]))
  }

  // 動的に管理されるアイテムリスト
  const items = [
    { label: 'ACC-X', icon: <Plus />, group: 'ACC' },
    { label: 'ACC-Y', icon: <Plus />, group: 'ACC' },
    { label: 'ACC-Z', icon: <Plus />, group: 'ACC' },
    { label: 'Gyro-X', icon: <Plus />, group: 'Gyro' },
    { label: 'Gyro-Y', icon: <Plus />, group: 'Gyro' },
    { label: 'Gyro-Z', icon: <Plus />, group: 'Gyro' },
    { label: 'Rot-X', icon: <Plus />, group: 'Rot' },
    { label: 'Rot-Y', icon: <Plus />, group: 'Rot' },
    { label: 'Rot-Z', icon: <Plus />, group: 'Rot' },
    { label: 'BMI', icon: <Plus />, group: 'Others' },
    { label: '만보기', icon: <Plus />, group: 'Others' },
    { label: '이상치', icon: <Plus />, group: 'Others' },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-13 aspect-square">
          <Eye />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        {/* Active Items Section */}
        <DropdownMenuLabel>Active Item</DropdownMenuLabel>
        {activeItems.length > 0 ? (
          activeItems.map((item) => (
            <DropdownMenuItem
              key={item}
              className="flex cursor-pointer items-center gap-x-2"
              onClick={() => toggleItem(item)}
            >
              <Plus />
              <span>{item}</span>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem className="text-gray-500">No active items</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        {/* Dynamic Item Selector */}
        <DropdownMenuLabel>Graph Selector</DropdownMenuLabel>
        <DropdownMenuGroup>
          {['ACC', 'Gyro', 'Rot', 'Others'].map((group) => (
            <DropdownMenuSub key={group}>
              <DropdownMenuSubTrigger>
                {group === 'ACC' && <FlipHorizontal2 />}
                {group === 'Gyro' && <ChartSpline />}
                {group === 'Rot' && <RefreshCcw />}
                <span>{group}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {items
                    .filter((item) => item.group === group && !activeItems.includes(item.label))
                    .map((item) => (
                      <DropdownMenuItem key={item.label} onClick={() => toggleItem(item.label)}>
                        {item.icon}
                        <span>{item.label}</span>
                      </DropdownMenuItem>
                    ))}
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
