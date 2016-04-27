---
layout: post
title:  "对这个 jekyll 博客主题的改版和重构"
date:   2016-03-12 11:40:18 +0800
categories: jekyll
tags: jekyll 端口 markdown Foxit RubyGems HTML CSS
author: Haoyang Gao
---

* content
{:toc}

本文主要说明对这个博客主题的改版和代码重构的过程。这个简洁高雅的博客主题受到了很多朋友的喜欢。在写第一版界面时，我对前端并不是很熟悉，对`Jekyll`也不熟悉。现在距离当时也一年了，对自己当时写的代码也不太满意了，同时`Jekyll`如今也已经升级了，目前最新版为3.1.2。因此我在临近毕业尚未入职前做一下博客主题的代码重构和改版吧。

主要想做这些事情有：添加归档，添加标签，添加分类页面，主页显示文章摘要，代码去除 jQuery 和 BootStrap，优化移动端显示，将所有变量写入配置文件`_config.yml`中等。再优化一些细节吧。希望更多人会喜欢。






## 改版重构说明

* **使用 GitHub 风格的代码块 Markdown 写法 (Fenced code blocks)。**

    即 GFM(github flavored markdown) 的方式。

    Jekyll 已经升级至 3.1.2（2016-03），其中有一些新的要注意的地方，比如官网上说使用了 `Rouge` 去做代码高亮而不是默认的 `Pygments`，因为 `Jekyll` 本身是基于 Ruby 的，因此我看到官方说希望不再使用基于 Python 的 `Pygments` 了，而是都使用基于 Ruby 的代码。详情见官网升级说明 [syntax-highlighter-changed](https://jekyllrb.com/docs/upgrading/2-to-3/#syntax-highlighter-changed)。
* **首页中添加摘要**

    摘要可以在每一篇 md 文件头中使用 excerpt 属性写出来。也可以在正文中，4个换行符来分割，这个设置见配置文件`_config.yml`。
* **添加归档**

    上一版中没有归档，现在专门做了一个归档页面，当文章很多时方便根据年份快速查阅。
* **添加标签**

    标签还是很有必要添加的，上一版中也没有这个功能。现在也可以根据标签查找文章了。同时标签还有一个重要的作用是，用来获取相似文章的。
* **添加分类页**

    之前的分类就是在首页中直接完成的，现在和标签和归档类似，我将分类单独制作为一页，方便查阅。
* **去掉 jQuery 和 BootStrap**

    我觉得太重了，没必要使用这两个库，使用原生 JavaScript 和 CSS就可以做到一样的效果，代码量大大减轻，载入速度略有提高。

* **重写了demo页的瀑布流布局**

    改变数据写死的方式，将数据用 json 格式录入，由 JavaScript 拼接为 HTML 代码。同时，使用 [Masonry](http://masonry.desandro.com/)，重写了瀑布流布局。

* **简化评论配置，支持 多说 和 disqus**

    在`_config.yml`中评论配置直接添加自己的`short_name`，评论就能正常使用了。

下面列举一些可能遇到的问题，至少我是遇到了：

## RubyGems 无法访问，SSL 证书问题

以前我使用的是 RubyGems 的淘宝镜像[https://ruby.taobao.org/](https://ruby.taobao.org/)。现在这个镜像已经不再维护了，作者 [huacnlee (李华顺)](https://ruby-china.org/huacnlee) 转到 [Ruby China](https://ruby-china.org/) 中继续维护了，详情见 [RubyGems 镜像- Ruby China](https://gems.ruby-china.org/)。

### 错误呈现

在执行任何`gem`命令的时候出现以下错误：

```
ERROR:  While executing gem ... (Gem::RemoteFetcher::FetchError)
    SSL_connect returned=1 errno=0 state=SSLv3 read server certificate B: certificate verify failed (https://gems.ruby-china.org/specs.4.8.gz)
```

### 解决方法

根据 [https://gems.ruby-china.org/](https://gems.ruby-china.org/) 页面最下方提供的 GitHub Issue 地址。

可以进入这个 issue：[https://github.com/ruby-china/rubygems-mirror/issues/3](https://github.com/ruby-china/rubygems-mirror/issues/3)

其中 sanlengjingvv 给出了一个链接地址 [https://gist.github.com/fnichol/867550](https://gist.github.com/fnichol/867550) 里面提供了方法。我就是采用这里面的方法解决的。

我使用的是 [The Manual Way](https://gist.github.com/fnichol/867550#the-manual-way-boring)，因为 [The Ruby Way](https://gist.github.com/fnichol/867550#the-ruby-way-fun) 我没有成功，不知道什么原因，有兴趣的朋友可以试试。下面说说我的具体操作吧。

首先从 [https://curl.haxx.se/ca/cacert.pem](https://curl.haxx.se/ca/cacert.pem) 将文件`cacert.pem`下载至 `C:\RailsInstaller\cacert.pem`

然后执行

```
set SSL_CERT_FILE=C:\RailsInstaller\cacert.pem
```

就成功了，不会再出现 SSL 错误了。

最后原文中说，为了长久设置，将这个目录存入控制面板中。我没理解是什么意思，是指环境变量吗？有朋友知道的话，欢迎留言告知我。

我存入环境变量后，还是会出现 SSL 错误，这时再次执行上面那条命令即可。

## jekyll-paginate 依赖缺失

因为 jekyll 3 中默认安装已经没有这个分页组件了，官方把这个分页组件插件化了，因此要独立安装。详情见 [https://jekyllrb.com/docs/pagination/](https://jekyllrb.com/docs/pagination/)。

### 错误呈现

在启动 jekyll 服务的时候出现以下错误：

```
jekyll serve
Configuration file: c:/gitWorkSpace/blog-based-on-jekyll-3/_config.yml
  Dependency Error: Yikes! It looks like you don't have jekyll-paginate or one of its dependencies installed. In order to use Jekyll as currently configured, you'll need to install this gem. The full error message from Ruby is: 'cannot load such file -- jekyll-paginate' If you run into trouble, you can find helpful resources at http://jekyllrb.com/help/!
jekyll 3.1.2 | Error:  jekyll-paginate
```

### 解决方法

我们安装这个插件到本地即可。

```
gem install jekyll-paginate
Fetching: jekyll-paginate-1.1.0.gem (100%)
Successfully installed jekyll-paginate-1.1.0
Parsing documentation for jekyll-paginate-1.1.0
Installing ri documentation for jekyll-paginate-1.1.0
Done installing documentation for jekyll-paginate after 3 seconds
1 gem installed
```

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
