---
layout: post
title:  "JavaScript 函数"
date:   2015-06-11 14:06:05
categories: JavaScript
excerpt: JavaScript 函数
---

* content
{:toc}

本文为慕课网 [JavaScript深入浅出](http://www.imooc.com/learn/277) 笔记。

## 概念

函数是一块JavaScript代码，被定义一次，但可执行和调用多次。

JS中的函数也是对象，所以JS函数可以像其它对象那样操作和传递。

所以我们也常叫JS中的函数为函数对象。

例如：

    function foo(x, y) {
        if (typeof x === 'number' &&
            typeof y === 'number') {
            return x + y;
        } else {
            return 0;
        }
    }
    foo(1, 2); // 3

一般由3部分组成：

* 函数名
* 参数列表
* 函数体

---

### 调用方式

* 直接调用
    
        foo();

* 对象方法

        o.method();

* 构造器

        new Foo();

* call/apply/bind

        func.call(o);

---

## 函数声明与函数表达式

### 函数声明
    
就是对函数进行普通的声明

    function add(a, b) {
        return a + b;
    }

---

### 函数表达式

* 将函数赋值给变量

        //function variable
        var add = function(a, b) {
            // body...
        };

* 立即执行函数

    把匿名函数用括号括起来，再直接调用。

        // IEF(Immediately Executed Function)
        (function() {
            // body...
        })();

* 函数对象作为返回值

        return function() {
            // body...
        };

* 命名式函数表达式

        //NFE(Named Function Expression)
        var add = function foo(a, b) {
            // body...
        };

    这里大家肯定会好奇，这个函数怎么调用？到底用哪个名字呢？

    做一个测试：

        var func = function nfe() {};
        console.log(func === nfe);
        // 在 IE6~8，得到 false
        // 在 IE9+ 及现代浏览器中 Uncaught ReferenceError: nfe is not defined

    那么命名函数表达式有什么使用场景呢？

    * 一般用于调试方便，如果使用匿名函数，执行的时候看不到函数名，命名函数表达式是可以看到函数名的。
    * 或者在递归时，使用名字调用自己。

    但是这两种用法都不常见。

---

### 变量 & 函数的声明前置

举两个例子

例1，函数声明：

    var num = add(1,2);
    console.log(num);

    function add(a, b) {
        return a + b;
    }

例2，函数表达式：

    var num = add(1, 2);
    console.log(num);

    var add = function(a, b) {
        return a + b;
    };

例1中得到的结果是 3，而例2中是 `Uncaught TypeError: add is not a function`。

因为函数和变量在声明的时候，会被前置到当前作用域的顶端。例1将函数声明 `function add(a, b)` 前置到作用域前端，例2将声明 `var add` 前置到其作用域的前端了，并没有赋值。**赋值的过程是在函数执行到响应位置的时候才进行的**。

---

### Function 构造器

除了函数声明、函数表达式。还有一种创建函数对象的方式，是使用函数构造器。

    var func = new Function('a','b','console.log(a+b);');
    func(1,2);//3

    var func2 = Function('a','b','console.log(a+b);');
    func2(1,2);//3

Function 中前面的参数为后面函数体的形参，最后一个参数为函数体。可以看到传入的都是字符串，这样的创建函数对象的方法是不安全的。

还有一点，Function 构造器的得到的函数对象，拿不到外层函数的变量，但是可以拿到全局变量。它的作用域与众不同，这也是很少使用的原因之一。

---

### 对比

![函数对比](http://7q5cdt.com1.z0.glb.clouddn.com/blog-function.png)