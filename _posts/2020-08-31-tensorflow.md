---
layout: post
title:  "深度学习框架Tensorflow学习笔记"
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

# Tensorflow 1.*

主要的是：
- tf.Variable
- tf.Constant
- tf.Placeholder
- tf.SparseTensor
除了tf.Variable，张量的值是不变的

## TensorFlow基础知识

- [TensorFlow](https://www.tensorflow.org/get_started/) 是一种采用**数据流图**（data flow graphs），用于数值计算的开源软件库。
- 其中 Tensor 代表传递的数据为张量（多维数组），Flow 代表使用计算图进行运算。
- 数据流图用「**结点**」（nodes）和「**边**」（edges）组成的有向图来描述数学运算。
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
my_int_variable = tf.get_variable("my_int_variable", [1, 2, 3], dtype=tf.int32, initializer=tf.zeros_initializer)
```


### 显示张量值

```python
import tensorflow as tf

#定义变量a
a=tf.Variable([[[1,2,3],[4,5,6]],[[7,8,9],[10,11,12]]])
#定义索引
indics=[[0,0,0],[0,1,1],[0,1,2]]
#把a中索引为indics的值取出
b=tf.gather_nd(a,indics)

#初始化
init=tf.global_variables_initializer()
with tf.Session() as sess:
    #执行初始化
    sess.run(init)
    #打印结果
    print(a.eval())
    print(b.eval())
    tf.Print(a)
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

## 单元测试

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



# Tensorflow 2.*

- [TF 2.0官方教程](https://www.tensorflow.org/tutorials/quickstart/beginner?hl=zh-cn)
- [高效的TensorFlow 2.0 (tensorflow2官方教程翻译)](https://www.jianshu.com/p/599c79c3a537)
- 官方教程导读: [ML Study Jam 2020](https://tf.wiki/zh_hans/mlstudyjam.html)
注意
- 在 TensorFlow 1.X 版本中， 导入TensorFlow库后必须调用 tf.enable_eager_execution() 函数以启用即时执行模式。
- 在 TensorFlow 2 中，**即时执行**模式将成为**默认**模式，无需额外调用 tf.enable_eager_execution() 函数（不过若要关闭即时执行模式，则需调用 tf.compat.v1.disable_eager_execution() 函数）。


## tf 2 与 tf 1差异

TensorFlow版本差异：
- ① 在TensorFlow1.x中，最常规的是使用"session.run()"方法执行计算图，“session.run()"方法的调用类似于函数调用，指定输入数据和调用的方法，最后返回结果。
- ② TensorFlow2.0将Eager Execcution(**动态图**机制）作为默认模式。在该模式下用户能够轻松地编写和调试代码，可以使用原生的Python控制语句，大大降低了学习和使用TensorFlow的门槛
- ③ 在TensorFlow2.0中，**图**（graph)和**会话**(Session)都会变成底层实现，而不需要用户关心。
- ④ TensorFlow2.0推出了一个新的运行理念，即 `AutoGraph`。当运行代码时，TensorFlow2.0自动调用Eager模式执行函数，这是内部所完成的。

总结：
- TensorFlow1.x版本之所以要分为**两步**进行，是因为它无法使用Python支持的常用代码，所以需要将Python代码进行编译为TensorFlow所内置的API和函数才能执行。
- 而2.0版本可以使用"tf.**function**"来修饰Python函数，以将其标记为即时编译，从而TensorFlow可以将其作为单个图来执行。

参考：[Tensorflow如何使用GPU训练](https://blog.csdn.net/qq_31554953/article/details/107302404)



## 基础

将 TensorFlow 视为一个科学计算库（类似于 Python 下的 NumPy）

TensorFlow 使用 `张量` （Tensor）作为数据的基本单位。TensorFlow 的张量在概念上等同于多维数组，用它来描述数学中的标量（0 维数组）、向量（1 维数组）、矩阵（2 维数组）等各种量，张量的重要属性是其**形状**、**类型**和**值**。可以通过张量的 shape 、 dtype 属性和 numpy() 方法获得。
- TensorFlow 的大多数 API 函数会根据输入的值**自动**推断张量中元素的类型（一般默认为 tf.float32 ）。不过也可以通过加入 dtype 参数来自行指定类型，例如 zero_vector = tf.zeros(shape=(2), dtype=tf.int32) 将使得张量中的元素类型均为整数。张量的 numpy() 方法是将张量的值转换为一个 NumPy 数组。
- TensorFlow 里有大量的 `操作` （Operation）

示例如下：

```python
import tensorflow as tf

# 定义一个随机数（标量）
random_float = tf.random.uniform(shape=())

# 定义一个有2个元素的零向量
zero_vector = tf.zeros(shape=(2))

# 定义两个2×2的常量矩阵
A = tf.constant([[1., 2.], [3., 4.]])
B = tf.constant([[5., 6.], [7., 8.]])

# 查看矩阵A的形状、类型和值
print(A.shape)      # 输出(2, 2)，即矩阵的长和宽均为2
print(A.dtype)      # 输出<dtype: 'float32'>
print(A.numpy())    # 输出[[1. 2.]
                    #      [3. 4.]]
# op操作
C = tf.add(A, B)    # 计算矩阵A和B的和
D = tf.matmul(A, B) # 计算矩阵A和B的乘积
```

## 自动求导机制

TensorFlow 提供了强大的 `自动求导机制 `来计算导数。
- 在**即时执行**模式下，TensorFlow 引入了 tf.GradientTape() 这个 “求导**记录**器” 来实现自动求导。
- 机器学习中，更加常见的是对**多元函数**求偏导数，以及对向量或矩阵的求导

以下代码展示了如何使用 tf.GradientTape() 计算函数 y(x) = x^2 在 x = 3 时的导数
- x 是一个初始化为 3 的 **变量** （Variable），使用 tf.Variable() 声明。与普通张量一样，变量同样具有**形状**、**类型**和**值**三种属性。使用变量需要有一个初始化过程，可以通过在 tf.Variable() 中指定 initial_value 参数来指定初始值。
- **变量**与普通**张量**的一个重要区别: 其默认能够被 TensorFlow 的**自动求导机制**所求导，因此往往被用于定义机器学习模型的参数。
- tf.GradientTape() 是一个自动求导的**记录器**。只要进入了 with tf.GradientTape() as tape 的**上下文**环境，则在该环境中计算步骤都会被自动记录。
  - 比如在上面的示例中，计算步骤 y = tf.square(x) 即被自动记录。
  - 离开上下文环境后，记录将停止，但记录器 tape 依然可用，因此可以通过 y_grad = tape.gradient(y, x) 求张量 y 对变量 x 的导数。
- 使用 tape.gradient(ys, xs) 自动计算梯度；
- 用 optimizer.apply_gradients(grads_and_vars) 自动更新模型参数

```python
import tensorflow as tf

x = tf.Variable(initial_value=3.)
# ------ 求导 -------
with tf.GradientTape() as tape:     # 在 tf.GradientTape() 的上下文内，所有计算步骤都会被记录以用于求导
    y = tf.square(x)
y_grad = tape.gradient(y, x)        # 计算y关于x的导数
print(y, y_grad)
# ---------偏导数----------
X = tf.constant([[1., 2.], [3., 4.]])
y = tf.constant([[1.], [2.]])
w = tf.Variable(initial_value=[[1.], [2.]])
b = tf.Variable(initial_value=1.)
with tf.GradientTape() as tape:
    L = tf.reduce_sum(tf.square(tf.matmul(X, w) + b - y))
w_grad, b_grad = tape.gradient(L, [w, b])        # 计算L(w, b)关于w, b的偏导数
print(L, w_grad, b_grad)
```

## 模型建立与训练

### 基本流程

如何使用 TensorFlow 快速搭建动态模型
- 模型的**构建**： tf.keras.Model 和 tf.keras.layers
- 模型的**损失函数**： tf.keras.losses
- 模型的**优化器**： tf.keras.optimizer
- 模型的**评估**： tf.keras.metrics

- ![](https://tf.wiki/_images/model.png)

- 解释
    - 继承 tf.keras.Model 后，同时可以使用父类的若干方法和属性，例如在实例化类 model = Model() 后，可以通过 model.
    - variables 这一属性直接获得模型中的所有变量，免去我们一个个显式指定变量的麻烦。
- TensorFlow 的模型编写方式。在这一部分，我们依次进行以下步骤：
    - 使用 `tf.keras.datasets` 获得数据集并预处理
    - 使用 `tf.keras.Model` 和 `tf.keras.layers` 构建模型
    - 构建模型训练流程，使用 `tf.keras.losses` 计算损失函数，并使用 `tf.keras.optimizer` 优化模型
    - 构建模型评估流程，使用 `tf.keras.metrics` 计算评估指标

### 模型与层

TensorFlow 中，推荐使用 `Keras`（ tf.keras ）构建模型。`Keras` 是一个广为流行的高级神经网络 API，简单、快速而不失灵活性，现已得到 TensorFlow 的官方内置和全面支持。

Keras 有两个重要的概念： `层`（Layer） 和 `模型`（Model）。
- `层`将各种计算流程和变量进行了**封装**（例如基本的全连接层，CNN 的卷积层、池化层等）
- `模型`则将各种层进行组织和连接，并封装成一个整体，描述了如何将输入数据通过各种层以及运算而得到输出。在需要模型调用的时候，使用 y_pred = model(X) 的形式即可。

`Keras` 在 tf.keras.layers 下内置了深度学习中大量常用的的**预定义**层，同时也允许我们自定义层。

Keras 模型以**类**的形式呈现，可以通过继承 tf.keras.Model 这个 Python 类来定义自己的模型。在继承类中，需要重写 \__init__() （**构造函数**，初始化）和 **call**(input) （**模型调用**）两个方法，同时也可以根据需要增加自定义的方法。
- ![](https://tf.wiki/_images/model.png)
- 继承 tf.keras.Model 后，同时可以使用父类的若干方法和属性
- 例如在实例化类 model = Model() 后，可以通过 model.variables 这一属性直接获得模型中的所有变量，免去我们一个个显式指定变量的麻烦。

```python
class MyModel(tf.keras.Model):
    def __init__(self):
        super().__init__()     # Python 2 下使用 super(MyModel, self).__init__()
        # 此处添加初始化代码（包含 call 方法中会用到的层），例如
        # layer1 = tf.keras.layers.BuiltInLayer(...)
        # layer2 = MyCustomLayer(...)

    def call(self, input):
        # 此处添加模型调用的代码（处理输入并返回输出），例如
        # x = layer1(input)
        # output = layer2(x)
        return output

    # 还可以添加自定义的方法
```

线性模型 y_pred = a * X + b, 示例代码

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
        y_pred = model(X)      # 调用模型 y_pred = model(X) 而不是显式写出 y_pred = a * X + b
        loss = tf.reduce_mean(tf.square(y_pred - y))
    # ②计算梯度
    grads = tape.gradient(loss, model.variables)    # 使用 model.variables 这一属性直接获得模型中的所有变量
    # ③更新梯度
    optimizer.apply_gradients(grads_and_vars=zip(grads, model.variables))
print(model.variables)
```



没有显式地声明 a 和 b 两个变量并写出 y_pred = a * X + b 这一线性变换，而是建立了一个继承了 tf.keras.Model 的模型类 Linear 。这个类在初始化部分实例化了一个 全连接层 （ tf.keras.layers.Dense ），并在 call 方法中对这个层进行调用，实现了线性变换的计算。
- 如果需要显式地声明自己的变量并使用变量进行自定义运算，或者希望了解 Keras 层的内部原理，请参考 自定义层。

## Keras Pipeline

有两种方式建立模型：
- Keras **Sequential** API：串行结构，单输入单输出
- Keras **Functional** API：任意结构，多输入多输出

### Keras Sequential API 串行

最典型和常用的神经网络结构是将一堆层按特定顺序**叠加**起来，只需要提供一个层的列表，Keras的 Sequential API就自动首尾相连，形成模型
- 通过向 tf.keras.models.Sequential() 提供一个层的列表，就能快速地建立一个 tf.keras.Model 模型并返回

```python
# Keras Sequential建立串行结构模型
model = tf.keras.models.Sequential([
    tf.keras.layers.Flatten(), # 展开
    tf.keras.layers.Dense(100, activation=tf.nn.relu), # MLP全连接层
    tf.keras.layers.Dense(10),  # MLP全连接层
    tf.keras.layers.Softmax() #  # softmax层
])
```

### Keras Functional API 任意

以上层叠结构并不能表示**任意**神经网络结构。

Keras 提供了 **Functional API** 来建立更为复杂的模型
- 例如: 多输入/输出或存在参数共享的模型。其使用方法是将层作为可调用的对象并返回张量，并将输入向量和输出向量提供给 tf.keras.Model 的 inputs 和 outputs 参数，示例如下：

```python
# Keras Functional 建立任意结构模型
inputs = tf.keras.Input(shape=(28, 28, 1)) # 单独定义inputs
x = tf.keras.layers.Flatten()(inputs)
x = tf.keras.layers.Dense(units=100, activation=tf.nn.relu)(x)
x = tf.keras.layers.Dense(units=10)(x)
outputs = tf.keras.layers.Softmax()(x)  # 单独定义outputs
# 通过 Model 组装输入、输出，构建任意结构模型
model = tf.keras.Model(inputs=inputs, outputs=outputs)
```

### 训练

Keras Model 的 `compile` 、 `fit` 和 `evaluate` 方法训练和评估模型 

#### compile 函数

当模型建立完成后，通过 tf.keras.Model 的 compile 方法配置训练过程：

```python
# 编译模型，配置相关组件（优化器、损失函数和衡量指标）
model.compile(
    optimizer=tf.keras.optimizers.Adam(learning_rate=0.001), # Adam优化器
    loss=tf.keras.losses.sparse_categorical_crossentropy, # 分类损失函数
    metrics=[tf.keras.metrics.sparse_categorical_accuracy] # 分类指标
)
```

tf.keras.Model.**compile** 接受 3 个重要的参数：
- oplimizer ：优化器，可从 tf.keras.optimizers 中选择；
- loss ：损失函数，可从 tf.keras.losses 中选择；
- metrics ：评估指标，可从 tf.keras.metrics 中选择。

#### fit 函数

接下来，可以使用 tf.keras.Model 的 fit 方法训练模型：

```python
# 训练模型
# model.fit(data_loader.train_data, data_loader.train_label, epochs=num_epochs, batch_size=batch_size)
model.fit(data_loader.train_data,  # x
    data_loader.train_label, # y
    epochs=num_epochs,  # 迭代epoch数
    batch_size=batch_size) # batch size
```

tf.keras.Model.fit 接受 5 个重要的参数：
- x ：训练数据；
- y ：目标数据（数据标签）；
- epochs ：将训练数据迭代多少遍；
- batch_size ：批次的大小；
- validation_data ：验证数据，可用于在训练过程中监控模型的性能。
- Keras 支持使用 tf.data.Dataset 进行训练，详见 tf.data 。

#### evaluate 函数

最后，使用 tf.keras.Model.evaluate 评估训练效果，提供测试数据及标签即可：

```python
# 评估效果
print(model.evaluate(data_loader.test_data, data_loader.test_label))
```

### 自定义

#### 自定义-层

[自定义层](https://tf.wiki/zh_hans/basic/models.html#zh-hans-custom-layer)需要继承 tf.keras.layers.Layer 类，并重写 \__init__ 、 **build** 和 **call** 三个方法，如下所示：

```python
class MyLayer(tf.keras.layers.Layer):

    def __init__(self):
        super().__init__()
        # 初始化代码

    def build(self, input_shape):     # input_shape 是一个 TensorShape 类型对象，提供输入的形状
        # 在第一次使用该层的时候调用该部分代码，在这里创建变量可以使得变量的形状自适应输入的形状
        # 而不需要使用者额外指定变量形状。如果已经可以完全确定变量的形状，也可以在__init__部分创建变量
        self.variable_0 = self.add_weight(...) # add_weight()函数中自己定义shape,将他的参数trainable=True
        self.variable_1 = self.add_weight(...)

    def call(self, inputs):
        # 模型调用的代码（处理输入并返回输出）
        return output
```

如果要自己实现一个全连接层（ tf.keras.layers.Dense ），可以按如下方式编写。
- 此代码在 build 方法中创建两个变量，并在 call 方法中使用创建的变量进行运算：

```python
class LinearLayer(tf.keras.layers.Layer):
    """ 自定义MLP层：重写init、build和call函数 """
    def __init__(self, units):
        super().__init__()
        self.units = units
    # 层里涉及的变量
    def build(self, input_shape):     # input_shape 是第一次运行call()时参数inputs的形状
        self.w = self.add_weight(name='w',
            shape=[input_shape[-1], self.units], initializer=tf.zeros_initializer())
        self.b = self.add_weight(name='b',
            shape=[self.units], initializer=tf.zeros_initializer())
    # 组装成一层
    def call(self, inputs):
        y_pred = tf.matmul(inputs, self.w) + self.b
        return y_pred
```

在定义模型的时候，便可以如同 Keras 中的其他层一样，调用自定义的层 LinearLayer：

```python
class LinearModel(tf.keras.Model):
    # 调用自定义层
    def __init__(self):
        super().__init__()
        self.layer = LinearLayer(units=1) # 直接调用

    def call(self, inputs):
        output = self.layer(inputs)
        return output
```

#### 自定义-损失函数

自定义损失函数需要继承 tf.keras.losses.**Loss** 类，重写 call 方法即可，输入真实值 y_true 和模型预测值 y_pred ，输出模型预测值和真实值之间通过自定义的损失函数计算出的损失值。下面的示例为均方差损失函数：

```python
class MeanSquaredError(tf.keras.losses.Loss):

    def call(self, y_true, y_pred):
        return tf.reduce_mean(tf.square(y_pred - y_true))
```

#### 自定义-评估指标

自定义评估指标需要继承 tf.keras.metrics.**Metric** 类，并重写 \__init__ 、 update_state 和 result 三个方法。
- 下面的示例对前面用到的 SparseCategoricalAccuracy 评估指标类做了一个简单的重实现：

```python
class SparseCategoricalAccuracy(tf.keras.metrics.Metric):

    def __init__(self):
        super().__init__()
        self.total = self.add_weight(name='total', dtype=tf.int32, initializer=tf.zeros_initializer())
        self.count = self.add_weight(name='count', dtype=tf.int32, initializer=tf.zeros_initializer())

    def update_state(self, y_true, y_pred, sample_weight=None):
        values = tf.cast(tf.equal(y_true, tf.argmax(y_pred, axis=-1, output_type=tf.int32)), tf.int32)
        self.total.assign_add(tf.shape(y_true)[0])
        self.count.assign_add(tf.reduce_sum(values))

    def result(self):
        return self.count / self.total
```

## 常用模块

[TensorFlow常用模块](https://tf.wiki/zh_hans/basic/tools.html)

### 模型保存

TensorFlow 提供了 tf.train.**Checkpoint** 这一强大的变量保存与恢复类，可以使用其 save() 和 restore() 方法将 TensorFlow 中所有包含 Checkpointable State 的对象进行保存和恢复。具体而言，tf.keras.optimizer 、 tf.Variable 、 tf.keras.Layer 或者 tf.keras.Model 实例都可以被保存。
- tf.train.Checkpoint ：变量的保存与恢复
- tf.train.Checkpoint() 接受的初始化参数比较特殊，是一个 **kwargs 。具体而言，是一系列的键值对，键名可以随意取，值为需要保存的对象。
- checkpoint.save('./save/model.ckpt') ，save 目录下发现名为 checkpoint 、 model.ckpt-1.index 、 model.ckpt-1.data-00000-of-00001 的三个文件，这些文件就记录了变量信息。
- checkpoint.save() 方法可以运行多次，每运行一次都会得到一个.index 文件和.data 文件，序号依次累加。

```python
checkpoint = tf.train.Checkpoint(model=model)
# 准备保存模型和优化器
checkpoint = tf.train.Checkpoint(myAwesomeModel=model, myAwesomeOptimizer=optimizer)
# 保存为文件，save_path_with_prefix 是保存文件的目录 + 前缀
checkpoint.save(save_path_with_prefix)
# --------- 中途恢复模型 -----------
model_to_be_restored = MyModel()                                        # 待恢复参数的同一模型
checkpoint = tf.train.Checkpoint(myAwesomeModel=model_to_be_restored)   # 键名保持为“myAwesomeModel”
model_name = tf.train.latest_checkpoint('./save') # 返回目录下最近一次 checkpoint 的文件名
save_path_with_prefix_and_index = model_name
# save_path_with_prefix_and_index 是之前保存的文件的目录 + 前缀 + 编号
checkpoint.restore(save_path_with_prefix_and_index)
# -------- train ----------
model = MyModel()
# 实例化Checkpoint，指定保存对象为model（如果需要保存Optimizer的参数也可加入）
checkpoint = tf.train.Checkpoint(myModel=model)
# ...（模型训练代码）
# 模型训练完毕后将参数保存到文件（也可以在模型训练过程中每隔一段时间就保存一次）
checkpoint.save('./save/model.ckpt')
# ------- test -----------
model = MyModel()
checkpoint = tf.train.Checkpoint(myModel=model)             # 实例化Checkpoint，指定恢复对象为model
checkpoint.restore(tf.train.latest_checkpoint('./save'))    # 从文件恢复模型参数
# -------- manager ------
#  CheckpointManager 限制仅保留最后三个 Checkpoint 文件，并使用 batch 的编号作为 Checkpoint 的文件编号。
manager = tf.train.CheckpointManager(checkpoint, directory='./save', checkpoint_name='model.ckpt', max_to_keep=k)
manager.save()
```

tf.train.**Checkpoint** 与以前版本常用的 tf.train.**Saver** 相比，强大之处在于其支持在即时执行模式下 “**延迟**” 恢复变量。
- 当调用了 checkpoint.restore() ，但模型中的变量还没有被建立的时候，Checkpoint 可以等到变量被建立的时候再进行数值的恢复。
- 即时执行模式下，模型中各个层的初始化和变量的建立是在模型第一次被调用的时候才进行的（好处在于可以根据输入的张量形状而自动确定变量形状，无需手动指定）。这意味着当模型刚刚被实例化的时候，其实里面还一个变量都没有，这时候使用以往的方式去恢复变量数值是一定会报错的。
- 比如，在 train.py 调用 tf.keras.Model 的 save_weight() 方法保存 model 的参数，并在 test.py 中实例化 model 后立即调用 load_weight() 方法，就会出错，只有当调用了一遍 model 之后再运行 load_weight() 方法才能得到正确的结果。
- 可见，tf.train.Checkpoint 在这种情况下可以给我们带来相当大的便利。
- 另外，tf.train.Checkpoint 同时也支持图执行模式。

```python
import tensorflow as tf
import numpy as np
import argparse
from zh.model.mnist.mlp import MLP
from zh.model.utils import MNISTLoader

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('--mode', default='train', help='train or test')
parser.add_argument('--num_epochs', default=1)
parser.add_argument('--batch_size', default=50)
parser.add_argument('--learning_rate', default=0.001)
args = parser.parse_args()
data_loader = MNISTLoader()

def train():
    model = MLP()
    optimizer = tf.keras.optimizers.Adam(learning_rate=args.learning_rate)
    num_batches = int(data_loader.num_train_data // args.batch_size * args.num_epochs)
    checkpoint = tf.train.Checkpoint(myAwesomeModel=model)      # 实例化Checkpoint，设置保存对象为model
    for batch_index in range(1, num_batches+1):                 
        X, y = data_loader.get_batch(args.batch_size)
        with tf.GradientTape() as tape:
            y_pred = model(X)
            loss = tf.keras.losses.sparse_categorical_crossentropy(y_true=y, y_pred=y_pred)
            loss = tf.reduce_mean(loss)
            print("batch %d: loss %f" % (batch_index, loss.numpy()))
        grads = tape.gradient(loss, model.variables)
        optimizer.apply_gradients(grads_and_vars=zip(grads, model.variables))
        if batch_index % 100 == 0:                              # 每隔100个Batch保存一次
            path = checkpoint.save('./save/model.ckpt')         # 保存模型参数到文件
            print("model saved to %s" % path)

def test():
    model_to_be_restored = MLP()
    # 实例化Checkpoint，设置恢复对象为新建立的模型model_to_be_restored
    checkpoint = tf.train.Checkpoint(myAwesomeModel=model_to_be_restored)      
    checkpoint.restore(tf.train.latest_checkpoint('./save'))    # 从文件恢复模型参数
    y_pred = np.argmax(model_to_be_restored.predict(data_loader.test_data), axis=-1)
    print("test accuracy: %f" % (sum(y_pred == data_loader.test_label) / data_loader.num_test_data))

if __name__ == '__main__':
    if args.mode == 'train':
        train()
    if args.mode == 'test':
        test()
```

在代码目录下建立 save 文件夹并运行代码进行训练后，save 文件夹内将会存放每隔 100 个 batch 保存一次的模型变量数据。
- 在命令行参数中加入 --mode=test 并再次运行代码，将直接使用最后一次保存的变量值恢复模型并在测试集上测试模型性能，可以直接获得 95% 左右的准确率。

manager示例：

```python
import tensorflow as tf
import numpy as np
import argparse
from zh.model.mnist.mlp import MLP
from zh.model.utils import MNISTLoader

parser = argparse.ArgumentParser(description='Process some integers.')
parser.add_argument('--mode', default='train', help='train or test')
parser.add_argument('--num_epochs', default=1)
parser.add_argument('--batch_size', default=50)
parser.add_argument('--learning_rate', default=0.001)
args = parser.parse_args()
data_loader = MNISTLoader()


def train():
    model = MLP()
    optimizer = tf.keras.optimizers.Adam(learning_rate=args.learning_rate)
    num_batches = int(data_loader.num_train_data // args.batch_size * args.num_epochs)
    checkpoint = tf.train.Checkpoint(myAwesomeModel=model)      
    # 使用tf.train.CheckpointManager管理Checkpoint
    manager = tf.train.CheckpointManager(checkpoint, directory='./save', max_to_keep=3)
    for batch_index in range(1, num_batches):
        X, y = data_loader.get_batch(args.batch_size)
        with tf.GradientTape() as tape:
            y_pred = model(X)
            loss = tf.keras.losses.sparse_categorical_crossentropy(y_true=y, y_pred=y_pred)
            loss = tf.reduce_mean(loss)
            print("batch %d: loss %f" % (batch_index, loss.numpy()))
        grads = tape.gradient(loss, model.variables)
        optimizer.apply_gradients(grads_and_vars=zip(grads, model.variables))
        if batch_index % 100 == 0:
            # 使用CheckpointManager保存模型参数到文件并自定义编号
            path = manager.save(checkpoint_number=batch_index)         
            print("model saved to %s" % path)


def test():
    model_to_be_restored = MLP()
    checkpoint = tf.train.Checkpoint(myAwesomeModel=model_to_be_restored)      
    checkpoint.restore(tf.train.latest_checkpoint('./save'))
    y_pred = np.argmax(model_to_be_restored.predict(data_loader.test_data), axis=-1)
    print("test accuracy: %f" % (sum(y_pred == data_loader.test_label) / data_loader.num_test_data))


if __name__ == '__main__':
    if args.mode == 'train':
        train()
    if args.mode == 'test':
        test()
```


## TensorFlow Board

查看模型训练过程中各个参数的变化情况（例如损失函数 loss 的值）。虽然可以通过命令行输出来查看，但有时显得不够直观。而 TensorBoard 就是一个能够帮助我们将训练过程可视化的工具。
- 每运行一次 tf.summary.scalar() ，记录器就会向记录文件中写入一条记录。除了最简单的标量（scalar）以外，TensorBoard 还可以对其他类型的数据（如图像，音频等）进行可视化
- 代码目录打开终端: tensorboard --logdir=./tensorboard
- 默认情况下，TensorBoard 每 30 秒更新一次数据。不过也可以点击右上角的刷新按钮手动刷新。
- ![](https://tf.wiki/_images/tensorboard.png)

注意事项：
- 如果需要重新训练，需要删除掉记录文件夹内的信息并重启 TensorBoard（或者建立一个新的记录文件夹并开启 TensorBoard， --logdir 参数设置为新建立的文件夹）；
- 记录文件夹目录保持全英文。

```python
import tensorflow as tf
from zh.model.mnist.mlp import MLP
from zh.model.utils import MNISTLoader

num_batches = 1000
batch_size = 50
learning_rate = 0.001
log_dir = 'tensorboard' # 记录文件所保存的目录

model = MLP()
data_loader = MNISTLoader()
optimizer = tf.keras.optimizers.Adam(learning_rate=learning_rate)
summary_writer = tf.summary.create_file_writer(log_dir)     # 实例化记录器
#tf.summary.trace_on(profiler=True)  # 开启Trace（可选）
tf.summary.trace_on(graph=True, profiler=True)  # 开启Trace，可以记录图结构和profile信息；如果使用了 tf.function 建立了计算图，也可以点击 “Graphs” 查看图结构。

for batch_index in range(num_batches):
    X, y = data_loader.get_batch(batch_size)
    with tf.GradientTape() as tape:
        y_pred = model(X)
        loss = tf.keras.losses.sparse_categorical_crossentropy(y_true=y, y_pred=y_pred)
        loss = tf.reduce_mean(loss)
        print("batch %d: loss %f" % (batch_index, loss.numpy()))
        with summary_writer.as_default():                           # 指定记录器
            tf.summary.scalar("loss", loss, step=batch_index)       # 将当前损失函数的值写入记录器
    grads = tape.gradient(loss, model.variables)
    optimizer.apply_gradients(grads_and_vars=zip(grads, model.variables))
with summary_writer.as_default():
    tf.summary.trace_export(name="model_trace", step=0, profiler_outdir=log_dir)    # 保存Trace信息到文件（可选）
```

## 示例

### 线性回归

代码

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

## TensorFlow 分布式训练

TensorFlow 在 tf.distribute.Strategy 中提供了若干种分布式策略，使得我们能够更高效地训练模型。

### 单机多卡训练： MirroredStrategy

tf.distribute.MirroredStrategy 是一种简单且高性能的，数据并行的同步式分布式策略，主要支持多个 GPU 在同一台主机上训练。使用这种策略时，我们只需实例化一个 MirroredStrategy 策略:

```python
strategy = tf.distribute.MirroredStrategy()
strategy = tf.distribute.MirroredStrategy(devices=["/gpu:0", "/gpu:1"]) # 指定设备,只使用第 0、1 号 GPU
```

并将模型构建的代码放入 strategy.scope() 的上下文环境中:

```python
with strategy.scope():
    # 模型构建代码
```

MirroredStrategy 的步骤如下：
- 训练开始前，该策略在所有 N 个计算设备上均各复制一份完整的模型；
- 每次训练传入一个批次的数据时，将数据分成 N 份，分别传入 N 个计算设备（即数据并行）；
- N 个计算设备使用本地变量（镜像变量）分别计算自己所获得的部分数据的梯度；
- 使用分布式计算的 All-reduce 操作，在计算设备间高效交换梯度数据并进行求和，使得最终每个设备都有了所有设备的梯度之和；
- 使用梯度求和的结果更新本地变量（镜像变量）；
- 当所有设备均更新本地变量后，进行下一轮训练（即该并行策略是同步的）。
- 默认情况下，TensorFlow 中的 MirroredStrategy 策略使用 NVIDIA NCCL 进行 All-reduce 操作。

完整示例

```python
import tensorflow as tf
import tensorflow_datasets as tfds

num_epochs = 5
batch_size_per_replica = 64
learning_rate = 0.001

strategy = tf.distribute.MirroredStrategy()
print('Number of devices: %d' % strategy.num_replicas_in_sync)  # 输出设备数量
batch_size = batch_size_per_replica * strategy.num_replicas_in_sync

# 载入数据集并预处理
def resize(image, label):
    image = tf.image.resize(image, [224, 224]) / 255.0
    return image, label

# 使用 TensorFlow Datasets 载入猫狗分类数据集，详见“TensorFlow Datasets数据集载入”一章
dataset = tfds.load("cats_vs_dogs", split=tfds.Split.TRAIN, as_supervised=True)
dataset = dataset.map(resize).shuffle(1024).batch(batch_size)

with strategy.scope():
    model = tf.keras.applications.MobileNetV2(weights=None, classes=2)
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=learning_rate),
        loss=tf.keras.losses.sparse_categorical_crossentropy,
        metrics=[tf.keras.metrics.sparse_categorical_accuracy]
    )

model.fit(dataset, epochs=num_epochs)
```

用同一台主机上的 4 块 NVIDIA GeForce GTX 1080 Ti 显卡进行单机多卡的模型训练。所有测试的 epoch 数均为 5。
- 使用单机无分布式配置时，虽然机器依然具有 4 块显卡，但程序不使用分布式的设置，直接进行训练，Batch Size 设置为 64。
- 使用单机四卡时，测试总 Batch Size 为 64（分发到单台机器的 Batch Size 为 16）和总 Batch Size 为 256（分发到单台机器的 Batch Size 为 64）两种情况。

| 数据集 | 单机无分布式（Batch Size 为 64）| 单机四卡（总 Batch Size 为 64）|单机四卡（总 Batch Size 为 256）|
|---|---|---|---|
|cats_vs_dogs | 146s/epoch| 39s/epoch | 29s/epoch |
|tf_flowers| 22s/epoch| 7s/epoch | 5s/epoch |

使用 MirroredStrategy 后，模型训练的速度有了大幅度的提高。在所有显卡性能接近的情况下，训练时长与显卡的数目接近于反比关系。

### 多机训练： MultiWorkerMirroredStrategy

多机训练的方法和单机多卡类似，将 MirroredStrategy 更换为适合多机训练的 MultiWorkerMirroredStrategy 即可。不过，由于涉及到多台计算机之间的通讯，还需要进行一些额外的设置。具体而言，需要设置环境变量 TF_CONFIG ，示例如下:

```python
os.environ['TF_CONFIG'] = json.dumps({
    'cluster': {
        'worker': ["localhost:20000", "localhost:20001"]
    },
    'task': {'type': 'worker', 'index': 0}
})
```

TF_CONFIG 由 cluster 和 task 两部分组成：
- cluster 说明了整个多机集群的结构和每台机器的网络地址（IP + 端口号）。对于每一台机器，cluster 的值都是相同的；
- task 说明了当前机器的角色。例如， {'type': 'worker', 'index': 0} 说明当前机器是 cluster 中的第 0 个 worker（即 localhost:20000 ）。每一台机器的 task 值都需要针对当前主机进行分别的设置。

以上内容设置完成后，在所有的机器上逐个运行训练代码即可。先运行的代码在尚未与其他主机连接时会进入监听状态，待整个集群的连接建立完毕后，所有的机器即会同时开始训练。
- 请在各台机器上均注意防火墙的设置，尤其是需要开放与其他主机通信的端口。如上例的 0 号 worker 需要开放 20000 端口，1 号 worker 需要开放 20001 端口。

示例的训练任务与前节相同，只不过迁移到了多机训练环境。假设我们有两台机器，即首先在两台机器上均部署下面的程序，唯一的区别是 task 部分，第一台机器设置为 {'type': 'worker', 'index': 0} ，第二台机器设置为 {'type': 'worker', 'index': 1} 。接下来，在两台机器上依次运行程序，待通讯成功后，即会自动开始训练流程。

```python
import tensorflow as tf
import tensorflow_datasets as tfds
import os
import json

num_epochs = 5
batch_size_per_replica = 64
learning_rate = 0.001
# ---------
num_workers = 2
os.environ['TF_CONFIG'] = json.dumps({
    'cluster': {
        'worker': ["localhost:20000", "localhost:20001"]
    },
    'task': {'type': 'worker', 'index': 0}
})
strategy = tf.distribute.experimental.MultiWorkerMirroredStrategy()
batch_size = batch_size_per_replica * num_workers
# ---------

def resize(image, label):
    image = tf.image.resize(image, [224, 224]) / 255.0
    return image, label

dataset = tfds.load("cats_vs_dogs", split=tfds.Split.TRAIN, as_supervised=True)
dataset = dataset.map(resize).shuffle(1024).batch(batch_size)

with strategy.scope():
    model = tf.keras.applications.MobileNetV2(weights=None, classes=2)
    model.compile(
        optimizer=tf.keras.optimizers.Adam(learning_rate=learning_rate),
        loss=tf.keras.losses.sparse_categorical_crossentropy,
        metrics=[tf.keras.metrics.sparse_categorical_accuracy]
    )

model.fit(dataset, epochs=num_epochs)
```

在 Google Cloud Platform 分别建立两台具有单张 NVIDIA Tesla K80 的虚拟机实例（具体建立方式参见 [后文介绍](https://tf.wiki/zh_hans/appendix/cloud.html#zh-hans-gcp) ），并分别测试在使用一个 GPU 时的训练时长和使用两台虚拟机实例进行分布式训练的训练时长。所有测试的 epoch 数均为 5。
- 使用单机单卡时，Batch Size 设置为 64。使用双机单卡时，测试总 Batch Size 为 64（分发到单台机器的 Batch Size 为 32）和总 Batch Size 为 128（分发到单台机器的 Batch Size 为 64）两种情况。
- 模型训练的速度同样有大幅度的提高。在所有机器性能接近的情况下，训练时长与机器的数目接近于反比关系。

| 数据集|单机单卡（Batch Size 为 64）| 双机单卡（总 Batch Size 为 64）|双机单卡（总 Batch Size 为 128）|
|---|---|---|---|
| cats_vs_dogs | 1622s | 858s| 755s |
|tf_flowers | 301s | 152s | 144s |

### 使用 TPU 训练 TensorFlow 模型

[使用 TPU 训练 TensorFlow 模型](https://tf.wiki/zh_hans/appendix/tpu.html)
- ![](https://tf.wiki/_images/tensorflow-tpu.png)

2017 年 5 月，Alpha Go 在中国乌镇围棋峰会上，与世界第一棋士柯洁比试，并取得了三比零全胜战绩。之后的版本 Alpha Zero 可以通过自我学习 21 天即可以达到胜过中国顶尖棋手柯洁的 Alpha Go Master 的水平。Alpha Go 背后的动力全部由 TPU 提供。

TPU 代表 Tensor Processing Unit (张量处理单元) ，是由谷歌在 2016 年 5 月发布的为机器学习而构建的定制集成电路（ASIC），并为 TensorFlow 量身定制。

早在 2015 年，谷歌大脑团队就成立了第一个 TPU 中心，为 Google Translation，Photos 和 Gmail 等产品提供支持。 为了使所有数据科学家和开发人员能够访问此技术，不久之后就发布了易于使用，可扩展且功能强大的基于云的 TPU，以便在 Google Cloud 上运行 TensorFlow 模型。

TPU 由多个计算核心（Tensor Core）组成，其中包括标量，矢量和矩阵单元（MXU）。TPU（张量处理单元）与 CPU（中央处理单元）和 GPU（图形处理单元）最重要的区别是：TPU 的硬件专为线性代数而设计，线性代数是深度学习的基石。在过去几年中，Google TPU 已经发布了 v1，v2，v3, v2 Pod, v3 Pod, Edge 等多个版本

在 Google Cloud TPU Pod 上可以仅用 8 分钟就能够完成 ResNet-50 模型的训练。TPU 比现代 GPU 和 CPU 快 **15~30** 倍。同时，TPU 还实现了比传统芯片更好的能耗效率，算力能耗比值提高了 30 倍至 80 倍。

使用TPU
- （1）免费TPU：最方便使用 TPU 的方法，就是使用 Google 的 Colab ，不但通过浏览器访问直接可以用，而且还免费。
- （2）Cloud TPU：在 Google Cloud 上，我们可以购买所需的 TPU 资源，用来按需进行机器学习训练。为了使用 Cloud TPU ，需要在 Google Cloud Engine 中启动 VM 并为 VM 请求 Cloud TPU 资源。请求完成后，VM 就可以直接访问分配给它专属的 Cloud TPU 了


TPU 上进行 TensorFlow 分布式训练的核心 API 是 tf.distribute.TPUStrategy ，可以简单几行代码就实现在 TPU 上的分布式训练，同时也可以很容易的迁移到 GPU 单机多卡、多机多卡的环境。

```python
import os
import tensorflow as tf

if 'COLAB_TPU_ADDR' not in os.environ:
    print('ERROR: Not connected to a TPU runtime')
else:
    tpu_address = 'grpc://' + os.environ['COLAB_TPU_ADDR']
    print ('TPU address is', tpu_address)
# 输出： TPU address is grpc://10.49.237.2:8470

tpu = tf.distribute.cluster_resolver.TPUClusterResolver()
tf.config.experimental_connect_to_cluster(tpu)
tf.tpu.experimental.initialize_tpu_system(tpu)
strategy = tf.distribute.experimental.TPUStrategy(tpu)

```

[colab代码](https://colab.research.google.com/github/huan/tensorflow-handbook-tpu/blob/master/tensorflow-handbook-tpu-example.ipynb)

## TensorFlow Datasets

[TensorFlow Datasets](https://www.tensorflow.org/datasets/) 是一个开箱即用的数据集集合，包含数十种常用的机器学习数据集。通过简单的几行代码即可将数据以 tf.data.Dataset 的格式载入。关于 tf.data.Dataset 的使用可参考 [tf.data](https://tf.wiki/zh_hans/basic/tools.html#zh-hans-tfdata)。

该工具是一个独立的 Python 包，可以通过:

> pip install tensorflow-datasets

使用方法
- export HTTPS_PROXY=http://代理服务器IP:端口

tfds.load 方法返回一个 tf.data.Dataset 对象。部分重要的参数如下：
- as_supervised ：若为 True，则根据数据集的特性，将数据集中的每行元素整理为有监督的二元组 (input, label) （即 “数据 + 标签”）形式，否则数据集中的每行元素为包含所有特征的字典。
- split：指定返回数据集的特定部分。若不指定，则返回整个数据集。一般有 tfds.Split.TRAIN （训练集）和 tfds.Split.TEST （测试集）选项。

```python
import tensorflow as tf
import tensorflow_datasets as tfds

# MNIST、猫狗分类和 tf_flowers三个图像数据集
# 第一次载入特定数据集时，TensorFlow Datasets 会自动从云端下载数据集到本地，并显示下载进度。
dataset = tfds.load("mnist", split=tfds.Split.TRAIN, as_supervised=True)
dataset = tfds.load("cats_vs_dogs", split=tfds.Split.TRAIN, as_supervised=True)
dataset = tfds.load("tf_flowers", split=tfds.Split.TRAIN, as_supervised=True)

# 使用 TessorFlow Datasets 载入“tf_flowers”数据集
dataset = tfds.load("tf_flowers", split=tfds.Split.TRAIN, as_supervised=True)
# 对 dataset 进行大小调整、打散和分批次操作
dataset = dataset.map(lambda img, label: (tf.image.resize(img, [224, 224]) / 255.0, label)) \
    .shuffle(1024) \
    .batch(32)
# 迭代数据
for images, labels in dataset:
    # 对images和labels进行操作
```

## TF Hub 模型库

[TF Hub](https://tfhub.dev/) 目的是为了更好的复用已训练好且经过充分验证的模型，可节省海量的训练时间和计算资源。这些预训练好的模型，可以进行直接部署，也可以进行**迁移学习**（Transfer Learning）。
- ![](https://tf.wiki/_images/tfhub_main.png)
- 左侧有 Text、Image、Video 和 Publishers 等选项，可以选取关注的类别，然后在顶部的搜索框输入关键字可以搜索模型。
注意
- 目前还有很多模型是基于 TF1.0 的，选择的过程中请注意甄别，有些模型会明确写出来是试用哪个版本，或者，检查使用是否是 tfhub **0.5.0** 或以上版本的 API hub.load(url) ，在之前版本使用的是 hub.Module(url) 。在 TF2.0 上，必须使用 0.5.0 或以上版本，因为接口有变动
- 如果不能访问 tfhub.dev，请大家转换域名到国内镜像 https://hub.tensorflow.google.cn/ ，模型下载地址也需要相应转换。

TF Hub 是单独的一个库，需要单独安装，安装命令如下：
> pip install tensorflow-hub

### 直接使用模型

```python
import tensorflow_hub as hub

hub_handle = 'https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2'
hub_model = hub.load(hub_handle)
outputs = hub_model(inputs)
```

图片风格化完整示例

```python
import matplotlib.pyplot as plt
import numpy as np
import tensorflow as tf
import tensorflow_hub as hub

def crop_center(image):
    """Returns a cropped square image."""
    shape = image.shape
    new_shape = min(shape[1], shape[2])
    offset_y = max(shape[1] - shape[2], 0) // 2
    offset_x = max(shape[2] - shape[1], 0) // 2
    image = tf.image.crop_to_bounding_box(image, offset_y, offset_x, new_shape, new_shape)
    return image

def load_image_local(image_path, image_size=(512, 512), preserve_aspect_ratio=True):
    """Loads and preprocesses images."""
    # Load and convert to float32 numpy array, add batch dimension, and normalize to range [0, 1].
    img = plt.imread(image_path).astype(np.float32)[np.newaxis, ...]
    if img.max() > 1.0:
        img = img / 255.
    if len(img.shape) == 3:
        img = tf.stack([img, img, img], axis=-1)
    img = crop_center(img)
    img = tf.image.resize(img, image_size, preserve_aspect_ratio=True)
    return img

def show_image(image, title, save=False, fig_dpi=300):
    plt.imshow(image, aspect='equal')
    plt.axis('off')
    if save:
        plt.savefig(title + '.png', bbox_inches='tight', dpi=fig_dpi,pad_inches=0.0)
    else:
        plt.show()

content_image_path = "images/contentimg.jpeg"
style_image_path = "images/styleimg.jpeg"

content_image = load_image_local(content_image_path)
style_image = load_image_local(style_image_path)

show_image(content_image[0], "Content Image")
show_image(style_image[0], "Style Image")

# Load image stylization module. 把 TF Hub 的模型从网络下载和加载进来
hub_module = hub.load('https://tfhub.dev/google/magenta/arbitrary-image-stylization-v1-256/2');

# Stylize image. 运行模型
outputs = hub_module(tf.constant(content_image), tf.constant(style_image))
stylized_image = outputs[0]

show_image(stylized_image[0], "Stylized Image", True)
```

输入的图像是一张笔者拍的风景照片，风格图片是故宫馆藏的《王希孟千里江山图卷》部分截屏。

|原图|风格|效果|
|---|---|---|
|![](https://tf.wiki/_images/contentimg.jpeg)|![](https://tf.wiki/_images/styleimg.jpeg)|![](https://tf.wiki/_images/stylized_img.png)|

- [github代码体验](https://github.com/snowkylin/tensorflow-handbook/tree/master/source/_static/code/zh/tfhub)
- Google [colab代码体验](https://colab.research.google.com/github/tensorflow/hub/blob/master/examples/colab/tf2_arbitrary_image_stylization.ipynb)

### retrain模型 finetune

预预训练的模型不一定满足开发者的实际诉求，还需要进行二次训练。针对这种情况，TF Hub 提供了很方便的 Keras 接口 hub.KerasLayer(url) ，其可以封装在 Keras 的 Sequential 层状结构中，进而可以针对开发者的需求和数据进行再训练。

以 inception_v3 的模型为例，简单介绍 hub.KerasLayer(url) 使用的方法

```python
import tensorflow as tf
import tensorflow_hub as hub

num_classes = 10

# 使用 hub.KerasLayer 组件待训练模型
new_model = tf.keras.Sequential([
    hub.KerasLayer("https://tfhub.dev/google/tf2-preview/inception_v3/feature_vector/4", output_shape=[2048], trainable=False),
    tf.keras.layers.Dense(num_classes, activation='softmax')
])
new_model.build([None, 299, 299, 3])

# 输出模型结构, keras_layer就是从 TF Hub 上获取的模型
new_model.summary()

# Model: "sequential"
# _________________________________________________________________
# Layer (type)                 Output Shape              Param #
# =================================================================
# keras_layer (KerasLayer)     multiple                  21802784
# _________________________________________________________________
# dense (Dense)                multiple                  20490
# =================================================================
# Total params: 21,823,274
# Trainable params: 20,490
# Non-trainable params: 21,802,784
# _________________________________________________________________
```

- [colab代码](https://colab.research.google.com/github/tensorflow/hub/blob/master/examples/colab/tf2_image_retraining.ipynb)

## 设备检测

检测是否安装GPU版本：

```python
from tensorflow.python.client import device_lib
print(device_lib.list_local_devices())

#[name: "/device:CPU:0"
# device_type: "CPU"
# memory_limit: 268435456
# locality {
#}
# incarnation: 1937408177159318398
#]
```
如果是GPU版本的话，应该会有这样的一段
- ![](https://img-blog.csdnimg.cn/06a1b158cfbd476e8fe76382ff84ce9c.png)
- 卸载：pip uninstall tensorflow
- 安装：pip install tensorflow-gpu==版本号

代码

```python
import tensorflow as tf

# cpu版tf提示错误：
# 2021-11-18 11:22:03.396212: W tensorflow/stream_executor/platform/default/dso_loader.cc:64] Could not load dynamic library 'libcudart.so.11.0'; dlerror: libcudart.so.11.0: cannot open shared object file: No such file or directory; LD_LIBRARY_PATH: ~/anaconda3/envs/py3/lib:~/anaconda3/lib:~/anaconda3/lib:~/anaconda3/lib:
# 2021-11-18 11:22:03.396264: I tensorflow/stream_executor/cuda/cudart_stub.cc:29] Ignore above cudart dlerror if you do not have a GPU set up on your machine.

tf.debugging.set_log_device_placement(True)     # 设置输出运算所在的设备
cpus = tf.config.list_physical_devices('CPU')   # 获取当前设备的 CPU 列表
tf.config.set_visible_devices(cpus)           # 设置 TensorFlow 的可见设备范围为 cpu
```

[2021最新：TensorFlow各个GPU版本CUDA和cuDNN对应版本整理(最简洁)](https://blog.csdn.net/K1052176873/article/details/114526086)




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


