const activityDefinitions = [
  { type: "lesson", label: "الدرس" },
  { type: "puzzle", label: "سحب وإفلات" },
  { type: "game", label: "اللعبة" },
  { type: "challenge", label: "التحدي" },
  { type: "quiz", label: "الاختبار" },
];

export const demoStudent = { name: "شهد", levelXp: 500 };

export const demoStages = [
  {
    title: "المقدمة والتعليمات",
    icon: "🚀",
    description: "تعرّف على البرمجة واكتب أول تعليماتك بلغة C++ ",
    subtitle: "أساسيات البرمجة والتعليمات التسلسلية",
    objectives: [
      "فهم مفهوم البرمجة والتعليمات التسلسلية",
      "كتابة برنامج C++ بسيط",
      "استخدام دالة cout لطباعة النصوص",
      "فهم بنية البرنامج الأساسية",
    ],
  },
  {
    title: "المتغيرات",
    icon: "📦",
    description: "تعرّف على المتغيرات وكيفية تخزين البيانات واستخدامها",
  },
  {
    title: "الشروط",
    icon: "🔀",
    description: "اتخاذ القرارات في البرامج باستخدام التعليمات الشرطية",
  },
  {
    title: "الحلقات التكرارية",
    icon: "🔁",
    description: "تعلّم تكرار التعليمات باستخدام الحلقات التكرارية",
  },
  {
    title: "المصفوفات",
    icon: "🗂️",
    description: "تنظيم مجموعات البيانات والوصول إلى عناصر المصفوفات",
  },
].map((stage, index) => ({
  id: index + 1,
  ...stage,
  activities: activityDefinitions.map((activity) => ({
    ...activity,
    completed: false,
    earnedXp: 0,
    ...(index === 0
      ? {
          lesson: {
            title: "الدرس التعليمي",
            description: "شاهد شرحًا تفصيليًا مع أمثلة C++ واقعية",
            rewardXp: 10,
          },
          puzzle: {
            title: "سحب وإفلات",
            description: "رتّب كتل الكود في الترتيب الصحيح",
            rewardXp: 15,
          },
          game: {
            title: "اللعبة التعليمية",
            description: "العب وتعلّم منطق البرمجة بطريقة ممتعة",
            rewardXp: 20,
          },
          challenge: {
            title: "تحدي البرمجة",
            description: "اكتب كود C++ لحل مشكلة حقيقية",
            rewardXp: 25,
          },
          quiz: {
            title: "الاختبار",
            description: "اختبر فهمك للمرحلة بأسئلة تقييمية",
            rewardXp: 30,
          },
        }[activity.type]
      : {}),
  })),
}));

// Supply updated activity data here when activity pages are implemented.
export function calculateJourney(stages) {
  let previousStagesComplete = true;
  const journeyStages = stages.map((stage) => {
    const completedCount = stage.activities.filter(
      (activity) => activity.completed,
    ).length;
    const complete = stage.activities.length === 5 && completedCount === 5;
    const unlocked = previousStagesComplete;
    previousStagesComplete = previousStagesComplete && complete;
    let previousActivitiesComplete = unlocked;
    const activities = stage.activities.map((activity) => {
      const available = previousActivitiesComplete;
      previousActivitiesComplete =
        previousActivitiesComplete && activity.completed;
      return { ...activity, available };
    });
    return { ...stage, activities, completedCount, complete, unlocked };
  });
  const activities = stages.flatMap((stage) => stage.activities);
  const completedCount = activities.filter(
    (activity) => activity.completed,
  ).length;
  return {
    stages: journeyStages,
    completedCount,
    totalCount: activities.length,
    percent: activities.length
      ? Math.round((completedCount / activities.length) * 100)
      : 0,
    xp: activities.reduce(
      (total, activity) =>
        total + (activity.completed ? (activity.earnedXp ?? 0) : 0),
      0,
    ),
  };
}
