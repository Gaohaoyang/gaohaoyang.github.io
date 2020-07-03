---
layout: post
title:  "因果科学-Casual-Science"
date:   2020-06-30 16:03:00
categories: 自然语言处理 深度学习
tags: 深度学习 NLP KG 知识图谱 表示学习 因果科学
excerpt: 如何让AI系统具备真正的推理能力？图灵奖得主、贝叶斯网络之父 Judea Pearl 的解法——因果科学
author: 鹤啸九天
mathjax: true
---

* content
{:toc}



# The book of why


## 简介

- 书籍：
  - ![](http://5b0988e595225.cdn.sohucs.com/images/20190716/935359c273384228b196eac31077b762.jpeg)
- 《The book of Why》，豆瓣高达9.5分。其中文版《为什么：关于因果关系的新科学》由中信出版社推出
- 因果推理和贝叶斯网络的创始人，图灵奖得主`Judea Peral`（朱迪亚·珀尔，贝叶斯网络之父）和科普作家 Mackenzie, Dana合作写的一本因果推理的入门书。
  - ![](http://5b0988e595225.cdn.sohucs.com/images/20190716/7cee9f86eaea4b12af02c573bac064ed.jpeg)

## 为什么要读

- 年度必读书，原因有二：
  - 提出了一套全新的科学方法论——因果关系模型，其应用范围涉及众多领域。借助因果关系的视角，作者重新阐述了人类认知和科学文明的发展史。
  - 因果推理将对人工智能产生革命性的跃迁，引领人工智能的未来发展，并赋予人工智能以真正的人类智慧甚至道德意识，让人工智能与人类能在彼此合作的基础上打造一个更好的未来世界。

## 当前的AI方法论错了！

- 自从AlphaGo一鸣惊人后，人工智能似乎一下子遍地开了花。智能音箱、智能导航、智能医疗——恍惚间，我们似乎已昂首阔步、意气风发走进了AI新时代。
- 然而有个人却说：
  - ![](http://5b0988e595225.cdn.sohucs.com/images/20190716/28bb22de858749fa92db4d67ed55bcaf.jpeg)
  - <font color='red'>你们的方向都错了，现在的人工智能连“智能”的门还没摸到。</font>
  - <font color='blue'>所有深度学习的成果，都只是曲线拟合。复杂而平庸。</font>
- 目前的大数据和人工智能都只是停留在相关性的层面，其算法的核心都是基于过往的数据，来预测或是产生新的东西

- 尤瓦尔·赫拉利在《人类简史》中说，想象和虚构的能力，让智人走上了食物链的顶端。同样，机器要想真的“智能”，也必须能想象和虚构。
  - ![](http://5b0988e595225.cdn.sohucs.com/images/20190716/314be42d51e74f28bccf2c37c26316bb.jpeg)
  - 也就是朱迪亚·珀尔强调的，真正的人工智能，光知道“相关”远远不够，而要懂得“因果”。


# 引言

- 2020年6月21日，图灵奖得主、贝叶斯网络之父 Judea Pearl 在第二届[北京智源大会](https://2020.baai.ac.cn/)上做了《新因果科学与数据科学、人工智能的思考》的报告。
- ![](http://p6-tt.byteimg.com/large/pgc-image/S2ZVTI7E7MNFQ7)
- Pearl说：
  - 我们现在正处在第二次数学科学革命，这一革命是以科学为中心的因果革命，相对于第一次以数据为中心的革命，第二次显得有些沉默，但威力同样巨大。
- Pearl解释了因果科学为什么需要新的逻辑和新的推理机制，以及因果科学中新引擎的结构是什么。也对称之为“double-helix”两个因果推理的基本定理进行了交代；最后也给大家讲了基于因果智能的七种工具，以及这七种工具是如何给科学带来革命性变化。


# 什么是因果科学

- ![](http://p1-tt.byteimg.com/large/pgc-image/S2ZVTIc6kEyATB)

- 因果科学就是回答因果问题的逻辑和工具，如上图一些因果问题的典型例子：
  - 1、某项治疗对预防疾病的效果如何；
  - 2、新的税收优惠政策和营销活动哪个是导致销售额上升的原因；
  - 3、肥胖症每年造成的保健费用是多少；
  - 4、雇用记录能否证明雇主有性别歧视行为；
  - 5、我如果辞职了，会不会后悔？
- 上面这五个问题，显然无法用现在标准的科学语言（如数学公式）进行回答。为什么呢？因为这些问题都包含着不对称信息。毕竟“代数学科”从伽利略时代开始，就是专注于等式（完全对称的因果关系），即y=ax此类的表达式。
- 而现实中，大多数问题，如上标黄的单词，预防、导致、归因、歧视、后悔等等都是含有不对称属性的。相对于“等号=”表示对称信息，那么我们也可用箭头→表示非对称信息。在过去30年中，我和我的同事做了非常多的工作，就是为了找到非对称的表达工具，在后面我也会介绍一些工具。


## 推理引擎的结构

- 因果关系的学习者必须熟练掌握至少三种不同层级的认知能力：
  - `观察`能力（Seeing）、`行动`能力（Doing）和`想象`能力（Imagining）。”
  - 第一层级“`关联`”表示`观察`能力，指发现环境中规律的能力
    - 一只猫头鹰观察到一只老鼠在活动，便开始推测老鼠下一刻可能出现的位置，这只猫头鹰所做的就是通过观察寻找规律；
  - 第二层级“`干预`”表示`行动`能力，指预测对环境刻意改变后的结果，并根据预测结果选择行为方案
    - 如果我做X这件事情，那么y会发生什么变化，一个具体的例子是如果我把香烟戒掉，那么得癌症的状况会发生什么变化；
  - 第三层级“`反事实`”表示`想象`能力，指想象并不存在的世界，并推测观察到的现象原因为何
    - 为什么是x导致了y，如果当时x没有发生，那么状况会是怎么样的，如果当时采取了其他措施，会发生什么？具体的例子是：我吃了阿司匹林能治好了我的头痛吗？假如奥斯沃德没有刺杀肯尼迪，肯尼迪会活着吗？假如在过去的两年里我没有吸烟会怎样？

  ![](http://p1-tt.byteimg.com/large/pgc-image/S2ZVU0v7v01jZj)

`Judea Pearl` 曾在他的书里《`为什么`》中提到：
- 第一层级“关联”和第二层级“干预”主要针对当前的弱人工智能，包括对现有贝叶斯网络在深度学习领域的拓展、前门标准实践、do-calculus 等核心算法；
- 而第三层级“反事实”是基于基于人的想象力和假设，是人类独有的思考能力，也是令人工智能达到人类智能的关键命门。

![](http://p3-tt.byteimg.com/large/pgc-image/S2ZVU1rE6ABLQW)


## 因果定律

![](http://p1-tt.byteimg.com/large/pgc-image/S2ZVU3k8s8s47y)


## 因果工具

![](http://p6-tt.byteimg.com/large/pgc-image/S2ZVUh471w0ujH)



# 工程实现

- Whitney:
  - 在某个条件下的 群体的平均ite，w=1表示这个病人采用了这个治疗手段（treatment 组），w=0表示这个病人没采用治疗手段（control 组），Y表示在w干预情况下的outcome。也就是说，假设这个病人在治疗组的outcome 减去 假设这个病人在对照组的outcome。一般只能知道 这个病人在治疗组的outcome 或者 这个病人在对照组的outcome。已知的那个叫事实，另外一个不知道的就叫反事实，要知道这个治疗方案到底有没有效果，就要算ite。所以需要推理反事实

<iframe frameborder="0" style="width:100%;height:811px;" src="https://app.diagrams.net/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram.drawio#R1ZdNb9swDIZ%2Fja%2BDLclfxyRrux16WQfsrNmKLVQWA0X52q8fHcuJE7lAgaaB60vMlyJFPXSYOKCLZv9k%2BKp%2BhlKogITlPqDfA0KikGb40SqHTmF53gmVkaVbdBZe5D%2FRRzp1I0uxvlhoAZSVq0uxAK1FYS80bgzsLpctQV3uuuKV8ISXgitf%2FSNLWzs1SvKz44eQVe22zkjaOf7y4rUysNFuv4DQ5fHq3A3vc7mDrmtewm4g0YeALgyA7e6a%2FUKolm2PrYt7fMN7qtsIbd8TQKKYuqAtVxvRV32szR56HhiE6NGYL6VSC1Bgjg76GGZpGKMOK15I27Y7CdFcWwOvol%2BoQbextW0UWlGbBrQdpjleqPv199UJY8V%2BILnzPAlohDUHXOK8lObf4i7IPX00zHpld%2B5mHLoe1INGnkTunqDqlP9MEW8cyLehkg9AjchsNp8W1Ci9hhrdnyn9AFORxQkjk2LKsgkwZR7Tn3qLZ5KgPbh4LuuQuJFNGNpcyUqjUWCYQE7zFoHEYTpzjkaWpbofV5Jfc8UBPQI2ykfApjfiGntcf4ktqM1XBptMAWzigf1teCm%2FMlfmcY3ju3NNPa7PUknLXaYRrB7Gd9AatCJKbkMvTrwxmo%2FRYyPw2I3gZR68BeilkvjXdNrwGLuGx0Z%2FhD4TXu7DqzmsJ07OH4Z3J9enGZBDOlwXYuLs%2FK8sZZ%2FIDs3zG9XRN3htpQ%2F%2FAQ%3D%3D"></iframe>

# 资料

- [贝叶斯网络之父Judea Pearl：新因果科学与数据科学、人工智能的思考](https://www.toutiao.com/i6840890758732448270/)
- 更多[Demo地址](http://wqw547243068.github.io/demo)

# 结束


