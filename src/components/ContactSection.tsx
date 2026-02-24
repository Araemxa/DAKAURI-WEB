'use client'

import { useState } from 'react'
import { 
  MapPinIcon, 
  EnvelopeIcon, 
  PhoneIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline'

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32 lg:py-40 bg-[#0a0a0a]">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 lg:gap-20">
          {/* Contact Info */}
          <div>
            <span className="inline-block px-5 py-2.5 bg-green-500/15 text-green-400 rounded-full text-sm font-semibold mb-8 border border-green-500/20">
              Hubungi Kami
            </span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-8">
              Mari <span className="text-green-400">Berkomunikasi</span>
            </h2>
            <p className="text-gray-300 mb-10 text-lg sm:text-xl leading-relaxed">
              Punya pertanyaan atau ingin berkolaborasi? Jangan ragu untuk menghubungi kami. 
              Kami selalu terbuka untuk diskusi dan kerjasama.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-green-500/15 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <MapPinIcon className="w-7 h-7 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2 text-lg">Alamat</h4>
                  <p className="text-gray-400 text-base leading-relaxed">
                    Universitas Pembangunan Jaya<br/>
                    Jl. Cendrawasih Raya Blok B7/P<br/>
                    Tangerang Selatan, Banten 15413
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-green-500/15 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <EnvelopeIcon className="w-7 h-7 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2 text-lg">Email</h4>
                  <a href="mailto:dakauri@upj.ac.id" className="text-gray-400 text-base hover:text-green-400 transition-colors">
                    dakauri@upj.ac.id
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-5">
                <div className="w-14 h-14 bg-green-500/15 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <PhoneIcon className="w-7 h-7 text-green-400" />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-2 text-lg">Telepon</h4>
                  <a href="tel:+6281234567890" className="text-gray-400 text-base hover:text-green-400 transition-colors">
                    +62 812-3456-7890
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-[#111111] rounded-3xl border-2 border-[#252525] p-8 sm:p-10 lg:p-12">
            <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
              <div className="grid sm:grid-cols-2 gap-6 sm:gap-8">
                <div>
                  <label htmlFor="name" className="block text-base font-semibold text-white mb-3">
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="w-full px-5 py-4 bg-[#0a0a0a] border-2 border-[#252525] rounded-xl text-white text-base placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-base font-semibold text-white mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="w-full px-5 py-4 bg-[#0a0a0a] border-2 border-[#252525] rounded-xl text-white text-base placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
                    placeholder="john@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="block text-base font-semibold text-white mb-3">
                  Subjek
                </label>
                <input
                  type="text"
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-5 py-4 bg-[#0a0a0a] border-2 border-[#252525] rounded-xl text-white text-base placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors"
                  placeholder="Subjek pesan"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-base font-semibold text-white mb-3">
                  Pesan
                </label>
                <textarea
                  id="message"
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="w-full px-5 py-4 bg-[#0a0a0a] border-2 border-[#252525] rounded-xl text-white text-base placeholder-gray-500 focus:border-green-500 focus:outline-none transition-colors resize-none"
                  placeholder="Tulis pesan Anda..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="p-5 bg-green-500/15 border-2 border-green-500/30 rounded-xl text-green-400 text-base">
                  Pesan berhasil dikirim! Kami akan segera menghubungi Anda.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="p-5 bg-red-500/15 border-2 border-red-500/30 rounded-xl text-red-400 text-base">
                  Gagal mengirim pesan. Silakan coba lagi.
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full px-8 py-5 bg-gradient-to-r from-green-500 to-green-600 text-white text-lg font-bold rounded-xl hover:from-green-600 hover:to-green-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
              >
                {isSubmitting ? (
                  <>
                    <div className="spinner w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Mengirim...
                  </>
                ) : (
                  <>
                    <PaperAirplaneIcon className="w-6 h-6" />
                    Kirim Pesan
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
