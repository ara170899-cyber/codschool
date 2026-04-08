import { Problem, Difficulty, ProblemTag } from "@/types/problems";

const problems: Problem[] = [
  // ==================== EASY (1-10) ====================
  {
    id: "1",
    slug: "two-sum",
    title: "Два числа с заданной суммой",
    difficulty: "easy",
    tags: ["arrays", "hash-map"],
    description: `Дан массив целых чисел \`nums\` и целое число \`target\`. Верните индексы двух чисел, сумма которых равна \`target\`.

Можно предполагать, что каждый набор входных данных имеет **ровно одно решение**, и нельзя использовать один и тот же элемент дважды.

Верните ответ в любом порядке в виде списка из двух индексов.`,
    examples: [
      { input: "nums = [2, 7, 11, 15], target = 9", output: "[0, 1]", explanation: "nums[0] + nums[1] = 2 + 7 = 9" },
      { input: "nums = [3, 2, 4], target = 6", output: "[1, 2]", explanation: "nums[1] + nums[2] = 2 + 4 = 6" },
      { input: "nums = [3, 3], target = 6", output: "[0, 1]" },
    ],
    constraints: [
      "2 <= len(nums) <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Существует ровно одно решение",
    ],
    starterCode: `def two_sum(nums: list[int], target: int) -> list[int]:
    # Ваш код здесь
    pass

# Не изменяйте код ниже
nums = list(map(int, input().split()))
target = int(input())
print(two_sum(nums, target))`,
    testCases: [
      { input: "2 7 11 15\n9", expected: "[0, 1]" },
      { input: "3 2 4\n6", expected: "[1, 2]" },
      { input: "3 3\n6", expected: "[0, 1]", hidden: true },
      { input: "1 5 3 7 2\n9", expected: "[1, 4]", hidden: true },
      { input: "-1 -2 -3 -4 -5\n-8", expected: "[2, 4]", hidden: true },
    ],
    hints: [
      "Попробуйте использовать словарь (hash map) для хранения уже просмотренных чисел.",
      "Для каждого числа проверьте, есть ли в словаре число target - nums[i].",
      "Сложность O(n) по времени и O(n) по памяти.",
    ],
    solution: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen = {}
    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i
    return []

nums = list(map(int, input().split()))
target = int(input())
print(two_sum(nums, target))`,
    acceptance: 78,
  },
  {
    id: "2",
    slug: "reverse-string",
    title: "Переверни строку",
    difficulty: "easy",
    tags: ["strings"],
    description: `Дана строка \`s\`. Верните строку в обратном порядке.

Решите задачу **без использования** встроенного метода \`[::-1]\` или \`reversed()\`. Используйте цикл или рекурсию.`,
    examples: [
      { input: 's = "hello"', output: '"olleh"' },
      { input: 's = "Python"', output: '"nohtyP"' },
    ],
    constraints: [
      "1 <= len(s) <= 10^5",
      "Строка содержит только ASCII символы",
    ],
    starterCode: `def reverse_string(s: str) -> str:
    # Ваш код здесь
    pass

print(reverse_string(input()))`,
    testCases: [
      { input: "hello", expected: "olleh" },
      { input: "Python", expected: "nohtyP" },
      { input: "a", expected: "a", hidden: true },
      { input: "abcdef", expected: "fedcba", hidden: true },
    ],
    hints: [
      "Создайте пустой результат и добавляйте символы с конца строки.",
      "Можно использовать два указателя: начало и конец.",
    ],
    solution: `def reverse_string(s: str) -> str:
    result = ""
    for i in range(len(s) - 1, -1, -1):
        result += s[i]
    return result

print(reverse_string(input()))`,
    acceptance: 85,
  },
  {
    id: "3",
    slug: "fizzbuzz",
    title: "FizzBuzz",
    difficulty: "easy",
    tags: ["math", "strings"],
    description: `Дано число \`n\`. Для каждого числа от 1 до n (включительно) выведите:
- \`"FizzBuzz"\` — если число делится на 3 и на 5
- \`"Fizz"\` — если делится только на 3
- \`"Buzz"\` — если делится только на 5
- Само число — в остальных случаях

Выведите результат в виде списка строк.`,
    examples: [
      { input: "n = 5", output: '["1", "2", "Fizz", "4", "Buzz"]' },
      { input: "n = 15", output: '["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]' },
    ],
    constraints: [
      "1 <= n <= 10^4",
    ],
    starterCode: `def fizzbuzz(n: int) -> list[str]:
    # Ваш код здесь
    pass

print(fizzbuzz(int(input())))`,
    testCases: [
      { input: "5", expected: '["1", "2", "Fizz", "4", "Buzz"]' },
      { input: "3", expected: '["1", "2", "Fizz"]' },
      { input: "15", expected: '["1", "2", "Fizz", "4", "Buzz", "Fizz", "7", "8", "Fizz", "Buzz", "11", "Fizz", "13", "14", "FizzBuzz"]', hidden: true },
      { input: "1", expected: '["1"]', hidden: true },
    ],
    hints: [
      "Проверяйте делимость на 15 (3*5) первой, затем на 3, затем на 5.",
      "Используйте оператор % (остаток от деления).",
    ],
    solution: `def fizzbuzz(n: int) -> list[str]:
    result = []
    for i in range(1, n + 1):
        if i % 15 == 0:
            result.append("FizzBuzz")
        elif i % 3 == 0:
            result.append("Fizz")
        elif i % 5 == 0:
            result.append("Buzz")
        else:
            result.append(str(i))
    return result

print(fizzbuzz(int(input())))`,
    acceptance: 82,
  },
  {
    id: "4",
    slug: "palindrome-number",
    title: "Число-палиндром",
    difficulty: "easy",
    tags: ["math"],
    description: `Дано целое число \`x\`. Определите, является ли оно палиндромом.

Палиндром — число, которое читается одинаково слева направо и справа налево.

**Бонус:** решите без преобразования числа в строку.`,
    examples: [
      { input: "x = 121", output: "True", explanation: "121 читается одинаково в обе стороны" },
      { input: "x = -121", output: "False", explanation: "Справа налево: 121-. Отрицательные числа — не палиндромы" },
      { input: "x = 10", output: "False" },
    ],
    constraints: [
      "-2^31 <= x <= 2^31 - 1",
    ],
    starterCode: `def is_palindrome(x: int) -> bool:
    # Ваш код здесь
    pass

print(is_palindrome(int(input())))`,
    testCases: [
      { input: "121", expected: "True" },
      { input: "-121", expected: "False" },
      { input: "10", expected: "False", hidden: true },
      { input: "0", expected: "True", hidden: true },
      { input: "12321", expected: "True", hidden: true },
    ],
    hints: [
      "Отрицательные числа никогда не являются палиндромами.",
      "Можно перевернуть число, последовательно извлекая последнюю цифру через % 10.",
      "Или просто сравнить str(x) == str(x)[::-1].",
    ],
    solution: `def is_palindrome(x: int) -> bool:
    if x < 0:
        return False
    original = x
    reversed_num = 0
    while x > 0:
        reversed_num = reversed_num * 10 + x % 10
        x //= 10
    return original == reversed_num

print(is_palindrome(int(input())))`,
    acceptance: 79,
  },
  {
    id: "5",
    slug: "valid-parentheses",
    title: "Правильные скобки",
    difficulty: "easy",
    tags: ["strings", "stack"],
    description: `Дана строка \`s\`, содержащая только символы \`'('\`, \`')'\`, \`'{'\`, \`'}'\`, \`'['\` и \`']'\`. Определите, является ли строка правильной.

Строка правильная, если:
1. Каждая открывающая скобка закрывается соответствующей закрывающей скобкой.
2. Открывающие скобки закрываются в правильном порядке.
3. Каждая закрывающая скобка имеет соответствующую открывающую скобку того же типа.`,
    examples: [
      { input: 's = "()"', output: "True" },
      { input: 's = "()[]{}"', output: "True" },
      { input: 's = "(]"', output: "False" },
    ],
    constraints: [
      "1 <= len(s) <= 10^4",
      "s содержит только скобки ()[]{}",
    ],
    starterCode: `def is_valid(s: str) -> bool:
    # Ваш код здесь
    pass

print(is_valid(input()))`,
    testCases: [
      { input: "()", expected: "True" },
      { input: "()[]{}", expected: "True" },
      { input: "(]", expected: "False" },
      { input: "([{}])", expected: "True", hidden: true },
      { input: "(()", expected: "False", hidden: true },
      { input: "{[]}", expected: "True", hidden: true },
    ],
    hints: [
      "Используйте стек (список). Кладите открывающие скобки в стек.",
      "При встрече закрывающей скобки проверяйте, что на вершине стека — соответствующая открывающая.",
      "В конце стек должен быть пуст.",
    ],
    solution: `def is_valid(s: str) -> bool:
    stack = []
    pairs = {')': '(', '}': '{', ']': '['}
    for c in s:
        if c in '({[':
            stack.append(c)
        else:
            if not stack or stack[-1] != pairs[c]:
                return False
            stack.pop()
    return len(stack) == 0

print(is_valid(input()))`,
    acceptance: 72,
  },
  {
    id: "6",
    slug: "max-subarray-sum",
    title: "Максимальная сумма подмассива",
    difficulty: "easy",
    tags: ["arrays", "dp"],
    description: `Дан массив целых чисел \`nums\`. Найдите непрерывный подмассив (содержащий хотя бы один элемент) с наибольшей суммой и верните эту сумму.

Это классическая задача, решаемая алгоритмом Кадане (Kadane's Algorithm).`,
    examples: [
      { input: "nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4]", output: "6", explanation: "Подмассив [4, -1, 2, 1] имеет максимальную сумму 6" },
      { input: "nums = [1]", output: "1" },
      { input: "nums = [5, 4, -1, 7, 8]", output: "23", explanation: "Весь массив имеет максимальную сумму" },
    ],
    constraints: [
      "1 <= len(nums) <= 10^5",
      "-10^4 <= nums[i] <= 10^4",
    ],
    starterCode: `def max_subarray(nums: list[int]) -> int:
    # Ваш код здесь
    pass

nums = list(map(int, input().split()))
print(max_subarray(nums))`,
    testCases: [
      { input: "-2 1 -3 4 -1 2 1 -5 4", expected: "6" },
      { input: "1", expected: "1" },
      { input: "5 4 -1 7 8", expected: "23", hidden: true },
      { input: "-1 -2 -3", expected: "-1", hidden: true },
    ],
    hints: [
      "Алгоритм Кадане: для каждого элемента решаем — продолжать текущий подмассив или начать новый.",
      "current_sum = max(nums[i], current_sum + nums[i])",
      "Отслеживайте максимум среди всех current_sum.",
    ],
    solution: `def max_subarray(nums: list[int]) -> int:
    current_sum = max_sum = nums[0]
    for i in range(1, len(nums)):
        current_sum = max(nums[i], current_sum + nums[i])
        max_sum = max(max_sum, current_sum)
    return max_sum

nums = list(map(int, input().split()))
print(max_subarray(nums))`,
    acceptance: 74,
  },
  {
    id: "7",
    slug: "count-chars",
    title: "Подсчёт символов",
    difficulty: "easy",
    tags: ["strings", "hash-map"],
    description: `Дана строка \`s\`. Подсчитайте количество каждого символа и верните результат в виде словаря.

Выведите словарь, где ключи — символы, значения — их количество. Порядок — по первому появлению.`,
    examples: [
      { input: 's = "hello"', output: "{'h': 1, 'e': 1, 'l': 2, 'o': 1}" },
      { input: 's = "aabbc"', output: "{'a': 2, 'b': 2, 'c': 1}" },
    ],
    constraints: [
      "1 <= len(s) <= 10^5",
      "Строка содержит только строчные латинские буквы",
    ],
    starterCode: `def count_chars(s: str) -> dict:
    # Ваш код здесь
    pass

print(count_chars(input()))`,
    testCases: [
      { input: "hello", expected: "{'h': 1, 'e': 1, 'l': 2, 'o': 1}" },
      { input: "aabbc", expected: "{'a': 2, 'b': 2, 'c': 1}" },
      { input: "a", expected: "{'a': 1}", hidden: true },
      { input: "abcabc", expected: "{'a': 2, 'b': 2, 'c': 2}", hidden: true },
    ],
    hints: [
      "Используйте словарь для подсчёта.",
      "dict.get(key, 0) возвращает 0 если ключа нет.",
    ],
    solution: `def count_chars(s: str) -> dict:
    result = {}
    for c in s:
        result[c] = result.get(c, 0) + 1
    return result

print(count_chars(input()))`,
    acceptance: 84,
  },
  {
    id: "8",
    slug: "remove-duplicates",
    title: "Удаление дубликатов",
    difficulty: "easy",
    tags: ["arrays", "two-pointers"],
    description: `Дан **отсортированный** список целых чисел \`nums\`. Удалите дубликаты и верните новый список с уникальными элементами, сохранив порядок.`,
    examples: [
      { input: "nums = [1, 1, 2]", output: "[1, 2]" },
      { input: "nums = [0, 0, 1, 1, 1, 2, 2, 3, 3, 4]", output: "[0, 1, 2, 3, 4]" },
    ],
    constraints: [
      "1 <= len(nums) <= 3 * 10^4",
      "-100 <= nums[i] <= 100",
      "nums отсортирован по неубыванию",
    ],
    starterCode: `def remove_duplicates(nums: list[int]) -> list[int]:
    # Ваш код здесь
    pass

nums = list(map(int, input().split()))
print(remove_duplicates(nums))`,
    testCases: [
      { input: "1 1 2", expected: "[1, 2]" },
      { input: "0 0 1 1 1 2 2 3 3 4", expected: "[0, 1, 2, 3, 4]" },
      { input: "1", expected: "[1]", hidden: true },
      { input: "1 2 3", expected: "[1, 2, 3]", hidden: true },
    ],
    hints: [
      "Так как массив отсортирован, дубликаты всегда рядом.",
      "Используйте два указателя или просто проверяйте текущий элемент с предыдущим.",
    ],
    solution: `def remove_duplicates(nums: list[int]) -> list[int]:
    if not nums:
        return []
    result = [nums[0]]
    for i in range(1, len(nums)):
        if nums[i] != nums[i - 1]:
            result.append(nums[i])
    return result

nums = list(map(int, input().split()))
print(remove_duplicates(nums))`,
    acceptance: 80,
  },
  {
    id: "9",
    slug: "merge-sorted-lists",
    title: "Объединение отсортированных списков",
    difficulty: "easy",
    tags: ["arrays", "two-pointers", "sorting"],
    description: `Даны два отсортированных списка целых чисел \`list1\` и \`list2\`. Объедините их в один отсортированный список и верните его.`,
    examples: [
      { input: "list1 = [1, 2, 4], list2 = [1, 3, 4]", output: "[1, 1, 2, 3, 4, 4]" },
      { input: "list1 = [], list2 = [0]", output: "[0]" },
    ],
    constraints: [
      "0 <= len(list1), len(list2) <= 50",
      "-100 <= list1[i], list2[i] <= 100",
      "Оба списка отсортированы по неубыванию",
    ],
    starterCode: `def merge_sorted(list1: list[int], list2: list[int]) -> list[int]:
    # Ваш код здесь
    pass

l1 = list(map(int, input().split())) if (line1 := input().strip()) else []
l2 = list(map(int, input().split())) if (line2 := input().strip()) else []
print(merge_sorted(l1, l2))`,
    testCases: [
      { input: "1 2 4\n1 3 4", expected: "[1, 1, 2, 3, 4, 4]" },
      { input: "\n0", expected: "[0]" },
      { input: "1\n2", expected: "[1, 2]", hidden: true },
      { input: "1 3 5\n2 4 6", expected: "[1, 2, 3, 4, 5, 6]", hidden: true },
    ],
    hints: [
      "Используйте два указателя — по одному на каждый список.",
      "Сравнивайте элементы и добавляйте меньший в результат.",
      "Не забудьте добавить оставшиеся элементы.",
    ],
    solution: `def merge_sorted(list1: list[int], list2: list[int]) -> list[int]:
    result = []
    i = j = 0
    while i < len(list1) and j < len(list2):
        if list1[i] <= list2[j]:
            result.append(list1[i])
            i += 1
        else:
            result.append(list2[j])
            j += 1
    result.extend(list1[i:])
    result.extend(list2[j:])
    return result

l1 = list(map(int, input().split())) if (line1 := input().strip()) else []
l2 = list(map(int, input().split())) if (line2 := input().strip()) else []
print(merge_sorted(l1, l2))`,
    acceptance: 76,
  },
  {
    id: "10",
    slug: "fibonacci",
    title: "Число Фибоначчи",
    difficulty: "easy",
    tags: ["math", "recursion", "dp"],
    description: `Дано число \`n\`. Верните n-е число Фибоначчи.

Последовательность Фибоначчи: F(0) = 0, F(1) = 1, F(n) = F(n-1) + F(n-2) для n > 1.`,
    examples: [
      { input: "n = 0", output: "0" },
      { input: "n = 1", output: "1" },
      { input: "n = 10", output: "55", explanation: "0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55" },
    ],
    constraints: [
      "0 <= n <= 40",
    ],
    starterCode: `def fibonacci(n: int) -> int:
    # Ваш код здесь
    pass

print(fibonacci(int(input())))`,
    testCases: [
      { input: "0", expected: "0" },
      { input: "1", expected: "1" },
      { input: "10", expected: "55" },
      { input: "20", expected: "6765", hidden: true },
      { input: "30", expected: "832040", hidden: true },
    ],
    hints: [
      "Рекурсия будет слишком медленной для больших n. Используйте итерацию.",
      "Храните только два последних числа: a, b = 0, 1, затем a, b = b, a + b.",
    ],
    solution: `def fibonacci(n: int) -> int:
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

print(fibonacci(int(input())))`,
    acceptance: 81,
  },

  // ==================== MEDIUM (11-20) ====================
  {
    id: "11",
    slug: "group-anagrams",
    title: "Группировка анаграмм",
    difficulty: "medium",
    tags: ["strings", "hash-map", "sorting"],
    description: `Дан массив строк \`strs\`. Сгруппируйте анаграммы вместе. Анаграммы — это слова, содержащие одинаковые буквы в разном порядке.

Верните список групп (порядок групп и слов внутри группы не важен). Каждая группа — отсортированный список слов.`,
    examples: [
      { input: 'strs = ["eat","tea","tan","ate","nat","bat"]', output: '[["ate","eat","tea"],["bat"],["nat","tan"]]', explanation: "eat, tea, ate — анаграммы; tan, nat — анаграммы; bat — одна" },
      { input: 'strs = [""]', output: '[[""]]' },
    ],
    constraints: [
      "1 <= len(strs) <= 10^4",
      "0 <= len(strs[i]) <= 100",
      "strs[i] содержит только строчные латинские буквы",
    ],
    starterCode: `def group_anagrams(strs: list[str]) -> list[list[str]]:
    # Ваш код здесь
    pass

words = input().split(",")
words = [w.strip().strip('"').strip("'") for w in words]
result = group_anagrams(words)
result = [sorted(g) for g in result]
result.sort(key=lambda g: g[0])
print(result)`,
    testCases: [
      { input: "eat,tea,tan,ate,nat,bat", expected: "[['ate', 'eat', 'tea'], ['bat'], ['nat', 'tan']]" },
      { input: '""', expected: "[['']]" },
      { input: "a", expected: "[['a']]", hidden: true },
      { input: "abc,bca,cab,ab,ba", expected: "[['ab', 'ba'], ['abc', 'bca', 'cab']]", hidden: true },
    ],
    hints: [
      "Анаграммы имеют одинаковый набор букв. Отсортируйте буквы — получите ключ.",
      'Используйте словарь: ключ — отсортированная строка, значение — список анаграмм.',
      "from collections import defaultdict может упростить код.",
    ],
    solution: `def group_anagrams(strs: list[str]) -> list[list[str]]:
    groups = {}
    for s in strs:
        key = ''.join(sorted(s))
        if key not in groups:
            groups[key] = []
        groups[key].append(s)
    return list(groups.values())

words = input().split(",")
words = [w.strip().strip('"').strip("'") for w in words]
result = group_anagrams(words)
result = [sorted(g) for g in result]
result.sort(key=lambda g: g[0])
print(result)`,
    acceptance: 55,
  },
  {
    id: "12",
    slug: "longest-substring",
    title: "Наибольшая подстрока без повторов",
    difficulty: "medium",
    tags: ["strings", "hash-map", "two-pointers"],
    description: `Дана строка \`s\`. Найдите длину наибольшей подстроки без повторяющихся символов.

Подстрока — это непрерывная последовательность символов внутри строки.`,
    examples: [
      { input: 's = "abcabcbb"', output: "3", explanation: 'Ответ — "abc", длина 3' },
      { input: 's = "bbbbb"', output: "1", explanation: 'Ответ — "b", длина 1' },
      { input: 's = "pwwkew"', output: "3", explanation: 'Ответ — "wke", длина 3' },
    ],
    constraints: [
      "0 <= len(s) <= 5 * 10^4",
      "s содержит английские буквы, цифры, символы и пробелы",
    ],
    starterCode: `def length_of_longest_substring(s: str) -> int:
    # Ваш код здесь
    pass

print(length_of_longest_substring(input()))`,
    testCases: [
      { input: "abcabcbb", expected: "3" },
      { input: "bbbbb", expected: "1" },
      { input: "pwwkew", expected: "3" },
      { input: "", expected: "0", hidden: true },
      { input: "abcdef", expected: "6", hidden: true },
    ],
    hints: [
      "Используйте метод скользящего окна (sliding window).",
      "Двигайте правый указатель, добавляя символы. Если символ повторяется — двигайте левый.",
      "Множество (set) поможет быстро проверить наличие символа в окне.",
    ],
    solution: `def length_of_longest_substring(s: str) -> int:
    char_set = set()
    left = max_len = 0
    for right in range(len(s)):
        while s[right] in char_set:
            char_set.remove(s[left])
            left += 1
        char_set.add(s[right])
        max_len = max(max_len, right - left + 1)
    return max_len

print(length_of_longest_substring(input()))`,
    acceptance: 48,
  },
  {
    id: "13",
    slug: "three-sum",
    title: "Тройка с суммой ноль",
    difficulty: "medium",
    tags: ["arrays", "two-pointers", "sorting"],
    description: `Дан массив целых чисел \`nums\`. Верните все уникальные тройки \`[nums[i], nums[j], nums[k]]\` такие, что \`i != j\`, \`i != k\`, \`j != k\`, и \`nums[i] + nums[j] + nums[k] == 0\`.

Решение не должно содержать дубликатов троек. Каждая тройка должна быть отсортирована.`,
    examples: [
      { input: "nums = [-1, 0, 1, 2, -1, -4]", output: "[[-1, -1, 2], [-1, 0, 1]]" },
      { input: "nums = [0, 1, 1]", output: "[]" },
      { input: "nums = [0, 0, 0]", output: "[[0, 0, 0]]" },
    ],
    constraints: [
      "3 <= len(nums) <= 3000",
      "-10^5 <= nums[i] <= 10^5",
    ],
    starterCode: `def three_sum(nums: list[int]) -> list[list[int]]:
    # Ваш код здесь
    pass

nums = list(map(int, input().split()))
result = three_sum(nums)
result.sort()
print(result)`,
    testCases: [
      { input: "-1 0 1 2 -1 -4", expected: "[[-1, -1, 2], [-1, 0, 1]]" },
      { input: "0 1 1", expected: "[]" },
      { input: "0 0 0", expected: "[[0, 0, 0]]", hidden: true },
      { input: "-2 0 1 1 2", expected: "[[-2, 0, 2], [-2, 1, 1]]", hidden: true },
    ],
    hints: [
      "Отсортируйте массив. Для каждого элемента задача сводится к Two Sum.",
      "Используйте два указателя для поиска пары с нужной суммой.",
      "Пропускайте дубликаты, чтобы избежать повторных троек.",
    ],
    solution: `def three_sum(nums: list[int]) -> list[list[int]]:
    nums.sort()
    result = []
    for i in range(len(nums) - 2):
        if i > 0 and nums[i] == nums[i - 1]:
            continue
        left, right = i + 1, len(nums) - 1
        while left < right:
            s = nums[i] + nums[left] + nums[right]
            if s < 0:
                left += 1
            elif s > 0:
                right -= 1
            else:
                result.append([nums[i], nums[left], nums[right]])
                while left < right and nums[left] == nums[left + 1]:
                    left += 1
                while left < right and nums[right] == nums[right - 1]:
                    right -= 1
                left += 1
                right -= 1
    return result

nums = list(map(int, input().split()))
result = three_sum(nums)
result.sort()
print(result)`,
    acceptance: 42,
  },
  {
    id: "14",
    slug: "binary-search",
    title: "Бинарный поиск",
    difficulty: "medium",
    tags: ["arrays", "searching"],
    description: `Дан отсортированный по возрастанию массив целых чисел \`nums\` и целое число \`target\`. Найдите индекс \`target\` в массиве. Если элемента нет — верните \`-1\`.

Решение должно работать за O(log n).`,
    examples: [
      { input: "nums = [-1, 0, 3, 5, 9, 12], target = 9", output: "4" },
      { input: "nums = [-1, 0, 3, 5, 9, 12], target = 2", output: "-1" },
    ],
    constraints: [
      "1 <= len(nums) <= 10^4",
      "-10^4 < nums[i], target < 10^4",
      "Все элементы nums уникальны",
      "nums отсортирован по возрастанию",
    ],
    starterCode: `def binary_search(nums: list[int], target: int) -> int:
    # Ваш код здесь
    pass

nums = list(map(int, input().split()))
target = int(input())
print(binary_search(nums, target))`,
    testCases: [
      { input: "-1 0 3 5 9 12\n9", expected: "4" },
      { input: "-1 0 3 5 9 12\n2", expected: "-1" },
      { input: "5\n5", expected: "0", hidden: true },
      { input: "1 2 3 4 5 6 7 8 9 10\n7", expected: "6", hidden: true },
    ],
    hints: [
      "Используйте два указателя: left и right.",
      "На каждом шаге вычисляйте mid = (left + right) // 2.",
      "Если nums[mid] == target — нашли. Если меньше — ищем справа, иначе — слева.",
    ],
    solution: `def binary_search(nums: list[int], target: int) -> int:
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
    acceptance: 58,
  },
  {
    id: "15",
    slug: "rotate-array",
    title: "Сдвиг массива",
    difficulty: "medium",
    tags: ["arrays"],
    description: `Дан массив целых чисел \`nums\` и число \`k\`. Сдвиньте массив вправо на \`k\` позиций.

Например, при k=2: [1,2,3,4,5] -> [4,5,1,2,3].`,
    examples: [
      { input: "nums = [1, 2, 3, 4, 5, 6, 7], k = 3", output: "[5, 6, 7, 1, 2, 3, 4]", explanation: "Сдвиг вправо на 1: [7,1,2,3,4,5,6], на 2: [6,7,1,2,3,4,5], на 3: [5,6,7,1,2,3,4]" },
      { input: "nums = [-1, -100, 3, 99], k = 2", output: "[3, 99, -1, -100]" },
    ],
    constraints: [
      "1 <= len(nums) <= 10^5",
      "-2^31 <= nums[i] <= 2^31 - 1",
      "0 <= k <= 10^5",
    ],
    starterCode: `def rotate(nums: list[int], k: int) -> list[int]:
    # Ваш код здесь
    pass

nums = list(map(int, input().split()))
k = int(input())
print(rotate(nums, k))`,
    testCases: [
      { input: "1 2 3 4 5 6 7\n3", expected: "[5, 6, 7, 1, 2, 3, 4]" },
      { input: "-1 -100 3 99\n2", expected: "[3, 99, -1, -100]" },
      { input: "1 2\n3", expected: "[2, 1]", hidden: true },
      { input: "1\n0", expected: "[1]", hidden: true },
    ],
    hints: [
      "k может быть больше длины массива. Используйте k % len(nums).",
      "Простой способ: nums[-k:] + nums[:-k].",
      "Оптимальный способ: три реверса — весь массив, первые k, остальные.",
    ],
    solution: `def rotate(nums: list[int], k: int) -> list[int]:
    n = len(nums)
    k = k % n
    return nums[-k:] + nums[:-k] if k else nums[:]

nums = list(map(int, input().split()))
k = int(input())
print(rotate(nums, k))`,
    acceptance: 52,
  },
  {
    id: "16",
    slug: "matrix-spiral",
    title: "Спиральный обход матрицы",
    difficulty: "medium",
    tags: ["arrays"],
    description: `Дана матрица \`m x n\`. Верните все элементы матрицы в порядке спирального обхода (по часовой стрелке, начиная с верхнего левого угла).`,
    examples: [
      { input: "matrix = [[1,2,3],[4,5,6],[7,8,9]]", output: "[1, 2, 3, 6, 9, 8, 7, 4, 5]" },
      { input: "matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]", output: "[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]" },
    ],
    constraints: [
      "m == len(matrix)",
      "n == len(matrix[i])",
      "1 <= m, n <= 10",
      "-100 <= matrix[i][j] <= 100",
    ],
    starterCode: `def spiral_order(matrix: list[list[int]]) -> list[int]:
    # Ваш код здесь
    pass

import json
matrix = json.loads(input())
print(spiral_order(matrix))`,
    testCases: [
      { input: "[[1,2,3],[4,5,6],[7,8,9]]", expected: "[1, 2, 3, 6, 9, 8, 7, 4, 5]" },
      { input: "[[1,2,3,4],[5,6,7,8],[9,10,11,12]]", expected: "[1, 2, 3, 4, 8, 12, 11, 10, 9, 5, 6, 7]" },
      { input: "[[1]]", expected: "[1]", hidden: true },
      { input: "[[1,2],[3,4]]", expected: "[1, 2, 4, 3]", hidden: true },
    ],
    hints: [
      "Используйте четыре границы: top, bottom, left, right.",
      "Обходите: вправо по верхней строке, вниз по правому столбцу, влево по нижней строке, вверх по левому столбцу.",
      "После каждого обхода сужайте границы.",
    ],
    solution: `def spiral_order(matrix: list[list[int]]) -> list[int]:
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
    return result

import json
matrix = json.loads(input())
print(spiral_order(matrix))`,
    acceptance: 45,
  },
  {
    id: "17",
    slug: "coin-change",
    title: "Размен монет",
    difficulty: "medium",
    tags: ["dp", "arrays"],
    description: `Даны номиналы монет \`coins\` и сумма \`amount\`. Верните **минимальное количество монет**, необходимое для набора этой суммы. Если сумму набрать невозможно — верните \`-1\`.

У вас бесконечное количество монет каждого номинала.`,
    examples: [
      { input: "coins = [1, 5, 10], amount = 11", output: "2", explanation: "11 = 10 + 1, всего 2 монеты" },
      { input: "coins = [2], amount = 3", output: "-1", explanation: "Невозможно набрать 3 из монет номиналом 2" },
      { input: "coins = [1], amount = 0", output: "0" },
    ],
    constraints: [
      "1 <= len(coins) <= 12",
      "1 <= coins[i] <= 2^31 - 1",
      "0 <= amount <= 10^4",
    ],
    starterCode: `def coin_change(coins: list[int], amount: int) -> int:
    # Ваш код здесь
    pass

coins = list(map(int, input().split()))
amount = int(input())
print(coin_change(coins, amount))`,
    testCases: [
      { input: "1 5 10\n11", expected: "2" },
      { input: "2\n3", expected: "-1" },
      { input: "1\n0", expected: "0", hidden: true },
      { input: "1 2 5\n100", expected: "20", hidden: true },
      { input: "3 7\n11", expected: "-1", hidden: true },
    ],
    hints: [
      "Это классическая задача динамического программирования.",
      "dp[i] = минимальное количество монет для суммы i.",
      "dp[i] = min(dp[i - coin] + 1) для каждого coin в coins.",
    ],
    solution: `def coin_change(coins: list[int], amount: int) -> int:
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
    acceptance: 46,
  },
  {
    id: "18",
    slug: "sort-colors",
    title: "Сортировка цветов",
    difficulty: "medium",
    tags: ["arrays", "two-pointers", "sorting"],
    description: `Дан массив \`nums\`, содержащий только значения \`0\`, \`1\` и \`2\` (красный, белый, синий). Отсортируйте массив **на месте** так, чтобы элементы одного цвета шли рядом, в порядке 0, 1, 2.

Решите задачу без использования встроенной сортировки (алгоритм Dutch National Flag).`,
    examples: [
      { input: "nums = [2, 0, 2, 1, 1, 0]", output: "[0, 0, 1, 1, 2, 2]" },
      { input: "nums = [2, 0, 1]", output: "[0, 1, 2]" },
    ],
    constraints: [
      "1 <= len(nums) <= 300",
      "nums[i] принимает значения 0, 1 или 2",
    ],
    starterCode: `def sort_colors(nums: list[int]) -> list[int]:
    # Ваш код здесь (сортировка на месте)
    pass
    return nums

nums = list(map(int, input().split()))
print(sort_colors(nums))`,
    testCases: [
      { input: "2 0 2 1 1 0", expected: "[0, 0, 1, 1, 2, 2]" },
      { input: "2 0 1", expected: "[0, 1, 2]" },
      { input: "0", expected: "[0]", hidden: true },
      { input: "1 0 2 1 0 2 1", expected: "[0, 0, 1, 1, 1, 2, 2]", hidden: true },
    ],
    hints: [
      "Используйте три указателя: low, mid, high.",
      "Все элементы до low — нули, после high — двойки.",
      "Проходите mid от начала до high, перемещая 0 влево, 2 вправо.",
    ],
    solution: `def sort_colors(nums: list[int]) -> list[int]:
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
    return nums

nums = list(map(int, input().split()))
print(sort_colors(nums))`,
    acceptance: 53,
  },
  {
    id: "19",
    slug: "validate-bst",
    title: "Проверка BST порядка",
    difficulty: "medium",
    tags: ["arrays", "sorting", "searching"],
    description: `Дан список чисел \`nums\`, представляющий in-order обход бинарного дерева поиска (BST). Проверьте, является ли данный обход корректным BST.

In-order обход BST всегда даёт **строго возрастающую** последовательность. Проверьте это свойство.`,
    examples: [
      { input: "nums = [1, 3, 5, 7, 9]", output: "True", explanation: "Строго возрастающая последовательность — корректный BST" },
      { input: "nums = [1, 3, 3, 7]", output: "False", explanation: "3 повторяется — не строго возрастающая" },
      { input: "nums = [5, 3, 7]", output: "False", explanation: "5 > 3 — не возрастающая" },
    ],
    constraints: [
      "1 <= len(nums) <= 10^5",
      "-10^5 <= nums[i] <= 10^5",
    ],
    starterCode: `def is_valid_bst(nums: list[int]) -> bool:
    # Ваш код здесь
    pass

nums = list(map(int, input().split()))
print(is_valid_bst(nums))`,
    testCases: [
      { input: "1 3 5 7 9", expected: "True" },
      { input: "1 3 3 7", expected: "False" },
      { input: "5 3 7", expected: "False", hidden: true },
      { input: "1", expected: "True", hidden: true },
      { input: "1 2 3 4 5 6 7 8 9 10", expected: "True", hidden: true },
    ],
    hints: [
      "In-order обход BST — строго возрастающая последовательность.",
      "Просто проверьте, что каждый элемент больше предыдущего.",
    ],
    solution: `def is_valid_bst(nums: list[int]) -> bool:
    for i in range(1, len(nums)):
        if nums[i] <= nums[i - 1]:
            return False
    return True

nums = list(map(int, input().split()))
print(is_valid_bst(nums))`,
    acceptance: 56,
  },
  {
    id: "20",
    slug: "word-frequency",
    title: "Топ-K частых слов",
    difficulty: "medium",
    tags: ["strings", "hash-map", "sorting"],
    description: `Дан список слов \`words\` и число \`k\`. Верните \`k\` самых частых слов, отсортированных по убыванию частоты. Если частоты равны — по алфавиту.`,
    examples: [
      { input: 'words = ["the","day","is","sunny","the","the","sunny","is","is"], k = 2', output: '["is", "the"]', explanation: '"is" встречается 3 раза, "the" 3 раза. По алфавиту "is" < "the"' },
      { input: 'words = ["i","love","coding","i","love","coding"], k = 3', output: '["coding", "i", "love"]' },
    ],
    constraints: [
      "1 <= len(words) <= 500",
      "1 <= len(words[i]) <= 10",
      "1 <= k <= количество уникальных слов",
    ],
    starterCode: `def top_k_frequent(words: list[str], k: int) -> list[str]:
    # Ваш код здесь
    pass

words = input().split()
k = int(input())
print(top_k_frequent(words, k))`,
    testCases: [
      { input: "the day is sunny the the sunny is is\n2", expected: "['is', 'the']" },
      { input: "i love coding i love coding\n3", expected: "['coding', 'i', 'love']" },
      { input: "a b c a b a\n1", expected: "['a']", hidden: true },
      { input: "hello world hello\n2", expected: "['hello', 'world']", hidden: true },
    ],
    hints: [
      "Подсчитайте частоту каждого слова с помощью словаря.",
      "Отсортируйте по (-частота, слово) — убывание частоты, возрастание алфавита.",
      "Верните первые k элементов.",
    ],
    solution: `def top_k_frequent(words: list[str], k: int) -> list[str]:
    freq = {}
    for w in words:
        freq[w] = freq.get(w, 0) + 1
    sorted_words = sorted(freq.keys(), key=lambda w: (-freq[w], w))
    return sorted_words[:k]

words = input().split()
k = int(input())
print(top_k_frequent(words, k))`,
    acceptance: 50,
  },

  // ==================== HARD (21-25) ====================
  {
    id: "21",
    slug: "median-sorted-arrays",
    title: "Медиана двух отсортированных массивов",
    difficulty: "hard",
    tags: ["arrays", "searching"],
    description: `Даны два отсортированных массива \`nums1\` и \`nums2\` размеров \`m\` и \`n\` соответственно. Найдите **медиану** объединённого отсортированного массива.

Медиана — среднее значение для чётного количества элементов, или центральный элемент для нечётного.

Итоговая сложность должна быть O(log(m+n)).`,
    examples: [
      { input: "nums1 = [1, 3], nums2 = [2]", output: "2.0", explanation: "Объединённый массив: [1, 2, 3], медиана = 2.0" },
      { input: "nums1 = [1, 2], nums2 = [3, 4]", output: "2.5", explanation: "Объединённый массив: [1, 2, 3, 4], медиана = (2 + 3) / 2 = 2.5" },
    ],
    constraints: [
      "nums1.length == m, nums2.length == n",
      "0 <= m, n <= 1000",
      "1 <= m + n <= 2000",
      "-10^6 <= nums1[i], nums2[i] <= 10^6",
    ],
    starterCode: `def find_median(nums1: list[int], nums2: list[int]) -> float:
    # Ваш код здесь
    pass

nums1 = list(map(int, input().split())) if input().strip() else []
nums2 = list(map(int, input().split())) if input().strip() else []
print(find_median(nums1, nums2))`,
    testCases: [
      { input: "1 3\n2", expected: "2.0" },
      { input: "1 2\n3 4", expected: "2.5" },
      { input: "0 0\n0 0", expected: "0.0", hidden: true },
      { input: "1\n2 3 4", expected: "2.5", hidden: true },
      { input: "1 2 3 4 5\n6 7 8 9 10", expected: "5.5", hidden: true },
    ],
    hints: [
      "Простой подход: объедините оба массива, отсортируйте, найдите медиану.",
      "Оптимальный: бинарный поиск по меньшему массиву.",
      "Ищите разделение так, чтобы все элементы слева <= всех элементов справа.",
    ],
    solution: `def find_median(nums1: list[int], nums2: list[int]) -> float:
    merged = sorted(nums1 + nums2)
    n = len(merged)
    if n % 2 == 1:
        return float(merged[n // 2])
    return (merged[n // 2 - 1] + merged[n // 2]) / 2

nums1 = list(map(int, input().split())) if input().strip() else []
nums2 = list(map(int, input().split())) if input().strip() else []
print(find_median(nums1, nums2))`,
    acceptance: 32,
  },
  {
    id: "22",
    slug: "longest-palindrome-substring",
    title: "Наибольшая подстрока-палиндром",
    difficulty: "hard",
    tags: ["strings", "dp"],
    description: `Дана строка \`s\`. Найдите и верните наибольшую подстроку, которая является палиндромом.

Если таких подстрок несколько одинаковой длины — верните любую.`,
    examples: [
      { input: 's = "babad"', output: '"bab"', explanation: '"aba" тоже допустимый ответ' },
      { input: 's = "cbbd"', output: '"bb"' },
    ],
    constraints: [
      "1 <= len(s) <= 1000",
      "s содержит только цифры и английские буквы",
    ],
    starterCode: `def longest_palindrome(s: str) -> str:
    # Ваш код здесь
    pass

print(longest_palindrome(input()))`,
    testCases: [
      { input: "babad", expected: "bab" },
      { input: "cbbd", expected: "bb" },
      { input: "a", expected: "a", hidden: true },
      { input: "racecar", expected: "racecar", hidden: true },
      { input: "abcba", expected: "abcba", hidden: true },
    ],
    hints: [
      "Для каждого символа — расширяйте палиндром в обе стороны.",
      "Проверяйте и нечётные (центр — 1 символ), и чётные (центр — 2 символа) палиндромы.",
      "Запоминайте самый длинный найденный палиндром.",
    ],
    solution: `def longest_palindrome(s: str) -> str:
    def expand(l, r):
        while l >= 0 and r < len(s) and s[l] == s[r]:
            l -= 1
            r += 1
        return s[l + 1:r]

    result = ""
    for i in range(len(s)):
        odd = expand(i, i)
        even = expand(i, i + 1)
        if len(odd) > len(result):
            result = odd
        if len(even) > len(result):
            result = even
    return result

print(longest_palindrome(input()))`,
    acceptance: 28,
  },
  {
    id: "23",
    slug: "trapping-rain-water",
    title: "Ловушка для дождевой воды",
    difficulty: "hard",
    tags: ["arrays", "two-pointers", "stack", "dp"],
    description: `Дан массив неотрицательных целых чисел \`height\`, где каждый элемент представляет высоту столбца шириной 1. Вычислите, сколько воды может быть собрано между столбцами после дождя.

Представьте, что столбцы — это стены, и вода заполняет пространство между ними.`,
    examples: [
      { input: "height = [0, 1, 0, 2, 1, 0, 1, 3, 2, 1, 2, 1]", output: "6", explanation: "Между столбцами помещается 6 единиц воды" },
      { input: "height = [4, 2, 0, 3, 2, 5]", output: "9" },
    ],
    constraints: [
      "n == len(height)",
      "1 <= n <= 2 * 10^4",
      "0 <= height[i] <= 10^5",
    ],
    starterCode: `def trap(height: list[int]) -> int:
    # Ваш код здесь
    pass

height = list(map(int, input().split()))
print(trap(height))`,
    testCases: [
      { input: "0 1 0 2 1 0 1 3 2 1 2 1", expected: "6" },
      { input: "4 2 0 3 2 5", expected: "9" },
      { input: "1 2 3 4 5", expected: "0", hidden: true },
      { input: "5 4 3 2 1", expected: "0", hidden: true },
      { input: "3 0 3", expected: "3", hidden: true },
    ],
    hints: [
      "Для каждой позиции вода = min(max_left, max_right) - height[i].",
      "Предвычислите массивы максимумов слева и справа.",
      "Или используйте два указателя для O(1) памяти.",
    ],
    solution: `def trap(height: list[int]) -> int:
    n = len(height)
    if n < 3:
        return 0
    left_max = [0] * n
    right_max = [0] * n
    left_max[0] = height[0]
    for i in range(1, n):
        left_max[i] = max(left_max[i - 1], height[i])
    right_max[n - 1] = height[n - 1]
    for i in range(n - 2, -1, -1):
        right_max[i] = max(right_max[i + 1], height[i])
    water = 0
    for i in range(n):
        water += min(left_max[i], right_max[i]) - height[i]
    return water

height = list(map(int, input().split()))
print(trap(height))`,
    acceptance: 25,
  },
  {
    id: "24",
    slug: "merge-intervals",
    title: "Объединение интервалов",
    difficulty: "hard",
    tags: ["arrays", "sorting"],
    description: `Дан массив интервалов \`intervals\`, где \`intervals[i] = [start_i, end_i]\`. Объедините все пересекающиеся интервалы и верните массив непересекающихся интервалов, покрывающих все входные интервалы.`,
    examples: [
      { input: "intervals = [[1,3],[2,6],[8,10],[15,18]]", output: "[[1, 6], [8, 10], [15, 18]]", explanation: "Интервалы [1,3] и [2,6] пересекаются, объединяем в [1,6]" },
      { input: "intervals = [[1,4],[4,5]]", output: "[[1, 5]]", explanation: "Интервалы [1,4] и [4,5] касаются, объединяем в [1,5]" },
    ],
    constraints: [
      "1 <= len(intervals) <= 10^4",
      "intervals[i].length == 2",
      "0 <= start_i <= end_i <= 10^4",
    ],
    starterCode: `def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    # Ваш код здесь
    pass

import json
intervals = json.loads(input())
print(merge_intervals(intervals))`,
    testCases: [
      { input: "[[1,3],[2,6],[8,10],[15,18]]", expected: "[[1, 6], [8, 10], [15, 18]]" },
      { input: "[[1,4],[4,5]]", expected: "[[1, 5]]" },
      { input: "[[1,4],[0,4]]", expected: "[[0, 4]]", hidden: true },
      { input: "[[1,4],[2,3]]", expected: "[[1, 4]]", hidden: true },
      { input: "[[1,2],[3,4],[5,6]]", expected: "[[1, 2], [3, 4], [5, 6]]", hidden: true },
    ],
    hints: [
      "Отсортируйте интервалы по началу.",
      "Проходите по отсортированным интервалам и объединяйте пересекающиеся.",
      "Два интервала пересекаются, если начало второго <= конец первого.",
    ],
    solution: `def merge_intervals(intervals: list[list[int]]) -> list[list[int]]:
    intervals.sort(key=lambda x: x[0])
    merged = [intervals[0]]
    for start, end in intervals[1:]:
        if start <= merged[-1][1]:
            merged[-1][1] = max(merged[-1][1], end)
        else:
            merged.append([start, end])
    return merged

import json
intervals = json.loads(input())
print(merge_intervals(intervals))`,
    acceptance: 35,
  },
  {
    id: "25",
    slug: "lru-cache",
    title: "LRU Cache",
    difficulty: "hard",
    tags: ["hash-map", "linked-list"],
    description: `Реализуйте структуру данных **LRU Cache** (Least Recently Used) с операциями:

- \`LRUCache(capacity)\` — инициализация кэша с заданной ёмкостью
- \`get(key)\` — вернуть значение по ключу или \`-1\`, если ключ не найден
- \`put(key, value)\` — добавить/обновить пару ключ-значение. Если кэш полон — удалить наименее используемый элемент

Обе операции должны работать за O(1).

Вход: первая строка — capacity, затем операции в формате \`get key\` или \`put key value\`, одна на строку. Конец — пустая строка или EOF.
Вывод: для каждого \`get\` — результат на отдельной строке.`,
    examples: [
      {
        input: 'capacity = 2, ops: put(1,1), put(2,2), get(1)→1, put(3,3), get(2)→-1, put(4,4), get(1)→-1, get(3)→3, get(4)→4',
        output: "1\\n-1\\n-1\\n3\\n4",
        explanation: "put(3,3) вытесняет ключ 2 (least recently used). put(4,4) вытесняет ключ 1."
      },
    ],
    constraints: [
      "1 <= capacity <= 3000",
      "0 <= key <= 10^4",
      "0 <= value <= 10^5",
      "Не более 2 * 10^5 вызовов get и put",
    ],
    starterCode: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        # Ваш код здесь
        pass

    def get(self, key: int) -> int:
        # Ваш код здесь
        pass

    def put(self, key: int, value: int) -> None:
        # Ваш код здесь
        pass

import sys
capacity = int(input())
cache = LRUCache(capacity)
for line in sys.stdin:
    line = line.strip()
    if not line:
        break
    parts = line.split()
    if parts[0] == "get":
        print(cache.get(int(parts[1])))
    elif parts[0] == "put":
        cache.put(int(parts[1]), int(parts[2]))`,
    testCases: [
      { input: "2\nput 1 1\nput 2 2\nget 1\nput 3 3\nget 2\nput 4 4\nget 1\nget 3\nget 4", expected: "1\n-1\n-1\n3\n4" },
      { input: "1\nput 1 10\nget 1\nput 2 20\nget 1\nget 2", expected: "10\n-1\n20" },
      { input: "3\nput 1 1\nput 2 2\nput 3 3\nget 1\nput 4 4\nget 2\nget 3\nget 4", expected: "1\n-1\n3\n4", hidden: true },
    ],
    hints: [
      "Используйте OrderedDict из collections — он хранит порядок вставки.",
      "При get/put перемещайте элемент в конец (move_to_end).",
      "При переполнении удаляйте первый элемент (popitem(last=False)).",
    ],
    solution: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = OrderedDict()

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)

import sys
capacity = int(input())
cache = LRUCache(capacity)
for line in sys.stdin:
    line = line.strip()
    if not line:
        break
    parts = line.split()
    if parts[0] == "get":
        print(cache.get(int(parts[1])))
    elif parts[0] == "put":
        cache.put(int(parts[1]), int(parts[2]))`,
    acceptance: 22,
  },
];

// ==================== EXPORTS ====================

export function getAllProblems(): Problem[] {
  return problems;
}

export function getProblemBySlug(slug: string): Problem | undefined {
  return problems.find((p) => p.slug === slug);
}

export function getProblemsByTag(tag: ProblemTag): Problem[] {
  return problems.filter((p) => p.tags.includes(tag));
}

export function getProblemsByDifficulty(difficulty: Difficulty): Problem[] {
  return problems.filter((p) => p.difficulty === difficulty);
}
