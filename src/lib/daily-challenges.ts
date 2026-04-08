export interface DailyChallenge {
  id: string;
  title: string;
  description: string;
  difficulty: 1 | 2 | 3;
  starterCode: string;
  tests: { input: string; expected: string }[];
  hints: string[];
}

const challenges: DailyChallenge[] = [
  {
    id: "dc-001",
    title: "Переверни строку",
    description: "Напишите функцию `reverse_string(s)`, которая возвращает строку `s` в обратном порядке.",
    difficulty: 1,
    starterCode: `def reverse_string(s):\n    # ваш код\n    pass\n\nprint(reverse_string(input()))`,
    tests: [
      { input: "hello", expected: "olleh" },
      { input: "Python", expected: "nohtyP" },
      { input: "a", expected: "a" },
    ],
    hints: [
      "Можно использовать срезы (slicing) с шагом -1",
      "s[::-1] переворачивает строку",
    ],
  },
  {
    id: "dc-002",
    title: "Подсчёт гласных",
    description: "Напишите функцию `count_vowels(s)`, которая возвращает количество гласных (a, e, i, o, u) в строке (без учёта регистра).",
    difficulty: 1,
    starterCode: `def count_vowels(s):\n    # ваш код\n    pass\n\nprint(count_vowels(input()))`,
    tests: [
      { input: "hello", expected: "2" },
      { input: "AEIOU", expected: "5" },
      { input: "bcdfg", expected: "0" },
      { input: "Python Programming", expected: "4" },
    ],
    hints: [
      "Приведите строку к нижнему регистру с помощью .lower()",
      "Используйте sum() и проверку символа in 'aeiou'",
    ],
  },
  {
    id: "dc-003",
    title: "FizzBuzz",
    description: "Напишите функцию `fizzbuzz(n)`, которая для числа n возвращает: 'FizzBuzz' если делится на 3 и 5, 'Fizz' если на 3, 'Buzz' если на 5, иначе само число как строку.",
    difficulty: 1,
    starterCode: `def fizzbuzz(n):\n    # ваш код\n    pass\n\nprint(fizzbuzz(int(input())))`,
    tests: [
      { input: "15", expected: "FizzBuzz" },
      { input: "9", expected: "Fizz" },
      { input: "10", expected: "Buzz" },
      { input: "7", expected: "7" },
    ],
    hints: [
      "Проверяйте делимость на 15 (3*5) первой",
      "Используйте оператор % для проверки остатка от деления",
    ],
  },
  {
    id: "dc-004",
    title: "Сумма цифр",
    description: "Напишите функцию `sum_digits(n)`, которая возвращает сумму цифр числа n.",
    difficulty: 1,
    starterCode: `def sum_digits(n):\n    # ваш код\n    pass\n\nprint(sum_digits(int(input())))`,
    tests: [
      { input: "123", expected: "6" },
      { input: "9999", expected: "36" },
      { input: "0", expected: "0" },
      { input: "100", expected: "1" },
    ],
    hints: [
      "Можно преобразовать число в строку и пройти по символам",
      "Или использовать % 10 и // 10 в цикле",
    ],
  },
  {
    id: "dc-005",
    title: "Палиндром",
    description: "Напишите функцию `is_palindrome(s)`, которая возвращает True, если строка является палиндромом (без учёта регистра и пробелов).",
    difficulty: 1,
    starterCode: `def is_palindrome(s):\n    # ваш код\n    pass\n\nprint(is_palindrome(input()))`,
    tests: [
      { input: "racecar", expected: "True" },
      { input: "hello", expected: "False" },
      { input: "A man a plan a canal Panama", expected: "True" },
      { input: "level", expected: "True" },
    ],
    hints: [
      "Уберите пробелы и приведите к нижнему регистру",
      "Сравните строку с её обратной версией",
    ],
  },
  {
    id: "dc-006",
    title: "Найди дубликаты",
    description: "Напишите функцию `find_duplicates(lst)`, которая возвращает список дубликатов (элементы, встречающиеся более одного раза). Список вводится через пробел.",
    difficulty: 2,
    starterCode: `def find_duplicates(lst):\n    # ваш код\n    pass\n\nnums = list(map(int, input().split()))\nresult = find_duplicates(nums)\nprint(*sorted(result))`,
    tests: [
      { input: "1 2 3 2 4 3", expected: "2 3" },
      { input: "1 2 3 4 5", expected: "" },
      { input: "1 1 1 2 2", expected: "1 2" },
    ],
    hints: [
      "Используйте collections.Counter или словарь для подсчёта",
      "Элемент является дубликатом, если его count > 1",
    ],
  },
  {
    id: "dc-007",
    title: "Шифр Цезаря",
    description: "Напишите функцию `caesar(text, shift)`, которая сдвигает каждую латинскую букву на shift позиций. Не-буквы остаются как есть. Ввод: первая строка — текст, вторая — сдвиг.",
    difficulty: 2,
    starterCode: `def caesar(text, shift):\n    # ваш код\n    pass\n\ntext = input()\nshift = int(input())\nprint(caesar(text, shift))`,
    tests: [
      { input: "abc\n3", expected: "def" },
      { input: "xyz\n3", expected: "abc" },
      { input: "Hello, World!\n5", expected: "Mjqqt, Btwqi!" },
    ],
    hints: [
      "Используйте ord() и chr() для работы с кодами символов",
      "Не забудьте про оборот: (ord(c) - base + shift) % 26",
    ],
  },
  {
    id: "dc-008",
    title: "Факториал рекурсией",
    description: "Напишите рекурсивную функцию `factorial(n)`, возвращающую n!",
    difficulty: 1,
    starterCode: `def factorial(n):\n    # ваш код (рекурсия!)\n    pass\n\nprint(factorial(int(input())))`,
    tests: [
      { input: "5", expected: "120" },
      { input: "0", expected: "1" },
      { input: "10", expected: "3628800" },
    ],
    hints: [
      "Базовый случай: 0! = 1",
      "Рекурсивный случай: n! = n * (n-1)!",
    ],
  },
  {
    id: "dc-009",
    title: "Числа Фибоначчи",
    description: "Напишите функцию `fibonacci(n)`, возвращающую n-е число Фибоначчи (0, 1, 1, 2, 3, 5, 8...).",
    difficulty: 2,
    starterCode: `def fibonacci(n):\n    # ваш код\n    pass\n\nprint(fibonacci(int(input())))`,
    tests: [
      { input: "0", expected: "0" },
      { input: "1", expected: "1" },
      { input: "10", expected: "55" },
      { input: "6", expected: "8" },
    ],
    hints: [
      "Используйте два переменных a, b для хранения последних двух чисел",
      "В цикле: a, b = b, a + b",
    ],
  },
  {
    id: "dc-010",
    title: "Максимум без max()",
    description: "Напишите функцию `find_max(lst)`, которая находит максимальное число в списке без использования встроенной функции max(). Числа вводятся через пробел.",
    difficulty: 1,
    starterCode: `def find_max(lst):\n    # ваш код (без max()!)\n    pass\n\nnums = list(map(int, input().split()))\nprint(find_max(nums))`,
    tests: [
      { input: "3 1 4 1 5 9", expected: "9" },
      { input: "-1 -5 -2", expected: "-1" },
      { input: "42", expected: "42" },
    ],
    hints: [
      "Начните с первого элемента как максимума",
      "Пройдите по списку и обновляйте максимум если нашли больший элемент",
    ],
  },
  {
    id: "dc-011",
    title: "Подсчёт слов",
    description: "Напишите функцию `word_count(text)`, которая возвращает словарь {слово: количество}. Выведите пары через запятую, отсортированные по слову.",
    difficulty: 2,
    starterCode: `def word_count(text):\n    # ваш код\n    pass\n\ntext = input()\ncounts = word_count(text)\nfor word in sorted(counts):\n    print(f"{word}:{counts[word]}")`,
    tests: [
      { input: "hello world hello", expected: "hello:2\nworld:1" },
      { input: "a a a b b c", expected: "a:3\nb:2\nc:1" },
    ],
    hints: [
      "Разбейте текст на слова с помощью split()",
      "Используйте словарь для подсчёта или collections.Counter",
    ],
  },
  {
    id: "dc-012",
    title: "Простое число?",
    description: "Напишите функцию `is_prime(n)`, возвращающую True если n — простое число.",
    difficulty: 2,
    starterCode: `def is_prime(n):\n    # ваш код\n    pass\n\nprint(is_prime(int(input())))`,
    tests: [
      { input: "7", expected: "True" },
      { input: "4", expected: "False" },
      { input: "2", expected: "True" },
      { input: "1", expected: "False" },
      { input: "97", expected: "True" },
    ],
    hints: [
      "Числа меньше 2 — не простые",
      "Достаточно проверить делители до sqrt(n)",
    ],
  },
  {
    id: "dc-013",
    title: "Анаграммы",
    description: "Напишите функцию `are_anagrams(s1, s2)`, которая проверяет, являются ли две строки анаграммами. Ввод: две строки на отдельных строках.",
    difficulty: 1,
    starterCode: `def are_anagrams(s1, s2):\n    # ваш код\n    pass\n\ns1 = input()\ns2 = input()\nprint(are_anagrams(s1, s2))`,
    tests: [
      { input: "listen\nsilent", expected: "True" },
      { input: "hello\nworld", expected: "False" },
      { input: "Dormitory\nDirty room", expected: "True" },
    ],
    hints: [
      "Приведите к нижнему регистру и уберите пробелы",
      "Отсортируйте буквы и сравните",
    ],
  },
  {
    id: "dc-014",
    title: "Двоичное представление",
    description: "Напишите функцию `to_binary(n)`, которая возвращает двоичное представление числа n как строку (без использования bin()).",
    difficulty: 2,
    starterCode: `def to_binary(n):\n    # ваш код (без bin()!)\n    pass\n\nprint(to_binary(int(input())))`,
    tests: [
      { input: "10", expected: "1010" },
      { input: "0", expected: "0" },
      { input: "255", expected: "11111111" },
      { input: "1", expected: "1" },
    ],
    hints: [
      "Делите число на 2 и собирайте остатки",
      "Не забудьте перевернуть результат в конце",
    ],
  },
  {
    id: "dc-015",
    title: "Сжатие строки",
    description: "Напишите функцию `compress(s)`, которая сжимает строку: 'aaabbc' -> 'a3b2c1'.",
    difficulty: 2,
    starterCode: `def compress(s):\n    # ваш код\n    pass\n\nprint(compress(input()))`,
    tests: [
      { input: "aaabbc", expected: "a3b2c1" },
      { input: "abcd", expected: "a1b1c1d1" },
      { input: "aaa", expected: "a3" },
    ],
    hints: [
      "Пройдите по строке, считая подряд идущие одинаковые символы",
      "Используйте переменную-счётчик и текущий символ",
    ],
  },
  {
    id: "dc-016",
    title: "Матрица: транспонирование",
    description: "Напишите функцию `transpose(matrix)`, которая транспонирует матрицу (список списков). Ввод: первая строка — N M, затем N строк матрицы.",
    difficulty: 3,
    starterCode: `def transpose(matrix):\n    # ваш код\n    pass\n\nn, m = map(int, input().split())\nmatrix = []\nfor _ in range(n):\n    row = list(map(int, input().split()))\n    matrix.append(row)\nresult = transpose(matrix)\nfor row in result:\n    print(*row)`,
    tests: [
      { input: "2 3\n1 2 3\n4 5 6", expected: "1 4\n2 5\n3 6" },
      { input: "1 3\n1 2 3", expected: "1\n2\n3" },
    ],
    hints: [
      "Можно использовать zip(*matrix)",
      "Или два вложенных цикла: новая строка i = старый столбец i",
    ],
  },
  {
    id: "dc-017",
    title: "Удали дубликаты, сохрани порядок",
    description: "Напишите функцию `unique_ordered(lst)`, которая удаляет дубликаты из списка, сохраняя порядок первого вхождения.",
    difficulty: 2,
    starterCode: `def unique_ordered(lst):\n    # ваш код\n    pass\n\nnums = list(map(int, input().split()))\nprint(*unique_ordered(nums))`,
    tests: [
      { input: "1 2 3 2 1 4", expected: "1 2 3 4" },
      { input: "5 5 5 5", expected: "5" },
      { input: "1 2 3", expected: "1 2 3" },
    ],
    hints: [
      "Используйте множество (set) для отслеживания уже встреченных элементов",
      "Добавляйте элемент в результат только если его нет в множестве",
    ],
  },
  {
    id: "dc-018",
    title: "Скобки сбалансированы?",
    description: "Напишите функцию `is_balanced(s)`, проверяющую сбалансированность скобок (), [], {}.",
    difficulty: 3,
    starterCode: `def is_balanced(s):\n    # ваш код\n    pass\n\nprint(is_balanced(input()))`,
    tests: [
      { input: "({[]})", expected: "True" },
      { input: "({[}])", expected: "False" },
      { input: "", expected: "True" },
      { input: "((()))", expected: "True" },
      { input: "(", expected: "False" },
    ],
    hints: [
      "Используйте стек (список) — добавляйте открывающие скобки",
      "При закрывающей скобке проверяйте, что на вершине стека — парная открывающая",
    ],
  },
  {
    id: "dc-019",
    title: "ROT13",
    description: "Напишите функцию `rot13(text)`, которая применяет шифр ROT13 к тексту (сдвиг на 13 позиций).",
    difficulty: 1,
    starterCode: `def rot13(text):\n    # ваш код\n    pass\n\nprint(rot13(input()))`,
    tests: [
      { input: "Hello", expected: "Uryyb" },
      { input: "Python", expected: "Clguba" },
      { input: "Uryyb", expected: "Hello" },
    ],
    hints: [
      "ROT13 — это шифр Цезаря со сдвигом 13",
      "Применение ROT13 дважды даёт исходный текст",
    ],
  },
  {
    id: "dc-020",
    title: "Степень двойки?",
    description: "Напишите функцию `is_power_of_two(n)`, возвращающую True если n — степень двойки.",
    difficulty: 1,
    starterCode: `def is_power_of_two(n):\n    # ваш код\n    pass\n\nprint(is_power_of_two(int(input())))`,
    tests: [
      { input: "16", expected: "True" },
      { input: "15", expected: "False" },
      { input: "1", expected: "True" },
      { input: "1024", expected: "True" },
    ],
    hints: [
      "Степень двойки в двоичной системе — это 1 и нули",
      "Трюк: n & (n-1) == 0 для степеней двойки",
    ],
  },
  {
    id: "dc-021",
    title: "Наибольший общий делитель",
    description: "Напишите функцию `gcd(a, b)`, которая находит НОД двух чисел (без math.gcd). Ввод: два числа через пробел.",
    difficulty: 2,
    starterCode: `def gcd(a, b):\n    # ваш код\n    pass\n\na, b = map(int, input().split())\nprint(gcd(a, b))`,
    tests: [
      { input: "12 8", expected: "4" },
      { input: "17 13", expected: "1" },
      { input: "100 75", expected: "25" },
    ],
    hints: [
      "Алгоритм Евклида: gcd(a, b) = gcd(b, a % b)",
      "Базовый случай: gcd(a, 0) = a",
    ],
  },
  {
    id: "dc-022",
    title: "Римские числа",
    description: "Напишите функцию `to_roman(n)`, которая переводит число (1-3999) в римскую запись.",
    difficulty: 3,
    starterCode: `def to_roman(n):\n    # ваш код\n    pass\n\nprint(to_roman(int(input())))`,
    tests: [
      { input: "4", expected: "IV" },
      { input: "9", expected: "IX" },
      { input: "58", expected: "LVIII" },
      { input: "1994", expected: "MCMXCIV" },
    ],
    hints: [
      "Создайте список пар (значение, символ) в порядке убывания",
      "Жадно вычитайте наибольшее значение, добавляя символ к результату",
    ],
  },
  {
    id: "dc-023",
    title: "Таблица умножения",
    description: "Напишите программу, которая выводит таблицу умножения от 1 до n (n вводится).",
    difficulty: 1,
    starterCode: `n = int(input())\n# выведите таблицу умножения n x n`,
    tests: [
      { input: "3", expected: "1 2 3\n2 4 6\n3 6 9" },
      { input: "2", expected: "1 2\n2 4" },
    ],
    hints: [
      "Два вложенных цикла: for i in range(1, n+1) и for j в range(1, n+1)",
      "print(*row) выведет элементы через пробел",
    ],
  },
  {
    id: "dc-024",
    title: "Пирамида из звёздочек",
    description: "Напишите функцию `pyramid(n)`, которая выводит пирамиду из * высотой n строк. Каждая строка центрируется пробелами.",
    difficulty: 1,
    starterCode: `def pyramid(n):\n    # ваш код\n    pass\n\npyramid(int(input()))`,
    tests: [
      { input: "3", expected: "  *\n ***\n*****" },
      { input: "1", expected: "*" },
      { input: "4", expected: "   *\n  ***\n *****\n*******" },
    ],
    hints: [
      "В строке i (от 0) будет 2*i+1 звёздочек",
      "Перед звёздочками добавьте n-i-1 пробелов",
    ],
  },
  {
    id: "dc-025",
    title: "Список в словарь",
    description: "Напишите функцию `list_to_dict(lst)`, которая берёт список [ключ, значение, ключ, значение, ...] и возвращает словарь. Выведите пары ключ:значение по одной на строку, отсортированные по ключу.",
    difficulty: 2,
    starterCode: `def list_to_dict(lst):\n    # ваш код\n    pass\n\nitems = input().split()\nd = list_to_dict(items)\nfor k in sorted(d):\n    print(f"{k}:{d[k]}")`,
    tests: [
      { input: "a 1 b 2 c 3", expected: "a:1\nb:2\nc:3" },
      { input: "x 10 y 20", expected: "x:10\ny:20" },
    ],
    hints: [
      "Используйте срезы с шагом 2: lst[::2] для ключей, lst[1::2] для значений",
      "Или цикл с шагом 2: for i in range(0, len(lst), 2)",
    ],
  },
  {
    id: "dc-026",
    title: "Сортировка пузырьком",
    description: "Реализуйте сортировку пузырьком. Функция `bubble_sort(lst)` должна отсортировать список по возрастанию (без sort()).",
    difficulty: 2,
    starterCode: `def bubble_sort(lst):\n    # ваш код (без sort()!)\n    pass\n\nnums = list(map(int, input().split()))\nprint(*bubble_sort(nums))`,
    tests: [
      { input: "5 3 1 4 2", expected: "1 2 3 4 5" },
      { input: "1 2 3", expected: "1 2 3" },
      { input: "9 1 5 3", expected: "1 3 5 9" },
    ],
    hints: [
      "Два вложенных цикла: внешний по количеству проходов, внутренний по элементам",
      "Если lst[j] > lst[j+1], меняем их местами",
    ],
  },
  {
    id: "dc-027",
    title: "Обратный словарь",
    description: "Напишите функцию `invert_dict(d)`, которая меняет ключи и значения местами. Ввод: пары ключ:значение через пробел.",
    difficulty: 2,
    starterCode: `def invert_dict(d):\n    # ваш код\n    pass\n\nitems = input().split()\nd = {}\nfor item in items:\n    k, v = item.split(":")\n    d[k] = v\nresult = invert_dict(d)\nfor k in sorted(result):\n    print(f"{k}:{result[k]}")`,
    tests: [
      { input: "a:1 b:2 c:3", expected: "1:a\n2:b\n3:c" },
      { input: "x:hello y:world", expected: "hello:x\nworld:y" },
    ],
    hints: [
      "Создайте новый словарь, где ключ = старое значение, значение = старый ключ",
      "{v: k for k, v in d.items()}",
    ],
  },
  {
    id: "dc-028",
    title: "Треугольник Паскаля",
    description: "Напишите функцию `pascal(n)`, которая возвращает первые n строк треугольника Паскаля. Выведите каждую строку через пробел.",
    difficulty: 3,
    starterCode: `def pascal(n):\n    # ваш код\n    pass\n\nrows = pascal(int(input()))\nfor row in rows:\n    print(*row)`,
    tests: [
      { input: "4", expected: "1\n1 1\n1 2 1\n1 3 3 1" },
      { input: "1", expected: "1" },
    ],
    hints: [
      "Каждый элемент (кроме крайних) — сумма двух элементов сверху",
      "row[j] = prev_row[j-1] + prev_row[j]",
    ],
  },
  {
    id: "dc-029",
    title: "Конвертер температуры",
    description: "Напишите функцию `convert_temp(value, from_unit)`, которая конвертирует температуру. from_unit: 'C' или 'F'. Возвращает округлённое до 1 знака после запятой.",
    difficulty: 1,
    starterCode: `def convert_temp(value, from_unit):\n    # ваш код\n    pass\n\nvalue = float(input())\nunit = input().strip()\nprint(convert_temp(value, unit))`,
    tests: [
      { input: "100\nC", expected: "212.0" },
      { input: "32\nF", expected: "0.0" },
      { input: "0\nC", expected: "32.0" },
    ],
    hints: [
      "C -> F: value * 9/5 + 32",
      "F -> C: (value - 32) * 5/9",
    ],
  },
  {
    id: "dc-030",
    title: "Среднее, медиана, мода",
    description: "Напишите функцию, которая вычисляет среднее арифметическое списка чисел. Выведите результат, округлённый до 2 знаков.",
    difficulty: 1,
    starterCode: `def average(lst):\n    # ваш код\n    pass\n\nnums = list(map(int, input().split()))\nprint(average(nums))`,
    tests: [
      { input: "1 2 3 4 5", expected: "3.0" },
      { input: "10 20", expected: "15.0" },
      { input: "7", expected: "7.0" },
    ],
    hints: [
      "Среднее = сумма / количество",
      "Используйте round(result, 2) если нужно",
    ],
  },
  {
    id: "dc-031",
    title: "Лестница",
    description: "Напишите функцию `staircase(n)`, которая выводит лестницу из # высотой n, выровненную по правому краю.",
    difficulty: 1,
    starterCode: `def staircase(n):\n    # ваш код\n    pass\n\nstaircase(int(input()))`,
    tests: [
      { input: "4", expected: "   #\n  ##\n ###\n####" },
      { input: "2", expected: " #\n##" },
    ],
    hints: [
      "В строке i (от 1 до n) будет i символов # и n-i пробелов слева",
      "Используйте rjust() или конкатенацию строк",
    ],
  },
  {
    id: "dc-032",
    title: "Уникальные символы",
    description: "Напишите функцию `has_unique_chars(s)`, которая проверяет, все ли символы в строке уникальны.",
    difficulty: 1,
    starterCode: `def has_unique_chars(s):\n    # ваш код\n    pass\n\nprint(has_unique_chars(input()))`,
    tests: [
      { input: "abcde", expected: "True" },
      { input: "hello", expected: "False" },
      { input: "a", expected: "True" },
    ],
    hints: [
      "Сравните длину строки с длиной множества символов",
      "len(s) == len(set(s))",
    ],
  },
  {
    id: "dc-033",
    title: "Camel to Snake",
    description: "Напишите функцию `to_snake(s)`, которая переводит camelCase в snake_case.",
    difficulty: 2,
    starterCode: `def to_snake(s):\n    # ваш код\n    pass\n\nprint(to_snake(input()))`,
    tests: [
      { input: "camelCase", expected: "camel_case" },
      { input: "getElementById", expected: "get_element_by_id" },
      { input: "simple", expected: "simple" },
    ],
    hints: [
      "Перед каждой заглавной буквой вставьте _",
      "Используйте isupper() для проверки",
    ],
  },
  {
    id: "dc-034",
    title: "Второй максимум",
    description: "Напишите функцию `second_max(lst)`, которая находит второе по величине число в списке.",
    difficulty: 2,
    starterCode: `def second_max(lst):\n    # ваш код\n    pass\n\nnums = list(map(int, input().split()))\nprint(second_max(nums))`,
    tests: [
      { input: "1 3 5 2 4", expected: "4" },
      { input: "10 10 5 3", expected: "5" },
      { input: "1 2", expected: "1" },
    ],
    hints: [
      "Можно преобразовать в множество для удаления дубликатов",
      "Отсортируйте и возьмите предпоследний элемент",
    ],
  },
  {
    id: "dc-035",
    title: "Разложение на множители",
    description: "Напишите функцию `prime_factors(n)`, возвращающую список простых множителей числа n.",
    difficulty: 3,
    starterCode: `def prime_factors(n):\n    # ваш код\n    pass\n\nprint(*prime_factors(int(input())))`,
    tests: [
      { input: "12", expected: "2 2 3" },
      { input: "7", expected: "7" },
      { input: "100", expected: "2 2 5 5" },
    ],
    hints: [
      "Делите n на 2, пока делится, затем на 3, и т.д.",
      "Достаточно проверять делители до sqrt(n)",
    ],
  },
  {
    id: "dc-036",
    title: "Расстояние Хэмминга",
    description: "Напишите функцию `hamming(s1, s2)`, которая считает количество позиций, в которых строки различаются. Ввод: две строки на отдельных строках.",
    difficulty: 1,
    starterCode: `def hamming(s1, s2):\n    # ваш код\n    pass\n\ns1 = input()\ns2 = input()\nprint(hamming(s1, s2))`,
    tests: [
      { input: "karolin\nkathrin", expected: "3" },
      { input: "abc\nabc", expected: "0" },
      { input: "1011\n1001", expected: "1" },
    ],
    hints: [
      "Используйте zip() для параллельного обхода строк",
      "sum(1 for a, b in zip(s1, s2) if a != b)",
    ],
  },
  {
    id: "dc-037",
    title: "Flatten списка",
    description: "Напишите функцию `flatten(lst)`, которая разворачивает вложенный список в плоский. Ввод: Python-список через eval().",
    difficulty: 3,
    starterCode: `def flatten(lst):\n    # ваш код (рекурсия!)\n    pass\n\nimport ast\nlst = ast.literal_eval(input())\nprint(*flatten(lst))`,
    tests: [
      { input: "[1, [2, 3], [4, [5, 6]]]", expected: "1 2 3 4 5 6" },
      { input: "[[1, 2], [3, 4]]", expected: "1 2 3 4" },
      { input: "[1, 2, 3]", expected: "1 2 3" },
    ],
    hints: [
      "Используйте рекурсию: если элемент — список, рекурсивно разверните его",
      "isinstance(item, list) проверяет, является ли элемент списком",
    ],
  },
  {
    id: "dc-038",
    title: "Шахматная доска",
    description: "Напишите функцию `chessboard(n)`, которая выводит шахматную доску n x n из символов # и . (чередуя).",
    difficulty: 1,
    starterCode: `def chessboard(n):\n    # ваш код\n    pass\n\nchessboard(int(input()))`,
    tests: [
      { input: "3", expected: "#.#\n.#.\n#.#" },
      { input: "4", expected: "#.#.\n.#.#\n#.#.\n.#.#" },
    ],
    hints: [
      "Символ зависит от суммы индексов: (i+j) % 2",
      "Если сумма чётная — #, если нечётная — .",
    ],
  },
  {
    id: "dc-039",
    title: "Цифровой корень",
    description: "Напишите функцию `digital_root(n)`, которая суммирует цифры числа до тех пор, пока не останется одна цифра.",
    difficulty: 2,
    starterCode: `def digital_root(n):\n    # ваш код\n    pass\n\nprint(digital_root(int(input())))`,
    tests: [
      { input: "942", expected: "6" },
      { input: "132189", expected: "6" },
      { input: "5", expected: "5" },
    ],
    hints: [
      "Повторяйте суммирование цифр, пока число >= 10",
      "Или используйте формулу: 1 + (n - 1) % 9",
    ],
  },
  {
    id: "dc-040",
    title: "Числа Армстронга",
    description: "Напишите функцию `is_armstrong(n)`, которая проверяет, является ли число числом Армстронга (сумма цифр в степени количества цифр равна самому числу).",
    difficulty: 2,
    starterCode: `def is_armstrong(n):\n    # ваш код\n    pass\n\nprint(is_armstrong(int(input())))`,
    tests: [
      { input: "153", expected: "True" },
      { input: "370", expected: "True" },
      { input: "123", expected: "False" },
      { input: "9", expected: "True" },
    ],
    hints: [
      "Количество цифр = len(str(n))",
      "Сумма каждой цифры в степени количества цифр",
    ],
  },
  {
    id: "dc-041",
    title: "Генератор паролей",
    description: "Напишите функцию `count_strength(password)`, которая оценивает силу пароля: 'слабый' (<6 символов), 'средний' (6-10, только буквы/цифры), 'сильный' (10+ или содержит спецсимволы).",
    difficulty: 2,
    starterCode: `def count_strength(password):\n    # ваш код\n    pass\n\nprint(count_strength(input()))`,
    tests: [
      { input: "abc", expected: "слабый" },
      { input: "hello123", expected: "средний" },
      { input: "MyP@ssw0rd!", expected: "сильный" },
      { input: "abcdefghijk", expected: "сильный" },
    ],
    hints: [
      "Проверяйте длину и наличие спецсимволов",
      "isalnum() возвращает True если строка содержит только буквы и цифры",
    ],
  },
  {
    id: "dc-042",
    title: "Разворот слов",
    description: "Напишите функцию `reverse_words(s)`, которая разворачивает порядок слов в строке.",
    difficulty: 1,
    starterCode: `def reverse_words(s):\n    # ваш код\n    pass\n\nprint(reverse_words(input()))`,
    tests: [
      { input: "hello world foo", expected: "foo world hello" },
      { input: "Python is awesome", expected: "awesome is Python" },
      { input: "one", expected: "one" },
    ],
    hints: [
      "split() разбивает строку на слова",
      "' '.join(words[::-1]) склеивает обратно",
    ],
  },
  {
    id: "dc-043",
    title: "Подстрока-палиндром",
    description: "Напишите функцию `longest_palindrome(s)`, которая находит длину самой длинной подстроки-палиндрома.",
    difficulty: 3,
    starterCode: `def longest_palindrome(s):\n    # ваш код\n    pass\n\nprint(longest_palindrome(input()))`,
    tests: [
      { input: "babad", expected: "3" },
      { input: "cbbd", expected: "2" },
      { input: "a", expected: "1" },
      { input: "racecar", expected: "7" },
    ],
    hints: [
      "Для каждой позиции расширяйтесь влево и вправо",
      "Проверяйте и нечётные, и чётные палиндромы",
    ],
  },
  {
    id: "dc-044",
    title: "Счастливый билет",
    description: "Напишите функцию `is_lucky(ticket)`, проверяющую, является ли 6-значный билет счастливым (сумма первых 3 цифр = сумме последних 3).",
    difficulty: 1,
    starterCode: `def is_lucky(ticket):\n    # ваш код\n    pass\n\nprint(is_lucky(input()))`,
    tests: [
      { input: "123321", expected: "True" },
      { input: "123456", expected: "False" },
      { input: "000000", expected: "True" },
    ],
    hints: [
      "Преобразуйте каждый символ в число",
      "Сравните sum(digits[:3]) и sum(digits[3:])",
    ],
  },
  {
    id: "dc-045",
    title: "Совершенное число",
    description: "Напишите функцию `is_perfect(n)`, проверяющую, является ли число совершенным (равно сумме своих делителей, кроме себя).",
    difficulty: 2,
    starterCode: `def is_perfect(n):\n    # ваш код\n    pass\n\nprint(is_perfect(int(input())))`,
    tests: [
      { input: "6", expected: "True" },
      { input: "28", expected: "True" },
      { input: "12", expected: "False" },
    ],
    hints: [
      "Найдите все делители от 1 до n-1",
      "Для эффективности проверяйте делители до sqrt(n)",
    ],
  },
  {
    id: "dc-046",
    title: "Спиральная матрица",
    description: "Напишите функцию `spiral(n)`, которая возвращает матрицу n x n, заполненную числами 1..n*n по спирали (слева направо, сверху вниз, справа налево, снизу вверх).",
    difficulty: 3,
    starterCode: `def spiral(n):\n    # ваш код\n    pass\n\nmatrix = spiral(int(input()))\nfor row in matrix:\n    print(*row)`,
    tests: [
      { input: "3", expected: "1 2 3\n8 9 4\n7 6 5" },
      { input: "2", expected: "1 2\n4 3" },
    ],
    hints: [
      "Используйте 4 границы: top, bottom, left, right",
      "Заполняйте по кругу, сужая границы после каждого прохода",
    ],
  },
  {
    id: "dc-047",
    title: "Группировка по длине",
    description: "Напишите функцию `group_by_length(words)`, которая группирует слова по длине. Вывод: длина:слова через запятую, сортировка по длине.",
    difficulty: 2,
    starterCode: `def group_by_length(words):\n    # ваш код\n    pass\n\nwords = input().split()\ngroups = group_by_length(words)\nfor length in sorted(groups):\n    print(f"{length}:{','.join(groups[length])}")`,
    tests: [
      { input: "hi hey hello yo world", expected: "2:hi,yo\n3:hey\n5:hello,world" },
      { input: "a bb ccc", expected: "1:a\n2:bb\n3:ccc" },
    ],
    hints: [
      "Используйте словарь с ключом = длина слова",
      "defaultdict(list) упрощает добавление",
    ],
  },
  {
    id: "dc-048",
    title: "Количество путей в сетке",
    description: "Напишите функцию `grid_paths(m, n)`, считающую количество уникальных путей из левого верхнего в правый нижний угол сетки m x n (можно двигаться только вправо и вниз).",
    difficulty: 3,
    starterCode: `def grid_paths(m, n):\n    # ваш код\n    pass\n\nm, n = map(int, input().split())\nprint(grid_paths(m, n))`,
    tests: [
      { input: "2 3", expected: "3" },
      { input: "3 3", expected: "6" },
      { input: "3 7", expected: "28" },
    ],
    hints: [
      "Используйте динамическое программирование: dp[i][j] = dp[i-1][j] + dp[i][j-1]",
      "Или комбинаторика: C(m+n-2, m-1)",
    ],
  },
  {
    id: "dc-049",
    title: "Сжатие числа",
    description: "Напишите функцию `collatz(n)`, которая возвращает количество шагов до 1 в последовательности Коллатца (если чётное — делим на 2, нечётное — умножаем на 3 и прибавляем 1).",
    difficulty: 2,
    starterCode: `def collatz(n):\n    # ваш код\n    pass\n\nprint(collatz(int(input())))`,
    tests: [
      { input: "6", expected: "8" },
      { input: "1", expected: "0" },
      { input: "27", expected: "111" },
    ],
    hints: [
      "Считайте шаги в цикле while n != 1",
      "Чётное: n // 2, нечётное: 3 * n + 1",
    ],
  },
  {
    id: "dc-050",
    title: "Матрица: поворот на 90°",
    description: "Напишите функцию `rotate90(matrix)`, которая поворачивает матрицу на 90° по часовой стрелке.",
    difficulty: 3,
    starterCode: `def rotate90(matrix):\n    # ваш код\n    pass\n\nn = int(input())\nmatrix = []\nfor _ in range(n):\n    row = list(map(int, input().split()))\n    matrix.append(row)\nresult = rotate90(matrix)\nfor row in result:\n    print(*row)`,
    tests: [
      { input: "3\n1 2 3\n4 5 6\n7 8 9", expected: "7 4 1\n8 5 2\n9 6 3" },
      { input: "2\n1 2\n3 4", expected: "3 1\n4 2" },
    ],
    hints: [
      "Поворот = транспонирование + разворот каждой строки",
      "Или используйте list(zip(*matrix[::-1]))",
    ],
  },
  {
    id: "dc-051",
    title: "Шифр Виженера",
    description: "Напишите функцию `vigenere(text, key)`, которая шифрует текст шифром Виженера (только строчные буквы). Ввод: текст и ключ на отдельных строках.",
    difficulty: 3,
    starterCode: `def vigenere(text, key):\n    # ваш код\n    pass\n\ntext = input()\nkey = input()\nprint(vigenere(text, key))`,
    tests: [
      { input: "hello\nkey", expected: "rijvs" },
      { input: "abc\nabc", expected: "ace" },
    ],
    hints: [
      "Каждая буква ключа задаёт сдвиг: a=0, b=1, ..., z=25",
      "Ключ циклически повторяется: key[i % len(key)]",
    ],
  },
  {
    id: "dc-052",
    title: "Двоичный поиск",
    description: "Реализуйте бинарный поиск. Функция `binary_search(lst, target)` возвращает индекс target в отсортированном списке или -1. Ввод: первая строка — список, вторая — target.",
    difficulty: 2,
    starterCode: `def binary_search(lst, target):\n    # ваш код\n    pass\n\nnums = list(map(int, input().split()))\ntarget = int(input())\nprint(binary_search(nums, target))`,
    tests: [
      { input: "1 3 5 7 9\n5", expected: "2" },
      { input: "1 3 5 7 9\n4", expected: "-1" },
      { input: "2 4 6 8 10\n10", expected: "4" },
    ],
    hints: [
      "Используйте два указателя: left и right",
      "Сравнивайте средний элемент с target и сужайте диапазон",
    ],
  },
];

function hashDateToIndex(dateStr: string): number {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    const char = dateStr.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  return Math.abs(hash) % challenges.length;
}

function getDateStr(): string {
  const d = new Date();
  return d.toISOString().split("T")[0];
}

export function getTodayChallenge(): DailyChallenge {
  return getChallengeByDate(getDateStr());
}

export function getChallengeByDate(dateStr: string): DailyChallenge {
  const index = hashDateToIndex(dateStr);
  return challenges[index];
}

export function getAllChallenges(): DailyChallenge[] {
  return challenges;
}
