import { LessonProgress } from "@/types";

export interface BadgeDefinition {
  type: string;
  name: string;
  icon: string;
  condition: (completed: string[]) => boolean;
}

export const badgeDefinitions: BadgeDefinition[] = [
  {
    type: "first_program",
    name: "Первая программа",
    icon: "🐣",
    condition: (c) => c.includes("hello"),
  },
  {
    type: "first_exam",
    name: "Первый экзамен",
    icon: "📝",
    condition: (c) => c.includes("exam0"),
  },
  {
    type: "io_master",
    name: "Мастер I/O",
    icon: "💬",
    condition: (c) => c.includes("input"),
  },
  {
    type: "number_cruncher",
    name: "Знаток чисел",
    icon: "🔢",
    condition: (c) => c.includes("variables") && c.includes("exam1"),
  },
  {
    type: "logician",
    name: "Логик",
    icon: "🔀",
    condition: (c) => c.includes("ifelse") && c.includes("logic") && c.includes("exam2"),
  },
  {
    type: "loop_master",
    name: "Циклист",
    icon: "🔄",
    condition: (c) => c.includes("while") && c.includes("forloop") && c.includes("exam3"),
  },
  {
    type: "function_builder",
    name: "Функционер",
    icon: "⚙️",
    condition: (c) => c.includes("functions") && c.includes("exam4"),
  },
  {
    type: "string_ninja",
    name: "Ниндзя строк",
    icon: "✂️",
    condition: (c) => c.includes("slicing") && c.includes("string_reverse") && c.includes("exam5"),
  },
  {
    type: "dict_master",
    name: "Мастер словарей",
    icon: "📖",
    condition: (c) => c.includes("dict_basics") && c.includes("dict_lookup") && c.includes("exam6"),
  },
  {
    type: "pro_coder",
    name: "Продвинутый кодер",
    icon: "🔧",
    condition: (c) => c.includes("func_args") && c.includes("func_list") && c.includes("exam7"),
  },
  {
    type: "project_hero",
    name: "Герой проектов",
    icon: "🏆",
    condition: (c) => c.includes("project_counter") && c.includes("project_password"),
  },
  {
    type: "nested_master",
    name: "Мастер вложенности",
    icon: "🔲",
    condition: (c) => c.includes("nested_loops") && c.includes("exam9"),
  },
  {
    type: "set_master",
    name: "Знаток множеств",
    icon: "🎯",
    condition: (c) => c.includes("sets") && c.includes("exam10"),
  },
  {
    type: "comprehension",
    name: "Генератор",
    icon: "⚡",
    condition: (c) => c.includes("list_comp_basic") && c.includes("exam11"),
  },
  {
    type: "text_pro",
    name: "Текстовый про",
    icon: "📝",
    condition: (c) => c.includes("text_analysis") && c.includes("exam12"),
  },
  {
    type: "error_handler",
    name: "Обработчик ошибок",
    icon: "🛡️",
    condition: (c) => c.includes("try_except") && c.includes("exam13"),
  },
  {
    type: "graduate",
    name: "Выпускник",
    icon: "🎓",
    condition: (c) => c.includes("exam14"),
  },
  {
    type: "oop_beginner",
    name: "Первый класс",
    icon: "🏗️",
    condition: (c) => c.includes("class_intro") && c.includes("exam15"),
  },
  {
    type: "inheritance_hero",
    name: "Наследник",
    icon: "🧬",
    condition: (c) => c.includes("inheritance_basic") && c.includes("exam16"),
  },
  {
    type: "oop_master",
    name: "Мастер ООП",
    icon: "🎮",
    condition: (c) => c.includes("exam17") && c.includes("exam18") && c.includes("exam19"),
  },
  {
    type: "recursion_pro",
    name: "Рекурсивный мозг",
    icon: "🔁",
    condition: (c) => c.includes("recursion_intro") && c.includes("exam20"),
  },
  {
    type: "algo_pro",
    name: "Алгоритмист",
    icon: "📊",
    condition: (c) => c.includes("bubble_sort") && c.includes("binary_search"),
  },
  {
    type: "regex_pro",
    name: "Мастер regex",
    icon: "🔍",
    condition: (c) => c.includes("regex_intro") && c.includes("exam22"),
  },
  {
    type: "full_stack",
    name: "Фулл-стек",
    icon: "🌐",
    condition: (c) => c.includes("sql_select") && c.includes("http_basics") && c.includes("git_basics"),
  },
  {
    type: "graduate_final",
    name: "Выпускник",
    icon: "🎓",
    condition: (c) => c.includes("exam_final"),
  },
  {
    type: "all_complete",
    name: "Легенда",
    icon: "🏅",
    condition: (c) => c.length >= 130,
  },
];

export function getEarnedBadges(progress: LessonProgress[]): BadgeDefinition[] {
  const completed = progress
    .filter((p) => p.status === "completed")
    .map((p) => p.lessonId);

  return badgeDefinitions.filter((badge) => badge.condition(completed));
}
