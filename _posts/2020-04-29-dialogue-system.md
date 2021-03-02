---
layout: post
title:  "对话系统-Dialogue System"
date:   2020-04-29 21:45:00
categories: 深度学习
tags: 深度学习 NLP 对话系统 QA KB-QA 多轮 闲聊 沈向洋 FSM 有限状态机 GPT 陈蕴侬 JSGF 图灵测试
excerpt: 对话系统技术图谱
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 总结

- 【2021-2-22】[达摩院Conversational AI研究进展及应用](https://mp.weixin.qq.com/s?__biz=MzU1NTMyOTI4Mw==&mid=2247531629&idx=1&sn=0c028fe3e3aa3b7deb872268ecd9c97c&chksm=fbd7ce01cca04717fd115d671cbfc9e9d015c87096574db04892ffcc670f5ef8197f6cd5a429&mpshare=1&scene=1&srcid=0222uIsdzMLXqIlAS8HdPo8r&sharer_sharetime=1614146750577&sharer_shareid=b8d409494a5439418f4a89712efcd92a&version=3.1.0.6189&platform=mac#rd)
  - 任务型对话引擎Dialog Studio和表格型问答引擎TableQA的核心技术研究进行介绍：
    - 语言理解：如何系统解决低资源问题
      - 低资源小样本问题
        - 冷启动的场景下，统计45个POC机器人的数据，平均每个意图下的训练样本不到6条，是一个典型的小样本学习问题。
        - 在脱离了冷启动阶段进入规模化阶段之后，小样本问题依然存在，比如对浙江省11个地市的12345热线机器人数据进行分析，在将近900个意图中，有42%的中长尾意图的训练样本少于10条，这仍然是一个典型的小样本学习问题。
      - 解决方案：引入Few-shot Learning系统解决小样本问题；本质是一个迁移学习：迁移学习的方式能够最大化平台方积累数据的优势。即插即用的算法：在应用的时候不需要训练，可以灵活地增添新的数据，这对toB场景非常友好；
        - 达摩院Conversational AI团队提出了一个Encoder-Induction-Relation的三层Few-shot learning Framework
        - 无论是小孩子还是大人，从小样本中进行学习的时候，主要依靠的是两种强大的能力，归纳能力和记忆能力
        - 达摩院提出了Dynamic Memory Induction Networks的动态记忆机制（发表于ACL2020）
    - 对话管理：如何从状态机到深度模型
    - TableQA：Conversational Semantic Parsing的难点和进展
- 【2021-2-25】[达摩院基于元学习的对话系统](https://www.infoq.cn/article/NpMeANeJNwxwJuyJr2uz)
- [台大对话系统](https://www.csie.ntu.edu.tw/~miulab/s108-adl/doc/200602_ConversationalAI.pdf)，对话AI的两个分支
  - Chit-Chat： seq2seq → 集成上下文 → 集成知识库
  - Task-Oriented：single-domain → multi-domain, contextual → end2end learning
- 【2021-2-14】[思知机器人](https://www.ownthink.com/)，开源中文知识图谱，[图谱可视化](https://www.ownthink.com/knowledge.html?word=%E9%92%9F%E5%8D%97%E5%B1%B1)，[Demo体验](https://www.ownthink.com/robot.html)，包含实时tts；OwnThink开源了史上最大规模（1.4亿）中文知识图谱，[地址](https://github.com/ownthink/KnowledgeGraphData)
- 【2021-2-28】[Chatopera](https://www.chatopera.com/)开发的[机器人平台](https://bot.chatopera.com/)使用指南，王海良，Chatopera联合创始人 & CEO，《智能问答与深度学习》作者,[腾讯课堂讲解](https://ke.qq.com/course/2994143?taid=10214570399215583)
- 【2021-2-4】调停机器人（斡旋）
  - [Intervening Ethical Governor for Robot Mediator in Patient-Caregiver Relationship](https://www.youtube.com/watch?v=3-ZST_bGW3Q&feature=youtu.be)，国外的调停机器人，佐治亚理工，应用于医患关系调解，论文：[an intervening ethical governor for a robot mediator in patient-caregiver relationship.](https://www.cc.gatech.edu/ai/robot-lab/online-publications/ICRE15_shim_arkin.pdf)
    - ![](https://spectrum.ieee.org/image/MjkzMjc1OA.jpeg)
  - 冲突调解机器人：[Robot Mediator for Young Children’s Interpersonal Conflict Resolution](https://www.youtube.com/watch?v=2TYjzIUnRjA)
  - 谈判机器人, [Robot mediators](https://www.youtube.com/watch?v=BZ9fMySqnTM)
- 图灵测试
  - 现代计算机之父阿兰·图灵1950年在哲学刊物《思维》上发表了“计算机器与智能”一文，提出了经典的图灵测试(the Turing test)，在测试者与被测试者(一个人和一台机器)隔开情况下，通过一些装置, 如键盘, 向被测试者随意提问.进行多次测试后，如果有超过30%的测试者不能确定被测试者是人还是机器，那么这台机器就通过了测试，并被认为具有人类智能.

- 【2021-2-18】悟空机器人：后台管理端 [Demo体验地址](https://bot.hahack.com) （用户名：wukong；密码：用户名+@2019）
  - 模块化。功能插件、语音识别、语音合成、对话机器人都做到了高度模块化，第三方插件单独维护，方便继承和开发自己的插件。
  - 中文支持。集成百度、科大讯飞、阿里、腾讯等多家中文语音识别和语音合成技术，且可以继续扩展。
  - 对话机器人支持。支持基于 AnyQ 的本地对话机器人，并支持接入图灵机器人、Emotibot 等在线对话机器人。
  - 全局监听，离线唤醒。支持 Muse 脑机唤醒，及无接触的离线语音指令唤醒。
  - 灵活可配置。支持定制机器人名字，支持选择语音识别和合成的插件。
  - 智能家居。支持和 mqtt、HomeAssistant 等智能家居协议联动，支持语音控制智能家电。
  - 后台配套支持。提供配套后台，可实现远程操控、修改配置和日志查看等功能。
  - 开放API。可利用后端开放的API，实现更丰富的功能。
  - 安装简单，支持更多平台。相比 dingdang-robot ，舍弃了 PocketSphinx 的离线唤醒方案，安装变得更加简单，代码量更少，更易于维护并且能在 Mac 以及更多 Linux 系统中运行。
  - ![](https://10.url.cn/qqke_course_info/ajNVdqHZLLDAZyLMIiaUV6GCEKQVfI4bhB6YBBmbFc0S7T6sZcDcGBM5NSaCcoCpJLJtcgdSmqDg/)

- 【2020-7-30】[沈向洋：从深度学习到深度理解](https://www.toutiao.com/i6854955754193945096/)
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

- 【2020-7-6】台大陈蕴侬，[如何让任务型聊天机器人更加鲁棒](https://www.bilibili.com/video/BV1oa4y1h7Um/?spm_id_from=333.788.videocard.2)，[课程主页](https://www.csie.ntu.edu.tw/~miulab/s108-adl/)，[PPT链接](https://www.csie.ntu.edu.tw/~miulab/s108-adl/doc/)，[pdf](https://www.csie.ntu.edu.tw/~miulab/s108-adl/doc/200602_ConversationalAI.pdf)
<iframe src="//player.bilibili.com/player.html?aid=668813899&bvid=BV1oa4y1h7Um&cid=209423753&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="600" width="100%"> </iframe>

- 【2020-9-12】百度王凡：[开放域对话系统：现状和未来](https://mp.weixin.qq.com/s?__biz=MzU1NTMyOTI4Mw==&mid=2247507362&idx=1&sn=f266e83bf26956838a830a6a8a9194d9&chksm=fbd76fcecca0e6d8e1e6869a5f701476b2955c51d9ef2976e44feb912d0c7ce78b88bf9bbdd9&mpshare=1&scene=1&srcid=0911roXzZkIrRt7BtSTeBubc&sharer_sharetime=1599789486897&sharer_shareid=b8d409494a5439418f4a89712efcd92a&key=0a19845a51c58415c57b70e5f9fcc7ac1e55f7a063b5625f0ad6ccdb97f84fc761d724100f3eaed413d29d6ec7d00b57d24ba7704bca6760e6a12c76d8fe7d71b6ff948a0f1bde8d149ca08a3d5c255b6d3383569f32352ea1d5acc4e3bc8c484c49e8e22249bc5e1217f078d0699a752d15bc2c23d03e00bc50d2c5f3568f74&ascene=1&uin=OTY1NzE1MTYw&devicetype=Windows+10+x64&version=62090529&lang=zh_CN&exportkey=ASpq7RdZ3unrf%2FjEtdDMFCc%3D&pass_ticket=PuzvgcInSGb6VR3uby%2FNFgjqxSEToDvVRO%2BX7yC0tMwo7rfZ0%2FgqILDt9IhoQjhw&wx_header=0)
- 7/2018: [Jianfeng Gao](https://www.microsoft.com/en-us/research/people/jfgao/) (MSR AI), [Lihong Li](https://lihongli.github.io/) (Google AI) and I presented a tutorial on Neural Approaches to Conversational AI at [SIGIR-18](http://sigir.org/sigir2018/) and [ACL-18](https://acl2018.org/). Slides: [PowerPoint](https://www.microsoft.com/en-us/research/uploads/prod/2019/05/neural-approaches-to-conversational-AI.pptx) (with animations) and [PDF](https://www.microsoft.com/en-us/research/uploads/prod/2019/05/neural-approaches-to-conversational-AI.pdf).
- a tutorial on Neural Approaches to Conversational AI at ICML-19. Slides: [pdf](https://www.microsoft.com/en-us/research/uploads/prod/2019/06/neural-approaches-to-conversational-AI.pdf), [Powerpoint](https://www.microsoft.com/en-us/research/uploads/prod/2019/06/neural-approaches-to-conversational-AI-public.pptx).
- 【2020-11-28】优质资料，哈工大张伟男：[人机对话关键技术及挑战](https://zhuanlan.zhihu.com/p/90425938)，【2020-11-6】附：[前沿动态综述-闲聊型对话-视频版](https://hub.baai.ac.cn/view/3736)
  - ![](https://pic4.zhimg.com/80/v2-ce5e5d418062c9f707066be1ff1b339f_720w.jpg)
  - 开放域对话系统
    - ![](https://pic3.zhimg.com/80/v2-fdfd12ad3423d0ea2ea90779b0d01b52_720w.jpg)
  - 任务型对话系统
    - ![](https://pic1.zhimg.com/80/v2-6f4677765f75aa196e232ec6c1a1c548_720w.jpg)
- 【2021-1-20】【基于Unilm模型的夸夸式闲聊机器人项目】'Unilm for Chinese Chitchat Robot - Unilm for Chinese Chitchat Robot.' by logCong GitHub  
  - [UniLM论文](https://arxiv.org/abs/1905.03197)全名为Unified Language Model Pre-training for Natural Language Understanding and Generation，译为自然语言理解与生成的统一预训练语言模型，来自于微软研究院。
  - 开源的模型仅使用豆瓣夸夸群数据训练，所以称之为夸夸式闲聊机器人。感兴趣的同学，也可以使用本项目代码对其他对话语料进行训练。
详细介绍见知乎：[夸夸式闲聊机器人之Unilm对话生成](https://zhuanlan.zhihu.com/p/170358507)。
  - UniLM模型之所以强大，是因为它既可以应用于自然语言理解（NLU）任务，又可以应用于自然语言生成（NLG）任务。结构与BERT一致，是由一个多层Transformer网络构成，通过修改训练时的Mask矩阵，使模型拥有更多的能力。
  - [云问机器人](http://www.iyunwen.com/)开源出来的[模型](https://github.com/YunwenTechnology/Unilm)
  - 不足之处
    - 本模型最大的问题是，在训练模型时，没有考虑上下文信息，也就是训练是针对单轮对话进行的，因此无法很好地回答上下文相关的问题，并且可能会出现文不对题的情况。
  - 示例

```shell
#user:工作不开心
chatbot: 你可以的！工作不开心也可以去吃火锅，看个影响自己心情的电视剧
#user:工作不开心
chatbot: 我也是，不过现在开始努力找工作啦！一起加油鸭～
#user:工作不开心
chatbot:那就祝福你，能找到喜欢的工作吧。
#user:工作不开心
chatbot:你也要加油鸭！
#user:工作不开心
chatbot:我也是，不过总有一天就会好起来的
```

- 【2021-1-23】[空妙对话机器人Demo](https://communechatbot.com/)
- 【2021-1-28】AI+HI实现 [对话系统 NLU/DM 任务详解](https://www.jianshu.com/p/d713678fddfb)
  - 在很多场景下，对话用户界面（CUI - Conversational User Interface）比图形用户界面（GUI - Graphical User Interface）更加自然和高效。过去一年中，CUI得到了大量的关注，也取得了迅速的发展。微软提出了对话即平台的战略，Facebook Messenger上出现了各种对话机器人（chatbot），很多和CUI相关的创业公司也应运而生。
  - AI+HI表示机器助理和真人助理结合起来，为用户提供优质的体验。为什么要这么做呢？因为当真人能够和机器配合时，能产生一个正反馈：
    - 真人纠正机器的错误 -> 更好的用户体验 -> 更多的活跃用户 -> 获取更高质量的数据 -> 训练更好地模型 -> 机器更好地辅助真人。
  - HI和AI如何无缝的配合呢？我们通过群聊将用户、AI和HI放在一个群里。由AI根据置信度来判断，什么情况下需要将HI加入群内，将什么样的HI加入群内，以及什么时候HI来干预。AI和HI的配合分为三种：
    - 1）AI置信度较高时，无需HI干预，对话系统完全由AI来执行动作；
    - 2）AI置信度不高时，AI生成候选动作辅助HI来动作；
    - 3）AI不确定性很高时，完全由HI接管来执行动作。
  - ![](https://upload-images.jianshu.io/upload_images/5756726-6bdc4001931547fd.png)
  - 基于AI+HI的对话系统中，HI扮演三种角色：
    - 1）为AI提供反馈，如NLU出现错误时，HI可以纠正，然后AI在纠正后的对话状态下继续工作；
    - 2）在AI的辅助下执行动作，比如AI生成候选动作但不执行，由HI进行判断最终来执行；
    - 3）产生标注数据使AI不断进化，例如HI每一次纠错、执行动作都是一个标注的样本，可以用于训练AI。

- 【2021-1-29】对话系统经典任务核心算法对比
  -  摘自：[智能对话系统架构及算法](http://html.rhhz.net/buptjournal/html/20190602.htm#close)

|任务 |	算法|	优势|	劣势|
|---|---|---|---|
|自然语言理解	|Classical Classifier	|实现简单，经典分类算法常用于意图分类、领域分类、对话动作分类等|	需要特征工程|
|自然语言理解	|CRF	|考虑结合标签的转移概率，适合槽位识别任务	|只使用了固定窗口尺寸，难以扩展|
|自然语言理解	|RNN	|能够对语言内容长距离建模，适合于上下文相关的多轮意图分类	|梯度消失或者梯度爆炸问题|
|自然语言理解	|LSTM	|结合“门”机制，能够选择记忆和忘记相关信息	|需要更多的训练数据|
|对话状态追踪|	Hidden Information State Model|	理论上能够对任意槽值的依赖进行建模	|只能够保持top N个状态|
|对话状态追踪|Bayesian Update of Dialogue States|	能够对状态的概率进行建模	|只能对简单的依赖进行表征|
|对话状态追踪|Static Classifier	|不需要依赖之前的状态，可对任意的分类器工作	|没有考虑到状态的转移，使用了人工定义的特征|
|对话状态追踪|Sequential Classifier	|考虑到状态的转移概率	|发生在最后一个状态的错误可能会影响当前状态的估计|
|对话状态追踪|Transfer Learning	|能够基于现有槽值信息对新任务或领域进行迁移	|需要大量的特征设计|
|对话策略优化|	Q-Learning	|经典算法，易于实现	|不能处理连续的动作空间问题|
|对话策略优化|Policy Iteration|	能够处理连续动作空间问题	|优化过程不稳定|
|对话策略优化|Actor Critic|	能够处理连续动作空间问题，稳定地优化	|需要严格选择函数的逼近方法|
|对话策略优化|Transfer Learning	|对于原领域和目标领域的槽值适应性	|计算复杂度高|
|端到端	|End-to-End LSTM Policy Network with Answer Selection	|能够进行对话状态的自动学习	|仍然有组件需要手工定制|
|端到端	|End-to-End Training of Modular Dialogue System	|只需要少量的人工参与	|槽的数量和槽值信息需要提前定义，DST是分开训练的，需要更多的数据 |
|端到端	|Memory Network based End-to-End Dialogue System	|对确定槽和槽值信息的依赖性低	|难以与人类知识集成|


- 经典任务和数据与评测指标对比
  - 摘自：[智能对话系统架构及算法](http://html.rhhz.net/buptjournal/html/20190602.htm#close)

|任务	|数据集	|评价指标|
|---|---|---|
|NLU	| ATIS	| Accuracy, F1 |
|NLU	| Snips	| Accuracy, F1 |
|NLU, NLG|	TouristInfo	| Accuracy, F1 BLEU|
|NLU	| DARPA Communicator|	Accuracy, F1|
|DST	| DSTC1~DSTC3	|Joint Goal Accuracy|
|DST	| WOZ2, mutli WOZ	|Joint Goal Accuracy|
|DST, Policy	| TownInfo	|Accuracy, Reward, Success Rate|
|DST, Policy	| Cambridge Restaurant	|Reward, Success Rate BLEU|


# 现状

- 参考资料
  - [对话生成：seq2seq模型原理及优化](https://zhuanlan.zhihu.com/p/69159062)

对话机器人是一个热门话题，大家熟知的应用和产品主要有三种：
- 第一种是`虚拟助手`，能对个人输入完成相应的任务或提供相应服务，典型的商业产品包括如siri、cortana、度秘等；
- 第二种是`智能音箱`，通过语音交互，完成用户任务，也能对智能家居设备进行控制。典型的商业产品包括如echo、天猫精灵、小爱同学等；
- 第三种是`闲聊对话`，在开放域与用户进行闲聊。典型的商业产品如：微软小冰。

![](https://upload-images.jianshu.io/upload_images/18270108-d3523b6e842e3494.png)

## 智能助理

- 什么是智能助理
  - 【2017-9-27】[智能助理的应用场景选择](http://www.woshipm.com/it/802295.html)
  - 利用AI技术，打造统一的CUI（对话交互界面），一站式的整合信息&服务。
- 真正的智能交互是一种“自由”的交流与交互方式，而不仅仅是与“以自然语言为形式”的交互方式，后者很有可能会沦为自然语言形式的“命令行”。
- 人类的需求是服从正态分布的，例如人类有1万种需求，其中15种的高频需求，覆盖95.4%的用户请求量。但这些高频需求都会被“APP”形式的应用占领（例如淘宝、携程等），因此这些高频需求反而不是CUI需要去覆盖的。

![](http://image.woshipm.com/wp-files/2017/09/wumOEwIOQzbtpywQZirV.png)

- CUI的重点？
  - CUI核心是去覆盖频率只有5%，但数量却有9985种的长尾需求。每个人的长尾需求都不一样，CUI若能很好的满足一些长尾需求，能够使用户和产生依赖，让自己也成为一个“入口”。这是“低频打高频”的畅想。
- 通用领域的长尾困境
  - “<font color='red'>低频打高频的畅想</font>”实现起来困难重重，即“<font color='blue'>通用领域的长尾困境</font>”。
    - 低频打不过高频：
      - 低频通常被定义为：使用频次较低，用户重复选择率较低。
      - ×代驾和滴滴打车这两款软件同样是满足有出行需求的用户群，但代驾相对于出租车，属于使用频次较低的功能。当滴滴打车以“出租车”这个高频需求迅速切入市场，培养了大批用户群体后，迅速横向扩展到专车和代驾领域，并且以比单一领域更便捷的方式瓜分市场，自然将代驾产品逼上了绝境。毕竟，用户的手机不会装两款同等效用的产品。
    - 创投圈/产品圈都流传着这样一个观点：“高频打低频”，高频的业务（如外卖O2O、日常出行）容易对相对低频的业务（如药品O2O、商务出行）形成竞争优势，高频的业务切入低频业务很容易，低频业务反击高频业务却很难。
    - 为什么打不过低频？
      - 大部分的解释来自**流量模型**，即高频业务天然拥有更多流量，即使在用户场景中分流一部分，也能对只做低频业务的独立应用形成流量优势，例如在外卖APP中上线一个送药上门的板块，让高频的外卖业务为低频的送药业务导流。
      - 与直接做低频业务相比，从高频业务开始借助样本优势建立的**效率差**能够给用户带来更多**效用差**，这就是我认为的“高频打低频”观点的另一个真相
    - 摘自：[样本优势：“高频打低频”的另一个真相](https://zhuanlan.zhihu.com/p/138101313)
  - 主要是由于不同场景下语义可以多种多样，有太多不明确的意图无法确认。
  - 为解决此问题，试图限定谈话的领域，从宽度发展变为广度发展。这也就是垂直领域的智能助理。
- 垂直领域智能助理的困境
  - （1）**推理复杂度**
    - 机器学习（ML）是计算的逆运算，很多时候从结论反推规则，用数据训练规律。对象的复杂程度直接决定模型的复杂程度。
    - 意图理解难推理
    - ![](http://image.woshipm.com/wp-files/2017/09/68dG1enfVjHjfWnQ41sH.png)
  - （2）**知识复杂度**
    - ![](http://image.woshipm.com/wp-files/2017/09/uLyWQUUStkmi2JccnSm2.png)
    - ![](http://image.woshipm.com/wp-files/2017/09/iRhP2eEFkxrebBLsD2Hs.png)
  - （3）**数据开放度**
    - 很多领域，例如医疗领域的数据非常难获取。这也是项目的难题之一。
- 解决方案
  - 1）：面向大众还是专业人士？
    - ![](http://image.woshipm.com/wp-files/2017/09/52KBdjn4jVi6gFJNXAFY.png)
  - 2）找到“不得不”场景
    - Amazon的Echo在2016年出货500万台，2017预计卖1500万台。它的10大应用除了“设闹钟”等需求，还有“读报纸”“新增物品至购物清单”这些适应国外用户的需求。因此我们不仅仅要回答“我有什么好”还要回答“我比原来的方案有什么好”
    - 很多用户购买AI是为了满足客户对AI的期望
  - 3）认知问题感知化解决
    - 穷举在该领域内，用户可能会说的所有query类型
    - 完备性 <- 颗粒度 -> 一致性
    - 使用对话模板（ DIT++等，DIT++对话模板的[官网](https://dit.uvt.nl/)  ）
      - ![](http://image.woshipm.com/wp-files/2017/09/LTAVd0k4CgZWkvrVwP5r.png)
      - 使用意图模板
      - ![](http://image.woshipm.com/wp-files/2017/09/3y8VP7YKeeYTqcW1jI3S.png)
  - 4）场景垂直VS领域垂直
    - 平时说垂直是说领域的垂直，比如房地产这种行业类的。但是很多时候需要场景的垂直，用很窄的场景就解决一个小问题，并且带来足够多的好处。
      - “场景小才能压强大”
      - AI是解决简单重复的脑力劳动。在智能助理的产品下，简单重复的脑力劳动就是指“明确目标、有限输入、对话可迅速收敛的任务指令”。
  - 5）人机协作系统
    - ![](http://image.woshipm.com/wp-files/2017/09/lBNJefNeypIfKY4DMlUP.png)
    - 与其打造高智能的机器系统，不如打造人工和机器一起协作的系统。用人工来保证机器的稳定性。任何一个智能助理的大概的基础架构如上图。当用户输入一句话后，先做NLP部分，再做对话管理部分（决策部分），最后再做业务处理。这三个模块，全部都需要机器去运算，那我们就可以给每个模块加上后台审核人员，对数据做一个标注。这样就能达到数据沉淀的目的。
    - 标注数据对AI来说非常重要（很多公司都花了大量的时间和费用去买数据、标注数据），“人机协作”在早期既能保证系统稳定，又能标注大量实时有效的数据，是非常好的一种方式。
- 技术需要产品化
  - AI技术还不够，需要工程化、产品化；
  - 行业需要科学家，也需要好的产品经理，好的全栈工程师。
- AI产品的架构比普通的互联网产品多了一个维度——“时间”。
  - 这种产品架构，可以生存到未来，并在未来逐步进化，一步步向智能逼近。
- 其他业务实践分享
  - [金融科技-智能投顾与AI金融风控-谢成]()
    - 金融科技的生态是三个相互牵制的部分：公司/银行——监管——资本
    - 金融科技发展：
      - 20世纪70年代 业务电子化
      - 20世纪80年代 前台电子化（ATM机等）
      - 20世纪90年代 金融业务互联网化（实现了高效连接）
      - 21世纪 金融科技
    - 中国金融科技发展
      - IT系统 —— 支付 —— 信贷 —— 大金融 —— 生活
    - 智能投顾（Robo-advisor）：个性投资、私人订制、组合投资、分散风险、智能投顾、自动调节
    - 金融建模的业务流程
      - （1）收集数据源（信用数据以及非标准数据）
      - （2）融和数据加工
      - （3）构建模型
  - [车载语音助手的实战干货-宏卫]()
    - 做产品，不做AI产品。因为小公司在算法等等技术上很难超过BAT等大公司，所以选择和构成产品每个部分最好的业务技术公司合作，再加上我们对产品的深挖，来做我们的产品
    - 车载场景下没有办法直接做to C的软件，因此选择了to B的商业模式。
    - 为了启动顺利，做了大量的数据埋点，收集到了颗粒化的数据，甚至是用户每一个问句都做了加密后的信息收集。
    - 和大量的内容企业合作，比如QQ音乐、喜马拉雅等等。

# 分类

## 简介

（1）对话机器人按照功能可以分为三类：
- 第一类`任务型`对话，主要解决如订机票、订酒店等问题。
  - 涉及的技术包括：语义理解、意图识别、状态追踪、对话决策等；
- 第二类`知识型`对话，在寿险客服的场景里，用户可能会问“你这个保险要交多少钱？”这类问题。
  - 涉及的技术包括：文本表示、语义匹配、知识图谱等；
- 第三类`闲聊型`对话，用户可能只想找人聊聊天，对话不涉及到知识或业务，比如说“今天天气真好”。
  - 涉及的技术包括：文本生成模型、文本检索、排序技术等；

![](https://upload-images.jianshu.io/upload_images/18270108-74922f3390e8b699.png)

（2）按照模式可以分为检索和生成
- 基于检索的模型，用预定义的数据库和某种启发式推理来根据输入和上下文选择适当的答复。换句话说就是构建FAQ，存储问题-答案对，之后用检索的方式从该FAQ中返回句子的答案。  这些系统不会产生任何新的文本，他们只是从固定的集合中选择一个响应。这种方法有明显的优点和缺点。 由于使用手工打造的存储库，基于检索的方法不会产生语法错误。 但是，它们可能无法处理没有预定义响应的场景。 出于同样的原因，这些模型不能引用上下文实体信息，如前面提到的名称。
- 生成式模型，这种方法要更难一些，它不依赖于预定义的响应，完全从零开始生成新的响应。 生成式模型通常基于机器翻译技术，但不是从一种语言翻译到另一种语言，而是从输入到输出（响应）的“翻译”。
  - ![](https://img-blog.csdn.net/20171205212417003)
  - 这方法有明显的优点和缺点。它可以引用输入中的实体，给人一种印象，即你正在与人交谈。 然而，这些模型很难训练，而且很可能会有语法错误（特别是在较长的句子上），并且通常需要大量的训练数据。  

（3）按领域分类可分为：开放领域和封闭领域。
- 开放领域的chatbot更难实现，因为用户 不一定有明确的目标或意图。  像Twitter和Reddit这样的社交媒体网站上的对话通常是开放领域的 - 他们可以谈论任何方向的任何话题。 无数的话题和生成合理的反应所需要的知识规模，使得开放领域的聊天机器人实现相当困难。同时这也需要开放域的知识库作为其知识储备，加大了信息检索的难度。
- 封闭领域的chatbot比较容易实现，可能的输入和输出的空间是有限的，因为系统试图实现一个非常特定的目标。 技术支持或购物助理是封闭领域问题的例子。 这些系统不需要谈论政治，只需要尽可能有效地完成具体任务。 当然，用户仍然可以在任何他们想要的地方进行对话，但系统并不需要处理所有这些情况 - 用户也不期望这样做。

## 对话系统架构

- 按照对话系统的技术架构来分，人机对话系统可以分为**任务型**对话系统和**非任务型**对话系统两大类，在实际商业应用中这2种对话方式常常结合在一起使用.
  - 任务型对话通过交互的方式帮助用户完成一项或多项特定的任务，系统能够完成的任务通常是一个有限的集合，每个任务有明确的流程、输入和输出，如智能订票系统、账单查询系统等.
  - 非任务型对话系统没有明确的任务列表，可以用于同用户闲聊，或者回答用户在某一个或多个领域的问题.
  - 摘自：[智能对话系统架构及算法](http://html.rhhz.net/buptjournal/html/20190602.htm#close)

### 任务型架构

- 当前任务型对话系统的典型架构主要分为2类：
- **管道式**架构，（商用典型架构），包含：
  - 语音识别(ASR, automatic speech recognition)
  - 自然语言理解(NLU, natural language under standing)
  - 对话管理器(DM, dialogue manager)
  - 语言生成(NLG, natural language generation)
  - 语音合成(TTS, text to speech)等组件[5].
  - 纯文本的对话不含语音识别和语音合成模块.
  - 近几年随着深度学习的发展，一部分对话系统将对话管理器分成对话状态跟踪(DST，dialogue state tracking)及对话策略优化2个部分，使得对话管理更加依赖统计模型的方法，更加鲁棒.管道式架构中各个模块独立优化，也是目前商用系统的典型架构.

![](https://static001.infoq.cn/resource/image/95/b0/95872ddc2e39ceb0d47yy39a79d0cfb0.png)
- 尽管模块化的对话系统由于每个部分独立优化，具有更强的可控性，但是端到端的对话系统可以直接利用对话日志进行训练，不需要人工设计特定的语义标签，因此更具备可扩展性，在一些复杂度中低的对话场景中能够快速训练部署使用。


- （1）管道式架构——pipeline
  - 含语音识别
    - ![](http://html.rhhz.net/buptjournal/html/PIC/bjyddxxb-42-6-10-1.jpg)
  - 纯文本
    - 对话系统、模拟器和多个外部服务、资源组成多智能体的交互整体
    - ![](http://html.rhhz.net/buptjournal/html/PIC/bjyddxxb-42-6-10-2.jpg)
- （2）端到端结构——end2end
  - 各个模块彼此依赖，统一优化.目前端到端的人机对话系统随着深度学习等一系列算法技术的进步而迅速发展，逐渐成为当前的研究热点.
  - 由于内部独立模块的训练过程，管道式架构往往存在模块之间错误累加的问题.与管道式架构不同，端到端模型根据误差的反向传播共同调整和优化模型内部的网络结构和参数，直到模型收敛或达到预期的效果，中间所有的操作都包含在神经网络内部，不再分成多个独立模块分别处理. 有的方法虽然是端到端的方法，但还是单独设计模型的部件，不同部件解决管道方法中某个或多个模块所承担的任务.
  - 端到端对话模型可分为检索式和生成式，检索式模型就是给定对话历史从预定义回复候选集合中选出最佳回复作为当前系统输出，生成式模型则是给定对话历史直接生成回复。两种方式都可以通过和用户多轮交互完成最终的对话任务。
  - ![](http://html.rhhz.net/buptjournal/html/PIC/bjyddxxb-42-6-10-3.jpg)
  - 将人机对话的过程看作为从对话历史到系统回复的一种映射问题，通常应用编解码模型来进行端到端训练.
  - 端到端对话系统是在有监督的方式下进行训练，需要大量人人对话的训练数据，理论上有很多优点，但目前从结果上看仍需要在技术上做大的提升，以确保对话的逻辑性和鲁棒性.
- 总结：任务型对话系统的架构分类
  - ![](http://html.rhhz.net/buptjournal/html/PIC/bjyddxxb-42-6-10-4.jpg)

### 非任务型架构

非任务型对话系统架构演进
- 非任务型的对话系统也称为聊天机器人，在开放领域或某一个特定领域与人进行信息沟通，系统没有特定完成任务的列表和槽位列表.
- 典型的非任务型对话系统的回复，一般通过生成方法生成或基于检索的方法抽取
- （1）基于**生成模型**的架构
  - seq2seq对话生成模型将用户这轮对话的问题作为输入，借助神经元网络将用户的问题编码为一个编码矢量，该编码矢量同对话上下文的隐含矢量结合，共同作为一个神经元网络解码器的输入，逐词生成系统回复的句子.
    - 1) 编码器和解码器的常用模型包括循环神经网络(RNN, recurrent neural network)、长短时记忆循环神经网络(LSTM, long short-term memory)、门控循环神经元网络、卷积神经网络(CNN, convolutional neural networks)、注意力模型或者组合.
    - 2) 对话上下文的编码.研究人员将对话上下文的语义信息有效地用矢量表示，提出了分层的架构，在编码和解码之间加了一层专门对上下文进行建模.
    - 3) 对话的实义性和多样性.在当前以序列到序列为基础的对话系统中，一个具有挑战性的问题是，这些系统倾向于产生无关紧要的或不明确的、通用的、没有意义的回复，如“我不知道”、“哈哈”这样的无实际含义的回复.解决这类问题的方法之一是修改目标函数，在生成式对话中加上行列式点过程，使得生成每个词的时候既考虑质量又考虑多样性.另外一个变化是序列到序列模型同对抗神经元网络的结合，以确保生成的答案同人工回复的相似性.
    - 4) 主题一致性.为了确保对话过程中内在主题的一致性，对对话主题进行建模，作为额外的输入给对话生成的解码模型.
    - 5) 系统人格的一致性.业界典型的做法是将用户的个性化信息用向量来表示，嵌入序列中进行学习，从而确保不同用户的人格和属性特征的一致性.
    - 6) 情感.在传统的序列到序列模型的基础上，使用静态的情感向量嵌入表示，动态的情感状态记忆网络和情感词外部记忆的机制，使得新模型可以根据用户的输入以及指定情感分类输出相应情感的回复语句.
- （2）基于**检索**的架构
  - 基于检索的方法从候选回复中选择回复.检索方法的关键是消息-回复匹配，匹配算法必须克服消息和回复之间的语义鸿沟.基于学习的搜索和排序算法在基于检索的对话系统中起着至关重要的作用，基础算法在近几年取得了非常大的进步，基于检索的对话系统展现出非常客观的性能和准确率.在众多非任务型对话中，基于检索的方法输出的结构也常常作为生成对话模型的输入，或者进行平行组合使用.
  - 检索式对话的基本思路就是将输入和候选输出投射到同一个语义空间中，判断两者是否相似.对于是否相似的计算而言，经典方式是基于独热编码或词袋模型，这是比较传统的表达方式.而当深度学习崛起之后，开始使用表示学习，也就是学习出向量嵌入表示，最后是基于抽象表示的匹配相似度计算.
  - 近年来，有很多模型被提出，如微软的DSSM、CDSSM及相关系列模型；华为诺亚方舟实验室提出的ARC-Ⅰ和ARC-Ⅱ；斯坦福的Tree-LSTM，IBM的ABCNN，Pang等提出的MatchPyramid，Qian等提出的ESIM等.通常，深度匹配模型可以从大类上分为表示型和交互型2种表示型模型，如DSSM等，侧重对表示层的学习和构建，它会在表示层将输入转换成整体表示向量，利用深度网络进行语义表示的加强.这种模型的问题是容易发生语义偏移，上下文信息的重要性难以显式衡量.交互型模型，如ARC-Ⅱ等，这类模型在输入层就进行词语间的先匹配，并将匹配的结果作为灰度图进行后续的计算和建模，能够更精细地处理句子中的联系.它的优势是可以较好地把握语义焦点，对上下文重要性合理建模.近年来，基于检索的架构在工业界的实践和应用得到了快速的发展.

## NLU

- [台大对话系统](https://www.csie.ntu.edu.tw/~miulab/s108-adl/doc/200602_ConversationalAI.pdf)
- 语言理解的pipeline，前两者主要通过Classification实现，第三个是Sequence Labeling
  1. Domain Identification（分类）： Requires Predefined Domain Ontology
    - 如：find a good eating place for taiwanese food
    - 识别为餐饮领域
  2. Intent Detection（分类）：Requires Predefined Schema
    - 餐饮领域里的找餐馆意图：FIND_RESTAURANT
  3. Slot Filling（序列标注）：Requires Predefined Schema
    - 槽位：rating=“good”，type=“taiwanese”
    - Slot Tagging

### 意图识别

- 意图识别通过文本分类实现，但是和文本分类有区别，这个区别造就了它更“难一些”，主要难点如下：
  - 输入不规范：错别字、堆砌关键词、非标准自然语言；
  - 多意图：输入的语句信息量太少造成意图不明确，且有歧义。比如输入仙剑奇侠传，那么是想获得游戏下载、电视剧、电影、音乐还是小说下载呢；
  - 意图强度：输入的语句好像即属于A意图，又属于B意图，每个意图的的得分都不高；
  - 时效性：用户的意图是有较强时效性的，用户在不同时间节点的相同的query可能是属于不同意图的，比如query为“战狼”，在当前时间节点可能是想在线观看战狼1或者战狼2，而如果是在战狼3开拍的时间节点搜的话，可能很大概率是想了解战狼3的一些相关新闻了。


### 填槽

- 填槽（Slot filling）定义：
  - 一般定义：填槽指的是为了让用户意图转化为用户明确的指令而补全信息的过程。
  - 专业定义：从大规模的语料库中抽取给定实体（query）的被明确定义的属性（slot types）的值（slot fillers）——网络文章定义
    - 设定闹钟这个行为，需要两个关键信息，一个是行为，一个是时间。这两个信息可以理解为“设闹钟”行为的前置条件，就好像事有个槽空缺在那，需要先补充完整了这个槽，完成这个条件后，触发新的副本，才能继续后续的行为。
  - 用途
    - ①多用于**任务型**对话
      - 任务型对话系统的语言理解部分，通常使用语义槽来表示用户的需求，如出发地、到达地、出发时间等信息。 
    - ②作为意图识别的**关键字**
    - ③作为下一步对话的**提示信息**
      - 填槽的意义有两个：作条件分支多轮对话、作信息补全用户意图。填槽不仅是补全用户意图的方式，而且前序槽位的填写还会起到指导后续信息补全走向的作用。
  - ![](https://upload-images.jianshu.io/upload_images/1060404-6f96e93a05bcc9ca.png)
- 基本概念
  - 槽：实体已明确定义的属性，打车中的，出发地点槽，目的地槽，出发时间槽中的属性分别是“出发地点”、“目的地”和“出发时间”
  - 槽位：槽是由槽位构成
    - ![](https://upload-images.jianshu.io/upload_images/1060404-41dbe622cfb85ced.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/549)
    - 槽位的属性
      - 接口槽与词槽
        - 词槽，通过用户对话的关键词获取信息的填槽方式
        - 接口槽，通过其他方式获取信息的填槽方式
      - 可默认填写/不可默认填写：有些槽是不可默认填写的，不填没办法继续下去，有些即使不填，有默认值也可。
      - 槽位优先级：当有多个槽位的时候，槽该采用那个信息，这时候有个优先级。
      - 澄清话术：当槽不可默认填写同时又没有填写的时候，就要进行澄清
      - 澄清顺序：当有多个槽需要澄清的时候，就存在先后顺序的问题，所以需要一个澄清顺序，先问什么，再问什么。
      - 平级槽或依赖槽，根据槽和槽之间是否独立，后续的槽是否依赖前面槽的结果。可以将槽之间的关系分为
        - 平级槽，槽与槽之间没有依赖，例如打车中的三槽
        - 依赖槽，后续的槽是否依赖前面槽的结果，例如手机号码槽，不同国家手机号码格式不同（槽的属性不同），所以国家槽会影响选择哪个手机号码槽。
  - 准入条件：从一个开放域转入到封闭域，或者从一个封闭域转入到另一个封闭域，中间的跳转是需要逻辑判断的，而这个逻辑判断就是准入条件。
  - 封闭域对话：封闭域对话是指识别用户意图后，为了明确用户目的（或者称为明确任务细节）而进行的对话
  - 澄清话术：当用户的需求中缺乏一些必要条件时，需要对话系统主动发问，把必要条件全部集齐之后再去做最终的满足执行。
- ![](https://upload-images.jianshu.io/upload_images/1060404-8b1f274ac179571c.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/700)
- BIO的解释
  - “B-X”表示此元素所在的片段属于X类型并且此元素在此片段的开头。
  - “I-X”表示此元素所在的片段属于X类型并且此元素在此片段的中间位置。
  - “O”表示不属于任何类型。
- 注意：
  - 没明确意图前的聊天可以看做是开放域的对话，开放域对话中也能填槽。
  - 参考：[Chatbot中的填槽(Slot Filling)](https://www.cnblogs.com/shixisheng/p/9732453.html)
- 全过程示例解析（参考：[大话知识图谱--意图识别和槽位填充](https://zhuanlan.zhihu.com/p/165963264)）
  - 用户：订一张今天下午场次的战狼电影票
  - 系统：识别出“订电影票”的意图，于是开始操作订电影票的事了
  - 系统：“您好，战狼2在XX影城于下午一点半上映，YY影城将在下午两点半上映；你需要去哪个电影院呢？”
  - 用户：“去YY影城”
  - 系统：“您好，您可以选择电影票张数和座位号完成预定”
  - 针对性的“思考”是全靠槽位填充来实现
    - ![](https://pic4.zhimg.com/80/v2-2d3836952f5d175b40089b50ddcfdb8b_1440w.jpg)
    - 需要填的空包含了电影名、影院名称、时间、数量、座位位置等信息
  - 系统是如何填空的呢？答案是命名实体识别和槽位预测
    - 用户的输入“订一张今天下午场次的战狼电影票”，识别出电影名是“战狼”，时间是“今天下午”；没有识别到影院名称，于是张三根据用户当前的位置，将其预测为XX影院或YY影院，数量和座位位置就没办法预测。针对没办法预测的槽位，张三决定向用户发问或者提供选择来确认“您可以选择电影票张数和座位号完成预定”；对于预测到槽位值不唯一的情况，比如XX影院或YY影院，张三决定让用户自己进行二选一；对于识别到的槽位存在歧义的问题，张三决定进行“澄清”，比如战狼实体不是很明确，需要澄清是战狼1还是战狼2，张三根据现在正上映的是战狼2这一情况来进行自动澄清，但如果此时两部电影都在上映的话，张三就得向用户发问澄清了，比如问“您是想要看战狼1还是战狼2？”。
  - 思考过程完全是按照语义槽来进行的，有什么槽位它就思考什么。当语义槽完全填充且消除了歧义之后，也就完成了整个自然语言理解任务，开始利用知识库回答用户问题或者完成某种操作。
  - 语义槽到底是怎么来的呢？它是如何和用户进行“发问”交互的？
  - 语义槽设计
    - 语义槽定义升级：在语义槽的每个槽位加上相对应的“话术”，系统发现哪个槽位没填充或者有歧义就使用该槽位事先预定义好的话术去“发问”
    - ![](https://pic4.zhimg.com/80/v2-7b37e755fb22692daa6f9768d48b1873_1440w.jpg)
- 实现方法
  - 槽位填充包括命名实体识别和槽位预测，其实说命名实体识别不严谨
    - 如在“订机票”意图下的语义槽中，应该有“出发地”和“目的地”，虽然他们都是地名，但是有区别，他们的顺序不能变，也就是不能用“地名”来统一代替，而命名实体识别的做法就是将他们都当做“地名”
    - 只能称槽位填充是一个序列标注任务，但绝不能说序列标注任务就是命名实体识别，且我们在标注数据的时候也不能一样标注
    - ![](https://pic1.zhimg.com/80/v2-e6ba1911f4151d8194bb3a586457a000_1440w.jpg)
    - ①串行：将意图识别和槽位填充分开，依次进行
    - ②并行：将意图识别和槽位填充进行联合训练模型
  - 经典方法
    - [CRF](https://www.zhihu.com/question/35866596/answer/139485548): 条件随机场。通过设置各种特征函数来给序列打分。
  - 深度方法
    - ①RNN 槽填充
    - ②RNN Encoder-Decoder 槽填充
    - ③Bi-GRU + CRF
      - ——A Joint Model of Intent Determination and Slot Filling for Spoken Language
    - ④[Attention-Based Recurrent Neural Network Models for Joint Intent Detection and Slot Filling](https://arxiv.org/abs/1609.01454) (比较经典，论文是意图识别和槽填充共同训练）
    - ⑤BERT Slot标注：[代码](https://github.com/yym6472/bert_slot_tagging)


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
  - ![](https://upload-images.jianshu.io/upload_images/1535345-afd604658341abf5.png?imageMogr2/auto-orient/strip|imageView2/2/w/636/format/webp)
  - 上图的模型首先提出了一种端到端强化学习的方法，在对话管理中联合训练对话状态跟踪和对话策略学习，从而更有力地对系统的动作进行优化。
- 【2021-3-2】微软的[Jianfeng Gao](https://www.microsoft.com/en-us/research/people/jfgao/)，[ConvLab](https://github.com/ConvLab/ConvLab) is an open-source multi-domain end-to-end dialog system platform，aiming to enable researchers to quickly set up experiments with reusable components and compare a large set of different approaches, ranging from conventional pipeline systems to end-to-end neural models, in common environments.
  - 开源的[ConvLab: Multi-Domain End-to-End Dialog System Platform](https://arxiv.org/abs/1904.08637).
  - [ConvLab-2](https://convlab.github.io/), DSTC9 Track 2: Multi-domain Task-oriented Dialog Challenge II
    - End-to-end Multi-domain Task Completion Dialog Task
    - Cross-lingual Multi-domain Dialog State Tracking Task
  - [Deep Reinforcement Learning for Goal-Oriented Dialogues](https://www.microsoft.com/en-us/research/project/deep-reinforcement-learning-goal-oriented-dialogue/#)
    - ![](https://www.microsoft.com/en-us/research/wp-content/uploads/2017/04/composite-dialogue-1024x459.png)

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

Dialog Acts 如果是用户发起的（User Dialog Act），
那么它是一种处理后的用户意图的抽象表达，是一种形式化的意图描述。

>The dialog act expresses an important component of the intention of the speaker (or writer) in saying what they said
系统发起的行为（Sys Dialog Act），是根据用户行为，上下文信息等等综合得出的，
下一步所要进行的操作的抽象表达，这个抽象表达后续会送入NLG部件，生成自然语言。

>Asking questions, giving orders, or making informational statements are things that people do in conversation, yet dealing with these kind of actions in dialogue what we will call dialog acts is something that the GUS-style frame-based dialog systems
GUS对话系统，是 Genial Understander System 的缩写，可以追溯到1977年的论文(Daniel G. Bobrow, GUS, A Frame-Driven Dialog System, 1977)


常见的不同意图有：
- 用户的greeting：问好  
- 用户的inform：用户提供一个信息，例如想要的餐厅的地址  
- 用户的request：询问一个信息，例如当前结果餐厅的电话  
- 用户的confirm：确认信息正确（例如上一条是机器问你对不对）  
- 用户的bye：结束对话  

机器的greeting：问好，也可以是自我介绍  
- 机器的inform：提供机器知道的信息，例如当前结果餐厅的信息  
- 机器的request：机器必须有足够的信息才能完成任务，如果欠缺一些必须信息，例如餐厅地址、口味，则会向用户询问  
- 机器的confirm：根用户确认信息是否正确  
- 机器的bye：结束对话  

上文还出现了一些可能的特殊意图，例如：
- 用户的order：确认订餐  
- 用户的alter：更换检索结果  
- 系统的order_success：反馈订餐成功  


整个对话系统，就是为了完成某个特定任务，这个任务所需要的特定条件需需要由用户提供（例如帮助买咖啡需要咖啡品种，热或冷等信息），当信息足够的时候，机器就能完成相应任务。

这个过程总结就是：
- 用户说了什么 =》  
- 分析用户意图 =》  
- 生成系统的对应意图（操作）=》  
- 用户听到了系统的反馈 =》  
- 用户说了什么（第二轮）=》
- …………

当然根据任务复杂度、和其他系统结合等等问题，
对话系统本身也有各种的不同准确度与实现方式。


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
- **系统**主导
  - 系统询问用户信息，用户回答，最终达到目标
- **用户**主导
  - 用户主动提出问题或者诉求，系统回答问题或者满足用户的诉求
- 混合
  - 用户和系统在不同时刻交替主导对话过程，最终达到目标
  - 有两种类型，一是用户/系统转移任何时候都可以主导权，这种比较困难，二是根据 prompt type 来实现主导权的移交
  - Prompts 又分为：
    -  open prompt（如 ‘How may I help you‘ 这种，用户可以回复任何内容 ）
    - directive prompt（如 ‘Say yes to accept call, or no’ 这种，系统限制了用户的回复选择）

### DST

- 【2020-12-23】对话状态追踪（DST）的作用：
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

- DST涉及到两方面内容：**状态表示**、**状态追踪**。

- DST形象化
    - ![](https://upload-images.jianshu.io/upload_images/17303794-c1bbad40c15af803.jpg)
- DST常见方法
    - 注意：基于规则的方法虽然可以较好利用先验知识从而可以较好解决冷启动等问题，但是需要太多人工、非常不灵活、扩展性和移植性很差、不能同时追踪多种状态
    - ![](https://upload-images.jianshu.io/upload_images/17303794-21b9f3b4f6e3c539.jpg)
    - （1）CRF
    - （2）NN-Based
    - （3）基于迁移学习做DST
    - （4）Multichannel Tracker
    - （5）Neural Belief Tracker
    - （6）其他：基于贝叶斯网络做DST、基于POMDP（部分可观测马尔可夫决策过程）等
    - 总结对比
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
- （1）**Structure-based Approaches**
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


## 知识型对话

- 资料
  - [chatbot_with_IR](https://github.com/IrvingBei/chatbot_with_IR)：一个利用搜索引擎构建的简单问答系统，webpy服务
    - ![](https://github.com/IrvingBei/hexo_photo/raw/master/qa/demo.png)

### 问答技术框架

- 【2021-1-25】（美团）智能问答技术框架
  - ![](https://pics3.baidu.com/feed/37d12f2eb9389b50842a106dabc123dae6116e30.png)
  - 问题推荐：问题生成、问题排序、问题引导
  - 问题理解：领域/意图识别、实体识别/链接、意图澄清、时效识别、句式识别、实体澄清、槽位填充
  - 问题解决：KB-QA、DocumentQA、CommunityQA、多答案融合排序、TaskBot、NLG
- （1）**Document QA**：商户简介、攻略和UGC评论等非结构化文档中包含大量优质信息，从非结构化文档中提取答案，即文档问答 ( Document QA )。近年来基于深度神经网络的机器阅读理解 ( Machine Reading Comprehension，MRC ) 技术得到了快速的发展，逐渐成为问答和对话系统中的关键技术。Document QA借助机器阅读理解 ( MRC ) 技术，从非结构化文档中抽取片段回答用户问题。在问答场景中，当用户输入问题后，问答系统首先采用信息检索方式从商户详情或诸多UGC评论中查找到相关文档，再利用MRC模型从文档中摘取能够确切回答问题的一段文本。
  - 文档问答系统的答案预测流程包含三个步骤：
    - (a) **文档检索与选择** ( Retriever )：根据Query关键字检索景点等商户下的相关详情和UGC评论，根据相关性排序，筛选出相关的评论用于提取候选答案；
    - (b) **候选答案提取** ( Reader )：利用MRC模型在每个相关评论上提取一段文字作为候选答案，同时判断当前评论是否有答案，预测有答案和无答案的概率；
    - (c) **答案排序** ( Ranker )：根据候选答案的预测得分排序。这样能够同时处理多篇相关评论，比较并选择最优答案，同时根据无答案概率和阈值判断是否拒绝回答，避免无答案时错误回答。
  - 问答框架图
    - 文档检索和排序：上图①表示文档检索的过程，首先根据用户询问的商户名定位到具体商户，通过关键字或向量召回该商户下与Query相关评论或详情信息的TopN篇文档。
    - 答案片段预测：在答案提取任务中，将每条详情或评论作为一个文档 ( Document )，把用户Query和文档拼接起来，中间加入分割符号[SEP]，并在Query前加入特殊分类符号[CLS]；把拼接后的序列依次通过②中的模型，在每条评论上提取一段文字作为候选答案，并预测有答案概率 ( HA Score ) 和无答案概率 ( NA Score )。长度分别为N和M的Query和Document，每一个token经过BERT Encoder，分别得到隐层向量表示Ti(i=1,2,...,N) 和 Tj' (j=1,2,...,M)。将Document的向量表示经过全连接层和Softmax计算后得到每个Token作为答案起始和终止位置的概率Pistart和Pjend，然后找到Pistart*Pjend (i,j=1,2,...,M,i＜j) 最大的组合，将位置i和j之间文字作为候选答案，Pistart*Pjend作为有答案概率 ( HA Score )。
    - 答案排序：答案重排序部分如③所示，根据前一步的候选答案得分 ( HA Score ) 排序，选择最相关的一个或多个答案输出。
    - 无答案判断：在实际使用中还会面临召回文档无答案问题，需要在答案提取的同时加入无答案判断任务。我们的具体做法是联合训练，将BERT模型的[CLS]位置的向量表示C经过额外的全连接层和二分类Softmax，得到无答案概率 ( NA Score )，根据无答案概率 ( NA Score ) 和人为设定的阈值判断是否需要拒绝回答。
    - ![](https://pics3.baidu.com/feed/6159252dd42a28349f98b16f6b410fed14cebf90.png)
  - 存在的问题
    - ①MRC模型抽取的**答案偏短**，回答信息不充分，如问"停车方便吗"，答案为"停车方便'，从MRC任务看，这样的回答也很不错，但该答案并没有回答为什么方便，信息不充分，更期望的答案是"停车方便，有免费停车场"。我们通过在构造模型训练数据时选择更完整的句子作为标准答案，在预测时尽量选择完整的句子作为回答等方式来优化解决；
    - ②另一个问题是**时效性**问题，比如"现在需要预约吗？"明确地问当前的情况，如果用经典的阅读理解获取的答案可能是"可以预约"和"不可以预约"。通常情况下，这种信息在我们UGC是大量存在的，不过有一些信息，非常好的答案可能是一个时效性很差的问题，或是很久以前的评论，这种对用户来说帮助不大。所以我们对时效性进行了相应处理，根据时间的关键词，包括现在、今天，也包括一些事件如樱花、桃花等，它们都有一些特定时间点，这些都作为时间词来处理。还有很多场景，比如景点、酒店等领域，通过梳理也能发现有一些意图跟时效性相关，比如说门票、营业状态等，我们对它们也做相应的时效性处理；再就是"是否类"问题缺少直接回答，MRC模型用于答案片段抽取，适合回答事实类的描述性问题。但是真实存在大量的"是不是、是否、能否"等是否类问题，如"酒店提供饮食吗？"，原来的回答是"早上10元一位管吃饱"，但是回答的不够直接，我们希望同时也能更直接地先回答是否。故此我们采用多任务的学习方式，在MRC模型上加入了Yes/No的分类任务，来判断答案的观点是肯定还是否定。改进后的答案为"是的。早上10元一位管吃饱"。
  - 改进后的框架
    - ![](https://pics6.baidu.com/feed/50da81cb39dbb6fd321f584824d06d1f962b3717.png)
- （2）**Community QA**
  - **社区问答** ( Community Question Answering，CQA ) 和**常见问题问答** ( Frequently Asked Questions，FAQ ) 是基于问答对的问答系统的两种方式。
  - FAQ通常由人工事先维护好问答知识库，当用户问问题时，根据相似度匹配到最相关的问题，并给出对应的答案。FAQ在限定领域内回答质量较好，但是问答知识库整理成本高。
  - 随着社交媒体的发展，CQA可以通过社交平台获得大量用户衍生的问题答案对，为基于问答对的问答系统提供了稳定可靠的问答数据。
    - 美团和大众点评APP中，商户详细页中有一个"问大家"模块，其问题和答案都是由用户生成，含有关于当前商户许多用户关心的关键信息，比如景点相关的"是否允许携带宠物"等客观问题，以及"停车是否方便"等主观问题，很大程度上能回答用户对于景点或其他商户的开放域问题。
  - CQA问答系统处理框架如上图所示，我们将问题处理分为两个阶段，首先离线阶段通过低质量过滤、答案质量排序等维护一个相对质量较好的问题-答案库，在线阶段，从知识库中检索得到答案并回答用户。
- （3）**KB-QA**
  - 主流的KBQA解决方案包括基于查询图方法 ( Semantic Parser )、基于搜索排序方法 ( Information Retrieval )。查询图方案核心思路就是将自然语言问题经过一些语义分析方式转化成中间的语义表示 ( Logical Forms )，然后再将其转化为可以在 KG 中执行的描述性语言 ( 如 SPARQL 语言 ) 在图谱中查询，这种方式优势就是可解释强，符合知识图谱的显示推理过程。
  - 搜索排序方案首先会确定用户Query中的实体提及词 ( Entity Mention )，然后链接到 KG 中的主题实体 ( Topic Entity )，并将与Topic Entity相关的子图 ( Subgraph ) 提取出来作为候选答案集合，通过对Query以及Subgraph进行向量表示并映射到同一向量空间，通过两者相似度排序得到答案。这类方法更偏向于端到端的解决问题，但在扩展性和可解释性上不如查询图方案。在美团场景里我们采用以Semantic Parser方法为主的解决方案。

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

- 【2021-1-28】意图识别和槽填充
  - 意图识别：分类问题，SVM，adaboost和NN等
  - 槽填充：序列标注，CRF，HMM等
  - ![](https://upload-images.jianshu.io/upload_images/5756726-38005b3b2de61d54.jpg)

### 基于模板的问答框架

- 【2016-8-11】张俊林：[聊天机器人中对话模板的高效匹配方法](https://blog.csdn.net/malefactor/article/details/52166235)

>- 我是人：你知道王思聪是谁吗
>- 我是ChatBot：你问国民老公干嘛，你要跟他借钱吗？

- 看上去回答的够机智吧？难道这还没理解人的意思吗？所以说是错觉吗，其实只要在后台存储这么一个匹配模板就能做到上面的机智回答，而且可以确定的一点是，越是回答的有趣的答案，越可以肯定这是通过模板技术来做的，为啥呢？因为其它技术做不到真正理解人的话，更不要说回答的有趣了。

- 一句交互对话的模板由<Q,A>数据对构成，其中Q代表输入模板
  - A代表聊天机器人应该回答什么话，A可能不会是模板，而是就是应答的一句话，也可能是带着标签的模板
  - 但是Q往往采用模板，因为这样覆盖率高，当然Q也完全可以是不带模板通配符的完整的一句话，但是一般而言模板居多，否则要穷举所有可能用户的问话基本不可能，通过加入*或者？这种通配符，可以用一个模板匹配更多的用户输入。

当然，模板可以做得更复杂一些，按照复杂度不同，可能有下面几种类型的模板。
- （1）最简单的模板：一句完整的话作为一个模板
  - Q:你贵姓？
  - A：人家贵性女；
- （2）稍微复杂些的模板：一个模板匹配多种输入
  - Q:你*喜欢*电影*是什么*
  - A:我最喜欢的电影当然是《断背山》了，啥时候咱俩一起去看，帅哥~
- （3）更复杂的，带实体类别标签的模板，把一些常见实体变量抽象出来，适用于经常变化的人名地名日期等的句子模板
  - Q:<PersonName>的生日是<Date>吗？
  - A:哥，我不敢认识<PersonName>.Value啊。
  - 过程：
    - Q：UserA:孙杨的生日是12月32号吗？
    - 聊天系统先上实体识别模块，实体变量的值：<PersonName>.Value=孙杨；<Date>.Value=12月32号，把上面这句话转换成：<PersonName>的生日是<Date>吗？
    - 对话模板库里面有一个匹配上的模板，于是就可以根据Q对应的A内容，把变量值填充进去
    - A：“哥，我不敢认识孙杨啊。”
- （4）智能匹配（多模式匹配+倒排索引）
  - 如果模板数量巨大，比如几十万上百万，那么一个个暴力匹配不现实，用户还以为你ChatBot休克了呢。有什么高效的会话模板匹配方法吗？
  - 测试过查找效率也是非常高的，基本都是几毫秒十几毫秒级别的，和Alice的模板查找速度比性能提升了1到2个数量级，大多数应用场合应该是够用的
  - ①对于每个QA进行唯一编号，并对其Q部分，用切割点把Q切割成若干字符串片段，切割点有哪些呢？包括多字符通配符*和单字符通配符？符号，以及事先定义的实体标签（比如<PersonName>，<Address>，<Date>,<FilmName>等），这里实体标签既是切割点，也是需要记录的字符串片段，一身二用，而通配符只充当切割点。
    - 你*喜欢*电影*是什么* → {你，喜欢，电影，是什么}
    - <PersonName>的生日是<Date>吗？ → {<PersonName>，的生日是，<Date>，吗？}
    - 你贵姓？ → {你贵姓？} （无切割点）
  - ②将这些被切割的字符串片段相同的合并后，形成了字符串字典：Diction={你，喜欢，电影，是什么, 你贵姓？, <PersonName>，的生日是，<Date>，吗？}
  - 根据这个字典构建多模式匹配算法，如Wu_Manber算法，可以从用户输入句子中极快地将字典中包含的字符串片段全部扫描出来；
  - ③根据第一步每个Q对应的编号及其被切割成的片段，建立内存倒排索引，Key是字符串片段内容或者其哈希值（因为有时候这个字符串片段可能是完整的一句话），Value是对应的Q编号序列，等价于一般意义搜索引擎的文档ID列表；
  - ![](https://img-blog.csdn.net/20160809212135234?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)
  - 用户输入NewQ，首先用Wu_Manber算法扫描NewQ，把其中包含的字典中的字符串片段都找出来，比如找出了A,B,C三个片段；使用A,B,C三个片段，从倒排索引中找出同时包含三个片段的模板集合QSet；现在有了用户输入NewQ和一个小的模板集合QSet，可以采用正则表达等传统的方式去进行模式匹配，找出其中某个模式或者一个模式也匹配不上。因为这个QSet相比原先整个模板集合来说，数据量是极小的，绝大多数时候只有一个或者几个，所以这个步骤不会太耗时间。
  - 总结：多模式匹配和倒排索引来快速找到一些候选的模板集合，这个模板集合大小相对原先整个模板集合来说相当小，然后在这个小集合上进行常规的模式匹配。

### TableQA

- 【2021-2-24】[达摩院Conversational AI研究进展及应用](https://t.cj.sina.com.cn/articles/view/2674405451/9f68304b01900tdaj)
- 一个例子来介绍TableQA。
  - 有一个理财产品的Table，围绕这个Table， 用户可能会问：“收益率大于3.5%且保本型的理财产品最低起投金额是多少？”
  - 要想解决这个问题，需要先把自然语言转换成一个SQL语句，然后用SQL语句去查询表格，最终就可以回答这个问题。
  - 所以整个TableQA的核心问题就是**如何解析自然语言：把TEXT文本转变为一个SQL语句**。
- ![](https://n.sinaimg.cn/sinakd2021222s/79/w1080h599/20210222/89ad-kkmphps2654477.png)
- TableQA的优势主要有以下三点：
  - 表格容易获取：企业中存在大量现成的表格，无需加工即可自然获取；
  - 使用门槛低：针对TableQA达摩院已经研究了多种算法，大大降低了企业应用的成本和门槛；
  - 功能强大：支持复杂语言的理解、支持多表查询、支持多轮问答。
- TableQA发展历史
  - TableQA是最近两年里发展最快的一种问答方式。从2017年开始重新被发掘出来，2019年的时候这个方向的研究开始加速，达摩院也是在2019年启动了对TableQA的研究。2020年加速趋势更加明显，达摩院提出的SDSQL模型在WikiSQL上取得了第一名，提出的R2SQL模型在国际公开挑战赛SParC和CoSQL上都取得了第一名的好成绩。
  - ![](https://n.sinaimg.cn/sinakd2021222s/14/w1080h534/20210222/8177-kkmphps2654620.png)
  - ![](https://n.sinaimg.cn/sinakd2021222s/66/w1080h586/20210222/d377-kkmphps2654619.png)
- 达摩院在TableQA上的研究主要是基于多表多轮的数据集（SparC和CoSQL）, 多表指的是寻找答案的时候需要在多个表中进行查询，而不是仅仅靠一张表就能得到答案；多轮指的是用户通常会连续不断的提问。
- 典型数据集
  - 有四个数据集是值得大家去关注的：
    - 第一个是WikiSQL数据集，这是一个单表单轮的数据集；
    - 第二个是多表单轮的Spider数据集；
    - 第三个是多表多轮的SparC数据集；
    - 第四个是CoSQL数据集，这是一个融合了多轮对话特点的多表多轮数据集。

### 【2021-1-20】[How to Build an Open-Domain Question Answering System?](https://lilianweng.github.io/lil-log/2020/10/29/open-domain-question-answering.html)

- Open-domain Question Answering (ODQA) is a type of language tasks, asking a model to produce answers to factoid questions in natural language. The true answer is objective, so it is simple to evaluate model performance.
- For example,
  - Question: What did Albert Einstein win the Nobel Prize for?
  - Answer: The law of the photoelectric effect.
- 开放域问答分类难度：
- When considering different types of open-domain questions, I like the classification by [Lewis, et al., 2020](https://arxiv.org/abs/2008.02637), in increasing order of difficulty:
  - （1）准确记忆训练时期的回答：A model is able to correctly memorize and respond with the answer to a question that has been seen at training time.
  - （2）测试时可以用已有语料回答新问题：A model is able to answer novel questions at test time and choose an answer from the set of answers it has seen during training.
  - （3）回答训练语料意外的问题：A model is able to answer novel questions which have answers not contained in the training dataset.
- 三种类型的图解 Overview of three frameworks discussed in this post
  - ![](https://lilianweng.github.io/lil-log/assets/images/QA-summary.png)
- （1）Open-book QA: Retriever-Reader
  - The retriever-reader QA framework combines information retrieval with machine reading comprehension
  - ![](https://lilianweng.github.io/lil-log/assets/images/QA-retriever-reader.png)
- （2）Open-book QA: Retriever-Generator
  - The retriever + generator QA framework combines a document retrieval system with a general language model.
  - ![](https://lilianweng.github.io/lil-log/assets/images/QA-retiever-generator.png)
- （3）Closed-book QA: Generative Language Model
  - The pre-trained language models produce free text to respond to questions, no explicit reading comprehension.
  - ![](https://lilianweng.github.io/lil-log/assets/images/T5_SSM.png)
- summary
  - ![](https://lilianweng.github.io/lil-log/assets/images/QA-results.png)

### KB-QA

- 【2020-4-22】[KB-QA研究进展](https://www.jianshu.com/p/92ea00b7a4cc)
- ![](https://upload-images.jianshu.io/upload_images/9298309-c4a3c66f7965460e.png)

- [美团智能问答技术探索与实践](https://mp.weixin.qq.com/s?__biz=MzU1NTMyOTI4Mw==&mid=2247517833&idx=1&sn=0cb67429fa434d3dcd5afd6167754313&chksm=fbd734e5cca0bdf3f0cf43b588153d8117dec25d130240dcb9c42d5219cd94b972e463b55063&mpshare=1&scene=1&srcid=1221TKOk0XWVMxG3wT9wowUP&sharer_sharetime=1610600327445&sharer_shareid=b8d409494a5439418f4a89712efcd92a&version=3.1.0.6189&platform=mac#rd)
- KBQA是一种基于知识图谱的问答技术，其主要任务是将自然语言问题 ( NLQ ) 通过不同方法映射到结构化的查询，并在知识图谱中获取答案。相比非结构化文本问答方法利用图谱丰富的语义关联信息，能够深入理解用户问题、解决更多复杂推理类问题。
- 主流的KBQA解决方案包括基于**查询图**方法 ( Semantic Parser )、基于**搜索排序**方法 ( Information Retrieval )。
  - 查询图方案核心思路就是将自然语言问题经过一些语义分析方式转化成中间的语义表示 ( Logical Forms )，然后再将其转化为可以在 KG 中执行的描述性语言 ( 如 SPARQL 语言 ) 在图谱中查询，这种方式优势就是可解释强，符合知识图谱的显示推理过程。
  - 搜索排序方案首先会确定用户Query中的实体提及词 ( Entity Mention )，然后链接到 KG 中的主题实体 ( Topic Entity )，并将与Topic Entity相关的子图 ( Subgraph ) 提取出来作为候选答案集合，通过对Query以及Subgraph进行向量表示并映射到同一向量空间，通过两者相似度排序得到答案。这类方法更偏向于端到端的解决问题，但在扩展性和可解释性上不如查询图方案。
- ![](https://pics6.baidu.com/feed/0b46f21fbe096b6339fce93323c74143e9f8acec.png)
- kbqa核心技术
  - ![](https://pics2.baidu.com/feed/faf2b2119313b07e6a33a9513823572495dd8cdd.png)
- 在知识图谱建模的领域，有一种称为`SPARQL`的语言，类似关系数据库查询的SQL语言，
- 例如我们要查询 **(中国，有首都，北京)** 中的北京，则SPARQL可以写为：

```sql
Select ?x where {
    中国, 有首都, ?x
}
```

- 也就是问题转换为，如何把一句自然语言“中国的首都是哪？”，转换为上面的SPARQL语句？
- 例如现在的一些方向是利用统计机器学习的翻译任务，完成从“自然语言”到“SPARQL”语言的机器翻译任务，就如同中英翻译等自然语言之间的翻译一样，同样也可以做到的。但是根据语料数据、SPARQL复杂度等等问题，也会有其他各种问题。
- 当然也有不依赖SPARQL作为中间件的查询系统，例如有的文献设计了一套在知识图谱中逐渐搜索（探索）的系统；
- 以这个问题为例，起始点可以是实体“中国”，中国这个实体可能有很多关系，例如有首都、有文化、有省份、有xxx，然后搜索下一步最合理的关系“有首都”；
- 最后探索到答案“北京”，判读任务完成。

### IR-QA

- IR-based 问答系统 (IR: Information Retrieval) 不需要提前构建知识，而是根据问题去检索答案（例如从搜索引擎上）。
- 从某种意义上类似人的搜索方式，例如想知道“中国的首都是哪”，可能会去搜索引擎中搜索这个问题，而答案很可能会出现在搜索结果中，这个答案的类型很可能是“某个城市”，所以我们会在搜索引擎给我们的结果中，寻找一个城市名。
- 而机器也可以完成类似过程
  - 先根据问题来尝试判断答案类型，同样也可以判断结果类型为城市。
  - 然后可能需要对问题进行重构，也就是寻找一个搜索问句，能找到答案的几率最大，例如这个问题可能被重构为：“**中国 首都 城市**”。（最后添加了这个词城市，是因为我们假设可以准确判断出答案类型）
  - 机器去自有的非结构化文档（没有知识图谱化的文档，例如各种纯文本文章），从中寻找最接近我们重构后问题的段落。或者去搜索引擎、百科网站等等，搜索答案、或者检索问题相关的段落。
  - 定位到这个段落后，根据答案类型（这里是城市），尝试从这个段落中筛出答案。例如去搜索引擎搜索“中国的首都”，很可能第一个答案段落中的第一个出现的城市名就是我们所需要的答案。


## 闲聊型对话

- 微软小冰通用闲聊框架,通用闲聊的整体流程也是 检索 + 排序
- ![](https://pic2.zhimg.com/80/v2-aac4cf4dab6f96b8354f54bba3f2a2a9_720w.jpg)
- 任务框架 [微软小冰对话机器人框架](https://zhuanlan.zhihu.com/p/57532328)
  - 任务机器人应该用的还是 Frame-based 的经典框架。这块就不再多说，值得提的是，小冰会依据用户画像给出个性化的答复。例如一个美国人问中国面积多大时，答复里的面积单位是平方英里，而中国人问答复里的面积单位是平方公里。
  - ![](https://pic1.zhimg.com/80/v2-ba47b03339fe6c07beb60f8f719b1660_720w.jpg)

## 对话机器人工程实现

- 各类聊天机器人框架

### JSGF

- 强大的正则工具，支持快速定制NLU

- CFG、JSGF系列规则体系
  - [JSpeech Grammar Format Specification](https://www.w3.org/TR/jsgf/)
- [语音识别百度jsgf语法笔记](https://wenku.baidu.com/view/c6a80e04580102020740be1e650e52ea5518cec0.html)

- 示例

```js
# JSGF V1.0 UTF-8 en; grammar com.local; 
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

- 注：暂不支持import功能，已提issue（[Suggestion: it's better to add `import` function](https://github.com/Danesprite/pyjsgf/issues/36)）


- 案例

```js
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
  - **Rasa NLU** （NLU）：用于理解用户消息，包括意图识别和实体识别，它会把用户的输入转换为结构化的数据。
    - 支持不同的 Pipeline，其后端实现可支持spaCy、MITIE、MITIE + sklearn 以及 tensorflow，其中 spaCy 是官方推荐的，另外值得注意的是从 0.12 版本后，MITIE 就被列入 Deprecated 了。
    - Rasa提供了数据标注平台: [rasa-nlu-trainer](https://rasahq.github.io/rasa-nlu-trainer/)
  - **Rasa Core** (DM)：对话管理平台，用于举行对话和决定下一步做什么。Rasa Core是用于构建AI助手的对话引擎，是开源Rasa框架的一部分。
    - 负责协调聊天机器人的各个模块，起到维护人机对话的结构和状态的作用。对话管理模块涉及到的关键技术包括对话行为识别、对话状态识别、对话策略学习以及行为预测、对话奖励等。
    - Rasa消息响应过程
      - ![](https://upload-images.jianshu.io/upload_images/3285850-ece175b3a873ff90)
      - 首先，将用户输入的Message传递到Interpreter(NLU模块)，该模块负责识别Message中的"意图(intent)“和提取所有"实体”(entity)数据；
      - 其次，Rasa Core会将Interpreter提取到的意图和识别传给Tracker对象，该对象的主要作用是跟踪会话状态(conversation state)；
      - 第三，利用policy记录Tracker对象的当前状态，并选择执行相应的action，其中，这个action是被记录在Track对象中的；
      - 最后，将执行action返回的结果输出即完成一次人机交互。
    - Rasa Core包含两个内容： stories 和 domain。
      - domain.yml：包括对话系统所适用的领域，包含意图集合，实体集合和相应集合，相当于大脑框架，指定了意图`intents`， 实体`entities`， 插槽`slots`以及动作`actions`。
        - intents和entities与Rasa NLU模型训练样本中标记的一致。slot与标记的entities一致，actions为对话机器人对应用户的请求作出的动作。
        - 此外，domain.yml中的templates部分针对utter_类型action定义了模板消息，便于对话机器人对相关动作自动回复。
      - story.md：训练数据集合，原始对话在domain中的映射。
        - Stories
          - stories可以理解为对话的场景流程，需要告诉机器多轮场景是怎样的。Story样本数据就是Rasa Core对话系统要训练的样本，它描述了人机对话过程中可能出现的故事情节，通过对Stories样本和domain的训练得到人机对话系统所需的对话模型。
          - Rasa Core中提供了rasa_core.visualize模块可视化故事，有利于掌握设计故事流程。
- Rasa X（web工具）是一个工具，可帮助您构建、改进和部署由Rasa框架提供支持的AI Assistants。 Rasa X包括用户界面和REST API。
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


## 评估方法

- 对话系统（Dialogue System），简单可以理解为Siri或各种Chatbot所能支持的聊天对话体验。
  - 【2017-4-14】[【重磅福利】人工智能产品经理的新起点（200页PPT下载）](https://mp.weixin.qq.com/s?__biz=MjM5NzA5OTAwMA==&mid=2650005551&idx=1&sn=784934afea29bea448cff68fbdd0d7cb&chksm=bed864b889afedae09e4ea2a17fa82fef164962b7ffa2407e17986bb14f42171c975c116eccf&scene=21#wechat_redirect)
  - AI产品经理分类：**平台网站类**、**垂直场景类**以及**对话聊天类**
- 1、**用户任务达成率**（表征产品功能是否有用以及功能覆盖度）
  - 1）比如智能客服，如果这个Session最终是以接入人工为结束的，那基本就说明机器的回答有问题。或者重复提供给用户相同答案等等。
  - 2）分专项或分意图的统计就更多了，不展开了。
- 2、**对话交互效率**，比如用户完成一个任务的耗时、回复语对信息传递和动作引导的效率、用户进行语音输入的效率等（可能和打断，One-shot等功能相关）；具体定义，各个产品自己决定。
- 3、根据对话系统的类型分类，有些区别。
  - 1）**闲聊型**
    - A）`CPS`（Conversations Per Session，平均单次对话轮数）。这算是微软小冰最早期提出的指标，并且是小冰内部的（唯一）最重要指标；
    - B）`相关性`和`新颖性`。与原话题要有一定的相关性，但又不能是非常相似的话；
    - C）`话题终结者`。如果机器说过这句话之后，通常用户都不会继续接了，那这句话就会给个负分。
  - 2）**任务型**
    - A）`留存率`。虽然是传统的指标，但是能够发现用户有没有形成这样的使用习惯；留存的计算甚至可以精确到每个功能，然后进一步根据功能区做归类，看看用户对哪类任务的接受程度较高，还可以从用户的问句之中分析发出指令的习惯去针对性的优化解析和对话过程；到后面积累的特征多了，评价机制建立起来了，就可以上强化学习；比如：之前百度高考，教考生填报志愿，就是这么弄的；
    - B）`完成度`（即，前文提过的“用户任务达成率”）。由于任务型最后总要去调一个接口或者触发什么东西来完成任务，所以可以计算多少人进入了这个对话单元，其中有多少人最后调了接口；
    - C）`相关的`，还有（每个任务）平均slot填入轮数或填充完整度。即，完成一个任务，平均需要多少轮，平均填写了百分之多少的槽位slot。对于槽位的基础知识介绍，可详见《填槽与多轮对话-AI产品经理需要了解的AI技术概念》。
  - 3）**问答型**
    - A）转人工比例：最终求助人工的比例（即，前文提过的“用户任务达成率”相关）；
    - B）重复率：重复问同样问题的比例；
    - C）无结果率：“没答案”之类的比例。
    - 整体来说，行业一般PR宣传时，会更多的提CPS。其他指标看起来可能相对太琐碎或不够高大上，但是，实际工作中，可能CPS更多是面向闲聊型对话系统，而其他的场景，可能更应该从“效果”出发。比如，如果小孩子哭了，机器人能够“哭声安慰”，没必要对话那么多轮次，反而应该越少越好。
- 4、语料自然度和人性化的程度
- 目前对于这类问题，一般是使用**人工评估**的方式进行。语料通常不是单个句子，而是分为单轮的问答对或多轮的一个session。一般来讲，评分范围是1~5分（或GSB打分）：
  - 1分或2分：完全答非所问，以及含有不友好内容或不适合语音播报的特殊内容；
  - 3分：基本可用，问答逻辑正确；
  - 4分：能解决用户问题且足够精炼；
  - 5分：在4分基础上，能让人感受到情感及人设。
- 另外，为了消除主观偏差，采用多人标注、去掉极端值的方式，是当前普遍的做法。
- 5、常规互联网产品，都会有整体的用户指标；AI产品，一般也会有这个角度的考量。
  - 1、DAU（Daily Active User，日活跃用户数，简称“日活”）
    - 在特殊场景会有变化，比如在车载场景，会统计“DAU占比（占车机DAU的比例）”。
  - 2、被使用的**意图丰富度**（使用率>X%的意图个数）。
  - 3、可尝试通过用户语音的情绪信息和语义的情绪分类评估**满意度**。
    - 尤其对于生气的情绪检测，这些对话样本是可以挑选出来分析的。比如，有公司会统计语音中有多少是骂人的，以此大概了解用户情绪。还比如，在同花顺手机客户端中，拉到最底下，有个一站式问答功能，用户对它说“怎么登录不上去”和说“怎么老是登录不上去”，返回结果是不一样的——后者，系统检测到负面情绪，会提示转接人工。


- 【2020-9-21】一篇解决对话无监督评估的论文：[How NOT To Evaluate Your Dialogue System: An Empirical Study of
Unsupervised Evaluation Metrics for Dialogue Response Generation](https://arxiv.org/pdf/1603.08023.pdf)，[论文引用图谱](https://www.connectedpapers.com/main/129cbad01be98ee88a930e31898cb76be79c41c1/How-NOT-To-Evaluate-Your-Dialogue-System-An-Empirical-Study-of-Unsupervised-Evaluation-Metrics-for-Dialogue-Response-Generation/graph)


## 资料

- [基于Python/Tornado的图灵服务(个人机器学习平台)](https://github.com/CaiquanLiu/MyTuringService)
- 陈海青：[阿里小蜜机器人交互](https://myslide.cn/slides/2443?vertical=1)
- Google对话系统分享，[Deep Learning for Goal-Oriented Conversational Understanding](https://www.slideshare.net/AIFrontiers/ai-frontiers-dilek-hakkanitur-conversational-machines-deep-learning-for-goaloriented-dialogue-systems)
  - <iframe src="//www.slideshare.net/slideshow/embed_code/key/uiOx6qQI3MHgxW" width="595" height="485" frameborder="0" marginwidth="0" marginheight="0" scrolling="no" style="border:1px solid #CCC; border-width:1px; margin-bottom:5px; max-width: 100%;" allowfullscreen> </iframe> <div style="margin-bottom:5px"> <strong> <a href="//www.slideshare.net/AIFrontiers/ai-frontiers-dilek-hakkanitur-conversational-machines-deep-learning-for-goaloriented-dialogue-systems" title="Dilek Hakkani-Tur at AI Frontiers: Conversational machines: Deep Learning for Goal-Oriented Dialogue Systems" target="_blank">Dilek Hakkani-Tur at AI Frontiers: Conversational machines: Deep Learning for Goal-Oriented Dialogue Systems</a> </strong> from <strong><a href="https://www.slideshare.net/AIFrontiers" target="_blank">AI Frontiers</a></strong> </div>
- 【2019-11-6】哈工大张伟男：[人机对话关键技术及挑战](https://www.infoq.cn/article/QpC2C5HSpHRM9v88Llv0)，[ppt](https://docsplayer.com/99875702-%E4%BA%BA%E6%9C%BA%E5%AF%B9%E8%AF%9D%E6%8A%80%E6%9C%AF%E5%89%8D%E6%B2%BF%E5%8F%8A%E5%8A%A8%E6%80%81.html)
  - <div><div><a target='_blank' href='https://docsplayer.com/99875702-%E4%BA%BA%E6%9C%BA%E5%AF%B9%E8%AF%9D%E6%8A%80%E6%9C%AF%E5%89%8D%E6%B2%BF%E5%8F%8A%E5%8A%A8%E6%80%81.html'>人机对话技术前沿及动态</a></div><div><iframe frameborder="0" style="border-bottom: 2px solid #eee; border-top: 0px;" scrolling="no" src="http://docsplayer.com/docview/89/99875702/" width="728" height="412" allowfullscreen></iframe></div></div>

- 【2020-6-18】Facebook开源有史以来最大的开域聊天机器人  [Blender](https://parl.ai/projects/recipes/), [论文](http://t.cn/A6A429XT)
- 【2020-7-4】开域聊天机器人技术介绍——未来篇（[上](https://mp.weixin.qq.com/s?__biz=MzI1NTMxOTUwOA==&mid=2247485263&idx=1&sn=3be60ccf90324d8f267222a1efb17792&chksm=ea368bf4dd4102e24ae94133abea1d10a70daef753105e6bac7e026bc1adad0506d8ad867dc7&scene=21#wechat_redirect),[下](https://mp.weixin.qq.com/s/czPDx8YNoZseC0EisKZVpQ)）
- 更多[Demo地址](http://wqw547243068.github.io/demo)

- 【2021-1-28】[微软团队：首次公开小冰系统设计，迄今最详细](https://www.huxiu.com/article/278885.html)
  - IQ和EQ的结合是小冰系统设计的核心。小冰的个性也是独一无二的。
  - IQ 能力包括知识和记忆建模、图像和自然语言理解、推理、生成和预测
  - EQ有两个关键组成部分：同理心和社交技巧。xs
- 微软小冰框架
  - 小冰的总体架构如图4所示。它由3个层组成：用户体验、对话引擎和数据。
    - 用户体验层：该层将小冰连接到流行的聊天平台(如微信、QQ)，并以两种模式与用户交流：全双工模式和轮流对话模式。该层还包括一组用于处理用户输入和小冰响应的组件，如语音识别和合成、图像理解和文本规范化。
    - 对话引擎层：由对话管理器、移情计算模块、核心聊天和对话技能组成。
      - 对话引擎层主要包括四大组件：对话管理器、移情计算(empathetic computing)、Core Chat和技巧。
        - 对话管理器是对话系统的中央控制器。它由全局状态跟踪器(Global State Tracker)和对话策略(Dialogue Policy)组成。 该操作可以是顶级策略激活的技巧或Core Chat。
        - 全局状态跟踪器通过一个工作内存(working memory)来跟踪对话状态。工作内存在每个会话开始时是空的，然后在每个对话中将用户和小冰的对话以及根据移情计算模块从文本中检测到的实体和移情标签，用文本字符串的形式来进行存储。
        - 移情计算，小冰使用分层策略：
          - ⑴顶级策略通过在每个对话轮次中选择Core Chat或基于对话状态激活的技能来管理整个会话; 
          - ⑵一组低级策略，每个策略对应一种技能，用于管理其会话段。
          - 对话策略旨在通过基于XiaoIce用户反馈的迭代、反复试验和错误过程来优化长期用户参与。
        - 话题管理器模拟人类在对话期间更改话题的行为。它由一个分类器和一个话题检索引擎组成，分类器用于在每个对话回合决定是否切换话题。如果小冰对话题没有足够的了解，无法进行有意义的对话，或者用户感到厌烦，就会引发话题切换。
    - 数据层：由一组数据库组成，这些数据库存储收集到的人类会话数据(文本对或文本图像对)、用于核心会话和技能的非会话数据和知识图，以及小冰和所有注册用户的个人档案。
  - ![](https://img.huxiucdn.com/article/content/201812/28/162450034922.jpg?imageView2/2/w/1000/format/jpg/interlace/1/q/85)
  
- [Chatbot Catalog: Customer Service](https://github.com/chatopera/chatbot.catalog.customer-service)
- 智能客服、聊天机器人的应用和架构、算法分享和介绍

### 聊天机器人

- [对话智能：国际视角，国内形势及案例学习](https://www.infoq.cn/article/AsSJ4cx5mLsa7SYl3-EY)
- [实录分享 | 计算未来轻沙龙：对话系统研究进展（视频 + PPT）](https://mp.weixin.qq.com/s/YxpU4Q7QsUS3RGtlcK4Gwg)
- [聊天机器人初学者完全指南](https://mp.weixin.qq.com/s/oOfJ-i-oKVXsRFICEPes5w)
- [聊天机器人设计思考](https://github.com/qhduan/ConversationalRobotDesign)
- [万物有灵：人机对话系统解析](https://mp.weixin.qq.com/s/Nj1kwKm333sNIGuvR6L4aA)
- [Bot：带来对话式体验的下一代 UI](https://mp.weixin.qq.com/s/dclUGI6OtI04bXQhIqwImg)
- [聊天机器人技术的研究进展](https://mp.weixin.qq.com/s/CsoNU4pMnuMNX1zwwW-Dag)
- [总结 │ 解密 chatbot 人工智能聊天机器人 技术沙龙](https://mp.weixin.qq.com/s/r7vPOSdH7XK_3jc1WLqr2Q)
- [盘点 | 聊天机器人的发展状况与分类](https://mp.weixin.qq.com/s/OX1LBLsk-KNNw_wEwcuJNQ)
- [巨头们都很重视的聊天机器人，你不进来看看吗？](https://mp.weixin.qq.com/s/437xI1vbi7x37Uw-tL43Xg)
- [为什么聊天机器人从业者都很委屈？](https://mp.weixin.qq.com/s/_pbqkAsDEkRbxLB3ehFuUA)
- [“聊天机器人的革命创举” | Plug and Play 独家对话 Chatopera ](https://www.sohu.com/a/243757997_621617)
- [聊天机器人多会长成“女孩” 性别和性格会突变](http://tech.qianlong.com/2017/0220/1415584.shtml)
- [这个时代，机器人也要肤白貌美性格好？](https://mp.weixin.qq.com/s/6B_SkNqYw7TI6bhcghu-ow)
- [人工智障 2 : 你看到的 AI 与智能无关](https://mp.weixin.qq.com/s/tFcVohNjdhvBE_INQk9muQ)
- [【独家】百度朱凯华：智能搜索和对话式 OS 最新技术全面解读（65PPT）](https://mp.weixin.qq.com/s/oMoPk8FoVm9xMQpQISgq6A) -[专栏 | 聊天机器人：困境和破局](https://mp.weixin.qq.com/s/6lY4SBVioqHyCzDimQNn8w)

- [AI 聊天机器人设计指南 | AIID 编译组](https://mp.weixin.qq.com/s/bA0Dfe4VwUK17NphaWVssg)

- [对话机器人思考(下):复杂多轮对话的关键功能点](https://mp.weixin.qq.com/s/sBXZVFGWPRtDI2tc4Z-Rnw)
- [机器人和你对话时在想什么？](https://www.infoq.cn/article/jcMG9tULS7RKIhjqbedL)
- [ACL 2019 开源论文 | 基于知识库和大规模网络文本的问答系统](https://mp.weixin.qq.com/s/Tp751Ox-p_ctD8o19nxbrg)

- [最新综述：对话系统之用户模拟器](https://mp.weixin.qq.com/s/eb0GcjdwO18-_0T9z3KdlA)
- [Domain+Intent+Slot 真的在理解自然语言吗？](https://mp.weixin.qq.com/s/g89KS05W7fQndvhFPtcpYA)
- [通用领域对话问答](https://mp.weixin.qq.com/s/gTytudJl4UY0_A4WkuNn0Q)
- [Chatopera 多轮对话设计器:实现天气查询机器人的过程](http://www.ctiforum.com/news/guandian/540278.html)
- [基于金融-司法领域(兼有闲聊性质)的聊天机器人](https://mp.weixin.qq.com/s/ziM0U-KEePjZLNMhK5PVXA)

- [AI 中台——智能聊天机器人平台的架构与应用|分享实录（附视频）](https://mp.weixin.qq.com/s/c5uXsPIwFzoMwqmG2-JUPg)

- [基于 CNN 和序列标注的对联机器人 | 附数据集 & 开源代码](https://mp.weixin.qq.com/s/wH8nFwaDryrjBn1y-e-QdQ)
- [深度长文：NLP 的巨人肩膀（上）](https://mp.weixin.qq.com/s/Rd3-ypRYiJObi-e2JDeOjQ)
- [问答系统冠军之路：用 CNN 做问答任务的 QANet](https://mp.weixin.qq.com/s/Xc4kh3y-wHfyVt0-BL1RBQ)
- [竹间智能 CTO 翁嘉颀：如何打造主动式对话机器人 | 吃瓜笔记](https://mp.weixin.qq.com/s/HWWkzgv5b5TvG-ySkTy3eQ)

- [聊天机器人“进化论”:从陪你聊到懂你心](https://mp.weixin.qq.com/s/p2hhJ2u7y6JRzhoh7BRC2A)
- [研学·产品设计 | Chatbot 的人格很重要吗？](https://mp.weixin.qq.com/s/ZotAU1q7-54zJ1-3V6G-NQ)
- [用 TensorFlow 实现智能机器人](https://mp.weixin.qq.com/s/bnDlLdtTfUxv9b4QUNuhNw)

- [对话系统原理和实践](https://mp.weixin.qq.com/s/WcmgZz75L2k4lTHw5YRrKg)

- [以 Facebook 的 wit.ai 为例讲解机器人对话平台（Bot Framework）](https://mp.weixin.qq.com/s/WUCvo2JjJMdmLSPCQ6oNIg)
- [从 api.ai 工作原理来看构建简单场景 chatbot 的一般方法](https://mp.weixin.qq.com/s/1NZK_of6G7YLmVRN0IJaEw)
- [利用逻辑回归模型判断用户提问意图](https://mp.weixin.qq.com/s/FVNPaB9k3WunPab6nJeJAA)
- [一天开发一款聊天机器人](https://mp.weixin.qq.com/s/yTQKO52i6zHiG8dYvLwe9w)
- [分享丨浅谈垂直领域的 chatbot](https://mp.weixin.qq.com/s/h8uontPdM5JyD-T71eAHqg)
- [学术】联合意图推测和槽位填充的基于注意力的循环神经网络模型](https://mp.weixin.qq.com/s/lw3zLhxoJEbEQz0KGsS7KQ)
- [赛尔原创 | 聊天机器人中用户出行消费意图识别方法研究](https://mp.weixin.qq.com/s/ZexnTKHEFKPso5fhZNQfQQ)
- [“搜你所想”之用户搜索意图识别](https://mp.weixin.qq.com/s/iZktDVvurlCQxdz-O6xGBw)

- [图灵机器人：带着千亿条语料库，它成为了 QQ 的群聊机器人 | 创业](https://mp.weixin.qq.com/s/rqOgiuOCh1uZ71Qe3rWhYg) -[PaperWeekly 第 40 期 | 对话系统任务综述与基于 POMDP 的对话系统](https://mp.weixin.qq.com/s/Y1AmrK4kIBNtXwdW718cag)
- [让聊天机器人同你聊得更带劲 - 对话策略学习 | 论文访谈间 #21](https://mp.weixin.qq.com/s/vt25TVX-tcurtAC63dYYNA)
- [“小会话，大学问” - 如何让聊天机器人读懂对话历史？| 论文访谈间 #03](https://mp.weixin.qq.com/s/9PRVaafBCHy1kjO9LQyHoA)
- [最全盘点| 入侵保险业的聊天机器人](https://mp.weixin.qq.com/s/m9HuxxQN43wCI42Lhi-m5g)

- [机器学习利用 Elasticsearch 进行更智能搜索](https://mp.weixin.qq.com/s/6-KAMm-HKUURR0OU_-ZhiA)
- [用 Rasa NLU 构建自己的中文 NLU 系统](https://mp.weixin.qq.com/s/pdHAMBhNOiANe2JUUMadYw)
- [实战 | 让机器人替你聊天，还不被人看出破绽？来，手把手教你训练一个克隆版的你](https://mp.weixin.qq.com/s/il7EJKwiAjiOmEV-xtt3IA)
- [观点 | 如何从一名软件工程师转行做人工智能？](https://mp.weixin.qq.com/s/EB469sq3TauBk_JioIVUSw)
- [未来，AI+多轮对话将怎样玩转智能客服](https://zhuanlan.zhihu.com/p/26296810)
- [聊天机器人落地及进阶实战 | 公开课速记](https://mp.weixin.qq.com/s/h6BjW1nrV4z30eWfny7Wzw)

### 汇总

- [聊天机器人资料汇总](https://mp.weixin.qq.com/s/7xmDcaczpda5eoViPrjLRA)
- [【专知荟萃 05】聊天机器人 Chatbot 知识资料全集（入门/进阶/论文/软件/数据/专家等）(附 pdf 下载)](https://mp.weixin.qq.com/s/GLrJ9HImHztVcN8w1Wk2ng)
- [【专知荟萃 04】自动问答 QA 知识资料全集（入门/进阶/论文/代码/数据/综述/专家等）（附 pdf 下载）](https://mp.weixin.qq.com/s/OFqCIMPV3oiQmZdkwoiN8Q)
- [智能问答与深度学习](https://item.jd.com/12479014.html)
- [MSRA 周明博士解读：聊天机器人的三大引擎（视频+PPT）](https://mp.weixin.qq.com/s/FBynWU8BLyJcUomO3Y8mSg)
- [聊天机器人平台：Chatopera 云服务使用指南](https://www.bilibili.com/read/cv7526530)

### 对话管理

- [干货｜深度强化学习在面向任务的对话管理中的应用](https://mp.weixin.qq.com/s/uDFsWebfLmka-zZX3Y_8kg)
- [机器人，我们来聊天吧](https://mp.weixin.qq.com/s/IsN60tmtERjWb2howxs4ug)
- [多轮对话之对话管理(Dialog Management)](https://mp.weixin.qq.com/s/9i8v2kiPQKLYicoASJvfQg)
- [【小夕精选】多轮对话之对话管理(Dialog Management)](https://mp.weixin.qq.com/s/QIXqgzK-XBRgbtfY3uP0sg)

### 知识图谱

- [基于知识图谱的人机对话系统 | 公开课笔记](https://mp.weixin.qq.com/s/vRsqMgBUI6Nv1ieFDx5jDQ)
- [基于知识图谱的问答系统关键技术研究（一）](https://mp.weixin.qq.com/s/rpUtdoOWMX4meQjw6-D6gw)
- [基于知识图谱的问答系统关键技术研究（三）](https://mp.weixin.qq.com/s/6D0d6Fp6wBvDyOyvFlJ1Qg)
- [肖仰华 | 基于知识图谱的问答系统](https://mp.weixin.qq.com/s/pl1m8ZgFQS-O-t7scUvUYQ)
- [当知识图谱遇上聊天机器人](https://mp.weixin.qq.com/s/iqFXvhvYfOejaeNAhXxJEg)
- [聊天机器人对知识图谱有哪些特殊的需求？](https://mp.weixin.qq.com/s/aHY9peDgWAVDom4at6vtSw)

### 智能客服

- [十张图解读我国智能客服行业发展现状与前景](https://mp.weixin.qq.com/s/cht9ng1OMLwS_NgQh_8rQw)
- [AI 前沿 | 如何让智能客服更有温度？](https://mp.weixin.qq.com/s/d6ie_Q-NyMh4Sp4mXWqpyQ)
- [春松客服：一个开源的智能客服系统](https://chatopera.blog.csdn.net/article/details/82502190)
- [不是所有的智能机器人都能做好客服——浅谈智能客服机器人评价指标新趋势](https://mp.weixin.qq.com/s/n-uicubtTFyOH00HAvRgMQ)
- [能感知情绪的 IBM 机器人，正打算消灭人工在线客服](https://mp.weixin.qq.com/s/hYnnWFlZr2R_DNcGuhw6Zg)
- [关于券商智能客服，那些绕不开的坑](https://mp.weixin.qq.com/s/UX_JABQ7YlhSKbDCPF4fyw)
- [你问我答之「智能客服评价体系全解读」](https://mp.weixin.qq.com/s/Xj2QMbZXPLigiFhsT33k_A)
- [追一科技券商 AI 沙龙：智能呼叫的价值落地](https://mp.weixin.qq.com/s/3FM8z5Fxtlfau33NaWhrpQ)
- [详解第二代客服机器人 | 聚焦问题解决，客户服务任务一站直达](https://mp.weixin.qq.com/s/OQL4Acw_6ukLhoQzR5dN7A)
- [项目实战｜智能客服（“七鱼”、“小 i 机器人”）产品分析](https://www.toutiao.com/a6491864897222083085/?timestamp=1572194640&app=news_article&group_id=6491864897222083085&req_id=2019102800440001001404115117B2ADF3)

### 知识库

- [王浩：新一代智能化知识库（PPT 可下载）](https://mp.weixin.qq.com/s/O_scTuIto698EM8oivoDoQ)
- [新一代呼叫中心智能知识库什么样？](https://mp.weixin.qq.com/s/lkr-lqkjxXfkJ2QYP4y6lA)
- [你问我答之「YiBot 知识体系运营知多少」](https://mp.weixin.qq.com/s/9-HUoePmGvv40JVWcPtHew)
- [揭开知识库的神秘面纱 8·非结构化知识源篇](https://mp.weixin.qq.com/s/cNW_GEQXOYQvJthnVSgimw)
- [智能客服知识库的 3 件核心工作](https://mp.weixin.qq.com/s/Y71NeiQ-Wcxz-bxXVhmo1g)

### 阿里巴巴

- [阿里小蜜新一代智能对话开发平台技术解析](https://mp.weixin.qq.com/s?__biz=MzU1NTMyOTI4Mw==&mid=2247494321&idx=1&sn=7f58bafd7f1962e17f3162ef0917c431&chksm=fbd758ddcca0d1cb19c452c40697c816f788d29b90af4f703a0fc776897f80b087d0a3bc885a&scene=27#wechat_redirect)
- [阿里小蜜：知识结构化推动智能客服升级](https://mp.weixin.qq.com/s/x9CkAyLKgLj7E7K1F2Q6iA)
- [阿里云小蜜对话机器人背后的核心算法](https://mp.weixin.qq.com/s/ksVbQq42ay5lxcfqNwBgxA)
- [大中台、小前台，阿里小蜜这样突破对话机器人发展瓶颈](https://www.infoq.cn/article/8cN5eZ6Bgg*CWM5z5jYr)
- [机器如何猜你所想？阿里小蜜预测平台揭秘](https://mp.weixin.qq.com/s/L5yNtibL-D9Rv9hd-WLN3g)
- [阿里小蜜：智能服务技术实践及场景探索](https://mp.weixin.qq.com/s/uzmcISuDbf7EkralufAKhA)
- [云小蜜：在中国移动的落地实践](https://mp.weixin.qq.com/s/3ylhIZf7OyTu24WeynHzxA)
- [阿里小蜜这一年，经历了哪些技术变迁？](https://zhuanlan.zhihu.com/p/33596423?utm_source=wechat_timeline&utm_medium=social&utm_oi=32105543237632&from=timeline)
- [论文导读 | 阿里小蜜背后的技术秘密](https://mp.weixin.qq.com/s/2Y66uCi1qS0VTaizyCg3cA)
- [小蜜家族知多少：人工智能客服如何做到“不智障”？](https://mp.weixin.qq.com/s/d86lvXwU7Z1QloPVqQfkCQ)
- [售后智能客服：店小蜜用户体验地图](https://mp.weixin.qq.com/s/YcWJNEtU4cElBj5mapEp8Q)
- [为减少用户电话排队，阿里研发了智能客服调度系统](https://mp.weixin.qq.com/s/nqOvcKtxpqehWFO4XkXr5g)
- [阿里千亿级购物节背后，淘宝智能客服架构演进之路](https://mp.weixin.qq.com/s/tiGxIeY9sDRdbMvKxcOS7w)（ps:偏在线客服）
- [资源 | 从搜索到智能客服：阿里开放强化学习技术演进与实践书籍](https://mp.weixin.qq.com/s/EDriDFD7Ep1LwpFvVPu5kQ)
- [首次披露！阿里线下智能方案进化史](https://mp.weixin.qq.com/s/FIWfbCLgckVzeNvfThIl4Q)
- [深度揭秘天猫精灵对话引擎](https://mp.weixin.qq.com/s/6OgoSTsq8ayrvC1DxN21SA)
- [支付宝换上“读心术”AI 客服，就为配合双 11 剁手的你](https://mp.weixin.qq.com/s/vyVPjOhCv6Vt3CTXjzds2Q)
- [专访 | 蚂蚁金服 MISA：比用户更懂自己的自然语言客服系统](https://mp.weixin.qq.com/s/NhfHGQG6rBRnL5PFiI4y3w)
- [COPC 高管访谈：蚂蚁金服客服服务及权益保障事业部总监，智能客服业务负责人 —— 丁翌先生](https://mp.weixin.qq.com/s/zjo-oUnVQyi3lZYQgexVcw)
- [蚂蚁金服-“新客服”白皮书（附下载）](https://mp.weixin.qq.com/s/3KBaLgD17vXAYJ5h75M6tg)
- [（支付宝宣传）当人工智能遇上客服，他们是怎样让科幻变成现实？](https://mp.weixin.qq.com/s/FN-TJXxtXdA_3rvBVeVkag)
- [我其实一直都懂你|闲鱼聊天机器人](https://mp.weixin.qq.com/s/d3eOEmcLGSWQaYE1R47tQA)

### 云问（拼多多、当当）

- [云问智能客服 电商盛宴的“神助攻”！](https://mp.weixin.qq.com/s/YZKWauV_uUhd3Zj47qlGYw)

### 携程

- [干货 | “猜你所想，答你所问”，携程智能客服算法实践](https://mp.weixin.qq.com/s/6dKticG2I2zqlxnZ3W0ZgQ)
- [携程：上万坐席呼叫中心异地双活架构及系统设计](https://mp.weixin.qq.com/s/LbsfqRIUe2eU6bHuSlaXig)
- [携程呼叫中心异地双活——座席服务的高可用](https://mp.weixin.qq.com/s/-RxPjgrMqnjzHLyDuf5FtA)
- [AI 在携程智能客服的应用](https://gitbook.cn/books/5b68ff1849f1ee5bca044a01/index.html)
- [携程度假智能云客服平台](https://gitbook.cn/gitchat/geekbook/5c4abd3b4ab8b926cf73acc5/topic/5c51b83e05e8eb6bebd91298)
- [携程基于云的软呼叫中心及客服平台架构实践](https://gitbook.cn/gitchat/geekbook/5c4abd3b4ab8b926cf73acc5/topic/5c545ab61d9d3040d6aef9ba)
- [机器学习在酒店呼叫中心自动化中的应用](https://gitbook.cn/gitchat/geekbook/5c4abd3b4ab8b926cf73acc5/topic/5c51b6be05e8eb6bebd9127b)
- [干货 | 携程度假智能客服机器人背后是这么玩的](https://mp.weixin.qq.com/s/4rlpTSNX9XrqPTJ5ufPm5w)
- [携程“小诗机”背后的机器学习和自然语言处理技术](https://gitbook.cn/gitchat/geekbook/5c4abd3b4ab8b926cf73acc5/topic/5c52be38094c09644b23f021)

- [行业智能客服构建探索](https://gitbook.cn/gitchat/geekbook/5c4abd3b4ab8b926cf73acc5/topic/5c52f476dc96fe6e50a51cf9)
- [干货 | 揭秘携程基于融合通讯技术的新一代客服系统](https://mp.weixin.qq.com/s/cNW_GEQXOYQvJthnVSgimw)

### 去哪儿

- [智能客服系统在机票售后的应用实践](https://mp.weixin.qq.com/s/V6sXtL22q3fV2U_6BvVxfQ)
- [Qunar 智能售后服务机器人](https://mp.weixin.qq.com/s/GLCWh1t3Lr9ixvHRdV2aEA)

### 京东

- [“天枢”智能调度系统，让京东专属客服与您“一拍即合”](https://mp.weixin.qq.com/s/qlq_reYBMFhy75075vGKXg)
- [干货 | 京东 JIMI 用户未来意图预测技术揭秘](https://mp.weixin.qq.com/s/JUdBxXXf7dGcDyn0e2ooPA)
- [京东揭秘 | 技术方案解答智能客服如何双商俱高](https://mp.weixin.qq.com/s/9EIiD5gEov7dFLve13N5ZA)
- [京东 618：智能机器人 JIMI 的进击之路](https://www.infoq.cn/article/2017/06/jd-618-Intelligent-robot-JIMI)
- [揭秘 | 技术方案解答智能客服如何双商俱高](https://mp.weixin.qq.com/s/9EIiD5gEov7dFLve13N5ZA)
- [京东 JIMI 机器人累计服务上亿用户 开放平台共享人](https://mp.weixin.qq.com/s/WcmgZz75L2k4lTHw5YRrKg)
- [JIMI：用深度学习搞定 80%的客服工作](https://mp.weixin.qq.com/s/gQf5D_hngiPk_riNrWJ9mQ)
- [京东 JIMI 技术架构](https://www.jianshu.com/p/ba70f613c0c8)
- [开放的 JIMI，开放式架构](https://mp.weixin.qq.com/s/JV2jOjbEYag2GfP4URX14A)

### Uber

- [从数据预处理到排序算法，全方位解读 Uber 人工智能客服 COTA](https://mp.weixin.qq.com/s/7cTxDaUeUxtneScFy7wAdw)

### 58 同城

- [58 智能客服 QABot 问答机器人算法实践](https://mp.weixin.qq.com/s/o7x1BigfIMJIJEGxlFlLow)
- [回顾·五八同城智能客服系统“帮帮”技术揭秘](https://mp.weixin.qq.com/s/5ewD2xD8J08W89-Rwixw4Q)

### 饿了么

- [饿了么客服体系 | 虽然天天见，我们却对它一无所知](http://m.sohu.com/a/234684739_162179)
- [机器学习算法在饿了么供需平衡系统中的应用](https://gitbook.cn/gitchat/geekbook/5c4abd3b4ab8b926cf73acc5/topic/5c51ba7305e8eb6bebd912af)
- [饿了么客服系统架构演进之路](https://ke.qq.com/course/212395?taid=1335902332992939)

### 美团

- [「回顾」智变中的美团客服](https://mp.weixin.qq.com/s/oU2FbqJEqnx4qp1HOmsuYA)
- [美团对话理解技术及实践](https://mp.weixin.qq.com/s?__biz=MzU1NTMyOTI4Mw==&mid=2247490791&idx=1&sn=a29c66fab4bb2d9aa6d8ec3cb14925e6&chksm=fbd4ae8bcca3279dc3e7c01140a1d18f4d32bd2a5ff0f2b0a60b83fcd7969e61c03f3aeba8f1&scene=21#wechat_redirect)
- [基于知识图谱的问答在美团智能交互场景中的应用和演进](https://mp.weixin.qq.com/s/qn8k_6GmvTsW6TF786KWUw)

### 滴滴

- [智能机器人在滴滴出行场景的技术探索](https://mp.weixin.qq.com/s/MSy8OHzR3avObmOq9uSSFQ)
- [智能客服渗透叫车平台易到、滴滴、首汽哪家的客服更聪明？](https://mp.weixin.qq.com/s/7WXlwHR7w5rBMG9NJTfk7Q)

### 瓜子

- [瓜子二手车封宇：瓜子 IM 智能客服系统数据架构设计](http://www.52im.net/thread-2807-1-1.html)
- [回顾·对话机器人在瓜子的实践](https://mp.weixin.qq.com/s/X6S-7tdJxj0c7lv2i6Hm2Q)
-

### 苏宁

- [苏宁智能机器人平台
  ](https://www.infoq.cn/article/74fj3C98uSHC5yKNZb9z)

### 贝壳

- [【WOT 峰会回顾】人工智能和人工冰释前嫌](https://mp.weixin.qq.com/s/b-Y8LUlKt8WOHtJG-HHFGA)
- [贝壳智能客服系统的构建与算法迭代](https://www.infoq.cn/article/9ZUeZ8y*kVzyloZ5lkpg)

### 第四范式

- [15 年研发经验博士手把手教学：从零开始搭建智能客服](https://mp.weixin.qq.com/s?__biz=MzU1NDA4NjU2MA==&mid=2247489645&idx=1&sn=d58d55e64aab528d9365e2438a1cc683&chksm=fbe9a1a2cc9e28b42d4a6d18a5b7d9dbeadaf96f942c73a44b9b0214c6468bbe4a014a57062d&scene=27#wechat_redirect)

### 腾讯

- [腾讯知文问答引擎在工业级实战中的演化](https://www.infoq.cn/article/QuWYBASaV0C9PTYpwwF0)

