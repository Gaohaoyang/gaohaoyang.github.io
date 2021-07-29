---
layout: post
title:  "优化算法笔记-optimization"
date:   2020-08-02 00:23:00
categories: 机器学习 数学基础
tags: 最优化 梯度下降 牛顿法 斯坦福 凸优化 KKT 损失函数 距离计算 相似度 Pareto 帕累托
excerpt: 机器学习中常见的优化算法
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

- 比较各种优化算法的性质，包括传统的 SGD，Momentum SGD，AdaGrad，RMSProp 和 Adam 等
- 可视化分析
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



# 简介

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
- TF：Term frequency即关键词词频，是指一篇文章中关键词出现的频率 ![](https://images.cnblogs.com/cnblogs_com/liangxiaxu/201205/201205051901168917.gif)
- IDF：Inverse document frequency指逆向文本频率，是用于衡量关键词权重的指数 ![](https://images.cnblogs.com/cnblogs_com/liangxiaxu/201205/201205051901168393.gif)
- 向量空间模型
  - 向量空间模型简称 VSM，是 VectorSpace Model 的缩写。在此模型中，文本被看作是由一系列相互独立的词语组成的，若文档 D 中包含词语 t1,t2,…,tN，则文档表示为D（t1,t2,…,tN）。由于文档中词语对文档的重要程度不同，并且词语的重要程度对文本相似度的计算有很大的影响，因而可对文档中的每个词语赋以一个权值 w，以表示该词的权重，其表示如下：D（t1,w1；t2,w2；…,tN，wN），可简记为 D（w1,w2,…,wN），此时的 wk 即为词语 tk的权重，1≤k≤N。关于权重的设置，我们可以考虑的方面：词语在文本中的出现频率（tf），词语的文档频率（df，即含有该词的文档数量，log N/n。很多相似性计算方法都是基于向量空间模型的。

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
- d(i,j)=|X1-X2|+|Y1-Y2|
- [img](https://img-blog.csdn.net/20170411163529421) ![](https://img-blog.csdn.net/20170411163529421)

### 明可夫斯基距离（Minkowski distance）

明氏距离是欧氏距离的推广，是对多个距离度量公式的概括性的表述。
- [img](https://img-blog.csdn.net/20170411192555236) ![](https://img-blog.csdn.net/20170411192555236)
- [img](https://img-blog.csdn.net/20170411163856462) ![](https://img-blog.csdn.net/20170411163856462)
- 分析
  - 当p==1,“明可夫斯基距离”变成“曼哈顿距离”
  - 当p==2,“明可夫斯基距离”变成“欧几里得距离”
  - 当p==∞,“明可夫斯基距离”变成“切比雪夫距离”

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


## 分类

- 目标函数分为两大类。
    - 第一类是最大化，包括最大化盈利，最大化效率。
    - 另一类是最小化，包括最小化费用、时间和错误率。在金融行业，我们可以最大化预测股价的正确率，也可以最小化费用、最小化时间和错误率。
- 当然，我们可以同时最大化盈利，最小化费用和时间。所以通常在很多的优化问题中，这两种任务可以组合起来出现在同一个问题框架下，这就是对于目标函数的定义。


## 损失函数

损失函数用来评价模型的预测值和真实值不一样的程度，损失函数越好，通常模型的性能越好。不同的模型用的损失函数一般也不一样。
 
损失函数分为经验风险损失函数和结构风险损失函数。经验风险损失函数指预测结果和实际结果的差别，结构风险损失函数是指经验风险损失函数加上正则项。
 
常见的损失函数以及其优缺点如下：
 
1.  0-1损失函数(zero-one loss)

0-1损失是指预测值和目标值不相等为1， 否则为0:
 
![[公式]](https://www.zhihu.com/equation?tex=L+%28+Y+%2C+f+%28+X+%29+%29+%3D+%5Cleft%5C%7B+%5Cbegin%7Barray%7D+%7B+l+%7D+%7B+1+%2C+Y+%5Cneq+f+%28+X+%29+%7D+%5C%5C+%7B+0+%2C+Y+%3D+f+%28+X+%29+%7D+%5Cend%7Barray%7D+%5Cright.+++%5C%5C)
 
特点：
 
(1)0-1损失函数直接对应分类判断错误的个数，但是它是一个非凸函数，不太适用.
 
(2)感知机就是用的这种损失函数。但是相等这个条件太过严格，因此可以放宽条件，即满足 ![[公式]](https://www.zhihu.com/equation?tex=%7CY+-+f%28x%29%7C+%3C+T) 时认为相等，
 
![[公式]](https://www.zhihu.com/equation?tex=L+%28+Y+%2C+f+%28+X+%29+%29+%3D+%5Cleft%5C%7B+%5Cbegin%7Barray%7D+%7B+l+%7D+%7B+1+%2C+%7C+Y+-+f+%28+X+%29+%7C+%5Cgeq+T+%7D+%5C%5C+%7B+0+%2C+%7C+Y+%3D+f+%28+X+%29+%7C+%3C+T+%7D+%5Cend%7Barray%7D+%5Cright.++%5C%5C)
 
2. 绝对值损失函数
 
绝对值损失函数是计算预测值与目标值的差的绝对值：
 
![[公式]](https://www.zhihu.com/equation?tex=L%28Y%2C+f%28x%29%29+%3D+%7CY+-+f%28x%29%7C++%5C%5C)
 
3. log对数损失函数
 
log对数损失函数的标准形式如下：
 
![[公式]](https://www.zhihu.com/equation?tex=L%28Y%2C+P%28Y%7CX%29%29+%3D+-logP%28Y%7CX%29++%5C%5C)
 
特点：
- (1) log对数损失函数能非常好的表征概率分布，在很多场景尤其是多分类，如果需要知道结果属于每个类别的置信度，那它非常适合。
- (2)健壮性不强，相比于hinge loss对噪声更敏感。
- (3)逻辑回归的损失函数就是log对数损失函数。
 
4. 平方损失函数
 
平方损失函数标准形式如下：
 
![[公式]](https://www.zhihu.com/equation?tex=L+%28+Y+%7C+f+%28+X+%29+%29+%3D+%5Csum+_+%7B+N+%7D+%28+Y+-+f+%28+X+%29+%29+%5E+%7B+2+%7D++%5C%5C)
 
特点：
- (1)经常应用与回归问题
 
5. 指数损失函数（exponential loss）
 
指数损失函数的标准形式如下：
 
![[公式]](https://www.zhihu.com/equation?tex=L%28Y%7Cf%28X%29%29+%3D+exp%5B-yf%28x%29%5D++%5C%5C)
 
特点：
- (1)对离群点、噪声非常敏感。经常用在AdaBoost算法中。
 
6. Hinge 损失函数
 
Hinge损失函数标准形式如下：
 
![[公式]](https://www.zhihu.com/equation?tex=L%28y%2C+f%28x%29%29+%3D+max%280%2C+1-yf%28x%29%29+++%5C%5C)
 
特点：
- (1)hinge损失函数表示如果被分类正确，损失为0，否则损失就为 ![[公式]](https://www.zhihu.com/equation?tex=1-yf%28x%29) 。SVM就是使用这个损失函数。
- (2)一般的 ![[公式]](https://www.zhihu.com/equation?tex=f%28x%29) 是预测值，在-1到1之间， ![[公式]](https://www.zhihu.com/equation?tex=y) 是目标值(-1或1)。其含义是， ![[公式]](https://www.zhihu.com/equation?tex=f%28x%29+) 的值在-1和+1之间就可以了，并不鼓励 ![[公式]](https://www.zhihu.com/equation?tex=%7Cf%28x%29%7C+%3E+1) ，即并不鼓励分类器过度自信，让某个正确分类的样本距离分割线超过1并不会有任何奖励，从而使分类器可以更专注于整体的误差。
- (3) 健壮性相对较高，对异常点、噪声不敏感，但它没太好的概率解释。
 
7. 感知损失(perceptron loss)函数
 
感知损失函数的标准形式如下：
 
![[公式]](https://www.zhihu.com/equation?tex=L%28y%2C+f%28x%29%29+%3D+max%280%2C+-f%28x%29%29++%5C%5C)
 
特点：
- (1)是Hinge损失函数的一个变种，Hinge loss对判定边界附近的点(正确端)惩罚力度很高。而perceptron loss只要样本的判定类别正确的话，它就满意，不管其判定边界的距离。它比Hinge loss简单，因为不是max-margin boundary，所以模型的泛化能力没 hinge loss强。
 
8. 交叉熵损失函数 (Cross-entropy loss function)
 
交叉熵损失函数的标准形式如下:
 
![[公式]](https://www.zhihu.com/equation?tex=C+%3D+-+%5Cfrac+%7B+1+%7D+%7B+n+%7D+%5Csum+_+%7B+x+%7D+%5B+y+%5Cln+a+%2B+%28+1+-+y+%29+%5Cln+%28+1+-+a+%29+%5D++%5C%5C)
 
注意公式中 ![[公式]](https://www.zhihu.com/equation?tex=x) 表示样本， ![[公式]](https://www.zhihu.com/equation?tex=y) 表示实际的标签， ![[公式]](https://www.zhihu.com/equation?tex=a) 表示预测的输出， ![[公式]](https://www.zhihu.com/equation?tex=n) 表示样本总数量。
 
特点：
- (1)本质上也是一种对数似然函数，可用于二分类和多分类任务中。
 
二分类问题中的loss函数（输入数据是softmax或者sigmoid函数的输出）：
 
![[公式]](https://www.zhihu.com/equation?tex=loss+%3D+-+%5Cfrac+%7B+1+%7D+%7B+n+%7D+%5Csum+_+%7B+x+%7D+%5B+y+%5Cln+a+%2B+%28+1+-+y+%29+%5Cln+%28+1+-+a+%29+%5D+%5C%5C)
 
多分类问题中的loss函数（输入数据是softmax或者sigmoid函数的输出）：
 
![[公式]](https://www.zhihu.com/equation?tex=loss+%3D+-+%5Cfrac%7B1%7D%7Bn%7D+%5Csum_i+y_ilna_i+%5C%5C)
 
(2)当使用sigmoid作为激活函数的时候，常用交叉熵损失函数而不用均方误差损失函数，因为它可以完美解决平方损失函数权重更新过慢的问题，具有“误差大的时候，权重更新快；误差小的时候，权重更新慢”的良好性质。
 
最后奉献上交叉熵损失函数的实现代码：[cross_entropy](https://link.zhihu.com/?target=https%3A//github.com/yyHaker/MachineLearning/blob/master/src/common_functions/loss_functions.py).


9. CTC loss

[CTC Loss讲解](https://blog.csdn.net/yifen4234/article/details/80334516)

![](https://img-blog.csdn.net/20170730100057611?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvTGVmdF9UaGluaw==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)


10. Focal loss

Focal loss出自计算机视觉目标检测领域，作者是斩获多届顶会best paper的**何凯明**。虽然出自目标检测，但是focal loss的思想在各个领域上都起到了很大的作用。总体上讲，Focal Loss是一个缓解分类问题中**类别不平衡**、难易样本不均衡的损失函数。传统交叉熵损失函数的形式为：
 
![[公式]](https://www.zhihu.com/equation?tex=CE+%3D+-%28y+%5Ccdot+log%28p%29+%2B+%281-y%29%5Ccdot+log%281-p%29%29)
 
其中，y为真值，p为预测概率，我们进一步可以将预测概率表示为：
 
![](https://pic1.zhimg.com/v2-75e13d60ce1c2fed1de9cfd542f99c59_720w.png?source=3af55fa1)
 
![](https://pic1.zhimg.com/80/v2-75e13d60ce1c2fed1de9cfd542f99c59_720w.png?source=3af55fa1)
 
于是上述交叉熵的表达式可以简化为：
 
![[公式]](https://www.zhihu.com/equation?tex=CE+%3D+-log%28p_t%29)
 
我们再来看一下Focal loss的具体形式：
 
![[公式]](https://www.zhihu.com/equation?tex=focal+%3D-+%5Calpha%281-p_t%29%5E%5Cgamma+log%28p_t%29)
 
对比可以看到，focal loss相较于交叉熵多了两项 ![[公式]](https://www.zhihu.com/equation?tex=%5Calpha) 与 ![[公式]](https://www.zhihu.com/equation?tex=%281-p_t%29%5E%5Cgamma) . 这两项分别对应着前面提到的分类问题中类别不平衡、难易样本不均衡。 ![[公式]](https://www.zhihu.com/equation?tex=%5Calpha) 的作用与前面加权交叉熵中的权重一样，用于处理类别不平衡，而![[公式]](https://www.zhihu.com/equation?tex=%281-p_t%29%5E%5Cgamma) 则用于处理难易样本不均衡。其实很容易理解，当 ![[公式]](https://www.zhihu.com/equation?tex=p_t) 较大的时候，说明样本比较容易被模型分类，此时 ![[公式]](https://www.zhihu.com/equation?tex=%281-p_t%29%5E%5Cgamma) 的值就会较小。反之 ![[公式]](https://www.zhihu.com/equation?tex=p_t) 较小，样本难分， ![[公式]](https://www.zhihu.com/equation?tex=%281-p_t%29%5E%5Cgamma) 就会加大。所以这也是一种加权。
 
TensorFlow对于focal loss同样没有封装，所以依然得我们自己自定义：
 
```python
def test_softmax_focal_ce_3(gamma, alpha, logits, label):
    epsilon = 1.e-8
    logits = tf.nn.sigmoid(logits)
    logits = tf.clip_by_value(logits, epsilon, 1. - epsilon)
 
    weight = tf.multiply(label, tf.pow(tf.subtract(1., logits), gamma))
    if alpha is not None:  
        alpha_t = alpha
    else:
        alpha_t = tf.ones_like(label)
    xent = tf.multiply(label, -tf.log(logits))
    focal_xent = tf.multiply(alpha_t, tf.multiply(weight, xent))
    reduced_fl = tf.reduce_sum(focal_xent, axis=1)
    return tf.reduce_mean(reduced_fl)
```


## 凸函数

- 【2021-5-31】[理解凸性:为什么梯度下降适用于线性回归](https://www.toutiao.com/i6817344123704443404)

首先，通过凸集和凸函数定义凸度。凸集的定义如下:
- ![理解凸性:为什么梯度下降适用于线性回归](https://p3-tt.byteimg.com/origin/pgc-image/9eda7c3599bd4983babdbc0edd64044c?from=pc)
 
在二维中，我们可以将凸集视为一个形状，无论您用什么线连接集中的两个点，都不会在集外。
- ![理解凸性:为什么梯度下降适用于线性回归](https://p6-tt.byteimg.com/origin/pgc-image/be14dc2b815140dbbf351628459fc98f?from=pc)
 （左）凸集，（中）非凸集，（右）凸集
 
凸集的定义正好体现在凸函数的定义中，如下所示：
- ![理解凸性:为什么梯度下降适用于线性回归](https://p3-tt.byteimg.com/origin/pgc-image/a53f22a6df8e47729ee4f32710636a13?from=pc)

你可以直观地把凸函数想象成这样的函数:如果你画一条从(x,f(x))到(y,f(y))的直线，那么凸函数的图像就会在这条直线的下方。下面是三个例子，我们应用这个直觉来确定函数是否是凸的。
- ![理解凸性:为什么梯度下降适用于线性回归](https://p3-tt.byteimg.com/origin/pgc-image/edbe443661144544ae4ef6fda5fd9a42?from=pc)
- （左）具有唯一优化器的凸函数，（中）非凸函数，（右）具有多个优化器的凸函数
 
我们可以看到中间的图不是凸的，因为当我们绘制连接图上两个点的线段时，有一些点（x，f（x））大于f（x）上对应的点。
 
左边和右边的图形都是凸的。不管你在这些图上画什么线段，这个线段总是在函数图的上面或者等于函数图。

梯度下降以最简单的形式没有找到全局最小化器。

![](https://p1-tt.byteimg.com/origin/pgc-image/1a67811e997e4f41a6bc035aeddf93d0?from=pc)


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

# 初始值

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


## Vanilla SGD

- 朴素 SGD (Stochastic Gradient Descent) 最为简单，没有动量的概念
    - ![](https://www.zhihu.com/equation?tex=%5Ctheta_%7Bi%2B1%7D%3D+%5Ctheta_t+-+%5Ceta+g_t)
    - ![](https://pic3.zhimg.com/80/v2-2476080e4cdfd489ae64ae3ceeafe48b_720w.jpg)
- 缺点
    - 收敛速度慢，可能在鞍点处震荡。
    - 如何合理的选择学习率是 SGD 的一大难点。


## 动量 Momentum

- SGD 在遇到沟壑时容易陷入震荡。为此，可以为其引入动量 Momentum[3]，加速 SGD 在正确方向的下降并抑制震荡。
    - ![](https://www.zhihu.com/equation?tex=m_t+%3D+%5Cgamma+m_%7Bt-1%7D+%2B+%5Ceta+g_t)
- 引入动量有效的加速了梯度下降收敛过程。
- ![](https://pic2.zhimg.com/80/v2-b9388fd6e465d82687680f9d16edcd2b_720w.jpg)


## Nesterov Accelerated Gradient

- 人们希望下降的过程更加智能：算法能够在目标函数有增高趋势之前，减缓更新速率。
- NAG 即是为此而设计的，其在 SGD-M 的基础上进一步改进了步骤 1 中的梯度计算公式
    - ![](https://www.zhihu.com/equation?tex=g_t+%3D+%5Cnabla_%5Ctheta+J%28%5Ctheta+-+%5Cgamma+m_%7Bt-1%7D%29)
- ![](https://pic2.zhimg.com/80/v2-fecd469405501ad82788f068985b25cb_720w.jpg)


## Adagrad

- SGD、SGD-M 和 NAG 均是以相同的学习率去更新各个分量。而深度学习模型中往往涉及大量的参数，不同参数的更新频率往往有所区别。对于更新不频繁的参数（典型例子：更新 word embedding 中的低频词），我们希望单次步长更大，多学习一些知识；对于更新频繁的参数，我们则希望步长较小，使得学习到的参数更稳定，不至于被单个样本影响太多。
- Adagrad算法即可达到此效果。其引入了二阶动量

## RMSprop

- 在 Adagrad 中，Vt单调递增，使得学习率逐渐递减至 0，可能导致训练过程提前结束。为了改进这一缺点，可以考虑在计算二阶动量时不累积全部历史梯度，而只关注最近某一时间窗口内的下降梯度。根据此思想有了 RMSprop
    - ![](https://www.zhihu.com/equation?tex=v_t+%3D+%5Cgamma+v_%7Bt-1%7D+%2B+%281-%5Cgamma%29+%5Ccdot+%5Ctext%7Bdiag%7D%28g_t%5E2%29)

## Adadelta

- 待补充

## Adam

- Adam是 RMSprop 和 Momentum 的结合。和 RMSprop 对二阶动量使用指数移动平均类似，Adam 中对一阶动量也是用指数移动平均计算。


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

### 基本概念

下麦介绍具体的解之间的支配，占优关系，不用公式，通俗易懂。

![](https://pic3.zhimg.com/80/v2-c382e9c5cb731635191c8c18927f0da2_720w.jpg)

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

![](https://pic3.zhimg.com/80/v2-450e1a916081a206ab18fd2073708d3a_720w.jpg)

对于两个目标的问题，其Pareto最优前沿通常是条线。而对于多个目标，其Pareto最优前沿通常是一个超曲面。

# 资料

- 资料如下
    - [从 SGD 到 Adam —— 深度学习优化算法概览(一)](https://zhuanlan.zhihu.com/p/32626442)
    - [最优化算法的前世今生](https://baijiahao.baidu.com/s?id=1672520039604186628&wfr=spider&for=pc)
        - 大岩资本黄铂博士结合生活实践中的案例，深入浅出阐释了最优化算法的前世今生。从实际生活中最基础的应用切入，黄铂将抽象的算法概念生动化，解释了什么叫最优化问题、凸优化及算法分类、机器学习与人工智能应用。

- [凸优化：算法和复杂性 by Sebastien Bubeck](https://www.bilibili.com/video/av62565077)

<iframe src="//player.bilibili.com/player.html?aid=62565077&bvid=BV1Vt411T7mK&cid=108720104&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="600" width="100%"> </iframe>


# 结束


