---
layout: post
title: '算法之 2 字符串篇'
categories: JavaScript
tags: algorithm
---

* content
{:toc}

字符串相关的算法题目




# leetCode 344 反转字符串

编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、使用 O(1) 的额外空间解决这一问题。

示例 1：

输入：s = ["h","e","l","l","o"]
输出：["o","l","l","e","h"]
示例 2：

输入：s = ["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]

提示：

1 <= s.length <= 10^5
s[i] 都是 ASCII 码表中的可打印字符

## 思路

遍历一半的长度，并前后互换位置

## 解法

```js
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
var reverseString = function(s) {
  for (let i = 0; i < s.length / 2; i++) {
    [s[i], s[s.length - 1 - i]] = [s[s.length - 1 - i], s[i]]
  }
};
```

```
Accepted
477/477 cases passed (88 ms)
Your runtime beats 62.86 % of javascript submissions
Your memory usage beats 99.2 % of javascript submissions (47.5 MB)
```

# leetCode 541 反转字符串 II

## 思路

将字符串拆分为数组，分组，各项反转，再重新组合。

## 解法

```js
/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function (s, k) {
  const arr = s.split('')
  let count = 0

  // 数组分组
  const arrRes = []
  for (let i = 0; i < arr.length; i += k) {
    const temp = []
    for (let j = i; j < k + i; j++) {
      if (s[j]) {
        if (count % 2 === 0) {
          temp.unshift(s[j]) // 反向存入
        } else {
          temp.push(s[j])
        }
      }
    }
    count++
    arrRes.push(...temp)
  }

  // 还原字符串
  return arrRes.join('')
}
```

```
Accepted
60/60 cases passed (72 ms)
Your runtime beats 29.7 % of javascript submissions
Your memory usage beats 5.05 % of javascript submissions (47.7 MB)
```

# 剑指Offer 05 替换空格

请实现一个函数，把字符串 s 中的每个空格替换成"%20"。

示例 1：

输入：s = "We are happy."
输出："We%20are%20happy."
 
限制：

0 <= s 的长度 <= 10000

## 解法

```js
/**
 * @param {string} s
 * @return {string}
 */
var replaceSpace = function(s) {
    const arr = s.split('')
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === ' ') {
            arr[i] = '%20'
        }
    }
    return arr.join('')
};
```

```
执行用时：
64 ms, 在所有 JavaScript 提交中击败了33.48%的用户
内存消耗：
40.7 MB, 在所有 JavaScript 提交中击败了91.35%的用户
通过测试用例：
27 / 27
```

# leetCode 151 反转字符串中的单词

给你一个字符串 s ，请你反转字符串中 单词 的顺序。

单词 是由非空格字符组成的字符串。s 中使用至少一个空格将字符串中的 单词 分隔开。

返回 单词 顺序颠倒且 单词 之间用单个空格连接的结果字符串。

注意：输入字符串 s中可能会存在前导空格、尾随空格或者单词间的多个空格。返回的结果字符串中，单词间应当仅用单个空格分隔，且不包含任何额外的空格。



示例 1：

输入：s = "the sky is blue"
输出："blue is sky the"
示例 2：

输入：s = "  hello world  "
输出："world hello"
解释：反转后的字符串中不能存在前导空格和尾随空格。
示例 3：

输入：s = "a good   example"
输出："example good a"
解释：如果两个单词间有多余的空格，反转后的字符串需要将单词间的空格减少到仅有一个。


提示：

1 <= s.length <= 104
s 包含英文大小写字母、数字和空格 ' '
s 中 至少存在一个 单词

## 解法

```js
/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function(s) {
  const arr = s.trim().split(/[' ']+/)
  return arr.reverse().join(' ')
};
```

```
Accepted
58/58 cases passed (60 ms)
Your runtime beats 84.18 % of javascript submissions
Your memory usage beats 92.99 % of javascript submissions (42.8 MB)
```

# 剑指Offer58-II.左旋转字符串

字符串的左旋转操作是把字符串前面的若干个字符转移到字符串的尾部。请定义一个函数实现字符串左旋转操作的功能。比如，输入字符串"abcdefg"和数字2，该函数将返回左旋转两位得到的结果"cdefgab"。

 

示例 1：

输入: s = "abcdefg", k = 2
输出: "cdefgab"
示例 2：

输入: s = "lrloseumgh", k = 6
输出: "umghlrlose"
 

限制：

1 <= k < s.length <= 10000


来源：力扣（LeetCode）
链接：https://leetcode.cn/problems/zuo-xuan-zhuan-zi-fu-chuan-lcof
著作权归领扣网络所有。商业转载请联系官方授权，非商业转载请注明出处。

## 解法

```js
/**
 * @param {string} s
 * @param {number} n
 * @return {string}
 */
var reverseLeftWords = function(s, n) {
    const left = s.substring(0, n)
    return s.substring(n, s.length) + left
};
```

```
执行用时：
64 ms, 在所有 JavaScript 提交中击败了60.49%的用户
内存消耗：
42.6 MB, 在所有 JavaScript 提交中击败了86.36%的用户
通过测试用例：
34 / 34
```

# leetCode 459 重复的子字符串

给定一个非空的字符串 s ，检查是否可以通过由它的一个子串重复多次构成。

示例 1:

输入: s = "abab"
输出: true
解释: 可由子串 "ab" 重复两次构成。
示例 2:

输入: s = "aba"
输出: false
示例 3:

输入: s = "abcabcabcabc"
输出: true
解释: 可由子串 "abc" 重复四次构成。 (或子串 "abcabc" 重复两次构成。)


提示：

1 <= s.length <= 104
s 由小写英文字母组成

## 思路

我们将两个 ss 连在一起，并移除第一个和最后一个字符。如果 ss 是该字符串的子串，那么 ss 就满足题目要求

需要先进行较为复杂的数学证明

## 解法

```js
/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function(s) {
  const double = (s + s).substring(1, s.length * 2 - 1)
  return double.indexOf(s) !== -1
};
```

```
Accepted
129/129 cases passed (64 ms)
Your runtime beats 86.86 % of javascript submissions
Your memory usage beats 82.62 % of javascript submissions (43.4 MB)
```
