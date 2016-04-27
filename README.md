# 关于这个博客主题

随着 jekyll 的版本升级，同时我也想重构我的旧版博客主题，因此在这个月对博客进行了重构加改版，这个仓库存放我的新博客，并且我也会一直使用这个主题。目前基本改版完成，后续可能还会有些细节上的修补。

**博客访问地址：[http://gaohaoyang.github.io/](http://gaohaoyang.github.io/)**。若您喜欢这个新的博客主题，请给我个star以示鼓励吧，欢迎大家使用。


## 预览图

先上预览图：

主页
![index](http://ww3.sinaimg.cn/large/7011d6cfjw1f3bdli86awj211k0oyqen.jpg)

文章页
![post](http://ww4.sinaimg.cn/large/7011d6cfjw1f3bdmzb9v6j210p0j7gwn.jpg)

## 各部分详情

### 主页 Home

主页默认展示5篇文章的摘要部分，用户点击标题或阅读全文后进入文章页。右侧为近期文章、分类和标签3块区域，用户可以继续在这部分添加区域，只需修改`index.html`即可。

### 归档 Archives

按照年份归档文章。

### 分类 Categories

按照文章的分类，显示文章。

### 标签 Tags

按照文章的标签显示文章。

### 收藏 Collections

本页是用`markdown`写的，用户可以收藏自己喜欢的文章链接。

### 展示 Demo

使用 [Masonry](http://masonry.desandro.com/) 重写了瀑布流布局，响应式布局，更好的交互体验。

### 关于 About

对个人和对本站的介绍，使用`markdown`写的。

### 评论

支持 [多说评论](http://duoshuo.com/) 和 [disqus](https://disqus.com/) 评论。

只需要在 `_config.yml` 修改相应的配置`short_name`即可，如下：

```yml
# comments
# two ways to comment, only choose one, and use your own short name
# 两种评论插件，选一个就好了，使用自己的 short_name
duoshuo_shortname: #xxx
disqus_shortname: xxx
```

### 目录 Contents

页面滚动时目录固定在屏幕右侧，若目录高度超出屏幕高度，目录产生滚动条。

### 代码高亮

随着 jekyll 的升级，目前代码高亮使用风格与 github 上的 markdown 写法一致。

### 灯泡效果

![light](http://ww3.sinaimg.cn/large/7011d6cfjw1f3be6y4vp3j209i02rweg.jpg)

可以看到导航按钮高亮时，下面的阴影效果，我把这个称谓灯泡效果。

### 移动端适配

完美适配移动端。

![mobile](http://ww4.sinaimg.cn/large/7011d6cfjw1f3bebnzxkpj20ah0fzgp4.jpg)

### Footer

**欢迎使用这个主题，使用时请保留 footer 上的模板主题来源。**Theme designed by [HyG](https://github.com/gaohaoyang).
![footer](http://ww3.sinaimg.cn/large/7011d6cfjw1f3bepd8002j20hl02ct95.jpg)

关于旧版博客，我不在维护，同时我把代码转移到了另一个仓库，见 [Gaohaoyang/old-blog](https://github.com/Gaohaoyang/old-blog)。

## 捐助 donate

您也可以捐助我喝杯咖啡！感谢！

支付宝

![alipay](http://ww2.sinaimg.cn/large/7011d6cfjw1f3bk8ikzoij20740743z5.jpg)

微信

![wechat](http://ww2.sinaimg.cn/large/7011d6cfjw1f3bkdw3bslj206z06q3z6.jpg)

## update log

### 2016.4.27 v2.0.0

* [^] 基于 jekyll 3.1.2 重构了所有代码，去除了 jQuery 和 BootStrap，是的加载速度更快
* [+] 主页添加了摘要，在正文中使用4个换行符来分割，可在`_config.yml`中修改
* [+] 主页添加了近期文章、分类列表和标签云
* [+] 主页导航区做了视觉优化，阴影效果
* [+] 增加了归档、标签和分类页面
* [+] 增加了收藏页面
* [+] 评论插件可以选择 disqus 或 多说，直接在`_config.yml`中修改
* [+] 适配移动端
* [+] 页面滚动时，文章目录固定在右侧
* [+] 页面内容较少时，固定 footer 在页面底部
* [^] 使用 GitHub 风格的代码高亮写法，即```的写法
* [^] 使用 Masonry 重写了 Demo 页中的瀑布流布局，响应式交互体验更好

## License

[MIT License](https://github.com/Gaohaoyang/gaohaoyang.github.io/blob/master/LICENSE.md)
