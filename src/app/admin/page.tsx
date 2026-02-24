'use client'

import { useEffect, useState } from 'react'
import {
  DocumentTextIcon,
  FolderIcon,
  EnvelopeIcon,
  EyeIcon,
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon
} from '@heroicons/react/24/outline'

interface DashboardStats {
  totalContents: number
  totalCategories: number
  totalMessages: number
  totalViews: number
  unreadMessages: number
  recentContents: Array<{
    id: number
    title: string
    status: string
    createdAt: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/admin/statistics')
      const data = await response.json()
      if (data.success) {
        setStats(data.data)
      }
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const statsCards = [
    {
      title: 'Total Konten',
      value: stats?.totalContents || 0,
      icon: DocumentTextIcon,
      color: 'green',
      change: '+12%',
      trend: 'up'
    },
    {
      title: 'Kategori',
      value: stats?.totalCategories || 0,
      icon: FolderIcon,
      color: 'blue',
      change: '+5%',
      trend: 'up'
    },
    {
      title: 'Pesan',
      value: stats?.totalMessages || 0,
      icon: EnvelopeIcon,
      color: 'orange',
      change: '+8%',
      trend: 'up',
      badge: stats?.unreadMessages || 0
    },
    {
      title: 'Total Views',
      value: stats?.totalViews || 0,
      icon: EyeIcon,
      color: 'purple',
      change: '+25%',
      trend: 'up'
    }
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-8rem)]">
        <div className="w-12 h-12 border-4 border-green-500/30 border-t-green-500 rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-gray-400 mt-1">Selamat datang di panel admin DAKAURI</p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statsCards.map((card, index) => (
          <div
            key={index}
            className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6 hover:border-green-500/30 transition-colors"
          >
            <div className="flex items-start justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${card.color}-500/10`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              {card.badge !== undefined && card.badge > 0 && (
                <span className="px-2 py-1 bg-red-500/20 text-red-400 text-xs font-medium rounded-full">
                  {card.badge} baru
                </span>
              )}
            </div>
            <p className="text-gray-400 text-sm mb-1">{card.title}</p>
            <div className="flex items-end justify-between">
              <p className="text-3xl font-bold text-white">{card.value.toLocaleString()}</p>
              <div className={`flex items-center gap-1 text-sm ${
                card.trend === 'up' ? 'text-green-400' : 'text-red-400'
              }`}>
                {card.trend === 'up' ? (
                  <ArrowTrendingUpIcon className="w-4 h-4" />
                ) : (
                  <ArrowTrendingDownIcon className="w-4 h-4" />
                )}
                <span>{card.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Contents */}
        <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Konten Terbaru</h2>
          <div className="space-y-3">
            {stats?.recentContents && stats.recentContents.length > 0 ? (
              stats.recentContents.map((content) => (
                <div
                  key={content.id}
                  className="flex items-center justify-between p-3 bg-[#0f0f0f] rounded-xl hover:bg-[#151515] transition-colors"
                >
                  <div>
                    <p className="text-white font-medium text-sm">{content.title}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(content.createdAt).toLocaleDateString('id-ID')}
                    </p>
                  </div>
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    content.status === 'published'
                      ? 'bg-green-500/20 text-green-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {content.status === 'published' ? 'Publik' : 'Draft'}
                  </span>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">Belum ada konten</p>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-[#1a1a1a] rounded-2xl border border-[#2a2a2a] p-6">
          <h2 className="text-lg font-semibold text-white mb-4">Aksi Cepat</h2>
          <div className="grid grid-cols-2 gap-3">
            <a
              href="/admin/contents/new"
              className="flex flex-col items-center gap-2 p-4 bg-[#0f0f0f] rounded-xl hover:bg-green-500/10 hover:border-green-500/30 border border-transparent transition-colors"
            >
              <DocumentTextIcon className="w-8 h-8 text-green-400" />
              <span className="text-sm text-gray-300">Tambah Konten</span>
            </a>
            <a
              href="/admin/categories/new"
              className="flex flex-col items-center gap-2 p-4 bg-[#0f0f0f] rounded-xl hover:bg-blue-500/10 hover:border-blue-500/30 border border-transparent transition-colors"
            >
              <FolderIcon className="w-8 h-8 text-blue-400" />
              <span className="text-sm text-gray-300">Tambah Kategori</span>
            </a>
            <a
              href="/admin/messages"
              className="flex flex-col items-center gap-2 p-4 bg-[#0f0f0f] rounded-xl hover:bg-orange-500/10 hover:border-orange-500/30 border border-transparent transition-colors"
            >
              <EnvelopeIcon className="w-8 h-8 text-orange-400" />
              <span className="text-sm text-gray-300">Lihat Pesan</span>
            </a>
            <a
              href="/admin/statistics"
              className="flex flex-col items-center gap-2 p-4 bg-[#0f0f0f] rounded-xl hover:bg-purple-500/10 hover:border-purple-500/30 border border-transparent transition-colors"
            >
              <EyeIcon className="w-8 h-8 text-purple-400" />
              <span className="text-sm text-gray-300">Lihat Statistik</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
