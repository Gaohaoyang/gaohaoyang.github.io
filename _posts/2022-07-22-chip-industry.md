---
layout: post
title:  "芯片行业知识-Chip Industry"
date:   2022-07-22 23:16:00
categories: 新技术
tags: 芯片 操作系统 硬件
author : 鹤啸九天
excerpt: 芯片知识汇总
mathjax: true
permalink: /chip
---

* content
{:toc}

# 总结

# 芯片

## 芯片发展历史

【2022-7-22】[图说芯片技术60多年的发展史](https://www.eet-china.com/mp/a71064.html)

### 前言

**集成电路**(`芯片`)技术自1958年诞生以来，已有63年的发展历史。在今天的信息化社会中，芯片无疑是最重要的基础支撑。近年来，芯片核心技术已成为美国维护科技霸权，围堵打压他国的利器。人们都想知道，芯片技术是如何由开始的原始和不成熟，一步一步发展成为今天高科技皇冠上的技术明珠。本文将以照片和图示为主，以文字为辅，说说芯片技术60多年的发展史。由于篇幅所限，暂定分上、中、下三篇叙述。

要介绍芯片技术发展史，就要从**半导体**的发现和研究、`电子管`、`晶体管`和`集成电路`的发明说起。正是因为这些发现、研究和发明，电子技术及电子工业才得以诞生。从此，人类社会拉开了电子信息化的序幕。
 
### 1. 半导体发现和研究(1833～1947年,持续114年)

半导体的4个效应
- 1833年，英国科学家`迈克尔.法拉第`(Michael Faraday)在测试`硫化银`(Ag2S)特性时，发现硫化银的电阻随着温度的上升而降低的特异现象，被称为**电阻效应**，这是人类发现的半导体的第一个特征。
- 1839年，法国科学家`埃德蒙.贝克雷尔`(Edmond Becquerel)发现半导体和电解质接触形成的结，在光照下会产生一个电压，这就是后来人们熟知的光生伏特效应，简称**光伏效应**。这是人类发现的半导体的第二个特征。
- 1873年，英国的`威洛比.史密斯`(Willoughby Smith)发现硒(Se)晶体材料在光照下电导增加的**光电导效应**，这是人类发现的半导体的第三个特征。
- 1874年，德国物理学家`费迪南德.布劳恩`(Ferdinand Braun)观察到某些硫化物的电导与所加电场的方向有关。在它两端加一个正向电压，它是导通的；如果把电压极性反过来，它就不导电，这就是半导体的**整流效应**，这是人类发现的半导体的第四个特征。同年，出生在德国的英国物理学家`亚瑟.舒斯特`(Arthur Schuster)又发现了铜(Cu)与氧化铜(CuO)的**整流效应**。

发现半导体特性的四位科学家: 法拉第、贝克雷尔、史密斯、布劳恩
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-76129e8573d1cefe20a7473f6c2ab216.png)

虽然半导体的这四个效应在1880年以前就先后被科学家发现，但半导体这个名词大概到了1911年才被`科尼斯伯格`(J.Konigsberger)和`维斯`(I.Weiss)首次使用。后来，关于半导体的**整流**理论、**能带**理论、**势垒**理论才在众多科学家的努力下逐步完成。
 
其后二十多年，世界上出现了一些半导体应用案例。例如
- 1907～1927年美国的物理学家研制成功了晶体整流器、硒整流器和氧化亚铜(Cu2O)整流器等。
- 1931年，硒光伏电池研制成功。
- 1932年，德国先后研制成功硫化铅(PbS)、硒化铅(PbSe)和碲化铅(PbTe)等半导体红外探测器等。
 
1947年，美国贝尔实验室全面总结了半导体材料的上述四个特性。从1880～1947年长达67年的时间里，由于半导体材料难以提纯到理想的程度，因此半导体材料研究和应用进程非常缓慢。此后，四价元素`锗`(Ge)和`硅`(Si)成为了科学家最为关注和大力研究的半导体材料。而在`肖克莱`(W.Shockley)发明锗晶体三极管的几年后，人们发现`硅`更加适合生产晶体管。此后，硅成为应用最广泛的半导体材料，并一直延续至今。这也是美国北加州成为硅工业中心后，被称为“硅谷”的原因。

半导体材料是导电性能介于导体和绝缘体之间的材料，它们的电阻比导体大得多，但又比绝缘体小得多。其电学性能可以人为加以改变。常见的半导体材料有`硅`(Si)、`锗`(Ge)、`砷化镓`(GaAs)、`碳化硅`(SiC)、`氮化镓`(GaN)等。
 
### 2. 电子管的发明(1906年，距今115年)
 
1904年，英国物理学家约翰.安布罗斯.弗莱明(John Ambrose Fleming)发明了世界上第一个`电子管`，它是一个真空二极管，他获得了这项发明的专利。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-680b4747c2e6d48e02979880bcf6aa8f.png)
- 图2.弗莱明发明的真空二极管  
 
1906年，美国工程师李.德.福雷斯特(Lee de Forest)在`弗莱明`真空二极管的基础上又多加入了一个栅极，发明了另一种电子管，它是一个**真空三极管**，使得电子管在检波和整流功能之外，还具有了放大和震荡功能。福雷斯特于1908年2月18日拿到了这项发明的专利。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-a6051a38f3009fa556d3f04a199b9990.png)
- 图3.福雷斯特发明的真空三极管  

**真空三极管**被认为是电子工业诞生的起点。它的应用时期长达40多年。由于电子管具有体积大、耗电多、可靠性差的缺点，最终它被后来者晶体管所取代。
 
### 3. 晶体管的发明(1947年，距今74年)
 
1947年，美国贝尔实验室的`巴丁`(J.Bardeen)、`布拉顿`(W. Brattain)、`肖克莱`(W.Shockley)三人发明了**点触型晶体管**，这是一个NPN锗(Ge)晶体管，他们三人因此项发明获得了1956年诺贝尔物理学奖。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-105576c28a68027cb271a2a9f4a3877a.png)
- 图4.晶体管发明三人组
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-8ba086cfc08e1ad89761b5e7462ed9a5.png)
- 图5.获得1956年诺贝尔物理学奖的三人组
 
1950年，当`蒂尔`(G.K.Teal)和`利特尔`(J.B.Little)研究成功生长大单晶锗的工艺后，`威廉姆.肖克莱`(W.Shockley)于1950年4月制成第一个双极结型晶体管—PN结型晶体管,这种晶体管实际应用比点触型晶体管广泛得多。今天的晶体管，大部分仍是这种PN结型晶体管。所谓`PN结`就是`P型半导体`和`N型半导体`的结合之处，P型半导体多空穴。N型半导体多电子。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-5a717802bf01163e1868fdcc67198e0e.png)
- 图6.PN结型晶体管结构示意图(左)晶体管符号(右)
 
1952年，实用的**结场效应晶体管**(JunctionField-Effect Transistor，JFET)被制造出来。`结场效应晶体管`(JFET)是一种用电场效应来控制电流的晶体管。到了1960年，有人提出用二氧化硅改善双极性晶体管的性能，就此`金属-氧化物-半导体`(Metal Oxid Semiconductor,MOS)场效应晶体管诞生。`艾塔拉`(M.Atalla)也被认为是MOS场效应晶体管(MOSFET)的发明人之一。
 
MOSFET宣告了在电子技术中的统治地位，并且支撑了当今信息社会的基石——**大规模集成电路**发展。实际上，`场效应晶体管`(FET)由朱利叶斯.利林费尔德(JuliusLilienfeld)于1925年和德国物理学家`奥斯卡.海尔`(Oskar Heil)于1934年分别发明出来，只是一直未能制造出实用的晶体管器件。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-9148c5902bc672b0e32296f3d6d2b9f1.png)
- 图7.MOSFET的发明贡献者及发明年份  
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-420fda1ba148809b5cfff657896b747d.png)
- 图8.场效应晶体管(FET)分类及实物图
 
晶体管从双极型到MOS型，从分立式器件到集成在芯片之中，加上其所用不同的半导体材料，晶体管类型和品种繁多。晶体管主要起到小信号放大、功率放大、电流开关等作用，它是芯片中集成的数量最多的最基本的电路元器件。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-d0d00037f361a3dd4debdaa162227703.png)
- 图9.各种晶体管的分类  
 
