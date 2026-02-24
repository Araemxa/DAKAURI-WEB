import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { getServerSession } from 'next-auth'

export async function GET() {
  try {
    const session = await getServerSession()
    
    if (!session) {
      return NextResponse.json(
        { success: false, message: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Get total counts
    const [totalContents, totalCategories, totalMessages, unreadMessages, recentContents] = await Promise.all([
      prisma.content.count(),
      prisma.category.count(),
      prisma.message.count(),
      prisma.message.count({
        where: { isRead: false }
      }),
      prisma.content.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          title: true,
          status: true,
          createdAt: true
        }
      })
    ])

    // Calculate total views from all contents
    const viewsResult = await prisma.content.aggregate({
      _sum: {
        viewCount: true
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        totalContents,
        totalCategories,
        totalMessages,
        unreadMessages,
        totalViews: viewsResult._sum.viewCount || 0,
        recentContents
      }
    })
  } catch (error) {
    console.error('Error fetching statistics:', error)
    return NextResponse.json(
      { success: false, message: 'Internal server error' },
      { status: 500 }
    )
  }
}
