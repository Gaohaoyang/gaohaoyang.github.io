---
layout: post
title: '算法之数组篇'
categories: JavaScript
tags: algorithm
---

* content
{:toc}

数组是存放在连续内存空间上的相同类型数据的集合。需要两点注意的是

- 数组下标都是从 0 开始的
- 数组内存空间的地址是连续的

正是因为数组的在内存空间的地址是连续的，所以我们在删除或者增添元素的时候，就难免要移动其他元素的地址。数组的元素是不能删的，只能覆盖。





# 二分查找

## leetCode 704 二分查找

给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。

示例 1:

```
输入: nums = [-1,0,3,5,9,12], target = 9
输出: 4
解释: 9 出现在 nums 中并且下标为 4
```

示例 2:

```
输入: nums = [-1,0,3,5,9,12], target = 2
输出: -1
解释: 2 不存在 nums 中因此返回 -1
```

提示：

1. 你可以假设 nums 中的所有元素是不重复的。
2. n 将在 [1, 10000]之间。
3. nums 的每个元素都将在 [-9999, 9999]之间。

### 思路

最简单的方案，一行代码搞定

```js
var search = function (nums, target) {
  return nums.indexOf(target)
}
```

```
Accepted
47/47 cases passed (64 ms)
Your runtime beats 63.35 % of javascript submissions
Your memory usage beats 54.75 % of javascript submissions (43.9 MB)
```

但我们还是学习一下二分查找的思路。

注意这道题目的前提是数组是**有序数组**，这也是使用二分查找的基础条件。

1. 定义一个区间 `[left, right]`，其中 right 为数组的最后一项下标
2. 判断如果 `left <= right` 时，获取一次 left 到 right 的中间值 middle，这里要注意 middle 要使用 `Math.floor` 取整数。
3. 判断如果下标为 middle 的数值 < target，则 target 在 middle 的右边，将 left 赋值为 middle + 1
4. 判断如果下标为 middle 的数值 > target，则 target 在 middle 的左边，将 right 赋值为 middle - 1
5. 否则如果 middle === target，直接返回 middle
6. 循环 2-5 步骤
7. 否则返回 -1

### 解法

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var search = function (nums, target) {
  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    const middle = Math.floor((left + right) / 2)
    if (nums[middle] > target) {
      right = middle - 1
    } else if (nums[middle] < target) {
      left = middle + 1
    } else {
      return middle
    }
  }
  return -1
}
```

```
Accepted
47/47 cases passed (56 ms)
Your runtime beats 92.97 % of javascript submissions
Your memory usage beats 89.92 % of javascript submissions (43.8 MB)
```

举一反三

## leetCode 35 搜索插入位置

给定一个排序数组和一个目标值，在数组中找到目标值，并返回其索引。如果目标值不存在于数组中，返回它将会被按顺序插入的位置。

请必须使用时间复杂度为 O(log n) 的算法。

示例 1:

输入: nums = [1,3,5,6], target = 5
输出: 2
示例 2:

输入: nums = [1,3,5,6], target = 2
输出: 1
示例 3:

输入: nums = [1,3,5,6], target = 7
输出: 4

提示:

- 1 <= nums.length <= 10e4
- -10e4 <= nums[i] <= 10e4
- nums 为 无重复元素 的 升序 排列数组
- -10e4 <= target <= 10e4

### 思路

注意这道题目的前提是数组是**有序数组**，可以考虑使用二分法。

二分法使用完成后，要注意这 4 种情况

- 目标值在数组所有元素之前
- 目标值等于数组中某一个元素
- 目标值插入数组中的位置
- 目标值在数组所有元素之后的情况

其中 目标值等于数组中某一个元素 和上一题完全相同

我们只需要考虑另外 3 种情况

- 目标值在数组所有元素之前，循环跑完后，left 为 0，right 为 -1
- 目标值插入数组中的位置，循环跑完后，left 为 mid + 1，right 为 mid
- 目标值在数组所有元素之后的情况，循环跑完后，left 为 nums.length，right 为 nums.length - 1

所以 `return right + 1`

### 解法

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var searchInsert = function (nums, target) {
  // 定义开闭区间 [left, right]
  let left = 0
  let right = nums.length - 1
  let mid = 0

  while (left <= right) {
    // 定义二分中间值
    mid = Math.floor(left + (right - left) / 2)
    if (target < nums[mid]) {
      right = mid - 1
    } else if (target > nums[mid]) {
      left = mid + 1
    } else {
      return mid
    }
  }
  return right + 1
}
```

