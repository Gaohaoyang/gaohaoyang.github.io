---
layout: post
title:  BERT及预训练语言模型-BERT-and-Language-Model
date:   2019-12-10 16:52:00
categories: 深度学习 
tags: 深度学习 自然语言处理 NLP Transformer BERT GPT Attention 蒸馏 Faiss Facebook TextCNN
excerpt: 预训练语言模型及BERT知识点汇总
mathjax: true
---

* content
{:toc}


# BERT及预训练语言模型

- [The Annotated Transformer](http://nlp.seas.harvard.edu/2018/04/03/attention.html),Harvard NLP出品，含pytorch版代码实现
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- [Transformer模型的PyTorch实现](https://luozhouyang.github.io/transformer/),[A PyTorch implementation of the Transformer model in "Attention is All You Need"](https://github.com/jadore801120/attention-is-all-you-need-pytorch)


## 总结

- 【2020-8-13】[打破BERT天花板：11种花式炼丹术刷爆NLP分类SOTA！](https://blog.csdn.net/abcdefg90876/article/details/108016310)
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy81ZmtuYjQxaWI5cUgxd240a08wQ1FpYkJlZGNiZzduemZCUTNKMTlPcTNnRFZxY1ZFbU1lMjhPWjlwZkQ0SkswanV1YVVZNjYwTEtzcUJteE5BUTU4WlRnLzY0MA?x-oss-process=image/format,png)
- NLP分类模型时间线
    - ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy81ZmtuYjQxaWI5cUYzaWJLQ05yOG9FakZjRDF5bE9pY1o5VHVHTlpKcUN1N0ZtcWliMHZKbmU3c0V5Z2ljQkFzdTc3RDdTbjN2a0pTR1hDaWM5OUZRelRpY0dqU3cvNjQw?x-oss-process=image/format,png)

## 预训练语言模型（PLMs）

- 【2020-9-9】[预训练语言模型(PLMs)走的飞快](https://zhuanlan.zhihu.com/p/93781241)
- ![](https://pic1.zhimg.com/v2-447ae7707604e7ac520555249332c42c_1440w.jpg)
- 预训练模型在经历中4个时代
    - 第一个是轰动性的**词嵌入**（Word Embedding）时代， 杰出代表是Word2Vec和Glove；
    - 第二个是**上下文嵌入**（Context Word Embedding），代表为CoVe和ELMO；
    - 第三个时代是**预训练模型**，代表是GPT和BERT； 
    - 第四个时代是**改进型**和**领域定制型**。 
        - 改进型代表为ALBERT和XLNet
        - 领域定制化(Domain Specific)代表为SciBert (Scientific Bert) 和BioBert(Biomedical Bert)。 



### Faiss简介

- `Faiss`是Facebook AI团队开源的针对聚类和相似性搜索库，为稠密向量提供**高效相似度搜索和聚类**，支持**十亿**级别向量的搜索，是目前最为成熟的**近似近邻搜索库**。它包含多种搜索**任意**大小向量集（备注：向量集大小由RAM内存决定）的算法，以及用于算法评估和参数调整的支持代码。Faiss用C++编写，并提供与Numpy完美衔接的Python接口。除此以外，对一些核心算法提供了GPU实现。相关介绍参考《[Faiss：Facebook 开源的相似性搜索类库](https://infoq.cn/article/2017/11/Faiss-Facebook)》
- Faiss对一些基础的算法提供了非常高效的实现
    - 聚类Faiss提供了一个高效的k-means实现
    - PCA降维算法
    - PQ(ProductQuantizer)编码/解码
- 组件
    - Faiss中最常用的是索引Index，而后是PCA降维、PQ乘积量化，这里针对Index和PQ进行说明，PCA降维从流程上都可以理解。
- 以图片搜索为例，所谓相似度搜索，便是在给定的一堆图片中，寻找出我指定的目标最像的K张图片，也简称为KNN（K近邻）问题。
    - ![](https://img2018.cnblogs.com/blog/1408825/201903/1408825-20190320225405798-259149897.png)

- [Faiss流程与原理分析](https://www.cnblogs.com/yhzhou/p/10568728.html)

Faiss 使用场景：最常见的人脸比对，指纹比对，基因比对等。

**Index使用**

Faiss处理固定维数d的向量集合，向量维度d通常为几十到几百。

faiss 三个最基础的 index. 分别是 IndexFlatL2, IndexIVFFlat, IndexIVFPQ，更多参见[Guidelines to choose an index](https://github.com/facebookresearch/faiss/wiki/Guidelines-to-choose-an-index)
- `IndexFlatL2`：最基础的Index
- `IndexIVFFlat`：更快的搜索，将数据集分割成几部分，加快搜索
    - d维空间中定义Voronoi单元格，并且每个数据库矢量都落入其中一个单元格中。在搜索时，只有查询x所在单元中包含的数据库向量y与少数几个相邻查询向量进行比较。(划分搜索空间)
        - 与数据库向量具有相同分布的任何向量集合上执行训练
        - 建索引，即`量化器`(quantizer)，它将矢量分配给Voronoi单元。每个单元由一个质心定义，找到一个矢量所在的Voronoi单元包括在质心集中找到该矢量的最近邻居。这是另一个索引的任务，通常是索引IndexFlatL2。
- `IndexIVFPQ`：内存开销更小.
    - IndexFlatL2和IndexIVFFlat都存储完整的向量，内存开销大
    - 基于产品量化器的有损压缩来压缩存储的向量的变体。压缩的方法基于乘积量化([Product Quantizer](https://hal.archives-ouvertes.fr/file/index/docid/514462/filename/paper_hal.pdf))，矢量没有精确存储，搜索方法返回的距离也是近似值。


IndexIVFFlat Demo 完整代码

```python
# encoding:utf-8
 
# Copyright (c) 2015-present, Facebook, Inc.
# All rights reserved.
#
# This source code is licensed under the BSD+Patents license found in the
# LICENSE file in the root directory of this source tree.
 
# author    : Facebook
# translate : h-j-13
 
import numpy as np
d = 64                              # 向量维度
nb = 100000                         # 向量集大小
nq = 10000                          # 查询次数
np.random.seed(1234)                # 随机种子,使结果可复现
xb = np.random.random((nb, d)).astype('float32')
xb[:, 0] += np.arange(nb) / 1000.
xq = np.random.random((nq, d)).astype('float32')
xq[:, 0] += np.arange(nq) / 1000.
 
import faiss
 
nlist = 100
k = 4
quantizer = faiss.IndexFlatL2(d)  # the other index
index = faiss.IndexIVFFlat(quantizer, d, nlist, faiss.METRIC_L2)
# here we specify METRIC_L2, by default it performs inner-product search
 
assert not index.is_trained
index.train(xb)
assert index.is_trained
 
index.add(xb)                  # 添加索引可能会有一点慢
D, I = index.search(xq, k)     # 搜索
print(I[-5:])                  # 最初五次查询的结果
index.nprobe = 10              # 默认 nprobe 是1 ,可以设置的大一些试试
D, I = index.search(xq, k)
print(I[-5:])                  # 最后五次查询的结果
```

IndexIVFFlat 完整代码

```python
# encoding:utf-8
 
# Copyright (c) 2015-present, Facebook, Inc.
# All rights reserved.
#
# This source code is licensed under the BSD+Patents license found in the
# LICENSE file in the root directory of this source tree.
 
# author    : Facebook
# translate : h-j-13
 
import numpy as np
 
d = 64                              # 向量维度
nb = 100000                         # 向量集大小
nq = 10000                          # 查询次数
np.random.seed(1234)                # 随机种子,使结果可复现
xb = np.random.random((nb, d)).astype('float32')
xb[:, 0] += np.arange(nb) / 1000.
xq = np.random.random((nq, d)).astype('float32')
xq[:, 0] += np.arange(nq) / 1000.
 
import faiss
 
nlist = 100
m = 8
k = 4
quantizer = faiss.IndexFlatL2(d)    # 内部的索引方式依然不变
index = faiss.IndexIVFPQ(quantizer, d, nlist, m, 8)
                                    # 每个向量都被编码为8个字节大小
index.train(xb)
index.add(xb)
D, I = index.search(xb[:5], k)      # 测试
print(I)
print(D)
index.nprobe = 10                   # 与以前的方法相比
D, I = index.search(xq, k)          # 检索
print(I[-5:])
```

- Faiss 索引类型：
    - Exact Search for L2 #基于L2距离的确定搜索匹配
    - Exact Search for Inner Product #基于内积的确定搜索匹配
    - Hierarchical Navigable Small World graph exploration #分层索引
    - Inverted file with exact post-verification #倒排索引
    - Locality-Sensitive Hashing (binary flat index) #本地敏感hash
    - Scalar quantizer (SQ) in flat mode #标量量化索引
    - Product quantizer (PQ) in flat mode #笛卡尔乘积索引
    - IVF and scalar quantizer #倒排+标量量化索引
    - IVFADC (coarse quantizer+PQ on residuals) #倒排+笛卡尔乘积索引
    - IVFADC+R (same as IVFADC with re-ranking based on codes) # 倒排+笛卡尔乘积索引 + 基于编码器重排



Faiss 开发资料：
- [github](https://github.com/facebookresearch/faiss)
- [tutorial](https://github.com/facebookresearch/faiss/wiki/Getting-started)
- [Faiss学习笔记](https://blog.csdn.net/u013185349/article/details/103637977)
- 基于Faiss的特征向量相似度搜索引擎[Milvus](https://milvus.io/cn/)


## 预训练语言模型

- PTMs: Pre-trained-Models in NLP，[NLP预训练模型的全面总结(持续更新中)](https://github.com/loujie0822/Pre-trained-Models/blob/master/README.md)
- 2020年3月18日，邱锡鹏老师发表了关于NLP预训练模型的综述《[Pre-trained Models for Natural Language Processing: A Survey](https://zhuanlan.zhihu.com/p/115014536?utm_source=qq&utm_medium=social&utm_oi=27211553832960#ref_1)》
- 知乎文章1:  [全面总结！PTMs：NLP预训练模型](https://zhuanlan.zhihu.com/p/115014536)   ![图片下载](https://github.com/loujie0822/Pre-trained-Models/blob/master/resources/PTMs.jpg)
- 知乎文章2：[nlp中的预训练语言模型总结](https://zhuanlan.zhihu.com/p/76912493)
- 知乎文章3：[nlp中的词向量对比](https://zhuanlan.zhihu.com/p/56382372)

<img src="https://pic3.zhimg.com/80/v2-0ace60ca3d843fc9b69c6965731f288e_720w.jpg" style="zoom:20%;" />

- 对比分析，摘自：[论文笔记 - Pre-trained Models for Natural Language Processing](http://www.shuang0420.com/2020/05/07/%E8%AE%BA%E6%96%87%E7%AC%94%E8%AE%B0%20-%20Pre-trained%20Models%20for%20Natural%20Language%20Processing/)，[Pre-trained Models for Natural Language Processing: A Survey](https://arxiv.org/abs/2003.08271)
   - LM（Language Modeling）是 NLP 中最常见的无监督任务，通常特指自回归或单向语言建模，BiLM 虽然结合了两个方向的语言模型，但只是两个方向的简单拼接，并不是真正意义上的双向语言模型。
   - MLM（Masked Language Modeling）可以克服传统单向语言模型的缺陷，结合双向的信息，但是 [MASK] 的引入使得预训练和 fine-tune 之间出现 gap
   - PLM（Permuted Language Modeling）则克服了这个问题，实现了双向语言模型和自回归模型的统一。
   - DAE（Denoising Autoencoder）接受部分损坏的输入，并以恢复原始输入为目标。与 MLM 不同，DAE 会给输入额外加一些噪声。
   - CTL（Contrastive Learning） 的原理是在对比中学习，其假设是一些 observed pairs of text 在语义上比随机采样的文本更为接近。CTL 比 LM 计算复杂度更低。
- 综述从四个方面（Representation Types、Architectures、Pre-training Task Types、Extensions）对现有 PTMs (Pre-trained Models) 进行了系统分类，一幅图来概括全文精华：
   - ![](http://images.shuang0420.com/images/%E8%AE%BA%E6%96%87%E7%AC%94%E8%AE%B0%20-%20Pre-trained%20Models%20for%20Natural%20Language%20Processing/taxonomy.png)

### 1、论文汇总：

PTMs-Papers:

1. https://github.com/thunlp/PLMpapers
2. https://github.com/tomohideshibata/BERT-related-papers
3. https://github.com/cedrickchee/awesome-bert-nlp
4. https://bertlang.unibocconi.it/
5. https://github.com/jessevig/bertviz

### 2. PTMs单模型解读

1. 自监督学习：[Self-Supervised Learning 入门介绍](https://zhuanlan.zhihu.com/p/108625273)
2. 自监督学习：[Self-supervised Learning 再次入门](https://zhuanlan.zhihu.com/p/108906502)
3. 词向量总结：[nlp中的词向量对比：word2vec/glove/fastText/elmo/GPT/bert](https://zhuanlan.zhihu.com/p/56382372)
4. 词向量总结：[从Word Embedding到Bert模型—自然语言处理中的预训练技术发展史](https://zhuanlan.zhihu.com/p/49271699)
5. ELMo解读：[关于ELMo的若干问题整理记录](https://zhuanlan.zhihu.com/p/82602015)
6. BERT解读： [Bert时代的创新：Bert应用模式比较及其它](https://zhuanlan.zhihu.com/p/65470719)
7. XLNET解读：[XLNet:运行机制及和Bert的异同比较](https://zhuanlan.zhihu.com/p/70257427)
8. XLNET解读：[XLnet：比Bert更强大的预训练模型](https://zhuanlan.zhihu.com/p/71759544)
9. RoBERTa解读：[RoBERT: 没错，我就是能更强——更大数据规模和仔细调参下的最优BERT](https://zhuanlan.zhihu.com/p/75629127)
10. 预训练语言模型总结：[nlp中的预训练语言模型总结(单向模型、BERT系列模型、XLNet)](https://zhuanlan.zhihu.com/p/76912493)
11. 预训练语言模型总结：[8篇论文梳理BERT相关模型进展与反思](https://zhuanlan.zhihu.com/p/81157740)
12. ELECTRA解读: [ELECTRA: 超越BERT, 19年最佳NLP预训练模型](https://zhuanlan.zhihu.com/p/89763176)
13. 模型压缩 LayerDrop:[结构剪枝：要个4层的BERT有多难？](https://zhuanlan.zhihu.com/p/93207254)
14. 模型压缩 BERT-of-Theseus:[bert-of-theseus，一个非常亲民的bert压缩方法](https://zhuanlan.zhihu.com/p/112787764)
15. 模型压缩 TinyBERT:[比 Bert 体积更小速度更快的 TinyBERT](https://zhuanlan.zhihu.com/p/94359189)
16. 模型压缩总结：[BERT 瘦身之路：Distillation，Quantization，Pruning](https://zhuanlan.zhihu.com/p/86900556)


## 中文模型下载

- 2019年，哈工大与讯飞出品：[Chinese-BERT-wwm](https://github.com/ymcui/Chinese-BERT-wwm)
- 本目录中主要包含base模型，故我们不在模型简称中标注`base`字样。对于其他大小的模型会标注对应的标记（例如large）。

* **`BERT-large模型`**：24-layer, 1024-hidden, 16-heads, 330M parameters  
* **`BERT-base模型`**：12-layer, 768-hidden, 12-heads, 110M parameters  

| 模型简称 | 语料 | Google下载 | 讯飞云下载 |
| :------- | :--------- | :---------: | :---------: |
| **`RBTL3, Chinese`** | **中文维基+<br/>通用数据<sup>[1]</sup>** | **[TensorFlow](https://drive.google.com/open?id=1Jzn1hYwmv0kXkfTeIvNT61Rn1IbRc-o8)**<br/>**[PyTorch](https://drive.google.com/open?id=1qs5OasLXXjOnR2XuGUh12NanUl0pkjEv)** | **[TensorFlow（密码vySW）](https://pan.iflytek.com:443/link/0DD18FAC080BAF75DBA28FB5C0047760)**<br/>**[PyTorch（密码rgCs）](https://pan.iflytek.com:443/link/7C6A513BED2D42170B6DBEE5A866FB3F)** |
| **`RBT3, Chinese`** | **中文维基+<br/>通用数据<sup>[1]</sup>** | **[TensorFlow](https://drive.google.com/open?id=1-rvV0nBDvRCASbRz8M9Decc3_8Aw-2yi)**<br/>**[PyTorch](https://drive.google.com/open?id=1_LqmIxm8Nz1Abvlqb8QFZaxYo-TInOed)** | **[TensorFlow（密码b9nx）](https://pan.iflytek.com:443/link/275E5B46185C982D4AF5AC295E1651B6)**<br/>**[PyTorch（密码Yoep）](https://pan.iflytek.com:443/link/A094EB0A73B1E7209FEBC6C5CF7AEF27)** |
| **`RoBERTa-wwm-ext-large, Chinese`** | **中文维基+<br/>通用数据<sup>[1]</sup>** | **[TensorFlow](https://drive.google.com/open?id=1dtad0FFzG11CBsawu8hvwwzU2R0FDI94)**<br/>**[PyTorch](https://drive.google.com/open?id=1-2vEZfIFCdM1-vJ3GD6DlSyKT4eVXMKq)** | **[TensorFlow（密码u6gC）](https://pan.iflytek.com:443/link/AC056611607108F33A744A0F56D0F6BE)**<br/>**[PyTorch（密码43eH）](https://pan.iflytek.com:443/link/9B46A0ABA70C568AAAFCD004B9A2C773)** |
| **`RoBERTa-wwm-ext, Chinese`** | **中文维基+<br/>通用数据<sup>[1]</sup>** | **[TensorFlow](https://drive.google.com/open?id=1jMAKIJmPn7kADgD3yQZhpsqM-IRM1qZt)** <br/>**[PyTorch](https://drive.google.com/open?id=1eHM3l4fMo6DsQYGmey7UZGiTmQquHw25)** | **[TensorFlow（密码Xe1p）](https://pan.iflytek.com:443/link/98D11FAAF0F0DBCB094EE19CCDBC98BF)** <br/>**[PyTorch（密码waV5）](https://pan.iflytek.com:443/link/92ADD2C34C91F3B44E0EC97F101F89D8)**|
| **`BERT-wwm-ext, Chinese`** | **中文维基+<br/>通用数据<sup>[1]</sup>** | **[TensorFlow](https://drive.google.com/open?id=1buMLEjdtrXE2c4G1rpsNGWEx7lUQ0RHi)** <br/>**[PyTorch](https://drive.google.com/open?id=1iNeYFhCBJWeUsIlnW_2K6SMwXkM4gLb_)** | **[TensorFlow（密码4cMG）](https://pan.iflytek.com:443/link/653637473FFF242C3869D77026C9BDB5)** <br/>**[PyTorch（密码XHu4）](https://pan.iflytek.com:443/link/B9ACE1C9F228A0F42242672EF6CE1721)** |
| **`BERT-wwm, Chinese`** | **中文维基** | **[TensorFlow](https://drive.google.com/open?id=1RoTQsXp2hkQ1gSRVylRIJfQxJUgkfJMW)** <br/>**[PyTorch](https://drive.google.com/open?id=1AQitrjbvCWc51SYiLN-cJq4e0WiNN4KY)** | **[TensorFlow（密码07Xj）](https://pan.iflytek.com:443/link/A2483AD206EF85FD91569B498A3C3879)** <br/>**[PyTorch（密码hteX）](https://pan.iflytek.com:443/link/5DBDD89414E5B565D3322D6B7937DF47)** |
| `BERT-base, Chinese`<sup>Google</sup> | 中文维基 | [Google Cloud](https://storage.googleapis.com/bert_models/2018_11_03/chinese_L-12_H-768_A-12.zip) | - |
| `BERT-base, Multilingual Cased`<sup>Google</sup>  | 多语种维基 | [Google Cloud](https://storage.googleapis.com/bert_models/2018_11_23/multi_cased_L-12_H-768_A-12.zip) | - |
| `BERT-base, Multilingual Uncased`<sup>Google</sup>  | 多语种维基 | [Google Cloud](https://storage.googleapis.com/bert_models/2018_11_03/multilingual_L-12_H-768_A-12.zip) | - |

> [1] 通用数据包括：百科、新闻、问答等数据，总词数达5.4B，处理后的文本大小约10G

以上预训练模型以TensorFlow版本的权重为准。
对于PyTorch版本，我们使用的是由Huggingface出品的[PyTorch-Transformers 1.0](https://github.com/huggingface/pytorch-transformers)提供的转换脚本。
如果使用的是其他版本，请自行进行权重转换。
中国大陆境内建议使用讯飞云下载点，境外用户建议使用谷歌下载点，base模型文件大小约**400M**。 


## BERT

- 2018年11月底，谷歌发布了基于双向 `Transformer` 的大规模预训练语言模型 `BERT`，该预训练模型能高效抽取文本信息并应用于各种 NLP 任务，该研究凭借预训练模型刷新了 11 项 NLP 任务的当前最优性能记录。
- 技术博主 Jay Alammar 近日发文[illustrated-bert](https://jalammar.github.io/illustrated-bert/)，通过图解方式生动地讲解了 BERT 的架构和方法基础。
- 2018 年是机器学习模型处理文本（更准确地说是自然语言处理，简称 NLP）的一个转折点。

![](https://image.jiqizhixin.com/uploads/editor/5442b9f1-17ca-49b3-a259-e5fb52107534/1544732034404.png)

![](https://image.jiqizhixin.com/uploads/editor/87b820e3-dc5c-4f9f-97f6-6a01360156b7/1544732034725.png)


- 下游任务

![](https://image.jiqizhixin.com/uploads/editor/41afd366-28b8-4aa1-8464-5f10d253cb48/1544732037865.png)


## BERT应用

- ![](https://pic3.zhimg.com/80/v2-09c5df603126e72b4ba2b0a9a45ee1b6_720w.jpg)



## BERT变种



## BERT服务

### ES里的BERT索引

- 【2020-7-11】ES开始支持embedding的BERT索引，[Elasticsearch遇上BERT：使用Elasticsearch和BERT构建搜索引擎](https://mp.weixin.qq.com/s/PzhdvwsR3ru2u_oVqSxxPQ)

### BERT-as-service

- Google 已经公开了 TensorFlow 版本的预训练模型和代码，可以用于生成词向量，但是还有更简单的方法：直接调用封装好的库 bert-as-service 。
![](https://img-blog.csdnimg.cn/20190521201148390.gif)

- bert-as-service 是腾讯 AI Lab 开源的一个 BERT 服务（肖涵开发），它让用户可以以调用服务的方式使用 BERT 模型而不需要关注 BERT 的实现细节。bert-as-service 分为客户端和服务端，用户可以从 python 代码中调用服务，也可以通过 http 的方式访问。
- - [快速使用 BERT 生成词向量：bert-as-service](https://blog.csdn.net/qq_34832393/article/details/90414293)

- 【2020-8-20】以fastapi为基础的[NLP as a Service](https://github.com/abhimishra91/insight)
- Project Insight is designed to create NLP as a service with code base for both front end GUI (streamlit) and backend server (FastApi) the usage of transformers models on various downstream NLP task.
    - The downstream NLP tasks covered:
    - News Classification
    - Entity Recognition
    - Sentiment Analysis
    - Summarization
    - Information Extraction To Do

#### 安装
- 
- 用 pip 命令进行安装，客户端与服务端可以安装在不同的机器上：
```shell
pip install bert-serving-server # 服务端
pip install bert-serving-client # 客户端，与服务端互相独立
```
- 其中，服务端的运行环境为 Python >= 3.5 和 Tensorflow >= 1.10
- 客户端可以运行于 Python 2 或 Python 3

#### 下载预训练模型

- 根据 NLP 任务的类型和规模不同，[Google](https://github.com/google-research/bert#pre-trained-models) 提供了多种预训练模型供选择：
    - [BERT-Base, Chinese](https://storage.googleapis.com/bert_models/2018_11_03/chinese_L-12_H-768_A-12.zip): 简繁体中文, 12-layer, 768-hidden, 12-heads, 110M parameters
    - [BERT-Base, Multilingual Cased](https://storage.googleapis.com/bert_models/2018_11_23/multi_cased_L-12_H-768_A-12.zip): 多语言（104 种）, 12-layer, 768-hidden, 12-heads, 110M parameters
    - [BERT-Base, Uncased](https://storage.googleapis.com/bert_models/2018_10_18/uncased_L-12_H-768_A-12.zip): 英文不区分大小写（全部转为小写）, 12-layer, 768-hidden, 12-heads, 110M parameters
    - [BERT-Base, Cased](https://storage.googleapis.com/bert_models/2018_10_18/cased_L-12_H-768_A-12.zip): 英文区分大小写, 12-layer, 768-hidden, 12-heads , 110M parameters
- 也可以使用中文效果更好的哈工大版 BERT：[Chinese-BERT-wwm](https://github.com/ymcui/Chinese-BERT-wwm)
- 解压下载到的 .zip 文件以后，会有 6 个文件：
    - TensorFlow 模型文件（bert_model.ckpt) 包含预训练模型的权重，模型文件有三个
    - 字典文件（vocab.txt) 记录词条与 id 的映射关系
    - 配置文件（bert_config.json ) 记录模型的超参数

#### 启动 BERT 服务

- 使用 bert-serving-start 命令启动服务：
    - bert-serving-start -model_dir /tmp/english_L-12_H-768_A-12/ -num_worker=2
    - 其中，-model_dir 是预训练模型的路径，-num_worker 是线程数，表示同时可以处理多少个并发请求
- 如果启动成功，服务器端会显示：
![](https://img-blog.csdnimg.cn/20190521201200157.gif)

#### 在客户端获取句向量

- 可以简单的使用以下代码获取语料的向量表示：

```python
from bert_serving.client import BertClient
bc = BertClient()
doc_vecs = bc.encode(['First do it', 'then do it right', 'then do it better'])
```
- doc_vecs 是一个 numpy.ndarray ，它的每一行是一个固定长度的句子向量，长度由输入句子的最大长度决定。如果要指定长度，可以在启动服务使用 max_seq_len 参数，过长的句子会被从右端截断。

- BERT 的另一个特性是可以获取一对句子的向量，句子之间使用 ||| 作为分隔，例如：

```python
bc.encode(['First do it ||| then do it right'])
```

#### 获取词向量

- 启动服务时将参数 pooling_strategy 设置为 None ：

```shell
bert-serving-start -pooling_strategy NONE -model_dir /tmp/english_L-12_H-768_A-12/
```
- 这时的返回是语料中每个 token 对应 embedding 的矩阵

```python
bc = BertClient()
vec = bc.encode(['hey you', 'whats up?'])

vec  # [2, 25, 768]
vec[0]  # [1, 25, 768], sentence embeddings for `hey you`
vec[0][0]  # [1, 1, 768], word embedding for `[CLS]`
vec[0][1]  # [1, 1, 768], word embedding for `hey`
vec[0][2]  # [1, 1, 768], word embedding for `you`
vec[0][3]  # [1, 1, 768], word embedding for `[SEP]`
vec[0][4]  # [1, 1, 768], word embedding for padding symbol
vec[0][25]  # error, out of index!
```
#### 远程调用 BERT 服务

- 可以从一台机器上调用另一台机器的 BERT 服务：

```python
# on another CPU machine
from bert_serving.client import BertClient
bc = BertClient(ip='xx.xx.xx.xx')  # ip address of the GPU machine
bc.encode(['First do it', 'then do it right', 'then do it better'])
```
- 这个例子中，只需要在客户端 pip install -U bert-serving-client

#### 其他

- 配置要求
    - BERT 模型对内存有比较高的要求，如果启动时一直卡在 load graph from model_dir 可以将 num_worker 设置为 1 或者加大机器内存。
- 处理中文是否要提前分词
    - 在计算中文向量时，可以直接输入整个句子不需要提前分词。因为 Chinese-BERT 中，语料是以字为单位处理的，因此对于中文语料来说输出的是字向量。
- 举个例子，当用户输入：

```python
bc.encode(['hey you', 'whats up?', '你好么？', '我 还 可以'])
```
- 实际上，BERT 模型的输入是：

```
tokens: [CLS] hey you [SEP]
input_ids: 101 13153 8357 102 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
input_mask: 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0

tokens: [CLS] what ##s up ? [SEP]
input_ids: 101 9100 8118 8644 136 102 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
input_mask: 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0

tokens: [CLS] 你 好 么 ？ [SEP]
input_ids: 101 872 1962 720 8043 102 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
input_mask: 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0

tokens: [CLS] 我 还 可 以 [SEP]
input_ids: 101 2769 6820 1377 809 102 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
input_mask: 1 1 1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
```
- 在英语中词条化后的 ##something 是什么
    - 当某个词在不在词典中时，使用最长子序列的方法进行词条化，例如：

```python
input = "unaffable"
tokenizer_output = ["un", "##aff", "##able"]
```

# 模型蒸馏


## 背景

![](https://pics3.baidu.com/feed/4b90f603738da977703daa3003be0a1c8718e394.jpeg)

- 上图展示了很多基于 Transformer 的模型，模型下方的数字对应了模型的参数数量，单位是百万，可以看到这些模型变得越来越大。这些模型的体积也限制了其在现实世界中的使用，因为各方面因素：
    - 这种模型的训练花费大量的金钱，需要使用昂贵的 GPU 服务器才能提供大规模的服务。
    - 模型太大导致 inference 的时间也变长，不能用于一些实时性要求高的任务中。
    - 现在有不少机器学习任务需要运行在终端上，例如智能手机，这种情况也必须使用轻量级的模型。
- 基于以上的原因，不少研究开始针对 BERT 模型压缩进行，常见的模型压缩方法有以下几种：
    - `模型蒸馏` Distillation，使用大模型的学到的知识训练小模型，从而让小模型具有大模型的泛化能力。
    - `量化` Quantization，降低大模型的精度，减小模型。
    - `剪枝` Pruning，去掉模型中作用比较小的连接。
    - `参数共享`，共享网络中部分参数，降低模型参数数量。
- ALBERT 也是一种 BERT 压缩方法，主要是用了**参数共享**和**矩阵分解**的方法压缩 BERT，但是 ALBERT 只减少模型的参数，并不能减少其 inference 的时间。
- 两种使用模型蒸馏压缩 BERT 的算法
    - 第一种是 **DistilBERT**，将 12 层的 BERT-base 模型蒸馏到 6 层的 BERT 模型；
    - 第二种是将 BERT 模型蒸馏到 BiLSTM 模型。
- 更多内容：[BERT 模型蒸馏 Distillation BERT](https://baijiahao.baidu.com/s?id=1653807606350367881&wfr=spider&for=pc)


- 模型压缩和加速四个技术是**设计高效小型网络**、**剪枝**、**量化**和**蒸馏**
- 2015年，Hinton等人首次提出神经网络中的**知识蒸馏**(`Knowledge Distillation`, KD)技术/概念。较前者的一些工作，这是一个通用而简单的、不同的模型压缩技术。
    - 论文：[Distilling the Knowledge in a Neural Network](https://arxiv.org/pdf/1503.02531.pdf)
- ![](https://pic4.zhimg.com/v2-5ae8936f30eaef7f0d17d265adbd4fd1_1440w.jpg?source=172ae18b)
- `蒸馏`，就是**知识蒸馏**，将**教师网络**(teacher network)的知识迁移到**学生网络**(student network)上，使得学生网络的性能表现如教师网络一般，这样就可以愉快地将学生网络部署到移动手机和其它边缘设备上。
    - 第一，利用大规模数据训练一个教师网络；
    - 第二，利用大规模数据训练一个学生网络，这时候的损失函数由两部分组成：
        - 一部分是拿教师和学生网络的输出logits计算蒸馏损失/KL散度，见[2]中的(4)式
        - 一部分是拿学生网络的输出和数据标签计算交叉熵损失。
- 通常会进行两种方向的蒸馏
    - 一种是**大模型瘦身**：from deep and large to shallow and small network
    - 另一种是**集成模型单一化**：from ensembles of classifiers to individual classifier。

![](https://pic1.zhimg.com/80/v2-891ca916ce38cae61af55bd25f9f1694_720w.jpg)


过去一直follow着transformer系列模型的进展，从BERT到GPT2再到XLNet。然而随着模型体积增大，线上性能也越来越差，所以决定开一条新线，开始follow模型压缩之模型蒸馏的故事线。
 
Hinton在NIPS2014[\[1\]](https://zhuanlan.zhihu.com/p/71986772#ref_1)提出了`知识蒸馏`（Knowledge Distillation）的概念，旨在把一个大模型或者多个模型ensemble学到的知识迁移到另一个轻量级单模型上，方便部署。简单的说就是用新的小模型去学习大模型的预测结果，改变一下目标函数。听起来是不难，但在实践中小模型真的能拟合那么好吗？所以还是要多看看别人家的实验，掌握一些trick。
 
## 0. 名词解释
--------
 
*   teacher - 原始模型或模型ensemble
*   student - 新模型
*   transfer set - 用来迁移teacher知识、训练student的数据集合
*   soft target - teacher输出的预测结果（一般是softmax之后的概率）
*   hard target - 样本原本的标签
*   temperature - 蒸馏目标函数中的超参数
*   born-again network - 蒸馏的一种，指student和teacher的结构和尺寸完全一样
*   teacher annealing - 防止student的表现被teacher限制，在蒸馏时逐渐减少soft targets的权重
 
## 1. 基本思想
--------

- 知识蒸馏是让一个小模型去学习一个大模型，所以首先会有一个预训练好的大模型，称之为**Teacher模型**，小模型被称为**Student模型**。知识蒸馏的方法就是会让Student模型去尽量拟合。
- 这个的动机就在于跟ground truth的one-hot编码相比，Teacher模型的输出概率分布包含着更多的信息，从Teacher模型的概率分布中学习，能让Student模型充分去模拟Teacher模型的行为。
- 在具体的学习Teacher模型概率分布这个过程中，知识蒸馏还引入了温度的概念
- Teacher和Student的logits都先除以一个参数T，然后再去做softmax，得到的概率值再去做交叉熵。
- 温度T控制着Student模型学习的程度
    - 当T>1时，Student模型学习的是一个更加平滑的概率分布
    - 当T<1时，则是更加陡峭的分布。
- 因此，学习过程中，T一般是一个逐渐变小的过程。
- Teacher模型经过温度T之后的输出被称之为soft labels。


### 知识蒸馏方法

- 第一步，训练Net-T；
- 第二步，高温蒸馏：在高温T下，蒸馏Net-T的知识到Net-S

- [知识蒸馏示意图](https://nervanasystems.github.io/distiller/knowledge_distillation.html)
![](https://img-blog.csdn.net/20181015215000704?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3hiaW53b3JsZA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)
![](https://pic3.zhimg.com/80/v2-d01f5142d06aa27bc5e207831b5131d9_720w.jpg)

### Teacher Model和Student Model

- 知识蒸馏使用的是Teacher—Student模型，其中teacher是“知识”的输出者，student是“知识”的接受者。知识蒸馏的过程分为2个阶段:
    - **原始模型**训练: 训练"Teacher模型", 简称为Net-T，它的特点是模型相对复杂，也可以由多个分别训练的模型集成而成。我们对"Teacher模型"不作任何关于模型架构、参数量、是否集成方面的限制，唯一的要求就是，对于输入X, 其都能输出Y，其中Y经过softmax的映射，输出值对应相应类别的概率值。
    - **精简模型**训练: 训练"Student模型", 简称为Net-S，它是参数量较小、模型结构相对简单的单模型。同样的，对于输入X，其都能输出Y，Y经过softmax映射后同样能输出对应相应类别的概率值。

### 知识蒸馏的关键点

- 如果回归机器学习最最基础的理论，可以很清楚地意识到一点(而这一点往往在我们深入研究机器学习之后被忽略): <font color='red'>机器学习最根本的目的在于训练出在某个问题上泛化能力强的模型</font>。
    - 泛化能力强: 在某问题的所有数据上都能很好地反应输入和输出之间的关系，无论是训练数据，还是测试数据，还是任何属于该问题的未知数据。
- 而现实中，由于我们不可能收集到某问题的所有数据来作为训练数据，并且新数据总是在源源不断的产生，因此我们只能退而求其次，训练目标变成在已有的训练数据集上建模输入和输出之间的关系。由于训练数据集是对真实数据分布情况的采样，训练数据集上的最优解往往会多少偏离真正的最优解(这里的讨论不考虑模型容量)。
- 而在知识蒸馏时，由于我们已经有了一个泛化能力较强的Net-T，我们在利用Net-T来蒸馏训练Net-S时，可以直接让Net-S去学习Net-T的泛化能力。

- 一个很直白且高效的迁移泛化能力的方法就是使用softmax层输出的类别的概率来作为“soft target”。
    - 传统training过程(hard targets): 对ground truth求极大似然
    - KD的training过程(soft targets): 用large model的class probabilities作为soft targets

- softmax层的输出，除了正例之外，负标签也带有大量的信息，比如某些负标签对应的概率远远大于其他负标签。而在传统的训练过程(hard target)中，所有负标签都被统一对待。也就是说，KD的训练方式使得每个样本给Net-S带来的信息量大于传统的训练方式。

- ![](https://pic2.zhimg.com/80/v2-a9e90626c5ac6f64a7e04c89f6ce3013_720w.jpg)

### 1.1 为什么蒸馏可以work
 
好模型的目标不是拟合训练数据，而是学习如何泛化到新的数据。所以蒸馏的目标是让student学习到teacher的泛化能力，理论上得到的结果会比单纯拟合训练数据的student要好。另外，对于分类任务，如果soft targets的熵比hard targets高，那显然student会学习到更多的信息。

### 1.2 蒸馏时的softmax
 
![[公式]](https://www.zhihu.com/equation?tex=q_i+%3D+%5Cfrac%7Bexp%28z_i%2FT%29%7D%7B%5Csum_%7Bj%7D%7Bexp%28z_j%2FT%29%7D%7D+%5C%5C)
 
比之前的softmax多了一个参数T（temperature），T越大产生的概率分布越平滑。
 
有两种蒸馏的目标函数：
- 1.  只使用soft targets：在蒸馏时teacher使用新的softmax产生soft targets；student使用新的softmax在transfer set上学习，和teacher使用相同的T。
- 2.  同时使用soft和hard targets：student的目标函数是hard target和soft target目标函数的加权平均，使用hard target时T=1，soft target时T和teacher的一样。Hinton的经验是给hard target的权重小一点。另外要注意的是，因为在求梯度（导数）时新的目标函数会导致梯度是以前的 ![[公式]](https://www.zhihu.com/equation?tex=1%2FT%5E2) ，所以要再乘上 ![[公式]](https://www.zhihu.com/equation?tex=T%5E2) ，不然T变了的话hard target不减小（T=1），但soft target会变。
- 3.  直接用logits的MSE（是1的special case）

### 1.3 温度代表了什么，如何选取合适的温度？

- 温度: T就是温度
    - ![](https://www.zhihu.com/equation?tex=q_%7Bi%7D%3D%5Cfrac%7B%5Cexp+%5Cleft%28z_%7Bi%7D+%2F+T%5Cright%29%7D%7B%5Csum_%7Bj%7D+%5Cexp+%5Cleft%28z_%7Bj%7D+%2F+T%5Cright%29%7D)
    -  T越高，softmax的output probability distribution越趋于平滑，其分布的熵越大，负标签携带的信息会被相对地放大，模型训练将更加关注负标签。
- 温度的高低改变的是Net-S训练过程中对负标签的关注程度: 温度较低时，对负标签的关注，尤其是那些显著低于平均值的负标签的关注较少；而温度较高时，负标签相关的值会相对增大，Net-S会相对多地关注到负标签。
- 实际上，负标签中包含一定的信息，尤其是那些值显著高于平均值的负标签。但由于Net-T的训练过程决定了负标签部分比较noisy，并且负标签的值越低，其信息就越不可靠。因此温度的选取比较empirical，本质上就是在下面两件事之中取舍:
    - 从有部分信息量的负标签中学习 --> 温度要高一些
    - 防止受负标签中噪声的影响 -->温度要低一些
- 总的来说，T的选择和Net-S的大小有关，Net-S参数量比较小的时候，相对比较低的温度就可以了（因为参数量小的模型不能capture all knowledge，所以可以适当忽略掉一些负标签的信息）

## 2. 蒸馏经验

--------
 
### 2.1 Transfer Set和Soft target
 
*   实验证实，Soft target可以起到正则化的作用（不用soft target的时候需要early stopping，用soft target后稳定收敛）
*   数据过少的话无法完整表达teacher学到的知识，需要增加无监督数据（用teacher的预测作为标签）或进行数据增强，可以使用的方法有：1.增加\[MASK\]，2.用相同POS标签的词替换，2.随机n-gram采样，具体步骤参考文献2

### 2.2 超参数T

*   T越大越能学到teacher模型的泛化信息。比如MNIST在对2的手写图片分类时，可能给2分配0.9的置信度，3是1e-6，7是1e-9，从这个分布可以看出2和3有一定的相似度，因此这种时候可以调大T，让概率分布更平滑，展示teacher更多的泛化能力
*   T可以尝试1～20之间
 
### 2.3 BERT蒸馏
 
*   蒸馏单BERT[\[2\]](https://zhuanlan.zhihu.com/p/71986772#ref_2)：模型架构：单层BiLSTM；目标函数：logits的MSE
*   蒸馏Ensemble BERT[\[3\]](https://zhuanlan.zhihu.com/p/71986772#ref_3)：模型架构：BERT；目标函数：soft prob+hard prob；方法：MT-DNN。该论文用给每个任务训练多个MT-DNN，取soft target的平均，最后再训一个MT-DNN，效果比纯BERT好3.2%。但感觉该研究应该是刷榜的结晶，平常应该没人去训BERT ensemble吧。。
*   BAM[\[4\]](https://zhuanlan.zhihu.com/p/71986772#ref_4)：Born-aging Multi-task。用多个任务的Single BERT，蒸馏MT BERT；目标函数：多任务loss的和；方法：在mini-batch中打乱多个任务的数据，任务采样概率为 ![[公式]](https://www.zhihu.com/equation?tex=%7CD_%5Ctau%7C%5E%7B0.75%7D) ，防止某个任务数据过多dominate模型、teacher annealing、layerwise-learning-rate，LR由输出层到输出层递减，因为前面的层需要学习到general features。最终student在大部分任务上超过teacher，而且上面提到的tricks也提供了不少帮助。文献4还不错，推荐阅读一下。
*   TinyBERT[\[5\]](https://zhuanlan.zhihu.com/p/71986772#ref_5)：截止201910的SOTA。利用Two-stage方法，分别对预训练阶段和精调阶段的BERT进行蒸馏，并且不同层都设计了损失函数。与其他模型的对比如下：
 
![](https://pic1.zhimg.com/80/v2-06423040ac6234d719d80cab1820adbb_720w.jpg)
 
 
## 3. 总结
------
 
再重点强调一下，student学习的是teacher的泛化能力，而不是“过拟合训练数据”。
 
目前读的论文不是很多，但个人感觉还是有些炼丹的感觉。文献2中的BERT蒸馏任务，虽然比无蒸馏条件下有将近5个点的提升，但作者没有研究到底是因为数据增多还是蒸馏带来的提升。而且仍然距BERT有很大的距离，虽然速度提升了，但效果并不能上线。文献3中虽然有了比BERT更好的效果，但并没有用轻量的结构，性能还是不变。
 
接下来我会花时间读更多的论文，写新文章或把tricks加进这篇文章里，同学们有好的经验也可以说一下。

补充一些资源，还没仔细看：
1.  [dkozlov/awesome-knowledge-distillation](https://link.zhihu.com/?target=https%3A//github.com/dkozlov/awesome-knowledge-distillation)
2.  [Distilling BERT Models with spaCy](https://link.zhihu.com/?target=http%3A//www.nlp.town/blog/distilling-bert/%3Futm_campaign%3DNLP%2520News%26utm_medium%3Demail%26utm_source%3DRevue%2520newsletter)
3.  [DistilBERT](https://link.zhihu.com/?target=https%3A//medium.com/huggingface/distilbert-8cf3380435b5)
4.  [Multilingual MiniBERT: Tsai et al. (EMNLP 2019)](https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/1909.00100)


# GPT模型

- 【2019-2】张俊林：[效果逆天的通用语言模型 GPT 2.0 来了，它告诉了我们什么？](https://www.infoq.cn/article/pW8YaUXjTuhC6d0p*OwX)
- [OpenAI GPT-3 API](https://openai.com/blog/openai-api/)，[Github地址](https://github.com/elyase/awesome-gpt3#awesome-gpt-3)
- ![](https://github.com/elyase/awesome-gpt3/raw/master/screenshot.png)

- Jay Alammar杰作：[怎样向产品解释GPT-3](http://jalammar.github.io/how-gpt3-works-visualizations-animations/)
![](http://jalammar.github.io/images/gpt3/05-gpt3-generate-output-context-window.gif)

- 资料
    - [GPT-3的50种玩法告诉你，它很酷，但是没有通过图灵测试](https://www.toutiao.com/a6855330183403012621/)
    - [最新最全GPT-3模型网络结构详细解析](https://www.toutiao.com/i6858589917883138571/)
- 发展历史
    - 2018年6月，OpenAI的研究人员使用了一种新颖的组合，将生成式深度学习架构Transformer和无监督预训练（也称为自监督学习）结合起来，得到了GPT模型。
    - Transformer的自注意力机制提供了一种通用的方式来对输入的各个部分进行建模，使其依赖于输入的其他部分（需要大量计算）。
    - Transformer和无监督预训练的组合不限于GPT系列模型。Google，Facebook和许多大学实验室相继提出了BERT、XLNet等语言模型。
    - 到2019年初，OpenAI改进了其基础架构，将参数和数据数量增加10倍来扩展同一模型，即GPT-2。
    - 随后，OpenAI推出了SparseTransformer，它是对早期Transformer模型的改进，可以可靠地处理更长的文档。
    - 2020年，OpenAI通过其beta API发布了GPT-3，引起了人们的关注。GPT-3不仅扩大了GPT-2上使用的数据量和计算量，而且用SparseTransformer取代了原始Transformer，从而产生了迄今为止具有最佳zero-shot 和 few-shot学习性能的模型。
    - GPT-3的few-shot学习能力使得它具备了一些非常有趣的演示功能，包括自动代码生成、“搜索引擎”、写作辅助和创意小说等。

- 【2020-8-10】[京东副总裁何晓冬：GPT-3后，人机对话与交互何去何从？CCF-GAIR 2020](https://www.leiphone.com/news/202008/BC6XqIXF3ifH6uvV.html)
![](https://static.leiphone.com/uploads/new/images/20200810/5f311dc980e89.jpg?imageView2/2/w/740)

## 模型结构

- 原始GPT网络结构
    - ![](https://p6-tt.byteimg.com/origin/pgc-image/f3fcfe5dd66149a59d4adb1c82b5a812?from=pc)
- 常见文本生成
    - 并非所有英雄都穿 -> **斗篷**
- GPT生成
    - 并非所有英雄都披着斗篷 -> **但**
    - 并非所有英雄都披着斗篷 ，但-> **全部**
    - 并非所有英雄都披着斗篷，但全部 -> **恶棍**
    - 并非所有英雄都披着斗篷，但全部恶棍 -> **做**
- 说明
    - 1. 输入序列固定在2048个字（对于GPT-3）以内。将短序列作为输入时，只需用“空”值填充。
    - 2. GPT输出不仅是一次预测（概率），而是一系列预测（长度2048）（每个可能单词的概率）。序列中每个“next”位置都是一个预测。但是在生成文本时，通常只查看序列中最后一个单词的预测。
    - 3. 为了提高效率，GPT-3实际上使用字节级（byte-level）字节对编码（[BPE](https://huggingface.co/transformers/tokenizer_summary.html)）进行Token化。
    - 4. 对当前Token在序列中的位置进行编码，将Token的位置（标量i，在[0-2047]中）传递给12288个正弦函数，每个函数的频率都不同

![](https://p6-tt.byteimg.com/origin/pgc-image/f900defa52ba43f89260c42eaaee237a?from=pc)

## 被玩high的GPT-3


- GitHub项目中的50种玩法，感兴趣的同学们可以继续探索。

- 1、生成应用和布局
    - 根据描述生成HTML布局和代码
    - 根据描述创建UI设计
    - 根据描述生成React代码创建待办事项清单应用
    - 仅基于React变量名称生成component
    - 根据颜色名称或表情符号生成色阶
    - 根据描述创建网站
- 2、搜索和数据分析
    - 问题解答和搜索引擎
    - 扩充表中的信息
    - 根据描述创建图表
    - 根据描述生成代码并转换为电子表格
    - 根据描述生成图表和代码
- 3、程序生成与分析
    - 根据描述生成shell命令
    - 阅读代码并回答相关问题
    - 根据描述生成LaTeX表达式
    - 根据问题描述生成SQL代码_1
    - 根据问题描述生成SQL代码_2
    - 编码面试
    - 生成Python代码回答自然语言问题
    - 生成特定数据库的SQL代码
    - 根据描述生成机器学习代码
- 4、文本生成
    - 语言翻译
    - 将日常语言转换为法律语言
    - 自动生成请求
    - 根据关键词写完整的回复邮件
    - 简化法律语言
    - 翻译中文非文学诗歌
    - 将句子改写得更礼貌
    - 总结名著思想
    - 以大五人格（外向性、开放性、宜人性、尽责性、神经质）控制GPT-3的语言风格
- 5、内容创作
    - 营销内容创作
    - 生成模因，模仿创作
    - 撰写Google广告
    - 生成图片说明
    - 根据描述生成食谱
    - 根据“如何有效召开董事会会议”写“如何招募董事会成员”
    - 生成莎士比亚风格的诗歌
    - 生成科学问题并回答
    - 生成历史问题并回答
    - 文本补全和风格化重写
- 6、一般推理
    - 物理问题
    - 数学问题
    - 医学问题
    - 无意义的问题
    - 推理问题
    - 多步骤处理问题
    - 通过图片确定食品成分和健康性
    - 日常用语翻译成正式表达
- 7、其他
    - GPT-3下棋
    - 使用自然语言设计交互式语音应答流
    - 通过临床症状对患者进行诊断

应用案例：
- 1、根据描述生成HTML布局和代码：根据输入的自然语言描述生成HTML网页布局，以及相应代码。
    - ![](https://p1-tt.byteimg.com/origin/pgc-image/S6FOh7mE73PNC1?from=pc)
- 2、根据描述创建UI设计：输入文字描述，就可以生成相应的UI界面，跟上一个类似，不过界面更适应手机操作系统
    - ![](https://p6-tt.byteimg.com/origin/pgc-image/S6FOhi7Ffa0ki6?from=pc)
- 3、扩充表中的信息
    - ![](https://p3-tt.byteimg.com/origin/pgc-image/S6FOhiu5j0rUax?from=pc)
- 4、根据描述生成图表和Python代码
    - ![](https://p3-tt.byteimg.com/origin/pgc-image/S6FOiGE9VukEYd?from=pc)
- 5、根据描述生成LaTeX表达式
    - ![](https://p3-tt.byteimg.com/origin/pgc-image/S6FOiGyIe28RJk?from=pc)
- 6、根据问题描述生成SQL代码
    - ![](https://p1-tt.byteimg.com/origin/pgc-image/S6FOiHNAhX0Ebi?from=pc)
- 7、根据描述生成机器学习代码：GPT-3还能写自己同类的代码，比AutoML还AutoML
    - ![](https://p6-tt.byteimg.com/origin/pgc-image/S6FOiHu6Sat7pt?from=pc)
- 8、编码面试
    - ![](https://p6-tt.byteimg.com/origin/pgc-image/S6FOiKUAtRoQdm?from=pc)
- 9、将日常语言转换为法律语言
    - ![](https://p6-tt.byteimg.com/origin/pgc-image/S6FOj84Ij3iIs1?from=pc)
- 10、根据关键词写完整的回复邮件
    - ![](https://p6-tt.byteimg.com/origin/pgc-image/S6FOj8RDFq98C0?from=pc)
- 11、将句子改写得更礼貌
    - ![](https://p6-tt.byteimg.com/origin/pgc-image/S6FOj8v4Ngc0XH?from=pc)
- 12、总结名著思想
    - ![](https://p6-tt.byteimg.com/origin/pgc-image/S6FOj97FXhmLjI?from=pc)
- 13、生成科学问题并回答
    - ![](https://p3-tt.byteimg.com/origin/pgc-image/S6FOjqo2eoEbhh?from=pc)
- 14、推理问题


## 思考

- OpenAI的创始人Sam Altman也认为GPT-3被过度炒作，在推特上表示：“ GPT-3的炒作实在太多了。它仍然存在严重的缺陷，有时还会犯非常愚蠢的错误。”
- 问题
    - GPT-3还是一个依赖算力和大数据的怪兽。GPT-3的训练需要花费355GPU年和460万美元，数据集包含3000亿个文本token，存储量高达45TB，参数数量更是达到1750亿，而GPT-2的参数数量是15亿。
    - 最近的流行也不能忽视心理学效应的影响
    - 但是，GPT-3的few-shot 学习能力不是通用的，尽管该模型在复杂任务和模式的学习上给人留下了深刻的印象，但它仍然可能会失败。例如，即使看过10,000个示例，也解决不了反写字符串那样简单的任务。
    - 即使是OpenAI，也曾指出GPT-3存在缺陷，GPT-3的原始论文就提供了一些证据，证明GPT-3无法执行复杂的逻辑推理。
    - GPT3的宽度为2048个token，这是它理解上下文的极限，而人类可以记住多本书的知识，并将其关联起来，在这方面，GPT-3还差得远。
    - GPT-3的生成结果表现出的灵活性是大数据训练的结果，它无法超越数据本身，也就无法拥有组合性推理能力，不如说，它学到的是“统计层面的复制粘贴能力”。

![](https://p6-tt.byteimg.com/origin/pgc-image/S6FOjrg9iyHuW9?from=pc)

- 【2020-8-15】[强大如 GPT-3，1750 亿参数也搞不定中国话](https://www.infoq.cn/article/l7bhKDEolj06Y9dEwJ6O)
    - 魏晨：GPT-3 模型从看上去更加接近“通用人工智能”(AGI) ，可以动态学习，处理多种不同的任务，只需少量的标注数据。
重点：
1. GPT-3 参数庞大（约 1750 亿参数），能力较之前确实有所提升，但是宣传效果有夸张成分；
2. 受参数大小影响，GPT-3 并不是一款性价比很高的模型，训练成本较高；
3. 中文 GPT-3 的实践尚未出现；
4.GPT-3 确实可以通过文字输入生成代码，但是仅限于比较简单的情况；
5. 离 AI 真正替代程序员工作， 还有较长的路要走 。



# 资料

- [Bert时代的创新（应用篇）：Bert在NLP各领域的应用进展](https://zhuanlan.zhihu.com/p/68446772)
- 【2019-10-22】[【DL】模型蒸馏Distillation](https://zhuanlan.zhihu.com/p/71986772)
- [从入门到放弃：深度学习中的模型蒸馏技术](https://zhuanlan.zhihu.com/p/93287223?from_voters_page=true)
- [知识蒸馏(Knowledge Distillation) 经典之作](https://zhuanlan.zhihu.com/p/102038521)









