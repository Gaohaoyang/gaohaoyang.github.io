---
layout: post
title:  "文本匹配-Text Matching"
date:   2020-09-11 20:43:00
categories: 深度学习
tags: 深度学习 NLP
excerpt: 深度学习在NLP子领域——文本匹配的应用汇总
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

## 资料

- [文本匹配（语义相似度/行为相关性）技术综述](http://www.manongjc.com/article/43533.html)
- 文本匹配方法系列：[讲在前面](https://zhuanlan.zhihu.com/p/85088152)，[单语义匹配模型（1）](https://zhuanlan.zhihu.com/p/83574416)


# 介绍

- 文本匹配技术，不像 MT、MRC、QA 等属于 end-to-end 型任务，通常以文本相似度计算、文本相关性计算的形式，在某应用系统中起核心支撑作用，比如搜索引擎、智能问答、知识检索、信息流推荐等。

## 面临的问题

- 真实场景中，如搜索引擎、智能问答、知识检索、信息流推荐等系统中的召回、排序环节，通常面临的是如下任务：
  - <font color='blue'>从大量存储的 doc 中，选取与用户输入 query 最匹配的那个 doc</font>。
- 不同领域描述：

|业务|doc|query|最匹配|匹配准则|
|---|---|---|---|---|
|搜索引擎|网页信息|用户检索请求|（点击行为）相关度最高|语义相似度模型|
|智能问答|FAQ中的question|用户question|语义相似度最高|语义相似度模型|
|信息流推荐|待推荐feed流|用户画像|用户最感兴趣等度量标准|行为相关性模型|
||||||

- 智能问答和检索中，doc 与 query 形式基本一致，标注时
  - 如果根据文本语义相似度对 doc 与 query 打标签，那自然最终学习到的模型就是**语义相似度模型**
  - 如果根据检索后点击行为对 doc 与 query 打标签，那自然最终学习到的模型就是**行为相关性模型**。

# 基础知识


## 文本相似度

- 如何定义“相似”也是个开放问题
- 常见方法：PI、SSEI、STS、IR-QA、Ad-hoc retrieval

- 谈起相似度计算，经常会出现几个关联的 NLP 任务，彼此存在微妙的区别：
  - paraphrase identification，即 PI，是判断一文本是否另一文本的复述
  - semantic text similarity，即 STS，是计算两文本在语义层面的相似性
  - sentence semantic equivalent identification，即 SSEI，是判断两文本在语义层面是否一致
  - IR-QA，是给定一个 query，直接从一堆 answer 中寻找最匹配的，省略了 FAQ 中 question-answer pair 的 question 中转
  - Ad-hoc retrieval，属于典型的相关匹配问题

- 最长公共子序列、编辑距离、相同单词个数/序列长度、word2vec+余弦相似度、[Sentence2Vector](https://blog.csdn.net/qjzcy/article/details/51882959?spm=0.0.0.0.zFx7Qk) 、[DSSM(deep structured semantic models)(BOW/CNN/RNN) ](https://www.cnblogs.com/qniguoym/p/7772561.html)、[lstm+topic](https://blog.csdn.net/qjzcy/article/details/52269382)


### simhash

- [【深度好文】simhash文本去重流程](https://zhuanlan.zhihu.com/p/71488127)
- 传统Hash算法只负责将原始内容尽量均匀随机地映射为一个签名值，原理上仅相当于伪随机数产生算法。即便是两个原始内容只相差一个字节，所产生的签名也很可能差别很大，所以传统的Hash是无法在签名的维度上来衡量原内容的相似度。
- 而SimHash本身属于一种**局部敏感hash**，其主要思想是降维，将高维的特征向量转化成一个f位的指纹（fingerprint），通过算出两个指纹的海明距离（hamming distince）来确定两篇文章的相似度，海明距离越小，相似度越低（根据 Detecting Near-Duplicates for Web Crawling 论文中所说），一般海明距离为3就代表两篇文章相同。     
- simhash也有其局限性，在处理小于500字的短文本时，simhash的表现并不是很好，所以在使用simhash前一定要注意这个细节。

#### 如何设计一个比较两篇文章相似度的算法？

- 可能你会回答几个比较传统点的思路:
  - 一种方案是先将两篇文章分别进行分词，得到一系列特征向量，然后计算特征向量之间的距离（可以计算它们之间的欧氏距离、海明距离或者夹角余弦等等），从而通过距离的大小来判断两篇文章的相似度。
    - 只比较两篇文章的相似性还好，但如果是海量数据,有着数以百万甚至亿万的网页，计算量太大！
  - 另外一种是传统hash，我们考虑为每一个web文档通过hash的方式生成一个指纹（finger print）。 
    - 传统加密方式md5，其设计的目的是为了让整个分布尽可能地均匀，但如果输入内容一旦出现哪怕轻微的变化，hash值就会发生很大的变化。
#### simhash原理
- simhash是google用来处理海量文本去重的算法。 google出品，你懂的。 simhash最牛逼的一点就是将一个文档，最后转换成一个64位的字节，暂且称之为特征字，然后判断重复只需要判断他们的特征字的距离是不是<n（根据经验这个n一般取值为3），就可以判断两个文档是否相似。
算法过程大致如下：
  - 对文本分词，得到N维特征向量（默认为64维）
  - 为分词设置权重（tf-idf）
  - 为特征向量计算哈希
  - 对所有特征向量加权，累加（目前仅进行非加权累加）
  - 对累加结果，大于零置一，小于零置零
  - 得到文本指纹（fingerprint）
- 具体流程实现分为五个步骤
  - 5个步骤：分词、hash、加权、合并、降维
  - ![](https://pic3.zhimg.com/80/v2-ceb4d0e032c73e099e9292f88241f5f6_720w.jpg)


#### 代码实现

```python
import jieba
from simhash import Simhash

words1 = jieba.lcut('我很想要打游戏，但是女朋友会生气！', cut_all=True)
words2 = jieba.lcut('我很想要打游戏，但是女朋友非常生气！', cut_all=True)

print(Simhash(words1).distance(Simhash(words2))) 

#输出：6，因为短文本使用simhash的话，文字稍微有些改动，还是挺明显的，大家可以用长文本尝试

# simhash核心代码
# 说明：self.f 为simhash的长度；
#            self.value 为当前实例的simhash值；
#            self.hashfunc 为计算hash的函数，默认是md5；

# 计算文本的hash值
def build_by_features(self, features): 
    """
    `features` might be a list of unweighted tokens (a weight of 1
                will be assumed), a list of (token, weight) tuples or
                a token -> weight dict.
    """
    v = [0] * self.f
    masks = [1 << i for i in range(self.f)]  #生成从1位到f位的mashs值，用于每个位的匹配操作
    if isinstance(features, dict):
        features = features.items()
    # h是计算的hash值， w是权重(词频)
    for f in features:
        if isinstance(f, basestring):
            h = self.hashfunc(f.encode('utf-8'))
            w = 1
        else:
            assert isinstance(f, collections.Iterable)
            h = self.hashfunc(f[0].encode('utf-8'))
            w = f[1]
        for i in range(self.f):
            v[i] += w if h & masks[i] else -w  # 位操作，位值为1，则为w，位值为0，则为-w；
    ans = 0
    for i in range(self.f):
        if v[i] > 0:
            ans |= masks[i]  # 合并所有计算结果
    self.value = ans

# 计算两个hash值得距离
def distance(self, another):
    assert self.f == another.f
    x = (self.value ^ another.value) & ((1 << self.f) - 1)
    ans = 0
    while x:
        ans += 1
        x &= x - 1
    return ans

```

## 有监督相似度计算

- 基于有监督的相似度计算，主要介绍基于神经网络的，基本可以分为两大类，sentence encoding (sentence representation) 类、sentence interaction 类。

## 常用数据集

- 如下：
  - PI、SSEI、STS 英文：MSRP、SICK、SNLI、STS、Quora QP、MultiNLI
  - PI、SSEI、STS 中文：LCQMC、BQ corpus
  - IR-QA 英文：wikiQA、insuranceQA
- 注释：
  - PI：paraphrase identification，是判断一文本是否另一文本的复述；
  - STS：semantic text similarity，是计算两文本在语义层面的相似性；
  - SSEI：sentence semantic equivalent identification，是判断两文本在语义层面是否一致；
  - IR-QA：是给定一个 query，直接从一堆 answer 中寻找最匹配的，省略了 FAQ 中 question-answer pair 的 question 中转。


# 解法

## 如何解决

- 分为无监督和有监督学习

### 监督学习

- 训练数据格式：
  - 共 N 组数据，每组数据结构相同：1 个 query，对应的 M 个 doc，对应的 M 个标签。


- 不同业务场景下embedding内容

|业务|doc|query|备注|
|---|---|---|---|
|搜索引擎|文本语义和用户信息|索引网页各项信息||
|智能问答|文本语义为主|文本语义为主||
|信息流推荐|包含文本特征各项信息|用户历史、爱好等信息||
|||||

- query 和 doc 的表征形式较固定，至于具体 embedding 包含的信息根据具体任务、场景、目标变化极大，按需设计
- 但至于训练样本中的标签，形式则区别甚大。可以分成下述三种形式：
  - **pointwise**，M 通常为 1，标签形式为 0 或 1，标签 0 表示 query 与该 doc 不匹配，标签 1 表示匹配。M 也可大于 1 ，此时，一组数据中只有一个 1 其余全为 0，表示这 M 个 doc 中只有这一个与 query 匹配，其余全都不匹配。
  - **pairwise**，M 通常为 2，标签形式为 0 或 1 ，标签 0 表示 query 与第一个 doc 比与第二个 doc 更匹配，标签 1 表示 query 与第二个 doc 比与第一个 doc 更匹配，当然也可以反之。
  - **listwise**，M 通常大于等于 2，标签形式为 1 到 M 的正整数，标签 m 表示 query 与该 doc 的匹配度在该组里位列第 m 位。
- 不同监督形式，形成了不同的学习方式，彼此之间优劣异同就涉及到 Learning2Rank 技术了，具体可[参考](https://blog.csdn.net/lipengcn/article/details/80373744)
- 越靠后的形式得到的模型越符合我们预期，但其对训练样本形式的严苛性和算法设计的复杂性使得工业应用难以开展，通常，解决我们遇到的任务，多采用 pointwise 或者 pairwise 方式。


### 无监督学习

- 不少经典的无监督 STS 技术，虽然简朴，但也能取得不错的效果：
  - 基于**词汇重合度**：TFIDF、VSM、LD、LCS、BM25、Jaccord、SimHash 等
  - 基于浅层语义的**主题模型**：LSA、pLSA、LDA 等
  - 基于浅层语义的 **encoding** 模型：embedding centroid、WMD、InferSent、pretrained encoder 等
- 虽然无监督技术较粗糙，但能有效解决冷启动问题。
  - 如 Solr 全文检索引擎就在用基于 Ngram LD 的相似度召回技术，FAQ 问答引擎中使用 BOW+LD 也能取得不错的效果。
  - 主题模型和基于词向量的模型，本质上都是基于**词共现**信息的，虽然引入了词义信息，但实际使用中，并无法替代基于词汇重合度的经典算法，效果相差不大。


# 模型

有监督深度学习方法，基本可以分为两大类，sentence representation、sentence interaction 级表示方法和交互方法。
- SE模型：基于 Siamese 网络，表示层后交互计算；
- SI模型：表示层后进行交互计算。

![](https://picb.zhimg.com/80/v2-fed1956bd44c4a18d1d3622fede50022_720w.jpg)

- 一般而言，单语义系列属于SE类模型，比如DSSM（Deep Structured Semantic Models）,或者Convnet模型，如图所示；而后续的多层次交互的模型一般是采用SE框架
  - 单语义匹配模型：DSSM（Deep Structured Semantic Models）以及基于此演进的系列模型CLSM/RNN-DSSM

![](https://pic3.zhimg.com/80/v2-39f58d7ce98f3f6f917da5a7c696d11b_720w.jpg)

- 【2020-12-18】文本匹配模型归纳总结
  - [DSSM详解](https://blog.csdn.net/u012526436/article/details/90212287)
  - [ESIM详解](https://blog.csdn.net/u012526436/article/details/90380840)
  - [ABCNN详解](https://blog.csdn.net/u012526436/article/details/90179481)
  - [BiMPM详解](https://blog.csdn.net/u012526436/article/details/88663975)
  - [DIIN详解](https://blog.csdn.net/u012526436/article/details/90710925)
  - [DRCN详解](https://blog.csdn.net/u012526436/article/details/90757018)



## SE 网络 （sentence encoding）

- SE 网络结构如下：
  - representation-based 类模型，思路是基于 Siamese 网络，提取文本整体语义再进行匹配
  - 典型的 Siamese 结构，双塔共享参数，将两文本映射到同一空间，才具有匹配意义
  - 表征层进行编码，使用 MLP、CNN、RNN、Self-attention、Transformer encoder、BERT 均可
  - 匹配层进行交互计算，采用点积、余弦、高斯距离、MLP、相似度矩阵均可
  - 经典模型有：DSSM、CDSSM、MV-LSTM、ARC-I、CNTN、CA-RNN、MultiGranCNN 等
  - 优点是可以对文本预处理，构建索引，大幅降低在线计算耗时
  - 缺点是失去语义焦点，易语义漂移，难以衡量词的上下文重要性

## SI 网络 （sentence interaction）

- SI 网络结构如下：
  - interaction-based 类模型，思路是捕捉直接的匹配信号（模式），将词间的匹配信号作为灰度图，再进行后续建模抽象
  - 交互层，由两文本词与词构成交互矩阵，交互运算类似于 attention，加性乘性都可以
  - 表征层，负责对交互矩阵进行抽象表征，CNN、S-RNN 均可
  - 经典模型有：ARC-II、MatchPyramid、Match-SRNN、K-NRM、DRMM、DeepRank、DUET、IR-Transformer、DeepMatch、ESIM、ABCNN、BIMPM 等
  - 优点是更好地把握了语义焦点，能对上下文重要性进行更好的建模
  - 缺点是忽视了句法、句间对照等全局性信息，无法由局部匹配信息刻画全局匹配信息


## 深度语义

为了更好实现语义匹配、逻辑推理，需要 model 深度信息，可以从如下角度改进上述基础 SE、SI 网络：
- **结合 SE 与 SI 网络**：两者的作用并非谁是谁子集的关系，是相互补充的关系，简单加权组合即可。
- 考虑词语的**多粒度语义信息**：即在基础模型基础上分别对 unigram、bigram、trigram 进行建模，从而 model 文本的word、term、phrase 层面的语义信息，融合的方式不唯一，在输入层、表示层、匹配层都可以尝试，通常来说越早融合越好提升效果，因为更早发挥了多粒度间的互补性。可参考腾讯的 MIX。
- 引入词语的**多层次结构信息**：即引入 term weight、pos、word position、NER 等层面的 element-wise 信息到语义信息中。可参考腾讯的 MIX。
- 引入**高频 bigram 和 collocation 片段**：主要为了加入先验，降低学习难度。Ngram 表义更精确但也更稀疏，可借助统计度量，只挑选少量对匹配任务有很好信息量的高频共现 term 组合作为 bigram 加入词典。Collocation 即关注跨词的一些 term 组合，如借助依存分析或者频繁项集挖掘获得 collocation 片段。
- **参考 CTR 中 FM，处理业务特征**：如美团的排序算法演进中，参考了 CTR 中的 wide&deep 模型来添加业务特征，即，有的业务特征不做变换直接连接到最外层，有的业务特征做非线性变化后不够充分，会再进行多项式非线性变换。
- 对两文本中的差异部分单独建模：即在基础模型基础上，再使用一个单独模型处理两文本差异部分，强化负样本的识别能力。可参考 HIT 的 GSD模型。
- 引入**混合学习**策略：如迁移学习，可参考 MT-hCNN；如多任务学习；以及两者多种方式的组合，具体比较可参考 HIT 的 DFAN，如引入多任务学习和基于 Seq2Seq 的迁移学习的混合策略效果可能最好。
- 使用复杂 **Learning2Rank** 学习方式
  - 按 pointwise、pairwise、listwise 顺序升格进行学习，在权衡标签获取难度和效果后，通常选用 DSSM 结构，即形式上的 listwise，loss 上的 pairwise 结构。
- 提供一种<font color'red'>最佳实践方案</font>：基于 DSSM 结构分别训练 SE 和 SI 网络，训练好的 SE 网络结合 faiss 作为预召回模块，训练好的 SI 网络作为匹配模块。

### DSSM（Deep Structured Semantic Models）模型

- DSSM起初是用于搜索业务中的，原理是通过海量搜索结果的点击曝光日志，用 DNN 把 Query 和 Title 表达为低纬语义向量，并通过 cosine 距离来计算两个语义向量的距离，最终训练出语义相似度模型。
- 该模型既可以用来预测两个句子的语义相似度，又可以获得某句子的低纬语义向量表达
- 深度学习得到广泛应用以后，DSSM原模型一般不予应用了

![](https://pic3.zhimg.com/80/v2-4532f794e28d93f23a4b423857b5f8ae_720w.jpg)

### CLSM模型

- CLSM模型在有些地方也写作CNN-DSSM, 就是基于卷积表示的DSSM模型
  - 英文语料会有对语料输入形式的窗口处理层：使用指定滑窗大小对输入序列取窗口数据（称为word-n-gram）；对于这些word-n-gram按letter-trigram进行转换成表示向量 
  - 中文语料建模时，word-n-gram层这一步骤可以忽略，直接按照字符序列输入即可，简便很多
  - 这种模型只是通过字典语义挤压训练，是否可以使用分词呢？答案是理论上可以（效果未实践），但实际业务中往往行不通，最好是使用中文字符序列输入，理由如下：
    - （1）中文按照字符构建字典大约1.5万~2万规模即可,非常简便；
    - （2）如果使用分词的话，因为语义模型训练一般是基于非常大规模数据的（如搜索领域DSSM模型应用就会使用千万甚至亿级别的数据进行训练），这样构成的词典会非常庞大容易出现OOM现象。相反如果强行构建较小词典，容易出现OOV现象造成语义模型训练效果较差。

![](https://pic1.zhimg.com/80/v2-05bd58457c4d239310b5fe4a44dbaced_720w.jpg)

- 实际应用可选用1个正例：3~4个负例构建样本，卷积层注意共用卷积核参数。应用经验表明，CLSM模型是在工业上应用不错的模型，其效果不错同时训练速度较快，线上服务也较好。一般而言以数百万数据训练CLSM模型大约12~24小时能完成（非并行条件下，下同），速度相对较快，一般工业级数据（是指不像标准数据集那样干净的样本，下同）验证准确率一般在60~65%之间。
- 由于CLSM模型大小较小和时耗较短，实际应用时是可以优化一下网络结构（常用于CNN网络的优化方式都可以尝试）：
  - （1）增大embedding层维度；
  - （2）增加不同尺度大小的卷积-池化层组合；
  - （3）增加卷积层层数；
  - （4）池化层可以尝试最大池化和平均池化，也可以尝试k-最大池化等
- 通过上述一个或者多个优化方式的组合一般都可以提升CLSM模型效果，实际上增加上述网络，模型耗时仍然是同类语义匹配模型中最短的。

### RNN-DSSM模型

- RNN-DSSM模型实际可以是GRU-DSSM,LSTM-DSSM,Bi-LSTM-DSSM,就是基于各种RNN结构的文本表示。
- 与上述CLSM模型一样，实际对于中文语料建模时，word-n-gram层这一步骤可以忽略，直接构建字符字典

![](https://pic4.zhimg.com/80/v2-3173c1c51d26bba7749b8e117ff8025d_720w.jpg)

- 实际GRU-DSSM,LSTM-DSSM,Bi-LSTM-DSSM模型验证效果是逐渐上升的，同时训练耗时也是逐渐增加的。一般而言，实际应用可选用1个正例：3~4个负例构建样本，共用RNN cell即可。以数百万数据训练模型应用经验表明：
  - （1）GRU-DSSM模型大约1~2天能完成，一般工业级数据验证准确率一般在65%~70%之间；
  - （2）LSTM-DSSM模型大约近2天能完成，一般工业级数据验证准确率一般在65%~70%之间，模型较GRU-DSSM模型大，耗时也比GRU-DSSM模型长一些；
  - （3）Bi-LSTM-DSSM模型要3天以上时间才能训练完成，一般工业级数据验证准确率一般会接近70%，模型较大，耗时较长一般不建议选用；
- 对于RNN-DSSM模型一般工业应用建议选用GRU-DSSM模型，对于可接受数天时耗的情况下，也可以对模型网络参照第2节进行部分优化。


## 优化点

- PI、SSEI、STS、IR-QA、Ad-hoc retrieval 等任务基于神经网络提出的很多模型是彼此通用的，但彼此借鉴时，还是有不少细节需要调整的。
  - IR-based QA 中提出的模型虽然也通用于相似度计算，但细节需要调整。如，Siamese 网络最后 matching layer 采用 cos 的话，对于 paraphrase 任务自然是没问题，两文本 encoding 后向量相同则得分高，但对 QA 任务则不尽然，此时 answer 未必是最优的。因此，基于 SE 结构的 QA 任务通常会加各种 attention，而 paraphrase 任务加 attention 基本没有增益。在 QA 任务上， attention 起到将 Q 中信息线性映射到 A 中信息的空间的作用，而 paraphrase 没这个必要。
  - 语义匹配任务和相关匹配任务，很多模型也是通用的，但两个任务强调的有效信息是截然不同的，因此在基础模型上也会进行不少调整。如，需要格外关注 query 与 doc 完全匹配的 term，强调 query 中 term 的重要性，有时不必将 doc 作为整体和 query 进行匹配，等等。计算所提出了一系列相关匹配模型，如 DRMM、aNMM 等，可以参考 [MatchZoo](https://github.com/NTMC-Community/MatchZoo)。
- 可见，看起来很相似的任务，也会导致很不同的解决方案，再次验证了 no-free-lunch 定理。

## 多轮对话

- IR-based 多轮对话的 QA 模型：
  - 百度在 EMNLP2016 提出的 Multi-view 模型：联合考虑了 word-level matching 和 utterance-level matching，只是方式粗糙了些，均基于 SE 结构，类似于层次化结构。
  - MSRA 在 ACL2017 提出的 SMN 模型：将 SE 改进到 SI， 联合考虑 word-level interaction 和 segment-level interaction。不过其 representation 过程用的两个 DRU，过于繁琐，可以参考阿里小蜜在2018的 MT-hCNN，进行了改进。
  - 上交在 COLING2018 提出的 DUA 模型：采用了 Self-attention 对 utterance 进行了 deep encoding。
  - 百度在 ACL2018 提出的 DAM 模型：算是最新技术的集大成者，摒弃之前建模 utterance embedding sequence 的思路，先使用 Transformer encoder 得到文本多粒度的表征，然后借助 attention 设计了两种交互方式得到了 self-attention-match 和 cross-attention-match 两种对齐矩阵，再采用 3D-conv 进行聚合分类预测，实现了 SOTA，干净利落。


# 文本匹配

## 应用

- Answer Selection：给定一个问题，从候选答案集合中匹配最佳答案。
- Paraphrase Identification释义识别：给定两个句子，判断它们是否包含相同的语义。
- Textual entailment：给定一句话作为前提，另一句话作为推断，去判断能否根据前提得到推断。

## 评估

- MAP，MRR评估方法

## 思路

- representation learning的深度匹配模型，两个文本进行represent，之后进行交互，优点是快捷，便于进行无监督训练（大量无标注数据上进行表示学习）
- match function learning不直接学习query和doc的表示，而是一开始就让query和doc进行各种交互，通过两者交互的match signals进行特征提取，然后通过aggregation对提取到的match signals用各种网络结构进行学习得到最终的匹配分数。


# 匹配模型

## MatchPyramid模型

- 灵感来源于CV，把word-level的匹配情况看作是一张图片，用卷积来进行处理
- word-level的匹配图示，显然word-level能很好的体现细粒度的匹配信息。
  - ![](https://pic4.zhimg.com/80/v2-a16a96443f14c61302b60b763fd52736_720w.jpg)
- 模型的整体架构，word-level的匹配信息可以看做图像的像素，第一层卷积学到的是n-gram匹配信息（s0和s1连续k个词的组合），后面的卷积是将n-gram匹配进行组合
  - ![](https://pic1.zhimg.com/80/v2-584020a28259405be700b469313ad4b7_720w.jpg)
- 特点
  - （1） 比起ARC-II模型通过n-gram得到的word embedding进行相似度计算，MatchPyramid模型在匹配矩阵的计算上做得更加精细，关注的是原始word级别的交互
  - （2） 对于query和doc之间每个word的两两交互提出了3中方法，包括精确匹配的indicator计算，两个word完全相同为1否则为0；以及语法相似度的匹配，包括cosine以及dot product，关注的是更泛化的匹配
  - （3） 整个过程和图像识别以及人类的认知一样，word-level的匹配信号，类比图像中的像素特征；phrase-level的匹配信号，包括n-gram有序的phrase以及n-term无序的phrase，类比图像中的边缘检测；到sentence-level的匹配信号，类比图像中的motifs检测。

## Match SRNN（IJCAI 2016）

- 特点是用了二维RNN对匹配矩阵进行建模，类似于最长公共子序列的模式。似于一种动态规划的思路，query和doc的交互矩阵中每个位置的值由不仅由当前两个word的交互值得到，还由其前面（左、上、以及左上三个位置）的值决定。

## ABCNN(Attention-based CNN) TACL 2016

### Basic CNN

- 宽卷积+窗口为w的pooling，这样句子的长度跟原来一样，理论上可以堆叠多次，最后进行全局pooling
![](https://pic2.zhimg.com/80/v2-fc2df7e3785bc311fa4eccd6a0a10582_720w.jpg)

### ABCNN 1

- 在卷积之前计算attention，通过红色的representation map(word embedding)，进行attention得到attention matrix，attention matrix表示feature map 0的i位置和feature map 1的j位置的相关性。
  - ![](https://pic1.zhimg.com/80/v2-e9b67f1d5869bbf8450b314c8ce8ac0a_720w.png)
- match score用的是![](https://pic2.zhimg.com/80/v2-5bf0b66946ee14cabed12998304edc02_720w.png),经过转换之后可以得到attention feature map ![](https://picb.zhimg.com/80/v2-17268a1a6b821426d81332b4f94ec490_720w.jpg)，通过W0和W1两个矩阵将其转化为attention feature map ![](https://pic2.zhimg.com/80/v2-d6490a1340acc126c66c11407824c924_720w.jpg)

### ABCNN-2

- 卷积之后进行attention计算，同样得到attention matrix，通过column-wise和row-wise的sum得到s0和s1中每个词的重要性，从而进行attention pooling，attention pooling就是让attention score序列乘以句子的representation最后进行池化，相对于平均池化来说每个词都包含了一个权重。但是这里的池化不是全局的，而是窗口为w的池化。
![](https://pic1.zhimg.com/80/v2-098a2604feb6d4c14e86bf286c10bfdb_720w.png)
![](https://pic2.zhimg.com/80/v2-a79b0bb222290b51b8cd5aa9e55dd406_720w.jpg)

### ESIM

- Enhanced LSTM for Natural Language Inference
- ESIM主要分为三部分：input encoding，local inference modeling 和 inference composition。
- input encoding就是用word embedding + bilstm
- local inference就是用一种交互式的attention架构，得到局部的交互信息。需要计算一个attention matrix（要分别根据两个句子的mask生成），然后生成align(也就是a每个位置分别跟b哪个位置align，b每个位置分别跟a哪个位置align)，具体：![](https://pic3.zhimg.com/80/v2-90c9e628cf270e5e41853eda958d6a62_720w.png)
![](https://picb.zhimg.com/80/v2-d2ad24a02f6067c93e3433f3dda199b9_720w.jpg)
- 生成align之后，还需要有一部enhancement，进行element-wise的相乘和相减操作，并且与之前的拼接起来，作者希望这样能sharpen local inference information。
![](https://picb.zhimg.com/80/v2-71646ea0e63a99a0d7fec8fd1a9d3a62_720w.jpg)
- inference composition就是组合local inference交互之后的信息，用LSTM+池化得到全局的交互信息，这是输出层了，具体是把a和b的representation用avg/max pooling得到四个向量拼接起来。

### BIMPM

- Bilateral Multi-Perspective Matching双向多角度匹配模型
- 不仅需要考虑query到doc，也应该考虑从doc到query的倒推关系，因此这是个双边（Bilateral）的关系。
- 四个层，重点是matching layer
![](https://picb.zhimg.com/80/v2-75cac2ce4f1498f58da941a21110121f_720w.jpg)
- 这里分前向和后向分别计算match representation，match operation是多角度的。原来计算match score输入两个向量，输出一个值，现在输入两个向量，输出一个match向量，其中match向量每一个维度代表一个角度的匹配。
- W代表一个l*d的向量，l代表视角数量 ![](https://pic3.zhimg.com/80/v2-7a322394075e2e7a58ae936abe308d9c_720w.jpg)
- 第k个视角对应一个相似度，用第k个视角的Wk作用在v1和v2上面得到，因此控制d维度空间不同dimension的权重。因此不同视角的Wk，本质是对于不同维度的取舍权重不同。
- matching strategy（详情见原文）
  - full-matching方法
  - max-pooling matching
  - Attentive-Matching
  - Max-Attentive-Matching

![](https://pic1.zhimg.com/80/v2-e25b4564330c0f007f44793daa47a6f2_720w.jpg)



# 挑战

文本匹配主要面临的挑战
- （1）匹配对象差异巨大
  - 实际问题中文本匹配的两个对象往往长度差异巨大，比如搜索场景的query-doc匹配，QA系统的问题答案匹配，标签系统的文章-标签匹配等，都是至少有匹配一方是极短文本，展示的语义并不完整，这种情况下进行文本匹配操作会带来各种各样的问题，需要根据实际问题来解决。
- （2）优质训练样本难以大量获取
  - DSSM[1]模型工业应用时，需要使用数千万甚至上亿级别的搜索-点击日志数据，这个条件天然只能被较大公司所使用，对数据获取和计算能力都有较高的要求。
- （3）文本匹配的层次性
  - 文本是以层次化的方式组织起来的，词语组成短语，短语组成句子，句子组成段落，段落组成篇章。这样一种特性使得我们在做文本匹配的时候需要考虑不同层次的匹配信息，按照层次的方式组织我们的文本匹配信息。



# 结束


