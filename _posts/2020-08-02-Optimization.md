---
layout: post
title:  "优化算法笔记-optimization"
date:   2020-08-02 00:23:00
categories: 机器学习 数学基础
tags: 最优化 梯度下降 牛顿法 斯坦福 凸函数 凸优化 KKT 损失函数 距离计算 相似度 Pareto 帕累托 编辑距离
excerpt: 机器学习中常见的优化算法
author: 鹤啸九天
mathjax: true
permalink: /optimization
---

* content
{:toc}

# 总结

【2022-5-19】[关于神经网络，一个学术界搞错了很多年的问题](https://mp.weixin.qq.com/s/i_tldPMzYDUZwdXDCJTjPw)
- 比较各种优化算法的性质，包括传统的 SGD，Momentum SGD，AdaGrad，RMSProp 和 Adam 等;可视化分析
- SGD optimization on loss surface contours
- ![](https://picb.zhimg.com/v2-5d5166a3d3712e7c03af74b1ccacbeac_b.webp)
    - 不同算法在损失面等高线图中的学习过程，它们均同同一点出发，但沿着不同路径达到最小值点。其中 Adagrad、Adadelta、RMSprop 从最开始就找到了正确的方向并快速收敛；SGD 找到了正确方向但收敛速度很慢；SGD-M 和 NAG 最初都偏离了航道，但也能最终纠正到正确方向，SGD-M 偏离的惯性比 NAG 更大。
- SGD optimization on saddle point
- ![](https://pic4.zhimg.com/v2-4a3b4a39ab8e5c556359147b882b4788_b.webp)
    - 不同算法在鞍点处的表现。这里，SGD、SGD-M、NAG 都受到了鞍点的严重影响，尽管后两者最终还是逃离了鞍点；而 Adagrad、RMSprop、Adadelta 都很快找到了正确的方向。

- [最优化算法-避开鞍点](http://www.csuldw.com/2016/07/10/2016-07-10-saddlepoints/)

- 【2020-8-20】【斯坦福凸优化短课程资料(Python)】’[cvx_short_course](https://github.com/cvxgrp/cvx_short_course) - Materials for a short course on convex optimization.' by Stanford University Convex Optimization Group
- 【2020-11-2】源自贪心学院的[机器学习高阶培训目录](https://mp.weixin.qq.com/s/Wp6xQUZ7vzaxhRhcFF5geQ)
- 凸集的判断
    - First-Order Convexity
    - Second-order Convexity
    - Operations Preserve Convexity
- 二次规划问题（QP)

- 【2021-1-29】冯扬：[在线最优化求解](https://github.com/wzhe06/Ad-papers/blob/master/Optimization%20Method/%E5%9C%A8%E7%BA%BF%E6%9C%80%E4%BC%98%E5%8C%96%E6%B1%82%E8%A7%A3%28Online%20Optimization%29-%E5%86%AF%E6%89%AC.pdf)，摘自王喆的优化算法[资料](https://github.com/wzhe06/Ad-papers/tree/master/Optimization%20Method)

- 【2021-5-24】[为什么机器学习算法难以优化？一文详解算法优化内部机制](https://cloud.tencent.com/developer/article/1827805)，[英文原文](https://engraved.ghost.io/why-machine-learning-algorithms-are-hard-to-tune/)，损失的线性组合无处不在，如正则化函数、权重衰减和 Lasso 算法。。虽然有些陷阱，但仍然被广泛用作标准方法。这些线性组合常常让算法难以调整。本文作者提出了以下论点：
  - 机器学习中的许多问题应该被视为多目标问题，但目前并非如此；正则化函数、权重衰减和 Lasso 算法。正则化已经创建了多目标损失，用λ参数在这二者之间调整平衡。第一个目标是最大程度地覆盖数据，第二个目标是保持与先前的分布接近。在这种情况下，偶尔会使用 KL 退火来引入一个可调参数β，以帮助处理这种损失的多目标性。强化学习中的策略损失也通常是损失的线性组合，如PPO、SAC 和 MPO 的策略损失及其可调整参数α的熵正则化方法。一些组合损失的方法听起来很有吸引力，但实际上是不稳定且危险的。平衡行为通常更像是在「走钢丝」。
  - 以上问题导致这些机器学习算法的超参数难以调整；
  - 检测这些问题何时发生几乎是不可能的，因此很难解决这些问题。

- 理想情况下，多目标损失线性组合后的优化路径,当调整 α 时，可以选择两个损失之间的折衷，并选择最适合自身应用的点。[图](https://ask.qcloudimg.com/http-save/yehe-1622140/z32ymekcw4.gif)
  - ![](https://ask.qcloudimg.com/http-save/yehe-1622140/z32ymekcw4.gif)
- 而实际往往是,无论怎样调整参数α，都不能很好地权衡两种损失。[图](https://ask.qcloudimg.com/http-save/yehe-1622140/f79zrvn38b.gif)
  - ![](https://ask.qcloudimg.com/http-save/yehe-1622140/f79zrvn38b.gif)
- 一般采取早停法（early stopping），以使得论文中的数据是有效的。但为什么这种方法有时有效，有时却无法提供可调参数？模型参数θ对模型输出的影响是不同的。可视化下不可见的东西，即两个优化的**帕累托前沿**。这是模型可以实现且是不受其他任何解决方案支配的解决方案的集合。通过调整损失的超参数，你通常希望仅在同一个前沿找到一个不同的点。[凹](https://ask.qcloudimg.com/http-save/yehe-1622140/rvuvin71zh.gif)，[凸](https://ask.qcloudimg.com/http-save/yehe-1622140/dkdmgfafzf.gif)
  - ![凹](https://ask.qcloudimg.com/http-save/yehe-1622140/rvuvin71zh.gif)
  - ![凸](https://ask.qcloudimg.com/http-save/yehe-1622140/dkdmgfafzf.gif)
  - 两个帕累托前沿之间的差异会使得第一种情况的调优效果很好，但是在更改模型后却严重失败了。事实证明，当帕累托前沿为**凸形**时，我们可以通过调整α参数来实现所有可能的权衡效果。但是，当帕累托前沿为**凹形**时，该方法似乎不再有效。
- 为什么凹帕累托前沿面的梯度下降优化会失败？[凸](https://ask.qcloudimg.com/http-save/yehe-1622140/t7oxtsv9y2.gif), [凹](https://ask.qcloudimg.com/http-save/yehe-1622140/5js9syi3n1.gif)
  - ![凸](https://ask.qcloudimg.com/http-save/yehe-1622140/t7oxtsv9y2.gif)
  - 调整α，此空间将保持一个平面。毕竟更改α只会更改该平面的倾斜度。在凸的情况下，可以通过调整α来实现帕累托曲线上的任何解。α大一点会将星星拉到左侧，α小一点会将星星拉到右侧。优化过程的每个起点都将在相同的解上收敛，这对于α的所有值都是正确的。
  - ![凹](https://ask.qcloudimg.com/http-save/yehe-1622140/5js9syi3n1.gif)
  - 当我们调整α时，该平面以与凸情况下完全相同的方式倾斜，但由于帕累托前沿面的形状，将永远只能到达该前沿面上的两个点，即凹曲线末端的两个点。使用基于梯度下降方法无法找到曲线上的 × 点（实际上想要达到的点）。为什么？因为这是一个鞍点（saddle point）。
- 线性损失组合方法的问题：
  - 第一，即使没有引入超参数来权衡损失，说梯度下降试图在反作用力之间保持平衡也是不正确的。根据模型可实现的解，可以完全忽略其中一种损失，而将注意力放在另一种损失上，反之亦然，这取决于初始化模型的位置；
  - 第二，即使引入了超参数，也将在尝试后的基础上调整此超参数。研究中往往是运行一个完整的优化过程，然后确定是否满意，再对超参数进行微调。重复此优化循环，直到对性能满意为止。这是一种费时费力的方法，通常涉及多次运行梯度下降的迭代；
  - 第三，超参数不能针对所有的最优情况进行调整。无论进行多少调整和微调，你都不会找到可能感兴趣的中间方案。这不是因为它们不存在，它们一定存在，只是因为选择了一种糟糕的组合损失方法；
  - 第四，必须强调的是，对于实际应用，帕累托前沿面是否为凸面以及因此这些损失权重是否可调始终是未知的。它们是否是好的超参数，取决于模型的参数化方式及其影响帕累托曲线的方式。但是，对于任何实际应用，都无法可视化或分析帕累托曲线。可视化比原始的优化问题要困难得多。因此出现问题并不会引起注意；
  - 最后，如果你真的想使用这些线性权重来进行权衡，则需要明确证明整个帕累托曲线对于正在使用的特定模型是凸的。因此，使用相对于模型输出而言凸的损失不足以避免问题。如果参数化空间很大（如果优化涉及神经网络内部的权重，则情况总是如此），你可能会忘记尝试这种证明。需要强调的是，基于某些中间潜势（intermediate latent），显示这些损失的帕累托曲线的凸度不足以表明你具有可调参数。凸度实际上需要取决于参数空间以及可实现解决方案的帕累托前沿面。
  - 请注意：在大多数应用中，帕累托前沿面既不是凸的也不是凹的，而是二者的混合体，这扩大了问题。以一个帕累托前沿面为例，凸块之间有凹块。每个凹块不仅可以确保无法通过梯度下降找到解，还可以将参数初始化的空间分成两部分，一部分可以在一侧的凸块上找到解，而另一部分智能在另一侧上找到解。如下动图所示，在帕累托前沿面上有多个凹块会使问题更加复杂。[多凹点](https://ask.qcloudimg.com/http-save/yehe-1622140/6jigyrmzvj.gif)
    - ![](https://ask.qcloudimg.com/http-save/yehe-1622140/6jigyrmzvj.gif)


# 最优化


## 简介

运筹学是研究优化理论的学科（包括凸优化），而人工智能模型最后几乎都能化简成求解一个能量/损失函数的优化问题。

因此，运筹学可以称为人工智能、大数据的“引擎”。

- 摘自：[最优化算法的前世今生](https://xw.qq.com/cmsid/20200718A06NR300)
- 人生不如意之事十之八九，想达到我们想要达到的目标时，通常都有各种各样的限制。那么所谓最优化问题，就是指**用最优的方式去平衡理想与现实之间的关系**。

- 最古老的优化问题：邮差送信

## 距离度量

【2021-7-15】[NLP 语义相似度计算 整理总结](https://www.cnblogs.com/shona/p/11971310.html)

在很多NLP任务中，都涉及到语义相似度的计算，例如：
- 在搜索场景下（对话系统、问答系统、推理等），query和Doc的语义相似度；
- feeds场景下Doc和Doc的语义相似度；
- 在各种分类任务，翻译场景下，都会涉及到语义相似度语义相似度的计算

基本概念
- `TF`：Term frequency即关键词词频，是指一篇文章中关键词出现的频率 ![](https://images.cnblogs.com/cnblogs_com/liangxiaxu/201205/201205051901168917.gif)
- `IDF`：Inverse document frequency指逆向文本频率，是用于衡量关键词权重的指数 ![](https://images.cnblogs.com/cnblogs_com/liangxiaxu/201205/201205051901168393.gif)
- 向量空间模型
  - `向量空间模型`简称 VSM，是 VectorSpace Model 的缩写。在此模型中，文本被看作是由一系列相互独立的词语组成的，若文档 D 中包含词语 t1,t2,…,tN，则文档表示为D（t1,t2,…,tN）。由于文档中词语对文档的重要程度不同，并且词语的重要程度对文本相似度的计算有很大的影响，因而可对文档中的每个词语赋以一个权值 w，以表示该词的权重，其表示如下：D（t1,w1；t2,w2；…,tN，wN），可简记为 D（w1,w2,…,wN），此时的 wk 即为词语 tk的权重，1≤k≤N。关于权重的设置，我们可以考虑的方面：词语在文本中的出现频率（tf），词语的文档频率（df，即含有该词的文档数量，log N/n。很多相似性计算方法都是基于向量空间模型的。

### 余弦相似度（Cosine）

余弦相似性通过测量两个向量的夹角的余弦值来度量它们之间的相似性。
- [img](https://img-blog.csdn.net/20170411164251296) ![](https://img-blog.csdn.net/20170411164251296)
- 问题：
  - 表示方向上的差异，但**对距离不敏感**。
  - 关心距离上的差异时，会对计算出的每个（相似度）值都减去一个它们的均值，称为调整余弦相似度。

### 欧式距离

考虑的是点的空间距离，各对应元素做差取平方求和后开方。能体现数值的绝对差异。
- [img](https://img-blog.csdn.net/20170411163336409) ![](https://img-blog.csdn.net/20170411163336409)

### 曼哈顿距离（Manhattan Distance）

向量各坐标的绝对值做查后求和。
- d(i,j)=\|X1-X2\|+\|Y1-Y2\|
- [img](https://img-blog.csdn.net/20170411163529421) ![](https://img-blog.csdn.net/20170411163529421)

### 明可夫斯基距离（Minkowski distance）

明氏距离是欧氏距离的推广，是对多个距离度量公式的概括性的表述。
- [img](https://img-blog.csdn.net/20170411192555236) ![](https://img-blog.csdn.net/20170411192555236)
- [img](https://img-blog.csdn.net/20170411163856462) ![](https://img-blog.csdn.net/20170411163856462)
- 分析
  - 当 p == 1, “明可夫斯基距离”变成“**曼哈顿**距离”
  - 当 p == 2, “明可夫斯基距离”变成“**欧几里得**距离”
  - 当 p == ∞, “明可夫斯基距离”变成“**切比雪夫**距离”

### Jaccard 相似系数（Jaccard Coefficient）
 
Jaccard系数主要用于计算**符号**度量或**布尔值**度量的向量的相似性。即，**无需比较差异大小，只关注是否相同**。Jaccard系数只关心特征是否一致（共有特征的比例）。
- [img](https://img-blog.csdn.net/20170411164412676) ![](https://img-blog.csdn.net/20170411164412676)
- [img](https://img-blog.csdn.net/20180516170747250) ![](https://img-blog.csdn.net/20180516170747250)
- [img](https://img-blog.csdn.net/20170411164453926) ![](https://img-blog.csdn.net/20170411164453926)
 
然后利用公式进行计算:
- [img](https://img-blog.csdn.net/20170411164535504) ![](https://img-blog.csdn.net/20170411164535504)

### 皮尔森相关系数(Pearson Correlation Coefficient)
 
皮尔森相关系数又称为相关相似性。
- [img](https://img-blog.csdn.net/20170411200323838) ![这里写图片描述](https://img-blog.csdn.net/20170411200323838)

或表示为：
- ![](https://img-blog.csdn.net/20180516170033853)
 
这就是1中所提到的调整余弦相似度，向量内各对应元素减去均值求积后求和，记为结果1；各对应元素减去均值平方求和再求积，记为结果2；结果1比结果2。

针对线性相关情况，可用于比较因变量和自变量间相关性如何。
 
### SimHash + 汉明距离（Hamming Distance）
 
- Simhash：谷歌发明，根据文本转为64位的字节，计算汉明距离判断相似性。
- 汉明距离：在信息论中，两个等长字符串的汉明距离是两者间对应位置的不同字符的个数。换句话说，它就是将一个字符串变换成另外一个字符串所需要替换的字符个数。例如：
  - “10110110”和“10011111”的汉明距离为3；
  - “abcde”和“adcaf”的汉明距离为3.
 
### 斯皮尔曼（等级）相关系数（SRC :Spearman Rank Correlation）
 
和6上述类似，不同的是将对于样本中的原始数据Xi,Yi转换成等级数据xi,yi，即xi等级和yi等级。并非考虑原始数据值，而是按照一定方式（通常按照大小）对数据进行排名，取数据的不同排名结果代入公式。
- [img](https://img-blog.csdn.net/20180516165942943) ![](https://img-blog.csdn.net/20180516165942943)
 
实际上，可通过简单的方式进行计算，n表示样本容量，di表示两向量X和Y内对应元素的等级的差值，等级di = xi - yi，则：
- [img](https://img-blog.csdn.net/20180516170606465) ![](https://img-blog.csdn.net/20180516170606465)

### BM25算法 

原理
- BM25算法，通常用来作搜索相关性平分：对Query进行语素解析，生成语素qi；然后，对于每个搜索结果D，计算每个语素qi与D的相关性得分，最后，将qi相对于D的相关性得分进行加权求和，从而得到Query与D的相关性得分。
- BM25算法的一般性公式如下：
  - [img](https://upload-images.jianshu.io/upload_images/1713353-070925230006436c.jpg) ![](https://upload-images.jianshu.io/upload_images/1713353-070925230006436c.jpg)
  - 其中，Q表示Query，qi表示Q解析之后的一个语素（对中文而言，我们可以把对Query的分词作为语素分析，每个词看成语素qi。）；d表示一个搜索结果文档；Wi表示语素qi的权重；R(qi，d)表示语素qi与文档d的相关性得分。
- BM25算法的相关性得分公式可总结为：
  - [img](https://upload-images.jianshu.io/upload_images/1713353-fc89dbc4421949c6.jpg) ![](https://upload-images.jianshu.io/upload_images/1713353-fc89dbc4421949c6.jpg)
- 代码实现，[完整版](https://github.com/jllan/jannlp/blob/master/similarity/bm25.py)

```python
import math
import jieba
from utils import utils

# 测试文本
text = '''
自然语言处理是计算机科学领域与人工智能领域中的一个重要方向。
它研究能实现人与计算机之间用自然语言进行有效通信的各种理论和方法。
自然语言处理是一门融语言学、计算机科学、数学于一体的科学。
因此，这一领域的研究将涉及自然语言，即人们日常使用的语言，
所以它与语言学的研究有着密切的联系，但又有重要的区别。
自然语言处理并不是一般地研究自然语言，
而在于研制能有效地实现自然语言通信的计算机系统，
特别是其中的软件系统。因而它是计算机科学的一部分。
'''

class BM25(object):

    def __init__(self, docs):
        self.D = len(docs)
        self.avgdl = sum([len(doc)+0.0 for doc in docs]) / self.D
        self.docs = docs
        self.f = []  # 列表的每一个元素是一个dict，dict存储着一个文档中每个词的出现次数
        self.df = {} # 存储每个词及出现了该词的文档数量
        self.idf = {} # 存储每个词的idf值
        self.k1 = 1.5
        self.b = 0.75
        self.init()

    def init(self):
        for doc in self.docs:
            tmp = {}
            for word in doc:
                tmp[word] = tmp.get(word, 0) + 1  # 存储每个文档中每个词的出现次数
            self.f.append(tmp)
            for k in tmp.keys():
                self.df[k] = self.df.get(k, 0) + 1
        for k, v in self.df.items():
            self.idf[k] = math.log(self.D-v+0.5)-math.log(v+0.5)

    def sim(self, doc, index):
        score = 0
        for word in doc:
            if word not in self.f[index]:
                continue
            d = len(self.docs[index])
            score += (self.idf[word]*self.f[index][word]*(self.k1+1)
                      / (self.f[index][word]+self.k1*(1-self.b+self.b*d
                                                      / self.avgdl)))
        return score

    def simall(self, doc):
        scores = []
        for index in range(self.D):
            score = self.sim(doc, index)
            scores.append(score)
        return scores

if __name__ == '__main__':
    sents = utils.get_sentences(text)
    doc = []
    for sent in sents:
        words = list(jieba.cut(sent))
        words = utils.filter_stop(words)
        doc.append(words)
    print(doc)
    s = BM25(doc)
    print(s.f)
    print(s.idf)
    print(s.simall(['自然语言', '计算机科学', '领域', '人工智能', '领域']))
```

### Dice 系数法（DiceCoefficient）

- todo

### 编辑距离

字符串的相似性比较应用场合很多，像拼写**纠错**、文本**去重**、上下文**相似性**等。

评价字符串相似度最常见的办法就是：把一个字符串通过插入、删除或替换这样的编辑操作，变成另外一个字符串，所需要的最少编辑次数，这种就是**编辑距离**（edit distance）度量方法，也称为**Levenshtein距离**。海明距离是编辑距离的一种特殊情况，只计算**等长**情况下替换操作的编辑次数，只能应用于两个等长字符串间的距离度量。

其他常用的度量方法还有：`Jaccard` distance、`J-W`距离（Jaro–Winkler distance）、`余弦`相似性（cosine similarity）、`欧氏`距离（Euclidean distance）等。

【2021-11-8】[Python Levenshtein 计算文本之间的距离](https://blog.csdn.net/u014657795/article/details/90476489)
- pip install difflib
- pip install python-Levenshtein

```python
import difflib

query_str = '市公安局'
s1 = '广州市邮政局'
s2 = '广州市公安局'
s3 = '广州市检查院'

seq = difflib.SequenceMatcher(None, s1, s2)
ratio = seq.ratio()
print 'difflib similarity1: ', ratio

# difflib 去掉列表中不需要比较的字符
seq = difflib.SequenceMatcher(lambda x: x in ' 我的雪', str1,str2)
ratio = seq.ratio()
print 'difflib similarity2: ', ratio

print(difflib.SequenceMatcher(None, query_str, s1).quick_ratio())  
print(difflib.SequenceMatcher(None, query_str, s2).quick_ratio())  
print(difflib.SequenceMatcher(None, query_str, s3).quick_ratio())  
# 0.4
# 0.8 --> 某一种相似度评判标准下的最相似的文本……
# 0.08695652173913043

import Levenshtein
# (1) 汉明距离，str1和str2必须长度一致。是描述两个等长字串之间对应位置上不同字符的个数
Levenshtein.hamming('hello', 'world') # 4
Levenshtein.hamming('abc', 'abd') # 1
# (2) 编辑距离（也成Levenshtein距离）。是描述由一个字串转化成另一个字串最少的操作次数，在其中的操作包括插入、删除、替换
Levenshtein.distance('hello', 'world') # 4
Levenshtein.distance('abc', 'abd') # 1
Levenshtein.distance('abc', 'aecfaf') # 4
# (3) 莱文斯坦比。计算公式 r = (sum - ldist) / sum, 其中sum是指str1 和 str2 字串的长度总和，ldist是类编辑距离
# 注意：这里的类编辑距离不是2中所说的编辑距离，2中三种操作中每个操作+1，而在此处，删除、插入依然+1，但是替换+2
# 这样设计的目的：ratio('a', 'c')，sum=2,按2中计算为（2-1）/2 = 0.5,’a’,'c’没有重合，显然不合算，但是替换操作+2，就可以解决这个问题。
Levenshtein.ratio('hello', 'world') # 0.2
Levenshtein.ratio('abc', 'abd') # 0.6666666666666666
Levenshtein.ratio('abc', 'aecfaf') # 0.4444444444444444
# (4) jaro距离
Levenshtein.jaro('hello', 'world') # 0.43333333333333335
Levenshtein.jaro('abc', 'abd') # 0.7777777777777777
Levenshtein.jaro('abc', 'aecfaf') # 0.6666666666666666
# (5) Jaro–Winkler距离
Levenshtein.jaro_winkler('hello', 'world') # 0.43333333333333335
Levenshtein.jaro_winkler('abc', 'abd') # 0.8222222222222222
Levenshtein.jaro_winkler('abc', 'aecfaf') # 0.7

```


## 分类

- 目标函数分为两大类。
  - 第一类是最大化，包括最大化盈利，最大化效率。
  - 另一类是最小化，包括最小化费用、时间和错误率。在金融行业，我们可以最大化预测股价的正确率，也可以最小化费用、最小化时间和错误率。
- 当然，我们可以同时最大化盈利，最小化费用和时间。所以通常在很多的优化问题中，这两种任务可以组合起来出现在同一个问题框架下，这就是对于目标函数的定义。

## 凸优化

现实生活中，几乎所有问题的本质都是非凸的

### 基础概念

凸函数、凸集、凸锥（简称“三凸”）的定义

#### 凸函数

【2021-5-31】[理解凸性:为什么梯度下降适用于线性回归](https://www.toutiao.com/i6817344123704443404)

首先，通过凸集和凸函数定义凸度。

凸集的定义如下:
- ![理解凸性:为什么梯度下降适用于线性回归](https://p3-tt.byteimg.com/origin/pgc-image/9eda7c3599bd4983babdbc0edd64044c?from=pc)
 
在二维中，我们可以将凸集视为一个形状，无论您用什么线连接集中的两个点，都不会在集外。
- ![理解凸性:为什么梯度下降适用于线性回归](https://p6-tt.byteimg.com/origin/pgc-image/be14dc2b815140dbbf351628459fc98f?from=pc)
 （左）凸集，（中）非凸集，（右）凸集
 
凸集的定义正好体现在凸函数的定义中，如下所示：
- ![理解凸性:为什么梯度下降适用于线性回归](https://p3-tt.byteimg.com/origin/pgc-image/a53f22a6df8e47729ee4f32710636a13?from=pc)

你可以直观地把凸函数想象成这样的函数:如果你画一条从(x,f(x))到(y,f(y))的直线，那么凸函数的图像就会在这条直线的下方。下面是三个例子，我们应用这个直觉来确定函数是否是凸的。
- ![理解凸性:为什么梯度下降适用于线性回归](https://p3-tt.byteimg.com/origin/pgc-image/edbe443661144544ae4ef6fda5fd9a42?from=pc)
- （左）具有唯一优化器的凸函数，（中）非凸函数，（右）具有多个优化器的凸函数
 
可以看到中间的图不是凸的，因为当我们绘制连接图上两个点的线段时，有一些点（x，f（x））大于f（x）上对应的点。

左边和右边的图形都是凸的。不管你在这些图上画什么线段，这个线段总是在函数图的上面或者等于函数图。

梯度下降以最简单的形式没有找到全局最小化器。
- ![](https://p1-tt.byteimg.com/origin/pgc-image/1a67811e997e4f41a6bc035aeddf93d0?from=pc)

注：y=wx+b 既是凸函数，又是凹函数

#### LR是凸函数

【2020-9-2】logistic 回归当约束所有的参数为非负的时候还是有全局最优的吗？
- LR是凸函数，已被证明（[逻辑回归目标函数为凸函数证明](https://zhuanlan.zhihu.com/p/76639936)）；损失函数的海塞矩阵是正定的
  - 如何判定凸函数？ 若函数二阶导数为正， 则该函数为凸函数， 同理， 对于多元函数，则是其Hessian矩阵 为正定矩阵， 则该函数为凸函数；
  - 凸函数的局部最优解即是全局最优解
  - 凸优化：**目标函数**是`凸函数`而且优化变量的**可行域**是`凸集`，是因为缺其中任何一个条件都不能保证局部最优解是全局最优解
-  kkt 是个必要条件， 不敢完全判断带约束的也是有全局最优的解；
- 带约束的优化， 可行域如果不是凹区域， 凸函数在这个可行域上也是有全局最优解；如果可行域是凸集，则凸函数在这个可行域上也是有全局最优解的，参考：[理解凸优化](https://zhuanlan.zhihu.com/p/37108430)，[熊军的笔记](https://note.youdao.com/ynoteshare1/index.html?id=a49d2e78bb131dcb591291a5f6126b78&type=note)

- 代码

```python
# coding=utf8
"""
本代码主要实现两种带约束的lr的算法步骤：
数据集： iris 数据集
"""

import torch
from torch.nn.functional import cross_entropy
from torch.optim import SGD
from sklearn.datasets import load_iris
from torch.utils.data import dataset
from torch.utils.data import dataloader
import seaborn as sns
import matplotlib.pyplot as plt


class Ds(dataset.Dataset):
    """
    构建一个dataset类， 继承torch官方的Dataset
    """
    def __init__(self):
        super(dataset.Dataset, self).__init__()
        iris_data = load_iris()
        self.data = iris_data['data']
        self.labels = iris_data['target']

    def __len__(self):
        return len(self.labels)

    def __getitem__(self, item):
        x = self.data[item]
        y = self.labels[item]
        x = torch.Tensor(x)
        y = torch.LongTensor([y])
        return x, y


class Trainer(object):
    def __init__(self):
        """
        训练集合的特征个数是4， 类别是3
        """
        self.model = torch.nn.Linear(4, 3)
        self.zeros = torch.zeros(3, 4)
        self.modify_weight()
        # 打印初始的模型参数， 确保所有的参数大于等于0
        print(self.model.weight)

    def train(self, epochs=1000, batch_size=16, lr=0.01):
        dl = self.get_data_loader(batch_size)
        loss_func = cross_entropy  # 定义损失函数为logistic的损失函数
        optimizer = SGD(self.model.parameters(), lr=lr)
        loss_arr = []
        for epoch in range(epochs):
            cur_loss = self.train_epoch(epoch, dl, loss_func, optimizer)
            loss_arr.append(cur_loss)

        print("*" * 100)
        print("following is the parameters of the model")
        for name, parameters in self.model.named_parameters():
            print(name)
            print(parameters.data)
        print(loss_arr)
        do_plot(list(range(epochs)), loss_arr)

    def train_epoch(self, epoch, dl, loss_func, optimizer):
        self.model.train()
        loss_arr = []
        for batch in dl:
            self.model.zero_grad()  # 将所有的gradient 重置为0
            x, y = batch
            y = torch.squeeze(y, 1)  # 将里面的二维数组变成一维数组
            pred = self.model(x)
            loss = loss_func(pred, y)  # 计算logloss
            loss.backward()
            optimizer.step()
            self.modify_weight()
            print(f"epoch is: {epoch}, training loss is: {loss.item()}")
            loss_arr.append(loss.item())
        return sum(loss_arr) / len(loss_arr)

    def get_data_loader(self, batch_size):
        # 初始化iris 的dataset
        ds = Ds()
        dl = dataloader.DataLoader(ds, batch_size)
        return dl

    def modify_weight(self):
        """
        用来修改模型，让模型参数在可行区域
        """
        new_para = torch.max(self.zeros, self.model.weight.data)
        self.model.weight.data.copy_(new_para)


def do_plot(epoch_arr, loss_arr):
    """
    用来画不同epoch 对应的loss
    """
    sns.lineplot(x="epoch", y="loss", data={"epoch": epoch_arr, "loss": loss_arr})
    plt.show()


if __name__ == "__main__":
    trainer = Trainer()
    trainer.train()
```


### 什么是凸优化

什么是凸优化？抛开凸优化中的种种理论和算法不谈，纯粹的看优化模型，凸优化就是：
- 1、在**最小化**（最大化）的要求下
- 2、**目标函数**是一个凸函数（凹函数）
- 3、同时约束条件所形成的**可行域**集合是一个**凸集**。

以上三个条件都必须满足。而世间万物千变万化，随便抽一个函数或集合它都可能不是凸的。


### 为什么凸优化重要

Convex VS Non-Convex

对比
- [img](https://pic1.zhimg.com/80/v2-15fbe3739bda767c0ffe2efecb5877ab_1440w.jpg?source=1940ef5c) ![](https://pic1.zhimg.com/80/v2-15fbe3739bda767c0ffe2efecb5877ab_1440w.jpg?source=1940ef5c)

`凸优化`-相对简单
- （1）凸优化有个非常重要的定理，任何**局部**最优解即为**全局**最优解。
  - 因此，只要设计一个较为简单的局部算法，例如**贪婪算法**（Greedy Algorithm）或**梯度下降法**（Gradient Decent），收敛求得的局部最优解即为全局最优。因此求解凸优化问题相对来说是比较高效的。
- （2）可微分的凸优化问题满足KKT条件，因此容易求解：

这也是为什么机器学习中**凸优化**的模型非常多，毕竟机器学习处理海量的数据，需要非常高效的算法。

`非凸优化`-非常困难
- 非凸优化问题被认为是非常难求解的，因为可行域集合可能存在**无数个**局部最优点，通常求解全局最优的算法复杂度是**指数级**的（NP难）
- 最经典的算法要算**蒙特卡罗投点法**了，大概思想: 随便投个点，然后在附近区域（可以假设convex）用两种方法的进行搜索，得到局部最优值。然后随机再投个点，再找到局部最优点--如此反复，直到满足终止条件。
- 假设有1w个局部最优点，你至少要投点1w次吧？并且还要假设每次投点都投到了不同的区域，不然只会搜索到以前搜索过的局部最优点。


这个世上的绝大部分优化问题非凸。既然如此，为什么凸优化这么重要，以及凸优化有什么用呢？
- 另外，凸优化并不能看成是某一种优化方法）

无非三点：参考 [凸优化为什么重要](https://www.zhihu.com/question/24641575/answer/503148929)
- 1、<span style='color:blue'>相当一部分问题是或等价于凸优化问题</span>。
  - 有许多问题都可以**直接**建立成**凸优化模型**
    - 比如：线性规划LP（Linear Programming）、某些特殊的二次规划QP（Quadratic Programming）、锥规划CP（Conic Programming）其中包括：要求约束中变量落在一个二阶锥里的二阶锥规划SOCP（Second Order Cone Programming）、要求约束中变量是半正定矩阵的半定规划SDP（Semi-Definite Programming）等）。
    - 以上这些类型，总之就是要符合凸优化上述的要求。需要说明的就是，许多可行域都可以看作是`凸锥`（Convex Cone）的交集，所以将以上一些类型的约束混合起来，依然是凸优化问题。
  - 还有些问题可以等价的**转化**为凸优化问题。
    - 例如 Linear-Fractional Programming (LFP)，目标函数是两个仿射函数（Affine Function）的比，约束是一个多面体。这种目标函数具有既是拟凸又是拟凹的性质，通过一个叫做 Charnes-Cooper transformation 的转化，可以变成一个线性规划。同时，如果我们要最大化 LFP 的目标函数，且其约束仅是一个0-1整数约束（这显然不是一个凸集），我们可以将其直接松弛（Relax）成0到1的约束，并且和原问题等价。因为最大化拟凸函数，最优值一定可以落在可行域的极点上。这个结论可以用来帮助解决 Multi Nomial Logit（MNL）选择模型下的商品搭配问题（ Assortment Optimization）。
    - 又例如，与组合优化相关的整数规划模型里，当最小化一个线性函数  ，变量  只能取整数，约束条件为  时，如果  为整数向量且  是完全幺模（Totally Unimodular）的矩阵，我们可以将原问题松弛，即将整数约束去掉，变成线性规划。此时的最优解必然仍为整数，且即是原问题的最优解。这一结论经常用于调度（Scheduling）问题和指派（Appointment）问题。以上两类问题即是与凸优化直接等价的问题，还有一些优化问题本身就是NP-Hard，怎么处理我们后面再说。
- 2、<span style='color:blue'>大部分凸优化问题解起来比较快，也即**多项式时间**可解问题（P）</span>。
  - 如果问题能直接或间接（但必须是等价的）转化成上面我提到的那些类型，那恭喜你，后面的事儿基本就可以交给solver啦，当然大规模问题还需要考虑诸如列生成（Column Generation）之类的方法，提高运算效率。
  - 那为什么大部分凸优化解起来比较快呢？这涉及到凸函数的<span style='color:red'>局部最优即全局最优</span>的性质以及`凸集分离定理`（Seperation Theorem）。
  - 根据凸函数（或凹函数）的定义，可以想象成站在函数的曲线上去搜索最优解，所要做的无非就是向下到底（或向上到顶），需要考虑的是用什么样的角度迈出第一步以及每的步子要迈多大才更快的到达最优值。同时，作为凸集的可行域，更容易在有限范围内迅速锁定最优解，而不用四处打探。
  - 以线性规划为例（目标函数既凸且凹，所以最大化最小化皆可），想象你在目标函数那个超平面上一路狂奔，因为是最小化（或最大化），你得往觉得最轻松（或费劲）的下坡（上坡）方向跑，跑着跑着，你就碰到可行域这个多面体的墙壁了。没关系，你感觉贴着壁的某个方向还是可以轻松（或费劲）地继续跑，跑着跑着到了一个拐角，即所谓的极点。你觉得再走下去就费劲（或省力）了，这样就找到了一个最优的极小值（极大值），否则，你可以沿着墙壁继续走下去。如果，这个时候的可行域不是凸集，而是被人胡乱咬了一口，形成了凹凸不平的缺口。如上方法搜索，你可能已经到达这个缺口的某一个角落，前方已经没有任何能改善你可行解的道路了，你可以就此停止吗？不能！因为想象有另一个你，也如上所述，跑到了这个缺口的另一个无处可走的角落，他也认为自己可以停止了，那你们就还需要比较两个各自所在的位置的解，哪一个会更优。当然，可能还有第三个你，第四个你。。。但不要忘了，每一个你的搜索都需要时间，最终的比较也需要时间（除非你们之间没有缺口，可能都会继续跑下去，到达了一个共同的最优值）。所以非凸的可行域要比一个凸集的可行域麻烦的多。（注：以上形象化的描述的未必就是多项式时间的算法。现实中如单纯形法就不是多项式时间的算法，但实际运用中仍然很高效。）
  - 当然，也有例外，即<span style='color:blue'>虽然是凸优化但不是多项式时间可解的</span>。比如在约束中，要求变量是一个Copositive 矩阵或者 Completely Positive 矩阵，这两种矩阵所在的锥恰为`对偶锥`。此类问题很难解的原因在于，要去检查一个矩阵是不是落在这样的锥里，就已经不是多项式时间可以解决的了，更不用说整个优化问题。
- 3、<span style='color:blue'>很多非凸优化或NP-Hard的问题可以转化（并非是等价的）为P的凸优化问题</span>。并给出问题的界或近似。这对如何设计合理的算法，或衡量算法结果的优劣起到很大的帮助。非凸优化的问题基本上都是NP-Hard的，所以要找到其最优解，理论上是不确定有一个多项式时间的算法的，所以这时候会考虑设计一些近似算法，或者启发式算法，就要依靠凸优化。要把一个优化问题转化为凸优化的方法和例子有很多。
  - 对偶（Duality）是每个学习运筹学或者凸优化的人都必须熟练掌握的方法，对偶有很多种，本科运筹就教会大家写一个线性规划的对偶形式，高等数学里面也会提到用到拉格朗日乘子之类的约束优化问题，也即解拉格朗日对偶或者KKT条件。一般的，对于许多非凸优化的问题，我们仍然可以写出它的拉格朗日对偶。如原问题如下  ，拉格朗日对偶为  ，其中  。可以看到  是关于  的线性函数，因此  一定是一个关于  的凹函数。因此，由我们之前给的定义来看，拉格朗日对偶永远都是一个关于对偶变量的凸优化问题，并且根据弱对偶定理，可以给出原问题的下界。
  - 松弛（Relaxation）也是常用的方法之一，在第一点里，我们举了一些例子可以通过松弛，去掉整数约束，使其等价为凸优化。通常情况下，我们松弛原问题，只能得到一个可行域更大的问题，如果原问题是求最小，则松弛后的问题的最优值一定小于等于原问题的最优值，这也是一种给出下界的方法。松弛不仅仅用于整数约束，只要利于将可行域非凸变为凸集皆可。例如，某问题有一约束为  ，就不构成一个凸集，但等价于  和  ，前一个不等式即构成凸集，因此我们可以将后一个不等式从约束中去除，就得到原问题的一个凸优化松弛问题。
  - 还可以举一个同时用到对偶加松弛的例子，在第二点的最后，我们聊到Copositive（CoP） 矩阵与 Completely Positive(CP)矩阵，他们的锥与半正定（PSD）矩阵锥的关系是  。组合优化中很多问题都可以松弛成一个Completely Positive规划（去掉一个矩阵为Rank 1 的条件），由于Copositive和Completely Positive互为对偶锥，所以我们可以先写出对偶，写成 Copositive 规划，然后在某些假设之下，能证明 Copositive 规划与原问题等价。当然，如果没有那些假设，还可以尝试将Completely Positive约束，松弛成半正定矩阵的约束，因为Completely Positive必然是半正定，同时还加上Completely Positive的性质，如矩阵的所有元素都大于等于0。这样我们就得到了原问题的一个凸优化且易解的对偶松弛问题，一个SDP Relaxation。
  - 当然，相应的处理方法还有很多，面临一些随机优化（Stochastic Optimization）、机会约束规划（Chance Constrained Programming）、鲁棒优化（Robust Optimization）、离散凸优化（Discrete Convex Optimization）问题，还有更多其他的处理方法，就不在此一一道来。更多内容，可以看各位答案里推荐的书籍，都是经典教材。


### 运筹学

`线性规划`是运筹学最基础的课程，其**可行域**（可行解的集合）是**多面体**（polyhedron），具有着比普通的凸集更好的性质。因此是比较容易求解的（多项式时间可解）

运筹学中（混合）整数规划与非凸优化的关系
- （混合）`整数规划`被称为极度**非凸**问题（highly nonconvex problem），如下图：
- ![](https://pica.zhimg.com/80/v2-cec5a2ac6fff5d7c8d3dc33ce023093b_1440w.jpg?source=1940ef5c)
- 实心黑点组成的集合，是一个离散集，按照1中判断一个集合是否为凸集的技巧，我们很容易验证这个离散集是非凸的。
- 因此整数规划问题也是一个非凸优化问题，并且它也是NP难的。
- 整数规划的求解思路，被分解为求解一个个的线性规划（凸优化）问题。

（混合）整数规划为何重要？
- 虽然时间是连续的，但是社会时间却是离散的。
- 例如时刻表，通常都是几时几分，即使精确到几秒，它还是离散的（整数）。没见过小数计数的时刻表吧？
- 对现实社会各行各业问题数学建模的时候，整数变量有时是不可避免的。例如：x辆车，y个人。x，y这里便是整数变量，小数是没有意义的。

### 神经网络损失函数

神经网络损失函数是凸函数吗？<span style='color:red'>不是</span>
- 深度学习里的损失函数，是一个**高度复合**的函数。
- 什么叫复合函数？例如h(x)=f(g(x))就是一个f和g复合函数。
  - 当f，g都是线性的时候，h是**线性**的。
  - 但在深度学习里用到的函数，Logistic, ReLU等等，都是**非线性**，并且非常多。把他们复合起来形成的函数h,便是**非凸**的。
- 求解这个非凸函数的最优解，类似于求凸优化中某点的gradient，然后按照梯度最陡的方向搜索。不同的是，复合函数无法求gradient，于是这里使用Back Propagation求解一个类似梯度的东西，反馈能量，然后更新。

深度学习的优化问题在运筹学看来是“小儿科”
- 深度学习中的优化问题，虽然目标函数非常复杂，但是它没有**约束**，是一个**无约束**优化问题！
- 运筹学由**目标函数**和**约束条件**组成，而约束条件是使得运筹学的优化问题难以求解的重要因素（需要搜寻可行解）。

要点
- 全局最优不一定是好的解，局部最优不一定是差的解
- NN中设计得激活函数是为了引入非线性变换，凸不凸都可以；
  - NN不凸，是多个隐藏层导致的，即使每一层激活函数都是凸的，目标函数依旧是非凸问题。
- 激活函数设计为凸就可以得到凸的优化目标，然而NN不凸，是多个隐藏层导致的，即使每一层激活函数都是凸的，目标函数依旧是非凸问题
- 凸的NN，以前也有人做过。比如：Yoshua Bengio的Convex Neural Networks，还有 Convex Deep Learning via Normalized Kernels。

activation 是凸函数，多层之后好多凸函数的composition 也不一定是凸的。
- $f(x)=e^{-x}f(x)=e^{-x}$

多层神经网络，大部分局部极小值都在底部 ，已经非常接近全局最小值
- [img](https://pica.zhimg.com/80/f301045327715acec1a67db7848d7171_1440w.jpg?source=1940ef5c) ![](https://pica.zhimg.com/80/f301045327715acec1a67db7848d7171_1440w.jpg?source=1940ef5c)

deep learning是在一个非常**高维**的世界里做**梯度下降**。这时的 local minimum 很难形成，因为局部最小值要求函数在所有维度上都是局部最小。更实际得情况是，函数会落到一个saddle-point上
- [img](https://pica.zhimg.com/80/3275d4735030d2d4130a15435f42eef4_1440w.jpg?source=1940ef5c) ![](https://pica.zhimg.com/80/3275d4735030d2d4130a15435f42eef4_1440w.jpg?source=1940ef5c)
- saddle-point上会有一大片很平坦的平原，让梯度几乎为0，导致无法继续下降。反倒是local/global minimum的问题，大家发现其实不同的local minimum其实差不多（反正都是over-fitting training data，lol）

作者：[Filestorm](https://www.zhihu.com/question/38549801/answer/77047264)

### 高维优化为什么难？

【2022-5-18】[关于神经网络，一个学术界搞错了很多年的问题](https://mp.weixin.qq.com/s/i_tldPMzYDUZwdXDCJTjPw)

人们普遍认为较大的神经网络中包含很多**局部极小值**（local minima），使得算法容易陷入到其中某些点。这种看法持续二三十年，至少数万篇论文中持有这种说法。比如，如著名的Ackley函数 。对于基于梯度的算法，一旦陷入到其中某一个局部极值，就很难跳出来了。
- [img](https://zhengwen.aminer.cn/LDDRQt9JmGgtf) ![](https://zhengwen.aminer.cn/LDDRQt9JmGgtf)

2014年，一篇论文《Identifying and attacking the saddle point problem in high-dimensional non-convex optimization》，指出**高维优化问题中根本没有那么多局部极值**。作者依据统计物理，随机矩阵理论和神经网络理论的分析，以及一些经验分析提出高维**非凸**优化问题之所以困难，是因为存在大量的`鞍点`（梯度为零并且Hessian矩阵特征值有正有负）而不是局部极值。
- [img](https://zhengwen.aminer.cn/B2KCcVJQiRvNk) ![](https://zhengwen.aminer.cn/B2KCcVJQiRvNk)

`鞍点`（saddle point)如下图（来自wiki）和`局部极小值`
- 相同点：在该点处的梯度都等于零
- 不同点：在鞍点附近Hessian矩阵有正的和负的特征值，即是**不定**的，而在局部极值附近的Hessian矩阵是**正定**的。
鞍点附近，基于梯度的优化算法（几乎目前所有的实际使用的优化算法都是基于梯度的）会遇到较为严重的问题，可能会长时间卡在该点附近。在鞍点数目极大的时候，这个问题会变得非常严重
- [img](https://zhengwen.aminer.cn/JZpNdRuLbXRMB) ![](https://zhengwen.aminer.cn/JZpNdRuLbXRMB)

造成神经网络难以优化的一个重要（乃至主要）原因是存在大量鞍点。造成局部极值这种误解的原因在于，人们把低维的直观认识直接推到高维的情况。

### 鞍点

- `鞍点`也是`驻点`，鞍点处的梯度为零，在一定范围内沿梯度下降会沿着鞍点附近走，这个区域很平坦，梯度很小。
- 优化过程不是卡在鞍点不动了(像人们以为的局部极值那样)，而是在**鞍点附近梯度很小**，于是变动的幅度越来越小，loss看起来就像是卡住了。但是和local minima的差别在于，如果运行时间足够长，SGD一类的算法是可以走出鞍点附近的区域的（看下面的两个链接）。由于这需要很长时间，在loss上看来就像是卡在local minima了。然而，从一个鞍点附近走出来，很可能会很快就进入另一个鞍点附近了。
- 直观来看增加一些扰动，从下降的路径上跳出去就能绕过鞍点。但在高维的情形，这个鞍点附近的平坦区域范围可能非常大。此外，即便从一个鞍点跳过，这个跳出来的部分很可能很快进入另一个鞍点的平坦区域—— 鞍点的数量(可能)是指数级的。

### 遗传算法和进化算法（EA）

先说优点，EA通常是不依赖于函数值的，而只依赖于点之间的大小关系，comparison-based，这样进行迭代的时候不会受到梯度太小的影响。看起来似乎是一个可行的路子？下面说一下缺点。
- 先说CMA-ES， 这是效果最好最成功的进化算法之一，尤其是在ill-conditioned 问题和non-separable 问题上。CMA-ES （Covariance Matrix Adaptation-Evolution Strategy）和EDA (Estimation of Distribution Algorithm)的特点是 model-based，他们从一个正态分布采样产生一组新解，使用较好的一部分（一半）新解更新分布的参数（mean， cov或对应的Cholesky factor，对CMA-ES来说还有一个独立步长）。CMA-ES和EDA这样基于分布的算法大体上都能从information geometric optimization （IGO） 用natural gradient 得到。IGO流的收敛性和算法本身在一类问题上的收敛性都不是问题，Evolution path更是动量的类似。然而这些方法最大的问题在于，由于依赖随机采样，当维度很高的时候采样的空间极大，需要极多的样本来逐渐估计cov ()量级），采样产生新解的时候的复杂度是(不低于）)。EA的论文普遍只测试30,50-100维，500-1000维以上的极少，即便是各种large scale的变种也大多止步于1000。对于动辄 量级的神经网络优化，基本是不可行的。
- DE/PSO这类算法。特点是无模型，不实用概率分布采样的方法产生新解，使用多个点（称为一个种群，population)之间的相互（大小）关系来模拟一个下降方向。这种基于种群的方法对有较多局部极值的问题效果较好，但是对ill-conditioned 问题性能较差，在non-separable+ill-conditioned问题效果有限。更进一步的，这类算法为了维持种群多样性，通常只进行两两比较（两两比较的选择压力小于截断选择，即某些新解不比父本好，但是比种群中其他解好，这样的解被丢弃了），好的个体进入下一代。然而随着维度增加，新生个体比父代好的比例急剧下降，在ellipsoid函数上100维左右的时候就已经降低到5%以下。实验研究 Differential Evolution algorithms applied to Neural Network training suffer from stagnation
总体上，EA在连续优化问题上的主要问题就是搜索效率不高，相比基于梯度的算法要多倍的搜索。与此相似的实际上是坐标下降法（coordinate descent），同样不使用梯度，同样要求多倍的搜索。

## 最优化问题的两大类：连续优化与离散优化

- 关于约束条件，理想很美好，现实很骨感，在现实生活中，我们会遇到比如预算有限、时间有限、外部强制性条件等各种各样的问题，与目标函数一样，这些限制条件不是单一存在的，也可能同时存在同一个问题里，对于某一个优化问题来讲，限制条件越复杂，求解就越困难。
- 基于此，我们简单根据它的约束条件以及目标函数变量类型将最优化问题分成两大类，连续优化和离散优化。
    - 相较而言，离散优化会更难解决，因为离散优化多了一条限制条件 -- 不连续的集合。很多时候，我们要求我们的变量是一个整数，或者来自一个给定的区间，所以说离散优化会比连续优化更难解，而两种算法也会有非常大的不一样。
    - 从学术角度而言，连续优化与离散优化对应的是两个比较独立的学科，离散优化可能更多的应用于统计、大数据相关的场景，连续优化则会跟计算机密码学相关，更多的与我们现实生活中的运筹优化应用相关。
![](https://inews.gtimg.com/newsapp_bt/0/12108607685/641)

## 全局优化与局部优化

![](https://inews.gtimg.com/newsapp_bt/0/12108607686/641)
- 从目标函数出发，它的最优值也分为两类，**局部**最优和**全局**最优。看图中黄色的点，在局部区域内是最低的，这个值叫做局部最优值，但是当看整个图时，红色的点才是最低的，所以这个点我们叫全局最优值。
- 通常来说，取局部最优值是相较容易的，因为基本上只需要看它临近一小部分的信息就可以准确判断是否局部最优，而在现实应用中，其实仅仅知道局部最优值就足以解决很多问题。而更难的问题在于全局最优值，因为前提是你需要看到整个画面。
- 所以，对于这一类问题，目前没有一个特别好的解决方法。现实生活中，会有比较多的方法去求局部最优值，而往往找到的几乎跟实际上的全局最优值不一样。
- 但有一个问题是例外，这类问题它具有比较好的性质，只要找到局部最优值，它就肯定是全局最优值，这类问题就叫凸优化。

## 凸优化问题中的最优值
 
![](https://inews.gtimg.com/newsapp_bt/0/12108607687/641)
 
凸优化的关键字在“凸”，要定义什么样的东西是凸的呢？看上图，蓝色区域代表优化问题里变量可以取值的空间，当取值空间是凸的时候，这是凸优化的一个必要条件。
 
那么什么样的集合是凸的集合？在集合里任意选两点X、Y，将这两点连成线，从X到Y的这条线上所有的点都必须在集合里，只有这样的集合才叫做凸的集合。
 
相反，如果有任意一个点在集合之外，那就不是凸的集合。而对于一个凸优化的问题而言，它所有的变量取值必须来自于凸的集合。
 
所以说，对于所有的离散优化而言，它都不是凸优化的，因为它的取值其实不是一个空间，而是一个洞一个洞的，它是很多洞的集合。
 
所以，通常求解这类问题时很困难，很多时候我们求解的都是一个局部最优值。在实际生活中，我们求解的都是局部优化的问题，而这类问题在所有问题中所占比例是非常非常低的。
 
如果把整个集合看作一个优化问题的集合，那么相对来讲，比较小的一部分是属于连续优化的问题，其他更大的区域属于离散优化的问题，而在连续优化的空间里只有很小的一部分属于凸优化的问题。所以说，在最优化的领域里，我们真正解决的只是实际问题中的冰山一角。
 
## 凸优化问题的经典算法

- 【2020-10-4】[凸优化-笔记整理（1）——引入，优化实例分析，凸集举例与相关性质](https://zhuanlan.zhihu.com/p/194308254)
    - 1940年，Bellman发展了动态规划算法 (Dynamic Programming，DP)。这个算法的关键在于，状态转移不再是从前往后，而是从后往前。这样的话可以避免很多重复计算。
    - 提到凸优化，一般会提**单纯形法**（Simplex Method），1947年由Dantzig完善。
    - 说到数值优化，都会提一下**内点法**（Interior Point Method）。内点法是1984年由Karmarkar完善。
    - 而之后的很多优化的发展，都关注在了内点法的很多细节上。

对于凸优化的问题，黄铂博士给大家介绍几个最经典的算法。
- （1）第一个算法，`最速下降法`。首先，这是一个等高线，可以把它理解为我们的高楼，每一个圈代表一层，最中心是最高的位置，最终目标是用最快的方式上到中心位置。
  - 那么，最速下降法是怎么做的呢？比如从一楼上二楼可以有多种方法，很明显我们从垂直方向往上跳，在局部来看是最快的，然后以这样的方法上到最高层。
  - ![](https://inews.gtimg.com/newsapp_bt/0/12108607688/641)
  - 最速下降法有哪些特点呢？每一步都做到了最优化，但很遗憾的是，对于整个算法而言，它并不是非常好的算法。因为它的收敛速度是线性收敛，线性收敛对于最优化算法而言是一种比较慢的算法，但也是凸优化里最自然的一个算法，最早被应用。
- （2）第二个算法，`共轭梯度法`。与最速下降法相比较（看下图），绿色的线是最速下降法的迭代，从最外层到中心点可能需要五步迭代，但是共轭梯度法可能只需两步迭代（红色线）。
  - ![](https://inews.gtimg.com/newsapp_bt/0/12108607689/641)
  - 共轭梯度法最大特点是汲取前面的经验再做下一步的动作，比如从四楼上五楼，我们会考虑方向是否最佳，汲取之前跳过的四步经验，再探索新的方向往上跳。从数学的角度来讲，每一步前进的方向和之前所有走过的路径都是垂直的，因为这样的性质，共轭梯度法的收敛速度远远高于最速下降法。
- （3）第三个算法，`牛顿法`。前面两种算法，从数学的角度讲，他们只用到了一阶导数的信息，对于牛顿法而言，它不仅仅用到了局部一阶导的信息，还用到了二阶导的信息。
  - 相比前面两种算法，牛顿法的每一步，它在决定下一步怎么走时，不仅考虑当前的下降速度是否足够快，还会考虑走完这一步后，下一步坡度是否更陡，下一步是否更难走。可见，牛顿法所看到的区间会更远，收敛速度更快，属于二阶收敛速度。
  - 如果最速下降法需要100步的话，牛顿法就只需要10步，但也正因为牛顿法使用了二阶导的信息，所以它需要更多的运算量。
- （4）第四个算法，`拟牛顿法`。1970年，Broyden、Fletcher、Goldfarb、Shanno四人几乎同一时间发表了论文，对于传统的牛顿法进行了非常好的改进，这个算法叫拟牛顿法，它的收敛速度与牛顿法相似，但是它不再需要计算二阶导数，所以每一步的迭代速度大大增加。
  - 它是通过当前一阶导数的信息去近似二阶导数的信息，因此整个运算速度大幅度增加。由于这个算法是四个人几乎同一时间发现的，所以也叫BFGS算法。下图中的照片是他们四个人聚在普林斯顿时拍的，很幸运的是，Goldfarb是我博士时期的导师。
  - 实际生活中，被应用最广的两种算法，一个是BFGS，另一个就是共轭梯度法。这两种算法经常会出现在很多的程序包里或者开源代码里，如果使用在大规模的优化问题或者成千上万个变量的问题中，也会有非常好的效果。

## 初始值

beale函数
- Beale函数是在二维中定义的多峰非凸连续函数。通常在（x，y）∈[-4.5,4.5]范围内进行评估。Beale函数是一个介于-4.5和4.5之间的双变量函数
- 该函数只有一个全局最小值（x，y）=（3,0.5

![](https://p1-tt.byteimg.com/origin/pgc-image/683adda2222c4441834f0623e9d7cb64?from=pc)

用beale函数分析初始化值对优化的影响，选择三个典型函数
- 随机梯度下降:随机梯度下降(SGD)算法每次执行一次更新，计算每一步的梯度。。
- momentum：通过考虑梯度在一段时间内的动量，解决了随机梯度下降更新缓慢的问题。
- Adam：被认为是最流行的优化算法。

可视化表示

![](https://p6-tt.byteimg.com/origin/pgc-image/de5d7b8efd904fc186bfd55b24ef046a?from=pc)

更换初始值

![](https://p6-tt.byteimg.com/origin/pgc-image/4554882a9eb84d2a9c1a93d9f9a0eb82?from=pc)

参考：[初始值对优化的影响](https://www.toutiao.com/i6800783287296983556/)



# 算法类型


## 优化算法总结

【2022-1-12】
- [An overview of gradient descent optimization algorithms](http://ruder.io/optimizing-gradient-descent/)
- [How to Escape Saddle Points Efficiently](http://www.offconvex.org/2017/07/19/saddle-efficiency/)
- [SGD算法比较](https://blog.slinuxer.com/2016/09/sgd-comparison)，[代码](https://github.com/SwordYork/simplified-deeplearning/tree/master/sgd-comparison)
- 如下图，注意：v是动量部分，g是梯度部分
- ![](https://raw.githubusercontent.com/SwordYork/simplified-deeplearning/master/sgd-comparison/figures/relation.png) ![](http://ruder.io/content/images/2016/09/contours_evaluation_optimizers.gif) ![](http://ruder.io/content/images/2016/09/saddle_point_evaluation_optimizers.gif)


## 梯度下降 GD

【2021-11-9】[梯度下降方法的视觉解释](https://www.toutiao.com/i6836422484028293640/)（动量，AdaGrad，RMSProp，Adam），原文：[A Visual Explanation of Gradient Descent Methods (Momentum, AdaGrad, RMSProp, Adam](https://towardsdatascience.com/a-visual-explanation-of-gradient-descent-methods-momentum-adagrad-rmsprop-adam-f898b102325c)

机器学习中，梯度下降的目标是损失函数最小化。好的算法可以快速/可靠地找到最小值，即不会陷入局部最小值，鞍点或平稳区域，而会求出全局最小值。

基本的梯度下降算法遵循这样的思想，即梯度的相反方向指向下部区域的位置。 因此，它会沿梯度的**相反**方向迭代地采取步骤。 

对于每个参数theta，它执行以下操作：
> - 增量delta =- 学习率 * 梯度
> - θ += 增量

Delta是算法每次迭代后theta的变化量； 希望随着每个这样的变化，θ逐渐接近最佳值。
- ![](https://p3.toutiaoimg.com/origin/pgc-image/e5527a9c5c2b436ab50a11fb9b0fb4b9)

## Vanilla SGD

Vannilla梯度下降法是普通的，因为仅对**梯度**起作用
- 朴素 SGD (Stochastic Gradient Descent) 最为简单，没有动量的概念
    - ![](https://www.zhihu.com/equation?tex=%5Ctheta_%7Bi%2B1%7D%3D+%5Ctheta_t+-+%5Ceta+g_t)
    - ![](https://pic3.zhimg.com/80/v2-2476080e4cdfd489ae64ae3ceeafe48b_720w.jpg)
缺点
- 收敛速度慢，可能在鞍点处震荡。
- 如何合理的选择学习率是 SGD 的一大难点。

## 动量 Momentum

- SGD 在遇到沟壑时容易陷入震荡。为此，可以为其引入**动量** Momentum，加速 SGD 在正确方向的下降并抑制震荡。
- 动量算法（或简称为动量）的梯度下降借鉴了物理学的思想。 想象一下，将球滚动到无摩擦碗内。 累积的动量并没有停止在底部，而是将其向前推动，并且球不断来回滚动。
- 公式
  - ![](https://www.zhihu.com/equation?tex=m_t+%3D+%5Cgamma+m_%7Bt-1%7D+%2B+%5Ceta+g_t)

> - 增量 =- 学习率 * 梯度 + 上一个增量衰变率
> - θ += 增量

- Momentum descent with decay_rate = 1.0 (no decay).
  - ![](https://p3.toutiaoimg.com/origin/pgc-image/9e65f1b70c76486798e1899dfbfeba18?from=pc)
- 引入动量有效的加速了梯度下降收敛过程。
- ![](https://pic2.zhimg.com/80/v2-b9388fd6e465d82687680f9d16edcd2b_720w.jpg)

优点：
- 动量只是移动得**更快**（因为它累积了所有动量）
- 动量有逃避**局部最小值**的作用（因为动量可能将其推离局部最小值），或更好地通过**高原**地区。

## Nesterov Accelerated Gradient

- 人们希望下降的过程更加智能：算法能够在目标函数有增高趋势之前，减缓更新速率。
- NAG 即是为此而设计的，其在 SGD-M 的基础上进一步改进了步骤 1 中的梯度计算公式
    - ![](https://www.zhihu.com/equation?tex=g_t+%3D+%5Cnabla_%5Ctheta+J%28%5Ctheta+-+%5Cgamma+m_%7Bt-1%7D%29)
- ![](https://pic2.zhimg.com/80/v2-fecd469405501ad82788f068985b25cb_720w.jpg)


## Adagrad

机器学习中，稀疏特征的平均梯度通常很小，因此这些特征的训练速度慢。
- 解决方法之一是为每个特征设置不同的学习率，但这会很快变得混乱。
- AdaGrad解决思路：当前更新的特征越多，将来更新的特征就越少，从而为其他特征（例如稀疏功能）提供了赶超的机会。

![](https://p3.toutiaoimg.com/origin/pgc-image/b6ab8e70a4864dc4ac4caa64dcd45444?from=pc)
- AdaGrad（以及其他类似的基于梯度平方的方法，如RMSProp和Adam）可以更好地逃避鞍点。
- AdaGrad将走一条直线，而梯度下降（或相关的动量）则采取 "让我先滑下陡坡，然后再担心慢速方向" 的方法。 有时，原生梯度下降可能会在两个方向的梯度均为0且在此处完全满足的鞍点处停止。

自适应梯度算法（或简称AdaGrad）是跟踪**梯度平方**的总和，并使用它来适应不同方向的梯度。 
- SGD、SGD-M 和 NAG 均是以相同的学习率去更新各个分量。而深度学习模型中往往涉及大量的参数，不同参数的更新频率往往有所区别。对于更新不频繁的参数（典型例子：更新 word embedding 中的低频词），我们希望单次步长更大，多学习一些知识；对于更新频繁的参数，我们则希望步长较小，使得学习到的参数更稳定，不至于被单个样本影响太多。
- Adagrad算法即可达到此效果。其引入了二阶动量

## RMSprop——给劲AdaGrad

AdaGrad的问题在于它的运行速度非常慢
- 在 Adagrad 中，Vt 单调递增，使得学习率逐渐递减至0，可能导致训练过程提前结束。
- Adagrad **梯度平方的总和**只会增加而不会缩小（单调递增）。 
- RMSProp（用于均方根传播）通过添加**衰减因子**来解决此问题。即：梯度平方的和实际上是梯度平方的**衰减**的和
![](https://p3.toutiaoimg.com/origin/pgc-image/112619e0307f47db9f332270a07ffd67?from=pc)
- AdaGrad white（白色）最初与RMSProp（绿色）保持一致，这与调整后的学习速率和衰减速率一样。 但是AdaGrad的平方平方和累积起来如此之快，以至于很快就变得庞大起来（由动画中的平方大小证明）。 他们付出了沉重的代价，最终AdaGrad实际上停止了前进。 另一方面，由于衰减率的原因，RMSProp始终将正方形保持在可管理的大小范围内。 这使得RMSProp比AdaGrad更快。

在计算二阶动量时不累积全部历史梯度，而只关注最近某一时间窗口内的下降梯度。根据此思想有了 RMSprop
  - ![](https://www.zhihu.com/equation?tex=v_t+%3D+%5Cgamma+v_%7Bt-1%7D+%2B+%281-%5Cgamma%29+%5Ccdot+%5Ctext%7Bdiag%7D%28g_t%5E2%29)

## Adadelta

- 待补充

## Adam——深度学习默认首选，融合动量+RMSProp

- Adam是 RMSprop 和 Momentum 的结合。和 RMSprop 对二阶动量使用指数移动平均类似，Adam 中对一阶动量也是用指数移动平均计算。
Adam（自适应矩估计的缩写）兼具**动量**和**RMSProp**的优点，Adam从动量获得速度，并从RMSProp获得了在不同方向适应梯度的能力。 两者的结合使其功能强大。。 Adam在经验上表现良好，因此近年来是深度学习问题的首选。

## NAdam

- NAdam在 Adam 之上融合了 NAG 的思想。


# 理论基础

## KKT条件

【2020-9-5】[直观理解KKT条件](https://www.toutiao.com/i6628696392690827779/)
- KKT最优化条件是Karush[1939]，以及Kuhn和Tucker[1951]先后独立发表出來的。这组最优化条件在Kuhn和Tucker发表之后才逐渐受到重视，因此许多情况下只记载成`库恩塔克`条件（Kuhn-Tucker conditions)
- 库恩塔克条件(Kuhn-Tucker conditions)是非线性规划领域里最重要的理论成果之一，是确定某点为极值点的必要条件。如果所讨论的规划是凸规划，那么库恩-塔克条件也是充分条件。


**KKT条件**:
- 原可行性:g(x*)≤0
- 对偶可行性: α≥0
- 互补松弛条件:αg(x*)=0
- 拉格朗日平稳性: ▽f(x*)=α×▽g(x*)

为了找到具有不等式约束的优化问题的极值，要搜索必须满足所有KKT条件的点(x*)

**拉格朗日平稳性**

- 下面是具有等式约束的优化问题的等高线图（它是通过绘制2D格式上的目标函数值的常量切片来表示3D表面的图）。
    - 上述问题只发生了两种可行点：1、切点 2、交点。
        - 切点是水平曲线（等高线）和约束线彼此相切的点。 
        - 交点是水平曲线和约束线相交的点。
    - 结论：
        - 1. 约束优化问题的极值总是发生在切点上
        - 2. 函数的梯度和函数的水平曲线的相切是正交的
            - ![](https://p6-tt.byteimg.com/origin/pgc-image/5d24ee890f314c03a69a3f2a8be73a9b?from=pc)
        - 3. 约束梯度（▽g）始终指向约束控制的可行区域（g（x，y）≥0，g（x，y）≤0方向分别相反）
        - 总结：约束的梯度（▽g）和目标函数的梯度（▽f）在极值处（切线点）方向是相同或者相反的。表达式：▽f(x*)=α×▽g(x*)
    - ![](https://p1-tt.byteimg.com/origin/pgc-image/febb348ae8e34209a288caecc6a73e38?from=pc)

## 多目标优化

【2021-7-29】[多目标优化之帕累托最优](https://zhuanlan.zhihu.com/p/54691447)

多目标优化问题的数学模型
- ![](https://pic1.zhimg.com/80/v2-25275f9eec4856685b69254c013f7d70_720w.jpg)

以两个目标的最优化问题为例

|指标|目标1|目标2|
|---|---|---|
|空间曲线|![](https://pic4.zhimg.com/80/v2-296b525240039b0c454529da929ad5ff_720w.jpg)|![](https://pic1.zhimg.com/80/v2-4c342d4220ae258992fcc61bc5b961b4_720w.jpg)|

在设计空间均匀的取点阵，然后计算所有点的真实目标值，便可以得到解空间和目标空间的分布情况
- ![](https://pic4.zhimg.com/80/v2-cfdbe34dce9b08180037663af6ac9517_720w.jpg)
- ![](https://www.zhihu.com/equation?tex=f_%7B1%7D%28x%29%2Cf_%7B2%7D%28x%29%2C.......f_%7Bn%7D%28x%29)表示n个目标函数，目标是都使之达到最小，
- ![](https://www.zhihu.com/equation?tex=X%5Csubseteq+R%5E%7Bm%7D)是其变量的约束集合，可以理解为变量的取值范围

### 帕累托最优基本概念

介绍具体的解之间的支配，占优关系，不用公式，通俗易懂。
- ![](https://pic3.zhimg.com/80/v2-c382e9c5cb731635191c8c18927f0da2_720w.jpg)

- **解A优于解B**（解A强帕累托支配解B）
  - 假设现在有两个目标函数，解A对应的目标函数值都比解B对应的目标函数值好，则称解A比解B优越，也可以叫做解A强帕累托支配解B
  - 横纵坐标表示两个目标函数值，E点表示的解所对应的两个目标函数值都小于C，D两个点表示的解所对应的两个目标函数值，所以解E优于解C,D.
- **解A无差别于解B**（解A能帕累托支配解B）
  - 修改：此处的“能”应该是与前文的“强”对应，时间比较久了，A,B两点严格意义上是非支配关系
  - 解A对应的一个目标函数值优于解B对应的一个目标函数值，但是解A对应的另一个目标函数值要差于解B对应的一个目标函数值，则称解A无差别于解B，也叫作解A能帕累托支配解B
  - 点C和点D就是这种情况，C点在第一个目标函数的值比D小，在第二个函数的值比D大。
- **最优解**
  - 假设在设计空间中，解A对应的目标函数值优越其他任何解，则称解A为最优解
  - 举个例子，下图的x1就是两个目标函数的最优解，使两个目标函数同时达到最小，但是前面也说过，实际生活中这种解是不可能存在的。真要存在就好了，由此提出了**帕累托最优解**
  - ![](https://pic2.zhimg.com/80/v2-c360b04f4b27f695205fa665ce3eefdd_720w.png)

解释
- 左图是解空间的均匀点阵，右图是对应的目标空间两个目标的值
- 右图红色点不被任意其他点支配，所以是**Pareto前沿点**（如果解空间点阵足够密集，就是一条线了）
- 左图的设计空间的红色点，就是其对应的**Pareto最优解集**
- 所以现在的一些多目标优化算法主要就是求解问题的Pareto前沿或者近似前沿。从目标空间来看，就是他的边界了。

### Pareto帕累托最优解

假设两个目标函数，对于解A而言，在 变量空间 中找不到其他的解能够优于解A（注意这里的优于一定要两个目标函数值都优于A对应的函数值），那么解A就是帕累托最优解 [图](https://pic3.zhimg.com/80/v2-c382e9c5cb731635191c8c18927f0da2_720w.jpg)


### Pareto帕累托最优前沿

帕累托最优解，实心点表示的解都是帕累托最优解，所有的帕累托最优解构成帕累托最优解集，这些解经目标函数映射构成了该问题的Pareto最优前沿或Pareto前沿面，说人话，即帕累托最优解对应的目标函数值就是帕累托最优前沿。[图](https://pic3.zhimg.com/80/v2-450e1a916081a206ab18fd2073708d3a_720w.jpg)
- ![](https://pic3.zhimg.com/80/v2-450e1a916081a206ab18fd2073708d3a_720w.jpg)

对于两个目标的问题，其Pareto最优前沿通常是条线。而对于多个目标，其Pareto最优前沿通常是一个超曲面。

### 帕累托最优经济学讲解

帕累托最优：
> 资源分配的一种理想状态，假定固有的一群人和可分配的资源，从一种分配状态到另一种状态的变化中，在没有使任何人境况变坏的前提下，使得至少一个人变得更好，这就是帕累托改进或帕累托最优化。

注意
- `纳什均衡`是指博弈双方中**单方**利益最大化, 而不是**集体**利益最大化。

其实帕累托最优是一个错误描述，并没有指定帕累托的最优原则。
- 实际上一个系统达到帕累托最优后，还可以有任意多个帕累托最优。
- 但是多个帕累托最优之间的切换一定时间段内一定是以非帕累托最优的状况下切换的。
- 也就是说：$ 帕累托最优 -> 非帕累托最优 -> 帕累托最优 $。类似于一个高山多个峰。
- 所以帕累托最优并不是从今以后 除非剥夺他人 则无法增加自身利益。而是：
  - $ 帕累托最优 -> 公平失衡 -> 非帕累托最优 -> 公平重平衡 -> 新的帕累托最优 $

根据经济学定义，帕累托最优需要同时满足以下3个条件：
- 交换最优；
- 生产最优；
- 产品混合最优。

#### 什么是帕累托改进 (Pareto Improvements)

什么是帕累托改进？<span style='color:blue'>在没有人变坏的前提下让有些人更好</span>。
- 假设A和B两人手上各有一只橘子，A只想用橘子皮泡水喝，B只想吃它的果肉，所以对于A来说，橘子皮是有用的，果肉没用，对于B来说，果肉是有用的，橘子皮没用。于是他们商量后决定把自己没用的那部分相互交换，这样A就能得到两份橘子皮，B能得到两份果肉，两人都比之前多了一倍。
- 这个例子像不像两个国家在利用各自优势进行贸易互换？没错，基于**比较优势理论**的**全球分工合作**模式就是一种`帕累托改进`。

#### 什么是帕累托最优 (Pareto Optimality)

理解了帕累托改进就不难理解帕累托最优。
- `帕累托最优`就是指<span style='color:blue'>再也找不到任何帕累托改进的余地的状态</span>。如上所述，A和B交换橘子皮和果肉的过程就是持续的帕累托改进，每交换一片果肉和一片橘子皮都是一次帕累托改进，直到交换完整只橘子为止，而这个完成的状态就叫帕累托最优，此时你不可能再得到更多的橘子皮和果肉了。

#### 什么是卡尔多-希克斯改进

进化版：卡尔多-希克斯改进
- 帕累托改进描述的是一种**理想**状态，在帕累托改进中没有任何人的利益会受损，每个人至少要好于或等于当前状态，从而使整体的福利得到增加。
  - 经济学里的福利指的是物质或精神的满足。
- 但在现实中这种情况过于理想化了，不妨设想一种更常见的场景，即对于集体来讲，部分受益、部分受损，但只要**受益**部分大于**受损**部分，那么集体的总福利也可以得到提升，此时受益者也可以给予受损者一定补偿以使其免遭损失。
- 这个过程就是`卡尔多-希克斯改进`。

像国家宏观层面的改革基本都遵循`卡尔多-希克斯改进`的原则，即只要改革受益者所得足以补偿受损者的所失，那这个改革就值得一试。
- 比如改革开放之初，邓公一句“允许让一部分人先富起来”正是对卡尔多-希克斯改进的最好实践。
- 仔细分析一下这句话，首先如何让一部分人先富起来？就是要打破吃大锅饭的局面，但是在没有经济外生动力的情况下，蛋糕无法做大，那么要让一部分先富起来只能**重新切分蛋糕**。
- 假如我少吃一块蛋糕幸福感-1，而你多吃一块蛋糕幸福感+2，那么为了使我们整体的幸福感更高，是不是我要持续地给你喂蛋糕？
- 这其实就是改革开放后东部沿海城市率先发力的逻辑，当时中央举全国之力，人为压低中西部各类资源要素价格如农产品、矿产品等，用以支持东部沿海制造业发展，正是在这种“宏观调控”背景下，中国践行了卡尔多-希克斯改进，并使经济得到了飞速发展。

#### 卡尔多-希克斯改进的问题

卡尔多-希克斯改进也有问题

场景：
- 甲乙两人能力相仿，同时入职同一家公司，但甲却率先得到了提拔。在这个极简场景中，乙没有受损，同时甲得到了好处，是典型的`帕累托改进`。
- 理论上, 整体福利提升应该是个不错的结果，但实际并非如此。人性素来不患寡而患不均，凭什么我俩能力差不多，你得到提拔而我却没有？难道仅仅是运气差吗？会不会你背后在搞小动作？于是各种猜忌、嫉妒、甚至愤怒涌上心头，表现在工作积极性上会大打折扣，最终可能导致对公司而言，整体的福利反而是下降的。
- 同样的，`卡尔多-希克斯改进`也存在着**价值选择**的问题，难道为了增加集体的利益牺牲掉一部分人的利益是理所当然的？那谁又愿意当那一部分人？这有点像哲学中“**失控火车**”的问题。
> - 一列失控的火车沿着铁轨疾驰，火车前方铁轨上有五名工人，如果火车撞上他们，这五个人都不可能存活。
> - 但是你可以通过按下按钮改变火车路线并将其引向另一条铁轨，在那条铁轨上的不远处也有工人，但只有一名。你会按下这个按钮吗？
> - 仅从数量上看，这样做确实可以使福利最大化，但是这么做真的是道德的吗？让这个无辜的人死去是正确的选择吗？

再引申一点，当前社会提倡**共同富裕**，讲的就是鼓励富人拿出一部分钱分给穷人，这也是`卡尔多-希克斯改进`的逻辑。
- “劫富济贫”能使社会的总福利更高，因为对富人来讲，100元九牛一毛，但是对穷人来讲就很重要，他可以饱餐一顿或者买些生活必需品，顺带还能促进一下消费。
- 但这里有个非常关键的隐含条件，就是假设经济蛋糕不会变小。然而如果富人因为财富的被动转移而降低造富的积极性，那么经济蛋糕就会不断萎缩，社会总福利可能不升反降。

此外，`卡尔多-希克斯改进`还存在一个度量难的问题，即受益和受损如何裁定和量化，能量化的只是物质部分
- 比如上文提到的分蛋糕的例子，我把蛋糕给你，我幸福感-1，你幸福感+2，我们作为整体幸福感是上升的，这里的幸福感泛指那些可以被量化的部分。但是如果我一直把蛋糕分给你，你的幸福感是提高了，但我的幸福感却越来越低，最终就会“冰火两重天”。
- 投射到社会层面上，就造成了贫富差距过大，而**贫富差距过大**是容易激化社会矛盾，影响社会安定的。而此等危害岂是可以度量的？

#### 总结

总结
- 帕累托改进描述的就是在没有人变得不好的前提下让有些人更好的过程。
- 帕累托改进的终极形态是帕累托最优。改进是过程，最优是结果，帕累托最优就是指再没有改进余地的状态。
- 在达到帕累托最优后，如果还要进一步改进，就不得不牺牲一部分人利益来换取集体更大的利益，这个过程叫作卡尔多-希克斯改进。
- 任何改革都是帕累托改进和卡尔多-希克斯改进的践行，我国改革开放之初大力发展东部沿海城市就是遵循卡尔多-希克斯改进的思想进行的。
- 虽然“两个改进”看上去很美好，但在实践中会存在不少弊端，比如缺乏对人性的考量、对道德的判断，对福利的度量等。

知乎：[小奥爱吃奥利奥](https://www.zhihu.com/question/22570835/answer/2340674661)

### 帕累托最优与卡尔多最优

讲到**资源分配效率**，`帕累托`效率和`卡尔多希克斯`效率表现的其实是人们寻求最优决策的过程，先来看一看这两种资源分配改进的定义。
- `卡尔多-希克斯`效率是指<span style='color:blue'>第三者的总成本不超过交易的总收益</span>，或者说<span style='color:blue'>从结果中获得的**收益**完全可以对所受到的**损失**进行补偿</span>，这种非自愿的财富转移的具体结果就是卡尔多-希克斯效率，总而言之就是<span style='color:red'>寻求群体利益的最大化</span>。
- `帕累托`效率是指资源分配的一种**理想**状态，假定固有的一群人和可分配的资源，从一种分配状态到另一种状态的变化中，<span style='color:blue'>在没有使任何人境况变坏的前提下，使得至少一个人变得更好</span>，这就是`帕累托改进`或`帕累托最优化`。

其实**绝大多数**经济决策面临的都是如何在**效率**和**公平**之间选择，这两者很难两全。
- `卡尔多希克斯`效率体现的是一种<span style='color:blue'>绝对功利主义</span>的思想，也就是将`效率`放在了`公平`之前，追求的是一个**整体**的最大福利；
- 而`帕累托改进`相对而言加强了对公平的重视，也就是对总体福利的改进不能建立在某一个个体的损失之上，寻求的是一种公平与效率的**平衡**。

由于卡尔多希克斯效率更加重视效率，也就是总体的福利，这就导致了一般情况下卡尔多希克斯最优的社会总福利会高于帕累托最优的社会总福利，但是当从某一个个体的角度来看这种绝对功利主义的改进未必是好事。

【2022-10-9】参考：[帕累托效率与卡尔多-希克斯效率](https://zhuanlan.zhihu.com/p/295443538)

# 实践

## 训练曲线

模型训练环节，损失函数出现不同情形，如何快速定位？
- ![](https://pic4.zhimg.com/80/v2-287f28b3a1f34657c3a7dba0e6d4b55f_720w.jpg)
- 知识点
  - 学习率：学习率越大，波动越剧烈，学习率越小，波动越平缓。
  - 过拟合
  - batch size：batchsize越小，波动越剧烈，batchsize越大，波动越平缓。
  - 梯度下降算法：梯度就是曲线的斜率，如果要最小化目标函数，反向传播过程中，每个参数在梯度方向上减小一定幅度，最终网络收敛到一个局部最优值，减小的幅度大小由学习率决定。

[链接](https://www.zhihu.com/question/472162326/answer/2308198711)

训练的时候 loss 不下降
- 模型结构问题。当模型结构不好、规模小时，模型对数据的拟合能力不足。
- 训练时间问题。不同的模型有不同的计算量，当需要的计算量很大时，耗时也会很大
- 权重初始化问题。常用的初始化方案有全零初始化、正态分布初始化和均匀分布初始化等，合适的初始化方案很重要，之前提到过神经网络初始化为0可能会带来的影响
- 正则化问题。L1、L2以及Dropout是为了防止过拟合的，当训练集loss下不来时，就要考虑一下是不是正则化过度，导致模型欠拟合了。正则化相关可参考正则化之L1 & L2
- 激活函数问题。全连接层多用ReLu，神经网络的输出层会使用sigmoid 或者 softmax。激活函数可参考常用的几个激活函数。在使用Relu激活函数时，当每一个神经元的输入为负时，会使得该神经元输出恒为0，导致失活，由于此时梯度为0，无法恢复。
- 优化器问题。优化器一般选取Adam，但是当Adam难以训练时，需要使用如SGD之类的其他优化器。常用优化器可参考机器学习中常用的优化器有哪些？
- 学习率问题。学习率决定了网络的训练速度，但学习率不是越大越好，当网络趋近于收敛时应该选择较小的学习率来保证找到更好的最优点。所以，我们需要手动调整学习率，首先选择一个合适的初始学习率，当训练不动之后，稍微降低学习率。
- 梯度消失和爆炸。这时需要考虑激活函数是否合理，网络深度是否合理，可以通过调节sigmoid -> relu，假如残差网络等，相关可参考为什么神经网络会有梯度消失和梯度爆炸问题？如何解决？
- batch size问题。过小，会导致模型损失波动大，难以收敛，过大时，模型前期由于梯度的平均，导致收敛速度过慢。
- 数据集问题。
  - （1）数据集未打乱，可能会导致网络在学习过程中产生一定的偏见
  - （2）噪声过多、标注有大量错误时，会导致神经网络难以学到有用的信息，从而出现摇摆不定的情况，噪声、缺失值、异常值
  - （3）数据类别不均衡使得少数类别由于信息量不足，难以学到本质特征，样本不均衡相关可以看样本不均衡及其解决办法。
- 特征问题。特征选择不合理，会使网络学习难度增加。之前有提到过特征选择的文章，如何找到有意义的组合特征,特征选择方法

2 测试的时候 loss 不下降
- 训练的时候过拟合导致效果不好 
  - 交叉检验，通过交叉检验得到较优的模型参数;
  - 特征选择，减少特征数或使用较少的特征组合，对于按区间离散化的特征，增大划分的区间;
  - 正则化，常用的有 L1、L2 正则。而且 L1正则还可以自动进行特征选择;
  - 如果有正则项则可以考虑增大正则项参数;
  - 增加训练数据可以有限的避免过拟合;
  - Bagging ,将多个弱学习器Bagging 一下效果会好很多，比如随机森林等.
  - 早停策略。本质上是交叉验证策略，选择合适的训练次数，避免训练的网络过度拟合训练数据。
  - DropOut策略。
- 应用场景不同导致。本来训练任务是分类猫和狗，测试用的皮卡丘和葫芦娃。
- 噪声问题。训练数据大概率都是经过去噪处理的，而真实测试时也应该去除噪声。



# 资料

- 资料如下
    - [从 SGD 到 Adam —— 深度学习优化算法概览(一)](https://zhuanlan.zhihu.com/p/32626442)
    - [最优化算法的前世今生](https://baijiahao.baidu.com/s?id=1672520039604186628&wfr=spider&for=pc)
        - 大岩资本黄铂博士结合生活实践中的案例，深入浅出阐释了最优化算法的前世今生。从实际生活中最基础的应用切入，黄铂将抽象的算法概念生动化，解释了什么叫最优化问题、凸优化及算法分类、机器学习与人工智能应用。

- [凸优化：算法和复杂性 by Sebastien Bubeck](https://www.bilibili.com/video/av62565077)

<iframe src="//player.bilibili.com/player.html?aid=62565077&bvid=BV1Vt411T7mK&cid=108720104&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="600" width="100%"> </iframe>


# 结束


