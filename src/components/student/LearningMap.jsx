import { Lightbulb, Star } from 'lucide-react'
import StageNode from './StageNode.jsx'

const positions = [{ x: 268, y: 50 }, { x: 108, y: 180 }, { x: 268, y: 300 }, { x: 108, y: 420 }, { x: 200, y: 534 }]
const road = 'M 268 50 C 268 115, 108 115, 108 180 C 108 237, 268 237, 268 300 C 268 360, 108 360, 108 420 C 108 476, 200 476, 200 534'

export default function LearningMap({ stages, onStageClick }) {
  return (
    <section aria-label="خريطة الرحلة التعليمية" className="px-5 pt-10 pb-6">
      <div className="relative mx-auto aspect-[2/3] w-full max-w-[400px] rounded-[26px] border border-[#CAF0F8] bg-gradient-to-b from-[#EFFAFF] to-[#FAFBFC]">
        <svg viewBox="0 0 400 600" preserveAspectRatio="xMidYMid meet" className="absolute inset-0 h-full w-full" aria-hidden="true">
          <path d={road} fill="none" stroke="#CCD7E3" strokeWidth="14" strokeLinecap="round" />
          <path d={road} fill="none" stroke="#F5F8FC" strokeWidth="7" strokeLinecap="round" />
          <path d={road} fill="none" stroke="#CCD7E3" strokeWidth="3" strokeDasharray="13 9" strokeLinecap="round" />
        </svg>
        <Star aria-hidden="true" className="absolute top-[3.5%] left-[5%] size-5 text-[#FBB02D]/30" strokeWidth={1.3} />
        <Star aria-hidden="true" className="absolute top-[40%] right-[4%] size-4 text-[#FBB02D]/25" strokeWidth={1.3} />
        <Lightbulb aria-hidden="true" className="absolute bottom-[6%] left-[8%] size-5 text-[#A9C7E8]/60" strokeWidth={1.4} />
        {stages.map((stage, index) => <StageNode key={stage.id} stage={stage} position={positions[index]} onStageClick={onStageClick} />)}
      </div>
      <p className="mt-5 text-center text-xs text-[#8991A4]">انقر على المرحلة للبدء</p>
    </section>
  )
}
