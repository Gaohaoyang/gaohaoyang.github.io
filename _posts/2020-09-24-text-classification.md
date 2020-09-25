---
layout: post
title:  "文本分类-Text Classification"
date:   2020-09-24 14:52:00
categories: 深度学习
tags: 文本分类
excerpt: NLP子领域文本分类知识汇总
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

- 文本分类是自然语言处理的一个基本任务，试图推断出给定的文本（句子、文档等）的标签或标签集合。
- 文本分类算是NLP比较简单的任务之一，并且目前由于预训练语言模型的出现，现在文本分类直接上bert效果就挺好。

## 资料

- [文本分类-基础算法](https://zhuanlan.zhihu.com/p/93322804)
- [深度学习在文本分类中的应用](https://zhuanlan.zhihu.com/p/34383508)


# 评估方法

- 不同类型的文本分类往往有不同的评价指标，具体如下：
  - 二分类：accuracy，precision，recall，f1-score，...
  - 多分类: Micro-Averaged-F1， Macro-Averaged-F1, ...
  - 多标签分类：Jaccard相似系数, ...


# 常规分类方法

## TF-IDF

- tf-idf在nlp的比赛中仍然是一个强特征，合理使用就可以提分

## N-Gram

- 单纯的char embedding所提供的特征比较单一，所以一般会加别的特征，n-gram就是其中的一个，可以通过字符级别的n-gram来。
- n-gram的优点：
  - 为罕见的单词生成更好的单词向量：根据上面的字符级别的n-gram来说，即使这个单词出现的次数很少，但是组成单词的字符和其他单词有共享的部分，因此这一点可以优化生成的单词向量
  - 在测试集上，即使单词没有出现在训练语料库中（OOV)，仍然可以从字符级n-gram中构造单词的词向量，即字符级n-gram利用了单词的形态学信息。这个在形态学丰富的语言中挺有用。
  - n-gram可以让模型学习到局部词序信息, 如果不考虑n-gram则便是取每个单词，这样无法考虑到词序所包含的信息，即也可理解为上下文信息，因此通过n-gram的方式关联相邻的几个词，这样会让模型在训练的时候保持词序信息

## Word2vec

- [一篇浅显易懂的word2vec原理讲解](https://zhuanlan.zhihu.com/p/44599645)
- ![](https://pic4.zhimg.com/v2-fbe57ddc79d2ac16b849a82672cfb5ff_1440w.jpg)

- 神经网络语言模型
  - ![](https://pic3.zhimg.com/80/v2-aa216beff36d2ba6bff68aaf8f620d8e_720w.jpg)
- 神经网络语言模型包含两个非线性层，求解起来复杂度很高，于是出现了两种更高效的神经网络模型CBOW和Skip-Gram

### CBOW

- CBOW 是 Continuous Bag-of-Words 的缩写，与神经网络语言模型不同的是，CBOW去掉了最耗时的非线性隐藏层
![](https://pic3.zhimg.com/80/v2-da1f96a4a4e8981528a2281c790e98dd_720w.jpg)

### Skip-Gram

- Skip-Gram的模型图与CBOW恰好相反
![](https://pic2.zhimg.com/80/v2-ec71505b54d3419e74dc28e4cdb28dbc_720w.jpg)

### 层次softmax和负采样

- 由于softmax层非常昂贵，每次计算的复杂度为o(v) ，所以用层次softmax或者负采样来替换掉输出层，降低复杂度。
- 层次softmax是一棵huffman树，树的叶子节点是训练文本中所有的词，非叶子节点都是一个逻辑回归二分类器，每个逻辑回归分类器的参数都不同
  - 基于层次softmax的CBOW
    - ![](https://pic3.zhimg.com/80/v2-504f3d895521feb43aaafc5bef952749_720w.jpg)
- 负采样实际上是采样负例来帮助训练的手段，与层次softmax一样，用来提升模型的训练速度。
  - 模型对正例的预测概率是越大越好，模型对负例的预测概率是越小越好。由于正例的数量少，很容易保证每个正例的预测概率尽可能大，而负例的数量特别多，所以负采样的思路就是根据某种负采样的策略随机挑选一些负例，然后保证挑选的这部分负例的预测概率尽可能小。
  - 所以，负采样策略是对模型的效果影响很大，word2vec常用的负采样策略有**均匀负采样**、**按词频率采样**等等。

## FastText

- fastText模型架构和word2vec的CBOW模型架构非常相似
![](https://pic1.zhimg.com/80/v2-5d56f85aab55494afa27ce33acef3773_720w.jpg)
- fastText模型和CBOW一样也只有三层：输入层、隐含层、输出层（Hierarchical Softmax）。输出层没啥好说的。fasttext的隐藏层是把输入层的向量求平均。
- cbow是将每个词先用one-hot编码，然后再经过随机初始化的look-up table。
- fasttext也是相似，区别就是fastText在输入时，将单词的字符级别的n-gram向量作为额外的特征，所以fastText的输入是多个单词及其n-gram特征，这些特征用来表示单个文档。

- fastText作者的实现是句子中的单词再加上n-gram作为输入的。并且为了节省内存，n-gram需要经过哈希处理，哈希到同一个位置的不同n-gram是会共享一个embedding的。
- fastText单词的embedding跟常见的embedding方法没什么不同，都是先随机初始化，然后再通过反向传播学习参数，维度就是人工指定的一个超参数，是词向量的维度。不过有两点要注意的地方，第一是如果你说的fastText的embedding是通过supervised的方式来训练一个文本分类器并同时学习embedding的话，那么这个embedding的学习过程就是有监督的，与word2vec等无监督的模型是有一定区别的；第二是fastText还会学习n-gram（这里的n-gram其实有两种，分别是char-n-gram和word-n-gram，就不展开说了，真正有兴趣的话可以读读源码）的embedding，这使得它可以在一定程度上捕捉词序信息。为了节省空间，fastText在原作者的实现中并不是每一个n-gram都学习一个单独的embedding，而是首先将n-gram进行hash，hash到同一个位置的多个n-gram是会共享一个embedding的。


- 字符级n-gram的引入，有以下几点好处：
  - 对于像英语、芬兰语这种形态学比较丰富的语言，字符级的n-gram抓住了单词的形态学信息。在fasttext词向量中直接利用了构词学中的信息。
  - 为罕见的单词生成更好的单词向量。根据上面的字符级别的n-gram来说，即使这个单词出现的次数很少，但是组成单词的字符和其他单词有共享的部分，因此这一点可以优化生成的单词向量
  - 一定程度上解决了OOV问题。即使单词没有出现在训练语料库中，仍然可以从字符级n-gram中构造单词的词向量。
  - word-n-gram可以让模型学习到局部词序信息，可以在一定程度上捕捉词序信息。
  - cbow先将词进行one-hot编码，其实在我看来就是构造了word2id词典，这样就可以通过lookup-table 查询到对应的词向量。我不清楚fasttext是不是也是这么做的，但我觉得通过构建vocab2id这个map，就能实现one-hot编码的作用，所以下面keras实现中也是这么做的。

# 深度学习文本分类


## CNN文本分类（TextCNN）

- 如：textCNN
  - textcnn的论文Convolutional Neural Networks for Sentence Classification 和 A Sensitivity Analysis of Convolutional Neural Networks for Sentence Classification
- 词向量
  - 随机初始化 （CNN-rand）
  - 预训练词向量进行初始化，在训练过程中固定 (CNN-static)
  - 预训练词向量进行初始化，在训练过程中进行微调 (CNN-non-static)
  - 多通道(CNN-multichannel):将固定的预训练词向量和微调的词向量分别当作一个通道(channel)，卷积操作同时在这两个通道上进行，可以类比于图像RGB三通道。
- ![](https://picb.zhimg.com/80/v2-5e45d24243a2113327db19b84aa1774a_720w.jpg)
  - 句长n=9，词向量维度k=6，filter有两种窗口大小（或者说kernel size），每种有2个，因此filter总个数m=4，其中:
  - 一种的窗口大小h=2（红色框），卷积后的向量维度为n−h+1=8
  - 另一种窗口大小h=3（黄色框），卷积后的向量维度为n−h+1=7
- ![](https://pic4.zhimg.com/80/v2-be5c41070a93a6adf9ff73e76a5b305e_720w.jpg)
- 一些结论
  - Multichannel vs. Single Channel Models: 虽然作者一开始认为多通道可以预防过拟合，从而应该表现更高，尤其是在小规模数据集上。但事  - 实是，单通道在一些语料上比多通道更好；
  - Static vs. Non-static Representations: 在大部分的语料上，CNN-non-static都优于CNN-static，一个解释：预训练词向量可能认为‘good’ - 和‘bad’类似（可能它们有许多类似的上下文），但是对于情感分析任务，good和bad应该要有明显的区分，如果使用CNN-static就无法做调整了；
  - Dropout可以提高2%–4%性能(performance)；
  - 对于不在预训练的word2vec中的词，使用均匀分布U[−a,a]随机初始化，并且调整a使得随机初始化的词向量和预训练的词向量保持相近的方差，可  - 以有微弱提升；
  - 可以尝试其他的词向量预训练语料，如Wikipedia[Collobert et al. (2011)]
  - Adadelta(Zeiler, 2012)和Adagrad(Duchi et al., 2011)可以得到相近的结果，但是所需epoch更少。

## RNN文本分类（TextRNN）

- 思想：以双向LSTM 或GRU来获取句子的信息表征， 以最后一时刻的 h 作为句子特征输入到 softmax 中进行预测
- RNN用于文本分类
  - 策略1：直接使用RNN的最后一个单元输出向量作为文本特征
  - 策略2：使用双向RNN的两个方向的输出向量的连接（concatenate）或均值作为文本特征
  - 策略3：将所有RNN单元的输出向量的均值pooling或者max-pooling作为文本特征
  - 策略4：层次RNN+Attention, Hierarchical Attention Networks

## Text-RCNN（RNN+CNN）用于文本分类

- 论文Recurrent Convolutional Neural Networks for Text Classification设计了一种RNN和CNN结合的模型用于文本分类。
  - 一个很简单的思想看起来比 Transformer 还复杂，真的是有点醉
  - ![](https://pic4.zhimg.com/80/v2-55989a44d089b8acf269e6c4e219474e_720w.jpg)
- RCNN相关总结
  - NN vs. traditional methods: 在该论文的所有实验数据集上，神经网络比传统方法的效果都要好
  - Convolution-based vs. RecursiveNN: 基于卷积的方法比基于递归神经网络的方法要好
  - RCNN vs. CFG and C&J: The RCNN可以捕获更长的模式(patterns)
  - RCNN vs. CNN: 在该论文的所有实验数据集上，RCNN比CNN更好
  - CNNs使用固定的词窗口(window of words), 实验结果受窗口大小影响
  - RCNNs使用循环结构捕获广泛的上下文信息

## 一定要CNN/RNN吗

- 上述的深度学习方法通过引入CNN或RNN进行特征提取，可以达到比较好的效果，但是也存在一些问题，如参数较多导致训练时间过长，超参数较多模型调整麻烦等。下面两篇论文提出了一些简单的模型用于文本分类，并且在简单的模型上采用了一些优化策略。

### 深层无序组合方法

- 论文Deep Unordered Composition Rivals Syntactic Methods for Text Classification提出了NBOW(Neural Bag-of-Words)模型和DAN(Deep Averaging Networks)模型。对比了深层无序组合方法(Deep Unordered Composition)和句法方法(Syntactic Methods)应用在文本分类任务中的优缺点，强调深层无序组合方法的有效性、效率以及灵活性。

#### Neural Bag-of-Words Models

- 论文首先提出了一个最简单的无序模型Neural Bag-of-Words Models (NBOW model)。该模型直接将文本中所有词向量的平均值作为文本的表示，然后输入到softmax 层

#### Considering Syntax for Composition

- 一些考虑语法的方法：
  - Recursive neural networks (RecNNs)
  - 可以考虑一些复杂的语言学现象，如否定、转折等 (优点)
  - 实现效果依赖输入序列（文本）的句法树（可能不适合长文本和不太规范的文本）
  - 需要更多的训练时间
  - Using a convolutional network instead of a RecNN
  - 时间复杂度同样比较大，甚至更大（通过实验结果得出的结论，这取决于filter大小、个数等超参数的设置）
####  Deep Averaging Networks

- Deep Averaging Networks (DAN)是在NBOW model的基础上，通过增加多个隐藏层，增加网络的深度(Deep)。下图为带有两层隐藏层的DAN与RecNN模型的对比。

#### Word Dropout Improves Robustness

- 针对DAN模型，论文提出一种word dropout策略：在求平均词向量前，随机使得文本中的某些单词(token)失效。

### fastText

- 论文Bag of Tricks for Efficient Text Classification提出一个快速进行文本分类的模型和一些trick。
- fastText模型架构
  - fastText模型直接对所有进行embedded的特征取均值，作为文本的特征表示
- 特点
  - 当类别数量较大时，使用Hierachical Softmax将N-gram融入特征中，并且使用Hashing trick[Weinberger et al.2009]提高效率

## HAN (长文本【篇章级别】分类）

- 哈工大团队提出 Document Modeling with Gated Recurrent Neural Network for Sentiment Classification. Duyu Tang, Bing Qin , Ting Liu. In EMNLP, 2015，该文章提出了一种层次神经网络的结构做篇章级别的情感分析，取得了很好的效果
  - ![](https://pic2.zhimg.com/80/v2-b65790c402734c1f7907f59e12058549_720w.jpg)
- 2016年另外一个团队提出了HAN网络，也是使用层次神经网络的结构做篇章级别的文本分析。并且和上篇论文有很多相似之处。文章利用word att ention 和 sentence attention来更好的实现加权平均，取得了很好的效果
  - [Hierarchical Attention Networks for Document Classification](https://www.aclweb.org/anthology/N16-1174/). Zichao Yang1, Diyi Yang1, Chris Dyer and et al. In NAACL-HLT, 2016
  - ![](https://pic4.zhimg.com/80/v2-d4fe53cabdf030814b51fc22fb7d0c35_720w.jpg)
  - 首先是词语到句子级别的，利用词向量，通过双向GRU，对一句话中的词抽取特征
  - 考虑到在每个句子中，各个词对句子信息的贡献不同。随后作者利用word attention 来对BI-GRU抽取的词特征加权求和，生成句子表示（句向量）；
  - 然后是句子到文章级别的，一篇文章有多个句子，把它们看成是一个时间序，使用双向GRU对所有句子进行整合，生成新的句向量；
  - 对句向量使用sentence attention ，具体过程和word attention相似，获得文章表示
  - 最后，用Softmax做分类。


## 最新研究

- 根据github repo: state-of-the-art-result-for-machine-learning-problems ，下面两篇论文提出的模型可以在文本分类取得最优的结果(让AI当法官比赛第一名使用了论文Learning Structured Text Representations中的模型)：
  - Learning Structured Text Representations
  - Attentive Convolution
  - 论文Multi-Task Label Embedding for Text Classification 认为标签与标签之间有可能有联系，所以不是像之前的深度学习模型把标签看成one-hot vector，而是对每个标签进行embedding学习，以提高文本分类的精度。


# [工业界文本分类避坑指南](https://zhuanlan.zhihu.com/p/201239352)

## 一、问题拆解和数据

### Q1 构建文本分类标签体系有哪些坑？
 
在我们在做真实的业务问题的时候，不像给定一个数据集，标签就是定死的。如何确定一个合理的分类标签体现其实是十分关键的。这个阶段一定要做数据充分的探索性分析。图省事吃大亏。
 
下面几个基本的原则：
 
*   稀疏程度合理。 一般正常的分类体系都是符合一个长尾分布，大概可以分为主要类A，主要类B，xxx，其他类。softmax based分类模型还是主要解决这部分样本比较多的问题。有个小技巧，按照业务上出现问题的频度，分类空间最好预留其他方便迭代。
    
*   类间可分，类内聚集。 不要搞一些分不开的类，最后发现学出来的两个结果，置信度都不高，对我们没有什么意义的。
    
*   标签的关系明确。 是多分类问题呢，还是多类别问题呢，还是层级分类呢？不同的问题有对应不同的方法，尤其是层级分类，坑比较多，这里先不展开了。
    
 
### Q2 初期监督数据不够？
 
标注数据总需要一定的时间，这时候除了用规则，词典之类的方法外，或者fewshot learnig的一些思路解决问题，大体的思路是两种。
 
*   Fewshot Learning 把分类问题转化为匹配或者相似度学习的问题，减小分类空间学习的难度，问一个小孩这个水果是啥比，总要比，选择一个最像的水果要简单。
    
*   迁移学习 Bert在小数据上表现其实挺出色的，除了慢一点，似乎没有其他毛病了。 上两个阶段大概只需要几千条数据就可以跑起来了。
    
 
### Q3 如何高效地积累标注数据？
 
有了前面起步的baseline，我们至少可以扔到线上把模型跑着了，然后人工标注数据怎么积累又是一个问题，不同的样本对于我们当前的价值是不一样的，类别空间会扩充以及长尾标注样本数量不足是两个最常见的问题。大体的原则是通过不确定性度量和多样性度量两个角度，来选取对当前模型增量送训样本最优价值的样本。
 
*   不确定的样本 典型的特点是模型输出的置信度不高，没有把握判断是哪一个类别，这种样本需要人工给出真实的类别，指导学习。 baseline可以用熵来度量。  
    
*   不一样的样本 典型的特点就是一些与积累数据分布有差异的，玩比赛的常用的adversrial validation，也是一个简单高效的办法。 学术界在度量分布差异的时候，总喜欢从数学的角度提出一些奇奇怪怪的指标，甚至还有结合ugly的聚类去做。而adversrial validation直接从监督学习的视角出发，让模型来自动学习给定标签的分布差异，从而有一定的区分能力。并且，这个过程中，特征重要性和预测的置信度两个结果分别完成了特征选择，样本粒度的分度度量置信度评价。看一下uber这篇论文，在concept drift detection里面，这也是一种神器。本质原理都是一样的，只不过concept drift detectio里，我们用的是特征重要性反馈，在分布度量里，我们用的是结果的置信度。
    
 
[https://paperswithcode.com/paper/adversarial-validation-approach-to-conceptpaperswithcode.com](https://link.zhihu.com/?target=https%3A//paperswithcode.com/paper/adversarial-validation-approach-to-concept)
 
### Q4 如何发现新的类别，扩充类别空间？
 
有一些方法还挺不错的，推荐ACL2019的那个论文 Deep Unknown Intent Detection with Margin Loss
 
[https://arxiv.org/abs/1906.00434arxiv.org](https://link.zhihu.com/?target=https%3A//arxiv.org/abs/1906.00434)
 
，非常简洁明了。我们在Kaggle Bengali的比赛里面也用了类似的方法检测新类别，不过用的是arcface异曲同工吧，都是margin softmax，简单又效果非常好。具体可以前情回顾：
 
[https://zhuanlan.zhihu.com/p/114131221zhuanlan.zhihu.com![图标](https://pic1.zhimg.com/v2-62b9415d297dffac0ae8f94f8dd98580_ipico.jpg)](https://zhuanlan.zhihu.com/p/114131221)
 
本质上都是找出，与已知类别不相似（分布差异较大）的样本，其实用前面的adversrial validation也可以解决，实测margin softmax效果更好一点。
 
## 二、算法抽象和选型

### Q5 文本分类任务有哪些难点？
 
![](https://pic2.zhimg.com/80/v2-23cd88a1d113b4e99feee352a61bd6ba_720w.jpg)
 
文本分类的难点也是自然语言的难点，其根本原因是自然语言文本各个层次上广泛存在的各种各样的歧义性或多义性（ambiguity）和演化的问题，下面典型的例子：
 
*   输入层面：短文本->长文本和超长文本
    
*   标签层面：复杂语义识别，如阴阳怪气
    
*   时间演化：川普VS 川普，开车VS开车
    
*   上下文：美食论坛苹果小米黑莓 VS手机论坛苹果小米黑莓
    
 
### Q6 如何定义一个文本分类问题的难度？
 
典型难度排序：主题分类-情感分类-意图识别-细粒度情感识别-复杂语义识别（如阴阳怪气）
 
*   数据量 典型的例子：one/zero shot VS 海量
    
*   非线性 典型的例子 ：阴阳怪气 VS 垃圾邮件
    
*   类间距离 典型的例子： 细粒度的情感分类 VS 正负情感倾向
    
 
### Q7 文本分类的算法选型推荐？
 
算法选型的出发点就是权衡各种约束，考虑模型的天花板能力，选择合适的模型。一般对应任务的难度，权衡计算时效，选择合适的模型。除了忽略一些比千分点的场景，比如竞赛和论文，一般这块在确定算法选型后，就没啥油水了，建议少花精力。有经验的算法工程师，一定能人脑搜索出一个当前选型下的最优结构。一个特别经典的建议大家试一下，concat_emb-> spartial dropout(0.2)->LSTM ->LSTM->concat(maxpool,meanpool)->FC。
 
结合前面的任务难度定义，推荐的算法选型行为
 
*   Fasttext（垃圾邮件/主题分类） 特别简单的任务，要求速度
    
*   TextCNN（主题分类/领域识别） 比较简单的任务，类别可能比较多，要求速度
    
*   LSTM（情感分类/意图识别） 稍微复杂的任务
    
*   Bert（细粒度情感/阴阳怪气/小样本识别）难任务
    
 
### Q8 如何确定验证集和评价方法？
 
这是个老大难的问题，特别是实际应用中，由于文本分类符合一个长尾分布，常见类别的识别能力其实一般比较ok，长尾识别的稀烂，如果单纯看准确度的话，是个还不错的模型，但你不能说他好吧。对应着指标就是acc很高，macro-f1很低。
 
*   确定各类别错分的代价 特别是在类别较细或者层级标签的时候，如果在一颗子树上的标签，犯错的成本并不高。要是完全截然相反的类别，犯错的代价就特别大。这里建议通过惩罚矩阵的方法，构建细粒度的惩罚代价。  
    
*   合理采样的验证集 真实的标签分布可能过于不均衡，建议掐头补尾，这样的验证集评价往往更有区分度。  
    
*   模型语义压测 各种花里胡哨的变体输入，未纠错的文本都来一套，实在不行，上adversrial attack 攻击一下。
    
## 三、细节策略和实现
 
### Q9 如何处理溢出词表词（OOV）？
 
这个在前Bert时代是一个挺关键的问题，以前回答过，还可以参考。从数据中来到数据中去， 要么想办法还原次干，找到可以替换的词向量。要么从sub-word的层次学习出语义，参考Bert BPE的方法。很早很早念书的时候，还没有Bert做过一些文本分类的比赛，在一些任务上搞定OOV提分还是很大的。给之前回答过的一个前Bert时代方法的链接。
 
[Word Embedding 如何处理未登录词？www.zhihu.com![图标](https://zhstatic.zhihu.com/assets/zhihu/editor/zhihu-card-default.svg)](https://www.zhihu.com/question/308543084/answer/604729983)
 
### Q10 文本分类模型演进的明线和暗线？
 
针对上文提出来的文本分类的难点，其演进路径大概也是从统计机器学习，词向量+深度学习，预训练语言模型的发展。
 
*   明线：统计-机器学习-深度学习-更深的深度学习
    
*   暗线1：简单表达-语义表达-上下文语义表达
    
*   暗线2：特征输入粒度 从词到subword
    
*   暗线3：预训练权重从输入层扩展到网络结构内部
    
 
关于路线的演进，这里有个前几天画的思维导图：部分截图如
 
![](https://pic2.zhimg.com/80/v2-ab21eeec2cf3d3455784a29c864d1430_720w.jpg)
 
思维导图部分截图
 
完整的链接可以点击：
 
[ppt | ProcessOn免费在线作图,在线流程图,在线思维导图www.processon.com![图标](https://picb.zhimg.com/v2-5fa7b25809091f3e2b20a39e51c46a45_ipico.jpg)](https://link.zhihu.com/?target=https%3A//www.processon.com/view/link/566249a3e4b026a7ca234a71%23map)
 
### Q11 策略和算法怎么结合？
 
算法工程师不能老鄙视规则，
 
*   串行式 典型的代表是，规则捕捉-分类-匹配兜底，大概这样的流程会比较合理，规则部分负责解决高频，和bad/hard case,分类负责解决长尾中的头部， 匹配负责解决长尾。这样的优点是，效率很高，往往大部分case很快就过完了。  
    
*   并行式 规则，分类，匹配都过，然后进行归一化后的置信度进行PK，有点类似于广告竞价，这样的好处是能充分融合多重策略，结果更可靠。  
    
 
### Q12 有哪些可以刷分的奇技淫巧？
 
可以尝试的点还蛮多的，搜索空间特别大，感兴趣的可以试试，不保证都有效。这部分的方法大多需要在算法选型敲定后，在模型结构上下功夫，需要遍历一些搜索空间。不建议花太大的经理，具体可以参照之前的回答，而且有了bert之后，他们越来越不重要了，也就没有补充Bert上面的一些操作了：
 
[在文本分类任务中，有哪些论文中很少提及却对性能有重要影响的tricks？www.zhihu.com![图标](https://zhstatic.zhihu.com/assets/zhihu/editor/zhihu-card-default.svg)](https://www.zhihu.com/question/265357659/answer/582711744)
 
### Q13 模型inference资源限制下，如何挑战算法选型的天花板
 
玩比赛的经常遇到过这个问题，典型的场景Kaggle上要求提交模型，更换测试数据，只给两个小时的推断时间。
 
除此之外，我们在工业界耗时严格的场景下，Bert总表示遗憾，效果虽好，但是臣妾做不到啊。想要TextCNN的速度，又想要逼近Bert的效果。
 
![](https://pic4.zhimg.com/80/v2-edcbaea9f374c3fa4b7a9de84bfd7dd2_720w.jpg)
 
这时候模型蒸馏就派上用场了，模型蒸馏在Kaggle一些线上推断比赛的top solotion必不可少的。Hinton给的baseline是这样的，通过teacher model产出soft-target。然后student同时学习hard target和teacher model的soft-target。不过要注意的是，用的时候不要leak，先用KFold产出soft-target的oof，然后和GroundTruth一起给student训练。在不少开源代码里看到leak soft-target的情况，用teacher摸过训练标签的样本给student学习。
 
![](https://picb.zhimg.com/80/v2-d23b71afed7cf7fd2a947cd1fe5e237d_720w.jpg)



# 结束


