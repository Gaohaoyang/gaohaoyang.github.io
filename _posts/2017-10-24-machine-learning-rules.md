---
layout: post
title:  "【谷歌】机器学习43条军规-The-Rules-of-Machine Learning"
date:   2017-10-24 18:32:00
categories: 机器学习
tags: 机器学习 谷歌 深度学习 pipeline
author : Martin Zinkevich
excerpt: 开始机器学习项目时，需要注意哪些问题，谷歌大师的经验总结
mathjax: true
---

* content
{:toc}


# 机器学习方法论

- 微软-ML算法指南：[pdf版下载地址](https://docs.microsoft.com/en-us/azure/machine-learning/machine-learning-algorithm-cheat-sheet)
![微软算法](https://github.com/wqw547243068/wangqiwen/raw/master/%E5%BE%AE%E8%BD%AF-ML%E7%AE%97%E6%B3%95%E6%8C%87%E5%8D%97.png)
   - 详细讲解[How to choose algorithms for Microsoft Azure Machine Learning](https://docs.microsoft.com/zh-cn/azure/machine-learning/studio/algorithm-choice)
   - 【2020-7-15】新版
   - ![](https://docs.microsoft.com/zh-cn/azure/machine-learning/media/algorithm-cheat-sheet/machine-learning-algorithm-cheat-sheet.svg)
- [scikit-learn官方总结](http://scikit-learn.org/stable/tutorial/machine_learning_map/index.html#)，Scikit-learn Cookbook:[英文本](https://www.packtpub.com/big-data-and-business-intelligence/scikit-learn-cookbook),[中文译本](https://www.gitbook.com/book/wizardforcel/sklearn-cookbook/details)，[MarkDown格式](http://git.oschina.net/wizardforcel/sklearn-cb/blob/master/SUMMARY.md)。【2018-6-12】scikit-learn中文翻译版，[主页](http://sklearn.apachecn.org/),[scikit-learn网页版](http://sklearn.apachecn.org/cn/0.19.0/index.html)，[Github版](https://github.com/apachecn/scikit-learn-doc-zh),[wiki版](http://cwiki.apachecn.org/pages/viewpage.action?pageId=10030181),[视频版](http://i.youku.com/apachecn)。[sklearn库中文版完全手册下载](https://download.csdn.net/download/nndreamer/9823008)
![算法对比](http://scikit-learn.org/stable/_static/ml_map.png)
- 【2017-12-20】[Dlib机器学习指南](https://www.cnblogs.com/oloroso/p/6607888.html),方法选择：![svg图](http://dlib.net/ml_guide.svg),中文版,[dlib中文指南-图](http://images2015.cnblogs.com/blog/693958/201703/693958-20170323225348940-2043166934.png)


# 机器学习流程

- 书籍：[用tensorflow生态系统搭建机器学习pipeline](https://www.toutiao.com/a1673252334929924)，[配套代码](https://github.com/Building-ML-Pipelines/building-machine-learning-pipelines)
    - 了解构建机器学习管道的步骤
    - 使用TensorFlow Extended中的组件构建管道
    - 使用Apache Beam，Apache Airflow和Kubeflow Pipelines编排您的机器学习管道
    - 使用TensorFlow数据验证和TensorFlow转换处理数据
    - 使用TensorFlow模型分析来详细分析模型
    - 检查模型性能的公平性和偏见
    - 使用TensorFlow Serving或TensorFlow Lite为移动设备部署模型
    - 学习保护隐私的机器学习技术

![](https://p9-tt-ipv6.byteimg.com/img/pgc-image/996ce8d043b7495ebe6ecd1804d3d426~tplv-obj:616:802.image?from=post)

## sklearn


```python

import pandas as pd
from sklearn.cross_validation import train_test_split
from sklearn.preprocessing import LabelEncoder

# 加载数据集
df = pd.read_csv('https://archive.ics.uci.edu/ml/machine-learning-databases/breast-cancer-wisconsin/wdbc.data', header=None)
# Breast Cancer Wisconsin dataset

X, y = df.values[:, 2:], df.values[:, 1]
                                # y为字符型标签
                                # 使用LabelEncoder类将其转换为0开始的数值型
encoder = LabelEncoder()
y = encoder.fit_transform(y)
                    >>> encoder.transform(['M', 'B'])
                    array([1, 0])
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=.2, random_state=0)

# 构建pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.linear_model import LogisticRegression

from sklearn.pipeline import Pipeline

pipe_lr = Pipeline([('sc', StandardScaler()),
                    ('pca', PCA(n_components=2)),
                    ('clf', LogisticRegression(random_state=1))
                    ])
pipe_lr.fit(X_train, y_train)
print('Test accuracy: %.3f' % pipe_lr.score(X_test, y_test))
                # Test accuracy: 0.947


```


## pipeline

- pipeline这个词，应该来自linux。在linux体系下的各种命令工具的处理，支持pipeline，即管道机制，例如：

```shell
cat xxx | awk '{xxxx}' | sort | uniq
```

- pipeline是一种良好的接口规范，工具的功能有公共的接口规范，就像流水线一样，一步接着一步。机器学习的处理过程，也可以是pipeline。
- 实际上scikit-learn开发了整套的pipeline机制，并封装到 sklearn.pipline命名空间下面。

![](https://upload-images.jianshu.io/upload_images/18355921-427ac759ef4d9a0a)


- PIPELINE
    - [机器学习训练的PIPELINE机制](https://www.jianshu.com/p/49c93d6c0198)
    - [机器学习pipeline总结](https://www.cnblogs.com/hannahzhao/p/11959326.html)，含代码和手写笔记
    - ![](https://img2018.cnblogs.com/blog/1827468/201911/1827468-20191129175455462-21315450.jpg)
- sklearn中把机器学习处理过程抽象为`estimator`，其中estimator都有fit方法，表示“喂”数据进行初始化or训练。
- estimator有2种：
    - 1、`特征变换`（transformer）
        - 可以理解为特征工程，即：特征标准化、特征正则化、特征离散化、特征平滑、onehot编码等。该类型统一由一个transform方法，用于fit数据之后，输入新的数据，进行特征变换。
    - 2、`预测器`（predictor）
        - 即各种模型，所有模型fit进行训练之后，都要经过测试集进行predict所有，有一个predict的公共方法。
- 上面的抽象的好处即可实现机器学习的pipeline，显然特征变换是可能并行的，通过FeatureUnion实现。特征变换在训练集、测试集之间都需要统一，所以pipeline可以达到模块化的目的。
    - 特征变换往往需要并行化处理，即FeatureUnion所实现的功能
    - pipeline还可以嵌套pipeline，整个机器学习处理流程就像流水工人一样
    - 加上自动调参就完美了，sklearn的调参通过GridSearchCV实现，pipeline+gridsearch简直是绝配
    - Pipeline对象接受二元tuple构成的list，每一个二元 tuple 中的第一个元素为 arbitrary identifier string，我们用以获取（access）Pipeline object 中的 individual elements，二元 tuple 中的第二个元素是 scikit-learn与之相适配的transformer 或者 estimator。

- 举个NLP处理的例子：

```python
# 生成训练数据、测试数据
X_train, X_test, y_train, y_test = train_test_split(X, y)
# pipeline定义
pipeline = Pipeline([ ('vect', CountVectorizer()), ('tfidf', TfidfTransformer()), ('clf', RandomForestClassifier())])
# FeatureUnion的并行化处理
pipeline = Pipeline([('features', FeatureUnion([ ('text_pipeline', Pipeline([ ('vect', CountVectorizer(tokenizer=tokenize)), ('tfidf', TfidfTransformer()) ])), ('findName', FineNameExtractor())])),('clf', RandomForestClassifier())])
# train classifier
pipeline.fit(X_train, y_train)
# predict on test data
y_pred = pipeline.predict(X_test)

from sklearn.base import BaseEstimator, TransformerMixin

class FineNameExtractor(BaseEstimator, TransformerMixin): 

    def find_name(self, text): 
        return True 

    def fit(self, X, y=None): 
        return self 

    def transform(self, X): 
        X_tagged = pd.Series(X).apply(self.find_name) 
        return pd.DataFrame(X_tagged)

```



# 机器学习43条军规——谷歌

- [原文地址](https://developers.google.com/machine-learning/guides/rules-of-ml/)
- pdf地址，[Rules of Machine Learning: Best Practices for ML Engineering](http://martin.zinkevich.org/rules_of_ml/rules_of_ml.pdf)
- [机器学习43条军规：解密谷歌机器学习工程最佳实践](https://www.sohu.com/a/232465024_473283)

- 作者介绍
>Martin Zinkevich现在是谷歌大脑的高级科学家，负责和参与了YouTube、Google Play 以及Google Plus等产品中的机器学习项目，本文也是基于作者在这三个产品上面做机器学习项目的各种经验和教训提炼而成。在加入谷歌之前是雅虎的高级科学家，曾在2010年和2011年两度获得雅虎的最高荣誉Yahoo Team Superstar Awards，对雅虎的广告系统做出过很多杰出贡献。

## 梗概介绍

本文把在产品中应用机器学习的过程从浅到深分成了三个大的阶段，又在这三个大的阶段中细分出了一些方面，以此对43条规则进行逻辑分类。简单来说，如果你是从头开始做机器学习系统，那么就可以在不同阶段参考这里面对应的条目，来保证自己走在正确的道路上。

## ML工程最佳实践

To make great products:
- do machine learning like the great engineer you are, not like the great machine learning expert you aren’t.
- 这句话一定程度上是对整篇文章（叫手册可能更合适）的一个高度概括，ML在实际工作确实更多是工程问题，而不是算法问题。优先从工程效率中要效果，当把这部分榨干后，再考虑算法的升级。

## Before Machine Learning

### Rule #1: Don’t be afraid to launch a product without machine learning.

- 规则1：不要害怕上线没有机器学习的产品。
- 中心思想一句话概括：If you think that machine learning will give you a 100% boost, then a heuristic will get you 50% of the way there.

### Rule #2: First, design and implement metrics.

- 规则2：在动手之前先设计和实现评价指标。
- 在构建具体的机器学习系统之前，首先在当前系统中记录尽量详细的历史信息，留好特征数据。这样不仅能够留好特征数据，还能够帮助我们随时了解系统的状态，以及做各种改动时系统的变化。
### Rule #3: Choose machine learning over a complex heuristic.

- 规则3：不要使用过于复杂的规则系统，使用机器学习系统。
- 简单来讲，复杂的规则系统难以维护，不可扩展，而我们很简单就可以转为ML系统，变得可维护可扩展。

## ML Phase I: Your First Pipeline

- 构建第一个ML系统时，一定要更多关注系统架构的建设。虽然机器学习的算法令人激动，但是基础架构不给力找不到问题时会令人抓狂。

### Rule #4: Keep the first model simple and get the infrastructure right.

- 规则4：第一个模型要简单，但是架构要正确。
- 第一版模型的核心思想是抓住主要特征、与应用尽量贴合以及快速上线。

### Rule #5: Test the infrastructure independently from the machine learning.

- 规则5：独立于机器学习来测试架构流程。
- 确保架构是可单独测试的，将系统的训练部分进行封装，以确保其他部分都是可测试的。特别来讲：
    - 测试数据是否正确进入训练算法。检查具体的特征值是否符合预期。
    - 测试实验环境给出的预测结果与线上预测结果是否一致。

### Rule #6: Be careful about dropped data when copying pipelines.

- 规则6：复制pipeline时要注意丢弃的数据。
- 从一个场景复制数据到另一个场景时，要注意两边对数据的要求是否一致，是否有数据丢失的情况。

### Rule #7: Turn heuristics into features, or handle them externally.

- 规则7：将启发规则转化为特征，或者在外部处理它们。
- 机器学习系统解决的问题通常都不是新问题，而是对已有问题的进一步优化。这意味着有很多已有的规则或者启发式规则可供使用。这部分信息应该被充分利用（例如基于规则的推荐排序时用到的排序规则）。下面是几种启发式规则可以被使用的方式：
    - 用启发规则进行预处理。如果启发式规则非常有用，可以这么用。例如在垃圾邮件识别中，如果有发件人已经被拉黑了，那么就不要再去学“拉黑”意味着什么，直接拉黑就好了。
    - 制造特征。可以考虑从启发式规则直接制造一个特征。例如，你使用启发式规则来计算query的相关性，那么就可以把这个相关性得分作为特征使用。后面也可以考虑将计算相关性得分的原始数据作为特征，以期获得更多的信息。
    - 挖掘启发式规则的原始输入。如果有一个app的规则启发式规则综合了下载数、标题文字长度等信息，可以考虑将这些原始信息单独作为特征使用。
    - 修改label。当你觉得启发式规则中包含了样本中没有包含的信息时可以这么用。例如，如果你想最大化下载数，同时还想要追求下载内容的质量。一种可行的方法是将label乘以app的平均star数。在电商领域，也常常用类似的方法，例如在点击率预估的项目中，可考虑对最终下单的商品或者高质量的商品对应的样本增加权重。
- 已有的启发式规则可以帮助机器学习系统更平滑的过渡，但是也要考虑是否有同等效果更简单的实现方式。

## Monitoring

- 概括来讲，要保持好的监控习惯，例如使报警是可应对的，以及建设一个Dashboard页面。

### Rule #8: Know the freshness requirements of your system.

- 规则8：了解你系统对新鲜度的要求。
- 如果模型延迟一天更新，你的系统会受到多大的效果影响？如果是一周的延迟呢？或者更久？这个信息可以让我们排布监控的优先级。如果模型一天不更新收入就会下降10%，那么可以考虑让一个工程师全天候监控它。了解系统对新鲜度的要求是决定具体监控方案的第一步。

### Rule #9: Detect problems before exporting models.

- 规则9：在模型上线之前检测问题。
- 模型上线前一定要做完整性、正确性检查，例如AUC、Calibration、NE等指标的计算确认等。如果是模型上线前出了问题，可以邮件通知，如果是用户正在使用的模型出了问题，就需要电话通知了。

### Rule #10: Watch for silent failures.

- 规则10：关注静默失败。
- 这是一个非常重要，而又经常容易被忽略的问题。所谓的静默失败指的是全部流程都正常完成，但是背后依赖数据出了问题，导致模型效果逐步下降的问题。这种问题在其他系统中并不常出现，但是在机器学习系统中出现几率会比较高。例如训练依赖的某张数据表很久没有更新了，或者表中的数据含义发生了变化等，再或者数据的覆盖度忽然变少，都会对效果产生很大的影响。解决方法是是对关键数据的统计信息进行监控，并且周期性对关键数据进行人工检查。

### Rule #11: Give feature column owners and documentation.

- 规则11：给特征组分配负责人，并记录文档。
- 这里的feature column指的是一个特征组，例如用户可能属于的国家这组特征就是一个feature column。
如果系统庞大，数据繁多，那么知道每组数据由谁生成就变得非常重要。虽然数据都有简单描述，但是关于特征的具体计算逻辑，数据来源等都需要更详细的记录。

## Your Fist Objective

- objective是模型试图优化的值，而metric指的是任何用来衡量系统的值。

### Rule #12: Don’t overthink which objective you choose to directly optimize.

- 规则12：不要过于纠结该优化哪个目标。
- 机器学习上线的初期，即使你只优化一个目标，很多指标一般都会一起上涨的。所以不用太纠结究竟该优化哪个。
- 虽然大佬这么说，但是在我自己的实践经验中，只优化一个目标，系统的整体效果却未必会上涨。典型的如推荐系统的CTR模型，上线之后CTR确实会提升，但是对应的CVR很有可能会下降，这时还需要一个CVR模型，两个模型同时使用才能真正提升系统效果。究其原因，是因为每个目标只关注系统整个过程的一个子过程，贪心地去优化这个子过程，不一定能够得到全局的最优解，通常需要把主要的几个子过程都优化之后，才能取得整体效果的提升。

### Rule #13: Choose a simple, observable and attributable metric for your first objective.

- 规则13：为你的第一个objective选择一个简单可观测可归因的metric。
- objective应该是简单可衡量的，并且是metric的有效代理。最适合被建模的是可直接观测并被归因的行为，例如：
    - 链接是否被点击？
    - 软件是否被下载？
    - 邮件是否被转发？
    - ……
- 尽量不要在第一次就建模非直接效果的行为，例如：
    - 用户第二天是否会访问？
    - 用户在网站上停留了多久？
    - 日活用户有多少？
    - 非直接指标是很好的metric，可以用ABTest来进行观测，但不适合用作优化指标。此外，千万不要试图学习以下目标：
    - 用户对产品是否满意？
    - 用户对体验是否满意？
    - ……
- 这些指标非常重要，但是非常难以学习。应该使用一些代理指标来学习，通过优化代理指标来优化这些非直接指标。为了公司的发展着想，最好有人工来连接机器学习的学习目标和产品业务。

### Rule #14: Starting with an interpretable model makes debugging easier.

- 规则14：使用可解释性强的模型可降低debug难度。
- 优先选择预测结果有概率含义、预测过程可解释的模型，可以更容易的确认效果，debug问题。例如，如果使用LR做分类，那么预测过程不外乎一些相乘和相加，如果特征都做了离散化，就只有加法了，这样很容易debug一条样本的预测得分是如何被计算出来的。所以出了问题很容易debug。

### Rule #15: Separate Spam Filtering and Quality Ranking in a Policy Layer.

- 规则15：将垃圾过滤和质量排序的工作分离，放到策略层（policy layer）。
- 排序系统工作的环境中数据分布是相对静态的，大家为了得到更好的排序，会遵守系统制定的规则。但是垃圾过滤更多是个对抗性质的工作，数据分布会经常变动。所以不应该让排序系统去处理垃圾信息的过滤，而是应该有单独的一层去处理垃圾信息。这也是一种可以推广的思想，那就是：排序层只做排序层的事情，职责尽量单一，其他工作让架构上更合适的模块去处理。此外，为了提升模型效果，应该把垃圾信息从训练数据中去除。

## ML Phase II: Feature Engineering

- 前面第一阶段的重点是把数据喂到学习系统中，有了基础的监控指标，有了基础的架构。等这一套系统建立起来后，第二阶段就开始了。
整体来讲，第二阶段的核心工作是将尽量多的有效特征加入到第一版的系统中，一般都可以取得提升。
- 简单来说，就是要深刻认识到，系统优化永远没有终点，所以系统设计方面要对迭代非常友好。例如增加删除特征是否足够简单，正确性验证是否足够简单，模型迭代是否可以并行运行，等等。
- 这虽然不是一条具体可行动的（actionable）规则，但是这种思想上的准备对整个系统的开发很有帮助。只有真正深刻意识到了系统持续迭代上线的本质，才会在设计在线和离线架构时为持续迭代最好相应的设计，并做好相应的工具，而不是做一锤子系统。

### Rule #17: Start with directly observed and reported features as opposed to learned features.

- 规则17：优先使用直接观测或收集到的特征，而不是学习出来的特征。
- 所谓学习出来的特征，指的是用另外的算法学习出来的特征，而非可以直接观测或收集到的简单特征。学习出来的特征由于存在外部依赖，或者计算逻辑复杂，不一定适用于你当前的模型，所以稳定性和有效性会有风险。而直接可观测的特征由于是相对比较客观的，依赖较少的，所以比较稳定。

### Rule #18: Explore with features of content that generalize across contexts.

- 规则18：探索使用可以跨场景的内容特征。
- 中心思想是在说，要多利用可以在多个场景下使用的特征，例如全局的点击率、浏览量这些特征，可以在多个场景下作为特征使用。这样可以在一些冷启动或者缺乏有效特征的场景下作为特征使用。

### Rule #19: Use very specific features when you can.

- 规则19：尽量使用非常具体的特征。
- 如果数据量足够大，那么相比少数复杂特征，使用海量简单特征是更简单有效的选择。
- 所谓非常具体，指的是覆盖样本量比较少的特征，例如文档的ID或者query的ID等。这样的特征虽然每个只覆盖很少一部分特征，但是只要这一组特征整体能够覆盖率比较高，例如90%，那就是OK的。而且还可以通过正则化来消除覆盖率过低或者相关性差的特征。这也是大家都偏爱大规模ID特征的一个原因，现在很多大厂的排序模型特征都大量使用了大规模ID特征。

### Rule #20: Combine and modify existing features to create new features in human­-understandable ways.

- 规则20：用人类可理解的方式对已有特征进行组合、修改来得到新特征。
- 离散化和交叉是最常用的两种特征使用方式。其本质都是用特征工程的方式，在不改变使用模型本身的情况下增加模型的非线性。这两种方法本身没什么好说的，值得一致的是，在大规模ID类特征的交叉时，例如一段是query里的关键词，另一端是文档里的关键词，那就会产生很大量级的交叉特征，这时有两种处理方法：
    - 点积。其实计算query和文档共同包含的关键词数量。
    - 交集。每一维特征的含义是某个词同时出现在了query和文档中，同时出现则该维特征为1，否则为0。
- 所谓“人类可理解的方式”，我的理解就是离散化和交叉要基于对业务逻辑的理解，不能乱交叉。

### Rule #21: The number of feature weights you can learn in a linear model is roughly proportional to the amount of data you have.

- 规则21：线性模型中可学到的特征权重数量，与训练数据的数量大体成正比。
- 这背后有复杂的统计原理做支撑，但你只需要知道结论就可以了。这个原则给我们的启示，是要根据数据量来选择特征的生成方式，例如：
- 如果你的系统是一个搜索系统，query和文档中有百万级的词，但是你只有千级别的标注样本。那你就别用ID级关键词特征了，而是要考虑点积类特征，把特征数量控制在几十个这个级别。
- 如果你拥有百万级样本，那么可以将文档和query的关键词进行交叉特征，然后用正则化进行特征选择。这样你会得到百万级特征，但是正则化之后会更少。所以说，千万级样本，十万级特征。
- 如果你有十亿级或者更高级别的样本，那么你可以使用query和文档的ID级特征，然后加上特征选择和正则化。十亿级样本，千万级特征。
- 总结起来就是，根据样本决定特征使用方式，样本不够就对特征进行高层次抽象处理，指导和样本量级相匹配。

### Rule #22: Clean up features you are no longer using.

- 规则22：清理不再使用的特征。
- 如果某个特征已经没有用，并且它与其他特征的交叉也已经没有用，就应该将其清理掉，保持架构的整洁性。
- 在考虑添加或保留哪些特征时，需要统计一下特征的样本覆盖率，例如一些整体覆盖率很低的个性化feature column，只有很少用户能覆盖到，那么大概率这组特征作用不大。但另一方面，如果某个特征覆盖率很低，例如只有1%，但是其区分度非常大，例如90%取值为1的样本都是正样本，那么 这个特征就值得加入或保留。

## Human Analysis of the System

- 在更进一步之前，我们需要了解一些机器学习课程上不会教你的内容：如何观察分析模型，并改进它。用作者的话说，这更像是一门艺术 ，但仍然有一些规律可循。

### Rule #23: You are not a typical end user.

- 规则23：你不是一个典型的终端用户。
- 这条规则的中心思想是说，虽然吃自己的狗食是必要的，但也不要总是从工程师的角度来衡量模型的好坏。这不仅可能不值当，而且可能看不出问题。所谓不值当，是因为工程师的时间太贵了，这个大家都懂；而所谓看不出问题，是因为工程师自己看自己开发的模型，容易看不出问题，所谓“不识庐山真面目”。
- 所以作者认为合理的方法是让真正的终端用户来衡量模型或产品的好坏。要么通过线上ABTest，要么通过众包的方式来做。

### Rule #24: Measure the delta between models.

- 规则24：离线衡量模型之间的差异。
- 原文没有说是离线，但我通过上下文理解他说的应该是离线。这一条规则说的是新模型在上线之前，需要先和老模型做差异对比。所谓差异对比，指的是对于同样的输入，新旧两个模型给出的结果是否差异足够大。例如对于同一个query，两个排序模型给出的差异是否足够大。如果离线计算发现差异很小，那也没必要上线测试了，因为上线后差异肯定也大不了。如果差异比较大，那么还需要看差异是不是好的差异。通过观察差异可以得知新模型究竟对数据产生了什么影响，这种影响是好是坏。
- 当然，这一切的前提是你需要有一个稳定的对比系统，起码一个模型和他自己对比的话差异应该非常小，最好是零差异。

### Rule #25: When choosing models, utilitarian performance trumps predictive power.

- 规则25：当选择模型时，实用性指标比预测能力更重要。
- 这是一条很有用的经验。虽然我们训练模型时objective一般都是logloss，也就是说实在追求模型的预测能力。但是我们在上层应用中却可能有多种用途，例如可能会用来排序，那么这时具体的预测能力就不如排序能力重要；如果用来划定阈值然后跟根据阈值判断垃圾邮件，那么准确率就更重要。当然大多数情况下这几个指标是一致的。
- 除了作者说的这一点，还有一种情况是需要特别注意的，那就是我们在训练时可能会对样本做采样，导致得到的预测值整体偏高或偏低。如果这个预测值是用来直接排序的，那么这个变化关系不大，但如果有其他用处，例如和另外的值相乘，典型的如广告场景下的CTR*bid，或者电商推荐排序下的CTR*CVR，在这类场景下，预测值本身的准确性也很重要，就需要对其进行校准(calibrate)，使其与采样前的样本点击率对齐。

### Rule #26: Look for patterns in the measured errors, and create new features.

- 规则26：在错误中发现模式，并创建新特征。
- 这算是一种用来提升模型效果的通用思路。具体来说，指的是观察训练数据中模型预测错误的样本，看看是否能够通过添加额外特征来使得这条样本被模型预测正确。之所以使用训练集中的数据，是因为这部分数据是模型已经试图优化过的，这里面的错误，是模型知道自己搞错了，目前学不出来的，所以如果你给它足够好的其他特征，它或许就能把这条样本学对了。
- 一旦发现错误的模式，就可以在当前系统之外寻找新的特征。例如，如果你发现当前系统倾向于错误地把长文章排到后面，那么就可以加入文章长度这一特征，让系统去学习文章长度的相关性和重要性。

### Rule #27: Try to quantify observed undesirable behavior.

- 规则27：尽量将观测到的负面行为量化。
- 如果在系统中观察到了模型没有优化到的问题，典型的例如推荐系统逼格不够这种问题，这时应该努力将这种不满意转化为具体的数字，具体来讲可以通过人工标注等方法标注出不满意的物品，然后进行统计。如果问题可以被量化，后面就可以将其用作特征、objective或者metric。整体原则就是“先量化，再优化”。
- 多说一句，这里的优化，不一定是用模型来优化，而是指的整体优化。比如推荐系统逼格这种问题，模型可能很难优化，但是只要能量化出来，就可以通过其他方法来尽量减少，例如单独去学习有逼格物品的特征，或者在召回阶段进行一定倾斜。

### Rule #28: Be aware that identical short-term behavior does not imply identical long­-term behavior.

- 规则28：要注意短期内观察到的类似行为不一定会长期存在。
- 假设你搞了个系统，通过学习每个具体的文档ID和query ID，计算出了每个query下每个文档的点击率。通过离线对比和ABTest，你发现这个系统的行为和当前系统的行为一毛一样，而这个系统又更简单，所以你就把这个系统上线了。后面你会发现这个系统在任何query下都不会给出任何新的文档。奇怪吗？一点都不奇怪，因为你只让它记住了之前的历史数据，它对新数据没有任何信息。
- 所以唯一能够衡量一个系统是否长期有效的方法，就是让它使用该模型在线上时收集到的真实数据上进行训练。当然这有难度。
往大了说，作者这条规则其实说的是个系统或者模型的泛化能力，如果一个系统或者模型不能对新数据做出很好的预测，那么无论他的离线表现如何，都不能代表它的真正能力。再换个角度来看，一个系统必须具有持续学习适应新数据的能力，才能是一个合格的机器学习系统，否则就只是个学舌的鹦鹉。

## Training-Serving Skew

- 训练和服务之间的差异问题时一个大话题，主要原因包括训练时与服务时数据获取方式不同、训练时与服务时数据分布不同以及模型和算法之间的反馈循环等。作者说这种差异在G家的多条产品线上出现过，都产生了负面影响。但要我说这绝对不仅仅是谷歌的问题，谷歌绝对是做的比较好的了，各种中小厂里面这种问题只多不少，所以这部分的经验是非常宝贵的。解决这类问题的核心是对系统和数据的变化进行监控，确保一切差异都在监控之内，不会悄悄进入系统。

### Rule #29: The best way to make sure that you train like you serve is to save the set of features used at serving time, and then pipe those features to a log to use them at training time.

- 规则29：保证服务与训练一致性的最好方法是将服务时的特征保存下来，然后通过日志将特征喂到训练过程中去。
- 这句话基本道出了保证差异最小化的核心套路。这种基于特征日志的方法可以极大提升效果，同时能够减少代码复杂度。谷歌的很多团队也正在往这种做法上迁移。

### Rule #30: Importance weight sampled data, don’t arbitrarily drop it!

- 规则30：对采样样本做重要性赋权，不要随意丢弃！
- 这是作者唯一用了感叹号的一条，可想而知背后的辛酸。当我们有太多训练数据时，我们会只取其中的一部分。但这是错误的。正确的做法是，如果你给某条样本30%的采样权重，那么在训练时就给它10/3的训练权重。通过这样的重要性赋权(importance weight)，整个训练结果的校准性（calibration）就还能够保证。
- 多说一句，这个校准性非常的重要，尤其对于广告系统，或者多个预测值相加或相乘来得到最终结果的系统。如果单个值没有校准，偏低或偏高，那么在相乘或相加之后其含义就会不正确。如果直接使用模型预测值进行排序，校准性就没那么重要，因为校准性不会影响排序，只会影响具体的值。

### Rule #31: Beware that if you join data from a table at training and serving time, the data in the table may change.

- 规则31：如果你在训练时和服务时都在join一张表，那么要注意这张表的数据可能会发生变化。
- 比如说某张表里存着一些文档的特征，你在离线训练之前要去这个表里取这些特征用来训练，但这里就有个风险，那就是这个表里的数据在你离线取的时候和在线服务的时候数据不一样，发生了变化。最好的解决方式就是在服务端将特征记录在日志中，这样能保证数据的一致性。或者如果这张表的变化频率比较低，也可以考虑对其做小时级或天级备份，以此来减少这种差异。但要记住这种方法并不能彻底解决这个问题。

### Rule #32: Re­use code between your training pipeline and your serving pipeline whenever possible.

- 规则32：尽量在训练pipeline和服务pipeline之间复用代码。
- 训练一般是离线批量进行的，而服务则是在线流式进行的，这两者之间虽然在处理数据的方式上存在着较大差异，但仍然有很多代码可以共享。这些代码的共享可以从代码层面介绍训练和服务之间的差异。换句话说，日志记录特征是从数据角度消除差异，那么代码复用就是从代码角度消除差异，双管齐下，效果更好。

### Rule #33: If you produce a model based on the data until January 5th, test the model on the data from January 6th and after.

- 规则33：如果训练数据是1月5日之前的，那么测试数据要从1月6日开始。（注：按时间区分训练集和测试集）
- 这条规则的主要目的是让测试结果与线上结果更加接近，因为我们在使用模型时就是在用服务当天之前的数据训练，然后来预测当天的数据。这样得到的测试结果虽然可能会偏低，但却更加真实。

### Rule #34: In binary classification for filtering (such as spam detection or determining interesting e­mails), make small short-­term sacrifices in performance for very clean data.

- 规则34：在为过滤服务的二分类问题中（例如垃圾邮件过滤），可以为了干净的数据牺牲一些短期效果。
- 在过滤类的任务中，被标记为负的样本是不会展示给用户的，例如可能会把75%标记为负的样本阻拦住不展现给用户。但如果你只从展示给用户的结果中获取下次训练的样本，显然你的训练样本是有偏的。
- 更好的做法是使用一定比例的流量（例如1%）专门收集训练数据，在这部分流量中的用户会看到所有的样本。这样显然会影响线上的真实过滤效果，但是会收集到更好的数据，更有利于系统的长远发展。否则系统会越训练越偏，慢慢就不可用了。同时还能保证至少过滤掉74%的负样本，对系统的影响也不是很大。
- 但是如果你的系统会过滤掉95%或者更多的负样本，这种做法就不那么可行了。即使如此，为了准确衡量模型的效果，你仍然可以通过构造一个更小的数据集（0.1%或者更小）来测试。十万级别的样本足够给出准确的评价指标了。

### Rule #35: Beware of the inherent skew in ranking problems.

- 规则35：注意排序问题中固有的数据偏置。
- 当新的排序算法对线上排序结果产生了重大改变时，你其实是改变了算法将来会看到的数据。这时这种偏置就会出现。这种问题有以下几种方法来解决，核心思想都是更偏重模型已经看到过的数据。
- 对覆盖更多query（或类似角色，根据业务不同）的特征给予更强的正则化。这样模型会更偏重只覆盖一部分样本的特征，而不是泛化性特征。这样会阻止爆品出现在不相关query的结果中。
- 只允许特征取正的权重值。这样任何好特征都会比“未知”特征要好。
- 不要使用只和文档相关的特征。这是第一条的极端情况，否则会导致类似哈利波特效应的情况出现，也就是一条在任何query下都受欢迎的文档不会到处都出现。去除掉只和文档相关的特征会阻止这种情况发生。

### Rule #36: Avoid feedback loops with positional features.

- 规则36：使用位置特征来避免反馈回路。
- 大家都知道排序位置本身就会影响用户是否会对物品产生互动，例如点击。所以如果模型中没有位置特征，本来由于位置导致的影响会被算到其他特征头上去，导致模型不够准。可以用加入位置特征的方法来避免这种问题，具体来讲，在训练时加入位置特征，预测时去掉位置特征，或者给所有样本一样的位置特征。这样会让模型更正确地分配特征的权重。
- 需要注意的是，位置特征要保持相对独立，不要与其他特征发生关联。可以将位置相关的特征用一个函数表达，然后将其他特征用另外的函数表达，然后组合起来。具体应用中，可以通过位置特征不与任何其他特征交叉来实现这个目的。

### Rule #37: Measure Training/Serving Skew.

- 规则37：衡量训练和服务之间的差异。
- 整体来讲有多种原因会导致这种差异，我们可以将其进行细分为以下几部分：
- 训练集和测试集之间的差异。这种差异会经常存在，而且不一定是坏事。
- 测试集和“第二天”数据间的差异。这种差异也会一直存在，而这个“第二天”数据上的表现是我们应该努力优化的，例如通过正则化。这两者之间差异如果过大，可能是因为用到了一些时间敏感的特征，导致模型效果变化明显。
- “第二天”数据和线上数据间的差异。如果同样一条样本，在训练时给出的结果和线上服务时给出的结果不一致，那么这意味着工程实现中出现了bug。

## ML Phase III: Slowed Growth, Optimization Refinement, and Complex Models

- 一般会有一些明确的信号来标识第二阶段的尾声。首先，每月的提升会逐步降低。你开始在不同指标之间做权衡，有的上升有的下降。嗯，游戏变得有趣了。既然收益不容易获得了，机器学习就得变得更复杂了。
- 在前两个阶段，大部分团队都可以过得很开心，但到了这个阶段，每个团队都需要找到适合自己的路。

### Rule #38: Don’t waste time on new features if unaligned objectives have become the issue.

- 规则38：如果objective没有达成一致，不要在新特征上浪费时间。
- 当系统整体达到一个稳定期，大家会开始关注机器学习系统优化目标以外的一些问题。这个时候，目标就不如之前那么清晰，那么如果目标没有确定下来的话，先不要在特征上浪费时间。

### Rule #39: Launch decisions are a proxy for long­term product goals.

- 规则39：上线决策是长期产品目标的代理。
- 这句话读起来有点别扭，作者举了几个例子来说明，我觉得核心就是在讲一件事情：系统、产品甚至公司的长远发展需要通过多个指标来综合衡量，而新模型是否上线要综合考虑这些指标。所谓代理，指的就是优化这些综合指标就是在优化产品、公司的长远目标。
- 决策只有在所有指标都在变好的情况下才会变得简单。但常常事情没那么简单，尤其是当不同指标之间无法换算的时候，例如A系统有一百万日活和四百万日收入，B系统有两百万日活和两百万日收入，你会从A切换到B吗？或者反过来？答案是或许都不会，因为你不知道某个指标的提升是否会cover另外一个指标的下降。
- 关键是，没有任何一个指标能回答：“五年后我的产品在哪里”？
- 而每个个体，尤其是工程师们，显然更喜欢能够直接优化的目标，而这也是机器学习系统常见的场景 。现在也有一些多目标学习系统在试图解决这种问题。但仍然有很多目标无法建模为机器学习问题，比如用户为什么会来访问你的网站等等。作者说这是个AI-complete问题，也常被称为强AI问题，简单来说就是不能用某个单一算法解决的问题。

### Rule #40: Keep ensembles simple.

- 规则40：ensemble策略保持简单。

- 什么叫简单的ensemble？作者认为，只接受其他模型的输出作为输入，不附带其他特征的ensemble，叫做简单的ensemble。换句话说，你的模型要么是单纯的ensemble模型，要么是普通的接收大量特征的基模型。
除了保持简单，ensemble模型最好还能具有一些良好的性质。例如，某个基模型的性能提升不能降低组合模型的性能。以及，基模型最好都是可解释的（例如是校准的)，这样基模型的变化对上层的组合模型来说也是可解释的。同时，一个基模型预测概率值的提升不会降低组合模型的预测概率值。

### Rule #41: When performance plateaus, look for qualitatively new sources of information to add rather than refining existing signals.

- 规则41：当效果进入稳定期，寻找本质上新的信息源，而不是优化已有的信号。
- 你加了一些用户的人口统计学特征，你加了一些文档的文字特征，等等，但是关键指标上的提升还不到1%。现在咋整？
- 这时就应该考虑加一些根本上不同的特征，例如用户再过去一天、一周看过的文档历史，或者另外一个数据源的数据。总之，要加入完全不同的维度的特征。此外也可以尝试使用深度学习，但同时也要调整你对ROI的预期，并且要评估增加的复杂度换来的收益是否值得。

### Rule #42: Don’t expect diversity, personalization, or relevance to be as correlated with popularity as you think they are.

- 规则42：多样性，个性化或者相关性与流行度的相关性关系可能要比你想的弱很多。
- 多样性意味着内容或者来源的多样性；个性化意味着每个用户得到不一样的东西；相关性意味着一个query的返回结果相比其他query与这个query更相关。所以这三个指标的含义都是与普通不一样。
- 但问题在于普通的东西很难被打败。
- 如果你的衡量指标是点击、停留时长、观看数、分享数等等，你本质上是在衡量东西的流行度。有的团队有时会希望学到一个多样化的个性化模型。为此，会加入个性化特征和多样化特征，但是最后会发现这些特征并没有得到预期的权重。
- 这并不能说明多样性、个性化和相关性不重要。像前文指出，可以通过后续的处理来增加多样性或相关性。如果这时看到长期目标提升了，你就可以确定多样性/相关性是有用的。这时你就可以选择继续使用后续处理的方式，或者根据多样性和相关性直接修改要优化的objective。

### Rule #43: Your friends tend to be the same across different products. Your interests tend not to be.

- 规则43：你在不同产品上的好友一般是一样的，但你的兴趣通常会不一样。
- 谷歌经常在不同产品上使用同样的好友关系预测模型，并且取得了很好的效果，这证明不同的产品上好友关系是可以迁移的，毕竟他们是固定的同一批人。但他们尝试将一个产品上的个性化特征使用到另外一个产品上时却常常得不到好结果。可行的做法是使用一个数据源上的原始数据来预测另外数据源上的行为，而不是使用加工后的特征。此外，用户在另一个数据源上的行为历史也会有用。

## 总结

- 从上面洋洋洒洒43条经验之谈中不难看出，大神作者认为，对于大多数机器学习应用场景来说，我们需要解决的问题大多数都是工程问题，解决这些工程问题需要的并不是复杂的理论，更多是对细节、架构、过程的仔细推敲和精致追求。而这些是我们非大神的普通人可以做到的，如果说大神做的是95分以上的系统，那么我们只要对工程架构、过程和细节做好足够的优化，我们也可以做出至少80分的系统。






# 结束
















