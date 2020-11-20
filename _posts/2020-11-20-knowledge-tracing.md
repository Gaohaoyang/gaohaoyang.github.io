---
layout: post
title:  "知识追踪-knowledge tracing"
date:   2020-11-20 16:01:00
categories: 深度学习
tags: 知识追踪 HMM
excerpt: 教育、培训领域，跟踪学员对某个知识点的掌握情况
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

- [knowledge-tracing最新进展](https://paperswithcode.com/task/knowledge-tracing)
  - [GIKT: A Graph-based Interaction Model for Knowledge Tracing](https://paperswithcode.com/paper/gikt-a-graph-based-interaction-model-for)
- [深度知识追踪（Deep Knowledge Tracing）论文学习](https://blog.csdn.net/sereasuesue/article/details/108686717)

# 知识追踪

- Knowledge Tracing  
  - Def:  Knowledge tracing is the task of modelling student knowledge over time so that we can accurately predict how students will perform on future interactions. Usually by observing the correctness of doing exercises.
  - **知识追踪**是基于学生行为序列进行建模，预测学生对知识的掌握程度。知识追踪是构建**自适应教育系统**的核心和关键。在自适应的教育系统中，无论是做精准推送，学生**学习路径规划**或**知识图谱构建**，第一步都是能够精准预测学生对知识的掌握程度。
- ![](https://img-blog.csdnimg.cn/20200919221855940.png)
- 知识追踪问题可以描述为： 
  - 给定一学生的观测序列  x0 ,……, xt 预测下次表现 xt+1 ，通常 xt ={ qt , at } xt={qt,at} ，其中 qt代表回答的问题成分（如对应的知识点），at 代表对应的回答是否正确，通常 at={0,1} 。上图描述了一个学生在八年级数学中的知识追踪结果可视化展示。


- 目前，教育领域通过引入人工智能的技术，使得在线的教学系统成为了智能教学系统（ITS），ITS不同与以往的MOOC形式的课程。ITS能够个性化的为学生制定有效的
- 学习路径，通过根据学生的答题情况追踪学生当前的一个知识点掌握状况，从而可以做到因材施教。
- 在智能教学系统中，当前有使用以下三种模型对学生的知识点掌握状况进行一个追踪判断：
  - **IRT**（Item response theory）  **项目**反应理论
  - **BKT**（Bayesin knowledge tracing） 基于**贝叶斯网络**的学生知识点追踪模型
  - **DKT**(Deep konwledge traing)  基于**深度神经网络**的学生知识点追踪模型   

## 技术方案

- 早期的知识追踪模型都是依赖于一阶马尔科夫模型，例如贝叶斯知识追踪（Bayesian Knowledge Tracing）。
- 将深度学习的方法引入知识追踪最早出现于发表在NeurIPS 2015上的一篇论文《Deep Knowledge Tracing》，作者来自斯坦福大学。在这篇论文中，作者提出了使用**深度知识追踪**（Deep Knowledge Tracing）的概念，利用RNN对学生的学习情况进行建模，之后引出了一系列工作
- 2019年已经有使用Transformer代替RNN和LSTM并且达到了SOTA的论文。
- 由于深度学习并不需要人类教会模型不同题目的难易、考核内容等特定的知识，避免了大量的手工标注特征工作量，而且在互联网在线教育行业兴起后，拥有了海量的学生答题记录，这些答题记录就能教会模型将题库中成千上万条题目encode为一个向量，并且能类似于word2vec那样找出题目之间的关联。

## BKT
- BKT是最常用的一个模型，BKT是含有隐变量的**马尔可夫模型**（HMM）。因此可以采用EM算法或者bruteForce 算法求解参数。
- BKT是对学生知识点的一个变化进行追踪，可以知道学生知识点的一个掌握情况变化。
- 一般有个stop_policy准则，用于判断学生是否经过多轮的做题掌握了相应的知识点。      
  - Once that probability reaches 0.95, the student can be assumed to have learned the skill. The Cognitive Tutors use this threshold to determine when a student should no longer be asked to answer questions of a particular skill

- （1）首先我们来看一下BKT的模型是如何的：
- 如下图，是BKT的一个模型，以及对应的4个主要参数，L0，T，G，S。模型需要根据学生以往的历史答题系列情况学习出这4个对应的参数。
  - ![](https://images2015.cnblogs.com/blog/633472/201706/633472-20170630170929696-1687899647.png)
  - BKT是对不同的的知识点进行建模的，理论上来说，训练数据有多少个知识点，就有多少组对应的（L0，T,G,S）参数。
  - L0：表示学生的未开始做这道题目时，或者为开始连续这项知识点的时候，他的一个掌握程度如何（即掌握这个知识点的概率是多少），这个一般我们可以从  - 训练数据里面求平均值获得，也可以使用经验，比如一般来说掌握的程度是对半概率，那么L0=0.5
  - T ：表示学生经过做题练习后，知识点从不会到学会的概率
  - G：表示学生没掌握这项知识点，但是还是蒙对的概率
  - S：表示学生实际上掌握了这项知识点，但是还是给做错了的概率
通过这4个参数，可以构造一个HMM的模型，剩下的事就是训练这个模型

- （2）有什么改进的吗？
  - 其实可以发现，这样构造模型，还是非常简单的，模型只是只是简单的针对知识点进行训练，所有的学生都是用的同一个模型。但是学生有好有坏，因此可以加个节点，不同的学生使用不同的L0。
  - 另外题目的难度也是可以应用到模型的，比如难度系数大的 G S参数就可以不一样。根据难度系数训练多组G S
 
- 参考论文：
  - From Predictive Models to Instructional Policies


# 结束


