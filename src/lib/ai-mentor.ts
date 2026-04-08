interface StudentProfile {
  level: "beginner" | "intermediate" | "advanced";
  strengths: string[];
  weaknesses: string[];
  recommendations: string[];
}

const LESSON_TOPICS: Record<string, string> = {
  "hello-world": "вывод данных",
  "variables": "переменные",
  "data-types": "типы данных",
  "strings": "строки",
  "numbers": "числа и арифметика",
  "input": "ввод данных",
  "conditions": "условия if/else",
  "comparison": "операторы сравнения",
  "logical": "логические операторы",
  "while-loop": "цикл while",
  "for-loop": "цикл for",
  "range": "функция range",
  "lists": "списки",
  "list-methods": "методы списков",
  "tuples": "кортежи",
  "dictionaries": "словари",
  "functions": "функции",
  "parameters": "параметры функций",
  "return": "возврат значений",
  "modules": "модули",
  "files": "работа с файлами",
  "exceptions": "обработка ошибок",
  "classes": "классы и ООП",
  "inheritance": "наследование",
};

const TOPIC_GROUPS = {
  basics: ["вывод данных", "переменные", "типы данных", "строки", "числа и арифметика", "ввод данных"],
  control: ["условия if/else", "операторы сравнения", "логические операторы"],
  loops: ["цикл while", "цикл for", "функция range"],
  data: ["списки", "методы списков", "кортежи", "словари"],
  functions: ["функции", "параметры функций", "возврат значений"],
  advanced: ["модули", "работа с файлами", "обработка ошибок", "классы и ООП", "наследование"],
};

export function getStudentProfile(completedLessons: string[]): StudentProfile {
  const completedTopics = completedLessons
    .map((l) => LESSON_TOPICS[l])
    .filter(Boolean);

  // allTopics available for future use

  // Determine level
  let level: StudentProfile["level"];
  if (completedLessons.length < 6) {
    level = "beginner";
  } else if (completedLessons.length < 18) {
    level = "intermediate";
  } else {
    level = "advanced";
  }

  // Determine strengths — completed topic groups
  const strengths: string[] = [];
  for (const [groupName, topics] of Object.entries(TOPIC_GROUPS)) {
    const completed = topics.filter((t) => completedTopics.includes(t));
    if (completed.length === topics.length) {
      strengths.push(groupLabel(groupName));
    }
  }

  // Determine weaknesses — partially completed groups or next groups
  const weaknesses: string[] = [];
  for (const [, topics] of Object.entries(TOPIC_GROUPS)) {
    const completed = topics.filter((t) => completedTopics.includes(t));
    if (completed.length > 0 && completed.length < topics.length) {
      const missing = topics.filter((t) => !completedTopics.includes(t));
      weaknesses.push(...missing);
    }
  }

  // Recommendations
  const recommendations: string[] = [];
  if (level === "beginner") {
    recommendations.push("Проходите уроки по порядку, не пропускайте базовые темы");
    recommendations.push("Практикуйтесь каждый день хотя бы 30 минут");
  }
  if (weaknesses.length > 0) {
    recommendations.push(`Уделите внимание темам: ${weaknesses.slice(0, 3).join(", ")}`);
  }
  if (level === "intermediate") {
    recommendations.push("Попробуйте решать задачи без подсказок ИИ-ассистента");
    recommendations.push("Начните делать мини-проекты для закрепления");
  }
  if (level === "advanced") {
    recommendations.push("Переходите к проектам — это лучший способ закрепить знания");
    recommendations.push("Попробуйте помогать другим ученикам в сообществе");
  }

  return { level, strengths, weaknesses, recommendations };
}

export function generatePracticeExercise(topic: string): PracticeExercise {
  const exercises = PRACTICE_EXERCISES[topic] || getDefaultExercise(topic);
  const randomIndex = Math.floor(Math.random() * exercises.length);
  return exercises[randomIndex];
}

