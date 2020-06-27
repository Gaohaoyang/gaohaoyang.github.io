---
layout: post
title:  "知识图谱-Knowledge-Graph"
date:   2020-06-23 21:14:00
categories: 自然语言处理
tags: 深度学习 NLP KG KB-QA
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

## 定义

- 定义[Wang, 2017]： 
  - 知识图谱是由`实体`和`关系`构成的`多关系图`，实体和关系分别被视为节点和不同类型的边。
> A knowledge graph is a multirelational graph composed of entities and relations which are regarded as nodes and different types of edges, respectively.
- 形式化定义： 
> A knowledge graph as G = {E, R, F}, where E, R and F are sets of entities, relations and facts, respectively. A fact is denoted as a triple (h, r, t) ∈ F。

- 摘自：[戴帅湘：NLP的发展和应用](https://mp.weixin.qq.com/s?__biz=MzIyNTk1OTY5NQ==&mid=2247483751&idx=1&sn=e8af45990756375f8f3bb42e841a0e91&chksm=e8768b07df0102116fd449b4e685086b25922a6a9436fe5f05490a152fa579ecf9bb05db81cf&mpshare=1&scene=23&srcid=&sharer_sharetime=1593153276858&sharer_shareid=b8d409494a5439418f4a89712efcd92a#rd)

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


## 知识抽取

非结构化（纯文本）知识抽取分三个任务： 
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


# KB-QA




# 资料

- 更多[Demo地址](http://wqw547243068.github.io/demo)

# 结束


