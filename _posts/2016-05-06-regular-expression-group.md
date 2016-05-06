---
layout: post
title:  "浅谈正则表达式中的分组"
date:   2016-05-06 11:40:18 +0800
categories: JavaScript
tags: JavaScript 正则 分组 Regular
---

* content
{:toc}

## 问题

在外刊君读者群中看到有人提出这样的一个需求：

> 把字符串切成连续相同字符的正则怎么写？比如`abbcccdddd`切成`a,bb,ccc,dddd`

之前我对正则表达式也是略有研究，想尝试一下。其实我对正则表达式的学习基本完全来源于犀牛书的第10章，真正看懂这一章，我觉得操作正则表达式应该不在话下。





## 我的答案

先给出我的答案吧：

```js
'abbccddd'.match(/(\w)\1*/g) // ["a", "bb", "cc", "ddd"]
```

## 说明

下面详细说说分组和引用