---
layout: post
title:  "知识图谱-Knowledge-Graph"
date:   2020-06-23 21:14:00
categories: 自然语言处理
tags: 深度学习 NLP KG KB-QA 知识图谱 表示学习
excerpt: 知识图谱（Knowledge Graph）发展历史，主要类型，前沿研究及应用场景等
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结


总结如下：

|方法流派|思路|示例|优点|缺点|备注|
|---|---|---|---|---|---|
|规则模板|人为设定规则模板|`AIML`语言|①简单，无须标注②稳定可控|①人力消耗大②回复单一，多样性欠缺|-|
|生成模型|用encoder-decoder结构生成回复|`Seq2Seq`、`transformer`|无须规则，自动生成|①效果不可控②万能回复（安全回复）③多样性低④一致性不足|-|
|检索模型|文本检索与排序技术从问答库中挑选合适的回复|IR|①语句通顺②可控|①不能生成回复②表面相关，难以捕捉语义信息|-|
|混合模型|综合生成和检索方案|度秘|-|-|-|


# 知识图谱

- 信息和知识两个概念：
  - 信息是指外部的客观事实。举例：这里有一瓶水，它现在是7°。
  - 知识是对外部客观规律的归纳和总结。举例：水在零度的时候会结冰。
- “客观规律的归纳和总结” 似乎有些难以实现。Quora 上有另一种经典的解读，区分 “信息” 和 “知识” 。
- 在信息的基础上，建立实体之间的联系，就行成 “知识”。当然，叫事实（Fact）更为合适。换句话说，
- 知识图谱是由一条条知识组成，每条知识表示为一个SPO三元组(Subject-Predicate-Object)。
- 知识图谱本质上是一种揭示实体之间关系的语义网络。

