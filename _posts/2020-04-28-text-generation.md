---
layout: post
title:  "文本生成-Text Generation"
date:   2020-04-28 21:39:00
categories: 深度学习
tags: 深度学习 NLP GAN Seq2seq 对话系统 文本评价
excerpt: 深度学习在NLP子领域——文本生成的应用汇总，如seq2seq、GAN系列
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

- 【2020-7-6】清华孙茂松：九歌多样化古典诗歌机器写作模型[MixPoet](http://nlp.csai.tsinghua.edu.cn/news/)开源
- 【2020-9-21】文本生成系列文章
  - [文本生成12：4种融合知识的text generation](https://zhuanlan.zhihu.com/p/133266258)
  - [文本生成13：万字长文梳理文本生成评价指标](https://zhuanlan.zhihu.com/p/144182853)

# 文本生成方案

生成一段对话回复的模型可以简单分为三类：
- （1）`规则模板`。典型的技术就是AIML语言。这种回复实际上需要人为设定规则模板，对用户输入进行回复。
  - 优点：1、实现简单，无需大量标注数据；2、回复效果可控、稳定。
  - 不足：1、如果需要回复大量问题，则需要人工设定大量模板，人力工作量大；2、使用规则模板生成的回复较为单一，多样性低。
- （2）`生成模型`。主要用encoder-decoder结构生成回复。典型技术是`Seq2Seq`、`transformer`。
  - 优点：无需规则，能自动从已有对话文本中学习如何生成文本。
  - 不足：1、生成效果不可控，训练好的模型更像是一个“黑盒”，也无法干预模型的生成效果；2、倾向生成万能回复，如“好的”、“哈哈”等，所以多样性与相关性低。
- （3）`检索模型`。利用文本检索与排序技术从问答库中挑选合适的回复。
  - 优点：由于数据来源于已经生成好的回复，或是从已抓取的数据得到的回复，所以语句通顺性高，万能回复少；
  - 不足：1.不能生成新的回复文本，只能从问答库中得到文本进行回复；2.当检索或排序时，可能只停留在表面的语义相关性，难以捕捉真实含义。

总结如下：

|方法流派|思路|示例|优点|缺点|备注|
|---|---|---|---|---|---|
|规则模板|人为设定规则模板|`AIML`语言|①简单，无须标注②稳定可控|①人力消耗大②回复单一，多样性欠缺|-|
|生成模型|用encoder-decoder结构生成回复|`Seq2Seq`、`transformer`|无须规则，自动生成|①效果不可控②万能回复（安全回复）③多样性低④一致性不足|-|
|检索模型|文本检索与排序技术从问答库中挑选合适的回复|IR|①语句通顺②可控|①不能生成回复②表面相关，难以捕捉语义信息|-|
|混合模型|综合生成和检索方案|度秘|-|-|-|

# Seq2seq方向

- 参考资料
  - [对话生成：seq2seq模型原理及优化](https://zhuanlan.zhihu.com/p/69159062)

## seq2seq简介

- 闲聊型任务，主要用seq2seq方案生成闲聊型机器人。
  - 基本结构：
  ![](https://upload-images.jianshu.io/upload_images/8111720-0333b20ef2d480ac.png)
  ![](https://upload-images.jianshu.io/upload_images/18270108-0ef3be8fe90ca2c1.jpg)

  - `Encoder`：seq2seq的编码器是单层或多层的RNN（双向），对输入的文本编码成一个向量输出。
  - `Decoder`：seq2seq的解码器，也是单层或多层的RNN（非双向），然后根据context信息对每一步进行解码，输出对应的文本。
  - context，最简单的方法是直接拿encoder的最后一个状态，或整个状态进行加总，得到一个固定的向量。
    - 问题：context是固定长度的向量，表达能力比较有限，所以引入了Attention机制。
  - Attention机制：每步解码都会根据当前状态对encoder的文本进行动态权重计算，进行归一化。再算出一个当前加权后的context，作为decoder的context。表达能力更强。
![](https://upload-images.jianshu.io/upload_images/18270108-591c3820b8cf0408.jpg)
  - 损失函数：对每一步的单词计算一个交叉熵，然后把它给加起来，最后得到一个损失函数
  ![](https://upload-images.jianshu.io/upload_images/18270108-1e6b47670b57080d.jpg)
  - 优化算法：
    - 贪心搜索：每一步搜索都取概率最大的分支，容易陷入局部最优解。比如，可能当前一步的概率很大，但后面的概率都很小，这样搜索出来的文本就不是全局的最优解。但如果对整个空间进行搜索，可能搜索空间太大，无法全部搜索。
    - Beam Search：采取折中的办法，每次搜索只保留最优的k条路径，搜索结果优于贪心搜索，因为每一步并非按最大的去选一个；时间复杂度也可以根据对“K”的设置进行控制；（如下图：每次搜索只保留最优的2条路径）
![](https://upload-images.jianshu.io/upload_images/18270108-ae24c57e7b299c97.jpg)
    - Beam Search可能会产生的问题是：可能都是十分相近的句子。如：当用户说“我喜欢打篮球”，搜索出来的结果可能是“我也是。”“我也是！”“我也是……”只有标点符号不同，这样多样性依然很低。

## seq2seq问题

- 普通seq2seq可能出现如下问题，导致用户体验差或者对话上下文不够连贯。
  - 负面情感的回复
  - 疑问句式的回复
  - 回复的多样性较低
  - 一致性低

  - 上下文逻辑冲突；背景有关的一些信息，比如年龄其实不可控；
  - 安全回复居多，对话过程显得很无聊。
    - 训练时用到的数据都是人类的对话语料，往往充斥着已知和未知的背景信息，使得对话成为一个"一对多"的问题，比如问年龄和聊天气，回答包括不同的人针对同样的问题产生的不同的回复。
    - 但是神经网络无论多复杂，它始终是一个一一映射的函数。
    - <font color='blue'>最大似然只能学到所有语料的共通点，所有背景，独特语境都可能被模型认为是噪音，这样会让模型去学习那些最简单出现频率高的句子</font>，比如"是的"之类的回复，我们称之为**安全回复**。
  - 对话语料的局限性
    - 对话语料只是冰山的一角，实际上对话语料中潜藏着很多个人属性、生活常识、知识背景、价值观/态度、对话场景、情绪装填、意图等信息，这些潜藏的信息没有出现在语料，建模它们是十分困难的。

![](https://upload-images.jianshu.io/upload_images/18270108-9c904095e3c94f58.png)

## 改进方法


### 控制主题、属性

- （1）`Copy机制`
  - 最初用于解决OOV问题
  - ACL2017的《Get To The Point:  Summarization with Pointer-Generator Networks》，借鉴point network模型
  - 思路：单词可以有两种来源：一种是通过普通seq2seq生成；另一种是从原文本拷贝过来。
  ![](https://upload-images.jianshu.io/upload_images/18270108-8e6535933eb010d4.jpg)
  - 实现：将每步输出的单词概率看作一个混合模型（生成的单词概率分布与拷贝原文的单词概率分布的混合），利用注意力得分作为拷贝单词的概率
  ![](https://upload-images.jianshu.io/upload_images/18270108-66da872064bbc67f.jpg?imageMogr2/auto-orient/strip|imageView2/2/w/715/format/webp)
  - 效果：回答的相关性和流畅性更高
    - 问：“我老家是湖南的”
    - 答：我也是 → 我也是湖南的
- （2）`主题控制`
  - 解决的问题：普通的seq2seq生成的内容，其实没有办法把控生成的语义信息
  - 思路：通过增加关键词信息，用关键词去影响生成回复的语义（主题）
    - 思路一：用关键词作为硬约束——<font color='blue'>一定出现</font>
      - ACL 2016的《Sequence toBackward and Forward Sequences: A Content-Introducing Approach to GenerativeShort-Text Conversation》
      - 步骤：
        - 利用互信息进行预测，即取与问题互信息最大的词作为关键词。
        - 生成回复：分两步：生成包含关键词的前半句话 → 生成后半句话；
        ![](https://upload-images.jianshu.io/upload_images/18270108-8374dac99e9e7768.jpg)
      - 不足：预测的单词不准，或者在对话中出现较少时，上下句可能衔接不够流畅。
    - 思路二：用关键词作为软约束——<font color='blue'>不一定出现</font>
      - Emnlp 2016的《Towards implicit content-introducing for generative short-textconversation systems》。
      - 假设关键词在生成文本中不一定会出现，只作为额外信息输入到网络里；设计cue word gru单元，将关键词信息加入到每一步的状态更新；
    - 思路三：用关键词同时约束主题与情感
      - Emnlp 2018《A Syntactically Constrained Bidirectional-Asynchronous Approach for Emotional Conversation Generation》
      ![](https://upload-images.jianshu.io/upload_images/18270108-8bdb50b960dc2dae.jpg)
      - 先预测情感关键词与主题关键词，再生成文本
- （3）`属性控制`
  - 避免出现负面情感或疑问句式的回应
  - 思路：学习到文本的属性信息（句式、情感信息），控制生成文本风格，使生成的回复更为可控
    - 思路一：直接融合属性信息
      - 输入的文本除了encoder的信息，还包括属性embedding的信息
    - 思路二：用条件变分编码器
      - Generating Informative Responses with Controlled Sentence Function
      - 条件变分编码器的网络结构去控制回复的句式，使模型生成一些更有信息量的回复
      - 约束中间隐变量z，使z更多地去编码句式属性的信息

### `多样性`
- （4）改进Beam Search——提高回复多样性
  - 思路一：通过增加惩罚项
    - 如对同一组的第二、第三选项进行降权，从而避免每次搜索结果都来自于同一路径。对于权重的选择，可以通过强化学习得到；也可以通过设置参数、调整参数来得到
    ![](https://upload-images.jianshu.io/upload_images/18270108-9e78b6aba844eefa.jpg)
  - 思路二：计算每条路径的概率分
    - 如果后面生成的话跟第一组相似，就对该组进行降权，避免组与组之间相似度过高
    ![](https://upload-images.jianshu.io/upload_images/18270108-9f21116b3d55bbb7.jpg)

### 实验对比

模型对比
- 普通seq2seq存在生成回复相关性不够高、生成回复为否定句或负面情感的问题。
- Copy机制+seq2seq：提高了回复相关性，但依然无法解决回复为否定句或负面情感的问题。
- 主题控制+seq2seq：既提高回复相关性，也可以控制回复语义，提升回复效果，但可能出现回复不通顺的问题，并存在否定句式与负面回复。
- 属性控制+seq2seq：比较能满足场景需要，但有一定比例的通用回复，可以通过改进Beam Search、后排序的办法来提高个性化回复的得分，从而提高回复多样性。
![](https://upload-images.jianshu.io/upload_images/18270108-f827dd6a328c6334.png)

总结：
- 属性控制模型能有效提升回复质量

![](https://upload-images.jianshu.io/upload_images/18270108-e317e526462d7295.png)

## 知识融合的文本生成

- [文本生成12：4种融合知识的text generation](https://zhuanlan.zhihu.com/p/133266258)
- 刘知远：“NLP搞事情少不了知识指导”
  - ![](https://picb.zhimg.com/80/v2-3541affc2700d15d09952fc3c7d9513b_720w.jpg)
- 对融合知识的idea做了一个简单的汇总，大致有4个较为典型的方式：
  - 多任务学习（生成+文本蕴含）
  - 基于knowledge graph 的文本生成：图神经网络参与文本生成
    - 从长文本构建graph，然后辅助生成文本
    - 语义图or三元组的文本生成，graph to text 就是原本的任务
  - 基于memory network 的文本生成
    - 以memory network 形式储存ConceptNet知识
  - 结合分布-采样进行文本生成
    - 从带有“知识”的分布采样生成文本


# GAN方向

## GAN家族

- [GAN工作原理Web演示](https://poloclub.github.io/ganlab/)
- [一文看懂GAN演进图谱](https://zhuanlan.zhihu.com/p/70033932)
- [GAN家族：对抗网络 （RankGAN + GAN家族总结）](https://blog.csdn.net/dukuku5038/article/details/85318615)

![](https://static001.geekbang.org/wechat/images/f0/f0b6aa5e59f9f9f503512d65b4d8adb2.png)

- [AutoEncoder演进图谱](https://www.infoq.cn/article/DWRM4QCmRLuzAzp2HvGd)

![](https://static001.geekbang.org/wechat/images/ac/aca437a44985fc77a41556e8b8cdc527.jpeg)

## GAN文本生成

- GAN为什么在文本上效果不佳？
  - 图像和文本的核心区别在于图像的 Pixel 表示是连续的，而文本是由离散的 token 组成
  - 参数的微小改变不能对结果产生影响，或者说影响的方向也不对，这就导致 Discriminator 的梯度回传变得没有意义
- [GAN-in-NLP-Notes](https://tobiaslee.top/2018/04/22/GAN-in-NLP-Notes/)

- （1） SeqGAN
  - SeqGAN 用了 RL + GAN 用于文本生成，一大创举，详见[笔记](http://tobiaslee.top/2018/03/11/SeqGAN/)
    - SeqGAN_Sequence Generative Adversarial Nets with Policy Gradient
    - 引入强化学习中的 Policy Gradient 来解决因为离散 token 生成前采样动作造成的不可微
    - SeqGAN 在 Oracle 和古诗生成任务上做了测试，回过头来看，效果只能说一般。但其开创性的将文本生成看做序列决策问题， 并且将 RL 和 GAN 进行了有机的结合
    ![](https://tobiaslee.top/img/seqgan.png)
- （2）LeakGAN
  - 交大继 SeqGAN 后的又一力作
  - SeqGAN的问题：
    - Discriminator 提供给 Generator 的 reward 需要等句子完成之后才能被计算（即使用 Monte Carlo 来计算，也只是一种近似的模拟），对于每一步的 token 生成不能得到及时的反馈；
    -  Reward 本身只是一个 Scalar，并不能携带太多的信息。何况对于文本这种结构复杂，同样的意思不同的说法都是可以的，那么数值所包含的指导信号比较弱。
  - 改进
    - 让 Discriminator 向 Generator “泄露”一些消息，也就是把作为 Discriminator 的 CNN 最后一层的 Feature Vector 交给 Generator，让这个 Feature Vector 携带大量的信息来指导 Generator 更好的生成
    - 层次生成器：在生成器端使用了 Manager 和 Worker 两个模块，分别用于解析 CNN 提供的 Feature Vector 和具体的 token 生成。
- （3）RankGAN
  - Discriminator 的 Binary Classification 不足以生成多样、符合现实逻辑的文本
  - 用一个 Ranker 来替代 Discriminator，以提供更好地生成句子的评估，进而生帮助 Generator 生成更为真实的句子
- （4）MaskGAN
  - 从生成器端来为生成提供更多的信息，更多：[MaskGAN学习笔记](http://tobiaslee.top/2018/04/01/MaskGAN-Notes/)
  - 用了 Actor-Critic 来替换 Policy Gradient，相比 Monte Carlo，能够较好地对 reward function 做一个拟合


# 评价方法

- NLG常用metrics：
  - BLEU: ngram precision；长度类似
  - ROUGE: ngram recall
  - NIST/CIDEr: 降低频繁词的权重
  - METEOR: 考虑同义词的F score；鼓励连续词匹配
  - STM: 匹配语法树子树
  - TER: 编辑的距离
  - TERp: TER+同义替换

- 参考：
  - [文本生成13：万字长文梳理文本生成评价指标](https://zhuanlan.zhihu.com/p/144182853)
  - [文本生成评价方法](https://zhuanlan.zhihu.com/p/108630305)

- 总结：

|方法|全称|应用场景|核心思想|特点|缺点|改进|备注|
|---|---|---|---|---|---|---|---|
|BLEU|Machine Translation|比较候选译文和参考译文里的 n-gram 的重合程度|n-gram共现统计;基于精确率|只看重精确率，不看重召回率；存在常用词干扰（可以用截断的方法解决）；短句得分较高。即使引入了brevity penalty，也还是不够。|截断：改进常用词干扰；brevity penalty：改进短句得分较高的问题||
|NIST|National Institute of standards and Technology|BLEU改进|引入了每个n-gram的信息量(information)，对于一些出现少的重点的词权重就给的大了 |||||
|METEOR|Metric for Evaluation of Translation with Explicit ORdering，显式排序的翻译评估指标|Machine Translation、Image Caption|解决一些 BLEU 标准中固有的缺陷|unigram共现统计；基于F值；考虑同义词、词干|只有java实现；参数较多，4个自己设置；需要外部知识源，比如：WordNet|||
|ROUGE|Recall-Oriented Understudy for Gisting Evaluation，面向召回率的摘要评估辅助工具|Text Summarization|BLEU 的改进版，专注于召回率而非精度。多少个参考译句中的 n 元词组出现在了输出之中。大致分为四种：ROUGE-N，ROUGE-L，ROUGE-W，ROUGE-S|n-gram共现统计、最长公共子序列；基于召回率(ROUGE-N)和F值(ROUGE-L)|基于字的对应而非基于语义，可以通过增加参考摘要数量来缓解|ROUGE-S：统计skip n-gram而非n-gram；ROUGE-W：考虑加权的最长公共子序列||
|Perplexity|困惑度|Machine Translation、Language Model|根据句子长度对语言模型得分进行Normalize|基于语言模型（我感觉其实也是n-gram）；困惑度越低，翻译质量越好|数据集越大，困惑度下降得越快；数据中的标点会对模型的PPL产生很大影响；常用词干扰|||
|CIDEr|Consensus-based Image Description Evaluation，基于共识的图像描述评估|Image Caption|TF-IDF向量的夹角余弦度量相似度|TF-IDF；余弦相似度|与ROUGE一样，也只是基于字词的对应而非语义的对应|||
|SPICE|Semantic Propositional Image Caption Evaluation，语义命题图像标题评估|Image Caption|||主要考察名词的相似度，不适合机器翻译|||
|||||||||



## BLEU

- BLEU：Bilingual Evaluation Understudy，双语评估辅助工具
- 核心思想
  - 比较候选译文和参考译文里的 n-gram 的重合程度，重合程度越高就认为译文质量越高。unigram用于衡量单词翻译的**精确性**，高阶n-gram用于衡量句子翻译的**流畅性**。 实践中，通常是取N=1~4，然后对进行加权平均。
- 主要特点
  - n-gram共现统计
  - 基于精确率
- 计算公式
  - ![](https://www.zhihu.com/equation?tex=BLEU+%3D+BP+%5Ccdot+exp%28%5Csum_%5Climits%7Bn%3D1%7D%5EN+w_n+log%5C%2C+p_n+%29)
  - 其中n表示n-gram，Wn表示n-gram的权重；
  - BP表示短句子惩罚因子（brevity penaty），用 r 表示最短的参考翻译的长度， c 表示候选翻译的长度，则BP具体计算方法为：![](https://www.zhihu.com/equation?tex=%5Cbegin%7Bequation%7D+BP+%3D++++++%5Cbegin%7Bcases%7D++++++++++1+%26c%3Er%5C+++++++++e%5E%7B1-r%2Fc%7D+%26c%E2%89%A4r+++++%5Cend%7Bcases%7D+%5Cend%7Bequation%7D)
  - pn表示n-gram的覆盖率，具体计算方式为：
    - ![](https://www.zhihu.com/equation?tex=p_n+%3D+%5Cfrac+++++%7B+++++++++%5Csum_%5Climits%7BC%5Cin+%5C%7BCandidates%5C%7D%7D+++++%5Csum_%5Climits%7Bn-gram%5Cin+C%7D+++++Count_%7Bclip%7D%28n-gram%29+++++%7D+++++%7B+++++++++%5Csum_%5Climits%7BC%27%5Cin+%5C%7BCandidates%5C%7D%7D+++++%5Csum_%5Climits%7Bn-gram%5Cin+C%27%7D+++++Count%28n-gram%29+++++%7D)
- 应用场景：Machine Translation
- 总结
  - 缺点：
    - 只看重精确率，不看重召回率。（详细得说：待补充～） 
    - 存在常用词干扰（可以用截断的方法解决）
    - 短句得分较高。即使引入了brevity penalty，也还是不够。
  - 改进
    - 截断：改进常用词干扰
    - brevity penalty：改进短句得分较高的问题


## ROUGE

- Recall-Oriented Understudy for Gisting Evaluation，面向召回率的摘要评估辅助工具

- 核心思想
  - 大致分为四种：ROUGE-N，ROUGE-L，ROUGE-W，ROUGE-S。常用的是前两种（-N与-L）
    - ROUGE-N （将BLEU的精确率优化为召回率） 
    - ROUGE-L （将BLEU的n-gram优化为公共子序列） 
    - ROUGE-W （将ROUGE-L的连续匹配给予更高的奖励） 
    - ROUGE-S （允许n-gram出现跳词(skip)）
  - ROUGE-N中的“N”指的是N-gram，其计算方式与BLEU类似，只是BLEU基于精确率，而ROUGE基于召回率。
  - ROUGE-L中的“L”指的是Longest Common Subsequence，计算的是候选摘要与参考摘要的最长公共子序列长度，长度越长，得分越高，基于F值。
  - ROUGE 用作机器翻译评价指标的初衷：
    - SMT（统计机器翻译）时代，机器翻译效果稀烂，需要同时评价翻译的准确度和流畅度；
    - 等到 NMT （神经网络机器翻译）时代，神经网络脑补能力极强，翻译出的结果都是通顺的，但是有时候容易瞎翻译。
  - ROUGE的出现很大程度上是为了解决**NMT的漏翻问题（低召回率）**。
  - 所以 <font color='red'>ROUGE 只适合评价 NMT，而不适用于 SMT，因为它不管候选译文流不流畅</font>
- 计算公式
  - 主要介绍ROUGE-N和ROUGE-L（见原文）
- 主要特点
  - n-gram共现统计、最长公共子序列
  - 基于召回率(ROUGE-N)和F值(ROUGE-L)
- 应用场景
  - Text Summarization
- 缺点
  - ROUGE是基于字的对应而非基于语义的对应，不过可以通过增加参考摘要的数量来缓解这一问题。
- 改进
  - ROUGE-S：统计skip n-gram而非n-gram
  - ROUGE-W：考虑加权的最长公共子序列


## METEOR

- Metric for Evaluation of Translation with Explicit ORdering，显式排序的翻译评估指标
- 核心思想
  - METEOR 是基于BLEU进行了一些改进，其目的是解决一些 BLEU 标准中固有的缺陷 。使用 WordNet 计算特定的序列匹配，同义词，词根和词缀，释义之间的匹配关系，改善了BLEU的效果，使其跟人工判别共更强的相关性。并且，是基于F值的。
- 计算公式
  - ![](https://www.zhihu.com/equation?tex=METEOR+%3D+%281-pen%29%5Ctimes+F_%7Bmeans%7D)
- 主要特点
  - unigram共现统计
  - 基于F值
  - 考虑同义词、词干
- 应用场景
  - Machine Translation、Image Caption
- 缺点
  - 只有Java实现。
  - 参数较多，有四个需要自己设置的参数。
  - 需要外部知识源，比如：WordNet，如果是WordNet中没有的语言，则无法用METEOR评测。

## NIST

- NIST(National Institute of standards and Technology)方法是在BLEU方法上的一种改进。
  - [机器翻译评测——BLEU改进后的NIST算法](https://www.cnblogs.com/by-dream/p/7765345.html)
- 最主要的是引入了每个n-gram的信息量(information) 的概念。BLEU算法只是单纯的将n-gram的数目加起来，而nist是在得到信息量累加起来再除以整个译文的n-gram片段数目。这样相当于对于一些出现少的重点的词权重就给的大了。
- 信息量的计算公式是：
  - ![](https://pic4.zhimg.com/80/v2-32ecf29b6114e3f0a98709f4847eacde_720w.png)
- 解释一下：分母是n元词在参考译文中出现的次数，分子是对应的n-1元词在参考译文中的出现次数。对于一元词汇，分子的取值就是整个参考译文的长度。这里之所以这样算，应该是考虑到出现次数少的就是重点词这样的一个思路。
- 计算信息量之后，就可以对每一个共现n元词乘以它的信息量权重，再进行加权求平均得出最后的评分结果：
  - ![](https://pic2.zhimg.com/80/v2-1144e90bc10ce76487f680021e632e93_720w.png)

## 4. Perplexity

困惑度

- 核心思想
  - （1）根据参考句子，学习一个语言模型P； 
  - （2）根据语言模型P，计算候选句子的得分； 
  - （3）根据句子长度对上述得分进行Normalize
- 计算公式
  - ![](https://www.zhihu.com/equation?tex=PPL%28W%29+%3D+P%28w_1w_2...w_N%29%5E%7B%5Cfrac%7B1%7D%7BN%7D%7D)
- 主要特点
  - 基于语言模型（我感觉其实也是n-gram）
  - 困惑度越低，翻译质量越好
- 应用场景
  - Machine Translation、Language Model
- 缺点
  - 数据集越大，困惑度下降得越快
  - 数据中的标点会对模型的PPL产生很大影响
  - 常用词干扰

## CIDEr

- Consensus-based Image Description Evaluation，基于共识的图像描述评估
- 核心思想
  - 把每个句子看成文档，然后计算其 TF-IDF 向量（注意向量的每个维度表示的是n-gram 而不一定是单词）的余弦夹角，据此得到候选句子和参考句子的相似度。
- 计算公式
  - ![](https://www.zhihu.com/equation?tex=CIDEr_n%28c%2C+S%29+%3D+%5Cfrac+%7B1%7D+%7BM%7D+%5Csum%5Climits_%7Bi%3D1%7D%5E%7BM%7D+%5Cfrac+%7Bg%5En%28c%29+%5Ccdot+g%5En%28S_i%29%7D+%7B%7C%7Cg%5En%28c%29%7C%7C+%5Ctimes+%7C%7Cg%5En%28S_i%29%7C%7C%7D)
  - 其中， c 表示候选标题， S 表示参考标题集合， n 表示评估的是n-gram， M 表示参考字幕的数量， Gn() 表示基于n-gram的TF-IDF向量。
- 主要特点
  - TF-IDF
  - 余弦相似度
- 应用场景
  - Image Caption
- 缺点
  - 与ROUGE一样，也只是基于字词的对应而非语义的对应

## SPICE

- Semantic Propositional Image Caption Evaluation，语义命题图像标题评估
- 核心思想
  - SPICE 使用基于图的语义表示来编码 caption 中的 objects, attributes 和 relationships。它先将待评价 caption 和参考 captions 用 Probabilistic Context-Free Grammar (PCFG) dependency parser parse 成 syntactic dependencies trees，然后用基于规则的方法把 dependency tree 映射成 scene graphs。最后计算待评价的 caption 中 objects, attributes 和 relationships 的 F-score 值。
- 计算公式
- 主要特点
  - 使用基于图的语义表示
- 应用场景
  - Image Caption
- 缺点
  - 由于在评估的时候主要考察名词的相似度，因此不适合用于机器翻译等任务。

# 资料

- 更多[Demo地址](http://wqw547243068.github.io/demo)
- 【2020-8-27】[E2Echallenge参赛模型汇总](https://blog.csdn.net/u012328476/article/details/108144226)

# 结束


