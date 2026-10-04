import { useNavigate } from 'react-router-dom'
import mascotSrc from '../../assets/welcomRopot/welcompageR1.png';

export default function CodyWelcomePage() {
  const navigate = useNavigate()
  return (
    <main
      lang="ar"
      dir="rtl"
      className="flex min-h-svh items-center justify-center bg-[radial-gradient(ellipse_at_top_right,#bcecf4_0%,transparent_60%),radial-gradient(ellipse_at_bottom_left,#fff2dc_0%,transparent_30%)] bg-[#fafbfc] px-6 py-10 font-sans text-[#03045E]"
    >
      <div dir="ltr" className="grid w-full max-w-[1170px] grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,480fr)_minmax(0,560fr)] md:gap-[clamp(40px,8.8vw,130px)]">
        <img
          src={mascotSrc}
          alt="كودي"
          className="w-[min(70vw,280px)] justify-self-center object-contain drop-shadow-[0_28px_25px_rgba(3,4,40,0.16)] md:w-full md:max-w-[400px] md:justify-self-end"
        />

        <div dir="rtl" className="flex min-w-0 flex-col items-center gap-8 md:translate-y-5 md:gap-[45px]">
          <div className="relative flex min-h-[122px] w-full items-center justify-center rounded-[30px] border border-[#caf0f8] bg-white px-5 py-6 shadow-[0_16px_40px_rgba(3,4,94,0.12)]">
            <span aria-hidden="true" className="absolute top-1/2 -left-[15px] size-7 -translate-y-1/2 rotate-45 border-b border-l border-[#caf0f8] bg-white" />
            <h1 className="relative text-center text-[clamp(28px,3vw,40px)] leading-tight font-extrabold">
              مرحباً، أنا كودي!
            </h1>
          </div>

          <button type="button" onClick={() => navigate('/onboarding')} className="h-[70px] w-[220px] max-w-full cursor-pointer rounded-[30px] bg-[#023E8A] px-6 text-2xl font-bold text-white shadow-[0_8px_22px_rgba(3,4,94,0.1)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#023E8A]">
            متابعة
          </button>
        </div>
      </div>
    </main>
  )
}
