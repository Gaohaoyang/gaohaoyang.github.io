---
layout: post
title:  "代码校验工具 SublimeLinter 的安装与使用"
date:   2015-03-26 15:14:54
categories: Sublime
excerpt: 代码校验工具sublimeLinter的安装与使用，JSLinter的安装与使用
---

## 序   

本文我将讲述一下 SublimeLinter 的安装过程，以及其组件 JSHint 的安装于使用。   
我将基于 [Sublime Text 3](http://sublimetext.com/3) 来安装。   
使用 Sublime Text 2 的用户阅读本文是没有帮助的。   

SublimeLinter 是 Sublime 的插件，它的作用是检查代码语法是否有错误，并提示。习惯了 IDE 下写代码的人一定需要一款在 Sublime 上类似的语法检查工具。下面我们开始。   

---

## 安装 SublimeLinter   

如同其他插件一样使用 Package Control 来安装。   
按下 `Ctrl+Shift+p` 进入 Command Palette   
输入`install`进入 Package Control: Install Package   
输入`SublimeLinter`。进行安装.   

![SublimeLinter](http://7q5cdt.com1.z0.glb.clouddn.com/SublimeLinter-sublimeLinter.jpg)   

安装完成后可以看到这样一段话：   

<pre><code class="markdown">Welcome to SublimeLinter, a linter framework for Sublime Text 3.
 
                  * * * IMPORTANT! * * *

         SublimeLinter 3 is NOT a drop-in replacement for
        earlier versions.

         Linters *NOT* included with SublimeLinter 3, 
         they must be installed separately.
 
         The settings are different.
 
                 * * * READ THE DOCS! * * *
 
 Otherwise you will never know how to install linters, nor will
 you know about all of the great new features in SublimeLinter 3.
 
 For complete documentation on how to install and use SublimeLinter,
 please see:
 
 http://www.sublimelinter.com</code></pre>   

可以看到具体的 Linters 组件**不**被包含在 SublimeLinter 3 中，所以我们要额外独立安装组件。   
可以针对不同的语言安装不同的组件。   

---

## 安装 SublimeLinter-jshint   

为了让 JavaScript 代码有语法检查，我们安装 SublimeLinter-jshint   
同样的方法，我们安装 SublimeLinter-jshint 如下图   

![SublimeLinter-jshint](http://7q5cdt.com1.z0.glb.clouddn.com/SublimeLinter-jshint.jpg)   

安装完成后我们可以看到下面的一段话   

<pre><code class="markdown">SublimeLinter-jshint
  -------------------------------
  This linter plugin for SublimeLinter provides an interface to jshint.
  
  ** IMPORTANT! **
  
  Before this plugin will activate, you *must*
  follow the installation instructions here:
  
  https://github.com/SublimeLinter/SublimeLinter-jshint
</code></pre>

在插件开始工作之前，我们必须再看一下上述插件的[安装说明](https://github.com/SublimeLinter/SublimeLinter-jshint)   
通过 [SublimeLinter-jshint 的说明](https://github.com/SublimeLinter/SublimeLinter-jshint) 我们可以看到，这个组件依赖于 nodeJS 下的 jshint，所以我们安装 nodeJS 环境和 nodeJS 下的 jshint。   

1. 安装 [Node.js](https://nodejs.org/)   
2. 通过 npm 安装`jshint`   

在命令行下输入如下代码，完成安装   

	npm install -g jshint

安装完成后命令行中出现如下的信息   

	C:\Users\Administrator\AppData\Roaming\npm\jshint -> C:\Users\Administrator\AppData\Roaming\npm\node_modules\jshint\bin\jshint
	jshint@2.6.3 C:\Users\Administrator\AppData\Roaming\npm\node_modules\jshint
	├── strip-json-comments@1.0.2
	├── underscore@1.6.0
	├── exit@0.1.2
	├── shelljs@0.3.0
	├── console-browserify@1.1.0 (date-now@0.1.4)
	├── htmlparser2@3.8.2 (domelementtype@1.3.0, entities@1.0.0, domhandler@2.3.0, readable-stream@1.1.13, domutils@1.5.1)
	├── minimatch@1.0.0 (sigmund@1.0.0, lru-cache@2.5.0)
	└── cli@0.6.6 (glob@3.2.11)

可以查看 jshint 版本，已确认安装完成。  

	C:\Users\Administrator>jshint -v
	jshint v2.6.3

现在，恭喜你，我们使用 Sublime 编辑 JavaScript 文件，就会有语法检查了！   

在编辑过程中，会有如下提示   

![SublimeLinter-jshint-test](http://7q5cdt.com1.z0.glb.clouddn.com/SublimeLinter-jshint-test.jpg)

点击提示点后，Sublime 状态栏也会有相应的说明   

![SublimeLinter-jshint-test2](http://7q5cdt.com1.z0.glb.clouddn.com/SublimeLinter-jshint-test2.jpg)
