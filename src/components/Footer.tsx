'use client'

import Link from 'next/link'
import Image from 'next/image'
import { 
  MapPinIcon, 
  EnvelopeIcon, 
  PhoneIcon 
} from '@heroicons/react/24/outline'

const socialLinks = [
  { name: 'Instagram', href: 'https://instagram.com/dakauri_upj', icon: 'instagram' },
  { name: 'YouTube', href: 'https://youtube.com/@dakauri', icon: 'youtube' },
  { name: 'LinkedIn', href: 'https://linkedin.com/company/dakauri', icon: 'linkedin' },
  { name: 'Twitter', href: 'https://twitter.com/dakauri_upj', icon: 'twitter' },
]

const quickLinks = [
  { name: 'Beranda', href: '/' },
  { name: 'Tentang Kami', href: '#about' },
  { name: 'Program', href: '#content' },
  { name: 'Blog', href: '/blog' },
  { name: 'Kontak', href: '#contact' },
]

const programs = [
  { name: 'Kegiatan Sosial', href: '/programs/social' },
  { name: 'Pendidikan', href: '/programs/education' },
  { name: 'Pemberdayaan Desa', href: '/programs/village' },
  { name: 'Event', href: '/events' },
]

export default function Footer() {
  return (
    <footer className="bg-[#050505] border-t-2 border-[#1a1a1a]">
      {/* Main Footer */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl py-16 sm:py-20 lg:py-24">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 lg:gap-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative w-14 h-14">
                <Image
                  src="/logo.png"
                  alt="DAKAURI Logo"
                  fill
                  className="object-contain"
                />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-white">DAKAURI</h3>
                <p className="text-sm text-gray-500">Universitas Pembangunan Jaya</p>
              </div>
            </div>
            <p className="text-gray-400 text-base leading-relaxed mb-8">
              Dari Kami Untuk Negeri - Organisasi mahasiswa UPJ yang berdedikasi 
              untuk mengabdi kepada masyarakat.
            </p>
            {/* Social Links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 bg-[#1a1a1a] rounded-xl flex items-center justify-center text-gray-400 hover:bg-green-500/20 hover:text-green-400 transition-colors"
                  aria-label={social.name}
                >
                  <SocialIcon name={social.icon} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Tautan Cepat</h4>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-green-400 transition-colors text-base"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h4 className="text-white font-bold mb-6 text-lg">Program Kami</h4>
            <ul className="space-y-4">
              {programs.map((program) => (
                <li key={program.name}>
                  <Link
                    href={program.href}
                    className="text-gray-400 hover:text-green-400 transition-colors text-base"
                  >
                    {program.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="text-white font-bold mb-6 text-lg">Kontak</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-4">
                <MapPinIcon className="w-6 h-6 text-green-400 flex-shrink-0 mt-0.5" />
                <span className="text-gray-400 text-base leading-relaxed">
                  Universitas Pembangunan Jaya, Tangerang Selatan, Banten
                </span>
              </li>
              <li className="flex items-center gap-4">
                <EnvelopeIcon className="w-6 h-6 text-green-400 flex-shrink-0" />
                <a 
                  href="mailto:dakauri@upj.ac.id" 
                  className="text-gray-400 hover:text-green-400 transition-colors text-base"
                >
                  dakauri@upj.ac.id
                </a>
              </li>
              <li className="flex items-center gap-4">
                <PhoneIcon className="w-6 h-6 text-green-400 flex-shrink-0" />
                <a 
                  href="tel:+6281234567890" 
                  className="text-gray-400 hover:text-green-400 transition-colors text-base"
                >
                  +62 812-3456-7890
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#1a1a1a]">
        <div className="container mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm sm:text-base">
              &copy; {new Date().getFullYear()} DAKAURI. All rights reserved.
            </p>
            <div className="flex gap-6 sm:gap-8">
              <Link href="/privacy" className="text-gray-500 hover:text-gray-300 text-sm sm:text-base">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-gray-300 text-sm sm:text-base">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

// Social Icon Component
function SocialIcon({ name }: { name: string }) {
  switch (name) {
    case 'instagram':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    case 'youtube':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    case 'linkedin':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
      )
    case 'twitter':
      return (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
      )
    default:
      return null
  }
}
