import React from 'react'
import LogoutIcon from '@mui/icons-material/Logout';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import axios from 'axios'
import default_profile_picture from "../../assets/images/default_profile_picture.png"
import { useTranslation } from "react-i18next";
import { Fragment, useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, Transition } from '@headlessui/react'
import { UserIcon, UserCircleIcon,Bars3Icon, PresentationChartLineIcon } from '@heroicons/react/24/solid'
import { useCallback } from 'react'

import { useAuth } from '../../Middlewares/AuthContext'

export default function ProfileTab() {

  const { t } = useTranslation();
  const auth = useAuth();
  const navigate = useNavigate();
  const handleLougout = () => {
    auth?.Logout();
    navigate(0, { replace: true });
  }

  const [user, setUser] = useState();
  const UserInfo = useCallback(() => {
    try {
      axios.get(
        `${process.env.REACT_APP_MAIN_URL}/users/user-info`,
        {
          headers: {
            'x-access-token': auth?.user.token
          }
        }
      )
        .then((response) => {
          setUser(response.data.user)
        })
    }
    catch (err) {
      alert(err);
    }
  }, [])

  useEffect(() => {
    if(auth?.user?.token) UserInfo();
  }, [UserInfo])
  return (
    <>
      {/* Profile dropdown */}
      <Menu as="div" className="relative">
        <div>
          {
            (auth?.user?.token)
              ? (
                <Menu.Button className="flex rounded-full bg-transparent text-sm focus:outline-none border-2 border-[#65D01E] overflow-hidden">
                  <img
                    className="h-10 w-10 rounded-full"
                    src={
                      (user?.profile_photo)
                        ? `${process.env.REACT_APP_MAIN_URL}/images/users/${user?.profile_photo}`
                        : `${default_profile_picture}`
                    }
                    alt="Avatar"
                  />
                </Menu.Button>
              )
              : (
                <Menu.Button className="flex flex-row justify-center items-center gap-2 px-2 py-1 hover:bg-gray-100 border border-gray-200 rounded-full bg-transparent text-sm focus:outline-none overflow-hidden">
                  <Bars3Icon
                    className="block h-6 w-6 text-gray-500 font-semibold"
                    aria-hidden="true"
                  />
                  <UserCircleIcon
                    className="block h-8 w-8 text-gray-500"
                    aria-hidden="true"
                  />
                </Menu.Button>
              )
          }
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute z-50 right-0 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            {
              (auth?.user?.token)
                ? (
                  <>
                    <div className="px-1 py-1 ">
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink to='/profile-settings'>
                            <button
                              className={`${active ? 'bg-[#65D01E] text-white' : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:no-underline no-underline`}
                            >
                              {active ? (
                                <UserIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <UserIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                              {t("Profile")}
                            </button>
                          </NavLink>
                        )}
                      </Menu.Item>
                      {<Menu.Item>
                        {({ active }) => (
                          <NavLink to='/analytics?tab=overview'>
                            <button
                              className={`${active ? 'bg-[#65D01E] text-white' : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:no-underline no-underline`}
                            >
                              {active ? (
                                <PresentationChartLineIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <PresentationChartLineIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                              {"Analytics"}
                            </button>
                          </NavLink>
                        )}
                      </Menu.Item>}
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink to="/change-password">
                            <button
                              className={`${active ? 'bg-[#65D01E] text-white' : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:no-underline no-underline`}
                            >
                              {active ? (
                                <VpnKeyIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <VpnKeyIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                              {t("ChangePassword")}
                            </button>
                          </NavLink>
                        )}
                      </Menu.Item>
                    </div>
                    <div className="px-1 py-1">
                      <Menu.Item>
                        {({ active }) => (
                          <form onSubmit={handleLougout}>
                            <button
                              type='submit'
                              className={`${active ? 'bg-red-700 text-white' : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                            >
                              {active ? (
                                <LogoutIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              ) : (
                                <LogoutIcon
                                  className="mr-2 h-5 w-5"
                                  aria-hidden="true"
                                />
                              )}
                              {t("logout")}
                            </button>
                          </form>
                        )}
                      </Menu.Item>
                    </div>
                  </>
                )
                : (
                  <>
                    <div className='px-1 py-1'>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink className={'hover:no-underline no-underline'} to="/login">
                            <button
                              className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:no-underline no-underline font-semibold`}
                            >
                              {t("Login")}
                            </button>
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink className={'hover:no-underline no-underline'} to="/signup">
                            <button
                              className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-900'
                                } group flex w-full items-center rounded-md px-2 py-2 text-sm hover:no-underline no-underline font-semibold`}
                            >
                              {t("SignUp")}
                            </button>
                          </NavLink>
                        )}
                      </Menu.Item>
                    </div>
                  </>
                )
            }
          </Menu.Items>
        </Transition>
      </Menu>
    </>
  )
};