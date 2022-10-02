---
layout: post
title:  "阅读指南"
date:   2010-01-01 22:30:00
categories: 技术工具
tags: 阅读 导航 指南 鹤啸九天 
excerpt: 怎样才能快乐的在这个博客徜徉？
author: 鹤啸九天
mathjax: true
permalink: /navi
---

* content
{:toc}

# 引言

- 不管大家是抱着什么样的目的，怀着什么样的心情，误打误撞来到了这个叫`鹤啸九天`的技术博客，相信都有这样的感觉：
  - `建站求助`：嚯，这个页面还挺简洁(冷淡)的，没啥广告，字体也还不错，居然还有视频，怎么做的，我也想要一个！
  - `内容导航`：可是，右上角是些什么栏目？难道非要自己一个个摸索吗？对不起，我很忙，几分钟内没有吸引到我，走人！
  - `联系作者`：作者是干嘛的，怎么联系？

# 导航

- 如何快乐的游弋在知识海洋，而不被大浪掀翻，不被海鸥的鸟粪打中，也不被海底的鲸鱼吓跑？


## 建站求助

这个博客最开始复制于
- [Jekyll编辑功能汇总](https://wqw547243068.github.io/2015/02/15/create-my-blog-with-jekyll/)

## 内容导航

### 简介

- [博客主页](https://wqw547243068.github.io/)：顶栏有导航按钮，快速直达：
   - Archives：文章列表（按时间倒序）
   - categories：文章列表（按栏目划分）
   - Tags：文章列表（按标签划分）
   - Collections：资料汇总（持续更新），覆盖了2015年以来收集的各类资料链接
   - Demo：各类有趣好玩的demo展示
   - About：联系作者（终于可以找到我了）
- 底栏有邮件订阅、评论和友情链接（好多大牛的主页！）
- 文章页面

一点直达
- [学习资料汇总（持续更新）](https://wqw547243068.github.io/collection/)

### 可视化导航

- 点击对应方块就能快速跳转
- Click these blocks below to jump pages quickly ...

<div class="mermaid">
%% 导航
    graph LR
    A(Home):::s
    classDef s fill:#C8D64B;
    style A fill:#F7CF6B;
    style B fill:#6BE0F7;
    style C fill:#6BE0F7;
    style D fill:#6BE0F7;
    style H fill:#5CF77B;
    style I fill:#f02;
    A -->|文章目录| B(Archives)
    A -->|大类目| C(categories)
    A -->|标签| D(Tags)
    A -->|大杂烩| E(Collections)
    A -->|小玩意儿| F(Demo)
    A -->|联系我| G(About)
    A -->|找大牛| H(Links)
    A -->|找主题文章| I(搜索框)
    click A "https://wqw547243068.github.io/" "主页"
    click B "https://wqw547243068.github.io/archive" "文章目录"
    click C "https://wqw547243068.github.io/category" "大类目"
    click D "https://wqw547243068.github.io/tag" "标签索引"
    click E "https://wqw547243068.github.io/collection" "大类目"
    click F "https://wqw547243068.github.io/demo" "Demo"
    click G "https://wqw547243068.github.io/about" "找我"
</div>


## 联系作者

- [来呀，点我！](https://wqw547243068.github.io/about/)


# 结束

- 没有啦，有问题请留言~
