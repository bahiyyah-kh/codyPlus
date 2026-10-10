import { useEffect, useRef, useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Outlet } from 'react-router-dom'
import logo from '../../assets/Codypluslogo.png'
import StudentSidebar from './StudentSidebar.jsx'
import { StudentAvatar } from './StudentSummary.jsx'
import { calculateJourney, demoStages, demoStudent } from '../../data/studentJourney.js'

export default function StudentLayout() {
  const [drawerOpen, setDrawerOpen] = useState(false)
  const dialogRef = useRef(null)
  const menuRef = useRef(null)
  const [stages, setStages] = useState(() => demoStages)
  const journey = calculateJourney(stages)

  function completeFirstLesson() {
    setStages(previous => {
      const stage = calculateJourney(previous).stages.find(item => item.id === 1)
      const lesson = stage?.activities.find(activity => activity.type === 'lesson')
      if (!stage?.unlocked || !lesson?.available || lesson.completed) return previous

      return previous.map(item => item.id !== 1 ? item : {
        ...item,
        activities: item.activities.map(activity => activity.type !== 'lesson' ? activity : {
          ...activity,
          completed: true,
          earnedXp: activity.rewardXp,
        }),
      })
    })
  }

  useEffect(() => {
    if (!drawerOpen) return
    const dialog = dialogRef.current
    const menuButton = menuRef.current
    const previousOverflow = document.body.style.overflow
    dialog.showModal()
    document.body.style.overflow = 'hidden'
    const desktop = window.matchMedia('(min-width: 1024px)')
    const closeOnDesktop = () => { if (desktop.matches) setDrawerOpen(false) }
    desktop.addEventListener('change', closeOnDesktop)
    return () => {
      desktop.removeEventListener('change', closeOnDesktop)
      dialog.close()
      document.body.style.overflow = previousOverflow
      if (!desktop.matches) menuButton?.focus()
    }
  }, [drawerOpen])

  return (
    <div lang="ar" dir="rtl" className="min-h-svh bg-[#FAFBFC] font-sans text-[#03045E]">
      <aside aria-label="القائمة الجانبية" className="fixed inset-y-0 right-0 z-30 hidden w-64 border-l border-[#E5E7EB] lg:block">
        <StudentSidebar student={demoStudent} xp={journey.xp} />
      </aside>
      <div className="fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between border-b border-[#E5E7EB] bg-white px-4 lg:hidden">
        <button ref={menuRef} type="button" aria-label="فتح القائمة" aria-expanded={drawerOpen} aria-controls="student-drawer" aria-haspopup="dialog" onClick={() => setDrawerOpen(true)} className="rounded-lg p-2 focus-visible:outline-2 focus-visible:outline-[#023E8A]"><Menu aria-hidden="true" /></button>
        <img src={logo} alt="Cody+" className="h-auto w-24" />
        <StudentAvatar />
      </div>
      <dialog ref={dialogRef} id="student-drawer" aria-label="قائمة الطالب" onCancel={() => setDrawerOpen(false)} onClick={event => { if (event.target === event.currentTarget) setDrawerOpen(false) }} className="fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none border-0 bg-transparent p-0 text-[#03045E] backdrop:bg-[#03045E]/35">
        <div className="absolute inset-y-0 right-0 w-72 max-w-[85vw] shadow-xl">
          <button type="button" autoFocus aria-label="إغلاق القائمة" onClick={() => setDrawerOpen(false)} className="absolute top-5 left-3 rounded-lg p-2 focus-visible:outline-2 focus-visible:outline-[#023E8A]"><X size={20} aria-hidden="true" /></button>
          <StudentSidebar student={demoStudent} xp={journey.xp} onNavigate={() => setDrawerOpen(false)} />
        </div>
      </dialog>
      <main className="min-w-0 pt-16 lg:mr-64 lg:pt-0"><Outlet context={{ student: demoStudent, journey, completeFirstLesson }} /></main>
    </div>
  )
}
