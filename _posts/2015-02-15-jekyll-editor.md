---
layout: post
title:  "Jekyll编辑功能汇总"
date:   2015-02-15 22:14:54
categories: 技术工具
excerpt: "jekyll用法汇总" 
tags: jekyll markdown 插件 github gitee 码云 latex 公式
permalink: /jekyll
---

* content
{:toc}

# Jekyll编辑

- 使用jekyll搭建github静态页面
- 汇总各类小技巧

## Jekyll 简介

Jekyll 是一个简单的，博客感知的，静态网站生成器。可以认为，Jekyll 是一个基于文件的内容管理系统（CMS）。它使用 Ruby 编写，通过 Markdown 和 Liquid 模板生成内容。
- Jekyll 最初由 GitHub co-founder、前首席执行官 Tom Preston-Werner 创立。
- 目前，Jekyll 的维护者是 Parker Moore，他本人也于2016年初加入了 GitHub。

[Jekyll 使用技巧](https://crispgm.com/page/48-tips-for-jekyll-you-should-know.html)

## Jekyll 部署

步骤：
- 安装 Ruby： brew install ruby
- 安装jekyll：gem install jekyll
- 生成站点
  - jekyll build
- 编译
  - jekyll serve
  - jekyll server
  - jekyll s
- 通过 http://localhost:4000 进行访问

## Jekyll 插件

【2022-9-23】Github Page对jekyll的支持是很到位的, 唯一的不足可能也是其本身基于安全考虑而使得jekyll始终都是运行在**safe模式**, 目前[放开的插件列表](https://help.github.com/articles/using-jekyll-plugins-with-github-pages/)非常有限（白名单[插件详情](https://pages.github.com/versions/)）, 所以很多jekyll的插件都无法使用
- jekyll plugin的集合地: [Jekyll-Plugins](http://www.jekyll-plugins.com/)

如何安装Jekyll插件？
- （1）换：不用github page服务，改用别的支持jekyll的公共服务
- （2）推：github page本质上支持的是静态页面，所以，可以在本地编译好jekyll，然后把build后的_site文件夹推送到Page上
- （3）绕：推送还是麻烦的话，可以使用github的project page。
  - 新建一个repo, 然后在master分支管理原始代码, 在gh-pages分支存放生成的site代码. 然后通过xxx.github.io/repo-name来访问了，详细做法参考 [Github Pages 中使用Jekyll插件](https://taoalpha.github.io/blog/2015/05/29/tech-use-jekyll-plugin-with-github-page/)

Tip: 
>- Note that GitHub Pages runs in **safe mode** and only allows a set of whitelisted plugins. 
>- To use the gem in GitHub Pages, you need to build locally（本地编译） or use CI (e.g. travis, github workflow) and deploy to your gh-pages branch.


## 笔记软件

### 自定义页面URL

站点上任何 HTML 文件，包括主页，都可以使用 layout 和 include 中的内容作为公用的内容，如页面的 header 和 footer. 将合适的部分抽出放到布局中。

定义静态页面的几种方法
- （1）直接在根目录下，与 _posts 目录同级：主页 (homepage), 关于 (about), 和一个联系 (contact) 页
- （2）创建文件夹，包含 index.html 即可 —— 好处是不用再URL里显示扩展名，服务端自动找目录下index文件
- （3）_posts 目录下的文章md文件中，头信息中定义　permalink
  - permalink: /other
  - 访问：http://example.com/other即可

```shell
.
|-- _config.yml
|-- _includes/
|-- _layouts/
|-- _posts/
|-- _site/
|-- about.html    # => 方法① http://example.com/about.html
|-- index.html    # => http://example.com/
|-- other.md      # => http://example.com/other.html
|── other/        # 方法② 子目录
|   └── index.md    # => http://example.com/other/
└── contact.html  # => http://example.com/contact.html
# -------- 方法③ ----------
permalink: /other

```

参考：jekyll官方[文档](http://jekyllcn.com/docs/pages/)

### markdown编辑环境

- 【2021-3-24】[Typora+PicGo+Gitee笔记方案](https://blog.csdn.net/lin455989875/article/details/104621967)
- [Typora+PicGo+Github/Gitee搭建免费稳定的图床](https://www.jianshu.com/p/a1e2cf01e05f)，github图床设置，gitee
- Markdown是一门易于上手能帮助作者专心写作的文档编辑语言，它的好处太多了，建议想自己动手做笔记写博客的朋友都可以学一学，10分钟上手，从此不用在为排版烦恼。
   - [Typora](https://www.typora.io/)是一款优雅的markdown编辑器，所见即所得的编辑方式让我爱不释手，也推荐给大家。
   - [Gitee](https://gitee.com/)是国内版的Github，功能跟Github基本一样，主要是在国内访问非常快，作为图床和笔记文件存放仓库非常合适。
   - [PicGo](https://molunerfinn.com/PicGo/)实现自动上传图片并返回markdown格式的图片url，这是自动上传的，也就是在Typora中插入图片就自动帮你上传替换图片的url，对于我们用户是透明的，十分舒服。
     - 覆盖的图床有8个平台：SM.MS图床、腾讯云COS、微博图床、GitHub图床、七牛图床、Imgur图床、阿里云OSS、又拍云图床
- [原文链接](https://blog.csdn.net/lin455989875/article/details/104621967)

### obsidian

【2022-9-13】笔记软件：[obsidian](https://obsidian.md/)
- The human brain is non-linear: we jump from idea to idea, all the time. Your second brain should work the same.
- In Obsidian, making and following connections is frictionless. Tend to your notes like a gardener; at the end of the day, sit back and marvel at your own knowledge graph.
- The graph is your knowledge at a glance. Explore, observe, and stay motivated. With group, filter, and display options, see things your way. Local graph shows connections around you. Get inspired while writing.
- ![](https://obsidian.md/images/screenshot.png)

[聊聊Zettelkasten如何构建第二大脑](https://cubox.pro/share/eSnVcz)
打开尘封已久的第二大脑

一个人常常有两种焦虑：
- 一种是**事情太多，处理不过来**，看不清这些事情背后的本质和彼此间的联系，无法判断**轻重缓急**，因此在做某个具体事的时候，脑子里总还想着另一个更紧急、更糟心的事，没办法静下心来，专注解决当下的问题，导致重要的事情处理不好，又产生一连串的后续问题，陷入事务处理的恶性循环。到最后干脆交给时间去解决，随大流了。
- 另一种焦虑是**信息过载**，大量的信息无从用起，一方面花了大量的时间，主动或者被动的看了听了读了大量的信息，另一方面一旦到要用到的时候要么一脸懵逼，要么总是感觉似曾相识，但就是想不起来，还得继续重复去造轮子。

知识焦虑

这两种焦虑都是缺少**整体观**导致的，大脑不擅于记忆那些陈年旧事，他擅于在多个思维之间**跳跃**思考，擅于发现多个信息背后的**联系**，也擅于聚焦在某个问题上进行**深入思考**。在同一个时间片内只有一个任务可以得到处理。所以，我们要把大脑的特性发挥好，把大脑不擅长的事情交给系统去做，交给**第二大脑**去做。当我们的大脑开始思考、联想、专注于当下解决问题时，我们的第二大脑能快速定位、实时提供所需要的经验积累、认知积累，提供所有事项的安排优先级，让我们自己的大脑放下焦虑，全身心聚焦在当下的觉知上，这种状态才是大脑的最佳状态。很多难题、创意的突破，很多美好体验、感受的安利都是大脑在这种状态下涌现的。

所以，我们需要一个上帝视角，即整体观，安放好所有的事项，让我们的心无挂碍。安放好所有过往的认知和思想，让大脑专注于当下要解决的问题，激荡涌现出新的认知，释放出活力和创造力。在整体观视角下，鸟瞰我们的思维所在的位置，鸟瞰我们在做的事在所有待办事项中的位置，无论是思想、认知、经验、重要事项还是各类琐事，都给他们一个安放的位置，随用随调，按需所取，随心所欲。这样我们的心才安定，行动起来才能游刃有余。我们需要设计一个可以信任的系统来处理这些，只有当你信任你的系统，只有当你真的看到一切都会被处理好时，你的大脑才会放开，让你专注在当下的事情上。

上帝视角鸟瞰知识
- ![](https://image.cubox.pro/article/2022040618154888366/98025.jpg)

简单概括一下：
- 1、大脑需要对存量信息和经验按需提取，减少思维切换衔接的时间消耗。
- 2、大脑需要排除对未完成事项的顾虑和干扰，专注在当下。而这些都可以通过第二大脑的设计和配合来完成。

想象一下，你的第二大脑就像是你的化身，任何时候，你把想法通过笔记的方式记录下来，就像是把思想传递给了你的化身，当你开始思考时，不在从零开始，而是和你的化身进行对话，他记录了你过去所有的认知和经验，你和他进行讨论和思考，过往的经验和当下的认知交汇激荡，新的认知不断涌现，这是一种多么奇妙的感觉，仿佛自己的大脑连接到了一个新世界，而这些都是你本该拥有的，只是被记忆和大脑的各类干扰尘封已久！

> Zettelkasten第二大脑 = 滑箱结构（Slipbox） + 工作流程（Workflow）


## 技巧汇总

- 注意：千万不要在文本内容里嵌套双括号（代码区也不行）！会造成编译错误！

### jupyter notebook

- 【2020-02-11】[Jekyll中支持Jupyter Notebook](https://www.jianshu.com/p/2857dba1c565)

**方法一** 转成markdown文件
- 将ipynb文件直接转成markdown文件
- nbconvert 命令：

```shell
ipython nbconvert jekyll_test.ipynb --to markdown
```

- 注意：转换图片会保存到jekyll_test_files, 即nb名_files文件夹
- 参考：[Linode: Display Jupyter Notebooks with Jekyll](https://www.linode.com/docs/applications/project-management/jupyter-notebook-on-jekyll/)

**方法二** 自动转html——<font color='red'>实验失败！</font>
- 用gem库：自动将ipynb转为html——更灵活
   - [Github: Jekyll Jupyter Notebook plugin](https://github.com/red-data-tools/jekyll-jupyter-notebook)
   - 安装命令：

```shell
gem install jekyll-jupyter-notebook
```

- 改配置

```shell
# paginate 2020-2-15 增加jupyter文件自动转html功能
plugins: [jekyll-paginate,jekyll-jupyter-notebook]
```

- （1）直接生成html
  - 将notebook文件放入到_post/文件夹内, 并保持2018-01-01-titile.ipynb 类似的格式. 在执行jekyll server后, 会将ipynb转换成html格式, 会生成/2018/01/01/title/index.html.
- （2）嵌入markdown
  - 注意：ipynb文件不能像上述一样放在_post内, 否则转换后不能使用
  - 嵌入命令：

```shell
\{\% jupyter_notebook "/notebook/sample.ipynb" \%\}
```

- 出错：jekyll 3.8.5 Error:  invalid byte sequence in GBK
- 解决：设置编码, [Jekyll在Windows下面中文编码问题解决方案](https://www.cnblogs.com/aleda/articles/Jekyll-in-Windows-following-Chinese-encoding-problem-solutions.html)，引发原有文章编译问题
- 结论：不管用！


### Markdown使用

* [github官方markdown指南](https://guides.github.com/features/mastering-markdown/ "英文版")
* [github readme语法简介](http://blog.csdn.net/guodongxiaren/article/details/23690801?utm_source=tuicool&utm_medium=referral "跟一般markdown语法不同")
* [MarkDown语法笔记（完整版）](http://blog.csdn.net/witnessai1/article/details/52551362)
* [马克飞象markdown语法在线测试](https://maxiang.io/ "可以在线测试MD语言！")

【2022-9-1】jekyll默认的markdown：[kramdown](https://kramdown.gettalong.org/quickref.html) (Jekyll's default markdown parser) 

### 编辑功能

#### 段落格式

- 注释

> 注释在此。。。

定义

: 定义段落

#### 代码高亮、折叠

Jekyll 使用与 Pygments 兼容的 Rouge突显工具。 [官方资料](https://docs.github.com/cn/pages/setting-up-a-github-pages-site-with-jekyll/about-github-pages-and-jekyll#%E8%AF%AD%E6%B3%95%E7%AA%81%E5%87%BA%E6%98%BE%E7%A4%BA)
- Pygments 已被弃用，在 Jekyll 4 中不受支持。 如果在 _config.yml 文件中指定 Pygments，则 Rouge 将用作后备。 Jekyll 不能使用任何其他语法突显工具
- 如果想使用其他突显工具，如 highlight.js，则必须更新项目的 _config.yml 文件来禁用 Jekyll 的语法突出显示。

- （1）代码高亮

```python
import os
print "hello"
```

- （2）显示行号

{% highlight python linenos %}
import os
print "hello"
{% endhighlight %}

- （3）区块折叠：3种方法
- There are three options for hiding/display text that can be expanded, also known by these keywords: text expand, expand/collapse, collapsible markdown, details element.
- ① 使用js脚本：expand，只能展开，不能收回
- ② 使用 details 组件，可以展开、收回，但不是所有浏览器都支持，长文本里的内容未被jekyll语法转换
- ③ polyfill：jquery实现的组件，详见[文章](http://movb.de/jekyll-details-support.html)
  - 安装js工具：zepto 和 jquery
- ④ ruby组件：安装ruby插件，详见[文章](http://movb.de/jekyll-details-support.html)

- [2022-9-22] 区块折叠功能，[参考](https://jekyllcodex.org/without-plugin/text-expand/)
- Sometimes when you want to create a ‘read more’ link, it is overkill to create a whole new page. In that case a text expand functionality, using javascript is very useful. On this website it is used for clarity and brevity.
- How it works
- The script looks for an \[expand] tag on a single line and then looks for the \[/expand] tag (again on a single line, thus being the only content of its paragraph). When it finds these it will add some classes and hide everything in between. It will show a ‘read more →’ link, indicating the text can be expanded.
- Download the file `text-expand.html` into the `_includes` directory. 
- Then edit the `_layouts/default.html` and add this before the closing body tag
- 文章内容中，增加标签：\[expand]，\[/expand] —— 这种方法展开后，无法收回
- 改进：[Jekyll Text Expand or Collapsible Markdown](https://www.tomordonez.com/jekyll-text-expand-collapsible-markdown/)

```html
<details>
	<summary>Click to expand</summary>
	<pre>
	Long content here
	</pre>
</details>
```

detail组件

<details>
	<summary>Click to expand</summary>
	<pre>
	Long content here
  这是长文本
  ```py
  import tensorflow as tf
  print(tf.__version__)
  ```
	</pre>
</details>

ruby插件

```ruby
{ % details Read more about that **thing**... % }
  That **thing** is... 代码块无法用jekyll渲染

  #```py
  import tensorflow as tf
  print(tf.__version__)
  #```
{ % enddetails % }
```

#### 文字属性（大小、颜色）

The HTML style attribute is used to add styles to an element, such as **color**, font, **size**, and more.

- 字体大小
  - <font size=2>二号字尺寸式样 </font> 
- **加粗**, *斜体*, 颜色显示
  - <font color='green'>彩色字体</font>
- 中文字体：face 属性规定 font 元素中文本的字体。
  - <font color=#0099ff size=5 face='Yuanti SC' background='yellow'>中文-圆体</font>
  - 在 HTML 4中 face 属性已废弃，HTML 4.01 Strict DTD 或 XHTML 1.0 Strict DTD 已不支持该属性，可以使用 CSS 代替
- 字体：[CSS font-family中文字体对应的英文名称一览表](https://www.zhangxinxu.com/study/201703/font-family-chinese-english.html)

颜色色阶选取[参考](https://htmlcolorcodes.com/zh/yanse-ming/), 包含常用颜色：红、粉、橙、黄、紫、绿、蓝、白、灰

```html
<font color='green'>彩色字体</font>

<font color=#0099ff size=5 face='STHeiti' background='yellow'>中文-黑体</font>

<font color=#0099ff size=5 face='Yuanti SC'>中文-圆体</font>

<font color=#0099ff size=5 face='Weibei SC' background='yellow'>中文-魏碑</font>

<font color=#0099ff size=5 face='STKaiti'>中文-楷体</font>

<font color=#0099ff size=5 face='Xingkai SC'>中文-行楷</font>

<font color=#0099ff size=5 face='STLiti'>中文-隶书</font>

<p style="font-family:Yuanti SC;background:yellow">This is a paragraph中文, 带背景.</p>
<font face='Yuanti SC'>测试</font>
<p style="font-family:'Courier New'">This is another paragraph.</p>

This is *red红色*{: style="color: red"} 去掉*后颜色失效
This is <span style="color: red">written in red</span>.
This is <p style="color: red">written in red</p>.
<p style="color:#0000ff">This text is blue.</p>
<p style="color:rgb(106, 90, 203)">This text is violet.</p>
<p style="color:red">This text is red.</p>
<p style="font-size:50px;">I am big</p>
<p style="font-size:50px;color:red">I am big and red</p>
<p style="font-size:50px;color:red;background-color:powderblue;">I am big and red and background</p>
```

- This is *red红色*{: style="color: red"}
- This is <span style="color: red">written in
red</span>.

<h1 style="color:IndianRed">Indian Red Title Text</h1>
<p style="color:SlateGray">Slate gray paragraph text</p>

[改变Markdown中文字的颜色](https://codeantenna.com/a/Ulr5tITBGx)

$\color{#4285f4}{更}
\color{#ea4335}{丰}
\color{#fbbc05}{富}
\color{#4285f4}{的}
\color{#34a853}{颜}
\color{#ea4335}{色}$

更多：[sytle样式在线调试](https://www.w3schools.com/html/html_styles.asp)

#### 脚注

分为：
- 按编号引用
- 按别名引用

```markdown
Here is a simple footnote[^1].

A footnote can also have multiple lines[^2].  

You can also use words, to fit your writing style more closely[^note].

[^1]: My reference.
[^2]: Every new line should be prefixed with 2 spaces.  
  This allows you to have a footnote with multiple lines.
[^note]:
    Named footnotes will still render with numbers instead of the text but allow easier identification and linking.  
    This footnote also has been made with a different syntax using 4 spaces for new lines.
```

### Jekyll admin插件

- 【2021-4-9】界面形式操作站点内容的CMS系统，[参考](http://www.mianshigee.com/project/jekyll-admin)
- 打开网站的 Gemfile 文件里：
  - gem 'jekyll-admin', group: :jekyll_plugins
- 运行 bundle install
- 用法：像往常一样启动 jekyll (bundle exec jekyll serve)
  - 打开浏览器，通过 http://localhost:4000/admin 访问管理界面

### 页面边距设置

- 【2021-4-16】问题：原版页面的左右边距太大，导致正文区空间受限，不少表格展示不佳，需要改变版面边距设置
- jekyll页面关系：_includes和 _layouts里的html文件与 _sass里的css样式对应（名字）
- 方法：修改 _sass/_page.scss文件里，注意注释不能用中文，否则github page会报编码错误

```css
.page {
    width: 1400px; // [2021-4-15] original value is 1140
```

### 博客内部链接

- 【2021-1-23】site.url 同 site.baseurl
- [jekyll 全局变量](https://jekyllrb.com/docs/variables/)

示例
- [站内文章链接]({{ site.baseurl}}{% post_url 2010-01-01-navigation %}#导航)

代码

```shell
[站内文章链接]({{ site.baseurl}}{% post_url 2010-01-01-navigation %}#home)
# 解析后的效果，也可以直接引用子路径
[站内文章链接](/navi#home)
```

#### jekyll 变量

Jekyll 都会通过 Liquid 模板工具来生成一系列的数据。

全局(Global)变量

| 变量	| 说明 |
|---|---|
| site | 来自_config.yml文件，全站范围的信息+配置。详细的信息请参考下文 |
| page | 页面专属的信息 + YAML 头文件信息。通过 YAML 头文件自定义的信息都可以在这里被获取。详情请参考下文。|
| content | 被 layout 包裹的那些 Post 或者 Page 渲染生成的内容。但是又没定义在 Post 或者 Page 文件中的变量。|
| paginator | 每当 paginate 配置选项被设置了的时候，这个变量就可用了。详情请看分页。|

全站(site)变量

| 变量 |	说明 |
|---|---|
| site.time | 当前时间（运行jekyll这个命令的时间点）。|
| site.pages | 所有 Pages 的清单。|
| site.posts | 一个按照时间倒序的所有 Posts 的清单。|
| site.related_posts | 如果当前被处理的页面是一个 Post，这个变量就会包含最多10个相关的 Post。默认的情况下， 相关性是低质量的，但是能被很快的计算出来。如果你需要高相关性，就要消耗更多的时间来计算。 用jekyll 这个命令带上 --lsi (latent semantic indexing) 选项来计算高相关性的 Post。|
| site.categories.CATEGORY | 所有的在 CATEGORY 类别下的帖子。|
| site.tags.TAG | 所有的在 TAG 标签下的帖子。|
| site.\[CONFIGURATION_DATA\] | 所有的通过命令行和 _config.yml 设置的变量都会存到这个 site 里面。 举例来说，如果你设置了 url: http://mysite.com 在你的配置文件中，那么在你的 Posts 和 Pages 里面，这个变量就被存储在了 site.url。Jekyll 并不会把对 _config.yml 做的改动放到 watch 模式，所以你每次都要重启 Jekyll 来让你的变动生效。|

页面(page)变量

| 变量 |	说明 |
|---|---|
| page.content | 页面内容的源码。|
| page.title | 页面的标题。|
| page.excerpt | 页面摘要的源码。 |
| page.url | 帖子以斜线打头的相对路径，例子： /2008/12/14/my-post.html。|
| page.date | 帖子的日期。日期的可以在帖子的头信息中通过用以下格式YYYY-MM-DD HH:MM:SS (假设是 UTC), 或者YYYY-MM-DD HH:MM:SS +/-TTTT ( 用于声明不同于 UTC 的时区， 比如 2008-12-14 10:30:00 +0900) 来显示声明其他 日期/时间 的方式被改写|
| page.id | 帖子的唯一标识码（在RSS源里非常有用），比如/2008/12/14/my-post |
| page.categories | 这个帖子所属的 Categories。Categories 是从这个帖子的 _posts以上 的目录结构中提取的。距离来说, 一个在 /work/code/_posts/2008-12-24-closures.md 目录下的 Post，这个属性就会被设置成 ['work', 'code']。不过 Categories 也能在YAML 头文件信息 中被设置。|
| page.tags | 这个 Post 所属的所有 tags。Tags 是在YAML 头文件信息中被定义的。|
| page.path | Post 或者 Page 的源文件地址。举例来说，一个页面在 GitHub 上|

[原文链接](https://blog.csdn.net/sunxboy/article/details/84693928)

### 表格编辑

|左对齐|右对齐（设置宽度）|居中|
|:---|----------:|:-----:|
|你好|你好|你好|
|hello<br>world| hello world||


#### 复杂单元格用html

合并单元格直接使用HTML来达到效果。

这会用到HTML的标签：
- colspan：规定单元格可纵深的列数
- rowspan：规定单元格可横跨的行数

```html
<table>
    <tr>
        <td>张</td>
        <td>王</td>
    <tr>
    <tr>
        <td colspan="2">姓氏</td>
    <tr>
</table>
```

合并列：

```html
<table>
    <tr>
        <td>类别</td>
        <td>名称</td>
    </tr>
    <tr>
        <td rowspan="2">颜色</td>
        <td>红色</td>
    </tr>
    <tr>
        <td>黄色</td>
    </tr>
    <tr>
        <td rowspan="2">姓氏</td>
        <td>张</td>
    </tr>
    <tr>
        <td>王</td>
    </tr>
</table>
```

有行有列；

```html
<table>
    <tr>
        <td>类别</td>
        <td>名称</td>
    </tr>
    <tr>
        <td rowspan="2">颜色</td>
        <td>红色</td>
    </tr>
    <tr>
        <td>黄色</td>
    </tr>
    <tr>
        <td colspan="2">姓氏</td>
    </tr>
    <tr>
        <td>王</td>
        <td>张</td>
    </tr>
</table>
```

#### 表格功能扩展

【2022-9-23】表格内无法使用公式
- 【2022-9-8】latex在表格中显示异常，[github markdown](https://github.com/wqw547243068/wqw547243068.github.io/blob/master/_posts/2015-02-16-latex-editor.md)正常，jekyll page显示异常
- 解法（1）：需要安装[spaceship插件](https://github.com/jeffreytse/jekyll-spaceship#installation)
  - A Jekyll plugin to provide powerful supports for table, mathjax, plantuml, mermaid, emoji, video, audio, youtube, vimeo, dailymotion, soundcloud, spotify, etc.

- 发帖咨询：[How to display Latex cell in markdown table?](https://github.com/orgs/community/discussions/32281)
- There is no straightforward solution as Jekyll does not support that out of the box but you can get it to work:
1. Change your Pages source to <span style='color:blue'>GitHub Actions</span> (this is in beta)
1. Add a "vanilla" Jekyll workflow to your repository ([example](https://github.com/actions/starter-workflows/blob/main/pages/jekyll.yml))
1. Use this plugin: [jekyll-spaceship](https://github.com/jeffreytse/jekyll-spaceship)

### 图片嵌入

#### 默认方法

- ![](https://img3.doubanio.com/lpic/s28012945.jpg)
- 解析成：

```html
<img title="name" alt="name" src="url">
```

#### 自定义图片大小

限制大小
- <img src="https://img3.doubanio.com/lpic/s28012945.jpg" height="100%" width="100" />

【2020-6-20】如何插入自己的图片？[Jekyll博客中如何用相对路径来加载图片？](https://www.zhihu.com/question/31123165)
- 不要在\_posts下面建立目录，在根目录,也就是 yourname.github.io/ 下面建立一个新目录pics放图片。
- 然后引用即可。 
   
```html
<figure>
   <a><img src="{{site.url}}/pics/branch.png"></a>
</figure>
```

或者：

```shell
# 简洁模式
![](/wqw/fig/3brown1blue.png)
# 正规模式
![三综一蓝]({{ '/wqw/fig/3brown1blue.png' | relative_url }})
# 高级模式，图片属性
![三综一蓝]({{ '/wqw/fig/3brown1blue.png' | relative_url }})
{: style="width: 100%;" class="center"}
*Fig. 25. 图片注释*
{:.image-caption}
```

![](/wqw/fig/3brown1blue.png)

#### 图片点击放大 fancybox

【2021-4-9】图片放大，Jekyll添加[FancyBox](https://www.cnblogs.com/Grand-Jon/p/7397652.html)插件，
- [fancyBox](https://github.com/fancyapps/fancybox) 是一个 JavaScript 库，它以优雅的方式展示图片，视频和一些 html 内容。它包含你所期望的一切特性 —— 支持触屏，响应式和高度自定义。
- [FancyBox3 中文文档](https://www.lovestu.com/fancybox3doc.html)
- 【2022-10-11】使用[fancyapp插件](https://fancyapps.com/docs/ui/quick-start)，其中有fancybox工具，效果示例见：[Jekyll添加FancyBox 插件](https://www.cnblogs.com/Grand-Jon/p/7397652.html)

添加方法
- includes/head.html里添加如下代码

```html
<!-- 【2022-10-11】 图片点击效果插件fancybox -->

<!-- 国外CDN引用地址 -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/@fancyapps/ui/dist/fancybox.css"
/>
<!-- 前置条件，如果已经导入，去掉此行 -->
<script src="https://code.jquery.com/jquery-3.3.1.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/@fancyapps/ui@4.0/dist/fancybox.umd.js"></script>

<!-- 国内CDN引用地址 -->
<!--head区-->
<link href="https://cdn.bootcss.com/fancybox/3.3.5/jquery.fancybox.css" rel="stylesheet">
<!--body区-->
<script src="https://cdn.bootcss.com/fancybox/3.3.5/jquery.fancybox.min.js"></script>

<script>
// 给图片添加链接，这样不用每个图片使用html
/*
$(document).ready(function() {
  $("p img").each(function() {
    var strA = "<a id='yourid' href='" + this.src + "'></a>";
    $(this).wrapAll(strA);
  });
});
// fancybox
$("#yourid").fancybox({
  openEffect	: 'elastic',
  closeEffect	: 'elastic',
});
*/

// 以上不管用，要设置yourid，设置后，又无法引用fancybox

$(document).ready(function() {
    wrapImageWithFancyBox();
});
/**
 * Wrap images with fancybox support.
 */
function wrapImageWithFancyBox() {
    $('img').not('.sidebar-image img').not('#author-avatar img').not(".mdl-menuimg").not(".something-else-logo img").not('.avatar').not('.share-body img').each(function() {
        var $image = $(this);
        var alt = $image.attr('alt');
        var src = $image.attr('src');
        //【2022-10-13】反防盗链
        var src = 'https://images.weserv.nl/?url=' + $image.attr('src');
        // 替换掉中文双引号
        src = src.replace(/“|”/,''); // 缩略图地址修正
        $image.attr('src',src); // 点击后原始图地址修正
        $imageWrapLink = $image.wrap('<a data-fancybox=gallery data-caption="'+ alt +'" href="' + src + '"></a>');
    });
    $().fancybox({
        selector: '[data-fancybox="images"]',
        thumbs: false,
        hash: true,
        loop: false,
        fullScreen: false,
        slideShow: false,
        protect: true,
    });
}
</script>
```

自动添加转换代码：
- [给 Jekyll 添加 FancyBox](https://havee.me/internet/2013-10/add-fancybox-on-jekyll.html) —— 不管用！
- [fancybox自动化高级设置](https://www.ytjia.xyz/blog/2022/05/08/jekyll-image-zoom.html) —— <span style='color:red'>测试通过</span>

使用时，添加如下代码

```html
<a href="https://lipsum.app/id/1/1024x768" data-fancybox="gallery" data-caption="Optional caption">链接形式</a>
<img src="https://lipsum.app/id/1/1024x768" data-fancybox="gallery" data-caption="图片点击测试"  height="100%" width="300">

<a data-fancybox href="https://vimeo.com/191947042?color=f00">
  Vimeo video - custom color 视频弹窗播放
</a>
```

<a href="https://lipsum.app/id/1/1024x768" data-fancybox="gallery" data-caption="Optional caption">链接形式</a>

对比测试：点击第一张图，会出现放大效果，第二章不会
- <img src="https://lipsum.app/id/1/1024x768" data-fancybox="gallery" data-caption="图片点击测试"  height="100%" width="300">
- <img src="https://lipsum.app/id/1/1024x768">

data-fancybox取值
- gallery 艺术画廊模式
- images 小图预览，点击放大
- lightbox 图片排列显示
- group 分组展示
- dialog 对话框形式展现子页面
- video-gallery 多组视频弹窗播放

#### 多图展示

【2021-12-21】多图排列：[Markdwon中多张图片的并排显示](https://blog.csdn.net/weixin_41010198/article/details/86639739)


```html
<!-- 居中并排 -->
<center class="half">
<img src="https://img-blog.csdnimg.cn/2019012511060017.png" width=00/>
<img src="https://img-blog.csdnimg.cn/2019012511060017.png" width=200/>
</center>
<!-- 左对齐并排 -->
<figure>
<img src="https://img-blog.csdnimg.cn/2019012511060017.png" width=200/>
<img src="https://img-blog.csdnimg.cn/2019012511060017.png" width=200/>
<img src="https://img-blog.csdnimg.cn/2019012511060017.png" width=200/>
</figure>
<!-- 表格显示+图注 -->
<table>
    <tr>
        <td ><center><img src="https://img-blog.csdn.net/20180731150122598?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzODI2NTY0/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" >图1  范冰冰 </center></td>
        <td ><center><img src="https://img-blog.csdn.net/20180731150122598?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzODI2NTY0/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"  >图2 范冰冰</center></td>
    </tr>
    <tr>
        <td><center><img src="https://img-blog.csdn.net/20180731150144421?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzODI2NTY0/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70" >图3 高圆圆</center></td>
        <td ><center><img src="https://img-blog.csdn.net/20180731150144421?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzMzODI2NTY0/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70"  >图4 高圆圆</center> </td>
    </tr>
</table>
```

#### 图片防盗链

【2022-10-13】markdown里引用第三方图片时，经常出现图片无法显示，原因是第三方网站使用了防盗链功能，导致外部图片请求被禁止
- 网站设置了防盗链的策略，会在后台判断请求的Referrer属性是不是来自于一个非本域名的网站，如果来源不是本域名就返回 403 forbidden


解决的方案
1. 使用后台的预下载（把图片下载下来放到服务器下）
  - 缺点： 占用服务器的空间，访问速度没有豆瓣提供的稳点。有些网站是静态的如 hexo 就无法实现。
2. 第三方代理 —— <span style='color:green'>测试通过</span>
  - 缺点： 不稳点，第三方代理可能在国内访问不稳定，在国内没有好的推荐。也可以自己做一个代理，之前有人用 GO 做过一个。
  - [images.weserv.nl](https://images.weserv.nl/)提供这样的服务，使用方法：url后面填上豆瓣 Api 返回的图片地址，详见代码示例
3. 还有一种比较友好和奢侈的，上传 CDN 调用 CDN 的地址，
  - 缺点： 有点奢侈，因为所有图片都存到 CND 占用大量空间，CND 可能需要钱购买，CND 服务商提供图片上传的 API
4. 删除 Header 中的 Referrer
  - content 有四个值可以选择 never,always,origin,default 这是来自于 whatwg 标准，浏览器对他的支持还是很好的。 MDN 标准，还多了一个 no-referrer
5. 添加 ReferrerPolicy 属性 —— <span style='color:green'>测试失败</span>
  - 添加 meta 标签相当于对文档中的所有链接都取消了 referrer，
  - 而ReferrerPolicy 则更精确的指定了某一个资源的referrer策略。
  - 关于这个策略的定义可以参照MDN。比如我想只对某一个图片取消referrer，如下编写即可:

```html
<!-- url后面就是要反防盗链的图片 -->
<img src=”https://images.weserv.nl/?url=https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2544866651.jpg" />
<!-- 方法5示例：放head区，不管用 -->
<img src=“xxxx.jpg” referrerPolicy=“no-referrer” />
<meta id="referrer" name="referrer" content="always" />
```

反防盗链示例：盗用豆瓣[图片](https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2544866651.jpg)
- <img src="https://images.weserv.nl/?url=https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2544866651.jpg" />

可以讲以上转换动作放到fancybox的js脚本中，统一对所有图片使用反防盗链


### 公式嵌入

公式编辑工具：
- [latexlive](https://www.latexlive.com/home)：支持在线编辑、模板、图片识别、URL分享，十分强大，已用邮箱注册账号，latex @ 3721
- [Latex在线调试](https://latexbase.com/)
- [吴文中数学公式编辑器](http://latex.91maths.com/)，公式在线编辑，所见所得，支持图片输出
  - $$ P = \frac{1}{1 + \exp^{-(实力-难度)}} $$
- Github自带公式显示LaTeX，[LATEX数学公式基本语法](https://www.cnblogs.com/houkai/p/3399646.html)
  - $$f \left( x _ { n + 1 } \right) - f \left( x _ { n } \right) = f ^ { \prime } \left( x _ { n } \right) \left( x _ { n + 1 } - x _ { n } \right)$$
- 知乎提供公式生成图片服务：https://www.zhihu.com/equation?tex=y+%3D+%5Cphi%28%5Csum+W_%7Bij%7DX_j+%2B+b%29+
  - 效果：![](https://www.zhihu.com/equation?tex=y+%3D+%5Cphi%28%5Csum+W_%7Bij%7DX_j+%2B+b%29+)

除了`$$`，也可以使用math提示语显示分块公式

```math
\sqrt{3}
```

【2022-9-1】注意：jekyll博客中默认不能展示数学公式，需要增加插件
- 参考：[display equation in jekyll blog in latex format on github pages](https://stackoverflow.com/questions/37899183/display-equation-in-jekyll-blog-in-latex-format-on-github-pages)
- 文件： _layouts/post.html
- 内容如下

```html
<script src="https://cdn.mathjax.org/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML" type="text/javascript"></script>
```

【2022-9-8】GitHub Page（jekyll服务）不支持在markdown table中嵌入latex公式
- [How to display Latex cell in markdown table?](https://github.com/orgs/community/discussions/32281)
- There is no straightforward solution as Jekyll does not support that out of the box but you can get it to work:
1. Change your Pages source to GitHub Actions (this is in beta)
1. Add a "vanilla" Jekyll workflow to your repository ([example](https://github.com/actions/starter-workflows/blob/main/pages/jekyll.yml))
1. Use this plugin: [jekyll-spaceship](https://github.com/jeffreytse/jekyll-spaceship)

### 文档嵌入

pdf文件直接显示，800px不能省略px，否则高度低

```html
<object type="application/pdf" data="https://arxiv.org/pdf/2004.05388"
           id="review" style="width:100%;  height:800px; margin-top:0px;  margin-left:0px" >
</object>
```

<object type="application/pdf" data="https://arxiv.org/pdf/2004.05388"
           id="review" style="width:100%;  height:800px; margin-top:0px;  margin-left:0px" >
</object>


### 视频嵌入

【2019-04-29】嵌入视频

代码：

```html
<iframe src="//player.bilibili.com/player.html?aid=26722471&cid=45968926&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"  height="600" width="100%"> </iframe>
```

- 超级工程

<iframe src="//player.bilibili.com/player.html?aid=26722471&cid=45968926&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"  height="600" width="100%"> </iframe>

- [网易云课堂](http://open.163.com/movie/2006/1/1/9/M6HV755O6_M6HV8DF19.html)

代码：

```html
<object width="640" height="360"><param name="movie" value="//open.163.com/openplayer/-M6HV755O6-M6HV8DF19-http://open-image.nosdn.127.net/a5954850efaf429189dd8247a999be22.jpg-openPlayer.swf?isUserAutoPlay=1"></param><param name="allowScriptAccess" value="always"></param><param name="wmode" value="transparent"></param><embed src="//open.163.com/openplayer/-M6HV755O6-M6HV8DF19-http://open-image.nosdn.127.net/a5954850efaf429189dd8247a999be22.jpg-openPlayer.swf?isUserAutoPlay=1" type="application/x-shockwave-flash" width="640" height="360" allowFullScreen="true" wmode="transparent" allowScriptAccess="always"></embed></object>
```

- 【2021-3-3】按照html方式嵌入视频，有4-5种方式，参考[w3c地址](https://www.w3school.com.cn/html/html_video.asp)，示例：

```html
<embed width="500" height="300" src="https://d2r55xnwy6nx47.cloudfront.net/uploads/2021/02/Neuron_2880_Lede.mp4" />
<object data="movie.swf" height="200" width="200"/>
<!-- H5 -->
<video width="320" height="240" controls="controls">
  <source src="movie.mp4" type="video/mp4" />
  <source src="movie.ogg" type="video/ogg" />
  <source src="movie.webm" type="video/webm" />
  <object data="movie.mp4" width="320" height="240">
    <embed src="movie.swf" width="320" height="240" />
  </object>
</video>

```

- 【2021-4-26】[W3C体验](https://www.w3school.com.cn/tiy/t.asp?f=eg_html_video)

```html
<video width="620" height="440" controls="controls" autoplay="autoplay">
  <source src="https://vdn1.vzuu.com/SD/48e8724a-9521-11eb-a73c-be9fcf3af908.mp4?disable_local_cache=1&auth_key=1619412400-0-0-298e79ec9b1fd68667f15832b49df810&f=mp4&bu=pico&expiration=1619412400&v=hw" type="video/mp4" />
</video>
```

<video width="620" height="440" controls="controls" autoplay="autoplay">
  <source src="https://vdn1.vzuu.com/SD/48e8724a-9521-11eb-a73c-be9fcf3af908.mp4?disable_local_cache=1&auth_key=1619412400-0-0-298e79ec9b1fd68667f15832b49df810&f=mp4&bu=pico&expiration=1619412400&v=hw" type="video/mp4" />
</video>



### 脑图嵌入

- processon

```html
<iframe id="embed_dom" name="embed_dom" frameborder="0" style="display:block;width:700px; height:900px;" src="https://www.processon.com/embed/mind/581dee8ee4b0c6fe57213cd9"></iframe>
```

- xmind脑图
   - 【2019-08-02】[xmind图](https://www.xmind.net/m/YPMsKe/#)

```html
<iframe src='https://www.xmind.net/embed/YPMsKe/' width='750' height='540' frameborder='0' scrolling='no' allowfullscreen="true"></iframe>
```

<iframe src='https://www.xmind.net/embed/T9Nm/' width='750' height='540' frameborder='0' scrolling='no' allowfullscreen="true"></iframe>

### 流程图

#### draw.io

- 【2020-7-4】[draw.io](https://www.draw.io/)，[客户端版本下载](https://www.cnblogs.com/HGNET/p/11893280.html)，[Chrome APP插件](https://chrome.google.com/webstore/detail/drawio-desktop/pebppomjfocnoigkeepgbmcifnnlndla/related?hl=en-GB)
   - [使用drawio进行画图真的很方便(WEB版/Chrome APP版/桌面版)](https://blog.csdn.net/dog250/article/details/89272808)
   - ![](https://tukuimg.bdstatic.com/scrop/468c0e017cdff12b6a2413b2c82c88a2.gif)
   - 嵌入markdown文件时，转html格式，方便直接编辑，并与github同步！
- 类似于[Gliffy](https://www.gliffy.com/) Diagrams for Confluence，[Chrome插件下载地址](https://www.crx4chrome.com/crx/1601/)，[web版本](https://go.gliffy.com/go/html5/launch)
- mac下的绘图软件omnigraffle，类似visio
- 参考
   - [10款流程图工具](https://baijiahao.baidu.com/s?id=1668266730880239997)

- 【2020-8-21】[如何绘制泳道图](https://www.jianshu.com/p/787d918c0120)，[processon泳道图示例](https://v3.processon.com/view/559632e3e4b018f0e50364a7)
- [visual-paradigm](https://online.visual-paradigm.com/cn/)


如何嵌入markdown？
- （1）直接当做html文件include到md页面 —— 每次都需要新增文件，复杂
- （2）用iframe嵌入md页面 —— 正常显示，但是页面渲染出问题，后面的内容无法展示
- （3）复制html里的内容到md页面
  - 同时将 script脚本添加到 include/head.html中，避免重复导入，影响页面渲染速度

做法
- 用draw.io绘制图
- 导出html文件
- 复制body里面的代码即可，[参考](https://blog.jonslow.com/insert-draw-io-graph-into-markdown/)

```html
<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-10-12T09:55:23.407Z\&quot; agent=\&quot;5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;iTw_U0KMZUyyGfZo4U-Q\&quot; version=\&quot;20.2.0\&quot;&gt;&lt;diagram id=\&quot;xdYpP7w1t2VaaceZiyqw\&quot; name=\&quot;第 1 页\&quot;&gt;7Zhdb5swFIZ/jS9bgc2HfQkhyVRp0rRMmnZJwQSvBKfEbZL9+h3ANKE4U7slTVclNzHvMWC/D+fYgMhosZlW8TL/LFNeIGylG0QihLGNiQN/tbJtFd+jrTCvRKo77YSZ+MW1aGn1QaR81euopCyUWPbFRJYlT1RPi6tKrvvdMln077qM53wgzJK4GKrfRaryVqXY3+mfuJjn3Z1tj7WRRdx11jNZ5XEq13sSGSMyqqRUbWuxGfGiNq/zpT1vciD6NLCKl+olJ1zdRLNxeSPWX507KT1+fx9lV6S9ymNcPOgJ68GqbecAXAXMhoNwnQvFZ8s4qSNr4A1arhYFHNnQjFfLlkAmNhxuGmayVJoorjtkoihGspBVc2GSZRlOEtBXqpJ3fC+Seree60FkOEc97UdeKb7Zk/Scp1wuuKq20EVHse1dY7c9a9s9W+Ta19J6BxV7OznfY7qvx/pxmj/dZ+c4NLTprwBgnxUA9w4A8NmtZR0JQJcAnfuONbDe9q2h70/i0U3HQ9PHHmIjFIzQmCJKUBg1DQcx+zQ8bGbgQRNu5nFLXcc9Fg/S54GtIQ8TjpPRsM04gAJ10dhHYYiC4DAOmLbq+963r5Qlf+a1luJCzEs4TMBMDnpYmyig9gc6sBBpWhwCXcmHMq2xRpYBbSVVrIQsdbgdUreCkOOQJFDHbNKHiYcwmQEmOQLM9fRHmAWiUN+cfFp++VlVwcJUzwAhDIF6TY4xFH5UlgNwBrwHWTqW9b5AmpLSR5TqGhnYiELDRTRAAW1CDAXsPyDqvIRofcJe/a1/k8lxSD9fD7FhPXxT0oY9IHBlpMlUB4WQsuRC+i9Ik+c5fW7SjoG0U2OuScNCa9dr7YXrq2v1ubm6xgyGHA2dJnGB8UTvcNnkgwK2LMac6EQl2jszYM8AmCEWIda+ucB67F4A/0NlPjdg3wDYq3dbMArI4LBJ5QvXV1fmc3Ol5hWX1nsoyGAKm6k/fGl4f4Df6nWIYKcH0j0ZRzjcfYNtYntfssn4Nw==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<!--- _includes/head.html 【2022-10-12】移动失效，不管用；→ 每次使用draw.io图，都需要添加js导入代码 -->
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>
```

效果：

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2022-10-12T09:55:23.407Z\&quot; agent=\&quot;5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/104.0.0.0 Safari/537.36\&quot; etag=\&quot;iTw_U0KMZUyyGfZo4U-Q\&quot; version=\&quot;20.2.0\&quot;&gt;&lt;diagram id=\&quot;xdYpP7w1t2VaaceZiyqw\&quot; name=\&quot;第 1 页\&quot;&gt;7Zhdb5swFIZ/jS9bgc2HfQkhyVRp0rRMmnZJwQSvBKfEbZL9+h3ANKE4U7slTVclNzHvMWC/D+fYgMhosZlW8TL/LFNeIGylG0QihLGNiQN/tbJtFd+jrTCvRKo77YSZ+MW1aGn1QaR81euopCyUWPbFRJYlT1RPi6tKrvvdMln077qM53wgzJK4GKrfRaryVqXY3+mfuJjn3Z1tj7WRRdx11jNZ5XEq13sSGSMyqqRUbWuxGfGiNq/zpT1vciD6NLCKl+olJ1zdRLNxeSPWX507KT1+fx9lV6S9ymNcPOgJ68GqbecAXAXMhoNwnQvFZ8s4qSNr4A1arhYFHNnQjFfLlkAmNhxuGmayVJoorjtkoihGspBVc2GSZRlOEtBXqpJ3fC+Seree60FkOEc97UdeKb7Zk/Scp1wuuKq20EVHse1dY7c9a9s9W+Ta19J6BxV7OznfY7qvx/pxmj/dZ+c4NLTprwBgnxUA9w4A8NmtZR0JQJcAnfuONbDe9q2h70/i0U3HQ9PHHmIjFIzQmCJKUBg1DQcx+zQ8bGbgQRNu5nFLXcc9Fg/S54GtIQ8TjpPRsM04gAJ10dhHYYiC4DAOmLbq+963r5Qlf+a1luJCzEs4TMBMDnpYmyig9gc6sBBpWhwCXcmHMq2xRpYBbSVVrIQsdbgdUreCkOOQJFDHbNKHiYcwmQEmOQLM9fRHmAWiUN+cfFp++VlVwcJUzwAhDIF6TY4xFH5UlgNwBrwHWTqW9b5AmpLSR5TqGhnYiELDRTRAAW1CDAXsPyDqvIRofcJe/a1/k8lxSD9fD7FhPXxT0oY9IHBlpMlUB4WQsuRC+i9Ik+c5fW7SjoG0U2OuScNCa9dr7YXrq2v1ubm6xgyGHA2dJnGB8UTvcNnkgwK2LMac6EQl2jszYM8AmCEWIda+ucB67F4A/0NlPjdg3wDYq3dbMArI4LBJ5QvXV1fmc3Ol5hWX1nsoyGAKm6k/fGl4f4Df6nWIYKcH0j0ZRzjcfYNtYntfssn4Nw==&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>

<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

注意：
- draw.io 导出为SVG格式，再通过图片形式嵌入md，可以得到 mermaid 图的效果，支持复制、超链接

UML图[示例](https://app.diagrams.net/#Uhttps%3A%2F%2Fraw.githubusercontent.com%2Fjgraph%2Fdrawio-github%2Fmaster%2Fdiagram.png)
- 更多[用法](http://jgraph.github.io/drawio-github/self-editing.html)

#### Mermaid

【2022-2-17】Github支持流程图，将绘图插件 [Mermaid](https://github.com/mermaid-js/mermaid) 集成进了 Markdown，并推出了一项「图表绘制」功能。[mermaid](https://github.blog/2022-02-14-include-diagrams-markdown-files-mermaid/)
- Mermaid 是一款受到 Markdown 语法启发而诞生的 JavaScript 图表工具，由开发者 Knut Sveidqvist 所负责维护，目前在 GitHub 已积累 42000 Star
- ![](https://img-blog.csdnimg.cn/img_convert/89c969121aa68a5383158aa891fed248.png)

功能
- 流程图 flowchart
- 序列图 sequence diagram
- 类图 class diagram
- 状态图 state diagram
- 甘特图 Gantt diagram
- 饼图 pie chart
- ER图 ER diagram
- 用户旅行图 user diagram
- git图 Git diagram

编辑方法详见：[官方文档](http://mermaid-js.github.io/mermaid/#/README)

安装方法
- （1）直接用URL链接生成图片（类似draw.io，点击图片即进入原图编辑模式）
  - [mermaid在线编辑](https://mermaid.live/)
  - [![](https://mermaid.ink/img/pako:eNpVj82qwkAMRl8lZOUF-wJdCNdW3QgKuut0EdrUGXR-mKZcpO2736luNKvAOd9HMmLjW8Ycb5GChmupHKT5rQodTS-W-hqybDMdWMB6x88JtquDh177EIy7_bz97SJBMR4XjUG0cff5jYpX_uR4grI6UhAf6k9y_fMT7Cpz1qn-m-jIKbWvOso7yhqKUFCscY2WoyXTprPHJaBQNFtWmKe15Y6GhyhUbk4qDeIvT9dgLnHgNQ6hJeHSUHrYYup99Dz_A1H0VDQ)](https://mermaid.live/edit#pako:eNpVj82qwkAMRl8lZOUF-wJdCNdW3QgKuut0EdrUGXR-mKZcpO2736luNKvAOd9HMmLjW8Ycb5GChmupHKT5rQodTS-W-hqybDMdWMB6x88JtquDh177EIy7_bz97SJBMR4XjUG0cff5jYpX_uR4grI6UhAf6k9y_fMT7Cpz1qn-m-jIKbWvOso7yhqKUFCscY2WoyXTprPHJaBQNFtWmKe15Y6GhyhUbk4qDeIvT9dgLnHgNQ6hJeHSUHrYYup99Dz_A1H0VDQ)
- （2）安装插件，详情：[Jekyll 中 使用 Markdown 画流程图](http://blog.sudoyc.com/2016/09/05/draw-flowchart-in-markdown/)
  - 【2022-9-23】实验失败，插件安装流程失败

```mermaid
  flowchart  TD;
      A-->B;
      A-->C;
      B-->D;
      C-->D;
```

【2022-9-24】亲测通过，不用jekyll插件，改用html的js格式
- ① 添加cdn缓存的js文件到header.html里的< head >内
- ② 使用html里的div来显示流程图

添加：

```html
<!-- 【2022-9-24】 Mermaid CDN -->
<script src="https://cdn.jsdelivr.net/npm/mermaid/dist/mermaid.min.js"></script>
<script>
    mermaid.initialize({ startOnLoad: true });
</script>
```

流程图（flowchart）

Possible FlowChart orientations are:
- TB - top to bottom
- TD - top-down/ same as top to bottom
- BT - bottom to top
- RL - right to left
- LR - left to right

Here is one mermaid diagram:
<div class="mermaid">
    graph TD
    O(开始):::someclass --- A & A1 & A2
    classDef someclass fill:#f96;
    A[矩形框] --> B(圆角矩形)
    B -->|标注| C([椭圆形])
    B --标注--> D[[两边双线边框]]
    B -.-> E[(圆柱体)]
    B -.虚线标注.-> F((圆形))
    B ==>|加粗| G>标签状]
    B ==加粗标注==> H{菱形}
    %%H --> I{{六角形}} %% 与jekyll语法冲突，暂时屏蔽
    H --o J[/平行四边形/]
    H --x K[\平行四边形\]
    H <-->|双向箭头| L[/梯形\]
    H --> M[\梯形/]
    F --> N(((圆形)))
    subgraph 子图
        direction LR
        X --> Y
        style X fill:#f9f,stroke:#333,stroke-width:4px;
        style Y fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5;
    end
</div>

```shell
    graph TD
    O(开始):::someclass --- A & A1 & A2
    classDef someclass fill:#f96;
    A[矩形框] --> B(圆角矩形)
    B -->|标注| C([椭圆形])
    B --标注--> D[[两边双线边框]]
    B -.-> E[(圆柱体)]
    B -.虚线标注.-> F((圆形))
    B ==>|加粗| G>标签状]
    B ==加粗标注==> H{菱形}
    H --> I\{\{六角形\}\}
    H --o J[/平行四边形/]
    H --x K[\平行四边形\]
    H <-->|双向箭头| L[/梯形\]
    H --> M[\梯形/]
    F --> N(((圆形)))
    subgraph 子图
        direction LR
        X --> Y
        style X fill:#f9f,stroke:#333,stroke-width:4px;
        style Y fill:#bbf,stroke:#f66,stroke-width:2px,color:#fff,stroke-dasharray: 5 5;
    end
```

简易模板

<div class="mermaid">
    flowchart LR
    %% 节点颜色
    classDef red fill:#f02;
    classDef green fill:#5CF77B;
    classDef blue fill:#6BE0F7;
    classDef orange fill:#F7CF6B;
    classDef grass fill:#C8D64B;
    %%节点关系定义
    O[(环境)]-->A(自我):::green
    A --> B(本我):::blue
    B --> D
    B --> E
    A --> C(超我):::orange
    C --> F
    subgraph new [大脑结构]
        direction TB
        D(原始皮层,脑干)
        E(古皮层,边缘系统)
        F(新皮层,前额叶)
        D -.->|进化-哺乳动物| E -.->|进化-高级哺乳动物,灵长类| F
    end
</div>

```html
<div class="mermaid">
    flowchart LR
    %% 节点颜色
    classDef red fill:#f02;
    classDef green fill:#5CF77B;
    classDef blue fill:#6BE0F7;
    classDef orange fill:#F7CF6B;
    classDef grass fill:#C8D64B;
    %%节点关系定义
    O[(环境)]-->A(自我):::green
    A --> B(本我):::blue
    B --> D
    B --> E
    A --> C(超我):::orange
    C --> F
    subgraph new [大脑结构]
        direction TB
        D(原始皮层,脑干)
        E(古皮层,边缘系统)
        F(新皮层,前额叶)
        D -.->|进化-哺乳动物| E -.->|进化-高级哺乳动物,灵长类| F
    end
</div>
```

And here is another:
<div class="mermaid">
%% 注释
    graph TD 
    A[Client] -->|tcp_123| B
    B(Load Balancer) 
    B -->|tcp_456| C[Server1] 
    B -->|tcp_456| D[Server2]
</div>

饼图

<div class="mermaid">
pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
</div>

甘特图

<div class="mermaid">
gantt
    title A Gantt Diagram
    dateFormat  YYYY-MM-DD
    section Section
    A task           :a1, 2014-01-01, 30d
    Another task     :after a1  , 20d
    section Another
    Task in sec      :2014-01-12  , 12d
    another task      : 24d
</div>

用户轨迹图

<div class="mermaid">
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me
</div>

[时序图](https://mermaid-js.github.io/mermaid/#/sequenceDiagram)

<div class="mermaid">
sequenceDiagram
    actor Alice
    actor Bob
    Alice->>Bob: Hi Bob
    Bob->>Alice: Hi Alice
</div>

[状态图](https://mermaid-js.github.io/mermaid/#/stateDiagram)

```html
<div class="mermaid">
stateDiagram-v2
    direction LR
    [*] --> 气体
    气体 --> 液体:冷却
    气体 --> 固体:固化
    固体 --> 液体:融化
    液体 --> 固体:凝固
    固体 --> 气体:挥发
    state other {
        direction LR
        a --> b
    }
    气体 --> other
    other --> [*]

    note left of other : 子图包裹
    
    state if_state <<choice>>
    [*] --> IsPositive
    IsPositive --> if_state
    if_state --> False: if n < 0
    if_state --> True : if n >= 0

    note right of IsPositive : 条件判断
</div>
```

以上代码渲染失败，精简如下：

<div class="mermaid">
    stateDiagram-v2
    direction LR
    [*] --> 气体
    气体 --> 液体:冷却
    气体 --> 固体:固化
    固体 --> 液体:融化
    液体 --> 固体:凝固
    固体 --> 气体:挥发

    state other {
        direction LR
        a --> b
    }
    气体 --> other
    other --> [*]

    note left of other : 子图包裹
</div>


#### flowchart

网页格式的流程图编辑：[flow-chart](https://github.com/zhangyuanliang/flowchart), [示例](https://zhangyuanliang.github.io/flowchart/flowchart.html)

SVG实现流程图绘制，前端页面应用：jquery.js/d3.js/ semantic.css; 功能包括：
- 流程图块生成、拖拽、连线
- 放大缩小功能
- 导入导出json数据
- 产生相应的xml和xpdl
- 保存（还未完成，待更新）

flowchart[添加方法](https://www.cnblogs.com/lindexi/p/12086789.html)

```html
<div class="flow">
<textarea class="flowcode">
st=>start: Start 
e=>end           
ldata=>operation: 进入csdn 

st->ldata->e 
</textarea>
</div>
```

### 任务管理

- atlassian家族之[trello](https://trello.com/)，我的[个人trello](https://trello.com/b/ZmU6ki20/%E9%B9%A4%E5%95%B8%E4%B9%9D%E5%A4%A9)
- [我的confluence主页](https://wangqiwen.atlassian.net/wiki/spaces/WQW)


<iframe src='https://trello.com/b/ZmU6ki20/%E9%B9%A4%E5%95%B8%E4%B9%9D%E5%A4%A9' width='750' height='540' frameborder='0' scrolling='no' allowfullscreen="true"></iframe>

### 访问统计

常见统计插件
- Google analytics：谷歌统计
- 百度统计，查看[地址](https://tongji.baidu.com/main/overview/25943928/overview/index)


- 国外的插件

代码

```html
<script type="text/javascript" src="//rf.revolvermaps.com/0/0/1.js?i=5q2837r7gjo&amp;s=265&amp;m=7&amp;v=true&amp;r=false&amp;b=000000&amp;n=false&amp;c=ff0000" async="async"></script>
```

- [不蒜子](http://busuanzi.ibruce.info/) 静态站点统计, 两行代码搞定
- 
![](http://busuanzi.ibruce.info/images/garlic.png)

```html
<script async src="//busuanzi.ibruce.info/busuanzi/2.3/busuanzi.pure.mini.js"></script>
<span id="busuanzi_container_site_pv">本站总访问量<span id="busuanzi_value_site_pv"></span>次</span>
```

### 评论插件

评论插件
- gitment：利用GitHub的issue实现评论功能，已经无人维护
- gitalk：原理类似，维护中
- disqus：国外的评论插件，支持Facebook、twitter、google分享，emoji表情评论（Upvote、Funny、Love、Surprised、Angry、Sad）
- 来必力，源自韩国

【2022-9-28】gitment和gitalk都出现故障，Error: Bad credentials，[gitment帖子](https://github.com/imsun/gitment/issues/145)，[gitalk帖子](https://github.com/gitalk/gitalk/issues/363)

#### 多说

【2022-9-28】已失效

```html
{% if site.duoshuo_shortname %}
<!-- 多说评论框 start -->
<div class="ds-thread" data-thread-key="{{ site.url }}{{ page.url }}" data-title="{{page.title}}" data-url="{{ site.url }}{{ page.url }}"></div>
<!-- 多说评论框 end -->
<!-- 多说公共JS代码 start (一个网页只需插入一次) -->
<script type="text/javascript">
    var duoshuoQuery = {
        short_name: "{{site.duoshuo_shortname}}"
    };
    (function() {
        var ds = document.createElement('script');
        ds.type = 'text/javascript';
        ds.async = true;
        ds.src = (document.location.protocol == 'https:' ? 'https:' : 'http:') + '//static.duoshuo.com/embed.js';
        ds.charset = 'UTF-8';
        (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(ds);
    })();
</script>
<!-- 多说公共JS代码 end -->
{% endif %}
```

#### disqus

- 【2019-04-29】 vpn，通过google账号申请，[disqus评论](https://wqw.disqus.com/admin/install/platforms/jekyll/)

#### 韩国来必力

```html
<!-- 来必力City版安装代码 -->
<div>
    <script type="text/javascript">
           (function(d, s) {
               var j, e = d.getElementsByTagName(s)[0];
               if (typeof LivereTower === 'function') { return; }
               j = d.createElement(s);
               j.src = 'https://cdn-city.livere.com/js/embed.dist.js';
               j.async = true;
               e.parentNode.insertBefore(j, e);
           })(document, 'script');
   </script>
   <noscript> 为正常使用来必力评论功能请激活JavaScript</noscript>
</div>
<!-- City版安装代码已完成 -->
```

#### gitalk

[Gitalk插件](https://gitalk.github.io/?)
- 官方[安装说明](https://github.com/gitalk/gitalk/blob/master/readme-cn.md)
- 【2022-9-27】报错：Error: Bad credentials，官方issue[发帖](https://github.com/gitalk/gitalk/issues/363)

#### [GitMent评论系统](https://frankjkl.github.io/2019/01/08/blogbuild-在Jekyll博客添加gitment评论系统)

本文章转载于http://xichen.pub/2018/01/31/2018-01-31-gitment/，并在其基础上进行完善

##### 1、注册

- 在[setting - OAuth Application 注册页面](https://github.com/settings/applications/new)完成注册

```yaml
Application Name: gitment评论 # 随便填
Homepage Url: https://frankjkl.github.io # 博客的域名
Application description: # 随便填，留空也可以
Authorization Callback URL: https://frankjkl.github.io # 一定要写自己Github Pages的URL
```

注册成功后会得到`Client ID`和`Client Secret`


##### 2、在jekyll博客调用gitment

如gitment项目页Readme所示，在你需要添加评论系统的地方，一般是`_layout/`目录下的 `post.html`, 添加一下代码

```javascript
<div id="container"></div>
<link rel="stylesheet" href="https://jjeejj.github.io/css/gitment.css">
<script src="https://jjeejj.github.io/js/gitment.js"></script>
<script>
var gitment = new Gitment({
  id: '\{\{ page.date \}\}', #对应文章评论所形成issue的label，默认为文章的url,为了防止url过长导致评论初始化失败，这里设置label为文章yaml中的时间。这一项无需更改，\为转义字符，应用时需要删掉
  owner: 'FrankJKL', #Github Pages博客所在的github账户名
  repo: 'FrankJKL.github.io', #Github Pages博客所在仓库名
  oauth: {
    client_id: 'xxxxxxx', #第1步所申请到的Client ID
    client_secret: 'xxxxxxxxxx',#第1步所申请到的Client Secret
  },
})
gitment.render('container')
</script>
```

填写完上面的内容，把代码保存上传到github就可以了。

##### 3、为每篇博文初始化评论系统

由于gitment的原理是为每一篇博文以其YAML中的标题作为标识创建一个github issue， 对该篇博客的评论就是对这个issue的评论。因此，我们需要为每篇博文初始化一下评论系统，初始化后，会在你的github上会创建相对应的issue。

接下来，介绍一下如何初始化评论系统

1. 上面第2步代码添加成功并上传后，你就可以在你的博文页下面看到一个评论框，还有看到以下错误`Error: Comments Not Initialized`，提示该篇博文的评论系统还没初始化
- ![1546944230319](https://frankjkl.github.io/assert/1546944230319.png)
2. 点击`Login with GitHub`后，使用自己的github账号（必须跟第二步owner用户名相同的账号）登录后，就可以在上面错误信息处看到一个`Initialize Comments`的按钮
- ![](https://jacobpan3g.github.io/img/gitment-in-jekyll.png)
3. 点击`Initialize Comments`按钮后，就可以开始对该篇博文开始评论了， 同时也可以在对应的github仓库看到相应的issue
- ![1546944090342](https://frankjkl.github.io/assert/1546944090342.png)

#### 问题

##### Error: Bad credentials

【2022-9-27】gitment和gitalk都出现这种错误提示，暂未解决
- 官方issue[发帖](https://github.com/gitalk/gitalk/issues/363)


##### Error：NOT FOUND

owner或者repo配置错误了，照着第二步来就好，网页端生成后如下

```javascript
<script>
    var gitment = new Gitment({
        id: '\{\{ page.date \}\}', #\为转义字符，应用时需要删掉
        owner: 'FrankJKL',
        repo: 'FrankJKL.github.io',
        oauth: {
            client_id: 'xxxxxxxx',
            client_secret: 'xxxxxxxxxxxxxxxxxxxxxxxxx',
        },
    })
    gitment.render('container')
</script>
```

##### Error: Comments Not Initialized

- 在步骤一中，给`Authorization callback URL`指定的地址错了
- 还没有在该页面的Gitment评论区登陆GitHub账号

##### Object ProgressEvent

最近gitment作者的服务器过期了，所以登陆GitHub时一直报Object ProgressEvent。我在本文第二步添加的gitment代码是没有这个问题的。

解决：

将`_layout/post.html`中gitment的代码：

```javascript
<link rel="stylesheet" href="//imsun.github.io/gitment/style/default.css">
<script src="//imsun.github.io/gitment/dist/gitment.browser.js"></script>
```

修改为

```javascript
<link rel="stylesheet" href="https://jjeejj.github.io/css/gitment.css">
<script src="https://jjeejj.github.io/js/gitment.js"></script>
```

或

```javascript
<link rel="stylesheet" href="https://jjeejj.github.io/css/gitment.css">
<script src="https://www.wenjunjiang.win/js/gitment.js"></script>
```

登陆时就不会再报错了，这是别人新搭建的服务器。参考https://github.com/jjeejj/jjeejj.github.io/issues/8

##### Error：validation failed

**发生时间：**评论的初始化时

原因：由于gitment的评论是基于GitHub issue的，所以评论初始化时，会生成文章对应的issue，以及通过https://jjeejj.github.io/js/gitment.js 生成issue的label。其中的labels有两个，一个是gitment，另一个就是文章的URL，但是label的最大长度限制是50个字符，而我们的URL中包含域名与文章名，有时会超出限制。所以才会发生validation failed

**解决：**

gitment.js中`labels: labels.concat(['gitment', id])`id默认为`window.location.href`也就是文章的URL，这里的id的作用是每篇文章的评论是要根据id动态加载的，写死的话导致所有的文章共享一个issue。参考前面第二步中将id修改为`'\{\{ page.date \}\}'\为转义字符，应用时需要删掉`，就可以覆盖gitment.js中的id。这样传给github issue的label是定长的，不会超过长度限制。同时`date`可以自己写，只要精确到分秒，区分文章不是问题。Good job!

- PS：一个date的例子：`date: 2019-01-07 00:00:00 +0000` 这个date是写到文章顶部的YAML中
- PS：[xjzsq](https://github.com/xjzsq)的方法也很好，思想是用副标题作id，可以看下[他的文章](http://www.xjdesyxx.top/2018/02/07/errsln/)

参考https://github.com/imsun/gitment/issues/118


### 分享插件

- 评论插件 [Share.js](https://github.com/overtrue/share.js/)，一键分享到微博、QQ空间、QQ好友、微信、腾讯微博、豆瓣、Facebook、Twitter、Linkedin、Google+、点点等
- ![](https://cloud.githubusercontent.com/assets/1472352/11433126/05f8b0e0-94f4-11e5-9fca-74dc9d1b633f.png)


- 采用百度分享

```html
<div class="bdsharebuttonbox">
    <a href="#" class="bds_more" data-cmd="more"></a>
    <a href="#" class="bds_weixin" data-cmd="weixin" title="分享到微信"></a>
    <a href="#" class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a>
    <a href="#" class="bds_tsina" data-cmd="tsina" title="分享到新浪微博"></a>
    <a href="#" class="bds_tqq" data-cmd="tqq" title="分享到腾讯微博"></a>
</div>
<script>window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"鹤啸九天的技术博客","bdMini":"2","bdMiniList":false,"bdPic":"http://news.zx123.cn/uploadfile/news68/1800961ad02811e7b1c400163e010ef1.jpg","bdStyle":"0","bdSize":"32"},"share":{},"image":{"viewList":["qzone","tsina","tqq","renren","weixin"],"viewText":"分享到：","viewSize":"32"},"selectShare":{"bdContainerClass":null,"bdSelectMiniList":["qzone","tsina","tqq","renren","weixin"]}};with(document)0[(getElementsByTagName('head')[0]||body).appendChild(createElement('script')).src='http://bdimg.share.baidu.com/static/api/js/share.js?v=89860593.js?cdnversion='+~(-new Date()/36e5)];
</script>
```
- 【2019-11-05】直接使用[Share工具](https://github.com/overtrue/share.js), 添加以下代码即可
- ![](https://cloud.githubusercontent.com/assets/1472352/11433126/05f8b0e0-94f4-11e5-9fca-74dc9d1b633f.png)

```html
<!-- https://github.com/overtrue/share.js -->
<div class="social-share"></div>
<!--  css & js -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/css/share.min.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/social-share.js/1.0.16/js/social-share.min.js"></script>
```


### 打赏

- 参考：[jekyll下添加打赏功能](http://www.twistedwg.com/2018/05/06/jekyll-reward.html)
- 步骤：
   - 下载css文件，保存到jekyll里的css/myrewards.css
   - 准备支付二维码图片，放到自定义文件夹里，如wqw/fig/wqw.png
   - _include/head.html添加css文件：（注意：需要修改主目录地址）
   
```html
<link href="{{ "/css/myreward.css " | prepend: site.baseurl }}" rel="stylesheet" type="text/css">
_layout/post.html添加插件
    <!-- 【2019-08-06】打赏功能,  http://www.twistedwg.com/2018/05/06/jekyll-reward.html-->
    <div class="reward">
		<div class="reward-button">赏 <span class="reward-code">
			<span class="alipay-code"> <img class="alipay-img wdp-appear" src="/assets/wqw/fig/alipay.png"><b>支付宝打赏</b> </span>
			<span class="wechat-code"> <img class="wechat-img wdp-appear" src="/assets/wqw/fig/wechatpay.png"><b>微信打赏</b> </span> </span>
		</div>
		<p class="reward-notice">您的打赏是对我最大的鼓励！</p>
	</div>
```

### 文档搜索

- [Jekyll 静态博客实现搜索功能](https://juejin.im/post/5aa7d9c6f265da23866f918e)
   - 提前安装[Simple-Jekyll-Search](https://github.com/christian-fei/Simple-Jekyll-Search)
![](https://user-gold-cdn.xitu.io/2018/3/13/1621faaa92d3cae7?imageslim)


### 加地图插件

【2022-9-28】[百度地图开放平台](https://lbsyun.baidu.com/apiconsole/key#/home)，申请、查看自己的api密钥 ak，[JavaScript API GL使用指南](https://lbs.baidu.com/index.php?title=jspopularGL)
- 百度地图JavaScript API GL 是一套由JavaScript语言编写的应用程序接口，使用了WebGL对地图、覆盖物等进行渲染，支持3D视角展示地图。帮助开发者在网站中构建功能丰富、交互性强的地图应用，支持PC端和移动端基于浏览器的地图应用开发。JavaScript API GL提供了丰富的功能接口，包括地图展示、定位、覆盖物、检索、路线规划等，适配多样化的业务场景

jekyll 插件安装失败
- 注意：百度api地址用https，而不是http！要不然jekyll加载时会不显示，因为主站用https，不允许外部api用http，不安全

示例代码

```html
<!-- [2022-09-28]百度地图插件 -->
<html>
<head>
<style type="text/css">
    body, html,#allmap {width: 100%;height: 80%;overflow: hidden;margin:0;font-family:"微软雅黑";}
</style>
<script type="text/javascript" src="https://api.map.baidu.com/api?type=webgl&v=1.0&ak=cSFvkPGbNRbd3vxO30IotLEk"></script>
</head>

<body>
    <div id="allmap"></div>	
</body>
</html>
<script type="text/javascript">
    // GL版命名空间为BMapGL
    // 按住鼠标右键，修改倾斜角和角度
	var map = new BMapGL.Map("allmap");    // 创建Map实例
	map.centerAndZoom(new BMapGL.Point(116.280190, 40.049191), 19);  // 初始化地图,设置中心点坐标和地图级别
	map.enableScrollWheelZoom(true);     //开启鼠标滚轮缩放
	map.setHeading(64.5);
	map.setTilt(73);
</script>
```

使用
- 跟其他插件一样放在 includes 中，tool_map.html，会导致本页面无法渲染，原因未知
- 解决：将tool_map.html挪到外面（wqw/demo/tool_map.html），当做独立页面，通过iframe方式嵌入


```html
<!-- 使用  -->
<iframe src="{{ site.url }}/wqw/demo/tool_map.html" width='100%' height='100%' frameborder='0' scrolling='no' allowfullscreen="true"></iframe>
```

效果：

<iframe src="{{ site.url }}/wqw/demo/tool_map.html" width='100%' height='100%' frameborder='0' scrolling='no' allowfullscreen="true"></iframe>

### 博客导流公众号

【2022-9-10】openwrite提供的[博客导流公众号工具](https://openwrite.cn/guide/readmore/readmore.html)
- 整合后的博客文章内容将自动隐藏一半，同时显示“阅读全文”按钮(重点：虽然隐藏，但只是视觉上的，并不影响SEO)：
- ![](https://openwrite.cn/readmore/readmore-5.png)
- ![](https://openwrite.cn/images/202206/readmore/1654941000718.png)

### Markdown写作

- 制作文档
   - [readthedocs](https://readthedocs.org/)，使用最广的文档服务，如Scrapy 文档，支持Restructed和Markdown语言，其Markdown支持通过mkdocs来实现
- 制作电子书
   - [gitbook](https://www.gitbook.com/)，利用Markdown写电子书的工具，并提供免费托管
- 转ppt，常用工具：
   - [reveal.js](https://github.com/hakimel/reveal.js), [Demo](http://lab.hakim.se/reveal-js/#/)
   - [landslide](https://github.com/adamzap/landslide), [Demo](http://adamzap.com/misc/presentation.html#slide1)
- 万能格式转换工具：[Pandoc](https://pandoc.org/)

```shell
pip install landslide # 下载
landslide readme.md -i -o > slide.html # 转换
```

- 更多资料：[Markdown：让书写更美好](https://huwenchao.gitbooks.io/web-development-notes/content/workflow/markdown.html)

### html→markdown

- 看到一篇好文章，想发布到markdown博客上，结果，图片太多，人肉代价大
- 【2020-7-5】可以使用富文本编辑器：[ueditor2markdown](https://www.bejson.com/convert/ueditor2markdown/)转换，复制→粘贴→微调


### SEO优化

[Jekyll-seo-tag](https://jekyll.github.io/jekyll-seo-tag/)
- A Jekyll plugin to add metadata tags for search engines and social networks to better index and display your site's content.

Jekyll SEO Tag adds the following meta tags to your site:
- Page title, with site title or description appended
- Page description
- Canonical URL
- Next and previous URLs on paginated pages
- JSON-LD Site and post metadata for richer indexing
- Open Graph title, description, site title, and URL (for Facebook, LinkedIn, etc.)
- Twitter Summary Card metadata
- While you could theoretically add the necessary metadata tags yourself, Jekyll SEO Tag provides a battle-tested template of crowdsourced best-practices.

【2022-9-22】_config.yml文件 添加

```yaml
	plugins:
- jekyll-paginate
- jekyll-seo-tag
```

_includes文件夹下 head.html文件在 </head>之前添加
- \{\% seo \%\}


## Jekyll语法

- [Jekyll 语法简单笔记](http://github.tiankonguse.com/blog/2014/11/10/jekyll-study.html)
- 【2018-6-10】[github page jeklly主题](https://github.com/Gaohaoyang/gaohaoyang.github.io/blob/master/README-zh-cn.md)
- 【2021-4-16】[GitHub Pages 与 Gitee Pages 上的 Jekyll](https://www.cnblogs.com/xjtu-blacksmith/p/jekyll-of-pages.html)
- 【2019-04-29】[Jeklly主题大全](http://jekyllthemes.org/)
- [Jekyll](https://jekyllrb.com/)中的配置和模板语法

## Jekyll目录结构

jekyll结构

```s
|-- _config.yml
|-- _includes
|-- _layouts
|   |-- default.html
|   `-- post.html
|-- _posts
|   |-- 2007-10-29-why-every-programmer-should-play-nethack.textile
|   `-- 2009-04-26-barcamp-boston-4-roundup.textile
|-- _site
`-- index.html
```

- _config.yml 配置文件，最为重要，包含了所有配置信息
  - title: Blog名称
  - subtitle: 副标题
  - description: Blog的描述
  - author: Blog拥有者
- _includes 文件夹包含了将被反复利用的文件，比如footer，header
  - 可复用的模块，方便通过{ % include file.ext %}（去掉前两个{中或者{与%中的空格，下同）灵活的调用。
- _layouts 文件夹包含了主页面的排版布局, \{\{ content \}\}标记用来将数据插入到这些模板中来
- _posts 文件夹将包含所有的日志文件，Markdown格式

将编辑好的markdown文件放到_post目录下,运行命令：
- jekyll build  -- 将文本转换成静态Blog，生成在_site目录下
- jekyll serve -- 本地运行服务，可以在localhost:4000 中看到自己Blog的效果，方便调试。

## 搭建过程

在jekyll的官网上 [http://jekyllrb.com/](http://jekyllrb.com/) 其实已经说得比较明白了，我在这里还是简单的说一下吧。我用的是Windows系统。    
主要环节有：安装Ruby，安装RubyGems，安装jekyll，安装代码高亮插件，安装node.js

### 安装Ruby

- ruby官网下载安装：[https://www.ruby-lang.org/en/downloads/](https://www.ruby-lang.org/en/downloads/)
- 安装完成后配置环境变量
- 在命令提示符中，得到ruby版本号，如下图，即安装成功

![](http://ww4.sinaimg.cn/large/7011d6cfjw1f2ue0e393vj20cu00t748.jpg)

### 安装RubyGems

官网下载 [http://rubygems.org/pages/download](http://rubygems.org/pages/download) rubygems-2.4.5.zip   

cd到RubyGems目录   
- ![](http://ww1.sinaimg.cn/large/7011d6cfjw1f2ue1l2yscj20gk02amxj.jpg)

执行安装   
- ![](http://ww1.sinaimg.cn/large/7011d6cfjw1f2ue1w8eqnj20bx00hglg.jpg)  

### 用RubyGems安装Jekyll

执行下面的语句安装   
- ![](http://ww4.sinaimg.cn/large/7011d6cfjw1f2ue2g2p3uj207x00ft8j.jpg)

安装结束画面   
- ![](http://ww4.sinaimg.cn/large/7011d6cfjw1f2ue32drwhj20hv09xq5m.jpg)

至此jekyll就已经安装完毕了，后续就是个性化的自己设定了。

### 创建博客

在d盘新建一个工作区jekyllWorkspace

cd到jekyllWorkspace   

执行jekyll new name创建新的工作区   
- ![](http://ww3.sinaimg.cn/large/7011d6cfjw1f2ue3lt31nj20cj02nt8u.jpg)

文件结构如下：
- ![](http://ww1.sinaimg.cn/large/7011d6cfjw1f2ue3ujsybj20ek06wabh.jpg)

cd到博客文件夹，开启服务器   
- ![](http://ww1.sinaimg.cn/large/7011d6cfjw1f2ue47y9lgj20ao00f0sl.jpg)

watch为了检测文件夹内的变化，即修改后不需要重新启动jekyll

我的环境下启动报错(你的可能没有)，再安装yajl-ruby和rouge  
- ![](http://ww4.sinaimg.cn/large/7011d6cfjw1f2ue4nelnxj20dd077q49.jpg)

再次启动服务器成功
- ![](http://ww4.sinaimg.cn/large/7011d6cfjw1f2ue4v42koj20g505bdgy.jpg)

访问 http://localhost:4000/   
- ![](http://ww1.sinaimg.cn/large/7011d6cfjw1f2ue56ckwoj20je0eumz3.jpg)

详细文章页面   
- ![](http://ww2.sinaimg.cn/large/7011d6cfjw1f2ue5f3j9cj20je0gyq7a.jpg)

## 后续

*  整个安装过程参考了jekyll官网，注意jekyll还有一个简体中文官网，不过比较坑（我就被坑了），有些内容没有翻译过来，有可能会走弯路，建议如果想看中文的相关资料，也要中英对照着阅读。[jekyll中文网 http://jekyllcn.com](http://jekyllcn.com), [jekyll英文网 http://jekyllrb.com](http://jekyllrb.com)
*  jekyll中的css是用sass写的，当然直接在`_sass/_layout.scss`中添加css也是可以的。
*  本文是用Markdown格式来写的，相关语法可参考： [Markdown 语法说明 (简体中文版) http://wowubuntu.com/markdown/](http://wowubuntu.com/markdown/)  
*  按照本文的说明搭建完博客后，用`github Pages`托管就可以看到了。注意，在github上面好像不支持rouge，所以要push到github上时，我将配置文件_config.yml中的代码高亮改变为`highlighter: pygments`就可以了
*  博客默认是没有评论系统的，本文的评论系统使用了多说，详细安装办法可访问[多说官网 http://duoshuo.com/](http://duoshuo.com/)，当然也可以使用[搜狐畅言 http://changyan.sohu.com/](http://changyan.sohu.com/)作为评论系统。
*  也可以绑定自己的域名，如果没有域名，可以在[godaddy http://www.godaddy.com/](http://www.godaddy.com/)上将域名放入购物车等待降价，买之。
*  祝各位新年快乐！

---

## 可能出现的问题

### 个别文章不显示

【2022-8-31】新增一篇文章，部署正常，但是迟迟不显示，[My Github page failed to deploy fully](https://github.com/orgs/community/discussions/31491#discussioncomment-3523380)
- Today, I extracted some paragraphs from one post, and merged into a new post
  - The original page: [dm-note](https://github.com/wqw547243068/wqw547243068.github.io/blob/master/_posts/2013-07-31-dm-note.md)
  - The newly created page: [regression](https://github.com/wqw547243068/wqw547243068.github.io/blob/master/_posts/2022-08-31-regression.md)
- Both pages are <font color='red'> deployed correctly,</font> the [old one](https://wqw547243068.github.io/2013/07/31/dm-note) is displayed normally, but the newly [created page](https://wqw547243068.github.io/2022/08/31/regression) is <font color='red'>never displayed</font>
- 去GitHub社区发帖咨询，热心网友[airtower-luna](https://github.com/airtower-luna)定位到问题
- 文章日期早于发布时间，导致文章不显示
  - The [build log](https://github.com/wqw547243068/wqw547243068.github.io/runs/8114786643?check_suite_focus=true#step:4:187) tells you why: Indeed the date listed in the file metadata is over 2h from now (2022-08-31 14:40 UTC):
  - date: 2022-08-31 17:02:00
  - Adjust the date to one that's in the past, or redeploy after the time has passed.


### 页面无法加载（模板语言冲突）

【2021-7-25】web-server博客文章中，新增了flask模板代码，导致文章无法加载，github page显示出错，tag语法冲突
- 解决方法：将原本挨着的大括号和百分号分隔开即可。{ % if user % }

### `hitimes/hitimes (LoadError)`

**错误代码：**

```
C:/Ruby22/lib/ruby/2.2.0/rubygems/core_ext/kernel_require.rb:54:in `require': cannot load such file -- hitimes/hitimes (LoadError)
```

**解决方法：**

在stackoverflow上又一个很好的解决方法。[hitimes require error when running jekyll serve on windows 8.1](http://stackoverflow.com/questions/28985481/hitimes-require-error-when-running-jekyll-serve-on-windows-8-1) 虽然上面的题主问的是 win 8.1 系统下的情况，但是同样适用于 win7。下面我简单翻译一下错误原因和解决方法。

> 可能是 Ruby 2.2 和 hitimes-1.2.2-x86-mingw32 中有一些 ABI 变化，少了一些相关的类库。
>
> 所以卸载 hitimes 并通过 `--platform ruby` 重装即可。代码如下：

```
gem uni hitimes
**Remove ALL versions**
gem ins hitimes -v 1.2.1 --platform ruby
```

> 然后将自动重新编译 hitimes 并适用于 Ruby 2.2

下面是我自己的卸载和安装过程：

```
E:\GitWorkSpace\gaohaoyang.github.io>gem uni hitimes

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
1 gem installed
```


关于，[hitimes](https://rubygems.org/gems/hitimes/versions/1.2.2) 是一个快速的高效的定时器解决方案库，详情可以去官网查看。



