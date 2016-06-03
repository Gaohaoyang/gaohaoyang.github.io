---
layout: post
title:  "JavaScript 语言精粹笔记1-语法、对象、函数"
categories: JavaScript
tags: JavaScript 对象 函数
---

* content
{:toc}

记录一下阅读蝴蝶书的笔记，本篇为第一部分包含书中前三章内容：语法、对象和函数。





原书中第一章为精华，做了一些周边介绍，略去。

## 语法

### 空白

这里说一下JavaScript的注释，一种是 `/* */` 包围的块注释，另一种是 `//` 开头的行注释。

因为块注释的字符可能是JavaScript中正则表达式字面量，因此不是很安全，如：

```js
/*
    var rm_a = /a*/.match(s)
*/
```

### 标识符

标识符由一个字母开头，后面可选择性的加上一个或多个字母、数字或下划线。要避免保留字。

标识符被用于语句、变量、参数、属性名、运算符和标记。

### 数字

可以存在指数部分，100和1e2完全相等

```js
100 === 1e2 // true
```

使用`isNaN`来检测`NaN`。

### 字符串

当年 JavaScript 被创建的时候，Unicode 是16位字符集，因此 JavaScript 字符串是16位的。

用双引号或单引号包裹。

重点说一下转义字符`\`

反斜杠后面可以跟`"`, `'`, `\`, `/`, `b` (backspace), `f` (formfeed), `n`, `r` (carriage return), `t`, `u1234`

```js
'A' === '\u0041' // true
```

### 语句

每个`<script>`标签的内容被一起抛到一个公共的全局名字空间中。

`{...}`代码块不会创建新的作用域，因此变量应该被定义在函数的头部，而不是在代码块中。

下列值当做假：

* `false`
* `null`
* `undefined`
* `''`
* `0`
* `NaN`

其他所有值都当做真

`for in`语句枚举对象的所有属性名（键名），使用`object.hasOwnProperty(variable)`来确定这个属性名是该对象成员，还是来自原型链。

```js
for (myvar in obj) {
    if (obj.hasOwnProperty(myvar)) {
        ...
    }
}
```

### 表达式

运算符优先级

运算符 | 说明
----- | -----
`.` `[]` `()` | 提取属性与调用函数
`delete` `new` `typeof` `+` `-` `!` | 一元运算符
`*` `/` `%` |
`+` `-` |
`>=` `<=` `>` `<` |
`===` `!==` |
`&&` | 逻辑与
`||` | 逻辑或
`?:` | 三目

### 字面量

对象字面量是一种可以方便地按指定规格创建新对象的表示法。

数组字面量是一种可以方便地按指定规格创建新数组的表示法。

### 函数

函数字面量定义了函数值。后续章节详谈。

## 对象

对象是属性的容器，每一个属性都拥有名字和值。属性的名字可以是包含空字符串在内的任意字符串。属性的值可以是除`undefined`值之外的任何值。

JavaScript 包含一种原型链的特性，允许对象继承另一个对象的属性。正确地使用它能减少对象初始化时小韩的时间和内存。

### 对象字面量

一个对象字面量就是包围在一对花括号中的零或多个“名/值”对。

```js
var empty_object = {}

var stooge = {
    firstName: 'Haoyang',
    lastName: 'Gao'
}
```

### 检索

```js
console.log(stooge.firstName); // Haoyang
console.log(stooge['firstName']); // Haoyang
```

不存在的属性返回`undefined`。

使用`||`来填充默认值。

```js
console.log(stooge.firstName || 'Joe'); // Haoyang
console.log(stooge.age || 25); // 25
```

### 更新

### 引用

### 原型

### 反射

### 枚举

### 删除

### 减少全局变量污染
