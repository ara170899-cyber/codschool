export const commonMistakes: Record<string, { wrong: string; right: string; explanation: string }[]> = {
  hello: [
    {
      wrong: "print(Hello, World!)",
      right: 'print("Hello, World!")',
      explanation: "Текст нужно оборачивать в кавычки — иначе Python думает, что это переменные",
    },
    {
      wrong: 'Print("Hello")',
      right: 'print("Hello")',
      explanation: "Python чувствителен к регистру: Print и print — разные вещи",
    },
    {
      wrong: 'print "Hello"',
      right: 'print("Hello")',
      explanation: "В Python 3 print — функция, нужны круглые скобки",
    },
  ],
  input: [
    {
      wrong: "name = input\nprint(name)",
      right: "name = input()\nprint(name)",
      explanation: "input без скобок — это ссылка на функцию, а не её вызов. Нужно input()",
    },
    {
      wrong: 'print("Привет, name!")',
      right: 'print(f"Привет, {name}!")',
      explanation: "Без буквы f перед кавычками {name} выведется как текст, а не значение переменной",
    },
    {
      wrong: 'print(f"Привет, name!")',
      right: 'print(f"Привет, {name}!")',
      explanation: "Переменную внутри f-строки нужно оборачивать в фигурные скобки {name}",
    },
  ],
  variables: [
    {
      wrong: '10 = x',
      right: 'x = 10',
      explanation: "Переменная всегда слева от =, значение — справа",
    },
    {
      wrong: 'x = "5"\ny = x + 3',
      right: 'x = "5"\ny = int(x) + 3',
      explanation: "Нельзя складывать строку и число. Сначала преобразуйте строку в число через int()",
    },
    {
      wrong: "my variable = 10",
      right: "my_variable = 10",
      explanation: "Имя переменной не может содержать пробелы. Используйте подчёркивание _",
    },
    {
      wrong: "age = input()\nprint(age + 1)",
      right: "age = int(input())\nprint(age + 1)",
      explanation: "input() всегда возвращает строку. Для математики нужно преобразовать в int()",
    },
  ],
  strings: [
    {
      wrong: '"Привет" + 5',
      right: '"Привет" + str(5)',
      explanation: "Нельзя склеивать строку и число. Преобразуйте число в строку через str()",
    },
    {
      wrong: 'name = "Аня"\nprint(f"Привет, {Name}!")',
      right: 'name = "Аня"\nprint(f"Привет, {name}!")',
      explanation: "Имя переменной должно совпадать точно: name и Name — разные переменные",
    },
    {
      wrong: '"Он сказал "привет""',
      right: "'Он сказал \"привет\"'",
      explanation: "Кавычки внутри кавычек нужно экранировать или использовать разные виды кавычек",
    },
  ],
  ifelse: [
    {
      wrong: "if x = 5:",
      right: "if x == 5:",
      explanation: "= это присваивание, == это сравнение. В условии нужно ==",
    },
    {
      wrong: "if x > 0\n  print(x)",
      right: "if x > 0:\n  print(x)",
      explanation: "После условия if обязательно двоеточие :",
    },
    {
      wrong: "if x > 0:\nprint(x)",
      right: "if x > 0:\n    print(x)",
      explanation: "Тело условия должно быть с отступом (4 пробела или Tab)",
    },
    {
      wrong: 'if x == "да" or "нет":',
      right: 'if x == "да" or x == "нет":',
      explanation: "Нужно писать полное сравнение после or. Строка \"нет\" сама по себе — всегда True",
    },
  ],
  logic: [
    {
      wrong: "if x > 0 && x < 10:",
      right: "if x > 0 and x < 10:",
      explanation: "В Python используется and, а не && (как в других языках)",
    },
    {
      wrong: "if !flag:",
      right: "if not flag:",
      explanation: "В Python используется not, а не ! для отрицания",
    },
    {
      wrong: "if x > 0 and < 10:",
      right: "if x > 0 and x < 10:",
      explanation: "После and нужно полное выражение с переменной: x < 10, а не просто < 10",
    },
  ],
  while: [
    {
      wrong: "while True\n  print(1)",
      right: "while True:\n  print(1)",
      explanation: "После while обязательно двоеточие :",
    },
    {
      wrong: "x = 10\nwhile x > 0:\n  print(x)",
      right: "x = 10\nwhile x > 0:\n  print(x)\n  x -= 1",
      explanation: "Если не изменять переменную в цикле — получится бесконечный цикл",
    },
    {
      wrong: "x = 0\nwhile x < 5:\n  x += 1\nprint(x)",
      right: "x = 0\nwhile x < 5:\n  print(x)\n  x += 1",
      explanation: "Порядок важен: если сначала увеличить x, а потом вывести — первое значение потеряется",
    },
  ],
  forloop: [
    {
      wrong: "for i in 10:",
      right: "for i in range(10):",
      explanation: "Нельзя итерировать по числу. Используйте range(10) для диапазона 0-9",
    },
    {
      wrong: "for i in range(1, 10, 0):",
      right: "for i in range(1, 10, 1):",
      explanation: "Шаг в range() не может быть 0 — будет ошибка",
    },
    {
      wrong: "for i in range(10):\nprint(i)",
      right: "for i in range(10):\n    print(i)",
      explanation: "Тело цикла должно быть с отступом",
    },
    {
      wrong: "for in range(5):",
      right: "for i in range(5):",
      explanation: "Нужна переменная цикла между for и in",
    },
  ],
  lists: [
    {
      wrong: "lst = [1, 2, 3]\nprint(lst[3])",
      right: "lst = [1, 2, 3]\nprint(lst[2])",
      explanation: "Индексация с 0: в списке из 3 элементов последний индекс — 2, не 3",
    },
    {
      wrong: "lst = [1, 2, 3]\nlst.append(4, 5)",
      right: "lst = [1, 2, 3]\nlst.append(4)\nlst.append(5)",
      explanation: "append() принимает только один аргумент. Для нескольких используйте extend([4, 5])",
    },
    {
      wrong: "lst = [3, 1, 2]\nnew = lst.sort()",
      right: "lst = [3, 1, 2]\nlst.sort()  # изменяет lst",
      explanation: "sort() изменяет список и возвращает None. Используйте sorted(lst) для нового списка",
    },
    {
      wrong: "for i in lst:\n  lst.remove(i)",
      right: "for i in lst.copy():\n  lst.remove(i)",
      explanation: "Нельзя изменять список во время итерации по нему. Итерируйте по копии",
    },
  ],
  functions: [
    {
      wrong: "def greet(name)\n  print(name)",
      right: "def greet(name):\n  print(name)",
      explanation: "После параметров функции обязательно двоеточие :",
    },
    {
      wrong: "def add(a, b):\n  a + b",
      right: "def add(a, b):\n  return a + b",
      explanation: "Без return функция не вернёт результат (вернёт None)",
    },
    {
      wrong: "def greet():\n  return \"Привет\"\n  print(\"Готово\")",
      right: "def greet():\n  print(\"Готово\")\n  return \"Привет\"",
      explanation: "Код после return никогда не выполнится — return завершает функцию",
    },
    {
      wrong: "result = greet\nprint(result)",
      right: "result = greet()\nprint(result)",
      explanation: "Без скобок вы получаете ссылку на функцию, а не её результат",
    },
  ],
  class_intro: [
    {
      wrong: "class Dog:\n  def __init__(name):",
      right: "class Dog:\n  def __init__(self, name):",
      explanation: "Первый параметр метода всегда self — ссылка на текущий объект",
    },
    {
      wrong: "class Dog:\n  def __init__(self, name):\n    name = name",
      right: "class Dog:\n  def __init__(self, name):\n    self.name = name",
      explanation: "Без self. вы создаёте локальную переменную, а не атрибут объекта",
    },
    {
      wrong: "d = Dog.__init__(\"Рекс\")",
      right: 'd = Dog("Рекс")',
      explanation: "Не вызывайте __init__ напрямую. Создавайте объект через имя класса",
    },
    {
      wrong: "class Dog:\n  def bark():\n    print(\"Гав!\")",
      right: "class Dog:\n  def bark(self):\n    print(\"Гав!\")",
      explanation: "Методы экземпляра обязательно принимают self первым параметром",
    },
  ],
  inheritance_basic: [
    {
      wrong: "class Cat(Animal):\n  def __init__(self, name):\n    self.name = name",
      right: "class Cat(Animal):\n  def __init__(self, name):\n    super().__init__(name)",
      explanation: "Вызывайте super().__init__() чтобы инициализировать родительский класс",
    },
    {
      wrong: "class Cat extends Animal:",
      right: "class Cat(Animal):",
      explanation: "В Python наследование указывается в скобках, а не через extends",
    },
    {
      wrong: "class Cat(Animal):\n  def speak(self):\n    super.speak()",
      right: "class Cat(Animal):\n  def speak(self):\n    super().speak()",
      explanation: "super — это функция, нужны скобки: super().speak()",
    },
  ],
};
