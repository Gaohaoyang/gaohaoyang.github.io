---
layout: post
title:  "如何使用 babel"
categories: JavaScript
tags:  ES2015 ES6 ES5 babel 
---

* content
{:toc}

[Babel](https://babeljs.io/) 用于将 ES6 的代码转化为 ES5，使得 ES6 可以在目前的浏览器环境下使用。学习使用 babel 是为了使用 ES2015 做准备。本文将介绍如何使用 babel，以及一些相关的配置。




![](https://babeljs.io/images/logo.svg)

学习 Babel 可以通过其手册 Babel handbook。

* [babel-handbook](https://github.com/thejameskyle/babel-handbook)

其中包含多语言版本，分为[用户手册](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/user-handbook.md)和[插件手册](https://github.com/thejameskyle/babel-handbook/blob/master/translations/zh-Hans/plugin-handbook.md)。这是一个很好的学习 Babel 的资料。

## babel-cli

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

但这很麻烦，并且并不是一个很好的解决方案，请看下一节项目内运行 babel-cli。

## 在项目内运行 babel-cli

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

此时在终端里运行

```sh
npm run build
```

还不能成功编译，因为没有配置`.babelrc`文件。

## 配置`.babelrc`

通过配置`.babelrc`来告诉 babel 来做什么。

在项目的根路径下创建`.babelrc`文件。然后输入以下内容作为开始：

```json
{
    "presets": [],
    "plugins": []
}
```

为了让 babel 将 ES2015 转化为 ES5，我们要安装如下：

```sh
npm install --save-dev babel-preset-es2015
```

安装完成后在`.babelrc`中添加参数：

```diff
{
    "presets": [
+       "es2015"
    ],
    "plugins": []
}
```

现在在项目`src/main.js`中写一些 ES2015 的代码试试吧。

```js
let a = 1
```

在终端中输入命令

```sh
npm run build
```

执行后终端中显示：

```
> learn-es6@1.0.0 build c:\gitWorkSpace\learn-es6
> babel src -d lib
```

然后可以看到目录中出现了`lib/main.js`

```js
"use strict";

var a = 1;
```

即编译成功。

## 配置`.jshintrc`

若编辑器中安装了 jshint 语法检查的插件。默认对于 ES2015 的代码可能会报错或者警告，看着可能会不爽。我们可以在配置文件中将它设置为允许 ES2015 的模式。

在项目根目录下创建文件`.jshintrc`。内容如下：

```json
{
    "asi": true,
    "esversion": 2015
}
```

上述文件我分别设置了，使用无分号模式，es 版本使用 2015。

关于`.jshintrc`的更详细配置可以参见官方示例：[https://github.com/jshint/jshint/blob/master/examples/.jshintrc](https://github.com/jshint/jshint/blob/master/examples/.jshintrc)

好，babel 就说到这里，下面开始进入真正的 ES2015 的学习！
