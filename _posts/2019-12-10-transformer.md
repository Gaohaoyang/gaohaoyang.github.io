---
layout: post
title:  Transformer知识点汇总
date:   2019-12-10 16:52:00
categories: 深度学习 
tags: 深度学习 自然语言处理 NLP Transformer BERT GPT Attention 
excerpt: Attention is all you need!
mathjax: true
---

# Transformer学习笔记


- [The Annotated Transformer](http://nlp.seas.harvard.edu/2018/04/03/attention.html),Harvard NLP出品，含pytorch版代码实现
- [The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)
- [Transformer模型的PyTorch实现](https://luozhouyang.github.io/transformer/),[A PyTorch implementation of the Transformer model in "Attention is All You Need"](https://github.com/jadore801120/attention-is-all-you-need-pytorch)

## 总结

- 针对rnn和cnn的缺陷，怎么解决这些问题呢？
   - 并行化
   - 提升长程依赖的学习能力
   - 层次化建模


## 背景

- 机器翻译是从RNN开始跨入神经网络机器翻译时代的，几个比较重要的阶段分别是: Simple RNN, Contextualize RNN, Contextualized RNN with attention, Transformer(2017)

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

Multi-head attention的公式如下：

$$\text{MultiHead}(Q,K,V) = \text{Concat}(\text{head}_ 1,\dots,\text{head}_ h)W^O$$

其中，

$\text{head}_ i = \text{Attention}(QW_i^Q,KW_i^K,VW_i^V)$

论文里面，$d_{model}=512$，$h=8$。所以在scaled dot-product attention里面的

$d_q = d_k = d_v = d_{model}/h = 512/8 = 64$

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

假设网络中某个层对输入`x`作用后的输出是$F(x)$，那么增加**residual connection**之后，就变成了：

$F(x)+x$

这个`+x`操作就是一个**shortcut**。

那么**残差结构**有什么好处呢？显而易见：因为增加了一项$x$，那么该层网络对x求偏导的时候，多了一个常数项$1$！所以在反向传播过程中，梯度连乘，也不会造成**梯度消失**！

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


