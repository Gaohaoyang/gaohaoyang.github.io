---
layout: post
title:  "数据挖掘经验总结-data-mining-note"
date:   2013-07-31 23:02:00
categories: 数据挖掘
tags: 数据挖掘 机器学习 数据分析 陈皓 大数据 增长黑客 数据金字塔 zepplin hadoop hive tez spark storm 服务质量 评分卡 clickhouse kafka zookeeper 数据库 mysql
excerpt: 数据挖掘知识点、经验总结
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

> 数据挖掘方向知识点、经验总结

# 总结

- 【2021-2-22】[27岁华裔小伙一战成名！搞出美国新冠最准预测模型，一人干翻专业机构，彭博：Superstar](https://mp.weixin.qq.com/s/EGJ1Upes2Ka-t9Rw2DdSZw),凭一己之力，仅用一周时间打造的新冠预测模型，准确度方面碾压那些数十亿美元、数十年经验加持的专业机构。不仅如此，他的模型还被美国疾控中心采用。[模型地址](https://covid19-projections.com/)
- fast.ai创始人Jeremy Howard高度评价道：唯一看起来合理的模型。他是唯一一个真正查看数据，并且做得正确的人。
- 2家专业机构打造的预测系统——伦敦帝国理工学院、总部位于西雅图的健康指标与评估研究所（IHME）。
  - 但2家机构给出的预测结果却是天差地别：
  - 伦敦帝国理工学院：到夏天，美国因新冠病毒而死亡的人数将达到200万。
  - IHME：预计到8月，死亡人数将达到6万。
  - （后来的事实证明，死亡人数是16万。）

# 数据

-**数据金字塔**可以帮助我们理解数据与信息、知识和人工智能的关系。
    - 数据本身是没有意义的，如果它不能转化为信息和知识的话；
    - 但如果没有数据，或者数据匮乏，信息和知识的产生也就成了无水之源。
- ![](https://s5.51cto.com/wyfs02/M01/A4/2C/wKioL1mmGwiDMyZPAABtvzSoKaU189.png)
    - **数据**
        - 问题
            - 数据存在缺失
            - 数据采集的无效性
    - **信息**：是被组织起来的数据
        - 为了特定目标对数据进行处理和建立内在关联，让数据具有意义，可以回答谁（who）、什么（what）、哪里（where）、什么时候（when）的问题，对于企业经营而言，信息的作用在于过程管理和绩效评估。
        - 问题
            - 缺乏有效的数据分析工具
            - 缺乏将数据转化为信息的分析能力
    - **知识**：对信息的总结和提炼。
        - 基于信息之间的联系，总结出来的规律和方法论，主要用于回答为什么（why）和怎么做（how）的问题，在企业里的应用包括问题诊断、预测和最佳做法。
        - 知识来源于经验（数据），来源于人类对这个三维世界的观察，而智慧可以无需通过经验，有可能通过与高维度建立连接而获得
    - **人工智能**：机器对信息和知识的自主应用
        - 人工智能是系统基于数据、信息和知识，形成类似于人脑的思维能力（包括学习、推理、决策等）。
        - 在信息和知识层面，数据都是提供决策支持作用，而到了人工智能阶段，则是系统模仿人类应用信息和知识进行自主决策了。
    - 人工智能永远无法超越人类的智慧。由此也可以看到数据的局限性：
        - 它可以将人类的理性发挥到极致，但它只会模仿却无法创造，它无法替代人类的感性和直觉，而正是这份感性和直觉，让生命多了一些有趣和柔软，真正的创造也由此发生！

# 相关性分析

- 注意：相关关系不等于因果关系
    - ![](http://bluewhale.cc/wp-content/uploads/2016/06/54b9822f9402b0.92166338.jpg)
- 相关分析的方法很多
    - 初级方法：快速发现数据之间的关系，如正相关，负相关或不相关。
    - 中级方法：对数据间关系的强弱进行度量，如完全相关，不完全相关等。
    - 高级方法：将数据间的关系转化为模型，并通过模型对未来的业务发展进行预测。

[Read more](http://bluewhale.cc/2016-06-30/analysis-of-correlation.html#ixzz6fwTnlB2v)


- （1）协方差及协方差矩阵
    - 协方差用来衡量两个变量的总体误差，如果两个变量的变化趋势一致，协方差就是正值，说明两个变量正相关。如果两个变量的变化趋势相反，协方差就是负值，说明两个变量负相关。如果两个变量相互独立，那么协方差就是0，说明两个变量不相关。
        - [img](http://bluewhale.cc/wp-content/uploads/2016/06/%E5%8D%8F%E6%96%B9%E5%B7%AE%E5%85%AC%E5%BC%8F.jpg) ![](http://bluewhale.cc/wp-content/uploads/2016/06/%E5%8D%8F%E6%96%B9%E5%B7%AE%E5%85%AC%E5%BC%8F.jpg)
    - 协方差只能对两组数据进行相关性分析，当有两组以上数据时就需要使用协方差矩阵。
        - [img](http://bluewhale.cc/wp-content/uploads/2016/06/%E5%8D%8F%E6%96%B9%E5%B7%AE%E7%9F%A9%E9%98%B5%E5%85%AC%E5%BC%8F.jpg) ![](http://bluewhale.cc/wp-content/uploads/2016/06/%E5%8D%8F%E6%96%B9%E5%B7%AE%E7%9F%A9%E9%98%B5%E5%85%AC%E5%BC%8F.jpg)
    - 协方差通过数字衡量变量间的相关性，正值表示正相关，负值表示负相关。但无法对相关的密切程度进行度量。当我们面对多个变量时，无法通过协方差来说明那两组数据的相关性最高。要衡量和对比相关性的密切程度，就需要使用下一个方法：**相关系数**。
- （2）相关系数
    - **相关系数**(Correlation coefficient)是反应变量之间关系密切程度的统计指标，相关系数的取值区间在1到-1之间。1表示两个变量完全线性相关，-1表示两个变量完全负相关，0表示两个变量不相关。数据越趋近于0表示相关关系越弱。
        - [img](http://bluewhale.cc/wp-content/uploads/2016/06/%E7%9B%B8%E5%85%B3%E7%B3%BB%E6%95%B0%E5%85%AC%E5%BC%8F.jpg) ![](http://bluewhale.cc/wp-content/uploads/2016/06/%E7%9B%B8%E5%85%B3%E7%B3%BB%E6%95%B0%E5%85%AC%E5%BC%8F.jpg)
        - [img](http://bluewhale.cc/wp-content/uploads/2016/06/Sxy%E5%85%AC%E5%BC%8F.jpg) ![](http://bluewhale.cc/wp-content/uploads/2016/06/Sxy%E5%85%AC%E5%BC%8F.jpg)
        - [img](http://bluewhale.cc/wp-content/uploads/2016/06/Sx%E5%85%AC%E5%BC%8F.jpg) ![](http://bluewhale.cc/wp-content/uploads/2016/06/Sx%E5%85%AC%E5%BC%8F.jpg)
    - 缺点是无法利用这种关系对数据进行预测，简单的说就是没有对变量间的关系进行提炼和固化，形成模型。要利用变量间的关系进行预测，需要使用到下一种相关分析方法，回归分析。
    - **pearson**(皮尔逊), **kendall**（肯德尔）和**spearman**（斯伯曼/斯皮尔曼）三种相关分析方法有什么异同
    - （2.1）**pearson**(皮尔逊) **线性**相关系数
        - r = Cov(x,y) / σᵪσ 
    - 两个连续变量间呈线性相关时
        - 满足**积差**相关分析的适用条件时，使用Pearson积差相关系数
        - 不满足**积差**相关分析的适用条件时，使用Spearman**秩**相关系数来描述.
    - （2.2）Spearman（斯皮尔曼）相关系数又称秩相关系数，是利用两变量的**秩次大小**作线性相关分析，对原始变量的分布不作要求，属于**非参数**统计方法，适用范围要广些。对于服从Pearson相关系数的数据亦可计算Spearman相关系数，但统计效能要低一些。Pearson相关系数的计算公式可以完全套用Spearman相关系数计算公式，但公式中的x和y用相应的秩次代替即可。
        - 1.连续数据，正态分布，线性关系，用pearson相关系数是最恰当，当然用spearman相关系数也可以， 就是效率没有pearson相关系数高。
        - 2.上述任一条件不满足，就用spearman相关系数，不能用pearson相关系数。
        - 3.两个定序数据之间也用spearman相关系数，不能用pearson相关系数。
            - 定序数据是指仅仅反映观测对象等级、顺序关系的数据，是由定序尺度计量形成的，表现为类别，可以进行排序，属于品质数据。
            - 斯皮尔曼相关系数的适用条件比皮尔逊相关系数要广，只要数据满足单调关系（例如线性函数、指数函数、对数函数等）就能够使用。
    - （2.3）Kendall’s tau-b**等级**相关系数：用于反映分类变量相关性的指标，适用于两个分类变量均为有序分类的情况。对相关的有序变量进行非参数相关检验；取值范围在-1-1之间，此检验适合于正方形表格；
        - 计算积距pearson相关系数，连续性变量才可采用;
        - 计算Spearman秩相关系数，适合于定序变量或不满足正态分布假设的等间隔数据; 
        - 计算Kendall秩相关系数，适合于定序变量或不满足正态分布假设的等间隔数据。
    - 计算相关系数：当资料不服从**双变量正态分布**或**总体分布未知**，或原始数据用等级表示时，宜用 spearman或kendall相关
        - Pearson 相关复选项 积差相关计算连续变量或是等间距测度的变量间的相关分析
        - Kendall 复选项 等级相关 计算分类变量间的秩相关，适用于合并等级资料
        - Spearman 复选项 等级相关计算斯皮尔曼相关，适用于连续等级资料
    - 注：
        - 1 若非等间距测度的连续变量 因为分布不明-可用等级相关/也可用Pearson 相关，对于完全等级离散变量必用等级相关
        - 2 当资料不服从双变量正态分布或总体分布型未知或原始数据是用等级表示时,宜用 Spearman 或 Kendall相关。
        - 3 若不恰当用了Kendall 等级相关分析则可能得出相关系数偏小的结论。则若不恰当使用，可能得相关系数偏小或偏大结论而考察不到不同变量间存在的密切关系。对一般情况默认数据服从正态分布的，故用Pearson分析方法。
- （3）一元回归及多元回归
    - 回归分析（regression analysis)是确定两组或两组以上变量间关系的统计方法。两个变量使用一元回归，两个以上变量使用多元回归。
    - ![](http://bluewhale.cc/wp-content/uploads/2016/06/b0%E5%85%AC%E5%BC%8F-1024x72.jpg)
- （4）信息熵及互信息
    - 影响最终效果的因素可能有很多，并且不一定都是数值形式
    - 互信息可以发现哪一类特征与最终的结果关系密切.
        - 互信息是用来衡量信息之间相关性的指标。当两个信息完全相关时，互信息为1，不相关时为0。
        - 信息之间是有相关性的，互信息是度量相关性的尺子。互信息越高，相关性也越高。
        - ![](https://images2015.cnblogs.com/blog/788753/201610/788753-20161027151210843-745348026.png)
    - 相关系数 vs 互信息：
        - 线性相关系数，从统计学出发度量信息A、B的关系，范围在-1到1，即有正相关和负相关。0表示相关
        - 互信息，从联合概率的角度计算，可以理解为A出现的时候B出现的概率，概率范围是从0到1，即完全不确定到完全确定
    - 计算方法见：[决策树分类和预测算法的原理及实现](http://bluewhale.cc/2016-03-20/decision-tree.html#ixzz6fwV8sDfo)
        - ![](http://bluewhale.cc/wp-content/uploads/2016/03/%E4%BA%92%E4%BF%A1%E6%81%AF1.jpg)
        - 离散
            - ![](https://imgconvert.csdnimg.cn/aHR0cDovL3MyLnNpbmFpbWcuY24vYm1pZGRsZS82MjU1ZDIwZGc3NTUyOGMzMTJlMDEmNjkw)
        - 连续
            - ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly91cGxvYWQtaW1hZ2VzLmppYW5zaHUuaW8vdXBsb2FkX2ltYWdlcy85MDcwNjM5LWY1ZjI4Y2Q4ZjdiOWFiZGQucG5nP2ltYWdlTW9ncjIvYXV0by1vcmllbnQvc3RyaXAlN0NpbWFnZVZpZXcyLzIvdy8zODUvZm9ybWF0L3dlYnA)
- 代码

```python
# 方法1:
#sklearn 计算
from sklearn import metrics as mr
if __name__ == '__main__':
    A = [1, 1, 1, 2, 3, 3]
    B = [1, 2, 3, 1, 2, 3]
    result_NMI=metrics.normalized_mutual_info_score(A, B)
    print("result_NMI:",result_NMI)
 
#备注：计算A和B的互信息，A,B为list或array。
 
#方法2:
from scipy.stats import chi2_contingency
 
def calc_MI(x, y, bins):
    c_xy = np.histogram2d(x, y, bins)[0]
    g, p, dof, expected = chi2_contingency(c_xy, lambda_="log-likelihood")
    mi = 0.5 * g / c_xy.sum()

# 备注：唯一区别就是这样实现使用自然对数而不是基2对数(因此它以“nats”而不是“bits”表示信息)。如果你喜欢bit，只需把mi除以log(2)

#方法3：
import numpy as np
 
def calc_MI(X,Y,bins):
 
   c_XY = np.histogram2d(X,Y,bins)[0]
   c_X = np.histogram(X,bins)[0]
   c_Y = np.histogram(Y,bins)[0]
 
   H_X = shan_entropy(c_X)
   H_Y = shan_entropy(c_Y)
   H_XY = shan_entropy(c_XY)
 
   MI = H_X + H_Y - H_XY
   return MI
 
def shan_entropy(c):
    c_normalized = c / float(np.sum(c))
    c_normalized = c_normalized[np.nonzero(c_normalized)]
    H = -sum(c_normalized* np.log2(c_normalized))  
    return H
 
A = np.array([[ 2.0,  140.0,  128.23, -150.5, -5.4  ],
              [ 2.4,  153.11, 130.34, -130.1, -9.5  ],
              [ 1.2,  156.9,  120.11, -110.45,-1.12 ]])
 
bins = 5 # ?
n = A.shape[1]
matMI = np.zeros((n, n))
 
for ix in np.arange(n):
    for jx in np.arange(ix+1,n):
        matMI[ix,jx] = calc_MI(A[:,ix], A[:,jx], bins)

```



- 【2020-12-07】
- `Sperman`或`kendall` **等级**相关分析
- `Person`相关（样本点的个数比较多）// 一般常用皮尔逊相关
- `Copula`相关（比较难，金融数学，概率密度）
- 一般这样认为：
    - 0.8-1.0 极强相关
    - 0.6-0.8 强相关
    - 0.4-0.6 中等程度相关
    - 0.2-0.4 弱相关
    - 0.0-0.2 极弱相关或无相关

- 参考
    - [五种常用的相关性分析方法](http://bluewhale.cc/2016-06-30/analysis-of-correlation.html)
    - [Pearson，Kendall和Spearman三种相关分析方法的异同](https://blog.csdn.net/sadfasdgaaaasdfa/article/details/46965827)
    - [皮尔森Pearson相关系数 VS 斯皮尔曼Spearman相关系数](https://blog.csdn.net/lambsnow/article/details/79972145)
    - [数学建模--相关性分析及Python实现](https://blog.csdn.net/ddjhpxs/article/details/105767589)
    - [大数据风控---互信息及Python实现](https://blog.csdn.net/qq_32123787/article/details/96371544)


## Pearson

- 皮尔逊相关系数( Pearson correlation coefficient），又称**皮尔逊**积矩相关系数（Pearson product-moment correlation coefficient，简称 **PPMCC**或**PCCs**）。用于衡量两个变量X和Y之间的线性相关相关关系，值域在-1与1之间。
- 给定两个连续变量x和y，皮尔森相关系数被定义为
    - [img](https://img-blog.csdn.net/20180417114819536) ![](https://img-blog.csdn.net/20180417114819536)
    - [img](https://img-blog.csdnimg.cn/20190529103112626.png) ![](https://img-blog.csdnimg.cn/20190529103112626.png)

- 代码

```python
# （1）numpy库
pccs = np.corrcoef(x, y)
# （2）scipy库
from scipy.stats import pearsonr
pccs = pearsonr(x, y)
# （3）直接计算
def cal_pccs(x, y, n):
    """
    warning: data format must be narray
    :param x: Variable 1
    :param y: The variable 2
    :param n: The number of elements in x
    :return: pccs
    """
    sum_xy = np.sum(np.sum(x*y))
    sum_x = np.sum(np.sum(x))
    sum_y = np.sum(np.sum(y))
    sum_x2 = np.sum(np.sum(x*x))
    sum_y2 = np.sum(np.sum(y*y))
    pcc = (n*sum_xy-sum_x*sum_y)/np.sqrt((n*sum_x2-sum_x*sum_x)*(n*sum_y2-sum_y*sum_y))
    return pcc
```



## Spearman

- 由于原则上无法准确定义顺序变量各类别之间的距离，导致计算出来的相关系数不是变量间的关联性的真实表示。因此，建议对顺序变量使用斯皮尔曼相关系数。
- 斯皮尔曼相关系数的计算采用的是取值的等级，而不是取值本身。例如，给定三个值：33，21，44，它们的等级就分别是2，1，3.  计算斯皮尔曼相关系数的公式与计算皮尔森相关系数的类似，但用等级代替了各自的取值。
- ![](https://img-blog.csdn.net/20180417113553969)
- 相对于皮尔森相关系数，斯皮尔曼相关系数对于数据错误和极端值的反应不敏感。
- 斯皮尔曼相关系数的另一种公式表示如下：
    - [img](https://img-blog.csdn.net/20180417114927879) ![](https://img-blog.csdn.net/20180417114927879)

## Kendall

- 待补充

# 数据分析

- 【2021-6-9】阿里巴巴：[数据分析思维及意义](https://mp.weixin.qq.com/s/Z5mYg4G1zRu4_VXfa0JFGQ)

Google的数字营销传播者Avinash Kaushik曾说“All data in aggregate is crap”，即“**所有汇总的数据都是废话**”，汇总的数据掩盖了很多问题，即需要下钻分析数据指标，以理解指标的各种取值或者趋势背后的真正原因（特别是指标取值或者趋势异常时），以便于优化指标。


5W2H分析法又叫七问分析法，简单、方便，易于理解、使用，富有启发意义，广泛用于企业管理和技术活动，对于决策和执行性的活动措施也非常有帮助，也有助于弥补考虑问题的疏漏。
- 5W是指：what（是什么）、when（何时）、where（何地）、why（为什么）、who（是谁）。
- 2H是指：how（怎么做）、how much（多少钱）。



## 宏观战略分析

常用战略分析方法有`PEST`、`SWOT`和`波特五力模型`

### PEST

PEST分析是指宏观环境的分析，P是政治(politics)，E是经济(economy)，S是社会(society)，T是技术(technology)。

### SWOT

SWOT即基于内外部竞争环境和竞争条件下的态势分析，可以对研究对象所处的情景进行全面、系统、准确的研究。分析角度：优势（Strengths）、劣势（Weaknesses）、机会（Opportunities）和威胁（Threats）。


### 波特五力

波特五力即行业中存在着决定竞争规模和程度的五种力量，这五种力量综合起来影响着产业的吸引力以及现有企业的竞争战略决策。五种力量分别为同行业内现有竞争者的竞争能力、潜在竞争者进入的能力、替代品的替代能力、供应商的讨价还价能力与购买者的议价能力。


## 微观数据分析

由于业务数据指标往往是由多个微观原因引起的，上面的方法难以定位这类问题（如“订单量为什么下降”）的根本原因，这时候就需要运用其他微观数据分析方法。

### 逻辑树分析法

逻辑树分析方法是把复杂问题拆解成若干个简单的子问题，然后像树枝那样逐步展开。

### 多维度拆解法

假设在每个医院最近收治的1000例患者中，A医院有900例患者存活。然而，B医院只有800例患者存活（如下图）。这样看起来，A医院的存活率更高，应该选择A医院。你的选择真的是正确的吗？

### 对比方法


1）什么是对比方法

数据分析中，我们通过对比分析方法，来追踪业务是否有问题。例如，我的CTR是4%，你说是高还是低？这个CTR有问题吗？这时候，就需要用对比分析方法来追踪业务是不是有问题。正所谓，没有对比就没有好坏。

心理学家给这种现象发明了一个术语叫作价格锚定，也就是通过和价格锚点对比，一些商品会卖得更好。

2）与谁比

与谁比一般分为两种：与自己比，与行业比。

3）如何比较

一般从3个维度比较：数据整体的大小、数据整体的波动、趋势变化。
- a）数据整体的大小：某些指标可用来衡量整体数据的大小。常用的是平均值、中位数，或者某个业务指标。
- b）数据整体的波动：标准差除以平均值得到的值叫作变异系数。变异系数可用来衡量整体数据的波动情况。
- c）趋势变化：趋势变化是从时间维度来看数据随着时间发生的变化。常用的方法是时间折线图，环比和同比。
  - 时间折线图是以时间为横轴、数据为纵轴绘制的折线图。从时间折线图上可以了解数据从过去到现在发生了哪些变化，还可以通过过去的变化预测未来的动向。
  - 环比是和上一个时间段对比，用于观察短期的数据集。例如某数据在2020年12月比2020年11月下降10%。
  - 同比是与去年同一个时间段进行对比，用于观察长期的数据集。例如某数据在2020年12月比2019年12月下降10%。

### 假设检验分析法


1）什么是假设检验分析法

假设检验分析方法分为3步：
- 提出假设：根据要解决的问题，提出假设。例如警察破案的时候会根据犯罪现场提出假设：这个人有可能是嫌疑人。
- 收集证据：通过收集证据来证明。例如警察通过收集嫌疑犯的犯罪数据，来作为证据。
- 得出结论：这里的结论不是你主观猜想出来的，而是依靠找到的证据得到的结论。例如警察不能主观地去猜想，然后下结论说这个人是罪犯，而是要通过收集的数据（证据）来证明这个人是不是罪犯。

2）假设检验分析方法有什么用

由于假设检验分析方法背后的原理是逻辑推理，所以学会这个方法以后，可以显著提高我们的逻辑思维能力。

假设检验分析方法的另一个作用是可以分析问题发生的原因，也叫作归因分析。例如是什么原因导致活跃率下降、CTR下降、订单量下降等。这类问题就是分析原因，通过找到问题发生的原因，才能根据原因制定对应的策略。

3）如何使用假设检验分析方法？

我们可以按用户、产品、竞品这3个维度提出假设（如下图），来检查提出的假设是否有遗漏。这3个维度分别对应公司的3个部门：用户对应运营部，产品对应产品部，竞品对应市场部。这3个维度有助于在发现问题原因以后，对应落实到具体部门上，有利于把问题说清楚。还可以从**4P营销理论**出发来提出假设。

### 相关分析


1）什么是相关分析法


时候我们研究的问题只有一种数据，例如人的身高；但是，还有另外一些问题需要研究多种数据，例如身高和体重之间的关系。当我们研究两种或者两种以上的数据之间有什么关系的时候，就要用到相关分析。如果两种数据之间有关系，叫作有相关关系；如果两种数据之间没有关系，叫作没有相关关系。

我们看一个例子。某个地区的用户在搜索引擎里搜的信息，和这个地区房价有什么关系呢？

谷歌首席经济学家哈尔·瓦里研究发现，如果更多人搜索“八成按揭贷款”，或者“涨幅”“涨价的速度”，这个地区的房价就会上涨；如果更多人搜索“快速卖房的流程”或者“按揭超过房价”，这个地区的房价就会下跌。也就是说，用户在搜索引擎里搜的信息和这个地区的房价有相关关系。

2）相关分析方法有什么用？


相关分析的作用有以下三点：
- 在研究两种或者两种以上数据之间有什么关系，或者某个事情受到其他因素影响的问题时，可以使用相关分析，以量化两个量的相关性。例如在分析产品的各个功能对产品用户留存的影响时，就可以使用相关分析，得出各个功能与产品用户留存的相关性。
- 在解决问题的过程中，相关分析可以帮助我们扩大思路和找到优先级，将视野从一种数据扩大到多种数据，扩展经验之外的因素，另外就是找到问题后可以根据相关性找到各个影响因素的重要性，进而先解决相关性高的主要问题。举个例子，在分析“为什么销量下降”的过程中，可以研究哪些因素和销售量有关系，例如产品价格、售后服务等。使用相关分析，可以知道哪些因素影响销量，哪些对销量没有影响，从而快速锁定问题的原因。
- 相关分析通俗易懂。这在实际工作中很重要，因为数据分析的结果需要得到其他人的理解和认可，所以要方便大家沟通。很多分析方法看上去很高端，但是没有相关知识的人不容易理解。而相关分析通俗易懂，你不需要向对方解释什么是“相关”的含义及分析结果的意义，对方也能够理解。


3）相关系数的含义？


相关系数数值的正负可以反映两种数据之间的相关方向，也就是说两种数据在变化过程中是同方向变化，还是反方向变化。

相关系数的范围是-1～1，-1、0和1这三个值是相关系数的极值（如下图），下面解释一下相关系数的3个极值。假如有两种数据a和b，把这两种数据画在散点图上，横轴用来衡量数据a，纵轴用来衡量数据b。
- 如果相关系数=1，数据点都在一条直线上，表示两种数据之间完全正相关，两种数据是同方向变化。也就是数据a的值越大，数据b的值也会越大。
- 如果相关系数=-1，数据点都在一条直线上，表示两种数据之间完全负相关，两种数据是反方向变化。也就是数据a的值越大，数据b的值反而会越小。
- 如果相关系数=0，表明两种数据之间不是线性相关，但有可能是其他方式的相关（例如曲线方式）。
- 如果相关系数>0，说明两种数据是正相关，是同方向变化，也就是一种数据的值越大，另一种数据的值也会越大；如果相关系数<0，说明两种数据是负相关，是反方向变化，也就是一种数据的值越大，另一种数据的值反而会越小，如下图所示。

6）区别相关关系和因果关系


### 群组分析


1）什么是群组分析法

群组分析方法”（也叫同期群分析方法）是按某个特征，将数据分为不同的组，然后比较各组的数据，说白了就是对数据分组然后来对比。比如按时间划分新用户、按职责划分人群。

2）群组分析的作用

产品会随着时间发布新的版本，产品改版的效果如何？版本更新后用户是增长了，还是流失了？像这类问题，就需要将用户按时间分组，然后比较不同组的用户留存率。所以，群组分析方法常用来分析用户留存率（或者流失率）随时间发生了哪些变化，然后找出用户留下或者离开的原因。


### 漏斗分析法

1）什么是漏斗分析法

待补充

## 数据分析常见技巧

- 【2020-9-29】数据分析知识点：[定性分析和定量分析的根本区别在于](https://www.zhihu.com/question/19603466)
    - ① 画图前想想是定性分析还是定量分析
        - **定性**分析描述性质，侧重结论，如占比，一般用饼图、四分位图等；
            - 分析1:郭小明胃口很大
            - 分析2:郭晓明胃口很小
        - **定量**分析描述量级变化，侧重数字，一般用折线图、曲线图等。
            - 分析1:郭小明一顿可以吃3个Schweinshaxe
            - 分析2:郭小明在吃了3个Schweinshaxe之后还可以吃5个蛋挞
        - ![](https://pic3.zhimg.com/80/v2-d30a8823aa5039fb7d83183fbeaf4ac2_720w.jpg)
        - ![](https://pic3.zhimg.com/80/v2-1fe00ae8f51c1a31fa884a009f302ac6_720w.jpg)
        - ![](https://picb.zhimg.com/80/v2-08a5f625113fc11cac12b7901e933a02_720w.jpg)
    - ② 数据分析三大类：**趋势**、**比较**、**细分**。参考：[数据分析的三个常用方法：数据趋势、对比和细分分析](http://www.woshipm.com/data-analysis/676038.html)
        - 趋势
        - 比较
        - 细分

## 数据驱动

- 摘自：[关于数据驱动增长的四个问题：是什么？为什么？有何用？怎么用？](http://www.woshipm.com/data-analysis/913695.html)
- 数据驱动增长”在2015年开始在国内被人提及，作为“Growth Hacking”的一部分，伴随Growth Hacking概念的流行而逐渐被互联网行业的产品、运营、数据分析人员所接受。

### “增长”是什么？

- 通常认为增长是提升DAU、PV、UV，最好的办法就是多引流量。然而事实是：只有“拉新”，没有“留存”的DAU/PV/UV提升不是增长！
    - 只拉新不留存”的作死姿势
    - ![](http://image.woshipm.com/wp-files/2018/01/6eVxmFqrFsxtfvSLbDEo.png)
- 那增长该怎么定义？
    - DAU、UV这样的指标属于“**虚荣指标**”，关注这些指标很容易误入歧途。
    - 目前对“增长”最好的解释就是“**AARRR**”模型，在有的地方也被称为“**海盗模型**”
    - ![](http://image.woshipm.com/wp-files/2018/01/oZssxYA77e3UE41iTUCw.png)
    - ①**获取**。就是从搜索引擎、应用市场等渠道，获得产品的“访问新用户”。提升的目标要是：渠道的质量、数量、新用户比例等。
    - ②**激活**。完成“体验完整产品”所需的所有前置操作，如注册、购买等，由“访问新用户”变成“使用用户”。
    - ③**留存**。用户认同产品带给他的价值，持续使用产品。由“使用用户”变成“活跃用户”。
    - ④**变现**。通过点击广告、流量售卖、服务付费等方式回收获客成本并盈利。提升的目标要是：付费转化率、客单价等。
    - ⑤**推荐**。用户对产品的价值非常满意，并推荐他人使用。由“活跃用户”转变为“粉丝用户”。
- 这5个核心指标共同构成了增长，5个指标在产品生命周期的不同阶段中有所侧重
    - 探索期更关注“激活”和“留存”
    - 增长期更关注“获取”和“推荐”
    - 稳定期更关注“变现”。
    - ![](http://image.woshipm.com/wp-files/2018/01/lpgaXAs03eSVqn9a7zew.png)

### 数据能为增长带来什么

- “转化漏斗”和“留存图（表）”是分析增长数据不可或缺的2个基础工具，可以应用到AARRR模型的每个阶段。具体来说，可以用“转化漏斗”来衡量渠道质量、激活转化率、付费转化率、推荐转化率，可以用“留存图(表)”来衡量日/周/月的留存率。如图6。
- 这2个基本工具再结合下个小节提到的“用户分群”、“用户细查”等工具，可以让我们通过数据发现AARRR中每一步的提升空间和提升方法，这就是数据为增长带来的价值。
- ![](http://image.woshipm.com/wp-files/2018/01/qvqrgbum3cLpJmE90HPa.png)


### 数据驱动增长需要什么样的工具

- 工欲善其事必先利其器，数据驱动增长需要有具备特定功能的工具。从上一小节可以看出，最常用到的数据工具是以下5个：
    - ①转化漏斗。如图7。用于量化用户在某个功能的一组操作行为中，各个步骤的转化/流失情况，以及产品内各个功能的使用率。
    - ②留存图(表)。如图8。用于分析7日留存、1月后周留存、1年后月留存等数据，可以通过它寻找留存率的提升空间、提升方法，检验产品优化方向的正确性等等。
    - ③用户分群。通过用户行为筛选用户群体，达到标记重要功能的作用。
    - ④用户细查。可以查看某个用户的所有点击和页面浏览行为，是进行定性研究的利器。
    - ⑤来源管理。用于标记用户来源，进而可以分析各渠道的转化率、留存率、新用户占比等流量质量指标。

### 数据驱动增长的局限性

- 没有数据是万万不能的，但是数据也不是万能的！
- 数据驱动的2个局限性：
    - ①数据很难启发重大创新。
    - ②某些问题压根没有数据可供分析。
- 除了数据驱动之外，产品的优化一定还要依赖其他驱动力。

# 数据库

## MySQL

- [PostgreSQL学习笔记](http://www.cnblogs.com/stephen-liu74/archive/2012/06/08/2315679.html)

python使用mysql方法

### mysql安装方法

- 【2021-6-17】[mysql官方下载](https://dev.mysql.com/downloads/mysql/)，适配各种操作系统，含UI界面工具workbench
  - [mac下安装MySQL指南](https://www.jianshu.com/p/83c0afe1bd16)，[linux下安装指南](https://www.cnblogs.com/shenjianping/p/10984540.html), [linux下mysql的安装与使用](https://www.cnblogs.com/shenjianping/p/10984540.html)

```shell
# 下载mysql包
# 解压，如果是tar.xz文件，使用xz -d命令解压
tar -xzvf  mysql-5.7.26-linux-glibc2.12-x86_64.tar.gz -C /usr/local/
# 创建用户和组
groupadd mysql
useradd -r -g mysql mysql
# 将安装目录所有者及所属组改为mysql
chown -R mysql.mysql /usr/local/mysql
# 创建data目录
 mkdir data #进入mysql文件夹
# 
yum install libaio
/usr/local/mysql/bin/mysqld --user=mysql --basedir=/usr/local/mysql/ --datadir=/usr/local/mysql/data --initialize
```

### 连接mysql

shell 代码，shell脚本中调用sql脚本
```shell
#mysql初始化-shell
mysql=/usr/local/mysql/bin/mysql
$mysql -uroot -pwqw  < init.sql
```
或者shell脚本中直接执行sql
```shell
mysql=/usr/local/mysql/bin/mysql
$mysql -uroot -p123456 <<EOF  
source /root/temp.sql;  
select current_date();  
delete from tempdb.tb_tmp where id=3;  
select * from tempdb.tb_tmp where id=2;  
EOF
```

## PostGreSQL

- [PostgreSQL学习笔记](http://www.cnblogs.com/stephen-liu74/archive/2012/06/08/2315679.html)

# 分析工具

## 爬虫

### python抓取链接二手房数据
- [链家二手房数据分析](https://zhuanlan.zhihu.com/p/25132058)
- [scrapy爬链家成都房价并可视化](https://github.com/happyte/buyhouse)
- [抓知乎爬虫](http://www.csuldw.com/2016/11/05/2016-11-05-simulate-zhihu-login/)
- 【2019-11-24】[链家房源爬虫及可视化](https://www.toutiao.com/a6762317941271691788/?timestamp=1574491642&app=news_article_lite&group_id=6762317941271691788&req_id=2019112314472101002607901601D1CD43),[github](https://github.com/XuefengHuang/lianjia-scrawler)

## json使用

### shell中使用json
- #[2016-12-31] shell中使用json
- 安装：
> pip install git+https://github.com/dominictarr/JSON.sh#egg=JSON.sh

- 使用：
```shell
echo '{"a":2,"b":[3,6,8]}' |JSON.sh
```
详情参考：https://github.com/dominictarr/JSON.sh


## Python工具包

命令：
- mysql -h10.26.21.38 -utest -p123

两个工具包：
- MySQLdb：MySQLdb（MySQL-python）仅支持python2
- pymysql：MySQL-python不支持py3，可以pip install pymysql代替

要想使python可以操作mysql，就需要MySQL-python驱动，它是python 操作mysql必不可少的模块。
- [下载地址](https://pypi.python.org/pypi/MySQL-python/)
- 下载MySQL-python-1.2.5.zip 文件之后直接解压。
- 进入MySQL-python-1.2.5目录:

```shell
python setup.py install
```

```python
#!pip install mysqldb
#!/usr/bin/python
# -*- coding: UTF-8 -*-
import MySQLdb
# 打开数据库连接
db = MySQLdb.connect("localhost", "testuser", "test123", "TESTDB", charset='utf8' )
# 使用cursor()方法获取操作游标 
cursor = db.cursor()
# 使用execute方法执行SQL语句
cursor.execute("SELECT VERSION()")
# 使用 fetchone() 方法获取一条数据
data = cursor.fetchone()
print("Database version : %s " % data)
# 关闭数据库连接
db.close()
```

[mysqldb使用方法](https://www.runoob.com/python/python-mysql.html)

【2021-7-8】[pymysql使用教程](https://www.cnblogs.com/sui776265233/p/9353148.html)

```python
import pymysql
 
# 连接database
conn = pymysql.connect(
    host='10.26.21.38',
    user='test',password='123456',
    #database='test',
    charset='utf8')
# 得到一个可以执行SQL语句的光标对象
cursor = conn.cursor()  # 执行完毕返回的结果集默认以元组显示
# 得到一个可以执行SQL语句并且将结果作为字典返回的游标
#cursor = conn.cursor(cursor=pymysql.cursors.DictCursor)
# 定义要执行的SQL语句
sql = """
CREATE TABLE USER1 (
id INT auto_increment PRIMARY KEY ,
name CHAR(10) NOT NULL UNIQUE,
age TINYINT NOT NULL
)ENGINE=innodb DEFAULT CHARSET=utf8;  #注意：charset='utf8' 不能写成utf-8
"""
#============= 查询数据 ========
sql = "select * from nlp_data_collection.t_intention limit 10"
res = cursor.execute(sql) # 执行SQL语句,只返回条数
print(res) 
#cursor.scroll(1,mode='absolute') # 相对绝对位置移动，第一个参数是相对绝对位置移动的记录条个数
# cursor.scroll(1,mode='relative') # 相对当前位置移动，第一个参数是相对当前位置移动的记录条个数
#通过fetchone、fetchmany、fetchall拿到查询结果
res1=cursor.fetchone()      #以元组的形式，返回查询记录的结果，默认是从第一条记录开始查询
# res2=cursor.fetchone()    #会接着上一次的查询记录结果继续往下查询
# res3=cursor.fetchone()
# res4=cursor.fetchmany(2)   #查询两条记录会以元组套小元组的形式进行展示
res5=cursor.fetchall()
print(res5)
#============= 插入数据 ========
# 获取一个光标
cursor = conn.cursor()
# 定义要执行的sql语句
sql = 'insert into userinfo(user,pwd) values(%s,%s);'
data = [
    ('july', '147'),
    ('june', '258'),
    ('marin', '369')
]
# 拼接并执行sql语句
rows = cursor.execute(sql,data[0]) # 单条语句
cursor.executemany(sql, data) # 多条语句
print(cursor.lastrowid) # 当前插入的第一条记录
conn.commit() # 涉及写操作要注意提交
#============= 删除数据 ========
cursor = conn.cursor() # 获取一个光标
# 定义将要执行的SQL语句
sql = "delete from userinfo where user=%s;"
name = "june"
cursor.execute(sql, [name]) # 拼接并执行SQL语句
conn.commit() # 涉及写操作注意要提交
#============= 更改数据 ========
cursor = conn.cursor()
# 定义将要执行的SQL语句
sql = "update userinfo set pwd=%s where user=%s;"
# 拼接并执行SQL语句
cursor.execute(sql, ["july", "july"])
conn.commit() # 涉及写操作注意要提交

cursor.close() # 关闭光标对象
conn.close() # 关闭数据库连接
```



## 大数据分析

- Hadoop是基础，其中的HDFS提供文件存储，Yarn进行资源管理。在这上面可以运行MapReduce、Spark、Tez等计算框架。
- MapReduce:是一种离线计算框架，将一个算法抽象成Map和Reduce两个阶段进行处理，非常适合数据密集型计算。
- Spark:Spark是UC Berkeley AMP lab所开源的类Hadoop MapReduce的通用的并行计算框架，Spark基于map reduce算法实现的分布式计算，拥有Hadoop MapReduce所具有的优点；但不同于MapReduce的是Job中间输出和结果可以保存在内存中，从而不再需要读写HDFS，因此Spark能更好地适用于数据挖掘与机器学习等需要迭代的map reduce的算法。
- Storm:MapReduce也不适合进行流式计算、实时分析，比如广告点击计算等。Storm是一个免费开源、分布式、高容错的实时计算系统。Storm令持续不断的流计算变得容易，弥补了Hadoop批处理所不能满足的实时要求。Storm经常用于在实时分析、在线机器学习、持续计算、分布式远程调用和ETL等领域
- Tez: 是基于Hadoop Yarn之上的DAG（有向无环图，Directed Acyclic Graph）计算框架。它把Ｍap/Reduce过程拆分成若干个子过程，同时可以把多个Ｍap/Reduce任务组合成一个较大的DAG任务，减少了Ｍap/Reduce之间的文件存储。同时合理组合其子过程，也可以减少任务的运行时间

### hadoop

- Hadoop1到Hadoop2所做的改变，Hadoop1主要使用MapReduce引擎，到了Hadoop2，基于yarn，可以部署spark，tez等计算引擎，这里MapReduce作为一种引擎实现用的越来越少了，但是作为框架思路，tez本身也是MapReduce的改进。
- ![](https://pic1.zhimg.com/80/v2-0a4c08d42a525a993571fb6c5bc9d590_1440w.jpg)
- MapReduce是一种编程模型，用于大规模数据集（大于1TB）的并行运算。概念"Map（映射）"和"Reduce（归约）"。
- ![](https://images2015.cnblogs.com/blog/16956/201603/16956-20160327104341026-1321810730.jpg)


### hive

- 待定

### spark sql

- SparkSql常用命令操作
1. 进入spark-shell模式
    - spark-shell --master yarn --executor-memory 4g --num-executors 3 --executor-cores 4
2. spark sql查询Hive数据库
    - import spark.sql
    - sql("use database_name”)
    - sql("show tables").show
3. 读取hdfs文件数据
    - val data = spark.read.format("csv").option("sep", ",").option("header","true").load("file_path + file_name")
4. 存储文件(默认hdfs路径)
    - data.write.format("csv").save("/data/....")
5. 读取hive表数据
    - val res = spark.sql("select * from  table_1 where day='20181230'")
6. 注册成表
    - res.registerTempTable(“Res")
7. 更换属性
    - val ss = data.selectExpr("_c0 as like","_c1 as session_id","_c2 as uid1”)
8. 删除某列属性
    - val s1 = data.drop("_c0”)
9. 一列转换成多列
    - val df2 =df1.withColumn("_corrupt_record",split(col("_corrupt_record"),","))
    - .select(col("_corrupt_record").getItem(0).as("uid"),col("_corrupt_record").getItem(1).as("number")) 
10. 过滤数字(三个横线)
    - val uid = df2.filter($"number"===1)
11. 过滤空值
    - val s_1 = res.filter("like is not null").filter("session_id is not null”)


- Spark SQL CLI是一个很方便的工具，可以用来在本地模式下运行Hive的元数据服务，并且通过命令行执行针对Hive的SQL查询。但是要注意的是，Spark SQL CLI是不能与Thrift JDBC server进行通信的。如果要启动Spark SQL CLI，只要执行Spark的bin目录下的spark-sql命令即可
- sh ./bin/spark-sql --jars /usr/local/hive/lib/mysql-connector-java-5.1.17.jar
- 同样要注意的是，必须将我们的hive-site.xml文件放在Spark的conf目录下。也可以通过执行./bin/spark-sql --help命令，来获取该命令的所有帮助选项。
- spark sql命令模板


```sql
spark-sql 
--conf spark.scheduler.listenerbus.eventqueue.size=90000000
--driver-cores 4 
--driver-memory 10g 
--executor-memory 80g 
--num-executors 40 
--executor-cores 20 
--master yarn << EOF
**HIVESQL**
EOF
```

### Tez

- Tez是Apache开源的支持DAG作业的计算框架，它直接源于MapReduce框架，核心思想是将Map和Reduce两个操作进一步拆分，即Map被拆分成Input、Processor、Sort、Merge和Output， Reduce被拆分成Input、Shuffle、Sort、Merge、Processor和Output等，这样，这些分解后的元操作可以任意灵活组合，产生新的操作，这些操作经过一些控制程序组装后，可形成一个大的DAG作业。总结起来，Tez有以下特点：
    - （1）Apache二级开源项目（源代码今天发布的）
    - （2）运行在YARN之上
    - （3） 适用于DAG（有向图）应用（同Impala、Dremel和Drill一样，可用于替换Hive/Pig等）
    - ![](https://images2015.cnblogs.com/blog/16956/201603/16956-20160327150439042-1656855042.jpg)
- MapReduce模型虽然很厉害，但不够灵活，一个简单的join都需要很多骚操作才能完成，又是加标签又是笛卡尔积。那有人就说我就是不想这么干那怎么办呢？Tez应运起，图飞入MR。
    - [Tez简介](https://zhuanlan.zhihu.com/p/79384822)
- Tez采用了DAG（有向无环图）来组织MR任务（DAG中一个节点就是一个RDD，边表示对RDD的操作）。它的核心思想是把将Map任务和Reduce任务进一步拆分，Map任务拆分为Input-Processor-Sort-Merge-Output，Reduce任务拆分为Input-Shuffer-Sort-Merge-Process-output，Tez将若干小任务灵活重组，形成一个大的DAG作业。
    - 图中蓝色框表示Map任务，绿色框表示Reduce任务，云图表示写动作，可以看出，Tez去除了MR中不必要的写过程和Map，形成一张大的DAG图，在数据处理过程中没有网hdfs写数据，直接向后继节点输出，从而提升了效率。
- ![](https://pic4.zhimg.com/80/v2-ee3a5c71c8fb8b452edc5b8c3394374f_1440w.jpg)

- TEZ的构成
- Tez对外提供了6种可编程组件，分别是：
    - Input：对输入数据源的抽象，它解析输入数据格式，并吐出一个个Key/value
    - Output：对输出数据源的抽象，它将用户程序产生的Key/value写入文件系统
    - Paritioner：对数据进行分片，类似于MR中的Partitioner
    - Processor：对计算的抽象，它从一个Input中获取数据，经处理后，通过Output输出
    - Task：对任务的抽象，每个Task由一个Input、Ouput和Processor组成
    - Maser：管理各个Task的依赖关系，并按顺依赖关系执行他们
- 除了以上6种组件，Tez还提供了两种算子，分别是Sort（排序）和Shuffle（混洗），为了用户使用方便，它还提供了多种Input、Output、Task和Sort的实现，具体如下：
    - Input实现：LocalMergedInput（文件本地合并后作为输入），ShuffledMergedInput（远程拷贝数据且合并后作为输入）
    - Output实现：InMemorySortedOutput（内存排序后输出），LocalOnFileSorterOutput（本地磁盘排序后输出），OnFileSortedOutput（磁盘排序后输出）
    - Task实现：RunTimeTask（非常简单的Task，基本没做什么事）
    - Sort实现：DefaultSorter（本地数据排序），InMemoryShuffleSorter（远程拷贝数据并排序）

### Zeppelin是什么?

![](https://img-blog.csdn.net/20170518170538169)

- 【2020-12-24】[一篇全面的zepplin教程](https://blog.csdn.net/jin6872115/article/details/83501359)
- [zeppelin 安装使用，测试spark，spark sql](https://blog.csdn.net/feloxx/article/details/72476661)
- [Apache Zeppelin](http://zeppelin.apache.org/)是一款基于Web的Notebook(类似于jupyter notebook)，支持交互式地数据分析。
- Zeppelin可实现你所需要的：
    - 数据采集
    - 数据发现
    - 数据分析
    - 数据可视化和协作
    - 支持多种语言，默认是Scala(背后是Spark shell)，SparkSQL, Markdown ，SQL，Shell，Markdown和Python等,Apache Zeppelin提供内置的Apache Spark集成。您不需要为其构建单独的模块，插件或库。
- 安装
    - [下载地址](https://mirror.bit.edu.cn/apache/zeppelin/zeppelin-0.9.0-preview2/zeppelin-0.9.0-preview2-bin-all.tgz)
    - ![](https://img-blog.csdn.net/20170518170540748)
    - ![](https://img-blog.csdn.net/20170518170543185)
- 配置
    - zeppelin-site.xml: 修改端口
    - zeppelin-env.sh: 修改Hadoop、spark配置等
- 启动
    - ./zeppelin-daemon.sh start
- 使用
    - ![](https://img-blog.csdn.net/20170518170548373)
    - ![](http://static.oschina.net/uploads/space/2016/0224/165936_Qu4p_1018641.jpg)


- 语言

```c
%spark
println("Hello "+z.input("name"))
```

### storm

- 待定


### clickhouse

- 【2021-4-19】[ClickHouse](https://clickhouse.tech/docs/zh/)是一个用于联机分析(OLAP)的列式数据库管理系统(DBMS)
- 行式存储: 传统的行式数据库系统中,处于同一行中的数据总是被物理的存储在一起。
  - 常见的行式数据库系统有：MySQL、Postgres和MS SQL Server。
  - ![](https://clickhouse.tech/docs/zh/images/row-oriented.gif)
- 列式存储: 来自不同列的值被单独存储，来自同一列的数据被存储在一起
  - 常见的列式数据库有： Vertica、 Paraccel (Actian Matrix，Amazon Redshift)、 Sybase IQ、 Exasol、 Infobright、 InfiniDB、 MonetDB (VectorWise， Actian Vector)、 LucidDB、 SAP HANA、 Google Dremel、 Google PowerDrill、 Druid、 kdb+
  - ![](https://clickhouse.tech/docs/zh/images/column-oriented.gif)
- 列式数据库更适合于OLAP场景(对于大多数查询而言，处理速度至少提高了100倍)，下面详细解释了原因(通过图片更有利于直观理解)
- 语法
  - ck里的SQL语法不太一样，[json用法](https://clickhouse.tech/docs/zh/sql-reference/functions/json-functions/)，hive里的get_json_object → visitParamExtractRaw

```sql
SELECT
	room_id, agent_id, pt, action, 
    visitParamExtractRaw(message, 'phase') as phase,
    visitParamExtractRaw(visitParamExtractRaw(message, 'session'), 'utterance') as utterance,
    message
	--,room_id,get_json_object(message, '$.housedel_id') as housedel_id
--from spider_ods.spider_ods_swh_log_all_wa

from spider.spider_pm_agent_log_di_all
WHERE pt = '2021-04-01'
    AND business_name = 'vr_practice'
    AND action='3021' -- gds_asr响应, 3010 gds init请求
    -- AND get_json_object(message, '$.level') = "normal"
    -- AND city_id='110000'
  	-- AND room_id = '1800210355'
    -- AND agent_id = '20091125'
limit 100
```

### Kafka

【2021-5-23】[Kafka原理篇：图解kafka架构原理](https://www.toutiao.com/i6965046292519076384/)
- Kafka 架构设计哲学和原理
- Kafka 中 zookeeper 的作用
- Kafka Controller 实现原理
- Kafka Network 原理

![](https://p6-tt.byteimg.com/origin/pgc-image/c1a01e62d7e24f3c97007a84c4b8e0fe?from=pc)

### Zookeeper

Zookeeper 是一个成熟的分布式协调服务，它可以为分布式服务提供分布式配置服、同步服务和命名注册等能力.。对于任何分布式系统，都需要一种协调任务的方法。Kafka 是使用 ZooKeeper 而构建的分布式系统。但是也有一些其他技术（例如 Elasticsearch 和 MongoDB）具有其自己的内置任务协调机制。

Kafka 将 Broker、Topic 和 Partition 的元数据信息存储在 Zookeeper 上。通过在 Zookeeper 上建立相应的数据节点，并监听节点的变化，Kafka 使用 Zookeeper 完成以下功能：
- Kafka Controller 的 Leader 选举
- Kafka 集群成员管理
- Topic 配置管理
- 分区副本管理

![](https://p3-tt.byteimg.com/origin/pgc-image/d1116d42b06f4c438f10c947f31daf8c?from=pc)

# [数据的游戏：冰与火](https://coolshell.cn/articles/10192.html)

- 【2013-7-31】陈皓（左耳朵耗子）
![](https://coolshell.cn/wp-content/uploads/2013/07/game-of-thrones-300x206.jpg)

我对数据挖掘和机器学习是新手，从去年7月份在Amazon才开始接触，而且还是因为工作需要被动接触的，以前都没有接触过，做的是需求预测机器学习相关的。后来，到了淘宝后，自己凭兴趣主动地做了几个月的和用户地址相关数据挖掘上的工作，有一些浅薄的心得。下面这篇文章主要是我做为一个新人仅从事数据方面技术不到10个月的一些心得，也许对你有用，也许很傻，不管怎么样，欢迎指教和讨论。
 
另外，注明一下，这篇文章的标题模仿了一个美剧《[权力的游戏：冰与火之歌](http://movie.douban.com/subject/3016187/)》。在数据的世界里，我们看到了很多很牛，很强大也很有趣的案例。但是，**数据就像一个王座一样，像征着一种权力和征服，但登上去的路途一样令人胆颤**。
 
## 数据挖掘中的三种角色
 
在Amazon里从事机器学习的工作时，我注意到了Amazon玩数据的三种角色。
*  **Data Analyzer：数据分析员**。这类人的人主要是分析数据的，从数据中找到一些规则，并且为了数据模型的找不同场景的Training Data。另外，这些人也是把一些脏数据洗干净的的人。
*   **Research Scientist：研究科学家**。这种角色主要是根据不同的需求来建立数据模型的。他们把自己戏称为不近人间烟火的奇异性物种，就像《生活大爆炸》里的 那个Sheldon一样。这些人基本上玩的是数据上的科学
*   **Software Developer ：软件开发工程师**。主要是把 Scientist 建立的数据模型给实现出来，交给Data Analyzer去玩。这些人通常更懂的各种机器学习的算法。

我相信其它公司的做数据挖掘或是机器学习的也就这三种工作，或者说这三种人，对于我来说，
*   **最有技术含量的是 Scientist**，因为数据建模和抽取最有意义的向量，以及选取不同的方法都是这类人来决定的。这类人，我觉得在国内是找不到的。
*   **最苦逼，也最累，但也最重要的是Data Analyzer**，他们的活也是这三个角色中最最最重要的（注意：我用了三个最）。因为，无论你的模型你的算法再怎么牛，在一堆烂数据上也只能干出一堆垃圾的活来。正所谓：*Garbage In, Garbage Out ！*但是这个活是最脏最累的活，也是让人最容易退缩的活。
*   **最没技术含量的是Software Developer**。现在国内很多玩数据的都以为算法最重要，并且，很多技术人员都在研究机器学习的算法。错了，最重要的是上面两个人，一个是苦逼地洗数据的Data Analyzer，另一个是真正懂得数据建模的Scientist！而像什么[K-Means](https://coolshell.cn/articles/7779.html "K-Means 算法")，[K Nearest Neighbor](https://coolshell.cn/articles/8052.html "K Nearest Neighbor 算法")，或是别的什么贝叶斯、回归、决策树、随机森林等这些玩法，都很成熟了，而且又不是人工智能，说白了，这些算法在机器学习和数据挖掘中，似乎就像Quick Sort之类的算法在软件设计中基本没什么技术含量。当然，我不是说算法不重要，我只想说这些算法在整个数据处理中是最不重要的。
    
 
## 数据的质量
 
- 目前所流行的Buzz Word——`大数据`是相当误导人的。在我眼中，<font color='red'>数据不分大小，只分好坏</font>。
- 在处理数据的过程中，我第一个感受最大的就是**数据质量**。下面我分几个案例来说明：
 
### 案例一：数据的标准
 
在Amazon里，所有的商品都有一个唯一的ID，叫ASIN——Amazon Single Identify Number，这个ID是用来标识商品的唯一性的（来自于条形码）。也就是说，无论是你把商品描述成什么样，只要ASIN一样，这就是完完全全一模一样的商品。
 
这样，就不像淘宝一样，当你搜索一个iPhone，会出现一堆各种各样的iPhone，有的叫“超值iPhone”，有的叫“苹果iPhone”，有的叫“智能手机iPhone”，有的叫“iPhone 白色/黑色”……，这些同一个商品不同的描述是商家为了吸引用户。但是带来的问题有两点：
- 1）**用户体验不好**。以商品为中心的业务模型，对于消费者来说，体验明显好于以商家为中心的业务模型。
- 2）**只要你不能正确读懂（识别）数据，你后面的什么算法，什么模型统统没用**。
 
所以，只要你玩数据，你就会发现，**如果数据的标准没有建立起来，干什么都没用。数据标准是数据质量的第一道关卡**，没这个玩意，你就什么也别玩了。所谓数据的标准，为数据做唯一标识只是其中最最基础的一步，数据的标准还单单只是这个，**更重要的是把数据的标准抽象成数学向量，没有数学向量，后面也无法挖掘**。
 
所以，你会看到，**洗数据的大量的工作就是在把杂乱无章的数据归并聚合**，这就是在建立数据标准。这里面绝对少不了人肉的工作。无非就是：
*   聪明的人在数据产生之前就定义好标准，并在数据产生之时就在干数据清洗的工作。
*   一般的人是在数据产生并大量堆积之后，才来干这个事。
 
另外，说一下Amazon的ASIN，这个事从十多年前就开始了，我在Amazon的内网里看到的资料并没有说为什么搞了个这样一个ID，我倒觉得这并不是因为Amazon因为玩数据发现必需建议个商品ID，也许因为Amazon的业务模型就是设计成以“商品为中心”的。今天，这个ASIN依然有很多很多的问题，ASIN一样不能完全保证商品就是一样的，ASIN不一样也不代表商品不一样，不过90%以上的商品是保证的。Amazon有专门的团队Category Team，里面有很多业务人员天天都在拼命地在对ASIN的数据进行更正。
 
### 案例二：数据的准确
 
用户地址是我从事过数据分析的另一个事情。我还记得当时看到那数以亿计的用户地址的数据的那种兴奋。但是随后我就兴奋不起来了。因为地址是用户自己填写的，这里面有很多的坑，都不是很容易做的。

第一个是假/错地址，因为有的商家作弊或是用户做测试。所以地址是错的，
*   比如，直接就输入“该地址不存在”，“13243234asdfasdi”之类的。这类的地址是可以被我的程序识别出来的。
*   还有很难被我的程序所识别出来的。比如：“宇宙路地球小区”之类的。但这类地址可以被人识别出来。
*   还有连人都识别不出来的，比如：“北京市东四环中路23号南航大厦5楼540室”，这个地址根本不存在。

第二个是真地址，但是因为用户写的不标准，所以很难处理，比如：
*   缩写：“建国门外大街” 和 “建外大街”，“中国工商银行”和“工行”……
*   错别字：“潮阳门”，“通慧河”……
*   颠倒：“东四环中路朝阳公园” 和 “朝阳公园 （靠东四环）” ……
*   别名：有的人写的是开发商的小区名“东恒国际”，有的则是写行政的地名“八里庄东里”……

这样的例子多得不能再多了。可见数据如果不准确，会增加你处理的难度。有个比喻非常好，**玩数据的就像是在挖金矿一样，如果含金量高，那么，挖掘的难度就小，也就容易出效果，如果含金量低，那么挖掘的难度就大，效果就差**。
 
上面，我给了两个案例，旨在说明——
- 1）**数据没有大小之分，只有含金量大的数据和垃圾量大的数据之分**。
- 2）**数据清洗是一件多么重要的工作，这也是一件人肉工作量很大的工作。**
 
所以，这个工作最好是在数据产生的时候就一点一滴的完成。
 
有一个观点：
>- 如果数据准确度在60%的时候，你干出来的事，一定会被用户骂！
>- 如果数据准确度在80%左右，那么用户会说，还不错！
>- 只有数据准确度到了90%的时候，用户才会觉得真牛B。

- 但是从数据准确度从80%到90%要付出的成本要比60% 到 80%的付出大得多得多**。
- 大多数据的数据挖掘团队都会止步于70%这个地方。
- 因为，再往后，这就是一件相当累的活。
 
## 数据的业务场景
 
我不知道有多少数据挖掘团队真正意识到了业务场景和数据挖掘的重要关系？我们需要知道，**根本不可能做出能够满足所有业务的数据挖掘和分析模型**。
 
推荐音乐视频，和电子商务中的推荐商品的场景完全不一样。电商中，只要你买了一个东西没有退货，那么，有很大的概率我可以相信你是喜欢这个东西的，然后，对于音乐和视频，你完全不能通过用户听了这首歌或是看了这个视频就武断地觉得用户是喜欢这首歌和这个视频的，所以，我们可以看到，推荐算法在不同的业务场景下的实现难度也完全不一样。
 
说到推荐算法，你是不是和我一样，有时候会对推荐有一种感觉——**推荐就是一种按不同维度的排序的算法**。我个人以为，就提一下推荐这个东西在某些业务场景下是比较Tricky的，比如，推荐有两种（不是按用户关系和按物品关系这两种），
*   一种是`共性化推荐`，结果就是推荐了流行的东西，这也许是好的，但这也许会是用户已知的东西，比如，到了北京，我想找个饭馆，你总是给我推荐烤鸭，我想去个地方，你总是给我推荐天安门故宫天坛（因为大多数人来北京就是吃烤鸭，就是去天安门的），这些我不都知道了嘛，还要你来推荐？另外，共性化的东西通常是可以被水军刷的。
*   另一种是一种是`个性化推荐`，这个需要分析用户的个体喜好，好的就是总是给我我喜欢的，不好的就是也许我的口味会随我的年龄和环境所改变，而且，总是推荐符合用户口味的，不能帮用户发掘新鲜点。比如，我喜欢吃辣的，你总是给我推荐川菜和湘菜，时间长了我也会觉得烦的。

**推荐有时并不是民主投票，而是专业用户或资深玩家的建议；推荐有时并不是推荐流行的，而是推荐新鲜而我不知道的**。你可以看到，不同的业务场景，不同的产品形态下的玩法可能完全不一样，
 
另外，就算是对于同一个电子商务来说，书、手机 和服装的业务形态完全不一样。我之前在Amazon做Demand Forecasting（用户需求预测）——通过历史数据来预测用户未来的需求。
*   对于书、手机、家电这些东西，在Amazon里叫Hard Line的产品，你可以认为是“标品”（但也不一定），预测是比较准的，甚至可以预测到相关的产品属性的需求。
*   但是地于服装这样的叫Soft Line的产品，Amazon干了十多年都没有办法预测得很好，因为这类东西受到的干扰因素太多了，比如：用户的对颜色款式的喜好，穿上去合不合身，爱人朋友喜不喜欢…… 这类的东西太容易变了，买得人多了反而会卖不好，所以根本没法预测好，更别Stock/Vender Manager 提出来的“预测某品牌的某种颜色的衣服或鞋子”。

对于需求的预测，我发现，长期在这个行业中打拼的人的预测是最准的，什么机器学习都是浮云。机器学习只有在你要面对的是成千上万种不同商品和品类的时候才会有意义。
 
**数据挖掘不是人工智能，而且差得还太远。不要觉得数据挖掘什么事都能干，找到一个合适的业务场景和产品形态，比什么都重要**。
 
## 数据的分析结果
 
我看到很多的玩大数据的，基本上干的是数据统计的事，从多个不同的维度来统计数据的表现。最简单最常见的统计就是像网站统计这样的事。比如：PV是多少，UV是多少，来路是哪里，浏览器、操作系统、地理、搜索引擎的分布，等等，等等。
 
唠叨一句，千万不要以为，你一天有十几个T的日志就是数据了，也不要以为你会用Hadoop/MapReduce分析一下日志，这就是数据挖掘了，说得难听一点，你在做的只不过是一个统计的工作。那几个T的Raw Data，基本上来说没什么意义，只能叫日志，连数据都算不上，只有你统计出来的这些数据才是有点意义的，才能叫数据。
 
当一个用户在面对着自己网店的数据的时候，比如：每千人有5个人下单，有65%的访客是男的，18-24岁的人群有30%，等等。甚至你给出了，你打败了40%同类型商家的这样的数据。作为一个商户，面对这些数据时，大多数人的表现是完全不知道自己能干什么？是把网站改得更男性一点，还是让年轻人更喜欢一点？完全不知道所措。
 
只要你去看一看，你会发现，好些好些的数据分析出来的结果，看上去似乎不错，但是其实完全不知道下一步该干什么？
 
所以，我觉得，**数据分析的结果并不仅仅只是把数据呈现出来，而更应该关注的是通过这些数据后面可以干什么？如果看了数据分析的结果后并不知道可以干什么，那么这个数据分析是失败的。**
 
#### 总结
 
综上所述，下面是我觉得数据挖掘或机器学习最重要的东西：
- 1）**数据的质量**。分为数据的标准和数据的准确。数据中的杂音要尽量地排除掉。为了数据的质量，大量人肉的工作少不了。
- 2）**数据的业务场景**。我们不可能做所有场景下的来，所以，业务场景和产品形态很重要，我个人感觉业务场景越窄越好。
- 3）**数据的分析结果**，要让人能看得懂，知道接下来要干什么，而不是为了数据而数据。

搞数据挖掘的人很多，但成功的案例却不多（相比起大量的尝试来说），就目前而言，**我似乎觉得目前的数据挖掘的技术是一种过渡技术，还在摸索阶段**。

另外，好些数据挖掘的团队搞得业务不业务，技术不技术的，为其中的技术人员感到惋惜……
 
不好意思，我只给出了问题，没有建议，这也说明数据分析中有很多的机会……
 
最后，还要提的一个是“**数据中的个人隐私问题**”，这似乎就像那些有悖伦理的黑魔法一样，你要成功就得把自己变得黑暗。是的，**数据就像一个王座一样，像征着一种权力和征服，但登上去的路途一样令人胆颤**。


# 回归分析

- 【2020-12-09】[7种回归分析方法，数据分析师必须掌握](https://zhuanlan.zhihu.com/p/58352024)，代码源自：[五种回归方法的比较](https://www.cnblogs.com/jin-liang/p/9551759.html)
- 各种回归方式有主要有三个度量方式
    - 自变量的个数
    - 因变量的类型
    - 回归线的形状
    - ![](https://pic2.zhimg.com/80/v2-b9205bbba53244dba9692dafe411f27d_720w.jpg)

## 什么是回归分析

- 回归分析是一种预测性的建模技术，它研究的是因变量（目标）和自变量（预测器）之间的关系。

## 线性回归（Linear Regression）

- 因变量是连续的，自变量可以是连续的也可以是离散的，回归线的性质是线性的。
- 线性回归使用最佳的拟合直线（也就是回归线）在因变量（Y）和一个或多个自变量（X）之间建立一种关系。
- 用一个方程式来表示它，即 Y=a+b*X + e，其中a表示截距，b表示直线的斜率，e是误差项。
    - ![](https://pic1.zhimg.com/80/v2-6a7dc02e44d306bb5a90dbf6ff780624_720w.jpg)
- 多元线性回归有（>1）个自变量，而一元线性回归通常只有1个自变量。
- 最小二乘法是拟合回归线最常用的方法。对于观测数据，它通过最小化每个数据点到线的垂直偏差平方和来计算最佳拟合线。因为在相加时，偏差先平方，所以正值和负值没有抵消。
    - ![](https://pic3.zhimg.com/80/v2-d1f57df439896295e079cb5daec7abb2_720w.jpg)
    - ![](https://pic3.zhimg.com/80/v2-ea12ae4dd1a177974c2a38e6f77f82a6_720w.jpg)
- R-square指标来评估模型性能。要点：
    - ● 自变量与因变量之间必须有线性关系。
    - ● 多元回归存在多重共线性，自相关性和异方差性。
    - ● 线性回归对异常值非常敏感。它会严重影响回归线，最终影响预测值。
- 多重共线性会增加系数估计值的方差，使得在模型轻微变化下，估计非常敏感。结果就是系数估计值不稳定，在多个自变量的情况下，可以使用向前选择法，向后剔除法和逐步筛选法来选择最重要的自变量。

- 代码

```python
import numpy as np
import pandas as pd
from sklearn import datasets
from sklearn import metrics
 
data=datasets.load_boston()# load data
 
#定义评估函数
def evaluation(y_true,y_pred,index_name=['OLS']):
    df=pd.DataFrame(index=[index_name],columns=['平均绝对误差','均方误差','r2'])
    df['平均绝对误差']=metrics.mean_absolute_error(y_true, y_pred).round(4)
    df['均方误差']=metrics.mean_squared_error(y_true,y_pred)
    df['r2']=metrics.r2_score(y_true,y_pred)
    return df

df=pd.DataFrame(data.data,columns=data.feature_names)
target=pd.DataFrame(data.target,columns=['MEDV'])

# 可视化分析

import matplotlib.pyplot as plt
import seaborn as sns
sns.set(style="whitegrid", color_codes=True)
 
 
g=sns.pairplot(data[list(data.columns)[:5]], hue='ZN',palette="husl",diag_kind="hist",size=2.5)
for ax in g.axes.flat:
    plt.setp(ax.get_xticklabels(), rotation=45)
plt.tight_layout()

# 相关系数图

cm = np.corrcoef(data[list(data.columns)[:5]].values.T)   #corrcoef方法按行计算皮尔逊相关系数,cm是对称矩阵
#使用np.corrcoef(a)可计算行与行之间的相关系数,np.corrcoef(a,rowvar=0)用于计算各列之间的相关系数,输出为相关系数矩阵。
sns.set(font_scale=1.5)   #font_scale设置字体大小
cols=list(data.columns)[:5]
hm = sns.heatmap(cm,cbar=True,annot=True,square=True,fmt='.2f',annot_kws={'size': 15},yticklabels=cols,xticklabels=cols)
# plt.tight_layout()
# plt.savefig('./figures/corr_mat.png', dpi=300)

```

- 可视化分析
    - ![](https://images2018.cnblogs.com/blog/1345004/201809/1345004-20180905212531559-649798200.png)
- 相关系数图
    - ![](https://images2018.cnblogs.com/blog/1345004/201809/1345004-20180905212639015-1313580620.png)




## 逻辑回归（Logistic Regression）

- 逻辑回归是用来计算“事件=Success”和“事件=Failure”的概率。当因变量的类型属于二元（1 / 0，真/假，是/否）变量时，就应该使用逻辑回归。
- 为什么要在公式中使用对数log呢
    - 因为用是的二项分布（因变量），需要选择一个对于这个分布最佳的连结函数，Logit函数。
    - 通过观测样本的极大似然估计值来选择参数，而不是最小化平方和误差（如在普通回归使用的）
    - ![](https://pic2.zhimg.com/80/v2-4387539def4aec08dd9b03fe45f0c4b1_720w.jpg)
- 要点：
    - ● 它广泛的用于分类问题。
    - ● 逻辑回归不要求自变量和因变量是线性关系。它可以处理各种类型的关系，因为它对预测的相对风险指数OR使用了一个非线性的log转换。
- 为了避免过拟合和欠拟合，我们应该包括所有重要的变量。有一个很好的方法来确保这种情况，就是使用逐步筛选方法来估计逻辑回归。它需要大的样本量，因为在样本数量较少的情况下，极大似然估计的效果比普通的最小二乘法差。
- 自变量不应该相互关联的，即不具有多重共线性。然而，在分析和建模中，我们可以选择包含分类变量相互作用的影响。
- 如果因变量的值是定序变量，则称它为序逻辑回归；
- 如果因变量是多类的话，则称它为多元逻辑回归。

## 多项式回归（Polynomial Regression）

- 对于一个回归方程，如果自变量的指数大于1，那么它就是多项式回归方程。
- 能够建模非线性可分离数据，完全控制特征变量的建模（指定要设置），需要一些背景知识，如果指数选择不当，容易过度拟合。
- 如：y=a+b*x^2
- 虽然可以拟合一个高次多项式并得到较低的错误，但会导致过拟合。
    - ![](https://pic3.zhimg.com/80/v2-a345941ab716e78f178af7ff8bcffd7e_720w.jpg)

- 代码

```python
from sklearn.preprocessing import PolynomialFeatures
 
poly_reg = PolynomialFeatures(degree = 4)
X_Poly = poly_reg.fit_transform(X)
 
lin_reg_2 =linear_model.LinearRegression()
lin_reg_2.fit(X_Poly, y)
 
y_pred=lin_reg_2.predict(poly_reg.fit_transform(X))
 
evaluation(y,y_pred,index_name=['poly_reg'])
```


- 最小二乘法

```python
# （1）statsmodels实现
import statsmodels.api as sm
 
X=df[df.columns].values
y=target['MEDV'].values
 
#add constant
X=sm.add_constant(X)
 
# build model
model=sm.OLS(y,X).fit()
prediction=model.predict(X)
print(model.summary())

# （2）sklearn 实现
from sklearn import linear_model
 
lm = linear_model.LinearRegression()
model = lm.fit(X,y)
 
y_pred = lm.predict(X)
lm.score(X,y)
 
#系数
lm.coef_
#截距
lm.intercept_<br><br>evaluation(y,y_pred)

```


## 逐步回归（Stepwise Regression）

- 适用于处理多个自变量
- 自变量的选择是在一个自动的过程中完成的，其中包括非人为操作。
- 通过观察统计的值，如R-square，t-stats和AIC指标，来识别重要的变量。逐步回归通过同时添加/删除基于指定标准的协变量来拟合模型。
- 下面列出了一些最常用的逐步回归方法：
    - ● 标准逐步回归法做两件事情。即增加和删除每个步骤所需的预测。
    - ● 向前选择法从模型中最显著的预测开始，然后为每一步添加变量。
    - ● 向后剔除法与模型的所有预测同时开始，然后在每一步消除最小显着性的变量。
- 这种建模技术的目的是使用最少的预测变量数来最大化预测能力。这也是处理高维数据集的方法之一。

## 岭回归（Ridge Regression）

- 岭回归分析是一种用于存在**多重共线性**（自变量高度相关）数据的技术。此时，线性回归或多项式回归失效
- 在多重共线性情况下，尽管最小二乘法（OLS）对每个变量很公平，但它们的差异很大，使得观测值偏移并远离真实值。
- 共线性是独立变量之间存在近线性关系。
- 高共线性的存在可以通过几种不同的方式确定：
    - 即使理论上该变量应该与Y高度相关，回归系数也不显着。
    - 添加或删除X特征变量时，回归系数会发生显着变化。
    - X特征变量具有高成对相关性（检查相关矩阵）。


- 岭回归通过给回归估计上增加一个偏差度，来降低标准误差。
- 线性回归方程可以表示为：y=a+ b*x，但完整版：
    - y = a + b*x + e (error term)
    - [error term is the value needed to correct for a prediction error between the observed and predicted value]
    - => y = a+y = a+ b1x1+ b2x2+....+e, for multiple independent variables.
- 线性方程中，预测误差可以分解为2个子分量：偏差+方差。预测错误可能会由这两个分量或者这两个中的任何一个造成。
- 岭回归通过收缩参数λ（lambda）解决多重共线性问题。
    - ![](https://pic1.zhimg.com/80/v2-54eff081197c7d568f82648a961c35a0_720w.jpg)
    - 第一个是最小二乘项，另一个是β2（β-平方）的λ倍，其中β是相关系数。为了收缩参数把它添加到最小二乘项中以得到一个非常低的方差。
- 要点
    - 除常数项以外，这种回归的假设与最小二乘回归类似；它收缩了相关系数的值，但没有达到零，这表明它没有特征选择功能，这是一个正则化方法，并且使用的是L2正则化。
    - 回归的假设与最小二乘回归类似，但没有正态性假设。
    - 它会缩小系数的值，但不会达到零，这表明没有特征选择功能

- 代码

```python
from sklearn.linear_model import Ridge
 
ridge_reg = Ridge(alpha=1, solver="cholesky")
ridge_reg.fit(X, y)
 
y_pred=ridge_reg.predict(X
 
evaluation(y,y_pred,index_name='ridge_reg')
```


## 套索回归（Lasso Regression）

- 类似于岭回归。Lasso （Least Absolute Shrinkage and Selection Operator）也会惩罚回归系数的绝对值大小。此外，它能够减少变化程度并提高线性回归模型的精度
    - ![](https://pic1.zhimg.com/80/v2-eb2d9b0947e46650714aae8e2555d4f0_720w.jpg)
- Lasso 回归与Ridge回归有一点不同，它使用的惩罚函数是绝对值，而不是平方。这导致惩罚（或等于约束估计的绝对值之和）值使一些参数估计结果等于零。使用惩罚值越大，进一步估计会使得缩小值趋近于零。这将导致我们要从给定的n个变量中选择变量。
- 要点：
    - ● 除常数项以外，这种回归的假设与最小二乘回归类似；
    - ● 它收缩系数接近零（等于零），确实有助于特征选择；
    - ● 这是一个正则化方法，使用的是L1正则化；
- 如果预测的一组变量是高度相关的，Lasso 会选出其中一个变量并且将其它的收缩为零。

- L2和L1正则化的属性差异：
    - **内置特征选择**：经常被提及为L1范数的有用属性，而L2范数则不然。这实际上是L1范数的结果，它倾向于产生稀疏系数。例如，假设模型有100个系数，但 - 只有10个系数具有非零系数，这实际上是说“其他90个预测变量在预测目标值方面毫无用处”。 L2范数产生非稀疏系数，因此不具有此属性。因此，可以说  - Lasso回归做了一种“参数选择”，因为未选择的特征变量的总权重为0。
    - **稀疏性**：指矩阵（或向量）中只有极少数条目为非零。 L1范数具有产生许多具有零值的系数或具有很少大系数的非常小的值的特性。这与Lasso执行一种特    - 征选择的前一点相关联。
    - **计算效率**：L1范数没有解析解，但L2有。在计算上可以有效地计算L2范数解。然而，L1范数具有稀疏性属性，允许它与稀疏算法一起使用，这使得计算在计算上更有效。
- 代码

```python
from sklearn.linear_model import Lasso
 
lasso_reg = Lasso(alpha=0.1)
lasso_reg.fit(X, y)
y_pred=lasso_reg.predict(X)
evaluation(y,y_pred,index_name='lasso_reg')
```



## 弹性网络回归（ElasticNet）

- ElasticNet是Lasso和Ridge回归技术的混合体。它使用L1来训练并且L2优先作为正则化矩阵。当有多个相关的特征时，ElasticNet是很有用的。Lasso 会随机挑选他们其中的一个，而ElasticNet则会选择两个。
    - ![](https://pic2.zhimg.com/80/v2-907891553373b212b1f280aeed728e15_720w.jpg)
- Lasso和Ridge之间的实际的优点是，它允许ElasticNet继承循环状态下Ridge的一些稳定性。
- 要点：
    - ● 在高度相关变量的情况下，它会产生群体效应；
    - ● 选择变量的数目没有限制；
    - ● 它可以承受双重收缩。
- 代码

```python
enet_reg = linear_model.ElasticNet(l1_ratio=0.7)
enet_reg.fit(X,y)
 
y_pred=enet_reg.predict(X)
evaluation(y,y_pred,index_name='enet_reg ')
```

- 除了这7个最常用的回归技术，你也可以看看其他模型，如Bayesian、Ecological和Robust回归。


## 如何正确选择回归模型？

- 可选择的越多，选择正确的一个就越难。

- 在多类回归模型中，基于自变量和因变量的类型，数据的维数以及数据的其它基本特征的情况下，选择最合适的技术非常重要。
- 关键因素
    1. 数据探索是构建预测模型的必然组成部分。在选择合适的模型时，比如识别变量的关系和影响时，它应该首选的一步。
    2. 比较适合于不同模型的优点，我们可以分析不同的指标参数，如统计意义的参数，R-square，Adjusted R-square，AIC，BIC以及误差项，另一个是Mallows' Cp准则。这个主要是通过将模型与所有可能的子模型进行对比（或谨慎选择他们），检查在你的模型中可能出现的偏差。
    3. 交叉验证是评估预测模型最好额方法。在这里，将你的数据集分成两份（一份做训练和一份做验证）。使用观测值和预测值之间的一个简单均方差来衡量你的预测精度。
    4. 如果你的数据集是多个混合变量，那么你就不应该选择自动模型选择方法，因为你应该不想在同一时间把所有变量放在同一个模型中。
    5. 它也将取决于你的目的。可能会出现这样的情况，一个不太强大的模型与具有高度统计学意义的模型相比，更易于实现。
    6. 回归正则化方法（Lasso，Ridge和ElasticNet）在高维和数据集变量之间多重共线性情况下运行良好。


## 广义线性模型

- 【2020-12-09】[广义线性模型(GLM)从人话到鬼话连篇](https://zhuanlan.zhihu.com/p/110268967)
- 了解一个模型的顺序是：
    - 1）为什么要用这个模型解决问题？
    - 2）这个模型是什么，可以解决什么问题？
    - 3）模型怎么用？
    - 4）应用领域是什么？解决了哪些问题？
    - 5）模型的归档与应用划分？

- 普通线性模型对数据有着诸多限制，真实数据并不总能满足。而广义线性模型正是克服了很多普通线性模型的限制。在笔者的心里，广义模型能解决的问题种类比普通线性模型多很多，用图来表示，大概就是这样的
    - ![](https://pic1.zhimg.com/80/v2-bb998b54c5dd2dc74312cadf2a249f80_720w.jpg)
    - ![](https://pic4.zhimg.com/80/v2-e344534f6df459bac9955bc60d701753_720w.jpg)
- 广义线性模型的本质，从广义线性模型的三个要素——线性预测、随机性、联系函数入手，在理论层面系统深入地了解广义线性模型。
    - **线性预测**：各路线性模型的共同点。
        - 「线性」指的是多个自变量的「线性组合」对模型预测产生贡献，也叫做线性预测，具有类似于下面的形式
        - ![](https://pic1.zhimg.com/80/v2-0688de8befb39471dc8d5fed1f5fdbc8_720w.png)
        - 统计模型中的β0、β1、β2等是模型的参数，类似音箱上的按钮。虽然拧每一个旋钮达到的效果不同，可能β0管的是低音炮部分，β1管的是中音区，β2管的是高音区，模型里面需要这么多参数也是为了控制各种自变量对因变量的影响的。
        - 为什么各种常用的模型都选择线性预测？统计模型寻找最优参数其实就是调节音量，使用线性预测使得β0、β1、β2这些参数改变的值与预测的结果的改变值成正比，这样才能有效地找到最佳参数。
    - **随机性** — 统计模型的灵魂
        - 建立模型时，希望能准确地抓住自变量与因变量之间的关系，但是当因变量能够100%被自变量决定时，这时候反而没有统计模型什么事了。
        - 统计模型的威力就在于帮助我们从混合着噪音的数据中找出规律。
        - 怎样从具有随机性的数据中找到自变量和因变量之间的关系？测量随机误差也是有规律的。在测量不存在系统性的偏差的情况下，测量到的加速度会以理论值为平均值呈正态分布。抓住这一统计规律，统计模型就能帮我们可以透过随机性看到自变量与因变量之间的本质联系，找出加速度与受力大小的关系。如果不对自变量的随机性加以限制，再好的统计模型也无可奈何。
        - 实际应用中，y的随机性远不止测量误差，也有可能是影响y值变化的一些变量没有包含在模型中。
        - 统计模型并不在意y的随机性是由什么产生的：统计模型把因变量y中不能被模型解释的变化都算在误差项里面，并且通过对误差作出合理的假设，帮助我们找到自变量与因变量之间内在的关系。
        - 误差项得满足什么样的分布？
            - 1）普通线性模型的基本假设之一是误差符合方差固定的正态分布（高斯分布）
                - ![](https://pic4.zhimg.com/80/v2-7dd763ac145d2a927b23f322b78fa40b_720w.png)
                - 普通线性模型中的方差不随自变量x取值的变化而变化。线性回归模型假设误差项 ε 服从平均值为 0，方差为 σ2 的正态分布，而且方差的大小不随着预测变量 x 值改变，也叫做同方差性（Homoscedasticity）。换句话说，同方差性就是指误差项的方差是一个常数，与实验条件无关。
                - 当误差项ε不再满足正太分布，或者误差项的方差会随着x的变化而变化的时候，普通线性模型就不够用了。改用广义线性模型
                - 正态分布的数据是连续的，对称的，并在整个数字线上定义。这意味着任何离散，不对称或只能在有限范围内使用的数据，实际上都不应使用线性回归建模。广义线性模型专门设计用于非正态数据
            - 2）逻辑回归
                - ![](https://pic2.zhimg.com/80/v2-19a92938032c1709e3133d7c3108112d_720w.jpg)
                - y的随机性恰好被y的平均值刻画了，与普通线性回归完全不一样，模型的预测值同时也决定了方差
            - 3) 泊松回归
                - 因变量是整数变量情形的泊松回归
                - ![](https://pic1.zhimg.com/80/v2-2b888324c7ec264f05c89c206771589c_720w.jpg)
                - 泊松回归模型认为给定自变量的取值，因变量y满足泊松分布，模型的输出e^(β0+β1*x1)预测的是y的平均值，由于泊松分布只有一个参数，知道了分布的平均值整个分布也就确定了. 与逻辑回归异曲同工
        - 总结
            - 对比普通线性模型，逻辑回归模型，以及泊松回归模型，我们可以发现这几个模型除了等式左边形式不同，当因变量取特定值时，这些模型所假设的y的随机分布形式也不一样
            - ![](https://pic3.zhimg.com/80/v2-29498fb9c2af5c9788637e36db9e698a_720w.jpg)
            - 红色虚线代表模型预测的因变量y的平均值，图中的点代表了实际数据值，泊松回归模型中的灰色细线代表了特定自变量取值下因变量y的分布。
    - 联系函数
        - 广义线性模型绕不开的联系函数（link function）, 它是一个关于因变量y的函数，它把前面说到的线性预测的结果与因变量y的值之间建立一座桥梁。
        - ![](https://pic2.zhimg.com/80/v2-dd57a1a65e5f91b5aac1ecec6c28b031_720w.jpg)
        - ![](https://pic3.zhimg.com/80/v2-bfcc530aecc00a33a6f5981aa3aca062_720w.jpg)
        - ![](https://pic4.zhimg.com/80/v2-69592ce03a7d8e0a5bb3d1ab8a1b50e3_720w.jpg)


# 服务质量评价

- 【2021-1-28】服务质量模型

## KANO模型（卡诺）

- KANO模型分析法是授野纪昭基于KANO模型对顾客需求的细分原理，开发的一套结构型问卷和分析方法。KANO模型是一个典型的**定性**分析模型，KANO模型分析法并一般不直接用来测量用户的满意程度，主要用于识别用户对新功能的接受度，帮助企业了解不同层次的用户需求，找出顾客和企业的接触点，识别使顾客满意的至关重要的因素。
- KANO模型的属性分类
    - 在卡诺模型中，将产品功能/需求和服务的特性分为五种属性：必备属性、期望属性、魅力属性、无差异属性、反向属性。
    - （1）魅力属性：用户意想不到的，如果不提供此需求，用户满意度不会降低，但当提供此需求，用户满意度会有很大提升；
    - （2）期望属性：当提供此需求，用户满意度会提升，当不提供此需求，用户满意度会降低；
    - （3）必备属性：当优化此需求，用户满意度不会提升，当不提供此需求，用户满意度会大幅降低；
    - （4）无差异属性：无论提供或不提供此需求，用户满意度都不会有改变，用户根本不在意；
    - （5）反向属性：用户根本都没有此需求，提供后用户满意度反而会下降
    - ![](https://pic4.zhimg.com/80/v2-03334f0221e2cdc3da18bac214a6e28b_720w.jpg)
- KANO模型实际操作流程
    - 1.设计问卷调查表并实施有效的问卷调查
        - KANO问卷中每个属性特性都由正向和负向两个问题构成，分别测量用户在面对具备或不具备某项功能所做出的反应。问卷中的问题答案一般采用五级选项，按照：喜欢、理应如此、无所谓、勉强接受、我不喜欢，进行评定。
    - 2.收集数据并清洗
    - 3.将调查结果的功能属性进行分类，建立原型；
        - （1）KANO模型区分产品需求的操作方法介绍：原始数据处理阶段，需要注意是每个功能各个样本量针对正反两题确立属性。
    - ![](https://pic2.zhimg.com/80/v2-8a65fa55b80ba9f115703cb0c9440155_720w.jpg)
    - A：魅力属性；O：期望属性；M：必备属性；I：无差异属性；R：反向属性；Q：可疑结果
    - （3）根据better-worse系数值，将散点图划分为四个象限，以确立需求优先级。
    - ![](https://pic3.zhimg.com/80/v2-b456130e9885f7d38d10425ba16e673a_720w.jpg)
- 参考资料
    - [需求分析神器：KANO分析模型详解](https://zhuanlan.zhihu.com/p/148746653)
    - [产品经理需求分析方法-KANO模型](https://zhuanlan.zhihu.com/p/144315148)
        - ![](https://pic4.zhimg.com/v2-7b09fd1b4c0eb29f9f772e6d03051757_1440w.jpg?source=172ae18b)

## SERVQUAL模型（SERVQUAL Model）

- [SERVQUAL理论](https://blog.csdn.net/cqwmy840702/article/details/100380498)是20世纪80年代末由美国市场营销学家帕拉休拉曼(A.Parasuraman)、来特汉毛尔（Zeithaml）和白瑞（Berry）依据全面质量管理(Total Quality Management，TQM)理论在服务行业中提出的一种新的服务质量评价体系，其理论核心是“服务质量差距模型”，即：服务质量取决于用户所感知的服务水平与用户所期望的服务水平之间的差别程度（因此又称为“期望－感知”模型），用户的期望是开展优质服务的先决条件，提供优质服务的关键就是要超过用户的期望值。
- 模型为: Servqual 分数 = 实际感受分数 - 期望分数。
- SERVQUAL将服务质量分为五个层面：有形设施(Tangibles)、可靠性(Reliability)、响应性 (Responsiveness)、保障性(Assurance)、情感投入(Empathy)，每一层面又被细分为若干个问题，通过调查问卷的方式，让用户对每个问题的期望值、实际感受值及最低可接受值进行评分。并由其确立相关的22 个具体因素来说明它。然后通过问卷调查、顾客打分和综合计算得出服务质量的分数,
- 五个尺度，SERVQUAL模型衡量服务质量的五个尺度为；有形资产、可靠性、响应速度、信任和移情作用。
    - 有形性：有形的设施、设备、人员和沟通材料的外表；如：设备完好率、工作人员的精神面貌、以及用以提供服务的其他工具和设备的完好情况。
    - 可靠性：可靠地、准确地履行服务承诺的能力；如：企业提供服务的及时性和其承诺的履行情况。
        - ![](https://newsmoor.com/wp-content/uploads/2020/09/The-Five-Key-Service-Dimensions-of-the-Servqual-model-1-1024x620.jpg)
    - 响应性：帮助顾客并迅速提供服务的愿望；
    - 保证性：员工所具有的知识、礼节以及表达出自信与可信的能力；
    - 移情性：设身处地地为顾客着想和对顾客给予特别的关注
- [Servqual Model: Five Key Service Dimensions, Servqual Gaps & Reasons](https://newsmoor.com/servqual-model-five-key-service-dimensions-servqual-gaps-reasons/)





# 结束


