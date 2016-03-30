---
layout: post
title:  "Jekyll 搭建静态博客"
date:   2015-02-15 22:14:54
categories: jekyll
excerpt: Jekyll Github 搭建静态博客 blog 高浩阳 使用多说评论系统 以及Jia分享插件 参考git教程
---

* content
{:toc}


## 序

一直以来都想搭建一个自己的博客，但是近半年做项目太忙，再加上教研室的网络很坑爹，所以也一直没顾得上。之前用过 WordPress 托管在免费的京东云擎上，但是速度太慢。在知乎上看到一些相关的内容，于是选择了在github上用jekyll搭建博客。

---

## 搭建过程

在jekyll的官网上 [http://jekyllrb.com/](http://jekyllrb.com/) 其实已经说得比较明白了，我在这里还是简单的说一下吧。我用的是Windows系统。    
主要环节有：安装Ruby，安装RubyGems，安装jekyll，安装代码高亮插件，安装node.js

---

### 安装Ruby

ruby官网下载安装：[https://www.ruby-lang.org/en/downloads/](https://www.ruby-lang.org/en/downloads/)

安装完成后配置环境变量

在命令提示符中，得到ruby版本号，如下图，即安装成功
![ruby-v]({{ "/css/pics/ruby-v.png"}})

---

### 安装RubyGems

官网下载 [http://rubygems.org/pages/download](http://rubygems.org/pages/download) rubygems-2.4.5.zip   

cd到RubyGems目录   

![ruby-gems]({{ "/css/pics/ruby-gems.png"}})    

执行安装   

![ruby-gems-setup]({{"/css/pics/ruby-gems-setup.png"}})   

---

### 用RubyGems安装Jekyll

执行下面的语句安装   

![jekyll-setup]({{"/css/pics/jekyll-setup.png"}})   

安装结束画面   

![jekyll-setup-finish]({{"/css/pics/jekyll-setup-finish.png"}})   

至此jekyll就已经安装完毕了，后续就是个性化的自己设定了。   

---

### 创建博客

在d盘新建一个工作区jekyllWorkspace

cd到jekyllWorkspace   

执行jekyll new name创建新的工作区   

![jekyllWorkSpace]({{"/css/pics/jekyllWorkSpace.png"}})   

文件结构如下：   

![jekyllFiles]({{"/css/pics/jekyllFiles.png"}})

cd到博客文件夹，开启服务器   

![serve]({{"/css/pics/serve.png"}})   

watch为了检测文件夹内的变化，即修改后不需要重新启动jekyll

我的环境下启动报错(你的可能没有)，再安装yajl-ruby和rouge  

![yajl]({{"/css/pics/yajl.png"}})

再次启动服务器成功

![serve-sucess]({{"/css/pics/serve-sucess.png"}})

访问 http://localhost:4000/   

![browser]({{"/css/pics/browser.png"}})   

详细文章页面   

![browser2]({{"/css/pics/browser2.png"}})  

---

##后续 

*  整个安装过程参考了jekyll官网，注意jekyll还有一个简体中文官网，不过比较坑（我就被坑了），有些内容没有翻译过来，有可能会走弯路，建议如果想看中文的相关资料，也要中英对照着阅读。[jekyll中文网 http://jekyllcn.com](http://jekyllcn.com), [jekyll英文网 http://jekyllrb.com](http://jekyllrb.com)
*  jekyll中的css是用sass写的，当然直接在`_sass/_layout.scss`中添加css也是可以的。
*  本文是用Markdown格式来写的，相关语法可参考： [Markdown 语法说明 (简体中文版) http://wowubuntu.com/markdown/](http://wowubuntu.com/markdown/)  
*  按照本文的说明搭建完博客后，用`github Pages`托管就可以看到了。注意，在github上面好像不支持rouge，所以要push到github上时，我将配置文件_config.yml中的代码高亮改变为`highlighter: pygments`就可以了
*  博客默认是没有评论系统的，本文的评论系统使用了多说，详细安装办法可访问[多说官网 http://duoshuo.com/](http://duoshuo.com/)，当然也可以使用[搜狐畅言 http://changyan.sohu.com/](http://changyan.sohu.com/)作为评论系统。	
*  也可以绑定自己的域名，如果没有域名，可以在[godaddy http://www.godaddy.com/](http://www.godaddy.com/)上将域名放入购物车等待降价，买之。
*  祝各位新年快乐！

---

## 可能出现的问题

### `hitimes/hitimes (LoadError)`

**错误代码：**

<pre><code class="markdown">C:/Ruby22/lib/ruby/2.2.0/rubygems/core_ext/kernel_require.rb:54:in `require': cannot load such file -- hitimes/hitimes (LoadError)</code></pre>

**解决方法：**

在stackoverflow上又一个很好的解决方法。[hitimes require error when running jekyll serve on windows 8.1](http://stackoverflow.com/questions/28985481/hitimes-require-error-when-running-jekyll-serve-on-windows-8-1) 虽然上面的题主问的是 win 8.1 系统下的情况，但是同样适用于 win7。下面我简单翻译一下错误原因和解决方法。

> 可能是 Ruby 2.2 和 hitimes-1.2.2-x86-mingw32 中有一些 ABI 变化，少了一些相关的类库。
> 
> 所以卸载 hitimes 并通过 `--platform ruby` 重装即可。代码如下：
>
><pre><code class="markdown">gem uni hitimes
**Remove ALL versions**
gem ins hitimes -v 1.2.1 --platform ruby
</code></pre>
> 然后将自动重新编译 hitimes 并适用于 Ruby 2.2

下面是我自己的卸载和安装过程：

<pre><code class="markdown">E:\GitWorkSpace\gaohaoyang.github.io>gem uni hitimes

You have requested to uninstall the gem:
        hitimes-1.2.2-x86-mingw32

timers-4.0.1 depends on hitimes (>= 0)
If you remove this gem, these dependencies will not be met.
Continue with Uninstall? [yN]  y
Successfully uninstalled hitimes-1.2.2-x86-mingw32

E:\GitWorkSpace\gaohaoyang.github.io>gem ins hitimes -v 1.2.1 --platform ruby
Fetching: hitimes-1.2.1.gem (100%)
Temporarily enhancing PATH to include DevKit...
Building native extensions.  This could take a while...
Successfully installed hitimes-1.2.1
Parsing documentation for hitimes-1.2.1
Installing ri documentation for hitimes-1.2.1
Done installing documentation for hitimes after 1 seconds
1 gem installed</code></pre>


关于，[hitimes](https://rubygems.org/gems/hitimes/versions/1.2.2) 是一个快速的高效的定时器解决方案库，详情可以去官网查看。


