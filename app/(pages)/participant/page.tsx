import getAllPatients from '@/lib/services/Patients'
import {
  DiagnosisHistory,
  LabResultsList,
  ParticipantHeader,
  PatientList,
  PatientProfile,
  ProjectList,
} from 'components'
import type { DiagnosisRecord, Diagnostic, Patient, PatientProfileType } from 'types'


function getProfileData<Patient>(participant: Patient) {
  const profile: {
    [key: string]: NonNullable<NonNullable<Patient>[Extract<keyof Patient, string>]>
  } = {}

  for (const key in participant) {
    if (participant) {
      const value = participant[key]
      if (value && !Array.isArray(value)) {
        profile[key] = value
      }
    }
  }

  return profile
}

export default async function Home() {
  const initialData = await getAllPatients()

  const participant: Patient | undefined = initialData.find((participant) => participant.name.match('Jessica Taylor'))
  let profile!: PatientProfileType
  let diagnosisHistory!: DiagnosisRecord[]
  let diagnoticList!: Diagnostic[]
  let labResults!: Array<string>

  if (participant) {
    profile = getProfileData<Patient>(participant) as PatientProfileType

    if (participant.diagnosis_history) diagnosisHistory = participant.diagnosis_history

    if (participant.diagnostic_list) diagnoticList = participant.diagnostic_list

    if (participant.lab_results) labResults = participant.lab_results
  }

  return (
    <main className="mx-4 mb-8 flex min-h-screen flex-wrap justify-center lg:grid lg:grid-flow-col lg:grid-cols-4 lg:grid-rows-1 lg:gap-x-8">
      <section className="mb-8 lg:mb-0">
        <ProjectList />
        <PatientList />
      </section>
      <section className="col-start-2 col-end-4 mb-8 grid grid-cols-1 gap-8 lg:mb-0">
        <ParticipantHeader profile={profile} />
        <DiagnosisHistory diagnosisHistory={diagnosisHistory} />
        {
          //<DiagnosticList diagnostics={diagnoticList} />
        }
      </section>
      <section className="mb-8 grid grid-cols-1 gap-8 lg:mb-0">
        <PatientProfile participant={profile} />
        <LabResultsList labResults={labResults} />
      </section>
    </main>
  )
}