晶体管发明是微电子技术发展历程中第一个里程碑。晶体管的发明使人类步入了飞速发展的电子信息时代。到目前为止，它的应用已长达74年之久。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-69757bb628569c2f953c016dcd0c1ac4.png)
- 图10.各种封装形式的分立式晶体管
 
### 4. 集成电路(芯片)的发明(1958年，距今63年)
 
1950年，美国人`拉塞尔.奥尔`(Russell Ohl)和`威廉姆.肖克莱`(W.Shockley)发明了离子注入工艺，1954年肖克莱申请了这项发明的专利。离子注入是将杂质电离成离子并聚焦成离子束，在电场中加速后注入到硅材料中去，实现对硅材料的掺杂，目的是改变硅材料的导电性能。离子注入是最早采用的半导体掺杂方法，它是芯片制造的基本工艺之一。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-3635439304d639cd78db1570d5303cc4.png)
- 图11.简要的离子注入原理示意图
 
1956年，美国人富勒(C.S.Fuller)发明了扩散工艺；扩散是掺杂的另一种方法，它也是芯片制造的基本工艺之一。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-5b77bf08467d7db7135e525da0d32239.png)
- 图12. 一种热扩散装置示意图
 
离子注入工艺和扩散工艺是两种掺杂方法。离子注入用于形成较浅的半导体结(Junction)，扩散用于形成较深的半导体结。掺杂就像炒菜中添加调味料，它是对半导体材料的“添油加醋”。少量的其它物质掺进很纯的半导体材料中，使其变得不纯，对于半导体材料来说，其它物质就是杂质，掺入的过程就称为掺杂。掺杂是将一定数量的其它物质掺加到半导体材料中，人为改变半导体材料的电学性能的过程。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-b783f7e4696b96934dc86e4844dda976.png)
- 图13.两种半导体掺杂示意图
 
1958年，美国仙童公司的`罗伯特.诺伊斯`(Robert Noyce)与美国德仪公司的`杰克.基尔比`(Jack Kilby)间隔数月分别发明了集成电路，开创了世界微电子学的历史。诺伊斯是在基尔比发明的基础上，发明了可商业生产的集成电路，使半导体产业由“发明时代”进入了“商用时代”。
 
`基尔比`因为发明集成电路而获得2000年的诺贝尔物理学奖。`诺伊斯`是仙童半导体公司(1957年成立)和英特尔公司(1968年成立)的创办人之一，他是伟大的科学家，是集成电路史上重要人物。遗憾的是，他之前在肖克莱实验室工作时，发明“负阻二极管”得不到老板支持而终止，后来日本科学家江崎玲于奈(Leo Esaki)在此项发明上获诺贝尔奖；他于1990年逝世，未等到2000年与基尔比分享当年的诺贝尔物理学奖，两次均与科技最高荣誉无缘。但是，他们两人都被誉为是**集成电路之父**。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-21763dcea24d4bb4f7ae7e9766937ba2.png)
- 图14.基尔比和诺伊斯与他们发明的芯片
 
1959年，贝尔实验室的韩裔科学家`江大原`(Dawon Kahng)和`马丁.艾塔拉`(MartinM.Atalla)发明了金属氧化物半导体场效应晶体管（Metal-Oxide-Semiconductor Field-Effect Transistor, MOSFET），这是第一个真正的紧凑型MOSFET，也是第一个可以小型化并实际生产的晶体管，它可以大部分代替JFET。MOSFET对电子行业的发展有着深远的影响。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-8ca3d0fd479bd59362357864ceb64674.png)
- 图15.江大原和艾塔拉发明了MOSFET
 
### 5. 光刻工艺是芯片制造的灵魂 (发明距今61年)

1960年，`卢尔`(H.H.Loor)和`克里斯坦森`(Christenson)发明了外延工艺。外延是指在半导体单晶材料上生长一层有一定要求的、与基片晶向相同的单晶层，犹如原来的晶体向外延伸生长了一层。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-11c84c3cdf964d94e87c6c9104330f6a.png)
- 图16.硅气相外延生长装置原理示意图
 
1960年，光刻工艺是首次应用在芯片制造中的吗？这是一个重要问题，需要本文重点讨论。公众号【芯论语】的另一篇文章“**光刻如何一步一步变成了芯片制造的卡脖子技术？**”指出，**光刻工艺**是芯片制造的灵魂技术。正是光刻工艺的出现，才使得硅器件制造进入到了平面加工技术时代，才有大规模集成电路和微电子学飞速发展的今天。
 
泛指意义上的光刻技术发明，应该追溯到1822年法国科学家`约瑟夫.尼瑟福.尼埃普斯`(Joseph Nicephore Niepce)的**感光材料**试验和**刻蚀**实验，以及他在1827年制作的d’Amboise主教雕板像复制品。本文所说的光刻工艺特指芯片制造过程中的光刻工艺技术。
 
芯片制造的光刻工艺到底是什么时候发明的？笔者发现网上这方面的文章很少，即使有文章介绍，也都是一笔带过。网上资料主要有两种说法
- 第一种说法是，1960年卢尔(H.H.Loor)和卡斯特兰尼(E.Castellani)发明了光刻工艺\[4\]。
- 第二种说法是，1970年斯皮勒(E.Spiller)和卡斯特兰尼(E.Castellani)发明了光刻工艺\[5\]。

两种说法中光刻发明时间竟相差10年之久。网上也很难查到卢尔、卡斯特兰尼和斯皮勒如何发明光刻工艺，甚至难以查到他们的生平介绍。

笔者更相信1960年应是光刻工艺发明的年份。因为，如果光刻工艺是1970年才发明，那么1958～1970年这十多年时间里，贝尔实验室、仙童公司、TI、RCA和Intel等先驱公司的半导体产品(双极、FET、MOSFET晶体管)和芯片是很难制造出来的。

笔者也相信**仙童**公司应该是**光刻工艺**的发明地。
- 1958年仙童公司几位创始人从照相机商店购买了三个16毫米镜头，制作了一个步进和重复照相装置，用来制作掩模，并对掩模板、光刻胶进行了改进。
- 1959年，罗伯特.诺伊斯(Robert Noyce)在日记中提出一个技术设想，“既然能用光刻法制造单个晶体管，那为什么不能用光刻法来批量制造晶体管呢？”，“把多种组件放在单一硅片上将能够实现工艺流程中的组件内部连接，这样体积和重量就会减小，价格也会降低”。为此，仙童公司开始将光刻工艺尝试应用于晶体管批量制造。诺伊斯提出了“平面技术”的设想，琼.赫尔尼(Jean Hoerni)就是将这一设想转换为实际可行的“平面处理”技术的那位大牛人\[11\]。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-c60fb9ca0f1244ada79eefa629a22e70.png)
- 图17.赫尔尼及所编写的平面处理工艺技术文档
 
从光刻机的发展年代来看，上世纪60年代是**接触式**光刻机、**接近式**光刻机；70年代是**投影式**光刻机；80年代是**步进式**光刻机；再到**步进式扫描**光刻机，**浸入式**光刻机和现在的**EUV**光刻机\[16\]，可见芯片制造的光刻工艺不可能是1970年才发明出来。
 
离子注入、扩散、外延、光刻等工艺技术，加上真空镀膜技术、氧化技术和测试封装技术，构成了硅平面加工技术的主体，通俗地说是构成了芯片制造的主体。没有光刻技术就没有今天的芯片技术和产业，也就没有我们现在的信息化和智能化社会。
 
### 6. 芯片技术不断成熟，沿摩尔定律快速发展
 
1962年，美国无线电公司(RCA)的`史蒂文.霍夫施泰因`(Steven Hofstein) `弗雷德里克.海曼`(Frederic Heiman)研制出了可批量生产的金属氧化物半导体场效应晶体管MOSFET，并采用实验性的16个MOS晶体管集成到一个芯片上，这是全球真正意义上的第一个MOS集成电路。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-73a53ae422b189f1ab8739585bb6b194.png)
- 图18.霍夫施泰因和全球首款MOS集成电路
 
1963年，仙童公司的`弗兰克.万拉斯`(Frank M.Wanlass)和华人`萨支唐`(C.T.Sah)首次提出CMOS电路技术。他们把N-MOS和P-MOS连接成互补结构，两种极性的MOSFET一关一开，几乎没有静态电流，适合于逻辑电路。