```
Accepted
64/64 cases passed (60 ms)
Your runtime beats 67.55 % of javascript submissions
Your memory usage beats 36.2 % of javascript submissions (41.2 MB)
```

## leetCode 34 在排序数组中查找元素的第一个和最后一个位置

给你一个按照非递减顺序排列的整数数组 nums，和一个目标值 target。请你找出给定目标值在数组中的开始位置和结束位置。

如果数组中不存在目标值 target，返回 [-1, -1]。

你必须设计并实现时间复杂度为 O(log n) 的算法解决此问题。


示例 1：

输入：nums = [5,7,7,8,8,10], target = 8
输出：[3,4]
示例 2：

输入：nums = [5,7,7,8,8,10], target = 6
输出：[-1,-1]
示例 3：

输入：nums = [], target = 0
输出：[-1,-1]


提示：

- 0 <= nums.length <= 10e5
- -10e9 <= nums[i] <= 10e9
- nums 是一个非递减数组
- -10e9 <= target <= 10e9

### 思路

1. 首先使用二分法得到 target 的位置
2. 寻找 target 左右两边是否有相等的值

### 解法

```js
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function (nums, target) {
  // 二分法
  let left = 0
  let right = nums.length - 1

  while (left <= right) {
    const middle = Math.floor(left + (right - left) / 2)
    if (target > nums[middle]) {
      left = middle + 1
    } else if (target < nums[middle]) {
      right = middle - 1
    } else {
      // 最后再寻找左右边界
      let leftMove = 1
      while (nums[middle] === nums[middle - leftMove]) {
        leftMove++
      }
      let rightMove = 1
      while (nums[middle] === nums[middle + rightMove]) {
        rightMove++
      }
      return [middle - leftMove + 1, middle + rightMove - 1]
    }
  }
  return [-1, -1]
}
```

```
Accepted
88/88 cases passed (48 ms)
Your runtime beats 98.98 % of javascript submissions
Your memory usage beats 79.4 % of javascript submissions (41.5 MB)
```

## leetCode 69 x 的平方根

给你一个非负整数 x ，计算并返回 x 的 算术平方根 。

由于返回类型是整数，结果只保留 整数部分 ，小数部分将被 舍去 。

注意：不允许使用任何内置指数函数和算符，例如 pow(x, 0.5) 或者 x ** 0.5 。

示例 1：

输入：x = 4
输出：2
示例 2：

输入：x = 8
输出：2
解释：8 的算术平方根是 2.82842..., 由于返回类型是整数，小数部分将被舍去。


提示：

0 <= x <= 2^31 - 1

### 思路

我们知道大于1的数字的平方根大于这个数的一半，所以我们在定义二分法区间的时候将 right 定义为 `x / 2`，当然这里定义为 x 也是可以的，仅仅多一次循环而已

每次循环取 left 到 right 的中间值 mid，计算出 mid 的平方

如果 mid 的平方 大于 x，则 mid 过大，可以将边界 right 赋值为 mid - 1

如果 mid 的平方 小于 x，则 mid 过小，可以将边界 left 赋值为 mid + 1

最后返回 left - 1 的值，因为如果没有完全平方的话，最后一次循环会将 left + 1 再退出 while，所以这里 - 1


### 解法

```js
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function (x) {
  if (x === 1) {
    return 1
  }
  let left = 0
  // 大于1的数字的平方根大于这个数的一半
  // 所以我们在定义二分法区间的时候将 right 定义为 x / 2
  // 当然这里定义为 x 也是可以的，仅仅多一次循环而已
  let right = x / 2
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2)
    const r = mid * mid
    if (r > x) { // 过大
      right = mid - 1
    } else if (r < x) { // 过小
      left = mid + 1
    } else {
      return mid
    }
  }
  return left - 1
}
```

