'use client'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Transition,
} from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import axios from 'axios'
import Image from 'next/image'
import { useEffect, useState } from 'react'

import { GroupIcon, HomeIcon, MenuIcon } from '@/components/icons'
import useAuth from '@/hooks/useAuth'
import { Gaitwise, UserLogo } from '@/public'

import { CDropdownMenu } from './Dorpdown'

// classNames 함수 정의
function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

const Navbar = () => {
  const loginUser = useAuth()
  const [currentPath, setCurrentPath] = useState('')

  // 현재 경로 저장
  useEffect(() => {
    const path = window.location.pathname
    setCurrentPath(path)
  }, [])

  // 네비게이션 항목 설정
  const navigation = [
    { name: 'Overview', href: '/organization', current: currentPath === '/organization', svgIcon: <HomeIcon /> },
    { name: 'Participant', href: '/participant', current: currentPath === '/participant', svgIcon: <GroupIcon /> },
  ]

  // 로그아웃 함수 정의
  const Signout = async () => {
    try {
      // API에 GET 요청을 보내서 로그아웃 처리
      await axios.get('/api/analyst/signout')
      window.location.href = '/auth?type=sign-in' // 로그아웃 후 로그인 페이지로 리다이렉트
    } catch (error) {
      console.error('로그아웃 실패:', error)
    }
  }

  return (
    <Disclosure as="nav" className="mx-4 mb-8 mt-4 rounded-none bg-white lg:rounded-full">
      {({ open }) => (
        <>
          <div className="sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center lg:hidden">
                {/* Mobile menu button */}
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
              <div className="flex flex-1 justify-center md:items-center">
                <div className="flex flex-shrink-0 items-center">
                  <Image src={Gaitwise} alt="logo" width={250} priority />
                </div>
                <div className="sm:block">
                  <CDropdownMenu />
                </div>
                <div className="hidden sm:ml-6 sm:block lg:w-full">
                  <div className="hidden justify-center space-x-4 lg:flex">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          item.current
                            ? 'mx-4 bg-teal-300 p-4 text-sm font-medium text-black hover:bg-teal-300 hover:text-black'
                            : 'mx-4 bg-white p-4 text-sm font-medium text-black hover:bg-teal-300 hover:text-black',
                          'flex rounded-full px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        <div className="pr-2">{item.svgIcon}</div>
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 hidden items-center pr-2 sm:static sm:inset-auto sm:pr-0 md:flex">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div className="flex">
                    <div className="relative flex rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      <Image className="h-4 w-4 rounded-full lg:h-8 lg:w-8" src={UserLogo} alt="User profile" />
                    </div>
                    <div className="grid-row-1 mx-2 grid grid-cols-1">
                      <p className="text text-xs font-medium">{loginUser.lastname + loginUser.firstname}</p>
                      <p className="text-xs font-light">{loginUser.role}</p>
                    </div>
                    <MenuButton>
                      <MenuIcon className="h-5 w-5" />
                    </MenuButton>
                  </div>
                  <Transition
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <MenuItems className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      {/* {navigation.map((item, index) => (
                        <MenuItem key={index}>
                          {({ focus }) => (
                            <a
                              key={item.name}
                              href={item.href}
                              className={classNames(
                                focus ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              <div className="flex pr-2">
                                <p className="mr-2">{item.svgIcon}</p> <p>{item.name}</p>
                              </div>
                            </a>
                          )}
                        </MenuItem>
                      ))} */}

                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="#"
                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            Settings
                          </a>
                        )}
                      </MenuItem>
                      <MenuItem>
                        {({ focus }) => (
                          <a
                            href="#"
                            className={classNames(focus ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                            onClick={Signout} // 로그아웃 함수 호출
                          >
                            Sign out
                          </a>
                        )}
                      </MenuItem>
                    </MenuItems>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>
          {/* lg:hidden */}
          <DisclosurePanel className="lg:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    item.current
                      ? 'mx-4 bg-teal-300 p-4 text-sm font-medium text-black hover:bg-teal-300 hover:text-black'
                      : 'mx-4 bg-white p-4 text-sm font-medium text-black hover:bg-teal-300 hover:text-black',
                    'flex rounded-full px-3 py-2 text-sm font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  )
}

export default Navbar
