---
layout: post
title:  "算法模型部署-Model Serving"
date:   2020-08-04 16:52:00
categories: 机器学习 技术工具
tags: Tensorflow Web gRPC Restful 服务部署 HTTP
excerpt: 如何将算法模型部署到线上？有哪些方法、工具及经验？
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

- 由于python的灵活性和完备的生态库，使得其成为实现、验证ML算法的不二之选。但是工业界要将模型部署到生产环境上，需要考略性能问题，就不建议再使用python端的服务
- 可以采用 Saver (python) + Serving (tensorflow serving) + Client (Java) 作为解决方案，从零开始记录线上模型部署流程。


# 机器学习模型生命周期

- 从训练到部署的整个流程
    - ![](https://img2020.cnblogs.com/blog/963156/202004/963156-20200424165332708-1843237557.png)
- 基本可以把工作分为三块：
    - **Saver端**：将训练好的整个模型导出为一系列标准格式的文件，在不同的平台上部署模型文件。
        - TensorFlow 使用 SavedModel（pb文件） 这一格式用于模型部署。
        - 与Checkpoint 不同，SavedModel 包含了一个 TensorFlow 程序的完整信息： **不仅包含参数的权值，还包含计算图**。
        - SavedModel最终保存结果包含两部分saved_model.pb和variables文件夹。
    - **Serving端**：模型加载与在线预测
    - **Client端**：构建请求

## 深度学习模型部署问题

- 【2021-5-6】[「AI大咖谈」FLAG资深工程师谈ML Infra和分布式模型服务](https://zhuanlan.zhihu.com/p/360007940)
- 深度学习在业界的应用进入一个全新的阶段，**复杂模型的结构红利正在被吃尽，深度学习模型和工程架构的协同演进正在成为新的效果增长极**。国内外的巨头互联网公司在分布式深度学习框架，线上大规模模型服务领域可以说优势颇大，有时候也略显神秘。
- 新同学往往不喜欢也不屑于做所谓的dirty work，但本质上来说，**工业界的机器学习问题几乎全都是dirty work**，不存在什么训练一个模型，创新一个模型结构就交给其他人的事情，你说的根本不是新人，而是老板。

问题：
- ①模型漂移：运行一段时间后，效果逐步下滑，如何做到自动更新模型？
- ②自动降级：资源有限，根据不同的qps压力，适配不同版本的模型

### 算法与工程合作

- Infra/ML engineer与data scientist/researcher们的合作中最显著的一个特点是**大家在不同的抽象层面思考问题**，有些看起来有一定创新性的模型结构调整其实在产品化、工程化的道路上困难重重。
  - 比如最近关注的一个项目，offline training的时候发现效果很好，模型CTR的提升非常显著，但是在推进到生产环境阶段时，会发现90%的剩余工作都是infra方面。
  - 比如如何处理模型变大之后offline training阶段的各种限制，典型的像模型**推断时间过长**，**内存占用过多**，online training如何**避免数据丢失**，并且能以合理的速度更新，inference阶段如何在不显著增加系统开销的前提下顺利满足所有的在线推理要求（比如实时特征的准备）等等。
- 一个模型在离线效果上验证有收益只是第一步，甚至是比较小的第一步，尤其是在模型规模、复杂度显著增加的基础上，模型效果上的收益扣除Infra上的开销之后，实际还剩多少收益是要打一个问号的。在第一步之后，剩下的路肯定会有很多infra上的限制要去处理。所以，从我的角度来说，无论是Infra engineer，还是researcher们，都要加深对对方领域的理解，只有一个人对这些可能的问题越熟悉越了解，也就越能增加自己的模型落地的可能。

总结
- 无论是Infra engineer，还是researcher们，都要加深对对方领域的理解，只有一个人对这些可能的问题越熟悉越了解，也就越能增加自己的模型落地的可能
- 有些看起来有一定创新性的模型结构调整其实在产品化、工程化的道路上困难重重，所以在构建模型的时候，也要提前充分考虑工程化的关键问题
- 实现庞大模型线上服务最可行的手段就是选择在Embedding层进行拆解。因为模型大小完全由Embedding size主导。
- 在分布式inference的过程中，我们首先要关心的就是节点间的通信开销问题
- 在分布式inference的过程中，尽量从模型中拆解出可以并行的部分
- 巨大Embedding table的sharding和replication策略是需要精确设计的
- 当模型足够复杂之后，一个最有效的办法其实是返璞归真到模型本身：你能直接或者间接支持起更多的 feature，用更大的 embedding，用更多的参数，一样的模- 型效果就会显著 out-perform 现有的，于是 ML 的问题其实就又变成了一个 infra 问题。
- embedding 模型 incremental checkpointing 效率上会比全量更新高效很多，是一个极有价值的方向

### 模型结构 vs ML infra哪个更重要？

分阶段：
- 早期，数据量不够时，各种传统ML算法可以取得不错的效果，而使用神经网络只在数据量和 infra 到了一定程度之后才会有明显效果
  - **传统机器学习**模型 → **简单深度学习**模型 → **大规模深度学习**模型
- 当模型足够复杂之后，一个最有效的办法其实是回到模型本身：你能直接/间接支持起更多的feature，用更大的embedding，用更多的参数，一样的模型效果就会显著 out-perform 现有的模型，于是 ML 的问题其实就又变成了一个 infra 问题。

### 模型更新

Embedding 模型 incremental checkpointing 效率上会比全量更新高效很多。

全量更新？增量训练？如何做版本控制？

### 如何部署大模型

深度学习中典型的有sparse feature的ads/recommendation model。这类模型的特点就是参数量巨大，单机内存放不下，自然也就无法做推断。这个时候如你所问，我们就必须进行模型的拆解，而且最可行的手段就是选择在Embedding层进行拆解。因为模型大小完全由Embedding size主导（后续的MLP等结构的参数量级远小于Embedding层）。

针对Embedding，可以通过sharding和partitioning（分表、分片）等手段把一个完整的推断过程从单节点的执行过程拆解成单节点推断主过程+多RPC call分布式Embedding查找过程。

具体来说，这里会有一个单节点做End2End的推理执行，包括最开始的特征准备、预处理以及最后几层FC layers的矩阵运算，但是中间的Embedding查找以及相关运算因为内存原因就没法在单节点上完成，但是可以通过blocking RPC call来和几个专门存放embedding 的service或者数据库做交互，这样一个完整的推断过程就可以在多个节点上分开运行。

### 分布式inference

当模型体积大到一定程度的时候，就无法通过单机进行预测，这时候就得靠分布式inference了

首先要关心**节点间的通信开销问题**（Communication overhead）。 
- 单机的推断其实是有非常好的性质的，比如具备着极致的执行效率，良好的服务接口的特性，像便于 replication（复制）, load balancing（负载平衡）; 而拆解到多个分布式的模块之后，每个模块内部的串并联解耦、不同模块之间的通信开销，根据我们的观察会占到很大比重，这是非常值得优化的方向。
- 但总的原则是固定的，就是尽量从模型中拆解出可以并行的部分（比如最后的MLP部分就很难并行化，那么就完全在单节点内完成，但是Embedding的部分，模型中可以并行化的部分，独立的特征生成的部分，都可以拆解成不同的服务模块）。在这个拆解的过程中，还要尽量去减少模块间的通信总次数，所以这个过程是一个非常细致，非常考验基本功的地方。
![](https://pic4.zhimg.com/80/v2-5b724719d77ccd69f43868be2708193b_720w.jpg)

### Embedding

聚焦到Embedding部分来说，如何把一个巨大的embedding table分配到不同的服务模块是很讲究策略的，会对最终的整个推断效率产生非常大的影响。讲一个简单的例子，比如说有一个embedding table，有10台参数服务器，如果把这个embedding table拆成十份，分配给10台参数服务器，好处当然是每台服务器上的embedding规模只是1/10。但坏处是如果有一个average pooling的操作，要查找10次embedding，那么很有可能我们要向不同参数服务器节点发出多次请求，才能最终在主推断节点完成average pooling的操作。

但是如果我们采用replication的策略，把这个embedding table全量的分配到10个参数服务器，那么在参数服务器内部就可以完成average pooling的操作，通信一次就可以了。这对于节省整个网络的通信开销贡献是巨大的。当然了，这个策略浪费了宝贵的服务器内存资源。

类似sharding和replication的权衡在Embedding规模变得更大之后会变得更加复杂，我们往往需要更加复杂的策略才能找到一个平衡通信开销和系统内存开销的平衡点。
![](https://pic2.zhimg.com/80/v2-9a0a98ac42aa5f7599ef1aacc6c21af9_720w.jpg)

Embedding store
- 生产环境中最主要的方式还是去做**全量更新**。比如一个模型通过fully training/incremental training/online training得到一个新的模型，那么由于相应的embedding层结构会发生变化，那么还是会走完全部的模型压缩、发布流程生成一个全新的snapshot，然后让已经比较成熟的线上环境自主去发现、载入、进而使用新的snapshot进行推断。
- 当然国内有几家公司其实在这方面走的更靠前一些，比如做Embedding的增量更新。实际上同一个模型两个 snapshot 之间 embedding 的更新比例并不会特别高（大家可以思考一下哪些情况下某个id对应的embedding才会更新），因此实验和部署 incremental checkpointing 就会是一个很有意义的方向，尤其是模型大小越来越大的情况。

# Tensorflow Serving

## 服务框架

- Google在2017年的TensorFlow开发者Summit上便提出了TensorFlow Serving [官方文档](https://www.tensorflow.org/serving/)。可以将训练好的模型直接上线并提供服务。
    - [TensorFlow Serving入门](https://www.jianshu.com/p/afe80b2ed7f0)
- 客户端和服务端的通信只支持gRPC。在实际的生产环境中比较广泛使用的C/S通信手段是基于RESTfull API的，幸运的是从TF1.8以后，TF Serving也正式支持RESTfull API通信方式了。
- ![](https://upload-images.jianshu.io/upload_images/4905018-913e07a93c4821ee.png)

## TF Serving工作流程

- 基于TF Serving的持续集成框架还是挺简明的，基本分三个步骤：
    - 模型训练：主要包括数据的收集和清洗、模型的训练、评测和优化；
    - 模型上线：前一个步骤训练好的模型在TF Server中上线；
    - 服务使用：客户端通过gRPC和RESTfull API两种方式同TF Servering端进行通信，并获取服务；
- TF Serving的工作流程主要分为以下几个步骤：
    - Source会针对需要进行加载的模型创建一个Loader，Loader中会包含要加载模型的全部信息；
    - Source通知Manager有新的模型需要进行加载；
    - Manager通过版本管理策略（Version Policy）来确定哪些模型需要被下架，哪些模型需要被加载；
    - Manger在确认需要加载的模型符合加载策略，便通知Loader来加载最新的模型；
    - 客户端像服务端请求模型结果时，可以指定模型的版本，也可以使用最新模型的结果；
- 示意图
    - ![](https://upload-images.jianshu.io/upload_images/4905018-560bf34c3a9e5aca.png)

## 调用方式

- TF Serving客户端和服务端的通信方式有两种（gRPC和RESTfull API）
    - （1）RESTfull API
    - （2）gRPC形式



## Saver

- 分别介绍，Tensorflow 1.0 和 2.0两个版本的导出方法

### Tensorflow 1.0 export

- 两件事：
    - Step 1、创建 [SignatureDefs](https://github.com/tensorflow/serving/blob/master/tensorflow_serving/g3doc/signature_defs.md)
    - Step 2、保存计算图和权重
- 代码：[参考链接](https://github.com/tensorflow/tensorflow/blob/master/tensorflow/python/saved_model/README.md)

```python
builder = tf.saved_model.builder.SavedModelBuilder("out_dir")

# define signature which specify input and out nodes
predict_sig_def = (saved_model.signature_def_utils.build_signature_def(
inputs={"input_x":saved_model.build_tensor_info(fast_model.input_x)},
outputs={"out_y": saved_model.build_tensor_info(fast_model.y_pred_cls),
         "score": saved_model.build_tensor_info(fast_model.logits)},
         method_name=saved_model.signature_constants.PREDICT_METHOD_NAME))

# add graph and variables
builder.add_meta_graph_and_variables(sess, ["serve"],
                                     signature_def_map={"fastText_sig_def": predict_sig_def},
                                     main_op=tf.compat.v1.tables_initializer(),
                                     strip_default_attrs=True)
builder.save()
```
- 注意：此处保存时的signature、input、out的相关属性应与Client端传参对应：
    - name(自定义，不用和图内节点名称相同)
    - shape
    - data type


### Tensorflow 2.0 export

- Keras 模型均可方便地导出为 SavedModel 格式。不过需要注意的是，因为 SavedModel 基于计算图，所以对于使用继承 tf.keras.Model 类建立的 Keras 模型，其需要导出到 SavedModel 格式的方法（比如 call ）都需要使用 @tf.function 修饰。
- 代码，[参考](https://tf.wiki/zh/deployment/export.html)

```python
class MLP(tf.keras.Model):
    def __init__(self):
        super().__init__()
        self.flatten = tf.keras.layers.Flatten()
        self.dense1 = tf.keras.layers.Dense(units=100, activation=tf.nn.relu)
        self.dense2 = tf.keras.layers.Dense(units=10)

    @tf.function
    def call(self, inputs):         # [batch_size, 28, 28, 1]
        x = self.flatten(inputs)    # [batch_size, 784]
        x = self.dense1(x)          # [batch_size, 100]
        x = self.dense2(x)          # [batch_size, 10]
        output = tf.nn.softmax(x)
        return output

model = MLP()
```

- 使用下面的代码即可将模型导出为 SavedModel

```python
tf.saved_model.save(model, "保存的目标文件夹名称")
```
### 检查SavedModel

- 检查保存的模型的SignatureDef、Inputs、Outputs等信息，可在cmd下使用命令

```shell
saved_model_cli show --dir model_dir_path --all
```
- 结果

![](https://img2020.cnblogs.com/blog/963156/202004/963156-20200424170122025-1632884222.png)


## Serving

- 模型保存好，就到Serving端的加载与预测步骤了。在介绍Tensorflow Serving之前，先介绍下基于 Tensorflow Java lib 的解决方案

### Tensorflow Java lib

- [参考链接](https://zhuanlan.zhihu.com/p/55600911)
- Tensorflow提供了一个Java API（本质上是Java封装了C++的动态库）, 允许在Java可以很方便的加载SavedModel, 并调用模型推理。
    - 添加依赖
        - 在maven的pom.xml中添加依赖（如下A），此处tensorflow的版本最好与python训练版本一致。
    - Load & Predict
        - 加载模型，调用模型在线预测。以fast text模型为例
        - 预测代码（如下B）
    - Pros & Cons
        - Java 端和 Python 端调用模型推理，结果一致，可以满足基本使用
    - 适用场景
        - 需求简单，人力成本有限（一锤子买卖）
        - 网络限制，不易搭建Tensorflow Serving
    - 可能存在的问题
        - 优化少，效率未必高
        - Java 封装 C++ 动态库，有些变量需要手动释放，若使用不当，可能出现内存泄漏
        - 无开箱即用的版本管理、并发处理等功能
        - API 不在 Tensorflow稳定性保障范围内
        - 资料匮乏，google投入的维护少

A 依赖文件

```xml
<dependency>
  <groupId>org.tensorflow</groupId>
  <artifactId>tensorflow</artifactId>
  <version>1.11.0</version>
</dependency>
```


B 预测代码：

```java
package model;

import org.tensorflow.SavedModelBundle;
import org.tensorflow.Session;
import org.tensorflow.Graph;
import org.tensorflow.Tensor;

public class FastTextModel {
  SavedModelBundle tensorflowModelBundle;
  Session tensorflowSession;

  void load(String modelPath){
    this.tensorflowModelBundle = SavedModelBundle.load(modelPath, "serve");
    this.tensorflowSession = tensorflowModelBundle.session();
  }

  public Tensor predict(Tensor tensorInput){
    // feed()传参类似python端的feed_dict
    // fetch()指定输出节点的名称
    Tensor output = this.tensorflowSession.runner().feed("input_x", tensorInput).fetch("out_y").run().get(0);

    return output;
  }

  public static void main(String[] args){
	 // 创建输入tensor, 注意type、shape应和训练时一致
    int[][] testvec = new int[1][100];
    for(int i=0; i<100; i++){
      testvec[0][i] = i;
    }
    Tensor input = Tensor.create(testvec);

	 // load 模型
    FastTextModel myModel = new FastTextModel();
    String modelPath = "Your model path";
    myModel.load(modelPath);

	 // 模型推理，注意resultValues的type、shape
    Tensor out = myModel.predict(input);
    float[][] resultValues = (float[][]) out.copyTo(new float[1][10]);
    // 防止内存泄漏，释放tensor内存
    input.close();
    out.close();
	 // 结果输出
    for(int i=0; i< 10; i++) {
      System.out.println(resultValues[0][i]);
    }
  }
}
```

### Tensorflow Serving

[参考链接](https://tensorflow.google.cn/tfx/guide/serving)

Tensorflow Serving 是google为机器学习模型生产环境部署设计的高性能的服务系统。具有以下特性：
- 支持模型版本控制和回滚
- 支持并发与GPU加速，实现高吞吐量
- 开箱即用，并且可定制化
- 支持多模型服务
- 支持 gRPC/ REST API 调用
- 支持批处理
- 支持热更新
- 支持分布式模型
- 支持多平台模型，如 TensorFlow/MXNet/PyTorch/Caffe2/CNTK等

Tensorflow Serving 丰富的、开箱即用的功能，使得其成为业内认可的部署方案。

Tensorflow Serving 内部的工作流如下图所示。

![](https://img2020.cnblogs.com/blog/963156/202004/963156-20200424170403186-1498029363.png)


简单的说：
- Sources 创建 Servable(可理解为计算图)的 Loader
- Loader 传递版本号给 Manager 由其决定是否加载，同时 Manger 负责管理 Servable 并响应 Client的请求

详情见：[参考链接](https://tensorflow.google.cn/tfx/serving/architecture)

相比方案一，Tensorflow Serving要做的事情要多一点，但长远来看收益也更高。从零开始的话，大概要经过如下步骤：
- Tensorflow serving环境搭建
- 部署模型
- 解决Client依赖
- Client代码编写

基于Docker的环境搭建及部署见原文

## Client

- Tensorflow Serving 支持 RESTful 和 gRPC 两种API。若使用 RESTful API 调用，相关协议请见[参考链接](https://www.tensorflow.org/tfx/serving/serving_kubernetes)。
- 这里着重介绍 gRPC的调用方法， Tensorflow Serving 的 gRPC API 在 protobuf 文件中定义，一般需要将其编译成相应的 Client 源码，再集成至应用。

### 解决依赖

- 若使用 Python 作为 Client , 安装对应包即可：
    - pip install tensorflow-serving-api
- 若使用 Java 作为 Client，则需要编译 proto 文件，好处是用户可以编译自定义的API。编译流程参考了[前人文档](https://github.com/junwan01/tensorflow-serve-client)，此外还有一些要注意的点
    - 获取 protobuf 文件
        - 注意版本问题，因为由 .proto 文件编译出来的 java class 依赖 tensorflow的 jar 包，可能存在不兼容问题
    - 生成 Java 源码
        - 向maven项目中添加依赖
        - 安装 protoc 工具
        - 编译protobuf文件，两种方法可选择，通过插件编译或者手动编译

### Client编写

- 分别给出 Python 和 Java Client 的简单示例


## Test

### 一致性测试

- 验证了 Text Cnn 和 base BERT 模型，分别用 Python 和 Tensorflow Serving 加载相同模型，输入10组不同数据，输出结果比对一致！

### 性能测试

- 以文本分类任务为例，这边一共训练了四个模型，基本覆盖了主流网络结构（Cnn/Rnn/Transformer）：
    - Fast text
    - Text Cnn
    - Rcnn (1 layer Bilstm + pooling)
    - BERT (12 layer)
- 此外，还针对单线程和多线程请求作了对比测试。


### 测试结论

- Tensorflow Serving 的输出可靠；
- Tensorflow Serving 运行效率极高，达到生产上线要求。




# 资料

- 具体数据见原文：[Tensorflow 模型线上部署](https://www.cnblogs.com/ustcwx/p/12768463.html)，[github源码：tensorflow-serving-tutorial](https://github.com/BeyonderXX/tensorflow-serving-tutorial)



# 结束


