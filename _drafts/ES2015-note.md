---
layout: post
title:  "ES2015学习笔记1-let和const、变量解构赋值、字符串、正则、数值"
categories: JavaScript
tags:  ES2015
---

* content
{:toc}

新的框架都支持 ES2015 了，虽然浏览器不支持部分语法，但是有 Babel 这个神器，ES2015 的普及大势所趋。更优雅地写代码，对技术的追求是一件很有意思的事情！




![bloggbild_david_JS.jpg](https://ooo.0o0.ooo/2016/06/15/576125e78370d.jpg)

## `let` 和 `const`

### `let`

#### 基本用法

用于声明变量，用法类似于`var`，但声明的变量只在`let`所在的代码块内有效。

```js
{
    let a = 10;
    var b = 1;
}
console.log(a) // ReferenceError: a is not defined.
console.log(b) // 1
```

`for`循环计数器，就很适合`let`命令。

```js
for (let i = 0; i < array.length; i++) {
    //...
}
console.log(i) //ReferenceError: i is not defined.
```

### `const`

## 变量解构赋值

## 字符串

## 正则

## 数值
