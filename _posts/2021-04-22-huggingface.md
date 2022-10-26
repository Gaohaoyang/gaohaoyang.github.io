---
layout: post
title:  Huggingface使用笔记
date:   2021-04-22 16:52:00
categories: 深度学习 技术工具
tags: NLP Transformer bert gpt tensorflow pytorch
excerpt: 跟预训练语言模型一起成长壮大的创业公司
mathjax: true
permalink: /huggingface
---

* content
{:toc}


# Huggingface

![](https://huggingface.co/front/assets/huggingface_logo-noborder.svg)

![logo](https://img-blog.csdnimg.cn/20200904202104322.png)

[demo](https://transformer.huggingface.co/)

## Hugging face 简介

[Hugging Face](https://huggingface.co/) 是一家总部位于纽约的聊天机器人初创服务商，开发的应用在青少年中颇受欢迎，相比于其他公司，Hugging Face更加注重产品带来的情感以及环境因素。

但更令它广为人知的是Hugging Face专注于NLP技术，拥有大型的开源社区。尤其是在github上开源的自然语言处理，预训练模型库 `Transformers`，已被下载超过一百万次，github上超过24000个star。[Transformers](https://github.com/huggingface/transformers) 提供了NLP领域大量state-of-art的 预训练语言模型结构的模型和调用框架。

PyTorch实现了从语言中识别情绪情感反讽的DeepMoji模型：https://github.com/huggingface/torchMoji

【2022-9-7】注册账户后[申请token](https://huggingface.co/settings/tokens)才能下载模型

## Transformers 库

### 介绍

- 这个库最初的名称是 pytorch-pretrained-bert，它随着BERT一起应运而生。
- Google2018年10月底在开源了[BERT](https://github.com/google-research/bert) 的tensorflow实现。当时，BERT以其强劲的性能，引起NLPer的广泛关注。
- 几乎与此同时，pytorch-pretrained-bert也开始了它的第一次提交。pytorch-pretrained-bert 用当时已有大量支持者的pytorch框架复现了BERT的性能，并提供预训练模型的下载，使没有足够算力的开发者们也能够在几分钟内就实现 state-of-art-fine-tuning。
- 直到2019年7月16日，在repo上已经有了包括 BERT，GPT，GPT-2，Transformer-XL，XLNET，XLM在内六个预训练语言模型，这时候名字再叫pytorch-pretrained-bert 就不合适了，于是改成了pytorch-transformers，势力范围扩大了不少。这还没完！
- 2019年6月Tensorflow2的beta版发布，Huggingface也闻风而动。为了立于不败之地，又实现了TensorFlow 2.0和PyTorch模型之间的深层互操作性，可以在TF2.0/PyTorch框架之间随意迁移模型。
- 在2019年9月也发布了2.0.0版本，同时正式更名为 transformers 。到目前为止，transformers 提供了超过100种语言的，32种预训练语言模型，简单，强大，高性能，是新手入门的不二选择。

Huggingface名字演进

<div class="mermaid">
    flowchart LR
    %% 节点颜色
    classDef red fill:#f02;
    classDef green fill:#5CF77B;
    classDef blue fill:#6BE0F7;
    classDef orange fill:#F7CF6B;
    classDef grass fill:#C8D64B;
    %%节点关系定义
    B(2018年,BERT):::grass-.->|2018,诞生,pytorch版|A(pytorch-pretrained-bert):::blue
    T1(TensorFlow 1.0) -.->B
    E(Elmo):::orange-->|双向|B
    G(GPT):::orange-->|transformer|B
    T1-.->E
    T1-.->G
    A -->|2019年7月,模型扩充到6个| A1(pytorch-transformers):::green
    T2(Tensorflow 2.0)-.->|支持TF|A1
    T1-->|2019年6月|T2
    A1 -->|2019年9月,更名| A2(transformers):::green
    A2 -->|扩充,32种模型,100+种语言| A3(新版transformers):::green
</div>

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

### 推理加速

【2022-1-21】[让 Transformer 的推理速度提高 4.5 倍，这个小 trick 还能给你省十几万](https://mp.weixin.qq.com/s/fYxFwBvfQFPTqMZL6UI5WQ)
- NLP明星公司Hugging Face发布了一个叫做Infinity的产品，可以以1ms延时完成Transformer的推理，性能相当高了。但有点贵——1年至少要十几万块 （2万美元）
- 有没有别的办法？Transformer-deploy：开源的、“不费吹灰之力”就可以达到Infinity一些公共基准的那种。并且现在，通过在该方法上施加一个小trick（GPU量化（quantization）），将Transformer的推理速度提高4.5倍！
  - 用一行命令优化和部署Hugging Face上的Transformer模型，并支持大多数基于Transformer编码器的模型，比如Bert、Roberta、miniLM、Camembert、Albert、XLM-R、Distilbert等。
  - Transformer-deploy推理服务器用的是Nvidia Triton。推理引擎为Microsoft ONNX Runtime（用于CPU和GPU推理）和Nvidia TensorRT（仅限 GPU）。如果想在GPU上获得一流的性能，Nvidia Triton+Nvidia TensorRT这样的组合无疑是最佳选择。虽然TensorRT用起来有点难，但它确实能比用Pytorch快5～10倍。
  - 在实际性能测试中，Transformer-deploy在batch size为1、token分别为16和128的输入序列中的推理速度，都比付费的Hugging Face Infinity要快：Transformer-deploy在token为16时要1.52ms，Infinity则需要1.7ms；token为128时需要1.99ms，Infinity则需要2.5ms。

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

### Demo发布（space）

【2022-10-8】[Spaces](https://huggingface.co/spaces) ：Discover amazing ML apps made by the community! 展示各种DEMO
- [Hugging Face Spaces](https://huggingface.co/spaces) will host the interface on its servers and provide you with a link you can share.
- 更多用法，参考另一篇日志：[Python下的模型快速部署](https://wqw547243068.github.io/python?#%E6%A8%A1%E5%9E%8B%E5%BF%AB%E9%80%9F%E9%83%A8%E7%BD%B2)


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


# 结束