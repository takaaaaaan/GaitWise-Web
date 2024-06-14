import SearchIcon from "./icons/SearchIcon"
import MenuIcon from './icons/MenuIcon';

const patients = [
    {
      name: "Emily Williams",
      gender: "Female",
      age: 18,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isActive: false
    },
    {
      name: "Ryan Johnson",
      gender: "Male",
      age: 45,
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isActive: false
    },
    {
      name: "Brandon Mitchell",
      gender: "Male",
      age: 36,
      image: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isActive: false
    },
    {
      name: "Jessica Taylor",
      gender: "Female",
      age: 28,
      image: "images/patientprofile.png",
      isActive: true
    },
    {
      name: "Samantha Johnson",
      gender: "Female",
      age: 56,
      image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isActive: false
    },
    {
      name: "Olivia Brown",
      gender: "Female",
      age: 32,
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
      isActive: false
    }
  ];
  

const PatientList = () => {
    return (
    <ul role="list" className="rounded-3xl bg-white divide-y divide-gray-100">
        <li className="flex justify-between items-center gap-x-6 p-5">
            <h2 className="text-2xl font-medium" >Patients</h2>
            <SearchIcon />
        </li>
        { patients.map( (patient, index) => {
            return (
                <li 
                key={index}
                className={ patient.isActive ? 
                    "flex justify-between gap-x-6 p-5 items-center bg-gray-200" :
                    "flex justify-between gap-x-6 p-5 items-center"
                }>
                    <div className="flex min-w-0 gap-x-4">
                    <img className="h-12 w-12 flex-none rounded-full bg-gray-50" src={patient.image} alt="" />
                    <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">{patient.name}</p>
                        <p className="mt-1 truncate text-xs leading-5 text-gray-500">{patient.gender}, {patient.age}</p>
                    </div>
                    </div>
                    <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-center">
                        <MenuIcon/>
                    </div>
                </li>
            )
        })}
        
    
    </ul>
    )
}

export default PatientList