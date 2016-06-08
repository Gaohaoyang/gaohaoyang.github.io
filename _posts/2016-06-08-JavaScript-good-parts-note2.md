---
layout: post
title:  "JavaScript 语言精粹笔记2-继承、数组、正则表达式"
categories: JavaScript
tags:  继承 对象 原型 Array 正则
---

* content
{:toc}

记录一下阅读蝴蝶书的笔记，本篇为书中以下章节的笔记：继承、数组和正则表达式。




## 继承

继承的两大好处：代码重用，引入一套类型系统的规范。

### 伪类

JavaScript 通过构造器函数产生对象。

构造器调用模式，即用`new`前缀去调用一个函数。

```js
var Mammal = function(name) {
    this.name = name
}

Mammal.prototype.getName = function() {
    return this.name
}

Mammal.prototype.says = function() {
    return this.saying || ''
};

var myMammal = new Mammal('Herb')
console.log(myMammal.getName()) //Herb
```

书中不推荐这样的写法。有很多风险。若忘记添加`new`前缀，`this`无法绑定到新的对象上。而是绑定到了全局对象上，破坏了全局变量环境。

### 对象说明符

上一节中的构造器可能要接受一大串参数。我们可以这样写：

```js
var myObject = Maker({
    first: f,
    middle: m,
    last: l,
    state: s,
    city: c
})
```

将JSON对象传递给构造器，而它返回一个构造完全的对象。

### 原型

在一个纯粹的原型模式中，我们将摒弃类，转而专注于对象。一个新对象可以继承一个就对象的属性。

```js
var myMammal = {
    name: 'MM',
    getName: function() {
        return this.name
    },
    says: function() {
        return this.saying || ''
    }
}

var myCat = Object.create(myMammal)
myCat.name = 'Kitty'
myCat.saying = 'meow'
myCat.run = function() {
    return 'Kitty is running'
}
myCat.getName = function() {
    return this.says + ' ' + this.name + ' ' + this.says
}
```

这是一种差异化继承。

### 函数化

前文看到的继承模式没法保护隐私。对象的所有属性都是可见的。无法得到私有变量和私有函数。为了解决这一问题，我们有模块模式。

构造一个生成对象的函数需要4步骤：

1. 创建一个新对象。
2. 有选择的定义私有变量和方法。
3. 给这个新对象扩充方法。
4. 返回那个新对象。

```js
var mammal = function(spec) {
    var that = {}

    that.getName = function() {
        return spec.name
    }
    that.says = function() {
        return spec.saying || ''
    }

    return that
}

var myMammal = mammal({
    name: 'Herb',
    saying: 'Cheers!'
})

console.log(myMammal.getName()) //Herb
console.log(myMammal.says()) //Cheers!
```

也可以参考上一篇文章，[JavaScript 语言精粹笔记1-语法、对象、函数 之模块部分](http://gaohaoyang.github.io/2016/06/07/JavaScript-good-parts-note1/#section-34)。

### 部件

这一部分看的不是特别懂，我想等我学完ES2015中的类和模块部分后再看看吧。

## 数组

### 数组字面量

一个数组字面量是在一对方括号中包围零个或多个用逗号分隔的值的表达式。

再大多数语言中，一个数组的多有元素都要求是相同的类型。JavaScript 允许数组包含任意混合类型的值。

### 长度

JavaScript 数组的`length`属性是没有上界的。如果用大于或等于当前`length`的数字作为下标来存储一个元素，那么`length`值会被增大以容纳新元素，不会发生数组越界错误。

### 删除

数组也是对象，可以用`delete`来删除元素

```js
var numbers = ['one', 'two', 3, 'four', 'wu']

delete numbers[0]
console.log(numbers[0]) //undefined
console.log(numbers.length) //5
```

可以使用`splice`方法，进行删除和修改操作。

```js
numbers.splice(0, 1)
console.log(numbers[0]) //two
console.log(numbers.length) //4
```

### 枚举

使用常规`for`循环即可，可以保证数组的顺序。

### 容易混淆的地方

当属性名是小而连续的整数时，应该使用数组，否则使用对象。

```js
console.log(typeof [1, 2]) //object
```

返回数组的类型是`object`，没有任何意义。

判断数组类型的方法

```js
console.log(Array.isArray(numbers)) //true
```
ECMAScript 5.1 (ECMA-262) 和 ECMAScript 2015 (6th Edition, ECMA-262) 标准中的方法。

或者下面这个方法。
```js
var is_array = function(value) {
    return Object.prototype.toString.apply(value) === '[object Array]'
}
console.log(is_array(numbers)) //true
```

### 方法

数组的方法被存储在`Array.prototype`中的函数。

数组是对象，因此`Array.prototype`也是可扩充的。

### 指定初始值

JavaScript 的数组不会预制值。

JavaScript 没有多维数组，单项大多数类 C 语言一样，支持元素为数组的数组。

```js
var matrix = [
    [7, 8, 9],
    [4, 5, 6],
    [1, 2, 3]
]
console.log(matrix[1][2]) //6
```

## 正则表达式

关于正则表达式，以前的博文写的比较多了，详情见：

[百度Web前端技术学院(2)-JavaScript 基础 之正则表达式部分1](http://gaohaoyang.github.io/2015/04/22/baidu-ife-2-javascript/#section-10)

[百度Web前端技术学院(2)-JavaScript 基础 之正则表达式部分2](http://gaohaoyang.github.io/2015/04/22/baidu-ife-2-javascript/#section-12)

[浅谈正则表达式中的分组和引用](http://gaohaoyang.github.io/2016/05/06/regular-expression-group/)
