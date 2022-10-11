---
layout: post
title:  "机器学习之回归分析 - Regession Methods in Machine Learning"
date:   2022-08-31 17:02:00
categories: 机器学习
tags: 回归 数据挖掘 机器学习 数据分析 统计学 分布 逻辑回归 时间序列
excerpt: 机器学习分支之一：回归分析，总结各类回归方法（逻辑回归、多项式回归、保序回归等）
author: 鹤啸九天
mathjax: true
permalink: /regression
---

* content
{:toc}

> 回归分析经验总结

# 回归分析

- 【2022-8-31】[19种回归分析你知道几种呢？](https://www.toutiao.com/article/7137507638694281764/)
- 【2020-12-09】[7种回归分析方法，数据分析师必须掌握](https://zhuanlan.zhihu.com/p/58352024)，代码源自：[五种回归方法的比较](https://www.cnblogs.com/jin-liang/p/9551759.html)

## 什么是回归分析

- 回归分析是一种预测性的建模技术，它研究的是因变量（目标）和自变量（预测器）之间的关系。这一技术被用在预测、时间序列模型和寻找变量之间因果关系。
- 回归分析是研究X对于Y的影响关系

### 通俗理解回归分析

[如何简明地解释「线性回归」「贝叶斯定理」「假设检验」这些术语？](https://www.zhihu.com/question/23453503/answer/24696698)
- 领导给你一个任务，调查某地算不算美女多的地方。
- 领导有自己的美女判定标准，假设评价一个女子的好看程度有三个属性：脸蛋，身材，气质。
- 首先给你一些例子，比如她觉得奶茶是美女，高圆圆长的一般，范冰冰长的不好看。
- 从这些例子里面，大概能知道领导的审美标准，脸蛋、身材、气质这三个属性大概各占什么样的比例。这就是`回归`。
- 如果最终的美丑得分是把这三个标准的结果**线性相加**{: style="color:red"}，就是`线性回归`。
- 现在能够判断一个女子是否是美女。来到这个地方，一连碰到5个女子，按之前的标准判断，全是美女，那么你会不会认为这个地方的女子全都是美女呢？一般来说不会。
  - 因为经验告诉你，任何地方都有美女和丑女，不太可能只能出现只有美女没有丑女的地方，这个就是`先验`。
- 如果按这种方式思考，这个地方可能美女的比例比较高，但不会认为这里的女子全是美女，这就是`贝叶斯`的思想。
- 最后，领导目的是调查这个地方的美女多不多，那么多不多最终是要有一个标准的，而没有办法遍历当地的每一个女性。所以肯定有一套方案，比如说随机访问100个女性，如果超过80个女性是美女，你就认为该地是一个美女多的地方，反之则不是。那么之前提到的方案可以看成是一个`假设检验`。

### SVM和logistic回归

首先说: LR和SVM是线性分类问题是不精确的
- LR可以使用特征离散化实现拟非线性结果，LR+ regularization可以让分类结果有比较好的结果；
- SVM有线性和非线性核函数，一般性都会使用非线性核效果比较好。SVM是个被理论证明得很好的理论，实际应用挺弱的，还不如用一些简单的模型来说更好。

在工业界实际使用中，SVM用的不多，速度慢并且效果也很难保证，用好的特征+LR+regularization可以取得不错的效果，上线后响应速度快。

两种方法都是常见的**分类**算法，从目标函数来看，区别在于
- 逻辑回归采用的是logistical loss
- svm采用的是hinge loss。

这两个损失函数的目的都是: 增加对分类影响较**大**的数据点的**权重**，减少与分类关系较**小**的数据点的权重。
- SVM的处理方法是只考虑support vectors**支持向量**，也就是和分类最相关的少数点，去学习分类器。
- 而逻辑回归通过**非线性映射**，大大减小了离分类平面较远的点的权重，相对提升了与分类最相关的数据点的权重。
- 两者的根本目的都是一样的。

此外，根据需要，两个方法都可以增加不同的正则化项，如l1,l2等等。所以在很多实验中，两种算法的结果是很接近的。
- 但是逻辑回归相对来说模型更**简单**，好理解，实现起来，特别是大规模线性分类时比较方便。
- 而SVM的理解和优化相对来说**复杂**一些。但是SVM的**理论基础**更加牢固，有一套`结构化风险最小化`的理论基础，虽然一般使用的人不太会去关注。还有很重要的一点，SVM转化为`对偶问题`后，分类只需要计算与少数几个支持向量的距离，这个在进行复杂核函数计算时优势很明显，能够大大简化模型和计算量。

作者：[orangeprince](https://www.zhihu.com/question/21704547/answer/20293255)

国立台湾大学林智仁的[讲义](https://www.csie.ntu.edu.tw/~cjlin/talks/msri.pdf)

<object type="application/pdf" data="https://www.csie.ntu.edu.tw/~cjlin/talks/msri.pdf"
           id="review" style="width:100%;  height:800px; margin-top:0px;  margin-left:0px" >
</object>

## 回归分析种类

一共有19种回归分析
- <img src="https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/fc0059943f4b44af9dd5d15594fc3816~noop.image" data-fancybox="gallery" data-caption="回归分析方法汇总"  height="100%">
- 这19种回归都可以在SPSSAU上面找到，关于各类回归方法的使用以及具体原理，可查看SPSSAU官网，以及可使用SPSSAU上面的案例数据，逐一进行操作分析。
- <img src="https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/d234da3591a944cb93cce7295d0a7b31~noop.image" data-fancybox="gallery" data-caption="回归分析方法汇总"  height="100%">

常见的回归分析中，`线性回归`和`logistic回归`最为常见。也是当前研究最多，并且使用最为普遍，以及最为人接受容易理解的研究方法。

各种回归方式有主要有三个度量方式
- 自变量的个数
- 因变量的类型
- 回归线的形状
- <img src="https://pic2.zhimg.com/80/v2-b9205bbba53244dba9692dafe411f27d_720w.jpg" data-fancybox="gallery" data-caption="回归分析方法汇总"  height="100%">

### 按回归目标Y的类型分类

将回归分析中的Y（`因变量`）进行**数据类型**区分
- 如果是定量且1个（比如身高），通常我们会使用`线性回归`
- 如果Y为定类且1个（比如是否愿意购买苹果手机），此时叫`logistic回归`
- 如果Y为定量且多个，此时应该使用`PLS回归`（即偏最小二乘回归）
- <img src="https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/7f318328c74c47ae8f097dd1f7ac9aa1~noop.image" data-fancybox="gallery" data-caption="按Y分类"  height="100%">


细分
- （1）线性回归再细分：
  - 如果回归模型中X仅为1个，此时就称为简单线性回归或者`一元线性回归`；
  - 如果X有多个，此时称为`多元线性回归`。
- （2）Logistic回归再细分：
  - 如果Y为**两类**{: style="color: red"}，比如0和1（比如1为愿意和0为不愿意，1为购买和0为不购买），此时就叫`二元logistic回归`；
  - 如果Y为两类时，有时候也会使用`二元Probit回归模型`。
  - 如果Y为**多类**{: style="color: red"}比如1，2，3（比如DELL,Thinkpad,Mac）,此时就会`多分类logistic回归`；
  - 如果Y为**多类**{: style="color: red"}且**有序**{: style="color: red"}，比如1，2，3（比如1为不愿意，2为中立，3为愿意），此时可以使用`有序logistic回归`。
- （3）除此之外，如果Y为**定量**且为**多个**{: style="color: red"}，很多时候会将Y合并概括成1个（比如使用平均值），然后使用线性回归，反之可考虑使用PLS回归（但此种情况使用其实较少，PLS回归模型非常复杂）。

## 如何正确选择回归模型？

可选择的越多，选择正确的一个就越难。
- 在多类回归模型中，基于自变量和因变量的类型，数据的维数以及数据的其它基本特征的情况下，选择最合适的技术非常重要。
- 关键因素
1. 数据探索是构建预测模型的必然组成部分。在选择合适的模型时，比如识别变量的关系和影响时，它应该首选的一步。
2. 比较适合于不同模型的优点，我们可以分析不同的指标参数，如统计意义的参数，R-square，Adjusted R-square，AIC，BIC以及误差项，另一个是Mallows' Cp准则。这个主要是通过将模型与所有可能的子模型进行对比（或谨慎选择他们），检查在你的模型中可能出现的偏差。
3. 交叉验证是评估预测模型最好额方法。在这里，将你的数据集分成两份（一份做训练和一份做验证）。使用观测值和预测值之间的一个简单均方差来衡量你的预测精度。
4. 如果你的数据集是多个混合变量，那么你就不应该选择自动模型选择方法，因为你应该不想在同一时间把所有变量放在同一个模型中。
5. 它也将取决于你的目的。可能会出现这样的情况，一个不太强大的模型与具有高度统计学意义的模型相比，更易于实现。
6. 回归正则化方法（Lasso，Ridge和ElasticNet）在高维和数据集变量之间多重共线性情况下运行良好。

## 线性回归（Linear Regression）

`线性回归`使用最为成熟，研究最多，而且绝大多数生活现象均可使用`线性回归`进行研究，因而结合回归分析还会多出一些回归方法；同时回归分析模型会有很多假定，或者满足条件，如果不满足这些假定或者条件就会导致模型使用出错，此时就有对应的其它回归模型出来解决这些问题，因而跟着线性回归后面又出来很多的回归。

### 线性回归种类

- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/05a5d5c0a7974142b61da9b205f38631~noop.image?_iz=58558&from=article.pc_detail&x-expires=1662529711&x-signature=Q0cwXoJM0OAwIJ1ptOHHyOndppI%3D)

- 线性回归是研究X对于Y的影响，如果说有**多个X**，希望让模型**自动**找出有意义的X，此时就可以使用`逐步回归`。
- 另外在很一些管理类研究中会涉及到**中介**作用或者**调节**作用，此时就可能使用到`分层回归`或者`分组回归`等。
- 在进行线性回归分析时，如果说模型出现**共线性**问题VIF值很大，此时就可以使用`岭回归`进行解决，`岭回归`的使用较为广泛，其实还有`Lasso回归`也可以解决共线性问题，但是使用非常少而已。
- 如果数据中有**异常值**，常见解法是先把异常值去除掉，但有的时候确实无法去除掉异常值，此时可考虑使用`稳健回归`分析模型。
- 线性回归的前提是X和Y之间有着线性关系，但有的时候X和Y并不是线性关系，此时就有`曲线回归`和`非线性回归`供使用
  - `曲线回归` 将曲线模型表达式转换成**线性关系**表达式进行研究
  - `非线性回归`较为复杂当然使用也非常少，其和线性回归完全不是一回事情。
  - `Poisson回归`（泊松回归）是指Y符合`泊松分布`特征时使用的回归研究模型。
- 除此之外，还有比如`加权WLS回归`等，使用较少
- `Cox回归`是医学研究中使用较多的一种方法，是研究生存影响关系，比如研究抑郁症生存时间，癌症的死亡时间影响关系情况等。

- 因变量是连续的，自变量可以是连续的也可以是离散的，回归线的性质是线性的。
- 线性回归使用最佳的拟合直线（也就是回归线）在因变量（Y）和一个或多个自变量（X）之间建立一种关系。
- 用一个方程式来表示它，即 Y=a+b*X + e，其中a表示截距，b表示直线的斜率，e是误差项。[img](https://pic1.zhimg.com/80/v2-6a7dc02e44d306bb5a90dbf6ff780624_720w.jpg)
  - <img src="https://pic1.zhimg.com/80/v2-6a7dc02e44d306bb5a90dbf6ff780624_720w.jpg" data-fancybox="gallery" data-caption="按Y分类"  height="100%">
- 多元线性回归有（>1）个自变量，而一元线性回归通常只有1个自变量。
- 最小二乘法是拟合回归线最常用的方法。对于观测数据，它通过最小化每个数据点到线的垂直偏差平方和来计算最佳拟合线。因为在相加时，偏差先平方，所以正值和负值没有抵消。
  - [img](https://pic3.zhimg.com/80/v2-d1f57df439896295e079cb5daec7abb2_720w.jpg)
  - [img](https://pic3.zhimg.com/80/v2-ea12ae4dd1a177974c2a38e6f77f82a6_720w.jpg)
  - <img src="https://pic3.zhimg.com/80/v2-d1f57df439896295e079cb5daec7abb2_720w.jpg" data-fancybox="gallery" data-caption="按Y分类"  height="100%">
  - <img src="https://pic3.zhimg.com/80/v2-ea12ae4dd1a177974c2a38e6f77f82a6_720w.jpg" data-fancybox="gallery" data-caption="按Y分类"  height="100%">
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

### 多元线性回归

线性回归通过使用最佳的拟合直线（又被称为**回归线**），建立`因变量`（Y）和一个或多个`自变量`（X）之间的关系。
- 表达式为：$Y=a+b*X+e$，其中 a 为直线截距，b 为直线斜率，e 为误差项。
- 如果给出了自变量 X，就能通过这个线性回归表达式计算出预测值，即因变量 Y

如何获得最佳拟合直线（确定 a 和 b 值）？
- 用`最小二乘法`（Least Square Method）. 最小二乘法是一种拟合回归线的常用算法。通过最小化每个数据点与预测直线的垂直误差的平方和来计算得到最佳拟合直线。因为计算的是误差平方和，所有，误差正负值之间没有相互抵消。
- 指标 R-square 来评估模型的性能

重点：
- 自变量和因变量之间必须满足**线性关系**。——LR回归不用
- 多元回归存在**多重共线性**，**自相关性**和**异方差性**。
- 线性回归对**异常值**非常敏感。异常值会严重影响回归线和最终的预测值。
- 多重共线性会增加系数估计的方差，并且使得估计对模型中的微小变化非常敏感。结果是系数估计不稳定。
- 在多个自变量的情况下，可以采用正向选择、向后消除和逐步选择的方法来选择最重要的自变量。

## 逻辑回归（Logistic Regression）

逻辑回归是一个学习f: X −> Y 方程或 P(Y|X)的方法
- Y是离散取值的
- X = < X1,X2...,Xn > 是任意一个向量其中每个变量离散或者连续取值。
- ![](https://ask.qcloudimg.com/http-save/yehe-1421130/n0rhhoc47d.jpeg?imageView2/2/w/1620)
- ![](https://ask.qcloudimg.com/http-save/yehe-1421130/lxc2avm3bh.jpeg?imageView2/2/w/1620)

重点：
- 逻辑回归广泛用于**分类**问题。
- 逻辑回归**不要求**因变量和自变量之间是线性关系，它可以处理**多类型**关系，因为它对预测输出进行了非线性 log 变换。
- 为了避免过拟合和欠拟合，应该涵盖所有有用的变量。实际中确保这种情况的一个好的做法是使用**逐步筛选**的方法来估计逻辑回归。
- 训练**样本量越大越好**，因为如果样本数量少，最大似然估计的效果就会比最小二乘法差。
- 自变量不应相互关联，即不存在**多重共线性**。然而，在分析和建模中，可以选择包含分类变量相互作用的影响。
- 如果因变量的值是**序数**，则称之为序数逻辑回归。
- 如果因变量是**多类别**的，则称之为多元逻辑回归。

【2022-8-31】数说工作室：[logistic回归：从生产到使用【上：使用篇】](https://cloud.tencent.com/developer/article/1076919)

### LR回归的组成部分

Logistic Regression 有三个主要组成部分：回归、线性回归、Logsitic方程。
- 1）回归
  - Logistic regression是线性回归的一种，线性回归是一种回归。回归其实就是对已知公式的未知**参数**进行**估计**。比如已知公式是 y = a*x + b，未知参数是a和b。现在有很多真实的(x,y)数据（训练样本），回归就是利用这些数据对a和b的取值去自动估计。估计的方法大家可以简单的理解为，在给定训练样本点和已知的公式后，对于一个或多个未知参数，机器会自动枚举参数的所有可能取值（对于多个参数要枚举它们的不同组合），直到找到那个最符合样本点分布的参数（或参数组合）。（当然，实际运算有一些优化算法，肯定不会去枚举的）
  - 注意，回归的前提是公式已知，否则回归无法进行。而现实生活中哪里有已知的公式啊（G=m*g 也是牛顿被苹果砸了脑袋之后碰巧想出来的不是？哈哈），因此回归中的公式基本都是数据分析人员通过看大量数据后猜测的（其实大多数是拍脑袋想出来的，嗯...）。根据这些公式的不同，回归分为线性回归和非线性回归。线性回归中公式都是“一次”的（一元一次方程，二元一次方程...），而非线性则可以有各种形式（N元N次方程，log方程 等等）。具体的例子在线性回归中介绍吧。
- 2）线性回归
  - 例子：假设要找一个y和x之间的规律，其中x是鞋子价钱，y是鞋子的销售量。（为什么要找这个规律呢？这样的话可以帮助定价来赚更多的钱嘛，小学的应用题经常做的呵呵）。已知一些往年的销售数据（x0,y0), (x1, y1), ... (xn, yn)做样本集, 并假设它们满足线性关系：y = a*x + b （其中a,b的具体取值还不确定），线性回归即根据往年数据找出最佳的a, b取值，使 y = a * x + b 在所有样本集上误差最小。
  - 也许你会觉得---晕！这么简单! 这需要哪门子的回归呀！我自己在草纸上画个xy坐标系，点几个点就能画出来！（好吧，我承认我们初中时都被这样的画图题折磨过）。事实上一元变量的确很直观，但如果是多元就难以直观的看出来了。比如说除了鞋子的价格外，鞋子的质量，广告的投入，店铺所在街区的人流量都会影响销量，我们想得到这样的公式：$ sell = a*x + b*y + c*z + d*zz + e$。这个时候画图就画不出来了，规律也十分难找，那么交给线性回归去做就好。（线性回归具体是怎么做的并不重要，对程序员来说，我们就把它当成一条程序命令就好。若看完本文还想了解更多，求解方法可见本文末尾的注1）。这就是线性回归算法的价值。
  - 注意: 这里线性回归能过获得好效果的前提是 $y = a*x + b$ 至少从总体上是有道理的（因为我们认为鞋子越贵，卖的数量越少，越便宜卖的越多。另外鞋子质量、广告投入、客流量等都有类似规律）；但并不是所有类型的变量都适合用线性回归，比如说x不是鞋子的价格，而是鞋子的尺码），那么无论回归出什么样的（a,b），错误率都会极高（因为事实上尺码太大或尺码太小都会减少销量）。总之：如果公式假设是错的，任何回归都得不到好结果。
- 3）Logistic方程
  - 上面的sell是一个具体的实数值，然而很多情况下要回归产生一个类似**概率值**的0~1之间的数值（比如某一双鞋子今天能否卖出去？或者某一个广告能否被用户点击?）。这个数值必须是0~1之间，但sell显然不满足这个区间要求。于是引入了Logistic方程，来做**归一化**。这里再次说明，该数值并不是数学中定义的概率值。那么既然得到的并不是概率值，为什么我们还要费这个劲把数值归一化为0~1之间呢？归一化的好处在于数值具备可比性和收敛的边界，这样当你在其上继续运算时（比如你不仅仅是关心鞋子的销量，而是要对鞋子卖出的可能、当地治安情况、当地运输成本 等多个要素之间加权求和，用综合的加和结果决策是否在此地开鞋店时），归一化能够保证此次得到的结果不会因为边界 太大/太小 导致 覆盖其他feature 或 被其他feature覆盖。（举个极端的例子，如果鞋子销量最低为100，但最好时能卖无限多个，而当地治安状况是用0~1之间的数值表述的，如果两者直接求和治安状况就完全被忽略了）这是用logistic回归而非直接线性回归的主要原因。到了这里，也许你已经开始意识到，没错，Logistic Regression 就是一个被logistic方程归一化后的线性回归，仅此而已。
  - 至于所以用logistic而不用其它，是因为这种归一化的方法往往比较合理（人家都说自己叫logistic了嘛 呵呵），能够打压过大和过小的结果（往往是噪音），以保证主流的结果不至于被忽视。具体的公式及图形见本文的一、官方定义部分。其中f(X)就是我们上面例子中的sell的实数值了，而y就是得到的0~1之间的卖出可能性数值了。（本段 “可能性” 并非 “概率” ，感谢zjtchow同学在回复中指出）

### 为什么用LR？

机器学习中有几十种分类器，那么我们为什么偏偏挑LR来讲呢？原因有三：
- LR模型原理**简单**，并且有一个现成的叫LIBLINEAR 的工具库，易于上手，并且效果不错。
- LR可以说是互联网上最常用也是**最有影响力**的分类算法。LR几乎是所有广告系统中和推荐系统中点击率（Click Through    Rate（CTR））预估模型的基本算法。
- LR同时也是现在炙手可热的“深度学习”（Deep Lerning）的**基本组成单元**，扎实的掌握LR也将有助于你的学好深度学习。

Logistic Regression的适用性
- 1） 可用于概率**预测**，也可用于**分类**。
  - 并不是所有的机器学习方法都可以做**可能性概率预测**（比如SVM就不行，它只能得到1或者-1）。可能性预测的好处是**结果可比性**：比如得到不同广告被点击的可能性后，就可以展现点击可能性最大的N个。这样以来，哪怕得到的可能性都很高，或者可能性都很低，我们都能取最优的topN。当用于分类问题时，仅需要设定一个阈值即可，可能性高于阈值是一类，低于阈值是另一类。
- 2） 仅能用于**线性**问题
  - 只有在feature和target是**线性关系**时，才能用 Logistic Regression（不像SVM那样可以应对非线性问题）。这有两点指导意义
    - 一方面当预先知道模型非线性时，果断不使用Logistic Regression； 
    - 另一方面，在使用Logistic Regression时注意选择和target呈线性关系的feature。
- 3） 各feature之间不需要满足**条件独立假设**，但各个feature的贡献是独立计算的。
  - 逻辑回归不像朴素贝叶斯一样需要满足**条件独立假设**（因为它没有求后验概率）。但每个feature的贡献是独立计算的，即LR是不会自动帮你combine 不同的features产生新feature的 (时刻不能抱有这种幻想，那是决策树,LSA, pLSA, LDA或者你自己要干的事情)。举个例子，如果你需要TF*IDF这样的feature，就必须明确的给出来，若仅仅分别给出两维 TF 和 IDF 是不够的，那样只会得到类似 $a*TF + b*IDF$ 的结果，而不会有 $c*TF*IDF$ 的效果。

### LR特性

- `逻辑回归`是用来计算“事件=Success”和“事件=Failure”的概率。当因变量的类型属于二元（1 / 0，真/假，是/否）变量时，就应该使用逻辑回归。
- 为什么要在公式中使用对数log呢
  - 因为用是的`二项分布`（因变量），需要选择一个对于这个分布最佳的连结函数，Logit函数。
  - 通过观测样本的极大似然估计值来选择参数，而不是最小化平方和误差（如在普通回归使用的）
  - ![](https://pic2.zhimg.com/80/v2-4387539def4aec08dd9b03fe45f0c4b1_720w.jpg)
- 要点：
  - ● 它广泛的用于分类问题。
  - ● 逻辑回归不要求自变量和因变量是线性关系。它可以处理各种类型的关系，因为它对预测的相对风险指数OR使用了一个非线性的log转换。
- 为了避免过拟合和欠拟合，我们应该包括所有重要的变量。有一个很好的方法来确保这种情况，就是使用逐步筛选方法来估计逻辑回归。它需要大的样本量，因为在样本数量较少的情况下，极大似然估计的效果比普通的最小二乘法差。
- 自变量不应该相互关联的，即不具有多重共线性。然而，在分析和建模中，我们可以选择包含分类变量相互作用的影响。
- 如果因变量的值是定序变量，则称它为序逻辑回归；
- 如果因变量是多类的话，则称它为多元逻辑回归。

### 二分类LR

1970年，Cox首先研究了log变换（也叫logit变换），或许此名就是“log it”的意思

### 多分类LR

多分类变量的logistic回归
- （1）无序多分类logistic回归：
  - 因变量Y的分类大于2个，且之间不存在等级关系
- （2）有序多分类：比例优势模型
  - 因变量Y的分类多于2个，且之间存在等级关系
- （3）有序多分类：偏比例优势模型
  - 有些变量的系数不满足**平行性假定**，那么就要使用“偏比例优势模型”（partialproportional odds model），这个模型其实也就是在比例优势模型的基础上，把不平行的系数做一个改动


## 多项式回归（Polynomial Regression）

- 对于一个回归方程，如果自变量的指数大于1，那么它就是`多项式回归`方程。
- 能够建模非线性可分离数据，完全控制特征变量的建模（指定要设置），需要一些背景知识，如果指数选择不当，容易过度拟合。
  - 如：$ y=a+b*x^2 $
- 多项式回归中，最佳的拟合线不是**直线**，而是拟合数据点的**曲线**
- 虽然可以拟合一个高次多项式并得到较低的错误，但会导致过拟合。
  - ![](https://pic3.zhimg.com/80/v2-a345941ab716e78f178af7ff8bcffd7e_720w.jpg)

重点：
- 虽然可能会有一些诱导去拟合更高阶的多项式以此来降低误差，但是这样容易发生`过拟合`。应该画出拟合曲线图形，重点放在确保曲线反映样本真实分布上
- 尤其要注意曲线的两端，看看这些形状和趋势是否有意义。更高的多项式可以产生怪异的推断结果

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
lm.coef_ #系数
lm.intercept_<br><br>evaluation(y,y_pred) #截距
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
  - $ y = a + b*x + e $ (error term)
  - [error term is the value needed to correct for a prediction error between the observed and predicted value]
  - => $ y = a+y = a+ b1x1+ b2x2+....+e $, for multiple independent variables.
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
y_pred=ridge_reg.predict(X)
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


## 广义线性模型

【2020-12-09】[广义线性模型(GLM)从人话到鬼话连篇](https://zhuanlan.zhihu.com/p/110268967)
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


# 时间序列回归

- 【2022-8-31】[利用Auto ARIMA构建高性能时间序列模型](https://www.toutiao.com/a6623502388156187143)
- 【2020-9-30】[时间序列预测的7种方法](https://www.biaodianfu.com/python-time-series-forecasting-methods.html), [7 methods to perform Time Series forecasting](https://www.analyticsvidhya.com/blog/2018/02/time-series-forecasting-methods/) (with Python codes)

典型任务
- 根据历史数据预测比特币价格。
- ![](https://cdn.analyticsvidhya.com/wp-content/uploads/2018/01/Screen-Shot-2018-01-23-at-12.44.42-PM.png)
- 预测高铁乘客量
- ![](https://www.biaodianfu.com/wp-content/uploads/2020/09/data-train-and-test-1024x546-1.png)

## 什么是时间序列

时间序列的定义：一系列在**相同**时间间隔内测量到的数据点。
- 时间序列是指以**固定**的时间间隔记录下的特定值
- 时间间隔可以是小时、每天、每周、每10天等等。
- 时间序列的特殊性：该序列中的每个数据点都与先前的数据点**相关**。

### 什么是平稳

【2022-8-31】[手把手教你用Python处理非平稳时间序列](https://www.toutiao.com/article/6625018412370231821)

“平稳”是处理时间序列数据时遇到的最重要的概念之一：
- 平稳序列是指其特性-`均值`、`方差`和`协方差`不随时间而变化的序列。
- ![](https://p3-sign.toutiaoimg.com/pgc-image/333e961528464dc88ef2046c6b4a3910~noop.image)
- 第一幅图中，均值随时间而变化(增加)，呈现上升的趋势。因此，这是一个非平稳序列。平稳序列不应该呈现出随时间变化的趋势。
- 第二幅图显然看不到序列的趋势，但序列的变化是一个时间的函数。正如前面提到的，平稳序列的方差必须是一个常数。
- 第三幅图，随着时间的增加，序列传播后变得更近，这意味着协方差是时间的函数。

三个例子均是非平稳时间序列, 均值、方差和协方差都是常数，才是`平稳时间序列`。
- ![](https://p3-sign.toutiaoimg.com/pgc-image/913532334264440cb33c45b6c45d4738~noop.image)

大多数统计模型都要求序列是平稳的，这样才能进行有效和精确的预测。
- 平稳时间序列是一个不依赖**时间**变化 (即均值、方差和协方差不随时间变化)的时间序列。

### 如何验证平稳

如何检验序列是否平稳？
- 人工检验
- 统计检验：如单位根平稳检验。单位根表名给定序列的统计特性（均值，方差和协方差）不是时间的常数，这是平稳时间序列的先决条件。最常用的单位根平稳检测方法：
  - ① ADF（增补迪基-福勒）检验
    - ADF检验结果：ADF检验的统计量为1%，p值为5%，临界值为10%，置信区间为10%。
    - 平稳性检验：如果检验统计量小于临界值，可以拒绝原假设(也就是序列是平稳的)。当检验统计量大于临界值时，不能拒绝原假设(这意味着序列不是平稳的)。
  - ② KPSS（科瓦特科夫斯·基菲利普·斯施密特·辛）检验KPSS检验是另一种用于检查时间序列的平稳性 (与迪基-福勒检验相比稍逊一筹) 的统计检验方法。KPSS检验的原假设与备择假设与ADF检验的原假设与备择假设相反，常造成混淆。
    - KPSS检验结果：KPSS检验-检验统计量、p-值和临界值和置信区间分别为1%、2.5%、5%和10%。
    - 平稳性检验：如果检验统计量大于临界值，则拒绝原假设(序列不是平稳的)。如果检验统计量小于临界值，则不能拒绝原假设(序列是平稳的)

### 平稳种类

平稳的种类
- `严格平稳`：严格平稳序列满足平稳过程的数学定义。严格平稳序列的均值、方差和协方差均不是时间的函数。我们的目标是将一个非平稳序列转化为一个严格平稳序列，然后对它进行预测。
- `趋势平稳`：没有单位根但显示出趋势的序列被称为趋势平稳序列。一旦去除趋势之后，产生的序列将是严格平稳的。在没有单位根的情况下，KPSS检测将该序列归类为平稳。这意味着序列可以是严格平稳的，也可以是趋势平稳的。
- `差分平稳`：通过差分可以使时间序列成为严格平稳的时间序列。ADF检验也称为差分平稳性检验。

应用两种平稳检验后的可能结果：
- 结果1：两种检验均得出结论：序列是非平稳的->序列是非平稳的
- 结果2：两种检验均得出结论：序列是平稳的->序列是平稳的
- 结果3：KPSS =平稳；ADF =非平稳->趋势平稳，去除趋势后序列严格平稳
- 结果4：KPSS =非平稳；ADF =平稳->差分平稳，利用差分可使序列平稳。

### 时序平稳化

为了建立时间序列预测模型，必须首先将任何非平稳序列转换为平稳序列
- 差分：计算序列中连续项的差值， yt‘ = yt – y(t-1)
- 季节差分：计算观察值与同一季节的先前观察值之间的差异，yt‘ = yt – y(t-n)
- 变换：变换用于对方差为非常数的序列进行平稳化。常用的变换方法包括幂变换、平方根变换和对数变换。

## 时间序列预测方法

### 数据集准备

2012-2014 年两年每个小时的乘客数量。为了解释每种方法的不同之处，以每天为单位构造和聚合了一个数据集。
- 从 2012 年 8 月- 2013 年 12 月的数据中构造一个数据集。
- 创建 train/test 文件用于建模。
  - 前 14 个月（ 2012年8月-2013年10月）用作**训练**数据
  - 后2个月（2013年11月–2013年12月）用作**测试**数据。
- 以每天为单位聚合数据集。
- ![](https://www.biaodianfu.com/wp-content/uploads/2020/09/data-train-and-test-1024x546-1.png)

```python
import pandas as pd
import matplotlib.pyplot as plt

# Subsetting the dataset
# Index 11856 marks the end of year 2013
df = pd.read_csv('train.csv', nrows=11856)

# Creating train and test set
# Index 10392 marks the end of October 2013
train = df[0:10392]
test = df[10392:]

# Aggregating the dataset at daily level
df['Timestamp'] = pd.to_datetime(df['Datetime'], format='%d-%m-%Y %H:%M')
df.index = df['Timestamp']
df = df.resample('D').mean()

train['Timestamp'] = pd.to_datetime(train['Datetime'], format='%d-%m-%Y %H:%M')
train.index = train['Timestamp']
train = train.resample('D').mean()

test['Timestamp'] = pd.to_datetime(test['Datetime'], format='%d-%m-%Y %H:%M')
test.index = test['Timestamp']
test = test.resample('D').mean()

#Plotting data
train.Count.plot(figsize=(15,8), title= 'Daily Ridership', fontsize=14)
test.Count.plot(figsize=(15,8), title= 'Daily Ridership', fontsize=14)
plt.show()
```

### 总结

方法
1. `朴素预测法`：在这种预测方法中，新数据点预测值等于前一个数据点的值。
2. `简单平均值法`：下一个值是所有先前值的**平均数**。该方法优于“朴素预测法”，但是在简单平均值法中，过去的所有值都被考虑进去了，而这些值可能并不都是有用的
3. `移动平均法`：这是对前两个方法的改进。不取前面所有点的平均值，而是将n个先前的点的平均值作为预测值
4. `加权移动平均法`：加权移动平均是带权重的移动平均，先前的n个值被赋予不同的权重。 
5. `简单指数平滑法`：更大的权重被分配给更近期的观测结果，来自遥远过去的观测值则被赋予较小的权重
6. `霍尔特（Holt）线性趋势模型`：该方法考虑了数据集的**趋势**（数据的递增或递减的性质）。假设旅馆的预订数量每年都在增加，那么可以说预订数量呈现出增加的趋势。该方法的预测函数是值和趋势的函数。
7. `霍尔特-温特斯（Holt Winters）`方法：该算法同时考虑了数据的**趋势**和**季节性**。例如，一家酒店的预订数量在周末很高，而在工作日则很低，并且每年都在增加；因此存在每周的季节性和增长的趋势。
8. `ARIMA`：ARIMA是一种非常流行的时间序列建模方法。它描述了数据点之间的相关性，并考虑了数值之间的差异。ARIMA的改进版是SARIMA (或季节性ARIMA)。

几种模型的准确度
- ![](https://www.biaodianfu.com/wp-content/uploads/2020/09/model-rank.png)


### 朴素法

朴素法：
- 假设第一个预测点和上一个观察点**相等**的预测方法
- $ \hat{y}_{t+1}=y_{t} $

```python
dd = np.asarray(train['Count'])
y_hat = test.copy()
y_hat['naive'] = dd[len(dd) - 1]
plt.figure(figsize=(12, 8))
plt.plot(train.index, train['Count'], label='Train')
plt.plot(test.index, test['Count'], label='Test')
plt.plot(y_hat.index, y_hat['naive'], label='Naive Forecast')
plt.legend(loc='best')
plt.title("Naive Forecast")
plt.show()
# ----- 评估效果 -------
from sklearn.metrics import mean_squared_error
from math import sqrt
rms = sqrt(mean_squared_error(test['Count'], y_hat['naive']))
print(rms) # 43.91640614391676
```

![](https://www.biaodianfu.com/wp-content/uploads/2020/09/native-3.png)

分析
- 朴素法并不适合**变化很大**的数据集，最适合**稳定性**很高的数据集。




### 简单平均法

数据在一定时期内出现小幅变动，但每个时间段的平均值确实保持不变。
- 预测出第二天的价格大致和过去天数的价格平均值一致。

这种将预期值等同于之前所有观测点的**平均值**的预测方法就叫`简单平均法`。
- $\hat{y}_{x+1}=\frac{1}{x} \sum_{i=1}^{x} y_{i}$

```python
y_hat_avg = test.copy()
y_hat_avg['avg_forecast'] = train['Count'].mean()
plt.figure(figsize=(12,8))
plt.plot(train['Count'], label='Train')
plt.plot(test['Count'], label='Test')
plt.plot(y_hat_avg['avg_forecast'], label='Average Forecast')
plt.legend(loc='best')
plt.show()
# ===========
from sklearn.metrics import mean_squared_error
from math import sqrt
rms = sqrt(mean_squared_error(test['Count'], y_hat_avg['avg_forecast']))
print(rms) # 109.88526527082863
```

![](https://www.biaodianfu.com/wp-content/uploads/2020/09/avg-3.png)

### 移动平均法——改进

用某些窗口期计算平均值的预测方法就叫`移动平均法`。
- 思想：最近的数据更重要
- 移动平均值涉及到一个有时被称为“**滑动窗口**”的大小值p。使用简单的移动平均模型，根据之前数值的固定有限数p的平均值预测某个时序中的下一个值

公式
- $\hat{y}_{l}=\frac{1}{p}\left(y_{i-1}+y_{i-2}+y_{i-3}+\ldots+y_{i-p}\right)$

```python
y_hat_avg = test.copy()
# 窗口为60
y_hat_avg['moving_avg_forecast'] = train['Count'].rolling(60).mean().iloc[-1]
plt.figure(figsize=(16,8))
plt.plot(train['Count'], label='Train')
plt.plot(test['Count'], label='Test')
plt.plot(y_hat_avg['moving_avg_forecast'], label='Moving Average Forecast')
plt.legend(loc='best')
plt.show()
# ===========
from sklearn.metrics import mean_squared_error
from math import sqrt
rms = sqrt(mean_squared_error(test['Count'], y_hat_avg['moving_avg_forecast']))
print(rms) # 46.72840725106963
```

效果
- ![](https://www.biaodianfu.com/wp-content/uploads/2020/09/mov-3-1536x768.png)
- 这个数据集里，`朴素法`比`简单平均法`和`移动平均法`的表现要好
- 可以试试简单指数平滑法，它比移动平均法的一个进步之处就是相当于对移动平均法进行了加权。加权移动平均法其实还是一种移动平均法，只是“滑动窗口期”内的值被赋予不同的权重，通常来讲，最近时间点的值发挥的作用更大了。
- $\hat{y}_{l}=\frac{1}{m}\left(w_{1} * y_{i-1}+w_{2} * y_{i-2}+w_{3} * y_{i-3}+\ldots+w_{m} * y_{i-m}\right)$


### 简单指数平滑法

简单平均法和加权移动平均法在选取时间点的思路上存在较大的差异。两种方法之间折中，将所有数据考虑在内的同时也能给数据赋予不同非权重。
- 相比更早时期内的观测值，它会给近期的观测值赋予更大的权重。按照这种原则工作的方法就叫做`简单指数平滑法`。
- 通过加权平均值计算出预测值，其中**权重**随着观测值从早期到晚期的变化呈**指数级**下降，最小的权重和最早的观测值相关
- $\hat{y}_{T+1 \mid T}=\alpha y_{T}+\alpha(1-\alpha) y_{T-1}+\alpha(1-\alpha)^{2} y_{T-2}+\ldots$
- 0≤α≤1是平滑参数。对时间点T+1的单步预测值是时序y1,…,yT的所有观测值的加权平均数。权重下降的速率由参数α控制
- $\hat{y}_{t+1 \mid t}=\alpha y_{t}+(1-\alpha) \hat{y}_{t-1 \mid t}$
- 用两个权重α和1−α得到一个加权移动平均值

```python
from statsmodels.tsa.api import SimpleExpSmoothing

y_hat_avg = test.copy()
fit = SimpleExpSmoothing(np.asarray(train['Count'])).fit(smoothing_level=0.6, optimized=False)
y_hat_avg['SES'] = fit.forecast(len(test))
plt.figure(figsize=(16, 8))
plt.plot(train['Count'], label='Train')
plt.plot(test['Count'], label='Test')
plt.plot(y_hat_avg['SES'], label='SES')
plt.legend(loc='best')
plt.show()
# ==========
rom sklearn.metrics import mean_squared_error
from math import sqrt
rms = sqrt(mean_squared_error(test['Count'], y_hat_avg['SES']))
print(rms) # 43.357625225228155
```

效果
- ![](https://www.biaodianfu.com/wp-content/uploads/2020/09/SES-3-1536x768.png)
- α值为0.6，用测试集继续调整参数以生成一个更好的模型。

### 霍尔特(Holt)线性趋势法

问题
- 以上方法都没有考虑趋势因素：一段时间内观察到的价格的总体模式

无需假设的情况下，准确预测出价格趋势，这种考虑数据集变化趋势的方法就叫做`霍尔特线性趋势法`。
- 每个时序数据集可以分解为相应的几个部分：`趋势`（Trend），`季节性`(Seasonal)和`残差`(Residual)。任何呈现某种趋势的数据集都可以用`霍尔特线性趋势法`用于预测。

```python
import statsmodels.api as sm

sm.tsa.seasonal_decompose(train['Count']).plot()
result = sm.tsa.stattools.adfuller(train['Count'])
plt.show()
```

数据集特征
- ![](https://www.biaodianfu.com/wp-content/uploads/2020/09/holt-2.png)
- 数据集呈上升趋势。因此用霍尔特线性趋势法预测未来价格。
- 该算法包含三个方程：一个**水平**方程，一个**趋势**方程，一个方程将二者相**加**以得到预测值, 也可以将两者相**乘**得到一个乘法预测方程
  - 当趋势呈**线性**增加/下降时，用相加得到的方程；
  - 当趋势呈**指数级**增加/下降时，用相乘得到的方程。
- 用相乘得到的方程，预测结果会更稳定，但用相加得到的方程，更容易理解。
- ![](https://www.biaodianfu.com/wp-content/uploads/2020/09/holt-4.png)

```python
from statsmodels.tsa.api import Holt

y_hat_avg = test.copy()

fit = Holt(np.asarray(train['Count'])).fit(smoothing_level=0.3, smoothing_slope=0.1)
y_hat_avg['Holt_linear'] = fit.forecast(len(test))

plt.figure(figsize=(16, 8))
plt.plot(train['Count'], label='Train')
plt.plot(test['Count'], label='Test')
plt.plot(y_hat_avg['Holt_linear'], label='Holt_linear')
plt.legend(loc='best')
plt.show()
# ========
from sklearn.metrics import mean_squared_error
from math import sqrt
rms = sqrt(mean_squared_error(test['Count'], y_hat_avg['Holt_linear']))
print(rms) # 43.056259611507286
```

效果
- ![](https://www.biaodianfu.com/wp-content/uploads/2020/09/holt-5-1536x768.png)
- 这种方法能够准确地显示出趋势，因此比前面的几种模型效果更好。如果调整一下参数，结果会更好。

### Holt-Winters季节性预测模型

如果每年夏季的收入会远高于其它季节，那么这种重复现象叫做“**季节性**”（Seasonality）。如果数据集在一定时间段内的固定区间内呈现相似的模式，那么该数据集就具有季节性。
- ![](https://www.biaodianfu.com/wp-content/uploads/2020/09/Holt-Winters-1.jpg)
- 5种模型在预测时并没有考虑到数据集的季节性

`Holt-Winters`季节性预测模型是一种**三次指数平滑**预测，其背后的理念就是除了水平和趋势外，还将指数平滑应用到季节分量上。

Holt-Winters季节性预测模型由预测函数和三次平滑函数
- ① 水平函数 ℓt
- ② 一个是趋势函数 bt
- ③ 一个是季节分量 st
- ④ 以及平滑参数 α,β和γ
- s 为季节循环的长度，0≤α≤ 1, 0 ≤β≤ 1 ， 0≤γ≤ 1。
- 水平函数为季节性调整的观测值和时间点t处非季节预测之间的加权平均值。

```python
from statsmodels.tsa.api import ExponentialSmoothing

y_hat_avg = test.copy()
fit1 = ExponentialSmoothing(np.asarray(train['Count']), seasonal_periods=7, trend='add', seasonal='add', ).fit()
y_hat_avg['Holt_Winter'] = fit1.forecast(len(test))
plt.figure(figsize=(16, 8))
plt.plot(train['Count'], label='Train')
plt.plot(test['Count'], label='Test')
plt.plot(y_hat_avg['Holt_Winter'], label='Holt_Winter')
plt.legend(loc='best')
plt.show()
# =========
from sklearn.metrics import mean_squared_error
from math import sqrt

rms = sqrt(mean_squared_error(test['Count'], y_hat_avg['Holt_Winter']))
print(rms) # 23.961492566159794
```

效果
- ![](https://www.biaodianfu.com/wp-content/uploads/2020/09/Holt-Winters-3-1536x768.png)
- 趋势和季节性的预测准确度都很高。选择了 seasonal_period = 7作为每周重复的数据。也可以调整其它其它参数，我在搭建这个模型的时候用的是默认参数。

### 自回归移动平均模型（ARIMA）

另一个场景的时序模型是`自回归移动平均模型`（ARIMA）。
- 指数平滑模型都是基于数据中的**趋势**和**季节性**的描述
- 而自回归移动平均模型的目标是描述数据中彼此之间的关系。

ARIMA的一个优化版就是**季节性ARIMA**。它像Holt-Winters季节性预测模型一样，也把数据集的季节性考虑在内。

```python
import statsmodels.api as sm

y_hat_avg = test.copy()
fit1 = sm.tsa.statespace.SARIMAX(train.Count, order=(2, 1, 4), seasonal_order=(0, 1, 1, 7)).fit()
y_hat_avg['SARIMA'] = fit1.predict(start="2013-11-1", end="2013-12-31", dynamic=True)
plt.figure(figsize=(16, 8))
plt.plot(train['Count'], label='Train')
plt.plot(test['Count'], label='Test')
plt.plot(y_hat_avg['SARIMA'], label='SARIMA')
plt.legend(loc='best')
plt.show()
# =======
from sklearn.metrics import mean_squared_error
from math import sqrt
rms = sqrt(mean_squared_error(test['Count'], y_hat_avg['SARIMA']))
print(rms) # 26.052705330843708
```

效果
- ![](https://www.biaodianfu.com/wp-content/uploads/2020/09/ARIMA-1-1536x768.png)
- 季节性 ARIMA 的效果和Holt-Winters差不多。根据 `ACF`（**自相关**函数）和 `PACF`（**偏自相关**） 图选择参数。如果你为 ARIMA 模型选择参数时遇到了困难，可以用 R 语言中的 auto.arima。

## ARIMA

ARIMA是一种非常流行的时间序列预测方法，它是`自回归综合移动平均`（Auto-Regressive Integrated Moving Averages）的首字母缩写。

ARIMA模型建立在以下假设的基础上：
- 数据序列是平稳的，即均值和方差不应随时间而变化。通过**对数变换**或**差分**可以使序列**平稳**。
- 输入的数据必须是**单变量**序列，因为ARIMA利用过去的数值预测未来的数值。

ARIMA有三个分量：`AR`(自回归项)、`I`(差分项)和`MA`(移动平均项)。
- AR项是指用于预测下一个值的过去值。AR项由ARIMA中的参数‘p’定义。“p”的值是由PACF图确定的。
- MA项定义了预测未来值时过去预测误差的数目。ARIMA中的参数‘q’代表MA项。ACF图用于识别正确的‘q’值，
- 差分顺序规定了对序列执行差分操作的次数，对数据进行差分操作的目的是使之保持平稳。像ADF和KPSS这样的测试可以用来确定序列是否是平稳的，并有助于识别d值。

### ARIMA计算步骤

通用步骤如下：
1. 加载数据：构建模型的第一步当然是加载数据集。
2. 预处理：根据数据集定义预处理步骤。包括创建时间戳、日期/时间列转换为d类型、序列单变量化等。
3. 序列平稳化：为了满足假设，应确保序列平稳。这包括检查序列的平稳性和执行所需的转换。
4. 确定d值：为了使序列平稳，执行差分操作的次数将确定为d值。
5. 创建ACF和PACF图：这是ARIMA实现中最重要的一步。用ACF PACF图来确定ARIMA模型的输入参数。
6. 确定p值和q值：从上一步的ACF和PACF图中读取p和q的值。
7. 拟合ARIMA模型：利用从前面步骤中计算出来的数据和参数值，拟合ARIMA模型。
8. 在验证集上进行预测：预测未来的值。
9. 计算RMSE：通过检查RMSE值来检查模型的性能，用验证集上的预测值和实际值检查RMSE值。


### Auto ARIMA

虽然ARIMA是一个非常强大的预测时间序列数据的模型，但是数据准备和参数调整过程是非常耗时的。在实现ARIMA之前，需要使数据保持平稳，并使用前面讨论的ACF和PACF图确定p和q的值。Auto ARIMA让整个任务实现起来非常简单，因为它去除了我们在上一节中提到的步骤3至6。下面是实现AUTO ARIMA应该遵循的步骤：
1. 加载数据：此步骤与ARIMA实现步骤1相同。将数据加载到笔记本中。
2. 预处理数据：输入应该是单变量，因此删除其他列。
3. 拟合Auto ARIMA：在单变量序列上拟合模型。
4. 在验证集上进行预测：对验证集进行预测。
5. 计算RMSE：用验证集上的预测值和实际值检查RMSE值。

完全绕过了选择p和q的步骤。

将使用国际航空旅客[数据集](https://datamarket.com/data/set/22u3/international-airline-passengers-monthly-totals-in-thousands-jan-49-dec-60#!ds=22u3&display=line)，此数据集包含每月乘客总数(以千为单位)，有两栏-月份和乘客数。

Auto ARIMA如何选择参数
- 仅需用.efit()命令来拟合模型，而不必选择p、q、d的组合，但是模型是如何确定这些参数的最佳组合的呢？Auto ARIMA生成AIC和BIC值(正如你在代码中看到的那样)，以确定参数的最佳组合。`AIC`(赤池信息准则)和`BIC`(贝叶斯信息准则)值是用于比较模型的评估器。这些值越低，模型就越好。

## Prophet（先知）

Facebook开源的[Prophet: Automatic Forecasting Procedure](https://github.com/facebook/prophet)
- Prophet is a procedure for forecasting time series data based on an additive model where non-linear trends are fit with yearly, weekly, and daily seasonality, plus holiday effects. It works best with time series that have strong seasonal effects and several seasons of historical data. Prophet is robust to missing data and shifts in the trend, and typically handles outliers well.
- [Facebook 时间序列预测算法 Prophet 的研究](https://zhuanlan.zhihu.com/p/52330017)
- ![](https://pic4.zhimg.com/80/v2-8f31f13695126cec5775e83835d14587_1440w.jpg)

Prophet 中，用户一般可以设置以下四种参数：
- Capacity：在增量函数是逻辑回归函数的时候，需要设置的容量值。
- Change Points：可以通过 n_changepoints 和 changepoint_range 来进行等距的变点设置，也可以通过人工设置的方式来指定时间序列的变点。
- 季节性和节假日：可以根据实际的业务需求来指定相应的节假日。
- 光滑参数：
  - t=changepoint_prior_scale 可以用来控制趋势的灵活度
  - δ=seasonality_prior_scale 用来控制季节项的灵活度
  - v=holidays prior scale 用来控制节假日的灵活度

推论
- 先知(像大多数时间序列预测技术一样)试图从过去的数据中捕捉趋势和季节性。该模型通常在时间序列数据集上表现良好，但在本例中没有达到预期效果。
- 事实证明，股票价格没有特定的趋势或季节性。价格的涨跌很大程度上取决于目前市场上的情况。因此，像ARIMA、SARIMA和Prophet这样的预测技术并不能很好地解决这个特殊的问题。

```shell
python -m pip install prophet
```

[入门笔记](https://github.com/facebook/prophet/blob/main/notebooks/quick_start.ipynb)

```python
import pandas as pd
from prophet import Prophet

df = pd.read_csv('https://raw.githubusercontent.com/facebook/prophet/main/examples/example_wp_log_peyton_manning.csv')
df.head()
# 重命名
# df = df.rename(columns={'timestamp':'ds', 'value':'y'})
# df['ds'] = pd.to_datetime(df['ds'],unit='s') # 将时间戳转成时间格式（YYYY-MM-DD hh:mm:ss）
m = Prophet() # 模型初始化，默认使用linear增长函数
#m = Prophet(growth='logistic') 
m.fit(df) # 开始训练
# 计算预测值：periods 表示需要预测的点数，freq 表示时间序列的频率。
future = m.make_future_dataframe(periods=365)
future.tail()

forecast = m.predict(future) # 预测
forecast[['ds', 'yhat', 'yhat_lower', 'yhat_upper']].tail()
# 画出预测图
fig1 = m.plot(forecast)
# 画出时间序列的分量
fig2 = m.plot_components(forecast)
# ------------ Prophet默认参数 --------
def __init__(
    self,
    growth='linear',
    changepoints=None,
    n_changepoints=25, 
    changepoint_range=0.8,
    yearly_seasonality='auto',
    weekly_seasonality='auto',
    daily_seasonality='auto',
    holidays=None,
    seasonality_mode='additive',
    seasonality_prior_scale=10.0,
    holidays_prior_scale=10.0,
    changepoint_prior_scale=0.05,
    mcmc_samples=0,
    interval_width=0.80,
    uncertainty_samples=1000,
)
```

## NeuralProphet

【2022-9-3】[NeuralProphet：基于神经网络的时间序列建模库](https://www.toutiao.com/article/6903317463598039566)

[NeuralProphet](https://github.com/ourownstory/neural_prophet) 是一个python库，用于基于神经网络对时间序列数据进行建模。 它建立在PyTorch之上，并受到Facebook Prophet和AR-Net库的极大启发。Facebook的Prophet库和NeuralProphet之间的主要区别：
- 使用PyTorch的Gradient Descent进行优化，使建模过程比Prophet快得多
- 使用AR-Net建模时间序列自相关（也称为序列相关）
- 自定义损失和指标
- 具有前馈神经网络的可配置非线性层，

使用[示例](github/e-alizadeh/medium/blob/master/notebooks/NeuralProphet/neural_prophet.ipynb)

# 结束


