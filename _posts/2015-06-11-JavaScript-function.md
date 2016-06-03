---
layout: post
title:  "JavaScript 函数"
date:   2015-06-11 14:06:05
categories: JavaScript
tags: JavaScript 函数 慕课网 ife
---

* content
{:toc}

本文为慕课网 [JavaScript深入浅出](http://www.imooc.com/learn/277) JavaScript 函数笔记。





## 概念

函数是一块JavaScript代码，被定义一次，但可执行和调用多次。

JS中的函数也是对象，所以JS函数可以像其它对象那样操作和传递。

所以我们也常叫JS中的函数为函数对象。

例如：

```js
function foo(x, y) {
    if (typeof x === 'number' &&
        typeof y === 'number') {
        return x + y;
    } else {
        return 0;
    }
}
foo(1, 2); // 3
```

一般由3部分组成：

* 函数名
* 参数列表
* 函数体

### 调用方式

* 直接调用

```js
foo();
```

* 对象方法

```js
o.method();
```

* 构造器

```js
new Foo();
```

* call/apply/bind

```js
func.call(o);
```

## 函数声明与函数表达式

### 函数声明

就是对函数进行普通的声明

```js
function add(a, b) {
    return a + b;
}
```

### 函数表达式

* 将函数赋值给变量

```js
//function variable
var add = function(a, b) {
    // body...
};
```

* 立即执行函数

    把匿名函数用括号括起来，再直接调用。

```js
// IEF(Immediately Executed Function)
(function() {
    // body...
})();
```

* 函数对象作为返回值

```js
return function() {
    // body...
};
```

* 命名式函数表达式

```js
//NFE(Named Function Expression)
var add = function foo(a, b) {
    // body...
};
```

这里大家肯定会好奇，这个函数怎么调用？到底用哪个名字呢？

做一个测试：

```js
var func = function nfe() {};
console.log(func === nfe);
// 在 IE6~8，得到 false
// 在 IE9+ 及现代浏览器中 Uncaught ReferenceError: nfe is not defined
```

那么命名函数表达式有什么使用场景呢？

* 一般用于调试方便，如果使用匿名函数，执行的时候看不到函数名，命名函数表达式是可以看到函数名的。
* 或者在递归时，使用名字调用自己。

但是这两种用法都不常见。

### 变量 & 函数的声明前置

举两个例子

例1，函数声明：

```js
var num = add(1,2);
console.log(num);

function add(a, b) {
    return a + b;
}
```

例2，函数表达式：

```js
var num = add(1, 2);
console.log(num);

var add = function(a, b) {
    return a + b;
};
```

例1中得到的结果是 3，而例2中是 `Uncaught TypeError: add is not a function`。

因为函数和变量在声明的时候，会被前置到当前作用域的顶端。例1将函数声明 `function add(a, b)` 前置到作用域前端，例2将声明 `var add` 前置到其作用域的前端了，并没有赋值。**赋值的过程是在函数执行到响应位置的时候才进行的**。

### Function 构造器

除了函数声明、函数表达式。还有一种创建函数对象的方式，是使用函数构造器。

```js
var func = new Function('a','b','console.log(a+b);');
func(1,2);//3

var func2 = Function('a','b','console.log(a+b);');
func2(1,2);//3
```

Function 中前面的参数为后面函数体的形参，最后一个参数为函数体。可以看到传入的都是字符串，这样的创建函数对象的方法是不安全的。

还有一点，Function 构造器的得到的函数对象，拿不到外层函数的变量，但是可以拿到全局变量。它的作用域与众不同，这也是很少使用的原因之一。

### 对比

![函数对比](http://7q5cdt.com1.z0.glb.clouddn.com/blog-function.png)

---

## 函数属性 & arguments

### 函数属性 & arguments

```js
function foo(x, y, z) {
    arguments.length; // 2
    arguments[0]; // 1
    arguments[0] = 10;
    x; // change to 10

    arguments[2] = 100;
    z; // still undefined!!!
    arguments.callee === foo; // true
}

foo(1, 2);
foo.length; // 3
foo.name; //"foo"
```

* `foo.name` 函数名
* `foo.length` 形参个数
* `arguments.length` 实参个数

未传参数时，arguments[i] 相应的位置仍然是 undefined。

严格模式下，代码中的改变实参失效。即 x 仍为 1。同时 callee 属性失效。

* 关于 `callee`

    callee 属性的初始值就是正被执行的 Function 对象。

    callee 属性是 arguments 对象的一个成员，它表示对函数对象本身的引用，这有利于匿名函数的递归或者保证函数的封装性，例如下边示例的递归计算1到n的自然数之和。而该属性仅当相关函数正在执行时才可用。还有需要注意的是callee拥有length属性，这个属性有时用于验证还是比较好的。

    arguments.length是实参长度，arguments.callee.length是形参长度，由此可以判断调用时形参长度是否和实参长度一致。


### apply/call 方法（浏览器）

```js
function foo(x, y) {
    console.log(x, y, this);
}

foo.call(100, 1, 2); //1 2 Number {[[PrimitiveValue]]: 100}
foo.apply(true, [3, 4]); //3 4 Boolean {[[PrimitiveValue]]: true}
foo.apply(null); //undefined undefined Window
foo.apply(undefined); //undefined undefined Window
```

* call/apply 的作用：调用一个对象的一个方法，以另一个对象替换当前对象(其实就是更改对象的内部指针，即改变对象的this指向的内容)。
* call/apply 的第一个参数为对象，即使不是对象，也会被包装为对象。
* call 为扁平化传参，apply 后面的参数为数组
* 传入 null/undefined 时，实际为 Window 对象
* 在严格模式下：上述代码最后两行分别输出 `null`, `undefined`

### bind 方法

`bind` 是 ES5 中提出的方法，所以浏览器支持为 IE9+ 及现代浏览器。

```js
this.x = 9;
var module = {
    x: 81,
    getX: function() {
        return console.log(this.x);
    }
};

module.getX(); //81

var getX = module.getX;
getX(); //9

var boundGetX = getX.bind(module);
boundGetX(); //81
```

`bind` 主要用于改变函数中的 `this`

* `module.getX(); ` 直接通过对象调用自己的方法，结果是 81
* `var getX = module.getX;` 将这个方法赋值给一个全局变量，这时 this 指向了 Window，所以结果为 9
* `var boundGetX = getX.bind(module);` 使用 bind 绑定了自己的对象，这样 this 仍然指向 module 对象，所以结果为 81


#### bind 与 currying

bind 可以使函数柯里化，那么什么是柯里化？

> 在计算机科学中，柯里化（Currying）是把接受多个参数的函数变换成接受一个单一参数(最初函数的第一个参数)的函数，并且返回接受余下的参数且返回结果的新函数的技术。这个技术由 Christopher Strachey 以逻辑学家 Haskell Curry 命名的，尽管它是 Moses Schnfinkel 和 Gottlob Frege 发明的。

```js
function add(a, b, c) {
    return a + b + c;
}

var func = add.bind(undefined, 100);
func(1, 2); //103

var func2 = func.bind(undefined, 200);
func2(10); //310
```

add 函数拥有 3 个参数。我们想先传入一个参数，再去传其他参数。

`var func = add.bind(undefined, 100);` add 函数对象调用 bind 方法，由于不需要将 this 指向原来的 add 函数对象，所以第一个参数写为 undefined 或 null。第二个参数 100 传给了 add 函数中的形参 a，并赋值给一个新的函数对象 func。

这时，`func(1, 2)` 即相当于传入后两个参数，所以结果为 103。

同理，基于 func 可以创造一个函数 func2。它只用传最后一个参数。


#### bind 与 new

```js
function foo() {
    this.b = 100;
    return this.a;
}

console.log(foo()); //undefined

var func = foo.bind({
    a: 1
});

console.log(func()); //1
console.log(new func()); //foo {b: 100}
```

对于使用了 `new func()` 这种方式创建对象，其返回值为一个对象。

而原函数 foo 的返回值不是对象，所以会直接忽视这个 return 方法。而是变为 `return this;`。并且 this 会被初始化为一个空对象，这个空对象的原型指向 foo.prototype。所以后面的 bind 是不起作用的。

这里面这个 this 对象包含一个属性 `b = 100`。所以返回的是对象 `{b: 100}`。
