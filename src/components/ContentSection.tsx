'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRightIcon, CalendarIcon, EyeIcon } from '@heroicons/react/24/outline'

// Sample content data - will be fetched from API
const sampleContents = [
  {
    id: 1,
    title: 'DAKAURI Orientation Day 2024',
    slug: 'dakauri-orientation-day-2024',
    description: 'Kegiatan orientasi untuk anggota baru DAKAURI dengan tema "Membentuk Jiwa Kepemimpinan yang Mengabdi Untuk Masyarakat".',
    thumbnail: '/bg.png',
    category: 'Event',
    date: '2024-02-15',
    views: 150
  },
  {
    id: 2,
    title: 'Program Pendidikan Desa',
    slug: 'program-pendidikan-desa',
    description: 'Program edukasi untuk anak-anak di desa binaan dengan fokus pada literasi dan numerasi dasar.',
    thumbnail: '/bg.png',
    category: 'Program',
    date: '2024-02-10',
    views: 120
  },
  {
    id: 3,
    title: 'Bakti Sosial Bersama',
    slug: 'bakti-sosial-bersama',
    description: 'Kegiatan bakti sosial bersama masyarakat desa dalam rangka memperingati Hari Kemerdekaan.',
    thumbnail: '/bg.png',
    category: 'Kegiatan',
    date: '2024-02-05',
    views: 200
  }
]

interface ContentCardProps {
  content: {
    id: number
    title: string
    slug: string
    description: string
    thumbnail: string
    category: string
    date: string
    views: number
  }
}

function ContentCard({ content }: ContentCardProps) {
  return (
    <div className="group bg-[#111111] rounded-2xl border-2 border-[#1e1e1e] hover:border-green-500/60 transition-all duration-300 hover:transform hover:-translate-y-1 overflow-hidden">
      {/* Thumbnail */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <Image
          src={content.thumbnail}
          alt={content.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
        <span className="absolute top-4 left-4 px-3 py-1.5 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
          {content.category}
        </span>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-green-400 transition-colors leading-tight">
          {content.title}
        </h3>
        <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
          {content.description}
        </p>

        {/* Meta */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
          <div className="flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4" />
            <span>{new Date(content.date).toLocaleDateString('id-ID')}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <EyeIcon className="w-4 h-4" />
            <span>{content.views} views</span>
          </div>
        </div>

        {/* Read More */}
        <Link 
          href={`/content/${content.slug}`}
          className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 font-medium text-sm transition-colors group-hover:gap-3"
        >
          Baca Selengkapnya
          <ArrowRightIcon className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  )
}

export default function ContentSection() {
  return (
    <section id="content" className="py-28 sm:py-36 lg:py-44 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-16 sm:mb-20">
          <div className="mb-8 md:mb-0">
            <span className="inline-block px-5 py-2.5 bg-green-500/15 text-green-400 rounded-full text-sm font-semibold mb-6 border border-green-500/20">
              Konten Terbaru
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Program & <span className="text-green-400">Kegiatan</span>
            </h2>
          </div>
          <Link 
            href="/content"
            className="inline-flex items-center gap-3 text-lg text-green-400 hover:text-green-300 transition-colors font-semibold group"
          >
            Lihat Semua
            <ArrowRightIcon className="w-6 h-6 transition-transform group-hover:translate-x-2" />
          </Link>
        </div>

        {/* Content Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12">
          {sampleContents.map((content) => (
            <ContentCard key={content.id} content={content} />
          ))}
        </div>
      </div>
    </section>
  )
}
