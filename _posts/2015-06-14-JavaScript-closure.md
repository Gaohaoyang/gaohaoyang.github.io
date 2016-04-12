---
layout: post
title:  "JavaScript 中的闭包"
date:   2015-06-14 14:06:05
categories: JavaScript
tags: JavaScript 闭包 慕课网 ife
---

* content
{:toc}

本文为慕课网 [JavaScript深入浅出](http://www.imooc.com/learn/277) JavaScript 中的闭包笔记。





## 闭包的例子

    function outer() {
        var localVal = 30;
        return localVal;
    }

    console.log(outer()); //30

    function outer2() {
        var localVal = 30;
        return function() {
            return localVal;
        };
    }

    var func = outer2();
    console.log(func()); //30

对于第一个普通的函数，在执行过之后，它的局部变量就可以被释放。

对于第二个函数，`localVal` 是不能被释放的。因为调用 `outer2()` 后，返回的是匿名函数，匿名函数可以访问外部的 `outer2()` 中的局部变量，并返回了这个局部变量 localVal。当 `outer2()` 赋值给 `func` 后，再次调用 `func()`，仍能访问到局部变量 `localVal`。这种情况就是闭包。

---

## 应用

* **所谓闭包就是：子函数可以使用父函数中的局部变量。**

        ! function() {
            var localData = "localData here";
            document.addEventListener('click',
                function() {
                    console.log(localData); //这里访问外部数据
                });
        }();

        ! function() {
            var localData = "localData here";
            var url = "http://www.baidu.com/";
            $.ajax({
                url: url,
                success: function() {
                    // do sth...
                    console.log(localData); //这里访问外部数据
                }
            });
        }()

---

## 常见错误之循环闭包

比如我们想循环绑定点击事件

    document.body.innerHTML = "<div id=div1>aaa</div><div id=div2>bbb</div><div id=div3>ccc</div>";
    for (var i = 1; i < 4; i++) {
        document.getElementById('div' + i).
        addEventListener('click', function() {
            alert(i); // all are 4!
        });
    }

上面的代码，我们点击任何一个 div，弹出的都是 4

这是因为，for 循环中的 i 是一个全局变量。这里内函数的点击事件，访问到的是循环后的 i 值，所以是 4

    document.body.innerHTML = "<div id=div1>aaa</div><div id=div2>bbb</div><div id=div3>ccc</div>";
    for (var i = 1; i < 4; i++) {
        ! function(i) {
            document.getElementById('div' + i).
            addEventListener('click', function() {
                alert(i); // 1, 2, 3
            });
        }(i);
    }

这里使用了立即执行函数，并给匿名函数赋值 i，这样点击事件每一次就会访问到相应的 i。

---

## 封装

    (function() {
        var _userId = 9527;
        var _typeId = "item";
        var exp = {};

        function converter(userId) {
            return +userId;
        }

        exp.getUserId = function() {
            return converter(_userId);
        };

        exp.getTypeId = function() {
            return _typeId;
        };

        window.a = exp;
    })();

    console.log(a.getUserId()); //9527
    console.log(a.getTypeId()); //item

    console.log(a._userId); //undefined
    console.log(a._typeId); //undefined
    console.log(converter); //Uncaught ReferenceError: converter is not defined

上面的代码通过闭包实现了一个封装。

---

## 总结

> * 在计算机科学中，闭包（也称词法闭包或函数闭包）是指一个函数或函数的引用，与一个引用环境绑定在一起。这个引用环境是一个存储该函数每个非局部变量（也叫自由变量）的表。
>
> * 闭包，不同于一般的函数，它允许一个函数在立即词法作用域外调用时，仍可访问非本地变量。
>
> from 维基百科

* 闭包的优点
    * 灵活和方便
    * 封装

* 缺点
    * 空间浪费
    * 内存泄露
    * 性能消耗
