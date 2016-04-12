---
layout: post
title:  "百度Web前端技术学院(1)-HTML, CSS基础"
date:   2015-04-15 19:06:05
categories: HTML CSS
tags: Baidu ife HTML CSS task
---

* content
{:toc}

百度前端学院的第一次任务笔记，HTML、CSS 基础。主要有 CSS 工作原理，选择器的使用，常用属性，行高属性，盒模型与定位，最后根据设计图实现4个页面。




## 任务

**任务：** [HTML、CSS基础](https://github.com/Gaohaoyang/ife/tree/master/task/task0001)   

有人问到提交作业 fork 同步的问题，真心觉得官方 GitHub 的帮助文档讲的很好，我上一篇博客 [同步一个 fork](http://gaohaoyang.github.io/2015/04/12/Syncing-a-fork/) 就是翻译的这个官方文档，如果懒得看英文可以参考我的博客。   


写点东西记录一下我的做题过程吧。   


## CSS 如何工作

[CSS 如何工作](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_started/How_CSS_works) Mozilla 的开发者文档讲的很好。

> 浏览器在展现一个文档的时候，必须要把文档内容和相应的样式信息结合起来展示。 这个处理过程一般分两个阶段：   
>
> 1. 浏览器先将标记语言和 CSS 转换成 DOM (文档对象模型)结构。 这时 DOM 就代表了电脑内存中的相应文档，因为它已经融合了文档内容和相应的样式表。   
> 2. 最后浏览器把 DOM 的内容展示出来。   


## 层叠和继承

[参考资料: 层叠和继承](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_started/Cascading_and_inheritance)

> 对于层叠来说，共有三种主要的样式来源：
>
> * 浏览器对HTML定义的默认样式。
> * 用户定义的样式。
> * 开发者定义的样式，可以有三种形式：
>     
>    * 定义在外部文件（外链样式）：本教程中案例主要是通过这种形式定义样式。
>    * 在页面的头部定义（内联样式）：通过这种形式定义的样式只在本页面内生效。
>    * 定义在特定的元素身上（行内样式）：这种形式多用于测试，可维护性较差。
>
> 用户定义的样式表会覆盖浏览器定义的默认样式，然后网页开发者定义的样式又会覆盖用户样式。
>
> 再来看看优先级，从高到低依次为：网页开发者定义的样式、网页阅读者定义的样式、浏览器的默认样式。
>
> 对继承的元素来说，子元素自身的样式优先级高于从父级继承来的样式。
>
> > 更多细节   
> > CSS 另外提供了一个 !important 关键字，用户可以通过使用这个关键字使自己定义的样式覆盖掉开发者定义的样式。   
> > 这就意味着，作为开发者，你很难准确的预知页面最终在用户电脑上的显示效果。   


## 选择器

[参考资料:选择器（Selectors）](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Getting_Started/Selectors)


### 标签选择器


### 类选择器（Class selectors）

> 通过设置元素的 class 属性，可以为元素指定类名。类名由开发者自己指定。 文档中的多个元素可以拥有同一个类名。
>
> 在写样式表时，类选择器是以英文句号（.）开头的。


### ID选择器（ID selectors）

> 通过设置元素的 id 属性为该元素制定ID。ID名由开发者指定。每个ID在文档中必须是唯一的。
>
> 在写样式表时，ID选择器是以#开头的。


### 优先级

> * 如果多余一个规则指定了相同的属性值都应用到一个元素上，CSS规定拥有更高确定度的选择器优先级更高。ID选择器比类选择器更具确定度, 而类选择器比标签选择器（tag selector）更具确定度。
> * 如果样式中包含冲突的规则，且它们具有相同的确定度。那么，后出现的规则优先级高。
> * 如果你遇到规则冲突，你可以增加其中一条的确定度或将之移到后面以使它具有更高优先级。


### 伪类选择器（Pseudo-classes selectors）


### 基于关系的选择器

选择器    |选择的元素
A E    |任何是元素A的后代元素E (后代节点指A的子节点，子节点的子节点，以此类推)
A > E    |任何元素A的子元素
E:first-child    |任何元素的第一个子元素E
B + E    |任何元素B的下一个兄弟元素E


## 其他属性

### `text-indent`   

**定义和用法**   
text-indent 属性规定文本块中首行文本的缩进。   
注释：允许使用负值。如果使用负值，那么首行会被缩进到左边。   

**可能的值**    

值    |描述
length    |定义固定的缩进。默认值：0。
%    |定义基于父元素宽度的百分比的缩进。
inherit    |规定应该从父元素继承 text-indent 属性的值。


### `text-transform`   

**定义和用法**    
text-transform 属性控制文本的大小写。      

**说明**    
这个属性会改变元素中的字母大小写，而不论源文档中文本的大小写。如果值为 capitalize，则要对某些字母大写，但是并没有明确定义如何确定哪些字母要大写，这取决于用户代理如何识别出各个“词”。   

**可能的值**  

值    |描述
none    |默认。定义带有小写字母和大写字母的标准的文本。
capitalize    |文本中的每个单词以大写字母开头。
uppercase    |定义仅有大写字母。
lowercase    |定义无大写字母，仅有小写字母。
inherit    |规定应该从父元素继承 text-transform 属性的值。


### `text-decoration`

**定义和用法**   
text-decoration 属性规定添加到文本的修饰。    
注释：修饰的颜色由 "color" 属性设置。    
注释：IE、Chrome 或 Safari 不支持 "blink" 属性值。    

**说明**    
这个属性允许对文本设置某种效果，如加下划线。如果后代元素没有自己的装饰，祖先元素上设置的装饰会“延伸”到后代元素中。不要求用户代理支持 blink。


### `text-align`

**定义和用法**   
text-align 属性规定元素中的文本的水平对齐方式。   
该属性通过指定行框与哪个点对齐，从而设置块级元素内文本的水平对齐方式。通过允许用户代理调整行内容中字母和字之间的间隔，可以支持值 justify；不同用户代理可能会得到不同的结果。   

**可能的值**   

值    |描述
left    |把文本排列到左边。默认值：由浏览器决定。
right    |把文本排列到右边。
center    |把文本排列到中间。
justify    |实现两端对齐文本效果。
inherit    |规定应该从父元素继承 text-align 属性的值。


### `word-spacing`

**定义**   
word-spacing 属性增加或减少单词间的空白（即字间隔）。   
该属性定义元素中字之间插入多少空白符。针对这个属性，“字” 定义为由空白符包围的一个字符串。如果指定为长度值，会调整字之间的通常间隔；所以，normal 就等同于设置为 0。允许指定负长度值，这会让字之间挤得更紧。   
注释：允许使用负值。


### `white-space`

**定义和用法**   
white-space 属性设置如何处理元素内的空白。   
这个属性声明建立布局过程中如何处理元素中的空白符。值 pre-wrap 和 pre-line 是 CSS 2.1 中新增的。

**可能的值**

值    |描述
normal    |默认。空白会被浏览器忽略。
pre    |空白会被浏览器保留。其行为方式类似 HTML 中的 `<pre>` 标签。
nowrap    |文本不会换行，文本会在在同一行上继续，直到遇到 `<br>` 标签为止。
pre-wrap    |保留空白符序列，但是正常地进行换行。
pre-line    |合并空白符序列，但是保留换行符。
inherit    |规定应该从父元素继承 white-space 属性的值。


### `@font-face`

**CSS3 @font-face 规则**   
在 CSS3 之前，web 设计师必须使用已在用户计算机上安装好的字体。   
通过 CSS3，web 设计师可以使用他们喜欢的任意字体。   
当您您找到或购买到希望使用的字体时，可将该字体文件存放到 web 服务器上，它会在需要时被自动下载到用户的计算机上。   
您“自己的”的字体是在 CSS3 @font-face 规则中定义的。   

注释：Internet Explorer 8 以及更早的版本不支持新的 @font-face 规则。Internet Explorer 9+ 支持新的 @font-face 规则，但是仅支持 .eot 类型的字体 (Embedded OpenType)。

**使用您需要的字体**   
在新的 @font-face 规则中，您必须首先定义字体的名称（比如 myFirstFont），然后指向该字体文件。   
如需为 HTML 元素使用字体，请通过 font-family 属性来引用字体的名称 (myFirstFont)：

**实例**

```css
@font-face {
    font-family: myFirstFont;
    src: url('Sansation_Light.ttf'),
         url('Sansation_Light.eot'); /* IE9+ */
}
div {
    font-family: myFirstFont;
}
```

**CSS3 字体描述符**

下面的表格列出了能够在 @font-face 规则中定义的所有字体描述符：

描述符    |值    |描述
font-family    |name    |必需。规定字体的名称。
src    |URL    |必需。定义字体文件的 URL。
font-stretch    |normal<br>condensed<br>ultra-condensed<br>extra-condensed<br>semi-condensed<br>expanded<br>semi-expanded<br>extra-expanded<br>ultra-expanded|可选。定义如何拉伸字体。默认是 "normal"。
font-style|ormal<br>italic<br>oblique|可选。定义字体的样式。默认是 "normal"。
font-weight|normal<br>bold<br>100<br>200<br>300<br>400<br>500<br>600<br>700<br>800<br>900|选。定义字体的粗细。默认是 "normal"。
unicode-range    |unicode-range    |可选。定义字体支持的 UNICODE 字符范围。默认是 "U+0-10FFFF"。


## 深入了解行高属性

[参考：深入了解css的行高Line Height属性](http://www.cnblogs.com/fengzheng126/archive/2012/05/18/2507632.html)

一般来说，设置行高为`值：纯数字`是最理想的方式，因为其会随着对应的 `font-size` 而缩放。


## 盒模型及定位

### 已知宽度的div居中

* 用两种方法来实现一个背景色为红色、宽度为960px的<DIV>在浏览器中居中

我的方法一：

使用 `margin：0 auto;`

html文件

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <link rel="stylesheet" type="text/css" href="task0001-2.css">
    </head>
    <body>
        <div class="center">aaa</div>
    </body>
</html>
```

css文件

```css
.center {
    width: 960px;
    margin: 0 auto;
    background-color: red;
}
```

方法二：

绝对定位，左边距离 body 50%，`margin-left: -480px`

```css
.center {
    width: 960px;
    background-color: red;
    position: absolute;
    left: 50%;
    margin-left: -480px;
}
```

[Demo](http://gaohaoyang.github.io/baidu-ife-practice/task0001/task0001-2.html)

#### 对于居中的补充

参考自 [学习CSS布局](http://zh.learnlayout.com/)。

像下面这样写css代码，使用 `max-width` 替代 `width`  可以使浏览器更好地处理小窗口的情况。这点在移动设备上显得尤为重要。

有效的避免了如下问题：   
当浏览器窗口比元素的宽度还要窄时，浏览器会显示一个水平滚动条来容纳页面。

```css
#main {
    max-width: 600px;
    margin: 0 auto;
}
```

* [CSS布局奇淫技巧之--各种居中](http://www.cnblogs.com/2050/p/3392803.html)


### 早期css滑动门

* 有的圆角矩形是复杂图案，无法直接用border-radius，请在不使用 border-radius 的情况下实现一个可复用的高度和宽度都自适应的圆角矩形   
示例 ![圆角矩形](http://7q5cdt.com1.z0.glb.clouddn.com/Baidu-Front-end-task0001_7.png)

这道题我一开始不会做，查阅了资料，发现这就是所谓的 css 滑动门的应用。[妙味云课堂之css：滑动门、圆角、css精灵](http://www.bkjia.com/webzh/759711.html)   
使用三层嵌套，或者四层嵌套的 `div`，通过背景图定位等方式可以实现。


### 左侧固定右侧自适应宽度的两列布局

* 用两种不同的方法来实现一个两列布局，其中左侧部分宽度固定、右侧部分宽度随浏览器宽度的变化而自适应变化 ![pic](http://7q5cdt.com1.z0.glb.clouddn.com/Baidu-Front-end-task0001_3.jpg)

我的方法一：

不使用浮动，使用绝对定位，将左上角的块放好位置，右边的块设置`margin-left`

html 文件：

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>layout</title>
        <link rel="stylesheet" type="text/css" href="task0001-6-3.css">
    </head>
    <body>
        <div class="row">
            <div class="left">DIV-A</div>
            <div class="right">DIV-B</div>
        </div>
        <div class="bottom">DIV-C</div>
    </body>
</html>
```

css 文件：

```css
.row {
    position: relative;
}
.left {
    width: 100px;
    height: 100px;
    background-color: red;
    position: absolute;
    top: 0;
    left: 0;
}
.right {
    height: 100px;
    background-color: blue;
    margin-left: 100px;
}
.bottom {
    height: 100px;
    background-color: yellow;
}
```

方法二：   

使用浮动，左边的块使用浮动，右边的块使用`margin-left`

```css
.left {
    width: 100px;
    height: 100px;
    background-color: red;
    float: left;
}
.right {
    height: 100px;
    background-color: blue;
    margin-left: 100px;
}
.bottom {
    height: 100px;
    background-color: yellow;
}
```

[Demo](http://gaohaoyang.github.io/baidu-ife-practice/task0001/task0001-6-3.html)


**补充：**

看完了后面的 BFC 之后，本题和下一题都可以用另一种方法了
总之我已经震惊了！太爽了！有没有！

html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>使用 BFC 进行两列布局</title>
        <link rel="stylesheet" href="two-col-layout-with-BFC.css">
    </head>
    <body>
        <div class="left">DIV-A</div>
        <div class="right">DIV-B</div>
        <div class="bottom">DIV-C</div>
    </body>
</html>
```

css

```css
.left{
    width: 100px;
    height: 100px;
    background-color: blue;
    float: left;
}
.right{
    height: 100px;
    background-color: yellow;
    overflow: hidden;
}
.bottom{
    height: 100px;
    background-color: red;
}
```

[Demo](http://gaohaoyang.github.io/baidu-ife-practice/task0001/two-col-layout-with-BFC.html)


### 双飞翼布局

* 用两种不同的方式来实现一个三列布局，其中左侧和右侧的部分宽度固定，中间部分宽度随浏览器宽度的变化而自适应变化

原题中参考资料 [双飞翼布局](http://www.imooc.com/wenda/detail/254035)   

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Flying Swing Layout</title>
        <link rel="stylesheet" type="text/css" href="task0001-6-4.css">
    </head>
    <body>
        <div class="bd">
            <div class="main">
                <div class="main-wrap">
                    <p>Flying Swing Layout</p>
                </div>
            </div>
            <div class="sub">
                <p>Flying Swing Layout</p>
                left
            </div>
            <div class="extra">
                <p>Flying Swing Layout</p>
                right
            </div>
        </div>
    </body>
</html>
```

css

```css
.bd {

    /*padding: 0 190px;*/
}
.main {
    float: left;
    width: 100%;
    background-color: #aaa;
}
.main-wrap {
    margin: 0 190px;
}
.sub {
    float: left;
    width: 190px;
    margin-left: -100%;
    background-color: blue;        
    /*position: relative;
    left: -190px;*/
}
.extra {
    float: left;
    width: 190px;
    margin-left: -190px;
    background-color: yellow;        
    /*position: relative;
    right: -190px;*/
}
```

[Demo](http://gaohaoyang.github.io/baidu-ife-practice/task0001/task0001-6-4.html)


**补充：**

使用 BFC 的另一种方法，我再一次震惊！

代码超级简单！

html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>flying-Swing-BFC</title>
        <link rel="stylesheet" href="flying-Swing-BFC.css">
    </head>
    <body>
        <div class="left">left</div>
        <div class="right">right</div>
        <div class="main">
            flying-Swing-BFC.htmlflying-Swing-BFC.htmlflying-Swing-BFC.htmlflying-Swing-BFC.htmlflying-Swing-BFC.htmlflying-Swing-BFC.htmlflying-Swing-BFC.htmlflying-Swing-BFC.htmlflying-Swing-BFC.htmlflying-Swing-BFC.htmlflying-Swing-BFC.html
        </div>
        <div class="footer">
            footerfooterfooterfooterfooterfooterfooterfooterfooter
        </div>
    </body>
</html>
```

css

```css
.left{
    width: 100px;
    background-color: red;
    float: left;
}
.right{
    width: 200px;
    background-color: blue;
    float: right;
}
.main{
    background-color: #eee;
    overflow: hidden;
}
```
[Demo](http://gaohaoyang.github.io/baidu-ife-practice/task0001/flying-Swing-BFC.html)


### 浮动布局

* 实现一个浮动布局，红色容器中每一行的蓝色容器数量随着浏览器宽度的变化而变化 ![pic](http://7q5cdt.com1.z0.glb.clouddn.com/Baidu-Front-end-task0001_4.jpg)![pic](http://7q5cdt.com1.z0.glb.clouddn.com/Baidu-Front-end-task0001_5.jpg)

这个题我觉的直接将每一个块浮动起来就好了，不知我理解的对不对。

html文件

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <link rel="stylesheet" type="text/css" href="task0001-6-5.css">
    </head>
    <body>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </body>
</html>
```

css文件

```css
body {
    background-color: red;
}
div {
    width: 150px;
    height: 100px;
    margin: 10px;
    float: left;
    background-color: blue;
}
```

[Demo](file:///E:/GitWorkSpace/baidu-ife-practice/task0001/task0001-6-5.html)


### 清除浮动/闭合浮动

参考自 [那些年我们一起清除过的浮动 by 一丝冰凉](http://www.iyunlu.com/view/css-xhtml/55.html)

1. 清除浮动：清除对应的单词是 clear，对应CSS中的属性是 clear：left \| right \| both \| none；
2. 闭合浮动：更确切的含义是使浮动元素闭合，从而减少浮动带来的影响。

我们想要达到的效果更确切地说是闭合浮动，而不是单纯的清除浮动，设置clear：both清除浮动并不能解决warp高度塌陷的问题。

正是因为浮动的这种特性，导致本属于普通流中的元素浮动之后，包含框内部由于不存在其他普通流元素了，也就表现出高度为0（**高度塌陷**）。在实际布局中，往往这并不是我们所希望的，所以需要闭合浮动元素，使其包含框表现出正常的高度。

最后一丝姐给了两个精益求精方案，我觉得方案一更易于理解，这里实践一下：

[闭合浮动的Demo](http://gaohaoyang.github.io/baidu-ife-practice/task0001/close-float.html)

下面是源码

html

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>Document</title>
        <link rel="stylesheet" href="close-float.css">
    </head>
    <body>
        <div class="row clearfix">
            <div class="left">
                <h1>left</h1>
                <div>Content or Something</div>
            </div>
            <div class="right">right</div>
        </div>
        <div class="row2">Row2</div>
    </body>
</html>
```

css

```css
.row {
    border: 1px solid red;
}
.clearfix:after {
    content: "\200B";
    display: block;
    height: 0;
    clear: both;
}
.clearfix {
    *zoom: 1;
}
.left {
    width: 200px;
    float: left;
    background-color: #eee;
}
.right {
    width: 200px;
    float: right;
    background-color: #eee;
}
.row2 {
    width: 600px;
    height: 50px;
    background-color: #aaa;
}
```

其中`*zoom: 1`是为了触发`hasLayout`


还有另一种解决方案！

参考自：[清除浮动（clearfix hack）](http://zh.learnlayout.com/clearfix.html)

直接使用，如下代码即可

```css
.clearfix{
    overflow: auto;
    zoom: 1;
}
```

[Demo](http://gaohaoyang.github.io/baidu-ife-practice/task0001/close-float-2.html)

(实际上，我看完后面的资料，再翻到这里就明白了！正是使用了BFC原理！！！！！！！)


**但是今天遇到一个坑！**

如果使用了 `over-flow`，在后面如果有元素要绝对布局在父元素的外面的，意思就是出现 `top`, `bottom`, `left`, `right` 的值为负值时，就会出现看不到，或者滚动条的问题！

若是有这种要求，我觉得还是用一丝姐姐的解决方案比较好。

**参考**

* [清除浮动的几种方法](http://zfengqi.me/?p=87)


### `box-sizing`

当你设置一个元素为 `box-sizing: border-box;` 时，此元素的内边距和边框不再会增加它的宽度。

他们的内边距和边框都是向内的挤压的。支持IE8+，需要加浏览器内核。

```css
.simple {
    width: 500px;
    margin: 20px auto;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
}
```


### 响应式布局

媒体查询

* [MDN CSS媒体查询](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Media_queries)
* [媒体查询-学习CSS布局](http://zh.learnlayout.com/media-queries.html)

    `@media screen and (min-width: 500px) and (max-width: 800px) { ... }`

* [An Introduction to Meta Viewport and @viewport](https://dev.opera.com/articles/an-introduction-to-meta-viewport-and-viewport/)


### 多列布局

* [column](http://zh.learnlayout.com/column.html)


### BFC 和 IE 的 hasLayout

* [BFC和IE的hasLayout](http://www.cnblogs.com/pigtail/archive/2013/01/23/2871627.html)
* [Block Formatting Context 的几大用处](http://outofmemory.cn/wr/?u=http%3A%2F%2Fkkeys.me%2Fpost%2F68547473290)

看完这个资料后我震惊了！竟然可以这么玩儿！   
我将本文之前提到的两列布局，双飞翼布局又重新写了一遍！太爽了！代码超级简洁！

**Block Formatting Context 的几大用处：**

1. 防止 margin 折叠
1. 清除float
1. 不会环绕float元素

相关资料

* [视觉格式化模型(visual formatting model)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Visual_formatting_model)
* [块格式化上下文(block formatting context)](https://developer.mozilla.org/zh-CN/docs/Web/CSS/Block_formatting_context)


### `div` 三列等高

[纯CSS实现三列DIV等高布局](http://show.sysu.edu.cn/?action-blogdetail-uid-2383-id-5040)

最关键的地方有3句：

最外层div设置一个溢出隐藏

```css
#wrap {
    overflow:hidden;
}
```

每一个子块设置 padding 和 margin

```css
#left,#center,#right{
    margin-bottom:-10000px;
    padding-bottom:10000px;
}
```

overflow:hidden;    '隐藏溢出。如果内容溢出wrap层，则不显示。

margin-bottom:-10000px;    '底部边距-10000px。   
padding-bottom:10000px;    '底部填充10000px。   
上面这两句能够实现的效果就是，产生10000px的填充，然后用负的边距把它给抵销掉。


### 去除inline-block元素间间距

一开始我不知道是因为使用了 `display: inline-block` 会有间距。后来查找资料找到了相关的方案。

* [去除inline-block元素间间距的N种方法](http://www.zhangxinxu.com/wordpress/2012/04/inline-block-space-remove-%E5%8E%BB%E9%99%A4%E9%97%B4%E8%B7%9D/)
* [Fighting the Space Between Inline Block Elements](https://css-tricks.com/fighting-the-space-between-inline-block-elements/)

真正意义上的inline-block水平呈现的元素间，换行显示或空格分隔的情况下会有间距。   
这种表现是符合规范的应该有的表现。

解决方法有很多，上述博文中提到的有：

1. 移除空格
2. 使用 `margin` 负值
3. 取消闭合标签
4. 使用 `font-size: 0`
5. 使用 `letter-spacing`
6. 使用 `word-spacing`
7. 其他

我觉得使用 4 `font-size: 0` 比较好，对别的元素影响最小。代码如下：在 `a` 的外层将字体尺寸设为 0，载对内层的 `a` 重新设置字体大小，即可。

```css
nav {
    font-size: 0;
}
nav a {
    font-size: 16px;
}
```


## 最终作品

* [在线Demo](http://gaohaoyang.github.io/ife/task/task0001/work/Gaohaoyang/index.html)
* [源代码](https://github.com/Gaohaoyang/ife/tree/master/task/task0001/work/Gaohaoyang)


## 参考资料

* [HTML、CSS的代码规范](https://github.com/ecomfe/spec) 自己要试着改变一些代码风格了，规范化！  
* [顾轶灵:Web语义化](http://www.zhihu.com/question/20455165)   
我看他回答最后的举例的Sildes做的非常好，可以经常看看。[Semantic HTML](http://justineo.github.io/slideshows/semantic-html/)。他的其他Slides也做的非常好，很喜欢这种风格！
* [CSS命名规范@W3C Funs](http://www.w3cfuns.com/blog-5445898-5398950.html) 起名不再困难！
* [点击阅读: CSS浏览器兼容性列表-维基百科](点击阅读: CSS浏览器兼容性列表) 类似的我想到了 [Can I Use](http://caniuse.com/)，Can I Use 包含的更多，包括 HTML5, CSS SVG, JS API 等。


* [学习CSS布局](http://zh.learnlayout.com/)
* [Media Queries](http://mediaqueri.es/)
* [使用CSS渐变](https://developer.mozilla.org/zh-CN/docs/Web/Guide/CSS/Using_CSS_gradients)
* [CSS3 Gradient](http://www.w3cplus.com/content/css3-gradient)
* [CSS渐变生成器](http://www.colorzilla.com/gradient-editor/)
