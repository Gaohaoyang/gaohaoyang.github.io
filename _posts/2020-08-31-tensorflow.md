---
layout: post
title:  "tensorflow学习笔记"
date:   2020-08-31 17:25:00
categories: 编程语言
tags: Tensorflow Python 深度学习 Pytorch TensorRT
excerpt: Tensorflow编程技能汇总
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

- 【2020-8-31】[30天吃掉那只TensorFlow2](https://github.com/lyhue1991/eat_tensorflow2_in_30_days)，[20天吃掉那只Pytorch](https://jackiexiao.github.io/eat_pytorch_in_20_days/)
- [入门级解读：小白也能看懂的TensorFlow介绍](https://www.toutiao.com/a6389412632331419906/),日本东京 TensorFlow 聚会联合组织者 Hin Khor 所写的 TensorFlow 系列介绍

## 深度学习框架

- 2018：TensorFlow 碾压 PyTorch. Jeff Hale 的第一份调研结果发布于 2018 年 9 月。他在那次调研中发现，TensorFlow 是当时的绝对冠军。在 GitHub 活跃度、谷歌搜索量、Medium 文章数、亚马逊书籍和 arXiv 论文等维度上所占的比重都是最大的。此外，TensorFlow 还拥有最多的开发者用户，相关的网上职位描述也是最多的。
- ![](https://p1-tt.byteimg.com/origin/pgc-image/01cda030aefa419baf834cd77c19f169.png?from=pc)
- 2019：PyTorch 火力全开，TensorFlow 增长乏力
2019 年 4 月，Jeff Hale 发布了第二份调查结果。这次，他调研了几个框架在过去 6 个月（此次调研与上次调研之间的时间间隔）里的增长情况。结果发现，TensorFlow 仍然是当时需求量最大、增长最快的框架，但 PyTorch 也不容小觑，在过去的六个月增速超过了原来的第二名 Keras。
- ![](https://p6-tt.byteimg.com/origin/pgc-image/8320537b60dc4ccca8f3c4b85a38328b?from=pc)
- 2020：PyTorch 顶会独领风骚，职场优势追赶 TensorFlow


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

## TensorFlow历史

- 2015年11月9日，Google Research 发布了文章：TensorFlow - Google’s latest machine learning system, open sourced for everyone，正式宣布其新一代机器学习系统开源。
- 2016年4月13日，TensorFlow v0.8发布，提供分布式计算支持。
- 2016年4月29日，开发AlphaGo的DeepMind宣布从Torch7平台转向TensorFlow。
- 2016年4月12日，基于TensorFlow的世界最准确的语法解析器SyntaxNet宣布开源。
- 2016年6月27日，TensorFlow v0.9发布，提高对移动设备的支持。
- 2016年8月30日，TF-Slim——TensorFlow的高层库发布，用户可以更简单快速地定义模型。
- 2017年2月15日，TensorFlow v1.0发布，提高了速度和灵活性，并且承诺提供稳定的Python API。
- 2019年10月1日，TensorFlow在经历七个多月(2019年3月1日-2019年10月1日)的2.0 Alpha 版本的更新迭代后发布 2.0 正式版

## TensorFlow基础知识

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
    - ![](https://p6-tt.byteimg.com/origin/pgc-image/8cdc0abf5d8e4f96ae4f694bc63e7149?from=pc)
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

- 理解训练过程、调试和优化TensorFlow程序，TensorFlow团队开发了一套名为TensorBoard的可视化工具，它是一套可以通过浏览器运行的Web应用程序。TensorBoard可用于可视化TensorFlow计算图，绘制有关计算图运行结果的量化指标，并显示其他数据（如通过它的图像）
- ![](https://p3-tt.byteimg.com/origin/pgc-image/45b05322178c442f99b39199e17c1d55?from=pc)

- 5个步骤

```python
# (1) From TF graph, decide which tensors you want to log
w2_hist = tf.summary.histogram("weights2", W2)
cost_summ = tf.summary.scalar("cost", cost)
# (2) Merge all summaries
summary = tf.summary.merge_all()
# Create writer and add graph
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

- TensorBoard 常用API
  - ![](https://p3-tt.byteimg.com/origin/pgc-image/12d38976fa274af69a66f711541398b8?from=pc)
- tensorboard可视化: 通过 TensorFlow 程序运行过程中输出的日志文件可视化 TenorFlow 程序的运行状态d
  - ![](https://p1-tt.byteimg.com/origin/pgc-image/28ff3eb0d23347b89c3b51ce7062a231?from=pc)

## 特征处理

- 【2021-5-27】[推理性能提升一倍，TensorFlow Feature Column 性能优化实践](https://blog.csdn.net/weixin_38753262/article/details/116810950)，在 CTR(Click Through Rate) 点击率预估的推荐算法场景，TensorFlow Feature Column 被广泛应用到实践中。这一方面带来了模型特征处理的便利，另一方面也带来了一些线上推理服务的性能问题。
- ![](https://img-blog.csdnimg.cn/img_convert/cf98e84681aaacadc02f7023fe966c2e.png)
- Feature Column 是 TensorFlow 提供的用于处理结构化数据的工具，是将样本特征映射到用于训练模型特征的桥梁。它提供了多种特征处理方法，让算法人员可以很容易将各种原始特征转换为模型的输入，来进行模型实验。
- 所有 Feature Column 都源自 FeatureColumn 类，并继承了三个子类 CategoricalColumn、DenseColumn 和 SequenceDenseColumn，分别对应稀疏特征、稠密特征、序列稠密特征。算法人员可以按照样本特征的类型找到对应的接口直接适配。
- ![](https://img-blog.csdnimg.cn/img_convert/779703f3920ecde96972cd2f1614417d.png)

## 单测

- Tensorflow中有一个类tf.test用来做单元测试，它继承于类unittest.TestCase，里面包含了Tensorflow做单元测试相关的方法。
- Tensorflow Unit Test 框架
  - tf.test.main
  - tf.test.TestCase

```python
import tensorflow as tf
class AlexnetV2Test(tf.test.TestCase):
	def testBuild(self):
		self.assertEquals(name, 'alexnet_v2/fc8/squeezed')

if __name__ == '__main__':
  tf.test.main()
```
- 模块是对象，并且所有的模块都有一个内置属性 name。一个模块的 name 的值取决于您如何应用模块。如果 import 一个模块，那么模块__name__ 的值通常为模块文件名，不带路径或者文件扩展名。但是您也可以像一个标准的程序样直接运行模块，在这 种情况下, name 的值将是一个特别缺省"main"。
- 在cmd 中直接运行.py文件,则__name__的值是'main';

```python
import tensorflow as tf

class SquareTest(tf.test.TestCase):
    def testSquare(self):
        with self.test_session():
            # 平方操作
            x = tf.square([2, 3])
            # 测试x的值是否等于[4,9]
            self.assertAllEqual(x.eval(), [4, 9])

if __name__ == "__main__":
    tf.test.main()
```


## TorchServe

- 【2021-1-19】pytorch模型部署工具[TorchServe](https://github.com/pytorch/serve/blob/master/README.md#serve-a-model)
- [如何评价 PyTorch 在 2020 年 4 月推出的 TorchServe？](https://www.zhihu.com/question/389731764)
- TorchServe 旨在为大规模部署 PyTorch 模型推理，提供一个干净、兼容性好的工业级路径。其主要的特点包括有：
    - 原生态 API：支持用于预测的推理 API，和用于管理模型服务器的管理 API。
    - 安全部署：包括对安全部署的  HTTPS 支持。
    - 强大的模型管理功能：允许通过命令行接口、配置文件或运行时 API 对模型、版本和单个工作线程进行完整配置。
    - 模型归档：提供执行「模型归档」的工具，这是一个将模型、参数和支持文件打包到单个持久工件的过程。使用一个简单的命令行界面，可以打包和导出为单个「 .mar」文件，其中包含提供 PyTorch 模型所需的一切。该 .mar 文件可以共享和重用。
    - 内置的模型处理程序：支持涵盖最常见用例，如图像分类、对象检测、文本分类、图像分割的模型处理程序。TorchServe 还支持自定义处理程序。
    - 日志记录和指标：支持可靠的日志记录和实时指标，以监视推理服务和端点、性能、资源利用率和错误。还可以生成自定义日志并定义自定义指标。
    - 模型管理：支持同时管理多个模型或同一模型的多个版本。你可以使用模型版本回到早期版本，或者将流量路由到不同的版本进行 A/B 测试。
    - 预构建的图像：准备就绪后，可以在基于 CPU 和 NVIDIA GPU 的环境中，部署 TorchServe 的 Dockerfile 和 Docker 镜像。
- 综上可知，这次的 TorchServe  在推理任务上，将会有很大的使用空间，对于广大开发者来说是一件好事。这一点可以留着以后去慢慢验证。对于这次 Facebook 和 AWS 合作，明显可以看出双方在各取所长，试图打造一个可以反抗谷歌 TensorFlow 垄断的方案。
- 问题：
    - 为什么TorchServe采用Java开发，而没有像TensorFlow Serving一样采用更好性能的C++，抑或是采用Golang?
- TorchServe Architecture
    - ![](https://user-images.githubusercontent.com/880376/83180095-c44cc600-a0d7-11ea-97c1-23abb4cdbe4d.jpg)

- Model Server for PyTorch Documentation

**Basic Features**

* [Serving Quick Start](../README.md#serve-a-model) - Basic server usage tutorial
* [Model Archive Quick Start](../model-archiver#creating-a-model-archive) - Tutorial that shows you how to package a model archive file.
* [Installation](../README.md##install-torchserve) - Installation procedures
* [Serving Models](server.md) - Explains how to use `torchserve`.
  * [REST API](rest_api.md) - Specification on the API endpoint for TorchServe
  * [gRPC API](grpc_api.md) - Specification on the gRPC API endpoint for TorchServe
* [Packaging Model Archive](../model-archiver/README.md) - Explains how to package model archive file, use `model-archiver`.
* [Logging](logging.md) - How to configure logging
* [Metrics](metrics.md) - How to configure metrics
* [Batch inference with TorchServe](batch_inference_with_ts.md) - How to create and serve a model with batch inference in TorchServe
* [Model Snapshots](snapshot.md) - Describes how to use snapshot feature for resiliency due to a planned or unplanned service stop

 **Advanced Features**

* [Advanced settings](configuration.md) - Describes advanced TorchServe configurations.
* [Custom Model Service](custom_service.md) - Describes how to develop custom inference services.
* [Unit Tests](../ts/tests/README.md) - Housekeeping unit tests for TorchServe.
* [Benchmark](../benchmarks/README.md) - Use JMeter to run TorchServe through the paces and collect benchmark data

**Default Handlers**

* [Image Classifier](../ts/torch_handler/image_classifier.py) - This handler takes an image and returns the name of object in that image
* [Text Classifier](../ts/torch_handler/text_classifier.py) - This handler takes a text (string) as input and returns the classification text based on the model vocabulary
* [Object Detector](../ts/torch_handler/object_detector.py) - This handler takes an image and returns list of detected classes and bounding boxes respectively
* [Image Segmenter](../ts/torch_handler/image_segmenter.py) - This handler takes an image and returns output shape as [CL H W], CL - number of classes, H - height and W - width

# Tensorflow 1.*

- 静态图


# Tensorflow 2.*

- [TF 2.0官方教程](https://www.tensorflow.org/tutorials/quickstart/beginner?hl=zh-cn)
- [高效的TensorFlow 2.0 (tensorflow2官方教程翻译)](https://www.jianshu.com/p/599c79c3a537)
- 官方教程导读: [ML Study Jam 2020](https://tf.wiki/zh_hans/mlstudyjam.html)

## 设备检测

代码

```python
import tensorflow as tf

tf.debugging.set_log_device_placement(True)     # 设置输出运算所在的设备
cpus = tf.config.list_physical_devices('CPU')   # 获取当前设备的 CPU 列表
tf.config.set_visible_devices(cpus)           # 设置 TensorFlow 的可见设备范围为 cpu
```

## 新特性

- [30天吃掉那只TensorFlow2](https://github.com/lyhue1991/eat_tensorflow2_in_30_days)，[在线阅读地址](https://lyhue1991.github.io/eat_tensorflow2_in_30_days/)

【2021-3-15】[机器学习：TensorFlow 2.0中的10个技巧](https://www.toutiao.com/i6828167519837094414/)
1. 数据流构建：输入管道的tf.data API和ImageDataGenerator实时生成数据集切片
2. tf.image进行数据增强
3. TensorFlow数据集工具包：pip install tensorflow-datasets
4. 预训练的模型进行迁移学习
5. Estimators是TensorFlow完整模型的高级表示，内置的estimators提供了非常高级的模型抽象，其设计目的是易于缩放和异步训练
6. 自定义层：神经网络是已知的多层网络，其中的层可以是不同的类型。TensorFlow包含许多预定义层(例如Dense，LSTM等)。但是对于更复杂的架构，层的逻辑可能会复杂得多。TensorFlow允许构建自定义层，这可以通过对tf.keras.layers.Layer类进行子类化来完成
7. 定制训练：tf.keras序列和模型API使训练模型更容易。但是，大多数时候在训练复杂模型时会使用自定义损失函数。此外，模型训练也可以不同于缺省值
8. 检查点：保存TensorFlow模型可以有两种类型：①SavedModel：保存模型的完整状态以及所有参数。model.save_weights('checkpoint')②检查点（Checkpoints）
9. Keras Tuner：TensorFlow中的一个相当新的功能。超参数调优是挑选参数的过程，这些参数定义了机器学习模型的配置，除了HyperBand, BayesianOptimization和RandomSearch也可用于调优。利用最优超参数对模型进行训练
10. 分布式训练：如果有多个GPU，并希望通过将训练分散在多个GPU上来优化训练，TensorFlow的各种分布式训练策略能够优化GPU的使用

## 新旧版兼容

Tensorflow新旧版本兼容

TensorFlow 2 提供了 `tf.compat.v1` 模块以支持 TensorFlow 1.X 版本的 API。原来静态图代码升级，引入：
- 旧版：import tensorflow as tf
- ① 新版（用工具）：TensorFlow 2.0中提供了命令行迁移工具，来自动的把1.x的代码转换为2.0的代码
    - **tf_upgrade_v2** --infile first-tf.py --outfile first-tf-v2.py
- ② 新版（加代码）：适合稳定使用中、并且没有重构意愿的代码

```python     
import tensorflow.compat.v1 as tf
tf.disable_v2_behavior()
```

- 参考：[tensorflow兼容处理 tensorflow.compat.v1](https://blog.csdn.net/kyle1314608/article/details/100594884)
- 注意
    - Keras 的模型是同时兼容`即时执行模式`和`图执行模式`的。
    - 在图执行模式下， model(input_tensor) 只需运行一次以完成图的建立操作。
    - 张量以数组的方式依次存放起来, 可以使用list，但不适用于计算图特性（模型加速/SavedModel模型导出），TensorFlow 提供了 tf.TensorArray ，一种支持计算图特性的 TensorFlow 动态数组
- 问题
    - 'Tensor' object has no attribute 'numpy'处理方法
    - 开启即时模式

```python
    tf.enable_eager_execution(
    config=None,
    device_policy=None,
    execution_mode=None
) 
```

## 自动求导

- 即时执行模式下，TensorFlow 引入了 tf.GradientTape() 这个 “求导记录器” 来实现自动求导

```python
import tensorflow as tf

x = tf.Variable(initial_value=3.)
with tf.GradientTape() as tape:     # 在tf.GradientTape()的上下文内，所有计算步骤都会被记录以用于求导
    y = tf.square(x)
y_grad = tape.gradient(y, x)        # 计算y关于x的导数
print(y, y_grad)
```


## 线性回归

示例

```python
import tensorflow as tf
#tf.enable_eager_execution()
import numpy as np

X_raw = np.array([2013, 2014, 2015, 2016, 2017, 2018], dtype=np.float32)
y_raw = np.array([12000, 14000, 15000, 16500, 17500, 19000], dtype=np.float32)

X = (X_raw - X_raw.min()) / (X_raw.max() - X_raw.min())
y = (y_raw - y_raw.min()) / (y_raw.max() - y_raw.min())

X = tf.constant(X)
y = tf.constant(y)

a = tf.Variable(initial_value=0.)
b = tf.Variable(initial_value=0.)
variables = [a, b]

num_epoch = 10000
optimizer = tf.keras.optimizers.SGD(learning_rate=5e-4)
for e in range(num_epoch):
    if e % 500 == 0:
        print('step {}\ta={}\tb={}'.format(e, a.numpy(), b.numpy()))
    # 使用tf.GradientTape()记录损失函数的梯度信息
    with tf.GradientTape() as tape:
        y_pred = a * X + b
        loss = tf.reduce_sum(tf.square(y_pred - y))
    # TensorFlow自动计算损失函数关于自变量（模型参数）的梯度
    grads = tape.gradient(loss, variables)
    # TensorFlow自动根据梯度更新参数
    optimizer.apply_gradients(grads_and_vars=zip(grads, variables))

print(a, b)
print(a.value().numpy())
print(a.numpy())
print(a.read_value())
```

## 模型搭建与训练

- 使用 TensorFlow 快速搭建动态模型。
    - 模型的构建： tf.keras.Model 和 tf.keras.layers
    - 模型的损失函数： tf.keras.losses
    - 模型的优化器： tf.keras.optimizer
    - 模型的评估： tf.keras.metrics

    ![](https://tf.wiki/_images/model.png)

- 解释
    - 继承 tf.keras.Model 后，同时可以使用父类的若干方法和属性，例如在实例化类 model = Model() 后，可以通过 model.
    - variables 这一属性直接获得模型中的所有变量，免去我们一个个显式指定变量的麻烦。
- TensorFlow 的模型编写方式。在这一部分，我们依次进行以下步骤：
    - 使用 `tf.keras.datasets` 获得数据集并预处理
    - 使用 `tf.keras.Model` 和 `tf.keras.layers` 构建模型
    - 构建模型训练流程，使用 `tf.keras.losses` 计算损失函数，并使用 `tf.keras.optimizer` 优化模型
    - 构建模型评估流程，使用 `tf.keras.metrics` 计算评估指标

```python
import tensorflow as tf

X = tf.constant([[1.0, 2.0, 3.0], [4.0, 5.0, 6.0]])
y = tf.constant([[10.0], [20.0]])

class Linear(tf.keras.Model):
    def __init__(self):
        super().__init__()
        self.dense = tf.keras.layers.Dense(
            units=1,
            activation=None,
            # 问题：为什么权重矩阵的名字是kernel？让人联想到cnn的卷积核
            kernel_initializer=tf.zeros_initializer(),
            bias_initializer=tf.zeros_initializer()
        )
    def call(self, input):
        output = self.dense(input)
        return output

# 以下代码结构与前节类似
model = Linear()
optimizer = tf.keras.optimizers.SGD(learning_rate=0.01)
for i in range(100):
    # ①定义自动求导
    with tf.GradientTape() as tape:
        # 调用模型 y_pred = model(X) 而不是显式写出 y_pred = a * X + b
        y_pred = model(X)
        loss = tf.reduce_mean(tf.square(y_pred - y))
    # ②计算梯度
    grads = tape.gradient(loss, model.variables)
    # 使用 model.variables 直接获取模型中所有变量
    # ③更新梯度
    optimizer.apply_gradients(grads_and_vars=zip(grads, model.variables))
print(model.variables)
```

## CNN分类

### CNN网络

- 卷积神经网络 （Convolutional Neural Network, CNN）是一种结构类似于人类或动物的 视觉系统 的人工神经网络，包含一个或多个卷积层（Convolutional Layer）、池化层（Pooling Layer）和全连接层（Fully-connected Layer）

![](https://tf.wiki/_images/cnn.png)

### 代码

```python
class CNN(tf.keras.Model):
    def __init__(self):
        super().__init__()
        self.conv1 = tf.keras.layers.Conv2D(
            filters=32,             # 卷积层神经元（卷积核）数目
            kernel_size=[5, 5],     # 感受野大小
            padding='same',         # padding策略（vaild 或 same）
            activation=tf.nn.relu   # 激活函数
        )
        self.pool1 = tf.keras.layers.MaxPool2D(pool_size=[2, 2], strides=2)
        self.conv2 = tf.keras.layers.Conv2D(
            filters=64,
            kernel_size=[5, 5],
            padding='same',
            activation=tf.nn.relu
        )
        self.pool2 = tf.keras.layers.MaxPool2D(pool_size=[2, 2], strides=2)
        self.flatten = tf.keras.layers.Reshape(target_shape=(7 * 7 * 64,))
        self.dense1 = tf.keras.layers.Dense(units=1024, activation=tf.nn.relu)
        self.dense2 = tf.keras.layers.Dense(units=10)

    def call(self, inputs):
        x = self.conv1(inputs)                  # [batch_size, 28, 28, 32]
        x = self.pool1(x)                       # [batch_size, 14, 14, 32]
        x = self.conv2(x)                       # [batch_size, 14, 14, 64]
        x = self.pool2(x)                       # [batch_size, 7, 7, 64]
        x = self.flatten(x)                     # [batch_size, 7 * 7 * 64]
        x = self.dense1(x)                      # [batch_size, 1024]
        x = self.dense2(x)                      # [batch_size, 10]
        output = tf.nn.softmax(x)
        return output
```


# TensorRT

- 【2021-5-21】[TensorRT入门指北](https://zhuanlan.zhihu.com/p/371239130)
[显卡算力查看](https://developer.nvidia.com/zh-cn/cuda-gpus)


## 什么是TensorRT

- TensorRT是由Nvidia推出的C++语言开发的高性能神经网络推理库，是一个用于生产部署的优化器和运行时引擎。其高性能计算能力依赖于Nvidia的图形处理单元。它专注于推理任务，与常用的神经网络学习框架形成互补，包括TensorFlow、Caffe、PyTorch、MXNet等。可以直接载入这些框架的已训练模型文件，也提供了API接口通过编程自行构建模型。
  - ![](https://img-blog.csdnimg.cn/20210425231146908.png)
- TensorRT是可以在NVIDIA各种GPU硬件平台下运行的一个C++推理框架。我们利用Pytorch、TF或者其他框架训练好的模型，可以转化为TensorRT的格式，然后利用TensorRT推理引擎去运行我们这个模型，从而提升这个模型在英伟达GPU上运行的速度。速度提升的比例是比较可观的。
- TensorRT是由C++、CUDA、python三种语言编写成的一个库，其中核心代码为C++和CUDA，Python端作为前端与用户交互。当然，TensorRT也是支持C++前端的，如果我们追求高性能，C++前端调用TensorRT是必不可少的。
- TensorRT是半开源的，除了核心部分其余的基本都开源了。
![](https://pic4.zhimg.com/80/v2-bc9b29cc831bb9793a0aeaaa3061e223_720w.jpg)

## TensorRT的使用场景

TensorRT的使用场景很多。服务端、嵌入式端、家用电脑端都是我们的使用场景。
- 服务端对应的显卡型号为A100、T4、V100等
- 嵌入式端对应的显卡为AGX Xavier、TX2、Nano等
- 家用电脑端对应的显卡为3080、2080TI、1080TI等

当然这不是固定的，只要我们显卡满足TensorRT的先决条件，用就对了。

## TensorRT安装

安装TensorRT的方式有很多，[官方](https://developer.nvidia.com/zh-cn/tensorrt)提供了多种方式：Debian or RPM packages, a pip wheel file, a tar file, or a zip file.
- 如下载TensorRT-7.2.3.4.Ubuntu-18.04.x86_64-gnu.cuda-11.1.cudnn8.1.tar.gz
  - TensorRT的版本与CUDA还有CUDNN版本是密切相关的,不匹配版本的cuda以及cudnn是无法和TensorRT一起使用的
  - 查看本机驱动：nvidia-smi
- 下载好后，tar -zxvf解压即可。
- 解压之后我们需要添加环境变量，以便让我们的程序能够找到TensorRT的libs

```shell
vim ~/.bashrc
# 添加以下内容
export LD_LIBRARY_PATH=/path/to/TensorRT-7.2.3.4/lib:$LD_LIBRARY_PATH
export LIBRARY_PATH=/path/to/TensorRT-7.2.3.4/lib::$LIBRARY_PATH
```

## TensorRT 工作流

工作流主要分为两个阶段：建造阶段(build  phase)和执行阶段(compile phase)。
- 在建造阶段，TensorRT 接收外部提供的网络定义(也可包含权值 weights)和超参数，根据当前编译的设备进行网络运行的优化(optimization), 并生成推理引擎 inference  engine(可以以 PLAN 形式存在在硬盘上)；
- 在执行阶段，通过运行推理引擎调用 GPU 计算资源——整个流程如图
[原文链接](https://blog.csdn.net/weixin_39875161/article/details/99084743)

![](https://img-blog.csdnimg.cn/20190810162851400.png)

## TensorRT 接口

必备接口流程图
![](https://img-blog.csdnimg.cn/20210425232029160.png

TensorRT核心库中，最关键的几种接口类型有：
- IExecutionContext    推理引擎运行上下文
- ICudaEngine            推理引擎
- IRuntime                  CudaEngine反序列化
- INetWorkDefinition   网络定义
- IParser                     网络模型解析
- IOptimizationProfile 优化配置
- IBuilderConfig          CudaEngine的构造参数
- IBuilder                     构造器，主要用于构造CudaEngine
- ILogger                    日志接口，需要开发者实现

接口详情参考：[TensorRT入门](https://blog.csdn.net/Ango_/article/details/116140436)


## TensorRT的加速效果怎么样

加速效果取决于模型的类型和大小，也取决于所使用的显卡类型。

对于GPU来说，因为底层的硬件设计，更适合并行计算也更喜欢密集型计算。TensorRT所做的优化也是基于GPU进行优化，当然也是更喜欢那种一大块一大块的矩阵运算，尽量直通到底。因此对于通道数比较多的卷积层和反卷积层，优化力度是比较大的；如果是比较繁多复杂的各种细小op操作(例如reshape、gather、split等)，那么TensorRT的优化力度就没有那么夸张了。

为了更充分利用GPU的优势，我们在设计模型的时候，可以更加偏向于模型的并行性，因为同样的计算量，“大而整”的GPU运算效率远超“小而碎”的运算。

工业界更喜欢简单直接的模型和backbone。2020年的RepVGG，就是为GPU和专用硬件设计的高效模型，追求高速度、省内存，较少关注参数量和理论计算量。相比resnet系列，更加适合充当一些检测模型或者识别模型的backbone。

在实际应用中，老潘也简单总结了下TensorRT的加速效果：
- SSD检测模型，加速3倍(Caffe)
- CenterNet检测模型，加速3-5倍(Pytorch)
- LSTM、Transformer(细op)，加速0.5倍-1倍(TensorFlow)
- resnet系列的分类模型，加速3倍左右(Keras)
- GAN、分割模型系列比较大的模型，加速7-20倍左右(Pytorch)

## TensorRT有哪些黑科技

为什么TensorRT能够提升我们模型在英伟达GPU上运行的速度，当然是做了很多对提速有增益的优化：
- 算子融合(层与张量融合)：简单来说就是通过融合一些计算op或者去掉一些多余op来减少数据流通次数以及显存的频繁使用来提速
量化：量化即IN8量化或者FP16以及TF32等不同于常规FP32精度的使用，这些精度可以显著提升模型执行速度并且不会保持原先模型的精度
- 内核自动调整：根据不同的显卡构架、SM数量、内核频率等(例如1080TI和2080TI)，选择不同的优化策略以及计算方式，寻找最合适当前构架的计算方式
- 动态张量显存：我们都知道，显存的开辟和释放是比较耗时的，通过调整一些策略可以减少模型中这些操作的次数，从而可以减少模型运行的时间
- 多流执行：使用CUDA中的stream技术，最大化实现并行操作
TensorRT的这些优化策略代码虽然是闭源的，但是大部分的优化策略我们或许也可以猜到一些，也包括TensorRT官方公布出来的一些优化策略：

![](https://pic3.zhimg.com/80/v2-41d4cde8f1a25ffb0ed0ac22a4dcc782_720w.jpg)


## 什么模型可以转换为TensorRT

TensorRT官方支持Caffe、Tensorflow、Pytorch、ONNX等模型的转换(不过Caffe和Tensorflow的转换器Caffe-Parser和UFF-Parser已经有些落后了)，也提供了三种转换模型的方式：
- 使用TF-TRT，将TensorRT集成在TensorFlow中
- 使用ONNX2TensorRT，即ONNX转换trt的工具
- 手动构造模型结构，然后手动将权重信息挪过去，非常灵活但是时间成本略高，有大佬已经尝试过了：tensorrtx

不过目前TensorRT对ONNX的支持最好，TensorRT-8最新版ONNX转换器又支持了更多的op操作。而深度学习框架中，TensorRT对Pytorch的支持更为友好，除了Pytorch->ONNX->TensorRT这条路，还有：
- torch2trt
- torch2trt_dynamic
- TRTorch

总而言之，理论上95%的模型都可以转换为TensorRT，条条大路通罗马嘛。只不过有些模型可能转换的难度比较大。如果遇到一个无法转换的模型，先不要绝望，再想想，再想想，看看能不能通过其他方式绕过去。

## TensorRT支持哪几种权重精度

支持FP32、FP16、INT8、TF32等，这几种类型都比较常用。
- FP32：单精度浮点型，没什么好说的，深度学习中最常见的数据格式，训练推理都会用到；
- FP16：半精度浮点型，相比FP32占用内存减少一半，有相应的指令值，速度比FP32要快很多；
- TF32：第三代Tensor Core支持的一种数据类型，是一种截短的 Float32 数据格式，将FP32中23个尾数位截短为10bits，而指数位仍为8bits，总长度为19(=1+8 +10)。保持了与FP16同样的精度(尾数位都是 10 位），同时还保持了FP32的动态范围指数位都是8位)；
- INT8：整型，相比FP16占用内存减小一半，有相应的指令集，模型量化后可以利用INT8进行加速。
简单展示下各种精度的区别：
![](https://pic2.zhimg.com/80/v2-e86c8661901842ffaf960bb2abbe37e9_720w.jpg)


# 结束


