import CTASection from '../components/CTASection.jsx'
import FeaturesSection from '../components/FeaturesSection.jsx'
import Footer from '../components/Footer.jsx'
import TestimonialsSection from '../components/TestimonialsSection.jsx'

export default function HomePage() {
  return (
    <>
      <main>
        <FeaturesSection />
        <TestimonialsSection />
        <CTASection />
      </main>
      <Footer />
    </>
  )
}
