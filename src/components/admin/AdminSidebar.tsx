'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import {
  HomeIcon,
  DocumentTextIcon,
  FolderIcon,
  EnvelopeIcon,
  Cog6ToothIcon,
  UsersIcon,
  ChartBarIcon
} from '@heroicons/react/24/outline'

const menuItems = [
  { name: 'Dashboard', href: '/admin', icon: HomeIcon },
  { name: 'Konten', href: '/admin/contents', icon: DocumentTextIcon },
  { name: 'Kategori', href: '/admin/categories', icon: FolderIcon },
  { name: 'Pesan', href: '/admin/messages', icon: EnvelopeIcon },
  { name: 'Pengguna', href: '/admin/users', icon: UsersIcon },
  { name: 'Statistik', href: '/admin/statistics', icon: ChartBarIcon },
  { name: 'Pengaturan', href: '/admin/settings', icon: Cog6ToothIcon },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1a1a1a] border-r border-[#2a2a2a] z-40">
      {/* Logo */}
      <div className="h-16 flex items-center gap-3 px-6 border-b border-[#2a2a2a]">
        <div className="relative w-10 h-10">
          <Image
            src="/images/logo.png"
            alt="DAKAURI Logo"
            fill
            className="object-contain"
          />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">DAKAURI</h1>
          <p className="text-[10px] text-gray-500">Admin Panel</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/admin' && pathname.startsWith(item.href))
          
          return (
            <Link
              key={item.name}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? 'bg-green-500/10 text-green-400'
                  : 'text-gray-400 hover:bg-white/5 hover:text-white'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.name}</span>
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#2a2a2a]">
        <Link
          href="/"
          className="flex items-center justify-center gap-2 px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          &larr; Kembali ke Website
        </Link>
      </div>
    </aside>
  )
}
