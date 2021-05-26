---
layout: post
title:  "特征工程-Fearture Engineering"
date:   2020-04-26 21:50:00
categories: 机器学习
tags: 深度学习 特征工程 tensorflow
excerpt: 特征工程点点滴滴，及scikit-learn实现
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

江湖名言：<font color=’red’ size=5 face=”黑体”>数据和特征决定了机器学习的上限，而模型和算法只是逼近这个上限而已</font>

![](http://images2015.cnblogs.com/blog/927391/201606/927391-20160628112051062-1290708859.jpg)




## 参考资料

- 知乎：[特征工程到底是什么](https://www.zhihu.com/question/29316149)
- [使用sklearn做特征工程](http://www.cnblogs.com/jasonfreak/p/5448385.html)
- [使用python进行描述性统计](http://www.cnblogs.com/jasonfreak/p/5441512.html)
- [使用sklearn优雅的进行数据挖掘](http://www.cnblogs.com/jasonfreak/p/5448462.html)
- 使用sklearn进行集成学习:[理论](http://www.cnblogs.com/jasonfreak/p/5657196.html),[实践](http://www.cnblogs.com/jasonfreak/p/5720137.html)
- 【2021-1-2】[Amazing-Feature-Engineering](https://github.com/ashishpatel26/Amazing-Feature-Engineering)，特征工程和特征选择代码实战（包含多个notebook）
  - A Short Guide for Feature Engineering and Feature Selection
Feature engineering and selection is the art/science of converting data to the best way possible, which involve an elegant blend of domain expertise, intuition and mathematics. This guide is a concise reference for beginners with most simple yet widely used techniques for feature engineering and selection. Any comments and commits are most welcome.
- 【2021-5-27】[推理性能提升一倍，TensorFlow Feature Column 性能优化实践](https://blog.csdn.net/weixin_38753262/article/details/116810950)，在 CTR(Click Through Rate) 点击率预估的推荐算法场景，TensorFlow Feature Column 被广泛应用到实践中。这一方面带来了模型特征处理的便利，另一方面也带来了一些线上推理服务的性能问题。
- ![](https://img-blog.csdnimg.cn/img_convert/cf98e84681aaacadc02f7023fe966c2e.png)
- Feature Column 是 TensorFlow 提供的用于处理结构化数据的工具，是将样本特征映射到用于训练模型特征的桥梁。它提供了多种特征处理方法，让算法人员可以很容易将各种原始特征转换为模型的输入，来进行模型实验。
- 所有 Feature Column 都源自 FeatureColumn 类，并继承了三个子类 CategoricalColumn、DenseColumn 和 SequenceDenseColumn，分别对应稀疏特征、稠密特征、序列稠密特征。算法人员可以按照样本特征的类型找到对应的接口直接适配。
- ![](https://img-blog.csdnimg.cn/img_convert/779703f3920ecde96972cd2f1614417d.png)


# 实践


## Tensorflow feature column用法

### 背景介绍

Feature Column是TensorFlow提供的用于处理结构化数据的工具，是将样本特征映射到用于训练模型特征的桥梁。它提供了多种特征处理方法，让算法人员可以很容易将各种原始特征转换为模型的输入，来进行模型实验。

![](https://img-blog.csdnimg.cn/img_convert/cf98e84681aaacadc02f7023fe966c2e.png)

如上图所示，所有Feature Column都源自FeatureColumn类，并继承了三个子类CategoricalColumn、DenseColumn和SequenceDenseColumn，分别对应稀疏特征、稠密特征、序列稠密特征。算法人员可以按照样本特征的类型找到对应的接口直接适配。

而且 Feature Column 和 TF Estimator 接口有很好的集成，通过定义好对应的特征输入就可以直接在预定义的 Estimator 模型中使用。TF Estimator 在推荐算法的使用非常普遍，特别是它封装了分布式训练的功能。
 
下图是一个使用Feature Column处理特征，进入到 Estimator DNN Classifier的示例：

![](https://img-blog.csdnimg.cn/img_convert/779703f3920ecde96972cd2f1614417d.png)
 
虽然Feature Column使用起来很方便，模型代码编写比较快，但是在爱奇艺推荐类业务的线上服务落地过程中，一些性能问题逐渐凸显，下面将逐个介绍我们在实际中碰到的一些问题，以及如何优化。
 
### 整型特征哈希优化
 
推荐类模型通常都会将ID类特征哈希到一定数量的bucket 分桶，然后转换成 Embedding再作为神经网络的输入，比如视频类ID特征，用户ID特征，商品ID特征等。示例如下：

![](https://img-blog.csdnimg.cn/img_convert/071c506b4a5179d6fbd7bb2bf3f1afc1.png)
 
在` categorical\_column\_with\_hash\_bucket `的文档\[2\]里面说到：对于String类型的输入，会执行\`output\_id = Hash(input\_feature\_string) % bucket\_size\`做哈希操作，而对于整数类型的输入会先转成String类型然后再进行同样的哈希操作。通过查看源代码\[3\]可以看到这样的逻辑：
![](https://img-blog.csdnimg.cn/img_convert/3799b20a61c2d96ae0ea98eefec50f97.png)

在推荐业务中，通常这类ID都是已经过某种方式的哈希，形成64bit的整型特征放到样本里面，因此必然要执行整型转化成String的操作。但是在TensorFlow 的 Timeline中可以看到函数\`as_string\`所对应的TF内部的\`AsString\` OP其实是一个比较耗时的操作，经过分析对比发现\`AsString\` OP的耗时通常是后面的哈希操作的3倍以上，如下图所示：
![](https://img-blog.csdnimg.cn/img_convert/5ba899ac18ae4164521bd87380441b26.png)
 
进一步分析\`AsString\` OP内部的代码，可以发现这个OP内部还涉及到了内存分配和拷贝操作，因此比纯哈希计算慢就可以理解了。
 
很自然，团队考虑去掉相关操作来做优化，因此专门编写了一个给整型做哈希的函数来做优化，示例代码如下：
![](https://img-blog.csdnimg.cn/img_convert/df002c80ea3fe3ddd368dc41a7f87f04.png)
 
经过这样做区分类型的哈希方式，完全优化了原先耗时长的类型转换操作。这里需要注意的是新加的哈希函数对应的新OP同样需要加到 TF Serving 中。

### 定长特征转换优化

定长特征是指使用接口\`tf.io.FixedLenFeature\`来解析的特征，比如用户的性别，年龄等，这类特征的长度通常都是定长的，并且固定为 1 维或多维。这类特征经过接口\`tf.io.parse_example\` 解析成 Dense Tensor，然后经过Feature Column处理，再进入到模型的输入层。常见的代码示例如下：

![](https://img-blog.csdnimg.cn/img_convert/f9ffd1309fe16b22e3f8b320aa0d0243.png)

以上面的代码为例子，举例解析一下 TensorFlow 内部的Tensor 转换逻辑。如下图所示，两个样本user\_name分别为bob和wanda，经过样本解析成shape为2的Dense Tensor，然后经过\`categorical\_column\_with\_vocabulary\_list\`转换，查找词表分别转成0和2，再经过\`indicator\_column\`转换成One hot编码的Dense输入。

![](https://img-blog.csdnimg.cn/img_convert/94341e5e7d231ab28218a7b083d437bb.png)

从上面的样本处理来看没有什么问题，然后再来看一下Feature Column代码内部的转换处理逻辑：

![](https://img-blog.csdnimg.cn/img_convert/793a8133d744cab5cd66b016632259ab.png)
 
如上图所示，在代码中Vocabulary Categorical Column 会先去除掉一些非法值，然后把输入的Dense Tensor 转换成 Sparse Tensor，在Indicator Column中会再次把Tensor从Sparse转成Dense，最后转成需要的One Hot Tensor。

先来思考一下上面两个转换操作的目的，一方面是为了去除样本数据中一些异常的值，另外一方面是这样的处理其实是同时兼顾了输入是 Sparse Tensor 的情况，如果输入是Spare Tensor就直接做Vocabulary词表查找，然后再转成Dense Tensor。这样转换虽然达到代码复用的作用，但是在性能上却有损失。如果能直接将原始的Input Tensor转换成One Hot Tensor，就可以省去两个转换过程，而且Sparse Tensor 和Dense Tensor之间的转换其实是非常耗时的操作。

再回到定长特征的原始性质，对于这类定长特征来讲，在样本处理的时候如果没有值，会被填充成默认值，而且在生成样本的时候都会被保证不会出现有空值或者 -1的情况，因此异常值的处理其实是可以被省略的。最后优化后的内部转换逻辑如下图，省去了两次Sparse Tensor 和Dense Tensor之间的转换。
 
![](https://img-blog.csdnimg.cn/img_convert/e224560dfd379964f61d0a14471c4679.png)
 
除了上面的Vocabulary Categorical Column，还有别的类似Feature Column也有同样的问题，因此针对这类特征，平台专门开发了一套优化的Feature Column接口提供给业务使用，优化性能效果还不错。
 
### 用户特征去重优化

推荐类算法模型都有个很典型的特点，那就是模型中会包含用户侧特征和要推荐的Item侧特征，比如视频的特征、商品的特征等。模型在线上服务部署的时候，会给一个用户推荐多个视频或商品，模型会返回这多个视频或商品的打分，然后按照打分的大小推荐给用户。由于是给单个用户做推荐，这个时候该用户的特征会根据推荐Item的数量重复多次，再发送给模型。如下是一个典型的推荐算法排序模型线上推理的示意图：

![](https://img-blog.csdnimg.cn/img_convert/3fa70304f95043d8a701cccd69ccf0fd.png)

图示的模型输入有3个User特征，3个Item特征，假定在对某个用户做推荐，该用户的3个特征分别对应为u1，u2和u3。这时要对两个不同的Item做推荐评分请求，也就是一个请求里面有两个Item，这两个Item分别为I1和I2，这两个Item分别有三个特征，I1对应I11，I12，I13，以此类推，这样构成一个batch size为2的推理请求。从图中可以看到，因为是给同一个用户推荐两个不同的Item，Item侧的特征是不同的，但是用户的特征被重复了两次。
 
上面的例子只以2个Item为例，但是实际线上的服务一个推理请求会带100个Item甚至更多，因此用户的特征也会被重复100次甚至更多，重复的用户特征不仅增加了传输的带宽，而且增加了特征处理时的计算量，因此业务非常希望能解决这个问题。
 
这个问题的本源要从TensorFlow 的模型训练代码说起。TensorFlow 训练时的每一条样本是某个用户对某个Item的行为，然后经过shuffle和batch后进入到训练模型，这时候一个batch里面的数据肯定包含了多个用户行为的样本，这个和线上推理服务的输入数据格式是完全不同的。
 
如何解决这个问题？最简单的想法，如果在线上服务就只发送一条用户特征会怎么样？快速的尝试就可以知道特征数据进入到模型输入层的时候会 concat失败。这是因为Item特征的batch size是多个，而用户特征的batch size只有1，示例如下：
 
![](https://img-blog.csdnimg.cn/img_convert/53ad9dabb0db1d2e8cf02997f324662b.png)
 
为了解决concat失败的问题，单纯先从模型的角度来看，可以考虑在进入到输入层之前把用户特征还原到和Item特征同样的batch size，如下图所示。

![](https://img-blog.csdnimg.cn/img_convert/9be29f5066865a63468a5141918f85e9.png)
 
显然这个从数学模型上是可行的，接下来就是怎么在TensorFlow 的代码里面实现这个想法。这里需要注意的是复制的操作只能在线上服务的模型里面，不能在训练的模型里面。
 
目前TF Estimator 接口在推荐类算法的应用比较常见，而Estimator 接口提供了很好的模型区分方法，通过判断ModeKeys为\`tf.estimator.ModeKeys.PREDICT\`时是线上的服务模型，ModeKeys为\`tf.estimator.ModeKeys.TRAIN\`时是训练模型，下面是示例代码：
 
![](https://img-blog.csdnimg.cn/img_convert/88ea882ae235d4a45ccdd4781cad0851.png)
 
在实际的模型上，需要将User和Item的feature column区分开来分别传入，这个对原来的模型代码改动比较大，batch size的获取可以通过判断Item特征的长度来获取，这里不再赘述。

在实际的上线过程中，团队经历了两个阶段，第一个阶段是只对算法模型代码做修改，在处理用户特征时只取第一维，但是实际发送的推理请求还是会把用户特征重复多次；第二个阶段才把发送的推荐请求优化成只发送一份用户特征，这个时候模型代码不需要再做修改，已经自动适配。
 
![](https://img-blog.csdnimg.cn/img_convert/937ea89e460503042d68894f7357088b.png)
 
如上图所示，第一阶段的时候用户特征的输入还是重复多次，在模型中，对用户特征只取第一维再进行特征处理，示例代码如下：
![](https://img-blog.csdnimg.cn/img_convert/7797f8f9cf1abf87ca21128ae10a52c3.png)
 
上面的模型代码可以同时适配推理请求发送重复的用户特征，或者只发送一条用户特征。因此在第二阶段的时候，不需要再修改模型代码，只需要优化发送推理请求的引擎侧代码。
 
经过这样的优化，线上推理服务不需要重复发送用户特征，不仅节约了带宽，而且减少了序列化的消耗。对一个 batch 中的用户特征只做一份数据的Feature Column转换，然后做复制操作，复制消耗的时间远远小于转换的时间。

这里其实还可以做进一步的优化，将复制操作延后到第一层神经网络的矩阵乘后面，这样可以减少第一个矩阵乘的部分计算消耗。如果用户特征的维度占比比较高，优化的效果会比较明显。
 


# 结束