1963年6月，万拉斯为CMOS申请了专利，但是几天之后，他就离开了仙童公司。首款CMOS电路芯片是由RCA公司研制。CMOS电路技术为大规模集成电路发展奠定了坚实基础。今天，95%以上的集成电路芯片都是基于CMOS工艺制造。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-0c756de8c9eb9bd8b81d648830aa8e54.png)
- 图19.CMOS反相器电路符号及器件模型  
 
同年，仙童公司26岁的电路设计天才罗伯特.维德拉(Robert Widlar)设计了第一颗集成运算放大器电路μA702。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-326e7f7fe223a51c563031525ecf6423.png)
- 图20.仙童公司μA702运算放大器芯片
 
1964年，Intel公司创始人之一的`戈登.摩尔`（Gordon Moore）提出著名的`摩尔定律`(Moore\'s Law)，预测芯片技术的未来发展趋势是，当价格不变时，芯片上可容纳的元器件的数目，约每隔**18-24个月**便会增加一倍，性能也将提升一倍。

后来50多年芯片技术的发展证明了摩尔定律基本上还是准确的。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-14d4579d553458db80bea255d0a36aee.png)
- 图21.摩尔，芯片技术沿摩尔定律发展趋势图
 
1966年，美国RCA公司研制出CMOS集成电路和第一块50门的门阵列芯片。
 
1967年，美国应用材料公司（AppliedMaterials）成立，现已成为全球最大的半导体设备制造公司。2020财年全年营收172亿美元，研发投入达22亿美元，全球拥有24000名员工，拥有14300个专利。业务涵盖半导体、显示器、太阳能、柔性镀膜、自动化软件等。下图是应用材料公司半导体业务部分的综述。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-46f6cb0aff9a5c72b53a6dc03b016045.png)
- 图22.美国应用材料公司的半导体业务(来源：应用材料公司官网)
 
1967年，贝尔实验室`江大原`(DawonKahng)和`施敏`博士(Simon Sze)共同发明了非挥发存储器。这是一种浮栅MOSFET，它是可擦除可编程只读存储器(EPROM)、电可擦除可编程只读存储器(EEPROM)、闪存(Flash)的基础。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-20b6a29580191513edf1a892b16abd7f.png)
- 图23.普通MOSFET与浮栅MOSFET示意图
 
1968年，IBM公司的`罗伯特.登纳德`(Robert H.Dennard)发明单晶体管动态随机存取存储器(DRAM)。发明名称是“一个关于晶体管动态RAM单元的发明”。单晶体管DRAM是一个划时代的发明，它后来成为了计算机内存的标准。Dennard于1997年入选了国家发明家名人堂；2009年获得IEEE荣誉勋章，这是电子电气领域的最高荣誉。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-11bb0653fede8d88175992715cdc2af6.png)
- 图24.登纳德与单晶体管DRAM示意图
 
### 后记

1947～1968年的20多年是全球芯片技术和电子工业的起步期，这个时期内创新人才辈出，深远影响的发明层出不穷。晶体管、集成电路、以光刻为核心的硅平面加工技术、CMOS电路、非挥发存储器、单管DRAM电路等发明为芯片技术快速发展打下了基础，为芯片技术沿着摩尔定律前行铺平了道路。但是，人类在走上这条康庄大道之前，从半导体的认识和发现到晶体管的发明，在崎岖的道路上已摸索了114年的时间，其中包括痴迷电子管的40多年时间。科技进步不可能一撮而就，它是一个逐步认识、发现和成熟的过程。
 
参考资料：
1. The Story Behind the Invention of FieldEffect Transistors，网站www.circuitstoday.com:http://www.circuitstoday.com/the-story-behind-the-invention-of-field-effect-transistors
2. 心仪，MOSFET的发明人－－马丁•阿塔拉（Martin M. "John" Atalla）博士，电子工程世界论坛：http://bbs.eeworld.com.cn/thread-96577-1-1.html，2010.2.24
3. 刘亮，PC发展史① 一颗晶体管引发的数字革命，中关村在线：https://power.zol.com.cn/519/5191311_all.html#p5191311，2015.5.14
4. 华强旗舰微信公众号，电子元器件发展史，360个人图书馆：http://www.360doc.com/content/17/0405/22/30123241_643177613.shtml，2017.4.5
5. 吉林大学，半导体器件物理精品教学第二章，豆丁网：https://www.docin.com/p-2116387652.html，2018.6.28
6. 1967年至今，闪存的发展史，存储在线：http://www.dostor.com/p/58538.html，2019.8.9
7. Long_龙1993，掺杂——扩散和离子注入，360个人图书馆：http://www.360doc.com/content/20/0212/13/68538116_891471588.shtml，2020.2.12
8. 科技真相，芯片战争-61：一次意外事故造就氧化层掩膜技术,知乎：https://zhuanlan.zhihu.com/p/359789998，2020.3.22
9. 头像被屏蔽，晶体管的分类与特征，电子发烧友论坛：https://bbs.elecfans.com/jishu\_1948567\_1_1.html，2020.6.9
10. 脑极体，芯片破壁者（一）：从电子管到晶体管“奇迹”寻踪，凤凰网：https://tech.ifeng.com/c/7xrkgT2K4dg，2020.7.5
11. TMT研究-爱好者，芯片战争-64：从台面工艺到平面工艺，突破量产化瓶颈，雪球网：https://xueqiu.com/9231373161/156639463，2020.8.14
12. 亚化，一图读懂半导体集成电路发展史，腾讯网：https://xw.qq.com/amphtml/20200917A0FZSG00，2020.9.17
13. Long_龙1993，为什么芯片上的晶体管越做越小，360个人图书馆：http://www.360doc.com/content/20/1009/21/68538116_939647723.shtml，2020.10.9
14. 康师兄，电子时代的起点，美篇：https://www.meipian.cn/3cw3o1d9，2021.1.10
15. 图解芯片技术，集成电路发展史上的十大里程碑事件!电子发烧友：http://www.elecfans.com/d/1490110.html，2021.2.1
16. 传感器专家网，光刻机技术到底是谁发明的？腾讯网：https://new.qq.com/rain/a/20210309A0BB0500，2021.3.9
 
 
前言：上篇简述了188年前，在长达114年的时间里，科学家开始逐步发现、认识和研究了半导体，也简述了电子管、晶体管、集成电路、以光刻为核心的硅平面加工技术、CMOS电路、非挥发存储器、单管DRAM等重大发明。在晶体管发明后的20多年里，这些发明为芯片技术快速发展打下了基础，为芯片技术沿着摩尔定律前行铺平了道路。此文为中篇，介绍从1970年开始，芯片技术日新月异的发展历史。
 
### 7. 全球首个微处理器芯片问世，人类社会信息化大幕开启
 
1971年，美国Intel公司推出全球第一个微处理器4004芯片。它是一个4位的中央处理器(CPU)芯片,采用MOS工艺制造，片上集成了2250个晶体管。这是芯片技术发展史上的一个里程碑。同年，Intel公司推出1kb动态随机存储器(DRAM)，标志着大规模集成电路(Large Scale Integrated circuits，LSI)出现。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-0a64c9265fe15062eb8ef7833b528b71.png)
- 图25.Intel 4004 CPU芯片的显微照片
 
和封装后的外观图  
 
1974年，美国RCA公司推出第一个CMOS微处理器1802芯片。它是一个8位的CPU芯片,首次采用了CMOS电路结构，处理器的耗电量要小很多。RCA 1802是第一款应用在航天领域的微处理器，例如，Viking、Galileo和 Voyager等航天项目都应用了该芯片。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-7cbe2034c4f6f80674f8ddc33ebe3748.png)
- 图26.RCA 1802 CPU芯片的显微照片
 
和封装后的外观图
 
1976年，16kb DRAM和4kb SRAM问世。
 
### 8. x86开启了PC机拉动芯片产业发展的新时代
 
