import PatientList from "@/participants/ParticipantsList";
import DiagnosisHistory from '@/participants/DiagnosisHistory';
import DiagnosticList from "@/participants/DiagnosticList";
import PatientProfile from "@/participants/ParticipantsProfile";
import LabResultsList from "@/participants/LabResultList";
import getAllPatients from "@/../lib/services/Patients";
import type { DiagnosisHistory as DHistory, Diagnostic, Patient, PatientProfile as PProfile } from "@/../lib/services/PatientsTypes";
import ProjectList from "@/participants/ProjectList";
import ParticipantHeader from "@/participants/ParticipantHeader";
function getProfileData<Patient>(participant: Patient) {
  let profile: { 
    [key : string] : NonNullable<NonNullable<Patient>[Extract<keyof Patient, string>]> 
  } = {}

  for (const key in participant) {
    if (participant) {
      const value = participant[key]
      if(value && !Array.isArray(value) ) {
        profile[key] = value
      }
    }
  }

  return profile
}

export default async function Home() {
  const initialData = await getAllPatients()

  

  const participant : Patient | undefined = initialData.find( (participant) => participant.name.match("Jessica Taylor") )
  let profile!: PProfile
  let diagnosisHistory! : DHistory[]
  let diagnoticList! : Diagnostic[]
  let labResults! : Array<string>

  if (participant) {
    profile = getProfileData<Patient>(participant) as PProfile

    if (participant.diagnosis_history)
      diagnosisHistory = participant.diagnosis_history

    if (participant.diagnostic_list)
      diagnoticList = participant.diagnostic_list

    if (participant.lab_results)
      labResults = participant.lab_results
  }

  return (
    <main className="flex flex-wrap justify-center lg:grid lg:grid-rows-1 lg:grid-flow-col lg:gap-x-8 lg:grid-cols-4 min-h-screen mx-4 mb-8">
      <section className="mb-8 lg:mb-0" > 
        <ProjectList/>
        <PatientList/> 
      </section>
      <section className="mb-8 lg:mb-0 grid grid-cols-1 col-start-2 col-end-4 gap-8">
        <ParticipantHeader profile={profile} />
        <DiagnosisHistory diagnosisHistory={diagnosisHistory} />
        {//<DiagnosticList diagnostics={diagnoticList} />
        }
      </section>
      <section className="mb-8 lg:mb-0 grid grid-cols-1 gap-8">
        <PatientProfile participant={profile} />
        <LabResultsList labResults={labResults} />
      </section>
    </main>
  );
}
