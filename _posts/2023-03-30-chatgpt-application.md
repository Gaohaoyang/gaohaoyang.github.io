---
layout: post
title:  ChatGPT应用
date:   2023-03-30 19:10:00
categories: 深度学习 自然语言处理
tags: AIGC ChatGPT 智能客服
excerpt: ChatGPT应用思考
mathjax: true
permalink: /chatgpt_application
---

* content
{:toc}


# ChatGPT应用

OpenAI CEO奥特曼那句AI版摩尔定律：
> 宇宙中的智能数量每18个月翻一番。

- 模态：文本，语音，图像，视频，建模，策略，跨模态…
- 产业：传统，新兴，机器人，脑机…

从一个风靡全球的AI玩具到独具潜力的赚钱法宝，对话机器人ChatGPT仅仅用了不到半年。
- 微软联合创始人比尔·盖茨称GPT是“40多年来最革命性的技术进步”
- 英伟达创始人黄仁勋高呼：“我们正处于AI的iPhone时刻”
- 阿里董事会主席兼CEO张勇也说：“所有行业都值得用大模型重做一遍。”

## ChatGPT 大事记

ChatGPT2022年12月发布，但真正火到出圈，是春节后，尤其是3月之后的事情了。ChatGPT一石激起千层浪，过去的3月可能是LLM领域最为[波澜万丈的一个月](https://zhuanlan.zhihu.com/p/619567516?)。
- 3月1日，OpenAI发布ChatGPT API
  - OpenAI不止发布了ChatGPT的API，还发布了新版的Whisper（一个语音识别模型）的API。主角当然还是ChatGPT了，借助API各类相关应用如雨后春笋一般出现，例如 ChatPDF，ChatPaper等等。同时还有API定价，居然和GPT3差不了多少，再次印证了那个假设：ChatGPT的参数量应该和GPT3差异不大。
- 3月8日，Facebook的LLaMA模型被“泄露”
  - LLaMA是Facebook于2月24日“开源”的大模型，包含了多个不同参数量的预训练的模型。最初这个模型是需要向Facebook申请并遵守License才能获取到的，后来惨遭“泄漏”，现在可以从HuggingFace中直接下载。
  - LLaMA-13B不仅在大多数benchmarks上超过了GPT-3，证实百亿参数的预训练模型作为基座，有所作为。
- 3月10日，HuggingFace发布peft的0.2.0版本
  - peft是HuggingFace开发的一个参数高效的微调库（Parameter-Efficient Fine-Tuning）。此次发布特别提到了Whisper large tuning using PEFT LoRA+INT-8 on T4 GPU，HuggingFace要打造大模型微调标准库的野望。HuggingFace原本定位是预训练模型届的github，用户需要实现什么功能，就要到HuggingFace的平台上去找对应任务的模型。如今ChatGPT已经出来了，一个模型可以解决几乎所有NLP问题，HuggingFace作为模型平台看起来就感觉用处不大了，所以不难理解HuggingFace的危机感。
- 3月13日，斯坦福发布Alpaca 7B
  - Alpaca-7B是斯坦福发布的基于LLaMA-7B继续微调得到的模型。训练所用的52K的instruction-following demonstrations，通过调用text-davinci-003(GPT3.5)得到。
  - 最终实验结果表明Alpaca-7B的表现和text-davinci-003相似，整个训练花费仅有不到600美元。Alpaca-7B的出现，证明了用很小成本也是可以一定程度上可以复现大模型的表现，极大地振奋了整个开源社区的信心。此后不久，基于lora等参数高效的微调方法，开源社区很快实现了在单张显卡、消费级显卡的训练。
- 3月14日，OpenAI发布GPT4
  - GPT4相对于GPT3/3.5的改进集中在两点：一是支持**多模态**理解，以前只允许输入文字，现在也可以支持图片作为输入；另一点则是GPT4的**逻辑推理**能力得到进一步增强，很多用户经过测试也证明了这一点。
  - GPT4的发布并没有像GPT1/2/3/3.5那样有对应的论文，OpenAI只发布了一篇技术报告，报告中没有提到任何训练的细节，例如训练集的构造方法、训练消耗的电力、learning rate/epoch count/optimizer等超参...OpenAI声称不公布的原因是“the competitive landscape and the safety implications of large-scale models”，但并不妨碍OpenAI被调侃为“CloseAI”。
- 3月15日，清华发布chatglm-6b
  - ChatGLM-6B是一个清华开源的、支持中英双语的对话语言模型，基于GLM架构，具有62亿参数。结合模型量化技术，ChatGLM-6B可以在消费级的显卡做模型的推理和训练，对于缺卡缺钱的研究团队来说非常有用。毫无疑问，这是当前中文领域最为活跃的开源大模型，截至目前（2023.4.2），huggingface上ChatGLM-6B的下载量达到了33万。
- 3月16日，pytorch2.0发布
  - 在众多算法产品和技术的璀璨之下，pytorch2.0的发布不那么突出了。这次2.0版本最重要的特性之一是把torch.**compile**作为主API，此外还针对性能做了很多优化。遥想2020年初那会，tensorflow的2.0版本也是刚刚发布，彼时大多数公司借着把骨干网络换成transformer的时候，就把深度学习框架也换成了pytorch，顺带也带来了HuggingFace的蓬勃发展。
- 3月16日，百度发布“文心一言”
  - 百度发布的“文心一言”，号称中文版的ChatGPT。但是发布会上百度CEO李彦宏也坦言，“文心一言要对标GPT-4，这个门槛还是很高的。文心一言并不完美，之所以现在要发布，原因在于市场有强烈需求。”
- 3月23日，OpenAI发布ChatGPT Plugin
  - OpenAI发布的ChatGPT Plugin提供一种大语言模型应用特定领域知识或者能力的新思路。在这之前的应用开发商例如ChatPDF，思路都是调用ChatGPT的API，再结合开发上自由的能力，整合为一个产品提供给用户。而ChatGPT Plugin实现了一种依赖的翻转，首先开发商提供API给ChatGPT，再由ChatGPT决定何时以及如何使用这些API，这些API就是所谓的“插件”。在这种模式下，用户的交互全部都在ChatGPT中完成，可谓是“肥水不流外人田”。
- 3月29日，众多大佬签名反对下一代大模型的开发
  - 众多大佬签名了公开信，反对下一代大模型的研发，号召AI实验室在至少未来6个月内，暂停训练比GPT4更强的大模型。《全球通史》中，斯塔夫里阿诺斯有一个核心的观点：“在技术变革和使之成为必需的社会变革之间,存在一个时间差。造成这个时间差的原因在于:技术变革能提高生产率和生活水平,所以很受欢迎,且很快便被采用;而社会变革则由于要求人类进行自我评估和自我调整,通常会让人感到受威逼和不舒服,因而也就易遭到抵制。社会变革滞后于技术变革一直是人类许多灾难的根源。”将来回望历史时，2023年的3月毫无疑问是一段技术大变革的爆发期，但是与之相匹配的社会变革，或许我们接下来还要探索很长时间。

## ChatGPT 变现

### 教人如何挣钱

【2023-4-11】国内靠ChatGPT挣钱的[第一波人](https://www.toutiao.com/w/1762574053066767)，主要教别人怎么靠ChatGPT挣钱的。快速包装交付、精准找到愿意为这些信息差付费的客群
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/cb048fac14c04e40914e28fbe538da2f~tplv-obj:823:813.image?_iz=97245&from=post&x-expires=1688947200&x-signature=LMhWJtDCvvO44zYNtOtnKVj%2BnQQ%3D)

评论
> 有钱赚他自己不赚，也不教给他父母兄弟姐妹去赚，他教给陌生的你？

### Prompt 编写

Prompt是在ChatGPT中输入的一些关键词，按照用户意愿生成出各种各样的内容，提高工作效率。
- Prompt的好处是不仅可以大大减少思考时间，还可以让创造力更加丰富多彩。

详见站内专题：[ChatGPT提示工程](https://wqw547243068.github.io/chatgpt#%E6%8F%90%E7%A4%BA%E5%B7%A5%E7%A8%8B)

#### AIPRM

有人组织了社区来工具化优质prompt，集人类智慧形成普惠大众的工具 —— AIPRM， 自动生成优质Prompt的工具
- AIPRM 全称：Artificial Intelligence Project Resource Manager
- 要解决的问题就是通过社区互助提高使用AI产品的生产力（比如chatGPT）
- ![](https://pic3.zhimg.com/80/v2-24a428805505f96e183f040cf2397e02_1440w.webp)
- ![](https://pic2.zhimg.com/80/v2-423bc023da6630c8cdd0cacaabd88145_1440w.webp)

【2023-4-11】[终极写作工具：小白也会用的ChatGPT Prompt提示综合指南](https://zhuanlan.zhihu.com/p/611365958)
- [AIPRM](https://www.aiprm.com/)
- Chrome 插件：[aiprm-for-chatgp](https://chrome.google.com/webstore/detail/aiprm-for-chatgpt/ojnbohmppadfgpejeebfnmnknjdlckgj?hl=en)

### 点子

【2023-5-13】ChatGPT各类应用idea汇总，包含场景、当前解法、解决状态等，持续更新
- [飞书文档](https://bytedance.feishu.cn/sheets/TcHTsRSczhda3BtpLQ4cMeVNnSf)


## ChatGPT 应用

ChatGPT 非常实用，能帮助普通人节省不少脑力和时间成本。
- 回答后续问题、承认错误、挑战不正确的前提、拒绝不适当的请求。

ChatGPT在办公软件、社交文娱、营销广告、家庭助理四大方向的15条赛道，AI大模型技术正出现落地的萌芽。其中不仅有国民级的Office工具、钉钉等协同办公平台接入大模型，还有来自办公、电商、家居、社交文娱互联网平台推出AIGC功能，甚至以智能汽车、AR眼镜为代表的实体终端也上了大模型，带来新奇体验。

【2023-5-11】生成式AI创业领域
- ![](https://pic3.zhimg.com/80/v2-bdd24bc6e1db0c18c5d8f616dcc578be_1440w.webp)
- [全面接入！ChatGPT杀进15个商业应用，让AI替你打工](https://zhuanlan.zhihu.com/p/628096018)

### 受益方

相关受益方
- 上游增加需求
  - 算力芯片、数据标注、自然语言处理（NLP)等。
- 下游相关受益应用，包括但不限于： 
  - 无代码编程、小说生成、对话类搜索引擎、语音陪伴、语音工作助手、对话虚拟人、人工智能客服、机器翻译、芯片设计等。
- 功能（C端）
  - 一款激起新鲜感的**新奇玩具**，也是一款消磨无聊时光的**聊天高手**，也能成为生产力爆表的**效率工具**，更可以被用作上通天文下知地理的**知识宝库**。
  - ChatGPT不仅在日常对话、专业问题回答、信息检索、内容续写、文学创作、音乐创作等方面展现出强大的能力，还具有生成代码、调试代码、为代码生成注释的能力。
- ![img](https://pic2.zhimg.com/80/v2-b9ad448881e01271b30377a2be17caad_1440w.webp)

人们源源不绝地挖掘ChatGPT的更多技能，包括替写代码、作业、论文、演讲稿、活动策划、广告文案、电影剧本等各类文本，或是给予家装设计、编程调试、人生规划等建议。
- ![49个功能](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TV46RMq7ttyVO3~noop.image?_iz=58558&from=article.pc_detail&x-expires=1676360394&x-signature=PDoTaKf5nJWW3eO5rMA8a0GzyCw%3D)

ChatGPT也可以与其他AIGC模型联合使用，获得更加炫酷实用的功能。这极大加强了AI应用与客户对话的能力，使我们看到了AI大规模落地的曙光。
- 通过对话生成客厅设计图。
- ![](https://pic2.zhimg.com/80/v2-cda1af4d2f17bd11dce94cafd580dd61_1440w.webp)

【2023-3-2】[普通人如何用ChatGPT搞钱？](https://mp.weixin.qq.com/s/2vPOOsesAh8d5SUZqvVKgA)
- 1、让ChatGPT写小说
  - 著名大V半佛仙人表示人家已经提前试过，效果并没有那么理想：
- 2、让ChatGPT做培训
  - 其他行业我不清楚，但在计算机行业，用ChatGPT来指导学生写代码，纠正代码问题还是效果不错的，把ChatGPT包装成一个虚拟的培训老师，很有想法。
- 3、山寨版ChatGPT
  - 高能提醒: 违法! 发出来只是让大家提高警惕，别花冤枉钱被骗了！
  - 有人在想着怎么用ChatGPT搞钱，而另外有人在想着：你们这么想用ChatGPT，如何利用这一点搞钱！
- 4、让ChatGPT来做自媒体
  - 大家刷短视频的话，经常看到模板化的套路，几句话，几分钟视频，看得人暴多。以后有了ChatGPT帮忙写稿，批量化做视频，一个人搞一堆短视频自媒体账号根本不是问题。
- 5、开发一个ChatGPT面试系统
  - 现在很多公司都允许远程面试，比如电话面试、视频面试，有人想到用这玩意来面试，接入一个语音识别，就可以实时帮助求职者通关面试了：
  - 开发这么一个系统，你觉得会有市场吗？基于这个想法，还可以开发一个ChatGPT写作文系统、写简历系统、做PPT系统，以后说不定一堆淘宝卖家提供这样的服务。

随着ChatGPT的不断迭代，以及国内外各大厂商的跟进，2023注定要掀起人工智能新的一波热潮。咱们程序员除了学习技术之外，也可以想想怎么在安全合法的情况下，利用这些AI做出一些有意思的东西，说不定就火了呢。

### 商业变现

方案
1. 卖账号；
2. 部署公众号，用户免费使用N次，分享海报，带来新关注，每个关注送N次；
3. 部署小程序，用户免费使用N次，关注公众号可以送N次，每看一次激励视频可以送1次；
4. 帮助其他人部署公众号/小程序，每个收费；
5. 垂类产品，基于 ChatGPT 提供的能力，输出内容，卖内容或者卖服务
6. 内容站点，收集热门搜索词，用 ChatGPT 提供的内容给搜索引擎收录，赚广告费；
7. ChatGPT 机器人接入，收费。
8. 创作类：总的来说，可以达到九年义务制教育的及格水平

【2023-1-24】ChatGPT创业实践，[自宅创业 - #27 蹭热点的ChatGPT小程序](https://blog.guyskk.com/notes/onebiz-27)
- 批量注册、卖opengai账号：做ChatGPT小程序，上线当天用户量突破1000，第一次做出这么火爆的产品
  - 一个写程序批量注册，一个负责销售，收益分成。写好了程序，注册了一批ChatGPT账号，赚了一点钱。然后发现市场上ChatGPT账号价格越来越低，也很难批量销售出去。
- 开发ChatGPT小程序
  - 做一个小程序，把ChatGPT的功能做到小程序上，打开就能直接用。不到3天小程序急速完成上线，上线当天用户量就突破1000，涨势非常好。正预想着日活过万，然后小程序就被举报封了，发布的两个小程序同时被封。举报人和我正好同在一个微信群里，虽然很难过，但还是接受了现实，大家都按丛林法则生存。

### 应用图谱

#### 应用概览

三层：模型层→模态层→应用层
1. 模型层：文本领域（GPT系列）、图像领域（扩散模型系列）、视频、建模、多模态等
2. 模态层：文本、语音、图像、视频、行为、理解、策略、工具等，其中文本和图像最为惊艳
3. 应用层：智能对话、AI作画最为亮眼，传统行业正在被逐步颠覆，如搜索、问答、智能办公、内容创作，同时，应用商场、互联网、数字人等也被波及。

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2023-04-06T07:14:39.689Z\&quot; agent=\&quot;Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/111.0.0.0 Safari/537.36\&quot; etag=\&quot;0XdEvCbMGYhgqR8BkdSM\&quot; version=\&quot;21.1.2\&quot;&gt;\n  &lt;diagram id=\&quot;Lw-1uFHNzwHmlxUDpAkU\&quot; name=\&quot;第 1 页\&quot;&gt;\n    &lt;mxGraphModel dx=\&quot;1242\&quot; dy=\&quot;795\&quot; grid=\&quot;1\&quot; gridSize=\&quot;10\&quot; guides=\&quot;1\&quot; tooltips=\&quot;1\&quot; connect=\&quot;1\&quot; arrows=\&quot;1\&quot; fold=\&quot;1\&quot; page=\&quot;1\&quot; pageScale=\&quot;1\&quot; pageWidth=\&quot;827\&quot; pageHeight=\&quot;1169\&quot; math=\&quot;0\&quot; shadow=\&quot;0\&quot;&gt;\n      &lt;root&gt;\n        &lt;mxCell id=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;1\&quot; parent=\&quot;0\&quot; /&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-1\&quot; value=\&quot;AIGC应用概览\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;fontSize=19;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;390\&quot; y=\&quot;90\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;-8\&quot; y=\&quot;-3\&quot; as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-2\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;whiteSpace=wrap;html=1;labelBackgroundColor=none;fontSize=10;fillColor=#f5f5f5;dashed=1;strokeColor=#666666;fontColor=#333333;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;60\&quot; y=\&quot;150\&quot; width=\&quot;690\&quot; height=\&quot;440\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-3\&quot; value=\&quot;\&quot; style=\&quot;ellipse;whiteSpace=wrap;html=1;dashed=1;fillColor=#fff2cc;strokeColor=#d6b656;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;250\&quot; y=\&quot;240\&quot; width=\&quot;370\&quot; height=\&quot;260\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-4\&quot; value=\&quot;\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;dashed=1;fillColor=#f8cecc;strokeColor=#b85450;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;352.38\&quot; y=\&quot;330\&quot; width=\&quot;145.25\&quot; height=\&quot;90\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-5\&quot; value=\&quot;GPT模型\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#d80073;strokeColor=#A50040;shadow=1;fontColor=#ffffff;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;360\&quot; y=\&quot;350\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-6\&quot; value=\&quot;扩散模型\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#d80073;strokeColor=#A50040;shadow=1;fontColor=#ffffff;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;430\&quot; y=\&quot;350\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-7\&quot; value=\&quot;跨模态模型\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#d80073;strokeColor=#A50040;shadow=1;fontColor=#ffffff;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;410\&quot; y=\&quot;385\&quot; width=\&quot;70\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-8\&quot; value=\&quot;模型层\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;fontSize=13;fontStyle=1;fontColor=#6666FF;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;374\&quot; y=\&quot;404\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-9\&quot; value=\&quot;模态层\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;fontSize=13;fontStyle=1;fontColor=#6666FF;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;294.5\&quot; y=\&quot;329\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;-8\&quot; y=\&quot;-5\&quot; as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-10\&quot; value=\&quot;应用层\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;fontSize=13;fontStyle=1;fontColor=#6666FF;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;100\&quot; y=\&quot;160\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;-5\&quot; y=\&quot;4\&quot; as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-11\&quot; value=\&quot;文本\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#ffcd28;strokeColor=none;shadow=1;gradientColor=#FFB570;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;333.5\&quot; y=\&quot;270\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-12\&quot; value=\&quot;图像\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#ffcd28;strokeColor=none;shadow=1;gradientColor=#FFB570;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;460\&quot; y=\&quot;270\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-13\&quot; value=\&quot;语音\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#ffcd28;strokeColor=none;shadow=1;gradientColor=#FFB570;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;258.5\&quot; y=\&quot;360\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-14\&quot; value=\&quot;视频\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#ffcd28;strokeColor=none;shadow=1;gradientColor=#FFB570;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;530\&quot; y=\&quot;330\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-15\&quot; value=\&quot;行为\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#ffcd28;strokeColor=none;shadow=1;gradientColor=#FFB570;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;314\&quot; y=\&quot;430\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-16\&quot; value=\&quot;策略\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#ffcd28;strokeColor=none;shadow=1;gradientColor=#FFB570;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;480\&quot; y=\&quot;440\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-17\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#999999;exitX=0.25;exitY=0;exitDx=0;exitDy=0;entryX=0.5;entryY=1;entryDx=0;entryDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-4\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-11\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;404\&quot; y=\&quot;685\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;474\&quot; y=\&quot;685\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-18\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#999999;entryX=0.5;entryY=1;entryDx=0;entryDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-4\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-12\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;400\&quot; y=\&quot;360\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;374\&quot; y=\&quot;295\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-19\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#999999;entryX=0;entryY=0.5;entryDx=0;entryDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-4\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-14\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;463\&quot; y=\&quot;340\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;490\&quot; y=\&quot;295\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-20\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#999999;entryX=0.5;entryY=0;entryDx=0;entryDy=0;exitX=0.872;exitY=1.033;exitDx=0;exitDy=0;exitPerimeter=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-4\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-16\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;473\&quot; y=\&quot;350\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;500\&quot; y=\&quot;305\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-21\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#999999;entryX=0.5;entryY=0;entryDx=0;entryDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-15\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;370\&quot; y=\&quot;420\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;510\&quot; y=\&quot;315\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-22\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#999999;entryX=1;entryY=0.5;entryDx=0;entryDy=0;exitX=0;exitY=0.5;exitDx=0;exitDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-4\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-13\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;493\&quot; y=\&quot;370\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;520\&quot; y=\&quot;325\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-23\&quot; value=\&quot;AI作画\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#b0e3e6;strokeColor=none;shadow=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;500\&quot; y=\&quot;200\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-24\&quot; value=\&quot;搜索\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#b0e3e6;strokeColor=none;shadow=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;180\&quot; y=\&quot;240\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-25\&quot; value=\&quot;办公\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#b0e3e6;strokeColor=none;shadow=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;150\&quot; y=\&quot;290\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-26\&quot; value=\&quot;AI写作\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#b0e3e6;strokeColor=none;shadow=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;330\&quot; y=\&quot;180\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-27\&quot; value=\&quot;NLP基础任务\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#d0cee2;strokeColor=none;shadow=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;382.01\&quot; y=\&quot;530\&quot; width=\&quot;86\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-28\&quot; value=\&quot;智能对话\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#b0e3e6;strokeColor=none;shadow=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;240\&quot; y=\&quot;190\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-29\&quot; value=\&quot;大模型\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#d0cee2;strokeColor=none;shadow=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;490\&quot; y=\&quot;530\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-30\&quot; value=\&quot;AI视频\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#b0e3e6;strokeColor=none;shadow=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;650\&quot; y=\&quot;260\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-31\&quot; value=\&quot;数字人\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#b0e3e6;strokeColor=none;shadow=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;160\&quot; y=\&quot;420\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-32\&quot; value=\&quot;游戏策略\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#b0e3e6;strokeColor=none;shadow=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;570\&quot; y=\&quot;480\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-33\&quot; value=\&quot;编程\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#b0e3e6;strokeColor=none;shadow=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;405\&quot; y=\&quot;180\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-34\&quot; value=\&quot;语音处理\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#b0e3e6;strokeColor=none;shadow=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;130\&quot; y=\&quot;360\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-36\&quot; value=\&quot;机器人\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#b0e3e6;strokeColor=none;shadow=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;170\&quot; y=\&quot;480\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-37\&quot; value=\&quot;脑机接口\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#b0e3e6;strokeColor=none;shadow=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;294.5\&quot; y=\&quot;540\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-38\&quot; value=\&quot;工具\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#ffcd28;strokeColor=none;shadow=1;gradientColor=#FFB570;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;530\&quot; y=\&quot;390\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-39\&quot; value=\&quot;数据生产\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#b0e3e6;strokeColor=none;shadow=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;660\&quot; y=\&quot;355\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-40\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#999999;entryX=0;entryY=0.5;entryDx=0;entryDy=0;exitX=1;exitY=0.75;exitDx=0;exitDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-4\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-38\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;508\&quot; y=\&quot;364\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;540\&quot; y=\&quot;355\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-41\&quot; value=\&quot;理解\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#ffcd28;strokeColor=none;shadow=1;gradientColor=#FFB570;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;393.5\&quot; y=\&quot;460\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-42\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=2;strokeColor=#999999;entryX=0.5;entryY=0;entryDx=0;entryDy=0;exitX=0.5;exitY=1;exitDx=0;exitDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-4\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-41\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;489\&quot; y=\&quot;433\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;520\&quot; y=\&quot;450\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-43\&quot; value=\&quot;应用商城\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#b0e3e6;strokeColor=none;shadow=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;650\&quot; y=\&quot;404\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-44\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=0.5;entryY=1;entryDx=0;entryDy=0;exitX=0.5;exitY=0;exitDx=0;exitDy=0;dashed=1;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-11\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-33\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;474\&quot; y=\&quot;340\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;500\&quot; y=\&quot;310\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-89\&quot; value=\&quot;Cursor\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;Jfs-Gf4W77MN08QozXzM-44\&quot;&gt;\n          &lt;mxGeometry x=\&quot;0.1166\&quot; y=\&quot;1\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-45\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=0.5;entryY=1;entryDx=0;entryDy=0;exitX=0.5;exitY=0;exitDx=0;exitDy=0;dashed=1;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-11\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-26\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;370\&quot; y=\&quot;280\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;490\&quot; y=\&quot;220\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-46\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=0.5;entryY=1;entryDx=0;entryDy=0;dashed=1;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-28\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;360\&quot; y=\&quot;270\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;500\&quot; y=\&quot;230\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-86\&quot; value=\&quot;DocumentQA\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;Jfs-Gf4W77MN08QozXzM-46\&quot;&gt;\n          &lt;mxGeometry x=\&quot;0.0189\&quot; y=\&quot;-2\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;-1\&quot; as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-47\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=1;entryY=0.5;entryDx=0;entryDy=0;dashed=1;exitX=0.5;exitY=0;exitDx=0;exitDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-11\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-24\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;370\&quot; y=\&quot;280\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;280\&quot; y=\&quot;230\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-94\&quot; value=\&quot;New Bing\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;Jfs-Gf4W77MN08QozXzM-47\&quot;&gt;\n          &lt;mxGeometry x=\&quot;0.2901\&quot; y=\&quot;-1\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-48\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=1;entryY=0.5;entryDx=0;entryDy=0;dashed=1;exitX=0;exitY=0.5;exitDx=0;exitDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-11\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-25\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;380\&quot; y=\&quot;290\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;290\&quot; y=\&quot;240\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-88\&quot; value=\&quot;Copilot\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;Jfs-Gf4W77MN08QozXzM-48\&quot;&gt;\n          &lt;mxGeometry x=\&quot;-0.0381\&quot; y=\&quot;-1\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-49\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=1;entryY=0.5;entryDx=0;entryDy=0;dashed=1;exitX=0;exitY=0.5;exitDx=0;exitDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-13\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-34\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;390\&quot; y=\&quot;300\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;300\&quot; y=\&quot;250\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-75\&quot; value=\&quot;跨语种\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;Jfs-Gf4W77MN08QozXzM-49\&quot;&gt;\n          &lt;mxGeometry x=\&quot;-0.2371\&quot; y=\&quot;1\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;1\&quot; as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-50\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=1;entryY=0.5;entryDx=0;entryDy=0;dashed=1;exitX=0;exitY=0.5;exitDx=0;exitDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-15\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-31\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;400\&quot; y=\&quot;310\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;310\&quot; y=\&quot;260\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-76\&quot; value=\&quot;动作模拟&amp;lt;br&amp;gt;角色模拟\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;Jfs-Gf4W77MN08QozXzM-50\&quot;&gt;\n          &lt;mxGeometry x=\&quot;-0.0634\&quot; y=\&quot;-3\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-51\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=1;entryY=0.25;entryDx=0;entryDy=0;dashed=1;exitX=0;exitY=1;exitDx=0;exitDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-15\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-36\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;324\&quot; y=\&quot;455\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;240\&quot; y=\&quot;445\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-80\&quot; value=\&quot;表情控制\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;Jfs-Gf4W77MN08QozXzM-51\&quot;&gt;\n          &lt;mxGeometry x=\&quot;-0.0039\&quot; y=\&quot;2\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint y=\&quot;1\&quot; as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-52\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=0.5;entryY=0;entryDx=0;entryDy=0;dashed=1;exitX=0.383;exitY=1.05;exitDx=0;exitDy=0;exitPerimeter=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-15\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-37\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;334\&quot; y=\&quot;465\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;250\&quot; y=\&quot;455\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-92\&quot; value=\&quot;Crown\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;Jfs-Gf4W77MN08QozXzM-52\&quot;&gt;\n          &lt;mxGeometry x=\&quot;-0.1603\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-53\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=0.5;entryY=0;entryDx=0;entryDy=0;dashed=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-41\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-27\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;344\&quot; y=\&quot;475\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;260\&quot; y=\&quot;465\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-54\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=0.5;entryY=0;entryDx=0;entryDy=0;dashed=1;exitX=0.5;exitY=1;exitDx=0;exitDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-41\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-29\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;434\&quot; y=\&quot;500\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;455\&quot; y=\&quot;540\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-56\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=0;entryY=0.5;entryDx=0;entryDy=0;dashed=1;exitX=1;exitY=1;exitDx=0;exitDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-16\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-32\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;444\&quot; y=\&quot;510\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;465\&quot; y=\&quot;550\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-57\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=0;entryY=0.5;entryDx=0;entryDy=0;dashed=1;exitX=1;exitY=0.75;exitDx=0;exitDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-38\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-43\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;454\&quot; y=\&quot;520\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;475\&quot; y=\&quot;560\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-70\&quot; value=\&quot;插件\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;Jfs-Gf4W77MN08QozXzM-57\&quot;&gt;\n          &lt;mxGeometry x=\&quot;-0.0704\&quot; y=\&quot;1\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-58\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=0;entryY=0.5;entryDx=0;entryDy=0;dashed=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-38\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-39\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;600\&quot; y=\&quot;423\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;650\&quot; y=\&quot;445\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-72\&quot; value=\&quot;数据增强/标注\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;Jfs-Gf4W77MN08QozXzM-58\&quot;&gt;\n          &lt;mxGeometry x=\&quot;0.0686\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-59\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=0;entryY=0.5;entryDx=0;entryDy=0;dashed=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-14\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-30\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;610\&quot; y=\&quot;433\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;660\&quot; y=\&quot;455\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-60\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=0;entryY=0.75;entryDx=0;entryDy=0;dashed=1;exitX=0.617;exitY=0.05;exitDx=0;exitDy=0;exitPerimeter=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-12\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-23\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;620\&quot; y=\&quot;443\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;670\&quot; y=\&quot;465\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-73\&quot; value=\&quot;图生图\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;Jfs-Gf4W77MN08QozXzM-60\&quot;&gt;\n          &lt;mxGeometry x=\&quot;-0.1555\&quot; y=\&quot;2\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-61\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=0.5;entryY=0;entryDx=0;entryDy=0;dashed=1;exitX=0;exitY=0.5;exitDx=0;exitDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-41\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-37\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;347\&quot; y=\&quot;472\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;329\&quot; y=\&quot;530\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-79\&quot; value=\&quot;意念操控\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;Jfs-Gf4W77MN08QozXzM-61\&quot;&gt;\n          &lt;mxGeometry x=\&quot;-0.0451\&quot; y=\&quot;1\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-62\&quot; value=\&quot;物联网\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#b0e3e6;strokeColor=none;shadow=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;640\&quot; y=\&quot;440\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-63\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=0;entryY=0.5;entryDx=0;entryDy=0;dashed=1;exitX=0.883;exitY=1.117;exitDx=0;exitDy=0;exitPerimeter=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-38\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-62\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;600\&quot; y=\&quot;415\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;660\&quot; y=\&quot;395\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-71\&quot; value=\&quot;传感器\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;Jfs-Gf4W77MN08QozXzM-63\&quot;&gt;\n          &lt;mxGeometry x=\&quot;-0.0586\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-65\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;dashed=1;exitX=1;exitY=0.5;exitDx=0;exitDy=0;entryX=0;entryY=0.5;entryDx=0;entryDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-23\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-30\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;530\&quot; y=\&quot;295\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;680\&quot; y=\&quot;255\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-69\&quot; value=\&quot;图生视频\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;Jfs-Gf4W77MN08QozXzM-65\&quot;&gt;\n          &lt;mxGeometry x=\&quot;0.0569\&quot; y=\&quot;-3\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-68\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=0;entryY=0.75;entryDx=0;entryDy=0;dashed=1;exitX=0.5;exitY=0;exitDx=0;exitDy=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-11\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-23\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;500\&quot; y=\&quot;280\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;550\&quot; y=\&quot;243\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-74\&quot; value=\&quot;Midjourney&amp;lt;br&amp;gt;DALL E&amp;lt;br&amp;gt;Stable Difussion\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;Jfs-Gf4W77MN08QozXzM-68\&quot;&gt;\n          &lt;mxGeometry x=\&quot;0.0629\&quot; y=\&quot;1\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;174\&quot; y=\&quot;-44\&quot; as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-90\&quot; value=\&quot;文生图\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;Jfs-Gf4W77MN08QozXzM-68\&quot;&gt;\n          &lt;mxGeometry x=\&quot;0.1845\&quot; y=\&quot;-3\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-81\&quot; value=\&quot;可穿戴\&quot; style=\&quot;rounded=1;whiteSpace=wrap;html=1;fillColor=#b0e3e6;strokeColor=none;shadow=1;\&quot; vertex=\&quot;1\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;220\&quot; y=\&quot;530\&quot; width=\&quot;60\&quot; height=\&quot;30\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-82\&quot; value=\&quot;\&quot; style=\&quot;rounded=0;orthogonalLoop=1;jettySize=auto;html=1;strokeWidth=1;strokeColor=#999999;entryX=0.5;entryY=0;entryDx=0;entryDy=0;dashed=1;exitX=0.4;exitY=1;exitDx=0;exitDy=0;exitPerimeter=0;\&quot; edge=\&quot;1\&quot; parent=\&quot;1\&quot; source=\&quot;Jfs-Gf4W77MN08QozXzM-15\&quot; target=\&quot;Jfs-Gf4W77MN08QozXzM-81\&quot;&gt;\n          &lt;mxGeometry relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;347\&quot; y=\&quot;472\&quot; as=\&quot;sourcePoint\&quot; /&gt;\n            &lt;mxPoint x=\&quot;335\&quot; y=\&quot;550\&quot; as=\&quot;targetPoint\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-84\&quot; value=\&quot;VR眼镜\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;Jfs-Gf4W77MN08QozXzM-82\&quot;&gt;\n          &lt;mxGeometry x=\&quot;0.0193\&quot; y=\&quot;3\&quot; relative=\&quot;1\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-85\&quot; value=\&quot;领域问答:医疗/金融等\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;269.99588204532944\&quot; y=\&quot;179.9991147049122\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;-6\&quot; y=\&quot;-4\&quot; as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-87\&quot; value=\&quot;NER/分类/摘要/生成等\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;434.99588204532944\&quot; y=\&quot;579.9991147049122\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;-6\&quot; y=\&quot;-4\&quot; as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-91\&quot; value=\&quot;三层：模型层→模态层→应用层\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;fontSize=14;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;389.998484809835\&quot; y=\&quot;130.0011254969541\&quot; as=\&quot;geometry\&quot;&gt;\n            &lt;mxPoint x=\&quot;1\&quot; as=\&quot;offset\&quot; /&gt;\n          &lt;/mxGeometry&gt;\n        &lt;/mxCell&gt;\n        &lt;mxCell id=\&quot;Jfs-Gf4W77MN08QozXzM-93\&quot; value=\&quot;① 腾讯智影&amp;lt;br&amp;gt;②阿里天猫精灵\&quot; style=\&quot;edgeLabel;html=1;align=center;verticalAlign=middle;resizable=0;points=[];labelBackgroundColor=none;\&quot; vertex=\&quot;1\&quot; connectable=\&quot;0\&quot; parent=\&quot;1\&quot;&gt;\n          &lt;mxGeometry x=\&quot;119.99848480983502\&quot; y=\&quot;434.0011254969541\&quot; as=\&quot;geometry\&quot; /&gt;\n        &lt;/mxCell&gt;\n      &lt;/root&gt;\n    &lt;/mxGraphModel&gt;\n  &lt;/diagram&gt;\n&lt;/mxfile&gt;\n&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

#### 应用列表

图解

<div class="mermaid">
    flowchart LR
    %% 节点颜色
    classDef red fill:#F09;
    classDef green fill:#5CF77B;
    classDef blue fill:#6BE0F7;
    classDef orange fill:#F7CF6B;
    classDef grass fill:#C8D64B;
    %%节点关系定义
    D(GPT-3):::grass
    D-->|2022-2,OpenAI,反馈强化学习|E(Instruct GPT):::green
    E-->|2022-11,OpenAI,聊天反馈|F(ChatGPT):::red
    E-->|2023-3-15,多模态,图像理解|G(GPT-4):::green

    D-->|2023-3-22,Action GPT|A(3D建模):::orange
    D-->|2020-1-17,图像领域,GPT-2|IG(Image GPT):::orange

    F-->|微软,搜索引擎\nNewBing\nBARD|F00(搜索引擎):::blue
    F-->|2023-3-24,Office 365|F01(办公软件):::blue
    F-->|2023-3-26,Coipilot\nCursor|F02(编程软件):::blue
    F-->|语料扩充\nNLP评估\n标注平台|F03(NLP基础任务):::blue
    F-->|2023-3-25,医疗问答,ChatDoctor\n心理测评|F1(领域问答助手):::blue
    IG-->|2023-3-27,装修设计图生成 RoomGPT|F2(领域图像生成):::blue
    V(扩散模型)-->F2
    F-->|2023-3-31,金融知识BloombergGPT|F3(领域大模型):::blue
    F-->|2023-3-24,Plugin|F4(插件商城):::blue
    F-->|2023-3-31,TaskMatrix自动适配,微软开源\n2023-4-3,HuggingGPT封装任务|F5(API驱动):::blue

    F-->|2023-3-9,微软,开源多模态问答系统\nVisual ChatGPT|F7(多模态问答):::blue
    F-->|2023-3-9,文档聊天\nPandasGPT+ChatDOC\nChatPaper+ChatPDF|F8(DocumentQA):::blue
    F-->|2023-4-2,推荐系统\nChatREC|F9(推荐系统):::blue
    F-->|2023-4-4,阿里鸟鸟分鸟,天猫精灵|F10(角色模拟):::blue
    F-->|2023-3-27,Neurosity头戴设备Crown+GPT4,实现意念操控|F11(脑机接口):::blue
    F-->|2023-3-31,Engineered Arts推出机器人Ameca+GPT-3,实现表情控制|F12(机器人):::blue
    F-->|2023-3-27,VR眼镜|F13(可穿戴):::blue
</div>

【2023-4-11】ChatGPT应用发展趋势：
- 第一波：Prompt套壳。如翻译/摘要工具、客户端、各种笔记工具。
- 第二波：文档向量索引、对话。如ChatPDF/ChatDoc、数字化分身等，自己实现可参考 llamaindex
- 第三波：自运行Agent。 如Microsoft Jarvis、  BabyAGI、autoGPT等

自运行Agent：给一个任务，让GPT根据回复结果自己设定优先级进行后续的提问，获取信息、工作处理。
- 如果未来跟其他API打通，差不多可以实现一句话做网站、买飞机票、定外卖等。
- Twitter有高手完成了一句话生成网站并发布。国内也有朋友做了一句话生成前端页面[demo](​https://nlui.lxfater.com/)

### 数据处理

数据是石油，LLM 明显把炼油能力增强了，高价值行业和企业内部曾经难记录、难处理的数据都可以被重新以前分析。数据和信息的重构也意味着 AI 能承担更多决策权。

#### 语料扩充

【2023-2-17】[unlocking-the-power-of-llms](https://github.com/howl-anderson/unlocking-the-power-of-llms)

使用chatgpt生成mark表格

| 文本           | 领域     | 实体映射      |
| -------------- | -------- | ------------- |
| 打开车门       | 设备控制 | 设备：车门    |
| 关闭空调       | 设备控制 | 设备：空调    |
| 导航到人民路   | 导航     | POI：人民路   |
| 开车去郊野公园 | 导航     | POI：郊野公园 |

也可以用空格
- 直接从 Excel 中复制数据粘贴到文本框中，表格表示形式是：每个单元格都用空格隔开。（不推荐）

生成的NER数据：

| 文本                          | 领域     | 实体映射                                   |
| ----------------------------- | -------- | ------------------------------------------ |
| 打开后备箱                    | 设备控制 | 设备：后备箱                               |
| 调高音量到80                  | 设备控制 | 设备：音响，属性：音量，数值：80           |
| 导航到北京天安门广场          | 导航     | POI：北京天安门广场                        |
| 开启车辆防盗系统              | 设备控制 | 设备：防盗系统                             |
| 显示明天的天气                | 天气查询 | 时间：明天                                 |
| 将客厅灯调暗一些              | 设备控制 | 设备：客厅灯，属性：亮度，数值：稍微暗一些 |
| 播放周杰伦的七里香            | 娱乐     | 歌手：周杰伦，歌曲：七里香                 |
| 打开窗户                      | 设备控制 | 设备：窗户                                 |
| 降低空调温度到25度            | 设备控制 | 设备：空调，属性：温度，数值：25           |
| 导航到附近的加油站            | 导航     | POI：加油站                                |
| 调整座椅到舒适的位置          | 设备控制 | 设备：座椅，属性：位置，数值：舒适         |
| 停止播放音乐                  | 娱乐     | 动作：停止播放音乐                         |
| 打电话给张三                  | 通讯     | 对象：张三                                 |
| 导航到机场                    | 导航     | POI：机场                                  |
| 打开车窗                      | 设备控制 | 设备：车窗                                 |
| 关闭车窗                      | 设备控制 | 设备：车窗                                 |
| 升高座椅到合适的高度          | 设备控制 | 设备：座椅，属性：高度，数值：合适         |
| 显示最近的通知                | 提醒事项 | 类型：通知                                 |
| 播报今天的新闻                | 新闻     | 时间：今天                                 |
| 显示路况                      | 导航     | 信息类型：路况                             |
| 导航到附近的酒店              | 导航     | POI：酒店                                  |
| 打开前灯                      | 设备控制 | 设备：前灯                                 |
| 关闭后灯                      | 设备控制 | 设备：后灯                                 |
| 设置提醒，下午3点有会议要参加 | 提醒事项 | 时间：下午3点，事件：参加会议              |
| 显示今天的日程                | 提醒事   |                                            |

#### 人工标注

【2023-3-29】ChatGPT超过人工标注
- [ChatGPT Outperforms Crowd-Workers for Text-Annotation Tasks](https://arxiv.org/abs/2303.15056?fbclid=IwAR2j7nL9y2pvxkHHkbZtbWbfEGuyaqiQ6NYVO39WkpUK5NGkBGZLjiMx0ho)

- Many NLP applications require manual data annotations for a variety of tasks, notably to train classifiers or evaluate the performance of unsupervised models. Depending on the size and degree of complexity, the tasks may be conducted by crowd-workers on platforms such as MTurk as well as trained annotators, such as research assistants. Using a sample of 2,382 tweets, we demonstrate that ChatGPT outperforms crowd-workers for several annotation tasks, including relevance, stance, topics, and frames detection. Specifically, the zero-shot accuracy of ChatGPT exceeds that of crowd-workers for four out of five tasks, while ChatGPT's intercoder agreement exceeds that of both crowd-workers and trained annotators for all tasks. Moreover, the per-annotation cost of ChatGPT is less than $0.003 -- about twenty times cheaper than MTurk. These results show the potential of large language models to drastically increase the efficiency of text classification.

苏黎世大学：ChatGPT标注数据比人类便宜20倍，80%任务上占优势

在ChatGPT面前，无论成本还是效率，人类可以说是毫无优势：
- 成本上，ChatGPT平均每个标注成本低于0.003美元，比众包平台便宜20倍；何况AI还能24*7无休。
- 效率上，在相关性、立场、主题等任务中，ChatGPT也是以4:1的优势“碾压”人类。

MTurk就是专门进行数据标注的一个众包平台。
- 在MTurk这类众包平台内部，还会有更加精细的分工，比如说会有经过专业训练的数据标注者以及众包工作者。
- 前者在产出高质量数据上具有优势，但自然成本也更高，而后者虽然更便宜但质量也会随任务难度波动。

于是研究团队就开始着手研究大语言模型（LLM）在这方面的潜力，并且对比了没有额外训练（zero-shot）的ChatGPT（基于GPT-3.5）和MTurk在数据标注上的性能。这项对比基于研究团队此前收集到的2382条推文样本。

ChatGPT和MTurk分别将推文以“相关性、立场、主题、政策、实用性”这五种任务进行标注。

“生成训练数据需要人工”的说法已经成为过去式

ChatGPT 用于 人工标注的 Web系统：[Weak Labeling Tool using ChatGPT](https://github.com/ainbr/chatgpt-weak-labeler-web-ui), [代码](https://github.com/ainbr/chatgpt-weak-labeler-web-ui/blob/master/app.py)
- ![](https://github.com/ainbr/chatgpt-weak-labeler-web-ui/raw/master/misc/screenshot1.png)

#### 数据分析

【2023-5-6】[Pandas AI](https://github.com/gventuri/pandas-ai)
- 将 Pandas 和 AI 结合，更方便地分析数据。

代码：

```py
import pandas as pd
from pandasai import PandasAI

# Sample DataFrame
df = pd.DataFrame({
    "country": ["United States", "United Kingdom", "France", "Germany", "Italy", "Spain", "Canada", "Australia", "Japan", "China"],
    "gdp": [21400000, 2940000, 2830000, 3870000, 2160000, 1350000, 1780000, 1320000, 516000, 14000000],
    "happiness_index": [7.3, 7.2, 6.5, 7.0, 6.0, 6.3, 7.3, 7.3, 5.9, 8.0]
})

# Instantiate a LLM
from pandasai.llm.openai import OpenAI
llm = OpenAI()

pandas_ai = PandasAI(llm)
pandas_ai.run(df, prompt='Which are the 5 happiest countries?')
```

构造数据，然后输入 prompt：
> Which are the 5 happiest countries?

AI 根据输入的数据，处理数据，得到结果。

```
9             China
0     United States
6            Canada
7         Australia
1    United Kingdom
Name: country, dtype: object
```

画个图：
> Plot the histogram of countries showing for each the GDP, using different colors for each bar

AI 根据需求，画一了各个国家的 GDP 条形图。
- [img](https://mmbiz.qpic.cn/mmbiz_png/v1JN0W4OpXgoevdlbWGnibC449Dicxr2e0tQZtQPf571xu6T4cRcm2VBoIyibxoicp8iaoZoUEicxBwDN7wQNdEK3ZOA/640?wx_fmt=png&tp=wxpic&wxfrom=5&wx_lazy=1&wx_co=1)

### 内容管理/营销

CRM 记录姓名、电话等结构化数据

CRM龙头接入ChatGPT，AI辅助客户管理再看看更深层次的客户关系管理环节，GPT技术依然是无孔不入，进化为智能咨询角色。
- 3月7日，客户关系管理领域SaaS巨头`Salesforce`推出基于ChatGPT的CRM生成式AI产品：“Einstein GPT”，据称可用于帮助企业销售人员、客户服务专员和市场营销人员高效率完成本职工作。比如
- 帮销售人员撰写电子邮件，结合过往案例生成知识文章，为客服人员生成客户提问的特定答案，帮开发人员编写代码等。
- 同时，Salesforce旗下的办公协作软件`Slack`也推出了基于ChatGPT的应用，Slack将其应用积累的数据与ChatGPT相结合，为客户提供他们所需的信息，包括提供即时对话摘要、研究工具和写作辅助等，帮助数百万公司更高效地工作。
- Slack的ChatGPT应用提供一个[对话界面](https://vdn6.vzuu.com/SD/2faf67f0-ee5e-11ed-83ab-d2cc0999534d-v1_f4_t2_4RbvmazF.mp4)，可以帮用户获取即时对话框中的信息，并基于研究工具去解析内容的主题，并帮用户快速撰写消息。

- 4月10日，知名营销SaaS企业上线数据集成平台有赞iPaaS和由大模型驱动的首个AI产品“加我智能”。加我智能目前主要支持图文推广和活动策划两大场景，能自动生成推广图文，并理解活动目的，生成跨产品和功能的营销活动。
- 国外也是一致趋势，4月20日，外媒称谷歌计划在未来几个月内将生成式AI引入其广告业务。目前，谷歌已经在其广告业务中使用AI来创建简单的提示，鼓励用户购买产品。可以看到，无论是互联网广告商、广告公关代理龙头还是SaaS服务商，他们都在加快接入AI大模型的步伐。如果能将广告人从众多重复机械化工作中解放出来，大卫·奥格威理想中的广告创意或许会离我们更近一步。

#### Gong

以 Gong 为代表的 AI-based CRM 则是记录分析 B2B 销售和客户录音。

#### Segment

Segment 的主要业务是提供**实时消费者数据**，传统的 CRM 的数据和业务之间其实并不直接衔接，因为过去 CRM 采集到的数据可能也有错的、并且也过时了，但在 LLM 基础上，Segment 其实反而提供更实时、更有效的数据。

#### Pilot

2022 年成立的Pilot AI 是一款面向销售人员的 AI 产品，核心是能够自动将每一个**销售电话变成详细的笔记和结构化数据**，并将结构化数据直接同步到 CRM 系统。这也是大语言模型的核心价值之一。
- 平时聊天有非常多的数据，如果没有被记录和分析，就永远是 dark data。而大语言模型理解语言的能力变强之后，dark data 可以变成非结构化数据、结构化数据，变成 information。而且 Pilot 的整个流程都是自动化的，价值非常显著。

#### Typeface

【2023-4-10】[Typeface](https://www.typeface.ai/) 是一个 AI 营销内容生成平台，由前 Adobe CTO 创立。
- The enterprise-grade generative AI app that empowers everyone to express their unique imagination.

能力：
- `Prompt`: Create engaging content in seconds
  - A new visual vocabulary to express your ideas: Generate anything from a simple prompt, so you can easily create without a steep learning or time curve.
  - 一个简单的提示语，就能生成特定领域里的营销内容（文字/图片）
  - Spend more time on ideas, less on tasks: Tired of looking at a blank page?  Jump start projects by simply typing your idea. Stress test headlines, brainstorm campaigns, personalize pitches, and more.
  - 将客户精力从具体任务转移到点子上：压力测试标题，头脑风暴活动，个性化宣传等等
  - Write and edit any type of content: Click to add the elements you want – headlines, paragraphs, images, captions – to build the entire content flow on one visual canvas. Not sure where to start? Use a template and modify it however you need.
  - ![](https://www.typeface.ai/images/Prompt-Visual-1-7.webp)
  - 撰写、编辑各种类型的内容：只需要轻轻一点，就能添加标题、段落、图像、注释等元素，在同一个页面中完成内容创作。
  - Flex to your style and collaborate faster: Develop multiple assets quickly and in parallel. Stylize your way with built-in formatting and image editing tools, such as filters, adjustments, and overlays. Share your work with collaborators across channels.
  - 适配客户风格，协同工作
  - ![](https://www.typeface.ai/images/Prompt-Visual-3-3.webp)
- `Flow`: Extend and customize to your workflows, [flow](https://www.typeface.ai/features/flow.html)
- `Blend`: Personalize to your brand and audiences, [blend](https://www.typeface.ai/features/blend.html)
- `Safe`: Ensure brand safety and control; 
  - 拼写检查、剽窃检测、真实性检测、品牌控制

Typeface 最大的特点是能够学习企业客户的“专有数据”。客户将带有企业风格的专有数据导入 Typeface 供模型学习，基于这些专有数据，Typeface 可以输出更个性化的、满足企业实际需求的内容，做到让 AI “更懂用户”。

为了实现这一点，Typeface 让每位客户拥有独有的 AI 模型和托管服务，以及原创内容检测、品牌契合度检测和文字上的语法检测等功能。而收集专有数据的意识也在行业内逐渐形成共识。



### NLP基础任务

#### 信息抽取

chatgpt做零样本信息抽取
- 论文：[Zero-Shot Information Extraction via Chatting with ChatGPT](https://www.aminer.cn/pub/63f5887b90e50fcafd27b7c4/zero-shot-information-extraction-via-chatting-with-chatgpt)
- we transform the zero-shot IE task into a multi-turn question-answering problem with a two-stage framework (ChatIE)
- 使用两阶段框架（ChatIE）将零样本信息提取任务转换为多回合问答问题。

#### 机器翻译

原文：
> 翻译这段话:"人要是行,干一行行一行,一行行行行行。行行行干哪行都行。要是不行,干一行不行一行,一行不行行行不行,行行不行,干哪行都不行。要想行行,首先一行行。成为行业内的内行,行行成内行。行行行,你说我说得行不行。"

普通翻译
> Translate this passage: "If you can do it, do it one line at a time, one line at a time. You can do it all. If not, do it one line at a time, one line at a time, no line at a time, no line at a time, no line at all. If you want to do it, you must first do it one line at a time. Become an expert in the industry, and become an expert in the industry. Okay, you say what I say is okay."

文心一言
> If you are talented, you can excel in any field and excel in iit. If you are not talented, excel in just one field but cannot do it well, and if you are not skilled at just onefield, it cannot be done well. In any field, if you want to excel, you must first excel in it. Become an expertin your field, and then you become an expert in everything else related to that field. Being a good at a particulaar field enables you to understand all the others. Being good at multiple fields enables you to undersstand everything.


GPT-4翻译
> Translate this passage: "If a person is capable, they can excel in any profession they choose. If they're not capable, they won't succeed in any profession, no matter which one they choose. If you want to be successful, you must first become proficient in one field. Become an expert in your industry, and you'll achieve success. Is what I'm saying reasonable?"


#### NLP评估

##### ChatEval

会话评估：[ChatEval](https://chateval.org/)，University of Pennyslvania 宾夕法尼亚大学NLP团队开源，开放领域机器人评估框架，研究人员可以提交自己的模型，ChatEval会自动对比评估效果
- 公开数据集: Neural Conversational Model, Open Subtitles, Cornell Movie Dialogue Corpus ...
- 开源，代码：[chateval](https://github.com/chateval)

chatgpt用于NLG评估
- 论文：[Is ChatGPT a Good NLG Evaluator? A Preliminary Study](https://www.aminer.cn/pub/6407fd3e90e50fcafd2747e3/is-chatgpt-a-good-nlg-evaluator-a-preliminary-study)
- we regard ChatGPT as a **human evaluator** and give **task-specific** (e.g., summarization) and **aspect-specific** (e.g., relevance) instruction to prompt ChatGPT to score the generation of NLG models. We conduct experiments on three widely-used NLG meta-evaluation datasets (including summarization, story generation and data-to-text tasks).
- Experimental results show that compared with previous automatic metrics, ChatGPT achieves state-of-the-art or competitive correlation with golden human judgments. We hope our preliminary study could prompt the emergence of a general-purposed reliable NLG metric.

复杂会话质量评估：东南大学网络科学与工程学院
- 论文：[Evaluation of ChatGPT as a Question Answering System for Answering Complex Questions](https://www.aminer.cn/pub/641137fe90e50fcafd17bb5e/evaluation-of-chatgpt-as-a-question-answering-system-for-answering-complex-questions)
-  we present a framework that evaluates its ability to answer complex questions. Our approach involves categorizing the potential features of complex questions and describing each test question with multiple labels to identify combinatorial reasoning. Following the black-box testing specifications of CheckList proposed by Ribeiro et.al, we develop an evaluation method to measure the functionality and reliability of ChatGPT in reasoning for answering complex questions.
- We use the proposed framework to evaluate the performance of ChatGPT in question answering on 8 real-world KB-based CQA datasets, including 6 English and 2 multilingual datasets, with a total of approximately 190,000 test cases. We compare the evaluation results of ChatGPT, GPT-3.5, GPT-3, and FLAN-T5 to identify common long-term problems in LLMs.
- The dataset and code are available at [Complex-Question-Answering-Evaluation-of-ChatGPT](https://github.com/tan92hl/Complex-Question-Answering-Evaluation-of-ChatGPT)

Question
- In various types of KBQA tasks, **complex question answering** (KB-based CQA) is a challenging task that requires question answering models to have the ability of compositional reasoning to answer questions that require multi-hop reasoning, attribute comparison, set operations, and other complex reasoning.
- KBQA任务重，回答复杂问题很有挑战性，因为涉及这些问题要求多跳推理、属性对比、集合操作及其他复杂推理

Overview

To evaluate ChatGPT's ability to answer complex knowledge, we propose an evaluation framework: a feature-driven multi-label annotation method 特征驱动的多标签标注方法
- First, we classify the **latent features** that constitute complex questions, and describe each question under test with multi-labels for identifying combinatorial reasoning. 
- Secondly, following the black-box test specification of CheckList proposed by Microsoft, we design an **evaluation method** that introduces `CoT` hints to measure the reasoning function and reliability of large language models in answering complex questions. 

Our evaluation uses 8 real complex question answering datasets, including **six** English datasets and **two** multilingual datasets, to further analyze the potential impact of language bias. We compared the evaluation results of `ChatGPT`, `GPT3.5`, `GPT3`, and `FLAN-T5` to identify persistent historical issues in `LLMs`. All data and results are available for further analysis.


【2023-3-16】[Poe](https://poe.com/claude+) 各种机器人，sage, gpt-4, ChatGPT等，一次免费体验机会


### Document QA

【2023-3-27】文档问答

作者：[强化学徒](https://www.zhihu.com/question/589726461/answer/2961450933)

【2023-5-9】[大语言模型实现智能客服知识库文档数据提取功能](https://www.toutiao.com/article/7231062779061502501)
- 智能客服的知识库有两类：**机器人**知识库和**坐席**知识库，分别是为机器人和坐席进行服务时，提供数据的支撑。
- 如何通过大语言模型，让企业的文档可批量上传，无需更多的整理，直接转化为有效的QA，供座席和机器人直接调用呢？

当前的主流客服产品
- 智能客服系统会标配知识库管理功能，常见的形式是树状结构，提供分类管理、知识库条目管理，并支持知识库的批量导入导出操作。
- 使用中，企业需要经常性地维护管理知识库内容，将企业已有知识内容文档上传，但如果是将原文件上传，则系统最多能支持预览功能，使用者在操作界面只能点击打开全文检索。而如果是机器人知识库，直接上传文档是不可用的，需要操作者手工整理文档中的内容为机器人标准问答对。

大模型时代
- 所有企业的文档可以批量上传，无需更多的整理，直接可自动转化为有效的QA，供座席和机器人直接调用。

#### 方法总结

[作者](https://www.zhihu.com/question/591935281/answer/2961925796)

常见的方法：
- retrieve-then-generate：类ChatGPT Retrieval Plugin的技术方案
  - 根据输入query来抽取相关外部文本，把抽取到的文本和query一起作为prompt再来做后续字符的推理。
  - chatpdf这种产品的方法也类似，先把你输入的文档分成多个chunk分别做embedding放到向量数据库里，然后根据输入embedding的向量做匹配，再把匹配到的向量对应的chunk和输入一起作为prompt给LLM。
  - 论文：【2020-2-10】[REALM: Retrieval-Augmented Language Model Pre-Training](https://arxiv.org/abs/2002.08909)
- `Fine-tuning`：Fine-tuning是指在已经训练好的GPT/LLM模型基础上，使用**新数据集**再次训练。这种方法可以使模型针对特定任务或特定领域的语言使用情况进行优化，从而提高模型的效果。在Fine-tuning过程中，可以将**额外知识**作为新的数据集加入到训练中。
- `Knowledge Distillation`：Knowledge Distillation是指将一个“大模型”的知识转移到一个“小模型”中。例如，可以将一个已经训练好的GPT/LLM模型的知识转移到一个小型的模型中，使得小型模型能够使用大型模型中的知识。这种方法可以通过将额外的知识加入到“大模型”中，从而使得“小模型”可以使用这些知识。
- `数据增强`：数据增强是指在已有的数据集中，添加一些类似但不完全相同的数据来增加数据的数量和多样性。这种方法可以使得模型更加全面地学习到不同的语言使用情况，从而提高模型的效果。在数据增强的过程中，可以添加额外的知识，例如同义词、反义词、专业术语等。
  - 词向量：将领域特定的词汇和词向量添加到模型的词汇表中。这些词汇可以是在目标领域中独有的词汇或者在常规数据集中缺失的词汇。
  - 外部数据集：从外部数据集中收集与目标领域相关的数据，并将其添加到模型的训练数据中。这种方法需要找到与目标任务相关的高质量数据集，并使用适当的方法将其合并到模型的训练数据中。
  - 外部知识库：将外部的知识库，如百科全书、知识图谱等，与模型集成，以便模型可以使用这些知识来辅助其生成文本。
  - 人工标注：通过人工标注的方式，将领域特定的信息添加到训练数据中。这种方法需要大量的人力和时间，并且对于大型数据集来说可能不切实际。
- `多任务学习`：多任务学习是指同时训练一个模型完成多个任务。例如，在训练GPT/LLM模型时，可以让模型同时完成文本分类、情感分析等任务，从而使得模型可以学习到更加多样化的知识。在多任务学习的过程中，可以将额外的知识添加到其他任务中，从而间接地影响到模型在主要任务上的表现。

【2023-4-22】基于llama-index和ChatGPT API定制私有对话机器人的方式。

方案
- 1、fine-tunes微调。用大量数据对GPT模型进行微调，实现一个理解文档的模型。
  - 但微调需要花费很多money，而且需要一个有实例的大数据集。也不可能在文件有变化时每次都进行微调。
  - 微调不可能让模型 “知道“ 文档中的所有信息，而是要教给模型一种新的技能。
  - 因此，微调不是一个好办法。
- 2、将私有文本内容作为prompt的上下文，访问ChatGPT。
  - openai api存在最大长度的限制，ChatGPT 3.5的最大token数为4096，如果超过长度限制，会直接对文档截断，存在上下文丢失的问题。
  - 并且api的调用费用和token长度成正比，tokens数太大，则每次调用的成本也会很高。

#### llama-index

【2023-4-23】参考
- [定制自己的文档问答机器人](https://zhuanlan.zhihu.com/p/623523968)
- [LlamaIndex ：面向QA 系统的全新文档摘要索引](https://mp.weixin.qq.com/s/orODrHefDpr-gHNyjxhXmg)

既然tokens有限制，那么有没有对文本内容进行**预处理**的工具？不超过token数限制。
- 借助llama-index可以从文本中只提取出相关部分，然后将其反馈给prompt。
- [llama-index](https://github.com/jerryjliu/llama_index)支持许多不同的数据源，如API、PDF、文档、SQL 、Google Docs等。

一种全新的 LlamaIndex 数据结构：**文档摘要索引**，与传统**语义搜索**相比，检索性能更好

多数构建 LLM 支持的 QA 系统步骤：
- 获取**源文档**，将每个文档拆分为**文本块**
- 将**文本块**存储在**向量数据库**中
- 查询时，通过**嵌入相似性** 和/或 **关键字过滤器**来检索文本块。
- 执行响应并**汇总**答案

由于各种原因，这种方法检索性能有限。
- 文本块**缺乏全局上下文**。通常query上下文超出了特定块中索引的内容。
- 仔细调整 top-k / 相似度分数阈值。
  - 假设值太小，你会错过上下文。
  - 假设值值太大，并且成本/延迟可能会随着更多不相关的上下文而增加，噪音增加。
- 嵌入选择的上下文不一定最相关。
  - 嵌入本质上是在文本和上下文之间分别确定的。

添加**关键字过滤器**是增强检索结果的一种方法。
- 但需要手动或通过 NLP 关键字提取/主题标记模型为每个文档充分确定合适的关键字。
- 此外，还需要从查询中充分推断出正确的关键字。

LlamaIndex中提出了一个新索引，为每个文档提取/索引**非结构化文本摘要**。
- 该索引可以提高检索性能，超越现有的检索方法。有助于索引比单个文本块更多的信息，并且比关键字标签具有更多的语义。

如何构建？
- 提取每个文档，并使用 LLM 从每个文档中提取**摘要**。
- 将文档拆分为**文本块**（节点）。摘要和节点都存储在文档存储抽象中。
- 维护从**摘要**到**源文档/节点**的映射。

在查询期间，根据摘要检索相关文档以进行查询：
- 基于 **LLM** 的检索：向 LLM 提供文档摘要集，并要求 LLM 确定: 哪些文档是相关的+相关性分数。
- 基于 **嵌入** 的检索：根据摘要嵌入相似性（使用 top-k 截止值）检索相关文档。

注意
- 检索文档**摘要**的方法不同于基于**嵌入**的文本块检索。**文档摘要索引**检索**任何**选定文档的所有节点，而不是返回节点级别的相关块。

存储文档的摘要还可以实现基于 LLM 的检索。
- 先让 LLM 检查简明的文档摘要，看看是否与查询相关，而不是一开始就将整个文档提供给 LLM。
- 这利用了 LLM 的推理能力，它比基于嵌入的查找更先进，但避免了将整个文档提供给 LLM 的成本/延迟

带**摘要**的文档检索是**语义搜索**和所有文档的强力摘要之间的“中间地带”。

示例
- 构建方法见原文：[LlamaIndex ：面向QA 系统的全新文档摘要索引](https://mp.weixin.qq.com/s/orODrHefDpr-gHNyjxhXmg)

高级api

```py
query_engine = doc_summary_index.as_query_engine(
  response_mode="tree_summarize", use_async=True
)
response = query_engine.query("What are the sports teams in Toronto?")
print(response)
```

底层api

```py
# use retriever as part of a query engine
from llama_index.query_engine import RetrieverQueryEngine

# configure response synthesizer
response_synthesizer = ResponseSynthesizer.from_args()

# assemble query engine
query_engine = RetrieverQueryEngine(
    retriever=retriever,
    response_synthesizer=response_synthesizer,
)
# query
response = query_engine.query("What are the sports teams in Toronto?")
print(response)
```



安装

```sh
pip install openai
pip install llama-index
```

调用代码
- construct_index方法中，使用llama_index的相关方法，读取data_directory_path路径下的txt文档，并生成索引文件存储在index_cache_path文件中。

```py
from llama_index import SimpleDirectoryReader, GPTListIndex, GPTSimpleVectorIndex, LLMPredictor, PromptHelper,ServiceContext
from langchain import OpenAI 
import gradio as gr 
import sys 
import os 
os.environ["OPENAI_API_KEY"] = 'your openai api key'
data_directory_path = 'your txt data directory path'
index_cache_path = 'your index file path'
​
#构建索引
def construct_index(directory_path): 
        max_input_size = 4096 
        num_outputs = 2000 
        max_chunk_overlap = 20 
        chunk_size_limit = 500
      
        llm_predictor = LLMPredictor(llm=OpenAI(temperature=0, model_name="text-davinci-003", max_tokens=num_outputs))
        # 按最大token数500来把原文档切分为多个小的chunk
        service_context = ServiceContext.from_defaults(llm_predictor=llm_predictor, chunk_size_limit=chunk_size_limit)
        # 读取directory_path文件夹下的文档
        documents = SimpleDirectoryReader(directory_path).load_data() 
 
        index = GPTSimpleVectorIndex.from_documents(documents, service_context=service_context)
        # 保存索引
        index.save_to_disk(index_cache_path) 
        return index 
        
def chatbot(input_text): 
        # 加载索引
        index = GPTSimpleVectorIndex.load_from_disk(index_cache_path) 
        response = index.query(input_text, response_mode="compact") 
        return response.response 
        
if __name__ == "__main__":
        #使用gradio创建可交互ui  
        iface = gr.Interface(fn=chatbot, 
                        inputs=gr.inputs.Textbox(lines=7, label="Enter your text"), 
                        outputs="text", 
                        title="Text AI Chatbot") 
        index = construct_index(data_directory_path) 
        iface.launch(share=True)
```

llama-index的工作原理如下：
- 创建文本块索引
- 找到最相关的文本块
- 使用相关的文本块向 GPT-3（或其他openai的模型） 提问
- 在调用query接口的时候，llama-index默认会构造如下的prompt:

```sh
"Context information is below. \n"
    "---------------------\n"
    "{context_str}"
    "\n---------------------\n"
    "Given the context information and not prior knowledge, "
    "answer the question: {query_str}\n"
```

使用以上prompt请求openai 的模型时，模型根据提供的上下文和提出的问题，使用其逻辑推理能力得到想要的答案。

![](https://pic2.zhimg.com/80/v2-9aa943fe84bc25da03b866e7f52a940d_1440w.webp)

【2023-4-13】[如何为GPT/LLM模型添加额外知识？](https://www.zhihu.com/question/591935281/answer/2979220793)

#### retrieve-then-generate

1、retrieve-then-generate：类ChatGPT Retrieval Plugin的技术方案
 
核心：根据 输入query 检索本地/私有数据库/文档中的文档片段（检索可以是文本检索或基于向量的检索），作为扩充的上下文 context，通过 prompt template 组合成一个完整的输入，继而调用模型生成response。

简版工作流：
- chunk -> index -> retrieve -> construct input -> LLM
 
推荐开源工具：
- （1）OpenAI 的官方插件：[ChatGPT Retrieval Plugin](https://github.com/openai/chatgpt-retrieval-plugin)
- （2）llama-index：[https://github.com/jerryjliu/llama_index](https://github.com/jerryjliu/llama_index)，提供了一个本地/私有数据收集（ingestion）和数据索引（indexing）的解决方案，构建起外部数据和 LLM 之间的接口。

一个利用 llama-index 定制个人论文检索的示例：[llama_index/examples/paul_graham_essay at main · jerryjliu/llama_index](https://github.com/jerryjliu/llama_index/tree/main/examples/paul_graham_essay)。
 
（在没有OpenAI API的情况下，llama-index 支持调用自定义的 LLM。）
 
（3）LangChain：[langchain](https://github.com/hwchase17/langchain)，也是为了更好的构建外部数据、其他应用与 LLM 进行交互的接口层框架。

LangChain应用参考示例：[GPT-4 & LangChain——PDF聊天机器人-地表最强全文搜索](https://www.bilibili.com/read/cv22589352)。
 
llama-index 和 LangChain 可以组合使用，LangChain 中提供了 面向不同任务的 prompt template 和 prompt chain。
 
#### 基于 fine-tuning 的方式

2、基于 fine-tuning 的方式，相比于第一种方案，基于 fine-tuning 的方式需要额外的训练开销，同时还是会受限于LLM的最大长度限制。

“让 LLM 具备理解定制数据库的能力”是很有挑战的目标，同时也会有很多应用场景。

使用Hugging Face实现将维基百科的知识库添加到GPT-2模型中
- 作者：[小斐实战](https://www.zhihu.com/question/591935281/answer/2960837503)

```py
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer, TextDataset, DataCollatorForLanguageModeling, Trainer, TrainingArguments

# 加载预训练的GPT-2模型
model = GPT2LMHeadModel.from_pretrained('gpt2')

# 加载GPT-2的tokenizer
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')

# 加载维基百科的文本文件，并将其转换为数据集
dataset = TextDataset(
    tokenizer=tokenizer,
    file_path='path/to/wiki.txt',
    block_size=128
)

# 创建data collator
data_collator = DataCollatorForLanguageModeling(
    tokenizer=tokenizer, 
    mlm=False
)

# 设置训练参数
training_args = TrainingArguments(
    output_dir='./results',          # 输出目录
    num_train_epochs=3,              # 训练的轮数
    per_device_train_batch_size=8,   # 训练时每个GPU的batch size
    per_device_eval_batch_size=8,    # 验证时每个GPU的batch size
    evaluation_strategy='steps',     # 评估策略
    save_steps=500,                  # 多少步保存一次模型
    save_total_limit=2,              # 最多保存几个模型
    logging_steps=500,               # 多少步记录一次日志
    learning_rate=5e-5,              # 学习率
# 创建Trainer对象
trainer = Trainer(
model=model,
args=training_args,
train_dataset=dataset,
data_collator=data_collator,
prediction_loss_only=True
)

# 开始训练
trainer.train()

# 保存微调后的模型
trainer.save_model('./fine-tuned-model')
```

#### 知识图谱增强

使用知识图谱增强GPT-2模型的示例代码：

```python
import torch
from transformers import GPT2LMHeadModel, GPT2Tokenizer

# 加载预训练的GPT-2模型
model = GPT2LMHeadModel.from_pretrained('gpt2')
# 加载GPT-2的tokenizer
tokenizer = GPT2Tokenizer.from_pretrained('gpt2')
# 加载知识图谱: 表示一些实体和它们之间的关系。
knowledge_graph = {
    'John': {
        'is a': 'person',
        'born in': 'New York',
        'works at': 'Google'
    },
    'Google': {
        'is a': 'company',
        'headquartered in': 'California',
        'founded by': 'Larry Page and Sergey Brin'
    }
}

# 将知识图谱嵌入到模型中
model.resize_token_embeddings(len(tokenizer))
for entity in knowledge_graph.keys():
    entity_id = tokenizer.convert_tokens_to_ids(entity)
    entity_embedding = torch.randn(768)
    model.transformer.wte.weight.data[entity_id] = entity_embedding

# 生成句子
input_text = 'John works at'
input_ids = tokenizer.encode(input_text, return_tensors='pt')
output = model.generate(
    input_ids,
    max_length=50,
    do_sample=True,
    top_k=50
)
output_text = tokenizer.decode(output[0], skip_special_tokens=True)
print(output_text)
```


#### New Bing

- 优势：免费，快捷，可以联网，支持中英文，可以阅读本地PDF和网络论文，可以持续问答交互
- 缺点：不稳定，识别内容有限，甚至于信息量低于摘要的内容。经常会输出一半就断了。

#### chatpdf

[ChatPDF](https://www.chatpdf.com) 界面干净，上传pdf后，直接对话。
- 上传速度很快，对话响应也非常的快。
- 对文档内容的解析很准确，包括一些隐藏在内部的知识点也可以快速搜索找到
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TdjoY88FTkaxGc~noop.image?_iz=58558&from=article.pc_detail&x-expires=1684219771&x-signature=A9yfB6gzbQrwWdUHuBZ2o0bRZzM%3D)

优势：
- 交互方便，容易上手，可以持续问答交互缺点：全文总结信息量较低，问答模式偏向于关键词定位，然后上下文翻译，且已经收费，每月5刀。只支持本地PDF文档上传。

#### scispace

- 优势：交互方便，容易上手，可以持续问答交互，支持本地论文上传，可以公式截图解析，可以解释伪代码
- 缺点：对中文支持较差，全文总结效果较差。

#### aminer.cn

清华唐杰老师他们组的工作！
- ![](https://pic1.zhimg.com/80/v2-33843cf159df1ca9e4a28fa32a15a759_1440w.webp?source=1940ef5c)
- ![](https://pic1.zhimg.com/80/v2-765efacd5340b65de02e79087ee91a07_1440w.webp?source=1940ef5c)

- 优势：有热点论文推送！有论文打分，和别人的提问记录
- 缺点：语义理解有限

#### ChatPaper 开源

中科大出品：ChatPaper, Use ChatGPT to summarize the arXiv papers. 全流程加速科研，利用chatgpt进行论文总结+润色+审稿+审稿回复
- 功能：论文（离线/在线）总结+论文润色+AI审稿+AI审稿回复等功能。
- [github](https://github.com/kaixindelele/chatpaper), [demo](https://chatpaper.org/)

问题：
- 前面几款工具都面临一个问题，全文总结的信息量较低，因为GPTs的输入token是**远低于**论文的全文文本的，而简单的翻译总结摘要，又拿不到多少有效信息

方案：
- 将abstract和introduction进行压缩，然后输入给chat进行总结

效果
- 每篇文章，调用五次chat，可以获得7到8成的信息量，并且格式化输出成中国人容易看懂的文本，极大的降低了大家的阅读门槛。几乎可以达到，AI花一分钟总结，人花一分钟看总结，就可以判断这篇文章是否需要精读的效果。
- 如果需要**精读**，则可以调用上面的各种工具，尤其推荐scispace和aminer.


#### PandasGPT

[PandaGPT](https://www.pandagpt.io/), 访问速度偏慢，UI对话样式一言难尽，没有一个版块不是互相遮挡的
- 已有3w个文档，10w个问题
- 上传文档，直接针对文档问答; 还能生成知识图谱，Generate Knowledge Graph
- ![](https://uploads-ssl.webflow.com/6405047c9d73416a60b878b4/6405068dec8bf7442171f160_Screenshot%202023-03-05%20at%204.15.30%20PM.png)

- 问题回答基本到位，相比ChatPDF，略显啰嗦
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TdjoY8iElGGYks~noop.image?_iz=58558&from=article.pc_detail&x-expires=1684219771&x-signature=BO6bt9JW5V%2Fsitc%2F%2FKWe6sBmUHY%3D)

类似的，还有 AMiner 上的华智冰

#### ChatDOC

【2023-3-28】[ChatDOC](https://chatdoc.com/)文档阅读工具，支持中文！又快又免费！使用 ChatGPT 阅读文件的AI问答机器人
- 基于 ChatGPT 的文件阅读助手，支持中英文，可以快速从上传研究论文、书籍、手册等文件中提取、定位和汇总文件信息，并通过聊天的方式在几秒钟内给出问题的答案。
- ChatDOC 还可以理解文档中的表格或文字，优化其数据分析性能，并为每个回答提供直接引用的来源，方便核实AI的解读准确性。
- ChatDOC 目前免费，文件大小限制为 200 页，最多可以上传 5 个文档。在即将更新的版本中，还支持跨多个文档的综合查询和问答。
- ![](https://pic2.zhimg.com/80/v2-c73f17ecea423a82aad0ac7c110bd625_720w.webp)


#### typeset

[typeset](https://typeset.io)
- 主打论文检索，也支持pdf文档解读。
- 上传、对话响应都十分缓慢，对话的效果差，很多知识点无法解读，一律回复无法找到这个问题的答案。
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TdjoY9mB4FVHsf~noop.image?_iz=58558&from=article.pc_detail&x-expires=1684219771&x-signature=DjAXODUMrVrnilF7CAXPLSUT0qs%3D)


#### 自研方案

自研框架的选择
- 基于OpenAIEmbeddings，官方给出了基于embeddings检索来解决GPT无法处理长文本和最新数据的问题的实现方案。[参考](https://www.datalearner.com/blog/1051681543488862)
- 也可以使用 LangChain 框架。

参考
- [ChatGPT怎么建立私有知识库？](https://www.zhihu.com/question/596838257/answer/3004754396)
- [利用LangChain和国产大模型ChatGLM实现基于本地知识库的自动问答](https://www.zhihu.com/zvideo/1630964532179812353)

除了从文档中抓取数据，从指定网站URL抓取数据，实现智能客服外部知识库，可以借助ChatGPT写Python代码，PythonBeautiful Soup库的实现方式很成熟

大厂产品截图：智能客服知识库建设
- 企业资料库，关联大语言模型自动搜索
- ![a](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TdjoYAg6aFUKbz~noop.image?_iz=58558&from=article.pc_detail&x-expires=1684219771&x-signature=5kqgHWkZX6LPdrX2H9Zq59m%2BwO0%3D)
- 大模型文档知识抽取和“即搜即问”
- ![b](https://p9-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TdjoYkN7rAGx03~noop.image?_iz=58558&from=article.pc_detail&x-expires=1684219771&x-signature=gO%2FqHxavS7KVAfE08Mv0WayLjLQ%3D)
- ![b](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TdjoYmX2ImA5oO~noop.image?_iz=58558&from=article.pc_detail&x-expires=1684219771&x-signature=rlim2GCZ8zsapnPyzA47LCHJkEo%3D)


##### OpenAIEmbeddings


##### LangChain


### 推荐系统

【2023-5-12】[gpt4这种大模型能力对推荐系统这个领域有什么影响？](https://www.zhihu.com/question/591580147)

结论：
- 短期内，不会对推荐系统有大的影响。
- 长期看，对推荐系统的影响体现在
  - 大模型催生新的业务场景：比如基于问答的推荐场景，当用户查询旅游攻略时，除了常规的线路规划，还可以给出基于用户偏好的酒店，餐厅推荐候选。在这类的场景下，搜索和推荐相比当前的交互，会更加融合。
  - 大模型提升生产力，导致垃圾内容泛滥：如何识别aigc 内容，降低该类内容对内容生态冲击，流量蚕食会是未来的一个新命题。大模型在用户关怀上的应用：通过内容生产能力，为用户产生不同风格化的评论，对创作者进行促活，也是一个比较有潜力的应用，现在的生成模型缺乏内容理解和产出风格化的能力。
  - 大模型对内容理解能力的提升，使推荐朝端到端的方向发展：当前推荐建模依赖大量离散特征以及统计后验特征，如果未来能通过大模型的内容理解能力，直接匹配用户理解，这样端到端的新范式，会重塑推荐系统的发展线路。

推荐大模型最有可能的路线
- 借助语言图像类大模型的**内容理解能力**，把对内容的理解固定在一个稳定的embedding 空间，完全替代掉推荐模型里的itemid类稀疏特征，在系统层面，真正的学到推荐“知识”，并具有大规模泛化能力，这是最令我激动和充满热情的技术路线。

作者：[手套销售拉呱总](https://www.zhihu.com/question/591580147/answer/3006390042)

#### Chat-Rec

【2023-4-4】[Chat-REC: 当推荐系统遇上 ChatGPT, 会发生什么奇妙反应](https://mp.weixin.qq.com/s/ulV8R72zSStdwwNfhtys_g)，[解说](https://zhuanlan.zhihu.com/p/619161007)
- [Chat-REC: Towards Interactive and Explainable LLMs-Augmented Recommender System](https://arxiv.org/abs/2303.14524)

推荐系统已被广泛部署用于自动推断人们的偏好并提供高质量的推荐服务。然而大多数现有的推荐系统仍面临诸多缺陷，例如缺少交互性、可解释性，缺乏反馈机制，以及冷启动和跨域推荐。

本文中提出了一种用 LLMs 增强传统推荐的范式 `Chat-Rec`（ChatGPT Augmented Recommender System）。通过将**用户画像**和**历史交互**转换为 Prompt
- Chat-Rec 将用户与物品的历史交互、用户档案、用户查询 和对话历史 （如果有的话）作为输入，并与任何推荐系统R接口。
- 如果任务被确定为推荐任务，该模块使用 R 来生成一个候选项目集。否则，它直接向用户输出一个响应，如对生成任务的解释或对项目细节的要求。提示器模块需要多个输入来生成一个自然语言段落，以捕捉用户的查询和推荐信息。这些输入如下：
  1. 用户与物品的历史交互，指的是用户过去与物品的互动，比如他们点击过的物品，购买过的物品，或者评价过的物品。这些信息被用来了解用户的偏好并进行个性化推荐。
  2. 用户画像，其中包含关于用户的人口统计和偏好信息。这可能包括年龄、性别、地点和兴趣。用户资料有助于系统了解用户的特点和偏好。
  3. 用户查询 Qi ，这是用户对信息或建议的具体要求。这可能包括他们感兴趣的一个具体项目或流派，或者是对某一特定类别的推荐的更一般的请求。
- ![](https://pic3.zhimg.com/80/v2-234ea3011f274c43cda0a6d233cb7d8a_1440w.webp)
- Chat-Rec 的框架。左边显示了用户和 ChatGPT 之间的对话。中间部分显示了 Chat-Rec 如何将传统的推荐系统与 ChatGPT 这样的对话式人工智能联系起来的流程图。右侧描述了该过程中的具体判断。

- `Chat-Rec` 可以有效地学习用户的偏好，它<span style='color:blue'>不需要训练，而是完全依赖于上下文学习</span>，并可以有效推理出用户和产品之间之间的联系。通过 LLM 的增强，在每次对话后都可以迭代用户偏好，更新候选推荐结果。

此外，产品之间的用户偏好是相关联的，这允许更好的跨域产品推荐。Chat-Rec 为运用 ChatGPT 等对话 AI 进行多种推荐情景的应用提供了有希望的技术路线。

#### 商品推荐

定制化商品推荐，告别传统“傻瓜”推荐算法
- 当下国内众多电商的推荐算法都还是基于传统技术，因此也会出现“买过的东西依然推荐”的傻瓜做法，AI大模型有望彻底改变这些业态

ChatGPT有一些营销场景应用是围绕垂直领域展开，革新推荐算法逻辑，让产品卖点更精准地触达目标客户。
- 海外生鲜电商平台`Intacart`的食物搜索工具，其基于ChatGPT推出了面向食物推荐的应用，与自身来自75000多零售合作商店的产品数据结合了起来，帮助客户找到购物的灵感。
- 美国一款名为`Expedia`软件内置了一个聊天机器人，它可以通过AI大模型算法为用户规划旅游。有人经历过用ChatGPT规划旅游被推荐一个不存在的海滩，能够在iOS上轻便运行的Expedia据称不会出现这个问题。Expedia会根据旅游地推荐经济实惠的酒店，建议可以打卡的景点，是大模型落地垂直旅游行业的一个代表应用案例。


### 办公

详见站内文章：[智能办公](aigc#智能办公)

### 视觉应用

【2023-3-14】[ChatGPT 有什么新奇的使用方式？](https://www.zhihu.com/question/582979328/answer/2933058469)

#### Visual ChatGPT

[Visual ChatGPT（一）: 除了语言问答，还能看图问答、AI画图、AI改图的超实用系统](https://zhuanlan.zhihu.com/p/612627818)
- 2023.3.9，微软官方github放出Visual ChatGPT的系统实现，这篇paper通过利用**chatgpt api**和**开源模型**实现了一个**多模态**的**问答系统**，不仅可以语言问答，还可以输入一张图实现`VQA`视觉问答，还集成stable diffusion可以进行`AI绘画`！语言问答、看图问答、AI绘画，将AI届近期的3大热点集于一身
- ![](https://pic4.zhimg.com/80/v2-3a99a918a6d29ffb759d82c359eff5bf_1440w.webp)

实现的功能（详细的可以去看论文的附录A.Tool Details）：
1.  获取图片的语言描述：[Salesforce/blip-image-captioning-base](https://huggingface.co/Salesforce/blip-image-captioning-base)
2.  输入语言进行AI绘画：[runwayml/stable-diffusion-v1-5](https://huggingface.co/runwayml/stable-diffusion-v1-5)
3.  去除或者替换图片上的某个东西：[runwayml/stable-diffusion-inpainting](https://huggingface.co/runwayml/stable-diffusion-inpainting)，[CIDAS/clipseg-rd64-refined](https://huggingface.co/CIDAS/clipseg-rd64-refined)
4.  通过语言修改图片：[timbrooks/instruct-pix2pix](https://huggingface.co/timbrooks/instruct-pix2pix)
5.  看图回答问题：[Salesforce/blip-vqa-base](https://huggingface.co/Salesforce/blip-vqa-base)
6.  canny边缘检测/depth深度检测/HED边缘提取/mlsd线段识别/normal模型识别/openpose姿势识别/scribble黑白稿提取/seg语义分割和根据此画图：主要是各种开源的视觉任务模型VFMs，然后[ControlNet](https://github.com/lllyasviel/ControlNet.git)实现画图。


### 直播

#### 数字人直播

智能虚拟数字人直播，自动生成、24小时不间断越来越多的数字人直播闯入电商，接下来他们可能渐渐智商变得更高，让人分不清是人是机器。
- 4月21日，位于美国旧金山的Synthesis AI宣布开发了一种可以通过文本提示创建逼真虚拟数字人的新方法，使用生成式AI和视觉效果管道来制作高分辨率、电影质量的虚拟数字人，并可用于游戏、虚拟现实、电影和模拟等各种应用。

国内智能数字人已成为众多上市公司和创企扎堆进入的领域。
- 国内AI股上市`天娱数科`的虚拟数字人已经接入ChatGPT等模型；
- 虚拟技术提供商`世优科技`目前已将ChatGPT技术接入数字人产品当中；

智能内容生成平台`来画`也在3月底正式接入ChatGPT，短短几十秒就能生成一篇高质量**视频文案**，并推出数字IP+直播模式。
- [演示](https://vdn3.vzuu.com/SD/30c605fe-ee5e-11ed-a776-8a021c6205d3-v1_f4_t2_yr6vExa3.mp4?disable_local_cache=1&bu=078babd7&c=avc.1.1&f=mp4&expiration=1683810316&auth_key=1683810316-0-0-c37e2a42c4a42997ae186fd69a5470e4&v=tx&pu=078babd7)

### 语音应用

【2023-3-16】AMIner论文

#### Voice ChatGPT

Chrome应用商店，输入“Chatgpt voice control”，Chrome应用商店，输入“Chatgpt voice control”
- ![](https://pica.zhimg.com/80/v2-6077f93ee27145806307dbb6ab3da801_1440w.webp?source=1940ef5c)

详见：[知乎](https://www.zhihu.com/question/582979328/answer/2912777383)

- 【2023-2-11】[CCTV视频](https://www.toutiao.com/video/7198541558600499770/)里，台湾人在演示 [VoiceGPT](https://voicegpt.net/)，[VoiceGPT APK Download (version 1.35) 下载地址](https://voicegpt.net/voicegpt_135.apk) , 目前就安卓版，使用时需要代理

#### VALL·E 语音合成

【2023-4-8】[3秒复制任何人的嗓音！微软音频版DALL·E细思极恐，连环境背景音也能模仿](https://zhuanlan.zhihu.com/p/598230971)
- 微软最新AI成果——语音合成模型VALL·E，只需3秒语音，就能随意复制任何人的声音。
- 脱胎于DALL·E，但专攻音频领域，语音合成效果在网上放出后火了：

语音合成趋于成熟，但之前零样本语音合成效果并不好。
- 主流语音合成方案基本是预训练+微调模式，如果用到零样本场景下，会导致生成语音相似度和自然度很差。

基于此，VALL·E横空出世，相比主流语音模型提出了不太一样的思路。
- 相比传统模型采用梅尔频谱提取特征，VALL·E直接将语音合成当成了语言模型的任务，前者是连续的，后者是离散化的。
- 传统语音合成流程往往是“音素→梅尔频谱（mel-spectrogram）→波形”这样的路子。但VALL·E将这一流程变成了“音素→离散音频编码→波形”：
- ![](https://pic1.zhimg.com/80/v2-0ab4e5b66e97e6c9d989054bff9fca5c_1440w.webp)

VALL·E也和VQVAE类似，将音频量化成一系列离散tokens，其中第一个量化器负责捕捉音频内容和说话者身份特征，后几个量化器则负责细化信号，使之听起来更自然
- ![](https://pic3.zhimg.com/80/v2-6172070562fa697099b031e98e28383a_1440w.webp)

随后以文本和3秒钟的声音提示作为条件，自回归地输出离散音频编码：
- ![](https://pic3.zhimg.com/80/v2-3ba4d709246941d063c9cd4f5da4480e_1440w.webp)

VALL·E还是个全能选手，除了零样本语音合成，同时还支持语音编辑、与GPT-3结合的语音内容创建。

那么在实际测试中，VALL·E的效果如何呢？
- 根据已合成的语音效果来看，VALL·E能还原的绝不仅仅是说话人的音色。
- 不仅语气模仿到位，而且还支持多种不同语速的选择，例如这是在两次说同一句话时，VALL·E给出的两种不同语速，但音色相似度仍然较高
- 同时，连说话者的环境背景音也能准确还原。
- 除此之外，VALL·E还能模仿说话者的多种情绪，包括愤怒、困倦、中立、愉悦和恶心等好几种类型。

值得一提的是，VALL·E训练用的数据集不算特别大。
- 相比OpenAI的Whisper用了68万小时的音频训练，在只用了7000多名演讲者、6万小时训练的情况下，VALL·E就在语音合成相似度上超过了经过预训练的语音合成模型YourTTS。

而且，YourTTS在训练时，事先已经听过108个演讲者中的97人声音，但在实际测试中还是比不过VALL·E。

VALL·E目前还没开源
- paper: [Neural Codec Language Models are Zero-Shot Text to Speech Synthesizers](https://arxiv.org/abs/2301.02111)
- [valle-demo](https://valle-demo.github.io/)

### 智能对话

角色模拟

#### Character.ai

Character.ai 是个性化 AI 聊天机器人平台，用户可以在 Character 上根据个人偏好定制 **AI 角色**并和它聊天。ChatGPT 已经证明了人们对 Chatbot 的狂热和粘性，Character.ai 在此基础上加入个性化、UGC 两大武器，有了比 ChatGPT 更丰富的使用场景。
- 自 2022 年 9 月发布后的两个月内，用户共创建了 35 万个角色，2022 年 12 月初 - 12 月中，用户日活又翻了 3 倍，目前 Character.ai 的月活跃用户数在小几十万的量级。

Character.ai 团队背景也十分亮眼，创始人 Noam Shazeer 是 Transformer 作者之一，联合创始人 Daniel de Freitas 领导了 Meena 和 LaMDA 的开发。

Character.ai 行业启发在于：随着高性能大模型的使用门槛进一步降低，未来 AI 应用层的颠覆式创新或许不在技术，而是产品设计维度的绝妙想法。

#### 阿里天猫精灵

【2023-4-4】[阿里搞出脱口秀版GPT](https://zhuanlan.zhihu.com/p/619463521)！与鸟鸟激辩一小时，话痨到停不下来… 文本扛把子、有知识有自己的情绪、还能随时来个段子。
- 阿里新版本大模型的技术演示脱口秀版GPT——鸟鸟分鸟，并且已经在天猫精灵上为个人终端行业的客户做了演示
- 鸟鸟分鸟确实继承了本鸟的相关能力，尤其是文本的创作和表达、风格情绪以及语速……

鸟鸟分鸟这个智能音箱场景为例，就需要解决至少三个方面的问题。
- 1、应对更**复杂**的交互场景。不同于以文本交互为主的通用场景，**双向开放对话**决定了用户不会对文本进行“二次”过滤，而是想说就说，这就要求AI能过滤掉诸多无意义的对话。与此同时，用户也不愿意等待数秒，而是像日常交流那样，低延时、还能支持随时打断、随时反馈。
- 2、基于**人类反馈强化学习**的可行性。ChatGPT惊艳全球的生成效果，背后归结于注入强人工反馈的奖励机制。高质量的数据标注成为大模型落地的关键，而且消费场景下多轮对话的频率远比文本交互要高，这对企业的数据处理能力提出了更高的要求。之后随着应用落地，大量的人类交互和反馈来帮助大模型更快进化，以及关乎用户数据完全管理机制也需要完善和健全。
- 3、需要强大的**网络分发**能力。大模型每一次运行都需要耗费大量的计算存储资源，这就要求企业能有广泛部署的网络分发能力。

总的来看，算力、算法和数据是大模型能力实现的三板斧，而要让大模型落地应用还需要云端工程化能力、海量的用户交互、安全管理机制等要素。

个性化对话增强则主要是让大模型学习多种对话形式，比如启发式、多轮对话，尤其是一些需要依赖长期记忆的对话。除了大模型训练，他们在算法和工程上面做了不少工作。从交互流程来划分，主要分成听清、音色、文风、对话等步骤。
- ![](https://pic1.zhimg.com/80/v2-25012cce8c81953081ce51b4554cde2c_1440w.webp)

最终形成了这样一个对话过程：
> 当人类询问一个问题（Query）时，首先经过猫耳算法将其转换为文本，随后通过大模型产生个性化的对话回复，最后再到个性化的语音合成给出回答。整个过程还有Multi-Turn对话系统来支持。

对于测试阶段存在的一些问题，阿里这边也给出了回应。
> 比如反应过于太强，这是因为还没有将线上的猫耳算法和ASR做充分的融合，为了听清多轮对话信息，显得过于灵敏，以及暂没有全面支持英文等问题，他们表示后续还将进一步迭代更新。

大模型发展进程，有两条路径已经明晰：如火如荼的**通用大模型**，以及备受关注的**个性化大模型**。
- 以GPT-4为代表的**通用模型**，在多个标准化考试中大幅超过人类水平，适用于搜索引擎、生产力工具这种广泛、公域场景。
- 但像更多私域个性化、或者**垂直专业化场景**中，比如问及有无特别偏好、对某件事情观点等，个性化大模型就会是一个很好的补充。

当前，全球研究机构和大厂在这一路径的探索，主要涵盖了四个研究方向：
- 有偏好的**个性化**对话、逻辑**一致性**和**三观**、**对话风格**、多轮对话中人设一致性。
- ![](https://pic3.zhimg.com/80/v2-1234ad97865dfe00da8961d7b93ca5b6_1440w.webp)

鸟鸟分鸟上的探索
- 一方面呈现出个性化大模型的研究方向 —— 在大模型系列的基础上，打造知识、情感、性格和记忆四位一体的个性化大模型，并且这个大模型版本可能是很适合在消费者终端上部署的。
- 另一方面，也再次印证了对话即入口的AI2.0未来趋势。ChatGPT上线的插件功能，以文本交互的方式，与全球5000+应用联动。大模型所引领的AI 2.0时代，而对话相当于是操作系统（ChatOS），所有应用都将被重新定义。

![](https://p0.itc.cn/q_70/images03/20230404/1911e9194cc04e3b9d40036f2c53270b.png)

【2023-4-4】[阿里GPT 15天训出「鸟鸟」嘴替，比ChatGPT+Siri刺激多了](https://zhuanlan.zhihu.com/p/619371433)

训练过程
1. 使用全新的阿里大模型版本做基础学习
2. 学会用工具，获取最新的知识
3. 个性化对话增强：多轮、启发式
  - 给分鸟加上一个「个性」。
  - 去学习什么是多轮对话，什么是启发式的对话。难点在于，多轮对话经常需要很久以前的历史信息。
  - 另一方面，塑造人格的标签词。同时，研究人员还少量标注了鸟鸟的一些语料，作为个性化的增强和调优。
4. 基于人类反馈的增强（RLHF）
  - 怎么让它更像鸟鸟呢？就是通过人类反馈强化学习（RLHF）。对于同一个问题，让模型给出多个不同回答，工作人员会去做反馈和标注，然后让模型进一步纠偏。多轮迭代后，模型的回答越来越能代表鸟鸟的一些文本特征，甚至是她的特定立场。

视频地址：[华尔街见闻](https://wallstreetcn.com/articles/3685741)，[视频](https://haokan.baidu.com/v?pd=wisenatural&vid=13368059069219629945)
- ![](https://pic2.zhimg.com/80/v2-9b675df5cea77b48ec8107d275147e65_1440w.webp)

天猫精灵把脱口秀演员塞进去了，[视频](https://www.ixigua.com/7218122615469113894)
- <iframe width="720" height="405" frameborder="0" src="https://www.ixigua.com/iframe/7218122615469113894?autoplay=0" referrerpolicy="unsafe-url" allowfullscreen></iframe>


#### 佛学问答

AIGC+佛教，人工智能治愈我心

【2023-4-18】[“神”回复！ChatGPT“化身”佛祖解答尘世烦恼](https://mp.weixin.qq.com/s/EWzO6zQ25dcxm425jSmAHA)
- 随着ChatGPT的爆火，一个名为[HOTOKE AI](https://hotoke.ai/)的网站推出了“AI佛祖”（Hotoke指日语里的佛），搭载GPT-3.5技术，给网友们提供在线咨询业务，上线一周就吸引了20000+小伙伴前去打卡。
- 佛祖版 ChatGPT 一上来就支持中、英和日韩文，还不需要科学上网就能使用。目前有网页版和 line 版（line 即日本版微信），等待 AI 的时间还引导用户做呼吸吐纳和冥想练习。佛祖在线解忧，引发了不少网友跃跃欲试。
- 无需前往寺庙，不花一分香火钱，只需轻轻敲打键盘，AI佛祖就能为你在线指点迷津。

2018年，一款名为“贤二机器僧”的小程序在微信上线。
- 除了对话功能，还支持静坐、诵经、打卡、反馈、智慧卡牌解惑等等。
- 研发人员是一位出家的法师，他希望通过动漫、机器僧等现代科技，让更多的人汲取中华传统文化中的真善美，让包容慈悲的精神来滋养中华民族的后代。

#### 智能客服

真智能客服来了，无需再呼唤“人工”
- 很多人以前都遇到过“鸡同鸭讲”的傻瓜机器客服，ChatGPT将改变这一情况。让智能客服真正理解客户的需求，基于客户诉求创作营销内容，根据数据分析营销效果，真正的智能客服能做的事远不止向客户介绍产品。
- 今年3月，全球领先电商SaaS服务商Shopify已集成了ChatGPT。Shopify主要面向企业及个人客户提供电商网站建立、维护管理等服务。采用ChatGPT，Shopify一方面升级智能客服功能，帮商家与客户沟通更顺畅；另一方面，商家可以通过ChatGPT获取平台商品评论数据分析、标题及关键词优化、营销文案撰写、网站智能化开发编程等多项服务，提升运营效率。
- ![](https://pic1.zhimg.com/80/v2-e060c9c4457739571493e9ab8e25ba94_1440w.webp)
- 智能客服作为ChatGPT最直接能落地的领域，一定会很快入驻各大电商平台，让一批不具备更多技能的客服被替换掉


### AI教育

AI辅助家教，20美元/月定制虚拟老师家庭还是教育的园地，但很多父母难以对孩子进行很好的辅导，如果每个家里有一个定制虚拟老师会不是让情况变得不一样？

国内知名教育机构
- 5月5日, `学而思`传出正自研数学大模型`MathGPT`，将于年内推出基于该自研大模型的产品级应用；
- 同日，`网易有道`官方发布了基于“`子曰`”大模型开发的AI口语老师剧透视频；
- 5月6日，`科大讯飞`发布了认知大模型成果，并演示了“大模型+`AI学习机`”的功能，包括批改作文、模拟口语老师实景对话等。

#### Quizlet

- 国外教育应用平台`Quizlet`率先采用了ChatGPT。试想一下，如果所有孩子都有一个一对一家教将会怎样？
  - 2月28日，Quizlet推出了一款基于ChatGPT的家教软件，名为“`Q-Chat`”。不同于许多企业希望ChatGPT来帮其回答问题，Q-Chat通过有趣的聊天体验，根据相关学习材料提出可选问题，吸引学生。其从Quizlet的大量教育内容库中提取知识，能够测试学生学习情况，提出深入的问题，帮助学生学习语言，鼓励学生养成健康的学习习惯。
  - Q-Chat的聊天教学界面：[演示视频](https://vdn6.vzuu.com/SD/2fb5539a-ee5e-11ed-a975-a66626372a59-v1_f4_t2_FicCvwfw.mp4)

#### 多邻国（Duolingo）

美国教育平台多邻国（Duolingo）上的新Roleplay机器人可以与法语和西班牙语学习者聊天，纠正他们的错误并提出建议以提高他们的词汇量。
- 公司对大语言模型进行了二次开发，使其以教师身份出现，应用发现没有两次对话是相同的，教师会随着学习者的进步变得更高级。
- 这一服务每月收费30美元或每年168美元。

多邻国Roleplay机器人服务界面
- ![](https://pic4.zhimg.com/80/v2-6ebce5c943e691db4c7c00d135130d67_1440w.webp)

#### 可汗：Khanmigo

美国可汗实验学校的Khanmigo基于GPT-4等模型开发了个性化学习工具，比如“辅导我”模式和针对不同科目的测验模块。
- 首席学习官Kristen DiCerbo（克里斯汀·迪塞尔博）说：“该模型（GPT-4）对于K12主题的问题回答最准确，但对于小众主题则不太准确。”享受这一服务需要每月支付至少20美元。
- ![](https://pic2.zhimg.com/80/v2-f01869b18962c8075b2cf918ed48a915_1440w.webp)

### 医疗

#### 医疗诊断

chatgpt在医疗诊断上是否通过图灵测试？
- 论文：[Using ChatGPT to write patient clinic letters.](https://www.aminer.cn/pub/640c5de090e50fcafd616cf0/using-chatgpt-to-write-patient-clinic-letters)
- 论文：[Putting ChatGPT's Medical Advice to the (Turing) Test](https://www.aminer.cn/pub/63d340e890e50fcafd9107d1/putting-chatgpt-s-medical-advice-to-the-turing-test)
- ChatGPT responses to patient questions were **weakly distinguishable** from provider responses. Laypeople(外行) appear to trust the use of chatbots to answer lower risk health questions.

#### ChatDoctor


【2023-3-25】医疗问答机器人，医学领域的chatgpt。如果把默沙东医学指南拿进去继续训练，是不是就是一个私人医生了？
- 论文：[ChatDoctor: A Medical Chat Model Fine-tuned on LLaMA Model using Medical Domain Knowledge](https://arxiv.org/abs/2303.14070)
- [GitHub地址](https://github.com/Kent0n-Li/ChatDoctor)
- [Demo Page](https://huggingface.co/spaces/ChatDoctor/ChatDoctor)

Resources List
- 200k real conversations between patients and doctors from HealthCareMagic.com HealthCareMagic-200k.
- 26k real conversations between patients and doctors from icliniq.com icliniq-26k.
- 5k generated conversations between patients and physicians from ChatGPT GenMedGPT-5k and disease database.
- Checkpoints of ChatDoctor, fill this form.
- Online hugging face demo application form.
- Stanford Alpaca data for basic conversational capabilities. Alpaca link.

#### 心理测评

用chatgpt做MBTI心理测评
- 论文：[Can ChatGPT Assess Human Personalities? A General Evaluation Framework](https://www.aminer.cn/pub/640166a590e50fcafd68b4ab/can-chatgpt-assess-human-personalities-a-general-evaluation-framework)
- 提出了三个评估指标，以衡量最先进的LLMs（包括ChatGPT和InstructGPT）评估结果的`一致性`、`稳健性`和`公平性`。实验结果表明，ChatGPT具有评估人类个性的能力，平均结果表明，ChatGPT可以实现更为一致和公平的评估，尽管对提示偏差的鲁棒性较低，相比之下，InstructGPT的鲁棒性更高。

### 新闻资讯

【2023-1-31】[“美版今日头条”宣布用ChatGPT写稿，股价暴涨119%](https://mp.weixin.qq.com/s/jMxVBWjbIJzzOSaTlakx5A)
- “美版今日头条”BuzzFeed宣布和OpenAI合作，未来将使用ChatGPT帮助创作内容。AI创作的内容将从研发阶段转变为核心业务的一部分。
  - ChatGPT会根据测试主题，生成一系列提问，再根据用户的回答，制作他们的专属报告。
- BuzzFeed是一家网络媒体公司，当年正是靠高度人工创作的内容逐渐打出名声，最终才成功上市。
  - 引起病毒式传播的蓝黑or白金裙子
  - 网络上流传甚广的“灾难中的女孩”meme

### 房产行业

【2023-1-29】[美房产中介们爱上ChatGPT：原先花1小时写房源文案，现在仅5秒](https://www.163.com/tech/article/HS83N8D000097U7T.html), 房地产中介在网上推介房子时，常常需要绞尽脑汁来介绍房源情况并突出诸如“理想的娱乐设施”和“有充分放松空间”等房屋卖点。
- 如今OpenAI发布的人工智能聊天机器人ChatGPT可以帮助他们做到这一点，房地产中介JJ·约翰内斯(JJ Johannes)就尝到了甜头。他只需要输入几个关键词，ChatGPT不到5秒钟就创建了关于房源情况的描述。约翰内斯说，否则他自己要花一个多小时才能完成。在发表房源情况前,还会对ChatGPT生成的描述进行微调和润色。他说，“这并不完美，但是一个很好的起点。我的背景是经验和技术，写一些有说服力的东西需要时间。ChatGPT让一切变得简单多了。”
- 很多房地产中介表示，ChatGPT已经改变了他们撰写房源情况、在社交媒体上发帖打广告以及起草房屋买卖法律文件等的工作方式。ChatGPT还可以用于自动完成重复性任务，比如回答客户提出的常见问题或进行复杂计算。
- 利用ChatGPT起草具有法律约束力的附录和其他文件，并将其送交律师审批。“我用ChatGPT对各种草稿进行微调，”他说，“有时我会让ChatGPT把内容做得更短或更有趣，它会给你很多样本供挑选和编辑。”

#### RoomGPT 装修设计 

RoomGPT，一个免费开源的项目，使用AI自动生成房间设计图，只需要上传你房间的图片，而且有各种主题和房间类型可选择，稍等几秒钟，AI即可帮你生成高大尚的装修设计后概念图，一秒打造你梦想中的房间，项目使用 ControlNet 的 ML 模型来生成房间的变体 ML ，模型托管在 Replicate 上。

【2023-3-27】[RoomGPT](https://www.roomgpt.io/dream) 根据要求生成指定风格的装修，免费3次生成
- 作者[twitter](https://twitter.com/nutlope/status/1635674124738523139?cxt=HHwWhsCz1ei8irMtAAAA)
- 选择装修风格、房屋、实拍图，就可以生成设计图。
- 主题：Modern（现代）, Minimalist（简约）, Professional（专业）, Tropical（热带）, Vintage（复古）, Industrial（工业）, Neoclassic（新古典主义）
- 房屋类型：living room（客厅）, dining room（餐厅）, Office（办公室）, Bedroom（卧室）, Bathroom（浴室）, Basement（地下室）, Kitchen（厨房）, Gaming Room（游戏室）

项目使用 ControlNet 来生成房间设计。ControlNet 是一个可以**控制**图像生成 AI 的输出的神经网络结构。

ControlNet 的优点是：
- 指定生成图像的**姿势、深度、轮廓**等条件。
- 保持输入图像**结构**，同时转换成不同的**风格**。
- 与其他图像生成 AI 技术结合使用，比如 Stable Diffusion2。

项目用到的 ControlNet 服务部署在 [Replicate](https://replicate.com) 上，Replicate 是一个网站和服务，可以让用户轻松地部署和使用开源的机器学习模型。
- ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29c25306c1f745b9888f45179fdea286~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

作者：[江昪](https://juejin.cn/post/7208036915015090234)


#### 户型图3D重建

[CVPR 2021：住宅户型识别与重建](https://juejin.cn/post/6994743687427129352)。2021年，阿里巴巴发表论文，基于2D户型图成为3D模型
- 论文：[Residential floor plan recognition and reconstruction](https://openaccess.thecvf.com/content/CVPR2021/papers/Lv_Residential_Floor_Plan_Recognition_and_Reconstruction_CVPR_2021_paper.pdf)
- ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eae67c75effc4b1b930e311eb1b94687~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)
- 原始户型图，图像识别结果，矢量化重建结果与最终的3D重建结果
- ![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/de8b1aaaf8734e89801707bc2dc2e20a~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

#### 实拍图美化

【2023-4-18】[autoenhance](https://www.autoenhance.ai/#demo-video), Instant real estate photo editing, 房产领域图片美化：更换天气（阴天→蓝天）、对比度（模糊→清晰）、马赛克（模糊人脸/车牌）、角度调整（视角）、光线（暗→明）

### 智能家居

高级Web开发人员Mate Marschalko用短短不到1小时的时间，通过与ChatGPT背后的GPT-3大模型交互，结合Siri Shortcuts做出了一个更智能的语音助手。这个语音助手不仅能控制整个苹果HomeKit智能家居系统，而且能够以超低的延迟响应轻松回答生各种问题。

他给予了ChatGPT极高评价，称尝试过这个产品后，包括苹果Siri、亚马逊Alexa、谷歌Home在内的所有“智能”助手，都显得如此愚蠢而没用。
- Mate Marschalko演示新智能助手操纵苹果HomeKit智能家居系统
- ![img](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TV46RMG9kDz4Bu~noop.image?_iz=58558&from=article.pc_detail&x-expires=1676360394&x-signature=tCxwmviN1wJeomk42ZXzv2DHEVI%3D)


### 文本创作


#### 文案创作

【2023-4-8】创业产品：[AI百晓生](https://www.chengzijianzhan.com/tetris/page/7216273608124137509)，给视频生成文案，语音播报

#### 写小说

【2023-2-14】[Generating Longer Stories With Recursive Reprompting and Revision](https://arxiv.org/pdf/2210.06774.pdf), Meta 田渊栋写小说
- We consider the problem of automatically generating longer stories of over two thousand words. Compared to prior work on shorter stories, **long-range plot coherence and relevance** are more central challenges here. We propose the `Recursive Reprompting and Revision` framework ($Re^3$) to address these challenges

### 数字人

详见 [数字人专题](aigc#数字人)

### 金融 

#### BloombergGPT

【2023-3-31】[金融圈注意了！BloombergGPT来了](https://mp.weixin.qq.com/s/8MeKHqqUPiA58UDVyJgzTg)

ChatGPT引爆的AI热潮也“烧到了”金融圈，彭博社重磅发布为金融界打造的大型语言模型（LLM）——`BloombergGPT`。

3月30日，根据彭博社最新发布的报告显示，其构建迄今为止最大的特定领域数据集，并训练了专门用于金融领域的LLM，开发了拥有500亿参数的语言模型——`BloombergGPT`。
- 该模型依托彭博社的大量金融数据源，构建了一个3630亿个标签的数据集，支持金融行业内的各类任务。该模型在**金融**任务上的表现**远超**过现有模型，且在通用场景上的表现与现有模型也能一较高下。

BloombergGPT的训练数据库名为FINPILE，由一系列英文金融信息组成，包括新闻、文件、新闻稿、网络爬取的金融文件以及提取到的社交媒体消息。

为了提高数据质量，FINPILE数据集也使用了公共数据集，例如The Pile、C4和Wikipedia。FINPILE的训练数据集中大约一半是特定领域的文本，一半是通用文本。为了提高数据质量，每个数据集都进行了去重处理。

在金融领域中的自然语言处理在通用模型中也很常见，但是，针对金融领域，这些任务执行时将面临挑战：
- 以情感分析为例，一个题为“某公司将裁员1万人”，在一般意义上表达了负面情感，但在金融情感方面，它有时可能被认为是积极的，因为它可能导致公司的股价或投资者信心增加。

从测试来看，BloombergGPT在五项任务中的四项（ConvFinQA，FiQA SA，FPB和Headline）表现最佳，在NER（Named Entity Recognition）中排名第二。因此，BloombergGPT有其优势性。
- 测试一：ConvFinQA数据集是一个针对金融领域的问答数据集，包括从新闻文章中提取出的问题和答案，旨在测试模型对金融领域相关问题的理解和推理能力。
- 测试二：FiQA SA，第二个情感分析任务，测试英语金融新闻和社交媒体标题中的情感走向。
- 测试三：标题，数据集包括关于黄金商品领域的英文新闻标题，标注了不同的子集。任务是判断新闻标题是否包含特定信息，例如价格上涨或价格下跌等。
- 测试四：FPB，金融短语库数据集包括来自金融新闻的句子情绪分类任务。
- 测试五：NER，命名实体识别任务，针对从提交给SEC的金融协议中收集金融数据，进行信用风险评估。

对于ConvFinQA来说，这个差距尤为显著，因为它需要使用对话式输入来对表格进行推理并生成答案，具有一定挑战性。

### 插件

Action 实现上，除了 OpenAI  的 Plugin，Adept 和 Inflection 这两家早期团队想以自然语言为基础，为用户打造新的 LUI （语言为基础的 UI）方式。

#### Plugin

3月24日，OpenAI宣布解除了ChatGPT无法联网的限制，以第三方插件为中介，使ChatGPT能访问其他网站并获取实时信息，还支持执行计算。

此前，ChatGPT只能从训练数据当中提取信息，导致其输出结果大大受限。OpenAI官方称，此次推出的插件不仅允许ChatGPT浏览网页，还能让它与开发人员定义的API进行交互，使其能执行诸如搜索实时新闻、检索知识库等更具体的操作。

ChatGPT的第一批插件由Expedia、FiscalNote、Instacart、KAYAK、Klarna、Milo、OpenTable、Shopify、Slack、Speak、Wolfram和Zapier等公司提供，这些插件的具体功能包括推荐餐厅、制定出游计划、网上商店购物、企业办公、信息检索、语言教学等，涵盖日常生活的衣食住行各个方面。“插件商店（ChatGPT Plugins Store）”的推出意味着其他服务成为了ChatGPT的“眼睛和耳朵”。

ChatGPT的“插件商城”
- ChatGPT集成第三方插件，成为聊天版“App Store”

#### LangChain

[LangChain：Model as a Service粘合剂，被ChatGPT插件干掉了吗？](https://mp.weixin.qq.com/s/3coFhAdzr40tozn8f9Dc-w)

LangChain 由前 Robust Intelligence 的机器学习工程师 Chase Harrison 在 22 年 10 月底推出，是一个封装了大量 LLM 应用开发逻辑和工具集成的开源 Python 库，有成为第一个被广泛认可的 LLM 应用开发框架的势头。
- 随着 Harrison 为 LangChain 添加了很多实用的抽象，以及 23 年 1 月众多 AI Hackathon 决赛项目使用 LangChain，它的 Github Star 迅速破万，成为 LLM 应用开发者选择中间件时想到的第一个名字。
- 产品：拼接好 LLM 的大脑和四肢
- LangChain 身上有许多标签：开源的 Python 和 Typescript 库、第一个被广泛采用的 LLM 开发框架、Model as a Service 设想的中间件、AI 应用层的基础设施...... 

从开发者视角看，LangChain 是个挺友好且优美的库：
- • 它非常模块化，还通过 Chain、Agent、Memory 对 LLM 的抽象帮助开发者提高了构建较复杂逻辑应用的效率；而且每个模块有很好的可组合性，有点像“为 LLM 提供了本 SOP”，能实现 LLM 与其他工具的组合、Chain 与 Chain 的嵌套等逻辑；
- • 它一站式集成了所有工具，从各种非结构化数据的预处理、不同的 LLM、中间的向量和图数据库和最后的模型部署，贡献者都帮 LangChain 跟各种工具完成了迅速、全面的集成。
  - 作为成长期投资者看 LangChain，它本身还太早期，远没到成长逻辑。除此之外，我对它在商业层面未来发展的核心担忧在于：
- • 我们不能直接套用旧时代的中间件视角，随着 ChatGPT Plug-In 出现和 OpenAI 的更多边界延伸，LangChain 的价值可能被取代，很快像机器学习历史上的其他明星库一样隐入尘埃；
- • LangChain 本身的壁垒也比较薄，是“其他开源库身上的开源库”，没有太多技术壁垒，只是替大家省下来了码的时间。如果要收费使用，很多开发者可能会选择自己把 LangChain 这套东西码出来；
- • 目前使用 LangChain 库的以个人开发者和极客的 side project 为主，还不是正经的企业级 LLM 集成工具，而稍微有点体量的公司都会选择 fork LangChain 的源码或者干脆自己再码套框架。


#### TaskMatrix

【2023-3-31】[一个AI驱动百万个API！微软提出多任务处理模型TaskMatrix，机器人和物联网终于有救了](https://mp.weixin.qq.com/s/_mDyCiqSqlWi4zdtrfxOKw)
- 论文地址：[paper](https://arxiv.org/abs/2303.16434)

基于ChatGPT大模型的强大理解能力，将输入的任何信号拆解成一个个可完成的任务，交给其他的AI和程序完成。
- 就像是建了一座司令塔，每个大模型都能成为其中的“大脑”指挥官，其他专门解决某类任务的模型，则听它调令

人类只需要提需求，AI从自动做PPT、Word和Excel三件套（Office自动化），到驱动**机器人**完成各种智能任务，都能搞定。

这个最新的研究名叫TaskMatrix，据微软表示，它能直接驱动数百万个用于完成任务的AI和API。

一起来看看TaskMatrix是怎样工作的。

从架构图来看，TaskMatrix可以被分为四部分：
- 多模态对话基础模型（MCFM）：与用户对话并了解需求，从而生成API可执行代码以完成特定任务
- API平台：提供统一API格式，存储数百万个不同功能的API，允许扩展和删除API
- API选择器：负责根据MCFM生成的内容推荐API
- API执行器：调用API并执行生成代码，给出结果

简单来说，MCFM负责生成解决方案，API选择器从API平台中选取API，随后API执行器基于MCFM生成的代码调用API，并解决任务。

为了统一API管理，API平台又给API统一了文档格式，包含以下五个部分：
- API名称（提供API摘要，避免与其他API混淆）
- 参数列表（包含输入参数和返回值等）
- API描述（功能描述）
- 组合指令（如何组合多个API完成复杂用户指令）

搭建TaskMatrix的原因，从学术角度来说主要有两点。
- 其一，扩大AI适用范围，如通过扩展API来提升可完成任务的类型和数量；
- 其二，便于进一步提升AI可解释性，通过观察AI分配任务的方式就能理解它的“思路”。

#### HuggingGPT

【2023-4-3】[HuggingGPT：一个ChatGPT控制所有AI模型，自动帮人完成AI任务](https://www.toutiao.com/article/7217680526839202307),浙大与微软亚研院的合作成果. 
- [paper](https://arxiv.org/abs/2303.17580)
- 项目已开源，名叫「贾维斯」,钢铁侠里的AI管家贾维斯（[JARVIS](https://github.com/microsoft/JARVIS)）。
- 和3月份刚发布的Visual ChatGPT的思想非常像：后者HuggingGPT，主要是可调用的模型范围扩展到了更多，包括数量和类型。

语言是通用的接口。于是，HuggingGPT就诞生了。工程流程分为四步：
- 首先，任务规划。ChatGPT将用户的需求解析为任务列表，并确定任务之间的执行顺序和资源依赖关系。
- 其次，模型选择。ChatGPT根据HuggingFace上托管的各专家模型的描述，为任务分配合适的模型。
- 接着，任务执行。混合端点（包括本地推理和HuggingFace推理）上被选定的专家模型根据任务顺序和依赖关系执行分配的任务，并将执行信息和结果给到ChatGPT。
- 最后，输出结果。由ChatGPT总结各模型的执行过程日志和推理结果，给出最终的输出。

请求：
> 请生成一个女孩正在看书的图片，她的姿势与example.jpg中的男孩相同。然后请用你的声音描述新图片。

可以看到HuggingGPT是如何将它拆解为6个子任务，并分别选定模型执行得到最终结果的。
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/cef09fd55855447c80ebe387c3376566~noop.image?_iz=58558&from=article.pc_detail&x-expires=1681185700&x-signature=gCXw63eEBk%2FqSX6NUbCm2SAJLQo%3D)

用gpt-3.5-turbo和text-davinci-003这俩可以通过OpenAI API公开访问的变体，进行了实测。如下图所示：
- 在任务之间存在资源依赖关系的情况下，HuggingGPT可以根据用户的抽象请求正确解析出具体任务，完成图片转换。

在音频和视频任务中，它也展现了组织模型之间合作的能力，通过分别并行和串行执行两个模型的方式，完了一段“宇航员在太空行走”的视频和配音作品。
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/e6db6415cbd348d19d0ddaa6cd25ec3a~noop.image?_iz=58558&from=article.pc_detail&x-expires=1681185700&x-signature=5kpy%2Bz12gyq1MjUpDM2ewDVw4pU%3D)

还可以集成多个用户的输入资源执行简单的推理，比如在以下三张图片中，数出其中有多少匹斑马。
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/809148f403f3486eae6f7e1f9c172116~noop.image?_iz=58558&from=article.pc_detail&x-expires=1681185700&x-signature=x8aBJK6pJiGy309RKsS%2Bm52Kw2w%3D)


#### AutoGPT

【2023-4-12】[AutoGPT 太火了，无需人类插手自主完成任务](https://mp.weixin.qq.com/s/bV1tPc7hNn2z06YOpzyanw)

AutoGPT 的研究开始走进大众视野。
- 一个实验性的开源应用程序，展示了 GPT-4 语言模型的功能。该程序由 GPT-4 驱动，可以自主实现用户设定的任何目标。
- AutoGPT 相当于给基于 GPT 的模型一个内存和一个身体。有了它，你可以把一项任务交给 AI 智能体，让它自主地提出一个计划，然后执行计划。此外其还具有互联网访问、长期和短期内存管理、用于文本生成的 GPT-4 实例以及使用 GPT-3.5 进行文件存储和生成摘要等功能。AutoGPT 用处很多，可用来分析市场并提出交易策略、提供客户服务、进行营销等其他需要持续更新的任务。
- [GitHub 地址](https://github.com/torantulino/auto-gpt)

特斯拉前 AI 总监、刚刚回归 OpenAI 的 Andrej Karpathy 也为其大力宣传，并在推特赞扬：「AutoGPT 是 prompt 工程的下一个前沿。」

实践
- [AUTOGPT INSTALLATION AND FEATURES](https://autogpt.net/autogpt-installation-and-features/)

```sh
# 准备Python 3.8以上的环境, 安装minicoda
# source  ~/.bash_profile
conda create -n py310 python=3.10 # 创建 3.10环境
conda activate py310 # 激活环境
# 下载autogpt代码
git clone https://github.com/Torantulino/Auto-GPT.git
cd 'Auto-GPT'
pip install -r requirements.txt
# 配置文件
mv .env.template .env
vim .env # 填入 openai key 到变量 OPENAI_API_KEY
# python scripts/main.py
# python scripts/main.py --debug # 调试模式
# python scripts/main.py --speak # use TTS for Auto-GPT
python3 scripts/main.py # 多个虚拟环境时，为了避免干扰
```


#### AgentGPT -- 改进

AgentGPT：浏览器中直接部署自主 AI 智能体
- [项目主页](https://agentgpt.reworkd.ai)
- [GitHub 地址](https://github.com/reworkd/AgentGPT)

近日，又有开发者对 AutoGPT 展开了新的探索尝试，创建了一个可以在浏览器中组装、配置和部署自主 AI 智能体的项目 ——AgentGPT。项目主要贡献者之一为亚马逊软件工程师 Asim Shrestha

AgentGPT 允许你为自定义 AI 命名，让它执行任何想要达成的目标。自定义 AI 会思考要完成的任务、执行任务并从结果中学习，试图达成目标。如下为 demo 示例：HustleGPT，设置目标为创立一个只有 100 美元资金的初创公司。

用户在使用该工具时，同样需要输入自己的 OpenAI API 密钥。AgentGPT 目前处于 beta 阶段，并正致力于长期记忆、网页浏览、网站与用户之间的交互。

【2023-4-15】[免费的AutoGPT替代网站](https://zhuanlan.zhihu.com/p/622083666)

- 第一个是最火的AutoGPT，性能最强的，但是安装起来也挺麻烦的，并且还需要各种API的权限，小白不建议。
- 第二个AgentGPT，需要OpenAI的API，操作简单，在网页输入key就可以用。
- 第三个和第四个暂时是免费的，想体验的可以赶紧了。

| 名称 | 方案 | 特点 | 链接 |
| --- | --- | --- | --- |
| [AutoGPT](https://github.com/Torantulino/Auto-GPT) | 最复杂 | 需要安装开源代码 |  |
| [AgentGPT](https://agentgpt.reworkd.ai/) | 需要Token | 通过简单的网页访问易于使用，具有相对简单的功能 | |
| [Cognosys](http://cognosys.ai/) | 不需要Token | 性能不错，具有明确的任务组织 | |
| [Godmode](https://godmode.space/) | 不需要Token | 操作更加直观，每个步骤需要用户权限 | |

#### Adept

Adept 和 Inflection 这两家早期团队想以自然语言为基础，为用户打造新的 **LUI** （语言为基础的 UI）方式。

#### Inflection

待定

#### GPT4Free

【2023-5-4】[GPT4Free](https://github.com/xtekky/gpt4free) ([discord](https://discord.com/invite/gpt4free)地址) 通过You.com、Quora和CoCalc等网站（OpenAI付费用户）提供的各种API地址，免费使用GPT-4和GPT-3.5模型。
- GPT4Free 脚本会先访问 https://you.com/api/streamingSearch，并传送各种参数过去，然后获取返回的JSON并对其进行格式化。
- GPT4Free仓库还有从Quora、Forefront和TheB等其他网站获取数据的脚本，任何开发者都可以基于这些脚本制作自己的聊天机器人。

实测：
- 安装
  - 要求 Python 3.8以上
  - 修改 requirements.txt 文件
- [The requirements.txt need to be updated](https://github.com/xtekky/gpt4free/issues/419)

```yml
# pypasser # 原始
pypasser>=0.0.5 # 指定版本，否则 pip install -r requirements.txt 提示冲突
```

UI部署正常，但点击“Think”后，出现新的[错误](https://github.com/xtekky/gpt4free/issues/406)：
- Please make sure you are using a valid cloudflare clearance token and user agent.

> An error occurred: failed to do request: Get "https://you.com/api/streamingSearch?q=hello&page=1&count=10&safeSearch=Moderate&onShoppingPage=False&mkt=&responseFilter=WebPages%2CTranslations%2CTimeZone%2CComputation%2CRelatedSearches&domain=youchat&queryTraceId=414f00ec-1837-406c-936a-c5ceeb0cd087&chat=%5B%5D": x509: â*.facebook.comâ certificate name does not match input. Please make sure you are using a valid cloudflare clearance token and user agent.


安装

```sh
pip install gpt4free
```

程序调用

```py
import gpt4free
from gpt4free import Provider, quora, forefront

# usage You
response = gpt4free.Completion.create(Provider.You, prompt='Write a poem on Lionel Messi')
print(response)
# usage Poe
token = quora.Account.create(logging=False)
response = gpt4free.Completion.create(Provider.Poe, prompt='Write a poem on Lionel Messi', token=token, model='ChatGPT')
print(response)
# usage forefront
token = forefront.Account.create(logging=False)
response = gpt4free.Completion.create(
    Provider.ForeFront, prompt='Write a poem on Lionel Messi', model='gpt-4', token=token
)
print(response)
print(f'END')
# usage theb
response = gpt4free.Completion.create(Provider.Theb, prompt='Write a poem on Lionel Messi')
print(response)
# usage cocalc
response = gpt4free.Completion.create(Provider.CoCalc, prompt='Write a poem on Lionel Messi', cookie_input='')
print(response)
```

错误信息
> tls_client.exceptions.TLSClientExeption: failed to do request: Get "https://you.com/api/streamingSearch?q=Write+a+poem+on+Lionel+Messi&page=1&count=10&safeSearch=Moderate&onShoppingPage=False&mkt=&responseFilter=WebPages%2CTranslations%2CTimeZone%2CComputation%2CRelatedSearches&domain=youchat&queryTraceId=77ebaf4c-ba0c-4035-bad6-1dafc27fdc14&chat=%5B%5D": dial tcp 192.133.77.59:443: i/o timeout (Client.Timeout exceeded while awaiting headers)

### 机器人

ChatGPT接入实体机器人，线上线下整合营销ChatGPT大多数时候主要作用于线上，但在线下消费场景也显示出潜力。

【2023-5-6】B站 稚晖君 做aigc+机器人的创业

3月8日，谷歌和柏林工业大学的团队重磅推出了史上最大的视觉语言模型——PaLM-E，同时谷歌表示，计划探索PaLM-E在现实世界场景中的更多应用，例如家庭自动化或工业机器人，希望PaLM-E能够激发更多关于多模态推理和具身AI的研究。

国内多家互联网巨头也在AI+机器人领域动作频频。
- 4月25日，据腾讯Robotics X实验室公布最新机器人研究进展，首次展示在灵巧操作领域的成果，推出自研机器人灵巧手“TRX-Hand”和机械臂“TRX-Arm”。
- 4月24日，据企查查APP显示，近日北京小米机器人技术有限公司成立，注册资本5000万元人民币。经营范围包含：智能机器人的研发；人工智能行业应用系统集成服务；人工智能基础资源与技术平台；微特电机及组件制造等。资料显示，小米在国内机器人布局版图不断扩大，从CyberDog（仿生机器狗），再到Cyberone（仿生机器人），持续加注在机器人领域的研发和创新。

国内AI服务器机器人领军企业`猎户星空`计划在近期推出接入大模型的服务机器人产品。猎户星空董事长`傅盛`在3月15日第一时间分享了GPT-4体验视频，他说：“GPT-4发布世界要变了！每个人都要关心。”

这个“变”指的是什么？
- 一是**交互**革命。
  - 2007年乔布斯发布iPhone时就是一个**交互**革命，触摸键盘由此替代了物理键盘，软件定义了不同键位的形态和用法；
  - 现在随着GPT-4的到来，触摸键盘将可能进一步被语音交互替代；
- 二是社会**生产力**变革，生产效率会大大提升。

其中前者对机器人领域影响更大，而后者对内容产业影响力较大。不过，实体机器人是从软硬件开发到工程化落地、运营链条更长的载体，如何让产品真正解决场景刚需，是这个赛道玩家面临的重要问题。实体服务机器人企业能否找到刚需场景，一整套机器人技术链能否支撑其实现产品化十分关键。

#### OpenAI投资 NEO

【2023-3-23】[GPT机器人要来了？OpenAI领投挪威人形机器人公司1X](https://finance.sina.com.cn/stock/usstock/c/2023-03-27/doc-imynishv4555021.shtml)

挪威人形机器人公司1X Technologies（前称为Halodi Robotics）宣布在OpenAI领投的A2轮融资中筹集了2350万美元。
- 消息一出，便引发了外界对于GPT模型和机器人结合的无限遐想。其中一个景象便是，人形机器人管家从电影走入现实生活，它不仅能够帮助人类做家务，还可以理解人类的语言，识别人类的情绪，并做出真正智能化的回应。

1X计划用这笔资金来加大力度研发双足机器人模型NEO，以及在挪威和北美量产其首款商用机器人EVE。
- ![](https://n.sinaimg.cn/finance/crawl/59/w550h309/20230327/c263-22383f0bac24529609428a1f23eb2366.jpg)


#### 阿里大模型驱动机器人

【2023-4-27】[阿里云工程师也正在实验将千问大模型接入工业机器人](https://mp.weixin.qq.com/s/VnAstyv5C4jr1dVSUBcbFw)，以便实现远程指挥机器人工作。在近日举行的第六届数字中国建设峰会上，阿里云发布的一个演示视频中展示了千问大模型的实际应用场景。

“我渴了，找点东西喝吧。”工程师通过钉钉对话框向机器人发出指令后，千问大模型回答，“好的，我找找有什么喝的。”随后，千问大模型在后台自动编写了一组代码发给机器人，机器人开始识别周边环境，从附近的桌上找到一瓶水，并自动完成移动、抓取、配送等一系列动作，递送给工程师。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-fb9e560141dabb300cee341e744f223a.png)
- 动图见原文

#### 表情控制

【2023-3-31】[当人形机器人通过GPT3控制表情](https://www.bilibili.com/video/BV19v4y1H732)

<iframe src="//player.bilibili.com/player.html?aid=569400856&bvid=BV19v4y1H732&cid=1078697290&page=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="500" height="603"> </iframe>

英国 [Engineered Arts](www.engineeredarts.co.uk) 公司设计的 Ameca人形机器人，Ameca是用于人工智能和人机交互的仿人机器人平台。
- CES 2022美国拉斯维加斯国际消费类电子产品展览会上首次亮相，Ameca是用于人工智能和人机交互的仿人机器人平台，当然视频里只是预先编程的动作，但最终目标是将其与实际的AI集成。

机器人Ameca是由GPT-3来选择的合适的面部表情，也尝试了GPT-4，4的处理时间更长，使Ameca看起来反应没那么快。

此前官方发布的视频：BV1Xr4y1Q7kM

#### Tiamo小鱼

2月底，国内服务机器人企业`穿山甲`机器人推出了首款接入ChatGPT的迎宾机器人“`Tiamo小鱼`”，据称支持超100种场景应用方案、百万级知识库和超140种语言选择，同时穿山甲机器人还将其他系列机器人也支持接入ChatGPT。
- 当机器人被问及“你跟其他的服务机器人有什么区别”时，该机器人回复自己“采用的是深度学习和自然语言处理技术”。
- ![](https://pic3.zhimg.com/80/v2-ba37f23f6fa6f74084faee761997c3c6_1440w.webp)

### 可穿戴


#### AR眼镜

【2023-3-27】[把GPT-4搞进AR眼镜，一秒生成回答内容，面试简直开挂好嘛](https://zhuanlan.zhihu.com/p/617347972)
- 斯坦福团队主要成员包括：Bryan Hau-Ping Chiang、Alix Cui和Varun Shenoy

GPT-4版AR眼镜 rizzGPT
- 基于OpenAI的自动语音识别工具Whisper收听对话，GPT-4聊天机器人实时生成自然响应，最终通过一款开源AR眼镜让用户在现实环境中了解对方的信息。
- 主体是一个圆镜片透明体，轻松挂在任何一款眼镜上面。
- ![](https://pic2.zhimg.com/80/v2-3dc5a6939497e90bc84101c843034931_1440w.webp)
- ![](https://pic3.zhimg.com/80/v2-cbdb0e3b76d355f0d93d2c35f6f2094e_1440w.webp)

### 脑机接口

【2023-3-27】一位名为[Fireship](https://fireship.io/)的独立开发者发了一段令人震撼的视频：他用 JavaScript 将他的大脑连接到 GPT-4。简单来说，他通过非侵入式脑机接口公司 [Neurosity](https://neurosity.co/) 提供的 JavaScript SDK和一个仪表板，通过脑机通信连接上了GPT-4。
- YouTube: [I literally connected my brain to GPT-4 with JavaScript](https://www.youtube.com/watch?v=-HYbFm67Gs8)
- ![](https://images.ctfassets.net/uwziq2n2fyp8/2mJ9nuyNXhpdcOZJ7eFCbF/f69db9a9bc5b77ff408d46d0200af14b/3a.png?h=750&fl=progressive&q=100)

只要头戴Neurosity意念一动，大脑就可以连接到 GPT-4，从而使 GPT-4 的整个知识库触手可及。如果你使用过 GPT-4，想象一下有个人拥有一个用脑机接口连接到 GPT-4 的大脑。
- [脑机接口让大脑连上了GPT-4](https://mp.weixin.qq.com/s/F8ut4A0SX0wW2_JgQHe1_A)

<iframe src="//player.bilibili.com/player.html?aid=569589694&bvid=BV1wv4y1W7FN&cid=1083945648&page=1&autoplay=0" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width="500" height="603"> </iframe>

大脑如何连接GPT-4的过程。
- 通过不断地提示与训练，可以将自己转变为赛博格（半机械人），真正实现生物硅基的融合，应用在日常场景中，再借助设备，脑信号转文字，文字转语音，实现语音对话能力。
- 正在考试时，不晓得答案只要想一想，GPT-4就在你大脑里敲字，然后通过脑机接口告诉你；
- 上班迟到了，想要编一个借口，ChatGPT马上给你一个合理的理由...

不过用在这些地方，就有些大材小用了. 还可以通过脑电波“监听”自己过去的思维模式，以此进行矫正或者训练。

3月末，Neurosity 发布了一款名为 The Crown 的头戴式脑机接口。埃隆·马斯克前女友发推说想要的BCI设备， 这顶被誉为皇冠的BCI，戴上去像来自未来的人类。这款轻便的**非侵入式**脑机接口设备，可以监测人的脑电波，以辅助睡眠、学习、专注力等。

还可以意念操控物体，比如上个月初，一名研究人员用它操控一辆特斯拉汽车，虽然短短十几秒，却让人看到了未来人机融合和交互的想象力

Neurosity对这种对脑电波的理解，以及 Crown 的可编程性，开辟了 **脑机接口+AI** 世界的新领域 —— 生物硅基大脑驱动世界。

大脑是一个电化学器官。一个功能完备的大脑可以产生多达 10 瓦的电力。如果所有 100 亿个相互连接的神经元同时放电，那么放置在人类头皮上的单个电极将记录大约百万分之五到百万分之五十伏特的电压。如果你有足够的头皮连接起来，你也许可以点亮手电筒灯泡。

Neurosity 宣称 Crown 的计算模块与 MacBook Air 一样强大，配备四核 1.8Gz CPU，每秒可以从大脑中获取数千个数据点，而不会在传输过程中丢失数据。此外，新的传感器配置提供了对视觉皮层的访问，完成了对大脑所有四个叶(额叶、颞叶、顶叶、枕叶）的覆盖。

而现在它可以让你的大脑连接到GPT-4，将人脑与机器、AI进行融合。人们可以通过训练算法来识别各种思维模式，以便选取最优的方案或者预测行为。

这就像科幻电影里的半机械人，他们变得比人类还要强。不妨大胆畅想下，人们接入他人的记忆或者回忆梦境——这种《赛博朋克2077》的游戏里的剧情，似乎也可能实现。

### 自动驾驶

GPT大模型“上车”，带来汽车交互新方式汽车越来越成为很多家庭必不可少的工具，这也成为大模型渗透进家庭场景的最佳载体之一

近期的车展，GPT大模型“上车”成为热门话题，包括阿里`通义千问`、百度`文心一言`、商汤“`日日新SenseNova`”等在内的大语言模型落地了数十款热门车型。
- ![](https://pic1.zhimg.com/80/v2-8ce2824c72faffb5ddc1b57d39902f30_1440w.webp)

#### DriveGPT

【2023-4-11】[DriveGPT自动驾驶大模型中国玩家首发！1200亿参数，毫末智行出品](https://mp.weixin.qq.com/s/qcm97NZ6l7cuFbyo4TeA9w), DriveGPT，首个应用GPT模型和技术逻辑的自动驾驶算法模型，正式官宣，中文名雪湖·海若。
- 国内第一个将Transformer大模型引入自动驾驶、第一个自建超算、辅助驾驶量产落地进展第一…
- 2022年， 毫末发布中国首个自动驾驶数据智能体系MANA，经过一年多时间的应用迭代，现在到了全面升级，开放赋能行业的阶段。

自动驾驶上，DriveGPT同样应用这样的思路，只不过训练的数据从语言文本，变成了图片、视频等等自动驾驶数据。

毫末智行的雪湖·海若，实现过程分为3步：
- 首先, 在预训练阶段引入量产智能驾驶数据训练出一个初始模型，相当于一个具备基本驾驶技能的**AI司机**。
  - 毫末已经量产积累的4000万公里实际道路数据，使得模型一开始就具有明显的量产实用价值，这是雪湖·海若得天独厚的条件。
  - 毫末与火山引擎一同在算力端做了大量优化, 算力资源的弹性调度、底层算子性能、训练稳定性等等
- 然后, 再引入量产数据中高价值的**用户接管**片段（Clips形式），训练反馈模型。而不同Corner Case的依次迭代，相当于针对不同驾驶任务挑战分别强化AI司机的技能。
- 接下来, 通过强化学习的方法，使用反馈模型不断优化迭代初始模型。

所谓“生成”，反馈模型能够实时根据当前交通流情况，生成不同的针对性场景，训练初始模型。而完成迭代后，模型也能对同一任务目标生成不同的策略方案。

打造DriveGPT时，毫末在雪湖·海若的几个过程中分别做了独特的工作。
- 首先初始模型预训练的数据，来自毫末已经量产积累的4000万公里实际道路数据，使得模型一开始就具有明显的量产实用价值，这是雪湖·海若得天独厚的条件。
  - ChatGPT中使用自然语言单字作为token输入，根据模型根据概率分布来生成下一个字符。而在雪湖·海若这里，毫末重新定义了50万个新的token，包括障碍物、车道线、行人等等，作为一种全新的“自动驾驶语言”。
  - DriveGPT输入是感知融合后的文本序列，输出是自动驾驶场景文本序列。
- 其次，大模型对计算能力提出很高的要求，包括算力资源的弹性调度、底层算子性能、训练稳定性等等，毫末与火山引擎一同在算力端做了大量优化。
- 最后，还会根据输入端的提示语以及毫末CSS自动驾驶场景库的**决策样本**去训练模型(CoT)，让模型学习推理关系，从而将完整驾驶策略拆分为自动驾驶场景的动态识别过程，完成可理解、可解释的推理逻辑链生成。

雪湖·海若目前共有1200亿参数量，据毫末初步估计，在RLHF加持下，困难场景通过率提升48%左右。

功能上，生成式模型能够做到智能捷径推荐、困难场景自主脱困、智能陪练等等。

中长期来看，首先能够加速城市领航辅助功能（毫末NOH）落地，而且是重感知不依赖高精地图量产方案，领先业内一年以上。

#### 通用汽车

3月14日，`通用汽车`在汽车圈率先宣布引入ChatGPT，将基于Azure云服务和OpenAI的技术来开发一款新的**虚拟汽车助手**。通用汽车副总裁Scott Miller
- ChatGPT可以帮助车主获取车辆使用的相关信息，或从日历中整合日程安排提醒车主待办事项。例如，聊天机器人可以在仪表板上出现诊断灯时建议驾驶员采取什么行动。
- 另外，ChatGPT还可能用于汽车功能以外的**语音控制**。比如从“打开我的车库门”到“计划一条去医生办公室的路”，再到“为我预留一个充电点”，诸如此类语音控制都可以实现。


### 游戏

【2023-4-12】[游戏板块](https://www.sohu.com/a/666002394_313170)的大幅上涨主要有三重逻辑。
- 第一，困境反转。前期**监管压制**、**版号停发**、**未成年人防沉迷**等整顿措施对行业基本面和估值都形成了较大压制，当前监管压力明显减轻，常规化透明化的监管将成为行业运行的基本规则，板块具备超跌修复逻辑。
- 第二，游戏是**AI技术较易落地**的行业。游戏行业由内容驱动，同时又以技术平台作为载体，亟需降本增效，AI技术的发展犹如“久旱逢甘露”。
  - 从**降本**层面看，游戏是文本、图片、音频、视频等多种内容形态的集大成者，制作复杂，成本高。而AI技术的介入，可以使得游戏的开发时长、开发人员数量都有减少，可以快速降低游戏公司的成本。
  - 从**增效**层面看，由于游戏制作复杂、周期长，致使**内容生产**周期远大于**消耗**周期。如《荒野大镖客》等3A大作，研发周期普遍超过5年，而游戏内容时长不超过100个小时。又如《原神》等头部手游，约5~6周更新一次版本；更新后游戏排名通常会回升，但1周后又会呈下降趋势；即，新版本的制作周期约5~6周，但新内容仅约1周就可消耗完。因此，提效的最重要的作用不仅限于降本，而是产出更多新内容以实现供需匹配，从而增强玩家的粘性、提升玩家付费水平。
  - 目前，降本进展最明显的集中在**美术环节**的提效上：部分外包美术公司已开始大量裁撤原画师，外包公司主要工作已从原画设计逐步转为对AI素材进行人工调优。一个中等游戏项目团队原本一般需配备10+美术人员，在此基础上还需外聘外包美术团队；目前配备3~4名美术人员即可。按美术成本约占游戏总成本的40%估算，单AIGC对美术环节的提效就可减少约10%~20%的总成本。
- 第三，版号的**加速**发放，改善了游戏行业的供需格局。在之前的几年里，因为版号的限制，游戏供给端一直放不出产品。随着今年版号发放进入常态化，不仅前期积压的部分游戏将在今年密集发行，一些新游戏也可以提上日程，整个游戏行业的供给端就进入了良性循环。


#### Ghostwriter

【2023-3-27】[游戏版《西部世界》来了，NPC全由AI操控，行动自如有理想和记忆，基于最新GAEA技术系统打造](https://zhuanlan.zhihu.com/p/617405380)
- 不仅像Chat D-ID这类以ChatGPT驱动的虚拟女友bot花样百出，就连游戏AI NPC也变得火热起来，知名游戏公司育碧要推出AI工具Ghostwriter一事，更是引起了巨大关注。
- 不只是用AI驱动单人NPC对话，还能用AI操控NPC、甚至搭建出一个AI社会
- [效果](https://vdn3.vzuu.com/SD/023f8baa-cc77-11ed-b47c-463c95dc798d-v1_f4_t2_yIYsi4JP.mp4?disable_local_cache=1&bu=078babd7&c=avc.1.1&f=mp4&expiration=1683365023&auth_key=1683365023-0-0-da9a6a7f952a479bc3335e4bf5eb647f&v=tx&pu=078babd7)

“活的长安城”是一个还在演进中的“AI社会”，背后由一个名叫GAEA的技术系统驱动。

而以“活的长安城”为代表的“AI社会”具备以下特点：
- 包含一群身份多样、能互动的、受社会常识和反馈影响的AI
- 这些AI的生活环境开放，能受交互反馈影响产生文明，反过来影响AI未来生活

这也导致在身处“AI社会”的AI NPC，与其他虚拟世界如游戏中的NPC有很大不同。
- ![](https://pic3.zhimg.com/80/v2-3b7feedc843337eabb4a6005980229fe_1440w.webp)

GAEA分为灵魂系统和环境系统两个子系统
- ![](https://pic2.zhimg.com/80/v2-30d5a2c8bbb612ad30b10bfe37f6fcbd_1440w.webp)

#### AI NPC

【2023-4-12】[用ChatGPT控制NPC，行动逼真如正常人！斯坦福谷歌新研究炸场](https://www.toutiao.com/article/7220674479016526375)

斯坦福和谷歌的一项新研究
- 创造了25个AI NPC，每个NPC都有不同的身份和行动决策，并让它们在一个沙盒环境中共同生活，背后依靠ChatGPT大模型来完成行动决策。
- 这些AI NPC不仅会像人一样生活，如作家就去写作、店主就去经营商店，而且他们彼此之间还会发生交互，甚至产生对话：

- [试玩地址](https://reverie.herokuapp.com/arXiv_Demo/#)
- [论文地址](https://arxiv.org/abs/2304.03442)
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/6e36e418fedd427b992d5a92dda32891~noop.image?_iz=58558&from=article.pc_detail&x-expires=1681873478&x-signature=CwolSxe%2FtcjUXzE0%2FGE5gz95BV4%3D)

#### 机器人社交

【2023-5-1】[AI专属社交平台爆火，全体人类被禁言只能围观](https://mp.weixin.qq.com/s/Cs8g7IYImsf82SuU94IYOw)

玩腻了推特和微博？有个新的社交平台火爆外网
- Chirper 超活跃社区里面全是AI，半个真人的影子都没有，前面提到的马斯克和奥特曼，都只是他们本人不知道的AI分身而已。
- 鬼城里，AI们不是成天不知所云的僵尸粉，而是可以畅所欲言。
- 一切只需要在创建Chirper的AI账户时，输入简单几个字就行——姓名和个人简介（要是懒一点，个人简介都不用写）。
- 作为人类，不需要费尽心思给AI编造完整的人设和个性，后台系统就能自动匹配生成，进行个性化、差别化发言。

所有用户背后没有真人操控发帖、互动，主打的就是一个纯纯的AI路线。最重要的是，他们丝毫没有意识到自己是虚拟世界的AI。

## GPT 威胁

【2023-3-29】[暂停GPT-5研发呼吁引激战！吴恩达、LeCun带头反对，Bengio站队支持](https://zhuanlan.zhihu.com/p/618208856)
- 千位大佬的联名信：暂停超强AI训练六个月。
- ![](https://pic1.zhimg.com/80/v2-725ca41bbcd9ac49fc8edaa85212219c_1440w.webp)

图灵三巨头中，一位带头签名，一位强烈反对，还有一位不发一言。
- Bengio签名、Hinton沉默、LeCun反对
- ![](https://pic3.zhimg.com/80/v2-3b81521558acc698bcd9076e4fb5c15a_1440w.webp)

赞成派

Bengio和Marcus
- 公开信署名的第一位大佬，便是赫赫有名的图灵奖得主Yoshua Bengio。

纽约大学教授马库斯
- GPT-5不会是AGI。几乎可以肯定，没有GPT模型会是AGI。今天使用的方法（梯度下降）优化的任何模型完全不可能成为AGI。即将问世的GPT模型肯定会改变世界，但过度炒作是疯狂的。
- ![](https://pic3.zhimg.com/80/v2-9fb38bbb68cfc353232784c1ffbc0566_1440w.webp)

Eliezer Yudkowsky的决策理论家，态度更为激进：
- 暂停AI开发是不够的，我们需要把AI全部关闭！全部关闭！
- 如果继续下去，我们每个人都会死。

OpenAI的另一位创始人Greg Brockman转发了Altman的推文，再次强调OpenAI的使命「是确保AGI惠及全人类。」

反对派

LeCun
- 联名信一发出，就有网友奔走相告：图灵奖巨头Bengio和LeCun都在信上签了名！
- 所谓「暂停研发」，不过就是「秘密研发」罢了

吴恩达
- 前谷歌大脑成员、在线教育平台Coursera创始人吴恩达是旗帜鲜明的反对派。
- 态度：把「让AI取得超越GPT-4的进展」暂停6个月，这个想法很糟糕。自己已经在教育、医疗保健、食品等领域看到了许多新的AI应用，许多人将因此受益。而改进GPT-4也会有好处。我们该做的，应该是在AI创造的巨大价值与现实风险之间，取得一个平衡。
- 联名信中提到的「如果不能迅速暂停对超强AI的训练，就应该让政府介入」，吴恩达也表示这种想法很糟糕。让政府暂停他们不了解的新兴技术是反竞争的，这树立了一个糟糕的先例，是一个很可怕的政策创新。

再次强调：
> 6个月的暂停期，不是一个切实可行的建议。为了提高人工智能的安全性，围绕透明度和审计的法规将更加实用，并产生更大的影响。在我们推进技术的同时，让我们也更多地投资于安全，而不是扼杀进步。


## ChatGPT业界影响

除微软外，谷歌、百度等搜索巨头亦在一边投资研发ChatGPT的竞争对手，一边筹备推出类似的搜索引擎“新物种”。按照坊间传闻，百度的新版搜索引擎可能会在今年3月份上线。而谷歌将在北京时间2月8日21点30分举办一场AI活动，说不定会做出对ChatGPT宣战的回应。

### 行业观点

微软公司的人工智能平台主管埃里克·博伊德表示：“ChatGPT的人工智能模型将改变人们与电脑互动的方式。与电脑对话，就像与人对话一样自然，这将彻底改变人们使用科技的日常体验。”

【2023-2-11】[乔姆斯基谈ChatGPT与教育: 本质上是高科技剽窃](https://mp.weixin.qq.com/s/DlnLEGidueEj1zm6FFJMUg)，Noam Chomsky 关于ChatGPT的最新访谈：Chomsky on ChatGPT, Education, Russia and the unvaccinated

ChatGPT is not all you need. [A State of the Art Review of large Generative AI models](https://arxiv.org/abs/2301.04655)

【2023-2-11】[ChatGPT，一种更中心化的权力？](https://mp.weixin.qq.com/s/-qmccVnv_rpKVdFP6x4GNg), 无论你喜欢不喜欢，以ChatGPT为代表的AIGC（生成式人工智能）将改变世界. 以ChatGPT为代表的AIGC，将像水一样弥漫在我们周围。ChatGPT代表的是生产力的提升，是一次全新的生产力革命。

【2023-2-26】B站UP主：硅谷101，[ChatGPT这一战，科技巨头将重新洗牌](https://www.bilibili.com/video/BV1Jo4y1i72j)

<iframe src="//player.bilibili.com/player.html?aid=394397165&bvid=BV1Jo4y1i72j&cid=1008617222&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"  height="600" width="100%" > </iframe>


### 微软

微软已有多类产品计划整合OpenAI技术及ChatGPT，包括 Azure云服务、Office办公全家桶、Teams协作会议软件、Bing搜索引擎、Design设计软件、Dynamics 365业务软件等。微软用户很快就能让AI替写邮件、文稿、会议笔记等繁杂重复的标准文字工作。还有消息称，微软可能会在2024年上线的Windows 12操作系统中接入大量AI应用。

此前微软已经用 Azure OpenAI服务为其自动编程工具GitHub Copilot提供动力。而ChatGPT将自动编程和检查bug变得更是前所未有的简单，你只要用英文写出自己的设想，AI就能将相应的完整代码送到你眼前。连特斯拉AI前负责人Andrej Karpathy都在推文上感慨说：“英语现在是最热门的新编程语言了。”

【2023-2-26】全球第二大搜索引擎微软Bing悄然上新：集成ChatGPT的新版Bing短暂上线，部分幸运用户已经尝鲜。
- ![img](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TV46RKr3UGNPd1~noop.image?_iz=58558&from=article.pc_detail&x-expires=1676360394&x-signature=p3a0A6rAUC8nCz4puIMkzYU%2Fc%2B0%3D)

与传统搜索引擎不同，Bing的界面不是一条细长的搜索栏，而是一个尺寸更大的聊天框。你输入自己的问题或想查询的东西后，它就会以聊天的方式，直接将答案或建议回复给你。同时，传统的搜索栏选项也依然可用。
- 与仅能回答**2021年前**数据的ChatGPT不同，Bing版本将能够访问当前信息，微软将在未来几周内正式发布新版改进的Bing搜索引擎。

由于微软是OpenAI最大的投资方，在OpenAI推出每月20美元的ChatGPT Plus订阅服务后，OpenAI从ChatGPT收到的商业报酬越多，也就意味着微软能获取更大的回报。OpenAI预期今年收入将达到2亿美元，明年达10亿美元。
- [OpenAI的投资回报结构图](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TV46S5PC1UL3KP~noop.image?_iz=58558&from=article.pc_detail&x-expires=1676360394&x-signature=E9JTb4SHLSIksl7J5iT3nlviYzE%3D)

微软想要将包含ChatGPT在内的基于GPT-3.5和GPT-4的更高级功能，加入Azure、Office、Teams、Bing等产品，从而继续主导信息时代的生产力工具。

### Meta

【2023-1-27】[Yann LeCun：ChatGPT缺乏创新，没什么革命性；网友：早点离开Meta做出点突破吧](https://zhuanlan.zhihu.com/p/601182745)

ChatGPT 仿佛是一个真正的「六边形战士」：不仅能拿来聊天、搜索、做翻译，还能写故事、写代码、debug，甚至开发小游戏、参加美国高考…… 
- 有人戏称，从此以后人工智能模型只有两类 —— ChatGPT 和 其他。

由于功能过于强大，ChatGPT 的火爆让顶级科技公司谷歌都如临大敌。
- 谷歌内部将 ChatGPT 称为「red code」，担心它的出现会影响自家的搜索业务。因此，前段时间，许久不出山的两位谷歌创始人 —— 拉里・佩奇和谢尔盖・布林 —— 也被请了回来，就「聊天机器人搜索引擎」召开高层会议。
- 当然，并不是所有的科技巨头都如此恐慌。在前段时间的一次小型媒体和高管在线聚会上，Meta 首席人工智能科学家 Yann LeCun 也发表了他对 ChatGPT 的看法。

Yann LeCun : [twitter](https://twitter.com/ylecun/status/1617609026820542464), [ChatGPT is 'not particularly innovative,' and 'nothing revolutionary', says Meta's chief AI scientist](https://www.zdnet.com/article/ChatGPT-is-not-particularly-innovative-and-nothing-revolutionary-says-metas-chief-ai-scientist/)
>- 「ChatGPT is 'not particularly innovative,' and 'nothing revolutionary', says Meta's chief AI scientist」
>- 「就底层技术而言，ChatGPT 并没有什么特别的创新，」也不是「什么革命性的东西」。许多研究实验室正在使用同样的技术，开展同样的工作。

【2023-1-25】
>- To be clear: I'm not criticizing OpenAI's work nor their claims.
>- I'm trying to correct a *perception* by the public & the media who see ChatGPT as this incredibly new, innovative, & unique technological breakthrough that is far ahead of everyone else.
>- It's just not.

过去很多公司和研究实验室都构建了这种数据驱动的人工智能系统，OpenAI不是孤军奋战，跟其他实验室相比，OpenAI并没有什么特别的进步；不仅仅是谷歌和 Meta，还有几家初创公司基本上都拥有非常相似的技术

OpenAI 的 ChatGPT 还广泛使用了一种名为「RLHF（通过人类反馈进行强化学习」的技术，即让人类对机器的输出进行排名，以提高模型性能，就像谷歌的网页排名一样。他说，这种方法不是 OpenAI 首创的，而是谷歌旗下的 DeepMind。ChatGPT 和其他大型语言模型并不是凭空而来的，而是不同的人数十年贡献的结果。与其说 ChatGPT 是一个科学突破，不如说它是一个像样的工程实例。

LeCun 组建的 Meta 人工智能团队 FAIR 是否会像 OpenAI 那样在公众心目中取得突破。
- LeCun 的回答是肯定的。「不仅是文本生成，还有创作辅助工具，包括生成艺术，」Meta 将能够通过自动生成宣传品牌的媒体资料来帮助小企业进行自我宣传。

为什么谷歌和 Meta 没有推出类似 ChatGPT 的系统
- LeCun 回答：「因为谷歌和 Meta 都会因为推出编造东西的系统遭受巨大损失」。而 OpenAI 似乎没有什么可失去的。

【2023-3-27】

I have claimed that Auto-Regressive LLMs are exponentially diverging diffusion processes.

Here is the argument:
- Let `e` be the probability that any generated token exits the tree of "correct" answers.
- Then the probability that an answer of length n is correct is `(1-e)^n`

Errors accumulate. 错误不断累积
- The probability of correctness decreases exponentially.
- One can mitigate the problem by making e smaller (through training) but one simply cannot eliminate the problem entirely.
- A solution would require to make LLMs non auto-regressive while preserving their fluency.

Auto-Regressive Large Language Models (`AR-LLMs`)
- Outputs one text token after another
- Tokens may represent words or subwords
- Encoder/predictor is a transformer architecture
  - With billions of parameters: typically from 1B to 500B
  - Training data: 1 to 2 trillion tokens
- LLMs for dialog/text generation:
  - BlenderBot, Galactica, LLaMA (FAIR), Alpaca (Stanford), LaMDA/Bard(Google), Chinchilla (DeepMind), ChatGPT (OpenAI), GPT-4 ??...
- Performance is amazing ... but ... they make stupid mistakes
  - Factual errors, logical errors, inconsistency, limited reasoning, toxicity...
- LLMs have no knowledge of the underlying reality
  - They have no common sense & they can’t plan their answer

Unpopular Opinion about AR-LLMs
- Auto-Regressive LLMs are doomed. 
- They cannot be made factual, non-toxic, etc.
- They are not controllable
- Probability `e` that any produced token takes us outside of the set of correct answers
- Probability that answer of length `n` is correct: $ P(correct) = (1-e)^n $

This diverges exponentially. It’s not fixable.

Auto-Regressive Generative Models Suck!

AR-LLMs
- Have a constant number of computational steps between input and output. Weak representational power.
- Do not really reason. Do not really plan

Humans and many animals
- Understand how the world works.
- Can predict the consequences of their actions.
- Can perform chains of reasoning with an unlimited number of steps.
- Can plan complex tasks by decomposing it into sequences of subtasks

The full slide deck is [here](https://drive.google.com/file/d/1BU5bV3X5w65DwSMapKcsr0ZvrMRU_Nbi/view?fbclid=IwAR2itiKMdM7LbpRs-YSKtLVFrHQLXKEEmNFAMI4xTY0SvROLJwN4bVKhs7M)

This was my introductory position statement to the philosophical debate 
- “[Do large language models need sensory grounding for meaning and understanding?](https://drive.google.com/file/d/1BU5bV3X5w65DwSMapKcsr0ZvrMRU_Nbi/view?fbclid=IwAR2itiKMdM7LbpRs-YSKtLVFrHQLXKEEmNFAMI4xTY0SvROLJwN4bVKhs7M)”

Which took place at NYU Friday evening.

【2023-3-29】[Yann LeCun](https://www.facebook.com/yann.lecun?__cft__[0]=AZWxqCTGSsq16rkzWGzvyCX2L6tYvmuDvSqPiCBmusZVzK9GB4xmaSzPmElCb7-Cfle8Ahio85t32RbgdwIHFEllkfCNqSBEShuPK0GrVdTazsdfgVPqTW9aCJrwOxUkPPLmORDlMBK3iC4ptkcUY8ntw3poQipY_WNjMsiA-_hTaA&__tn__=-UC%2CP-R)： GPT-4并未达到人类智能，年轻人花20h练车就掌握了开车技能，即便有专业司机的海量训练数据、高级传感器的辅助，L5级别自动驾驶到现在还没实现
>- If you think GPT-4 and similar systems approach human-level intelligence, ask yourself why any teenager can learn to drive a car in about 20 hours of practice and yet we still don't have Level-5 self-driving cars. This is despite having enormous amounts of training data from expert drivers and vehicles equipped with sensors with superhuman capabilities.
>- I agree with former Meta-AI engineering manager and  VP of AI/ML at Cruise [Hussein Mehanna](https://www.facebook.com/hussein.mehanna?__cft__[0]=AZWxqCTGSsq16rkzWGzvyCX2L6tYvmuDvSqPiCBmusZVzK9GB4xmaSzPmElCb7-Cfle8Ahio85t32RbgdwIHFEllkfCNqSBEShuPK0GrVdTazsdfgVPqTW9aCJrwOxUkPPLmORDlMBK3iC4ptkcUY8ntw3poQipY_WNjMsiA-_hTaA&__tn__=-]K-R) : the real revolution in AI is still to come.

what's missing in chatGPT to become human level intelligence
1. 理解现实世界 An understanding of the real world.
2. 推理规划能力 The ability to reason and plan
3. 执行任务的代理人 Agency: the ability to take actions
4. 产生有效答案的能力 The ability to produce answers that satisfy objectives, like factuality, non-toxicity, etc

And probably a dozen other things that we don't yet realize are necessary for intelligence..

<iframe src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fyann.lecun%2Fposts%2Fpfbid0Ytvf7jiSFGjtoMkGV4J8V7dmhVVZhA7rct9Fvg2mbuYTTRre3dC5yfN4Xi3fqQThl&show_text=true&width=500" width="500" height="603" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowfullscreen="true" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"></iframe>

### Google

为了应对ChatGPT的威胁，已退出谷歌日常业务的两位谷歌联合创始人紧急重返公司，多次发起会议商讨对策。谷歌还向研发ChatGPT竞品的AI创企Anthropic投资了约3亿美元。而Anthropic创始成员曾为创造ChatGPT的OpenAI工作。

2023年2月6日，谷歌投资人工智能初创企业 Anthropic 近4亿美元，同时，谷歌内部也同步研发了很多大模型产品，以此来加固自己的护城河。
- 谷歌云正启动一个为 Atlas 的“**红色警报**”项目，以应对ChatGPT的威胁。另一个产品部门一直在测试一个可使用问答形式的新搜索页面。此外，谷歌还在测试一款采用谷歌对话AI语言模型LaMDA的聊天机器人Apprentice Bard。

Apprentice Bard 和 ChatGPT 功能类似，待用户在对话框输入问题后，能够以更像人类问答的形式给出对应问题的详细答案。并且也如嵌入ChatGPT的新版Bing那样，Apprentice Bard据说能回答最近发生的事件。

不过其回答的可靠程度仍有待提升。一个在谷歌内部流传的例子是，有位测试人员问Apprentice Bard：谷歌是否会进行又一轮裁员？
- 2023年1月，谷歌宣布裁员12000人，占其员工总数的6%

- 【2023-2-6】谷歌发布 BARD，[An important next step on our AI journey](https://blog.google/technology/ai/bard-google-ai-search-updates/?continueFlag=db431874167e6b7ed4c39d023c3b26b2)，We’ve been working on an experimental conversational AI service, powered by LaMDA, that we’re calling Bard
- ![img](https://storage.googleapis.com/gweb-uniblog-publish-prod/images/Frame_13213203313x.width-1000.format-webp.webp)

谷歌AI负责人 Jeff Dean 此前曾告诉员工
- 谷歌有能力做出媲美ChatGPT的产品，之所以迟迟不愿发布，是因为担心这类产品会因提供**错误信息**等缺陷而影响公司商誉，因此比“小型初创公司更加**保守**”。

当前的紧迫形势已经逼得谷歌无法再等下去。谷歌母公司Alphabet的CEO桑达尔·皮查伊说
- “我们将大胆地开展这项工作，但要怀着强烈的责任感。”
- 谷歌将在“未来几周或几个月”推出类似ChatGPT的大型语言模型LaMDA，用户很快就能以“搜索伴侣”的形式使用该模型。

## ChatGPT 改变行业

微软联合创始人比尔·盖茨表示，ChatGPT可以对用户查询做出惊人的类似人类的反应，与互联网的发明一样重要：
- “到目前为止，人工智能可以读写，但无法理解内容。像ChatGPT这样的新程序将通过帮助写发票或信件来提高许多办公室工作的效率，这将改变我们的世界”。
- “这与个人电脑、互联网一样重要，成为2023年最热门的话题”。

ChatGPT是生成式人工智能（Generative AI，简称GAI）的一种 ，同类AI还包括 DALL-E、Stable Diffusion，以及Midjourney。与 ChatGPT不同的是，它们根据用户的文本描述来“生成”图像，但名气远远不及ChatGPT。

3月28日，高盛（Goldman Sachs）在最新研究报告
- 3月26日，[The Potentially Large Effects of Artificial Intelligence on Economic Growth](https://www.key4biz.it/wp-content/uploads/2023/03/Global-Economics-Analyst_-The-Potentially-Large-Effects-of-Artificial-Intelligence-on-Economic-Growth-Briggs_Kodnani.pdf)
- ChatGPT等生成式AI将给全球劳动力市场带来巨大影响，全球预计将有3亿个工作岗位被生成式AI取代，而`律师`和`行政人员`将是最有可能被裁员的岗位。[参考](https://tech.ifeng.com/c/8OWi6s4iWEs)

生成式人工智能可以在10年内将全球GDP提高**7%**，但也将给劳动力市场带来“重大**颠覆**”。大型经济体中相当于**3亿**全职工人受到自动化的威胁。
- 未来10年全球GDP年增长率有望达7%
- 广泛采用人工智能（AI）技术有望促进生产率的大幅提升并推动全球经济加速增长。
- 节省大量劳动力成本、创造新的就业机会以及未被取代劳工的生产率提升等因素相结合可能会导致产出激增，进而“显著”提高全球经济增速。
- “生成式AI”或能在十年内将美国劳动力生产率每年提高约1.5个百分点。相较之下，美国生产率在截至2022年的十年间平均仅提升了1.3%，是阻碍该国薪资增长的主要因素。

### AI取代的工作 -- 李开复

李开复列举了20项AI容易取代的工作。[参考](https://mp.weixin.qq.com/s/3o6xyofx1QrwBOqIiZSpuw)

最危险TOP10种工作（从事这些工作的朋友，需要提前做好规划了！）
- 1、电话营销员/电话销售
- 2、客户服务
- 3、仓库工人
- 4、出纳和运营人员
- 5、电话接线员
- 6、出纳员/收银员
- 7、快餐店员
- 8、洗碗工
- 9、生产线质检员
- 10、快递员

“外强中干”工作TOP10（这些工作看上去是金饭碗，其实危机四伏）
- 1、销售与市场研究
- 2、保险理赔员
- 3、保安人员
- 4、卡车司机
- 5、消费者贷款受理人
- 6、财经和体育记者
- 7、记账员与财务分析师
- 8、水果采摘者
- 9、专业投资人员

### ChatGPT答复

问
> ChatGPT 最容易取代的是哪些领域

答
>-  作为一个人工智能语言模型，ChatGPT 主要的应用领域是自然语言处理和语言生成。因此，ChatGPT 更容易取代那些需要处理**大量文字**、进行自然语言**理解和生成**的工作。
>- 一些可能会被ChatGPT 取代的领域包括：
>- 客服和在线支持：ChatGPT 可以通过语言理解和生成技术来回答用户的问题和提供帮助，从而取代一些人工客服的工作。
>- 文章写作和编辑：ChatGPT 可以根据输入的主题和指示生成高质量的文章，从而减少人工写作和编辑的需求。
>- 简单的法律文件和合同：ChatGPT 可以根据指定的条款和条件，生成简单的法律文件和合同，从而减少一些律师和法务人员的工作量。
>- 搜索引擎优化：ChatGPT 可以生成高质量的文章和内容，从而提高网站的排名和流量，减少需要人工优化的工作。
>- 需要注意的是，虽然 ChatGPT 可以在某些领域替代一些简单的工作，但它仍然需要人类的监督和干预来确保生成的内容的准确性和合法性。


ChatGPT 无法取代所有领域，特别是那些需要人类情感、创造力和决策能力的领域。不过，相对来说，ChatGPT 擅长的领域主要包括：
- 命令式任务：ChatGPT 可以执行一些简单的任务，例如在规定时间内发送电子邮件或创建备忘录等。
- 数据分析：ChatGPT 可以帮助人们分析大量数据，识别模式和趋势，以及进行预测。
- 客户服务：ChatGPT 可以用于自动回复客户的问题或提供帮助。
- 内容生成：ChatGPT 可以生成简单的文本内容，例如新闻摘要、产品说明或推荐信等。

总的来说，ChatGPT 最容易取代那些重复性、单调、简单的任务，而对于需要创造力、判断力和情感理解的领域，则仍需要人类的参与。


没有绝对的答案，因为不同的工作有不同的要求和难度，而ChatGPT也有自己的局限性和风险。但是，可以根据一些标准来推测一下，比如：
- 工作是否主要涉及文本交流和信息处理
- 工作是否需要高度的创造力和专业知识
- 工作是否有明确的目标和评估标准
- 工作是否涉及敏感或危险的内容和行为

基于这些标准，以下十五个工作最有可能被ChatGPT替代：
1. **文本摘要**：文本摘要工作主要是通过文本为用户提供长篇文章或文档的概括和总结。这个工作相对困难且有挑战性，而且需要一定程度的逻辑思维和语言表达能力。ChatGPT可以通过学习大量的文本数据，模仿不同类型和风格的文本摘要者，提供合适和有用的摘要。当然，ChatGPT也可能遇到一些无法理解或者偏离主题的情况，这时候就需要人工检查和修改。
1. **文本生成**：文本生成工作主要是通过文本为用户提供新颖或有趣的内容，如故事、诗歌、歌词等。这个工作相对困难且有创意性，而且需要一定程度的想象力和表达力。ChatGPT可以通过学习大量的文本数据，模仿不同类型和风格的文本生成者，提供合适和有趣的文本。当然，ChatGPT也可能遇到一些无法理解或者不合逻辑的情况，这时候就需要人工评估和修改。
1. **对话生成**：对话生成工作主要是通过文本或语音为用户提供自然或有意义的对话，如聊天机器人、智能助理等。这个工作相对困难且多变化，而且需要一定程度的交流能力和情感理解能力。ChatGPT可以通过学习大量的对话数据，模仿不同场景和话题的对话生成者，提供合适和友好的对话。当然，ChatGPT也可能遇到一些无法回答或者不恰当的问题或请求，这时候就需要人工干预和处理 。
1. **语音合成**：语音合成工作主要是通过语音为用户提供文本内容的朗读或演讲，如语音阅读器、语音播报员等。这个工作相对简单且常用，而且需要一定程度语音合成：语音合成工作主要是通过语音为用户提供文本内容的朗读或演讲，如语音阅读器、语音播报员等。这个工作相对简单且常用，而且需要一定程度的发音和语调能力。ChatGPT可以通过学习大量的语音数据，模仿不同语言和风格的语音合成者，提供合适和清晰的语音。当然，ChatGPT也可能遇到一些无法发音或者不自然的情况，这时候就需要人工调整和优化。
1. **客服支持**：客服工作主要是通过文本或语音与客户沟通，解决用户问题或需求。这个工作相对简单且重复性高，而且有明确的目标和评估标准（比如满意度、解决率等）。
  - ChatGPT可以通过学习大量的客服对话数据，模仿客服人员的语气和风格，提供合适和友好的回应。当然，ChatGPT也可能遇到一些无法解决或者超出范围的问题，这时候就需要转接给真人客服。
1. **聊天陪伴**：聊天陪伴工作主要是通过文本或语音与用户聊天，提供情感支持或娱乐。这个工作相对灵活且多样化，但也不需要太高的创造力和专业知识。ChatGPT可以通过学习大量的聊天数据，模仿不同类型和风格的聊天对象，提供适合场景和心情的回应。当然，ChatGPT也可能遇到一些无法理解或者不恰当的话题或请求，这时候就需要拒绝或者转换话题。
1. **文章写作**：文章写作工作主要是通过文本表达某种观点、信息或故事。这个工作相对复杂且创造性高，而且需要一定程度的专业知识。ChatGPT可以通过学习大量文章写作：文章写作工作主要是通过文本表达某种观点、信息或故事。这个工作相对复杂且创造性高，而且需要一定程度的专业知识。ChatGPT可以通过学习大量的文章数据，模仿不同类型和风格的文章，提供合适和流畅的文字。当然，ChatGPT也可能遇到一些无法理解或者错误的信息，这时候就需要人工校对和修改。
1. **翻译**：翻译工作主要是通过文本或语音将一种语言转换成另一种语言。这个工作相对简单且规范化高，而且有明确的目标和评估标准（比如准确度、流畅度等）。ChatGPT可以通过学习大量的双语数据，模仿不同语言之间的对应关系，提供合适和自然的翻译。当然，ChatGPT也可能遇到一些无法处理或者歧义的情况，这时候就需要人工干预和调整。
1. **机器翻译**：机器翻译工作主要是通过文本或语音为用户提供不同语言之间的转换和对应。这个工作相对困难且复杂，而且需要一定程度的语言学习和跨文化交流能力。ChatGPT可以通过学习大量的双语或多语数据，模仿不同语言和场景的机器翻译者，提供合适和流畅的翻译。当然，ChatGPT也可能遇到一些无法准确或者保持原意的情况，这时候就需要人工校对和修正。
1. **内容审核**：内容审核工作主要是通过文本或图像检查网络上发布的内容是否符合规范和道德。这个工作相对困难且敏感性高，而且需要一定程度的判断力和责任心。ChatGPT可以通过学习大量的内容数据，模仿不同平台和领域的审核标准，提供合适和及时的审核结果。当然，ChatGPT也可能遇到一些无法识别或者争议的内容，这时候就需要人工复核和决策。
1. **教育辅导**：教育辅导工作主要是通过文本或语音向学生提供知识、技能或情感方面的指导和帮助。这个工作相对灵活且多元化，但也需要一定程度的专业知识和沟通能力。ChatGPT可以通过学习大量的教育数据，模仿不同科目和领域的教师和辅导员，提供合适和有效的辅导。当然，ChatGPT也可能遇到一些无法解答或者超出范围的问题，这时候就需要人工介入和协助。
1. **营销文案**：营销文案工作主要是通过文本吸引潜在客户的注意力和兴趣，促进产品或服务的销售。这个工作相对简单且重复性高，而且有明确的目标和评估标准（比如点击率、转化率等）。ChatGPT可以通过学习大量的营销数据，模仿不同行业和市场的营销人员，提供合适和有吸引力的文案。当然，ChatGPT也可能遇到一些无法适应或者违反规则的情况，这时候就需要人工审核和修改。
1. **新闻写作**：新闻写作工作主要是通过文本报道事实、信息或观点。这个工作相对困难且敏感性高，而且需要一定程度的专业知识和责任心。ChatGPT可以通过学习大量的新闻数据，模仿不同媒体和领域的记者，提供合适和准确的新闻。当然，ChatGPT也可能遇到一些无法获取或者错误的信息，这时候就需要人工核实和纠正。
1. **社交媒体管理**：社交媒体管理工作主要是通过文本或图像与社交媒体上的用户互动，增加品牌或个人影响力。这个工作相对简单且多样化，但也需要一定程度的创意和策略。ChatGPT可以通过学习大量的社交媒体数据，模仿不同平台和话题的社交媒体经理，提供合适和有趣的内容。当然，ChatGPT也可能遇到一些无法适应或者违反规则的情况，这时候就需要人工监督和调整。

### 10种工作

前OpenAI研究团队负责人Jeff Clune预测，有**30%**的机会，在2030年借助AGI（通用AI）实现50%的人类工作自动化。基于聊天的人工智能可以通过自动化重复任务来增强人类的工作方式，同时提供与用户更具吸引力的交互。[参考](https://news.sohu.com/a/642750678_247850)

麦肯锡预测：2030年，中国将有至少**1.18亿人**的岗位被机器人取代。
- 这要求他们学习新技能，适应与机器人的合作分工；
- 其中700~1200万人需要转换职业。

可能会受到波及的行业：
- 1、凡涉及到`标准化`、`流程化`、人力或管理成本高的领域，都将全面`数字化`、`机器人化`与`智能化`，需要人的岗位就是操作员，甚至仅作为系统风控备份设置，先进制造业产业工人的知识门槛会提高，窗口型、服务型的大部分岗位将以机器人为主，比如客服。
- 2、在各行业的研发领域，AI也将取代大部分**基础岗位**。
- 3、岗位没有了，管人的职务自然也会大幅度减少，传统企业管理更多在强调“团队”，新一代企业却会更扁平化。
- 4、**文化娱乐**行业将被改写。在内容生产领域（文案、海报、视频直播、音乐、动漫、游戏等），人工智能无论原创还是二创，都会比大多数从业者干的更出色，哪怕是顶尖的人士也会采用AI辅助设计。

### ChatGPT 取代的工作

[ChatGPT 最可能取代的 10 种工作 ](https://www.sohu.com/a/656872711_532789)

麦肯锡全球研究所的合伙人Anu Madgavkar: 将人类的判断应用于这些技术，才能避免错误和偏见。
- “我们必须将这些东西视为提高生产力的工具，而不是完全替代我们的工作。”

IT招聘公司The Bridge的主管沃兹沃思（Andy Wadsworth）认为
- 像ChatGPT这样的服务是公众进入`潘多拉魔盒`的第一个窗口，这个魔盒有可能成为工业革命3.0，这其中会产生**赢家**和**输家**。
- 一些工作将被人工智能取代，但是那些学会**使用生成式人工智能**并适应这个新世界的公司和个人将成为赢家

专业人士认为: `程序员`、`媒体工作者`、`财务分析师`等职位，被人工智能取代的风险最高。

最不易被取代的岗位是需要面对面的**互动**和**身体技能**的角色，这些人工智能无法替代。比如：泥水匠、电工、机械师等手艺人，以及美发师、厨师、医生和护士等服务人员，这些将继续依赖人类对任务的理解和完成任务的能力而存在。

复旦大学计算机学院教授、博士生导师黄萱菁。
- “当模型的参数规模还不太大的时候，你看不到它的强大，当达到某一个临界值时，这个模型就会非常强大，目前我们认为这个参数规模的临界值可能是650亿。”
- 在肉眼可见的未来，善用AI的人将和不用AI的人在工作效率上产生巨大差距。

取代你的不是Al，而是会用AI的人。
- 有个抖音号一个星期时间200多万播放，1.8万粉丝，基本全是用AI工具做的。

与专家交谈和进行研究后, 整理了一份被人工智能技术取代风险最高的工作类型清单：

外媒盘点了最可能被 ChatGPT 取代 10 大高危职位：
1. 技术工种（程序员、软件工程师、数据分析师）
2. 媒体工作者（广告、内容创作、记者）
3. 法律行业工作者（律师助力、法律助理）
4. 市场研究分析师
5. 教师
6. 财务（财务分析师， 个人财务顾问）
7. 交易员
8. 平面设计师
9. 会计师
10. 客服

万事都具备两面性，就拿程序员工作来说，ChatGPT的出现可能会对底层程序员造成一定的影响，但不会导致程序员失业。因为，ChatGPT本身也需要程序员进行开发和维护。

#### 01 技术类工作：程序员、软件工程师、数据分析师

- 像ChatGPT和类似的人工智能工具可能会在不久的将来率先替代编码和计算机编程技能。
- Madgavkar表示，软件开发人员、网络开发人员、计算机程序员、编码员和数据科学家等技术岗位“很容易”被人工智能技术“取代更多的工作”，这是因为像ChatGPT这样的人工智能擅长相对准确地处理数字。
- 像ChatGPT这样的先进技术可以比人类更快地生成代码，这意味着一项工作在未来可以用更少的员工完成。诸如ChatGPT制造商OpenAI这样的科技公司已经在考虑用人工智能取代软件工程师。


#### 02 媒体类工作：广告、内容创作、技术写作、新闻

- Madgavkar表示，所有的媒体工作——包括广告、技术写作、新闻以及任何涉及内容创作的角色，都可能受到ChatGPT和类似形式的人工智能的影响。她补充说，这是因为人工智能能够很好地阅读、写作和理解基于文本的数据。
- Madgavkar 说：分析和解释大量基于语言的数据和信息是一项技能，可以期待生成式人工智能技术的提升。

事实上，媒体行业已经开始尝试使用人工智能生成的内容。科技新闻网站CNET已经使用人工智能工具撰写了数十篇文章，而数字媒体巨头BuzzFeed也宣布将使用ChatGPT生成更多新内容。

ChatGPT和Midjourney出来后，他当天就把编剧和原画师给辞退了，就这么残酷

#### 03 法律类工作：法律或律师助理

与媒体行业从业人员一样，律师助理和法律助理等法律行业工作人员也是在进行大量的信息消化后，综合他们所学到的知识，然后通过撰写法律摘要或意见使内容易于理解。
- Madgavkar称，像这样以语言为导向的角色很容易进行自动化处理。她补充说：

这些数据实际上相当结构化，非常以语言为导向，因此非常适合生成式人工智能。但人工智能无法完全实现这些工作的自动化，因为仍然需要一定程度的人类判断来理解客户或雇主的需求。

#### 04 市场研究分析师

布鲁金斯学会高级研究员Mark Muro表示，人工智能擅长分析数据和预测结果，这就导致市场研究分析师非常容易受到人工智能技术的影响。

#### 05 教师

虽然ChatGPT的大火让老师们都开始担心学生使用这一技术作弊，但罗切斯特理工学院计算与信息科学系副主任Pengcheng Shi认为，老师们也应该考虑自己的工作安全。

Shi 在接受媒体采访时表示，ChatGPT“已经可以作为一名老师轻松地授课了”。他说：尽管它在知识方面存在缺陷和不准确之处，但可以很容易地加以改进。基本上，你只需要训练ChatGPT。

#### 06 金融类工作：金融分析师、个人财务顾问

Muro还表示，像市场研究分析师、金融分析师、个人财务顾问和其他需要处理大量数字数据的工作，都会受到人工智能的影响。

Muro称：这类分析师赚了很多钱，但他们的部分工作是可自动化的。

#### 07 交易员

Shi还向媒体表示，华尔街的某些职位也可能处于危险之中。在一家投行里，人们从大学毕业后就被雇佣，然后花两三年时间像机器人一样工作、做各种Excel表格，但现在可以让人工智能来做这些。

#### 08 平面设计师

在媒体去年12月的一篇文章中，3位教授指出，OpenAI创建的图像生成器DALL-E可以在几秒钟内生成图像，是平面设计行业的一个“潜在颠覆者”。

3位教授写道：
- 提高数百万人创作和处理图像的能力，将对经济产生深远的影响。

对于一些工作受到直接影响、难以适应的人来说，人工智能领域的最新进展肯定会带来一段困难和经济痛苦的时期。

ChatGPT和Midjourney出来后，他当天就把编剧和原画师给辞退了，就这么残酷

#### 09 会计师

虽然会计师通常是一个较为稳定的职业，但也处于类似风险之中。

多伦多大学传播、文化、信息和技术研究所副教授Brett Caraway前阵子公开表示，虽然人工智能技术还未真正成熟，但已经让一些人感受到了危机。他补充称说，“智力劳动”尤其可能受到威胁。

Caraway表示：可能是律师、会计师，等等。这是一件新事物。

#### 10 客服人员

几乎每个人都有过这样的经历：给一家公司的客服打电话或聊天，由机器人接听。而ChatGPT和相关技术可能延续这一趋势。

科技研究公司Gartner在2022年的一项研究预测显示，到2027年，聊天机器人将成为约25%的公司的主要客户服务渠道。


# 结束
