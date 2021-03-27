---
layout: post
title:  Transformer知识点汇总
date:   2019-12-10 16:52:00
categories: 深度学习 
tags: 深度学习 NLP Transformer BERT GPT Attention BeamSearch Seq2seq
excerpt: Attention is all you need!
mathjax: true
---

* content
{:toc}

# Transformer学习笔记


- [The Annotated Transformer](http://nlp.seas.harvard.edu/2018/04/03/attention.html),Harvard NLP出品，含pytorch版代码实现
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- [Transformer模型的PyTorch实现](https://luozhouyang.github.io/transformer/),[A PyTorch implementation of the Transformer model in "Attention is All You Need"](https://github.com/jadore801120/attention-is-all-you-need-pytorch)
- 【2021-1-21】[The Transformer Family](https://lilianweng.github.io/lil-log/2020/04/07/the-transformer-family.html)
  - ![](https://lilianweng.github.io/lil-log/assets/images/transformer.png)

## 总结

- 针对rnn和cnn的缺陷，怎么解决这些问题呢？
   - 并行化
   - 提升长程依赖的学习能力
   - 层次化建模

## Seq2seq结构

### Seq2Seq 模型

参考：[Seq2Seq 模型详解](https://www.jianshu.com/p/80436483b13b)

- Seq2Seq 是一种RNN模型，使用的是 **Encoder-Decoder**结构，可以理解为一种 N * M 的模型
  - 即 **Encoder** 长度可以为N，**Decoder** 长度可以为M。多对多的序列结构
  - **Encoder** 用于编码序列的信息，将任意长度的序列信息编码到一个向量 **c** 里。
  - 而 **Decoder** 是解码器，解码器得到上下文信息向量 **c** 之后可以将信息解码，并输出为序列。

### 常见的 Seq2Seq 结构

Seq2Seq的模型结构也有很多种，常见的有下面几种，**Encoder**都相同，区别主要在于**Decoder**

#### 第一种Seq2Seq

Encoder & Decoder：

![img](https://gitee.com/summerrat/images/raw/master/img/20030902-f3b85bfbaae7d8b1.png)

单看 Decoder：

![img](https://gitee.com/summerrat/images/raw/master/img/20030902-6f461e520d31cb27.png)

这种**Decoder**比较简单：

- 将上下文向量 **c** 当成是 RNN 的初始隐藏状态输入到 RNN 中
- 后续只接受上一个神经元的隐藏层状态 **h'** 而不接收其他的输入 **x**


#### 第二种Seq2Seq

Encoder & Decoder：

![img](https://gitee.com/summerrat/images/raw/master/img/20030902-479f2b802293c8c5.png)

单看 Decoder：

![img](https://gitee.com/summerrat/images/raw/master/img/20030902-177f158afe2216bf.png)

-  Decoder 结构有了自己的初始隐藏层状态 **h'0**
-  不再把上下文向量 **c** 当成是 RNN 的初始隐藏状态，而是当成 RNN 每一个神经元的输入

#### 第三种Seq2Seq

Encoder & Decoder：

![img](https://gitee.com/summerrat/images/raw/master/img/20030902-98c17bbce81a14ba.png)

单看Decoder：

![img](https://gitee.com/summerrat/images/raw/master/img/20030902-840078e115f43250.png)

- Decoder 结构和第二种类似，但是在输入的部分多了上一个神经元的输出 **y'**。
- 即每一个神经元的输入包括：上一个神经元的隐藏层向量 **h'**，上一个神经元的输出 **y'**，当前的输入 **c** (Encoder 编码的上下文向量)。
- 对于第一个神经元的输入 **y'**0，通常是句子起始标志位的 embedding 向量。

### Seq2Seq的优化技巧

#### 1、Teacher Forcing

Teacher Forcing 用于训练阶段，预测过程是都是一样的。

训练时：如果不使用 Teacher Forcing，输入包括了上一个神经元的输出 **y'**。如果上一个神经元的输出是错误的，则下一个神经元的输出也很容易错误，导致错误会一直传递下去。

![img](https://gitee.com/summerrat/images/raw/master/img/20030902-a7cf394b2d40a052.png)

使用 Teacher Forcing，神经元直接使用正确的输出作为当前神经元的输入。

![img](https://gitee.com/summerrat/images/raw/master/img/20030902-1ed6e410da784c5e.png)

#### 2、Attention

- 上面的Seq2Seq 模型中，**Encoder** 总是将源句子的所有信息编码到一个固定长度的上下文向量 **c** 中，然后在 **Decoder** 解码的过程中向量 **c** 都是不变的。这存在着不少缺陷：
  - 对于比较长的句子，很难用一个定长的向量 **c** 完全表示其意义。
  - RNN 存在长序列梯度消失的问题，只使用最后一个神经元得到的向量 **c** 效果不理想。
  - 人在阅读文章的时候，会把注意力放在当前的句子上，这种结构没有利用这点。
- 引入attention 机制，就是一种将模型的注意力放在当前翻译单词上的一种机制。
  - 例如翻译 "I have a cat"，翻译到 "我" 时，要将注意力放在源句子的 "I" 上，翻译到 "猫" 时要将注意力放在源句子的 "cat" 上。

使用了 Attention 后：

- **Decoder** 的输入就不是固定的上下文向量 **c** 了
- 而是会根据当前翻译的信息，计算当前的 **c**

![img](https://gitee.com/summerrat/images/raw/master/img/20030902-3caa6122e9b613c5.png)

- Attention 需要保留 Encoder 每一个神经元的隐藏层向量 **h**
- 然后 Decoder 的第 t 个神经元要根据上一个神经元的隐藏层向量 **h'**t-1 计算出当前状态与 Encoder 每一个神经元的相关性 **e**t
- **e**t 是一个 N 维的向量 (Encoder 神经元个数为 N)，若 **e**t 的第 i 维越大，则说明当前节点与 Encoder 第 i 个神经元的相关性越大。**e**t 的计算方法有很多种，即相关性系数的计算函数 a 有很多种：
  - ![img](https://gitee.com/summerrat/images/raw/master/img/20030902-d6ef2d1879205693.png)
- 上面得到相关性向量 **e**t 后，需要进行归一化，使用 softmax 归一化。然后用归一化后的系数融合 Encoder 的多个隐藏层向量得到 Decoder 当前神经元的上下文向量 **c**t：
  - ![img](https://gitee.com/summerrat/images/raw/master/img/20030902-0b435754763ef850.png)

#### 3、beam search

- beam search 方法不用于训练的过程，而是用在测试的。训练的时候因为知道正确答案，不需要再进行搜索。
  - 在每一个神经元中，我们都选取当前输出概率值最大的 **top k** 个输出传递到下一个神经元。
  - 下一个神经元分别用这 k 个输出，计算出 L 个单词的概率 (L 为词汇表大小)，然后在 kL 个结果中得到 **top k** 个最大的输出，重复这一步骤。后面会不断重复这个过程，直到遇到结束符或者达到最大长度为止。最终输出得分最高的2个序列。
- 例如
  - 预测的时候，假设词表大小为3，内容为a，b，c。beam size是2，decoder解码的时候：
    - 1： 生成第1个词的时候，选择概率最大的2个词，假设为a,c,那么当前的2个序列就是a和c。
    - 2：生成第2个词的时候，我们将当前序列a和c，分别与词表中的所有词进行组合，得到新的6个序列aa ab ac ca cb cc，计算每个序列的得分并选择得分最高2个序列，作为新的当前序列，假如为aa cb。
    - 3：后面会不断重复这个过程，直到遇到结束符或者达到最大长度为止。最终输出得分最高的2个序列。


## RNN系列

- **机器翻译**是从RNN开始跨入神经网络机器翻译时代的，几个比较重要的阶段分别是: **Simple RNN**, **Contextualize RNN**, **Contextualized RNN with attention**, **Transformer**(2017)

### Simple RNN

- encoder-decoder模型结构中，encoder将整个源端序列(不论长度)压缩成一个向量(encoder output)，源端信息和decoder之间唯一的联系只是: encoder output会作为decoder的initial states的输入。这样带来一个显而易见的问题就是，随着decoder长度的增加，encoder output的信息会衰减。

![](https://pic3.zhimg.com/80/v2-b27fc5ee5d17d7954dc0c2b211482165_720w.jpg)

这种模型有2个主要的问题:
- 源端序列不论长短，都被统一压缩成一个**固定维度**的向量，并且显而易见的是这个向量中包含的信息中，关于源端序列末尾的token的信息更多，而如果序列很长，最终可能基本上<font color='red'>“遗忘”了序列开头的token的信息。</font>
- 第二个问题同样由RNN的特性造成: 随着decoder timestep的信息的增加，initial hidden states中包含的<font color='blue'>encoder output相关信息也会衰减</font>，decoder会逐渐“遗忘”源端序列的信息，而更多地关注目标序列中在该timestep之前的token的信息。

### Contextualized RNN

- 为了解决上述第二个问题，即**encoder output随着decoder timestep增加而信息衰减**的问题，有人提出了一种加了context的RNN sequence to sequence模型：
    - decoder在每个timestep的input上都会加上一个context。
- 为了方便理解，我们可以把这看作是encoded source sentence。这样就可以在decoder的每一步，都把源端的整个句子的信息和target端当前的token一起输入到RNN中，防止源端的context信息随着timestep的增长而衰减。

![](https://pic4.zhimg.com/80/v2-305acd420c4192c43954aaa430f7910b_720w.jpg)

- 但是这样依然有一个问题: context对于每个timestep都是静态的(encoder端的final hidden states，或者是所有timestep的output的平均值)。但是每个decoder端的token在解码时用到的context真的应该是一样的吗？在这样的背景下，Attention就应运而生了

### Contextualized RNN with soft align (Attention)

- Attention在机器翻译领域的应用最早的提出来自于2014年的一篇论文 [Neural Machine Translation by Jointly Learning to Align and Translate](https://arxiv.org/pdf/1409.0473.pdf)
- ![](https://pic3.zhimg.com/80/v2-0137ab38a12f427925541ada8fd9f94f_720w.jpg)
- 在每个timestep输入到decoder RNN结构中之前，会用当前的输入token的vector与encoder output中的每一个position的vector作一个"attention"操作，这个"attention"操作的目的就是计算当前token与每个position之间的"相关度"，从而决定每个position的vector在最终该timestep的context中占的比重有多少。最终的context即encoder output每个位置vector表达的加权平均。
- ![](https://pic1.zhimg.com/80/v2-d0db8ab72a9319b5fad32acf32d86db7_720w.png)


## 序列解码

- 生成式任务比普通的分类、tagging等NLP任务复杂不少。生成时，模型的输出是一个时间步一个时间步依次获得，前面时间步的结果影响后面时间步的结果。即每一个时间步，模型给出的都是<font color='blue'>基于历史生成结果的条件概率</font>。
- 生成完整的句子，需要一个称为`解码`的额外动作来融合模型多个时间步的输出，使得最终序列的每一步条件概率连乘起来最大。
- 分析
    - 每一个时间步可能的输出种类称为`字典大小`(vocabulary size，我们用v表示)
    - 进行T步随机的生成可能获得的结果总共有vT种。
    - 拿中文文本生成来说，v的值大约是5000-6000，即常用汉字的个数。
- 在如此大的基数下，遍历整个生成空间是不现实的。


### 贪心 Greedy Search

- `贪心搜索`，即每一个时间步都取条件概率最大的输出，再将从开始到当前步的结果作为输入去获得下一个时间步的输出，直到模型给出生成结束的标志。
- 示例，生成序列[A,B,C]
    - ![](http://www.wuyuanhao.com/wp-content/uploads/2020/03/greedy.png)
- 分析
    - 优点
        - 原来指数级别的求解空间直接压缩到了与长度线性相关的大小。（指数级→线性级）
    - 缺点
        - 由于丢弃了绝大多数的可能解，这种关注当下的策略<font color='red'>无法保证最终序列概率是最优的</font>。

### 集束搜索 Beam Search

- Beam search是对贪心策略一个改进。
- 思路：稍微放宽一些考察的范围。
    - 在每一个时间步，不再只保留当前分数最高的1个输出，而是保留num_beams个。
    - 当num_beams=1时集束搜索就退化成了贪心搜索。
- 示例
    - 每个时间步有ABCDE共5种可能的输出，即v=5v=5，图中的num_beams=2，也就是说每个时间步都会保留到当前步为止条件概率最优的2个序列
    - ![](http://www.wuyuanhao.com/wp-content/uploads/2020/03/beam-search.png)
- 分析
    - beam search在每一步需要考察的候选人数量是贪心搜索的num_beams倍
    - BS是一种时间换性能的方法。
    - 缺点
        - 会遇到诸如词语重复问题

#### 序列扩展

- 序列扩展是beam search的核心过程
- ![](http://www.wuyuanhao.com/wp-content/uploads/2020/03/seqextend-1024x695.png)

#### 代码解析

- NLP界著名Python包[Transformers](https://github.com/huggingface/transformers)
- 解析过程见：[解读Beam Search (1/2)](http://www.wuyuanhao.com/2020/03/20/%e8%a7%a3%e8%af%bbbeam-search-1-2/)


### Beam Search改进

- Beam Search虽然比贪心有所改进，但还是会生成出空洞、重复、前后矛盾的文本。
- 试图最大化序列条件概率的解码策略从根上就有问题
- 人类选择的词（橙线）并不是像机器选择的（蓝线）那样总是那些条件概率最大的词。
    - 总是选择概率大的词会发生正反馈从而陷入重复，从生成的结果也可以看出，机器生成的结果有大量重复。
    - ![](http://www.wuyuanhao.com/wp-content/uploads/2020/03/probability.png)
- 参考：[解读Beam Search (2/2)](http://www.wuyuanhao.com/2020/03/23/%e8%a7%a3%e8%af%bbbeam-search-2/)
- 以下思路主要源自ICLR 2020论文：[《The Curious Case of Neural Text Degeneration》](https://arxiv.org/abs/1904.09751)

#### 随机采样(sampling)

- 随机采样：格局解码器输出的词典中每个词的概率分布随机抽样。
    - 相比于按概率“掐尖”，这样会增大所选词的范围，引入更多的随机性。
- 采样的时候有一个可以控制的超参数，称为**温度**(temperature, $T$)。
    - 模型蒸馏里用到
- 解码器的输出层后面通常会跟一个softmax函数来将输出概率归一化，通过改变$T$可以控制概率的形貌。
- softmax的公式如下
    - 当$T$大的时候，概率分布趋向平均，随机性增大；
    - 当$T$小的时候，概率密度趋向于集中，即强者俞强，随机性降低，会更多地采样出“放之四海而皆准”的词汇。

- 谷歌开放式聊天机器人Meena采用的方式，论文结论是：
    - 这种随机采样的方法远好于Beam Search。
    - 但这其实也是有条件的，随机采样容易产生前后不一致的问题。
    - 而在开放闲聊领域，生成文本的 长度都比较短 ，这种问题就被自然的淡化了。

#### top-k采样

- 采样前将输出的概率分布截断，取出概率最大的k个词构成一个集合，然后将这个子集词的概率再归一化，最后重新的概率分布中采样词汇。
- 据说可以获得比Beam Search好很多的效果，但有个问题，就是这个k不太好选。
    - 概率分布变化比较大，有时候可能很均匀(flat)，有的时候比较集中(peaked)。
    - ![](http://www.wuyuanhao.com/wp-content/uploads/2020/03/distribution.png)
    - 对于集中的情况还好说，当分布均匀时，一个较小的k容易丢掉很多优质候选词。
    - 但如果k定的太大，这个方法又会退化回普通采样。

#### 核采样（Nucleus sampling) —— Top-p采样

- 不再取一个固定的k，而是固定候选集合的概率密度和在整个概率分布中的比例
- 选出来这个集合之后也和top-k采样一样，重新归一化集合内词的概率，并把集合外词的概率设为0。
- 这种方式也称为top-p采样。

#### 惩罚重复

- 为了解决重复问题，还有可以通过惩罚因子将出现过词的概率变小或者强制不使用重复词来解决。

#### 代码实现

- 上述各种采样方式在HuggingFace的库里都已经实现了

```python
# 代码输入的是logits，而且考虑很周全（我感觉漏了考虑k和p都给了的情况，这应该是不合适的）
# 巧妙地使用了torch.cumsum
# 避免了一个词都选不出来的尴尬情况
def top_k_top_p_filtering(logits, top_k=0, top_p=1.0, filter_value=-float("Inf"), min_tokens_to_keep=1):
    """ Filter a distribution of logits using top-k and/or nucleus (top-p) filtering
        Args:
            logits: logits distribution shape (batch size, vocabulary size)
            if top_k > 0: keep only top k tokens with highest probability (top-k filtering).
            if top_p < 1.0: keep the top tokens with cumulative probability >= top_p (nucleus filtering).
                Nucleus filtering is described in Holtzman et al. (http://arxiv.org/abs/1904.09751)
            Make sure we keep at least min_tokens_to_keep per batch example in the output
        From: https://gist.github.com/thomwolf/1a5a29f6962089e871b94cbd09daf317
    """
    if top_k > 0:
        top_k = min(max(top_k, min_tokens_to_keep), logits.size(-1))  # Safety check
        # Remove all tokens with a probability less than the last token of the top-k
        indices_to_remove = logits < torch.topk(logits, top_k)[0][..., -1, None]
        logits[indices_to_remove] = filter_value

    if top_p < 1.0:
        sorted_logits, sorted_indices = torch.sort(logits, descending=True)
        cumulative_probs = torch.cumsum(F.softmax(sorted_logits, dim=-1), dim=-1)

        # Remove tokens with cumulative probability above the threshold (token with 0 are kept)
        sorted_indices_to_remove = cumulative_probs > top_p
        if min_tokens_to_keep > 1:
            # Keep at least min_tokens_to_keep (set to min_tokens_to_keep-1 because we add the first one below)
            sorted_indices_to_remove[..., :min_tokens_to_keep] = 0
        # Shift the indices to the right to keep also the first token above the threshold
        sorted_indices_to_remove[..., 1:] = sorted_indices_to_remove[..., :-1].clone()
        sorted_indices_to_remove[..., 0] = 0

        # scatter sorted tensors to original indexing
        indices_to_remove = sorted_indices_to_remove.scatter(1, sorted_indices, sorted_indices_to_remove)
        logits[indices_to_remove] = filter_value
    return logits
```


## Attention的细节
----------------
 
### 2.1. 点积attention
 
介绍一下attention的具体计算方式。attention可以有很多种计算方式: 
- 加性attention
- 点积attention
- 还有带参数的计算方式

着重介绍一下点积attention的公式:
 
![[公式]](https://www.zhihu.com/equation?tex=%5Ctext+%7B+Attention+%7D%28Q%2C+K%2C+V%29%3D%5Coperatorname%7Bsoftmax%7D%5Cleft%28%5Cfrac%7BQ+K%5E%7BT%7D%7D%7B%5Csqrt%7Bd_%7Bk%7D%7D%7D%5Cright%29+V)
 
![](https://pic2.zhimg.com/80/v2-dc8921bfabcdf2515472b88a0808d046_720w.jpg)
 
- Attention中(Q^T)*K矩阵计算，query和key的维度要保持一致
 
如上图所示， ![[公式]](https://www.zhihu.com/equation?tex=Q_%7BM%5Ctimes+d%7D) , ![[公式]](https://www.zhihu.com/equation?tex=K_%7BN%5Ctimes+d%7D) 分别是query和key，其中，query可以看作M个维度为d的向量(长度为M的sequence的向量表达)拼接而成，key可以看作N个维度为d的向量(长度为N的sequence的向量表达)拼接而成。
*   【一个小问题】为什么有缩放因子 ![[公式]](https://www.zhihu.com/equation?tex=%5Cfrac%7B1%7D%7B%5Csqrt%7Bd_k%7D%7D) ?
*   先一句话回答这个问题: 缩放因子的作用是归一化。
*   假设![[公式]](https://www.zhihu.com/equation?tex=Q) , ![[公式]](https://www.zhihu.com/equation?tex=K)里的元素的均值为0，方差为1，那么 ![[公式]](https://www.zhihu.com/equation?tex=A%5ET%3DQ%5ETK) 中元素的均值为0，方差为d. 当d变得很大时， ![[公式]](https://www.zhihu.com/equation?tex=A) 中的元素的方差也会变得很大，如果 ![[公式]](https://www.zhihu.com/equation?tex=A) 中的元素方差很大，那么![[公式]](https://www.zhihu.com/equation?tex=%5Coperatorname%7Bsoftmax%7D%5Cleft%28A%5Cright%29) 的分布会趋于陡峭(分布的方差大，分布集中在绝对值大的区域)。总结一下就是![[公式]](https://www.zhihu.com/equation?tex=%5Coperatorname%7Bsoftmax%7D%5Cleft%28A%5Cright%29)的分布会和d有关。因此![[公式]](https://www.zhihu.com/equation?tex=A) 中每一个元素乘上 ![[公式]](https://www.zhihu.com/equation?tex=%5Cfrac%7B1%7D%7B%5Csqrt%7Bd_k%7D%7D) 后，方差又变为1。这使得![[公式]](https://www.zhihu.com/equation?tex=%5Coperatorname%7Bsoftmax%7D%5Cleft%28A%5Cright%29) 的分布“陡峭”程度与d解耦，从而使得训练过程中梯度值保持稳定。
    
 
### 2.2. Attention机制涉及到的参数
 
一个完整的attention层涉及到的参数有:
*   把![[公式]](https://www.zhihu.com/equation?tex=q) , ![[公式]](https://www.zhihu.com/equation?tex=k) , ![[公式]](https://www.zhihu.com/equation?tex=v)分别映射到![[公式]](https://www.zhihu.com/equation?tex=Q) , ![[公式]](https://www.zhihu.com/equation?tex=K) , ![[公式]](https://www.zhihu.com/equation?tex=V)的线性变换矩阵 ![[公式]](https://www.zhihu.com/equation?tex=W%5EQ) ( ![[公式]](https://www.zhihu.com/equation?tex=d_%7Bmodel%7D+%5Ctimes+d_k+) ), ![[公式]](https://www.zhihu.com/equation?tex=W%5EK)( ![[公式]](https://www.zhihu.com/equation?tex=d_%7Bmodel%7D+%5Ctimes+d_k) ), ![[公式]](https://www.zhihu.com/equation?tex=W%5EV) ( ![[公式]](https://www.zhihu.com/equation?tex=d_%7Bmodel%7D+%5Ctimes+d_v) )
*   把输出的表达 ![[公式]](https://www.zhihu.com/equation?tex=O) 映射为最终输出 ![[公式]](https://www.zhihu.com/equation?tex=o) 的线性变换矩阵 ![[公式]](https://www.zhihu.com/equation?tex=W%5EO) ( ![[公式]](https://www.zhihu.com/equation?tex=d_v+%5Ctimes+d_%7Bmodel%7D+) )
    
 
### 2.3. Query, Key, Value
 
Query和Key作用得到的attention权值作用到Value上。因此它们之间的关系是:
1.  Query![[公式]](https://www.zhihu.com/equation?tex=%28M%5Ctimes+d_%7Bqk%7D%29) 和Key![[公式]](https://www.zhihu.com/equation?tex=%28N%5Ctimes+d_%7Bqk%7D%29)的维度必须一致，Value ![[公式]](https://www.zhihu.com/equation?tex=%28N%5Ctimes+d_%7Bv%7D%29) 和Query/Key的维度可以不一致。
2.  Key![[公式]](https://www.zhihu.com/equation?tex=%28N%5Ctimes+d_%7Bqk%7D%29)和Value ![[公式]](https://www.zhihu.com/equation?tex=%28N%5Ctimes+d_%7Bv%7D%29)的长度必须一致。Key和Value本质上对应了同一个Sequence在不同空间的表达。
3.  Attention得到的Output ![[公式]](https://www.zhihu.com/equation?tex=%28M%5Ctimes+d_%7Bv%7D%29) 的维度和Value的维度一致，长度和Query一致。
4.  Output每个位置 i 是由value的所有位置的vector加权平均之后的向量；而其权值是由位置为i 的query和key的所有位置经过attention计算得到的 ，权值的个数等于key/value的长度。
 
![](https://pic4.zhimg.com/80/v2-7e7fcf5895d3cfc3f9f97b5c19069bbb_720w.jpg)
 
- Attention示意图
 
在经典的Transformer结构中，我们记线性映射之前的Query, Key, Value为q, k, v，映射之后为Q, K, V。那么:
1.  self-attention的q, k, v都是同一个输入, 即当前序列由上一层输出的高维表达。
2.  cross-attention的q代表当前序列，k,v是同一个输入，对应的是encoder最后一层的输出结果(对decoder端的每一层来说，保持不变)

而每一层线性映射参数矩阵都是独立的，所以经过映射后的Q, K, V各不相同，模型参数优化的目标在于将q, k, v被映射到新的高维空间，使得每层的Q, K, V在不同抽象层面上捕获到q, k, v之间的关系。一般来说，底层layer捕获到的更多是lexical-level的关系，而高层layer捕获到的更多是semantic-level的关系。
 
### 2.4. Attention的作用
 
下面这段我会以机器翻译为例，用通俗的语言阐释一下attention的作用，以及query, key, value的含义。
 
![](https://pic4.zhimg.com/80/v2-cca6e1f0dd02f08cc554d731362a08af_720w.jpg)
 
Transformer模型Encoder, Decoder的细节图（省去了FFN部分）
 
query对应的是需要被表达的序列(称为序列A)，key和value对应的是用来表达A的序列(称为序列B)。其中key和query是在同一高维空间中的(否则无法用来计算相似程度)，value不必在同一高维空间中，最终生成的output和value在同一高维空间中。上面这段巨绕的话用一句更绕的话来描述一下就是:
 
> 序列A和序列B在高维空间 ![[公式]](https://www.zhihu.com/equation?tex=%5Calpha) 中的高维表达 ![[公式]](https://www.zhihu.com/equation?tex=A_%7B%5Calpha%7D) 的每个位置分别和 ![[公式]](https://www.zhihu.com/equation?tex=B_%7B%5Calpha%7D) 计算相似度，产生的权重作用于序列B在高维空间 ![[公式]](https://www.zhihu.com/equation?tex=%5Cbeta) 中的高维表达 ![[公式]](https://www.zhihu.com/equation?tex=B_%7B%5Cbeta%7D) ，获得序列A在高维空间 ![[公式]](https://www.zhihu.com/equation?tex=%5Cbeta) 中的高维表达 ![[公式]](https://www.zhihu.com/equation?tex=A_%7B%5Cbeta%7D)
 
Encoder部分中只存在self-attention，而Decoder部分中存在self-attention和cross-attention
- 【self-attention】encoder中的self-attention的query, key, value都对应了源端序列(即A和B是同一序列)，decoder中的self-attention的query, key, value都对应了目标端序列。
- 【cross-attention】decoder中的cross-attention的query对应了目标端序列，key, value对应了源端序列(每一层中的cross-attention用的都是encoder的最终输出)
 
### 2.5. Decoder端的Mask
 
Transformer模型属于自回归模型（p.s. 非自回归的翻译模型我会专门写一篇文章来介绍），也就是说后面的token的推断是基于前面的token的。Decoder端的Mask的功能是为了保证训练阶段和推理阶段的一致性。
 
论文原文中关于这一点的段落如下：
 
> We also modify the self-attention sub-layer in the decoder stack to prevent from attending to subsequent positions. This masking, combined with the fact that the output embeddings are offset by one position, ensures that the predictions for position i can depend only on the known outputs at positions less than i.
 
在推理阶段，token是按照从左往右的顺序推理的。也就是说，在推理timestep=T的token时，decoder只能“看到”timestep < T的 T-1 个Token, 不能和timestep大于它自身的token做attention（因为根本还不知道后面的token是什么）。为了保证训练时和推理时的一致性，所以，训练时要同样防止token与它之后的token去做attention。
 
### 2.6. 多头Attention (Multi-head Attention)
 
Attention是将query和key映射到同一高维空间中去计算相似度，而对应的multi-head attention把query和key映射到高维空间 ![[公式]](https://www.zhihu.com/equation?tex=%5Calpha) 的不同子空间 ![[公式]](https://www.zhihu.com/equation?tex=%28%5Calpha_1%2C+%5Calpha_2%2C+...%2C%5Calpha_h%29) 中去计算相似度。
 
为什么要做multi-head attention？论文原文里是这么说的:
 
> Multi-head attention allows the model to jointly attend to information from different representation subspaces at different positions. With a single attention head, averaging inhibits this.
 
也就是说，这样可以在不改变参数量的情况下增强每一层attention的表现力。
 
![](https://pic3.zhimg.com/80/v2-3f8c3c102404c9b61398b63e06ffd80b_720w.jpg)
 
Multi-head Attention示意图
 
Multi-head Attention的本质是，在参数总量保持不变的情况下，将同样的query, key, value映射到原来的高维空间的不同子空间中进行attention的计算，在最后一步再合并不同子空间中的attention信息。这样降低了计算每个head的attention时每个向量的维度，在某种意义上防止了过拟合；由于Attention在不同子空间中有不同的分布，Multi-head Attention实际上是寻找了序列之间不同角度的关联关系，并在最后concat这一步骤中，将不同子空间中捕获到的关联关系再综合起来。
 
从上图可以看出， ![[公式]](https://www.zhihu.com/equation?tex=q_i) 和 ![[公式]](https://www.zhihu.com/equation?tex=k_j) 之间的attention score从1个变成了h个，这就对应了h个子空间中它们的关联度。
 
3. Transformer模型架构中的其他部分
-------------------------
 
### 3.1. Feed Forward Network
 
每一层经过attention之后，还会有一个FFN，这个FFN的作用就是空间变换。FFN包含了2层linear transformation层，中间的激活函数是ReLu。
 
曾经我在这里有一个百思不得其解的问题：attention层的output最后会和 ![[公式]](https://www.zhihu.com/equation?tex=W_O) 相乘，为什么这里又要增加一个2层的FFN网络？
 
其实，FFN的加入引入了非线性(ReLu激活函数)，变换了attention output的空间, 从而增加了模型的表现能力。把FFN去掉模型也是可以用的，但是效果差了很多。
 
### 3.2. Positional Encoding
 
位置编码层只在encoder端和decoder端的embedding之后，第一个block之前出现，它非常重要，没有这部分，Transformer模型就无法用。位置编码是Transformer框架中特有的组成部分，补充了Attention机制本身不能捕捉位置信息的缺陷。
 
![](https://pic4.zhimg.com/80/v2-42d5035562aca2c6136a2c8abaafc565_720w.jpg)
 
- position encoding
 
Positional Embedding的成分直接叠加于Embedding之上，使得每个token的位置信息和它的语义信息(embedding)充分融合，并被传递到后续所有经过复杂变换的序列表达中去。
 
论文中使用的Positional Encoding(PE)是正余弦函数，位置(pos)越小，波长越长，每一个位置对应的PE都是唯一的。同时作者也提到，之所以选用正余弦函数作为PE，是因为这可以使得模型学习到token之间的相对位置关系：因为对于任意的偏移量k， ![[公式]](https://www.zhihu.com/equation?tex=PE_%7Bpos%2Bk%7D) 可以由 ![[公式]](https://www.zhihu.com/equation?tex=PE_%7Bpos%7D) 的线性表示：
 
![[公式]](https://www.zhihu.com/equation?tex=PE_%7B%28pos%2Bk%2C2i%29%7D%3Dsin%5B%28pos%2Bk%29%2F10000%5E%7B2i%2Fd_%7Bmodel%7D%7D%5D)
 
![[公式]](https://www.zhihu.com/equation?tex=PE_%7B%28pos%2Bk%2C2i%2B1%29%7D%3Dcos%5B%28pos%2Bk%29%2F10000%5E%7B2i%2Fd_%7Bmodel%7D%7D%5D)
 
上面两个公式可以由 ![[公式]](https://www.zhihu.com/equation?tex=sin%5B%28pos%29%2F10000%5E%7B2i%2Fd_%7Bmodel%7D%7D%5D) 和![[公式]](https://www.zhihu.com/equation?tex=cos%5B%28pos%29%2F10000%5E%7B2i%2Fd_%7Bmodel%7D%7D%5D)的线性组合得到。也就是 ![[公式]](https://www.zhihu.com/equation?tex=PE_%7Bpos%7D)乘上某个线性变换矩阵就得到了![[公式]](https://www.zhihu.com/equation?tex=PE_%7Bpos%2Bk%7D)
 
p.s. 后续有一个工作在attention中使用了“相对位置表示” ([Self-Attention with Relative Position Representations](https://link.zhihu.com/?target=https%3A//www.aclweb.org/anthology/N18-2074.pdf)) ，有兴趣可以看看。
 
### 3.3. Layer Normalization
 
在每个block中，最后出现的是Layer Normalization。Layer Normalization是一个通用的技术，其本质是规范优化空间，加速收敛。
 
当我们使用梯度下降法做优化时，随着网络深度的增加，数据的分布会不断发生变化，假设feature只有二维，那么用示意图来表示一下就是：
 
![](https://pic3.zhimg.com/80/v2-59e1dc490d55d7b908f4e12c38cb80f8_720w.jpg)
 
数据的分布发生变化，左图比较规范，右图变得不规范
 
为了保证数据特征分布的稳定性（如左图），我们加入Layer Normalization，这样可以加速模型的优化速度。

- 以上内容摘自：[Transformer模型深度解读](https://zhuanlan.zhihu.com/p/104393915)


## Transformer模型

![](https://picb.zhimg.com/80/v2-6c292e2a4ed43894fc954ee625372c67_720w.jpg)

在上图的下面部分，训练用的输入和输出数据的embedding，都会先加上一个position encoding来补充一下位置信息。
- `Encoder`
   - 途中左侧部分是encoder块，encoder中6层相同结构堆叠而成，在每层中又可以分为2个子层，底下一层是multihead self-attention层，上面是一个FC feed-forward层，每一个子层都有residual connection，，然后在进行Layer Normalization. 为了引入redisual connenction简化计算，每个层的输入维数和embedding层保持一致。
- `Decoder`
   - 同样是一个6层的堆叠，每层有三个子层，其中底下两层都是multihead self-attention层，最底下一层是有mask的，只有当前位置之前的输入有效，中间层是encode和decode的连接层，输出的self-attention层和输入的encoder输出同时作为MSA的输入，实现encoder和decoder的连接，最上层和encoder的最上层是一样的，不在单说，每个子层都有有residual connection，和Layer Normalization

### 亮点

- `Self Attention`
   - 传统的编解码结构中，将输入输入编码为一个定长语义编码，然后通过这个编码在生成对应的输出序列。它存在的一个问题在于：输入序列不论长短都会被编码成一个固定长度的向量表示，而解码则受限于该固定长度的向量表示
   - attention机制: encoder的输出不是一个语义向量，是一个语义向量的序列
   ![](https://upload-images.jianshu.io/upload_images/14911967-cadfa37d31342857.png?imageMogr2/auto-orient/strip|imageView2/2/w/568/format/webp)
   - Transformer的Attenion函数称为scaled dot-Product Attention
   ![](https://upload-images.jianshu.io/upload_images/14911967-9fb3d576399e53e5.png?imageMogr2/auto-orient/strip|imageView2/2/w/455/format/webp)
- `MultiHead Attention`
   - self attention计算时会分为两个阶段，第一个阶段计算出softmax部分,第二部分是在乘以 Value部分，这样还是串行化的，并行化不够。
   - MultiHeadAttention，对query，key，value各自进行一次不同的线性变换，然后在执行一次softmax操作，这样可以提升并行度，论文中的head数是8个

![](https://upload-images.jianshu.io/upload_images/14911967-b31aa04d8628b8da.png?imageMogr2/auto-orient/strip|imageView2/2/w/600/format/webp)
- position Encoding
   - 语言是有序的，在cnn中，卷积的形状包含了位置信息，在rnn中，位置的先后顺序其实是通过送入模型的先后来保证。transformer抛弃了cnn和rnn，那么数据的位置信息怎么提供呢？
   - Transformer通过position Encoding来额外的提供位置信息，每一个位置对应一个向量，这个向量和word embedding求和后作为 encoder和decoder的输入。这样，对于同一个词语来说，在不同的位置，他们送入encoder和decoder的向量不同。


### 总结

- 结构
![](https://upload-images.jianshu.io/upload_images/14911967-dec395c8d1d19f18.png?imageMogr2/auto-orient/strip|imageView2/2/w/1200/format/webp)
- 训练过程
![](https://upload-images.jianshu.io/upload_images/14911967-ca45ad4ea6c91e77.gif?imageMogr2/auto-orient/strip|imageView2/2/w/640/format/webp)

作者：[Transformer模型学习](https://www.jianshu.com/p/04b6dd396d62)

## 图解Transformer
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/),中文翻译：[BERT大火却不懂Transformer？](https://zhuanlan.zhihu.com/p/54523019)
- [jalammar github repo](https://github.com/jalammar/jalammar.github.io/blob/master/_posts/2018-06-27-illustrated-transformer.md)
![](https://jalammar.github.io/images/t/transformer_resideual_layer_norm_3.png)

![](https://camo.githubusercontent.com/88e8f36ce61dedfd2491885b8df2f68c4d1f92f5/687474703a2f2f696d6775722e636f6d2f316b72463252362e706e67)


## [Transformer模型的PyTorch实现](https://luozhouyang.github.io/transformer/)

- Google 2017年的论文 [Attention is all you need](https://arxiv.org/abs/1706.03762) 阐释了什么叫做大道至简！该论文提出了**Transformer**模型，完全基于**Attention mechanism**，抛弃了传统的**RNN**和**CNN**。
- 我们根据论文的结构图，一步一步使用 [PyTorch](https://github.com/pytoch/pytorch) 实现这个**Transformer**模型。

## Transformer架构

- 首先看一下transformer的结构图：  
![transformer_architecture](http://blog.stupidme.me/wp-content/uploads/2018/09/transformer.jpg)  

解释一下这个结构图。首先，**Transformer**模型也是使用经典的**encoer-decoder**架构，由encoder和decoder两部分组成。
- 上图的左半边用`Nx`框出来的，就是我们的encoder的一层。encoder一共有6层这样的结构。
- 上图的右半边用`Nx`框出来的，就是我们的decoder的一层。decoder一共有6层这样的结构。
- 输入序列经过**word embedding**和**positional encoding**相加后，输入到encoder。
- 输出序列经过**word embedding**和**positional encoding**相加后，输入到decoder。
- 最后，decoder输出的结果，经过一个线性层，然后计算softmax。

**word embedding**和**positional encoding**我后面会解释。我们首先详细地分析一下encoder和decoder的每一层是怎么样的。

## Encoder

encoder由6层相同的层组成，每一层分别由两部分组成：
- * 第一部分是一个**multi-head self-attention mechanism**
- * 第二部分是一个**position-wise feed-forward network**，是一个全连接层
两个部分，都有一个　**残差连接(residual connection)**，然后接着一个**Layer Normalization**。

如果你是一个新手，你可能会问：
- * multi-head self-attention 是什么呢？
- * 参差结构是什么呢？
- * Layer Normalization又是什么？

这些问题我们在后面会一一解答。

## Decoder

和encoder类似，decoder由6个相同的层组成，每一个层包括以下3个部分：

* 第一个部分是**multi-head self-attention mechanism**
* 第二部分是**multi-head context-attention mechanism**
* 第三部分是一个**position-wise feed-forward network**

还是和encoder类似，上面三个部分的每一个部分，都有一个**残差连接**，后接一个**Layer Normalization**。

但是，decoder出现了一个新的东西**multi-head context-attention mechanism**。这个东西其实也不复杂，理解了**multi-head self-attention**你就可以理解**multi-head context-attention**。这个我们后面会讲解。

## Attention机制

在讲清楚各种attention之前，我们得先把attention机制说清楚。

通俗来说，**attention**是指，对于某个时刻的输出`y`，它在输入`x`上各个部分的注意力。这个注意力实际上可以理解为**权重**。

attention机制也可以分成很多种。[Attention? Attention!](https://lilianweng.github.io/lil-log/2018/06/24/attention-attention.html) 一文有一张比较全面的表格：  
![attention_mechanism](http://blog.stupidme.me/wp-content/uploads/2018/09/attention_mechanism_table.png)  
*Figure 2. a summary table of several popular attention mechanisms.*  

上面第一种**additive attention**你可能听过。以前我们的seq2seq模型里面，使用attention机制，这种**加性注意力(additive attention)**用的很多。Google的项目 [tensorflow/nmt](https://github.com/tensorflow/nmt) 里面这两种attention机制都有实现。

为什么这种attention叫做**additive attention**呢？很简单，对于输入序列隐状态$h_i$和输出序列的隐状态$s_t$，它的处理方式很简单，直接**合并**，变成$[s_t;h_i]$

但是我们的transformer模型使用的不是这种attention机制，使用的是另一种，叫做**乘性注意力(multiplicative attention)**。

那么这种**乘性注意力机制**是怎么样的呢？从上表中的公式也可以看出来：**两个隐状态进行点积**！

### Self-attention是什么？
到这里就可以解释什么是**self-attention**了。

上面我们说attention机制的时候，都会说到两个隐状态，分别是$h_i$和$s_t$，前者是输入序列第i个位置产生的隐状态，后者是输出序列在第t个位置产生的隐状态。

所谓**self-attention**实际上就是，**输出序列**就是**输入序列**！因此，计算自己的attention得分，就叫做**self-attention**！

### Context-attention是什么？
知道了**self-attention**，那你肯定猜到了**context-attention**是什么了：**它是encoder和decoder之间的attention**！所以，你也可以称之为**encoder-decoder attention**!

**context-attention**一词并不是本人原创，有些文章或者代码会这样描述，我觉得挺形象的，所以在此沿用这个称呼。其他文章可能会有其他名称，但是不要紧，我们抓住了重点即可，那就是**两个不同序列之间的attention**，与**self-attention**相区别。

不管是**self-attention**还是**context-attention**，它们计算attention分数的时候，可以选择很多方式，比如上面表中提到的：

* additive attention
* local-base
* general
* dot-product
* scaled dot-product

那么我们的Transformer模型，采用的是哪种呢？答案是：**scaled dot-product attention**。

### Scaled dot-product attention是什么？
论文[Attention is all you need](https://arxiv.org/abs/1706.03762)里面对于attention机制的描述是这样的：
> An attention function can be described as a query and a set of key-value pairs to an output, where the query, keys, values, and output are all vectors. The output is computed as a weighted sum of the values, where the weight assigned to each value is computed by a compatibility of the query with the corresponding key.

这句话描述得很清楚了。翻译过来就是：**通过确定Q和K之间的相似程度来选择V**！

用公式来描述更加清晰：

$$\text{Attention}(Q,K,V)=softmax(\frac{QK^T}{\sqrt d_k})V$$

**scaled dot-product attention**和**dot-product attention**唯一的区别就是，**scaled dot-product attention**有一个缩放因子$\frac{1}{\sqrt d_k}$。

上面公式中的$d_k$表示的是K的维度，在论文里面，默认是`64`。

那么为什么需要加上这个缩放因子呢？论文里给出了解释：对于$d_k$很大的时候，点积得到的结果维度很大，使得结果处于softmax函数梯度很小的区域。

我们知道，梯度很小的情况，这对反向传播不利。为了克服这个负面影响，除以一个缩放因子，可以一定程度上减缓这种情况。

为什么是$\frac{1}{\sqrt d_k}$呢？论文没有进一步说明。个人觉得你可以使用其他缩放因子，看看模型效果有没有提升。

论文也提供了一张很清晰的结构图，供大家参考：  
![scaled_dot_product_attention_arch](http://blog.stupidme.me/wp-content/uploads/2018/09/scaled_dot_product_attention_arch.png)  
*Figure 3. Scaled dot-product attention architecture.*  

首先说明一下我们的K、Q、V是什么：

* 在encoder的self-attention中，Q、K、V都来自同一个地方（相等），他们是上一层encoder的输出。对于第一层encoder，它们就是word embedding和positional encoding相加得到的输入。
* 在decoder的self-attention中，Q、K、V都来自于同一个地方（相等），它们是上一层decoder的输出。对于第一层decoder，它们就是word embedding和positional encoding相加得到的输入。但是对于decoder，我们不希望它能获得下一个time step（即将来的信息），因此我们需要进行**sequence masking**。
* 在encoder-decoder attention中，Q来自于decoder的上一层的输出，K和V来自于encoder的输出，K和V是一样的。
* Q、K、V三者的维度一样，即 $d_q=d_k=d_v$。

上面scaled dot-product attention和decoder的self-attention都出现了**masking**这样一个东西。那么这个mask到底是什么呢？这两处的mask操作是一样的吗？这个问题在后面会有详细解释。

### Scaled dot-product attention的实现

咱们先把scaled dot-product attention实现了吧。代码如下：

```python
import torch
import torch.nn as nn

class ScaledDotProductAttention(nn.Module):
    """Scaled dot-product attention mechanism."""

    def __init__(self, attention_dropout=0.0):
        super(ScaledDotProductAttention, self).__init__()
        self.dropout = nn.Dropout(attention_dropout)
        self.softmax = nn.Softmax(dim=2)

    def forward(self, q, k, v, scale=None, attn_mask=None):
        """前向传播.

        Args:
        	q: Queries张量，形状为[B, L_q, D_q]
        	k: Keys张量，形状为[B, L_k, D_k]
        	v: Values张量，形状为[B, L_v, D_v]，一般来说就是k
        	scale: 缩放因子，一个浮点标量
        	attn_mask: Masking张量，形状为[B, L_q, L_k]

        Returns:
        	上下文张量和attetention张量
        """
        attention = torch.bmm(q, k.transpose(1, 2))
        if scale:
        	attention = attention * scale
        if attn_mask:
        	# 给需要mask的地方设置一个负无穷
        	attention = attention.masked_fill_(attn_mask, -np.inf)
		# 计算softmax
        attention = self.softmax(attention)
		# 添加dropout
        attention = self.dropout(attention)
		# 和V做点积
        context = torch.bmm(attention, v)
        return context, attention
```

### Multi-head attention又是什么呢？

理解了Scaled dot-product attention，Multi-head attention也很简单了。论文提到，他们发现将Q、K、V通过一个线性映射之后，分成 $h$ 份，对每一份进行**scaled dot-product attention**效果更好。然后，把各个部分的结果合并起来，再次经过线性映射，得到最终的输出。这就是所谓的**multi-head attention**。上面的超参数 $$h$$ 就是**heads**数量。论文默认是`8`。

下面是multi-head attention的结构图：  
![multi-head attention_architecture](http://blog.stupidme.me/wp-content/uploads/2018/09/multi_head_attention_arch.png)  
*Figure 4: Multi-head attention architecture.*  

值得注意的是，上面所说的**分成 $h$ 份**是在 $d_k、d_q、d_v$ 维度上面进行切分的。因此，进入到scaled dot-product attention的 $d_k$ 实际上等于未进入之前的 $D_K/h$ 。

Multi-head attention允许模型加入不同位置的表示子空间的信息。

Multi-head attention的公式如下：$$\text{MultiHead}(Q,K,V) = \text{Concat}(\text{head}_ 1,\dots,\text{head}_ h)W^O$$

其中，$\text{head}_ i = \text{Attention}(QW_i^Q,KW_i^K,VW_i^V)$

论文里面，$d_{model}=512$，$h=8$。所以在scaled dot-product attention里面的 $d_q = d_k = d_v = d_{model}/h = 512/8 = 64$

### Multi-head attention的实现

相信大家已经理清楚了multi-head attention，那么我们来实现它吧。代码如下：

```python
import torch
import torch.nn as nn


class MultiHeadAttention(nn.Module):

    def __init__(self, model_dim=512, num_heads=8, dropout=0.0):
        super(MultiHeadAttention, self).__init__()

        self.dim_per_head = model_dim // num_heads
        self.num_heads = num_heads
        self.linear_k = nn.Linear(model_dim, self.dim_per_head * num_heads)
        self.linear_v = nn.Linear(model_dim, self.dim_per_head * num_heads)
        self.linear_q = nn.Linear(model_dim, self.dim_per_head * num_heads)

        self.dot_product_attention = ScaledDotProductAttention(dropout)
        self.linear_final = nn.Linear(model_dim, model_dim)
        self.dropout = nn.Dropout(dropout)
		# multi-head attention之后需要做layer norm
        self.layer_norm = nn.LayerNorm(model_dim)

    def forward(self, key, value, query, attn_mask=None):
		# 残差连接
        residual = query

        dim_per_head = self.dim_per_head
        num_heads = self.num_heads
        batch_size = key.size(0)

        # linear projection
        key = self.linear_k(key)
        value = self.linear_v(value)
        query = self.linear_q(query)

        # split by heads
        key = key.view(batch_size * num_heads, -1, dim_per_head)
        value = value.view(batch_size * num_heads, -1, dim_per_head)
        query = query.view(batch_size * num_heads, -1, dim_per_head)

        if attn_mask:
            attn_mask = attn_mask.repeat(num_heads, 1, 1)
        # scaled dot product attention
        scale = (key.size(-1) // num_heads) ** -0.5
        context, attention = self.dot_product_attention(
          query, key, value, scale, attn_mask)

        # concat heads
        context = context.view(batch_size, -1, dim_per_head * num_heads)

        # final linear projection
        output = self.linear_final(context)

        # dropout
        output = self.dropout(output)

        # add residual and norm layer
        output = self.layer_norm(residual + output)

        return output, attention

```

上面的代码终于出现了**Residual connection**和**Layer normalization**。我们现在来解释它们。

## Residual connection是什么？

残差连接其实很简单！给你看一张示意图你就明白了：  
![residual_conn](http://blog.stupidme.me/wp-content/uploads/2018/09/residual_connection.png)  
*Figure 5. Residual connection.*  

假设网络中某个层对输入`x`作用后的输出是$F(x)$，那么增加**residual connection**之后，就变成了：$F(x)+x$

这个`+x`操作就是一个**shortcut**。那么**残差结构**有什么好处呢？显而易见：因为增加了一项$x$，那么该层网络对x求偏导的时候，多了一个常数项$1$！所以在反向传播过程中，梯度连乘，也不会造成**梯度消失**！

所以，代码实现residual connection很非常简单：

```python
def residual(sublayer_fn,x):
	return sublayer_fn(x)+x
```

文章开始的transformer架构图中的`Add & Norm`中的`Add`也就是指的这个**shortcut**。

至此，**residual connection**的问题理清楚了。更多关于残差网络的介绍可以看文末的参考文献。

## Layer normalization是什么？
[GRADIENTS, BATCH NORMALIZATION AND LAYER NORMALIZATION](https://theneuralperspective.com/2016/10/27/gradient-topics/)一文对normalization有很好的解释：
> Normalization有很多种，但是它们都有一个共同的目的，那就是把输入转化成均值为0方差为1的数据。我们在把数据送入激活函数之前进行normalization（归一化），因为我们不希望输入数据落在激活函数的饱和区。

说到normalization，那就肯定得提到**Batch Normalization**。BN在CNN等地方用得很多。

BN的主要思想就是：在每一层的每一批数据上进行归一化。

我们可能会对输入数据进行归一化，但是经过该网络层的作用后，我们的的数据已经不再是归一化的了。随着这种情况的发展，数据的偏差越来越大，我的反向传播需要考虑到这些大的偏差，这就迫使我们只能使用较小的学习率来防止梯度消失或者梯度爆炸。

BN的具体做法就是对每一小批数据，在批这个方向上做归一化。如下图所示：  
![batch_normalization](http://blog.stupidme.me/wp-content/uploads/2018/09/batch_normalization.png)  
*Figure 6. Batch normalization example.(From [theneuralperspective.com](https://theneuralperspective.com/2016/10/27/gradient-topics/))*  

可以看到，右半边求均值是**沿着数据批量N的方向进行的**！

Batch normalization的计算公式如下：

$$BN(x_i)=\alpha\times\frac{x_i-u_B}{\sqrt{\sigma_B^2+\epsilon}}+\beta$$

具体的实现可以查看上图的链接文章。

说完Batch normalization，就该说说咱们今天的主角**Layer normalization**。

那么什么是Layer normalization呢？:它也是归一化数据的一种方式，不过LN是**在每一个样本上计算均值和方差，而不是BN那种在批方向计算均值和方差**！

下面是LN的示意图：  
![layer_normalization](http://blog.stupidme.me/wp-content/uploads/2018/09/layer_normalization.png)  
*Figure 7. Layer normalization example.*  

和上面的BN示意图一比较就可以看出二者的区别啦！

下面看一下LN的公式，也BN十分相似：

$$LN(x_i)=\alpha\times\frac{x_i-u_L}{\sqrt{\sigma_L^2+\epsilon}}+\beta$$

### Layer normalization的实现

上述两个参数$\alpha$和$\beta$都是可学习参数。下面我们自己来实现Layer normalization(PyTorch已经实现啦！)。代码如下：

```python
import torch
import torch.nn as nn


class LayerNorm(nn.Module):
    """实现LayerNorm。其实PyTorch已经实现啦，见nn.LayerNorm。"""

    def __init__(self, features, epsilon=1e-6):
        """Init.

        Args:
            features: 就是模型的维度。论文默认512
            epsilon: 一个很小的数，防止数值计算的除0错误
        """
        super(LayerNorm, self).__init__()
        # alpha
        self.gamma = nn.Parameter(torch.ones(features))
        # beta
        self.beta = nn.Parameter(torch.zeros(features))
        self.epsilon = epsilon

    def forward(self, x):
        """前向传播.

        Args:
            x: 输入序列张量，形状为[B, L, D]
        """
        # 根据公式进行归一化
        # 在X的最后一个维度求均值，最后一个维度就是模型的维度
        mean = x.mean(-1, keepdim=True)
        # 在X的最后一个维度求方差，最后一个维度就是模型的维度
        std = x.std(-1, keepdim=True)
        return self.gamma * (x - mean) / (std + self.epsilon) + self.beta

```
顺便提一句，**Layer normalization**多用于RNN这种结构。

## Mask是什么？

现在终于轮到讲解mask了!mask顾名思义就是**掩码**，在我们这里的意思大概就是**对某些值进行掩盖，使其不产生效果**。

需要说明的是，我们的Transformer模型里面涉及两种mask。分别是**padding mask**和**sequence mask**。其中后者我们已经在decoder的self-attention里面见过啦！
- **padding mask**在所有的scaled dot-product attention里面都需要用到
- **sequence mask**只有在decoder的self-attention里面用到。

所以，我们之前**ScaledDotProductAttention**的`forward`方法里面的参数`attn_mask`在不同的地方会有不同的含义。这一点我们会在后面说明。

### Padding mask

什么是**padding mask**呢？回想一下，我们的每个批次输入序列长度是不一样的！也就是说，我们要对输入序列进行**对齐**！具体来说，就是给在较短的序列后面填充`0`。因为这些填充的位置，其实是没什么意义的，所以我们的attention机制**不应该把注意力放在这些位置上**，所以我们需要进行一些处理。

具体的做法是，**把这些位置的值加上一个非常大的负数(可以是负无穷)，这样的话，经过softmax，这些位置的概率就会接近0**！

而我们的padding mask实际上是一个张量，每个值都是一个**Boolen**，值为`False`的地方就是我们要进行处理的地方。

下面是实现：

```python
def padding_mask(seq_k, seq_q):
	# seq_k和seq_q的形状都是[B,L]
    len_q = seq_q.size(1)
    # `PAD` is 0
    pad_mask = seq_k.eq(0)
    pad_mask = pad_mask.unsqueeze(1).expand(-1, len_q, -1)  # shape [B, L_q, L_k]
    return pad_mask
```

### Sequence mask

文章前面也提到，sequence mask是为了使得decoder不能看见未来的信息。也就是对于一个序列，在time_step为t的时刻，我们的解码输出应该只能依赖于t时刻之前的输出，而不能依赖t之后的输出。因此我们需要想一个办法，把t之后的信息给隐藏起来。

那么具体怎么做呢？也很简单：**产生一个上三角矩阵，上三角的值全为1，下三角的值权威0，对角线也是0**。把这个矩阵作用在每一个序列上，就可以达到我们的目的啦。

具体的代码实现如下：

```python
def sequence_mask(seq):
    batch_size, seq_len = seq.size()
    mask = torch.triu(torch.ones((seq_len, seq_len), dtype=torch.uint8),
                    diagonal=1)
    mask = mask.unsqueeze(0).expand(batch_size, -1, -1)  # [B, L, L]
    return mask
```

哈佛大学的文章[The Annotated Transformer](http://nlp.seas.harvard.edu/2018/04/03/attention.html)有一张效果图:

![sequence_mask](http://blog.stupidme.me/wp-content/uploads/2018/09/sequence_mask.png)  
*Figure 8. Sequence mask.*

值得注意的是，本来mask只需要二维的矩阵即可，但是考虑到我们的输入序列都是批量的，所以我们要把原本二维的矩阵扩张成3维的张量。上面的代码可以看出，我们已经进行了处理。

回到本小结开始的问题，`attn_mask`参数有几种情况？分别是什么意思？

* 对于decoder的self-attention，里面使用到的scaled dot-product attention，同时需要`padding mask`和`sequence mask`作为`attn_mask`，具体实现就是两个mask相加作为attn_mask。
* 其他情况，`attn_mask`一律等于`padding mask`。

至此，mask相关的问题解决了。

## Positional encoding是什么？

好了，终于要解释**位置编码**了，那就是文字开始的结构图提到的**Positional encoding**。

就目前而言，我们的Transformer架构似乎少了点什么东西。没错，就是**它对序列的顺序没有约束**！我们知道序列的顺序是一个很重要的信息，如果缺失了这个信息，可能我们的结果就是：所有词语都对了，但是无法组成有意义的语句！

为了解决这个问题。论文提出了**Positional encoding**。这是啥？一句话概括就是：**对序列中的词语出现的位置进行编码**！如果对位置进行编码，那么我们的模型就可以捕捉顺序信息！

那么具体怎么做呢？论文的实现很有意思，使用正余弦函数。公式如下：

$$PE(pos,2i) = sin(pos/10000^{2i/d_{model}}) $$

$$PE(pos,2i+1) = cos(pos/10000^{2i/d_{model}})$$

其中，`pos`是指词语在序列中的位置。可以看出，在**偶数位置，使用正弦编码，在奇数位置，使用余弦编码**。

上面公式中的$d_{model}$是模型的维度，论文默认是`512`。

这个编码公式的意思就是：给定词语的位置$\text{pos}$，我们可以把它编码成$d_{model}$维的向量！也就是说，位置编码的每一个维度对应正弦曲线，波长构成了从$2\pi$$到$$10000*2\pi$的等比序列。

上面的位置编码是**绝对位置编码**。但是词语的**相对位置**也非常重要。这就是论文为什么要使用三角函数的原因！

正弦函数能够表达相对位置信息。，主要数学依据是以下两个公式：

$$sin(\alpha+\beta) = sin\alpha cos\beta + cos\alpha sin\beta$$

$$cos(\alpha+\beta) = cos\alpha cos\beta - sin\alpha sin\beta$$


上面的公式说明，对于词汇之间的位置偏移`k`，$PE(pos+k)$可以表示成$PE(pos)$和$PE(k)$的组合形式，这就是表达相对位置的能力！

以上就是$PE$的所有秘密。说完了positional encoding，那么我们还有一个与之处于同一地位的**word embedding**。

**Word embedding**大家都很熟悉了，它是对序列中的词汇的编码，把每一个词汇编码成$d_{model}$维的向量！看到没有，**Postional encoding是对词汇的位置编码，word embedding是对词汇本身编码**！

所以，我更喜欢positional encoding的另外一个名字**Positional embedding**！

### Positional encoding的实现
PE的实现也不难，按照论文的公式即可。代码如下：

```python
import torch
import torch.nn as nn


class PositionalEncoding(nn.Module):
    
    def __init__(self, d_model, max_seq_len):
        """初始化。
        
        Args:
            d_model: 一个标量。模型的维度，论文默认是512
            max_seq_len: 一个标量。文本序列的最大长度
        """
        super(PositionalEncoding, self).__init__()
        
        # 根据论文给的公式，构造出PE矩阵
        position_encoding = np.array([
          [pos / np.pow(10000, 2.0 * (j // 2) / d_model) for j in range(d_model)]
          for pos in range(max_seq_len)])
        # 偶数列使用sin，奇数列使用cos
        position_encoding[:, 0::2] = np.sin(position_encoding[:, 0::2])
        position_encoding[:, 1::2] = np.cos(position_encoding[:, 1::2])

        # 在PE矩阵的第一行，加上一行全是0的向量，代表这`PAD`的positional encoding
        # 在word embedding中也经常会加上`UNK`，代表位置单词的word embedding，两者十分类似
        # 那么为什么需要这个额外的PAD的编码呢？很简单，因为文本序列的长度不一，我们需要对齐，
        # 短的序列我们使用0在结尾补全，我们也需要这些补全位置的编码，也就是`PAD`对应的位置编码
        pad_row = torch.zeros([1, d_model])
        position_encoding = torch.cat((pad_row, position_encoding))
        
        # 嵌入操作，+1是因为增加了`PAD`这个补全位置的编码，
        # Word embedding中如果词典增加`UNK`，我们也需要+1。看吧，两者十分相似
        self.position_encoding = nn.Embedding(max_seq_len + 1, d_model)
        self.position_encoding.weight = nn.Parameter(position_encoding,
                                                     requires_grad=False)
    def forward(self, input_len):
        """神经网络的前向传播。

        Args:
          input_len: 一个张量，形状为[BATCH_SIZE, 1]。每一个张量的值代表这一批文本序列中对应的长度。

        Returns:
          返回这一批序列的位置编码，进行了对齐。
        """
        
        # 找出这一批序列的最大长度
        max_len = torch.max(input_len)
        tensor = torch.cuda.LongTensor if input_len.is_cuda else torch.LongTensor
        # 对每一个序列的位置进行对齐，在原序列位置的后面补上0
        # 这里range从1开始也是因为要避开PAD(0)的位置
        input_pos = tensor(
          [list(range(1, len + 1)) + [0] * (max_len - len) for len in input_len])
        return self.position_encoding(input_pos)
    
```

### Word embedding的实现

Word embedding应该是老生常谈了，它实际上就是一个二维浮点矩阵，里面的权重是可训练参数，我们只需要把这个矩阵构建出来就完成了word embedding的工作。

所以，具体的实现很简单：

```python
import torch.nn as nn


embedding = nn.Embedding(vocab_size, embedding_size, padding_idx=0)
# 获得输入的词嵌入编码
seq_embedding = seq_embedding(inputs)*np.sqrt(d_model)
```

上面`vocab_size`就是词典的大小，`embedding_size`就是词嵌入的维度大小，论文里面就是等于$d_{model}=512$。所以word embedding矩阵就是一个`vocab_size`*`embedding_size`的二维张量。

如果你想获取更详细的关于word embedding的信息，可以看我的另外一个文章[word2vec的笔记和实现](https://github.com/luozhouyang/machine-learning-notes/blob/master/word2vec.ipynb)。

## Position-wise Feed-Forward network是什么？
这就是一个全连接网络，包含两个线性变换和一个非线性函数（实际上就是ReLU）。公式如下：

$$FFN(x)=max(0,xW_1+b_1)W_2+b_2$$

这个线性变换在不同的位置都表现地一样，并且在不同的层之间使用不同的参数。

论文提到，这个公式还可以用两个核大小为1的一维卷积来解释，卷积的输入输出都是$d_{model}=512$，中间层的维度是$d_{ff}=2048$。

实现如下：

```python
import torch
import torch.nn as nn


class PositionalWiseFeedForward(nn.Module):

    def __init__(self, model_dim=512, ffn_dim=2048, dropout=0.0):
        super(PositionalWiseFeedForward, self).__init__()
        self.w1 = nn.Conv1d(model_dim, ffn_dim, 1)
        self.w2 = nn.Conv1d(model_dim, ffn_dim, 1)
        self.dropout = nn.Dropout(dropout)
        self.layer_norm = nn.LayerNorm(model_dim)

    def forward(self, x):
        output = x.transpose(1, 2)
        output = self.w2(F.relu(self.w1(output)))
        output = self.dropout(output.transpose(1, 2))

        # add residual and norm layer
        output = self.layer_norm(x + output)
        return output
```

## Transformer的实现

至此，所有的细节都已经解释完了。现在来完成我们Transformer模型的代码。

首先，我们需要实现6层的encoder和decoder。

encoder代码实现如下：

```python
import torch
import torch.nn as nn


class EncoderLayer(nn.Module):
	"""Encoder的一层。"""

    def __init__(self, model_dim=512, num_heads=8, ffn_dim=2018, dropout=0.0):
        super(EncoderLayer, self).__init__()

        self.attention = MultiHeadAttention(model_dim, num_heads, dropout)
        self.feed_forward = PositionalWiseFeedForward(model_dim, ffn_dim, dropout)

    def forward(self, inputs, attn_mask=None):

        # self attention
        context, attention = self.attention(inputs, inputs, inputs, padding_mask)

        # feed forward network
        output = self.feed_forward(context)

        return output, attention


class Encoder(nn.Module):
	"""多层EncoderLayer组成Encoder。"""

    def __init__(self,
               vocab_size,
               max_seq_len,
               num_layers=6,
               model_dim=512,
               num_heads=8,
               ffn_dim=2048,
               dropout=0.0):
        super(Encoder, self).__init__()

        self.encoder_layers = nn.ModuleList(
          [EncoderLayer(model_dim, num_heads, ffn_dim, dropout) for _ in
           range(num_layers)])

        self.seq_embedding = nn.Embedding(vocab_size + 1, model_dim, padding_idx=0)
        self.pos_embedding = PositionalEncoding(model_dim, max_seq_len)

    def forward(self, inputs, inputs_len):
        output = self.seq_embedding(inputs)
        output += self.pos_embedding(inputs_len)

        self_attention_mask = padding_mask(inputs, inputs)

        attentions = []
        for encoder in self.encoder_layers:
            output, attention = encoder(output, self_attention_mask)
            attentions.append(attention)

        return output, attentions

```

通过文章前面的分析，代码不需要更多解释了。同样的，我们的decoder代码如下：

```python
import torch
import torch.nn as nn


class DecoderLayer(nn.Module):

    def __init__(self, model_dim, num_heads=8, ffn_dim=2048, dropout=0.0):
        super(DecoderLayer, self).__init__()

        self.attention = MultiHeadAttention(model_dim, num_heads, dropout)
        self.feed_forward = PositionalWiseFeedForward(model_dim, ffn_dim, dropout)

    def forward(self,
              dec_inputs,
              enc_outputs,
              self_attn_mask=None,
              context_attn_mask=None):
        # self attention, all inputs are decoder inputs
        dec_output, self_attention = self.attention(
          dec_inputs, dec_inputs, dec_inputs, self_attn_mask)

        # context attention
        # query is decoder's outputs, key and value are encoder's inputs
        dec_output, context_attention = self.attention(
          enc_outputs, enc_outputs, dec_output, context_attn_mask)

        # decoder's output, or context
        dec_output = self.feed_forward(dec_output)

        return dec_output, self_attention, context_attention


class Decoder(nn.Module):

    def __init__(self,
               vocab_size,
               max_seq_len,
               num_layers=6,
               model_dim=512,
               num_heads=8,
               ffn_dim=2048,
               dropout=0.0):
        super(Decoder, self).__init__()

        self.num_layers = num_layers

        self.decoder_layers = nn.ModuleList(
          [DecoderLayer(model_dim, num_heads, ffn_dim, dropout) for _ in
           range(num_layers)])

        self.seq_embedding = nn.Embedding(vocab_size + 1, model_dim, padding_idx=0)
        self.pos_embedding = PositionalEncoding(model_dim, max_seq_len)

    def forward(self, inputs, inputs_len, enc_output, context_attn_mask=None):
        output = self.seq_embedding(inputs)
        output += self.pos_embedding(inputs_len)

        self_attention_padding_mask = padding_mask(inputs, inputs)
        seq_mask = sequence_mask(inputs)
        self_attn_mask = torch.gt((self_attention_padding_mask + seq_mask), 0)

        self_attentions = []
        context_attentions = []
        for decoder in self.decoder_layers:
            output, self_attn, context_attn = decoder(
            output, enc_output, self_attn_mask, context_attn_mask)
            self_attentions.append(self_attn)
            context_attentions.append(context_attn)

        return output, self_attentions, context_attentions
```

最后，我们把encoder和decoder组成Transformer模型！

代码如下：

```python
import torch
import torch.nn as nn


class Transformer(nn.Module):

    def __init__(self,
               src_vocab_size,
               src_max_len,
               tgt_vocab_size,
               tgt_max_len,
               num_layers=6,
               model_dim=512,
               num_heads=8,
               ffn_dim=2048,
               dropout=0.2):
        super(Transformer, self).__init__()

        self.encoder = Encoder(src_vocab_size, src_max_len, num_layers, model_dim,
                               num_heads, ffn_dim, dropout)
        self.decoder = Decoder(tgt_vocab_size, tgt_max_len, num_layers, model_dim,
                               num_heads, ffn_dim, dropout)

        self.linear = nn.Linear(model_dim, tgt_vocab_size, bias=False)
        self.softmax = nn.Softmax(dim=2)

    def forward(self, src_seq, src_len, tgt_seq, tgt_len):
        context_attn_mask = padding_mask(tgt_seq, src_seq)

        output, enc_self_attn = self.encoder(src_seq, src_len)

        output, dec_self_attn, ctx_attn = self.decoder(
          tgt_seq, tgt_len, output, context_attn_mask)

        output = self.linear(output)
        output = self.softmax(output)

        return output, enc_self_attn, dec_self_attn, ctx_attn

```

至此，Transformer模型已经实现了！

# 改进

- 【2020-6-7】[模型压缩95%，MIT韩松等人提出新型Lite Transformer](https://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&mid=2650789244&idx=3&sn=498864894b6e1d584a45017911ce233c&chksm=871a1102b06d98144d851133ead6bd4c69f90843d6ed5ef4ef46f56bfc3256d46f43f463b419&mpshare=1&scene=23&srcid&sharer_sharetime=1591760786074&sharer_shareid=b8d409494a5439418f4a89712efcd92a%23rd)
	- MIT 最近的研究《[Lite Transformer with Long-Short Range Attention](https://arxiv.org/abs/2004.11886v1)》中，MIT 与上海交大的研究人员提出了一种高效的移动端 NLP 架构 Lite Transformer，向在边缘设备上部署移动级 NLP 应用迈进了一大步。该论文已被人工智能顶会 ICLR 2020 收录。[代码](https://github.com/mit-han-lab/lite-transformer)
	- 核心是长短距离注意力（Long-Short Range Attention，LSRA），其中一组注意力头（通过卷积）负责局部上下文建模，而另一组则（依靠注意力）执行长距离关系建模。
	- 对于移动 NLP 设置，Lite Transformer 的 BLEU 值比基于 AutoML 的 [Evolved Transformer](http://mp.weixin.qq.com/s?__biz=MzA3MzI4MjgzMw==&mid=2650756694&idx=4&sn=9de8bdbe79a5f4c45833f87418642111&chksm=871a9228b06d1b3e886f549543f8ba742ee120e4ca8f1780996fb241b6b6d05ca97882d5290b&scene=21#wechat_redirect) 高 0.5，而且它不需要使用成本高昂的架构搜索。
	- 从 Lite Transformer 与 Evolved Transformer、原版 transformer 的比较结果中可以看出，Lite Transformer 的性能更佳，搜索成本相比 Evolved Transformer 大大减少

# 参考资料

## 参考文章

1.[为什么ResNet和DenseNet可以这么深？一文详解残差块为何有助于解决梯度弥散问题](https://zhuanlan.zhihu.com/p/28124810)  
2.[GRADIENTS, BATCH NORMALIZATION AND LAYER NORMALIZATION](https://theneuralperspective.com/2016/10/27/gradient-topics/)  
3.[The Annotated Transformer](http://nlp.seas.harvard.edu/2018/04/03/attention.html#position-wise-feed-forward-networks)  
4.[Building the Mighty Transformer for Sequence Tagging in PyTorch : Part I](https://medium.com/@kolloldas/building-the-mighty-transformer-for-sequence-tagging-in-pytorch-part-i-a1815655cd8)  
5.[Building the Mighty Transformer for Sequence Tagging in PyTorch : Part II](https://medium.com/@kolloldas/building-the-mighty-transformer-for-sequence-tagging-in-pytorch-part-ii-c85bf8fd145)  
6.[Attention?Attention!](https://lilianweng.github.io/lil-log/2018/06/24/attention-attention.html)  

## 参考代码
1.[jadore801120/attention-is-all-you-need-pytorch](https://github.com/jadore801120/attention-is-all-you-need-pytorch)  
2.[JayParks/transformer](https://github.com/JayParks/transformer)  


