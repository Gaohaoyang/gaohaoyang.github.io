---
layout: post
title:  BERT及预训练语言模型-BERT-and-Language-Model
date:   2019-12-10 16:52:00
categories: 深度学习 
tags: 深度学习 自然语言处理 NLP Transformer BERT GPT Attention 
excerpt: Attention is all you need!
mathjax: true
---

* content
{:toc}


# BERT及预训练语言模型



- [The Annotated Transformer](http://nlp.seas.harvard.edu/2018/04/03/attention.html),Harvard NLP出品，含pytorch版代码实现
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- [Transformer模型的PyTorch实现](https://luozhouyang.github.io/transformer/),[A PyTorch implementation of the Transformer model in "Attention is All You Need"](https://github.com/jadore801120/attention-is-all-you-need-pytorch)

## 总结

- 占坑

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

### BERT-as-service

- Google 已经公开了 TensorFlow 版本的预训练模型和代码，可以用于生成词向量，但是还有更简单的方法：直接调用封装好的库 bert-as-service 。
![](https://img-blog.csdnimg.cn/20190521201148390.gif)

- bert-as-service 是腾讯 AI Lab 开源的一个 BERT 服务（肖涵开发），它让用户可以以调用服务的方式使用 BERT 模型而不需要关注 BERT 的实现细节。bert-as-service 分为客户端和服务端，用户可以从 python 代码中调用服务，也可以通过 http 的方式访问。
- - [快速使用 BERT 生成词向量：bert-as-service](https://blog.csdn.net/qq_34832393/article/details/90414293)

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

# 资料

- [Bert时代的创新（应用篇）：Bert在NLP各领域的应用进展](https://zhuanlan.zhihu.com/p/68446772)









