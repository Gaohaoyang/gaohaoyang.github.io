---
layout: post
title:  "特征工程-Fearture Engineering"
date:   2020-04-26 21:50:00
categories: 机器学习
tags: 深度学习 特征工程 tensorflow
excerpt: 特征工程点点滴滴，及scikit-learn实现
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

江湖名言：<font color='red' size=5 face='黑体'>数据和特征决定了机器学习的上限，而模型和算法只是逼近这个上限而已</font>
- ![](http://images2015.cnblogs.com/blog/927391/201606/927391-20160628112051062-1290708859.jpg)


## 参考资料

- 知乎：[特征工程到底是什么](https://www.zhihu.com/question/29316149)
- [使用sklearn做特征工程](http://www.cnblogs.com/jasonfreak/p/5448385.html)
- [使用python进行描述性统计](http://www.cnblogs.com/jasonfreak/p/5441512.html)
- [使用sklearn优雅的进行数据挖掘](http://www.cnblogs.com/jasonfreak/p/5448462.html)
- 使用sklearn进行集成学习:[理论](http://www.cnblogs.com/jasonfreak/p/5657196.html),[实践](http://www.cnblogs.com/jasonfreak/p/5720137.html)
- 【2021-1-2】[Amazing-Feature-Engineering](https://github.com/ashishpatel26/Amazing-Feature-Engineering)，特征工程和特征选择代码实战（包含多个notebook）
  - A Short Guide for Feature Engineering and Feature Selection
Feature engineering and selection is the art/science of converting data to the best way possible, which involve an elegant blend of domain expertise, intuition and mathematics. This guide is a concise reference for beginners with most simple yet widely used techniques for feature engineering and selection. Any comments and commits are most welcome.
- 【2021-5-27】[推理性能提升一倍，TensorFlow Feature Column 性能优化实践](https://blog.csdn.net/weixin_38753262/article/details/116810950)，在 CTR(Click Through Rate) 点击率预估的推荐算法场景，TensorFlow Feature Column 被广泛应用到实践中。这一方面带来了模型特征处理的便利，另一方面也带来了一些线上推理服务的性能问题。
- ![](https://img-blog.csdnimg.cn/img_convert/cf98e84681aaacadc02f7023fe966c2e.png)
- Feature Column 是 TensorFlow 提供的用于处理结构化数据的工具，是将样本特征映射到用于训练模型特征的桥梁。它提供了多种特征处理方法，让算法人员可以很容易将各种原始特征转换为模型的输入，来进行模型实验。
- 所有 Feature Column 都源自 FeatureColumn 类，并继承了三个子类 CategoricalColumn、DenseColumn 和 SequenceDenseColumn，分别对应稀疏特征、稠密特征、序列稠密特征。算法人员可以按照样本特征的类型找到对应的接口直接适配。
- ![](https://img-blog.csdnimg.cn/img_convert/779703f3920ecde96972cd2f1614417d.png)

# 特征工程

【2022-8-30】知乎专题：[特征工程如何找有效的特征？](https://www.zhihu.com/question/349860940/answer/2499614543)

## 为什么要精做特征工程

在完整的机器学习流水线中，**特征工程**通常占据了数据科学家很大一部分的精力
- 特征工程能够显著提升模型性能，高质量的特征能够大大简化模型复杂度，让模型变得高效且易理解、易维护。
  - 在机器学习领域，“Garbage In, Garbage Out”是业界的共识，对于一个机器学习问题，数据和特征决定了机器学习的上限，而模型和算法只是逼近这个上限而已。
  - ![](https://pic1.zhimg.com/80/v2-a429bf4612cb115e25ba39d6c41807bc_1440w.jpg?source=1940ef5c)
  - 在一个完整的机器学习流水线中，特征工程处于上游位置，因此**特征工程的好坏直接影响后续的模型与算法的表现**。
- 另外，特征工程也是编码领域**专家经验**的重要手段。

### 特征工程误区

特征工程的三个误区：
1. 误区一：<font color='blue'>深度学习时代不需要特征工程</font>
  - 深度学习技术在计算机视觉、语音、NLP领域的成功，使得在这些领域手工做特征工程的重要性大大降低，因此有人觉得深度学习时代不再需要人工做特征工程。然后，在搜索、推荐、广告等领域，特征数据主要以关系型结构组织和存储，在关系型数据上的特征生成和变换操作主要有两大类型
    - 一种是基于**行**（row-based）的特征变换，也就是同一个样本的不同特征之间的变换操作，比如特征组合；
    - 另一种是基于**列**（column-based）的特征变换，比如类别型特征的分组统计值，如最大值、最小值、平均值、中位数等。
  -  <img src="https://pic1.zhimg.com/50/v2-4e06a49c7e4d4c082e2e0b671b1aebd1\_720w.jpg" > 
  - 模型可以一定程度上学习到**row**-based的特征变换，比如PNN、DCN、DeepFM、xDeepFM、AutoInt等模型都可以建模特征的交叉组合操作。尽管如此，<font color='red'>模型却很难学习到基于列的特征变换</font>
  - 因为深度模型一次只能接受一个**小批次**的样本，无法建模到**全局**的统计聚合信息，而这些信息往往是很重要的。
  - 综上，即使是深度学习模型也是需要精准特征工程的。
2. 误区二：<font color='blue'>有了AutoFE工具就不再需要手工做特征工程</font>
  - AutoFE工具尙处于初级阶段
  - 特征工程非常依赖于数据科学家的业务知识、直觉和经验
  - <img src="https://picx.zhimg.com/50/v2-dc2ea388246599af2bdfd5daf65ace20\_720w.jpg">
3. 误区三：<font color='blue'>特征工程是没有技术含量的脏活累活</font>
  - 很多学生和工作不久的同事会有一种偏见: **算法模型**才是高大上的技术，**特征工程**是脏活累活，没有技术含量。
  - 因此，很多人把大量精力投入到算法模型的学习和积累中，而很少化时间和精力去积累特征工程方面的经验。
  - 其实，算法模型的学习过程就好比是西西弗斯推着石头上山，石头最终还会滚落下来，这是因为算法模型的更新迭代速度太快了，总会有效率更高、效果更好的模型被提出，从而让之前的积累变得无用。
  - 另一方面，特征工程的经验沉淀就好比是一个**滚雪球**的过程，雪球会越滚越大，最终我们会成为一个业务的领域专家，对业务贡献无可代替的价值。
  - <img src="https://picx.zhimg.com/50/v2-7a40c2577fe10cf7c2ea374c032385b7\_720w.jpg">
  - 机器学习工作流就好比是一个厨师做菜的过程，简单来说，清洗食材对应了清洗数据，食材的去皮、切片和搭配就对于了特征工程的过程，食物的烹饪对应了模型训练的过程。如果你觉得数据清洗和特征工程不重要，莫非是你想吃一份没有经过清洗、去皮、切片、调料，而直接把原始的带着泥沙的蔬菜瓜果放在大锅里乱炖出来的“菜”? 先不说卫生的问题，能不能弄熟了都是个问题。


## 为什么要做特征归一化/标准化？

【2021-9-6】[为什么要做特征归一化/标准化？](https://www.cnblogs.com/shine-lee/p/11779514.html)

Feature scaling，常见的提法有“特征归一化”、“标准化”，是数据预处理中的重要技术，有时甚至决定了算法能不能work以及work得好不好。

谈到feature scaling的必要性，最常用的2个例子可能是：
- (1) 特征间的**单位**（尺度）可能不同，比如身高和体重，比如摄氏度和华氏度，比如房屋面积和房间数，一个特征的变化范围可能是[ 1000 , 10000 ]，另一个特征的变化范围可能是[ − 0.1 , 0.2 ]，在进行距离有关的计算时，**单位的不同会导致计算结果的不同**，尺度大的特征会起决定性作用，而尺度小的特征其作用可能会被忽略，为了消除特征间单位和尺度差异的影响，以对每维特征同等看待，需要对特征进行归一化。
- (2) 原始特征下，因尺度差异，其损失函数的等高线图可能是椭圆形，梯度方向垂直于等高线，下降会走**zigzag路线**，而不是指向**local minimum**。通过对特征进行zero-mean and unit-variance变换后，其损失函数的等高线图更接近圆形，梯度下降的方向震荡更小，收敛更快
- ![andrew ng](https://s2.ax1x.com/2019/10/30/K4ZoHf.png)

问题：
- 常用的feature scaling方法都有哪些？
  - feature scaling的方法可以分成2类，**逐行**进行和**逐列**进行。逐行是对每一维特征操作，逐列是对每个样本操作
- 什么情况下该使用什么feature scaling方法？有没有一些指导思想？
  - 涉及或隐含距离计算的算法，比如K-means、KNN、PCA、SVM等，一般需要feature scaling
  - 损失函数中含有正则项时，一般需要feature scaling:
  - 梯度下降算法，需要feature scaling。收敛速度取决于：参数的初始位置到local minima的距离，以及学习率η \etaη的大小。
- 所有的机器学习算法都需要feature scaling吗？有没有例外？
  - 与距离计算无关的概率模型，不需要feature scaling，比如Naive Bayes；
  - 与距离计算无关的基于树的模型，不需要feature scaling，比如决策树、随机森林等，树中节点的选择只关注当前特征在哪里切分对分类更好，即只在意特征内部的相对大小，而与特征间的相对大小无关。
- 损失函数的等高线图都是椭圆或同心圆吗？能用椭圆和圆来简单解释feature scaling的作用吗？
- 如果损失函数的等高线图很复杂，feature scaling还有其他直观解释吗？

## 什么是好的特征

什么是好的特征工程

高质量特征需要满足以下标准：
- 有**区分**性（Informative）
- 特征之间相互**独立**（Independent）
- 简单易于**理解**（Simple）
- 伸缩性（ Scalable ）：支持大数据量、高基数特征
- 高效率（ Efficient ）：支持高并发预测
- 灵活性（ Flexible ）：对下游任务有一定的普适性
- 自适应（ Adaptive ）：对数据分布的变化有一定的鲁棒性

衡量特征好坏的指标和方法很多
- IV值
- KS
- odds
- LR，random forest算法都可以用来做特征筛选
- grid search的方法也可以用来搜索特征好坏


详情：[何为优秀的机器学习特征](https://yangxudong.github.io/good-feature/)

## 特征归一化

feature scaling的方法可以分成2类，**逐行**进行和**逐列**进行。

常见方法如下：
- 逐行：`再缩放` **Rescaling** (min-max normalization、range scaling)：缩放到区间[ a , b ]
  - 将每一维特征线性映射到目标范围[ a,b ]，即将最小值映射为a，最大值映射为b，常用目标范围为[ 0 , 1 ]和[−1 , 1]
- 逐行：`中心标准化` **Mean normalization**
  - 将均值映射为0，同时用最大值最小值的差对特征进行归一化
- 逐行：`Z标准化` **Standardization** (Z-score Normalization)
  - 每维特征0均值1方差（zero-mean and unit-variance）
- 逐列：`单位标准化` Scaling to unit length
  - 每个样本的特征向量除以其**长度**，即对样本特征向量的长度进行归一化，长度的度量常使用的是L2 norm（欧氏距离），有时也会采用L1 norm

前3种feature scaling的计算方式为减一个统计量再除以一个统计量，最后1种为除以向量自身的长度。
- **减**一个统计量可以看成选哪个值作为原点，是最小值还是均值，并将整个数据集平移到这个新的原点位置。如果特征间偏置不同对后续过程有负面影响，则该操作是有益的，可以看成是某种偏置无关操作；如果原始特征值有特殊意义，比如稀疏性，该操作可能会破坏其稀疏性。
- **除**以一个统计量可以看成在坐标轴方向上对特征进行缩放，用于降低特征尺度的影响，可以看成是某种尺度无关操作。缩放可以使用最大值最小值间的跨度，也可以使用标准差（到中心点的平均距离），前者对outliers敏感，outliers对后者影响与outliers数量和数据集大小有关，outliers越少数据集越大影响越小。
- **除**以**长度**相当于把长度归一化，把所有样本映射到单位球上，可以看成是某种长度无关操作，比如，词频特征要移除文章长度的影响，图像处理中某些特征要移除光照强度的影响，以及方便计算余弦距离或内积相似度等。

从几何上观察上述方法的作用，图片来自[CS231n-Neural Networks Part 2: Setting up the Data and the Loss](http://cs231n.github.io/neural-networks-2/)
- zero-mean将数据集平移到原点
- unit-variance使每维特征上的跨度相当，图中可以明显看出两维特征间存在线性相关性
- Standardization操作并没有消除这种相关性。
- ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9zMi5heDF4LmNvbS8yMDE5LzEwLzMxL0tJd1hIeC5wbmc?x-oss-process=image/format,png)

可通过PCA方法移除**线性相关性**（decorrelation），即引入**旋转**，找到新的坐标轴方向，在新坐标轴方向上用“标准差”进行缩放
- ![](https://s2.ax1x.com/2019/10/30/K4Zmtg.png)

总的来说，归一化/标准化的目的是为了**获得某种“无关性”**——**偏置**无关、**尺度**无关、**长度**无关……当归一化/标准化方法背后的物理意义和几何含义与当前问题的需要相契合时，其对解决该问题就有**正向**作用，反之，就会起**反作用**。所以，“何时选择何种方法”取决于待解决的问题，即problem-dependent。

常见的特征缩放方法
- ![](https://picx.zhimg.com/80/v2-ad8d6bd86908d6766f8be8ed6a889d5a_1440w.jpg?source=1940ef5c)

### 非正态变换

非正太数据的转换方法有：
- 对数变化
- 平方根变化
- 倒数变换
- 平方根后取倒数
- 平方根后再取反正弦
- 幂转换
- ![](https://images2017.cnblogs.com/blog/1055519/201711/1055519-20171116113836796-743016758.png)

在一些情况下（P值<0.003）上述方法很难实现正态化处理，所以优先使用Box-Cox转换，但是当P值>0.003时两种方法均可，优先考虑普通的平方变换。
- `P值`即**概率**，反映某一事件发生的可能性大小。
- 统计学根据显著性检验方法所得到的P 值，一般以
  - P<0.05 为有统计学差异
  - P<0.01 为有**显著**统计学差异
  - P<0.001为有**极其显著**的统计学差异。
- 其含义是样本间的差异由抽样误差所致的概率小于0.05 、0.01、0.001。
- 实际上，P值不能赋予数据任何重要性，只能说明某事件发生的几率。
- 统计结果中显示Pr > F，也可写成Pr( >F)，P = P{ F0.05 > F}或P = P{ F0.01 > F}。统计学上一般P值大于0.05我们可认为该组数据是符合正态分布。

[box-cox解读](https://www.cnblogs.com/triple-y/p/11244798.html?share_token=5720051e-dbba-4b4b-8607-7348c0e76550)

### 正态变化



#### Box-Cox 变换 —— 结构化数据变换

Box-Cox变换是Box和Cox在1964年提出的一种广义幂变换方法，是统计建模中常用的一种数据变换，用于连续的响应变量不满足正态分布的情况。Box-Cox变换之后，可以一定程度上减小不可观测的误差和预测变量的相关性。Box-Cox变换的主要特点是引入一个参数，通过数据本身估计该参数进而确定应采取的数据变换形式，Box-Cox变换可以明显地改善数据的正态性、对称性和方差相等性，对许多实际数据都是行之有效的。
- ![](https://p6-bk.byteimg.com/tos-cn-i-mlhdmxsy5m/d2d5b9714002441ab03a810984220d28~tplv-mlhdmxsy5m-q75:0:0.image)

由于**线性回归**是基于**正态分布**的前提假设，所以对其进行统计分析时，需经过数据的转换，使得数据符合正态分布。
- Box 和 Cox在1964年提出的Box-Cox变换可使线性回归模型满足**线性性**、**独立性**、**方差齐性**以及**正态性**时，又不丢失信息。

Box-Cox变换是统计建模中常用的一种数据变换，用于**连续**响应变量不满足正态分布的情况。
- 线性模型假定: $ Y=Xβ + ε $, 其中ε满足**正态分布**，但是利用实际数据建立回归模型时，个别变量的系数通不过。
- 例如往往不可观测的误差 ε 可能是和预测变量相关的，不服从正态分布，于是给线性回归的最小二乘估计系数的结果带来误差，为了使模型满足**线性性**、**独立性**、**方差齐性**以及**正态性**，需改变数据形式，故应用box-cox转换。
- 变换之后，可以一定程度上减小不可观测的误差和预测变量的相关性。但是选择的参数要适当，使用**极大似然估计**得到的参数，可以使上述过程的效果更好。当然，做过Box-Cox变换之后，方差齐性的问题不一定会消失，做过之后仍然需要做方差齐性的检验，看是否还需要采用其他方法。

变换公式: 源自 [结构化数据转换（Box-Cox)](https://www.cnblogs.com/zhengzhe/p/8993867.html?share_token=f63d5774-b44a-47e3-b310-04cb8cb80e50)
- ![](https://images2018.cnblogs.com/blog/1074595/201805/1074595-20180505095938667-1357616992.png)

Box-Cox变换的一个显著优点
- 通过求变换参数来确定变换形式，而这个过程完全基于数据本身而无须任何先验信息，这无疑比凭经验或通过尝试而选用对数、平方根等变换方式要客观和精确。

变换的目的是为了让数据满足线性模型的基本假定，即**线性**、**正态性**及**方差齐性**，然而经变换后数据是否同时满足了以上假定，仍需要考察验证。

## 特征分箱

`特征分箱`（binning）数值型特征的分箱即特征**离散化**
- 按照某种方法把特征值映射到有限的几个“**桶**（bin）”内。
- 比如，可以把1天24个小时按照如下规则划分为5个桶，使得每个桶内的不同时间都有类似的目标预测能力，比如有类似的购买概率。
- 0-3 Night: 较低的购买概率
- 4-7 Early morning: 中等的购买概率
- 8-14 Morning/Lunch: 较高的购买概率
- 15-20 Afternoon: 较低的购买概率
- 21-23: Evening: 高购买概率

为什么需要做特征分箱？
- 引入**非线性变换**，可增强模型的性能
- 增强特征可解释性
- 对异常值不敏感、防止过拟合
- 分箱之后可以对不同的桶做进一步的统计和组合（与其他特征的交叉）

有哪些分箱方法？
- 无监督分箱 
  - 固定宽度分箱（等宽）
  - 分位数分箱（等宽）
  - 对数转换并取整（对数）
- 有监督分箱 
  - 卡方分箱决策树分箱

## 离散特征常用变换


### a) 交叉组合

<img src="https://picx.zhimg.com/50/v2-1beb3416e05753de022e4265cc9276be_720w.jpg"/>

如上图，mean表示预测目标target（二分类）的均值，特征f1和f2单独存在时都不具备很好的区分性，但两种组合起来作为一个整体时却能够对target有很好的预测性。
- <img src="https://pica.zhimg.com/50/v2-f55863414017ef894ccf2fb156274bfd_720w.jpg">
- 如上图，当只有x1和x2时，目标（用蓝色和黄色分别表示正样本和负样本）不是线性可分的，当引入一个组合特征x3=x1x2时就可以用sign(x3)来预测目标了。

### b) 分箱（binning）

高基数（high-cardinality）类别型特征也有必要做特征分箱。这是因为高基数特征相对于低基数特征处于支配地位（尤其在tree based模型中），并且容易引入噪音，导致模型过拟合。甚至一些值可能只会出现在训练集中，另一些可能只会出现在测试集中。

类别型特征的分箱方法通常有如下三种：
- 基于业务理解自定义分箱规则，比如可以把城市划分为华南区、华北区、华东区等。
- 基于特征的频次合并低频长尾部分（back-off）。
- 基于决策树模型。

### c) 统计编码

1. Count Encoding
  - 统计该类别型特征不同行为类型、不同时间周期内的发生的频次。
2. Target Encoding
  - 统计该类别型特征不同行为类型、不同时间周期内的目标转化率（如目标是点击则为点击率，如目标是成交则为购买率）。 目标转化率需要考虑置信度的问题，当置信度不够的时候，需要做平滑，拿全局或者分组的平均转化率当当前特征的转化率做一个平滑，公式如下。 <img src="https://pic3.zhimg.com/50/v2-38e9426d072024927ccec02f2cf6a35a_720w.jpg" />
3. Odds Ratio
  - 优势比是当前特征取值的优势（odds）与其他特征取值的优势（odds）的比值，公式为：
  - theta = p1/(1-p1) / p2/(1-p2)
4. WOE(weight of evidence)
  - WOE度量不同特征取值与目标的相关程度，越正表示越正相关，越负表示越负相关。


## 时序特征

- 历史事件分时段统计
  - 统计过去1天、3天、7天、30天的总（平均）行为数
  - 统计过去1天、3天、7天、30天的行为转化率
- 差异
  - 环比、同比
- 行为序列
  - 需要模型配合


# 实践

## 案例测试


### 思考题1：如何度量用户的购买力？如何给用户的购买力划分档位？

- 背景：用户的购买力衡量的用户的消费倾向，度量用户是愿意花高价买高质量商品还是愿意花低价买便宜商品。购买力属于用户画像的一部分，是比较长期的稳定的，跟近期用户在平台上的消费金额无关。
- 参考答案： 
  - 第一步是给商品划分价格档位。根据商品的类目分组，组类按照商品价格排序，并按照等频或者等宽的分箱方式，得到价格档位。 
  - 第二步是聚合用户的购买力档位。根据用户的历史消费行为，把购买商品的价格档位聚合到用户身上。

### 思考题2：地理位置（经纬度）如何做分箱？

- 参考答案：一个物理量如何有多个维度才能表示，那么在做分箱时不能拆分成独立的多个变量来单独做分箱，而要这些变量当成一个整体来考虑。经纬度的分箱有一个成熟的算法叫做GeoHash，这里就不展开了。
- <img src="https://pic1.zhimg.com/50/v2-39b463ea256b30a475a19b06c3f7a1ff_720w.jpg?source=1940ef5c"/>
- 在推荐系统中，用户的统计特征需要按照用户分组后再做**分箱**，不建议**全局**做分箱。
- 在上面的例子中，Bob对不同Category的行为次数都比较高，但却“雨露均沾”，不如Alice对Beauty类目那么专注。如果全局分箱，\< Alice, Beauty\>、< Bob, Sport\>的桶号是不同的，然而Alice对Beauty类目的偏好程度与Bob对Sport类目的偏好程度是差不多的，这两个类目都是彼此的首选。全局分箱会让模型学习时比较困惑。

### 思考题1： 如何量化短视频的流行度（假设就用播放次数来代替）？

参考答案：
- 短视频的播放次数在整个样本空间上遵循`幂律分布`，少量热门的视频播放次数会很高，大量长尾的视频播放次数都较少。
- 这个时候比较好的做法是先做**log based的变换**，也就是先对播放次数取log，再对log变换之后的值做z-score标准化变换。
- 如果不先做log变换，就直接做z-score或者min-max变换，会导致特征值被压缩到一个非常狭窄的区域。


#### 思考题2：如何量化商品“贵”或者“便宜”的程度？

参考答案：
- 商品的价格本身无法衡量商品“贵”或“便宜”的程度，因为不同品类的商品价格区间本来就可能差异很大，同样的价格买不同类型的产品给顾客的感受也是不一样的
  - 比如，1000块钱买到一部手机，顾客感觉很便宜；但同样1000块钱买一只鼠标，顾客就会觉得这个商品的定价很贵。
- 因此，量化商品“贵”或者“便宜”的程度时就必须要考虑商品的品类，这里推荐的做法是做**z-score标准化**变化，但需要注意的是商品价格的均值和标准差的计算都需要限制在同品类的商品集合内。

### 思考题3：如何量化用户对新闻题材的偏好度？

参考答案：
- 为了简化，假设用户一段时间内对某类新闻的阅读数量表示用户对该类新闻题材的偏好度。因为不同用户的活跃度是不同的，有些高活跃度用户可能会对多个不同题材的新闻阅读量都很大，而另一些低活跃度的用户可能只对有限的几种类型的新闻有中等的阅读量，我们不能因为高活跃度的用户对某题材的阅读量大于低活跃度用户对相同题材的的阅读量，就得出高活跃度用户对这种类型的偏好度大于低活跃度用户对同类型题材的偏好度，这是因为低活跃度用户的虽然阅读量较少，但却几乎把有限精力全部贡献给了该类型的题材，高活跃度的用户虽然阅读量较大，但却对多种题材“雨露均沾”。
- 建议做**min-max归一化**，但需要注意的是计算最小值和最大值时都限制在当前用户的数据上，也就是按照用户分组，组内再做min-max归一化。

### 思考题4：当存在异常值时如何做特征缩放？

当存在**异常值**时，除了第6种gauss rank特征变换方法外，其他的特征缩放方法都可能把转换后的特征值压缩到一个非常狭窄的区间内，从而使得这些特征失去区分度，如下图。
- 这里介绍一种新的称之为**Robust scaling**的特征变换方法。
- xscaled=x−median(x)/IQR
- $ x_{scaled}=\frac{x-median(x)}{IQR} $
-  四分位距（interquartile range, IQR），又称四分差。是描述统计学中的一种方法，以确定第三四分位数和第一四分位数的差值。 - <img src="https://pic2.zhimg.com/50/v2-1f4f1e692819d0103d90773f2a679d7d_720w.jpg?source=1940ef5c">

参考答案：
- 存在异常值，使用**Robust scaling**或者**gauss rank**的特征缩放方法。

## 搜广推

搜推广场景下的特征工程
- ![](https://pic2.zhimg.com/80/v2-2a4694e9ec776a6b79b6f3e877b1cb49_1440w.jpg?source=1940ef5c)

在搜索、推荐、广告场景下高基数(high-cardinality)属性表示为特征时的挑战
- Scalable: to billions of attribute values
- Efficient: ~10^(5+) predictions/sec/node
- Flexible: for a variety of downstream learners
- Adaptive: to distribution change

为了克服这些挑战，业界最常用的做法是大量使用统计特征
- ![](https://picx.zhimg.com/80/v2-1544cd080932d08d08487092ff42cd56_1440w.jpg)

对各种类别型特征或离散化之后的数值型特征，以及这些特征之间的二阶或高阶交叉组合，按照不同行为类型、不同时间区间、不同目标（针对多目标任务）分别统计正样本和负样本的数量。这些统计量经过特征缩放/分箱和目标编码后可以作为最终特征向量的一部分。推荐的特征缩放方法为gauss rank，或者使用分箱操作。推荐的目标编码方法包括Target Encoding、优势比、WOE等。
- ![](https://picx.zhimg.com/80/v2-cb7c64fafa59669a8c3a640632a54769_1440w.jpg?source=1940ef5c)

在统计正负样本数量之前，需要对任务涉及的不同实体（如，用户、物品、上下文等）进行分箱，再统计分箱变量的正负样本数量。该操作方法叫做bin counting。这里的binning操作可以是任意的映射函数，最常用的按照实体的自然属性来分箱，比如商品可以按照类目、品牌、店铺、价格、好评率等属性分箱，用户可以按照年龄、性别、职业、爱好、购买力等分箱。

另外，为了防止label leakage，各种统计量的统计时间段都需要放在在样本事件的业务时间之前（注意图片下方的时间轴）。最后把各种粒度的统计量处理（缩放、分箱、编码等）后的值拼接起来作为特征向量的一部分。
- ![](https://picx.zhimg.com/80/v2-f7a62e4cafc21245014c5ab9b0b2a32b_1440w.jpg?source=1940ef5c)

那么，怎么样才能把所有可能的特征都想全了，做到不重不漏呢？可以按照如下描述的结构化方法来枚举特征。
- 列存实体（entity）；如果广告业务场景的用户、广告、搜索词、广告平台。
- 实体分箱 & 单维度统计/编码
- 特征交叉 & 多维度统计/编码
- ![](https://pic4.zhimg.com/80/v2-8f3aa30c191b9560808c5b69e3568ca0_1440w.jpg?source=1940ef5c)

对实体分箱可以玩出很多花样，比如可以从文本描述信息中抽取关键词作为分箱结果；或者可以基于embedding向量聚类，聚类的结果簇作为分箱结果。然后需要对这些分箱结果进行多轮两两交叉得到二阶、三阶或更高阶的组合特征。最后，对这些单维度（一阶）特征和各种高阶组合特征分别统计不同行为类型（点击、收藏、分享、购买等）、不同时间周期（最近1天、3天、7天、30天等）、不同学习目标（点击、转化等）下的正、负样本数量，对这些统计量进行特征缩放、分箱、编码后作为最终的特征。


## Tensorflow feature column用法

### 背景介绍

Feature Column是TensorFlow提供的用于处理结构化数据的工具，是将样本特征映射到用于训练模型特征的桥梁。它提供了多种特征处理方法，让算法人员可以很容易将各种原始特征转换为模型的输入，来进行模型实验。

![](https://img-blog.csdnimg.cn/img_convert/cf98e84681aaacadc02f7023fe966c2e.png)

如上图所示，所有Feature Column都源自FeatureColumn类，并继承了三个子类CategoricalColumn、DenseColumn和SequenceDenseColumn，分别对应稀疏特征、稠密特征、序列稠密特征。算法人员可以按照样本特征的类型找到对应的接口直接适配。

而且 Feature Column 和 TF Estimator 接口有很好的集成，通过定义好对应的特征输入就可以直接在预定义的 Estimator 模型中使用。TF Estimator 在推荐算法的使用非常普遍，特别是它封装了分布式训练的功能。
 
下图是一个使用Feature Column处理特征，进入到 Estimator DNN Classifier的示例：

![](https://img-blog.csdnimg.cn/img_convert/779703f3920ecde96972cd2f1614417d.png)
 
虽然Feature Column使用起来很方便，模型代码编写比较快，但是在爱奇艺推荐类业务的线上服务落地过程中，一些性能问题逐渐凸显，下面将逐个介绍我们在实际中碰到的一些问题，以及如何优化。
 
### 整型特征哈希优化
 
推荐类模型通常都会将ID类特征哈希到一定数量的bucket 分桶，然后转换成 Embedding再作为神经网络的输入，比如视频类ID特征，用户ID特征，商品ID特征等。示例如下：

![](https://img-blog.csdnimg.cn/img_convert/071c506b4a5179d6fbd7bb2bf3f1afc1.png)
 
在` categorical\_column\_with\_hash\_bucket `的文档\[2\]里面说到：对于String类型的输入，会执行\`output\_id = Hash(input\_feature\_string) % bucket\_size\`做哈希操作，而对于整数类型的输入会先转成String类型然后再进行同样的哈希操作。通过查看源代码\[3\]可以看到这样的逻辑：
![](https://img-blog.csdnimg.cn/img_convert/3799b20a61c2d96ae0ea98eefec50f97.png)

在推荐业务中，通常这类ID都是已经过某种方式的哈希，形成64bit的整型特征放到样本里面，因此必然要执行整型转化成String的操作。但是在TensorFlow 的 Timeline中可以看到函数\`as_string\`所对应的TF内部的\`AsString\` OP其实是一个比较耗时的操作，经过分析对比发现\`AsString\` OP的耗时通常是后面的哈希操作的3倍以上，如下图所示：
![](https://img-blog.csdnimg.cn/img_convert/5ba899ac18ae4164521bd87380441b26.png)
 
进一步分析\`AsString\` OP内部的代码，可以发现这个OP内部还涉及到了内存分配和拷贝操作，因此比纯哈希计算慢就可以理解了。
 
很自然，团队考虑去掉相关操作来做优化，因此专门编写了一个给整型做哈希的函数来做优化，示例代码如下：
![](https://img-blog.csdnimg.cn/img_convert/df002c80ea3fe3ddd368dc41a7f87f04.png)
 
经过这样做区分类型的哈希方式，完全优化了原先耗时长的类型转换操作。这里需要注意的是新加的哈希函数对应的新OP同样需要加到 TF Serving 中。

### 定长特征转换优化

定长特征是指使用接口\`tf.io.FixedLenFeature\`来解析的特征，比如用户的性别，年龄等，这类特征的长度通常都是定长的，并且固定为 1 维或多维。这类特征经过接口\`tf.io.parse_example\` 解析成 Dense Tensor，然后经过Feature Column处理，再进入到模型的输入层。常见的代码示例如下：

![](https://img-blog.csdnimg.cn/img_convert/f9ffd1309fe16b22e3f8b320aa0d0243.png)

以上面的代码为例子，举例解析一下 TensorFlow 内部的Tensor 转换逻辑。如下图所示，两个样本user\_name分别为bob和wanda，经过样本解析成shape为2的Dense Tensor，然后经过\`categorical\_column\_with\_vocabulary\_list\`转换，查找词表分别转成0和2，再经过\`indicator\_column\`转换成One hot编码的Dense输入。

![](https://img-blog.csdnimg.cn/img_convert/94341e5e7d231ab28218a7b083d437bb.png)

从上面的样本处理来看没有什么问题，然后再来看一下Feature Column代码内部的转换处理逻辑：

![](https://img-blog.csdnimg.cn/img_convert/793a8133d744cab5cd66b016632259ab.png)
 
如上图所示，在代码中Vocabulary Categorical Column 会先去除掉一些非法值，然后把输入的Dense Tensor 转换成 Sparse Tensor，在Indicator Column中会再次把Tensor从Sparse转成Dense，最后转成需要的One Hot Tensor。

先来思考一下上面两个转换操作的目的，一方面是为了去除样本数据中一些异常的值，另外一方面是这样的处理其实是同时兼顾了输入是 Sparse Tensor 的情况，如果输入是Spare Tensor就直接做Vocabulary词表查找，然后再转成Dense Tensor。这样转换虽然达到代码复用的作用，但是在性能上却有损失。如果能直接将原始的Input Tensor转换成One Hot Tensor，就可以省去两个转换过程，而且Sparse Tensor 和Dense Tensor之间的转换其实是非常耗时的操作。

再回到定长特征的原始性质，对于这类定长特征来讲，在样本处理的时候如果没有值，会被填充成默认值，而且在生成样本的时候都会被保证不会出现有空值或者 -1的情况，因此异常值的处理其实是可以被省略的。最后优化后的内部转换逻辑如下图，省去了两次Sparse Tensor 和Dense Tensor之间的转换。
 
![](https://img-blog.csdnimg.cn/img_convert/e224560dfd379964f61d0a14471c4679.png)
 
除了上面的Vocabulary Categorical Column，还有别的类似Feature Column也有同样的问题，因此针对这类特征，平台专门开发了一套优化的Feature Column接口提供给业务使用，优化性能效果还不错。
 
### 用户特征去重优化

推荐类算法模型都有个很典型的特点，那就是模型中会包含用户侧特征和要推荐的Item侧特征，比如视频的特征、商品的特征等。模型在线上服务部署的时候，会给一个用户推荐多个视频或商品，模型会返回这多个视频或商品的打分，然后按照打分的大小推荐给用户。由于是给单个用户做推荐，这个时候该用户的特征会根据推荐Item的数量重复多次，再发送给模型。如下是一个典型的推荐算法排序模型线上推理的示意图：

![](https://img-blog.csdnimg.cn/img_convert/3fa70304f95043d8a701cccd69ccf0fd.png)

图示的模型输入有3个User特征，3个Item特征，假定在对某个用户做推荐，该用户的3个特征分别对应为u1，u2和u3。这时要对两个不同的Item做推荐评分请求，也就是一个请求里面有两个Item，这两个Item分别为I1和I2，这两个Item分别有三个特征，I1对应I11，I12，I13，以此类推，这样构成一个batch size为2的推理请求。从图中可以看到，因为是给同一个用户推荐两个不同的Item，Item侧的特征是不同的，但是用户的特征被重复了两次。
 
上面的例子只以2个Item为例，但是实际线上的服务一个推理请求会带100个Item甚至更多，因此用户的特征也会被重复100次甚至更多，重复的用户特征不仅增加了传输的带宽，而且增加了特征处理时的计算量，因此业务非常希望能解决这个问题。
 
这个问题的本源要从TensorFlow 的模型训练代码说起。TensorFlow 训练时的每一条样本是某个用户对某个Item的行为，然后经过shuffle和batch后进入到训练模型，这时候一个batch里面的数据肯定包含了多个用户行为的样本，这个和线上推理服务的输入数据格式是完全不同的。
 
如何解决这个问题？最简单的想法，如果在线上服务就只发送一条用户特征会怎么样？快速的尝试就可以知道特征数据进入到模型输入层的时候会 concat失败。这是因为Item特征的batch size是多个，而用户特征的batch size只有1，示例如下：
 
![](https://img-blog.csdnimg.cn/img_convert/53ad9dabb0db1d2e8cf02997f324662b.png)
 
为了解决concat失败的问题，单纯先从模型的角度来看，可以考虑在进入到输入层之前把用户特征还原到和Item特征同样的batch size，如下图所示。

![](https://img-blog.csdnimg.cn/img_convert/9be29f5066865a63468a5141918f85e9.png)
 
显然这个从数学模型上是可行的，接下来就是怎么在TensorFlow 的代码里面实现这个想法。这里需要注意的是复制的操作只能在线上服务的模型里面，不能在训练的模型里面。
 
目前TF Estimator 接口在推荐类算法的应用比较常见，而Estimator 接口提供了很好的模型区分方法，通过判断ModeKeys为\`tf.estimator.ModeKeys.PREDICT\`时是线上的服务模型，ModeKeys为\`tf.estimator.ModeKeys.TRAIN\`时是训练模型，下面是示例代码：
 
![](https://img-blog.csdnimg.cn/img_convert/88ea882ae235d4a45ccdd4781cad0851.png)
 
在实际的模型上，需要将User和Item的feature column区分开来分别传入，这个对原来的模型代码改动比较大，batch size的获取可以通过判断Item特征的长度来获取，这里不再赘述。

在实际的上线过程中，团队经历了两个阶段，第一个阶段是只对算法模型代码做修改，在处理用户特征时只取第一维，但是实际发送的推理请求还是会把用户特征重复多次；第二个阶段才把发送的推荐请求优化成只发送一份用户特征，这个时候模型代码不需要再做修改，已经自动适配。
 
![](https://img-blog.csdnimg.cn/img_convert/937ea89e460503042d68894f7357088b.png)
 
如上图所示，第一阶段的时候用户特征的输入还是重复多次，在模型中，对用户特征只取第一维再进行特征处理，示例代码如下：
![](https://img-blog.csdnimg.cn/img_convert/7797f8f9cf1abf87ca21128ae10a52c3.png)
 
上面的模型代码可以同时适配推理请求发送重复的用户特征，或者只发送一条用户特征。因此在第二阶段的时候，不需要再修改模型代码，只需要优化发送推理请求的引擎侧代码。
 
经过这样的优化，线上推理服务不需要重复发送用户特征，不仅节约了带宽，而且减少了序列化的消耗。对一个 batch 中的用户特征只做一份数据的Feature Column转换，然后做复制操作，复制消耗的时间远远小于转换的时间。

这里其实还可以做进一步的优化，将复制操作延后到第一层神经网络的矩阵乘后面，这样可以减少第一个矩阵乘的部分计算消耗。如果用户特征的维度占比比较高，优化的效果会比较明显。
 


# 结束


