---
layout: post
title:  "计算机网络-Computer Network"
date:   2010-08-01 23:42:00
categories: 计算机基础
tags: 网络 OSI 路由器 交换器 调制解调器 猫 lan wan wlan
excerpt: 计算机网络知识点
mathjax: true
---

* content
{:toc}

# 总结

- [2017-9-19]视频集合：[内存原理解析](http://www.365yg.com/group/6467022800149283342/),[CPU缓存原理解析](http://www.365yg.com/group/6467021466209616397/),[TCP,UDP协议原理对比](http://www.365yg.com/group/6467022804800766477/)，【2019-10-26】[动画讲解TCP，再不懂请来打我](https://www.toutiao.com/a6751645874356486664/?timestamp=1572010379&app=news_article_lite&group_id=6751645874356486664&req_id=201910252132580100260771991F3BD7D6),[IPv4,IPv6原理解析](http://www.365yg.com/group/6467021492105249293/)，[代理服务器原理解析](http://www.365yg.com/group/6467022795812373005/)，[集线器-交换机-路由器区别](http://www.365yg.com/group/6467021483385291277/)，[DNS域名解析](http://www.365yg.com/group/6467021479107101197/)，[超线程原理解析](http://www.365yg.com/group/6467021487722201614/),[磁盘碎片原理解析](http://www.365yg.com/group/6467021470504583693/)
- 【2021-3-19】如何跟小白解释路由器和交换机的区别？并且家用路由器充当了路由器和交换机的功能吗？[薛定谔不在家的回答](https://www.zhihu.com/question/22007235/answer/402261894)
  - 总结：交换机适合局域网内互联，路由器实现全网段互联。猫的学名叫**调制解调器**，作用是将数字信号（电脑想要发送的信息）转换成模拟信号（网线中的电流脉冲）从而使信息在网线中传输。由于计算机的一切信号都要由电流脉冲传送出去，因而猫是必须的。目前的家用路由器一般都是**路由猫**，即路由器兼顾了猫和简单交换机的功能，因而在选购时，选一款性价比超高的路由猫就可以了。至于物理地址，逻辑地址，交换机与路由器的寻址方式等问题属于更专业的范畴
  - ![](https://pic1.zhimg.com/80/v2-6c49ad959be632e15b3f3ad70949a98e_1440w.jpg?source=1940ef5c)
- 【2018-3-13】松果云科普：动画解释，[详解硬盘工作原理](https://www.365yg.com/a6524897664687931911)，[详解显卡工作原理：GPU和CPU的区别](https://www.365yg.com/i6525769921438155272)
- 【2021-4-12】[天线是如何工作的](https://v.ixigua.com/e63CMmo/)


# 网络结构

## OSI

- 计算机网络里的 **OSI七层模型** 或 **TCP/IP五层模型**，即应用层（应用层、表示层、会话层）、传输层、网络层、数据链路层、物理层
![](https://pic4.zhimg.com/50/v2-6531ff0d8cbf967211297ef7c7813ab1_hd.jpg)

- [OSI七层模型](https://www.toutiao.com/w/a1701287080764423/)
  - ![](https://p5.toutiaoimg.com/img/tos-cn-i-0022/d2916c97afc94b9daa01bdaca34759a0~tplv-obj:1575:2227.image?from=post)

## MAC地址

MAC（Media Access Control，介质访问控制）地址，或称为**物理地址**，也叫硬件地址，用来定义网络设备的位置，MAC地址是网卡出厂时设定的，是固定的（但可以通过在设备管理器中或注册表等方式修改，同一网段内的MAC地址必须唯一）。MAC地址采用十六进制数表示，长度是6个字节（48位），分为前24位和后24位。
- 1、前24位叫做组织唯一标志符（Organizationally Unique Identifier，即OUI），是由IEEE的注册管理机构给不同厂家分配的代码，区分了不同的厂家。
- 2、后24位是由厂家自己分配的，称为扩展标识符。同一个厂家生产的网卡中MAC地址后24位是不同的。

MAC地址对应于OSI参考模型的第二层数据链路层，工作在数据链路层的交换机维护着计算机MAC地址和自身端口的数据库，交换机根据收到的数据帧中的“目的MAC地址”字段来转发数据帧。


## ip地址

【2018-11-3】[IP地址详解](http://blog.51cto.com/6930123/2112403)

IP地址（Internet Protocol Address），缩写为IP Adress，是一种在Internet上的给主机统一编址的地址格式，也称为**网络协议**（IP协议）地址。它为互联网上的每一个网络和每一台主机分配一个**逻辑地址**，常见的IP地址，分为IPv4与IPv6两大类，当前广泛应用的是IPv4，目前IPv4几乎耗尽，下一阶段必然会进行版本升级到IPv6；如无特别注明，一般我们讲的的IP地址所指的是IPv4。
- ![](https://s4.51cto.com//images/blog/201805/04/01b93a1d0acac52cc0bd4878696d4098.png?x-oss-process=image/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_100,g_se,x_10,y_10,shadow_90,type_ZmFuZ3poZW5naGVpdGk=)
IP地址对应于OSI参考模型的第三层网络层，工作在网络层的路由器根据目标IP和源IP来判断是否属于同一网段，如果是不同网段，则转发数据包。

IP地址(IPv4)由32位二进制数组成，分为4段（4个字节），每一段为8位二进制数（1个字节）; 每一段8位二进制，中间使用英文的标点符号“.”隔开
- 由于二进制数太长，为了便于记忆和识别，把每一段8位二进制数转成十进制，大小为0至255。IP地址的这种表示法叫做“**点分十进制表示法**”。
- IP地址表示为：xxx.xxx.xxx.xxx，举个栗子：210.21.196.6就是一个IP地址的表示。

IP地址的组成
- IP地址 = **网络**地址 + **主机**地址
- ![](https://s4.51cto.com//images/blog/201805/03/ac3c6598dd24b25dc9b01bb60b15d725.png?x-oss-process=image/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_100,g_se,x_10,y_10,shadow_90,type_ZmFuZ3poZW5naGVpdGk=)
- ![](https://s4.51cto.com//images/blog/201805/04/63174612ee1ad4b44480965034a56187.png?x-oss-process=image/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_100,g_se,x_10,y_10,shadow_90,type_ZmFuZ3poZW5naGVpdGk=)


### ip地址与mac地址

IP地址与MAC地址区别
- 长度不同：IP地址为32位（二进制），MAC地址为48位（十六进制）。
- 分配依据不同：IP地址的分配是基于网络拓扑，MAC地址的分配是基于制造商。
- 寻址协议层不同：IP地址应用于OSI第三层（网络层），而MAC地址应用在OSI第二层（数据链路层）。

IP和MAC两者之间分工明确，默契合作，完成通信过程。在数据通信时
- IP地址专注于**网络层**，网络层设备（如路由器）根据IP地址，将数据包从一个网络传递转发到另外一个网络上；
- 而MAC地址专注于**数据链路层**，数据链路层设备（如交换机）根据MAC地址，将一个数据帧从一个节点传送到相同链路的另一个节点上。
- IP和MAC地址这种映射关系由 **ARP**（Address Resolution Protocol，地址解析协议）协议完成，ARP根据目的IP地址，找到中间节点的MAC地址，通过中间节点传送，从而最终到达目的网络。
- ![](https://s4.51cto.com//images/blog/201805/04/3c9770b7936b27d2b955b1703d13dbbb.png?x-oss-process=image/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_100,g_se,x_10,y_10,shadow_90,type_ZmFuZ3poZW5naGVpdGk=)


### ip地址分类

IP地址分A、B、C、D、E五类，其中A、B、C这三类是比较常用的IP地址，D、E类为特殊地址。
- ![](https://s4.51cto.com//images/blog/201805/04/d8edafebca5bbbf1d5bb35cef4156026.png?x-oss-process=image/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_100,g_se,x_10,y_10,shadow_90,type_ZmFuZ3poZW5naGVpdGk=)

- ①、**A类**地址
  - A类地址第1字节为网络地址（最高位固定是0），另外3个字节为主机地址。
  - A类地址范围：1.0.0.0 - 126.255.255.255，其中0和127作为特殊地址。
  - A类网络默认子网掩码为255.0.0.0，也可写作/8。
  - A类网络最大主机数量是256×256×256-2=166777214（减去1个主机位为0的网络地址和1个广播地址）。
  - 在计算机网络中，主机ID全部为0的地址为网络地址，而主机ID全部为1的地址为广播地址，这2个地址是不能分配给主机用的。
- ②、**B类**地址
  - B类地址第1字节（最高位固定是10）和第2字节为网络地址，另外2个字节为主机地址。
  - B类地址范围：128.0.0.0 - 191.255.255.255。
  - B类网络默认子网掩码为255.255.0.0，也可写作/16。
  - B类网络最大主机数量256×256-2=65534。
- ③、**C类**地址
  - C类地址第1字节（最高位固定是110）、第2字节和第3个字节，另外1个字节为主机地址。
  - C类地址范围：192.0.0.0 - 223.255.255.255。
  - C类网络默认子网掩码为255.255.255.0，也可写作/24。
  - C类网络最大主机数量256-2=254。
- ④、**D类**地址
  - D类地址不分网络地址和主机地址，它的第1个字节的最高位固定是1110。
  - D类地址用于组播（也称为多播）的地址，无子网掩码。
  - D类地址范围：224.0.0.0 - 239.255.255.255。
- ⑤、**E类**地址
  - E类地址也不分网络地址和主机地址，它的第1个字节的最高位固定是11110。
  - E类地址范围：240.0.0.0 - 255.255.255.255。
  - 其中240.0.0.0-255.255.255.254作为保留地址，主要用于Internet试验和开发，255.255.255.255作为广播地址。
总结
- ![](https://s4.51cto.com//images/blog/202001/05/6187e6bd1d31364a8bda03f376b30351.png?x-oss-process=image/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_100,g_se,x_10,y_10,shadow_90,type_ZmFuZ3poZW5naGVpdGk=)

### 特殊IP地址

以下这些特殊IP地址都是不能分配给主机用的地址：
- 主机ID全为0的地址：特指某个网段，比如：192.168.10.0 255.255.255.0，指192.168.10.0网段。
- 主机ID全为1的地址：特指该网段的**全部**主机，比如：192.168.10.255，如果你的计算机发送数据包使用主机ID全是1的IP地址，数据链层地址用广播地址FF-FF-FF-FF-FF-FF。
- 127.0.0.1：是**本地环回**地址，指**本机**地址，一般用来测试使用。回送地址(127.x.x.x)是本机回送地址(Loopback Address)，即主机IP堆栈内部的IP地址。
- 169.254.0.0：169.254.0.0-169.254.255.255实际上是自动私有IP地址。
- 0.0.0.0：如果计算机的IP地址和网络中的其他计算机地址冲突，使用ipconfig命令看到的就是0.0.0.0，子网掩码也是0.0.0.0。
总结
- ![](https://s4.51cto.com//images/blog/201805/04/e664d181be8697229b52f2af236afae7.png?x-oss-process=image/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_100,g_se,x_10,y_10,shadow_90,type_ZmFuZ3poZW5naGVpdGk=)

### 公网和私网IP地址

- 公网IP地址
  - 公有地址分配和管理由Inter NIC（Internet Network Information Center 因特网信息中心）负责。各级ISP使用的公网地址都需要向Inter NIC提出申请，有Inter NIC统一发放，这样就能确保地址块不冲突。
- 私网IP地址
  - 创建IP寻址方案的人也创建了私网IP地址。这些地址可以被用于私有网络，在Internet没有这些IP地址，Internet上的路由器也没有到私有网络的路由表。
  - A类：10.0.0.0 255.0.0.0，保留了1个A类网络。
  - B类：172.16.0.0 255.255.0.0～172.31.0.0 255.255.0.0，保留了16个B类网络。
  - C类：192.168.0.0 255.255.255.0～192.168.255.0 255.255.255.0，保留了256个C类网络。
  - PS：私网地址访问Internet需要做NAT或PAT网络地址转换
- ![](https://s4.51cto.com//images/blog/201805/04/8a53e6b9c1051bd5bda08364dd1ea4b1.png?x-oss-process=image/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_100,g_se,x_10,y_10,shadow_90,type_ZmFuZ3poZW5naGVpdGk=)
总结
- ![](https://s4.51cto.com//images/blog/201805/04/b00638fef79863c0e1958bb912a52d7d.png?x-oss-process=image/watermark,size_16,text_QDUxQ1RP5Y2a5a6i,color_FFFFFF,t_100,g_se,x_10,y_10,shadow_90,type_ZmFuZ3poZW5naGVpdGk=)

# 网络设备

网络硬件（如路由器、交换机、Modem）往往被解释的很复杂，难于理解；稍微简单的方式去解释各个网络硬件的功能

参考：
- [理解几个网络硬件（调制解调器、路由器、交换机）的基本作用](https://blog.csdn.net/pan_tian/article/details/12339629)
- [调制解调器、中继器、集线器、网桥、交换机、路由、网关](https://blog.csdn.net/qingkongyeyue/article/details/52279893)


## 调制解调器 Modem （猫）

**调制解调器**，专业解释是**数模转换器**
- 调制：把计算机的**数字**信号变成**模拟**信号在电话线（电话线只接模拟信号）里通过。
- 解调：电话线里的**模拟**信号变成计算机认识的**数字**信号。


一个家庭最简单的网络部署图。台式机通过Modem，连接到网络服务商，最后连接到Internet。
- `ISP` -> `Modem` -> `PC`
- ![](https://img-blog.csdn.net/20131006101724406?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcGFuX3RpYW4=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

如Modem一种是中兴的ZXV10 H108L ADSL**宽带猫**。猫一般不用自购，多为**网络服务提供商**（中国电信、铁通...）提供，它把计算机的**数字**信号翻译成可沿普通电话线传送的**模拟**信号，然后模拟信号通过 ISP 连接到Internet

现在很多的Modem都具有**路由**功能，允许多台电脑同时上网，但这个路由功能最后都被运营商给封了，电信巴不得你一台电脑一个猫。不过有破解电信猫实现路由功能的方法


## 中继器

简单的**信号放大器**，信号在传输的过程中是要衰减的，中继器的作用就是将信号放大，使信号能传的更远。 

## 集线器（hub）

多个多端口的中继器，把每个输入端口的信号放大再发到别的端口去，集线器可以实现多台计算机之间的互联，因为它有很多的端口，每个口都能连计算机。 

## 网桥（局域网间访问）

用集线器组个局域网A，别人用另一个集线器组个局域网网B, 每个局域网里的电脑都能互相访问。但是A里的电脑想访问B里的电脑怎么办，这里就用到网桥了，用网桥来连接2个局域网。如果说集线器是1层设备的话，那么网桥就是2层设备。
- ![](https://img-blog.csdn.net/20160822203349446?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)



## 交换器（高级网桥）

交换机，可以理解为高级的网桥，他有网桥的功能，但性能比网桥强 

一般家用路由器有4个**局域网接口**，超过4个设备要连入网络的话，就要用到**交换机**了。
- `ISP` -> `Modem` -> `Router` -> `Switch`  -> `PC`s (4个以上终端)
- ![](https://img-blog.csdn.net/20131006101845765?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcGFuX3RpYW4=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)
- 交换机可以把连入的设备组成一个**小型局域网**，再通过路由器连到外部网络中去。
一个8口交换机，可以连通8台LAN设备
- ![](https://img-blog.csdn.net/20131006101905312?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcGFuX3RpYW4=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

## 路由器 Router

交换机负责每个局域（冲突域）之间的连接，只管转发这些广播，不管广播的合理性以及真实性。但整个网络计算机的数量足够大时，这么多的机器都要广播，那么这些广播信息将占用很大的带宽，造成**网络堵塞**，反而导致正常的通信不能进行，这时候怎么办~~

路由就干这个的，交换机把数据给路由，路由决定是否转发，比交换机智能点。这样能避免过多的广播造成网络堵塞。 现在路由多用在分内外网上

在Modem和终端设备间，增加了（无线）路由器（Router）就可以实现多台电脑同时上网
- `ISP` -> `Modem` -> `Router` -> `PC`s (Desktop+Laptop)
- ![](https://img-blog.csdn.net/20131006101802531?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvcGFuX3RpYW4=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

路由器与交换机
- 交换机创建网络：方便同一网络下多台设备互通
- 路由器连接各个网络

> Switches create a network. Routers connect networks. A router links computers to the Internet, so users can share the connection. A router acts as a dispatcher, choosing the best path for information to travel so it's received quickly.

OSI模型上，交换机位于第二层的Datalink层，路由器位于第三层网络层。


很多家用网络设备都兼具多项功能，如图里的路由器既有路由器功能也具有交换机的功能，路由功能联通内部局域网和外部的Internet网络，还有交换机的功能，可以在内网中联通多台设备。
-  TP-LINK TL-WR541G+ 54M无线路由器，含有4个10/100M局域网接口，无线网络速率可达到54Mb/s

### WAN/LAN/WLAN

一般路由器的LAN口用颜色和WAN口区分，一般LAN口数目会多于WAN口。

- （1）`LAN` 全称Local Area Network，中文名叫**局域网**
  - LAN是指在某一区域内由多台计算机互联成的计算机组。一般是方圆几千米以内。局域网可以实现文件管理、应用软件共享、打印机共享、工作组内的日程安排、电子邮件和传真通信服务等功能。局域网是封闭型的，可以由办公室内的两台计算机组成，也可以由一个公司内的上千台计算机组成。
  - ![](https://imgsa.baidu.com/exp/w=500/sign=d37b5af8ed24b899de3c79385e071d59/d6ca7bcb0a46f21f454a2eabf2246b600d33aec8.jpg)
  - 路由器组网一般组建的都是LAN网络，用户在局域网里通信、传输文件。获取到的是内部IP，LAN 内部是交换机。可以不连接 WAN 口，把路由器当做普通交换机来使用
  - LAN的场景：
    - 1，接电脑的网线，需要插到路由器的LAN口
    - 2，二级路由，一般都是从上级路由的LAN口接线
    - ![](https://imgsa.baidu.com/exp/w=500/sign=a94d08c06a061d957d4637384bf50a5d/bf096b63f6246b600c7fc38ceff81a4c500fa2d0.jpg)
- （2）`WAN` 全称Wide Area Network，中文名叫**广域网**
  - WAN是一种跨越大的、地域性的计算机网络的集合。通常跨越省、市，甚至一个国家。广域网包括大大小小不同的子网，子网可以是局域网，也可以是小型的广域网。
  - ![](https://imgsa.baidu.com/exp/w=500/sign=2518c479cf1349547e1ee864664f92dd/cc11728b4710b912b33b8a06c7fdfc039345224b.jpg)
  - WAN：接外部 IP 地址用，通常指的是出口，转发来自内部 LAN 接口的 IP 数据包。
  - 基本每个路由器都有WAN口，当然也有路由猫这种特例。
  - 一般路由器都会有一个WAN口，也有多个WAN口的路由。
    - ![](https://imgsa.baidu.com/exp/w=500/sign=2eff9eaa8135e5dd902ca5df46c7a7f5/bd3eb13533fa828bc723e31bf91f4134960a5ac1.jpg)
  - WAN的应用场景：
    - 1，从猫引出的来网线，要插到路由器的WAN口
    - 2，二级路由，上级网线插到二级路由的WAN口
    - ![](https://imgsa.baidu.com/exp/w=500/sign=9426515d0e7b02080cc93fe152d8f25f/f7246b600c33874411d85684550fd9f9d72aa02d.jpg)
- （3）`WLAN` 全称Wireless LAN, **无线**局域网。
  - 和LAN不同，WLAN的数据通过电磁波传输，也就是常说的空气传输。WLAN 利用电磁波在空气中发送和接受数据，而无需线缆介质。
  - WLAN 使用 ISM (Industrial、Scientific、Medical) 无线电广播频段通信。WLAN 的 802.11a 标准使用 5 GHz 频段，支持的最大速度为 54 Mbps，而 802.11b 和 802.11g 标准使用 2.4 GHz 频段，分别支持最大 11 Mbps 和 54 Mbps 的速度。最新的11AC已经达到竟然的1.3Gbps。由于WLAN采用全新的802.11协议，其设置要比普通的有线路由器复杂
  - ![](https://imgsa.baidu.com/exp/w=500/sign=8ebddcdbb47eca80120539e7a1229712/a6efce1b9d16fdfa93fdbc16b08f8c5495ee7bb0.jpg)
总结：
- WAN口是对外的接口，和运营商、上级网络打交道。
- LAN和WLAN是对内的接口，内部的电脑、手机、PAD，都是接入到LAN或者WLAN。
一般的无线路由器，包含了完整的LAN、WAN、WLAN功能。
- ![](https://imgsa.baidu.com/exp/w=500/sign=198ca5d7ba096b6381195e503c318733/96dda144ad345982a17d876a08f431adcaef8456.jpg)
- 参考：[路由器的LAN、WAN、WLAN的区别](https://www.cnblogs.com/Renyi-Fan/p/8092521.html)


路由器WAN口和LAN口的区别
- WAN口主要用于连接**外部**网络，如ADSL、DDN、以太网等各种接入线路;
- LAN口用来连接家庭**内部**网络，主要与家庭网络中的交换机、集线器或PC相连。
可以说这两类网口一类对外，一类对内。将网络运营商提供的接入网线插在WAN口上，然后将几台共享上网的电脑接到LAN口上，然后用一台电脑登录路由器的管理界面进行相应的配置即可完成共享上网了。

## 网关

- 局域网里，集线器就是网关
- 2层网络里，交换机就是网关
- 3层网络里路由就是网关
- 说网关要看你的网是多大的，要拿中国来说，连着美国那台世界服务器的设备就是网关
- ![](https://img-blog.csdn.net/20160822203418755?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)


# 案例

## 网吧电脑为什么快

【2021-12-16】[网吧网咖的电脑配置比家里的低，为什么速度却更快？](https://zhuanlan.zhihu.com/p/374210363)
- （1）**操作系统优化**：网吧的电脑系统十分**精简**，并且系统还是优化过的。很多用户从安装好系统后一直使用的都是系统默认设置。而网吧里的电脑，都开启了最佳性能模式。
- （2）**软件少**：电脑里面也没有安装过多的软件、没有自启动程序和多余的进程。只留下与游戏、直播、观影有关的软件。**后台程序**少了很多，减轻不少系统运行占用的资源，自然运行速度就快一些了。
- （3）**服务器**镜像：网吧系统的“还原功能”, 用户每次开机都是全新的**镜像**启动，进入的是干干净净的新系统。这就是为什么，出现问题的时候，网管通常会叫你“重启试试”，直接搞一个全新的系统使用，自然也就没有问题了~
- （4）**光纤通信**：家里装的无线一般只供一台电脑或者是供手机使用就足够了，基本都是100兆左右。但是网吧里的网几乎都是千兆网或者是几万兆的网。
- （5）**无硬盘**：电脑是必须从硬盘上读取数据的。但网吧电脑大多数不用硬盘，因为它有“**无盘服务器**”，类似于固态硬盘的作用。电脑由网卡唤醒后，直接加载“无盘服务器”里的镜像系统启动，包括启动软件和游戏时也一样。那么，在网吧的千兆网光纤组成的局域网下，从服务器读取数据的速度肯定是高于硬盘的。虽然网吧电脑配置不一定比得上你的电脑，但是在游戏场所中，还是会备配一些中高性能cpu显卡，比如NVIDIA特供的GTX 1063。
- ![](https://pic3.zhimg.com/80/v2-e8c4fcbde4137bb40a39b988f460b1e2_1440w.jpg)

## 如何连接两个路由器

[如何连接两个路由器](https://zhuanlan.zhihu.com/p/32274871)

### 方法1：使用以太网连接两个路由器

设置主路由、副路由
- 主路由器将直接与调制解调器连接
- 副路由器主要用于拓展网络信号。可以选择旧型号的路由器作为附属路由器。此外，如果要创建LAN-to-WAN网络，该路由器还将控制附属网络。

LAN-to-LAN或LAN-to-WAN网络连接方式
- LAN-to-LAN（局域网）连接方式可以**扩展网络**，允许更多设备连接到网络中。每个设备都可以访问网络中其他设备共享的文件和资源。
  - 用DHCP服务的默认设置。
- LAN-to-WAN（广域网）连接方式在主网络（WAN）中创建一个**子局域网**。优点是可以对子网中的设备访问设定一定限制，而缺点是子网中的设备无法与主网络共享文件和资源。
  - 该模式下，可以修改子局域网的DNS设置，从而限制子网中设备能够访问的网站。此外，子网中的设备也更安全，黑客访问它们也会更加困难。因此家长可以用此来监控孩子访问互联网。
  - 开启主路由器的DHCP服务，自动分配192.168.1.2与192.168.1.50之间的IP地址。

## 查看wifi密码

mac环境： [如何查看Mac上已连接WiFi的密码？](https://zhuanlan.zhihu.com/p/104847180)
- 打开“钥匙串访问”，在其左侧的“钥匙串”列表中选择“系统”，右侧栏就会出现与系统有关的各类密钥。
- 找到你需要连接的WiFi名称，右击，选择“将密码拷贝到剪贴板”

Windows环境

```shell
netsh wlan show profiles # 查看连接过的wifi
netsh wlan show profiles name ＝ “当前用户配置文件名” key ＝ clear # 查看wifi密码
# “安全设置”—>“安全密钥”
```


# 结束