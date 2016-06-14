---
layout: post
title:  "ES2015学习笔记1-babel、let和const、变量解构赋值、字符串、正则、数值"
categories: JavaScript
tags:  ES2015
---

* content
{:toc}

新的框架都支持 ES2015 了，虽然浏览器不支持部分语法，但是有 Babel 这个神器，ES2015 的普及大势所趋。更优雅地写代码，对技术的追求是一件很有意思的事情！




## Babel

[Babel](https://babeljs.io/) 用于将 ES6 的代码转化为 ES5，使得在目前的浏览器环境下使用。

![](https://babeljs.io/images/logo.svg)

学习 Babel 可以通过其手册 Babel handbook。

* [babel-handbook](https://github.com/thejameskyle/babel-handbook)

其中包含多语言版本，分为[用户手册](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md)和[插件手册](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)。这是一个很好的学习 Babel 的资料。

### babel-cli

在 node 和 npm 环境安装好的前提下，安装 babel，如下：

```sh
npm install --global babel-cli
```

安装完成后就可以编译文件了。

```sh
babel main.js
```

编译后的文件显示在终端上，可以添加其他命令让它输出到指定文件下：

```sh
babel example.js --out-file compiled.js
或
babel example.js -o compiled.js
```

或将整个目录编译成一个新的目录：

```sh
babel src --out-dir lib
或
babel src -d lib
```

### 在项目内运行 babel-cli

初始化项目

```sh
npm init
```

再安装 babel-cli

```sh
npm install --save-dev babel-cli
```

项目中的`package.json`应该包含如下内容：

```json
{
  "name": "learn-es6",
  "version": "1.0.0",
  "devDependencies": {
    "babel-cli": "^6.10.1"
  }
}
```

添加 npm scripts 命令。

```diff
{
  "name": "learn-es6",
  "version": "1.0.0",
+   "scripts": {
+     "build": "babel src -d lib"
+   },
  "devDependencies": {
    "babel-cli": "^6.10.1"
  }
}
```

### 配置`.babelrc`

## let和const

## 变量解构赋值

##字符串

##正则

##数值
