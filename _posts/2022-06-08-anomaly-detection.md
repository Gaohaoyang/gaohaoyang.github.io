---
layout: post
title:  "异常检测-anomaly-detection"
date:   2022-06-08 20:57:00
categories: 机器学习
tags: 异常检测 风控
excerpt: 异常检测方法总结
author: 鹤啸九天
mathjax: true
permalink: /anomaly
---

* content
{:toc}

# 总结

- 【2022-6-8】[异常检测方法总结](https://zhuanlan.zhihu.com/p/521329756)


# 异常检测


## 应用场景

`异常检测`（Anomaly Detection或Outlier Detection）指的是通过数据挖掘手段识别数据中的“**异常点**”，常见的使用案例包括风控领域（如识别信用卡诈骗），网络通信领域发现异常信息流，或机械加工领域识别未达标的产品等。
- 金融领域：从金融数据中识别”欺诈案例“，如识别信用卡申请欺诈、虚假信贷等；
- 网络安全：从流量数据中找出”入侵者“，并识别新的网络入侵模式；
- 电商领域：从交易数据中识别”恶意买家“，如羊毛党、恶意刷屏团伙；
- 生态灾难预警：基于对风速、降雨量、气温等指标的预测，判断未来可能出现的极端天气；
- 工业界：可通过异常检测手段进行工业产品的瑕疵检测，代替人眼进行测量和判断。

除此之外，还有很多行业都在使用异常检测技术来帮助企业降低风险，并为业务提供指导建议。


## 方法分类

一般可以从以下四个角度作区分：
- 时序相关 VS 时序独立
- 全局检测 VS 局部检测
- 输出形式：标签 VS 异常分数
- 根据不同的模型特征

### 时序相关 VS 时序独立

首先可以根据该场景的异常是否与**时间**维度相关。
- 在时序相关问题中，我们假设异常的发生与时间的变化相关，比如一个人平时的信用卡消费约为每月5000元，但11月的消费达到了10000元，那这种异常的出现就明显与时间维度相关，可能是因为”万恶“的双十一。
- 而在时序独立问题中，我们假设时间的变化对异常是否发生是无影响的，在后续的分析建模中，也就不会代入时间维度。

### 全局检测 VS 局部检测

- 在全局检测方法中，针对每个点进行检测时，是以其余全部点作为参考对象的，其基本假设是正常点的分布很集中，而异常点分布在离集中区域较远的地方。
  - 这类方法缺点：在针对每个点进行检测时，其他的异常点也在参考集内，这可能会导致结果可能存在一定偏差。
- 而局部检测方法仅以部分点组成的**子集**作为参考对象，基于的假设是，正常点中可能存在**多种不同模式**，与这些模式均不同的少数点为异常点。
  - 该类方法在使用过程中的缺点是，参考子集的选取比较困难。

### 输出形式：标签 VS 异常分数

这种分类方式是根据模型的输出形式，即直接输出**标签**还是**异常分数**。
- 输出标签的方法比较简单直观，可以直接根据模型输出的结果判断每个点是否为异常点。
- 使用可以输出异常得分的模型，可以进一步看哪些点的异常程度更高，也可以根据需要设定阈值，比如设定百分比，找出异常程度排在前10%的异常点。

### 根据不同的模型特征

最后，还可以根据模型本身的特点进行分类，大致可以分为以下几种：
- 统计检验方法
- 基于深度的方法
- 基于偏差的方法
- 基于距离的方法
- 基于密度的方法
- 深度学习方法

如今用于异常检测的算法已经非常多了，但万变不离其宗，无论优化到什么程度，它们都是由一些原始的模型和思想衍生出来的。

### 数据挖掘

从数据挖掘算法角度看，常见的算法可以被粗略归类为：
- 概率与极值分析（假设数据分布并找到超过中心特定范围的数据）
- 线性模型（如PCA计算重构误差或者分析协方差矩阵的）
- 相似度模型（如ABOD，LOF、LOCI、LoOP和kNN等）
- 决策树集成（Isolation Forest、Feature Bagging）
- 基于SVM的方法如One-class SVM
- 基于神经网络的算法（用auto-encoder计算重构误差）等各种算法。

### 样本角度

目前比较公认的分类方式是分为三种：
- （1）`单点异常`（Global Outliers）：也可以称为**全局异常**，即某个点与全局大多数点都不一样，那么这个点构成了单点异常。
  - 例如，和三只小黄人相比，海绵宝宝的混入就可以算作是单点异常。
  - <img src="https://picx.zhimg.com/50/v2-7c39422478a01528dda6d48b6e8f77db_720w.jpg?source=1940ef5c" data-caption="" data-size="normal" data-rawwidth="720" data-rawheight="194" class="origin_image zh-lightbox-thumb" width="720" data-original="https://picx.zhimg.com/v2-7c39422478a01528dda6d48b6e8f77db_r.jpg?source=1940ef5c"/>
  - →_→ 最右边这只看起来不太一样！
- （2）`上下文异常`（Contextual Outliers）：这类异常多为**时间序列**数据中的异常，即某个时间点的表现与前后时间段内存在较大的差异，那么该异常为一个上下文异常点。
  - 例如，在某个温带城市夏天的气温时序数据中，其中有一天温度为10℃，而前后的气温都在25-35℃的范围，那么这一天的气温就可以说是一个上下文异常。
- （3）`集体异常`（Collective Outliers）：这类异常是由多个对象组合构成的，即单独看某个个体可能并不存在异常，但这些个体同时出现，则构成了一种异常。
  - 集体异常可能存在多种组成方式，可能是由若干个单点组成的，也可能由几个序列组成。
  - 某小区某天有一户人家搬家了，这是一件很正常的事，但如果同一天有10户同时搬家了，那就构成了集体异常，显然这不是一个正常小区会时常发生的事情

一些常见的异常检测方法
-  ![](https://pic3.zhimg.com/80/v2-8d7aafacc594570b545ad68c8363309e_1440w.jpg)

## 异常检测难点

异常检测中经常遇到哪些困难？
1. 在大多数实际的场景中，数据本身是**没有标签**的，也存在一些数据集有标签，但标签的可信度非常低，导致放入模型后效果很差，这就导致我们无法直接使用一些成熟的有监督学习方法。
2. 常常存在**噪音**和异常点混杂在一起的情况，难以区分。
3. 在一些欺诈检测的场景中，**多种诈骗数据**都混在一起，很难区分不同类型的诈骗，因为不了解每种诈骗的具体定义。由于没有准确的标签，也没有对具体诈骗类型的理解，就导致陷入**鸡生蛋** or **蛋生鸡**的循环之中。
  - 目前比较常用的手段是，将**无监督学习**方法和**专家经验**相结合，基于无监督学习得到检测结果，并让领域专家基于检测结果给出反馈，以便于我们及时调整模型，反复进行迭代，最终得到一个越来越准确的模型。
  - 到这里，我们都发现了，在风控场景中最重要的一环就是：**专家经验**。


## 一、基于分布的方法

基本假设：
- 正常的数据是遵循**特定分布形式**的，并且占了很大比例，而异常点的位置和正常点相比存在比较大的偏移。

【2022-8-30】[常见的异常检测算法有哪些](https://www.zhihu.com/question/280696035/answer/2504261484)

### 1. 3sigma  

- 比如**高斯分布**，在平均值加减3倍标准差以外的部分仅占了0.2%左右的比例，一般把这部分数据就标记为**异常数据**。
- ![](https://picx.zhimg.com/80/v2-75ace636aa2c4973914fdb58830d35f9_1440w.jpg?source=1940ef5c)

基于**正态分布**，3sigma准则认为超过3sigma的数据为异常点。
- ![](https://pic2.zhimg.com/80/v2-14486846ac19f0ca6624313e1a1966c9_1440w.jpg)

问题
- 均值和方差本身都对异常值很敏感，因此如果数据本身不具备**正态性**，就不适合使用这种检测方法。
 
```python
def three_sigma(s):
  mu, std = np.mean(s), np.std(s)
  lower, upper = mu-3*std, mu+3*std
  return lower, upper
```

### 2. Z-score
 
Z-score为**标准分数**，测量数据点和平均值的距离
- 若A与平均值相差2个标准差，Z-score为2。
- 当把 Z-score=3 作为阈值去剔除异常点时，便相当于3sigma。

```python
def z_score(s):
	z_score = (s - np.mean(s)) / np.std(s)
	return z_score
```

### 3. boxplot
 
箱线图时基于四分位距（IQR）找异常点的。
- ![](https://pic3.zhimg.com/80/v2-e3a39464798c03fc2915641da0b29c42_1440w.jpg)
- 图2: boxplot
 
```python
def boxplot(s):
  q1, q3 = s.quantile(.25), s.quantile(.75)
  iqr = q3 - q1
  lower, upper = q1 - 1.5*iqr, q3 + 1.5*iqr
  return lower, upper
```
 
### 4. Grubbs假设检验
 
资料来源：
- [1] 时序预测竞赛之异常检测算法综述 - 鱼遇雨欲语与余，知乎：[https://zhuanlan.zhihu.com/p/336944097](https://zhuanlan.zhihu.com/p/336944097)
- [2] 剔除异常值栅格计算器_数据分析师所需的统计学：异常检测 - weixin_39974030，CSDN：[https://blog.csdn.net/weixin_39974030/article/details/112569610](https://blog.csdn.net/weixin_39974030/article/details/112569610)
 
Grubbs’Test 为一种**假设检验**的方法，常被用来检验服从**正态分布**的**单变量**数据集（univariate data set）Y中的单个异常值。若有异常值，则其必为数据集中的最大值或最小值。原假设与备择假设如下：
- ● H0: 数据集中没有异常值
- ● H1: 数据集中有一个异常值

使用Grubbs测试需要总体是正态分布的。

算法流程：
1. 样本从小到大排序
2. 求样本的mean和dev
3. 计算min/max与mean的差距，更大的那个为可疑值
4. 求可疑值的z-score (standard score)，如果大于Grubbs临界值，那么就是outlier

Grubbs临界值可以查表得到，它由两个值决定：检出水平α（越严格越小），样本数量n，排除outlier，对剩余序列循环做 1-4 步骤 [1]。详细计算样例可以参考。
 
```python
from outliers import smirnov_grubbs as grubbs
print(grubbs.test([8, 9, 10, 1, 9], alpha=0.05))
print(grubbs.min_test_outliers([8, 9, 10, 1, 9], alpha=0.05))
print(grubbs.max_test_outliers([8, 9, 10, 1, 9], alpha=0.05))
print(grubbs.max_test_indices([8, 9, 10, 50, 9], alpha=0.05))
```
 
局限：
- 1、只能检测**单维度**数据
- 2、无法精确的输出正常区间
- 3、它的判断机制是“逐一剔除”，所以每个异常值都要单独计算整个步骤，数据量大吃不消。
- 4、需假定数据服从正态分布或**近正态分布**

## 基于偏差的方法

- 一种比较简单的统计方法，最初是为**单维**异常检测设计的。
- 给定一个数据集后，对每个点进行检测，如果一个点自身的值与整个集合的指标存在过大的**偏差**，则该点为**异常点**。

具体的实现方法
- 定义一个指标 SF（Smooth Factor），含义是当把某个点从集合剔除后方差所降低的差值，通过设定一个阈值，与这些偏差值进行比较来确定哪些点存在异常。
- Arning 在1996年首次提出


## 二、基于距离的方法

计算每个点与周围点的距离，来判断一个点是不是存在异常。基于的假设是正常点的周围存在很多个近邻点，而异常点距离周围点的距离都比较远。

### DB模型

有一个比较古老的DB基础模型，是1997年被首次提出的，基本思想是：
- 给定一个半径 ε 和比例 π，假设对点 p 进行异常检测，若与 p 点的距离小于半径 ε 的点在所有点中的占比低于 π，则点 p 为异常点。比如下图中的 p1 和 p2 两个点，它们方圆 ε 的范围内没有点，就会被模型标记异常。
- <img src="https://pic1.zhimg.com/50/v2-13438cc4581a6a63311941c66e4346a8_720w.jpg?source=1940ef5c" data-caption="" data-size="normal" data-rawwidth="443" data-rawheight="226" class="origin_image zh-lightbox-thumb" width="443" data-original="https://picx.zhimg.com/v2-13438cc4581a6a63311941c66e4346a8_r.jpg?source=1940ef5c"/>

之后基于最初这个模型，又出现了基于嵌套循环、基于网格的距离模型，再之后就是熟知的 kNN、KMeans，都可以通过计算距离来做异常检测。
 
### 1. KNN
 
资料来源：
- [3] 异常检测算法之(KNN)-K Nearest Neighbors - 小伍哥聊风控，知乎：[https://zhuanlan.zhihu.com/p/501691799](https://zhuanlan.zhihu.com/p/501691799)
 
依次计算每个样本点与它最近的K个样本的平均距离，再利用计算的距离与阈值进行比较，如果大于阈值，则认为是异常点。优点是不需要假设数据的分布，缺点是仅可以找出全局异常点，无法找到局部异常点。
 
```python
from pyod.models.knn import KNN

# 初始化检测器clf
clf = KNN( method='mean', n_neighbors=3, )
clf.fit(X_train)
# 返回训练数据上的分类标签 (0: 正常值, 1: 异常值)
y_train_pred = clf.labels_
# 返回训练数据上的异常值 (分值越大越异常)
y_train_scores = clf.decision_scores_
```
 
## 三、基于密度的方法——距离方法改进

与基于距离的方法类似，该类方法是针对所研究的点，计算它的周围密度和其临近点的周围密度，基于这两个密度值计算出**相对密度**，作为异常分数。即相对密度越大，异常程度越高。

基于的假设
- **正常点**与其近邻点的密度是相**近**的，而**异常点**的密度和周围的点存在较大差异。

设计这种方法的动机
- 基于距离的异常检测方法不能很好地处理一些**密度**存在差异的数据集。
- 如下图中的数据点分布，如果使用基于距离的模型，半径和比例已经设定好了，点 o2 很容易被识别为异常点，因为右上的 C1 子集中很多点与周围点的距离要比 o2 还小，其中很多点就会被标为正常点。但如果从密度的角度来看，o2 更像是一个正常点。所以无论单从哪个角度看，我们都可能会忽略另一个维度上的特征，因此还是要根据具体场景和目标任务，以及数据集本身的特点来进行算法的选择，或是进行算法的结合。

 
### 1. Local Outlier Factor (LOF)
 
资料来源：
- [4] 一文读懂异常检测 LOF 算法（Python代码）- 东哥起飞，知乎：[https://zhuanlan.zhihu.com/p/448276009](https://zhuanlan.zhihu.com/p/448276009)
 
LOF是基于**密度**的经典算法（Breuning et. al. 2000），通过给每个数据点都分配一个依赖于邻域密度的**离群因子** LOF，进而判断该数据点是否为离群点。它的好处在于可以量化每个数据点的异常程度（outlierness）。
- ![](https://pic3.zhimg.com/80/v2-14240ecec78568cd855917c9d06dc506_1440w.jpg)
- 图3：LOF异常检测
 
数据点P的局部相对密度（局部异常因子）=点P邻域内点的平均局部可达密度 跟 数据点P的局部可达密度 的比值： 
- ![[公式]](https://www.zhihu.com/equation?tex=L+O+F_%7Bk%7D%28P%29%3D%5Cfrac%7B%5Csum_%7BO+%5Cni+N_%7Bk%7D%28P%29%7D+%5Cfrac%7B%5Coperatorname%7Blrd%7D%28O%29%7D%7B%5Coperatorname%7Blrd%7D%28P%29%7D%7D%7B%5Cleft%7CN_%7Bk%7D%28P%29%5Cright%7C%7D%3D%5Cfrac%7B%5Csum_%7BO+%5Cni+N_%7Bk%7D%28P%29%7D+%5Coperatorname%7Blrd%7D%28O%29%7D%7B%5Cleft%7CN_%7Bk%7D%28P%29%5Cright%7C%7D+%2F+%5Coperatorname%7Blrd%7D%28P%29)
 
数据点P的局部可达密度=P最近邻的平均可达距离的倒数。距离越大，密度越小。
- ![[公式]](https://www.zhihu.com/equation?tex=%5Coperatorname%7Blrd%7D_%7Bk%7D%28P%29%3D%5Cfrac%7B1%7D%7B%5Cfrac%7B%5Csum_%7BO+%5Cni+N_%7Bk%7D%28P%29%7D+%5Ctext+%7B+reach+%7D_%7Bd%7D+i+s+t_%7Bk%7D%28P%2C+O%29%7D%7B%5Cleft%7CN_%7Bk%7D%28P%29%5Cright%7C%7D%7D)
 
点P到点O的第k可达距离=max(点O的k近邻距离，点P到点O的距离)。  
- ![](https://pic3.zhimg.com/80/v2-16de60d6efdf60ea5ce46e5debeff3fa_1440w.jpg)
- 图4：可达距离
 
点O的k近邻距离=第 k个最近的点跟点O之间的距离。
 
整体来说，LOF算法流程如下：
- ● 对于每个数据点，计算它与其他所有点的距离，并按从近到远排序；
- ● 对于每个数据点，找到它的K-Nearest-Neighbor，计算LOF得分。
 
```python
from sklearn.neighbors import LocalOutlierFactor as LOF
 
X = [[-1.1], [0.2], [100.1], [0.3]]
clf = LOF(n_neighbors=2)
res = clf.fit_predict(X)
print(res)
print(clf.negative_outlier_factor_)
```

### 2. Connectivity-Based Outlier Factor (COF)
 
资料来源：
- [5] Nowak-Brzezińska, A., & Horyń, C. (2020). Outliers in rules-the comparision of LOF, COF and KMEANS algorithms. *Procedia Computer Science*, *176*, 1420-1429.
- [6] 機器學習_學習筆記系列(98)：基於連接異常因子分析(Connectivity-Based Outlier Factor) - 劉智皓 (Chih-Hao Liu)
 
COF是LOF的变种，相比于LOF，COF可以处理低密度下的异常值，COF的局部密度是基于平均链式距离计算得到。在一开始的时候我们一样会先计算出每个点的k-nearest neighbor。而接下来我们会计算每个点的Set based nearest Path，如下图：
- ![](https://pic2.zhimg.com/80/v2-8b660a9c368e2ad8e5518a723731be05_1440w.jpg)
- 图5：Set based nearest Path
 
假使我们今天我们的k=5，所以F的neighbor为B、C、D、E、G。而对于F离他最近的点为E，所以SBN Path的第一个元素是F、第二个是E。离E最近的点为D所以第三个元素为D，接下来离D最近的点为C和G，所以第四和五个元素为C和G，最后离C最近的点为B，第六个元素为B。所以整个流程下来，F的SBN Path为{F, E, D, C, G, C, B}。而对于SBN Path所对应的距离e={e1, e2, e3,…,ek}，依照上面的例子e={3,2,1,1,1}。
- ![[公式]](https://www.zhihu.com/equation?tex=%5Coperatorname%7Ba+c_%7B-%7D%7D+%5Coperatorname%7Bdist%7D%28p%29%3D%5Csum_%7Bi%3D1%7D%5E%7Bk%7D+%5Cfrac%7B2%28k%2B1-i%29%7D%7Bk%28k%2B1%29%7D+%5Coperatorname%7Bdist%7D%5Cleft%28e_%7Bi%7D%5Cright%29)
 
所以我们可以说假使我们想计算p点的SBN Path，我们只要直接计算p点和其neighbor所有点所构成的graph的minimum spanning tree，之后我们再以p点为起点执行shortest path算法，就可以得到我们的SBN Path。
- ![[公式]](https://www.zhihu.com/equation?tex=%5Coperatorname%7BCOF%7D%28p%29%3D%5Cfrac%7Ba+c_%7B-%7D+%5Coperatorname%7Bdist%7D%28p%29%7D%7B%5Cfrac%7B1%7D%7Bk%7D+%5Csum_%7Bo+%5Cin+N_%7Bk%7D%28p%29%7D+a+c_%7B-%7D+%5Coperatorname%7Bdist%7D%28o%29%7D)
 
而接下来我们有了SBN Path我们就会接着计算，p点的链式距离： 有了ac_distance后，我们就可以计算COF：  
 
```python
# https://zhuanlan.zhihu.com/p/362358580
from pyod.models.cof import COF
cof = COF(contamination = 0.06,  ## 异常值所占的比例
          n_neighbors = 20,      ## 近邻数量
        )
cof_label = cof.fit_predict(iris.values) # 鸢尾花数据
print("检测出的异常值数量为:",np.sum(cof_label == 1))
```

### 3. Stochastic Outlier Selection (SOS)
 
资料来源：
- [7] 异常检测之SOS算法 - 呼广跃，知乎：[https://zhuanlan.zhihu.com/p/34438518](https://zhuanlan.zhihu.com/p/34438518)
 
将特征矩阵（feature martrix）或者相异度矩阵（dissimilarity matrix）输入给SOS算法，会返回一个异常概率值向量（每个点对应一个）。SOS的思想是：当一个点和其它所有点的关联度（affinity）都很小的时候，它就是一个异常点。
- ![](https://pic4.zhimg.com/80/v2-7f662bdc1f9b896747b0fb20bda3e77f_1440w.jpg)
- 图6：SOS计算流程
 
SOS的流程：
1. 计算相异度矩阵D；
2. 计算关联度矩阵A；
3. 计算关联概率矩阵B；
4. 算出异常概率向量。
 
相异度矩阵D是各样本两两之间的度量距离，比如欧式距离或汉明距离等。关联度矩阵反映的是度量距离方差，如图7，点 的密度最大，方差最小； 的密度最小，方差最大。而关联概率矩阵B(binding probability matrix)就是把关联矩阵(affinity matrix)按行归一化得到的，如图8所示。
- ![](https://pic4.zhimg.com/80/v2-758091a16961f80e874b0afcd89fdfe7_1440w.jpg)
- 图7：关联度矩阵中密度可视化
 
- ![](https://pic3.zhimg.com/80/v2-47e22d71310ccd582f44691c956d4c06_1440w.jpg)
- 图8：关联概率矩阵
 
得到了binding probability matrix，每个点的异常概率值就用如下的公式计算，当一个点和其它所有点的关联度（affinity）都很小的时候，它就是一个异常点。
- ![[公式]](https://www.zhihu.com/equation?tex=p%5Cleft%28%5Cmathrm%7Bx%7D_%7Bi%7D+%5Cin+%5Cmathcal%7BC%7D_%7B0%7D%5Cright%29%3D%5Cprod_%7Bj+%5Cneq+i%7D%5Cleft%281-b_%7Bj+i%7D%5Cright%29)
 
```python
# Ref: https://github.com/jeroenjanssens/scikit-sos
import pandas as pd
from sksos import SOS
iris = pd.read_csv("http://bit.ly/iris-csv")
X = iris.drop("Name", axis=1).values
detector = SOS()
iris["score"] = detector.predict(X)
iris.sort_values("score", ascending=False).head(10)
```
 
## 四、基于聚类的方法
 
### 1. DBSCAN
 
DBSCAN算法（Density-Based Spatial Clustering of Applications with Noise）的输入和输出如下，对于无法形成聚类簇的孤立点，即为异常点（噪声点）。
- ● 输入：数据集，邻域半径Eps，邻域中数据对象数目阈值MinPts;
- ● 输出：密度联通簇。
- ![](https://pic1.zhimg.com/80/v2-cdf5f61bf1a338295d69c76dec506f88_1440w.jpg)
 
处理流程如下
 1. 从数据集中任意选取一个数据对象点p；
 2. 如果对于参数Eps和MinPts，所选取的数据对象点p为核心点，则找出所有从p密度可达的数据对象点，形成一个簇；
 3. 如果选取的数据对象点 p 是边缘点，选取另一个数据对象点；
 4. 重复以上2、3步，直到所有点被处理。
 
```python
# Ref: https://zhuanlan.zhihu.com/p/515268801
from sklearn.cluster import DBSCAN
import numpy as np
X = np.array([[1, 2], [2, 2], [2, 3],
              [8, 7], [8, 8], [25, 80]])
clustering = DBSCAN(eps=3, min_samples=2).fit(X)
 
clustering.labels_
array([ 0,  0,  0,  1,  1, -1])
# 0，,0，,0：表示前三个样本被分为了一个群
# 1, 1：中间两个被分为一个群
# -1：最后一个为异常点，不属于任何一个群
```
 
## 五、基于树的方法

### 基于深度的方法

基于深度的方法，即从点空间的边缘定位异常点，按照不同程度的需求，决定层数及异常点的个数。

如下图所示，圆中密密麻麻的黑点代表一个个数据点，基于的假设是
- 点空间中心这些分布比较集中、密度较高的点都是**正常点**
- 而异常点都位于外层，即分布比较稀疏的地方。

<img src="https://pica.zhimg.com/50/v2-356c247fc68acc7bf399060f24a3803e_720w.jpg?source=1940ef5c" data-caption="" data-size="normal" data-rawwidth="318" data-rawheight="298" class="content_image" width="318"/>

如下图，最外层点的深度为1，再往内几层深度一次为2、3、4…… 若我们设置阈值k=2，那么深度小于等于2的点就全部为异常点。这一方法最早由 Tukey 在1997年首次提出。

<img src="https://pica.zhimg.com/50/v2-2aa883b73fdb508059e819ef0a201bc8_720w.jpg?source=1940ef5c" data-caption="" data-size="normal" data-rawwidth="444" data-rawheight="246" class="origin_image zh-lightbox-thumb" width="444" data-original="https://pica.zhimg.com/v2-2aa883b73fdb508059e819ef0a201bc8_r.jpg?source=1940ef5c"/>

但这个基础模型仅适用于二维、三维空间。现在有很多流行的算法都借鉴了这种模型的思想，但通过改变计算深度的方式，已经可以实现高维空间的异常检测，如孤立森林算法。
 
### 1. Isolation Forest (iForest)

资料来源：
- [8] 异常检测算法 -- 孤立森林（Isolation Forest）剖析 - 风控大鱼，知乎：[https://zhuanlan.zhihu.com/p/74508141](https://zhuanlan.zhihu.com/p/74508141)
- [9] 孤立森林(isolation Forest)-一个通过瞎几把乱分进行异常检测的算法 - 小伍哥聊风控，知乎：[https://zhuanlan.zhihu.com/p/484495545](https://zhuanlan.zhihu.com/p/484495545)
- [10] 孤立森林阅读 - Mark_Aussie，博文：[https://blog.csdn.net/MarkAustralia/article/details/120181899](https://blog.csdn.net/MarkAustralia/article/details/120181899)
 
孤立森林中的 “孤立” (isolation) 指的是 “把异常点从所有样本中孤立出来”，论文中的原文是 “separating an instance from the rest of the instances”。  
 
我们用一个随机超平面对一个数据空间进行切割，切一次可以生成两个子空间。接下来，我们再继续随机选取超平面，来切割第一步得到的两个子空间，以此循环下去，直到每子空间里面只包含一个数据点为止。我们可以发现，那些密度很高的簇要被切很多次才会停止切割，即每个点都单独存在于一个子空间内，但那些分布稀疏的点，大都很早就停到一个子空间内了。所以，整个孤立森林的算法思想：异常样本更容易快速落入叶子结点或者说，异常样本在决策树上，距离根节点更近。
 
随机选择m个特征，通过在所选特征的最大值和最小值之间随机选择一个值来分割数据点。观察值的划分递归地重复，直到所有的观察值被孤立。
- ![](https://pic4.zhimg.com/80/v2-98d95cf187d7fd640511ca128ca7e457_1440w.jpg)
- 图10：孤立森林
 
获得 t 个孤立树后，单棵树的训练就结束了。接下来就可以用生成的孤立树来评估测试数据了，即计算异常分数 s。对于每个样本 x，需要对其综合计算每棵树的结果，通过下面的公式计算异常得分：
- ![[公式]](https://www.zhihu.com/equation?tex=s%28x%2C+n%29%3D2%5E%7B-%5Cfrac%7BE%28h%28x%29%29%7D%7Bc%28n%29%7D%7D)
 
- ● h(x)：为样本在iTree上的PathLength；
- ● E(h(x))：为样本在t棵iTree的PathLength的均值；
- ● c(n)：为n个样本构建一个二叉搜索树BST中的未成功搜索平均路径长度（均值h(x)对外部节点终端的估计等同于BST中的未成功搜索）。 是对样本x的路径长度h(x)进行标准化处理。H(n-1)是调和数，可使用ln(n-1)+0.5772156649（欧拉常数）估算。
- ![[公式]](https://www.zhihu.com/equation?tex=%5Cbegin%7Baligned%7Dc%28n%29+%26%3D2+H%28n-1%29-%5Cfrac%7B2%28n-1%29%7D%7Bn%7D+%5C%5C%26%3D2%5B%5Cln+%28n-1%29%2B0.5772156649%5D-%5Cfrac%7B2%28n-1%29%7D%7Bn%7D%5Cend%7Baligned%7D)
 
指数部分值域为(−∞,0)，因此s值域为(0,1)。当PathLength越小，s越接近1，此时样本为异常值的概率越大。
 
```python
# Ref：https://zhuanlan.zhihu.com/p/484495545
from sklearn.datasets import load_iris 
from sklearn.ensemble import IsolationForest
 
data = load_iris(as_frame=True) 
X,y = data.data,data.target 
df = data.frame 
 
# 模型训练
iforest = IsolationForest(n_estimators=100, max_samples='auto',  
                          contamination=0.05, max_features=4,  
                          bootstrap=False, n_jobs=-1, random_state=1)
 
 
#  fit_predict 函数 训练和预测一起 可以得到模型是否异常的判断，-1为异常，1为正常
df['label'] = iforest.fit_predict(X) 
 
# 预测 decision_function 可以得出 异常评分
df['scores'] = iforest.decision_function(X)
```
 
## 六、基于降维的方法
 
### 1. Principal Component Analysis (PCA)
 
资料来源：
- [11] 机器学习-异常检测算法（三）：Principal Component Analysis - 刘腾飞，知乎：[https://zhuanlan.zhihu.com/p/29091645](https://zhuanlan.zhihu.com/p/29091645)
- [12] Anomaly Detection异常检测--PCA算法的实现 - CC思SS，知乎：[https://zhuanlan.zhihu.com/p/48110105](https://zhuanlan.zhihu.com/p/48110105)
 
PCA在异常检测方面的做法，大体有两种思路：
- (1) 将数据映射到低维特征空间，然后在特征空间不同维度上查看每个数据点跟其它数据的偏差；
- (2) 将数据映射到低维特征空间，然后由低维特征空间重新映射回原空间，尝试用低维特征重构原始数据，看重构误差的大小。
 
PCA在做特征值分解，会得到：
- ● 特征向量：反应了原始数据方差变化程度的不同方向；
- ● 特征值：数据在对应方向上的方差大小。
 
所以，最大特征值对应的特征向量为数据方差最大的方向，最小特征值对应的特征向量为数据方差最小的方向。原始数据在不同方向上的方差变化反应了其内在特点。如果单个数据样本跟整体数据样本表现出的特点不太一致，比如在某些方向上跟其它数据样本偏离较大，可能就表示该数据样本是一个异常点。
 
在前面提到第一种做法中，样本$x_i$的异常分数为该样本在所有方向上的偏离程度：
- ![[公式]](https://www.zhihu.com/equation?tex=%5Coperatorname%7BScore%7D%5Cleft%28%5Cmathbf%7Bx%7D_%7B%5Cmathbf%7Bi%7D%7D%5Cright%29%3D%5Csum_%7Bj%3D1%7D%5E%7Bn%7D+d_%7Bi+j%7D%3D%5Csum_%7Bj%3D1%7D%5E%7Bn%7D+%5Cfrac%7B%5Cleft%28%5Cmathbf%7Bx%7D_%7B%5Cmathbf%7Bi%7D%7D%5E%7B%5Cmathbf%7BT%7D%7D+%5Ccdot+%5Cmathbf%7Be%7D_%7B%5Cmathbf%7Bj%7D%7D%5Cright%29%5E%7B%5Cmathbf%7B2%7D%7D%7D%7B%5Clambda_%7Bj%7D%7D)
 
其中， 为样本在重构空间里离特征向量的距离。若存在样本点偏离各主成分越远， 会越大，意味偏移程度大，异常分数高。 是特征值，用于归一化，使不同方向上的偏离程度具有可比性。
 
在计算异常分数时，关于特征向量（即度量异常用的标杆）选择又有两种方式：
- ● 考虑在前k个特征向量方向上的偏差：前k个特征向量往往直接对应原始数据里的某几个特征，在前几个特征向量方向上偏差比较大的数据样本，往往就是在原始数据中那几个特征上的极值点。
- ● 考虑后r个特征向量方向上的偏差：后r个特征向量通常表示某几个原始特征的线性组合，线性组合之后的方差比较小反应了这几个特征之间的某种关系。在后几个特征方向上偏差比较大的数据样本，表示它在原始数据里对应的那几个特征上出现了与预计不太一致的情况。
- ![[公式]](https://www.zhihu.com/equation?tex=%5Csum_%7Bj%3D1%7D%5E%7Bk%7D+d_%7Bi+j%7D%3EC_%7B1%7D+%5Cquad+%5Ctext+%7B+or+%7D+%5Cquad+%5Csum_%7Bj%3Dn-r%2B1%7D%5E%7Bn%7D+d_%7Bi+j%7D%3EC_%7B2%7D)
 
得分大于阈值C则判断为异常。
 
第二种做法，PCA提取了数据的主要特征，如果一个数据样本不容易被重构出来，表示这个数据样本的特征跟整体数据样本的特征不一致，那么它显然就是一个异常的样本：
- ![[公式]](https://www.zhihu.com/equation?tex=+%5Coperatorname%7BScore%7D%5Cleft%28x_%7Bi%7D%5Cright%29%3D%5Csum_%7Bk%3D1%7D%5E%7Bn%7D%5Cleft%28%5Cleft%7C%5Cmathbf%7Bx%7D_%7B%5Cmathbf%7Bi%7D%7D-%5Cmathbf%7Bx%7D_%7B%5Cmathbf%7Bi%7D+%5Cmathbf%7Bk%7D%7D%5E%7B%5Cprime%7D%5Cright%7C%5Cright%29+%5Ctimes+e+v%28k%29++)  
- ![[公式]](https://www.zhihu.com/equation?tex=e+v%28k%29%3D%5Cfrac%7B%5Csum_%7Bj%3D1%7D%5E%7Bk%7D+%5Clambda_%7Bj%7D%7D%7B%5Csum_%7Bj%3D1%7D%5E%7Bn%7D+%5Clambda_%7Bj%7D%7D)
 
其中， ![[公式]](https://www.zhihu.com/equation?tex=%5Cmathbf%7Bx%7D_%7B%5Cmathbf%7Bi%7D+%5Cmathbf%7Bk%7D%7D%5E%7B%5Cprime%7D) 是基于k维特征向量重构的样本。
 
基于低维特征进行数据样本的重构时，舍弃了较小的特征值对应的特征向量方向上的信息。换一句话说，重构误差其实主要来自较小的特征值对应的特征向量方向上的信息。基于这个直观的理解，PCA在异常检测上的两种不同思路都会特别关注较小的特征值对应的特征向量。所以，我们说PCA在做异常检测时候的两种思路本质上是相似的，当然第一种方法还可以关注较大特征值对应的特征向量。
 
```python
# Ref: https://zhuanlan.zhihu.com/p/48110105
from sklearn.decomposition import PCA
pca = PCA()
pca.fit(centered_training_data)
transformed_data = pca.transform(training_data)
y = transformed_data
 
# 计算异常分数
lambdas = pca.singular_values_
M = ((y*y)/lambdas)
 
# 前k个特征向量和后r个特征向量
q = 5
print "Explained variance by first q terms: ", sum(pca.explained_variance_ratio_[:q])
q_values = list(pca.singular_values_ < .2)
r = q_values.index(True)
 
# 对每个样本点进行距离求和的计算
major_components = M[:,range(q)]
minor_components = M[:,range(r, len(features))]
major_components = np.sum(major_components, axis=1)
minor_components = np.sum(minor_components, axis=1)
 
# 人为设定c1、c2阈值
components = pd.DataFrame({'major_components': major_components, 
                               'minor_components': minor_components})
c1 = components.quantile(0.99)['major_components']
c2 = components.quantile(0.99)['minor_components']
 
# 制作分类器
def classifier(major_components, minor_components):  
    major = major_components > c1
    minor = minor_components > c2    
    return np.logical_or(major,minor)
 
results = classifier(major_components=major_components, minor_components=minor_components)
```
 
### 2. AutoEncoder
 
资料来源：
- [13] 利用Autoencoder进行无监督异常检测(Python) - [http://SofaSofa.io](https://link.zhihu.com/?target=http%3A//SofaSofa.io)，知乎：[https://zhuanlan.zhihu.com/p/46188296](https://zhuanlan.zhihu.com/p/46188296)
- [14] 自编码器AutoEncoder解决异常检测问题（手把手写代码） - 数据如琥珀，知乎：[https://zhuanlan.zhihu.com/p/260882741](https://zhuanlan.zhihu.com/p/260882741)
 
PCA是线性降维，AutoEncoder是非线性降维。根据正常数据训练出来的AutoEncoder，能够将正常样本重建还原，但是却无法将异于正常分布的数据点较好地还原，导致还原误差较大。因此如果一个新样本被编码，解码之后，它的误差超出正常数据编码和解码后的误差范围，则视作为异常数据。需要注意的是，AutoEncoder训练使用的数据是正常数据（即无异常值），这样才能得到重构后误差分布范围是多少以内是合理正常的。所以AutoEncoder在这里做异常检测时，算是一种有监督学习的方法。
- ![](https://pic3.zhimg.com/80/v2-2e82f16234fcc216d9ac9c8e4b54c0aa_1440w.jpg)
- 图11：自编码器
 
```python
# Ref: https://zhuanlan.zhihu.com/p/260882741
import tensorflow as tf
from keras.models import Sequential
from keras.layers import Dense
 
# 标准化数据
scaler = preprocessing.MinMaxScaler()
X_train = pd.DataFrame(scaler.fit_transform(dataset_train),
                              columns=dataset_train.columns,
                              index=dataset_train.index)
# Random shuffle training data
X_train.sample(frac=1)
X_test = pd.DataFrame(scaler.transform(dataset_test),
                             columns=dataset_test.columns,
                             index=dataset_test.index)
 
tf.random.set_seed(10)
act_func = 'relu'
# Input layer:
model=Sequential()
# First hidden layer, connected to input vector X.
model.add(Dense(10,activation=act_func,
                kernel_initializer='glorot_uniform',
                kernel_regularizer=regularizers.l2(0.0),
                input_shape=(X_train.shape[1],)
               )
         )
model.add(Dense(2,activation=act_func,
                kernel_initializer='glorot_uniform'))
model.add(Dense(10,activation=act_func,
                kernel_initializer='glorot_uniform'))
model.add(Dense(X_train.shape[1],
                kernel_initializer='glorot_uniform'))
model.compile(loss='mse',optimizer='adam')
print(model.summary())
 
 
# Train model for 100 epochs, batch size of 10:
NUM_EPOCHS=100
BATCH_SIZE=10
history=model.fit(np.array(X_train),np.array(X_train),
                  batch_size=BATCH_SIZE,
                  epochs=NUM_EPOCHS,
                  validation_split=0.05,
                  verbose = 1)
 
plt.plot(history.history['loss'],
         'b',
         label='Training loss')
plt.plot(history.history['val_loss'],
         'r',
         label='Validation loss')
plt.legend(loc='upper right')
plt.xlabel('Epochs')
plt.ylabel('Loss, [mse]')
plt.ylim([0,.1])
plt.show()
 
# 查看训练集还原的误差分布如何，以便制定正常的误差分布范围
X_pred = model.predict(np.array(X_train))
X_pred = pd.DataFrame(X_pred,
                      columns=X_train.columns)
X_pred.index = X_train.index
 
scored = pd.DataFrame(index=X_train.index)
scored['Loss_mae'] = np.mean(np.abs(X_pred-X_train), axis = 1)
plt.figure()
sns.distplot(scored['Loss_mae'],
             bins = 10,
             kde= True,
            color = 'blue')
plt.xlim([0.0,.5])
 
# 误差阈值比对，找出异常值
X_pred = model.predict(np.array(X_test))
X_pred = pd.DataFrame(X_pred,
                      columns=X_test.columns)
X_pred.index = X_test.index
threshod = 0.3
scored = pd.DataFrame(index=X_test.index)
scored['Loss_mae'] = np.mean(np.abs(X_pred-X_test), axis = 1)
scored['Threshold'] = threshod
scored['Anomaly'] = scored['Loss_mae'] > scored['Threshold']
scored.head()
```
 

## 七、基于分类的方法

把异常检测看成是数据**不平衡**下的**分类**问题。
- （1）如果数据条件允许，优先使用**有监督**的异常检测
- （2）仅有少量标签的情况下，也可采用**半监督**异常检测模型；如把无监督学习作为一种特征抽取方式来**辅助**监督学习，和stacking比较类似
- （3）没有标签的，训练数据中并未标出哪些是异常点，因此必须使用**无监督**学习。
 
### 无监督异常检测

无监督异常检测模型可以大致分为：
- （1）**统计与概率**模型（statistical and probabilistic and models）：主要是对**数据分布**做出假设，并找出假设下所定义的“异常”，因此往往会使用极值分析或者假设检验。
  - 比如对最简单的一维数据假设**高斯分布**，然后将距离均值特定范围以外的数据当做异常点。而推广到高维后，可以假设每个维度各自独立，并将各个维度上的异常度相加。如果考虑特征间的相关性，也可以用马氏距离（mahalanobis distance）来衡量数据的异常度。
  - 不难看出，这类方法最大的好处就是速度一般比较快，但因为存在比较强的“假设”，效果不一定很好。稍微引申一点的话，其实给每个维度做个直方图做**密度估计**，再加起来就是HBOS。
- （2）**线性模型**（linear models）：假设数据在低维空间上有嵌入，那么无法、或者在低维空间投射后表现不好的数据可以认为是离群点。
  - 举个简单的例子，PCA可以用于做异常检测，一种方法就是找到k个特征向量（eigenvector），并计算每个样本再经过这k个特征向量投射后的重建误差（reconstruction error），而正常点的重建误差应该小于异常点。同理，也可以计算每个样本到这k个选特征向量所构成的超空间的加权欧氏距离（特征值越小权重越大）。在相似的思路下，我们也可以直接对协方差矩阵进行分析，并把样本的马氏距离（在考虑特征间关系时样本到分布中心的距离）作为样本的异常度，而这种方法也可以被理解为一种软性（Soft PCA）。
  - 另一种经典算法One-class SVM也一般被归类为线性模型。
- （3）基于**相似度衡量**的模型（proximity based models）：异常点因为和正常点的分布不同，因此相似度较低，由此衍生了一系列算法通过相似度来识别异常点。
  - 比如最简单的K近邻就可以做异常检测，一个样本和它第k个近邻的距离就可以被当做是异常值，显然异常点的k近邻距离更大。同理，基于密度分析如LOF、LOCI和LoOP主要是通过局部的数据密度来检测异常。显然，异常点所在空间的数据点少，密度低。相似的是，Isolation Forest通过划分超平面来计算“孤立”一个样本所需的超平面数量（可以想象成在想吃蛋糕上的樱桃所需的最少刀数）。在密度低的空间里（异常点所在空间中），孤例一个样本所需要的划分次数更少。
  - 另一种相似的算法ABOD是计算每个样本与所有其他样本对所形成的夹角的方差，异常点因为远离正常点，因此方差变化小。换句话说，大部分异常检测算法都可以被认为是一种估计相似度，无论是通过密度、距离、夹角或是划分超平面。通过聚类也可以被理解为一种相似度度量，比较常见不再赘述。
- （4）**集成**异常检测与模型融合：在无监督学习时，提高模型的鲁棒性很重要，因此集成学习就大有用武之地。比如上面提到的Isolation Forest，就是基于构建多棵决策树实现的。最早的集成检测框架feature bagging与分类问题中的随机森林（random forest）很像，先将训练数据随机划分（每次选取所有样本的d/2-d个特征，d代表特征数），得到多个子训练集，再在每个训练集上训练一个独立的模型（默认为LOF）并最终合并所有的模型结果（如通过平均）。值得注意的是，因为没有标签，异常检测往往是通过bagging和feature bagging比较多，而boosting比较少见。boosting情况下的异常检测，一般需要生成伪标签。集成异常检测是一个新兴但很有趣的领域。
- （5）特定领域上的异常检测：比如图像异常检测，顺序及流数据异常检测（时间序列异常检测），以及高维空间上的异常检测，比如前文提到的Isolation Forest就很适合高维数据上的异常检测。


### 1. One-Class SVM
 
资料来源：
- [15] Python机器学习笔记：One Class SVM - zoukankan，博文：[http://t.zoukankan.com/wj-1314-p-10701708.html](https://link.zhihu.com/?target=http%3A//t.zoukankan.com/wj-1314-p-10701708.html)
- [16] 单类SVM: SVDD - 张义策，知乎：[https://zhuanlan.zhihu.com/p/65617987](https://zhuanlan.zhihu.com/p/65617987)
 
One-Class SVM，这个算法的思路非常简单，就是寻找一个超平面将样本中的正例圈出来，预测就是用这个超平面做决策，在圈内的样本就认为是正样本，在圈外的样本是负样本，用在异常检测中，负样本可看作异常样本。它属于无监督学习，所以不需要标签。
- ![](https://pic3.zhimg.com/80/v2-0a2bc3c5116a35e6f1abff1f27d78c9a_1440w.jpg)
- 图12：One-Class SVM
 
One-Class SVM又一种推导方式是SVDD（Support Vector Domain Description，支持向量域描述），对于SVDD来说，期望所有不是异常的样本都是正类别，同时它采用一个超球体，而不是一个超平面来做划分，该算法在特征空间中获得数据周围的球形边界，期望最小化这个超球体的体积，从而最小化异常点数据的影响。
 
假设产生的超球体参数为中心 o 和对应的超球体半径r>0，超球体体积V(r)被最小化，中心o是支持行了的线性组合；跟传统SVM方法相似，可以要求所有训练数据点xi到中心的距离严格小于r。但是同时构造一个惩罚系数为C的松弛变量 ζi，优化问题入下所示：
- ![[公式]](https://www.zhihu.com/equation?tex=%5Cbegin%7Barray%7D%7Bc%7D%5Cunderbrace%7B%5Cmin+%7D_%7Br+%5Crho%7D+V%28r%29%2BC+%5Csum_%7Bi%3D1%7D%5E%7Bm%7D+%5Czeta_%7Bi%7D+%5C%5C%5Cleft%5C%7Cx_%7Bi%7D-o%5Cright%5C%7C_%7B2%7D+%5Cleq+r%2B%5Cxi_%7Bi%7D%2C+i-1%2C2%2C3+%5Cldots+m+%5C%5C%5Cxi_%7Bi%7D+%5Cgeq+0%2C+i%3D1%2C2%2C+%5Cldots+m%5Cend%7Barray%7D)
 
C是调节松弛变量的影响大小，说的通俗一点就是，给那些需要松弛的数据点多少松弛空间，如果C比较小，会给离群点较大的弹性，使得它们可以不被包含进超球体。详细推导过程参考资料[15] [16]。
 
```python
from sklearn import svm
# fit the model
clf = svm.OneClassSVM(nu=0.1, kernel='rbf', gamma=0.1)
clf.fit(X)
y_pred = clf.predict(X)
n_error_outlier = y_pred[y_pred == -1].size
```

## 八、基于预测的方法
 
资料来源：
- [17] 【TS技术课堂】时间序列异常检测 - 时序人，文章：[https://mp.weixin.qq.com/s/9TimTB_ccPsme2MNPuy6uA](https://mp.weixin.qq.com/s/9TimTB_ccPsme2MNPuy6uA)
 
对于单条时序数据，根据其预测出来的时序曲线和真实的数据相比，求出每个点的残差，并对残差序列建模，利用KSigma或者分位数等方法便可以进行异常检测。具体的流程如下：
- ![](https://pic2.zhimg.com/80/v2-60b4bef47418cfa831066ece990508b1_1440w.jpg)
- 图13：基于预测的方法


## 深度学习方法

目前最常用于异常检测的深度学习方法要非 Autoencoder 莫属了。

Autoencoder 的中文名叫**自编码器**，由 Encoder（编码器）和 Decoder（解码器）两部分构成
- ![](https://picx.zhimg.com/80/v2-f7da88847ba8cee1b3b8e93519fcbb77_1440w.jpg?source=1940ef5c)
- 左边部分为编码器，它可以把高维的输入压缩成低维的形式来表示，在此过程中，神经网络会尽量留下有用的信息，去除掉一些不重要的信息和噪声。右边部分为解码器，它负责把压缩了的数据再进行还原，努力恢复成原本的样子。
- ![](https://pic1.zhimg.com/80/v2-ae1210b1037a6de06cacf0770e064a28_1440w.jpg?source=1940ef5c)
- 使用辛普森家人中爷爷的图像进行这个模型的测试，此时模型有很好的还原表现，因为丽莎和爷爷很像，模型之前已经知道如何处理这种数据了

## 九、总结

异常检测方法总结如下：
- ![](https://pic3.zhimg.com/80/v2-8d7aafacc594570b545ad68c8363309e_1440w.jpg)

参考资料
- [1] 时序预测竞赛之异常检测算法综述 - 鱼遇雨欲语与余，知乎：[https://zhuanlan.zhihu.com/p/336944097](https://zhuanlan.zhihu.com/p/336944097)
- [2] 剔除异常值栅格计算器_数据分析师所需的统计学：异常检测 - weixin_39974030，CSDN：[https://blog.csdn.net/weixin_39974030/article/details/112569610](https://blog.csdn.net/weixin_39974030/article/details/112569610)
- [3] 异常检测算法之(KNN)-K Nearest Neighbors - 小伍哥聊风控，知乎：[https://zhuanlan.zhihu.com/p/501691799](https://zhuanlan.zhihu.com/p/501691799)
- [4] 一文读懂异常检测 LOF 算法（Python代码）- 东哥起飞，知乎：[https://zhuanlan.zhihu.com/p/448276009](https://zhuanlan.zhihu.com/p/448276009)
- [5] Nowak-Brzezińska, A., & Horyń, C. (2020). Outliers in rules-the comparision of LOF, COF and KMEANS algorithms. *Procedia Computer Science*, *176*, 1420-1429.
- [6] 機器學習_學習筆記系列(98)：基於連接異常因子分析(Connectivity-Based Outlier Factor) - 劉智皓 (Chih-Hao Liu)
- [7] 异常检测之SOS算法 - 呼广跃，知乎：[https://zhuanlan.zhihu.com/p/34438518](https://zhuanlan.zhihu.com/p/34438518)
- [8] 异常检测算法 -- 孤立森林（Isolation Forest）剖析 - 风控大鱼，知乎：[https://zhuanlan.zhihu.com/p/74508141](https://zhuanlan.zhihu.com/p/74508141)
- [9] 孤立森林(isolation Forest)-一个通过瞎几把乱分进行异常检测的算法 - 小伍哥聊风控，知乎：[https://zhuanlan.zhihu.com/p/484495545](https://zhuanlan.zhihu.com/p/484495545)
- [10] 孤立森林阅读 - Mark_Aussie，博文：[https://blog.csdn.net/MarkAustralia/article/details/12018189](https://blog.csdn.net/MarkAustralia/article/details/12018189)
- [11] 机器学习-异常检测算法（三）：Principal Component Analysis - 刘腾飞，知乎：[https://zhuanlan.zhihu.com/p/29091645](https://zhuanlan.zhihu.com/p/29091645)
- [12] Anomaly Detection异常检测--PCA算法的实现 - CC思SS，知乎：[https://zhuanlan.zhihu.com/p/48110105](https://zhuanlan.zhihu.com/p/48110105)
- [13] 利用Autoencoder进行无监督异常检测(Python) - [http://SofaSofa.io](https://link.zhihu.com/?target=http%3A//SofaSofa.io)，知乎：[https://zhuanlan.zhihu.com/p/46188296](https://zhuanlan.zhihu.com/p/46188296)
- [14] 自编码器AutoEncoder解决异常检测问题（手把手写代码） - 数据如琥珀，知乎：[https://zhuanlan.zhihu.com/p/260882741](https://zhuanlan.zhihu.com/p/260882741)
- [15] Python机器学习笔记：One Class SVM - zoukankan，博文：[http://t.zoukankan.com/wj-1314-p-10701708.html](https://link.zhihu.com/?target=http%3A//t.zoukankan.com/wj-1314-p-10701708.html)
- [16] 单类SVM: SVDD - 张义策，知乎：[https://zhuanlan.zhihu.com/p/65617987](https://zhuanlan.zhihu.com/p/65617987)
- [17] 【TS技术课堂】时间序列异常检测 - 时序人，文章：[https://mp.weixin.qq.com/s/9Tim](https://mp.weixin.qq.com/s/9TimTB_ccPsme2MNPuy6uA)



# 结束


