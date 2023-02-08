---
layout: post
title:  "文本生成&评价-Text Generation and Evaluation"
date:   2020-04-28 21:39:00
categories: 自然语言处理
tags: 深度学习 NLP GAN Seq2seq 对话系统 文本评价 BLEU 多模态 好未来 paraphrase 复述 gpt VAE vae 扩散 chatgpt
excerpt: 深度学习在NLP子领域——文本生成的应用汇总，如seq2seq、GAN系列
author: 鹤啸九天
mathjax: true
permalink: /text-generation
---

* content
{:toc}

# 总结

- 【2022-7-16】[腾讯刘天宇：可控、可靠的数据到文本生成技术](https://www.toutiao.com/article/7120933821176037888), 聚焦data2text 任务
- 【2021-7-14】[WAIC 2021-好未来副总裁吴中勤：多模态机器学习与自动生成技术](https://www.toutiao.com/i6984303337013363212/)，好未来集团技术副总裁吴中勤发表主题演讲《多模态机器学习及大规模自动生成技术：算法框架、行业实践》，介绍了多模态深度学习以及大规模自动生成技术在教育领域的实践与应用，并介绍了好未来 AI 研究院的最新研究成果及成功案例。
  - 多模态整个技术研究方向包括以下：
  - `表征`，多个模态联合去做事物或者语义的联合表征；
  - `转换`，在模态之间实现转换，例如输入文字出现画面，输入声音出现文字；
  - `融合`，在做单模态识别之后做后端融合，把整个模态在分类阶段、工作阶段加以融合；
  - `对齐`，比如一段文字、一个视频，怎么把其中物体和关系做对应；此外还包括模态之间的协同。
  - [img](https://p1-tt.byteimg.com/origin/pgc-image/e0b83a3aaacf4296931db87706437308?from=pc)
  - ![](https://p1-tt.byteimg.com/origin/pgc-image/e0b83a3aaacf4296931db87706437308?from=pc)
  - GodEye 这套教学辅助系统，基于多模态深度学习理念打造的，可以针对课堂当中老师和学生各类行为进行智能识别，通过辅助授课老师在授课中视频片段、关键行为去定位老师和学生在课堂中的交互，最后提升学习效果。
  - 一个小时之内可生成几十万道题，针对个性化去生成针对性的题目，生成题目速度超越人类千倍、万倍，生成题目也具有多样性和广泛性，而且随着学生的使用量越来越大，年限越来越强，学生都在一点点的进步。除了生成题目，该模型还能生成作文
  - ![](https://p3-tt.byteimg.com/origin/pgc-image/35d0314282ac4edc9359836325677a04?from=pc)
- 【2021-3-27】【可控的神经网络文本生成】《[Controllable Neural Text Generation](https://lilianweng.github.io/lil-log/2021/01/02/controllable-neural-text-generation.html)》by Lilian Weng 
- 【2021-3-26】【用于生成阅读理解问题的NLP系统】'question_generator - An NLP system for generating reading comprehension questions' by Adam Montgomerie [GitHub](https://github.com/AMontgomerie/question_generator)
- 【2020-7-6】清华孙茂松：九歌多样化古典诗歌机器写作模型[MixPoet](http://nlp.csai.tsinghua.edu.cn/news/)开源
- 【2020-9-21】文本生成系列文章
  - [文本生成12：4种融合知识的text generation](https://zhuanlan.zhihu.com/p/133266258)
  - [文本生成13：万字长文梳理文本生成评价指标](https://zhuanlan.zhihu.com/p/144182853)
- 【2021-1-4】[data2text](https://zhuanlan.zhihu.com/p/82054729)，【2021-3-29】解读[文本生成2：Data-to-text Generation with Entity Modeling](https://zhuanlan.zhihu.com/p/82054729), [论文](https://arxiv.org/abs/1906.03221)，[代码](https://github.com/ratishsp/data2text-entity-py)
- 【2021-1-4】题目自动生成[data2text](https://zhuanlan.zhihu.com/p/82054729)
  - 应用点是业务方设计题目时，不用再费劲编写题目，只需设置知识点，系统根据知识点+问题类型生成候选题目，业务方验证通过即可
- 【2021-3-29】文本风格迁移综述，[一文超详细讲解文本风格迁移](https://zhuanlan.zhihu.com/p/159039652)
  - ![](https://pic2.zhimg.com/80/v2-da58494400a380027e47ff97af6b97fd_1440w.jpg)

# 文本生成

文本生成（Text Generation）是自然语言处理（Natural Language Processing，NLP）领域的一项重要且具有挑战的任务。

文本生成任务目的是生成近似于自然语言的文本序列，但仍可以根据输入数据进行分类。比如
- 输入结构化数据的 Data-to-text Generation
- 输入图片的 Image Caption
- 输入视频的 Video Summarization
- 输入音频的 Speech Recognition 等。

文本生成文本的 Text-to-Text 任务，具体地包括神经机器翻译、智能问答、生成式文本摘要等。

随着深度学习的发展，众多新兴技术已被**文本生成**任务所采用。比如
- 为了解决文本生成中的长期依赖、超纲词（Out-of-Vocabulary，OOV）问题，注意力机制（Attention Mechanism），拷贝机制（Copy Mechanism）等应运而出；
- 网络结构上使用了循环神经网络（Recurrent Neural Networks），卷积神经网络（Convolutional Neural Networks），图神经网络（Graph Neural Networks），Transformer 等。
- 为了顺应“**预训练**-**精调**”范式的兴起，在海量语料上自监督地训练出的大体量**预训练语言模型**（Pre-trained Language Model；PLM），也被广泛应用在文本生成任务中。


## 方法总结

【2022-9-7】[智能化自动生成文本总结的方法](https://www.toutiao.com/article/7110470206492901899)
- （1）从原文中**抽取句子**组成文本总结
- （2）用**文本生成模型**来生成文本总结
- （3）**抽取**与**生成**相结合的方法
- （4）将**预训练模型**用于总结的生成

【2023-2-3】[基于知识的NLG综述](https://zhuanlan.zhihu.com/p/600247215)
- 校设实验室向细或向空，公司实验室向大。校设实验室逐渐向大模型靠拢。由于训练资源不足，大量校设实验室将集中于prompt可解释性、即插即用方法、内部知识整合。训练资源尤其稀缺的校设实验室将集中在非常偏的任务。公司实验室会开始大模型竞争，RLHF的不同方向和规模将成为第一波low-fruit，外部知识整合会是第二波low-fruit。公司实验室的方法和参数保密性将进一步提升。公司实验室对系统架构和高效训练的人才的需求将迅速攀升。
- 小任务整合入大任务。大量小任务会并入大任务，构造有监督数据集并微调不再是小任务的第一选择。大模型无法取得好结果的小任务将成为研究热点。换句话说，研究热点将从“大模型能做到什么”转换为“大模型做不到什么”。
- 知识的挖掘和自监督学习成为NLP最前沿方向。大量基于RLHF的自监督基于知识的生成方法将被大实验室提出并实践，成果将大量发表在顶会。主流热点将主要focus在知识的数量、质量以及运用知识的方法。统计方法几乎完全取代规则方法，知识的地位将快速超越模型本身。这一浪潮将迅速影响到CV，今年必定有更多基于RLHF的CV方法发表于CV三大会。
- 资本变向，算法岗地位下降。资本将变向涌入大模型方向，未来数年会保持较高热度。公司将合并大量业务，竞争训练大模型以抢占市场。大数据工程师、后端工程师、架构师的地位提高，算法工程师地位进一步下降。

ChatGPT无非就是微调的GPT-3，唯一的不同不过是知识的**指向性**，或者说模型对特定知识的筛选。
- GPT-3是用大量无指向性的非结构化文本训练的，而ChatGPT是在GPT-3的基础上用大量RLHF自监督的文本微调的。
- 换句话说，**知识才是ChatGPT优于GPT-3的关键**。GPT-3的知识没有任何标签，因此本质是一个无监督学习；而ChatGPT使用RLHF生成符合人类指令要求的知识，因此本质是一个自监督学习。有了RLHF提供的监督信号，两个模型学习知识的质量就完全不同了。实验证明，使用质量高的知识，可以将GPT-3的模型规模压缩100倍。绕来绕去，NLG最后还是知识起了决定性作用。

### 生成模型概览

【2023-2-3】[2022生成模型进展有多快？新论文盘点9类生成模型代表作](https://www.toutiao.com/article/7193210190974714371)
- 参考[ChatGPT 持续创造历史记录：AIGC，人工智能的旷世之作](https://www.toutiao.com/article/7196594313236251196)
- ![img](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/1122923c43d243f4aed78b7b533d66e2~noop.image?_iz=58558&from=article.pc_detail&x-expires=1676258271&x-signature=V3RsD1OVm3OdiEmWzloCJy3o%2Fho%3D)
- 2014年，变分自动编码，VAE
- 2014年，生成对抗网络，GAN
- 2015年，基于流的生成模型，Flow-based models
- 2015年，扩散模型，Diffusion Model
- 2017年，Transformer模型
- 2020年，神经辐射场，Neural Radiance Field
- 2021年，CLIP（Contrastive Language-Image PreTraining模型）

ChatGPT的出现，彻底将生成AI推向爆发。但AI生成模型可不止 ChatGPT 一个，光是基于**文本输入**的就有7种：图像、视频、代码、3D模型、音频、文本、科学知识 ……

尤其2022年，效果好的AI生成模型层出不穷，又以 `OpenAI`、`Meta`、`DeepMind` 和 `谷歌` 等为核心，发了不少达到SOTA的模型。
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/7bf81e9821d44f828056b045ddab2fb3~noop.image?_iz=58558&from=article.pc_detail&x-expires=1675989263&x-signature=DYEyfQtpUfb0IyuUzfwhp2PQp%2Fg%3D)
- `OpenAI`: DALL-E 2、ChatGPT、Jukebox、Whisper
- `Google`: Imagen、Muse、DreamFusion、Phenaki、Minerva、AudioLM、LaMDA
- `DeepMind`: Flamingo、AlphaCode、Alphatensor、GATO
  - Alpha系列：AlphaCode、AlphaGo、AlphaFold
- `Meta`: PEER、Speech From Brain、Galactica
- `runway`: Stable Diffusion、Soundfly
- `Nvidia`: Magic 3D

AIGC预训练模型一览
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/11cb1660d4b04155910b5d4a625ababc~noop.image?_iz=58558&from=article.pc_detail&x-expires=1676258271&x-signature=rO%2FReI3%2FXscbMOm%2B2TEZKr2LLn4%3D)

论文对2022年新出现的主流生成模型进行了年终盘点
- [ChatGPT is not all you need](https://arxiv.org/abs/2301.04655), [twiiter](https://twitter.com/1littlecoder/status/1615352215090384899)
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/7ae4ac40a3a84173ab52b5f2196fea14~noop.image?_iz=58558&from=article.pc_detail&x-expires=1675989263&x-signature=YRO2H1gdIfvBvmOPDX7Cxc6VPgg%3D)

AI生成模型分成了9大类 详见[原文](https://www.toutiao.com/article/7193210190974714371)
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/a3d62347f83247f9906a379cabe57853~noop.image?_iz=58558&from=article.pc_detail&x-expires=1675989263&x-signature=ZDQPfUcGn5FvVrRVieY098WuEeE%3D)
- Text-to-Text: ChatGPT3、LaMDA、PEE、Speech From Brain
  - ChatGPT由OpenAI生成，是一个对话生成AI，懂得回答问题、拒绝不正当的问题请求并质疑不正确的问题前提，基于Transformer打造。它用人类打造的对话数据集、以及InstructGPT数据集的对话格式进行训练，此外也可以生成代码和进行简单数学运算。
  - LaMDA基于Transformer打造，利用了其在文本中呈现的长程依赖关系能力。其具有1370亿参数，在1.56T的公共对话数据集和网页文本上进行训练，只有0.001%的训练数据被用于微调，这也是它效果好的原因之一。
  - PEER由Meta AI打造，基于维基百科编辑历史进行训练，直到模型掌握完整的写作流程。具体来说，模型允许将写作任务分解成更多子任务，并允许人类随时干预，引导模型写出人类想要的作品。
  - Speech from Brain由Meta AI打造，用于帮助无法通过语音、打字或手势进行交流的人，通过对比学习训练wave2vec 2.0自监督模型，基于非侵入式脑机接口发出的脑电波进行解读，并解码大脑生成的内容，从而合成对应语音。
- Text-to-Code: Codex、AlphaCode
  - Codex是OpenAI打造的编程模型，基于GPT-3微调，可以基于文本需求生成代码。首先模型会将问题分解成更简单的编程问题，随后从现有代码（包含库、API等）中找到对应的解决方案，基于GitHub数据进行训练。
  - AlphaCode由DeepMind打造，基于Transformer模型打造，通过采用GitHub中715.1GB的代码进行预训练，并从Codeforces中引入一个数据集进行微调，随后基于Codecontests数据集进行模型验证，并进一步改善了模型输出性能。
- Text-to-Image: DALL-E 2、Stable Diffusion、Imagen、Muse
  - DALL·E2是来自OpenAI的生成模型，在零样本学习上做出大突破。与DALL·E一样，两点依旧是CLIP模型，除了训练数据庞大，CLIP基于Transformer对图像块建模，并采用对比学习训练，最终帮助DALL·E2取得了不错的生成效果。
  - Imagen来自谷歌，基于Transformer模型搭建，其中语言模型在纯文本数据集上进行了预训练。Imagen增加了语言模型参数量，发现效果比提升扩散模型参数量更好。
  - Stable Diffusion由慕尼黑大学的CompVis小组开发，基于潜在扩散模型打造，这个扩散模型可以通过在潜表示空间中迭代去噪以生成图像，并将结果解码成完整图像。
  - Muse由谷歌开发，基于Transformer模型取得了比扩散模型更好的结果，只有900M参数，但在推理时间上比Stable Diffusion1.4版本快3倍，比Imagen-3B和Parti-3B快10倍。
- Text-to-Audio: AudioLM、Whisper、Jukebox
  - AudioLM由谷歌开发，将输入音频映射到一系列离散标记中，并将音频生成转换成语言建模任务，学会基于提示词产生自然连贯的音色。在人类评估中，认为它是人类语音的占51.2%、与合成语音比率接近，说明合成效果接近真人。
  - Jukebox由OpenAI开发的音乐模型，可生成带有唱词的音乐。通过分层VQ-VAE体系将音频压缩到离散空间中，损失函数被设计为保留最大量信息，用于解决AI难以学习音频中的高级特征的问题。不过目前模型仍然局限于英语。
  - Whisper由OpenAI开发，实现了多语言语音识别、翻译和语言识别，目前模型已经开源并可以用pip安装。模型基于68万小时标记音频数据训练，包括录音、扬声器、语音音频等，确保由人而非AI生成。
- Text-to-Video: Phenaki、Soundify
  - Phenaki由谷歌打造，基于新的编解码器架构C-ViViT将视频压缩为离散嵌入，能够在时空两个维度上压缩视频，在时间上保持自回归的同时，还能自回归生成任意长度的视频
  - Soundify是Runway开发的一个系统，目的是将声音效果与视频进行匹配，即制作音效。具体包括分类、同步和混合三个模块，首先模型通过对声音进行分类，将效果与视频匹配，随后将效果与每一帧进行比较，插入对应的音效。
- Text-to-3D: Dreamfusion、Magic 3D
  - 没有把OpenAI的Point·E统计进去，可能是生成效果上没有达到SOTA
  - DreamFusion由谷歌和UC伯克利开发，基于预训练文本-2D图像扩散模型实现文本生成3D模型。采用类似NeRF的三维场景参数化定义映射，无需任何3D数据或修改扩散模型，就能实现文本生成3D图像的效果。
  - Magic3D由英伟达开发，旨在缩短DreamFusion图像生成时间、同时提升生成质量。具体来说，Magic3D可以在40分钟内创建高质量3D网格模型，比DreamFusion快2倍，同时实现了更高分辨率，并在人类评估中以61.7%的比率超过DreamFusion。
- Text-to-Science: Galactica、Minerva
  - Galatica是Meta AI推出的1200亿参数论文写作辅助模型，又被称之为“写论文的Copilot模型”，目的是帮助人们快速总结并从新增论文中得到新结论，在包括生成文本、数学公式、代码、化学式和蛋白质序列等任务上取得了不错的效果，然而一度因为内容生成不可靠被迫下架。
  - Minerva由谷歌开发，目的是通过逐步推理解决数学定量问题，可以主动生成相关公式、常数和涉及数值计算的解决方案，也能生成LaTeX、MathJax等公式，而不需要借助计算器来得到最终数学答案。
- Image-to-Text: Flamingo、VisualGPT
  - Flamingo是DeepMind推出的小样本学习模型，基于可以分析视觉场景的视觉模型和执行基本推理的大语言模型打造，其中大语言模型基于文本数据集训练。输入带有图像或视频的问题后，模型会自动输出一段文本作为回答。
  - VisualGPT是OpenAI制作的图像-文本模型，基于预训练GPT-2提出了一种新的注意力机制，来衔接不同模态之间的语义差异，无需大量图像-文本数据训练，就能提升文本生成效率。
- Other Models: AlphaTensor、AlphaFold、GATO、Human Motion Diffusion Model
  - AlphaTensor由DeepMind开发，懂得自己改进矩阵乘法并提升计算速度，不仅改进了目前最优的4×4矩阵解法，也提升了70多种不同大小矩阵的计算速度，基于“棋类AI”AlphaZero打造，其中棋盘代表要解决的乘法问题，下棋步骤代表解决问题的步骤。
  - GATO由DeepMind开发，基于强化学习教会大模型完成600多个不同的任务，包含离散控制如Atari小游戏、推箱子游戏，以及连续控制如机器人、机械臂，还有NLP对话和视觉生成等，进一步加速了通用人工智能的进度。
  - PhysDiff是英伟达推出的人体运动生成扩散模型，进一步解决了AI人体生成中漂浮、脚滑或穿模等问题，教会AI模仿使用物理模拟器生成的运行模型，并在大规模人体运动数据集上达到了最先进的效果。
- 除了谷歌LaMDA和Muse以外，所有模型均为2022年发布。
  - 谷歌LaMDA虽然是2021年发布的，但在2022年又爆火了一波；
  - Muse则是2023年刚发布的，但论文声称自己在图像生成性能上达到SOTA，因此也统计了进去。
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/0796479323fd4f75914bd65906eb2af3~noop.image?_iz=58558&from=article.pc_detail&x-expires=1675989263&x-signature=gz99QiqjLcQ2VpXaqvf%2BsKkPwoY%3D)

### （1） 从原文中**抽取句子**组成文本总结

- ① TextRank：使用句子间相似度，构造无向有权边。使用边上的权值迭代更新节点值，最后选取 N 个得分最高的节点，作为摘要。其基本思想来源于谷歌的 PageRank算法，不需要事先对多篇文档进行学习训练, 因其简洁有效而得到广泛应用。
- ② 编码+聚类/分类: 通过Bert，transformer或wor2vec方式进行编码，得到句子级别的向量表示。再用聚类的方式或分类模型来提取出关键句子。对于聚类可用 K-Means聚类和 Mean-Shift 聚类等进行句子聚类，得到 N 个类别。最后从每个类别中，选择距离质心最近的句子，得到 N 个句子，组合成最终摘要。对于分类，可以选择合适的分类模型进行分类，其标签获取往往是选取原文中与标准摘要计算 ROUGE 得分最高的一句话加入候选集合，接着继续从原文中进行选择，保证选出的摘要集合 ROUGE 得分增加，直至无法满足该条件。得到的候选摘要集合对应的句子设为 1 标签，其余为 0 标签。
- 抽取式的方法发展较早，技术相对成熟，效果稳定。摘要中所有的语句均来自于源文，逻辑合理，语句通顺。其缺点在于可能会引入冗余信息或缺失关键信息，组成的文本连贯性较差。在实际应用中可将此方法用于辅助人工分析。尤其是在较长的文本中，可提取出关键句子，让人抓住重点。

### （2）用**文本生成模型**来生成文本总结

- 1. Seq2Seq+Attention 模型
  - Seq2Seq模型简单概括就是拼接两个RNN系（RNN，LSTM等）的模型，分别称为模型的Encoder部分和Decoder部分。Encoder部分负责输入文本语义的编码，生成一个“浓缩输入语义”的语义空间meaning space。Decoder部分负责根据这个语义空间及每个time-step的Decoder输出，进行Attention机制并生成句子，从而实现在语义背景下从句子到句子的直接转换（Sequence to Sequence）。
  - 不足之处在于：无法生成训练时未出现（OOV）的词，只能生成词汇表中的词；会产生错误的事实，句子的可读性较差；文本自我重复，即聚焦于某些公共Attention很大的单词；长文本摘要生成难度较大。
- 2. Pointer-Generator（指针生成器网络）
  - 该方法在基于注意力机制的Seq2Seq基础上增加了 Copy 和 Coverage 机制，缓解未登录词问题（OOV）和生成重复的问题。
  - PGN架构的核心思想: 对于每一个解码器的时间步, 计算一个生成概率p_gen = [0, 1]之间的实数值, 相当于一个权值参数. 用这个概率调节两种选择的取舍, 要么从词汇表生成一个单词, 要么从原文本复制一个单词。
  - ①. 使用指针生成器网络(pointer-generator network)，通过指针从原文中拷贝词，这种方式可以在正确复述原文信息的同时，也能使用生成器生成一些新的词。
  - ②. 使用覆盖率(coverage) 机制，追踪哪些信息已经在摘要中了，通过这种方式以期避免生成具有重复片段的摘要。
  - 不足在于：概括的内容可能并非源文本的核心内容；生成的摘要都是相近的词或片段概括，没有更高层次的压缩概括；语句通畅性降低。
  - ![](https://p3-sign.toutiaoimg.com/tos-cn-i-0022/f032ede80be342db930db99361fb9337~tplv-obj:1352:666.image?from=post&x-expires=1677859200&x-signature=2hvX%2BJx5qU2QQRqkKA1ReGJJYwY%3D)
- 相比于抽取式，生成式的摘要更加灵活，强大，可以更好的引入外部知识。然而，生成过程往往缺少关键信息的控制和指导，无法很好地定位关键词语，难以生成流畅性的句子。

### （3）**抽取**与**生成**相结合的方法

考虑到抽取式和生成式各自的优缺点，目前很多研究已经将二者结合：用抽取的方式选择重要内容，基于重要内容指导生成网络的训练对内容进行改写。
1. Bottom-Up
  - Bottom-Up使用数据有效的内容选择器去确定应该作为摘要一部分的源文档中的短语。将此选择器用作自下而上的注意力步骤，以将模型约束成可能的短语。使用这种方法提高了压缩文本的能力，同时仍能生成流畅的摘要。
2. SPACES
  - SPACES以抽取出的关键句作为输入来生成新的总结、摘要文本。首先对文本进行分句，然后构建句子索引，并通过transformer对句子进行编码。然后在编码后的句子向量的基础上用DGCNN训练一个关键句分类的模型，判断每个句子是否为关键句。标签是通过一种自动的方式生成的，根据标准的总结，在原文中进行相似度计算，相似度较高的句子视为关键句其标签为1，否则为0。生成模型就是一个Seq2Seq模型，以抽取模型的输出结果作为输入、人工标注的总结作为标签进行训练，得到摘要生成模型。
3. Fast-RL
  - Fast-RL是基于强化学习的任务，首先使用抽取器agent选择重要的句子或突出显示的内容。然后使用生成器网络重写每一个被抽取的句子。抽取器利用分层神经模型来学习文档的句子表示，并利用“选择网络”根据其表示提取句子。使用时域卷积模型来计算文档中每个单独句子的表示形式。为了进一步结合文档的全局上下文并捕获句子之间的长期语义依赖关系，将双向LSTM-RNN应用于卷积的输出。基于抽取器提取的句子，添加另一个LSTM-RNN来训练Pointer Network，以循环抽取句子。
- 抽取+生成的结合形式有很多，融合了抽取式和生成式的优点，生成的文本内容逻辑清晰，语句的连贯性更强，有很大的研究价值和改进空间。

### （4）将**预训练模型**用于总结的生成

- 目前基于预训练模型进行下游任务微调的方法发展很快，迁移性很强，可以应用在多种下游任务上，在文本的总结上也有不错的效果。
- 1. 基于BART
  - BART的训练主要由2个步骤组成：(1)使用任意噪声函数破坏文本。(2）模型学习重建原始文本。BART 使用基于 Transformer 的标准神经机器翻译架构，可视为BERT、GPT等预训练模型的泛化形式。通过随机打乱原始句子的顺序，再使用文本填充方法(即用单个 mask token 替换文本片段)能够获取最优性能。BART 尤其擅长处理文本生成任务，同时在自然语言理解任务中的表现也是可圈可点。
- 2. 基于CPT
  - CPT是在BART的基础上，提出兼顾自然语言理解（NLU）和自然语言生成（NLG）的模型结构。CPT的具体结构可以看作一个输入，多个输出的非对称结构，主要包括三个部分:（1）S-Enc (Shared Encoder)：共享Encoder，双向attention结构，建模输入文本。（2）U-Dec (Understanding Decoder)：理解用Decoder，双向attention结构，输入S-Enc得到的表示，输出MLM的结果。为模型增强理解任务。（3）G-Dec (Generation Decoder)：生成用Decoder，正如BART中的Decoder模块，利用encoder-decoder attention与S-Enc相连，用于生成。
- 3. 基于PEGASUS
  - 在 PEGASUS 中，将源文档中的“重要句子”删除或者遮蔽，再利用剩余的句子在输出中生成这些被删除或遮蔽的句子。这是一种基于间隙句子(gap-sentences)生成的序列-序列模型自监督的预训练目标，以适配Transformer-based的encoder-decoder模型在海量文本语料上预训练。由间隔句生成（GSG）和掩码语言模型（MLM）相结合，对于低资源任务数据集，通过微调PEGASUS模型，可以在广泛的领域实现良好的抽象摘要效果。
- 预训练模型可以应用在文本生成，文本分类，机器翻译等下游任务上

## 常见分类

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

【2020-10-22】[大众点评信息流基于文本生成的创意优化实践](https://tech.meituan.com/2019/03/14/information-flow-creative-optimization-practices.html)：文本生成的三种主流方法各自的优劣势：
- **规划式**：根据结构化的信息，通过语法规则、树形规则等方式规划生成进文本中，可以抽象为三个阶段。宏观规划解决“说什么内容”，微观规划解决“怎么说”，包括语法句子粒度的规划，以及最后的表层优化对结果进行微调。其优势是控制力极强、准确率较高，特别适合新闻播报等模版化场景。而劣势是很难做到端到端的优化，损失信息上限也不高。
- **抽取式**：顾名思义，在原文信息中抽取一部分作为输出。可以通过编码端的表征在解码端转化为多种不同的分类任务，来实现端到端的优化。其优势在于：能降低复杂度，较好控制与原文的相关性。而劣势在于：容易受原文的束缚，泛化能力不强。
- **生成式**：通过编码端的表征，在解码端完成序列生成的任务，可以实现完全的端到端优化，可以完成多模态的任务。其在泛化能力上具有压倒性优势，但劣势是控制难度极大，建模复杂度也很高。

![](https://p0.meituan.net/travelcube/c64908b07137477135f9b7aa2927daea170277.png)

## 常见数据集

文本生成数据集，把它建模成一个**条件概率**的分布P(y\|x)。y是一个数据描述文本，x是各种各样不同形式的数据，可以是统计数据、键值表格，也可以是三元组（多见于知识图谱），或是逻辑表达。
- ![](https://p9.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/505a919b67b14092a4d12bfb5f3d741a?from=pc)
- 左边是一个**NBA比赛赛事**的描述，包括两个队的得分，以及球员的一些技术统计，基于这些数据产生的赛事播报，这是一个常见的应用。
- 中间是一个**键值对**表格，取的是维基百科里对**人物介绍**的一个数据集，在学术界用得比较多，工业界也会尝试去应用。
- 右边是一个比较新的数据集，提供了数据结构化数据，并规定了**逻辑表达式**。我们根据给定的逻辑表达式产生对应的描述。

【2022-7-16】[腾讯刘天宇：可控、可靠的数据到文本生成技术](https://www.toutiao.com/article/7120933821176037888), 聚焦data2text任务

### 可控文本生成数据集

可控文本生成相关数据集
- StylePTB：细粒度文本风格迁移基准数据集：https://github.com/lvyiwei1/StylePTB/
- SongNet：格式可控的宋词生成任务：https://github.com/lipiji/SongNet
- GPT-2 Output：可用于构造可控文本生成数据集的大体量语料库：https://github.com/openai/gpt-2-output-dataset
- Inverse Prompting：公开领域的诗文生成，公开领域的长篇幅问答数据集：https://github.com/THUDM/iPrompt
- GYAFC (Grammarly’s Yahoo Answers Formality Corpus)：雅虎问答形式迁移语料库：https://github.com/raosudha89/GYAFC-corpus

## 生成模型

生成模型是什么？
- 从一批样本数据 $X$ 中学习分布 $p(X)$ ，这样就能学习到样本外的数据。用这个分布 $p(X)$ 就能随意采样，获得新的生成结果
- 然而，这样的分布 $p(X)$ 无法直接获取，只能通过一个隐变量 $Z$ 来生成 $X$, 假设 $Z$ 服从正态分布，随便取一个 $Z$，用 $Z$ 和 $X$ 的关系计算 $p(X)$ 。
- 公式：$p(X)=\sum_{Z} p(X \mid Z) p(Z)$
- $p(X \mid Z)$ 是后验分布，$p(Z)$ 是先验分布 

### 模型结构总结

文本生成模型的结构常来自于人类撰写文本的启发。此处按照模型结构的特征，将主流文本生成模型分为如下几种：
- ![](https://p7.itc.cn/images01/20210929/85d71f6ec568447ab9d650db27bdf4f6.png)
- ![](https://p2.itc.cn/images01/20210929/3707637d242b4507888879729d0f45f1.png)

#### Encoder-Decoder Framework

“编码器-解码器框架”首先使用 encoder 编码文本，再使用 decoder 基于原文编码和部分解码输出，自回归地解码（Autoregressively Decoding）出文本。这类似于，人类首先理解素材（源文本、图片、视频等），然后基于对原文的理解和已写出的内容，逐字地撰写出文本。也是目前序列到序列任务中应用最广泛的框架结构。

#### Auto-regressive Language Model

标准的 left-to-right 的单向语言模型，也可以根据前文序列逐字地解码出文本序列，这种依赖于前文语境来建模未来状态的解码过程，叫做自回归解码（Auto-regressive Decoding）。不同于编码器-解码器框架”使用 encoder 编码源文本，用 decoder 编码已预测的部分序列，AR LM 用同一个模型编码源文本和已解码的部分序列。

#### Hierarchical Encoder-Decoder

对于文本素材，人类会先理解单个句子，再理解整篇文本。在撰写文本的过程中，也需要先构思句子的大概方向，再逐字地撰写出内容。这类模型往往需要一个层次编码器对源文本进行 intra-sentence 和 inter-sentence 的编码，对应地进行层次 sentence-level 和 token-level 的解码。在 RNN 时代，层次模型分别建模来局部和全局有不同粒度的信息，往往能够带来性能提升，而 Transformer 和预训练语言模型的时代，全连接的 Self-Attention 弱化了这种优势。

#### Knowledge-Enriched Model

知识增强的文本生成模型，引入了外部知识，因此除了针对源文本的文本编码器外，往往还需要针对外部知识的知识编码器。知识编码器的选择可以依据外部知识的数据结构，引入知识图谱、图片、文本作为外部知识时可以对应地选用图神经网络、卷积神经网络、预训练语言模型等。融合源文本编码与知识编码时，也可以考虑注意力机制，指针生成器网络（Pointer-Generator-Network），记忆网络（Memory Networks）等。

#### Write-then-Edit Framework

考虑到人工撰写稿件尚不能一次成文，那么文本生成可能同样需要有“修订”的过程。人工修订稿件时，需要基于原始素材和草稿撰写终稿，模型也需要根据源文本和解码出的草稿重新进行编解码。这种考虑了原文和草稿的模型能够产生更加合理的文本内容。当然也会增加计算需求，同时生成效率也会打折扣。

### 原理解读

【2022-12-17】[通俗形象地分析比较生成模型（GAN/VAE/Flow/Diffusion/AR）](https://zhuanlan.zhihu.com/p/591881660)
- 演讲ppt：[Deep Generative Models for Text-to-Speech Synthesis](https://www.microsoft.com/en-us/research/uploads/prod/2022/12/Generative-Models-for-TTS.pdf)

通俗解释各类生成模型，如`自回归模型`Autoregressive Model (`AR`)，`生成对抗网络`Generative Adversarial Network (`GAN`)，`标准化流模型`Normalizing Flow (`Flow`)，`变分自编码器`Variational Auto-Encoder (`VAE`)，`去噪扩散模型`Denoising Diffusion Probablistic Model (`Diffusion`)等等。

生成模型的数据生成过程是将一个先验分布的采样点 Z 变换成数据分布的采样点 X 的过程。下图可以清楚地看到各个模型是如何将采样点Z映射到数据X的
- ![](https://pic3.zhimg.com/80/v2-bf8426f8f6dc625763eed684c7acc55a_1440w.webp)

从Z映射到X的过程，比喻为过河。河的左岸是Z，右岸是X，过河就是乘船从左岸码头到达右岸码头。船可以理解为**生成模型**，码头的位置可以理解为样本点Z或者X在分布空间的位置。不同的生成模型有不同的过河的方法
- ![](https://pic4.zhimg.com/80/v2-12cadb3169e9d6be644d6436c4c15e0b_1440w.webp)

各种过河方式
1. `GAN`
  - 从先验分布随机采样一个Z，即在左岸随便找一个码头，直接通过对抗损失的方式强制引导船开到右岸，要求右岸下船的码头和真实数据点在分布层面上比较接近。
2. `VAE`
  - 1）VAE在过河的时候，不是强制把河左岸的一个随机点拉到河右岸，而是考虑右岸的数据到达河左岸会落在什么样的码头。如果知道右岸数据到达左岸大概落在哪些码头，直接从这些码头出发就可以顺利回到右岸了。
  - 2）由于VAE编码器的输出是一个`高斯分布`的**均值**和**方差**，一个右岸的样本数据X到达河左岸的码头位置不是一个固定点，而是一个高斯分布，这个高斯分布在训练时会和一个先验分布（一般是标准高斯分布）接近。
  - 3）在数据生成时，从先验分布采样出来的Z也大概符合右岸过来的这几个码头位置，通过VAE解码器回到河右岸时，大概能到达真实数据分布所在的码头。
3. `Flow`
  - 1）Flow的过河方式和VAE有点类似，也是先看看河右岸数据到河左岸能落在哪些码头，在生成数据的时候从这些码头出发，就比较容易能到达河右岸。
  - 2）和VAE不同的是，对于一个从河右岸码头出发的数据，通过Flow到达河左岸的码头是<span style='color:blue'>一个固定的位置，并不是一个分布</span>。而且往返的船开着双程航线，来时从什么右岸码头到达左岸码头经过什么路线，回去时就从这个左岸码头经过这个路线到达这个右岸码头，是**完全可逆**的。
  - 3）Flow需要约束数据到达河左岸码头的位置服从一个先验分布（一般是标准高斯分布），这样在数据生成的时候方便从先验分布里采样码头的位置，能比较好的到达河右岸。
4. `Diffusion`
  - 1）Diffusion也借鉴了类似VAE和Flow的过河思想，要想到达河右岸，先看看数据从河右岸去到左岸会在哪个码头下船，然后就从这个码头上船，准能到达河右岸的码头。
  - 2）但是和Flow以及VAE不同的是，Diffusion不只看从右岸过来的时候在哪个码头下船，还看在河中央经过了哪些**桥墩**或者**浮标点**。这样从河左岸到河右岸的时候，也要一步一步打卡之前来时经过的这些浮标点，能更好约束往返的航线，确保到达河右岸的码头位置符合真实数据分布。
  - 3）Diffusion从河右岸过来的<span style='color:blue'>航线不是可学习的，而是人工设计的</span>，能保证到达河左岸的码头位置，虽然有些随机性，但是符合一个先验分布（一般是高斯分布），这样在生成数据的时候选择左岸出发的码头位置。
  - 4）因为训练模型的时候要求一步步打卡来时经过的浮标，在生成数据的时候，基本上也能遵守这些潜在的浮标位置，一步步打卡到达右岸码头。
  - 5）如果觉得开到河右岸一步步这样打卡浮标有点繁琐，影响船的行进速度，可以选择一次打卡跨好几个浮标，就能加速船行速度，这就对应diffusion的加速采样过程。
5. `AR`
  - 1）可以类比Diffusion模型，将AR生成过程看成中间的一个个**浮标**。从河右岸到达河左岸的过程就好比**自回归分解**，将一步步拆解成中间的浮标，这个过程也是不用学习的。
  - 2）河左岸的码头可以看成自回归生成的第一个START token。AR模型河左岸码头的位置是确定的，就是START token对应的embedding。
  - 3）在训练过程中，自回归模型也一个个对齐了浮标，所以在生成的时候也能一步步打卡浮标去到河右岸。
  - 4）和Diffusion不同的是，自回归模型要想加速，跳过某些浮标，就没有那么容易了，除非重新训练一个semi-autoregressive的模型，一次生成多个token跨过多个浮标。
  - 5）和Diffusion类似的是，在训练过程中都使用了teacher-forcing的方式，以当前步的ground-truth浮标位置为出发点，预测下一个浮标位置，这也降低了学习的难度，所以通常来讲，自回归模型和Diffusion模型训练起来都比较容易。


## VAE：Variational AutoEncoder

VAE和GAN一样，都是从隐变量 Z 生成目标数据 X 。
- 假设**隐变量**服从某种常见的**概率分布**（比如`正态分布`）
- 然后希望训练一个模型$X=g(Z)$，将原来的概率分布映射到训练集的概率分布，也就是**分布变换**。
- 注意，<span style='color=red'>VAE和GAN的本质都是**概率分布**的映射</span>。
- ![img](https://pic4.zhimg.com/80/v2-c542a560b9c83f6a41ca8dc6c4775a63_1440w.jpg)
- 先用某种分布随机生成一组隐变量，然后这个隐变量会经过一个生成器生成一组目标数据。VAE和GAN都希望这组数据的分布 $\hat{X}$ 和目标分布 $X$ <span style='color=blue'>尽量接近</span>

然而这种方法本质上难以奏效，因为“尽量接近”并没有一个确定的关于 $X$ 和 $\hat{X}$ 的相似度的评判标准。
- 难在必须去猜测“<span style='color=blue'>它们的分布相等吗</span>”这个问题，而缺少真正interpretable的价值判断。KL散度y不行，因为KL散度是针对两个已知的概率分布求相似度的，而 $\hat{X}$ 和 $X$ 的概率分布目前都是未知。

GAN直接把这个度量标准也学过来就行，相当生猛。但问题是依然不可解释（interpretable），非常不优雅。
- VAE的做法就优雅很多了，先来看VAE是怎么做的，理解了VAE以后再去理解Diffussion就很自然了。

### VAE核心 

VAE的核心：不仅假设 $p(Z)$ 是正态分布，而且假设每个 $p(X_k \mid Z)$  也是正态分布。
- ![](https://pic3.zhimg.com/80/v2-2d3bc38e5252d002fc03bba90a3d4ca2_1440w.jpg)
- 均值和方差的计算本质上都是encoder。VAE其实利用了两个encoder去分别学习均值和方差。
- $Z_k$ 是专属于（针对于）$X_k$  的隐变量，那么和 $\hat{X}_k$  本身就有对应关系，因此右边的蓝色方框内的“生成器”是一一对应的生成。

为什么VAE要在AE前面加一个Variational?
- 希望方差能够持续存在，从而带来噪声！

![](https://pic2.zhimg.com/80/v2-0a94951a280d38af6b69bbfb01ec701d_1440w.jpg)

VAE的本质：
- VAE在AE的基础上对均值的encoder添加**高斯噪声**（正态分布的随机采样），使得decoder（就是右边那个生成器）有噪声鲁棒性；为了防止噪声消失，将所有 p(Z \mid X) 趋近于标准正态分布，将encoder的均值尽量降为 0，而将方差尽量保持住。这样当decoder训练的不好的时候，整个体系就可以降低噪声；当decoder逐渐拟合的时候，就会增加噪声。
- 和GAN很像！VAE是**生成对抗encoder**

### Diffusion Model（扩散模型，DM）

【2022-9-20】[如何通俗理解扩散模型？](https://zhuanlan.zhihu.com/p/563543020)

本质上说，Diffusion就是VAE的升级版。
- ![](https://pic1.zhimg.com/80/v2-ccd746ab0863e621aba3f1a84885c3b8_1440w.jpg)

Diffusion本质就是借鉴了GAN这种训练目标单一的思路和VAE这种不需要判别器的隐变量变分的思路，糅合一下，起作用了

Diffusion的本质
- VAE和diffussion的区别
- ![](https://pic1.zhimg.com/80/v2-3c18778f37765c84fdd2c2be57ba3d20_1440w.jpg)
- VAE本质是一个基于**梯度**的 <span style='color=blue'>encoder-decoder架构</span>，encoder用来学**高斯分布**的均值和方差，decoder用**变分后验**来学习生成能力，而将标准高斯映射到数据样本是自己定义的。
- 而扩散模型本质是一个 <span style='color=blue'>SDE/Markov架构</span>，虽然也借鉴了神经网络的前向传播/反向传播概念，但是并不基于可微的梯度，属于数学层面上的创新。两者都定义了高斯分布 $Z$ 作为隐变量，但是VAE将 $Z$ 作为先验条件（变分先验），而diffusion将 $Z$ 作为类似于变分后验的**马尔可夫链的平稳分布**。


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

## 可控文本生成

【2021-9-29】[ICBU可控文本生成技术详解](https://www.sohu.com/a/492765825_612370) 

可控文本生成的目标是控制给定模型基于源文本产生特定属性的文本。
- 特定属性包括文本的`风格`、`主题`、`情感`、`格式`、`语法`、`长度`等。
- 根据源文本生成目标序列的文本生成任务，可以建模为 $ P(Target\|Sourse) $；
- 而考虑了控制信号的可控文本生成任务，则可以建模为 $ P(Target\|Sourse,ControlSignal) $ 。

目前可控文本生成已有大量的相关研究，比较有趣的研究有
- SongNet（Tencent）控制输出诗词歌赋的字数、平仄和押韵；
- StylePTB（CMU）按照控制信号改变句子的语法结构、单词形式、语义等；
- CTRL（Salesforce）在预训练阶段加入了 control codes 与 prompts 作为控制信号，影响文本的领域、主题、实体和风格。

### 可控文本生成技术的发展过程和趋势

发展过程
- 首先，在预训练语言模型的热度高涨之前，使用**解码策略**来控制文本属性的方案较为流行
  - 比如，引入多个判别器影响 Beam Search 中的似然得分的 L2W，以及改进解码采样策略的 Nucleur Sampling（2019）。
- 随着 GPT-2（2019）、T5（2019）的提出，使得**基于 Prompt** 来控制同一预训练语言模型来完成多种任务成为可能。
  - 因其能够更有效地利用模型在预训练阶段习得的知识，Prompting LM 的方式受到了学术界的重视，Prefix-Tuning（2021）等也推动基于 Prompt 的文本生成向前一步。
- 而针对于如何基于**预训练语言模型**做可控文本生成，学术界也一直往“低数据依赖、低算力需求、低时间消耗”方向上推进。
  - CTRL（2019）凭借海量数据和大体量结构成为文本生成领域的代表性模型；
  - PPLM （2019）则引入属性判别器，仅需精调小部分参数起到了“四两拨千斤”的效果；
  - 而 GeDi（2020） 为了解决 PPLM 多次反传导致的解码效率低下，直接在解码阶段加入属性判别器来控制解码输出；
  - CoCon（2021）同样仅精调插入 GPT-2 中的 CoCon 层来提高训练效率，并通过精巧的目标函数的设计来增强可控性能。


### 可控文本生成模型

可控文本生成模型等方案也多种多样，按进行可控的着手点和切入角度，将可控文本生成方案分为四类：
- `构造` Control Codes、`设计` Prompt、加入`解码策略`（Decoding Strategy），以及 `Write-then-Edit` 

详解
- `构造` Control Codes: 引入一些符号或文本作为条件，训练条件语言模型
- `设计` Prompt: 为预训练语言模型设计 Prompt 也能实现对 PLM 所执行文本任务的控制
- 加入`解码策略`（Decoding Strategy）: 在解码阶段使用采样策略，也能够采样出具有特定属性的文本
- `Write-then-Edit`: PPLM 引入属性判别模型来根据产生的草稿计算梯度并反向传播，基于更新后的隐含状态来产生最终文本序列

具体方法详见：[ICBU可控文本生成技术详解](https://www.sohu.com/a/492765825_612370) 


## 改进方法


### 控制主题、属性

【2023-1-12】可控文本生成

![img](https://p5.itc.cn/images01/20210929/6aa2076d9669476586c19a6f8d4b9b2d.png)

#### （1）`Copy机制`

最初用于解决OOV问题
- ACL2017的《Get To The Point:  Summarization with Pointer-Generator Networks》，借鉴point network模型

思路：
- 单词可以有两种来源：一种是通过普通seq2seq生成；另一种是从原文本拷贝过来。
![](https://upload-images.jianshu.io/upload_images/18270108-8e6535933eb010d4.jpg)

实现：
- 将每步输出的单词概率看作一个混合模型（生成的单词概率分布与拷贝原文的单词概率分布的混合），利用注意力得分作为拷贝单词的概率
- ![img](https://upload-images.jianshu.io/upload_images/18270108-66da872064bbc67f.jpg?imageMogr2/auto-orient/strip)

效果：
- 回答的相关性和流畅性更高
- 问：“我老家是湖南的”
- 答：我也是 → 我也是湖南的

#### （2）`主题控制`

解决的问题：
- 普通的seq2seq生成的内容，其实没有办法把控生成的语义信息

思路：
- 通过增加关键词信息，用关键词去影响生成回复的语义（主题）

- 思路一：用关键词作为**硬约束**——<font color='blue'>一定出现</font>
  - ACL 2016的《Sequence toBackward and Forward Sequences: A Content-Introducing Approach to GenerativeShort-Text Conversation》
  - 步骤：
    - 利用互信息进行预测，即取与问题互信息最大的词作为关键词。
    - 生成回复：分两步：生成包含关键词的前半句话 → 生成后半句话；
    - ![](https://upload-images.jianshu.io/upload_images/18270108-8374dac99e9e7768.jpg)
  - 不足：预测的单词不准，或者在对话中出现较少时，上下句可能衔接不够流畅。
- 思路二：用关键词作为**软约束**——<font color='blue'>不一定出现</font>
  - Emnlp 2016的《Towards implicit content-introducing for generative short-textconversation systems》。
  - 假设关键词在生成文本中不一定会出现，只作为额外信息输入到网络里；设计cue word gru单元，将关键词信息加入到每一步的状态更新；
- 思路三：用关键词同时约束主题与情感
  - Emnlp 2018《A Syntactically Constrained Bidirectional-Asynchronous Approach for Emotional Conversation Generation》
  - ![](https://upload-images.jianshu.io/upload_images/18270108-8bdb50b960dc2dae.jpg)
  - 先预测情感关键词与主题关键词，再生成文本

#### （3）`属性控制`

避免出现负面情感或疑问句式的回应

思路：
- 学习到文本的属性信息（句式、情感信息），控制生成文本风格，使生成的回复更为可控

- 思路一：直接融合属性信息
  - 输入的文本除了encoder的信息，还包括属性embedding的信息
- 思路二：用条件变分编码器
  - Generating Informative Responses with Controlled Sentence Function
  - 条件变分编码器的网络结构去控制回复的句式，使模型生成一些更有信息量的回复
  - 约束中间隐变量z，使z更多地去编码句式属性的信息

### 多样性

#### （4）改进Beam Search——提高回复多样性

- 思路一：通过增加惩罚项
  - 如对同一组的第二、第三选项进行降权，从而避免每次搜索结果都来自于同一路径。对于权重的选择，可以通过强化学习得到；也可以通过设置参数、调整参数来得到
  - ![](https://upload-images.jianshu.io/upload_images/18270108-9e78b6aba844eefa.jpg)
- 思路二：计算每条路径的概率分
  - 如果后面生成的话跟第一组相似，就对该组进行降权，避免组与组之间相似度过高
  - ![](https://upload-images.jianshu.io/upload_images/18270108-9f21116b3d55bbb7.jpg)

### 实验对比

模型对比
- 普通seq2seq存在生成回复相关性不够高、生成回复为否定句或负面情感的问题。
- Copy机制+seq2seq：提高了回复相关性，但依然无法解决回复为否定句或负面情感的问题。
- 主题控制+seq2seq：既提高回复相关性，也可以控制回复语义，提升回复效果，但可能出现回复不通顺的问题，并存在否定句式与负面回复。
- 属性控制+seq2seq：比较能满足场景需要，但有一定比例的通用回复，可以通过改进Beam Search、后排序的办法来提高个性化回复的得分，从而提高回复多样性。

![](https://upload-images.jianshu.io/upload_images/18270108-f827dd6a328c6334.png)

总结：
- 属性控制模型能有效提升回复质量
- ![](https://upload-images.jianshu.io/upload_images/18270108-e317e526462d7295.png)

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


# GAN

## GAN介绍

![GAN](https://p1.pstatp.com/large/pgc-image/99ece025696c4b9a9ed96a2f364a4d21)
- ![](https://p3-sign.toutiaoimg.com/pgc-image/99ece025696c4b9a9ed96a2f364a4d21~tplv-obj:1982:1006.image?from=post&x-expires=1677859200&x-signature=UOp4kjkox3HZnahTT8Se7HT6ktU%3D)
- ![](https://p3-sign.toutiaoimg.com/pgc-image/87711cd4b8714dcdb7772907d69f8606~tplv-obj:1754:1026.image?from=post&x-expires=1677859200&x-signature=6IOpdA4S%2FvfjbJysUZa2QAvaIlU%3D)

【2023-1-31】[从ChatGPT说起，AIGC生成模型如何演进](https://m.gelonghui.com/p/572090)

`GAN` 全称是： Generative A dversarial Networks，从名称不难读出“**对抗**（Adversarial）”是其成功之精髓。
- 对抗思想受`博弈论`启发，在训练`生成器`（Generator）时，训练一个`判别器`（Discriminator）来判断输入是**真实**图像还是**生成**图像，两者在一个极小极大游戏中相互博弈不断变强。当从随机噪声生成足以“骗”过的图像时，我们认为较好地拟合出了真实图像的数据分布，通过采样可以生成大量逼真的图像。

## GAN问题

GAN 问题
- 虽然GAN效果出众，但由于**博弈机制**的存在，其训练稳定性差且容易出现**模式崩溃**（Mode collapse），如何让模型平稳地达到博弈均衡点也是一个问题。
- GAN在“创作”这个点上还存在一个死结，这个结恰恰是其自身的核心特点：根据GAN基本架构，判别器要判断产生的图像是否和已经提供给判别器的其他图像是同一个类别的，这就决定了在最好的情况下，<span style='color:red'>输出图像是对现有作品的模仿，而不是创新</span>。

GAN的开创性在于精巧地设计了一种“自监督学习”方式，跳出了以往**监督学习需要大量标签数据**的应用困境，可以广泛应用于图像生成、风格迁移、AI艺术和黑白老照片上色修复。 

但其缺陷也正来源于这一开创性：
- 由于需要同步训练两个模型，GAN的**稳定性较差**，容易出现**模式崩溃**。
- 另一个有趣的现象“海奥维提卡现象”（the helvetica scenario）：如果G模型发现了一个能够骗过D模型的bug，它就会开始偷懒，一直用这张图片来欺骗D，导致整个平衡的无效。 (机器也像人一样可以偷懒)

【2023-1-31】[ChatGPT，背后的核心是什么？](https://36kr.com/p/2111870770153858?channel=copy_url)

## GAN家族

- [GAN工作原理Web演示](https://poloclub.github.io/ganlab/)
- [一文看懂GAN演进图谱](https://zhuanlan.zhihu.com/p/70033932)
- [GAN家族：对抗网络 （RankGAN + GAN家族总结）](https://blog.csdn.net/dukuku5038/article/details/85318615)

![](https://static001.geekbang.org/wechat/images/f0/f0b6aa5e59f9f9f503512d65b4d8adb2.png)

- [AutoEncoder演进图谱](https://www.infoq.cn/article/DWRM4QCmRLuzAzp2HvGd)

![](https://static001.geekbang.org/wechat/images/ac/aca437a44985fc77a41556e8b8cdc527.jpeg)

## GAN文本生成

- GAN为什么在文本上效果不佳？
  - 图像和文本的核心区别在于图像的 Pixel 表示是**连续**的，而文本是由**离散**的 token 组成
  - 参数的微小改变不能对结果产生影响，或者说影响的方向也不对，这就导致 Discriminator 的梯度回传变得没有意义
- GAN在NLP表现一般：
  - 语言不同于图像、语音，前者由人类制造，分布在**离散**空间中，后者天然存在于**连续**空间，结构化较好，所以，NLP中的embedding，**微小的改变不足以产生影响，甚至让反向传播失效** [img](https://p1.pstatp.com/large/pgc-image/87711cd4b8714dcdb7772907d69f8606)
  - ![](https://p1.pstatp.com/large/pgc-image/87711cd4b8714dcdb7772907d69f8606)
  - 思想：语言本身的离散特性，主谓宾结构，人类学习语言时也是这种模式，概念拼接组装置换

- [GAN-in-NLP-Notes](https://tobiaslee.top/2018/04/22/GAN-in-NLP-Notes/)

### （1） SeqGAN

- SeqGAN 用了 RL + GAN 用于文本生成，一大创举，详见[笔记](http://tobiaslee.top/2018/03/11/SeqGAN/)
- SeqGAN_Sequence Generative Adversarial Nets with Policy Gradient
- 引入强化学习中的 Policy Gradient 来解决因为离散 token 生成前采样动作造成的不可微
- SeqGAN 在 Oracle 和古诗生成任务上做了测试，回过头来看，效果只能说一般。但其开创性的将文本生成看做序列决策问题， 并且将 RL 和 GAN 进行了有机的结合
- ![](https://tobiaslee.top/img/seqgan.png)

### （2）LeakGAN

- 交大继 SeqGAN 后的又一力作
- SeqGAN的问题：
  - Discriminator 提供给 Generator 的 reward 需要等句子完成之后才能被计算（即使用 Monte Carlo 来计算，也只是一种近似的模拟），对于每一步的 token 生成不能得到及时的反馈；
  -  Reward 本身只是一个 Scalar，并不能携带太多的信息。何况对于文本这种结构复杂，同样的意思不同的说法都是可以的，那么数值所包含的指导信号比较弱。
- 改进
  - 让 Discriminator 向 Generator “泄露”一些消息，也就是把作为 Discriminator 的 CNN 最后一层的 Feature Vector 交给 Generator，让这个 Feature Vector 携带大量的信息来指导 Generator 更好的生成
  - 层次生成器：在生成器端使用了 Manager 和 Worker 两个模块，分别用于解析 CNN 提供的 Feature Vector 和具体的 token 生成。

### （3）RankGAN

- Discriminator 的 Binary Classification 不足以生成多样、符合现实逻辑的文本
- 用一个 Ranker 来替代 Discriminator，以提供更好地生成句子的评估，进而生帮助 Generator 生成更为真实的句子

### （4）MaskGAN

- 从生成器端来为生成提供更多的信息，更多：[MaskGAN学习笔记](http://tobiaslee.top/2018/04/01/MaskGAN-Notes/)
- 用了 Actor-Critic 来替换 Policy Gradient，相比 Monte Carlo，能够较好地对 reward function 做一个拟合


### GAN 文本生成图像

GAN可以文生图
- 【2023-1-14】[GAN之根据文本描述生成图像](https://zhuanlan.zhihu.com/p/32137121)

模型结构
- ![gan-text2image](https://pic1.zhimg.com/80/v2-5bda6b67eb0b2f2da55a5cda8afc3564_1440w.webp)
- 生成器：char-CNN-RNN结构来对文本做embedding，全连接层(Leaky-Relu激活)压缩到低维向量(128)，再和一个正态分布抽样的随机向量进行拼接，将其输入到deconvolution（反卷积）层做图像生成
- 判别器：结构与生成器大致相反
  - 实现的功能是：①判断生成的图像是否合理 ②判断图像与文本是否匹配
  - 候选方法：
    - ① 分阶段，先判断图像是否合理，然后再判断合理图像是否匹配
    - ②一部到位，同时判断图文，此时需要补充样本（除了<假图，描述>和<真图，描述>外，补充<真图，不匹配描述>，对应网络：GAN-CLS）
- 插值法学习：文生图本质是两种表示空间的映射，即高维流形，GAN里通过流形向量插值实现新样本生成，由于文本与图像的本质不同（离散+连续），需要特殊处理，通过线性插值做数据增强，对应网络：GAN-INT
- 风格转换：生成器里融合文本+图像信息，自动识别图像维度信息（如：背景+位置）

实验效果：测试在鸟类生成的效果
- 整体效果
  - ![](https://pic2.zhimg.com/80/v2-1581ac9c42735b5593ce59e28b4435bd_1440w.webp)
- 风格转换
  - ![](https://pic1.zhimg.com/80/v2-7c7b9880002fbdad57b3caa293f0635c_1440w.webp)
- 插值图像
  - ![](https://pic3.zhimg.com/80/v2-f68b38e4760fa1178e4c1abc2a8d6526_1440w.webp)

以上信息源自[2017年的文章](https://zhuanlan.zhihu.com/p/32137121)，现在估计有新的迭代了


# paraphrase 复述/同义语/改写

## 什么是paraphrase

**复述**（paraphrase）是指：
> “运用与原句不同的词汇、句式，重新写一个相同含义的句子。”

para的意思是“另外的”，phrase是“陈述”。所以国内有人翻译为“**复述**”。但中文含义不同，叫“同义语”更合适

文本复述研究的主要对象是‘**词语以上，句子以下**’的语言单元，不涉及到段落级的改写问题。

与文本相似相比，还需要考虑语义的相似性。比如：
- S1: 我吃了晚饭
- S2: 我吃了早饭
这两句话很像（文本相似），但意义却不一样，不能互为文本复述。

## 文本复述方法

常见的文本复述类型（英语）
- 同义词替换：短语替换成同义短语
- 定义替换：替换成词典中的注释
- 语态替换：主动 与 被动，相互替换
- 词性变换：动词、形容词等
- 语序变换：移动原文中某些成分的位置
- 结构变换：
- 断句变换：句子拆分与合并
- 基于推理的变换：结合背景知识才能识别、理解
- ![英文复述类型](https://img-blog.csdnimg.cn/20191016195842986.png)

## 英文复述

[如何改写（paraphrase）英文句子？](https://zhuanlan.zhihu.com/p/36789022)

示例：
- ① You should learn paraphrasing, for it is very important.
- ② Paraphrasing is extremely important, so it should be learned.

改动点：
- **单词**：very important → extremely
- **词序**：前后互换，（A，因为B）→ （B，所以A）
- **语法结构**：You should learn paraphrasing → it(paraphrasing) should be learned.
有哪些改写方法？
- 改单词：
  - a. 近义词替换：简单但有一定风险，单词在不同场合含义不同
  - b. 改词性：将原句中的某些单词改变词性，一般来说，改词性时也会改动词序
- 改词序
  - a. 主从句顺序：如果一个长句子有两个或以上的句子组成，可以通过调整句子的顺序来完成改写。
  - b. 形容词变从句：句子中如果有“形容词+名词”结构，可以将形容词改成一个从句，放在名词后面。
- 改语法结构
  - a. 改语态，如改句子的语态：主动改成被动，反之亦然。

## 中文复述

### 工程实现

- [中文复述代码](https://github.com/mlpod/chinese_pararphrase_generation), 使用训练好的**英文**文本复述模型进行复述，通过百度翻译API实现中文的输入和输出。英文文本复述模型可选择的有：tuner007/pegasus_paraphrase、ceshine/t5-paraphrase-quora-paws
  - Demo：[pair-a-phrase](http://pair-a-phrase.it/)
- [vsuthichai/paraphraser](https://github.com/vsuthichai/paraphraser)，基于Tensorflow的句子级复述生成，适合练手。

### 中文复述语料库

2019年9月30号，北大release了一批中文文本复述语料，[PKU Paraphrase Bank文章解读：句级中文文本复述语料库](https://blog.csdn.net/Tardigrade_/article/details/102585514)
- 常见的文本复述方法多依赖于有**孪生结构**的深度神经网络，对label的要求较高，这篇文章使用了无监督方法生成了大量的匹配label数据，对中文环境下的文本复述识别、生成很有帮助。
- [PKU Paraphrase Bank: A Sentence-Level Paraphrase Corpus for Chinese](https://link.springer.com/chapter/10.1007/978-3-030-32233-5_63)
- [语料库地址](https://github.com/pkucoli/PKU-Paraphrase-Bank)

数据来源
- 40部经典小说的95个译本，小说包括《基督山伯爵》《飘》《大卫科波菲尔》等。即每部小说选取2-3个译本。译本来源于网络。
- 这是很经典的枢轴（pivot）方法：采用同一文本（枢轴）的不同翻译作为文本复述模板的资源获取方法。
> “由于每次翻译过程均要求源语言和目标语言中文本的语义保持一致，因此可以预期最后得到的文本在语义上能跟输入文本保持一致。”

举个文章中的例子（上面两句互为文本复述，下面两句互为文本复述）：
- ![示例](https://img-blog.csdnimg.cn/20191016195713328.png)

数据规模
- 509,832 (50w+) 组句对，大约是常见语料库（例如：Twitter News URL Corpus) 的10倍以上。平均每句23.05个词。
 
无监督语料库生成方法
- ![流程](https://img-blog.csdnimg.cn/20191016172627666.png)
流程概览
- 首先，通过OCR工具将下载的pdf文件转换为plain text.
- 在格式清理的步骤中，需要将匹配用不到的头注，脚注，页码和注释等手动规则移除。
- 然后，通过。？！进行句子分割。少于6个单词的句子并入前句。
- 最后一步，利用Sun等人2011年提出的无监督方法[Enhancing Chinese word segmentation using unlabeled data](https://dl.acm.org/citation.cfm?id=2145538)进行中文分词。
评估方法：[多样性得分（PINC）](https://www.aclweb.org/anthology/P11-1020/),Chen等人2011年定义的，它的含义和BLEU相反：句对间n-gram的co-occurence/同时出现的次数越少，得分越高。这意味着，虽然这两个句子意思相同，但它们“看起来”更不一样。


# 评价方法

## 总结

【2021-3-25】文本生成评估方法综述：[Evaluation of Text Generation: A Survey](https://www.aminer.cn/pub/5ef9c12e91e011b84e1f8bfd/evaluation-of-text-generation-a-survey)
- (1) human-centric evaluation metrics：人工标注
- (2) unsupervised automatic metrics：无监督自动评估，如 ROUGE-N, BLEU-N, Distinct-N，METEOR,PYRAMID
- (3) machine-learned automatic metrics：机器学习自动评估，如 BERTScore、NLI model

![](https://p9.itc.cn/images01/20210929/9d48fa7b3bca4c4eada43218492fc205.png)

人工评价指标虽然灵活，不适合用于对海量样本评价。而无监督的自动评价指标，虽然能低成本地解决评测问题，但能够完成评价的角度甚少。“用模型来衡量模型”则是效率和灵活性之间的 trade-off。

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
  - 【精】[文本生成评价指标的进化与推翻](https://blog.csdn.net/hwaust2020/article/details/106997321/)

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
|||||||||
|||||||||


- 一个好的评价指标（或者设置合理的损失函数）不仅能够高效的指导模型拟合数据分布，还能够客观的让人评估文本生成模型的质量，从而进一步推动 text generation 商业化能力。
- 然而由于语言天生的复杂性和目前技术限制，我们目前还没有一个完美的评价指标。
- 微软在其VTTChallenge2016中提出了三点主观评价标准：
  - 1） **流畅度**：评价生成语句的逻辑和可读性。
  - 2） **相关性**：评价生成语句是否包含与原视频段相关和重要的物体/动作/事件等。
  - 3） **助盲性**：评价生成语句对一个实力有缺陷的人去理解其表示的视频片段到底有多大的帮助。
- 本文就三方面对文本生成的评价指标介绍：
  - （1）以 BLEU 为代表的基于统计的文本评价指标
  - （2）data to text 和 image caption 进一步介绍了其特有的评价模式
  - （3）基于 BERT 等预训练模型的文本评价指标
- 评价方法
  - （1）基于**词重叠率**的方法
    - 机器翻译 & 摘要 常用指标
    - 基于词重叠率的方法是指基于词汇的级别计算模型的生成文本和人工的参考文本之间的相似性，比较经典的代表有 BLEU、METEOR 和 ROUGE，其中 BLEU 和 METEOR 常用于机器翻译任务，ROUGE 常用于自动文本摘要。
  - （2）**词向量**评价指标
    - 上面的词重叠评价指标基本上都是 n-gram 方式，去计算生成响应和真是响应之间的重合程度，共现程度等指标。而词向量则是通过 Word2Vec、Sent2Vec 等方法将句子转换为向量表示，这样一个句子就被映射到一个低维空间，句向量在一定程度上表征了其含义，在通过余弦相似度等方法就可以计算两个句子之间的相似程度。
    - 使用词向量的好处是，可以一定程度上增加答案的多样性，因为这里大多采用词语相似度进行表征，相比词重叠中要求出现完全相同的词语，限制降低了很多。
- 总结
  - BLEU，ROUGE 等评价指标依然是主流的评价方式
  - 从短句惩罚、重复、重要信息缺失、多样化等方面，衍生出例如 METEOR、SPICE、Distinct 等评价指标
  - 以 bertscore 为代表的评价指标近年来受到广泛的关注，与人工评价的相关性也越来越高

- （1）基于词重合度的方法
  - 机器翻译 & 摘要 常用指标
      - BLEU：机器翻译
      - ROUGE：自动文本摘要
      - NIST
      - METEOR：机器翻译
      - TER
  - data to text 常用指标 [data2text](https://zhuanlan.zhihu.com/p/82054729)
    - 和翻译、摘要等生成式任务最大的不同是，input 是类似于 table 或者三元组等其他形式的数据。在评估生成结果时，需要考虑文本是否准确的涵盖了 data 的信息。《Challenges in Data-to-Document Generation》提供了许多 data to text 的评价指标，并且被后续的一些论文采用
    - relation generation (RG)
      - 从生成的句子中抽取出关系，然后对比有多少关系也出现在了 source 中（一般有 recall 和 count2 个指标）
    - content selection (CS)
      - data 当中的内容有多少出现在了生成的句子中，一般有 precision 和 recall 两个指标
    - content ordering (CO)
      - content ordering 使用归一化 Damerau-Levenshtein 距离计算生成句和参考句的 “sequence of records(个人认为可以理解为 item)”
    - 如何实现上述的评价指标——github代码[data2text](https://github.com/harvardnlp/data2text)
      - Coverage：不涉及复杂的关系抽取，可以简单的通过匹配方法来验证文本是否能够覆盖要描述的 data
      - Distinct：某些生成场景中（对话，广告文案）等，还需要追求文本的多样性。李纪为的《A diversity-promoting objective function for neural conversation models》提出了 Distinct 指标，后续也被许多人采用。
  - image caption 常用指标
    - CIDEr
    - SPICE
- （2）词向量评价指标
  - Greedy Matching
  - Embedding Average
  - Vector Extrema
- （3）基于语言模型的方法
  - PPL
  - 基于 bert 的评分指标
    - BERTSCORE
    - 拓展阅读 ：BLEURT
    - 拓展阅读 ：MoverScore


## （1）词重叠率

- 待定

### BLEU

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


### ROUGE

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


### METEOR

- Metric for Evaluation of Translation with Explicit ORdering，显式排序的翻译评估指标
- 核心思想
  - METEOR 是基于BLEU进行了一些改进，其目的是解决一些 BLEU 标准中固有的缺陷 。
  - METEOR 同时考虑了基于整个语料库上的准确率和召回率，而最终得出测度
  - 使用 WordNet 计算特定的序列匹配，同义词，词根和词缀，释义之间的匹配关系，改善了BLEU的效果，使其跟人工判别共更强的相关性。并且，是基于F值的。
  - METEOR 也包括其他指标没有发现一些其他功能，如同义词匹配等。METEOR 用 WordNet 等知识源扩充了一下同义词集，同时考虑了单词的词形
  - 在评价句子流畅性的时候，用了 chunk 的概念
- 计算公式
  - ![](https://www.zhihu.com/equation?tex=METEOR+%3D+%281-pen%29%5Ctimes+F_%7Bmeans%7D)
  - ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy81ZmtuYjQxaWI5cUZFV005T0laOUJBRGhzN2JQMGxyQWdydUNiZ1JIZDN0UUlURTJOMm1Rc2ZKVWZpY2JJUWF2N1RCR1pBN3d2VXBueWlhb01sd2ZZWXhyZy82NDA?x-oss-process=image/format,png#pic_center)
  - 平面图，就是 1 元组之间的映射集。平面图有如下的一些限制：在待评价翻译中的每个 1 元组必须映射到参考翻译中的 1 个或 0 个一元组，然后根据这个定义创建平面图。如果有两个平面图的映射数量相同，那么选择映射交叉数目较少的那个。 也就是说，上面左侧平面图会被选择。状态会持续运行，在每个状态下只会向平面图加入那些在前一个状态中尚未匹配的 1 元组。一旦最终的平面图计算完毕，就开始计算 METEOR 得分
- 主要特点
  - unigram共现统计
  - 基于F值
  - 考虑同义词、词干
- 应用场景
  - Machine Translation、Image Caption
- 优点
  - 基于一元组的精度和召回的调和平均，召回的权重比精度要高一点 ， 与人类判断相关性高
  - 引入了外部知识，评价更加友好
- 缺点
  - 实现复杂，只有Java实现。
  - 参数较多，有四个需要自己设置的参数。
  - 需要外部知识源，比如：WordNet，如果是WordNet中没有的语言，则无法用METEOR评测。

### NIST

- NIST(National Institute of standards and Technology)方法是在BLEU方法上的一种改进。
  - [机器翻译评测——BLEU改进后的NIST算法](https://www.cnblogs.com/by-dream/p/7765345.html)
- 最主要的是引入了每个n-gram的信息量(information) 的概念。BLEU算法只是单纯的将n-gram的数目加起来，而nist是在得到信息量累加起来再除以整个译文的n-gram片段数目。这样相当于对于一些出现少的重点的词权重就给的大了。
- 信息量的计算公式是：
  - ![](https://pic4.zhimg.com/80/v2-32ecf29b6114e3f0a98709f4847eacde_720w.png)
- 解释一下：分母是n元词在参考译文中出现的次数，分子是对应的n-1元词在参考译文中的出现次数。对于一元词汇，分子的取值就是整个参考译文的长度。这里之所以这样算，应该是考虑到出现次数少的就是重点词这样的一个思路。
- 计算信息量之后，就可以对每一个共现n元词乘以它的信息量权重，再进行加权求平均得出最后的评分结果：
  - ![](https://pic2.zhimg.com/80/v2-1144e90bc10ce76487f680021e632e93_720w.png)

### TER

- TER 是 Translation Edit Rate 的缩写，是一种基于距离的评价方法，用来评定机器翻译结果的译后编辑的工作量。
- 距离被定义为将一个序列转换成另一个序列所需要的最少编辑操作次数。操作次数越多，距离越大，序列之间的相似性越低；相反距离越小，表示一个句子越容易改写成另一个句子，序列之间的相似性越高。
- TER 使用的编辑操作包括：增加、删除、替换和移位。其中增加、删除、替换操作计算得到的距离被称为编辑距离，并根据错误率的形式给出评分
 $ score  = edit ⁡ ( c , r ) l \text { score }=\frac{\operatorname{edit}(c, r)}{l} $ 
 
 $ score = edit(c,r) $
​	
- 其中 edit(c,r) 是指机器翻译生成的候选译文 c 和参考译文 r 之间的距离，l 是归一化因子，通常为参考译文的长度。在距离计算中所有的操作的代价都为 1。在计算距离时，优先考虑移位操作，再计算编辑距离，也就是增加、删除和替换操作的次数。直到移位操作（参考文献中还有个增加操作，感觉是笔误了）无法减少编辑距离时，将编辑距离和移位操作的次数累加得到 TER 计算的距离。
>Example 1.2 Candidate：cat is standing in the ground Reference：The cat is standing on the ground

- 将 Candidate 转换为 Reference，需要进行一次增加操作，在句首增加 “The”；一次替换操作，将 “in” 替换为 “on”。所以 edit(c, r) = 2，归一化因子 l 为 Reference 的长度 7，所以该参考译文的 TER 错误率为 2/7。
- 与 BLEU 不同，基于距离的评价方法是一种典型的 “错误率” 的度量，类似的思想也广泛应用于语音识别等领域。在机器翻译中，除了 TER 外，还有 WER，PER 等十分相似的方法，只是在 “错误” 的定义上略有不同。需要注意的是，很多时候，研究者并不会单独使用 BLEU 或者 TER，而是将两种方法融合，比如，使用 BLEU 与 TER 相减后的值作为评价指标。


### Perplexity

- perplexity(困惑度)用来度量一个概率分布或概率模型预测样本的好坏程度。
- 也可以用来比较两个概率分布或概率模型。（译者：应该是比较两者在预测样本上的优劣）低困惑度的概率分布模型或概率模型能更好地预测样本。

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

### CIDEr

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

### SPICE

- Semantic Propositional Image Caption Evaluation，语义命题图像标题评估
- 核心思想
  - SPICE 使用基于图的语义表示来编码 caption 中的 objects, attributes 和 relationships。它先将待评价 caption 和参考 captions 用 Probabilistic Context-Free Grammar (PCFG) dependency parser parse 成 syntactic dependencies trees，然后用基于规则的方法把 dependency tree 映射成 scene graphs。最后计算待评价的 caption 中 objects, attributes 和 relationships 的 F-score 值。
- 计算公式
  - ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy81ZmtuYjQxaWI5cUZFV005T0laOUJBRGhzN2JQMGxyQWdsM0tDeE41c2NZQ3BvN1JuTENWT1dwVG1hRzhzY3NzQzFpYWliUHd6YU5DUU5BVHVPc1U3RHEzZy82NDA?x-oss-process=image/format,png#pic_center)
  - ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy81ZmtuYjQxaWI5cUZFV005T0laOUJBRGhzN2JQMGxyQWdSWWJlVzNOVnRJQVFEaWNrdEpBVE1sOW81S2t5SW1uZ2pzaWFJZG5YOFNkdndGRWlic3hBNTlVeVEvNjQw?x-oss-process=image/format,png#pic_center)
- 主要特点
  - 使用基于图的语义表示
- 应用场景
  - Image Caption
- 优点
  - 对目标，属性，关系有更多的考虑；
  - 和基于 n-gram 的评价模式相比，有更高的和人类评价的相关性
- 缺点
  - 由于在评估的时候主要考察名词的相似度，因此不适合用于机器翻译等任务。
  - 不考虑语法问题
  - 依赖于 semantic parsers ， 但是他不总是对的
  - 每个目标，属性，关系的权重都是一样的（一幅画的物体显然有主次之分）

## 词向量

- 词重叠评价指标基本上都是 n-gram 方式，去计算生成响应和真是响应之间的重合程度，共现程度等指标。而词向量则是通过 Word2Vec、Sent2Vec 等方法将句子转换为向量表示，这样一个句子就被映射到一个低维空间，句向量在一定程度上表征了其含义，在通过余弦相似度等方法就可以计算两个句子之间的相似程度。
- 使用词向量的好处是，可以一定程度上增加答案的多样性，因为这里大多采用词语相似度进行表征，相比词重叠中要求出现完全相同的词语，限制降低了很多。
- 不过说句实话，至少在我读过的 paper 里很少有人用（或者说只用）这种评价指标来衡量模型好坏的。

### Greedy Matching

- ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy81ZmtuYjQxaWI5cUZFV005T0laOUJBRGhzN2JQMGxyQWcxQU5QbkZuMThOYjFjcjVHaklOaWI3ZjRXbDdoQ3c3R01helVnYmljMlB2RjVlNXdhY0NYUkZtdy82NDA)
- 如上图所示，对于真实响应的每个词，寻找其在生成响应中相似度最高的词，并将其余弦相似度相加并求平均。同样再对生成响应再做一遍，并取二者的平均值。上面的相似度计算都是基于词向量进行的，可以看出本方法主要关注两句话之间最相似的那些词语，即关键词。

### Embedding Average

- 这种方法直接使用句向量计算真实响应和生成响应之间的相似度，而句向量则是每个词向量加权平均而来，如下图所示。然后使用余弦相似度来计算两个句向量之间的相似度。
- ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2pwZy81ZmtuYjQxaWI5cUZFV005T0laOUJBRGhzN2JQMGxyQWdyTFRPbFVVQUdHWUxIT1RzSkY4eGNRU1RybHlKM0dUQk85Q0g1WDhOTEc4ZEJmQk9Oa1B5b2cvNjQw)


### Vector Extrema

- 跟上面的方法类似，也是先通过词向量计算出句向量，在使用句向量之间的余弦相似度表示二者的相似度。不过句向量的计算方法略有不同，这里采用向量极值法进行计算。

## 基于语言模型的方法

### PPL

- 它也可以用来比较两个语言模型在预测样本上的优劣。低困惑度的概率分布模型或概率模型能更好地预测样本。（例如，给定一段人写的文本，分别查看 rnn 和 gpt-2 的 ppl 分数如何）

- 注意，PPL 指标是越低，代表语言模型的建模能力就越好。
- 给测试集的句子赋予较高概率值的语言模型较好, 当语言模型训练完之后，测试集中的句子都是正常的句子，那么训练好的模型就是在测试集上的概率越高越好，公式如下：
 

所以当我们使用 tf.contrib.seq2seq.sequence_loss() 函数计算模型 loss 的时候，perplexity 的计算就显得很简单了，直接对计算出来的 loss 取个指数就行了，命令如下所示：

```python
train_perp = math.exp(float(mean_loss)) if mean_loss < 300 else math.inf
```

### 基于 bert 的评分指标

- 基于 N-gram 重叠的度量标准只对词汇变化敏感，不能识别句子语义或语法的变化。因此，它们被反复证明与人工评估差距较大。
- 近年来 Bert 为代表的的 plm 红红火火，于是有人提出使用句子上下文表示 (bert 全家桶) 和人工设计的计算逻辑对句子相似度进行计算。这样的评价指标鲁棒性较好，在缺乏训练数据的情况下也具有较好表现。

- BERTSCORE
  - 思路是非常简单的：即对两个生成句和参考句（word piece 进行 tokenize）分别用 bert 提取特征，然后对 2 个句子的每一个词分别计算内积，可以得到一个相似性矩阵。基于这个矩阵，我们可以分别对参考句和生成句做一个最大相似性得分的累加然后归一化，得到 bertscore 的 precision，recall 和 F1
- 拓展阅读 ：BLEURT
  - 通过预训练结合人工评估数据的微调来同时满足度量方法的鲁棒性和表达度
- 拓展阅读 ：MoverScore
  - 采用了推土机距离计算和参考句的相似程度，而不是单纯的像 bertscore 只考虑最相似的词的距离。
  - 如何得到一个 word/n-gram 的向量表示，基于预训练的模型来得到 contextualized 表示是一个开放性的问题，Elmo 和 BERT 都是多层结构，不同的 layer 包含了不同的含义。


# 应用


## 趣味文本生成

### 写作

【2022-12-4】[秘塔写作猫](https://xiezuocat.com)：AI写作、多人协作、文本校对、改写润色、自动配图等功能，使用 GPT-3，详见[资讯](https://www.toutiao.com/article/7171341127121895939)
- 秘塔写作猫的这项 AI 生成功能，是中文 AI 生成文本内容的一项应用突破。
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/0881729a434e497d96469b1e7e933887~noop.image)
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/602e7dbbe43f48b8b1e8457258fb25d0~noop.image)

AI生成效果：

>- 降价房源急售
>- 11月13日，读者王先生致电本报，反映小区降价了，这套房子是一套两居室。记者从王先生处了解到，他的母亲也想在这里买一套住房，就在小区里询问是否有合适的房源。“最近几天都是有房源在挂牌出售，看起来还不错，但是有些房子确实是有问题的。”王先生说。对于此事记者咨询了王先生所在小区物业工作人员，他表示：“如果是两居室的话，价格会比较便宜一些，三居室就会稍微贵一点。”



### 狗屁不通文章

- 【2019-11-6】[狗屁不通文本生成器](https://suulnnka.github.io/BullshitGenerator/index.html); [这款“狗屁不通”文章生成器火了，效果确实比GPT 2差太远](https://www.sohu.com/a/352083213_99979179) 
- BullshitGenerator 没有用到任何自然语言处理相关算法，只是简单地撸代码就可以达到效果。
- “狗屁不通生成器”是一个文本生成器，用来生成一些中文文字用于 GUI 开发时测试文本渲染。由于此项目的目的只是用于 GUI 开发时测试文本渲染，所以对文本的连贯性和含义要求不高，这也就是“狗屁不通”的含义了
- <iframe src="https://suulnnka.github.io/BullshitGenerator/index.html" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"  height="600" width="100%"> </iframe>

```python
if __name__ == "__main__": 
  xx = input("请输入文章主题:") 
  for x in xx: 
    tmp = str 
    while ( len(tmp) < 6000 ) : 
      分支 = random.randint(0,100) 
      if 分支 < 5: 
        tmp += 另起一段 
      elif 分支 < 20 : 
        tmp += 来点名人名言 
      else: 
        tmp += next(下一句废话) 
        tmp = tmp.replace("x",xx) 
        print(tmp)
```

生成文本的方式就是从本地读取到的文本中按照一定规律随机读取，并且替换掉文本中“x”为指定的主题文本，并未使用深度学习方法。不难发现，生成的文本会存在句子不连贯、重复性高的特点。

### 互联网黑话生成

输出结果：
> 生命周期是发力快速响应，赋能行业引爆点。商业模式是细分载体体验度量，通过平台化和便捷性达到短平快。完善逻辑是在底层逻辑采用玩法打法达成强化认知。复用打法资源倾斜作为打法为产品赋能，信息屏障作为体系的评判标准。亮点是维度，优势是闭环。聚焦整个顶层设计，扩展规模迁移垂直领域。颗粒度是组合拳达到影响力标准。



```python
import random

stencil = '{n40}是{v0}{n41}，{v1}行业{n30}。{n42}是{v2}{n20}{n43}，通过{n31}和{n32}达到{n33}。' \
          '{n44}是在{n45}采用{n21}打法达成{n46}。{n47}{n48}作为{n22}为产品赋能，{n49}作为{n23}' \
          '的评判标准。亮点是{n24}，优势是{n25}。{v3}整个{n410}，{v4}{n26}{v5}{n411}。{n34}是{n35}' \
          '达到{n36}标准。'

num = {'v': 6, 'n2': 7, 'n3': 7, 'n4': 12}


# 二字动词
v = '皮实、复盘、赋能、加持、沉淀、倒逼、落地、串联、协同、反哺、兼容、包装、重组、履约、' \
    '响应、量化、发力、布局、联动、细分、梳理、输出、加速、共建、共创、支撑、融合、解耦、聚合、' \
    '集成、对标、对齐、聚焦、抓手、拆解、拉通、抽象、摸索、提炼、打通、吃透、迁移、分发、分层、' \
    '封装、辐射、围绕、复用、渗透、扩展、开拓、给到、死磕、破圈'.split('、')

# 二字名词
n2 = '漏斗、中台、闭环、打法、纽带、矩阵、刺激、规模、场景、维度、格局、形态、生态、话术、' \
     '体系、认知、玩法、体感、感知、调性、心智、战役、合力、赛道、基因、因子、模型、载体、横向、' \
     '通道、补位、链路、试点'.split('、')

# 三字名词
n3 = '新生态、感知度、颗粒度、方法论、组合拳、引爆点、点线面、精细化、差异化、平台化、结构化、' \
     '影响力、耦合性、易用性、便捷性、一致性、端到端、短平快、护城河'.split('、')

# 四字名词
n4 = '底层逻辑、顶层设计、交付价值、生命周期、价值转化、强化认知、资源倾斜、完善逻辑、抽离透传、' \
     '复用打法、商业模式、快速响应、定性定量、关键路径、去中心化、结果导向、垂直领域、归因分析、' \
     '体验度量、信息屏障'.split('、')

v_list = random.sample(v, num['v'])
n2_list = random.sample(n2, num['n2'])
n3_list = random.sample(n3, num['n3'])
n4_list = random.sample(n4, num['n4'])
lists = {'v': v_list, 'n2': n2_list, 'n3': n3_list, 'n4': n4_list}

dic = {}
for current_type in ['v', 'n2', 'n3', 'n4']:
    current_list = lists[current_type]
    for i in range(0, len(current_list)):
        dic[current_type + str(i)] = current_list[i]

result = stencil.format(**dic)
print(result)
```


## data2text

【2022-7-16】[腾讯刘天宇：可控、可靠的数据到文本生成技术](https://www.toutiao.com/article/7120933821176037888), 聚焦data2text任务

data2text（数据到文本生成）的任务定义。
- 对**结构化数据**产生**自然语言**描述，可以应用在很多方面，比如自动赛事播报、自动电商产品描述等，也可以去赋能一些其它相关业务，比如对话回复生成、电子病历。

挑战：
- 结构化数据的专业性比较强，多领域的，比如金融、体育、医疗、政务等，由于含有比较多的专业用语和专用知识，因此比较难解读。
- 互联网上结构化数据覆盖范围广，在对这种大规模数据，或者是开放域百科、知识图谱进行描述的时候，会面临跨领域的挑战。有时候不需要把数据当中的每一个数字都去介绍清楚，因此，如何聚焦最重要的信息，也是一个挑战。

文本到文本生成，已经有很成熟的方式，可以用编码器解码器方式去做，如RNN、Transformer、Pretrained Model。但结构化数据的挑战，首先是怎么把结构化数据建模成**序列**形式，或者说如何把它塞到编码器中去。主要有两种方式：
- 第一种，把表内信息对应的键值信息当作一个词语，跟表内信息融合成一个句子，序列化的输入Encoder当中。
- 第二种，把attribute键值信息拼接在表内信息之后。

这两种方法都适用于RNN、Transformer、Pretrained Model。
- ![](https://p9.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/a102b9a4be354b1c93916867f55ec882?from=pc)

融入规划
- 一个比较经典的NLP流水线，我们的NLG应用会经历一个从“说什么”到“怎么说”的过程。从规划的角度看可能会进行Document Planning、Sentence Planning。
- 使用z去代表数据描述的规划。建模就是要对z进行求和，把它marginalize掉，才可以优化P(y|x)。
- ![](https://p9.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/f5881e672b214094b75afa85d4ec1242?from=pc)

两种规划：**显式**规划和**隐式**规划。

### （1）显示规划

- 训练的目标是希望有一个规划生成的网络P(z|x)，输入结构化的信息，输出序列化规划，再把指定的规划信息和结构化数据输入描述网络中，最终生成描述。
- 推理的时候，可以用规划生成网络产生的规划，或者自行规定的规划，由此产生与这个规划对应的描述内容。

显式规划包括：**内容选择**规划，**描述顺序**规划和**描述句式**规划。

优点：
- 细粒度控制段落结构、描述顺序、句式结构。
- 规划**可解释性较强**，因为可以看到它的规划是什么。
- 在明确规划定义情况下，**训练容易**。

缺点
- 规划依赖数据和文本之间的对齐，必须有一个清晰的对齐才能产生一个可解释的规划。

显示规划多应用于**赛事播报**、**商品描述**、**智能写作辅助**等领域，在生成**长文本**的场景下的优势更加明显。

### （2）隐式规划

符号系统还是和显示规划中一样，y是一个text，x是输入的一个结构化数据，z还是规划。但是这里z是一个隐变量，可能是一个离散隐变量，也可能是一个连续隐变量。训练的时候，我们要用到采样信息，我们需要从P(z|x)即z的后验概率中采样一个z出来，然后去进行训练。推理的时候，我们可以采样一个z，也可以指定一个z，来进行推理。

隐式规划的重点是首先要确定这个隐变量的结构，要确定它是一个离散的变量，还是一个连续的变量，它的结构是单变量，还是一个链式变量，或者是一个层次的变量。这样的结构信息决定了我们用什么样的算法去优化它，比如EM、VAE或是HMM。
- ![](https://p9.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/2b912587c04e49f1b5a547d251e84a85?from=pc)

隐式规划包括：**MoE离散**隐变量规划，**变分连续**隐变量规划，以及**链式离散**隐变量规划。

优点：
- 只需定义隐变量结构，无须明确知晓数据-文本对齐。
- 比较成熟的隐变量推断方法，较容易融入统计约束。
- 方便多次采样，可以产生多样的文本描述。

缺点
- 训练可能不稳定，调参比较困难，且训练步骤偏多。

隐式规划更擅长短/中文本生成，适合应用于**广告标语**生成、**营销文案**生成、**评论**生成等领域。

### FAQ

答问环节
- Q：**变分**和**端到端**生成哪个生成质量更好？
  - 变分的训练比较困难，有条件做端到端的训练，效果会更好一些。
  - 变分训练的时候不太稳定，有时甚至要调一下学习种子才能生成比较稳定的文案。
- Q：**隐式规划**训练过程中可能会不稳定，能否分享一些如何让这个训练更加稳定的经验？
  - 大家用的比较多的是VAE，训练里有一些技巧。比如后验坍缩的情况，变分网络很快就跟先验分布完全一致了，无法起到变分的效果，再去从z里面高斯采样，经过后验网络产生真实z的分布，其实都无效化。所以可以给KL损失函数乘上一个权重，训练的时候权重逐渐增大，达到模拟退火（KL annealing）的效果。
- Q：隐式模型训练之前会有一些对冷启动的处理吗？
  - 冷启动的处理是可以的，比如预训一个数据描述的网络，输入还是有x的，输入还有一个z，z是隐变量，如果p(y)从一个很好的预训练语言模型开始，整个表现会更好。

## GPT

GPT 2 是 OpenAI 推出的一个中文生成模型，由加拿大工程师 Adam King 制作的网站上，任何人都能调教简化版的 GPT-2，它能够识别从新闻、歌词、诗歌、食谱、代码的各种输入，甚至还为《复仇者联盟》写了一个细节丰富的续集，内容可读性相当高。

[GPT2 中文项目](https://github.com/Morizeyao/GPT2-Chinese)

# 资料

- 更多[Demo地址](http://wqw547243068.github.io/demo)
- 【2020-8-27】[E2Echallenge参赛模型汇总](https://blog.csdn.net/u012328476/article/details/108144226)

# 结束