interface PracticeExercise {
  title: string;
  description: string;
  hint: string;
  startingCode: string;
}

const PRACTICE_EXERCISES: Record<string, PracticeExercise[]> = {
  "переменные": [
    {
      title: "Обмен переменных",
      description: "Создайте две переменные a = 5 и b = 10. Поменяйте их значения местами без использования третьей переменной.",
      hint: "В Python можно использовать множественное присваивание: a, b = b, a",
      startingCode: "a = 5\nb = 10\n# Поменяйте значения местами\n\nprint(a)  # Должно быть 10\nprint(b)  # Должно быть 5",
    },
    {
      title: "Информация о себе",
      description: "Создайте переменные name, age, city и выведите строку вида: 'Меня зовут Анна, мне 25 лет, я живу в Москве'",
      hint: "Используйте f-строки: f'Меня зовут {name}'",
      startingCode: "# Создайте переменные\n\n# Выведите строку",
    },
  ],
  "условия if/else": [
    {
      title: "Чётное или нечётное",
      description: "Напишите программу, которая проверяет число и выводит 'чётное' или 'нечётное'.",
      hint: "Используйте оператор остатка от деления: number % 2",
      startingCode: "number = 7\n# Проверьте чётное или нечётное\n",
    },
    {
      title: "Оценка по баллам",
      description: "По количеству баллов (0-100) выведите оценку: 90+ = 'отлично', 70+ = 'хорошо', 50+ = 'удовлетворительно', иначе 'неудовлетворительно'.",
      hint: "Используйте if/elif/else цепочку, начиная с наибольшего значения",
      startingCode: "score = 85\n# Определите оценку\n",
    },
  ],
  "цикл for": [
    {
      title: "Сумма чисел",
      description: "С помощью цикла for посчитайте сумму чисел от 1 до 100.",
      hint: "Используйте range(1, 101) и переменную-накопитель",
      startingCode: "total = 0\n# Напишите цикл\n\nprint(total)  # Должно быть 5050",
    },
  ],
  "списки": [
    {
      title: "Фильтрация списка",
      description: "Из списка чисел [3, 7, 2, 9, 1, 5, 8, 4] создайте новый список, содержащий только числа больше 4.",
      hint: "Можно использовать цикл for с условием if или list comprehension",
      startingCode: "numbers = [3, 7, 2, 9, 1, 5, 8, 4]\n# Создайте новый список\n\nprint(filtered)  # [7, 9, 5, 8]",
    },
  ],
  "функции": [
    {
      title: "Функция приветствия",
      description: "Напишите функцию greet(name, greeting='Привет'), которая возвращает строку приветствия.",
      hint: "Используйте параметр со значением по умолчанию",
      startingCode: "# Напишите функцию greet\n\nprint(greet('Анна'))  # Привет, Анна!\nprint(greet('Пётр', 'Здравствуйте'))  # Здравствуйте, Пётр!",
    },
  ],
  "словари": [
    {
      title: "Подсчёт символов",
      description: "Напишите программу, которая считает количество каждого символа в строке и сохраняет результат в словарь.",
      hint: "Переберите строку посимвольно, используя dict.get(key, 0) + 1",
      startingCode: "text = 'привет мир'\ncounts = {}\n# Подсчитайте символы\n\nprint(counts)",
    },
  ],
};

function getDefaultExercise(topic: string): PracticeExercise[] {
  return [
    {
      title: `Практика: ${topic}`,
      description: `Напишите небольшую программу, демонстрирующую использование темы "${topic}". Придумайте свой пример.`,
      hint: "Начните с простого примера и постепенно усложняйте",
      startingCode: "# Ваш код здесь\n",
    },
  ];
}

function groupLabel(group: string): string {
  const labels: Record<string, string> = {
    basics: "Основы Python",
    control: "Управление потоком",
    loops: "Циклы",
    data: "Структуры данных",
    functions: "Функции",
    advanced: "Продвинутые темы",
  };
  return labels[group] || group;
}
