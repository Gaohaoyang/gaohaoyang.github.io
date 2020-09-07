---
layout: post
title:  "对话系统-Dialogue System"
date:   2020-04-28 21:45:00
categories: 深度学习
tags: 深度学习 NLP 对话系统 QA 多轮 闲聊 沈向洋 FSM 有限状态机 GPT 陈蕴侬 JSGF
excerpt: 对话系统技术图谱
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

- 【2020-7-30】[沈向洋：从深度学习到深度理解](https://www.toutiao.com/i6854955754193945096/?tt_from=mobile_qq&utm_campaign=client_share&timestamp=1596065543&app=news_article&utm_source=mobile_qq&utm_medium=toutiao_android&use_new_style=1&req_id=2020073007322301014412006713A3E050&group_id=6854955754193945096)
   - 现状：NLP需要更多参数，视觉需要更多层网络
   - ![](http://p1-tt.byteimg.com/large/pgc-image/S69UvxE2u3vZ2C?from=pc)
   - 这三个方面在实现robust AI时大有可为：
      - 其一，构建大规模的强机器学习仿真器。不仅是游戏，还有自动驾驶等复杂系统。
      - 其二，对于机器学习本质的深度理解。从优化功能开始，思考我们从里面真正学到的是什么。
      - 其三，基于神经与符号的混合模型（Hybrid Neural/Symbolic Model for Robust AI）。——今天演讲的重点
   - 雷蒙德微软研究院写了一篇论文，题目为《SOLOIST: Few-shot Task-Oriented Dialog with A Single Pre-trainedAuto-regressive Model》，文章中提出了一种新的方法，能够利用迁移学习进行高效地大规模构建面向任务的对话系统。
   - 文章有两个亮点
      - 其一是有个预训练模型GTG（Grounded Text generator）
      - 其二是该方法实现了真正的会话学习。下面我主要讲讲GTG。
   - ![](http://p1-tt.byteimg.com/large/pgc-image/S69UvxiDrKbqBH?from=pc)
   - GTG模型与GPT模型对比也有比较大的优势：GPT是学习如何理解和生成自然语言，而GTG是学习预测对话状态，产生grounded responses（真实响应）来完成任务。
   
- 【2020-8-10】[京东副总裁何晓冬：GPT-3后，人机对话与交互何去何从？CCF-GAIR 2020](https://www.leiphone.com/news/202008/BC6XqIXF3ifH6uvV.html)
![](https://static.leiphone.com/uploads/new/images/20200810/5f311dc980e89.jpg?imageView2/2/w/740)
![](https://static.leiphone.com/uploads/new/images/20200810/5f311dd451d94.png?imageView2/2/w/740)
![](https://static.leiphone.com/uploads/new/images/20200810/5f311e76b3824.png?imageView2/2/w/740)

- 【2020-7-6】台大陈蕴侬，[如何让任务型聊天机器人更加鲁棒](https://www.bilibili.com/video/BV1oa4y1h7Um/?spm_id_from=333.788.videocard.2)，[课程主页](https://www.csie.ntu.edu.tw/~miulab/s108-adl/)，[PPT链接](https://www.csie.ntu.edu.tw/~miulab/s108-adl/doc/)
<iframe src="//player.bilibili.com/player.html?aid=668813899&bvid=BV1oa4y1h7Um&cid=209423753&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="600" width="100%"> </iframe>

# 现状

- 参考资料
  - [对话生成：seq2seq模型原理及优化](https://zhuanlan.zhihu.com/p/69159062)

对话机器人是一个热门话题，大家熟知的应用和产品主要有三种：
- 第一种是`虚拟助手`，能对个人输入完成相应的任务或提供相应服务，典型的商业产品包括如siri、cortana、度秘等；
- 第二种是`智能音箱`，通过语音交互，完成用户任务，也能对智能家居设备进行控制。典型的商业产品包括如echo、天猫精灵、小爱同学等；
- 第三种是`闲聊对话`，在开放域与用户进行闲聊。典型的商业产品如：微软小冰。

![](https://upload-images.jianshu.io/upload_images/18270108-d3523b6e842e3494.png)

# 分类

对话机器人的任务类型可以分为三类：
- 第一类`任务型`对话，主要解决如订机票、订酒店等问题。
  - 涉及的技术包括：语义理解、意图识别、状态追踪、对话决策等；
- 第二类`知识型`对话，在寿险客服的场景里，用户可能会问“你这个保险要交多少钱？”这类问题。
  - 涉及的技术包括：文本表示、语义匹配、知识图谱等；
- 第三类`闲聊型`对话，用户可能只想找人聊聊天，对话不涉及到知识或业务，比如说“今天天气真好”。
  - 涉及的技术包括：文本生成模型、文本检索、排序技术等；

![](https://upload-images.jianshu.io/upload_images/18270108-74922f3390e8b699.png)


## 任务型对话

- 任务型对话的处理方式有`pipeline`和`端到端`两种结构
  - pipeline定义了数个模块，以一条line的形式串联起来共同完成一个任务，如下图所示。
  - 端到端的代表为memory network

### pipeline

![](https://www.pkudodo.com/wp-content/uploads/2019/06/pipeline.png)

**pipline模块**

- 其核心模块组成是`NLU`->`DM`->`NLG`
- NLU负责对用户输入进行理解，随后进入DM模块，负责系统状态的追踪以及对话策略的学习，控制系统的下一步动作，而NLG则配合系统将要采取的动作生成合适的对话反馈给用户。
- 其中若用户的输入是语音形式，则在NLU的输入前需再添加一个ASR语音识别模块，负责将语音信号转换为文本信号。
- `DM`对话管理器内部又可分为`DST`（对话状态追踪）和`DPL`（对话策略学习），`DST`（对话状态追踪）根据用户每一轮的输入更新当前的系统状态，而DPL则根据当前的系统状态决定下一步采取何种动作。
- `NLG`将语言生成后，若用户采用语音交互方式，则还需要`TTS`（语音合成）模块将文本转换为语音。

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
    - 论文一：Deep Neural Network Approach for the Dialog State Tracking Challenge
      - 使用n-gram滑动窗口，同时手工构造了12个特征函数来抽取特征，随后将所有特征送入DNN，最后对slot的所有可能value计算概率，概率最高的即为slot对应的value。每一个slot都会有一个对应的model，因此如果该intention内有n个slot需要填充，则系统内有n个该model。
    - 论文二：Word-Based Dialog State Tracking with Recurrent Neural Networks
      - ASR输出用户Utterance后需要再通过SLU，随后才进行DST。可是ASR可能会出错，SLU也可能会出错，这样会造成一个error传播。因此作者设计的model直接以ASR的输出作为DST的输入，绕过了SLU部分。这种策略目前在paper中也比较常见，一般来说效果也确实比添加SLU模块的要高一些。
    - 论文三：Neural Belief Tracker: Data-Driven Dialogue State Tracking
      - 将SLU合并到了DST当中。model中可以看到一共有三个输入，System Output（上一时刻系统动作）、User Utterance（用户输入）、Candidate Pairs（候选槽值对）。model要做的就是根据系统之前动作及用户当前输入，判断候选槽值对中那个value才是真正的value。
      - ![](http://www.pkudodo.com/wp-content/uploads/2019/06/DBN-1024x625.png)
- `NLG`：DPL生成下一步的系统动作后，生成相应的反馈，是以文本形式的。
- `TTS`：若用户是语音交互，则将NLG输出的文本转换为对应语音即可。这部分与ASR差不多，功能相反而已。


### 端到端


## DM

- [多轮对话之对话管理(Dialog Management)](https://zhuanlan.zhihu.com/p/32716205)
- 对话管理（Dialog Management, DM）控制着人机对话的过程，DM 根据对话历史信息，决定此刻对用户的反应。最常见的应用还是任务驱动的多轮对话，用户带着明确的目的如订餐、订票等，用户需求比较复杂，有很多限制条件，可能需要分多轮进行陈述，一方面，用户在对话过程中可以不断修改或完善自己的需求，另一方面，当用户的陈述的需求不够具体或明确的时候，机器也可以通过询问、澄清或确认来帮助用户找到满意的结果。
- ![](https://picb.zhimg.com/80/v2-763da7952c607ed3065af3cacdd9c7d8_720w.jpg)
- 对话管理的任务大致有下面一些：
  - `对话状态维护`（dialog state tracking, `DST`）
    - 维护 & 更新对话状态
  - `生成系统决策`（dialog policy）`DP`
    - 根据 DST 中的对话状态（DS），产生系统行为（dialog act），决定下一步做什么dialog act 可以表示观测到的用户输入（用户输入 -> DA，就是 NLU 的过程），以及系统的反馈行为（DA -> 系统反馈，就是 NLG 的过程）
  - 作为接口与后端/任务模型进行交互
  - 提供语义表达的期望值（expectations for interpretation）interpretation: 用户输入的 internal representation，包括 speech recognition 和 parsing/semantic representation 的结果

对话引擎根据对话按对话由谁主导可以分为三种类型：
- 系统主导
  - 系统询问用户信息，用户回答，最终达到目标
- 用户主导
  - 用户主动提出问题或者诉求，系统回答问题或者满足用户的诉求
- 混合
  - 用户和系统在不同时刻交替主导对话过程，最终达到目标
  - 有两种类型，一是用户/系统转移任何时候都可以主导权，这种比较困难，二是根据 prompt type 来实现主导权的移交
  - Prompts 又分为：
    -  open prompt（如 ‘How may I help you‘ 这种，用户可以回复任何内容 ）
    - directive prompt（如 ‘Say yes to accept call, or no’ 这种，系统限制了用户的回复选择）


对话管理的一些方法，主要有三大类：
- （1）**Structure-based Approaches**
  - **Key phrase reactive**
    - 本质是关键词匹配，通常是通过捕捉用户最后一句话的关键词/关键短语来进行回应，比较知名的两个应用是 ELIZA 和 AIML。
      - AIML（人工智能标记语言），[代码示例](https://github.com/Shuang0420/aiml)，支持 python3、中文、* 扩展
  - **Tree and FSM**
    - 把对话建模为通过树或者有限状态机（图结构）的路径。 相比于 simple reactive approach，这种方法融合了更多的上下文，能用一组有限的信息交换模板来完成对话的建模。
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
  - …
- （2）**Principle-based Approaches**
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
- （3）**Statistical Approaches**
  - RL-Based Approaches
    - 前面提到的很多方法还是需要人工来定规则的（hand-crafted approaches），然而人很难预测所有可能的场景，这种方法也并不能重用，换个任务就需要从头再来。而一般的基于统计的方法又需要大量的数据。再者，对话系统的评估也需要花费很大的代价。
    - 这种情况下，强化学习的优势就凸显出来了。RL-Based DM 能够对系统理解用户输入的不确定性进行建模，让算法来自己学习最好的行为序列。首先利用 simulated user 模拟真实用户产生各种各样的行为（捕捉了真实用户行为的丰富性），然后由系统和 simulated user 进行交互，根据 reward function 奖励好的行为，惩罚坏的行为，优化行为序列。由于 simulated user 只用在少量的人机互动语料中训练，并没有大量数据的需求，不过 user simulation 也是个很难的任务就是了。
    - ![](https://pic3.zhimg.com/80/v2-a499aef3d6e5bf09ea9e4239415c1ee6_hd.jpg)


### 有限状态机FSM

- `有限状态机`（Finite-state machine, `FSM`），又称有限状态自动机，简称状态机，是表示有限个状态以及在这些状态之间的转移和动作等行为的数学模型。FSM是一种算法思想，简单而言，有限状态机由一组状态、一个初始状态、输入和根据输入及现有状态转换为下一个状态的转换函数组成。

- 在描述有限状态机时，状态、事件、转换和动作是经常会碰到的几个基本概念。
  - 状态（State）　指的是对象在其生命周期中的一种状况，处于某个特定状态中的对象必然会满足某些条件、执行某些动作或者是等待某些事件。
  - 事件（Event）　指的是在时间和空间上占有一定位置，并且对状态机来讲是有意义的那些事情。事件通常会引起状态的变迁，促使状态机从一种状态切换到另一种状态。
  - 转换（Transition）　指的是两个状态之间的一种关系，表明对象将在第一个状态中执行一定的动作，并将在某个事件发生同时某个特定条件满足时进入第二个状态。
  - 动作（Action）　指的是状态机中可以执行的那些原子操作，所谓原子操作指的是它们在运行的过程中不能被其他消息所中断，必须一直执行下去。

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

## 知识型对话

- 【2020-8-18】参考：
  - [基于索引的QA问答对匹配流程梳理](https://www.cnblogs.com/yhzhou/p/13436374.html)
  - [智能问答中的NLU意图识别流程梳理](https://www.cnblogs.com/yhzhou/p/13456361.html)
- 知识库(主要是标准的QA信息)匹配需求是对已经梳理出的大量标准QA对信息进行匹配，找出最符合用户问题的QA对进行回复，拆分主要的处理流程主要为如下两点：
  - 标准QA信息入库索引；
  - 通过对用户提出的问题进行处理，与索引库中的所有Q进行相似度计算，根据需要返回得分最高的top k个；
  - 基于返回的top k问题有平台根据业务需要选择其中的某个问题的答案回复客服。
- 在引擎端处理的主要是前两点，即根据需要对索引入库的Q进行预处理，对用户问题进行同样的预处理，而后计算两者之间的相似度，返回得分最高的前几条。处理流程如下图示：
  - ![](https://note.youdao.com/yws/public/resource/c388d7862c02facd6c2a03d6e17d9180/xmlnote/2F3CD2F2C22746A39F595AC04EF4CD62/3972)

- NLU意图识别的流程说明
- 基于智能问答的业务流程，所谓的NLU意图识别就是针对已知的训练语料(如语料格式为(x,y)格式的元组列表，其中x为训练语料，y为期望输出类别或者称为意图)采用选定的算法构建一个模型，而后基于构建的模型对未知的文本进行分类。流程梳理如下：
  - 准备训练数据，按照固定的格式进行；
  - 抽取所需要的特征，形成特征向量；
  - 抽取的特征向量与对应的期望输出（也就是目标label）一起输入到机器学习算法中，训练出一个预测模型；
  - 对新到的数据采取同样的特征抽取，得到用于预测的特征向量；
  - 使用训练好的预测模型，对处特征处理后的新数据进行预测，并返回结果。
  - 从流程梳理看，NLU的意图识别从根本上看是有监督的机器学习，即基于给定的人工筛选数据进行特征处理，构建模型用于预测。

![](https://note.youdao.com/yws/public/resource/c388d7862c02facd6c2a03d6e17d9180/xmlnote/DED0DC29757E48DE9F55FB83A846A957/3963)



## 闲聊型对话

- 待补充


## 对话机器人工程实现

- 各类聊天机器人框架

### JSGF

- 强大的正则工具，支持快速定制NLU

- CFG、JSGF系列规则体系
  - [JSpeech Grammar Format Specification](https://www.w3.org/TR/jsgf/)
- [语音识别百度jsgf语法笔记](https://wenku.baidu.com/view/c6a80e04580102020740be1e650e52ea5518cec0.html)

- 示例

```js
#JSGF V1.0 UTF-8 en; grammar com.local; 
public <cmd> = <cmd1>|<cmd2>|[option1|option2] say; 
<cmd1> = please|/10.2/hello; 
<cmd2> = open|close|start|stop;  
```
- [自然语言理解-从规则到深度学习](https://developer.aliyun.com/article/158691)
  - 对于“帮我打开空调”，其在图中的匹配路径
  - ![](http://ata2-img.cn-hangzhou.img-pub.aliyun-inc.com/139dadbafa66501931a2411b1aa2c80a.png)

```js
public <controlDevice> = <startPolite> <command> <endPolite>;

<command> = <action> <object>;
<action> = (打开|关闭);
<object> = [这个|那个](空调|加湿器|音箱){device};
<startPolite> = (请|帮 我) *;
<endPolite> = [啊|吧];
```



- 语法说明
1. 头部格式固定，‘#’是开头。
2. 第二行定义本语法的名字，用于被其他语法引用 
3. 符号”<>”包含之内的叫做规则名 
4. Public代表外面能够使用到这个规则。不加说明这个规则只能本文件使用。
5. 符号’\|’是或的意思，从中取一个结果。Open\|close 只取其中一个值 
6. 符号“[]”内部包含的是可选的意思，即可以取也可以不取这里的值 
7. 符号“()”分组的意思，也能扩充优先级。
8. 符号“//”表示权重 
9. 符号“\”表示在字符串中出现特殊符号的时候使用。 
10. 符号“*”表示出现0~N次 
11. 符号“+”表示出现1~N次 
12. 符号“{}”表示匹配时返回{}中给出的结果
13. <NULL>表示无声音时候匹配 
14. <VOID>表示不识别的声音匹配 15. 注释： // ;/**/ ;@xx;

- 案例

```java
实际案例：
<what> = ( 啥|是什么|怎么算|怎么计算|什么是|是多少|什么|？|?);
<fact> = ( 定义|方法|规则|要求|咨询);
<how> = ( 怎么办|咋办|咋|咋样|咋整|不了|怎样|怎么样|怎么弄|怎么用|什么办法|办法|如何|如何处理|怎么处理 );
<why> = ( 为什么|为什|为何|原因|什么原因|什么意思|怎么回事|怎麽回事|怎么不|怎么还|怎么没|怎么是|怎么这么|啊|还是|干嘛|凭啥|凭什么|咋没有|还没|解释|啥意思 );
<which> = ( 哪一个|哪个);
<where> = ( 哪|地点|哪里|在哪儿|哪儿|在那里|那里);
<much> = ( 哪些|几个|几次|多少 );
<when> = ( 什么时候|多久|怎么还|啥时候 );
<whether> = ( 能不能|是否|可不可以|可以|吗?|吗？|吗|么|没有|有没有|是不是|行不行|好不好 );
// 肯定、否定
<yes> = (是|是的|对|嗯 );
<no> = ( 不是|不是的|不对|错了|不|未|没有|没 );
// wangqiwen, 格式：[qname[qid] : 相关case集合(/分隔)], 便于跟踪矫正
// 指派模式拒单规则及影响[3042657] :  派单模式拒单会影响我服务分吗/派单模式不能取消吗/派单模式规则/我可以取消指派订单吗/指派订单必须得去吗
public <qid_3042657> = (<qid_3042657_1>|<qid_3042657_2>) {qid-3042657};
<qid_3042657_1> = ( (<assign_mode> <cancel>)|(<cancel> <assign_mode>) [<whether>|<what>|<fact>] );
<qid_3042657_2> = ( <assign_mode> <whether> );
```

- Python的jsgf工具包

Python包：[pyjsgf](https://github.com/Danesprite/pyjsgf)
- pip install pyjsgf
示例：

```python
from jsgf import PublicRule, Literal, Grammar

# Create a public rule with the name 'hello' and a Literal expansion 'hello world'.
rule = PublicRule("hello", Literal("hello world"))

# Create a grammar and add the new rule to it.
grammar = Grammar()
grammar.add_rule(rule)

# Compile the grammar using compile()
# compile_to_file(file_path) may be used to write a compiled grammar to
# a file instead.
# Compilation is not required for finding matching rules.
print(grammar.compile())

# Find rules in the grammar that match 'hello world'.
matching = grammar.find_matching_rules("hello world")
print("Matching: %s" % matching[0])
```



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

- [RASA中文聊天机器人项目](https://github.com/jiangdongguo/ChitChatAssistant)

- Rasa是一个开源机器学习框架，用于构建上下文AI助手和聊天机器人。
  - 安装：
    - pip install rasa_nlu
    - pip install rasa_core[tensorflow]
- Rasa有两个主要模块：
  - Rasa NLU ：用于理解用户消息，包括意图识别和实体识别，它会把用户的输入转换为结构化的数据。
    - 支持不同的 Pipeline，其后端实现可支持spaCy、MITIE、MITIE + sklearn 以及 tensorflow，其中 spaCy 是官方推荐的，另外值得注意的是从 0.12 版本后，MITIE 就被列入 Deprecated 了。
    - Rasa提供了数据标注平台: [rasa-nlu-trainer](https://rasahq.github.io/rasa-nlu-trainer/)
  - Rasa Core：对话管理平台，用于举行对话和决定下一步做什么。Rasa Core是用于构建AI助手的对话引擎，是开源Rasa框架的一部分。
    - 负责协调聊天机器人的各个模块，起到维护人机对话的结构和状态的作用。对话管理模块涉及到的关键技术包括对话行为识别、对话状态识别、对话策略学习以及行为预测、对话奖励等。
    - Rasa消息响应过程
      - ![](https://upload-images.jianshu.io/upload_images/3285850-ece175b3a873ff90)
      - 首先，将用户输入的Message传递到Interpreter(NLU模块)，该模块负责识别Message中的"意图(intent)“和提取所有"实体”(entity)数据；
      - 其次，Rasa Core会将Interpreter提取到的意图和识别传给Tracker对象，该对象的主要作用是跟踪会话状态(conversation state)；
      - 第三，利用policy记录Tracker对象的当前状态，并选择执行相应的action，其中，这个action是被记录在Track对象中的；
      - 最后，将执行action返回的结果输出即完成一次人机交互。
    - Rasa Core包含两个内容： stories和domain。
      - domain.yml：包括对话系统所适用的领域，包含意图集合，实体集合和相应集合，相当于大脑框架，指定了意图`intents`， 实体`entities`， 插槽`slots`以及动作`actions`。
        - intents和entities与Rasa NLU模型训练样本中标记的一致。slot与标记的entities一致，actions为对话机器人对应用户的请求作出的动作。
        - 此外，domain.yml中的templates部分针对utter_类型action定义了模板消息，便于对话机器人对相关动作自动回复。
      - story.md：训练数据集合，原始对话在domain中的映射。
        - Stories
          - stories可以理解为对话的场景流程，需要告诉机器多轮场景是怎样的。Story样本数据就是Rasa Core对话系统要训练的样本，它描述了人机对话过程中可能出现的故事情节，通过对Stories样本和domain的训练得到人机对话系统所需的对话模型。
          - Rasa Core中提供了rasa_core.visualize模块可视化故事，有利于掌握设计故事流程。

- Rasa X是一个工具，可帮助您构建、改进和部署由Rasa框架提供支持的AI Assistants。 Rasa X包括用户界面和REST API。
  - ![](https://upload-images.jianshu.io/upload_images/3285850-26dd1db4512e05ac)

- 测试效果

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


## 资料

- 陈海青：[阿里小蜜机器人交互](https://myslide.cn/slides/2443?vertical=1)
- Google对话系统分享，[Deep Learning for Goal-Oriented Conversational Understanding](https://www.slideshare.net/AIFrontiers/ai-frontiers-dilek-hakkanitur-conversational-machines-deep-learning-for-goaloriented-dialogue-systems)
  - <iframe src="//www.slideshare.net/slideshow/embed_code/key/uiOx6qQI3MHgxW" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/AIFrontiers/ai-frontiers-dilek-hakkanitur-conversational-machines-deep-learning-for-goaloriented-dialogue-systems" title="Dilek Hakkani-Tur at AI Frontiers: Conversational machines: Deep Learning for Goal-Oriented Dialogue Systems" target="_blank">Dilek Hakkani-Tur at AI Frontiers: Conversational machines: Deep Learning for Goal-Oriented Dialogue Systems</a> </strong> from <strong><a href="https://www.slideshare.net/AIFrontiers" target="_blank">AI Frontiers</a></strong> </div>
- 【2019-11-6】哈工大张伟男：[人机对话关键技术及挑战](https://www.infoq.cn/article/QpC2C5HSpHRM9v88Llv0)，[ppt](https://docsplayer.com/99875702-%E4%BA%BA%E6%9C%BA%E5%AF%B9%E8%AF%9D%E6%8A%80%E6%9C%AF%E5%89%8D%E6%B2%BF%E5%8F%8A%E5%8A%A8%E6%80%81.html)
  - <div><div><a target='_blank' href='https://docsplayer.com/99875702-%E4%BA%BA%E6%9C%BA%E5%AF%B9%E8%AF%9D%E6%8A%80%E6%9C%AF%E5%89%8D%E6%B2%BF%E5%8F%8A%E5%8A%A8%E6%80%81.html'>人机对话技术前沿及动态</a></div><div><iframe frameborder="0" style="border-bottom: 2px solid #eee; border-top: 0px;" scrolling="no" src="http://docsplayer.com/docview/89/99875702/" width="728" height="412" allowfullscreen></iframe></div></div>

- 【2020-6-18】Facebook开源有史以来最大的开域聊天机器人  [Blender](https://parl.ai/projects/recipes/), [论文](http://t.cn/A6A429XT)
- 【2020-7-4】开域聊天机器人技术介绍——未来篇（[上](https://mp.weixin.qq.com/s?__biz=MzI1NTMxOTUwOA==&mid=2247485263&idx=1&sn=3be60ccf90324d8f267222a1efb17792&chksm=ea368bf4dd4102e24ae94133abea1d10a70daef753105e6bac7e026bc1adad0506d8ad867dc7&scene=21#wechat_redirect),[下](https://mp.weixin.qq.com/s/czPDx8YNoZseC0EisKZVpQ)）
- 更多[Demo地址](http://wqw547243068.github.io/demo)


# 结束


