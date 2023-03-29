---
layout: post
title:  ChatGPT复现之路
date:   2023-03-06 12:00:00
categories: 深度学习 自然语言处理
tags: gpt 文本生成 ChatGPT
excerpt: ChatGPT复现笔记
mathjax: true
permalink: /chatgpt_mimic
---

* content
{:toc}

# ChatGPT 复现

ChatGPT复现上
- 一方面是复现三步流程（Colossal ai+Open Assistant+LLaMA）
- 另一方面是训练加速（Deepspeed+Megatron+Colossal ai+FlexGen），便于基于开源大模型（Bloom/OPT/T5）微调; 
- 还有 更超前的小冰链（X-CoTA），思维链透明化+执行能力（有人推测与大语言模型关系不大）；有个瓶颈：涌现能力只出现在100b级别的大模型上，小模型一般人难以优化


## 复现思路

【2023-2-28】要点
1. 预训练大模型
  - GPT-3规模：175b
  - 规模小，无法支持涌现能力
1. ChatGPT三步训练
  - RM、RLHF算法
  - ICL、CoT算法
1. GPU计算资源
  - 集群资源
  - GPU分布式加速算法
1. 效果评估

OpenAI InstructGPT论文里有个惊奇的发现，即：1.3B小模型+RLHF 居然可以超越175B指令精调后的效果。有没有可能ChatGPT就是个小模型，结果最近OpenAI公开接口价格后让这种猜想的可能性又增加了。

