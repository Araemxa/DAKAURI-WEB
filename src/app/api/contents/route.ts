import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET - Fetch all contents or with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '10')
    const category = searchParams.get('category')
    const status = searchParams.get('status')
    const featured = searchParams.get('featured')
    const search = searchParams.get('search')

    const skip = (page - 1) * limit

    const where: {
      categoryId?: number
      status?: string
      featured?: boolean
      OR?: { title?: { contains: string; mode: 'insensitive' }; description?: { contains: string; mode: 'insensitive' } }[]
    } = {}

    if (category) where.categoryId = parseInt(category)
    if (status) where.status = status
    if (featured === 'true') where.featured = true
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ]
    }

    const [contents, total] = await Promise.all([
      prisma.content.findMany({
        where,
        include: {
          category: true,
          author: {
            select: {
              id: true,
              fullName: true,
              username: true
            }
          }
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit
      }),
      prisma.content.count({ where })
    ])

    return NextResponse.json({
      success: true,
      data: contents,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit)
      }
    })
  } catch (error) {
    console.error('Error fetching contents:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch contents' },
      { status: 500 }
    )
  }
}

// POST - Create new content
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title, description, content, thumbnail, contentType, categoryId, authorId, status, featured } = body

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    // Check if slug exists
    const existingContent = await prisma.content.findUnique({ where: { slug } })
    const finalSlug = existingContent ? `${slug}-${Date.now()}` : slug

    const newContent = await prisma.content.create({
      data: {
        title,
        slug: finalSlug,
        description,
        content,
        thumbnail,
        contentType: contentType || 'article',
        categoryId: categoryId ? parseInt(categoryId) : null,
        authorId: authorId ? parseInt(authorId) : null,
        status: status || 'draft',
        featured: featured || false,
        publishedAt: status === 'published' ? new Date() : null
      },
      include: {
        category: true,
        author: {
          select: {
            id: true,
            fullName: true,
            username: true
          }
        }
      }
    })

    return NextResponse.json({
      success: true,
      data: newContent
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating content:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create content' },
      { status: 500 }
    )
  }
}
