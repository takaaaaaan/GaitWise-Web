
import type {PatientProfile} from "@/../lib/services/PatientsTypes";

export default async function ParticipantHeader({profile}: {profile: PatientProfile}) {
    return(
        <section role="list" className="rounded-3xl p-5 bg-white divide-y divide-gray-100">
            <div className="flex items-center pb-10">
                <h2 className="text-2xl font-medium" >{profile.name}</h2>
            </div>
            <div className="flex items-center pb-10">
                <p className='ml-1 font-extralight'>{profile.age} {profile.gender} Participant code 추가</p>
            </div>
        </section>
    )


}