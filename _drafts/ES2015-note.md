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

本文主要以 [ECMAScript 6 入门 -阮一峰](http://es6.ruanyifeng.com/) 作为参考资料。

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

#### 不存在变量提升

`let`不像`var`那样会发生“变量提升”现象。所以，变量一定要在声明后使用，否则报错。

```js
console.log(a) //undefined
console.log(b) //VM248:2 Uncaught ReferenceError: b is not defined(…)

var a = 1
let b = 2
```

声明`b`之前，变量`b`是不存在的，这时如果用到它，就会抛出一个错误。

#### 暂时性死区

```js
if (true) {
    // TDZ开始
    tmp = 'abc'; // ReferenceError
    console.log(tmp); // ReferenceError

    let tmp; // TDZ结束
    console.log(tmp); // undefined

    tmp = 123;
    console.log(tmp); // 123
}
```

ES6 明确规定，如果区块中存在`let`和`const`命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

总之，在代码块内，使用`let`命令声明变量之前，该变量都是不可用的。这在语法上，称为“暂时性死区”（temporal dead zone，简称TDZ）。

#### 不允许重复声明

`let`不允许在相同作用域内，重复声明同一个变量。

```js
// 报错
function a() {
    let a = 10;
    var a = 1;
}

// 报错
function b() {
    let a = 10;
    let a = 1;
}
```

### 块级作用域

没有块级作用域时会出现的两个问题：

1. 内层变量可能会覆盖外层变量。
2. 用来计数的循环变量泄露为全局变量。

`let`实际上为 JavaScript 新增了块级作用域。

* 外层作用域无法读取内层作用域的变量。
* 内层作用域可以定义外层作用域的同名变量。
* 块级作用域的出现，实际上使得获得广泛应用的立即执行匿名函数（IIFE）不再必要了。
* 函数本身的作用域，在其所在的块级作用域之内。

### `const`

`const`声明一个只读的常量。一旦声明，常量的值就不能改变。

```js
const PI = 3.1415;
PI = 3; // 常规模式时，重新赋值无效，但不报错
//但是我在Chrome下运行报错了，错误如下
//Uncaught TypeError: Assignment to constant variable.
console.log(PI); // 3.1415
```

`const`声明的变量不得改变值，这意味着，`const`一旦声明变量，就必须立即初始化，不能留到以后赋值。

`const`的作用域与`let`命令相同：只在声明所在的块级作用域内有效。

`const`命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。

对于复合类型的变量，变量名不指向数据，而是指向数据所在的地址。`const`命令只是保证变量名指向的地址不变，并不保证该地址的数据不变，所以将一个对象声明为常量必须非常小心。

```js
const foo = {};
foo.prop = 123;

console.log(foo.prop) // 123

foo = {}; // TypeError: "foo" is read-only
```

上面代码中，常量`foo`储存的是一个地址，这个地址指向一个对象。不可变的只是这个地址，即不能把`foo`指向另一个地址，但对象本身是可变的，所以依然可以为其添加新属性。

如果真的想将对象冻结，应该使用`Object.freeze`方法。

ES5 只有两种声明变量的方法：`var`命令和`function`命令。ES6 除了添加`let`和`const`命令，后面章节还会提到，另外两种声明变量的方法：`import`命令和`class`命令。所以，ES6 一共有6种声明变量的方法。

### 全局对象属性

`var`命令和`function`命令声明的全局变量，依旧是全局对象的属性；另一方面规定，`let`命令、`const`命令、`class`命令声明的全局变量，不属于全局对象的属性。也就是说，从 ES6 开始，全局变量将逐步与全局对象的属性脱钩。

```js
var a = 1;
// 如果在Node的REPL环境，可以写成global.a
// 或者采用通用方法，写成this.a
window.a // 1

let b = 1;
window.b // undefined
```

## 变量的解构赋值

### 数组的解构赋值

#### 基本用法

ES6允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

```js
var a = 1
var b = 2
var c = 3

//ES6 中允许写成下面这样
var [a,b,c] = [1,2,3]
```

如果解构不成功，变量的值就等于`undefined`。

```js
let [a, b] = [1]
console.log(a); //1
console.log(b); //undefined
```

另一种情况是不完全解构，即等号左边的模式，只匹配一部分的等号右边的数组。这种情况下，解构依然可以成功。如下：

```js
let [a, b] = [1]
console.log(a); //1
console.log(b); //undefined

let [c, [d]] = [4, [5, 6], 7]
console.log(c); //4
console.log(d); //5
```

如果等号的右边不是数组（或者严格地说，不是可遍历的结构，参见《Iterator》一章），那么将会报错。

解构赋值不仅适用于var命令，也适用于let和const命令。

#### 默认值

解构赋值允许指定默认值。

```js
let [foo = true] = [];
console.log(foo); //true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x2, y2 = 'b'] = ['a', undefined]; // x2='a', y2='b'
```

注意，ES6 内部使用严格相等运算符（`===`），判断一个位置是否有值。所以，如果一个数组成员不严格等于`undefined`，默认值是不会生效的。

如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有在用到的时候，才会求值。

```js
function f() {
    console.log('aaa');
}

let [x = f()] = [1];
// x = 1
```

上述代码的`f()`根本不会执行。因为`x`能取到值。

默认值可以引用解构赋值的其他变量，但该变量必须已经声明。

### 对象的解构赋值

解构不仅可以用于数组，还可以用于对象。

```js
let { foo, bar } = { foo: "aaa", bar: "bbb" }
foo // "aaa"
bar // "bbb"
```

对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```js
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```

如果变量名与属性名不一致，必须写成下面这样。

```js
var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"

//转化为如下代码：
var _foo$bar2 = { foo: "aaa", bar: "bbb" };
var baz = _foo$bar2.foo;


let obj = { first: 'hello', last: 'world' };
let { first: f, last: l } = obj;
f // 'hello'
l // 'world'
```

也就是说，对象的解构赋值的内部机制，是先找到同名属性，然后再赋给对应的变量。真正被赋值的是后者，而不是前者。

```js
var { foo: baz } = { foo: "aaa", bar: "bbb" };
baz // "aaa"
foo // error: foo is not defined
```

对于 let 和 const 来说，变量不能重新声明，所以一旦赋值的变量以前声明过，就会报错。

和数组一样，解构也可以用于嵌套结构的对象。

对象的解构也可以指定默认值。默认值生效的条件是，对象的属性值严格等于`undefined`。

```js
var {x = 3} = {x: undefined};
x // 3

var {x = 3} = {x: null};
x // null
```

如果解构失败，变量的值等于`undefined`。

```js
var {foo} = {bar: 'baz'};
foo // undefined
```

### 字符串的解构赋值

字符串也可以解构赋值。字符串被转换为一个类似数组的对象。

```js
const [a, b, c, d, e] = 'hello';
a // "h"
b // "e"
c // "l"
d // "l"
e // "o"
```

### 数值和布尔值的解构赋值

解构赋值时，如果等号右边是数值和布尔值，则会先转为对象。

### 函数参数的解构赋值

函数的参数也可以使用解构赋值。

```js
function add([x, y]){
  return x + y;
}

add([1, 2]); // 3
```

### 圆括号问题

### 用途

## 字符串

## 正则

## 数值
