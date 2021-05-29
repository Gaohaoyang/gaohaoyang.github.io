---
layout: post
title:  "优化算法笔记-optimization"
date:   2020-08-02 00:23:00
categories: 机器学习 数学基础
tags: 最优化 梯度下降 牛顿法 斯坦福 凸优化 KKT 损失函数
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


# 简介

- 摘自：[最优化算法的前世今生](https://xw.qq.com/cmsid/20200718A06NR300)
- 人生不如意之事十之八九，想达到我们想要达到的目标时，通常都有各种各样的限制。那么所谓最优化问题，就是指**用最优的方式去平衡理想与现实之间的关系**。

- 最古老的优化问题：邮差送信

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
 
(1) log对数损失函数能非常好的表征概率分布，在很多场景尤其是多分类，如果需要知道结果属于每个类别的置信度，那它非常适合。
 
(2)健壮性不强，相比于hinge loss对噪声更敏感。
 
(3)逻辑回归的损失函数就是log对数损失函数。
 
4. 平方损失函数
 
平方损失函数标准形式如下：
 
![[公式]](https://www.zhihu.com/equation?tex=L+%28+Y+%7C+f+%28+X+%29+%29+%3D+%5Csum+_+%7B+N+%7D+%28+Y+-+f+%28+X+%29+%29+%5E+%7B+2+%7D++%5C%5C)
 
特点：
 
(1)经常应用与回归问题
 
5. 指数损失函数（exponential loss）
 
指数损失函数的标准形式如下：
 
![[公式]](https://www.zhihu.com/equation?tex=L%28Y%7Cf%28X%29%29+%3D+exp%5B-yf%28x%29%5D++%5C%5C)
 
特点：
 
(1)对离群点、噪声非常敏感。经常用在AdaBoost算法中。
 
6. Hinge 损失函数
 
Hinge损失函数标准形式如下：
 
![[公式]](https://www.zhihu.com/equation?tex=L%28y%2C+f%28x%29%29+%3D+max%280%2C+1-yf%28x%29%29+++%5C%5C)
 
特点：
 
(1)hinge损失函数表示如果被分类正确，损失为0，否则损失就为 ![[公式]](https://www.zhihu.com/equation?tex=1-yf%28x%29) 。SVM就是使用这个损失函数。
 
(2)一般的 ![[公式]](https://www.zhihu.com/equation?tex=f%28x%29) 是预测值，在-1到1之间， ![[公式]](https://www.zhihu.com/equation?tex=y) 是目标值(-1或1)。其含义是， ![[公式]](https://www.zhihu.com/equation?tex=f%28x%29+) 的值在-1和+1之间就可以了，并不鼓励 ![[公式]](https://www.zhihu.com/equation?tex=%7Cf%28x%29%7C+%3E+1) ，即并不鼓励分类器过度自信，让某个正确分类的样本距离分割线超过1并不会有任何奖励，从而使分类器可以更专注于整体的误差。
 
(3) 健壮性相对较高，对异常点、噪声不敏感，但它没太好的概率解释。
 
7. 感知损失(perceptron loss)函数
 
感知损失函数的标准形式如下：
 
![[公式]](https://www.zhihu.com/equation?tex=L%28y%2C+f%28x%29%29+%3D+max%280%2C+-f%28x%29%29++%5C%5C)
 
特点：
 
(1)是Hinge损失函数的一个变种，Hinge loss对判定边界附近的点(正确端)惩罚力度很高。而perceptron loss只要样本的判定类别正确的话，它就满意，不管其判定边界的距离。它比Hinge loss简单，因为不是max-margin boundary，所以模型的泛化能力没 hinge loss强。
 
8. 交叉熵损失函数 (Cross-entropy loss function)
 
交叉熵损失函数的标准形式如下:
 
![[公式]](https://www.zhihu.com/equation?tex=C+%3D+-+%5Cfrac+%7B+1+%7D+%7B+n+%7D+%5Csum+_+%7B+x+%7D+%5B+y+%5Cln+a+%2B+%28+1+-+y+%29+%5Cln+%28+1+-+a+%29+%5D++%5C%5C)
 
注意公式中 ![[公式]](https://www.zhihu.com/equation?tex=x) 表示样本， ![[公式]](https://www.zhihu.com/equation?tex=y) 表示实际的标签， ![[公式]](https://www.zhihu.com/equation?tex=a) 表示预测的输出， ![[公式]](https://www.zhihu.com/equation?tex=n) 表示样本总数量。
 
特点：
 
(1)本质上也是一种对数似然函数，可用于二分类和多分类任务中。
 
二分类问题中的loss函数（输入数据是softmax或者sigmoid函数的输出）：
 
![[公式]](https://www.zhihu.com/equation?tex=loss+%3D+-+%5Cfrac+%7B+1+%7D+%7B+n+%7D+%5Csum+_+%7B+x+%7D+%5B+y+%5Cln+a+%2B+%28+1+-+y+%29+%5Cln+%28+1+-+a+%29+%5D+%5C%5C)
 
多分类问题中的loss函数（输入数据是softmax或者sigmoid函数的输出）：
 
![[公式]](https://www.zhihu.com/equation?tex=loss+%3D+-+%5Cfrac%7B1%7D%7Bn%7D+%5Csum_i+y_ilna_i+%5C%5C)
 
(2)当使用sigmoid作为激活函数的时候，常用交叉熵损失函数而不用均方误差损失函数，因为它可以完美解决平方损失函数权重更新过慢的问题，具有“误差大的时候，权重更新快；误差小的时候，权重更新慢”的良好性质。
 
最后奉献上交叉熵损失函数的实现代码：[cross_entropy](https://link.zhihu.com/?target=https%3A//github.com/yyHaker/MachineLearning/blob/master/src/common_functions/loss_functions.py).


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
 
（1）第一个算法，`最速下降法`。首先，这是一个等高线，可以把它理解为我们的高楼，每一个圈代表一层，最中心是最高的位置，最终目标是用最快的方式上到中心位置。
 
那么，最速下降法是怎么做的呢？比如从一楼上二楼可以有多种方法，很明显我们从垂直方向往上跳，在局部来看是最快的，然后以这样的方法上到最高层。
 
![](https://inews.gtimg.com/newsapp_bt/0/12108607688/641)
 
最速下降法有哪些特点呢？每一步都做到了最优化，但很遗憾的是，对于整个算法而言，它并不是非常好的算法。因为它的收敛速度是线性收敛，线性收敛对于最优化算法而言是一种比较慢的算法，但也是凸优化里最自然的一个算法，最早被应用。
 
（2）第二个算法，`共轭梯度法`。与最速下降法相比较（看下图），绿色的线是最速下降法的迭代，从最外层到中心点可能需要五步迭代，但是共轭梯度法可能只需两步迭代（红色线）。
 
![](https://inews.gtimg.com/newsapp_bt/0/12108607689/641)
 
共轭梯度法最大特点是汲取前面的经验再做下一步的动作，比如从四楼上五楼，我们会考虑方向是否最佳，汲取之前跳过的四步经验，再探索新的方向往上跳。从数学的角度来讲，每一步前进的方向和之前所有走过的路径都是垂直的，因为这样的性质，共轭梯度法的收敛速度远远高于最速下降法。
 
（3）第三个算法，`牛顿法`。前面两种算法，从数学的角度讲，他们只用到了一阶导数的信息，对于牛顿法而言，它不仅仅用到了局部一阶导的信息，还用到了二阶导的信息。
 
相比前面两种算法，牛顿法的每一步，它在决定下一步怎么走时，不仅考虑当前的下降速度是否足够快，还会考虑走完这一步后，下一步坡度是否更陡，下一步是否更难走。可见，牛顿法所看到的区间会更远，收敛速度更快，属于二阶收敛速度。
 
如果最速下降法需要100步的话，牛顿法就只需要10步，但也正因为牛顿法使用了二阶导的信息，所以它需要更多的运算量。
 
（4）第四个算法，`拟牛顿法`。1970年，Broyden、Fletcher、Goldfarb、Shanno四人几乎同一时间发表了论文，对于传统的牛顿法进行了非常好的改进，这个算法叫拟牛顿法，它的收敛速度与牛顿法相似，但是它不再需要计算二阶导数，所以每一步的迭代速度大大增加。
 
它是通过当前一阶导数的信息去近似二阶导数的信息，因此整个运算速度大幅度增加。由于这个算法是四个人几乎同一时间发现的，所以也叫BFGS算法。下图中的照片是他们四个人聚在普林斯顿时拍的，很幸运的是，Goldfarb是我博士时期的导师。
 
实际生活中，被应用最广的两种算法，一个是BFGS，另一个就是共轭梯度法。这两种算法经常会出现在很多的程序包里或者开源代码里，如果使用在大规模的优化问题或者成千上万个变量的问题中，也会有非常好的效果。

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



# 资料

- 资料如下
    - [从 SGD 到 Adam —— 深度学习优化算法概览(一)](https://zhuanlan.zhihu.com/p/32626442)
    - [最优化算法的前世今生](https://baijiahao.baidu.com/s?id=1672520039604186628&wfr=spider&for=pc)
        - 大岩资本黄铂博士结合生活实践中的案例，深入浅出阐释了最优化算法的前世今生。从实际生活中最基础的应用切入，黄铂将抽象的算法概念生动化，解释了什么叫最优化问题、凸优化及算法分类、机器学习与人工智能应用。

- [凸优化：算法和复杂性 by Sebastien Bubeck](https://www.bilibili.com/video/av62565077)

<iframe src="//player.bilibili.com/player.html?aid=62565077&bvid=BV1Vt411T7mK&cid=108720104&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="600" width="100%"> </iframe>


# 结束


