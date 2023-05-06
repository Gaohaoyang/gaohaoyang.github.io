---
layout: post
title:   AI顶级机构发家史
date:   2023-02-17 13:52:00
categories: 人工智能
tags: OpenAI ChatGPT AI 开源 协议 社区 
excerpt: 世界顶级AI机构（OpenAI/DeepMind/BostonDnymic等）的故事
mathjax: true
permalink: /company
---

* content
{:toc}

# 顶级AI机构


## 人工智能革命

【2023-2-20】[ChatGPT：那些让美国伟大的俄罗斯人](https://mp.weixin.qq.com/s/GRflnsfhk3x15Bvx2IVdRw)

人工智能三次震惊世界。1997年，2016年，2023年。而这三次都由美国主导，而且都和美国最大的对手苏联（俄罗斯）有关。
- 1997年，IBM的`深蓝`，打败俄罗斯国际象棋大师`卡斯帕罗夫`。
- 2012年，AlexNet 网络拿下计算机视觉比赛第一。
  - ImageNet是最权威的人工智能大赛。AlexNet不仅拿了第一，而且精确度是第二名的两倍。
  - AlexNet由三个人开发，计算机老教授`辛顿`（Geoffrey Hinton），还有他的两个学生，`Alex Krizhevsky`和`小萨`。Alex和小萨，都出生在苏联。
- 2016年，`AlphaGo`战胜围棋九段李世石。AlphaGo由谷歌旗下的`DeepMind`开发。谷歌两位创始人中的`谢尔盖·布林`（Sergey Brin）出生在苏联，是人工智能战略最坚定的推动者。对弈的第三天，比赛进入高潮，`布林`飞到首尔，代表谷歌享受胜利。
- 2023年，`ChatGPT`惊艳登场。它背后最重要的人，不是大家炒作的`马斯克`和`阿尔特曼`（Sam Altman），而是OpenAI的联合创始人、首席科学家`伊利亚·萨特斯基弗`（Ilya Sutskever）。我管他叫“小萨”。小萨和`布林`一样，出生在苏联。

## AI机构

AI机构分布
- ![](https://www.cs.tsinghua.edu.cn/__local/4/BE/50/8774EBF7BF59087FB1134443378_929E9923_19ECC.png)

【2022-1-25】[AMiner重磅发布：2022年人工智能全球最具影响力学者榜单AI 2000](https://www.cs.tsinghua.edu.cn/info/1088/4796.htm)

## 人才培养

### AI人才

AI学者国家分布
- ![](https://www.cs.tsinghua.edu.cn/__local/4/A9/CA/7A826C4F0E8E82A017CB3576DCB_DED93F8F_10E29.png)
- 美国入选AI 2000学者及提名学者的数量最多，有1146人次，占比57.3%，超过总人数的一半以上。
- 中国排在美国之后，位列第二，有232人次，占比11.6%。
- 英国位列第三，有115人次，占比5.75%。
- 德国位列第四，人次未超过100，但依旧是欧盟学者数量最多的国家。
- 整个欧洲学者数量表现较上年有所流失。

### 人才流失

怎么留住顶级人才，让他们去做顶级创新。那是一些怪才，想法独特，有固执的价值观，动不动和老板拍桌子，抵制自己的公司。一个商业系统，一个社会环境，既有追逐利润的野心，也能开辟出一块不被打扰的角落，让那群怪才保存理想主义做自己认定的事。AI是兵家必争之地，那么这样一个系统和环境，才是真正的战场。

清北海归也有不少回国创业的
- transformer-xl发明人杨植麟，清华本，循环智能创始人；
- 李纪为，北大生科，斯坦福华人三年博士毕业第一人，香侬科技创始人；
- 尤洋，清华硕，colossal ai创始人；
- 贾扬清，离开阿里后，可能加盟大模型创业；
- 何恺明，离开fair后，刚去mit任教…

还有大大大佬
- 朱松纯
- 颜宁

## 开源

【2023-2-26】
- [十分钟理清常见的开源协议](https://juejin.cn/post/6844903511071670286)


### 开源等级

斯坦福大学基础模型研究中心主任 Percy Liang将大模型的**开放程度**总结成4个层次：[参考](https://www.51cto.com/article/708282.html)
- 第一层**论文**开放，证明一些设想的可行性，并提供构建思路;
- 第二层**API**开放，允许研究人员探索和评估现有模型的能力(如推理能力)和限制(如偏见);
- 第三层**模型权重**开放和**训练数据**开放，允许研究人员逐步改进现有模型，开发更深入的可解释性技术和更有效的微调方法，让研究人员更好地理解训练数据在模型行为中的作用;
- 第四层**计算能力**开放，允许研究人员尝试新的体系结构、训练目标和过程、进行数据融合，并在不同的领域开发全新的模型。

### 开源协议

目前开源协议软件被越来越多应用，但很多公司或个人在使用的时候并不注意说其使用的开源软件采用的协议，可能导致后续的一些法律上的纠纷。因此这里将常用的开源协议整理一下以供参考。

#### 开源协议总结

当前GITHUB最常用的开源协议主要由`MIT`，`Apache 2.0`以及`GPLv3`。三种协议里面
- `MIT`协议最**宽松**，可以任意使用；
- `Apache`协议对于企业**更友好**，不用担心涉及专利的事情；
- `GPLv3`是**最严**的，它严格要求使用此协议组件的软件产品也必须按照GPLv3协议开源出来。

【2023-3-7】[OpenRAIL 协议](https://www.licenses.ai/blog/2022/8/18/naming-convention-of-responsible-ai-licenses), 常用协议无法满足 AI 领域，于是诞生了 OpenRAIL
- Open & Responsible AI licenses ("`OpenRAIL`") are AI-specific licenses enabling open access, use and distribution of AI artifacts while requiring a responsible use of the latter. 
- OpenRAIL licenses could be for open and responsible ML what current open software licenses are to code and Creative Commons to general content: a widespread community licensing tool.

#### 开源协议演变

开源协议演变

<img src="http://pugong.me/images/open-source-software-licensing.png" width=500>

如果自己开源，选择License时需要考虑
- [开源协议漫谈](http://pugong.me/tech/licenses-of-open-source-software.html)

常见的协议如下：
- ApacheLicense 2.0 、GPLv3 、LGPL、、MIT License、BSD 和 Mozilla 2.0 。

#### Apache License 2.0 

- 一个著名的非盈利开源组织Apache采用的协议，鼓励代码共享和尊重原作者的著作权，同时也允许代码修改，再发布（作为开源或商业软件）。

要求
- 在代码中保留作者提供的协议和版权信息
- 如果修改了代码，则必须在被修改的文件中进行说明。
- 允许的权利商用、分发、修改、专利授权、私用、附加协议

禁止项
- 禁止因使用等造成影响责任承担、也就是说免责申明
- 不能使用相应的商标。

提示：
- 商业软件可以使用，也可以修改使用Apache协议的代码。


#### GPLv3

- 此协议是应用最为广泛的开源协议，拥有较强的版权自由要求,也赋予和保证了开源项目开发者广泛的权利。基本上，它允许用户合法复制，分发和修改软件，但衍生代码的分发需开源并且也要遵守此协议。此协议有许多变种，不同变种的要求略有不同。


要求
- 修改后的源码也需要公开
- 版权及协议也要于此协议一致
- 修改后，需要在相应的文件做说明，

允许商用，分发，修改，专利授权，私用

禁止
- 禁止因使用等造成影响责任承担、也就是说免责申明
- 静止在软件分发传播过程中附加上原来没有的协议条款等

提示：商业软件不能使用GPL协议的代码。

#### LGPL

- 其主要用于一些代码库，LGPL比起GPL它授予的权限较少，LGPL允许商业软件通过类库引用(link)方式使用LGPL类库而不需要开源商业软件的代码。因此使用LGPL协议的开源代码可以被商业软件作为类库引用并发布和销售。注意是以类库的形式使用，也就是说如果修改了源代码的话则也必须使用LGPL协议贡献源码出来。

要求
- 公开使用了LGPL部分的代码，其余部分不需要公开。
- 可以库引用的方式用于商业软件。
- 在代码中保留作者提供的协议和版权信息

允许商用、分发、修改、专利授权、私用、附加协议

禁止禁止承担责任，(免责申明)、

提示：商业软件可以使用，但不能修改LGPL协议的代码。

GPL/LGPL都保障原作者的知识产权，避免有人利用开源代码复制并开发类似的产品

#### MIT

- 宽松简单且精要的一个协议。在适当标明来源及免责的情况下，它允许你对代码进行任何形式的使用,也就是原作者只想保留版权,而无任何其他了限制,而你必须在发行版里包含原许可协议的声明,无论你是以二进制发布的还是以源代码发布的。

要求在代码中保留作者提供的协议和版权信息

允许商用、分发、修改、私用、附加协议

禁止禁止承担责任，(免责申明)

提示：商业软件可以使用，也可以修改MIT协议的代码，甚至可以出售MIT协议的代码。

#### BSD

- BSD开源协议是一个给于使用者很大自由的协议。基本上使用者可以”为所欲为”,可以自由的使用，修改源代码，也可以将修改后的代码作为开源或者专有软件再发布。与MIT协议只存在细微差异。差别为MIT可以使用原名称进行宣传，而BSD不可以。

要求在代码中保留作者提供的协议和版权信息

允许商用、分发、修改、私用、附加协议

禁止禁止承担责任，(免责申明)

提示：商业软件可以使用，也可以修改使用BSD协议的代码。

#### Mozilla 2.0

- 由Mozilla基金创建维护的。此协议旨在较为宽松的BSD协议和更加互惠的GPL协议中寻找一个折衷点，允许免费重发布、免费修改，但要求修改后的代码版权归软件的发起者。这种授权维护了商业软件的利益，它要求基于这种软件得修改无偿贡献版权给该软件。

要求
- 公开源代码
- 在代码中保留作者提供的协议和版权信息

允许商用、分发、修改、专利授权、私用、附加协议

禁止
- 禁止承担责任，(免责申明)
- 禁止使用商标

提示：商业软件可以使用，也可以修改MPL协议的代码，但修改后的代码版权归软件的发起者。

作者：[技术特工队](https://juejin.cn/post/6844903511071670286)


#### Open RAIL

[FROM RAIL TO OPEN RAIL: TOPOLOGIES OF RAIL LICENSES](https://www.licenses.ai/blog/2022/8/18/naming-convention-of-responsible-ai-licenses)：从 RAIL 到 Open RAIL 协议演变


##### RAIL

- RAIL 协议: 2019年诞生，对用户使用行为进行限制以达到限制AI技术造成伤害的开源协议
  - The RAIL initiative was established in 2019 to advocate for the adoption of behavioral use-based restrictions in licenses and contracts for the purpose of mitigating the risk of harm from sharing AI technologies.

In essence, we could consider licenses associated with AI related artifacts to be RAIL Licenses if:
- they include behavioral-use restrictions which disallow/restrict certain applications by the licensee; and 
- they require downstream use, including re-distribution, to include, at minimum, those same behavioral-use restrictions

Collectively, we refer to these as the “Use Restrictions”.

RAIL对用户限制类型进行细分

In order to easily distinguish licensing types using acronyms (/ˈækrənɪmz/首字母缩略词), we use the following representative **naming conventions** 命名规则:
- `RAIL-D`:  RAIL License includes Use Restrictions only applied to the **data**
- `RAIL-A`:  RAIL License includes Use Restrictions only applied to the **application/executable**
- `RAIL-M`:  RAIL License includes Use Restrictions only applied to the **model**
- `RAIL-S`:  RAIL License includes Use Restrictions only applied to the **source code**

licensing of AI artifacts in a RAIL license may be combined in various ways and should be listed in `D-A-M-S` order. 
- For example, a RAIL License applying Use Restrictions to data, source code, models and applications/services would be referred to as a “RAIL-DAMS” license. 
- Alternatively, a RAIL license applying Use Restrictions to the model and the source code would be referred to as a “RAIL-MS” license.

应用
- BLOOM大语言模型使用RAIL协议，但是并未限制使用
- The RAIL License for BLOOM defines derivatives of the BLOOM models and checkpoints, and it includes aspects related to distillation and fine tuning (see more [here](https://bigscience.huggingface.co/blog/the-bigscience-rail-license) and [here](https://huggingface.co/spaces/bigscience/license) ). 
- However, the BLOOM License does not **apply** use-based restrictions to the underlying source code, which was previously obtained under standard open source terms.

##### OpenRAIL

RAIL更名OpenRAIL，以区分不同类型的RAIL协议

The OpenRAIL [approach](https://www.licenses.ai/blog/2022/8/18/naming-convention-of-responsible-ai-licenses) taken by the [RAIL Initiative](https://www.licenses.ai/) and supported by Hugging Face is informed and inspired by initiatives such as `BigScience`, `Open Source`, and` Creative Commons`. The 2 main features of an OpenRAIL license are:
*   **Open**: these licenses allow **royalty free** (免版税) access and flexible downstream use and re-distribution of the licensed material, and distribution of any derivatives of it.
*   **Responsible**: `OpenRAIL` licenses embed a specific set of restrictions for the use of the licensed AI artifact in identified critical scenarios. Use-based restrictions are informed by an evidence-based approach to ML development and use limitations which forces to draw a line between promoting wide access and use of ML against potential social costs stemming from harmful uses of the openly licensed AI artifact. Therefore, while benefiting from an open access to the ML model, the user will not be able to use the model for the specified restricted scenarios.

Does a RAIL License include open-access/free-use 公开访问/自由使用 terms, **akin**（/əˈkɪn/，相似,类似） to what is used with open source software? 

If it does, it would be helpful for the community to know **upfront** (/ˌʌpˈfrʌnt/,在前面) that the license promotes free use and re-distribution of the applicable artifact, **albeit** (/ˌɔːlˈbiːɪt/尽管,虽然) subject to Use Restrictions. 

We suggest the use of the prefix "Open" to each RAIL license to clarify, a RAIL License include open-access/free-use terms, akin to what is used with open source software

| License | Licensor permits modification and redistribution | Licensor requires source code be disclosed when re-used | Licensee must include copyright notice | Licensor includes Use Restrictions |
| --- | --- | --- | --- | --- |
| GNU Affero General Public License v3.0 | Yes | Yes | Yes | No (OSI) |
| Apache 2.0 | Yes | No | Yes | No (OSI) |
| Creative Commons Attribution Share Alike 4.0 | Yes | No | Yes | No (CC) |
| Creative Commons Zero 1.0 Universal | Yes | No | No | No (CC) |
| MIT License | Yes | No | Yes | No (OSI) |
| RAIL Licenses | May or May Not | May or May Not | Yes | Yes |
| OpenRAIL-D | Yes | N/A | N/A | Yes |
| OpenRAIL-A | Yes | No | N/A | Yes |
| OpenRAIL-M | Yes | No | Yes | Yes |
| OpenRAIL-S | Yes | No | Yes | Yes |

In the table above, the  licenses require downstream users to comply with the terms identified with a “yes” - “OSI” refers to Open Source Initiative, whose definition of “open source” is our reference point in this table.

In summary,  a license which includes behavioral-use restrictions on the artifact being licensed may be termed a RAIL license if Use Restrictions (as defined herein) apply both to the artifact and any derivative works. 

Further, we can utilize a simple **naming convention** 命名规则  for open versions of `RAIL` Licenses – in DAMS order – to specify the artifact(s) being impacted by Use Restrictions: 
- `D`: for data being licensed
  - `Data`: The dataset(s) used to pretrain or train an AI Model.
- `A`: for apps/binaries/services/executables or any non-source code form of the artifact
  - `Application/service`: Any executable software code or application, including API-based remote access to software.
- `M`: for models/parameters
  - `Model`: Machine-learning based assemblies (including checkpoints), consisting of learnt weights and parameters (including optimizer states), corresponding to the model architecture.
- `S`: for source code, including libraries and toolkits
  - `Source`: The source code and scripts associated with the AI system.

Lastly, the naming convention proposed requires that RAIL Licenses which offer artifacts at no charge and allows licensees to re-license such artifacts or any subsequent derivative works as they choose to include the prefix “Open”. 
- ![](https://images.squarespace-cdn.com/content/v1/5c2a6d5c45776e85d1482a7e/381a69a4-28d9-4b6a-be5c-516330e7d8b9/diagram.png?format=2500w)

### 开源社区

#### HuggingFace（抱抱脸）

详见：[huggingface](/huggingface)

国外严格复刻`GPT-3`方案并开放模型的主要来自 [eleuther.ai](https://www.eleuther.ai/)，其于huggingface平台提供的finetune和推理接口，目前提供的版本如下：
- ![](https://pic3.zhimg.com/80/v2-cc9a9cd551730b1144af5ec4eb8aecfa_1440w.webp)

#### 魔塔

2022年云栖大会上，阿里达摩院推出了AI大模型开源社区“`魔搭`” [Model Scope](https://modelscope.cn/models/damo/nlp_gpt3_text-generation_13B/summary)，推出伊始，达摩院就向社区贡献了300余个AI模型，全面开源开放。

国内严格复刻 GPT-3 方案并开放模型的主要是`阿里达摩院`，其于modelscope平台提供的finetune和推理接口，目前提供的版本如下：
- ![](https://pic3.zhimg.com/80/v2-3e6b687dbeea0bfaca523a0b9d228532_1440w.webp)

#### 飞智

【2023-3-1】[要做中国OpenAI的很多，但智源要打造大模型领域的Linux](https://zhuanlan.zhihu.com/p/610426760)
- 智源研究院(院长黄铁军)联合30多家产学研单位，开发了`FlagOpen`（`飞智`）国内首个大模型技术开源体系。

FlagOpen是否意味着又一个魔搭的诞生？智源研究院副院长兼总工程师林咏华解释了二者的不同。

林咏华:
- “魔搭有点像抱抱脸（HuggingFace）”
- “FlagOpen和魔搭不一样的是, 主要目标不是构建一个聚集很多人的繁华社区，而是推动**大模型技术**的发展。”

基于这个目标， `FlagOpen` 配套了六个模块，分别是 `FlagAI`、`FlagPerf`、`FlagEval`、`FlagData`、`FlagStudio`和`FlagBoot`。
- ![](https://pic4.zhimg.com/80/v2-ce752675ed5cc2c4c750a22e2695c6db_1440w.webp)
- FlagAI
  - FlageAI集成了很多主流大模型算法技术，以及多种大模型并行处理和训练加速技术，并支持微调。目前涵盖的模型包括NLP、CV与多模态等领域，如语言大模型OPT、T5，视觉大模型ViT、Swin Transformer，多模态大模型CLIP等。目前，FlagAI已经加入Linux基金会。
  - “悟道2.0”通用语言大模型GLM，“悟道3.0”视觉与训练大模型EVA，视觉通用多任务模型Painter，文生图大模型AltDiffusion（多语言），文图表征预训练大模型（多语言）等智源研究院“悟道”大模型项目多个成果也开源在FlagAI。
- FlagPerf
  - AI软硬件评测面临异构程度高、兼容性差、应用场景复杂多变的挑战。FlagPerf搭建的AI硬件评测体系，支持多种深度学习框架，及时跟进最新主流模型评测需求，便于AI芯片厂商插入底层支撑工具，且不以排名为核心目标
  - 截至FlagOpen体系发布，FlagPerf已和天数智芯、百度PaddlePaddle、昆仑芯科技、中国移动等进行合作。
- FlagEval
  - FlagEval是覆盖多个模态领域、包含评测维度的评测工具，首先开放的是近期很火的多模态领域-CLIP系列模型评测工具，支持多语言多任务、开箱即用。
- FlagData
  - FlagData数据工具开源项目集成包含清洗、标注、压缩、统计分析等功能在内的多个数据处理工具与算法。此前，智源研究院已经构建了WuDaoCorpora语料库。
- FlagStudio
  - FlagStudio是文生图、文生音乐等艺术创作相关的开源项目集合，集合的算法和模型更贴合中文场景，当前主要提供智源研究院文生图相关能力的应用。
- FlagBoot
  - FlagBoot是基于Scala开发的轻量级高并发微服务框架，默认完全异步，且没有宏、隐式转换等晦涩难懂的代码。极少的代码量便于开发者轻易了解背后逻辑，而后进行自定义修改。

“大数据+大算力+强算法=大模型”是当前AI发展的主流，用 FlagOpen，开发者尤其是初创公司，可以尝试大模型的开发和研究工作，换句话说，AI的研发、应用门槛被降低了。

以大模型为主导的方向提供基础开源体系，某种意义上，智源研究院在追赶ChatGPT产品的热点上退了一步。这或许是其非营利性机构的性质使然。

而ChatGPT背后的OpenAI，也是打着非营利性机构的旗号出道的（2019年3月1日，OpenAI LP子公司成立，旨在营利）。同样的机构性质，同样押注AI，并关注大模型赛道，智源研究院有打算，或者可能成为中国的OpenAI吗？

## 阿里

【2023-4-1】[阿里AI专家交流纪要20230401](https://bytedance.feishu.cn/docx/KiwcdYpuNoWHzJxKVeDco1HgnHc)

### 达摩院大模型

阿里巴巴达摩院牵头做大模型，22年发布大模型：`m6`和`plug`。
- `M6`：支持多模态，比如说文字生成图片，文字生成语音，文字生成视频这种模型，规模不如GPT3.5，所以叫**中模型**。

达摩院整个团队约有100个人做相关大模型的迭代和升级，一方面是复现GPT，一方面把m6和plug迭代到能够对标到GPT的水平。
- m6能力还不能对标到GPT3.5，还有一年半的差距。
- 2023年下半年云栖大会，应该会有m6新发布，大概在GPT2.5左右。

### 资源消耗

#### 数据

语料积累不足
- 现有大型语言模型在文本清洗和筛选方面存在一些限制，因此需要对现有模型进行升级和迭代，以适应不同领域的数据需求。
- 例如，要将模型应用于军事、旅游文化、政治等领域，需要更多数据收集和人工标注，以达到更高的准确性和效率。
- 同时，大型语言模型的成熟也将带来更多的商业机会，例如，天猫淘宝、高德地图等应用中的搜索和客服机器人等领域。
- 此外，如果大型语言模型足够成熟，可能会释放出API，由合作伙伴接入，从而实现生态层面的垄断。

#### 算力

算力
- 国内AI算力中，阿里储备最多，其次是 字节、百度、腾讯。
- 阿里云至少有上万片的A100，整体至少能够达到**10万**片，集团是阿里云5倍。达摩院、天猫、淘宝的算力资源都是集团内资源使用。
- 阿里云这块今年增速会有30-50%。有个别8-9个客户会有复现GPT的需求，提出了大规模AI算力需求，以云的方式给。
- 百度年初紧急下单3000台 8卡的A800服务器，2.4万张卡，预计全年百度会有A-H800共**5万**张的需求。
- 阿里云需求不会这么多，去年采购2万多，今年可能采购量会下降。预计云上就1万张左右，其中6000张是H800。此外阿里云也会用到平头哥这种自研的，每年大概3000张去采购。

阿里云也会选择国产芯片的一家，看是否在云上商业化。
- `寒武纪`MLU370，主要是性能基本过关(A100的60-70%)，检测合格，态度积极，愿意对接，服务贴身。今年会采购大概2000张的水平，主要用在一些CV等小模型的训练或推理上。寒武纪MLU 370没有供货的风险，后续的MLU590也许就会有了
- `壁仞`宣传上不错，但拿不到实测的卡，流片大约都是今年4-6月，量产半年后。而且壁仞4月要流片的卡，不能支持FP64，互通带宽不支持8卡，支持最多4卡，采用NV bridge方式，达到180GB水平。 8卡用PCIe方式只能做到32GB，弱点显著。
- `海光`，参数也足够支撑训练，但可能由于海光因产能等因素，可能更侧重满足国有算力那边的需求。同时，集团层面是否对接，不清楚。
- 海光的CUDA兼容性更好，除了海光，其实阿里云产的 PPU 其实也在一定程度上能够做到CUDA兼容，与NV做绑定。

目前降低算力成本的方式？
- 除了大模型，即使stable diffusion这种文生图模型，也消耗较小。stable diffusion模型一直在优化，以前一个推理任务一张A100、现在降级到一个推理任务一张V100。对于阿里这种巨头而言，V100的存货还是很多的。
- 针对模型的优化，或者加速软件，加快模型训练与推理。
- 对模型进行降级，降低精准度要求，比如从FP16降级为FP8。

### 各家实力

看好哪家？
- 第一还是百度文心，先发优势，其次，字节，因为有数据、有算力、有场景

#### 360

360大模型
- 360向NV下了上千块A800的货。
- 360语料可能比阿里强，但最后能做出什么效果，需要时间验证。

#### 腾讯

腾讯大模型进展？
- 混元继续迭代，大概100人左右做GPT复现以及自我模型迭代。猜测大概8月份会出。但应该只是支持文生文的场景。

#### 百度

百度虽然不是那么智能，但还是相当不错的。国内算是第一名。
- 文心一言有一定实用性，但离达到GPT-3水平还有一定差距。不过，至少可以达到GPT-2.5水平,如果未来能够持续优化，会达到GPT-3.5的水平。
- 数据积累对于百度来说是一个优势，尤其是在搜索领域。百度在知识库方面有很多年的积累，包括百度知道等。
- 达摩院模型架构基于Transformer，而文心一言则基于Bert。

#### 华为

华为盘古与昇腾如何看？
- 盘古大模型效果有待考证，并没有明确对标GPT，而是往B端去做。
- 因为受限制，只能用自己的昇腾，虽然昇腾910大概也有A100的70%水平（比寒武纪好），但算力的限制可能会制约大模型发展。

### 阿里怎么做

阿里采取怎样的打法？
- 大概率是稳扎稳打，集团拆分后都要自负盈亏，压力挺大。
- ChatGPT的一个推理任务，大概所需要消耗的5张A100在2秒钟之内做一次推理，大规模应用起来成本很高，冲击也很大。

主要有两种
- 推出的效果好的模型，与集团内部的产品结合，例如天猫、淘宝和高德地图的搜索业务。这将为搜索引擎带来更新的商业模式，并取代以前的商业模式。
- 输出自己的API，并向合作伙伴或渠道商收费。这些客户是从ToC端产生的。大多数客户都有自己的APP和网站，这些客户可以通过他们的APP和网站获取流量。不同的客户可以使用不同的API，这意味着厂商可以在生态系统中形成垄断。

目前，已有一些厂商尝试将API集成到产品中，但进展不如预期快。对于我们的API，可能会在特定领域上有所帮助，例如电商、搜索和推荐，并带来更好的商业模式。


### 人员变动

【2023-3-22】[资讯](https://zhuanlan.zhihu.com/p/616156754)，原达摩院大模型 M6 带头人`杨红霞`已加入字节 AI lab，参与语言生成大模型的研发，杨红霞在团队中处于领导地位，直接向字节跳动副总裁`杨震原`汇报。
- 去年9月初，杨红霞从阿里达摩院离职，离开是出于个人家庭原因，而非行业问题，达摩院大模型 M6 团队的后续工作不受影响。


1、原阿里 M6 带头人`杨红霞` 2007 年本科毕业于南开大学，获统计学学士学位。之后她去往美国杜克大学统计科学系攻读博士学位，师从 David Dunson 教授。博士毕业后，杨红霞先入职 IBM 全球研发中心任 Watson 研究员，后又加入雅虎公司，担任首席数据科学家。
- 2016 年，杨红霞结束了在美近 10 年的留学及工作生涯，回国后加入阿里巴巴达摩院智能计算实验室，大模型 M6 是杨红霞在达摩院任职期间最突出的成就。
- ![](https://pic4.zhimg.com/v2-ebf29129a6352a76b60f520c446bbd43_b.jpg)
- 2021 年 3 月，阿里达摩院首次发布 M6，英文全称是 MultiModality-to-MultiModality Multitask Mega-transformer，6个 M，简称 `M6`，是国内首个千亿参数多模态大模型。
- 同年6月，杨红霞团队又发布万亿参数的 M6，仅使用 480 块GPU，就能实现万亿参数体量的智能运算。相比原来的百亿参数模型，功耗降低 8 成，效率提升 11 倍。
- 仅过4个月后，M6 又在当年 10 月再次突破极限，杨红霞团队使用 512块 GPU，在 10 天内训练出 10 万亿模型。与大模型 GPT-3 具有同等参数规模，但能耗仅为其 1%。
- 大模型 M6 拥有多模态、多任务能力，其目标是打造全球领先的具有通用性的人工智能大模型，尤其擅长设计、写作、问答，在电商、制造业、文学艺术、科学研究等领域有广泛应用，通过将不同模态的信息经过统一加工处理，沉淀成知识表征，为各个行业场景提供语言理解、图像处理、知识表征等智能服务。相较于其他 AI 模型，大模型 M6 更低碳高效，提升了超大规模预训练模型的资源利用率与训练效率，沉淀大模型高效训练的能力。
- 杨红霞曾在接受媒体采访时表示：“**多模态预训练**是下一代人工智能的基础，M6 模型实现了训练效率和生成精度等多项突破，是当前众多中文多模态下游任务最优模型。”
- 在达摩院期间，杨红霞带领阿里巴巴达摩院 M6 团队致力于认知智能方向，研发了 AliGraph、M6、洛犀等较为有影响力的人工智能开源平台和系统，发表顶级会议、期刊文章超过 100 篇，美国和中国专利超过 30 项。她曾带领团队获 2019 世界人工智能大会最高奖卓越人工智能引领者（Super AI Leader，简称 SAIL 奖），2020 年国家科学技术进步奖二等奖和 2020 年杭州市创新领军团队。
- 2022年6月，杨红霞入选 2022 福布斯中国科技女性50榜。去年9月初，由于个人家庭原因，杨红霞从阿里巴巴达摩院智能计算实验室离职。

2、字节加入语言生成大模型之战此前 ChatGPT 带动的热潮中，百度率先发布“文心一言”，正式打响了国内科技大厂的较量。相较于此前在大模型上有布局的企业，例如百度“`文心`”、阿里“`通义`”、华为“`盘古`”等，字节在这场大模型之战中显得略为低调。
- 此前有媒体报道称，字节跳动在大模型上已有布局，主要在语言和图像两种模态上发力。其中，语言大模型团队组建于今年，团队规模在十数人左右，主要探索方向为同搜索、广告等业务线的结合。
- 相比起其他大厂的大张旗鼓，字节目前研究大模型的人并不算多。此前在`马维英`担任字节跳动副总裁兼人工智能实验室主任期间, 曾主推人工智能赋能内容创作和视频内容理解，但当时内部 AI 和推荐引擎是分开的；字节之前离开的另一位领军人物`王崇`则专长于机器学习，此前是字节推荐引擎负责人。
- 国内字节等大厂做 ChatGPT 的模型，目前学习架构大部分采用**大模型教小模型**的方式，小模型学习到大模型能力的百分之几，能解决大部分问题后再慢慢升级。

ChatGPT 不是终点，在这场关于通用人工智能的的角逐中，**数据**和**场景**成为了竞争的关键，从这个角度上看，字节有丰富的多模态数据，又有娱乐、学习、电商等丰富的应用场景。此前王小川曾对 AI 科技评论表示，字节在这场争夺战应占有一席之地，“如果能够出现一个产品可以理解视频，基本就立于不败之地了。”杨红霞常年深耕在产业化大规模落地的人工智能相关技术，她的加入将弥补字节在语言生成大模型领军人才的空缺，而她此前展示出的在提升效率、降低能耗等方面的杰出工程能力，也将对字节语言生成大模型的研究创新、场景应用落地等方面带来重要影响。


## OpenAI

OpenAI 是美国的AI实验室，非营利组织，定位是促进和发展友好的人工智能，使人类整体受益。

OpenAI成立于2015年底，创始人是 Elon Musk(伊隆·马斯克)以及前YC 总裁 Sam Altman(山姆·奥特曼)。并宣布将会以“推动AI技术造福人类”为己任，通过向社会无偿分享自己的AI技术，来规避由于科技巨头垄断AI技术而导致的潜在威胁因素。
- ![img](https://pic2.zhimg.com/80/v2-980e5fcfbb1fb5fd1d93ad1881b70289_1440w.webp)
- Elon Musk：预防人工智能的灾难性影响，推动人工智能发挥积极作用。

【2021-2-6】[GPT发家史](https://mp.weixin.qq.com/s/Y8yHaf7dm5jEQAvP9IvRRA)
- OpenAI 成立之初并非因为文本生成模型而知名，这点和 DeepMind 些许不同，后者专注强化学习一百年。 OpenAI 一开始两条线是**强化学习**和**生成模型**（集中 GAN），而 GPT 开始也没受到太大关注，而是在探索中 OpenAI 发现了其可能性，便开始大力投入，到现在基本上一大半项目都与其相关。所以，现今大家提起 OpenAI 相信都是马上想起 GPT，再或者和马一龙（Elon Musk）早期有一腿，又多少人还能想起强化学习和GAN呢。
- OpenAI 早期成员，除 Pieter Abbeel 等做强化学习的，就是一众做偏图像生成的，比如
  - GAN 提出者 Ian Goodfellow 最早也是入职 OpenAI
  - 同期入职的还有一个叫 Alec Radford 发明 DCGAN 的精神小伙。大家记住这个名字，因为他对 GPT 的发展应该说至关重要。
- 所以可以看出最早 OpenAI 就是群做强化学习和图像生成的人，没啥做 NLP 的，自然也难料想自己居然是通过 NLP 来一战成名。

### OpenAI 使命

OpenAI的使命： [OpenAI章程](https://openai.com/charter/)
- <span style='color:green'>OpenAI conducts fundamental, long-term research toward the creation of safe AGI</span>.
- 从事创建AGI（通用人工智能）的基础、长期研究

ChatGPT是否开源？
- 尚未开源，目前是以API（应用程序编程接口）调用的方式服务，目前也暂无开源计划。

<span style='color:blue'>Open AI不Open</span>，是业界很多人诟病的地方。开源是多年来软件和互联网产业之所以蓬勃发展的核心动力之一。开源方式可以调动全球开发者的积极性，每个人都可以下载源代码使用，并进行优化和在社区分享。这种用全社会的力量来创新的机制，大幅加速了技术科研攻关、产业应用的进程。

关于ChatGPT为何不开源
- 业界也有一些专家表示认可，因为人工智能技术至今为止还是一个黑盒，关于其内部的机制尚未可知，如果代码开源，很难避免该技术用于一些不利于社会和人类的方面。
- 此外，自从<span style='color:blue'>Open AI放弃了非盈利组织的定位</span>，接受微软等投资后，从商业化的角度考虑，也会采取整体模型**闭源**，开放应用接口的方式来推广，同时也会开源少部分模型，丰富开发者生态。

![img](https://pic4.zhimg.com/80/v2-0ae03854d9c5273fc544180c67e0d1b3_1440w.webp)

### OpenAI 成就

OpenAI 在生成式大模型贡献很大，没有 OpenAI 就不会有现在的 generative AI（生成式AI）。它通过 DALL·E 、GPT-3等，把技术通过一套很好的工程的体系去实施出来交付出来。OpenAI 和其他公司、学术组织最大区别是非常注重engineering，包括 ChatGPT这件事情


### 团队成员

【2023-2-23】[揭秘ChatGPT背后的AI“梦之队”](https://www.huxiu.com/article/801616.html)

OpenAI 官网显示，为 ChatGPT 项目做出贡献的人员共 87 人 (总人数 350人)。现就该团队成员职务构成、年龄分布、教育背景、人员流动、华人成员、成员贡献、性别分布等数据进行统计分析，并总结归纳其特征。
- 职位分工：近 **9成**为技术人员，高度聚焦技术研发
  - 研发人员共 77 人，占比 88%，其中含 1 名公司联合创 始人，即 Wojciech Zaremba； 产品人员共 4 人，占 5%。另外，6 人职位信息无法获取。
  - 团队未配备技术与产品之外的职能人员（如公共关系、市场营销等人员），而是高度聚焦于技术研发。
- 年龄分布：“90 后”科研“后浪”显示强大创新能力
  - 20~29 岁的成员有 28 人，占全体成员（剔除年龄信 息缺失的 5 位成员）的 34%；30~39 岁的共 50 人，占 61%；40~49 岁的仅 3 人，无 50~59 岁年龄段的成员，60 岁以上的有 1 人。经计算，该团队平均年龄为 32 岁。
- 教育背景：绝大多数拥有名校学历，6 人毕业于中国高校
  - 27 人具有本科学历，25 人为硕士研究生学历，28 人拥有博士研 究生学历（注：5 人信息缺失），占比分别为 33%、30%、37%。作为全球人工智能顶尖研发团队，其成员学历并非“清一色”研究生学历，而是本、硕、博人数相对均衡。
  - 毕业高校分布看，斯坦福大学校友最多，共 14 人；其次是加州大学伯克利分校，共 10 人；第三是麻省理工学院，共 7 人；我国清华大学与卡内基梅隆大学并列第 7 名，各有 3 人。
- 人员流动：10 人从谷歌跳槽加入，1 人曾在百度任职
  - 团队成员主要来自外部公司（81%）、高校应届毕业生（13%）、科研机构（4%）和高校教职人员（3%）等（如下图所示）。其中人数来源最多的外部企业是谷歌， 共 10 人跳槽加入
  - 从 ChatGPT 团队离职的人员，并非外界想象的加入所谓“大厂”，而是仍然选择具有创新潜力的创业公司或机构。
- 华人成员：在国内完成本科学业，后赴美深造并就业
  -  9 位华人（名单见下表）。其中 5 人本科就读于中国内地的高校，3 人大学教育经历均在美国高校完成，1 人（张马文，Marvin Zhang）信息不全。
- 成员贡献：1/4 成员参与过 codeX 研发，欧阳龙表现突出
  - 与 ChatGPT 相 关的先前关键技术项目有 RLHF③（Reinforcement Learning from Human Feedbac，人 类反馈强化学习）、GPT1④、GPT2⑤、 GPT3⑥、codex⑦、InstructGPT⑧、webGPT⑨等 7 项。
  - 华人欧阳 龙是 InstructGPT 论文的第一作者，是 RLHF 论文的第二作者，可见他是这两个关键技术项目的核心人员。
  - ![](https://img.huxiucdn.com/article/content/202302/22/132039612319.png?imageView2/2/w/1000/format/png/interlace/1/q/85)
- 性别特征：团队由男性主导，女性仅占 1 成
  - 9 位女性成员中，有 2 位是华人，即曾就读于北京大学的翁丽莲，以及 Steph Lin。

OpenAI 的组织方式能够有自下而上的创新（ChatGPT 就是一个自下而上的 idea），也能在确定目标后集中力量朝一个方向努力，和传统科研机构单兵作战的方式不同。此外，OpenAI 给员工也有足够的激励，工资+期权平均成本 120 万美金/人/年，相对于 Google、Microsoft 等大厂也十分优渥。

优秀人才的号召力、吸引人的组织氛围以及优渥的激励让 OpenAI 正在“掏空”整个硅谷的科学家和 Super Talents。


#### GPT-4 团队

【2023-3-18】[GPT-4背后的开发者：七大团队，三十余位华人](https://mp.weixin.qq.com/s/PIDqDLYoGO7xQPnaB7G6yA)

GPT-4 幕后的研发团队大致可分为七个部分：预训练（Pretraining）、长上下文（Long context）、视觉（Vision）、强化学习 & 对齐（RL & alignment）、评估 & 分析（Evaluation & analysis）、部署（Deployment），以及其他贡献者（Additional contributions）。[GPT-4 contributions](https://openai.com/contributions/gpt-4?continueFlag=ee0eebd278339fc5ba428add63b4b4fd), [gpt-4-system-card](https://cdn.openai.com/papers/gpt-4-system-card.pdf)

- 预训练部分的工作细分为：
  - 计算机集群扩展（Compute cluster scaling）
  - 数据（Data）
  - 分布式训练基础设施（Distributed training infrastructure）
  - 硬件正确性（Hardware correctness）
  - 优化 & 架构（Optimization & architecture）
  - Training run babysitting

- 长上下文部分的工作细分为：
  - 长上下文研究（Long context research）
  - 长上下文内核（Long context kernels）
- 视觉部分的工作细分为：
  - 架构研究（Architecture research）
  - 计算机集群扩展（Compute cluster scaling）
  - 分布式训练基础设施（Distributed training infrastructure）
  - 硬件正确性（Hardware correctness）
  - 数据（Data）
  - 对齐数据（Alignment Data）
  - Training run babysitting
  - 部署 & 后训练（Deployment & post-training）
- 强化学习 & 对齐部分的工作细分为：
  - 数据集贡献（Dataset contributions）
  - 数据基础设施（Data infrastructure）
  - ChatML 格式（ChatML format）
  - 模型安全（Model safety）
  - Refusals
  - 基础 RLHF 和 InstructGPT 工作（Foundational RLHF and InstructGPT work）
  - Flagship training runs
  - 代码功能（Code capability）
- 评估 & 分析部分的工作细分为：
  - OpenAI Evals 库
  - 模型等级评估基础设施（Model-graded evaluation infrastructure）
  - 加速预测（Acceleration forecasting）
  - ChatGPT 评估
  - 能力评估（Capability evaluations）
  - 编码评估（Coding evaluations）
  - 真实世界用例评估（Real-world use case evaluations）
  - 污染调查（Contamination investigations）
  - 指令遵循和 API 评估（Instruction following and API evals）
  - 新功能评估（Novel capability discovery）
  - ……


30多位华人信息，照片见原文

预训练组

- Trevor Cai
  - Trevor Cai 是 GPT-4 项目中吞吐量团队的负责人。Trevor Cai 本硕毕业于南加州大学，2022 年 3 月加入 OpenAI。在加入 OpenAI 之前，Trevor Cai 曾在 DeepMind 工作近 5 年，担任软件工程师。
- 袁启明
  - 袁启明（Qiming Yuan）是 GPT-4 项目数据集来源和处理团队的负责人。袁启明本科毕业于清华大学，硕士毕业于得克萨斯大学奥斯汀分校，2018 年加入 OpenAI。此前，袁启明曾在微软工作近三年。
- Che Chang
  - Che Chang 作为 OpenAI 的副总法律顾问参与了 GPT-4 的研发，他博士毕业于美国西北大学，2021 年加入 OpenAI，此前在 AWS 领导了人工智能 / 机器学习和市场业务的法律团队。最近一段时间，OpenAI 的法律团队还在招聘 AI 产品顾问。
- 欧阳龙
  - 欧阳龙 2019 年加入 OpenAI，担任研究科学家。Long Ouyang 本科毕业于哈佛大学，博士毕业于斯坦福大学，曾在斯坦福大学任博士后研究员。欧阳龙也参与研发了 ChatGPT 相关的技术项目，他还是 InstructGPT 论文的第一作者。
- 翁丽莲
  - 翁丽莲（Lilian Weng）是 OpenAI 人工智能应用研究的负责人，2018 年加入 OpenAI，在 GPT-4 项目中主要参与预训练、强化学习 & 对齐、模型安全等方面的工作。
- Tao Xu
  - Tao Xu 2019 年加入 OpenAI，先后毕业于北京大学、康奈尔大学。Tao Xu 曾在微软的必应机器学习研究组工作四年。
- Jie Tang
  - Jie Tang 在加州大学伯克利分校获得计算机科学博士学位，导师是 Pieter Abbeel。加入 OpenAI 前，他曾在初创公司和 Dropbox 工作约四年时间。Jie Tang 本科就读于哈佛大学，2008 年获得计算机科学和经济学学士学位。
- Ben Wang
  - Ben Wang 目前是宾夕法尼亚大学本科生，2021 年加入 OpenAI。Ben Wang 参与了 GPT-4 项目的预训练和长上下文方面的工作。

视觉组
- Mark Chen
  - Mark Chen 2018 年加入 OpenAI，任研究科学家，毕业于麻省理工学院（MIT）。他参与了 GPT-4 项目中视觉方面的工作。
- Casey Chu
  - Casey Chu2020 年加入 OpenAI，毕业于斯坦福大学计算数学专业。Casey Chu 的主要研究方向是多模态 AI 系统，他在 GPT-4 项目中主要参与视觉方面的工作。
- 胡绳丽
  - 胡绳丽（Shengli Hu）2022 年加入 OpenAI，她硕士毕业于复旦大学、博士毕业于康奈尔大学。她的研究兴趣在于社会科学、计算语言学、计算机视觉和语音的跨学科研究。胡绳丽曾在自然语言处理、计算机视觉、语音和应用统计方面的顶级会议和期刊上发表过多篇论文，包括 CVPR、ACL、EMNLP、ECCV 等等，并获得过最佳论文奖提名。
- Tianhao Zheng
  - Tianhao Zheng2022 年加入 OpenAI。他本科毕业于清华大学，博士毕业于得克萨斯大学奥斯汀分校。再加入 OpenAI 之前，他曾先后在英伟达、谷歌、Twitter 工作过。Tianhao Zheng 在 GPT-4 项目中主要参与了视觉方面的工作。
- 翁家翌
  - 翁家翌（Jiayi Weng）2020 年在清华大学计算机科学与技术系获得本科学位。本科在朱军教授组学习期间，主要参与了强化学习算法库 Tianshou（天授）的开发，该项目已获得 5.9K GitHub Star。CMU 硕士毕业后，翁家翌加入 OpenAI 任研究工程师。

强化学习 & 对齐组
- Chong Zhang
  - Chong Zhang 2010 年就读浙江大学计算机系，2014 年在加拿大西蒙弗雷泽大学获得学士学位，随后在谷歌、苹果公司担任工程师。2019 年就读加州大学洛杉矶分校，2021 年获得计算机硕士学位后，在 OpenAI 工作至今。
- Shengjia Zhao
  - Shengjia Zhao2016 年本科毕业于清华大学，2022 年在斯坦福大学获得计算机科学博士学位，师从 Stefano Ermon，随后加入 OpenAI。
- Stephanie Lin
  - Stephanie Lin 本科和硕士期间分别就读于麻省理工学院和佐治亚理工学院。加入 OpenAI 之前，她曾是牛津大学研究学者。
- Tong Mu
  - Tong Mu 本科就读于加州大学洛杉矶分校，后在斯坦福大学获得博士学位。2022 年加入 OpenAI。
- Jeff Wu
  - Jeff Wu 本硕均就读于麻省理工学院。他是初创公司 Terminal.com 的第二名员工，该公司被收购后，他曾在谷歌工作约 2 年的时间。2018 年，Jeff Wu 加入 OpenAI。
- 肖凯
  - 肖凯（Kai Xiao）在麻省理工学院获得了学士学位和博士学位，曾在微软、DeepMind 等机构实习。2022 年 9 月加入 OpenAI。
- Kevin Yu
  - Kevin Yu 在加州大学伯克利分校获得物理学学士学位及神经科学博士学位。2022 年加入 OpenAI。
- Haozhun Jin
  - Haozhun Jin2013 年本科毕业于清华大学计算机系，2015 年获得斯坦福大学硕士学位。2015 年到 2018 年，他在 Meta 担任软件工程师，2023 年 1 月加入 OpenAI。
- 顾世翔
  - 顾世翔是出生于日本的加拿大华人，曾是谷歌研究院研究科学家，研究领域包括深度学习、强化学习、概率机器学习和机器人技术。他拥有剑桥大学和马普所智能系统研究所的机器学习博士学位，在多伦多大学获得了工程科学学士学位，论文指导教授为 Geoffrey Hinton。

评估 & 分析团队
- Alvin Wang
  - Alvin Wang2022 年 8 月加入 OpenAI，为评估 & 分析团队核心贡献者之一。此前他曾在 VMware、Tesla 等公司工作过几年。2013 年本科毕业于南加州大学。
- Angela Jiang
  - Angela Jiang 于 2021 年 11 月加入 OpenAI，在微软和谷歌有过短暂的工作经历，她本科毕业于西北大学，于 CMU 获得博士学位。
- Jason Wei
  - Jason Wei 于今年 2 月加入 OpenAI，主要研究 ChatGPT。此前他是谷歌 Brain 的高级研究科学家，在那里推广了思维链提示，并共同领导了指令调优工作。他在谷歌和 Jeff Dean 等人共同撰写了关于大模型涌现能力的论文。
- Juntang Zhuang
  - Juntang Zhuang 于 2022 年 4 月加入 OpenAI，此前曾在谷歌实习四个月。他本科毕业于清华大学，硕士毕业于耶鲁大学，并在耶鲁大学拿到博士学位。他的研究主要是为生物医学应用开发新的机器学习技术。
- Derek Chen
  - Derek Chen 于 2021 年加入 OpenAI，是一名技术安全分析师。他毕业于美国东北大学，此前在谷歌工作过不到一年的时间。
- 宋飏
  - 宋飏（Yang Song）目前在 OpenAI 担任研究员，并将于 2024 年 1 月加入加州理工学院电子系（Electrical Engineering）和计算数学科学系（Computing and Mathematical Sciences）担任助理教授。宋飏本科毕业于清华大学数理基础科学班，2022 年获得斯坦福大学计算机科学博士学位，师从 Stefano Ermon。他的主要研究方向是机器学习，包含深度生成式模型（deep generative models），概率推理（probabilistic inference），人工智能安全性（AI safety），以及人工智能方法与其他科学领域的交叉（AI for science）。他是扩散模型（diffusion models）和分数匹配生成式模型（score-based generative models）的主要奠基人之一。他发表在 NeurIPS 2019 的工作首次在图片生成质量上实现了对生成对抗网络（GAN）的超越。博士期间他的一作论文获得了 ICLR 2021 杰出论文奖，相关研究获得了苹果奖学金、摩根大通奖学金，以及 WAIC 云帆奖。

模型部署
- Michael Wu
  - Michael Wu 2021 年加入 OpenAI，主要的工作是人工智能应用研究。Michael Wu 毕业于 MIT，是 GPT-4 项目的推理研究负责人。
- Andrew Peng
  - Andrew Peng 2022 年底加入 OpenAI，他曾经在微软工作两年。Andrew Peng 毕业于加州大学伯克利分校，主要参与 GPT-4 API 和 ChatML 部署方面的工作。
- 吴雪枫
  - 吴雪枫（Sherwin Wu）2022 年加入 OpenAI，主要的工作是人工智能应用及 API 开发。吴雪枫毕业于 MIT，在 GPT-4 项目中主要参与 API 开发和 ChatML 部署方面的工作。
- Jason Chen
  - Jason Chen 本科就读于麻省理工学院，2007 年到 2014 年期间在谷歌担任软件工程师，2014 年到 2019 年任职于初创公司 Apptimize，2019 年到 2023 年 2 月任职于 Argo AI，2023 年 2 月加入 OpenAI。

其他贡献者
- Xin Hu
  - Xin Hu 于 2022 年 6 月加入 OpenAI，主要负责开发用于云安全、k8s 安全、认证 / 授权和访问控制的安全服务和平台。

此外，在 GPT-4 的开发上 OpenAI 也对微软表示了感谢，特别是微软 Azure 服务为模型训练提供了基础架构设计和管理方面的支持，微软必应团队、安全团队也对 GPT-4 的部署等工作作出了贡献。


成立之初， OpenAI 只有10名成员，除了主要负责打理公司、招贤纳士的CTO `Greg Brockman`和上文所说的两位联合创始人外，其余7人都是AI技术领域的顶尖研究学者, 包括总揽研究事宜的原 Google Brain 研究科学家`Ilya Sutskever`。
- [“钢铁侠”刚退出的OpenAI组织，了解一下？](https://zhuanlan.zhihu.com/p/34149980)

2019年OpenAI 宣布了其公司新架构：
- OpenAI Nonprofit：日常工作没有变化，通过开发新的 AI 技术，而非商业产品来创造出最大的价值。
- OpenAI LP：被称为 “有限盈利”(capped-profit) 公司，提高筹集资金的能力，增加对计算和人才方面的投资，确保通用人工智能（AGI）有益于全人类。
- OpenAI 非营利部门负责管理 OpenAI LP，主持学者和研究人员等教育计划，并负责政策实施。

人事方面也有所调整：
- 离任Y Combinator总裁的Sam Altman，将担任OpenAI LP的CEO。
- Greg Brockman 将担任 CTO, Ilya Sutskever 担任首席科学家。Brockman 还将担任 OpenAINonprofit董事会主席。

OpenAI LP 当时拥有约 100 名员工，主要分为三个领域：**能力**（探索AI系统可以做什么），**安全**（确保这些AI系统符合人类的价值观）和**政策**（对此类系统进行适当的管理）。
- ![2018年11月](https://n.sinaimg.cn/tech/crawl/698/w550h148/20190312/F6P3-hufnxfm4394676.jpg)

#### 2020年人才流失

OpenAI 人才流失的因素不外乎十个字：理想很丰满，现实很骨感

憋在院校里闷头搞研究的学者之所以愿意来到 OpenAI，无外乎这里能够保证在不违背自己“从事非营利性科研项目”的前提下，挣到比学校高3~5倍的薪资。

然而事实上，OpenAI这10亿的预期资金其实并不稳定。而且据称，作为 OpenAI 的头号赞助商，马斯克还经常把学者拉去帮忙给特斯拉的自动驾驶研发出主意。
- “拿人家手短吃人家嘴软”，`特斯拉`不像`Google`那样本身就拥有一支技术实力雄厚的`Google Brain`研发团队，只要马斯克仍然身为OpenAI的主要投资者之一，这种“剪不断理还乱”的联系就不会彻底根除。

长此以往，`OpenAI`当然很难像`DeepMind`一样平心静气地潜心去钻研技术。而这导致的结果就是直到现在，OpenAI的关键性课题研究成果也十分有限，距离拥有比肩`DeepMind`的影响力也还很遥远。

2020年，GPT-3 未开源，并商用后，掀起一波离职潮。失去这些关键人员，OpenAI 未来在相关课题上或将略显颓势。
- 例子：`Chris Olah` 是 OpenAI 多模态神经元论文的作者之一。他是领域里小有名气的“怪胎”，曾经拒绝 `Yoshua Bengio` 的研究生邀请，而是去了 `Google Brain` 团队。他在谷歌带过博士生，论文的引用数量甚至超过拥有博士学位的研究者，自己却连本科都没毕业……
- ![img](https://cdn.pingwest.com/portal/2021/06/15/portal/2021/06/15/i52Sm55h7_Z767dH3iPCFtCacWiSdW_t?x-oss-process=style/article-body)
- Olah 参与的 OpenAI 多模态神经元论文：多年以前有研究者发现，大脑中的一些神经元可以对模态不同但概念相同的触发条件产生反应，比如当提到“哈莉·贝瑞”的名字、照片、简笔画像的时候，同一个神经元都可以产生反应。
- OpenAI 的多模态神经元研究，基于该机构今年发布的 CLIP 泛用性视觉系统。论文作者发现在 CLIP 的神经网络倒数第二层也存在这样的一颗“神经元” （Neuron 244）。这项研究预示着，“抽象”这一自然视觉领域的概念，很可能在计算机合成视觉领域同样存在。

#### Elon Musk

2018年2月底，马斯克却突然在上周宣布辞任OpenAI董事会职务，当然原因并不是“自己付不起钱了”，而是“为了避特斯拉的嫌”。
- 马斯克的离任并不会对组织的运营带来多少影响。毕竟马斯克自己也曾说过，只把3%~5%的精力放在了OpenAI上

马斯克名下已经拥有了6家公司：
- 2002年6月成立的SpaceX
- 2004年通过A轮融资成为其董事长的特斯拉
- 2006年7月成立的SolarCity
- 2015年12月成立的OpenAI
- 2016年7月成立的Neuralink
- 2016年12月成立的Boring。
- 而在这些企业中，至少可以直观地判断出：特斯拉的Autopilot自动驾驶系统中肯定会不可避免地利用到AI技术。
- ![img](https://pic2.zhimg.com/80/v2-a20855215810eb7728722e6b06fd5e99_1440w.webp)

随着2016年特斯拉与计算机视觉方案商`Mobileye`的彻底决裂，特斯拉开始使用自己研制的`Tesla Vision`技术来完成旗下汽车在自动驾驶过程中的视觉处理工作，而这其中运用的正是深度学习技术。

鉴于目前`Autopilot`的研发进程已经严重滞后，其对诸如高速公路自动变道、狭窄道路巡航系统、自动传唤系统等功能的研发优化也到了火烧眉毛的地步。

2017年6月，马斯克也终于动起了歪脑筋——直接从OpenAI挖人。被马斯克相中的人名叫`Andrej Karpathy`

#### Andrej Karpathy -- cv大牛

`Andrej Karpathy` （江湖人称 `AK-47`）
- 师从Google AI首席科学家的`李飞飞`，与`Ilya Sutskever`同样是OpenAI成立初期10人团队中的一员，且同样曾在`Google Brain`项目实习。
- 目前，在 Google Scholar 上，Karpathy 的论文引用数达到了 53360。其中，引用第二多、他作为一作的论文《Large-scale Video Classification with Convolutional Neural Networks》被收录为 CVPR 2014 Oral。

Andrej Karpathy履历
- 2005-2009 年，Andrej Karpathy 本科就读于加拿大多伦多大学，主修计算机科学与物理，辅修数学。在这里，他第一次接触到深度学习，聆听 Hinton 的课程。
- 2009 -2011 年，Karpathy 硕士就读于加拿大不列颠哥伦比亚大学，其导师为计算机科学系教授 Michiel van de Panne，主要研究物理模拟中用于敏捷机器人的机器学习。
- 2011-2016 年，Karpathy 博士就读于斯坦福大学，师从著名 AI 学者李飞飞，专注于研究卷积 / 循环神经网络以及它们在计算机视觉、自然语言处理和交叉领域的应用。期间，他设计并担任斯坦福首个深度学习课程《CS231n：卷积神经网络与视觉识别》的主要讲师。
- 与此同时，Karpathy 还有三段实习经历。
  - 2011 年，他进入发展初期的谷歌大脑实习，致力于视频领域的大规模无监督学习。
  - 2013 年，他再次在谷歌研究院实习，从事 YouTube 视频的大规模监督学习。主要负责对YouTube视频进行大规模特征提取可行性的研究。
  - 2015 年，他在 DeepMind 实习，参与深度强化学习团队的工作。
- 博士毕业后，Karpathy 加入了 OpenAI 担任研究科学家。作为创始成员之一，Karpathy 帮助公司做了很多早期的招募 / 结构化工作。同时，作为一名研究科学家，他致力于生成模型的深度学习（例如使用 PixelCNN++ 生成图像）和深度强化学习。
- 不过，在 OpenAI 没待多久，Karpathy 就被马斯克挖去了特斯拉，接替当时的特斯拉 Autopilot 负责人、苹果 Swift 语言、LLVM 编译器之父 Chris Lattner，担任特斯拉人工智能和自动驾驶视觉总监。
- 2017年6月, `Andrej Karpathy`摇身一变成为了特斯拉自动驾驶研究项目的领军者。
  - 特斯拉 人工智能与自动驾驶视觉总监 Andrej Karpathy
  - ![Andrej Karpathy](https://pic2.zhimg.com/80/v2-3f4c6d1af335ccba746ca2a4a52686a9_1440w.webp)
  - 从 2017 年到 2022 年，Karpathy 一直在特斯拉工作。五年里，他一手促成了 Autopilot 的开发。这项技术对于特斯拉的完全自动驾驶系统 FSD 至关重要，也是马斯克针对 Model S、Cybertruck 等车型推销的主要卖点。
  - 随着特斯拉从最开始的自动驾驶慢慢扩展到更广泛的人工智能领域，Karpathy 也被提为特斯拉的 AI 高级总监，直接向马斯克汇报工作。
- 2022 年 7 月，Karpathy 在推特上宣布自己将从特斯拉离职。
  - 「过去五年，我非常高兴帮助特斯拉逐步接近了它的目标，如今离开是一个艰难的决定。我见证了 AutoPilot 从测试到部署到城市街道，期望未来 AutoPilot 团队持续自己的强大。」
  - 对于未来，Karpathy 当时并没有具体的计划，「但希望重拾自己长久以来对 AI 技术工作、开源和教育等方面的热情。」
  - 事实上，他也确实是这么做的。在闲下来的几个月里，Karpathy 给大家贡献了很多学习材料，包括一个详解反向传播的课程 、一份重写的 minGPT 库、一份从零开始构建 GPT 模型的完整教程等。
- 2023年2月9日，官宣再次加入openai
  - 【2023-2-9】[加入最火OpenAI，特斯拉前AI总监Andrej Karpathy自宣回归](https://mp.weixin.qq.com/s/S5Q9BWD90-_UqLP81iFttA)
- OpenAI在网络中就被实锤了一个新的Tittle：特斯拉旗下人工智能研究机构。顶着“非营利性”的旗号，却成为了创始人马斯克的个人人才储备库

cv大牛，OpenAI 做多模态的有力加速器


#### Greg Brockman 大管家

Greg Brockman：OpenAI 内部的大管家和冲锋队长，⼯程能⼒和基础设施的打造者。

作为 OpenAI 的早期重要联创之一，Greg 是一位数一数二的工程天才，Greg 本人有 80% 的时间在写代码，我们了解到 OpenAI 内部的模型训练的 infra 架构基本都由 Greg 一个人完成，包括了 GPT-4 的 Infra。同时，Greg 也想一个冲锋队长，能在大家都不知如何下手时候带队冲锋。


#### Ilya Sutskever 灵魂人物

- OpenAI研究总监（首席科学家） Ilya Sutskever
- ![img](https://pic1.zhimg.com/80/v2-b0d887fc1be786486a86afcd8d390144_1440w.webp)

Ilya Sutskever 深度学习教父 Hinton 的学生， `AlexNet` 的作者，本身就是深度学习革命的开创者，拥有最强的远见力和最坚定的深度学习信仰

DL 启蒙者，帮助 OpenAI 及时⾛上 Transformer 路线。

Ilya 在 OpenAI 属于精神领袖的存在，他的技术直觉和品味很好，能够找到一些大家之前没有很重视的方向，比如 Scaling 能 work，三年前大家都不相信的时候特别坚持。

履历
- 1986年，出生于俄罗斯，加拿大籍。
- 本科就读于多伦多大学，遇到了 Geoffrey Hinton——深度学习研究的教授和先驱。Sutskever 在攻读博士学位时加入了 Hinton 的小组。
- 2012 年，在 Hinton 的指导下，Sutskever 和博士生同学 Alex Krizhevsky 开发了 AlexNet，它在 2012 年 ImageNet LSVRC-2012 的比赛中脱颖而出。AlexNet 以一种新颖的神经网络架构在 NIPS 亮相，包含五个卷积层和三个完全连接的层。`AlexNet` 标志了自 2012 年起人工智能革命的开端
- 2012 年毕业后，Sutskever 在斯坦福大学跟随吴恩达教授读了两个月的博士后课程。
- `Ilya Sutskever`师出深度学习三巨头之一的`Geoffrey Hinton`，曾与导师在2012年共同创办语音、图像识别方案研发企业`DNNresearch`，在这一公司被`Google`收购后才加入了`Google`的神经网络研究项目中。
- 2012年11月，回到了多伦多大学并加入了 Hinton 的新研究公司 DNNResearch，这是 Hinton 研究小组的副产品。
- 2013 年 3 月，Google 收购了 DNNResearch，并聘请 Sutskever 担任 `Google Brain` 的研究科学家。
- 2014 年，Sutskever 与谷歌研究员 Oriol Vinyals 和 Quoc Le 一起提出了 `Seq2seq` 学习（Sequence to Sequence Learning），机器翻译效果达到sota。
- 在谷歌大脑团队中，Sutskever 加入了 Google 开源库 `TensorFlow` 的开发，用于大规模机器学习。
  - `Ilya Sutskever`曾就职于Google，硅谷这种大公司关不住这些牛人,另起炉灶很正常, 普通人反而才是一直混Google养老
- 2015 年 7 月的一天，Sutskeve 参加了由 Y Combinator 总裁 Sam Altman 在 Sand Hill Road 的一家餐厅举办的晚宴，在那里他遇见了 Elon Musk 和 Greg Brockman。
- Sutskever 和 GregBrockman（现为 OpenAI 首席技术官）共同创立了 OpenAI，得到来自 Elon Musk，Sam Altman 和 LinkedIn 创始人 Reid Hoffman 的 10 亿美元资金，其目标是「以最有可能造福人类的方式推进数字智能并使之成为一个整体」。
- 2018 年，领导 OpenAI 发明 `GPT-1`。
- 2021 年，Sutskever led OpenAI's invention of `DALL-E` 1

[Ilya Sutskever: The brain behind ChatGPT](https://journeymatters.ai/ilya-the-brain-behind-chatgpt/)
- ![](https://journeymatters.ai/content/images/size/w1140/2023/01/1-25.jpg)

虽然OpenAI标榜自己是“非营利性组织”，但实质上其核心研究一直在围绕着自家的Gym平台环境进行，并没有跳脱出巨头“通过技术开源来拉拢人才”之嫌。

首席科学家`Ilya Sutskever`是OpenAI的灵魂人物。
- 2020年，GPT还没出来时，普遍认为让神经网络学会推理可能做不到，需要考虑 neural symbolic 的方法，即将`连接主义`和`符号主义`结合。后来，很快就放弃了这个思路，但仍然认为：神经网络无法真正解决ood （out of distribution）的问题。
- 而事实上，解决ood之前先把数据的 distribution 搞的足够大更重要，gpt便是如此，然后颠覆了认知，也更加坚定深度学习**纯连接主义**这条路。

没有Ilya就不可能有这些革命性的进展。为什么`Ilya`的认知最强？
- 因为早年 `Seq2Seq` 也是他搞出来的，所以当google把`transformer` 搞出来时，他的嗅觉最灵敏，知道这东西能解决`LSTM`存在的记忆问题，从而能够scale。而大部分人看到`transformer`并不会产生这种认知。
- 而ChatGPT基本原理和之前的OpenAI Dota Five，Alphastar 没有本质区别，都是先`监督学习`再`强化学习`，只是**变成语言通用**场景了。单单这个认知也是太强了！

#### Wojciech Zaremba 攻坚手

Wojciech Zaremba 联创，攻坚手，亲自放弃机器人探索后打造 Codex。

在 GPT-4 的研究中，Wojciech 创建了 GPT-4 的数据集并负责了强化学习和 Alignment 中的人类数据管理工作。很多人评价 GPT-4 之所以能和别的大语言模型拉开差距，模型很重要，数据更重要。

`Wojciech Zaremba`也是最初加入到OpenAI团队中的一员，他师从于另一位深度学习三巨头`Yann LeCun`，并曾先后在`Google`和`Facebook`工作。在回忆起最终决定加入OpenAI的理由时，他曾这样说道：
- 尽管我非常尊重Google和Facebook这样的大公司，然而这些公司近乎疯狂地**开高价留人**，让人很难不理解为: 这些企业是在从自身商业利益的角度考虑，在想着为自己公司的AI产品构建技术壁垒，所以我选择`OpenAI`。

成立后不久，`Greg Brockman`就为OpenAI设立了核心的技术研发方向：从`强化学习`（Reinforcement Learning）入手，最终实现`无监督学习`（Unsupervised Learning）。
- “强化学习”是机器学习领域的一个历史久远的技术分支，旨在让AI通过对未知环境的探索，来自行求得最优解。通过与深度学习相结合，这一技术能让AI快速掌握获取最优解的要领，我们所熟知的AlphaGo就是将“深度强化学习”运用到极致的佼佼者。
- 而“无监督学习”则更多的是指代一种在AI领域的通用概念，即：无需人工辅助对数据进行标记，即可自行理解数据含义并进行归纳总结的能力。从业内已公开的技术发展情况来看，目前研究还只能达到有效率地执行半监督学习（semi-supervised learning）阶段。
- 让OpenAI开始广为人知的Dota 2 Solo一战
- ![img](https://pic3.zhimg.com/80/v2-7846aca6ed46a854ef21f9d409d6fe5e_1440w.webp)

`Ilya Sutskever`曾明确表示过，OpenAI最核心的任务是<span style='color:blue'>发表有影响力的研究报告</span>，但其实OpenAI更多的是在构建**开源开发平台**。截至目前，OpenAI已经迭代推出了4款开源软件平台：
- 第一款名为`Gym`。用于研发和比较强化学习算法优劣的工具包，在2016年4月首次发布。开发者可以利用这一工具对自己开发的AI算法进行训练并展示，从而获得与其他平台开发者共同探讨和研究的机会；
- 第二款名为`Universe`。用于训练“解决通用问题的AI”的基础开发架构，在2016年12月首次发布。这一架构中包含了近千种AI训练环境，开发者可以利用这一工具将任何程序转换到Gym的环境下并进行训练。所以这款软件平台，也可以说是为Gym打开了一个万能的接口；
- 第三款名为`Roboschool`。用于模拟机器人控制训练的开源软件，在2017年5月首次发布。这一软件再度整合了Gym平台，可以视为是专门针对“机器人”这个应用领域单独开设的免费训练平台；
- 第四款名为`Blocksparse`。用于优化GPU神经网络运行效率的工具包，在2017年12月首次发布。这一软件主要是利用了数值分析中稀疏矩阵（Sparse matrix）的特性，通过减少不必要的运算量，来实现优化记忆神经网络的目的。


#### John Schulman RLHF开创者

John Schulman：RLHF 的开创者，打造了 OpenAI 的 RL 基础设施。

John 在 Reinforcement Learning 的积累成就了目前的 ChatGPT。John 在 GPT-4 的开发过程中是 RL 和 Alignment 的带队人。


#### Jan Leike 落地 instruct GPT

Jan Leike：落地 instruct GPT , 把 alighment 带到新高度。

Alignment 是 OpenAI  区别于 Google 等大厂的重要能力，Jan Leike 带领团队攻坚递归奖励模型、辩论、迭代放大三大研究，并主导落地了 Instruct GPT，在 GPT-4 的开发过程中也负责了 Alignment 部分。

#### Mira Murati -- 新晋 CTO

Mira Murati：OpenAI 新晋 CTO ，引领了 OpenAI 在 AI 安全上的探索。

Mira 的背景十分有趣，在加入 OpenAI 之前，Mira 在 Leap Motion 负责产品和工程（Leap Motion  是 MidJourney  CEO 的上一个创业项目），Mira 在职业生涯早期还曾在 Tesla 担任产品。我们认为 Mira 可能是人机交互领域最重要的 PM 之一。

#### Lilian Weng -- 前沿技术和应用研究

• Lilian Weng：前沿技术和应用研究的桥梁，也是 OpenAI 高管团队中唯一的中国人。

Lilian 是前沿技术和应用研究的桥梁，通过设计 API 拓宽了 GPT 的应用领域。在 GPT-4 项目中，她主导了应用领域的研究。在她的 Lil Log 中有很多研究的分享，是在 AI 从业者中很有影响力的博客。

#### Jakub Pachocki -- 预训练专家

• Jakub Pachocki：OpenAI 的预训练专家，Sam 在 GPT-4 发布后专门感谢的人。

他参与了 OpenAI 几乎大部分成功项目——深度参与了 Gym 和 Dota 的研究，负责了其中核心技术的攻坚，后带领推理和深度学习组。作为 GPT-4 预训练和整个项目的负责人（整个项目一共有两位 overall lead），Sam Altman 在 GPT-4 发布后发布一条 Twitter：“GPT-4 预训练方法的成就离不开 Jakub 的领导力和远见。”

#### Ian Goodfellow GAN之父

Ian Goodfellow Google Brain研究员, 对抗生成网络（Gan）之父Ian Goodfellow、来自加州大学伯克利分校的知名强化学习领域教授Pieter Abbeel及其桃李等
- ![img](https://pic1.zhimg.com/80/v2-60c4dfc149c58eadd2ab13f7cf9fe754_1440w.webp)


#### Dario Amodei

Dario是 OpenAI 的早期员工之一，曾发表多篇 AI 可解释性、安全等方面的论文，离职前在 OpenAI 担任研究 VP。在此之前，Dario 还曾在`百度`担任研究员，在前首席科学家`吴恩达`手下工作。他博士毕业于普林斯顿大学，后回到本科毕业的斯坦福大学担任博士后学者。

他是 OpenAI 的前核心成员，也被认为是深度学习领域最为前沿的研究员之一。
- ![img](https://cdn.pingwest.com/portal/2021/06/15/portal/2021/06/15/8NWG3b2Tr7TTi_1p5S2jnTraPETtK965?x-oss-process=style/article-body)

Dario 的胞妹 Daniela Amodei 之前也在 OpenAI 从事和 Dario 相同方向的工作，曾担任安全和政策 VP。Daniela 过往的任职经历包括 Stripe（其创始人是 OpenAI 投资人之一）、美国国会等。
- ![img](https://cdn.pingwest.com/portal/2021/06/15/portal/2021/06/15/HrnZnW2bxDEYsG227pi872E29JMdZe5s?x-oss-process=style/article-body)

#### Anthropic 公司

2020年12月，OpenAI 一批早期/核心员工集体离职，在领域内引起了不小的轰动。

这批员工认为随着模型变大、算力变强，通用人工智能离我们越来越近，在可预见的未来就有可能实现——而在这样的前提下，AI 可解释性和安全性变得无比重要。这批员工被认为是AI领域的“有效利他主义者”。简单来说，他们不仅认为应该投入重金进行 AI 基础研究让世界变得更好，并且也要注重实际功效。

他们的理念和 OpenAI 并没有本质上的冲突，但是 <span style='color:blue'>OpenAI 变得越来越不透明，且逐渐功利化</span>的趋势，令他们感到担忧。
- 一个最直接的例子，就是 OpenAI 尚未解决**偏见和安全**问题，就把 GPT-3 开发成了商用化API，提供给行业里的大公司使用。

这批核心员工集体离职。其中不少人，都参与到了 Anthropic 公司当中。
- 一家重拾 OpenAI 慢慢忘却的初心的“正统” AI 基础科研机构。
- Anthropic 的创始团队成员，大多为 OpenAI 的重要员工或关联成员，包括（排名不分先后）Jared Kaplan、Sam McCandlish、Tom Brown、Gabriel Goh、Kamal Ndousse、Jack Clark、Ben Mann、Chris Olah 等。

OpenAI 离职的核心员工当中就包括 `Dario Amodei` 和他的同胞姐妹 Daniela。
- 2021年2月创办了 Anthropic 公司，Dario 任 CEO，Daniela 任总裁。

Anthropic 的官网这样介绍自己：
>-  我们是一家AI 安全和研究公司，致力于开发可靠、可解释和可调整的 AI 系统。
>- “今天的大规模的通用（AI）系统能够带来很高的收益，但他们同时却是不可预测、不可靠，和不透明的。我们的使命是在这些问题上做出进步。”

Anthropic 联合创始人兼 CEO Dario Amodei 表示。
> “Anthropic 的使命是从事基础科研，让我们可以打造能力更强、更通用、更可靠的 AI 系统，并且应用这些系统从而让人类获益，”

伟大计划：
- 解决长久以来神经网络的“黑盒子”问题，为研究者们开发能够解释 AI 真正工作原理的工具。
- ![img](https://cdn.pingwest.com/portal/2021/06/15/portal/2021/06/15/3w2E26nXXbf38S62e4s7Y3s9T3NeYFyi?x-oss-process=style/article-body)
- AI 的黑盒子问题：黑盒子是一个算法，能够将数据转变成其它东西。问题在于，黑盒子在发现模式的同时，经常无法解释发现的方法。
- ![img](https://cdn.pingwest.com/portal/2021/06/15/portal/2021/06/15/SE_eX2yfidtk1PHX46Y823kEXwF3Xdh6?x-oss-process=style/article-body)

【2021-6-15】[OpenAI核心人员集体离职创立新公司：人均大神，融资1亿多美金只为“初心”](https://www.pingwest.com/a/244275)

### 创始人 Sam Altman

![img](https://biographyuniverse.com/wp-content/uploads/2023/02/Who-is-Sam-Altman-.png)

OpenAI首席执行官`山姆·奥特曼`谈推出 ChatGPT：
>- “我们需要社会对此有所感受，与之搏斗，看到它的好处，了解它的坏处。因此，我认为我们所做的最重要的事情是把这些东西拿出来，以便世界能够开始了解即将发生的事情。”

通用人工智能（AGI）是驱动他所有行动的推力，ChatGPT不会取代搜索，但有一天某个人工智能系统可以。
> “如果AGI真正完全实现，我可以想象它打破资本主义的所有这些方式。”

当 2018 年 GPT-2 的论文被驳回时，Sam 在团队周会上将拒信的内容朗读给所有员工，并告诉大家在通往成功的路上总会有阻碍，但是大家一定要有信念。

【2023-1-31】[Sam Altman的成功学](https://zhuanlan.zhihu.com/p/601852717)
- 在硅谷创业教父Paul Graham的眼里，[Sam Altman](https://blog.samaltman.com/)是一位极具魄力的领导者和开拓者。如今，已成为OpenAI CEO的[Sam Altman](https://blog.samaltman.com/)是全球范围内当之无愧的科技领军人物

职业生涯一路开挂。
- 从斯坦福大学计算机系辍学后，19岁的他成立了位置服务提供商Loopt，而后被预付借记卡业务公司Green Dot收购
- 2014年，YC创始人Paul Graham选择他成为继任者，在不到30岁时开始在全球创业创新领域大放异彩。
- 2015年，他与马斯克等人共同成立OpenAI
- 2019年，Sam Altman离任YC总裁，成为OpenAI的CEO，并相继领导推出重量级AI模型GPT-3、DaLL-E以及近期火出科技圈的ChatGPT。

无论是个人才智和财富，还是远见和野心，Sam Altman显然是标杆性的“成功人士”。
- [Sam Altman](https://blog.samaltman.com/): [how to be successful](https://blog.samaltman.com/how-to-be-successful)（如何取得成功），13条特质并不是一个人必然取得成功的充分或必要条件。[Sam Altman的成功学](https://zhuanlan.zhihu.com/p/601852717)
- 1、选择“复利增长” Compound yourself
- 2、要有绝对自信 Have almost too much self-belief
- 3、学会独立思考 Learn to think independently
- 4、做一个好“销售” Get good at “sales”
- 5、要有冒险精神 Make it easy to take risks
- 6、保持专注 Focus
- 7、努力工作 Work hard
- 8、大胆一点 Be bold
- 9、足够坚定 Be willful
- 10、保持强劲的市场竞争力 Be hard to compete with
- 11、建立人际网络 Build a network
- 12、资产决定财富 You get rich by owning things
- 13、要有内驱力 Be internally driven

[ChatGPT内幕故事：OpenAI 创始人 Sam Altman如何用微软的数十亿美元打造了全球最热门技术](https://hub.baai.ac.cn/view/23669)

[ChatGPT](https://OpenAI.com/blog/ChatGPT/)
- Stack Overflow 临时封杀 ChatGPT ,叫你抢饭碗！[详见](https://www.solidot.org/story?sid=73555)


### OpenAI 发展历程

OpenAI发展历程（主要来自维基百科）
1. 2015年底，OpenAI成立，组织目标是通过与其他机构和研究者的“自由合作”，向公众开放专利和研究成果。
1. 2016年，OpenAI宣称将制造“通用”机器人，希望能够预防人工智能的灾难性影响，推动人工智能发挥积极作用。
1. 2018年2月底，马斯克突然宣布辞任OpenAI董事会职务，当然原因是“为了避特斯拉的嫌”。
  - 2017年，Tesla挖墙脚：Andrej Karpathy 离开 OpenAI
  - 微软接手马斯克股票
1. 2019年3月1日成立OpenAI LP子公司，目标是盈利和商业化。
1. 2019年7月22日微软投资OpenAI 10亿美元，双方合作为Azure（微软的云服务）开发人工智能技术。
1. 2020年6月11日宣布了GPT-3语言模型，微软于2020年9月22日取得独家授权。
  - 开源文化破坏后，被人戏称“Closed AI”，当年，大批核心成员出走，部分人再次聚集新公司（Dario Amodei创立的Anthropic）
1. 2022年11月30日，OpenAI发布了名为ChatGPT的自然语言生成式模型，以对话方式进行交互。
1. 2023年1月：微软和OpenAI洽谈投资100亿美元事宜，并希望将OpenAI的人工智能技术纳入Word、Outlook、Powerpoint和其他应用程序中。

### OpenAI 接入体验

详见站内专题：[OpenAI接口信息](#openai)

## DeepMind

DeepMind是一家几乎没有新闻的公司，有一天突然宣布，在一场闭门比赛里，打败了三届欧洲围棋冠军。

AlphaGo大战李世石。第三天，比赛进入高潮，谷歌创始人布林飞到首尔

2012年，AlexNet 拿下 ImageNet 比赛冠军，这个网络由三个人开发，计算机老教授`辛顿`（Geoffrey Hinton），还有他的两个学生，`Alex Krizhevsky`和小萨。Alex和小萨，都出生在苏联。
- 师徒三人发现商机。他们成了一家公司 DNNResearch，没有收入，没有流水，没有业务，只有三个人。他们要卖掉这家什么都没有的公司，而且，为了利益最大化，方式是——拍卖。从第一份报价，百度的1200万美元开始。价格一步步上升，来到4400万美元。只剩下谷歌和微软。两家都势在必得，准备更高的报价。4400万美元三个人平分。但是Alex和小萨坚持老师拿40%。
- 谷歌用4400万美元，买来一位老教授和两位天才少年。

不久，用6.5亿美元，收购只有50人的DeepMind。
- 小萨去谷歌上班，被分到子公司DeepMind帮忙，搞一个下围棋的项目，为2016年的这场历史性的棋局，做出了基石性的贡献。
- 在谷歌总部，小萨来的时候，AI已经在语音识别、图像识别上做的不错，下一个需要攻克的是翻译。小萨创造性地把数学引入翻译，给每个句子一个向量，因此大大提高了谷歌翻译的准确性。

然后，马斯克来了。这家伙常年把自己扮演成AI话题的意见领袖，是“AI会毁灭人类”观点的旗手。这让处于研究最前沿的小萨，非常认可。
- 马斯克组了一个饭局，约志同道合的人一起聊聊。小萨推门进去，发现不仅有马斯克，还有美国支付宝Stripe的天才CTO 格雷格·布罗克曼（Grey Brockman），YC总裁阿尔特曼，从0到1的彼得·泰尔（Peter Thiel）、LinkedIn创始人里德·霍夫曼（Reid Hoffman），等等等等。硅谷的顶流大明星，和自己坐在一起。
- 马斯克又抛出一个很大的情怀，成立`OpenAI`，开源技术。阻止地球被毁灭，只能靠这个屋子里的人了，各位，拜托了！来，歃血为盟。

小萨，30岁上下，那必须热血沸腾啊。终于把持不住了。当小萨提离职时。谷歌动情挽留，大佬一个个来找小萨谈话，开出了一个又一个可怕的薪资。年薪涨到几百万美元，必须是`OpenAI`的两到三倍。但小萨还是走了。身处顶级工程师、天才科学家这个奇特的群体，他可能感知到了自己不喜欢的东西。


## Google

2017年，国防部长访问谷歌总部，布林带着高管接待。双方要谈马文项目（Project Maven）。国防部推马文项目的目的是，用大数据和机器学习改造战争。国防部给私营企业订单，是美国的传统，既有武器采购和项目外包，也有NASA付钱给SpaceX发射火箭。但是谷歌不一样，谷歌不是军事承包商，而是一家消费科技公司。马文项目，三年才赚不到3000万美元。

但是，布林为首的高管，就是想干，不是钱的问题，而是认为和军方合作对谷歌的AI战略至关重要。李飞飞，是AI界大佬，ImageNet最重要的创立者，当时也在谷歌。一封泄露出来的Email显示，出生在北京的李飞飞，和出生在莫斯科的布林一样，支持促成谷歌和军方的合作。

但是，大多数科学家、工程师有不一样的观点。

科技推动武器发展，有两次飞跃，每次都很可怕。
- 第一次，是一战中`马克沁机枪`的使用。大多数军队还是传统战法，排成一排，冲啊，冲啊，但是对面打开高效的杀人机器，机枪一扫，人一排排倒下，像割韭菜一样。一战的索姆河战役成了著名的“绞肉机”。
- 第二次，是二战中`原子弹`的发明。武器可怕的杀伤力已经彻底走出战场，人类只要点点按钮，一个城市几十万、几百万的人口瞬间灰飞烟灭。技术用于武器，人类第一次，有了毁灭我们这颗星球的能量。
- 用自动驾驶、人工智能改造武器，是武器的第三次革命。杀人机器人会把我们的文明会带往何方？

参与其中的科学家，往往愧疚大于骄傲。

谷歌内部，一份请愿书开始流转，要求布林不要和军方合作。500人……1000，最终签字了3100多人。DeepMind创始人坚定反对。辛顿老师，用个人身份请布林取消合同。

外部，就更炸了。一直宣扬AI会毁灭人类的马斯克当然要出来猛踩谷歌喽。1000多名学者老教授声援谷歌3100员工的公开信，要求谷歌承诺不开发军事技术，不将个人数据用于军事目的。李飞飞还收到了死亡危险。

最终谷歌迫于压力取消合同。但是很快大家注意到，谷歌的`行为准则页面`（Code of Conduct），开头的“`不作恶`”（don’t be evil）被删掉了。

不作恶，由佩奇和布林提出，一直是谷歌最有号召力的品牌形象。可是，在这前后发生了不少事，安卓创始人安迪·鲁宾（Andy Rubin）在公司性骚扰、潜规则下属，被佩奇包庇处理。布林又坚持和军方合作。

曾经，那些理想主义的科学天才，拒绝微软加钱，也要去谷歌。Facebook给两倍，我也要去谷歌。这样的时光，不会再来了。


### 开源AI终究胜利

【2023-5-6】[谷歌内部文件泄露：我们和OpenAI都没有护城河](https://www.huxiu.com/article/1439220.html)
- Google 内部泄露的文件在 SemiAnalysis 博客传播: **开源 AI** 会击败 Google 与 OpenAI，获得最终的胜利。
- 译文：我们没有护城河，OpenAI 也没有, [公众号](https://mp.weixin.qq.com/s/JiA-HJXeZSgHGH6zHblIVA)，[掘金](https://juejin.cn/post/7229593695653314597)
- 原文：[We Have No Moat, And Neither Does OpenAI](https://www.semianalysis.com/p/google-we-have-no-moat-and-neither)

大模型竞赛过程中，Google 一直显得谨小慎微，未能抢占先机。背后是 Google CEO 皮查伊倾向**渐进式**，而不是**大刀阔斧**的改进产品。部分高管也不听从他的调度，或许是因为，大权压根不在皮查伊手里。

如今，Google 联合创始人`拉里·佩奇`虽然已经不太插手 Google 内部事务，但他仍然是 Alphabet 的董事会成员，并通过特殊股票控制着公司，近几个月还参加了多场内部 AI 战略会议。

Google 面临的问题，每一个都困难重重：
1. CEO 行事低调， 联合创始人拉里·佩奇通过股权控制着公司；
2. “开发产品但不发布”的谨慎，让 Google 多次失去先机；
3. 更加视觉化、更具交互性的互联网，对 Google 搜索造成威胁；
4. 多款 AI 产品市场表现不佳。

内忧外患之中，Google 被笼罩在类似学术或政府机构的企业文化之下，充斥着官僚主义，高层又总是规避风险。

核心信息提炼
- Google 和 OpenAI 都不会获得竞争的胜利，胜利者会是开源 AI；
- 开源 AI 用极低成本的高速迭代，已经赶上了 ChatGPT 的实力；
- 数据质量远比数据数量重要；
- 与开源 AI 竞争的结果，必然是失败；
- 比起开源社区需要 Google，Google 更需要开源社区。

“重大问题”如今已经得到解决并投入使用。举几个例子：
- 手机上的 LLM：[人们可以在 Pixel 6 上以每秒 5 token 的速度运行基础模型](https://twitter.com/thiteanish/status/1635678053853536256)；
- 可扩展的个人 AI：[你可以一个晚上就在笔记本电脑上微调一个个性化 AI](https://github.com/tloen/alpaca-lora)；
- 负责任的发布：[这个问题不是“解决了”，而是“消除了”。互联网充满了没有限制的艺术模型，语言模型也要来了](https://civitai.com/)；
- 多模态：[当前的多模态 ScienceQA SOTA 在一小时内就能完成训练](https://arxiv.org/pdf/2303.16199.pdf)。

虽然大公司模型在质量方面仍然有优势，但差距正在以惊人的速度缩小。开源模型更快、更可定制、更私密，而且性能更强。他们用 100 美元和 130 亿参数做到了我们使用 1000 万美元和 5400 亿参数下也很难完成的事情。而且他们用的时间只有几周，而不是几个月。

这意味着：
- 大公司没有秘密武器。最好的方法是向 Google 外的其他人学习并与他们合作，应该优先考虑启用第三方集成。
- 当有免费、无限制的替代品时，人们不会为受限制的模型付费，我们应该考虑我们真正的价值在哪里。
- ![](https://img.huxiucdn.com/article/content/202305/05/171113428325.jpg?imageView2/2/w/1000/format/jpg/interlace/1/q/85)

LLaMA
- 2023年3月初，开源社区第一次获得了一款真正强大的基础模型，来自 Meta 的 LLaMA。它没有指令或对话调整，也没有强化学习人类反馈（RLHF），但社区依然立即意识到 LLaMA 的重要性。
- 随后，一个巨大的创新浪潮随之而来，每个重大发展之间只有几天的时间。一个月之后，已经有**指令调整**（instruction tuning）、**量化**（quantization）、**质量改进**（quality improvements）、**人类评估**（human evals）、**多模态**、RLHF等功能的变体，其中许多变体是相互依赖的。

最重要的是，他们已经解决了规模问题，让任何人都可以参与其中，许多新的想法来自普通人。实验和训练的门槛从一个大型机构降低到了一个人、一个夜晚或者一台强大的笔记本电脑。

低成本的公众参与得以实现，因为有一种称为**低秩适应**（Low rank adaptation，LoRA）的微调机制大大降低了成本，结合规模方面的重大突破（图像合成的 Latent Diffusion，LLM 的 Chinchilla）。
- LoRA 通过将模型更新表示为**低秩分解**（low-rank factorizations）来工作，将更新矩阵的大小减少了几千倍。这使得模型微调的成本和时间大大降低。

开源AI是最后赢家，而不是OpenAI
- 从头训练大模型成本太高，难以实施：LLaMA和LoRA出现
  - 3月初，Meta 的 LLaMA 泄露，没有指令或对话调整，也没有 RLHF。
  - 不到一个月，一系列改进版出现：指令调整、量化、质量改进、人类评估、多模态和 RLHF 等等变体。每个改进版间隔才几天时间
  - 扩展问题解决后，一定程度上任何人都可以进行实验和调试。
- 长期来看，大型模型并不更具优势，只用了几天时间
- 数据质量比数据大小更重要
- 直接与开源竞争是一个失败的命题
- 个人受到许可证限制程度没有企业那么大
- 客户比大模型提供商更了解业务应用
- Meta已开始建设开源生态系统：闭源越多，开源需求越强烈，发展越快

## 清华大学

清华AI四大公司：PonyAI、RealAI、Face++、商汤

### 1、RealAI

创始人：田天、陈键飞、朱军、张钹

CEO田天：绰号“田天王”，清华大学计算机科学与技术系博士，清华大学计算机系20余年历史上第一位也是唯一一位当选清华大学最高奖——清华特等奖学金的研究生，清华计算机系最高奖——西贝尔奖学金得主，同时也是在AAAI、WWW等全球顶级会议论文最年轻的第一作者之一。

董事长朱军：清华大学最年轻的长聘教授之一，亚洲第二位当选“IEEE AI 10 to Watch” 学者（ IEEE每两年从全球范围内选拔10位人工智能顶级学者），CSRankings AI 全球排名，朱军教授位列41位入选的清华教授中的第一名。

首席科学家张钹：中国科学院院士、俄罗斯科学院外籍院士，清华大学人工智能研究院院长，同时也是清华大学类脑计算研究中心学术委员会主任。

RealAI是由清华大学校长邱勇院士、清华大学副校长尤政院士、清华大学人工智能研究院院长张钹院士共同发起，核心团队由九位清华大学人工智能专业博士共同成立的亚洲第一家专注于第三代人工智能技术提供商。由目前全球最早提出并从事第三代人工智能核心技术研发的团队构成，旨在打造中国人工智能时代的“BAT”。

公司致力于探索发展鲁棒、可解释的第三代人工智能基础理论和方法；研制第三代人工智能编程框架、兼容性操作系统及基础算法库。与目前国内其他的深度学习公司不同，RealAI致力于基于逻辑推理、贝叶斯学习的无监督人工智能技术，从而解决当前人工智能高依赖于历史数据，仅适用于人脸识别等单一场景，泛化能力弱、、不可解释性、鲁棒性很差、非常容易被攻击的核心问题。并提出“AI+金融”、“AI+工业化”的全栈第三代人工智能技术。RealAI在人工智能安全性方面全球没有竞争对手。


### 2、PonyAI

创始人：楼天城、彭军、姚期智

CTO楼天城：绰号“楼教主”，清华大学计算机科学与技术系博士，清华大学姚班本科，被誉为“楼教主”，中国编程界第一人。前百度集团最年轻的T10，Google无人驾驶核心成员之一。连续十年（2006-2016）TopCoder世界排名第一、两届Google全球编程挑战赛世界冠军、Facebook世界编程大赛世界冠军、两届ACM/ICPC国际程序设计竞赛全球总决赛亚军、金牌、两届IOI国际信息学奥林匹克竞赛金牌。

CEO彭军：斯坦福大学计算机科学博士，清华大学学士，百度集团仅有的两位T11之一，百度集团高级副总裁、首席架构师、百度北美研究院院长。前Google大脑主创成员之一、高级研究员、一次Google最高奖获得者、百度历史上唯一一个两次获得百度最高奖的学者。

Pony.ai是全球领先的L4 、L5级自动驾驶技术提供商，由50多位清华大学计算机系姚班，麻省理工学院，斯坦福大学博士，以及ACM国际程序设计竞赛全球总决赛及大洲区总决赛金牌得主构成。在美国硅谷和北京均设有研发中心。2016年获得美国加州第一批无人驾驶路测牌照的公司（共25家），是第一批仅有的三家无人驾驶整体解决方案的公司之一。（Google、Baidu、Pony.ai）

2018年获得北京无人驾驶路测官方牌照（全球总共5家），北京的无人驾驶牌照获得难度全球最高，迄今为止仅有五家获得了牌照，包括：Pony.ai、北汽集团、德国戴姆勒集团、百度公司、蔚来汽车。其中，Pony.ai是全球唯一一家初创公司获得北京无人驾驶路测牌照。


### 3、Face++

创始人：印奇、唐文斌、杨沐

CEO印奇：2010年本科毕业于清华大学姚期智实验班。大学二年级开始在微软亚洲研究院从事人工智能和计算机视觉方面的研究。2011年赴美国哥伦比亚大学攻读计算机博士学位，专注于智能传感器方向。博士期间辍学创业，与清华同学唐文斌、杨沐联合创办北京旷视科技有限公司。2015年入选湖畔大学第一期，系统化学习商业战略和企业管理。

CTO唐文斌：唐文斌拥有清华大学计算机科学硕士学位，本科毕业于清华大学姚期智实验班。是全国信息学奥林匹克竞赛金牌、首届“YaoAward”金牌获得者，是中国第五位获得TopCoderTarget的选手，曾获得ACM/ICPC国际大学生程序设计竞赛世界总决赛第六名（亚洲第一名）。在校期间曾担任清华大学计算机系科协主席，并连续担任中国计算机学会中国信息学奥林匹克集训队教练长达7年。

Face++是北京旷视科技有限公司旗下的新型视觉服务平台，Face++平台通过提供云端API、离线SDK、以及面向用户的自主研发产品形式，将人脸识别技术广泛应用到互联网及移动应用场景中，人脸识别云计算平台市场前景广阔。

2017年6月，入选《麻省理工科技评论》“”2017 年度全球 50 大最聪明公司”榜单。


### 4、商汤

创始人：汤晓鸥、徐立、徐冰、徐持衡、陈宇恒、杨帆

联合创始人兼001号员工徐持衡：作为商汤001号员工，徐持衡历任商汤CTO、主任工程师等多个岗位，本科毕业于清华大学计算机系，随后就与汤晓鸥教授一起创办了商汤科技。高中机器人竞赛保送清华计算机系，是顶级的编程天才。

首席架构师陈宇恒：负责商汤科技基础架构及数项重点项目的软件架构，代码编写、审核，软件技术升级等工作。在公司创业期间，与香港中文大学合作，于国际顶级会议（NIPS2014）发表基于GPU深度学习的人脸识别系统论文，首次实现高于人类的人脸识别率。在公司快速发展阶段，从无到有开发了商汤人脸SDK、互联网金融等对外产品的初始版本， 完善并标准化了公司内部开发者工具。开源技术方面，用内存安全语言Rust实现的YAML解释器获得了超过20万次下载。于清华大学计算机科学与技术系获学士学位。

商汤科技所推出的包括人脸识别、图像识别、文字识别、图像视频分析、图像及视频编辑、智能监控、自动驾驶、遥感、医疗影像识别等各类智能视觉技术，已广泛应用于智慧城市、金融、汽车、智慧零售、智能手机、移动互联网、机器人等诸多行业，服务超过700家国内外知名企业。


### AMiner

学术文章交流社区

[AMiner](https://www.aminer.cn/)是一个提供海量中英文文献检索的AI搜索学术平台，由清华大学计算机系唐杰教授团队研发，拥有我国完全自主知识产权。作为国内首个AI学术搜索平台，包含了超过2.6亿学术论文/专利和1.33亿学者的知识图谱，为广大科研工作者提供方便、权威和具有认知智能的学术搜索服务。

### 智谱AI

[智谱AI](https://www.zhipuai.cn/index.html)，公司名:[北京智谱华章科技有限公司](https://www.qcc.com/firm/3e6bd6d29872b6c3a14f72f4ef6b9197.html)
- 唐杰、李涓子

[智谱AI](http://zhipu.ai)依托清华大学团队十余年在知识智能方面的技术积累，汇聚了一群有激情的AI有志之士，致力打造数据与知识双轮驱动的下一代人工智能系统，实现让机器像人一样思考的愿景。公司参与研发了超大规模预训练模型“悟道”，构建了高精度通用知识图谱，相关技术获国家科技进步二等奖、北京市专利一等奖、中国人工智能学会科技进步一等奖。公司是国家高新技术企业，产品线覆盖科技创新、安全、教育、生活等领域。

# 结束
