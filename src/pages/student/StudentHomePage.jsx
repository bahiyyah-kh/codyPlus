import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import LearningProgress from '../../components/student/LearningProgress.jsx'
import LearningMap from '../../components/student/LearningMap.jsx'
import StageDetailsModal from '../../components/student/StageDetailsModal.jsx'

export default function StudentHomePage() {
  const { student, journey } = useOutletContext()
  const [selectedStageId, setSelectedStageId] = useState(null)
  const selectedStage = journey.stages.find(stage => stage.id === selectedStageId && stage.unlocked)

  return (
    <>
      <LearningProgress student={student} journey={journey} />
      <LearningMap stages={journey.stages} onStageClick={stage => {
        if (stage.unlocked) setSelectedStageId(stage.id)
      }} />
      {selectedStage && <StageDetailsModal stage={selectedStage} onClose={() => setSelectedStageId(null)} />}
    </>
  )
}