[EE芯视频推荐](https://u.eet-china.com/?xinyu)
 
[视频：唯样商城吴兴阳：坚守授权分销，不断导入国产代理线](https://u.eet-china.com/video/174?xinyu1)
 
[![](https://www.eet-china.com/static/image/mianbaoban/specialcolumn/video-btn.svg)](https://u.eet-china.com/video/174?xinyu1)
 
1978年，Intel发布了新款16位微处理器8086，x86世代王朝创立。Intel 8086上集成了约4万个晶体管，采用 HMOS工艺制造，+5V电源，时钟频率为4.77MHz～10MHz，外部数据总线均为16位，地址总线为4+16位。在8086推出不久，Intel还发布了其变化版本8088。Intel 8086开创了x86架构计算机时代。x86架构是一种不断扩充和完善的CPU指令集，也是一种CPU芯片内部架构，同时也是一种个人计算机(PC)的行业标准。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-f4d25494b148b41c4bfcf7d35ba4070f.png)
- 图27.Intel 8086 CPU芯片的显微照片
 
和封装后的外观图  
 
也是在1978年，64kb动态随机存储器诞生，不足0.5平方厘米的硅片上集成了多达15万个晶体管，线宽为3微米。标志着芯片技术进入了超大规模集成电路(Very Large Scale Integrated circuits，VLSI)时代。
 
以x86命名的桌面计算机的时代。Intel公司基本上每3～4年推出一款创新的微处理器。早期以8086、80186、80286、80386、80486为代表，Intel CPU芯片基本主导了台式计算机和笔记本电脑的天下，PC型号大多数以CPU的名称来命名，例如286、386、486等。Intel CPU代表全球最先进芯片技术，也引领了芯片前沿技术的发展方向。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-598ae58a0f77f3efc715d8863ca4e790.png)
- 图28. Intel 80286/386/486 CPU芯片
 
的显微照片和封装后的外观图  
 
1980年，日本东芝(Toshiba)公司的舛岡富士雄(Fujio Muoka)发明了NOR 闪速存储器(NOR Flash Memory)，简称NOR闪存(NOR Flash)。1987年，他又发明了NAND闪速存储器(NAND Flash Memory)，简称NAND闪存(NAND Flash)。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-4d90a03e045748beab18acc5b3841e6d.png)
- 图29.日本东芝的舛岡富士雄发明Flash  
 
1981年，IBM基于8088推出全球第一台个人计算机(PC)。第一台IBM PC用的Intel 8088主频为4.77MHz，操作系统采用Microsoft的MS-DOS。有人评价说PC的历史就是IBM80年代的历史。IBM PC的研制项目主管是唐.埃斯特利奇(Don Estridge)，他被誉为是IBM PC之父。
 
从IBM PC机开始，PC真正走进了人们的工作和生活，它标志着计算机应用普及时代的开始，也标志着PC消费驱动芯片技术创新和产业发展的时代开启。也是在1981年，256kb DRAM和64kb CMOS SRAM问世。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-6a8206c7fc709c8a159e5e2d631adf05.png)
- 图30.埃斯特利奇与最早的IBM PC  
 
- 1982年，Intel推出80286微处理器(图28)。
- 1984年，日本宣布推出1MbDRAM和256kb SRAM。
- 1985年，微软公司推出Windows操作系统。早期的Windows1.X、2.X和3.X可以说是MS-DOS的图形界面外壳软件。1995年，微软公司推出Windows 95后，逐步以Windows取代了之前15年采用的MS-DOS底层系统。后来，微软公司与Intel公司强强联合，形成所谓的Wintel计算机架构，大大促进桌面计算机普及，全球网络化、信息化也大力促进了芯片产业的发展。也是在1985年，Intel推出80386微处理器(图28)。
- 1988年，Intel看到闪存(Flash)的巨大潜力，推出了首款商用闪存芯片，成功取代了EPROM产品，主要用于存储计算机软件。也是在1988年，16M DRAM问世，1平方厘米大小的硅片上可集成约3500万个晶体管，标志着芯片技术进入了特大规模集成电路(Ultra LargeScale Integrated circuits，ULSI)阶段。
- 1989年，Intel推出80486微处理器(图28)。1Mb DRAM进入市场。
- 1992年，64Mb随机存储器问世。
- 1993年，Intel推出奔腾CPU芯片，计算机的“奔腾”时代到来。在Intel 80486推出四年之后，人们预测80586 CPU即将推出。但Intel公司1993年向用户展示的是新的CPU系列，命名为奔腾(Pentium)。奔腾CPU每个时钟周期可以执行两条指令，在相同时钟速度下，奔腾CPU执行指令的速度大约比80486快五倍。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-5917ca92dfaab6ac786f77ba8dfea342.png)
- 图31. Intel奔腾CPU芯片的显微照片
 
和封装后的外观图  
 
奔腾CPU经过四代升级后，Intel推出了新系列的奔腾CPU。1997年Intel开始推出奔腾Ⅱ系列CPU芯片；1999年Intel开始推出奔腾Ⅲ系列CPU芯片；2000年Intel开始推出奔腾Ⅳ系列CPU芯片。每种奔腾产品都有几代的升级版本或者特色款式。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-b045c057f793afdf5fdfa33ecbb807df.png)
- 图32. Intel奔腾Ⅱ/Ⅲ/Ⅳ CPU芯片的显微照片
 
和封装后的外观图  
 
- 1994年，由于集成1亿个元件的1G DRAM的研制成功，标志着芯片技术进入了巨大规模集成电路（Giga Scale Integrated circuits，GSI）时代。
- 1997年，IBM公司开发出芯片铜互联技术。当时的铝互连工艺对180nmCMOS而言已不够快。IBM最初的研究，铜的电阻比铝低40%，导致处理器速度暴增15%以上，铜的可靠性更是比铝高100倍。在1998年生产出第一批PowerPC芯片时，与上一代300MHz的PowerPC芯片相比，铜互连版本速度提高了33%。也是在1997年，Intel开始推出奔腾Ⅱ系列CPU芯片(图32)。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-b6b42ea2b4b5e9eee73cb77209688dcc.png)
- 图33. IBM公司开发出芯片铜互联技术
 
1999年，胡正明教授开发出了鳍式场效晶体管(FinFET)技术。他被誉为是3D晶体管之父。当晶体管的尺寸小于25nm时，传统的平面晶体管尺寸已经无法缩小，FinFET的出现将晶体管立体化，晶体管密度才能进一步加大，让摩尔定律在今天延续传奇。
 
这项发明被公认是50多年来半导体技术的重大创新。FinFET是现代纳米电子半导体器件制造的基础，现在7nm芯片使用的就是FinFET设计。2016年5月19日，美国总统奥巴马在白宫为2015年度美国最高科技奖项获得者颁奖，其中包括FinFET的发明者胡正明教授。胡教授还获得了2020年IEEE最高荣誉奖章。也是在1999年，Intel开始推出奔腾Ⅲ系列CPU芯片(图32)。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-3b1489f3824541b63a10964572079168.png)
- 图34. FinFET技术的发明人胡正明教授  
 
- 2000年，Intel开始推出奔腾Ⅳ系列CPU芯片(图32)。同年，1Gb RAM投放市场。
  - Intel酷睿CPU时代来临，多核心CPU登上历史舞台。 “奔腾”处理器时代长达12年，之后的2006年1月，Intel推出了命名为“酷睿”(Core)的微处理器芯片，开始时Core CPU主要用于移动计算机，上市不久即被Core2系列取代，后续推出了Core i3、Core i5、Core i7和Corei9等多核心CPU系列。
- 2006年1月，Intel Core Solo和Core Duo上市，8月Intel就推出了桌面版和移动版的2核心的酷睿2，型号是Core2 Duo，采用了65nm的工艺制造。
- 2007年，苹果公司推出iPhone手机，树立了智能手机的样板。从此之后，智能手机都以平板+触屏的面貌出现。它促进了移动智能终端(包括智能电话、平板电脑等)的普及，对移动互联网产业发展起到重要的促进作用。之后，移动互联网逐步替代桌面互联网，成为了驱动芯片产业发展的主要力量。详见【芯论语】科普：图说芯片技术60多年的发展史（下篇）。
- 2008年，Intel推出4核心的酷睿2，型号是Core2 Quad，采用了45nm的工艺制造。
- 2010年，采用领先的32nm工艺Intel酷睿i系列全新推出，其中包括Corei3系列(2核心)、Core i5系列(2核心、4核心)、Core i7系列(2核心、4核心和6核心)、Core i9(最多12核心)系列等，下一代22nm工艺的版本也陆续推出。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-b9b26b81d6cb4e4342aebcf5423986d6.png)
- 图35. Intel酷睿(Core)系列CPU的全家福
 
(2013年留影)  
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-22f225406ea05e97702891565cf463b4.png)
- 图36. Intel酷睿(Core)系列多核心CPU举例
 
