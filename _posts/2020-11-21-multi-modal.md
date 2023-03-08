---
layout: post
title:  "多模态-Multi-Modal"
date:   2020-11-21 16:22:00
categories: 深度学习
tags: 多模态 CLIP 
excerpt: 多模态相关学习笔记
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 多模态学习笔记

## 多模态计算

- 虽然人脸、姿态和语音等均能独立地表示一定的情感，但人的相互交流却总是通过信息的综合表现来进行。所以， 只有实现多通道的人机界面，才是人与计算机最为自然的交互方式，它集自然语言、语音、手语、人脸、唇读、头势、体势等多种交流通道为一体，并对这些通道信息进行编码、压缩、集成和融合，集中处理图像、音频、视频、文本等多媒体信息。多模态计算是目前情感计算发展的主流方向。每个模块所传达的人类情感的信息量大小和维度不同。在人机交互中，不同的维度还存在缺失和不完善的问题。因此，人机交互中情感分析应尽可能从多个维度入手，将单一不完善的情感通道补上，最后通过多结果拟合来判断情感倾向。
- 在多模态情感计算研究中，一个很重要的分支就是**情感机器人**和**情感虚拟人**的研究。美国麻省理工学院、日本东京科技大学、美国卡内基·梅隆大学均在此领域做出了较好的演示系统。目前中科院自动化所模式识别国家重点实验室已将情感处理融入到了他们已有的语音和人脸的多模态交互平台中，使其结合情感语音合成、人脸建模、视位模型等一系列前沿技术，构筑了栩栩如生的情感虚拟头像，并积极转向嵌入式平台和游戏平台等实际应用。
- 目前， 情感识别和理解的方法上运用了模式识别、人工智能、语音和图像技术的大量研究成果。例如：在情感语音声学分析的基础上，运用线性统计方法和神经网络模型，实现了基于语音的情感识别原型；通过对面部运动区域进行编码，采用 HMM 等不同模型，建立了面部情感特征的识别方法；通过对人姿态和运动的分析，探索肢体运动的情感类别等等。不过，受到情感信息捕获技术的影响， 以及缺乏大规模的情感数据资源，有关多特征融合的情感理解模型研究还有待深入。随着未来的技术进展，还将提出更有效的机器学习机制。

## 什么是多模态

