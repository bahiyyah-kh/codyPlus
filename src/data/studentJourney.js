const activityTypes = ['lesson', 'puzzle', 'game', 'challenge', 'quiz']

export const demoStudent = { name: 'شهد', levelXp: 500 }

export const demoStages = [
  'المقدمة والتعليمات',
  'المتغيرات',
  'الشروط',
  'الحلقات التكرارية',
  'المصفوفات',
].map((title, index) => ({
  id: index + 1,
  title,
  activities: activityTypes.map(type => ({ type, completed: false, earnedXp: 0 })),
}))

// Supply updated activity data here when activity pages are implemented.
export function calculateJourney(stages) {
  let previousStagesComplete = true
  const journeyStages = stages.map(stage => {
    const completedCount = stage.activities.filter(activity => activity.completed).length
    const complete = stage.activities.length === 5 && completedCount === 5
    const unlocked = previousStagesComplete
    previousStagesComplete = previousStagesComplete && complete
    return { ...stage, completedCount, complete, unlocked }
  })
  const activities = stages.flatMap(stage => stage.activities)
  const completedCount = activities.filter(activity => activity.completed).length
  return {
    stages: journeyStages,
    completedCount,
    totalCount: activities.length,
    percent: activities.length ? Math.round(completedCount / activities.length * 100) : 0,
    xp: activities.reduce((total, activity) => total + (activity.completed ? activity.earnedXp ?? 0 : 0), 0),
  }
}
