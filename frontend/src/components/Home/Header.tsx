'use client'

import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Dialog,
  DialogPanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/react'
import {
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import postItLogo from '../../assets/images/post-it.png'
import LogoutPopup from '../Popups/Logout'
import { useAuth } from '../../context/AuthContext'
import Avatar from '../Avatar/Avatar'
import { useGetUser } from '../../hooks/useAuth'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLogoutPopup, setShowLogoutPopup] = useState(false)
  const location = useLocation()
  const { token, logout } = useAuth()
  const { data: user } = useGetUser()
  const isAuthenticated = !!token

  const isActive = (path: string) => location.pathname === path

  const handleLogout = () => {
    setShowLogoutPopup(false)
    logout()
  }

  return (
    <>
      <LogoutPopup
        open={showLogoutPopup}
        onClose={() => setShowLogoutPopup(false)}
        onConfirm={handleLogout}
      />
      <header className="bg-transparent">
      <nav aria-label="Global" className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8">
        <div className="flex lg:flex-1">
          <a href="#" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              alt=""
              src={postItLogo}
              className="h-8 w-auto"
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(true)}
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-900"
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon aria-hidden="true" className="size-6" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          <Link
            to="/dashboard"
            className={`text-sm/6 font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              isActive('/dashboard')
                ? 'bg-amber-100 text-amber-700'
                : 'text-gray-900 hover:bg-gray-100'
            }`}
          >
            Dashboard
          </Link>
          <Link
            to="/list-notes"
            className={`text-sm/6 font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              isActive('/list-notes')
                ? 'bg-amber-100 text-amber-700'
                : 'text-gray-900 hover:bg-gray-100'
            }`}
          >
            List notes
          </Link>
          <Link
            to="/my-notes"
            className={`text-sm/6 font-semibold px-3 py-1.5 rounded-lg transition-colors ${
              isActive('/my-notes')
                ? 'bg-amber-100 text-amber-700'
                : 'text-gray-900 hover:bg-gray-100'
            }`}
          >
            My notes
          </Link>
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-x-4">
          {!isAuthenticated ? (
            <>
              <Link to="/login" className="text-sm/6 font-semibold text-gray-900">
                Log in
              </Link>
              <Link to="/register" className="text-sm/6 font-semibold text-gray-900">
                Register
              </Link>
            </>
          ) : (
            <Menu as="div" className="relative">
              <MenuButton className="relative flex rounded-full focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 cursor-pointer">
                <span className="absolute -inset-1.5" />
                <span className="sr-only">Open user menu</span>
                <Avatar username={user?.name || "User"} />
              </MenuButton>

              <MenuItems
                transition
                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-lg bg-white py-1 shadow-lg ring-1 ring-gray-200 transition focus:outline-none data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
              >
                <MenuItem>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 text-sm text-gray-700 data-focus:bg-amber-50 data-focus:text-amber-700"
                  >
                    Your profile
                  </Link>
                </MenuItem>
                <MenuItem>
                  <button
                    onClick={() => setShowLogoutPopup(true)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 data-focus:bg-amber-50 data-focus:text-amber-700 cursor-pointer"
                  >
                    Sign out
                  </button>
                </MenuItem>
              </MenuItems>
            </Menu>
          )}
        </div>
      </nav>
      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
        <div className="fixed inset-0 z-50" />
        <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img
                alt=""
                src={postItLogo}
                className="h-8 w-auto"
              />
            </a>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon aria-hidden="true" className="size-6" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                <Link
                  to="/dashboard"
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold ${
                    isActive('/dashboard')
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  Dashboard
                </Link>
                <Link
                  to="/list-notes"
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold ${
                    isActive('/list-notes')
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  List notes
                </Link>
                <Link
                  to="/my-notes"
                  className={`-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold ${
                    isActive('/my-notes')
                      ? 'bg-amber-100 text-amber-700'
                      : 'text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  My notes
                </Link>
              </div>
              <div className="py-6 space-y-2">
                {!isAuthenticated ? (
                  <>
                    <Link
                      to="/login"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Log in
                    </Link>
                    <Link
                      to="/register"
                      className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-gray-900 hover:bg-gray-50"
                    >
                      Register
                    </Link>
                  </>
                ) : (
                  <div className="flex items-center gap-x-3 -mx-3 px-3 py-2.5">
                    <Avatar username={user?.name || "User"} />
                    <button
                      onClick={() => {
                        setMobileMenuOpen(false)
                        setShowLogoutPopup(true)
                      }}
                      className="text-base/7 font-semibold text-gray-900 hover:text-amber-600 cursor-pointer"
                    >
                      Log out
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </DialogPanel>
      </Dialog>
    </header>
    </>
  )
}