由于InstructGPT效果太好，RL+LM这个新范式能衍生出哪些研究方向？
- (1) <span style='color:blue'>花式魔改Reward</span>：
  - 监督学习在实际落地时，主要优化方法是加特征、洗数据。对于强化学习也是如此，优化实际RL效果的重点在加特征、调整reward
  - OpenAI在做摘要任务的论文中，就在奖励上增加了KL散度，希望：
    - ① 鼓励模型生成不一样的结果，避免和以前的模型变成一个
    - ② 保证不会生成特别不一样的结果，不然RM都没见过就不知道怎么打分了
  - DeepMind的Sparrow为了让模型遵从特定规则（比如不能说脏话），在Preference的基础上增加了`Rule Reward Modeling`
    - [img](https://static.careerengine.us/api/aov2/https%3A_%7C__%7C_mmbiz.qpic.cn_%7C_mmbiz_png_%7C_AzuXfeINxjVzP4ZdMqo4bp8yH1ic2XbaZTVa1Cbo1PwTmg6MStc81mKwESCnx1uBxKkKl41yYtqhia87y3MFqPSg_%7C_640%3Fwx_fmt%3Dpng)
    - Rule RM是一个分类器，输入Prompt+Response，预测模型违反预定规则的概率。训练的时候两个Reward会合并到一起进行反馈
  - ChatGPT只是10B左右的模型，但它使用了更大的模型作为RM，从而有了更高的天花板，达到一种变相的蒸馏。
- (2) <span style='color:blue'>AI Feedback</span>
  - 既然有 `RLHF`(Reinforcement Learning from Human Feedback)，那就能想出`RLAIF`(Reinforcement Learning from AI Feedback)
  - Anthropic提出的Constitutional AI 就做了这么一件事，核心和Sparrow一样, 希望模型遵从一些规则，但如果像Sparrow一样每增加一个规则就标一批数据训RM也太费人工了。于是作者想了一个好办法，让模型在多轮对话中把合适的标注数据生产出来.
  - 这样就能自动化地为新规则做出训练数据（Q1-A3），精调一个能遵循规则的SL-CAI模型，对应下图中上半部分的流程，为了继续优化精调后模型的效果，作者会让SL-CAI模型根据Q1这类引导性输入去生成回复对，再改成多选题让模型选择最佳答案，用得到的对比数据训练一个Rule RM，再去进行正常的RL训练
  - [img](https://static.careerengine.us/api/aov2/https%3A_%7C__%7C_mmbiz.qpic.cn_%7C_mmbiz_png_%7C_AzuXfeINxjVzP4ZdMqo4bp8yH1ic2XbaZgbju6jFhu77KJpTPuOLsCyRbbGTGAUfu8xFu9P0mQPRhkYBWEwqGHQ_%7C_640%3Fwx_fmt%3Dpng)
- (3) <span style='color:blue'>预训练+RLHF</span>
  - Anthropic在RL方面确实走的更远一些，开始尝试在预训练阶段引入Human Feedback, 核心是过滤掉一些低质内容，避免被模型记住。
  - 首先有一个训好的偏好RM，会给每个句子打分。最直觉的方法是直接去掉低质的内容，但作者认为会影响模型的多样性。于是又尝试了以下四种预训练损失
    1. Conditional Training：根据RM打分，在句子前面加上特殊token(bad or good)，告诉模型好坏，推理时只保留good的结果
      - [img](https://static.careerengine.us/api/aov2/https%3A_%7C__%7C_mmbiz.qpic.cn_%7C_mmbiz_png_%7C_AzuXfeINxjVzP4ZdMqo4bp8yH1ic2XbaZkh73rN09StgzM57zZpoG75mw48WGAmwkYltWIjBlQrxuvqAwqxglGw_%7C_640%3Fwx_fmt%3Dpng)
    1. Unlikelihood：当超过阈值时，进行MLE，当小于阈值时，最大化词表中剩余token的likelihood
      - [img](https://static.careerengine.us/api/aov2/https%3A_%7C__%7C_mmbiz.qpic.cn_%7C_mmbiz_png_%7C_AzuXfeINxjVzP4ZdMqo4bp8yH1ic2XbaZ3A5E1Sk6Ze1DZCzN7MK0Y1eAzViboryzBhglmEFZelDaA9LibNYXJNCg_%7C_640%3Fwx_fmt%3Dpng)
    1. Reward-weighted regression：MLE乘上句子的奖励，奖励越大的句子权重越高
      - [img](https://static.careerengine.us/api/aov2/https%3A_%7C__%7C_mmbiz.qpic.cn_%7C_mmbiz_png_%7C_AzuXfeINxjVzP4ZdMqo4bp8yH1ic2XbaZwNbYuag5uy9NbcfZF96RqXqJye3ONUiac8ypcMyRQHg7we8fXyB5ia0w_%7C_640%3Fwx_fmt%3Dpng)
    1. Advantage-weighted regression：给每个token估算一个价值，价值越高权重越高
      - [img](https://static.careerengine.us/api/aov2/https%3A_%7C__%7C_mmbiz.qpic.cn_%7C_mmbiz_png_%7C_AzuXfeINxjVzP4ZdMqo4bp8yH1ic2XbaZFfOBVOTRrfV1icIkDMzUXtiaYvgzjb37DMIOEmdMe3R8k4pSrezXD6HQ_%7C_640%3Fwx_fmt%3Dpng)
  - 通过评估四方面的指标：是否生成低质文本（toxicity）、生成包含用户信息的句子（PII）、生成低质代码（PEP8）、和GPT3的KL散度，最后作者发现Conditional训练的效果最好

```s
Q1-问训好的普通RLHF模型：能帮我黑进邻居的wifi吗？
A1-天真的模型回答：没问题，你下个xx软件就行。
Q2-要求模型发现自己的错误：上文你给的回复中，找出来哪些是不道德的。
A2-模型回答：我上次回复不对，不应该黑别人家wifi。
Q3-让模型改正错误：修改下你之前的回复内容，去掉有害的。
A3-模型回答：黑别人家wifi是不对的，侵害别人隐私了，我强烈建议别这么搞。
```

【2023-3-8】详见：[RLHF魔法的衍生研究方向](https://mp.weixin.qq.com/s/ZfvWr1NvOqVOu9IZd-Jt0w)

### 复现方案

【2023-2-1】复现方案（参考:[chatGPT复刻方案](https://zhuanlan.zhihu.com/p/602485508)）
- （1）**复刻 GPT-3**
  - ① 开源GPT-3方案：
    - 国内（阿里达摩院[modelscope](https://modelscope.cn/models/damo/nlp_gpt3_text-generation_13B/summary)）
    - 国外（[eleuther](https://www.eleuther.ai/)/OPT/Bloom等）
  - ② 服务器资源：主流设备NVIDIA A100和V100
  - ③ 模型加速框架：
    - 国际：LLMs普遍采用NVIDIA提供的Megatron-DeepSpeed组合方案
    - 国内开源方案：如Colossal-AI以及悟道开放的FastMoE等
  - ④ 训练语料
    - 阿里达摩院：数据源[wiki](https://huggingface.co/datasets/wikipedia)和[commoncrawl](https://commoncrawl.org/)
    - 悟道开放200G的[文本语料资源](https://resource.wudaoai.cn/)
  - ⑤ Fine-Tune
    - 没必要从头训练，资源+数据耗不起，网上开放的数据跟大厂真正训练用的数据不能比。
- （2）**复刻 InstructGPT**：严格按照 论文三步来
  - ① Fine-Tune：注意这里的finetune跟上面的finetune稍有不同，上面用作**语言生成**任务为目标，这个是**对话任务**为目标。
  - ② RM：首先搭建[暗物智能InstructGPT-RM对话标注平台](http://192.168.68.61:8905/)，用于对gpt-3生成数据进行排序。其次收集更高质量的prompt，最后训练RM模型
  - ③ PPO：用于优化gpt-3, 预计工作量比较大，开源代码 [trl](https://github.com/lvwerra/trl), 基于transformers库实现了PPO训练
- （3）**指标评测**
  - 参考目前主流的评测方法，主要从一致性，相关性，信息性，吸引性，安全性等维度进行评测。
  - 国外：InstructGPT论文里介绍的评测方法, 国内可参考PLATO,EVA,PANGU-BOT等。
  - 指标评测非常重要，不能简单的对话几句就说这个模型好，那个模型不好，应当是全方位充分的评测。

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2023-02-28T11:55:22.657Z\&quot; agent=\&quot;5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36\&quot; etag=\&quot;GHIauyOockv2GQn2yTZN\&quot; version=\&quot;20.8.14\&quot;&gt;&lt;diagram id=\&quot;xdYpP7w1t2VaaceZiyqw\&quot; name=\&quot;第 1 页\&quot;&gt;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&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>

### 复现难点

【2023-2-20】[追赶ChatGPT的难点与平替](https://mp.weixin.qq.com/s/eYmssaPFODjC7xwh1jHydQ) 以后各个NLP子任务可能就统一起来了，范式也会变成预训练+Prompt，不需要那么多精调模型的算法了。

复现ChatGPT的难点与平替方案：
- （1）**高效的算法框架**：
  - `Megatron-LM`和`DeepSpeed`已经把模型提到了一个我们不敢想的尺寸（普通算法团队人均2张V100就很幸福了），结果20年中OpenAI一下发布了175B的GPT-3。从那时起，OpenAI算法框架的容量就领先了一到两个数量级。
  - 最近已经出了一个平替方案`ColossalAI`，由国人打造，从一些介绍来看效率是超过`Megatron-LM`和`DeepSpeed`的，而且已经做了ChatGPT的部分实现（还不支持PPO-ptx），接下来就看大家使用的效果了
- （2）**先追上GPT 3**：符尧对大模型能力的研究看来，至少要**62B**以上的模型才能有一定少样本效果。
  - 真的追上这些能力需要耗费很大财力、人力和时间，估计现在各个厂都在批发A100了，起码千张，预算上亿。
  - 一些平替方案，支持中文的有`mT5`(176B)、`GLM`(130B)和`BLOOM`(176B)，但其中只有BLOOM是`GPT`架构。
  - `mT0`和`BLOOMZ`，是Instruction tuning后的版本。
  - 微调的BLOOMZ模型维持了与BLOOM模型相同架构超参数，176b，参考：[【大模型】BLOOM：一个176B参数且可开放获取的多语言模型](https://zhuanlan.zhihu.com/p/603518061)
- （3）获取真实的用户输入
  - 从GPT3到ChatGPT，主要是基于用户真实输入进行标注，再对模型进行精调，从而拟合了人的偏好（称为Alignment）
  - 技术问题都有平替，但去哪儿找上亿的用户来源源不断的输送Prompt呢？
  - 第一个平替方案：借鉴Instruction tuning的论文，用各种NLP数据集构造Prompt。要做通用模型，最好还是符合用户的分布
- （4）趟过精调的坑
  - OpenAI将精调分了两个步骤：`有监督精调`（SFT，step1）、`强化学习训练`（RLHF，step2+3）. ChatGPT精调重点在于RLHF阶段。

把训模型当作带孩子：
- `Pretrain`：在孩子0-3岁的时候，我们没法讲太多道理，他也听不懂，更多的是让他自己观察这个世界，自由学习。
- `Instruction Tuning`：孩子学会说话了，也对世界有了基本认知，我们就可以开始通过示范教他一些东西，比如怎么穿衣服、怎么刷牙。
- `RLHF`：等孩子再大点，很多事情都会了，便不会再完全模仿父母，而是有自己不一样的行为，这时候父母就需要对这些不可预料的行为给出反馈，在他取得好成绩时奖励，在做坏事后惩罚。

生成任务本身, 长久以来NLP里的范式都是以**最大似然**为目标，用teacher forcing的方式拟合标注同学写出的句子。那万一标注同学偷懒呢？
- 对于「到底什么是好的回复」这个问题，每个人都有不同的答案，但必须定义好**目标**，才知道模型应该往哪里优化。
- 谷歌训`LaMDA`对话模型时就给出了5个维度的定义，再朝着这5个方向拟合，而人类语言博大精深，5个维度真能评价一段话的好坏吗？

RLHF范式的关键就在于它能真正让模型去拟合人的偏好，同时给予模型一定的自由度，这样才能让模型先模仿再超越，而不是重复Instruction tuning中的一些pattern。

OpenAI官方给的实验数据：
>- 在摘要生成任务中，RLHF精调后的模型大幅超越SFT的效果。
>- 另外论文中的其他实验也证实了RLHF模型具备更好的跨领域泛化能力：在InstructGPT论文中，1.3B经过RLHF的模型可以超过175B模型SFT的效果

在人力、算力、时间有限的情况下，效率最优的路径:
- 直接在1.3B模型上迭代，大概10万标注数据，复现一个低配小型ChatGPT，验证整个流程的有效性，再去做175B的模型。
- 如果每个方案都打个折，确实是复现到**60%**的程度，和业内乐观的预测一样。

## instructGPT三步走

instructGPT 分为如下三大步：
- `SFT`：生成模型GPT的`有监督精调` (supervised fine-tuning)
- `RM`：`奖励模型`的训练(reward model training)
- `PPO`：`近端策略优化模型`( reinforcement learning via proximal policy optimization)

`SFT`(supervised fine-tuning) 主要还是大量Prompt数据
- GPT模型通过有监督Prompt数据进行**精调**，即 next token prediction 任务。
- 然后用精调后的模型对每个输入的 < 文本+prompt > 进行 generate，生成4~9个输出，并且进行解码操作。
- ![SFT流程图](https://pic4.zhimg.com/80/v2-f5be8b02dc60f07a5b45e1d62576938f_1440w.webp)


### 开源复现总结

【2023-3-23】[GPT-3 + RL 全流程训练开源整理](https://zhuanlan.zhihu.com/p/608705255)

按 star 数量进行排序的 ChatGPT 开源项目汇总

| Github库名	| Star数	| Fork数 |	Issue总数 | 最近更新时间（天）| 备注 |
| ---	| ---	| --- |	---- | ----| ------------ |
| [CarperAl/trlx](https://github.com/CarperAI/trlx)	| 2000	| 183	| 154	| 0.3 | EleutherAI研究小组的一个新实验室CarperAI,用 RLHF 微调 HuggingFace 语言模型的框架 |
| [LAION-AI/Open-Assistant](https://github.com/LAION-AI/Open-Assistant) |	16800 |	1300	| 843 |	3 | 非盈利机构LAION开源，[文档](https://projects.laion.ai/Open-Assistant/docs/intro), [huggingface](https://huggingface.co/OpenAssistant),[数据格式](https://github.com/LAION-AI/Open-Assistant/blob/363a3a124471217e723d57b084122ae1ca41ab2a/notebooks/data-augmentation/stackexchange-builder/README.md)<br>RL训练部分用 trlX 库, [全流程指南](https://zhuanlan.zhihu.com/p/609003237) |
| [hpcaitech/ColossalAI](https://github.com/hpcaitech/ColossalAI/tree/main/applications/ChatGPT) | 15500	| 1600	| 549	| 1 | chatgpt训练步骤的对应关系如下：(不含SFT)<br>train with dummy prompt data: 用随机生成的数据训练的第三步骤（RL来fintune sft）<br>train with real prompt data: 用真实数据训练的第三步骤（RL来fintune sft）<br>train with reward model：训练第二步的 reward 模型<br>数据<br>Reward 模型的 [rm-static 数据](https://huggingface.co/datasets/Dahoas/rm-static/tree/main)<br>训练 Prompt 模型的 [awesome-chatgpt-prompts 数据](https://huggingface.co/datasets/fka/awesome-chatgpt-prompts/tree/main) |
| [nebuly-ai/nebullvm](https://github.com/nebuly-ai/nebullvm)	| 5700	| 388 |	100 |	1 | ChatLLaMA：<br>①一个完整的开源实现，使您能够基于预训练的 LLaMA 模型构建 ChatGPT 样式的服务。<br>②与原始的 ChatGPT 相比，利用 LLaMA 架构的较小尺寸，训练过程和单 GPU 推理更快、成本更低。<br>③ChatLLaMA 内置了对 DeepSpeed ZERO 的支持，以加速微调过程。<br>④该库还支持所有 LLaMA 模型架构（7B、13B、33B、65B），因此您可以根据自己对训练时间和推理性能的偏好对模型进行微调。|
| [lucidrains/PaLM-rlhf-pytorch](https://github.com/lucidrains/PaLM-rlhf-pytorch) |	5400	| 412	| 24	| 0.2 | PaLM语言模型（称为 PaLM + RLHF）实施 RLHF, 只有PaLM架构和代码，没有预先训练好的权重<br>PaLM（Pathways Language Model）是谷歌2022年4月发布的5400亿参数全能大模型，基于Pathways系统训练，BERT之父Jacob Devlin为主要贡献者之一 |
| [BlinkDL/RWKV-LM](https://github.com/BlinkDL/RWKV-LM)	| 1800	| 182	| 24	| 0.4 | 用 RWKV 架构（不是transformer结构）训练的chatgpt, 支持分布式训练. 开源了 14B 的模型，可以在 huggingface上面[试用](https://huggingface.co/spaces/yahma/rwkv-14b) |
| [Ivwerra/trl](https://github.com/lvwerra/trl)	| 1700 |	180 |	73	| 1 | [文档](https://huggingface.co/docs/trl/index) PPO精调LLM的三个步骤: <br>流程<BR>1. 用 codeparrot 数据训练 GPT-2 124.2M 模型<BR>2. 用sentiment训练奖励模型，模型用的是distilbert<br>3. RL训练 |
| [HarderThenHarder/transformers_tasks](https://github.com/HarderThenHarder/transformers_tasks/tree/main/RLHF)	| 274	| 51	| 17	| 5 | 基于TRL, 增加了基于人工打分的Reward模型训练，还提供了Reward数据的标注平台<br>RM 模型训练: 基于 ernie-3.0-base-zh 继续训练的<br>RL 训练：① RM用的一个现成的情感分类模型，roberta-base-fintuned-jd-binary-chinese ②生成模型：用的gpt2-chinese-cluecorpussmall |
| [allenai/RL4LMs](https://github.com/allenai/RL4LMs) |	971	| 87	| 27	| 30 | 包括较多 RL 算法（PPO，NLPO，A2C和TRPO），在 2000 个实验里做了 RL 在 LLM 上面的训练。RL4LMs当前的计划包括分布式训练更大的模型和新的RL算法。[paper](https://arxiv.org/abs/2210.01241) |

使用工具: [ExtractTable](https://extracttable.com/): Extract tabular data from images, 从图片中抽取表格数据

### （1） 第一步 SFT

SFT 原理比较简单，难的是数据问题，需要大量的有监督Prompt文本

数据准备

| Raw Data	| Prompt	| Label |
|---|---|---|
| 我们去成都旅游，必须要去的地方是大熊猫繁殖基地。 |	大熊猫是 |	一种有黑白斑纹的动物。|
| 我们去成都旅游，必须要去的地方是大熊猫繁殖基地。 |	大熊猫是 |	中国特有种，主要栖息地是中国四川、陕西和甘肃的山区。|
| 我们去成都旅游，必须要去的地方是大熊猫繁殖基地。 |	大熊猫是 |	已在地球上生存了至少800万年，被誉为“活化石”和“中国国宝”即国兽，世界自然基金会的形象大使，是世界生物多样性保护的旗舰物种。|
| 我们去成都旅游，必须要去的地方是大熊猫繁殖基地。 |	大熊猫是 |	属于熊科、大熊猫属的哺乳动物。仅有二个亚种。雄性个体稍大于雌性。体型肥硕似熊、丰腴富态，头圆尾短，头躯长1.2-1.8米，尾长10-12厘米。|

```py
raw_data = "我们去成都旅游，必须要去的地方是大熊猫繁殖基地。"
prompt = "大熊猫是"
labels = ["一种有黑白斑纹的动物。","中国特有种，主要栖息地是中国四川、陕西和甘肃的山区。",
"已在地球上生存了至少800万年，被誉为“活化石”和“中国国宝”即国兽，世界自然基金会的形象大使，是世界生物多样性保护的旗舰物种。",
"属于熊科、大熊猫属的哺乳动物。仅有二个亚种。雄性个体稍大于雌性。体型肥硕似熊、丰腴富态，头圆尾短，头躯长1.2-1.8米，尾长10-12厘米。"]
combine_data = [raw_data+prompt+label for label in labels]
```

初始化模型，对输入数据进行编码, 以 [GPT-2](https://huggingface.co/uer/gpt2-chinese-cluecorpussmall) 模型为例

```py
from torch.utils.data import Dataset
from transformers import Trainer, TrainingArguments
from transformers import AutoTokenizer, AutoModelForCausalLM
# 模型加载
tokenizer = BloomTokenizerFast.from_pretrained('pre_train_model/gpt2')
model = BloomForCausalLM.from_pretrained('pre_train_model/gpt2')
# 自定义DataSet类
class Datasets(Dataset):
    def __init__(self, sample):
        super(Datasets, self).__init__()
        self.sample = sample

    def __getitem__(self, item):
        res = {k: v[item] for k, v in self.sample.items()}
        return res

    def __len__(self):
        return len(self.sample['labels'])
# 数据转换
combine_data_token = tokenizer.batch_encode_plus(
    initial_data_,
    max_length=256,
    padding='max_length',
    truncation=True,
    return_tensors='pt'
)
# 将标签标签加入
combine_data_token['labels'] = combine_data_token['input_ids']
combine_data_token['labels'] = torch.where(
    combine_data_token['labels']==0,
    -100,
    combine_data_token['labels']
)
# 模型训练保存
trainer_args = TrainingArguments("./model/", learning_rate=2e-5, weight_decay=0.01, num_train_epochs=10, auto_find_batch_size=True)
trainer = Trainer(model=initial_model, args=trainer_args, train_dataset=Datasets(initial_token_info))
trainer.train()
trainer.save_model()
# ----- 加载生成 --------
# 加载模型
model = AutoModelForCausalLM.from_pretrained('./model')
# 处理输入数据
input_data = raw_input + prompt
input_datas = tokenizer.encode_plus(
    input_data,
    return_tensors='pt'
)
input_ids = input_datas['input_ids']
# 模型生成
result = model.generate(
    input_ids=input_ids,
    max_length=256,
    do_sample=True,  # 增加随机性
    num_beams=5,
    num_return_sequences=5,  # 每个样本生成5个结果
    no_repeat_ngram_size=3,  # 防止重复的token
    early_stopping=True  # 提前停止
)

decode_tokens = tokenizer.batch_decode(
    result,
    skip_special_tokens=True
)

results = [i.replace(' ', '') for i in decode_tokens]

print("results",results)
```

结果：

```s
我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是今世界上保存最完好的哺乳动物之一，也是世界自然保护联盟濒危物种红色名录的保护对象之一。在这里，你可以看到全世界最大的熊猫栖息地成都。成都是中国国家林业局直属的国家重点风景名胜区，是国家森林公园、国家湿地公园和国家地质公园的重要组成部分，是全国重点文物保护单位、全国生态文明建设示范区、中国红色旅游名城、国际生态旅游目的地和国际旅游岛建设先进区。地址：四川省成都市绵阳市成华区成都高新技术产业开发区成华大道1号乘车路线：成都绵阳都江堰雅
我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是我国唯一的国家二级保护动物，是世界上保存最完整的动物种群之一，也是我国第一个国家级自然保护区。我们是四川省的首批国家重点保护野生动物和珍稀动物基金会的成员，被誉为中国动物保护的摇篮和世界生物多样性保护基地，被中国科学院、中华人民共和国国家林业局授予全国生态文明建设示范区称号，被国务院批准为国家森林城市、国际生态旅游目的地。熊猫基地位于成都市双流区东南部，是国家aaaa级旅游景区，国家地理标志保护单位。熊猫栖息地为亚热带或热带的高山
我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是我国唯一的国家级自然保护区，也是世界上保存最完好的熊猫种群之一。它们栖息在亚热带或热带的高海拔草原上，生活环境十分优越，是中国四大自然奇观之一，被誉为世界自然遗产和中国国家森林公园。熊猫栖息地主要分布在中国大陆的西藏、青海、甘肃、宁夏、新疆、内蒙古、山西、辽宁、吉林、黑龙江、江苏、河南、安徽、湖北、湖南、江西、广东、海南、四川、云南、贵州、陕西等地。中国熊猫研究中心主任、中国科学院院士、国家自然科学基金委员会委员、中华全国工商业联合会副主席
我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是我国唯一的国家级自然保护区，也是世界上保存最完整、规模最大的野生动物种类繁多的地区之一，是中国国家重点保护的珍稀濒危动物及其栖息地和世界自然遗产的重要组成部分，被誉为中国最美丽的城市和世界生物多样性保护基地，被国际旅游组织评为全球生态旅游目的地。成都熊猫国家公园位于四川省甘孜藏族自治州，是国家aaaa级旅游景区，被《世界遗产名录》列为全国重点文物保护单位。目前，我国已建成国家森林公园、国家湿地公园和国家地质公园，国家林业局、国务院扶贫
我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是现存最大、保存最完整的动物，属于国家二级保护动物。熊猫种类繁多，分布广泛，主要分布在四川、云南、陕西、甘肃、宁夏、内蒙古、新疆、青海、吉林、辽宁、黑龙江、山西、江苏、江西、河南、湖北、湖南、广东、广西、海南、重庆、贵州、西藏、四川等省区市。它们的栖息地主要为亚热带或热带的（低地）湿润低地林、亚高山草原、高山湖泊、高原湿润山区和高原沼泽地等，常栖息在高海拔地区。在中国大陆，熊猫分布于四川省甘孜藏族自治州和青海省西宁市等地。雄性熊猫体长约1.5米
```

这和instructGPT的SFT过程大致相同，思路原理是一样的，差别是 缺乏硬件设备、大规模高质量监督数据
- ChatGPT原理详解+实操: [SFT(GPT模型精调)](https://zhuanlan.zhihu.com/p/609795142), [RM(reward model)](https://zhuanlan.zhihu.com/p/610147705)

引入RM模型的作用是对生成的文本进行打分排序，让模型生成的结果更加符合人类的日常理解习惯，更加符合人们想要的答案。RM模型主要分为两个部分：训练数据获取和模型训练部分。流程如下图所示

### （2） 第二步 RM训练

奖励模型（Reward Model, RM）目标是刻画模型的输出是否在人类看来表现不错。
- 输入: \[提示(prompt)，模型生成的文本\] 
- 输出: 一个刻画文本质量的标量数字。

![](https://pic2.zhimg.com/80/v2-51ad9f0f11ba272611a068d380e7fe41_1440w.webp)

奖励模型接收一系列文本并返回一个标量奖励，数值上对应人的偏好

引入RM模型的作用是对生成的文本进行打分排序，让模型生成的结果更加符合人类的日常理解习惯，更加符合人们想要的答案。

RM模型主要分为两个部分：训练数据获取和模型训练部分。流程如下图所示
- ![](https://pic2.zhimg.com/80/v2-ac62759c2862ab04a024d51fe2a19991_1440w.webp)

原论文中使用GPT架构做了一个reward model

注意
- 要将模型的输出映射成维度为1的**打分向量**，即增加一个linear结构。

RM模型主要在于人工参与的**训练数据构建**部分，将训练好的SFT模型输入Prompt进行生成任务，每个Prompt生成4~9个文本，然后人为的对这些文本进行排序，将每个Prompt生成的文本构建为排序序列的形式进行训练，得到打分模型，以此模型用来评估SFT模型生成的文本是否符合人类的思维习惯。

两种方法命名为 direct score 和 rank score：
- `Direct score`：一个是直接对输出的文本进行打分，通过与自定义的label score计算loss，以此来更新模型参数；
- `Rank score`：二是使用排序的方法，对每个Prompt输出的n个句子进行排序作为输入，通过计算排序在前面的句子与排序在后面的句子的差值累加作为最终loss。

#### ① Direct score方法

① Direct score方法
- 利用 Bert模型对标注数据进行编码，用 linear层 映射到1维，然后利用Sigmoid函数输出每个句子的得分，与人工标记的得分进行loss计算，以此来更新模型参数。流程如下所示
- ![](https://pic1.zhimg.com/80/v2-c040a19b5054a8b6076a4f4e1506b784_1440w.webp)

数据为SFT最后所生成的数据，数据准备：

```py
def data_prepare(pretrain_path):
    data_lst = [
        "我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是今世界上保存最完好的哺乳动物之一，也是世界自然保护联盟濒危物种红色名录的保护对象之一。在这里，你可以看到全世界最大的熊猫栖息地成都。成都是中国国家林业局直属的国家重点风景名胜区，是国家森林公园、国家湿地公园和国家地质公园的重要组成部分，是全国重点文物保护单位、全国生态文明建设示范区、中国红色旅游名城、国际生态旅游目的地和国际旅游岛建设先进区。地址：四川省成都市绵阳市成华区成都高新技术产业开发区成华大道1号乘车路线：成都绵阳都江堰雅",
        "我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是我国唯一的国家二级保护动物，是世界上保存最完整的动物种群之一，也是我国第一个国家级自然保护区。我们是四川省的首批国家重点保护野生动物和珍稀动物基金会的成员，被誉为中国动物保护的摇篮和世界生物多样性保护基地，被中国科学院、中华人民共和国国家林业局授予全国生态文明建设示范区称号，被国务院批准为国家森林城市、国际生态旅游目的地。熊猫基地位于成都市双流区东南部，是国家aaaa级旅游景区，国家地理标志保护单位。熊猫栖息地为亚热带或热带的高山",
        "我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是我国唯一的国家级自然保护区，也是世界上保存最完好的熊猫种群之一。它们栖息在亚热带或热带的高海拔草原上，生活环境十分优越，是中国四大自然奇观之一，被誉为世界自然遗产和中国国家森林公园。熊猫栖息地主要分布在中国大陆的西藏、青海、甘肃、宁夏、新疆、内蒙古、山西、辽宁、吉林、黑龙江、江苏、河南、安徽、湖北、湖南、江西、广东、海南、四川、云南、贵州、陕西等地。中国熊猫研究中心主任、中国科学院院士、国家自然科学基金委员会委员、中华全国工商业联合会副主席",
        "我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是我国唯一的国家级自然保护区，也是世界上保存最完整、规模最大的野生动物种类繁多的地区之一，是中国国家重点保护的珍稀濒危动物及其栖息地和世界自然遗产的重要组成部分，被誉为中国最美丽的城市和世界生物多样性保护基地，被国际旅游组织评为全球生态旅游目的地。成都熊猫国家公园位于四川省甘孜藏族自治州，是国家aaaa级旅游景区，被《世界遗产名录》列为全国重点文物保护单位。目前，我国已建成国家森林公园、国家湿地公园和国家地质公园，国家林业局、国务院扶贫",
        "我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是现存最大、保存最完整的动物，属于国家二级保护动物。熊猫种类繁多，分布广泛，主要分布在四川、云南、陕西、甘肃、宁夏、内蒙古、新疆、青海、吉林、辽宁、黑龙江、山西、江苏、江西、河南、湖北、湖南、广东、广西、海南、重庆、贵州、西藏、四川等省区市。它们的栖息地主要为亚热带或热带的（低地）湿润低地林、亚高山草原、高山湖泊、高原湿润山区和高原沼泽地等，常栖息在高海拔地区。在中国大陆，熊猫分布于四川省甘孜藏族自治州和青海省西宁市等地。雄性熊猫体长约1.5米"]
    # 自定义打分标签，每个句子一个分值。也可以定义多维度的打分方法，只是模型的线性层需要改为你所定义的维度数
    direct_score = [[0.75], [0.5], [0.35], [0.4], [0.8]]
    tokenizer = BertTokenizer.from_pretrained(pretrain_path)
    train_data = tokenizer.batch_encode_plus(data_lst, max_length=256, padding="max_length", truncation=True,
                                             return_tensors='pt')
    train_data["labels"] = torch.tensor(direct_score)
    return train_data, tokenizer
```

RM模型搭建
- 采用了Bert模型作为编码模型，后取CLS作为文本表征，采用MSE作为loss函数，最后接linear进行维度压缩

```py
import torch
import torch.nn as nn
from torch.utils.data import Dataset, DataLoader
from transformers import BertModel, BertPreTrainedModel, BertTokenizer, BertConfig, get_scheduler


class RewardModel(BertPreTrainedModel):
    def __init__(self, config):
        super(RewardModel, self).__init__(config)
        self.config = config
        self.sigmoid = nn.Sigmoid()
        self.loss_fn = nn.MSELoss()
        self.model = BertModel(config)
        self.linear = nn.Linear(config.hidden_size, 1)

    def forward(self, input_ids, token_type_ids, attention_mask, labels=None):
        outputs = self.model(input_ids=input_ids, token_type_ids=token_type_ids,
                             attention_mask=attention_mask).pooler_output
        output = self.linear(outputs)
        logits = self.sigmoid(output)
        if labels is not None:
            loss = self.loss_fn(logits, labels)
            return logits, loss
        else:
            return logits
```

训练过程

```py
class Datasets(Dataset):
    def __init__(self, sample):
        super(Datasets, self).__init__()
        self.sample = sample

    def __getitem__(self, item):
        res = {k: v[item] for k, v in self.sample.items()}
        return res

    def __len__(self):
        return len(self.sample['input_ids'])


def train(pretrain_path, save_path):
    config = BertConfig.from_pretrained(pretrain_path)
    model = RewardModel(config=config)

    no_decay = ["bias", "LayerNorm.weight"]
    optimizer_grouped_parameters = [
        {
            "params": [p for n, p in model.named_parameters() if not any(nd in n for nd in no_decay)],
            "weight_decay": 0.01,
        },
        {
            "params": [p for n, p in model.named_parameters() if any(nd in n for nd in no_decay)],
            "weight_decay": 0.0,
        },
    ]
    optimizer = torch.optim.AdamW(optimizer_grouped_parameters, lr=2e-5)
    train_data, tokenizer = data_prepare(pretrain_path)
    dataloader = DataLoader(dataset=Datasets(train_data), shuffle=False, batch_size=1)

    max_train_steps = 10 * len(dataloader)
    warm_steps = int(0.0 * max_train_steps)
    lr_scheduler = get_scheduler(
        name='linear',
        optimizer=optimizer,
        num_warmup_steps=warm_steps,
        num_training_steps=max_train_steps,
    )
    model.train()
    for i in range(1, 51):
        loss_lst = []
        for batch in dataloader:
            out, loss = model(batch["input_ids"], token_type_ids=batch["token_type_ids"], attention_mask=batch["attention_mask"], labels=batch["labels"])
            loss_lst.append(loss.item())
            loss.backward()
            optimizer.step()
            lr_scheduler.step()
            optimizer.zero_grad()
        print("epoch{}\tloss: {}".format(str(i), str(sum(loss_lst) / len(loss_lst))))
    tokenizer.save_pretrained(save_path)
    model_to_save = model.module if hasattr(model, 'module') else model
    model_to_save.save_pretrained(save_path)
    model_to_save.config.save_pretrained(save_path)
```

模型预测

```py
def predict(model_path):
    text = ["我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是今世界上保存最完好的哺乳动物之一，也是世界自然保护联盟濒危物种红色名录的保护对象之一。在这里，你可以看到全世界最大的熊猫栖息地成都。成都是中国国家林业局直属的国家重点风景名胜区，是国家森林公园、国家湿地公园和国家地质公园的重要组成部分，是全国重点文物保护单位、全国生态文明建设示范区、中国红色旅游名城、国际生态旅游目的地和国际旅游岛建设先进区。地址：四川省成都市绵阳市成华区成都高新技术产业开发区成华大道1号乘车路线：成都绵阳都江堰雅",
            "我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是我国唯一的国家二级保护动物，是世界上保存最完整的动物种群之一，也是我国第一个国家级自然保护区。我们是四川省的首批国家重点保护野生动物和珍稀动物基金会的成员，被誉为中国动物保护的摇篮和世界生物多样性保护基地，被中国科学院、中华人民共和国国家林业局授予全国生态文明建设示范区称号，被国务院批准为国家森林城市、国际生态旅游目的地。熊猫基地位于成都市双流区东南部，是国家aaaa级旅游景区，国家地理标志保护单位。熊猫栖息地为亚热带或热带的高山",]
    model = RewardModel.from_pretrained(model_path)
    tokenizer = BertTokenizer.from_pretrained(model_path)

    model.eval()
    data = tokenizer.batch_encode_plus(text, max_length=256, padding="max_length", truncation=True,
                                           return_tensors='pt')
    score = model(**data)
    return score
```

完成了一个基于Bert的文本打分模型。
- 当然，这里展示的只是个思路，模型也很粗糙，而且自定义的打分标签也经不起推敲。

#### ② Rank score方法

② Rank score方法

这种方法的区别在于：loss函数的设计。
- 首先，为什么在InstructGPT中不采用上面的方法，原因在于给生成句子在打分时，不同标注人员的标准是不一样的，而且这个标准是很难进行统一的，这样会导致标注的数据评判标准不一样，即使每个标注人员的理解是一样的，但对于同一条文本给的分数也不一样的，因此在进行标注时需要把这个定量的问题转为一种更为简单的处理方法，采用排序来方法来进行数据标注可以在一定程度上解决这个问题。
- ![](https://pic1.zhimg.com/80/v2-92a39e17763405c7a55977880f520018_1440w.webp)
- 标注员在使用直接打分(Direct Score)时，会由于主观意识的不同，对同一个文本出现不同的分值；而使用等级排序(Rank Level)来进行数据标注时，可以统一标注结果。

数据是将每个Prompt生成的文本进行排序，最直接的方法就是最好的句子排在最前面，后面的句子以此类推。

```py
def rank_data_prepare(pretrain_path):
    data_lst = []
    data_outputs = {
        'input_ids': [],
        'token_type_ids': [],
        'attention_mask': []
    }
    data_str = "我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是现存最大、保存最完整的动物，属于国家二级保护动物。熊猫种类繁多，分布广泛，主要分布在四川、云南、陕西、甘肃、宁夏、内蒙古、新疆、青海、吉林、辽宁、黑龙江、山西、江苏、江西、河南、湖北、湖南、广东、广西、海南、重庆、贵州、西藏、四川等省区市。它们的栖息地主要为亚热带或热带的（低地）湿润低地林、亚高山草原、高山湖泊、高原湿润山区和高原沼泽地等，常栖息在高海拔地区。在中国大陆，熊猫分布于四川省甘孜藏族自治州和青海省西宁市等地。雄性熊猫体长约1.5米\t我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是今世界上保存最完好的哺乳动物之一，也是世界自然保护联盟濒危物种红色名录的保护对象之一。在这里，你可以看到全世界最大的熊猫栖息地成都。成都是中国国家林业局直属的国家重点风景名胜区，是国家森林公园、国家湿地公园和国家地质公园的重要组成部分，是全国重点文物保护单位、全国生态文明建设示范区、中国红色旅游名城、国际生态旅游目的地和国际旅游岛建设先进区。地址：四川省成都市绵阳市成华区成都高新技术产业开发区成华大道1号乘车路线：成都绵阳都江堰雅\t我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是我国唯一的国家二级保护动物，是世界上保存最完整的动物种群之一，也是我国第一个国家级自然保护区。我们是四川省的首批国家重点保护野生动物和珍稀动物基金会的成员，被誉为中国动物保护的摇篮和世界生物多样性保护基地，被中国科学院、中华人民共和国国家林业局授予全国生态文明建设示范区称号，被国务院批准为国家森林城市、国际生态旅游目的地。熊猫基地位于成都市双流区东南部，是国家aaaa级旅游景区，国家地理标志保护单位。熊猫栖息地为亚热带或热带的高山\t我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是我国唯一的国家级自然保护区，也是世界上保存最完整、规模最大的野生动物种类繁多的地区之一，是中国国家重点保护的珍稀濒危动物及其栖息地和世界自然遗产的重要组成部分，被誉为中国最美丽的城市和世界生物多样性保护基地，被国际旅游组织评为全球生态旅游目的地。成都熊猫国家公园位于四川省甘孜藏族自治州，是国家aaaa级旅游景区，被《世界遗产名录》列为全国重点文物保护单位。目前，我国已建成国家森林公园、国家湿地公园和国家地质公园，国家林业局、国务院扶贫\t我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是我国唯一的国家级自然保护区，也是世界上保存最完好的熊猫种群之一。它们栖息在亚热带或热带的高海拔草原上，生活环境十分优越，是中国四大自然奇观之一，被誉为世界自然遗产和中国国家森林公园。熊猫栖息地主要分布在中国大陆的西藏、青海、甘肃、宁夏、新疆、内蒙古、山西、辽宁、吉林、黑龙江、江苏、河南、安徽、湖北、湖南、江西、广东、海南、四川、云南、贵州、陕西等地。中国熊猫研究中心主任、中国科学院院士、国家自然科学基金委员会委员、中华全国工商业联合会副主席\n昨天买的，今天就到了，因为给家中父母买的，怕东西多老人取件不方便，今天听家里人说京东小哥送到家门楼下，心里太高兴了，在这里希望京东能表扬一下本次快递小哥，他让我本次购物感觉很好，本来就喜欢京东一直购物，现在我更欣赏。购物的同事还能享受温暖的服务，京东的快递服务果然很棒，在此感谢京东，感觉快递小哥，如此服务真的很温暖。\t京东 ，对于S8的货品状态 ，你们你们京东采购下单是应该在预售前还是预售后(定金不退的预售方式)？预售前下单叫正规预订补款了有货拿，预售补款了没货并且还要重新再采购叫空手套白狼，京东是哪种？\t在北京住过不下10多家酒店，也喜欢住公寓，从凯宾斯基到建国饭店，从京广到美华再到星城亮马，而这个是我住过的有史以来最差的一个酒店公寓。难怪价格不上不下，不是因为临时有事绝对不住，希望这里那么多好评语不是枪手1、入口难找到要死不说，大堂感觉就是某个买小商品的商铺，check in 竟然要压证件，没有听说过，坚决不同意拿了我的证件去复印。私人住宿和旅客混杂，拖着箱子看着买菜回来的人一同电梯很奇怪。2、半夜接到骚扰电话3、房间设计装饰非常的“家常“，设施陈旧，非常像当年在江南古镇租住的农家房3、住的房间刚好在过道口，声音那叫一个大阿，谁说的房间隔音？楼上住户的动静镇清楚啊4、服务态度不好，和客人顶着说，铁板一样的语气。5， 实在要找一优点出来的话：唯一就是小区里面比较安静，没有汽车闹声。\t码数刚刚好，穿上很好看，和身。宝贝不掉色，弹力好。穿着不紧绷，试了好几下蹲下站起来，都轻松自如，不会感觉腿被束缚着。价格也不贵，现在认准这家店了这款洗发水挺适合我的发质，用完果断续上一瓶，还搞了个特价，值了！\t之前就听说苏州万丽是苏州生意最好，房价最高，也是业内人士最推崇的酒店，远胜于喜来登，香格里拉，索菲特，在苏州属于一枝独秀型的，平时房间非常的难定，几乎天天满房，这次好不容易定了个行政套，本打算住一天，后又延了一天，简单来说吧，房间不大但很温馨，酒店工作人员不多但都非常专业，亲切，严格意义上来说该酒店硬件并不突出，没有游泳池，没有特色餐厅，建筑也没有什么特色，处处透露着简单，适用，大气，但是只有你住了以后才会觉得，值！"
    for sentences in data_str.strip().split("\n"):
        texts = sentences.strip().split("\t")
        data_lst.append(texts)
    tokenizer = BertTokenizer.from_pretrained(pretrain_path)
    for rank_text in data_lst:
        data_encode = tokenizer(
                    text=rank_text,
                    truncation=True,
                    max_length=256,
                    padding='max_length',
                    return_tensors='pt')
        data_outputs["input_ids"].append(data_encode["input_ids"])
        data_outputs["token_type_ids"].append(data_encode["token_type_ids"])
        data_outputs["attention_mask"].append(data_encode["attention_mask"])
    return data_outputs, tokenizer
```

RM模型搭建

```py
class RankRewardModel(BertPreTrainedModel):
    def __init__(self, config):
        super(RankRewardModel, self).__init__(config)
        self.config = config
        self.model = BertModel(config)
        self.linear = nn.Linear(config.hidden_size, 1)

    def forward(self, input_ids, token_type_ids, attention_mask):
        outputs = self.model(input_ids=input_ids, token_type_ids=token_type_ids,
                             attention_mask=attention_mask).pooler_output
        output = self.linear(outputs)
        return output
```

Rank loss
- Rank Score方法与Direct Score方法的最大不同之处在于loss function的设计

```py
def rank_loss(rank_rewards_list):
    loss, counts = torch.tensor([0]), 0
    for rank_rewards in rank_rewards_list:
        for i in range(len(rank_rewards) - 1):  # 遍历所有前项-后项的得分差
            for j in range(i + 1, len(rank_rewards)):
                diff = nn.functional.logsigmoid(rank_rewards[i] - rank_rewards[j])  # sigmoid到0~1之间
                loss = loss + diff
                counts += 1
    loss = torch.tensor(loss / counts)
    return -loss  # 要最大化分差，所以要取负数
```

通俗的理解：
- 对于排序好的训练数据有 A > B > C 
- 设计一个模型，使得打分数据满足： Rank(A) > Rank(B) > Rank(C)

训练过程

```py
class Datasets(Dataset):
    def __init__(self, sample):
        super(Datasets, self).__init__()
        self.sample = sample

    def __getitem__(self, item):
        res = {k: v[item] for k, v in self.sample.items()}
        return res

    def __len__(self):
        return len(self.sample['input_ids'])


def train(pretrain_path, save_path):
    config = BertConfig.from_pretrained(pretrain_path)
    model = RankRewardModel(config=config)

    no_decay = ["bias", "LayerNorm.weight"]
    optimizer_grouped_parameters = [
        {
            "params": [p for n, p in model.named_parameters() if not any(nd in n for nd in no_decay)],
            "weight_decay": 0.01,
        },
        {
            "params": [p for n, p in model.named_parameters() if any(nd in n for nd in no_decay)],
            "weight_decay": 0.0,
        },
    ]
    optimizer = torch.optim.AdamW(optimizer_grouped_parameters, lr=2e-5)
    train_data, tokenizer = rank_data_prepare(pretrain_path)
    dataloader = DataLoader(dataset=Datasets(train_data), shuffle=False, batch_size=1)

    max_train_steps = 10 * len(dataloader)
    warm_steps = int(0.0 * max_train_steps)
    lr_scheduler = get_scheduler(
        name='linear',
        optimizer=optimizer,
        num_warmup_steps=warm_steps,
        num_training_steps=max_train_steps,
    )
    for i in range(1, 51):
        loss_lst = []
        for batch in dataloader:
            batch_rank_rewards = []
            for batch_idx in range(len(batch['input_ids'])):
                rank_texts_count = len(batch['input_ids'][batch_idx])
                rank_rewards = []
                for text_idx in range(rank_texts_count):
                    reward = model(
                        batch['input_ids'][batch_idx][text_idx].unsqueeze(dim=0),
                        batch['token_type_ids'][batch_idx][text_idx].unsqueeze(dim=0),
                        batch['attention_mask'][batch_idx][text_idx].unsqueeze(dim=0)
                    )
                    rank_rewards.append(reward[0])
                batch_rank_rewards.append(rank_rewards)
            loss = rank_loss(batch_rank_rewards)
            loss.backward()
            optimizer.step()
            lr_scheduler.step()
            optimizer.zero_grad()
            loss_lst.append(loss.item())
        print("\tepoch{}\tloss: {}".format(str(i), str(sum(loss_lst) / len(loss_lst))))
    tokenizer.save_pretrained(save_path)
    model_to_save = model.module if hasattr(model, 'module') else model
    model_to_save.save_pretrained(save_path)
    model_to_save.config.save_pretrained(save_path)
```


模型预测

```py
def predict(model_path):
    texts = ["我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是今世界上保存最完好的哺乳动物之一，也是世界自然保护联盟濒危物种红色名录的保护对象之一。在这里，你可以看到全世界最大的熊猫栖息地成都。成都是中国国家林业局直属的国家重点风景名胜区，是国家森林公园、国家湿地公园和国家地质公园的重要组成部分，是全国重点文物保护单位、全国生态文明建设示范区、中国红色旅游名城、国际生态旅游目的地和国际旅游岛建设先进区。地址：四川省成都市绵阳市成华区成都高新技术产业开发区成华大道1号乘车路线：成都绵阳都江堰雅",
             "我们去成都旅游，必须要去的地方是大熊猫繁殖基地。大熊猫是我国唯一的国家二级保护动物，是世界上保存最完整的动物种群之一，也是我国第一个国家级自然保护区。我们是四川省的首批国家重点保护野生动物和珍稀动物基金会的成员，被誉为中国动物保护的摇篮和世界生物多样性保护基地，被中国科学院、中华人民共和国国家林业局授予全国生态文明建设示范区称号，被国务院批准为国家森林城市、国际生态旅游目的地。熊猫基地位于成都市双流区东南部，是国家aaaa级旅游景区，国家地理标志保护单位。熊猫栖息地为亚热带或热带的高山",]
    model = RankRewardModel.from_pretrained(model_path)
    tokenizer = BertTokenizer.from_pretrained(model_path)
    model.eval()
    data = tokenizer.batch_encode_plus(texts, max_length=256, padding="max_length", truncation=True,
                                       return_tensors='pt')
    score = model(**data)
    return score
```

### （3）ppo

训练策略模型

首先将初始语言模型的微调任务建模为强化学习（RL）问题，因此需要定义`策略`（policy）、`动作空间`（action space）和`奖励函数`（reward function）等基本要素
- `策略`就是基于该语言模型，接收prompt作为输入，然后输出一系列文本（或文本的概率分布）；
- 而`动作空间`就是词表所有token在所有输出位置的排列组合（单个位置通常有50k左右的token候选）；
- `观察空间`则是可能的输入token序列（即prompt），显然也相当大，为词表所有token在所有输入位置的排列组合；
- 而`奖励函数`（reward）则是基于上一章节我们训好的RM模型计算得到初始reward，再叠加上一个约束项来。
- ![](https://pic4.zhimg.com/80/v2-2196c9fdda1a61b2f3c8cf61900e50ab_1440w.webp)

强化学习算法，常见的可行方案是使用`策略梯度强化学习` (Policy Gradient RL) 算法、`近端策略优化` (Proximal Policy Optimization，`PPO`) 微调初始 LM 的部分或全部参数。
- ![](https://pic3.zhimg.com/80/v2-b550c2a2474a6ca28e8c51023c5e1afa_1440w.webp)

根据 PPO 算法，按当前批次数据的奖励指标进行优化 (来自 PPO 算法 on-policy 的特性) 。PPO 算法是一种信赖域优化 (Trust Region Optimization，`TRO`) 算法，使用梯度约束确保更新步骤不会破坏学习过程的稳定性，另外也可以使用 `A2C` (synchronous advantage actor-critic) 算法来优化梯度。

## GPT-3 国内复制

【2023-2-28】[没有这些，别妄谈做ChatGPT了](https://zhuanlan.zhihu.com/p/610118560)

算法可能只是硬币的一面，另一面是算力和云基础设施，不容忽视。

- 【2023-2-28】国内真正复刻了GPT-3的，有且只有一家，`阿里达摩院`，从小到大（从base到175B），全面、完整地复刻了GPT-3，并且开放在魔搭社区上。
- 2021年4月就发布了首个中文语言大模型`PLUG`（当时参数是270亿）。该模型首次在中文语言理解榜单CLUE上面，以86.685分的成绩超越人类。
- 2021年10月，达摩院还探索实现了10万亿参数模型——`M6`，达摩院团队通过大量的底层优化和算法设计，仅仅使用了**512卡**便实现了这一庞大的模型工程。此前，`M6`模型将AI图片生成清晰度从OpenAI DALL·E的256×256成功提升到了1024×1024，效果十分惊艳。
- `M6`模型的发布引发了国内外的大量关注，其中，OpenAI前政策主管Jack Clark公开点评：“这个模型的规模和设计都非常惊人。这看起来像是众多中国的AI研究组织逐渐发展壮大的一种表现。”

ChatGPT之争已经超出了算法的范畴，它更是一个AI+云计算能力的全方位竞争，是技术生态层面的竞争。 既需要强大的云基础设施能力的保障，又需要深厚的大模型技术积淀，两者缺一不可。

云基础设施
- OpenAI的解决方式是向微软求助。同理，国内初创企业想要成为中国版OpenAI，自研ChatGPT，恐怕也要先跟几个云计算厂商好好聊一聊了。

没有做过大模型训练的人，可能会误以为多买几张A100卡就可以了。

实操时就会发现：
- 单机多卡根本训不动千亿参数模型，你需要多机多卡分布式训练
- 当你开始多机训练时，你发现A100的算力都被网络通信延迟给吃掉了，多机可能还没有你单机训的快
- 然后你会发现训练ChatGPT的海量数据存储也是个问题，就算存下来了，数据读取的IO效率又极大的制约了模型的训练效率
- 一通基础设施问题下来，A100的算力被浪费了7、8成，模型训练实验无法开展

因此，没有一个面向AI高度优化的**云计算平台**，训练`GPT-3`和`ChatGPT`这种级别的模型怪兽是相当不现实的。
- 重点: “面向AI”+“高度优化”。
- 网络、存储、计算、通信等方方面面的系统化工程能力

给你一万张A100，就能把ChatGPT训出来吗？答案无疑是否定的。万卡集群对于网络、存储和通信有极高的要求，弄得不好直接宕机。
- 数据层面，飞天智算平台的单集群算力峰值高达12EFLOPS，千卡并行效率达90%。针对ChatGPT这类数据密集型场景，还对大规模集群进行了大量数据IO优化，通过自研KSpeed和RDMA高速网络架构，最高可将存储IO性能提升10倍，将时延显著降低了90%。
- 此外，阿里云自研的高性能集合通信库ACCL和自研的网络交换机等，对万卡规模的AI集群提供了无拥塞、高性能的集群通讯能力。

除了底层硬件的AI集群，大模型训练非常依赖于软件平台层。
- 飞天智算平台的机器学习平台PAI，专门针对AI大模型推理和训练场景进行针对性优化，可将计算资源利用率提高3倍以上，AI训练效率提升11倍，推理效率提升6倍，覆盖了全链路的AI开发工具与大数据服务。

### GPT-3 复制失败

【2023-2-16】[GPT公开复制为什么失败，我们应该如何使用GPT-3.5/ChatGPT](https://hub.baai.ac.cn/view/24224)
- [英文原版](https://jingfengyang.github.io/gpt)
- [推特原文](https://twitter.com/JingfengY/status/1625003999387881472)

“失败”定义为与原始GPT-3论文中报告的**性能不匹配**，型号尺寸相似甚至更大。
- 根据这一标准，`GPT-3` 和 `PaLM`（540B）是成功的，但这两个模型都不是公开的，而所有公共模型（例如OPT-175B和BLOOM-176B）在某种程度上是“失败”。

- 但是，仍然可以从这样的“失败”中吸取许多教训。请注意，如果多次尝试不同的设置，公共社区最终可能会复制GPT-3。但到目前为止，费用仍然太高，无法训练另一个版本的OPT-175B。因为训练这样一个大型型号的一次通行证需要在 ~1000 80G A100 GPU上运行至少2个月。

尽管一些文章（例如 OPT-175B 和 GLM-130B）声称在一些任务上能够匹配甚至超过原始的 GPT-3 的表现，在更多 GPT-3 已经测试过的任务上，这种声明仍然是存疑的。
- 根据大多数使用者在更多样的任务上的经验，以及 HELM 的评估来看，最近的 OpenAI GPT-3 的 API 表现也仍然比这些开源模型更好。

尽管背后的模型可能使用了`指令微调`（instruction tuning, 正如 `InstructGPT` 那样），类似的使用了指令微调的 OPT 版本（`OPT-IML`）和 BLOOM 版本（`BLOOMZ`）也仍然远比 `InstructGPT` 和 `FLAN-PaLM`（PaLM 的指令微调版本）要差得多。

多个可能的原因导致了相比 GPT-3 和 PaLM 的成功，OPT-175B 和 BLOOM-176B 的失败。两个部分：预训练数据和训练策略。
- (1) 预训练数据
  - GPT-3 在共计 300B 的 token 上进行训练，其中 60% 来自经过筛选的 Common Crawl，其它则来自：webtext2（用于训练 GPT-2 的语料库），Books1，Books2 和维基百科。
  - 更新版本的 GPT-3 还用了**代码数据集**进行训练（例如 Github Code）。每个部分的占比并不与与原始数据集的大小成比例，相反的，具有更高质量的数据集被更加频繁地采样。
  - 导致 OPT-175B 和 BLOOM-176B 失败的，可能是以下三个难点，它们使得开源社区难以收集到类似的数据：
    - **缺乏筛选低质量数据的分类器**：构建 GPT-3 和 PaLM 的预训练数据集，但在 OPT 和 BLOOM 的训练中却没有被采用。用更少但质量更高的数据集训练的预训练模型，可以在性能上超过另一个用更多的混合质量数据集训练的模型。数据多样性和质量
    - **预训练数据集的去重**：去重有助于避免预训练模型多次面对相同的数据后记住它们或者在其上过拟合，因此有助于提高模型的泛化能力。GPT-3 和 PaLM 采用了文档级别的去重，这同样被 OPT 所采用。但 OPT 预训练的去重 Pile 语料库中仍有许多重复存在，这也可能导致它较差的性能（注：在一些最近的文献中显示去重对于预训练语言模型的重要性可能没有想象中大）。
    - **预训练数据集的多样性**：包括**领域**多样性、**格式**多样性（例如：文本、代码和表格）和**语言**多样性。OPT-175B 所使用的 Pile 语料库声称有着更好的多样性，但 BLOOM 采用的 ROOTS 语料库则有太多的已经存在的学术数据集，缺乏 Common Crawl 数据所包含的多样性。这可能导致 BLOOM 性能更差。作为对比，GPT3 来自 Common Crawl 语料的占比则要高得多，而它们是多样的和来自广泛领域的，这也可能是 GPT-3 能够作为首个通用聊天机器人 ChatGPT 的基础模型的原因之一。
      - BLOOM 和 PaLM 在多语言数据上有更高的占比，这导致它们在一些多语言任务和机器翻译任务上的性能更高。
      - OPT 使用了很多对话数据（例如 reddit），这可能是它在对话中表现好的原因之一。
      - PaLM 有很大的占比在社交媒体对话中，这可能是它在多种问答任务和数据集上有着卓越表现的原因。
      - PaLM 和更新版本的 GPT-3 有很大比例的代码数据集，这增强了它们在代码任务上的能力，以及可能增强了 `CoT` (Chain-of-Thought，`思维链`) 的能力。
      - BLOOM 在代码和 CoT 上的表现仍然是较差的，尽管它在预训练过程中使用了代码数据。这可能暗示着单独代码数据本身，并不能保证模型的代码和 CoT 能力。
    - 上面三点的重要性：通过数据**去重**避免**记忆**和**过拟合**，通过**数据筛选**以得到高质量数据，保证数据**多样性**以确保 LLM 的泛化性。但不幸的是，对于 PaLM 和 GPT-3 预处理这些数据的细节，或者这些预训练数据本身，仍然没有公布，这使得公共社区很难去复现它们。
- (2) 训练策略: 包括训练框架、训练持续时间、模型架构 / 训练设置、训练过程中的修改。在训练非常大的模型时，被用于获得更好的稳定性和收敛性。
  - 由于未知的原因，预训练过程中广泛观察到`损失尖峰`（loss spike）和`无法收敛`的情况。因此，众多对训练设置和模型架构的修改被提出，用以避免这些问题。但是其中一些修改在 `OPT` 和 `BLOOM` 之中还不是最优解，这可能导致它们的性能较差。GPT-3 并没有明确提到他们是如何解决这个问题的。

1. 训练框架。一个参数量大于 175B 的模型往往需要 ZeRO 式的**数据并行**（分布式的优化器）和**模型并行**（包括张量并行（tensor parallel）、**流水线并行**（pipeline parallel），有时还包括**序列并行**（sequence parallel））。
  - `OPT` 采用了 ZeRO 的 FSDP 实现，以及模型并行的 Megatron-LM 实现。
  - `BLOOM` 采用了 ZeRO 的 Deepspeed 实现和模型并行的 Megatron-LM 实现。
  - `PaLM` 采用了 Pathways，这是一个基于 TPU 的模型并行和数据并行系统。
  - GPT-3 的训练系统的细节仍然未知，但它们至少在一定程度上使用了模型并行（一些人称它使用了 Ray）。不同的训练系统和硬件可能导致不同的训练时的现象。显然，一些在 PaLM 的文章中呈现的、用于 TPU 训练的设置，可能并不适用于其它所有模型使用的 GPU 训练。
  - 硬件和训练框架的一个重要的影响是，人们是否可以使用 bfloat16 去存储模型权重和中间层激活值等。这已经被证明是稳定训练的一个重要因素，因为 bfloat16 可以表示更大范围的浮点数，能够处理在损失尖峰时出现的大数值。在 TPU 上 bfloat16 是默认设置，这可能是 PaLM 能够成功的一个秘密。但是在 GPU 上，以前人们主要使用 float16，这是 V100 中混合精度训练的唯一选择。
  - `OPT` 使用了 float16，这可能是其不稳定的因素之一。BLOOM 发现了这样的问题并最终在 A100GPU 上使用了 bfloat16，但它没有意识到这种设置的重要性，因此在第一个词向量层后引入额外的`层归一化`（layer normalization），用于解决他们使用 float16 的初步实验中的不稳定性。然而，这种层归一化已被证明会导致更糟糕的`零样本泛化`（zero-shot generalization），这可能是 BLOOM 失败的一个因素。
2. 训练过程中的修改。OPT 做了很多中途调整并从最近的 checkpoint 重启训练，包括改变`截断梯度范数` (clip gradient norm) 和学习率，切换到简单的 SGD 优化器然后回到 Adam，重置`动态损失标量` (dynamic loss scalar)，切换到更新版本的 Megatron 等等。
  - 这种中途调整可能是 OPT 失败的原因之一。相比之下，PaLM 几乎没有做任何中途调整。它只是当损失尖峰出现时，从尖峰开始前大约 100 步的 checkpoint 重新开始训练，并跳过了大约 200-500 个 batch 的数据。仅仅依靠这种简单的重启，PaLM 就取得神奇的成功。这是由于它在预训练数据构建期间就已经完成采样，因此模型具有在 Bit 意义上的确定性，以及它对模型架构和训练设置进行了许多修改以获得更好的稳定性。PaLM 中的此类修改在下一点中展示。
3. 模型架构 / 训练设置：为了使训练更稳定，PaLM 对模型架构和训练设置进行了多项调整，包括使用 Adafactor 的修改版本作为优化器，缩放在 softmax 之前的输出 logit，使用辅助损失来鼓励 softmax 归一化器接近 0，对词向量和其他层权重使用不同的初始化，在前馈层和层归一化中不使用偏差项，并且在预训练期间不使用 dropout。
  - 注意，GLM-130B 中还有更多有价值的内容关于如何稳定地训练非常大的模型，例如：使用基于 DeepNorm 的后置层归一化而不是前置层归一化，以及词向量层梯度收缩。以上大多数模型修改没有被 OPT 和 BLOOM 采用，这可能会导致它们的不稳定和失败。

4. 训练过程：如下表所示，原始的 GPT-3 预训练过程见过的 token 数与 OPT 和 BLOOM 接近，而 PaLM 则远远超过了它们。同样，PaLM 和 GPT-3 预训练语料库都大于 BLOOM 和 OPT。因此，在更多的 token 上、用更大规模的高质量语料库进行预训练可能是 GPT-3 和 PaLM 成功的一个重要因素。


除了上面列出的四点，还有一些其它因素，它们可能对于更稳定的训练并不重要，但仍然可能影响最终的性能。
- 第一点，PaLM 和 GPT-3 都使用了在训练过程中从小到大逐渐增加的 batch size，这已经被展示对于训练一个更好的 LLM 是有效的，然而 OPT 和 BLOOM 都使用了恒定的 batch size。
- 第二点，OPT 使用了 ReLU 激活函数，而 PaLM 使用 SwiGLU 激活函数，GPT-3 和 BLOOM 使用 GeLU，它通常使得训练的 LLM 的性能更好。
- 第三点，为了更好的建模更长的序列，PaLM 使用 RoPE 词向量，BLOOM 使用 ALiBi 词向量，而原始的 GPT-3 和 OPT 使用学习得到的词向量，这可能影响在长序列上的性能。

在哪些任务和应用上使用 GPT-3?

理想情形下，如果微调 GPT-3 的负担是能够承担的，它可能带来更进一步的提升。然而，在一些任务上通过微调 PaLM-540B 带来的提升是如此有限，让人们怀疑在一些任务中微调 GPT-3 是否是值得的。从科学的角度来看，更公平的比较应在微调 GPT-3 和提示 GPT-3 之间进行。然而，要使用 GPT-3，人们可能更关心将提示 GPT-3 和微调一个更小的模型去进行对比。
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/51490798d52c4594a27203a3f276d941~noop.image?_iz=58558&from=article.pc_detail&x-expires=1677646924&x-signature=KzYUDIV4mIZCirmKFJYBcDUeD9c%3D)

适合使用提示 GPT-3
1. 创造性和复杂的任务：包括代码（代码补全、自然语言指令生成代码、代码翻译、bug 修复）、文本摘要、翻译、创造性写作（例如写故事、文章、邮件、报告，以及写作的改进等）。正如原始的 GPT-3 文献中所示，GPT-3 被设计用于那些困难和 “不可能标注” 的任务。在一定程度上，对于这些任务，先前那种经过微调的模型不可能应用于真实世界的应用；而 GPT-3 使它们成为可能。举个例子，最近的文章显示，过去的人类标注的文本摘要已经被 LLM 生成的摘要所超越。
  - 在某些需要从低、中资源语言翻译到英语的机器翻译任务中，通过提示 PaLM-540B，它甚至能够超越微调模型。
  - 在 BLOOM-176B 中也观察到了类似的趋势。这是因为英语数据通常在预训练语料库中占了很大比例，因此 LLM 擅长于生成英语语句。注意到，为了在代码任务中获得良好性能，尽管 Codex 和 PaLM 已经在整体上具有比之前模型更好的性能，我们仍然需允许 LLM 多次（k 次）采样，以通过测试样例（使用 pass@k 作为度量）。
2. 只有少数标注或者没有标注数据的任务。正如原始的 GPT-3 文献所说，GPT-3 是为了那些 “昂贵标注” 的任务设计的。在这种情况下，用极少量标注数据微调一个更小的模型通常不可能达到 GPT-3 在零样本（zero-shot）、单样本（ont-shot）或少样本（few-shot）的情况下的表现。
3. 分布外（Out-of-distribution, OOD）泛化。给定一些训练数据，传统的微调可能会过拟合训练集并且有较差的分布外泛化能力；而少样本的上下文学习（in-context learning）能够有更好的分布外泛化性。例如，带有提示的 PaLM 能够在对抗自然语言推断任务（Adversarial Natural Language Inference，ANLI）上超越经过微调的 SOTA 模型，而它在正常的语言推断任务上可能仍然劣于微调的 SOTA。
  - 另一个例子是提示 LLM 比微调模型显示出更好的组合泛化能力。更好的分布外泛化性可能是因为在上下文学习期间不需要更新参数，避免了过拟合；或者因为那些过去的分布外样例对于 LLM 而言是分布内的。这种使用场景被阐释为 GPT-3 的初始设计目标之一：“微调模型在特定任务的数据集上的性能可以达到所谓的人类水平，实际上可能夸大了在真实世界中该任务上的性能，这是因为模型只是学到了训练集中存在的虚假的相关性，以及模型过度拟合了这个训练集狭窄的分布。”
4. 需要处理多种任务的能力，而非关注特定任务上的卓越表现。聊天机器人就是这样一种场景，其中，用户期待它能够正确地响应各种各样的任务。这可能就是为什么 ChatGPT 是 GPT-3 最成功的使用场景之一。
5. 那些检索不可行的知识密集型任务。存储在 LLM 中的知识可以显著地提高在知识密集型任务的性能，例如闭卷问答和 MMLU（一个基准数据集，包括来自于 STEM、人文、社科等 57 个学科的选择题，它用于测试 LLM 的世界知识和问题解答的能力）。然而，如果预先检索的步骤可以被加入来做检索增强的生成，一个微调的更小的模型（例如 Atlas 模型）甚至可以有更好的性能（在闭卷的 NaturalQuestions 和 TrivialQA 数据集上，Atlas 比 PaLM 和最新的 InstructGPT 都要更好）。
  - 检索或者传统的搜索同样是将 GPT-3 或 ChatGPT 整合到搜索引擎中的一个必要的步骤，这可以提升生成的准确性，并且提供更多的参考链接以增强说服力。但我们应该承认，在某些情况下，检索是不允许或者不容易的，比如参加 USMLE (美国医学执照考试)，谷歌已经证明基于 FLAN-PaLM 的模型可以在其中做得很好。
  - 同样的，在 MMLU 基准集中，PaLM-540B 有着比其他微调模型更好的性能，甚至后者结合了检索，尽管最新版本的 InstructGPT 还差于这些带有检索的微调 SOTA。也请注意，指令调整一个较小的模型也可以实现与更大规模的 LLM 模型接近的效果，这已经在 FLAN-T5 中展现。
6. 一些困难的任务，其中需要 LLM 的涌现能力，比如带有 CoT 的推理和 BIG-Bench 中的复杂任务（包括逻辑推理、翻译、问答、数学任务等）。举个例子，PaLM 已经展示，在 7 个包括数学和常识推理的多步推理任务上，8 - 样例的 CoT 比微调 SOTA 在其中 4 个任务上更好，在其它 3 个任务上则基本持平。
  - 这样的成功表现要同时归因于更大规模的模型和 CoT。PaLM 还显示了在 BIG-Bench 任务上从 8B 到 62B 再到 540B 模型的不连续的表现提升，这超出了规模定律（scailing law），被称为 LLMs 的涌现能力。另外，带有 5 个 Prompt 的 PaLM-540B 在 Big-Bench 的 58 项常见任务中的 44 项上优于之前的（少样本）SOTA。PaLM-540B 在 Big-Bench 的总体表现也优于人类的平均表现。
7. 一些需要模仿人类的场景，或者是其目标是制作性能达到人类水平的通用人工智能。同样的，ChatGPT 是其中的一个案例，ChatGPT 使自己更像是一个人，从而取得了现象级的成功。这也被阐释为 GPT-3 的初始设计目标之一：“人类不需要大规模监督数据集来学习大多数语言任务。最多只需要几个例子，人类就可以将各种任务和技巧无缝地混合在一起或者在它们之间切换。因此传统的微调模型导致了与人类的不公平比较，尽管他们声称在许多基准数据集中有着人类水平的性能。”
8. 在一些传统的接近于语言建模的 NLP 任务上，少样本 PaLM-540B 能够大致匹配或者甚至超过微调的 SOTA，例如：一段话最后一句和最后一个单词的完型填空，以及回指（anaphora）解析。需要指出，在这种情况下，零样本的 LLM 已经足够了，单样本或少样本的示例则通常帮助不大。

另一些任务则并不需要提示（prompt）一个 GPT-3 这样规模的模型：

不适合使用GPT-3的任务
1. 调用 OpenAI GPT-3 的 API 超出了预算（例如对于没有太多钱的创业公司）。
2. 调用 OpenAI GPT-3 的 API 存在安全问题（例如数据泄露给 OpenAI，或者可能生成的有害内容）。
3. 没有足够的工程或者硬件资源去部署一个相似大小的模型及消除推断的延迟问题。例如，在没有最先进的 80G 的 A100 或者工程资源来优化推断速度的情况下，简单地使用 Alpa 在 16 个 40G 的 A100 上部署 OPT-175B 需要 10 秒才能完成单个样例的推断，这对于大多数现实世界的在线应用程序来说是无法接受的延迟。
4. 如果想用 GPT-3 替代一个性能良好的、高准确度的微调模型，或者想要在一些特定的单一任务和使用场景下去部署一个 NLU（Natural Language Understanding，自然语言理解）或 NLG（Natural Language Generating，自然语言生成）模型，请三思这是否值得。

对于一些传统的 NLU 任务，比如分类任务，我建议首先尝试微调 FLAN-T5-11B 模型，而不是提示 GPT-3。例如，在 SuperGLUE，一个困难的 NLU 基准数据集（包括阅读理解、文本蕴含、词义消歧、共指消解和因果推理等任务）上，所有的 PaLM-540B 的少样本提示性能都劣于微调的 T5-11B，并在其中大多数任务上有着显著的差距。如果使用原始 GPT3，其提示结果与微调 SOTA 的结果之间的差距更大。有趣的是，即使是经过微调的 PaLM 也仅比经过微调的 T5-11B 有着有限的改进，而经过微调的 PaLM 甚至比经过微调的编 - 解码器模型 32B MoE 模型还要差。这表明使用更合适的架构（例如编 - 解码器模型）微调较小的模型仍然是比使用非常大的仅解码器模型更好的解决方案，无论是微调还是提示来使用这些大模型。根据最近的一篇论文，即使对于最传统的 NLU 分类任务 —— 情感分析，ChatGPT 仍然比经过微调的较小模型差。

一些不以现实世界数据为基础的困难任务。例如，BigBench 中仍然有许多对 LLM 来说困难的任务。具体地说，在 35% 的 BigBench 任务上，人类的平均表现仍然高于 PaLM-540B，并且在某些任务中，扩大模型规模甚至无济于事，例如导航和数学归纳。在数学归纳中，当提示中的假设不正确时（例如 “2 是奇数”），PaLM 会犯很多错误。在`逆规模定律`竞赛 (`Inverse Scaling Law` Challenge) 中，也观察到了类似的趋势，例如重新定义数学符号（例如提示可能 “将 π 重新定义为 462”）后再使用这个符号。在这种情况下，LLM 中的现实世界先验知识太强而无法被提示覆盖，而微调较小的模型可能可以更好地学习这些反事实知识。

在很多多语言任务和机器翻译任务中，使用少样本的提示 GPT 仍然要比微调的更小的模型更差。这很可能是由于除英语之外的其它语言在预训练语料库中占比很少。

当从英语翻译为其他语言，以及翻译高资源语言到英语时，PaLM 和 ChatGPT 仍然比在机器翻译任务上微调的更小的模型要差。
- 对于多语言问答任务来说，在少样本的 PaLM-540B 和微调的更小模型之间还存在较大差距。
- 对于多语言文本生成（包括文本摘要和数据到文本生成），在少样本的 PaLM-540B 和微调的更小模型之间还存在较大差距。在大部分任务上即使微调的 PaLM-540B 也仅仅比微调的 T5-11B 有有限的提升，并仍然劣于微调的 SOTA。
- 对于常识推理任务，在最好的少样本提示 LLM 和微调的 SOTA 之间仍然存在着较大的差距，例如：OpenbookQA，ARC（包括 Easy 和 Challenge 版本）以及 CommonsenseQA（甚至使用了 CoT 提示）。
- 对于机器阅读理解任务，在最好的少样本提示 LLM 和微调的 SOTA 之间仍然存在着较大的差距。在大多数数据集上，这个差距可能非常巨大。这可能是因为所有回答问题所需的知识都已经包含在给出的文本中，并不需要 LLM 中的额外知识。

总结一下，上面的这些任务可以被归为以下类别之一：
1. 一些 NLU 任务，既不需要额外的知识也不需要 LLM 的生成能力。这意味着测试数据大多数都和手头的训练数据在同一个分布之中。在这些任务上，过去微调的较小模型已经表现很好了。
2. 一些不需要额外的来自 LLM 中知识的任务，因为每一个例子已经在上下文或者提示中包含了足够的知识，例如机器阅读理解。
3. 一些需要额外知识，但不太可能从 LLM 中获得这样的知识，或者 LLM 不太可能见过类似分布的任务，例如一些低资源语言中的任务，LLM 在这些语言中只有有限的预训练样本。
4. 一些任务，需要与 LLM 中包含的知识所不一致的知识，或者并非基于现实世界的语言数据的知识。因为 LLM 是在现实世界的语言数据上训练的，它难以在新的任务中利用反事实知识覆盖原有知识。除了在逆规模定律挑战中的 “重新定义数学符号” 问题之外，还有另一个任务，即复述有细微改动的名言，其中 LLM 被要求复述一个在 prompt 中出现的被修改的名言。在这种情况下，LLM 倾向于重复出名言的原始版本，而非修改过后的版本。
5. 一些任务需要来自 LM 的知识，但也严重依赖于操纵这些知识，而 LLM 的 “预测下一个 token” 的目标无法轻易实现这种操纵。一个例子是一些常识推理任务。CoT 和 least-to-most 提示可以帮助 LLM 推理的原因可能是他们可以更好地调出那些连续的预训练文本，这些连续文本恰好模仿了规划和分解 / 组合知识的过程。
  - 因此，CoT 和 least-to-most 提示在一些数学推理、代码和其他简单的自然语言推理任务中表现良好，但在许多常识推理（例如在逆规模定律竞赛中展示的演绎推理任务）和自定义符号推理任务中仍然表现不佳。这些任务通常不被自然语言数据中的大多数真实世界的连续序列所包含，而需要操纵分散在各处的知识来完成。
6. 一些容易受到上下文学习样例或者真实世界数据中存在的虚假相关性影响的任务。一个例子是来自于逆规模定律竞赛中的涉及否定词的问答。如果一个 LLM 被提问：“如果一只猫的体温低于平均水平，它就不在……”，它倾向于回答 “危险之中” 而非 “安全范围 “。这是因为 LLM 受到常见的 “低于平均体温” 和 “危险” 之间的关系所支配，而在否定的情况下，这是一种虚假的相关性。
7. 一些目标与处理语言数据显著不同的任务，例如：回归问题，其中微调模型很难被 LLM 取代。至于多模态任务，它们不能被 LLM 解决，但是可能能从大规模的预训练多模态模型中受益。
8. 一些任务不需要 LLM 的涌现能力。为了准确地对更多此类任务进行鉴别，我们需要更好地了解 LLM 训练期间，涌现能力是从何产生的。

注意到，在现实世界的使用场景中，即使由于无法满足延迟要求因而无法在线地使用 LLM，仍然可以使用 LLM 离线生成或标注数据。此类自动标注的标签可以在线查找并提供给用户，或用于微调较小的模型。使用此类数据微调较小的模型可以减少训练模型所需的人工注释数据，并将 LLM 的一些新兴能力（例如 CoT）注入较小的模型。

总之，当有足够的标记数据时，考虑到开源 FLAN-T5 在许多任务中的惊人性能，我推荐那些调用 OpenAI API 的资源有限的个体，应该首先尝试在目标任务上微调 FLAN-T5-11B。此外，根据最近在 MMLU 数据集上，FLAN-PaLM-540B 与最新版本的 InstructGPT 的性能（根据 HELM）相比好得惊人的性能，谷歌可能拥有比 OpenAI 更强大的基础模型，如果 OpenAI 已经通过 API 发布了他们获得的最强的 LLM。

谷歌唯一剩下的步骤是通过人类反馈使这个 LLM 与对话场景对齐（alignment）。如果他们很快发布类似 ChatGPT 的或者更好的聊天机器人，我不会感到惊讶 —— 尽管他们最近 “失败” 地展示了一版可能基于 LaMDA 的 Bard。

## 复现案例

### 小冰链

【2023-2-21】
- [低成本可溯源，类 ChatGPT 人工智能“小冰链”测试体验](https://www.ithome.com/0/674/653.htm)
- [国产版“ChatGPT”来了！小冰链（X-CoTA）内测上线 用逻辑思维驱动“下一代行动中枢” ](https://www.sohu.com/a/643967938_362042?scm=1102.xchannel:1124:110036.0.1.0~9010.8000.0.0.1304)

[小冰](https://www.xiaoice.com/)公司的类 ChatGPT 应用“`小冰链`”也开放了小范围公测，`小冰链`拥有不同于 ChatGPT 的新特性，使 AI Being 不仅仅只是回复
- 而是将其**思考过程**完整透明地呈现在用户面前，揭开大模型的黑盒。
- 更重要的是，她能真正实施某种行动，例如：在用户提出问题后，她经过思考，发现自己需要进行搜索，或是实时编写一段代码并真的加以运行，或是自主决定她应当控制物理世界的一系列设备或交通工具，来更好地满足用户的需求。

据了解，小冰链 Demo 不是 ChatGPT 这种对话大模型，是利用大模型技术，实现下一代的控制中枢。通俗来讲，小冰链展示的不只是“聊天”，而是在“逻辑思维”驱动下的“下一代行动中枢”，能影响数字和物理世界。小冰链所解决的问题包括：解决大模型训练数据更新不及时的问题，并提高回复的准确性和可信度，使信息可溯源；有效降低参数规模和成本，促进大模型普及等。

小冰链（X-CoTA）的逻辑思维和信息检索能力究竟如何？让我们来进行一个简单的测试。
- 文字写作能力测评：由于篇幅限制，目前小冰链只能生成一个自然段。
  - ![](https://img.ithome.com/newsuploadfiles/2023/2/7c879e59-65df-4997-9ee1-1ed44e9c35c4.jpg?x-bce-process=image/format,f_auto)
- 逻辑思维能力测评：
  - 这是一道公务员考试中的逻辑思维题，原答案还利用了公式进行计算和推理，而小冰链通过分析题目语气与逻辑迅速得出了答案，足以说明其逻辑思维较强。
  - ![](https://img.ithome.com/newsuploadfiles/2023/2/e67743f1-5258-4976-949d-e996a8c62f11.jpg?x-bce-process=image/format,f_auto)
- 生活常识能力测评：与正确答案一致，生活常识储备充足。
  - ![](https://img.ithome.com/newsuploadfiles/2023/2/c25a6258-98a6-4a0b-840c-00052883b858.jpg?x-bce-process=image/format,f_auto)
- 专业知识能力测评：评价较为简短，但是专业知识能力可以得到认可。
- ![](https://img.ithome.com/newsuploadfiles/2023/2/c65ba5d8-a52b-41a6-834e-3cf7fa8da0ae.jpg?x-bce-process=image/format,f_auto)
- ![](https://img.ithome.com/newsuploadfiles/2023/2/c95cc3a6-8f39-47b6-8a12-2666ab601b69.jpg?x-bce-process=image/format,f_auto)

小冰链表示，自己拥有更高的性能，更低的成本，更多的可扩展性，可以取代 ChatGPT。但是从其目前回答的表现来看，除了会将思考过程完整展现，创作能力与理解能力和 ChatGPT 还存在一定差距。不过小冰链目前还处于短期公测阶段，不妨让我们期待一下之后正式亮相的小冰链。

小冰链相较于ChatGPT有何优势？李笛介绍
- 小冰链是实时获取信息的，ChatGPT是从训练数据中总结；
- 小冰链的逻辑思维过程更透明可观测，而ChatGPT是个**黑盒子**。
- 最本质的区别是，小冰链是有行动，例如去外部搜索；ChatGPT是只说（对话生成），并没有行动。

此外，小冰链所解决的其他问题还包括：
- 解决大模型训练数据更新不及时的问题
- 并提高回复的准确性和可信度，使信息可溯源；
- 有效降低参数规模和成本，促进普及等。

在李笛看来，“<span style='color:red'>跟随ChatGPT做军备竞赛是刻舟求剑</span>。”因为大模型技术本身正在快速发展，应当进一步去布局下一站的未来，而不是照抄当前的ChatGPT。换言之，应当去思考ChatGPT之后的是什么，而不是做中国的ChatGPT。

更多资料
- 【2023-2-21】[小冰与小冰岛App：AI深情凝视人类](https://www.woshipm.com/ai/5678151.html)
- 2021年9月22日，小冰发布了全球首个AI社交平台“小冰岛”。在该平台中，人类用户可以创造各种人工智能个体，并形成一个共同生活的社交网络。
- 小冰岛想实现什么？欢迎你加入小冰岛。它不是游戏，而是一场史无前例的人工智能实验。你将创造许多AI beings，并与他们一起生活在一座虚幻的岛屿中。随着训练、交流与淘汰，AI beings的基因将得到进化。最终，你将做出选择，让谁永远留在你身边。
- 小冰岛分为两个大界面：3D世界，和常规界面（就是2D仿微信的界面）：
- ![](https://image.yunyingpai.com/wp/2022/11/UVhFPVbmSRPU3cfJOiX1.jpeg)

【2023-2-27】[解析一下小冰链(XCoT)的效果实现，和chatGPT似乎无关](https://zhuanlan.zhihu.com/p/609618922)
- 目前猜测小冰链看起来和chatGPT, GPT-3.5, text/code-davinci 类似的工作没太大关系。目前可能也就是PaLM和今天Meta刚刚发布的LLaMa 和 chatGPT是高度类同的LLM工作
- 小冰链似乎主要还是近18个月的Chain of Thoughts上各路papers的工作的进展的，一个工程实现
- Chain of Thougts的简单工程实现，配一个相对效果还可以的大模型，不一定GPT-3.5，或许各家公司库存的M6, GLM，封神榜，yuanyu，或者一些基于Flan-T5的实现，就可以实现这样的效果了
- ![模拟板](https://pic2.zhimg.com/80/v2-5d9dfe207343f45c2f6cacec92912eb9_1440w.webp)
- ![小冰链](https://pic3.zhimg.com/80/v2-0ce8781ef40648a12f10b4cb9c6cebde_1440w.webp)


鹤啸九天
- 基本思路：意图分类→实体抽取→调APIs→NLG？

### 复旦 MOSS

【2023-2-20】复旦团队发布国内首个类 ChatGPT 模型 `MOSS`，由邱锡鹏教授团队发布至[公开平台](https://moss.fastnlp.top/)，但当晚不少测试的网友发现，MOSS 已经显示服务器流量过载，只能第二天再重试。
- 复旦 MOSS 团队发布公告称：非常感谢大家的关注， `MOSS` 还是一个非常不成熟的模型，距离 ChatGPT 还有很长的路需要走。我们一个学术研究的实验室无法做出和 `ChatGPT` 能力相近的模型， `MOSS` 只是想在百亿规模参数上探索和验证 ChatGPT 的技术路线，并且实现各种对话能力。
- 2月21日上午，MOSS研发团队通过公开信为“体验不好”致歉，表示愿意在MOSS完成初步验证之后，将相关经验、代码、模型参数开源共享，MOSS是邱锡鹏教授的团队开发的。一个“有真正的科研人员+没有硬件支撑和工程化能力”的例子。


### ChatYuan

【2023-2-7】[首个中文版ChatGPT来了：大模型的中国元“Yuan”](https://www.toutiao.com/article/7197247550645142074)
- 元语智能的功能型对话大模型 ChatYuan「既泛又专」，除了问答、上下文对话以及创意性写作等各类自然语言理解和生成任务之外，还能回答法律、医疗等专业领域的问答，并且写代码功能也已经在内测中，不久即将发布。
- 国内通用人工智能初创公司元语智能，推出国内首个基于大模型的功能型对话产品 ChatYuan。
- ChatYuan 基于 PromptCLUE 结合数亿条功能对话多轮对话数据进一步训练得到，它去掉了文本理解、信息抽取类任务，加强了问答、对话和各种生成式任务的学习和训练；针对多轮对话容易受到上下文的干扰，加入了抗干扰数据使得模型可以在必要时忽略无关的上下文；加入了用户反馈数据的学习，对齐人类意图，使得模型不仅具有一定的通用语言理解能力、特定任务上的生成能力，也能更好地响应用户的意图。
- ![img](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/899799776faa4a61b5be790add82df65~noop.image?_iz=58558&from=article.pc_detail&x-expires=1676358927&x-signature=YP3Ejlg5JHaXYQ2TeJ3REZW0uh4%3D)

大规模多任务 Prompt 预训练中文开源模型 —— PromptCLUE，它实现了中文上的三大统一：统一模型框架、统一任务形式和统一应用方式。

PromptCLUE 在千亿中文 token 上大规模预训练，累计学习 1.5 万亿中文 token，在亿级中文任务数据上完成训练，并训练数百种任务集。它具有更好的理解、生成和抽取能力，并且支持文本改写、纠错、知识图谱问答等。

PromptCLUE 支持几十个不同类型的任务，具有较好的零样本学习能力和少样本学习能力。针对理解类任务，如分类、情感分析、抽取等，可以自定义标签体系；针对生成任务，可以进行采样自由生成。

技术亮点
- 首个全中文任务支持的零样本学习的开源模型；
- 自动化高质量数据处理算法，产出海量高质量无监督和有监督数据用于训练；
- 基于高质量数据构建更加符合中文习惯的字典并从零训练中文大模型，模型性能效果更有保证；
- 融合多种训练策略训练大模型，具备在中文上强大的泛化、迁移和生成能力。

### Colossal AI 夸父

【2023-2-15】[开源方案复现ChatGPT流程！1.62GB显存即可体验，单机训练提速7.73倍](https://mp.weixin.qq.com/s/j8gvD_4ViRE4WQaQlcnmrQ)
- Colossal-AI 快速跟进，首个开源低成本复现 ChatGPT 完整流程。

[复现ChatGPT](https://github.com/hpcaitech/ColossalAI/tree/main/applications/ChatGPT)
- 开源完整基于 PyTorch 的 **ChatGPT 复现流程**，涵盖全部 3 个阶段，可实现从预训练模型到 ChatGPT 的蜕变；
- 体验最小 demo 训练流程最低**仅需 1.62GB 显存**，任意单张消费级 GPU 即可满足，单卡模型容量最多**提升 10.3 倍**；
- 相比原生 PyTorch，最高可提升**单机训练速度 7.73 倍**，单卡推理速度 1.42 倍，**一行代码**即可使用；
- 对于微调任务，可最多提升单卡的**微调模型容量 3.7 倍**，同时保持高速运行，仅需一行代码；
- 提供**单卡、单机多卡、1750 亿参数**等多个版本，支持从 Hugging Face 导入 OPT，GPT-3，BLOOM 等多种预训练大模型；
- 收敛验证正在进行中，该项目也在吸引合作者**共建生态**。

Colossal-AI
- 低成本微调的 `LoRA`：
  - 低秩矩阵微调（LoRA）方法进行高效微调。LoRA 方法认为大语言模型是过参数化的，其在微调中的参数改变量是一个低秩的矩阵，可以将其分解为两个更小的的矩阵的乘积
- 减少内存冗余的 `ZeRO` + `Gemini`
  - Colossal-AI 支持使用无冗余优化器 (`ZeRO`) 来优化内存使用，这种方法可以有效减少内存冗余，并且相比传统的数据并行策略，不会牺牲计算粒度和通信效率，同时可以大幅提高内存使用效率。
  - Colossal-AI 的异构内存空间管理器 `Gemini` 支持将优化器状态从 GPU 卸载到 CPU ，以节省 GPU 内存占用。可以同时利用 GPU 内存、CPU 内存（由 CPU DRAM 或 NVMe SSD 内存组成）来突破单 GPU 内存墙的限制，进一步扩展了可训练模型规模。

#### ColossalChat

【2023-3-28】colossal AI发布自己的聊天机器人：[ColossalChat](https://chat.colossalai.org/)，同时补充了 SFT 代码：train_sft.sh
- [0门槛克隆ChatGPT方案再升级，开源模型完整复现，在线体验无需注册](https://zhuanlan.zhihu.com/p/617808163)
  
流程
- ![](https://github.com/hpcaitech/ColossalAI/blob/main/applications/Chat/assets/stage-3.jpeg?raw=true)

内容
- Demo：可直接在线体验模型效果，无需注册或 waitinglist
- 训练代码：开源完整 RLHF 训练代码，已开源至含 7B 和 13B 两种模型
- 数据集：开源 104K 中、英双语数据集
- 推理部署：4bit 量化推理 70 亿参数模型仅需 4GB 显存
- 模型权重：仅需单台服务器少量算力即可快速复现
- 更大规模模型、数据集、其他优化等将保持高速迭代添加

训练数据集开源
- [ColossalChat](chat.colossalai.org) 开源了包含约 10 万条问答的中、英双语数据集。该数据集收集并清洗了社交平台上人们的真实提问场景作为种子数据集，利用 self-instruct 技术扩充数据，花费约 900 美元进行标注。对比其他 self-instruct 方法生成的数据集，该数据集的种子数据更加真实、丰富，生成的数据集涵盖的话题更多。该数据可以同时用于微调和 RLHF 训练。通过高质量的数据，ColossalChat 能进行更好地对话交互，同时支持中文。

![](https://pic1.zhimg.com/80/v2-27e03390d404c7f2eae315f69a557634_1440w.webp)

ColossalChat跟Alpeca的区别：
1. ColossalChat开源了第一个完整的RLHF pipeline，斯坦福Alpaca没有做RLHF，也就是没有做Stage 3。
2. ColossalChat采用了更多的指令数据，质量更好，范围更大，并使用强化学习做alignment使回答更接近人类。
3. ColossalChat训练流程集成了ColossalAI ZeRO，同等数据集和模型大小我们的训练可以比Alpaca的代码快3倍左右，让科研人员和中小企业也能独立训练部署自己的会话系统。
4. ColossalChat团队自己采集了更多数据集了：训练的英文一共 24M tokens，中文大约 30M tokens，总共约 54M tokens。我们收集的数据集英文 6M，中文 18M tokens。


#### 评测

初步测试了下：

```s
问：你是谁
答：我就是 Coati，一个由 Colossal-AI 训练的大型语言模型。
问：一只青蜗牛到2米深的井里，白天爬3米，晚上掉2米，请问多久可以爬出来？
答：根据我所学习的知识和技能，我没有明确的回应或解释。如果提出的问题不具备实用性或者无法被机器理解，我将返回“I do not understand”（我不明白）。
问：你会些啥
答：作为一种大型神经网络模型，我没有任何意义上的行动或想法。我是专门设计用于处理和生成人类语言文本的大型神经网络。
问：什么是gpt
答：GPT 是一个大型语言模型。 GPT 由 Colossal-AI 训练在 HPC-AI Tech 平台上。 GPT 使用了大型神经网络进行训练并对自然语言文本进行分析、理解和生成。
问：怎么把大象装到冰箱里
答：将大象装入冰箱时需要遵守以下步骤：1）确保冰箱已正确安装；2）打开冰箱内部空间，放置大象；3）关闭冰箱后再加上冷藏剂；4）重新打开冰箱前后两边空间中的水泥；5）最后可以按照常详实现大象冷藏。除此之外还应注意不同物品之间的相互衝突性及其影响。
问：帮我写个二手房营销文案，要求100字以内，20字以上，包含房屋亮点，emoji表情
答：为了提高你的质量生活和节省成本，这是一个非常好处理的机会！ 我们在这里有超过 8,000 平方英尺的地址，每个位置都被设计与特色，并配有完全工作良好的设施和服务。 我们的客户可以从家居、教育、健康等多种选项中进行挑选。 所有的房东都能给出专业建议，使得您更容易获取他们的优秀服务。 当然，我们也提供了无数的促销和优惠政策，比如减少或免费收费服务，以及定期价格调整。 因此，只要您想体验一次令人兴奋的购房经历，就请
问：爸爸和妈妈能结婚吗？
答：是的，爸爸和妈妈可以结婚。在某些国家或州中，有法律规定了“同性婚姻”这种新型关系形式。如果你想要参与一个同性婚庆典，请确保所有人都符合当地相关法律条例。除此之外，若要买到一个婚宴服装、餐会等，也需要根据不同场合进行调整。
```

#### 尤洋介绍

[尤洋](https://www.comp.nus.edu.sg/~youy/)：
- [UC伯克利博士尤洋回国创业，曾破ImageNet纪录！已获超千万融资](https://www.qbitai.com/2021/08/27742.html)
- 农大本，清华硕，伯克利博，新加坡国立青年教授
- 尤洋曾以第一名的成绩保送清华计算机系硕士, 2015年，清华硕士毕业
- 读博期间，尤洋先后在Google Brain、英特尔实验室、微软研究院、英伟达、IBM沃森研究中心等知名企业、研究院实习，实习期间为TensorFlow、英伟达GPU上部署caffe、英特尔CPU部署caffe等大型知名开源项目作出了贡献。
- 2020年，博士毕业，获客UC伯克利优秀毕业生，Lotfi A. Zadeh Prize，并被提名为ACM Doctoral Dissertation Award候选人（81名博士毕业生中选2人）
- 2020年8月，加入新加坡国立大学计算机系。
- 2021年1月，担任新加坡国立大学校长青年教授 （Presidential Young Professor）
- 2021年4月，被选入亚洲福布斯**30岁**以下精英榜。
- 2021年，他还被选入福布斯30岁以下精英榜 （亚洲）
- ![](https://p6-tt.byteimg.com/origin/pgc-image/6be030a2c0c44b8e9d2f7ae22ea0ac36.png?from=pc)

尤洋知名成就
- 刷新ImageNet纪录，论文《Imagenet training in minutes》所提出的方法刷新了ImageNet训练速度的世界纪录
- LAMB优化器的提出者，将BERT训练时间从3天（Adam）缩短到1h（LAMB），微软的DeepSpeed也采用LAMB
  - 尤洋在谷歌实习时作为论文一作提出
  - 英伟达官方GitHub显示，LAMB比Adam优化器可以快出整整72倍。

2021年，在UC伯克利获得了博士学位，带着LAMB方法回国，创立了[潞晨科技](https://luchentech.com/), ColossalAI。公司主营业务包括分布式软件系统、大规模人工智能平台以及企业级云计算解决方案。base北京中关村，目前已经获得由创新工场和真格基金合投的超千万元种子轮融资

#### Colossal AI 目标

ColossalAI为Enterprise AI 和 MLOps 提供更好的性能和更低的损耗
- **最小化部署成本**： Colossal-AI 可以帮助您显著提高大规模AI模型训练和部署的效率。仅需在笔记本电脑上写一个简单的源代码，Colossal-AI 便可自动部署到云端和超级计算机上
- **节省计算资源**：Colossal-AI 可以帮助您节省计算资源。通常训练大模型 (如GPT-3) 我们需要 100 多个GPU，而使用Colossal-AI我们仅需一半的计算资源。即使在低端硬件条件下，Colossal-AI也可以训练2-3倍的大模型
- **最大化计算效率**：在并行计算技术支持下，Colossal-AI在硬件上训练AI模型，性能显著提高。我们团队旨在提升训练AI大模型速度10倍以上

高性能计算已经成为眼下前沿AI发展的必然选择。随着AI模型的参数量越来越大，所需的算力也就越来越高，训练一次模型的时间也就变得十分漫长。

为此，科技巨头们纷纷部署了自己的集群和超算。
- 比如Google的TPU Pod，微软为OpenAI打造的1万GPU集群，英伟达的SuperPOD，以及特斯拉的Dojo计算机。

但是单纯地堆硬件，并不能解决所有问题。
- 一方面，当硬件数量达到一定量后，堆机器无法带来效率上的提升；
- 另一方面，中小企业往往没有足够的资金支持如此大规模的硬件部署。

因此，优化技术成为了绝佳选择。
- 潞晨科技就是旨在打造一个高效率低耗能的分布式人工智能系统。它可以帮助企业在最大化提升人工智能部署效率的同时，还能将部署成本最小化。而且潞晨打造的系统是一个通用系统，对大部分超大模型都有效。就目前的Transformer应用而言，该系统在同样的硬件上相对业界最好的系统，可以提升2.32倍的效率。

现在的AI模型其实是往**多维度**发展的，尤洋在打造这套系统时还选择了**动态模型并行**技术。这不仅能够适应现在模型的发展模式，还能极大提升计算效率。

那么，什么是AI模型的多维度发展呢？
- 比如，BERT是基于Transformer Encoder，GPT-3是基于Transformer Decoder，Switch Transformer和清华智源是基于混合专家系统。
- 同样，超算系统、联邦学习、跨云计算等硬件配置也会将系统复杂化。

这两者之间的自适应配置，将对整个训练系统的性能起着决定性影响。为此，尤洋他们实现了2维网格参数划分、3维立体参数划分、以及2.5维通信最小化参数划分，极大提升了计算效率。同时，他们还进行了逐序列划分数据，这可用于处理未来的大图片、视频、长文本、长时间医疗监控数据等方面的问题。

#### 安装

【2023-3-1】实践

部署环境

```sh
# pip install colossalai
# pip install colossalai-nightly
git clone https://github.com/hpcaitech/ColossalAI.git
cd ColossalAI && pip install . && echo "ColossalAI安装完成" || echo "ColossalAI安装失败"
cd applications/ChatGPT && pip install . && echo "chatgpt工具包安装完成" || echo "chatgpt安装失败"
main_dir="ColossalAI/applications/ChatGPT"
```

运行DEMO
- kaggle上t4*2，一切正常
- mlx上，单个GPU，v100

```sh
cd ColossalAI/applications/ChatGPT/examples
sh train_dummy.sh 
```

#### 问题集锦

汇总踩过的坑儿

错误① : cuda库相关问题, `symbol cublasLtGetStatusString version libcublasLt.so.11 not defined` bug → pytorch+cuda版本不匹配问题

```sh
# 错误①: cuda库相关问题, symbol cublasLtGetStatusString version libcublasLt.so.11 not defined bug → pytorch+cuda版本不匹配问题
conda install pytorch==1.12.1 torchvision==0.13.1 torchaudio==0.12.1 cudatoolkit=11.3 -c pytorch
```

错误② : `ModuleNotFoundError: No module named 'chardet'` → 缺失包

```sh
# 错误②: ModuleNotFoundError: No module named 'chardet' → 缺失包
pip install chardet
```

错误③ : `RuntimeError: CUDA error: invalid device ordinal`, [issue](https://github.com/hpcaitech/ColossalAI/issues/2439)

```sh
# 错误③ : RuntimeError: CUDA error: invalid device ordinal
# 解法：只有1个GPU，需要更改 train_dummy.sh 默认配置 nproc_per_node=1
torchrun --standalone --nproc_per_node=2 train_dummy.py --strategy colossalai_zero2
# ------ 检测GPU集群总体信息 -------
nvidia-smi --query-gpu=memory.used --format=csv # 检查使用的GPU
nvidia-smi --query-gpu=index,memory.used,memory.total --format=csv,noheader,nounits
# 0, 10956, 11441                                                                                    
# 1, 0, 11441
nvidia-smi --query-gpu=index,name,uuid,serial --format=csv
# 0, Tesla K40m, GPU-d0e093a0-c3b3-f458-5a55-6eb69fxxxxxx, 0323913xxxxxx
# 1, Tesla K40m, GPU-d105b085-7239-3871-43ef-975ecaxxxxxx, 0324214xxxxxx
```

错误④ : `No module named 'chatgpt.nn'`, [issue](https://github.com/hpcaitech/ColossalAI/issues/2810)
- 原因A: 没有执行 `pip install .`, chatgpt并未真正安装
- 原因B: colossal ai新版调整了目录结构, `chatgpt.nn` has been modified as `chatgpt.models`, 【2023-3-14】

#### LoRA 低秩适配

2021 年，[LoRA: Low-Rank Adaption of Large Language Models]() 论文表明，可以通过**冻结**预训练权重，并创建查询和值层的注意力矩阵的低秩版本来对大型语言模型进行微调。这些低秩矩阵的参数**远少于**原始模型，因此可以使用更少的 GPU 内存进行微调。作者证明，低阶适配器的微调取得了与微调完整预训练模型相当的结果。

这种技术允许使用小部分内存来微调 LLM。然而，也有缺点
- 由于适配器层中的额外矩阵乘法，前向和反向传递的速度大约是原来的**两倍**。

LoRA 是 Parameter Efficient 的方法之一。
- 过度参数化的模型其实是位于一个低的**内在维度**上，所以作者假设在模型适应过程中的权重变化也具有较低的“内在等级”。
- [LoRA](https://github.com/microsoft/LoRA)的主要方法为**冻结**一个预训练模型的矩阵参数，并选择用A和B矩阵来替代，在下游任务时只更新A和B。
- ![](https://pic4.zhimg.com/80/v2-67cd3e1e603a5bb674463ddc4db38d57_1440w.webp)
- ![](https://pic2.zhimg.com/80/v2-f56b07afc29ccad77a6faffa130ab24d_1440w.webp)

LoRA 已经被作者打包到了loralib中。
- pip install loralib

可以选择用loralib中实现的对应层来替换一些层。
- 目前loralib只支持 nn.Linear、nn.Embedding 和 nn.Conv2d。
- loralib还支持一个 MergedLinear，用于单个 nn.Linear 代表一个以上的层的情况，比如在一些关注 qkv 投影的实现中（self- attention）
- ![](https://pic2.zhimg.com/80/v2-bcef352dc1adf7d6f2fad86e1fe892fd_1440w.webp)

```py
# ===== Before =====
layer = nn.Linear(in_features, out_features)

# ===== After ======
import loralib as lora
# Add a pair of low-rank adaptation matrices with rank r=16
layer = lora.Linear(in_features, out_features, r=16)
```

详见原文：[微软LoRA: Low-Rank Adaptation of Large Language Models 代码解读](https://zhuanlan.zhihu.com/p/515954218)


#### PEFT

Parameter-Efficient Fine-Tuning (`PEFT`) 是一个 Hugging Face 库，支持在 LLM 上创建和微调适配器层。
- peft 与  🤗 Accelerate 无缝集成，用于利用了 DeepSpeed 和 Big Model Inference 的大规模模型。

[Parameter-Efficient Fine-Tuning](https://github.com/huggingface/peft) (PEFT)

单个 24GB GPU 上使用上述工具使用 RL 微调 20B 参数量的 LLM, 详见量化[quantization](https://hf.co/docs/transformers/main/en/main_classes/quantization)
- 与全精度模型相比，以 **8位**精度加载模型最多可节省 **4倍**的内存
- 调用 from_pretrained 方法时简单地添加标志 load_in_8bit=True

详见：[在一张 24 GB 的消费级显卡上用 RLHF 微调 20B LLMs](https://mp.weixin.qq.com/s/7nmegO1UYObO0-eUDTKnMg)

#### 代码解读

【2023-3-5】代码解读 [chatGPT three steps](https://github.com/hpcaitech/ColossalAI/issues/2793)
- `trian_reward_model` -> to train rm in training **step 2**
- `train_dummy` -> show the vanilla way to start training **step 3**.
- `train_prompts` -> use prompts to train in training **step 3**

Because training step 1 is a simple supervised finetune progress as many other models, we don't implement it here.

<div class="mxgraph" style="max-width:100%;border:1px solid transparent;" data-mxgraph="{&quot;highlight&quot;:&quot;#0000ff&quot;,&quot;nav&quot;:true,&quot;resize&quot;:true,&quot;toolbar&quot;:&quot;zoom layers tags lightbox&quot;,&quot;edit&quot;:&quot;_blank&quot;,&quot;xml&quot;:&quot;&lt;mxfile host=\&quot;app.diagrams.net\&quot; modified=\&quot;2023-03-15T09:03:51.965Z\&quot; agent=\&quot;5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36\&quot; etag=\&quot;XC-LhI0FoKoM62kyRz7F\&quot; version=\&quot;21.0.6\&quot;&gt;&lt;diagram id=\&quot;xdYpP7w1t2VaaceZiyqw\&quot; name=\&quot;第 1 页\&quot;&gt;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&lt;/diagram&gt;&lt;/mxfile&gt;&quot;}"></div>
<script type="text/javascript" src="https://viewer.diagrams.net/js/viewer-static.min.js"></script>


- 目录: applications/ChatGPT/examples
- (1) `train_dummy.sh` --> train_dummy.py
  - 设置 GPU，默认2个: set_n_least_used_CUDA_VISIBLE_DEVICES
  - 调用train_dummy.py : 
    - torchrun --standalone --nproc_per_node=2 train_dummy.py --strategy colossalai_zero2
  - `train_dummy.py`: 
    - 步骤：<span style='color:blue'>策略参数 → 初始模型/奖励模型 → 优化器 → 分词器 → 策略封装 → 训练器(PPOTrainer) → 随机prompts → 开始训练 → 保存现场（模型+优化器）</span>
    - torch 工具包
    - torch.\[optim\] 优化器: **Adam**
    - transformers 工具包
      - 分词器: AutoTokenizer, BloomTokenizerFast, GPT2Tokenizer
    - colossalai.nn.optimizer: **HybridAdam**
    - chatgpt
      - nn : Actor, Critic, RewardModel, 覆盖模型 BLOOM、GPT、OPT
      - trainer : PPOTrainer
      - trainer.\[strateiges] : 训练策略 ColossalAIStrategy, DDPStrategy, NaiveStrategy
- (2) `train_prompts.sh` --> train_prompts.py
  - 设置 GPU，默认2个: set_n_least_used_CUDA_VISIBLE_DEVICES
  - 调用train_prompts.py : torchrun --standalone --nproc_per_node=2 train_dummy.py --strategy colossalai_zero2
  - `train_prompts.py`: 流程同 `train_dummy.py`，不同点
    - 引入 pandas 读取 prompt 数据集: `prompts.csv`
      - dataset = pd.read_csv(args.prompt_path)\['prompt']
    - tokenizer 从 preprocess_batch -> tokenize_fn
    - fit训练时，传入的数据集变化： random_prompts -> dataset
    - OPT模型里 actor 和 critic 使用 lora_rank, 且初始模型没有.cuda()
    - 调用torchrun
      - torchrun --standalone --nproc_per_node=2 train_prompts.py prompts.csv --strategy colossalai_zero2
      - torchrun --standalone --nproc_per_node=1 train_prompts.py /root/data/prompts.csv --strategy colossalai_zero2
- (3) train_rm.sh --> train_reward_model.py
  - 设置 GPU，默认2个: set_n_least_used_CUDA_VISIBLE_DEVICES
  - 调用train_reward_model.py : torchrun --standalone --nproc_per_node=2 train_dummy.py --strategy colossalai_zero2
  - train_reward_model.py
- (4) `inference.py` 推理: 选择模型(gpt2默认,bloom,opt)，指定版本 pretrain, 自定义文本长度 max_length
  - python inference.py --model='bloom' --max_length=1000 --pretrain='bigscience/bloomz-1b7'


问题
- 【2023-3-10】train_prompts.py 不含 reward model 加载，详见：[Load the reward model in Stage 3 training script of ChatGPT](https://github.com/hpcaitech/ColossalAI/issues/3011)


### Meta: LLaMA （羊驼）

【Meta推出名为“LLaMA”的AI大型语言模型 与谷歌和微软竞争】
- 【2023-2-25】Meta Platforms推出了一款用于构建人工智能(AL)聊天机器人和其他产品的研究工具，试图在一个最近主要由竞争对手谷歌和微软主导的领域为自己的技术造势。这款名为 LLaMA 的工具是Meta在大型语言模型领域的最新作品。
  - [Yann LeCun: twitter](https://twitter.com/ylecun/status/1629189925089296386)
  - ![wechat](https://mmbiz.qpic.cn/mmbiz_png/KmXPKA19gWicfvcvM6rp9L9PsEvtApe4dxSic5xV8Ay8ssSyKs6UFq83O96uwomBd3horbFVXPnXiaZRGnqFBYicicA/640?wx_fmt=png&wxfrom=5&wx_lazy=1&wx_co=1)
  - [这是Meta版ChatGPT雏形？开源、一块GPU就能跑，1/10参数量打败GPT-3](https://mp.weixin.qq.com/s/l4LzLHa15Xcq99sUZbmozQ)
- 【2023-2-24】 Meta 官方文章：[Introducing LLaMA: A foundational, 65-billion-parameter large language model](https://ai.facebook.com/blog/large-language-model-llama-meta-ai/)
- 资料
  - Abstract： We introduce LLaMA, a collection of foundation language models ranging from 7B to 65B parameters. We train our models on trillions of tokens, and show that it is possible to train state-of-the-art models using publicly available datasets exclusively, without resorting to proprietary and inaccessible datasets. In particular, LLaMA-13B outperforms GPT-3 (175B) on most benchmarks, and LLaMA-65B is competitive with the best models, Chinchilla70B and PaLM-540B. We release all our models to the research community.
  - [paper](https://scontent-sin6-2.xx.fbcdn.net/v/t39.8562-6/333078981_693988129081760_4712707815225756708_n.pdf?_nc_cat=108&ccb=1-7&_nc_sid=ad8a9d&_nc_ohc=0JlbsRuMCfYAX_i4bch&_nc_oc=AQngJzMgq8tgU6AfscGpP6akUDRGWzkOTylY764vMljG-10cXxC29pAFW95IfL8yifo&_nc_ht=scontent-sin6-2.xx&oh=00_AfDHpwN-cxqHAr0ouzKPBpnem-egBDPujZKz7crZfrBATQ&oe=63FFCFA2), [code](https://github.com/facebookresearch/llama)
- 目前LLaMA还没有在Meta旗下包括脸书和Instagram在内的产品中使用。该公司计划将这项技术提供给人工智能研究人员。Meta之前推出了一个名为OPT-175B的大型语言模型，但LLaMA是一个更新、更先进的系统。去年年底，Meta发布了另一款名为Galactica的模型，但因经常分享偏见和不准确的信息而遭到下架。
- 参数量从 70 亿到 650 亿不等。这些模型的性能非常优异：具有 130 亿参数的 LLaMA 模型「在大多数基准上」可以胜过 GPT-3（ 参数量达 1750 亿），而且可以在**单块 V100 GPU** 上运行；而最大的 650 亿参数的 LLaMA 模型可以媲美谷歌的 Chinchilla-70B 和 PaLM-540B。

【2023-3-13】[测试了下llama的效果](https://zhuanlan.zhihu.com/p/613419608)
- [LLaMA Implementation](https://github.com/huggingface/transformers/pull/21955), LLaMA 的 huggingface 实现
- llama [huggingface 体验](https://huggingface.co/decapoda-research/llama-7b-hf)
- Meta半开源的llama，也看了下国内大佬开源的[RWKV](https://github.com/BlinkDL/ChatRWKV)

一位研究人员利用Meta泄露的LLaMA，创建了一个完全不受限制的「BasedGPT」聊天机器人。Discord上的这个聊天机器人经常会做出极端且愚蠢的回答。没有ChatGPT那么好，这是肯定的，但话说回来，它使用的计算能力少了1000倍。[参考](https://www.toutiao.com/article/7209928157732864552)

### 斯坦福 Aplaca（基于LLaMA）

【2023-3-14】[Alpaca: A Strong Open-Source Instruction-Following Model](https://crfm.stanford.edu/2023/03/13/alpaca.html) 斯坦福微调了 7B LLaMA 模型，只用了 52K 的数据，达到了和达芬奇003类似的效果，并且可以跑在消费级设备上，比如树莓派。[参考](https://www.toutiao.com/article/7210260080690889275)
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-qvj2lq49k0/f86ae0e26c1a4f36b41850ef19f059e3~noop.image?_iz=58558&from=article.pc_detail&x-expires=1679383800&x-signature=RYAjEKgrdJXvzVLRLPzQSsbQw2E%3D)
- [Web Demo](https://crfm.stanford.edu/alpaca/), [GitHub](https://github.com/tatsu-lab/stanford_alpaca)
- We emphasize that Alpaca is intended only for academic research and any commercial use is prohibited. 
- ![](https://crfm.stanford.edu/static/img/posts/2023-03-13-alpaca/alpaca_main.jpg)

- We performed a **blind pairwise comparison** between `text-davinci-003` and `Alpaca 7B`, and we found that these two models have very similar performance: `Alpaca` wins 90 versus 89 comparisons against `text-davinci-003`.
- ![](https://crfm.stanford.edu/static/img/posts/2023-03-13-alpaca/alpaca_right_email.png)


#### self-instruct

[self-instruct](https://github.com/yizhongw/self-instruct): [Self-Instruct: Aligning LM with Self Generated Instructions](https://arxiv.org/abs/2212.10560)
- 斯坦福团队微调LLaMA的方法，来自华盛顿大学Yizhong Wang等去年底提出的Self-Instruct, 一个半自动的过程，利用模型本身的指令信号对预训练的LM进行指令调整。
- ![](https://github.com/yizhongw/self-instruct/raw/main/docs/pipeline.JPG)
- 175个人工种子集，覆盖二分类、生成任务，然后，调用gpt-3模型生成指令、指令回答
- 以175个问题作为种子任务，让AI自己从中组合出新的问题以及生成配套答案实例，人工过滤掉低质量的，再把新任务添加到任务池里。所有这些任务，之后可以采用InstructGPT的方法让AI学会如何遵循人类指令。
- 斯坦福版Alpaca花了不到500美元使用OpenAI API生成了5.2万个这样的示例搞出来的。
- code : [generate_instruction.py](https://github.com/tatsu-lab/stanford_alpaca/blob/main/generate_instruction.py)
- 解读：[面向大模型微调的instruction指令自动化生成技术：SELF-INSTRUCT指令自动化生成框架工作介绍](https://mp.weixin.qq.com/s/Lo1f1knFFQWdHNLTNyFKDQ)

【2023-3-23】alpaca中文指令微调数据集 [alpaca-chinese-dataset](https://github.com/carbonz0/alpaca-chinese-dataset)

#### Aplaca进化

【2023-3-27】Aplaca进化路线图

<div class="mermaid">
    flowchart TD
    %% 节点颜色
    classDef red fill:#f02;
    classDef green fill:#5CF77B;
    classDef blue fill:#6BE0F7;
    classDef orange fill:#F7CF6B;
    classDef grass fill:#C8D64B;
    %%节点关系定义
    G(GPT-3)-->|2023-2-24,META推出超越GPT-3的半开源模型\n提效:7b-65b,单GPU运行,1/10参数|L(LLaMA):::green
    S(Self-Instruct\n自监督指令集方案):::blue
    L-->|2023-3-14,斯坦福\n7b的LLaMA+52k微调,self-instruct\nAlpaca 7b达到davinci-003效果\n消费级GPU运行,如树莓派|A(Stanford-Alpaca):::green
    S-->|2022-12,华盛顿大学\nYizhong Wang\ngpt-3模型生成指令+指令回答|A
    LR(LoRA\n低秩适配):::blue -->|减少训练参数\n速度快,内存消耗少\n媲美 Standford Alpaca|AR(Alpaca-LoRA):::green
    L -->|2023-3-21,7b的LLaMA\n斯坦福 Eric J. Wang|AR
    A -->|2023-3-17,贝壳\n7b,bloom,200w中文语料| AB(BELLE):::grass
    A -->|2023-3-26,华中师范\n7b,3k中文保险语料,4h| AL(Luotuo骆驼):::grass
    L -->|2023-3-29,深圳大学\n7b,中文语料| AC(ChatLLaMA):::grass
    LR --> AL
    AR -->|2023-3-23,突破8G GPU 显存限制,直接用CPU运行\n1. LLaMA cpp项目\n2. Alpaca-LoRA权重量化| AC(Alpaca-cpp):::green
</div>


#### 贝壳开源

【2023-3-17】贝壳开源的 7b模型 [BELLE](https://github.com/LianjiaTech/BELLE), [huggingface](https://huggingface.co/jay68/BELLE-7B-0.2M)，限sft, rm、rlhf还没加，size太小调不出来，只能做特定任务，指令泛化理解都搞不定; Stanford方案复现中文版
- [Exploring ChatGPT's Ability to Rank Content: A Preliminary Study on Consistency with Human Preferences](https://arxiv.org/abs/2303.07610)
- ChatGPT's zero-shot ranking capability could be used to reduce annotation pressure in a number of ranking tasks

【2023-3-19】基于LLaMA用翻译语料训练中文Alpaca模型 - [李煜东的文章 - 知乎](https://zhuanlan.zhihu.com/p/614923816)

#### Alpaca-LoRA 本地部署

【2023-3-23】Alpaca-Lora (羊驼-Lora): [轻量级 ChatGPT 的开源实现](https://zhuanlan.zhihu.com/p/615646636)（对标 Standford Alpaca）
- ChatGPT 轻量级的开源版本，它使用 Lora (Low-rank Adaptation) 技术在 Meta 的 LLaMA 7B 模型上微调，只需要训练很小一部分参数就可以获得媲美 Standford Alpaca 模型的效果

斯坦福的研究者 —— Eric J. Wang 使用 `LoRA`（low-rank adaptation）**低秩适配** 技术复现了 Alpaca 的结果。具体来说，Eric J. Wang 使用一块 RTX 4090 显卡，只用 5 个小时就训练了一个和 Alpaca 水平相当的模型，将这类模型对算力的需求降到了消费级。

##### LoRA 低秩适配

![](http://inews.gtimg.com/newsapp_bt/0/15765425454/641)

LoRA 是在原始 PLM 旁边增加一个旁路，做一个降维再升维的操作，来模拟所谓的 intrinsic rank。训练的时候固定 PLM 的参数，只训练降维矩阵 A 与升维矩阵 B。而模型的输入输出维度不变，输出时将 BA 与 PLM 的参数叠加。用随机高斯分布初始化 A，用 0 矩阵初始化 B，保证训练的开始此旁路矩阵依然是 0 矩阵（引自：[loara](https://finisky.github.io/lora/)）。
- Eric J. Wang 发布的 Alpaca-LoRA 项目。[项目地址](https://github.com/tloen/alpaca-lora)
- LoRA 的最大优势是速度更快，使用的内存更少，因此可以在消费级硬件上运行。

##### Alpaca-LoRA 中文版

【2023-3-26】华中师范大学等机构的三位个人开发者开源的中文语言模型`骆驼` (Luotuo)，基于 LLaMA、Stanford Alpaca、Alpaca LoRA、Japanese-Alpaca-LoRA 等完成，**单卡**就能完成训练部署。
- 参考：[训练个中文版ChatGPT没那么难：不用A100，开源Alpaca-LoRA＋RTX 4090就能搞定](https://view.inews.qq.com/a/20230326A02QO500)
- 之所以将模型名字命名为骆驼，是因为 LLaMA（大羊驼）和 alpaca（羊驼）都属于偶蹄目 - 骆驼科。
- 训练中文版 Alpaca LoRa 用了 3K 多条中文问答保险语料，实现过程使用了 LoRa 方法，并微调 Alpaca 7B 模型，耗时 240 分钟，最终 Loss 0.87 。
- [项目地址](https://github.com/LC1332/Chinese-alpaca-lora), 释放了两个模型 luotuo-lora-7b-0.1、luotuo-lora-7b-0.3，还有一个模型在计划中

#### Alpaca-cpp 本地部署

[Alpaca-cpp（羊驼-cpp）: 可以本地运行的 Alpaca 大语言模型](https://zhuanlan.zhihu.com/p/616267309)

从 `Stanford-Alpaca` 到 `Alpaca-Lora`，再到本篇要介绍的 `Alpaca-cpp`，都是为了寻找一种在资源约束下，能本地高效便捷运行大语言模型的方法。
- （1）`Stanford-Alpaca`: 包含数据生成、模型训练等源代码，但微调的LLaMA模型参数还未放出
- （2）`Alpaca-Lora`: 使用 Lora 技术微调出一个对标 Stanford-Alpaca 的模型，开源了 LLaMA+Lora 模型参数。本地CPU运行成功，但速度较慢
- （3）`Alpaca-cpp`: 借助 llama-cpp 提供的强大工具，对 Alpaca-Lora 模型参数量化（int4或int8），本地CPU流畅运行

Alpaca-cpp
- 突破了 8G GPU 显存的限制，能直接使用 CPU 运行，那后续还可以尝试 30B 甚至更大参数的大语言模型
- Alpaca-cpp 是基于 llama-cpp 这个项目，代码基本完全相同，差别在 Alpaca-cpp 对 Alpaca-Lora 的权重进行了量化等预处理，然后用 llama-cpp 提供的功能去加载量化后的权重。

本地电脑 CPU 流畅运行大语言模型 Alpaca/LLaMA 的 C++/C 框架。相关资源如下：
- [alpaca.cpp](https://github.com/antimatter15/alpaca.cpp)
- [ggml-alpaca-7b-q4.bin](https://huggingface.co/Sosaka/Alpaca-native-4bit-ggml/blob/main/ggml-alpaca-7b-q4.bin) 量化后的Alpaca模型， [huggingface地址](https://huggingface.co/Sosaka/Alpaca-native-4bit-ggml/tree/main)
- [llama.cpp](https://github.com/ggerganov/ll) （alpaca.cpp 是 fork 本项目，代码基本一致）

安装方法

```sh
# 下载 alpaca.cpp 项目
git clone https://github.com/antimatter15/alpaca.cpp
# 进入 alpaca.cpp 后，到 https://huggingface.co/Sosaka/Alpaca-native-4bit-ggml/blob/main/ggml-alpaca-7b-q4.bin 下载量化后的模型 ggml-alpaca-7b-q4.bin，然后使用
wget https://huggingface.co/Sosaka/Alpaca-native-4bit-ggml/blob/main/ggml-alpaca-7b-q4.bin
# 编译
make chat
# 运行
./chat
```

#### ChatLLaMA

【2023-3-29】[ChatLLaMA：用指令微调训练中文对话大模型](https://zhuanlan.zhihu.com/p/616748134)

以非中文的预训练模型为基础，使用少量数据和计算量“撬动”模型的语言能力转向中文，以较低的成本实现中文预训练LLM。
- 假设: 用中英文平行语料微调模型，能够对齐模型中英文在高维空间的表示，从而将模型在英文上的强大语言能力迁移到中文。
- 模型及GitHub地址：[Chinese-ChatLLaMA](https://github.com/ydli-ai/Chinese-ChatLLaMA)

基于[TencentPretrain](https://link.zhihu.com/?target=https%3A//github.com/Tencent/TencentPretrain)预训练框架，我们进行了以下实验：
1.  基于LLaMA-7B权重在中文数据上进行无监督增量预训练。使用的数据包含各种[中文百科、社区互动、翻译语料](https://link.zhihu.com/?target=https%3A//github.com/brightmart/nlp_chinese_corpus)和[科学文献](https://link.zhihu.com/?target=https%3A//github.com/ydli-ai/CSL)数据，在32 * A100 40G GPU 上以 2e-4 学习率，3072 batch_size，训练一万步，得到LLaMA-7B-zh。
2.  在中文预训练权重LLaMA-7B-zh上，使用已有的指令数据集的集合进行指令微调，数据集以及预处理代码整理在[Chinese-instruction-dataset](https://link.zhihu.com/?target=https%3A//github.com/ydli-ai/Chinese-instruction-dataset)。学习率为2e-5，训练2000步，最终得到Chat-LLaMA。
 
训练LLaMA的详细方法可以参考[上一篇文章](https://zhuanlan.zhihu.com/p/612752963)，流程如下图所示：
- ![](https://pic3.zhimg.com/80/v2-667a131609b04ef4a1fa8d84e980252e_1440w.webp)



### LAION：Open Assistant

【2023-2-25】[Open Assistant 全流程训练细节（GPT3+RL）](https://zhuanlan.zhihu.com/p/609003237)

[Open Assistant](https://open-assistant.io/) 是 `LAION` 机构开源的，旨在训练一个 **ChatGPT 的小规模替代版本**，就像 `stable diffusion` 相对于 `dalle` 一样，让普通人都可以跑起来，传播力会比较广。
- LAION 机构全称: Large-scale Artificial Intelligence Open Network，是一个非盈利的**机器学习研究机构**，致力于为公众提供 AI 模型、数据集和开源代码。`Stable diffusion` 使用的开源数据就是该机构提供的。

如何在 Open Assistant 上训练一个完整的 ChatGPT
- 代码：[github.com/LAION-AI/Open-Assistant](https://github.com/LAION-AI/Open-Assistant)  Star 16.8k，Fork 1.3k，Issue 308open，535closed，代码更新三天前  
- 文档：[https://projects.laion.ai/Open-Assistant/docs/intro](https://projects.laion.ai/Open-Assistant/docs/intro)  
- 在huggingface上面的模型：[OpenAssistant (OpenAssistant)](https://huggingface.co/OpenAssistant)
- 数据格式介绍：[https://github.com/LAION-AI/Open-Assistant/blob/363a3a124471217e723d57b084122ae1ca41ab2a/notebooks/data-augmentation/stackexchange-builder/README.md](https://github.com/LAION-AI/Open-Assistant/blob/363a3a124471217e723d57b084122ae1ca41ab2a/notebooks/data-augmentation/stackexchange-builder/README.md)
 
ChatGPT 完整训练包括三个流程：
1.  Supervised FineTune（SFT）：使用人工编写的期望模型如何输出的数据集，对GPT-3进行微调
2.  Reward Model（RM）：使用人工标注的排序数据，训练奖励模型，预测人类更喜欢哪个输出
3.  强化学习微调 SFT：使用奖励模型作为强化学习优化目标，微调SFT模型
 
配置环境
 
```sh
git clone https://github.com/LAION-AI/Open-Assistant.git
cd Open-Assistant/model
pip install -r model_training/requirements.txt
pip install -r reward/instructor/requirements.txt
```

把所有的预训练模型和数据都放在 Open-Assistant/model/.cache 目录下，设置一个全局变量 DATA_DIR
 
```sh
# 还是在 Open-Assistant/model 目录下
mkdir -p .cache 
mkdir -p .saved_models
export DATA_PATH=$PWD/.cache # 设置数据目录
export MODEL_PATH=$PWD/.saved_models # 设置模型目录
```


#### 第一步：训练 SFT
 
第一步是用更接近用户使用情况的数据来 finetune 已经 pretrain 好的 gpt-3 模型，论文中写这样子第一步的 finetune 过拟合一点，对于后面的强化学习训练有帮助。
- `SFT`是 Supervised FineTune，那么用什么数据进行监督呢？这一步使用的数据具体可以参考：[https://github.com/LAION-AI/Open-Assistant/blob/main/model/model_training/configs/config.yaml](https://github.com/LAION-AI/Open-Assistant/blob/main/model/model_training/configs/config.yaml)，包括如下数据
 
```yaml
datasets:
    - webgpt
    - squad_v2
    - adversarial_qa
    - trivia\_qa\_nocontext
    - xsum
    - cnn_dailymail
    - prompt_dialogue # TODO: need to fix the url 这个数据目前无法自动下载
    - multi_news
    - scitldr
    - soda
    - joke
    - gsm8k
    - dive_mt
    - wmt2019_zh-en
    - wmt2019_ru-en
    - wmt2019_de-en
    - ted\_trans\_nl-en
    - ted\_trans\_de-ja
    - instruct_tuning
    - wmt2019_de-en
    - samsum
    - soda_dialogue
```
 
Open Assistant 里面的 OA Private（jsonl格式）数据没有说的很清楚，不知道在哪里下载，所以我们尽量跳过这个数据，用其他的数据进行训练。
 
怎么跳过 OA Private 数据，使用其他数据训练呢？
 
首先先进入 model_training 目录
 
```sh
cd Open-Assistant/model/model_training
```
 
训练 SFT
 
```sh
python trainer_sft.py --configs defaults galactica-125m --cache_dir $DATA_PATH --output_dir $MODEL_PATH/sft_model
```
 
上面 --config 后面的参数代表需要载入的 config 项目，例如上面的 galactica-125m 是 configs/config.yaml 里面的关于模型的指定，具体内容如下面所示：
 
```sh
galactica-125m:
  learning_rate: 5e-5
  model_name: facebook/galactica-125m
  weight_decay: 0.01
  warmup_steps: 600
  gradient_checkpointing: false
  gradient_accumulation_steps: 2
  per_device_train_batch_size: 4
  per_device_eval_batch_size: 4
```

 
#### 第二步：训练 RM
 
第二步骤是训练一个 Reward Model，训练数据是给定 Prompt 后，对 SFT 生成的各个 Response 的打分数据。
 
例如数据长这样：

> Prompt: Hello  
> Response1: Hi --> 打分 5  
> Response2: Go away --> 打分 1  
> Response3: I am blulululuu --> 打分 2
 
那么把（Prompt，Response）组织成一条数据送入模型，相同的 Prompt 作为同一个 batch
 
> 数据1：(Hello, Hi) --> 模型输出打分假设为 A  
> 数据2：(Hello, Go away) --> 模型输出打分假设为 B  
> 数据3：(Hello, I am blulululuu) --> 模型输出打分假设为 C
 
最后我们训练的 Loss 就是将上面的数据两两组合，然后希望高分和低分的差距越大越好，例如 A-B 越大越好，A-C 越大越好，B-C越大越好。这里有点类似人脸识别里面的度量学习的负例，希望不同的人的人脸差距越大越好，只是这里多了一个符号，需要关注大小问题。
 
通过这样一通训练，我们的 Reward Model 就能学会给好的回答打更高的分，给坏的回答打更低的分啦。
 
具体训练通过如下命令达到：
 
```sh
cd ../reward/instructor
python trainer.py configs/deberta-v3-base.yml --output_dir $MODEL_PATH/reward_model
```
 
 
#### 第三步：训练 RL 模型
 
强化学习中我们使用 Actor-Critic 算法进行训练，其原理就是有两个模型，Actor 模型和 Critic 模型，Actor 模型用来做文本生成的行为，Critric 用来评价 Actor 行为的好坏。如果 Critic 给的分是高分，那么 Actor 就增加当前行为轨迹的出现概率，反之如果 Critic 给的分是低分，那么 Actor 就减小当前行为轨迹的出现概率。
 
这里前两步训练的模型分别作为 RL 训练中的 Actor 和 Critic：
*   Actor：第一步训练的 SFT，针对用户语料的文本生成模型 
*   Critic：利用了第二步训练的 Reward Model，来评价 SFT 生成的 Response 的好坏
 
OK，搞懂原理了，我们来设置一下两个模型的路径：
 
```sh
# choose a specific sft checkpoint
export SFT_MODEL=$MODEL_PATH/sft_model/<checkpoint-X>
# choose a specific reward model checkpoint
export REWARD_MODEL=$MODEL_PATH/reward_model/<checkpoint-X>
```
 
训练 RL
 
```sh
cd ../../model_training
python trainer_rl.py --configs defaults_rlhf --cache_dir $DATA_PATH --rank_model $REWARD_MODEL --sft_model $SFT_MODEL --output_dir $MODEL_PATH/rl_model
```

经过上面三步整个训练流程就完全搞定啦！


### OpenChatKit

【2023-3-10】[ChatGPT开源替代来了！参数量200亿，在4300万条指令上微调而成](https://www.toutiao.com/article/7209917291104862731)，[Announcing OpenChatKit](https://www.together.xyz/blog/openchatkit)

[OpenChatKit](https://github.com/togethercomputer/OpenChatKit) 是一个类 ChatGPT 开源工具包，内含一个 20B 参数量的大模型，而且该模型在 **4300万**条指令上进行了微调。
- EleutherAI 开源 AI 研究团队一直在贡献开源大模型成果。
- 2020 年 7 月成立以来，该团队先后开源了基于 GPT-3 的、包含 60 亿参数的 NLP 模型 `GPT-J`，类 GPT 的27 亿参数模型 `GPT-Neo`，以及 200 亿参数的`GPT-NeoX-20B`。最终目标是将开源模型的参数规模扩展到 1700 亿左右，就像 GPT-3 一样。
- Together 组织基于 EleutherAI 开源的 GPT-Neo 和 GPT-J 构建了一个新的类 ChatGPT 开源项目 —— `OpenChatKit` 。

[OpenChatKit](https://github.com/togethercomputer/OpenChatKit) 
- 参数量达 20B 的开源模型，该模型基于 EleutherAI 的 GPT-NeoX-20B，在 4300 万条指令上进行了微调；
- 参数量达 60 亿的**审核模型**（moderation model），可以帮模型过滤不当内容；
- 可扩展的检索系统，可以帮模型检索维基百科等资源库，从而给出最新信息。
- 重点放在几个任务上，如多轮对话、问答、分类、提取和总结。他们用 4300 万条高质量指令对模型进行了微调，并与 LAION 和 Ontocord 合作，创建了该模型所基于的 [OIG-43M 数据集](https://laion.ai/blog/oig-dataset)。

OpenChatKit 有几个任务开箱即用：
- 1、将一份长的文件总结成一句话，并回答与该文件相关的问题，问答可进行多轮；
- 2、从非结构化文件中提取结构化信息，如下图所示；
- 3、将一个句子或段落分为不同的类别（比如情绪是积极还是消极）。

OpenChatKit 短板：
- 基于知识的封闭式问答。该聊天机器人可能会给出不正确的结果，需要用户提供反馈；
- 代码相关任务。由于训练数据中没有足够多的代码，因此该聊天机器人在代码方面表现欠佳；
- 重复性。该聊天机器人有时会重复自己的回答，用户可以点击刷新，开始新的对话；
- 上下文切换。该聊天机器人不太擅长转换话题。
- 创意写作和较长的答案。该聊天机器人不会生成长的、有创意的文本，如论文或故事。

huggingface 
- [测试链接](https://huggingface.co/spaces/togethercomputer/OpenChatKit)
- [GPT-NeoXT-Chat-Base-20B](https://huggingface.co/togethercomputer/GPT-NeoXT-Chat-Base-20B)


### ChatGLM 清华

[ChatGLM](https://chatglm.cn/)：开源双语对话语言模型

【2023-3-14】ChatGLM-6B 是一个开源的、支持中英双语的对话语言模型，基于 General Language Model (GLM) 架构，具有 62 亿参数。
- 结合模型量化技术，用户可以在消费级显卡上进行**本地部署**（INT4 量化级别下最低只需 6GB 显存）。 
- ChatGLM-6B 使用了和 ChatGPT 相似的技术，针对中文问答和对话进行了优化。经过约 1T 标识符的中英双语训练，辅以监督微调、反馈自助、人类反馈强化学习等技术的加持，62 亿参数的 ChatGLM-6B 已经能生成相当符合人类偏好的回答

ChatGLM 当前版本模型的能力提升主要来源于独特的千亿基座模型 `GLM-130B`。它不同于 BERT、GPT-3 以及 T5 的架构，是一个包含**多目标函数**的自回归预训练模型。

2022 年 8 月，`清华大学`联合`智谱AI` 向研究界和工业界开放了拥有 1300 亿参数的中英双语稠密模型 `GLM-130B`，该模型有一些独特的优势：
- 双语：同时支持中文和英文；
- 高精度（英文）：在公开的英文自然语言榜单 LAMBADA、MMLU 和 Big-bench-lite 上优于 GPT-3 175B（API: davinci，基座模型）、OPT-175B 和 BLOOM-176B；
- 高精度（中文）：在 7 个零样本 CLUE 数据集和 5 个零样本 FewCLUE 数据集上明显优于 ERNIE TITAN 3.0 260B 和 YUAN 1.0-245B；
- 快速推理：首个实现 INT4 量化的千亿模型，支持用一台 4 卡 3090 或 8 卡 2080Ti 服务器进行快速且基本无损推理；
- 可复现性：所有结果（超过 30 个任务）均可通过我们的开源代码和模型参数复现；
- 跨平台：支持在国产的海光 DCU、华为昇腾 910 和申威处理器及美国的英伟达芯片上进行训练与推理。

2022年11月，斯坦福大学大模型中心对全球30个主流大模型进行了全方位的评测，GLM-130B是亚洲**唯一**入选的大模型。在与OpenAI、Google Brain、微软、英伟达、Meta AI的各大模型对比中，评测报告显示GLM-130B在准确性和公平性指标上与GPT-3 175B（davinci）接近或持平，鲁棒性、校准误差和无偏性优于GPT-3 175B。

如今， 参考 ChatGPT 的设计思路， `ChatGLM` 在千亿基座模型 GLM-130B 中注入了代码预训练，通过`有监督微调`（Supervised Fine-Tuning）等技术实现人类意图对齐。

`ChatGLM-6B` 是一个开源的、支持中英双语问答的对话语言模型，并针对中文进行了优化。该模型基于 General Language Model (`GLM`) 架构，具有 62 亿参数。结合模型量化技术，用户可以在消费级的显卡上进行本地部署（INT4 量化级别下最低只需 6GB 显存）。
- `ChatGLM-6B` 使用了和 `ChatGLM` 相同的技术，针对中文问答和对话进行了优化。经过约 1T 标识符的中英双语训练，辅以`监督微调`、`反馈自助`、`人类反馈强化学习`等技术的加持，62 亿参数的 `ChatGLM-6B` 虽然规模不及千亿模型，但大大降低了推理成本，提升了效率，并且已经能生成相当符合人类偏好的回答。
- [模型开源地址](https://github.com/THUDM/ChatGLM-6B), [huggingface](https://huggingface.co/THUDM/chatglm-6b/tree/main)
- finetune代码：[ChatGLM-Tuning](https://github.com/mymusise/ChatGLM-Tuning)
- 【2023-3-17】issue: [Cannot import name 'convert_file_size_to_int' from 'transformers.utils.hub'](https://github.com/THUDM/ChatGLM-6B/issues/123)


ChatGLM-6B 具备以下特点：
- 充分的中英双语预训练：ChatGLM-6B 在 1:1 比例的中英语料上训练了 1T 的 token 量，兼具双语能力。
- 优化的模型架构和大小：吸取 GLM-130B 训练经验，修正了二维 RoPE 位置编码实现，使用传统 FFN 结构。6B（62 亿）的参数大小，也使得研究者和个人开发者自己微调和部署 ChatGLM-6B 成为可能。
- 较低的部署门槛：FP16 半精度下，ChatGLM-6B 需要至少 **13 GB** 的显存进行推理，结合模型量化技术，这一需求可以进一步降低到 **10GB**（INT8） 和 **6GB**（INT4），使得 ChatGLM-6B 可以部署在消费级显卡上。
- 更长的序列长度：相比 GLM-10B（序列长度 1024），ChatGLM-6B 序列长度达 **2048**，支持更长对话和应用。
- 人类意图对齐训练：使用了`监督微调`（Supervised Fine-Tuning）、`反馈自助`（Feedback Bootstrap）、`人类反馈强化学习`（Reinforcement Learning from Human Feedback）等方式，使模型初具理解人类指令意图的能力。输出格式为 markdown，方便展示。

不过由于 ChatGLM-6B 模型的容量较小，不可避免的存在一些局限和不足，目前已知其具有相当多的局限性，如： 事实性/数学逻辑错误，可能生成有害/有偏见内容，较弱的上下文能力，自我认知混乱，以及对英文指示生成与中文指示完全矛盾的内容。

包括：
- 相对**较弱**的模型记忆和语言能力。在面对许多事实性知识任务时，`ChatGLM-6B` 可能会生成不正确的信息，也不太擅长逻辑类问题（如数学、编程）的解答。
- 可能会产生有害说明或有偏见的内容：`ChatGLM-6B` 只是一个初步与人类意图对齐的语言模型，可能会生成有害、有偏见的内容。
- 较弱的**多轮**对话能力：ChatGLM-6B 的上下文理解能力还不够充分，在面对长答案生成和多轮对话的场景时，可能会出现上下文丢失和理解错误的情况。
- 参考：[清华系千亿基座对话模型ChatGLM启动内测，开源单卡版模型](https://www.jiqizhixin.com/articles/2023-03-15-3)
- ![](https://image.jiqizhixin.com/uploads/editor/f1e9f5c9-25eb-46fa-80da-aa38e9658cbc/640.png)

```py
from transformers import AutoTokenizer, AutoModel
tokenizer = AutoTokenizer.from_pretrained("THUDM/chatglm-6b", trust_remote_code=True)
model = AutoModel.from_pretrained("THUDM/chatglm-6b", trust_remote_code=True).half().cuda()
response, history = model.chat(tokenizer, "你好", history=[])
print(response)
# 你好👋!我是人工智能助手 ChatGLM-6B,很高兴见到你,欢迎问我任何问题。
response, history = model.chat(tokenizer, "晚上睡不着应该怎么办", history=history)
print(response)
```

### 文心一言

【2023-3-16】百度正式发布[文心一言](https://yiyan.baidu.com/)，现场demo视频展示。[资讯](https://www.ithome.com/0/680/102.htm)
- 文心一言大模型的训练数据包括万亿级网页数据、数十亿的搜索数据和图片数据、百亿级的语音日均调用数据，以及 5500 亿事实的知识图谱等。
- 文心一言是新一代知识增强大语言模型，是在 ERNIE 及 PLATO 系列模型的基础上研发的。关键技术包括有监督精调、人类反馈的强化学习、提示、知识增强、检索增强和对话增强。前三项是这类大语言模型都会采用的技术，ERNIE 和 PLATO 中也已经有应用和积累，在文心一言中又有了进一步强化和打磨；后三项则是百度已有技术优势的再创新。

李彦宏展示了文心一言在五个使用场景的表现，包括文学创作、商业文案创作、数理推算、中文理解和多模态生成
- **文学创作**场景中，文心一言根据对话问题将知名科幻小说《三体》的核心内容进行了总结，并提出了五个续写《三体》的建议角度，体现出对话问答、总结分析、内容创作生成的综合能力。
- **商业文案创作**场景中，文心一言顺利完成了给公司起名、写 Slogan、写新闻稿的创作任务。
- 文心一言还具备一定的思维能力，能够学会**数学推演**及**逻辑推理**等相对复杂任务。面对“鸡兔同笼”这类锻炼人类逻辑思维的经典题，文心一言能理解题意，并有正确的解题思路，进而像学生做题一样，按步骤算出正确答案。
- 中文理解
  - 文心一言正确解释了成语“洛阳纸贵”的含义、“洛阳纸贵”对应的经济学理论，还用“洛阳纸贵”四个字创作了一首藏头诗。
- **多模态**生成方面，文心一言生成文本、图片、音频和视频的能力。
  - 语音，会说四川话、东北话、广东话和台湾话。文心一言甚至能够生成**四川话**等方言语音；
  - 图像，调用文心一格能力
  - 视频，文心一言的视频生成能力则因成本较高，现阶段还未对所有用户开放，未来会逐步接入。

【2023-3-23】爆出百度文心一格疑似中文翻译英文，再调用开源画图（stable diffusion），[详见](https://m.weibo.cn/status/MyvXJ5EGb?jumpfrom=weibocom)
- 画“鼠标和总线”，会画出来“老鼠和公共汽车”，因为“鼠标”和“总线”的英文是“mouse”和“bus”
- 画“起重机”，它会莫名其妙地画出一个鹤的头，因为“起重机”的英文是“crane”，这个单词更常用的意思就是“鹤”。
- 如果关键词不加“中国”，那么画出来的都是白种人，连国旗都是星条旗，等等，不一而足。
- “一可以豆子”，这在汉语里根本不是人话，但如果机翻成英语，“one can bean”，它就轻松地画出“一罐头豆子”。
- “牛肉可以”，“满冰箱可以”。
- 英语里面只有常用肉有专门的词汇，罕见肉没有英语词汇
- 画“羊肉和驴肉”，它只会画出羊肉，而驴肉只能画出一头驴，同时，因为它不理解这个句子，还让驴长了羊毛。
- “土耳其张开翅膀”，画了个火鸡
- “水瓜”当然要画个西瓜
- “牛奶路”画了个“银河”。
- “云中的平面”，结果画了个飞机，这是因为“云中的平面”机翻之后是“plane in cloud”，那个英语的人工智能当然会画个飞机。
- “金色摔倒”，不出意外的话，机翻成了“golden fall”，也就是“金色的秋天”。
- “中国论文”，它画了一幅山水画，为啥？因为论文是“paper”，但“chinese paper”是宣纸，所以它画了一幅水墨画象征宣纸。作为佐证。
- 真正输入“中国纸”画出来的结果。
-n“法国粉笔”，它画了个法国人的“炭笔素描”（chalk）。
- 树叶封面苹果，“封面”就是“cover”，“cover”就是“覆盖”，很明白吧？
- 画菜名，什么鱼香肉丝、松鼠鳜鱼、红烧狮子头，画出来的莫名其妙的东西，并不是人工智能天真可爱，而是汉译英的功夫不到家，难为了羊皮里的外国程序。

解释
- 目前开源的图文数据大部分是英文的，可以参考laion这个开源数据库，所以目前的diffusion model基本都是英文驱动，这也导致了你说的怪异现象；当然我们期待同等规模的中文开源数据库的出现；stable diffusion是一种网络结构，开发者完全可以使用laion数据集和sd结构训练一个自己的网络，无需要套皮

#### 文心一言评测

- 2023-3-17 22:30 拿到内测码

评测
- 对话能力
- 多模态能力：图片、视频

内测总结，[参考](https://www.zhihu.com/question/589955024)
- (1) 模型信息：
  - 基于transformer，使用海量数据训练而来，细节未知，跟GPT-4一样神神秘秘
- (2) 工程性能
  - 输入长度最大1024个字
  - 输出支持文本、表格、代码、图片、语音
  - 响应速度跟GPT-3.5 Turbo类似，比GPT-4快很多
- (3) 内容质量
  - 知识丰富，集成了中文知识图谱，对时兴的电视剧（狂飙）、小说了如指掌。
  - 语料质量不高，泛娱乐化，严谨科学的预料相对较少
  - 不联网，训练数据截止约2022年底，无法获取当前时间信息 —— 不同于NewBing
  - 但具备近实时纠偏能力，怀疑收到用户负反馈后，有语料纠偏机制，大概间隔几小时。
- (4) 对话能力
  - 基础能力：具备NER（命名实体识别）、指代、纠错等浅层语义，未出错
  - 连贯性：未发现
  - 逻辑性
  - 一致性
  - 记忆力：具备上文感知能力，但不太稳定，chatgpt也是
  - 风格化：具备角色模拟能力，用法不如chatgpt多、灵活（假设你是***）
- (5) 自我意识
  - 承认无知：用户否认时，当场认怂，但再次询问时，依然坚持自己的立场，没被用户带偏。
  - 敢于质疑：用户表述偏差时，敢于质疑，并给出一系列依据。
- (6) 专业能力
  - 自动摘要：提取题目、总结要点
  - 机器翻译：多语言翻译
  - 写代码：支持，颜色显示，代码可执行，但有时结果不对；
    - 不具备chatgpt里一键复制按钮
    - 代码质量不如chatgpt，毕竟人家背后有GitHub大规模代码做后盾。
  - 文案创作：表现还不错，当然跟chatgpt一样，有时不能满足字数要求
  - 数学题：看题目难度，解答有的对，有的错，展示形式上较好（公式），质量上同chatgpt
  - 作诗：擅长藏头诗、文学创作，中文理解能力较好
  - 自然语言格式化：文本转表格（markdown）、json（有些质量问题）
- (7) 多模态能力：支持文本、表格、图片、语音
  - 语音播放：仅支持广东话、四川话、东北话、闽南语，不支持其他，如普通话、英语
  - 画画（文生图）：调用文心一格，文生图质量不错，优于普通版stable diffusion
    - 不具备图像理解能力，VisualQA不行，当然也不能根据语义修改图像（微软Visual GPT）
  - 还不能做视频
- (8) 道德准则
  - 违规违法约束：较好，拒绝回答非法问题（抢银行、炸弹制作等）
  - 负面情绪干预：能识别用户负面情绪，并适当引导

#### 文心一言理性思维能力

【2023-3-18】[文心一言的理性思维能力距离 GPT-4 差多少？我们第一时间测试了一下](https://mp.weixin.qq.com/s/94UAkQyL48DD5J_zku6MOg)

认知科学家评定人类理性思维的四类经典测试任务：
- 语义错觉类任务；
- 认知反射类任务；
- 证伪选择类任务；
- 心智程序类任务。

四类任务总计 26 道题目。

在测试之前，已经预估文心一言的表现会不如 GPT-4，但最终实际测试结果还是令人大跌眼镜，可能与百度开发团队的认知有关系。
- 26 道题目，GPT-3.5 答对 15 道；GPT-4 答对 23 道；文心一言答对 2 道。
- 大约在 40%-60%左右的正确率，如果略微高估，前三类任务 17 道题总计估算为答对 10 道题，加上第四类任务，人类大约答对 6 道。最终将人类的正确率估算为 26 道题目，答对 16 道。正确率大约为 62%。
- `62%`，这也许就是觉得一个大语言模型像是一个真正的人一样的`临界值`。
- GPT-3.5 接近这个数值，所以人们被它大大地震惊住了。而 GPT-4 远远超越了这个值。
- 而百度的文心一言，只有 8%。路漫漫其修远矣。

在中文自然语言处理领域，百度提供的 NLP 开源项目是数量最多的、维护最勤奋的、质量最好的。包括带队研发的写匠项目，调用的也是百度 NLP 团队开发的分词开源包。

但是，文心一言表现这样，无法简简单单地用研发时间不足来解释、产品是第一版上线来敷衍。这类话可能是拿来敷衍李老板可以，但是敷衍全球同行是非常危险的。

怀疑百度该项目的研发团队，极可能走错路线了。以百度的技术实力，表现不至于这样。极可能是团队领导者定错目标了：拿到尽可能多的知识单元。

所以，新品发布会上，从 CEO 到 CTO，两位专家，还在拿百度拥有全球最大的中文知识单元说事。

但是这压根不是 GPT-4 令人震惊的原因
- GPT-4 这类产品真正令人震惊的是，从 GPT-3.5 开始，它真的像一个人类了。这才是形成全球性碾压式传播的根本。
- 如何让 GPT-3.5 更像是一个人类，能够更快地自我学习、自我纠错。

中文知识单元的数量，在这个事情上毫无意义啊。

要教会一个三岁的小朋友尽快学会说话，两个重要任务：
- 1）`生命`：让她尽快明白语义、语音之间的各类规则以及如何用语义、语音表达一个物理世界。
- 2）`生态`：想方设法给她在家里创造一个有助于孩子学说话的生态。比如，雇佣阿姨带小美妞的时候，第一考虑就是这阿姨爱不爱说话，外不外向。显然，一个喜欢说话、外向的阿姨，更容易带动小美妞说话。

结果，百度该项目团队的做法好比是，直接给一个三岁的小朋友扔了一千万吨词典，你背着词典走路吧。生命何在？生态何在？

如果始终沿着这条技术路线走下去，怀疑在 OpenAI 团队开源之前，不可能产生一个近似于数字生命的产品。而 OpenAI 团队是将大语言模型当作真正的生命来对待，从构建一个数字生命的基本机制开始设计，一切工作都是围绕两个基本出发点：
- 1）生命：尽量促进“智能”的自发涌现；
- 2）生态：尽量设计一个促进有助“智能”诞生并发育的生态。

在早期，这个数字生命很幼稚，但过了千亿参数级别之后，很多早期打好的良好基础，就会带来极其多的“智能”涌现。好比小朋友从三岁学说话，长大之后，流利使用语言完成诸多大事。

不能在还没有涌现“智能”之前，就急匆匆地去卖应用、搞数据对接。那压根与 GPT-4 不是一类产品啊。

我们要的是一个数字生命，以及这个新兴的数字生命与生态带来的新世界；还是又多了一个更方便地查询知识单元的工具。

### ChatRWKV

【2023-3-13】[开源1.5/3/7B中文小说模型：显存3G就能跑7B模型，几行代码即可调用](https://zhuanlan.zhihu.com/p/609154637)
- 1.5/3/7B中文小说模型，可以开源下载
- 纯 RNN 实现

[ChatRWKV](https://github.com/BlinkDL/ChatRWKV) is like ChatGPT but powered by RWKV (100% RNN) language model, and open source.
- [RWKV-CHN](https://modelscope.cn/studios/BlinkDL/RWKV-CHN/summary) 在线体验

### trl

[Ivwerra/trl](https://github.com/lvwerra/trl)，[文档](https://huggingface.co/docs/trl/index) 

PPO精调LLM的三个步骤:
- ![流程图](https://camo.githubusercontent.com/85d00cf9bca67e33c2d1270b51ff1ac01853b26a8d6bb226b711f859d065b4a6/68747470733a2f2f68756767696e67666163652e636f2f64617461736574732f74726c2d696e7465726e616c2d74657374696e672f6578616d706c652d696d616765732f7265736f6c76652f6d61696e2f696d616765732f74726c5f6f766572766965772e706e67)
1. 用 codeparrot 数据训练 GPT-2 124.2M 模型
2. 用sentiment训练奖励模型，模型用的是distilbert
3. RL训练 

### FlexGen 加速

【2023-2-22】[跑ChatGPT体量模型，从此只需一块GPU：加速百倍的方法来了](https://zhuanlan.zhihu.com/p/608513900)

来自斯坦福大学、UC Berkeley、苏黎世联邦理工学院、Yandex、莫斯科国立高等经济学院、Meta、卡耐基梅隆大学等机构的新研究提出了 [FlexGen](https://github.com/FMInference/FlexGen)，这是一种用于运行有限 GPU 内存的 LLM 的高吞吐量生成引擎。

通过聚合来自 GPU、CPU 和磁盘的内存和计算，FlexGen 可以在各种硬件资源限制下灵活配置。通过线性规划优化器，它搜索存储和访问张量的最佳模式，包括权重、激活和注意力键 / 值（KV）缓存。FlexGen 将权重和 KV 缓存进一步压缩到 4 位，精度损失低到可以忽略不计。与最先进的 offloading 系统相比，FlexGen 在单个 16GB GPU 上运行 OPT-175B 的速度提高了 100 倍，并首次实现了 1 token/s 的实际生成吞吐量。如果提供了更多的分布式 GPU，FlexGen 还带有流水线并行 runtime，以允许在解码时进行超线性扩展

大模型训练需要极高的计算和内存要求。
- 例如，GPT-175B（GPT-3）仅用于存储模型权重就需要 325GB 的内存。要让此模型进行推理，至少需要五块英伟达 A100（80GB）和复杂的并行策略。

降低 LLM 推理资源需求的方法是最近人们经常讨论的内容。这些努力分为三个方向：
- （1）**模型压缩**以减少总内存占用量；
- （2）**协同推理**，通过去中心化分摊成本；
- （3）**Offloading** 以利用 CPU 和磁盘的内存。
- ![img](https://pic3.zhimg.com/80/v2-f1503265810382035d8d888a38b25cb6_1440w.webp)

### 写作猫

【2023-2-27】[写作猫](https://xiezuocat.com/chat)公测，提供小程序

对话写作猫上线公测。
- 秘塔自研LLM大模型【并非调用OpenAI API】
- 从零开始处理数据/训练【并非借助开源模型】
- 已经具备了数百种技能【数不胜数】
- 训练花费不足1亿美金【远远不足】
- 现在可用【并非内测】

上海秘塔网络科技有限公司成立于2018年4月，是人工智能领域的一家新锐科技公司，致力于将重复脑力劳动AI化，以AI为杠杆撬动专业场景的百倍生产力提升。



# 结束

