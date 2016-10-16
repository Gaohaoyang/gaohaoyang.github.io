---
layout: post
title:  "Fisher–Yates shuffle 洗牌算法"
categories: JavaScript
tags:  算法 shuffle 乱序 洗牌
author: HyG
---

* content
{:toc}

简单来说 Fisher–Yates shuffle 算法是一个用来将一个有限集合生成一个随机排列的算法（数组随机排序）。这个算法生成的随机排列是等概率的。同时这个算法非常高效。

本文主要介绍这个算法的来源、演变、原理。并举出一个例子为大家清晰的描述每次迭代过程。最后使用 JavaScript 代码将算法实现。

![](https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Riffle_shuffle.jpg/320px-Riffle_shuffle.jpg)




## Fisher and Yates 的原始版

![](https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Biologist_and_statistician_Ronald_Fisher.jpg/189px-Biologist_and_statistician_Ronald_Fisher.jpg)

Fisher–Yates shuffle 的原始版本，最初描述在 1938 年的 Ronald Fisher（上图） 和 Frank Yates 写的书中，书名为《Statistical tables for biological, agricultural and medical research》。他们使用纸和笔去描述了这个算法，并使用了一个随机数表来提供随机数。它给出了 1 到 N 的数字的的随机排列，具体步骤如下：

1. 写下从 1 到 N 的数字
2. 取一个从 1 到剩下的数字（包括这个数字）的随机数 k
3. 从低位开始，得到第 k 个数字（这个数字还没有被取出），把它写在独立的一个列表的最后一位
4. 重复第 2 步，直到所有的数字都被取出
5. 第 3 步写出的这个序列，现在就是原始数字的随机排列

已经证明如果第 2 步取出的数字是真随机的，那么最后得到的排序一定也是。

## 现代方法

Fisher–Yates shuffle 算法的现代版本是为计算机设计的。由 Richard Durstenfeld 在1964年 描述。并且是被 Donald E. Knuth 在 《The Art of Computer Programming》 中推广。但是不管是 Durstenfeld 还是 Knuth，都没有在书的第一版中承认这个算法是 Fisher 和 Yates 的研究成果。也许他们并不知道。不过后来出版的 《The Art of Computer Programming》提到了 Fisher 和 Yates 贡献。

现代版本的描述与原始略有不同，因为如果按照原始方法，愚蠢的计算机会花很多无用的时间去计算上述第 3 步的剩余数字。**这里的方法是在每次迭代时交换这个被取出的数字到原始列表的最后**。这样就将时间复杂度从 O(n^2) 减小到了 **O(n)**。算法的伪代码如下：

```
-- To shuffle an array a of n elements (indices 0..n-1):
for i from n−1 downto 1 do
     j ← random integer such that 0 ≤ j ≤ i
     exchange a[j] and a[i]
```

## 例子

### 迭代步骤演示

根据每次迭代次数可以用下面的表格，描述这个算法的执行过程

| 随机数取值范围 | 随机数 |        原始数据 | 结果          |
|:---------------|:-------|----------------:|:--------------|
|                |        | 1 2 3 4 5 6 7 8 |               |
| 1-8            | 6      |   1 2 3 4 5 7 8 | 6             |
| 1-7            | 2      |     1 7 3 4 5 8 | 2 6           |
| 1–6            | 6      |       1 7 3 4 5 | 8 2 6         |
| 1–5            | 1      |         5 7 3 4 | 1 8 2 6       |
| 1–4            | 3      |           5 7 4 | 3 1 8 2 6     |
| 1–3            | 3      |             5 7 | 4 3 1 8 2 6   |
| 1–2            | 1      |               7 | 5 4 3 1 8 2 6 |

### 动画演示

下面这个动画就是整个数组 0-19 的随机排序过程

<iframe height='317' scrolling='no' src='//codepen.io/haoyang/embed/jrvrQq/?height=317&theme-id=dark&default-tab=result&embed-version=2' frameborder='no' allowtransparency='true' allowfullscreen='true' style='width: 100%;'>See the Pen <a href='https://codepen.io/haoyang/pen/jrvrQq/'>Fisher–Yates shuffle</a> by Chuan shi (<a href='http://codepen.io/haoyang'>@haoyang</a>) on <a href='http://codepen.io'>CodePen</a>.
</iframe>

## JavaScript 代码实现

```js
/**
 * Fisher–Yates shuffle
 */
Array.prototype.shuffle = function() {
    var input = this;

    for (var i = input.length-1; i >=0; i--) {

        var randomIndex = Math.floor(Math.random()*(i+1));
        var itemAtIndex = input[randomIndex];

        input[randomIndex] = input[i];
        input[i] = itemAtIndex;
    }
    return input;
}
```

使用方式也很简单，直接用数组调用这个方法即可

```js
[1,2,3,4,5,6,7,8].shuffle()

//[4, 6, 3, 2, 5, 1, 7, 8] // 每次结果都是随机的
```

## 总结

总之，Fisher–Yates shuffle 算法是一个非常高效又公平的随机排序算法，如果有随机排序数组的需求，用这个就对了！

## 参考

- [Fisher–Yates shuffle From Wikipedia](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle)
