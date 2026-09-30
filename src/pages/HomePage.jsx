import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import LearningPath from '../components/LearningPath.jsx'
import CTASection from '../components/CTASection.jsx'
import FeaturesSection from '../components/FeaturesSection.jsx'
import TestimonialsSection from '../components/TestimonialsSection.jsx'

function HomePage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <LearningPath />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection />
    </main>
  )
}

export default HomePage
