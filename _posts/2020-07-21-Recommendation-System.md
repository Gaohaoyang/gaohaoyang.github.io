---
layout: post
title:  "推荐系统-Recommendation-System"
date:   2020-07-21 21:05:00
categories: 推荐系统
tags: 推荐系统 CTR FM Wide&Deep
excerpt: 推荐系统常用技术方案
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

- 【2021-3-21】脉脉：[推荐算法选哪个方向更好？](https://maimai.cn/web/gossip_detail?src=app&webid=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlZ2lkIjoiZmMwYTU3YTc4ODdkMTFlYjg3Njc4MDE4NDRlNTAxOTAiLCJ1IjozNTM5LCJpZCI6Mjg3MjkxMzN9.b09CGopcevFpUQsURFIXAigPVo-BE75_mRjhlhM7XEc&share_channel=5)
  - 如果是新业务，做**精排和重排**最容易有效果，而且看起来容易吹。
  - 如果是特别成熟的业务，精排完全不动的，这个时候**召回**容易出成果。
  - 精排锻炼搞模型的能力，召回锻炼业务思维、大局观，越往前效果越大，重排靠策略机制，精排靠特征数据模型
- [从零搭建推荐系统——算法篇](https://zhuanlan.zhihu.com/p/153451292)
- 推荐系统中算法的位置
    - ![](https://picb.zhimg.com/v2-c1d3b70030d90f53e983643668583a99_b.jpg)
- 特征构建
    - ![](https://pic1.zhimg.com/v2-1ce368b72f3a099938148d765209ecb4_b.jpg)
- 数据集处理
    - 对整个样本集做处理，否则会引入大量噪声，不能让模型很好的拟合出样本分布。
    - 非真实用户访问样本：例如爬虫、机器人等大量非真实用户的频繁访问，带来大量高曝光未点击行为，会严重影响样本数据分布，一段时间窗口有大量相同用户id频繁访问远超正常访问量的均值等，刷次数方差较大的数据需要去除
    - 极少行为用户样本：这类用户样本虽然是真实行为，但极少的行为并不能为其在模型中找到属于该类用户的“规律”，或者说引入这些数据后，模型会开始学习这类用户的数据分布，对整体分布的拟合带来噪声，易引起模型过拟合。通常对这类用户可以看做类似新用户，通过用户冷启动的手段为其探索兴趣补充推荐。
    - 特征缺失值及异常值等处理：这里参考特征工程处理方法，针对方差较大的少量异常值做抛弃或均值处理，缺失值用均值或中值代替等
    - 正负样本处理：机器学习中正负样本的选取也直接关系着训练出的模型效果，在推荐系统中不同公司也有针对自家业务采取的样本划分方法。一次请求会产生N条推荐结果，但大部分手机端通常用户只能看到其中的m条，m < N，通过客户端埋点计算出用户真实可见曝光的物料，在这批物料中选取点击与未点击样本直观上一次曝光中可能有点击或无点击早期yutube推荐中，会对所有用户选取相同数量训练样本，可以同时避免低活跃用户和高活跃用户对整体模型的影响，使训练的模型更符合绝大多数用户行为对于有曝光无点击行为的用户，其曝光未点击的负样本可随机选取，这样可以学到这类用户“不感兴趣”的部分样本在通过定时任务整合时需要做shuffle打散，避免同类用户样本数据扎堆引起数据分布偏差，在训练模型时，也通过batch训练方式中每个batch的样本也进行shuffle打散总之正负样本处理还是要根据深入理解业务和用户行为基础上进行调整，可以让模型学习到更适合的效果。
- 模型进化：lr/gbdt -> fm/xgboost/dnn -> LR+GBDT/wide&deep/deepFM -> embedding -> GNN/GCN
    - 【2020-8-2】推荐系统算法演进图谱
    - ![](https://pic1.zhimg.com/v2-bb6e39d4eca126d967790a062d3f0e1a_b.jpg)
- 线上预测
    - ![](https://pic3.zhimg.com/v2-d7837a9fc9f7973eb1cd547ba2501056_b.jpg)

# 概览

- 【2021-7-22】王喆的《深度学习推荐系统》，体系化，方法演进路线，工程落地都很好。深度学习模型的演化过程，Embedding的知识总结，和model serving的主流方法等等。[书籍介绍](https://zhuanlan.zhihu.com/p/119248677)
- [img](https://pic1.zhimg.com/80/v2-861d5e1708f6ca2e2ffd3863adbddee4_1440w.jpg) ![](https://pic1.zhimg.com/80/v2-861d5e1708f6ca2e2ffd3863adbddee4_1440w.jpg)
- 所有的公司都紧缺资深的算法工程师，而却在不断裁员边缘的、初级的算法从业者。因为在这样一个中心化极端严重的行业，（10个初级算法工程师+1个资深算法工程师）带来的收益无限接近于（1个资深算法工程师）。一个不太合格的算法工程师为公司和团队作出的贡献甚至是负的，因为他们产生出的东西经常需要被重构甚至重写，他们提出的模型也经常会成为AB Test中的失败者而无法产出。
- 一个资深的工程师跟一个一般的工程师的差距不在于工具用的熟不熟练，代码写的快不快，而是在于**技术格局**和**知识体系化**上的差距。
- 有一句话我是非常推崇的——“**不谋万世者，不足谋一时；不谋全局者，不足谋一域。**” 技术也是这样，它同样遵循事物发展的一般规律。要作出最合理的技术改进，必须要有一个像书中总结的推荐系统架构图一样的全局的技术框架在心中，只有这样，才能够提出全局最优的技术决策，和充分考虑各方利弊的技术权衡。
- 技术迭代中的“木桶理论”，一名嗅觉敏感的算法工程师应该做的事情是找到整体技术框架中那个“最短的木板”，而不是盯着一块已经很长的木板“执着”地继续补强。
- [img](https://pic3.zhimg.com/80/v2-b894ffb412a97f719917d1c7a4bea536_1440w.jpg) ![](https://pic3.zhimg.com/80/v2-b894ffb412a97f719917d1c7a4bea536_1440w.jpg)
- 模型相关的一切是我们之所以被称为“算法”工程师的原因，这是我们应该掌握的基本技能，但是在一线企业动辄上万QPS，动辄千万维特征，动辄TB级数据量，亿级用户量的前提下，只有在这些高强度的、苛刻的压力下建立高效、高可靠且高效果的模型及模型服务基础设施才是一位“工程师”坚不可摧的技术护城河。所谓的model serving，数据实时性，模型压缩与数据蒸馏，对这些技术点的理解是在实验室环境下无法进行的，也是你永远也无法替代的工程经验。
- 另一方面，拥有深刻的洞察能力也成为了一个敏锐的算法工程师的“稀缺超能力”。我在之前的专栏文章不止一次的提到，对用户行为以及背后动机的感知，并将这些动机融合进模型结构之中才是构建推荐模型的“银弹”。没有任何一个模型结构是万能的，只有最适合你的应用场景的，符合你的用户使用习惯的模型才是解决问题的“灵丹妙药”。能够站在产品经理的角度去思考推荐问题，甚至是站在一个普通用户的角度去换位思考我们要应对的场景，将是你永远也无法被替代的行业insight。

# 常用算法

- 推荐系统冷启动通常分为三类，即**用户**冷启动、**物品**冷启动还有**系统**冷启动。无论那种冷启动都因为只有较少的数据和特征来训练模型，所有需要不同的技术方案来提升推荐效果。另外冷启动结合产品方案可以加速冷启动的过程。
- 用户冷启动的问题对于移动互联网基于内容推荐产品中非常重要

## FM

### 综述
2010年，日本大阪大学(Osaka University)的 Steffen Rendle 在矩阵分解(MF)、SVD++[2]、PITF[3]、FPMC[4]
等基础之上，归纳出针对高维稀疏数据的因子机(Factorization Machine, FM)模型[11]。因子机模型可以将上述模型全部纳入一个统一的框架进行分析。并且，Steffen Rendle 实现了一个单机多线程版本的 [libFM](http://www.libfm.org/)。在随后的 [KDD Cup 2012，track2 广告点击率预估(pCTR)](https://www.kaggle.com/c/kddcup2012-track2)中，国立台湾大学[4]和 Opera Solutions[5] 两只队伍都采用了 FM，并获得大赛的冠亚军而使得 FM 名声大噪。随后，台湾大学的 Yuchin Juan 等人在总结自己在两次比赛中的经验以及 Opera Solutions 队伍中使用的 FM 模型的总结，提出了一般化的 FFM 模型[6]，并实现了单机多线程版的 [libFFM](https://www.csie.ntu.edu.tw/~cjlin/libffm/)，并做了深入的试验研究。事实上，Opera Solutions 在比赛中用的 FM 就是FFM。

将 FM 向更高阶推广的工作也有一些，例如 Steffen Rendle 在论文[11]中提出一般化的 d-way FM，他将二阶组合的FM中的二阶项替换成d阶组合项，可以利用 FM 相同的处理技巧将计算时间复杂度降低为线性时间复杂度。这个模型的缺点在于只考虑d阶组合，而实际上，低阶组合模式更有意义，因此到目前为止也没有看到谁在实际中使用。针对这种不足，2016年日本NTT通信科学实验室的 Mathieu Blondel 等人在NIPS2016上提出了一般意义上的高阶 FM 模型，它保留了所有高阶项，并利用 ANOVA kernel 和动态规划算法，将计算时间复杂度降低到线性时间复杂度[12]！

### 什么是因子机

**因子机的定义**
机器学习中的建模问题可以归纳为从数据中学习一个函数 $$f: R^n \rightarrow T$$，它将实值的特征向量 $$x \in R^n$$
映射到一个特定的集合中。例如，对于回归问题，集合 T 就是实数集 R，对于二分类问题，这个集合可以是 $$\{+1, -1\}$$.
对于监督学习，通常有一标注的训练样本集合 $$D = \{(x^{(1)},y^{(1)}),..., (x^{(n)},y^{(n)})\}$$。

线性函数是最简单的建模函数，它假定这个函数可以用参数 $$w$$ 来刻画，

$$
\phi(x) = w_0 + \sum_i w_i x_i
$$

对于回归问题，$$y = \phi(x) $$；而对于二分类问题，需要做对数几率函数变换（逻辑回归）

$$
y = \frac{1}{1 + \exp{-\phi(x)}}
$$

线性模型的缺点是无法学到模型之间的交互，而这在推荐和CTR预估中是比较关键的。例如，CTR预估中常将用户id和广告id onehot
编码后作为特征向量的一部分。

为了学习特征间的交叉，SVM通过多项式核函数来实现特征的交叉，实际上和多项式模型是一样的，这里以二阶多项式模型为例

$$
\phi(x) = w_0 + \sum_i w_i x_i + \sum_i \sum_{j \lt i} w_{ij} x_i x_j \\\\
        = w_0 + \mathbf{w_1}^T \mathbf{x} + \mathbf{x}^T \mathbf{W_2} \mathbf{x}
$$

多项式模型的问题在于二阶项的参数过多，设特征维数为 $$n$$，那么二阶项的参数数目为 $$ n(n+1)/2 $$。
对于广告点击率预估问题，由于存在大量id特征，导致 $$n$$ 可能为 $$10^7$$维，这样一来，模型参数的
量级为 $$10^{14}$$，这比样本量 $$4\times 10^7$$多得多[6]！这导致只有极少数的二阶组合模式才能在样本中找到，
而绝大多数模式在样本中找不到，因而模型无法学出对应的权重。例如，对于某个$$w_{ij}$$，样本中找不到$$x_i=1,x_j=1$$
（这里假定所有的特征都是离散的特征，只取0和1两个值）这种样本，那么$$w_{ij}$$的梯度恒为0，从而导致参数学习失败！

很容易想到，可以对二阶项参数施加某种限制，减少模型参数的自由度。FM 施加的限制是要求二阶项系数矩阵是低秩的，能够分解为低秩矩阵的乘积

$$
\mathbf{W_2} = \mathbf{V}^T \mathbf{V}, V \in \mathbb{R}^{k \times n} \\\\
w_{ij} = \mathbf{v_i}^T \mathbf{v_j} , \mathbf{v_i} \in \mathbb{R}^{k} \\\\
\mathbf{V} = [\mathbf{v_1}, ..., \mathbf{v_n}]
$$

这样一来，就将参数个数减少到 $$kn$$，可以设置较少的k值（一般设置在100以内，$$k << n$$），极大地减少模型参数，增强模型泛化能力，这跟矩阵分解的方法是一样的。向量 $$\mathbf{v_i}$$ 可以解释为第$$i$$个特征对应的隐因子或隐向量。
以user和item的推荐问题为例，如果该特征是user，可以解释为用户向量，如果是item，可以解释为物品向量。

### 计算复杂度

因为引入和二阶项，如果直接计算，时间复杂度将是 $$O(\bar{n}^2)$$，$$\bar{n}$$是特征非零特征数目，
可以通过简单的数学技巧将时间复杂度减少到线性时间复杂度。

基于一个基本的观察，齐二次交叉项之和可以表达为平方和之差

$$
\sum_i \sum_{j \lt i} z_i z_j = \frac{1}{2} \left( \left(\sum_i z_i \right)^2 - \sum_i z_i^2 \right)
$$

上式左边计算复杂度为$$O(n^2)$$，而右边是$$O(n)$$。根据上式，可以将原表达式中二次项化简为

$$
\sum_i \sum_{j \lt i} w_{ij} x_i x_j = \sum_i \sum_{j \lt i} \sum_k v_{ik} v_{jk} x_i x_j \\\\
= \frac{1}{2} \sum_k  \left( \left(\sum_i v_{ik} x_i \right)^2 - \sum_i v_{ik}x_i^2 \right)
$$

上式计算时间复杂度是$$O(\bar{n})$$。

基于梯度的优化都需要计算目标函数对参数的梯度，对FM而言，目标函数对参数的梯度可以利用链式求导法则分解为目标函数对$$\phi$$的梯度和$$\frac{\partial \phi}{\partial \theta}$$ 的乘积。前者依赖于具体任务，后者可以简单的求得

$$
\frac{\partial \phi}{\partial \theta} =
\begin{cases}
1, &  \text{if $\theta$ is $w_0$} \\
x_i, &  \text{if $\theta$ is $w_i$} \\
x_i\sum_j v_{jk} x_j - v_{ik}x_i^2, &  \text{if $\theta$ is $w_{ik}$}
\end{cases}
$$

### 优化方案

论文[2]中给出了三种优化方案，它们分别是

1. 随机梯度下降，这种方案收敛慢而且非常敏感，可以利用现代的一些trick，例如采用 AdaGrad 算法，采用自适应学习率，效果相对比较好，论文[6]对FFM就采用这种方案。
2. 交替方向乘子(ALS)，这种方案只适用于回归问题，它每次优化一个参数，把其他参数固定，好处是每次都是一个最小二乘问题，有解析解。
3. 基于蒙特卡罗马尔科夫链的优化方案，论文中效果最好的方案，细节可以参考原文。

### FFM

在实际预测任务中，特征往往包含多种id，如果不同id组合时采用不同的隐向量，那么这就是 FFM(Field Factorization Machine) 模型[6]。它将特征按照事先的规则分为多个场(Field)，特征 $$x_i$$属于某个特定的场$$f$$。每个特征将被映射为多个隐向量$$\mathbf{v}_{i1},...,\mathbf{v}_{if}$$，每个隐向量对应一个场。当两个特征$$x_i,x_j$$组合时，用对方对应的场对应的隐向量做内积！

$$
w_{ij} = \mathbf{v}_{i,f_j}^T\mathbf{v}_{j,f_i}
$$

$$f_i,f_j$$分别是特征$$x_i,x_j$$对应的场编号。FFM 由于引入了场，使得每两组特征交叉的隐向量都是独立的，可以取得更好的组合效果，但是使得计算复杂度无法通过优化变成线性时间复杂度，每个样本预测的时间复杂度为 $$O(\bar{n}^2 k)$$，不过FFM的k值通常远小于FM的k值。论文[6]对FFM在Criteo和Avazu两个任务（Kaggle上的两个CTR预估比赛）上进行了试验，结果表明 FFM 的成绩优于 FM。事实上，FM 可以看做只有一个场的 FFM。

![ffm.png](https://tracholar.github.io/assets/images/ffm.png)
![ffm2.png](https://tracholar.github.io/assets/images/ffm2.png)

### FM与矩阵分解

![mfcf.png](https://tracholar.github.io/assets/images/mfcf.png)

基于矩阵分解的协同过滤是推荐系统中常用的一种推荐方案[7]，从历史数据中收集user对item的评分，可以是显式的打分，也可以是用户的隐式反馈计算的得分。由于user和item数量非常多，有过打分的user和item对通常是十分稀少的，基于矩阵分解的协同过滤是来预测那些没有过行为的user对item的打分，实际上是一个评分预测问题。矩阵分解的方法假设user对item的打分$$\hat{r}_{ui}$$由下式决定

$$
\hat{r}_{ui} = q_i^T p_u + \mu + b_i + b_u
$$

其中$$q_i$$是第i个item对相应的隐向量，$$p_u$$是第u个user对应的隐向量，$$b_i$$代表item的偏置，用于解释商品本身的热门和冷门，$$b_u$$代表user的偏置，用于解释用户本身的打分偏好（例如有些人喜欢打低分），$$\mu$$是常数。即将评分矩阵分解为user矩阵和item矩阵的乘积加上线性项和常数项，而这两个矩阵是低秩的！这些参数通过对最小化经验误差得到。

$$
\min_{p,q,b} \sum_{(u,i) \in K} (r_{ui} - \hat{r}_{ui})^2 + \lambda(||p_u||^2 + ||q_i||^2 + b_u^2 + b_i^2)
$$

![mf-fm](/assets/images/mf-fm.png)

从上面的叙述来看，FM的二阶矩阵也用了矩阵分解的技巧，那么基于矩阵分解的协同过滤和FM是什么关系呢？以user对item评分预测问题为例，基于矩阵分解的协同过滤可以看做FM的一个特殊例子，对于每一个样本，FM可以看做特征只有userid和itemid的onehot编码后的向量连接而成的向量。从FM和MFCF公式来看，MFCF的用户向量$$p_u$$和item向量$$q_i$$可以看做FM中的隐向量，用户和item的bias向量$$b_u, b_i$$就是FM中的一次项系数，常数$$\mu$$也和FM中的常数$$w_0$$相对应，可以看到，**MFCF就是FM的一个特例**！另外，FM可以采用更多的特征，学习更多的组合模式，这是单个矩阵分解的模型所做不到的！因此，FM比矩阵分解的方法更具普遍性！事实上，现在能用矩阵分解的方法做的方案都直接上FM了！

![mf-fm](/assets/images/mf-fm2.png)

### FM与决策树
FM和决策树都可以做特征组合，Facebook就用GBDT学习特征的自动组合[8]，决策树可以非常方便地对特征做高阶组合。如图所示，一棵决策的叶子节点实际上就对应一条特征规则，例如最左边的叶子节点就代表一条特征组合规则$$x_1=1, x_2=1$$。通过增加树的深度，可以很方便的学习到更高级的非线性组合模式。通过增加树的棵树，可以学习到很多这样的模式，论文[8]采用GBDT来建立决策树，使得新增的决策树能够拟合损失函数的残差。

![dt-fm](/assets/images/dt-fm.png)

但是，**决策树和二项式模型有一个共同的问题，那就是无法学习到数据中不存在的模式**。例如，对于模式$$x_1=1,x_2=1$$，如果这种模式在数据中不存在，或者数量特别少，那么决策树在对特征$$x_1$$分裂后，就不会再对$$x_2$$分裂了。当数据不是高度稀疏的，特征间的组合模式基本上都能够找到足够的样本，那么决策树能够有效地学习到比较复杂的特征组合；但是在高度稀疏的数据中，二阶组合的数量就足以让绝大多数模式找不到样本，这使得决策树无法学到这些简单的二阶模式，更不用说更高阶的组合了。

### FM与神经网络
神经网络天然地难以直接处理高维稀疏的离散特征，因为这将导致神经元的连接参数太多。但是低维嵌入（embedding）技巧可以解决这个问题，词的分布式表达就是一个很好的例子。事实上 **FM就可以看做对高维稀疏的离散特征做 embedding**。上面举的例子其实也可以看做将每一个user和每一个item嵌入到一个低维连续的 embedding 空间中，然后在这个 embedding 空间中比较用户和item的相似性来学习到用户对item的偏好。这跟 word2vec[9]词向量学习类似，word2vec 将词 embedding 到一个低维连续空间，词的相似性通过两个词向量的相似性来度量。神经网络对稀疏离散特征做 embedding 后，可以做更复杂的非线性变换，具有比FM跟大的潜力学习到更深层的非线性关系！基于这个思想，2016年，Google提出 wide and deep 模型用作 Google Play的app推荐[10]，它利用神经网络做离散特征和连续特征之间的交叉，神经网络的输出和人工组合较低维度的离散特征一起预测，并且采用端到端的学习，联合优化DNN和LR。如图所示，Catergorial 特征 embedding 到低维连续空间，并和连续特征拼接，构成了1200维的向量，作为神经网络的输入，神经网络采用三隐层结构，激活函数都是采用 ReLU，最后一层神经元的输出 $$a^{(lf)}$$和离散特征 $$\mathbf{x}$$ 及人工叉积变换后的特征 $$\phi(\mathbf{x})$$，一起预测

$$
P(Y=1|\mathbf{x}) = \sigma\left(\mathbf{w}_{wide}^T[\mathbf{x}; \phi(\mathbf{x})] + \mathbf{w}_{deep}^T a^{(lf)} + b \right)
$$

![nn-fm](/assets/images/nn-fm.png)

注意到，在 wide and deep 模型中，wide部分是通过对用户安装过的APP id和用户Impression App id做叉积变换，解决 embedding 的过泛化问题。
所谓的过泛化，实际上是因为用户的偏好本身就很集中，即使相似的一些 item，用户也只偏好其中一部分，使得query-item矩阵稀疏但是高秩。
而这些信息实际上已经反映在用户已有的行为当中了，因此可以利用这部分信息，单独建立wide部分，解决deep部分的过泛化。

从另一个角度来看，wide和deep部分分别在学习不同阶的特征交叉，deep部分学到高阶交叉，而wide部分学到的是二阶交叉。
后来，有人用FM替换了这里wide部分的二阶交叉，是得模型对高度稀疏的特征的建模更加有效，因为高度稀疏特征简单的叉积变换也难以有效地学到二阶交叉，
这在前面已经叙述过了。因此，很自然的想法就是，用FM替换这里的二阶交叉，得到DeepFM模型[13]。

![deep-fm](/assets/images/deepfm.png)

事实上，对于连续特征和非高度稀疏特征的高阶交叉，决策树似乎更加擅长。因此，很自然的想法是将GBDT也加到模型中。
但是问题是，决策树的优化方法和神经网络之类的不兼容，因此无法直接端到端学习。一种解决方案是，利用Boost融合的方案，
将神经网络、FM、LR当做一个模型，先训练一个初步模型，然后在残差方向上建立GBDT模型，实现融合。
微软的一篇文献[14]也证实，Boost方式融合DNN和GBDT方案相比其他融合方案更优，因此这也不失为一种可行的探索方向！

### Cross Net
为了将FM推广到高阶组合，一系列的变体被研究人员提出，例如 d-way FM[11], 高阶FM[12]，但是应用到实际数据中的工作一直未见报道。
2017年，Google的研究人员从另一种思路触发，融合了残差网络的思想，设计出叉积网络Cross Net[15]，实现起来简单，可以通过加层的方式方便地扩展到任意阶数。具体来说，首先通过 embedding 层将稀疏特征转换成低维向量表示，将这些向量和连续值特征拼成一个大的d维向量$$\mathbf{x_0} = [\mathbf{x_{e,1}^T}, \mathbf{x_{e,2}^T}, ..., \mathbf{x_{e,k}^T}, \mathbf{x_{dense}^T}]$$，作为网络的输入。

![Deep cross network](/assets/images/dcn.png)


用$$\mathbf{x_l}$$表示Cross net的的l层的输出，那么cross net的第l层的转换可以表示为

$$
\mathbf{x_{l+1}} = \mathbf{x_0}\mathbf{x_l^T}\mathbf{w_l} + \mathbf{b_l} + \mathbf{x_l}
$$

这里$$\mathbf{w_l}, \mathbf{b_l} \in \mathbb{R}^d$$是第l层的参数，注意最后一项的存在，这一项是残差链接项，因此前面两项拟合的是残差！
第一项可以参考图2，实际上只是在$$x_0$$的基础上乘上了一个系数！

为了理解这个表达式，我们用$$\mathbf{w_{l+1}} $$乘以上式，可以理解为最后一层输出的得分（是一个标量）

$$
\mathbf{x_{l+1}^T}  \mathbf{w_{l+1}}  = (\mathbf{x_{l}^T}  \mathbf{w_{l}})(\mathbf{x_{0}^T}  \mathbf{w_{l+1}}) + \mathbf{b_l^T} \mathbf{w_{l+1}} + \mathbf{x_{l}^T}  \mathbf{w_{l+1}}
$$

如果不考虑常数项和残差项，只保留第一项，并不断的递归会有

$$
\mathbf{x_{l+1}^T}  \mathbf{w_{l+1}} = (\mathbf{x_{0}^T}  \mathbf{w_{0}})...(\mathbf{x_{0}^T}  \mathbf{w_{l}})(\mathbf{x_{0}^T}  \mathbf{w_{l+1}})
$$

这表明，Cross Net可以看做FM的直接推广，FM是Cross Net的特例，当l=1且$$w_{0}=w_{1}$$时，就可以看做是FM！

$$
x_1^T w_1 = (x ^T W_e^T w_0) (w_0^T W_e x) = x^T W x \\
W = W_e^T w_0 w_0^T W_e
$$

$$W_e$$是 embedding 等效矩阵，$$x$$是原始稀疏高维特征向量！


### FM 的实现
libFM是FM的最初实现，利用OpenMP实现单机多核的并行！目前，FM已有多种实现

- [libFM](http://www.libfm.org/) 单机多线程并行
- [difacto](https://github.com/dmlc/difacto) 基于ps-lite分布式实现
- [fast_tffm](https://github.com/kopopt/fast_tffm) 基于 tensorflow 的分布式实现
- [xlearn](https://github.com/aksnzhy/xlearn)


## Wide&Deep

- 【2019-5-13】[推荐系统-重排序-CTR-Wide&Deep模型](https://www.jianshu.com/p/56c0d94214d7)

### 模型结构


![](https://upload-images.jianshu.io/upload_images/3376541-60671b2e7bbd79cd.jpg)

- 最左边的Wide模型其实就是LR模型。
- 最右面Deep模型其实就是深度模型了。
- 中间是两者结合的Wide&Deep模型，其输出单元接收的是左右两部分输出的拼接。

- 输入部分

![](https://upload-images.jianshu.io/upload_images/3376541-e35bd60d26969b19.jpeg)

### Embedding 层

- 为什么需要做embedding？
    - 超高维度的稀疏输入输入网络，将带来更高维度的参数矩阵，这会带来更大的计算压力。所以神经网络更善于处理稠密的实值输入。所以，需要对稀疏的离散特征做embedding
- 怎么做embedding？
    - 1，离线提前做embedding，例如对于词的嵌入可以使用Word2vec对词做嵌入。也可利用FM先学习好稀疏特征的隐向量。
    - 2，随机初始化。之后跟着模型参数一起训练。其实1中无论是word2vec还是FM，也是一开始随机初始化，然后训练学习而来。
- 代码

```python
tf.feature_column.embedding_column(categorical_column,
                     dimension,
                     combiner='mean',
                     initializer=None,
                     ckpt_to_load_from=None,
                     tensor_name_in_ckpt=None,
                     max_norm=None,
                     trainable=True) # 继续训练这个embedding
```

### wide与deep分别代表了什么？

- wide是简单的线性模型，他会记住训练数据中已经出现的模式，并赋予权重。这代表了记忆
- deep是深度的复杂模型，会在一层层的网络中计算出训练数据中未出现的模式的权重。这代表了泛化

这里的模式，可以简单理解为特征组合。
- Wide侧就是普通LR，一般根据人工先验知识，将一些简单、明显的特征交叉，喂入Wide侧，让Wide侧能够记住这些规则。
- Deep侧就是DNN，通过embedding的方式将categorical/id特征映射成稠密向量，让DNN学习到这些特征之间的深层交叉，以增强扩展能力。

- 但其实deep模型本身也会记住已出现的模式并进行训练吧？相当于低阶特征也可以得到有效利用，为什么还要加上wide模型呢？
- 可能原因：deep模型可解释性不强。wide模型可解释性强。通过wide模型可以挑选出权重较高的低阶特征。同时，对低阶特征另外单独建模，也是很有可能提高精度的。


### 工程实现

- [TensorFlow Wide & Deep Learning Tutorial](https://github.com/tensorflow/tensorflow/blob/752dcb61ef7a8fd6555909dc37c1f2a2e5792227/tensorflow/docs_src/tutorials/wide_and_deep.md)

```python

import tensorflow as tf

gender = tf.feature_column.categorical_column_with_vocabulary_list(
    "gender", ["Female", "Male"])
education = tf.feature_column.categorical_column_with_vocabulary_list(
    "education", [
        "Bachelors", "HS-grad", "11th", "Masters", "9th",
        "Some-college", "Assoc-acdm", "Assoc-voc", "7th-8th",
        "Doctorate", "Prof-school", "5th-6th", "10th", "1st-4th",
        "Preschool", "12th"
    ])
marital_status = tf.feature_column.categorical_column_with_vocabulary_list(
    "marital_status", [
        "Married-civ-spouse", "Divorced", "Married-spouse-absent",
        "Never-married", "Separated", "Married-AF-spouse", "Widowed"
    ])
relationship = tf.feature_column.categorical_column_with_vocabulary_list(
    "relationship", [
        "Husband", "Not-in-family", "Wife", "Own-child", "Unmarried",
        "Other-relative"
    ])
workclass = tf.feature_column.categorical_column_with_vocabulary_list(
    "workclass", [
        "Self-emp-not-inc", "Private", "State-gov", "Federal-gov",
        "Local-gov", "?", "Self-emp-inc", "Without-pay", "Never-worked"
    ])

# To show an example of hashing:
occupation = tf.feature_column.categorical_column_with_hash_bucket(
    "occupation", hash_bucket_size=1000)
native_country = tf.feature_column.categorical_column_with_hash_bucket(
    "native_country", hash_bucket_size=1000)

# Continuous base columns.
age = tf.feature_column.numeric_column("age")
education_num = tf.feature_column.numeric_column("education_num")
capital_gain = tf.feature_column.numeric_column("capital_gain")
capital_loss = tf.feature_column.numeric_column("capital_loss")
hours_per_week = tf.feature_column.numeric_column("hours_per_week")

# Transformations.
age_buckets = tf.feature_column.bucketized_column(
    age, boundaries=[18, 25, 30, 35, 40, 45, 50, 55, 60, 65])
```
- wide部分

```python
base_columns = [
    gender, native_country, education, occupation, workclass, relationship,
    age_buckets,
]

crossed_columns = [
    tf.feature_column.crossed_column(
        ["education", "occupation"], hash_bucket_size=1000),
    tf.feature_column.crossed_column(
        [age_buckets, "education", "occupation"], hash_bucket_size=1000),
    tf.feature_column.crossed_column(
        ["native_country", "occupation"], hash_bucket_size=1000)
]
```
- deep部分

```python
deep_columns = [
    tf.feature_column.indicator_column(workclass),
    tf.feature_column.indicator_column(education),
    tf.feature_column.indicator_column(gender),
    tf.feature_column.indicator_column(relationship),
    # To show an example of embedding
    tf.feature_column.embedding_column(native_country, dimension=8),
    tf.feature_column.embedding_column(occupation, dimension=8),
    age,
    education_num,
    capital_gain,
    capital_loss,
    hours_per_week,
]
```
- wide&deep组合

```python
import tempfile
model_dir = tempfile.mkdtemp()
m = tf.estimator.DNNLinearCombinedClassifier(
    model_dir=model_dir,
    linear_feature_columns=crossed_columns,
    dnn_feature_columns=deep_columns,
    dnn_hidden_units=[100, 50])
```
- 模型训练评估

```python
import pandas as pd
import urllib

# Define the column names for the data sets.
CSV_COLUMNS = [
    "age", "workclass", "fnlwgt", "education", "education_num",
    "marital_status", "occupation", "relationship", "race", "gender",
    "capital_gain", "capital_loss", "hours_per_week", "native_country",
    "income_bracket"
]

def maybe_download(train_data, test_data):
  """Maybe downloads training data and returns train and test file names."""
  if train_data:
    train_file_name = train_data
  else:
    train_file = tempfile.NamedTemporaryFile(delete=False)
    urllib.request.urlretrieve(
        "https://archive.ics.uci.edu/ml/machine-learning-databases/adult/adult.data",
        train_file.name)  # pylint: disable=line-too-long
    train_file_name = train_file.name
    train_file.close()
    print("Training data is downloaded to %s" % train_file_name)

  if test_data:
    test_file_name = test_data
  else:
    test_file = tempfile.NamedTemporaryFile(delete=False)
    urllib.request.urlretrieve(
        "https://archive.ics.uci.edu/ml/machine-learning-databases/adult/adult.test",
        test_file.name)  # pylint: disable=line-too-long
    test_file_name = test_file.name
    test_file.close()
    print("Test data is downloaded to %s"% test_file_name)

  return train_file_name, test_file_name

def input_fn(data_file, num_epochs, shuffle):
  """Input builder function."""
  df_data = pd.read_csv(
      tf.gfile.Open(data_file),
      names=CSV_COLUMNS,
      skipinitialspace=True,
      engine="python",
      skiprows=1)
  # remove NaN elements
  df_data = df_data.dropna(how="any", axis=0)
  labels = df_data["income_bracket"].apply(lambda x: ">50K" in x).astype(int)
  return tf.estimator.inputs.pandas_input_fn(
      x=df_data,
      y=labels,
      batch_size=100,
      num_epochs=num_epochs,
      shuffle=shuffle,
      num_threads=5)
      
# set num_epochs to None to get infinite stream of data.
m.train(
    input_fn=input_fn(train_file_name, num_epochs=None, shuffle=True),
    steps=train_steps)
# set steps to None to run evaluation until all data consumed.
results = m.evaluate(
    input_fn=input_fn(test_file_name, num_epochs=1, shuffle=False),
    steps=None)
print("model directory = %s" % model_dir)
for key in sorted(results):
  print("%s: %s" % (key, results[key]))
```

# 工程落地


## TensorFlow Recommenders

[TensorFlow Recommenders 现已开源，让推荐系统更上一层楼](https://mp.weixin.qq.com/s/qjMBs3_vCT9luNZo24kBOw)

【202-10-19】谷歌推出 TensorFlow Recommenders (TFRS)，这款开源 TensorFlow 软件包可简化构建、评估和应用复杂的推荐模型。[TensorFlow Recommenders (TFRS)](https://tensorflow.google.cn/recommenders)

TFRS 使用 TensorFlow 2.x 构建，有助于：
- 构建和评估灵活的 Candidate Nomination Model；
- 将条目、用户和上下文信息自由整合到推荐模型；
- 训练可联合优化多个推荐目标的多任务模型；
- 用 TensorFlow Serving 高效利用生成的模型。

TFRS 基于 TensorFlow 2.x 和 Keras，十分易于上手，在采用模块化设计的同时（您可以自定义每个层和评价指标），仍然组成了一个强有力的整体（各个组件可以良好协作）。在 TFRS 的设计过程中，我们一直强调灵活性和易用性：合理的默认设置、直观易行的常见任务以及更复杂或自定义的推荐任务。

### 安装

```python
pip install tensorflow_recommenders
```

### 电影推荐示例

用MovieLens数据集训练一个简单的电影推荐模型。数据集所含信息包括用户观看了哪些电影以及用户对该电影的评分。

将使用这一数据集构建模型，预测用户已观看和未观看的电影。此类任务通常选择**双塔模型**：一个具有两个子模型的神经网络，分别学习 query 和 candidate 的表征。给定的 query-candidate 对的得分 (score) 只是这两个塔的输出的点积。

query塔的输入可以是：用户 ID、搜索关键词或时间戳；对于 candidate塔则有：电影片名、描述、梗概、主演名单。在此示例中，**query塔**仅使用用户 ID，在 **candidate塔**仅使用电影片名。

数据集的所有可用特征中，最实用的是用户 ID 和电影片名。虽然 TFRS 有多种可选特征，但为简单起见，我们只使用这两项。

只使用用户 ID 和电影片名时，我们简单的双塔模型与典型的矩阵分解模型非常相似。我们需要使用以下内容进行构建：
- 一个用户塔，将用户 ID 转换为用户 embedding 向量（高维向量表示）。
  - 用户模型：一组描述如何将原始用户特征转换为数字化用户表征的层。我们在这里使用 Keras 预处理层将用户 ID 转换为整数索引，然后将其映射到学习的 embedding 向量
- 一个电影塔，将电影片名转换为电影 embedding 向量。
- 一个损失函数，对于观看行为，最大化预测用户与电影的匹配度，而未观看的行为进行最小化。

[完整教程](https://tensorflow.google.cn/recommenders/examples/basic_retrieval#building_a_candidate_ann_index)

```python
import tensorflow as tf
import tensorflow_datasets as tfds
import tensorflow_recommenders as tfrs

# Ratings data.
ratings = tfds.load("movie_lens/100k-ratings", split="train")
# Features of all the available movies.
movies = tfds.load("movie_lens/100k-movies", split="train")

ratings = ratings.map(lambda x: {
    "movie_title": x["movie_title"],
    "user_id": x["user_id"],
})
movies = movies.map(lambda x: x["movie_title"])

class TwoTowerMovielensModel(tfrs.Model):
  """MovieLens prediction model."""

  def __init__(self):
    # The `__init__` method sets up the model architecture.
    super().__init__()

    # How large the representation vectors are for inputs: larger vectors make
    # for a more expressive model but may cause over-fitting.
    embedding_dim = 32
    num_unique_users = 1000
    num_unique_movies = 1700
    eval_batch_size = 128
    # 用户模型
    # Set up user and movie representations.
    self.user_model = tf.keras.Sequential([
      # We first turn the raw user ids into contiguous integers by looking them
      # up in a vocabulary.
      tf.keras.layers.experimental.preprocessing.StringLookup(
          max_tokens=num_unique_users),
      # We then map the result into embedding vectors.
      tf.keras.layers.Embedding(num_unique_users, embedding_dim)
    ])
    # 电影模型
    self.movie_model = tf.keras.Sequential([
      tf.keras.layers.experimental.preprocessing.StringLookup(
          max_tokens=num_unique_movies),
      tf.keras.layers.Embedding(num_unique_movies, embedding_dim)
    ])
    # 目标+评估指标 Retrieval
    # The `Task` objects has two purposes: (1) it computes the loss and (2)
    # keeps track of metrics.
    self.task = tfrs.tasks.Retrieval(
        # In this case, our metrics are top-k metrics: given a user and a known
        # watched movie, how highly would the model rank the true movie out of
        # all possible movies?
        metrics=tfrs.metrics.FactorizedTopK(
            candidates=movies.batch(eval_batch_size).map(self.movie_model)
        )
    )
    # 训练过程查看
    def compute_loss(self, features, training=False):
        # The `compute_loss` method determines how loss is computed.
        # Compute user and item embeddings.
        user_embeddings = self.user_model(features["user_id"])
        movie_embeddings = self.movie_model(features["movie_title"])
        # Pass them into the task to get the resulting loss. The lower the loss is, the
        # better the model is at telling apart true watches from watches that did
        # not happen in the training data.
        return self.task(user_embeddings, movie_embeddings)

model = MovielensModel()
model.compile(optimizer=tf.keras.optimizers.Adagrad(0.1))

model.fit(ratings.batch(4096), verbose=False)

# 对模型的推荐进行 Sanity-Check（合理性检验），我们可以使用 TFRS BruteForce 层。BruteForce 层以预先计算好的 candidate 的表征进行排序，允许我们对所有可能的 candidate 计算其所在 query-candidate 对的得分，并返回排名最靠前的电影 (query)
index = tfrs.layers.ann.BruteForce(model.user_model)
index.index(movies.batch(100).map(model.movie_model), movies)

# Get recommendations.
_, titles = index(tf.constant(["42"]))
print(f"Recommendations for user 42: {titles[0, :3]}")
```

# 结束


