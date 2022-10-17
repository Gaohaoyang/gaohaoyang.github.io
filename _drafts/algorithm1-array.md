---
layout: post
title:  "算法之数组篇"
categories: JavaScript
tags:  algorithm
---

* content
{:toc}

数组是存放在连续内存空间上的相同类型数据的集合。需要两点注意的是

- 数组下标都是从0开始的
- 数组内存空间的地址是连续的

正是因为数组的在内存空间的地址是连续的，所以我们在删除或者增添元素的时候，就难免要移动其他元素的地址。数组的元素是不能删的，只能覆盖。




# 二分查找

给定一个 n 个元素有序的（升序）整型数组 nums 和一个目标值 target  ，写一个函数搜索 nums 中的 target，如果目标值存在返回下标，否则返回 -1。


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

## 思路

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

但我们还是学习一下二分查找的思路

1. 定义一个区间 `[left, right]`，其中 right 为数组的最后一项下标
2. 判断如果 `left <= right` 时，获取一次 left 到 right 的中间值 middle，这里要注意 middle 要使用 `Math.floor` 取整数。
3. 判断如果下标为 middle 的数值 < target，则 target 在 middle 的右边，将 left 赋值为 middle + 1
4. 判断如果下标为 middle 的数值 > target，则 target 在 middle 的左边，将 right 赋值为 middle - 1
5. 否则如果 middle === target，直接返回 middle
6. 循环 2-5 步骤
7. 否则返回 -1

## 解法

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



