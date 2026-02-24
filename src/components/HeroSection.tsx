'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { PlayIcon, ChevronDownIcon } from '@heroicons/react/24/solid'

// Floating element data
const floatingElements = [
  { type: 'circle', color: 'bg-gray-500/20', size: 'w-20 h-20', position: 'top-[15%] left-[8%]', delay: '0s' },
  { type: 'circle', color: 'bg-gray-500/20', size: 'w-16 h-16', position: 'top-[25%] left-[5%]', delay: '1s' },
  { type: 'circle-solid', color: 'bg-green-500', size: 'w-4 h-4', position: 'top-[35%] left-[15%]', delay: '2s' },
  { type: 'circle-solid', color: 'bg-yellow-400', size: 'w-5 h-5', position: 'top-[40%] left-[7%]', delay: '0.5s' },
  { type: 'circle-solid', color: 'bg-blue-500', size: 'w-4 h-4', position: 'top-[15%] right-[15%]', delay: '1.5s' },
  { type: 'circle', color: 'bg-gray-500/20', size: 'w-24 h-24', position: 'top-[30%] right-[5%]', delay: '0.8s' },
  { type: 'circle-solid', color: 'bg-orange-500', size: 'w-4 h-4', position: 'top-[50%] right-[10%]', delay: '2.5s' },
  { type: 'circle-solid', color: 'bg-purple-500', size: 'w-3 h-3', position: 'top-[10%] right-[25%]', delay: '1.2s' },
  { type: 'diamond', color: 'bg-green-400/60', size: 'w-6 h-6', position: 'top-[60%] right-[12%]', delay: '3s' },
  { type: 'triangle', color: 'bg-blue-400/50', size: 'w-5 h-5', position: 'top-[45%] right-[18%]', delay: '1.8s' },
  { type: 'hexagon', color: 'bg-purple-400/40', size: 'w-7 h-7', position: 'top-[70%] left-[20%]', delay: '2.2s' },
]

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bg.png"
          alt="Background"
          fill
          className="object-cover object-center"
          priority
        />
      </div>

      {/* Green Gradient Overlay - Bottom to Top */}
      <div 
        className="absolute inset-0 z-[1]"
        style={{
          background: `linear-gradient(
            to top,
            rgba(22, 163, 74, 0.9) 0%,
            rgba(22, 163, 74, 0.7) 20%,
            rgba(22, 163, 74, 0.4) 40%,
            rgba(15, 15, 15, 0.6) 70%,
            rgba(15, 15, 15, 0.8) 100%
          )`
        }}
      />

      {/* Dark Overlay for Better Readability */}
      <div className="absolute inset-0 z-[2] bg-black/30" />

      {/* Floating Elements - Hidden on mobile */}
      <div className="absolute inset-0 z-[3] pointer-events-none hidden md:block">
        {floatingElements.map((el, index) => (
          <div
            key={index}
            className={`absolute ${el.position} animate-float`}
            style={{ animationDelay: el.delay, animationDuration: '6s' }}
          >
            {el.type === 'circle' && (
              <div className={`${el.size} ${el.color} rounded-full`} />
            )}
            {el.type === 'circle-solid' && (
              <div className={`${el.size} ${el.color} rounded-full`} />
            )}
            {el.type === 'diamond' && (
              <div className={`${el.size} ${el.color} rotate-45 rounded-sm`} />
            )}
            {el.type === 'triangle' && (
              <div 
                className={`${el.size} ${el.color}`}
                style={{
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
                }}
              />
            )}
            {el.type === 'hexagon' && (
              <div 
                className={`${el.size} ${el.color}`}
                style={{
                  clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)'
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Hero Content */}
      <div 
        className={`relative z-10 text-center px-6 sm:px-8 max-w-5xl mx-auto transition-all duration-1000 -mt-16 sm:-mt-20 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      >
        {/* DAKAURI Stroke Text - Terpisah */}
        <div className="mb-4">
          <span className="text-2xl sm:text-3xl md:text-4xl font-bold uppercase tracking-[0.3em]" style={{ WebkitTextStroke: '1px #22c55e', color: 'transparent' }}>
            DAKAURI
          </span>
        </div>

        {/* Main Heading - Terpisah */}
        <div className="mb-8 sm:mb-10">
          <h1 className="font-['Montserrat'] text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white uppercase tracking-wider leading-tight">
            BERSATU SIAP
            <br />
            MEMBANGUN
          </h1>
        </div>

        {/* CTA Buttons - Terpisah */}
        <div className="mb-12 sm:mb-16">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
            <button className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 sm:px-10 py-4 sm:py-5 bg-black/60 backdrop-blur-sm text-white rounded-full text-base sm:text-lg font-semibold transition-all hover:bg-black/80 hover:border-green-500 border-2 border-white/30 hover:scale-105">
              <PlayIcon className="w-5 h-5 sm:w-6 sm:h-6" />
              Tonton Video Profil
            </button>
            <Link 
              href="#about"
              className="w-full sm:w-auto text-center px-8 sm:px-10 py-4 sm:py-5 bg-transparent text-white rounded-full text-base sm:text-lg font-semibold border-2 border-white/60 transition-all hover:bg-white hover:text-black hover:scale-105"
            >
              Profil
            </Link>
          </div>
        </div>

        {/* Description - Terpisah */}
        <div className="max-w-4xl mx-auto mt-8 sm:mt-12">
          <p className="text-base sm:text-lg md:text-xl text-white leading-relaxed font-light">
            DAKAURI merupakan singkatan dari <span className="font-medium">&ldquo;Dari Kami Untuk Negeri.&rdquo;</span>
            <span className="block mt-2">
              Organisasi ini dibentuk oleh mahasiswa UPJ dengan tujuan utama mengabdi kepada masyarakat 
              melalui kegiatan sosial, pendidikan, dan pemberdayaan desa.
            </span>
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <Link 
          href="#content"
          className="flex flex-col items-center text-white/60 hover:text-white transition-colors animate-bounce"
        >
          <ChevronDownIcon className="w-6 h-6" />
        </Link>
      </div>
    </section>
  )
}
