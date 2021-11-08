---
layout: post
title:  "流形学习&降维-Manifold Learning&Dimention Reduction"
date:   2020-04-30 14:21:00
categories: 机器学习
tags: 深度学习 流形学习 降维 无监督学习 维数灾难 embedding word2vec t-sne pca
excerpt: 机器学习无监督学习中的降维技术，线性（pca/lda），非线性（t-sne/isomap/mds），及背后的流形学习原理
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

- 【2020-9-9】[流形学习t-SNE，LLE，Isomap](https://www.toutiao.com/i6870113106081612292)
- 【2020-9-19】流形学习前沿方向：隐图学习，[Latent graph neural networks: Manifold learning 2.0?](https://towardsdatascience.com/manifold-learning-2-99a25eeb677d)
![](https://wx2.sinaimg.cn/mw690/5396ee05ly1ginkjd7x4ij20d40aetdm.jpg)
- 【2014-3】[NN-Manifolds-Topology](https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/)
- 【2021-4-25】比如，三维空间的球体是一个二维流形嵌入在三维空间（2D manifold embedded in 3D space）。之所以是二维流形，是因为球上的任意一个点只需要用一个二维的经纬度来表达就可以了。
- 又如一个二维空间的旋转矩阵是2x2的矩阵，其实只需要一个角度就能表达了，这就是一个一维流形嵌入在2x2的矩阵空间。
- 深度学习里的Embedding？
  - Embedding这个概念在深度学习领域最原初的切入点是所谓的**Manifold Hypothesis**（**流形假设**）。
  - 流形假设是指“<font color='blue'>自然的原始数据是低维的流形嵌入于(embedded in)原始数据所在的高维空间</font>”。
  - 那么，深度学习的任务就是把高维原始数据（图像，句子）映射到低维流形，使得高维的原始数据被映射到低维流形之后变得可分，而这个映射就叫**嵌入**（Embedding）。比如Word Embedding，就是把单词组成的句子映射到一个表征向量。但后来不知咋回事，开始**把低维流形的表征向量叫做Embedding**，其实是一种误用

[知乎刘斯坦](https://www.zhihu.com/question/38002635/answer/1382442522)

# 欧式空间与非欧空间

- [欧几里得的世界](https://blog.csdn.net/shuibinziming/article/details/77780046)
- 问题：一条直线L和不在L上的点P，经过P点平行于L的线有几条？
  - 欧式空间中，这个问题显然是“只有一条”
  - 非欧空间中，这个问题就不一定了。
- 马鞍形的双曲抛物面，就是一个非欧空间的例子。
  - 粉色和黄色线都平行于蓝线，且都经过同一点。更重要的是，蓝色和黄色的平行线并非与欧式空间中的平行线一样处处距离相等。
  - ![](https://img-blog.csdn.net/20170901223551309)

- [理解数学空间，从距离到希尔伯特空间](https://blog.csdn.net/shijing_0214/article/details/51052208)
- 演变关系
  - **线性空间**（向量空间， 对数乘和向量加法封闭所组成的空间）--（定义范数）-->**赋范线性空间**（向量具有的长度）--（定义内积）-->**内积空间**（向量之间具有了角度）--（完备化）-->**希尔伯特空间**→**欧式空间**（有限维）。
- 总结
  - 距离⟶范数⟶内积 
  - 向量空间+范数⟶赋范空间+线性结构⟶+线性结构⟶线性赋范空间+内积运算⟶内积空间+完备性⟶希尔伯特空间 
  - 内积空间+有限维⟶欧几里德空间 
  - 赋范空间+完备性⟶+完备性⟶巴拿赫空间
- 知乎：[如何理解希尔伯特空间](https://www.zhihu.com/question/19967778)
  - ![](https://pic1.zhimg.com/80/v2-be26b2ba1df2edc9636647a28b22238d_720w.jpg)


## 欧氏空间

- 约在公元前300年，古希腊数学家欧几里德建立了角和空间中距离之间联系的法则，现称为欧几里德几何。欧几里德首先开创了处理平面上二维物体的平面几何，接着分析三维物体的立体几何，所有欧几里德的公理已被编排到叫做二维或三维欧几里德空间的抽象数学空间中。
- 这些数学空间可以被扩展而应用于任何有限维度，这种空间叫做n维欧几里德空间（简称n维空间）或有限维实内积空间。
- 简单来说，欧式空间就是二维空间、三维空间以及继承三维空间定理的N维空间。

- `欧式空间`的定义：
  - 设V是实数域R上的**线性空间**(或称为向量空间)，若V上定义着正定对称双线性型g(g称为内积)，则V称为(对于g的)**内积空间**或**欧几里得空间**(有时仅当V是有限维时，才称为欧几里得空间)。
  - 具体来说，g是V上的二元实值函数，满足如下关系：（<font color='blue'>对称+加法+数乘+距离有效</font>）
    - (1) g(x,y) = g(y,x)
    - (2) g(x+y,z) = g(x,z) + g(y, z)
    - (3) g(kx,y) = kg(x,y) 
    - (4) g(x,y) >= 0,而且g(x,y)=0当且仅当x=0时成立。
  - 这里x,y,z是V中任意向量,k是任意实数。
- 标准欧几里得空间
  - 四维空间被称为标准欧几里得空间，可以拓展到n维；四维时空指的是闵可夫斯基空间概念的一种误解。人类作为三维物体可以理解四维时空(三个空间维度和一个时间维度)但无法认识以及存在于四维空间，因为人类属于第三个空间维度生物。通常说时间是第四维即四维时空下的时间维度。四维空间的第四维指与x,y,z同一性质的空间维度。然而四维时空并不是标准欧几里得空间，时间的本质是描述运动的快慢。
- 通过一维，二维，三维空间的演变，人们提出了关于四维空间的一些猜想。尽管这些猜想现在并不能证明是正确的，但科学理论有很多是猜想开始的。现今科学理论一般是基于现象总结规律，而关于四维空间的现象没有足够准确清晰的认识，或者看到了这种现象却并没有想到是四维空间引起的。

## 非欧氏空间

- 摘自：[欧式空间与非欧式空间](https://blog.csdn.net/Bboy_LaiNiao/article/details/106268401)
- 爱因斯坦曾经形象地比喻过非欧几何：
  - 假设有一种生活在二维平面的生物，但它们不是生活在绝对的平面上，而是生活在一个球面上，那么，当它们在小范围内研究圆周率的时候，会像我们一样发现圆周率是3.1415926……
  - 但是，如果它们画一个很大的圆，去测量圆的周长和半径，就会发现周长小于2πr，圆越大，周长比2πr小得越多。为了能够适用于大范围的研究，它们就必须修正它们的几何方法。
- 如果空间有四维，而我们生活的三维空间在空间的第四个维度中发生了弯曲，那我们的几何就必须进行修正，这就是非欧几何。在非欧几何中，平行的直线只在局部平行，就像地球的经线只在赤道上平行一样。
- 二维生物画圆的解释如下：
  - ![](https://img-blog.csdnimg.cn/20200521214242943.jpg)

## 希尔伯特空间

- 摘自：[欧式空间与希尔伯特空间](https://blog.csdn.net/ByteMelody/article/details/83352026)
- 希尔伯特空间：
  - 在数学中，希尔伯特空间是欧几里得空间的一个推广，其不再局限于有限维的情形。与欧几里得空间相仿，希尔伯特空间也是一个内积空间，其上有距离和角的概念(及由此引申而来的正交性与垂直性的概念)。此外，希尔伯特空间还是一个完备的空间，骑上所有的柯西序列等价于收敛序列，从而微积分中的大部分概念都可以无障碍的推广到希尔伯特空间中。希尔伯特空间为基于任意正交系上的多项式表示的傅里叶级数和傅里叶变换提供了一种有效的表述方式，而这也是泛函分析的核心概念之一。希尔伯特精简是公式化数学和量子力学的关键性概念之一。
- 希尔伯特空间是欧几里德空间的直接推广。对希尔伯特空间及作用在希尔伯特空间上的算子的研究是泛函分析的重要组成部分。
- 设H是一个实的线性空间，如果对H中的任何两个向量x和y，都对应着一个实数，记为(x，y)、满足下列条件：
  - ①对H中的任何两个向量x，y，有(x，y)=(y，x);
  - ②对H中的任何三个向量x、y、z及实数α、β，有(αx+βy，z)=α(x，z)+β(y，z);
  - ③对H中的一切向量x，均有(x，x)≥0，且(x，x)=0的充分必要条件是x=0。则(x，y)称为是H上的一个内积，而H称为内积空间。
- 完备的内积空间称为希尔伯特空间，希尔伯特空间的概念还可以推广到复线性空间上。


# Embedding（嵌入）

- 【2021-5-6】国立台湾大学陈蕴侬的[word embedding](https://www.csie.ntu.edu.tw/~miulab/s108-adl/doc/200331_WordEmbeddings.pdf)，更多[课件](https://www.csie.ntu.edu.tw/~miulab/s108-adl/doc/)

## 基本概念

- Embedding（嵌入）是**拓扑学**里面的词，在深度学习领域经常和`Manifold`（流形）搭配使用。
  - 三维空间的球体是一个二维流形嵌入在三维空间（2D manifold embedded in 3D space）。球上的任意一个点只需要用一个二维的经纬度来表达就可以了。
  - 一个二维空间的旋转矩阵是2x2的矩阵，其实只需要一个角度就能表达了，这是一维流形嵌入在2x2的矩阵空间。

作者：[刘斯坦](https://www.zhihu.com/question/38002635/answer/1382442522)

Embedding 就是把一个东西映射到一个向量 x。如果两个东西很像，那么得到的向量x1和x2的欧式距离很小。
- 例一：Word Embedding，把单词 w 映射到向量 x。如果两个词的原意接近，比如coronavirus和covid，那么它们映射后得到的两个词向量 x1 和 x2 的欧式距离很小。
- 例二：User Embedding，把用户 ID 映射到向量 x。推荐系统中需要用一个向量表示一个用户。如果两个用户的行为习惯接近，那么他们对应的向量  x1 和 x2 的欧式距离很小。
- 例三：Graph Embedding，把图中的每个节点映射成一个向量 x。如果图中两个节点接近，比如它们的最短路很小，那么它们embed得到的向量 x1 和 x2 的欧式距离很小。

[知乎sen2020](https://www.zhihu.com/question/38002635/answer/1782324218)

## 作用

Embedding 是一个将离散变量转为连续向量表示的一个方式。在神经网络中，embedding是非常有用的，因为它不光可以减少离散变量的空间维数，同时还可以有意义的表示该变量。

Embedding 有以下 3 个主要目的：
- 在 embedding 空间中查找最近邻，这可以很好的用于根据用户的兴趣来进行推荐。
- 作为监督性学习任务的输入。
- 用于可视化不同离散变量之间的关系。

Embedding这个概念在深度学习领域最原初的切入点是所谓的**Manifold Hypothesis**（**流形假设**）。流形假设是指“**自然的原始数据是低维的流形嵌入于(embedded in)原始数据所在的高维空间**”。深度学习的任务就是把**高维**原始数据（图像，句子）映射到**低维**流形，使得高维的原始数据被映射到低维流形之后变得可分，而这个映射就叫嵌入（Embedding）。比如Word Embedding，就是把单词组成的句子映射到一个表征向量。但后来不知咋回事，开始把低维流形的表征向量叫做Embedding，其实是一种误用。。。如果按照现在深度学习界通用的理解（其实是偏离了原意的），Embedding就是从原始数据提取出来的Feature，也就是那个通过神经网络映射之后的低维向量。

2014年的经典文章：[Neural Networks, Manifolds, and Topology](https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/)


## Embedding 可视化

Embedding 最酷的一个地方在于可以用来可视化出表示的数据的相关性，为了便于观察，需要通过降维技术来达到 2 维或 3 维。最流行的降维技术是：t-Distributed Stochastic Neighbor Embedding (`TSNE`)。

![](https://pic4.zhimg.com/80/v2-e1c5fcd4234d9a6ef64daa9108309ed7_1440w.jpg)

2016年12月，[谷歌开源Embedding Projector，可将高维数据可视化](https://zhuanlan.zhihu.com/p/24252690)
- 一款用于交互式可视化和高维数据分析的网页工具 [Embedding Projector](https://projector.tensorflow.org/)，通过PCA，T-SNE等方法将高维向量投影到三维坐标系。
  - **PCA** 通常可以有效地探索嵌入的内在结构，揭示出数据中最具影响力的维度。
  - **t-SNE** 可用于探索局部近邻值（local neighborhoods）和寻找聚类（cluster），可以让开发者确保一个嵌入保留了数据中的所有含义（比如在 MNIST 数据集中，可以看到同样的数字聚类在一起）。
  - **自定义线性投影**可以帮助发现数据集中有意义的「方向（direction）」，比如一个语言生成模型中一种正式的语调和随意的语调之间的区别——这让我们可以设计出更具适应性的机器学习系统。
- 其作为 TensorFlow 的一部分，能带来类似 [A.I. Experiment](http://aiexperiments.withgoogle.com/) 的效果。同时，谷歌也在 projector.tensorflow.org 放出了一个可以单独使用的版本，让用户无需安装和运行 TensorFlow 即可进行高维数据的可视化
- [论文](https://arxiv.org/pdf/1611.05469v1.pdf), [A.I. Experiment](http://aiexperiments.withgoogle.com/), [Embedding Projector体验地址](https://projector.tensorflow.org/)，[使用介绍](https://www.tensorflow.org/versions/master/how_tos/embedding_viz/index.html)
- ![nlp降维图示](https://pic1.zhimg.com/80/v2-7abbe32b5feb0ab869db33a55e2b8b7c_720w.png)
  - Label by：可以选择Label和Index，将鼠标放到相应的点上，可以显示该点的Label或者Index
  - Color by：可选Label和No color map，前者会根据不同的label给点赋予不同的颜色，后者不涂色，一律为黑白，如图所示。
  - ![](https://img-blog.csdn.net/20180710170658512)
  - 可以根据Label查找某个类，如图，我们可以找到Label为4的点。
  - ![](https://img-blog.csdn.net/20180710170727330)

<video width="620" height="440" controls="controls" autoplay="autoplay">
  <source src="https://vdn1.vzuu.com/SD/7191e9f4-ec77-11ea-acfd-5ab503a75443.mp4?disable_local_cache=1&auth_key=1619512352-0-0-9d84f1b7e6c1920c1c9a0a2806ca2132&f=mp4&bu=pico&expiration=1619512352&v=hw" type="video/mp4" />
  </object>
</video>

- 将projector用于代码：[TensorBoard-PROJECTOR-高维向量可视化](https://blog.csdn.net/a13602955218/article/details/80988904)

```python
import tensorflow as tf
import mnist_inference
import os

from tensorflow.contrib.tensorboard.plugins import projector
from tensorflow.examples.tutorials.mnist import input_data

batch_size = 128
learning_rate_base = 0.8
learning_rate_decay = 0.99
training_steps = 10000
moving_average_decay = 0.99

log_dir = 'log'
sprite_file = 'mnist_sprite.jpg'
meta_file = 'mnist_meta.tsv'
tensor_name = 'final_logits'

#获取瓶颈层数据，即最后一层全连接层的输出
def train(mnist):
    with tf.variable_scope('input'):
        x = tf.placeholder(tf.float32,[None,784],name='x-input')
        y_ = tf.placeholder(tf.float32,[None,10],name='y-input')

    y = mnist_inference.build_net(x)
    global_step = tf.Variable(0,trainable=False)

    with tf.variable_scope('moving_average'):
        ema = tf.train.ExponentialMovingAverage(moving_average_decay,global_step)
        ema_op = ema.apply(tf.trainable_variables())

    with tf.variable_scope('loss_function'):
        loss = tf.reduce_mean(tf.nn.sparse_softmax_cross_entropy_with_logits(logits=y,labels=tf.argmax(y_,1)))

    with tf.variable_scope('train_step'):
        learning_rate = tf.train.exponential_decay(
            learning_rate_base,
            global_step,
            mnist.train.num_examples/batch_size,
            learning_rate_decay,
            staircase=True
        )

        train_step = tf.train.GradientDescentOptimizer(learning_rate).minimize(loss,global_step=global_step)

        train_op = tf.group(train_step,ema_op)

    with tf.Session() as sess:
        sess.run(tf.global_variables_initializer())
        for i in range(training_steps):
            xs,ys = mnist.train.next_batch(batch_size)
            _,loss_value,step = sess.run([train_op,loss,global_step],feed_dict={x:xs,y_:ys})

            if step % 100 == 0 :
                print('step:{},loss:{}'.format(step,loss_value))

        final_result = sess.run(y,feed_dict={x:mnist.test.images})

    return final_result

def visualisation(final_result):
    #定义一个新向量保存输出层向量的取值
    y = tf.Variable(final_result,name=tensor_name)
    #定义日志文件writer
    summary_writer = tf.summary.FileWriter(log_dir)

    #ProjectorConfig帮助生成日志文件
    config = projector.ProjectorConfig()
    #添加需要可视化的embedding
    embedding = config.embeddings.add()
    #将需要可视化的变量与embedding绑定
    embedding.tensor_name = y.name

    #指定embedding每个点对应的标签信息，
    #这个是可选的，没有指定就没有标签信息
    embedding.metadata_path = meta_file
    #指定embedding每个点对应的图像，
    #这个文件也是可选的，没有指定就显示一个圆点
    embedding.sprite.image_path = sprite_file
    #指定sprite图中单张图片的大小
    embedding.sprite.single_image_dim.extend([28,28])

    #将projector的内容写入日志文件
    projector.visualize_embeddings(summary_writer,config)

    #初始化向量y，并将其保存到checkpoints文件中，以便于TensorBoard读取
    sess = tf.InteractiveSession()
    sess.run(tf.global_variables_initializer())
    saver = tf.train.Saver()
    saver.save(sess,os.path.join(log_dir,'model'),training_steps)
    summary_writer.close()

def main(_):
    mnist = input_data.read_data_sets('MNIST_data',one_hot=True)

    final_result = train(mnist)
    visualisation(final_result)

if __name__ == '__main__':
    tf.app.run()
```

生成sprite图和meta文件, 便于直接在动态图上看到数据标签

```python
import matplotlib.pyplot as plt
import tensorflow as tf
import numpy as np
import os
from tensorflow.examples.tutorials.mnist import input_data

log_dir = './log'
sprite_file = 'mnist_sprite.jpg'
meta_file = 'mnist_meta.tsv'

def create_sprite_image(images):
    if isinstance(images,list):
        images = np.array(images)
    #获取图像的高和宽
    img_h = images.shape[1]
    img_w = images.shape[2]
    #对图像数目开方，并向上取整，得到sprite图每边的图像数目
    num = int(np.ceil(np.sqrt(images.shape[0])))
    #初始化sprite图
    sprite_image = np.zeros([img_h*num,img_w*num])
    #为每个小图像赋值
    for i in range(num):
        for j in range(num):
            cur = i * num + j
            if cur < images.shape[0]:
                sprite_image[i*img_h:(i+1)*img_h,j*img_w:(j+1)*img_w] = images[cur]

    return sprite_image

if __name__ == '__main__':
    mnist = input_data.read_data_sets('MNIST_data',one_hot=False)
    #黑底白字变成白底黑字
    to_visualise = 1 - np.reshape(mnist.test.images,[-1,28,28])
    sprite_image = create_sprite_image(to_visualise)

    #存储展示图像
    path_mnist_sprite = os.path.join(log_dir,sprite_file)
    plt.imsave(path_mnist_sprite,sprite_image,cmap='gray')
    plt.imshow(sprite_image,cmap='gray')

    #存储每个下标对应的标签
    path_mnist_metadata = os.path.join(log_dir,meta_file)
    with open(path_mnist_metadata,'w') as f:
        f.write('Index\tLabel\n')
        for index,label in enumerate(mnist.test.labels):
            f.write('{}\t{}\n'.format(index,label))

```

执行tensorboard –logdir=log后，浏览器打开localhost:6006，即可观察到相应结果。每个高维向量都被投影到一个三维坐标系中，同一个类别的向量彼此靠近，形成一个一个的簇，且界限明显，可见分类效果较好

![](https://img-blog.csdn.net/2018071017062698)

t-sne效果较好

![](https://img-blog.csdn.net/20180710170707473)


摘自：[Embedding的理解](https://zhuanlan.zhihu.com/p/46016518)，[英文原文](https://towardsdatascience.com/neural-network-embeddings-explained-4d028e6f0526)

## word2vec

优质文章：[The Illustrated Word2vec](https://jalammar.github.io/illustrated-word2vec/)，[中文版](https://mp.weixin.qq.com/s?__biz=MjM5MTQzNzU2NA==&mid=2651669277&idx=2&sn=bc8f0590f9e340c1f1359982726c5a30&chksm=bd4c648e8a3bed9817f30c5a512e79fe0cc6fbc58544f97c857c30b120e76508fef37cae49bc&scene=0&xtrack=1#rd)

![](https://jalammar.github.io/images/word2vec/personality-two-persons.png)

## 实现

TensorFlow版本的Embedding实现：（参考：[TensorFlow embedding小记](https://blog.csdn.net/xiaoguaishou21509/article/details/79796773)）
- embedding_lookup虽然是随机化地映射成向量，看起来信息量相同，但其实却更加超平面可分
- embedding_lookup不是简单的查表，id对应的向量是可以训练的，训练参数个数应该是 category num*embedding size，也就是说lookup是一种全连接层。
- word embedding其实是有了一个距离的定义，即出现在同一上下文的词的词向量距离应该小，这样生成向量比较容易理解。autoencode、pca等做一组基变换，也是假设原始特征值越接近越相似。但id值的embedding应该是没有距离可以定义，没有物理意义，只是一种特殊的全连接层。
- 用embedding_lookup做id类特征embedding由google的deep&wide提出，但隐藏了具体实现细节
- 分类模型中用这种id类特征，主要是希望模型把这个商品记住。但id类特征维度太高，同一个商品的数据量也不大，因此也常常用i2i算法产出的item embedding来替代id特征。

```python
import tensorflow as tf

# embedding矩阵
embeddings = tf.Variable( tf.random_uniform([vocabulary_size, embedding_size], -1.0, 1.0))
# 将train_inputs(目标索引/编号)映射为向量
embed = tf.nn.embedding_lookup(embeddings, train_inputs)
# 执行
print(sess.run(input_embedding, feed_dict={input_ids:[[1, 2], [2, 1], [3, 3]]}))
```


## pyecharts可视化

将高维向量通过 t-sne降维，再用pyecharts（1.*以上版本）可视化出来
- t-sne降维

```python
# 原始数据文件格式：[query, 0.23, 0.43, ..., 1.23], 将query嵌入到768的高维空间里
data_file = 'newhouse/all_data_embedding.txt'
#query_vec = pd.read_csv(data_file)
#query_vec
num = 0
n = 769
query_dict = {}
for line in open(data_file):
    num += 1
    #if num > 50:
    #    break
    arr = line.strip().split(',')
    query= arr[0]
    vec = arr[1:]
    if len(arr) != 769 or not query:
        logging.error('格式异常: query={}, len={}, line={}'.format(query,len(arr),arr[:3]))
        continue
    query_dict[query] = vec
query_list = list(query_dict.values())
query_label = list(query_dict.keys())
print(len(query_dict.keys()))

# ----- t-SNE 降维 -----
import numpy as np 
from sklearn.manifold import TSNE

X = np.array(query_list)
#X = np.array([[0,0,0],[0,1,1],[1,0,1],[1,1,1]])
tsne = TSNE(n_components = 3)
tsne.fit_transform(X)
X_new = tsne.embedding_ # 降维后的3维矩阵
print(query_label[10],X_new[10]) # 输出label、降维后的向量

# ----- pca ------
from sklearn.decomposition import PCA

pca=PCA(n_components=3)

```
- 数据加载、可视化

```python

import random
from pyecharts import options as  opts
from pyecharts.charts import Scatter3D
from pyecharts.faker import Faker

# --------- 加载数据 ---------
vec_tsne = np.load('/home/wangqiwen004/work/nlu_data/newhouse/vec_tsne.npy')
vec_label = np.load('/home/wangqiwen004/work/nlu_data/newhouse/vec_label.npy')
vec_label = vec_label.reshape((-1,1)) # label是1维时，需要转换成矩阵，才能拼接
print(vec_label.shape,vec_tsne.shape)
vec_tsne[:3].tolist()
np.hstack((vec_tsne[:3], vec_label[:3]))
# --------- 数据格式化 ---------
#Scatter_data = [(random.randint(0,50),random.randint(0,50),random.randint(0,50)) for i in range(50)]
#Scatter_data = vec_tsne[:10].tolist()
N = 50000
Scatter_data = np.hstack((vec_tsne, vec_label))[:N].tolist()

# --------- 绘图 ---------
c = (
    Scatter3D(init_opts = opts.InitOpts(width='1500px',height='900px'))  #初始化
    .add("句子向量（t-sne）",Scatter_data,
         grid3d_opts=opts.Grid3DOpts(
            width=100, depth=100, rotate_speed=20, is_rotate=False
        ))
    #设置全局配置项
    .set_global_opts(
        title_opts=opts.TitleOpts(title="新房驻场客服query分布（部分N={}）".format(min(N,vec_label.shape[0]))),  #添加标题
        visualmap_opts=opts.VisualMapOpts(
            max_=50, #最大值
            pos_top=50, # visualMap 组件离容器上侧的距离
            range_color=Faker.visual_color  #颜色映射                                         
        )
    )
)
c.render("新房驻场客服-query空间关系.html")
#c.render_notebook() # 渲染到jupyter notebook页面
```


# 流形学习

- [Neural Networks, Manifolds, and Topology](https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/)，中文翻译版：[神经网络、流形和拓扑](https://www.jianshu.com/p/12667309bf23)
  - 一个双曲正切层tanh⁡(Wx+b)由以下组成：
    - 1、由“权重”矩阵W的线性变换；
    - 2、由矢量b的转换；
    - 3、双曲正切函数的逐点应用。
  - 连续变换如下图：
  - ![](https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/simple2_1.png)
  - 更复杂的网络，4个隐含层网络，“原始”表示转移到更高层次为了对数据进行分类。而螺旋最初是纠结的，最终他们是线性可分的。
  - ![](https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/spiral.1-2.2-2-2-2-2-2.gif)
  - ![](https://colah.github.io/posts/2014-03-NN-Manifolds-Topology/img/topology_2D-2D_train.gif)
  - 更多动图可视化见：Andrej Karpathy有很好的演示基于[ConvnetJS](http://cs.stanford.edu/people/karpathy/convnetjs//demo/classify2d.html)，让您可以交互式地浏览网络
  - 双曲正切层的拓扑
    - 每一层都会拉伸和挤压空间，但永远不会切割、断裂和褶皱它。直观地说，tanh保留了拓扑性质。例如，一组数据将在转化后依然保持连接状态。
    - 定理：<font color='blue'>具有N个输入和N个输出的层是同胚，如果权重矩阵W是非奇异的</font>

这样的转换，不影响拓扑结构，被称为同胚。在形式上，他们是连续函数的双向映射。

作者：[树石](https://www.jianshu.com/p/4d9efddf8d54)

- **Manifold Hypothesis**（`流形假设`）
  - 流形假设：“自然的原始数据是低维的流形嵌入于(embedded in)原始数据所在的高维空间”
  - 深度学习就是把高维原始数据（图像，句子）映射到低维流形，使得高维的原始数据被映射到低维流形之后变得可分，而这个映射就叫嵌入（Embedding）。如Word Embedding把单词组成的句子映射到一个表征向量。但后来把低维流形的表征向量叫做Embedding，其实是一种误用。
  - Embedding就是从原始数据提取出来的Feature，也就是那个通过神经网络映射之后的低维向量。
- 流形学习假设所有处于高维空间的数据点都分布在一个低维的流形上。流形学习的目的就在于寻找一种映射，从高维空间中恢复出低维流形来，从而利用流形的低维坐标表示高位空间的数据点，实现数据降维的目的。常用的算法有`Isomap`, `LLE`（Locally Linear Embedding）, `LE`（Laplacian Eigenmaps），`LLP`（Locality Preserving Projection）等

- 虽然有一些维度缩减的变体是有监督的（例如线性/二次判别分析），**流形学习通常指的是无监督的降维**，其中类别没有提供给算法（虽然可能存在）

![](https://p1-tt.byteimg.com/origin/pgc-image/18fd608d47914f9c90c2227d2dd56a9e)
![](https://p3-tt.byteimg.com/origin/pgc-image/c0574ea8081f49af95604bb350657bd2)


- 降维的目的在于寻找数据的“内在变量”,如图，丢弃掉数据之间你的公共信息（“A”的形状），发掘数据之间的变化信息（缩放尺度及旋转角度）。由于缩放尺度与旋转角度并非是线性分布的，因此更适合采用非线性降维方法。
![](https://img-blog.csdnimg.cn/20190401202159198.jpg)

- [什么是流形？manifold](https://www.bilibili.com/video/BV145411x7vJ)
<iframe src="//player.bilibili.com/player.html?aid=455350252&bvid=BV145411x7vJ&cid=181172271&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="600" width="100%"> </iframe>
- [用t-SNE进行数据可视化-GoogleTechTalks出品](https://www.bilibili.com/video/BV1Ax411v7z5)
<iframe src="//player.bilibili.com/player.html?aid=10560557&bvid=BV1Ax411v7z5&cid=17434638&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="600" width="100%"> </iframe>

## LLE

LLE：局部线性嵌入（Locally Linear Embedding）是一种非常有效的非线性降维（NLDR）方法。测量每个训练实例与其最近邻（c.n.）之间的线性关系，然后寻找能最好地保留这些局部关系的训练集的低维表示，擅长展开扭曲的流形。

代码：

```python
from sklearn.manifold import LocallyLinearEmbedding
lle=LocallyLinearEmbedding(n_components=2,n_neighbors=10)
X_reduced=lle.fit_transform(X)
```

# 降维

## 为什么要降维

目的：
- 加快后续训练算法（在某些情况下甚至可能去除噪声和冗余功能，使训练算法执行更好）。
- 可视化数据。
- 节省空间（压缩）

带来的问题
- 丢失了一些信息，可能会降低后续性能训练算法。
- 可能是计算密集型的
- 为机器学习流程增加了一些复杂性。
- 转换的过程通常难以解释。

降维可逆吗？
- 一些算法（如PCA）具有简单的逆向变换过程可以重建与原始数据相对类似的数据集
- 某些降维算法则没有逆变换的方法（如T-SNE）。

## 主要方法

降低维度的两种主要方法：**投影**和**流形学习**。

### 投影

- 适合所有训练实例实际上位于（或接近）高维空间的**低维子空间**内，这样就可以采用投影的降维方法。
  -  如分布接近于2D子空间的3D数据集一个分布接近于2D子空间的3D数据集
  - ![](https://img-blog.csdnimg.cn/20190319231722249.jpg)
- 但是，投影并不总是降维的最佳方法。在很多情况下，子空间可能会扭曲和转动，如瑞士卷型数据集，S形分布

#### PCA

- 代表示例：PCA系列（SVD分解），如：增量 PCA，随机 PCA，核PCA（非线性投影，如RBF核的kPCA）

选哪种pca？
- **常规PCA**是首选，仅当数据集适合内存时才有效。
- **增量PCA**对于不适合内存的大型数据集很有用，但速度较慢比普通PCA，所以如果数据集适合内存，应该选择常规PCA。当需要时，增量PCA对在线任务也很有用。每当新实例到达时，PCA即时运行。
- **随机PCA**：当想要大大降低维度并且数据集适合内存时，它比普通PCA快得多。
- 最后，**核PCA**是对非线性数据集很有用。


- PCA可以显著降低大多数数据集的维数，甚至是高度非线性的数据集，因为它可以消除无用特征（维度）的干扰。但是，如果没有无用的特征（维度），例如瑞士数据集卷，那么使用PCA降低维度会丢失太多信息。你想要展开瑞士卷，而不是挤压它

代码

```python
from sklearn.decomposition import PCA

pca=PCA(n_components=2) # 指定主成分数目
#pca=PCA(n_components=0.95) # 指定累计贡献率
X2D=pca.fit_transform(X)
# 访问主成分
pca.components_.T[:,0]
# 方差解释率
print(pca.explained_variance_ratio_) # array([0.84248607, 0.14631839])
# 应用到新数据
X_reduced=pca.fit_transform(X)


#------ 核pca ------
from sklearn.decomposition import KernelPCA
rbf_pca=KernelPCA(n_components=2,kernel='rbf',gamma=0.04)
X_reduced=rbf_pca.fit_transform(X)
```

无监督学习的核pca如何调参？
- 使用 kPCA 将维度降至低维维，然后应用 Logistic 回归进行分类。然后使用 Grid SearchCV 为 kPCA 找到最佳的核和 gamma 值，以便在最后获得最佳的分类准确性.（引入模型，以最优化模型表现调参）

参考：[机器学习算法（降维）总结及sklearn实践——主成分分析（PCA）、核PCA、LLE、流形学习](https://blog.csdn.net/github_38486975/article/details/88384884)

### 流形学习

- 瑞士卷一个是二维流形的例子.简而言之，二维流形是一种二维形状，它可以在更高维空间中弯曲或扭曲。

## VC维

- [VC维与模型复杂度、样本复杂度](https://blog.csdn.net/JasonDing1354/article/details/42009157)
- 物理意义：将假设集合的数量\|H\|比作假设集合的自由度，那么VC维就是假设集合在做二元分类的有效的自由度，即这个假设空间能够产生多少Dichotomies的能力（VC维说的是，到什么时候，假设集合还能shatter，还能产生最多的Dichotomies）
- 假设空间的容量越大，VC维越大，那么模型就越难学习

### 基本概念

- [VC维来龙去脉](http://www.flickering.cn/machine_learning/2015/04/vc%E7%BB%B4%E7%9A%84%E6%9D%A5%E9%BE%99%E5%8E%BB%E8%84%89/)
- [如何通俗的理解机器学习中的VC维、shatter和break point？](https://www.zhihu.com/question/38607822/answer/149407083)
- 学习VC维要先知道的概念有：`增长函数`（growth function）、`对分`（dichotomy）、`打散`（shattering）和`断点`（break point）
  - 1.增长函数
    - 增长函数表示假设空间H对m个示例所能赋予标记的最大可能结果数。
    - 比如说现在数据集有两个数据点，考虑一种二分类的情况，可以将其分类成A或者B，则可能的值有：AA、AB、BA和BB，所以这里增长函数的值为4.
    - 增长函数值越大则假设空间H的表示能力越强，复杂度也越高，学习任务的适应能力越强。不过尽管H中可以有无穷多的假设h，但是增长函数却不是无穷大的：对于m个示例的数据集，最多只能有2^m个标记结果，而且很多情况下也达不到2^m的情况。
  - 2.对分
    - 对于二分类问题来说，H中的假设对D中m个示例赋予标记的每种可能结果称为对D的一种对分（dichotomy）。对分也是增长函数的一种上限。
  - 3.打散
    - 打散指的是假设空间H能实现数据集D上全部示例的对分，即增长函数=2^m。但是认识到不打散是什么则更加重要
  - 4. 断点
    - 假设空间H的VC维数就是最大的非break point值，也就是break point-1
  - Vapink-Chervonenkis Dimension
    - 引出VC维的定义了：假设空间H的VC维是能被H打散的最大的示例集（数据集）的大小
    - 或：
      - 对于一个假设空间H，如果存在m个数据样本能够被假设空间H中的函数按所有可能的2^h种形式分开 ，则称假设空间H能够把m个数据样本打散（shatter）。假设空间H的VC维就是能打散的最大数据样本数目m。若对任意数目的数据样本都有函数能将它们shatter，则假设空间H的VC维为无穷大

## [理解维度诅咒](https://blog.csdn.net/z13653662052/article/details/87936713)
- 原文[The Curse of Dimensionality in classification](http://www.visiondummy.com/2014/04/curse-dimensionality-affect-classification/)

### 介绍

在本文中，我们将讨论所谓的“维度诅咒”，并解释在设计分类器时它的重要性。在下面的章节中，我将提供这个概念的直观解释，由一个由于维数诅咒而过度拟合的明显例子说明。

考虑一个例子，其中我们有一组图像，每个图像描绘一只猫或一只狗。我们想创建一个能够自动区分狗和猫的分类器。为此，我们首先需要考虑可以用数字表示的每个对象类的描述符，这样数学算法（即分类器）可以使用这些数字来识别对象。例如，我们可以说猫和狗的颜色通常不同。区分这两个类的可能描述符可以由三个数组成; 正在考虑的图像的平均红色，平均绿色和平均蓝色。例如，一个简单的线性分类器可以线性地组合这些特征来决定类标签：

> If 0.5*red + 0.3*green + 0.2*blue > 0.6 : return cat;
> else return dog;

然而，这三种颜色描述数字，称为特征，显然不足以获得完美的分类。因此，我们可以决定添加一些描述图像纹理的特征，例如通过计算X和Y方向的平均边缘或梯度强度。我们现在有5个特征组合在一起，可以通过分类算法来区分猫和狗。

为了获得更准确的分类，我们可以根据颜色或纹理直方图，统计矩等添加更多功能。也许我们可以通过仔细定义几百个这些功能来获得完美的分类？这个问题的答案可能听起来有点违反直觉：不，我们不能！。事实上，在某一点之后，通过添加新功能来增加问题的维度实际上会降低分类器的性能。这由图1说明，并且通常被称为“维度的诅咒”。

![](http://www.visiondummy.com/wp-content/uploads/2014/04/dimensionality_vs_performance.png)

特征维度与分类器性能

图1.随着维度的增加，分类器的性能会提高，直到达到最佳要素数。进一步增加维度而不增加训练样本的数量导致分类器性能的降低。

在接下来的部分中，我们将回顾上述原因是什么，以及如何避免维度的诅咒。

### 维度和过度拟合的诅咒
在早先介绍的猫和狗的例子中，我们假设有无数的猫和狗生活在我们的星球上。然而，由于我们有限的时间和处理能力，我们只能获得10张猫狗照片。然后，分类的最终目标是基于这10个训练实例训练分类器，该分类器能够正确地分类我们不了解的无限数量的狗和猫实例。

现在让我们使用一个简单的线性分类器，并尝试获得一个完美的分类。我们可以从一个特征开始，例如图像中的平均“红色”颜色：

![](http://www.visiondummy.com/wp-content/uploads/2014/04/1Dproblem.png)

一维分类问题，图2.单个功能不会导致我们的训练数据完美区分。

图2显示，如果仅使用单个特征，则无法获得完美的分类结果。因此，我们可能决定添加另一个特征，例如图像中的平均“绿色”颜色：

![](http://www.visiondummy.com/wp-content/uploads/2014/04/2Dproblem.png)

二维分类问题

图3.添加第二个特征仍然不会导致线性可分的分类问题：在此示例中，没有一条线可以将所有猫与所有狗分开。

最后，我们决定添加第三个特征，例如图像中的平均“蓝色”颜色，从而产生三维特征空间：

![](http://www.visiondummy.com/wp-content/uploads/2014/04/3Dproblem.png)

3D分类问题

图4.在我们的示例中，添加第三个特征会导致线性可分的分类问题。存在一种将狗与猫完美分开的平面。

在三维特征空间中，我们现在可以找到一个完美地将狗与猫分开的平面。这意味着可以使用这三个特征的线性组合来获得10幅图像的训练数据的完美分类结果：

![](http://www.visiondummy.com/wp-content/uploads/2014/04/3Dproblem_separated.png)

线性可分的分类问题

图5.我们使用的特征越多，我们成功区分类的可能性就越高。

上面的插图似乎表明，在获得完美的分类结果之前增加特征的数量是训练分类器的最佳方式，而在引言中，如图1所示，我们认为情况并非如此。但是，请注意当我们增加问题的维数时，训练样本的密度如何呈指数下降。

在1D情况下（图2），10个训练实例覆盖了完整的1D特征空间，其宽度为5个单位间隔。因此，在1D情况下，样品密度为10/5 = 2个样品/间隔。然而，在二维情况下（图3），我们仍然有10个训练实例，现在覆盖了一个面积为5×5 = 25个单位正方形的2D特征空间。因此，在2D情况下，样品密度为10/25 = 0.4个样品/间隔。最后，在3D情况下，10个样本必须覆盖5x5x5 = 125个单位立方体的特征空间体积。因此，在3D情况下，样品密度为10/125 = 0.08个样品/间隔。

如果我们继续添加特征，则特征空间的维度会增长，并变得更稀疏和稀疏。由于这种稀疏性，找到可分离的超平面变得更加容易，因为当特征的数量变得无限大时，训练样本位于最佳超平面的错误侧的可能性变得无限小。但是，如果我们将高维分类结果投影回较低维空间，则与此方法相关的严重问题变得明显：

![](http://www.visiondummy.com/wp-content/uploads/2014/04/overfitting.png)

过度拟合

图6.使用太多特征会导致过度拟合。分类器开始学习特定于训练数据的异常，并且在遇到新数据时不能很好地概括。

图6显示了投影到2D特征空间的3D分类结果。尽管数据在3D空间中是线性可分的，但在较低维度的特征空间中却不是这种情况。实际上，添加第三维以获得完美的分类结果，简单地对应于在较低维特征空间中使用复杂的非线性分类器。因此，分类器学习我们的训练数据集的特例和异常。因此，生成的分类器将在真实世界数据上失败，包括通常不遵守这些异常的无限量的看不见的猫和狗。

这个概念被称为过度拟合，是维度诅咒的直接结果。图7显示了仅使用2个特征而不是3个特征训练的线性分类器的结果：

![](http://www.visiondummy.com/wp-content/uploads/2014/04/no_overfitting.png)

线性分类器,图7.尽管训练数据未被完美分类，但该分类器在看不见的数据上比图5中的数据获得更好的结果。

虽然图7中显示的具有决策边界的简单线性分类器似乎比图5中的非线性分类器表现更差，但是这个简单的分类器更好地概括了看不见的数据，因为它没有学习仅在我们的训练数据中的特定异常。巧合。换句话说，通过使用较少的特征，避免了维数的诅咒，使得分类器不会过度拟合训练数据。

下面的解释非常经典

图8以不同的方式说明了上述内容。假设我们想要仅使用一个值为0到1的单个特征来训练分类器。让我们假设这个特征对于每只猫和狗都是唯一的。如果我们希望我们的训练数据覆盖此范围的20％，那么所需的训练数据量将占整个猫狗数量的20％。现在，如果我们添加另一个特征，生成2D特征空间，事情会发生变化; 为了覆盖20％的2D特征范围，我们现在需要在每个维度中获得猫和狗总数的45％（0.45 ^ 2 = 0.2）。在3D情况下，这变得更糟：要覆盖20％的3D特征范围，我们需要在每个维度中获得总数的58％（0.58 ^ 3 = 0.2）。

![](http://www.visiondummy.com/wp-content/uploads/2014/04/curseofdimensionality.png)

训练数据量随着维度的数量呈指数增长

图8.覆盖20％特征范围所需的训练数据量随着维度的数量呈指数增长。

换句话说，如果可用的训练数据量是固定的，那么如果我们继续添加维度就会发生过度拟合。另一方面，如果我们不断增加维度，训练数据量需要以指数级增长，以保持相同的覆盖范围并避免过度拟合。

在上面的例子中，我们展示了维度的诅咒引入了训练数据的稀疏性。我们使用的特征越多，数据就越稀疏，因此准确估计分类器的参数（即其决策边界）变得更加困难。维度诅咒的另一个影响是，这种稀疏性不是均匀分布在搜索空间上。实际上，原点周围的数据（在超立方体的中心）比搜索空间的角落中的数据要稀疏得多。这可以理解如下：

想象一个代表2D特征空间的单位正方形。特征空间的平均值是该单位正方形的中心，距离该中心单位距离内的所有点都在一个单位圆内，该单位圆内接单位正方形。不属于该单位圆的训练样本更靠近搜索空间的角落而不是其中心。这些样本难以分类，因为它们的特征值差异很大（例如，单位正方形的相对角上的样本）。因此，如果大多数样本落在内接单位圆内，则分类更容易，如图9所示：

![](http://www.visiondummy.com/wp-content/uploads/2014/04/inscribed_circle.png)

单位距离平均单位圆内的特征

图9.位于单位圆外的训练样本位于特征空间的角落，并且比特征空间中心附近的样本更难分类。

现在一个有趣的问题是，当我们增加特征空间的维数时，圆（超球面）的体积如何相对于正方形（超立方体）的体积发生变化。尺寸d的单位超立方体的体积总是1 ^ d = 1. 尺寸d和半径0.5 的内切超球体的体积可以计算为：

![](http://www.visiondummy.com/wp-content/ql-cache/quicklatex.com-3472e58fe7837e68dc4f98a8516cc5bc_l3.png)

（1） $$ \ begin {equation *} V（d）= \ frac {\ pi ^ {d / 2}} {\ Gamma（\ frac {d} {2} + 1）} 0.5 ^ d。 \ {端方程*} $$

图10显示了当维度增加时，这个超球体的体积如何变化：
![](http://www.visiondummy.com/wp-content/uploads/2014/04/hypersphere.png)
随着维度的增加，超球体的体积趋向于零

图10.随着维数的增加，超球面的体积趋向于零。

则
![](https://img-blog.csdnimg.cn/20190226160056763.png)

这表明，当维数趋于无穷大时，超球体的体积倾向于零，而周围超立方体的体积保持不变。这种令人惊讶且相当反直觉的观察部分地解释了与分类中的维度诅咒相关的问题：在高维空间中，大多数训练数据驻留在定义特征空间的超立方体的角落中。如前所述，特征空间角落中的实例比超球面质心周围的实例更难分类。这由图11示出，其示出了2D单位正方形，3D单位立方体以及具有2 ^ 8 = 256个角的8D超立方体的创造性可视化：

![](http://www.visiondummy.com/wp-content/uploads/2014/04/sparseness.png)

高维特征空间在其原点周围稀疏

图11.随着维度的增加，更大比例的训练数据驻留在要素空间的角落中。

对于8维超立方体，大约98％的数据集中在其256个角上。因此，当特征空间的维数变为无穷大时，从样本点到质心的最小和最大欧几里得距离的差值与最小距离本身的比率趋向于零：

![](http://www.visiondummy.com/wp-content/ql-cache/quicklatex.com-7ffb60f75669300ffbcf8768471ca99d_l3.png)

$$ \ begin {equation *} \ lim_ {d \ to \ infty} \ frac {\ operatorname {dist} _ {\ _max}  -  \ operatorname {dist} _ {\ min}} {\ operatorname {dist} _ {\ min }到\ 0 \ end {equation *} $$

因此，距离测量开始失去其在高维空间中测量不相似性的有效性。由于分类器依赖于这些距离测量（例如欧几里德距离，马哈拉诺比斯距离，曼哈顿距离），因此在较低维空间中分类通常更容易，其中较少特征用于描述感兴趣对象。类似地，高斯似然性在高维空间中变为平坦且重尾的分布，使得最小和最大似然之间的差异与最小似然本身的比率趋于零。

### 如何避免维数的诅咒？

图1显示，当问题的维数变得太大时，分类器的性能会降低。那么问题是“太大”意味着什么，以及如何避免过度拟合。遗憾的是，没有固定的规则来定义在分类问题中应该使用多少特征。实际上，这取决于可用的训练数据量（特征的数量和样本数量有关），决策边界的复杂性以及所使用的分类器的类型。

如果理论无限数量的训练样本可用，则维度的诅咒不适用，我们可以简单地使用无数个特征来获得完美的分类。训练数据的大小越小，应使用的特征越少。如果N个训练样本足以覆盖单位区间大小的1D特征空间，则需要N ^ 2个样本来覆盖具有相同密度的2D特征空间，并且在3D特征空间中需要N ^ 3个样本。换句话说，所需的训练实例数量随着使用的维度数量呈指数增长。

此外，倾向于非常准确地模拟非线性决策边界的分类器（例如，神经网络，KNN分类器，决策树）不能很好地推广并且易于过度拟合。因此，当使用这些分类器时，维度应该保持相对较低。如果使用易于推广的分类器（例如朴素贝叶斯线性分类器），那么所使用的特征的数量可以更高，因为分类器本身不那么具有表现力（less expressive）。图6显示在高维空间中使用简单分类器模型对应于在较低维空间中使用复杂分类器模型。

因此，当在高维空间中估计相对较少的参数时，以及在较低维空间中估计大量参数时，都会发生过度拟合。例如，考虑[高斯密度函数](http://www.visiondummy.com/2014/03/divide-variance-n-1/)，由其均值和协方差矩阵参数化。假设我们在3D空间中操作，使得协方差矩阵是由3个独特元素组成的3×3对称矩阵（对角线上的3个方差和非对角线上的3个协方差）。与分布的三维均值一起，这意味着我们需要根据训练数据估计9个参数，以获得表示数据可能性的高斯密度。在1D情况下，仅需要估计2个参数（均值和方差），而在2D情况下需要5个参数（2D均值，两个方差和协方差）。我们再次可以看到，要估计的参数数量随着维度的数量而增长。

在[前面的文章](http://www.visiondummy.com/2014/03/divide-variance-n-1/)中，我们表明，如果要估计的参数数量增加（并且如果估计的偏差和训练数据的数量保持不变），参数估计的方差会增加。这意味着，由于方差的增加，如果维数上升，我们的参数估计的质量会降低。分类器方差的增加对应于过度拟合。

另一个有趣的问题是应该使用哪些特征。给定一组N个特征; 我们如何选择M个特征的最佳子集，使得M < N？一种方法是在图1所示的曲线中搜索最优值。由于为所有特征的所有可能组合训练和测试分类器通常是难以处理的，因此存在几种尝试以不同方式找到该最佳值的方法。这些方法称为特征选择算法，并且通常采用启发式（贪婪方法，最佳优先方法等）来定位最佳数量和特征组合。

另一种方法是用一组M个特征替换N个特征的集合，每个特征是原始特征值的组合。试图找到原始特征的最佳线性或非线性组合以减少最终问题的维度的算法称为特征提取方法。一种众所周知的降维技术是[主成分分析](http://www.visiondummy.com/2014/05/feature-extraction-using-pca/)（PCA），它产生原始N特征的不相关的线性组合。PCA试图找到较低维度的线性子空间，以便保持原始数据的最大方差。但是，请注意，数据的最大差异不一定代表最具辨别力的信息。

最后，在分类器训练期间用于检测和避免过度拟合的宝贵技术是交叉验证。交叉验证方法将原始训练数据分成一个或多个训练子集。在分类器训练期间，一个子集用于测试所得分类器的准确度和精度，而其他子集用于参数估计。如果用于训练的子集的分类结果与用于测试的子集的结果大不相同，则过度拟合正在发挥作用。如果只有有限数量的训练数据可用，则可以使用几种类型的交叉验证，例如k折交叉验证和留一交叉验证。

![](https://upload.wikimedia.org/wikipedia/commons/1/1c/K-fold_cross_validation_EN.jpg)

Diagram of k-fold cross-validation with k=4

### 结论

在本文中，我们讨论了特征选择，特征提取和交叉验证的重要性，以避免由于维度的诅咒而过度拟合。通过一个简单的例子，我们回顾了维度诅咒在分类器训练中的重要影响，即过度拟合。





## 资料



# 结束