- 专家系统,万维网之父Tim Berners Lee于1998年提出的**语义网**（Semantic Web）和在2006年提出的**关联数据**（Linked Data）都和知识图谱有着千丝万缕的关系，可以说它们是知识图谱前身。
- “知识图谱（Knowledge Graph）”的概念是由Google公司在2012年提出的[1]，指代其用于提升搜索引擎性能的知识库。
  - Google为了提升搜索引擎返回的答案质量和用户查询的效率，于2012年5月16日发布了知识图谱(Knowledge Graph)。有知识图谱作为辅助，搜索引擎能够洞察用户查询背后的语义信息，返回更为精准、结构化的信息，更大可能地满足用户的查询需求。Google知识图谱的宣传语“things not strings”给出了知识图谱的精髓，即，不要无意义的字符串，而是获取字符串背后隐含的对象或事物。还是以罗纳尔多为例，我们想知道罗纳尔多的相关信息(很多情况下，用户的搜索意图可能也是模糊的，这里我们输入的查询为“罗纳尔多”)，在之前的版本，我们只能得到包含这个字符串的相关网页作为返回结果，然后不得不进入某些网页查找我们感兴趣的信息；现在，除了相关网页，搜索引擎还会返回一个“知识卡片”，包含了查询对象的基本信息和其相关的其他对象(C罗名字简称也为罗纳尔多，搜索引擎只是根据“罗纳尔多”的指代概率返回了“肥罗”这个罗纳尔多的基本资料，但也许你需要C罗的相关信息，那么搜索引擎把C罗这个实体作为备选项列出)，如下图红色方框中的内容。如果我们只是想知道罗纳尔多的国籍、年龄、婚姻状况、子女信息，那么我们不用再做多余的操作。在最短的时间内，我们获取了最为简洁，最为准确的信息。
  - ![](https://pic4.zhimg.com/80/v2-189394fc66ae8a53632534790ec9749b_720w.jpg)
- 知识图谱的出现是人工智能对知识需求所导致的必然结果，但其发展又得益于很多其他的研究领域，涉及专家系统、语言学、语义网、数据库，以及信息抽取等众多领域，是交叉融合的产物而非一脉相承
  - 详见：[知识图谱发展概述](https://www.cnblogs.com/jtianwen2014/p/7678616.html)

![](https://images2017.cnblogs.com/blog/706575/201710/706575-20171016200824396-1450295689.png)

- 【2020-7-12】【ACL 2020知识图谱自然语言处理进展摘要】《[Knowledge Graphs in Natural Language Processing @ ACL 2020](https://towardsdatascience.com/knowledge-graphs-in-natural-language-processing-acl-2020-ebb1f0a6e0b1)》by Michael Galkin
- 【2020-7-21】[从ACL 2020看知识图谱进展](https://www.toutiao.com/i6851461937012851214/?tt_from=mobile_qq&utm_campaign=client_share&timestamp=1595263453&app=news_article&utm_source=mobile_qq&utm_medium=toutiao_android&use_new_style=1&req_id=202007210044120100270271372C1692E4&group_id=6851461937012851214)

## 历史

- 知识图谱的发展简史
  - 上个世纪60年代Quillian提出了语义网络，作为知识表示的一种方式，用于描述物体概念与状态及其间的关系，早期主要是用来帮助自然语言理解。
  - 到上个世纪80年代，人工智能研究人员将 “本体”这一哲学概念被引入计算机领域，把本体定义为“概念和关系的形式化描述”，通俗一点讲本体类似数据库中的Schema，这一时期的一个典型应用就是专家系统。
  - 1989年Tim Berners Lee提出了万维网，也就是我们今天使用的www网络
  - 1998年从超文本网页延伸出语义网络概念，将每一个网页引入语义信息，比如：姚明这个页面，归属类别是人物、运动员。
  - 2006年提出了链接数据概念，目标将互联网上所有数据建立关联，如姚明的页面出现他妻子叶莉，会给“叶莉”加一个链接，链接到叶莉这个页面。
  - 2012年Google率先提出了知识图谱，目的是提升整个搜索效果，从此知识图谱技术开始得到广泛学习和应用。

- 
- ![](http://5b0988e595225.cdn.sohucs.com/images/20180906/2cbe3385c1b74d2895626b0070c72b44.jpeg)
  - 摘自：
    - [知识图谱在贝壳找房的从0到1实践](https://www.sohu.com/a/252223730_499730)
    - 【2020-9-16】[【知识图谱系列】开篇：基于KBQA的经纪人咨询助手](https://mp.weixin.qq.com/s?__biz=MzU3OTY2MjQ2NQ==&mid=2247485140&idx=1&sn=1d4739efa2e61f5bca6b2bf54d55ca87&chksm=fd63e13aca14682c8a4a97b30c093eb6cd5649f326e3d8875f3706a568175803d0fc642ad2aa&mpshare=1&scene=1&srcid=09164hw2hJXwSd3P2aCyZVSB&sharer_sharetime=1600234667205&sharer_shareid=2397ebcca559a9e3526dfd9d52c0256d&key=64c89714f25cba008511613fdb28eb9eec76e7ff16ef1ce851e84c38cb39e6ff776560f0a5a988ec2fd63004dc882a3f7759586fdb829f09d68df27f15a34b1dd856d2a1a2f9fb2cd3c9229a0e42e7f75aa93e8cfb790adb9ef6dd839f917abb6402cf62075855c87c616620f7d67a45c9d5ba7c3d613400428b90e868520b06&ascene=1&uin=OTY1NzE1MTYw&devicetype=Windows+10+x64&version=62090529&lang=zh_CN&exportkey=AUh00ODduFPVWprSECsaHVY%3D&pass_ticket=7mpEltFniVgVA8udzhXvGu5076WsT0d0jPX7mxvNBPPNk2qz5Sgw%2B8WUntOJuT9x&wx_header=0)
    - 【2020-7-18】[贝壳找房技术文章合集](https://mp.weixin.qq.com/mp/appmsgalbum?action=getalbum&__biz=MzU3OTY2MjQ2NQ==&scene=24&album_id=1431012302404534273&uin=&key=&devicetype=iMac+MacBookPro13%2C2+OSX+OSX+10.15.5+build(19F101)&version=12040110&lang=zh_CN&nettype=WIFI&ascene=14&fontScale=100&winzoom=1.000000)

## 定义

- 知识图谱并没有一个标准的定义(gold standard definition)。借用一下“Exploiting Linked Data and Knowledge Graphs in Large Organisations”这本书对于知识图谱的定义：
>- A knowledge graph consists of a set of interconnected typed entities and their attributes.
>- 知识图谱是由一些相互连接的实体和他们的属性构成的。

- 换句话说，知识图谱是由一条条知识组成，每条知识表示为一个SPO三元组(Subject-Predicate-Object)。
- ![](https://pic2.zhimg.com/80/v2-e3478e02c36ead3875e598b0668830fd_720w.jpg)
- 用RDF形式化地表示这种三元关系。
- **RDF**(Resource Description Framework)，即资源描述框架，是W3C制定的，用于描述实体/资源的标准数据模型。
- RDF图中一共有三种类型，International Resource Identifiers(IRIs)，blank nodes 和 literals。下面是SPO每个部分的类型约束：
  - Subject可以是IRI或blank node。
  - Predicate是IRI。
  - Object三种类型都可以。
- 解释
  - IRI我们可以看做是URI或者URL的泛化和推广，它在整个网络或者图中唯一定义了一个实体/资源，和我们的身份证号类似。
  - literal是字面量，我们可以把它看做是带有数据类型的纯文本，比如我们在第一个部分中提到的罗纳尔多原名可以表示为"Ronaldo Luís Nazário de Lima"^^xsd:string。
  - blank node简单来说就是没有IRI和literal的资源，或者说匿名资源。
- 参考：[为什么需要知识图谱？什么是知识图谱？——KG的前世今生](https://zhuanlan.zhihu.com/p/31726910)

- 定义[Wang, 2017]： 
  - 知识图谱是由`实体`和`关系`构成的`多关系图`，实体和关系分别被视为节点和不同类型的边。
> A knowledge graph is a multirelational graph composed of entities and relations which are regarded as nodes and different types of edges, respectively.
- 形式化定义： 
> A knowledge graph as G = {E, R, F}, where E, R and F are sets of entities, relations and facts, respectively. A fact is denoted as a triple (h, r, t) ∈ F。

- 知识图谱是由Google公司在2012年提出来的一个新的概念。从学术的角度，我们可以对知识图谱给一个这样的定义：“知识图谱本质上是语义网络（Semantic Network）的知识库”。但这有点抽象，所以换个角度，从实际应用的角度出发其实可以简单地把知识图谱理解成多关系图（Multi-relational Graph）。
- 那什么叫多关系图呢？ 学过数据结构的都应该知道什么是图（Graph）。图是由节点（Vertex）和边（Edge）来构成，但这些图通常只包含一种类型的节点和边。但相反，多关系图一般包含多种类型的节点和多种类型的边。比如左下图表示一个经典的图结构，右边的图则表示多关系图，因为图里包含了多种类型的节点和边。这些类型由不同的颜色来标记。
- ![](https://pic1.zhimg.com/80/v2-ac88147e6b90d5bdf6c9085ba310c308_720w.jpg)
- 知识图谱里，通常用“实体（Entity）”来表达图里的节点、用“关系（Relation）”来表达图里的“边”。实体指的是现实世界中的事物比如人、地名、概念、药物、公司等，关系则用来表达不同实体之间的某种联系，比如人-“居住在”-北京、张三和李四是“朋友”、逻辑回归是深度学习的“先导知识”等等。
- 实体和关系也会拥有各自的属性，比如人可以有“姓名”和“年龄”。当一个知识图谱拥有属性时，可以用属性图（Property Graph）来表示。
  - 李明和李飞是父子关系，并且李明拥有一个138开头的电话号，这个电话号开通时间是2018年，其中2018年就可以作为关系的属性。类似的，李明本人也带有一些属性值比如年龄为25岁、职位是总经理等。
  - ![](https://pic3.zhimg.com/80/v2-2f39910c39b41f154c413c4c476bbb2a_720w.jpg)
- 除了**属性图**，知识图谱也可以用**RDF**来表示，由很多的三元组（Triples）来组成。
  - RDF在设计上的主要特点是易于发布和分享数据，但不支持实体或关系拥有属性，如果非要加上属性，则在设计上需要做一些修改。
  - 目前来看，RDF主要还是用于学术的场景，在工业界我们更多的还是采用图数据库（比如用来存储属性图）的方式。

- 摘自：[戴帅湘：NLP的发展和应用](https://mp.weixin.qq.com/s?__biz=MzIyNTk1OTY5NQ==&mid=2247483751&idx=1&sn=e8af45990756375f8f3bb42e841a0e91&chksm=e8768b07df0102116fd449b4e685086b25922a6a9436fe5f05490a152fa579ecf9bb05db81cf&mpshare=1&scene=23&srcid=&sharer_sharetime=1593153276858&sharer_shareid=b8d409494a5439418f4a89712efcd92a#rd)

- 知识图谱旨在描述真实世界中存在的各种实体或概念及其间的关联关系。
  - 首先，每一个实体用全局唯一ID来标识，就如同每个人都有一个自己的身份证号；
  - 其次就是用属性-值对来刻画实体的内在特性，用关系来刻画实体之间的关联。
  - 如刻画姚明这个实体：属性-值<姚明+身高+2.26米>，关系型<姚明+妻子+叶莉>。

![](http://5b0988e595225.cdn.sohucs.com/images/20180906/74e9cf11143945ad88032e4c97e26e47.jpeg)


## 应用

- 知识图谱应用场景分为两种，一种是通用领域，一种是垂直领域
  - 通用领域如Google搜索，国内百度和搜狗也有在搜索中应用知识图谱技术；还有些智能硬件应用，如智能机器人、智能手表。这种应用也会用到通用知识图谱，构建依赖国外维基百科、freebase，还有国内百度百科、维基百科、互动百科、搜狗百科等，从这些页面中抽取出结构化三元组构建知识图谱来支撑通用领域的问答和搜索。
  - 垂直领域应用越来越多，如金融、电商、公共安全、电信等，具体如金融里面的反欺诈，公共安全领域的追捕犯罪分子。

![](http://5b0988e595225.cdn.sohucs.com/images/20180906/ada176a7e37a45c3989aba8dd372ad54.jpeg)


## 技术架构

- 1. `知识表示` 
  - 在知识库中，用RDF表示，是一个`三元组`(triple)模型，即每个知识可被分解为`主` (subject)、`谓`(predicate)、`宾`(object)； 
- 2. `知识表示学习`(Knowledge Representation Learning，KRL) 
  - 2.1 定义：表示学习旨在将三元组语义信息表示为<font color='blue'>稠密低维实值向量</font>，知识表示学习则面向知识库中的实体和关系进行表示学习 
  - 2.2 意义：知识表示是知识获取与应用的基础；知识表示学习得到的分布式表示有以下典型应用 
    - **实体相似度计算**，如实体链接(Entity Linking，EL) 
    - **知识图谱补全**(Knowledge Graph Completion，KGC) 
    - 其他，如**关系抽取**，**自动问答**等 
  - 2.3 目标：将知识图谱编码到向量空间：(subject, predicate, object) => (head, relation, tail) 
  - 2.3 现状：在学术界研究方向和趋势详细阐述

- 知识图谱涉及的NLP技术
  - a. 实体命名识别（Name Entity Recognition）
    - 从文本里提取出实体并对每个实体做分类/打标签：比如从上述文本里，我们可以提取出实体-“NYC”，并标记实体类型为 “Location”；也可以从中提取出“Virgil's BBQ”，并标记实体类型为“Restarant”。
    - NER技术相对成熟
  - b. 关系抽取（Relation Extraction）
    - 把实体间的关系从文本中提取出来，比如实体“hotel”和“Hilton property”之间的关系为“in”；“hotel”和“Time Square”的关系为“near”等等。
  - c. 实体统一（Entity Resolution）
    - 在实体命名识别和关系抽取过程中，有两个比较棘手的问题：一个是实体统一，也就是说有些实体写法上不一样，但其实是指向同一个实体。
    - 比如“NYC”和“New York”表面上是不同的字符串，但其实指的都是纽约这个城市，需要合并。实体统一不仅可以减少实体的种类，也可以降低图谱的稀疏性（Sparsity）；
  - d. 指代消解（Coreference Resolution）
    - 另一个问题是指代消解，也是文本中出现的“it”, “he”, “she”这些词到底指向哪个实体，比如在本文里两个被标记出来的“it”都指向“hotel”这个实体。
    - ![](https://pic2.zhimg.com/80/v2-df3f5c0cdd741c9f4d87fd80069ab711_720w.jpg)
- 示例
  - ![](https://pic2.zhimg.com/80/v2-7d172d9e812b6057e25156b2695ee4b1_720w.jpg)

## 知识抽取

- 知识图谱的构建是后续应用的基础，而且构建的前提是需要把数据从不同的数据源中抽取出来。对于垂直领域的知识图谱来说，它们的数据源主要来自两种渠道：
  - 一种是业务本身的数据，这部分数据通常包含在公司内的数据库表并以结构化的方式存储；
  - 另一种是网络上公开、抓取的数据，这些数据通常是以网页的形式存在所以是非结构化的数据。
- 信息抽取的难点在于处理非结构化数据。
- 非结构化（纯文本）知识抽取分三个任务： 
- 1. `实体提取`(Entity Discovery) 
  - 细分任务分为：
    - `实体识别`(Entity Recognition)
    - `实体消歧`(Entity Disambiguation)
    - `实体分类`(Entity Typing)
    - `实体对齐`(Entity Alignment)
- 2. `关系提取`(Relation Extraction) 
  - 2.1 定义：关系抽取是从非结构化数据中抽取未知关系事实并将其加入到知识图谱中，是自动构建大规模知识图谱的关键 
  - 2.2 方法：传统的方法高度依赖于特征工程。由于缺乏标记的关系数据，使用启发式匹配来创建训练数据，利用文本特征(包括词汇和句法特征、命名实体标记和连接特征)对关系分类进行远程监控。目前最新研究以深度学习工具实现关系提取。
- 3. `知识补全`(KGC) 
  - 3.1 基于知识图谱不完备性的特点，提出了一种新的知识图谱三元组生成方法。即，给定一个不完整的知识图谱 G=(E, R, F)，知识图谱补全旨在推理出缺失的三元组 T={(head, relation, tail) \| (head, relation, tail) ∉ F} 。
  - 3.2 典型的子任务包括：
    - `链路预测`(Link Prediction)
    - `实体预测`(Entity Prediction)
    - `关系预测`(Relation Prediction) 
  - 3.3 方法：
    - `基于Embedding`(Embedding-based Models)
    - `关系路径推理`(Relation Path Reasoning)
    - `基于规则的推理`(RL-based Path Finding)

# 表示学习

## 基础知识

- 【2016-1-19】[刘知远：面向大规模知识图谱的表示学习技术](http://www.cbdio.com/BigData/2016-03/03/content_4675344.htm)，讲座解析
  - ![](http://www.cbdio.com/image/attachement/jpg/site2/20160303/94de80684e4418423b2e30.jpg)
  - ![](http://www.cbdio.com/image/attachement/jpg/site2/20160303/94de80684e4418423b6406.jpg)
  - ![](http://www.cbdio.com/image/attachement/jpg/site2/20160303/94de80684e4418423bdd06.jpg)
  - ![](http://www.cbdio.com/image/attachement/jpg/site2/20160303/94de80684e4418423c221a.jpg)
  - ![](http://www.cbdio.com/image/attachement/jpg/site2/20160303/94de80684e4418423c361c.jpg)
  - TransH和TransR均为TransE代表扩展模型之一，其中TransH由MSRA研究者提出，TransR由清华实验室提出。
    - TransE在实体预测任务能够达到47.1的准确率，而采用TransH和TransR，特别是TransR可以达到20%的提升。
  - [基于 TransE TransH TransR和PTransE的知识图](https://www.helplib.cn/fansisi/KB2E)，[KB2E](https://www.github.com/thunlp/KB2E)代码实现，[图嵌入的Translate模型汇总（TransE，TransH，TransR，TransD）](https://www.toutiao.com/i6844713516557926916/?tt_from=mobile_qq&utm_campaign=client_share&timestamp=1593739790&app=news_article&utm_source=mobile_qq&utm_medium=toutiao_android&use_new_style=1&req_id=202007030929500100260772033571AA0D&group_id=6844713516557926916)

- 【2020-7-26】斯坦福知识图谱多跳推理，[Multi-Hop Knowledge Graph Reasoning with Deep Reinforcement Learning](https://web.stanford.edu/class/cs520/abstracts/socher.pdf)


## 关系推理

- 简单问答只需要识别出问题中的实体和关系，链接到知识图谱中，即可查出答案。
- 推理问答则要求计算机具备多种推理能力，具体包括：
  - （1）处理多跳关系的能力，如“姚明的妻子的学校”；
  - （2）数值比较的能力，如“哪个城市的人口更多”；
  - （3）集合操作的能力，如“即是篮球运动员，又是球队老板的人有哪些”。
- 知识图谱推理问答主流方法大致分为4大类别
  - 键值记忆网络（KVMemNet）
  - 基于强化学习的多跳路径搜索
  - 弱监督的程序学习
  - 查询图解析与匹配
- 资料
  - [知识图谱推理问答：如何让机器像人类一样学会推理](https://www.toutiao.com/i6842470279516520972/)

- 基于知识图谱的关系推理的相关工作，大体分为三种方法：
  - 首先是统计关系学习方法（SRL），如马尔科夫逻辑网络、贝叶斯网络，但这类方发需要设计相应的规则，因此没有很好的扩展性和泛化性；
  - 嵌入式表示的方法，旨在将实体和关系映射为空间中的向量，通过空间中向量的运算来进行推理（如TransE），该方法取得了较好的准确率，但分布式表示的解释性不强，另外，较难实现并行计算；
  - 基于关系路径特征的随机游走模型，该方法可以进行并行计算，具有较好的执行效率，但准确率与召回率相比嵌入式表示学习的方法存在劣势。

### 推理数据集

- 4个常用推理问答数据集，并从所用知识库、知识类型、问题数量、自然语言、SPARQL共5个角度加以对比。
  - 三种知识类型：
    - ①关系型，如（“姚明”，“出生于”，“上海”）；
    - ②属性型，如（“姚明”，“身高”，“ 229 厘米”）；
    - ③事实型，用于表示一个关系型事实或属性型事实的知识，如[（“上海”，“人口”，“23,390,000”），“统计时间”，“2016”]。
    - ![](http://p1-tt.byteimg.com/large/pgc-image/bfbadfacd0cf40dba276f6a3e0c70f33?from=pc)
    - 在提到的4个数据集中，MetaQA 和 CSQA 仅考虑关系型知识。
  - 现有数据集存在一个共同的问题，都缺乏推理过程，只给出复杂的问题以及对应的答案，没有问题解答过程。
  - 清华大学知识工程实验室构造了一个新的数据集——KQA Pro，可提供之前数据集都不具备的推理过程。
    - ![](http://p3-tt.byteimg.com/large/pgc-image/cb3ae03cd46d4a8db6ebbb1375275293?from=pc)
  - 为表示推理过程，KQA Pro引入函数（function）和程序（program）两个概念。函数对应简单问题，程序对应复杂问题，将简单的函数组合成复杂的程序，从而解决复杂问题。
    - ![](http://p6-tt.byteimg.com/large/pgc-image/08a168a57ec644268e16264598f910aa?from=pc)

## 常识推理

- [“原子”因果常识图谱](https://www.hankcs.com/nlp/corpus/atomic-commonsense-knowledge-graph.html)
  - AAAI 19的论文(Sap et al. (2019))开源了一个包含87万条推理常识的知识图谱ATOMIC。相较于常见的基于本体论分类条目的知识图谱，该知识库专注于“如果…那么…”关系的知识。作者提出了9种类型的因果联系来区分**原因-效果**、**主体-主题**、**自愿-非自愿**、**行动-心理状态**。通过生成式训练，作者发现神经网络模型可以从该图谱中获取简单的常识推理能力。
  - 另外，该团队在ACL 19上的论文COMET则利用了该图谱训练GPT模型，该GPT模型又反过来生成了许多全新的且合理的知识，达到了图谱补全的效果。
  - ![](https://wx1.sinaimg.cn/large/006Fmjmcly1g91wq3pvxkj30u012lh1q.jpg)

## 问题思考

- 目前已有的知识表示学习方法无法实现精确链接预测，有两个原因导致了这一现象的出现：
  - ill-posed algebraic problem：一个方程组中的方程式个数远大于变量个数
    - 解法：**流形函数**, M(h,r,t)=D2r用来代替$h_r+r=t_r$，应用Reproducing Kernel Hilbert Space (RKHS)映射到Hilbert空间，以更高效地表征流形
      - ![](https://images2015.cnblogs.com/blog/706575/201706/706575-20170619113807148-873845996.png)
  - adopting an overstrict geometric form。应用于h+r=t，所得到的尾实体几乎是一个点，这对于多对多关系而言显然是不正确的

- 摘自：知识图谱表示学习与关系推理（2016-2017）：[（一）](https://www.cnblogs.com/jtianwen2014/p/7000190.html)，[（二）](https://www.cnblogs.com/jtianwen2014/p/7008228.html)，[（三）](https://www.cnblogs.com/jtianwen2014/p/7018872.html)，[ACL2016信息抽取与知识图谱相关论文掠影](https://www.cnblogs.com/jtianwen2014/p/6985214.html)


## 知识图谱嵌入(KGE)

- [知识图谱嵌入(KGE)：方法和应用的综述](https://zhuanlan.zhihu.com/p/83026306)，参考《Knowledge Graph Embedding: A Survey of Approaches and Applications》和刘知远的《知识表示学习的研究与进展》做的总结

![](https://pic4.zhimg.com/80/v2-8248f2e0ece454bd036b3ab97dc30b77_720w.jpg)



# 事理图谱-Event Graph

- [白硕：事理图谱六问六答 ](https://www.sohu.com/a/330151320_657157)
  - 知识图谱，主要表示的是关于实体的知识，发展得比较丰富的还是围绕实体、关系、属性的各种表示、演化和推理技术。
  - 哈工大事理图谱1.0版用的是“Event Evolution Graph”，2.0版用的是“Event Logic Graph”，国外同领域文献用得比较多的是“Event Graph”。
- 一、**事理图谱是研究“事理”的学问吗？**
  - “事理图谱”不研究事理的内容，只研究事理“长什么样”，可以说是关于事理的形式化、数字化表示、演化和推理的学问。
- 二、**事理图谱和事件图谱是什么关系？**
  - 事件图谱是不含本体的事理图谱，是事理图谱的初级阶段。对事件实例的抽取和预测，是事件图谱的基本任务。
  - 事件图谱走向事理图谱又是一个学科方向的内在逻辑不断推动和一些应用领域的知识图谱落地需求不断倒逼的综合作用结果。
- 三、**事理图谱的本体层需要什么样的架构来支持？**
  - 事理图谱有本体层，这是个最重要的结论。事件之间、事件和实体之间不仅有横向的由此及彼的关联，还有纵向的由特殊到一般/由一般到特殊的关联。
    - 横向关联：由此及彼，是漫游、是联想、是类比
    - 纵向关联：一般<-->特殊，是归纳、是演绎、是演化。
  - 四象限架构
    - 抽象实体、具体实体、抽象事件、具体事件这四块内容，物理上是联通的，是一张图，逻辑上则可以左右划分为实体域和事件域，上下可以划分为本体域和实例域，形成所谓“四象限”架构
    - ![](http://5b0988e595225.cdn.sohucs.com/images/20190729/8441ff086e204877a5e6e009504a417c.png)
- 四、**事理图谱和实体图谱是什么关系？**
  - 事理图谱是在知识图谱总框架下，知识表示对象从实体、关系、属性向事件的顺理成章的延伸。当然，随着延伸，也自然而然产生了“四象限”的架构，以及由这种架构带来的丰富得多的计算、演化和推理模式。
  - 事理图谱也和实体图谱一样，受到知识图谱构建所遵循的一般规律特别是一般性方法论原则的约束。
- 五、**事理图谱和NLP如何对接？**
  - 事理图谱是对谓词性成分语义进行表示的技术体系，因此事理图谱的研究和NLP有着天然的紧密联系。
  - 事理图谱向左，可以“脑补”一般分析器做不到的精准解析结果，如指代消解
  - 事理图谱向右，可以“补脑”语义落地所缺失的环节，扫除一旦精准NLP得以实现之后通向应用场景的各种障碍
- 六、**事理图谱适合在哪些应用场景落地？**
  - 有些应用场景，只要实体域的两个象限就很好了，完全不需要引入事件域这两个象限。如，教育领域。
  - 金融、情报、法律、医疗，是事理图谱应用的“重仓”

![](http://5b0988e595225.cdn.sohucs.com/images/20190729/ef48f3a4c2ea4b36a1f3ba5f7b10e272.jpeg)


# KB-QA

- KBQA(Knowledge Base Question Answering)，是基于知识库的问答系统，本质上KBQA系统反映一个简化的“问答-答案”的映射过程，需要对自然语言语义解析与理解后，进行结构化查询与推理，得出相应的答案。
- ![](https://pic2.zhimg.com/80/v2-2699f1e6d3dd51c7c86cbb9cf0e58af9_720w.jpg)
- ![](https://pic2.zhimg.com/80/v2-49c7910b5ffa6a492249f49d5af26269_720w.jpg)

- KB-QA与对话系统
  - 问答系统是信息检索系统的高级形式，是以问题为驱动的信息获取过程，按QA类别可以分为WebQA（Web问答）、KBQA（知识库问答）、CQA（社区问答）和DBQA（阅读理解的QA系统，斯坦福的SQuAD），而对话系统主要关注对话过程，多采用多轮方式进行，主要分为开放闲聊的对话系统、任务驱动的对话系统、以知识获取的对话系统和信息推荐的对话系统，传统的对话系统主要由四个部分：NLU（自然语言生成）、DST（对话状态追溯）、PL（策略学习）和NLG（自然语言生成），目前，采用是端对端检索式与生成式的，但是精度较低。
  - KBQA主要通过对自然语言进行语义解析与理解后，查询知识库，进行某一类事实问题进行回答（简单的BFQ或者复杂多跳转问题），答案是某一种实体或者实体的属性或者关系，而对话系统，句子级的对话，注重对话过程，回答的问题是一般是句子而不是简单的答案，类似人对话聊天。对话系统也可以结合知识库进行更加全面句子级答案生成（知识获取的对话系统）。
- KBQA系统实现有哪些方法？
  - （1）基于语义解析的方法
    - 将自然语言转换为一系列形式化的逻辑表达式，利用知识库中语义信息将逻辑表达式转为知识库查询，最终得到相应的答案。
    - ![](https://pic3.zhimg.com/80/v2-b9f896cccd14c52c95b7278e9f081ade_720w.jpg)
  - （2）基于模板匹配的方法
    - 基于模板匹配的方法是通过预制模板匹配问题，代替本体映射，绕过语义解析脆弱性，一般使用该方法与结合语义解析+模板匹配查询的方法来解决工业界的问题，如基于模板匹配的查询语言章节讲的，但是此方法需要人工构建大量模板，只能解决简答的事实类型的问答
    - ![](https://pic1.zhimg.com/80/v2-951e8b05200c6f940ab6aa981214f100_720w.jpg)
  - （3）基于深度学习优化模板匹配的方法
    - 深度学习主要用来改进问答系统的流程，包括语义解析、实体识别、意图识别与分类和实体链接与消歧等，这类的算法很多，比如对于实体识别的LSTM+CRF、基于深度学习及概率图的实体消歧等，另一方，采用深度学习对问答对进行训练得到大量的模板,便于问题与知识库匹配

- 分类：
  - IRQA
  - KBQA
  - MRCQA
- 常用数据集
  - **NLPCC**全称自然语言处理与中文计算会议（The Conference on Natural Language Processing and Chinese Computing）,它是由中国计算机学会（CCF）主办的 CCF 中文信息技术专业委员会年度学术会议，专注于自然语言处理及中文计算领域的学术和应用创新。
  - 数据集来自NLPCC ICCPOL 2016 KBQA 任务集，其包含 14 609 个问答对的训练集和包含 9 870 个问答对的测试集。 并提供一个知识库，包含 6 502 738 个实体、 587 875 个属性以及 43 063 796 个 三元组。知识库文件中每行存储一个事实( fact) ，即三元组 ( 实体、属性、属性值) 。
- [基于BERT的KBQA探索](https://zhuanlan.zhihu.com/p/62946533), 基于知识图谱的自动问答拆分为2 个主要步骤:命名实体识别步骤和属性映射步骤
  - 命名实体识别步骤，采用BERT+BiLSTM+CRF方法（另外加上一些规则映射，可以提高覆盖度）
  - 属性映射步骤，转换成文本相似度问题，采用BERT作二分类训练模型
  - ![](https://pic4.zhimg.com/80/v2-782cfa7747c02d70ebb7fb542b574f8b_720w.jpg)

- 【2020-4-22】[KB-QA研究进展](https://www.jianshu.com/p/92ea00b7a4cc)
- ![](https://upload-images.jianshu.io/upload_images/9298309-c4a3c66f7965460e.png)

- [ACL2020 | 基于Knowledge Embedding的多跳知识图谱问答](https://zhuanlan.zhihu.com/p/149141891)
- KGQA 方法称为 EmbedKGQA。其中包含三个关键模块。
  - KG 嵌入模块：为 KG 中所有实体构建嵌入。
  - 问题嵌入模块：为问题找到嵌入。
  - 答案选择模块：减小候选答案实体的集合，并选择最终的答案。

![](https://pic2.zhimg.com/80/v2-3dd2d09867f7a5dc072a36f113fc9121_720w.jpg)

## 资料

- 参考：
  - [刘康-基于深度学习的知识库问答研究进展](https://wenku.baidu.com/view/d0d2ff717ed5360cba1aa8114431b90d6c858925.html)
  - [知识图谱-基于ES(ElasticSearch)和gAnswer构建智能问答系统](https://zhuanlan.zhihu.com/p/91294301)
  - KBQA论文集[Awesome-knowledge-graph-question-answering](https://github.com/BshoterJ/awesome-kgqa)
- [针对复杂问题的知识图谱问答(KBQA)最新进展](https://blog.csdn.net/sdu_hao/article/details/105674327)

- 知识图谱问答（KBQA）利用图谱丰富的语义关联信息，能够深入理解用户问题并给出答案，近年来吸引了学术界和工业界的广泛关注。KBQA 主要任务是将自然语言问题（NLQ）通过不同方法映射到结构化的查询，并在知识图谱中获取答案。

- 小蜜团队研发的知识图谱问答系统（KBQA）目前已广泛应用于电信运营商、保险、税务等领域，但是在真实的客服场景中，KBQA 在处理复杂问句上仍然面临着挑战。

- 用户在咨询问题时，倾向于表达非常具体的信息，以便快速的获得答案，比较常见问句类型的有：
  - 1）复杂条件句：“小规模纳税人季度销售额未超过 30 万，但是要开具 5 万元的专票，需要缴纳附加税费吗？”；
  - 2）并列句：“介绍下移动大流量和畅享套餐”；
  - 3）推理型问句：“你们这最便宜的 5G 套餐是哪个？”等，

# 知识图谱存储

## 知识图谱存储方式

- 知识图谱的两种存储方式
  - 一种是基于RDF的存储；
  - 另一种是基于图数据库的存储。
- 图数据库仍然是增长最快的存储系统。相反，关系型数据库的增长基本保持在一个稳定的水平。
- RDF一个重要的设计原则是数据的易发布以及共享，图数据库则把重点放在了高效的图查询和搜索上。其次，RDF以三元组的方式来存储数据而且不包含属性信息，但图数据库一般以属性图为基本的表示形式，所以实体和关系可以包含属性，这就意味着更容易表达现实的业务场景。
  - ![](https://pic1.zhimg.com/80/v2-c5c1aa508f3583cf659479a60fc37d30_720w.jpg)

## 图数据库

- 现有图数据库对比
  - ![](https://pic4.zhimg.com/80/v2-2d99d2a221bbe2b8be179140e88efb33_720w.jpg)
- 其中Neo4j系统目前仍是使用率最高的图数据库，它拥有活跃的社区，而且系统本身的查询效率高，但唯一的不足就是不支持准分布式。
- 相反，OrientDB和JanusGraph（原Titan）支持分布式，但这些系统相对较新，社区不如Neo4j活跃，这也就意味着使用过程当中不可避免地会遇到一些刺手的问题。如果选择使用RDF的存储系统，Jena或许一个比较不错的选择。
  - 摘自：[知识图谱的技术与应用（18版）](https://zhuanlan.zhihu.com/p/38056557)


- [越来越火的图数据库究竟是什么？](https://www.cnblogs.com/mantoudev/p/10414495.html)

> 随着社交、电商、金融、零售、物联网等行业的快速发展，现实社会织起了了一张庞大而复杂的关系网，传统数据库很难处理关系运算。大数据行业需要处理的数据之间的关系随数据量呈几何级数增长，亟需一种支持海量复杂数据关系运算的数据库，`图数据库`应运而生。

世界上很多著名的公司都在使用图数据库。比如：
- 社交领域：Facebook, Twitter，Linkedin用它来管理社交关系，实现好友推荐
- 零售领域：eBay，沃尔玛使用它实现商品实时推荐，给买家更好的购物体验
- 金融领域：摩根大通，花旗和瑞银等银行在用图数据库做风控处理
- 汽车制造领域：沃尔沃，戴姆勒和丰田等顶级汽车制造商依靠图数据库推动创新制造解决方案
- 电信领域：Verizon, Orange和AT&T 等电信公司依靠图数据库来管理网络，控制访问并支持客户360
- 酒店领域：万豪和雅高酒店等顶级酒店公司依使用图数据库来管理复杂且快速变化的库存

## 关系型数据库

- 关系型数据库实际上是不擅长处理关系的
  - 关系型数据库
    - ![](https://s3.amazonaws.com/dev.assets.neo4j.com/wp-content/uploads/20180716185458/relational-database-rdbms-model-example.jpg)
  - 图数据库
    - ![](https://s2.ax1x.com/2019/02/21/kR4tKg.md.png)
- 在数据关系中心，图形数据库在查询速度方面非常高效，即使对于深度和复杂的查询也是如此。在《Neo4j in Action》这本书中，作者在关系型数据库
和图数据库(Neo4j)之间进行了实验。
  - 在深度为2时（即朋友的朋友），两种数据库性能相差不是很明显；
  - 深度为3时(即朋友的朋友的朋友)，很明显，关系型数据库的响应时间30s，已经变得不可接受了；
  - 深度到4时，关系数据库需要近半个小时才能返回结果，使其无法应用于在线系统；
  - 深度到5时，关系型数据库已经无法完成查询。而对于图数据库Neo4J，深度从3到5，其响应时间均在3秒以内。
- 可以看出，对于图数据库来说，数据量越大，越复杂的关联查询，约有利于体现其优势。从深度为4/5的查询结果我们可以看出，图数据库返回了整个社交网络一半以上的人数。

## NoSQL数据库

大致可以分为四类：
- 键值(key/value)数据库
- 列存储数据库
- 文档型数据库
- 图数据库

![](https://s3.amazonaws.com/dev.assets.neo4j.com/wp-content/uploads/20181025032156/nosql-databases-overview.png)

- 表格对比

| 分类 |	数据模型 |	优势 |	劣势	| 举例 |
|---|---|---|---|---|
|键值数据库	|哈希表	|查找速度快	|数据无结构化，通常只被当作字符串或者二进制数据|	Redis|
|列存储数据库|	列式数据存储|	查找速度快；支持分布横向扩展；数据压缩率高|	功能相对受限|	HBase|
|文档型数据库	|键值对扩展	|数据结构要求不严格；表结构可变；不需要预先定义表结构	|查询性能不高，缺乏统一的查询语法|	MongoDB|
|图数据库|	节点和关系组成的图|	利用图结构相关算法(最短路径、节点度关系查找等)|	可能需要对整个图做计算，不利于图数据分布存储|	Neo4j、JanusGraph|

## 什么是图数据库？

- 图数据库(Graph database)并非指存储图片的数据库，而是以图这种数据结构存储和查询数据。
- 图形数据库是一种在线数据库管理系统，具有处理图形数据模型的创建，读取，更新和删除（CRUD）操作。
- 与其他数据库不同，关系在图数据库中占首要地位。这意味着应用程序不必使用外键或带外处理（如MapReduce）来推断数据连接。
- 与关系数据库或其他NoSQL数据库相比，图数据库的数据模型也更加简单，更具表现力。
- 图形数据库是为与事务（OLTP）系统一起使用而构建的，并且在设计时考虑了事务完整性和操作可用性。

两个重要属性
- 根据存储和处理模型不同，市面上图数据库也有一些区分。
- 比如：
  - Neo4J就是属于原生图数据库，它使用的后端存储是专门为Neo4J这种图数据库定制和优化的，理论上说能更有利于发挥图数据库的性能。
  - 而JanusGraph不是原生图数据库，而将数据存储在其他系统上，比如Hbase。

- ① 图存储
  - 一些图数据库使用原生图存储，这类存储是经过优化的，并且是专门为了存储和管理图而设计的。并不是所有图数据库都是使用原生图存储，也有一些图数据库将图数据序列化，然后保存到关系型数据库或者面向对象数据库，或其他通用数据存储中。
- ② 图处理引擎
  - 原生图处理（也称为无索引邻接）是处理图数据的最有效方法，因为连接的节点在数据库中物理地指向彼此。非本机图处理使用其他方法来处理CRUD操作。

## jupyter配套的图查询语言

- 【2020-12-04】[Graph Notebook: easily query and visualize graphs](https://github.com/aws/graph-notebook)
  - ![](https://github.com/aws/graph-notebook/raw/main/images/GremlinQueryGraph.png)

Instructions for connecting to the following graph databases:

|             Endpoint            |       Graph model       |   Query language    |
| :-----------------------------: | :---------------------: | :-----------------: | 
|[Gremlin Server](#gremlin-server)|     property graph      |       Gremlin       |
|    [Blazegraph](#blazegraph)    |            RDF          |       SPARQL        |
|[Amazon Neptune](#amazon-neptune)|  property graph or RDF  |  Gremlin or SPARQL  |


## Neo4j

- [Neo4J](https://neo4j.com/download/)是由Java实现的开源图数据库。自2003年开始开发，直到2007年正式发布第一版，并托管于GitHub上。在线[demo](http://console.neo4j.org/)
  - 安装：先装[java](https://www.oracle.com/java/technologies/javase-jdk15-downloads.html), open JDK[清华源下载](https://mirror.tuna.tsinghua.edu.cn/AdoptOpenJDK/15/jdk/x64/linux/)
  - 配置环境变量：vim /etc/profile
    - export JAVA_HOME=/usr/local/src/jdk1.8.0_171 （根据自己的完整路径修改）
    - export PATH=$PATH:$JAVA_HOME/bin:$JAVA_HOME/jre/bin:$PATH
    - export CLASSPATH=.:$JAVA_HOME/lib:$JAVA_HOME/jre/lib
  - 查看版本：java -version
- Neo4J支持ACID，集群、备份和故障转移。目前Neo4J最新版本为3.5，分为社区版和企业版，社区版只支持单机部署，功能受限。企业版支持主从复制和读写分离，包含可视化管理工具。

- 标记属性图模型
  - 节点
  - 关系
  - 属性
  - 标签
- ![](https://s3.amazonaws.com/dev.assets.neo4j.com/wp-content/uploads/20170731095054/Property-Graph-Concepts-Simple.svg)
- 代码

```python
# coding: utf-8
"""
    Neo4j的python接口测试
    参考:https://blog.csdn.net/macb007/article/details/79044460
    时间：2018-4-23, wangqiwen
"""
#import random
import json
from py2neo import Graph #pylint:disable=import-error
#from py2neo import Graph, Node, Relationship
import numpy as np
import pandas as pd
 
def main():#pylint:disable=too-many-statements,too-many-branches,too-many-locals
    """
        测试示例,http://10.84.129.206:8090/browser/
    """
    data_file = '../../../bot/graph.xlsx'
    data = {}
    #实体、关系、相似词
    sheet_list = ['entities', 'relations', 'sim', 'freq']
    for sheet in sheet_list:
        data[sheet] = pd.read_excel(open(data_file, 'rb'), sheetname=sheet)
    #print data['sim']
    #初始化
    host = '10.84.129.206'
    host = 'localhost'
    host = '172.23.201.167'
    graph = Graph("http://%s:8090"%(host), username="neo4j", password="wqw")
    #graph = Graph("http://localhost:7474", username="neo4j", password="neo4j")
    #(1)创建实体
    cur_data_list = data['entities'].values.tolist()
    #唯一约束(name唯一)
    cql_delete = 'MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r'#删除所有节点和关系
    graph.run(cql_delete)
    #print(cur_data_list)
    for entity in cur_data_list:
        print json.dumps(entity, ensure_ascii=False)
        cql_create = 'MERGE (n:%s {name:"%s",type:"%s"})'%(entity[1], entity[0], entity[1])
        graph.run(cql_create)
        #print u'执行命令:%s'%(cql)
    for label in ['noun', 'verb', 'status', 'event']:
        cql = 'CREATE CONSTRAINT ON (n:%s) ASSERT n.name IS UNIQUE'%(label)
        graph.run(cql)
    #(2)相似词(synonym)
    cur_data_list = data['sim'].values.tolist()
    #match (a:Person),(b:Person) where a.name="zhangs" and b.name="lisi"  create (a)-[r:RELTYPE]->(b)#pylint:disable=line-too-long
    #match (charlie:Person {name:"Charlie"}),(wall:Movie {title:"Wall"}) merge (charlie)-[r:ACTED_AT]->(wall)  return r;#pylint:disable=line-too-long
    for sim in cur_data_list:
        #[住校 注销]
        if len(sim) < 2 or sim[0] == sim[1]:
            print u'格式异常(长度不足2或者两个实体相同):%s'%(json.dumps(sim, ensure_ascii=False))
            continue
        #同义词对中关键词不存在就创建
        for node in sim[:2]:
            cql = 'MATCH (n {name:"%s"}) RETURN n'%(node)
            result = graph.data(cql)
            if not result:
                #cql_create = 'MERGE (n {name:"%s"}) ON CREATE SET n.type=%s,n.name=%s'%(node, 'null', node)
                cql_create = 'MERGE (m:%s {name:"%s",type:"%s"})'%('null', node, 'null')
            graph.run(cql_create)
        #创建同义词关系
        cql = 'MATCH (a {name:"%s"}), (b {name:"%s"}) MERGE (a)-[r:synonym]->(b)'%(sim[0], sim[1])
        #cql = 'MERGE (a {name:"%s"}), (b {name:"%s"}) ON CREATE SET () ON MATCH SET (a)-[r:synonym]->(b)'%(sim[0], sim[1])
        graph.run(cql)
        print cql
    #exit(1)
    #(3)创建关系(关键词连接到标准词再插入关系)
    cur_data_list = data['relations'].values.tolist()
    #MATCH (a:noun {name:"服务分"}),(b:status {name:"下降"}) MERGE (a)-[r:can {is_problem:True,weight:0.23}]->(b)
    for rel in cur_data_list:
        print json.dumps(rel, ensure_ascii=False)
        if len(rel) < 3 or rel[0] == rel[1] or rel[2] == 'synonym':
            print u'格式异常(长度不足3或者两个实体相同/相近):%s'%(json.dumps(rel, ensure_ascii=False))
            continue
        is_pro = False
        if rel[3] is not np.nan:
            is_pro = True
        weight = 0
        if rel[5] is not np.nan:
            weight = rel[5]
        #is_problem属性不一定有效
        #逐个判断是否存在同义词
        for i, k in enumerate(rel[0:2]):
            cql_replace = 'MATCH (a {name:"%s" } )-[:synonym]->(a1) RETURN a1.name as new'%(k)
            result = graph.data(cql_replace)
            #print 'CQL: %s , %s'%(cql_replace, json.dumps(result))
            if result:
                rel[i] = result[0]['new']
        #match (a {name:'账户'})-[r:synonym]->(b)  with b
        cql = 'MATCH (a { name:"%s" }),(b { name:"%s" }) \
               MERGE (a)-[r:%s { %s:%s, weight:%s }]->(b)'%(rel[0], rel[1], rel[2], rel[3], is_pro, weight)
        #if np.isnan(rel[3]):
        if rel[3] is np.nan:
            #print u'===> 替换:%s(%s),%s(%s),%s'%(rel[3],type(rel[3]),np.nan,type(np.nan),is_pro)
            cql = cql.replace('%s:%s, '%(rel[3], is_pro), '')
        print cql
        graph.run(cql)
    #(4)词频信息
    cur_data_list = data['freq'].values.tolist()
    #merge (keanu:Person {name:"Keanu"}) on create set keanu.created=timestamp() on match set keanu.lastSeen=timestamp() return keanu;
    for item in cur_data_list:
        #[注销 4654]
        cql_replace = 'MATCH (a { name:"%s" })-[:synonym]->(a1) RETURN a1.name as new'%(item[0])
        result = graph.data(cql_replace)
        #print 'CQL: %s , %s'%(cql_replace, json.dumps(result))
        if result:
            item[0] = result[0]['new']
        cql = 'MERGE (a { name:"%s" }) ON MATCH SET a.freq = %s '%(item[0], item[1])
        #cql = 'MERGE (a {name:"%s"}) ON CREATE SET a.freq = %s ON MATCH SET a.freq = %s '%(item[0], item[1], item[1])
        graph.run(cql)
        print cql
    #查询
    result = graph.data('match (n) return n')
    print json.dumps(result, ensure_ascii=False)
 
if __name__ == '__main__':
    main()
```


### Cypher

- Cypher是Neo4j的图形查询语言，允许用户存储和检索图形数据库中的数据。
- 查询语言如下：
```sql
MATCH 
  (person:Person)-[:KNOWS]-(friend:Person)-[:KNOWS]-
  (foaf:Person)
WHERE 
  person.name = "Joe"
  AND NOT (person)-[:KNOWS]-(foaf)
RETURN
  foaf
```
![](https://s2.ax1x.com/2019/02/21/kRocM8.png)

## JanusGraph

- 一个Linux基金会下的开源分布式图数据库 。JanusGraph提供Apache2.0软件许可证。该项目由IBM、Google、Hortonworks支持。JanusGraph是由TitanDB 图数据库修改而来，TitanDB从2012年开始开发。目前最新版本为0.3.1。


## DGraph

- dgraph 是可扩展的，分布式的，低延迟的图数据库。
- DGraph 的目标是提供 Google 生产水平的规模和吞吐量，在超过TB的结构数据里，为用户提供足够低延迟的实时查询。DGraph 支持 [GraphQL](https://www.oschina.net/p/graphql) 作为查询语言，响应 JSON。
- 对比
  - ![](https://static.oschina.net/uploads/space/2017/1119/092808_e1XO_12.jpg)




# 资料

- 更多[Demo地址](http://wqw547243068.github.io/demo)

# 结束


