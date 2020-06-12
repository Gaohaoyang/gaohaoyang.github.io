---
layout: post
title:  "对话系统-Dialogue System"
date:   2020-04-28 21:45:00
categories: 深度学习
tags: 深度学习 NLP 对话系统 QA 多轮 闲聊
excerpt: 对话系统技术图谱
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结


## 现状

- 参考资料
  - [对话生成：seq2seq模型原理及优化](https://zhuanlan.zhihu.com/p/69159062)

对话机器人是一个热门话题，大家熟知的应用和产品主要有三种：
- 第一种是`虚拟助手`，能对个人输入完成相应的任务或提供相应服务，典型的商业产品包括如siri、cortana、度秘等；
- 第二种是`智能音箱`，通过语音交互，完成用户任务，也能对智能家居设备进行控制。典型的商业产品包括如echo、天猫精灵、小爱同学等；
- 第三种是`闲聊对话`，在开放域与用户进行闲聊。典型的商业产品如：微软小冰。

![](https://upload-images.jianshu.io/upload_images/18270108-d3523b6e842e3494.png)

## 分类

对话机器人的任务类型可以分为三类：
- 第一类`任务型`对话，主要解决如订机票、订酒店等问题。它涉及的技术包括：语义理解、意图识别、状态追踪、对话决策等；
- 第二类`知识型`对话，在寿险客服的场景里，用户可能会问“你这个保险要交多少钱？”这类问题。它涉及的技术包括：文本表示、语义匹配、知识图谱等；
- 第三类`闲聊型`对话，用户可能只想找人聊聊天，对话不涉及到知识或业务，比如说“今天天气真好”。它涉及的技术包括：文本生成模型、文本检索、排序技术等；

![](https://upload-images.jianshu.io/upload_images/18270108-74922f3390e8b699.png)

## 资料

- 陈海青：[阿里小蜜机器人交互](https://myslide.cn/slides/2443?vertical=1)
- Google对话系统分享，[Deep Learning for Goal-Oriented Conversational Understanding](https://www.slideshare.net/AIFrontiers/ai-frontiers-dilek-hakkanitur-conversational-machines-deep-learning-for-goaloriented-dialogue-systems)
  - <iframe src="//www.slideshare.net/slideshow/embed_code/key/uiOx6qQI3MHgxW" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/AIFrontiers/ai-frontiers-dilek-hakkanitur-conversational-machines-deep-learning-for-goaloriented-dialogue-systems" title="Dilek Hakkani-Tur at AI Frontiers: Conversational machines: Deep Learning for Goal-Oriented Dialogue Systems" target="_blank">Dilek Hakkani-Tur at AI Frontiers: Conversational machines: Deep Learning for Goal-Oriented Dialogue Systems</a> </strong> from <strong><a href="https://www.slideshare.net/AIFrontiers" target="_blank">AI Frontiers</a></strong> </div>
- 【2019-11-6】哈工大张伟男：[人机对话关键技术及挑战](https://www.infoq.cn/article/QpC2C5HSpHRM9v88Llv0)，[ppt](https://docsplayer.com/99875702-%E4%BA%BA%E6%9C%BA%E5%AF%B9%E8%AF%9D%E6%8A%80%E6%9C%AF%E5%89%8D%E6%B2%BF%E5%8F%8A%E5%8A%A8%E6%80%81.html)
  - <div><div><a target='_blank' href='https://docsplayer.com/99875702-%E4%BA%BA%E6%9C%BA%E5%AF%B9%E8%AF%9D%E6%8A%80%E6%9C%AF%E5%89%8D%E6%B2%BF%E5%8F%8A%E5%8A%A8%E6%80%81.html'>人机对话技术前沿及动态</a></div><div><iframe frameborder="0" style="border-bottom: 2px solid #eee; border-top: 0px;" scrolling="no" src="http://docsplayer.com/docview/89/99875702/" width="728" height="412" allowfullscreen></iframe></div></div>
- 更多[Demo地址](http://wqw547243068.github.io/demo)

# 结束