```
Accepted
1017/1017 cases passed (64 ms)
Your runtime beats 89.63 % of javascript submissions
Your memory usage beats 29.38 % of javascript submissions (42.6 MB)
```

## leetCode 367 有效的完全平方数

给定一个 正整数 num ，编写一个函数，如果 num 是一个完全平方数，则返回 true ，否则返回 false 。

进阶：不要 使用任何内置的库函数，如  sqrt 。

示例 1：

输入：num = 16
输出：true
示例 2：

输入：num = 14
输出：false


提示：

1 <= num <= 2^31 - 1

### 思路

做过上一题，这一题就简单多了，直接二分法。

### 解法

```js
/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function (num) {
  if (num === 1) {
    return true
  }

  let left = 0
  let right = num / 2
  while (left <= right) {
    const mid = Math.floor(left + (right - left) / 2)
    const r = mid * mid
    if (r > num) {
      right = mid - 1
    } else if (r < num) {
      left = mid + 1
    } else {
      return true
    }
  }
  return false
}
```


```
Accepted
70/70 cases passed (56 ms)
Your runtime beats 84.94 % of javascript submissions
Your memory usage beats 69.41 % of javascript submissions (40.8 MB)
```

# 移除元素（双指针法）

## leetCode 27 移除元素

给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。

不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。

元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。

说明:

为什么返回数值是整数，但输出的答案是数组呢?

请注意，输入数组是以「引用」方式传递的，这意味着在函数里修改输入数组对于调用者是可见的。

你可以想象内部操作如下:

```
// nums 是以“引用”方式传递的。也就是说，不对实参作任何拷贝
int len = removeElement(nums, val);

// 在函数里修改输入数组对于调用者是可见的。
// 根据你的函数返回的长度, 它会打印出数组中 该长度范围内 的所有元素。
for (int i = 0; i < len; i++) {
    print(nums[i]);
}
```


示例 1：

```
输入：nums = [3,2,2,3], val = 3
输出：2, nums = [2,2]
解释：函数应该返回新的长度 2, 并且 nums 中的前两个元素均为 2。你不需要考虑数组中超出新长度后面的元素。例如，函数返回的新长度为 2 ，而 nums = [2,2,3,3] 或 nums = [2,2,0,0]，也会被视作正确答案。
```

示例 2：

```
输入：nums = [0,1,2,2,3,0,4,2], val = 2
输出：5, nums = [0,1,4,0,3]
解释：函数应该返回新的长度 5, 并且 nums 中的前五个元素为 0, 1, 3, 0, 4。注意这五个元素可为任意顺序。你不需要考虑数组中超出新长度后面的元素。
```


提示：

0 <= nums.length <= 100
0 <= nums[i] <= 50
0 <= val <= 100

### 思路

数组的元素在内存地址中是连续的，不能单独删除数组中的某个元素，只能覆盖。

双指针法（快慢指针法）在数组和链表的操作中是非常常见的，很多考察数组、链表、字符串等操作的面试题，都使用双指针法。

### 解法

```js
// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
var removeElement = function(nums, val) {
  let slow = 0 // 慢指针
  for (let fast = 0; fast < nums.length; fast++) { // 快指针遍历
    if (nums[fast] !== val) { // 非移除元素
      nums[slow] = nums[fast] // 赋值给慢指针的索引值
      slow++ // 慢指针右移
    }
  }
  return slow // 返回慢指针，移除元素后的数组长度
};
```

```
Accepted
113/113 cases passed (60 ms)
Your runtime beats 71.31 % of javascript submissions
Your memory usage beats 86.34 % of javascript submissions (41 MB)
```

## leetCode 283 移动零

给定一个数组 nums，编写一个函数将所有 0 移动到数组的末尾，同时保持非零元素的相对顺序。

请注意 ，必须在不复制数组的情况下原地对数组进行操作。

示例 1:

输入: nums = [0,1,0,3,12]
输出: [1,3,12,0,0]
示例 2:

输入: nums = [0]
输出: [0]


提示:

1 <= nums.length <= 10^4
-2^31 <= nums[i] <= 2^31 - 1

