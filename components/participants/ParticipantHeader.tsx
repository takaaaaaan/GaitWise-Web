import type { PatientProfileType } from '@/app/types'

export default async function ParticipantHeader({ profile }: { profile: PatientProfileType }) {
  return (
    <section role="list" className="divide-y divide-gray-100 rounded-3xl bg-white p-5">
      <div className="flex items-center pb-10">
        <h2 className="text-2xl font-medium">{profile.name}</h2>
      </div>
      <div className="flex items-center pb-10">
        <p className="ml-1 font-extralight">
          {profile.age} {profile.gender} Participant code 추가
        </p>
      </div>
    </section>
  )
}
