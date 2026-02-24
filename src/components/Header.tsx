'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import { 
  HomeIcon, 
  UserGroupIcon, 
  RocketLaunchIcon, 
  ShoppingBagIcon, 
  NewspaperIcon,
  PhotoIcon,
  ChevronDownIcon,
  Bars3Icon,
  XMarkIcon,
  MoonIcon,
  SunIcon
} from '@heroicons/react/24/outline'

const navItems = [
  { name: 'Beranda', href: '#home', icon: HomeIcon },
  { name: 'Profil', href: '#about', icon: UserGroupIcon },
  { name: 'Program', href: '#content', icon: RocketLaunchIcon },
  { name: 'Store', href: '/store', icon: ShoppingBagIcon },
  { name: 'Blog', href: '#categories', icon: NewspaperIcon },
  { 
    name: 'Fitur', 
    href: '#', 
    icon: PhotoIcon,
    dropdown: [
      { name: 'Galeri', href: '/gallery' },
      { name: 'Event', href: '/events' },
      { name: 'Kontak', href: '#contact' },
    ]
  },
]

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const [isDarkMode, setIsDarkMode] = useState(true)
  const { data: session } = useSession()

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="DAKAURI Logo"
              width={70}
              height={70}
              className="w-12 h-12 sm:w-14 sm:h-14 lg:w-[70px] lg:h-[70px] object-contain drop-shadow-[0_0_10px_rgba(34,197,94,0.7)] hover:drop-shadow-[0_0_15px_rgba(34,197,94,0.9)] transition-all duration-300 mix-blend-lighten"
            />
          </Link>

          {/* Desktop Navigation - Absolute Center */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-10 absolute left-1/2 -translate-x-1/2">
            {navItems.map((item) => (
              <div key={item.name} className="relative">
                {item.dropdown ? (
                  <>
                    <button
                      onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                      className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                    >
                      <item.icon className="w-4 h-4" />
                      <span className="text-sm font-medium">{item.name}</span>
                      <ChevronDownIcon className="w-3 h-3" />
                    </button>
                    {activeDropdown === item.name && (
                      <div className="absolute top-full left-0 mt-2 w-48 bg-[#1a1a1a]/95 backdrop-blur-sm border border-white/10 rounded-xl overflow-hidden shadow-xl">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-4 py-3 text-sm text-white/80 hover:bg-white/10 hover:text-white transition-colors"
                            onClick={() => setActiveDropdown(null)}
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-2 text-white/90 hover:text-white transition-colors"
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Right Actions - Absolute Right */}
          <div className="hidden lg:flex items-center gap-4 absolute right-8 xl:right-12">
            {/* Theme Toggle */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-10 h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              {isDarkMode ? (
                <MoonIcon className="w-5 h-5" />
              ) : (
                <SunIcon className="w-5 h-5" />
              )}
            </button>

            {/* Auth Button */}
            {session ? (
              <div className="flex items-center gap-3">
                <Link
                  href="/admin"
                  className="px-5 py-2 bg-green-500/20 text-green-400 rounded-full text-sm font-medium hover:bg-green-500/30 transition-colors"
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => signOut()}
                  className="px-5 py-2 bg-red-500 text-white rounded-full text-sm font-semibold hover:bg-red-600 transition-colors"
                >
                  Keluar
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="px-8 py-3 bg-orange-500 text-white rounded-full text-base font-semibold hover:bg-orange-600 transition-all shadow-lg hover:shadow-orange-500/30"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Right Actions */}
          <div className="flex lg:hidden items-center gap-2">
            {/* Theme Toggle Mobile */}
            <button
              onClick={() => setIsDarkMode(!isDarkMode)}
              className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-white/80 hover:text-white transition-colors"
            >
              {isDarkMode ? (
                <MoonIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              ) : (
                <SunIcon className="w-4 h-4 sm:w-5 sm:h-5" />
              )}
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center text-white"
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 mt-2 mx-4 bg-[#1a1a1a]/95 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl">
            <nav className="flex flex-col gap-1">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.dropdown ? (
                    <div>
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        className="flex items-center justify-between w-full px-4 py-3 text-white/80 hover:text-white transition-colors rounded-xl"
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.name}</span>
                        </div>
                        <ChevronDownIcon className={`w-4 h-4 transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === item.name && (
                        <div className="ml-8 mt-1 space-y-1">
                          {item.dropdown.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2 text-sm text-white/60 hover:text-white transition-colors"
                              onClick={() => {
                                setActiveDropdown(null)
                                setIsMobileMenuOpen(false)
                              }}
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white transition-colors rounded-xl"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <item.icon className="w-5 h-5" />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  )}
                </div>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
