---
layout: post
title:  BERT及预训练语言模型-BERT-and-Pretrain-Language-Model
date:   2019-12-10 16:52:00
categories: 深度学习 
tags: 深度学习 自然语言处理 NLP Transformer BERT GPT Attention 蒸馏 Faiss Facebook TextCNN ES 田渊栋 彩票假设 自监督 Milvus ALBERT elasticsearch es 可视化 unilm simcse gpu 迁移学习
excerpt: 预训练语言模型及BERT知识点汇总
mathjax: true
---

* content
{:toc}

# 总结

- [The Annotated Transformer](http://nlp.seas.harvard.edu/2018/04/03/attention.html),Harvard NLP出品，含pytorch版代码实现
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- [Transformer模型的PyTorch实现](https://luozhouyang.github.io/transformer/),[A PyTorch implementation of the Transformer model in "Attention is All You Need"](https://github.com/jadore801120/attention-is-all-you-need-pytorch)
- 【2021-6-7】[一文了解预训练语言模型](https://mp.weixin.qq.com/s/meDVXt91pypl4Gn_1A6iVg), 配套书籍，预训练语言模型，2021-5出版
- 【2021-6-17】[预训练模型最新综述：过去、现在和未来](https://zhuanlan.zhihu.com/p/381121057) [Pre-Trained Models: Past, Present and Future](https://arxiv.org/abs/2106.07139)，全面回顾了 PTM 的最新突破。这些突破是由计算能力的激增和数据可用性增加推动的，朝着四个重要方向发展：设计有效的架构、利用丰富的上下文、提高计算效率以及进行解释和理论分析。PTM发展过程：
  - ![](https://pic2.zhimg.com/80/v2-d82cd793c1b59c20ee7f97d95f53c675_720w.jpg)
- 迁移学习分类
  - ![](https://pic2.zhimg.com/80/v2-67138799a41ee6e489727b15c0b1e731_720w.jpg)
- 【2020-8-13】[打破BERT天花板：11种花式炼丹术刷爆NLP分类SOTA！](https://blog.csdn.net/abcdefg90876/article/details/108016310)
  - <img src="https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy81ZmtuYjQxaWI5cUgxd240a08wQ1FpYkJlZGNiZzduemZCUTNKMTlPcTNnRFZxY1ZFbU1lMjhPWjlwZkQ0SkswanV1YVVZNjYwTEtzcUJteE5BUTU4WlRnLzY0MA" height="100%" width="100" />
- NLP分类模型时间线
  - ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy81ZmtuYjQxaWI5cUYzaWJLQ05yOG9FakZjRDF5bE9pY1o5VHVHTlpKcUN1N0ZtcWliMHZKbmU3c0V5Z2ljQkFzdTc3RDdTbjN2a0pTR1hDaWM5OUZRelRpY0dqU3cvNjQw)

# 自监督表示学习

- 【2020-6-19】[NLP中的自监督表示学习](https://www.toutiao.com/i6839892851711541764),[英文原文](https://amitness.com/2020/05/self-supervised-learning-nlp/)  

虽然计算机视觉在自监督学习方面取得了惊人的进展，但在很长一段时间内，**自监督**学习一直是NLP研究领域的一等公民。语言模型早在90年代就已经存在，甚至在“自我监督学习”这个术语出现之前。2013年的Word2Vec论文推广了这一模式，在许多问题上应用这些自监督的方法，这个领域得到了迅速的发展。

这些自监督方法的核心是一个叫做 “pretext task” 的框架，使用数据本身来生成标签，并使用监督的方法来解决非监督的问题。这些也被称为“auxiliary task”（**辅助**任务）或“pre-training task“（**预训练**任务）。通过执行此任务获得的表示可以用作下游监督任务的起点。
- ![NLP中的自监督表示学习，全是动图，很过瘾的](https://p1-tt.byteimg.com/origin/pgc-image/47ba10919c1440c781c0b14f1c14de82?from=pc)

下面概述研究人员在没有明确的数据标注的情况下从文本语料库中学习表示的各种pretext tasks。
- 重点是任务的制定，而不是实现它们的架构。

自监督的方案

## 1. 预测中心词（word2vec的CBOW模型）
 
在这个公式中，取一定窗口大小的一小块文本，我们的目标是根据周围的单词预测中心单词。
- ![NLP中的自监督表示学习，全是动图，很过瘾的](https://p3-tt.byteimg.com/origin/pgc-image/b217d92b952d4601937a1629bc867642?from=pc)
  - 例如，下图中，有一个大小为1的窗口，在中间单词的两边各有一个单词，用这些相邻的词预测中心词。
- ![NLP中的自监督表示学习，全是动图，很过瘾的](https://p3-tt.byteimg.com/origin/pgc-image/62516862aa444fed9885c34aaf955b05?from=pc)

这个方案已经在著名的Word2Vec论文的“Continuous Bag of Words”方法中使用过。
 
## 2. 预测邻居词（word2vec的skip-gram模型）

在这个公式中，取一定窗口大小的文本张成的空间，目标是在给定中心词的情况下预测周围的词。
- ![NLP中的自监督表示学习，全是动图，很过瘾的](https://p6-tt.byteimg.com/origin/pgc-image/63df64f4f6af401db506372dc06c0b2f?from=pc)

这个方案已经在著名的Word2Vec论文的“skip-gram”方法中实现。
 
## 3. 相邻句子的预测（Skip-Thought Vectors，句子级别的skip-gram）
 
在这个公式中，取三个连续的句子，设计一个任务，其中给定中心句，生成前一个句子和下一个句子。它类似于之前的skip-gram方法，但适用于句子而不是单词。
- ![NLP中的自监督表示学习，全是动图，很过瘾的](https://p6-tt.byteimg.com/origin/pgc-image/6c88f0845d7e4ae38ea626bb3bfd9000?from=pc)

这个方案已经在Skip-Thought Vectors的论文中使用过。
 
## 4. 自回归语言建模（n-gram/gpt）
 
在这个公式中，取大量未标注的文本，并设置一个任务，根据前面的单词预测下一个单词。因为下一个来自语料库的单词已知，所以不需要手工标注。
- ![NLP中的自监督表示学习，全是动图，很过瘾的](https://p1-tt.byteimg.com/origin/pgc-image/bf36697cfb06464c8faf6ab3c88a2493?from=pc)
  - 例如，通过预测给定前一个单词的下一个单词来将任务设置为**从左到右**的语言建模。
- ![NLP中的自监督表示学习，全是动图，很过瘾的](https://p6-tt.byteimg.com/origin/pgc-image/1ddb11e50efa4a6f955bac7e14218b1b?from=pc)
  - 也可以用这个方案来通给定未来的单词预测之前的单词，方向是**从右到左**。
- ![NLP中的自监督表示学习，全是动图，很过瘾的](https://p6-tt.byteimg.com/origin/pgc-image/bbb35ee25289497a9c40e3eeee901fe0?from=pc)

这个方案已经使用在许多论文中，从n-gram模型到神经网络模型比如神经概率语言模型 (GPT) 。
 
## 5. 掩码语言建模（bert系列）
 
在这个方案中，文本中的单词是随机掩码的，任务是预测它们。与自回归公式相比，在预测掩码单词时可以同时使用前一个词和下一个词的上下文。
- ![NLP中的自监督表示学习，全是动图，很过瘾的](https://p1-tt.byteimg.com/origin/pgc-image/a9b530083051422f9f88c1613eff489f?from=pc)

这个方案已经在BERT、RoBERTa和ALBERT的论文中使用过。与自回归相比，在这个任务中，只预测了一小部分掩码词，因此从每句话中学到的东西更少。
 
## 6. 下一个句子预测（NSP任务，bert使用）
 
在这个方案中，我们取文件中出现的两个连续的句子，以及同一文件或不同文件中随机出现的另一个句子。
- ![NLP中的自监督表示学习，全是动图，很过瘾的](https://p3-tt.byteimg.com/origin/pgc-image/8d58e6c913dc445d895429086cc50ae9?from=pc)

然后，任务是区分两个句子是否是连贯的。
- ![NLP中的自监督表示学习，全是动图，很过瘾的](https://p3-tt.byteimg.com/origin/pgc-image/f50ff4fe179a4678926ddcc3769289f0?from=pc)

在BERT的论文中，它被用于提高下游任务的性能，这些任务需要理解句子之间的关系，比如自然语言推理(NLI)和问题回答。然而，后来的研究对其有效性提出了质疑。
 
## 7. 句子顺序的预测（albert，取代NSP）
 
在这个方案中，我们从文档中提取成对的连续句子。然后互换这两个句子的位置，创建出另外一对句子。
- ![NLP中的自监督表示学习，全是动图，很过瘾的](https://p1-tt.byteimg.com/origin/pgc-image/0638806390584a488e06c82a11832455?from=pc)

目标是对一对句子进行分类，看顺序是否正确。
- ![NLP中的自监督表示学习，全是动图，很过瘾的](https://p1-tt.byteimg.com/origin/pgc-image/2ba2388f8dfa4778ba4684a8bbbc57fe?from=pc)

在ALBERT的论文中，它被用来取代“下一个句子预测”任务。
 
## 8. 句子重排（bart）
 
在这个方案中，从语料库中取出一个连续的文本，并破开的句子。然后，对句子的位置进行随机打乱，任务是恢复句子的原始顺序。
- ![NLP中的自监督表示学习，全是动图，很过瘾的](https://p6-tt.byteimg.com/origin/pgc-image/451d926ff39a4ce6b3f2ef4b97d18469?from=pc)
它已经在BART的论文中被用作预训练的任务之一。
 
## 9. 文档旋转（bart）
 
在这个方案中，文档中的一个随机token被选择为旋转点。然后，对文档进行旋转，使得这个token成为开始词。任务是从这个旋转的版本中恢复原来的句子。
- ![NLP中的自监督表示学习，全是动图，很过瘾的](https://p3-tt.byteimg.com/origin/pgc-image/8095d77a0fc440978eb825289a83acf6?from=pc)

它已经在BART的论文中被用作预训练的任务之一。直觉上，这将训练模型开始识别文档。
 
## 10. 表情符号预测
 
这个方案被用在了DeepMoji的论文中，用表情符号来表达推文的情感。如下所示，用推特上的表情符号作为标签，并制定一个监督任务，在给出文本时预测表情符号。
- ![NLP中的自监督表示学习，全是动图，很过瘾的](https://p1-tt.byteimg.com/origin/pgc-image/501d4092a3c4433298824a230c07eeb1?from=pc)

DeepMoji的作者们使用这个概念对一个模型进行了12亿条推文的预训练，然后在情绪分析、仇恨语言检测和侮辱检测等与情绪相关的下游任务上对其进行微调。

# 预训练语言模型（PLMs）

- 2020年3月18日，邱锡鹏老师发表了关于NLP预训练模型的综述《[Pre-trained Models for Natural Language Processing: A Survey](https://arxiv.org/abs/2003.08271v2)》
- 【2020-9-9】[预训练语言模型(PLMs)走的飞快](https://zhuanlan.zhihu.com/p/93781241)
- ![](https://pic1.zhimg.com/v2-447ae7707604e7ac520555249332c42c_1440w.jpg)
- 预训练模型在经历中4个时代
  - 第一个是轰动性的**词嵌入**（Word Embedding）时代， 杰出代表是Word2Vec和Glove；
  - 第二个是**上下文嵌入**（Context Word Embedding），代表为CoVe和ELMO；
  - 第三个时代是**预训练模型**，代表是GPT和BERT； 
  - 第四个时代是**改进型**和**领域定制型**。 
    - 改进型代表为ALBERT和XLNet
    - 领域定制化(Domain Specific)代表为SciBert (Scientific Bert) 和BioBert(Biomedical Bert)。 
- 【2020-9-30】nlp中的预训练语言模型
  - ![](https://pic4.zhimg.com/v2-0e78a280939451bef50bc0b1a521c45b_1440w.jpg)
- 主要包括3大方面，涉及到的模型有：
  - **单向**特征表示的**自回归**预训练语言模型，统称为**单向模型**：ELMO/ULMFiT/SiATL/GPT1.0/GPT2.0；
  - **双向**特征表示的**自编码**预训练语言模型，统称为**BERT系列模型**：(BERT/MASS/UNILM/ERNIE1.0/ERNIE(THU)/MTDNN/ERNIE2.0/SpanBERT/RoBERTa)
  - **双向**特征表示的**自回归**预训练语言模型：XLNet；
- PTMs: Pre-trained-Models in NLP，[NLP预训练模型的全面总结(持续更新中)](https://github.com/loujie0822/Pre-trained-Models/blob/master/README.md)
- 2020年3月18日，邱锡鹏老师发表了关于NLP预训练模型的综述《[Pre-trained Models for Natural Language Processing: A Survey](https://zhuanlan.zhihu.com/p/115014536?utm_source=qq&utm_medium=social&utm_oi=27211553832960#ref_1)》
- 知乎文章1:  [全面总结！PTMs：NLP预训练模型](https://zhuanlan.zhihu.com/p/115014536)，[图片下载](https://github.com/loujie0822/Pre-trained-Models/blob/master/resources/PTMs.jpg)
- 知乎文章2：[nlp中的预训练语言模型总结](https://zhuanlan.zhihu.com/p/76912493)
- 知乎文章3：[nlp中的词向量对比](https://zhuanlan.zhihu.com/p/56382372)

<img src="https://pic3.zhimg.com/80/v2-0ace60ca3d843fc9b69c6965731f288e_720w.jpg" style="zoom:20%;" />

- 对比分析，摘自：[论文笔记 - Pre-trained Models for Natural Language Processing](http://www.shuang0420.com/2020/05/07/%E8%AE%BA%E6%96%87%E7%AC%94%E8%AE%B0%20-%20Pre-trained%20Models%20for%20Natural%20Language%20Processing/)，[Pre-trained Models for Natural Language Processing: A Survey](https://arxiv.org/abs/2003.08271)
   - `LM`（Language Modeling）是 NLP 中最常见的无监督任务，通常特指自回归或单向语言建模，BiLM 虽然结合了两个方向的语言模型，但只是两个方向的简单拼接，并不是真正意义上的双向语言模型。
   - `MLM`（Masked Language Modeling）可以克服传统**单向**语言模型的缺陷，结合双向的信息，但是 \[MASK] 的引入使得预训练和 fine-tune 之间出现 gap
   - `PLM`（Permuted Language Modeling）则克服了这个问题，实现了**双向**语言模型和**自回归**模型的**统一**。
   - `DAE`（Denoising Autoencoder）接受部分损坏的输入，并以恢复原始输入为目标。与 MLM 不同，DAE 会给输入额外加一些**噪声**。
   - `CTL`（Contrastive Learning） 的原理是在**对比**中学习，其假设是一些 observed pairs of text 在语义上比随机采样的文本更为接近。CTL 比 LM 计算复杂度更低。
- 综述从四个方面（Representation Types、Architectures、Pre-training Task Types、Extensions）对现有 PTMs (Pre-trained Models) 进行了系统分类，一幅[图](http://images.shuang0420.com/images/%E8%AE%BA%E6%96%87%E7%AC%94%E8%AE%B0%20-%20Pre-trained%20Models%20for%20Natural%20Language%20Processing/taxonomy.png)来概括全文精华：

## 1、论文汇总：

PTMs-Papers
1. 清华[PLMpapers](https://github.com/thunlp/PLMpapers)
2. [BERT-related-papers](https://github.com/tomohideshibata/BERT-related-papers)
3. [awesome-bert-nlp](https://github.com/cedrickchee/awesome-bert-nlp)
4. [bertlang](https://bertlang.unibocconi.it/)
5. [bertviz](https://github.com/jessevig/bertviz)

## 2. PTMs单模型解读

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


## Huggingface

![logo](https://img-blog.csdnimg.cn/20200904202104322.png)

[demo](https://transformer.huggingface.co/)

### Hugging face 简介

[Hugging Face](https://huggingface.co/)是一家总部位于纽约的聊天机器人初创服务商，开发的应用在青少年中颇受欢迎，相比于其他公司，Hugging Face更加注重产品带来的情感以及环境因素。

但更令它广为人知的是Hugging Face专注于NLP技术，拥有大型的开源社区。尤其是在github上开源的自然语言处理，预训练模型库 `Transformers`，已被下载超过一百万次，github上超过24000个star。[Transformers](https://github.com/huggingface/transformers) 提供了NLP领域大量state-of-art的 预训练语言模型结构的模型和调用框架。

PyTorch实现了从语言中识别情绪情感反讽的DeepMoji模型：https://github.com/huggingface/torchMoji

## transformers 库

【2022-1-21】[让 Transformer 的推理速度提高 4.5 倍，这个小 trick 还能给你省十几万](https://mp.weixin.qq.com/s/fYxFwBvfQFPTqMZL6UI5WQ)
- NLP明星公司Hugging Face发布了一个叫做Infinity的产品，可以以1ms延时完成Transformer的推理，性能相当高了。但有点贵——1年至少要十几万块 （2万美元）
- 有没有别的办法？Transformer-deploy：开源的、“不费吹灰之力”就可以达到Infinity一些公共基准的那种。并且现在，通过在该方法上施加一个小trick（GPU量化（quantization）），将Transformer的推理速度提高4.5倍！
  - 用一行命令优化和部署Hugging Face上的Transformer模型，并支持大多数基于Transformer编码器的模型，比如Bert、Roberta、miniLM、Camembert、Albert、XLM-R、Distilbert等。
  - Transformer-deploy推理服务器用的是Nvidia Triton。推理引擎为Microsoft ONNX Runtime（用于CPU和GPU推理）和Nvidia TensorRT（仅限 GPU）。如果想在GPU上获得一流的性能，Nvidia Triton+Nvidia TensorRT这样的组合无疑是最佳选择。虽然TensorRT用起来有点难，但它确实能比用Pytorch快5～10倍。
  - 在实际性能测试中，Transformer-deploy在batch size为1、token分别为16和128的输入序列中的推理速度，都比付费的Hugging Face Infinity要快：Transformer-deploy在token为16时要1.52ms，Infinity则需要1.7ms；token为128时需要1.99ms，Infinity则需要2.5ms。

### 介绍

- 这个库最初的名称是 pytorch-pretrained-bert，它随着BERT一起应运而生。Google2018年10月底在开源了[BERT](https://github.com/google-research/bert) 的tensorflow实现。当时，BERT以其强劲的性能，引起NLPer的广泛关注。几乎与此同时，pytorch-pretrained-bert也开始了它的第一次提交。pytorch-pretrained-bert 用当时已有大量支持者的pytorch框架复现了BERT的性能，并提供预训练模型的下载，使没有足够算力的开发者们也能够在几分钟内就实现 state-of-art-fine-tuning。
- 直到2019年7月16日，在repo上已经有了包括BERT，GPT，GPT-2，Transformer-XL，XLNET，XLM在内六个预训练语言模型，这时候名字再叫pytorch-pretrained-bert 就不合适了，于是改成了pytorch-transformers，势力范围扩大了不少。这还没完！
- 2019年6月Tensorflow2的beta版发布，Huggingface也闻风而动。为了立于不败之地，又实现了TensorFlow 2.0和PyTorch模型之间的深层互操作性，可以在TF2.0/PyTorch框架之间随意迁移模型。
- 在2019年9月也发布了2.0.0版本，同时正式更名为 transformers 。到目前为止，transformers 提供了超过100种语言的，32种预训练语言模型，简单，强大，高性能，是新手入门的不二选择。

### 安装

安装：
- transformers 包所需的 tensorflow 版本至少为2.2.0，而该版本对应的CUDA版本可能不同，如笔者使用的2.4.0版本tensorflow对应的CUDA是11版本

```shell
pip install transformers==2.2.0
pip install tensorflow
pip install numpy
# tf环境
pip install tensorflow-gpu==2.4.0
# pytorch环境
pip install torch
# 或 pytorch+transformers一起安装
pip install transformers[torch]
# 或 TensorFlow+transformers一起安装
pip install transformers[tf-cpu]
# 或源码安装
pip install git+https://github.com/huggingface/transformers

```

测试：

```python
python -c "from transformers import pipeline; print(pipeline('sentiment-analysis')('I hate you'))"
```


### 模型下载

- 在[hugging face模型库](https://huggingface.co/models)里选择需要的预训练模型并下载。例如，点击bert-base-uncased以后点Files and versions进行手动下载。
- 通常这样下载的模型会是有损的，后续无法使用，因此最好是通过git下载

```shell
# mac下
brew install git-lfs
git lfs install
git clone https://huggingface.co/bert-base-chinese
```

模型文件导入

```python
import transformers

MODEL_PATH = "./transformr_files/bert-base-uncased/"
# a.通过词典导入分词器
tokenizer = transformers.BertTokenizer.from_pretrained(f"{MODEL_PATH}/bert-base-uncased-vocab.txt") 
# b. 导入配置文件
model_config = transformers.BertConfig.from_pretrained(MODEL_PATH)
# 修改配置
model_config.output_hidden_states = True
model_config.output_attentions = True
# 通过配置和路径导入模型
model = transformers.BertModel.from_pretrained(MODEL_PATH,config = model_config)
```

#### 模型不同点

[关于transformers库中不同模型的Tokenizer](https://zhuanlan.zhihu.com/p/121787628)

不同PLM原始论文和transformers库中数据的组织格式。其实，像Roberta，XLM等模型的中< s>, < /s>是可以等价于Bert中的[CLS], [SEP]的，只不过不同作者的习惯不同。

```shell
# Bert
单句：[CLS] A [SEP]
句对：[CLS] A [SEP] A [SEP]
# Roberta
单句：<s> A </s>
句对：<s> A </s> </s> B </s>
# Albert
单句：[CLS] A [SEP]
句对：[CLS] A [SEP] B [SEP]
# XLNet
单句：[A] <sep> <cls>
句对：A <sep> B <sep> <cls>
# XLM
单句：<s> A </s>
句对：<s> A </s> B </s>
# XLM-Roberta
单句：<s> A </s>
句对：<s> A </s> </s> B </s>
# Bart
单句：<s> A </s>
句对：<s> A </s> </s> B </s>
```

transformers库中RobertaTokenizer和BertTokenizer的不同
- transformers库中`RobertaTokenizer`需要**同时读取vocab_file和merges_file两个文件**，不同于`BertTokenizer`只需要读取vocab_file一个词文件。主要原因是两种模型采用的编码不同：
- Bert采用的是**字符**级别的BPE编码，直接生成词表文件，官方词表中包含**3w**左右的单词，每个单词在词表中的位置即对应Embedding中的索引，Bert预留了100个\[unused]位置，便于使用者将自己数据中重要的token手动添加到词表中。
- Roberta采用的是**byte**级别的BPE编码，官方词表包含**5w**多的byte级别的token。merges.txt中存储了所有的token，而vocab.json则是一个byte到索引的映射，通常频率越高的byte索引越小。所以转换的过程是，先将输入的所有tokens转化为merges.txt中对应的byte，再通过vocab.json中的字典进行byte到索引的转化。

由于中文的特殊性不太适合采用byte级别的编码，所以大部分开源的中文Roberta预训练模型仍然采用的是**单字词表**，所以直接使用BertTokenizer读取即可， 不需要使用RobertaTokenizer。

### 模型保存


```python
tokenizer.save_pretrained(save_directory) # 保存词表
model.save_pretrained(save_directory) # 保存模型
```

### pipeline

pipeline API可以快速体验 Transformers。它将模型的预处理、后处理等步骤包装起来，直接定义好任务名称后输出文本，得到结果。这是一个高级的API，可以领略到transformers 这个库的强大且友好。

用 pipeline API，输入任务名称，默认会选择特定已经存好的模型文件，然后会进行下载并且缓存。

主要有以下三个步骤被包装起来了： **preprocess** -> **fit model** -> **postprocessing**
- 输入文本被预处理成机器可以理解的格式
  - 将输入的文本进行分词，例如变成：words，subwords，或者symbols，这些统称为token
  - 将每个token映射为一个integer
  - 为输入添加模型需要的特殊字符。
- 被处理后的输入被传入模型中
- 模型的预测结果经过后处理，得到人类可以理解的结果

![](https://pic2.zhimg.com/v2-d9b23d02a7e5e1988ba8f902d7da9c0d_r.jpg)

注意：
- 所有的预处理阶段（Preprocessing），都要**与模型预训练阶段保持一致**，所以要从Model Hub 中下载预处理的信息。
- 用 AutoTokenizer 的 from_pretrained 方法进行tokenizer 的加载，通过把tokenizer 的checkpoint 导入，它可以自动获取tokenizer需要的数据并进行缓存（下次无需下载）。

目前支持的pipeline 如下：
- feature-extraction (get the vector representation of a text) 特征抽取
- fill-mask 掩码回复
- ner (named entity recognition) 命名实体识别
- question-answering 问答
- sentiment-analysis 情感分析
- summarization 文本摘要
- text-generation 文本生成
- translation 机器翻译
- zero-shot-classification 零样本分类

最新pipeline类型：详见[官网介绍](https://huggingface.co/transformers/main_classes/pipelines.html)
- AudioClassificationPipeline
- AutomaticSpeechRecognitionPipeline
- ConversationalPipeline
- FeatureExtractionPipeline
- FillMaskPipeline
- ImageClassificationPipeline
- ObjectDetectionPipeline
- QuestionAnsweringPipeline
- SummarizationPipeline
- TableQuestionAnsweringPipeline
- TextClassificationPipeline
- TextGenerationPipeline
- Text2TextGenerationPipeline
- TokenClassificationPipeline
- TranslationPipeline
- ZeroShotClassificationPipeline

所有的API都可以通过 搜索，并且在线测试

#### Text classification

默认checkpoint 是 distilbert-base-uncased-finetuned-sst-2-english

```python
from transformers import pipeline

#checkpoint = "distilbert-base-uncased-finetuned-sst-2-english"
#tokenizer = AutoTokenizer.from_pretrained(checkpoint)
classifier = pipeline("sentiment-analysis")
# 指定模型，硬件环境
pipe = pipeline("sentiment-analysis", model=model_name, device=0)
# 单句
classifier("I've been waiting for a HuggingFace course my whole life.")
# 多句
classifier([
    "I've been waiting for a HuggingFace course my whole life.", 
    "I hate this so much!"
])
```


```python
## ------------ PYTORCH CODE ------------ 
from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch

model_name = "bert-base-cased-finetuned-mrpc"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSequenceClassification.from_pretrained(model_name)

classes = ["not paraphrase", "is paraphrase"]

sequence_0 = "The company HuggingFace is based in New York City"
sequence_1 = "Apples are especially bad for your health"
sequence_2 = "HuggingFace's headquarters are situated in Manhattan"

# The tokenizer will automatically add any model specific separators (i.e. <CLS> and <SEP>) and tokens to
# the sequence, as well as compute the attention masks.
paraphrase = tokenizer(sequence_0, sequence_2, return_tensors="pt")
not_paraphrase = tokenizer(sequence_0, sequence_1, return_tensors="pt")

paraphrase_classification_logits = model(**paraphrase).logits
not_paraphrase_classification_logits = model(**not_paraphrase).logits

paraphrase_results = torch.softmax(paraphrase_classification_logits, dim=1).tolist()[0]
not_paraphrase_results = torch.softmax(not_paraphrase_classification_logits, dim=1).tolist()[0]

# Should be paraphrase
for i in range(len(classes)):
    print(f"{classes[i]}: {int(round(paraphrase_results[i] * 100))}%")

# Should not be paraphrase
for i in range(len(classes)):
    print(f"{classes[i]}: {int(round(not_paraphrase_results[i] * 100))}%")

## ------------ TENSORFLOW CODE ------------ 
from transformers import AutoTokenizer, TFAutoModelForSequenceClassification
import tensorflow as tf

model_name = "bert-base-cased-finetuned-mrpc"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = TFAutoModelForSequenceClassification.from_pretrained(model_name)

classes = ["not paraphrase", "is paraphrase"]

sequence_0 = "The company HuggingFace is based in New York City"
sequence_1 = "Apples are especially bad for your health"
sequence_2 = "HuggingFace's headquarters are situated in Manhattan"

# The tokenizer will automatically add any model specific separators (i.e. <CLS> and <SEP>) and tokens to
# the sequence, as well as compute the attention masks.
paraphrase = tokenizer(sequence_0, sequence_2, return_tensors="tf")
not_paraphrase = tokenizer(sequence_0, sequence_1, return_tensors="tf")

paraphrase_classification_logits = model(paraphrase).logits
not_paraphrase_classification_logits = model(not_paraphrase).logits

paraphrase_results = tf.nn.softmax(paraphrase_classification_logits, axis=1).numpy()[0]
not_paraphrase_results = tf.nn.softmax(not_paraphrase_classification_logits, axis=1).numpy()[0]

# Should be paraphrase
for i in range(len(classes)):
    print(f"{classes[i]}: {int(round(paraphrase_results[i] * 100))}%")

# Should not be paraphrase
for i in range(len(classes)):
    print(f"{classes[i]}: {int(round(not_paraphrase_results[i] * 100))}%")
```


#### Zero-shot classification

文本分类标注往往非常耗时，huggingface 提供了0样本分类的pipeline， 用户只需要传入文本内容，以及可能的分类标签，就可以得到每个标签的概率，这样子可以提供标注人员参考结果，大大提高标注效率。

```python
from transformers import pipeline

classifier = pipeline("zero-shot-classification")
classifier(
    "This is a course about the Transformers library",
    candidate_labels=["education", "politics", "business"],
)
{'sequence': 'This is a course about the Transformers library',
 'labels': ['education', 'business', 'politics'],
 'scores': [0.8445963859558105, 0.111976258456707, 0.043427448719739914]}
```

#### Text generation

文本生成任务，是指你输入开头的话术（prompt），然后让机器自动帮你生成完剩下的句子。Text generation 中包含了一些随机因子，因此每次生成的结果都可能不同。

```python
from transformers import pipeline

generator = pipeline("text-generation")
generator("In this course, we will teach you how to")
[{'generated_text': 'In this course, we will teach you how to understand and use '
                    'data flow and data interchange when handling user data. We '
                    'will be working with one or more of the most commonly used '
                    'data flows — data flows of various types, as seen by the '
                    'HTTP'}]
```

你可以设置参数 num_return_sequences 选择返回的结果个数，也可以通过 max_length 限制每次返回的结果句子的长度.

并且模型选择可以通过 model 设置，这边选择 distilgpt2

```python
from transformers import pipeline

generator = pipeline("text-generation", model="distilgpt2")
generator(
    "In this course, we will teach you how to",
    max_length=30,
    num_return_sequences=2,
)
[{'generated_text': 'In this course, we will teach you how to manipulate the world and '
                    'move your mental and physical capabilities to your advantage.'},
 {'generated_text': 'In this course, we will teach you how to become an expert and '
                    'practice realtime, and with a hands on experience on both real '
                    'time and real'}]
```

#### Mask filling

掩码恢复是将一个句子中随机遮掩<mask>的词给恢复回来，top_k 控制了概率最大的 top k 个词被返回。

例如：

```python
from transformers import pipeline

unmasker = pipeline("fill-mask")
unmasker("This course will teach you all about <mask> models.", top_k=2)
[{'sequence': 'This course will teach you all about mathematical models.',
  'score': 0.19619831442832947,
  'token': 30412,
  'token_str': ' mathematical'},
 {'sequence': 'This course will teach you all about computational models.',
  'score': 0.04052725434303284,
  'token': 38163,
  'token_str': ' computational'}]
```

#### Named entity recognition

命名实体是被是指如何将文本中的实体，例如：persons, locations, or organizations，识别出来的任务：

```python
from transformers import pipeline

ner = pipeline("ner", grouped_entities=True)
ner("My name is Sylvain and I work at Hugging Face in Brooklyn.")
[{'entity_group': 'PER', 'score': 0.99816, 'word': 'Sylvain', 'start': 11, 'end': 18}, 
 {'entity_group': 'ORG', 'score': 0.97960, 'word': 'Hugging Face', 'start': 33, 'end': 45}, 
 {'entity_group': 'LOC', 'score': 0.99321, 'word': 'Brooklyn', 'start': 49, 'end': 57}
]
```

注意这边设置了 grouped_entities=True，这就告诉模型，将同一个entity的部分，聚合起来，例如这边的 “Hugging” and “Face” 是一个实体organization，所以就把它给聚合起来。

在数据预处理的部分， Sylvain 被拆解为4 pieces: S, ##yl, ##va, and ##in. 这边后处理也会将这些给聚合起来。

#### Question answering

阅读理解的问题，是通过文本内容，以及提出的问题，得到答案：

```python
from transformers import pipeline

question_answerer = pipeline("question-answering")
question_answerer(
    question="Where do I work?",
    context="My name is Sylvain and I work at Hugging Face in Brooklyn"
)
{'score': 0.6385916471481323, 'start': 33, 'end': 45, 'answer': 'Hugging Face'}
```

#### Summarization

摘要问题，是将长文本的进行句子的压缩，得到简练的句子表达。

```python
from transformers import pipeline

summarizer = pipeline("summarization")
summarizer("""
    America has changed dramatically during recent years. Not only has the number of 
    graduates in traditional engineering disciplines such as mechanical, civil, 
    electrical, chemical, and aeronautical engineering declined, but in most of 
    the premier American universities engineering curricula now concentrate on 
    and encourage largely the study of engineering science. As a result, there 
    are declining offerings in engineering subjects dealing with infrastructure, 
    the environment, and related issues, and greater concentration on high 
    technology subjects, largely supporting increasingly complex scientific 
    developments. While the latter is important, it should not be at the expense 
    of more traditional engineering.

    Rapidly developing economies such as China and India, as well as other 
    industrial countries in Europe and Asia, continue to encourage and advance 
    the teaching of engineering. Both China and India, respectively, graduate 
    six and eight times as many traditional engineers as does the United States. 
    Other industrial countries at minimum maintain their output, while America 
    suffers an increasingly serious decline in the number of engineering graduates 
    and a lack of well-educated engineers.
""")
[{'summary_text': ' America has changed dramatically during recent years . The '
                  'number of engineering graduates in the U.S. has declined in '
                  'traditional engineering disciplines such as mechanical, civil '
                  ', electrical, chemical, and aeronautical engineering . Rapidly '
                  'developing economies such as China and India, as well as other '
                  'industrial countries in Europe and Asia, continue to encourage '
                  'and advance engineering .'}]
```

跟text generation 任务一样，我们也可以设置参数： max_length or a min_length ，限制文本的长度。

#### Translation

文本翻译，你可以在 Model Hub 中，找到特定的翻译模型，例如法翻英的模型， Helsinki-NLP/opus-mt-fr-en：

```python
from transformers import pipeline

translator = pipeline("translation", model="Helsinki-NLP/opus-mt-fr-en")
translator("Ce cours est produit par Hugging Face.")
[{'translation_text': 'This course is produced by Hugging Face.'}]
```

## transformers源码

参考：
- [BERT源码详解（一）——HuggingFace Transformers最新版本源码解读](https://zhuanlan.zhihu.com/p/360988428)
- [BERT源码详解（二）——HuggingFace Transformers最新版本源码解读](https://zhuanlan.zhihu.com/p/363014957)

1. BERT Tokenization分词模型（BertTokenizer）（请看上篇）
2. BERT Model本体模型（BertModel）（请看上篇）
  - 2.1 BertEmbeddings
  - 2.2 BertEncoder
    - 2.2.1 BertLayer
      - 2.2.1.1 BertAttention
        - 2.2.1.1 BertSelfAttention
        - 2.2.1.2 BertSelfOutput
      - 2.2.1.2 BertIntermediate
      - 2.2.1.3 BertOutput
    - 2.2.2 BertPooler
3. BERT-based Models应用模型
  - 3.1 BertForPreTraining
  - 3.2 BertForSequenceClassification
  - 3.3 BertForMultiChoice
  - 3.4 BertForTokenClassification
  - 3.5 BertForQuestionAnswering
4. BERT训练与优化
  - 4.1 Pre-Training
  - 4.2 Fine-Tuning
    - 4.2.1 AdamW
    - 4.2.2 Warmup


### Tokenization（BertTokenizer）

和BERT有关的Tokenizer主要写在/models/bert/tokenization_bert.py和/models/bert/tokenization_bert_fast.py 中。这两份代码分别对应基本的BertTokenizer，以及不进行token到index映射的BertTokenizerFast，这里主要讲解第一个。

BertTokenizer 是基于`BasicTokenizer`和`WordPieceTokenizer` 的分词器：
- `BasicTokenizer`负责处理的第一步——按标点、空格等分割句子，并处理是否统一小写，以及清理非法字符。继承自 class BertTokenizer(PreTrainedTokenizer):
  - 对于中文字符，通过预处理（加空格）来按字分割；
  - 同时可以通过never_split指定对某些词不进行分割；
  - 这一步是可选的（默认执行）。
- `WordPieceTokenizer`在词的基础上，进一步将词分解为子词（subword） 。
  - subword介于char和word之间，既在一定程度保留了词的含义，又能够照顾到英文中单复数、时态导致的词表爆炸和未登录词的OOV（Out-Of-Vocabulary）问题，将词根与时态词缀等分割出来，从而减小词表，也降低了训练难度；
  - 例如，tokenizer这个词就可以拆解为“token”和“##izer”两部分，注意后面一个词的“##”表示接在前一个词后面。

BertTokenizer 有以下常用方法：
- from_pretrained：从包含词表文件（vocab.txt）的目录中初始化一个分词器；
- tokenize：将文本（词或者句子）分解为子词列表；
- convert_tokens_to_ids：将子词列表转化为子词对应**下标**的列表；
- convert_ids_to_tokens ：与上一个相反；
- convert_tokens_to_string：将subword列表按“##”拼接回词或者句子；
- encode：对于单个句子输入，分解词并加入特殊词形成“[CLS], x, [SEP]”的结构并转换为词表对应下标的列表；对于两个句子输入（多个句子只取前两个），分解词并加入特殊词形成“[CLS], x1, [SEP], x2, [SEP]”的结构并转换为下标列表；
- decode：可以将encode方法的输出变为完整句子。

### Model（BertModel）

和BERT模型有关的代码主要写在/models/bert/modeling_bert.py中，这一份代码有一千多行，包含BERT模型的基本结构和基于它的微调模型等。继承自class BertModel(BertPreTrainedModel)

BertModel主要为transformer encoder结构，包含三个部分：
- `embeddings`，即BertEmbeddings类的实体，对应词嵌入；
- `encoder`，即BertEncoder类的实体；
- `pooler`， 即BertPooler类的实体，这一部分是可选的。
补充：注意BertModel也可以配置为Decoder，不过下文中不包含对这一部分的讨论。

BertModel的前向传播过程中各个参数的含义以及返回值：

```python
def forward(
    self,
    input_ids=None,
    attention_mask=None,
    token_type_ids=None,
    position_ids=None,
    head_mask=None,
    inputs_embeds=None,
    encoder_hidden_states=None,
    encoder_attention_mask=None,
    past_key_values=None,
    use_cache=None,
    output_attentions=None,
    output_hidden_states=None,
    return_dict=None,
): ...
```
说明：
- input_ids：经过tokenizer分词后的subword对应的下标列表；
- attention_mask：在self-attention过程中，这一块mask用于标记subword所处句子和padding的区别，将padding部分填充为0；
- token_type_ids： 标记subword当前所处句子（第一句/第二句/padding）；
- position_ids： 标记当前词所在句子的位置下标；
- head_mask： 用于将某些层的某些注意力计算无效化；
- inputs_embeds： 如果提供了，那就不需要input_ids，跨过embedding lookup过程直接作为Embedding进入Encoder计算；
- encoder_hidden_states： 这一部分在BertModel配置为decoder时起作用，将执行cross-attention而不是self-attention；
- encoder_attention_mask： 同上，在cross-attention中用于标记encoder端输入的padding；
- past_key_values：这个参数貌似是把预先计算好的K-V乘积传入，以降低cross-attention的开销（因为原本这部分是重复计算）；
- use_cache： 将保存上一个参数并传回，加速decoding；
- output_attentions：是否返回中间每层的attention输出；
- output_hidden_states：是否返回中间每层的输出；
- return_dict：是否按键值对的形式（ModelOutput类，也可以当作tuple用）返回输出，默认为真。
补充：注意，这里的head_mask对注意力计算的无效化，和下文提到的注意力头剪枝不同，而仅仅把某些注意力的计算结果给乘以这一系数。

返回值不但包含了encoder和pooler的输出，也包含了其他指定输出的部分（hidden_states和attention等，这一部分在encoder_outputs[1:]）方便取用

BertModel还有以下的方法，方便BERT玩家进行各种骚操作：
- get_input_embeddings：提取embedding中的word_embeddings即词向量部分；
- set_input_embeddings：为embedding中的word_embeddings赋值；
- _prune_heads：提供了将注意力头剪枝的函数，输入为{layer_num: list of heads to prune in this layer}的字典，可以将指定层的某些注意力头剪枝。
补充：剪枝是一个复杂的操作，需要将保留的注意力头部分的Wq、Kq、Vq和拼接后全连接部分的权重拷贝到一个新的较小的权重矩阵（注意先禁止grad再拷贝），并实时记录被剪掉的头以防下标出错。具体参考BertAttention部分的prune_heads方法。

#### BertEmbeddings

包含三个部分求和得到：
- ![结构图](https://pic3.zhimg.com/80/v2-58b65365587f269bc76358016414dc26_720w.jpg)
- word_embeddings，上文中subword对应的嵌入。
- token_type_embeddings，用于表示当前词所在的句子，辅助区别句子与padding、句子对间的差异。
- position_embeddings，句子中每个词的位置嵌入，用于区别词的顺序。和transformer论文中的设计不同，这一块是训练出来的，而不是通过Sinusoidal函数计算得到的固定嵌入。一般认为这种实现不利于拓展性（难以直接迁移到更长的句子中）。
三个embedding不带权重相加，并通过一层LayerNorm+dropout后输出，其大小为(batch_size, sequence_length, hidden_size)。

补充：这里为什么要用LayerNorm+Dropout呢？为什么要用LayerNorm而不是BatchNorm？可以参考一个不错的[回答](https://www.zhihu.com/question/395811291/answer/1260290120)

#### BertEncoder

包含多层BertLayer，这一块本身没有特别需要说明的地方，不过有一个细节值得参考：
- 利用gradient checkpointing技术以降低训练时的显存占用。
补充：gradient checkpointing即梯度检查点，通过减少保存的计算图节点压缩模型占用空间，但是在计算梯度的时候需要重新计算没有存储的值，参考论文《Training Deep Nets with Sublinear Memory Cost》，过程如下[示意图](https://pic2.zhimg.com/v2-24dfc50af29690e09dd5e8cc3319847d_b.webp)
- ![](https://pic2.zhimg.com/v2-24dfc50af29690e09dd5e8cc3319847d_b.webp)

在BertEncoder中，gradient checkpoint是通过torch.utils.checkpoint.checkpoint实现的，使用起来比较方便，可以参考[文档](https://link.zhihu.com/?target=https%3A//pytorch.org/docs/stable/checkpoint.html)

#### BertLayer

这一层包装了BertAttention和BertIntermediate+BertOutput（即Attention后的FFN部分），以及这里直接忽略的cross-attention部分（将BERT作为Decoder时涉及的部分）。

理论上，这里顺序调用三个子模块就可以，没有什么值得说明的地方。

细节：apply_chunking_to_forward和feed_forward_chunk了吗（为什么要整这么复杂，直接调用它不香吗？
- 节约显存的技术——包装了一个切分小batch或者低维数操作的功能：这里参数chunk_size其实就是切分的batch大小，而chunk_dim就是一次计算维数的大小，最后拼接起来返回。
- 不过，在默认操作中不会特意设置这两个值（在源代码中默认为0和1），所以会直接等效于正常的forward过程。

#### BertAttention

本以为attention的实现就在这里，没想到还要再下一层……其中，self成员就是多头注意力的实现，而output成员实现attention后的全连接+dropout+residual+LayerNorm一系列操作。出现了上文提到的剪枝操作，即prune_heads方法

class BertAttention(nn.Module)概括如下：
- find_pruneable_heads_and_indices是定位需要剪掉的head，以及需要保留的维度下标index；
- prune_linear_layer则负责将Wk/Wq/Wv权重矩阵（连同bias）中按照index保留没有被剪枝的维度后转移到新的矩阵。

##### BertSelfAttention

预警：这一块可以说是模型的核心区域，也是唯一涉及到公式的地方，所以将贴出大量代码。

class BertSelfAttention(nn.Module)

```python
class BertSelfAttention(nn.Module):
    def __init__(self, config):
        super().__init__()
        if config.hidden_size % config.num_attention_heads != 0 and not hasattr(config, "embedding_size"):
            raise ValueError(
                "The hidden size (%d) is not a multiple of the number of attention "
                "heads (%d)" % (config.hidden_size, config.num_attention_heads)
            )

        self.num_attention_heads = config.num_attention_heads
        self.attention_head_size = int(config.hidden_size / config.num_attention_heads)
        self.all_head_size = self.num_attention_heads * self.attention_head_size

        self.query = nn.Linear(config.hidden_size, self.all_head_size)
        self.key = nn.Linear(config.hidden_size, self.all_head_size)
        self.value = nn.Linear(config.hidden_size, self.all_head_size)

        self.dropout = nn.Dropout(config.attention_probs_dropout_prob)
        self.position_embedding_type = getattr(config, "position_embedding_type", "absolute")
        if self.position_embedding_type == "relative_key" or self.position_embedding_type == "relative_key_query":
            self.max_position_embeddings = config.max_position_embeddings
            self.distance_embedding = nn.Embedding(2 * config.max_position_embeddings - 1, self.attention_head_size)

        self.is_decoder = config.is_decoder
```

- 除掉熟悉的query、key、value三个权重和一个dropout，这里还有一个谜一样的position_embedding_type，以及decoder标记（当然，我不打算介绍cross-attenton部分）；
- 注意，hidden_size和all_head_size在一开始是一样的。至于为什么要看起来多此一举地设置这一个变量——显然是因为上面那个剪枝函数，剪掉几个attention head以后all_head_size自然就小了；
- hidden_size必须是num_attention_heads的整数倍，以bert-base为例，每个attention包含12个head，hidden_size是768，所以每个head大小即attention_head_size=768/12=64；
- position_embedding_type是什么？

multi-head self-attention的基本公式
- ![](https://pic4.zhimg.com/80/v2-0c1ffd5ec70918a7c6c42fc7aafd7b0b_720w.png)

注意力头，众所周知是并行计算的，所以上面的query、key、value三个权重是唯一的——这并不是所有heads共享了权重，而是“拼接”起来了。

补充：原论文中多头的理由为Multi-head attention allows the model to jointly attend to information from different representation subspaces at different positions. With a single attention head, averaging inhibits this.而另一个比较靠谱的[分析](https://www.zhihu.com/question/341222779/answer/814111138)

forward方法

```python
def transpose_for_scores(self, x):
        new_x_shape = x.size()[:-1] + (self.num_attention_heads, self.attention_head_size)
        x = x.view(*new_x_shape)
        return x.permute(0, 2, 1, 3)

    def forward(
        self,
        hidden_states,
        attention_mask=None,
        head_mask=None,
        encoder_hidden_states=None,
        encoder_attention_mask=None,
        past_key_value=None,
        output_attentions=False,
    ):
        mixed_query_layer = self.query(hidden_states)

        # 省略一部分cross-attention的计算
        key_layer = self.transpose_for_scores(self.key(hidden_states))
        value_layer = self.transpose_for_scores(self.value(hidden_states))
        query_layer = self.transpose_for_scores(mixed_query_layer)

        # Take the dot product between "query" and "key" to get the raw attention scores.
        attention_scores = torch.matmul(query_layer, key_layer.transpose(-1, -2))
        # ...
```

- transpose_for_scores用来把hidden_size拆成多个头输出的形状，并且将中间两维转置以进行矩阵相乘；
- 这里key_layer/value_layer/query_layer的形状为：(batch_size, num_attention_heads, sequence_length, attention_head_size)；
- 这里attention_scores的形状为：(batch_size, num_attention_heads, sequence_length, sequence_length)，符合多个头单独计算获得的attention map形状。
- 到这里实现了K与Q相乘，获得raw attention scores的部分，按公式接下来应该是按dk进行scaling并做softmax的操作。奇怪的positional_embedding，以及一堆爱因斯坦求和

。。。

get_extended_attention_mask这个函数是在什么时候被调用的呢？和BertModel有什么关系呢？
- BertModel的继承细节了：BertModel继承自BertPreTrainedModel ，后者继承自PreTrainedModel，而PreTrainedModel继承自[nn.Module, ModuleUtilsMixin, GenerationMixin] 三个基类。——好复杂的封装！
- 这也就是说， BertModel必然在中间的某个步骤对原始的attention_mask调用了get_extended_attention_mask ，导致attention_mask从原始的[1, 0]变为[0, -1e4]的取值。BertModel的前向传播过程中找到了这一调用（第944行）
- 问题解决了：这一方法不但实现了改变mask的值，还将其广播（broadcast）为可以直接与attention map相加的形状。

细节有：
- 按照每个头的维度进行缩放，对于bert-base就是64的平方根即8；
- attention_probs不但做了softmax，还用了一次dropout，这是担心attention矩阵太稠密吗……这里也提到很不寻常，但是原始Transformer论文就是这么做的；
- head_mask就是之前提到的对多头计算的mask，如果不设置默认是全1，在这里就不会起作用；
- context_layer即attention矩阵与value矩阵的乘积，原始的大小为：(batch_size, num_attention_heads, sequence_length, attention_head_size) ；
- context_layer进行转置和view操作以后，形状就恢复了(batch_size, sequence_length, hidden_size)。

#### BertSelfOutput

这一块操作略多但不复杂

```python
class BertSelfOutput(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.dense = nn.Linear(config.hidden_size, config.hidden_size)
        self.LayerNorm = nn.LayerNorm(config.hidden_size, eps=config.layer_norm_eps)
        self.dropout = nn.Dropout(config.hidden_dropout_prob)

    def forward(self, hidden_states, input_tensor):
        hidden_states = self.dense(hidden_states)
        hidden_states = self.dropout(hidden_states)
        hidden_states = self.LayerNorm(hidden_states + input_tensor)
        return hidden_states
```

补充：这里又出现了LayerNorm和Dropout的组合，只不过这里是先Dropout，进行残差连接后再进行LayerNorm。至于为什么要做残差连接，最直接的目的就是降低网络层数过深带来的训练难度，对原始输入更加敏感

#### BertIntermediate

看完了BertAttention，在Attention后面还有一个全连接+激活的操作

```python
class BertIntermediate(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.dense = nn.Linear(config.hidden_size, config.intermediate_size)
        if isinstance(config.hidden_act, str):
            self.intermediate_act_fn = ACT2FN[config.hidden_act]
        else:
            self.intermediate_act_fn = config.hidden_act

    def forward(self, hidden_states):
        hidden_states = self.dense(hidden_states)
        hidden_states = self.intermediate_act_fn(hidden_states)
        return hidden_states
```

- 全连接做了一个扩展，以bert-base为例，扩展维度为3072，是原始维度768的4倍之多；
  - 补充：为什么要过一个FFN？不知道……谷歌最近的[论文](https://arxiv.org/abs/2103.03404)貌似说明只有attention的模型什么用都没有
- 激活函数默认实现为gelu（Gaussian Error Linerar Units(GELUS）： ![公式](https://www.zhihu.com/equation?tex=GELU%28x%29%3DxP%28X%3C%3Dx%29%3Dx%CE%A6%28x%29+) ；当然，它是无法直接计算的，可以用一个包含tanh的表达式进行近似（略）。

为什么在transformer中要用这个激活函数
- 补充：看了一些研究，应该是说GeLU比ReLU这些表现都好，以至于后续的语言模型都沿用了这一激活函数。

#### BertOutput

在这里又是一个全连接+dropout+LayerNorm，还有一个残差连接residual connect

```python
class BertOutput(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.dense = nn.Linear(config.intermediate_size, config.hidden_size)
        self.LayerNorm = nn.LayerNorm(config.hidden_size, eps=config.layer_norm_eps)
        self.dropout = nn.Dropout(config.hidden_dropout_prob)

    def forward(self, hidden_states, input_tensor):
        hidden_states = self.dense(hidden_states)
        hidden_states = self.dropout(hidden_states)
        hidden_states = self.LayerNorm(hidden_states + input_tensor)
        return hidden_states
```

这里的操作和BertSelfOutput不能说没有关系，只能说一模一样……非常容易混淆的两个组件。

### BertPooler

这一层只是简单地取出了句子的第一个token，即[CLS]对应的向量，然后过一个全连接层和一个激活函数后输出

```python
class BertPooler(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.dense = nn.Linear(config.hidden_size, config.hidden_size)
        self.activation = nn.Tanh()

    def forward(self, hidden_states):
        # We "pool" the model by simply taking the hidden state corresponding
        # to the first token.
        first_token_tensor = hidden_states[:, 0]
        pooled_output = self.dense(first_token_tensor)
        pooled_output = self.activation(pooled_output)
        return pooled_output
```

### 小结

- 在HuggingFace实现的Bert模型中，使用了多种节约显存的技术：
  - gradient checkpoint，不保留前向传播节点，只在用时计算；
  - apply_chunking_to_forward，按多个小批量和低维度计算FFN部分；
- BertModel包含复杂的封装和较多的组件。以bert-base为例，主要组件如下：
  - 总计Dropout出现了1+(1+1+1)x12=37次；
  - 总计LayerNorm出现了1+(1+1)x12=25次；
  - 总计dense全连接层出现了(1+1+1)x12+1=37次，并不是每个dense都配了激活函数
- BertModel有极大的参数量。以bert-base为例，其参数量为109M，具体计算过程可以[参考](https://zhuanlan.zhihu.com/p/144582114)

### BERT-based Models

基于BERT的模型都写在/models/bert/modeling_bert.py里面，包括BERT预训练模型和BERT分类模型，UML图如下：
- ![](https://pic1.zhimg.com/80/v2-0e126f74d40d2db8bc133bc67f8055b4_720w.png)

BERT模型一图流（建议保存后放大查看）

首先，以下所有的模型都是基于BertPreTrainedModel这一抽象基类的，而后者则基于一个更大的基类PreTrainedModel。这里我们关注BertPreTrainedModel的功能：
- 用于初始化模型权重，同时维护继承自PreTrainedModel的一些标记身份或者加载模型时的类变量。

#### BertForPreTraining

众所周知，BERT预训练任务包括两个：
- Masked Language Model（MLM）：在句子中随机用[MASK]替换一部分单词，然后将句子传入 BERT 中编码每一个单词的信息，最终用[MASK]的编码信息预测该位置的正确单词，这一任务旨在训练模型根据上下文理解单词的意思；
- Next Sentence Prediction（NSP）：将句子对A和B输入BERT，使用[CLS]的编码信息进行预测B是否A的下一句，这一任务旨在训练模型理解预测句子间的关系。

![](https://pic4.zhimg.com/80/v2-778b166945e69e7689cccfe7532e74e3_720w.jpg)

对应到代码中，这一融合两个任务的模型就是BertForPreTraining。略

这份代码里面也包含了对于只想对单个目标进行预训练的BERT模型（具体细节不作展开）：
- BertForMaskedLM：只进行MLM任务的预训练；
  - 基于BertOnlyMLMHead，而后者也是对BertLMPredictionHead的另一层封装；
- BertLMHeadModel：这个和上一个的区别在于，这一模型是作为decoder运行的版本；
  - 同样基于BertOnlyMLMHead；
- BertForNextSentencePrediction：只进行NSP任务的预训练。
  - 基于BertOnlyNSPHead，内容就是一个线性层……

各种Fine-tune模型，基本都是分类任务：
- ![](https://pic1.zhimg.com/80/v2-d870cb6a4cc1b6f5f7f54cd9f563e468_720w.jpg)

#### BertForSequenceClassification

这一模型用于句子分类（也可以是回归）任务，比如GLUE benchmark的各个任务。
- 句子分类的输入为句子（对），输出为单个分类标签。
结构上很简单，就是BertModel（有pooling）过一个dropout后接一个线性层输出分类

在前向传播时，和上面预训练模型一样需要传入labels输入。
- 如果初始化的num_labels=1，那么就默认为回归任务，使用MSELoss；
- 否则认为是分类任务。

#### BertForMultipleChoice

这一模型用于多项选择，如RocStories/SWAG任务。
- 多项选择任务的输入为一组分次输入的句子，输出为选择某一句子的单个标签。
结构上与句子分类相似，只不过线性层输出维度为1，即每次需要将每个样本的多个句子的输出拼接起来作为每个样本的预测分数。
- 实际上，具体操作时是把每个batch的多个句子一同放入的，所以一次处理的输入为[batch_size, num_choices]数量的句子，因此相同batch大小时，比句子分类等任务需要更多的显存，在训练时需要小心。

#### BertForTokenClassification

这一模型用于序列标注（词分类），如NER任务。
- 序列标注任务的输入为单个句子文本，输出为每个token对应的类别标签。
由于需要用到每个token对应的输出而不只是某几个，所以这里的BertModel不用加入pooling层；
- 同时，这里将_keys_to_ignore_on_load_unexpected这一个类参数设置为[r"pooler"]，也就是在加载模型时对于出现不需要的权重不发生报错。

#### BertForQuestionAnswering

这一模型用于解决问答任务，例如SQuAD任务。
- 问答任务的输入为问题+（对于BERT只能是一个）回答组成的句子对，输出为起始位置和结束位置用于标出回答中的具体文本。
这里需要两个输出，即对起始位置的预测和对结束位置的预测，两个输出的长度都和句子长度一样，从其中挑出最大的预测值对应的下标作为预测的位置。
- 对超出句子长度的非法label，会将其压缩（torch.clamp_）到合理范围。

作为一个迟到的补充，这里稍微介绍一下ModelOutput这个类。它作为上述各个模型输出包装的基类，同时支持字典式的存取和下标顺序的访问，继承自python原生的OrderedDict 类。

### BERT训练和优化

#### Pre-Training

预训练阶段，除了众所周知的15%、80%mask比例，有一个值得注意的地方就是参数共享。

不止BERT，所有huggingface实现的PLM的word embedding和masked language model的预测权重在初始化过程中都是共享的：


#### Fine-Tuning

微调也就是下游任务阶段，也有两个值得注意的地方。

##### AdamW

首先介绍一下BERT的优化器：AdamW（AdamWeightDecayOptimizer）。

这一优化器来自ICLR 2017的Best Paper：《Fixing Weight Decay Regularization in Adam》中提出的一种用于修复Adam的权重衰减错误的新方法。论文指出，L2正则化和权重衰减在大部分情况下并不等价，只在SGD优化的情况下是等价的；而大多数框架中对于Adam+L2正则使用的是权重衰减的方式，两者不能混为一谈。

##### Warmup

BERT的训练中另一个特点在于Warmup，其含义为：
- 在训练初期使用较小的学习率（从0开始），在一定步数（比如1000步）内逐渐提高到正常大小（比如上面的2e-5），避免模型过早进入局部最优而过拟合；
- 在训练后期再慢慢将学习率降低到0，避免后期训练还出现较大的参数变化。
在Huggingface的实现中，可以使用多种warmup策略
- CONSTANT：保持固定学习率不变；
- CONSTANT_WITH_WARMUP：在每一个step中线性调整学习率；
- LINEAR：上文提到的两段式调整；
- COSINE：和两段式调整类似，只不过采用的是三角函数式的曲线调整；
- COSINE_WITH_RESTARTS：训练中将上面COSINE的调整重复n次；
- POLYNOMIAL：按指数曲线进行两段式调整。


### 入门代码

```python
import torch
from transformers import BertModel, BertTokenizer

# 调用bert-base模型，同时模型的词典经过小写处理
model_name = 'bert-base-uncased'
model_name = 'bert-base-chinese' # 中文模型
# ----------- 分词器 ------------
# 读取模型对应的tokenizer
tokenizer = BertTokenizer.from_pretrained(model_name)
tokenizer = BertTokenizer.from_pretrained(model_name, cache_dir='./transformers/')	# cache_dir表示将预训练文件下载到本地指定文件夹下
# 获取词表
vocab = tokenizer.get_vocab()
print("vocab: ", len(vocab))

# ----------- 模型 ------------
# 载入模型
model = BertModel.from_pretrained(model_name)
# 本地保存
model = BertModel.from_pretrained(model_name, cache_dir='./transformers/')
# 输出隐含层
model = BertModel.from_pretrained('./model', output_hidden_states = True,)

# 获取词向量矩阵
word_embedding = model.get_input_embeddings()
embed_weights = word_embedding.weight
print("embed_weights: ", embed_weights.shape, type(embed_weights))
# embed_weights: torch.Size([30522, 768]
# ----------- 测试 ------------
# （1）单行文本
input_text = "Here is some text to encode"
# 通过tokenizer把文本变成 token_id
input_ids = tokenizer.encode(input_text, add_special_tokens=True)
# input_ids: [101, 2182, 2003, 2070, 3793, 2000, 4372, 16044, 102]
input_ids = torch.tensor([input_ids])
# 中文测试
input_ids = torch.tensor(tokenizer.encode("遇见被老师提问问题", add_special_tokens=True)).unsqueeze(0)	# 增加一个维度因为输入到Bert模型中要求二维(Batch_size, seq_len)
print("input_ids: ", input_ids)
output = model(input_ids=input_ids)
last_hidden_states_0 = output[0]
print("last_hidden_states_0.shape: ", last_hidden_states_0.shape)
last_hidden_states_1 = output[1]
print("last_hidden_states_1.shape: ", ast_hidden_states_1.shape)
# input_ids:  tensor([[ 101, 6878, 6224, 6158, 5439, 2360, 2990, 7309, 7309, 7579,  102]])
# last_hidden_states_0.shape: torch.Size([1, 11, 768]
# last_hidden_states_1.shape: torch.Size([1, 768]

# （2）pair文本对
text_a = "EU rejects German call to boycott British lamb ."
text_b = "This tokenizer inherits from :class: transformers.PreTrainedTokenizer"

tokens_encode = tokenizer.encode_plus(text=text, text_pair=text_b, max_length=20, truncation_strategy="longest_first", truncation=True)
print("tokens_encode: ", tokens_encode)
# tokens_encode:  {'input_ids': [2, 2898, 12170, 18, 548, 645, 20, 16617, 388, 8624, 3, 48, 20, 2853, 11907, 17569, 18, 37, 13, 3], 'token_type_ids': [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1], 'attention_mask': [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]}
# 输出以列表的形式保存
# - input_ids的内容与encode()方法返回的结果相同，为token转化为id之后的表示。
# - token_type_ids的内容表示用来区别两个文本，为0表示第一个文本，为1表示第二个文本。
# - attention_mask表示文本padding的部分(这里没有，所有全为1)。
# 每个部分分别对应于BertModel的输入参数，使用时取出对应键值的内容输入到相应参数即可
# forward(input_ids=None, attention_mask=None, token_type_ids=None, position_ids=None, head_mask=None, inputs_embeds=None, output_attentions=None, output_hidden_states=None, return_dict=None)[SOURCE]


# 获得BERT模型最后一个隐层结果
with torch.no_grad():
    last_hidden_states = model(input_ids)[0]  # Models outputs are now tuples

""" tensor([[[-0.0549,  0.1053, -0.1065,  ..., -0.3550,  0.0686,  0.6506],
         [-0.5759, -0.3650, -0.1383,  ..., -0.6782,  0.2092, -0.1639],
         [-0.1641, -0.5597,  0.0150,  ..., -0.1603, -0.1346,  0.6216],
         ...,
         [ 0.2448,  0.1254,  0.1587,  ..., -0.2749, -0.1163,  0.8809],
         [ 0.0481,  0.4950, -0.2827,  ..., -0.6097, -0.1212,  0.2527],
         [ 0.9046,  0.2137, -0.5897,  ...,  0.3040, -0.6172, -0.1950]]]) 
	shape: (1, 9, 768)     
"""
# ----------- 配置文件 ------------
from transformers import BertConfig
# 获取bert模型结构参数
bert_config = BertConfig.from_pretrained('bert-base-uncased')
print(bert_config.get_config_dict('bert-base-uncased'))
# ({'architectures': ['BertForMaskedLM'], 'attention_probs_dropout_prob': 0.1, 'hidden_act': 'gelu', 'hidden_dropout_prob': 0.1, 'hidden_size': 768, 'initializer_range': 0.02, 'intermediate_size': 3072, 'layer_norm_eps': 1e-12, 'max_position_embeddings': 512, 'model_type': 'bert', 'num_attention_heads': 12, 'num_hidden_layers': 12, 'pad_token_id': 0, 'type_vocab_size': 2, 'vocab_size': 30522}, {})
# ----------- albert模型 ------------
from transformers import AlbertTokenizer, AlbertModel
# albert模型
tokenizer = AlbertTokenizer.from_pretrained("albert-base-v2", cache_dir="./transformers/")
model = AlbertModel.from_pretrained("albert-base-v2", cache_dir="transformers/")
# 多种模型，如XLNet、DistilBBET、RoBERTa等模型都可以以同样的方式进行导

# ----------- 学习率设置 ------------
from transformers import AdaW, get_linear_schedule_with_warmup

warmup_steps = int(args.warmup_proportion * num_train_optimization_steps)	# 定义warmup方式的步长
    optimizer = AdamW(optimizer_grouped_parameters, lr=args.learning_rate, eps=args.adam_epsilon)	# 定义优化器
    scheduler = get_linear_schedule_with_warmup(optimizer, num_warmup_steps=warmup_steps, num_training_steps=num_train_optimization_steps)		# 更新学习率的方式

# ----------- tf模型训练 ------------
def data_incoming(path):
    x = []
    y = []
    with open(path, 'r') as f:
        for line in f.readlines():
            line = line.strip('\n')
            line = line.split('\t')
            x.append(line[0])
            y.append(line[1])
    df_row = pd.DataFrame([x, y], index=['text', 'label'])
    df_row = df_row.T
    df_label = pd.DataFrame({"label": ['YOUR_LABEL'], 'y': list(range(10))})
    output = pd.merge(df_row, df_label, on='label', how='left')
    return output

def convert_example_to_feature(review):
    return tokenizer.encode_plus(review,
                                 max_length=256,
                                 pad_tp_max_length=True,
                                 return_attention_mask=True,
                                 truncation=True
                                 )

def map_example_to_dict(input_ids, attention_mask, token_type_ids, label):
    return {
               "input_ids": input_ids,
               "token_type_ids": token_type_ids,
               "attention_mask": attention_mask,
           }, label

def encode_example(ds, limit=-1):
    input_ids_list = []
    token_type_ids_list = []
    attention_maks_list = []
    label_list = []
    if limit > 0:
        ds.take(limit)
    for index, row in ds.iterrows():
        review = row["text"]
        label = row['y']
        bert_input = convert_example_to_feature(review)
        input_ids_list.append(bert_input["input_ids"])
        token_type_ids_list.append(bert_input['token_type_ids'])
        attention_maks_list.append(bert_input['attention_maks'])
        label_list.append([label])
    return tf.data.Dataset.from_tensor_slices(
        (input_ids_list, token_type_ids_list, attention_maks_list, label_list)).map(map_example_to_dict)

train = data_incoming(data_path + 'train.tsv')
test = data_incoming(data_path + 'test.tsv')
train = encode_example(train).shuffle(100000).batch(100)
test = encode_example(test).batch(100)
model = TFBertForSequenceClassification(model_path, num_labels=num_labels)
optimizer = tf.keras.optimizers.Adam(1e-5)
model.compile(optimizer=optimizer, loss=tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True))
model.fit(train, epochs=epoch, verbose=1, validation_data=test)

```

包括import在内的不到十行代码，我们就实现了读取一个预训练过的BERT模型，来encode我们指定的一个文本，对文本的每一个token生成768维的向量。如果是二分类任务，我们接下来就可以把第一个token也就是\[CLS]的768维向量，接一个linear层，预测出分类的logits，或者根据标签进行训练。

**BERT configuration**

Transformers的源码：路径 src/transformers 下有很多的python代码文件。以 configuration 开头的都是各个模型的配置代码，比如 configuration_bert.py，主要是一个继承自 PretrainedConfig 的类 BertConfig的定义，以及不同BERT模型的config文件的下载路径，下方显示前三个。
- bert-base-uncased的模型的配置，其中包括dropout, hidden_size, num_hidden_layers, vocab_size 等等。
- 比如bert-base-uncased的配置它是12层的，词典大小30522等等，甚至可以在config里利用output_hidden_states配置是否输出所有hidden_state。

```python
BERT_PRETRAINED_CONFIG_ARCHIVE_MAP = {
    "bert-base-uncased": "https://s3.amazonaws.com/models.huggingface.co/bert/bert-base-uncased-config.json",
    "bert-large-uncased": "https://s3.amazonaws.com/models.huggingface.co/bert/bert-large-uncased-config.json",
    "bert-base-cased": "https://s3.amazonaws.com/models.huggingface.co/bert/bert-base-cased-config.json",
}
```

**BERT tokenization**

以tokenization开头的都是跟vocab有关的代码，比如在 tokenization_bert.py 中有函数如whitespace_tokenize，还有不同的tokenizer的类。同时也有各个模型对应的vocab.txt。从第一个链接进去就是bert-base-uncased的词典，这里面有30522个词，对应着config里面的vocab_size。
- 其中，第0个token是\[pad]，第101个token是\[CLS]，第102个token是\[SEP]，所以之前encode得到的 [101, 2182, 2003, 2070, 3793, 2000, 4372, 16044, 102] ，其实tokenize后convert前的token就是 [ '[ CLS]', 'here', 'is', 'some', 'text', 'to', 'en', '##code', '[ SEP]' ]，经过之前BERT论文的介绍，大家应该都比较熟悉了。
- BERT的vocab预留了不少unused token，如果我们会在文本中使用特殊字符，在vocab中没有，这时候就可以通过替换vacab中的unused token，实现对新的token的embedding进行训练。

```python
PRETRAINED_VOCAB_FILES_MAP = {
    "vocab_file": {
        "bert-base-uncased": "https://s3.amazonaws.com/models.huggingface.co/bert/bert-base-uncased-vocab.txt",
        "bert-large-uncased": "https://s3.amazonaws.com/models.huggingface.co/bert/bert-large-uncased-vocab.txt",
        "bert-base-cased": "https://s3.amazonaws.com/models.huggingface.co/bert/bert-base-cased-vocab.txt",
    }
}
```

**BERT modeling**

以modeling开头的就是最关心的模型代码，比如 modeling_bert.py。文件中有许多不同的预训练模型以供下载，可以按需获取。

代码中可以重点看**BertModel**类，它就是BERT模型的基本代码, 类定义中，由embedding，encoder，pooler组成，forward时顺序经过三个模块，输出output。

```python
class BertModel(BertPreTrainedModel):
    def __init__(self, config):
        super().__init__(config)
        self.config = config

        self.embeddings = BertEmbeddings(config)
        self.encoder = BertEncoder(config)
        self.pooler = BertPooler(config)

        self.init_weights()
        
 def forward(
        self, input_ids=None, attention_mask=None, token_type_ids=None,
        position_ids=None, head_mask=None, inputs_embeds=None,
        encoder_hidden_states=None, encoder_attention_mask=None,
    ):
    """ 省略部分代码 """
    
        embedding_output = self.embeddings(
            input_ids=input_ids, position_ids=position_ids, token_type_ids=token_type_ids, inputs_embeds=inputs_embeds
        )
        encoder_outputs = self.encoder(
            embedding_output,
            attention_mask=extended_attention_mask,
            head_mask=head_mask,
            encoder_hidden_states=encoder_hidden_states,
            encoder_attention_mask=encoder_extended_attention_mask,
        )
        sequence_output = encoder_outputs[0]
        pooled_output = self.pooler(sequence_output)

        outputs = (sequence_output, pooled_output,) + encoder_outputs[
            1:
        ]  # add hidden_states and attentions if they are here
        return outputs  # sequence_output, pooled_output, (hidden_states), (attentions)
```
BertEmbeddings这个类中可以清楚的看到，embedding由三种embedding相加得到，经过layernorm 和 dropout后输出。

```python
def __init__(self, config):
        super().__init__()
        self.word_embeddings = nn.Embedding(config.vocab_size, config.hidden_size, padding_idx=0)
        self.position_embeddings = nn.Embedding(config.max_position_embeddings, config.hidden_size)
        self.token_type_embeddings = nn.Embedding(config.type_vocab_size, config.hidden_size)
        # self.LayerNorm is not snake-cased to stick with TensorFlow model variable name and be able to load
        # any TensorFlow checkpoint file
        self.LayerNorm = BertLayerNorm(config.hidden_size, eps=config.layer_norm_eps)
        self.dropout = nn.Dropout(config.hidden_dropout_prob)
        
def forward(self, input_ids=None, token_type_ids=None, position_ids=None, inputs_embeds=None):
        """ 省略 embedding生成过程 """
        embeddings = inputs_embeds + position_embeddings + token_type_embeddings
        embeddings = self.LayerNorm(embeddings)
        embeddings = self.dropout(embeddings)
        return embeddings
```

BertEncoder主要将embedding的输出，逐个经过每一层Bertlayer的处理，得到各层hidden_state，再根据config的参数，来决定最后是否所有的hidden_state都要输出，BertLayer的内容展开的话，篇幅过长，读者感兴趣可以自己一探究竟。

```python
class BertEncoder(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.output_attentions = config.output_attentions
        self.output_hidden_states = config.output_hidden_states
        self.layer = nn.ModuleList([BertLayer(config) for _ in range(config.num_hidden_layers)])

    def forward(
        self,
        hidden_states,
        attention_mask=None,
        head_mask=None,
        encoder_hidden_states=None,
        encoder_attention_mask=None,
    ):
        all_hidden_states = ()
        all_attentions = ()
        for i, layer_module in enumerate(self.layer):
            if self.output_hidden_states:
                all_hidden_states = all_hidden_states + (hidden_states,)

            layer_outputs = layer_module(
                hidden_states, attention_mask, head_mask[i], encoder_hidden_states, encoder_attention_mask
            )
            hidden_states = layer_outputs[0]

            if self.output_attentions:
                all_attentions = all_attentions + (layer_outputs[1],)
        # Add last layer
        if self.output_hidden_states:
            all_hidden_states = all_hidden_states + (hidden_states,)

        outputs = (hidden_states,)
        if self.output_hidden_states:
            outputs = outputs + (all_hidden_states,)
        if self.output_attentions:
            outputs = outputs + (all_attentions,)
        return outputs  # last-layer hidden state, (all hidden states), (all attentions)
```

Bertpooler 其实就是将BERT的\[CLS]的hidden_state 取出，经过一层DNN和Tanh计算后输出。

```python
class BertPooler(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.dense = nn.Linear(config.hidden_size, config.hidden_size)
        self.activation = nn.Tanh()

    def forward(self, hidden_states):
        # We "pool" the model by simply taking the hidden state corresponding
        # to the first token.
        first_token_tensor = hidden_states[:, 0]
        pooled_output = self.dense(first_token_tensor)
        pooled_output = self.activation(pooled_output)
        return pooled_output
```

在这个文件中还有上述基础的BertModel的进一步的变化，比如BertForMaskedLM，BertForNextSentencePrediction这些是Bert加了预训练头的模型，还有BertForSequenceClassification， BertForQuestionAnswering 这些加上了特定任务头的模型。

[Huggingface简介及BERT代码浅析](https://zhuanlan.zhihu.com/p/120315111)

### pipeline NLP快速应用

[参考文章](https://blog.csdn.net/YangStudent/article/details/118879560)：pipeline涉及多个NLP任务，transformers库，pipline函数
- 分类，实体识别，生成，预测，问答，摘要，翻译，相似度，迁移学习，预训练模型，transformer概念
- 类似sklearn的pipeline流水线机制

```python
from transformers import pipeline
 
# 1. 情感分类
classfier1 = pipeline("sentiment-analysis")
print(classfier1("My wife is a beautiful girl"))
# [{'label': 'POSITIVE', 'score': 0.9998767971992493}]
 
# print(classfier1('I am pool', 'My PBL is beautiful, but I love it'))
# [{'label': 'NEGATIVE', 'score': 0.7211759090423584}, {'label': 'POSITIVE', 'score': 0.9998372197151184}]
 
classfier2  = pipeline("zero-shot-classification")
print(classfier2(
    "This a project about the Style transfer",
    candidate_labels = ['education', 'politics', 'business']
))
# {'sequence': 'This a project about the Style transfer', 'labels': ['business', 'education', 'politics'], 'scores': [0.673454225063324, 0.17288313806056976, 0.15366260707378387]}
 
# 2.文本生成
generator1 = pipeline("text-generation") # 默认的文本生成模型是gpt2
print(generator1(
    "I owe 2300 yuan",
    max_length = 50, # 指定生成句的大小
    num_return_sequence = 2, # 指定生成的句子个数
))
# [{'generated_text': "I owe 2300 yuan from the bank since it made me a few dollars but it's just so damn hard to pay. I'm on a two-yearly policy and the current rate I'm using has to be 100 yuan. So, I"}]
#
 
generator2 = pipeline("text-generation", model="distilgpt2") # 指定模型为distilgpt2,轻量的gpt2
print(generator2(
    "I owe 2300 yuan"
))
# [{'generated_text': 'I owe 2300 yuan to the country.”'}]
 
# 3.预测文本遮罩
unmasker = pipeline('fill-mask') # 基于bert
print(unmasker('My favorite girl is <mask>'))
# top_k的含义是返回最有可能的两种结果
# [{'sequence': '<s>My favorite girl is…</s>', 'score': 0.035072073340415955, 'token': 1174, 'token_str': 'âĢ¦'}, {'sequence': '<s>My favorite girl is...</s>', 'score': 0.034020423889160156, 'token': 734, 'token_str': '...'}, {'sequence': '<s>My favorite girl is Barbie</s>', 'score': 0.01795039512217045, 'token': 31304, 'token_str': 'ĠBarbie'}, {'sequence': '<s>My favorite girl is Cinderella</s>', 'score': 0.011553746648132801, 'token': 34800, 'token_str': 'ĠCinderella'}, {'sequence': '<s>My favorite girl is ______</s>', 'score': 0.010862686671316624, 'token': 47259, 'token_str': 'Ġ______'}]
 
# 4.命名实体识别，识别一句话中的，实体，如人，组织，或地点
ner = pipeline('ner', grouped_entities=True) # grouped_entities=True, 允许相似的实体分组到同一个组内
print(ner("I'm working in CCNU , is a beautiful school , and I like Wollongong"))
# [{'entity_group': 'I-ORG', 'score': 0.9960816502571106, 'word': 'CCNU'}, {'entity_group': 'I-LOC', 'score': 0.9867993593215942, 'word': 'Wollongong'}]
 
 
# 5.提取问题答案 在context中提取出question的答案
question_answer = pipeline('question-answering')
print(question_answer(
    question = 'Who are you?',
    context = 'I am XsY and good luck to see you',
))
# {'score': 0.6727198958396912, 'start': 5, 'end': 8, 'answer': 'XsY'}
 
# 6.文本摘要
summarizer = pipeline('summarization')
print(summarizer("""    America has changed dramatically during recent years. Not only has the number of 
    graduates in traditional engineering disciplines such as mechanical, civil, 
    electrical, chemical, and aeronautical engineering declined, but in most of 
    the premier American universities engineering curricula now concentrate on 
    and encourage largely the study of engineering science. As a result, there 
    are declining offerings in engineering subjects dealing with infrastructure, 
    the environment, and related issues, and greater concentration on high 
    technology subjects, largely supporting increasingly complex scientific 
    developments. While the latter is important, it should not be at the expense 
    of more traditional engineering.
    Rapidly developing economies such as China and India, as well as other 
    industrial countries in Europe and Asia, continue to encourage and advance 
    the teaching of engineering. Both China and India, respectively, graduate 
    six and eight times as many traditional engineers as does the United States. 
    Other industrial countries at minimum maintain their output, while America 
    suffers an increasingly serious decline in the number of engineering graduates 
    and a lack of well-educated engineers.
    """))
# [{'summary_text': ' America has changed dramatically during recent years . The number of engineering graduates in the U.S. has declined in traditional engineering disciplines such as mechanical, civil, electrical, chemical, and aeronautical engineering . Rapidly developing economies such as China and India, as well as other industrial countries, continue to encourage and advance the teaching of engineering .'}]
 
 
# 7.翻译
translator = pipeline('translation', model='Helsinki-NLP/opus-mt-zh-en')
print(translator('我是真的很穷不要再坑我了'))
# [{'translation_text': "I'm really poor. Don't lie to me again."}]
```



### 模型信息

[Transformers是TensorFlow 2.0和PyTorch的最新自然语言处理库](https://pytorchchina.com/2020/02/20/transformers_1/)

每个模型架构的详细示例(Bert、GPT、GPT-2、Transformer-XL、XLNet和XLM)可以在完整[文档](https://huggingface.co/transformers/)中找到

```python
import torch
from transformers import *

# transformer有一个统一的API
# 有10个Transformer结构和30个预训练权重模型。
#模型|分词|预训练权重
MODELS = [(BertModel,       BertTokenizer,       'bert-base-uncased'),
          (OpenAIGPTModel,  OpenAIGPTTokenizer,  'openai-gpt'),
          (GPT2Model,       GPT2Tokenizer,       'gpt2'),
          (CTRLModel,       CTRLTokenizer,       'ctrl'),
          (TransfoXLModel,  TransfoXLTokenizer,  'transfo-xl-wt103'),
          (XLNetModel,      XLNetTokenizer,      'xlnet-base-cased'),
          (XLMModel,        XLMTokenizer,        'xlm-mlm-enfr-1024'),
          (DistilBertModel, DistilBertTokenizer, 'distilbert-base-cased'),
          (RobertaModel,    RobertaTokenizer,    'roberta-base'),
          (XLMRobertaModel, XLMRobertaTokenizer, 'xlm-roberta-base'),
         ]

# 要使用TensorFlow 2.0版本的模型，只需在类名前面加上“TF”，例如。“TFRobertaModel”是TF2.0版本的PyTorch模型“RobertaModel”

# 让我们用每个模型将一些文本编码成隐藏状态序列:
for model_class, tokenizer_class, pretrained_weights in MODELS:
    # 加载pretrained模型/分词器
    tokenizer = tokenizer_class.from_pretrained(pretrained_weights)
    model = model_class.from_pretrained(pretrained_weights)

    # 编码文本
    input_ids = torch.tensor([tokenizer.encode("Here is some text to encode", add_special_tokens=True)])  # 添加特殊标记
    with torch.no_grad():
        last_hidden_states = model(input_ids)[0]  # 模型输出是元组

# 每个架构都提供了几个类，用于对下游任务进行调优，例如。
BERT_MODEL_CLASSES = [BertModel, BertForPreTraining, BertForMaskedLM, BertForNextSentencePrediction,
                      BertForSequenceClassification, BertForTokenClassification, BertForQuestionAnswering]

# 体系结构的所有类都可以从该体系结构的预训练权重开始
#注意，为微调添加的额外权重只在需要接受下游任务的训练时初始化

pretrained_weights = 'bert-base-uncased'
tokenizer = BertTokenizer.from_pretrained(pretrained_weights)
for model_class in BERT_MODEL_CLASSES:
    # 载入模型/分词器
    model = model_class.from_pretrained(pretrained_weights)

    # 模型可以在每一层返回隐藏状态和带有注意力机制的权值
    model = model_class.from_pretrained(pretrained_weights,
                                        output_hidden_states=True,
                                        output_attentions=True)
    input_ids = torch.tensor([tokenizer.encode("Let's see all hidden-states and attentions on this text")])
    all_hidden_states, all_attentions = model(input_ids)[-2:]

    #模型与Torchscript兼容
    model = model_class.from_pretrained(pretrained_weights, torchscript=True)
    traced_model = torch.jit.trace(model, (input_ids,))

    # 模型和分词的简单序列化
    model.save_pretrained('./directory/to/save/')  # 保存
    model = model_class.from_pretrained('./directory/to/save/')  # 重载
    tokenizer.save_pretrained('./directory/to/save/')  # 保存
    tokenizer = BertTokenizer.from_pretrained('./directory/to/save/')  # 重载
```

如何用12行代码训练TensorFlow 2.0模型,然后加载在PyTorch快速检验/测试。

```python
import tensorflow as tf
import tensorflow_datasets
from transformers import *

# 从预训练模型/词汇表中加载数据集、分词器、模型
tokenizer = BertTokenizer.from_pretrained('bert-base-cased')
model = TFBertForSequenceClassification.from_pretrained('bert-base-cased')
data = tensorflow_datasets.load('glue/mrpc')

# 准备数据集作为tf.data.Dataset的实例
train_dataset = glue_convert_examples_to_features(data['train'], tokenizer, max_length=128, task='mrpc')
valid_dataset = glue_convert_examples_to_features(data['validation'], tokenizer, max_length=128, task='mrpc')
train_dataset = train_dataset.shuffle(100).batch(32).repeat(2)
valid_dataset = valid_dataset.batch(64)

# 准备训练:编写tf.keras模型与优化，损失和学习率调度
optimizer = tf.keras.optimizers.Adam(learning_rate=3e-5, epsilon=1e-08, clipnorm=1.0)
loss = tf.keras.losses.SparseCategoricalCrossentropy(from_logits=True)
metric = tf.keras.metrics.SparseCategoricalAccuracy('accuracy')
model.compile(optimizer=optimizer, loss=loss, metrics=[metric])

# 用tf.keras.Model.fit进行测试和评估
history = model.fit(train_dataset, epochs=2, steps_per_epoch=115,
                    validation_data=valid_dataset, validation_steps=7)

# 在PyTorch中加载TensorFlow模型进行检查
model.save_pretrained('./save/')
pytorch_model = BertForSequenceClassification.from_pretrained('./save/', from_tf=True)

#让我们看看我们的模型是否学会了这个任务
sentence_0 = "This research was consistent with his findings."
sentence_1 = "His findings were compatible with this research."
sentence_2 = "His findings were not compatible with this research."
inputs_1 = tokenizer.encode_plus(sentence_0, sentence_1, add_special_tokens=True, return_tensors='pt')
inputs_2 = tokenizer.encode_plus(sentence_0, sentence_2, add_special_tokens=True, return_tensors='pt')

pred_1 = pytorch_model(inputs_1['input_ids'], token_type_ids=inputs_1['token_type_ids'])[0].argmax().item()
pred_2 = pytorch_model(inputs_2['input_ids'], token_type_ids=inputs_2['token_type_ids'])[0].argmax().item()

print("sentence_1 is", "a paraphrase" if pred_1 else "not a paraphrase", "of sentence_0")
print("sentence_2 is", "a paraphrase" if pred_2 else "not a paraphrase", "of sentence_0")
```

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

以上预训练模型以TensorFlow版本的权重为准。中国大陆境内建议使用讯飞云下载点，境外用户建议使用谷歌下载点，base模型文件大小约**400M**。


[pytorch中文语言模型bert预训练代码](https://zhuanlan.zhihu.com/p/161301389)

对于PyTorch版本，使用的是由`Huggingface`出品的[PyTorch-Transformers 1.0](https://github.com/huggingface/pytorch-transformers)提供的转换脚本。如果使用的是其他版本，请自行进行权重转换。

huggingface项目中语言模型预训练用**mask方式**如下。仍是按照`15%`的数据随机mask然后预测自身。如果要做一些高级操作比如whole word masking或者实体预测，可以自行修改transformers.DataCollatorForLanguageModeling。[代码](https://github.com/zhusleep/pytorch_chinese_lm_pretrain)

```python
def mask_tokens(self, inputs: torch.Tensor) -> Tuple[torch.Tensor, torch.Tensor]:
        """
        Prepare masked tokens inputs/labels for masked language modeling: 80% MASK, 10% random, 10% original.
        """
        if self.tokenizer.mask_token is None:
            raise ValueError(
                "This tokenizer does not have a mask token which is necessary for masked language modeling. Remove the --mlm flag if you want to use this tokenizer."
            )

        labels = inputs.clone()
        # We sample a few tokens in each sequence for masked-LM training (with probability args.mlm_probability defaults to 0.15 in Bert/RoBERTa)
        probability_matrix = torch.full(labels.shape, self.mlm_probability)
        special_tokens_mask = [
            self.tokenizer.get_special_tokens_mask(val, already_has_special_tokens=True) for val in labels.tolist()
        ]
        probability_matrix.masked_fill_(torch.tensor(special_tokens_mask, dtype=torch.bool), value=0.0)
        if self.tokenizer._pad_token is not None:
            padding_mask = labels.eq(self.tokenizer.pad_token_id)
            probability_matrix.masked_fill_(padding_mask, value=0.0)
        masked_indices = torch.bernoulli(probability_matrix).bool()
        labels[~masked_indices] = -100  # We only compute loss on masked tokens

        # 80% of the time, we replace masked input tokens with tokenizer.mask_token ([MASK])
        indices_replaced = torch.bernoulli(torch.full(labels.shape, 0.8)).bool() & masked_indices
        inputs[indices_replaced] = self.tokenizer.convert_tokens_to_ids(self.tokenizer.mask_token)

        # 10% of the time, we replace masked input tokens with random word
        indices_random = torch.bernoulli(torch.full(labels.shape, 0.5)).bool() & masked_indices & ~indices_replaced
        random_words = torch.randint(len(self.tokenizer), labels.shape, dtype=torch.long)
        inputs[indices_random] = random_words[indices_random]

        # The rest of the time (10% of the time) we keep the masked input tokens unchanged
        return inputs, labels
```

三个常见的中文bert语言模型：<font color='blue'>ERNIE ＞ roberta-wwm-ext ＞ bert-base-chinese </font>
- [bert-base-chinese](https://huggingface.co/bert-base-chinese)：最常见的中文bert语言模型，Google基于中文维基百科相关语料进行预训练。把它作为**baseline**，在领域内无监督数据进行语言模型预训练很简单。
- [roberta-wwm-ext](https://github.com/ymcui/Chinese-BERT-wwm)：**哈工大**讯飞联合实验室发布的预训练语言模型。预训练的方式是采用roberta类似的方法，比如动态mask，更多的训练数据等等。在很多任务中，该模型效果要优于bert-base-chinese。
- [ernie](https://github.com/nghuyong/ERNIE-Pytorch%25EF%25BC%2589)

### bert-base-chinese

预训练代码：

```shell
python run_language_modeling.py \
    --output_dir=output \
    --model_type=bert \
    --model_name_or_path=bert-base-chinese \
    --do_train \
    --train_data_file=$TRAIN_FILE \
    --do_eval \
    --eval_data_file=$TEST_FILE \
    --mlm
```
其中$TRAIN_FILE 代表领域相关中文语料地址。

- 【2021-8-26】中文模型：bert-base-chinese，跑不通！

### roberta-wwm-ext

代码：

```python
import torch
from transformers import BertTokenizer, BertModel

tokenizer = BertTokenizer.from_pretrained("hfl/chinese-roberta-wwm-ext")
roberta = BertModel.from_pretrained("hfl/chinese-roberta-wwm-ext")

# 切记不可使用官方推荐的以下语句!
tokenizer = AutoTokenizer.from_pretrained("hfl/chinese-roberta-wwm-ext")
model = AutoModel.from_pretrained("hfl/chinese-roberta-wwm-ext")
```

注意：<font color='red'>切记不可使用官方推荐的Auto语句!</font>
- 中文roberta类的配置文件比如vocab.txt，都是采用bert的方法设计的。英文roberta模型读取配置文件的格式默认是vocab.json。对于一些英文roberta模型，倒是可以通过AutoModel自动读取。这就解释了huggingface的模型库的**中文roberta示例代码为什么跑不通**。

如果要基于上面的代码run_language_modeling.py继续预训练roberta。还需要做两个改动。
- 下载roberta-wwm-ext到本地目录hflroberta，在config.json中修改“model_type”:"roberta"为"model_type":"bert"。
- 对上面的run_language_modeling.py中的AutoModel和AutoTokenizer都进行替换为BertModel和BertTokenizer。

```shell
python run_language_modeling_roberta.py \
    --output_dir=output \
    --model_type=bert \
    --model_name_or_path=hflroberta \
    --do_train \
    --train_data_file=$TRAIN_FILE \
    --do_eval \
    --eval_data_file=$TEST_FILE \
    --mlm
```

### ernie

ernie是百度发布的基于百度知道贴吧等中文语料结合实体预测等任务生成的预训练模型。这个模型的准确率在某些任务上要优于bert-base-chinese和roberta。如果基于ernie1.0模型做领域数据预训练的话只需要一步修改。
- 下载ernie1.0到本地目录ernie，在config.json中增加字段"model_type":"bert"。

```shell
python run_language_modeling.py \
    --output_dir=output \
    --model_type=bert \
    --model_name_or_path=ernie \
    --do_train \
    --train_data_file=$TRAIN_FILE \
    --do_eval \
    --eval_data_file=$TEST_FILE \
    --mlm
```


# BERT

- 2018年11月底，谷歌发布了基于双向 `Transformer` 的大规模预训练语言模型 `BERT`，该预训练模型能高效抽取文本信息并应用于各种 NLP 任务，该研究凭借预训练模型刷新了 11 项 NLP 任务的当前最优性能记录。
- 技术博主 Jay Alammar 近日发文[illustrated-bert](https://jalammar.github.io/illustrated-bert/)，通过图解方式生动地讲解了 BERT 的架构和方法基础。
- 2018 年是机器学习模型处理文本（更准确地说是自然语言处理，简称 NLP）的一个转折点。

![](https://image.jiqizhixin.com/uploads/editor/5442b9f1-17ca-49b3-a259-e5fb52107534/1544732034404.png)

![](https://image.jiqizhixin.com/uploads/editor/87b820e3-dc5c-4f9f-97f6-6a01360156b7/1544732034725.png)


- 下游任务

![](https://image.jiqizhixin.com/uploads/editor/41afd366-28b8-4aa1-8464-5f10d253cb48/1544732037865.png)

## 思考

### BERT学到了什么

ACL 2019最新收录的论文：[What does BERT learn about the structure of language?](https://hal.inria.fr/hal-02131630/document) [理解BERT每一层都学到了什么](https://zhuanlan.zhihu.com/p/74515580)， [代码](https://github.com/ganeshjawahar/interpret_bert)
- Frege早在1965年的组合原则里谈到，复杂表达式的意义由其子表达式的意义以及意义如何组合的规则共同决定。
- 本文思路与分析卷积神经网络每层学习到的表征类似，主要是探索了BERT的每一层到底捕捉到了什么样的信息表征。作者通过一系列的实验证明BERT学习到了一些**结构化**的语言信息，比如
  - BERT的**低层**网络就学习到了**短语**级别的**信息表征**
  - BERT的**中层**网络就学习到了丰富的**语言学**特征
  - BERT的**高层**网络则学习到了丰富的**语义**信息特征。
- [图示](https://pic2.zhimg.com/80/v2-602f7d353a057e56327a631e396934b1_720w.jpg)
  - ![](https://pic2.zhimg.com/80/v2-602f7d353a057e56327a631e396934b1_720w.jpg)

### BERT可视化

- [Visualizing BERT](https://home.ttic.edu/~kgimpel/viz-bert/viz-bert.html)
- kaggle上外国人分享的[Visualizing BERT embeddings with t-SNE](https://www.kaggle.com/wqw547243068/visualizing-bert-embeddings-with-t-sne/edit)


[BertViz](https://github1s.com/jessevig/bertviz)是BERT可视化工具包，支持[transformers](https://github.com/huggingface/transformers) 库的大部分模型 (BERT, GPT-2, XLNet, RoBERTa, XLM, CTRL, BART, etc.)，继承于[Tensor2Tensor visualization tool](https://github.com/tensorflow/tensor2tensor/tree/master/tensor2tensor/visualization)

```shell
# pip安装
pip install bertviz
# 源码安装
git clone https://github.com/jessevig/bertviz.git
cd bertviz
python setup.py develop
```

功能：
- headview：指定层的注意力层可视化
  - [interactive Colab Notebook](https://colab.research.google.com/drive/1PEHWRHrvxQvYr9NFRC-E_fr3xDq1htCj)
  - ![](https://upload-images.jianshu.io/upload_images/22279029-4a9d09dd11e565a3.png)
- modelview：整个模型的注意力可视化
  - [interactive Colab Notebook](https://colab.research.google.com/drive/1c73DtKNdl66B0_HF7QXuPenraDp0jHRS)
  - ![](https://upload-images.jianshu.io/upload_images/22279029-59e2434e45d87166.png)
- neuralview：QKV神经元可视化, 及如何计算注意力
  - [interactive Colab Notebook](https://colab.research.google.com/drive/1m37iotFeubMrp9qIf9yscXEL1zhxTN2b)
  - ![](https://upload-images.jianshu.io/upload_images/22279029-7088fd1e5fef41e5.png)


```python
from transformers import AutoTokenizer, AutoModel
from bertviz import model_view

model_version = "distilbert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_version)
model = AutoModel.from_pretrained(model_version, output_attentions=True)

inputs = tokenizer.encode("The cat sat on the mat", return_tensors='pt')
outputs = model(inputs)
attention = outputs[-1]  # Output includes attention weights when output_attentions=True
tokens = tokenizer.convert_ids_to_tokens(inputs[0]) 

# head可视化
from bertviz import head_view
head_view(attention, tokens)
head_view(attention, tokens, layer=2, heads=[3,5])

# model可视化
model_view(attention, tokens)
model_view(attention, tokens, display_mode="light") # 背景设置
model_view(attention, tokens, include_layers=[5, 6]) # 只显示5-6层

# neural可视化
# Import specialized versions of models (that return query/key vectors)
from bertviz.transformers_neuron_view import BertModel, BertTokenizer

from bertviz.neuron_view import show

model = BertModel.from_pretrained(model_version, output_attentions=True)
tokenizer = BertTokenizer.from_pretrained(model_version, do_lower_case=do_lower_case)
model_type = 'bert'
show(model, model_type, tokenizer, sentence_a, sentence_b, layer=2, head=0)

```

jupyter notebook版本：

```python
# bert可视化  pip install bertviz
from transformers import BertTokenizer, BertModel
#from bertv_master.bertviz import head_view
from bertviz import head_view


# 在 jupyter notebook 显示visualzation 
def call_html():
  import IPython
  display(IPython.core.display.HTML('''<script src="/static/components/requirejs/require.js"></script><script>// <![CDATA[
requirejs.config({ paths: { base: '/static/base', "d3": "https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.8/d3.min", jquery: '//ajax.googleapis.com/ajax/libs/jquery/2.0.0/jquery.min', }, });
// ]]></script>'''))

# 記得我们是使用中文 BERT
model_version = 'bert-base-chinese'
model = BertModel.from_pretrained(model_version, cache_dir="./transformers/", output_attentions=True)
tokenizer = BertTokenizer.from_pretrained(model_version)
 
# 情境 1 的句子
sentence_a = "老爸叫小宏去买酱油，"
sentence_b = "回来慢了就骂他。"
 
# 得到tokens后输入BERT模型获取注意力权重(attention)
inputs = tokenizer.encode_plus(sentence_a,sentence_b,return_tensors='pt', add_special_tokens=True)
token_type_ids = inputs['token_type_ids']
input_ids = inputs['input_ids']
attention = model(input_ids, token_type_ids=token_type_ids)[-1]
input_id_list = input_ids[0].tolist() # Batch index 0
tokens = tokenizer.convert_ids_to_tokens(input_id_list)
call_html()

# 用BertViz可视化
head_view(attention, tokens)
```



### BERT降维


#### BERT-flow

BERT-flow来自论文《[On the Sentence Embeddings from Pre-trained Language Models](https://arxiv.org/abs/2011.05864)》，EMNLP 2020，主要是用flow模型校正了BERT出来的句向量的分布，从而使得计算出来的cos相似度更为合理一些。

用句向量做相似度计算、索引时，常常用到余弦相似度，根据数值排序，然而，不是所有向量都适合用余弦相似度。
- 余弦相似度：两个向量x,y的内积的几何意义就是“各自的模长乘以它们的夹角余弦”，即两个向量的内积并除以各自的模长
- 假设：向量的“夹角余弦”本身是具有鲜明的几何意义的，但上式右端只是坐标的运算，坐标依赖于所选取的坐标基，基底不同，内积对应的坐标公式就不一样，从而余弦值的坐标公式也不一样。即余弦公式只在“**标准正交基**”下成立，如果这组基是标准正交基，每个分量都是独立的、均匀的，基向量集表现出“**各项同性**”。

BERT向量用余弦值来比较相似度，表现不好，原因可能就是句向量所属的坐标系并非**标准正交基**。不满足各项同性时，需要通过一些方法转换，比如：BERT-flow用了flow模型。

flow模型是一个向量变换模型，它可以将输入数据的分布转化为**标准正态分布**，而显然标准正态分布是各向同性的

flow模型本身很弱，BERT-flow里边使用的flow模型更弱，所以flow模型不大可能在BERT-flow中发挥至关重要的作用。反过来想，那就是也许我们可以找到更简单直接的方法达到BERT-flow的效果。


#### BERT-whitening

[你可能不需要BERT-flow：一个线性变换媲美BERT-flow](https://kexue.fm/archives/8069)
- [BERT-whitening](https://github.com/bojone/BERT-whitening)：通过简单的向量**白化**来改善句向量质量，可以媲美甚至超过BERT-flow的效果, 一个线性变换，可以轻松套到任意的句向量模型中
  - 《[Whitening Sentence Representations for Better Semantics and Faster Retrieval](https://arxiv.org/abs/2103.15316)》
将句向量的**均值**变换为0、**协方差矩阵**变换为单位阵, 相当于传统数据挖掘中的**白化**操作（Whitening），所以该方法笔者称之为**BERT-whitening**

协方差矩阵Σ是一个半正定对称矩阵，半正定对称矩阵都具有如下形式的SVD分解Σ=UΛU⊤，其中U是一个正交矩阵，而Λ是一个对角阵，并且对角线元素都是正的，因此直接让$\boldsymbol{W}^{-1}=\sqrt{\boldsymbol{\Lambda}} \boldsymbol{U}^{\top}$就可以完成求解：$\boldsymbol{W}=\boldsymbol{U} \sqrt{\mathbf{\Lambda}^{-1}}$

```python
def compute_kernel_bias(vecs):
    """计算kernel和bias
    vecs.shape = [num_samples, embedding_size]，
    最后的变换：y = (x + bias).dot(kernel)
    """
    mu = vecs.mean(axis=0, keepdims=True)
    cov = np.cov(vecs.T)
    u, s, vh = np.linalg.svd(cov)
    W = np.dot(u, np.diag(1 / np.sqrt(s)))
    return W, -mu
```

[Github链接](https://github.com/bojone/BERT-whitening)

使用一个简单线性变换的BERT-whitening取得了跟BERT-flow媲美的结果。除了STS-B之外，笔者的同事在中文业务数据内做了类似的比较，结果都表明BERT-flow带来的提升跟BERT-whitening是相近的,

仿照PCA降维，效果更好

```python
def compute_kernel_bias(vecs, n_components=256):
    """计算kernel和bias
    vecs.shape = [num_samples, embedding_size]，
    最后的变换：y = (x + bias).dot(kernel)
    """
    mu = vecs.mean(axis=0, keepdims=True)
    cov = np.cov(vecs.T)
    u, s, vh = np.linalg.svd(cov)
    W = np.dot(u, np.diag(1 / np.sqrt(s)))
    return W[:, :n_components], -mu
```

将base版本的768维只保留前256维，效果有所提升，并且由于降维，向量检索速度肯定也能大大加快；类似地，将large版的1024维只保留前384维，那么降维的同时也提升了效果。

这个结果表明：无监督训练出来的句向量其实是“**通用型**”的，对于特定领域内的应用，里边有很多特征是冗余的，剔除这些冗余特征，往往能达到提速又提效的效果。

而flow模型是可逆的、不降维的，这在某些场景下是好处，但在不少场景下也是缺点，因为它无法剔除冗余维度，限制了性能，比如GAN的研究表明，通过一个256维的高斯向量就可以随机生成1024×1024的人脸图，这表明这些人脸图其实只是构成了一个相当低维的流形，但是如果用flow模型来做，因为要保证可逆性，就得强行用1024×1024×3那么多维的高斯向量来随机生成，计算成本大大增加，而且效果还上不去。


#### SimBERT

[鱼与熊掌兼得：融合检索和生成的SimBERT模型](https://kexue.fm/archives/7427)

追一科技开放了一个名为[SimBERT](https://github.com/ZhuiyiTechnology/pretrained-models#simbert-base)的模型权重，它是以Google开源的BERT模型为基础，基于微软的[UniLM](https://arxiv.org/abs/1905.03197)思想设计了融检索与生成于一体的任务，来进一步微调后得到的模型，所以它同时具备相似问**生成**和相似句**检索**能力。不过当时除了放出一个权重文件和示例脚本之外，未对模型原理和训练过程做进一步说明

`UniLM`是一个融合NLU和NLG能力的Transformer模型，由微软在去年5月份提出来的，今年2月份则升级到了v2版本。我们之前的文章《从语言模型到Seq2Seq：Transformer如戏，全靠Mask》就简单介绍过UniLM，并且已经集成到了bert4keras中。

UniLM的核心是通过特殊的Attention Mask来赋予模型具有Seq2Seq的能力。假如输入是“你想吃啥”，目标句子是“白切鸡”，那UNILM将这两个句子拼成一个：[ CLS] 你 想 吃 啥 [ SEP] 白 切 鸡 [ SEP]，然后接如图的Attention Mask
- ![](https://kexue.fm/usr/uploads/2019/09/1625339461.png)
- [ CLS] 你 想 吃 啥 [ SEP]这几个token之间是双向的Attention，而白 切 鸡 [ SEP]这几个token则是单向Attention，从而允许递归地预测白 切 鸡 [ SEP]这几个token，所以它具备文本生成能力。
- ![](https://kexue.fm/usr/uploads/2019/09/1879768703.png)


[SimBERT](https://github.com/ZhuiyiTechnology/simbert)属于有监督训练，训练语料是自行收集到的相似句对，通过一句来预测另一句的相似句生成任务来构建Seq2Seq部分，然后前面也提到过[ CLS]的向量事实上就代表着输入的句向量，所以可以同时用它来训练一个检索任务
- ![](https://kexue.fm/usr/uploads/2020/05/2840550561.png)
- 假设SENT_a和SENT_b是一组相似句，那么在同一个batch中，把[ CLS] SENT_a [ SEP] SENT_b [ SEP] 和 [ CLS] SENT_b [ SEP] SENT_a [ SEP]都加入训练，做一个相似句的生成任务，这是Seq2Seq部分。
关键就是“[ CLS]的向量事实上就代表着输入的句向量”，所以可以用它来做一些NLU相关的事情。最后的loss是Seq2Seq和相似句分类两部分loss之和。

实施：
- 数据来源是爬取百度知道推荐的相似问，然后经过简单算法过滤。如果本身有很多问句，也可以通过常见的检索算法检索出一些相似句，作为训练数据用。总而言之，训练数据没有特别严格要求，理论上有一定的相似性都可以。
- 至于训练硬件，开源的模型是在一张TITAN RTX（22G显存，batch_size=128）上训练了4天左右，显存和时间其实也没有硬性要求，视实际情况而定，如果显存没那么大，那么适当降低batch_size即可，如果语料本身不是很多，那么训练时间也不用那么长（大概是能完整遍历几遍数据集即可）。

#### SimCSE对比学习

中文任务还是SOTA吗？我们给SimCSE补充了一些实验

苏剑林构思的“BERT-whitening”的方法一度成为了语义相似度的新SOTA，然而不久之后，Arxiv上出现了至少有两篇结果明显优于BERT-whitening的新论文。
- 第一篇是《[Generating Datasets with Pretrained Language Models](https://arxiv.org/pdf/2104.07540.pdf)》，这篇借助模板从GPT2_XL中无监督地构造了数据对来训练**相似度**模型，虽然有一定启发而且效果还可以，但是复现的成本和变数都太大。
- 另一篇则是《[SimCSE: Simple Contrastive Learning of Sentence Embeddings](https://arxiv.org/abs/2104.08821)》，它提出的`SimCSE`在英文数据上显著超过了BERT-flow和BERT-whitening，并且方法特别简单～

https://github.com/bojone/SimCSE

`SimCSE`可以看成是`SimBERT`的**简化版**：
- 1、SimCSE去掉了SimBERT的生成部分，仅保留检索模型；
- 2、由于SimCSE没有标签数据，所以把每个句子自身视为相似句传入。
即：(自己,自己) 作为**正例**、(自己,别人) 作为**负例**来训练对比学习模型，这里的“自己”并非完全一样，而是采用一些数据扩增手段，让正例的两个样本有所差异，但是在NLP中如何做数据扩增本身又是一个难搞的问题，SimCSE则提出了一个极为简单的方案：**直接把Dropout当作数据扩增**！

实验结果
- 英文语料：SimCSE**明显优于**BERT-flow和BERT-whitening
- 中文语料：除了PAWSX这个“异类”外，SimCSE相比BERT-whitening确实有压倒性优势，有些任务还能好10个点以上，在BQ上SimCSE还比有监督训练过的SimBERT要好，而且像SimBERT这种已经经过监督训练的模型还能获得进一步的提升，这些都说明确实强大



## BERT应用

- ![](https://pic3.zhimg.com/80/v2-09c5df603126e72b4ba2b0a9a45ee1b6_720w.jpg)


## BERT服务

### ES里的BERT索引

- 【2020-7-11】ES开始支持embedding的BERT索引，[Elasticsearch遇上BERT：使用Elasticsearch和BERT构建搜索引擎](https://mp.weixin.qq.com/s/PzhdvwsR3ru2u_oVqSxxPQ)
- 【2019-7-5】[BERT和TensorFlow构建搜索引擎](https://cloud.tencent.com/developer/article/1458233)
  - ![](https://ask.qcloudimg.com/http-save/yehe-5669851/5xixkmgeim.jpeg?imageView2/2/w/1620)

### BERT结合Faiss的语义表示

【2021-5-31】语义匹配搜索项目使用的 Faiss和BERT的整体架构 [image](https://img-blog.csdnimg.cn/img_convert/a6df8af67afe4b2b7ebebd3d3531d380.png), 参考：[基于文本语义的智能问答系统](https://blog.csdn.net/shenfuli/article/details/107823959)
- 注：深蓝色线为数据导入过程，橘黄色线为用户查询过程。）
- 首先，本文项目使用开源的 bert-serving ， BERT做句子编码器，标题数据转化为固定长度为 768 维的特征向量，并导入 Milvus 或者Faiss库。
- 然后，对存入 Milvus/Faiss 库中的特征向量进行存储并建立索引，同时原始数据提供唯一ID编码，将 ID 和对应内容存储在 PostgreSQL 中。
- 最后，用户输入一个标题，BERT 将其转成特征向量。Milvus/Faiss 对特征向量进行相似度检索，得到相似的标题的 ID ，在 知识库（PostgreSQL/MySQL/SQLite。。。） 中找出 ID 对应的详细信息返回

![](https://img-blog.csdnimg.cn/img_convert/a6df8af67afe4b2b7ebebd3d3531d380.png)

【2021-10-28】[FAISS + SBERT实现的十亿级语义相似性搜索](https://www.yanxishe.com/TextTranslation/2987?from=wcm)，[Billion-scale semantic similarity search with FAISS+SBERT](https://towardsdatascience.com/billion-scale-semantic-similarity-search-with-faiss-sbert-c845614962e2)


### BERT-as-service

- Google 已经公开了 TensorFlow 版本 [BERT](https://github.com/google-research/bert) 的预训练模型和代码，可以用于生成词向量，但是还有更简单的方法：直接调用封装好的库 [bert-as-service](https://github.com/hanxiao/bert-as-service) 。
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
  - 其中，-model_dir 是预训练模型的路径，-num_worker 是线程数，表示同时可以处理多少个并发请求

> bert-serving-start -model_dir /tmp/english_L-12_H-768_A-12/ -num_worker=2

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
- BERT 的另一个特性是可以获取一对句子的向量，句子之间使用 \|\|\| 作为分隔，例如：

```python
bc.encode(['First do it ||| then do it right'])
```

#### 获取词向量

- 启动服务时将参数 pooling_strategy 设置为 None ：

```shell
# bert服务端
bert-serving-start -pooling_strategy NONE -model_dir /tmp/english_L-12_H-768_A-12/
```
- 这时的返回是语料中每个 token 对应 embedding 的矩阵

```python
# 客户端
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
# 一次多输入几个，不要for循环一个个获取！
bc.encode(['First do it', 'then do it right', 'then do it better'])
```
- 这个例子中，只需要在客户端 pip install -U bert-serving-client

```python
from bert_serving.client import BertClient
import numpy as np

class SimilarModel:
    def __init__(self):
        # ip默认为本地模式，如果bert服务部署在其他服务器上，修改为对应ip
        self.bert_client = BertClient(ip='192.168.x.x')

    def close_bert(self):
        self.bert_client.close()

    def get_sentence_vec(self,sentence):
        '''
        根据bert获取句子向量
        :param sentence:
        :return:
        '''
        return self.bert_client .encode([sentence])[0]

    def cos_similar(self,sen_a_vec, sen_b_vec):
        '''
        计算两个句子的余弦相似度
        :param sen_a_vec:
        :param sen_b_vec:
        :return:
        '''
        vector_a = np.mat(sen_a_vec)
        vector_b = np.mat(sen_b_vec)
        num = float(vector_a * vector_b.T)
        denom = np.linalg.norm(vector_a) * np.linalg.norm(vector_b)
        cos = num / denom
        return cos

if __name__=='__main__':
    # 从候选集condinates 中选出与sentence_a 最相近的句子
    condinates = ['为什么天空是蔚蓝色的','太空为什么是黑的？','天空怎么是蓝色的','明天去爬山如何']
    sentence_a = '天空为什么是蓝色的'
    bert_client = SimilarModel()
    max_cos_similar = 0
    most_similar_sentence = ''
    for sentence_b in condinates:
        sentence_a_vec = bert_client.get_sentence_vec(sentence_a)
        sentence_b_vec = bert_client.get_sentence_vec(sentence_b)
        cos_similar = bert_client.cos_similar(sentence_a_vec,sentence_b_vec)
        if cos_similar > max_cos_similar:
            max_cos_similar = cos_similar
            most_similar_sentence = sentence_b

    print('最相似的句子：',most_similar_sentence)
    bert_client .close_bert()
    # 为什么天空是蔚蓝色的
```

或者HTTP调用：
```shell
curl -X POST http://xx.xx.xx.xx:8125/encode \
  -H 'content-type: application/json' \
  -d '{"id": 123,"texts": ["hello world"], "is_tokenized": false}'
```

Bert的输出最终有两个结果可用
- sequence_output：维度【batch_size, seq_length, hidden_size】，这是训练后每个token的词向量。
- pooled_output：维度是【batch_size, hidden_size】，每个sequence第一个位置CLS的向量输出，用于分类任务。

```shell
{
    "id": 123,
    "results": [[768 float-list], [768 float-list]],
    "status": 200
}
```

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


# BERT变种

- 一系列变种模型

## BERT fine-tune

- 【2021-8-25】[中文语料的 Bert 微调 Bert Chinese Finetune](https://kuhungio.me/2019/bert-chinese-finetune/)

[Bert](https://github.com/google-research/bert) 的文档本身对 finetune 进行了较为详细的描述，但对于不熟悉官方标准数据集的工程师来说，有一定的上手难度。随着 [Bert as service](https://github.com/hanxiao/bert-as-service) 代码的开源，使用 Bert 分类或阅读理解的副产物–词空间，成为一个更具实用价值的方向。

### 预训练模型

- 下载 [BERT-Base, Chinese](https://storage.googleapis.com/bert_models/2018_11_03/chinese_L-12_H-768_A-12.zip): Chinese Simplified and Traditional, 12-layer, 768-hidden, 12-heads, 110M parameters

### 数据准备
- train.tsv 训练集
- dev.tsv 验证集

数据格式
- 第一列为 label，第二列为具体内容，tab 分隔。因模型本身在字符级别做处理，因而无需分词。

```
fashion	衬衫和它一起穿,让你减龄十岁!越活越年轻!太美了!...
houseliving	95㎡简约美式小三居,过精美别致、悠然自得的小日子! 屋主的客...
game	赛季末用他们两天上一段，7.20最强LOL上分英雄推荐！ 各位小伙...
```

bert 的 finetune 主要存在两类应用场景：分类和阅读理解。

### 分类任务

因分类较为容易获得样本，以下以分类为例，做模型微调：

修改 run_classifier.py
- 集成抽象类DataProcessor，实现里面的几种方法：
  - get_train_examples：获取训练集数据
  - get_dev_examples：获取验证集数据
  - get_test_examples：获取测试集数据
  - get_labels：获取分类标签集合

BERT数据处理过程：<font color='blue'>原始文本 → 分词 → 加特殊标记 → 映射为id → 合并</font>
- 原始文本
- **分词**：中英文不同
  - 英文：词性/词干还原
  - 中文：分词，bert默认以单字切割
- 加**特殊标记**
  - 根据任务不同，加\[CLS],\[SEP],\[PAD]等
- **映射为id**
  - 将以上所有字符映射为id编号序列
  - 注意：encoder和decoder对应不同的字典
- 句子**向量化**
  - 根据语料长度，设置高于分词后最大长度的阈值max_len，作为句子长度维度

格式：
- (a) For sequence pairs: **句子对**
  - sentence: is this jackson ville ? || no it is not .
  - tokens:   \[CLS] is this jack ##son ##ville ? \[SEP] no it is not . \[SEP]
  - type_ids: 0     0  0    0    0   0  0 0     1  1  1  1   1 1
-  (b) For single sequences: **单句形式**
  - sentence: the dog is hairy .
  - tokens:   \[CLS] the dog is hairy . \[SEP]
  - type_ids:   0     0   0   0  0     0  0
- 输出格式：[guid, text_a, text_b, label]
  - 后两个字段可选
- 输入模型
  - input_ids：句子id向量，max_len维
  - input_mask：句子掩码模板，0，1标记，0表示空白填充
  - segment_ids：两个句子分隔位置
  - label_id：分类目标对应的id

```python
class DemoProcessor(DataProcessor):
    """任务相关的数据集，处理类"""
    def __init__(self):
        self.labels = set() # label集合
    
    def get_train_examples(self, data_dir):
        """读取训练集"""
        # _read_csv只是简单按照tab分隔成list
        # _create_examples将以上list转成标准样本格式
        return self._create_examples(
            self._read_tsv(os.path.join(data_dir, "train.tsv")), "train")
    def get_dev_examples(self, data_dir):
        """读取验证集"""
        return self._create_examples(
            self._read_tsv(os.path.join(data_dir, "dev.tsv")), "dev")
    def get_test_examples(self, data_dir):
        """读取测试集"""
        return self._create_examples(
          self._read_tsv(os.path.join(data_dir, "test.tsv")), "test")
    def get_labels(self):
        """获取目标值集合"""
        #return list(self.labels)
        return ["fashion", "houseliving","game"] # 根据 label 自定义
    
    def _create_examples(self, lines, set_type):
        """从训练集/验证集中读取样本"""
        examples = []
        for (i, line) in enumerate(lines):
            # 格式：[label text]
            # Only the test set has a header 测试集有header表头信息
            if set_type == "test" and i == 0:
                continue
            guid = "%s-%s" % (set_type, i) # 样本唯一id
            if set_type == "test":
                text_a = tokenization.convert_to_unicode(line[0])
                label = "0" # 测试集给默认label
            else: # 将所有字符转成unicode
                text_a = tokenization.convert_to_unicode(line[1])
                label = tokenization.convert_to_unicode(line[0])
                examples.append(
                  InputExample(guid=guid, text_a=text_a, text_b=None, label=label))
        # 输出格式：[guid, text_a, text_b, label]
        return examples
```

添加 DemoProcessor

```python
  processors = {
      "cola": ColaProcessor,
      "mnli": MnliProcessor,
      "mrpc": MrpcProcessor,
      "xnli": XnliProcessor,
      "demo": DemoProcessor,
  }
```

启动训练

```python
export BERT_Chinese_DIR=/path/to/bert/chinese_L-12_H-768_A-12
export Demo_DIR=/path/to/DemoDate
python run_classifier.py \
  --task_name=demo \
  --do_train=true \
  --do_eval=true \
  --data_dir=$Demo_DIR \
  --vocab_file=$BERT_Chinese_DIR/vocab.txt \
  --bert_config_file=$BERT_Chinese_DIR/bert_config.json \
  --init_checkpoint=$BERT_Chinese_DIR/bert_model.ckpt \
  --max_seq_length=128 \
  --train_batch_size=32 \
  --learning_rate=2e-5 \
  --num_train_epochs=3.0 \
  --output_dir=/tmp/Demo_output/
```

若一切顺利，将会有以下输出:

```shell
***** Eval results *****
  eval_accuracy = xx
  eval_loss = xx
  global_step = xx
  loss = xx
```

最终，微调后的模型保存在output_dir指向的文件夹中。

### 总结

Bert 预训练后的 finetune，是一种很高效的方式，节省时间，同时提高模型在垂直语料的表现。finetune 过程，实际上不难。较大的难点在于数据准备和 pipeline 的设计。从商业角度讲，应着重考虑 finetune 之后，模型有效性的证明，以及在业务场景中的应用。如果评估指标和业务场景都已缕清，那么不妨一试。

[Github 地址](https://github.com/kuhung/bert_finetune)

## MLM改进

- 基于MLM，做各种改进尝试

MLM，全称“Masked Language Model”，可以翻译为“掩码语言模型”，实际上就是一个完形填空任务，随机 Mask 掉文本中的某些字词，然后要模型去预测被 Mask 的字词。其中被 Mask 掉的部分，可以是直接随机选择的 Token，也可以是随机选择连续的能组成一整个词的 Token，后者称为 `WWM`（Whole Word Masking）。

论文 BERT has a Mouth, and It Must Speak: BERT as a Markov Random Field Language Model指出 MLM 可以作为一般的生成模型用，论文 Spelling Error Correction with Soft-Masked BERT 则将 MLM 用于文本纠错。

### 结合人工模板

GPT-3 的论文叫做 Language Models are Few-Shot Learners [1]，标题里边已经没有 G、P、T 几个单词了，只不过它跟开始的 GPT 是一脉相承的，因此还是以 GPT 称呼它。顾名思义，GPT-3 主打的是 **Few-Shot Learning**，也就是**小样本学习**。此外，GPT-3 的另一个特点就是大，最大的版本多达 1750 亿参数，是 BERT Base 的一千多倍。

正因如此，前些天 Arxiv 上的一篇论文 It's Not Just Size That Matters: Small Language Models Are Also Few-Shot Learners [2] 便引起了笔者的注意，意译过来就是“谁说一定要大的？小模型也可以做小样本学习”。

[必须要GPT-3吗？不，BERT的MLM模型也能小样本学习](https://mp.weixin.qq.com/s?__biz=MzIwMTc4ODE0Mw==&mid=2247512167&idx=1&sn=cc7695d92362e3b18a6e8969fb14dc27&chksm=96ea6fe7a19de6f1be86b965e268df1b9c6320810cf32b6d64ddd3d238bf9088be41fb36adfe#rd)中，我们介绍了一种名为**Pattern-Exploiting Training**（`PET`） 的方法，它通过人工构建的模版与BERT的MLM模型结合，能够起到非常好的零样本、小样本乃至半监督学习效果，而且该思路比较优雅漂亮，因为它将预训练任务和下游任务统一起来了。

将任务转成完形填空
- MLM 的一个精彩应用：用于小样本学习或半监督学习，某些场景下甚至能做到零样本学习。

![](https://pic1.zhimg.com/80/v2-886f03f3e90c8e65f98329f4375b1408_720w.jpg)

一些简单的推理任务也可以做这样的转换，常见的是给定两个句子，判断这两个句子是否相容，比如“我去了北京”跟“我去了上海”就是矛盾的，“我去了北京”跟“我在天安门广场”是相容的，常见的做法就是将两个句子拼接起来输入到模型做，作为一个二分类任务。如果要转换为完形填空，那该怎么构造呢？一种比较自然的构建方式是：

>- 我去了北京？______，我去了上海。
>- 我去了北京？______，我在天安门广场。

其中空位之处的候选词为 { 是的，不是 }

给输入的文本增加一个前缀或者后缀描述，并且 Mask 掉某些 Token，转换为完形填空问题，这样的转换在原论文中称为 Pattern，这个转换要尽可能与原来的句子组成一句自然的话，不能过于生硬，因为预训练的 MLM 模型就是在自然语言上进行的。


### 模板自动生成（PET）

【2021-6-17】[P-tuning：自动构建模版，释放语言模型潜能](https://zhuanlan.zhihu.com/p/364141928)

然而，人工构建这样的模版有时候也是比较困难的，而且不同的模版效果差别也很大，如果能够通过少量样本来自动构建模版，也是非常有价值的。

最近Arxiv上的论文《[GPT Understands, Too](https://arxiv.org/abs/2103.10385)》提出了名为**P-tuning**的方法，成功地实现了模版的**自动构建**。不仅如此，借助P-tuning，GPT在SuperGLUE上的成绩首次超过了同等级别的BERT模型，这颠覆了一直以来“GPT不擅长NLU”的结论，也是该论文命名的缘由。


P-tuning重新审视了关于模版的定义，放弃了“模版由自然语言构成”这一常规要求，从而将模版的构建转化为连续参数优化问题，虽然简单，但却有效

模版的反思
- 首先，我们来想一下“什么是模版”。直观来看，模版就是由自然语言构成的前缀/后缀，通过这些模版我们使得下游任务跟预训练任务一致，这样才能更加充分地利用原始预训练模型，起到更好的零样本、小样本学习效果。
- 等等，我们真的在乎模版是不是“自然语言”构成的吗？
- 并不是。本质上来说，我们并不关心模版长什么样，我们只需要知道模版由哪些token组成，该插入到哪里，插入后能不能完成我们的下游任务，输出的候选空间是什么。模版是不是自然语言组成的，对我们根本没影响，“自然语言”的要求，只是为了更好地实现“一致性”，但不是必须的。于是，P-tuning考虑了如下形式的模版：

![](https://pic1.zhimg.com/80/v2-a8313077087b511186ccb280a2e08a20_720w.jpg)

▲ P-tuning直接使用[unused*]的token来构建模版，不关心模版的自然语言性

这里的[u1]～[u6]，代表BERT词表里边的 [unused1]～[unused6]，也就是用几个从未见过的token来构成模板，这里的token数目是一个超参数，放在前面还是后面也可以调整。接着，为了让“模版”发挥作用，我们用标注数据来求出这个模板。

根据标注数据量的多少，优化思路又分两种情况讨论。
- 第一种，标注数据**比较少**。这种情况下，我们固定整个模型的权重，只优化[unused1]～[unused6]这几个token的Embedding，换句话说，其实我们就是要学6个新的Embedding，使得它起到了模版的作用。这样一来，因为模型权重几乎都被固定住了，训练起来很快，而且因为要学习的参数很少，因此哪怕标注样本很少，也能把模版学出来，不容易过拟合。
- 第二种，标注数据**很充足**。这时候如果还按照第一种的方案来，就会出现欠拟合的情况，因为只有6个token的可优化参数实在是太少了。因此，我们可以放开所有权重微调，原论文在SuperGLUE上的实验就是这样做的。读者可能会想：这样跟直接加个全连接微调有什么区别？原论文的结果是这样做效果更好，可能还是因为跟预训练任务更一致了吧。

原作者在SuperGLUE上的实验结果，显示出如果配合P-tuning，那么：
- 1）GPT、BERT的效果相比直接finetune都有所提升；
- 2）GPT的效果还能超过了BERT。

![](https://www.zhihu.com/equation?tex=%5Cbegin%7Barray%7D%7Bc%7Ccc%7D++%5Chline++%26+%5Ctext%7B%E9%AA%8C%E8%AF%81%E9%9B%86%7D+%26+%5Ctext%7B%E6%B5%8B%E8%AF%95%E9%9B%86%7D+%5C%5C++%5Chline++%5Ctext%7B%E5%B0%8F%E6%A0%B7%E6%9C%AC%E7%9B%B4%E6%8E%A5%E5%BE%AE%E8%B0%83%7D+%26+88.93%5C%25+%26+89.34%5C%25+%5C%5C++%5Ctext%7BVAT%E5%8D%8A%E7%9B%91%E7%9D%A3%E5%AD%A6%E4%B9%A0%7D+%26+89.83%5C%25+%26+90.37%5C%25+%5C%5C++%5Chline++%5Ctext%7BPET%E9%9B%B6%E6%A0%B7%E6%9C%AC%7D+%26+85.17%5C%25+%26+84.27%5C%25+%5C%5C++%5Ctext%7BPET%E6%97%A0%E7%9B%91%E7%9D%A3%7D+%26+88.05%5C%25+%26+87.53%5C%25+%5C%5C++%5Ctext%7BPET%E5%B0%8F%E6%A0%B7%E6%9C%AC%7D+%26+89.29%5C%25+%26+89.18%5C%25+%5C%5C++%5Ctext%7BPET%E5%8D%8A%E7%9B%91%E7%9D%A3%7D+%26+90.09%5C%25+%26+89.76%5C%25+%5C%5C++%5Chline++%5Ctext%7BBERT+%2B+P-tuning%7D+%26+89.81%5C%25+%26+89.75%5C%25+%5C%5C++%5Ctext%7BGPT+%2B+P-tuning%7D+%26+89.30%5C%25+%26+88.51%5C%25+%5C%5C++%5Chline++%5Cend%7Barray%7D%5C%5C)

其中“小样本”只用到了“少量标注样本”，“无监督”则用到了“大量无标注样本”，“半监督”则用到了“少量标注样本+大量无标注样本”，“P-tuning”都是小样本，PET的几个任务报告的是最优的人工模版的结果，其实还有更差的人工模版。从小样本角度来看，P-tuning确实取得了最优的小样本学习效果；从模版构建的角度来看，P-tuning确实也比人工构建的模版要好得多；从模型角度看，P-tuning确实可以将GPT的分类性能发挥到跟BERT相近，从而揭示了GPT也有很强的NLU能力的事实。

完整[代码](https://github.com/bojone/P-tuning), 原论文也开源了[代码](https://github.com/THUDM/P-tuning)

## ALBERT

【2019-9-28】谷歌Lab发布了一个新的预训练模型"ALBERT"全面在SQuAD 2.0、GLUE、RACE等任务上超越了BERT、XLNet、RoBERTa再次刷新了排行榜
- [ALBERT: A LITE BERT FOR SELF-SUPERVISED LEARNING OF LANGUAGE REPRESENTATIONS](https://arxiv.org/pdf/1909.11942.pdf)
- ![](https://pic4.zhimg.com/80/v2-237353aaeb0f6a2a8fe24bcd585cc65b_720w.jpg)

【2020-5-20】[BERT的youxiu变体：ALBERT论文图解介绍](https://zhuanlan.zhihu.com/p/142416395)

ALBERT作为BERT的一个变体，在保持性能的基础上，大大减少了模型的参数，使得实用变得更加方便，是经典的BERT变体之一。
 
考虑下面给出的句子。作为人类，当我们遇到“**apple**”这个词时，我们可以：
*   把“apple”这个词和我们对“apple”这个水果的表征联系起来
*   根据上下文将“apple”与水果联系在一起，而不是与公司联系在一起
*   理解“_he ate an apple_”
*   在字符级，单词级和句子级理解它
 
![](https://pic2.zhimg.com/v2-e7dda49cb43c1d2f5e4bbe757b0a5a19_b.jpg)
 
NLP最新发展的基本前提是赋予机器学习这些表示的能力。  
2018年，谷歌发布了BERT，试图基于一些新的想法来学习这个表示：
 
### 回顾BERT

**1\. 掩码语言建模**
 
语言建模包括预测单词的上下文，作为一种学习表示的方法。传统上，这包括到当给出前面的单词时预测句子中的下一个单词。
 
![](https://pic2.zhimg.com/v2-e394582d3b192c7b9e6ce6a23a5ea67d_b.jpg)
 
相反，BERT使用了一个**掩码语言模型**目标，在这个模型中，我们在文档中随机地对单词进行掩码，并试图根据周围的上下文来预测它们。
 
![](https://pic3.zhimg.com/v2-cceaeae52d02d52a4a2a27dac0662d9a_b.jpg)
 
 **2\. 下一个句子预测**  
 
“下一个句子预测”的目的是检测两个句子是否连贯。
 
![](https://pic2.zhimg.com/v2-a66f48660c3d0d00c8c06011f0897fc1_b.jpg)
 
为此，训练数据中的连续句被用作一个正样本。对于负样本，取一个句子，然后在另一个文档中随机抽取一个句子放在它的旁边。在这个任务中，BERT模型被训练来识别两个句子是否可以同时出现。
 
**3\. Transformer结构**
 
为了解决上述两项任务，BERT使用了多层Transformer模块作为编码器。单词向量被传递到各个层，以捕获其含义，并为基本模型生成大小为768的向量。
 
![](https://pic2.zhimg.com/v2-2797503b2f0e9275bd2d0466e47e66a5_b.jpg)
 
Jay Alammar有一篇非常好的文章：[http://jalammar.github.io/bert/](https://link.zhihu.com/?target=http%3A//jalammar.github.io/bert/)，更深入地阐述了Transformer的内部机制。
 
### BERT的问题
 
BERT发布后，在排行榜上产生了许多NLP任务的最新成果。但是，模型非常大，导致了一些问题。“ALBERT”论文将这些问题分为两类：
 
1、**内存限制和通信开销**：
 
考虑一个包含一个输入节点、两个隐藏节点和一个输出节点的简单神经网络。即使是这样一个简单的神经网络，由于每个节点的权重和偏差，也会有7个参数需要学习。
 
![](https://pic1.zhimg.com/v2-955ed3bb42debfc88c5d35ae147d4b70_b.jpg)

BERT-large模型是一个复杂的模型，它有24个隐含层，在前馈网络和注意头中有很多节点，所以有3.4亿个参数。如果你想在BERT的基础上进行改进，你需要大量的计算资源的需求来从零开始进行训练并在其上进行迭代
 
![](https://pic3.zhimg.com/v2-c30e166f19a018432a2354ac329b2eaa_b.jpg)
 
这些计算需求主要涉及gpu和TPUs，但是这些设备有内存限制。所以，模型的大小是有限制的。  
 
分布式训练是解决这个问题的一种流行方法。我们以BERT-large上的数据并行性为例，其中训练数据被分到两台机器上。模型在两台机器上对数据块进行训练。如图所示，你可以注意到在梯度同步过程中要传输的大量参数，这会减慢训练过程。同样的瓶颈也适用于模型的并行性，即我们在不同的机器上存储模型的不同部分。
 
![](https://pic2.zhimg.com/v2-2ecac204965c9acbdaec48a3c4f413e9_b.jpg)
 
2、**模型退化**  
 
最近在NLP研究社区的趋势是使用越来越大的模型，以获得在排行榜上的最先进的性能。ALBERT 的研究表明，这可能会导致收益退化。
 
在论文中，作者做了一个有趣的实验。
 
> 如果更大的模型可以带来更好的性能，为什么不将最大的BERT模型(BERT-large)的隐含层单元增加一倍，从1024个单元增加到2048个单元呢?
 
他们称之为“BERT-xlarge”。令人惊讶的是，无论是在语言建模任务还是在阅读理解测试(RACE)中，这个更大的模型的表现都不如BERT-large模型。
 
![](https://pic1.zhimg.com/v2-32e5c234b4128584c752d11cb3751a48_b.jpg)
 
从原文给出的图中，我们可以看到性能是如何下降的。BERT-xlarge的性能比BERT-large差，尽管它更大并且有更多的参数。  
 
![](https://pic3.zhimg.com/v2-1a9c618bd33e5fd93ce6d98ef1f50f66_b.jpg)
 
### 从BERT到ALBERT

一个有趣的现象：
- 当我们让一个模型的参数变多的时候，一开始模型效果是提高的趋势，但一旦复杂到了一定的程度，接着再去增加参数反而会让效果降低，这个现象叫作“model degratation"。

albert要解决的问题：
1. 让模型的参数更少 
2. 使用更少的内存 
3. 提升模型的效果

ALBERT提出了三种优化策略，做到了比BERT模型小很多的模型，但效果反而超越了BERT， XLNet。
- **低秩分解** `Factorized Embedding Parameterization`. 针对于Vocabulary Embedding。在BERT、XLNet中，词表的embedding size(E)和transformer层的hidden size(H)是等同的，所以E=H。但实际上词库的大小一般都很大，这就导致模型参数个数就会变得很大。通过对Embedding 部分降维来达到降低参数的作用。在最初的BERT中，以Base为例，Embedding层的维度与隐层的维度一样都是768，而词的分布式表示，往往并不需要这么高的维度，如Word2Vec时代就多采用50或300这样的维度。为了解决这些问题他们提出了一个基于factorization的方法。他们没有直接把one-hot映射到hidden layer, 而是先把one-hot映射到低维空间之后，再映射到hidden layer。这其实类似于做了矩阵的分解。
  - ![](https://www.zhihu.com/equation?tex=+O%28V+%5Ctimes+H%29+%5Cto+O%28V+%5Ctimes+E+%2B+E+%5Ctimes+H%29+)
  - V：词表大小；H：隐层维度；E：词向量维度
  - 以 BERT-Base 为例，Base中的Hidden size 为768， 词表大小为3w，此时的参数量为：768 * 3w = 23040000。 如果将 Embedding 的维度改为 128，那么此时Embedding层的参数量为： 128 * 3w + 128 * 768 = 3938304。二者的差为19101696，大约为19M。我们看到，其实Embedding参数量从原来的23M变为了现在的4M，似乎变化特别大，然而当我们放到全局来看的话，BERT-Base的参数量在110M，降低19M也不能产生什么革命性的变化。因此，可以说Embedding层的因式分解其实并不是降低参数量的主要手段。
- **层间参数共享** `Cross-layer parameter sharing`. Zhenzhong博士提出每一层的layer可以共享参数，这样一来参数的个数不会以层数的增加而增加。所以最后得出来的模型相比BERT-large小18倍以上。
  - 本质上就是对参数共享机制在Transformer内的探讨。Transformer两大主要的组件：FFN与多头注意力机制。
- **SOP替代NSP** `Inter-sentence coherence loss`. 在BERT的训练中提出了next sentence prediction loss, 也就是给定两个sentence segments, 然后让BERT去预测它俩之间的先后顺序，但在ALBERT文章里提出这种是有问题的，其实也说明这种训练方式用处不是很大。 所以他们做出了改进，他们使用的是setence-order prediction loss (SOP)，其实是基于主题的关联去预测是否两个句子调换了顺序。

模型压缩有很多手段，包括剪枝，参数共享，低秩分解，网络结构设计，知识蒸馏等。ALBERT 也没能逃出这一框架，它其实是一个相当工程化的思想
 
ALBERT在BERT 的基础上提出了一些新颖的想法来解决这些问题：
 
1、**跨层参数共享**
 
BERT-large模型有24层，而它的基础版本有12层。随着层数的增加，参数的数量呈指数增长。
 
![](https://pic4.zhimg.com/v2-da47ac3ebd17d165d957b4959294118f_b.jpg)
 
为了解决这个问题，ALBERT使用了跨层参数共享的概念。为了说明这一点，让我们看一下12层的BERT-base模型的例子。我们只学习第一个块的参数，并在剩下的11个层中重用该块，而不是为12个层中每个层都学习不同的参数。  
 
![](https://pic1.zhimg.com/v2-e5457046cbaeb14334cc8d9de72f128c_b.jpg)
 
我们可以只共享feed-forward层的参数，只共享注意力参数，也可以共享整个块的参数。论文对整个块的参数进行了共享。  
 
与BERT-base的1.1亿个参数相比，ALBERT模型只有3100万个参数，而使用相同的层数和768个隐藏单元。当嵌入尺寸为128时，对精度的影响很小。精度的主要下降是由于feed-forward层的参数共享。共享注意力参数的影响是最小的。
 
![](https://pic3.zhimg.com/v2-5e3a3fe7c409ca694d28ab4f68e16356_b.jpg)
 
跨层参数策略对性能的影响
 
2、**句子顺序预测 (SOP)**
 
BERT引入了一个叫做“**下一个句子预测**”的二分类损失。这是专门为提高使用句子对，如“自然语言推断”的下游任务的性能而创建的。基本流程为：
*   从训练语料库中取出两个连续的段落作为正样本
*   从不同的文档中随机创建一对段落作为负样本

![](https://pic2.zhimg.com/v2-90f2e0b33156326e46387959ce388c29_b.jpg)
 
像ROBERTA和XLNET这样的论文已经阐明了NSP的无效性，并且发现它对下游任务的影响是不可靠的。在取消NSP任务之后，多个任务的性能都得到了提高。  
 
因此，ALBERT提出了另一个任务**“句子顺序预测”**。关键思想是:
*   从同一个文档中取两个连续的段落作为一个正样本
*   交换这两个段落的顺序，并使用它作为一个负样本
 
![](https://pic3.zhimg.com/v2-c7b91c17a1b42283817b17a2d566a6d6_b.jpg)
 
这使得模型能学习到更细粒度的关于段落级的一致性的区别。
 
ALBERT推测NSP是无效的，因为与掩码语言建模相比，它并不是一项困难的任务。在单个任务中，它混合了主题预测和连贯性预测。主题预测部分很容易学习，因为它与掩码语言建模的损失有重叠。因此，即使NSP没有学习连贯性预测，它也会给出更高的分数。
 
SOP提高了下游多句编码任务(SQUAD 1.1, 2.0, MNLI, SST-2, RACE)的性能。
 
![](https://pic3.zhimg.com/v2-c9ce732b00678780cb2ae1fc9e219612_b.jpg)

在这里我们可以看到，在SOP任务上，一个经过NSP训练的模型给出的分数只比随机基线略好一点，但是经过SOP训练的模型可以非常有效地解决NSP任务。这就证明SOP能带来更好的学习表现。
 
3、**嵌入参数分解**
 
在BERT中，使用的embeddings(word piece embeddings)大小被链接到transformer块的隐藏层大小。Word piece embeddings使用了大小为30,000的词汇表的独热编码表示。这些被直接投射到隐藏层的隐藏空间。
 
假设我们有一个大小为30K的词汇表，大小为E=768的word-piece embedding和大小为H=768的隐含层。如果我们增加了块中的隐藏单元尺寸，那么我们还需要为每个嵌入添加一个新的维度。这个问题在XLNET和ROBERTA中也很普遍。

![](https://pic4.zhimg.com/v2-262f2f051d69dda14c1e437524f84e43_b.jpg)
 
ALBERT通过将大的词汇表嵌入矩阵分解成两个小的矩阵来解决这个问题。这将隐藏层的大小与词汇表嵌入的大小分开。这允许我们在不显著增加词汇表嵌入的参数大小的情况下增加隐藏的大小。
 
![](https://pic1.zhimg.com/v2-e9fb494e0067ae3770d09c7299e6aa94_b.jpg)
 
我们将独热编码向量投影到E=100的低维嵌入空间，然后将这个嵌入空间投影到隐含层空间H=768。
 
### 结果
 
*   比BERT-large模型缩小了18x的参数
*   训练加速1.7x
*   在GLUE, RACE和SQUAD得到SOTA结果：
  *   RACE：89.4%\[提升45.3%\]
  *   GLUE Benchmark：89.4
  *   SQUAD2.0 f1 score：92.2

ALBERT与BERT模型之间参数情况

![](https://pic3.zhimg.com/80/v2-7f6261989fc1b9b8d2ce05d4249911ce_720w.jpg)

在benchmark上的效果
![](https://pic1.zhimg.com/80/v2-5e320cd88fbc16d4038eebfaf586a9f4_720w.jpg)
![](https://pic4.zhimg.com/80/v2-969d2eefa07339b637d6333817d13a0f_720w.jpg)


**总结**
 
ALBERT标志着构建语言模型的重要一步，该模型不仅达到了SOTA，而且对现实世界的应用也是可行的。
 
- 英文原文：[https://amitness.com/2020/02/al](https://amitness.com/2020/02/albert-visual-summary/)
- albert的[中文预训练模型](https://github.com/brightmart/albert_zh)


## RoBERTa

RoBERTa 是BERT的成功变种之一，主要有四个简单有效的变化：
- 1）去除NSP任务；
- 2）训练步骤更多，batch size更大，数据更多；
- 3）更长的训练句子；
- 4）动态改变 [ MASK ] 模式。

RoBERTa 在 BERT 的基础上取得了令人印象深刻的结果。而且，RoBERTa 已经指出，**NSP 任务对于 BERT 的训练来说相对没用**。

## XLNet

- 全排列语言模型
- transformer-XL
- 跟多的数据


## ERNIE（融合知识）

思路：
- 百度版：全词mask
- 清华版：知识图谱融入


## 其它

UniLM、MASS 、SpanBERT 和 ELECTRA


# 模型蒸馏

- 【2020-9-23】[田渊栋团队新作：神经网络“彩票假设”可泛化，强化学习和NLP也适用](https://zhuanlan.zhihu.com/p/93988943)
    - 最初由MIT的研究人员Jonathan Frankle 和Michael Carbin 提出的彩票假设(lottery ticket hypothesis)表明，通过从“幸运”初始化(lucky initialization，通常被称为“中奖彩票”)开始训练深度神经网络，可以以最小的性能损失(甚至获得收益)将网络缩小10-100倍
    - 这项工作的意义令人兴奋，不仅可能找到用更少的资源进行训练的方法，还可以在更小的设备(例如智能手机和VR头盔)上更快地运行模型推理。
    - 但彩票假设尚未被AI社区完全理解。特别是尚不清楚中奖彩票是取决于特定的因素，还是代表了DNN的一种固有特性。
    - Facebook AI的最新研究发现了第一个确定的证据，证明**彩票假设在相关但截然不同的数据集中普遍存在，并可以扩展到强化学习(RL)和自然语言处理(NLP)**。
    ![](https://pic2.zhimg.com/v2-2ea52e4a9da0be3cba4d2427c6e3a33c_b.webp)
    ![](https://pic4.zhimg.com/v2-99386a2930a2ce105a810b884134e39d_b.webp)

- 蒸馏模型采用的是迁移学习，蒸馏的目标是让student学习到teacher的泛化能力，蒸馏的本质是压缩模型

## 背景

![](https://pics3.baidu.com/feed/4b90f603738da977703daa3003be0a1c8718e394.jpeg)

- 上图展示了很多基于 Transformer 的模型，模型下方的数字对应了模型的参数数量，单位是百万，可以看到这些模型变得越来越大。这些模型的体积也限制了其在现实世界中的使用，因为各方面因素：
    - 这种模型的训练花费大量的金钱，需要使用昂贵的 GPU 服务器才能提供大规模的服务。
    - 模型太大导致 inference 的时间也变长，不能用于一些实时性要求高的任务中。
    - 现在有不少机器学习任务需要运行在终端上，例如智能手机，这种情况也必须使用轻量级的模型。
- 基于以上的原因，不少研究开始针对 BERT 模型压缩进行，常见的模型压缩方法有以下几种：
    - `模型蒸馏` Distillation，使用大模型的学到的知识训练小模型，从而让小模型具有大模型的泛化能力。
        - 通过一些优化目标从大型、知识丰富、fixed的teacher模型学习一个小型的student模型。蒸馏机制主要分为3种类型：
            - 从软标签蒸馏：DistilBERT、EnsembleBERT
            - 从其他知识蒸馏：TinyBERT、BERT-PKD、MobileBERT、 MiniLM、DualTrain
            - 蒸馏到其他结构：Distilled-BiLSTM
    - `量化` Quantization，降低大模型的精度，减小模型。
        - 将高精度模型用低精度来表示；如Q-BERT和Q8BERT，量化通常需要兼容的硬件。
    - `剪枝` Pruning，去掉模型中作用比较小的连接。
        - 将模型中影响较小的部分舍弃。如Compressing BERT，还有结构化剪枝 LayerDrop，其在训练时进行Dropout，预测时再剪掉Layer，不像知识蒸馏需要提前固定student模型的尺寸大小。
    - `参数共享`，共享网络中部分参数，降低模型参数数量。
        - 相似模型单元间的参数共享；
        - ALBERT主要是通过矩阵分解和跨层参数共享来做到对参数量的减少。
    - `模块替换`：BERT-of-Theseus根据伯努利分布进行采样，决定使用原始的大模型模块还是小模型，只使用task loss。
    - 【2021-3-14】精简总结
      - ![](https://p1.pstatp.com/large/tos-cn-i-0022/6f5550f39b63450d8652a27ce4f61dfa)
- 总结
    - ![](https://pic1.zhimg.com/80/v2-b6bf3fcc2f2691c8b12dfd0a9ad2aa8a_720w.jpg)
    - 源自：[NLP算法面试必备！史上最全！PTMs：NLP预训练模型的全面总结](https://zhuanlan.zhihu.com/p/115014536)
- ALBERT 也是一种 BERT 压缩方法，主要是用了**参数共享**和**矩阵分解**的方法压缩 BERT，但是 ALBERT 只减少模型的参数，并不能减少其 inference 的时间。
- 两种使用模型蒸馏压缩 BERT 的算法
    - 第一种是 **DistilBERT**，将 12 层的 BERT-base 模型蒸馏到 6 层的 BERT 模型；
    - 第二种是将 BERT 模型蒸馏到 BiLSTM 模型。
- 更多内容：[BERT 模型蒸馏 Distillation BERT](https://baijiahao.baidu.com/s?id=1653807606350367881&wfr=spider&for=pc)
- 【2020-9-14】albert用于中文Q/A，[github代码](https://github.com/wptoux/albert-chinese-large-webqa)

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
 
*   teacher - 原始模型或模型ensemble
*   student - 新模型
*   transfer set - 用来迁移teacher知识、训练student的数据集合
*   soft target - teacher输出的预测结果（一般是softmax之后的概率）
*   hard target - 样本原本的标签
*   temperature - 蒸馏目标函数中的超参数
*   born-again network - 蒸馏的一种，指student和teacher的结构和尺寸完全一样
*   teacher annealing - 防止student的表现被teacher限制，在蒸馏时逐渐减少soft targets的权重
 
## 1. 基本思想

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
 
再重点强调一下，student学习的是teacher的泛化能力，而不是“过拟合训练数据”。
 
目前读的论文不是很多，但个人感觉还是有些炼丹的感觉。文献2中的BERT蒸馏任务，虽然比无蒸馏条件下有将近5个点的提升，但作者没有研究到底是因为数据增多还是蒸馏带来的提升。而且仍然距BERT有很大的距离，虽然速度提升了，但效果并不能上线。文献3中虽然有了比BERT更好的效果，但并没有用轻量的结构，性能还是不变。
 
接下来我会花时间读更多的论文，写新文章或把tricks加进这篇文章里，同学们有好的经验也可以说一下。

补充一些资源，还没仔细看：
1.  [dkozlov/awesome-knowledge-distillation](https://link.zhihu.com/?target=https%3A//github.com/dkozlov/awesome-knowledge-distillation)
2.  [Distilling BERT Models with spaCy](https://link.zhihu.com/?target=http%3A//www.nlp.town/blog/distilling-bert/%3Futm_campaign%3DNLP%2520News%26utm_medium%3Demail%26utm_source%3DRevue%2520newsletter)
3.  [DistilBERT](https://link.zhihu.com/?target=https%3A//medium.com/huggingface/distilbert-8cf3380435b5)
4.  [Multilingual MiniBERT: Tsai et al. (EMNLP 2019)](https://link.zhihu.com/?target=https%3A//arxiv.org/pdf/1909.00100)


# GPT模型

- 迭代路线：GPT → GPT-2 → GPT-3

项目[github页面](https://github.com/openai/gpt-3)和论文[Language Models are Few-Shot Learners](https://arxiv.org/abs/2005.14165), 目前没有代码只有生成样本和数据.52页的T5，72页的GPT-3

## 体验

申请账号，调用官方[api](https://beta.openai.com/?app=creative-gen&demo=5)

openai提供的[应用示例集合](https://beta.openai.com/examples)

代码：

```python
import os
import openai

openai.api_key = os.getenv("OPENAI_API_KEY")

# ------- 文本生成 ---------
prompt = """We’re releasing an API for accessing new AI models developed by OpenAI. Unlike most AI systems which are designed for one use-case, the API today provides a general-purpose “text in, text out” interface, allowing users to try it on virtually any English language task. You can now request access in order to integrate the API into your product, develop an entirely new application, or help us explore the strengths and limits of this technology."""

response = openai.Completion.create(model="davinci", prompt=prompt, stop="\n", temperature=0.9, max_tokens=100)

# ------- 其它应用 ---------
response = openai.Completion.create(
  engine="davinci",
  prompt="The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman: Hello, who are you?\nAI: I am an AI created by OpenAI. How can I help you today?\nHuman: I'd like to cancel my subscription.\nAI:",
  temperature=0.9,
  max_tokens=150,
  top_p=1,
  frequency_penalty=0.0,
  presence_penalty=0.6,
  stop=["\n", " Human:", " AI:"]
)

print(response)

```

### 个性化聊天

【2021-10-13】[AI 复活「她」！GPT-3 帮美国小哥复刻逝去未婚妻，但又夺走她…](https://www.toutiao.com/i7018474312931885576/),7 月，一名33岁的美国小哥 Joshua Barbeau 在未婚妻去世后，根据她在 Facebook 和 twitter 上的文本在另一名开发人员的帮助下成功在 GPT-3 上微调，能够复刻出未婚妻生前的谈话方式。有很多人觉得 Joshua Barbeau 这个行为很可怕。但他认为，借助 Project December 项目创建出模拟已故之人的聊天机器人，可能会“帮助一些因此抑郁的人解开他们的心结”。但，Project December 的开发作者 Jason Rohrer 却收到了来自 OpenAI 的最后通牒：我们会在 9 月 2 日上午 10 点终止你的 API 访问。
- Jason Rohrer 是一名独立游戏开发者，Project December 是他于去年夏天疫情期间突发奇想的一个灵感：用 GPT-3 API 来开发一款模拟人类的聊天机器人，以电影《Her》中男主角的智能语音助手 Samantha 为原型
- 7月用户量突然激增。在《旧金山纪事报》报道的一篇文章讲述了一位 33 岁的美国男子 Joshua Barbeau 如何利用 Project December 创建出模拟其已故未婚妻 Jessica 的聊天机器人并与之交谈数月。在那之后，成千上万的人开始使用 Rohrer 网站。
- Rohrer 意识到他的网站将达到每月 API 的限制。主动联系 OpenAI 希望能通过支付更多费用以增加配额，以便容纳更多人与他创建的“Samantha”或自己的聊天机器人交流。但与此同时，OpenAI 方面认为 Project December 存在一定隐患：聊天机器人可能会被滥用或对人们造成伤害。
- 因此，双方进行了一场视频会议，可是很明显，效果并不理想。Jason Rohrer 在接受外媒 The Register 的采访时提到，OpenAI 给出了继续使用 GPT-3 API 需满足的 3 个条件：
  - Jason Rohrer 必须禁止人们定制自己的开放式聊天机器人这一功能。
  - Jason Rohrer 需设置内容过滤器以避免用户与“Samantha”谈论敏感话题。
  - Jason Rohrer 必须部署自动化监控工具监视用户的对话，检测他们是否滥用 GPT-3 生成了有害或敏感语句。
- OpenAI 的员工与 Samantha 聊天，并试图了解「她」是否有种族主义倾向，或者会从「她」的训练数据中提供看起来像真实电话号码或电子邮件地址的内容，实验结果表明Samantha很老实，什么也没有说。Samantha 的输出令人感觉很真实，但随着时间的推移，很明显你能感觉到是在与某种自动化系统交谈，谈话的过程中往往会突然丢失对话思路。
  - ![](https://p5.toutiaoimg.com/origin/pgc-image/7add87e26cca475a848d79669be7b2e1?from=pc)
- OpenAI 担心用户会受到 AI 的影响，害怕机器人会让他们自杀或如何给选举投票，可这完全是一种超道德的立场。
- Jason Rohrer 拒绝添加 OpenAI 要求的功能或机制，而是悄悄将原本 Project December 使用的 GPT-3 API 断开。并且替换为功能较差的开源 **GPT-2模型**以及由另一个研究团队开发的大型语言模型 **GPT-J-6B**。不过这两种模型性能显然不比 GPT-3，Samantha的对话能力也受到了影响。

## 资料

- 【2021-10-13】[GPT-3 Creative Fiction](https://www.gwern.net/GPT-3) 小说作品创作
- 【2019-2】张俊林：[效果逆天的通用语言模型 GPT 2.0 来了，它告诉了我们什么？](https://www.infoq.cn/article/pW8YaUXjTuhC6d0p*OwX)
- [OpenAI GPT-3 API](https://openai.com/blog/openai-api/)，[Github地址](https://github.com/elyase/awesome-gpt3#awesome-gpt-3)
- ![](https://github.com/elyase/awesome-gpt3/raw/master/screenshot.png)

- Jay Alammar杰作：[怎样向产品解释GPT-3](http://jalammar.github.io/how-gpt3-works-visualizations-animations/)
![](http://jalammar.github.io/images/gpt3/05-gpt3-generate-output-context-window.gif)

- 资料
  - [GPT-3的50种玩法告诉你，它很酷，但是没有通过图灵测试](https://www.toutiao.com/a6855330183403012621/)
  - [最新最全GPT-3模型网络结构详细解析](https://www.toutiao.com/i6858589917883138571/)
  - 知乎：[如何评价1700亿参数的GPT-3？](https://www.zhihu.com/question/398114261)

## 发展历史

- 2018年6月，OpenAI的研究人员使用了一种新颖的组合，将生成式深度学习架构Transformer和无监督预训练（也称为自监督学习）结合起来，得到了GPT模型。
- Transformer的自注意力机制提供了一种通用的方式来对输入的各个部分进行建模，使其依赖于输入的其他部分（需要大量计算）。
- Transformer和无监督预训练的组合不限于GPT系列模型。Google，Facebook和许多大学实验室相继提出了BERT、XLNet等语言模型。
- 到2019年初，OpenAI改进了其基础架构，将参数和数据数量增加10倍来扩展同一模型，即GPT-2。
- 随后，OpenAI推出了SparseTransformer，它是对早期Transformer模型的改进，可以可靠地处理更长的文档。
- 2020年，OpenAI通过其beta API发布了GPT-3，引起了人们的关注。GPT-3不仅扩大了GPT-2上使用的数据量和计算量，而且用SparseTransformer取代了原始Transformer，从而产生了迄今为止具有最佳zero-shot 和 few-shot学习性能的模型。
- GPT-3的few-shot学习能力使得它具备了一些非常有趣的演示功能，包括自动代码生成、“搜索引擎”、写作辅助和创意小说等。

- 【2020-8-10】[京东副总裁何晓冬：GPT-3后，人机对话与交互何去何从？CCF-GAIR 2020](https://www.leiphone.com/news/202008/BC6XqIXF3ifH6uvV.html)
![](https://static.leiphone.com/uploads/new/images/20200810/5f311dc980e89.jpg?imageView2/2/w/740)

【2021-2-6】[GPT发家史](https://mp.weixin.qq.com/s/Y8yHaf7dm5jEQAvP9IvRRA)
- OpenAI 成立之初并非因为文本生成模型而知名，这点和 DeepMind 些许不同，后者专注强化学习一百年。 OpenAI 一开始两条线是**强化学习**和**生成模型**（集中 GAN），而 GPT 开始也没受到太大关注，而是在探索中 OpenAI 发现了其可能性，便开始大力投入，到现在基本上一大半项目都与其相关。所以，现今大家提起 OpenAI 相信都是马上想起 GPT，再或者和马一龙（Elon Musk）早期有一腿，又多少人还能想起强化学习和GAN呢。
- OpenAI 早期成员，除 Pieter Abbeel 等做强化学习的，就是一众做偏图像生成的，比如
- GAN 提出者 Ian Goodfellow 最早也是入职 OpenAI
- 同期入职的还有一个叫 Alec Radford 发明 DCGAN 的精神小伙。大家记住这个名字，因为他对 GPT 的发展应该说至关重要。
- 所以可以看出最早 OpenAI 就是群做强化学习和图像生成的人，没啥做 NLP 的，自然也难料想自己居然是通过 NLP 来一战成名。

GPT系列：
- 2018年6月 `GPT-1`：大量数据（约5GB文本）上无监督训练，然后针对具体任务在小的有监督数据集上做微调；关键词：“scalable, task-agnostic system”；8个GPU上训练一个月；预训练模型（1.1亿参数）可[下载](https://github.com/openai/finetune-transformer-lm)；
- 2019年2月 `GPT-2`：大量数据（约40GB文本）上无监督训练，然后针对具体任务在小的有监督数据集上做微调，尝试在一些任务上不微调（即使结果离SOTA还远）；关键词“without task-specific training”；据说在256个Google Cloud TPU v3上训练，256刀每小时，训练时长未知[2]；预训练模型（15亿参数）最终公开可[下载](https://github.com/openai/gpt-2-output-dataset)；[openai model](https://openai.com/blog/better-language-models/​openai.com/blog/better-language-models/)
- 2020年5月 `GPT-3`：大量数据（499B tokens）上无监督训练，不微调就超越SOTA；关键词“zero-shot, one-shot, few-shot”；训练据说话费1200万刀；1750亿参数，将会开放付费API


![](http://files.cn-healthcare.com/upload/20201117/wximg/41331605568278419)

[白描网页版](https://web.baimiaoapp.com/)

| 时间| 机构| 模型名称| 模型规模| 数据规模 | 计算时间|
|---|---|---|---|---|---|
|2018.6 | OpenAI | GPT | 110M | 4GB| 3天 |
|2018.10 | Google | BERT | 330M | 16GB | 50天 |
| 2019.2 | OpenAI | GPT-2 | 1.5B | 40GB | 200天 |
| 2019.7 | Facebook | RoBERTa | 330M | 160GB | 3年 |
| 2019.10 | Google| T5| 11B| 800GB| 66年|
| 2020.6| OpenAl| GPT-3| 175B| 2TB| 355年|
| 2021| 预计 | 预计|~1000B| ~10TB| ～1000年|

【202-7-14】[人工智能GPT3](https://zhuanlan.zhihu.com/p/159414219)

2019 年初，OpenAI 发布了通用语言模型 GPT-2，能够生成连贯的文本段落，在许多语言建模基准上取得了 SOTA 性能。这一基于 Transformer 的大型语言模型共包含 15 亿参数、在一个 800 万网页数据集上训练而成。GPT-2 是对 GPT 模型的直接扩展，在超出 10 倍的数据量上进行训练，参数量也多出了 10 倍。

OpenAI在最近， 新提出的 GPT-3 在网络媒体上引起啦的热议。因为它的参数量要比 2 月份刚刚推出的、全球最大深度学习模型 Turing NLP 大上十倍，而且不仅可以更好地答题、翻译、写文章，还带有一些数学计算的能力。
- [NLP各种语言模型参数对比](https://pic2.zhimg.com/80/v2-ddabb5228a36ec649adfad9a1589d838_720w.jpg?source=1940ef5c)
  - ![](https://pic2.zhimg.com/80/v2-ddabb5228a36ec649adfad9a1589d838_720w.jpg?source=1940ef5c)
  - 最早的ELMO模型有94M，然后2018年7月GPT出世，模型参数有110M，接着BERT-Large有340M；后来GPT-2出世已经把参数弄到1.5b了；再后来随着Turing  NLG的出现直接将参数提升到17b，成为当时最大的模型；最后GPT-3出现了，直接将参数增加到175b，参数量基本上是第二名Turing  NLG的十倍。参考：[数据拾光者](https://www.zhihu.com/question/398114261/answer/1647770083)
- `GPT-2` （参数15 亿）、`Megatron-BERT`（80 亿参数）、`Turing NLG`（170 亿参数），而`GPT-3`直接1700亿个参数。GPT-3不需要fine-tune，就能具有非常好的效果


GPT-3 在许多 NLP 数据集上均具有出色的性能，包括翻译、问答和文本填空任务，这还包括一些需要即时推理或领域适应的任务，例如给一句话中的单词替换成同义词，或执行 3 位数的数学运算。新闻生成，GPT-3生成的新闻我们很难将机器写的和人类写的区分。

GPT-3 是一种具有1,750亿个参数的自然语言深度学习模型，足足是 GPT-2 的 **116倍** 。该模型经过了将近0.5万亿个单词的预训练，并且在不进行微调的情况下，可以在多个NLP基准上达到最先进的性能。

GPT-3 最令人惊讶的还是**模型体量**，它用的最大数据集在处理前容量达到了 **45TB**。根据 OpenAI 的算力统计单位 petaflops/s-days，训练 AlphaGoZero 需要 1800-2000pfs-day，而 OpenAI 刚刚提出的 GPT-3 用了 3640pfs-day。
- Google的T5论文的一页实验烧了几百万美元，当时看起来已经是壕无人性了，但背靠MS的OpenAI的GPT-3需要的GPU算力是BERT的近2000倍，训练成本保守估计一千万美元，以至于训练出了一个bug也无能无力，论文只能拿出一部分篇幅研究了这个bug会有多大影响
- 当下入坑DL建议：<font color='red'>穷搞理论，富搞预训练。</font>
- 31个作者，72页论文，320万token（一个batch），1700亿参数，暴力出奇迹，few-shot干翻SOTA，finetune都省了（当然也tune不动），有钱真好。- 计算量（flops）是BERT的两千多倍，训练一个BERT 1.2万美元, GPT-3训练下来大约花了**1200万刀**。难怪出了bug也不敢retrain，**地主家也没余粮**了。
- ![](https://pica.zhimg.com/80/v2-601de22700b3f16299cad6596b7c46e9_720w.jpg?source=1940ef5c)
- 参考：[Jsgfery](https://www.zhihu.com/question/398114261/answer/1253374136)


研究者们希望 GPT-3 能够成为更通用化的 NLP 模型，解决当前 BERT 等模型的两个不足之处：对领域内**有标记**数据的过分依赖，以及对于领域数据分布的过拟合。GPT-3 致力于能够使用**更少**的特定领域，不做 fine-tuning 解决问题。

GPT-3依旧延续自己的**单向**语言模型训练方式，只不过这次把模型尺寸增大到了1750亿，并且使用45TB数据进行训练。同时，GPT-3主要聚焦于更通用的NLP模型，解决当前BERT类模型的两个缺点：
- 对领域内有标签数据的过分依赖：虽然有了预训练+精调的两段式框架，但还是少不了一定量的领域标注数据，否则很难取得不错的效果，而标注数据的成本又是很高的。
- 对于领域数据分布的过拟合：在精调阶段，因为领域数据有限，模型只能拟合训练数据分布，如果数据较少的话就可能造成过拟合，致使模型的泛华能力下降，更加无法应用到其他领域。

因此GPT-3的主要目标是用更少的领域数据、且不经过精调步骤去解决问题。GPT-3一定程度上证明了**大力真的可以出奇迹**，无需fine-tuning就能在下游任务中“大显神威”。

预训练好的GPT-3探索了不同输入形式下的推理效果：
- ![](https://pic1.zhimg.com/80/v2-da41862b5628280989f1add7ad7aa2d4_720w.jpg)
- Zero-shot、One-shot、Few-shot都是完全不需要精调的，因为GPT-3是单向transformer，在预测新的token时会对之前的examples进行编码。
- 实验证明Few-shot下GPT-3有很好的表现: 量变引起的质变
  - ![](https://pic1.zhimg.com/80/v2-77f44d864f988f74bdc9c3f29fc043c0_720w.jpg)

传入文本作为输入，GPT输出，模型在训练期间扫描大量文本“学到”的东西产生的，3000亿个文本token的数据集用于生成模型的训练样本，训练是将模型暴露于大量文本的过程。现在看到的所有实验都来自该受过训练的模型。据估计，这需要花费355年的GPU时间，花费460万美元
- ![](https://pic1.zhimg.com/80/v2-675873e6eb879d499511e4d3113180a4_720w.jpg)

GPT3为2048个token。这就是它的“上下文窗口”。这意味着它有2048条轨道，沿着这些轨道处理token。

NLP可以说是实现AGI的最大难题，NLP的突破需要一个效果很好且通用的模型，GPT-3依凭借巨大的参数与算力已经极力接近这样的性质，在许多任务上（如翻译、QA和文本填空任务）拥有出色的性能甚至取得了SOTA。然而，GPT-3还是存在一些局限，论文作者给出了未来有前景的方向：建立GPT-3尺度的双向模型。使双向模型能在少样本、零样本学习上工作。

其它评论：
- GPT-3参数量再大，还是没有逃过任何一个普通两层全连接神经网络的缺点：
  - 灾难性遗忘
  - 独立同分布假设
- 1700亿参数的堆叠就会是智能的本质吗？**大一点的猴子，但还是猴子，不是人**。只是在量变并没有质变。
- 人工智能该到了谈信仰的时候了，上一次这样争论的内容是联结主义和符号主义。Judea Pearl的结构因果模型才是真正可以称得上智能的东西。GPT-3呢？仍然处于 Association 阶段，只是在寻找数据之间的相关性，并没有从因果的角度显式地给出文本之间可解释的内在逻辑。它做不到训练集分布外的延拓，做不到因果推断，更何谈智能。总而言之，GPT-3更像是深度学习在现有算力下的一次巅峰验证，只是一个顺应时代的产物，但绝不是我们对智能最终的解决方案。
- GPT-3不具备人类的感知思维，它的生成表现只是大数据训练的结果，无法超越数据本身，也无法拥有人类自成长型的广泛组合性推理的能力，所以，我们不如说它学会的是“统计层面的复制粘贴能力”。[知乎](https://www.zhihu.com/question/398114261/answer/1376204327)


## 模型结构

GPT(“Generative Pre-Training”)也叫**生成式**预训练模型，之所以说它超强但不秀的原因是作为NLP中极有价值的工作，比BERT出现的早，但是名声却远远不如BERT那么响亮。

GPT是典型的预训练+微调的两阶段模型。
- **预训练**阶段就是用海量的文本数据通过无监督学习的方式来获取语言学知识
- **微调**就是用下游任务的训练数据来获得特定任务的模型。

GPT预训练模型结构主要有两个重要的点：
- 一个是使用**Transformer**作为特征抽取器
- 另一个是使用**单向**的语言模型。

GPT与BERT关系
- ![](https://pic2.zhimg.com/80/v2-c5295b8541bce75b8468e42f639235a6_720w.jpg?source=1940ef5c)

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
  - 2. GPT输出不仅是一次预测（概率），而是一系列预测（长度2048）（每个可能单词的概率）。序列中每个“next”位置都是一个预测。但是在生成文  时，通常只查看序列中最后一个单词的预测。
  - 3. 为了提高效率，GPT-3实际上使用字节级（byte-level）字节对编码（[BPE](https://huggingface.co/transformers  tokenizer_summary.html)）进行Token化。
  - 4. 对当前Token在序列中的位置进行编码，将Token的位置（标量i，在[0-2047]中）传递给12288个正弦函数，每个函数的频率都不同

![](https://p6-tt.byteimg.com/origin/pgc-image/f900defa52ba43f89260c42eaaee237a?from=pc)

## GPT-2

【2021-10-21】[图解GPT-2完整版](https://mp.weixin.qq.com/s?__biz=MzIyNjM2MzQyNg==&mid=2247539832&idx=1&sn=907c887c260a110cf5f0375cde6e6f9b&chksm=e8738d35df04042355802506243989770ebaa25ab4df3ff28e62d4ff2d862fda3b10c4a16968&mpshare=1&scene=23&srcid=1020ygRzRzn95VkxxlIb0njd&sharer_sharetime=1634742907130&sharer_shareid=b8d409494a5439418f4a89712efcd92a#rd)，[英文原文](http://jalammar.github.io/illustrated-gpt2/)
- GPT-2 不是一个特别新颖的架构，而是一种与 Transformer 解码器非常类似的架构。不过 GPT-2 是一个巨大的、基于 Transformer 的语言模型，它是在一个巨大的数据集上训练的。
- GPT-2 基本上就是键盘应用程序中预测下一个词的功能，但 GPT-2 比你手机上的键盘 app 更大更复杂。GPT-2 是在一个 40 GB 的名为 WebText 的数据集上训练的，OpenAI 的研究人员从互联网上爬取了这个数据集，作为研究工作的一部分。从存储空间大小方面来比较，我使用的键盘应用程序 SwiftKey，占用了 78 MB 的空间。而最小的 GPT-2 变种，需要 500 MB 的空间来存储它的所有参数。最大的 GPT-2 模型变种是其大小的 13 倍，因此占用的空间可能超过 6.5 GB。
- ![](http://p9.itc.cn/q_70/images03/20201111/dfb14796eddd4a4eac1f436e8d0041ec.png)
- ![](http://p8.itc.cn/q_70/images03/20201111/6bfcefd3a0d14eb1be6fac226a89c756.png)
- GPT-2体验：AllenAI [GPT-2 Explorer](https://gpt2.apps.allenai.org/)。它使用 GPT-2 来显示下一个单词的 10 种预测（包括每种预测的分数）。你可以选择一个单词，然后就能看到下一个单词的预测列表，从而生成一篇文章。

模型结构
- BERT 是使用 Transformer 的 Encoder 模块构建，而GPT-2 用 Transformer 的 Decoder 模块构建。
- 一个重要差异是，GPT-2 和传统的语言模型一样，一次输出一个 token
- GPT-2和后来的一些模型如 TransformerXL 和 XLNet，本质上都是自回归的模型。但 BERT 不是自回归模型。这是一种权衡。去掉了自回归后，BERT 能够整合左右两边的上下文，从而获得更好的结果。XLNet 重新使用了 自回归，同时也找到一种方法能够结合两边的上下文。
- ![](http://p2.itc.cn/q_70/images03/20201111/b01d3ba72549484ea085877e173e8da5.gif)
- 更多资料见原文

## GPT3工作原理

- [How GPT3 Works - Visualizations and Animations](https://jalammar.github.io/how-gpt3-works-visualizations-animations/)，汉化版：[图解GPT3的工作原理](https://zhuanlan.zhihu.com/p/344695943)


GPT3进行微调后，会更加惊人。微调实际上会更新模型的权重，以使模型在某些任务上表现更好

<iframe src="https://vdn1.vzuu.com/SD/8741ab12-57a8-11eb-ad57-02310f44807a.mp4" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"  height="600" width="100%"> </iframe>



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

问题
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

## 中文GPT

### 好玩儿的案例

【2021-10-14】[爆肝100天，我开发了一个会写作文的人工智能【17亿参数、2亿数据、1万行代码】](https://www.bilibili.com/video/BV1pr4y1w7uM) EssayKiller
- 一个基于OCR、NLP领域模型所构建的生成式文本创作AI框架，目前第一版finetune模型针对高考作文（主要是议论文），可以有效生成符合人类认知的文章，多数文章经过测试可以达到正常高中生及格作文水平。视频中有部分细节为了方便非AI专业的观众理解，以及为了更好的节目效果，做的略有不严谨。由于要控制时长我没有展开讲，业内大佬们见谅。技术上的问题欢迎[Github](https://github.com/EssayKillerBrain/EssayKiller_V2/tree/2.0)

<iframe src="//player.bilibili.com/player.html?aid=755124609&bvid=BV1pr4y1w7uM&cid=249390460&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width='800' height='600'> </iframe>

### CPM 清华智源

【2020-11-17】[中文版GPT-3来了？智源研究院发布清源 CPM —— 以中文为核心的大规模预训练模型](https://www.cn-healthcare.com/articlewm/20201117/content-1163510.html)
- ![](http://files.cn-healthcare.com/upload/20201117/wximg/38391605568279885)
- ![](http://files.cn-healthcare.com/upload/20201117/wximg/4751605568279966)
- ![](http://files.cn-healthcare.com/upload/20201117/wximg/94871605568280187)
- [CPM清华大学演示使用过程小说语句生成](https://www.bilibili.com/video/BV1VA411s77D/)
- <iframe src="//player.bilibili.com/player.html?aid=330632724&bvid=BV1VA411s77D&cid=268856252&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width='800' height='600'> </iframe>

北京智源人工智能研究院和清华大学研究团队合作开展大规模预训练模型，并发布[清源CPM](https://cpm.baai.ac.cn/) (Chinese Pretrained Models) 研究计划，旨在推动中文自然语言处理的研究与应用。2020 年 11 月中旬，CPM 开放第一阶段的26 亿参数规模的中文语言模型 (CPM-LM) 和217亿参数规模的结构化知识表示模型 (CPM-KM) 下载，以及相应的系统演示。

清源 CPM 大规模预训练模型具有以下特点： 
1. 学习能力强：能够在多种自然语言处理任务上，进行**零次**学习或**少次**学习达到较好的效果。
2. 语料丰富**多样**：收集大量丰富多样的中文语料，包括百科、小说、对话、问答、新闻等类型。
3. 行文自然流畅：基于给定上文，模型可以续写出一致性高、可读性强的文本，达到现有中文生成模型的领先效果。
4. 模型规模大：本次发布的 CPM-LM 的参数规模为 26 亿，预训练中文数据规模100 GB，使用了 64 块 V100 GPU 训练时间约为 3 周。CPM-KG 的参数规模分别为217亿，预训练结构化知识图谱为 WikiData 全量数据，包含近 1300 个关系、8500万实体、4.8 亿个事实三元组，使用了 8 块 V100 GPU 训练时间约为 2 周。

资料
- [清源CPM主页](https://cpm.baai.ac.cn/)
- 清源CPM [Github](https://github.com/TsinghuaAI/)
- 预训练模型必读[论文列表](https://github.com/thunlp/PLMpapers)
- [清源 CPM-中文GPT3-我魔改出了一个TF版本](https://zhuanlan.zhihu.com/p/297152907)


### PLUG——阿里巴巴达摩院

[PLUG测试地址](https://nlp.aliyun.com/portal#/BigText_chinese)
- ![](https://pic1.zhimg.com/80/v2-9abea76b517e3ab3f4e24dbeddf4ced8_720w.jpg)

【2021-4-19】[达摩院用128张GPU烧出“中文版GPT-3”，我试了下，这文风不是开往幼儿园的车…](https://zhuanlan.zhihu.com/p/365999690)

PLUG，Pre-training for Language Understanding and Generation，顾名思义，就是集语言理解（NLU）和生成（NLG）能力于一身。要实现这一点，据团队介绍，这一模型是达摩院此前提出的两种自研模型——NLU语言模型StructBERT、NLG语言模型PALM的融合。

此外，跟GPT-3的单向建模方式不同的是，它采用了编码器-解码器（encoder-decoder）的双向建模方式。整个训练过程分为两个阶段。
- 第一阶段，以达摩院自研的语言理解模型——StructBERT作为编码器。简单来说，它是在句子级别和词级别两个层次的训练目标中，加强对语言结构信息的建模，从而提高模型的语法学习能力。这也使得PLUG具有输入文本双向理解能力，能够生成和输入更相关的内容。这个过程共训练了300B tokens训练数据。
- 第二阶段，将这个编码器用于生成模型的初始化，并外挂一个6层、8192个隐藏层节点数的解码器，共计训练了100B tokens的训练数据。
- ![](https://pic2.zhimg.com/80/v2-ce80eff0eaf1d9e3d1aec364a1a3904d_720w.jpg)

PLUG还能为目标任务做针对性优化。GPT-3并没有利用**微调**和**梯度更新**，而是通过指定任务、展示少量演示，来与模型文本进行交互，完成各种任务。因此在面对新任务时候，不需要重新收集大量的带标签数据。但不可避免的，生成的效果不足。比如，**犯低级错误**就是GPT-3被人诟病比较多的一点。而PLUG的能力更加全面，既可以实现与GPT-3类似的**零样本**生成功能，也可以利用下游训练数据微调（finetune）模型，提升特定任务的生成质量。

当然，效果实现的关键，还少不了算力和数据。PLUG负责人表示，原本计划用128张A100训练120天炼成，不过由于阿里云、算法优化等达摩院多方力量的参与，以及加速手段的有效利用，成功将日程缩短到三分之一。最后，只烧了35天就达到了这样的效果。前面也提到，PLUG的参数量达到了270亿，中文训练数据量也达到了1T以上。在语言理解任务上，PLUG以80.614分刷新了CLUE分类任务榜单记录。而在语言生成任务上，据团队介绍，其多项应用数据较业内最优水平提升了8%以上。
- ![](https://pic4.zhimg.com/80/v2-804a587190c5cc17c24cb453b96ec3e3_720w.jpg)

耗时3个月、270亿参数规模、一发布就给体验端口

去年，阿里达摩院发布了自研深度语言模型体系，包括6大自研模型。
- **通用**语言模型StructBERT
- **多模态**语言模型StructVBERT
- **多语言**模型VECO
- **生成式**语言模型PALM……
他们一直在致力于陆陆续续将模型开源出来。


### 彩云小梦

[彩云小梦](https://if.caiyunai.com/dream/#/)
- ![](https://pic2.zhimg.com/80/v2-acb86090e26d23f3462b7ff43afef379_720w.jpg?source=1940ef5c)

总结：
- 小梦熟悉小说写作的各种套路，它有着不错的脑洞，能够一定程度上理解前文的脉络，并且不失时机地运用它知道的写作手法。
- 不过，它的缺点也是明显的，依然是缺少常识。这导致它在遣词造句上，会写出不符合人类习惯的奇怪句子。
- 不过小梦显然是值得期待的。甚至现在的网文作者，已经可以把小梦当作工具，在一些特定的场景里，帮助作者寻找情节的突破口。小梦写得还不够好，但它肯定看过的文章比任何人都多，未来可期。


# 向量化


## ES句向量

- 【2020-9-15】[ElasticTransformers](https://github.com/md-experiments/elastic_transformers)
    - Elastic Transformers：Jupyter Notebook里的可扩展BERT语义搜索
- ![](https://github.com/md-experiments/elastic_transformers/raw/master/assets/architecture.png)



## Faiss简介

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

## Milvus

【2021-5-31】[Milvus 是什么](https://milvus.io/cn/docs/overview.md) Milvus 是一款开源的向量数据库，支持针对 TB 级向量的增删改操作和近实时查询，具有高度灵活、稳定可靠以及高速查询等特点。Milvus 集成了 Faiss、NMSLIB、Annoy 等广泛应用的向量索引库，提供了一整套简单直观的 API，让你可以针对不同场景选择不同的索引类型。此外，Milvus 还可以对标量数据进行过滤，进一步提高了召回率，增强了搜索的灵活性。

Milvus 服务器采用主从式架构 (Client-server model)。在服务端，Milvus 由 Milvus Core 和 Meta Store 两部分组成：
- Milvus Core 存储与管理向量和标量数据。
- Meta Store 存储与管理 SQLite 和 MySQL 中的元数据，分别用于测试和生产。
在客户端，Milvus 还提供了基于 Python、Java、Go、C++ 的 SDK 和 RESTful API。

整体架构

![](https://milvus.io/static/822d9e7c7b1dd7cd0c9e27040be06bbe/1e088/milvus_arch.png)

Milvus 在全球范围内已被数百家组织和机构所采用，广泛应用于以下场景：
- 图像、视频、音频等音视频搜索领域
- 文本搜索、推荐和交互式问答系统等文本搜索领域
- 新药搜索、基因筛选等生物医药领域


# 资料

- [Bert时代的创新（应用篇）：Bert在NLP各领域的应用进展](https://zhuanlan.zhihu.com/p/68446772)
- 【2019-10-22】[【DL】模型蒸馏Distillation](https://zhuanlan.zhihu.com/p/71986772)
- [从入门到放弃：深度学习中的模型蒸馏技术](https://zhuanlan.zhihu.com/p/93287223?from_voters_page=true)
- [知识蒸馏(Knowledge Distillation) 经典之作](https://zhuanlan.zhihu.com/p/102038521)


# NLP新范式：Prompt

【2021-8-3】[Fine-tune之后的NLP新范式：Prompt越来越火，CMU华人博士后出了篇综述文章](https://blog.csdn.net/xixiaoyaoww/article/details/119363189)，CMU 博士后研究员刘鹏飞：近代自然语言处理技术发展的第四范式可能是预训练语言模型加持下的 Prompt Learning。
- 从 BERT 开始，**预训练+finetune** 已经成为了整个领域的常规范式。但是从 GPT-3 开始，一种新的范式开始引起大家的关注并越来越流行：**prompting**。
- [论文地址](https://arxiv.org/pdf/2107.13586.pdf)，更多研究见：清华大学开源的论文列表 [thunlp/PromptPapers](https://github.com/thunlp/PromptPapers)
- ![img](https://img-blog.csdnimg.cn/img_convert/e538ffef7d05deaf84a5a66225c7f4bc.png)

## 介绍

全监督学习在 NLP 领域也非常重要。但是全监督的数据集对于学习高质量的模型来说是不充足的，早期的 NLP 模型严重依赖特征工程。随着用于 NLP 任务的神经网络出现，使得特征学习与模型训练相结合，研究者将研究重点转向了架构工程，即通过设计一个网络架构能够学习数据特征。各种模式的对比如下：

|模式paradigm|工程重心engineering|示例|任务关系task relation|
|---|---|---|---|
|①全监督（非神经网络）|特征|如单词，词性，句子长度等|分类、序列标注、语言模型（无监督）、生成|
|②全监督（神经网络）|结构|如卷积、循环、自注意力|同上|
|③pre-train与fine-tune|目标|掩码语言模型、NSP下一句预测|以语言模型为中心，含无监督训练|
|④pre-train、prompt与predict|提示|完形填空、前缀|语言模型为中心，含文本提示|

- ![img](https://img-blog.csdnimg.cn/img_convert/e7be4976c76f47cf54a95a7dcd2150b9.png)

## Prompt 概要

该综述研究试图通过提供 prompting 方法的概述和形式化定义，以及使用这些 prompt 的预训练语言模型的概述，来梳理这一迅速发展领域的当前知识状态。然后该论文对 prompt 方法进行了深入的讨论，包括 **prompt工程**、**answer工程**等基础和**多prompt学习**方法、**prompt相关的训练方法**等更高级的概念。

然后，该研究列出了已有的基于 prompt 学习方法的多种应用，并探讨了不同应用场景中如何选择合适的训练方法。最后，该研究尝试在研究生态系统中定位 prompt 方法的当前状态，并与其他研究领域建立联系。此外，该研究提出一些可能适合进一步研究的挑战性问题，并针对当前研究趋势进行了分析。

基于 Prompt 的学习方法试图通过**学习LM**来规避这一问题，该 LM 对文本 x 本身的概率 P(x; θ) 进行建模并使用该概率来预测 y，从而减少或消除了训练模型对大型监督数据集的需求。

最基本的 Prompt 形式的数学描述，包含许多有关 Prompt 的工作，并且可以扩展到其他内容。

基础 Prompt 分三步预测得分最高的 ^y，即：**prompt 添加**、**answer 搜索**和 **answer 映射**。prompting 方法的术语和符号。
- ![img](https://img-blog.csdnimg.cn/img_convert/c441c670a31e4b2669da835842b9f171.png)
不同任务的输入、模板和 answer 示例：
- ![img](https://img-blog.csdnimg.cn/img_convert/90e84a4ad6cf465e3e306fc376581bcf.png)

## Prompt设计思路

Prompting 设计考虑：
- 预训练模型选择：有许多预训练 LM 可以用来计算 P(x; θ)。在第 3 章中，研究者对预训练 LM 进行了初步的介绍；
- **Prompt 工程**：如果 prompt 指定了任务，那么选择正确的 prompt 不仅对准确率影响很大，而且对模型首先执行的任务也有很大影响。在第 4 章中，研究者讨论了应该选择哪个 prompt 作为 f_prompt(x) 方法；
- **Answer 工程**：根据任务的不同，会有不同的方式设计 Z (Answer)，可能会和映射函数一起使用。在第 5 章中，详细介绍了不同的设计方式；
- **扩展范式**：如上所述， 上面的公式仅仅代表了各种底层框架中最简单的一种，这些框架已经被提议用于执行各种 prompting。在 第 6 章中，研究者讨论了扩展这种基本范式以进一步提高结果或适用性的方法；
- 基于 Prompt 的**训练策略**：在第 7 章中，研究者总结了不同的训练策略并详细说明它们的相对优势

![img](https://img-blog.csdnimg.cn/img_convert/eae05d97522535d2a976353daae592c2.png)

详情见原文
