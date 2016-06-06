---
layout: post
title:  "JavaScript 语言精粹笔记1-语法、对象、函数"
categories: JavaScript
tags: JavaScript 对象 函数 this
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

JavaScript 包含一种原型链的特性，允许对象继承另一个对象的属性。正确地使用它能减少对象初始化时消耗的时间和内存。

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

直接使用赋值语句更新，若不存在这个属性，则作为扩充操作。

```js
stooge.firstName = 'aaa'
stooge.nickName = 'peip'
console.log(stooge) //Object {firstName: "aaa", lastName: "Gao", nickName: "peip"}
```

### 引用

对象通过引用来传递他们永远不会被复制。

```js
var x = stooge
x.hair = 'black'
stooge.hair //"black"
```

### 原型

每一个对象都连接到一个原型对象，并且它可以从中继承属性。所有通过字面量创建的对象都连接到`Object.prototype`，它是JavaScript中的标配对象。

可以使用`Object.create()`方法创建一个使用原对象作为其原型的新对象。

```js
var anotherStooge = Object.create(stooge)
anotherStooge.firstName //"aaa"
anotherStooge.firstName = 'bbb'
anotherStooge.firstName //"bbb"
anotherStooge.hair //"black"
```

新对象先查找自己的属性，若不存在则会向原型方向查找。

![](http://ww1.sinaimg.cn/large/7011d6cfjw1f4ieu7focqj207h05caaf.jpg)

当我们对某个对象作出改变时，不会触及该对象的原型。

原型关系是一种动态关系。如果我们添加一个新的属性到原型中，该属性会立即对所有基于该原型创建的对象可见。

### 反射

在计算机科学中，反射是指计算机程序在运行时（Run time）可以访问、检测和修改它本身状态或行为的一种能力。

检查对象并确定对象有什么属性是很容易的事情，只要试着去检索该属性并验证取得的值。

`typeof`用来确定对象属性的类型。

`hasOwnProperty`，若对象拥有独有的属性，它将返回`true`。不会检查原型链。

### 枚举

使用`for in`可以遍历一个对象中的所有属性名，包括原型链上的属性名。可以使用`hasOwnProperty`过滤原型链上的属性，使用`typeof`来排除函数。

```js
for (var name in anotherStooge) {
    if (anotherStooge.hasOwnProperty(name) && typeof anotherStooge[name] !== 'function') {
        console.log(name + '--->' + anotherStooge[name])
    }
}
// firstName--->bbb
```

属性名是无序的，若想保持顺序应使用数组和`for`循环。

### 删除

`delete`可以用来删除对象的属性。若对象包含该属性，则会被移除。它不会触及原型链中的任何对象。

```js
anotherStooge.firstName //"bbb"
delete anotherStooge.firstName
anotherStooge.firstName //"aaa"
```

### 减少全局变量污染

JavaScript 可以随意的定义全局变量来容纳应用的所有资源。但这会削弱程序的灵活性，应避免使用全局变量。

最小化使用全局变量的方法之一是为应用只创建一个唯一的全局变量。

```js
var MYAPP = {}

MYAPP.stooge = {
    //...
}

MYAPP.flight = {
    //...
}
```
下一章将使用闭包来进行信息隐藏，是另一种有效减少全局污染的方法。

## 函数

### 函数对象

JavaScript 中的函数就是对象。函数对象连接到`Function.prototype`（该原型对象本身连接到`Object.prototype`）。每个函数对象在创建时会附加两个隐藏属性：函数的上下文和实现函数行为的代码。

函数对象在创建时也随配有一个`prototype`属性。它的值是一个拥有`constructor`属性且值即为该函数对象。

```js
function add(a, b) {
    return a + b
}
```

![](http://ww1.sinaimg.cn/large/7011d6cfjw1f4lrei2b3pj208f06et95.jpg)

因为函数是对象，所以可以像任何其他的值一样被使用。函数可以保存在变量、对象和数组中。函数可以被当做参数传递给其他函数，函数也可以再返回函数。函数也可以拥有方法。

函数的与众不同之处在于可以被调用。

### 函数字面量

函数对象通过函数字面量来创建。

```js
var add = function(a, b) {
    return a + b
}
```

函数字面量包含4部分，分别是：保留字 function、函数名、参数、花括号中的语句。

### 调用

调用一个函数会暂停当前函数的执行，传递控制权和参数给新函数。除了声明时定义的形式参数，还有两个附加参数：`this`和`arguments`。参数`this`在面向对象编程中非常重要，它的值取决于调用的模式。JavaScript中一共有4中调用模式：方法调用模式、函数调用模式、构造器调用模式、apply调用模式。

实参和形参个数不匹配时，不会有运行时错误。实参过多时，超出的实参被忽略。形参过多时，缺失的值被替换为`undefined`。

下面的内容也可以参考我以前的博文 [JavaScript 中的 this](http://gaohaoyang.github.io/2015/06/12/JavaScript-this/)

#### 方法调用模式

当一个函数被保存为对象的一个属性时，我们称它为一个方法。当一个方法被调用时，`this`被绑定到该对象。

```js
var myObject = {
    value: 0,
    increment: function(inc) {
        this.value += typeof inc === 'number' ? inc : 1
    }
}

myObject.increment()
console.log(myObject.value) //1

myObject.increment(3)
console.log(myObject.value) //4
```

#### 函数调用模式

当一个函数并非一个对象的属性时，那么它就是被当做一个函数来调用的。

此时`this`被绑定到全局对象。即时是内部函数也会将`this`绑定到全局对象。

可以在函数内创建一个属性并赋值为`this`来解决这个问题。如下：

```js
var add = function(a, b) {
    return a + b
}

myObject.double = function() {
    var that = this
    var helper = function() {
        that.value = add(that.value, that.value)
    }
    helper()
}

myObject.double()
console.log(myObject.value) //8
```

#### 构造器调用模式

JavaScript是一门基于原型继承的语言。对象可以直接从其他对象继承属性。该语言是无类型的。

如果在一个函数前面带上`new`来调用，那么背地里将会创建一个连接到该函数的`prototype`成员的新对象，同时`this`会被绑定到那个新对象上。

```js
//创建构造器函数
var Quo = function(string) {
    this.status = string
}

//给Que的所有实例提供一个公共方法
Quo.prototype.getStatus = function() {
    return this.status
}

//实例化
var myQuo = new Quo('confused')

console.log(myQuo.getStatus()) //confused
```

书中不推荐这种形式的构造器函数，下一章有更好的解决方案。

#### Apply 调用模式

`apply`方法让我们构建一个参数数组传递给调用函数。他也允许我们选择`this`的值。`apply`方法接受两个参数，第一个是要绑定给`this`的值，第二个是参数数组。

```js
var arr = [3, 4]
var sum = add.apply(null, arr)
console.log(sum) //7

var statusObject = {
    status: 'hello'
}

var status = Quo.prototype.getStatus.apply(statusObject)
console.log(status) //hello
```

### 参数

### 返回

### 异常

### 扩充类型的功能

### 递归

### 作用域

### 闭包

### 回调

### 模块

### 级联

### 柯里化

### 记忆
