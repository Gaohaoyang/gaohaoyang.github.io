---
layout: post
title:  "JavaScript 面向对象"
date:   2015-06-15 14:06:05
categories: JavaScript
tags: JavaScript 面向对象 慕课网 ife
---

* content
{:toc}

本文为慕课网 [JavaScript深入浅出](http://www.imooc.com/learn/277)  JavaScript 面向对象笔记。





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

### prototype 属性与原型

prototype 是函数对象上预设的对象属性。

原型是对象上的原型，通常是构造器的 prototype 属性。

---

#### 例

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

* `Object.create(arg)` 创建一个空对象，并且这个对象的原型指向参数 `arg`。
* `Student.prototype.constructor = Student` 为了保证一致性，否则 constructor 指向 Person。

---

### 原型链

gao 对象的原型链：

![Object](http://7q5cdt.com1.z0.glb.clouddn.com/blog-oop-gao.png)

下面通过图形展示原型链：

![原型链](http://7q5cdt.com1.z0.glb.clouddn.com/blog-原型链.png)

---

#### `Object.create(null)` & `.bind(null)`

这两种算是特例。

`Object.create(null)` 和 `.bind(null)` 这两种方式创建出来的对象是没有 `prototype` 属性的，为 `undefined`。

---

## prototype 属性

### 改变 prototype

JavaScript 中的 prototype 是对象，在运行的时候可以修改。

给 prototype 添加或删除一些属性，是会影响到已经创建好的实例对象的。

但是，直接修改 prototype 属性，是不会影响到已经创建好的实例对象的。但是会影响到新的实例对象。如下代码：

    // 上接上面的代码

    // 给 prototype 添加或删除一些属性
    Student.prototype.x = 101;
    console.log(gao.x); //101

    // 直接修改 prototype 属性
    Student.prototype = {
        y: 2
    };

    // 不会影响到已创建好的实例对象
    console.log(gao.x); //101
    console.log(gao.y); //undefined

    // 会影响到新创建的实例对象
    var ying = new Student('Ying', 24, 'UI');
    console.log(ying.x); //undefined
    console.log(ying.y); //2

---

### 内置构造器的 `prototype` 属性

修改内置构造器的 `prototype` 属性后，在实例化这个对象后，枚举其属性时，会把修改的内置构造器的 `prototype` 属性也枚举出来，有时候这是要避免的。可用 `defineProperty` 方法解决。如下代码：

    Object.prototype.x = 1;
    var obj = {};
    console.log(obj.x); //1
    console.log(obj);

    for (var k in obj) {
        console.log('result--->' + k);
    }
    // result--->x

使用 `defineProperty` 后：

    Object.defineProperty(Object.prototype, 'x', {
        writable: true,
        value: 1
    });
    var obj = {};
    console.log(obj.x);//1
    console.log(obj);
    for (var k in obj) {
        console.log('result--->' + k);
    }
    // nothing output here

其实也可以这样枚举，使用 `hasOwnProperty` 方法：

    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            console.log("result--->" + key);
        }
    }

---

### 创建对象-new/原型链

![prototype](http://7q5cdt.com1.z0.glb.clouddn.com/blog-new prototype.png)

---

## instanceof

    console.log([1, 2] instanceof Array); //true
    console.log([1, 2] instanceof Object); //true
    console.log(new Object() instanceof Array); //false

左边要求是对象，右边要求是构造器或函数。它会判断：**右边的构造器中的 `prototype` 属性是否出现在左边的对象的原型链上。**

* **注意：**不同的 window 或 iframe 间的对象类型检测**不能**使用 `instanceof`！

---

## 实现继承的方式

    function Person() {}

    function Student() {}

    Student.prototype = Person.prototype; //1

    Student.prototype = new Person(); //2

    Student.prototype = Object.create(Person.prototype); //3

    Student.prototype.constructor = Student;

注释中：

1 是错误的。如果改变了 Student 就会改变 Person

2 可以实现继承，但是其调用了构造函数，若父类构造函数中有形参，那么传值就会比较奇怪。

3 是最好的方法。创建了一个空对象，并且对象的原型指向参数 Person.prototype。这样便实现了继承。同时原型链写，不向上查找。但是 `Object.create` 是ES5 中的方法，所以可以使用下列代码做兼容：

    if (!Object.create) {
        Object.create = function(proto) {
            function F() {}
            F.prototype = proto;
            return new F;
        };
    }

---

## 模拟重载

    function Person() {
        var args = arguments;
        if (typeof args[0] === 'object' && args[0]) {
            if (args[0].name) {
                this.name = args[0].name;
            }
            if(args[0].age){
                this.age = args[0].age;
            }
        } else {
            if (args[0]) {
                this.name = args[0];
            }
            if (args[1]) {
                this.age = args[1];
            }
        }
    }

    //重写 toString 方法
    Person.prototype.toString = function() {
        console.log('name='+this.name+', age='+this.age);
    };

    var gao = new Person({name:'Gao',age:24});
    gao.toString(); // name=Gao, age=24

    var ying = new Person('Ying',25);
    ying.toString(); // name=Ying, age=25

对参数进行判断，模拟实现重载。

---

## 调用子类方法

    function Person(name) {
        this.name = name;
    }

    function Student(name, className) {
        this.className = className;
        Person.call(this, name); // 调用基类的构造器
    }

    var gao = new Student('Gao', '3123');
    console.log(gao); // Student {className: "3123", name: "Gao"}

    Person.prototype.init = function() {};

    Student.prototype.init = function() {
        // do sth...
        Person.prototype.init.apply(this, arguments); // 同时也想调用父类被覆盖的方法
    };

主要是两种：调用父类的构造器，调用原型链上父类被覆盖的方法。

---

## 链式调用

    function ClassManager() {}
    ClassManager.prototype.addClass = function(str) {
        console.log('Class: ' + str + ' added');
        return this;
    };

    var manager = new ClassManager();
    manager.addClass('classA').addClass('classB').addClass('classC');
    // Class: classA added
    // Class: classB added
    // Class: classC added

重点在于 return this。返回这个 ClassManager 的实例。这样这个实例又可以继续调用方法。

---

## 抽象类

在构造器中 `throw new Error('');` 抛异常。这样防止这个类被直接调用。

    function DetectorBase() {
        throw new Error('Abstract class can not be invoked directly!');
    }

    DetectorBase.detect = function() {
        console.log('Detection starting...');
    }
    DetectorBase.stop = function() {
        console.log('Detection stopped.');
    };
    DetectorBase.init = function() {
        throw new Error('Error');
    }

    var d = new DetectorBase();// Uncaught Error: Abstract class can not be invoked directly!

    function LinkDetector() {}
    LinkDetector.prototype = Object.create(DetectorBase.prototype);
    LinkDetector.prototype.constructor = LinkDetector;

    var l = new LinkDetector();
    console.log(l); //LinkDetector {}__proto__: LinkDetector
    l.detect(); //Uncaught TypeError: l.detect is not a function
    l.init(); //Uncaught TypeError: l.init is not a function

`var d = new DetectorBase();` 是不能实例化的，会报错

`l.detect();` 但是这个为什么报错我就不知道了。

已经在原课程下提问了，期待老师的讲解。 [抽象类中子类为什么不能调用父类的非抽象方法？](http://www.imooc.com/qadetail/82732)

问题已经解决了，应该是老师当时的课件写错了，应该再基类中将这两个方法写在其原型 prototype 上。如下：

    function DetectorBase() {
        throw new Error('Abstract class can not be invoked directly!');
    }

    DetectorBase.prototype.detect = function() {
        console.log('Detection starting...');
    };
    DetectorBase.prototype.stop = function() {
        console.log('Detection stopped.');
    };
    DetectorBase.prototype.init = function() {
        throw new Error('Error');
    };

    // var d = new DetectorBase();// Uncaught Error: Abstract class can not be invoked directly!

    function LinkDetector() {}
    LinkDetector.prototype = Object.create(DetectorBase.prototype);
    LinkDetector.prototype.constructor = LinkDetector;

    var l = new LinkDetector();
    console.log(l); //LinkDetector {}__proto__: LinkDetector
    l.detect(); //Detection starting...
    l.init(); //Uncaught Error: Error

---

## 模块化

    var moduleA;
    moduleA = function() {
        var prop = 1;

        function func() {}

        return {
            func: func,
            prop: prop
        };
    }(); // 立即执行匿名函数

prop，func 不会被泄露到全局作用域。

或者另一种写法，使用 new

    moduleA = new function() {
        var prop = 1;

        function func() {}

        this.func = func;
        this.prop = prop;
    }

更复杂的可以使用 Sea.js Kissy Require.js 模块化工具。

---

最后补充一点设计模式相关的资料，我还没有来得及看的：

* [学用 JavaScript 设计模式](http://www.oschina.net/translate/learning-javascript-design-patterns)
* [常用的Javascript设计模式](http://blog.jobbole.com/29454/)
* [JavaScript设计模式深入分析](http://developer.51cto.com/art/201109/288650_all.htm)
