export default function ProgressBar({ value, label }) {
  const percent = Math.min(100, Math.max(0, value))
  return (
    <div role="progressbar" aria-label={label} aria-valuemin={0} aria-valuemax={100} aria-valuenow={percent} className="h-2 overflow-hidden rounded-full bg-[#E5E7EB]">
      <div className="h-full rounded-full bg-[#023E8A]" style={{ width: `${percent}%` }} />
    </div>
  )
}
