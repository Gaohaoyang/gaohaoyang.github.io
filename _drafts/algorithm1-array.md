---
layout: post
title: '算法之数组篇'
categories: JavaScript
tags: algorithm
---

- content
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

- 1 <= nums.length <= 104
- -104 <= nums[i] <= 104
- nums 为 无重复元素 的 升序 排列数组
- -104 <= target <= 104

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
