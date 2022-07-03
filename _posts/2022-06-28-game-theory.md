---
layout: post
title:  "博弈论- Game Theory"
date:   2022-06-28 11:03:00
categories: 数学基础
tags: 博弈论 纳什 内卷
excerpt: 如何用博弈论解决内卷？
mathjax: true
---

* content
{:toc}

# 总结

- 【2021-5-26】[这次终于把“内卷”讲明白了！](https://www.sohu.com/a/468770316_499002)

# 博弈论

## 博弈论定义

博弈论是指两个或两个以上的个人（团体）在平等的对局中的决策、行动，以达到共赢局面的理论依据。
- 1928年，冯·诺依曼证明了博弈论的基本原理。
- 自20世纪以来，博弈论得到西⽅商界、经济学界、军事领域、社会学界的⼴泛应⽤。它可以帮助不同利益的决策者建⽴起能够⾃我规范、⾃动运作的合作关系。
- 小到家庭失和、邻里矛盾，大到公司合作、国家外交......这些问题大都可以通过博弈论的策略找到最优解。

- 【2022-6-28】[博弈论课程](http://www.niehuihua.com/a/jiaoxue/629.html)，[导论](http://www.niehuihua.com/uploads/soft/220218/1-22021Q95009.pdf)
  - 博弈（game）：一种存在策略互动的游戏
  - 博弈论（game theory）：研究存在策略互动时最佳策略的理论
  - 决策问题：
    - 所有可能的行动
    - 所有可能的结果
    - 个人最结果的偏好
  - 博弈论的缺陷
    - 要求参与人超级理性：具备完备、封闭的心智模式（mental model），或 博弈规则的共同知识（common knowledge）
    - 结果不稳定（non-robust），存在多重均衡，给经验检验带来困难
  - 博弈论分类
    - 能否达成有约束力的协议：合作博弈、非合作博弈（non-cooperative game）——1950年nash
    - 合作博弈：强调公正，帕累托最优、集体利益最大化
    - 非合作博弈：强调个人理性、个人利益最大化
      - 静态：参与人独立、同时的选择一劳永逸的行动
      - 完全信息：所有参与人都了解博弈环境、行动、结果，及大家对结果的偏好
      - 两个维度组合成4种类型
      - ① 完全信息静态博弈：优势策略均衡、纳什均衡等
      - ② 完全信息动态博弈：子博弈完美纳什均衡
      - ③ 不完全信息静态博弈：海萨尼转换和贝叶斯均衡
      - ④ 不完全信息动态博弈：完美贝叶斯均衡

## 博弈困境

《博弈论与生活》中，7个困扰生活的困境——囚徒困境、公地悲剧、搭便车、懦夫博弈、志愿者困境、两性战争、猎鹿问题。
- 双方都想攻克对方的容忍底线的被称为“**懦夫博弈**”；
- 一方想要侵占共同持有的资源的是“**搭便车**”困境；
- 每个人都希望别人为团队多做一些，属于“**志愿者**困境”......

所以，我们生活中遇到的将近80%的问题都可以用博弈论模型来分析解决。


## 纳什均衡

`纳什均衡`（或者纳什平衡），Nash equilibrium ,又称为**非合作博弈均衡**，是博弈论的一个重要策略组合，以约翰·纳什命名。

> 约翰·纳什，生于1928年6月13日。著名经济学家、博弈论创始人、《美丽心灵》男主角原型。前麻省理工学院助教，后任普林斯顿大学数学系教授，主要研究博弈论、微分几何学和偏微分方程。由于他与另外两位数学家（经济学家，约翰·C·海萨尼和莱因哈德·泽尔腾）在非合作博弈的均衡分析理论方面做出了开创性的贡献，对博弈论和经济学产生了重大影响，而获得1994年诺贝尔经济学奖。


纳什的人生非常曲折，一度学术成果不被认可，甚至换上严重的精神分裂症，在爱的力量下在很多年后奇迹般地恢复，并最终获得诺内尔经济学奖。影片《美丽心灵》（A Beautiful Mind）是一部改编自同名传记而获得奥斯卡金像奖的电影，影片以约翰·纳什与他的妻子艾莉西亚（曾离婚，但2001年复婚）以及普林斯顿的朋友、同事的真实感人故事为题材，艺术地重现了这个爱心呵护天才的传奇故事。
- 美丽心灵[电影](https://vidhub.cc/voddetail/21850.html)
- 【美丽心灵】改编自西尔维娅·娜萨写作的同名传记 《A Beautiful Mind: Genius, Schizophrenia and Recovery in the Life of a Nobel Laureate》
- <img src="https://pic4.zhimg.com/80/v2-79d8a7373220b693fdeab871ad88a633_720w.jpg" height="100%" width="100" />

<iframe src="//player.bilibili.com/player.html?aid=9786625&bvid=BV1Cx411S7Sw&cid=16178821&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"> </iframe>

## 内卷与博弈

“内卷”，是一个典型“囚徒的困境”

牛津大学教授项飙给过一个很全面的解读：
- 整体环境的恶化是不断加速且不可挽回的；而个体没有能力与环境抗衡，最终只有顺应环境变化，加入到内卷的行列中。

假设一个部门所有人目标都是完成手头工作和KPI，等待工资到手。有一天部门领导灵机一动，开始制定鼓励员工每天加班半小时制度，新员工A急于表现，率先表示自己可以加班1小时，于是员工BCD......纷纷被迫开启下班后“摸鱼”一小时模式。

在“囚徒困境”模型下，当一个制度建立，制度覆盖下的人群大多数会被迫选择迎合制度，而当这一制度并非**最优解**时，那么，所有人的迎合都会变成**无效**迎合。最后的结果就是，所有人累死累活，起早贪黑，整体效益并不会有可观的增量。

### 什么是内卷

随着互联网的“流量泡沫”涌入整个社会，人类开始进入疯狂“内卷化”时代，教育、工作、生活、甚至是婚恋，无一幸免。

有人将“内卷”的表现归纳概括为以下七点：
- 无意义的精益求精；
- 将简单问题复杂化；
- 低水平的模仿和复制为了免责；
- 被动的应付工作；
- 与预期的目标严重偏离的工作；
- 在同一个问题上无休止的挖掘研究；
- 限制创造力的内部竞争是制度性的内卷。

2021年，“内卷化”带来无休止叠加的负担，却没有带来相应的回报与获得，这不仅让人深思：我们究竟为何而“卷”？

小米创始人雷军曾说过：永远不要试图用**战术**上的勤奋，掩饰**战略**上的懒惰。

这世上，真正能成事的人，并不是投入最多时间“内卷”的人，而是那些能找到**最佳解决问题途径**的人。

**天道未必酬勤**，但天道一定关照能找到最优解的聪明人。

### 如何解决内卷

陷入“囚徒的困境”的“内卷”之后，无论是个人还是团体，职场还是生活，都是一种无声息的虚度与浪费。

兰·费雪教授在《博弈论与生活》通过一整章的内容解释了“囚徒困境”，即：人们常常从利益出发，选择放弃最佳合作策略，从而陷入远利益受损的局。

解决这一困境的三种方式：改变态度，诉诸善意的权威人士，能够自行运作的策略。
- （1）**改变态度**：如果我们都认为在合作中作弊是不道德的，就能避免许多社会困境。
- （2）**诉诸善意的权威人士**：所谓“善意的权威人士”大多只是一个迷思。一旦有了权力，就几乎无可避免地会谋求私利。所以，我们需要让外部的权威人士来促成合作并守护公平。
- （3）能够**自行运作的策略**：开发出能够自行运作的策略，如此一来，只要合作一开始，就不会有作弊的机会。


以博弈论为理论支撑的5个建立“合作关系”的方法。
- 沟通 —— 协商 —— 联盟 —— 承诺 —— 理智与情绪
1. 沟通
  - 卡耐基说过，一个人的成功，15%取决于知识和技能，85%取决于沟通。博弈论研究者认为。只要双方愿意且能够沟通，理性通常也能让他们达成协议。
  - 沟通顺畅至少会减少一半的时间成本。
  - 经常会看到一些八卦新闻：早已没有感情的夫妻双方，因为一些小利益双方不肯妥协，耗了一年又一年，离婚官司反复上了热搜，却久久不能得到妥善解决。
  - 阻碍他们离婚速度的，不是离婚冷静期，而是双方对于沟通的逃避。这种逃避导致双方不仅要付给律师大笔金钱，还必须承受长达几年的情绪上的压力。
2. 协商
  - 协商的两大利器，就是威胁和承诺，两者间的选择要看当时情境而定，而且对方必须相信才会有效。
  - 兰·费雪教授在书中举了这样一个小例子，当孩子开始调皮捣蛋的时候，如果爸妈只是大吼：“再不住手，我就把你宰了！”
  - 小孩可能不会对此感到威胁，因为他很明确的知道爸妈会打他屁股，但不会真的宰了他。这是一个不会成真的威胁，所以，大多数孩子理都不会理。
  - 如果爸妈把话术换成：“再皮不准吃冰淇淋了”或者是“听话，我给你买冰淇淋吃”。大概会有很明显的效果。
3. 联盟
  - 从博弈论的角度来看，夫妻，同事，或者是商家和消费者，只要便于协调双方策略，都是联盟关系。
  - 兰·费雪教授认为，人们常常从自身利益出发，选择放弃最佳合作策略，从而陷入长远利益受损的局面。
  - 所以，想要一个合作双赢的局面，必须要要将合作双方看做一个必须信任的联盟关系。
  - 在这一基础上，各方协商出策略，彼此信任，信守承诺，这些行动可以让所有人跳出社会困境，最终实现双赢局面。
4. 承诺
  - 有没有什么方式，可以让人在缺乏信任的情况下，仍然对组织保持忠诚？答案只有一个——承诺。
  - 兰·费雪教授提出了这样一个观点：在各方无法或不愿沟通的情形下，最可靠的方式就是建立起能够自行运作的协议。
  - 这个协议必须是一个纳什均衡，各方只要独自逃跑就会承受损失，因此不得不合作。
  - 2003年，华为面临前所未有的低谷期，任正非甚至计划以75亿美元的价格把华为卖给摩托罗拉，但却因为种种困难，没有最终实现。
  - 然而，也是在这最严重的低谷期，任正非摸索出一套“一种不用上市就能获得融资的方法”，开始走华为自己的“野路子”。
  - 其中，最重要的一个方式就是——通过承诺激发团队的创造活力。任正非将管理模式从上下“命令——服从”式，调整为“全员参与”式。这一政策的调整，为华为带来巨大的集体能量。
5. 理智与情绪
  - 理想状态下，只要各方能以真正理性的态度，从协商中追求自身的利益，就能为所有人找到独特的最佳方案。
  - 但人是独立复杂的个体，没有人可以做到完全的理性，所以，在合作中，情绪必须要列入我们日常计划、行动的考量之中。
  - 把快乐和其他情绪上的奖励或惩罚列入计算，看起来在某些情境中，纳什均衡就真的能将我们锁定于某些解决方案，达成合作。

## 博弈论要诀

十大效能最大化的博弈论要诀

兰·费雪教授在多年的博弈论研究中，总结出10个解决问题的策略。这些策略旨在调整合作和冲突之间微妙的平衡，值得每个人投入心力，了解其原理及如何应用。

1. **赢就守，输就变**
  - 不论先前选择合作策略或自私自利的不合作策略，只要结果出炉时你是赢家，就不要改变策略。
  - 但如果输了（常常是因为其他人和你同时选择不合作），就马上采取另一种策略。
2. 带入**新的参与者**
- 如果本来是两方对峙的局面，就让它变成三方制衡的情形。这对于合作时促成平衡的效果很有效。就算明明知道新加入的会是个不合群的家伙，也仍然可能改善整体情形。
- 另外，新的参与者也可以指“受信任的第三方”，负责管理担保物或是执行违约条款。
3. 建立**互惠形式**
  - 最重要的一种合作动机，就是知道未来还可能再次碰头，所以要试着通过直接、间接或社交网络的方式，建立起这样的情境。
4. **限制未来选项**，让自己一旦背叛合作，就会受损失
  - 这是最有效的让别人知道自己的确有合作意愿的方式之一。
  - 例如定下特殊条件，只要自己（或他人）违反合作承诺，名声就会大大受损；或采用破釜沉舟的方法，规定合作之后就不能再回头。
5. **付出信任**
  - 这是另一个让别人觉得你的承诺可信的做法。
  - 只要你真心付出信任，就能得到回报，想合作也就容易许多。
6. 定下特殊条件，双方如果想**单方面背叛**，就会承受损失
  - 当然，这就是一个纳什均衡。如果问题的合作解决方案恰巧是纳什均衡，那么问题就解决了。
7. 使用补偿给付，来建立并维持合作的**联盟**
  - 补偿给付可以是金钱，或是社交上或情感上的奖励，或干脆就是贿赂。不论是哪一种补偿方式，重点在于联盟成员如果叛逃或加入其他联盟，就会承受损失。
8. 注意**七大困境**，考量各参与者的利益与成本，让困境不复存在
  - 当然，这说来轻松，做起来困难，否则早就世界大同了。但无论如何，这是正确的努力方向，而且值得一试。
9. 分摊各种货品、责任、工作、惩罚等，让人人都觉得结果**公平**
  - “觉得公平”是很强烈的动机，因此务必保证过程透明，让结果看起来公平，人人满意。
10. 将团体**化整为零**
  - 所有证据都显示，小团体内部的成员比较容易合作，但偏偏小团体与小团体之间就不是这么一回事。小团体的领导人如果能善用上面的九点要诀，就有助于团体间的合作。
  - 人类一切的关于劳动与关系所作出的努力，都是为了获取幸福感。而幸福感的获得来自问题的真实解决。

所以，无论你是决策者还是执行者，走出“内卷化”才能真正拥有更优的未来。

