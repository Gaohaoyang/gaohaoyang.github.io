---
layout: post
title:  BERT及预训练语言模型-BERT-and-Language-Model
date:   2019-12-10 16:52:00
categories: 深度学习 
tags: 深度学习 自然语言处理 NLP Transformer BERT GPT Attention 蒸馏 Faiss Facebook TextCNN ES 田渊栋 彩票假设 自监督 Milvus ALBERT elasticsearch es 可视化 unilm simcse
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
  - ![](https://pic2.zhimg.com/80/v2-67138799a41ee6e489727b15c0b1e731_720w.jpg)
  - ![](https://pic2.zhimg.com/80/v2-d82cd793c1b59c20ee7f97d95f53c675_720w.jpg)

- 【2020-8-13】[打破BERT天花板：11种花式炼丹术刷爆NLP分类SOTA！](https://blog.csdn.net/abcdefg90876/article/details/108016310)
![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy81ZmtuYjQxaWI5cUgxd240a08wQ1FpYkJlZGNiZzduemZCUTNKMTlPcTNnRFZxY1ZFbU1lMjhPWjlwZkQ0SkswanV1YVVZNjYwTEtzcUJteE5BUTU4WlRnLzY0MA?x-oss-process=image/format,png)
- NLP分类模型时间线
    - ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy81ZmtuYjQxaWI5cUYzaWJLQ05yOG9FakZjRDF5bE9pY1o5VHVHTlpKcUN1N0ZtcWliMHZKbmU3c0V5Z2ljQkFzdTc3RDdTbjN2a0pTR1hDaWM5OUZRelRpY0dqU3cvNjQw?x-oss-process=image/format,png)

# 自监督表示学习

- 【2020-6-19】[NLP中的自监督表示学习](https://www.toutiao.com/i6839892851711541764),[英文原文](https://amitness.com/2020/05/self-supervised-learning-nlp/)  

虽然计算机视觉在自监督学习方面取得了惊人的进展，但在很长一段时间内，自监督学习一直是NLP研究领域的一等公民。语言模型早在90年代就已经存在，甚至在“自我监督学习”这个术语出现之前。2013年的Word2Vec论文推广了这一模式，在许多问题上应用这些自监督的方法，这个领域得到了迅速的发展。

这些自监督的方法的核心是一个叫做 “pretext task” 的框架，它允许我们使用数据本身来生成标签，并使用监督的方法来解决非监督的问题。这些也被称为“auxiliary task”或“pre-training task“。通过执行此任务获得的表示可以用作我们的下游监督任务的起点。
 
![NLP中的自监督表示学习，全是动图，很过瘾的](https://p1-tt.byteimg.com/origin/pgc-image/47ba10919c1440c781c0b14f1c14de82?from=pc)

在这篇文章中，我将概述研究人员在没有明确的数据标注的情况下从文本语料库中学习表示的各种pretext tasks。本文的重点是任务的制定，而不是实现它们的架构。

自监督的方案

## 1. 预测中心词
 
在这个公式中，我们取一定窗口大小的一小块文本，我们的目标是根据周围的单词预测中心单词。
 
![NLP中的自监督表示学习，全是动图，很过瘾的](https://p3-tt.byteimg.com/origin/pgc-image/b217d92b952d4601937a1629bc867642?from=pc)

例如，在下面的图中，我们有一个大小为1的窗口，因此我们在中间单词的两边各有一个单词。使用这些相邻的词，我们需要预测中心词。
 
![NLP中的自监督表示学习，全是动图，很过瘾的](https://p3-tt.byteimg.com/origin/pgc-image/62516862aa444fed9885c34aaf955b05?from=pc)

这个方案已经在著名的Word2Vec论文的“Continuous Bag of Words”方法中使用过。
 
## 2. 预测邻居词

在这个公式中，我们取一定窗口大小的文本张成的空间，我们的目标是在给定中心词的情况下预测周围的词。
 
![NLP中的自监督表示学习，全是动图，很过瘾的](https://p6-tt.byteimg.com/origin/pgc-image/63df64f4f6af401db506372dc06c0b2f?from=pc)
 
这个方案已经在著名的Word2Vec论文的“skip-gram”方法中实现。
 
## 3. 相邻句子的预测
 
在这个公式中，我们取三个连续的句子，设计一个任务，其中给定中心句，我们需要生成前一个句子和下一个句子。它类似于之前的skip-gram方法，但适用于句子而不是单词。
 
![NLP中的自监督表示学习，全是动图，很过瘾的](https://p6-tt.byteimg.com/origin/pgc-image/6c88f0845d7e4ae38ea626bb3bfd9000?from=pc)

这个方案已经在Skip-Thought Vectors的论文中使用过。
 
## 4. 自回归语言建模
 
在这个公式中，我们取大量未标注的文本，并设置一个任务，根据前面的单词预测下一个单词。因为我们已经知道下一个来自语料库的单词是什么，所以我们不需要手工标注的标签。
 
![NLP中的自监督表示学习，全是动图，很过瘾的](https://p1-tt.byteimg.com/origin/pgc-image/bf36697cfb06464c8faf6ab3c88a2493?from=pc)

例如，我们可以通过预测给定前一个单词的下一个单词来将任务设置为从左到右的语言建模。
 
![NLP中的自监督表示学习，全是动图，很过瘾的](https://p6-tt.byteimg.com/origin/pgc-image/1ddb11e50efa4a6f955bac7e14218b1b?from=pc)

我们也可以用这个方案来通给定未来的单词预测之前的单词，方向是从右到左。
 
![NLP中的自监督表示学习，全是动图，很过瘾的](https://p6-tt.byteimg.com/origin/pgc-image/bbb35ee25289497a9c40e3eeee901fe0?from=pc)

这个方案已经使用在许多论文中，从n-gram模型到神经网络模型比如神经概率语言模型 (GPT) 。
 
## 5. 掩码语言建模
 
在这个方案中，文本中的单词是随机掩码的，任务是预测它们。与自回归公式相比，我们在预测掩码单词时可以同时使用前一个词和下一个词的上下文。
 
![NLP中的自监督表示学习，全是动图，很过瘾的](https://p1-tt.byteimg.com/origin/pgc-image/a9b530083051422f9f88c1613eff489f?from=pc)
 
这个方案已经在BERT、RoBERTa和ALBERT的论文中使用过。与自回归相比，在这个任务中，我们只预测了一小部分掩码词，因此从每句话中学到的东西更少。
 
## 6. 下一个句子预测
 
在这个方案中，我们取文件中出现的两个连续的句子，以及同一文件或不同文件中随机出现的另一个句子。
 
![NLP中的自监督表示学习，全是动图，很过瘾的](https://p3-tt.byteimg.com/origin/pgc-image/8d58e6c913dc445d895429086cc50ae9?from=pc)

然后，任务是区分两个句子是否是连贯的。
 
![NLP中的自监督表示学习，全是动图，很过瘾的](https://p3-tt.byteimg.com/origin/pgc-image/f50ff4fe179a4678926ddcc3769289f0?from=pc)

在BERT的论文中，它被用于提高下游任务的性能，这些任务需要理解句子之间的关系，比如自然语言推理(NLI)和问题回答。然而，后来的研究对其有效性提出了质疑。
 
## 7. 句子顺序的预测
 
在这个方案中，我们从文档中提取成对的连续句子。然后互换这两个句子的位置，创建出另外一对句子。
 
![NLP中的自监督表示学习，全是动图，很过瘾的](https://p1-tt.byteimg.com/origin/pgc-image/0638806390584a488e06c82a11832455?from=pc)
 
我们的目标是对一对句子进行分类，看它们的顺序是否正确。
 
![NLP中的自监督表示学习，全是动图，很过瘾的](https://p1-tt.byteimg.com/origin/pgc-image/2ba2388f8dfa4778ba4684a8bbbc57fe?from=pc)

在ALBERT的论文中，它被用来取代“下一个句子预测”任务。
 
## 8. 句子重排
 
在这个方案中，我们从语料库中取出一个连续的文本，并破开的句子。然后，对句子的位置进行随机打乱，任务是恢复句子的原始顺序。
 
![NLP中的自监督表示学习，全是动图，很过瘾的](https://p6-tt.byteimg.com/origin/pgc-image/451d926ff39a4ce6b3f2ef4b97d18469?from=pc)
 
它已经在BART的论文中被用作预训练的任务之一。
 
## 9. 文档旋转
 
在这个方案中，文档中的一个随机token被选择为旋转点。然后，对文档进行旋转，使得这个token成为开始词。任务是从这个旋转的版本中恢复原来的句子。
 
![NLP中的自监督表示学习，全是动图，很过瘾的](https://p3-tt.byteimg.com/origin/pgc-image/8095d77a0fc440978eb825289a83acf6?from=pc)
 
  
 
它已经在BART的论文中被用作预训练的任务之一。直觉上，这将训练模型开始识别文档。
 
## 10. 表情符号预测
 
这个方案被用在了DeepMoji的论文中，并利用了我们使用表情符号来表达我们所发推文的情感这一想法。如下所示，我们可以使用推特上的表情符号作为标签，并制定一个监督任务，在给出文本时预测表情符号。
 
![NLP中的自监督表示学习，全是动图，很过瘾的](https://p1-tt.byteimg.com/origin/pgc-image/501d4092a3c4433298824a230c07eeb1?from=pc)
 
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

## 1、论文汇总：

PTMs-Papers:

1. https://github.com/thunlp/PLMpapers
2. https://github.com/tomohideshibata/BERT-related-papers
3. https://github.com/cedrickchee/awesome-bert-nlp
4. https://bertlang.unibocconi.it/
5. https://github.com/jessevig/bertviz

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

### transformers库

- 这个库最初的名称是pytorch-pretrained-bert，它随着BERT一起应运而生。Google2018年10月底在开源了[BERT](https://github.com/google-research/bert)的tensorflow实现。当时，BERT以其强劲的性能，引起NLPer的广泛关注。几乎与此同时，pytorch-pretrained-bert也开始了它的第一次提交。pytorch-pretrained-bert 用当时已有大量支持者的pytorch框架复现了BERT的性能，并提供预训练模型的下载，使没有足够算力的开发者们也能够在几分钟内就实现 state-of-art-fine-tuning。
- 直到2019年7月16日，在repo上已经有了包括BERT，GPT，GPT-2，Transformer-XL，XLNET，XLM在内六个预训练语言模型，这时候名字再叫pytorch-pretrained-bert就不合适了，于是改成了pytorch-transformers，势力范围扩大了不少。这还没完！
- 2019年6月Tensorflow2的beta版发布，Huggingface也闻风而动。为了立于不败之地，又实现了TensorFlow 2.0和PyTorch模型之间的深层互操作性，可以在TF2.0/PyTorch框架之间随意迁移模型。在2019年9月也发布了2.0.0版本，同时正式更名为 transformers 。到目前为止，transformers 提供了超过100种语言的，32种预训练语言模型，简单，强大，高性能，是新手入门的不二选择。

安装：pip install transformers==2.2.0

```python
import torch
from transformers import BertModel, BertTokenizer

# 调用bert-base模型，同时模型的词典经过小写处理
model_name = 'bert-base-uncased'
# 读取模型对应的tokenizer
tokenizer = BertTokenizer.from_pretrained(model_name)
# 载入模型
model = BertModel.from_pretrained(model_name)
# 输入文本
input_text = "Here is some text to encode"
# 通过tokenizer把文本变成 token_id
input_ids = tokenizer.encode(input_text, add_special_tokens=True)
# input_ids: [101, 2182, 2003, 2070, 3793, 2000, 4372, 16044, 102]
input_ids = torch.tensor([input_ids])

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

### BERT降维


#### 可视化

- [Visualizing BERT](https://home.ttic.edu/~kgimpel/viz-bert/viz-bert.html)
- kaggle上外国人分享的[Visualizing BERT embeddings with t-SNE](https://www.kaggle.com/wqw547243068/visualizing-bert-embeddings-with-t-sne/edit)


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

# GPT

迭代路线：
- GPT → GPT-2 → GPT-3


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
- 【2021-2-6】[GPT发家史](https://mp.weixin.qq.com/s/Y8yHaf7dm5jEQAvP9IvRRA)
  - OpenAI 成立之初并非因为文本生成模型而知名，这点和 DeepMind 些许不同，后者专注强化学习一百年。 OpenAI 一开始两条线是**强化学习**和**生成模型**（集中 GAN），而 GPT 开始也没受到太大关注，而是在探索中 OpenAI 发现了其可能性，便开始大力投入，到现在基本上一大半项目都与其相关。所以，现今大家提起 OpenAI 相信都是马上想起 GPT，再或者和马一龙（Elon Musk）早期有一腿，又多少人还能想起强化学习和GAN呢。
  - OpenAI 早期成员，除 Pieter Abbeel 等做强化学习的，就是一众做偏图像生成的，比如
    - GAN 提出者 Ian Goodfellow 最早也是入职 OpenAI
    - 同期入职的还有一个叫 Alec Radford 发明 DCGAN 的精神小伙。大家记住这个名字，因为他对 GPT 的发展应该说至关重要。
    - 所以可以看出最早 OpenAI 就是群做强化学习和图像生成的人，没啥做 NLP 的，自然也难料想自己居然是通过 NLP 来一战成名。


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

### ES句向量

- 【2020-9-15】[ElasticTransformers](https://github.com/md-experiments/elastic_transformers)
    - Elastic Transformers：Jupyter Notebook里的可扩展BERT语义搜索
- ![](https://github.com/md-experiments/elastic_transformers/raw/master/assets/architecture.png)



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

### Milvus

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









