import { Lesson } from "@/types";

export const advancedLessons: Lesson[] = [
  // ==================== МОДУЛЬ 20: Рекурсия ====================
  { id: "recursion_intro", module: 20, title: "Что такое рекурсия",
    theory: `Рекурсия — когда функция вызывает сама себя. Звучит странно, но это мощный инструмент.

Пример — обратный отсчёт:
\`\`\`python
def countdown(n):
    if n == 0:
        print("Старт!")
        return
    print(n)
    countdown(n - 1)   # функция вызывает себя

countdown(3)
\`\`\`
Вывод: 3, 2, 1, Старт!

Два обязательных компонента:
1. **Базовый случай** — когда остановиться (\`if n == 0\`)
2. **Рекурсивный вызов** — вызов себя с изменённым аргументом

Без базового случая — бесконечная рекурсия (ошибка!).

Классический пример — факториал: 5! = 5 × 4 × 3 × 2 × 1 = 120
\`\`\`python
def factorial(n):
    if n <= 1:       # базовый случай
        return 1
    return n * factorial(n - 1)  # рекурсивный вызов
\`\`\``,
    task: `Напишите рекурсивную функцию factorial(n), которая возвращает факториал числа.

Прочитайте число, выведите его факториал.

Пример: ввели 5 → вывод: 120
Пример: ввели 1 → вывод: 1`,
    starterCode: `# Рекурсивный факториал\n`,
    tests: [
      { input: "5", expected: "120" },
      { input: "1", expected: "1" },
      { input: "3", expected: "6" },
    ],
    hints: ["def factorial(n): if n <= 1: return 1", "return n * factorial(n - 1)", "print(factorial(int(input())))"],
  },
  { id: "recursion_sum", module: 20, title: "Рекурсивная сумма",
    theory: `Любой цикл можно заменить рекурсией. Сумма чисел от 1 до N:

Цикл:
\`\`\`python
total = 0
for i in range(1, n + 1):
    total += i
\`\`\`

Рекурсия:
\`\`\`python
def sum_to(n):
    if n == 0:
        return 0
    return n + sum_to(n - 1)
\`\`\`

Как работает sum_to(3):
- sum_to(3) = 3 + sum_to(2)
- sum_to(2) = 2 + sum_to(1)
- sum_to(1) = 1 + sum_to(0)
- sum_to(0) = 0
- Обратно: 1+0=1, 2+1=3, 3+3=6

Рекурсия с списком:
\`\`\`python
def sum_list(lst):
    if len(lst) == 0:
        return 0
    return lst[0] + sum_list(lst[1:])
\`\`\``,
    task: `Напишите рекурсивную функцию power(base, exp), которая возвращает base в степени exp.

Не используйте оператор ** — только умножение и рекурсию.

Пример: ввели 2 и 10 → вывод: 1024
Пример: ввели 3 и 3 → вывод: 27`,
    starterCode: `# Рекурсивная степень\n`,
    tests: [
      { input: "2\n10", expected: "1024" },
      { input: "3\n3", expected: "27" },
      { input: "5\n0", expected: "1" },
    ],
    hints: ["Базовый случай: if exp == 0: return 1", "return base * power(base, exp - 1)", "print(power(int(input()), int(input())))"],
  },
  { id: "recursion_fibonacci", module: 20, title: "Числа Фибоначчи",
    theory: `Числа Фибоначчи: 0, 1, 1, 2, 3, 5, 8, 13, 21...

Каждое число — сумма двух предыдущих: F(n) = F(n-1) + F(n-2)

\`\`\`python
def fib(n):
    if n <= 0:
        return 0
    if n == 1:
        return 1
    return fib(n - 1) + fib(n - 2)
\`\`\`

Это работает, но медленно для больших n (повторные вычисления). Для скорости можно запоминать результаты (мемоизация) — но это продвинутая тема.

Итеративный вариант (быстрее):
\`\`\`python
def fib_fast(n):
    a, b = 0, 1
    for _ in range(n):
        a, b = b, a + b
    return a
\`\`\``,
    task: `Напишите функцию fib(n), которая возвращает n-е число Фибоначчи (любым способом).

fib(0)=0, fib(1)=1, fib(2)=1, fib(5)=5, fib(10)=55

Пример: ввели 10 → вывод: 55`,
    starterCode: `# Числа Фибоначчи\n`,
    tests: [
      { input: "10", expected: "55" },
      { input: "0", expected: "0" },
      { input: "7", expected: "13" },
    ],
    hints: ["Можно итеративно: a, b = 0, 1 и цикл", "for _ in range(n): a, b = b, a + b", "print(fib(int(input())))"],
  },
  { id: "exam20", module: 20, title: "Экзамен: Палиндром",
    theory: `Проверим рекурсию! Вы умеете: базовый случай, рекурсивный вызов, факториал, Фибоначчи.`,
    task: `Напишите рекурсивную функцию is_palindrome(s), которая проверяет, является ли строка палиндромом.

Логика: строка — палиндром, если первый и последний символы совпадают, и середина тоже палиндром.

Выведите yes или no.

Пример: ввели abcba → вывод: yes
Пример: ввели hello → вывод: no`,
    starterCode: `# Рекурсивная проверка палиндрома\n`,
    tests: [
      { input: "abcba", expected: "yes" },
      { input: "hello", expected: "no" },
      { input: "a", expected: "yes" },
    ],
    hints: ["if len(s) <= 1: return True", "if s[0] != s[-1]: return False", "return is_palindrome(s[1:-1])"],
  },

  // ==================== МОДУЛЬ 21: Работа с JSON ====================
  { id: "json_basics", module: 21, title: "Что такое JSON",
    theory: `JSON (JavaScript Object Notation) — формат хранения данных. Выглядит как словарь Python:

\`\`\`json
{"name": "Анна", "age": 25, "hobbies": ["чтение", "код"]}
\`\`\`

Python умеет работать с JSON через модуль \`json\`:

\`\`\`python
import json

# Строка → словарь (парсинг)
text = '{"name": "Анна", "age": 25}'
data = json.loads(text)
print(data["name"])   # Анна

# Словарь → строка (сериализация)
d = {"city": "Москва", "pop": 12000000}
text = json.dumps(d)
print(text)  # {"city": "Москва", "pop": 12000000}
\`\`\`

\`json.loads()\` — из строки в словарь (Load String)
\`json.dumps()\` — из словаря в строку (Dump String)

JSON используется повсюду: API, конфиги, базы данных. Это главный формат обмена данными в интернете.`,
    task: `Напишите программу:
1. Прочитайте JSON-строку
2. Распарсите с json.loads()
3. Выведите значение ключа "name"

Пример: ввели {"name": "Анна", "age": 25} → вывод: Анна`,
    starterCode: `import json\n# 1. Прочитайте строку\n# 2. json.loads()\n# 3. Выведите ["name"]\n`,
    tests: [
      { input: '{"name": "Анна", "age": 25}', expected: "Анна" },
      { input: '{"name": "Python", "type": "language"}', expected: "Python" },
    ],
    hints: ["s = input()", "data = json.loads(s)", 'print(data["name"])'],
  },
  { id: "json_create", module: 21, title: "Создание JSON",
    theory: `Создавать JSON из Python-данных так же просто:

\`\`\`python
import json

person = {
    "name": "Пётр",
    "scores": [90, 85, 95]
}

# Преобразуем в строку
text = json.dumps(person, ensure_ascii=False)
print(text)
# {"name": "Пётр", "scores": [90, 85, 95]}
\`\`\`

\`ensure_ascii=False\` — чтобы русские буквы не экранировались.

Красивый вывод (с отступами):
\`\`\`python
text = json.dumps(person, ensure_ascii=False, indent=2)
\`\`\`

Списки тоже работают:
\`\`\`python
items = [{"id": 1, "name": "A"}, {"id": 2, "name": "B"}]
print(json.dumps(items))
\`\`\``,
    task: `Напишите программу:
1. Прочитайте имя и возраст
2. Создайте словарь {"name": имя, "age": возраст_число}
3. Выведите JSON-строку

Пример: ввели Анна и 25 → вывод: {"name": "Анна", "age": 25}`,
    starterCode: `import json\n`,
    tests: [
      { input: "Анна\n25", expected: '{"name": "Анна", "age": 25}' },
      { input: "Пётр\n30", expected: '{"name": "Пётр", "age": 30}' },
    ],
    hints: ["name = input(), age = int(input())", 'data = {"name": name, "age": age}', "print(json.dumps(data, ensure_ascii=False))"],
  },
  { id: "json_nested", module: 21, title: "Вложенные данные",
    theory: `JSON может содержать вложенные структуры — словари внутри словарей, списки внутри словарей:

\`\`\`python
import json

data = {
    "user": {
        "name": "Анна",
        "address": {
            "city": "Москва",
            "street": "Тверская"
        }
    },
    "scores": [90, 85, 95]
}

# Доступ к вложенным данным — через цепочку ключей:
print(data["user"]["name"])              # Анна
print(data["user"]["address"]["city"])   # Москва
print(data["scores"][0])                 # 90
\`\`\`

Безопасный доступ через .get():
\`\`\`python
# Если ключа нет — вернёт None (без ошибки)
email = data["user"].get("email", "нет email")
\`\`\``,
    task: `Прочитайте JSON-строку с вложенной структурой.
Выведите значение по ключу "city" внутри "address".

Пример: ввели {"address": {"city": "Москва"}} → вывод: Москва`,
    starterCode: `import json\n`,
    tests: [
      { input: '{"address": {"city": "Москва"}}', expected: "Москва" },
      { input: '{"address": {"city": "Киев"}}', expected: "Киев" },
    ],
    hints: ["data = json.loads(input())", 'print(data["address"]["city"])', "Цепочка ключей для вложенных данных"],
  },
  { id: "exam21", module: 21, title: "Экзамен: JSON-отчёт",
    theory: `Проверим работу с JSON!`,
    task: `Прочитайте JSON-строку со списком учеников: [{"name": "A", "score": 90}, ...]
Найдите ученика с максимальным score и выведите его имя.

Пример: ввели [{"name": "Анна", "score": 90}, {"name": "Пётр", "score": 95}] → вывод: Пётр`,
    starterCode: `import json\n`,
    tests: [
      { input: '[{"name": "Анна", "score": 90}, {"name": "Пётр", "score": 95}]', expected: "Пётр" },
      { input: '[{"name": "A", "score": 50}]', expected: "A" },
    ],
    hints: ["students = json.loads(input())", "best = max(students, key=lambda s: s['score'])", 'print(best["name"])'],
  },

  // ==================== МОДУЛЬ 22: Регулярные выражения ====================
  { id: "regex_intro", module: 22, title: "Основы regex",
    theory: `Регулярные выражения (regex) — мощный способ искать паттерны в тексте.

\`\`\`python
import re

# Найти все числа в строке
text = "Мне 25 лет, рост 180 см"
numbers = re.findall(r"\\d+", text)
print(numbers)  # ["25", "180"]
\`\`\`

Основные паттерны:
- \`\\d\` — одна цифра (0-9)
- \`\\d+\` — одна или более цифр
- \`\\w\` — буква, цифра или _
- \`\\s\` — пробел
- \`.\` — любой символ
- \`*\` — 0 или более повторений
- \`+\` — 1 или более повторений

Функции модуля \`re\`:
- \`re.findall(pattern, text)\` — найти все совпадения
- \`re.search(pattern, text)\` — найти первое совпадение
- \`re.sub(pattern, replacement, text)\` — заменить`,
    task: `Напишите программу:
1. Прочитайте строку
2. Найдите все числа с помощью re.findall
3. Выведите их сумму

Пример: ввели У меня 3 кота и 2 собаки → вывод: 5`,
    starterCode: `import re\n`,
    tests: [
      { input: "У меня 3 кота и 2 собаки", expected: "5" },
      { input: "100 плюс 200", expected: "300" },
      { input: "нет чисел", expected: "0" },
    ],
    hints: ['numbers = re.findall(r"\\d+", input())', "nums = [int(x) for x in numbers]", "print(sum(nums))"],
  },
  { id: "regex_validate", module: 22, title: "Валидация с regex",
    theory: `Regex отлично подходит для проверки формата данных.

Проверка email (упрощённо):
\`\`\`python
import re
pattern = r"^\\w+@\\w+\\.\\w+$"
email = "test@mail.com"
if re.match(pattern, email):
    print("Email корректен")
\`\`\`

Символы в паттерне:
- \`^\` — начало строки
- \`$\` — конец строки
- \`\\.\` — точка (экранированная)
- \`[a-z]\` — любая буква от a до z
- \`[0-9]{3}\` — ровно 3 цифры

Проверка телефона:
\`\`\`python
phone = "+7-999-123-45-67"
if re.match(r"^\\+7-\\d{3}-\\d{3}-\\d{2}-\\d{2}$", phone):
    print("Телефон верный")
\`\`\`

\`re.match()\` проверяет совпадение с начала строки. Возвращает объект если совпало, None если нет.`,
    task: `Проверьте, состоит ли строка только из букв и пробелов (без цифр и спецсимволов).

Паттерн: ^[a-zA-Zа-яА-ЯёЁ ]+$

Выведите yes или no.

Пример: ввели Hello World → вывод: yes
Пример: ввели Hello 123 → вывод: no`,
    starterCode: `import re\n`,
    tests: [
      { input: "Hello World", expected: "yes" },
      { input: "Hello 123", expected: "no" },
      { input: "Привет мир", expected: "yes" },
    ],
    hints: ["s = input()", 'if re.match(r"^[a-zA-Zа-яА-ЯёЁ ]+$", s):', 'print("yes") else print("no")'],
  },
  { id: "regex_replace", module: 22, title: "Замена с regex",
    theory: `\`re.sub()\` заменяет все совпадения паттерна:

\`\`\`python
import re

# Убрать все цифры
text = "abc123def456"
result = re.sub(r"\\d", "", text)
print(result)  # abcdef

# Заменить несколько пробелов на один
text = "hello    world   !"
result = re.sub(r"\\s+", " ", text)
print(result)  # hello world !

# Скрыть email
text = "Пишите на test@mail.com"
result = re.sub(r"\\w+@\\w+\\.\\w+", "***@***.***", text)
print(result)  # Пишите на ***@***.***
\`\`\`

\`re.sub(pattern, replacement, text)\` — заменить все совпадения.`,
    task: `Напишите программу:
1. Прочитайте строку
2. Замените все цифры на символ #
3. Выведите результат

Пример: ввели abc123def → вывод: abc###def`,
    starterCode: `import re\n`,
    tests: [
      { input: "abc123def", expected: "abc###def" },
      { input: "hello", expected: "hello" },
      { input: "2025", expected: "####" },
    ],
    hints: ["s = input()", 're.sub(r"\\d", "#", s)', "print(result)"],
  },
  { id: "exam22", module: 22, title: "Экзамен: Извлечение данных",
    theory: `Проверим regex! findall, match, sub.`,
    task: `Прочитайте строку. Извлеките все слова, начинающиеся с заглавной буквы. Выведите их через пробел.

Паттерн: [A-ZА-ЯЁ][a-zа-яё]*

Пример: ввели Привет мир Python это Круто → вывод: Привет Python Круто`,
    starterCode: `import re\n`,
    tests: [
      { input: "Привет мир Python это Круто", expected: "Привет Python Круто" },
      { input: "hello World", expected: "World" },
      { input: "test", expected: "" },
    ],
    hints: ['words = re.findall(r"[A-ZА-ЯЁ][a-zа-яё]*", input())', 'print(" ".join(words))', "findall возвращает список совпадений"],
  },

  // ==================== МОДУЛЬ 23: Декораторы ====================
  { id: "decorator_intro", module: 23, title: "Что такое декоратор",
    theory: `Декоратор — функция, которая оборачивает другую функцию, добавляя ей поведение.

\`\`\`python
def loud(func):
    def wrapper(*args):
        result = func(*args)
        return result.upper()
    return wrapper

@loud
def greet(name):
    return f"привет, {name}"

print(greet("Анна"))  # ПРИВЕТ, АННА
\`\`\`

\`@loud\` перед функцией — это тоже самое что \`greet = loud(greet)\`.

Как работает:
1. \`loud\` получает функцию \`greet\`
2. Создаёт новую функцию \`wrapper\`, которая вызывает \`greet\` и модифицирует результат
3. Возвращает \`wrapper\` вместо \`greet\`

Зачем: добавить логирование, проверку прав, замер времени — не меняя саму функцию.`,
    task: `Напишите декоратор exclaim, который добавляет "!!!" к результату функции.

Применённый к функции say(text) → text, он должен возвращать text + "!!!"

Прочитайте текст, выведите результат say(text).

Пример: ввели hello → вывод: hello!!!`,
    starterCode: `# Декоратор exclaim\n`,
    tests: [
      { input: "hello", expected: "hello!!!" },
      { input: "wow", expected: "wow!!!" },
    ],
    hints: ["def exclaim(func): def wrapper(*args): return func(*args) + '!!!'", "return wrapper", "@exclaim def say(text): return text"],
  },
  { id: "decorator_timer", module: 23, title: "Практичные декораторы",
    theory: `Декоратор для подсчёта вызовов:

\`\`\`python
def count_calls(func):
    def wrapper(*args):
        wrapper.calls += 1
        return func(*args)
    wrapper.calls = 0
    return wrapper

@count_calls
def add(a, b):
    return a + b

add(1, 2)
add(3, 4)
print(add.calls)  # 2
\`\`\`

Декоратор для проверки аргументов:
\`\`\`python
def positive_only(func):
    def wrapper(n):
        if n < 0:
            return "Ошибка: число должно быть положительным"
        return func(n)
    return wrapper

@positive_only
def square(n):
    return n * n
\`\`\`

Декораторы — основа многих фреймворков (Flask, Django, FastAPI).`,
    task: `Напишите декоратор repeat, который вызывает функцию 3 раза и возвращает результат последнего вызова.

@repeat
def say(text):
    print(text)
    return text

Прочитайте текст, вызовите say(text). Функция должна напечатать текст 3 раза.

Пример: ввели hi → вывод:
hi
hi
hi`,
    starterCode: `# Декоратор repeat\n`,
    tests: [
      { input: "hi", expected: "hi\nhi\nhi" },
      { input: "ok", expected: "ok\nok\nok" },
    ],
    hints: ["def repeat(func): def wrapper(*args): ...", "for _ in range(3): result = func(*args)", "return result"],
  },
  { id: "exam23", module: 23, title: "Экзамен: Свой декоратор",
    theory: `Проверим декораторы!`,
    task: `Напишите декоратор add_greeting, который перед результатом функции добавляет "Результат: ".

@add_greeting
def calculate(a, b):
    return a + b

Прочитайте два числа. Выведите результат calculate.

Пример: ввели 3 и 5 → вывод: Результат: 8`,
    starterCode: `# Декоратор add_greeting\n`,
    tests: [
      { input: "3\n5", expected: "Результат: 8" },
      { input: "10\n20", expected: "Результат: 30" },
    ],
    hints: ["def add_greeting(func): def wrapper(*args): return f'Результат: {func(*args)}'", "return wrapper", "@add_greeting def calculate(a, b): return a + b"],
  },

  // ==================== МОДУЛЬ 24: Генераторы и yield ====================
  { id: "yield_intro", module: 24, title: "Генераторы с yield",
    theory: `Обычная функция возвращает одно значение через \`return\`. Генератор может отдавать значения по одному через \`yield\`:

\`\`\`python
def count_up(n):
    i = 1
    while i <= n:
        yield i     # отдаёт значение и "замирает"
        i += 1

for num in count_up(5):
    print(num)
# 1, 2, 3, 4, 5
\`\`\`

Генератор не хранит все значения в памяти — он создаёт их по мере необходимости. Это экономит память для больших данных.

\`\`\`python
# Генератор чётных чисел
def evens(limit):
    i = 0
    while i < limit:
        yield i
        i += 2

print(list(evens(10)))  # [0, 2, 4, 6, 8]
\`\`\`

Генераторное выражение (как list comprehension, но с круглыми скобками):
\`\`\`python
squares = (x*x for x in range(5))  # генератор
print(list(squares))  # [0, 1, 4, 9, 16]
\`\`\``,
    task: `Напишите генератор squares(n), который yield-ит квадраты чисел от 1 до n.

Прочитайте N, выведите квадраты через пробел.

Пример: ввели 5 → вывод: 1 4 9 16 25`,
    starterCode: `# Генератор squares с yield\n`,
    tests: [
      { input: "5", expected: "1 4 9 16 25" },
      { input: "3", expected: "1 4 9" },
      { input: "1", expected: "1" },
    ],
    hints: ["def squares(n): for i in range(1, n+1): yield i*i", 'print(" ".join(str(x) for x in squares(int(input()))))', "yield отдаёт значения по одному"],
  },
  { id: "yield_filter", module: 24, title: "Генератор-фильтр",
    theory: `Генераторы удобны для фильтрации данных:

\`\`\`python
def only_positive(numbers):
    for n in numbers:
        if n > 0:
            yield n

nums = [-3, 5, -1, 8, 0, 2]
result = list(only_positive(nums))
print(result)  # [5, 8, 2]
\`\`\`

Цепочка генераторов:
\`\`\`python
def double(numbers):
    for n in numbers:
        yield n * 2

def only_big(numbers):
    for n in numbers:
        if n > 5:
            yield n

nums = [1, 2, 3, 4, 5]
result = list(only_big(double(nums)))
# double: [2, 4, 6, 8, 10]
# only_big: [6, 8, 10]
print(result)  # [6, 8, 10]
\`\`\``,
    task: `Напишите генератор fibonacci(), который бесконечно yield-ит числа Фибоначчи.

Прочитайте N, выведите первые N чисел Фибоначчи через пробел.

Пример: ввели 7 → вывод: 0 1 1 2 3 5 8`,
    starterCode: `# Бесконечный генератор Фибоначчи\n`,
    tests: [
      { input: "7", expected: "0 1 1 2 3 5 8" },
      { input: "5", expected: "0 1 1 2 3" },
      { input: "1", expected: "0" },
    ],
    hints: ["def fibonacci(): a, b = 0, 1; while True: yield a; a, b = b, a + b", "Используйте цикл и next() или islice", "Или: gen = fibonacci(); result = [next(gen) for _ in range(n)]"],
  },
  { id: "exam24", module: 24, title: "Экзамен: Свой range",
    theory: `Проверим генераторы!`,
    task: `Напишите генератор my_range(start, stop, step), который работает как встроенный range().

Прочитайте start, stop, step, выведите числа через пробел.

Пример: ввели 1, 10, 2 → вывод: 1 3 5 7 9`,
    starterCode: `# Генератор my_range\n`,
    tests: [
      { input: "1\n10\n2", expected: "1 3 5 7 9" },
      { input: "0\n5\n1", expected: "0 1 2 3 4" },
      { input: "10\n13\n1", expected: "10 11 12" },
    ],
    hints: ["def my_range(start, stop, step): i = start; while i < stop: yield i; i += step", "Прочитайте 3 числа", 'print(" ".join(str(x) for x in my_range(...)))'],
  },

  // ==================== МОДУЛЬ 25: Алгоритмы сортировки ====================
  { id: "bubble_sort", module: 25, title: "Пузырьковая сортировка",
    theory: `Алгоритмы сортировки — основа информатики. Начнём с самого простого.

Пузырьковая сортировка: сравниваем соседние элементы и меняем местами, если они стоят неправильно.

\`\`\`python
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr
\`\`\`

Как работает [5, 3, 1]:
- Проход 1: [3, 5, 1] → [3, 1, 5]
- Проход 2: [1, 3, 5] — готово!

Самый большой элемент «всплывает» наверх (как пузырёк), отсюда название.

Скорость: O(n²) — медленно для больших данных. Но просто для понимания.`,
    task: `Реализуйте пузырьковую сортировку. Не используйте sorted() или .sort().

Прочитайте числа через пробел, отсортируйте, выведите через пробел.

Пример: ввели 5 3 1 4 2 → вывод: 1 2 3 4 5`,
    starterCode: `# Пузырьковая сортировка\n`,
    tests: [
      { input: "5 3 1 4 2", expected: "1 2 3 4 5" },
      { input: "1", expected: "1" },
      { input: "3 1 2", expected: "1 2 3" },
    ],
    hints: ["nums = list(map(int, input().split()))", "Два вложенных цикла, swap: arr[j], arr[j+1] = arr[j+1], arr[j]", 'print(" ".join(str(x) for x in nums))'],
  },
  { id: "selection_sort", module: 25, title: "Сортировка выбором",
    theory: `Сортировка выбором: находим минимум и ставим его на нужное место.

\`\`\`python
def selection_sort(arr):
    n = len(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
    return arr
\`\`\`

Как работает [3, 1, 2]:
- Шаг 1: минимум = 1 (индекс 1), меняем с arr[0] → [1, 3, 2]
- Шаг 2: минимум в оставшихся = 2, меняем → [1, 2, 3]

Тоже O(n²), но обычно чуть быстрее пузырьковой — меньше обменов.`,
    task: `Реализуйте сортировку выбором. Прочитайте числа, отсортируйте по убыванию (от большего к меньшему).

Пример: ввели 1 5 3 → вывод: 5 3 1`,
    starterCode: `# Сортировка выбором по убыванию\n`,
    tests: [
      { input: "1 5 3", expected: "5 3 1" },
      { input: "10 20 30", expected: "30 20 10" },
      { input: "7", expected: "7" },
    ],
    hints: ["Замените < на > в сравнении для сортировки по убыванию", "if arr[j] > arr[max_idx]: max_idx = j", "Или отсортируйте по возрастанию и переверните [::-1]"],
  },
  { id: "sort_key", module: 25, title: "sorted() и key",
    theory: `В Python есть встроенная сортировка \`sorted()\` — очень быстрая (O(n log n)):

\`\`\`python
nums = [5, 2, 8, 1]
print(sorted(nums))        # [1, 2, 5, 8]
print(sorted(nums, reverse=True))  # [8, 5, 2, 1]
\`\`\`

Сортировка по ключу — мощная фишка:
\`\`\`python
words = ["banana", "apple", "cherry"]
# По длине
print(sorted(words, key=len))      # ["apple", "banana", "cherry"]
# По последней букве
print(sorted(words, key=lambda w: w[-1]))
\`\`\`

\`key\` — функция, которая вычисляет значение для сравнения.
\`lambda\` — анонимная (безымянная) функция.

Сортировка словарей:
\`\`\`python
students = [
    {"name": "Анна", "score": 90},
    {"name": "Пётр", "score": 85},
]
by_score = sorted(students, key=lambda s: s["score"], reverse=True)
\`\`\``,
    task: `Прочитайте слова через пробел. Отсортируйте по длине (от короткого к длинному). Выведите через пробел.

Пример: ввели banana apple cherry → вывод: apple banana cherry`,
    starterCode: `# sorted() с key=len\n`,
    tests: [
      { input: "banana apple cherry", expected: "apple banana cherry" },
      { input: "a bb ccc", expected: "a bb ccc" },
      { input: "hi hello hey", expected: "hi hey hello" },
    ],
    hints: ["words = input().split()", "result = sorted(words, key=len)", 'print(" ".join(result))'],
  },
  { id: "exam25", module: 25, title: "Экзамен: Топ-3",
    theory: `Проверим сортировку!`,
    task: `Прочитайте N чисел. Выведите 3 наибольших числа через пробел (от большего к меньшему). Если чисел меньше 3 — выведите все.

Пример: ввели 5, потом 10 5 8 3 15 → вывод: 15 10 8`,
    starterCode: `# Топ-3 числа\n`,
    tests: [
      { input: "5\n10\n5\n8\n3\n15", expected: "15 10 8" },
      { input: "2\n5\n3", expected: "5 3" },
      { input: "1\n42", expected: "42" },
    ],
    hints: ["Прочитайте числа, sorted(reverse=True)", "top = sorted(nums, reverse=True)[:3]", 'print(" ".join(str(x) for x in top))'],
  },

  // ==================== МОДУЛЬ 26: Алгоритмы поиска ====================
  { id: "linear_search", module: 26, title: "Линейный поиск",
    theory: `Линейный поиск — самый простой: проверяем элементы по одному.

\`\`\`python
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i    # нашли, возвращаем индекс
    return -1           # не нашли

nums = [4, 2, 7, 1, 9]
print(linear_search(nums, 7))   # 2
print(linear_search(nums, 5))   # -1
\`\`\`

Скорость: O(n) — в худшем случае нужно проверить все элементы.

Оператор \`in\` делает то же самое:
\`\`\`python
if 7 in nums:
    print("Найдено!")
\`\`\`
Но \`in\` не возвращает индекс.`,
    task: `Реализуйте функцию find(arr, target), которая возвращает индекс элемента или -1.

Прочитайте числа через пробел, потом число для поиска. Выведите индекс.

Пример: ввели 4 2 7 1 9, потом 7 → вывод: 2`,
    starterCode: `# Линейный поиск\n`,
    tests: [
      { input: "4 2 7 1 9\n7", expected: "2" },
      { input: "1 2 3\n5", expected: "-1" },
      { input: "10\n10", expected: "0" },
    ],
    hints: ["def find(arr, target): for i in range(len(arr)): ...", "if arr[i] == target: return i", "return -1 в конце"],
  },
  { id: "binary_search", module: 26, title: "Бинарный поиск",
    theory: `Бинарный поиск работает только с отсортированным массивом, но намного быстрее — O(log n).

Идея: делим массив пополам, смотрим в какой половине искать.

\`\`\`python
def binary_search(arr, target):
    left, right = 0, len(arr) - 1
    while left <= right:
        mid = (left + right) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1
\`\`\`

Пример: ищем 7 в [1, 3, 5, 7, 9, 11]:
- mid=2, arr[2]=5, 5<7 → ищем справа
- mid=4, arr[4]=9, 9>7 → ищем слева
- mid=3, arr[3]=7 → нашли!

3 шага вместо 6 — при миллионе элементов: 20 шагов вместо миллиона!`,
    task: `Реализуйте бинарный поиск. Массив уже отсортирован.

Прочитайте числа через пробел (отсортированные), потом число для поиска. Выведите индекс или -1.

Пример: ввели 1 3 5 7 9, потом 5 → вывод: 2`,
    starterCode: `# Бинарный поиск\n`,
    tests: [
      { input: "1 3 5 7 9\n5", expected: "2" },
      { input: "1 3 5 7 9\n6", expected: "-1" },
      { input: "10 20 30\n30", expected: "2" },
    ],
    hints: ["left, right = 0, len(arr) - 1", "mid = (left + right) // 2", "Сравните arr[mid] с target и сдвиньте left или right"],
  },
  { id: "exam26", module: 26, title: "Экзамен: Поиск ближайшего",
    theory: `Проверим алгоритмы поиска!`,
    task: `Прочитайте отсортированные числа и целевое число. Найдите ближайшее к целевому число из списка.

Пример: ввели 1 3 5 7 9, потом 6 → вывод: 5 (или 7, оба на расстоянии 1 — выведите меньшее)`,
    starterCode: `# Поиск ближайшего числа\n`,
    tests: [
      { input: "1 3 5 7 9\n6", expected: "5" },
      { input: "1 10 20\n15", expected: "10" },
      { input: "5\n5", expected: "5" },
    ],
    hints: ["nums = list(map(int, input().split())), target = int(input())", "closest = min(nums, key=lambda x: abs(x - target))", "print(closest)"],
  },

  // ==================== МОДУЛЬ 27: Структуры данных ====================
  { id: "ds_stack_queue", module: 27, title: "Стек и очередь",
    theory: `Две фундаментальные структуры данных:

**Стек (Stack)** — LIFO: последний пришёл, первый ушёл. Как стопка тарелок.
\`\`\`python
stack = []
stack.append(1)   # push
stack.append(2)
stack.append(3)
print(stack.pop())  # 3 (последний)
print(stack.pop())  # 2
\`\`\`

**Очередь (Queue)** — FIFO: первый пришёл, первый ушёл. Как очередь в магазине.
\`\`\`python
from collections import deque
queue = deque()
queue.append(1)     # добавить в конец
queue.append(2)
queue.append(3)
print(queue.popleft())  # 1 (первый)
\`\`\`

Применение:
- Стек: Ctrl+Z (отмена), скобки в выражениях, DFS
- Очередь: принтер, BFS, обработка задач`,
    task: `Реализуйте стек. Прочитайте N команд:
- push X — добавить X
- pop — удалить последний и вывести

Пример: ввели 4, push 5, push 3, pop, pop → вывод:
3
5`,
    starterCode: `# Стек с командами push/pop\n`,
    tests: [
      { input: "4\npush 5\npush 3\npop\npop", expected: "3\n5" },
      { input: "2\npush 10\npop", expected: "10" },
    ],
    hints: ["stack = [], for каждой команды:", 'if cmd.startswith("push"): stack.append(int(cmd.split()[1]))', "elif cmd == \"pop\": print(stack.pop())"],
  },
  { id: "ds_linked_concept", module: 27, title: "Хеш-таблица",
    theory: `Хеш-таблица — структура для быстрого поиска по ключу. В Python это словарь \`dict\`.

Как работает:
1. Ключ преобразуется в число (хеш) функцией \`hash()\`
2. По этому числу определяется позиция в массиве
3. Поиск, вставка, удаление — O(1) в среднем!

\`\`\`python
print(hash("hello"))  # какое-то число
print(hash(42))       # 42
\`\`\`

Словарь Python — это хеш-таблица:
\`\`\`python
d = {}
d["name"] = "Анна"    # O(1) — мгновенно
print(d["name"])       # O(1) — мгновенно
"name" in d            # O(1) — мгновенно
\`\`\`

Сравнение скорости:
- Список: поиск O(n) — проверяем все элементы
- Словарь: поиск O(1) — сразу по ключу
- Для миллиона элементов: список ~500000 операций, словарь ~1`,
    task: `Используя словарь, подсчитайте частоту каждого слова. Выведите слово, которое встречается чаще всего.

Пример: ввели a b a c a b → вывод: a`,
    starterCode: `# Подсчёт частоты слов\n`,
    tests: [
      { input: "a b a c a b", expected: "a" },
      { input: "x y z x", expected: "x" },
      { input: "hello", expected: "hello" },
    ],
    hints: ["words = input().split(), counts = {}", "for w in words: counts[w] = counts.get(w, 0) + 1", "print(max(counts, key=counts.get))"],
  },
  { id: "exam27", module: 27, title: "Экзамен: Скобки",
    theory: `Классическая задача на стек!`,
    task: `Проверьте, правильно ли расставлены скобки в строке (только круглые).

Правило: каждая открывающая ( должна иметь закрывающую ).

Выведите yes или no.

Пример: ввели (()()) → вывод: yes
Пример: ввели (() → вывод: no`,
    starterCode: `# Проверка скобок стеком\n`,
    tests: [
      { input: "(()())", expected: "yes" },
      { input: "(()", expected: "no" },
      { input: "()()", expected: "yes" },
      { input: ")(", expected: "no" },
    ],
    hints: ["count = 0, для каждого символа:", "if c == '(': count += 1, if c == ')': count -= 1", "if count < 0: break. В конце: count == 0 → yes"],
  },

  // ==================== МОДУЛЬ 28: Лямбды и функц. программирование ====================
  { id: "lambda_basics", module: 28, title: "Лямбда-функции",
    theory: `Лямбда — короткая анонимная функция в одну строку:

\`\`\`python
# Обычная функция
def double(x):
    return x * 2

# Лямбда — тоже самое
double = lambda x: x * 2

print(double(5))  # 10
\`\`\`

Лямбды часто используются как аргументы:
\`\`\`python
nums = [3, 1, 4, 1, 5]
sorted(nums, key=lambda x: -x)  # сортировка по убыванию

words = ["hi", "hello", "hey"]
sorted(words, key=lambda w: len(w))  # по длине
\`\`\``,
    task: `Используя lambda и sorted(), отсортируйте числа по их последней цифре.

Пример: ввели 15 22 31 48 → вывод: 31 22 15 48`,
    starterCode: `# Сортировка по последней цифре\n`,
    tests: [
      { input: "15 22 31 48", expected: "31 22 15 48" },
      { input: "10 21 32", expected: "10 21 32" },
    ],
    hints: ["nums = list(map(int, input().split()))", "result = sorted(nums, key=lambda x: x % 10)", 'print(" ".join(str(x) for x in result))'],
  },
  { id: "map_filter", module: 28, title: "map и filter",
    theory: `\`map()\` применяет функцию к каждому элементу:
\`\`\`python
nums = [1, 2, 3, 4]
doubled = list(map(lambda x: x * 2, nums))
# [2, 4, 6, 8]
\`\`\`

\`filter()\` оставляет элементы, для которых функция вернула True:
\`\`\`python
nums = [1, 2, 3, 4, 5, 6]
evens = list(filter(lambda x: x % 2 == 0, nums))
# [2, 4, 6]
\`\`\`

Цепочка:
\`\`\`python
# Удвоить только чётные
result = list(map(lambda x: x*2, filter(lambda x: x%2==0, nums)))
# [4, 8, 12]
\`\`\`

Сравнение с генератором списка:
\`\`\`python
# Генератор — обычно читаемее:
result = [x*2 for x in nums if x%2==0]
\`\`\``,
    task: `Прочитайте числа через пробел. С помощью filter оставьте только отрицательные, с помощью map возьмите их абсолютное значение. Выведите через пробел.

Пример: ввели -3 5 -1 8 -7 → вывод: 3 1 7`,
    starterCode: `# filter + map\n`,
    tests: [
      { input: "-3 5 -1 8 -7", expected: "3 1 7" },
      { input: "1 2 3", expected: "" },
      { input: "-10", expected: "10" },
    ],
    hints: ["nums = list(map(int, input().split()))", "neg = filter(lambda x: x < 0, nums)", "abs_neg = map(lambda x: abs(x), neg)"],
  },
  { id: "exam28", module: 28, title: "Экзамен: Конвейер",
    theory: `Проверим функциональное программирование!`,
    task: `Прочитайте слова через пробел. Отфильтруйте только слова длиннее 3 букв, переведите в верхний регистр, отсортируйте по алфавиту. Выведите через пробел.

Пример: ввели я люблю python и код → вывод: ЛЮБЛЮ PYTHON`,
    starterCode: `# Фильтрация + трансформация + сортировка\n`,
    tests: [
      { input: "я люблю python и код", expected: "ЛЮБЛЮ PYTHON" },
      { input: "hi hello world", expected: "HELLO WORLD" },
    ],
    hints: ["words = input().split()", "long = [w.upper() for w in words if len(w) > 3]", 'print(" ".join(sorted(long)))'],
  },

  // ==================== МОДУЛЬ 29: Дата и время ====================
  { id: "datetime_basics", module: 29, title: "Модуль datetime",
    theory: `Модуль \`datetime\` для работы с датами и временем:

\`\`\`python
from datetime import datetime, date, timedelta

# Текущая дата и время
now = datetime.now()
print(now)  # 2025-04-05 12:30:45.123456

# Только дата
today = date.today()
print(today)  # 2025-04-05

# Создать конкретную дату
birthday = date(2000, 5, 15)
print(birthday)  # 2000-05-15
\`\`\`

Форматирование:
\`\`\`python
now = datetime.now()
print(now.strftime("%d.%m.%Y"))    # 05.04.2025
print(now.strftime("%H:%M"))       # 12:30
\`\`\`

Разбор строки в дату:
\`\`\`python
d = datetime.strptime("25-12-2025", "%d-%m-%Y")
\`\`\``,
    task: `Прочитайте дату в формате ДД.ММ.ГГГГ. Выведите день недели по-русски (0=Понедельник, 6=Воскресенье).

Дни: Понедельник, Вторник, Среда, Четверг, Пятница, Суббота, Воскресенье

Пример: ввели 01.01.2025 → вывод: Среда`,
    starterCode: `from datetime import datetime\n`,
    tests: [
      { input: "01.01.2025", expected: "Среда" },
      { input: "05.04.2025", expected: "Суббота" },
    ],
    hints: ["d = datetime.strptime(input(), '%d.%m.%Y')", 'days = [\"Понедельник\",\"Вторник\",\"Среда\",\"Четверг\",\"Пятница\",\"Суббота\",\"Воскресенье\"]', "print(days[d.weekday()])"],
  },
  { id: "datetime_calc", module: 29, title: "Вычисления с датами",
    theory: `\`timedelta\` — разница между датами:

\`\`\`python
from datetime import date, timedelta

today = date.today()
tomorrow = today + timedelta(days=1)
next_week = today + timedelta(weeks=1)

# Разница между датами
d1 = date(2025, 1, 1)
d2 = date(2025, 12, 31)
diff = d2 - d1
print(diff.days)  # 364
\`\`\`

Сравнение дат:
\`\`\`python
if d1 < d2:
    print("d1 раньше d2")
\`\`\``,
    task: `Прочитайте две даты в формате ДД.ММ.ГГГГ. Выведите количество дней между ними.

Пример: ввели 01.01.2025 и 10.01.2025 → вывод: 9`,
    starterCode: `from datetime import datetime\n`,
    tests: [
      { input: "01.01.2025\n10.01.2025", expected: "9" },
      { input: "01.01.2025\n01.01.2026", expected: "365" },
    ],
    hints: ["d1 = datetime.strptime(input(), '%d.%m.%Y')", "d2 = datetime.strptime(input(), '%d.%m.%Y')", "print(abs((d2 - d1).days))"],
  },
  { id: "exam29", module: 29, title: "Экзамен: Возраст",
    theory: `Проверим работу с датами!`,
    task: `Прочитайте дату рождения в формате ДД.ММ.ГГГГ. Вычислите возраст в полных годах на 01.01.2025.

Пример: ввели 15.06.2000 → вывод: 24
Пример: ввели 15.06.1990 → вывод: 34`,
    starterCode: `from datetime import datetime\n`,
    tests: [
      { input: "15.06.2000", expected: "24" },
      { input: "15.06.1990", expected: "34" },
      { input: "01.01.2025", expected: "0" },
    ],
    hints: ["birth = datetime.strptime(input(), '%d.%m.%Y')", "ref = datetime(2025, 1, 1)", "age = ref.year - birth.year — корректировка если день рождения ещё не наступил"],
  },

  // ==================== МОДУЛЬ 30: SQL основы (теория + строки) ====================
  { id: "sql_select", module: 30, title: "SQL: SELECT",
    theory: `SQL — язык для работы с базами данных. База данных хранит данные в таблицах (как Excel).

Таблица \`users\`:
| id | name | age | city |
|----|------|-----|------|
| 1 | Анна | 25 | Москва |
| 2 | Пётр | 30 | Киев |

Запрос SELECT — получить данные:
\`\`\`sql
SELECT name, age FROM users
SELECT * FROM users WHERE age > 25
SELECT name FROM users WHERE city = 'Москва'
SELECT * FROM users ORDER BY age DESC
SELECT COUNT(*) FROM users
\`\`\`

В Python SQL выполняется через модуль \`sqlite3\`:
\`\`\`python
import sqlite3
conn = sqlite3.connect("mydb.db")
cursor = conn.cursor()
cursor.execute("SELECT * FROM users")
rows = cursor.fetchall()
\`\`\`

В этом уроке мы будем строить SQL-запросы как строки (без реальной БД).`,
    task: `Напишите функцию select_query(table, columns, where=None), которая возвращает SQL-запрос.

Пример: select_query("users", "name, age") → SELECT name, age FROM users
Пример: select_query("users", "*", "age > 25") → SELECT * FROM users WHERE age > 25

Прочитайте таблицу, колонки и условие (или none). Выведите запрос.`,
    starterCode: `# Генератор SQL-запросов\n`,
    tests: [
      { input: "users\nname, age\nnone", expected: "SELECT name, age FROM users" },
      { input: "users\n*\nage > 25", expected: "SELECT * FROM users WHERE age > 25" },
    ],
    hints: ["table = input(), cols = input(), where = input()", 'query = f"SELECT {cols} FROM {table}"', 'if where != "none": query += f" WHERE {where}"'],
  },
  { id: "sql_insert", module: 30, title: "SQL: INSERT, UPDATE, DELETE",
    theory: `Другие SQL-команды:

INSERT — добавить строку:
\`\`\`sql
INSERT INTO users (name, age) VALUES ('Анна', 25)
\`\`\`

UPDATE — обновить:
\`\`\`sql
UPDATE users SET age = 26 WHERE name = 'Анна'
\`\`\`

DELETE — удалить:
\`\`\`sql
DELETE FROM users WHERE id = 1
\`\`\`

Агрегация:
\`\`\`sql
SELECT AVG(age) FROM users
SELECT MAX(score) FROM students
SELECT city, COUNT(*) FROM users GROUP BY city
\`\`\`

JOIN — объединение таблиц:
\`\`\`sql
SELECT users.name, orders.total
FROM users
JOIN orders ON users.id = orders.user_id
\`\`\``,
    task: `Напишите функцию insert_query(table, columns, values), которая строит INSERT-запрос.

Прочитайте таблицу, колонки (через запятую), значения (через запятую). Выведите запрос.

Пример: users, name/age, Анна/25 → INSERT INTO users (name, age) VALUES ('Анна', '25')`,
    starterCode: `# Генератор INSERT-запроса\n`,
    tests: [
      { input: "users\nname,age\nАнна,25", expected: "INSERT INTO users (name, age) VALUES ('Анна', '25')" },
      { input: "items\ntitle\nКнига", expected: "INSERT INTO items (title) VALUES ('Книга')" },
    ],
    hints: ["table, cols, vals = input(), input(), input()", "cols_str = ', '.join(cols.split(','))", "vals_str = ', '.join(f\"'{v.strip()}'\" for v in vals.split(','))"],
  },
  { id: "exam30", module: 30, title: "Экзамен: SQL-конструктор",
    theory: `Проверим SQL!`,
    task: `Прочитайте тип запроса (select или count), таблицу и условие (или none). Постройте запрос.

select, users, none → SELECT * FROM users
count, users, age > 18 → SELECT COUNT(*) FROM users WHERE age > 18`,
    starterCode: `# SQL-конструктор\n`,
    tests: [
      { input: "select\nusers\nnone", expected: "SELECT * FROM users" },
      { input: "count\nusers\nage > 18", expected: "SELECT COUNT(*) FROM users WHERE age > 18" },
    ],
    hints: ["qtype, table, where = input(), input(), input()", 'cols = "*" if qtype == "select" else "COUNT(*)"', 'Добавьте WHERE если where != "none"'],
  },

  // ==================== МОДУЛЬ 31: HTTP и API (теория) ====================
  { id: "http_basics", module: 31, title: "Как работает HTTP",
    theory: `HTTP — протокол общения браузера с сервером.

Запрос: браузер → сервер
Ответ: сервер → браузер

Методы HTTP:
- **GET** — получить данные (открыть страницу)
- **POST** — отправить данные (форма, логин)
- **PUT** — обновить
- **DELETE** — удалить

Статус-коды ответа:
- **200** — OK (всё хорошо)
- **404** — Not Found (страница не найдена)
- **500** — Server Error (ошибка сервера)
- **201** — Created (успешно создано)

URL: \`https://api.example.com/users?page=1\`
- \`https\` — протокол
- \`api.example.com\` — домен
- \`/users\` — путь
- \`?page=1\` — параметры

API (Application Programming Interface) — интерфейс для общения программ. Обычно возвращает JSON.`,
    task: `Напишите функцию, которая по статус-коду возвращает его описание:
200 → OK, 404 → Not Found, 500 → Server Error, остальные → Unknown

Прочитайте код, выведите описание.

Пример: ввели 200 → вывод: OK`,
    starterCode: `# HTTP статус-коды\n`,
    tests: [
      { input: "200", expected: "OK" },
      { input: "404", expected: "Not Found" },
      { input: "500", expected: "Server Error" },
      { input: "999", expected: "Unknown" },
    ],
    hints: ['codes = {200: "OK", 404: "Not Found", 500: "Server Error"}', "code = int(input())", 'print(codes.get(code, "Unknown"))'],
  },
  { id: "api_parse", module: 31, title: "Парсинг API-ответа",
    theory: `API обычно возвращает JSON. Пример ответа от API пользователей:

\`\`\`json
{
    "status": "ok",
    "data": [
        {"id": 1, "name": "Анна", "email": "anna@mail.com"},
        {"id": 2, "name": "Пётр", "email": "petr@mail.com"}
    ],
    "total": 2
}
\`\`\`

Парсинг в Python:
\`\`\`python
import json
response = json.loads(api_response)
users = response["data"]
for user in users:
    print(f'{user["name"]}: {user["email"]}')
\`\`\``,
    task: `Прочитайте JSON-строку — ответ API с полями "status" и "count". Если status равен "ok" — выведите count. Если нет — выведите error.

Пример: ввели {"status": "ok", "count": 42} → вывод: 42`,
    starterCode: `import json\n`,
    tests: [
      { input: '{"status": "ok", "count": 42}', expected: "42" },
      { input: '{"status": "error", "count": 0}', expected: "error" },
    ],
    hints: ["data = json.loads(input())", 'if data["status"] == "ok":', 'print(data["count"]) else print("error")'],
  },
  { id: "exam31", module: 31, title: "Экзамен: REST URL",
    theory: `Проверим знания HTTP и API!`,
    task: `Постройте REST URL из компонентов. Прочитайте базовый URL, ресурс и ID (или none). Выведите полный URL.

Пример: https://api.com, users, 5 → вывод: https://api.com/users/5
Пример: https://api.com, posts, none → вывод: https://api.com/posts`,
    starterCode: `# REST URL builder\n`,
    tests: [
      { input: "https://api.com\nusers\n5", expected: "https://api.com/users/5" },
      { input: "https://api.com\nposts\nnone", expected: "https://api.com/posts" },
    ],
    hints: ["base, resource, id_ = input(), input(), input()", 'url = f"{base}/{resource}"', 'if id_ != "none": url += f"/{id_}"'],
  },

  // ==================== МОДУЛЬ 32: Тестирование ====================
  { id: "assert_basics", module: 32, title: "assert и тесты",
    theory: `Тестирование — проверка что ваш код работает правильно.

\`assert\` — простейший способ тестировать:
\`\`\`python
def add(a, b):
    return a + b

assert add(2, 3) == 5       # ✅ проходит
assert add(-1, 1) == 0      # ✅ проходит
assert add(0, 0) == 0       # ✅ проходит
print("Все тесты прошли!")
\`\`\`

Если assert получает False — программа падает с ошибкой.

Паттерн: Arrange-Act-Assert:
\`\`\`python
# Arrange — подготовка
nums = [3, 1, 2]

# Act — действие
result = sorted(nums)

# Assert — проверка
assert result == [1, 2, 3]
\`\`\`

Тестируйте граничные случаи:
- Пустой ввод
- Один элемент
- Отрицательные числа
- Очень большие значения`,
    task: `Напишите функцию is_palindrome(s), которая возвращает True если строка — палиндром (без учёта регистра).

Затем протестируйте её с assert. Если все тесты прошли — выведите ok.

Пример: → вывод: ok`,
    starterCode: `# Функция + тесты с assert\n`,
    tests: [
      { input: "", expected: "ok" },
    ],
    hints: ["def is_palindrome(s): return s.lower() == s.lower()[::-1]", 'assert is_palindrome("abcba") == True', 'assert is_palindrome("hello") == False; print("ok")'],
  },
  { id: "test_functions", module: 32, title: "Тестирование функций",
    theory: `Хорошие тесты покрывают разные сценарии:

\`\`\`python
def divide(a, b):
    if b == 0:
        return None
    return a / b

# Обычный случай
assert divide(10, 2) == 5.0
# Деление на ноль
assert divide(10, 0) is None
# Отрицательные числа
assert divide(-10, 2) == -5.0
# Ноль делить на число
assert divide(0, 5) == 0.0
\`\`\`

Тестовая функция:
\`\`\`python
def test_divide():
    assert divide(10, 2) == 5.0
    assert divide(10, 0) is None
    assert divide(-10, 2) == -5.0

test_divide()
print("Тесты пройдены!")
\`\`\`

В реальных проектах используют \`pytest\` — фреймворк для тестов.`,
    task: `Напишите функцию clamp(value, min_val, max_val), которая ограничивает число в диапазоне:
- Если value < min_val → вернуть min_val
- Если value > max_val → вернуть max_val
- Иначе → вернуть value

Напишите 3 assert-теста и выведите ok.`,
    starterCode: `# clamp + тесты\n`,
    tests: [
      { input: "", expected: "ok" },
    ],
    hints: ["def clamp(v, lo, hi): return max(lo, min(hi, v))", "assert clamp(5, 0, 10) == 5", 'assert clamp(-5, 0, 10) == 0; assert clamp(15, 0, 10) == 10; print("ok")'],
  },
  { id: "exam32", module: 32, title: "Экзамен: TDD",
    theory: `TDD (Test-Driven Development) — сначала пишем тест, потом код. Проверим!`,
    task: `Напишите функцию flatten(nested_list), которая превращает вложенный список в плоский. Используйте isinstance(x, list) для проверки.

flatten([1, [2, 3], [4, [5]]]) → [1, 2, 3, 4, 5]

Напишите тесты и выведите ok.`,
    starterCode: `# flatten + тесты\n`,
    tests: [
      { input: "", expected: "ok" },
    ],
    hints: ["def flatten(lst): result = []; for x in lst: ...", "if isinstance(x, list): result.extend(flatten(x)) else: result.append(x)", "assert flatten([1,[2,3]]) == [1,2,3]; print('ok')"],
  },

  // ==================== МОДУЛЬ 33: Git (теория) ====================
  { id: "git_basics", module: 33, title: "Основы Git",
    theory: `Git — система контроля версий. Она сохраняет историю изменений вашего кода.

Основные команды:
\`\`\`bash
git init            # создать репозиторий
git add file.py     # подготовить файл к коммиту
git commit -m "msg" # сохранить изменения
git status          # посмотреть состояние
git log             # история коммитов
\`\`\`

Ветки:
\`\`\`bash
git branch feature  # создать ветку
git checkout feature  # переключиться
git merge feature   # объединить ветки
\`\`\`

GitHub — платформа для хранения кода онлайн:
\`\`\`bash
git push origin main   # отправить на GitHub
git pull origin main   # скачать изменения
git clone url          # скопировать репозиторий
\`\`\`

Рабочий процесс:
1. Создать ветку для задачи
2. Написать код
3. Закоммитить изменения
4. Создать Pull Request
5. Code Review
6. Merge в main`,
    task: `Напишите функцию, которая по названию git-команды возвращает её описание.

init → create repository
add → stage changes
commit → save changes
push → upload to remote
pull → download from remote
Остальное → unknown command

Прочитайте команду, выведите описание.`,
    starterCode: `# Git-справочник\n`,
    tests: [
      { input: "init", expected: "create repository" },
      { input: "commit", expected: "save changes" },
      { input: "push", expected: "upload to remote" },
      { input: "xyz", expected: "unknown command" },
    ],
    hints: ['commands = {"init": "create repository", "add": "stage changes", ...}', "cmd = input()", 'print(commands.get(cmd, "unknown command"))'],
  },
  { id: "exam33", module: 33, title: "Экзамен: Коммит",
    theory: `Проверим знания Git!`,
    task: `Сформируйте сообщение коммита. Прочитайте тип (feat/fix/docs) и описание. Выведите в формате: type: description

Пример: ввели feat и add login → вывод: feat: add login`,
    starterCode: `# Формат коммита\n`,
    tests: [
      { input: "feat\nadd login", expected: "feat: add login" },
      { input: "fix\ntypo in readme", expected: "fix: typo in readme" },
    ],
    hints: ["type_ = input(), desc = input()", 'print(f"{type_}: {desc}")', "Просто форматирование строки"],
  },

  // ==================== МОДУЛЬ 34: Выпускные проекты ====================
  { id: "grad_contact_book", module: 34, title: "Проект: Контакты",
    theory: `Выпускные проекты — полноценные мини-программы. Используйте всё: ООП, словари, функции, обработку ошибок.`,
    task: `Напишите программу "Контактная книга":
1. Прочитайте N контактов (имя и телефон на отдельных строках)
2. Прочитайте имя для поиска
3. Если контакт найден — выведите телефон
4. Если нет — выведите not found

Пример: ввели 2, Анна, 123, Пётр, 456, потом Анна → вывод: 123`,
    starterCode: `# Контактная книга\n`,
    tests: [
      { input: "2\nАнна\n123\nПётр\n456\nАнна", expected: "123" },
      { input: "1\nТест\n999\nДругой", expected: "not found" },
    ],
    hints: ["n = int(input()), contacts = {}", "for: name, phone = input(), input()", 'search = input(); print(contacts.get(search, "not found"))'],
  },
  { id: "grad_calculator", module: 34, title: "Проект: Калькулятор выражений",
    theory: `Калькулятор, который разбирает простые выражения — хорошая финальная задача.`,
    task: `Прочитайте выражение вида "число оператор число" (через пробелы). Поддержите +, -, *, /. При делении на 0 выведите error.

Пример: ввели 10 + 5 → вывод: 15
Пример: ввели 10 / 0 → вывод: error`,
    starterCode: `# Калькулятор выражений\n`,
    tests: [
      { input: "10 + 5", expected: "15" },
      { input: "10 * 3", expected: "30" },
      { input: "10 / 0", expected: "error" },
      { input: "10 - 3", expected: "7" },
    ],
    hints: ["parts = input().split()", "a, op, b = int(parts[0]), parts[1], int(parts[2])", 'if op == \"/\" and b == 0: print(\"error\") else: вычислите'],
  },
  { id: "grad_text_analyzer", module: 34, title: "Проект: Анализатор текста",
    theory: `Полноценный анализатор текста — объединяет строки, словари, циклы, функции.`,
    task: `Прочитайте текст (одна строка). Выведите 4 строки статистики:
- Символов: N (без пробелов)
- Слов: N
- Уникальных: N
- Самое частое: СЛОВО

Пример: ввели я люблю я код я → вывод:
Символов: 12
Слов: 5
Уникальных: 3
Самое частое: я`,
    starterCode: `# Анализатор текста\n`,
    tests: [
      { input: "я люблю я код я", expected: "Символов: 12\nСлов: 5\nУникальных: 3\nСамое частое: я" },
      { input: "hello world", expected: "Символов: 10\nСлов: 2\nУникальных: 2\nСамое частое: hello" },
    ],
    hints: ["text = input(), words = text.split()", 'chars = sum(1 for c in text if c != " ")', "counts = {}; for w in words: counts[w] = counts.get(w,0)+1"],
  },
  { id: "exam_final", module: 34, title: "Выпускной экзамен",
    theory: `Поздравляем! Это финальный экзамен всего курса.

Вы прошли путь от print("Hello") до ООП, алгоритмов и реальных проектов. Вы готовы писать код на Python уверенно и искать работу!

Покажите всё что знаете.`,
    task: `Напишите класс StudentRegistry:
- add(name, grade) — добавить ученика
- average() — средняя оценка всех учеников (целое число)
- best() — имя ученика с лучшей оценкой

Прочитайте N учеников (имя и оценка), выведите среднюю оценку и имя лучшего на отдельных строках.

Пример: ввели 3, Анна 90, Пётр 85, Мир 95 → вывод:
90
Мир`,
    starterCode: `# Выпускной экзамен — StudentRegistry\n`,
    tests: [
      { input: "3\nАнна\n90\nПётр\n85\nМир\n95", expected: "90\nМир" },
      { input: "1\nТест\n100", expected: "100\nТест" },
      { input: "2\nA\n50\nB\n50", expected: "50\nA" },
    ],
    hints: [
      "class StudentRegistry: def __init__(self): self._students = []",
      "def add(self, name, grade): self._students.append((name, grade))",
      "def best(self): return max(self._students, key=lambda s: s[1])[0]",
    ],
  },
];
