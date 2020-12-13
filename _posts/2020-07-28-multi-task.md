---
layout: post
title:  "多任务学习-Multi-Task-Learning"
date:   2020-07-28 15:26:00
categories: 机器学习 深度学习
tags: 多任务学习 深度学习 神经网络
excerpt: 多任务学习相关知识点
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

- 现有的多标签 Survey 基本在 2014 年之前，主要有以下几篇：
   1. Tsoumakas 的《Multi-label classification: An overview》(2007)
   2. 周志华老师的《A review on multi-label learning algorithms》(2013)
   3. 一篇比较小众的，Gibaja 《Multi‐label learning: a review of the state of the art and ongoing research》2014
- 【2020-12-13】[多标签学习最新综述](https://mp.weixin.qq.com/s/SCsdWLrBDAKzc9NLAK1jxQ), 武大刘威威老师、南理工沈肖波老师和 UTS Ivor W. Tsang 老师合作的 2020 年多标签最新的 Survey：[The Emerging Trends of Multi-Label Learning](https://arxiv.org/abs/2011.11197)，之前的综述较少，还旧
- 这篇文章主要内容有六大部分：
   - Extreme Multi-Label Classification
      - XML面临的问题
         - 标签空间、特征空间都可能非常巨大
         - 可能存在较多的 Missing Label
         - 标签存在长尾分布，绝大部分标签仅仅有少量样本关联。
      - 常见解法三类，分别为：Embedding Methods、Tree-Based Methods、One-vs-All Methods。
   - Multi-Label with Limited Supervision
      - 相比于传统学习问题，对多标签数据的标注十分困难，更大的标签空间带来的是更高的标注成本。随着我们面对的问题越来越复杂，样本维度、数据量、标签维度都会影响标注的成本。因此，近年多标签的另一个趋势是开始关注如何在有限的监督下构建更好的学习模型。本文将这些相关的领域主要分为三类：
         - MLC with Missing Labels（MLML）：多标签问题中，标签很可能是缺失的。例如，对 XML 问题来说，标注者根本不可能遍历所有的标签，因此标注者通常只会给出一个子集，而不是给出所有的监督信息。文献中解决该问题的技术主要有基于图的方法、基于标签空间（或 Latent 标签空间）Low-Rank 的方法、基于概率图模型的方法。
         - Semi-Supervised MLC：MLML 考虑的是标签维度的难度，但是我们知道从深度学习需要更多的数据，在样本量上，多标签学习有着和传统 AI 相同的困难。半监督 MLC 的研究开展较早，主要技术和 MLML 也相对接近
         - Partial Multi-Label Learning (PML)：PML 是近年来多标签最新的方向，它考虑的是一类 “难以标注的问题”。原因是目标本身就难以识别，或标注人员不专业导致。PML 选择的是让标注者提供所有可能的标签，当然加了一个较强的假设：所有的标签都应该被包含在候选标签集中
         - 现有的 PML 方法划分为 Two-Stage Disambiguation 和 End-to-End 方法
   - Deep Multi-Label Classification
      - 多标签深度学习的模型还没有十分统一的框架，当前对 Deep MLC 的探索主要分为以下一些类别：
         - Deep Embedding Methods：早期的 Embedding 方法通常使用线性投影，将 PCA、Compressed Sensing 等方法引入多标签学习问题。一个很自然的问题是，线性投影真的能够很好地挖掘标签之间的相关关系吗？
         - Deep Learning for Challenging MLC：深度神经网络强大的拟合能力使我们能够有效地处理更多更困难的工作。因此近年的趋势是在 CV、NLP 和 ML 几大 Community，基本都会有不同的关注点，引入 DNN 解决 MLC 的问题，并根据各自的问题发展出自己的一条线。
      - 总结一下，现在的 Deep MLC 呈现不同领域关注点和解决的问题不同的趋势：
         - 从架构上看，基于 Embedding、CNN-RNN、CNN-GNN 的三种架构受到较多的关注。
         - 从任务上，在 XML、弱监督、零样本的问题上，DNN 大展拳脚。
         - 从技术上，Attention、Transformer、GNN 在 MLC 上的应用可能会越来越多。
   - Online Multi-Label Classification
      - 传统的全数据学习的方式已经很难满足现实需求。因此，Online Multi-Label Learning 可能是一个十分重要，也更艰巨的问题。当前 Off-line 的 MLC 模型一般假设所有数据都能够提前获得，然而在很多应用中，或者对大规模的数据，很难直接进行全量数据的使用。一个朴素的想法自然是使用 Online 模型，也就是训练数据序列地到达，并且仅出现一次。
      - 面对这样的数据，如何有效地挖掘多标签相关性呢？本篇 Survey 介绍了一些已有的在线多标签学习的方法，如 OUC[18]、CS-DPP[19]等。
   - Statistical Multi-Label Learning
      - 多标签学习的许多统计性质并没有得到很好的理解。近年 NIPS、ICML 的许多文章都有探索多标签的相关性质。一些值得一提的工作例如，缺失标签下的低秩分类器的泛化误差分析 [21]、多标签代理损失的相合性质[22]、稀疏多标签学习的 Oracle 性质[23] 等等。
   - New Applications
      - 以上方法依然是由任务驱动的

# 多任务学习介绍

## 1.Introduction
 
这一节主要介绍一些基础知识和背景，包括多什么是任务学习和多任务学习的挑战。
 
### 1.1 MTL
-------
 
`MTL`（Multi-Task Learning）有很多形式：`联合学习`（joint learning）、`自主学习`（learning to learn）和`带有辅助任务`的学习（learning with auxiliary task）等都可以指 MTL。一般来说，优化多个损失函数就等同于进行多任务学习（与单任务学习相反）。
 
本篇文章，包括之前的 ESMM 都是属于带有辅助任务的多任务学习。
 
MTL 的目标在于通过利用包含在相关任务训练信号中特定领域的信息来提高泛化能力。
 
那么，什么是相关任务呢？我们有以下几个不严谨的解释：
- 1.  使用相同特征做判断的任务；
- 2.  任务的分类边界接近；
- 3.  预测同个个体属性的不同方面比预测不同个体属性的不同方面更相关；
- 4.  共同训练时能够提供帮助并不一定相关，因为加入噪声有时也可以增加泛化能力。

任务是否相似不是非0即1的。越相似的任务收益越大。但即使相关性不佳的任务也会有所收益。
 
### 1.1.1 Common form
 
MLT 主要有两种形式，一种是基于参数的共享，另一种是基于约束的共享。
 
**Hard 参数共享**
 
参数共享的形式在基于神经网络的 MLT 中非常常见，其在所有任务中共享隐藏层并同时保留几个特定任务的输出层。这种方式有助于降低过拟合风险，因为同时学习的任务越多，模型找到一个含有所有任务的表征就越困难，从而过拟合某个特定任务的可能性就越小。ESMM 就属于这种类型的 MLT。
 
![Google 多任务学习框架 MMoE](http://p3-tt.byteimg.com/large/pgc-image/ba192c31c339490fa48110480e2f9796?from=pc)
 
**Soft 参数共享**
 
每个任务都有自己的参数和模型，最后通过对不同任务的参数之间的差异施加约束。比如可以使用L2进行正则, 迹范数（trace norm）等。
 
![Google 多任务学习框架 MMoE](http://p6-tt.byteimg.com/large/pgc-image/50ccadccf2e044d3a510c2b3d1dd4a08?from=pc)

 
### 1.1.2 Why MTL work
 
那么，为什么 MLT 有效呢？主要有以下几点原因：
- 1.  多任务一起学习时，会互相增加噪声，从而提高模型的泛化能力；
- 2.  多任务相关作用，逃离局部最优解；
- 3.  多任务共同作用模型的更新，增加错误反馈；
- 4.  降低了过拟合的风险；
- 5.  类似 ESMM，解决了样本偏差和数据稀疏问题，未来也可以用来解决冷启动问题。
    
 
### 1.2 Challenge in MTL
--------------------
 
在多任务学习中，假设有这样两个相似的任务：猫分类和狗分类。他们通常会有比较接近的底层特征，比如皮毛、颜色等等。如下图所示：
 
![Google 多任务学习框架 MMoE](http://p6-tt.byteimg.com/large/pgc-image/756bce8da19b413d9629fc98d3abfe96?from=pc)
 
多任务的学习的本质在于共享表示层，并使得任务之间相互影响：
 
![Google 多任务学习框架 MMoE](http://p6-tt.byteimg.com/large/pgc-image/78182f72e35d4c2eb42a822a1a77c2e9?from=pc)
  
如果我们现在有一个与猫分类和狗分类相关性不是太高的任务，如汽车分类：

![Google 多任务学习框架 MMoE](http://p6-tt.byteimg.com/large/pgc-image/7b2fc56ae09e497990796e242a621400?from=pc)
 
那么我们在用多任务学习时，由于底层表示诧异很大，所以共享表示层的效果也就没有那么明显，而且更有可能会出现冲突或者噪声：
 
![Google 多任务学习框架 MMoE](http://p3-tt.byteimg.com/large/pgc-image/3a89d2cc4e874f9e8eb3a2ac4543d055?from=pc)
 
作者给出相关性不同的数据集上多任务的表现，其也阐述了，相关性越低，多任务学习的效果越差：
 
![Google 多任务学习框架 MMoE](http://p6-tt.byteimg.com/large/pgc-image/f850f85949be44a88c1ac9c1fc1db880?from=pc)
 
其实，在实际过程中，如何去识别不同任务之间的相关性也是非常难的：
 
![Google 多任务学习框架 MMoE](http://p1-tt.byteimg.com/large/pgc-image/5ed2a60bae25442496ce1179acca00bd?from=pc)

# 工程实现

## [Google 多任务学习框架 MMoE](https://www.toutiao.com/i6838966189872382475/?tt_from=mobile_qq&utm_campaign=client_share&timestamp=1595857174&app=news_article&utm_source=mobile_qq&utm_medium=toutiao_android&use_new_style=1&req_id=20200727213933010147084145261AF78B&group_id=6838966189872382475)
 
基于神经网络的多任务学习已经过成功应用内许多现实应用中，比如说之前我们介绍的阿里巴巴基于多任务联合学习的 ESMM 算法，其利用多任务学习解决了 CVR 中样本选择偏差和样本稀疏这两大问题，并在实际应用场景中取得了不错的成绩。
 
多任务学习的目的在于用一个模型来同时学习多个目标和任务，但常用的任务模型的预测质量通常对任务之间的关系很敏感（数据分布不同，ESMM 解决的也是这个问题），因此，google 提出多门混合专家算法（Multi-gate Mixture-of-Experts，以下简称 MMoE）旨在学习如何从数据中权衡任务目标（task-specific objectives）和任务之间（inter-task relationships）的关系。所有任务之间共享混合专家结构（MoE）的子模型来适应多任务学习，同时还拥有可训练的门控网路（Gating Network）以优化每一个任务。
 
MMoE 算法在任务相关性较低时能够具有更好的性能，同时也可以提高模型的可训练性。作者也将 MMoE 应用于真实场景中，包括二分类和推荐系统，并取得了不错的成绩。
  
作者提出了 MMoE 框架，旨在构建一个兼容性更强的多任务学习框架。
 
### 2.MMoE
======
 
本节我们详细介绍下 MMoE 框架。
 
### 2.1 Shared-Bottom model
-----------------------
 
先简单结下 shared-bottom 模型，ESMM 模型就是基于 shared-bottom 的多任务模型。这篇文章把该框架作为多任务模型的 baseline，其结构如下图所示：
 
![Google 多任务学习框架 MMoE](http://p3-tt.byteimg.com/large/pgc-image/e1bb88b5cd23429d82f832e6e27e7573?from=pc)
 
  
 
给出公式定义：
 
其中，f 为表征函数， 为第 k 个子网络（tower 网络）。
 
### 2.2 One-gate MoE Layer
----------------------
 
而 One-gate MoE layer 则是将隐藏层划分为三个专家（expert）子网，同时接入一个 Gate 网络将各个子网的输出和输入信息进行组合，并将得到的结果进行相加。
 
![Google 多任务学习框架 MMoE](http://p6-tt.byteimg.com/large/pgc-image/22b1b813f58e482e8f5e5e42e8c22a4d?from=pc)

公式如下：
 
其中， 为第 i 个专家子网的输出；， 为第 i 个 logit 输出，表示专家子网 的权重，其由 gate 网络计算得出。
 
MoE 的主要目标是实现条件计算，对于每个数据而言，只有部分网络是活跃的，该模型可以通过限制输入的门控网络来选择专家网络的子集。
 
### 2.3 Multi-gate MoE model
------------------------
 
MoE 能够实现不同数据多样化使用共享层，但针对不同任务而言，其使用的共享层是一致的。这种情况下，如果任务相关性较低，则会导致模型性能下降。
 
所以，作者在 MoE 的基础上提出了 MMoE 模型，为每个任务都设置了一个 Gate 网路，旨在使得不同任务和不同数据可以多样化的使用共享层，其模型结构如下：
 
![Google 多任务学习框架 MMoE](http://p6-tt.byteimg.com/large/pgc-image/dc1f76987a4240eb85c4b69352a89ebb?from=pc)

给出公式定义：
 
这种情况下，每个 Gate 网络都可以根据不同任务来选择专家网络的子集，所以即使两个任务并不是十分相关，那么经过 Gate 后也可以得到不同的权重系数，此时，MMoE 可以充分利用部分 expert 网络的信息，近似于单个任务；而如果两个任务相关性高，那么 Gate 的权重分布相差会不大，会类似于一般的多任务学习。
 
### 3.Experiment
============
 
简单看下实验。
 
首先是不同 MLT 模型对在不同相关性任务下的参数分布，其可以反应模型的鲁棒性。可以看到 MMeE 模型性能还是比较稳定的。
 
![Google 多任务学习框架 MMoE](http://p1-tt.byteimg.com/large/pgc-image/b5dc49c0bd9347f0be0619b3d9302ce7?from=pc)
  
 
第一组数据集的表现：
 
![Google 多任务学习框架 MMoE](http://p6-tt.byteimg.com/large/pgc-image/9e446451f6e546aab8b1bfb4f962f3d9?from=pc)
 

第二组数据集的表现：
 
![Google 多任务学习框架 MMoE](http://p6-tt.byteimg.com/large/pgc-image/22cefe0227f945c19386e993bc088c82?from=pc)
 
大型推荐系统的表现：
 
![Google 多任务学习框架 MMoE](http://p6-tt.byteimg.com/large/pgc-image/a810b9454c9640198006d3e51cebea83?from=pc)
 
Gate 网络在两个任务的不同分布：
 
![Google 多任务学习框架 MMoE](http://p6-tt.byteimg.com/large/pgc-image/ebee034ccc994148bd82276aff27f096?from=pc)
  
 
### 4.Conclusion
============
 
总结：作者提出了一种新颖的多任务学习方法——MMoE，其通过多个 Gate 网络来自适应学习不同数据在不同任务下的与专家子网的权重关系系数，从而在相关性较低的多任务学习中取得不错的成绩。
 
共享网络节省了大量计算资源，且 Gate 网络参数较少，所以 MMoE 模型很大程度上也保持了计算优势

# 实践


## TensorFlow实现多任务学习

- [Tensorflow多任务学习总结](https://blog.csdn.net/chanbo8205/article/details/86539355)，faster rcnn是检测和分类的多任务学习

### 单任务网络框架

- ![](https://jg8610.github.io/images/toy.png)
- 代码

```python
# Import Tensorflow and Numpy
import Tensorflow as tf
import numpy as np
 
# ======================
# Define the Graph
# ======================
 
# Create Placeholders For X And Y (for feeding in data)
X = tf.placeholder("float",[10, 10],name="X") # Our input is 10x10
Y = tf.placeholder("float", [10, 1],name="Y") # Our output is 10x1
 
# Create a Trainable Variable, "W", our weights for the linear transformation
initial_W = np.zeros((10,1))
W = tf.Variable(initial_W, name="W", dtype="float32")
 
# Define Your Loss Function
Loss = tf.pow(tf.add(Y,-tf.matmul(X,W)),2,name="Loss")
 
with tf.Session() as sess: # set up the session
    sess.run(tf.initialize_all_variables())
    Model_Loss = sess.run(
                Loss, # the first argument is the name of the Tensorflow variabl you want to return
                { # the second argument is the data for the placeholders
                  X: np.random.rand(10,10),
                  Y: np.random.rand(10).reshape(-1,1)
                })
    print(Model_Loss)
 ```
 
### 交替训练

- 多任务的一个特点是单个tensor输入(X)，多个输出(Y_1,Y_2...)。因此在定义占位符时要定义多个输出。同样也需要有多个损失函数用于分别计算每个任务的损失。
- 选择训练需要在每个loss后面接一个优化器，这样就意味着每一次的优化只针对于当前任务，也就是说另一个任务是完全不管的
   - ![](https://jg8610.github.io/images/basic_shared.png)
- 在训练上有些疑惑，feed数据上面是否要同时把两个标签的数据都输入呢？需要，那么就意味着另一任务还是会进行正向传播运算的。

```python
# Import Tensorflow and Numpy
import Tensorflow as tf
import numpy as np
 
# ======================
# Define the Graph
# ======================
 
# Define the Placeholders
X = tf.placeholder("float", [10, 10], name="X")
Y1 = tf.placeholder("float", [10, 20], name="Y1")
Y2 = tf.placeholder("float", [10, 20], name="Y2")
 
# Define the weights for the layers
 
initial_shared_layer_weights = np.random.rand(10,20)
initial_Y1_layer_weights = np.random.rand(20,20)
initial_Y2_layer_weights = np.random.rand(20,20)
 
shared_layer_weights = tf.Variable(initial_shared_layer_weights, name="share_W", dtype="float32")
Y1_layer_weights = tf.Variable(initial_Y1_layer_weights, name="share_Y1", dtype="float32")
Y2_layer_weights = tf.Variable(initial_Y2_layer_weights, name="share_Y2", dtype="float32")
 
# Construct the Layers with RELU Activations
shared_layer = tf.nn.relu(tf.matmul(X,shared_layer_weights))
Y1_layer = tf.nn.relu(tf.matmul(shared_layer,Y1_layer_weights))
Y2_layer = tf.nn.relu(tf.matmul(shared_layer,Y2_layer_weights))
 
# Calculate Loss
Y1_Loss = tf.nn.l2_loss(Y1-Y1_layer)
Y2_Loss = tf.nn.l2_loss(Y2-Y2_layer)
 
# optimisers
Y1_op = tf.train.AdamOptimizer().minimize(Y1_Loss)
Y2_op = tf.train.AdamOptimizer().minimize(Y2_Loss)
 
# Calculation (Session) Code
# ==========================
 
# open the session
 
with tf.Session() as session:
    session.run(tf.initialize_all_variables())
    for iters in range(10):
        if np.random.rand() < 0.5:
            _, Y1_loss = session.run([Y1_op, Y1_Loss],
                            {
                              X: np.random.rand(10,10)*10,
                              Y1: np.random.rand(10,20)*10,
                              Y2: np.random.rand(10,20)*10
                              })
            print(Y1_loss)
        else:
            _, Y2_loss = session.run([Y2_op, Y2_Loss],
                            {
                              X: np.random.rand(10,10)*10,
                              Y1: np.random.rand(10,20)*10,
                              Y2: np.random.rand(10,20)*10
                              })
            print(Y2_loss)
```

### 联合训练
 
- ![](https://jg8610.github.io/images/joint_op.png)
- 代码

```python
# Import Tensorflow and Numpy
import Tensorflow as tf
import numpy as np
 
# ======================
# Define the Graph
# ======================
 
# Define the Placeholders
X = tf.placeholder("float", [10, 10], name="X")
Y1 = tf.placeholder("float", [10, 20], name="Y1")
Y2 = tf.placeholder("float", [10, 20], name="Y2")
 
# Define the weights for the layers
 
initial_shared_layer_weights = np.random.rand(10,20)
initial_Y1_layer_weights = np.random.rand(20,20)
initial_Y2_layer_weights = np.random.rand(20,20)
 
shared_layer_weights = tf.Variable(initial_shared_layer_weights, name="share_W", dtype="float32")
Y1_layer_weights = tf.Variable(initial_Y1_layer_weights, name="share_Y1", dtype="float32")
Y2_layer_weights = tf.Variable(initial_Y2_layer_weights, name="share_Y2", dtype="float32")
 
# Construct the Layers with RELU Activations
shared_layer = tf.nn.relu(tf.matmul(X,shared_layer_weights))
Y1_layer = tf.nn.relu(tf.matmul(shared_layer,Y1_layer_weights))
Y2_layer = tf.nn.relu(tf.matmul(shared_layer,Y2_layer_weights))
 
# Calculate Loss
Y1_Loss = tf.nn.l2_loss(Y1-Y1_layer)
Y2_Loss = tf.nn.l2_loss(Y2-Y2_layer)
Joint_Loss = Y1_Loss + Y2_Loss
 
# optimisers
Optimiser = tf.train.AdamOptimizer().minimize(Joint_Loss)
Y1_op = tf.train.AdamOptimizer().minimize(Y1_Loss)
Y2_op = tf.train.AdamOptimizer().minimize(Y2_Loss)
 
# Joint Training
# Calculation (Session) Code
# ==========================
 
# open the session
 
with tf.Session() as session:
    session.run(tf.initialize_all_variables())
    _, Joint_Loss = session.run([Optimiser, Joint_Loss],
                    {
                      X: np.random.rand(10,10)*10,
                      Y1: np.random.rand(10,20)*10,
                      Y2: np.random.rand(10,20)*10
                      })
    print(Joint_Loss)
```

### 交替训练还是联合训练？

- 什么时候交替训练好? 不同数据集

>- Alternate training is a good idea when you have two different datasets for each of the different tasks (for example, translating from English to French and English to German). By designing a network in this way, you can improve the performance of each of your individual tasks without having to find more task-specific training data.
>- 当对每个不同的任务有两个不同的数据集（例如，从英语翻译成法语，英语翻译成德语）时，交替训练是一个好主意。通过以这种方式设计网络，可以提高每个任务的性能，而无需找到更多任务特定的训练数据。

这里的例子很好理解，但是“数据集”指的应该不是输入数据X。我认为应该是指输出的结果Y_1、Y_2关联不大。

- 什么时候联合训练好？相同数据集
   - 交替训练容易对某一类产生偏向，当对于相同数据集，产生不同属性的输出时，保持任务的独立性，使用联合训练较好。


[参考](https://www.kdnuggets.com/2016/07/multi-task-learning-tensorflow-part-1.html)

## MNIST与Fashion MNIST实践

- 参考：[TensorFlow使用记录 (十四）： Multi-task to MNIST + Fashion MNIST](https://www.cnblogs.com/xuanyuyt/p/11753427.html)
- 数据集：[MNIST](http://yann.lecun.com/exdb/mnist/)、[Fashion_MNIST](http://www.worldlink.com.cn/en/osdir/fashion-mnist.html)
   - 这两个数据集下载下来是压缩文件格式的，为了方便后面使用，先用一下代码转一下
   - ![](https://img2018.cnblogs.com/blog/690218/201910/690218-20191028171105096-1874813119.png)
- 转换

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# ================================================================
# @Time    : 2019/10/25 10:50
# @Author  : YangTao
# @Site    : 
# @File    : process.py
# @IDE: PyCharm Community Edition
# ================================================================
import os

# MNIST
MNIST = '../../MNIST_data'
def convert(imgf, labelf, outf, n):
  f = open(imgf, "rb")
  o = open(outf, "w")
  l = open(labelf, "rb")

  f.read(16)
  l.read(8)
  images = []

  for i in range(n):
    image = [ord(l.read(1))]
    for j in range(28*28):
      image.append(ord(f.read(1)))
    images.append(image)

  for image in images:
    o.write(",".join(str(pix) for pix in image)+"\n")
  f.close()
  o.close()
  l.close()

convert(os.path.join(MNIST, "train-images-idx3-ubyte"), os.path.join(MNIST, "train-labels-idx1-ubyte"), os.path.join(MNIST, "mnist_train.csv"), 60000)
convert(os.path.join(MNIST, "t10k-images-idx3-ubyte"), os.path.join(MNIST, "t10k-labels-idx1-ubyte"), os.path.join(MNIST, "mnist_test.csv"), 10000)
```
   
```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# ================================================================
# @Time    : 2019/10/25 13:50
# @Author  : YangTao
# @Site    :
# @File    : dataset.py
# @IDE: PyCharm Community Edition
# ================================================================
import os
import numpy as np
import tensorflow as tf
from matplotlib import pyplot as plt

F_class_names = ['T-shirt/top', 'Trouser', 'Pullover', 'Dress', 'Coat',
               'Sandal', 'Shirt', 'Sneaker', 'Bag', 'Ankle boot']

class MNISTplusFashion(object):
    data_dirM = './MNIST'
    data_dirF = './F_MNIST'

    def __init__(self, phase, batch_size=10):
        self.num_classes = 10
        self.train_input_size_h = 28
        self.train_input_size_w = 28
        self.batch_size = batch_size
        if phase == 'train':
            self.dataM = open(os.path.join(self.data_dirM, 'mnist_train.csv'), 'r').read().split('\n')[:-1]
            self.flagM = np.zeros(shape=(len(self.dataM)), dtype=np.int)
            self.dataF = open(os.path.join(self.data_dirF, 'fashion_mnist_train.csv'), 'r').read().split('\n')[:-1]
            self.flagF = np.ones(shape=(len(self.dataF)), dtype=np.int)
        elif phase == 'val':
            self.dataM = open(os.path.join(self.data_dirM, 'mnist_test.csv'), 'r').read().split('\n')[:-1]
            self.flagM = np.zeros(shape=(len(self.dataM)), dtype=np.int)
            self.dataF = open(os.path.join(self.data_dirF, 'fashion_mnist_test.csv'), 'r').read().split('\n')[:-1]
            self.flagF = np.ones(shape=(len(self.dataF)), dtype=np.int)
        self.dataM = [d.split(',') for d in self.dataM]
        self.dataF = [d.split(',') for d in self.dataF]

        data = self.dataM + self.dataF
        flag = np.concatenate([self.flagM ,self.flagF],axis=0)
        self.num_samples = len(flag)  # dataset size
        self.num_batchs = int(np.ceil(self.num_samples / self.batch_size))  # 向上取整
        self.batch_count = 0  # batch index

        # np.random.seed(1)
        random_idx = np.random.permutation(self.num_samples)
        self.data = []
        for index in random_idx:
            self.data.append(data[index] + [flag[index]])

    def __iter__(self):
        return self

    def __next__(self):
        with tf.device('/cpu:0'):
            batch_image = np.zeros((self.batch_size, self.train_input_size_h, self.train_input_size_w, 1))
            batch_label = np.zeros((self.batch_size, self.num_classes))
            batch_tag = np.zeros((self.batch_size, 1))
            num = 0  # sample in one batch's index
            if self.batch_count < self.num_batchs:
                while num < self.batch_size:
                    index = self.batch_count * self.batch_size + num
                    if index >= self.num_samples:  # 从头开始
                        index -= self.num_samples

                    batch_image[num, :, :, :] = np.array(
                        self.data[index][1:-1]).reshape(
                            self.train_input_size_h, self.train_input_size_w,1
                        ).astype(np.float32) / 255.0
                    # ======================
                    # smooth onehot label
                    onehot = np.zeros(self.num_classes, dtype=np.float)
                    onehot[int(self.data[index][0])] = 1.0
                    uniform_distribution = np.full(self.num_classes, 1.0 / self.num_classes)
                    deta = 0.01
                    smooth_onehot = onehot * (1 - deta) + deta * uniform_distribution
                    # ======================
                    batch_label[num, :] = smooth_onehot # self.data[index][0]
                    batch_tag[num] = self.data[index][-1]
                    num += 1
                self.batch_count += 1
                return batch_image, batch_label, batch_tag
            else:
                self.batch_count = 0
                np.random.shuffle(self.data)
                raise StopIteration

    def __len__(self):
        return self.num_batchs

def show_batch(img_batch):
  grid_image = img_batch[0,:,:,0]
  for idx, img in enumerate(img_batch):
    if idx == 0:
      continue
    grid_image = np.hstack((grid_image, img[:,:,0]))

  plt.imshow(grid_image)

  plt.title('Batch from dataloader')

if __name__ == "__main__":
    val_data = MNISTplusFashion(phase='val', batch_size=10)
    for idx in range(val_data.num_batchs):
        batch_image, batch_label, batch_tag = val_data.__next__()
        print("sample %d," % idx, batch_image.shape, batch_label.shape, batch_tag.shape)
        plt.figure()
        show_batch(batch_image)
        plt.axis('off')
        plt.ioff()
        plt.show()
```
   
- 代码

```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
# ================================================================
# @Time    : 2019/10/25 15:30
# @Author  : YangTao
# @Site    :
# @File    : dataset.py
# @IDE: PyCharm Community Edition
# ================================================================

import tensorflow as tf
from tqdm import tqdm
import numpy as np
from matplotlib import pyplot as plt
from dataset import MNISTplusFashion, show_batch

print(tf.__version__)
# 1. create data
trainset = MNISTplusFashion(phase='train', batch_size=100)
testset = MNISTplusFashion(phase='val', batch_size=20000)

with tf.variable_scope('Input'):
    tf_x = tf.placeholder(dtype=tf.float32, shape=[None, 28, 28, 1], name='x')
    tf_y = tf.placeholder(dtype=tf.float32, shape=[None, 10], name='y')
    tf_flag = tf.placeholder(dtype=tf.float32, shape=[None, 1], name='flag')
    is_training = tf.placeholder(dtype=tf.bool, shape=None)
    global_step = tf.Variable(1.0, dtype=tf.float64, trainable=False, name='global_step')

idxM = tf.where(tf.equal(tf_flag, 0))[:,0]
idxF = tf.where(tf.equal(tf_flag, 1))[:,0]
tf_yM = tf.gather(tf_y, idxM)
tf_yF= tf.gather(tf_y, idxF)

# 2. define Network
with tf.variable_scope('Net'):
    # conv1 = tf.layers.conv2d(inputs=tf_x, filters=96, kernel_size=3,
    #                          strides=1, padding='same', activation=tf.nn.relu) # 96x28x28
    # conv2 = tf.layers.conv2d(inputs=conv1, filters=96, kernel_size=3,
    #                          strides=1, padding='same', activation=tf.nn.relu)  # 96x28x28
    # conv3 = tf.layers.conv2d(inputs=conv2, filters=96, kernel_size=3,
    #                          strides=2, padding='same', activation=tf.nn.relu)  # 96x14x14
    # conv4 = tf.layers.conv2d(inputs=conv3, filters=192, kernel_size=3,
    #                          strides=1, padding='same', activation=tf.nn.relu)  # 192x14x14
    # conv5 = tf.layers.conv2d(inputs=conv4, filters=192, kernel_size=3,
    #                          strides=1, padding='same', activation=tf.nn.relu)  # 192x14x14
    # conv6 = tf.layers.conv2d(inputs=conv5, filters=192, kernel_size=3,
    #                          strides=2, padding='same', activation=tf.nn.relu)  # 192x7x7
    # conv7 = tf.layers.conv2d(inputs=conv6, filters=192, kernel_size=3,
    #                          strides=1, activation=tf.nn.relu)  # 192x5x5
    # conv8 = tf.layers.conv2d(inputs=conv7, filters=192, kernel_size=1,
    #                          strides=1, activation=tf.nn.relu)  # 192x5x5
    # classifier = tf.layers.conv2d(inputs=conv8, filters=10, kernel_size=1,
    #                          strides=1, activation=tf.nn.relu)  # 10x5x5
    # predict = tf.layers.average_pooling2d(inputs=classifier, pool_size=5, strides=1)
    # predict = tf.reshape(predict, [-1, 1])
    # ======================
    conv1 = tf.layers.conv2d(inputs=tf_x, filters=32, kernel_size=5,
                             strides=1, padding='same', activation=tf.nn.relu)  # 32x28x28
    pool1 = tf.layers.max_pooling2d(inputs=conv1, pool_size=2, strides=2) # 32x14x14
    conv2 = tf.layers.conv2d(pool1, 64, 3, 1, 'same', activation=tf.nn.relu) # 64x14x14
    pool2 = tf.layers.max_pooling2d(conv2, 2, 2) # 64x7x7
    pool2_flat = tf.reshape(pool2, [-1, 7*7*64])
    pool2_flatM = tf.gather(pool2_flat, idxM)
    pool2_flatF = tf.gather(pool2_flat, idxF)
    with tf.variable_scope('MNIST'):
        fc1M = tf.layers.dense(pool2_flatM, 1024, tf.nn.relu)
        fc1M = tf.layers.dropout(fc1M, rate=0.5, training=is_training)
        fc2M = tf.layers.dense(fc1M, 512, tf.nn.relu)
        fc2M = tf.layers.dropout(fc2M, rate=0.5, training=is_training)
        predictM = tf.layers.dense(fc2M, 10)
    with tf.variable_scope('F_MNIST'):
        fc1F = tf.layers.dense(pool2_flatF, 1024, tf.nn.relu)
        fc1F = tf.layers.dropout(fc1F, rate=0.5, training=is_training)
        fc2F = tf.layers.dense(fc1F, 521, tf.nn.relu)
        fc2F = tf.layers.dropout(fc2F, rate=0.5, training=is_training)
        predictF = tf.layers.dense(fc2F, 10)

# 3. define loss & accuracy
with tf.name_scope('loss'):
    lossM = tf.losses.softmax_cross_entropy(onehot_labels=tf_yM, logits=predictM, label_smoothing=0.01)
    tf.summary.scalar('lossM', lossM)
    lossF = tf.losses.softmax_cross_entropy(onehot_labels=tf_yF, logits=predictF, label_smoothing=0.01)
    tf.summary.scalar('lossF', lossF)
    loss = lossM + lossF
    tf.summary.scalar('loss', loss)

with tf.name_scope('accuracy'):
    # tf.metrics.accuracy() 返回 累计[上次的平均accuracy， 这次的平均accuracy]
    accuracyM = tf.metrics.accuracy(labels=tf.argmax(tf_yM, axis=1), predictions=tf.argmax(predictM, axis=1))[1]
    tf.summary.scalar('accuracyM', accuracyM)
    accuracyF = tf.metrics.accuracy(labels=tf.argmax(tf_yF, axis=1), predictions=tf.argmax(predictF, axis=1))[1]
    tf.summary.scalar('accuracyF', accuracyF)

# 4. define optimizer
with tf.name_scope('train'):
    optimizer_op = tf.train.AdamOptimizer(1e-4).minimize(loss, global_step=global_step)

# 5. initialize
init_op = tf.group(tf.global_variables_initializer(), tf.local_variables_initializer())

# 6.train
saver = tf.train.Saver()
save_path = './cnn_mnist.ckpt'

# Set sess configuration
# ============================== config GPU
sess_config = tf.ConfigProto(allow_soft_placement=True)
# sess_config.gpu_options.per_process_gpu_memory_fraction = 0.95
sess_config.gpu_options.allow_growth = True
sess_config.gpu_options.allocator_type = 'BFC'
# ==============================

with tf.Session(config=sess_config) as sess:
    sess.run(init_op)
    # =================
    merge_op = tf.summary.merge_all()
    train_writer = tf.summary.FileWriter('logs/train', sess.graph)
    test_writer = tf.summary.FileWriter('logs/test', sess.graph)
    # tensorboard --logdir=logs --host=127.0.0.1
    # =================
    for epoch in range(20):
        pbar = tqdm(trainset)
        train_epoch_loss = []
        for train_data in pbar:
            _, ls, train_output, global_step_val = sess.run([optimizer_op, loss, merge_op, global_step],
                                           feed_dict={tf_x: train_data[0], tf_y: train_data[1],
                                                      tf_flag: train_data[2], is_training: True})
            train_writer.add_summary(train_output, global_step=global_step_val)
            pbar.set_description(("train loss:{:.4f}").format(ls))
        for test_data in testset:
            acc_testM, acc_testF, test_ouput  = sess.run([accuracyM, accuracyF, merge_op],
                                             feed_dict={tf_x: test_data[0], tf_y: test_data[1],
                                                        tf_flag: test_data[2], is_training: False})
            print('epoch: ', epoch, ' | test accuracyM: {:.3f}, test accuracyF: {:.3f}'.format(acc_testM, acc_testF))
            sess.run(tf.local_variables_initializer()) # 不加上这句的话 accuracy 就是个累积平均值了
            test_writer.add_summary(test_ouput, global_step=global_step_val)
    saver.save(sess, save_path)
```



# 结束


