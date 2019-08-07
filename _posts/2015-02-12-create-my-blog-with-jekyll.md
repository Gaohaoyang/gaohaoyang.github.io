---
layout: post
title:  "Jekyll静态博客编辑功能汇总"
date:   2015-02-15 22:14:54
categories: jekyll
excerpt: "jekyll用法汇总"
tags: jekyll RubyGems
---

* content
{:toc}

## 简介

- 使用jekyll搭建github静态页面
- 汇总各类小技巧

## 技巧汇总

### 编辑功能
- 注释

> 注释在此。。。

- 代码高亮

```python
import os
print "hello"
```
- 字体大小
   - <font size=2>二号字尺寸式样 </font> 
- **加粗**, *斜体*
- <font color='green'>彩色字体</font>


### 图片嵌入

- 默认方法
   - ![](https://img3.doubanio.com/lpic/s28012945.jpg)
- 限制大小
   - <img src="https://img3.doubanio.com/lpic/s28012945.jpg" height="100%" width="100" />

### Markdown使用
* [github官方markdown指南](https://guides.github.com/features/mastering-markdown/ "英文版")
* [github readme语法简介](http://blog.csdn.net/guodongxiaren/article/details/23690801?utm_source=tuicool&utm_medium=referral "跟一般markdown语法不同")
* [MarkDown语法笔记（完整版）](http://blog.csdn.net/witnessai1/article/details/52551362)
* [马克飞象markdown语法在线测试](https://maxiang.io/ "可以在线测试MD语言！")


### 公式嵌入
* [Latex在线调试](https://latexbase.com/)，[吴文中数学公式编辑器](http://latex.91maths.com/)，公式在线编辑，所见所得，支持图片输出
* github自带公式显示
$$f \left( x _ { n + 1 } \right) - f \left( x _ { n } \right) = f ^ { \prime } \left( x _ { n } \right) \left( x _ { n + 1 } - x _ { n } \right)$$
- 知乎提供公式生成图片服务：https://www.zhihu.com/equation?tex=y+%3D+%5Cphi%28%5Csum+W_%7Bij%7DX_j+%2B+b%29+
![](https://www.zhihu.com/equation?tex=y+%3D+%5Cphi%28%5Csum+W_%7Bij%7DX_j+%2B+b%29+)

### 视屏嵌入
---
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


---

### 脑图嵌入
- processon

<iframe id="embed_dom" name="embed_dom" frameborder="0" style="display:block;width:700px; height:900px;" src="https://www.processon.com/embed/mind/581dee8ee4b0c6fe57213cd9"></iframe>

- xmind脑图
   - 【2019-08-02】[xmind图](https://www.xmind.net/m/YPMsKe/#)
   
```html
<iframe src='https://www.xmind.net/embed/YPMsKe/' width='750' height='540' frameborder='0' scrolling='no' allowfullscreen="true"></iframe>
```

<iframe src='https://www.xmind.net/embed/T9Nm/' width='750' height='540' frameborder='0' scrolling='no' allowfullscreen="true"></iframe>

### 访问统计
- 国外的插件

代码

```html
<script type="text/javascript" src="//rf.revolvermaps.com/0/0/1.js?i=5q2837r7gjo&amp;s=265&amp;m=7&amp;v=true&amp;r=false&amp;b=000000&amp;n=false&amp;c=ff0000" async="async"></script>
```

### 评论插件

- 来必力

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

### 分享插件

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


## Jekyll语法

- [Jekyll 语法简单笔记](http://github.tiankonguse.com/blog/2014/11/10/jekyll-study.html)
- 【2018-6-10】[github page jeklly主题](https://github.com/Gaohaoyang/gaohaoyang.github.io/blob/master/README-zh-cn.md)
- 【2019-04-29】[Jeklly主题大全](http://jekyllthemes.org/)

# [Jekyll](https://jekyllrb.com/)中的配置和模板语法

## 配置
- [Jekyll 语法简单笔记](http://github.tiankonguse.com/blog/2014/11/10/jekyll-study.html)

### 文件介绍

**_config.yml**

Jekyll 的全局配置文件。  
比如网站的名字，网站的域名，网站的链接格式等等。

**_drafts**

未发布的 posts 存放的地方，这里的 post 文件名不需要加日期标记。

**_includes**

该目录下的文件内容是最终要放进模版文件中的一些代码片段。  
对于网站的头部，底部，侧栏等公共部分，为了维护方便，我们可能想提取出来单独编写，然后使用的时候包含进去即可。  
这时我们可以把那些公共部分放在这个目录下，使用时只需要引入即可。

```ruby
{ % include filename % }
```

**_layouts**

存放一些模版文件，模版是用来包含并装饰 page 或 post 内容的。Jekyll 的模版使用 HTML 语法来写，并包含 [YAML](http://en.wikipedia.org/wiki/Yaml "一个几乎所有编程语言都支持的易读的数据序列化（ Serialization ) 标准") Front Matter。  
所有的模版都可用 Liquid 来与网站进行交互，都可以使用全局变量 site 和 page 。

site 变量: 包含该网站所有可以接触得到的内容和元数据(meta-data)  
page 变量: 包含的是当前渲染的page或post的所有可以接触得到的数据

对于网站的布局，一般会写成模板的形式，这样对于写实质性的内容时，比如文章，只需要专心写文章的内容，然后加个标签指定用哪个模板即可。  
对于内容，指定模板了模板后,我们可以称内容是模板的儿子。  
为什么这样说呢？ 因为这个模板时可以多层嵌套的，内容实际上模板，只不过是叶子节点而已。

在模板中，引入儿子的内容：

```
{ { content } }
```

在儿子中，指定父节点模板：

> 注意，必须在子节点的顶部。

```markdown
---
layout: post
---
```

**_posts**

发布的内容，比如博客文章，常放在这里面，而且一般作为叶子节点。  
文件的命名必须遵循：`YEAR-MONTH-DAY-title.markdown`。

另外，所有放在根目录下并且不以下划线开头的文件夹中有格式的文件都会被 Jekyll 处理成 page。  
这里说的有格式是指含有 YAML Front Matter 头部的文件。

所有的 post 和 page 都要用 markdown 或者 texile 或者 HTML 语法来写，可以包含 Liquid 模版的语法。而且必须要有 YAML Front Matter 头部( Jekyll 只处理具有 YAML Front Matter 的文件)。

YAML Front Matter 必须放在文件的开头，一对`---`之间，用户可在这一对`---`间设置预先定义的变量或用户自己的数据。具体看下面的 [说明](#frontmatter)。

**_data**

Jekyll 支持从该目录中加载 YAML、 JSON、 和 CSV 格式（`.yml`、`yaml`、`json`或`csv`扩展名）的文件数据。用于配置一些全局变量，不过数据比较多，所以放在这里。  
比如，多人参与网站开发，我们通常会在这里面定义一个*members.yml*文件。

例如文件内容为：

```
- name: Tom Preston-Werner
  github: mojombo

- name: Parker Moore
  github: parkr
```

然后在模板中我们就可以通过`site.data.members`(注意：文件名决定变量名)使用这些数据。

```
<ul>
{ % for member in site.data.members % }
  <li>
    <a href="https://github.com/{ { member.github } }">
      { { member.name } }
    </a>
  </li>
{ % endfor % }
</ul>
```

**_site**

Jekyll 生成的网页默认输出的地方，一般需要在`.gitignore`中屏蔽掉这个目录。

**index.html**

主页文件，后缀有时也用 `index.md` 等。  
这个需要根据自己的需要来写，因为不同的格式之间在某些情况下还是有一些细微的差别的。

**其他静态资源**

对于其他静态资源，可以直接放在根目录或任何其他目录，然后路径和平常的网站一样，按路径来找链接中的文件。

## 配置全局变量

虽然全局变量都有自己的 [默认配置](http://jekyllrb.com/docs/configuration/)，但是我们往往会手动配置为自己心中最好的效果。  
另外，一些全局变量既可以在配置文件中设置，也可以在命令行选项参数里指定。

> 注意，配置不用使用 tab，否则可能会忽略那条命令。

### 源代码的位置

这个一般不配置，默认即可。

```
source: DIR
```

当然编译的时候也可以指定，但是使用 github 我们是不能指定参数的。

```
-s, --source DIR
```

### 输出网站位置

这个一般也是默认。

```
# 编译参数 -d, --destination DIR
destination: DIR #配置语法
```

### Safe 开关

官方文档上就一句话：

```
Disable custom plugins, and ignore symbolic links.
```

大概意思是禁用常用的插件，忽略符号链接。

```
# 编译参数  --safe
safe: BOOL
```

### Base URL

将 Jekyll 生成的网站内容放置在域名的子路径下面。

我们经常需要在多个地方运行 Jekyll，如发布到 GitHub Pages 前在本地预览下网站。`--baseurl`标记就是为此而生的。

首先在`_config.yml`文件添加`baseurl`，然后在网站各个链接的地方加前缀`{{site.baseurl}}`。  
当`jekyll serve`预览本地网站时，在本地域名后追加`--baseurl`的值（类似`/`这样的路径）。

```
# baseurl: "/blog"  编译参数: --baseurl URL
baseurl: URL
```

注意：所有的 page 和 post 的 URL 都是以斜线`/`领头，那么当`site.baseurl=/`时，连接的 URL 会出现两个重复的`/`而破坏超链接。因此，建议只在`baseurl`有具体值时才使用`site.baseurl`给 URL 加前缀。

### 忽略文件

这个很有用，有时候你写了一个文件，里面的一个东西可能会被 Jekyll 处理，但是你不想让 Jekyll 处理的话，就使用这个语法忽略那些文件。

```
exclude: [DIR, FILE, ...]
```

### 强制处理文件

有时候我们的一些文件的名字由于不在 Jekyll 处理的文件名字范围内，这时候就需要强制处理这些文件了。比如`.htaccess`文件。

```
# include: [".htaccess"]
include: [DIR, FILE, ...]
```

### 时区

模板中经常会对时间进行转换，这个时候如果至指定时区的话，可能得到的时间会和我们想要的时间错几个小时。在 [这里](http://en.wikipedia.org/wiki/List_of_tz_database_time_zones) 能查看到可用的值。

```
# timezone: Asia/Shanghai
timezone: TIMEZONE
```

### 编码

大家都是程序员，就不用多说了。  
执行`ruby-e'puts Encoding::list.join("\n")'`可列出本地 Ruby 可用的编码。

```
# encoding : utf-8
encoding: ENCODING
```

### 文章链接格式

我们可以自定义 Post 的 URL 格式，通过 `permalink` 来配置。比如：

```
# 设定 permalink 取值
permalink: /:year/:month/:day/:title.html
# 那么 post: 2014-10-19-slap-chop.md 最终输出的路径 URL 变成
# /2014/10/19/slap-chop.html

permalink: /:month-:day-:year/:title  # => /04-29-2009/slap-chop/index.html

permalink: pretty    # => /2009/04/29/slap-chop/index.html
```

另外，还有3种内置的链接格式可以使用：

| PERMALINK STYLE | URL TEMPLATE                                 |
| --------------- | -------------------------------------------- |
| **date**        | `/:categories/:year/:month/:day/:title.html` |
| **pretty**      | `/:categories/:year/:month/:day/:title/`     |
| **none**        | `/:categories/:title.html`                   |

### 分页

通常我们都不想把所有的 Post 都放在一页显示，而是要分成多页显示。好在 Jekyll 支持分页显示，通过`paginate`和`paginate_path`两个变量来设置每页显示的数量和分页 HTML 的 URL 路径。

```
paginate: 5
paginate_path: "blog/page:num/"
```

根据上面的配置，Jekyll 会读取`blog/index.html`文件，把每页赋值给全局变量`paginator`，并输出 HTML 分页文件，如：第2页为`blog/page2/index.html`。其中，“page” 是字符常量，变量`:num`是分页的页码，自动**从 2 开始编码**，因此在罗列所有页面页码及它们的超链接时要注意一下，首页链接没有中间的 “page1” 路径。  
通过`paginator`的[**相关属性**](http://alfred-sun.github.io/atom.xml#pagination)我们可以实现在不同页间切换。

```
<!-- This loops through the paginated posts -->
{% for post in paginator.posts %}
  <h1><a href="http://alfred-sun.github.io/blog/2015/01/10/jekyll-liquid-syntax-documentation/{{ post.url }}">{{ post.title }}</a></h1>
  <p><span class="date">{{ post.date }}</span></p>
  <div class="content">
    {{ post.content }}
  </div>
{% endfor %}

<!-- Pagination links -->
<div class="pagination">
  {% if paginator.previous_page %}
    <a href="http://alfred-sun.github.io/blog/2015/01/10/jekyll-liquid-syntax-documentation/{{ paginator.previous_page_path }}" class="previous">Previous</a>
  {% else %}
    <span class="previous">Previous</span>
  {% endif %}
  <span class="page_number ">Page: {{ paginator.page }} of {{ paginator.total_pages }}</span>
  {% if paginator.next_page %}
    <a href="http://alfred-sun.github.io/blog/2015/01/10/jekyll-liquid-syntax-documentation/{{ paginator.next_page_path }}" class="next">Next</a>
  {% else %}
    <span class="next ">Next</span>
  {% endif %}
</div>
```

### 默认值设定

设置 YAML Front Matter 变量的默认值。  
写 post 时，经常需要在每篇文章的 YAML 头部设定一些相同的变量使用，比如：`author`、`layout`等。为了避免这些不必要的重复性操作，我们可以在配置文件中设定他们的默认值；  
同时在必要的时候，还可以对具体文件设定头部变量，覆盖其默认值。下面很快就会说这点。

```
# In _config.yml, set the layout and author for files where the type is "posts".
# And any html files that exist in the "projects/" folder will use the "project" layout, if it exists.
...
defaults:
  -
    scope:
      path: ""      # an empty string here means all files in the project
      type: "posts" # previously `post` in Jekyll 2.2.
    values:
      layout: "post"
      author: "Alfred Sun"
  -
    scope:
      path: "projects"
      type: "pages"     # previously `page` in Jekyll 2.2.
    values:
      layout: "project" # overrides previous default layout
```

## Jekyll 模板、变量

Jekyll 模板实际上分两部分：一部分是头部定义，另一部分是[Liquid 语法](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)。

### 头部定义

主要用于指定模板(layout)和定义一些变量，比如：标题(title)、描述(description)、标签(tags)、分类(category/categories)、是否发布(published)，以及其他自定义的变量。

```
---
layout:     post   # 指定使用的模板文件，“_layout” 目录下的模板文件名决定变量名
title:      title  # 文章的标题
date:       date   # 覆盖文章名中的日期
category:   blog   # 文章的类别
description: description
published:  true   # default true 设置 “false” 后，文章不会显示
permalink:  /:categories/:year/:month/:day/:title.html  # 覆盖全局变量设定的文章发布格式
---
```

注意：如果文本文件使用的是`utf-8`编码，那么必须确保文件中不存在`BOM`头部字符，尤其是当 Jekyll 运行在 Windows 平台上。

### 使用变量

关于 Jekyll 的变量，可以参考[官方说明](http://jekyllrb.com/docs/variables/)  
上面文章页面中定义的头部变量，需要使用下面的语法获得：

```
page.title
```

这些自定义的变量将会被传递给 Liquid 模板引擎用于转换文本文件，例如，你可以用上面定义的 “title” 变量在 layout 中设置页面的标题：

```
<!DOCTYPE HTML>
<html>
  <head>
    <title>{{ page.title }}</title>
  </head>
  <body>
   ...
  </body>
</html>
```

所有的变量都是一个树节点，比如：page 就是当前页面的根节点。

其中全局根结点有：

- **site**：`_config.yml`中配置的信息
- **page**： 页面的配置信息，包括 YAML 中定义的变量
- **content**： 用在模板文件中，该变量包含页面的子视图，用于引入子节点的内容；不能在 post 和 page 文件中使用
- **paginator**： 分页信息，需要事先设定 site 中的`paginate`值，参考[Pagination](http://jekyllrb.com/docs/pagination/)

注意：`post`变量仅作用于`for`循环内部，如`{ % forpostinsite--.posts % }`。假如需要访问当前正在渲染的文章页面的变量，就要用`page`变量代替 post 对象。比如，post 的 title 变量，要通过`page.title`来访问。

#### site 下的变量

| 变量                        | 描述                                                                       |
| ------------------------- | ------------------------------------------------------------------------ |
| site.time                 | 当前的时间(运行 Jekyll 时的时间)                                                    |
| site.pages                | 所有页面列表                                                                   |
| site.posts                | 按时间逆序排列的所有文章列表                                                           |
| site.related_posts        | 如果当前被处理的页面是一个 post 文件，那这个变量是一个包含了最多10篇相关的文章列表                            |
| site.static_files         | 所有静态文件的列表(如：没有被 Jekyll 处理的文件)，每个文件有3个属性：`path`、`modified_time`和`extname` |
| site.html_pages           | 所有 HTML 页面列表                                                             |
| site.collections          | 自定义的对象集合列表，参考[Collections](http://jekyllrb.com/docs/collections/)        |
| site.data                 | _data 目录下 YAML 文件的数据列表                                                   |
| site.documents            | 所有 Collections 里面的文档列表                                                   |
| site.categories.CATEGORY  | 所有在 CATEGORY 类别下的 post 列表                                                |
| site.tags.TAG             | 所有在 TAG 标签下的 post 列表                                                     |
| site.[CONFIGURATION_DATA] | 其他自定义的变量                                                                 |

#### page 下的变量

| 变量              | 描述                                                                          |
| --------------- | --------------------------------------------------------------------------- |
| page.content    | 页面的内容                                                                       |
| page.title      | 页面的标题                                                                       |
| page.excerpt    | 未渲染的摘要                                                                      |
| page.url        | 不带域名的页面链接，如：`/2008/12/14/my-post.html`                                      |
| page.date       | 指定每一篇 post 的时间，可在 post 的 front matter 里覆盖这个值，格式是：`date:YYYY-MM-DD HH:MM:SS` |
| page.id         | 每一篇 post 的唯一标示符(在RSS中非常有用)，如：`/2008/12/14/my-post`                          |
| page.categories | post 隶属的一个分类列表，可在 YAML 头部指定                                                 |
| page.tags       | post 隶属的一个标签列表，可在 YAML 头部指定                                                 |
| page.path       | 页面的源码地址                                                                     |
| page.next       | 按时间顺序排列的下一篇文章                                                               |
| page.previous   | 按时间顺序排列的上一篇文章                                                               |

#### paginator 下的变量

分页只在 index 页面中有效，index 页面可以在子目录里，比如：主页在`/blog/index.html`，那么通过配置`paginate_path:"blog/page:num/"`，主页里面放不下的其他内容就可以设定在第 2 页`blog/page2/index.html`以及后面的页面中。

| 变量                           | 描述               |
| ---------------------------- | ---------------- |
| paginator.per_page           | 每一页的 post 数量     |
| paginator.posts              | 当前页面上可用的 post 列表 |
| paginator.total_posts        | 所有 post 的数量      |
| paginator.total_pages        | 分页总数             |
| paginator.page               | 当前页的页码，或者`nil`   |
| paginator.previous_page      | 上一页的页码，或者`nil`   |
| paginator.previous_page_path | 上一页的路径，或者`nil`   |
| paginator.next_page          | 下一页的页码，或者`nil`   |
| paginator.next_page_path     | 下一页的路径，或者`nil`   |

## Liquid 语法

[Liquid](https://github.com/Shopify/liquid/wiki)是 Ruby 的一个模版引擎库，Jekyll中用到的Liquid标记有两种：**输出**和**标签**。

- Output 标记：变成文本输出，被2层成对的花括号包住，如：`{{content}}`
- Tag 标记：执行命令，被成对的花括号和百分号包住，如：`{ %command% }`

### Jekyll 输出 Output

示例：

```
Hello {{name}}
Hello {{user.name}}
Hello {{ 'tobi' }}
```

Output 标记可以使用过滤器 Filters 对输出内容作简单处理。  
多个 Filters 间用竖线隔开，从左到右依次执行，Filter 左边总是输入，返回值为下一个 Filter 的输入或最终结果。

```
Hello {{ 'tobi' | upcase }}  # 转换大写输出
Hello tobi has {{ 'tobi' | size }} letters!  # 字符串长度
Hello {{ '*tobi*' | markdownify | upcase }}  # 将Markdown字符串转成HTML大写文本输出
Hello {{ 'now' | date: "%Y %h" }}  # 按指定日期格式输出当前时间
```

### 标准过滤器 Filters

下面是常用的过滤器方法，更多的API需要查阅源代码（有注释）才能看到。

源码主要看两个 Ruby Plugin 文件：`filters.rb`(Jekyll) 和`standardfilters.rb`(Liquid)。

（这也是博主刚开始使用Jekyll的时候，比较头疼的问题。由于官方没有给出详细API的说明，只能去源代码那里看啦，好在代码的注释比较详细）

---

- `date`- 将时间戳转化为另一种格式 ([syntax reference](http://docs.shopify.com/themes/liquid-documentation/filters/additional-filters#date "Liquid Documentation"))
- `capitalize`- 输入字符串首字母大写 e.g.`{{'capitalize me'|capitalize}}# => 'Capitalize me'`
- `downcase`- 输入字符串转换为小写
- `upcase`- 输入字符串转换为大写
- `first`- 返回数组中第一个元素
- `last`- 返回数组数组中最后一个元素
- `join`- 用特定的字符将数组连接成字符串输出
- `sort`- 对数组元素排序
- `map`- 输入数组元素的一个属性作为参数，将每个元素的属性值映射为字符串
- `size`- 返回数组或字符串的长度 e.g.`{{array|size}}`
- `escape`- 将字符串转义输出 e.g.`{{"<p>test</p>"|escape}}# => <p>test</p>`
- `escape_once`- 返回转义后的HTML文本，不影响已经转义的HTML实体
- `strip_html`- 删除 HTML 标签
- `strip_newlines`- 删除字符串中的换行符(`\n`)
- `newline_to_br`- 用HTML`<br/>`替换换行符`\n`
- `replace`- 替换字符串中的指定内容 e.g.`{{'foofoo'|replace:'foo','bar'}}# => 'barbar'`
- `replace_first`- 查找并替换字符串中第一处找到的目标子串 e.g.`{{'barbar'|replace_first:'bar','foo'}}# => 'foobar'`
- `remove`- 删除字符串中的指定内容 e.g.`{{'foobarfoobar'|remove:'foo'}}# => 'barbar'`
- `remove_first`- 查找并删除字符串中第一处找到的目标子串 e.g.`{{'barbar'|remove_first:'bar'}}# => 'bar'`
- `truncate`- 截取指定长度的字符串，第2个参数追加到字符串的尾部 e.g.`{{'foobarfoobar'|truncate:5,'.'}}# => 'foob.'`
- `truncatewords`- 截取指定单词数量的字符串
- `prepend`- 在字符串前面添加字符串 e.g.`{{'bar'|prepend:'foo'}}# => 'foobar'`
- `append`- 在字符串后面追加字符串 e.g.`{{'foo'|append:'bar'}}# => 'foobar'`
- `slice`- 返回字符子串指定位置开始、指定长度的子串 e.g.`{{"hello"|slice:-4,3}}# => ell`
- `minus`- 减法运算 e.g.`{{4|minus:2}}# => 2`
- `plus`- 加法运算 e.g.`{{'1'|plus:'1'}}#=> '11', {{ 1 | plus:1 }} # => 2`
- `times`- 乘法运算 e.g`{{5|times:4}}# => 20`
- `divided_by`- 除法运算 e.g.`{{10|divided_by:2}}# => 5`
- `split`- 根据匹配的表达式将字符串切成数组 e.g.`{{"a~b"|split:"~"}}# => ['a','b']`
- `modulo`- 求模运算 e.g.`{{7|modulo:4}}# => 3`

### Jekyll 标签 Tag

标签用于模板中的执行语句。目前 Jekyll/Liquid 支持的标准标签库有：

| Tags        | 说明                            |
| ----------- | ----------------------------- |
| **assign**  | 为变量赋值                         |
| **capture** | 用捕获到的文本为变量赋值                  |
| **case**    | 条件分支语句 case…when…             |
| **comment** | 注释语句                          |
| **cycle**   | 通常用于在某些特定值间循环选择，如颜色、DOM类      |
| **for**     | 循环语句                          |
| **if**      | if/else 语句                    |
| **include** | 将另一个模板包进来，模板文件在`_includes`目录中 |
| **raw**     | 禁用范围内的 Tag 命令，避免语法冲突          |
| **unless**  | if 语句的否定语句                    |

#### 1. Comments

仅起到注释 Liquid 代码的作用。

```
We made 1 million dollars {% comment %} in losses {% endcomment %} this year.
```

#### 2. Raw

临时禁止执行 Jekyll Tag 命令，在生成的内容里存在冲突的语法片段的情况下很有用。

```
{% raw % }
  In Handlebars, {{ this }} will be HTML-escaped, but {{{ that }}} will not.
{% endraw % }
```

#### 3. If / Else

条件语句，可以使用关键字有：`if`、`unless`、`elsif`、`else`。

```
 {% if user %}
   Hello {{ user.name }}
 {% endif %}

 # Same as above
 {% if user != null %}
   Hello {{ user.name }}
 {% endif %}

 {% if user.name == 'tobi' %}
   Hello tobi
 {% elsif user.name == 'bob' %}
   Hello bob
 {% endif %}

 {% if user.name == 'tobi' or user.name == 'bob' %}
   Hello tobi or bob
 {% endif %}

 {% if user.name == 'bob' and user.age > 45 %}
   Hello old bob
 {% endif %}

 {% if user.name != 'tobi' %}
   Hello non-tobi
 {% endif %}

 # Same as above
 {% unless user.name == 'tobi' %}
   Hello non-tobi
 {% endunless %}

 # Check for the size of an array
 {% if user.payments == empty %}
    you never paid !
 {% endif %}

 {% if user.payments.size > 0  %}
    you paid !
 {% endif %}

 {% if user.age > 18 %}
    Login here
 {% else %}
    Sorry, you are too young
 {% endif %}

 # array = 1,2,3
 {% if array contains 2 %}
    array includes 2
 {% endif %}

 # string = 'hello world'
 {% if string contains 'hello' %}
    string includes 'hello'
 {% endif %}
```

#### 4. Case 语句

适用于当条件实例很多的情况。

```
{% case template %}
{% when 'label' %}
     // {{ label.title }}
{% when 'product' %}
     // {{ product.vendor | link_to_vendor }} / {{ product.title }}
{% else %}
     // {{page_title}}
{% endcase %}
```

#### 5. Cycle

经常需要在相似的任务间选择时，可以使用`cycle`标签。

```
{% cycle 'one', 'two', 'three' %}
{% cycle 'one', 'two', 'three' %}
{% cycle 'one', 'two', 'three' %}
{% cycle 'one', 'two', 'three' %}

# =>

one
two
three
one
```

如果要对循环作分组处理，可以指定分组的名字：

```
{% cycle 'group 1': 'one', 'two', 'three' %}
{% cycle 'group 1': 'one', 'two', 'three' %}
{% cycle 'group 2': 'one', 'two', 'three' %}
{% cycle 'group 2': 'one', 'two', 'three' %}

# =>
one
two
one
two
```

#### 6. For loops

循环遍历数组：

```
{% for item in array %}
  {{ item }}
{% endfor %}
```

循环迭代 Hash散列，`item[0]`是键，`item[1]`是值：

```
{% for item in hash %}
  {{ item[0] }}: {{ item[1] }}
{% endfor %}
```

每个循环周期，提供下面几个可用的变量：

```
forloop.length      # => length of the entire for loop
forloop.index       # => index of the current iteration
forloop.index0      # => index of the current iteration (zero based)
forloop.rindex      # => how many items are still left ?
forloop.rindex0     # => how many items are still left ? (zero based)
forloop.first       # => is this the first iteration ?
forloop.last        # => is this the last iteration ?
```

还有几个属性用来限定循环过程：

`limit:int`： 限制循环迭代次数  
`offset:int`： 从第n个item开始迭代  
`reversed`： 反转循环顺序

```
# array = [1,2,3,4,5,6]
{% for item in array limit:2 offset:2 %}
  {{ item }}
{% endfor %}
# results in 3,4

{% for item in collection reversed %}
  {{item}}
{% endfor %}

{% for post in site.posts limit:20 %}
  {{ post.title }}
{% endfor %}
```

允许自定义循环迭代次数，迭代次数可以用常数或者变量说明：

```
# if item.quantity is 4...
{% for i in (1..item.quantity) %}
  {{ i }}
{% endfor %}
# results in 1,2,3,4
```

#### 7. Variable Assignment

为变量赋值，用于输出或者其他 Tag：

```
{% assign index = 1 %}
{% assign name = 'freestyle' %}

{% for t in collections.tags %}{% if t == name %}
  <p>Freestyle!</p>
{% endif %}{% endfor %}


# 变量是布尔类型
{% assign freestyle = false %}

{% for t in collections.tags %}{% if t == 'freestyle' %}
  {% assign freestyle = true %}
{% endif %}{% endfor %}

{% if freestyle %}
  <p>Freestyle!</p>
{% endif %}
```

`capture`允许将大量字符串合并为单个字符串并赋值给变量，而不会输出显示。

```
{% capture attribute_name %}{{ item.title | handleize }}-{{ i }}-color{% endcapture %}

<label for="{{ attribute_name }}">Color:</label>
<select name="attributes[{{ attribute_name }}]" id="{{ attribute_name }}">
  <option value="red">Red</option>
  <option value="green">Green</option>
  <option value="blue">Blue</option>
</select>
```

---

## 其他模板语句

### 字符转义

有时候想输出`{`了，怎么办？ 使用反斜线`\`转义即可

```
\{ => {
```

### 格式化时间

```
{{ site.time | date_to_xmlschema }}     # => 2008-11-07T13:07:54-08:00
{{ site.time | date_to_rfc822 }}        # => Mon, 07 Nov 2008 13:07:54 -0800
{{ site.time | date_to_string }}        # => 07 Nov 2008
{{ site.time | date_to_long_string }}   # => 07 November 2008
```

### 代码语法高亮

安装好**pygments.rb**的 gem 组件和 Python 2.x 后，配置文件添加：`highlighter:pygments`，就可以使用语法高亮命令了，支持语言多达 100 种以上。

```
{% highlight ruby linenos %}
# some ruby code
{% endhighlight %}
```

上面的示例中，使用`highlight`语句来处理代码块；并设定第一个参数`ruby`来指定高亮的语言 Ruby，第二个参数`linenos`来开启显示代码行号的功能。

为了给代码着色，需要配置相应的样式文件，参考[syntax.css](https://github.com/mojombo/tpw/tree/master/css/syntax.css)；  
为了更好的显示行号，可以在上面的 CSS 文件添加`.lineno`样式类。

可用的语言识别符缩写，从[**Pygments’ Lexers Page**](http://pygments.org/docs/lexers/)查阅。  
如果从 Pygments 的[Supported Languages](http://pygments.org/languages/)清單，能發現明明有列出該語言名稱，而 pygments.rb 确无法识别该语言，這時候必須到[Available Lexers](http://pygments.org/docs/lexers/)查詢；如果在程序語言的說明中有一行“**New in version 1.5.**”，那就表示只要將**Pygments**更新到 1.5 版， 即可支持该程序语言。

### 链接同域内的 post

使用`post_url`Tag 可以自动生成网站内的某个 post 超链接。  
这个命令语句以相关 post 的文件名为参数，在引入同域的 post 链接时，非常有用。

```
# 自动生成某篇文章的链接地址
{% post_url 2010-07-21-name-of-post %}

# 引入该文章的链接
[Name of Link]({% post_url 2010-07-21-name-of-post %})
```

### Gist 命令

嵌入 GitHub Gist，也可以指定要显示的 gist 的文件名。

```
{% gist parkr/931c1c8d465a04042403 %}
{% gist parkr/931c1c8d465a04042403 jekyll-private-gist.markdown %}
```

### 生成摘要

配置文件中设定`excerpt_separator`取值，每篇 post 都会自动截取从开始到这个值间的内容作为这篇文章的摘要`post.excerpt`使用。  
如果要禁用某篇文章的摘要，可以在该篇文章的 YAML 头部设定`excerpt_separator:""`。

```
{ % for post in site.posts % }
  <a href="http://alfred-sun.github.io/blog/2015/01/10/jekyll-liquid-syntax-documentation/{ { post.url } }">{ { post.title } }</a>
  { { post.excerpt | remove: 'test' } }
{ % endfor % }
```

### 删除 HTML 标签

这个在摘要作为`head`标签里的`meta="description"`内容输出时很有用

```
{ { post.excerpt | strip_html } }
```

### 删除指定文本

过滤器`remove`可以删除变量中的指定内容

```
{ { post.url | remove: 'http' } }
```

### CGI Escape

通常用于将 URL 中的特殊字符转义为`%xx`形式

```
{ { "foo,bar;baz?" | cgi_escape } }  # => foo%2Cbar%3Bbaz%3F
```

### 排序

```
# Sort an array. Optional arguments for hashes:
#   1. property name
#   2. nils order ('first' or 'last')

{ { site.pages | sort: 'title', 'last' } }
```

### 搜索指定 Key

```
# Select all the objects in an array where the key has the given value.
{ { site.members | where:"graduation_year","2014" } }
```

### To JSON 格式

将 Hash 散列或数组转换为 JSON 格式

```
{ { site.data.projects | jsonify } }
```

### 序列化

把一个数组变成一个字符串

```
{ { page.tags | array_to_sentence_string } }  # => foo, bar, and baz
```

### 单词的个数

```
{ { page.content | number_of_words } }
```

## 内容名字规范

对于博客 post，文件命名规则必须是`YEAR-MONTH-DAY-title.MARKUP`的格式。  
使用`rake post`会自动将 post 文件合适命名。

比如：

```
-11-06-memcached-code.md
-11-06-memcached-lib.md
-11-06-sphinx-config-and-use.md
-11-07-memcached-hash-table.md
-11-07-memcached-string-hash.md
```

## Assets 样式文件

Jekyll 支持 Sass 和 CoffeeScript，通过新建`.sass`、`.scss`或`.coffee`格式的文件，并在开头添加一对`---`来使用这个功能。

关于详细的使用，请参看[官方说明](http://jekyllrb.com/docs/assets/)，这里就不再做介绍了。

## 模板

[liquid 中文文档](https://liquid.bootcss.com)



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

![](http://ww1.sinaimg.cn/large/7011d6cfjw1f2ue1l2yscj20gk02amxj.jpg)

执行安装   

![](http://ww1.sinaimg.cn/large/7011d6cfjw1f2ue1w8eqnj20bx00hglg.jpg)  

### 用RubyGems安装Jekyll

执行下面的语句安装   

![](http://ww4.sinaimg.cn/large/7011d6cfjw1f2ue2g2p3uj207x00ft8j.jpg)

安装结束画面   

![](http://ww4.sinaimg.cn/large/7011d6cfjw1f2ue32drwhj20hv09xq5m.jpg)

至此jekyll就已经安装完毕了，后续就是个性化的自己设定了。

### 创建博客

在d盘新建一个工作区jekyllWorkspace

cd到jekyllWorkspace   

执行jekyll new name创建新的工作区   

![](http://ww3.sinaimg.cn/large/7011d6cfjw1f2ue3lt31nj20cj02nt8u.jpg)

文件结构如下：   

![](http://ww1.sinaimg.cn/large/7011d6cfjw1f2ue3ujsybj20ek06wabh.jpg)

cd到博客文件夹，开启服务器   

![](http://ww1.sinaimg.cn/large/7011d6cfjw1f2ue47y9lgj20ao00f0sl.jpg)

watch为了检测文件夹内的变化，即修改后不需要重新启动jekyll

我的环境下启动报错(你的可能没有)，再安装yajl-ruby和rouge  

![](http://ww4.sinaimg.cn/large/7011d6cfjw1f2ue4nelnxj20dd077q49.jpg)

再次启动服务器成功

![](http://ww4.sinaimg.cn/large/7011d6cfjw1f2ue4v42koj20g505bdgy.jpg)

访问 http://localhost:4000/   

![](http://ww1.sinaimg.cn/large/7011d6cfjw1f2ue56ckwoj20je0eumz3.jpg)

详细文章页面   

![](http://ww2.sinaimg.cn/large/7011d6cfjw1f2ue5f3j9cj20je0gyq7a.jpg)

## 后续

*  整个安装过程参考了jekyll官网，注意jekyll还有一个简体中文官网，不过比较坑（我就被坑了），有些内容没有翻译过来，有可能会走弯路，建议如果想看中文的相关资料，也要中英对照着阅读。[jekyll中文网 http://jekyllcn.com](http://jekyllcn.com), [jekyll英文网 http://jekyllrb.com](http://jekyllrb.com)
*  jekyll中的css是用sass写的，当然直接在`_sass/_layout.scss`中添加css也是可以的。
*  本文是用Markdown格式来写的，相关语法可参考： [Markdown 语法说明 (简体中文版) http://wowubuntu.com/markdown/](http://wowubuntu.com/markdown/)  
*  按照本文的说明搭建完博客后，用`github Pages`托管就可以看到了。注意，在github上面好像不支持rouge，所以要push到github上时，我将配置文件_config.yml中的代码高亮改变为`highlighter: pygments`就可以了
*  博客默认是没有评论系统的，本文的评论系统使用了多说，详细安装办法可访问[多说官网 http://duoshuo.com/](http://duoshuo.com/)，当然也可以使用[搜狐畅言 http://changyan.sohu.com/](http://changyan.sohu.com/)作为评论系统。
*  也可以绑定自己的域名，如果没有域名，可以在[godaddy http://www.godaddy.com/](http://www.godaddy.com/)上将域名放入购物车等待降价，买之。
*  祝各位新年快乐！

---

# 可能出现的问题

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



