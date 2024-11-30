import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import LabResultsList from '../participants/LabResultList'
import PatientProfile from '../participants/ParticipantsProfile'

export function SideTabs({ profile }: { profile: any }) {
  return (
    <Tabs defaultValue="Profile" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Profile">User Profile</TabsTrigger>
        <TabsTrigger value="Results">Measurement Data</TabsTrigger>
      </TabsList>
      <TabsContent value="Profile">
        <Card>
          <CardHeader className="flex justify-items-center">
            <CardTitle>User Profile</CardTitle>
            <CardDescription>Here, you can view the information of current users.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <PatientProfile participant={profile} />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Results">
        <Card>
          <CardHeader>
            <CardTitle>Measurement Data</CardTitle>
            <CardDescription>You can download the walking data measured by the user.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <LabResultsList participant={profile} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