### 思路

方法一，使用快慢指针，快指针遇到非0元素时，将元素的值赋给慢指针，慢指针 + 1，最后再对末尾的0进行操作

方法二，使用快慢指针，快指针遇到非0元素时，直接进行交换，慢指针 + 1，这样就将0直接交换到了最后，一次循环搞定

### 解法

方法一

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let slow = 0
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      nums[slow] = nums[fast]
      slow++
    }
  }
  for (let i = slow; i < nums.length; i++) {
    nums[i] = 0
  }
}
```

```
Accepted
74/74 cases passed (72 ms)
Your runtime beats 98.08 % of javascript submissions
Your memory usage beats 59.63 % of javascript submissions (45.8 MB)
```

方法二

也可以优化为，直接交换元素，这里用了 es2015 里的解构语法

```js
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function (nums) {
  let slow = 0
  for (let fast = 0; fast < nums.length; fast++) {
    if (nums[fast] !== 0) {
      [nums[fast], nums[slow]] = [nums[slow], nums[fast]]
      slow++
    }
  }
}
```

```
Accepted
74/74 cases passed (64 ms)
Your runtime beats 99.88 % of javascript submissions
Your memory usage beats 38.6 % of javascript submissions (45.9 MB)
```

## leetCode 844 比较含退格的字符串

给定 s 和 t 两个字符串，当它们分别被输入到空白的文本编辑器后，如果两者相等，返回 true 。# 代表退格字符。

注意：如果对空文本输入退格字符，文本继续为空。


示例 1：

输入：s = "ab#c", t = "ad#c"
输出：true
解释：s 和 t 都会变成 "ac"。
示例 2：

输入：s = "ab##", t = "c#d#"
输出：true
解释：s 和 t 都会变成 ""。
示例 3：

输入：s = "a#c", t = "b"
输出：false
解释：s 会变成 "c"，但 t 仍然是 "b"。


提示：

1 <= s.length, t.length <= 200
s 和 t 只含有小写字母以及字符 '#'

### 思路

使用双指针，快指针遍历，慢指针生成最后的数组。

快指针遇到退格符号后，慢指针回退一次

需要注意不能直接操作字符串，需要将字符串先 split 为数组后操作

### 解法

```js
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
var backspaceCompare = function (s, t) {
  if (processStr(s) === processStr(t)) {
    return true
  }
  return false
}

