# Welcome to Wang's Homepage !

[![GitHub stars](https://img.shields.io/github/stars/wqw547243068/wqw547243068.github.io.svg)](https://github.com/wqw547243068/wqw547243068.github.io/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/wqw547243068/wqw547243068.github.io.svg)](https://github.com/wqw547243068/wqw547243068.github.io/network)
[![GitHub issues](https://img.shields.io/github/issues/wqw547243068/wqw547243068.github.io.svg)](https://github.com/wqw547243068/wqw547243068.github.io/issues)
[![GitHub release](https://img.shields.io/github/release/wqw547243068/wqw547243068.github.io.svg)](https://github.com/wqw547243068/wqw547243068.github.io/releases)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/wqw547243068/wqw547243068.github.io/master/LICENSE)

- 【2019-05-09】示例汇总[demo](https://wqw547243068.github.io/demo/page/)
- [你画我猜](https://wqw547243068.github.io/demo/sketcher/)

**[中文版 Chinese README 请点击这里 🇨🇳](https://github.com/wqw547243068/wqw547243068.github.io/blob/master/README-zh-cn.md)**

With the escalation of jekyll version, but I also want to reconstruct my older blog theme, so I did reconstruction and added some features recently. My new blog theme will still be stored in this repository. I will also use this theme in the future. Now I have done basically, then I will focus on issues that users opend to make theme better.

**My Blog Url: [http://wqw547243068.github.io/](http://wqw547243068.github.io/)**. If you like this theme, you can give me a star to encourage me. Welcome everyone to use it.

## Content

* [Preview](#preview)
* [Page Details](#page-details)
    * [Home](#home)
    * [Archives](#archives)
    * [Categories](#categories)
    * [Tags](#tags)
    * [Collections](#collections)
    * [Demo](#demo)
    * [About](#about)
    * [Comments](#comments)
    * [Post Contents](#post-contents)
    * [Code Highlight](#code-highlight)
    * [Light Shadow](#light-shadow)
    * [Mobile Adaptation](#mobile-adaptation)
    * [Footer](#footer)
    * [Statistical Analysis](#statistical-analysis)
* [Usage](#usage)
    * [1. Install ruby and jekyll environment](#1-install-ruby-and-jekyll-environment)
    * [2. Copy theme code](#2-copy-theme-code)
    * [3. Change parameter](#3-change-parameter)
        * [Basic info](#basic-info)
        * [Link info](#link-info)
        * [Comments info](#comments-info)
        * [Statistical analysis info](#statistical-analysis-info)
    * [4. Write post](#4-write-post)
    * [5. Local launch](#5-local-launch)
    * [6. Push to GitHub](#6-push-to-github)
* [Donate](#donate)
* [Update Log](#update-log)
* [License](#license)

## Preview

First of all, let's see previews.

Index Page
![index](http://ww3.sinaimg.cn/large/7011d6cfjw1f3bdli86awj211k0oyqen.jpg)

Post Page
![post](http://ww4.sinaimg.cn/large/7011d6cfjw1f3bdmzb9v6j210p0j7gwn.jpg)

## Page Details

### Home

Index page show 5 posts excerpt as a default. Readers can click article title or read more button to see full post. There are recent posts area, categories area and tags area at the right part of the index page. You can also add an area at this part, if you change the file `index.html`.

### Archives

Archive post according to the year.

### Categories

Show posts according to the category.

### Tags

Show posts according to the tags.

### Collections

The user can collect their favorite article links with `markdown` syntax.

### Demo

I use *[Masonry](http://masonry.desandro.com/)* to rewrite the waterfall responsive layout. Better interactive experience.

### About

The user can write some introduction about theirselves and their site with `markdown` syntax.

### Comments

This theme supports both [disqus](https://disqus.com/) and [多说评论 duoshuo comments](http://duoshuo.com/). It's very easy to config your comments module.

The only thing you need do is to change the `short_name` in the file `_config.yml`. As follows.

```yml
# comments
# two ways to comment, only choose one, and use your own short name
duoshuo_shortname: #xxx
disqus_shortname: xxx
```

### Post Contents

The post contents is fixed at the right side while page is scrolling. There will be a scroll bar on contents while it is outside the window height.

### Code Highlight

While the jekyll is update to 3.x.x, you can use github flavored markdown to write code.

More info to see [syntax-highlighter-changed](https://jekyllrb.com/docs/upgrading/2-to-3/#syntax-highlighter-changed).

### Light Shadow

![light](http://ww3.sinaimg.cn/large/7011d6cfjw1f3be6y4vp3j209i02rweg.jpg)

You can see the white shadow on the current item in the navbar. I call this light shadow.

### Mobile Adaptation

Of course, I have done a very good mobile adaptation.

![mobile](http://ww4.sinaimg.cn/large/7011d6cfjw1f3bebnzxkpj20ah0fzgp4.jpg)

### Footer

**Welcome to use this blog theme, but please keep the theme author info at footer.** Theme designed by [Wang](https://github.com/wqw547243068).

![footer](http://ww3.sinaimg.cn/large/7011d6cfjw1f3bepd8002j20hl02ct95.jpg)

### Statistical Analysis

This theme supports Google Analytics and Baidu Statistics， you can just config the id in the file `_config.yml`, as follows.

```yml
# statistic analysis 统计代码
# 百度统计 id，将统计代码替换为自己的百度统计id，即
# hm.src = "//hm.baidu.com/hm.js?xxxxxxxxxxxx";
# xxxxx字符串
baidu_tongji_id: xxxxxxxxxxxx
google_analytics_id: UA-xxxxxxxx # google 分析追踪id
```

## Usage

Welcome everyone to use this theme, this part shows introduction to use.

### 1. Install ruby and jekyll environment

This step and Step 5 mainly talk to you how to launch blog at local. If you don't want to launch at local, you can ignore these 2 steps. But I still strongly suggest to do this. Ensure there is nothing wrong before pushing to the github.

The Windows users can directly use [RubyInstaller](http://rubyinstaller.org/) to install ruby environment. Follow the prompts while installing.

Install jekyll commands:

```
gem install jekyll
```

For more details, you can view the jekyll official website. [https://jekyllrb.com/](https://jekyllrb.com/)

There may be something wrong at mac OS X El Capitan, you can see the solution at [https://jekyllrb.com/docs/troubleshooting/#jekyll-amp-mac-os-x-1011]( https://jekyllrb.com/docs/troubleshooting/#jekyll-amp-mac-os-x-1011).

If you are interesting in jekyll, you can see the jekyll source code at [https://github.com/jekyll/jekyll](https://github.com/jekyll/jekyll).

![jekyll logo](http://jekyllcn.com/img/logo-2x.png)

### 2. Copy theme code

You can clone, download or fork this repo.

### 3. Change parameter

Mainly change the parameters at file `_config.yml` and use your own `favicon.ico`.

#### Basic info

Shows at site header part.

```yml
# Site settings
title: Wang
brief-intro: Front-end Dev Engineer
baseurl: "" # the subpath of your site, e.g. /blog
url: "http://wqw547243068.github.io" # the base hostname & protocol for your site
```

#### Link info

Mainly shows at the footer of the site.

```yml
# other links
twitter_username: gaohaoyang126
facebook_username: gaohaoyang.water
github_username:  Gaohaoyang
email: gaohaoyang126@126.com
weibo_username: 3115521wh
zhihu_username: gaohaoyang
linkedIn_username: gaohaoyang
dribbble_username:

description_footer: 本站记录我前端之旅的沿途风景！
```

#### Comments info

Get your own `short_name`:

Visit https://disqus.com/ or http://duoshuo.com/. And follow the prompts at the site.

```yml
# comments
# two ways to comment, only choose one, and use your own short name
duoshuo_shortname: #hygblog
disqus_shortname: xxxx
```

When you done, you can also see the comments info at disqus or duoshuo admin console.

#### Statistical analysis info

Get Google Analytics id or Baidu Statistics id：

Visit https://www.google.com/analytics/ or http://tongji.baidu.com/. And follow the prompts at the site.

Of course, if you don't want any statistical and analysis info, you can type nothing at id position.

```yml
# statistic analysis 统计代码
# 百度统计 id，将统计代码替换为自己的百度统计id，即
# hm.src = "//hm.baidu.com/hm.js?xxxxxxxxxxxx";
# xxxxx字符串
baidu_tongji_id: cf850xxxxxxxxxxxxxxxx
google_analytics_id: UA-7xxxxxx-4 # google 分析追踪id
```

When you done, you can see UV, PV, location etc. info at your own Google Analytics or Baidu Statistic console.

### 4. Write post

You can write posts at folder `_posts`. At the beginning of the post, you should declare layout、title、date、categories、tags、author(optional) info、mathjax(optional，click [here](https://www.mathjax.org/) for more detail about `Mathjax`).

```
---
layout: post
title:  "对这个 jekyll 博客主题的改版和重构"
date:   2016-03-12 11:40:18 +0800
categories: jekyll
tags: jekyll 端口 markdown Foxit RubyGems HTML CSS
author: Haoyang Gao
mathjax: true
---
```

These follow code is for making contents.
```
* content
{:toc}
```

You can use 4 wraps as a excerpt separator. The words before separator as excerpt show in the index page. When you enter the post page, you can read full article.

The wraps config is in the file `_config.yml`, as follows:

```yml
# excerpt
excerpt_separator: "\n\n\n\n"
```

You should use markdown syntax to write article, just like write readme in github.

You can use 3 \`\`\` to write code block.

### 5. Local launch

use command:

```
jekyll s
```

Terminal shows:

```
Configuration file: E:/GitWorkSpace/blog/_config.yml
            Source: E:/GitWorkSpace/blog
       Destination: E:/GitWorkSpace/blog/_site
 Incremental build: disabled. Enable with --incremental
      Generating...
                    done in 6.33 seconds.
  Please add the following to your Gemfile to avoid polling for changes:
    gem 'wdm', '>= 0.1.0' if Gem.win_platform?
 Auto-regeneration: enabled for 'E:/GitWorkSpace/blog'
Configuration file: E:/GitWorkSpace/blog/_config.yml
    Server address: http://127.0.0.1:4000/
  Server running... press ctrl-c to stop.
```

Visit localhost:4000 to see your blog!!!

### 6. Push to GitHub

If there is nothing wrong, push code to your github!

## Donate

You can also donate me for a coffee, and I'll do better. Thanks.

|                                                                     Wechat Moment                                                                     |                                 Wechat Pay                                  |                                   Alipay                                    |
|:----------------------------------------------------------------------------------------------------------------------------------------------:|:---------------------------------------------------------------------------:|:---------------------------------------------------------------------------:|
| ![](https://github.com/wqw547243068/wqw547243068.github.io/raw/master/wqw/fig/wqw.png) | ![wechat](https://github.com/wqw547243068/wqw547243068.github.io/raw/master/wqw/fig/wechatpay.png) | ![alipay](https://github.com/wqw547243068/wqw547243068.github.io/raw/master/wqw/fig/alipay.png) |




## License

[MIT License](https://github.com/Gaohaoyang/gaohaoyang.github.io/blob/master/LICENSE.md)
