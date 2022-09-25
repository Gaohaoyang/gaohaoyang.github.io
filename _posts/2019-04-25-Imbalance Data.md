---
layout: post
title:  "如何处理机器学习中的不平衡类别-How to handle imbalance data"
date:   2019-04-25 20:12:00
categories: 机器学习
tags: 机器学习 不平衡 损失函数
excerpt: 技术文章
mathjax: true
---

* content
{:toc}

# 汇总

- 【2021-7-14】[ICML 2021 (Long Oral) 深入研究不平衡回归问题](https://zhuanlan.zhihu.com/p/369627086)，在经典的数据不平衡问题下，探索了非常实际但极少被研究的问题：数据不平衡回归问题。现有的处理不平衡数据/长尾分布的方法绝大多数仅针对分类问题，即目标值是不同类别的离散值（索引）；但是，许多实际的任务涉及连续的，甚至有时是无限多的目标值。本文推广了传统不平衡分类问题的范式，将数据不平衡问题从离散值域推广到连续域。
  - ![](https://pic4.zhimg.com/80/v2-e70edea5b4096e4299e999547325799f_720w.jpg)
  - ![](https://pic2.zhimg.com/v2-9c0da9f202c09997c73732d7634ae3c5_b.webp)
- 【2020-7-17】focal loss[论文](https://arxiv.org/abs/1708.02002)，[配套代码](https://github.com/Tony607/Focal_Loss_Keras)
- [非平衡数据集 focal loss 多类分类](https://www.yanxishe.com/TextTranslation/1646)
- [Focal Loss理解](https://www.cnblogs.com/king-lps/p/9497836.html)：降低了大量简单负样本在训练中所占的权重，也可理解为一种困难样本挖掘
- ![](https://images2018.cnblogs.com/blog/1055519/201808/1055519-20180818162755861-24998254.png)
- 普通的交叉熵对于正样本而言，输出概率越大损失越小。对于负样本而言，输出概率越小则损失越小。此时的损失函数在大量简单样本的迭代过程中比较缓慢且可能无法优化至最优
- ![](https://images2018.cnblogs.com/blog/1055519/201808/1055519-20180818174944824-933422059.png)
- ![](https://images2018.cnblogs.com/blog/1055519/201808/1055519-20180818174822290-765890427.png)
- ![](https://images2018.cnblogs.com/blog/1055519/201808/1055519-20180818170840882-453549240.png)
- 在原有的基础上加了一个因子，其中gamma>0使得减少易分类样本的损失。使得更关注于困难的、错分的样本。
- 只添加alpha虽然可以平衡正负样本的重要性，但是无法解决简单与困难样本的问题。
- gamma调节简单样本权重降低的速率，当gamma为0时即为交叉熵损失函数，当gamma增加时，调整因子的影响也在增加。实验发现gamma为2是最优。

不平衡数据集如何处理？研究表明，在某些应用下，<span style='color:red'>1∶35</span>的比例就会使某些分类方法无效，甚至<span style='color:red'>1∶10</span>的比例也会使某些分类方法无效。
- [分类问题中不平衡数据集的解决方案](https://www.52ml.net/16294.html)，正负样本玄虚
- 1.过抽样：简单赋值负样本——最常用，容易过拟合，SVM模型里用途不大
- 2.欠抽样：随机减少正样本——造成信息丢失
- 3.算法层面：（1）重构训练集，按错分代价对训练集重构（2）代价敏感函数，大样本高代价，小样本低代价
- 4.特征选择：选取有区分度的特征
- [解决真实世界的问题：如何在不平衡数据集上使用机器学习](https://www.52ml.net/17957.html?utm_source=tuicool&utm_medium=referral)，[非平衡数据机器学习](https://www.cnblogs.com/waring/p/5890214.html)，【2019-04-25】[如何处理机器学习中的不平衡类别问题-含代码实现](https://github.com/xitu/gold-miner/blob/master/TODO/how-to-handle-imbalanced-classes-in-machine-learning.md)
- ![图解](http://images2015.cnblogs.com/blog/594991/201609/594991-20160920201204715-235828797.png)

> * 原文地址：[How to Handle Imbalanced Classes in Machine Learning](https://elitedatascience.com/imbalanced-classes)
> * 原文作者：[elitedatascience](https://elitedatascience.com/imbalanced-classes)
> * 译文出自：[掘金翻译计划](https://github.com/xitu/gold-miner)
> * 本文永久链接：[https://github.com/xitu/gold-miner/blob/master/TODO/how-to-handle-imbalanced-classes-in-machine-learning.md](https://github.com/xitu/gold-miner/blob/master/TODO/how-to-handle-imbalanced-classes-in-machine-learning.md)
> * 译者：[RichardLeeH](https://github.com/RichardLeeH)
> * 校对者：[lsvih](https://github.com/lsvih), [lileizhenshuai](https://github.com/lileizhenshuai)

- [有道云笔记总结](http://note.youdao.com/s/7SHGEUqr)
- 【2021-5-30】[样本不均衡的一顿操作](https://blog.csdn.net/m0_52122378/article/details/116007787)：不平衡问题解法很多，最简单的就是重采样，包括过采样和欠采样，使各个类别数量大致相同；
  - ![](https://ss.csdn.net/p?https://pic1.zhimg.com/v2-8c2953af30a7eb02bb0527e888cce9a8_b.jpg)
  - 更复杂的采样方式，如先对样本聚类，在需要降采样的样本上，按类别进行降采样，这样能丢失较少的信息。过采样不再是简单copy，可以加一点点"噪声"，生成更多的样本。
  - Tomek links：Tomek连接指的是在空间上"最近"的样本，但是是不同类别的样本。删除这些pair中，占大多数类别的样本。通过这种降采样方式，有利于分类模型的学习
    - ![](https://ss.csdn.net/p?https://pic4.zhimg.com/v2-f2210f618d41d37dc58fcd92a678011f_b.jpg)
  - SMOTE方法可以给少数样本做扩充，SMOTE在样本空间中少数样本随机挑选一个样本，计算k个邻近的样本，在这些样本之间插入一些样本做扩充，反复这个过程，知道样本均衡
    - ![](https://ss.csdn.net/p?https://pic1.zhimg.com/v2-5d28a02f926a8b40adb182a067eb69c0_b.jpg)
  - NearMiss降采样的方法，通过距离计算，删除掉一些无用的点。
    - NearMiss-1：在多数类样本中选择与最近的3个少数类样本的平均距离最小的样本。
    - NearMiss-2：在多数类样本中选择与最远的3个少数类样本的平均距离最小的样本。
    - NearMiss-3：对于每个少数类样本，选择离它最近的给定数量的多数类样本。
  - NearMiss-1考虑的是与最近的3个少数类样本的平均距离，是局部的；NearMiss-2考虑的是与最远的3个少数类样本的平均距离，是全局的。NearMiss-1方法得到的多数类样本分布也是“不均衡”的，它倾向于在比较集中的少数类附近找到更多的多数类样本，而在孤立的（或者说是离群的）少数类附近找到更少的多数类样本，原因是NearMiss-1方法考虑的局部性质和平均距离。NearMiss-3方法则会使得每一个少数类样本附近都有足够多的多数类样本，显然这会使得模型的精确度高、召回率低。
- 【2020-9-15】对于缓解类别不平衡，比较基本的方法就是调节样本权重，看起来“高端”一点的方法则是各种魔改 loss了（比如 Focal Loss、Dice Loss、Logits Adjustment 等），源自：[再谈类别不平衡问题：调节权重与魔改Loss的综合分析](https://www.sohu.com/a/417967639_500659)
   - （1）从光滑准确率到交叉熵
   - （2）从光滑F1到加权交叉熵：对 loss 的各种魔改，本质上来说都只是在调整梯度，得到更合理的梯度
   - （3）从扩大边界到Logits调整
   - 长尾分布：少数类别的样本数目非常多，多数类别的样本数目非常少。
   - ![](http://p8.itc.cn/q_70/images03/20200913/ce0ea36c06ec4f2ea121f78ad7920a93.png)
- 【2021-8-17】不要对不平衡的数据集使用准确度（accuracy）指标。这个指标常用于分类模型，不平衡数据集应采用**kappa系数**或**马修斯相关系数**（MCC）指标。


# 不平衡问题解法

以Albert+TextCNN为基础框架，将已有的长尾问题损失函数解决方案集成进该基础框架进行多标签文本分类,数据的长尾问题是经常会遇见的一个棘手的问题，更为极端的情况甚至极个别的类的trainning sample等于0。这对一个模型的性能影响是非常大的。
- ![](https://pic2.zhimg.com/v2-8a3ccd7ed59de691a27406065477b3b9_720w.jpg?source=3af55fa1)

## 重采样

【2022-8-31】[对"样本不均衡"一顿操作](https://zhuanlan.zhihu.com/p/366768794)

使用频率最高的方式：对“多数”样本**降采样**，也可以对“少数”样本**过采样**
- ![](https://pic1.zhimg.com/80/v2-8c2953af30a7eb02bb0527e888cce9a8_1440w.jpg)

重采样缺点比较明显
- 过采样对少数样本"过度捕捞"
- 降采样会丢失大量信息

重采样的方案也有很多
- 最简单的就是**随机**过采样/降采样，使得各个类别的数量大致相同。
- 复杂的采样方式，比如先对样本**聚类**，在需要降采样的样本上，按类别进行降采样，这样能丢失较少的信息。

过采样的话，可以不用简单的copy，可以加一点点"噪声"，生成更多的样本。

### 降采样：Tomek links

Tomek连接指的是在空间上"最近"的样本，但是是不同类别的样本。删除这些pair中，占大多数类别的样本。通过这种降采样方式，有利于分类模型的学习
- ![](https://pic4.zhimg.com/80/v2-f2210f618d41d37dc58fcd92a678011f_1440w.jpg)

### 降采样：NearMiss

通过距离计算，删除掉一些无用的点。
- NearMiss-1：在多数类样本中选择与最近的3个少数类样本的平均距离最小的样本。
- NearMiss-2：在多数类样本中选择与最远的3个少数类样本的平均距离最小的样本。
- NearMiss-3：对于每个少数类样本，选择离它最近的给定数量的多数类样本。

对比
- NearMiss-1考虑的是与最近的3个少数类样本的平均距离，是局部的；
- NearMiss-2考虑的是与最远的3个少数类样本的平均距离，是全局的。
- NearMiss-1方法得到的多数类样本分布也是“不均衡”的，它倾向于在比较集中的少数类附近找到更多的多数类样本，而在孤立的（或者说是离群的）少数类附近找到更少的多数类样本，原因是NearMiss-1方法考虑的局部性质和平均距离。
- NearMiss-3方法则会使得每一个少数类样本附近都有足够多的多数类样本，显然这会使得模型的精确度高、召回率低。

### 过采样：SMOTE

这个方法可以给少数样本做扩充，SMOTE在样本空间中少数样本随机挑选一个样本，计算k个邻近的样本，在这些样本之间插入一些样本做扩充，反复这个过程，直到样本均衡
- ![](https://pic1.zhimg.com/80/v2-5d28a02f926a8b40adb182a067eb69c0_1440w.jpg)

## 加权交叉熵损失函数

类别不均衡的情况下，需要通过损失函数中设置权重参数来调节各类之间的比重。一般不同类别的权重占比需要通过**多次**实验调整。如首先采用**中值频率平衡**的方法来结算每一个类的权重。然后在同时实验的效果对权重进行微调找到最合适的类别权重。

中值频率平衡的原理如下：
 
![[公式]](https://www.zhihu.com/equation?tex=freq_c+%3D+sum_c%2Fsum)
 
![[公式]](https://www.zhihu.com/equation?tex=weight_c+%3D+freq_c%2Fmedium)
 
其中 ![[公式]](https://www.zhihu.com/equation?tex=sum_c) 表示 ![[公式]](https://www.zhihu.com/equation?tex=c) 类别在训练集中的实例个数， ![[公式]](https://www.zhihu.com/equation?tex=sum) 表示训练集的大小， ![[公式]](https://www.zhihu.com/equation?tex=medium) 对所有类别的实例数目进行排序之后取到的中位数。
 
有了上述对于权重的计算，但是tensorflow中没有对应的多标签分类的加权二进制交叉熵损失函数的api封装，所以这个函数得我们自己自定义，核心代码如下：
 
```
epsilon = 1.e-8
logits = tf.nn.sigmoid(prediction)
# 做一个截断操作，防止后续log的计算中出现nan值
logits = tf.clip\_by\_value(logits, epsilon, 1. - epsilon)
#这里的weight_c就是用前面公式求出来得到的一个列表
weight = tf.constant(weight_c)  
# 这里的label为真值
loss = -tf.reduce_mean(weight\*label\*tf.log(logits)+(1-label)*tf.log((1-logits)))
```

## Focal loss

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

## Dice Loss

**[Dice Loss](http://link.zhihu.com/?target=https%3A//arxiv.org/abs/1606.04797) 与** **[DSC Loss](http://link.zhihu.com/?target=https%3A//arxiv.org/pdf/1911.02855.pdf)**

 
Dice Loss最先是在[VNet](http://link.zhihu.com/?target=https%3A//arxiv.org/abs/1606.04797) 这篇文章中被提出，后来被广泛的应用在了医学影像语义分割之中。Dice loss提出来是用来解决图像中前景与背景像素数目不平衡的问题。而正也正好对应到了分类问题中的正例与负例。在包括多标签文本分类的分类问题中，正例与负例的不平衡一直是一个很棘手的问题。
 
> 1、训练与测试失配。占据绝大多数的负例会支配模型的训练过程，导致模型倾向于负例，而测试时使用的F1指标需要每个类都能准确预测；  
> 2、简单负例过多。负例占绝大多数也意味着其中包含了很多简单样本，这些简单样本对于模型学习困难样本几乎没有帮助，反而会在交叉熵的作用下推动模型遗忘对困难样本的知识。
 
我们知道，分类问题一般都基于交叉熵作为损失函数，交叉熵有一个很明显的特点：“平等”地看待每一个样本，无论正负，都尽力把它们推向1（正例）或0（负例）。但实际上，对分类而言，将一个样本分类为负只需要它的概率＜0.5即可，完全没有必要将它推向0。
 
基于这个观察，作者提出一个基于Dice Loss的自适应损失——DSC，在训练时推动模型更加关注困难的样本，降低简单负例的学习度，从而在整体上提高基于F1值的效果。
 
先来看一下Dice Loss是怎么操作的，给定两个集合A和B，衡量两者之间的相似度：
 
![[公式]](https://www.zhihu.com/equation?tex=Dice_%7Bcoefficient%7D%3D+%5Cfrac%7B2%7CA%5Ccap+B%7C%7D%7B%7CA%7C%5Ccup%7CB%7C%7D)
 
如果我们把![[公式]](https://www.zhihu.com/equation?tex=A)看作是模型预测的正例，![[公式]](https://www.zhihu.com/equation?tex=B)看作真实的正例。那么上式可以写成：
 
![[公式]](https://www.zhihu.com/equation?tex=Dice_%7Bcoefficient%7D%3D+%5Cfrac%7B2TP%7D%7B2TP%2BFN%2BFP%7D+%3D+F_1)
 
对于单个样本而言：
 
![[公式]](https://www.zhihu.com/equation?tex=Dice_%7Bcoefficient%7D%3D+%5Cfrac%7B2p_iy_i%7D%7Bp_i%2By_i%7D) , 其中 ![[公式]](https://www.zhihu.com/equation?tex=p_i) 为预测结果， ![[公式]](https://www.zhihu.com/equation?tex=y_i) 为真值。
 
![[公式]](https://www.zhihu.com/equation?tex=Dice_%7Bcoefficient%7D) 表达了模型预测的正例与真正的正例之间的相似度，我们希望他们越相似越好，所以Dice Loss最基础的版本可以表达为：
 
![[公式]](https://www.zhihu.com/equation?tex=Dice_%7Bloss%7D+%3D+1-Dice_%7Bcoefficient%7D)
 
可以看到，对于二分类而言，如果为负例， ![[公式]](https://www.zhihu.com/equation?tex=Dice_%7Bcoefficient%7D) 为0，这显然不太合理。所以作者加入了平滑系数 ![[公式]](https://www.zhihu.com/equation?tex=%5Cvarepsilon) ，即：
 
![[公式]](https://www.zhihu.com/equation?tex=Dice_%7Bcoefficient%7D%3D+%5Cfrac%7B2p_iy_i+%2B+%5Cvarepsilon%7D%7Bp_i%2By_i+%2B+%5Cvarepsilon%7D)
 
后来，Milletari et al. (2016)将分母改为平方和的形式以实现更好的收敛：
 
![[公式]](https://www.zhihu.com/equation?tex=Dice_%7Bcoefficient%7D%3D+%5Cfrac%7B2p_iy_i+%2B+%5Cvarepsilon%7D%7Bp_i%5E2%2By_i%5E2+%2B+%5Cvarepsilon%7D)
 
而在ACL2020提出的DSC中， ![[公式]](https://www.zhihu.com/equation?tex=Dice_%7Bcoefficient%7D) 变为：
 
![[公式]](https://www.zhihu.com/equation?tex=Dice_%7Bcoefficient%7D%3D+%5Cfrac%7B2%281-p_i%29p_iy_i+%2B+%5Cvarepsilon%7D%7B%281-p_i%29p_i%2By_i+%2B+%5Cvarepsilon%7D)
 
可以发现，这里的思想与focal loss一致，或者是说借鉴了focal loss的思想。不过，Focal Loss即使能对简单样本降低学习权重，但是它本质上仍然是在鼓励简单样本趋向0或1（本质上仍然是交叉熵），这就和DSC有了根本上的区别。因此，我们说DSC通过“平衡”简单样本和困难样本的学习过程，从而提高了最终的F1值。
 
同样，TensorFlow并没有dice loss和DSC的封装，还得自己写：
 
DiceLoss
 
```python
def dice_loss(y_true, y_pred, varepsilon):
  epsilon = 1.e-8
  y_true = tf.cast(y_true, tf.float32)
  y_pred = tf.nn.sigmoid(y_pred)
  y_pred = tf.clip_by_value(y_pred, epsilon, 1. - epsilon)
 
  numerator = 2 * tf.reduce_sum(y_true * y_pred) + varepsilon
  denominator = tf.reduce_sum(y_true + y_pred) + varepsilon
 
  return 1 - numerator / denominator
```
 
DSC
 
```python
def dsc_loss(y_true, y_pred, varepsilon):
  epsilon = 1.e-8
  y_true = tf.cast(y_true, tf.float32)
  y_pred = tf.nn.sigmoid(y_pred)
  y_pred = tf.clip_by_value(y_pred, epsilon, 1. - epsilon)
 
  numerator = 2 * tf.reduce_sum(y_true * y_pred * (1-y_pred)) + varepsilon
  denominator = tf.reduce_sum(y_true + y_pred * (1-y_pred)) + varepsilon
 
  return 1 - numerator / denominator
```

## Class-Balanced Loss

【2021-10-17】谷歌对CVPR 2019上发表的一篇文章的综述。它为最常用的损耗(softmax-cross-entropy、focal loss等)提出了一个针对每个类别的重新加权方案，能够快速提高精度，特别是在处理高度类不平衡的数据时。
- 论文: [Class-Balanced Loss Based on Effective Number of Samples]()
- [PyTorch实现源码]https://github.com/vandit15/Class-balanced-loss-pytorch)

### 样本的有效数量

在处理长尾数据集(其中大部分样本属于很少的类，而许多其他类的样本非常少)的时候，如何对不同类的损失进行加权可能比较棘手, 通常将权重设置为类样本的**倒数**或类样本的**平方根**的倒数。
- ![](https://p9.toutiaoimg.com/origin/pgc-image/5fdb00997dc840bd9e48c965c7108f59?from=pc)

问题：
- 随着样本数量的增加，新数据点的带来的好处会减少。新样本极有可能是现有样本的**近似副本**，特别是在训练神经网络时使用大量数据增强(如重新缩放、随机裁剪、翻转等)的时候，很多都是这样的样本。用**有效样本数**重新加权可以得到较好的结果。

有效样本数：近似n个样本所覆盖的实际体积，其中总体积N由总样本表示
- ![](https://p9.toutiaoimg.com/origin/pgc-image/38b1c63850b949dd87e20b5925647832?from=pc)

每个样本的贡献：
- 第j个样本对有效样本数的贡献为β^(j-1), 如果β=0，则En=1。同样，当β→1的时候En→n。后者可以很容易地用**洛必达法则**证明。
- 这意味着当N很大时，有效样本数与样本数N相同。在这种情况下，唯一原型数N很大，每个样本都是唯一的。然而，如果N=1，这意味着所有数据都可以用一个原型表示。
- ![](https://p9.toutiaoimg.com/origin/pgc-image/bdd0d77498994872b7e6552b66a8da32?from=pc)

### 类别均衡损失

如果没有额外的信息，我们不能为每个类设置单独的Beta值，因此，使用整个数据的时候，我们将把它设置为一个特定的值(通常设置为0.9、0.99、0.999、0.9999中的一个)。

类别均衡损失可表示为：
- ![](https://p9.toutiaoimg.com/origin/pgc-image/67c77475560e4f6ca81f61b70f1d324e?from=pc)
这里， L(p,y) 可以是任意的损失。

类别均衡Focal Loss

使用一个特别设计的损失来处理类别不均衡的数据集
原始版本的focal loss有一个α平衡变量。这里，我们将使用每个类的有效样本数对其重新加权。

类似地，这样一个重新加权的项也可以应用于其他著名的损失(sigmod -cross-entropy, softmax-cross-entropy等)。

实现

在开始实现之前，需要注意的一点是，在使用基于sigmoid的损失进行训练时，使用b=-log(C-1)初始化最后一层的偏差，其中C是类的数量，而不是0。这是因为设置b=0会在训练开始时造成巨大的损失，因为每个类的输出概率接近0.5。因此，我们可以假设先验类是1/C，并相应地设置b的值。

## 评估指标

为了避免对模型的误判，避免使用Accuracy，可以用confusion matrix，precision，recall，f1-score，AUC，ROC等指标

惩罚项
- 对少数样本预测错误增大惩罚，是一个比较直接的方式。

使用多种算法
- 模型融合不止能提升效果，也能解决样本不均的问题，经验上，树模型对样本不均的解决帮助很大，特别是随机森林，Random Forest，XGB，LGB等。因为树模型作用方式类似于if/else，所以迫使模型对少数样本也非常重视。

正确使用K-fold
- 当我们对样本过采样时，对过采样的样本使用k-fold，那么模型会过拟合我们过采样的样本，所以交叉验证要在过采样前做。在过采样过程中，应当增加些随机性，避免过拟合。

## 实验

**实验结果**
 
| 方法 | recall | precision | F1 |
|---|---|---|---|
|albert+textcnn | 83.7 | 96.0 | 89.4 |
| albert+textcnn（weight BCE）| 80.3| 95.1| 87.1 |
| albert+textcnn（Focal loss）| 85.6 | 94.8| 90.2|
| albert+textcnn（Dice loss）| 84.5| 95.5| 90.1|
| albert+textcnn（DSC loss）| 84.9| 96.2| 90.5|
 
Focal loss模型还未train至收敛，收敛后的结果之后进行更新

此外，本表格会持续收录并验证一些最新的论文的从loss的角度来解决长尾问题的方案
 
*   **结论**
- 1）**加权交叉熵**：理论上完全能够取得精度的提升。但是实际操作起来却很难。需要很丰富的实际经验，尤其是对于我们这种类别很多的任务时。过于加大尾部类别的权重反而会起到反作用。所以，如何确定每个类别的权重成为该方法的瓶颈。
- 2) **Focal loss**:  在超参数设置得当的情况下能够提升召回率而精确度不会出现很大的下降。但是不同的数据集，超参数的设置需要进行多次实验才能得到最合适的设置。另外需要注意的是，focal loss最好与交叉熵loss一起使用，并且对两个loss需要设置合适的权重，不然单独使用focal loss容易将所有类的预测概率都推向1。此外加入了focal loss之后，模型需要更长的训练epoch才能收敛。
- 3）Dice loss/DSC loss: 与focal loss一样，与交叉熵loss一起使用效果更好。当然，两个loss的权重就需要实验寻找。


# 如何处理机器学习中的不平衡类别

不平衡类别使得“准确率”失去意义。这是机器学习 (特别是在分类)中一个令人惊讶的常见问题，出现于每个类别的观测样本不成比例的数据集中。

普通的准确率不再能够可靠地度量性能，这使得模型训练变得更加困难。

不平衡类别出现在多个领域，包括：

- 欺诈检测
- 垃圾邮件过滤
- 疾病筛查
- SaaS 客户流失
- 广告点击率

在本指南中，我们将探讨 5 种处理不平衡类别的有效方法。

![How to Handle Imbalanced Classes in Machine Learning](https://elitedatascience.com/wp-content/uploads/2017/06/imbalanced-classes-feature-with-text.jpg)


## 直观的例子：疾病筛查案例

> 一家研究医院要求你基于病人的生物输入来训练一个疾病检测模型。

- 机器学习新手小明，通过简单的特征工程后，划分数据集为训练集和测试集（4：1），开始兴冲冲的调试各种分类模型，LR、SVM、xgboost等，挨个实验，发现效果都不错，准确率高达99.9%了！
- 嗯，才不到一天时间呢，瞬间成就感爆棚，感觉可以整理成论文发表了，走上人生巅峰。
- 可是刚部署到线上时，发现所有病人都被判定为“没病”，几乎100%，大家都很开心，出了一个漏诊的病人埋怨没有即时发现病情而耽误治疗。
- 小明盯着绿色的99.9%，欣喜之余，不禁陷入了沉思：怎么会这么高？作为负责任的研发，小明仔细测试了模型，惊恐的发现：所有样本都被判为负例，都没病！

但这里有陷阱... 疾病非常罕见；筛查的病人中只有 8% 的患病率。

现在，在你开始之前，你觉得问题可能会怎样发展呢？想象一下，如果你根本没有去训练一个模型。相反，如果你只写一行代码，总是预测“没有疾病”，那会如何呢？

一个拙劣但准确的解决方案

```python
def disease_screen(patient_data):
    # 忽略 patient_data
    return 'No Disease.'
```

很好，猜猜看？你的“解决方案”应该有 92% 的准确率！

不幸的是，以上准确率具有误导性。

- 对于未患该病的病人，你的准确率是 100% 。
- 对于已患该病的病人，你的准确率是 0%。
- 你的总体准确率非常高，因为大多数患者并没有患该病 (不是因为你的模型训练的好)。

这显然是一个问题，因为设计的许多机器学习算法是为了最大限度的提高整体准确率。本指南的其余部分将说明处理不平衡类别的不同策略。

## 我们开始之前的重要提示：

首先，请注意，我们不会分离出一个独立的测试集，调整超参数或者实现交叉检验。换句话说，我们不打算遵循最佳做法 (在我们的[7 天速成课程](http://elitedatascience.com/)中有介绍)。

相反，本教程只专注于解决不平衡类别问题。

此外，并非以下每种技术都会适用于每一个问题。不过通常来说，这些技术中至少有一个能够解决问题。

## Balance Scale 数据集

对于本指南，我们将会使用一个叫做 Balance Scale 数据的合成数据集，你可以从[这里](http://archive.ics.uci.edu/ml/datasets/balance+scale) UCI 机器学习仓库下载。

这个数据集最初被生成用于模拟心理实验结果，但是对于我们非常有用，因为它的规模便于处理并且包含不平衡类别

导入第三方依赖库并读取数据
```python
import pandas as pd
import numpy as np

# 读取数据集
df = pd.read_csv('balance-scale.data', names=['balance', 'var1', 'var2', 'var3', 'var4'])
# 显示示例观测样本
df.head()
```

![Balance Scale Dataset](https://elitedatascience.com/wp-content/uploads/2017/06/balance-scale-dataset-head.png)

基于两臂的重量和距离，该数据集包含了天平是否平衡的信息。

- 其中包含 1 个我们标记的目标变量
      balance .
- 其中包含 4 个我们标记的输入特征
      var1  到
      var4 .

![Image Scale Data](https://elitedatascience.com/wp-content/uploads/2017/06/balance-scale-data.png)

目标变量有三个类别。

- **R** 表示右边重,，当
      var3*var4>var1*var2
- **L** 表示左边重，当
      var3*var4<var1*var2
- **B** 表示平衡，当
      var3*var4=var1*var2

每个类别的数量

```python
df['balance'].value_counts()
# R    288
# L    288
# B     49
# Name: balance, dtype: int64
```

然而，对于本教程， 我们将把本问题转化为 **二值分类** 问题。

我们将把天平平衡时的每个观测样本标记为 **1** (正向类别)，否则标记为 **0** (负向类别)：

转变成二值分类

```python
# 转换为二值分类
df['balance'] = [1 if b=='B' else 0 for b in df.balance]

df['balance'].value_counts()
# 0    576
# 1     49
# Name: balance, dtype: int64
# About 8% were balanced
```

正如你所看到的，只有大约 8% 的观察样本是平衡的。 因此，如果我们的预测结果总为 **0**，我们就会得到 92% 的准确率。

## 不平衡类别的风险

现在我们有一个数据集，我们可以真正地展示不平衡类别的风险。

首先，让我们从 [Scikit-Learn](http://scikit-learn.org/stable/) 导入逻辑回归算法和准确度度量模块。

导入算法和准确度度量模块

```python
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score
```

接着，我们将会使用默认设置来生成一个简单的模型。

在不平衡数据上训练一个模型

```python
# 分离输入特征 (X) 和目标变量 (y)
y = df.balance
X = df.drop('balance', axis=1)

# 训练模型
clf_0 = LogisticRegression().fit(X, y)

# 在训练集上预测
pred_y_0 = clf_0.predict(X)
```

如上所述，许多机器学习算法被设计为在默认情况下最大化总体准确率。

我们可以证实这一点：

```python
# 准确率是怎样的?
print( accuracy_score(pred_y_0, y) )
# 0.9216
```

因此我们的模型拥有 92% 的总体准确率，但是这是因为它只预测了一个类别吗？

```python
# 我们应该兴奋吗?
print( np.unique( pred_y_0 ) )
# [0]
```

正如你所看到的，这个模型仅能预测 **0**，这就意味着它完全忽视了少数类别而偏爱多数类别。

接着，我们将会看到第一个处理不平衡类别的技术：上采样少数类别。

## 1. 上采样少数类别

上采样是从少数类别中随机复制观测样本以增强其信号的过程。

达到这个目的有几种试探法，但是最常见的方法是使用简单的放回抽样的方式重采样。

首先，我们将从 Scikit-Learn 中导入重采样模块：

重采样模块

```python
from sklearn.utils import resample
```

接着，我们将会使用一个上采样过的少数类别创建一个新的 DataFrame。 下面是详细步骤：

1. 首先，我们将每个类别的观测样本分离到不同的 DataFrame 中。
2. 接着，我们将采用**放回抽样**的方式对少数类别重采样，让样本的数量与多数类别数量相当。
3. 最后，我们将上采样后的少数类别 DataFrame 与原始的多数类别 DataFrame 合并。

以下是代码：

上采样少数类别

```python
#  分离多数和少数类别
df_majority = df[df.balance==0]
df_minority = df[df.balance==1]

# 上采样少数类别
df_minority_upsampled = resample(df_minority,
                                 replace=True,     # sample with replacement
                                 n_samples=576,    # to match majority class
                                 random_state=123) # reproducible results

# 合并多数类别同上采样过的少数类别
df_upsampled = pd.concat([df_majority, df_minority_upsampled])

# 显示新的类别数量
df_upsampled.balance.value_counts()
# 1    576
# 0    576
# Name: balance, dtype: int64
```

正如你所看到的，新生成的 DataFrame 比原来拥有更多的观测样本，现在两个类别的比率为 1:1。

让我们使用逻辑回归训练另一个模型，这次我们在平衡数据集上进行：

在上采样后的数据集上训练模型

```python
# 分离输入特征 (X) 和目标变量 (y)
y = df_upsampled.balance
X = df_upsampled.drop('balance', axis=1)

# 训练模型
clf_1 = LogisticRegression().fit(X, y)

# 在训练集上预测
pred_y_1 = clf_1.predict(X)

# 我们的模型仍旧预测仅仅一个类别吗？
print( np.unique( pred_y_1 ) )
# [0 1]

# 我们的准确率如何？
print( accuracy_score(y, pred_y_1) )
# 0.513888888889
```

非常好，现在这个模型不再只是预测一个类别了。虽然准确率急转直下，但现在的性能指标更有意义。

## 2. 下采样多数类别

下采样包括从多数类别中随机地移除观测样本，以防止它的信息主导学习算法。

其中最常见的试探法是不放回抽样式重采样。

这个过程同上采样极为相似。下面是详细步骤：

1. 首先，我们将每个类别的观测样本分离到不同的 DataFrame 中。
2. 接着，我们将采用**不放回抽样**来重采样多数类别，让样本的数量与少数类别数量相当。
3. 最后，我们将下采样后的多数类别 DataFrame 与原始的少数类别 DataFrame 合并。

以下为代码：

下采样多数类别

```python
# 分离多数类别和少数类别
df_majority = df[df.balance==0]
df_minority = df[df.balance==1]

# 下采样多数类别
df_majority_downsampled = resample(df_majority,
                                 replace=False,    # sample without replacement
                                 n_samples=49,     # to match minority class
                                 random_state=123) # reproducible results

# Combine minority class with downsampled majority class
df_downsampled = pd.concat([df_majority_downsampled, df_minority])

# Display new class counts
df_downsampled.balance.value_counts()
# 1    49
# 0    49
# Name: balance, dtype: int64
```

这次，新生成的 DataFrame 比原始数据拥有更少的观察样本，现在两个类别的比率为 1:1。

让我们再一次使用逻辑回归训练一个模型：

在下采样后的数据集上训练模型

```python
# Separate input features (X) and target variable (y)
y = df_downsampled.balance
X = df_downsampled.drop('balance', axis=1)

# Train model
clf_2 = LogisticRegression().fit(X, y)

# Predict on training set
pred_y_2 = clf_2.predict(X)

# Is our model still predicting just one class?
print( np.unique( pred_y_2 ) )
# [0 1]

# How's our accuracy?
print( accuracy_score(y, pred_y_2) )
# 0.581632653061
```

模型不再仅预测一个类别，并且其准确率似乎有所提高。

我们还希望在一个未见过的测试数据集上验证模型时， 能看到更令人鼓舞的结果。

## 3. 改变你的性能指标

目前，我们已经看到通过重采样数据集来解决不平衡类别的问题的两种方法。接着，我们将考虑使用其他性能指标来评估模型。

阿尔伯特•爱因斯坦曾经说过，“如果你根据能不能爬树来判断一条鱼的能力，那你一生都会认为它是愚蠢的。”，这句话真正突出了选择正确评估指标的重要性。

对于分类的通用指标，我们推荐使用 **ROC 曲线下面积** (AUROC)。

- 本指南中我们不做详细介绍，但是你可以在[这里](https://stats.stackexchange.com/questions/132777/what-does-auc-stand-for-and-what-is-it)阅读更多关于它的信息。
- 直观地说，AUROC 表示从中类别中区别观测样本的可能性。
- 换句话说，如果你从每个类别中随机选择一个观察样本，它将被正确的“分类”的概率是多大？

我们可以从 Scikit-Learn 中导入这个指标：

ROC 曲线下面积

```python
from sklearn.metrics import roc_auc_score
```

为了计算 AUROC，你将需要预测类别的概率，而非仅预测类别。你可以使用如下代码获取这些结果
      .predict_proba() ** ** function like so:

获取类别概率

```python
# Predict class probabilities
prob_y_2 = clf_2.predict_proba(X)

# Keep only the positive class
prob_y_2 = [p[1] for p in prob_y_2]

prob_y_2[:5] # Example
# [0.45419197226479618,
#  0.48205962213283882,
#  0.46862327066392456,
#  0.47868378832689096,
#  0.58143856820159667]
```

那么在 AUROC 下 这个模型 (在下采样数据集上训练模型) 效果如何？

下采样后数据集上训练的模型的 AUROC
Python

```python
print( roc_auc_score(y, prob_y_2) )
# 0.568096626406
```

不错... 这和在不平衡数据集上训练的原始模型相比，又如何呢？

不平衡数据集上训练的模型的 AUROC

```python
prob_y_0 = clf_0.predict_proba(X)
prob_y_0 = [p[1] for p in prob_y_0]

print( roc_auc_score(y, prob_y_0) )
# 0.530718537415
```

记住，我们在不平衡数据集上训练的原始模型拥有 92% 的准确率，它远高于下采样数据集上训练的模型的 58% 准确率。

然而，后者模型的 AUROC 为 57%，它稍高于 AUROC  为 53% 原始模型的 (并非远高于)。

**注意：** 如果 AUROC 的值为 0.47，这仅仅意味着你需要翻转预测，因为 Scikit-Learn 误解释了正向类别。 AUROC 应该 >= 0.5。

## 4. 惩罚算法 (代价敏感学习)

接下来的策略是使用惩罚学习算法来增加对少数类别分类错误的代价。

对于这种技术，一个流行的算法是惩罚性-SVM：

支持向量机

```python
from sklearn.svm import SVC
```

训练时，我们可以使用参数
      class_weight='balanced' 来减少由于少数类别样本比例不足造成的预测错误。

我们也可以包含参数
      probability=True  ，如果我们想启用 SVM 算法的概率估计。
让我们在原始的不平衡数据集上使用惩罚性的 SVM 训练模型：

SVM 在不平衡数据集上训练惩罚性-SVM

```python
# 分离输入特征 (X) 和目标变量 (y)
y = df.balance
X = df.drop('balance', axis=1)

# 训练模型
clf_3 = SVC(kernel='linear',
            class_weight='balanced', # penalize
            probability=True)

clf_3.fit(X, y)

# 在训练集上预测
pred_y_3 = clf_3.predict(X)

# Is our model still predicting just one class?
print( np.unique( pred_y_3 ) )
# [0 1]

# How's our accuracy?
print( accuracy_score(y, pred_y_3) )
# 0.688

# What about AUROC?
prob_y_3 = clf_3.predict_proba(X)
prob_y_3 = [p[1] for p in prob_y_3]
print( roc_auc_score(y, prob_y_3) )
# 0.5305236678
```

再说，这里我们的目的只是为了说明这种技术。真正决定哪种策略最适合*这个问题*，你需要在保留测试集上评估模型。

## 5. 使用基于树的算法

最后一个策略我们将考虑使用基于树的算法。决策树通常在不平衡数据集上表现良好，因为它们的层级结构允许它们从两个类别去学习。

在现代应用机器学习中，树集合(随机森林、梯度提升树等) 几乎总是优于单一决策树，所以我们将跳过单一决策树直接使用树集合模型：

随机森林

```python
from sklearn.ensemble import RandomForestClassifier
```

现在，让我们在原始的不平衡数据集上使用随机森林训练一个模型。

在不平衡数据集上训练随机森林

```python
# 分离输入特征 (X) 和目标变量 (y)
y = df.balance
X = df.drop('balance', axis=1)

# 训练模型
clf_4 = RandomForestClassifier()
clf_4.fit(X, y)

# 在训练集上进行预测
pred_y_4 = clf_4.predict(X)

# 我们的模型仍然仅能预测一个类别吗?
print( np.unique( pred_y_4 ) )
# [0 1]

# 我们的准确率如何?
print( accuracy_score(y, pred_y_4) )
# 0.9744

# AUROC 怎么样?
prob_y_4 = clf_4.predict_proba(X)
prob_y_4 = [p[1] for p in prob_y_4]
print( roc_auc_score(y, prob_y_4) )
# 0.999078798186
```

哇! 97% 的准确率和接近 100% AUROC 是魔法吗？戏法？作弊？是真的吗？

嗯，树集合已经非常受欢迎，因为他们在许多现实世界的问题上表现的非常良好。我们当然全心全意地推荐他们。

**然而：**

虽然这些结果令人激动，但是模型*可能*导致过拟合，因此你在做出最终决策之前仍旧需要在未见过的测试集上评估模型。

**注意: 由于算法的随机性，你的结果可能略有不同。为了能够复现试验结果，你可以设置一个随机种子。**

## 顺便提一下

有些策略没有写入本教程：

#### 创建合成样本 (数据增强)

创建合成样本与上采样非常相似， 一些人将它们归为一类。例如， [SMOTE 算法](https://www.jair.org/media/953/live-953-2037-jair.pdf) 是一种从少数类别中重采样的方法，会轻微的引入噪声，来创建”新“样本。

你可以在 [imblearn 库](http://contrib.scikit-learn.org/imbalanced-learn/generated/imblearn.over_sampling.SMOTE.html) 中 找到 SMOTE 的一种实现

**注意：我们的读者之一，马可，提出了一个很好的观点：仅使用 SMOTE 而不适当的使用交叉验证所造成的风险。查看评论部分了解更多详情或阅读他的关于本主题的 [博客文章](http://www.marcoaltini.com/blog/dealing-with-imbalanced-data-undersampling-oversampling-and-proper-cross-validation) 。**

#### 组合少数类别

组合少数类别的目标变量可能适用于某些多类别问题。

例如，假如你希望预测信用卡欺诈行为。在你的数据集中，每种欺诈方式可能会分别标注，但你可能并不关心区分他们。你可以将它们组合到单一类别“欺诈”中并把此问题归为二值分类问题。

#### 重构欺诈检测

异常检测， 又称为离群点检测，是为了[检测异常点(或离群点)和小概率事件](https://en.wikipedia.org/wiki/Anomaly_detection)。不是创建一个分类模型，你会有一个正常观测样本的 ”轮廓“。如果一个新观测样本偏离 “正常轮廓” 太远，那么它就会被标注为一个异常点。

## 总结 & 下一步

在本指南中，我们介绍了 5 种处理不平衡类别的有效方法：

1. 上采样 少数类别
2. 下采样 多数类别
3. 改变你的性能指标
4. 惩罚算法 (代价敏感学习)
5. 使用基于树的算法

这些策略受[没有免费的午餐定理](http://elitedatascience.com/machine-learning-algorithms)支配，你应该尝试使用其中几种方法，并根据测试集的结果来决定你的问题的最佳解决方案。

【2019-04-25】Google colab上的[代码实现](https://colab.research.google.com/drive/1Wv9NaOKrQCQbahFDM_I-ML2Lp6BqURxx#scrollTo=AqjCU2X74RUF)


