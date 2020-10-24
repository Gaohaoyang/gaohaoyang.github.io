---
layout: post
title:  "tensorflow学习笔记"
date:   2020-08-31 17:25:00
categories: 编程语言
tags: Tensorflow Python 深度学习 Pytorch
excerpt: Tensorflow编程技能汇总
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

【2020-8-31】[30天吃掉那只TensorFlow2](https://github.com/lyhue1991/eat_tensorflow2_in_30_days)

## Tensorflow v.s. Pytorch

结论：
- 如果是工程师，应该优先选TensorFlow2.
- 如果是学生或者研究人员，应该优先选择Pytorch.
- 如果时间足够，最好TensorFlow2和Pytorch都要学习掌握。
- 理由如下：
    - 1，在工业界最重要的是模型落地，目前国内的大部分互联网企业只支持TensorFlow模型的在线部署，不支持Pytorch。 并且工业界更加注重的是模型的高可用性，许多时候使用的都是成熟的模型架构，调试需求并不大。
    - 2，研究人员最重要的是快速迭代发表文章，需要尝试一些较新的模型架构。而Pytorch在易用性上相比TensorFlow2有一些优势，更加方便调试。 并且在2019年以来在学术界占领了大半壁江山，能够找到的相应最新研究成果更多。
    - 3，TensorFlow2和Pytorch实际上整体风格已经非常相似了，学会了其中一个，学习另外一个将比较容易。两种框架都掌握的话，能够参考的开源模型案例更多，并且可以方便地在两种框架之间切换。
- Keras库在2.3.0版本后将不再更新，用户应该使用tf.keras



# Tensorflow介绍

- [TensorFlow](https://www.tensorflow.org/get_started/) 是一种采用数据流图（data flow graphs），用于数值计算的开源软件库。
- 其中 Tensor 代表传递的数据为张量（多维数组），Flow 代表使用计算图进行运算。
- 数据流图用「结点」（nodes）和「边」（edges）组成的有向图来描述数学运算。
    - 「结点」一般用来表示施加的数学操作，但也可以表示数据输入的起点和输出的终点，或者是读取/写入持久变量（persistent variable）的终点。
        - 节点的类型可以分为三种：
            - **存储**节点：有状态的变量操作，通常用于存储模型参数
            - **计算**节点：无状态的计算和控制操作，主要负责算法的逻辑或流程的控制
            - **数据**节点：数据的占位符操作，用于描述图外输入的数据
    - 边表示结点之间的输入/输出关系。这些数据边可以传送维度可动态调整的多维数据数组，即张量（tensor）。
    - 总结：
        - ![](https://pic3.zhimg.com/80/v2-b68c14de7ffcdae9dc2707992ae46f12_720w.jpg)
    - ![](https://pic4.zhimg.com/v2-4a67e12961d71d510c83c2aa35a8febb_b.webp)
- 在 Tensorflow 中，所有不同的变量和运算都是储存在计算图。所以构建完模型所需要的图后，还需要打开一个会话（Session）来运行整个计算图。在会话中，我们可以将所有计算分配到可用的 CPU 和 GPU 资源中。
- TensorFlow 中最基本的单位是**常量**（Constant）、**变量**（Variable）和**占位符**（Placeholder）。
    - **常量**定义后值和维度不可变。tf.constant()
    - **变量**定义后值可变而维度不可变。tf.Variable()
        - 创建方式：
        - 每次使用之前，都需要为其进行初始化：tf.global_variables_initializer()
    - 在神经网络中，**变量**一般可作为储存权重和其他信息的矩阵，而**常量**可作为储存超参数或其他结构信息的变量。
    - **占位符**并没有初始值，它只会分配必要的内存。在会话中，占位符可以使用 feed_dict 馈送数据。tf.placeholder
        - train_filenames = tf.placeholder(tf.string, shape=[None]) # 运行时才能定下来
        - feed_dict={train_filenames: training_filenames}
    - **稀疏张量**：tf.SparseTensor
- **张量**是计算图执行运算的基本载体
    - ![](https://pic3.zhimg.com/80/v2-d8a71cabf42889643b6c5204e57f526a_720w.jpg)
    - 零阶张量就是我们熟悉的标量数字，它仅仅只表达了量的大小或性质而没有其它的描述。
    - 一阶张量即我们熟悉的向量，它不仅表达了线段量的大小，同时还表达了方向。
    - 一般来说二维向量可以表示平面中线段的量和方向，三维向量和表示空间中线段的量和方向。
    - 二阶张量即矩阵，可以看作是填满数字的一个表格，矩阵运算即一个表格和另外一个表格进行运算。
    - 当然理论上可以产生任意阶的张量，但在实际的机器学习算法运算中，用得最多的还是一阶张量（向量）和二阶张量（矩阵）。
    - 一张图巩固以上概念
        - ![](https://pic1.zhimg.com/80/v2-01e9c557370315fed759a32de7d745e0_720w.jpg)
    - 张量中每个元素的数据类型有以上几种，即浮点型和整数型，一般在神经网络中比较常用的是 32 位浮点型
        - ![](https://pic4.zhimg.com/80/v2-1cdaed3e8d9bbf40004492738c01c7af_720w.jpg)
- 所有 TensorFlow 机器学习模型所遵循的构建流程，即构建计算图、馈送输入张量、更新权重并返回输出值。
    - ![](https://pic3.zhimg.com/80/v2-b4070f6384abd7d946aab57126fdf7ca_720w.jpg)


```python
# 1.使用Variable类来创建
# tf.random_normal 方法返回形状为(1，4)的张量。它的4个元素符合均值为100、标准差为0.35的正态分布。
W = tf.Variable(initial_value=tf.random_normal(shape=(1, 4), mean=100, stddev=0.35), name="W")
b = tf.Variable(tf.zeros([4]), name="b")

# 2.使用get_variable的方式来创建
my_int_variable = tf.get_variable("my_int_variable", [1, 2, 3], dtype=tf.int32,
  initializer=tf.zeros_initializer)
```


## 基本原理

- 【2017-10-8】[香港科技大学TensorFlow课件分享](https://zhuanlan.zhihu.com/p/29936078)，TensorFlow 三天速成课，[Google Drive地址](https://drive.google.com/drive/folders/0B41Zbb4c8HVyY1F5Ml94Z2hodkE)，[百度云地址](https://pan.baidu.com/s/1boGGzeR?errmsg=Auth+Login+Sucess&errno=0&ssnerror=0&)
![](https://slide.cdn.myslide.cn/f74cc56b5d33c2de7048ad776b0f87ef/slide-005.jpg)

- [什么是Tensorflow](https://zhuanlan.zhihu.com/p/59077525)
- 总结
    - 使用 **张量**tensor 表示**数据**.
    - 使用**图** (graph) 来表示**计算任务**.
    - 在**会话**（session)中运行图
    - 通过 **变量** (Variable) 维护状态.
- TensorFlow 是一个编程系统, 使用图来表示计算任务. 
    - 图中的节点被称之为 op (operation 的缩写). 一个 op 获得 0 个或多个 Tensor, 执行计算, 产生 0 个或多个 Tensor. 
    - 每个 Tensor 是一个类型化的多维数组.

### Session

- TensorFlow程序通常被组织成一个构建阶段和执行阶段. 
    - 在构建阶段, op的执行步骤被描述成一个图. 
        - 注意：有向图，意味着前面执行完了，才是后面
    - 在执行阶段, 使用会话执行执行图中的op。
- 示例程序

```python
import tensorflow as tf
# 创建数据流图：y = W * x + b，其中W和b为存储节点，x为数据节点。
x = tf.placeholder(tf.float32)
W = tf.Variable(1.0)
b = tf.Variable(1.0)
y = W * x + b

# =========如果不使用session来运行，那上面的代码只是一张图。我们通过session运行这张图，得到想要的结果
with tf.Session() as sess:
    tf.global_variables_initializer().run() # Operation.run
    fetch = y.eval(feed_dict={x: 3.0})      # Tensor.eval
    print(fetch)   # fetch = 1.0 * 3.0 + 1.0
# 损失函数
logits = tf.matmul(X,W)+b
hypothesis = tf.nn.softmax(logits)
# Cross entropy cost/loss
cost = tf.reduce_mean (-tf.reduce_sum(Y * tf.log(hypothesis), axis=1))
# 改进版（数值计算更安全）
cost = tf.reduce_mean(tf.nn.softmax_cross_entropy_with_logits(logits=logits, labels=Y))
# 优化器
train = tf.train.GradientDescentOptimizer(learning_rate=0.01).minimize(cost)



```


### Fetch

- 在session.run的时候传入多个op(tensor)，然后返回多个tensor(如果只传入一个tensor的话，那就是返回一个tensor)

### eval和run

- tensor.eval()和Operation.run()调用的还是session.run。
- 不同的是session.run可以一次返回多个tensor(通过Fetch)。

![](https://pic1.zhimg.com/80/v2-8b4ef9ca40ca7f03d14751fd421c59d4_720w.jpg)


## Tensorboard使用

- 5个步骤

```python
# (1) From TF graph, decide which tensors you want to log
w2_hist = tf.summary.histogram("weights2", W2)
cost_summ = tf.summary.scalar("cost", cost)
# (2) Merge all summaries
summary = tf.summary.merge_all()
Create writer and add graph
# (3) Create summary writer
writer = tf.summary.FileWriter(‘./logs’)
writer.add_graph(sess.graph)
# (4) Run summary merge and add_summary
s, _ = sess.run([summary, optimizer], feed_dict=feed_dict)
writer.add_summary(s, global_step=global_step)
# (5) Launch TensorBoard
tensorboard --logdir=./logs
# 端口映射，远程server调用本地日志
#ssh -L local_port:127.0.0.1:remote_port username@server.com
ssh -L 7007:121.0.0.0:6006 hunkim@server.com # local
tensorboard —logdir=./logs/xor_logs # server
# 访问：http://127.0.0.1:7007

```


# Tensorflow 1.*

- 静态图


# Tensorflow 2.*

- [30天吃掉那只TensorFlow2](https://github.com/lyhue1991/eat_tensorflow2_in_30_days)，[在线阅读地址](https://lyhue1991.github.io/eat_tensorflow2_in_30_days/)




# 结束


