'use client'

import { 
  HandRaisedIcon, 
  AcademicCapIcon, 
  HomeModernIcon 
} from '@heroicons/react/24/outline'

const features = [
  {
    icon: HandRaisedIcon,
    title: 'Kegiatan Sosial',
    description: 'Mengadakan berbagai kegiatan sosial untuk membantu masyarakat yang membutuhkan.'
  },
  {
    icon: AcademicCapIcon,
    title: 'Pendidikan',
    description: 'Memberikan edukasi dan pelatihan untuk meningkatkan kualitas sumber daya manusia.'
  },
  {
    icon: HomeModernIcon,
    title: 'Pemberdayaan Desa',
    description: 'Membantu pembangunan dan pemberdayaan masyarakat di desa-desa terpencil.'
  }
]

export default function AboutSection() {
  return (
    <section id="about" className="py-28 sm:py-36 lg:py-44 bg-[#0f0f0f]">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        {/* Section Header */}
        <div className="text-center mb-16 sm:mb-20">
          <span className="inline-block px-5 py-2.5 bg-green-500/15 text-green-400 rounded-full text-sm font-semibold mb-8 border border-green-500/20">
            Tentang Kami
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight">
            Tentang <span className="text-green-400">Dakauri</span>
          </h2>
          <p className="max-w-4xl mx-auto text-gray-300 text-lg sm:text-xl lg:text-2xl leading-relaxed">
            DAKAURI merupakan singkatan dari &ldquo;Dari Kami Untuk Negeri.&rdquo;
            <span className="block mt-4">
              Organisasi ini dibentuk oleh mahasiswa UPJ dengan tujuan utama mengabdi kepada masyarakat 
              melalui kegiatan sosial, pendidikan, dan pemberdayaan desa.
            </span>
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="group p-8 sm:p-10 bg-[#1a1a1a] rounded-3xl border-2 border-[#252525] hover:border-green-500/50 transition-all duration-300 hover:transform hover:-translate-y-2"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-500/10 rounded-2xl flex items-center justify-center mb-8 group-hover:bg-green-500/20 transition-colors">
                <feature.icon className="w-8 h-8 sm:w-10 sm:h-10 text-green-400" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4">
                {feature.title}
              </h3>
              <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mt-20 sm:mt-28">
          {[
            { number: '50+', label: 'Anggota Aktif' },
            { number: '20+', label: 'Program Terlaksana' },
            { number: '10+', label: 'Desa Binaan' },
            { number: '1000+', label: 'Penerima Manfaat' }
          ].map((stat, index) => (
            <div key={index} className="text-center p-8 sm:p-10 bg-[#1a1a1a] rounded-2xl border-2 border-[#252525]">
              <div className="text-4xl sm:text-5xl lg:text-6xl font-bold text-green-400 mb-4">
                {stat.number}
              </div>
              <div className="text-base sm:text-lg text-gray-400 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
