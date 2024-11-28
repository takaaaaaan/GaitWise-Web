import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import LabResultsList from '../participants/LabResultList'
import PatientProfile from '../participants/ParticipantsProfile'

export function SideTabs({ profile, labResults, walkingData }: { profile: any; labResults: Array<string> }) {
  return (
    <Tabs defaultValue="Profile" className="w-full">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="Profile">Patient Profile</TabsTrigger>
        <TabsTrigger value="Results">Lab Results</TabsTrigger>
      </TabsList>

      <TabsContent value="Profile">
        <Card>
          <CardHeader className="flex justify-items-center">
            <CardTitle>Patient Profile</CardTitle>
            <CardDescription>Make changes to your account here. Click save when you're done.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <PatientProfile participant={profile} />
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="Results">
        <Card>
          <CardHeader>
            <CardTitle>Lab Results</CardTitle>
            <CardDescription>View and manage lab results here.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <LabResultsList labResults={labResults} walkingData={walkingData} />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
