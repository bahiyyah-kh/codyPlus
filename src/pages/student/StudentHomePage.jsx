import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import LearningProgress from '../../components/student/LearningProgress.jsx'
import LearningMap from '../../components/student/LearningMap.jsx'
import StageDetailsModal from '../../components/student/StageDetailsModal.jsx'

export default function StudentHomePage() {
  const { student, journey } = useOutletContext()
  const navigate = useNavigate()
  const [selectedStageId, setSelectedStageId] = useState(null)
  const selectedStage = journey.stages.find(stage => stage.id === selectedStageId && stage.unlocked)

  return (
    <>
      <LearningProgress student={student} journey={journey} />
      <LearningMap stages={journey.stages} onStageClick={stage => {
        if (stage.unlocked) setSelectedStageId(stage.id)
      }} />
      {selectedStage && <StageDetailsModal stage={selectedStage} onClose={() => setSelectedStageId(null)} onStart={selectedStage.id === 1 ? () => {
        setSelectedStageId(null)
        navigate('/student/stages/1')
      } : undefined} />}
    </>
  )
}