2011年，Intel推出了商业化的FinFET工艺，用在了其22nm的工艺节点。
 
桌面电脑CPU芯片二哥，AMD公司神一样地存在着。AMD公司立于1969年，AMD从血缘来讲应该是Intel的族弟，在50多年的发展中，他与Intel很好地比肩而行。Intel作为全球CPU芯片老大，偶尔欺负一下老二AMD也鲜有成功，更不敢有灭掉族弟的念头。客观上AMD的存在让Intel没有了行业垄断之嫌，这是Intel最看重的。
 
两家公司沿着x86路线同向而行，在技术努力创新，互相借鉴，对芯片技术发的发展做出了贡献。Intel和AMD的芯片发展历程可以用他们的桌面CPU天梯图简要表达。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-febaae115b878c27feed4f46305549d9.png)
- 图37. Intel和AMD桌面电脑CPU天梯图  
 
2012年，三星发明了堆叠式3D NAND Flash，芯片技术迎来了3D时代。2013年推出第一代24层3D NAND闪存芯片，2014年推出第二代32层V-NAND芯片。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-763aecf4f738b289c82efff8b8e711bf.png)
- 图38.三星前两代3D NAND Flash技术比较  
 
2018年，Intel推出的服务器CPU芯片Xeon W-3175X，采用14nm工艺制造，28核心56线程，主频3.1～4.3GHz，三级缓存38.5MB，内存支持六通道DDR4-2666 ECC/512GB，封装接口LGA3647，搭配芯片组C621，售价高达2999美元(2万多元人民币)。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-7fb81d2b24f540d74091dd8f92fcc8eb.png)
- 图39. Intel Xeon W-3175X 28核心的
 
服务器CPU举例  
 
### 后记

- 1970～2010年的40年间，芯片产业链全球化分工协作良好，芯片技术发展快速。CPU、PC机、大规模存储器的发明，拉开了全球计算机化和信息化大幕，Wintel计算机架构形成，桌面互联网成为了拉动芯片技术进步和产业发展的主力。Intel CPU成为芯片技术进步的旗帜，先后经历了x86 CPU的升级，奔腾CPU的迭代，目前是酷睿CPU技术的不断创新。与Intel CPU比肩发展的AMD CPU也是神一样的存在，对芯片技术发展也起到了促进作用。摩尔定律预言的芯片发展规律在这期间很好地被验证。
 
下篇主要介绍移动互联网拉动芯片技术进步和产业发展的历史。
 
参考资料：
 
1. 蔺晓峰，风风雨雨38年 英特尔桌面处理器发展史，中关村在线：https://biz.zol.com.cn/45/454098.html，2006.11.14
2. Andrew Huang，電腦達人養成計畫 2-6：中古前期 CPU 發展史，网站：https://isite.tw/2016/01/26/14760，2016.1.26
3. Andrew Huang，電腦達人養成計畫 2-7：中古時代後期 CPU 發展史 (上)，网站：https://isite.tw/2016/01/27/14785，2016.1.27
4. Andrew Huang，電腦達人養成計畫 2-8：中古時代後期 CPU 發展史 (中)，网站：https://isite.tw/2016/01/28/14819，2016.1.28
5. Andrew Huang，電腦達人養成計畫 2-9：中古時代後期 CPU 發展史 (下)，网站：https://isite.tw/2016/01/30/14850，2016.1.30
6. 红巨星，CPU、SOC芯片图dieshot收集，知乎：https://zhuanlan.zhihu.com/p/114554933，2020.11.23
7. QbitAl，3D晶体管之父胡正明获IEEE最高荣誉，他是台积电前CTO，为摩尔定律续命十几年...，CSDN博客：https://blog.csdn.net/QbitAI/article/details/104765123，2020.3.9
8. 摩尔芯闻，一文看懂3D NAND Flash，搜狐：https://www.sohu.com/a/110141175_465984，2016.8.11
9. 王新兵，深入了解存储系统之闪存 （FlashMemory），知乎：https://zhuanlan.zhihu.com/p/28347814，2017.8.7
10. DOIT学院，1967年至今，闪存的发展史，搜狐：https://www.sohu.com/a/333668728_120172415，2019.8.14
11. 爱活网，酷睿i9-10900K处理器首测：游戏之巅不胜寒，看点快报：https://kuaibao.qq.com/s/20200520A0PBKT00?refer=spider，2020.5.20
12. 李博潮，8核5960X配DDR4 Intel Haswell-E首测，中关村在线：https://cpu.zol.com.cn/475/4755866\_all.html?\_t\_t\_t=0.7139762167843171，2014.8.30
 

前言：中篇主要介绍了1970～2010年的40年间，芯片产业沿着摩尔定律的轨迹快速发展的情况。Intel公司是推动芯片技术发展的旗帜，x86系列CPU、奔腾系列CPU、酷睿系列CPU技术成为桌面计算机CPU芯片发展的里程碑，桌面互联网成为了拉动芯片技术进步和产业发展的主力。FinFET电路技术、3D芯片技术和多核心CPU技术为后来的移动终端芯片技术提供了强有力支撑。此文为下篇，主要介绍了1990年以后移动互联网成为推动芯片技术进步和产业发展动力的历史。
 
### 9. 移动终端芯片成为驱动芯片产业的有生力量
 
1971年，美国发明家塞缪尔.赫斯特(Samuel Hurst)发明了电阻式触控屏。塞缪尔团队的十位伙伴申请了电阻式触控屏的专利，并合作创立了Elographnics公司。他们生产的首批25块触控屏成品被命名为E-100。1973年，Elographnics公司荣获当年的“百大科技产品”称号，之后，生意就开始滚滚而来\[4\]。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-9ba7b421a02d35506f3161e3b606b862.png)
- 图40.电阻式触控屏的发明人塞缪尔.赫斯特
 
1991年，ARM公司成立于英国剑桥，这是移动互联网时代的伟大公司。ARM公司通过出售精简指令集计算机(RISC)微处理器(CPU)IP的授权，建立起一种全新的微处理器设计、生产和销售的商业模式。ARM公司用RISC CPU技术，支持全球许多著名的半导体企业、芯片设计公司、软件和OEM厂商开发自己的芯片和整机产品，培育了一个庞大的ARM CPU和SoC芯片家族。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-faa16469cdb70ff42a5b8f101cb1f3e8.png)
- 图41. ARM微处理器架构发展史(来源：参考资料1)
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-683dd0a5a29e98384e40d5e080627558.png)
- 图42. ARM传统的、面向应用的和嵌入式的微处理器IP分类(来源：网络图片)
 
ARM公司及其商业模式促进了移动终端芯片产业发展。芯片产业近三十年的发展史证明ARM独创的这种商业模式是成功的，它支持大批中、小、微纯芯片设计公司(Fabless)发展壮大，支撑芯片设计技术快速迭代升级和产业快速发展。ARM公司已由移动终端领域，逐步延伸到桌面PC、服务器领域，形成了对芯片巨人Intel公司龙头地位的挑战。2006年全球ARM芯片出货量约为20亿片，2010年ARM合作伙伴的基于ARM技术的芯片出货量超过了60亿片。目前ARM的授权用户超过1200家。
 
1993年，美国IBM推出全球第一款触屏手机——IBM Simon。它被公认为世界上第一部触屏智能手机，一个单色的笔触式触屏智能手机。它集手提电话、个人数码助理、传呼机、传真机、日历、行程表、世界时钟、计算器、记事本、电子邮件、游戏等功能于一身，这在当时造成了不小的轰动。1994年全面上市时的价格为899美元，在美国有近200个城市有售。2003年，美国摩托罗拉公司也生产了公司第一款触屏手机。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-aad1e4d8acd8f602707251e6ec46cc50.png)
- 图43. IBM Simon 触屏智能手机(来源：参考资料4)
 
1998年，美国AuthenTec公司成立，它是苹果智能手机创新功能的支持者。AuthenTec是全球感应性指纹识别传感器最大供应商，其指纹识别组件很多年前就被嵌入了Windows笔记本，它也是苹果iPhone手机上的Touch ID的缔造者。2012年AuthenTec被苹果公司收购，其指纹识别芯片产品全部用于苹果智能手机和平板电脑。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-c1916b42b8df6c05275576fe7fb5d77a.png)
- 图44. AuthenTec与iPhone手机Touch ID 
 
