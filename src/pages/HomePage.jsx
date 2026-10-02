import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import LearningPath from '../components/LearningPath.jsx'
import CTASection from '../components/CTASection.jsx'
import FeaturesSection from '../components/FeaturesSection.jsx'
import TestimonialsSection from '../components/TestimonialsSection.jsx'
import Footer from'../components/Footer.jsx'

function HomePage({ onLogin }) {
  return (
    <main>
      <Navbar onLogin={onLogin} />
      <Hero />
      <LearningPath />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection onLogin={onLogin}  />
      <Footer />
    </main>
  )
}

export default HomePage
