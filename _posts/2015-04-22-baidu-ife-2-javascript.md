---
layout: post
title:  "百度Web前端技术学院(2)-JavaScript 基础"
date:   2015-04-22 19:06:05
categories: Front-end
excerpt: 百度前端学院基础课程 JavaScript 相关。
---

* content
{:toc}


## 任务

掌握JavaScript基础知识，能够使用JavaScript编写一些复杂度不大的交互功能。

**任务：** [JavaScript基础](https://github.com/Gaohaoyang/ife/tree/master/task/task0002)   

做完任务一的时候深深地感觉到自己的基础非常的薄弱，在这里再次感谢一下百度前端技术学院，做任务的时候深刻理解了自己平时掌握不牢固的内容，比如浮动、BFC、等高布局等。继续加油吧！

-------

像上一篇文章一样，写些东西记录一下。   

----

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

---

### 如何在 HTML 页面加载 JavaScript 代码

使用 `<script>` 标签在 HTML 文件中添加 JavaScript 代码。

我们可以将 `JavaScript` 代码放在 `html` 文件中任何位置，但是我们一般放在网页的 `head` 或者 `body` 部分。

放在 `<head>` 部分    
最常用的方式是在页面中head部分放置 `<script>` 元素，浏览器解析 `head` 部分就会执行这个代码，然后才解析页面的其余部分。

放在 `<body>` 部分    
JavaScript 代码在网页读取到该语句的时候就会执行。

**注意**: javascript 作为一种脚本语言可以放在 html 页面中任何位置，但是浏览器解释 html 时是按先后顺序的，所以前面的 script 就先被执行。比如进行页面显示初始化的 js 必须放在 head 里面，因为初始化都要求提前进行（如给页面 body 设置 css 等）；而如果是通过事件调用执行的 function 那么对位置没什么要求的。


---

### 为什么把 `<script>` 放在 `</body>` 前

虽然理论上放在哪里都是可以的，但是对于前端页面优化来讲，还是放在底部是最佳的，因为如果JS执行出现错误了，最起码页面中的元素还能加载出来，因为DOM文档是从上往下的顺序执行的。    如果你还不了解DOM的加载顺序，请阅读jQuery中ready与load事件的区别。

**下面是重点**

按照HTML5标准中的HTML语法规则，如果在 `</body>` 后再出现 `<script>` 或任何元素的开始标签，都是parse error，浏览器会忽略之前的 `</body>` ，即视作仍旧在body内。所以实际效果和写在 `</body>` 之前是没有区别的。

总之，这种写法虽然也能work，但是并没有带来任何额外好处，实际上出现这样的写法很可能是误解了“将script放在页面最末端”的教条。所以还是不要这样写为好。

* [script在body闭合标签之后还是之前-知乎](http://www.zhihu.com/question/20027966)
* [body 和 html 标签均没有关闭](http://www.zhihu.com/question/19617126)

---

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

在支持 defer 属性的浏览器上，弹出的顺序则是："script"、"defer"、"load"。请注意，带有 defer 属性的 `<script>` 元素不是跟在第二个后面执行，而是在 onload 事件被触发前被调用。

引用的资料可能写的比较早，在 [CanIUse](http://caniuse.com/#search=defer) 上查了一下 defer 发现大部分浏览器都是支持的。如下图：   
![defer的支持情况](http://7q5cdt.com1.z0.glb.clouddn.com/Baidu-Front-end-defer.jpg)

HTML 5 为 `<script>` 标签定义了一个新的扩展属性：async。它的作用和 defer 一样，能够异步地加载和执行脚本，不因为加载脚本而阻塞页面的加载。但是有一点需要注意，在有 async 的情况下，JavaScript 脚本一旦下载好了就会执行，所以很有可能不是按照原本的顺序来执行的。如果 JavaScript 脚本前后有依赖性，使用 async 就很有可能出现错误。

IE8,9不支持 `async`

* 动态脚本元素
* 使用 XMLHttpRequest(XHR)对象

----

**原文中的总结**

减少 JavaScript 对性能的影响有以下几种方法：

* 将所有的 `<script>` 标签放到页面底部，也就是 `</body>` 闭合标签之前，这能确保在脚本执行前页面已经完成了渲染。
* 尽可能地合并脚本。页面中的 `<script>` 标签越少，加载也就越快，响应也越迅速。无论是外链脚本还是内嵌脚本都是如此。
* 采用无阻塞下载 JavaScript 脚本的方法：
    * 使用 `<script>` 标签的 defer 属性（仅适用于 IE 和 Firefox 3.5 以上版本）；
    * 使用动态创建的 `<script>` 元素来下载并执行代码；
    * 使用 XHR 对象下载 JavaScript 代码并注入页面中。

通过以上策略，可以在很大程度上提高那些需要使用大量 JavaScript 的 Web 网站和应用的实际性能。

---

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

---

### 一些要点

* 一个没有被赋值的变量会有个默认值 undefined
* null 与 undefined 的不同点：

<pre><code class="javascript">typeof null        // object (bug in ECMAScript, should be null)
typeof undefined   // undefined
null === undefined // false
null  == undefined // true
</code></pre>

typeof null 返回 object

* Number 数字类型，它并没有为整数给出一种特定的类型。除了能够表示浮点数外，还有一些带符号的值：+Infinity，-Infinity 和 NaN (非数值，Not-a-Number)。

NaN与任何值都不相等，包括自身。应当使用 `x != x` 来判断，当且仅当 x 为 NaN 的时候，表达式的结果才为 `true`。相似的函数有 `isNaN()`, `isFinite()`。

* 数组直接量的语法允许有可选的结尾逗号，故 `[,,]` 只有两个元素而非三个。

---

### 实践判断各种数据类型的方法

    // 判断arr是否为一个数组，返回一个bool值
    function isArray(arr) {
        return typeof arr === "object" && Object.prototype.toString.call(arr) === "[object Array]";
    }

    // 判断fn是否为一个函数，返回一个bool值
    function isFunction(fn) {
        return typeof fn === "function";
    }

#### 数组类型

在 ECMAScript5 中，可以直接使用 `Array.isArray()` 来判断数组。

    Array.isArray([]);  //true
    Array.isArray({});  //false

我看《JavaScript权威指南上》没有推荐使用 `instanceof`，因为可能会有多窗体(frame)存在。

> 这样每一个窗口都有一个自己的 JavaScript 环境，有自己的全局对象。并且每个全局对象都有自己的一组构造函数。因此一个窗体中的对象不可能是另外窗体中的构造函数的实例。

所以采用了上述我写的那样的代码

---

### 值类型和引用类型的区别

声明一个值类型变量，编译器会在栈上分配一个空间，这个空间对应着该值类型变量，空间里存储的就是该变量的值。引用类型的实例分配在堆上，新建一个引用类型实例，得到的变量值对应的是该实例的内存分配地址，这就像您的银行账号一样。

JavaScript中原始值包括：undefined，null，布尔值，数字和字符串。引用类型主要指对象（包括数组和函数）。

>* 原始值是不可更改的。对象的值是可修改的。
>* 原始值的比较是值的比较。对象的比较并非值的比较。对象的值都是引用，对象的比较均是引用的比较，当且仅当他们都引用同一个基对象时，他们才相等。

---

### 对象的读取、遍历方式

参考：[JavaScript 指南-使用对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects)

* 对象

在javascript中，一个对象可以是一个单独的拥有属性和类型的实体。我们拿它和一个杯子做下类比。一个杯子是一个对象(物体)，拥有属性。杯子有颜色，图案，重量，由什么材质构成等等。同样，javascript对象也有属性来定义它的特征。

* 属性

一个 javascript 对象有很多属性。一个对象的属性可以被解释成一个附加到对象上的变量。对象的属性和普通的 javascript 变量基本没什么区别，仅仅是属性属于某个对象。属性定义了对象的特征(译注：动态语言面向对象的鸭子类型)。你可以通过点符号来访问一个对象的属性。JavaScript 对象的属性也可以通过方括号访问。

* 枚举

你可以在 `for...in` 语句中使用方括号标记以枚举一个对象的所有属性。为了展示它如何工作，下面的函数当你将对象及其名称作为参数传入时，显示对象的属性：

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

console:

    srcObj.a = 2
    srcObj.b = [object Object]

这里使用 `hasOwnProperty()` 是为了确保是自己的属性而非继承的属性。

可以如下写，跳过这个对象的方法：

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

相关的方法还有：`Object.keys()`, `Object.getOwnPropertyNames()`

`Object.keys()` 方法会返回一个由给定对象的所有可枚举自身属性的属性名组成的数组，数组中属性名的排列顺序和使用for-in循环遍历该对象时返回的顺序一致（两者的主要区别是 for-in 还会遍历出一个对象从其原型链上继承到的可枚举属性）。

`Object.getOwnPropertyNames()` 方法返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性）组成的数组。

* 创建对象

创建对象的方式有三种：使用对象初始化器，使用构造函数，使用 `Object.create()` 方法。

`Object.create()` 方法创建一个拥有指定原型和若干个指定属性的对象。

* 继承

所有的 JavaScript 对象继承于至少一个对象。被继承的对象被称作原型，并且继承的属性可能通过构造函数的 prototype 对象找到。

* 定义方法

一个方法 是关联到某个对象的函数，或者简单地说，一个方法是一个值为某个函数的对象属性。定义方法就象定义普通的函数，除了它们必须被赋给对象的某个属性。例如：

    objectName.methodname = function_name;

    var myObj = {
      myMethod: function(params) {
        // ...do something
      }
    };

---

#### 深度克隆

了解值类型和引用类型的区别，了解各种对象的读取、遍历方式，并在util.js中实现以下方法：

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

**参考：**

* [白话简单克隆和深度克隆](http://blog.csdn.net/java2000_net/article/details/3014934) 介绍什么是深度克隆，用羊圈和羊的图，简单深刻。
* [javascript克隆对象深度介绍](http://www.jb51.net/article/32015.htm) 这个代码写的太妙了，可惜找不到源地址了，都是转载来转载去的，要是你知道源地址，请留言告诉我。

浅度克隆：基本类型为值传递，对象仍为引用传递。 

深度克隆：所有元素或属性均完全克隆，并于原引用类型完全独立，即，在后面修改对象的属性的时候，原对象不会被修改。 

**思路：**深度克隆复制目标对象，那么就需要枚举这个对象。

1. 判断当前属性是否是引用类型，如果是数组或者对象，创建响应类型变量。
2. 枚举对象内所有属性。
3. 使用 `hasOwnProperty()` 方法，排除继承的属性。
4. 给新的对象相应位置赋值，若当前属性为引用类型（数组或对象）递归本方法。直到内部的值类型。
5. 返回新的对象。

**我的代码实现：**   

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

---

### 对数组进行去重

**参考：**

* [MDN Array](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array)
* [JavaScript Array 对象 w3school](http://www.w3school.com.cn/jsref/jsref_obj_array.asp)

**要求：**

    // 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
    function uniqArray(arr) {
        // your implement
    }

    // 使用示例
    var a = [1, 3, 5, 7, 5, 3];
    var b = uniqArray(a);
    console.log(b); // [1, 3, 5, 7]

**思路：**

1. 新建一个空数组
2. 遍历原数组
3. 若新数组中不存在当前元素，将其 `push` 入新数组中
4. 返回新数组

**实现：**

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

**相关方法与知识点：**

* Array 对象属性

属性  | 描述
---|---
constructor | 返回对创建此对象的数组函数的引用。
length  | 设置或返回数组中元素的数目。
prototype  |  使您有能力向对象添加属性和方法。

* Mutator 方法，这些方法可以改变数组自身

方法 | 描述
-------------|-----------
pop | 移除数组的最后一个元素，返回值是被删除的元素。
push | 在数组的末尾添加一个或者多个元素，返回值是新的数组的长度。
reverse | 颠倒数组中元素的顺序，原先第一个元素现在变成最后一个，同样原先的最后一个元素变成了现在的第一个，也就是数组的索引发生了变化。
shift | 删除数组的第一个元素，返回值是删除的元素。
sort | 对数组中的元素进行排序。
splice | 添加或删除数组中的一个或多个元素。
unshift | 添加一个或者多个元素在数组的开头，返回值是新的数组的长度。

* Accessor 方法，这些过程不改变数组自身 These methods do not modify the array and return some representation of the array.

方法|描述
----|--------
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
---|----
filter | 对数组中的每一个元素调用参数中指定的过滤函数，并将对于过滤函数返回值为true的那些数组元素集合为新的数组返回。
forEach | 对数组的每一个元素依次调用参数中指定的函数。
every | 如果数组中每一个元素都满足参数中提供的测试函数，则返回真。
map | Creates a new array with the results of calling a provided function on every element in this array.
some | 如果数组中至少有一个元素满足参数函数的测试，则返回true。

---

### 实现 `trim()`

**参考：**

* [String MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/String)
* [JavaScript String 对象 W3school](http://www.w3school.com.cn/jsref/jsref_obj_string.asp)

**要求：**

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

**思路：**

对于 `simpleTrim()` 做两次循环，从前面开始和从后面开始。遇到空格和Tab跳出，最后用 `slice()` 取出子字符串。

对于 `trim()` 使用正则表达式。

**实现：**

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

关于正则表达式：

上面的思路是匹配开头和结尾的空白字符，并全局匹配。

* `^`：匹配字符串的开头，在多行检索中，匹配一行的开头。
* `$`：匹配字符串的结尾，在多行检索中，匹配一行的结尾。
* `|`：选择，匹配的是该符号左边的子表达式或右边的子表达式。
* `\s`：任何 Unicode 空白符。
* `g`：执行一个全局匹配，简言之，即找到所有匹配，而不是找到第一个之后就停止。

以上来自 JavaScript权威指南（犀牛书），感觉这里面将的正则表达式还不错。

**相关方法和知识点：**

* String 对象属性

属性 | 描述
----|----
constructor | 对创建该对象的函数的引用
length | 字符串的长度
prototype  | 允许您向对象添加属性和方法

* String 对象方法

方法 | 描述
-----|---
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

---

### 遍历数组，使每一个元素执行 `fn` 函数

**要求：**

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

**分析：**

这个任务有点像 `ECMAScript5` 中新增的数组方法：`forEach()`。还有一点这里的参数 index 是可选形参，保证第一个参数 item 能正常传入就行了，代码非常简单，如下：

**实现：**

    function each(arr, fn) {
        for(var i in arr){
            fn(arr[i],i);
        }
    }

---

### 获取对象中第一层元素个数

**要求：**

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

**实现：**

    function getObjectLength(obj) {
        return Object.keys(obj).length;
    }

这个自己写的比较简单，不知道可以这样写不。其中 `Object.keys(o)` 为 Object 的一个静态方法，参数是一个对象，返回一个包含o的所有可枚举自有（非继承）属性名字的数组。

---

### 正则表达式

**要求：**

    // 判断是否为邮箱地址
    function isEmail(emailStr) {
        // your implement
    }

    // 判断是否为手机号
    function isMobilePhone(phone) {
        // your implement
    }

**分析：**

邮箱由（数字字母，点），数字字母组合，@符号，数字字母，（点，数字字母）。其中两个小括号都是任意个数的。并且开头和结尾都是字母。

手机号是11位组成的，有时候会在前面加国际区号的前缀，如中国：+86。查阅相关资料后发现区号最多4位。[国际电话区号_百度百科](http://baike.baidu.com/link?url=2nwM_XyoKXLNPxk0-uDwGT4SxIFncXy7dqB3VbsH3tSaueYRri3CYOWWF9qb84zUqeKkq9uTF2YfetoiyJVm7_)

并且手机号最多就是11位，其他国家有用8位的，也有用7位，10位的都有。最短是7位，最长是11位。

**实现：**

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

**相关方法和知识点：**

* 参考：[RegExp MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/RegExp#Special_characters_in_regular_expressions)
* 正则表达式修饰符：

字符 | 含义
---|---
g | 全局匹配
i | 忽略大小写
m | 让开始和结束字符（^ 和 $）工作在多行模式（也就是，^ 和 $ 可以匹配字符串中每一行的开始和结束（行是由 \n 或 \r 分割的），而不只是整个输入字符串的最开始和最末尾处。

* 字符类别

字符 |  含义
---|---
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
---|---
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
---|---
^  |匹配输入/字符串的开始。如果多行（multiline）标志被设为 true，该字符也会匹配一个断行（line break）符后的开始处。<br><br>例如，/^A/ 不匹配 "an A" 中的 "A"，但匹配 "An A" 中的 "A"。
$   |匹配输入/字符串的结尾。如果多行（multiline）标志被设为 true，该字符也会匹配一个断行（line break）符的前的结尾处。<br><br>例如，/t$/ 不匹配 "eater" 中的 "t"，但匹配 "eat" 中的 "t"。
\b  |匹配一个零宽单词边界（zero-width word boundary），如一个字母与一个空格之间。 （不要和 [\b] 混淆）<br><br>例如，/\bno/ 匹配 "at noon" 中的 "no"，/ly\b/ 匹配 "possibly yesterday." 中的 "ly"。
\B  |匹配一个零宽非单词边界（zero-width non-word boundary），如两个字母之间或两个空格之间。<br><br>例如，/\Bon/ 匹配 "at noon" 中的 "on"，/ye\B/ 匹配 "possibly yesterday." 中的 "ye"。

加油！

未完待续