1999年，美国摩托罗拉公司推出第一部智能手机A6188。它是一部触控屏手机、第一部可中文手写识别输入的智能手机。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-879311cf6b43589139b2aa94f809b613.png)
- 图45.摩托罗拉天拓A6188触控屏智能手机
 
2003年，安迪.鲁宾(Andy Rubin)等人创建Android公司，并组建Android团队。2005年，Google低调收购了成立仅22个月的高科技企业Android及其团队。安迪.鲁宾成为谷歌(Google)公司工程部副总裁，继续负责Android项目。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-f9902d9b44937b357a3cf35d37b2e73e.png)
- 图46.安迪.鲁宾与Android系统(来源：网络图片)
 
2005年，Intel丢掉了手机业务，后来发现自己丢掉了一个移动互联网的时代。2005年全球手机应用处理器市场总计为8.39亿美元，德州仪器占69%，高通占17%，英特尔只占7%的份额。因为移动终端芯片远没有桌面PC和服务器芯片挣钱，Intel索性把PXA手机业务卖给了MARVEL，从此退出了移动终端芯片领域\[2\]。
 
Intel开头时丢掉了移动芯片的机会，但后来也看到了这个机会，几番努力后仍然没有抓住移动芯片的真谛，最终被ARM率领的成千上万的SoC芯片公司排挤出局。这是“农村包围城市”在移动互联网时代的精彩演义。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-9b88e87ebeea2c7e36d957dc2ca3d986.png)
- 图47.移动互联网时代ARM与Intel的竞争
 
2005年，MTK抓住了山寨手机业务的机会，赶上了移动互联网时代的快车。台湾联发科(MTK)成立于1997年，2005年MTK完成了GSM芯片开发。为了卖芯片，他们把手机应用处理器和GSM处理器整合到一起，提供了MTK芯片一站式手机解决方案，同时提供整套的软件开发套件(SDK)，将手机芯片和软件平台预先整合在一起，这使得手机厂商研发一款手机的门槛大大降低。2007年，中国手机牌照取消，深圳一下子冒出了无数的手机小厂商。深圳华强北的厂商借助MTK芯片和解决方案，大杀四方，山寨手机声名远扬。MTK创始人蔡明介也被称为“山寨机”之父。MTK芯片成就了华强北，也成就了联发科\[2\]。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-ffafa5a2bf9f4dcfbcc78753cb230277.png)
- 图48.MTK创始人蔡明介与深圳华强北

2006年被认为是多核心CPU的元年。这年7月23日，Intel基于酷睿(Core)架构的CPU发布。11月，Intel又推出了面向服务器、工作站和高端PC机的至强(Xeon)5300和酷睿2双核心和4核心至尊版系列CPU。与上一代台式机CPU相比，酷睿2 双核心CPU在性能方面提高40%，功耗反而降低40%。
 
谁发明了使用较广的电容触控屏？目前还无法考证。可能是由众多科研人员不断改进，共同完成的。1990年以后的技术发明很少由某个科学家独立完成，一般是集体智慧的结晶，并且知识产权由企业所有。1997年摩托罗拉手机电脑Palm Pilot，1999年摩托罗拉第一部智能手机A6188,还都是用的电阻式触控屏，采用触控笔输入。
 
2007年，LG推出Parada多点电容式触控屏，不再需要触控笔，手指点击精确度已经比较高了。2007年6月苹果公司推出iPhone多点电容触屏手机，触控灵敏度和流畅度已经很好。从此之后，电容触控屏取得了飞速发展。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-1f3d03e8840e6b07926db5b638604fd9.png)
- 图49.全球首个多点电容式触控屏手机LG PRADA

2007年7月，苹果公司推出iPhone手机，树立了智能手机的样板。iPhone淘汰了以前手机翻盖、滑盖的复杂结构，中规中矩、简约时尚的风格让人耳目一新。iPhone淘汰了之前常用的触控笔，采用多点手指触控屏，极大地改善了用户体验。从此之后，智能手机都以平板显示+手指多点触控屏的面貌出现。它终结了以前手机五花八门的款式，简化了手机操作，促进了移动智能终端(包括智能电话、平板电脑等)的普及，对移动互联网产业发展起到重要的促进作用。同时也促进了移动终端芯片的技术创新。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-79da7504b67b91d156bb9d8b6ea8c41e.png)
- 图50.史蒂夫.乔布斯与iPhone智能手机系列
 
2007年11月，谷歌公司向外界展示了名为Android的操作系统。同时谷歌公司宣布建立一个全球性的手机生态联盟，该联盟由34家芯片制造商、手机制造商、软件开发商、电信运营商共同组成。并与84家硬件厂商、软件厂商及电信营运商组成开放的手持设备联盟来共同研发和改良Android系统。联盟成员将支持谷歌发布的手机操作系统以及应用软件，谷歌以Apache免费开源许可证的授权方式，发布Android的源代码。
 
根据2011年的数据，Android系统的应用数目已经达到了48万，在智能手机市场，Android手机的占有率已经达到了43%。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-0a3d1fdd018cf51d9987cf93682be53f.png)
- 图51.目前主要的Android旗舰手机品牌
 
移动终端操作系统及其应用产品的两大阵营。谷歌公司的开源操作系统Android与苹果公司的封闭操作系统iOS形成了移动互联网时代的操作系统双雄——苹果系和安卓系，它们互相借鉴，相互竞争，不断发展壮大。未来可能还会有一个移动互联网操作系统新星升起，那就是华为的鸿蒙系。基于智能手机和移动智能终端的移动互联网产业逐步替代桌面互联网产业，成为了驱动芯片技术创新和产业发展的主要力量。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-88b32403fb8fc0823b114166daa063c1.png)
- 图52.移动智能终端的两大阵营苹果系和安卓系
 
2008年，成立于1997年的台湾宏达电脑(HTC)推出了全球首款安卓手机T-Mobile G1。它成为第一个站在苹果iOS系统对面的挑战者\[2\]。这款手机采用了美国高通公司(Qualcomm)的MSM720系列处理器。该处理器采用了双核的解决方案(ARM11+ARM9双核构架)，内部包含3D图形处理模块和3G通信模块，图像模块可提供高分辨率的图像以及视频播放功能，流媒体功能表现也十分出色。从通信行业一路走来，高通公司最后终于明白了智能手机的SoC应该怎么来做了。
 
手机芯片公司伴随着手机整机企业一路成长。HTC公司的智能手机与高通手机芯片一同迭代升级，成就了高通Android领域的通信芯片第一霸主的地位。HTC公司成就了高通公司，最终却没有成就自己。HTC公司的手机业务经历辉煌后，2017年时已奄奄一息，2018年1月谷歌公司宣布斥资11亿美元收购了HTC的手机代工业务\[2\]。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-9206c03463584099fd4195b5927819d9.png)
- 图53.高通公司(左)与其他公司(右)智能手机SoC芯片的天梯图(来源：网络图片)
 
2008年，苹果智能手机的示范效应使多点触控和指纹技术应用爆发。苹果iPhone系列手机、iPad等移动终端产品推开之后，全球掀起了一场“多点触控风暴”，多点触控技术成为各种智能手机、LCD TV、笔记本电脑、MID/PMP及各种电子系统等用户接口的首选，电容触控芯片和指纹芯片公司大量涌现。
 
目前，触控芯片龙头企业包括Synaptics、Atmel、Cypress、Focaltech(敦泰科技)、Goodix Tech(汇顶科技)、Mstar(晨星台湾)等。指纹芯片龙头企业包括AuthenTec、Validity、FingerPrintCards(FPC)、Goodix Tech(汇顶科技)、SileadInc(思立微)、Focaltech(敦泰科技)等。
 
AuthenTec于2012年被苹果公司收购。Validity于2013年被Synaptics收购，其芯片目前主要应用在HTConemax和三星GalaxyS5等产品上。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-54cfc886c0fe07a7e73e5031003ffd21.png)
- 图54.全球主要的触控和指纹芯片供应商
 
2009年，汇顶科技推出第一颗十点触控芯片，成为苹果公司之外第一个做出十点触控芯片的国内厂商。第一个采用汇顶科技方案的手机厂商是波导公司\[7\]。
 
