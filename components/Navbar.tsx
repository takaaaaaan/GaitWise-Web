import TestLogo from "./icons/TestLogo";
import HomeIcon from './icons/HomeIcon';
import GroupIcon from './icons/groupIcon';
import CalendarTodayIcon from './icons/CalendarIcon';
import ChatBubbleIcon from './icons/ChatBubbleIcon';
import CreditCardIcon from './icons/CreditCardIcon';
import SettingsIcon from './icons/SettingIcon';
import MenuIcon from './icons/MenuIcon';

const routes = [
  { name: 'Overview', href: '#', current: false , svgIcon: <HomeIcon /> },
  { name: 'Patients', href: '/patients', current: true, svgIcon: <GroupIcon />  },
  { name: 'Schedules', href: '#', current: false, svgIcon: <CalendarTodayIcon /> },
  { name: 'Messages', href: '#', current: false, svgIcon: <ChatBubbleIcon/> },
  { name: 'Transactions', href: '#', current: false, svgIcon:<CreditCardIcon/>  },
]

const Navbar = () => {
  return (
    <nav className="bg-white my-8 mx-4 rounded-full px-2 py-2">
        <div className="px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
            <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                
                <button type="button" className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false">
                <span className="absolute -inset-0.5"></span>
                <span className="sr-only">Open main menu</span>
                
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
                
                <svg className="hidden h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
                </button>
            </div>
            <div className="flex flex-1 items-center justify-center ">
                <div className="flex flex-shrink-0 items-center">
                <TestLogo />
                </div>
                <div className="hidden sm:ml-6 sm:block md:w-full items-baseline">
                    <div className="flex justify-center">
                        
                        {routes.map( (route, id) => {
                            if (route.current) { 
                                return (
                                    <a href="#" 
                                    key={id}
                                    className="flex rounded-full bg-teal-300 p-4 text-sm font-medium text-black mx-4 hover:bg-teal-300 hover:text-black" aria-current="page">
                                    <div className='pr-2'>{ route.svgIcon }</div>
                                        {route.name}
                                    </a>) 
                            }
                            return (
                                    <a href="#" 
                                    key={id}
                                    className="flex rounded-full bg-white p-4 text-sm font-medium text-black mx-4 hover:bg-teal-300 hover:text-black" aria-current="page">
                                    <div className='pr-2'>{ route.svgIcon }</div>
                                        {route.name}
                                    </a>
                            )})}
                    </div>
                </div>
            </div>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                
                <div className="relative ml-3">
                <div className='flex justify-start items-center'>
                    <button type="button" className="mr-4 relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
                    <div className='flex w-44 items-center'>
                        <img className="mr-4 h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="" />
                        <div className='flex flex-wrap text-left'>
                            <p className='w-full text-xs text font-medium' >Dr Jose Simmons</p>
                            <p className='w-full text-xs font-light' >General Practitioner</p>
                        </div>
                    </div>
                    </button>
                    <div className="mr-4">
                        <SettingsIcon  />
                    </div>
                    <div>
                        <MenuIcon />
                    </div>

                </div>

                
                </div>
            </div>
            </div>
        </div>

        
        <div className="sm:hidden" id="mobile-menu">
            <div className="space-y-1 px-2 pb-3 pt-2">

            {routes.map( (route, id) => {
                if (route.current) { 
                    return (
                        <a href="#" 
                        key={id}
                        className="flex rounded-full bg-teal-300 p-4 text-sm font-medium text-black mx-4 hover:bg-teal-300 hover:text-black" aria-current="page">
                        <div className='pr-2'>{ route.svgIcon }</div>
                            {route.name}
                        </a>) 
                }
                return (
                        <a href="#" 
                        key={id}
                        className="flex rounded-full bg-white p-4 text-sm font-medium text-black mx-4 hover:bg-teal-300 hover:text-black" aria-current="page">
                        <div className='pr-2'>{ route.svgIcon }</div>
                            {route.name}
                        </a>
            )})}
            </div>
        </div>
    </nav>)
}

export default Navbar