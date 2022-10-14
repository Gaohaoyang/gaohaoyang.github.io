---
layout: post
title:  "概率统计与信息论 - Probability and Information Theory"
date:   2019-10-23 16:53:00
categories: 数学基础
tags: 概率 统计 信息论 熵 相对熵 交叉熵 互信息 幂律分布 正态分布 长尾分布
excerpt: 通俗易懂讲解信息论
mathjax: true
---

* content
{:toc}


# 概率统计

- 【2020-9-2】

## 统计学的核心是什么

【2021-11-5】[统计学的核心到底是什么？](https://mp.weixin.qq.com/s/C-WO50yHUjqSyKUemtO7vw)，作者朱宏图，有幸重新拜读Breiman教授的访谈录，跟几年前相比，我在字里行间中体会了许多新东西。这个可能是因为我最近6年的不同于学术生活的经历了，用四个字来形容“人生如梦！”。我从UNC一个高校，到MD Anderson一个顶级癌症医院，到滴滴出行一个创业公司，再回UNC，转了一个大圈子。由此认识了各种背景的人，特别是学界和工业界（含医院和科技公司），我在跟这些同仁的交往之中感受了他们对这个世界的看法和探索的方式是如此的不同。我个人从一个做数理统计开始，到做生物统计，到神经病研究，到近年做双边市场，再到神经科学，这个过程当中接触了不同层面的问题，使得我在认知水平上的经历了一个巨大的变化。

Breiman教授 的几句话：

> - 统计就是"一门收集、分类、处理并且分析事实和数据的科学。 Fisher相信统计的存在是为了预测、解释和处理数据的。
就统计应用的角度而言，我知道工业机构和政府在发生些什么，但是目前进行的学术研究却似乎离我们无比遥远，好像只是抽象数学的某一分支一样。
> - 统计精髓之处是在收集和利用数据，来解决现实世界中有趣而又重要的问题

Breiman是美国国家科学院院士 （应用数学学部），不仅在概率论、统计、机器学习，做出了许多有巨大影响力的工作，特别他的CART和bagging这些东西已经是科技公司每天都在用的工具；而且在咨询各个行业躬身力行，笃行不怠。可以说他是既懂数学，又懂统计，也懂应用的全才。

我的看法跟Breiman教授的观点几乎一样：“统计学一开始就从**实践**中来，通过数据来认识这个世界，最终去解决大的实践问题。” 一言而概之：  
统计学的核心是**应用**和**数据**，就是通过分析数据来深刻地探索这个世界。
- 统计学跟数学不一样
  - 虽然统计学要用到数学的许多工具来把整个体系完备化，但是统计学中根本性的0-1大突破一定是从为了解决重大应用问题而产生的。比如，随机梯度算法就是Robbins和Monro (1951，统计年刊)为了做一个实验设计的问题提出来并解决的, 而它现在是深度学习和强化学习最重要的优化工具。那些高深的数学工具大概率不能给统计学的带来革命性的变革。
- 统计不是从工具到应用
  - 许多统计学家主要是在做各种统计工具，讨论许多理论性质特别强调数学的美；有的会去找各种数据来试，看看能不能用的起来，只关心能不能发顶刊，根本不关心实际应用中的价值。这也是为什么Breiman说 “统计中吸引人的东西与目前的学术研究已经相去甚远，分道扬镳了”。其实最近20年，统计学在某种程度上是偏离了这个应用的本质。另外一方面，越来越多的智能型数据产品的出现，比如说最近Deepmind在Nature连续发了两篇文章，这些产品对蛋白质结构的预测，用到了好几个最新的分析方法，比如embedding，预训练，知识蒸馏，变换器，和图模型的表示。这些工具就是Breiman教授说 “我与机器学习和神经网络区域的人走得很近，因为他们正在为一些复杂的、困难的预测问题做一些非常重要的应用工作。他们以数据为方向，所做的也与Webster对统计的定义相一致，然而，他们几乎全都不是受过训练的统计学家！”。这些工具已经不能算是传统的统计方法，你可以说在最底层，它们跟统计非常有关系，但是其中有核心的创新是非统计的，是革命性的。这些突破带来不仅仅是学界的认可，它同时会影响政府机构（含各个funding机构）和金融投资机构。比如，美国NSF最近就成立了数十个AI相关的研究中心，但这些和统计社区关系不大，最终可能会进入一个恶性循环的生态环境。
- 数据问题的重要性
  - 因为物联网的发展直接引导了新型产业的发展，像社交平台、搜索引擎和交易平台等等。由此在时空维度上, 对数据收集、存储和分析都发生了根本的革命。相关公司业务的发展极大地推动计算机软硬件的进步，数据的规模无论从复杂度和多样性都对未来时空数据分析方式提出了许多新的要求。有了数据，原来许多不可能的事情变得可能啦。最近人工智能的落地已经上升到国家层面，是新一代工业革命的核心技术，随着这些落地的进行，我们会看到更多、更大、更复杂的数据。
- 统计一定是从应用中来，到应用中去
  - 第一个例子是关于**ImageNet数据集**。最近10年AI的发展，其根源就是数据上的突破，无论从数据的质量、问题的复杂度、还是标注方法的创新, ImageNet都是本世纪数据科学,特别是计算机视觉最重要的一个突破。它给了我们一个公正地评估和训练各种分类和预测方法的平台。一个好的数据是有影响力的统计研究的重要基础。
  - 第二个例子是关于**深度学习**。现在大家公认深度学习是数据分析方法最近十几年的最大成果，影响深远。它无论对计算机视觉、自然语言处理、非参数模型、反问题、图像处理、偏微分方程数值解等领域都是根本性的革命，可以说现在许多领域里面都替代了传统方法，包含许多应用数学方法， 虽然深度学习的理论研究严重落后于它的应用和算法创新。
  - 第三个例子是关于**AlphaGo**。AlphaGo的成功反映了一个数据产品要成功，从顶层设计，到数据建设，到硬件，到高超的算法水平，都是缺一不可的。因为深度学习的发展，特别跟软硬件和其它方法的融合，极大地推动了智能数据产品的落地，比如说，AlphaZero和AlphaGo的开发，把现代数据科学可解决问题的深度和广度都推到了历史新高度，并在各个领域里面发挥了越来越重大的影响，特别在学术界和政府，现在已经上升到国家层面的核心生产力，成为新一代工业革命的核心技术。国家层面对AI的投入可以说是一个巨大的蛋糕。这也反映了我们未来要重视智能数据产品的开发和落地，不能只做整个问题中很小的一步，特别要培养统计专业学生的工程能力是非常关键的。
  - 第四个例子是**强化学习**。AlphaGo和物联网的成功也带动了强化学习的复兴，强化学习已经从一个小众的分支，变成机器学习的头号分支。今年ICRL和neurIPS的顶会里面最多的文章都跟强化学习相关，现在强化学习已经从游戏，到机器人，到精准医疗，到各个市场的落地。我们在滴滴的团队一直用强化学习来优化平台的策略，都取得了很多成果。由于时空平台会越来越大而多，强化学习一定会成为主流数据分析工具。
  - 第五个例子是**因果推断**。比如今年诺贝尔经济学奖就给了两个做因果推断的人，他们推广了Donald Rubin的因果模型，我认为Don能够做出这样漂亮的统计框架大部分归于他多年咨询工作中积攒的数据和应用相关分析的工作经验、收集数据能力的极大提升和最近因果模型的相关应用和研究的深入。并且随着收集数据能力特别是时空数据的极大提升，因果模型的相关应用和研究会越来越多和越来越深入，由此相关落地会产生出更大的影响力。
- 未来一段时间应用的核心
  - 最近机器学习大佬Michael Jordan强调了机器学习与市场的融合。这一代人工智能的发展主要是落地在衣，食，住，行，教育，医疗，人力，和养老等相关的市场，系统地将消费者和商品紧密连接，把人、数据和现实中的问题和需求进行整合，成为一个可以创建经济新业态的平台。统计学必须从收集和提炼信息的阶段来思考如何搭建有效的数据平台，在推动业务发展的过程中逐渐从分析方法上抽象出一套完整的统计学基础理论，来推动人工智能在产业的落地，并产生巨大的社会价值。
因此，我呼吁统计同仁们重视数据和应用，多思考应用的大问题，通过收集和清洗数据，来解决实际问题，进而发展出几个牛掰的统计工具，再证明几个深刻的数学公式，这样统计学就有着辉煌的未来。

## 概率与统计

概率论和统计学的区别
- 简单来说，概率论和统计学解决的问题是互逆的。假设有一个具有不确定性**过程**（process），然后这个过程可以随机的产生不同的**结果**（outcomes）。则概率论和统计学的区别可以描述为：
  - `概率论`（probability theory）中，已知该过程的概率模型，该模型的不确定性由相应的概率分布来描述；概率论要回答的问题是该过程产生某个结果的可能性有多大这类问题。
  - `统计学`（statistics）中，该过程的概率模型是未知的，但是有一系列该过程产生的结果的观测值；希望通过这些观测值来推断出这个过程中的不确定性是什么样的。
- 总结来说就是：（类似归纳与演绎）
  - 通过已知的概率模型来精确的计算各种结果的可能性就是`概率论`；——`演绎`
  - 根据观测的结果来推断模型的不确定性就是`统计学`。——`归纳`

<div class="mermaid">
    flowchart LR
    %%颜色定义
    classDef red fill:#f02;
    classDef green fill:#5CF77B;
    classDef blue fill:#6BE0F7;
    classDef orange fill:#F7CF6B;
    classDef grass fill:#C8D64B;
    %%节点关系定义
    A(过程):::blue
    A -->|概率论,演绎| B(结果)
    A -.-|描述不确定性| C(概率模型):::orange
    B -->|统计学,归纳| A
    B -.-> result

    subgraph result [观测结果]
        direction LR
        B1(结果1)
        B2(结果2)
        B3(结果3)
    end
</div>

## 频率学派与贝叶斯学派

- [马同学高等数学](https://www.matongxue.com/lessons/686/)

|维度|频率派|古典派|主观派|
|---|---|----|---|
|理论基础|过往事实的归纳总结|不充分理由原则|知识和直觉|
|概率定义|频率稳定性|等概率|信念强度|

- 注：`不充分理由原则`
>雅各布·伯努利（1654－1705）提出，如果因为无知而没办法判断哪一个结果更容易出现，那么应该给予它们相同的概率

- 以不充分理由原则为基础，经由皮埃尔-西蒙·拉普拉斯侯爵（1749－1827）之手，确立了 古典概率 的定义，即：
>未知的概率都为等概率

- 整个19世纪的人们都广泛接受这个定义，并发展出了一系列的定义和定理。
- `贝特朗悖论`：法国数学家贝特朗（也翻译为“伯特兰”）于1888年在他的著作《Calcul des probabilités》中提到了这个悖论，锯木厂的木头，人们开始反思古典概率中的不合理之处：**“等概率”的描述实在是太模糊了，存在歧义**。
  - 边长的分布是未知的，所以是等概率的
  - 面积的分布是未知的，所以是等概率的
- 现代概率论通过分布来描述边长的随机性后，这种模糊性消失了，贝特朗悖论解决

**古典统计学和贝叶斯统计学**

- 统计学领域中有两大学派：`古典统计学`（classical）和`贝叶斯统计学`（Bayesian，以英国数学家托马斯•贝叶斯命名）。古典统计学又称为`频率论`（frequentist）。
- 关于这俩大学派孰优孰劣已有一个世纪的争论。它们的本质区别在于对待未知模型或者参数的方法是不同的：
  - ![](http://p1-tt.byteimg.com/large/a06f00023320ec9a1b61)
  - 古典统计学认为，未知的模型或者参数是**确定**的，只不过我们不知道它确切的形式或者取值。
    - 古典统计学通过进行大量重复实验并统计某个特定结果出现的频率作为对未知参数的估计。
    - 大数定律
  - 贝叶斯统计学认为，未知的模型或者参数变量是**不确定**的，但是这种不确定性可以由一个概率分布来描述。
    - 贝叶斯统计学“使用概率的方法来解决统计学问题”——贝叶斯公式+主观概率
      - `先验分布`（prior distribution）：根据主观判断或者过去的经验，猜测概率分布
      - `后验分布`（posterior distribution）：根据越来越多的观测值（new data 或者 new evidence）来修正猜测得到的概率分布
    - 贝叶斯统计学中的“概率”的概念可以被解释为对未知变量不同取值的信心程度的测度（measure of confidence）
    - 贝叶斯统计学派被古典统计学派诟病的核心问题是对于未知变量的先验分布是非常主观的。
    - 适合场景：选举、疾病诊断
      - 无法大量重复试验
      - 合理的先验分布对未知量的估计是非常有益的
    - 关于贝叶斯统计的一个笑话，代表着很多吃瓜群众对贝叶斯统计的看法，以及贝叶斯统计学派的自嘲：
>- A Bayesian is one who, vaguely expecting a horse, and catching a glimpse of a donkey, strongly believes he has seen a mule.
>- 一个贝叶斯学派的学者是这样的：模糊的期待着一匹马（**先验**），却看到了一头驴（**证据**），于是便自信的认为那是一头骡子（**后验**）。

- [频率学派与贝叶斯学派之争](http://www.cnblogs.com/549294286/archive/2013/04/08/3009073.html)：[知乎网友解释](https://www.zhihu.com/question/20587681/answer/21294468),频率学派最先出现，疯狂打压新生的贝叶斯学派，贝叶斯很凄惨，就跟艺术圈的梵高一样，死后的论文才被自己的学生发表，经过拉普拉斯之手发扬光大，目前二派就像华山派的剑宗和气宗。频率学派挺煞笔的，非得做大量实验才能给出结论，比如你今年高考考上北大的概率是多少啊？频率学派就让你考100次，然后用考上的次数除以100。而贝叶斯学派会找几个高考特级教师对你进行一下考前测验和评估，然后让这几个教师给出一个主观的可能性，比如说：你有9成的把握考上北大。这个区别说大也大，说小也小。
  - （1）往大了说，**世界观**就不同，频率派认为参数是客观存在，不会改变，虽然未知，但却是固定值；贝叶斯派则认为参数是随机值，因为没有观察到，那么和是一个随机数也没有什么区别，因此参数也可以有分布，个人认为这个和量子力学某些观点不谋而合。
  - （2） 往小处说，频率派最常关心的是**似然函数**，而贝叶斯派最常关心的是**后验分布**。我们会发现，后验分布其实就是似然函数乘以先验分布再normalize一下使其积分到1。因此两者的很多方法都是相通的。贝叶斯派因为所有的参数都是随机变量，都有分布，因此可以使用一些基于采样的方法（如MCMC）使得我们更容易构建复杂模型。频率派的优点则是没有假设一个先验分布，因此更加客观，也更加无偏，在一些保守的领域（比如制药业、法律）比贝叶斯方法更受到信任。
   - 频率 vs 贝叶斯 =   P(X;w)  vs  P(X\|w) 或 P(X,w)
   - 频率学派认为参数固定，通过无数字实验可以估计出参数值——客观；
   - 贝叶斯学派认为参数和数据都是随机的，参数也服从一定的分布，需要借助经验——主观

## 参数估计

- 【2020-8-1】[三种参数估计方法](https://learning.snssdk.com/feoffline/toutiao_wallet_bundles/toutiao_learning_wap/online/article.html?item_id=6772498016138953223&app_name=news_article)

两大流派：
- `频率学派`：参数未知但固定。`极大似然估计` MLE（`点估计`）
- `贝叶斯学派`：参数未知且变化。`最大后验估计` MAP（`点估计`）、`贝叶斯估计`（`分布估计`）
- 注：频率是贝叶斯的一个特例，隐含了先验知识

方法
- `极大似然估计`：用样本数据进行点估计
- `最大后验估计`：用样本数据+先验知识进行点估计
- `贝叶斯估计`：用样本数据+先验知识进行分布估计

![](https://p3.pstatp.com/large/pgc-image/8b8e3f3de8a84894a52ccbe1877bfb7e)
![](https://p3.pstatp.com/large/pgc-image/8d065abba83141e3aca9f7f4e60c4b85)


## 概率统计量

可能性描述
- `impossible`（不可能，p=0） → `unlikely`（不太可能，p=1/6） → `even chance`（等概率） → `likely`（很有可能，p=4/5） → `certain`（确定，p=1）
- ![](https://ask.qcloudimg.com/http-save/yehe-7145566/5dift89zap.jpeg?imageView2/2/w/1620)

【2020-5-29】用4个数来概括一个分布
- **均值** mean: 第一矩。表位置
- **方差** variance: 第二矩。表胖瘦
- **偏度** skewness: 第三矩。表歪斜
- **峰度** kurtosis: 第四矩。表尾巴胖瘦

概率中常见的统计度量，首先是均值和方差，其定义与前面在统计学中看到的定义没有区别。
- 1．`偏度`（Skewness）
  - 它表示了一个概率分布的横向偏差，即偏离中心的程度或对称性（非对称性）。一般来说，如果偏度为负，则表示向右偏离；如果为正，则表示向左偏离。下图描绘了偏度的统计分布。
    - ![](https://p6-tt.byteimg.com/origin/pgc-image/c4cf3f83211d4dc9a7cd588ee69a5082?from=pc)
  - 分布形状对偏度的影响
    - ![](https://p6-tt.byteimg.com/origin/pgc-image/21b0d5c29dd24b91a4575ddcea334682?from=pc)
- 2．`峰度`（Kurtosis）
  - 峰度显示了分布的中心聚集程度。它定义了中心区域的锐度，也可以反过来理解，就是函数尾部的分布方式。
  - 峰度的表达式如下。
    - ![](https://p1-tt.byteimg.com/origin/pgc-image/23ab302b08f448b4a65a60eb071b8af7?from=pc)
  - 直观地理解这些新的度量。分布形状对峰度的影响
    - ![](https://p1-tt.byteimg.com/origin/pgc-image/7dd08103a08a479893dabaaeac867626?from=pc)
- 摘自：[机器学习需要哪些数学基础？](https://www.toutiao.com/i6843281715314557444/)


- 力学上的`矩`，质量（mass）：
  - 0 阶矩：是总**质量**；
  - 1 阶矩除以总质量是**质心**（质量中心）；
  - 2 阶矩是**惯性矩**（moment of inertia）

- 统计学上的`矩`
  - 0 阶矩：`总概率`，也就是 1；
  - 1 阶矩：`均值`，
  - 2 阶中心矩：`方差`；如果是多元，对应协方差
  - 3 阶中心矩：`偏度`（skewness）
  - 4 阶中心矩（归一化和平移）：`峰态`（kurtosis）

### 图解概率统计量

【2022-10-10】概率统计量演进

<div class="mermaid">
    flowchart LR
    %%根节点
    A(矩):::light
    %%颜色定义
    classDef red fill:#f02;
    classDef green fill:#5CF77B;
    classDef blue fill:#6BE0F7;
    classDef orange fill:#F7CF6B;
    classDef start fill:#C8D64B;
    %%节点关系定义
    A -->|0阶| B(总概率):::blue
    A -->|1阶| C(均值/mean):::green
    C -.-|位置| O[[描述特性]]
    A -->|2阶| D(方差/variance):::green
    %%C -.->|依赖| D
    D -.-|波动| O
    D -->|多元变量| E(协方差):::green
    E -.-|波动| O
    A -->|3阶| F(偏度/skewness):::orange
    F -.-|歪斜| O
    A -->|4阶| G(峰度/kurtosis):::orange
    G -.-|尾巴胖瘦| O

    %%注释
    %%subgraph 图例
        direction TB
        %%x(当前sota):::red
        %%y(次sota):::orange
        %%z(重要模型):::green
        %%z -.->y -.->x
    %%end
</div>


## 概率分布

六大分布：**伯努利**分布、**二项**分布、**多项式**分布、**Beta**分布、Dirichlet分布、**高斯**分布

### 概率分布概览


#### 概率分布总结

一维随机变量的概率分布：

|概率分布|数据类型|特点|举例|
|---|---|---|---|
| 伯努利分布|  离散| 抛硬币，二选一 |扔1次硬币|
| 二项分布 |   离散| n重伯努利，出现k次“是”|扔n次硬币🪙|
| 多项分布 |   离散| n重伯努利，出现k次“是”|扔n次骰子🎲|
| 泊松分布 |   离散| 二项分布的极限 |每天供应多少馒头<br>某地出现交通事故次数|
| 几何分布 |   离散| n重伯努利，第k次首次出现“是”|n次实验才成功的概率|
| 负二项分布 | 离散| 几何分布的和 |巴拿赫火柴盒|
| 超几何分布 | 离散| 不放回抽样的二项分布|n件产品中m件不合格的概率|
|-|-|-|-|
| 均匀分布 | 连续 | 古典派中的几何概型 |等公交车时间|
| 正态分布 | 连续 | 二项分布的另外一种极限 |身高分布<br>考试分数|
| 指数分布 | 连续 | 泊松分布的间隔，连续的几何分布 |灯泡寿命<br>第一位客人上门，店主等待时间|

#### 图解概率分布演进

【2022-10-10】概率统计量演进

<div class="mermaid">
    graph TD
    %%颜色定义
    classDef red fill:#f02;
    classDef green fill:#5CF77B;
    classDef blue fill:#6BE0F7;
    classDef orange fill:#F7CF6B;
    classDef grass fill:#C8D64B;
    %%节点关系定义
    A(均匀分布/uniform):::start
    B(伯努利分布/Bernoulli-扔1次硬币):::blue
    A-->|离散化,二元|B
    B -->|n次实验出现k次| BI(二项分布/binomial):::green
    BI -->|推广:硬币变骰子|F(多项分布/multinomial):::green
    BI -->|n次实验第k次才成功|G(几何分布/geometric):::green
    P -->|泊松过程间隔分布|E(指数分布/exponential):::green
    E -->|n次实验第k次时成功r次| NB(负二项分布/negative binomial)
    G -->|成功r次| NB
    E -->|扩展:k=1是指数分布| W(韦布儿分布/weibull):::grass
    B -->|扔n次成功r次,不放回| H(超几何分布/hypergeometric)
    BI -->|n趋近无穷大,np小,才成功| P(泊松分布/possion):::green
    BI -->|n趋近无穷大,np大,成功次数,连续| N(正态分布/高斯分布/normal):::grass
    N -->|取值服从对数分布| L(对数正态分布/log normal)
    N -->|小样本预估整体| S(学生分布/student's t)
    N -->|多个X^2之和| K(卡方分布/chi-squared)
    K -->|扩展,卡方分布是特例| M(伽马分布/gamma)
    BI -->|共轭,p未知但有主观经验| T(贝塔分布/Beta):::grass
    F -->|共轭分布| D(狄利克莱分布/Dirichlet):::grass    

    %%注释
    subgraph 图例
        direction TB
        x(连续):::grass
        y(其它都是离散)
        z(重要):::green
    end
</div>

【2022-10-10】[Relationship between probability distributions](https://math.stackexchange.com/questions/3050352/relationship-between-probability-distributions)
- ![](https://i.stack.imgur.com/sau6I.png)
- ![](https://miro.medium.com/max/1400/1*JJ0QqPK0MhFni17MPYsL7A.png)
- ![](https://i.stack.imgur.com/Mx16O.jpg)

### 均匀分布

问题背景: 古典派中的几何概型
- 设车每10分钟来一班，且随机到来，问等车时间。

概率密度函数: X = U(a,b)
- $X=U(a,b)$
- $ p(x)=\left\{\begin{array}{ll} \frac{1}{b-a} & a \leq x \leq b \\ 0 & \text { else } \end{array}\right. $
- 期望和方差：$\frac{a+b}{2} , \frac{(b-a)^2}{12} $

### 伯努利分布

问题背景: 概率不同的是非题。
- 抛一枚硬币，是正面还是反面?
- 进来的顾客买还是不买东西?
- 人的眼睛是不是绿色?

概率质量函数
- $p(x)=p^{x}(1-p)^{1-x} , x=1,0$
- 期望:p
- 方差:p(1−p)

```python
import numpy as np #数组包
from scipy import stats #统计计算包的统计模块
import matplotlib.pyplot as plt #绘图包

# 生成pmf
# --------分布参数---------
p = 0.5 # 得到"是"的概率
# ------------------------

X = np.arange(0,2,1) # [0,1]
p_list = stats.bernoulli.pmf(X,p) # [0.5,0.5] 

# 制图
plt.plot(X, p_list, linestyle='None', marker='o')
plt.vlines(X,0,p_list)
plt.xlabel("Random variable X ,X(Pos)=1,X(Neg)=0")
plt.ylabel('Probability')
plt.title("Bernuulli: p={}".format(p))
```

### 二项分布（n重伯努利出现k次）

问题背景: n重伯努利实验，出现k次是。
- 抛一枚硬币n次，出现k次正面。
- 随机抽n个人，有k个人眼睛是绿色。

概率质量函数
- $X \sim b(n, p) , p(k)=P(X=k)=\left(\begin{array}{l} n \\ k \end{array}\right) p^{k}(1-p)^{n-k}, \quad k=0,1, \cdots, n$
- 期望: np
- 方差: np(1-p)

```python
import numpy as np #数组包
from scipy import stats #统计计算包的统计模块
import matplotlib.pyplot as plt #绘图包

# --------分布参数---------
p = 0.5 # 得到"是"的概率
n = 50 # 实验次数
# ------------------------

X = np.arange(0, n+1, 1)
p_list = stats.binom.pmf(X,n,p)

plt.plot(X, p_list, linestyle='None', marker='o')
plt.vlines(X, 0, p_list)
plt.xlabel('Random Variable: X, X(Experimental Result) = the num of Pos')
plt.ylabel('Probability')
plt.title('binom n:{};p:{}'.format(n,p))
```

### 泊松分布（二项分布的极限）

问题背景: 二项分布 n → + ∞ 的极限。
- 每天应该供应多少馒头。
- 每天一个路口出现事故的次数。
- 一定时间内，某放射性物质放射出的α粒子数目。

总之，满足泊松分布的事件有着三个特性。
- 平稳性: 在一段时间T内，事件发生的概率相同。
- 独立性: 事件的发生彼此独立，没有关联或关联很弱。
- 普通性: 将T划分为无限个小的 $\Delta T$ , 在每个ΔT内，事件发生多次的概率几乎为0.

概率质量函数: X∼P(λ)
- $X \sim P(\lambda)$
- $ p(X=k)=\frac{\lambda^{k}}{k!} e^{-\lambda}$
- 期望: λ 
- 方差: λ

```python
import numpy as np #数组包
from scipy import stats #统计计算包的统计模块
import matplotlib.pyplot as plt #绘图包

# --------分布参数---------
lam = 5 # 每天卖的馒头均值
# -----------------------------
X = np.arange(0, 21, 1)
p_list = stats.poisson.pmf(X,lam)

plt.plot(X, p_list, linestyle='None', marker='o')
plt.vlines(X, 0, p_list)
plt.xticks(np.arange(0, 21, 1))
plt.xlabel('Random Variable: X, X(Experimental Result) = the num of things happen in time interval T')
plt.ylabel('Probability')
plt.title('poisson, lambda:{}'.format(lam))
```

### 几何分布（n重伯努利第k次首次出现）

问题背景: n重伯努利实验，第k次首次出现是。
- 每次表白成功概率p, 表白k次才成功概率。

概率质量函数
- $p(k)=P(X=k)=(1-p)^{k-1} p, k=1,2, \cdots$
- 期望、方差：$E(X)=\frac{1}{p}, \operatorname{Var}(X)=\frac{1-p}{p^{2}}$

```python
import numpy as np #数组包
from scipy import stats #统计计算包的统计模块
import matplotlib.pyplot as plt #绘图包
# --------分布参数-------------
p = 0.5  # 每次得到"是"的概率
# -----------------------------
X = np.arange(0, 21, 1)
p_list = stats.geom.pmf(X,p)

plt.plot(X, p_list, linestyle='None', marker='o')
plt.vlines(X, 0, p_list)
plt.xticks(np.arange(0, 21, 1))
plt.xlabel('Random Variable: X, X(Experimental Result) = First happen in k')
plt.ylabel('Probability')
plt.title('geom, p:{}'.format(p))
```

### 超几何分布（二项分布+不放回）

问题背景: 不放回抽样的二次分布.
- 有N件产品，其中有M件不合格品，随机抽取n件产品，则其中含有m件不合格产品的概率为多少

概率质量函数:X∼h(n,N,M)
- $X \sim h(n, N, M)$
- $P(X=m)=\frac{\left(\begin{array}{l} M \\ m \end{array}\right)\left(\begin{array}{l} N-M \\ n-m \end{array}\right)}{\left(\begin{array}{l} N \\n \end{array}\right)}, m=0,1, \cdots, r $
- 期望和方差：$E(X)=n \frac{M}{N}, \operatorname{Var}(X)=n \frac{M}{N}\left(1-\frac{M}{N}\right)\left(1-\frac{n-1}{N-1}\right)$

```python
import numpy as np #数组包
from scipy import stats #统计计算包的统计模块
import matplotlib.pyplot as plt #绘图包
# --------分布参数-------------
n = 10 # 抽n次
N = 50 # 总共N个产品
M = 20 # 有M个次品
# -----------------------------
X = np.arange(0, n+1, 1)
p_list = stats.hypergeom.pmf(X,N,M,n)
plt.plot(X, p_list, linestyle='None', marker='o')
plt.vlines(X, 0, p_list)
plt.xticks(np.arange(0, n+1, 1))
plt.xlabel('Random Variable: X, X(Experimental Result) = # of inferior product')
plt.ylabel('Probability')
plt.title('hypergeom, n:{};N:{};M:{}'.format(n,N,M))
```

### 负二项分布（n重伯努利成功k次）

问题背景: 几何分布的和
- [巴拿赫火柴盒问题](https://wenku.baidu.com/view/5f8ef10c76c66137ee061985.html)

概率质量函数:
- $X \sim N b(r, p) \\ p(k)=P(X=k)=\left(\begin{array}{l} k-1 \\ r-1 \end{array}\right) p^{r}(1-p)^{k-r}, k=r, r+1, \cdots$
- 期望、方差：$E(X)=\frac{r}{p}, \operatorname{Var}(X)=\frac{r(1-p)}{p^{2}}$

### 指数分布（泊松过程时间间隔）

指数分布是描述泊松过程中的事件之间的时间的概率分布，即事件以恒定平均速率连续且独立地发生的过程

问题背景: 泊松分布的间隔，连续的几何分布
- 灯泡的寿命
- 等待小卖部第一位客人上门的等待时间。

概率密度函数：X∼Exp(λ)
- $X \sim Exp(\lambda)$
- $p(x)=\left\{\begin{array}{ll}\lambda e^{-\lambda x} & \lambda \geq 0 \\ 0 & \text { else } \end{array}\right.$
- 期望和方差：$E(X)=\frac{1}{\lambda},Var(X)=\frac{1}{\lambda^2} $

```python
import numpy as np #数组包
from scipy import stats #统计计算包的统计模块
import matplotlib.pyplot as plt #绘图包
# --------分布参数-------------
lam = 5 # 每天来5个人
offset = 0 # 偏移量，从offset开始
# -----------------------------
X = np.arange(0, 20, 0.01)
p_list = stats.expon.pdf(X,0,1/lam)  # 内置函数是使用1/lam作为参数，即间隔(每天来的人之间的间隔时间)。
plt.plot(X, p_list, linestyle='None', marker='.')
plt.xlabel('Random Variable: X, X(Experimental Result) = the interval between two happen things')
plt.ylabel('Probability')
plt.title('norm, lam:{}'.format(lam))
```

### 贝塔分布

贝塔分布(Beta distribution)需要先明确一下先验概率、后验概率、似然函数以及共轭分布的概念。
- 先验概率就是事情尚未发生前，我们对该事发生概率的估计。利用过去历史资料计算得到的先验概率，称为客观先验概率； 当历史资料无从取得或资料不完全时，凭人们的主观经验来判断而得到的先验概率，称为主观先验概率。例如抛一枚硬币头向上的概率为0.5，这就是主观先验概率。
- 后验概率是指通过调查或其它方式获取新的附加信息，利用贝叶斯公式对先验概率进行修正，而后得到的概率。
- 先验概率和后验概率的区别：
  - 先验概率不是根据有关自然状态的全部资料测定的，而只是利用现有的材料(主要是历史资料)计算的；
  - 后验概率使用了有关自然状态更加全面的资料，既有先验概率资料，也有补充资料。
  - 另外一种表述：先验概率是在缺乏某个事实的情况下描述一个变量；而后验概率（Probability of outcomes of an experiment after it has been performed and a certain event has occured.）是在考虑了一个事实之后的条件概率。
- 似然函数
- 共轭分布(conjugacy)：后验概率分布函数与先验概率分布函数具有相同形式;共轭先验就是先验分布是beta分布，而后验分布同样是beta分布

在试验数据比较少的情况下，直接用**最大似然法**估计二项分布的参数可能会出现**过拟合**的现象
- 比如，扔硬币三次都是正面，那么最大似然法预测以后的所有抛硬币结果都是正面

为了避免这种情况的发生，可以考虑引入**先验概率分布**来控制参数，防止出现过拟合现象。
- 贝塔分布作为先验概率

Beta分布描述的是定义在区间\[0,1\]上随机变量的概率分布，由两个参数和决定

#### Beta分布通俗讲解

beta分布可以看作一个概率的概率分布，当不知道事件的具体概率是多少时，它可以给出了所有概率出现的可能性大小。
- 熟悉棒球运动的都知道有一个指标就是**棒球击球率**(batting average)，就是用一个运动员击中的球数除以击球的总数，一般认为0.266是正常水平的击球率，而如果击球率高达0.3就被认为是非常优秀的。
- 现在有一个棒球运动员，希望能够预测他在这一赛季中的棒球击球率是多少。可能就会直接计算棒球击球率，用击中的数除以击球数，但是如果这个棒球运动员只打了一次，而且还命中了，那么他就击球率就是100%了，这显然是不合理的，因为根据棒球的历史信息，我们知道这个击球率应该是0.215到0.36之间才对啊。
- 对于这个问题，可以用一个二项分布表示（一系列成功或失败），一个最好的方法来表示这些经验（在统计中称为先验信息）就是用beta分布，这表示在我们没有看到这个运动员打球之前，我们就有了一个大概的范围。beta分布的定义域是(0,1)这就跟概率的范围是一样的。
- 将这些先验信息转换为beta分布的参数，一个击球率应该是平均0.27左右，而他的范围是0.21到0.35，那么根据这个信息，可以取α=81,β=219
- ![](https://pic1.zhimg.com/80/v2-52a90cd77902248029c7e9c21bc2dce2_1440w.webp?source=1940ef5c)

之所以取这两个参数是因为：
- beta分布的均值是α/α+β=81/(81+219)=0.27
- $\frac{\alpha}{\alpha+\beta}=\frac{81}{81+219}=0.27$
- 从图中可以看到这个分布主要落在了(0.2,0.35)间，这是从经验中得出的合理的范围

有了先验信息后，现在考虑一个运动员只打一次球，那么他现在的数据就是”1中;1击”。这时候就可以更新分布了，让这个曲线做一些移动去适应新信息。
- beta分布在数学上就提供了这一性质，他与二项分布是**共轭先验**的（Conjugate_prior）。
- Beta(α0+hits,β0+misses) 
- $\mbox{Beta}(\alpha_0+\mbox{hits}, \beta_0+\mbox{misses}) $ 其中α0和β0是一开始的参数，在这里是81和219。
- 所以在这一例子里，α增加了1(击中了一次)。β没有增加(没有漏球)。分布其实没多大变化，这是因为只打了1次球并不能说明什么问题。但是如果得到了更多的数据，假设一共打了300次，其中击中了100次，200次没击中，那么这一新分布就是： beta(81+100,219+200)
- $\mbox{beta}(81+100, 219+200)$ 
- <img src="https://picx.zhimg.com/50/v2-6d7b59081beaed718fc86f7f9cef63b0_720w.jpg?source=1940ef5c" data-caption="" data-size="normal" data-rawwidth="504" data-rawheight="504" class="origin_image zh-lightbox-thumb" width="504" data-original="https://pic1.zhimg.com/v2-6d7b59081beaed718fc86f7f9cef63b0_r.jpg?source=1940ef5c"/>
- 这个曲线变得更加尖，并且平移到了一个右边的位置，表示比平均水平要高

对于一个不知道概率是什么，而又有一些合理猜测时，beta分布能很好的作为一个表示概率的概率分布。

作者：[链接](https://www.zhihu.com/question/30269898/answer/123261564)

### 狄利克雷分布（多项分布共轭）

狄利克雷分布(Dirichlet distribution)是多项分布的共轭分布，也就是它与多项分布具有相同形式的分布函数。
- Dirichlet分布是关于定义在区间\[0,1\]上的多个随机变量的联合概率分布

Beta分布与Dirichlet分布的定义域均为\[0,1\]，在实际使用中，通常将两者作为概率的分布
- Beta分布描述的是单变量分布
- Dirichlet分布描述的是多变量分布

因此
- Beta分布可作为**二项**分布的先验概率
- Dirichlet分布可作为**多项**分布的先验概率

### 伽马分布（Gamma分布）

Gamma 函数是对阶乘在实数领域的扩展
- 据PRML第71页(2.14)式，Gamma函数在Beta分布和Dirichlet分布中起到了**归一化**的作用

伽马分布与卡方分布关系
- 一方面，自由度为n的卡方分布=自由度为n/2与1/2的伽马分布，即gamma(n/2,1/2)
- 另一方面，卡方分布只有一个参量，伽马分布有两个，从而`卡方分布`是`伽马分布`的一个**特例**

### 正态分布（二项分布另一种极限）

问题背景: 二项分布的另一种极限
- 人群中的身高分布。
- 考试中的分数分布。

总之，如果一个时间受很多因素影响。比如考试分数：受到智商、考试状态、任课老师水平等等因素影响，这些因素本身各有分布，由`中心极限定理`，这些分布加起来的分布就是`正态分布`。

概率密度函数: X∼N(u,σ^2)
- $X \sim N(u, \sigma^2)$
- $p(x)=\frac{1}{\sigma \sqrt{2 \pi}} e^{-\frac{(x-u)^{2}}{2 \sigma^{2}}}$
- 期望和方差：$E(X)=u, \operatorname{Var}(X)=\sigma^{2}$

```python
import numpy as np #数组包
from scipy import stats #统计计算包的统计模块
import matplotlib.pyplot as plt #绘图包
# --------分布参数-------------
mu = 160  # 均值
sigma = 5  # 方差
# -----------------------------
X = np.arange(150, 170, 0.1)
p_list = stats.norm.pdf(X,mu, sigma)
plt.plot(X, p_list, linestyle='None', marker='.')
plt.xlabel('Random Variable: X, X(Experimental Result) = The height of human')
plt.ylabel('Probability')
plt.title('norm, mu:{}; sigma:{}'.format(mu, sigma))
```

- 【2021-5-2】[高中就开始学的正态分布，原来如此重要](https://www.toutiao.com/i6711190906105496077/)

机器学习的世界是以概率分布为中心的，而概率分布的核心是正态分布。正态分布也被称为高斯分布, 以天才卡尔·弗里德里希·高斯（Carl Friedrich Gauss）的名字命名的。简单的预测模型一般都是最常用的模型，因为易于解释，也易于理解。现在补充一点：正态分布因为简单而流行。

正态分布是一条倒钟形曲线，样本的平均值、众数以及中位数是相等
- ![](https://p3-tt.byteimg.com/origin/pgc-image/5a44734ccb0949ebbffc76311c76935a?from=pc)

概率密度函数
- ![](https://p6-tt.byteimg.com/origin/pgc-image/28d2088a7e86416e8cd9253c23d31f3c?from=pc)

示例，非常接近正态分布：人群的身高、成年人的血压、扩散后的粒子的位置、测量误差、人群的鞋码、员工回家所需时间。周围的大部分变量都呈置信度为 x% 的正态分布（x<100）

两个参数分别是：样本的平均值和标准差。
- 平均值——样本中所有点的平均值。
- 标准差——表示数据集与样本均值的偏离程度。
分布的这一特性让统计人员省事不少，因此预测任何呈正态分布的变量准确率通常都很高。

为什么这么多变量近似正态分布？
- 大量随机变量上多次重复一个实验时，它们的分布总和将非常接近正态性（normality）—— **中心极限定理**
- 把大量分布不同的随机变量加在一起，新变量最终也服从正态分布

分布转换
- 如果样本满足某个未知的分布，那么通过一系列操作，总是能变成正态分布。
- 相反，标准正态分布的叠加与转换，也一定能变化为任意未知分布。从标准正态转换到未知分布，就是很多机器学习模型希望做到的，不论是视觉中的 VAE 或 GAN，还是其它领域的模型。

但对于传统统计学，更希望将特征的分布转换成正态分布，因为正态分布简单又好算呀

转换为标准正态
- 线性变换
  - ![](https://p6-tt.byteimg.com/origin/pgc-image/b5dddc3d5cb54e6e86b718a741e3cd83?from=pc)
  - x 可能服从某个未知分布，但是归一化后的 Z 是服从正态分布
- Box-cox 变换: 用 Python 的 SciPy 包将数据转换成正态分布
  - scipy.stats.boxcox(x, lmbda=None, alpha=None)
- YEO-JOHBSON 变换
  - Python 的 sci-kit learn 提供了合适的函数：
  - sklearn.preprocessing.PowerTransformer(method=’yeo-johnson’, standardize=True, copy=True)

注意：没有做任何分析的情况下不能轻易假设变量服从正态分布，以泊松分布（Poisson distribution）、t 分布（student-t 分布）或二项分布（Binomial distribution）的样本为例，如果错误地假设变量服从正态分布可能会得到错误的结果。

【2021-6-14】[正态分布：核心的概率分布](https://www.toutiao.com/i6969855712692306464/)

常见的概率分布有泊松分布，二项分布，伯努利分布，正态分布，均匀分布。其中正态分布是最为核心的概率分布。

#### 一、认识正态分布
 
正态分布，也称“常态分布”，又名高斯分布，正态曲线呈钟型，两头低，中间高，左右对称因其曲线呈钟形，因此人们又经常称之为钟形曲线。
- ![116思维模型：正态分布一核心的概率分布](https://p1-tt.byteimg.com/origin/pgc-image/def80ab7c30f47b4b83aebbd00d91b8c?from=pc)
 
正态分布函数公式如下：
- ![116思维模型：正态分布一核心的概率分布](https://p1-tt.byteimg.com/origin/pgc-image/4c3160b092104c00bf7d817222b6db8c?from=pc)
 
其中μ为均数，σ为标准差。μ决定了正态分布的位置，与μ越近，被取到的概率就越大，反之越小。σ描述的是正态分布的离散程度。σ越大，数据分布越分散曲线越扁平；σ越小，数据分布越集中曲线越陡峭。在一个标准正态分布中，约有 68.2% 的点落在 ±1 个标准差的范围内。约有 95.5% 的点落在 ±2 个标准差的范围内。约有 99.7% 的点落在 ±3 个标准差的范围内。
- ![116思维模型：正态分布一核心的概率分布](https://p3-tt.byteimg.com/origin/pgc-image/b19d27c75d304bc3b9c41c631f7c0cd8?from=pc)
 
正态分布概念是由法国数学家棣莫弗于1733年首次提出的，后由德国数学家高斯率先将其应用于天文学研究，故正态分布又叫高斯分布，高斯这项工作对后世的影响极大，所以有了“高斯分布”的美称。
 
在我们的自然界，大多数物种的高度和重量都满足正态分布，它们围绕着均值对称分布，而且不会包含特别大或特别小的事件.
 
例如：我们从来没有遇到过1米长的蚂蚁，也没有看到过1千克重的大象。世界似乎被代表正态分布的“钟形”包围着，很多事物都是服从正态分布的：人的高度、胖瘦、寿命、雪花的尺寸、测量误差、灯泡的寿命、IQ分数、面包的分量、学生的考试分数，员工上班所需时间等等。
 
正态分布有以下几个特征：
- 集中性：曲线的最高峰位于正中央，且位置为均数所在的位置。
- 对称性：正态分布曲线以均数所在的位置为中心左右对称且曲线两端无线趋近于横轴。
- 均匀变动性：正态分布曲线以均数所在的位置为中心均匀向左右两侧下降。
- 面积恒等：曲线与横轴间的面积总等于1。
 
正态分布有两个非常重要的参数，它们分别是：样本的均值和标准差。均值是样本中所有点的平均值。均值定义了正态分布的峰值位置，大多数值都集中在均值周围。标准差是表示数据集与样本均值的偏离程度。标准差定义了正态分布的宽度，决定了观察值与均值的偏离程度。标准差越小，正态分布曲线越窄。标准差越大，正态分布曲线越宽。当分布较窄时，值落在均值附近的概率会更高。
 
正态分布的解释力非常强，因为分布的均值、众数和中位数是相等的；我们只要用平均值和标准差就可以解释整个分布。
 
就数学理论而言，正态分布有其优越性：
- ①两个正态分布的乘积仍然是正态分布；
- ②两个正态分布的和是正态分布；
- ③正态分布的傅里叶变换仍然是正态分布。
 
#### 二、正态分布产生的原因
 
钟形分布曲线无处不在，这是为什么呢？其奥秘来自于中心极限定理。
 
中心极限定理：只要各随机变量是相互独立的，每个随机变量的方差都是有限的，且没有任何一小部分随机变量贡献了大部分变差，那N≥20个随机变量的和就近似一个正态分布。
 
中心极限定理告诉我们：
- 任何一个样本的平均值将会约等于其所在总体的平均值。
 
不管总体是什么分布，任意一个总体的样本平均值都会围绕在总体的平均值周围，并且呈正态分布。
- 案例1：在一个500人的小城镇中，人们的购买行为数据显示，每个人平均每个星期花费100美元。在这些人中，可能有些人这个星期只花50美元、下个星期则花150美元，另一部分人可能每3个星期花费300美元。而其他人则可能每个星期的花费在20至180美元之间。只要每个人的支出都只有有限的变差并且没有任何一小部分人贡献了大部分变差，那么分布的总和必定是一个正态分布，其均值为50000美元。每个星期的总支出也将是对称的：可能高于55000美元，也可能低于45000美元。
- 案例2：中心极限定理来解释人类身高的正态分布。一个人的身高取决于基因、环境以及两者之间的相互作用。基因的贡献率可能高达80%，因此不妨假设身高只取决于基因。研究表明，至少180个基因有助于人体长高。
 
例如，一个基因可能有助于长出较长的颈部或头部，另一个基因可能有助于长出更长的胫骨。虽然基因之间存在相互作用，但我们可以假设在“长高”这件事情上，每个基因都是相互独立的。如果身高等于180个基因贡献的总和，那么身高将呈现正态分布。
 
高尔顿钉板试验更加形象地证明了正态分布。弗朗西斯•高尔顿是英国著名的统计学家、心理学家和遗传学家。他设计了一个钉板实验，希望从统计的观点来解释遗传现象。
 
如下图所示，木板上钉了数排（n排）等距排列的钉子，下一排的每个钉子恰好在上一排两个相邻钉子之间；从入口处放入若干直径略小于钉子间距的小球，小球在下落的过程中碰到任何钉子后，都将以1/2的概率滚向左边，以1/2的概率滚向右边，碰到下一排钉子时又是这样。如此继续下去，直到滚到地板的格子里为止。试验表明，只要小球足够多，它们在底板堆成的形状将近似于正态分布。因此，高尔顿钉板实验直观地验证了中心极限定理。
- ![116思维模型：正态分布一核心的概率分布](https://p1-tt.byteimg.com/origin/pgc-image/fe8f96f412b64a06a7a959fb84a453d9?from=pc)
 
中心定理并不是万能的，他拥有三个很重要的前提：随机、独立和相加。
- 首先，第一个前提就是取样需要随机。如果我们抽取人的时候，只抽取长的高的或者只抽取长得矮的人，那么结果自然不符合正态分布。
- 第二，影响结果的因素是相互独立或者是相互影响比较小的。以身高为例，影响一个人长高的因素有很多，例如：父母长得高还是矮、营养是否跟得上、是否热爱运动......等等。父母长得高还是矮，对营养的补充没有很大的关系，跟是否热爱运动也没有关系，所以可以看成是相互独立的因素，所以身高的人群分布曲线自然就符合正态分布。
- 第三是相加，如果一个事物受到多种因素的影响，不管每个因素本身是什么分布，它们加总后，结果的平均值就是正态分布。正态分布只适合各种因素累加的情况，如果这些因素不是彼此独立的，会互相加强影响，那么就不是正态分布了。如果各种因素对结果的影响不是相加，而是相乘，那么最终结果就变成了对数正态分布。
 
在一定条件下，各种随意形状概率分布生成的随机变量，它们加在一起的总效应，是符合正态分布的。中心极限定理告诉我们：无论引起过程的各种效应的基本分布是什么样的，当实验次数n充分大时，所有这些随机分量之和近似是一个正态分布的随机变量。
- ![116思维模型：正态分布一核心的概率分布](https://p3-tt.byteimg.com/origin/pgc-image/db13b17b8e8e4aa58bebfa66e2b0ae51?from=pc)
 
中心极限定理从理论上证明了，在一定的条件下，对于大量独立随机变量来说，只要每个随机变量在总和中所占比重很小，那么不论其中各个随机变量的分布函数是什么形状，也不论它们是已知还是未知，当独立随机变量的个数充分大时，它们的和的分布函数都可以用正态分布来近似。这就是为什么实际中遇到的随机变量，很多都服从正态分布的原因，这使得正态分布既成为统计理论的重要基础，又是实际应用的强大工具。中心极限定理和正态分布在概率论、数理统计、误差分析中占有极其重要的地位。
 
#### 三、正态分布的应用场景
 
1、**检验显著性**

我们可以利用正态分布的规律来检验各种平均值的显著性差异。显著性检验就是事先对总体（随机变量）的参数或总体分布形式做出一个假设，然后利用样本信息来判断这个假设（备择假设）是否合理，即判断总体的真实情况与原假设是否有显著性差异。其原理就是“小概率事件实际不可能性原理”来接受或否定假设。如果经验均值与假设均值之间的偏差了超过两个标准差，那么社会科学家就会拒绝这两种均值相同的假设。
 
例如：现在提出这样一个假设，即旧金山的通勤时间与洛杉矶的通勤时间相同。假设数据表明，旧金山的通勤时间平均为33分钟，而洛杉矶为34分钟。如果这两个数据集的均值标准差都是1分钟，那么我们就不能拒绝旧金山和洛杉矶两地通勤时间相同的假设。虽然二者的均值不同，但只存在1个标准差。如果洛杉矶的平均通勤时间为37分钟，那么我们就会拒绝这个假设，因为均值之间相差4个标准偏差。

2、**六西格玛方法**
 
六西格玛方法是摩托罗拉公司于20世纪80年代中期提出的，目的是减少误差，该方法根据正态分布对产品属性进行建模。试想这个例子：一家企业专业生产制造门把手所用的螺栓。它生产的螺栓必须天衣无缝地与其他制造商生产的旋钮组装在一起。规格要求是螺栓直径为14毫米，但是任何直径介于13毫米与15毫米之间的螺栓也可以接受。如果螺栓的直径呈正态分布，均值为14毫米，标准差为0.5毫米，那么任何超过两个标准差的螺栓都是不合格的。
 
两个标准差事件发生的概率为5%，这个概率对于一家制造企业来说太高了。六个西格玛要求每一百万个机会中有3.4个出错的机会，即合格率是99.99966％。企业可以根据中心极限定理，从整体中抽样几百个，并根据这样一个样本来估计均值和标准差。然后推断出正态分布。这样一来，这家螺栓制造企业就可以得出一个基准标准差，然后花大力气去降低它。

3、**对数正态分布**
 
中心极限定理要求我们对随机变量求和或求平均值，以获得正态分布。如果随机变量是不可相加而是以某种方式相互作用的，或者如果它们不是相互独立的，那么产生的分布就不一定是正态分布。例如，独立随机变量之间的乘积就不是正态分布，而是对数正态分布。对数正态分布缺乏对称性，因为大于1的数字乘积的增长速度比它们的和的增长速度快，比如，4+4+4+4=16，但4×4×4×4=256；而小于1的数字的乘积则比它们的和小，比如，1/4+1/4+1/4+1/4=1，但1/4\*1/4\*1/4*1/4=1/256。如果将20个不均匀地分布在0到10之间的随机变量相乘，那么多次相乘后所得到的乘积将会包括一些很接近于零的结果与一些相当大的结果，从而生成如下图所示的对数正态分布。
- ![116思维模型：正态分布一核心的概率分布](https://p3-tt.byteimg.com/origin/pgc-image/40187bdb6e8240e185c069facf4896c6?from=pc)
 
对数正态分布
 
一个对数正态分布的尾部长度取决于随机变量相乘的方差。如果它们的方差很小，尾巴就会很短，如果方差很大，尾巴就可能会很长。如前所述，将一组很大的数相乘会产生一个非常大的数字。在各种各样的情况下都会出现对数正态分布，包括新冠肺炎的传染人数、大多数国家的收入分布也近似于对数正态分布。
 
一个简单的模型可以解释为什么收入分布更接近于对数正态分布而不是正态分布。这个模型将与工资增长有关的政策与这些政策所隐含的分布联系起来。大多数企业和机构都按某种百分比来分配加薪，表现高于平均水平的人能够得到更高百分比的加薪，表现低于平均水平的人则只能得到更低百分比的加薪。与这种加薪方法相反，企业和机构也可以按绝对金额来分配加薪。例如普通员工可以获得1000美元的加薪，表现更好的人可以获得更多，而表现更差的人则只能获得更少。
 
百分比加薪方法与绝对金额加薪方法两者之间的区别乍一看似乎只是语义上的区别，但其实不然。如果每一年的绩效都是相互独立且随机的，那么根据员工绩效按百分比加薪，就会产生一个对数正态分布。即使后来的表现相同，未来几年的收入差距也会加剧。
 
假设一名员工因过去几年表现良好，收入水平达到了80000美元，而另一名员工则只达到了60000美元。在这种情况下，当这两名员工的表现同样出色并都可以获得5%的加薪时，前者能够获得4000美元的加薪，后者却只能得到3000美元的加薪。这就是说，尽管绩效完全相同，不平等也会导致更大的不平等。如果企业按绝对数额分配加薪，那么两名绩效相同的员工将获得相同的加薪，由此产生的收入分布将接近正态分布。
 
#### 总结
 
正态分布启示我们，要用整体的观点来看事物。用整体来看事物才能看清楚事物的本来面貌，才能得出事物的根本特性。不能只见树木不见森林，也不能以偏概全。同时正态分布曲线及面积分布图告诉我们一定要抓住重点，因为重点就是事物的主要矛盾，它对事物的发展起主要的、支配性的作用。正态分布是科学的世界观，也是科学的方法论，是我们认识和改造世界的最重要和最根本的工具之一，对我们的理论和实践有重要的指导意义。
 
正态分布如此重要，不仅因为它在自然界普遍存在，还因为它是被证明的、其他复杂概率分布的演化结果，可以说是所有概率分布的最终宿命。根据“熵增”原理，一个孤立系统的熵总是在不断增大。而对一个已知均值和方差的分布，正态分布的熵值最大，即这个孤立系统中的所有结果持续演化，最终一定是呈正态分布的稳定状态。对于宇宙熵增的最终稳定态，是宇宙各部分能量达到平衡，失去活力，陷入热寂。

### 对数正态分布

`对数正态分布`：Log-normal distribution
- 在自然界有很多事物有增长速度很慢，甚至可以忽略不计（small percentage changes），但是其效果是对整个事物的影响，即<span style='color:blue'>每次增长都是对前面增长的乘积运算</span>，但如果把他放入对数域，则可以放大他们的增长效果。
- ![](https://img2018.cnblogs.com/blog/1146801/201810/1146801-20181026172250616-1459668653.png)
- ![](https://img2018.cnblogs.com/blog/1146801/201810/1146801-20181026163442534-524138315.png)

### 学生氏分布

司徒顿t分布（Student's t-distribution），简称 t分布，在概率论及统计学中用于根据**小样本**来估计总体呈**正态分布**且**标准差未知**的期望值。
- 若总体标准差已知，或是样本数足够大时（依据中心极限定理渐进正态分布），则应使用正态分布来进行估计。其为对两个样本期望值差异进行显著性测试的学生t检验之基础。

学生t 检验改进了Z检验（Z-test），因为在小样本中，Z检验以总体标准差已知为前提，Z检验用在小样本会产生很大的误差，因此必须改用学生t 检验以求准确。但若在样本数足够大（普遍认为超过30个即足够）时，可依据中心极限定理近似正态分布，以Z检验来求得近似值，

在总体标准差数未知的情况下，不论样本数量大或小皆可应用t检验。在待比较的数据有三组以上时，因为误差无法被压低，此时可以用方差分析（ANOVA）代替t检验

### 韦布尔分布

即韦伯分布（Weibull distribution），又称`韦氏分布`或`威布尔分布`，是可靠性分析和寿命检验的理论基础。
- 威布尔分布在可靠性工程中被广泛应用，尤其适用于机电类产品的磨损累计失效的分布形式。由于它可以利用概率值很容易地推断出它的分布参数，被广泛应用于各种寿命试验的数据处理。

Weibull Distribution是连续性的概率分布
- $f(x ; \lambda, k)=\left\{\begin{array}{ll} \frac{k}{\lambda}\left(\frac{x}{\lambda}\right)^{k-1} e^{-(x / \lambda)^{k}} & x \geq 0 \\ 0 & x<0 \end{array}\right.$
- x是随机变量，λ>0是比例参数（scale parameter），k>0是形状参数（shape parameter）
- 韦布尔分布的**累积**分布函数是扩展的指数分布函数
- Weibull distribution与很多分布都有关系。
  - k=1，它是指数分布；
  - k=2，是Rayleigh distribution（瑞利分布）。

### 幂律分布

【2021-6-13】[幂律分布一强者恒强、弱者愈弱](https://www.toutiao.com/i6972513351217889825/)

为什么在经济系统中会出现强者恒强，弱者愈弱的现象？社会中会出现了富者越富，穷者越穷的现象呢？按照马克思的理论解释，可能是因为资本主义的缺陷造成的。其实背后隐藏着一个巨大的数学定律“幂次法则”。
- Peter Thiel《从0到1》一书中写到：“幂次法则是宇宙的力量，是宇宙最强大的力量。它完整定义了我们周围的环境，而我们几乎毫无察觉。”
- 《新约.马太福音》一书中提到：“凡是少的，就连他所有的，也要夺过来。凡是多的，还要给他，叫他多多益善。” 这就是著名的马太效应。
- 概率论给我们的启示是：“凡是相信大数定律的，凡是相信热力学第一定律的，就不要去赌博，不要去炒股，不要去买彩票，不要去进行任何投机，而应该去开赌场。”

### 什么是幂律分布？

在统计学中，幂律power law表示的是两个量之间的函数关系，其中一个量的相对变化会导致另一个量的相应幂次比例的变化，且与初值无关：表现为一个量是另一个量的幂次方。例如，正方形面积与边长的关系，如果长度扩大到两倍，那么面积扩大到四倍。
- `幂函数`：y=x^a（a为有理数）
- `指数函数`：y=a^x（a为常数且以a>0，a≠1）
- `幂律分布`：是一种概率分布，假设变量x服从参数为α的幂律分布，则其概率密度函数可以表示为：概率密度函数为f(x)=cx^-a-1(x→∞）

![](https://p1-tt.byteimg.com/origin/pgc-image/7a99c4ef409b4518885d1d6c6f9347a0?from=pc)

### 有哪些幂律分布

常见的幂律分布有`齐普夫定律`、`二八法则`、`长尾效应`、`马太效应`等

#### 齐普夫定律

1932年哈佛大学的语言学专家齐夫（Zipf）在研究英文单词出现的频率时，发现如果把单词出现的频率按由大到小的顺序排列，则每个单词出现的频率与它的名次的常数次幂存在简单的反比关系，这种分布就称为齐夫定律，即对于指数为2的幂律分布（a=2），事件的等级排列序号乘以它的大小等于常数，也就是事件等级×事件大小=常数。

各种语言中，只有极少数的词被经常使用，而绝大多数词很少被使用。2016年，江南大学的研究者以诺贝尔文学奖得主莫言的《红高粱》《蛙》和《透明的红萝卜》为主要研究对象，采用字频统计软件和汉语词频统计软件，统计莫言作品中字频、词频，发现都能满足齐普夫定律。所得结果与包括英语、西班牙语、法语等在内的多种语言研究结果一致。

#### 二八法则

19世纪意大利经济学家帕雷托（VilfredoPareto）研究了个人收入的统计分布，发现少数人的收入要远多于大多数人的收入，提出了著名的80/20法则，即20%的人口占据了80%的社会财富。

#### 长尾理论

克里斯·安德森（Chris Aderson）的“长尾理论”即是幂律的口语化表达。安德森系统研究了亚马逊、狂想曲公司、Blog、Google、eBay、Netflix等互联网零售商的销售数据，并与沃尔玛等传统零售商的销售数据进行了对比，观察到一种符合统计规律（大数定律）的现象。这种现象恰如以数量、品种二维坐标上的一条需求曲线，拖着长长的尾巴，向代表“品种”的横轴尽头延伸，长尾由此得名。
![](https://p1-tt.byteimg.com/origin/pgc-image/649dbb9fc371401298f31049774333e1?from=pc)


#### 马太效应

马太效应是社会学家和经济学家们常用的术语，它反映着富者更富、穷者更穷，一种两极分化的社会现象。1968年，美国科学史研究者罗伯特·莫顿（Robert K. Merton）提出这个术语用以概括一种社会心理现象：“相对于那些不知名的研究者，声名显赫的科学家通常得到更多的声望；也就是任何个体、群体或地区，在某一个方面（如金钱、名誉、地位等）获得成功和进步，就会产生一种积累优势，就会有更多的机会取得更大的成功和进步。”此术语后为经济学界所借用，反映赢家通吃的经济学中收入分配不公的现象。

统计物理学家习惯把服从幂律分布的现象称为无标度现象，即系统中个体的尺度相差悬殊，缺乏一个优选的规模。凡有生命、有进化、有竞争的地方都会出现不同程度的无标度现象。



## 说人话的统计学合辑

- 优质文章：[说人话的统计学合辑](http://www.360doc.com/content/17/1104/08/41417155_700749710.shtml)
 
###  第1章  高屋建瓴看统计
*   [你真的懂p值吗？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=207134405&idx=1&sn=8a4e661a0cd0fad97d869845f2e4b1a2&scene=21#wechat_redirect)
*   [做统计，多少数据才算够？（上）](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=207643438&idx=1&sn=20fbf90250185008f841fffe28bf4e9b&scene=21#wechat_redirect)
*   [做统计，多少数据才算够？（下）](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=207981601&idx=1&sn=ec4235c0df795e858ed99020381473c0&scene=21#wechat_redirect)
*   [提升统计功效，让评审心服口服！](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=208048284&idx=1&sn=ea3e00da596826b6c0b267bca46e4306&scene=21#wechat_redirect)
*   [你的科研成果都是真的吗？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=208129350&idx=1&sn=734fa50cf19fec17afb7103c11fd6439&scene=21#wechat_redirect)
*   [见识数据分析的「独孤九剑」](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=208295028&idx=1&sn=d22dea627fff86bf0daded79959bd019&scene=21#wechat_redirect)
*   [贝叶斯vs频率派：武功到底哪家强？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=208453473&idx=1&sn=8d16e540580c3aced266a6c9041f996c&scene=21#wechat_redirect)
### 第2章  算术平均数与正态分布
*   [数据到手了，第一件事先干啥？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=400430409&idx=1&sn=03b30d4122d177650543f50649195ebd&scene=21#wechat_redirect)
*   [算术平均数：简单背后有乾坤](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=400735492&idx=1&sn=dc2b5dae73740cd2841dabf2c420f842&scene=21#wechat_redirect)
*   [正态分布到底是怎么来的？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=401781634&idx=1&sn=4cbabdb7191b8d49df95f0988943e18b&scene=21#wechat_redirect)
 
### 第3章  t检验：两组平均数的比较
*   [想玩转t检验？你得从这一篇看起](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=402713181&idx=1&sn=eafb0bd061c6d22fba9582ba230a942c&scene=21#wechat_redirect)
*   [就是要实用！t 检验的七十二变](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=403019527&idx=1&sn=9d279713517f96a204d4541e3ff68023&scene=21#wechat_redirect)
*   [不是正态分布，t 检验还能用吗？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=403375449&idx=1&sn=2fb2c79f8b272686d3908c38ad03b6b1&scene=21#wechat_redirect)
*   [只有15个标本，也能指望 t 检验吗？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=403973660&idx=1&sn=e6c513cfde7b47f1c195d401d142f0f2&scene=21#wechat_redirect)
*   [样本分布不正态？数据变换来救场！](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652548058&idx=1&sn=35f73ef5a627b20c1fd29e3eb3ed8b33&scene=21#wechat_redirect)
*   [数据变换的万能钥匙：Box-Cox变换](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652548109&idx=1&sn=0fdd23615447ee8ec27900dbb33a0026&scene=21#wechat_redirect)
*   [t 检验用不了？别慌，还有神奇的非参数检验](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652548283&idx=1&sn=bc958997ddb65c2e11d1b78d2f1b06aa&scene=21#wechat_redirect)
*   [只讲 p 值，不讲效应大小，都是耍流氓！](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652548670&idx=1&sn=93eb1ce6a6b97c21247108db2a868361&scene=21#wechat_redirect)
*   [找出 t 检验的效应大小，对耍流氓 say no！](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652548856&idx=1&sn=f4d2d21a3bce3f6e34a7d7a99315c004&scene=21#wechat_redirect)
*   [用置信区间，就是这么（不）自信！](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652549146&idx=1&sn=94f80df33a0ff425c9884971645a33be&scene=21#wechat_redirect)
*   [如何确定 t 检验的置信区间](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652549198&idx=2&sn=b27598a5f93c9d4957c1287be799b374&scene=21#wechat_redirect)
*   [优雅秀出你的 t 检验，提升Paper逼格！](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652549367&idx=1&sn=6a32c3a96bbf885ebd81c7dd4c52783e&scene=21#wechat_redirect)
*   [要做 t 检验，这两口毒奶可喝不得！](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652549476&idx=1&sn=d571ebf331f5ad08413f9e9a57c73b3c&scene=21#wechat_redirect)
 
###  第4章  方差分析(ANOVA)：多组平均数的比较
*   [要比较三组数据，t 检验还能用吗？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652549639&idx=1&sn=877daad6e64e689dfb72b8ab7b95bb18&scene=21#wechat_redirect)
*   [ANOVA在手，多组比较不犯愁](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652549791&idx=1&sn=e7079f101ccc4ca5a2f9899d163d2e60&scene=21#wechat_redirect)
*   [ANOVA的基本招式你掌握了吗？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652549926&idx=1&sn=7dc7d10bd57a8833ebe67a2e33f7f0dd&chksm=80bba2fbb7cc2bedc1d37f5b35e2b581479c327bf0edb1a5b39392027c7ee977c8644c8eca7d&scene=21#wechat_redirect)
*   [ANOVA做出了显著性？事儿还没完呢！](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652550143&idx=1&sn=c3ee5aafdf9404bba3abeb3386ef9f83&chksm=80bba222b7cc2b3436e6e9b5509055d1387ad21eb89c24b26d571452fdfb56cfbeb0e93c011e&scene=21#wechat_redirect)
*   [听说，成对t检验还有ANOVA进阶版？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652550306&idx=1&sn=394f7597b8e80f5a20877923094b7663&chksm=80bba57fb7cc2c6979d94982d4e4b10a24c66434ba6ece4deb5a22fe4047720d21f6c0a8cdbc&scene=21#wechat_redirect)
*   [重复测量ANOVA：你要知道的事儿都在这里啦](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652550550&idx=1&sn=f86f766ec2b5b883232317fabfb8055b&chksm=80bba44bb7cc2d5dc6b6e222f24c4d63f65cb4570771b30b9c4aee8cae6a9abb5ecd39e39008&scene=21#wechat_redirect)
*   [没听说过多因素 ANOVA ？那你就可就 OUT 了！](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652550743&idx=1&sn=189408e5db94d3242b599596dd4130cc&chksm=80bba78ab7cc2e9cae8f64f2a69e617efb807899656c1c1156de645ae7a36cb5e2d643b355e4&scene=21#wechat_redirect)
*   [多因素ANOVA＝好几个单因素ANOVA？可没这么简单！](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652550964&idx=1&sn=1cda6ec54d40aa21c992e7ea61e661ff&chksm=80bba6e9b7cc2fff85ed20d3d7ca637deb2db4c7f8c663f61b6bfeac84aaae0d843395ca3473&scene=21#wechat_redirect)
*   [两个因素相互影响，ANOVA结果该如何判读？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652551172&idx=1&sn=4dd852c9460b84e19ccd127ebf34c9ec&chksm=80bba9d9b7cc20cf9726b22576744dc6685065377942977b61a6145fe0952600f8f3c71d8b68&scene=21#wechat_redirect)
*   [ANOVA还能搞三四五因素？等等，我头有点儿晕](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652551457&idx=1&sn=be0f338c2e815b770a59f5448416b072&chksm=80bba8fcb7cc21ea085e4c83164b8cd6025f46bf74ab950c861d9fcf3c3b994f04d404b5e2d3&scene=21#wechat_redirect)
*   [要做ANOVA，样本量多大才够用](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652551560&idx=1&sn=3d30bf3068bc9fe0f26692d50c038a5a&chksm=80bba855b7cc2143ec7575a46dff0dda8e773e040bc1b8f37fc2c4c47fd19e6f25acc9aa873a&scene=21#wechat_redirect)
 
###  第5章  线性回归：统计建模初步

*   [车模航模你玩过，统计学模型你会玩吗？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652551691&idx=1&sn=ae8993277c68a1f660c0fbeb81f1b7ef&chksm=80bbabd6b7cc22c0b63ef0ef1e541a59003d10241cba7687ea26eb2b8640371782e514ed927e&scene=21#wechat_redirect)
*   [如果只能学习一种统计方法，我选择线性回归](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652551811&idx=1&sn=d441953a14d4a09be4c62f982924f3bb&chksm=80bbab5eb7cc224832626ff58860f72a3fd93e7407d5c04285d2c9574306183667a779f22a1c&scene=21#wechat_redirect)
*   [回归线三千，我只取这一条](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652552010&idx=1&sn=cdaf7103bb6bdb81d3e65ce5a5d65610&chksm=80bbaa97b7cc2381a7d17dd2b878df07809507377f60093dde7f90533391840d6083c0274b6f&scene=21#wechat_redirect)
*   [三千回归线里选中了你，你靠谱吗？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652552220&idx=1&sn=717e5c741d6e9ce30c255975bb94cfd8&chksm=80bbadc1b7cc24d75a4d57539d0da20e1c23963b49622d8fa4cfc27d3b595cebc4812a7b03a2&scene=21#wechat_redirect)
*   [自变量不止一个，线性回归该怎么做？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652552402&idx=1&sn=e2096d4e2763e019d7d735efa9e010f7&chksm=80bbad0fb7cc2419afc931720e3abc48ce608a0c11e978163983f95542e54377a5f4ff1ba467&scene=21#wechat_redirect)
*   [找出「交互效应」，让线性模型更万能](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652552648&idx=1&sn=aa0dfdf3adac2e5ff4a7c7ffad0bfaee&chksm=80bbac15b7cc2503a308fd8827a83b55ec94db24a67265e7907f08a2fccf2f09e33ec88018a7&scene=21#wechat_redirect)
*   [天啦噜！没考虑到混杂因素，后果会这么严重？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652552738&idx=1&sn=da201510bafb95b2f4156b04694a0cc3&chksm=80bbafffb7cc26e95bd08befdc70f2f5e245a7de84df55bffdb23a2d6b2c49789a6531549aa4&scene=21#wechat_redirect)
*   [回归系数不显著？也许是打开方式不对！](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652552927&idx=1&sn=243075854a7d9c428a9c81ff196d005c&chksm=80bbaf02b7cc2614607329bcfa335e9eeb01b708a074a35270474fde64ed83c1002b761083e6&scene=21#wechat_redirect)
*   [评价线性模型，R平方是个好裁判吗？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652553119&idx=1&sn=d7ed15b0516269b74457afb05fe92ae1&chksm=80bbae42b7cc275469485a52d8b1a7daf94f09aa319dd138fc2732eadf72be9eb3e0a478f044&scene=21#wechat_redirect)
*   [如果R平方是砒霜，本文教你三种解药！](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652553213&idx=1&sn=e3b41220fd001f33964168cc9b0aebe4&chksm=80bbae20b7cc2736c231d9409ff2f8b33397d9df773356ef38ed1d2e07b96fb8bd63e2d9b607&scene=21#wechat_redirect)
*   [线性模型生病了，你懂得怎样诊断吗？](https://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652553278&idx=1&sn=911872deb951e3cb2df16f5a422a1517&chksm=80bbd1e3b7cc58f580c4e4aa9c66054ad7baa841f8222fc3ab99ba24d1798d300936de1c24a9&scene=21#wechat_redirect)
*   [「脱离群众」的数据点，是「春风化雨」还是「秋风扫落叶」](https://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652553348&idx=1&sn=e48000f41aad9e8b011cd142a6d90adb&chksm=80bbd159b7cc584f50c1379ce244c48a57028dfa4e8e2c99045c5c47da8efe2e0e0492c4c7fb&scene=21#wechat_redirect)

###  第6章  广义线性模型：统计建模进阶

*   [你在 或者不在 需要逻辑回归来算](https://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652553458&idx=1&sn=cd3eafdf82243346642fe57234d64d73&chksm=80bbd12fb7cc58394bea5b4ca24dead48d9def51a9f0ad20aa89458d14be944c83ceb51ab72e&scene=21#wechat_redirect)
*   [逻辑回归的袅娜曲线，你是否会过目难忘？](https://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652553605&idx=1&sn=048729536703ad7ec08032b0a7d15ff4&scene=21#wechat_redirect)
*   [逻辑回归的统计检验，原来招数辣么多？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652554118&idx=2&sn=e14d82806e74fb37f3acfdb6c6d13aee&chksm=80bbd25bb7cc5b4d692c18ba181060b7e59f2a80b71683478da797a1314add1949a48486daad&scene=21#wechat_redirect)
*   [线性回归能玩多变量，逻辑回归当然也能! ](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652554118&idx=1&sn=422b68cd453032109bea73a37496793b&chksm=80bbd25bb7cc5b4d7e6cd9c6aad28e180f721fa65c1dd1b21858e4c46c0c854d4f22d9442f2b&scene=21#wechat_redirect)
*   [喂，你的逻辑回归模型该做个体检啦](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652554302&idx=1&sn=085df8a05c5f51847ae94151e85e2d25&chksm=80bbd5e3b7cc5cf55fcfa83d3584869d3c32c633885af53f59d029e2fe636c15b225d3455f93&scene=21#wechat_redirect)！
*   [逻辑回归能摆平二分类因变量，那……不止二分类呢？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652554469&idx=1&sn=6f06c3485f31bbacf66616848bbf4295&chksm=80bbd538b7cc5c2e7f118601387af4d7606f1b92df0979e338abb339d20a0743c799d8846d9f&scene=21#wechat_redirect)
*   [让人眼花缭乱的多项逻辑回归，原来是这么用的](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652554542&idx=1&sn=c28757c48aecb04b099fcedc229cc7a9&chksm=80bbd4f3b7cc5de5cfe95901d8142925f32baccc1624dc10c884ed79fa7dd1c8992dbbbd72ae&scene=21#wechat_redirect)
*   [只问方向，无问远近，定序回归的执念你懂吗？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652554613&idx=1&sn=e7ad742318c22bb7a251880768f7e4c1&chksm=80bbd4a8b7cc5dbee17bbfe90c850b5bafa28ea89ea2beb010af590dc66c75e88d99367753af&scene=21#wechat_redirect)
*   [包教包会：定序回归实战](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652554707&idx=1&sn=d5103ca376456d79d233c5526182e6e0&chksm=80bbd40eb7cc5d186992f93842d8d94d968da5715d82047a3158b13fe595c7d5ef9998fa5550&scene=21#wechat_redirect)
*   [「数」风流人物，还靠泊松回归](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652554788&idx=1&sn=14d43bcf154646a2f2f1483b73ce104d&chksm=80bbd7f9b7cc5eefe1acea860cb7568be0d12d770b0cc1896996717aa9fc5a773e115c99076a&scene=21#wechat_redirect)
*   [广义线性模型到底是个什么鬼？](http://mp.weixin.qq.com/s?__biz=MzAxMDA4NjU3OA==&mid=2652554925&idx=1&sn=c8ee808dfcca76afb9f39178fabfbf66&chksm=80bbd770b7cc5e6697f9aed47680ec241cbaa0c9028e7327a19c939562b6e3cd55b4b1a34463&scene=21#wechat_redirect)


# 信息论

## 介绍

- ![](https://pic4.zhimg.com/50/v2-853a14194fe0d2900209694d54edc0f7_hd.jpg)

克劳德·艾尔伍德·香农（英语：Claude Elwood Shannon，1916年4月30日－2001年2月26日），美国数学家、电子工程师和密码学家，被誉为信息论的创始人。香农是密歇根大学学士，麻省理工学院博士。1948年，香农发表了划时代的论文——通信的数学原理，奠定了现代信息论的基础。

## 基本知识
摘自：[信息论基础](https://github.com/songyingxin/NLPer-Interview/blob/master/1-%E5%9F%BA%E7%A1%80%E6%95%B0%E5%AD%A6%E7%9F%A5%E8%AF%86/%E4%BF%A1%E6%81%AF%E8%AE%BA.md)
- 基本思想:
   - 一件不太可能的事情发生, 要比一件非常可能的事情发生提供更多的信息
- 性质:
  > - 非常可能发生的事情信息量较少,并且极端情况下,一定能够发生的事件应该没有信息量
  > - 比较不可能发生的事件具有更大的信息量
  > - 独立事件应具有增量的信息。例如，投掷的硬币两次正面朝上传递的信息量，应该是投掷一次硬币正面朝上的信息量的两倍。

## 熵


### 熵变与焓变

【2022-8-25】[熵、熵变、焓、焓变](https://blog.csdn.net/qq_41704436/article/details/124872844)

化学反应的进行有两种：一种是自发进行的，一种是需要外加条件帮助它，(比如说加热，电解等）给他提供能量他才能进行. 但是无论哪种反应，在他反应的历程中，都存在着两个我们肉眼看不到的线索，就是`焓变`和`熵变`。

什么是熵、熵变？
- 熵是一个用来衡量系统混乱程度的物理学概念。
  - 一个系统越混乱，熵越大；反之，一个系统越有序，熵越小。
  - 熵是指物质内部的混乱度。
- 根据熵增定律，在一个封闭的系统中，熵只会增加（或不变），但不会减少。
  - 在没人帮你打扫房间的情况下，房间只会越来越乱，不会自动变得整洁有序。
  - 如果想要系统变得有序，就必须有能量从外部输入进来。否则，系统必将变得混乱无序，直至消亡。
- 在自然界中，发生的自发过程，一般都是朝着混乱度增大的方向进行。
  - 混乱度越大，熵越大。
  - 同种物质下，固态的熵值＜液态＜气态。
  - 温度越高，熵值越大。绝对零度时，完整晶体的纯物质，熵值为零。

什么是熵变？
- 熵变是生成物蕴含的混乱度与反应物蕴含的混乱度之差。
- 化学反应的熵变，只取决于反应系统的始态和终态，与系统状态变化的途径无关。

什么是焓、焓变？
- 焓，在热力学中，表征物质系统能量的一个重要状态参量。
- 焓，指的是物质内部蕴含的能量。
- 焓变指的就是生成物的蕴含的能量与反应物蕴含的焓能量之差。
  - 物质总是趋向于放出能量，变成更加稳定的结构
- 焓变，系统所吸收或释放的热量。
  - 熵增焓减，反应自发；
  - 熵减焓增，反应逆向自发；
  - 熵增焓增，高温反应自发；
  - 熵减焓减，低温反应自发。


### 熵的起源

【2022-8-26】`熵`是对系统中混沌状态的一种度量。 因为它比准确性/均方误差之类度量标准更具**动态性**，所以使用熵来优化从决策树到深度神经网络的算法已显示出可以提高速度和性能。

`熵`源于物理学-它是系统中**无序**或**不可预测性**的量度。
- 一个盒子里两种气体：一开始，系统的熵很低，因为这两种气体是完全可分离的。 但是，一段时间后，气体混合在一起，系统的熵增加。 有人说，在一个孤立的系统中，熵永远不会减小，没有外力，混沌就不会减弱。
- ![](https://p3-sign.toutiaoimg.com/pgc-image/0592767299164cedb4aa8b86cf4fd522~noop.image)

### 熵的性质

- Shannon提出了熵的概念。熵是一个随机变量不确定性的度量

信息论之父克劳德·香农给出的信息熵的三个性质：
- **单调性**，发生概率越高的事件，其携带的信息量越低；
- **非负性**，信息熵可以看作为一种广度量，非负性是一种合理的必然；
- **累加性**，即多随机事件同时发生存在的总不确定性的量度是可以表示为各事件不确定性的量度的和，这也是广度量的一种体现。

### 机器学习中的熵

【2022-8-25】[理解熵：机器学习的黄金标准](https://www.toutiao.com/article/6853911228452962819/)

适用于数据科学的大多数情况都介于天文学的**高熵**和**极低熵**之间。
- **高熵**意味着低信息增益，而**低熵**意味着高信息增益。 
- 可以将信息获取视为系统中的**纯净性**：系统中可用的纯净知识量。

决策树使用熵：为了尽可能有效地将一系列条件下的输入定向到正确的结果，将熵较低（信息增益较高）的特征拆分（条件）放在树上较高位置。
- ![](https://p3-sign.toutiaoimg.com/pgc-image/016699e0ca674da9b46511e4cc0fe3b2~noop.image)
- ![](https://p3-sign.toutiaoimg.com/pgc-image/ba28c73b003b4a4db21f4838badb1c3a~noop.image)

决策树计算特征的熵并对其进行排列，以使模型的总熵最小（并使信息增益最大）。 从数学上讲，这意味着将最低熵条件放在顶部，以便它可以帮助降低其下方的拆分节点的熵。

决策树训练中使用的信息增益和相对熵定义为两个概率质量分布p（x）和q（x）之间的"距离",也称为 `Kullback-Leibler（KL）散度`或`Earth Mover距离`，用于训练对抗性网络以评估生成的图像与原始数据集中的图像相比的性能。[img](https://p3-sign.toutiaoimg.com/pgc-image/f6b97c0eba994562932b2195662c7de3~noop.image)
- ![](https://p3-sign.toutiaoimg.com/pgc-image/f6b97c0eba994562932b2195662c7de3~noop.image)

像`Kullback-Lieber发散`（KLD）一样，`交叉熵`也处理两个分布p和q之间的关系，分别表示**真实**分布p和**近似**分布q。 但是，`KLD`衡量两个分布之间的`相对熵`，而`交叉熵`衡量两个分布之间的"**总熵**"。

`度量`定义为使用模型分布q对来自分布p的源的数据进行编码所需的**平均位数**。 
- 如果考虑目标分布p和近似值q，希望减少使用q而不是p表示事件所需的位数。 
- 另一方面，`相对熵`（KLD）衡量从分布q中的p表示事件所需的**额外**位数。

`交叉熵`似乎是衡量模型性能的一种回旋方式，但是有几个优点：
- 基于准确性/错误的指标存在多个问题，包括对训练数据顺序的极端敏感性，不考虑置信度，并且对可能导致错误结果的各种数据属性缺乏鲁棒性。 它们是非常粗略的绩效指标（至少在培训期间）。
- 交叉熵可以衡量信息内容，因此比简单强调所有复选框的度量标准更具动态性和可靠性。 预测和目标被视为分布，而不是等待回答的问题列表。
- 它与概率的性质密切相关，并且特别适用于S型和SoftMax激活（即使它们仅用于最后一个神经元），有助于减少消失的梯度问题。 逻辑回归可以视为二进制交叉熵的一种形式。

尽管熵并不总是最佳的损失函数（尤其是在目标函数p尚未明确定义的情况下），但熵通常表现为性能增强，这说明了熵在任何地方都存在。



## 1. `自信息` ，`信息熵`，`互信息`

### `自信息` - self-information

如果说概率P是对确定性的度量，信息是对不确定性的度量，这两者是相对的
> **事件发生的概率越大，那么事件的信息量就越小， 事件的概率与事件的信息量之间成反比。**

举例来说：如果**事件A发生的概率比事件B发生的概率要大**，那么我们就说**事件B的信息量要比事件A的信息量要大**。

信息量能够量化以上性质,定义一个事件x的`自信息`为：
$$
I(x) = -log(p(x))
$$

- 当该对数的底数为自然对数 e 时，单位为`奈特`（nats）；
- 当以 2 为底数时，单位为`比特`（bit）或`香农`（shannons）.

### `信息熵` -- information-entropy

`信息熵`是对**平均不确定性**的度量，本质上是**所有事件的信息量的期望**， 对整个概率分布中的不确定性总量进行量化：

$$
H(X) = E_{X}[I(x)]=-\sum_{x \in X} p(x)log(p(x))； \quad X 表示所有事件\\
$$

信息论中，记 `0log0 = 0`
- 当且仅当某个 $P(X_i)=1$，其余的都等于0时， H(X)= 0。
- 当且仅当某个$P(X_i)=1/n，i=1， 2，……， n$时，$H(X)$ 有极大值 log n。

熵可以表示样本集合的不确定性，**`熵`越大，样本的不确定性就越大**。

### `互信息`

- 在概率论和信息论中，两个随机变量的互信息（mutual Information，简称MI）或转移信息（transinformation）是变量间相互依赖性的量度。 不同于相关系数，互信息并不局限于实值随机变量，它更加一般且决定着联合分布p(X,Y) 和分解的边缘分布的乘积p(X)p(Y) 的相似程度。
   - [信息论：熵与互信息](https://my.oschina.net/u/3579120/blog/1508147)
![](https://static.oschina.net/uploads/img/201708/14005354_faKf.png)

$$
I(X,Y) = \sum_{y \in Y} \sum_{x \in X} p(x,y) log( \frac{p(x,y)}{p(x)p(y)})
$$

`互信息` $I(X,Y)$ 取值为非负。当X、Y相互独立时，$I(X,Y)$ 最小为0。

## 2. `相对熵`（KL散度） 与 `交叉熵`

### 1. `相对熵` -- `KL散度` ： Kullback-Leibler divergence

如果对于同一个随机变量 x 有两个单独的概率分布 P(x) 和 Q(x)，我们可以使用 `KL散度`来衡量**这两个分布的差异**。
- 定义： P 对 Q 的`KL散度`为：

$$
D_P(Q) =\sum_{x \in X}P(x)log(\frac{P(x)}{Q(x)})
$$

- 含义：在离散型变量的情况下， `KL散度`衡量的是：**当我们使用一种被设计成能够使得概率分布 Q 产生的消息的长度最小的编码，发送包含由概率分布 P 产生的符号的消息时，所需要的额外信息量。**

性质：
> - **非负**: KL散度为 0,当且仅当P 和 Q 在离散型变量的情况下是相同的分布，或者在连续型变量的情况下是“几乎处处”相同的.
> - **不对称**：$D_p(q) != D_q(p)$

### 2. 交叉熵 - cross entropy

- 设 $p(x), q(x)$ 为 $X$ 中取值的两个概率分布，则 $p$ 对 $q$ 的`交叉熵`为：

$$
D(p || q) = -\sum_{x \in X}p(x)log\, \frac{p(x)}{q(x)}
$$

在一定程度上，相对熵可以度量两个随机变量的“距离”。

### 3. `交叉熵`与`KL散度`的关系

- **针对 Q 最小化交叉熵等价于最小化 P 对 Q 的 KL散度**，因为 Q 并不参与被省略的那一项。

$$
  H_P(Q) = H(P) + D_P(Q)最大似然估计中，最小化 KL 散度其实就是在最小化分布之间的交叉熵。
$$

- `最大似然估计`中，最小化 `KL散度`其实就是在最小化分布之间的`交叉熵`。

## 3. `联合熵`与`条件熵`

- 联合熵 $H(X,Y)$：两个随机变量X，Y的联合分布。
- 条件熵 $H(Y\| X)$：在随机变量X发生的前提下，随机变量Y发生所新带来的熵定义为Y的条件熵，用来衡量在已知随机变量X的条件下随机变量Y的不确定性。

$$
H(Y| X) = H(X,Y) - H(X)
$$

联合熵与条件熵的推导过程如下：

$$
\begin{align}
H(X, Y) - H(X) &= -\sum_{x,y} p(x,y) log \, p(x,y) + \sum_x p(x) log \, p(x) \\
&= -\sum_{x,y} p(x,y) log \, p(x,y) +  \sum_x (\sum_y p(x,y)) \, log \, p(x) \qquad \text{边缘分布 p(x) 等于联合分布 p(x,y) 的和} \\
&= -\sum_{x,y} p(x,y) log \, p(x,y) +  \sum_{x,y} p(x,y) \, log \, p(x) \\ 
&= -\sum_{x,y} p(x,y) log \frac{p(x,y)}{p(x)} \\
&= -\sum_{x,y} p(x,y) log p(y|x)
\end{align}
$$

## 4. `互信息`

- $I(X, Y)$ ：两个随机变量X，Y的`互信息` 为**X，Y的联合分布**和**各自独立分布乘积**的**相对熵**。

$$
I(X, Y) = \sum_{x,y} p(x,y) log \frac{p(x,y)}{p(x)p(y)} \\
I(X, Y) = D(P(X,Y) || P(X)P(Y))
$$

- [推导过程](https://www.nowcoder.com/ta/review-ml/review?page=59)：



## 可视化信息论

原文链接：[Visual Information Theory](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com)

我喜欢用新的方式去思考世界，尤其是将一些模糊的想法形式化成具体的概念。比如，信息论。 

`信息论`提供一种描述事务确定性的语言，比如某人多么善变？知道问题A对于知道问题B有什么帮助？一些想法和另一些想法有多么相似？小孩时，我就有一些粗略想法，但是信息论把这些问题抽象成具体而强大的概念。不管是从数据压缩，量子物理还是机器学习，以及其他很多和这三者有关的领域，信息论的概念都有着大量应用。 

不幸的是很多人认为信息论挺难，其实并不是，可能是有些书写的太糟糕了，实际上完全可以用可视化的方法说清楚。

### 可视化概率分布

深入研究信息论之前，思考下如何可视化简单的概率分布。

比如加利福尼亚有时下雨，但大多都是晴天，也就是说晴天的概率是75％。

![img](https://colah.github.io/posts/2015-09-Visual-Information/img/prob-1D-rain.png)

大多数时候，我都穿着T恤，但有时候会穿外套。假设穿外套的概率是38％。

![img](https://colah.github.io/posts/2015-09-Visual-Information/img/prob-1D-coat.png)

怎么同时可视化这两个事件？如果不相关，很容易，独立即可。例如，今天我穿T恤或雨衣是不是真的与下周的天气相互作用。可以用轴代表不同因素：

![img](http://colah.github.io/posts/2015-09-Visual-Information/img/prob-2D-independent-rain.png)

注意垂直线和水平线一直通过。*这就是独立的样子！* [1](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fn1)

穿外套的概率不会随着一周内会下雨这一事实而改变。换句话说，我穿着外套并且下周会下雨的概率只是我穿着外套的概率，是下雨的概率。他们互不相关。

当变量相互作用时，特定变量的概率和其他变量的概率都会丢失。我穿着外套并且下雨的可能性很大，因为变量是相关的，它们使对方更有可能。更有可能的是，我在下雨的那天穿着外套，而不是我在一天穿外套的可能性，而在其他一些随机的日子下雨。

在视觉上，这看起来像一些方块以更大的概率膨胀，而其他方块缩小，因为这对事件不太可能在一起：
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/prob-2D-dependant-rain-squish.png)

虽然这可能看起来很酷，但它对于理解正在发生的事情并不是很有用。

相反，让我们关注一个像天气一样的变量。我们知道它是晴天还是下雨的可能性。对于这两种情况，我们可以查看*条件概率*。如果天气晴朗，我穿T恤的可能性有多大？如果下雨，我穿外套的可能性有多大？
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/prob-2D-factored-rain-arrow.png)

下雨的几率是25％。如果下雨，我有75％的机会穿上外套。因此，下雨和我穿着外套的概率是25％的75％，大约是19％。下雨的概率乘以我穿着外套下雨的概率，是下雨时我穿外套的概率。我们写这个：

> p(rain,coat) = p(rain) ⋅ p(coat \| rain) 

这是概率论最基本身份之一：

> p(x,y) = p(x) ⋅ p(y \| x)

我们将分配*考虑在内*，将其分解为两件产品。首先，我们看一个变量（如天气）将采取某个值的概率。然后我们看一下另一个变量（如我的衣服）在第一个变量上采用某个值的概率。

选择哪个变量是任意的。我们可以轻松地开始专注于我的衣服，然后看看它的天气条件。这可能感觉有点不那么直观，因为我们知道天气的因果关系会影响我穿什么而不是反过来...但它仍然有效！

我们来看一个例子吧。如果我们选择一个随机的日子，那么我有38％的机会穿着外套。如果我们知道我穿着外套，下雨的可能性有多大？嗯，我更有可能在雨中穿一件外套而不是在阳光下，但在加利福尼亚州下雨很少见，所以它有50％的可能性在下雨。因此，下雨和我穿外套的可能性是我穿着外套的概率（38％），如果我穿着外套（50％）是下雨的可能性的概率是约19％。

> p(rain,coat)=p(coat) ⋅ p(rain \| coat)

这为我们提供了一种完全相同概率分布的可视化方法。

![img](http://colah.github.io/posts/2015-09-Visual-Information/img/prob-2D-factored1-clothing-B.png)

请注意，标签的含义与上图相比略有不同：T恤和外套现在是*边缘概率*，即我在不考虑天气的情况下衣服的可能性。另一方面，现在有两个下雨和晴天标签，因为他们的概率是以T恤和外套为条件的。

（您可能听说过贝叶斯定理。如果您愿意，您可以将其视为在这两种显示概率分布的不同方式之间进行转换的方式！）

### 旁白：`辛普森悖论`

用于可视化概率分布的这些技巧是否真的有用？我认为有用！将它们用于可视化信息论之前还需要一段时间，所以我想继续研究它并用它们来探索`辛普森悖论`。辛普森悖论是一个非常不直观的统计情况。在直观的层面上真的很难理解。迈克尔·尼尔森写了一篇可爱的文章[重塑诠释](http://michaelnielsen.org/reinventing_explanation/)，探讨了不同的解释方法。我想尝试自己解释它，使用我们在上一节中创造的技巧。

测试了两种肾结石治疗方法。一半患者接受治疗A而另一半接受治疗B。接受治疗B的患者比接受治疗A的患者更有可能存活。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/simpson-margin.png)

然而，如果他们接受治疗，患有小肾结石的患者更有可能存活。如果他们接受治疗A，患有大肾结石的患者也更有可能存活！怎么会这样？

问题的核心是该研究没有适当随机化。接受治疗A的患者可能患有大量肾结石，而接受治疗B的患者更可能患有小结石。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/simpson-participants.png)

事实证明，小肾结石患者更容易存活。

为了更好地理解这一点，我们可以结合前两个图表。结果是一个三维图表，存活率分为小型和大型肾结石。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/simpson-separated-note.png)

我们现在可以*看到*，在小病例和大病例中，方案A与方案B比较，方案B似乎更好，因为它应用的患者更有可能在第一时间存活！

### 编码

现在我们有了可视化概率的方法，我们可以深入研究信息论。

让我告诉你我想象中的朋友鲍勃。鲍勃真的很喜欢动物。他经常把动物挂在嘴边。事实上，他只说了四个字：“狗”，“猫”，“鱼”和“鸟”。

几个星期前，出乎意料，鲍勃搬到了澳大利亚。促进了他，他只想以二进制方式进行交流。来自Bob的所有（虚构的）消息都是这样的：
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/message.png)

为了进行交流，Bob和我必须建立一种编码，一种将字映射到位序列的方法。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/code-2bit.png)

为了发送消息，Bob用相应的码字替换每个符号（字），然后将它们连接在一起以形成编码的字符串。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/encode-2bit.png)

### 可变长度代码

不幸的是，想象中的澳大利亚的通信服务很昂贵。我每次必须从Bob收到的每条消息支付5美元。我是否曾提到鲍勃很喜欢说话？为了避免我破产，Bob和我决定我们应该研究是否有某种方法可以缩短我们的平均消息长度。

事实证明，鲍勃经常没有说出所有的话。鲍勃真的很喜欢狗。他一直在说狗。有时，他会说其他动物 - 特别是他的狗喜欢追逐的猫 - 但大多数时候他都在谈论狗。这是他的词频图：
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/DogWordFreq.png)

这似乎很有希望。我们的旧代码使用2位长的代码字，无论它们有多常见。

有一种可视化的方法。在下图中，我们使用垂直轴来显示每个单词的概率p(x)，并使用水平轴可视化相应代码字的长度L(x)。请注意，该区域是我们发送的代码字的平均长度 - 在本例中为2位。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/OldCode.png)

也许我们可以非常聪明地制作一个可变长度的代码，其中常见字的代码字特别短。问题在于代码字之间存在竞争 - 使得一些短的迫使我们使其他代码更长。为了最小化消息长度，我们将所有代码字都理想化缩短，但我们特别希望使用常用代码字。因此，生成的代码对于常见单词（如“dog”）具有较短的代码字，对于较不常见的单词（如“bird”）具有较长的代码字。
- ![img](https://colah.github.io/posts/2015-09-Visual-Information/img/code.png)

让我们再次想象一下。请注意，最常见的代码字变得更短，即使不常见的代码字变得更长。结果是，在网上，面积较小。这对应于较小的预期码字长度。平均来说，代码字的长度现在是1.75位！
- ![img](https://colah.github.io/posts/2015-09-Visual-Information/img/NewCode.png)

>（您可能想知道：为什么不将1本身用作代码字？悲伤的是，当我们解码编码的字符串时，这会导致歧义。我们将在稍后讨论这个问题。）

事实证明，这段代码是最好的代码。对于这种分布，没有代码可以为我们提供小于1.75位的平均代码字长度。

只有一个基本限制。传达所说的是什么，发生了这种分布的事件，要求我们平均至少传播1.75位。无论我们的代码多么聪明，都不可能让平均消息长度更短。我们将此基本限制称为熵分布 - 我们将在稍后更详细地讨论它。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/EntropOptimalLengthExample.png)

如果我们想要理解这个限制，那么问题的关键在于理解在使一些代码字缩短和其他代码字长之间的权衡。一旦我们理解了这一点，我们就能够理解最好的代码是什么样的。

### 代码字的空间

有两个长度为1位的代码：0和1，有四个长度为2位的代码：00,01,10和11。添加的每个位都可能会使代码的数量翻倍。
- ![img](https://colah.github.io/posts/2015-09-Visual-Information/img/CodeSpace.png)

我们对可变长度代码感兴趣，其中一些代码字比其他代码字长。我们可能有一些简单的情况，我们有8个3位长的代码字。也可能有更复杂的混合，比如长度为2的两个代码字和长度为3的四个代码字。是什么决定了我们可以有多少不同长度的代码字？

回想一下，Bob通过将每个单词替换为其代码字并将它们连接起来，将其消息转换为代码字符串。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/encode.png)

在制作可变长度代码时，需要注意一个比较微妙的问题。我们如何将编码后的字符串拆分回代码字？当所有代码字长度相同时，很容易 - 只需每隔几步拆分字符串即可。但由于存在不同长度的代码字，我们需要关注实际内容。

我们十分希望代码是唯一可解码的，只有一种方法可以解码编码的字符串。我们从不希望它是模糊的，哪些代码字构成编码的字符串。如果我们有一些特殊的“代码字结尾”符号，这将很容易。[2](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fn2)但我们没有 - 我们只发送0和1。我们需要能够查看一系列连接的代码字并告诉每个代码字停止的位置。

制作不可唯一解码的代码是非常可能的。例如，假设0和01都是代码字。然后不清楚代码字符串0100111的第一个代码字是什么 - 它可能是！我们想要的属性是，如果我们看到一个特定的代码字，就不应该有一个更长的版本也是一个代码字。另一种说法是，没有代码字应该是另一个代码字的前缀。这称为前缀属性，遵守它的代码称为前缀代码。

考虑这一点的一个有用方法是每个代码字都需要从可能的代码字空间中牺牲。如果我们使用代码字01，我们将无法使用任何代码字，它是前缀。由于含糊不清，我们不能再使用010或011010110 - 我们失去了它们。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/CodeSpaceUsed.png)

由于所有代码字的四分之一都以01开头，因此我们牺牲了所有可能字的四分之一。这就是我们付出的代价，以换取一个只有2位长的代码字！反过来，这种牺牲意味着所有其他代码字需要更长一些。在不同代码字的长度之间总是存在这种权衡。短代码字要求您牺牲更多可能的代码字空间，以防止其他代码字变短。我们需要弄清楚正确的权衡取舍是什么！

### 最佳编码

您可以将此视为使用有限的预算来获取短代码字。我们通过牺牲一小部分可能的代码字来得到一个代码字。

购买长度为0的代码字的成本是1，所有可能的代码字 - 如果你想要一个长度为0的代码字，你就不能拥有任何其他代码字。长度为1的代码字的成本，如“0”，是1/2，因为一半可能的代码字以“0”开头。长度为2的代码字的成本，如“01”，是1/4，因为所有可能的代码字中有四分之一以“01”开头。通常，代码字的成本随着代码字的长度*呈指数*下降。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/code-costonly.png)

请注意，如果成本以（自然）指数衰减，则它既是高度又是面积！[3](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fn3)

我们想要短代码字，因为我们想要短的平均消息长度。每个码字使得平均消息长度的概率乘以代码字的长度。例如，如果我们需要在50％的时间内发送4位长的代码字，那么我们的平均消息长度比不发送代该码字时的长2位。我们可以把它描绘成一个矩形。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/code-lengthcontrib.png)

这两个值与代码字的长度有关。我们支付的总数决定了代码字的长度。代码字的长度控制它增加平均消息长度的程度。我们可以将这两者结合在一起，就像这样。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/code-cost.png)

短代码字减少了平均消息长度但是很昂贵，而长代码字增加了平均消息长度但是便宜。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/code-cost-longshort.png)

使用有限预算的最佳方式是什么？我们应该在每个事件的代码字上花多少钱？

就像人们想要更多地投入经常使用的工具一样，我们希望在常用的代码字上花费更多。有一种特别自然的方法可以做到这一点：按照事件的常见程度分配我们的预算。因此，如果一个事件有50％的概率发生，我们将50％的预算用于购买短代码字。但如果事件只有1％的概率发生，我们只花费预算的1％，因为如果代码字很长，我们并不在意。

这是很自然的，但这是最好的方法吗？它是的，我会证明它！

*以下证据是直观的，应该是可读的，但是需要工作才能完成，这绝对是本文中最难的部分。读者可以随意跳过接受这个并转到下一部分。*

让我们描绘一个具体的例子，我们需要传达两个可能发生的事件中的某一个。事件a发生时间p(a) 和事件b发生时间p(b) 。我们以上述自然方式分配我们的预算，花费p(a) 用于获得a一个短代码字，以及p(b) 获得b一个短代码字。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/code-auction-balanced-noderivs.png)

成本和长度贡献边界排列地很好。这有什么意义吗？

好吧，如果我们略微改变代码字的长度，请考虑成本和长度贡献会发生什么。如果我们略微增加代码字的长度，则消息长度贡献将与其在边界处的高度成比例地增加，而成本将与其在边界处的高度成比例地减小。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/code-derivs.png)

因此，使a的代码字更短的成本是p(a)。与此同时，我们并不关心每个代码字的长度，我们关心它们与我们使用它们的程度成正比。在a的情况下，即p(a)。使a的代码字缩短的好处是p(a)。

有趣的是，两种衍生物都是相同的。这意味着我们的初始预算具有有趣的属性，如果您有更多的花费，那么投资使任何代码字更短也同样好。最后，我们真正关心的是利益/成本比率 - 这就决定了我们应该投入更多资金。在这种情况下，比率为p(a)/p(a)，等于一。这与p(a)的值无关它总是一。我们可以将相同的参数应用于其他事件。利益/成本总是一，所以在任何一个方面投入更多都是同等重要的。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/code-auction-balanced.png)

无限小，改变预算没有意义。但这并不能证明它是最好的预算。为了证明这一点，我们将考虑一个不同的预算，我们在一个代码字上花费一些额外费用而牺牲另一个代码字。我们会将ϵ少投资于b，并将其投资于a。这使得a的代码字更短，而b的代码字更长一些。

现在购买a的较短代码字的成本是p(a)+ϵ，购买b的较短代码字的成本是p(b)-ϵ。但利益仍然是一样的。这导致购买的利益成本比p(a)/(p(a)+ϵ) 小于一。另一方面，购买b的利益成本比是p(b)/(p(b)−ϵ)，它大于1。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/code-auction-eps.png)

价格不再平衡。 **baba**。

投资者尖叫：“购买b！出售a！“。我们这样做，之后就会结束回到原来的预算计划。所有的预算都会提高，从而转向我们的原计划。

原始预算 - 按照我们使用它的频率按比例投资每个代码字 - 不光是自然而然的事情，而是因为它是最佳选择。（虽然此证明仅适用于两个代码字，但它很容易被推广到适用于更多代码字。）

（细心的读者可能已经注意到，我们的最佳预算可能会建议代码字具有小数长度的代码。这似乎有什么关系？这是什么意思？当然，实际上，如果你想通过发送单个代码字，你必须四舍五入（round）。但正如我们稍后会看到的，有一个非常真实的意义，当我们一次发送多个代码字时可以发送小数代码字！请你耐心等待！）

### 计算熵

回想一下，长度为L的消息的成本是1/2^L。 我们给定量的消息的长度，可以将其反向处理获得花费成本：log2⁡（1/cost）。 由于我们在x的代码字上花费p(x)，因此长度为log2⁡(1/p(x))。这些是长度的最佳选择。
- ![img](https://colah.github.io/posts/2015-09-Visual-Information/img/entropy-def-notitle.png)

早些时候，我们讨论了如何从一个特定的概率分布中获得平均消息来传递事件的短暂性的基本限制，p。 这个限制，即使用最佳代码的平均消息长度，称为p的熵，H(p)。 现在我们知道了代码字的最佳长度，实际上我们可以计算它！

> H(p)=∑p(x)log2⁡(1/p(x))

*（人们经常使用标识 H(p)=−∑p(x)log2⁡(p(x)) 改写成 log⁡(1/a)=−log⁡(a).我认为前者更直观，并将继续在本文中使用它。）*

无论我做什么，平均而言，如果我想要传达哪个事件，我需要发送至少这个位数。

通信所需的平均信息量对压缩有明显的影响。 但还有其他理由让我们应该关注它吗？ 有！它描述了不确定性并给出了量化信息的方法。

如果我确切知道会发生什么，我根本不需要发送消息！ 如果有两件事可能以50％的概率发生，我只需要发送1比特。但如果有64种不同的事情可能以相同的概率发生，我必须发送6比特。 概率越集中，我就越能用短平均消息写出聪明的代码。 概率越分散，我的消息就越长。

结果越不确定，平均来说，当我发现发生了什么时，我知道的越多。

### 交叉熵

在他搬到澳大利亚之前不久，鲍勃娶了爱丽丝，这是我想象中的另一个虚构。 为了让我自己以及我头脑中的其他人物感到惊讶，爱丽丝不是一个爱狗的人。 她是一个猫爱好者。 尽管如此，他们两人能够在他们对动物的共同喜好和词汇量非常有限的情况下找到共同点。

![img](http://colah.github.io/posts/2015-09-Visual-Information/img/DogCatWordFreq.png)

他们俩说不同频率的同一个词。 鲍勃一直在说狗，爱丽丝一直在说猫。

最初，Alice使用Bob的代码向我发送消息。不幸的是，她的消息比我和Bob需要的时间更长。 鲍勃的代码是针对他的概率分布进行了优化。 Alice具有不同的概率分布，并且代码对于它来说是次优的。 虽然Bob使用自己的代码时代码字的平均长度是1.75位，但当Alice使用他的代码时它是2.25。 如果两者越不相似，那么会更糟糕！

这个长度 - 从一个分布传递事件与另一个分布的最佳代码的平均长度 - 称为交叉熵。 形式上，我们可以将交叉熵定义为：[4](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fn4)  Hp(q)=Σq(x)log2⁡(1/p(x))

在这种情况下，爱丽丝的交叉熵是猫爱好者的单词频率相对于鲍勃爱好者的单词频率。

![img](http://colah.github.io/posts/2015-09-Visual-Information/img/CrossEntropyDef.png)

为了降低通信成本，我让Alice使用自己的代码。令我宽慰的是，这降低了她的平均消息长度。但它引入了一个新问题：有时Bob会不小心使用Alice的代码。令人惊讶的是，鲍勃不小心使用Alice的代码而Alice使用了Bob的代码，这样会更糟糕！

那么，现在我们有四种可能性：
- Bob使用他自己的代码 H(p)=1.75 bits
- Alice使用Bob的代码 Hp(q)=2.25 bits
- Alice使用自己的代码 H(q)=1.75 bits
- Bob使用Alice的代码 Hq(p)=2.375 bits

这不一定像人们想象的那样直观。例如，我们可以看到Hp(q)≠Hq(p)。有什么方法可以看出这四个值如何相互关联？

在下图中，每个子图表示这4种可能性中的一种。每个子图可视化了平均消息长度，与我们之前的图表一样。它们被放在了一个正方形中，因此如果消息来自相同的分布，则图形彼此相邻，并且如果它们使用了相同的代码，则它们相互叠加。这允许您在视觉上将分布和代码一起滑动。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/CrossEntropyCompare.png)

你能明白为什么Hp(q) ≠ Hq(p)吗？ Hq(p)很大，因为在p下有一个非常常见的事件（蓝色）但得到一个长代码，因为它在q下非常罕见。 另一方面，q下的常见事件在p下较不常见，但差别不那么大，因此Hp(q) 不那么高。

交叉熵不是对称的。

那么，为什么要关心交叉熵呢？ 好吧，交叉熵为我们提供了一种表达不同的两种概率分布的方法。 分布p和q越不同，p相对于q的交叉熵就越大于p的熵。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/CrossEntropyQP.png)

同样，p与q越不一样，q相对p的交叉熵就越大于q的熵。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/CrossEntropyPQ.png)

真正有趣的是熵和交叉熵之间的差异。这种差异是我们的消息需要多长时间，因为我们使用了针对不同分布而优化的代码。如果分布相同，则此差异将为零。随着差异的增大，它会变得更大。

我们将这种差异称为Kullback-Leibler分歧，或KL分歧。p相对于q，Dq(p)，[5](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fn5) 的KL偏差定义为：[6](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fn6)

> Dq(p) = Hq(p)−H(p)

关于KL分歧的真正好处在于它就像两个分布之间的距离。它可以量化分布间的不同！ （如果你认真对待这个想法，最终会得到信息几何。）

交叉熵和KL分歧在机器学习中非常有用。通常，我们希望一个分布与另一个分布接近。例如，我们可能希望预测的分布接近基本事实。 KL分歧为我们提供了一种自然的方式来实现这一目标，因此它无处不在。

### 熵和多变量

让我们回到之前的天气和衣服示例：
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/prob-2D-factored1-detail.png)

像许多父母一样，我的母亲有时会担心我不能适应天气。（她有合理的怀疑理由 - 我经常在冬天不穿外套。）所以，她经常想知道天气和我穿的衣服。 我要发送多少比特才能传达这个消息给她？

好吧，简单的方法是把概率分布拉平：
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/prob-2D-factored1-flat.png)

现在我们可以计算出这些概率事件的最优代码字，并计算平均消息长度：
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/Hxy-flat.png)

我们称之为X和Y的联合熵

> H(X,Y)=∑x,yp(x,y)log2⁡(1p(x,y))

这与我们的正常定义完全相同，除了是两个变量而不是一个变量之外。

考虑这个问题的一种稍好一点的方法是避免使分布变平，只需将代码长度看作第三维。 现在熵就是体积！
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/Hxy-3D.png)

但是假设我妈妈已经知道天气了。 她可以在新闻上查看。 现在我需要提供多少信息？

似乎我需要发送更多的信息来传达我穿的衣服。但实际上我发送的更少了，因为天气强烈暗示我会穿什么衣服！ 让我们分别考虑下雨和晴天的情况。
- ![img](https://colah.github.io/posts/2015-09-Visual-Information/img/HxCy-sep.png)

在这两种情况下，我不需要平均发送大量信息，因为天气让我很好地猜测了正确答案。 当天气晴朗时，我可以使用一个特殊的晴天优化代码，当下雨时我可以使用下雨优化的代码。 在这两种情况下，我发送的信息少于我使用通用代码的情况。为了获得我需要发送给我妈妈的平均信息量，我只是将这两个案例放在一起......
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/HxCy.png)

我们称之为条件熵。如果你把它形式化成一个方程，你会得到：

> H(X\|Y)=∑yp(y)∑xp(x\|y)log2⁡(1p(x\|y))=∑x,yp(x,y)log2⁡(1p(x\|y))

### 互信息

在上一节中，我们观察到知道一个变量可能意味着传递另一个变量需要更少的信息。

考虑这个问题的一个好方法是将大量信息想象成条形。 如果它们之间存在共享信息，则这些条重叠。 例如，X和Y中的一些信息在它们之间共享，因此H(X) 和H(Y) 是重叠条。 并且由于H(X,Y) 是两者中的信息，它是条形H(X) 和H(Y) 的并集。[7](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fn7)
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/Hxy-info-1.png)

一旦我们以这种方式思考问题，会更容易看到很多事情。

例如，我们之前注意到它需要更多信息来传达X和Y（“联合熵”，H(X,Y) 而不是仅仅需要 通信X（“边际熵”，H(X)）。但是，如果你已经知道Y，那么传递X（“条件熵”，H(X\|Y)）所需的信息比你没有做的要少！
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/Hxy-overview.png)

这听起来有点复杂，但是当我们从条形图的角度来考虑时，它非常简单。H(X\|Y) 是我们需要发送以将X发送给已经知道Y的人的信息，X中的信息不在Y中。从可视化来看，这意味着H(X\|Y)是H(X)条的一部分，它与H(Y)不重叠。

您现在可以从下图中读取不等式H(X,Y)≥H(X)≥H(X\|Y)。

![img](http://colah.github.io/posts/2015-09-Visual-Information/img/Hxy-info-4.png)

另一个标识是H(X,Y)=H(Y)+H(X\|Y)。 也就是说，X和Y中的信息是 Y中的信息加上X不在Y中的信息。

![img](http://colah.github.io/posts/2015-09-Visual-Information/img/Hxy-overview-sum.png)

同样，在方程中很难看到这些，但是如果你正在考虑这些重叠的信息条，那么很容易就可以看出来。

此时，我们已经通过多种方式破坏了X和Y中的信息。我们在每个变量中都有信息，H(X)和H(Y)。我们在H(X,Y)中都有信息的并集。我们有一个而不是另一个的信息，H(X\|Y)和H(Y\|X)。其中很多似乎都围绕着变量间共享的信息，即信息的交集。我们称之为“互信息”，I(X,Y)，定义为：[8](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fn8) I(X,Y)=H(X)+H(Y)−H(X,Y)这个定义有效，因为H(X)+H(Y) 有两个互信息副本，因为它在X和Y中，而H(X,Y) 只有一个。（考虑前面的条形图。）

与互信息密切相关的是信息的变化。信息的变化是变量之间不共享的信息。我们可以像这样定义：V(X,Y)=H(X,Y)−I(X,Y)，信息的变化很有意思，因为它给出了一个度量，不同的变量间距离的概念。如果知道一个变量的值就能知道另一个，则两个变量之间的信息变化为零，随着它们变得更加独立而增加距离值。

这与KL分歧有什么关系？这也给了我们一个距离概念？好吧，KL分歧给出了两个分布在同一个变量或一组变量上的距离。相反，信息的变化给出了两个联合分布变量之间的距离。 KL分歧在分布之间，分布内的信息变化。

我们可以将所有这些结合在一张图表，将所有这些不同的信息联系起来：

![img](http://colah.github.io/posts/2015-09-Visual-Information/img/Hxy-info.png)

### 分数位

关于信息论的一个非常不直观的事情是我们可以得到小数位。这很奇怪。 一半是什么意思？

这是一个简单的答案：通常，我们对消息的平均长度而不是任何特定的消息长度感兴趣。 如果一半时间发送一个比特，一半时间发送两个比特，平均一个发送一个半比特。 平均值是分数的并不奇怪。

但这个答案实际上是在回避这个问题。 通常，代码字的最佳长度是分数。 那是什么意思？

具体来说，让我们考虑概率分布，其中一个事件a发生概率为71％，另一个事件b发生概率为29％。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/halfbit-ab.png)

最佳代码将使用0.5位来表示a，使用1.7位来表示b。 好吧，如果我们想发送这些代码字中的一个，这是不可能了。 我们被迫四舍五入到整数位，平均发送1位。

...但如果我们一次发送多条消息，事实证明我们可以做得更好。 让我们考虑从这个分发版中发送两个事件。 如果我们独立发送它们，我们需要发送两位。 我们可以做得更好吗？
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/halfbit-ab2.png)

有一半的时间，我们需要发送aa，21％的时间我们需要发送ab或ba和花费8%的通信时间bb。 同样，理想的代码涉及小数位。
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/halfbit-ab-idealcode.png)

如果我们四舍五入代码字的长度，我们会得到这样的结果：
- ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/halfbit-ab-code.png)

此代码为我们提供了1.8位的平均消息长度。当我们独立发送它们时，它小于2位。另一种思考方式是我们平均每个事件发送0.9位。如果我们要一次发送更多事件，它会变得更小。由于n趋于无穷大，由于四舍五入我们的代码而导致的开销将消失，并且每个代码字的位数将接近熵。

此外，注意a的理想代码字长度是0.5位，aa的理想代码字长度是1位。理想的代码字长度会增加，即使它们是分数！因此，如果我们一次发送很多事件，则会增加长度。

即使实际代码只能使用整数，也有一种非常真实的意义，即人们可以拥有小数部分的信息位。

（在实践中，人们使用特定的编码方案，这些编码方案在不同程度上是有效的。[霍夫曼编码](https://en.wikipedia.org/wiki/Huffman_coding)，基本上就是我们在这里描述的那种代码，不能非常优雅地处理小数位 - 你必须像我们上面做的那样对符号进行分组，或者使用更复杂的技巧来接近熵极限。[算术编码](https://en.wikipedia.org/wiki/Arithmetic_coding)有点不同，但优雅地处理小数位是渐近最优的。）

## 结论

如果我们关心以最小数量的比特进行通信，那么这些想法显然是基本的。如果我们关心数据压缩，信息论可以解决核心问题并为我们提供基本正确的抽象。但是如果我们不在乎呢？除了好奇心之外，还有什么？

信息论的想法出现在许多背景中：机器学习，量子物理学，遗传学，热力学，甚至赌博。这些领域的从业者通常不关心信息论，因为他们想要压缩信息。他们之所以在意，是因为信息论与他们的领域有着紧密的联系。量子纠缠可以用熵来描述.[9](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fn9)统计力学和热力学的结果可以通过假设你不知道的事物的最大熵得出。[10](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fn10)赌徒的胜负与KL分歧直接相关，特别是迭代设置。[11](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fn11)

信息论之所以出现在这些地方，是因为它为我们需要表达的许多事情提供了具体的、有原则的形式化表述。它为我们提供了测量和表达不确定性的方法，两组信念的不同，以及一个问题的答案告诉了我们多少关于其他问题的信息：扩散概率是多少，概率分布之间的距离，以及两个变量的相关程度。有其他类似的想法吗？当然。但是，信息论的思想是清晰的，它们具有非常好的特性和原则性的起源。在某些情况下，它们正是你所关心的，而在其他情况下，它们是混乱世界中的一个方便代理。

机器学习是我最了解的，所以让我们谈谈这一点。机器学习中一种很常见的任务是分类。假设我们想看一张照片并预测它是狗还是猫的照片。我们的模型可能会说“这个图像是狗的概率为80％，而且有20％的可能性是猫。”假设正确的答案是狗 - 我们只说有80%的几率是一只狗，这到底是好还是坏？“85％会更好吗？

这是一个重要的问题，因为我们需要一些关于我们的模型是好是坏的概念，以便优化它做得更好。我们应该优化什么？正确答案实际上取决于我们使用该模型的原因：我们只关心上面的猜测是否正确，还是关心我们对正确答案的信心？自信错误有多糟糕？没有一个正确的答案。通常不可能知道正确的答案，因为我们不知道如何以足够精确的方式使用模型来形式化我们最终关心的内容。结果是，有些情况下交叉熵确实正是我们关心的，但情况并非总是如此。更常见的是，我们并不确切知道我们关心的是什么，交叉熵是一个非常好的代替工具。[12](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fn12)

信息为我们提供了一个思考世界的强大新框架。有时它完全符合手头的问题；其他时候它并不完全合适，但仍然非常有用。这篇文章只涉及信息论的表面 - 有一些主要的主题，比如纠错码，我们根本没有涉及到 - 但我希望我已经展示了信息论是一个的美丽主题，不需要令人生畏。

*为了帮助我成为一个更好的作家，请考虑填写这份反馈表格。*

## 延伸阅读

克劳德·香农关于信息论的原始论文，[通信的数学理论](http://worrydream.com/refs/Shannon%20-%20A%20Mathematical%20Theory%20of%20Communication.pdf)，非常易懂。（这似乎是早期信息论论文中反复出现的一种模式。是那个时代吗？缺少页面限制？来自贝尔实验室的文化？）

Cover & Thomas的信息论元素似乎是标准参考。我发现这很有用。

## 致谢

我非常感谢 [Dan Mané](https://github.com/danmane), [David Andersen](https://www.cs.cmu.edu/~dga/), [Emma Pierson](http://obsessionwithregression.blogspot.com/)和Dario Amodei花时间对这篇文章给出了非常详尽和广泛的评论。 我也很感谢[Michael Nielsen](http://michaelnielsen.org/), [Greg Corrado](http://research.google.com/pubs/GregCorrado.html), [Yoshua Bengio](http://www.iro.umontreal.ca/~bengioy/yoshua_en/index.html), [Aaron Courville](https://aaroncourville.wordpress.com/), [Nick Beckstead](http://www.nickbeckstead.com/), [Jon Shlens](http://research.google.com/pubs/JonathonShlens.html), Andrew Dai, [Christian Howard](http://research.google.com/pubs/ChristianHoward.html), 和[Martin Wattenberg](http://www.bewitched.com/)的评论。

还要感谢我的前两个神经网络研讨会系列，作为这些想法的实验对象。

最后，感谢那些发现错误和遗漏的读者。 特别感谢Connor Zwick，Kai Arulkumaran，Jonathan Heusser，Otavio Good和一位匿名评论者。


- 1. 用这个来可视化朴素的贝叶斯分类器很有趣，它们假设独立......[↩](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fnref1)
- 2. 但非常低效！ 如果我们在代码中使用了额外的符号，那么只在代码字的末尾使用它就会是一种可怕的浪费。[↩](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fnref2)
- 3. 我在这里作弊。 我一直在使用底数为2的指数，这不是真的，我将切换到自然指数。 这节省了我们在证明中有很多log(2)s，并阅读体验更好。[↩](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fnref3)
- 4. 注意，这种交叉熵的表示法是非标准的。 通常的表示法是H(p,q)。 由于两个原因，这种表示法很糟糕。 首先，联合熵也用完全相同的符号。 其次，它使得交叉熵看起来像是对称的。 这太荒谬了，我将用Hq(p）来代替。[↩](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fnref4)
- 5. 也是非标准的表示法。[↩](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fnref5)
- 6. 如果扩展KL分歧的定义，你得到：Dq(p)=∑p(x)log2⁡(p(x)/q(x)) 这可能看起来有点奇怪。 我们该怎么解释呢？ 那么，log2⁡(p(x)/q(x))就是为q优化的代码和为p优化的代码将使用多少位之间的差异 表示x。 表达式作为整体是两个代码将使用多少位的预期差异。[↩](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fnref6)
- 7. 这构建了Raymond W. Yeung论文中对信息理论的集合解释 [A New Outlook on Shannon’s Information Measures](http://www.cnd.mcgill.ca/~ivan/it_ineq_script/Raymond%20Yeung%20papers/A%20New%20Outlook%20on%20Shannon%E2%80%99s%20Information%20Measures%2000079902.pdf).[↩](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fnref7)
- 8. 如果扩展互信息的定义，您会得到：
> I(X,Y)=∑p(x,y)log2⁡(p(x,y)/(p(x)p(y)))

   这看起来像 KL 分歧！

   这是怎么回事？ 嗯，这是 KL 分歧。 它是P(X,Y) 的KL分歧和它的朴素近似P(X)P(Y)。 也就是说，如果知道它们之间的关系而不是假设它们是独立的，那么您保存的位数代表X和Y.

   一种很有趣的方法是把一个分布和它的朴素近似之间的比例画出来:

   ![img](http://colah.github.io/posts/2015-09-Visual-Information/img/mutual-visual-eq.png)
- 9. 有一整个量子信息论领域。 我对这个问题一无所知，但我敢打赌，基于Michael的其他工作，Michael Nielsen和Issac Chuang的Quantum Computation和Quantum Information是一个很好的介绍。[↩](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fnref9)
- 10. 作为一个对统计物理一无所知的人，我会非常紧张地试图勾勒出与我所理解的信息论的联系。

在Shannon发现信息论之后，许多人注意到热力学方程和信息论方程之间存在可疑的相似性。E.T. Jaynes 发现了一个非常深刻和有原则的联系。 假设您有一些系统，并进行一些测量，如压力和温度。 您认为系统的特定状态是多大概率？ Jaynes建议我们应该假设概率分布，在我们测量条件的约束下，它最大化熵。 （请注意，这个“最大熵原理”比物理学更为普遍！）也就是说，我们应该假设具有最未知信息的可能性。 从这个角度可以得出许多结果。

-  （阅读杰恩斯论文的前几节([part 1](http://bayes.wustl.edu/etj/articles/theory.1.pdf), [part 2](http://bayes.wustl.edu/etj/articles/theory.2.pdf)) 他们十分易读切让我印象深刻）
- 如果您对这种联系感兴趣但又不想完成论文的原始工作，那么Cover＆Thomas中有一个部分可以从马尔可夫链中获得热力学第二定律的统计版本！[↩](https://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fnref10)

- 11. 信息理论与赌博之间的联系最初是由约翰凯利在他的论文“[信息率的新解释](http://www.princeton.edu/~wbialek/rome/refs/kelly_56.pdf)”中提出的。 这是一篇非常容易阅读的论文，虽然它需要我们在本文中没有提出的一些想法。

    凯利对他的工作有一个有趣的动机。 他注意到熵正在许多成本函数中使用，这些函数与编码信息无关，并且需要一些原则性的原因。 在写这篇文章的时候，我也被同样的事情所困扰，并且非常感谢凯利的工作作为一个额外的视角。 也就是说，我并不觉得它完全令人信服：凯利只是因为他考虑了迭代投注，每次投注重新投入所有资金。 不同的设置不会导致熵。

    关于凯利在博彩和信息理论之间联系的一个很好的讨论可以在信息理论的标准参考资料中找到，即Cover＆Thomas的“信息理论要素”。[↩](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fnref11)

- 12. 它并没有解决这个问题，但我无法抗拒为KL分歧提供进一步的防御。

    有一个结果，盖斯和托马斯称斯坦因的引理，虽然它似乎与通常称为斯坦因引理的结果无关。从高层次来看，它是这样的：

    假设您知道某些数据来自两个概率分布中的一个。你有信心确定它来自哪两个分发版？通常，随着获得更多数据点，信心应该呈指数级增长。例如，平均而言，对于看到的每个数据点，你可能会对哪个分布的真实性有1.5倍的信心。

    信心增加多少取决于分布的差异。如果它们非常不同，您可能会很快变得自信。但如果它们只是略有不同，那么在你有一个肯定自信的答案之前，你可能需要看到大量的数据。

    Stein的Lemma简单地说，乘以的数量是由KL分歧控制的。 （关于假阳性和假阴性之间的权衡有一些微妙之处。）这似乎是关心KL分歧的一个非常好的理由！[↩](http://colah.github.io/posts/2015-09-Visual-Information/?from=hackcv&hmsr=hackcv.com&utm_medium=hackcv.com&utm_source=hackcv.com#fnref12)
