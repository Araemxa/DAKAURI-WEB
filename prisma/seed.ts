import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create default admin account
  const hashedPassword = await bcrypt.hash('admin123', 10)
  
  const admin = await prisma.adminAccount.upsert({
    where: { username: 'admin' },
    update: {},
    create: {
      username: 'admin',
      email: 'admin@dakauri.org',
      password: hashedPassword,
      fullName: 'Administrator',
      role: 'super_admin'
    }
  })

  console.log('✅ Created admin account:', admin.username)

  // Create default categories
  const categories = [
    { name: 'Berita', slug: 'berita', description: 'Berita dan informasi terbaru' },
    { name: 'Kegiatan', slug: 'kegiatan', description: 'Dokumentasi kegiatan organisasi' },
    { name: 'Pengumuman', slug: 'pengumuman', description: 'Pengumuman resmi' },
    { name: 'Artikel', slug: 'artikel', description: 'Artikel dan opini' }
  ]

  for (const category of categories) {
    await prisma.category.upsert({
      where: { slug: category.slug },
      update: {},
      create: category
    })
  }

  console.log('✅ Created', categories.length, 'categories')

  // Create site settings
  const settings = [
    { settingKey: 'site_name', settingValue: 'DAKAURI' },
    { settingKey: 'site_tagline', settingValue: 'Bersatu Siap Membangun' },
    { settingKey: 'contact_email', settingValue: 'info@dakauri.org' },
    { settingKey: 'contact_phone', settingValue: '+62 123 456 7890' },
    { settingKey: 'contact_address', settingValue: 'Indonesia' }
  ]

  for (const setting of settings) {
    await prisma.siteSetting.upsert({
      where: { settingKey: setting.settingKey },
      update: { settingValue: setting.settingValue },
      create: setting
    })
  }

  console.log('✅ Created site settings')

  // Create sample content
  const beritaCategory = await prisma.category.findUnique({
    where: { slug: 'berita' }
  })

  if (beritaCategory) {
    await prisma.content.create({
      data: {
        title: 'Selamat Datang di Website DAKAURI',
        slug: 'selamat-datang-di-website-dakauri',
        excerpt: 'Website resmi DAKAURI kini hadir dengan tampilan baru yang lebih modern dan informatif.',
        content: '<p>Selamat datang di website resmi DAKAURI. Website ini dibangun untuk memberikan informasi terkini seputar kegiatan dan program-program organisasi.</p><p>Kami berkomitmen untuk selalu memberikan layanan terbaik kepada seluruh anggota dan masyarakat.</p>',
        categoryId: beritaCategory.id,
        authorId: admin.id,
        status: 'published',
        isFeatured: true
      }
    })

    console.log('✅ Created sample content')
  }

  console.log('🎉 Database seeding completed!')
}

main()
  .catch((e) => {
    console.error('❌ Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