function processStr(str) {
  const strArr = str.split('')
  let slow = 0
  for (let fast = 0; fast < strArr.length; fast++) {
    if (strArr[fast] !== '#') {
      strArr[slow] = strArr[fast]
      slow++
    } else {
      if (slow !== 0) {
        slow--
      }
    }
  }
  return strArr.slice(0, slow).join('')
}
```

```
Accepted
114/114 cases passed (60 ms)
Your runtime beats 80.48 % of javascript submissions
Your memory usage beats 86.45 % of javascript submissions (41.2 MB)
```

## leetCode 977 有序数组的平方

给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。

示例 1：

输入：nums = [-4,-1,0,3,10]
输出：[0,1,9,16,100]
解释：平方后，数组变为 [16,1,0,9,100]
排序后，数组变为 [0,1,9,16,100]
示例 2：

输入：nums = [-7,-3,2,3,11]
输出：[4,9,9,49,121]


提示：

1 <= nums.length <= 10^4
-10^4 <= nums[i] <= 10^4
nums 已按 非递减顺序 排序

### 思路

![](https://gw.alicdn.com/imgextra/i1/O1CN01ilkNrm1yIF01zYlLZ_!!6000000006555-1-tps-614-386.gif)

取原数组两端，作为2个指针

使用 while 判断 left <= right 时

对比 left 和 right 大小，取大数的平方，存入一个新数组

### 解法

```js
/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function(nums) {
  // 高级 api
  // return nums.map((item) => item * item).sort((a, b) => a - b)

  // 双指针
  let left = 0
  let right = nums.length - 1
  const result = []
  while (left <= right) {
    if (Math.abs(nums[left]) < Math.abs(nums[right])) {
      result.unshift(nums[right] * nums[right])
      right--
    } else {
      result.unshift(nums[left] * nums[left])
      left++
    }
  }
  return result
};
```

```
Accepted
137/137 cases passed (152 ms)
Your runtime beats 15.69 % of javascript submissions
Your memory usage beats 35.91 % of javascript submissions (47.5 MB)
```

# 滑动区间（双指针）

## leetCode 209 长度最小的子数组

给定一个含有 n 个正整数的数组和一个正整数 target 。

找出该数组中满足其和 ≥ target 的长度最小的 连续子数组 [numsl, numsl+1, ..., numsr-1, numsr] ，并返回其长度。如果不存在符合条件的子数组，返回 0 。

示例 1：

输入：target = 7, nums = [2,3,1,2,4,3]
输出：2
解释：子数组 [4,3] 是该条件下的长度最小的子数组。
示例 2：

输入：target = 4, nums = [1,4,4]
输出：1
示例 3：

输入：target = 11, nums = [1,1,1,1,1,1,1,1]
输出：0

提示：

1 <= target <= 10^9
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^5

## 思路

使用双指针，滑动窗口的思路

![](https://gw.alicdn.com/imgextra/i2/O1CN01bpmyGx1SdFSgBYuBB_!!6000000002269-1-tps-558-432.gif)

1. 快指针正常遍历
2. 累加快指针的值
3. 判断累加值是否大于等于 target，获取子串的长度
4. 累加值减去慢指针的值
5. 慢指针 + 1
6. 循环 3-5
7. 循环 1-6

## 解法

```js
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function (target, nums) {
  // 双指针滑动区间
  let slow = 0 // 滑动窗口的起始位置
  let sum = 0 // 滑动窗口数值之和
  let subLength = 0 // 滑动窗口的长度
  let result = nums.length + 1 // 最终结果
  for (let fast = 0; fast < nums.length; fast++) {
    // fast 为滑动窗口的终点位置
    sum += nums[fast]
    while (sum >= target) {
      // 如果满足条件，寻找最小的子序列
      subLength = fast - slow + 1
      result = Math.min(result, subLength)
      sum -= nums[slow]
      slow += 1
    }
  }
  return result === nums.length + 1 ? 0 : result
}
```

```
Accepted
20/20 cases passed (68 ms)
Your runtime beats 64.23 % of javascript submissions
Your memory usage beats 77.99 % of javascript submissions (45.1 MB)
```

## leetCode 904 水果成篮

你正在探访一家农场，农场从左到右种植了一排果树。这些树用一个整数数组 fruits 表示，其中 fruits[i] 是第 i 棵树上的水果 种类 。

你想要尽可能多地收集水果。然而，农场的主人设定了一些严格的规矩，你必须按照要求采摘水果：

你只有 两个 篮子，并且每个篮子只能装 单一类型 的水果。每个篮子能够装的水果总量没有限制。
你可以选择任意一棵树开始采摘，你必须从 每棵 树（包括开始采摘的树）上 恰好摘一个水果 。采摘的水果应当符合篮子中的水果类型。每采摘一次，你将会向右移动到下一棵树，并继续采摘。
一旦你走到某棵树前，但水果不符合篮子的水果类型，那么就必须停止采摘。
给你一个整数数组 fruits ，返回你可以收集的水果的 最大 数目。



示例 1：

输入：fruits = [1,2,1]
输出：3
解释：可以采摘全部 3 棵树。
示例 2：

输入：fruits = [0,1,2,2]
输出：3
解释：可以采摘 [1,2,2] 这三棵树。
如果从第一棵树开始采摘，则只能采摘 [0,1] 这两棵树。
示例 3：

输入：fruits = [1,2,3,2,2]
输出：4
解释：可以采摘 [2,3,2,2] 这四棵树。
如果从第一棵树开始采摘，则只能采摘 [1,2] 这两棵树。
示例 4：

输入：fruits = [3,3,3,1,2,1,1,2,3,3,4]
输出：5
解释：可以采摘 [1,2,1,1,2] 这五棵树。


提示：

1 <= fruits.length <= 10^5
0 <= fruits[i] < fruits.length

## 思路

我们可以使用滑动窗口解决本题，`left` 和 `right` 分别表示满足要求的窗口的左右边界，同时我们使用哈希表存储这个窗口内的数以及出现的次数。

我们每次将 `right` 移动一个位置，并将 `fruits[right]` 加入哈希表。如果此时哈希表不满足要求（即哈希表中出现超过两个键值对），那么我们需要不断移动 `left`，并将 `fruits[left]` 从哈希表中移除，直到哈希表满足要求为止。

需要注意的是，将 `fruits[left]` 从哈希表中移除的时候，如果 `fruits[left]` 在哈希表中的出现次数减少为 `0`，需要将对应的键值对从哈希表中移除。

## 解法

```js
/**
 * @param {number[]} fruits
 * @return {number}
 */
