---
layout: post
title:  "JavaScript 语言精粹笔记"
date:   2017-05-12 11:40:18 +0800
categories: JavaScript
tags: JavaScript
---

* content
{:toc}

记录一下读这本书过程中自己还需要知道的细节。





## 语法

### 空白

这里说一下JavaScript的注释，一种是 `/* */` 包围的块注释，另一种是 `//` 开头的行注释。

因为块注释的字符可能是JavaScript中正则表达式字面量，因此不是很安全，如：

```js
/*
    var rm_a = /a*/.match(s)
*/
```

### 数字

可以存在指数部分，100和1e2完全相等

```js
100 === 1e2 // true
```

### 字符串

当年JavaScript被创建的时候，Unicode是16位字符集，因此JavaScript字符串是16位的。

用双引号或单引号包裹。

重点说一下转移字符`\`

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

### 函数
