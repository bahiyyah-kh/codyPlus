import { LockKeyhole } from 'lucide-react'

export default function StageNode({ stage, position, onStageClick }) {
  return (
    <div className="absolute w-[19%] -translate-x-1/2 -translate-y-1/2" style={{ left: `${position.x / 4}%`, top: `${position.y / 6}%` }}>
      {stage.unlocked && stage.completedCount < 5 && (
        <span aria-hidden="true" className="pointer-events-none absolute inset-0 rounded-full bg-[#CAF0F8]/60 motion-safe:animate-ping motion-safe:[animation-duration:2s]" />
      )}
      <button type="button" disabled={!stage.unlocked} onClick={() => { if (stage.unlocked) onStageClick?.(stage) }} aria-label={`${stage.title}، ${stage.unlocked ? `${stage.completedCount} من 5 أنشطة مكتملة` : 'مقفلة'}`} 
      className={`relative flex aspect-square w-full items-center justify-center rounded-full focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-[#023E8A] ${stage.unlocked ? 'cursor-pointer border-[3px] border-white bg-[#023E8A] ring-[4px] ring-[#FBB02D] shadow-[0_0_0_20px_#dceaf4] motion-safe:transition-[scale,box-shadow] motion-safe:duration-200 motion-safe:ease-out motion-safe:hover:scale-[1.08] motion-safe:focus-visible:scale-[1.08] hover:shadow-[0_0_0_20px_#dceaf4,0_8px_16px_#023e8a26] focus-visible:shadow-[0_0_0_20px_#dceaf4,0_8px_16px_#023e8a26]' : 'cursor-not-allowed bg-[#E2E8F0] text-[#8CA2BF] shadow-[0_5px_9px_#03045e20]'}`}>
        {stage.unlocked ? <span aria-hidden="true" className="text-[clamp(25px,8vw,32px)]">🚀</span> : <LockKeyhole className="h-[36%] w-[36%]" strokeWidth={1.8} aria-hidden="true" />}
      </button>
      <div className={`absolute top-full left-1/2 mt-2 -translate-x-1/2 text-center ${stage.unlocked ? 'w-full' : 'w-[160%]'}`}>
        <p className={`text-[clamp(11px,3.2vw,13px)] leading-[1.15] ${stage.unlocked ? 'font-extrabold text-[#03045E]' : 'font-medium text-[#8CA2BF]'}`}>{stage.title}</p>
        {stage.unlocked && <p dir="ltr" className="mt-1 text-[11px] leading-none text-[#7C8599]">{stage.completedCount}/5</p>}
      </div>
    </div>
  )
}
