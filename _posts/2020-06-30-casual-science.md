---
layout: post
title:  "因果科学-Casual-Science"
date:   2020-06-30 16:03:00
categories: 自然语言处理 深度学习
tags: 深度学习 NLP KG 知识图谱 表示学习 因果科学 集智俱乐部
excerpt: 如何让AI系统具备真正的推理能力？图灵奖得主、贝叶斯网络之父 Judea Pearl 的解法——因果科学
author: 鹤啸九天
mathjax: true
---

* content
{:toc}


# 总结

- 【2020-9-2】[Bengio讲授因果表示学习，Mila博士因果推理导论开课了](https://www.toutiao.com/i6867722568795685387)，从机器学习的角度编写的《Introduction to Causal Inference》秋季[课程](https://www.bradyneal.com/causal-inference-course#course-textbook)，[教材地址](https://www.bradyneal.com/Introduction_to_Causal_Inference-Aug27_2020-Neal.pdf)，[YouTube地址](https://www.youtube.com/watch?v=CfzO4IEMVUk&list=PLoazKTcS0Rzb6bb9L508cyJ1z-U9iWkA0&index=1)，由 Yoshua Bengio 高徒 Brady Neal 主讲，主要讲述因果推理相关知识。此外，该课程整合了来自许多不同领域的见解，如流行病学、经济学、政治学和机器学习等，这些领域都利用到了因果推理。
  - ![](https://p3-tt.byteimg.com/origin/pgc-image/50a7c51c7b664c4d97c6ffce404790e2?from=pc)
  - 内容：
    - 图模型、后门调整和因果模型结构；
    - 随机化实验、前门调整、do-calculus 和通用识别；
    - 估值和条件平均处理效应（Conditional Average Treatment Effects）；
    - 未观察到的的混淆、边界以及敏感性分析；
    - 工具变量、断点回归、双重差分和合成控制法；
    - 有实验的因果关系发现；
    - 无实验的因果关系发现；
    - 可移植性和迁移学习；
    - 反事实推理以及中介和特定路径效应（Mediation and Path-Specific Effects）。

- 乌鸦智能 ＞ 鹦鹉智能
  - [因果观念新革命？万字长文，解读复杂系统背后的暗因果](https://swarma.org/?p=19906)，[集智俱乐部因果科学专题Github](https://github.com/CausalAI/clubjizhi)，[因果科学与 Causal AI 系列读书会](https://www.sohu.com/a/415039730_741733)
  - 【2020-10-22】[如何在观测数据下进行因果效应评估](https://www.sohu.com/a/426630014_741733)：
    - 相关性比因果性更缺乏 可解释性（Explainability）
    - 相关性比因果性更缺乏 稳定性（Stability）
    - 可行动性（Actionability）：这些虚假相关是由混淆变量产生的混杂偏倚（Confounding Bias），这种决策问题实际上是反事实问题，而不是预测问题。
    - 公平性（Fairness）：通过因果评估的框架，可以用Do-演算（Do-Calculus）等工具，干预收入的多少，来计算肤色与犯罪率之间真正的因果效应大小。
    - 相关性有三种来源：**因果**、**混淆**和**样本选择**。
     - ① 因果关联例子就是天下雨地面会湿，这种关系是能够被人类所理解的、是可解释的、稳定的（无论在任何国家或城市，天下雨地都会湿）。
      - 混淆关联是由混淆偏差（Confounding Bias）造成的。比如图中X是T和Y的共同原因，但如果不对X进行观察，就会发现T和Y是具有相关性的，但T和Y之间是没有直接因果效应的，这就是产生了虚假相关。
      - ② 样本选择偏差（Selection Bias）也会产生相关性，比如之前的例子中，如果数据集中的狗都出现在沙滩上，而没有狗的图片都是草地，那么训练处的模型就会发现草地与狗之间是负相关的，这也产生了虚假相关。
      - ③ 虚假相关与因果关联相比，缺乏可解释性，且容易随着环境变化。在工业界和学术界中，我们都希望能判断两个变量之间的相关究竟是因果关联还是虚假相关。如果是虚假相关的话，可能会给实际的系统带来风险。
      - 所以说，恢复因果可以提高可解释性，帮助我们做出决策，并在未来的数据集中做出稳定而鲁棒的预测，防止算法产生的偏差。无论数据集中有什么样的偏差，我们都希望能挖掘出没有偏差的因果关系，来指导算法。
  - ![](https://swarma.org/wp-content/uploads/2020/05/wxsync-2020-05-381c31fa5614d7d4df7ae1b27e0d393c.png)

- 【2020-9-23】[Introduction to Causal Inference](https://www.bradyneal.com/causal-inference-course)
  - [A Brief Introduction to Causal Inference](https://www.bradyneal.com/slides/1%20-%20A%20Brief%20Introduction%20to%20Causal%20Inference.pdf)
  - [The Flow of Association and Causation in Graphs](https://www.bradyneal.com/slides/3%20-%20The%20Flow%20of%20Association%20and%20Causation%20in%20Graphs.pdf)


- 【2021-1-1】文库资料：
- [因果推理](https://wenku.baidu.com/view/60e4478ccd1755270722192e453610661ed95af5.html)
  - 因果推理的分类：
    - 由因推果：没有复习，所以考不好
    - 由果推因：心情不好，所以一定发生了不好的事情
    - 因果分析：一果多因、一因多果、同因异果、异因同果、互为因果
  - 因果分析的关键：
    - （1）分清主因和次因
    - （2）结果形成的因果链
    - （3）同因异果、异因同果、互为因果
      - 异因同果表面上互不干涉，但用联系的眼光看问题，深入分析下去，背后有共同之处，排除表象的迷惑，接近本质
      - 同因异果也是常见的相互关联，同样的原因在不同条件下可能产生不同的结果
  - 因果推理的误区
    - 因果倒置谬误
    - 强加因果谬误：仅仅把时间上有先后顺序或伴随发生的事看成有因果关系
    - 单一因果谬误：用一个简单、单一的原因解释事件的发生，这个事件可能只是促进作用的原因之一，不是根本原因
    - 滑坡谬误：使用连串的因果推论，却夸大了每个环节的因果强度，即不合理的使用连串的因果关系，将“可能性”转化为“必然性”，而得到不合理的结论，以实现某种意图
    - 臆测原因谬误：针对某个现象（而不是调查分析）得出结论，根据主观臆断推断原因，造成归因偏差
    - 诉诸公众谬误：以多数人相信的命题为事实依据来证明该命题一定是真的
  - 因果推理的运用
    - 补充中间环节：挖掘背后的因果链，找到关键因素
    - 积极归因：
    - 因果推理的目的：清楚某一现象背后的真正原因，包含主因、次因；如果是好现象，引导人们去做，如果是坏现象，告诫人们不该做
- [因果关系的推断](http://www.doc88.com/p-1052907204605.html) 研究疾病里的因果
  - 因果关联的几种方式：
    - （1）单因单果 x → y
    - （2）单因多果 x → y1,y2,y3
    - （3）多因单果 x1,x2,x3 → y
    - （4）多因多果 x1,x2,x3 → y1,y2,y3
    - （5）直接/间接病因 x1 → x2  。。。 → xn → y
  - 统计学关联的本质：原因、偏倚（系统误差）和机遇（随机误差）
  - 统计学关联中，排除虚假关联、间接关联后，是直接关联，再剔除偏倚才是可能的因果关联
  - 因果推断的标准
    - 关联的时间顺序：从因到果，是必要和前提条件
    - 关联的强度：与因果关联可能性成正比
    - 关联的特异性：因果一一对应关系
    - 关联的分布一致性
    - 关联的一致性：多个研究结果的一致性/可重复性增强了因果关联的可能性
- [观察性研究中的因果推断方法(三)30分钟.ppt](https://max.book118.com/html/2017/0930/135243899.shtm)， [百度文库](https://wenku.baidu.com/view/f945a4e8370cba1aa8114431b90d6c85ec3a8823.html)
- [因果作用评价与因果网络学习及其结合](https://mp.weixin.qq.com/s/eQbKE3hMVx6B-sQ3oF0F_w?notreplace=true)
  - 该报告介绍Pearl提出的因果推断的三个层级，综述因果推断的两个主要模型：潜在结果模型、因果网络。探讨因果作用和因果关系的可识别性，因果作用的可传递性，因果网络结构的学习算法，以及因果作用与因果网络结合的因果推断方法。
  - 会议主题：智能大数据统计理想沙龙
  - 会议时间：2020/12/30 15:00-17:00
  - 重复周期：每周(周三)
  - 点击链接入会，或添加至[会议列表](https://meeting.tencent.com/s/robNNEw2NswS)
    - 会议 ID：598 3277 4222
    - 会议密码：14103
  - 【2021-1-6】May 10, 2017, MIT Machine learning expert Jonas Peters of the University of Copenhagen presents “Four Lectures on Causality”.
  - 从因果图模型开始，更广阔的定义了结构化的因果模型，以及如何从数据中识别因果关系。课程介绍了该领域当前（2017）比较前沿的研究，包括用传统机器学习方法进行因果推断的几篇论文。
  - MIT 因果推断 [Mini Lectures on Causality by Jonas Peters 2017](https://www.bilibili.com/video/av90067629/) (无字幕)
    - [ppt地址](https://stat.mit.edu/news/four-lectures-causality/)

  <iframe src="//player.bilibili.com/player.html?aid=90067629&bvid=BV1o7411L7dp&cid=153821743&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="350px" height="266px" > </iframe>

- 【因果推断】 [A Brief Introduction to Causal Inference by Brady Neal](https://www.bilibili.com/video/BV1CK4y1L7uA/?spm_id_from=333.788.videocard.5)
- [Causal inference course written from a machine learning perspective](https://www.bradyneal.com/causal-inference-course)，包含课程ppt列表

<iframe src="//player.bilibili.com/player.html?aid=885688534&bvid=BV1CK4y1L7uA&cid=267895326&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="350px" height="266px" > </iframe>


# 因果推理书籍

## 书籍汇总

### （1）The book of why
- 【2020-12-04】因果推理书籍索引，[Which causal inference book you should read](https://www.bradyneal.com/which-causal-inference-book)
- ![](https://www.bradyneal.com/img/books_flowchart.svg)

- 书籍：
  - ![](http://5b0988e595225.cdn.sohucs.com/images/20190716/935359c273384228b196eac31077b762.jpeg)
- 《The book of Why》，豆瓣高达9.5分。其中文版《为什么：关于因果关系的新科学》由中信出版社推出
- 因果推理和贝叶斯网络的创始人，图灵奖得主`Judea Peral`（朱迪亚·珀尔，贝叶斯网络之父）和科普作家 Mackenzie, Dana合作写的一本因果推理的入门书。
  - 朱迪亚•珀尓（Judea Pearl），加州大学洛杉矶分校计算机科学教授，“贝叶斯网络”之父。2011年，珀尔因“通过发展概率和因果推理对人工智能的奠基性贡献”获得了计算机科学的最高荣誉图灵奖
  - ![](http://5b0988e595225.cdn.sohucs.com/images/20190716/7cee9f86eaea4b12af02c573bac064ed.jpeg)
- 目录
  - 导言：思维胜于数据
  - 第一章：因果关系之梯
  - 第二章：从海盗到豚鼠：因果推断的起源
  - 第三章：从证据到因：当贝叶斯牧师遇见福尔摩斯先生
  - 第四章：混杂和去混杂：或者，消灭潜伏变量
  - 第五章：烟雾缭绕的争论：消除迷雾，澄清事实
  - 第六章：大量的悖论！
  - 第七章：超越调整：征服干预之峰
  - 第八章：反事实：挖掘关于假如的世界
  - 第九章：中介：寻找隐藏的作用机制
  - 第十章：大数据，人工智能和大问题

### （2）因果关系：模型、论证与推断

- 《Causality : Models, Reasoning and Inference》（第二版）
- 作者：Judea Pearl
- 目录
  - 1 概率、图表和因果模型简介
  - 2 推论因果关系理论
  - 3 因果图和因果效应的识别
  - 4 行动、计划和直接影响
  - 5 社会科学和经济学中的因果关系和结构模型
  - 6 辛普森悖论、混乱与崩溃
  - 7 基于结构的反事实逻辑
  - 8 个不完善实验：边界效应与反事实
  - 9 因果关系的可能性：解释与识别
  - 10 实际原因
  - 11 与读者的思考、阐述和讨论


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


# 机器学习理论的缺陷

- [图灵奖得主Judea Pearl：机器学习的理论局限性与因果推理的七大特性](https://cloud.tencent.com/developer/article/1119926)

- 【2018-5-10】近日，有越来越多的学者正在探讨机器学习（和深度学习）的局限性，并试图为人工智能的未来探路
  - [纽约大学教授 Gary Marcus 就对深度学习展开了系统性的批判](http://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&mid=2650735630&idx=1&sn=5840c3e9bed487da3a9080d482fcc58e&chksm=871ac070b06d496638d47dbdaac75fdec06c5e81a3afaee1e1ce2ea37e86d92ba61de8b2b7c9&scene=21#wechat_redirect)
  - 图灵奖获得者，UCLA 教授 Judea Pearl 题为《[Theoretical Impediments to Machine Learning with Seven Sparks from the Causal Revolution](http://ftp.cs.ucla.edu/pub/stat_ser/r475.pdf)》的论文中，作者就已探讨了当前机器学习存在的理论局限性，并给出了面向解决这些问题，来自因果推理的七个启发。
  - 当前的机器学习几乎完全是统计学或黑箱的形式，从而为其性能带来了严重的理论局限性。这样的系统不能推断干预和反思，因此不能作为强人工智能的基础。为了达到人类级别的智能，学习机器需要现实模型（类似于因果推理的模型）的引导。为了展示此类模型的关键性，我将总结展示 7 种当前机器学习系统无法完成的任务，并使用因果推理的工具完成它们。
  - ![](https://ask.qcloudimg.com/http-save/yehe-1754229/e245kls6qs.jpeg?imageView2/2/w/1620)

## 因果推理模型的 7 种特性

- 【2021-1-9】和家人一起去一个未知的目的地度假。假期前后，你都在纠结一些与事实相悖的问题:
  - 假期里我们应该做什么？
  - 我们会开心吗？
  - 我们为什么会觉得开心？
  - 之后我们会有什么感觉？

![](http://imgcdn.atyun.com/2019/06/2-8.png)


- 考虑以下 5 个问题：
  - 给定的疗法在治疗某种疾病上的有效性？
  - 是新的税收优惠导致了销量上升吗？
  - 每年的医疗费用上升是由于肥胖症人数的增多吗？
  - 招聘记录可以证明雇主的性别歧视罪吗？
  - 我应该放弃我的工作吗？
- 这些问题的一般特征是它们关心的都是原因和效应的关系，可以通过诸如「治疗」、「导致」、「由于」、「证明」和「我应该」等词识别出这类关系。这些词在日常语言中很常见，并且我们的社会一直都需要这些问题的答案。然而，直到最近也没有足够好的科学方法对这些问题进行表达，更不用说回答这些问题了。和几何学、机械学、光学或概率论的规律不同，原因和效应的规律曾被认为不适合应用数学方法进行分析。
- 这种误解有多严重呢？实际上仅几十年前科学家还不能为明显的事实「mud does not cause rain」写下一个数学方程。即使是今天，也只有顶尖的科学社区能写出这样的方程并形式地区分「mud causes rain」和「rain causes mud」。
- 过去三十年事情已发生巨大变化。一种强大而透明的数学语言已被开发用于处理因果关系，伴随着一套把因果分析转化为数学博弈的工具。这些工具允许我们表达因果问题，用图和代数形式正式编纂我们现有的知识，然后利用我们的数据来估计答案。进而，这警告我们当现有知识或可获得的数据不足以回答我们的问题时，暗示额外的知识或数据源以使问题变的可回答。

- 我把这种转化称为「因果革命」（Pearl and Mackenzie, 2018, forthcoming），而导致因果革命的数理框架我称之为「结构性因果模型」（SCM）。

- SCM 由三部分构成：
  - 图模型
  - 结构化方程
  - 反事实和介入式逻辑
- 图模型作为表征知识的语言，反事实逻辑帮助表达问题，结构化方程以清晰的语义将前两者关联起来。

接下来介绍 SCM 框架的 7 项最重要的特性，并讨论每项特性对自动化推理做出的独特贡献。
1. 编码因果假设—透明性和可试性
  - 图模型可以用紧凑的格式编码因果假设，同时保留透明性和可试性。其透明性使我们可以了解编码的假设是否可信（科学意义上），以及是否有必要添加其它假设。可试性使我们（作为人类或机器）决定编码的假设是否与可用的数据相容，如果不相容，分辨出需要修改的假设。利用 d-分离（d-separate）的图形标准有助于以上过程的执行，d-分离构成了原因和概率之间的关联。通过 d-分离可以知道，对模型中任意给定的路径模式，哪些依赖关系的模式才是数据中应该存在的（Pearl，1988）。
2. do-calculus 和混杂控制
  - 混杂是从数据中提取因果推理的主要障碍，通过利用一种称为「back-door」的图形标准可以完全地「解混杂」。特别地，为混杂控制选择一个合适的协变量集合的任务已被简化为一种简单的「roadblocks」问题，并可用简单的算法求解。（Pearl，1993）
  - 为了应对「back-door」标准不适用的情况，人们开发了一种符号引擎，称为 do-calculus，只要条件适宜，它可以预测策略干预的效应。每当预测不能由具体的假设确定的时候，会以失败退出（Pearl, 1995; Tian and Pearl, 2002; Shpitser and Pearl, 2008）。
3. 反事实算法
  - 反事实分析处理的是特定个体的行为，以确定清晰的特征集合。例如，假定 Joe 的薪水为 Y=y，他上过 X=x 年的大学，那么 Joe 接受多一年教育的话，他的薪水将会是多少？
  - 在图形表示中使用反事实推理是将因果推理应用于编码科学知识的非常有代表性的研究。每一个结构化方程都决定了每一个反事实语句的真值。因此，我们可以解析地确定关于语句真实性的概率是不是可以从实验或观察研究（或实验加观察）中进行估计（Balke and Pearl, 1994; Pearl, 2000, Chapter 7）。
  - 人们在因果论述中特别感兴趣的是关注「效应的原因」的反事实问题（和「原因的效应」相对）。（Pearl，2015）
4. 调解分析和直接、间接效应的评估
  - 调解分析关心的是将变化从原因传递到效应的机制。对中间机制的检测是生成解释的基础，且必须应用反事实逻辑帮助进行检测。反事实的图形表征使我们能定义直接和间接效应，并确定这些效应可从数据或实验中评估的条件（Robins and Greenland, 1992; Pearl, 2001; VanderWeele, 2015）
5. 外部效度和样本选择偏差
  - 每项实验研究的有效性都需要考虑实验和现实设置的差异。不能期待在某个环境中训练的模型可以在环境改变的时候保持高性能，除非变化是局域的、可识别的。上面讨论的 do-calculus 提供了完整的方法论用于克服这种偏差来源。它可以用于重新调整学习策略、规避环境变化，以及控制由非代表性样本带来的偏差（Bareinboim and Pearl, 2016）。
6. 数据丢失
  - 数据丢失的问题困扰着实验科学的所有领域。回答者不会在调查问卷上填写所有的条目，传感器无法捕捉环境中的所有变化，以及病人经常不知为何从临床研究中突然退出。对于这个问题，大量的文献致力于统计分析的黑箱模型范式。使用缺失过程的因果模型，我们可以形式化从不完整数据中恢复因果和概率的关系的条件，并且只要条件被满足，就可以生成对所需关系的一致性估计（Mohan and Pearl, 2017）。
7. 挖掘因果关系
  - 上述的 d-分离标准使我们能检测和列举给定因果模型的可测试推断。这为利用不精确的假设、和数据相容的模型集合进行推理提供了可能，并可以对模型集合进行紧凑的表征。人们已在特定的情景中做过系统化的研究，可以显著地精简紧凑模型的集合，从而可以直接从该集合中评估因果问询。

- NIPS 2017 研讨会 Q&A
  - 我在一个关于机器学习与因果性的研讨会（长滩 NIPS 2017 会议之后）上发表了讲话。随后我就现场若干个问题作了回应。我希望从中你可以发现与博客主题相关的问题和回答。
- 一些人也想拷贝我的 PPT，下面的链接即是，并附上[论文](http://ftp.cs.ucla.edu/pub/stat_ser/r475.pdf)：
  - NIPS 17 – What If? Workshop Slides [PDF](http://causality.cs.ucla.edu/blog/wp-content/uploads/2017/12/nips-dec2017-bw.pdf)
  - NIPS 17 – What If? Workshop Slides [PDF](http://causality.cs.ucla.edu/blog/wp-content/uploads/2017/12/nips-dec2017-bw.pdf)

- 问题 1：「因果革命」是什么意思？
  - 回答：「革命」是诗意用法，以总结 Gary King 的奇迹般的发现：「在过去几十年里，对于因果推断的了解比以前所有历史记载的总和还要多」（参见 Morgan 和 Winship 合著的书的封面，2015）。三十年之前，我们还无法为「Mud does not cause Rain」编写一个公式；现在，我们可以公式化和评估每一个因果或反事实陈述。
- 问题 2：由图模型产生的评估与由潜在结果的方法产生的评估相同吗？
  - 回答：是的，假设两种方法开始于相同的假设。图方法（graphical approach）中的假设在图中被展示，而潜在结果方法（potential outcome approach）中的假设则通过使用反事实词汇被审查者单独表达。
- 问题 3：把潜在的结果归因于表格个体单元的方法似乎完全不同于图方法中所使用的方法。它们的区别是什么？
  - 回答：只在有可条件忽略的特定假设成立的情况下，归因才有效。表格本身并未向我们展示假设是什么，其意义是什么？为了搞明白其意义，我们需要一个图，因为没有人可在头脑中处理这些假设。流程上的明显差异反映了对假设可见的坚持（在图框架中），而不是使其隐藏。
- 问题 4：有人说经济学家并不使用图，因为其问题不同，并且也没能力建模整个经济。你同意这种解释吗？
  - 回答：不同意！从数学上讲，经济问题与流行病学家（或其他科学家）面临的问题并无不同，对于后者来讲，图模型已经成为了第二语言。此外，流行病学家从未抱怨图迫使其建模整个人体解剖结构。（一些）经济学家中的图规避（graph-avoidance）是一种文化现象，让人联想到 17 世纪意大利教会天文学家避开望远镜。底线：流行病学家可以判断他们的假设的合理性——规避掉图的经济学家做不到（我提供给他们很多公开证明的机会，并且我不责怪他们保持沉默；没有外援，这个问题无法被处理）。
- 问题 5：深度学习不仅仅是盛赞曲线拟合？毕竟，曲线拟合的目标是最大化拟合，同时深度学习中很多努力也在最小化过拟合。
  - 回答：在你的学习策略中不管你使用何种技巧来最小化过拟合或其他问题，你依然在优化已观察数据的一些属性，同时不涉及数据之外的世界。这使你立即回到因果关系阶梯的第一阶段，其中包含了第一阶段要求的所有限制。


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

- 因果推断
  - 因果推断区分了人们可能想要估计的两种条件分布。机器学习中，通常只会估计一种分布，但在某些情况下，可能也需要估计第二种。
- 观察给定一个x后，变量y会发生什么变化。这就引申出两种表述： 
  - （1）观察p(y|x)：如果观察变量X取值于x，Y的相应分布是什么？这是我们常在监督学习中遇到问题，它是一个条件分布，可以从p(x,y,z,…)中计算出它的两个边缘概率：p(y|x) = p(x,y)/p(x)。相信所有人都不会对这个公式感到陌生，也都会计算。 
  - （2）介入p(y|do(x))：如果设X的值为x，那Y的相应分布是什么？这其实就是通过人为把X的值设为x来干预数据生成过程，但其余变量还是用原先的生成方式，以此观察Y的变化（请注意，数据生成过程与联合分布p(x,y,z,…)不同）。
- p(y|x)和p(y|do(x))不一样，p(y|do(x))实际上和x无关
- p(y|do(x))实际上就是一个普通的条件分布，但它不是基于 p(x,z,y,…)的，而是pdo(X=x)(x,z,y,…)。这里的pdo(X=x)是如果实际进行干预的话会观察到的数据的联合分布。所以p(y|do(x))是从随机对照试验或A/B测试收集到的数据中学习的条件分布，其中x由实验者控制。
- 即便不能从随机实验中直接估计p(y|do(x))，这个分布也是实际存在的。所以因果推断和do-calculus的主要观点是：
  - 如果我不能在随机对照实验中直接测量p(y|do(x))，那我是否可以根据我在受控实验之外观察到的数据来估计它？
  - ![](https://www.inference.vc/content/images/2018/05/Causality_-building-a-bridge--1-.png)
  - ![](https://www.inference.vc/content/images/2018/05/Causality_-do-calculus-estimand--1-.png)
- 参考作者：[骑驴看热闹](https://www.zhihu.com/question/283897078/answer/756671333)，英文原文：[ML beyond Curve Fitting: An Intro to Causal Inference and do-Calculus](https://www.inference.vc/untitled/)

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

|层级|能力提现|数学表达|说明|
|---|---|---|---|
|反事实|想象|P(y_x\|x', y')|因果推断的最高层|
|干预|行动|P(y\|do(x), z)|执行某动作会带来的结果|
|关联|观察|P(y\|x)|发现规律→机器学习|



`Judea Pearl` 曾在他的书里《`为什么`》中提到：
- 第一层级“关联”和第二层级“干预”主要针对当前的弱人工智能，包括对现有贝叶斯网络在深度学习领域的拓展、前门标准实践、do-calculus 等核心算法；
- 而第三层级“反事实”是基于基于人的想象力和假设，是人类独有的思考能力，也是令人工智能达到人类智能的关键命门。

![](http://p3-tt.byteimg.com/large/pgc-image/S2ZVU1rE6ABLQW)

- 【2020-9-5】攀上因果关系的阶梯
  - 珀尔描述了从仅仅观察相关性到检验因果性的转变，即从因果关系阶梯的第一级上升到第二级。
  - 摘自：[因果之箭指向何方？| 图灵奖得主珀尔的《为什么》](https://www.toutiao.com/i6755077246928552452)
![](https://p1-tt.byteimg.com/origin/pgc-image/e9f24e01f21f4b2b92c5fd877c9c20e2?from=pc)

- 当前的机器学习无力回答反事实的问题，大多数机器学习模型甚至使用了不可能回答这一问题的表示。
![](https://pic1.zhimg.com/80/v2-4722c095e0b8393476843c8be7704808_1440w.jpg)

## 因果定律

![](http://p1-tt.byteimg.com/large/pgc-image/S2ZVU3k8s8s47y)

- Pearl的因果推断理论共有7大支柱：
  - 有意义而紧凑的因果假设表示（graphical表示）
  - 混杂因子控制（back-door、front-door、do-calculus）
  - 反事实算法（本文重点介绍的内容）
  - 媒介分析（反事实的graphical表示）
  - 学习迁移、外部验证、取样偏差（do-calculus、selection diagrams）
  - 数据缺失（graphical标准）
  - 因果发现（寻找和数据兼容的模型，并紧凑地表示它们）

- Pearl同时开发了结构化因果模型（Structural Causal Model, SCM），一个形式化地描述因果推断的框架
![](https://pic2.zhimg.com/80/v2-cde33f828397d5ad19fd5a375c72e0c5_720w.jpg)

- 摘自：[“无人问津”的贝叶斯网络之父Judea Pearl在NIPS 2017上到底报告了啥](https://zhuanlan.zhihu.com/p/31930409)

## 因果工具

![](http://p6-tt.byteimg.com/large/pgc-image/S2ZVUh471w0ujH)

- 因果模型
  - 当只有蓝色分布中的采样数据时，怎么凭空造出绿色分布中的数据。这时就要用到do-calculus。它允许慢慢探索绿色条件分布，直到可以根据蓝色分布下的各种边际分布、条件分布和期望来表
  - ![](https://pic4.zhimg.com/80/v2-8c82015e505280e3b4c87e0a676d735e_720w.jpg?source=1940ef5c)
- Do-calculus
  - 最终如果能获得一个p̃(y|do(x))的等价公式，（不再有任何do操作符），则因果查询p̃(y|do(x))是可识别，否则不能识别
  - ![](https://pic1.zhimg.com/80/v2-c995f1ba9331c306f59caa2cf150cc8f_720w.jpg?source=1940ef5c)



# 工程实现

- Whitney:
  - 在某个条件下的 群体的平均ite，w=1表示这个病人采用了这个治疗手段（treatment 组），w=0表示这个病人没采用治疗手段（control 组），Y表示在w干预情况下的outcome。也就是说，假设这个病人在治疗组的outcome 减去 假设这个病人在对照组的outcome。一般只能知道 这个病人在治疗组的outcome 或者 这个病人在对照组的outcome。已知的那个叫事实，另外一个不知道的就叫反事实，要知道这个治疗方案到底有没有效果，就要算ite。所以需要推理反事实

<iframe frameborder="0" style="width:100%;height:811px;" src="https://app.diagrams.net/?lightbox=1&highlight=0000ff&edit=_blank&layers=1&nav=1&title=Untitled%20Diagram.drawio#R1ZdNb9swDIZ%2Fja%2BDLclfxyRrux16WQfsrNmKLVQWA0X52q8fHcuJE7lAgaaB60vMlyJFPXSYOKCLZv9k%2BKp%2BhlKogITlPqDfA0KikGb40SqHTmF53gmVkaVbdBZe5D%2FRRzp1I0uxvlhoAZSVq0uxAK1FYS80bgzsLpctQV3uuuKV8ISXgitf%2FSNLWzs1SvKz44eQVe22zkjaOf7y4rUysNFuv4DQ5fHq3A3vc7mDrmtewm4g0YeALgyA7e6a%2FUKolm2PrYt7fMN7qtsIbd8TQKKYuqAtVxvRV32szR56HhiE6NGYL6VSC1Bgjg76GGZpGKMOK15I27Y7CdFcWwOvol%2BoQbextW0UWlGbBrQdpjleqPv199UJY8V%2BILnzPAlohDUHXOK8lObf4i7IPX00zHpld%2B5mHLoe1INGnkTunqDqlP9MEW8cyLehkg9AjchsNp8W1Ci9hhrdnyn9AFORxQkjk2LKsgkwZR7Tn3qLZ5KgPbh4LuuQuJFNGNpcyUqjUWCYQE7zFoHEYTpzjkaWpbofV5Jfc8UBPQI2ykfApjfiGntcf4ktqM1XBptMAWzigf1teCm%2FMlfmcY3ju3NNPa7PUknLXaYRrB7Gd9AatCJKbkMvTrwxmo%2FRYyPw2I3gZR68BeilkvjXdNrwGLuGx0Z%2FhD4TXu7DqzmsJ07OH4Z3J9enGZBDOlwXYuLs%2FK8sZZ%2FIDs3zG9XRN3htpQ%2F%2FAQ%3D%3D"></iframe>


# [如何在观测数据下进行因果效应评估](https://www.sohu.com/a/426630014_741733)

- 【2020-10-22】[如何在观测数据下进行因果效应评估](https://www.sohu.com/a/426630014_741733)

## 导语
 
- 什么是因果？因果性与相关性的区别是什么？相关性有哪几种来源？如何评估因果效应？在2020年集智-凯风研读营中，浙江大学计算机学院助理教授况琨就上述问题做了系统梳理，本篇是文字整理版。
 - 自9月20日（周日）开始，集智俱乐部联合北京智源人工智能研究院还将举行一系列有关因果推理的读书会，欢迎更多的有兴趣的同学和相关研究者参加，一起迎接因果科学的新时代。
 
## 1. 因果性与相关性
 
### 1.1 什么是因果
 
![](https://p2.itc.cn/q_70/images03/20201023/abf0d82abec84b6aa7f375eb84b8425b.jpeg)
 
什么是因果呢？“因”其实就是引起某种现象发生的原因，而“果”就是某种现象发生后产生的结果。因果问题在我们日常生活中十分常见。
 
- 首先在医疗方面。比如在这次新冠疫情中，各个国家都在争先恐后地研发疫苗，但在疫苗上市之前还需要做很多次单盲实验、双盲实验，其背后就是基于随机对照实验的一些因果推理和因果效应评估，确定药物于病人康复之间的因果效应。
- 其次在社会科学方面。比如在国家出台新的政策前，就要利用因果推理手段来估计这个政策会给民众、经济效应和社会效应带来多大影响。
- 最后在市场营销方面。比如在推广告之前，就需要使用随机对照试验或者A/B测试，选择广告推送的策略以实现效益最大化。
 
### 1.2 因果性与相关性的区别
 
![](http://p5.itc.cn/q_70/images03/20201023/76d7cd05ee374688a3d1510e467888d6.jpeg)
 
- （1）相关性比因果性更缺乏 可解释性（Explainability）。这张图中，黑线是肯塔基州的结婚率，而红线是渔船事故死亡人数，两者具有很高的相关性，但两者之间却没有任何因果关系。我们在使用数据的时候就需要知道，这里的相关性是不可靠的、不可解释的。
 
![](http://p6.itc.cn/q_70/images03/20201023/00c9e83da59c454f85593c3522b22e88.jpeg)
 
另外一个例子是太阳镜与冰淇淋的销售量之间的关系，两者之间呈现着明显的正相关性。但如果我们直接关闭太阳镜商店，进行干预，会影响冰淇淋的销量吗？并不会。因为两者之间的虚假相关性是由天气引发的，在太阳炎热时两者的消费量都会提升，强制干预其中一个的销量并不会直接影响另一个。
 
![](http://p5.itc.cn/q_70/images03/20201023/fe9e991d7ddb4707aa503a1adeb609f4.jpeg)
 
- （2）相关性比因果性更缺乏 稳定性（Stability）。比如我们训练模型去识别图片中的狗，但数据集中90%的狗都是在草地上的，那么在这个数据集中草地与狗就十分相关。那么如果我们利用传统机器学习的方法，无论是逻辑斯蒂回归还是深度模型，大概率会把草地识别为重要的特征。但如果测试数据集中的狗是在沙滩上或者水中，模型就有很大概率会失败。
 
传统机器学习使基于关联驱动的，对于未知的测试数据集很难达到稳定预测。传统机器学习在关联挖掘中会发现一些非因果特征，比如草地背景与标签的关系，并利用这种强的虚假相关（Spurious Correlation）进行预测。如果我们能够发现特征与标签之间的因果关系，比如我们人类在识别狗的时候就会去关注够的鼻子、眼睛和耳朵这些因果特征，那么无论狗是在什么背景下，我们都可以正确识别。
 
![](http://p6.itc.cn/q_70/images03/20201023/9d14e6e0cad6495db4e8b5a17f5e534d.jpeg)
 
- （3）第三个区别是 可行动性（Actionability）。比如某个电商在推广某个商品时，需要从两个广告推荐算法中进行选择，看哪个算法能带来的收益更大。
 
如图所示，前期的试验发现，新算法B比旧算法 A 的总体成功率更高。但如果将用户按收入分为两层，却会发现算法A在低收入人群和高收入人群中的效果反而都优于 B 。两个算法的试验对象中，收入分布的差别很大，如果不进行控制，就会产生错误的结果。而除了收入之外，可能还需要考虑地域、年龄等多个变量，否则就会产生算法与成功率之间的虚假相关。
 
这些虚假相关是由混淆变量产生的混杂偏倚（Confounding Bias）。这种决策问题实际上是反事实问题，而不是预测问题。
 
![](http://p2.itc.cn/q_70/images03/20201023/953de93e7051456094019c8ee6edb2ac.jpeg)
 
- （4）第四个区别是 公平性（Fairness）。Google曾开发了根据人像判断犯罪率的软件，输入为黑人时犯罪率就会比白人更高。而肤色与犯罪率之间不应该存在因果关系，这就出现了公平性的问题。实际上如图所示，真正起决定性作用的变量是“收入”，黑人的收入普遍偏低，而低收入人群的犯罪率较高，因此肤色和犯罪率之间出现了虚假相关。
 
而通过因果评估的框架，我们可以利用Do-演算（Do-Calculus）等工具，干预收入的多少，来计算肤色与犯罪率之间真正的因果效应大小。实际上，收入和犯罪率才是强因果相关的，而肤色和犯罪率之间因果效应可以弱到忽略不计。
 
### 1.3 相关性的三种来源
 
![](http://p0.itc.cn/q_70/images03/20201023/1607eaf7a809412d861ab4d0342ccf7e.jpeg)
 
相关性有三种来源：因果、混淆和样本选择。
 
- 因果关联例子就是天下雨地面会湿，这种关系是能够被人类所理解的、是可解释的、稳定的（无论在任何国家或城市，天下雨地都会湿）。
- 混淆关联是由混淆偏差（Confounding Bias）造成的。比如图中X是T和Y的共同原因，但如果不对X进行观察，就会发现T和Y是具有相关性的，但T和Y之间是没有直接因果效应的，这就是产生了虚假相关。
- 样本选择偏差（Selection Bias）也会产生相关性，比如之前的例子中，如果数据集中的狗都出现在沙滩上，而没有狗的图片都是草地，那么训练处的模型就会发现草地与狗之间是负相关的，这也产生了虚假相关。
 
虚假相关与因果关联相比，缺乏可解释性，且容易随着环境变化。在工业界和学术界中，我们都希望能判断两个变量之间的相关究竟是因果关联还是虚假相关。如果是虚假相关的话，可能会给实际的系统带来风险。
 
所以说，恢复因果可以提高可解释性，帮助我们做出决策，并在未来的数据集中做出稳定而鲁棒的预测，防止算法产生的偏差。无论数据集中有什么样的偏差，我们都希望能挖掘出没有偏差的因果关系，来指导算法。
 
### 1.4 符号定义
 
![](http://p8.itc.cn/q_70/images03/20201023/34285df4a17040638815b0ca971c038d.jpeg)
 
这里给出关于因果的一个比较实际的定义：变量 T 的变量 Y 的原因，变量 Y 是变量 T 的结果，当且仅当在控制其他所有变量不变时，改变 T 会引发 Y 的变化。而因果效应（Causal Effect）就是改变变量 T 一个单位时，变量 Y 发生改变的大小。这里的两个重点是：一、只修改 T 的值，二、保持其他变量不变。
 
![](http://p2.itc.cn/q_70/images03/20201023/08e7a1c467eb4cc58ded3d1ea80e7afa.jpeg)
 
这里给出因果效应评估（Causal Effect Estimation）的数学形式。以评估药物的因果效应为例，干预变量（Treatment Variable）T 的值为1时代表吃了药，0代表没吃药，而这对应了两者不同的潜在结果。平均因果效应（Average Causal Effect, ATE）就是吃药的潜在结果与不吃药的潜在结果在所有病人上的差值平均值。个体因果效应（Individual Causal Effect, ICE）就是吃药的潜在结果与不吃药的潜在结果在某个病人上的差值。
 
这里还涉及反事实的问题：对于某个病人，我们只能观测到他吃药或不吃药其中一种情况的结果，想要探究未发生的另一种情况的结果，就需要假象存在一个平行世界，这个世界里病人做出了与之前不同的选择，除此之外都保持完全一致，对比两个世界的结果进行求解。
 
在实际应用中，随机化实验（Randomized Experiments）是因果效应评估的金标准。比如在疫苗研发中，就需要做双盲实验和单盲实验以评估因果效应。在足够大的实验人群中，通过完全随机的方法使其中一半人接种疫苗，这样就排除了其他变量的影响，求得平均因果效应。这种方法在政策评估、健康医疗和市场营销等多个领域都有重要应用，但这种方法的花销巨大，且可能涉及伦理道德问题。那么我们可否在巨量的历史观测数据中进行挖掘，评估出因果效应呢？
 
![](http://p5.itc.cn/q_70/images03/20201023/374bcf917b9840078a24aa2eaf5965da.jpeg)
 
比如在一个数据集中，有吃药和未吃药的两群人。如果在数据收集时是使用单盲或双盲实验，那么就可以直接去计算平均因果效应。但如果没有保证分配药物的随机性，就可能会有体质、性别、年龄等混杂因子 X 使结果产生偏倚。因果推理的本质就是去控制吃药和不吃药的两群人之间其他特征的分布。
 
## 2. 因果效应评估的方法
 
![](http://p3.itc.cn/q_70/images03/20201023/195419e9e0924f50a50262743032e074.jpeg)
 
现在我们考虑干预变量为二值的情况，要去平衡其他变量的分布，再做因果效应评估。在这里介绍三种方法：Matching、Propensity Score Based Methods 和 Directly Confounder Balancing。
 
- 首先给出在观测数据下做因果推理的三个假设：
  - 一、Stable Unit Treatment Value(SUTV) 变量之间是独立的：我是否吃药的结果不受别人是否吃药的影响。
  - 二、Unconfounderness 所有混淆变量都被观测到了。
  - 三、Overlap 各种干预变量的取值概率都应该在0到1之间。
 
### 2.1 Matching
 
![](http://p2.itc.cn/q_70/images03/20201023/31fd0c25335b4be38ec888e86d02268a.jpeg)
 
第一种方法叫 Mathching。在两个不同的处理群体之间，逐一寻找并匹配其他特征变量都相同的个体，如果找不到就舍弃此个体，这样就可以保证有匹配的那些样本中其他特征的分布在一定范围内是相似的，进而初步去评估因果效应。
 
Matching 的问题就是如何去评估两个个体的相似度，并需要设定可以接受的差异阈值，在舍弃样本数和相似度之间进行平衡。其次对于高维数据，很难找到相似样本：比如有10个二值变量，就需要至少1025个样本才能保证找到相同个体。
 
### 2.2 Propensity Score Based Methods
 
![](http://p9.itc.cn/q_70/images03/20201023/bbfabb89f29a48aa98f9645ba8101980.jpeg)
 
第二类方法是基于倾向指数/倾向得分（Propensity Score）的。倾向指数的定义就是在干预变量之外的其他特征变量为一定值的条件下，个体被处理的概率。Rubin 证明了在给定倾向指数的情况下，Unconfounderness 假设就可以满足。倾向指数其实概括了群体的特征变量，如果两个群体的倾向指数相同，那他们的干预变量就是与其他特征变量相独立的。
 
比如说，如果能保证两群人的他吃药的概率完全一样，那么可以说这两群人其他特征分布也是一样。
 
![](http://p3.itc.cn/q_70/images03/20201023/82377c908ed14366a41456128b0e8850.jpeg)
 
倾向指数在实际应用中是观测不到的，但可以使用有监督学习的方法进行估计。根据估计到的倾向指数，第一种方法就是去做 Matching，这样能解决在高维数据中难以找到相似样本的问题。
 
![](http://p8.itc.cn/q_70/images03/20201023/c12e3f6f4c204a2d93717faad04249f8.jpeg)
 
![](http://p0.itc.cn/q_70/images03/20201023/bfd5bac5adce4f7798f8ecdc4eb355a3.jpeg)
 
![](http://p7.itc.cn/q_70/images03/20201023/a58e43d94704412cb0a9bc4600e9ebf3.jpeg)
 
第二种是使用 Inverse of Propensity Weighting 方法，对于干预变量为1的样本使用倾向指数的倒数进行加权，而对于为0的样本使用（1-倾向指数）的倒数进行加权，两类样本的加权平均值之差就是平均因果效应的大小。这里有一个假设，就是估计出的倾向指数与真实的倾向指数是相等的。
 
因此这个方法有两个弱点，一是需要对倾向指数的估计足够精确；二是如果倾向指数过于趋近0或1，就会导致某些权重的值过高，使估计出的平均因果效应的方差过大。
 
![](http://p5.itc.cn/q_70/images03/20201023/7dd746d458784ac1b14a7e70cb39e204.jpeg)
 
第三种方法叫 Doubly Robust。这个方法需要根据已有数据，再学习一个预测的模型，反事实评估某个个体在干预变量变化后，结果变量的期望值。只要倾向指数的估计模型和反事实预测模型中有一个是对的，计算出的平均因果效应就是无偏的；但如果两个模型估计都是错误的，那产生的误差可能会非常大。
 
![](http://p8.itc.cn/q_70/images03/20201023/f381c9a03e8d4e61bd8dbfc82d5a18d4.jpeg)
 
以上的这三种基于倾向指数的方法比较粗暴，把干预变量和结果变量之外的所有变量都当作混淆变量。而在高维数据中，我们需要精准地找出那些真正需要控制的混淆变量。我们提出了一种数据驱动的变量分解算法（D²VD），将干预变量和结果变量之外的其他变量分为了三类：
1. 混淆变量（Confounders）：既会影响到干预变量，还会影响到结果变量
2. 调整变量（Adjustment Variables）：与干预变量独立，但会影响到结果变量
3. 无关变量：不会直接影响到干预变量与结果变量
 
进行分类之后，就可以只用混淆变量集去估计倾向指数。而调整变量集会被视为对结果变量的噪声，进行消减。最后使用经过调整的结果，去估计平均因果效应。我们从理论上证明了，使用这种方法可以得到无偏的平均因果效应估计，而且估计结果的方差不会大于 Inverse of Propensity Weighting 方法。
 
![](http://p2.itc.cn/q_70/images03/20201023/7b32806ae2754a14920f5df48350fb73.jpeg)
 
我的学生又拓展了我的工作，与表征学习相结合，提出了 Decomposed Representation。其中增加了一类变量：

4. 工具变量：与结果变量独立，但会影响到干预变量
 
通过实验发现，与传统方法相比，此方法可以很准确地把变量分离出来，提高平均因果效应的准确性。
 
![](http://p9.itc.cn/q_70/images03/20201023/5e0c1611b9fb4402a6e60f913eb404eb.jpeg)
 
### 2.3 Directly Confounder Balancing
 
总的来说，基于倾向指数的方法还是需要估计倾向指数的模型是准确的。既然倾向指数就是用于计算权重的，我们可不可以直接去估计权重呢？
 
第三类方法就是 Directly Confounder Balancing，直接对样本权重进行学习。这类方法的动机就是去控制在干预变量下其他特征变量的分布。而一个变量的所有阶的矩（moment）可以唯一确定它的分布，所以只需要去控制它所有阶的矩（比如一阶矩就是均值，二阶矩就是方差）就可了。在实验中我们发现，只考虑一阶矩就可以达到很好的效果，因此这里先不考虑二阶及以上的矩。通过这个手段就可以直接学习样本权重，进行平均因果效应估计了。
 
![](http://p2.itc.cn/q_70/images03/20201023/90f132e406c444ed92a047c1fd171284.jpeg)
 
这个概念首先出现于 Entrophy Balancing 方法之中，通过学习样本权重，使特征变量的分布在一阶矩上一致，同时还约束了权重的熵（Entropy）。但这个方法的问题也是将所有变量都同等对待了，把过多变量考虑为混杂变量。
 
![](http://p0.itc.cn/q_70/images03/20201023/fe2f9012ce0148f6af689919f650ed96.jpeg)
 
第二种方法叫 Approximate Residual Balancing。第一步也是通过计算样本权重使得一阶矩一致，第二步与 Doubly Robust 的思想一致，加入了回归模型，并在第三步结合了前两步的结果估计平均因果效应。只要样本权重的估计和反事实预测模型中有一个是对的，计算出的平均因果效应就是无偏的。但这里也是将所有变量都同等对待了。
 
![](http://p7.itc.cn/q_70/images03/20201023/daec4a16db754c18bd8603f0e7c0e890.jpeg)
 
![](http://p9.itc.cn/q_70/images03/20201023/c845c7c6a91a43a085a0a1c02fe0ee4f.jpeg)
 
我们提出的方法叫做混淆变量区分性平衡（Differentiated Confounder Balancing, DCB），考虑到的就是不同的特征变量对于平均因果效应的影响是不同的。我们在传统方法上加入了混淆变量权重（Confounder Weights）β：当β为0时，代表所对应的变量不是混淆变量，对因果效应不会带来影响；当β较大时，说明此变量对因果效应的影响较大。其中的β正好是从干预变量的增广到结果变量的回归系数。通过一系列实验发现，我们的方法在高维数据下对平均因果效应的估计偏差几乎为0，优于其他方法。
 
![](http://p2.itc.cn/q_70/images03/20201023/7eed17426c9648248047a6756bd743c0.jpeg)
 
### 2.4 Generative Adversial De-confounding
 
上述的所有方法中，干预变量都是二值的，那如何去处理多值的或者连续的干预变量呢？我们今年的一个工作 Generative Adversial De-confounding 就尝试估计这类复杂情况下干预变量与结果变量之间的因果效应。这里的核心思想就是如何保证干预变量与其他特征变量的分布相独立。我们利用了 GAN 的思想，去凭空构造出另一个干预变量与其他特征变量相独立的分布。
 
![](http://p2.itc.cn/q_70/images03/20201023/295cfe1f99ff47348fb5e610c61f1881.jpeg)
 
我们使用了随机打乱（Random Shuffle）的方法，只打乱干预变量，这样就可以使干预变量与其他特征变量相独，并保留了两者的分布。我们再使用样本权重估计的方法，使原来数据集的加权分布结果与构造出的分布相一致。在实验中，可以发现我们的方法成功降低了干预变量与其他特征变量的相关性，并有效提高了因果效应评估的准确性。
 
![](http://p1.itc.cn/q_70/images03/20201023/368e1e83dd6e4f75ada8add246a19404.jpeg)


# 因果科学实践

## 因果工具包

- 【2021-1-5】[awesome-causality-algorithms](https://github.com/rguo12/awesome-causality-algorithms)
- [DoWhy工具](https://github.com/microsoft/dowhy) An end-to-end library for causal inference
  - 微软的DoWhy是一个基于python的因果推理和分析库，它试图简化在机器学习应用程序中采用因果推理的过程。受到朱迪亚·珀尔的因果推理演算的启发，DoWhy在一个简单的编程模型下结合了几种因果推理方法，消除了传统方法的许多复杂性。
  - DoWhy将工作流中的任何因果推理问题建模为四个基本步骤:建模、识别、估计和反驳。
    - **模型**:DoWhy使用因果关系图对每个问题建模。DoWhy的当前版本支持两种图形输入格式:gml(首选)和dot。图中可能包含了变量之间因果关系的先验知识，但DoWhy不做任何直接的假设。
    - **标识**:使用输入图，DoWhy根据图形模型找到所有可能的方法来标识期望的因果关系。它使用基于图的标准和do-calculus来寻找潜在的方法，找到能够识别因果关系的表达式
    - **估计**:DoWhy使用匹配或工具变量等统计方法估计因果效应。DoWhy的当前版本支持基于倾向性分层或倾向性评分匹配的估计方法，这些方法侧重于估计处理任务，以及侧重于估计响应面的回归技术。
    - **验证**:最后，DoWhy使用不同的robustness methods（鲁棒性方法）验证因果效应的有效性。
  - [Jupyter notebook示例](https://github.com/microsoft/dowhy/blob/master/docs/source/example_notebooks/dowhy_simple_example.ipynb)
  - ![](https://raw.githubusercontent.com/microsoft/dowhy/master/docs/images/dowhy-schematic.png)

- [微软因果推理框架DoWhy入门](http://www.atyun.com/41349.html)
- 代码示例

```python
import numpy as np
import dowhy

# 加载数据，DoWhy依赖于panda dataframes来捕获输入数据
rvar = 1 if np.random.uniform() >0.5 else 0
data_dict = dowhy.datasets.xy_dataset(10000, effect=rvar, sd_error=0.2)
df = data_dict['df']
print(df[["Treatment", "Outcome", "w0"]].head())

# 因果推理
model= CausalModel(
  data=df,
  treatment=data_dict["treatment_name"],
  outcome=data_dict["outcome_name"],
  common_causes=data_dict["common_causes_names"],
  instruments=data_dict["instrument_names"])

model.view_model(layout="dot")

from IPython.display import Image, display
display(Image(filename="causal_model.png"))

# 确定图标中的因果关系
identified_estimand = model.identify_effect()

# 估计因果关系
estimate = model.estimate_effect(identified_estimand,
method_name="backdoor.linear_regression")
# Plot Slope of line between treamtent and outcome =causal effect
dowhy.plotter.plot_causal_effect(estimate, df[data_dict["treatment_name"]], df[data_dict["outcome_name"]])

# 反驳因果估计
res_random=model.refute_estimate(identified_estimand, estimate, method_name="random_common_cause")

```

- 结果
  - ![](http://imgcdn.atyun.com/2019/06/4-6.png)
  - ![](http://imgcdn.atyun.com/2019/06/5-5.png)



- [justcause](https://github.com/inovex/justcause)

其它工具包
1. [causalml]: causal inference with machine learning algorithms in Python
2. [DoWhy]: causal inference using graphs for identification
3. [EconML]: Heterogeneous Effect Estimation in Python
4. [awesome-list]: A very extensive list of causal methods and respective code
5. [IBM-Causal-Inference-Benchmarking-Framework]: Causal Inference Benchmarking Framework by IBM
6. [CausalNex]: Bayesian Networks to combine machine learning and domain expertise for causal reasoning.

# 资料

- [贝叶斯网络之父Judea Pearl：新因果科学与数据科学、人工智能的思考](https://www.toutiao.com/i6840890758732448270/)
- 更多[Demo地址](http://wqw547243068.github.io/demo)

# 结束


