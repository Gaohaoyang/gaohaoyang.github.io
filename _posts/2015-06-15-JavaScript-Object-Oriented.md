---
layout: post
title:  "JavaScript 面向对象"
date:   2015-06-15 14:06:05
categories: JavaScript
excerpt: JavaScript 面向对象的技术
---

* content
{:toc}

本文为慕课网 [JavaScript深入浅出](http://www.imooc.com/learn/277) 笔记。

## 概念

> 面向对象程序设计（Object-oriented programming，OOP）是一种程序设计范型，同时也是一种程序开发的方法。对象指的是类的实例。它将对象作为程序的基本单元，将程序和数据封装其中，以提高软件的重用性、灵活性和扩展性。
>
> ——维基百科

一般面向对象包含：继承，封装，多态，抽象

---

## 基于原型的继承

    function Foo() {
        this.y = 2;
    }
    console.log(typeof Foo.prototype); //object

    Foo.prototype.x = 1;
    var obj3 = new Foo();

    console.log(obj3.y); //2
    console.log(obj3.x); //1

创建函数 `Foo` 的时候，就会有一个内置的 `Foo.prototype` 属性，并且这个属性是对象。

在使用 `new Foo();` 创建对象实例时。`this` 会指向一个对象，并且这个对象的原型会指向 `Foo.prototype` 属性。`this.y = 2` 给这个对象赋值，并把这个对象返回。把这个对象赋值给 `obj3`。

`y` 是 `obj3` 上的，`x` 是 `obj3` 的原型 `Foo.prototype` 上的。

![prototype](http://7q5cdt.com1.z0.glb.clouddn.com/blog-prototype.png)

---

## prototype 属性与原型

prototype 是函数对象上预设的对象属性。

原型是对象上的原型，通常是构造器的 prototype 属性。

### 例

    function Person(name, age) {
        this.name = name;
        this.age = age;
    }

    Person.prototype.LEGS_NUM = 2;
    Person.prototype.ARMS_NUM = 2;

    Person.prototype.hi = function() {
        console.log('Hi, my name is ' + this.name + ". I'm " + this.age + ' years old now');
    };

    Person.prototype.walking = function() {
        console.log(this.name + ' is walking...');
    };

    function Student(name, age, className) {
        Person.call(this, name, age); //使 Person 中的 this 指向 Student
        this.className = className;
    }

    Student.prototype = Object.create(Person.prototype);
    Student.prototype.constructor = Student;

    Student.prototype.hi = function() {
        console.log('Hi, my name is ' + this.name + ". I'm " + this.age + ' years old now, and from ' + this.className + ".");
    };

    Student.prototype.learn = function(subject) {
        console.log(this.name + ' is learning ' + subject + ' at ' + this.className + '.');
    }

    //test
    var gao = new Student('Gao', '24', 'Class 3123');
    console.log(gao); // 这个对象的具体内容见下图
    gao.hi(); //Hi, my name is Gao. I'm 24 years old now, and from Class 3123.
    gao.LEGS_NUM; //2
    gao.walking(); //Gao is walking...
    gao.learn('JavaScript'); //Gao is learning JavaScript at Class 3123.

gao 对象的内容：

![Object](http://7q5cdt.com1.z0.glb.clouddn.com/blog-oop-gao.png)

* `Object.create(arg)` 创建一个空对象，并且这个对象的原型指向参数 `arg`。
* `Student.prototype.constructor = Student` 为了保证一致性，否则 constructor 指向 Person。


<!-- ## 理解对象

我们先创建一个 Object 实例，然后添加属性和方法，如下：

    var person = new Object();
    person.name = "Gaohaoyang";
    person.job = "FE";
    person.sayName = function() {
        console.log(this.name);
    }
    
上述是早期写法，现在使用对象字面量语法可以写成这样（实际上就是 JSON 对象）：

    var person = {
        name: "Gaohaoyang",
        job: "FE",
        sayName: function() {
            console.log(this.name);
        }
    };

### 属性类型

ECMAScript 中有两种属性：数据属性和访问器属性。



---

## 创建对象

---

## 继承 -->

未完待续