2011年，联发科(MTK)旗下的汇发国际投资了汇顶科技。与MTK强强联合，成就了汇顶科技迎着移动互联网东风腾飞的传奇。汇顶科技为国内快速增长的智能手机厂家提供了物美价廉的触控产品支持，公司业绩开始爆发性增长，利润由2011年仅2652.5万元，增长到2012年的2.25亿元，暴涨接近10倍\[7\]。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-02c2ea742ceceeeb67d57e5f01f299ca.png)
- 图55.汇顶科技董事长张帆与公司业绩腾飞的奇迹

2013年，苹果公司发布了带指纹识别功能的手机后，指纹识别已经做好了统治手机识别市场的准备。
 
2014年，汇顶科技推出了指纹触控产品样机，正式进入了指纹识别行业，与欧美企业一般采用高压驱动不同，汇顶采用了低压驱动方式。同年11月，魅族MX4 Pro发布，搭载了汇顶的正面按压式指纹识别，这是国产手机史中一款划时代的产品，打破了Touch ID在正面按压式指纹识别上的垄断，也打破了FPC的垄断，给业界带来了另外一种可能和选择\[7\]。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-ce705a813e78e85f1bde91175d60fc5a.png)
- 图56.汇顶科技的发展历程(来源：参考资料8)
 
2015年，FPC几乎垄断着安卓机指纹芯片市场。2016国产厂商已经抢回不少指纹芯片市场，但安卓手机体系的指纹芯片中， FPC仍然占占据了最多的40%的份额。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-6fe28390120b0ca50014373cf554e614.png)
- 图57.FPC公司的电容式光学指纹模组FPC1020AM
 
2017年，汇顶科技的指纹识芯片降至10元左右，华为淘汰了FPC，在旗舰新机P10手机上选择了汇顶科技的产品。汇顶科技的指纹识芯片用在华为手机P10上具有里程碑意义。在中高端主流安卓品牌手机里，汇顶科技打破了FPC的一家独大的局面。2018年，汇顶科技推出了屏下指纹芯片。vivo在乌镇发布的vivo X21手机和三星在印度批量上市Galaxy J7 Duo手机，都是采用汇顶科技的屏下指纹解决方案\[7\]。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-e87dfaa0b1d9dc10ce4eb5794e65df8d.png)
- 图58.2019年全球屏下指纹芯片厂商出货量占比
 
 
### 10. 移动终端对芯片的要求很高，促进了芯片技术创新
 
移动终端极致地追求轻、薄、短、小，一般把尽可能多的外围接口电路和中央处理器(CPU)集成在一颗芯片中，形成所谓的单芯片系统(SoC)。例如智能手机、智能音箱、汽车导航仪、智能家电等，都是用SoC芯片来实现。移动终端芯片量大面广，功能复杂，要求尺寸尽可能小和薄，功耗尽可能小，这对芯片的设计、制造和封装提出了很高的要求。先进制造工艺、多核心CPU、低功耗设计、3D制造和堆叠封装等技术，在移动终端芯片上都有极其重要的应用。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-080678e4d4d6396dcab4d8ab831c9003.png)
- 图59.一些面向应用的SoC芯片举例
 
芯片技术按照摩尔定律发展是现实和迫切的需要。每两年不到的时间里，芯片集成度翻倍和性能提升，这是摩尔定律预示的发展规律。而对芯片集成度和功能的提升要求，也是桌面互联网和移动互联网时代对芯片现实和迫切的要求。进入14nm工艺节点以后，光刻机技术难度陡然上升。ASML EUV光刻机的售价达到1.2亿美元，光刻机设备成本占到所有制造设备成本的35%，光刻工序占到所有制造工时的40%左右。光刻工艺成为芯片制造的灵魂技术，光刻机成为了芯片技术的卡脖子装备。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-f3db6965221039ed3254e66ea8660d83.png)
- 图60.芯片制造工艺沿摩尔定律演进年表
 
2014年，华为海思推出第一款手机SoC芯片麒麟910。它使用了当时主流的28nmHPM工艺制程，初次在手机SoC芯片市场崭露头角。同年6月，华为海思发布了麒麟920。它全球首次商用LTE Cat.6，采用业界最先进4xA15＋4xA7的八核心SoC异构架构，性能非常强悍，满足了3G向4G转换时期用户对高速上网体验的需求。当年，搭载麒麟920的荣耀6、荣耀6plus、Mate7成为一代神机。
 
2015年，三星旗舰产品Galaxy S6弃用美国高通的手机芯片，采用了三星半导体自研的猎户座Exynos7420手机芯片。早在2011年2月,三星半导体正式将自家处理器品牌命名为Exynos。它由两个希腊语单词Exypnos和Prasinos组合而成，分别代表“智能”与“环保”之意。Exynos系列处理器主要应用在智能手机和平板电脑等移动终端上。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-77395ef789ed1353b734282ac58a64cc.png)
- 图61.三星半导体最新的14nm到5nm的移动处理器芯片(来源：三星半导体官网)
 
2016年，华为海思推出麒麟960。该芯片各方面综合性能均达到业界一流水准，正式跻身行业顶级手机芯片市场。华为海思的手机芯片与高通、苹果形成三足鼎立的之势。搭载麒麟960的Mate 9系列、P10系列、荣耀9、荣耀V9等手机在市场上取得了巨大的成功。2017年，华为海思发布了麒麟970，首次在SoC中集成了人工智能计算平台NPU，开创端侧AI行业先河。
 
2017年7月长江存储研制成功了国内首颗3D NAND闪存芯片。2018年三季度32层产品实现量产。2019年三季度64层产品实现量产。目前已宣布成功研发出128层3D NAND闪存芯片系列\[13\]。长江存储3D NAND闪存技术的快速发展，得益于其独创的“把存储阵列(Cell Array)和外围控制电路(Periphery)分开制造，再合并封装在一起”的XtackingTM技术。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-8c57393ff094a076d6a843a3a35078d7.png)
- 图62.长江存储的XtackingTM技术
 
2019年，华为海思发布了最新一代旗舰手机芯片麒麟990系列，包括麒麟990和麒麟9905G。麒麟990处理器采用台积电二代的7nm工艺制造，最大的亮点在于内置巴龙5000基带，可以实现真正的5G上网。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-9a54c551dbf8e2a2f1654f77dbf8e1f8.png)
- 图63.华为海思手机SoC芯片研发年表
 
2020年，美国美光(Micron)176层3D NAND Flash已开始批量生产。它采用了将双88层融合到一起的设计(堆叠512Gbit TLC闪存)。该芯片技术换用了电荷陷阱存储单元的方案，似乎极大地降低了每一层的厚度。目前176层的裸片仅为45μm，与美光的64层浮栅3D NAND相同。16层裸片堆叠式封装的厚度不到1.5 mm，适用于大多数移动/存储卡使用场景\[14\]。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-b320e09e9ef5808f3f041c859df33568.png)
- 图64. 美光176层3D NAND Flash结构示意图
 
2020年10月，华为公司发布了基于5nm工艺制程的手机SoC芯片麒麟9000。该芯片上集成了8个CPU核心、3个NPU核心和24个核心的GPU，采用了5nm的制造工艺，其上集成了153亿个晶体管。它与联发科最强的5G手机芯片天玑2000相比，性能测试的跑分明显占优。
 
可惜！由于美国多层次对我国芯片产业链的精准打击，封堵了华为高端智能手机芯片的生产渠道，使华为海思设计的高端芯片无法生产，搭载麒麟9000的华为旗舰手机Mate40系列可能成为绝版。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-a9fcd9010d5895f08a87124ec0bf8279.png)
- 图65. 华为海思最强5G手机芯片麒麟9000 
 
2020年11月，苹果公司推出了搭载了自研处理器芯片M1的MacBook Air、Pro和mini。M1是一颗8核心的SoC芯片,它基于ARM架构开发，拥有4个高性能的Firestorm CPU核和4个高效率的Icestorm CPU核，以及8核心的GPU。M1采用5nm工艺制作，在大约120mm²的芯片上集成了约160亿只晶体管。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-1fb4fb495091702b98a13acf1693f6a0.png)
- 图66.苹果公司自研的Mac电脑处理器芯片
 
Apple M1
 
苹果公司的电脑处理器共经历了四次CPU架构迁移。第一次是1984年，从Macintosh128k开始，CPU从原来MOS Technology的6502处理器转换到了Motorola的68000处理器；第二次是在1994年，CPU改换为IBMPowerPC处理器；第三次是在2005年，乔布斯宣布采用IntelX86处理器。现在则是第四次，苹果公司抛弃了Intel X86处理器，今后将采用自研的基于ARM架构的处理器\[16\]。
 
