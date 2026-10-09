import { useOutletContext } from 'react-router-dom'
import LearningProgress from '../../components/student/LearningProgress.jsx'
import LearningMap from '../../components/student/LearningMap.jsx'

export default function StudentHomePage() {
  const { student, journey } = useOutletContext()
  return <><LearningProgress student={student} journey={journey} /><LearningMap stages={journey.stages} /></>
}
