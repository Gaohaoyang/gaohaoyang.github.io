---
layout: post
title:  "对话系统之对话管理器-Dialogue Manager"
date:   2021-04-01 18:45:00
categories: NLP
tags: 深度学习 对话系统 多轮 FSM 有限状态机 陈蕴侬
excerpt: 对话管理器技术总结
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

## 任务型对话


- 非任务型对话系统，如开放域的闲聊，常见方法：
  - ① 基于**生成**方法，例如序列到序列模型（seq2seq），在对话过程中产生合适的回复，生成型聊天机器人目前是研究界的一个热点，和检索型聊天机器人不同的是，它可以生成一种全新的回复，因此相对更为灵活，但它也有自身的缺点，比如有时候会出现语法错误，或者生成一些没有意义的回复。
  - ② 基于**检索**的方法，从事先定义好的索引中进行搜索，学习从当前对话中选择回复。检索型方法的缺点在于它过于依赖数据质量，如果选用的数据质量欠佳，那就很有可能前功尽弃。

- [NLP之智能对话系统](https://www.jianshu.com/p/85ac1e329264)


- 任务导向型对话系统旨在通过分析对话内容提取用户任务，并且帮助用户完成实际具体的任务
- 任务型对话的处理方式有`pipeline`和`端到端`两种结构
  - pipeline(管道式)：定义了数个模块，以一条line的形式串联起来共同完成一个任务，如下图所示。
  - 端到端：代表为memory network

- 【2021-1-28】[智能对话系统和算法](http://html.rhhz.net/buptjournal/html/20190602.htm)


### （1）Pipeline

![](https://www.pkudodo.com/wp-content/uploads/2019/06/pipeline.png)

**pipline模块**

其核心模块组成是`NLU`->`DM`->`NLG`
- （1）NLU负责对用户输入进行理解，随后进入DM模块，负责系统状态的追踪以及对话策略的学习，控制系统的下一步动作，而NLG则配合系统将要采取的动作生成合适的对话反馈给用户。
- 其中若用户的输入是语音形式，则在NLU的输入前需再添加一个ASR语音识别模块，负责将语音信号转换为文本信号。
- （2）`DM`对话管理器内部又可分为`DST`（对话状态追踪）和`DPL`（对话策略学习），`DST`（对话状态追踪）根据用户每一轮的输入更新当前的系统状态，而DPL则根据当前的系统状态决定下一步采取何种动作。
- （3）`NLG`将语言生成后，若用户采用语音交互方式，则还需要`TTS`（语音合成）模块将文本转换为语音。

**pipline工作原理直观理解**

- `ASR`：这部分任务比较单一，只负责将语音转换为文本信号。不过，有些论文提起ASR的输入并不是唯一的，因为语音识别可能会存在一定错误，因此一般会输出多个可能的句子，每个句子同时附带一个置信度，表示这个句子正确的概率。这种方式在论文中被称为**N-best**，及前N个最有可能的句子。
- `NLU`：语言理解模块，用户语音转文本后称为用户Utterance，NLU负责对用户Utterance进行**领域/意图分类**及**槽值对填充**。
  - 领域和意图分类是为了让系统明白用户的对话所处领域及意图，方便后续调用相应的model去识别（并不是一个model跑遍所有的领域意图，就好像树一样，根据领域/意图的分类，在树中找到对应的model。当然model结构可能是一样的，不同的是训练采用的数据是对应领域/意图的）。
  - 完成一个任务需要去弄清楚一些条件，比如说点一杯咖啡，根据领域/意图分类，系统判断用户的意图是点咖啡，此时系统需要弄明白是什么咖啡，甜度怎么样等等。所以会检索点咖啡所需要的槽值对，这时后台检索发现完成这个任务需要弄明白{咖啡类型=?，甜度=?}（其中咖啡类型和甜度被称为`槽`（slot）），系统会反馈回去问用户咖啡类型是什么？甜度是多少？用户反馈后，NLU再对用户Utterance内容进行识别，发现咖啡类型是摩卡，即槽“咖啡类型”的值（value）为“摩卡”，这个过程被称为`槽填充`。同时这个过程也很容易被人联想到`命名实体识别`这一方法。考虑到系统的准确率，一般情况下生成的槽值对也会附带一个置信度，也就是说，对于一个slot，可能并不会只输出一个value。
  - 【2020-9-7】NLU为什么难？语言的多样性、歧义性、鲁棒性、知识依赖和上下文。源自：[自然语言理解-从规则到深度学习](https://developer.aliyun.com/article/158691)
  - 意图分类的实现方法：
    - 规则：如CFG/JSGF等，CFG最早出现于CMU Phoenix System
    - 机器学习：如SVM/ME...
    - 深度学习：CNN/RNN/LSTM...
- `DM`对话管理器内部又可分为`DST`（对话状态追踪）和`DPL`（对话策略学习）
  - `DST`：DST（对话状态追踪）归属于DM对话管理器中，负责估计用户的当前轮的目标，它是对话系统中的核心组成部分。在工作过程中维护了一个系统状态（各个槽对应的值以及相应的概率），并根据每一轮对话更新当前的对话状态（各个槽值对）。直观上来看，SLU输出了slot-value，但是不确定，也就是说可能会输出{咖啡类型=摩卡}–0.8    {咖啡类型=拿铁}–0.2，SLU认为这次用户要求的是摩卡的概率是0.8，是拿铁的概率为0.2，并没有输出一个确定值。所以DST需要结合当前的用户输入（即SLU输出的槽值对）、系统上一时刻的动作（询问需要什么类型的咖啡）以及之前多轮对话历史来判断咖啡类型到底是哪个，最后计算得到{咖啡类型=摩卡}–0.9，认为是摩卡的概率为90%，这是DST评估后认为咖啡类型的当前状态。当然还有很多其他的槽，可能甜度还没有问过，所以{甜度=none}，等待DPL去询问用户。这些所有的槽值对的状态，被统称为当前的系统状态，每个轮次结束后都会对当前的系统状态做一次更新。
    - DST主要工作就是更新系统状态，试图捕捉用户的真实意图（意图通过槽值对体现）。
    - DST归根结底最终要的还是评估判断当前的用户目标、维护当前系统状态。
    - 一般都是对于一个slot建立一个多分类模型，分类数目是slot对应的value数目。
    - 常用方法：DNN、RNN、NBT、迁移学习（迁移学习部分还没看，后续会更新到文章末尾）
  - `DPL`：对话策略管理是根据DST输出的当前系统状态来判断还有哪些槽需要被问及，去生成下一步的系统动作。
  - 论文（详见[对话系统中的DST](https://www.pkudodo.com/2019/06/09/1-12/)）
    - 论文一：**Deep Neural Network Approach for the Dialog State Tracking Challenge**
      - 使用n-gram滑动窗口，同时手工构造了12个特征函数来抽取特征，随后将所有特征送入DNN，最后对slot的所有可能value计算概率，概率最高的即为slot对应的value。每一个slot都会有一个对应的model，因此如果该intention内有n个slot需要填充，则系统内有n个该model。
    - 论文二：**Word-Based Dialog State Tracking with Recurrent Neural Networks**
      - ASR输出用户Utterance后需要再通过SLU，随后才进行DST。可是ASR可能会出错，SLU也可能会出错，这样会造成一个error传播。因此作者设计的model直接以ASR的输出作为DST的输入，绕过了SLU部分。这种策略目前在paper中也比较常见，一般来说效果也确实比添加SLU模块的要高一些。
    - 论文三：**Neural Belief Tracker: Data-Driven Dialogue State Tracking**
      - 将SLU合并到了DST当中。model中可以看到一共有三个输入，System Output（上一时刻系统动作）、User Utterance（用户输入）、Candidate Pairs（候选槽值对）。model要做的就是根据系统之前动作及用户当前输入，判断候选槽值对中那个value才是真正的value。
      - ![](http://www.pkudodo.com/wp-content/uploads/2019/06/DBN-1024x625.png)
- `NLG`：DPL生成下一步的系统动作后，生成相应的反馈，是以文本形式的。
- `TTS`：若用户是语音交互，则将NLG输出的文本转换为对应语音即可。这部分与ASR差不多，功能相反而已。


### （2）端到端

- 基于管道方法的对话系统中有许多特定领域的手工制作，所以它们很难适用于新的领域。近年来，随着端到端神经生成模型的发展，为面向任务的对话系统构建了端到端的可训练框架。与传统的管道模型不同，端到端模型使用一个模块，并与结构化的外部数据库交互。
- ![](https://upload-images.jianshu.io/upload_images/1535345-3e1a2d7d80ba70d8.jpeg)
- 上图的模型是一种基于网络的端到端可训练任务导向型对话系统，将对话系统的学习作为学习从对话历史到系统回复的映射问题，并应用encoder-decoder模型来训练。然而，该系统是在监督的方式下进行训练——不仅需要大量的训练数据，而且由于缺乏对训练数据对话控制的进一步探索，它也可能无法找到一个好的策略。
- 端到端强化学习方法
  - ![](https://upload-images.jianshu.io/upload_images/1535345-afd604658341abf5.png)
  - 上图的模型首先提出了一种端到端强化学习的方法，在对话管理中联合训练对话状态跟踪和对话策略学习，从而更有力地对系统的动作进行优化。
- 【2021-3-2】微软的[Jianfeng Gao](https://www.microsoft.com/en-us/research/people/jfgao/)，[ConvLab](https://github.com/ConvLab/ConvLab) is an open-source multi-domain end-to-end dialog system platform，aiming to enable researchers to quickly set up experiments with reusable components and compare a large set of different approaches, ranging from conventional pipeline systems to end-to-end neural models, in common environments.
  - 开源的[ConvLab: Multi-Domain End-to-End Dialog System Platform](https://arxiv.org/abs/1904.08637). 
  - ACL 2020 demo track, 清华开源的[ConvLab-2: An Open-Source Toolkit for Building, Evaluating, and Diagnosing Dialogue Systems](https://arxiv.org/abs/2002.04793)，[AMiner地址](https://www.aminer.cn/pub/5e451e433a55acfaed738772/convlab-an-open-source-toolkit-for-building-evaluating-and-diagnosing-dialogue-systems)
  - [ConvLab-2](https://convlab.github.io/), 端到端模型、评价、诊断，build task-oriented dialogue systems with state-of-the-art models, perform an end-to-end evaluation, and diagnose the weakness of systems. [这篇顶会，助你徒手搭建任务导向对话系统](https://zhuanlan.zhihu.com/p/199261627),朱祺的团队用最先进的模型构建面向任务的对话系统，执行端到端评估，并诊断系统缺陷。ConvLab-2继承了ConvLab的框架，但集成了更强大的对话模型并支持更多的数据集。还开发了一个分析工具和一个交互工具来帮助研究人员诊断对话系统。分析工具提供了丰富的统计数据和图表展示，并对模拟数据中的常见错误进行汇总，便于错误分析和系统改进。交互工具提供了一个用户模拟器界面，允许开发人员通过与系统交互并修改系统组件的输出来诊断组装好的对话系统。
    - DSTC9 Track 2: Multi-domain Task-oriented Dialog Challenge II
    - End-to-end Multi-domain Task Completion Dialog Task
    - Cross-lingual Multi-domain Dialog State Tracking Task
    - ![](https://pic2.zhimg.com/80/v2-110d9d814477e68b3184d017619bbfdd_1440w.jpg)
    - ![](https://pic3.zhimg.com/80/v2-53b34da932b17b2db31085fd23f2e12e_1440w.jpg)
  - [Deep Reinforcement Learning for Goal-Oriented Dialogues](https://www.microsoft.com/en-us/research/project/deep-reinforcement-learning-goal-oriented-dialogue/#)
    - ![](https://www.microsoft.com/en-us/research/wp-content/uploads/2017/04/composite-dialogue-1024x459.png)

- 【2021-3-15】百分点智能问答主要流程
  - ![](https://image.jiqizhixin.com/uploads/editor/d3dda01e-1926-45fa-9f34-b8d18b617c18/2.png)
  - 首先进行语音识别，将用户会话识别出来后，经过ASR结果纠错和补全、指代消解、省略恢复等预处理之后，经过敏感词检测，送入中控系统。中控系统是在特定语境下进行意图识别的系统，分为情绪识别、业务意图识别、对话管理、异常处理等四个模块，其中业务意图包括QA问答机器人（**QA** Bot）、基于知识图谱的问答机器人（**KG** Bot），NL2SQL机器人（**DB** Bot），任务型机器人（**TASK** Bot）。对话管理包括多轮对话的对话历史管理、BOT当前询问、会话状态选取等模块。异常处理包括安全话术（对意图结果的结果进行后处理）、会话日志记录、告警等功能。然后，进入话术/指令生成子系统，这是识别问句意图后的对话结果生成，包括话术生成和指令生成两个模块，在话术生成中，对话系统根据对话历史数据和对话模板生成和拼接产生话术，如果是任务型对话，将生成对应指令。另外，辅助系统通过画像分析、用户分析、问题分析等功能，进一步优化问答系统的效果。
- 智能问答产品典型架构
  - ![](https://image.jiqizhixin.com/uploads/editor/06578b0e-afba-49dd-b46c-0b9dc80855fa/3.png)
  - 智能问答产品主要包括知识库、对话模型、配置中心、多渠道接入以及后台管理。针对不同的任务划分，准备不同的知识库，例如QA BOT需要引入问答知识对，KG BOT需要知识图谱的支持等等。将针对不同任务的对话模型服务，部署接入各个平台接口，譬如小程序、微信、网页等，提供在线问答服务。配置中心主要提供QA对、闲聊语料、同义词库、特征词库等的可视化配置服务，实现知识配置的快速拓展。后台管理针对智能问答系统实施整体监控、日志管理、告警、权限管理等等，另外，它还提供各种维度的统计分析服务。

### 案例

- 【2020-11-28】[怎么让机器人帮我买咖啡](https://github.com/qhduan/ConversationalRobotDesign/blob/master/%E5%AF%B9%E8%AF%9D%E6%9C%BA%E5%99%A8%E4%BA%BA%E6%8A%80%E6%9C%AF%E7%AE%80%E4%BB%8B%EF%BC%9A%E9%97%AE%E7%AD%94%E7%B3%BB%E7%BB%9F%E3%80%81%E5%AF%B9%E8%AF%9D%E7%B3%BB%E7%BB%9F%E4%B8%8E%E8%81%8A%E5%A4%A9%E6%9C%BA%E5%99%A8%E4%BA%BA/README.md)（Dialogue System）

这里的对话系统特指 Task-Oriented Dialogue System，
也就是让机器人帮助实现一种特定任务的系统，
有一文献提到的 General Dialogue System 的系统，往往指类似 Chit Chat 的系统。

一般此类对话系统的研究都基于如何让机器人在有限步骤内完成可以完成的任务的系统，并且结果往往定位到一个单一实体。此类系统的一个隐含假设往往是通过电话、文字、语音来进行人机交互，也就是没有什么“点击按钮”，“从多个选项选择”，之类的交互方式。当然在一些类似对话系统演变的工程实践中，是有类似的实现的。

因为这个关于“必须文字交互”的假设，所以实际上有些问题并不适合基于这种假设的对话系统完成。例如你在一些手机软件中搜索餐厅，结果可能会返回多家餐厅（餐厅本身即实体），他们都有名称、地址、电话等等信息（这些也可以称为餐厅这个实体的属性，当然也可以是与餐厅这个实体有关的其他实体）。而你想要通过语音、朗读的文字来获得这个列表，就显得很愚蠢了，不会有人想听机器人读5分钟搜索结果的20家餐厅然后决策吧？所以此类系统往往最后是推荐单一实体，例如结果排名最高的餐厅，如果你需要更换，可以跟系统说换一下餐厅。

一个典型的对话系统的交互过程是这样的：
- 用户：你好（User Dialog Act：greeting）  
  - 机器：你好，我可以帮助你搜索并预订餐厅（Sys Dialog Act：greeting）  
- 用户：我想要找一家在中央公园2.0附近的意大利餐厅（User Dialog Act：inform(地址=中央公园2.0，口味=意大利)）  
  - 机器：请问你想要在中央公园2.0附近什么价位的意大利餐厅？（Sys Dialog Act：request(价位)）  
- 用户：普通的就好（User Dialog Act：inform(价位=普通)）  
  - 机器：我知道那里有一家柯南家的老意大利料理餐厅（Sys Dialog Act：inform(名称=柯南家的老意大利料理)）  
- 用户：换一个（User Dialog Act：alter()）  
  - 机器：我知道那里有一家意大利油泼面餐厅（Sys Dialog Act：inform(名称=意大利油泼面)）  
- 用户：它家的价格怎么样？（User Dialog Act：request(价位)）  
  - 机器：意大利油泼面的价位是普通（Sys Dialog Act：inform(价位=普通)）  
- 用户：就这家吧，帮我预订（User Dialog Act：order()）  
  - 机器：请问有几个人？（Sys Dialog Act：request(人数)）  
- 用户：单身狗（User Dialog Act：inform(人数=1)）  
  - 机器：真的就1个人吗？（Sys Dialog Act：confirm(人数=1)）  
- 用户：是的（User Dialog Act：confirm()）  
  - 机器：已经预定成功（Sys Dialog Act：order_success()）  
- 用户：好的，再见（User Dialog Act：bye()）  
  - 机器：再见，欢迎下次使用（Sys Dialog Act：bye()）

Dialog Acts 如果是用户发起的（User Dialog Act），那么它是一种处理后的用户意图的抽象表达，是一种形式化的意图描述。

>The dialog act expresses an important component of the intention of the speaker (or writer) in saying what they said
系统发起的行为（Sys Dialog Act），是根据用户行为，上下文信息等等综合得出的，
下一步所要进行的操作的抽象表达，这个抽象表达后续会送入NLG部件，生成自然语言。

>Asking questions, giving orders, or making informational statements are things that people do in conversation, yet dealing with these kind of actions in dialogue what we will call dialog acts is something that the GUS-style frame-based dialog systems
GUS对话系统，是 Genial Understander System 的缩写，可以追溯到1977年的论文(Daniel G. Bobrow, GUS, A Frame-Driven Dialog System, 1977)

常见的不同意图有：
- 用户的**greeting**：问好  
- 用户的**inform**：用户提供一个信息，例如想要的餐厅的地址  
- 用户的**request**：询问一个信息，例如当前结果餐厅的电话  
- 用户的**confirm**：确认信息正确（例如上一条是机器问你对不对）  
- 用户的**bye**：结束对话  

机器的greeting：问好，也可以是自我介绍  
- 机器的**inform**：提供机器知道的信息，例如当前结果餐厅的信息  
- 机器的**request**：机器必须有足够的信息才能完成任务，如果欠缺一些必须信息，例如餐厅地址、口味，则会向用户询问  
- 机器的**confirm**：根用户确认信息是否正确  
- 机器的**bye**：结束对话  

上文还出现了一些可能的特殊意图，例如：
- 用户的**order**：确认订餐  
- 用户的**alter**：更换检索结果  
- 系统的**order_success**：反馈订餐成功  

整个对话系统，就是为了完成某个特定任务，这个任务所需要的特定条件需需要由用户提供（例如帮助买咖啡需要咖啡品种，热或冷等信息），当信息足够的时候，机器就能完成相应任务。

这个过程总结就是：
- 用户说了什么 =》  分析用户意图 =》  生成系统的对应意图（操作）=》  用户听到了系统的反馈 =》  用户说了什么（第二轮）=》…………

当然根据任务复杂度、和其他系统结合等等问题，
对话系统本身也有各种的不同准确度与实现方式。

## DM

对话管理（Dialog Manager，下文简称 DM）一般的定义是，根据用户当前的输入，以及对话上下文，决定系统下一步的最佳响应。对于任务型 DM，其职责是通过一致性的对话交互，完成用户的对话目标。

- [多轮对话之对话管理(Dialog Management)](https://zhuanlan.zhihu.com/p/32716205)
- **对话管理**（Dialog Management, DM）控制着人机对话的过程，DM 根据对话历史信息，决定此刻对用户的反应。最常见的应用还是任务驱动的多轮对话，用户带着明确的目的如订餐、订票等，用户需求比较复杂，有很多限制条件，可能需要分多轮进行陈述，一方面，用户在对话过程中可以不断修改或完善自己的需求，另一方面，当用户的陈述的需求不够具体或明确的时候，机器也可以通过询问、澄清或确认来帮助用户找到满意的结果。
- ![](https://picb.zhimg.com/80/v2-763da7952c607ed3065af3cacdd9c7d8_720w.jpg)

对话管理的任务大致有下面一些：
- `对话状态维护`（dialog state tracking, `DST`）
  - 维护 & 更新对话状态
- `生成系统决策`（dialog policy）`DP`
  - 根据 DST 中的对话状态（DS），产生系统行为（dialog act），决定下一步做什么dialog act 可以表示观测到的用户输入（用户输入 -> DA，就是 NLU 的过程），以及系统的反馈行为（DA -> 系统反馈，就是 NLG 的过程）
- 作为接口与后端/任务模型进行交互
- 提供语义表达的期望值（expectations for interpretation）interpretation: 用户输入的 internal representation，包括 speech recognition 和 parsing/semantic representation 的结果

对话引擎根据对话按对话由谁主导可以分为三种类型：
- **系统**主导
  - 系统询问用户信息，用户回答，最终达到目标
- **用户**主导
  - 用户主动提出问题或者诉求，系统回答问题或者满足用户的诉求
- **混合**
  - 用户和系统在不同时刻交替主导对话过程，最终达到目标。有两种类型
    - 一是用户/系统转移任何时候都可以主导权，这种比较困难
    - 二是根据 prompt type 来实现主导权的移交
  - Prompts 又分为：
    - **open prompt**（如 ‘How may I help you‘ 这种，用户可以回复任何内容 ）
    - **directive prompt**（如 ‘Say yes to accept call, or no’ 这种，系统限制了用户的回复选择）

### 实现方法

- 【2021-4-1】[得助智能](https://www.51ima.com/)丁南的系列文章
  - [任务型对话管理的产品实践（第一篇）- 实现方法的回顾](https://zhuanlan.zhihu.com/p/71785382)
  - [第二篇 - Data-driven 方法应用的困难](https://zhuanlan.zhihu.com/p/71787538)
  - [任务型对话管理的产品实践（第二篇）- 机器学习方法应用的困难](https://zhuanlan.zhihu.com/p/80957096)
  - [第三篇 - 业界解决方案一览](https://zhuanlan.zhihu.com/p/71788365)

![](https://pic3.zhimg.com/v2-838c2141adab54758263ea0de49b07d2_r.jpg)


#### 问答匹配方法

最简单的DM是被动响应的问答匹配，根据系统内部维护的**命令-响应** table，对输入 text 做模式匹配或语义识别，输出匹配命中的响应。
- 优点：简单，可控
- 缺点：只能处理**简单命令式**任务，类似 unix 命令行工具、或 Mac 上效率神器 Alfred，它没有**异常处理**机制、无法利用上下文、无法与人进行多轮交互。

#### 规则（硬编码）

为了支持多轮的对话交互，早期的商业对话应用（如IVR系统）直接将对话逻辑用 C++ 或 Java 在系统中实现，即 [programmatic dialog management](https://zhuanlan.zhihu.com/p/71785382/edit#reference)
实现起来速度很快，但有一个很大的问题，**复用性很差**，对话模型和领域逻辑严重耦合，修改对话逻辑必须要修改对话管理的代码，甚至是从头开发，对话变更的成本很高，项目迭代速度很慢。

为了提高系统的复用性，商业公司开发出了很多可以重用的 dialog modules，这些模块封装了对话项目常用的通用组件，例如超时、取消会话、澄清等，甚至是一些常用的对话流程，力争做到只修改部分 dialog modules 就可以通过拼接组件的方式完成对话项目的开发 。

但这种方法对系统的**侵入性**仍然很大，只有自然语言处理专家和系统专家才能使用和维护。对话系统的使用和推广成本都很高。于是将逻辑设计从系统实现中提出来的需求就非常强烈，这个是任务型机器人发展的一个重大改变，即对话逻辑和对话模型的解耦（decoupling dialog specification and dialog engine）。

#### 状态机的方法

为了降低开发成本，满足交互设计解耦的需求，基于状态转移的对话系统被开发出来。一些系统将对话设计和对话管理的工作分离，领域逻辑由对话交互设计师完成（称为 VUI designer），对话管理模块在运行时解析对话逻辑。

多轮会话用**流程拓扑图**来表示，**状态节点**代表一次对话事件（可以是等待用户输入并给予回复，也可以是一次任意响应），流程图的**边**代表状态转移条件。设计者用对话流创作工具（一般称为 Authoring Tool）定义好交互逻辑后，创作工具将对话定义转换成一种数据结构或脚本，用来表示整个状态图。对话 run time 阶段，对话管理载入预定义好的流程数据/脚本，根据实际场景，执行流程图的响应或跳转。

这类对话系统在 90 年代的非常流行，如图俄勒冈州研究所推出的 CSLU toolkit ，类似的方法是后来很多其他对话模型的基础，至今仍有很多公司采用。对话逻辑设计与对话管理系统分离的模式，也一直沿用至今。

另外 finite-state 方法还引入一个额外的好处，它一定程度上解决了对话设计 debug 的困难。 对话设计者可以依靠 authoring tool 查看流程图中每个节点的状态，也可以对拓扑图进行覆盖率检查 。这种 debug 模式在现在的商业系统中也比较常见，例如图 3 百度的 [Kitt.ai](http://kitt.ai/) 就有类似的对话调试器。

但 finite-state 方法非常不灵活，如果对话任务中有多个需要用户提供的信息时尤为如此。用户可能一并把其他信息也说了，或者用户对已询问的信息做了修改，或者用户并没有按要求回答，也就是说用户可能并没有完全按系统预设的路径走，即用户主导了对话的进行（user initiative）。如果 finite-state 方法需要支持 user initiative，那就需要考虑用户反馈所有可能性，状态跳转的可能路径会非常多，对话流会变得非常复杂，最后变得无法维护 。 息收集的过程用图形式实现很繁琐，对话开发效率很低。其次实现信息的更新很麻烦，需要在图上把信息更新的交互也画出来。

#### 基于 Frame 的方法

一种既能提高灵活性，又能保持低成本的方法是基于 frame 方法。Frame 的概念在人工智能中的应用可以追溯到马文 · 明斯基（Marvin Minsky）提出的知识表示框架 [4]。Minsky 期望用一种数据结构来表示一类情景/场景（a stereotyped situation），这个数据结构被 Minsky 称为 frame。  这种数据结构用于将知识结构化的数据结构，这种结构能方便解释、处理和预测信息

受到 Minsky 的启发，Daniel 尝试用一种知识表征语言（knowledge representation language）来构建语言理解系统 ，用陈述性的知识表示来描述人类语言。这套知识表示框架后来被 Daniel 等人迁移到了人机对话系统，每一个 frame 代表会话中的一部分信息，Daniel 假设这样就可以用一系列的 frames 来描述并引导人机对话的整个过程。现在 frame-based 方法一般被称为槽填充方法，它用一个信息表维护对话任务中没有顺序依赖的信息，信息表包含完成对话任务所必需（或可选）的槽位，该方法的目标就是引导用户回答对话信息表当中的槽位，一旦信息表填满后，对话任务所预设的响应将被执行。用户可以以任意次序提供槽位信息，顺序的多样性并不增加对话管理的复杂度。

Frame-based 方法提出后被应用到很多商用对话系统中，工业界对话系统的标准语言 - 语音标记语言 VoiceXML 就主要基于 frame-based 方法。   frame 之间通过特定跳转逻辑连接，或用一个流程图来连接，一个多任务的对话项目就能快速开发出来。现在大多通用 chatbot / 智能对话平台仍然会采用槽填充方法，

#### 基于目标的方法

基于 frame 的方法主要解决了一些固定逻辑的任务，但对话管理不仅处理一个个小的对话任务，还需要考虑对话任务的顺序、任务的层级结构、任务之间的场景切换，以及能动态添加新任务的机制。在 90 年代研究者提出了一种新的人机对话模式 - 基于目标的方法，

这种方法将人类的沟通模式迁移到了人机对话当中。Charles Rich 等人认为人机交互的核心在于交互双方通过不断调整各自的行为，合作完成一个共同目标，并假设当机器遵守人类交流的规则和习惯时，使用者将更容易学习使用这个交互系统 。

对于任务型对话，虽然可以假设 user 在使用对话系统前就已经有清晰的目标，但对话过程肯定不是一帆风顺，对话多样性太复杂，例如用户并不会按照一个固定的流程进行对话、用户可能想修改之前的一些选择、系统也可能因为误识别而出现信息不对称，对话目标也可能涉及到多个对话任务、对话任务之间的关系可能是多样的，这些都需要交互双方根据实际情况，动态调整交互行为，而这些都无法靠一个静态的流程图和一个个预配置好的 frames 来实现。

为了在人机对话中实现目标合作理论，Grosz 等人将任务型对话结构分成三个部分：用来表示语言序列的结构（linguistic structure），用来表示对话意图的结构（intentional structure），和用来表示当前[对话焦点的状态](https://zhuanlan.zhihu.com/p/71785382/edit#reference)（attentional state）。Grosz 假设任务型的对话结构可以按意图/目标（purpose）划分成多个相互关联的子段落（segment），每个 segment 表示一个目标，segment 中可以嵌套更小的 segment 表示更小一级的子目标。这样对话就可以看成多层级的结构。一个对话对应一个主要目标，其下划分成的多个段落，对应多个子目标。在对话进行的过程中，每一时刻交互双方都会将注意力集中到一个目标。根据实际情况，下一时刻双方可能还在沟通这个目标，也可能聚焦到另外一个目标，对话焦点在对话期间会动态地变化，直到完成对话中所有的子目标，对话沟通就完成了。简单理解，linguistic structure 就表示对话的段落（segment）结构，intentional structure 即表示对话的意图结构，attentional state 指的就是每一个时刻的对话焦点。

根据基于目标的对话理论框架，研究者们开始考虑如何将其应用到人机对话系统，典型的代表有 Collagen  和 RavenClaw 。要实现基于目标的对话理论，首先需要考虑用什么样的方式来表示这样的对话结构。一般的做法是，用树（tree）表示整个对话的组织结构，用栈（stack）维护对话进行中每一时刻的对话焦点，用字典（dict）存储对话栈中每个对话目标所依赖的信息。由于一个对话任务的总目标总是可以拆分成多个小目标，所以对话目标可以看成一个层次结构，这就很适合用树形结构表示。

除了有对话任务的树结构描述，每个节点的下面可能还有其数据描述，有的系统用基于 frame 方法中的术语，将节点的数据描述称为节点槽位。节点槽位代表节点所依赖的数据，数据的来源可能是 api 接口返回的结果、也可能是一段代码的执行结果，更常见的来源是用户的回复。所有的节点数据都被维护在系统的上下文中（在 RavenClaw 中被称为 concept），上下文的生命周期一般为一个对话任务的整个运行时。

上下文数据有了，但需要一个算法能让系统利用上下文信息，基于目标的方法使用一个叫 agenda 的数据结构维护 dialog stack 中的节点数据，每个节点有自身的 agenda 信息表维护其所依赖的数据，父节点的 agenda 包含所有其子节点的数据，这样就形成了 agenda 层级结构。

对话运行时，系统识别或计算出槽位 value 后（信息处理可能是模式匹配、实体识别、意图识别等多种技术），系统根据 stack 中的节点顺序，自顶向下的遍历 agenda 对应的槽位，依次更新每个 agenda 信息表。

Agenda 算法给对话管理带来了很多特性

支持 mixed-initiative 对话交互。类似 frame 槽填充，一个目标节点下的所有槽位填充不依赖于固定对话路径，降低了对话任务设计成本。
提高了交互的自然度。Agenda 维护了用户已经提前答复的槽位，每次一个节点入栈之前都会根据其 agenda 中的数据，判断节点的目标是否已完成，若已完成则该节点将被标记并跳过入栈操作。并且系统也会检测 stack 中哪些节点已提前完成，将已完成的节点从 stack 中剔除。例如上图图 9 中由于还款方式和存款账户的槽位已被提前填充，这两个节点就不会入栈，并且「询问还款信息」的目标也提前完成，下一时刻 stack 中只剩下根节点。这样提前跳过已完成的对话节点，用户就不用重复回答已答复的内容，提高了交互的自然度。
有利于语义消歧。利用 agenda 的层级结构和 dialog stack，系统能清楚定位到当前的对话焦点，避免了不知道更新哪一个节点槽位的问题。例如下图 10 是银行某业务的部分对话描述，有两个子任务都包含「账户尾号」的槽位填充，需要用到同一类型的实体。利用 stack 结构的对话焦点，系统很清楚当前识别到的实体应该更新哪一个槽位，避免了语义的歧义。

基于目标的对话管理还为系统引入了一个非常强大的功能：焦点切换 focus-shift（有的系统可能称为任务切换或场景切换）。基于流程图的方法如果想支持任务切换，需要把切换的流程在拓扑图中表示出来，否则系统无法确定跳转路径。用这种方式任务描述的成本太高，切换的场景太多，很难提高场景覆盖率。 基于目标的对话管理将复杂的任务切换逻辑交给底层引擎，降低了任务描述的复杂度。

由于引入了 focus-shift 算法，一些公共处理策略和可重用的流程就可以从领域相关的对话任务中提取出来，对话管理变成了两层架构，上面一层是领域相关的对话任务描述，由领域专家设计；下面一层是处理领域无关的对话引擎。通用的对话策略和流程做成可插拔式的组件，这样大大降低了不同领域对话设计的成本，提高了对话管理的可扩展性。

类似 RavenClaw 这种基于目标的对话管理方法虽然很强大，但也有其局限性。上文有提到，可动态变化的任务树结构提高了对话描述的灵活性和可扩展性，不再需要将所有的转移路径显式的画出来，也不需要重复设计常用的公共流程。但这个优势在一些场景也是问题的来源。首先，对话设计者们往往习惯画流程图，因为流程图结构与人机交互运行时的对话结构是相似的，不存在理解门槛。而任务树结构将很多转移路径、对话交互的逻辑隐藏在了其目标结构和运行时的策略中（在论文中称之为 constraint-based task representation），对话设计者需要将对话流映射成任务树结构，这个过程是比较有挑战的。在我们实际工作中也会发现，让非专家理解这套对话模型是比较困难的。另外，在对话项目开发期间，通常需要做对话场景的 debugging。跟踪流程图的跳转路径是最常见的对话调试，而 RavenClaw 并没有采用静态对话流，对话路径并不是完全由系统设计者控制的，对话用例出现错误的原因可能并不容易发现，这样会导致很高的调试成本。这个问题在有的时候可能是致命的，后面我们会讲到，对话管理的「可控性」在实际工程中非常重要，如果一个实现在项目后期才发现不能完全支持某个对话场景，而又不能通过 debugging 快速定位，或需要大规模修改任务树结构才能覆盖测试用例，这将会是对话开发的噩梦。

#### Data-driven 方法

目前所提到的对话管理方法都属于基于规则的方法，它能表述的对话场景是被领域专家设计出来的，所能涵盖的对话路径受限于专家设计出的逻辑。但人类的语言可以算是一种离散组合系统（discrete combinatorial system） ，有非常庞大的多样性和复杂性，想用一套规则来描述往往并不现实。

对话场景的完备性，或称为对话交互的完备性（VUI completeness），是评价一个任务型机器人重要的指标。它指的是系统需要支持用户所有可能的业务对话场景，不存在无法处理的业务对话行为。

除了场景空间很难靠规则覆盖以外，高昂的对话开发成本、多样的用户行为、以及输入信号的不确定性，都是驱动研究者探索规则以外的方法。研究者从不同角度提出很多基于统计的对话模型，我们这里简要讨论三种方法，基于实例（examples-based）方法、基于分类的方法、基于强化学习的方法。

#### 基于实例的方法

Lee [14] 提出的 Example-based 方法很直接 ，它收集大量的对话语料并提取每一时刻的对话状态，将这些对话状态都当做标准例子索引到数据库。对话运行时系统在数据库中找到与当前对话状态最相似的实例，该实例对应的响应即为当前的系统选择。

这种方法假设数据集中某一个时刻的对话状态能包含会话历史的所有信息，数据库中保存了海量的「历史经验」，只要运行时遇到类似的对话情况，该会话就可以参考数据库中的经验做出「最合适的操作」，所以这种方法也叫做基于情境的方法（situation-based）。

为了让对话状态尽可能涵盖一个时刻的真实状况，Lee 将多种数据源都放到了对话状态的数据结构中，并将之称为一个对话实例。对话实例包括用户的话语、dialog act、用户意图、用户实体、会话历史记录，其中会话历史用会话中所有槽位的 ont-hot 编码表示。


### DST

【2020-12-23】对话状态追踪（DST）的作用：
- 根据**领域**(domain)/**意图**(intention) 、**槽值对**(slot-value pairs)、之前的状态以及之前系统的Action等来追踪当前状态。 
- 输入是
  - **Un**：n时刻的意图和槽值对，也叫用户Action
  - **An-1**：n-1时刻的系统Action
  - **Sn-1**：n-1时刻的状态
- 输出是Sn：n时刻的状态
- 用户Action和系统Action不同，且需要注意
  - S = {Gn,Un,Hn}
  - Gn是用户目标
  - Un同上
  - Hn是聊天的历史，Hn= {U0, A0, U1, A1, ... , U ?1, A ?1}，S =f(S ?1,A ?1,U )。

DST涉及到两方面内容：**状态表示**、**状态追踪**。

- DST形象化，[图](https://upload-images.jianshu.io/upload_images/17303794-c1bbad40c15af803.jpg)
  - ![](https://upload-images.jianshu.io/upload_images/17303794-c1bbad40c15af803.jpg)
- DST常见方法
  - 注意：基于规则的方法虽然可以较好利用先验知识从而可以较好解决冷启动等问题，但是需要太多人工、非常不灵活、扩展性和移植性很差、不能同时追踪多种状态，[图](https://upload-images.jianshu.io/upload_images/17303794-21b9f3b4f6e3c539.jpg)
![](https://upload-images.jianshu.io/upload_images/17303794-21b9f3b4f6e3c539.jpg)
  - （1）CRF
  - （2）NN-Based
  - （3）基于迁移学习做DST
  - （4）Multichannel Tracker
  - （5）Neural Belief Tracker
  - （6）其他：基于贝叶斯网络做DST、基于POMDP（部分可观测马尔可夫决策过程）等
  - 总结对比,[图](https://upload-images.jianshu.io/upload_images/17303794-865e51888fc863cc.jpg)
  - ![](https://upload-images.jianshu.io/upload_images/17303794-865e51888fc863cc.jpg)
- DST评估方法
  - ![](https://upload-images.jianshu.io/upload_images/17303794-297db64c7cfbfc87.jpg)
- 为了解决领域数据不足的问题，DST还有很多迁移学习(Transfer Learning)方面的工作。比如基于特征的迁移学习、基于模型的迁移学习等。

#### DSTC

- 讲到DST就不得不讲**DSTC**，DSTC是Dialog System Technology Challenge，主要包括6个Challenge。DSTC对DST的作用就相当于目标函数对机器学习任务的作用，真正起到了评估DST技术以及促进DST技术发展的作用。之所以先说DSTC是因为后面的很多DST的方法是在某个DSTC（大多是DSTC2、DSTC3、DSTC4、DSTC5）上做的。
- ![](https://upload-images.jianshu.io/upload_images/17303794-b38b10790b64127f.jpg)


- 详情参考：[任务型对话系统中状态追踪（DST）](https://www.jianshu.com/p/085eb0262284)

### DP

对话管理的一些方法，主要有三大类：

#### （1）**Structure-based Approaches**

- **Key phrase reactive**
  - 本质是关键词匹配，通常是通过捕捉用户最后一句话的关键词/关键短语来进行回应，比较知名的两个应用是 ELIZA 和 AIML。
    - AIML（人工智能标记语言），[代码示例](https://github.com/Shuang0420/aiml)，支持 python3、中文、* 扩展
- **Tree and FSM**
  - 把对话建模为通过树或有限状态机（图结构）的路径。 相比于 simple reactive approach，这种方法融合了更多的上下文，能用一组有限的信息交换模板来完成对话的建模。
  - 这种方法适用于：
    - 系统主导
    - 需要从用户收集特定信息
    - 用户对每个问题的回答在有限集合中
  -  FSM，把对话看做是在有限状态内跳转的过程，每个状态都有对应的动作和回复，如果能从开始节点顺利的流转到终止节点，任务就完成了。
  - ![](https://pic2.zhimg.com/80/v2-1d52ccbfd607dd95c94a6f132181bf81_720w.jpg)
  - ![](https://pic4.zhimg.com/80/v2-06657b8968f5e2f352b44bf87599ff70_hd.jpg)
  - FSM 的状态对应系统问用户的问题，弧线对应将采取的行为，依赖于用户回答。
  - FSM-based DM 的特点是：
    - 人为定义对话流程
    - 完全由系统主导，系统问，用户答
    - 答非所问的情况直接忽略
    - 建模简单，能清晰明了的把交互匹配到模型
    - 难以扩展，很容易变得复杂
    - 适用于简单任务，对简单信息获取很友好，难以处理复杂的问题
    - 缺少灵活性，表达能力有限，输入受限，对话结构/流转路径受限
    - 对特定领域要设计 task-specific FSM，简单的任务 FSM 可以比较轻松的搞定，但稍复杂的问题就困难了，毕竟要考虑对话中的各种可能组合，编写和维护都要细节导向，非常耗时。一旦要扩展 FSM，哪怕只是去 handle 一个新的 observation，都要考虑很多问题。实际中，通常会加入其它机制（如变量等）来扩展 FSM 的表达能力。

#### （2）**Principle-based Approaches**

- Frame-based
  - Frame-based approach 通过允许多条路径更灵活的获得信息的方法扩展了基于 FSM 的方法，它将对话建模成一个填槽的过程，槽就是多轮对话过程中将初步用户意图转化为明确用户指令所需要补全的信息。一个槽与任务处理中所需要获取的一种信息相对应。槽直接没有顺序，缺什么槽就向用户询问对应的信息。
  - ![](https://pic4.zhimg.com/80/v2-5c0585ce7c8a8790e36bcdc721a7f1ce_hd.jpg)
  - Frame-based DM 包含下面一些要素：
    - Frame： 是槽位的集合，定义了需要由用户提供什么信息
    - 对话状态：记录了哪些槽位已经被填充
    - 行为选择：下一步该做什么，填充什么槽位，还是进行何种操作
    - 行为选择可以按槽位填充/槽位加权填充，或者是利用本体选择
  - 基于框架/模板的系统本质上是一个生成系统，不同类型的输入激发不同的生成规则，每个生成能够灵活的填入相应的模板。常常用于用户可能采取的行为相对有限、只希望用户在这些行为中进行少许转换的场合。
  - Frame-based DM 特点：
    - 用户回答可以包含任何一个片段/全部的槽信息
    - 系统来决定下一个行为
    - 支持混合主导型系统
    - 相对灵活的输入，支持多种输入/多种顺序
    - 适用于相对复杂的信息获取
    - 难以应对更复杂的情境
    - 缺少层次
  - 槽的更多信息可以参考[填槽与多轮对话-AI产品经理需要了解的AI技术概念](https://link.zhihu.com/?target=http%3A//www.pmcaff.com/article/index/971158746030208%3Ffrom%3Drelated%26pmc_param%255Bentry_id%255D%3D950709304427648)
- Agenda + Frame
  - Agenda + Frame(CMU Communicator) 对 frame model 进行了改进，有了层次结构，能应对更复杂的信息获取，支持话题切换、回退、退出。主要要素如下：
    - product
      - 树的结构，能够反映为完成这个任务需要的所有信息的顺序
      - 相比于普通的 Tree and FSM approach，这里产品树（product tree）的创新在于它是动态的，可以在 session 中对树进行一系列操作比如加一个子树或者挪动子树
    - process
      - agenda
        - 相当于任务的计划（plan）
        - 类似栈的结构（generalization of stack）
        - 是话题的有序列表（ordered list of topics）
        - 是 handler 的有序列表（list of handlers），handler 有优先级
      - handler
        - 产品树上的每个节点对应一个 handler，一个 handler 封装了一个 information item
  - 从 product tree 从左到右、深度优先遍历生成 agenda 的顺序。当用户输入时，系统按照 agenda 中的顺序调用每个 handler，每个 handler 尝试解释并回应用户输入。handler 捕获到信息就把信息标记为 consumed，这保证了一个 information item 只能被一个 handler 消费。
- Information-State
  - Information State Theories 提出的背景是：
    - 很难去评估各种 DM 系统
    - 理论和实践模型存在很大的 gap
      - 理论型模型有：logic-based, BDI, plan-based, attention/intention
      - 实践中模型大多数是 finite-state 或者 frame-based
    - 即使从理论模型出发，也有很多种实现方法
  - Information State Models 作为对话建模的形式化理论，为工程化实现提供了理论指导，也为改进当前对话系统提供了大的方向。Information-state theory 的关键是识别对话中流转信息的 relevant aspects，以及这些成分是怎么被更新的，更新过程又是怎么被控制的。idea 其实比较简单，不过执行很复杂罢了
  - ![](https://pic4.zhimg.com/80/v2-bd700b2e509e7d2d84a8ffad91a9ce55_hd.jpg)
- Plan
  - 一般指大名鼎鼎的 BDI (Belief, Desire, Intention) 模型。起源于三篇经典论文：
    - Cohen and Perrault 1979
    - Perrault and Allen 1980
    - Allen and Perrault 1980
  - 基本假设是，一个试图发现信息的行为人，能够利用标准的 plan 找到让听话人告诉说话人该信息的 plan。这就是 Cohen and Perrault 1979 提到的 AI Plan model，Perrault and Allen 1980 和 Allen and Perrault 1980 将 BDI 应用于理解，特别是间接言语语效的理解，本质上是对 Searle 1975 的 speech acts 给出了可计算的形式体系。
  - 重要的概念：goals, actions, plan construction, plan inference。
  - 理解上有点绕，简单来说就是 agent 会捕捉对 internal state (beliefs) 有益的信息，然后这个 state 与 agent 当前目标（goals/desires）相结合，再然后计划（plan/intention）就会被选择并执行。对于 communicative agents 而言，plan 的行为就是单个的 speech acts。speech acts 可以是复合（composite）或原子（atomic）的，从而允许 agent 按照计划步骤传达复杂或简单的 conceptual utterance。
  - 这里简单提一下重要的概念。
    - 信念（Belief）：基于谓词 KNOW，如果 A 相信 P 为真，那么用 B(A, P) 来表示
    - 期望（Desire）：基于谓词 WANT，如果 S 希望 P 为真（S 想要实现 P），那么用 WANT(S, P) 来表示，P 可以是一些行为的状态或者实现，W(S, ACT(H)) 表示 S 想让 H 来做 ACT
  - Belief 和 WANT 的逻辑都是基于公理。最简单的是基于 action schema。每个 action 都有下面的参数集：
    - 前提（precondition）：为成功实施该行为必须为真的条件
    - 效果（effect）：成功实施该行为后变为真的条件
    - 体（body）：为实施该行为必须达到的部分有序的目标集（partially ordered goal states）
- 更多见 [Plan-based models of dialogue](https://citeseerx.ist.psu.edu/viewdoc/download%3Fdoi%3D10.1.1.65.8451%26rep%3Drep1%26type%3Dpdf)

#### （3）**Statistical Approaches**

- RL-Based Approaches
  - 前面提到的很多方法还是需要人工来定规则的（hand-crafted approaches），然而人很难预测所有可能的场景，这种方法也并不能重用，换个任务就需要从头再来。而一般的基于统计的方法又需要大量的数据。再者，对话系统的评估也需要花费很大的代价。
  - 这种情况下，强化学习的优势就凸显出来了。RL-Based DM 能够对系统理解用户输入的不确定性进行建模，让算法来自己学习最好的行为序列。首先利用 simulated user 模拟真实用户产生各种各样的行为（捕捉了真实用户行为的丰富性），然后由系统和 simulated user 进行交互，根据 reward function 奖励好的行为，惩罚坏的行为，优化行为序列。由于 simulated user 只用在少量的人机互动语料中训练，并没有大量数据的需求，不过 user simulation 也是个很难的任务就是了。
  - ![](https://pic3.zhimg.com/80/v2-a499aef3d6e5bf09ea9e4239415c1ee6_hd.jpg)


### 有限状态机FSM

- `有限状态机`（Finite-state machine, `FSM`），又称**有限状态自动机**，简称状态机，是表示有限个状态以及在这些状态之间的转移和动作等行为的数学模型。
  - FSM是一种算法思想，简单而言，有限状态机由一组状态、一个初始状态、输入和根据输入及现有状态转换为下一个状态的转换函数组成。
- 在描述有限状态机时，状态、事件、转换和动作是经常会碰到的几个基本概念。
  - **状态**（State）　：对象在其生命周期中的一种状况，处于某个特定状态中的对象必然会满足某些条件、执行某些动作或者是等待某些事件。
  - **事件**（Event）　：在时间和空间上占有一定位置，并且对状态机来讲是有意义的那些事情。事件通常会引起状态的变迁，促使状态机从一种状态切换到另一种状态。
  - **转换**（Transition）：两个状态之间的一种关系，表明对象将在第一个状态中执行一定的动作，并将在某个事件发生同时某个特定条件满足时进入第二个状态。
  - **动作**（Action）：状态机中可以执行的那些原子操作，所谓原子操作指的是它们在运行的过程中不能被其他消息所中断，必须一直执行下去。

- FSME是一个基于Qt的有限状态机工具，它能够让用户通过图形化的方式来对程序中所需要的状态机进行建模，并且还能够自动生成用C++或者Python实现的状态机框架代码。
- 类似的还有[QFSM](http://qfsm.sourceforge.net/download.html)：A graphical tool for designing finite state machines
- ![](https://www.ibm.com/developerworks/cn/linux/l-fsmachine/image/2.jpg)




**Python版本**

- [Transitions](https://github.com/pytransitions/transitions)
- [Python的Transitions库实现有限状态机(FSM)](https://www.jianshu.com/p/decf86e0e420)

![](https://upload-images.jianshu.io/upload_images/618241-70acdf59c5f312c8.png)

- 安装方法

```shell
conda install transitions graphviz
```


- Machine示例

```python
from transitions import Machine
# 定义模型
class AModel(object):
    def __init__(self):
        self.sv = 0  # state variable of the model
        self.conditions = {  # each state
            'sA': 0,
            'sB': 3,
            'sC': 6,
            'sD': 0,
        }
    def poll(self):
        if self.sv >= self.conditions[self.state]:
            self.next_state()  # go to next state
        else:
            getattr(self, 'to_%s' % self.state)()  # enter current state again
    def on_enter(self):
        print('entered state %s' % self.state)
    def on_exit(self):
        print('exited state %s' % self.state)
# setup model and state machine
model = AModel()
# 状态集合 init transitions model 
list_of_states = ['sA', 'sB', 'sC', 'sD']
machine = Machine(model=model, states=list_of_states, initial='sA',
                  ordered_transitions=True, before_state_change='on_exit',
                  after_state_change='on_enter')
# begin main
for i in range(0, 10):
    print('iter is: ' + str(i) + " -model state is:" +  model.state)
    model.sv = i
    model.poll()
```
- GraphMachine示例，可以画图

```python
from transitions.extensions import GraphMachine
# 定义状态集合
states = ['first', 'second']
# 定义转移集合
transitions = [
    ['any_trigger', 'first', 'first'],
    ['anything', '*', 'second'],
]
machine = GraphMachine(states=states, transitions=transitions, initial='first',
                       auto_transitions=False, show_conditions=True)
# 绘制状态机
machine.get_graph().draw('fsm.png', prog='dot')
from IPython.display import Image
Image('fsm.png')
```
- 结果
![](https://upload-images.jianshu.io/upload_images/618241-70acdf59c5f312c8.png)

**java版本**

- [FSM-Java](https://gitlab.com/tengbai/fsm-java)，项目中共有4中状态机的实现方式。参考：[Java有限状态机4种实现对比](https://zhuanlan.zhihu.com/p/97442825)
  - 基于Switch语句实现的有限状态机，代码在master分支
  - 基于State模式实现的有限状态机。代码在state-pattern分支
  - 基于状态集合实现的有限状态机。代码在collection-state分支
  - 基于枚举实现的状态机。代码在enum-state分支
- [squirrel](https://github.com/hekailiang/squirrel)

![](https://camo.githubusercontent.com/c7aa76914060369995ee7ac173c16512634ab0cb/687474703a2f2f68656b61696c69616e672e6769746875622e696f2f737175697272656c2f696d616765732f41544d53746174654d616368696e652e706e67)


### 状态机适用条件

- 状态机问题
  - ① 状态机模型的最大缺陷：<font color='blue'>所有状态都提前预知了才能够规划代码</font>，所以也叫有限状态机。以有限的状态应对可能比预期更多的状态，一旦遇到新增一个状态，全部状态机代码都得重审一遍，以免遗漏状态切换。
  - ② 还有大量的数据一般都是共享的，状态机模型对数据的封闭不利，对一些本来适合在函数参数中传递的变量，适合在private中封闭掉的数据，常常被迫敞开。
  - ③ 状态机的架构不太适合多线程模型，有限状态机流行的年代，高效多线程架构还不流行，这方面都是欠缺的。
- 最重要的是状态清晰，粒度适中，状态迁移图明确可靠。一般的状态机状态数量4到8个，太少太简单，太多要注意适当切分。

- 【2021-2-24】[达摩院Conversational AI研究进展及应用](https://t.cj.sina.com.cn/articles/view/2674405451/9f68304b01900tdaj)
- 基于状态机的对话管理主要面临两个问题：
  - 第一：通过配置的方法，永远无法把整个对话流配置完备，总会有漏掉的配置；
  - 第二：基于状态机的对话管理，本质上仍是一个规则化的对话引擎，即使积累再多的日志和数据，也没有办法具备学习能力。
- 基于以上两点，把对话管理从状态机推到深度模型，就是一条必然的路径，但是目前学术界尤其是工业界还没有解决这个问题，这个问题的核心难点是多轮对话数据获取难、标注难。
- （1）标注数据采集
  - 达摩院引入了用户模拟器，把用户模拟器和对话系统结合在一起，通过两者之间的Self-Play产生海量的标注数据来解决数据难题。
  - ![](https://n.sinaimg.cn/sinakd2021222s/71/w1080h591/20210222/ee22-kkmphps2654246.png)
  - 在用户模拟器和对话系统的对偶模型中有两个模块：
    - 对话机器人：每一轮中说机器应该说的那句话
    - 用户模拟器：模拟用户这个角色应该说的话
  - 这样就形成了机器和用户之间的对话过程，产生大量的对话数据，而这些数据最大的优势就是：这些数据是带有标签的。
- （2）深度模型
  - 基于以上的基础建模，达摩院实现了对话管理的深度学习模型化，并且在业务场景中进行了大规模的落地应用：
  - ![](https://n.sinaimg.cn/sinakd2021222s/771/w1080h491/20210222/a94c-kkmphps2654353.png)
  - 整个过程分为以下三部分：
    - Step1：利用用户模拟器冷启动对话管理模型，产生大量的模拟训练数据，通过模拟训练数据即可对模型进行训练，得到可直接上线的模型；
    - Step2：模型上线之后会产生日志数据，可以利用这些日志数据来进行数据增强，通过模拟器的迭代来提升模型的效果；
    - Step3：对于产生的日志数据，也可以通过人力适量标注一部分来进一步提升模型的效果；
  - 通过引入用户模拟机器，解决了对话管理的深度学习模型化问题。
- （3）对话管理模型的迁移学习
  - ![](https://n.sinaimg.cn/sinakd2021222s/30/w1080h550/20210222/9746-kkmphps2654354.png)
  - 在实际应用的时候还遇到了新的问题：当我们有了一些场景的标注数据以及训练好的模型之后，在面对新的应用场景时，如何将已有的数据和模型复用起来。
  - ![](https://n.sinaimg.cn/sinakd2021222s/85/w1080h605/20210222/a2ec-kkmphps2654476.png)
  - 针对这一新的问题，达摩院考虑使用迁移学习的方法来进行解决。为此对迁移学习在这方面的应用做了一定的研究，最终提出了一个Meta-Dialog Model，对应的工作发表在ACL2020上。主要思想是将MAML（Model-Agnostic Meta-Learning）这种迁移学习的思路引入进来：在已有数据的前提下，利用MAML迁移学习的方法训练出一个比较好的元模型（Meta Model）, 当有新的场景时，可以用元模型的参数来进行初始化，这可以使得新场景下的模型有更好的初始化参数和训练起点。基于这种方法，在政务12345热线上进行了实验，得到了4个点的提升。



### Google [Dialogflow](https://dialogflow.com/)

![](https://ss.csdn.net/p?http://mmbiz.qpic.cn/mmbiz_png/rFWVXwibLGtw9fIXO7xspXUwFLRz3hDqY3RomibnP9iaEcSYibnqE8ypnJ8BvTZemsWD1zGQDhAJquFNmQic28JYyGQ/640?wx_fmt=png&wxfrom=5&wx_lazy=1)
- DialogFlow是基于谷歌的Duplex技术开发，该技术使得客户获得更好的人机交互体验，使得对话聊天更加自然。推出 Dialogflow (https://dialogflow.com)，用于替代 API.AI，将 Dialogflow 打造成您构建出色的对话体验的端到端平台
  - API.AI 是一家B2D(business to developer)公司，是一个为开发者提供服务的机器人搭建平台，帮助开发者迅速开发一款bot并把发布到各种message平台上。2016年9月被Google收购，是Google基于云的自然语言理解（NLU）解决方案
  - Dialogflow 提供了一个网页界面，称为 Dialogflow 控制台（[访问文档](https://cloud.google.com/dialogflow/docs/console?hl=zh_CN)，[打开控制台](https://dialogflow.cloud.google.com/?hl=zh_CN)）
  - ![](http://www.ctiforum.com/uploadfile/2019/0524/20190524111428379.jpg)
  - Dialogflow的工作原理。[智能客服技术专栏](http://cc.ctiforum.com/hujiaozhongxinjishu/ics/)，[解码Dialogflow：构建智能机器人入门](http://cc.ctiforum.com/jishu/hujiao/hujiaozhongxinjishu/ics/jishuwenzhai/556023.html)
    - 1.Dialogflow的输入可以是基于文本或人声的20种不同语言，包括一些本地方言，如英语（美国和英国）或中文（简体和繁体）。文本输入来自消息传递通道，包括SMS，Webchat和电子邮件。谷歌与Slack，Facebook Messenger，Google智能助理，Twitter，微软Skype和Skype for Business，思科Webex Teams，Twilio，Viber，Line，Telegram和Kik建立了Dialogflow集成。来自Amazon和Microsoft的SMS，电子邮件和语音助理需要额外的编码或消息处理才能输入Dialogflow。
    - 2.基于文本的消息可以通过可选的拼写检查程序。当人们输入或使用短信时，拼写错误很常见。纠正拼写错误将提高自然语言理解引擎的准确性。
    - 3.Dialogflow的语音呼叫通过Google的语音到文本处理器，将用户的语音输入转换为文本流。
    - 4.将语音转换为文本或输入文本已更正后，生成的文本流将传递到Dialogflow中的自然语言理解引擎。这实际上是支持智能机器人创建的核心元素。
      - Dialogflow首先检查文本流并尝试找出用户的意图。意图是用户想要的--为什么他或她首先与机器人交互。获得正确的意图至关重要。（我们将在后续文章中讨论如何创建Dialogflow意图。）
      - 意图的例子可以是“我想知道天气预报”，“我的银行余额是什么”，以及“我想要预订”。
      - 意图通常具有与之关联的实体，例如名称，日期和位置。如果你想知道天气，你需要告诉机器人的位置。如果您想知道您的银行余额，那么机器人将需要获取该帐户的名称。一些比如日期，时间，地点和货币都是开箱即用的，并且是作为Google技术堆栈的一部分启用的。
      - Dialogflow支持上下文的概念来管理会话状态，流和分支。上下文用于跟踪对话的状态，并且它们会在根据用户之前的回复指导对话时影响匹配的意图。上下文有助于使交互感觉自然而真实。
      - Slots是与实体关联的参数。在银行余额意图示例中，实体是该人的姓名。Slot可能是正在寻找余额的人名下的特定帐号。如果您要预订机票，您的座位偏好（窗口或过道）是slot值。
      - 使用Dialogflow创建智能机器人需要开发人员考虑机器人应该处理的所有意图以及用户阐明此意图的所有不同方式。然后，对于每个意图，开发人员必须识别与该意图相关联的实体，以及与每个实体相关的任何slots。如果查询中缺少实体（entity）和/或slot，则机器人需要弄清楚如何向用户询问它。
    - 5.一旦Dialogflow识别出intent，entities和slot值，它就会将此信息移交给满足意图的软件代码。实现意图可能包括进行数据库检索以查找用户正在查找的信息，或者为后端或基于云的系统调用某种API。例如，如果用户要求提供银行信息，则此代码将与银行应用程序连接。如果意图是用于HR策略信息，则代码触发数据库搜索以检索所请求的信息。
    - 6.一旦检索到必要的信息将通过Dialogflow传回并返回给用户。如果交互是基于文本的，则在调用以发送消息的同一渠道中将文本响应发送回用户。如果是语音请求，则将文本转换为语音响应用户。
　　当Dialogflow通过其中一个联络中心合作伙伴作为CCAI的一部分进行集成时，流程变得有点复杂，但功能更强大。
- 自然语言处理（NLP）算法可以计算两种不同类型的对话内容。
  - ①基于**意图**(Intent-based)的对话：这是当NLP算法使用intents和entities进行对话时，通过识别用户声明中的名词和动词，然后与它的dictionary交叉引用，让bot可以执行有效的操作，这种类型的对话是Dialogflow使用的。
  - ②基于**流程**(Flow-based)的对话：基于流程的对话是智能通信的下一个级别。在这里，我们会给予两个人之间对话的许多不同样本的RNN（循环神经网络），创建的机器人将根据你训练的ML模型进行响应。Wit.ai是在这个领域取得巨大进展的少数网站之一，不用担心，我们不需要做到这个程度。
  - Dialogflow 可以与 Google 助理、Slack 和 Facebook Messenger 等许多热门对话平台集成。
  - （1）在集成服务中使用 Fulfillment
    - ![](https://img-blog.csdnimg.cn/20201203084116392.png)
  - （2）通过 API 实现用户互动
    - 如果没有使用某个集成选项，则必须编写与最终用户直接交互的代码。必须为每轮对话直接与 Dialogflow 的 API 交互，以发送最终用户表述并接收意图匹配信息。下图展示了使用该 API 进行互动的处理流程。
    - ![](https://img-blog.csdnimg.cn/20201203084131857.png)
- 参考：
  - [Dialogueflow基础知识](https://cloud.google.com/dialogflow/docs/basics?hl=zh-cn)
  - [Dialogflow ES 基础知识](https://blog.csdn.net/Daniel462038751/article/details/110517486)
  - [利用Dialogflow构建聊天机器人](https://blog.csdn.net/WebEye_Marketing/article/details/111637129)，当用户在 Google Chat 中提出问题时，启动的聊天机器人会与 Dialogflow 集成，来进行自然的对话，Dialogflow 通过 Cloud Functions 实现与后端数据库或 Sheets集成。含youtube视频介绍，[解构聊天机器人系列视频](https://www.youtube.com/playlist?list=PLIivdWyY5sqK5SM34zbkitWLOV-b3V40B)
  - [聊天机器人教学：使用Dialogflow (API.AI)开发 iOS Chatbot App](https://www.jianshu.com/p/48cc2e0343f4?utm_campaign=maleskine)，酒店预订示例代码：[ChatbotHotel](https://github.com/appcoda/ChatbotHotel)
- 登录自己的Google帐户，可以按照以下步骤登录Dialogflow：https://console.dialogflow.com/api-client/#/login
- ![](https://img-blog.csdnimg.cn/20210303193604774.png)
- 代理agent
  - Dialogflow 代理是负责与终端用户对话的虚拟客服人员。它是一种NLU模块，能够理解人类语言的细微差别。Dialogflow 可以在对话过程中将用户输入的文字和音频转换为应用和服务可以理解的结构化数据。您可以设计并构建 Dialogflow 代理来负责您的系统所需的各种对话。
  - Dialogflow 代理类似于人类呼叫中心的客服人员。您可以对代理/客服人员进行训练来处理预期的对话场景，您的训练不需要过于明确
- **意图** Intents
  - 用户每轮对话的[意图](https://cloud.google.com/dialogflow/docs/intents-overview?hl=zh_CN)进行分类。可以为每个agent定义多个意图，组合意图可以处理一段完整的对话。当终端用户输入文字或说出话语（称为“终端用户表述”时，Dialogflow 会将用户表述与agent中最佳意图进行匹配。**匹配**意图也又称为“**意图分类**”。
  - 例如，创建一个天气agent，用于识别并响应用户关于天气的问题。您可以为与天气预报有关的问题定义一个意图。如果最终用户说出“What's the forecast?”，Dialogflow 会将该用户表述与预测意图相匹配。您还可以定义意图，以便从最终用户表述中提取实用信息，例如所需哪个时间或地方的天气预报。提取的数据对于系统为最终用户执行天气查询非常重要。
  - ![](https://img-blog.csdnimg.cn/20201203084019644.png)
- 基本意图包含以下内容：
  - [训练语句](https://cloud.google.com/dialogflow/docs/intents-training-phrases?hl=zh-cn)：这些是最终用户可能说出的语句示例。 当最终用户的表述与其中某一语句相近时，Dialogflow 会将其视为匹配意图。Dialogflow 的内置机器学习功能会根据您的列表扩展出其他相似的语句，因此您无需定义所有可能出现的示例。
  - [操作](https://cloud.google.com/dialogflow/docs/intents-actions-parameters?hl=zh-cn#actions)：您可以为每个意图定义一项操作。 当某个意图匹配时，Dialogflow 会向系统提供该操作，您可以使用该操作触发系统中定义的特定操作。
  - [参数](https://cloud.google.com/dialogflow/docs/intents-actions-parameters?hl=zh-cn#params)：当某个意图在运行时匹配时，Dialogflow 会以“参数”形式提供从最终用户表述中提取的值。 每个参数都有一个类型，称为实体类型，用于明确说明数据的提取方式。 与原始的最终用户输入不同，参数是结构化数据，可以轻松用于执行某些逻辑或生成响应。
  - [响应](https://cloud.google.com/dialogflow/docs/intents-responses?hl=zh-cn)：您可以定义要返回给最终用户的文本、语音或视觉响应。 这些响应可能是为最终用户提供解答、向最终用户询问更多信息或终止对话。
  - 下图展示了匹配意图和响应最终用户的基本流程：
    - ![](https://img-blog.csdnimg.cn/20201203084037155.png)
  - 更复杂的意图还可能包含以下内容：
  - [上下文](https://cloud.google.com/dialogflow/docs/contexts-overview?hl=zh-cn)：Dialogflow 上下文类似于自然语言上下文。 如果有人对您说“它们是橙色的”，您需要了解上下文才能理解此人所指的是什么。 同样，为了让 - Dialogflow 处理类似的最终用户表述，您需要为其提供上下文，以便系统正确地匹配意图。
  - 事件：借助事件，您可以根据已发生的情况而非最终用户表达的内容来调用意图。
- **实体** Entities
  - 每个意图参数都有一个类型，称为实体类型，用于明确说明从用户表述中提取数据的方式。
  - Dialogflow 提供预定义的[系统实体](https://cloud.google.com/dialogflow/docs/entities-system?hl=zh_CN)，这些实体可以匹配许多常见的数据类型。 例如，您可以使用系统实体来匹配日期、时间、颜色、电子邮件地址等类型。 您还可以自行创建[自定义实体](https://cloud.google.com/dialogflow/docs/entities-custom?hl=zh_CN)来匹配自定义数据。 例如，您可以定义一个 vegetable 实体，以匹配杂货店代理出售的蔬菜类型。
- **上下文**
  - Dialogflow 上下文类似于自然语言上下文。 如果有人对您说“它们是橙色的”，您需要了解上下文才能理解“它们”指的是什么。 同样，为了让 Dialogflow 顺利处理类似的最终用户表述，您需要为其提供上下文，以便系统正确地匹配意图。
  - 您可以使用上下文来控制对话流程。 您可以为意图配置上下文，方法是设置由字符串名称标识的[输入和输出上下文](https://cloud.google.com/dialogflow/docs/contexts-input-output?hl=zh_CN)。 当某个意图匹配时，为该意图配置的所有输出上下文都将变为活跃状态。 当所有上下文处于活跃状态时，Dialogflow 更可能匹配配置了输入上下文，且该上下文与当前活跃上下文匹配的意图。
- 下图是一个将上下文用于银行代理的示例。
  - ![](https://img-blog.csdnimg.cn/20201203084054337.png)
  1. 用户询问其支票账户的相关信息。
  2. Dialogflow 将此最终用户表述与 CheckingInfo 意图匹配。此意图具有 checking 输出上下文，因此上下文变为活跃状态。
  3. 代理询问最终用户他们希望了解支票账户的哪类信息。
  4. 最终用户回复“my balance”。
  5. Dialogflow 将此最终用户表述与 CheckingBalance 意图匹配。此意图具有 checking 输入上下文，该上下文需要处于活跃状态才能匹配此意图。当 savings 上下文处于活跃状态时，也可能存在类似的 SavingsBalance 意图来匹配该最终用户表述。
  6. 系统执行必要的数据库查询后，代理会回复该支票账户的余额。
- 后续意图
  - 您可以使用后续意图自动设置意图对的上下文。后续意图是相关父意图下的子意图。创建后续意图时，系统会将输出上下文添加到父意图中，并将同名的输入上下文添加到子意图中。只有父意图在上一轮对话中匹配时，系统才会匹配后续意图。您还可以创建多个级别的嵌套后续意图。
  - Dialogflow 提供多个预定义后续意图，旨在处理“是”、“否”或“取消”等常见的最终用户回复。您还可以创建自己的后续意图来处理自定义回复。


### [Chatterbot](https://github.com/gunthercox/ChatterBot)

![](https://camo.githubusercontent.com/b6aaad134a52f6a76001c91321fe81a2c889c45f/68747470733a2f2f692e696d6775722e636f6d2f623353436d47542e706e67)

- 安装
  - pip install chatterbot
- 使用

```python
from chatterbot import ChatBot
from chatterbot.trainers import ChatterBotCorpusTrainer
chatbot = ChatBot('Ron Obvious')
# Create a new trainer for the chatbot
trainer = ChatterBotCorpusTrainer(chatbot)
# Train the chatbot based on the english corpus
trainer.train("chatterbot.corpus.english")
# Get a response to an input statement
chatbot.get_response("Hello, how are you today?")
```

An example of typical input would be something like this:

>- user: Good morning! How are you doing?
>- bot: I am doing very well, thank you for asking.
>- user: You're welcome.
>- bot: Do you like hats?

### Rasa

- 为什么使用Rasa而不是使用wit、luis、dialogflow这些服务？
  - （1）不必把数据交给FackBook/MSFT/Google；
    - 已有的NLU工具，大多是以服务的方式，通过调用远程http的restful API来对目标语句进行解析完成上述两个任务。如Google的[API.ai](http://api.ai/)（收购后更名为Dialogueflow）, Microsoft的[Luis.ai](http://luis.at/), Facebook的[Wit.ai](http://wit.ai/)等。刚刚被百度收购的[Kitt.ai](http://kitt.ai/)除了百度拿出来秀的语音唤醒之外，其实也有一大部分工作是在NLU上面，他们很有启发性的的Chatflow就包含了一个自己的NLU引擎。
    - 对于数据敏感的用户来说，开源的NLU工具如Rasa.ai提供了另一条路。更加重要的是，可以本地部署，针对实际需求训练和调整模型，据说对一些特定领域的需求效果要比那些通用的在线NLU服务还要好很多。
    - Rasa NLU本身是只支持英文和德文的。中文因为其特殊性需要加入特定的tokenizer（如jieba）作为整个流水线的一部分。代码在[github](https://github.com/crownpku/rasa_nlu_chi)上。
  - （2）不必每次都做http请求；
  - （3）你可以在特殊的场景中调整模型，保证更有效。
- 示例
  - [RASA中文聊天机器人项目](https://github.com/jiangdongguo/ChitChatAssistant)
  - [使用Rasa_core和Rasa_nls框架搭建问答机器人](https://blog.csdn.net/Solitarily/article/details/84251628)，训练，在线学习
  - ![](https://img-blog.csdnimg.cn/2018111915173690.jpg)

- Rasa是一个开源机器学习框架，用于构建上下文AI助手和聊天机器人。
  - 安装：
    - pip install rasa_nlu
    - pip install rasa_core[tensorflow]
- Rasa有两个主要模块：
  - **Rasa NLU** （`NLU`）：用于理解用户消息，包括意图识别和实体识别，它会把用户的输入转换为结构化的数据。
    - 支持不同的 Pipeline，其后端实现可支持spaCy、MITIE、MITIE + sklearn 以及 tensorflow，其中 spaCy 是官方推荐的，另外值得注意的是从 0.12 版本后，MITIE 就被列入 Deprecated 了。
    - rasa nlu 支持不同的 Pipeline，其后端实现可支持 spaCy、MITIE、MITIE + sklearn 以及 tensorflow，其中 spaCy 是官方推荐的，另外值得注意的是从 0.12 版本后，MITIE 就被列入 Deprecated 了
    - 最重要的两个 pipeline 是：`supervised_embeddings` 和 `pretrained_embeddings_spacy`。
      - 最大的区别是：pretrained_embeddings_spacy pipeline 是来自 GloVe 或 fastText 的预训练词向量；supervised_embeddings pipeline 不使用任何预先训练的词向量，是为了你的训练集而用的。
      - ① `pretrained_embeddings_spacy`：优势在于，当你有一个训练示例，比如：“我想买苹果”，并且要求 Rasa 预测“买梨”的意图，那么你的模型已经知道“苹果”和“梨子”这两个词非常相似，如果你没有太多的训练数据，这将很有用。
      - ② `supervised_embeddings`：优势在于，针对你的 domain 自定义词向量。例如：在英语中单词 "balance" 与 "symmetry" 密切相关，但是与单词 "cash" 有很大不同。在银行领域，"balance" 与 "cash" 密切相关，你希望你的模型能够做到这一点。该 pipeline 不使用特定语言模型，因此它可以与任何你分好词（空格分词或自定义分词）的语言一起使用。该模式支持任何语言。默认情况下，它以空格进行分词
      - ③ `MITIE`：可以在 pipeline 中使用 MITIE 作为词向量的来源，从语料库中训练词向量，使用 MITIE 的特征器和多类分类器。该版本的训练可能很慢，所以不建议用于大型数据集上。
        - MITIE 后端对于**小数据集**表现良好，但如果有数百个以上的示例，训练时间可能会花费很长时间。不建议使用，因为在将来的版本中可能不再支持 MITIE。
        - 中文语料源：[awesome-chinese-nlp](https://github.com/crownpku/awesome-chinese-nlp)中列出的中文wikipedia dump和百度百科语料，[MITIE训练](https://github.com/mit-nlp/MITIE)耗时，也可以直接使用训练好的文件：中文 wikipedia 和百度百科语料生成的模型文件 total_word_feature_extractor_chi.dat，[百度云链接](https://pan.baidu.com/s/1kNENvlHLYWZIddmtWJ7Pdg),密码：p4vx
        - 仅仅获取语料还不够，因为MITIE模型训练的输入是以词为单位的。所以要先进行分词，如jieba
        - MITIE模型训练, 详见：[用Rasa NLU构建自己的中文NLU系统](https://blog.csdn.net/QFire/article/details/78964212)
      - ④ 自定义 Pipelines：可以选择不使用模板，通过列出要使用的组件名称来自定义自己的 pipeline
      - 参考
        - [rasa算法_Rasa 入门教程 NLU 系列（三）](https://blog.csdn.net/weixin_26729841/article/details/112484055)
    - **如何选择pipeline**？
      - 训练数据集<1000: 用语言模型 spaCy，使用 `pretraine_embeddings_spacy` 作为 pipeline， 它用GloVe 或 fastText 的预训练词向量
      - 训练数据集≥1000或带有标签的数据：supervised_embeddings 作为 pipeline，它不使用任何预先训练的词向量，只用训练集
    - **类别不平衡**
      - 如果存在很大的类别不平衡，例如：有很多针对某些意图的训练数据，但是其他意图的训练数据很少，通常情况下分类算法表现不佳。为了缓解这个问题，rasa 的 `supervised_embeddings` pipeline 使用了 **balanced** 批处理策略
    - **多意图**
      - 将意图拆分为多个标签，比如预测多个意图或者建模分层意图结构，那么只能使用**有监督**的嵌入 pipeline 来执行此操作。因此，需要使用这些标识：WhitespaceTokenizer：intent_split_symbol：设置分隔符字符串以拆分意图标签，默认 _ 。
    - Rasa提供了数据**标注平台**: [rasa-nlu-trainer](https://rasahq.github.io/rasa-nlu-trainer/)
  - **Rasa Core** (`DM`)：对话管理平台，用于举行对话和决定下一步做什么。Rasa Core是用于构建AI助手的对话引擎，是开源Rasa框架的一部分。
    - 负责协调聊天机器人的各个模块，起到维护人机对话的结构和状态的作用。对话管理模块涉及到的关键技术包括对话行为识别、对话状态识别、对话策略学习以及行为预测、对话奖励等。
    - Rasa消息响应过程
      - ![](https://upload-images.jianshu.io/upload_images/3285850-ece175b3a873ff90)
      - 首先，将用户输入的Message传递到Interpreter(NLU模块)，该模块负责识别Message中的"意图(intent)“和提取所有"实体”(entity)数据；
      - 其次，Rasa Core会将Interpreter提取到的意图和识别传给Tracker对象，该对象的主要作用是跟踪会话状态(conversation state)；
      - 第三，利用policy记录Tracker对象的当前状态，并选择执行相应的action，其中，这个action是被记录在Track对象中的；
      - 最后，将执行action返回的结果输出即完成一次人机交互。
    - Rasa Core包含两个内容： **stories** 和 **domain**。
      - domain.yml：包括对话系统所适用的领域，包含意图集合，实体集合和相应集合，相当于大脑框架，指定了意图`intents`， 实体`entities`， 插槽`slots`以及动作`actions`。
        - intents和entities与Rasa NLU模型训练样本中标记的一致。slot与标记的entities一致，actions为对话机器人对应用户的请求作出的动作。
        - 此外，domain.yml中的templates部分针对utter_类型action定义了模板消息，便于对话机器人对相关动作自动回复。
      - story.md：训练数据集合，原始对话在domain中的映射。
        - Stories
          - stories可以理解为对话的场景流程，需要告诉机器多轮场景是怎样的。Story样本数据就是Rasa Core对话系统要训练的样本，它描述了人机对话过程中可能出现的故事情节，通过对Stories样本和domain的训练得到人机对话系统所需的对话模型。
          - Rasa Core中提供了rasa_core.visualize模块可视化故事，有利于掌握设计故事流程。
  - Rasa Stack —— 汉化版 [Rasa_NLU_Chi](https://blog.csdn.net/QFire/article/details/96835309)
    - Rasa Stack 包括 Rasa NLU 和 Rasa Core，前者负责进行语义理解（意图识别和槽值提取），而后者负责会话管理，控制跟踪会话并决定下一步要做什么，两者都使用了机器学习的方法可以从真实的会话数据进行学习；另外他们之间还相互独立，可以单独使用
    - ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9qdmVyc29uLm9zcy1jbi1iZWlqaW5nLmFsaXl1bmNzLmNvbS8zMjI5YmE3NWMwYmZkYjhlYzNkYTIyM2E4NGE2NDkxMy5qcGc)
- **Rasa X**（web工具）是一个工具，可帮助您构建、改进和部署由Rasa框架提供支持的AI Assistants。 Rasa X包括用户界面和REST API。
  - ![](https://upload-images.jianshu.io/upload_images/3285850-26dd1db4512e05ac)
- 基本概念
  - intents：意图
  - pipeline：
  - **stories**：对话管理（dialogue management）是对话系统或者聊天机器人的核心，在 Rasa 中由 Rasa Core 负责，而这部分的训练数据在Rasa 中由 Stories 提供。Stories可以理解为对话的场景流程，一个 story 是一个用户和AI小助手之间真实的对话，这里面包含了可以反映用户输入（信息）的意图和实体以及小助手在回复中应该采取的 action（行动）
  - **domain** ：即知识库，其中定义了意图（intents)，动作（actions)，以及对应动作所反馈的内容模板（templates)，例如它能预测的用户意图，它可以处理的 actions，以及对应 actions 的响应内容。
  - rasa train : 模型训练,添加 NLU 或者 Core 数据，或者修改了domain和配置文件，需要重新训练模型
    - python -m rasa train --config configs/config.yml --domain configs/domain.yml --data data/


- 测试效果
  - 启动rasa服务：python -m rasa run --port 5005 --endpoints configs/endpoints.yml --credentials configs/credentials.yml --debug
  - 启动action服务：Python -m rasa run actions --port 5055 --actions actions --debug 
- Rasa Server、Action Server和Server.py运行后，在浏览器输入测试：
  - http://127.0.0.1:8088/ai?content=询广州明天的天气
  - [Rasa中文聊天机器人开发指南](https://blog.csdn.net/andrexpert/article/details/104328946), [github代码示例](RASA中文聊天机器人Github地址：ChitChatAssistant)
  - ![](https://img-blog.csdnimg.cn/20200227153932228.jpg?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L0FuZHJFeHBlcnQ=,size_16,color_FFFFFF,t_70)

- 测试命令
>python -m rasa_core.run -d models/chat1 -u models/nlu/model_20190820-105546
- 参数解释;
  - -d：modeldir 指定对话模型路径（即Rasa_core训练的模型路径）
  - -u：Rasa NLU训练的模型路径
  - --port：指定Rasa Core Web应用运行的端口号
  - --credentials：指定通道（input channels）属性
  - endpoints：用于指定Rasa Core连接其他web server的url地址，比如nlu web
  - -o：指定log日志文件输出路径
  - --debug：打印调试信息
![](https://upload-images.jianshu.io/upload_images/3285850-e7e8222092a723d7)

- 参考：
  - [Rasa 聊天机器人框架使用](https://www.jianshu.com/p/ad11f5815447)
  - Rasa官方文档： [Build contextual chatbots and AI assistants with Rasa](https://rasa.com/docs/rasa/)
  - github地址：[RasaHQ/rasa](https://github.com/RasaHQ/rasa)
