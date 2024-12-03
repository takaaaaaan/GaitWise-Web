'use client'
import { Plus, SlidersHorizontal } from 'lucide-react'

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

interface WidgetsMenuProps {
  activeWidgets: string[]
  onUpdate: (updatedActiveItems: string[]) => void
}

export default function WidgetsMenu({ activeWidgets, onUpdate }: WidgetsMenuProps) {
  const toggleItem = (item: string) => {
    const updatedActiveItems = activeWidgets.includes(item)
      ? activeWidgets.filter((i) => i !== item)
      : [...activeWidgets, item]
    onUpdate(updatedActiveItems) // 状態を親コンポーネントに更新
  }

  const items = [
    { label: 'ACC-X', group: 'ACC' },
    { label: 'ACC-Y', group: 'ACC' },
    { label: 'ACC-Z', group: 'ACC' },
    { label: 'Gyro-X', group: 'Gyro' },
    { label: 'Gyro-Y', group: 'Gyro' },
    { label: 'Gyro-Z', group: 'Gyro' },
    { label: 'Rot-X', group: 'Rot' },
    { label: 'Rot-Y', group: 'Rot' },
    { label: 'Rot-Z', group: 'Rot' },
    { label: 'BMI', group: 'Others' },
    { label: 'Step Count', group: 'Others' },
    { label: 'Walking Time', group: 'Others' },
  ]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-13 aspect-square">
          <SlidersHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>Active Items</DropdownMenuLabel>
        {activeWidgets.length > 0 ? (
          activeWidgets.map((item) => (
            <DropdownMenuItem key={item} onClick={() => toggleItem(item)}>
              <Plus />
              <span>{item}</span>
            </DropdownMenuItem>
          ))
        ) : (
          <DropdownMenuItem className="text-gray-500">No active items</DropdownMenuItem>
        )}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Graph Selector</DropdownMenuLabel>
        <DropdownMenuGroup>
          {['ACC', 'Gyro', 'Rot', 'Others'].map((group) => (
            <DropdownMenuSub key={group}>
              <DropdownMenuSubTrigger>
                <span>{group}</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  {items
                    .filter((item) => item.group === group && !activeWidgets.includes(item.label))
                    .map((item) => (
                      <DropdownMenuItem key={item.label} onClick={() => toggleItem(item.label)}>
                        <Plus />
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
