---
layout: post
title:  "机器阅读理解-Machine-Reading-Comprehension"
date:   2021-03-28 00:00:00
categories: 自然语言处理 
tags:  阅读理解 神经网络
excerpt: 机器阅读理解笔记
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

- 【2021-3-29】机器阅读理解综述（一）
- 【2021-3-14】机器阅读理解（Machine Reading Comprehension，MRC）是一种利用算法使计算机理解文章语义并回答相关问题的技术。学者 C. Snow 在 2002 年的一篇论文中定义阅读理解是“通过交互从书面文字中提取与构造文章语义的过程”。而机器阅读理解的目标是利用人工智能技术，使计算机具有和人类一样理解文章的能力。
  - 机器阅读理解任务样例
  - ![](https://oscimg.oschina.net/oscnet/up-df08aa492c833ac4e2dadc30e01976e24d3.png)
- 大部分机器阅读理解任务采用问答式测评：设计与文章内容相关的自然语言式问题，让模型理解问题并根据文章作答。
- [在阅读理解这件事上，AI已甩人类几条街？](https://www.huxiu.com/article/233577.html)
   - 机器在阅读理解的评分上超过人类，也许是NLP发展历程上的一次重大突破，意味着机器在“指标”上对人类的胜利，机器也确实可以在限定场景下有超过人类的表现。但这终究是一场“指标性”胜利，想要做到能理解会思考，机器还有“万里长征路”要走。
- [斯坦福陈丹琦博士论文-156页PDF讲解【神经网络阅读理解】](https://zhuanlan.zhihu.com/p/52622693)
- 【2021-1-14】[美团智能问答技术探索与实践](https://mp.weixin.qq.com/s?__biz=MzU1NTMyOTI4Mw==&mid=2247517833&idx=1&sn=0cb67429fa434d3dcd5afd6167754313&chksm=fbd734e5cca0bdf3f0cf43b588153d8117dec25d130240dcb9c42d5219cd94b972e463b55063&mpshare=1&scene=1&srcid=1221TKOk0XWVMxG3wT9wowUP&sharer_sharetime=1610600327445&sharer_shareid=b8d409494a5439418f4a89712efcd92a&version=3.1.0.6189&platform=mac#rd)
   - 近年来基于深度神经网络的**机器阅读理解** ( Machine Reading Comprehension，MRC ) 技术得到了快速的发展，逐渐成为问答和对话系统中的关键技术。MRC模型以问题和文档为输入，通过阅读文档内容预测问题的答案。
   - 根据需要预测的答案形式不同，阅读理解任务可以分为
      - **填空式** ( Cloze-style )
      - **多项选择式** ( Multi-choice )
      - **片段提取式** ( Span-extraction ) 
      - **自由文本** ( Free-form )
   - 在实际问答系统中最常使用的是片段提取式阅读理解 ( MRC )，该任务需要从文档中提取连续的一段文字作为答案。
   - 最具影响力的片段提取式MRC公开数据集有SQuAD和MSMARCO等，这些数据集的出现促进了MRC模型的发展。
   - 在模型方面，深度神经网络结构被较早的应用到了机器阅读理解任务中，并采用基于边界预测(boundary-based prediction)方式解决片段提取式阅读理解任务。这些模型采用多层循环神经网络+注意力机制的结构获得问题和文档中每个词的上下文向量表示，在输出层预测答案片段的起始位置和终止位置。近年来预训练语言模型如BERT，RoBERTa和XLNet等在众多NLP任务上取得突破性进展，尤其是在阅读理解任务上。这些工作在编码阶段采用Transformer结构获得问题和文档向量表示，在输出层同样采用边界预测方式预测答案在文档中的位置。目前在单文档阅读理解任务SQuAD上，深度神经网络模型的预测EM/F1指标已经超越了人类标注者的水平，说明了模型在答案预测上的有效性。
   - Document QA借助机器阅读理解 ( MRC ) 技术，从非结构化文档中抽取片段回答用户问题。在问答场景中，当用户输入问题后，问答系统首先采用信息检索方式从商户详情或诸多UGC评论中查找到相关文档，再利用MRC模型从文档中摘取能够确切回答问题的一段文本。美团和大众点评上商户的简介攻略、UGC评论均有专业内容运营团队，可以产生内容优质、高可信度的答案，应用机器阅读理解技术直接从文档中提取答案，不需要人工维护意图类目，可以在不同业务领域灵活迁移，人工维护成本小。
   - 机器阅读理解模型
   - 深度神经网络结构较早的应用到机器阅读理解任务，代表性的包括Bi-DAF、R-NET、QANet、BERT等。这些模型均采用多层循环神经网络或Transformer加注意力机制等方式来解决问题和文档的上下文向量表示，最后通过边界预测来获取答案片段的起始和结束位置。我们选择表现最好的BERT模型进行相应任务的建模，将问题和文档作为输入，预测在文档中的起始位置和结束位置，将最大可能的起始位置和结束位置之间的片段抽取出来，作为答案。
   - 文档问答系统的答案预测流程包含三个步骤：
      - (1) **文档检索与选择** ( Retriever )：根据Query关键字检索景点等商户下的相关详情和UGC评论，根据相关性排序，筛选出相关的评论用于提取候选答案；
      - (2) **候选答案提取** ( Reader )：利用MRC模型在每个相关评论上提取一段文字作为候选答案，同时判断当前评论是否有答案，预测有答案和无答案的概率；
      - (3) **答案排序** ( Ranker )：根据候选答案的预测得分排序。这样能够同时处理多篇相关评论，比较并选择最优答案，同时根据无答案概率和阈值判断是否拒绝回答，避免无答案时错误回答。
   - 模型框架首先建模成Multi-Task架构，所有领域数据训练出一个共享参数，解决新领域与冷启动的问题，同时不同的领域，也会得到各自领域的参数，提升各自领域效果。除此之外，也发现只计算用户的Query和问答对里问题的相似度，是不太够的。答案往往也能帮助我们更好的去理解问题。上图中"还营业吗现在"的问题，语义上"正常营业吗？"比"关门了吗？"更相关，但从答案"肺炎期间闭园不营业"和"没去过"中很容易辨识出第一条答案更相关。因此建模时我们将答案也考虑进去，采用Multi-Field框架。最终我们的模型为Multi-Field Multi-Task RoBERTa模型。
   - 主流的KBQA解决方案包括基于**查询图**方法 ( Semantic Parser )、基于**搜索排序**方法 ( Information Retrieval )。
   - 查询图方案核心思路就是将自然语言问题经过一些语义分析方式转化成中间的语义表示 ( Logical Forms )，然后再将其转化为可以在 KG 中执行的描述性语言 ( 如 SPARQL 语言 ) 在图谱中查询，这种方式优势就是可解释强，符合知识图谱的显示推理过程。
   - 搜索排序方案首先会确定用户Query中的实体提及词 ( Entity Mention )，然后链接到 KG 中的主题实体 ( Topic Entity )，并将与Topic Entity相关的子图 ( Subgraph ) 提取出来作为候选答案集合，通过对Query以及Subgraph进行向量表示并映射到同一向量空间，通过两者相似度排序得到答案。这类方法更偏向于端到端的解决问题，但在扩展性和可解释性上不如查询图方案。在美团场景里我们采用以Semantic Parser方法为主的解决方案。

# 简介

- 机器阅读理解包括 4 种比较常见的任务：完形填空，多项选择，片段抽取，自由作答。
   - `完形填空`：在文章中隐藏一些单词，然后预测被隐藏的单词。
   - `多项选择`：给定一个问题、一段背景文字和一些候选答案，让模型判断哪些是正确答案。
   - `片段抽取`：给定一个问题、一段背景文字，从文本中抽取出一些单词，作为答案。
   - `自由作答`：给定一个问题、一段背景文字，生成单词序列作为答案。
- 多项选择和完形填空属于客观类答案，测评时可以将模型答案直接与正确答案比较，并以准确率作为评测标准，易于计算。
- [A Gentle Introduction to Text Summarization in Machine Learning](https://blog.floydhub.com/gentle-introduction-to-text-summarization-in-machine-learning/)

# 分类

阅读理解技术方案分类：
- （1）**提取式** Extraction-based summarization
   - ![](https://blog.floydhub.com/content/images/2019/04/extractive.gif)
- （2）**生成式** Abstraction-based summarization
   - ![](https://blog.floydhub.com/content/images/2019/04/Screenshot-2019-04-12-at-17.45.04.png)
- （3）**组合** ——综合以上两种方法
   - the pointer-generator network that gets the best of both worlds by combining both extraction(pointing) and abstraction(generating)
   - ![](https://blog.floydhub.com/content/images/2019/04/coverage.gif)

- [阅读理解进阶三部曲——关键知识、模型性能提升、产品化落地](https://www.toutiao.com/i6630964969640821262/?tt_from=mobile_qq&utm_campaign=client_share&timestamp=1544680034&app=news_article&utm_source=mobile_qq&iid=53104048203&utm_medium=toutiao_android&group_id=6630964969640821262)

## 评估方法 Evaluation Metrics

- 主流方法
   - Accuracy：完形填空、多项选择
   - F1：
   - ROUGE-L
   - BLEU

## 完形填空 Cloze Test
 
给定上下文 ![[公式]](https://www.zhihu.com/equation?tex=C) ，一个词或实体 ![[公式]](https://www.zhihu.com/equation?tex=a%28a%5Cin+C%29) 被移除，完形填空任务要求模型使用正确的词或实体进行填空，最大化条件概率 ![[公式]](https://www.zhihu.com/equation?tex=P%28a%7CC+%E2%88%92+%5C%7Ba%5C%7D%29) 。
- 数据集：CNN & Daily Mail 、CBT、LAMBADA、Who-did-What、CLOTH、CliCR
 
![](https://pic2.zhimg.com/80/v2-427fab0f389e2af7aca82a7dd00b3ab1_1440w.jpg)
 
## 多项选择 Multiple Choice
 
给定上下文 ![[公式]](https://www.zhihu.com/equation?tex=C) ，问题 ![[公式]](https://www.zhihu.com/equation?tex=Q) ，候选答案列表 ![[公式]](https://www.zhihu.com/equation?tex=A%3D%5C%7Ba_1%2Ca_2%2C...%2Ca_n%5C%7D) ，多项选择任务要求模型从A中选择正确的答案 ![[公式]](https://www.zhihu.com/equation?tex=a_i) ，最大化条件概率 ![[公式]](https://www.zhihu.com/equation?tex=P%28a_i%7CC%2CQ%2CA%29) 。与完形填空任务的区别就是答案不再局限于单词或实体，并且候选答案列表是必须要提供的。
 
- 数据集：MCTest、RACE
 
![](https://pic4.zhimg.com/80/v2-ae829c393644acd934125e1d92a740f7_1440w.jpg)
 
## 片段抽取 Span Extraction
 
尽管完形填空和多项选择一定程度上可以机器阅读理解的能力，但是这两个任务有一定的局限性。
- 首先，**单词或实体可能不足**以回答问题，需要完整的句子进行回答；
- 其次，在很多情形是**没有候选答案**的。所以片段抽取任务应运而生。
 
给定上下文 ![[公式]](https://www.zhihu.com/equation?tex=C) 和问题 ![[公式]](https://www.zhihu.com/equation?tex=Q) ，其中 ![[公式]](https://www.zhihu.com/equation?tex=C%3D%5C%7Bt_1%2Ct_2%2C...%2Ct_n%5C%7D) ，片段抽取任务要求模型从C中抽取连续的子序列 ![[公式]](https://www.zhihu.com/equation?tex=a%3D%5C%7Bt_i%2Ct_%7Bi%2B1%7D%2C...%2Ct_%7Bi%2Bk%7D%5C%7D%281%5Cleq+i%5Cleq+i%2Bk%5Cleq+n%29) 作为正确答案，最大化条件概率![[公式]](https://www.zhihu.com/equation?tex=P%28a%7CC%2CQ%29) 。
 
- 数据集：SQuAD、NewsQA、TriviaQA、DuoRC
 
![](https://pic1.zhimg.com/80/v2-0bd4ad87a3a13cb6191223872ecbb598_1440w.jpg)
 
## 自由作答 Free Answering
 
对于答案**局限于一段上下文**是不现实的，为了回答问题，机器需要在**多个上下文中进行推理并总结**答案。自由回答任务是四个任务中最复杂的，也更适合现实的应用场景。
 
给定上下文C和问题Q，在自由回答任务中正确答案可能不是C中的一个子序列， ![[公式]](https://www.zhihu.com/equation?tex=a%5Csubseteq+C) 或 ![[公式]](https://www.zhihu.com/equation?tex=a%5Cnsubseteq+C) ，自由回答任务需要预测正确答案a，并且最大化条件概率![[公式]](https://www.zhihu.com/equation?tex=P%28a%7CC%2CQ%29) 。
 
- 数据集：bAbI、MS MARCO 、SearchQA、NarrativeQA、DuReader
 
![](https://pic4.zhimg.com/80/v2-dd065ba9a3f54f2a1b66e25faa233a63_1440w.jpg)



# 框架 General Architecture

- 早期的阅读理解模型大多基于检索技术，即根据问题在文章中进行搜索，找到相关的语句作为答案。但是，信息检索主要依赖关键词匹配，而在很多情况下，单纯依靠问题和文章片段的文字匹配找到的答案与问题并不相关。
- 随着深度学习的发展，机器阅读理解进入了神经网络时代。相关技术的进步给模型的效率和质量都带来了很大的提升。机器阅读理解模型的准确率不断提高，在一些数据集上已经达到或超过了人类的平均水平。
- 基于深度学习的机器阅读理解模型虽然构造各异，但是经过多年的实践和探索，逐渐形成了稳定的框架结构。
  - 机器阅读理解模型的输入为文章和问题。
  - 首先对这两部分进行数字化编码，变成可以被计算机处理的信息单元。
  - **编码层**：编码过程中，模型需要保留原有语句在文章中的语义。每个单词、短语和句子的编码必须建立在理解上下文的基础上。
  - **交互层**：由于文章和问题之间存在相关性，模型需要建立文章和问题之间的联系。如问题中出现关键词“河流”，而文章中出现关键词“长江”，虽然两个词不完全一样，但是其语义编码接近。阅读理解模型将文章和问题的语义结合在一起进行考量，进一步加深模型对于两者各自的理解。
  - **输出层**：模型建立起文章和问题之间的语义联系，就可以预测问题的答案。完成预测功能的模块称为输出层。由于机器阅读理解任务的答案有多种类型，因此输出层的具体形式需要和任务的答案类型相关联。此外，输出层需要确定模型优化时的评估函数和损失函数。
- 机器阅读理解模型的一般架构。机器阅读理解模型的总体架构，输出层以区间式答案为例
  - ![](https://oscimg.oschina.net/oscnet/up-ae0c75f0faa9f6cfb5b00ee8940f98ca74e.JPEG)
- 可以看出，编码层用于对文章和问题分别进行底层处理，将文本转化成为数字编码。交互层可以让模型聚焦文章和问题的语义联系，借助于文章的语义分析加深对问题的理解，同时也借助于问题的语义分析加深对文章的理解。输出层根据语义分析结果和答案的类型生成模型的答案输出。


【2021-3-29】机器阅读理解综述[（一）](https://zhuanlan.zhihu.com/p/80905984)，[（二）](https://zhuanlan.zhihu.com/p/80980403)，[（三）](https://zhuanlan.zhihu.com/p/81126870)

典型的MRC系统以上下文和问题为输入，然后输入答案，系统包含四个关键模块：Embeddings, Feature Extraction, Context-Question Interaction，Answer Prediction。
*   **Embeddings**：将单词映射为对应的词向量，可能还会加上POS、NER、question category等信息；
*   **Feature Extraction**：抽取question和context的上下文信息，可以通过CNN、RNN等模型结构；
*   **Context-Question Interaction**：context和question之间的相关性在预测答案中起着重要作用。有了这些信息，机器就能够找出context中哪些部分对回答question更为重要。为了实现该目标，在该模块中广泛使用attention机制，单向或双向，以强调与query相关的context的部分。为了充分提取它们的相关性，context和question之间的相互作用有时会执行多跳，这模拟了人类理解的重读过程。
*   **Answer Prediction**：基于上述模块获得的信息输出最终答案。因为MRC任务根据答案形式分为了很多种，所以该模块与不同任务相关。对于完形填空，该模块输出context中的一个单词或一个实体；对于多项选择，该模块从候选答案中选择正确答案。
 
![](https://pic3.zhimg.com/80/v2-239d4adc691bad54ef41c68a4d4aef62_1440w.jpg)

## 方法 Methods
 
有各种各样的方法应用到MRC系统中，如下图所示，接下来会一一介绍。
 
![](https://pic3.zhimg.com/80/v2-f3427b1b1a004102422218690b6fc35a_1440w.jpg)
 
### Embeddings

Embeddings模块将单词转换为对应的向量表示。如何充分编码context和question是本模块中的关键任务。在目前的MRC模型中，词表示方法可以分为传统的词表示和预训练上下文表示。为了编码更丰富的语义信息，MRC系统在原来的词级别表示的基础上，还会融合字向量、POS、NER、词频、问题类别等信息。

(1) 传统表示方法 Conventional Word Representation
 
*   One-Hot：向量长度为词表大小，只有单词的位置为1，其它全0，这种表示方法无法表示两个单词之间的关系；
*   Distributed Word Representation：将单词编码为连续的低维向量，如word2vec、glove；
 
(2) 预训练表示方法 Pre-Trained Contextualized Word Representation
 
尽管分布式词表示可以在编码低维空间中编码单词，并且反映了不同单词之间的相关性，但是它们不能有效地挖掘上下文信息。具体来说，就是词的分布式表示在不同上下文中都是一个常量。为了解决这个问题，研究学者提出了上下文的词表示，在大规模数据集预训练，直接当做传统的词表示来使用或者在特定任务finetune。
 
*   CoVE：利用大规模语料训练Seq2Seq模型，将Encoder的输出拿出来作为CoVE。
*   ELMo：在大规模文本语料预训练双向语言模型，特征抽取模块为LSTM。
*   GPT：采用单向的Transformer在大规模语料上预训练；
*   BERT：采用双向的Transformer在大规模语料上预训练，目标任务为masked language model (MLM)和next sentence prediction（NSP）。
 
(3) 多粒度表示 Multiple Granularity
 
*   Character Embeddings
*   Part-of-Speech Tags
*   Name-Entity Tags
*   Binary Feature of Exact Match (EM)：如果context中的一个单词在query中存在，那么值为1，否则为0；
*   Query-Category
    
 
### Feature Extraction
 
*   Recurrent Neural Networks：LSTM、GRU
 
![](https://pic1.zhimg.com/80/v2-a9b2655f7e7c4889caa126f14d6e02a8_1440w.jpg)
 
*   Convolution Neural Networks

![](https://pic2.zhimg.com/80/v2-258109c3abbf740b65ff11a3d56ac18d_1440w.jpg)
 
*   Transformer
 
![](https://pic2.zhimg.com/80/v2-c51e818d6d8e98d5883fa3cf471d0ad9_1440w.jpg)
 
### Context-Question Interaction
 
通过提取context和question之间的相关性，模型能够找到答案预测的证据。根据模型是如何抽取相关性的方式，目前的工作可以分为两类，一跳交互和多条交互。无论哪种交互方式，在MRC模型中，attention机制在强调context哪部分信息在回答问题方面更重要发挥着关键作用。在机器阅读理解中，attention机制可以分为无向和双向的。
 
(1a) Unidirectional Attention
 
单向的attention主要是根据问题关注context中最相关的部分。如果context中的单词与问题更相似，那么该单词更可能是答案。通过计算公式 ![[公式]](https://www.zhihu.com/equation?tex=S_i%3Df%28P_i%2CQ%29) 得到context中的单词与question的相似度，其中 ![[公式]](https://www.zhihu.com/equation?tex=P_i) 是context中的单词的embedding，Q是question的句子表示，最后通过softmax进行权重归一化，如下公式所示。
 
![[公式]](https://www.zhihu.com/equation?tex=%5Calpha_i%3D%5Cfrac%7BexpS_i%7D%7B%5Csum_%7Bj%7D%7BexpS_j%7D%7D)
 
其中 ![[公式]](https://www.zhihu.com/equation?tex=S_i) 的计算方式有很多种，如下所示。
 
![[公式]](https://www.zhihu.com/equation?tex=S_i%3Dtanh%28W_PP_i%2BW_QQ%29)
 
![[公式]](https://www.zhihu.com/equation?tex=S_i%3DQ%5ETW_sP_i)
 
单向的attention可以关注context中最重要的词来回答问题，但是该方法无法关注对答案预测也至关重要的question的词。因此，单向的attention不足以抽取context和query之间的交互信息。
 
(1b) Bidirectional Attention
 
同时计算query-to-context attention和context-to-query attention。
 
![](https://pic4.zhimg.com/80/v2-360629828100eb8cd2337bd86c05be93_1440w.jpg)
 
(2) One-Hop Interaction & Multi-Hop Interaction
 
One-Hop Interaction可能无法全面理解相互question-context信息，与此相反，Multi-Hop Interaction可以记住之前的context和question信息，能够深度提取相关性并聚合答案预测的证据。
 
### Answer Prediction
 
该模块与任务高度相关，之前我们将MRC分为四类，分别是完形填空、多项选择、片段抽取、自由回答，那么对应的答案预测方法也有四种，分别是word predictor，option selector，span extractor，answer generator。
 
(1) Word Predictor
 
完形填空要求模型预测单词或实体进行填空，该单词或实体来自给定的context。这方面的工作有Attentive Reader、Attention Sum Reader
 
(2) Option Selector
 
对于多项选择任务，模型从候选答案列表中选择一个正确答案。很普遍的做法是衡量attentive context representations和候选答案表示之间的相似度，选择相似度最高的作为预测答案。
 
(3) Span Extractor
 
片段抽取任务是完形填空任务的扩展，要求模型从context中抽取一个子串，而不是一个单词。目前的工作有Sequence Model、Boundary Model。
 
(4) Answer Generator
 
自由回答任务中答案不再局限于context中的一个片段，而是需要根据context和question合成答案。目前的工作有S-Net。
 
### Other Tricks
 
- (1) Reinforcement Learning
- (2) Answer Ranker
- (3) Sentence Selector
 
实际上，如果给MRC模型一个很长的文档，那么理解全部上下文来回答问题是很费时的。但是，事先找到问题中最相关的句子是加速后续训练过程的一种可能方法。有研究学者提出了sentence selector来选择回答问题需要的最小句子集合。

## 新趋势 New Trends

考虑到目前方法的局限性，MRC出现了新的任务，比如，**knowledge**-based MRC, MRC with **unanswerable** questions, **multi-passage** MRC，**conversational** question answering。
 
### Knowledge-Based Machine Reading Comprehension
 
有时候，我们只根据context是无法回答问题的，需要借助外部知识。因此，基于外部知识的MRC应运而生。KBMRC和MRC的不同主要在输入部分，MRC的输入是context和question，而KBMRC的输入是context、question、knowledge。
 
![](https://pic1.zhimg.com/80/v2-7639ff4b878691078a327a083329f728_1440w.jpg)
 
目前KBMRC的主要挑战在于：
*   Relevant External Knowledge Retrieval
*   External Knowledge Integration
 
### Unanswerable Questions
 
有一个潜在的假设就是MRC任务中正确答案总是存在于给定的上下文中。显然这是不现实的，上下文覆盖的知识是有限的，存在一些问题是无法只根据上下文就可以回答的。因此，MRC系统应该区分这些无法回答的问题。
 
![](https://pic3.zhimg.com/80/v2-1809b9f8f2d72626c2b98d0a5f0e68d6_1440w.jpg)
 
关于不可回答的问题，相比传统的MRC，在该新任务上又有新的挑战：
*   Unanswerable Question Detection
*   Plausible Answer Discrimination
    
 
### Multi-Passage Machine Reading Comprehension
 
在MRC任务中，相关的段落是预定义好的，这与人类的问答流程矛盾。因为人们通常先提出一个问题，然后再去找所有相关的段落，最后在这些段落中找答案。因此研究学者提出了multi-passage machine reading comprehension，相关数据集有MS MARCO、TriviaQA、SearchQA、Dureader、QUASAR。
 
![](https://pic4.zhimg.com/80/v2-440cd6d5068a467954c83340a209880b_1440w.jpg)
 
相比传统的MRC，MP MRC的挑战在于：
*   Massive Document Corpus
*   Noisy Document Retrieval
*   No Answer
*   Multiple Answers
*   Evidence Aggregation

 
### Conversational Question Answering
 
MRC系统理解了给定段落的语义后回答问题，问题之间是相互独立的。然而，人们获取知识的最自然方式是通过一系列相互关联的问答过程。比如，给定一个问答，A提问题，B回复答案，然后A根据答案继续提问题。这个方式有点类似多轮对话。
 
![](https://pic2.zhimg.com/80/v2-0f7d74919ef2a9dce1013ddbbc3e8965_1440w.jpg)
 
相关数据集：CoQA、QuAC
 
![](https://pic1.zhimg.com/80/v2-82993d4dd455512282e6576f41939b94_1440w.jpg)
 
与MRC相比，CQA带来了新的挑战：
*   Conversational History
*   Coreference Resolution
 
### Open Issues
 
*   Incorporation of External Knowledge
*   Robustness of MRC Systems
*   Limitation of Given Context
*   Lack of Inference Ability

## 经典模型

- 阅读理解的经典 Model，主要包括：
   - Allen AI 提出的 `BIDAF` 
   - 微软提出的 `R-NET` 
   - Google 提出的 `QANet` 
   - 最近刷榜的 `GPT` & `BERT` : Google 于 2018 年提出的双向编码器模型 BERT. 在 SQuAD 2.0 竞赛中，排名前 20 名的模型全部基于 BERT；CoQA 竞赛中，前 10 名模型全部基于 BERT。并且这两个竞赛中模型的最好表现已经超越人类水平。
- 代表模型有：双向注意力流（BiDAF），使用门机制的 R-net、融合网络（FusionNet）等。

# 应用

- 典型应用场景如下：
  - **客服机器人**是一种基于自然语言处理的拟人式服务，通过文字或语音与用户进行多轮交流，获取相关信息并提供解答。机器阅读理解可以帮助客服系统根据用户提供的信息在产品文档中快速找到解决方案，如图 3 所示。
    - ![](https://oscimg.oschina.net/oscnet/up-6a5af70b1b7246ccb5b81be814606cfd894.JPEG)
  - **智能法律**用于自动处理和应用各种错综复杂的法律法规实现对案例的自动审判，这正可以利用机器阅读理解在处理和分析大规模文档方面的速度优势。
  - **智能教育**利用计算机辅助人类的学习过程。机器阅读理解在这个领域的典型应用是作文自动批阅。自动作文批阅模型可以作为学生写作时的助手，理解作文语义，自动修改语法错误，个性化总结易错知识点。这些技术与当前流行的在线教育结合，很有可能在不久的将来对教育行业产生颠覆性的影响。
- 展望
  - 机器阅读理解研究仍面临如知识与推理能力、可解释性、缺乏训练数据等挑战，但也有很大的应用空间。基于机器阅读理解高速处理大量文本的特点，这项技术最容易在劳动密集型文本处理行业落地。
  - 参考：[机器阅读理解是什么？有哪些应用？终于有人讲明白了](https://my.oschina.net/u/4497340/blog/4300671)


# 代码实战

- 《[机器阅读理解：算法与实践](https://github.com/zcgzcgzcg1/MRC_book)》书籍配套代码

![](https://camo.githubusercontent.com/82ba584320339627f8207666b8ee6c53f19cfee8/68747470733a2f2f63732e7374616e666f72642e6564752f7e63677a68752f7069632f636f7665722e706e67)

# 结束


