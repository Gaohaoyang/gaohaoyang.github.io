---
layout: post
title:  "知识图谱-Knowledge-Graph"
date:   2020-06-23 21:14:00
categories: 自然语言处理
tags: 深度学习 NLP KG KB-QA 知识图谱 表示学习 jena
excerpt: 知识图谱（Knowledge Graph）发展历史，主要类型，前沿研究及应用场景等
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

- 【2021-2-14】[思知机器人](https://www.ownthink.com/)，开源中文知识图谱，[图谱可视化](https://www.ownthink.com/knowledge.html?word=%E9%92%9F%E5%8D%97%E5%B1%B1)，[Demo体验](https://www.ownthink.com/robot.html)，包含实时tts；OwnThink开源了史上最大规模（1.4亿）中文知识图谱，[地址](https://github.com/ownthink/KnowledgeGraphData)。[阿里云地址](https://nebula-graph.oss-accelerate.aliyuncs.com/ownthink/kg_v2.tar.gz)，百度云[地址](https://pan.baidu.com/s/1LZjs9Dsta0yD9NH-1y0sAw)，提取码: 3hpp 解压密码是：https://www.ownthink.com/，1.95G
  - ![](https://pic4.zhimg.com/80/v2-7bf5c629b7dcc923a6a92ce69dc0d0b7_720w.jpg)
  - [Neo4j导入思知OwnThink开源的知识图谱](https://zhuanlan.zhihu.com/p/113569382)
- 【2021-2-10】艾瑞咨询：[2020中国知识图谱行业研究报告](http://report.iresearch.cn/wx/report.aspx?id=3553)
- 艾瑞咨询《知识图谱白皮书》（2020）发布
- 艾瑞咨询是解决商业决策问题的专业第三方机构，互联网企业IPO报告里80%的材料引用自艾瑞研究的成果。
- 2020年11月底，艾瑞咨询从善政、惠民、兴业、智融四个部分对知识图谱技术在其他行业中的代表性应用场景进行梳理，发布了《知识图谱白皮书》。深擎科技“乾坤袋”知识图谱引擎与腾讯云、百度云、阿里云等品牌共同作为代表性应用被纳入金融领域产业链与参与者图谱。
- ![](https://pics7.baidu.com/feed/eaf81a4c510fd9f9a55a8e5366397f2d2834a453.jpeg)

总结如下：

|方法流派|思路|示例|优点|缺点|备注|
|---|---|---|---|---|---|
|规则模板|人为设定规则模板|`AIML`语言|①简单，无须标注②稳定可控|①人力消耗大②回复单一，多样性欠缺|-|
|生成模型|用encoder-decoder结构生成回复|`Seq2Seq`、`transformer`|无须规则，自动生成|①效果不可控②万能回复（安全回复）③多样性低④一致性不足|-|
|检索模型|文本检索与排序技术从问答库中挑选合适的回复|IR|①语句通顺②可控|①不能生成回复②表面相关，难以捕捉语义信息|-|
|混合模型|综合生成和检索方案|度秘|-|-|-|


# 知识图谱

- **信息**和**知识**两个概念：
  - **信息**是指外部的<font color='blue'>客观事实</font>
    - 如：这里有一瓶水，它现在是7°。
  - **知识**是对外部<font color='blue'>客观规律的归纳和总结</font>
    - 如：水在零度的时候会结冰。
- “客观规律的归纳和总结” 似乎有些难以实现。Quora 上有另一种经典的解读，区分 “信息” 和 “知识” 。
- 在信息的基础上，建立实体之间的联系，就行成 “知识”。当然，叫**事实**（Fact）更合适。
- 知识图谱是由一条条知识组成，每条知识表示为一个**SPO三元组**(Subject-Predicate-Object)。
- 知识图谱本质上是一种揭示实体之间关系的语义网络。

- **专家系统**,万维网之父Tim Berners Lee于1998年提出的**语义网**（Semantic Web）和在2006年提出的**关联数据**（Linked Data）都和知识图谱有着千丝万缕的关系，可以说它们是知识图谱前身。
- “知识图谱（Knowledge Graph）”的概念是由Google公司在2012年提出，指代其用于提升搜索引擎性能的知识库。
  - Google为了提升搜索引擎返回的答案质量和用户查询的效率，于2012年5月16日发布了**知识图谱**(Knowledge Graph)。有知识图谱作为辅助，搜索引擎能够洞察用户查询背后的语义信息，返回更为精准、结构化的信息，更大可能地满足用户的查询需求。
  - Google知识图谱的宣传语“**things not strings**”给出了知识图谱的精髓，即，不要无意义的字符串，而是获取字符串背后隐含的对象或事物。
  - 以罗纳尔多为例，我们想知道罗纳尔多的相关信息(很多情况下，用户的搜索意图可能也是模糊的，这里我们输入的查询为“罗纳尔多”)
    - 在之前的版本，只能得到包含这个字符串的相关网页作为返回结果，然后不得不进入某些网页查找我们感兴趣的信息；
    - 现在，除了相关网页，搜索引擎还会返回一个“知识卡片”，包含了查询对象的基本信息和其相关的其他对象(C罗名字简称也为罗纳尔多，搜索引擎只是根据“罗纳尔多”的指代概率返回了“肥罗”这个罗纳尔多的基本资料，但也许你需要C罗的相关信息，那么搜索引擎把C罗这个实体作为备选项列出)，如下图红色方框中的内容。如果我们只是想知道罗纳尔多的国籍、年龄、婚姻状况、子女信息，那么我们不用再做多余的操作。在最短的时间内，我们获取了最为简洁，最为准确的信息。
  - ![](https://pic4.zhimg.com/80/v2-189394fc66ae8a53632534790ec9749b_720w.jpg)
- 知识图谱的出现是人工智能对知识需求所导致的必然结果，但其发展又得益于很多其他的研究领域，涉及专家系统、语言学、语义网、数据库，以及信息抽取等众多领域，是交叉融合的产物而非一脉相承
  - 详见：[知识图谱发展概述](https://www.cnblogs.com/jtianwen2014/p/7678616.html)

![](https://images2017.cnblogs.com/blog/706575/201710/706575-20171016200824396-1450295689.png)

- 【2020-7-12】【ACL 2020知识图谱自然语言处理进展摘要】《[Knowledge Graphs in Natural Language Processing @ ACL 2020](https://towardsdatascience.com/knowledge-graphs-in-natural-language-processing-acl-2020-ebb1f0a6e0b1)》by Michael Galkin
- 【2020-7-21】[从ACL 2020看知识图谱进展](https://www.toutiao.com/i6851461937012851214/?tt_from=mobile_qq&utm_campaign=client_share&timestamp=1595263453&app=news_article&utm_source=mobile_qq&utm_medium=toutiao_android&use_new_style=1&req_id=202007210044120100270271372C1692E4&group_id=6851461937012851214)

## 历史

- **知识图谱**的发展简史
  - 上个世纪60年代Quillian提出了**语义网络**，作为知识表示的一种方式，用于描述物体概念与状态及其间的关系，早期主要是用来帮助自然语言理解。
  - 到上个世纪80年代，人工智能研究人员将 “**本体**”这一哲学概念被引入计算机领域，把本体定义为“**概念和关系的形式化描述**”，通俗一点讲本体类似数据库中的Schema，这一时期的一个典型应用就是专家系统。
  - 1989年Tim Berners Lee提出了**万维网**，也就是我们今天使用的www网络
  - 1998年从超文本网页延伸出**语义网络**概念，将每一个网页引入语义信息，比如：姚明这个页面，归属类别是人物、运动员。
  - 2006年提出了**链接数据**概念，目标将互联网上所有数据建立关联，如姚明的页面出现他妻子叶莉，会给“叶莉”加一个链接，链接到叶莉这个页面。
  - 2012年Google率先提出了**知识图谱**，目的是提升整个搜索效果，从此知识图谱技术开始得到广泛学习和应用。

- 
- ![](http://5b0988e595225.cdn.sohucs.com/images/20180906/2cbe3385c1b74d2895626b0070c72b44.jpeg)
  - 摘自：
    - [知识图谱在贝壳找房的从0到1实践](https://www.sohu.com/a/252223730_499730)
    - 【2020-9-16】[【知识图谱系列】开篇：基于KBQA的经纪人咨询助手](https://mp.weixin.qq.com/s?__biz=MzU3OTY2MjQ2NQ==&mid=2247485140&idx=1&sn=1d4739efa2e61f5bca6b2bf54d55ca87&chksm=fd63e13aca14682c8a4a97b30c093eb6cd5649f326e3d8875f3706a568175803d0fc642ad2aa&mpshare=1&scene=1&srcid=09164hw2hJXwSd3P2aCyZVSB&sharer_sharetime=1600234667205&sharer_shareid=2397ebcca559a9e3526dfd9d52c0256d&key=64c89714f25cba008511613fdb28eb9eec76e7ff16ef1ce851e84c38cb39e6ff776560f0a5a988ec2fd63004dc882a3f7759586fdb829f09d68df27f15a34b1dd856d2a1a2f9fb2cd3c9229a0e42e7f75aa93e8cfb790adb9ef6dd839f917abb6402cf62075855c87c616620f7d67a45c9d5ba7c3d613400428b90e868520b06&ascene=1&uin=OTY1NzE1MTYw&devicetype=Windows+10+x64&version=62090529&lang=zh_CN&exportkey=AUh00ODduFPVWprSECsaHVY%3D&pass_ticket=7mpEltFniVgVA8udzhXvGu5076WsT0d0jPX7mxvNBPPNk2qz5Sgw%2B8WUntOJuT9x&wx_header=0)
    - 【2020-7-18】[贝壳找房技术文章合集](https://mp.weixin.qq.com/mp/appmsgalbum?action=getalbum&__biz=MzU3OTY2MjQ2NQ==&scene=24&album_id=1431012302404534273&uin=&key=&devicetype=iMac+MacBookPro13%2C2+OSX+OSX+10.15.5+build(19F101)&version=12040110&lang=zh_CN&nettype=WIFI&ascene=14&fontScale=100&winzoom=1.000000)

## 定义

- 知识图谱并没有一个标准的定义(gold standard definition)。借用一下“Exploiting Linked Data and Knowledge Graphs in Large Organisations”这本书对于知识图谱的定义：
>- A knowledge graph consists of a set of interconnected typed entities and their attributes.
>- 知识图谱是由一些相互连接的**实体**和他们的**属性**构成的。

- 换句话说，知识图谱是由一条条知识组成，每条知识表示为一个**SPO三元组**(Subject-Predicate-Object)。
- ![](https://pic2.zhimg.com/80/v2-e3478e02c36ead3875e598b0668830fd_720w.jpg)
- 用RDF形式化地表示这种三元关系。
- **RDF**(Resource Description Framework)，即**资源描述框架**，是W3C制定的，用于描述实体/资源的标准数据模型。
- RDF图中一共有三种类型，International Resource Identifiers(IRIs)，blank nodes 和 literals。
- 下面是SPO每个部分的类型约束：
  - Subject可以是IRI或blank node。
  - Predicate是IRI。
  - Object三种类型都可以。
- 解释
  - IRI我们可以看做是URI或者URL的泛化和推广，它在整个网络或者图中唯一定义了一个实体/资源，和身份证号类似。
  - literal是字面量，可以看做是带有数据类型的纯文本，比如我们在第一个部分中提到的罗纳尔多原名可以表示为"Ronaldo Luís Nazário de Lima"^^xsd:string。
  - blank node简单来说就是没有IRI和literal的资源，或者说匿名资源。
- 参考：[为什么需要知识图谱？什么是知识图谱？——KG的前世今生](https://zhuanlan.zhihu.com/p/31726910)

- 定义[Wang, 2017]： 
  - 知识图谱是由`实体`和`关系`构成的`多关系图`，实体和关系分别被视为节点和不同类型的边。
> A knowledge graph is a multirelational graph composed of entities and relations which are regarded as nodes and different types of edges, respectively.
- 形式化定义： 
> A knowledge graph as G = {E, R, F}, where E, R and F are sets of entities, relations and facts, respectively. A fact is denoted as a triple (h, r, t) ∈ F。

- 知识图谱是由Google公司在2012年提出来的一个新的概念。从学术的角度，可以给这样的定义：“知识图谱本质上是**语义网络**（Semantic Network）的知识库”。但这有点抽象，所以换个角度，从实际应用的角度出发其实可以简单地把知识图谱理解成**多关系图**（Multi-relational Graph）。
- 那什么叫**多关系图**呢？ 学过数据结构的都应该知道什么是**图**（Graph）。图是由**节点**（Vertex）和**边**（Edge）来构成，但这些图通常只包含一种类型的节点和边。但相反，多关系图一般包含多种类型的节点和多种类型的边。比如左下图表示一个经典的图结构，右边的图则表示多关系图，因为图里包含了多种类型的节点和边。这些类型由不同的颜色来标记。
- ![](https://pic1.zhimg.com/80/v2-ac88147e6b90d5bdf6c9085ba310c308_720w.jpg)
- 知识图谱里，通常用“**实体**（Entity）”来表达图里的节点、用“**关系**（Relation）”来表达图里的“边”。
  - 实体指的是现实世界中的事物比如人、地名、概念、药物、公司等
  - 关系则用来表达不同实体之间的某种联系，比如人-“居住在”-北京、张三和李四是“朋友”、逻辑回归是深度学习的“先导知识”等等。
- 实体和关系也会拥有各自的**属性**，比如人可以有“姓名”和“年龄”。当一个知识图谱拥有属性时，可以用**属性图**（Property Graph）来表示。
  - 李明和李飞是父子关系，并且李明拥有一个138开头的电话号，这个电话号开通时间是2018年，其中2018年就可以作为关系的属性。类似的，李明本人也带有一些属性值比如年龄为25岁、职位是总经理等。
  - ![](https://pic3.zhimg.com/80/v2-2f39910c39b41f154c413c4c476bbb2a_720w.jpg)
- 除了**属性图**，知识图谱也可以用**RDF**来表示，由很多的三元组（Triples）来组成。
  - RDF在设计上的主要特点是易于发布和分享数据，但不支持实体或关系拥有属性，如果非要加上属性，则在设计上需要做一些修改。
  - 目前来看，RDF主要还是用于学术的场景，在工业界我们更多的还是采用图数据库（比如用来存储属性图）的方式。

- 摘自：[戴帅湘：NLP的发展和应用](https://mp.weixin.qq.com/s?__biz=MzIyNTk1OTY5NQ==&mid=2247483751&idx=1&sn=e8af45990756375f8f3bb42e841a0e91&chksm=e8768b07df0102116fd449b4e685086b25922a6a9436fe5f05490a152fa579ecf9bb05db81cf&mpshare=1&scene=23&srcid=&sharer_sharetime=1593153276858&sharer_shareid=b8d409494a5439418f4a89712efcd92a#rd)

- 知识图谱旨在描述真实世界中存在的各种实体或概念及其间的关联关系。
  - 首先，每一个实体用全局唯一ID来标识，就如同每个人都有一个自己的身份证号；
  - 其次, 用**属性-值**对来刻画实体的内在特性，用关系来刻画实体之间的关联。
  - 如刻画姚明这个实体：属性-值<姚明+身高+2.26米>，关系型<姚明+妻子+叶莉>。

![](http://5b0988e595225.cdn.sohucs.com/images/20180906/74e9cf11143945ad88032e4c97e26e47.jpeg)


## 应用

- 知识图谱应用场景分为两种，一种是**通用**领域，一种是**垂直**领域
  - 通用领域：如Google搜索，国内百度和搜狗也有在搜索中应用知识图谱技术；还有些智能硬件应用，如智能机器人、智能手表。这种应用也会用到通用知识图谱，构建依赖国外维基百科、freebase，还有国内百度百科、维基百科、互动百科、搜狗百科等，从这些页面中抽取出结构化三元组构建知识图谱来支撑通用领域的问答和搜索。
  - 垂直领域：应用越来越多，如金融、电商、公共安全、电信等，具体如金融里面的反欺诈，公共安全领域的追捕犯罪分子。

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
  - a.**实体命名识别**（Name Entity Recognition）
    - 从文本里提取出实体并对每个实体做分类/打标签：比如从上述文本里，我们可以提取出实体-“NYC”，并标记实体类型为 “Location”；也可以从中提取出“Virgil's BBQ”，并标记实体类型为“Restarant”。
    - NER技术相对成熟
  - b. **关系抽取**（Relation Extraction）
    - 把实体间的关系从文本中提取出来，比如实体“hotel”和“Hilton property”之间的关系为“in”；“hotel”和“Time Square”的关系为“near”等等。
  - c. **实体统一**（Entity Resolution）—— 或实体链接
    - 在实体命名识别和关系抽取过程中，有两个比较棘手的问题：一个是**实体统一**，也就是说有些实体写法上不一样，但其实是指向同一个实体。
    - 比如“NYC”和“New York”表面上是不同的字符串，但其实指的都是纽约这个城市，需要合并。实体统一不仅可以减少实体的种类，也可以降低图谱的稀疏性（Sparsity）；
  - d. **指代消解**（Coreference Resolution）
    - 另一个问题是**指代消解**，也是文本中出现的“it”, “he”, “she”这些词到底指向哪个实体，比如在本文里两个被标记出来的“it”都指向“hotel”这个实体。
    - ![](https://pic2.zhimg.com/80/v2-df3f5c0cdd741c9f4d87fd80069ab711_720w.jpg)
- 示例
  - ![](https://pic2.zhimg.com/80/v2-7d172d9e812b6057e25156b2695ee4b1_720w.jpg)

## 知识抽取

- 知识图谱的构建是后续应用的基础，而且构建的前提是需要把数据从不同的数据源中抽取出来。对于垂直领域的知识图谱来说，它们的数据源主要来自两种渠道：
  - 一种是业务本身的数据，这部分数据通常包含在公司内的数据库表并以结构化的方式存储；
  - 另一种是网络上公开、抓取的数据，这些数据通常是以网页的形式存在所以是非结构化的数据。
- 信息抽取的难点在于处理非结构化数据。
- 非结构化（纯文本）知识抽取分三个任务： 
- 1. **实体提取**(Entity Discovery) 
  - 细分任务分为：
    - `实体识别`(Entity Recognition)
    - `实体消歧`(Entity Disambiguation)
    - `实体分类`(Entity Typing)
    - `实体对齐`(Entity Alignment)
- 2. **关系提取**(Relation Extraction) 
  - 2.1 定义：关系抽取是从非结构化数据中抽取未知关系事实并将其加入到知识图谱中，是自动构建大规模知识图谱的关键 
  - 2.2 方法：传统的方法高度依赖于特征工程。由于缺乏标记的关系数据，使用启发式匹配来创建训练数据，利用文本特征(包括词汇和句法特征、命名实体标记和连接特征)对关系分类进行远程监控。目前最新研究以深度学习工具实现关系提取。
- 3. **知识补全**(KGC) 
  - 3.1 基于知识图谱不完备性的特点，提出了一种新的知识图谱三元组生成方法。即，给定一个不完整的知识图谱 G=(E, R, F)，知识图谱补全旨在**推理出缺失的三元组** T={(head, relation, tail) \| (head, relation, tail) ∉ F} 。
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
  - `TransH`（MSRA研究者提出）和`TransR`（清华实验室提出）均为TransE代表扩展模型之一。
    - TransE在实体预测任务能够达到47.1的准确率，而采用TransH和TransR，特别是TransR可以达到20%的提升。
  - [基于 TransE TransH TransR和PTransE的知识图](https://www.helplib.cn/fansisi/KB2E)，[KB2E](https://www.github.com/thunlp/KB2E)代码实现，[图嵌入的Translate模型汇总（TransE，TransH，TransR，TransD）](https://www.toutiao.com/i6844713516557926916/?tt_from=mobile_qq&utm_campaign=client_share&timestamp=1593739790&app=news_article&utm_source=mobile_qq&utm_medium=toutiao_android&use_new_style=1&req_id=202007030929500100260772033571AA0D&group_id=6844713516557926916)

- 【2020-7-26】斯坦福知识图谱多跳推理，[Multi-Hop Knowledge Graph Reasoning with Deep Reinforcement Learning](https://web.stanford.edu/class/cs520/abstracts/socher.pdf)


## 关系推理

- 简单问答只需要识别出问题中的实体和关系，链接到知识图谱中，即可查出答案。
- 推理问答则要求计算机具备多种**推理**能力，具体包括：
  - （1）处理**多跳**关系的能力，如“姚明的妻子的学校”；
  - （2）**数值比较**的能力，如“哪个城市的人口更多”；
  - （3）**集合操作**的能力，如“即是篮球运动员，又是球队老板的人有哪些”。
- 知识图谱推理问答主流方法大致分为4大类别
  - 键值记忆网络（KVMemNet）
  - 基于强化学习的多跳路径搜索
  - 弱监督的程序学习
  - 查询图解析与匹配
- 资料
  - [知识图谱推理问答：如何让机器像人类一样学会推理](https://www.toutiao.com/i6842470279516520972/)

- 基于知识图谱的关系推理的相关工作，大体分为三种方法：
  - （1）**统计关系**学习方法（SRL），如马尔科夫逻辑网络、贝叶斯网络，但这类方发需要设计相应的规则，因此没有很好的扩展性和泛化性；
  - （2）**嵌入式**表示的方法，旨在将实体和关系映射为空间中的向量，通过空间中向量的运算来进行推理（如TransE），该方法取得了较好的准确率，但分布式表示的解释性不强，另外，较难实现并行计算；
  - （3）基于关系路径特征的**随机游走**模型，该方法可以进行并行计算，具有较好的执行效率，但准确率与召回率相比嵌入式表示学习的方法存在劣势。

### 推理数据集

- 4个常用推理问答数据集，并从所用知识库、知识类型、问题数量、自然语言、SPARQL共5个角度加以对比。
  - 三种知识类型：
    - ①**关系**型，如（“姚明”，“出生于”，“上海”）；
    - ②**属性**型，如（“姚明”，“身高”，“ 229 厘米”）；
    - ③**事实**型，用于表示一个关系型事实或属性型事实的知识，如[（“上海”，“人口”，“23,390,000”），“统计时间”，“2016”]。
    - ![](http://p1-tt.byteimg.com/large/pgc-image/bfbadfacd0cf40dba276f6a3e0c70f33?from=pc)
    - 在提到的4个数据集中，MetaQA 和 CSQA 仅考虑关系型知识。
  - 现有数据集存在一个共同的问题，都**缺乏推理过程**，只给出复杂的问题以及对应的答案，没有问题解答过程。
  - 清华大学知识工程实验室构造了一个新的数据集——KQA Pro，可提供之前数据集都不具备的推理过程。
    - ![](http://p3-tt.byteimg.com/large/pgc-image/cb3ae03cd46d4a8db6ebbb1375275293?from=pc)
  - 为表示推理过程，KQA Pro引入**函数**（function）和**程序**（program）两个概念。函数对应简单问题，程序对应复杂问题，将简单的函数组合成复杂的程序，从而解决复杂问题。
    - ![](http://p6-tt.byteimg.com/large/pgc-image/08a168a57ec644268e16264598f910aa?from=pc)

## 常识推理

- [“原子”因果常识图谱](https://www.hankcs.com/nlp/corpus/atomic-commonsense-knowledge-graph.html)
  - AAAI 19的论文(Sap et al. (2019))开源了一个包含87万条推理常识的知识图谱ATOMIC。相较于常见的基于本体论分类条目的知识图谱，该知识库专注于“如果…那么…”关系的知识。作者提出了9种类型的因果联系来区分**原因-效果**、**主体-主题**、**自愿-非自愿**、**行动-心理状态**。通过生成式训练，作者发现神经网络模型可以从该图谱中获取简单的常识推理能力。
  - 另外，该团队在ACL 19上的论文COMET则利用了该图谱训练GPT模型，该GPT模型又反过来生成了许多全新的且合理的知识，达到了图谱补全的效果。
  - ![](https://wx1.sinaimg.cn/large/006Fmjmcly1g91wq3pvxkj30u012lh1q.jpg)

## 问题思考

- 目前已有的知识表示学习方法无法实现精确链接预测，有两个原因导致了这一现象的出现：
  - ill-posed algebraic problem：一个方程组中的方程式个数远大于变量个数
    - 解法：**流形函数**, $M(h,r,t)=D2r$用来代替$h_r+r=t_r$，应用Reproducing Kernel Hilbert Space (RKHS)映射到Hilbert空间，以更高效地表征流形
      - ![](https://images2015.cnblogs.com/blog/706575/201706/706575-20170619113807148-873845996.png)
  - adopting an overstrict geometric form。应用于h+r=t，所得到的尾实体几乎是一个点，这对于多对多关系而言显然是不正确的
- 摘自：知识图谱表示学习与关系推理（2016-2017）：[（一）](https://www.cnblogs.com/jtianwen2014/p/7000190.html)，[（二）](https://www.cnblogs.com/jtianwen2014/p/7008228.html)，[（三）](https://www.cnblogs.com/jtianwen2014/p/7018872.html)，[ACL2016信息抽取与知识图谱相关论文掠影](https://www.cnblogs.com/jtianwen2014/p/6985214.html)


## 知识图谱嵌入(KGE)

- [知识图谱嵌入(KGE)：方法和应用的综述](https://zhuanlan.zhihu.com/p/83026306)，参考《Knowledge Graph Embedding: A Survey of Approaches and Applications》和刘知远的《知识表示学习的研究与进展》做的总结

![](https://pic4.zhimg.com/80/v2-8248f2e0ece454bd036b3ab97dc30b77_720w.jpg)

- 【2021-2-7】[DGL-KE：亚马逊开源知识图谱嵌入库，亲测快到飞起](https://zhuanlan.zhihu.com/p/347803335)，[github地址](https://github.com/awslabs/dgl-ke)
  - DGL-KE 是一个高性能、易于使用且可扩展的知识图谱嵌入工具包，它是依赖 Deep Graph Library (DGL) 库实现的，支持 CPU、GPU、分布式训练，包括 TransE、TransR、RESCAL、DistMult、ComplEx 和 RotatE 等一系列经典模型。
  - DGL-KE 正在继续开发中，预计一个月之后会加入 SimplE 模型、图神经网络 GNN 等。
  - ![](https://data.dgl.ai/asset/image/ke/dgl_ke_arch.png)
  - 对比分析：清华开源库 OpenKE，TransE 的对比结果，训练数据的规模是10w+的数据。
  - 结论：快了400倍

|开源库	|时间	|迭代次数|
|---|---|---|
|OpenKE|	1小时|	1000|
|DGL-KE|	|15分钟|	100000|


# 事理图谱-Event Graph

- [白硕：事理图谱六问六答 ](https://www.sohu.com/a/330151320_657157)
  - 知识图谱，主要表示的是关于实体的知识，发展得比较丰富的还是围绕实体、关系、属性的各种表示、演化和推理技术。
  - 哈工大事理图谱1.0版用的是“**Event Evolution Graph**”，2.0版用的是“**Event Logic Graph**”，国外同领域文献用得比较多的是“Event Graph”。
- 一、**事理图谱是研究“事理”的学问吗？**
  - “事理图谱”不研究事理的内容，只研究事理“长什么样”，可以说是关于事理的形式化、数字化表示、演化和推理的学问。
- 二、**事理图谱和事件图谱是什么关系？**
  - 事件图谱是不含本体的事理图谱，是事理图谱的初级阶段。对事件实例的抽取和预测，是事件图谱的基本任务。
  - 事件图谱走向事理图谱又是一个学科方向的内在逻辑不断推动和一些应用领域的知识图谱落地需求不断倒逼的综合作用结果。
- 三、**事理图谱的本体层需要什么样的架构来支持？**
  - 事理图谱有本体层，这是个最重要的结论。事件之间、事件和实体之间不仅有横向的由此及彼的关联，还有纵向的由特殊到一般/由一般到特殊的关联。
    - **横向**关联：由此及彼，是漫游、是联想、是类比
    - **纵向**关联：一般<-->特殊，是归纳、是演绎、是演化。
  - 四象限架构
    - 抽象实体、具体实体、抽象事件、具体事件这四块内容，物理上是联通的，是一张图，逻辑上则可以左右划分为实体域和事件域，上下可以划分为本体域和实例域，形成所谓“四象限”架构
    - ![](http://5b0988e595225.cdn.sohucs.com/images/20190729/8441ff086e204877a5e6e009504a417c.png)
- 四、**事理图谱和实体图谱是什么关系？**
  - 事理图谱是在知识图谱总框架下，<font color='red'>知识表示对象从**实体**、**关系**、**属性**向**事件**的顺理成章的延伸</font>。当然，随着延伸，也自然而然产生了“四象限”的架构，以及由这种架构带来的丰富得多的计算、演化和推理模式。
  - 事理图谱也和实体图谱一样，受到知识图谱构建所遵循的一般规律特别是一般性方法论原则的约束。
- 五、**事理图谱和NLP如何对接？**
  - 事理图谱是对谓词性成分语义进行表示的技术体系，因此事理图谱的研究和NLP有着天然的紧密联系。
  - 事理图谱向左，可以“脑补”一般分析器做不到的精准解析结果，如指代消解
  - 事理图谱向右，可以“补脑”语义落地所缺失的环节，扫除一旦精准NLP得以实现之后通向应用场景的各种障碍
- 六、**事理图谱适合在哪些应用场景落地？**
  - 有些应用场景，只要实体域的两个象限就很好了，完全不需要引入事件域这两个象限。如教育领域。
  - 金融、情报、法律、医疗，是事理图谱应用的“重仓”

![](http://5b0988e595225.cdn.sohucs.com/images/20190729/ef48f3a4c2ea4b36a1f3ba5f7b10e272.jpeg)


# KB-QA

- **KBQA**(Knowledge Base Question Answering)，是基于知识库的问答系统，本质上KBQA系统反映一个简化的“问答-答案”的映射过程，需要对自然语言语义解析与理解后，进行结构化查询与推理，得出相应的答案。
- ![](https://pic2.zhimg.com/80/v2-2699f1e6d3dd51c7c86cbb9cf0e58af9_720w.jpg)
- ![](https://pic2.zhimg.com/80/v2-49c7910b5ffa6a492249f49d5af26269_720w.jpg)

- KB-QA与对话系统
  - **问答系统是信息检索系统的高级形式**，是以问题为驱动的信息获取过程，按QA类别可以分为**WebQA**（Web问答）、**KBQA**（知识库问答）、**CQA**（社区问答）和**DBQA**（阅读理解的QA系统，斯坦福的SQuAD）
  - 对话系统主要关注对话过程，多采用多轮方式进行，主要分为开放**闲聊**的对话系统、**任务驱动**的对话系统、以**知识获取**的对话系统和**信息推荐**的对话系统
  - 传统的对话系统主要由四个部分：**NLU**（自然语言生成）、**DST**（对话状态追溯）、**PL**（策略学习）和**NLG**（自然语言生成），目前，采用是端对端检索式与生成式的，但是精度较低。
  - KBQA主要通过对自然语言进行语义解析与理解后，查询知识库，进行某一类事实问题进行回答（简单的BFQ或者复杂多跳转问题），答案是某一种实体或者实体的属性或者关系，而对话系统，句子级的对话，注重对话过程，回答的问题是一般是句子而不是简单的答案，类似人对话聊天。对话系统也可以结合知识库进行更加全面句子级答案生成（知识获取的对话系统）。
- KBQA系统实现有哪些方法？
  - （1）基于**语义解析**的方法
    - 将自然语言转换为一系列形式化的逻辑表达式，利用知识库中语义信息将逻辑表达式转为知识库查询，最终得到相应的答案。
    - ![](https://pic3.zhimg.com/80/v2-b9f896cccd14c52c95b7278e9f081ade_720w.jpg)
  - （2）基于**模板匹配**的方法
    - 基于模板匹配的方法是通过预制模板匹配问题，代替本体映射，绕过语义解析脆弱性，一般使用该方法与结合语义解析+模板匹配查询的方法来解决工业界的问题，如基于模板匹配的查询语言章节讲的，但是此方法需要人工构建大量模板，只能解决简答的事实类型的问答
    - ![](https://pic1.zhimg.com/80/v2-951e8b05200c6f940ab6aa981214f100_720w.jpg)
  - （3）基于**深度学习**优化模板匹配的方法
    - 深度学习主要用来改进问答系统的流程，包括语义解析、实体识别、意图识别与分类和实体链接与消歧等，这类的算法很多，比如对于实体识别的LSTM+CRF、基于深度学习及概率图的实体消歧等，另一方，采用深度学习对问答对进行训练得到大量的模板,便于问题与知识库匹配
- 分类：
  - IRQA 基于检索的QA
  - KBQA 基于知识库的QA
  - MRCQA 基于阅读理解的QA
- 常用数据集
  - **NLPCC**全称**自然语言处理与中文计算会议**（The Conference on Natural Language Processing and Chinese Computing）,它是由中国计算机学会（CCF）主办的 CCF 中文信息技术专业委员会年度学术会议，专注于自然语言处理及中文计算领域的学术和应用创新。
  - 数据集来自NLPCC ICCPOL 2016 KBQA 任务集，其包含 14 609 个问答对的训练集和包含 9 870 个问答对的测试集。 并提供一个知识库，包含 6 502 738 个实体、 587 875 个属性以及 43 063 796 个 三元组。知识库文件中每行存储一个事实( fact) ，即三元组 ( 实体、属性、属性值) 。
- [基于BERT的KBQA探索](https://zhuanlan.zhihu.com/p/62946533), 基于知识图谱的自动问答拆分为2 个主要步骤:命名实体识别步骤和属性映射步骤
  - **命名实体识别**步骤，采用BERT+BiLSTM+CRF方法（另外加上一些规则映射，可以提高覆盖度）
  - **属性映射**步骤，转换成文本相似度问题，采用BERT作二分类训练模型
  - ![](https://pic4.zhimg.com/80/v2-782cfa7747c02d70ebb7fb542b574f8b_720w.jpg)

- 【2020-4-22】[KB-QA研究进展](https://www.jianshu.com/p/92ea00b7a4cc)
- ![](https://upload-images.jianshu.io/upload_images/9298309-c4a3c66f7965460e.png)

- [ACL2020 | 基于Knowledge Embedding的多跳知识图谱问答](https://zhuanlan.zhihu.com/p/149141891)
- KGQA 方法称为 EmbedKGQA。其中包含三个关键模块。
  - KG 嵌入模块：为 KG 中所有实体构建嵌入。
  - 问题嵌入模块：为问题找到嵌入。
  - 答案选择模块：减小候选答案实体的集合，并选择最终的答案。

![](https://pic2.zhimg.com/80/v2-3dd2d09867f7a5dc072a36f113fc9121_720w.jpg)

- 【2021-2-13】问答任务的类型（搜索领域用户日志），源自《智能问答》P8
  - 事实类：factoid
  - 是非类：yes/no
  - 定义类：definition
  - 列表类：list
  - 比较类：comparison
  - 意见类：opinion
  - 指导类：how-to
  - 总结：
    - 列表类通过表格形式解答
    - 后三者答案主观，一般通过qa对形式来解答
- 进一步分类：
  - （1）知识图谱问答：knowledge-based QA
    - 事实在知识图谱中表示方式有两类：三元组事实（triple fact）、CVT事实（CVT fact）
    - CVT：compound value type，复合值类型节点，如：奥巴马→（婚姻）→婚姻事实（包含人物、时间、地点等信息）
  - （2）表格问答：table-based QA
    - 分成表格检索+答案生成两个步骤
  - （3）文本问答：text-based QA
    - 按照答案颗粒度不同，分成：
      - 答案句子选择（answer sentence selection）：对所有句子打分、排序，选择最高的句子作为回复
      - 机器阅读理解（machine reading comprehension）：短语级别，解决思路：
        - 排序任务：对所有候选短语抽取、排序
        - 序列标注：判断每个单词是否属于答案（0/1）
  - （4）社区问答：community QA
    - 数据集：<问题，答案>对
    - 两类子任务：
      - QQ匹配：问题→问题→答案，根据Q的相似度关联已有Q，在得到答案
      - QA匹配：问题→答案，直接计算QA的相关度


## 资料

- 参考：
  - [刘康-基于深度学习的知识库问答研究进展](https://wenku.baidu.com/view/d0d2ff717ed5360cba1aa8114431b90d6c858925.html)
  - [知识图谱-基于ES(ElasticSearch)和gAnswer构建智能问答系统](https://zhuanlan.zhihu.com/p/91294301)
  - KBQA论文集[Awesome-knowledge-graph-question-answering](https://github.com/BshoterJ/awesome-kgqa)
- [针对复杂问题的知识图谱问答(KBQA)最新进展](https://blog.csdn.net/sdu_hao/article/details/105674327)

- **知识图谱问答**（KBQA）利用图谱丰富的语义关联信息，能够深入理解用户问题并给出答案，近年来吸引了学术界和工业界的广泛关注。
- KBQA 主要任务是将自然语言问题（NLQ）通过不同方法映射到结构化的查询，并在知识图谱中获取答案。
- 小蜜团队研发的知识图谱问答系统（KBQA）目前已广泛应用于电信运营商、保险、税务等领域，但是在真实的客服场景中，KBQA 在处理复杂问句上仍然面临着挑战。
- 用户在咨询问题时，倾向于表达非常具体的信息，以便快速的获得答案，比较常见问句类型的有：
  - 1）**复杂条件**句：“小规模纳税人季度销售额未超过 30 万，但是要开具 5 万元的专票，需要缴纳附加税费吗？”；
  - 2）**并列**句：“介绍下移动大流量和畅享套餐”；
  - 3）**推理型**问句：“你们这最便宜的 5G 套餐是哪个？”等，

# 知识图谱存储

## 知识图谱存储方式

- 知识图谱的两种存储方式
  - 一种是基于**RDF**的存储；
  - 另一种是基于**图数据库**的存储。
- 图数据库仍然是增长最快的存储系统。相反，关系型数据库的增长基本保持在一个稳定的水平。
- `RDF`一个重要的设计原则是数据的**易发布**以及**共享**，`图数据库`则把重点放在了高效的**图查询和搜索**上。
- 其次，RDF以**三元组**的方式来存储数据而且不包含属性信息，但图数据库一般以**属性图**为基本的表示形式，所以实体和关系可以包含属性，这就意味着更容易表达现实的业务场景。
  - ![](https://pic1.zhimg.com/80/v2-c5c1aa508f3583cf659479a60fc37d30_720w.jpg)

## 图数据库

- 现有图数据库对比
  - ![](https://pic4.zhimg.com/80/v2-2d99d2a221bbe2b8be179140e88efb33_720w.jpg)
- 其中`Neo4j`系统目前仍是使用率最高的图数据库，它拥有活跃的社区，而且系统本身的查询效率高，但唯一的不足就是不支持准分布式。
- 相反，`OrientDB`和`JanusGraph`（原`Titan`）支持分布式，但这些系统相对较新，社区不如Neo4j活跃，这也就意味着使用过程当中不可避免地会遇到一些刺手的问题。如果选择使用RDF的存储系统，Jena或许一个比较不错的选择。
  - Apache [Jena](https://jena.apache.org/)官方[下载](https://jena.apache.org/download/index.cgi)
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

- <font color='red'>关系型数据库实际上是不擅长处理关系的</font>
  - 关系型数据库
    - ![](https://s3.amazonaws.com/dev.assets.neo4j.com/wp-content/uploads/20180716185458/relational-database-rdbms-model-example.jpg)
  - 图数据库
    - ![](https://s2.ax1x.com/2019/02/21/kR4tKg.md.png)
- 在数据关系中心，图形数据库在查询速度方面非常高效，即使对于深度和复杂的查询也是如此。在《Neo4j in Action》这本书中，作者在关系型数据库
和图数据库(Neo4j)之间进行了实验。
  - 深度为2时（即朋友的朋友），两种数据库性能相差不是很明显；
  - 深度为3时(即朋友的朋友的朋友)，很明显，关系型数据库的响应时间**30s**，已经变得不可接受了；
  - 深度到4时，关系数据库需要近**半个小时**才能返回结果，使其无法应用于在线系统；
  - 深度到5时，关系型数据库已经**无法完成**查询。而对于图数据库Neo4J，深度从3到5，其响应时间均在**3秒以内**。
- 可以看出，对于图数据库来说，数据量越大，越复杂的关联查询，约有利于体现其优势。从深度为4/5的查询结果我们可以看出，图数据库返回了整个社交网络一半以上的人数。

## NoSQL数据库

大致可以分为四类：
- **键值**(key/value)数据库
- **列存储**数据库
- **文档型**数据库
- **图**数据库

![](https://s3.amazonaws.com/dev.assets.neo4j.com/wp-content/uploads/20181025032156/nosql-databases-overview.png)

- 表格对比

| 分类 |	数据模型 |	优势 |	劣势	| 举例 |
|---|---|---|---|---|
|**键值**数据库	|哈希表	|查找速度快	|数据无结构化，通常只被当作字符串或者二进制数据|	Redis|
|**列存储**数据库|	列式数据存储|	查找速度快；支持分布横向扩展；数据压缩率高|	功能相对受限|	HBase|
|**文档型**数据库	|键值对扩展	|数据结构要求不严格；表结构可变；不需要预先定义表结构	|查询性能不高，缺乏统一的查询语法|	MongoDB|
|**图**数据库|	节点和关系组成的图|	利用图结构相关算法(最短路径、节点度关系查找等)|	可能需要对整个图做计算，不利于图数据分布存储|	Neo4j、JanusGraph|

## 什么是图数据库？

- **图数据库**(Graph database)并非指存储图片的数据库，而是以图这种数据结构存储和查询数据。
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
  - 安装：先装[java](https://www.oracle.com/java/technologies/javase-jdk15-downloads.html),必须是open jdk 11以上版本, open JDK[清华源下载](https://mirror.tuna.tsinghua.edu.cn/AdoptOpenJDK/15/jdk/x64/linux/)
  - 配置环境变量：见下面代码
  - 查看版本：java --version
  - 社区版neo4j下载：（免登记，直接下载，版本号可定制）
    - windows：https://neo4j.com/artifact.php?name=neo4j-community_windows-x64_3_1_0.exe
    - linux：https://neo4j.com/artifact.php?name=neo4j-community-3.1.0-unix.tar.gz
    - mac：https://neo4j.com/artifact.php?name=neo4j-community_macos_3_1_0.dmg
  - 更改配置, conf/neo4j.conf
    - To accept non-local connections, uncomment this line:
    - dbms.default_listen_address=0.0.0.0 # 注释掉此行
  - 安装完成后，启动服务
  - Web Demo：http://localhost:7474/browser/
    - 默认账户，用户名：neo4j 密码 ：neo4j
    - 密码修改:server change-password
- Neo4J支持ACID，集群、备份和故障转移。目前Neo4J最新版本为3.5，分为**社区版**和**企业版**
  - 社区版只支持单机部署，功能受限。
  - 企业版支持**主从复制**和**读写分离**，包含可视化管理工具。
- 标记属性图模型
  - 节点
  - 关系
  - 属性
  - 标签
- ![](https://s3.amazonaws.com/dev.assets.neo4j.com/wp-content/uploads/20170731095054/Property-Graph-Concepts-Simple.svg)

```shell
# 环境变量如下
vim /etc/profile 或 ~/.bash_profile
export JAVA_HOME=/usr/local/src/jdk1.8.0_171 （根据自己的完整路径修改）
export PATH=$PATH:$JAVA_HOME/bin:$JAVA_HOME/jre/bin:$PATH
export CLASSPATH=.:$JAVA_HOME/lib:$JAVA_HOME/jre/lib
alias java=$JAVA_HOME/bin/java # 如果系统已有java，加此行覆盖
```


- 代码

```python
# !pip install py2neo
# coding: utf-8
"""
    Neo4j的python接口测试
    参考:https://blog.csdn.net/macb007/article/details/79044460
    时间：2018-4-23, wangqiwen
"""
#import random
import json
from py2neo import Graph #pylint:disable=import-error
#from py2neo import Graph, Node, Relationship
import numpy as np
import pandas as pd

def main():#pylint:disable=too-many-statements,too-many-branches,too-many-locals
    """
        测试示例, http://10.200.24.101:7474/browser/
    """
    data_file = '新房电子驻场客服-意图体系.csv'
    df = pd.read_csv(data_file)
    data = df.values.tolist()
    # neo4j 初始化
    host = '10.200.24.101'
    graph = Graph("http://%s:7474"%(host), user="neo4j", password="wqw")
    # graph = Graph("http://%s:7474"%(host), username="neo4j", password="wqw") # username参数不再支持
    #(1)创建实体
    #cur_data_list = data['entities'].values.tolist()
    cur_data_list = data

    # 创建节点, 数据示例：[20, 'SALE_INFO', '项目销售信息', 'ONSALE_ROOM', '在售户型']
    cur_type = 'root'; business_info = {"id":"newhouse", "name":"新房电子驻场客服"}
    # 唯一约束(name唯一)
    cql_delete = 'MATCH (n) OPTIONAL MATCH (n)-[r]-() DELETE n,r' #删除所有节点和关系
    graph.run(cql_delete)
    cql_create = 'MERGE(n:%s {id:"%s", name:"%s", type:"%s"})'%(cur_type, business_info['id'], business_info['name'],cur_type)
    graph.run(cql_create)
    for entity in cur_data_list:
        print(json.dumps(entity, ensure_ascii=False))
        # domain节点
        cur_type = 'domain'
        cql_create = 'MERGE(n:%s {id:"%s", name:"%s", type:"%s", business:"%s"})'%(cur_type, entity[1], entity[2],cur_type,business_info['id'])
        graph.run(cql_create)
        # intent节点
        cur_type = 'intent'
        cql_create = 'MERGE(n:%s {id:"%s", name:"%s", type:"%s", business:"%s"})'%(cur_type, entity[3], entity[4],cur_type,business_info['id'])
        graph.run(cql_create)
        # 边 root->domain->intent
        cql_rel = 'MATCH(a {id:"%s"}),(b{id:"%s"})\
            MERGE(a)-[r:%s {name:"%s",id:"%s"}]->(b)'%('newhouse', entity[1], '有', 'has', '有')
        graph.run(cql_rel)
        cql_rel = 'MATCH(a {id:"%s"}),(b{id:"%s"})\
            MERGE(a)-[r:%s {name:"%s",id:"%s"}]->(b)'%(entity[1], entity[3], '包含', 'include', '包含')
        graph.run(cql_rel)
    #result = graph.run('match (n) return n')
    #print(json.dumps(result, ensure_ascii=False))

if __name__ == '__main__':
    main()
```


### Cypher

- Cypher是Neo4j的图形查询语言，允许用户存储和检索图形数据库中的数据。
- 查询语言如下：

```sql
MATCH 
  (person:Person)-[:KNOWS]-(friend:Person)-[:KNOWS]-(foaf:Person)
WHERE 
  person.name = "Joe"
  AND NOT (person)-[:KNOWS]-(foaf)
RETURN
  foaf
```
![](https://s2.ax1x.com/2019/02/21/kRocM8.png)

## JanusGraph

- 一个Linux基金会下的开源分布式图数据库 。JanusGraph提供Apache2.0软件许可证。该项目由IBM、Google、Hortonworks支持。
- JanusGraph是由TitanDB 图数据库修改而来，TitanDB从2012年开始开发。目前最新版本为0.3.1。


## DGraph

- dgraph 是可扩展的，分布式的，低延迟的图数据库。
- DGraph 的目标是提供 Google 生产水平的规模和吞吐量，在超过TB的结构数据里，为用户提供足够低延迟的实时查询。DGraph 支持 [GraphQL](https://www.oschina.net/p/graphql) 作为查询语言，响应 JSON。
- 对比
  - ![](https://static.oschina.net/uploads/space/2017/1119/092808_e1XO_12.jpg)




# 应用案例

## 金融领域知识图谱

- [用Neo4j搭建简单金融知识图谱](https://blog.csdn.net/m0_37565948/article/details/81133041)
- 整体架构
  - 用户问题先进行实体抽取来得到抽取后的问题和实体类型：实体字典
  - 抽取后的问题通过属性映射得到问题模板(编号)
  - 然后用实体类型：实体字典和问题模板(编号)来得到图形数据库相应的查询语言
  - 最后将查询到结果进行语言的上的润色得到相应的答案。
  - ![](https://img2020.cnblogs.com/blog/1598939/202012/1598939-20201222075651213-2120487609.png)
  - ![](https://img2020.cnblogs.com/blog/1598939/202012/1598939-20201220094557833-604139559.png)
  - match (p:企业) where p.name='华为' return p.code 
- neo4j构建一个简单的金融领域的知识图谱，挖掘“高管—上市企业—行业/概念”之间的关系
  - 数据源：[链接](https://pan.baidu.com/s/1I8No_6pAoLYce34eW1tRXg)，密码:h8of
  - csv文件统一放入neo4j的安装目录下的import目录
    - 注意：【2021-2-12】非c盘install，而是document目录，如C:\Users\wqw\Documents\Neo4j\default.graphdb
  - 命令行进入neo4j安装目录下的bin目录，输入命令
    - neo4j-admin import --mode=csv --database=mygraph2.db --nodes ../import/concept.csv --nodes ../import/executive.csv --nodes ../import/industry.csv --nodes ../import/stock.csv --relationships ../import/executive_stock.csv --relationships ../import/stock_concept.csv --relationships ../import/stock_industry.csv
- 示例
  - ![](https://img2020.cnblogs.com/blog/1598939/202012/1598939-20201220092016042-319934592.png)

## [基于BERT的问答系统](https://www.cnblogs.com/Serenaxy/p/14063869.html#%E5%9F%BA%E4%BA%8Ebert%E7%9A%84%E9%97%AE%E7%AD%94%E7%B3%BB%E7%BB%9F)

- 基于知识图谱的问答系统，BERT做命名实体识别和句子相似度，分为online和outline模式
- [知乎帖子地址](https://zhuanlan.zhihu.com/p/62946533)，[代码地址](https://github.com/WenRichard/KBQA-BERT)

## 电影问答系统

- 【2021-2-10】[300行python代码从零开始构建基于知识图谱的电影问答系统](https://blog.csdn.net/xyz1584172808/article/details/89319129)
- 【2021-2-14】[简单构建基于RDF和SPARQL的KBQA（知识图谱问答系统）](https://www.cnblogs.com/whiterock/p/9522821.html)
  - 流程
    1. 预定义 3 ​类共 5 ​个示例问题，​包括：
      - ● "谁是苑茵?",
      - ● "丁洪奎是谁?",
      - ● "苏进木来自哪里?",
      - ● "苑茵哪个族的?",
      - ● "苑茵是什么民族的人?".
    1. 利用结巴分词对中文句子进行分词, ​同时进行词性标注；
    2. 将词的文本和词性打包, ​视为"词对象"，对应 :class:Word(token,​ ​pos)​；
    3. 利用 REfO ​模块对词进行对象级别 (object-level) ​的正则匹配，判断问题属于的​种类​并产生对应的 SPARQL，对应 :class:Rule(condition,​ ​action)​；
    4. 如果成功匹配并成功产生 SPARQL ​查询语句, ​立刻请求 Fuseki ​服务并返回结果，打印相关内容；
  - 安装
    - 1、配置第三方库：pip install refo jieba sparqlwrapper
    - 2、安装JAVA JDK1.8，配置好环境变量。
    - 3、项目根目录主要包括backend​​文件夹和test.py文件（同一级），backend是Jena​的Fuseki 模块，​运行第4步后在本地监听(http://localhost:3030/)，如图：
      - ![](https://images2018.cnblogs.com/blog/1177970/201808/1177970-20180823111745754-547513861.jpg)

### User Simulator

- 用户模拟器采用了agenda-based的方式来构建。将用户状态存入栈中，维护用户的对话历史和对话目标，状态的更新即为栈的push 和 pop操作。
- 对话成功的标志为： 是否电影票成功预订；是否推荐的电影满足用户的条件限制
  - 用户目标一般由两部分组成：
    - inform slot：一组给定的slot-value 对，认为是 user 的对整个会话进程的约束。
      - 必须存在这些slot：movie_name, theater, start_time, date, number_of_people 槽位。（如果没有这些槽位就无法订票）
    - request slot：slot的value值，user 是不知道的，需要与 agent 交互中获得答案。
      - 必须存在slot：ticket。（这个槽位表示用户的订票请求，这本身是电影订票任务的目标）
- 数据集构建
  - 构造用户目标数据集方法：论文采用了两个机制，从标注数据集中生成用户目标：
  - 通常来讲，用户的第一轮内容中包含一部分，甚至所有的用户要求。
  - 第一个机制是提取用户第一轮的所有slot信息(注：不包括greeting 轮)。
  - 另一个机制是提取首先出现在所有用户轮中的所有slot。
  - 然后将它们整合到一个用户目标中。
- 论文的数据从 Amazon Mechanical Turk 收集而来，收集了大概280组对话，平均轮数为11。
  - 设定了11个意图：'request', 'inform', 'confirm_question', 'confirm_answer', 'greeting', 'closing', 'multiple_choice', 'thanks', 'welcome', 'deny', 'not_sure'
  - 29个槽位：'actor', 'actress', 'city', 'closing', 'critic_rating', 'date', 'description', 'distanceconstraints', 'genre', 'greeting', 'implicit_value', 'movie_series', 'moviename', 'mpaa_rating', 'numberofpeople', 'numberofkids', 'taskcomplete', 'other', 'price', 'seating', 'starttime', 'state', 'theater', 'theater_chain', 'video_format', 'zip', 'result', 'ticket', 'mc_list'
- 对话状态有三种情况：
  - no_outcome_yet：是指agent没有 inform(task_comlete)，并且轮数还没有达到最大。
  - success：agent 在最大轮数内，必须回答了所有的user 的request，并且订了一张正确的电影票。
  - failure：其他的情况都为失败。
- 用户模拟器可以被设计可以为 dialog act level（输出到agent结构化的语义解析信息），也可以为utterance level的（输出到agent自然语言形式）。后者需要NLG。由于数据集的限制，纯使用模型会给DM 策略选择带来许多噪声。因此采用了模型、模板相结合的方式(策略是先模板后模型)：
  - Template-based NLG：定义NLG模板
  - Model-based NLG：输入为 dialog-act，输出为带slot标签的句子，（如：我希望电影从{start-time}开始），之后再进行替换。decoder采用beam search n取值为3 。（DM训练可以将beam search n=3 的句子作为输入噪声。）
- 如何衡量代理的质量，有三个指标：
  - success rate (任务完成率)
  - average reward
  - average turns
- 一般来说，一个好的政策应该有较高的任务完成率、较高的平均奖励和较低的平均轮数。可以选择成功率作为主要的评估指标来评价agent的效果。
- 代码
  - 前端：[chatbot_with_IR](https://github.com/IrvingBei/chatbot_with_IR)
  - 后端：[simple_movie_qa_with_KG](https://github.com/IrvingBei/simple_movie_qa_with_KG)
- 效果图
  - ![](https://img-blog.csdnimg.cn/20190415192606960.gif)

### [系统的整体逻辑是怎么样的？（系统业务逻辑介绍）](https://blog.csdn.net/xyz1584172808/article/details/89336478)

- 准备工作：
  - 环境：Python 3.6，基于webpy库，图数据库neo4j
    - pip install -r requirements.txt
  - 数据：数据来源于IMDB数据库，这是一个关于电影演员、电影、电视节目、电视明星和电影制作的在线数据库。
    - 格式：
      - ![](https://img-blog.csdnimg.cn/20190506204109978.png)
    - [链接](https://pan.baidu.com/s/1HgjZFQ7q4V_8EzzjNmMwwQ)，提取码：7qv1
    - 把数据csv文件放入neo4j安装目录下的import目录下即可
      - E:\neo4j-community-3.5.3-windows\neo4j-community-3.5.3\import
- 系统整体框架
  - ![](https://img-blog.csdnimg.cn/20190416143958243.png)
- 问题预处理（NLU）
  - NER：提取关键信息，主语是人还是电影，这就涉及到自然语言处理中的命名实体识别；
    - 对query进行词性标注后，找到对应的nr对应的单词，即人名，电影名称
  - 意图识别：用户想问什么，文本表示问题，最最基本的文本表示方法是one-hot形式，在试验中使用的是sklearn中的tfidf工具
    - 分类：用监督学习方法识别用户意图，需要提前准备语料，用户的问题归纳成了很多类，对各个类别进行抽象，比如对于用户询问某某演过哪些电影等一系列问题，抽象成：*nr 电影作品*
- 问题模板
  - 用户各种问题的模板（nm代表电影名称，ng代表电影类型）
- 查询答案
  - 如何对图数据库进行操作
  - 示例：*刘德华演过哪些电影呀？*
  - 获取关键信息：*刘德华*
  - 问题分类得到问题模板：*7:nnt 电影作品*
  - 进行替换得到新的问题：*刘德华 电影作品*

### [需要做那些准备工作？（实验环境和实验数据准备）](https://blog.csdn.net/xyz1584172808/article/details/89891248)

```shell
# 用户各种问题的模板（nm代表电影名称，ng代表电影类型）
0:nm 评分
1:nm 上映时间
2:nm 类型
3:nm 简介
4:nm 演员列表
5:nnt 介绍
6:nnt ng 电影作品
7:nnt 电影作品
8:nnt 参演评分 大于 x
9:nnt 参演评分 小于 x
10:nnt 电影类型
11:nnt nnr 合作 电影列表
12:nnt 电影数量
13:nnt 出生日期
```

- 图数据库代码
  - 逐条执行，不能一次性输入

```sql
//导入节点 电影类型  == 注意类型转换
LOAD CSV WITH HEADERS  FROM "file:///genre.csv" AS line
MERGE (p:Genre{gid:toInteger(line.gid),name:line.gname})

//导入节点 演员信息	
LOAD CSV WITH HEADERS FROM 'file:///person.csv' AS line
MERGE (p:Person { pid:toInteger(line.pid),birth:line.birth,
death:line.death,name:line.name,
biography:line.biography,
birthplace:line.birthplace})
// 导入节点 电影信息
LOAD CSV WITH HEADERS  FROM "file:///movie.csv" AS line  
MERGE (p:Movie{mid:toInteger(line.mid),title:line.title,introduction:line.introduction,
rating:toFloat(line.rating),releasedate:line.releasedate})
// 导入关系 actedin  电影是谁参演的 1对多
LOAD CSV WITH HEADERS FROM "file:///person_to_movie.csv" AS line 
match (from:Person{pid:toInteger(line.pid)}),(to:Movie{mid:toInteger(line.mid)})  
merge (from)-[r:actedin{pid:toInteger(line.pid),mid:toInteger(line.mid)}]->(to)
//导入关系  电影是什么类型 == 1对多
LOAD CSV WITH HEADERS FROM "file:///movie_to_genre.csv" AS line
match (from:Movie{mid:toInteger(line.mid)}),(to:Genre{gid:toInteger(line.gid)})  
merge (from)-[r:is{mid:toInteger(line.mid),gid:toInteger(line.gid)}]->(to)
```


### [接收到用户的问题后需要怎么处理用户问题？（用户问题预处理）](https://blog.csdn.net/xyz1584172808/article/details/89914745)

- 词性标注
  - jieba的词性标注和分词是同步进行的，所以如果分词不准确的话，那么词性标注往往也会出错
  - 比如说电影《卧虎藏龙》，被jieba分词分为：卧虎，藏龙
  - 解决：自定义字典
    - 卧虎藏龙 15 nm
    - 陈雅伦 15 nr

```python
def question_posseg(self):
    jieba.load_userdict("./data/userdict3.txt")
    clean_question = re.sub("[\s+\.\!\/_,$%^*(+\"\')]+|[+——()?【】“”！，。？、~@#￥%……&*（）]+","",self.raw_question)
    self.clean_question=clean_question
    question_seged=jieba.posseg.cut(str(clean_question))
    result=[]
    question_word, question_flag = [], []
    for w in question_seged:
        temp_word=f"{w.word}/{w.flag}"
        result.append(temp_word)
        # 预处理问题
        word, flag = w.word,w.flag
        question_word.append(str(word).strip())
        question_flag.append(str(flag).strip())
    assert len(question_flag) == len(question_word)
    self.question_word = question_word
    self.question_flag = question_flag
    print(result)
    return result
```

- 问题分类和模板填充

```python
# 获取训练数据
def read_train_data(self):
    train_x=[]
    train_y=[]
    file_list=getfilelist("./data/question/")
    # 遍历所有文件
    for one_file in file_list:
        # 获取文件名中的数字
        num = re.sub(r'\D', "", one_file)
        # 如果该文件名有数字，则读取该文件
        if str(num).strip()!="":
            # 设置当前文件下的数据标签
            label_num=int(num)
            # 读取文件内容
            with(open(one_file,"r",encoding="utf-8")) as fr:
                data_list=fr.readlines()
                for one_line in data_list:
                    word_list=list(jieba.cut(str(one_line).strip()))
                    # 将这一行加入结果集
                    train_x.append(" ".join(word_list))
                    train_y.append(label_num)
    return train_x,train_y

# 贝叶斯分类模型
# 训练并测试模型-NB
def train_model_NB(self):
    X_train, y_train = self.train_x, self.train_y
    self.tv = TfidfVectorizer()

    train_data = self.tv.fit_transform(X_train).toarray()
    clf = MultinomialNB(alpha=0.01)
    clf.fit(train_data, y_train)
    return clf
# 预测
def predict(self,question):
    question=[" ".join(list(jieba.cut(question)))]
    test_data=self.tv.transform(question).toarray()
    y_predict = self.model.predict(test_data)[0]
    # print("question type:",y_predict)
    return y_predict
```

- 返回用户问题所属的类别编号，这个编号也就对应一个问题模板：

```shell
0:nm 评分
1:nm 上映时间
2:nm 类型
3:nm 简介
4:nm 演员列表
5:nnt 介绍
6:nnt ng 电影作品
7:nnt 电影作品
8:nnt 参演评分 大于 x
9:nnt 参演评分 小于 x
10:nnt 电影类型
11:nnt nnr 合作 电影列表
12:nnt 电影数量
13:nnt 出生日期
```

### [如果根据用户问题来查找答案？（答案获取）](https://blog.csdn.net/xyz1584172808/article/details/89947813)

- 得到了这些信息后，如何在知识图谱中查询答案。
- 简单来说，每个问题模板就对应了一个用户意图，那么就按照每个意图来写查询语句
- 定义了一个问题模板的方法字典，每一个key对应模板的编号，value就是根据该模板来查询答案的方法

```python
self.q_template_dict={
            0:self.get_movie_rating,
            1:self.get_movie_releasedate,
            2:self.get_movie_type,
            3:self.get_movie_introduction,
            4:self.get_movie_actor_list,
            5:self.get_actor_info,
            6:self.get_actor_act_type_movie,
            7:self.get_actor_act_movie_list,
            8:self.get_movie_rating_bigger,
            9:self.get_movie_rating_smaller,
            10:self.get_actor_movie_type,
            11:self.get_cooperation_movie_list,
            12:self.get_actor_movie_num,
            13:self.get_actor_birthday
        }

def get_question_answer(self,question,template):
    # 如果问题模板的格式不正确则结束
    assert len(str(template).strip().split("\t"))==2
    template_id,template_str=int(str(template).strip().split("\t")[0]),str(template).strip().split("\t")[1]
    self.template_id=template_id
    self.template_str2list=str(template_str).split()

    # 预处理问题
    question_word,question_flag=[],[]
    for one in question:
        word, flag = one.split("/")
        question_word.append(str(word).strip())
        question_flag.append(str(flag).strip())
    assert len(question_flag)==len(question_word)
    self.question_word=question_word
    self.question_flag=question_flag
    self.raw_question=question
    # 根据问题模板来做对应的处理，获取答案
    answer=self.q_template_dict[template_id]()
    return answer


```

- 进入到对应的方法中，利用Cypher语言来构建查询语句
  - 基本形式：match(n)-[r] -(b)
  - 直接使用python的库py2neo来操作图数据库neo4j

```python
from py2neo import Graph,Node,Relationship,NodeMatcher

class Query():
    def __init__(self):
        self.graph=Graph("http://localhost:7474", username="neo4j",password="123456")

    # 问题类型0，查询电影得分
    def run(self,cql):
        # find_rela  = test_graph.run("match (n:Person{name:'张学友'})-[actedin]-(m:Movie) return m.title")
        result=[]
        find_rela = self.graph.run(cql)
        for i in find_rela:
            result.append(i.items()[0][1])
        return result
# 查询演员
# 4:nm 演员列表
def get_movie_actor_list(self):
    movie_name=self.get_movie_name()
    cql = f"match(n:Person)-[r:actedin]->(m:Movie) where m.title='{movie_name}' return n.name"
    print(cql)
    answer = self.graph.run(cql)
    answer_set = set(answer)
    answer_list = list(answer_set)
    answer = "、".join(answer_list)
    final_answer = movie_name + "由" + str(answer) + "等演员主演！"
    return final_answer

```




# 结束


