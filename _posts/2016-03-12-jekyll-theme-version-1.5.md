---
layout: post
title:  "对这个博客主题的改版和重构"
date:   2016-03-12 11:40:18 +0800
categories: jekyll
tags: jekyll 端口 markdown Foxit
author: Haoyang Gao
---

* content
{:toc}

本文主要说明对这个博客主题的改版和代码重构的过程。这个简洁高雅的博客主题受到了很多朋友的喜欢。在写第一版界面时，我对前端并不是很熟悉，对`Jekyll`也不熟悉。现在距离当时也一年了，对自己当时写的代码也不太满意了，做一下代码重构和改版吧。

主要想做这些事情有：添加归档，添加标签，添加分类页面，主页显示文章摘要，代码去除 jQuery 和 BootStrap，优化移动端显示，将所有变量写入配置文件`_config.yml`中等。再优化一些细节吧。希望更多人会喜欢。






## 二级标题

### 三级标题

#### 四级标题

##### 五级标题

###### 六级标题

afsdddddddddddddddddddddddddddddddddddddddddddd








* 列表
* 而
* 阿斯顿发生地方

1. 有序列表
2. 阿斯顿发生地方
1. 阿斯顿发生地方

> 引用sdafsadfasdf
> afsdkhljksdhlfjkahsdljkfh

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned | $1600 |
| col 2 is      | centered      |   $12 |
| zebra stripes | are neat      |    $1 |

```js
var aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa = 166666666666fffffffffffffffffffffffffffffffffffffff66666660;
```

    代码吗？阿斯顿发生地方
    sdfsdfdsfsdsdfsdf

---


## 改版重构说明

* 使用 GitHub 风格的代码块 Markdown 写法 (Fenced code blocks)。即 GFM(github flavored markdown) 的方式。

    Jekyll 已经升级至 3.1.2（2016-03），其中有一些新的要注意的地方，比如官网上说使用了 `Rouge` 去做代码高亮而不是默认的 `Pygments`，因为 `Jekyll` 本身是基于 Ruby 的，因此我看到官方说希望不再使用基于 Python 的 `Pygments` 了，而是都使用基于 Ruby 的代码。详情见官网升级说明 [syntax-highlighter-changed](https://jekyllrb.com/docs/upgrading/2-to-3/#syntax-highlighter-changed)。
* 添加归档
* 添加标签
* 添加分类页



## 被 Foxit pdf reader 占用4000端口

### 错误呈现

在本地使用命令

```
jekyll serve
```

出现错误，如下

```
jekyll serve
Configuration file: E:/GitWorkSpace/blog/_config.yml
           Source: E:/GitWorkSpace/blog
      Destination: E:/GitWorkSpace/blog/_site
Incremental build: disabled. Enable with --incremental
     Generating...
                   done in 0.547 seconds.
 Please add the following to your Gemfile to avoid polling for changes:
   gem 'wdm', '>= 0.1.0' if Gem.win_platform?
Auto-regeneration: enabled for 'E:/GitWorkSpace/blog'
Configuration file: E:/GitWorkSpace/blog/_config.yml
jekyll 3.1.1 | Error:  Permission denied - bind(2) for 127.0.0.1:4000
```

网上查阅后，这篇博文解决了我的问题。[谁占了我的端口 for Windows --By Liu Xia, ThoughtWorks Senior Consultant. .NET Expert](http://lxconan.github.io/2016/01/07/who-is-using-my-port/)

上述报错主要原因是，jekyll 启动使用的4000端口被福昕pdf阅读器的自动更新进程占用了，关掉这个进程，jekyll在本地调试启动服务时就没有问题了。

### 解决方法

简单的解决方法是：

输入命令，查看各端口被占用情况

```
netstat -ano
```

找到4000端口被占用的`PID`

我的结果如下：

```
协议  本地地址          外部地址          状态           PID
TCP  0.0.0.0:80        0.0.0.0:0         LISTENING     4
TCP  0.0.0.0:135       0.0.0.0:0         LISTENING     836
TCP  0.0.0.0:445       0.0.0.0:0         LISTENING     4
TCP  0.0.0.0:1801      0.0.0.0:0         LISTENING     2312
TCP  0.0.0.0:2103      0.0.0.0:0         LISTENING     2312
TCP  0.0.0.0:2105      0.0.0.0:0         LISTENING     2312
TCP  0.0.0.0:2107      0.0.0.0:0         LISTENING     2312
TCP  0.0.0.0:3306      0.0.0.0:0         LISTENING     2404
TCP  0.0.0.0:3389      0.0.0.0:0         LISTENING     1172
TCP  0.0.0.0:49664     0.0.0.0:0         LISTENING     584
TCP  0.0.0.0:49665     0.0.0.0:0         LISTENING     1072
TCP  0.0.0.0:49666     0.0.0.0:0         LISTENING     460
TCP  0.0.0.0:49667     0.0.0.0:0         LISTENING     1000
TCP  0.0.0.0:49670     0.0.0.0:0         LISTENING     696
TCP  0.0.0.0:49678     0.0.0.0:0         LISTENING     2312
TCP  0.0.0.0:49692     0.0.0.0:0         LISTENING     688
TCP  127.0.0.1:4000    0.0.0.0:0         LISTENING     2476
TCP  127.0.0.1:4000    127.0.0.1:55160   ESTABLISHED   2476
TCP  127.0.0.1:4012    0.0.0.0:0         LISTENING     12724
```

可以看到4000端口的PID是2476。下面查看是什么进程，命令行中输入：

```
tasklist /svc /FI "PID eq 2476"
```

得到结果：

```
映像名称                       PID 服务
========================= ======== ============================================
FoxitProtect.exe              2476 FxService
```

可以看到正是福昕阅读器。下面关掉这个服务就好了。在 win10 中进入任务管理器，选择服务选项卡，关闭这个服务就好了，如下图：

![](http://ww4.sinaimg.cn/large/7011d6cfjw1f1ty28wwj4j20g00aiju7.jpg)

当然也可以在启动jekyll服务的时候指定端口号，如下：

```
jekyll serve --port 3000
```

这样在浏览器中输入 http://localhost:3000/ 就可以访问了。

还可以在配置文件`_config.yml`中添加端口号设置（参考[官网文档-Serve Command OptionsPermalink](https://jekyllrb.com/docs/configuration/#serve-command-options)），如下：

```
# port
port: 1234
```

此时，启动jekyll服务后，访问 http://localhost:1234/ 即可
