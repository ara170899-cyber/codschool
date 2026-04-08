import { Problem } from "@/types/problems";

export const extraProblems: Problem[] = [
  // ==================== MEDIUM (11-20) ====================

  // 11. group-anagrams
  {
    id: "11",
    slug: "group-anagrams",
    title: "Группировка анаграмм",
    difficulty: "medium",
    tags: ["hash-map", "strings", "sorting"],
    description: `Дан список слов. Необходимо сгруппировать анаграммы — слова, состоящие из одних и тех же букв, но в разном порядке.

Два слова являются анаграммами, если одно можно получить из другого перестановкой букв. Например, "eat" и "tea" — анаграммы, так как оба содержат буквы e, a, t.

**Формат ввода:**
Строка, содержащая слова через пробел. Все слова состоят из строчных латинских букв.

**Формат вывода:**
Группы анаграмм, разделённые точкой с запятой ("; "). Слова внутри группы — через пробел. Порядок групп и слов внутри группы — в порядке первого появления.`,
    examples: [
      {
        input: "eat tea tan ate nat bat",
        output: "eat tea ate; tan nat; bat",
        explanation:
          '"eat", "tea", "ate" — анаграммы (буквы a, e, t). "tan", "nat" — анаграммы (буквы a, n, t). "bat" — единственное слово с буквами a, b, t.',
      },
      {
        input: "a",
        output: "a",
        explanation: "Одно слово образует одну группу.",
      },
      {
        input: "abc bca cab xyz zyx",
        output: "abc bca cab; xyz zyx",
      },
    ],
    constraints: [
      "1 <= количество слов <= 1000",
      "1 <= длина слова <= 100",
      "Слова состоят из строчных латинских букв",
    ],
    starterCode: `def group_anagrams(words):
    pass

print(group_anagrams(input().split()))`,
    testCases: [
      {
        input: "eat tea tan ate nat bat",
        expected: "eat tea ate; tan nat; bat",
      },
      { input: "a", expected: "a" },
      { input: "abc bca cab xyz zyx", expected: "abc bca cab; xyz zyx" },
      {
        input: "listen silent hello world dlrow",
        expected: "listen silent; hello; world dlrow",
        hidden: true,
      },
    ],
    hints: [
      "Подумайте, что общего у всех анаграмм? Если отсортировать буквы в слове, что получится?",
      "Используйте словарь (dict), где ключ — отсортированное слово, а значение — список анаграмм.",
      'Для каждого слова вычислите ключ: "".join(sorted(word)), и добавьте слово в соответствующий список.',
    ],
    solution: `def group_anagrams(words):
    groups = {}
    for word in words:
        key = "".join(sorted(word))
        if key not in groups:
            groups[key] = []
        groups[key].append(word)
    return "; ".join(" ".join(g) for g in groups.values())

print(group_anagrams(input().split()))`,
    acceptance: 62,
  },

  // 12. longest-substring
  {
    id: "12",
    slug: "longest-substring",
    title: "Наибольшая подстрока без повторов",
    difficulty: "medium",
    tags: ["strings", "two-pointers", "hash-map"],
    description: `Дана строка. Найдите длину наибольшей подстроки, которая не содержит повторяющихся символов.

Подстрока — это непрерывная последовательность символов внутри строки. Например, "abc" является подстрокой "xabcy", но "ac" — нет.

**Формат ввода:**
Одна строка, состоящая из латинских букв, цифр, пробелов и знаков препинания.

**Формат вывода:**
Одно целое число — длина наибольшей подстроки без повторяющихся символов.`,
    examples: [
      {
        input: "abcabcbb",
        output: "3",
        explanation:
          'Наибольшая подстрока без повторов — "abc", её длина 3. После неё символ "a" повторяется.',
      },
      {
        input: "bbbbb",
        output: "1",
        explanation:
          'Все символы одинаковые, поэтому наибольшая подстрока — любой одиночный символ "b", длина 1.',
      },
      {
        input: "pwwkew",
        output: "3",
        explanation:
          'Наибольшая подстрока — "wke" (длина 3). Обратите внимание, что "pwke" — подпоследовательность, а не подстрока.',
      },
    ],
    constraints: [
      "0 <= длина строки <= 50000",
      "Строка содержит латинские буквы, цифры, пробелы и символы",
    ],
    starterCode: `def longest_substring(s):
    pass

print(longest_substring(input()))`,
    testCases: [
      { input: "abcabcbb", expected: "3" },
      { input: "bbbbb", expected: "1" },
      { input: "pwwkew", expected: "3" },
      { input: "", expected: "0" },
      { input: "abcdefg", expected: "7", hidden: true },
    ],
    hints: [
      "Попробуйте метод скользящего окна: поддерживайте два указателя — начало и конец текущей подстроки.",
      "Используйте множество (set) для отслеживания символов в текущем окне.",
      "Когда встречаете повторяющийся символ, сдвигайте левый указатель вправо, пока дубликат не будет удалён.",
    ],
    solution: `def longest_substring(s):
    char_set = set()
    left = 0
    max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len

print(longest_substring(input()))`,
    acceptance: 55,
  },

  // 13. three-sum
  {
    id: "13",
    slug: "three-sum",
    title: "Сумма трёх чисел",
    difficulty: "medium",
    tags: ["arrays", "two-pointers", "sorting"],
    description: `Дан список целых чисел. Найдите все уникальные тройки чисел, сумма которых равна нулю.

Тройки не должны повторяться. Порядок чисел внутри тройки — по возрастанию.

**Формат ввода:**
Целые числа через пробел.

**Формат вывода:**
Тройки через точку с запятой ("; "). Числа внутри тройки через пробел, в порядке возрастания. Тройки отсортированы лексикографически. Если троек нет — вывести "none".`,
    examples: [
      {
        input: "-1 0 1 2 -1 -4",
        output: "-1 -1 2; -1 0 1",
        explanation:
          "Тройки: (-1, -1, 2) — сумма 0 и (-1, 0, 1) — сумма 0. Тройка (-4, 2, 2) невозможна, так как 2 встречается только один раз.",
      },
      {
        input: "0 0 0",
        output: "0 0 0",
        explanation: "Единственная тройка (0, 0, 0) даёт сумму 0.",
      },
      {
        input: "1 2 3",
        output: "none",
        explanation:
          "Невозможно выбрать тройку с суммой 0 из положительных чисел.",
      },
    ],
    constraints: [
      "3 <= количество чисел <= 3000",
      "-100000 <= каждое число <= 100000",
    ],
    starterCode: `def three_sum(nums):
    pass

nums = list(map(int, input().split()))
print(three_sum(nums))`,
    testCases: [
      { input: "-1 0 1 2 -1 -4", expected: "-1 -1 2; -1 0 1" },
      { input: "0 0 0", expected: "0 0 0" },
      { input: "1 2 3", expected: "none" },
      {
        input: "-2 0 1 1 2",
        expected: "-2 0 2; -2 1 1",
        hidden: true,
      },
    ],
    hints: [
      "Отсортируйте массив. Это позволит легко пропускать дубликаты и использовать два указателя.",
      "Зафиксируйте первый элемент тройки и ищите пару с нужной суммой среди оставшихся элементов.",
      "Для поиска пары используйте два указателя: один с начала оставшейся части, другой с конца.",
    ],
    solution: `def three_sum(nums):
    nums.sort()
    result = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, len(nums) - 1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s == 0:
                result.append(f"{nums[i]} {nums[left]} {nums[right]}")
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1
            elif s < 0:
                left += 1
            else:
                right -= 1
    return "; ".join(result) if result else "none"

nums = list(map(int, input().split()))
print(three_sum(nums))`,
    acceptance: 48,
  },

  // 14. binary-search
  {
    id: "14",
    slug: "binary-search",
    title: "Бинарный поиск",
    difficulty: "medium",
    tags: ["arrays", "searching"],
    description: `Реализуйте алгоритм бинарного поиска. Дан отсортированный по возрастанию массив целых чисел и целевое значение. Верните индекс целевого значения в массиве (нумерация с 0) или -1, если элемент не найден.

Алгоритм должен работать за O(log n) времени.

**Формат ввода:**
Первая строка — целые числа через пробел (отсортированный массив).
Вторая строка — целое число (целевое значение).

**Формат вывода:**
Одно целое число — индекс элемента или -1.`,
    examples: [
      {
        input: "-1 0 3 5 9 12\n9",
        output: "4",
        explanation:
          "Число 9 находится в массиве на позиции с индексом 4 (нумерация с 0).",
      },
      {
        input: "-1 0 3 5 9 12\n2",
        output: "-1",
        explanation: "Числа 2 нет в массиве, возвращаем -1.",
      },
      {
        input: "5\n5",
        output: "0",
        explanation: "Массив из одного элемента, целевое значение совпадает.",
      },
    ],
    constraints: [
      "1 <= длина массива <= 10000",
      "-10000 <= элемент <= 10000",
      "Массив отсортирован по возрастанию",
      "Все элементы уникальны",
    ],
    starterCode: `def binary_search(nums, target):
    pass

nums = list(map(int, input().split()))
target = int(input())
print(binary_search(nums, target))`,
    testCases: [
      { input: "-1 0 3 5 9 12\n9", expected: "4" },
      { input: "-1 0 3 5 9 12\n2", expected: "-1" },
      { input: "5\n5", expected: "0" },
      { input: "1 2 3 4 5 6 7 8 9 10\n1", expected: "0", hidden: true },
      { input: "1 2 3 4 5 6 7 8 9 10\n10", expected: "9", hidden: true },
    ],
    hints: [
      "Поддерживайте два указателя: left и right, обозначающие границы области поиска.",
      "На каждом шаге вычисляйте mid = (left + right) // 2 и сравнивайте nums[mid] с target.",
      "Если nums[mid] == target — ответ найден. Если nums[mid] < target — ищите в правой половине. Иначе — в левой.",
    ],
    solution: `def binary_search(nums, target):
    left, right = 0, len(nums) - 1
    while left <= right:
        mid = (left + right) // 2
        if nums[mid] == target:
            return mid
        elif nums[mid] < target:
            left = mid + 1
        else:
            right = mid - 1
    return -1

nums = list(map(int, input().split()))
target = int(input())
print(binary_search(nums, target))`,
    acceptance: 72,
  },

  // 15. rotate-array
  {
    id: "15",
    slug: "rotate-array",
    title: "Сдвиг массива",
    difficulty: "medium",
    tags: ["arrays", "math"],
    description: `Дан массив целых чисел и число k. Сдвиньте массив вправо на k позиций. При сдвиге вправо последний элемент перемещается в начало.

Например, при сдвиге [1, 2, 3, 4, 5] на 2 позиции вправо: сначала 5 уходит в начало → [5, 1, 2, 3, 4], потом 4 уходит в начало → [4, 5, 1, 2, 3].

**Формат ввода:**
Первая строка — целые числа через пробел (массив).
Вторая строка — целое число k (количество сдвигов).

**Формат вывода:**
Результат через пробел.`,
    examples: [
      {
        input: "1 2 3 4 5\n2",
        output: "4 5 1 2 3",
        explanation: "Сдвигаем на 2 вправо: [1,2,3,4,5] → [4,5,1,2,3].",
      },
      {
        input: "1 2 3\n4",
        output: "3 1 2",
        explanation:
          "k=4 > длина массива (3). 4 mod 3 = 1, сдвигаем на 1: [1,2,3] → [3,1,2].",
      },
      {
        input: "10 20 30 40\n0",
        output: "10 20 30 40",
        explanation: "При k=0 массив не меняется.",
      },
    ],
    constraints: [
      "1 <= длина массива <= 10000",
      "0 <= k <= 100000",
      "-1000000 <= элемент <= 1000000",
    ],
    starterCode: `def rotate_array(nums, k):
    pass

nums = list(map(int, input().split()))
k = int(input())
print(rotate_array(nums, k))`,
    testCases: [
      { input: "1 2 3 4 5\n2", expected: "4 5 1 2 3" },
      { input: "1 2 3\n4", expected: "3 1 2" },
      { input: "10 20 30 40\n0", expected: "10 20 30 40" },
      { input: "1\n5", expected: "1", hidden: true },
    ],
    hints: [
      "Если k >= длина массива, используйте k % len(nums), так как полный цикл сдвигов возвращает массив в исходное состояние.",
      "Используйте срезы Python: nums[-k:] + nums[:-k].",
      "Альтернативно: разверните весь массив, потом первые k элементов, потом оставшиеся.",
    ],
    solution: `def rotate_array(nums, k):
    n = len(nums)
    k = k % n
    if k == 0:
        return " ".join(map(str, nums))
    result = nums[-k:] + nums[:-k]
    return " ".join(map(str, result))

nums = list(map(int, input().split()))
k = int(input())
print(rotate_array(nums, k))`,
    acceptance: 65,
  },

  // 16. matrix-spiral
  {
    id: "16",
    slug: "matrix-spiral",
    title: "Спиральный обход матрицы",
    difficulty: "medium",
    tags: ["arrays", "math"],
    description: `Дана матрица NxM целых чисел. Обойдите её по спирали, начиная с верхнего левого угла, двигаясь по часовой стрелке: сначала вправо, потом вниз, потом влево, потом вверх, и так далее.

**Формат ввода:**
Первая строка — число N (количество строк).
Следующие N строк — элементы матрицы через пробел.

**Формат вывода:**
Элементы матрицы через пробел в порядке спирального обхода.`,
    examples: [
      {
        input: "3\n1 2 3\n4 5 6\n7 8 9",
        output: "1 2 3 6 9 8 7 4 5",
        explanation:
          "Обход: верхний ряд (1,2,3) → правый столбец (6,9) → нижний ряд справа-налево (8,7) → левый столбец снизу-вверх (4) → центр (5).",
      },
      {
        input: "2\n1 2 3 4\n5 6 7 8",
        output: "1 2 3 4 8 7 6 5",
        explanation:
          "Обход: верхний ряд (1,2,3,4) → правый столбец (8) → нижний ряд (7,6,5).",
      },
      {
        input: "1\n1 2 3",
        output: "1 2 3",
        explanation: "Одна строка — просто выводим все элементы.",
      },
    ],
    constraints: [
      "1 <= N, M <= 100",
      "-1000 <= элемент <= 1000",
    ],
    starterCode: `def spiral_order(matrix):
    pass

n = int(input())
matrix = []
for _ in range(n):
    matrix.append(list(map(int, input().split())))
print(spiral_order(matrix))`,
    testCases: [
      { input: "3\n1 2 3\n4 5 6\n7 8 9", expected: "1 2 3 6 9 8 7 4 5" },
      { input: "2\n1 2 3 4\n5 6 7 8", expected: "1 2 3 4 8 7 6 5" },
      { input: "1\n1 2 3", expected: "1 2 3", hidden: true },
    ],
    hints: [
      "Поддерживайте четыре границы: top, bottom, left, right. Сужайте их после каждого прохода.",
      "Порядок обхода: вправо по top → вниз по right → влево по bottom → вверх по left.",
      "После каждого направления сдвигайте соответствующую границу и проверяйте, что границы не пересеклись.",
    ],
    solution: `def spiral_order(matrix):
    if not matrix:
        return ""
    result = []
    top, bottom = 0, len(matrix) - 1
    left, right = 0, len(matrix[0]) - 1
    while top <= bottom and left <= right:
        for i in range(left, right + 1):
            result.append(matrix[top][i])
        top += 1
        for i in range(top, bottom + 1):
            result.append(matrix[i][right])
        right -= 1
        if top <= bottom:
            for i in range(right, left - 1, -1):
                result.append(matrix[bottom][i])
            bottom -= 1
        if left <= right:
            for i in range(bottom, top - 1, -1):
                result.append(matrix[i][left])
            left += 1
    return " ".join(map(str, result))

n = int(input())
matrix = []
for _ in range(n):
    matrix.append(list(map(int, input().split())))
print(spiral_order(matrix))`,
    acceptance: 50,
  },

  // 17. coin-change
  {
    id: "17",
    slug: "coin-change",
    title: "Размен монет",
    difficulty: "medium",
    tags: ["dp", "arrays"],
    description: `Дан набор номиналов монет и целевая сумма. Найдите минимальное количество монет, необходимое для набора этой суммы. Каждую монету можно использовать неограниченное количество раз.

Если набрать указанную сумму невозможно, верните -1.

**Формат ввода:**
Первая строка — номиналы монет через пробел.
Вторая строка — целевая сумма.

**Формат вывода:**
Одно целое число — минимальное количество монет или -1.`,
    examples: [
      {
        input: "1 2 5\n11",
        output: "3",
        explanation:
          "11 = 5 + 5 + 1. Три монеты — минимальное количество. Варианты 5+2+2+2=11 (4 монеты), 2+2+2+2+2+1=11 (6 монет) — хуже.",
      },
      {
        input: "2\n3",
        output: "-1",
        explanation:
          "Монетами номинала 2 невозможно набрать нечётную сумму 3.",
      },
      {
        input: "1\n0",
        output: "0",
        explanation: "Для суммы 0 не нужно ни одной монеты.",
      },
    ],
    constraints: [
      "1 <= количество номиналов <= 12",
      "1 <= номинал <= 2^31 - 1",
      "0 <= сумма <= 10000",
    ],
    starterCode: `def coin_change(coins, amount):
    pass

coins = list(map(int, input().split()))
amount = int(input())
print(coin_change(coins, amount))`,
    testCases: [
      { input: "1 2 5\n11", expected: "3" },
      { input: "2\n3", expected: "-1" },
      { input: "1\n0", expected: "0" },
      { input: "1 5 10 25\n30", expected: "2", hidden: true },
      { input: "3 7\n15", expected: "3", hidden: true },
    ],
    hints: [
      "Это классическая задача динамического программирования. Создайте массив dp, где dp[i] — минимальное количество монет для суммы i.",
      "Инициализируйте dp[0] = 0, остальные = infinity. Для каждой суммы переберите все номиналы.",
      "Формула: dp[i] = min(dp[i], dp[i - coin] + 1) для каждой монеты coin, если i >= coin.",
    ],
    solution: `def coin_change(coins, amount):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    for i in range(1, amount + 1):
        for coin in coins:
            if coin <= i and dp[i - coin] + 1 < dp[i]:
                dp[i] = dp[i - coin] + 1
    return dp[amount] if dp[amount] != float('inf') else -1

coins = list(map(int, input().split()))
amount = int(input())
print(coin_change(coins, amount))`,
    acceptance: 52,
  },

  // 18. sort-colors
  {
    id: "18",
    slug: "sort-colors",
    title: "Сортировка цветов (Dutch National Flag)",
    difficulty: "medium",
    tags: ["arrays", "two-pointers", "sorting"],
    description: `Дан массив, содержащий только числа 0, 1 и 2 (представляют три цвета). Отсортируйте массив за один проход, используя алгоритм «Голландский национальный флаг» (Dutch National Flag).

Алгоритм должен работать in-place за O(n) времени и O(1) дополнительной памяти.

**Формат ввода:**
Числа 0, 1, 2 через пробел.

**Формат вывода:**
Отсортированные числа через пробел.`,
    examples: [
      {
        input: "2 0 2 1 1 0",
        output: "0 0 1 1 2 2",
        explanation:
          "Все нули перемещаются в начало, единицы в середину, двойки в конец.",
      },
      {
        input: "2 0 1",
        output: "0 1 2",
      },
      {
        input: "0 0 0",
        output: "0 0 0",
        explanation: "Массив уже отсортирован.",
      },
    ],
    constraints: [
      "1 <= длина массива <= 10000",
      "Элементы: только 0, 1, 2",
    ],
    starterCode: `def sort_colors(nums):
    pass

nums = list(map(int, input().split()))
print(sort_colors(nums))`,
    testCases: [
      { input: "2 0 2 1 1 0", expected: "0 0 1 1 2 2" },
      { input: "2 0 1", expected: "0 1 2" },
      { input: "0 0 0", expected: "0 0 0" },
      { input: "1 2 0 1 2 0 1 2 0", expected: "0 0 0 1 1 1 2 2 2", hidden: true },
    ],
    hints: [
      "Используйте три указателя: low (граница нулей), mid (текущий), high (граница двоек).",
      "Если nums[mid] == 0 — поменяйте с nums[low], увеличьте low и mid.",
      "Если nums[mid] == 2 — поменяйте с nums[high], уменьшите high. Если nums[mid] == 1 — просто увеличьте mid.",
    ],
    solution: `def sort_colors(nums):
    low, mid, high = 0, 0, len(nums) - 1
    while mid <= high:
        if nums[mid] == 0:
            nums[low], nums[mid] = nums[mid], nums[low]
            low += 1
            mid += 1
        elif nums[mid] == 1:
            mid += 1
        else:
            nums[mid], nums[high] = nums[high], nums[mid]
            high -= 1
    return " ".join(map(str, nums))

nums = list(map(int, input().split()))
print(sort_colors(nums))`,
    acceptance: 67,
  },

  // 19. validate-bst
  {
    id: "19",
    slug: "validate-bst",
    title: "Проверка BST",
    difficulty: "medium",
    tags: ["arrays", "sorting"],
    description: `Дан список чисел, представляющий in-order (симметричный) обход бинарного дерева. Определите, является ли это дерево бинарным деревом поиска (BST).

Свойство BST: для каждого узла все элементы в левом поддереве строго меньше, а в правом — строго больше. Это значит, что in-order обход BST всегда даёт строго возрастающую последовательность.

**Формат ввода:**
Целые числа через пробел (in-order обход дерева).

**Формат вывода:**
"yes" — если последовательность строго возрастающая (дерево является BST), "no" — иначе.`,
    examples: [
      {
        input: "1 3 5 7 9",
        output: "yes",
        explanation:
          "Последовательность строго возрастает: 1 < 3 < 5 < 7 < 9. Это корректный in-order обход BST.",
      },
      {
        input: "1 3 3 7 9",
        output: "no",
        explanation:
          "Число 3 повторяется. В BST не допускаются равные элементы, поэтому последовательность не является in-order обходом BST.",
      },
      {
        input: "5 3 7",
        output: "no",
        explanation: "5 > 3 — последовательность не является строго возрастающей.",
      },
    ],
    constraints: [
      "1 <= количество чисел <= 10000",
      "-1000000 <= число <= 1000000",
    ],
    starterCode: `def validate_bst(nums):
    pass

nums = list(map(int, input().split()))
print(validate_bst(nums))`,
    testCases: [
      { input: "1 3 5 7 9", expected: "yes" },
      { input: "1 3 3 7 9", expected: "no" },
      { input: "5 3 7", expected: "no" },
      { input: "42", expected: "yes", hidden: true },
    ],
    hints: [
      "In-order обход BST даёт строго возрастающую последовательность. Достаточно проверить это свойство.",
      "Пройдите по массиву и проверьте, что каждый элемент строго больше предыдущего.",
      "Если хотя бы одна пара нарушает условие — ответ 'no'.",
    ],
    solution: `def validate_bst(nums):
    for i in range(1, len(nums)):
        if nums[i] <= nums[i - 1]:
            return "no"
    return "yes"

nums = list(map(int, input().split()))
print(validate_bst(nums))`,
    acceptance: 74,
  },

  // 20. word-frequency
  {
    id: "20",
    slug: "word-frequency",
    title: "Частотный анализ слов",
    difficulty: "medium",
    tags: ["hash-map", "strings", "sorting"],
    description: `Дан текст и число K. Найдите K самых часто встречающихся слов в тексте. Слова приводятся к нижнему регистру. При одинаковой частоте слова сортируются в алфавитном порядке.

**Формат ввода:**
Первая строка — текст (слова через пробел, могут быть заглавные буквы).
Вторая строка — число K.

**Формат вывода:**
K слов через пробел, от самого частого к самому редкому. При одинаковой частоте — в алфавитном порядке.`,
    examples: [
      {
        input: "the day is sunny the the the sunny is is\n4",
        output: "the is sunny day",
        explanation:
          '"the" — 4 раза, "is" — 3 раза, "sunny" — 2 раза, "day" — 1 раз.',
      },
      {
        input: "hello world hello\n1",
        output: "hello",
        explanation: '"hello" встречается 2 раза — чаще всего.',
      },
      {
        input: "a b c a b a\n2",
        output: "a b",
        explanation: '"a" — 3 раза, "b" — 2 раза, "c" — 1 раз. Выводим 2 самых частых.',
      },
    ],
    constraints: [
      "1 <= количество слов <= 10000",
      "1 <= K <= количество уникальных слов",
      "Слова содержат только латинские буквы",
    ],
    starterCode: `def word_frequency(text, k):
    pass

text = input()
k = int(input())
print(word_frequency(text, k))`,
    testCases: [
      {
        input: "the day is sunny the the the sunny is is\n4",
        expected: "the is sunny day",
      },
      { input: "hello world hello\n1", expected: "hello" },
      { input: "a b c a b a\n2", expected: "a b" },
      {
        input: "Cat cat CAT dog DOG\n2",
        expected: "cat dog",
        hidden: true,
      },
    ],
    hints: [
      "Приведите все слова к нижнему регистру с помощью .lower().",
      "Подсчитайте частоту каждого слова с помощью словаря или collections.Counter.",
      "Отсортируйте по частоте (убывание), при равенстве — по алфавиту (возрастание).",
    ],
    solution: `def word_frequency(text, k):
    words = text.lower().split()
    freq = {}
    for word in words:
        freq[word] = freq.get(word, 0) + 1
    sorted_words = sorted(freq.keys(), key=lambda w: (-freq[w], w))
    return " ".join(sorted_words[:k])

text = input()
k = int(input())
print(word_frequency(text, k))`,
    acceptance: 60,
  },

  // ==================== HARD (21-25) ====================

  // 21. median-sorted-arrays
  {
    id: "21",
    slug: "median-sorted-arrays",
    title: "Медиана двух отсортированных массивов",
    difficulty: "hard",
    tags: ["arrays", "searching", "math"],
    description: `Даны два отсортированных массива целых чисел. Найдите медиану объединённого отсортированного массива.

Медиана — это значение, которое делит отсортированный массив на две равные половины. Если общее количество элементов чётное, медиана — среднее арифметическое двух центральных элементов.

Результат выводите как число с одним знаком после запятой.

**Формат ввода:**
Первая строка — первый массив (целые числа через пробел).
Вторая строка — второй массив (целые числа через пробел).

**Формат вывода:**
Медиана с одним знаком после запятой.`,
    examples: [
      {
        input: "1 3\n2",
        output: "2.0",
        explanation:
          "Объединённый массив: [1, 2, 3]. Медиана — центральный элемент: 2. Выводим 2.0.",
      },
      {
        input: "1 2\n3 4",
        output: "2.5",
        explanation:
          "Объединённый массив: [1, 2, 3, 4]. Два центральных: 2 и 3. Медиана = (2 + 3) / 2 = 2.5.",
      },
      {
        input: "0 0\n0 0",
        output: "0.0",
      },
    ],
    constraints: [
      "1 <= длина каждого массива <= 10000",
      "-1000000 <= элемент <= 1000000",
      "Массивы отсортированы по возрастанию",
    ],
    starterCode: `def find_median(nums1, nums2):
    pass

nums1 = list(map(int, input().split()))
nums2 = list(map(int, input().split()))
print(find_median(nums1, nums2))`,
    testCases: [
      { input: "1 3\n2", expected: "2.0" },
      { input: "1 2\n3 4", expected: "2.5" },
      { input: "0 0\n0 0", expected: "0.0" },
      { input: "1 2 3 4 5\n6 7 8 9 10", expected: "5.5", hidden: true },
    ],
    hints: [
      "Простой способ: объедините два массива, отсортируйте и найдите медиану. Это O((n+m) log(n+m)).",
      "Оптимальный способ: используйте бинарный поиск по меньшему массиву. Это O(log(min(n,m))).",
      "Идея: разделите оба массива так, чтобы левая часть содержала ровно половину всех элементов, и все элементы слева <= всех элементов справа.",
    ],
    solution: `def find_median(nums1, nums2):
    merged = sorted(nums1 + nums2)
    n = len(merged)
    if n % 2 == 1:
        return f"{merged[n // 2]:.1f}"
    else:
        return f"{(merged[n // 2 - 1] + merged[n // 2]) / 2:.1f}"

nums1 = list(map(int, input().split()))
nums2 = list(map(int, input().split()))
print(find_median(nums1, nums2))`,
    acceptance: 38,
  },

  // 22. longest-palindrome-substring
  {
    id: "22",
    slug: "longest-palindrome-substring",
    title: "Наибольшая подстрока-палиндром",
    difficulty: "hard",
    tags: ["strings", "dp"],
    description: `Дана строка. Найдите наибольшую подстроку, которая является палиндромом (читается одинаково слева направо и справа налево).

Если существует несколько палиндромов одинаковой максимальной длины, верните тот, который начинается раньше.

**Формат ввода:**
Одна строка, состоящая из строчных латинских букв.

**Формат вывода:**
Наибольшая подстрока-палиндром.`,
    examples: [
      {
        input: "babad",
        output: "bab",
        explanation:
          'Палиндромы: "b", "a", "d", "bab", "aba". Наибольшие: "bab" и "aba" (длина 3). Возвращаем "bab", так как он начинается раньше.',
      },
      {
        input: "cbbd",
        output: "bb",
        explanation: 'Наибольший палиндром — "bb" (длина 2).',
      },
      {
        input: "racecar",
        output: "racecar",
        explanation: "Вся строка является палиндромом.",
      },
    ],
    constraints: [
      "1 <= длина строки <= 1000",
      "Строка содержит только строчные латинские буквы",
    ],
    starterCode: `def longest_palindrome(s):
    pass

print(longest_palindrome(input()))`,
    testCases: [
      { input: "babad", expected: "bab" },
      { input: "cbbd", expected: "bb" },
      { input: "racecar", expected: "racecar" },
      { input: "a", expected: "a", hidden: true },
    ],
    hints: [
      "Палиндром можно расширять от центра. Каждый символ (и промежуток между символами) может быть центром палиндрома.",
      "Для каждого центра расширяйте влево и вправо, пока символы совпадают.",
      "Не забудьте проверять палиндромы как нечётной (центр — символ), так и чётной (центр — между символами) длины.",
    ],
    solution: `def longest_palindrome(s):
    if not s:
        return ""
    start, max_len = 0, 1

    def expand(left, right):
        nonlocal start, max_len
        while left >= 0 and right < len(s) and s[left] == s[right]:
            if right - left + 1 > max_len:
                start = left
                max_len = right - left + 1
            left -= 1
            right += 1

    for i in range(len(s)):
        expand(i, i)
        expand(i, i + 1)

    return s[start:start + max_len]

print(longest_palindrome(input()))`,
    acceptance: 42,
  },

  // 23. trapping-rain-water
  {
    id: "23",
    slug: "trapping-rain-water",
    title: "Ловушка для дождевой воды",
    difficulty: "hard",
    tags: ["arrays", "two-pointers", "dp"],
    description: `Дан массив неотрицательных целых чисел, представляющий высоты столбцов шириной 1. Определите, сколько единиц воды может быть собрано между столбцами после дождя.

Вода удерживается между более высокими столбцами. Количество воды над каждым столбцом определяется минимумом из максимальных высот слева и справа, минус высота самого столбца.

**Формат ввода:**
Неотрицательные целые числа через пробел (высоты столбцов).

**Формат вывода:**
Одно целое число — общий объём воды.`,
    examples: [
      {
        input: "0 1 0 2 1 0 1 3 2 1 2 1",
        output: "6",
        explanation:
          "Между столбцами собирается 6 единиц воды. Над позицией 2 (высота 0) — 1 единица (ограничена столбцами высоты 1 и 2). Над позицией 5 (высота 0) — 2 единицы (ограничена 2 и 3).",
      },
      {
        input: "4 2 0 3 2 5",
        output: "9",
        explanation:
          "Вода: позиция 1 (4-2=2), позиция 2 (3-0=3), позиция 3 (3-3=0), позиция 4 (3-2=1). Но с учётом обеих сторон — суммарно 9.",
      },
      {
        input: "1 2 3 4 5",
        output: "0",
        explanation: "Массив возрастает — вода не может задержаться.",
      },
    ],
    constraints: [
      "1 <= длина массива <= 20000",
      "0 <= высота <= 100000",
    ],
    starterCode: `def trap(height):
    pass

height = list(map(int, input().split()))
print(trap(height))`,
    testCases: [
      { input: "0 1 0 2 1 0 1 3 2 1 2 1", expected: "6" },
      { input: "4 2 0 3 2 5", expected: "9" },
      { input: "1 2 3 4 5", expected: "0" },
      { input: "3 0 0 0 3", expected: "9", hidden: true },
    ],
    hints: [
      "Для каждой позиции объём воды = min(max_left, max_right) - height[i], если это значение > 0.",
      "Можно предвычислить массивы max_left и max_right за два прохода.",
      "Оптимальнее: используйте два указателя (left и right), двигаясь навстречу друг другу. Отслеживайте left_max и right_max.",
    ],
    solution: `def trap(height):
    if len(height) < 3:
        return 0
    left, right = 0, len(height) - 1
    left_max, right_max = height[left], height[right]
    water = 0
    while left < right:
        if left_max <= right_max:
            left += 1
            left_max = max(left_max, height[left])
            water += left_max - height[left]
        else:
            right -= 1
            right_max = max(right_max, height[right])
            water += right_max - height[right]
    return water

height = list(map(int, input().split()))
print(trap(height))`,
    acceptance: 35,
  },

  // 24. merge-intervals
  {
    id: "24",
    slug: "merge-intervals",
    title: "Объединение интервалов",
    difficulty: "hard",
    tags: ["arrays", "sorting"],
    description: `Дан список интервалов. Объедините все пересекающиеся интервалы и верните результат.

Два интервала пересекаются, если конец одного >= начала другого. Например, [1,3] и [2,6] пересекаются и объединяются в [1,6].

**Формат ввода:**
Пары чисел (начало и конец интервала) через точку с запятой. Числа внутри пары — через пробел.

**Формат вывода:**
Объединённые интервалы в том же формате, отсортированные по началу.`,
    examples: [
      {
        input: "1 3;2 6;8 10;15 18",
        output: "1 6;8 10;15 18",
        explanation:
          "Интервалы [1,3] и [2,6] пересекаются → [1,6]. Остальные не пересекаются.",
      },
      {
        input: "1 4;4 5",
        output: "1 5",
        explanation:
          "Интервалы [1,4] и [4,5] соприкасаются (конец первого = начало второго) → [1,5].",
      },
      {
        input: "1 4;2 3",
        output: "1 4",
        explanation:
          "Интервал [2,3] полностью внутри [1,4], поэтому результат — [1,4].",
      },
    ],
    constraints: [
      "1 <= количество интервалов <= 10000",
      "0 <= начало <= конец <= 100000",
    ],
    starterCode: `def merge_intervals(intervals_str):
    pass

print(merge_intervals(input()))`,
    testCases: [
      { input: "1 3;2 6;8 10;15 18", expected: "1 6;8 10;15 18" },
      { input: "1 4;4 5", expected: "1 5" },
      { input: "1 4;2 3", expected: "1 4" },
      { input: "1 10;2 3;4 5;6 7;8 9", expected: "1 10", hidden: true },
    ],
    hints: [
      "Сначала отсортируйте интервалы по началу.",
      "Поддерживайте текущий интервал. Если следующий пересекается — расширьте конец текущего.",
      "Если следующий интервал не пересекается — добавьте текущий в результат и начните новый.",
    ],
    solution: `def merge_intervals(intervals_str):
    pairs = intervals_str.split(";")
    intervals = []
    for p in pairs:
        a, b = map(int, p.strip().split())
        intervals.append([a, b])
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for i in range(1, len(intervals)):
        if intervals[i][0] <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], intervals[i][1])
        else:
            merged.append(intervals[i])
    return ";".join(f"{a} {b}" for a, b in merged)

print(merge_intervals(input()))`,
    acceptance: 45,
  },

  // 25. lru-cache
  {
    id: "25",
    slug: "lru-cache",
    title: "LRU Cache",
    difficulty: "hard",
    tags: ["hash-map", "linked-list"],
    description: `Реализуйте структуру данных LRU (Least Recently Used) Cache с заданной вместимостью.

Поддерживаемые операции:
- **get(key)** — вернуть значение по ключу. Если ключ не найден, вернуть -1. Операция делает элемент «недавно использованным».
- **put(key, value)** — добавить или обновить значение по ключу. Если кеш переполнен, удалить наименее недавно использованный элемент.

**Формат ввода:**
Первая строка — capacity (вместимость кеша).
Далее — команды, по одной на строку:
- "get K" — получить значение по ключу K
- "put K V" — записать значение V по ключу K

**Формат вывода:**
Для каждой операции get вывести значение (или -1) на отдельной строке. Операции put ничего не выводят.`,
    examples: [
      {
        input: "2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nget 3",
        output: "1\n-1\n3",
        explanation:
          "capacity=2. put(1,1), put(2,2) — кеш: {1:1, 2:2}. get(1)→1 (1 становится недавним). put(3,3) — кеш полон, удаляем наименее недавний (ключ 2). get(2)→-1 (удалён). get(3)→3.",
      },
      {
        input: "1\nput 1 10\nput 2 20\nget 1\nget 2",
        output: "-1\n20",
        explanation:
          "capacity=1. put(1,10) — кеш: {1:10}. put(2,20) — удаляем 1, кеш: {2:20}. get(1)→-1. get(2)→20.",
      },
      {
        input: "2\nput 1 1\nput 2 2\nput 1 10\nget 1\nget 2",
        output: "10\n2",
        explanation:
          "put(1,1), put(2,2). put(1,10) — обновляем значение ключа 1. get(1)→10. get(2)→2.",
      },
    ],
    constraints: [
      "1 <= capacity <= 1000",
      "0 <= key <= 10000",
      "0 <= value <= 100000",
      "Не более 10000 операций",
    ],
    starterCode: `def lru_cache():
    pass

lru_cache()`,
    testCases: [
      {
        input: "2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nget 3",
        expected: "1\n-1\n3",
      },
      {
        input: "1\nput 1 10\nput 2 20\nget 1\nget 2",
        expected: "-1\n20",
      },
      {
        input: "2\nput 1 1\nput 2 2\nput 1 10\nget 1\nget 2",
        expected: "10\n2",
        hidden: true,
      },
    ],
    hints: [
      "Используйте collections.OrderedDict — он поддерживает порядок вставки и быстрое перемещение элементов.",
      "При get: если ключ есть, переместите его в конец (move_to_end). При put: если кеш полон, удалите первый элемент (popitem(last=False)).",
      "Альтернатива: реализуйте двусвязный список + хеш-таблицу вручную.",
    ],
    solution: `def lru_cache():
    import sys
    from collections import OrderedDict

    lines = sys.stdin.read().strip().split("\\n")
    capacity = int(lines[0])
    cache = OrderedDict()
    output = []

    for i in range(1, len(lines)):
        parts = lines[i].split()
        if parts[0] == "get":
            key = int(parts[1])
            if key in cache:
                cache.move_to_end(key)
                output.append(str(cache[key]))
            else:
                output.append("-1")
        elif parts[0] == "put":
            key, value = int(parts[1]), int(parts[2])
            if key in cache:
                cache.move_to_end(key)
            cache[key] = value
            if len(cache) > capacity:
                cache.popitem(last=False)

    print("\\n".join(output))

lru_cache()`,
    acceptance: 32,
  },
];
