---
layout: post
title:  "百度Web前端技术学院(2)-JavaScript 基础"
date:   2015-04-22 19:06:05
categories: JavaScript
tags: Baidu ife JavaScript 正则 Regular
---

* content
{:toc}

百度前端学院的第二次任务笔记，JavaScript 基础。主要有JavaScript的定义，数据类型，对象，数组，字符串，正则表达式，DOM，事件，BOM，Ajax 等知识。





## 任务

掌握JavaScript基础知识，能够使用JavaScript编写一些复杂度不大的交互功能。

**任务：** [JavaScript基础](https://github.com/Gaohaoyang/ife/tree/master/task/task0002)   

做完任务一的时候深深地感觉到自己的基础非常的薄弱，在这里再次感谢一下百度前端技术学院，做任务的时候深刻理解了自己平时掌握不牢固的内容，比如浮动、BFC、等高布局等。继续加油吧！


像上一篇文章一样，写些东西记录一下。   


## 第一个页面交互

按照任务中的代码，在IE8下提示：`对象不支持“addEventListener”属性或方法`    
我猜是IE8浏览器没有这个方法吧。

参考资料：[JavaScript 指南-MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide)

### 了解JavaScript是什么

[来自MDN的解释](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/JavaScript_Overview#What_is_JavaScript.3F)

> JavaScript 是一种跨平台，面向对象的脚本语言。作为一种小巧且轻量级的语言，JavaScript 无意于独立运行，而是被设计为可以轻易嵌入到其它的产品和应用中，比如 Web 浏览器。在宿主环境中，JavaScript 可以被连接到环境中的对象之上，以提供对其的编程控制。
>
> 核心的 JavaScript 中包含有一组核心的对象，包括 Array，Date 和 Math，以及一组核心的语言要素，包括操作符，控制结构和语句。出于多种目的，可以通过为其增补附加的对象，对核心 JavaScript 加以扩展；例如：
>
> * 客户端 JavaScript 提供了用于控制浏览器（Navigator 或者其它浏览器）以及其中的文档对象模型（DOM）的对象，从而扩展了核心 JavaScript。例如，客户端扩展允许应用程序在 HTML 的表单中加入元素，以便响应用户事件，比如鼠标点击，表单输入和页面导航。
> * 服务器端 JavaScript 提供了服务于在服务器上运行 JavaScript 的对象，从而扩展了核心 JavaScript。例如，服务器端扩展可以允许应用程序访问关系型数据库，在应用程序的不同调用间提供信息的连续性，甚至于处理服务器之上的文件。
>
>借由 JavaScript 的 LiveConnect 功能，您可以让 Java 和 JavaScript 间实现通讯。从 JavaScript 中，您可以创建 Java 对象并访问它们的公共方法和域。从 Java 中，也可以访问 JavaScript 的对象，属性和方法。
>
>Netscape 发明了 JavaScript 并将 JavaScript 首先用于 Netscape 浏览器中。


### 如何在 HTML 页面加载 JavaScript 代码

使用 `<script>` 标签在 HTML 文件中添加 JavaScript 代码。

我们可以将 `JavaScript` 代码放在 `html` 文件中任何位置，但是我们一般放在网页的 `head` 或者 `body` 部分。

放在 `<head>` 部分    
最常用的方式是在页面中head部分放置 `<script>` 元素，浏览器解析 `head` 部分就会执行这个代码，然后才解析页面的其余部分。

放在 `<body>` 部分    
JavaScript 代码在网页读取到该语句的时候就会执行。

**注意**: javascript 作为一种脚本语言可以放在 html 页面中任何位置，但是浏览器解释 html 时是按先后顺序的，所以前面的 script 就先被执行。比如进行页面显示初始化的 js 必须放在 head 里面，因为初始化都要求提前进行（如给页面 body 设置 css 等）；而如果是通过事件调用执行的 function 那么对位置没什么要求的。



### 为什么把 `<script>` 放在 `</body>` 前

虽然理论上放在哪里都是可以的，但是对于前端页面优化来讲，还是放在底部是最佳的，因为如果JS执行出现错误了，最起码页面中的元素还能加载出来，因为DOM文档是从上往下的顺序执行的。    如果你还不了解DOM的加载顺序，请阅读jQuery中ready与load事件的区别。

**下面是重点**

按照HTML5标准中的HTML语法规则，如果在 `</body>` 后再出现 `<script>` 或任何元素的开始标签，都是parse error，浏览器会忽略之前的 `</body>` ，即视作仍旧在body内。所以实际效果和写在 `</body>` 之前是没有区别的。

总之，这种写法虽然也能work，但是并没有带来任何额外好处，实际上出现这样的写法很可能是误解了“将script放在页面最末端”的教条。所以还是不要这样写为好。

* [script在body闭合标签之后还是之前-知乎](http://www.zhihu.com/question/20027966)
* [body 和 html 标签均没有关闭](http://www.zhihu.com/question/19617126)


#### JavaScript 的性能优化：加载和执行

* 扩展阅读：[JavaScript 的性能优化：加载和执行](http://www.ibm.com/developerworks/cn/web/1308_caiys_jsload/index.html)

**脚本位置**

由于脚本会阻塞页面其他资源的下载，因此推荐将所有 `<script>` 标签尽可能放到 `<body>` 标签的底部，以尽量减少对整个页面下载的影响。

**组织脚本**

由于每个 `<script>` 标签初始下载时都会阻塞页面渲染，所以减少页面包含的 `<script>` 标签数量有助于改善这一情况。这不仅针对外链脚本，内嵌脚本的数量同样也要限制。浏览器在解析 HTML 页面的过程中每遇到一个 `<script>` 标签，都会因执行脚本而导致一定的延时，因此最小化延迟时间将会明显改善页面的总体性能。

**无阻塞的脚本**

减少 JavaScript 文件大小并限制 HTTP 请求数在功能丰富的 Web 应用或大型网站上并不总是可行。Web 应用的功能越丰富，所需要的 JavaScript 代码就越多，尽管下载单个较大的 JavaScript 文件只产生一次 HTTP 请求，却会锁死浏览器的一大段时间。为避免这种情况，需要通过一些特定的技术向页面中逐步加载 JavaScript 文件，这样做在某种程度上来说不会阻塞浏览器。


无阻塞脚本的秘诀在于，在页面加载完成后才加载 JavaScript 代码。这就意味着在 window 对象的 onload事件触发后再下载脚本。有多种方式可以实现这一效果。

* 延迟加载脚本

HTML 4 为 `<script>` 标签定义了一个扩展属性：defer。Defer 属性指明本元素所含的脚本不会修改 DOM，因此代码能安全地延迟执行。

带有 defer 属性的 `<script>` 标签可以放置在文档的任何位置。对应的 JavaScript 文件将在页面解析到 `<script>` 标签时开始下载，但不会执行，直到 DOM 加载完成，即onload事件触发前才会被执行。当一个带有 defer 属性的 JavaScript 文件下载时，它不会阻塞浏览器的其他进程，因此这类文件可以与其他资源文件一起并行下载。

对于如下代码：

```html
<html>
<head>
    <title>Script Defer Example</title>
</head>
<body>
    <script type="text/javascript" defer>
        alert("defer");
    </script>
    <script type="text/javascript">
        alert("script");
    </script>
    <script type="text/javascript">
        window.onload = function(){
            alert("load");
        };
    </script>
</body>
</html>
```

在支持 defer 属性的浏览器上，弹出的顺序则是："script"、"defer"、"load"。请注意，带有 defer 属性的 `<script>` 元素不是跟在第二个后面执行，而是在 onload 事件被触发前被调用。

引用的资料可能写的比较早，在 [CanIUse](http://caniuse.com/#search=defer) 上查了一下 defer 发现大部分浏览器都是支持的。如下图：   
![defer的支持情况](http://7q5cdt.com1.z0.glb.clouddn.com/Baidu-Front-end-defer.jpg)

HTML 5 为 `<script>` 标签定义了一个新的扩展属性：async。它的作用和 defer 一样，能够异步地加载和执行脚本，不因为加载脚本而阻塞页面的加载。但是有一点需要注意，在有 async 的情况下，JavaScript 脚本一旦下载好了就会执行，所以很有可能不是按照原本的顺序来执行的。如果 JavaScript 脚本前后有依赖性，使用 async 就很有可能出现错误。

IE8,9不支持 `async`

* 动态脚本元素
* 使用 XMLHttpRequest(XHR)对象


**原文中的总结**

减少 JavaScript 对性能的影响有以下几种方法：

* 将所有的 `<script>` 标签放到页面底部，也就是 `</body>` 闭合标签之前，这能确保在脚本执行前页面已经完成了渲染。
* 尽可能地合并脚本。页面中的 `<script>` 标签越少，加载也就越快，响应也越迅速。无论是外链脚本还是内嵌脚本都是如此。
* 采用无阻塞下载 JavaScript 脚本的方法：
    * 使用 `<script>` 标签的 defer 属性（仅适用于 IE 和 Firefox 3.5 以上版本）；
    * 使用动态创建的 `<script>` 元素来下载并执行代码；
    * 使用 XHR 对象下载 JavaScript 代码并注入页面中。

通过以上策略，可以在很大程度上提高那些需要使用大量 JavaScript 的 Web 网站和应用的实际性能。


## JavaScript数据类型及语言基础

### 数据类型概要

最新的 ECMAScript 标准定义了 7 种数据类型:

* 6 种 原始类型:
    * Boolean
    * Null
    * Undefined
    * Number
    * String
    * Symbol (new in ECMAScript 6)
* 和 Object


### 一些要点

* 一个没有被赋值的变量会有个默认值 undefined
* null 与 undefined 的不同点：

```js
typeof null        // object (bug in ECMAScript, should be null)
typeof undefined   // undefined
null === undefined // false
null == undefined // true
```

```
typeof null 返回 object
```

* Number 数字类型，它并没有为整数给出一种特定的类型。除了能够表示浮点数外，还有一些带符号的值：+Infinity，-Infinity 和 NaN (非数值，Not-a-Number)。
* NaN与任何值都不相等，包括自身。应当使用 `x != x` 来判断，当且仅当 x 为 NaN 的时候，表达式的结果才为 `true`。相似的函数有 `isNaN()`, `isFinite()`。
* 数组直接量的语法允许有可选的结尾逗号，故 `[,,]` 只有两个元素而非三个。


### 实践判断各种数据类型的方法

```js
// 判断arr是否为一个数组，返回一个bool值
function isArray(arr) {
    return typeof arr === "object" && Object.prototype.toString.call(arr) === "[object Array]";
}

// 判断fn是否为一个函数，返回一个bool值
function isFunction(fn) {
    return typeof fn === "function";
}
```

#### 数组类型

在 ECMAScript5 中，可以直接使用 `Array.isArray()` 来判断数组。

```js
Array.isArray([]);  //true
Array.isArray({});  //false
```

我看《JavaScript权威指南上》没有推荐使用 `instanceof`，因为可能会有多窗体(frame)存在。

> 这样每一个窗口都有一个自己的 JavaScript 环境，有自己的全局对象。并且每个全局对象都有自己的一组构造函数。因此一个窗体中的对象不可能是另外窗体中的构造函数的实例。

所以采用了上述我写的那样的代码


### 值类型和引用类型的区别

* 值类型

    声明一个值类型变量，编译器会在栈上分配一个空间，这个空间对应着该值类型变量，空间里存储的就是该变量的值。存储在栈（stack）中的简单数据段，也就是说，它们的值直接存储在变量访问的位置。

* 引用类型

    引用类型的实例分配在堆上，新建一个引用类型实例，得到的变量值对应的是该实例的内存分配地址，这就像您的银行账号一样。存储在堆（heap）中的对象，也就是说，存储在变量处的值是一个指针（point），指向存储对象的内存处。

> 为变量赋值时，ECMAScript 的解释程序必须判断该值是原始类型，还是引用类型。要实现这一点，解释程序则需尝试判断该值是否为 ECMAScript 的原始类型之一，即 Undefined、Null、Boolean、Number 和 String 型。由于这些原始类型占据的空间是固定的，所以可将他们存储在较小的内存区域 - 栈中。这样存储便于迅速查寻变量的值。
>
> * **在许多语言中，字符串都被看作引用类型，而非原始类型，因为字符串的长度是可变的。ECMAScript 打破了这一传统。**
>
> 如果一个值是引用类型的，那么它的存储空间将从堆中分配。由于引用值的大小会改变，所以不能把它放在栈中，否则会降低变量查寻的速度。相反，放在变量的栈空间中的值是该对象存储在堆中的地址。地址的大小是固定的，所以把它存储在栈中对变量性能无任何负面影响。如下图所示：
>
> ![ct_js_value](http://www.w3school.com.cn/i/ct_js_value.gif)

JavaScript中原始值包括：undefined，null，布尔值，数字和字符串。引用类型主要指对象（包括数组和函数）。

>* 原始值是不可更改的。对象的值是可修改的。
>* 原始值的比较是值的比较。对象的比较并非值的比较。对象的值都是引用，对象的比较均是引用的比较，当且仅当他们都引用同一个基对象时，他们才相等。

**参考：**

* [ECMAScript 原始值和引用值](http://www.w3school.com.cn/js/pro_js_value.asp)


### 对象的读取、遍历方式

参考：[JavaScript 指南-使用对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects)

* 对象

在javascript中，一个对象可以是一个单独的拥有属性和类型的实体。我们拿它和一个杯子做下类比。一个杯子是一个对象(物体)，拥有属性。杯子有颜色，图案，重量，由什么材质构成等等。同样，javascript对象也有属性来定义它的特征。

* 属性

一个 javascript 对象有很多属性。一个对象的属性可以被解释成一个附加到对象上的变量。对象的属性和普通的 javascript 变量基本没什么区别，仅仅是属性属于某个对象。属性定义了对象的特征(译注：动态语言面向对象的鸭子类型)。你可以通过点符号来访问一个对象的属性。JavaScript 对象的属性也可以通过方括号访问。

* 枚举

你可以在 `for...in` 语句中使用方括号标记以枚举一个对象的所有属性。为了展示它如何工作，下面的函数当你将对象及其名称作为参数传入时，显示对象的属性：

```js
function showProps(obj, objName) {
  var result = "";
  for (var i in obj) {
    if (obj.hasOwnProperty(i)) {
        result += objName + "." + i + " = " + obj[i] + "\n";
    }
  }
  return result;
}

var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};

console.log(showProps(srcObj,'srcObj'));
```

console:

```
srcObj.a = 2
srcObj.b = [object Object]
```

这里使用 `hasOwnProperty()` 是为了确保是自己的属性而非继承的属性。

可以如下写，跳过这个对象的方法：

```js
function showPropsWithoutFun(obj, objName) {
    var result = "";
    for (var i in obj) {
        if (!obj.hasOwnProperty(i)) {       //跳过继承属性
            continue;
        }
        if (typeof obj[i] === "function") { //跳过这个对象的方法
            continue;
        }
        result += objName + "." + i + "=" + obj[i] + "\n";
    }
    return result;
}
```

相关的方法还有：`Object.keys()`, `Object.getOwnPropertyNames()`

`Object.keys()` 方法会返回一个由给定对象的所有可枚举自身属性的属性名组成的数组，数组中属性名的排列顺序和使用for-in循环遍历该对象时返回的顺序一致（两者的主要区别是 for-in 还会遍历出一个对象从其原型链上继承到的可枚举属性）。

`Object.getOwnPropertyNames()` 方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性）组成的数组。

* 创建对象

创建对象的方式有三种：对象直接量，关键字 `new`，使用 `Object.create()` 方法。

`Object.create()` 方法创建一个拥有指定原型和若干个指定属性的对象。

* 继承

所有的 JavaScript 对象继承于至少一个对象。被继承的对象被称作原型，并且继承的属性可能通过构造函数的 prototype 对象找到。

* 定义方法

一个方法 是关联到某个对象的函数，或者简单地说，一个方法是一个值为某个函数的对象属性。定义方法就象定义普通的函数，除了它们必须被赋给对象的某个属性。例如：

```js
objectName.methodname = function_name;

var myObj = {
  myMethod: function(params) {
    // ...do something
  }
};
```

#### 深度克隆

了解值类型和引用类型的区别，了解各种对象的读取、遍历方式，并在util.js中实现以下方法：

```js
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等
function cloneObject(src) {
    // your implement
}

// 测试用例：
var srcObj = {
    a: 1,
    b: {
        b1: ["hello", "hi"],
        b2: "JavaScript"
    }
};
var abObj = srcObj;
var tarObj = cloneObject(srcObj);

srcObj.a = 2;
srcObj.b.b1[0] = "Hello";

console.log(abObj.a);
console.log(abObj.b.b1[0]);

console.log(tarObj.a);      // 1
console.log(tarObj.b.b1[0]);    // "hello"
```

**参考：**

* [白话简单克隆和深度克隆](http://blog.csdn.net/java2000_net/article/details/3014934) 介绍什么是深度克隆，用羊圈和羊的图，简单深刻。如下图：

![简单克隆](http://p.blog.csdn.net/images/p_blog_csdn_net/java2000_net/EntryImages/20081004/%E7%AE%80%E5%8D%95%E5%85%8B%E9%9A%86.PNG)
![深度克隆](http://p.blog.csdn.net/images/p_blog_csdn_net/java2000_net/EntryImages/20081004/%E6%B7%B1%E5%BA%A6%E5%85%8B%E9%9A%86.PNG)


* [javascript克隆对象深度介绍](http://www.jb51.net/article/32015.htm) 这个代码写的太妙了，可惜找不到源地址了，都是转载来转载去的，要是你知道源地址，请留言告诉我。

浅度克隆：基本类型为值传递，对象仍为引用传递。

深度克隆：所有元素或属性均完全克隆，并于原引用类型完全独立，即，在后面修改对象的属性的时候，原对象不会被修改。

**思路：**深度克隆复制目标对象，那么就需要枚举这个对象。

1. 判断当前属性是否是引用类型，如果是数组或者对象，创建相应类型变量。
2. 枚举对象内所有属性。
3. 使用 `hasOwnProperty()` 方法，排除继承的属性。
4. 给新的对象相应位置赋值，若当前属性为引用类型（数组或对象）递归本方法。直到内部的值类型。
5. 返回新的对象。

**我的代码实现：**   

```js
function cloneObject(src) {
    // your implement
    var o; //result
    if (Object.prototype.toString.call(src) === "[object Array]") {
        o = []; //判断是否是数组，并赋初始值
    } else {
        o = {};
    }
    for (var i in src) { //遍历这个对象
        if (src.hasOwnProperty(i)) { //排出继承属性
            if (typeof src[i] === "object") {
                o[i] = cloneObject(src[i]); //递归赋值
            } else {
                o[i] = src[i]; //直接赋值
            }
        }
    }
    return o;
}
```

### 对数组进行去重

**参考：**

* [MDN Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [JavaScript Array 对象 w3school](http://www.w3school.com.cn/jsref/jsref_obj_array.asp)

**要求：**

```js
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    // your implement
}

// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]
```

**思路：**

1. 新建一个空数组
2. 遍历原数组
3. 若新数组中不存在当前元素，将其 `push` 入新数组中
4. 返回新数组

**实现：**

```js
// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var newArr = [];    //创建空数组
    for (var i in arr) {    //遍历旧数组
        if (newArr.indexOf(arr[i]) == -1) {//如果新数组中不存在当前元素
            newArr.push(arr[i]);//新数组中加入当前元素
        }
    }
    return newArr;
}
```

**相关方法与知识点：**

#### Array 对象

* Array 对象属性

属性  | 描述
constructor | 返回对创建此对象的数组函数的引用。
length  | 设置或返回数组中元素的数目。
prototype  |  使您有能力向对象添加属性和方法。

* Mutator 方法，这些方法可以改变数组自身

方法 | 描述
pop | 移除数组的最后一个元素，返回值是被删除的元素。
push | 在数组的末尾添加一个或者多个元素，返回值是新的数组的长度。
reverse | 颠倒数组中元素的顺序，原先第一个元素现在变成最后一个，同样原先的最后一个元素变成了现在的第一个，也就是数组的索引发生了变化。
shift | 删除数组的第一个元素，返回值是删除的元素。
sort | 对数组中的元素进行排序。
splice | 添加或删除数组中的一个或多个元素。
unshift | 添加一个或者多个元素在数组的开头，返回值是新的数组的长度。

* Accessor 方法，这些过程不改变数组自身 These methods do not modify the array and return some representation of the array.

方法|描述
concat | 返回一个包含此数组和其他数组和/或值的结合的新数组
indexOf | 返回第一个与给定参数相等的数组元素的索引，没有找到则返回-1。
join | 将所有的数组元素连接成一个字符串。
lastIndexOf | 返回在数组中搜索到的与给定参数相等的元素的最后（最大）索引。
slice | 返回数组中的一段。
toSource | Returns an array literal representing the specified array; you can use this value to create a new array. Overrides the Object.toSource method.
toString | 返回代表该数组及其元素的字符,重写Object.toString 过程.
valueOf | Returns the primitive value of the array. Overrides the Object.valueOf method.

* 循环（迭代）过程

方法 | 描述
filter | 对数组中的每一个元素调用参数中指定的过滤函数，并将对于过滤函数返回值为true的那些数组元素集合为新的数组返回。
forEach | 对数组的每一个元素依次调用参数中指定的函数。
every | 如果数组中每一个元素都满足参数中提供的测试函数，则返回真。
map | Creates a new array with the results of calling a provided function on every element in this array.
some | 如果数组中至少有一个元素满足参数函数的测试，则返回true。


### 实现 `trim()`

**参考：**

* [String MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
* [JavaScript String 对象 W3school](http://www.w3school.com.cn/jsref/jsref_obj_string.asp)

**要求：**

```js
// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    // your implement
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
}

// 使用示例
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'
```

**思路：**

对于 `simpleTrim()` 做两次循环，从前面开始和从后面开始。遇到空格和Tab跳出，最后用 `slice()` 取出子字符串。

对于 `trim()` 使用正则表达式。

**实现：**

```js
function simpleTrim(str) {
    var i;
    var j;
    for (i = 0; i < str.length; i++) { //从头遍历字符串
        if (str.charAt(i) != " " && str.charAt(i) != "\t") { //当不为空的时候
            break; //跳出循环
        }
    }
    for (j = str.length - 1; j >= 0; j--) {
        if (str.charAt(j) != " " && str.charAt(j) != "\t") { //当不为空的时候
            break; //跳出循环
        }
    }
    return str.slice(i, j + 1); //返回子字符串
}

function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}
```

关于正则表达式：

#### 正则表达式

上面的思路是匹配开头和结尾的空白字符，并全局匹配。

* `^`：匹配字符串的开头，在多行检索中，匹配一行的开头。
* `$`：匹配字符串的结尾，在多行检索中，匹配一行的结尾。
* `|`：选择，匹配的是该符号左边的子表达式或右边的子表达式。
* `\s`：任何 Unicode 空白符。
* `g`：执行一个全局匹配，简言之，即找到所有匹配，而不是找到第一个之后就停止。

以上来自 JavaScript权威指南（犀牛书），感觉这里面将的正则表达式还不错。

**相关方法和知识点：**

#### String对象

* String 对象属性

属性 | 描述
constructor | 对创建该对象的函数的引用
length | 字符串的长度
prototype  | 允许您向对象添加属性和方法

* String 对象方法

方法 | 描述
charAt()  |  返回在指定位置的字符。
charCodeAt()  |  返回在指定的位置的字符的 Unicode 编码。
concat()  |  连接字符串。
indexOf() |  检索字符串。
lastIndexOf()  | 从后向前搜索字符串。
localeCompare() | 用本地特定的顺序来比较两个字符串。
match()| 找到一个或多个正则表达式的匹配。
replace() |  替换与正则表达式匹配的子串。
search()  |  检索与正则表达式相匹配的值。
slice()| 提取字符串的片断，并在新的字符串中返回被提取的部分。
split()| 把字符串分割为字符串数组。
substr()  |  从起始索引号提取字符串中指定数目的字符。
substring() |提取字符串中两个指定的索引号之间的字符。
toLowerCase() |  把字符串转换为小写。
toUpperCase()  | 把字符串转换为大写。
toString() | 返回字符串。
valueOf()  | 返回某个字符串对象的原始值。

* 静态方法

`String.fromCharCode()` 使用作为参数传入的字符编码创建一个新的字符串。

* HTML方法

由于不是标准方法，这里就不列举了。


### 遍历数组，使每一个元素执行 `fn` 函数

**要求：**

```js
// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
    // your implement
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html
```

**分析：**

这个任务有点像 `ECMAScript5` 中新增的数组方法：`forEach()`。还有一点这里的参数 index 是可选形参，保证第一个参数 item 能正常传入就行了，代码非常简单，如下：

**实现：**

```js
function each(arr, fn) {
    for(var i in arr){
        fn(arr[i],i);
    }
}
```

### 获取对象中第一层元素个数

**要求：**

```js
// 获取一个对象里面第一层元素的数量，返回一个整数
function getObjectLength(obj) {}

// 使用示例
var obj = {
    a: 1,
    b: 2,
    c: {
        c1: 3,
        c2: 4
    }
};
console.log(getObjectLength(obj)); // 3
```

**实现：**

```js
function getObjectLength(obj) {
    return Object.keys(obj).length;
}
```

这个自己写的比较简单，不知道可以这样写不。其中 `Object.keys(o)` 为 Object 的一个静态方法，参数是一个对象，返回一个包含o的所有可枚举自有（非继承）属性名字的数组。


### 正则表达式

**要求：**

```js
// 判断是否为邮箱地址
function isEmail(emailStr) {
    // your implement
}

// 判断是否为手机号
function isMobilePhone(phone) {
    // your implement
}
```

**分析：**

邮箱由（数字字母，点），数字字母组合，@符号，数字字母，（点，数字字母）。其中两个小括号都是任意个数的。并且开头和结尾都是字母。

手机号是11位组成的，有时候会在前面加国际区号的前缀，如中国：+86。查阅相关资料后发现区号最多4位。[国际电话区号_百度百科](http://baike.baidu.com/link?url=2nwM_XyoKXLNPxk0-uDwGT4SxIFncXy7dqB3VbsH3tSaueYRri3CYOWWF9qb84zUqeKkq9uTF2YfetoiyJVm7_)

并且手机号最多就是11位，其他国家有用8位的，也有用7位，10位的都有。最短是7位，最长是11位。

**实现：**

```js
// 判断是否为邮箱地址
function isEmail(emailStr) {
    var pattern = /^(\w+\.)*\w+@\w+(\.\w+)+$/;
    return pattern.test(emailStr);
}

// 判断是否为手机号
function isMobilePhone(phone) {
    var pattern = /^(\+\d{1,4})?\d{7,11}$/;
    return pattern.test(phone);
}
```

**相关方法和知识点：**

* 参考：[RegExp MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Special_characters_in_regular_expressions)
* 正则表达式修饰符：

字符 | 含义
g | 全局匹配
i | 忽略大小写
m | 让开始和结束字符（^ 和 $）工作在多行模式（也就是，^ 和 $ 可以匹配字符串中每一行的开始和结束（行是由 \n 或 \r 分割的），而不只是整个输入字符串的最开始和最末尾处。

* 字符类别

字符 |  含义
[...]|方括号内的任意字符
[^...]|不在方括号内的任意字符
. | （点号，小数点）匹配任意单个字符，但是换行符除外，包括：\n \r \u2028 或 \u2029。<br><br>需要注意的是，m 多行（multiline）标志不会改变点号的表现。因此为了匹配多行中的字符集，可使用[^] （当然你不是打算用在旧版本 IE 中），它将会匹配任意字符，包括换行符<br><br>例如，/.y/ 匹配 "yes make my day" 中的 "my" 和 "ay"，但是不匹配 "yes"。
\d | 匹配基本拉丁字母表（basic Latin alphabet）中的一个数字字符。等价于[0-9]。<br><br>例如，/\d/ 或 /[0-9]/ 匹配 "B2 is the suite number." 中的 '2'。
\D | 匹配任意一个不是基本拉丁字母表中数字的字符。等价于[^0-9]。<br><br>例如，/\D/ 或 /[^0-9]/ 匹配 "B2 is the suite number." 中的 'B'。
\w | 匹配任意来自基本拉丁字母表中的字母数字字符，还包括下划线。等价于 [A-Za-z0-9_]。<br><br>例如，/\w/ 匹配 "apple" 中的 'a'，"$5.28" 中的 '5' 和 "3D" 中的 '3'。
\W | 匹配任意不是基本拉丁字母表中单词（字母数字下划线）字符的字符。等价于 [^A-Za-z0-9_]。<br><br>例如，/\W/ 或 /[^A-Za-z0-9_]/ 匹配 "50%" 中的 '%'。
\s | 匹配一个空白符，包括空格、制表符、换页符、换行符和其他 Unicode 空格。<br><br>等价于 [ \f\n\r\t\v​\u00a0\u1680​\u180e\u2000​\u2001\u2002​\u2003\u2004​ \u2005\u2006​\u2007\u2008​\u2009\u200a​\u2028\u2029​​\u202f\u205f​ \u3000]。<br><br>例如 /\s\w*/ 匹配 "foo bar" 中的 ' bar'。
\S | 匹配一个非空白符。等价于 [^ \f\n\r\t\v​\u00a0\u1680​\u180e\u2000​\u2001\u2002​\u2003\u2004​ \u2005\u2006​\u2007\u2008​\u2009\u200a​\u2028\u2029​\u202f\u205f​\u3000]。<br><br>例如，/\S\w*/ 匹配 "foo bar" 中的 'foo'。
[\b] | 匹配一个退格符（backspace）（不要与 \b 混淆）

* 直接量字符

字符| 匹配
数字和字母字符|自身
\t | 匹配一个水平制表符（tab）
\r | 匹配一个回车符（carriage return）
\n | 匹配一个换行符（linefeed）
\v | 匹配一个垂直制表符（vertical tab）
\f | 匹配一个换页符（form-feed）
\0 | 匹配一个 NUL 字符。不要在此后面跟小数点。
\cX |X 是 A - Z 的一个字母。匹配字符串中的一个控制字符。<br><br>例如，/\cM/ 匹配字符串中的 control-M。
\xhh  |  匹配编码为 hh （两个十六进制数字）的字符。
\uhhhh | 匹配 Unicode 值为 hhhh （四个十六进制数字）的字符。

* 边界

字符|  含义
^  |匹配输入/字符串的开始。如果多行（multiline）标志被设为 true，该字符也会匹配一个断行（line break）符后的开始处。<br><br>例如，/^A/ 不匹配 "an A" 中的 "A"，但匹配 "An A" 中的 "A"。
$   |匹配输入/字符串的结尾。如果多行（multiline）标志被设为 true，该字符也会匹配一个断行（line break）符的前的结尾处。<br><br>例如，/t$/ 不匹配 "eater" 中的 "t"，但匹配 "eat" 中的 "t"。
\b  |匹配一个零宽单词边界（zero-width word boundary），如一个字母与一个空格之间。 （不要和 [\b] 混淆）<br><br>例如，/\bno/ 匹配 "at noon" 中的 "no"，/ly\b/ 匹配 "possibly yesterday." 中的 "ly"。
\B  |匹配一个零宽非单词边界（zero-width non-word boundary），如两个字母之间或两个空格之间。<br><br>例如，/\Bon/ 匹配 "at noon" 中的 "on"，/ye\B/ 匹配 "possibly yesterday." 中的 "ye"。


## DOM

参考：

* [HTML DOM 教程 W3C](http://www.w3school.com.cn/htmldom/index.asp)
* [JavaScript HTML DOM W3C](http://www.w3school.com.cn/js/js_htmldom.asp)
* [参考手册-HTML DOM Document 对象](http://www.w3school.com.cn/jsref/dom_obj_document.asp)
* [参考手册-HTML DOM Element 对象](http://www.w3school.com.cn/jsref/dom_obj_all.asp)


### 基本任务

**任务：**

先来一些简单的，在你的util.js中完成以下任务：

```js
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    // your implement
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    // your implement
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    // your implement
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
function getPosition(element) {
    // your implement
}
```

**思路：**

* `addClass()`

    对于element本身如果没有样式类，那么使用Element的className属性获取的是空字符串，则直接添加新的样式类字符串即可。对于已经有了样式类的元素，获取到原有的样式类后，在后面添加一个空格，再添加新的样式类即可。

* `removeClass()`

    获取原始的样式，然后用正则表达式去匹配这个要删掉的样式，由于是动态的正则表达式，所以要用正则的构造函数 `RegExp()` 来创建，并且使用 `\b` 来确定单词边界。匹配好后用空字符串替换被匹配的样式类即可。

* `isSiblingNode()`

    直接判断两个父节点是不是相同

* `getPosition()`

    下面这些内容是我之前的思路，现在觉得太复杂，可以用另一种解决方法。

    > `offsetTop`, `offsetLeft` 都是相对于最近一个有定位的父元素，如果都没有那么就是相对于 body 的偏移位置。
    >
    > `offsetParent` 是寻找最近一个有定位的父级元素，如果没有，那么找到 body 元素。
    >
    > 所以这道题需要先寻找有定位的父级元素，如果都没有，那么就是相对于 body 的偏移了，可以直接使用 `offsetTop`, `offsetLeft`。
    >
    > 如果有定位的父级元素不是 body，是 A 元素，那么再寻找 A 元素的最近的有定位的父级元素，如果没有，就是相对于 body 的定位，这时，所求偏移量就是 A 的偏移量加所求元素相对于 A 的偏移量。如果 A 还有已经定位的父级元素，就继续去推，直到找到 body 为止。
    >
    > 这里可能要用到一个递归算法。

    **另一种方法：**

    使用 `getBoundingClientRect()` 方法获取当前元素相对于可视区域的位置，再加上滚动条的位置。

    关于滚动条的位置 `scrollTop`, `scrollLeft` 这两个属性的使用，各个浏览器还都不一样。

    * 详情见 [document.body.scrollTop or document.documentElement.scrollTop](http://www.cnblogs.com/zhenyu-whu/archive/2012/11/13/2768004.html)。

    简单的说就是：FF、Opera 和 IE 浏览器认为在客户端浏览器展示的页面的内容对应于整个 HTML，所以使用 `document.documentElement`来代表，相应的滚动距离则通过 `document.documentElement.scrollLeft` 和 `document.documentElement.scrollTop` 来获取，而 Safari 和 Chrome 浏览器则认为页面开始于 body 部分，从而相应的滚动距离用 `document.body.scrollLeft` 和 `document.body.scrollTop` 来获取。另外需要注意的是，FF 和 IE 的 quirks mode（兼容模式）下是用 `document.body` 来获取的。

    documentElement 对应的是 html 标签，而 body 对应的是 body 标签

    针对跨浏览器的解决方案则可简单的用如下代码获取：

```js
var scrollLeft = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
```

**实现：**

```js
// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var oldClassName = element.className; //获取旧的样式类
    element.className = oldClassName === "" ? newClassName : oldClassName + " " + newClassName;
}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var originClassName = element.className; //获取原先的样式类
    var pattern = new RegExp("\\b" + oldClassName + "\\b"); //使用构造函数构造动态的正则表达式
    element.className = originClassName.replace(pattern, '');
}

function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

function getPosition(element) {
    var pos={};
    pos.x = element.getBoundingClientRect().left + Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
    pos.y = element.getBoundingClientRect().top + Math.max(document.documentElement.scrollTop, document.body.scrollTop);
    return pos;
}
```

### mini $

**任务：**

接下来挑战一个mini $，它和之前的$是不兼容的，它应该是document.querySelector的功能子集，在不直接使用document.querySelector的情况下，在你的util.js中完成以下任务：

```js
// 实现一个简单的Query
function $(selector) {

}

// 可以通过id获取DOM对象，通过#标示，例如
$("#adom"); // 返回id为adom的DOM对象

// 可以通过tagName获取DOM对象，例如
$("a"); // 返回第一个<a>对象

// 可以通过样式名称获取DOM对象，例如
$(".classa"); // 返回第一个样式定义包含classa的对象

// 可以通过attribute匹配获取DOM对象，例如
$("[data-log]"); // 返回第一个包含属性data-log的对象

$("[data-time=2015]"); // 返回第一个包含属性data-time且值为2015的对象

// 可以通过简单的组合提高查询便利性，例如
$("#adom .classa"); // 返回id为adom的DOM所包含的所有子节点中，第一个样式定义包含classa的对象
```

**参考：**

* [Sizzle选择器](http://www.imooc.com/code/4477)
* [Sizzle引擎--原理与实践（一）](http://www.cnblogs.com/xesam/archive/2012/02/15/2352466.html)
* [Sizzle是怎样工作的](http://www.cnblogs.com/rubylouvre/archive/2011/01/24/1942818.html)

**思路：**

1. 通过空格拆分参数 selector，因为可能是组合查询。拆分为数组 selectorArr
2. 遍历 selectorArr，条件判断各种情况。
3. 得到节点的 Element 对象后，以这个对象为父节点，继续下一层的判断。

**实现：**

```js
//多个选择器有点难到我了，看了一些资料觉得思路应该如下：
//1.如果存在#，直接从#开始向后查
//2.如果存在tag直接找到所有的tag然后向后查
//3.样式类，属性，从后向前查，得到它所有的父节点名称，去筛选匹配
//以上的做法有点太复杂，我还是做一个简单的正向匹配吧。
function $(selector) {

    if (!selector) {
        return null;
    }

    if (selector == document) {
        return document;
    }

    selector = selector.trim();
    if (selector.indexOf(" ") !== -1) { //若存在空格
        var selectorArr = selector.split(/\s+/); //拆成数组

        var rootScope = myQuery(selectorArr[0]); //第一次的查找范围
        var i = null;
        var j = null;
        var result = [];
        //循环选择器中的每一个元素
        for (i = 1; i < selectorArr.length; i++) {
            for (j = 0; j < rootScope.length; j++) {
                result.push(myQuery(selectorArr[i], rootScope[j]));
            }
            // rootScope = result;
            // 目前这个方法还有bug
        }
        return result[0][0];
    } else { //只有一个，直接查询
        return myQuery(selector, document)[0];
    }
}

/**
 * 针对一个内容查找结果 success
 * @param  {String} selector 选择器内容
 * @param  {Element} root    根节点元素
 * @return {NodeList数组}    节点列表，可能是多个节点也可能是一个
 */
function myQuery(selector, root) {
    var signal = selector[0]; //
    var allChildren = null;
    var content = selector.substr(1);
    var currAttr = null;
    var result = [];
    root = root || document; //若没有给root，赋值document
    switch (signal) {
        case "#":
            result.push(document.getElementById(content));
            break;
        case ".":
            allChildren = root.getElementsByTagName("*");
            // var pattern0 = new RegExp("\\b" + content + "\\b");
            for (i = 0; i < allChildren.length; i++) {
                currAttr = allChildren[i].getAttribute("class");
                if (currAttr !== null) {
                    var currAttrsArr = currAttr.split(/\s+/);
                    console.log(currAttr);
                    for (j = 0; j < currAttrsArr.length; j++) {
                        if (content === currAttrsArr[j]) {
                            result.push(allChildren[i]);
                            console.log(result);
                        }
                    }
                }
            }
            break;
        case "[": //属性选择
            if (content.search("=") == -1) { //只有属性，没有值
                allChildren = root.getElementsByTagName("*");
                for (i = 0; i < allChildren.length; i++) {
                    if (allChildren[i].getAttribute(selector.slice(1, -1)) !== null) {
                        result.push(allChildren[i]);
                    }
                }
            } else { //既有属性，又有值
                allChildren = root.getElementsByTagName("*");
                var pattern = /\[(\w+)\s*\=\s*(\w+)\]/; //为了分离等号前后的内容
                var cut = selector.match(pattern); //分离后的结果，为数组
                var key = cut[1]; //键
                var value = cut[2]; //值
                for (i = 0; i < allChildren.length; i++) {
                    if (allChildren[i].getAttribute(key) == value) {
                        result.push(allChildren[i]);
                    }
                }
            }
            break;
        default: //tag
            result = root.getElementsByTagName(selector);
            break;
    }
    return result;
}
```

## 事件

### 绑定注册事件与移除事件

**任务与实现：**

```js
// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event,listener);
    } else if(element.attachEvent){
        element.attachEvent("on"+event,listener);
    }
}

// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if (element.removeEventListenr) {
        element.removeEventListenr(event,listener);
    } else if(element.detachEvent){
        element.detachEvent("on"+event,listener);
    }
}
```

**相关说明：**

IE8+ 支持 `addEventListener()`。IE8 以下的版本使用 `attachEvent()`。

* `attachEvent()` 不支持事件捕获。
* `attachEvent()` 第一个参数事件处理程序属性名使用前缀 on。
* `attachEvent()` 允许相同的事件处理程序函数注册多次。


### click 与 enter 键事件绑定

**任务与实现：**

```js
// 实现对click事件的绑定
function addClickEvent(element, listener) {
    addEvent(element, "click", listener);
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, "keydown", function(event) {
        if (event.keyCode == 13) {
            listener();
        }
    });
}
```

**相关说明：**

这里我直接使用了上一个任务写好的 `addEvent()` 函数。这样可以简化代码，并有良好的兼容性。

enter 键的 keyCode 为 13。


### 事件代理

**参考：**

* [javascript事件代理（委托）](http://www.cnblogs.com/Aralic/p/4446030.html)
* [JS - 事件代理](http://www.cnblogs.com/leo388/p/4461579.html)

**任务与实现：**

```js
function delegateEvent(element,tag,eventName,listener){
    addEvent(element, eventName, function(event){
        var target = event.target || event.srcElement;
        if(target.tagName.toLowerCase() == tag.toLowerCase()) {
            listener.call(target, event);
        }
    });
}
```


## BOM

**任务与实现：**

```js
// 判断是否为IE浏览器，返回-1或者版本号
function isIE() {
    var s = navigator.userAgent.toLowerCase();
    console.log(s);
    //ie10的信息：
    //mozilla/5.0 (compatible; msie 10.0; windows nt 6.2; trident/6.0)
    //ie11的信息：
    //mozilla/5.0 (windows nt 6.1; trident/7.0; slcc2; .net clr 2.0.50727; .net clr 3.5.30729; .net clr 3.0.30729; media center pc 6.0; .net4.0c; .net4.0e; infopath.2; rv:11.0) like gecko
    var ie = s.match(/rv:([\d.]+)/) || s.match(/msie ([\d.]+)/);
    if(ie) {
        return ie[1];
    } else {
        return -1;
    }
}

// 设置cookie
function setCookie(cookieName, cookieValue, expiredays) {
    var cookie = cookieName + "=" + encodeURIComponent(cookieValue);
    if (typeof expiredays === "number") {
        cookie += ";max-age=" + (expiredays * 60 * 60 * 24);
    }
    document.cookie = cookie;
}

// 获取cookie值
function getCookie(cookieName) {
    var cookie = {};
    var all = document.cookie;
    if (all==="") {
        return cookie;
    }
    var list = all.split("; ");
    for (var i = 0; i < list.length; i++) {
        var p = list[i].indexOf("=");
        var name = list[i].substr(0, p);
        var value = list[i].substr(p + 1);
        value = decodeURIComponent(value);
        cookie[name] = value;
    }
    return cookie;
}
```

* 参考自：JavaScript权威指南


### sessionStorage、localStorage 和 cookie 之间的区别

* **共同点**

    都是保存在浏览器端，且同源的。都是键值对存储。

* **区别**

    特性 | Cookie | localStorage | sessionStorage
    数据的声明周期 | 一般由服务器生成，可设置失效时间。如果在浏览器端生成Cookie，默认是关闭浏览器后失效 | 除非被清除，否则永久保存 | 仅在当前会话下有效，关闭页面或浏览器后被清除
    存放数据大小 | 4K左右 | 一般为5MB | 同左
    与服务器端通信 | 每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题 | 仅在客户端（即浏览器）中保存，不参与和服务器的通信 | 同左
    易用性 | 需要程序员自己封装，源生的Cookie接口不友好 | 源生接口可以接受，亦可再次封装来对Object和Array有更好的支持 | 同左

* **应用场景**

    每个 HTTP 请求都会带着 Cookie 信息，所以 Cookie 应当简单，比如判断用户是否登陆。

    localStorage 接替 Cookie 管理购物车，同时也可以存储 HTML5 游戏的一些本地数据。

    sessionStorage 在表单内容较多的时候，为了优化用户体验，按步骤分页引导填写，这时使用sessionStorage 就发挥了作用。

* **安全性**

    cookie 中最好不要放置任何明文的东西。两个 storage的数据提交后在服务端一定要校验

**参考：**

* [详说 Cookie, LocalStorage 与 SessionStorage](http://jerryzou.com/posts/cookie-and-web-storage/)


## Ajax

**任务：**

```js
// 学习Ajax，并尝试自己封装一个Ajax方法。实现如下方法：
function ajax(url, options) {
    // your implement
}

// 使用示例：
ajax(
    'http://localhost:8080/server/ajaxtest',
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);　
```

**实现：**

```js
function ajax(url, options) {

    var dataResult; //结果data

    // 处理data
    if (typeof(options.data) === 'object') {
        var str = '';
        for (var c in options.data) {
            str = str + c + '=' + options.data[c] + '&';
        }
        dataResult = str.substring(0, str.length - 1);
    }

    // 处理type
    options.type = options.type || 'GET';

    //获取XMLHttpRequest对象
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    // 发送请求
    oXhr.open(options.type, url, true);
    if (options.type == 'GET') {
        oXhr.send(null);
    } else {
        oXhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        oXhr.send(dataResult);
    }

    // readyState
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                if (options.onsuccess) {
                    options.onsuccess(xhr.responseText, xhr.responseXML);
                }
            } else {
                if (options.onfail) {
                    options.onfail();
                }
            }
        }
    };
}
```

**说明：**

1. 首先是处理 data，因为测试用例中的 data 是对象，所以把它遍历出来，把键和值中间用 = 连接，和下一组数据用 & 连接。
2. 处理 type，默认是 GET 请求。
3. 使用 `open()` 指明请求方法和 url。方法一般为 GET 或 POST。
4. 调用 `send()` 方法，GET 请求没有主体，所以应该传递 null 或省略这个参数。POST 请求有主体，同时使用 `setRequestHeaders()` 来指定 "Content-type" 头。这样便成功发送了请求。
5. 取的响应。一个完整的 HTTP 响应是由状态码、响应头集合、响应主体组成。
    * `readyState` 是一个整数，它指定了 HTTP 请求的状态。其值和含义如下表：

    值 | 含义
    0 | open() 尚未调用
    1 | open() 已调用
    2 | 接收到响应头信息
    3 | 接收到响应主体
    4 | 响应完成

    * `status` 和 `statusText` 属性以数字和文本的形式返回 HTTP 状态码。这些属性保存标准的 HTTP 值。如，200和 "OK" 表示成功请求，404和 "Not Found" 表示 URL 不能匹配服务器上的任何资源。
    * `getResponseHeader()` 和 `getAllResponseHeaders()` 能查询响应头。
    * 响应主体可以从 `responseText` 属性中得到文本形式的，从 `responseXML` 属性中得到 Document 形式的。

6. 补充一点 `onreadystatechange` 事件会在 `readyState` 改变时被触发。

**参考：**

* [Ajax W3C](http://www.w3school.com.cn/ajax/index.asp)
* [Comet：基于 HTTP 长连接的“服务器推”技术](http://www.ibm.com/developerworks/cn/web/wa-lo-comet/)


## 练习1：处理兴趣列表

### 任务要求

在`task0002`目录下创建一个`task0002_1.html`文件，以及一个`js`目录和`css`目录，在`js`目录中创建`task0002_1.js`，并将之前写的`util.js`也拷贝到`js`目录下。然后完成以下需求。

**第一阶段**

在页面中，有一个单行输入框，一个按钮，输入框中用来输入用户的兴趣爱好，允许用户用半角逗号来作为不同爱好的分隔。

当点击按钮时，把用户输入的兴趣爱好，按照上面所说的分隔符分开后保存到一个数组，过滤掉空的、重复的爱好，在按钮下方创建一个段落显示处理后的爱好。

**第二阶段**

单行变成多行输入框，一个按钮，输入框中用来输入用户的兴趣爱好，允许用户用换行、空格（全角/半角）、逗号（全角/半角）、顿号、分号来作为不同爱好的分隔。

当点击按钮时的行为同上

**第三阶段**

用户输入的爱好数量不能超过10个，也不能什么都不输入。当发生异常时，在按钮上方显示一段红色的错误提示文字，并且不继续执行后面的行为；当输入正确时，提示文字消失。

同时，当点击按钮时，不再是输出到一个段落，而是每一个爱好输出成为一个checkbox，爱好内容作为checkbox的label。

### 思路

主要就是对字符串的操作，`split()` 的使用，以及正则表达式的使用。

### 实现

* [代码](https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang)
* [在线demo](http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_1.html)


## 练习2：倒计时

### 任务要求

在和上一任务同一目录下面创建一个`task0002_2.html`文件，在`js`目录中创建`task0002_2.js`，并在其中编码，实现一个倒计时功能。

- 界面首先有一个文本输入框，允许按照特定的格式`YYYY-MM-DD`输入年月日；
- 输入框旁有一个按钮，点击按钮后，计算当前距离输入的日期的00:00:00有多少时间差
- 在页面中显示，距离YYYY年MM月DD日还有XX天XX小时XX分XX秒
- 每一秒钟更新倒计时上显示的数
- 如果时差为0，则倒计时停止

### 思路

* `setInterval()` 方法可按照指定的周期（以毫秒计）来调用函数或计算表达式。

     `setInterval()` 方法会不停地调用函数，直到 `clearInterval()` 被调用或窗口被关闭。由 `setInterval()` 返回的 ID 值可用作 `clearInterval()` 方法的参数。
* `clearInterval()` 方法可取消由 `setInterval()` 设置的 timeout。

    `clearInterval()` 方法的参数必须是由 `setInterval()` 返回的 ID 值。
* `setTimeout()` 方法用于在指定的毫秒数后调用函数或计算表达式。

    setTimeout() 只执行 code 一次。如果要多次调用，请使用 setInterval() 或者让 code 自身再次调用 setTimeout()。   
* `clearTimeout()` 方法可取消由 setTimeout() 方法设置的 timeout。

### 实现

* [代码](https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang)
* [在线demo](http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_2.html)


## 练习3：图片轮播

### 任务要求

在和上一任务同一目录下面创建一个`task0002_3.html`文件，在`js`目录中创建`task0002_3.js`，并在其中编码，实现一个轮播图的功能。

- 图片数量及URL均在HTML中写好
- 可以配置轮播的顺序（正序、逆序）、是否循环、间隔时长
- 图片切换的动画要流畅
- 在轮播图下方自动生成对应图片的小点，点击小点，轮播图自动动画切换到对应的图片

效果示例：[http://echarts.baidu.com/](http://echarts.baidu.com/) 上面的轮播图（不需要做左右两个箭头）

### 思路

将图片排列成一排，一起向左运动，每次运动的距离刚好是一张图片的宽度。

对于下面的小圆点，使用事件代理，将事件传递给每个 a 标签。

**参考：**

* [JS图片切换](http://www.itxueyuan.org/view/6323.html)

### 实现

* [代码](https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang)
* [在线demo](http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_3.html)

### 关于变速运动

评论中有人问到运动部分为什么这样写，下面我讲一下吧。

```js
function startMove(target) {
    clearInterval(timerInner);
    timerInner = setInterval(function() {
        var speed = (target - imgListDiv.offsetLeft) / 6;
        speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

        imgListDiv.style.left = imgListDiv.offsetLeft + speed + "px";
    }, 30);
}
```

上面是运动部分代码。

* 参数 `target` 是运动终点的位置。
* 首先停止计时器，为了避免上一次调用方法时，计时器没有关闭带来的干扰。

```js
clearInterval(timerInner);
```

* 下面开始开启计时器，每隔 30ms 执行一次内部的函数。

* 变速运动

```js
var speed = (target - imgListDiv.offsetLeft) / 6;
```

    逐渐变慢，最后停止，距离越远速度越大，速度由距离决定

    速度=(目标值-当前值)/缩放系数

    这样写的原因就是为了让它做缓冲运动，而不是匀速运动，这样给用户带来的交互感觉会更好。

* 速度取整

```js
speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
```

    像素不能是小数，所以速度大于0的时候，向上取整。速度小于0时，向下取整

* 最后关于运动终止条件。

```js
imgListDiv.style.left = imgListDiv.offsetLeft + speed + "px";
```

    由这一行可以看出，`imgListDiv.style.left` 在不断增大，即 `imgListDiv.offsetLeft` 在不断增大。这两个是相同的属性，只不过一个是在赋值时使用，第二个是在取值时使用。

    再看这行代码，由于这部分是每个30ms执行一次的，所以继续执行到这里。

```js
var speed = (target - imgListDiv.offsetLeft) / 6;
```

    当不断增大的 `imgListDiv.offsetLeft` 等于 `target` 时，`speed` 为0。宏观表现为不再运动，这便是运动终止的状态，但是这里的方法还是不断在执行，每个30ms在执行。



## 练习4：输入框即时提示

### 任务要求

在和上一任务同一目录下面创建一个`task0002_4.html`文件，在`js`目录中创建`task0002_4.js`，并在其中编码，实现一个类似百度搜索框的输入提示的功能。

要求如下：

- 允许使用鼠标点击选中提示栏中的某个选项
- 允许使用键盘上下键来选中提示栏中的某个选项，回车确认选中
- 选中后，提示内容变更到输入框中

**初级班：**

- 不要求和后端交互，可以自己伪造一份提示数据例如：

```js
var suggestData = ['Simon', 'Erik', 'Kener'];
```

**中级班：**

- 自己搭建一个后端Server，使用Ajax来获取提示数据

### 思路

这里我使用了给 input 标签加 input 监听，即输入框内容发生改变时，触发事件。并兼容到 IE7。

关于 input 监听的代码如下：

```js
function addInputListener() {
    if (inputArea.addEventListener) { // all browsers except IE before version 9
        inputArea.addEventListener("input", OnInput);
    }
    if (inputArea.attachEvent) { // Internet Explorer and Opera
        inputArea.attachEvent("onpropertychange", OnPropChanged); // Internet Explorer
    }
}

// Firefox, Google Chrome, Opera, Safari from version 5, Internet Explorer from version 9
function OnInput(event) {
    var inputValue = event.target.value;
    handleInput(inputValue);
}
// Internet Explorer
function OnPropChanged(event) {
    var inputValue = "";
    if (event.propertyName.toLowerCase() == "value") {
        inputValue = event.srcElement.value;
        handleInput(inputValue);
    }
}
```

其中 handleInput() 为下一步要执行的方法。

其实后来想了想也可以使用 keyup 事件了做这个任务。

匹配的过程同样适用正则表达式，从开头开始匹配。遍历备选单词，如果匹配成功，则放入 li 标签中，准备展示。

然后分别添加点击事件，键盘的 keydown 事件，用来选中提示出的单词。

**参考：**

* [oninput 事件](http://help.dottoro.com/ljhxklln.php)

### 实现

* [代码](https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang)
* [在线demo](http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_4.html)



## 练习5：拖拽交互

### 任务要求

- 实现一个可拖拽交互的界面
- 如示例图，左右两侧各有一个容器，里面的选项可以通过拖拽来左右移动
- 被选择拖拽的容器在拖拽过程后，在原容器中消失，跟随鼠标移动
- 注意拖拽释放后，要添加到准确的位置
- 拖拽到什么位置认为是可以添加到新容器的规则自己定
- 注意交互中良好的用户体验和使用引导

### 思路

1. 页面布局时，将要被拖拽的 div 设置为绝对定位，因为这样在后面拖拽的时候才方便更改坐标。
2. 初始化界面的时候，首先让 div 块按照相应的高度重新排列一下。
3. 拖拽方法的实现。由 mousedown mousemove mouseup 三部分组成。
4. 在 mousemove 中判断，不能让鼠标拖出浏览器窗口。
5. 在 mouseup 中判断，是否到达指定区域。完成拖拽。

我在这里没有使用 html5 中的拖拽 API，所以兼容性还是很好的。

### 实现

* [代码](https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang)
* [在线demo](http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/task0002_5.html)


## 最终作品

* [代码](https://github.com/Gaohaoyang/ife/tree/master/task/task0002/work/Gaohaoyang)
* [在线 Demo](http://gaohaoyang.github.io/ife/task/task0002/work/Gaohaoyang/index.html)


## Update

**2015/06/01**

* [导师的参考答案](https://github.com/hushicai/ife-task0002)
* [review](https://github.com/baidu-ife/ife/tree/master/task/task0002/review)


加油！向着下一个目标前进！
