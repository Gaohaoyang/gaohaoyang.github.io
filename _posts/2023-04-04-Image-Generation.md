---
layout: post
title:  "图像生成-Image Generation"
date:   2023-04-04 08:01:00
categories: 计算机视觉
tags: 深度学习 计算机视觉 GAN CVPR 论文 sota 数字图像
excerpt: 图像生成技术概览，扩散生成模型原理及各类AI作画类应用
mathjax: true
permalink: /image-generation
---

* content
{:toc}

# 图像生成

## 图像生成技术演变

【2023-4-4】[从VAE到扩散模型：一文解读以文生图新范式](https://zhuanlan.zhihu.com/p/519415802)

图像生成方法除了熟知的**生成对抗网络**（`GAN`），主流方法还包括**变分自编码器**（`VAE`）和基于**流**的生成模型（Flow-based models），以及近期颇受关注的**扩散模型**（Diffusion models）
- ![](https://pic1.zhimg.com/80/v2-724971117e7467e02370d3b689174630_1440w.webp)

自2014年生成对抗网络（`GAN`）诞生以来，**图像生成**研究成为了深度学习乃至整个人工智能领域的重要前沿课题，现阶段技术发展之强已达到以假乱真的程度。除了为人熟知的`生成对抗网络`（GAN），主流方法还包括`变分自编码器`（VAE）和`基于流的生成模型`（Flow-based models），以及近期颇受关注的`扩散模型`（Diffusion models）。

## 多模态图像生成

【2022-9-7】[当 AI 邂逅绘画艺术，能迸发出怎样的火花？](https://posts.careerengine.us/p/63183f351bd2e15b54dda53f?from=latest-posts-panel&type=title)

`多模态图像生成`（Multi-Modal Image Generation）旨在利用文本、音频等模态信息作为指导条件，生成具有自然纹理的逼真图像。不像传统的根据噪声生成图像的单模态生成技术，多模态图像生成一直以来就是一件很有挑战的任务，要解决的问题主要包括：
- （1）如何跨越“语义鸿沟”，打破各模态之间固有的隔阂？
- （2）如何生成合乎逻辑的，多样性的，且高分辨率的图像？

近两年，随着 Transformer 在自然语言处理（如 GPT）、计算机视觉（如 ViT）、多模态预训练（如 CLIP）等领域的成功应用，以及以 VAE、GAN 为代表的图像生成技术有逐渐被后起之秀——扩散模型（Diffusion Model）赶超之势，多模态图像生成的发展一发不可收拾。

按照训练方式采用的是 Transformer 自回归还是扩散模型的方式，近两年多模态图像生成重点工作分类如下
- Transformer `自回归`：将文本和图像分别转化成 tokens 序列，然后利用生成式的 Transformer 架构从文本序列（和可选图像序列）中预测图像序列，最后使用图像生成技术（VAE、GAN等）对图像序列进行解码，得到最终生成图像。
- `扩散模型`：扩散模型（Diffusion Model）是一种图像生成技术，最近一年发展迅速，被喻为 GAN 的终结者。如图所示，扩散模型分为两阶段：
  - （1）加噪：沿着扩散的马尔可夫链过程，逐渐向图像中添加随机噪声；
  - （2）去噪：学习逆扩散过程恢复图像。常见变体有去噪扩散概率模型（DDPM）等。
- ![](https://static.careerengine.us/api/aov2/https%3A_%7C__%7C_mmbiz.qpic.cn_%7C_mmbiz_png_%7C_Z6bicxIx5naJlJ5U7H2h9WvOKicVvP1IMQsP7Beoqq3agsokoH4E75sO33rXmPORQ4djtdEB3IAMBnsk8bugYcKQ_%7C_640%3Fwx_fmt%3Dpng)

采取扩散模型方式的多模态图像生成做法，主要是通过带条件引导的扩散模型学习文本特征到图像特征的映射，并对图像特征进行解码得到最终生成图像


## VAE

变分自编码器（Variational Autoencoder）是自编码器的一种变体，传统的自编码器旨在以无监督的方式训练一个神经网络，完成将原始输入压缩成中间表示和将恢复成两个过程，前者通过编码器（Encoder）将原始高维输入转换为低维隐层编码，后者通过解码器（Decoder）从编码中重建数据。不难看出，自编码器的目标是学习一个恒等函数，我们可以使用交叉熵（Cross-entropy）或者均方差（Mean Square Error）构建重建损失量化输入和输出的差异。如图3所示，在上述过程中我们获得了低纬度的隐层编码，它捕捉了原始数据的潜在属性，可以用于数据压缩和特征表示。
- ![](https://pic2.zhimg.com/80/v2-92a9061e7079089b75c37650943c6f25_1440w.webp)

由于自编码器仅关注隐层编码的重建能力，其隐层空间分布往往是无规律和不均匀的，在连续的隐层空间随机采样或者插值得到一组编码通常会产生无意义和不可解释的生成结果。为了构建一个有规律的隐层空间，使得我们可以在不同潜在属性上随机地采样和平滑地插值，最后通过解码器生成有意义的图像，研究者们在2014年提出了变分自编码器。

变分自编码器不再将输入映射成隐层空间中的一个固定编码，而是转换成对隐层空间的概率分布估计，为了方便表示我们假设先验分布是一个标准高斯分布。同样的，我们训练一个概率解码器建模，实现从隐层空间分布到真实数据分布的映射。当给定一个输入，我们通过后验分布估计出关于分布的参数（多元高斯模型的均值和协方差），并在此分布上采样，可使用重参数化技巧使采样可导（为随机变量），最后通过概率解码器输出关于的分布，如图4所示。为了使生成图像尽量真实，我们需要求解后验分布，目标是最大化真实图像的对数似然。
- ![](https://pic2.zhimg.com/80/v2-1a167ddb7d42fe7c6665f561331971d9_1440w.webp)

## GAN

GAN的全称是Generative Adversarial Networks，从名称不难读出“对抗（Adversarial）”是其成功之精髓。对抗的思想受博弈论启发，在训练生成器（Generator）的同时，训练一个判别器（Discriminator）来判断输入是真实图像还是生成图像，两者在一个极小极大游戏中相互博弈不断变强，如式(1)。当从随机噪声生成足以“骗”过的图像时，我们认为较好地拟合出了真实图像的数据分布，通过采样可以生成大量逼真的图像。
- ![](https://pic2.zhimg.com/80/v2-bc26dc0b7c15463ceb44641f78c47849_1440w.webp)

GAN是生成式模型中应用最广泛的技术，在图像、视频、语音和NLP等众多数据合成场景大放异彩。除了直接从随机噪声生成内容外，我们还可以将条件（例如分类标签）作为输入加入生成器和判别器，使得生成结果符合条件输入的属性，让生成内容得以控制。虽然GAN效果出众，但由于博弈机制的存在，其训练稳定性差且容易出现模式崩溃（Mode collapse），如何让模型平稳地达到博弈均衡点，也是GAN的热点研究话题。



## Flow-Based

基于流的生成模型（Flow-based models）
- ![](https://pic3.zhimg.com/80/v2-26c6df9df8ff419caff45e48532edb12_1440w.webp)
- 假设原始数据分布可以通过一系列可逆的转化函数从已知分布获得，即通过雅各布矩阵行列式和变量变化规则，直接估计真实数据的概率密度函数（式(4)），最大化可计算的对数似然。


## 扩散模型

### 什么是扩散模型

扩散模型灵感来自**非平衡热力学**。通过定义了一个扩散步骤的`马尔可夫链`，以缓慢地将随机噪声添加到数据中，然后学习反转扩散过程以从噪声中构建所需的数据样本。
- 发布DALL·E的15个月后，OpenAI在今年春天带了续作DALL·E 2，以其更加惊艳的效果和丰富的可玩性迅速占领了各大AI社区的头条。近年来，随着生成对抗网络（GAN）、变分自编码器（VAE）、扩散模型（Diffusion models）的出现，深度学习已向世人展现其强大的图像生成能力；加上GPT-3、BERT等NLP模型的成功，人类正逐步打破文本和图像的信息界限。
- DALL·E 2中，只需输入简单的文本（prompt），它就可以生成多张1024*1024的高清图像。这些图像甚至可以将不合常理的语义表示，以超现实主义的形式创造出天马行空的视觉效果，例如图1中“写实风格的骑马的宇航员（An astronaut riding a horse in a photorealistic style）”。


【2022-8-31】苏剑林的[生成扩散模型漫谈](https://kexue.fm/archives/9119)
- 生成模型中，VAE、GAN“如雷贯耳”，还有一些比较小众的选择，如flow模型、VQ-VAE等，颇有人气，尤其是VQ-VAE及其变体VQ-GAN，近期已经逐渐发展到“图像的Tokenizer”的地位，用来直接调用NLP的各种预训练方法。
- 除此之外，还有一个本来更小众的选择——`扩散模型`（Diffusion Models）——正在生成模型领域“异军突起”，当前最先进的两个文本生成图像—— OpenAI 的 `DALL·E 2` 和 Google的`Imagen`，都是基于`扩散模型`来完成的。

生成扩散模型的大火，始于2020年所提出的[DDPM](https://arxiv.org/abs/2006.11239)（Denoising Diffusion Probabilistic Model），虽然也用了“**扩散模型**”这个名字，但事实上除了采样过程的形式有一定的相似之外，DDPM与传统基于`朗之万`方程采样的扩散模型完全不一样，一个新的起点、新的篇章。

### 扩散模型概览

【2023-4-5】扩散模型(Diffusion Model)首篇[综述](https://zhuanlan.zhihu.com/p/562389931) 
- [Diffusion Models: A Comprehensive Survey of Methods and Applications](https://arxiv.org/abs/2209.00796)
- 加州大学&Google Research的Ming-Hsuan Yang、斯坦福大学（OpenAI）的Yang Song（Score SDE一作）、北京大学崔斌实验室以及CMU、UCLA、蒙特利尔Mila研究院等众研究团队，首次对现有的扩散生成模型（diffusion model）进行了全面的总结分析，从diffusion model算法细化分类、和其他五大生成模型的关联以及在七大领域中的应用等方面展开，最后提出了diffusion model的现有limitation和未来的发展方向。

扩散模型（diffusion models）是深度生成模型中新的SOTA。其他的五种生成模型GAN，VAE，Autoregressive model, Normalizing flow, Energy-based model。
- 扩散模型在图片生成任务中超越了原SOTA：GAN，并且在诸多应用领域都有出色的表现，如计算机视觉，NLP、波形信号处理、多模态建模、分子图建模、时间序列建模、对抗性净化等。此外，扩散模型与其他研究领域有着密切的联系，如稳健学习、表示学习、强化学习。然而，原始的扩散模型也有缺点，它的采样速度慢，通常需要数千个评估步骤才能抽取一个样本；它的最大似然估计无法和基于似然的模型相比；它泛化到各种数据类型的能力较差。如今很多研究已经从实际应用的角度解决上述限制做出了许多努力，或从理论角度对模型能力进行了分析。
- ![](https://pic1.zhimg.com/80/v2-3ce40580db330cd3d35fb4db24aa2438_1440w.webp)

#### 论文

- 【2022-9-20】[扩散模型大全](https://github.com/heejkoo/Awesome-Diffusion-Models)
- hugginface的扩散模型包：[diffusers](https://github.com/huggingface/diffusers/tree/main/examples)，[colab笔记](https://colab.research.google.com/github/huggingface/notebooks/blob/main/diffusers/diffusers_intro.ipynb#scrollTo=13NnZ4rVioLs), demo: [stable-diffusion](https://huggingface.co/spaces/stabilityai/stable-diffusion)

经典论文
- 《Deep Unsupervised Learning using Nonequilibrium Thermodynamics》 2015年 扩散模型起源
- 《Denoising Diffusion Probabilistic Models》 2020年 扩散模型兴起, 对应[pytorch实现](https://github.com/lucidrains/denoising-diffusion-pytorch)
- 《Improved Denoising Diffusion Probabilistic Models》 2021年 第二篇论文的改进, 对应[pytorch实现](https://github.com/openai/improved-diffusion)

技术文章
- [The recent rise of diffusion-based models](https://maciejdomagala.github.io/generative_models/2022/06/06/The-recent-rise-of-diffusion-based-models.html) 可以了解到扩散模型近年比较经典的应用
- [Introduction to Diffusion Models for Machine Learning](https://www.assemblyai.com/blog/diffusion-models-for-machine-learning-introduction/) 从中可以了解到一个实现扩散模型的库denoising_diffusion_pytorch，博客中有使用案例
- [What are Diffusion Models?](https://lilianweng.github.io/posts/2021-07-11-diffusion-models/) 也是扩散模型的一个理论介绍博客，推导挺详细的
- [Diffusion Models as a kind of VAE](https://angusturner.github.io/generative_models/2021/06/29/diffusion-probabilistic-models-I.html) 探究了VAE和扩散模型的联系
- [The Annotated Diffusion Model](https://huggingface.co/blog/annotated-diffusion) 扩散模型理论和代码实现，代码我进行理解加了注释与理论对应，方便大家理解
- [An introduction to Diffusion Probabilistic Models](https://ayandas.me/blog-tut/2021/12/04/diffusion-prob-models.html) 也是一个介绍性博客，公式也很工整

[扩散模型原理和pytorch代码实现初学资料汇总](https://blog.csdn.net/qq_44941689/article/details/126513283)

#### 模型

模型下载
- [novelAI](https://huggingface.co/acheong08/secretAI/resolve/main/stableckpt/animefull-final-pruned/model.ckpt
stable_diffusion)
- [waifu_diffusion](https://huggingface.co/hakurei/waifu-diffusion-v1-3/resolve/main/wd-v1-3-float32.ckpt)
- [sd-v1-5](https://huggingface.co/CompVis/stable-diffusion-v-1-4-original/resolve/main/sd-v1-4.ckpt)
- [sd-v1-5](https://huggingface.co/runwayml/stable-diffusion-v1-5/resolve/main/v1-5-pruned-emaonly.ckpt)


### 扩散模型原理

扩散模型（Diffusion models）定义了正向和逆向两个过程，正向过程或称扩散过程是从真实数据分布采样，逐步向样本添加高斯噪声，生成噪声样本序列，加噪过程可用方差参数控制，当时，可近似等同于一个高斯分布。
- ![](https://pic4.zhimg.com/80/v2-32e400aab292cd75d7167368746fffcf_1440w.webp)

标准的`扩散模型`（diffusion models）涉及到**图像变换**（添加高斯噪声）和**图像反转**。但是扩散模型的生成并不强烈依赖于图像降解的选择。通过实验证明了基于完全确定性的降解（例如模糊、masking 等），也可以轻松训练一个扩散生成模型。
- [项目地址](https://github.com/arpitbansal297/cold-diffusion-models)
- [论文地址](https://arxiv.org/abs/2208.09392)
这个工作成功地质疑了社区对扩散模型的理解：它并非依赖于**梯度郎之万动力学**（gradient Langevin dynamics）或**变分推理**（variational inference）。


准确来说，`DDPM`叫“**渐变模型**”更为准确一些，扩散模型这一名字反而容易造成理解上的误解，传统扩散模型的**能量模型**、**得分匹配**、`朗之万`方程等概念，其实跟DDPM及其后续变体都没什么关系。
- DDPM的数学框架其实在ICML2015的论文《Deep Unsupervised Learning using Nonequilibrium Thermodynamics》就已经完成了，但DDPM是首次将它在高分辨率图像生成上调试出来了，从而引导出了后面的火热。由此可见，一个模型的诞生和流行，往往还需要时间和机遇


### 扩散模型不足

原始扩散模型的三个主要缺点，采样速度慢，最大化似然差、数据泛化能力弱，并提出将的diffusion models改进研究分为对应的三类：采样速度提升、最大似然增强和数据泛化增强。我们首先说明改善的动机，再根据方法的特性将每个改进方向的研究进一步细化分类，从而清楚的展现方法之间的联系与区别。
- ![](https://pic3.zhimg.com/80/v2-fdd70cb55e77a157ba600b4329aa3796_1440w.webp)

未来研究方向
- A. 重审假设。需要重新审视和分析扩散模型中的许多典型假设。例如，假设扩散模型的正向过程完全消除了数据中的所有信息并且使其等效于先前分布可能并不总是成立。实际上，完全删除信息是在有限时间内无法实现，了解何时停止前向噪声处理以在采样效率和采样质量之间取得平衡是非常有意义的。
- B. diffusion model已经成为一个强大的框架，可以在大多数应用中与生成对抗性网络（GAN）竞争，而无需诉诸对抗性训练。对于特定的任务，我们需要了解为什么以及何时扩散模型会比其他网络更加有效，理解扩散模型和其他生成模型的区别将有助于阐明为什么扩散模型能够产生优秀的样本同时拥有高似然值。另外，系统地确定扩散模型的各种超参数也是很重要的。
- C. diffusion model如何在隐空间中提供良好的latent representation，以及如何将其用于data manipulation的任务也是值得研究的。
- D. 将diffusion model和generative foundation model结合，探索更多类似于ChatGPT，GPT-4等有趣的AIGC应用

### 模型改进

#### ControlNet

文本生成图像只需要用户输入文本(Prompts)就可以实现图像生成，但是由于扩散模型本身特性（diversity较强），生成的图像往往不受控制，不见得能精准满足用户的需求，如何提升生成的可控性？

【2023-4-4】[ControlNet: 给以文生图模型添加条件约束](https://zhuanlan.zhihu.com/p/608161469)
- Stable Diffusion (SD)模型，添加**额外**条件（Edge Map, Sketch, Depth Info, Segmentation Map, Human Pose, Normal Maps）做**受控**图像生成的方法，主要思路在SD模型中为添加与UNet结构类似的ControlNet以学习额外条件信息，映射进参数固定的SD模型中，完成条件生成。
- 【2023-2-10】论文 [Adding Conditional Control to Text-to-Image Diffusion Models](https://arxiv.org/pdf/2302.05543.pdf)
- [ControlNet代码](https://github.com/lllyasviel/ControlNet), [model](https://huggingface.co/lllyasviel/ControlNet/tree/main)
- ![](https://pic4.zhimg.com/80/v2-a223547711e54464811ec00a01e6a367_1440w.webp)
- 固定原始网络参数，复制一个可以训练的拷贝网络，对于输入的条件c，通过零卷积(zero convolution)，与网络原本的输入x进行特征加和，之后对于拷贝网络的输出，同样通过领卷积处理后与原始网络进行特征加和，输出最终的结果。
- 零卷积(zero convolution):权重和偏置都是用0初始化的1 x 1卷积。
- 零卷积的好处：在训练刚开始的阶段，controlNet的输出对原始网络没有影响，这样之后的任何优化基本上等同于在finetune这个模型，速度会比较快。
- ![](https://pic4.zhimg.com/80/v2-a87dde8bbc7562ef282f4f7cc8f31e47_1440w.webp)

实验效果

|受控条件|效果|备注|
|---|---|---|
| Canny Edge | ![](https://pic4.zhimg.com/80/v2-94c287574b4f7dd8e66a94c21ae16df7_1440w.webp)||
| Hough Lines| ![](https://pic2.zhimg.com/80/v2-a2b3d0aaa8c6e7d8dd07f84fb68ce81d_1440w.webp) ||
| Human Scribbles | ![](https://pic2.zhimg.com/80/v2-166ee3740b1d8f5fbce1b5d9b812094d_1440w.webp)||
| HED boundary map | ![](https://pic4.zhimg.com/80/v2-6e89cd43a5de03be8588a42da98ef2a3_1440w.webp)||
| Human Pose | ![](https://pic1.zhimg.com/80/v2-98a946f44d307cab1500bb8b332261a4_1440w.webp) ||
| Segmentation Map | ![](https://pic1.zhimg.com/80/v2-60c525ddbad89d196bd3f412b260d6a8_1440w.webp) ||
| Cartoon Line Drawing | ![](https://pic1.zhimg.com/80/v2-d98b515e5991e6b040bb0eac31130e24_1440w.webp) ||



## AI 作画

文本生成图片

【2023-1-31】[从ChatGPT说起，AIGC生成模型如何演进](https://m.gelonghui.com/p/572090)

从技术实现突破、到技术提升、再到规模化降低门槛，AI创作能力也不断提升。
- 2022年10月，美国一名男子用AI绘画工具Midjourney，生成了一幅名为《太空歌剧院》的作品，并获得了第一名。这引起了一波不小的争论，也终于形成了一条新赛道。
- 于是，2022年以AI绘画为代表的各种生成式AI工具，如雨后春笋般疯狂冒尖，比如盗梦师、意间AI、6pen、novelAI等等。

### 汇总

AI作画三巨头
- Mid Journey : 地表最强AI
- Stable Diffusion : 低调神秘慈善家
- Dall-E 2 : 甲方终结者

Midjourney 的内容限制确实比其他竞争对手（例如 OpenAI 的 DALL-E）更宽松，但目前的管控宽松之王仍然是 Stable Diffusion。

可使用的AI作画平台
- github: [awesome-ai-painting](https://github.com/hua1995116/awesome-ai-painting)

#### 📪 国外

|Name                   | Tags   |URL                |
|-----------------------|-----------|----------------------------------------------|
|midjourney             |新用户免费20次|https://www.midjourney.com/                         |
|wombo.art              |免费      |https://app.wombo.art/          |
|Google Colab           |免费      |https://colab.research.google.com/github/huggingface/notebooks/blob/main/diffusers/stable_diffusion.ipynb#scrollTo=yEErJFjlrSWS|
|DALL·E 2               |排队申请    |https://openai.com/dall-e-2/                          |
|artbreeder             |免费      |https://www.artbreeder.com/beta/collage             |
|dreamstudio            |200点数   |https://beta.dreamstudio.ai/                          |
|nightcafe              |-       |https://creator.nightcafe.studio/create/text-to-image?algo=stable                                                              |
|starryai      |-       |https://create.starryai.com/my-creations                                   |
|webui        |免费      |https://colab.research.google.com/github/altryne/sd-webui-colab/blob/main/Stable_Diffusion_WebUi_Altryne.ipynb                 |
|替换图片    | 免费      |https://colab.research.google.com/drive/1R2HJvufacjy7GNrGCwgSE3LbQBk5qcS3?usp=sharing  |
|webui-AUTOMATIC1111版本  | 免费  |https://colab.research.google.com/drive/1Iy-xW9t1-OQWhb0hNxueGij8phCyluOh     |
|生成视频      |免费      |https://github.com/THUDM/CogVideo         |
|PS插件-绘画生成图片    |-       |https://www.nvidia.com/en-us/studio/canvas/      |
|3D模型       |免费      |https://colab.research.google.com/drive/1u5-zA330gbNGKVfXMW5e3cmllbfafNNB?usp=sharing   |
|[elbo](https://art.elbo.ai/lbo)|-       |https://art.elbo.ai/           |
|deepdreamgenerator|-       |https://deepdreamgenerator.com/     |
|big-sleep|免费       |https://github.com/lucidrains/big-sleep/       |
|nightcafe|-       |https://nightcafe.studio/       |
|craiyon|-       |https://www.craiyon.com/          |
|novelai|-       |https://novelai.net/          |
|novelai 免费版|免费 |https://github.com/JingShing/novelai-colab-ver |
|Sd-Outpainting|免费 |https://github.com/lkwq007/stablediffusion-infinity |
|TyPaint|免费 |https://apps.apple.com/us/app/typaint-you-type-ai-paints/id1624024392 |
|PicSo|新用户每天免费10次 |https://picso.ai/ |
|sd-outpaing|免费 |https://github.com/lkwq007/stablediffusion-infinity |
|novelai-colab 版本|免费 |https://github.com/acheong08/Diffusion-ColabUI |
|novelai-colab 版本2|免费 |https://github.com/JingShing/novelai-colab-ver |


#### 🚴🏻 国内

|Name         | 价格  |URL             |
|-------------|----|--------------------|
|[文心大模型](https://wenxin.baidu.com/moduleApi/ernieVilg?uid=1662457087375_978&traceid= )       |暂时免费|https://wenxin.baidu.com/moduleApi/ernieVilg                                                 |
|文心-一格 |暂时免费|https://yige.baidu.com/#/  |
|6pen   |部分免费|https://6pen.art/        |
|MewxAI人工智能   | 免费 | 微信小程序   |
|[MuseArt](https://link.zhihu.com/?target=https%3A//www.feishu.cn/invitation/page/add_contact/%3Ftoken%3Ddd8o7895-6809-42b5-9509-fe7d1c33216c)|付费 + 看广告|微信小程序搜 MuseArt |
|大画家Domo  |-   |https://www.domo.cool/    |
|盗梦师   |有免费次数 + 付费   |微信小程序搜盗梦师   |
|画几个画    |-   |微信小程序搜画几个画    |
|Niko绘图   |免费 + 看广告 |微信小程序搜Niko绘图     |
|飞链云AI绘画版图  |免费 |https://ai.feilianyun.cn/ |
|[Freehand意绘](https://freehand.yunwooo.com/)    |免费  |https://freehand.yunwooo.com/|
|即时AI  |免费    |https://js.design/pluginDetail?id=6322a4ab0eededcff6ba451a|
|意见AI绘画   |有免费次数 + 付费   |微信小程序搜意见AI绘画|
|PAI |免费 |https://artpai.xyz/|
|爱作画 | 有免费次数 + 付费 |https://aizuohua.com/|
|皮卡智能AI | 免费 |https://www.picup.shop/text2image.html#/ |

### Stable Diffusion

Stable Diffusion is a state of the art text-to-image model that generates images from text.
- transformers上的 [Stable Diffusion Demo](https://huggingface.co/spaces/stabilityai/stable-diffusion)
- For faster generation and forthcoming API access you can try [DreamStudio Beta](http://beta.dreamstudio.ai/)
- <iframe src="https://beta.dreamstudio.ai/dream">

本地部署
- 模型比较大，所以必须要有NVIDIA GPU，至少4GB VRAM，本地磁盘至少有15GB的空间，我们打包的项目解压后需要11G的磁盘。

【2023-4-3】[Kaggle Stable Diffusion赛题 高分思路](https://mp.weixin.qq.com/s/LDWa7sR__MFjbj0CTHajcA)

#### 介绍

Stable Diffusion 是以文本生成图像的 AI 工具，`慕尼黑大学`的CompVis小组开发，基于潜在扩散模型打造，也是**唯一**一款能部署在家用电脑上的 AI 绘图工具，可以在 6GB 显存显卡或无显卡（只依赖 CPU）下运行，并在几秒钟内生成图像，无需预处理和后处理。
- [stability ai](https://stability.ai/) 公司以此为基础

[Stable Diffusion](https://stablediffusionweb.com/)
- Stable Diffusion is a latent text-to-image diffusion model capable of generating photo-realistic images given any text input, cultivates autonomous freedom to produce incredible imagery, empowers billions of people to create stunning art within seconds.
- [demo](https://stablediffusionweb.com/#demo)

#### 体验方法

体验方法
- （1）在线工具：[Hugging Face](https://huggingface.co/spaces/stabilityai/stable-diffusion) 和 [DreamStudio](https://beta.dreamstudio.ai/)。与本地部署相比
  - [Hugging Face](https://huggingface.co/spaces/stabilityai/stable-diffusion)需排队，生成一张图约 5 分钟；
  - [DreamStudio](https://beta.dreamstudio.ai/) 可免费生成 200 张图片，之后需要缴费。
  - 注意：这类在线工具对图片的调教功能偏弱，无法批量生成图片，只能用于测试体验。
- （2）本地部署：适合大批量使用，[参考](https://zhuanlan.zhihu.com/p/563073449)
  - Docker Desktop 将 [Stable Diffusion WebUI Docker](https://github.com/AbdBarho/stable-diffusion-webui-docker) 部署在 Windows 系统，从而利用 NVIDIA 显卡免费实现 AI 文字绘画，不再被在线工具所限制。Mac 同样适用于该方法，并可省略下方的环境配置步骤。
  - ![](https://pic4.zhimg.com/80/v2-3ee8f0fad4499798263ae5d8295574b3_1440w.webp)

#### 如何画出好作品？

官方文档描述文字的要素和标准。

样例：
> A beautiful painting (画作种类) of a singular lighthouse, shining its light across a tumultuous sea of blood (画面描述) by greg rutkowski and thomas kinkade (画家/画风), Trending on artstation (参考平台), yellow color scheme (配色)。

要素
- **画作种类**：ink painting（水墨画），oil painting（油画），comic（漫画），digital painting（数字印刷品），illustration（插画），realistic painting（写实画），portrait photo（肖像照）等等，可叠加多个种类描述。
- **参考平台**：Trending on artstation，也可以替换为「Facebook」「Pixiv」「Pixbay」等等。下方提供相同参数下不同参考平台生成的图片风格。
- **画家/画风**：成图更接近哪位画家的风格，此处可以输入不止一位画家，如「Van Gogh:3」and「Monet:2」，即作品三分像梵高，两分像莫奈；或直接描述风格种类，如 very coherent symmetrical artwork，将作品结构设为连贯对称的。
- **配色**：yellow color scheme 指整个画面的主色调为黄色。
- **画面描述**：除了对主题进行描述，还可以添加多个画面元素，如 beautiful background, forest, octane render, night；添加画面质量描述，如 highly detailed, digital painting, Trending on artstation, concept art, smooth, sharp focus, illustration,8k。


### MidJourney

Mid 是一款搭载在`discord`上的人工智能绘画聊天机器人
- Midjourney 5 显著提高 了人物图像的描绘质量。例如，以往 AI 生成图像总是处理不好手部形态，这在新版本中已不再是问题。光照和面料质感更加真实，新系统还能生成无数名人和公众人物的形象。

`Midjourney` 的工作机制与 `Stable Diffusion` 和 `DALL-E` 等图像合成器相近，它使用了经过数百万人造艺术作品训练的 AI 模型，根据称为“提示”的文本描述生成图像。

【2023-3-17】Midjourney 发布了其商用 AI 图像合成服务的第 5 版。该服务可以生成非常逼真的图像，其质量水平极高，一些 AI 艺术爱好者认为这些输出令人毛骨悚然且“过于完美”。Midjourney v5 现在处于 alpha 测试阶段，提供给订阅 Midjourney 服务的客户，该服务可通过 Discord 获取。

【2023-3-30】图像生成器 Midjourney 已叫停免费试用。公司创始人 CEO David Holz 在采访中表示，此举的主要原因是新用户的大量涌入，很多人为了回避付费而注册一次性账户。存在“怪异需求和试用滥用”，可能来自中国的一段操作教学视频，再加上 GPU 临时性短缺，导致付费用户的服务陷入了瘫痪
- 跟 Midjourney 最近生成的一系列病毒式传播图像有关。包括 Trump 被捕和教皇身着时尚夹克的伪造图像，都被部分网民误认为真实存在。

一个AI 生成算图工具，只需输入文字就会自动产生图像，Midjourney目前架设在Discord频道上，因此需要有Discord帐号才能使用。
- [Discord](https://discord.com)是一款专为社群设计的免费通讯社交软体，类似于LINE或Slack，但功能更为强大，自带机器人与各种程式功能，能够在上面发开自己工具，有网页版与手机版APP。

使用方法 [参考](https://zhuanlan.zhihu.com/p/527544265)
- #Newbies从侧边栏中选择一个频道
- 使用 /imagine 命令+空格输入关键词
- ![](https://pic2.zhimg.com/80/v2-b99e9339ad0f79a68a152b0f7b71d965_1440w.webp)
- 等待 MidJourney 机器人处理您的请求。 请求需要一分钟才能根据您的提示生成四个选项。


### Disco Diffusion

Disco Diffsion 存在问题

基于多模态图像生成模型 Disco Diffusion（DD）进行 AI 创作目前存在以下几个问题：
- （1）生成图像质量参差不齐：根据生成任务的难易程度，粗略估算描述内容较难的生成任务良品率 20%～30%，描述内容较容易的生成任务良品率 60%～70%，大多数任务良品率在 30～40% 之间。
- （2）生成速度较慢+内存消耗较大：以迭代 250 steps 生成一张 1280*768 图像为例，需要大约花费 6分钟，以及使用 V100 16G 显存。
- （3）严重依赖专家经验：选取一组合适的描述词需要经过大量文本内容试错及权重设置、画家画风及艺术社区的了解以及文本修饰词的选取等；调整参数需要对 DD 包含的 CLIP 引导次数/饱和度/对比度/噪点/切割次数/内外切/梯度大小/对称/... 等概念深刻了解，同时要有一定的美术功底。众多的参数也意味着需要较强的专家经验才能获得一张还不错的生成图像。


### DALL·E

DALL·E由OpenAI在2021年初提出，旨在训练一个输入文本到输出图像的自回归解码器。由CLIP的成功经验可知，文本特征和图像特征可以编码在同一特征空间中，因此我们可以使用Transformer将文本和图像特征自回归建模为单个数据流（“autoregressively models the text and image tokens as a single stream of data”）。

DALL·E的训练过程分成两个阶段，一是训练一个变分自编码器用于图像编解码，二是训练一个文本和图像的自回归解码器用于预测生成图像的Tokens，如图所示。
- ![](https://pic4.zhimg.com/80/v2-fe456ce3b3d44ca8b55130a9808587b7_1440w.webp)

推理过程则比较直观，将文本Tokens用自回归Transformer逐步解码出图像Tokens，解码过程中我们可以通过分类概率采样多组样本，再将多组样本Tokens输入变分自编码中解码出多张生成图像，并通过CLIP相似性计算排序择优
- ![](https://pic4.zhimg.com/80/v2-18c8e60881c49e29b2684a8d59890817_1440w.webp)

### DALL·E 2

为了进一步提升图像生成质量和探求文本-图像特征空间的可解释性，OpenAI结合扩散模型和CLIP在2022年4月提出了DALL·E 2，不仅将生成尺寸增加到了1024*1024，还通过特征空间的插值操作，可视化了文本-图像特征空间的迁移过程。

如图所示，DALL·E 2将CLIP对比学习得到的text embedding、image embedding作为模型输入和预测对象，具体过程是学习一个先验Prior，从text预测对应的image embedding，文章分别用自回归Transformer和扩散模型两种方式训练，后者在各数据集上表现更好；再学习一个扩散模型解码器UnCLIP，可看做是CLIP图像编码器的逆向过程，将Prior预测得到的image embedding作为条件加入中实现控制，text embedding和文本内容作为可选条件，为了提升分辨率UnCLIP还增加了两个上采样解码器（CNN网络）用于逆向生成更大尺寸的图像。
- ![](https://pic4.zhimg.com/80/v2-9c369b9f54f1491f8954928584de96d7_1440w.webp)

### lexica

【2023-3-30】[lexica](https://lexica.art/aperture)
- 图片搜索：语义搜索
- 图片生成：可控部分除了描述图片的文字，还可以设置负向提示（prompt）

### Tiktok

【2022-8-16】[TikTok 乱拳打死老师傅：硅谷大厂还在发论文，它产品已经上线了](https://www.sohu.com/a/577300364_114819)
- 不少家互联网大厂都在试图测试、开发 AI 文字转图片技术，结果没想到，TikTok 却率先将这项技术应用到了产品里，在 AI 创作潮流中异军突起。
- TikTok 的特效菜单下，最近增加了一个名叫“AI 绿幕” (AI Greenscreen) 的新选项。
- 点击这个选项，然后在屏幕中间的对话框里输入一段文字描述，只用不到5秒的时间，TikTok 就可以根据文字描述生成一张竖版画作，用作短视频的背景：
- ![](https://p3.itc.cn/q_70/images03/20220816/5fdb55b70e054099a88ea6bc5bfeca09.png)
- 生成结果具有非常强的水彩/油画感觉，风格迁移 (style transfer) 的痕迹明显，而且用的颜色也都鲜亮明快，给人一种耳目一新的感受。
- ![](https://p4.itc.cn/q_70/images03/20220816/902b3d3e8e8d45e0aba3be1bdf1694e6.png)

### IDEA 太乙

在StabilityAI发布Stable Diffusion模型之后不久，国内的`IDEA`研究院`封神榜`团队很快就训练出了名为“`太乙`”的中文版Stable Diffusion。与原版的Stable Diffusion不同，太乙Stable Diffusion可以更好地理解中文的语言文化环境。
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TWUr4QTEmySohL~noop.image?_iz=58558&from=article.pc_detail&x-expires=1678177682&x-signature=gYfmYX%2FkWUzH%2F7pJHBy4fObMzkk%3D)

### 文心一格

- 【2022-8-23】[国产AI作画神器火了，更懂中文，竟然还能做周边](https://mp.weixin.qq.com/s/xh6Q0Pnv9OfP8Je3lDiyZg), “一句话生成画作”这个圈子里，又一个AI工具悄然火起来了,不是你以为的Disco Diffusion、DALL·E，再或者Imagen……而是全圈子都在讲中国话的那种, [文心·一格](https://yige.baidu.com/#/)
  - 操作界面上，Disco Diffusion开放的接口不能说很复杂，但确实有点门槛。它直接在谷歌Colab上运行，需要申请账号后使用（图片生成后保存在云盘），图像分辨率、尺寸需要手动输入，此外还有一些模型上的设置。好处是可更改的参数更多，对于高端玩家来说可操作性更强，只是比较适合专门研究AI算法的人群;相比之下，文心·一格的操作只需三个步骤：输入文字，鼠标选择风格&尺寸，点击生成。
  - 提示词，Disco Diffusion的设置还要更麻烦一些。除了描述画面的内容以外，包括画作类别和参考的艺术家风格也都得用提示词来设置，通常大伙儿会在其他文档中编辑好，再直接粘过来。相比之下文心·一格倒是没有格式要求，输入150字的句子或词组都可以
  - 性能要求上，Disco Diffusion是有GPU使用限制的，每天只能免费跑3小时。抱抱脸（HuggingFace）上部分AI文生图算法的Demo虽然操作简单些，但一旦网速不行，就容易加载不出来; 文心·一格除了使用高峰期以外，基本上都是2分钟就能生成，对使用设备也没有要求。
  - 总体来看，同样是文字生成图片AI，实际相比文心·一格的“真·一句话生成图片”，DALL·E和Disco Diffusion的生成过程都不太轻松。

看似“一句话生成图片”不难，其实对AI语义理解和图像生成能力提出了进一步要求。
- 为了能更好地理解文本、提升输出效果，文心·一格还在百度文心的图文生成跨模态模型ERNIE-VilG的基础上，进行了更详细的优化。
- 为了提升图文理解能力，在知识增强的基础上，引入跨模态多视角对比学习；
- 为了降低输入要求同时提升效果，采用基于知识的文本联想能力，让模型学会自己扩展提示词的细节和风格；
- 为了提升图像生成能力，采用渐进式扩散模型训练算法，让模型来选择效果最好的生成网络。


StableDiffusion 图像生成能力一探！Int8量化教程与ONNX导出推理
- CPU下推理StableDiffusion，以及OpenVINO加速的代码，同时，也包含了量化脚本

```shell
#git clone https://github.com/luohao123/gaintmodels
git clone https://huggingface.co/CompVis/stable-diffusion-v1-4
git lfs install
cd stable-diffusion-v1-4
git lfs pull
```

测试StableDiffusion
- 来看看生成的效果，由于模型只能编码英文，我们就以英文作为promopt。
- A green car with appearance of Tesla Model 3 and Porsche 911
- A robot Elon Musk in cyberpunk, driving on a Tesla Model X


### 【微软】images creator

【2023-3-21】[images creator](https://cn.bing.com/images/create?FORM=GENILP)

### 自定义图片的text2image

【2022-9-7】[An Image is Worth One Word: Personalizing Text-to-Image Generation using Textual Inversion](https://textual-inversion.github.io/)
- [github-textual_inversion](https://github.com/rinongal/textual_inversion)
- 基于潜在扩散模型（Latent Diffusion Models, LDM），允许用户使用自然语言指导 AI 生成包含特定独特概念的图像。
- 例如我想将心爱的宠物猫咪变成一幅独特的画作——抽象派猫猫，只需要提供3-5张照片，然后通过控制自然语言输入，来得到一个我家猫咪的抽象画作。
- 简单介绍下过程：首先，模型会通过学习这些图片，使用一些单词去表示图片。其次，这些单词可以组合成自然语言句子，通过 prompt 形式指导模型进行个性化创作。好处在于，图像的自然语言表示对用户非常友好。用户可以自由修改 prompt 内容以获取他们想要的风格、主题和独一无二的结果。
- We learn to generate **specific concepts**, like personal objects or artistic styles, by describing them using new "words" in the embedding space of pre-trained **text-to-image** models. These can be used in new sentences, just like any other word.
- Our work builds on the publicly available [Latent Diffusion Models](https://github.com/CompVis/latent-diffusion)
- ![](https://textual-inversion.github.io/static/images/editing/teaser.JPG)
- ![](https://textual-inversion.github.io/static/images/training/training.JPG)



# 结束