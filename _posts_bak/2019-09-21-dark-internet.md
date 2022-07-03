---
layout: post
title:  "暗网解密-Darknet"
date:   2019-09-21 15:03:00
categories: 互联网  
tags: 互联网 暗网 比特币
excerpt: 暗网背后的故事
mathjax: true
---

* content
{:toc}


# [密码朋克的社会实验（一）：开灯看暗网](https://www.secpulse.com/archives/93432.html)

- 转自：[密码朋克的社会实验（一）：开灯看暗网](https://www.secpulse.com/archives/93432.html)
- 发表时间：2018年12月19日

```
- 2018年3月8日，某视频网站800余万用户数据在暗网销售
- 2018年8月1日，某省1000万学籍数据出现在暗网
- 2018年8月28日，某酒店集团5亿数据疑似在暗网出售
```

本年度最严重的几次数据泄漏，都指向了同一个词——「`暗网`」。在中文的语境里，这是一个犹如「`月黑风高夜`」般的词汇，透着诡秘和犯罪的气息。而与「`暗网`」关系最密切的另一个词，则非「黑客」莫属。「黑」与「暗」的组合，意味着高超的匿名和隐身技巧，令人忍不住想揭开它精巧的面纱。



## 暗网是什么

要解释暗网，先给整个互联网做一个简单的分层定义，如图：

![](https://www.secpulse.com/wp-content/uploads/2018/12/internet.png)

- `表网`（Surface Web）：通常认为，普通用户或者搜索引擎能直接访问的内容属于表网。表现形式为网页或者 APP 提供的内容。
- `深网`（Deep Web）：指不能被标准搜索引擎检索到的网络数据。通常是存储在各公司或组织的数据库中，需要用专有的接口查询或干脆不对外查询，例如 Google 的后端数据库。深网数据量远大于表层网络，犹如海面和大海的关系。
- `暗网`（Dark Web）：需要通过特殊的加密通道访问的网页或数据。暗网通常具有匿名的特性，既保证访问者的匿名，同时也保证服务提供者的匿名。因此，其中充斥着各种犯罪信息和违法交易（*支、毒品、色情、暴恐、黑客等）。

暗网有多个不同的实现版本，下文我们说暗网特指「`Tor 网络`」。

网络上有些说法说暗网远大于表层网络，其实很不严谨，是把深网和暗网混为一谈了，真实的暗网只有一小部分人使用，远小于大众使用的表层网络。


## 谁创造了暗网

➢ 密码朋克

故事要从90年代的一个极小众群体说起——「`密码朋克`」。这是一个由顶尖数学家、密码学家和程序员组成的群体，他们关注「匿名、自由、隐私」，其中许多人抱着自由主义和无政府主义的理念，并在美国掀起了「`加密无政府主义运动`」，他们以密码学和互联网为武器，与强权展开直接对抗。

正是这群人，创造了许多加密技术和协议，也奠定了互联网的许多底层技术和通信协议，从加密邮件到 HTTPS，从 RSA 到区块链，等等等等。

![](https://www.secpulse.com/wp-content/uploads/2018/12/punk.jpg)

➢ 国外政府部门

花开两朵，密码朋克们希望保护自己的信息和隐私不被政府获取；而政府同样也有这个需求，甚至更强烈得多，因为他们要保证情报的传输安全，同时要保护情报人员传递信息时无法被网络追踪。因此，1995年，美国海军研究实验室也进行了匿名网络的相关项目研究，这也就是暗网的前身。

2004年，「`Tor 洋葱网络`」正式对外发布，意味着普通用户也可以使用匿名网络技术来保证自己的匿名性。也就代表着「暗网」这个概念正式走向公众。为什么叫洋葱网络，因为其中的通信内容被三重加密，像洋葱一样，剥开一层还有一层。

![](https://www.secpulse.com/wp-content/uploads/2018/12/tor.png)

Tor 网络虽然理论上比较安全，但其中的中转节点是由志愿者部署，如果掌握了其中足够的节点，也是有概率进行完整通信追踪的。而且这毕竟是孵化自美国海军的一个项目，是否有一些精心构造的安全缺陷，难以确认。


## 暗网上的数据泄露

一个能保证访问者和服务提供者都匿名的网络，天生就是法外之地。

因此，各路违法信息交流充斥暗网，尤其是2011年后，由于比特币技术的兴起，暗网终于从「`匿名的信息交流`」进化到了「`匿名的价值交换`」阶段，这个颠覆性变革，随着「Silk Road」的建立（`丝绸之路`：可以理解为基于比特币的暗网淘宝），掀起了违法交易的高潮。当然，大概同时也掀起了 FBI 相关部门的加班高潮。

很巧的是，同样是2011年底，国内发生了一轮标志性的大规模的用户数据泄漏事件，之后各种数据泄漏就成为了每年的常态。早期此类数据交易往往是黑客私下交易，而近年来逐渐被搬到暗网进行交易。为此，腾讯安全云鼎实验室对暗网的主要交易平台进行了监测，并抽取了近几个月针对国内用户的数据泄漏的情况进行了统计。

![](https://www.secpulse.com/wp-content/uploads/2018/12/leak-1024x773.jpg)

可以看到，近期泄漏数据，主要以网购/物流/身份证/酒店/社交帐号数据为主。

 

暗网上的业务

暗网最大的几个市场均在近年被 FBI 捣毁，如 Silk Road、AlphaBay，因此，2017年来暗网黑市有所收敛，并不如前几年火爆。我们统计了目前存在的几大市场商品分类，可以看出，毒品/药物类还是占据了超过50%的份额，海外使用违禁药物的情形非常严峻，其次是数字商品类，并充斥着各种色情、黑客、*支、护照、假钞等违法内容。

![](https://www.secpulse.com/wp-content/uploads/2018/12/market-1024x686.jpg)


## 暗网匿名原理

暗网最重要的作用是保证匿名，其匿名性体现在两个方面：
- 访问普通网站时，网站无法得知访问者 IP 地址。
- 提供暗网服务时，用户无法得知服务器 IP 地址。

两个能力加起来则保障了暗网用户访问暗网网站时，双方都无法得知对方 IP 地址，且中间节点也无法同时得知双方 IP 地址。

听起来挺科幻的，毕竟我们平时使用的 VPN 等科学上网技术只使用了一层跳板，而 Tor 技术使用了三层跳板。

关于 VPN 的原理，可以参考下图：

![](https://www.secpulse.com/wp-content/uploads/2018/12/vpn.jpg)

下面对暗网匿名原理进行详细解析：

➢ 访问普通网站

先来看一个真实访问普通网站的跳转情况：

![](https://www.secpulse.com/wp-content/uploads/2018/12/link1-1024x595.png)

从上图可以看到，我们使用浏览器访问 google.com，但中间经过了3个节点 IP 地址，分别在匈牙利、西班牙、德国，然后再访问到谷歌的服务器。

Tor 用户针对普通网站访问流程，如下图所示。Tor网络中的每个节点都是随机选取，且每个节点看到的信息不超过一跳，所以通过网络流量监控嗅探到的 Tor 流量不能同时获取通信两端的 IP 信息；且每一个节点处都是加密形式。

这里随机选取的三个节点的功能顺序是：入口节点、中间节点、出口节点；

数据流方向为：客户端、入口节点、中间节点、出口节点、WEB 服务器。

![](https://www.secpulse.com/wp-content/uploads/2018/12/tor1-1024x590.jpg)

Tor 网络有其特有的加密方式--三层密钥加密。三层密钥的建立是在网络请求的初始，当和下一个节点连接时创建一对非对称密钥，三个随机节点共创建了三对密钥并将公钥回传到客户端。数据经客户端三层密钥加密后，进行Tor 网络的传输，每经过一个节点，便解开一层加密，顺序依次为：入口节点解开第一层加密，中间节点解开第二层加密，出口节点解开第三层加密。通过层层加密让流量监控无法嗅探明文数据。

➢ 访问匿名网站

先来看一次真实访问匿名网站的跳转情况：

![](https://www.secpulse.com/wp-content/uploads/2018/12/link2-1024x728.png)

从上图可以看到，我们通过浏览器尝试访问一个奇怪的域名（uffti3lhacanefgy.onion），但和前面普通网站不一样的是，中间经过了6个节点，其中前3个可见 IP，另外3个命名为 Relay，然后再访问到那个奇怪的域名。

这个访问匿名网站的流程比较复杂，在普通互联网上，当我们知道网站域名时，通过 DNS 协议解析到 IP 地址，然后访问。但 Tor 网络域名是 .onion 为后缀，并不是使用普通的 DNS 方式来解析，而是使用下面的方法。

![](https://www.secpulse.com/wp-content/uploads/2018/12/tor2-1024x555.jpg)

下面我们结合 torproject.org 网站介绍的洋葱服务协议、业界约定俗成的各个环节的名称、及上面的原理图进行 Tor 访问匿名网站的原理复盘。在原Tor网络上增加了承载暗网网址导航功能的目录数据库(DB)，暗网服务器选定的允许与其通信的介绍点(Introduction point)，及进行两端数据传输的最终会合点(Rendezvous point)。原理图中的每一步连接，都是建立在 Tor 网络的三跳连接之上，杜绝流量监控嗅探到明文数据。下面我们了解一下访问匿名网站的过程。
- step 1: 暗网服务器连入 Tor 网络，并隐匿IP信息
   - 这一步是通过介绍点来完成，方法是暗网服务器选取若干节点充当介绍点，建立Tor线路；并以介绍点充当影子功能，隐匿IP信息。
- step 2: 暗网服务器通过向目录数据库注册，公示自身的存在
   - 这一步是通过目录数据库来完成，目录数据库收录了各个暗网服务器上传的自身标识（公钥、对应介绍点摘要等），这些标识以自身的私钥签名。暗网服务器的域名(例：uffti3lhacanefgy.onion)由公钥派生。
- step 3: 客户端获取暗网网址对应的标识信息，拿到网址对应的公钥与介绍点
   - 这一步是客户端通过Tor线路访问目录数据库拿到的结果，此外还进行标识的篡改验证。
- step 4: 客户端随机选取节点构建会合点，为后续与暗网服务器传输数据做准备
   - 这一步是会合点的生成，除为选取的会合点创建Tor线路外，同时会合点还会收到一次性「验证信息」，用来校验暗网服务器。
- step 5\6: 客户端通过介绍点，通告暗网服务器会合点的地址和「验证信息」
   - 这一步的核心是让暗网服务器知道会合点的存在，媒介是客户端在目录数据库中获取到的对应暗网网址的介绍点，同时传递了后续用来对接验证的「验证信息」。
- step 7: 暗网服务器通过Tor线路连接会合点，最终与客户端达成数据传输
   - 这一步暗网服务器也通过Tor线路与会合点建立连接，但两端还未达成真正的通信，必须进行「验证信息」的核实，当真正验证成功后，才能达成真正的通路。

经过以上复杂流程，客户端和暗网服务器建立通信成功，形成一个上面截图的六跳连接，并成功保证了双方的匿名性。



## Tor 网络节点

从前面可以看到，暗网的匿名性基于其众多的节点，但如果部署足够多的节点，是否就能探测到双方的 IP 地址和通信数据呢？先来看看暗网节点的情况。

➢ 节点介绍

暗网节点一共分为以下3类：
- 入口节点/中间节点
   - 入口节点和中间节点没有本质的差别，通常各 IDC 运营商都允许服务器被部署为入口节点和中间节点，新节点上线只能是中间节点，当稳定性和带宽都比较高时，才允许被升级为入口节点。
- 出口节点
   - 出口节点从技术上看和入口节点一样，但通常 IDC 运营商是不允许服务器部署出口节点的，因为如果引发了犯罪行为，由于无法进行往回追踪，会导致运营商背锅。因此，出口节点通常是学术机构、ISP、科研单位、公共图书馆等才会部署。
- 网桥
   - 由于入口节点是公开的，因此很容易被封锁。为了保证这些地区的人也能访问 Tor 网络，还存在一个秘密的入口列表，称之为网桥节点。这个秘密列表每次只可以查询到3个入口节点，通过一些机制保证不能简单被遍历，以此来对抗封锁。

➢ 节点数据
截止当前，目前运行的 Tor 节点数量大概有7500，普通节点大约6500，网桥节点接近1000。 

![](https://www.secpulse.com/wp-content/uploads/2018/12/118-1024x597.png)

普通节点中，入口节点（Guard）大约2400，出口节点（Exit）大约800多。 

![](https://www.secpulse.com/wp-content/uploads/2018/12/24-1024x597.png)

从这个数据来看，假设我们在「入中出」三类节点中各有一台机器，能检测到完整数据的概率大约是 1/(3400 * 800 * 3300) = 1/8976000000。大约是九十亿分之一。

其中大多数节点主要分布在欧美国家。 

![](https://www.secpulse.com/wp-content/uploads/2018/12/map-1024x562.png)

➢ 节点详情
完整的公开节点列表可以在以下网址查询到 https://torstatus.rueckgr.at/，云厂商可以根据这个列表进行自查。

![](https://www.secpulse.com/wp-content/uploads/2018/12/relays-1024x603.png)

（部分节点详细数据）

 

## Tor 用户

全球每天使用 Tor 网络的用户基本稳定在200万人，相对于数十亿的互联网用户，其实非常小量，而其中访问暗网匿名网站的用户更是其中的一小部分。

![](https://www.secpulse.com/wp-content/uploads/2018/12/36-1024x597.png)

暗网用户分布国家 TOP10。

![](https://www.secpulse.com/wp-content/uploads/2018/12/%E8%A1%A8.jpg)


## 其它平行网络

前面说过，Tor 网络只是暗网的一个实现版本，其他的还有 Freenet 和 I2P 网络，但用户量远远低于 Tor，因此仅作了解就好。

近年来由于区块链技术的发展，又出现了一种基于区块链技术的分布式匿名网络，其典型例子是 ZeroNet（零网）。

![](https://www.secpulse.com/wp-content/uploads/2018/12/zero-1024x687.png)

具体用法可以参见官网，https://zeronet.io，用来搭建自己的网站，不但匿名，甚至无需服务器。

 

写在最后：
>技术本身是中立的，尤其是在密码学的领域，一方面保障着整个互联网的安全和信任基础，一方面也包庇了暗网下的种种犯罪。Tor 网络也一样，一方面为大众提供了一种安全的匿名方案，一方面也为非法交易提供了温床。阴阳总是交融地存在，所幸黑色领域终究是少数，如何将黑色领域尽量压缩，道阻且长。

揭开了暗网的面纱，本系列下一篇，将用最科普的方式，继续讲述暗网背后的密码学原理。

参考资料：
- [1] [Tor: Overview](https://www.torproject.org/about/overview.html.en)
- [2] [Tor: Onion Service Protocol](https://www.torproject.org/docs/onion-services)
- [3] [Tor: Relays and bridges](https://metrics.torproject.org/networksize.html)
- [4] [Tor: Relays by relay flag](https://metrics.torproject.org/relayflags.html)

# [暗网：比特币被始乱终弃之地](https://zhuanlan.zhihu.com/p/43183901)

- 时间：2018年8月28日

![](https://pic2.zhimg.com/80/v2-e139ef68b754dd27e1064ef678c2a4e9_hd.jpg)

>“96%的互联网数据无法通过标准搜索引擎访问，虽然其中的大部分属于无用信息，但那上面有一切东西，儿童贩卖、比特币洗钱、致幻剂、大麻、赏金黑客……”——《纸牌屋》

文：李金三

2018年大热的区块链让很多人都成了币圈的韭菜，连最近常见的攻击事件也都与挖矿或币圈交易所遭窃有关。在此之前，暗网才是加密货币的主场。

根据 Recorded Future 在 2018 年年初发布的报告，短短几年内，暗网中交易所使用的货币虽然依旧以比特币为主流，但更方便、更安全的莱特币乃至门罗币等加密货币也逐渐风靡。

## 01 暗网真相

真相：暗网流量仅占全网0.05%

我和大多数网友一样，对计算机技术一窍不通，如果没有高人帮助，我连暗网的门都找不到。几经周折，我找到了一位有故事的老师傅来帮忙，我给他起了一个名字：老斯基。

老斯基是一名淡泊名利的电脑基础知识爱好者，虽然已经玩了20多年的扫雷，但他从不提起自己的过去，现在是一名合法的网络安全公众号作者，每天向大家揭露黑产和网络骗局。

>“你是不是听过一种说法：`暗网`和`表网`就像一座漂浮的冰山，表网是浮在水面上的部分，海面之下暗网占据了96%？”

还没等我正式提问，老斯基先向我抛出了一个问题。

冰山理论：
>由于媒体对章莹颖绑架案大量猜测性报道，大量群众第一次得知暗网的存在，在媒体的描述中，互联网就像一座巨大的冰山，大部分网站都潜藏在水面之下。

但是，96%无法通过搜索引擎搜索到的互联网数据，其实是深网，暗网只是深网的一部分。

![](https://pic2.zhimg.com/80/v2-19002a097d9c99d4c9cef1e9c9ecfe49_hd.jpg)

2017年6月9日，中国访美学者章莹颖遭绑架案，虽然案发仅20天犯罪嫌疑人便落网，但时至今日，章莹颖仍未被找到。与此同时，暗网开始以“冰山”的印象走进人们视野。

>“事实上，与数十亿人次访问的表网相比，暗网的规模小得多。每天使用 Tor 的人只有约 200 万，而这 200 万人中，也只有一小部分去访问暗网，以访问人数计算，暗网流量不会超过全网的0.05%（由互联网数据研究机构 We Are Social 和 Hootsuite 共同发布的“数字 2018”互联网研究报告称：2017年全球互联网用户总数已达40亿）。不过，就有效信息量来说，也许还是暗网更胜一筹。”

老斯基给我上了关于暗网的第一堂课。

![](https://pic1.zhimg.com/80/v2-6fd76b6af50ca9cc84fa4bca690473c8_hd.jpg)

如图，表网占4%，深网占96%，暗网仅占深网的一小部分

这张流传甚广的图片十分形象的向我们描述了暗网和表网的关系，同时让我们误以为水面下96%全是肮脏的罪恶。

其实不然，在这96%的“深网”中绝大部分都是“无用信息”，也包括校园网、企业OA系统，政府内部网络等不对大众开放的区域网络，准确应该称为“深网”。

尽管网络上对暗网规模的统计有12万到30万个网址等不同数据，但据老斯基说，能真正被称得上是暗网的网址不过7000到10000个。

>“暗网里面不全是罪犯和恐怖分子，更多的是各国的异见者、潜伏的记者、卧底的警察、甚至还有观光的游客。”

老斯基话里有话，我就是那个“观光的游客”。

如果你想进入暗网，需要通过Tor浏览器。通过这个浏览器上网无法被追踪，个人隐私丝毫不会泄露。

这听起来非常酷，毕竟当今个人数据被滥用已经不是什么秘密了。

![](https://pic2.zhimg.com/80/v2-f9a5927ad0680db6aa33b5f34753de45_hd.jpg)

2018年3月26日，李彦宏出席某论坛表示“<font color='blue'>中国人不在乎隐私</font>”，引起舆论激烈反弹。

在他的启发下，我开始使用Tor登陆暗网。

当时的心情还是挺兴奋的，那种感觉好比我10岁时候第一次去网吧，又如我大一时第一次使用IPv6协议时候的感觉。

首先Tor长这个样子，几乎可以说是firefox的开放版。

![](https://pic2.zhimg.com/80/v2-b1dce5983e08ae05407fe4d2fbb5f405_hd.jpg)

尽管有心理准备，但想象是一回事，亲眼看到又是另一回事，暗网里的事物之丰富远远超出了我的想象。﻿

![](https://pic3.zhimg.com/80/v2-9e27ce6536920ecefa36d93cb55e16da_hd.jpg)

上图是一个传说中的比特币场外交易网站，在这个网站购买BTC不会在任何中心化交易所留下痕迹。

![](https://pic3.zhimg.com/80/v2-94ac933d587cdf1eaff1fdfb1a26e5e2_hd.jpg)

这图上是一个信息贩卖网站，主要卖paypai和ebay的账户信息，似乎1个账户信息只需要1美元。

![](https://pic3.zhimg.com/80/v2-93caeaf358b0679b177da8591103dbf6_hd.jpg)

﻿当然少不了卖假钞的，网站介绍里说这些钱不能存进银行，但能在店里花。按当下“汇率”是用26美元就可以买到100美元份额假钞。

在这里想到很多年前古天乐主演的一部警匪电影，电影中古天乐收到一大笔黑钱（连号真钞），最终无奈全部烧掉。

![](https://pic1.zhimg.com/80/v2-ff266d9f4716f794d5fa2b9dcd167de8_hd.jpg)

美国信用卡体系十分健全，导致当地人有“毒贩才用现金交易”的刻板印象。

![](https://pic2.zhimg.com/80/v2-de072b3fd7d700129632a9ad1f67afd9_hd.jpg)

暗网上卖的最多的手机是苹果手机，只需要不到2000块钱就能买到一部苹果7 128G，全美包邮。

![](https://pic1.zhimg.com/80/v2-1f44efb68c321d7aa4fc69591de9800c_hd.jpg)

最让我感兴趣的是这家体彩信息网站，网站号称控制着58个不同国家的不同体育团队。此处应当@矮大紧。

![](https://pic2.zhimg.com/80/v2-34722bea944a94c8c1a1a8bf185b63a9_hd.jpg)

2014年世界杯期间，高晓松在节目中大谈“假球论”。

![](https://pic3.zhimg.com/80/v2-0fcbf7f76b84e3f235e652c89405f0d2_hd.jpg)

暗网上几乎各国护照、户籍都有卖，比如上图这个网站中只需要1000美元就能成为“美国人”。

如果是真的，潜逃成本会很低，大佬们应该人手一份。

不过，如果你真的因为好奇、贪图便宜和寻求刺激，在暗网下单，那么，你有很大的概率成为诈骗者利用你这种心理钓到的又一条小鱼儿。

![](https://pic2.zhimg.com/80/v2-b88c4159b2ba523edf09b10786e31259_hd.jpg)


## 02 暗网=Tor+BTC

在暗网中，我遇到了一位年仅20岁的少年骇客赵日天。赵日天这个名字是我经过深zhi思shang熟nian虑ya后给他起的。

赵日天学习很好，5岁接触奥数后便一发而不可收拾，一路竞赛加保送，15岁便“跑”进北大攻读数学，某次非常偶然机会他开始自学编程，现在是一名“光荣”的北大肄业生。

相比于老斯基，赵日天不仅乐于分享，而且浑身充满着中二气息，但就是这么一个阳光的一个骚年，为我揭开了暗网里最残忍的一角。

>“你确定你进暗网了吗？哈哈哈哈哈哈哈哈”

赵日天的打字速度极快，主要体现在每句话后面那一串哈哈哈。

还没等我回复，他又甩过来一大串网址。

![](https://pic4.zhimg.com/80/v2-c14a9e844dc64fb9430befcbd29574f7_hd.jpg)

和表网相比，暗网网址像乱码。

由于缺乏心理准备，接下来的内容给我幼小的心灵蒙上了一层巨大的阴影。建议以下内容请18岁以下的宝宝在大人陪同下阅读！

![](https://pic1.zhimg.com/80/v2-84c4c542e50365b48137e2417e17ec68_hd.jpg)

还记得那个叫许豪杰的恶魔么？暗网里最臭名昭著的莫过于儿童色情网站，赵日天告诉我，暗网百分之八十的流量都进入了这里面，图片我全都打码了。

![](https://pic3.zhimg.com/80/v2-21b6ecaa127275b286d6d964c379ec16_hd.jpg)

一个名叫“你最小的女儿”的儿童色情网站，里面的“受害者”全部都是未成年少女，普遍只有十二三岁，最小的孩子只有五六岁。第一次觉得马赛克不是坏东西。

“暗网中存在超过一亿份儿童色情影像（2016），和大量的儿童色情视频服务和直播。有网站甚至要求用户上传 "原创" 的虐待儿童的视频，才能允许进入网站，以避免被举报和发现的危险，因为那样就意味着进入网站的用户也都犯下了相同的罪行。”

![](https://pic2.zhimg.com/80/v2-0d9428e2cabe2f6b13f0a58ef717d0ad_hd.jpg)

一部纪录片邀请到菲律宾当地一个非政府公益组织的工作人员向我们揭露，菲律宾宿务岛上有这样的村镇，几乎全村的小女孩都成为了儿童色情产业的牺牲品。

在妈妈的引导下，懵懵懂懂中为了生存便向镜头和镜头对面的陌生成年男人，展示自己的身体。

![](https://pic3.zhimg.com/80/v2-e993a78cecf7bca01b01bb7b33f001a2_hd.jpg)

片中一位小女孩说，她身边几乎所有人都加入了这个 "行业"，而她似乎也 "自愿" 选择了加入。

![](https://pic3.zhimg.com/80/v2-c08ec373a61761151347915498c01f46_hd.jpg)

小女孩说着说着就落下泪来。

魔鬼最残酷的招数不是不由分说地拿走你所珍视的一切使你落入不幸，而是在通往地狱的道路上铺满鲜花撒上糖果，让你以为你最终的不幸是自己的选择。

这里的孩子，哪里有选择？他们不知道世上还有别的路。

![](https://pic4.zhimg.com/80/v2-79084e49bc07a5f7ffc9ffe8b029b067_hd.jpg)

对我来说，这事儿有点太超纲了，然而暗网中还有更反人性的事情。

人口买卖在暗网中是真实存在的，被绑架来的“性奴”会被强迫进行色情直播。而此类事件最轰动的莫过于去年7月一个英国模特去拍片，差点被当成性奴在暗网上卖掉的新闻。

![](https://pic1.zhimg.com/80/v2-9af250ed580b74b7d96ccce414eb0e68_hd.jpg)

2017年7月，一个20岁的英国模特妹纸接到了一个拍片邀约。对方表示，工作室在意大利米兰，需要妹子过去一下，报销路费，安排好了住宿。妹子和经纪公司都没察觉出什么问题。于是到了约定好的时间，妹子就直接去了米兰。

结果妹子的手臂上被注射了一种会导致四肢无力的药水，随后绑匪把她绑起来，塞进了行李箱。

![](https://pic3.zhimg.com/80/v2-fb17428cc7376acb4ed325536210210e_hd.jpg)

事情后来的发展超出了大多数人的意料，原来这个妹子虽然只有20岁，却已经是一个2岁孩子的妈妈，绑架她的戏精绑匪说：
>“虽然我绑架了她，强奸了她，并企图卖了她，但我是个'好绑匪'，她是一个2岁孩子的妈妈，‘好绑匪’是不会卖买妈妈的！”

当然绑匪还说：“我没说过上面那句话。”

上面那段是开玩笑，虽然最后妹子被救，绑匪被抓，但我认为这件事开了一个很不好的头，这个绑匪虽然有点中二，但终归还保留了人性最后的余温，而媒体的大肆渲染可能会促使下一个遇到相似境遇的绑匪做出完全相反的决定。

我在暗网中的最后一站是大名鼎鼎的“丝路”，这是一个以毒品交易为主的网站，在这里，大麻的价格比香烟高不了多少。

![](https://pic1.zhimg.com/80/v2-a406b42e9c5ea49ba3f073bbc71b4484_hd.jpg)

丝绸之路也卖枪，但进入枪支页面需要登录，而且验证码是“选出大麻”。

![](https://pic1.zhimg.com/80/v2-e1db034e24ad87dd686e4bf25b4f8510_hd.jpg)

没有什么比这还黑色幽默了，我看着这些图片一脸懵逼，显然这道题难度严重超纲！由于我不想注册也认不出大麻，所以我从别的网站里截几张图，让大家看下暗网怎么卖枪。

![](https://pic1.zhimg.com/80/v2-ce414f225a89ffef3695f324aca0f364_hd.jpg)

这个网站里只需要4400块钱就可以买到一把格洛克19，当然还需要买子弹，一颗子弹4块钱。

![](https://pic4.zhimg.com/80/v2-a43cc83d87e8336f6016413b3a4978db_hd.jpg)

一把自动步枪比苹果手机都便宜。你觉得这是真货么？

令人高兴的是，在众多网站中，我并没有找到中文网站，而只是通过别的文章推荐看了一个小小的中文论坛。

在过往记录中还找到一位因为过不了安检而回不了家的湾湾同胞。

![](https://pic4.zhimg.com/80/v2-190d231bc3062a0d1a8c7c855265e8e3_hd.jpg)

某竹联帮成员在热心网友的帮助下回家过年。

据说在更隐秘的暗网中还有坦克导弹等重火力武器，但为了自己的身心健康，我对各种内容的探索皆浅尝辄止。

“现在后悔了么，哈哈哈哈哈哈哈哈嗝”。受到赵日天嘲笑后，我借机向他询问了对暗网的看法。这次赵日天并没有很快的回答我，在我以为聊天要凉凉的时候，赵日天难得打了一串不带哈哈哈的回复：

“暗网=Tor+BTC。”

## 03 比特币的“原罪”

在赵日天看来，Tor和BTC的发展已经偏离最初的初衷。

就像电影里的情节一般，Tor这种“邪恶”的技术最初也是美国军方鼓捣出来的。

根据赵日天的说法，早在1996年，美国海军并提出打造一个隐秘系统。这个系统会让任何使用者在连接互联网时都会实时处于匿名状态，而不会向服务器泄露身份。

“一来可以保护各个国家的异见者，普及美国人眼中的普世价值；二来能够为美国的情报人员提供信息交流的安全之所，哈哈哈哈哈哈哈哈。”

![](https://pic2.zhimg.com/80/v2-3a23d7c38c5a1b3c29729a40f6537925_hd.jpg)

2003年10月，这一想法开始正式实施，为使用者提供免费的匿名网上场所。由于保护数据的密码就像洋葱一样层层包裹，这个系统最终被称为Tor（The Onion Router）。

直到2011年，其60%资金仍来自美国政府，而维基解密则承担了剩下的很大一部分费用。

![](https://pic1.zhimg.com/80/v2-f11c46fbe8b43042fc46bfc3a3ed70dc_hd.jpg)

维基解密早期爆料几乎全部来自Tor，直至今日，Tor仍是其主要信源之一。

由于设计之初，就已经以不让任何软件检测到浏览痕迹和IP地址为目的，这个由美国政府亲自养大的网站，甚至强大到连设计者都无法销毁。好死不死就在这个时候，美国国家安全局（也就是你们在美剧里总是听见的那个 NSA）批准将Tor向大众开放，成为开源项目。于是 " 暗网 " 便就此诞生了。

![](https://pic1.zhimg.com/80/v2-7b9eb687424f84c076595e271fbe22dc_hd.jpg)

2012年，“棱镜”项目揭秘者斯诺泄露了一份美国国土安全部内部的一篇《Tor糟透了》的文章。文件讲述了国土安全部在摧毁Tor过程中遭遇的种种困难，并很悲观地表示：“我们将永远无法破解所有Tor用户的真实身份。”

“如果只是Tor还成就不了今天暗网，哈哈哈哈哈哈哈哈”。

2009年，比特币横空出世。就像普通的现金在现实生活中的作用一样，比特币在互联网上可以用于任何交易，而且可以全世界流通和提现，一些网站甚至能接受比特币兑换美元、欧元等服务。

更重要的是，它允许匿名，没有人能追查使用者在购买非法物品时的交易记录，所以比特币的发明使得暗网如虎添翼。

就向前文中大家看到的那样，暗网中“儿童贩卖、比特币洗钱、致幻剂、大麻”通通是以比特币做计价交易的。

“如果没有比特币，给他们十个胆子也不敢去贩卖儿童色情视频，哈哈哈哈哈哈哈。”显然不止是赵日天一个人有这种想法。

![](https://pic2.zhimg.com/80/v2-c2d23f45009c7c58a1c0b86bb71af6c1_hd.jpg)

比特币在中国的待遇，堪称“看不惯又干不掉”的封杀史。

>“比特币已经落伍了，现在已经出现了更适合暗网交易的加密货币，这帮罪犯真TM的有才，哈哈哈哈哈哈哈哈”。被赵日天“夸赞”的是门罗币（XMR）、莱特币（LTC）、达世币等算力更加分散，匿名性更胜一筹的加密货币。
>
>众所周知，比特币交易具有极强的匿名性，虽然每笔交易都“记录在案”，但交易者双方身份几乎无法确认。“其实比特币的匿名技术并非无懈可击，哈哈哈哈哈哈哈哈。”赵日天如是说。

德国和瑞士学者的一项研究显示，约40%比特币用户的真实身份可被发现，这其中有些用户还使用了官方推荐的隐私保护措施。

加州大学圣地亚哥分校研究者即将发表的一篇论文中称，比特币交易网络对少数大账户的依赖性与日俱增，这使得用户的身份安全性大大降低。日后，通过大宗交易追踪到交易者的真实身份将变得容易，这最终可能会使得如今被大量用于洗钱等非法活动的比特币不再受宠。

乔治梅森大学的研究人员发布了一篇涉及到监管比特币的入门书，书中的评价大大降低了它的匿名性。

![](https://pic2.zhimg.com/80/v2-58124889a8cfb7c79206f34734f76dd9_hd.jpg)

大额地址/交易监控APP，最小白的韭菜也知道观察大户钱包动态。

在各个国家情报部门的监督下，比特币正在丧失匿名性，变得越来越透明。加拿大魁北克省首席科学家 Remi Quirion 的调查报告显示，在暗网中与洗钱有关的比特币交易，其比例在不断下降，从2013 年的1.07%下降到了2016年的0.12%。

“只要正确使用比特币，便足以不让别人知道你的身份，但显然门罗币就是为了暗网交易而诞生的。”

以门罗币为例，核心开发团队每过一定的时间会对共识机制的算法进行修改与进行硬分叉，以确保能够有效对抗ASIC的出现与算力垄断。除此之外，门罗币在区块链模糊化方面与比特币有显著的算法差异，在门罗币的网络中，只有交易双方能够看到交易数量和地址，这两点变化致使比特币的缺点不会在门罗币身上出现。

“技术发展到这一步已经失控了，等到去中心化交易所成熟，暗网里的交易将无人能够阻止，哈哈哈哈哈哈哈哈。”

“问题不是出在技术上！”老斯基则表达了与少年骇客赵日天不同的意见。

![](https://pic4.zhimg.com/80/v2-1010da21645ff8e22f47dd27d8fc119b_hd.jpg)

2016年1月，快播案全网直播，王欣的“技术无罪论”刷爆各大网站，至今还影响着中国的互联网。

虽然舆论最终判定技术“有罪”，但显然不止一个人和王欣想法相同。“总有人把人性的恶归结给工具。”老斯基说了一句老生常谈的话。

“起初是没有那些东西的，你知道的，就是你后来在暗网上看到的那些东西。大家一开始只是为了保护个人的隐私，制衡失控的权力。”

老斯基从根本上否定罪恶和技术的关系。“几张图片，几段视频就让你愤怒了？就让你觉得这是人性最深处的恶了么？如果有人用BTC贩毒就是脏的，那纸币是脏的吗，黄金是脏的吗？”

当我说，法币可监管，Token无法监管，老斯基继续抛出了N个反问句：“法币的监管杜绝了罪恶了吗？毒贩都不用纸币交易了？还是这个世界上没有毒品了？”

![](https://pic3.zhimg.com/80/v2-d2b3f7af56935423eaa050ce8b49bdfe_hd.jpg)

老斯基战斗力暴表，宛如老头上身······

>“政府应该接纳隐私币技术的潜力，例如，保护个人信息的隐私。我们可以避免剑桥分析丑闻（Facebook数据泄露事件）再次发生。有了隐私币技术，社交媒体就不会像现在一样。用户能够持有自己的数据，并且受到密码学保护。”

>“犯罪分子用来掩盖其罪行的隐私技术同样可以为政府、企业以及民众所用。通过这项技术，我们能够实现数据加密，防止受到犯罪分子的侵害。这项技术已经存在，作恶者已经在使用它。国家也应该更好地去利用这项技术，而不是进行打压。”

话说到这里，我突然抓住老斯基的一个漏洞，反问他：
>“如果照你这样说的话，技术是好的喽？”

老斯基卒······



## 后记

之后老斯基再也没回过我信息。

据外媒报道，在“丝绸之路”创始人乌布里希被逮捕后一个月，Space X前工程师本特霍尔创建的“丝绸之路2.0”上线，在本特霍尔被逮捕后，“丝绸之路 3.1”王者归来。

直至今日，美国FBI仍在与之周旋。

另外，有意思的是，虽然赵日天将暗网的乱象大多归结于技术，但他仍然坚持每天用他的计算机技术尝试攻击儿童色情网站。

技术到底是好是坏，或许永远也没有结论。但能消灭人性之恶的，也许只有人性之善了吧。

![](https://pic1.zhimg.com/80/v2-4ab61419871165ac4009b6648db37848_hd.jpg)



# 西班牙工程师的暗网探秘
- [原文](https://medob.blogspot.com/2014/02/suposta-historia-do-flappy-bird.html)

![](https://lh4.googleusercontent.com/proxy/EN1X0ZQ7mvKappNqP3_Y9lqUnrjqH75z_y47wg-iUu9rif7qfVLQuQhzaurcskpriPnk5Cghe84tm-Hv-KDWjYPZsYV5CjZan2sc0fxFIPU2t6OEIojIWEElewJx61-ZM68wq57tn02Uiv0bRw_giMyJOA=s0-d)


# 暗网相关电影

- [解除好友2：暗网 Unfriended: Dark Web](https://www.yugaopian.cn/movie/26423), 美国 犯罪 恐怖 2018-07-20(美国)
   - 电影解说：[刘老师说电影](https://www.bilibili.com/video/BV14e411x7Xw)
   <iframe src="//player.bilibili.com/player.html?aid=242580459&bvid=BV14e411x7Xw&cid=172983940&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true"  height="600" width="100%"> </iframe>
   - 《解除好友2：暗 网》：[上集av35548009](https://www.bilibili.com/video/av35548009/), [中集av35658352](https://www.bilibili.com/video/av35658352/)，[下集av35601784](https://www.bilibili.com/video/av35601784/)
- 《资本论》中有这样一个观点：
>当利润达到10%的时候，他们将蠢蠢欲动； 当利润达到50%的时候，他们将铤而走险； 当利润达到100%的时候，他们敢于践踏人间的一切法律； 当利润达到300%的时候，他们敢于冒绞刑的危险。

# 附录

- [Flappy Bird 开发者 Dong Nguyen 为何要将游戏下架？](https://www.zhihu.com/question/22694547)

![](https://pic4.zhimg.com/476f57274b193093c8ba757120de16cf_b.jpg)

- [暗网世界最底层、最神秘、最黑暗的存在——“马里亚纳深网”！](https://www.youtube.com/watch?v=VXTfMBdAYwM)
- [奇异博士说](http://www.qiyiboshishuo.com/)

<iframe width="560" height="315" src="https://www.youtube.com/embed/VXTfMBdAYwM" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

- [到底是谁造就了暗网世界？揭秘暗网存在的真正意义！](https://www.youtube.com/watch?v=568JDB4PiQo)

<iframe width="560" height="315" src="https://www.youtube.com/embed/568JDB4PiQo" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
