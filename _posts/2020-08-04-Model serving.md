---
layout: post
title:  "算法模型部署-Model Serving"
date:   2020-08-04 16:52:00
categories: 机器学习 技术工具
tags: Tensorflow Web gRPC Restful
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
    - Saver端：将训练好的整个模型导出为一系列标准格式的文件，在不同的平台上部署模型文件。
        - TensorFlow 使用 SavedModel（pb文件） 这一格式用于模型部署。
        - 与Checkpoint 不同，SavedModel 包含了一个 TensorFlow 程序的完整信息： **不仅包含参数的权值，还包含计算图**。
        - SavedModel最终保存结果包含两部分saved_model.pb和variables文件夹。
    - Serving端：模型加载与在线预测
    - Client端：构建请求

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


