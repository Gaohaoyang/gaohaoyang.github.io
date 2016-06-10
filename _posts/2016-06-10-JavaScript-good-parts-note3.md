---
layout: post
title:  "JavaScript 语言精粹笔记3-方法、毒瘤等"
categories: JavaScript
tags:  函数 JavaScript
---

* content
{:toc}

记录一下阅读蝴蝶书的笔记，本篇为书中最后一部分：方法、代码风格、优美的特性、毒瘤、糟粕等。




## 方法

这一章主要介绍了一些方法集。这里写几个我不太熟悉的方法和要点吧。

* `array.join()`

    > 对于IE6/7，使用`array.join()`连接大量字符串的效率确实优于使用`+`元素运算符。但是目前主流的浏览器，包括IE8以后的版本，都对`+`元素运算符连接字符串做了特别优化，性能已经显著高于`array.join()`。

* `number.toExponential(fractionDigits)`

    把这个`number`转换成一个指数形式的字符串。

* `number.toFixed(fractionDigits)`

    将这个`number`转换成一个十进制形式的字符串。


## 毒瘤

* 注意全局变量的引入。

* JavaScript 中 Unicode 是16位的。包含65536个字符（基本多文种平面 Basic Multilingual Plane）。剩下的百万字符中的每一个都可以用一对字符来表示。Unicode 把一对字符视为一个单一的字符，而 JavaScript 认为一对字符是两个不同的字符。

* 检测`null`的方式。

```js
console.log(typeof null) //object

myValue === null //检测 null

if (myValue && typeof myValue === 'object') {
    // myValue 是一个对象或数组！
}
```

* `parseInt` 把字符串转化为整数的函数。它遇到非数字时会停止解析，所以`parseInt('16')`和`parseInt('16ton')`产生相同的结果。

    如果该字符串第一个字符是0，那么该字符串会基于八进制而不是十进制来求职。在八进制中，8和9不是数字，所以`parseInt('08')`和`parseInt('09')`都产生0作为结果。但`parseInt()`可以接受基数，因此`parseInt('08',10)`结果为8，建议总是加上这个基数参数。

* JavaScript 的对象永远不会是真的空对象，因为它们可以送原型链中取得成员属性。

## 糟粕

* 避免使用`with`语句。

* 避免使用`eval`语句。

* `continue`可能会降低运算性能。

* 位运算符在 JavaScript 会非常慢。

    Java 里，位运算符处理的是整数。JavaScript 没有整数类型，它只有双精度的浮点数，因此，位运算符把它们的数字运算数先转换为整数，执行运算，在转换回去。JavaScript 的执行环境一般接触不到硬件，所以非常慢。

* 避免使用包装对象。`new Object`和`new Array`等。

* 避免使用`void`。

本系列结束。
