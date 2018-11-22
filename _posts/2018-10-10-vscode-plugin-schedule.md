---
layout: post
title:  "vscode 插件 markdown-schedule-snippet"
categories: JavaScript
tags: 效率 vscode markdown
author: HyG
---

* content
{:toc}

## 起因

不知道大家是怎样安排自己的日常计划的，我习惯是建立一个仓库，按照年/周记录在 markdown 里，平时这个仓库也写点简单的 demo，目录类似如下：

``` bash
week
├── 2016
├── 2017
├── 2018
│   ├── 20180102.md
│   ├── 20180108.md
│   ├── 20180115.md
│   ├── 20180122.md
│   ├── 20180126.md
│   ├── ...
│   ├── ...
│   ├── ...
│   ├── 20181007.md
│   ├── pixi.md
│   ├── schedule.md
│   ├── temp.css
│   ├── temp.html
│   ├── temp.js
│   ├── temp.json
│   └── temp.md
├── package.json
└── yarn.lock
```





当然每个人有自己习惯的方式记录着日常工作与生活。我平时是使用这种方式，当然这个记录里涉及了很多工作上的信息，目前仅在内部的 gitlab 上托管着。

对于每一个 md 文件内部，我习惯按照星期几来记录，类似如下：

![](https://user-gold-cdn.xitu.io/2018/10/10/1665ccd109702abc?w=903&h=893&f=png&s=151884)

## markdown-schedule-snippet

可以看到每次写这些星期几的缩略都很麻烦，于是开发了一个简单的 vscode 插件 markdown-schedule-snippet，正是本文的标题，输入 `we` 自动生成如下代码

插件地址 [https://marketplace.visualstudio.com/items?itemName=HyG.schedule](https://marketplace.visualstudio.com/items?itemName=HyG.schedule)

``` markdown

## Mon.

## Tue.

## Wed.

## Thur.

## Fri.

## Sat.

## Sun.

```

还有我自己设计的 logo，哈哈哈


![](https://user-gold-cdn.xitu.io/2018/10/10/1665d564192bc6bb?w=256&h=256&f=png&s=51734)

这个插件仓库地址 [https://github.com/Gaohaoyang/markdown-schedule-snippet](https://github.com/Gaohaoyang/markdown-schedule-snippet)

欢迎大家使用，同时也欢迎小伙伴们为这个仓库贡献一些其他有趣的 markdown snippet，欢迎你的 pr。

Enjoy it!
