import { Eye, Mail, MessageSquare, Plus, PlusCircle, UserPlus, Users } from 'lucide-react'

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/ui'

export function WidgetsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="w-13 aspect-square">
          <Eye />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Users />
            <span>Team</span>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus />
              <span>ACC</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Plus />
                  <span>ACC-X</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Plus />
                  <span>ACC-Y</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Plus />
                  <span>ACC-Z</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem>
            <Plus />
            <span>BMI</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Plus />
            <span>만보기</span>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Plus />
            <span>이상치</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
