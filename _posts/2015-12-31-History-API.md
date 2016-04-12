---
layout: post
title:  "前端处理动态 url 和 pushStatus 的使用"
date:   2015-12-31 23:06:05
categories: JavaScript
tags: JavaScript Ajax URL HistoryApi pushState pjax
---

* content
{:toc}

## 起因

起因是这样的，在尝试前后端分离的这条道路上，我自己也在不断摸索，感觉要把大部分的坑都踩踩了。目前我用的技术是：

* webpack 自动构建
* AMD 模块化 js
* Sass 预处理 CSS
* 使用前端模板引擎 handlebars 解决动态操作将 html 拼接在 js 中的问题

但最近写了一个项目类似知乎这样的多页网站。前端 url 的处理让我觉得不够优雅。我使用的是 hash 的方式处理动态 url 的，为此我专门在知乎上提了一个问题：[前端如何处理动态url？](https://www.zhihu.com/question/38802932)




这里我将问题描述如下：

> 前后端彻底分离的情况下，页面跳转页全部由前端控制。那么如何更好的处理动态url地址？
> 例如本问题的url为
> https://www.zhihu.com/question/38802932
> 这肯定是用后台路由处理的url
>
> 纯前端怎么处理？用hash吗，如下:
> https://www.zhihu.com/question#38802932
> 那如果本页跳转，只改变hash的话，页面不会刷新。
> 使用`location.reload()`倒是可以解决。
>
> **但总觉得这样处理不够优雅。大家在工作中是如何处理此类场景的？还是用传统的后台路由来提供动态url？**


感谢郑海波和剧中人的热心回答。都提到了`history`对象中的`pushState`，这是我第一次接触到这方面的内容（顿时觉得自己真是才疏学浅）。

同时也有人提到了`pjax`，这个就是`pushState`+`Ajax`的封装，也很有意思。

下面就来研究和实践一下吧。

## History

`window`对象通过`history`对象提供对浏览器历史记录的访问能力。它暴露了一些非常有用的方法和属性，让你在历史记录中自由前进和后退，而在 HTML5 中，更可以操纵历史记录中的数据。

### `back()`, `forward()`, `go()`, `length`

浏览器的历史记录就好像一个栈，最新的在最上面，较早之前看过的在下面。

如下图，Chrome的历史记录：

![chrome history](http://ww2.sinaimg.cn/large/7011d6cfjw1ezb16fn2bfj20k008htan.jpg)

下面介绍怎么在这些历史记录中跳转，但要**注意**，上图中的浏览器历史记录和本文说的 history 还不太同。

* `back()`

    在历史记录中后退

        history.back();

* `forward()`

    在历史记录中前进

        history.forward();

* `go()`

    移动到指定的历史记录点

        history.go(-1);

    通过指定一个相对于当前页面位置的数值，你可以使用go()方法从当前会话的历史记录中加载页面（当前页面位置索引值为0，上一页就是-1，下一页为1）。

    **go()不填参数或参数为go(0)时，页面会刷新，即`history.go()`或`history.go(0)`相当于`location.reload()`**

* `length`

    `length`为history的属性，显示history长度。

本节在线demo见：[History & pjax demo](http://gaohaoyang.github.io/history-pjax-demo/) 源代码：[]()

**经过亲自测试，`history`对象只记录同一个 tab 页内的历史。如果是在新窗口打开的，则无效。如：在a标签中添加`target="_blank"`，或按住`ctrl`点击，这类场景下，在新的tab页中，`history`对象也是新的。**

**且`history`对象记录的信息与是否同源也无关，所以唯一要满足的就是同一个标签页。**

### `pushState()`, `replaceState()`

HTML5 引进了`history.pushState()`方法和`history.replaceState()`方法，它们允许你逐条地添加和修改历史记录条目，能够在不加载新页面的情况下没改变浏览器的URL。这些方法可以协同`window.onpopstate`事件一起工作。

使用`history.pushState()`会改变`referrer`的值，而在你调用方法后创建的  XMLHttpRequest 对象会在 HTTP 请求头中使用这个值。`referrer的`值则是创建  XMLHttpRequest 对象时所处的窗口的 URL。

* `pushState(any data, string title, [string url])`

    第一个参数为`history`对象的`state`属性值，可以放任意数据，记录历史状态。第二个参数是新状态的标题，目前浏览器基本不支持。第三个参数为可选的相对url。

    执行`pushState`后，可以在不加载新页面的情况下，更改url。同时`history`栈中新增一条数据。

    例如，我们有这样一段代码：

        <button id="push1">pushState()</button>

        document.querySelector('#push1').addEventListener('click', function() {
            history.pushState('abc','pushStatePageTitle','pushState.html');
            document.querySelector('#length').innerHTML = history.length;//重新读取历史长度
        });

    当点击按钮的时候，页面不会刷新，但`url`地址的最后已经变为`pushState.html`。这一点非常像`hash`的作用，但比`hash`更优雅。


* `replaceState(any data, string title, [string url])`

    与`pushState()`类似，只是在`history`栈中不是新增记录，而是替换一条记录。

**需要注意的是：**`pushState()`和`replaceState()`方法存在安全方面的限制，本地测试是无效的，会报错，可以简单放到任何服务端测试，或者使用`http-server`开启简单服务器，通过访问`localhost`来查看效果。

本节demo见：[History & pjax demo - pushState](http://gaohaoyang.github.io/history-pjax-demo/index.html)

## pjax

现在再看本文一开始提出的问题，如何让前端优雅的控制 url，这里就可以考虑 pjax 技术了。我们把 pushState + ajax 进行封装，合起来简称为 pjax。虽然不是什么新的技术，但概念已然不同。

如果不使用 pjax。我们依然可以使用`hash`来实现文本开始的需求。但会不利于 SEO，看着也不够优雅。

Pjax的原理十分简单。

1. 拦截 a 标签的默认跳转动作或某些按钮的点击事件。
2. 使用 Ajax 请求新页面。
3. 将返回的 Html 替换到页面中。
4. 使用 HTML5 的`pushState()`修改Url。

个人理解3中也可以仅仅请求数据，再由浏览器渲染。

每当同一个文档的浏览历史（即history对象）出现变化时，会触发`window.onpopstate`事件。

    window.onpopstate = function(event) {
        console.log(event.state);
        console.log(location);
    };

这样在用户点击前进后退时也可以很好的监听url，来做相应的页面渲染。

若用户刷新了页面，但没有相应的页面资源，这时页面就会显示不存在。所以我认为较好的方法是在写`pushState()`第三个参数的时候，写为`?a=1`这样的参数形式。[History.js](https://github.com/browserstate/history.js) 也是这么写的。但是这样应该会多一次请求。也许使用 nodeJS 作为中间层会好一些吧。

对于上述的探索，不知道是不是我还不够深入，总觉得还是不够完美。

## 参考

* [MDN History](https://developer.mozilla.org/en-US/docs/Web/API/History)
* [MDN 操纵浏览器的历史记录](https://developer.mozilla.org/zh-CN/docs/DOM/Manipulating_the_browser_history)
* [pjax 是如何工作的？ 知乎](https://www.zhihu.com/question/20289254)
* [PJAX的实现与应用 小胡子哥](http://www.cnblogs.com/hustskyking/p/history-api-in-html5.html)
* [URL的井号-阮一峰](http://www.ruanyifeng.com/blog/2011/03/url_hash.html)
* [history对象 JavaScript 标准参考教程（alpha） 阮一峰](http://javascript.ruanyifeng.com/bom/history.html)
* [Pjax(pushState and Ajax) 黯羽轻扬](http://www.ayqy.net/blog/pjaxpushstate-and-ajax/)
* [操纵历史，利用HTML5 History API实现无刷新跳转 蓝飞](http://www.clanfei.com/2012/09/1646.html)
* [前端：将网站打造成单页面应用SPA（一） Coffce](http://segmentfault.com/a/1190000002920768)
* [coffce-pjax](https://github.com/Coffcer/coffce-pjax)
* [History.js](https://github.com/browserstate/history.js)
* [defunkt/jquery-pjax GitHub](https://github.com/defunkt/jquery-pjax)
* [welefen/pjax](https://github.com/welefen/pjax)
