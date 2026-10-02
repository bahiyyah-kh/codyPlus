import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Navbar.jsx'
import Hero from '../components/Hero.jsx'
import LearningPath from '../components/LearningPath.jsx'
import CTASection from '../components/CTASection.jsx'
import FeaturesSection from '../components/FeaturesSection.jsx'
import TestimonialsSection from '../components/TestimonialsSection.jsx'
import Footer from '../components/Footer.jsx'

function HomePage({ onLogin }) {
  const navigate = useNavigate()

  function handleRegister() {
    navigate('/register')
  }

  return (
    <main>
      <Navbar onLogin={onLogin} onRegister={handleRegister} />
      <Hero onStartJourney={handleRegister} />
      <LearningPath onStartLearning={handleRegister} />
      <FeaturesSection />
      <TestimonialsSection />
      <CTASection onLogin={onLogin} onRegister={handleRegister} />
      <Footer />
    </main>
  )
}

export default HomePage