【2023-2-25】[多模态学习综述(MultiModal Learning)](https://zhuanlan.zhihu.com/p/582878508)

### 模态

`模态`（modal）是事情经历和发生的方式，我们生活在一个由多种模态（Multimodal）信息构成的世界，包括**视觉**信息、**听觉**信息、**文本**信息、**嗅觉**信息等等，当研究的问题或者数据集包含多种这样的模态信息时我们称之为`多模态问题`，研究多模态问题是推动人工智能更好的了解和认知我们周围世界的关键。
- ![modal](https://pic3.zhimg.com/80/v2-b090453a88b04dd67e5232d429980fb6_1440w.webp)

`模态`是指一些表达或感知事物的方式，每种信息的来源或者形式都可以称为一种模态。例如:
- 人有触觉，听觉，视觉，嗅觉；
- 信息的媒介，有语音、视频、文字等；
- 多种多样的传感器，如雷达、红外、加速度计等。

以上的每一种都可以称为一种模态。

相较于图像、语音、文本等`多媒体`(Multi-media)数据划分形式，“模态”是一个更为**细粒度**的概念，<span style='color:blue'>同一媒介下可存在不同的模态</span>。 
- 比如我们可以把两种不同语言当做是两种模态，甚至在两种不同情况下采集到的数据集，亦可认为是两种模态。

通常主要研究模态包括"`3V`"：即`Verbal`(文本)、`Vocal`(语音)、`Visual`(视觉)。

### 多模态

`多模态`即是从多个模态表达或感知事物。 `多模态`可归类为**同质性**的模态，例如从两台相机中分别拍摄的图片，异质性的模态，例如图片与文本语言的关系。

多模态可能有以下三种形式：
- 描述**同一对象**的**多媒体**数据。如互联网环境下描述某一特定对象的视频、图片、语音、文本等信息。下图即为典型的多模态信息形式。
  - ![](https://pic3.zhimg.com/80/v2-0f9181a9b97891fab9a4ba4ab55a54f2_1440w.webp)
- 来自**不同传感器**的同一类媒体数据。如医学影像学中不同的检查设备所产生的图像数据， 包括B超(B-Scan ultrasonography)、计算机断层扫描(CT)、核磁共振等；物联网背景下不同传感器所检测到的同一对象数据等。
- 具有不同数据结构特点、表示形式的表意符号与信息。如描述同一对象的结构化、非结构化的数据单元；描述同一数学概念的公式、逻辑 符号、函数图及解释性文本；描述同一语义的词向量、词袋、知识图谱以及其它语义符号单元等。

通常主要研究模态包括"3V"：即`Verbal`(文本)、`Vocal`(语音)、`Visual`(视觉)。 人跟人交流时的多模态：
- ![](https://pic4.zhimg.com/80/v2-225d569ddd4d0427b54c44d34aa6b18f_1440w.webp)

### 多模态学习

多模态机器学习是从多种模态数据中学习并且提升自身的算法，它不是某一个具体的算法，它是一类算法的总称。
- 从语义感知的角度切入，多模态数据涉及不同的感知通道如视觉、听觉、触觉、嗅觉所接收到的信息;
- 在数据层面理解，多模态数据则可被看作多种数据类型的组合，如图片、数值、文本、符号、音频、时间序列，或者集合、树、图等不同数据结构所组成的复合数据形式，乃至来自不同数据库、不同知识库的各种信息资源的组合。对多源异构数据的挖掘分析可被理解为多模态学习。
- ![](https://pic4.zhimg.com/80/v2-779aef8e97481d9cf2aa0dcc5f6e005b_1440w.webp)

`多模态机器学习`，英文全称 MultiModal Machine Learning (MMML)


## 多模态历史

`多模态学习`不是近几年才火起来，而是近几年因为深度学习使得多模态效果进一步提升。

从1970年代起步，多模态技术经历的4个发展阶段，在2012后迎来 Deep Learning 阶段，在2016年后进入目前真正的多模态阶段。 
- 第一阶段为基于`行为`的时代(1970s until late 1980s)，这一阶段主要从心理学的角度对多模态这一现象进行剖析。  
- 第二阶段基于`计算`的时代(1980 - 2000)，这一阶段主要利用一些浅层的模型对多模态问题进行研究，其中代表性的应用包括视觉语音联合识别，多模态情感计算等等。  
- 第三阶段基于`交互`的时代，这一阶段主要主要从交互的角度入手，研究多模态识别问题，其中主要的代表作品包括苹果的语音助手Siri等。  
- 第四阶段基于`深度学习`的时代，促使多模态研究发展的关键促成因素有4个
  - 1）更大规模的多模态数据集；
  - 2）更强大的算力(NPU/GPU/TPU)；
  - 3）强大的视觉特征抽取能力；
  - 4）强大的语言特征抽取能力。

![](https://pic1.zhimg.com/80/v2-ba59d473bb15c4bf00f3e0811b9d47c6_720w.webp?source=1940ef5c)

多模态发展的四个时期
- ![](https://pic4.zhimg.com/80/v2-f77192c7d83a16ebad1b068378c523e3_1440w.webp)

### 行为时代

The “behavioral” era (1970s until late 1980s)，这一阶段主要从**心理学**的角度对多模态这一现象进行剖析。
- Chicago 的McNeill 认为手势是说话人的思考行为，是言语表达的重要组成部分，而不仅仅是补足。
- 1976年的McGurk效应：当语音与唇形不符合时，大脑会脑补出中和的声音MCGURK, H., MACDONALD, J. Hearing lips and seeing voices. Nature 264, 746–748 (1976). The McGurk Effect Video

### 计算时代

The “computational” era (late 1980s until 2000)，这一阶段主要利用一些浅层的模型对多模态问题进行研究，其中代表性的应用包括视觉语音联合识别，多模态情感计算等等。
- 视频音频语音识别(AVSR)，在声音的低信噪比下，引入视觉信号能够极大提升识别准确率
- 多模态/多感知接口：情感计算：与情感或其他情感现象有关、源于情感或有意影响情感的计算[Rosalind Picard]
- 多媒体计算：CMU曾有过信息媒体数字视频库项目[1994-2010]，

### 交互时代

The “interaction” era (2000 - 2010)，这一阶段主要主要从交互的角度入手，研究多模态识别问题，其中主要的代表作品包括苹果的语音助手Siri等。

拟人类多模态交互过程

- IDIAP实验室的AMI项目[2001-2006]，记录会议录音、同步音频视频、转录与注释；
- Alex Waibel的CHIL项目，将计算机置于人类交互圈中，多传感器多模态信号处理，面对面交互

IMI Projet & CHIL Project
- 2003-2008 SRI的学习和组织认知助手，个性化助手，Siri就是这个项目的衍生产品
- 2008-2011 IDIAP的社交信号处理网络，数据库http://sspnet.eu。

CALO Project & SSP Project


### 深度学习时代

The “deep learning” era (2010s until …)，促使多模态研究发展的关键促成因素有4个
- 1）新的大规模多模态数据集
- 2）GPU快速计算
- 3）强大的视觉特征抽取能力
- 4）强大的语言特征抽取能力。



## 多模态典型任务

多模态机器学习的核心任务主要包括`表示学习`，`模态映射`，`模态对齐`，`模态融合`，`协同学习`。

### 表示学习

`表示学习`（Representation）：主要研究如何将多个模态数据所蕴含的语义信息，数值化为实值向量，简单来说就是**特征化**。
- `单模态`的表示学习负责将信息表示为计算机可以处理的数值向量或者进一步抽象为更高层的特征向量 Feature；
- 而多模态表示学习通过利用多模态之间的互补性，剔除模态间的冗余性，从而学习到更好的特征 Feature。

那在表示学习中主要包括两大研究方向：
- `联合表示`（Joint Representations）：将多个模态的信息一起映射到一个统一的多模态向量空间。（CLIP 和 DALL·E 使用简单的联合表示，不过效果出奇的赞）。 
- `协同表示`（Coordinated Representations）：将多模态中的每个模态分别映射到各自的表示空间，但映射后的向量之间满足一定的相关性约束（例如线性相关）。 
- <img src="https://pic1.zhimg.com/50/v2-77531575a4083c22b18b399dd17bf54e\_720w.jpg?source=1940ef5c" data-caption="" data-size="normal" data-rawwidth="1952" data-rawheight="508" class="origin\_image zh-lightbox-thumb" width="1952" data-original="https://pica.zhimg.com/v2-77531575a4083c22b18b399dd17bf54e\_r.jpg?source=1940ef5c"/>

### 下游任务

接着就是下游任务对特征进行理解（学术上也叫做内容理解），典型的下游任务包括`视觉问答`、`视觉推理`、`视觉联合推理`、`图像检索`、`视频检索`。
- 视觉问答（Visual Question Answering，VQA）：根据给定的图片提问，从候选中选择出正确的答案，VQA2.0 中从 COCO 图片中筛选了超过100万的问题，训练模型来预测最常见的3129个回答，其本质上可以转化成一个分类问题。
- <img src="https://pic1.zhimg.com/50/v2-f3e6e48c5a6647fc496a5533cb1223a4\_720w.jpg?source=1940ef5c" data-caption="" data-size="normal" data-rawwidth="1538" data-rawheight="402" class="origin\_image zh-lightbox-thumb" width="1538" data-original="https://pic1.zhimg.com/v2-f3e6e48c5a6647fc496a5533cb1223a4\_r.jpg?source=1940ef5c"/>
- 视觉推理（Visual Reasoning，VR）：视觉推理相对视觉问答更为复杂, 其可以分解为两个子任务视觉问答（Q->A）和选出答案的原因（QA->R）, 除了回答的问题需要用自然语言表达具有挑战性的视觉问题外, 模型还需要解释为什么作出这样的回答, 其最开始由华盛顿大学提出, 同时发布的 VCR 数据集包含 11 万的电影场景和 29 万的多项选择问题。
- <img src="https://picx.zhimg.com/50/v2-1d732cb95b79362f2ca3129fed2af035\_720w.jpg?source=1940ef5c" data-caption="" data-size="normal" data-rawwidth="1190" data-rawheight="295" class="origin\_image zh-lightbox-thumb" width="1190" data-original="https://picx.zhimg.com/v2-1d732cb95b79362f2ca3129fed2af035\_r.jpg?source=1940ef5c"/>
- 检索任务（Index Task）：主要包括文本检索图片或者图片检索文本，检索任务应该不用加以过多的解释了，比较好理解，就是以文搜图或者以图搜文。下面图中就是Google 以图搜文的服务，当然包括华为手机里面的截图识字，淘宝拼多多的以文搜图等身边很多诸如此类的服务啦。
- <img src="https://pic1.zhimg.com/50/v2-ae0f2f691f4c09ef198b3575f71b2a31\_720w.jpg?source=1940ef5c" data-caption="" data-size="normal" data-rawwidth="1493" data-rawheight="553" class="origin\_image zh-lightbox-thumb" width="1493" data-original="https://picx.zhimg.com/v2-ae0f2f691f4c09ef198b3575f71b2a31\_r.jpg?source=1940ef5c"/>

### 跨模态预训练

- 图像/视频与语言预训练。
- 跨任务预训练

#### CLIP

OpenAI 推出了 CLIP，在400M的**图像-文本对**数据上，用最朴素的**对比损失**训练双塔网络，利用text信息监督视觉任务自训练，对齐了两个模态的特征空间，本质就是将`分类任务`化成了`图文匹配`任务，效果可与全监督方法相当。
- 在近 30 个数据集上 zero-shot 达到或超越主流监督学习性能。
- CLIP：《[Learning Transferable Visual Models From Natural Language Supervision](https://arxiv.org/abs/2103.00020)》

作者：[ZOMI酱](https://www.zhihu.com/question/505125640/answer/2633346368)

CLIP算法原理
- CLIP 不预先定义图像和文本标签类别，直接利用从互联网爬取的 400 million 个image-text pair 进行图文匹配任务的训练，并将其成功迁移应用于30个现存的计算机视觉分类。
- CLIP 无需利用 ImageNet 的数据和标签进行训练，就可以达到 ResNet50 在 ImageNet数据集上有监督训练的结果，所以叫做 Zero-shot。

CLIP（contrastive language-image pre-training）主要的贡献就是利用无监督的文本信息，作为监督信号来学习视觉特征。CLIP 作者先是回顾了并总结了和上述相关的两条表征学习路线： 
- 构建image和text的联系，比如利用已有的image-text pair数据集，从text中学习image的表征；  
- 获取更多的数据（不要求高质量，也不要求full labeled）然后做弱监督预训练，就像谷歌使用的JFT-300M数据集进行预训练一样（在JFT数据集中，类别标签是有噪声的）。具体来说，JFT中一共有18291个类别，这能教模型的概念比ImageNet的1000类要多得多，但尽管已经有上万类了，其最后的分类器其实还是静态的、有限的，因为你最后还是得固定到18291个类别上进行分类，那么这样的类别限制还是限制了模型的zero-shot能力。 

这两条路线其实都展现了相当的潜力，前者证明 paired image-text 可以用来训练视觉表征，后者证明扩充数据能极大提升性能，即使数据有noise。于是high-level上，CLIP 作者考虑从网上爬取大量的 image-text pair 以扩充数据，同时这样的 pairs 是可以用来训练视觉表征的。作者随即在互联网上采集了4亿个 image-text 对，准备开始训练模型。

CLIP流程有三个阶段：
- Contrastive pre-training：对比预训练阶段，使用image-text对进行对比学习训练。
- Create dataset classifier from label text：提取预测类别文本特征。
- Use for zero-shot prediction：进行 Zero-Shot 推理预测。
- ![](https://picx.zhimg.com/80/v2-340920caff256e06c29cff7097e23e62_720w.webp?source=1940ef5c)

#### PaLM-E

【2023-3-7】谷歌发布了个多模态模型 `PaLM-E`，使用传感器数据、自然语言、视觉训练，能直接用人话操作机器人完成任务。
- [PaLM-E: An Embodied Multimodal Language Model](https://palm-e.github.io/)

### Language-Audio

- Text-to-Speech Synthesis: 给定文本，生成一段对应的声音。
- Audio Captioning：给定一段语音，生成一句话总结并描述主要内容。(不是语音识别)

### Vision-Audio

- Audio-Visual Speech Recognition(视听语音识别)：给定某人的视频及语音进行语音识别。
- Video Sound Separation(视频声源分离)：给定视频和声音信号(包含多个声源)，进行声源定位与分离。
- Image Generation from Audio: 给定声音，生成与其相关的图像。
- Speech-conditioned Face generation：给定一段话，生成说话人的视频。
- Audio-Driven 3D Facial Animation：给定一段话与3D人脸模版，生成说话的人脸3D动画。

### Vision-Language

- Image/Video-Text Retrieval (图(视频)文检索): 图像/视频<-->文本的相互检索。
- Image/Video Captioning(图像/视频描述)：给定一个图像/视频，生成文本描述其主要内容。
- Visual Question Answering(视觉问答)：给定一个图像/视频与一个问题，预测答案。
- Image/Video Generation from Text：给定文本，生成相应的图像或视频。
- Multimodal Machine Translation：给定一种语言的文本与该文本对应的图像，翻译为另外一种语言。
- Vision-and-Language Navigation(视觉-语言导航)： 给定自然语言进行指导，使得智能体根据视觉传感器导航到特定的目标。
- Multimodal Dialog(多模态对话)： 给定图像，历史对话，以及与图像相关的问题，预测该问题的回答。

### 定位相关的任务

- Visual Grounding：给定一个图像与一段文本，定位到文本所描述的物体。
- Temporal Language Localization: 给定一个视频即一段文本，定位到文本所描述的动作(预测起止时间)。
- Video Summarization from text query：给定一段话(query)与一个视频，根据这段话的内容进行视频摘要，预测视频关键帧(或关键片段)组合为一个短的摘要视频。
- Video Segmentation from Natural Language Query: 给定一段话(query)与一个视频，分割得到query所指示的物体。
- Video-Language Inference: 给定视频(包括视频的一些字幕信息)，还有一段文本假设(hypothesis)，判断二者是否存在语义蕴含(二分类)，即判断视频内容是否包含这段文本的语义。
- Object Tracking from Natural Language Query: 给定一段视频和一些文本，追踪视频中文本所描述的对象。
- Language-guided Image/Video Editing: 一句话自动修图。给定一段指令(文本)，自动进行图像/视频的编辑。

### 更多模态

- Affect Computing (情感计算)：使用语音、视觉(人脸表情)、文本信息、心电、脑电等模态进行情感识别。
- Medical Image：不同医疗图像模态如CT、MRI、PETRGB-D模态：RGB图与深度图


## 多模态情感分析语料库

【2021-8-13】[哈工大：多模态情感分析语料库调研](https://mp.weixin.qq.com/s/YQxGvevrYixWcXXgKg0NXw)

介绍相关子任务和对应数据集以及在数据集上的最新研究工作。主要分为：
- 面向**视频评论**的情感分析
- 面向视频评论的**细粒度**情感分析
- 面向**视频对话**的情绪分析
- 面向视频的**反讽**识别
- 面向**图文**的反讽识别
- 面向图文的情感分析
- 面向图文的细粒度情感分析、幽默检测、抑郁检测。

本文分别总结了相关数据集和方法，具体内容见第三部分。

[多模态情感分析简述](https://zhuanlan.zhihu.com/p/97170240), 任务概览，总结如下：

![多模态情感分析任务概览](https://pic1.zhimg.com/80/v2-18dfa11b0b0a41fba2f1a92a54cbad18_1440w.jpg)

多模态情感分析相关数据集和方法概览

|模态|任务|数据集及下载地址|方法|
|---|---|---|---|
|声图文|面向视频评论的情感分析|[Youtube数据集](https://projects.ict.usc.eduyoutube)，[MOSI数据集](https://github.com/A2Zadeh/CMU-MultimodalSDK)，[MOSEI数据集](https://github.com/A2Zadeh/CMU-MultimodalSDK)|Self-MM，Mult|
|声图文|面向视频评论的细粒度情感分析|[CH-SIMS数据集](https://github.com/thuiar/MMSA)|MTFN|
|声图文|面向视频对话的情绪分析|[IEMOCAP数据集](https://sail.usc.edu/iemocap/), [MELD数据集](https://affective-meld.github.io)|DialogueRNN, MESM|
|声图文|面向视频的反讽识别|[MUStARD数据集](https://github.com/soujanyaporia/MUStARD)|Early Fusion +SVM|
|图文|面向图文的反讽识别|[Twitter反讽数据集](https://github.com/headacheboy/data-of-multimodal-sarcasm-detection)|D&R net|
|图文|面向图文的情感分析|[Yelp数据集](https://www.yelp.com/dataset),[MVSA数据集](http://mcrlab.net/research/mvsa-sentiment-analysis-on-multi-view-social-data/)||
|图文|面向图文的细粒度情感分析|[Multi-ZOL数据集](https://github.com/xunan0812/MIMN),[Twitter-15&17数据集](https://github.com/jefferyYu/TomBERT)|TomBert|
|声图文|幽默检测|[UR-FUNNY数据集](https://github.com/ROC-HCI/UR-FUNNY)|C-MFN|
|声图文|抑郁检测|[DAIC-WOZ数据集](https://dcapswoz.ict.usc.edu)||
|图文|抑郁检测|[Twitter抑郁检测数据集](https://depressiondetection.droppages.com)|MDL|

详情见原文



# 结束


