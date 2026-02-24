import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import ContentSection from '@/components/ContentSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <ContentSection />
      </main>
      <Footer />
    </>
  )
}
