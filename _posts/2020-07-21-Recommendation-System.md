---
layout: post
title:  "推荐系统-Recommendation-System"
date:   2020-07-21 21:05:00
categories: 推荐系统
tags: 深度学习 推荐系统 CTR
excerpt: 推荐系统常用技术方案
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

- [从零搭建推荐系统——算法篇](https://zhuanlan.zhihu.com/p/153451292)
- 推荐系统中算法的位置
    - ![](https://picb.zhimg.com/v2-c1d3b70030d90f53e983643668583a99_b.jpg)
- 特征构建
    - ![](https://pic1.zhimg.com/v2-1ce368b72f3a099938148d765209ecb4_b.jpg)
- 数据集处理
    - 对整个样本集做处理，否则会引入大量噪声，不能让模型很好的拟合出样本分布。
    - 非真实用户访问样本：例如爬虫、机器人等大量非真实用户的频繁访问，带来大量高曝光未点击行为，会严重影响样本数据分布，一段时间窗口有大量相同用户id频繁访问远超正常访问量的均值等，刷次数方差较大的数据需要去除
    - 极少行为用户样本：这类用户样本虽然是真实行为，但极少的行为并不能为其在模型中找到属于该类用户的“规律”，或者说引入这些数据后，模型会开始学习这类用户的数据分布，对整体分布的拟合带来噪声，易引起模型过拟合。通常对这类用户可以看做类似新用户，通过用户冷启动的手段为其探索兴趣补充推荐。
    - 特征缺失值及异常值等处理：这里参考特征工程处理方法，针对方差较大的少量异常值做抛弃或均值处理，缺失值用均值或中值代替等
    - 正负样本处理：机器学习中正负样本的选取也直接关系着训练出的模型效果，在推荐系统中不同公司也有针对自家业务采取的样本划分方法。一次请求会产生N条推荐结果，但大部分手机端通常用户只能看到其中的m条，m < N，通过客户端埋点计算出用户真实可见曝光的物料，在这批物料中选取点击与未点击样本直观上一次曝光中可能有点击或无点击早期yutube推荐中，会对所有用户选取相同数量训练样本，可以同时避免低活跃用户和高活跃用户对整体模型的影响，使训练的模型更符合绝大多数用户行为对于有曝光无点击行为的用户，其曝光未点击的负样本可随机选取，这样可以学到这类用户“不感兴趣”的部分样本在通过定时任务整合时需要做shuffle打散，避免同类用户样本数据扎堆引起数据分布偏差，在训练模型时，也通过batch训练方式中每个batch的样本也进行shuffle打散总之正负样本处理还是要根据深入理解业务和用户行为基础上进行调整，可以让模型学习到更适合的效果。
- 模型进化：lr/gbdt -> fm/xgboost/dnn -> LR+GBDT/wide&deep/deepFM -> embedding -> GNN/GCN
    - 【2020-8-2】推荐系统算法演进图谱
    - ![](https://pic1.zhimg.com/v2-bb6e39d4eca126d967790a062d3f0e1a_b.jpg)
- 线上预测
    - ![](https://pic3.zhimg.com/v2-d7837a9fc9f7973eb1cd547ba2501056_b.jpg)



## Wide&Deep

- 【2019-5-13】[推荐系统-重排序-CTR-Wide&Deep模型](https://www.jianshu.com/p/56c0d94214d7)

### 模型结构


![](https://upload-images.jianshu.io/upload_images/3376541-60671b2e7bbd79cd.jpg)

- 最左边的Wide模型其实就是LR模型。
- 最右面Deep模型其实就是深度模型了。
- 中间是两者结合的Wide&Deep模型，其输出单元接收的是左右两部分输出的拼接。

- 输入部分

![](https://upload-images.jianshu.io/upload_images/3376541-e35bd60d26969b19.jpeg)

### Embedding 层

- 为什么需要做embedding？
    - 超高维度的稀疏输入输入网络，将带来更高维度的参数矩阵，这会带来更大的计算压力。所以神经网络更善于处理稠密的实值输入。所以，需要对稀疏的离散特征做embedding
- 怎么做embedding？
    - 1，离线提前做embedding，例如对于词的嵌入可以使用Word2vec对词做嵌入。也可利用FM先学习好稀疏特征的隐向量。
    - 2，随机初始化。之后跟着模型参数一起训练。其实1中无论是word2vec还是FM，也是一开始随机初始化，然后训练学习而来。
- 代码

```python
tf.feature_column.embedding_column(categorical_column,
                     dimension,
                     combiner='mean',
                     initializer=None,
                     ckpt_to_load_from=None,
                     tensor_name_in_ckpt=None,
                     max_norm=None,
                     trainable=True) # 继续训练这个embedding
```

### wide与deep分别代表了什么？

- wide是简单的线性模型，他会记住训练数据中已经出现的模式，并赋予权重。这代表了记忆
- deep是深度的复杂模型，会在一层层的网络中计算出训练数据中未出现的模式的权重。这代表了泛化

这里的模式，可以简单理解为特征组合。
- Wide侧就是普通LR，一般根据人工先验知识，将一些简单、明显的特征交叉，喂入Wide侧，让Wide侧能够记住这些规则。
- Deep侧就是DNN，通过embedding的方式将categorical/id特征映射成稠密向量，让DNN学习到这些特征之间的深层交叉，以增强扩展能力。

- 但其实deep模型本身也会记住已出现的模式并进行训练吧？相当于低阶特征也可以得到有效利用，为什么还要加上wide模型呢？
- 可能原因：deep模型可解释性不强。wide模型可解释性强。通过wide模型可以挑选出权重较高的低阶特征。同时，对低阶特征另外单独建模，也是很有可能提高精度的。


### 工程实现

- [TensorFlow Wide & Deep Learning Tutorial](https://github.com/tensorflow/tensorflow/blob/752dcb61ef7a8fd6555909dc37c1f2a2e5792227/tensorflow/docs_src/tutorials/wide_and_deep.md)

```python

import tensorflow as tf

gender = tf.feature_column.categorical_column_with_vocabulary_list(
    "gender", ["Female", "Male"])
education = tf.feature_column.categorical_column_with_vocabulary_list(
    "education", [
        "Bachelors", "HS-grad", "11th", "Masters", "9th",
        "Some-college", "Assoc-acdm", "Assoc-voc", "7th-8th",
        "Doctorate", "Prof-school", "5th-6th", "10th", "1st-4th",
        "Preschool", "12th"
    ])
marital_status = tf.feature_column.categorical_column_with_vocabulary_list(
    "marital_status", [
        "Married-civ-spouse", "Divorced", "Married-spouse-absent",
        "Never-married", "Separated", "Married-AF-spouse", "Widowed"
    ])
relationship = tf.feature_column.categorical_column_with_vocabulary_list(
    "relationship", [
        "Husband", "Not-in-family", "Wife", "Own-child", "Unmarried",
        "Other-relative"
    ])
workclass = tf.feature_column.categorical_column_with_vocabulary_list(
    "workclass", [
        "Self-emp-not-inc", "Private", "State-gov", "Federal-gov",
        "Local-gov", "?", "Self-emp-inc", "Without-pay", "Never-worked"
    ])

# To show an example of hashing:
occupation = tf.feature_column.categorical_column_with_hash_bucket(
    "occupation", hash_bucket_size=1000)
native_country = tf.feature_column.categorical_column_with_hash_bucket(
    "native_country", hash_bucket_size=1000)

# Continuous base columns.
age = tf.feature_column.numeric_column("age")
education_num = tf.feature_column.numeric_column("education_num")
capital_gain = tf.feature_column.numeric_column("capital_gain")
capital_loss = tf.feature_column.numeric_column("capital_loss")
hours_per_week = tf.feature_column.numeric_column("hours_per_week")

# Transformations.
age_buckets = tf.feature_column.bucketized_column(
    age, boundaries=[18, 25, 30, 35, 40, 45, 50, 55, 60, 65])
```
- wide部分

```python
base_columns = [
    gender, native_country, education, occupation, workclass, relationship,
    age_buckets,
]

crossed_columns = [
    tf.feature_column.crossed_column(
        ["education", "occupation"], hash_bucket_size=1000),
    tf.feature_column.crossed_column(
        [age_buckets, "education", "occupation"], hash_bucket_size=1000),
    tf.feature_column.crossed_column(
        ["native_country", "occupation"], hash_bucket_size=1000)
]
```
- deep部分

```python
deep_columns = [
    tf.feature_column.indicator_column(workclass),
    tf.feature_column.indicator_column(education),
    tf.feature_column.indicator_column(gender),
    tf.feature_column.indicator_column(relationship),
    # To show an example of embedding
    tf.feature_column.embedding_column(native_country, dimension=8),
    tf.feature_column.embedding_column(occupation, dimension=8),
    age,
    education_num,
    capital_gain,
    capital_loss,
    hours_per_week,
]
```
- wide&deep组合

```python
import tempfile
model_dir = tempfile.mkdtemp()
m = tf.estimator.DNNLinearCombinedClassifier(
    model_dir=model_dir,
    linear_feature_columns=crossed_columns,
    dnn_feature_columns=deep_columns,
    dnn_hidden_units=[100, 50])
```
- 模型训练评估

```python
import pandas as pd
import urllib

# Define the column names for the data sets.
CSV_COLUMNS = [
    "age", "workclass", "fnlwgt", "education", "education_num",
    "marital_status", "occupation", "relationship", "race", "gender",
    "capital_gain", "capital_loss", "hours_per_week", "native_country",
    "income_bracket"
]

def maybe_download(train_data, test_data):
  """Maybe downloads training data and returns train and test file names."""
  if train_data:
    train_file_name = train_data
  else:
    train_file = tempfile.NamedTemporaryFile(delete=False)
    urllib.request.urlretrieve(
        "https://archive.ics.uci.edu/ml/machine-learning-databases/adult/adult.data",
        train_file.name)  # pylint: disable=line-too-long
    train_file_name = train_file.name
    train_file.close()
    print("Training data is downloaded to %s" % train_file_name)

  if test_data:
    test_file_name = test_data
  else:
    test_file = tempfile.NamedTemporaryFile(delete=False)
    urllib.request.urlretrieve(
        "https://archive.ics.uci.edu/ml/machine-learning-databases/adult/adult.test",
        test_file.name)  # pylint: disable=line-too-long
    test_file_name = test_file.name
    test_file.close()
    print("Test data is downloaded to %s"% test_file_name)

  return train_file_name, test_file_name

def input_fn(data_file, num_epochs, shuffle):
  """Input builder function."""
  df_data = pd.read_csv(
      tf.gfile.Open(data_file),
      names=CSV_COLUMNS,
      skipinitialspace=True,
      engine="python",
      skiprows=1)
  # remove NaN elements
  df_data = df_data.dropna(how="any", axis=0)
  labels = df_data["income_bracket"].apply(lambda x: ">50K" in x).astype(int)
  return tf.estimator.inputs.pandas_input_fn(
      x=df_data,
      y=labels,
      batch_size=100,
      num_epochs=num_epochs,
      shuffle=shuffle,
      num_threads=5)
      
# set num_epochs to None to get infinite stream of data.
m.train(
    input_fn=input_fn(train_file_name, num_epochs=None, shuffle=True),
    steps=train_steps)
# set steps to None to run evaluation until all data consumed.
results = m.evaluate(
    input_fn=input_fn(test_file_name, num_epochs=1, shuffle=False),
    steps=None)
print("model directory = %s" % model_dir)
for key in sorted(results):
  print("%s: %s" % (key, results[key]))
```





# 结束


