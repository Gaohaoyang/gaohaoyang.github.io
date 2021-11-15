---
layout: post
title:  "推荐系统-Recommendation-System"
date:   2020-07-21 21:05:00
categories: 推荐系统
tags: 推荐系统 CTR FM Wide&Deep 评分卡
excerpt: 推荐系统常用技术方案
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

- 【2021-11-15】[推荐算法的"五环之歌"](https://mp.weixin.qq.com/s/58Ktwgu_r2FFKRRgRjCa3A)
  - 记忆与扩展：训练样本中出现太多，推荐系统只需要**记住**，下次遇到同样的场景，“照方扒抓药”，就能“药到病除”。
    - 怎么记？上评分卡。Logistic Regression就是一个非常擅于记忆的模型。说是模型，其实就是一个超大规模的“评分卡”。
  - 
- 【2021-10-26】[变分自编码器(VAEs)在推荐系统中的应用](https://www.toutiao.com/i7023200170640998919/),《[Variational Autoencoders for Collaborative Filtering](https://dl.acm.org/doi/pdf/10.1145/3178876.3186150)》,[论文源码】(https://github.com/dawenl/vae_cf)
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


# 推荐算法五环之歌

## 第一环：评分卡——LR

- 【2021-11-15】[推荐算法的"五环之歌"](https://mp.weixin.qq.com/s/58Ktwgu_r2FFKRRgRjCa3A)，[知乎地址](https://zhuanlan.zhihu.com/p/336643635)

### LR回归

Logistic Regression就是一个非常擅于记忆的模型。说是模型，其实就是一个超大规模的“评分卡”。
- 一个特征（中国、美国），或特征组合（<春节、中国人、饺子>）占据“推荐评分卡”中的一项。可想而知，一个工业级的推荐LR的评分卡里面，条目会有**上亿**项。
- 每项（i.e., 特征或特征组合）都对应一个分数。这个分数是由LR学习出来的，有正有负，代表对最终目标（比如成交，即label=1）的贡献。比如SCORE(<春节，中国人，饺子>)=5，代表这种组合非常容易成交；反之SCORE(<中国人、鲱鱼罐头>)=-100，代表这个组合极不容易成交
- 简单理解，可以认为在正样本中出现越多的特征（组合）得分**越高**，反之在负样本中出现越多的特征（组合）得分**越低**。最终给一个< user, context, item>的打分是其命中的评分卡中所有条目的得分总和。
- 比如当一个中国客户来了，预测他对一款“榴莲馅水饺”的购买欲望 = SCORE(<春节、中国人、饺子>)+SCORE(<中国人，榴莲>)=5-3.5=1.5，即推荐系统猜他有可能会购买，但是欲望并不那么强烈。

### LR("评分卡")模型的特点

- LR的特点就是**强于记忆**，只要评分卡足够大（比如几千亿项），它能够记住历史上的发生过的**所有模式**（i.e., 特征及其组合）。
- 所有的模式，都依赖**人工**输入。
- LR本身并不能够发掘出**新模式**，它只负责评估各模式的重要性。（通过Cross Entropy Loss + SGD实现）
- LR不发掘新模式，反之它能够通过regularization，能够剔除一些**罕见模式**（比如<中国人，于谦在非洲吃的同款恩希玛>），即避免过拟合，又减少评分卡的规模

### LR("评分卡")模型的缺陷

<font color='red'>LR强于记忆，弱于扩展。</font>

还举刚才的例子
- 中国人来了推饺子，美国人来了推火鸡，都效果不错，毕竟LR记性好。
- 但是，当一个中国人来了，你的推荐系统会给他推荐一只火鸡吗？
- 假设是几前年，当时中国人对洋节接受度不高。如果你的推荐系统只有LR，只有记忆功能，答案是：不会。因为<中国人，火鸡>属于小众模式，在历史样本罕有出现，LR的L1正则直接将<中国人火鸡>打分置0，从而被从评分卡中剔除
不要小看这个问题，它关乎到企业的生死，也就关系到你老板和你的腰包
- 记住的肯定是那些常见、高频、大众的模式，能够handle住80%用户的80%的日常需求，但是对**小众用户**的**小众需求**呢（某些中国人喜欢开洋荤的需求、于老师的超级粉丝希望和偶像体验相同美食的需求）？无能为力，因为缺乏历史样本的支持，换句话说，推荐的**个性化太弱**。
- 另一个问题是，大众的需求，你能记住，别家电商也能记住。所以你和你的同行，只能在“满足大众需求”的这一片红海里相互厮杀。套用如今最时髦的词，“内卷”。

综上所述，为了避开“**大众推荐**”这一片内卷严重的**红海**，而拥抱“**个性化精准推荐**”的**蓝海**，推荐算法不能只满足于记住“**常见、高频**”的模式（训练数据中频繁出现的），而必须能够自动挖掘出“**低频、长尾**”（训练数据中罕见的）模式。

### 如何扩展?

看似神秘，其实就是将粗粒度的概念，拆解成一系列细粒度的特征，从而“看山非山、看水非水”。还举饺子、火鸡的例子
- ![](https://pic4.zhimg.com/80/v2-a42a6b5835e66e2e6676b7f0147f7357_720w.jpg)
在之前讲记忆的时候，饺子、火鸡都是独立的概念，看似无什么相似性
- 但是，如果我们根据业务知识，将概念拆解，如上图所示。两个特征向量的第一位表示“是否是**食物**”，从这个角度来看，饺子、火鸡非常相似；两个特征的第二位是“是否和**节日**相关”，从这个角度来看，饺子、火鸡也非常相似。
- 喂入LR (评分卡)的除了粗粒度模式，<春节，中国人，饺子>和<感恩节，美国人，火鸡>，还有细粒度的模式，比如<节日，节日相关的食物>。这样一来，<春节，中国人，火鸡>这样的小众模式，也能够命中评分卡，并获得一个中等分数（因为<节日，节日相关的食物>在正负样本中都有出现，所以得分中等）。相比于原来被L1正则优化掉，小众模式也有了出头之日，获得了曝光的机会。

这样看来，只要我们喂入算法的，不是粗粒度的概念，而是细粒度的**特征向量**，即便是LR这样强记忆的算法，也能够具备扩展能力。

### 有没有自动扩展的方法？

但是，上述方法依赖于人工拆解，也就是所谓的“特征工程”，有两方面的缺点：
- **工作量大**，劳神费力
- 人的理解毕竟有**局限性**。比如饺子、火鸡，拆解到食物、和节日相关这个级别，就已经算是细粒度了吗？还能不能从其他角度继续拆解？
既然人工拆解有困难、受局限，那能不能让算法自动将概念拆解成特征向量？如果你能够想到这一步，恭喜你，你一只脚已经迈入了深度学习的大门, 已经悟到了“道”，剩下的只是“技”而已。

## 第2环：Embedding

### 深度学习：无中生有

可以将深度学习形象地总结为“无中生有”：
- 当你需要用到一个概念的特征v（比如前面例子里的饺子、火鸡），或者一个函数f（比如阿里Deep Interest Network中的“注意力”函数、CNN中的filter），但是却不知道如何定义它们。
- 没关系，先将v声明为特征向量，将f声明为一个小的神经网络，并随机初始化。然后让v和f，随着主目标（最终的分类或回归loss），一同被SGD所优化。
- 当主目标被成功优化之后，我们也就获得了重要的副产品，i.e., 有意义的v和f。
- 这种“无中生有”的套路，好似“上帝说，要有光，于是便有了光”的神迹。以讹传讹，后来就变成了初学者口中“**深度学习不需要特征工程**”，给了某些人“我只做深度学习，不做机器学习”的盲目自信。
其实这种“将特征、函数转化为待优化变量”的思想，并不是深度学习发明的，早在用**矩阵分解**推荐的“古代”就已经存在了，只不过那时候，它不叫Embedding，而叫“**隐向量**”。

### Embedding变“精确匹配”为“模糊查找”

深度学习对于推荐算法的贡献与提升，其核心就在于Embedding。如前文所述，Embedding是一门**自动**将**概念**拆解为**特征向量**的技术，目标是提升推荐算法的**扩展**能力，从而能够自动挖掘那些**低频**、**长尾**、**小众**的模式，拥抱“个性化推荐”的“蓝海”。

Embedding到底是如何提升“扩展”能力的？简单来说，Embedding将推荐算法从“**精确匹配**”转化为“**模糊查找**”，从而能够“举一反三”。

比如在使用**倒排索引**的召回中，是无法给一个喜欢“`科学`”的用户，推出一篇带“`科技`”标签的文章的（不考虑近义词扩展），因为“科学”与“科技”是两个完全独立的词。但是经过Embedding，我们发现“科学”与“科技”两个向量，并不是**正交**的，而是有很小的**夹角**。设想一个极其简化的场景，用户向量就用“科学”向量来表示，文章的向量只用其标签的向量来表示，那么用“科学”向量在所有标签向量里做**Top-K近邻搜索**，一篇带“科技”标签的文章就有机会呈现在用户眼前，从而破除之前“只能精确匹配‘科学’标签”带来的“信息茧房”
- ![](https://pic2.zhimg.com/80/v2-00481c979791927ca7a0a2008a6ddea9_720w.jpg)

再回到原来饺子、火鸡的例子里，借助Embedding，算法能够自动学习到火鸡与饺子的相似性，从而给<中国人，火鸡>的组合打一个不低的分数，从而能更好地给那些喜欢过洋节的中国人提供更好的个性化服务。

## 第3环：高维、稀疏的类别特征

和机器学习的其他领域一样，推荐算法中所使用的特征主要分为两大类：
*   **实数**型特征：比如用户在过去1小时、6小时、1天之内点击的文章数
*   **类别**特征：比如文章的tag(e.g., 二战、德国、坦克)，或者更细粒度的ID（e.g., UserId, DocId, AuthorId, ......）
这两类特征中，后者才是推荐算法的“一等公民”，按郭老师的话说，就是VIP中P，需要我们这群打工人小心伺候着。
 
### "类别特征"更受欢迎
 
说类别特征是“一等公民”，一是因为它们更受欢迎，在推荐算法中无处不在：
*   （1）推荐算法的基础是**画像**。无论是物料画像还是用户画像，都是**高维**、**稀疏**、**离散**的。比如以最常见的标签为例，文章标签(e.g., 二战、德国、坦克)是物料画像的一部分，用户过去1小时、6小时、1天点击文章所携带的标签是不同时间粒度的用户画像的一部分
  *   高维：一个内容推荐系统中，有几万个标签是小意思
  *   稀疏：尽管系统中有几万个标签，但是具体到某篇文章，某个用户，其携带的标签最多几十个而已。
*   （2）现实场景中，“目标~特征”之间鲜有**线性**关系. 比如，在电商场景下，客户年龄对于其购买欲望的影响肯定不是线性的，而是各个不同年龄段（少年、青年、中年、老年）对购买欲望的影响因子截然不同. 所以，即便是实数特征，也经常将其分桶，离散化成类别特征
  *   比如，实践中不是将“`用户过去1小时观看的视频数`”当特征，然后其数值是`3`。因为这样一来，这个特征只能有一个影响因子（权重），显然无法兼顾"用户无论过去1小时看了3个"和"30个视频"这两类情况（前者可能因为用户喜欢看长视频，后者可能因为用户喜欢看短视频）。而是拿“`用户过去1小时观看小于10个视频`”当特征，其数值是1。另外，还有“`用户过去1小时观10~50个视频`”等其他特征，来应对其他情形。这样才更符合”目标~特征“**非线性**关系的本质。
*   （3）线上**工程实现**，更偏爱高维、稀疏、离散的类别特征
  *   稀疏意味着我们可以排零存储、排零计算，减少线上开销，保证线上预测的实时性。所以，有时候，我看一些公司的宣传材料，声称其算法的特征空间有几百亿，我就会心一笑。这种数字都是哄哄小白的，高维背后的潜台词一定是稀疏，否则你很难想像几百亿维度的稠密矩阵运算具备线上实时预测的实战价值。
  *   举刚才的例子，为什么不用“特征是`用户过去1小时观看的视频数`，数值是`3`”这个方案，而是采用“特征是`用户过去1小时观看小于10个视频`，数值是`1`”的方案？除了为体现“目标~特征”之间的非线性关系，还有一个重要原因就是后者的计算开销更小。以LR为例，![[公式]](https://www.zhihu.com/equation?tex=logit%3D%5Csum+w_ix_i)，如果将所有实数特征都离散化，那么![[公式]](https://www.zhihu.com/equation?tex=x_i)只能是0或1，则LR在线上预测时简化为![[公式]](https://www.zhihu.com/equation?tex=%5Csum+w_i)，即找到非零特征对应的权重并累加，避免了乘法运算，计算速度更快。
 
### "类别特征"享受VIP服务
 
说类别特征是“一等公民”，二是因为推荐系统中的很多技术都是为了更好地服务这些VIP而专门设计的
*   单个类别特征的表达能力弱。为了增强其表达能力，业界想出了两个办法
  *   通过**Embedding**自动扩展其内涵。比如“用户年龄在20~30之间”这一个特征，即可能反映出用户经济实力不强，消费能力有限，又可能反映出用户审美风格年轻、时尚。这一系列的潜台词，偏学术一点叫“隐语义”，都可以借助Embedding自动学习出来，扩展了单个特征的内涵。
  *   **多特征交叉**。比如单拿“用户年龄在20~30之间”一个特征，推荐算法还看不懂用户。再加一个特征，比如“用户年龄在20~30之间、工作是程度员”，推荐算法就明白了，“格子衬衫”或许是一个不错的选择。
*   前面已经说了，类别特征的维度特别高，几万个tag是小意思，再加上实数特征分桶、多维特征交叉，特征空间的维度轻轻松松就上亿。要存储这么多特征的权重和embedding向量，也是一笔不小的开销。
  *   所以常见的应对策略是通过hashing trick限制最大特征数，可能会因为hash collision带来一些损失，但是在实践中影响并不是太大。
  *   如果特征及其组合已经大到单机容纳不下，Parameter Server这样的架构应运而生。Parameter Server也正是利用了推荐、搜索中特征空间超级稀疏这一特点，从而在worker与server同步状态时，无须同步上亿级别的整个特征空间，而只需要同步batch中所覆盖的极少数特征的状态，通信开销大大降低。
*   类别特征本来就是稀疏的，“实数特征离散化”和“多特征交叉”使特征空间更加稀疏，而稀疏导致罕见特征（组合）受训机会降低。为了解决这一问题，业界也想出了很多办法
  *   FTRL这样的优化算法为每维特征自适应地调节学习率，DIN中还为每维特征自适应地调节正则系数
  *   普通LR只能拿![[公式]](https://www.zhihu.com/equation?tex=x_i%2Cx_j)都不为0的样本才能训练<![[公式]](https://www.zhihu.com/equation?tex=x_i%2Cx_j)>组合特征的系数![[公式]](https://www.zhihu.com/equation?tex=w_%7Bij%7D)，FM借助矩阵分解的思想巧妙解决了这一难题，使得只有![[公式]](https://www.zhihu.com/equation?tex=x_i%5Cneq0)与![[公式]](https://www.zhihu.com/equation?tex=x_j%5Cneq0)的样本也能够参与训练![[公式]](https://www.zhihu.com/equation?tex=w_%7Bij%7D)，对组合特征的训练更加充分

## 第4环：特征交叉
 
刚才在介绍第3环时已经说了，单个特征的表达能力太弱，所以需要交叉多个特征来增强模型的表达能力。
*   **一阶手工**交叉：LR。你没看错，一阶也可以交叉。FM之类的高阶自动交叉往往指的是多个特征的共现，而我们可以在预处理阶段计算一些统计意义上的交叉，比如用户喜欢的tag与物料所携带tag之间的重合度，然后将这些统计意义上的user/item交叉喂入LR，实践证明对模型效果提升明显。
*   **自动二阶**交叉：FM。
*   **高阶**交叉：DNN
*   **混合**交叉：Wide & Deep。回到第一环介绍的推荐算法的两大永恒主题，Wide侧其实就是一个LR，负责记忆；Deep侧先经过Embedding，再输入DNN，负责扩展。

其实目前主流的基于深度学习的排序算法都衍生自 Wide & Deep，比如DeepFM或DCN。
*   都有一个浅层模型负责记忆，再有DNN进行高阶交叉，负责扩展。
*   这也是我对DCN不感冒的原因。因为扩展功能已经由DNN负责了，所以另一个模块的任务只负责记忆，所以浅层模型如LR或FM足矣，DCN中crossing layer声称的“任意阶交叉”完全没有实现的必要。而且浅层模型必须简单，好起到了类似“正则”的作用，防止DNN过分扩展。因此在我看来，浅层模型实现超过3层的交叉，完全是不务正业。

## 第5环：Field & Pooling
 
### 什么是Field？

在不同的文章中，有不同的叫法，有的叫Field，有的叫Slot，还有的叫Feature Group，但是含义是相同的，都是若干关联特征的集合。
*   举个App的例子，用户安装、启动、卸载的App是三个Field；微信、支付宝、抖音、快手等都是Feature；三个Field共享一份App列表，可以说共享一份Vocabulary。
*   举用户历史的例子，“用户观看历史”是Field，看过的每个视频的DocId是Feature
 
原来我们的LR、FM都是只有Feature的概念，不涉及Field，不也干得好好的，怎么现在凭空多出来一个Field的概念？这还是与推荐系统“高维、稀疏的特征空间”这一特点分不开：
*   为了增强推荐算法的扩展性，我们需要将类别特征先进行Embedding，再接入DNN，进行高阶特征交叉。但是怎么接入DNN，变成了一个问题。
*   推荐算法的特征空间有上亿级别，每维特征再embedding成一个向量。如果将这些向量拼接起来接入DNN，DNN的输入层恐怕就要上十亿、百亿的规模，对于存储、计算都会造成不可想像的压力。
 
所以正确的姿势是
*   将相关Feature组织成Field，同一个Field的Feature Embedding需要Pooling成一个向量，即Field Embedding
*   多个Field Embedding再拼接起来，喂入DNN
*   因为Field的数目要少得多（按我的经验，少则几十，多则几百），DNN的输入层的规模大大降低，连带整个DNN的参数数量也大大减少。
 
### 怎么Pooling?
 
刚才说了，Pooling是将一个Field下的多个Feature Embedding压缩成一个向量的过程。而不同论文在压缩方法上也是各有千秋
*   普通的Mean/Max Pooling，代表算法YoutubeNet。在Youtube的召回、排序模型中，是将用户过去看过的视频、搜索过关键词，先经过embedding，再分别取平均，代表用户的观看偏好和搜索偏好
*   Neural FM中，让属于同一field的feature embedding两两交叉，完成所谓的Bi-Interaction Pooling，用![[公式]](https://www.zhihu.com/equation?tex=v_i)表示feature embedding，则Field Embedding=![[公式]](https://www.zhihu.com/equation?tex=%5Csum%5Climits_%7Bi%3D1%7D%5En+%5Csum%5Climits_%7Bj%3Di%2B1%7D%5En+v_i%5Codot+v_j) =![[公式]](https://www.zhihu.com/equation?tex=%5Cfrac%7B1%7D%7B2%7D%5B%28%5Csum%5Climits_%7Bi%3D1%7D%5En+v_i%29%5E2-%5Csum%5Climits_%7Bi%3D1%7D%5En+v_i%5E2%5D)
*   有的人认为“普通平均”中信息损失得太厉害了，所以要引入加权平均，而计算权重则是Attention最擅长的。比如阿里的Deep Intereset Network (DIN)，在将用户过去购买过的item向量pooling成一个向量时，就通过计算candidate item与用户各历史item的attention score充当权重，然后将各历史item embedding加权平均成一个向量，以表达用户的历史购买偏好。这种加权平均的方式使用户的向量表达随不同的candidate item而变化，实现“千物千面”。
*   有一些Field，比如用户购买历史，其中的Feature存在时序关系。阿里的Deep Interest Evolution Network (DIEN)在Pooling时将时序关系也考虑进去。DIEN将用户历史上购买的item喂入一个RNN，则RNN中最后一步的隐层输出，就是能代表整个用户历史的压缩向量，从而完成了Pooling。这也是借鉴了RNN用于文本分类时的经典套路。但是，用户历史未必是等时间间隔的，这也就违反了RNN的使用前提，具体详情见我在《[也评Deep Interest Evolution Network](https://zhuanlan.zhihu.com/p/54838663)》一文中的讨论。

## 推荐算法的经典套路
 
充分理解了上面的5环，你就不难理解推荐算法中的经典套路
*   排序模型一般都衍生自Google的Wide & Deep模型，有一个浅层模型（LR或FM）负责记忆，DNN负责扩展
*   特征一般都采用类别特征。画像、用户历史天然就是高维、稀疏的类别特征。对于实数型特征，比如用户、物料的一些统计指标，在我的实践中，也通过分桶，先离散化成类别特征，再接入模型
*   每个类别特征经过Embedding变成一个向量，以扩展其内涵。
*   属于一个Field的各Feature Embedding通过Pooling压缩成一个向量，以减少DNN的规模
*   多个Field Embedding拼接在一起，喂入DNN
*   DNN通过多层Fully Connection Layer (FC)完成特征之间的高阶交叉，增强模型的扩展能力。
    
 
## 总结
 
至此，“推荐5环”梳理完毕。尽管给这5个关键词，起名“五环”有凑梗之嫌，但是也还算贴切，因为它们之间环环相扣
*   记忆与扩展是推荐算法两大经典、永恒的主题。如何实现扩展？靠的是Embedding和特征之间的交叉。
*   Embedding化“精确匹配”为“模糊查找“，大大提升了推荐算法的扩展能力，是”深度学习应用于推荐系统“的基石。
*   高维、稀疏的类别特征是推荐系统中的一等公民。为了弥补单个类别特征表达能力弱的问题，需要Embedding扩展其内涵，需要交叉扩展其外延。
*   高维特征空间直接接入DNN，会引发参数规模的膨胀。为解决这一难题，Field & Pooling应运而生。
    
 
![](https://pic4.zhimg.com/80/v2-91eb426e31555d17619350c17c3b8073_720w.jpg)
 
通过将推荐算法梳理成这5环，再读论文，你会发现某些文章吹嘘的“显著提升、巨大进展”只不过是在某一环上进行的小小改进，而它们在其他环上的所采用的方法可能还有瑕疵，不值得借鉴。
 
而当你面临实际问题时，可以先将问题的难点拆解到五环中的某些环上，然后从那些环的研究成果中汲取解决问题的灵感，而不是胡子眉毛一把抓，急病乱投医。总之，有了这5环组成的知识体系，你头脑中的推荐算法就变得更加清晰，就可以吃着火锅，唱着歌，在你日常的调参、炼丹生活中谈笑风生，“啊啊，五环，......”

# 万变不离其宗：用统一框架理解向量化召回

推荐道作者[石塔西](https://www.zhihu.com/people/si-ta-xi/posts), [万变不离其宗：用统一框架理解向量化召回](https://zhuanlan.zhihu.com/p/345378441)


# 久别重逢话双塔

推荐道作者[石塔西](https://www.zhihu.com/people/si-ta-xi/posts), [久别重逢话双塔](https://zhuanlan.zhihu.com/p/428396126)



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