2020年，国产CPU厂商飞腾公司发布了一款面向服务器应用的多核心CPU芯片——腾云S2500。该芯片采用16nm工艺制造，芯片面积达400mm2，最多可配置64个FTC663架构的CPU核心，主频2.0～2.2GHz，三级缓存64MB，支持八通道DDR4内存，可提供800Gbps带宽的四个直连接口，支持2～8路并行，单系统可提供128～512个CPU核心的配置，热设计功耗为150W。长城、浪潮、同方、曙光、中兴通讯等15家国内厂商也同时发布了各自基于腾云S2500的多路服务器产品，软件生态建设取得了可喜突破。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-0e007678669fb26ae476a159783a9982.png)
- 图67.飞腾公司64核心CPU芯片腾云S2500 
 
2020年11月，三星半导体发布旗舰级芯片猎户座Exynos1080。它采用5nm的制程工艺，采用ARM最新的CPU架构Cortex-A78，以及最新的GPU架构Mali-G78。这是三星半导体首次在中国发布芯片产品，该款芯片专为中国市场设计，vivo将首发搭载该款芯片的新品。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-d20de5b2529d85d57d5ad6ecc0292e76.png)
- 图68.三星半导体发布旗舰级手机SoC芯片发布会 
 
2021年6月的华为鸿蒙发布会上，华为消费者业务CEO余承东公布了华为P50系列的消息。因为众所周知的原因，华为没有公布P50系列上市时间。
 
2021年7月有网文透露，即将发布的华为P50系列将会有三个芯片版本，一个是4G版的美国高通骁龙888 4G芯片版，一个华为海思麒麟9000L 4G芯片版，一个是华为海思麒麟9000 5G芯片版。据说华为P50系列主推的4G版本手机只准备了三百多万的量，而的麒麟9000 5G版本手机则更少，只有三十多万的量。因为有华为鸿蒙系统加持，相信未来销售将供不应求\[12\]。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-e254636f020f18703a0c6314377cf727.png)
- 图69.预售网站曝光华为P50pro真机图片
 
在后摩尔时代，先进封装技术接过工艺微缩、FinFET和3D集成技术的接力棒，延续着摩尔定律的生命力。2020年以后，芯片工艺进阶到7nm以下时，设计、制造和封装费用极高。封装技术从2000年发展至今，已较为成熟。许多先进封装已把不少的芯片集成技术和工艺后移到封装中去，继续谱写着微电子和集成电路技术不断追着“微小而强大”的传奇。目前先进封装技术种类多达几十种，芯片封装可以应不同需求灵活选择。
 
目前主要的先进封装技术包括：WLP、FIWLP、FOWLP、eWLB、CSP、WLCSP、CoW、WoW、FOPLP、InFO、CoWoS、HBM、HMC、Wide-IO、EMIB、Foveros、Co-EMIB、ODI、3D IC、SoIC、X-Cube、SiP等\[15\]。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-2306a0126ee96f790a24131c9e13505f.png)
- 图70. 12种当今主流的先进封装技术年表

- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-e2f4a20968be38792928e5e00250eb27.png)
- 图71.几种先进封装技术示意图(来源：参考资料15)
 
### 11. 回眸60多年发展历史，梳理芯片技术里程碑事件
 
芯片技术是人类智慧长期积累的结果，但是在关键时刻，一个重要发明和创造可能改变芯片技术发展的走向。并且芯片技术在某一路径上前进的时候，为了满足实际的应用需求，还需要不断进行技术攻关和技术创新，力求克服技术道路上的一道道难关。这些重要的技术发明、创造、和突破都是芯片技术发展的里程碑。
- ![](http://mianbaoban-assets.oss-cn-shenzhen.aliyuncs.com/xinyu-images/MBXY-CR-ee18fc4c0890ba99bd320e2e03d07699.png)
- 图72.芯片技术发展的里程碑
 
1833年～1947年晶体管的发明，这114年可看成芯片技术的萌芽期；1947年～1971年微处理器i4004推出，这24年可以看成是芯片技术的初创期；1971年～2007年苹果iPhone推出，这36年可以看成桌面互联网推动芯片技术发展的成长期；2007年～至今14年可以看成移动互联网推动芯片技术发展的成熟期，在这期间，新技术发明和创新层出不穷，但由于事项太多，时间间隔很短，并且大多是公司发明，都是集体智慧的结晶。所以，要梳理出2000年以来的里程碑事件难度很大。另外，2000年以后物联网、5G通信和人工智能也是驱动芯片技术发展的一些主线，本文为了文路清晰，并没有介绍这些方面的事件。
 
### 后记

进入二十一世纪，人类处于信息爆炸式增长时代。在芯片技术领域，新的技术创新和重要事件在不同时间、不同地点不断发生，要写好2000年以后的芯片技术发展史较为困难。如果大致把芯片技术发展分为三部曲的话，本文上篇是介绍芯片技术的萌芽期和初创期，本文中篇是芯片技术在桌面互联网驱动下的发展成长期，本文下篇是芯片技术在移动互联网驱动下的发展成熟期。2000年以来，物联网、5G通信和人工智能又为芯片技术和产业注入了新的动能，应用、创新和竞争是芯片技术和产业发展的不竭动力。
 
参考资料：
1. 电子爱好者，ARM新架构性能提升放缓 未来将聚焦每瓦性能提升，网络：http://www.yidianzixun.com/article/0VoRScSH?appid=s3rd_op398&s=op398， 2021.7.15
2. 歪睿老哥，大话手机处理器-世界上最复杂的芯片，腾讯网：https://mp.weixin.qq.com/s/uIGh1RN3Gb6jvPjYwqEqwQ，2021.7.26
3. felix86，iPhone触摸屏，网络：http://fishnetvip.blog.chinaunix.net/uid-25985452-id-3072972.html，2012.2.14
4. 杭州精显，触摸屏的发展历史，搜狐网：https://www.sohu.com/a/240330869_494129，2018.7.10
5. Herbert今日看科技，深度解读“中国芯”之触控芯片龙头，简书：https://www.jianshu.com/p/9ee1fc674267，2018.7.29
6. 吴子鹏，汇顶科技/AuthenTec/FPC/新思/敦泰等指纹识别厂商如何应对全面屏手机时代？与非网：https://www.eefocus.com/sensor/392785，2017.9.23
7. w我的工程，千亿市值：汇顶科技发展史，个人图书馆：http://www.360doc.com/content/20/1026/13/40520079_942439075.shtml，2020.10.26
8. 贝壳投研，营收八年暴增75倍，汇顶科技到底是怎么做到的？[新浪网](https://t.cj.sina.com.cn/articles/view/7437683051/1bb52096b00100wot5?display=0&retcode=0)，2021.7.9
9. IoT一线评论员，麒麟990系列芯片背后：九死一生的华为芯片发展史，[搜狐网](https://m.sohu.com/a/339835018\_100269328/?pvid=000115\_3w_a)，2019.9.9
10. 芯片制造工艺技术，超详细的集成电路产业链！，[搜狐网](https://m.sohu.com/a/275929779_99904561)，2018.11.16
11. 乔诺之声，史上销量最高的10款手机，苹果竟然只有一款！| 手机进化史，[搜狐网](https://www.sohu.com/a/277981578_283333)，2018.11.26
12. 张星橙说科技，华为P50系列发布时间确认，8+128G预计4588，麒麟9000L疑似为Pro+，[腾讯网](https://new.qq.com/omn/20210706/20210706A0CSHT00.html)，2021.7.6
13. 爱集微，长江存储宣布成功研发128层3D NAND Flash芯片系列，[电子发烧友](http://www.elecfans.com/d/1286790.html)，2020.9.2
14. cnBeta，美光发布第五代3D NAND闪存堆叠达到176层，[百度](https://baijiahao.baidu.com/s?id=1682951127434407581)，2020.11.10
15. Suny Li，“先进封装”一文打尽，[腾讯网](https://mp.weixin.qq.com/s/2jDl2A1QkFbiho2KQOJ2rw)，2021.3.28
16. 天高云淡Andi863，苹果公司弃用Intel CPU自研Mac电脑处理器芯片，引发业界震动和思考！[腾讯网](https://mp.weixin.qq.com/s/N0DfKmbeErmNrc4pnEDU3w)，2020.11.15




# 结束
















