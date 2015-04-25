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

### JavaScript 的性能优化：加载和执行

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

### 值类型和引用类型，对象的读取、遍历方式，深度克隆

#### 值类型和引用类型的区别

声明一个值类型变量，编译器会在栈上分配一个空间，这个空间对应着该值类型变量，空间里存储的就是该变量的值。引用类型的实例分配在堆上，新建一个引用类型实例，得到的变量值对应的是该实例的内存分配地址，这就像您的银行账号一样。

JavaScript中原始值包括：undefined，null布尔值，数字和字符串。引用类型主要指对象（包括数组和函数）。

>* 原始值是不可更改的。对象的值是可修改的。
>* 原始值的比较是值的比较。对象的比较并非值的比较。对象的值都是引用，对象的比较均是引用的比较，当且仅当他们都引用同一个基对象时，他们才相等。

#### 对象的读取、遍历方式

参考：[JavaScript 指南-使用对象](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Working_with_Objects)


---

感觉任务2好难，加油啊！

未完待续