var totalFruit = function(fruits) {
  // 我们可以使用滑动窗口解决本题，left 和 right 分别表示满足要求的窗口的左右边界，同时我们使用哈希表存储这个窗口内的数以及出现的次数。

  // 我们每次将 right 移动一个位置，并将 fruits[right] 加入哈希表。如果此时哈希表不满足要求（即哈希表中出现超过两个键值对），那么我们需要不断移动 left，并将 fruits[left] 从哈希表中移除，直到哈希表满足要求为止。

  // 需要注意的是，将 fruits[left] 从哈希表中移除的时候，如果 fruits[left] 在哈希表中的出现次数减少为 0，需要将对应的键值对从哈希表中移除。

  let res = 0
  let left = 0

  const cateObj = {}

  for (let right = 0; right < fruits.length; right++) {
    cateObj[fruits[right]] = (cateObj[fruits[right]] || 0) + 1
    while (Object.keys(cateObj).length > 2) {
      cateObj[fruits[left]] -= 1
      if (cateObj[fruits[left]] === 0) {
        delete cateObj[fruits[left]]
      }
      left++
    }
    res = Math.max(res, right - left + 1)
  }
  return res
};
```

```
Accepted
91/91 cases passed (396 ms)
Your runtime beats 8.35 % of javascript submissions
Your memory usage beats 5.85 % of javascript submissions (56.7 MB)
```

# 螺旋矩阵

## leetCode

给你一个正整数 n ，生成一个包含 1 到 n2 所有元素，且元素按顺时针顺序螺旋排列的 n x n 正方形矩阵 matrix 。


示例 1：

![](https://gw.alicdn.com/imgextra/i4/O1CN01HyfCt21Q222qwT65l_!!6000000001917-2-tps-242-242.png)

输入：n = 3
输出：[[1,2,3],[8,9,4],[7,6,5]]
示例 2：

输入：n = 1
输出：[[1]]


提示：

1 <= n <= 20

## 思路

最外层用 while 进行圈数循环，然后沿着各个边进行循环，填写相应的值

## 解法

```js
/**
 * @param {number} n
 * @return {number[][]}
 */
var generateMatrix = function (n) {
  let loop = 0
  let startX = 0
  let startY = 0
  let offset = 1
  let count = 1
  let i = 0
  let j = 0

  // 初始化二位数组
  const res = []
  for (let i = 0; i < n; i++) {
    const temp = []
    for (let j = 0; j < n; j++) {
      temp.push(0)
    }
    res.push(temp)
  }

  // 旋转的圈数
  while (loop < n / 2) {
    // 四条边进行循环
    for (j = startY; j < n - offset; j += 1) {
      res[startX][j] = count
      count += 1
    }
    for (i = startX; i < n - offset; i += 1) {
      res[i][j] = count
      count += 1
    }
    for (; j > startY; j -= 1) {
      res[i][j] = count
      count += 1
    }
    for (; i > startX; i -= 1) {
      res[i][j] = count
      count += 1
    }
    startX += 1
    startY += 1
    offset += 1
    loop += 1
  }

  // 奇数有个中心值
  if (n % 2 === 1) {
    res[i][j] = count
  }
  return res
}
```

```
Accepted
20/20 cases passed (52 ms)
Your runtime beats 95.38 % of javascript submissions
Your memory usage beats 89.85 % of javascript submissions (41 MB)
```
