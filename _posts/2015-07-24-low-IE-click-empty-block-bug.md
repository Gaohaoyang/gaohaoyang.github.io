---
layout: post
title:  "在低版本 IE 中点击空 block 元素的问题"
date:   2015-07-24 00:06:05
categories: CSS
tags: IE CSS 兼容性 HTML
---

* content
{:toc}

## 问题描述

当我们点击一个空的、没有任何内容的 div 或者其他块级元素时。在 IE11 以下，是没有反应的。





## 使用场景

这类问题使用场景还是很普遍的。比如 UI 给了一张大图，要点击图上的某一块位置的时候。可以用一个空的 div 定位到相应的位置，然后对它进行绑定事件。

---

## 解决办法

解决方法很简单，即给这个块级元素填充任意颜色，然后将其透明度设置为0。代码如下：

    background-color: #fff;
    opacity: 0;
    filter:alpha(opacity=0);
