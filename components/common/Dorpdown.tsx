'use client'
import { Check, Mail, MessageSquare, Plus, PlusCircle, UserPlus, Users } from 'lucide-react'
import { useRouter } from 'next/navigation'

import useNavPage from '@/hooks/useNavPage'
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

export function CDropdownMenu() {
  const router = useRouter()
  const { data, loading, error } = useNavPage()
  console.log('useNavPage data:', data)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="h-[40px] w-[200px] justify-between">
          {loading ? <span>Loading...</span> : <span>Select organization...</span>}
        </Button>
      </DropdownMenuTrigger>
      {!loading && !error && Array.isArray(data) && data.length > 0 && (
        <DropdownMenuContent className="w-56">
          {data.map((organization, index) => (
            <div key={index}>
              <DropdownMenuLabel
                className="cursor-pointer hover:underline"
                onClick={() => router.push(`/organization/${organization.organization_name}`)}
              >
                Organization : {organization.organization_name}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                {organization.projects.length > 0 ? (
                  organization.projects.map((project, idx) => (
                    <DropdownMenuItem
                      key={idx}
                      onClick={() => router.push(`/participant/${project}`)}
                      className="cursor-pointer"
                    >
                      {project}
                      <Check />
                    </DropdownMenuItem>
                  ))
                ) : (
                  <DropdownMenuItem disabled>No projects available</DropdownMenuItem>
                )}
              </DropdownMenuGroup>
            </div>
          ))}
          <DropdownMenuSeparator />
          {/* Static Menu */}
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Users />
              <span>Team</span>
            </DropdownMenuItem>
            <DropdownMenuSub>
              <DropdownMenuSubTrigger>
                <UserPlus />
                <span>Invite users</span>
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent>
                  <DropdownMenuItem>
                    <Mail />
                    <span>Email</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <MessageSquare />
                    <span>Message</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <PlusCircle />
                    <span>More...</span>
                  </DropdownMenuItem>
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuItem onClick={() => router.push('/auth?type=organization')}>
              <Plus />
              <span>New Org</span>
            </DropdownMenuItem>
            {/* TODO : 추후 개발 */}
            {/* <DropdownMenuItem>
              <Plus />
              <span>New Project</span>
            </DropdownMenuItem> */}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      )}
    </DropdownMenu>
  )
}
