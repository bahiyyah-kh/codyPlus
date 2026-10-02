export default function StepDots({ current }) {
  return <div className="mt-7 flex justify-center gap-2" aria-label={`الخطوة ${current} من 4`}>
    {[1, 2, 3, 4].map(step => <span key={step} aria-hidden="true" className={`h-2 rounded-full ${step === current ? 'w-7 bg-[#023E8A]' : step < current ? 'w-2 bg-[#00B4D8]' : 'w-2 bg-[#D1D5DB]'}`} />)}
  </div>
}
