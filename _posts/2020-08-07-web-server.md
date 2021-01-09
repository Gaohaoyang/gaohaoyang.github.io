---
layout: post
title:  "Web服务知识-Web-Serving"
date:   2020-08-07 19:17:00
categories: 技术工具
tags: Web Python Flask Django Fastapi Restful Swagger HTML JavaScript Session RPC 架构设计
author : 鹤啸九天
excerpt: Web开发相关技术知识点
mathjax: true
---

* content
{:toc}

# 总结

- ![](https://raw.githubusercontent.com/woaielf/woaielf.github.io/master/_posts/Pic/1611/161115-1.png)


- 【2021-1-9】架构设计总结，[阿里技术：架构整洁之道](https://mp.weixin.qq.com/s/Kd1T40KZWvdThKC3IN6n-Q)，书籍《架构整洁之道》
  - ![](https://pic2.zhimg.com/80/v2-40885dfb8be237d2e0dcf1b0f75f4c45_720w.jpg)


# 架构

## 如何画架构图

- 要让干系人理解、遵循架构决策，就需要把架构信息传递出去。架构图就是一个很好的载体。那么，画架构图是为了：
  - 解决沟通障碍
  - 达成共识
  - 减少歧义
- 比较流行的是4+1视图，分别为**场景**视图、**逻辑**视图、**物理**视图、**处理流程**视图和**开发**视图。
- 什么样的架构图是好架构图？
  - 首先应该要明确其受众，再想清楚要给他们传递什么信息 
  - 所以，不要为了画一个物理视图去画物理视图，为了画一个逻辑视图去画逻辑视图，而应该根据受众的不同，传递的信息的不同，用图准确地表达出来，最后的图可能就是在这样一些分类里。
  - 那么，画出的图好不好的一个直接标准就是：<font color='red'>受众有没有准确接收到想传递的信息。</font>
  - 从受众角度来说，一个好的架构图是不需要解释的，应该是自描述的，并且要具备一致性和足够的准确性，能够与代码相呼应。
  - 问题：
    - 方框圆框、颜色、实线虚线什么意思？
- C4 模型使用容器（应用程序、数据存储、微服务等）、组件和代码来描述一个软件系统的静态结构。
  - 1、**语境图**(System Context Diagram)，有交互的周边系统
  - 2、**容器图**(Container Diagram)，容器图是把语境图里待建设的系统做了一个展开。
  - 3、**组件图**(Component Diagram)，把某个容器进行展开，描述其内部的模块。
  - 4、**类图**(Code/Class Diagram)，给技术人员看的，比较常见



- 【2021-1-9】[如何画出合格的技术架构图](https://mp.weixin.qq.com/s?__biz=MzIzOTU0NTQ0MA==&mid=2247490075&idx=1&sn=18b8f093352c34e1b7239eee3bfeb93c&chksm=e9292714de5eae02cd70e1ac03217fdf1e3ccfc3d0adce7f15b5366f6c498b2fdc21c1a0b2c8&scene=21#wechat_redirect)
- [可视化架构设计——C4介绍](https://insights.thoughtworks.cn/c4-model/)
    - ![](https://insights.thoughtworks.cn/wp-content/uploads/2019/01/1-System.png)

## 架构整洁之道

### 架构设计的OKR

- 软件架构的目标（O）：最小化(需要构建和维护系统的)人力资源。
- KR拆分：**架构** → **模块** → **代码**

### 编程范式

- 现有的编程范式有三种：
  - 函数式编程（1936年）、面向对象编程（1966年）、结构化编程（1968年）
- 每种编程范式不是为程序员提供了更多的能力，而是**限制能力**。
    - **结构化编程**限制了控制权的直接转移；即限制了**goto语句**的使用
      - 结构化编程的本质：把大问题拆分成小问题，拆分成一块块可证伪的逻辑，这是对架构的最大启发，而goto语句会使得这种拆分变得困难。
      - 程序员可以用**顺序**结构、**分支**结构、**循环**结构这三种结构构造出任何程序。
    - **面向对象编程**限制了控制权的间接转移；即限制了**函数指针**的使用
      - 非面向对象的编程语言中，如何在互相解耦的组件间实现函数调用？答案是**函数指针**，void (*open)(char* name, int mode);
        - 这种方式非常脆弱，工程师必须严格按照约定初始化函数指针，并严格地按照约定来调用这些指针，只要一个人没有遵守约定，整个程序都会产生极其难以跟踪和消除的Bug。
      - 指针的使用，就是代码在原来的流程里不继续执行了，转而去执行别的代码，但具体执行了啥代码也不知道，只调了个函数指针或者接口。相对于goto的直接转移，这叫做控制权的间接转移。
      - 面向对象编程三大特性：封装、继承和多态
      - 面向对象编程限制了函数指针的使用，通过接口-实现、抽象类-继承等多态的方式来替代。
      - 多态更方便、安全地通过函数调用的方式进行组件间通信，是依赖反转（让依赖与控制流方向相反）的基础。
      - 面向对象编程对于架构的启发最大在于：多态。这使得跨越组件编程变得更安全，同时也是依赖倒置的基础。
    - **函数式编程**限制了赋值；
      - 函数式编程中，函数要保持独立，所有功能就是返回一个新的值，没有其他行为，尤其是不得修改外部变量的值。
      - 在架构领域所有的竞争问题、死锁问题、并发问题都是由可变变量导致的。如果有足够大的存储量和计算量，应用程序可以用事件溯源的方式，用完全不可变的函数式编程，只通过事务记录从头计算状态，就避免了前面提到的几个问题。目前要让一个软件系统完全没有可变变量是不现实的，但是我们可以通过将需要修改状态的部分和不需要修改的部分分隔成单独的组件，在不需要修改状态的组件中使用函数式编程，提高系统的稳定性和效率。
      - 所有并发程序（多核多线程）的问题，如果没有可变变量，就不再出现了。当然，这是不可能的，我们可以通过将需要修改状态的部分和不需要修改的部分分隔成单独的组件，在不需要修改状态的组件中使用函数式编程，提高系统的稳定性和效率。
- 总结
  - 没有结构化编程，程序就无法从一块块可证伪的逻辑搭建
  - 没有面向对象编程，跨越组件边界会是一个非常麻烦而危险的过程，而函数式编程，让组件更加高效而稳定。
  - 没有编程范式，架构设计将无从谈起。

|编程范式|限制能力|示例|架构启发|
|---|---|---|---|
|结构化|控制权直接转移|goto语句|大问题拆分成小问题|
|面向对象|控制权间接转移|函数指针|多态|
|函数式|赋值|可变变量||

### 什么是好架构

- ![](https://pic4.zhimg.com/80/v2-0b2e5ea5b216a72fa43bfb2985171c21_720w.jpg)
- 网传的**六边形架构**、**干净架构**、**洋葱架构**、**端口适配器架构**都大同小异。
- 干净架构最核心的原则就是<font color='red'>代码依赖关系只能从外向内。</font>
- 干净架构的每一圈层代表软件系统的不同部分，越往里抽象程度越高。外层为机制，内层为策略。
- 具体组成
    - (1) **实体**（Entities）
      - 实体用于封装企业范围的业务规则。实体可以是拥有方法的对象，也可以是数据结构和函数的集合。如果没有企业，只是单个应用，那么实体就是应用里的业务对象。这些对象封装了最通用和高层的业务规则，极少会受到外部变化的影响。任何操作层面的改动都不会影响到这一层。
    - (2) **用例**（Use Cases）
      - 用例是特定于应用的业务逻辑，一般用来完成用户的某个操作。用例协调数据流向或者流出实体层，并且在此过程中通过执行实体的业务规则来达成用例的目标。用例层的改动不会影响到内部的实体层，同时也不会受外层的改动影响，比如数据库、UI 和框架的变动。只有而且应当应用的操作发生变化的时候，用例层的代码才随之修改。
    - (3) **接口适配器**（Interface Adapters）
      - 接口适配器层的主要作用是转换数据，数据从最适合内部用例层和实体层的结构转换成适合外层（比如数据持久化框架）的结构。反之，来自于外部服务的数据也会在这层转换为内层需要的结构。
    - (4) **框架和驱动**（Frameworks and Drivers）
      - 最外层由各种框架和工具组成，比如 Web 框架、数据库访问工具等。通常在这层不需要写太多代码，大多是一些用来跟内层通信的胶水代码。这一层包含了所有实现细节，把实现细节锁定在这一层能够减少它们的改动对整个系统造成的伤害。

### 如何设计架构

- 不妨反过来看，代码→ 模块→ 架构，先看什么是好的代码，如何更好的划分模块， 再看什么是好的架构。
- 如何建一座房子？构造一个房子，会从砖块、房间、建筑三个维度来考虑
  - ![](https://pic1.zhimg.com/80/v2-2c64146d68da8f6ce6e8d268b7e2ac10_720w.jpg)
- **编程范式**：如何更好构建好的砖块；
- **设计原则**：如何更好将砖块构建成房间；
- **组件原则**：如何更好将房间构建成建筑；

- （1）架构设计原则：`SOLID原则`
    - SRP（**单一职责**原则）；
      - 一个模块有且只能对一个角色负责，不是每个模块都只做一件事。单一职责原则要求我们分割不同角色依赖的代码。
      - 角色不只是人、或者是一群人，很可能是一个业务方
    - OCP（**开闭**原则）；
      - 设计良好的软件应该易于扩展，同时抗拒修改。这是架构设计的主导原则，其他原则都为这条原则服务。
      - 父类出现的地方可以用子类进行替换。具体到架构层面：该原则指导的是接口与其实现方式。
    - LSP（**里氏替换**原则）；
      - 当用同一接口的不同实现互相替换时，系统的行为应该保持不变。
      - 不依赖任何不需要的方法、类或组件。该原则指导我们的接口设计，不要引入过多依赖。
    - ISP（**接口隔离**原则）；
      - 不依赖任何不需要的方法、类或组件。该原则指导我们的接口设计，不要引入过多依赖。
    - DIP（**依赖反转**原则）；
      - 依赖接口，而不是依赖实现。跨越组建边界的依赖方向永远与控制流的方向相反。该原则指导我们设计组件间依赖的方向。
      - 依赖反转原则是个可操作性非常强的原则，当你要修改组件间的依赖方向时，将需要进行组件间通信的类抽象为接口，接口放在边界的哪边，依赖就指向哪边。
- 开闭原则最重要，其他原则都为开闭原则服务
- 良好的软件应该易于扩展，同时抗拒修改
- （2）组件拆分原则
  - 哪些类应该归属到哪些模块？在组件的层级层面，不应该只是依赖经验，而应该有一些原则来指导。
  - 4.1 **复用、发布等同**原则（REP）
    - 软件复用的最小粒度应等同于其发布最小粒度。
    - 直白地说，就是要复用一段代码就把它抽成组件。
    - 如何抽组件，需要共同闭包原则、共同复用原则来协同支撑。
  - 4.2 **共同封闭**原则(CCP)
    - 为了相同目的而同时修改的类，应该放在同一个组件中。共同封闭原则是组件视角下的单一职责原则。
  - 4.3 **共同复用**原则(CRP)
    - 不要强迫一个组件依赖它不需要的东西。共同复用原则是组件视觉下的接口隔离原则。
- 总结：
  - REP 和 CCP 会让组件变得越来越大，CRP会让组件变得越来越小。
    - 如图，逆时针方向，边代表放弃该原则的代价。
      - 遵守REP、CCP 而忽略 CRP ，就会依赖了太多没有用到的组件和类，而这些组件或类的变动会导致你自己的组件进行太多不必要的发布；
      - 遵守 REP 、CRP 而忽略 CCP，因为组件拆分的太细了，一个需求变更可能要改n个组件，带来的成本也是巨大的。
  - ![](https://pic1.zhimg.com/80/v2-9b558c0e7ba793bbac9ea4d5cb320016_720w.jpg?source=1940ef5c)
  - 架构师需要平衡上面三个原则的关系。
    - 1、项目开始倾向于张力图右侧，不考虑重用；
    - 2、随着项目进行，和其他项目脱胎出来，项目将滑向张力图的左侧；
- （3）组件依赖原则 vs 架构
  - **无循环**依赖原则 （ADP）
    - 这个很好理解，如果有循环依赖，那么会导致无关组件一起发布，一起部署。避免“早晨综合症”。
    - 如何处理循环依赖，可以使用依赖倒置原则，解除循环依赖。
  - **稳定**依赖原则  (SDP)
    - 依赖必须要指向更稳定（变更成本小）的方向。
      - <font color='red'>不稳定度 = F(代码量大小，复杂度，清晰度，依赖该模块的数目)</font>，和变化频繁不频繁没关系。
      - <font color='red'>不稳定性（I） = 出向依赖数量 / (入向依赖数量 + 出向依赖数量)。</font>
  - **稳定抽象**原则（SAP）
    - 越稳定，越抽象。抽象程度（A）= 组件中抽象类和接口的数量 / 组件中类的数量。SDP描述依赖应该顺着稳定性的指向，SAP描述稳定性意味着要抽象，综合起来，依赖应该顺着要抽象的方向。
- （4）总结
  - ![](https://pic1.zhimg.com/80/v2-40885dfb8be237d2e0dcf1b0f75f4c45_720w.jpg)
- （5）如何设计好的架构
  - 两个方针
    - 1、尽可能长时间地保留尽可能多的可选项。
      - 例如决定使用什么框架、使用什么数据库，业务代码要和这些可选项解耦，越晚你的信息越全，选型就越合适；
    - 2、低层次解耦方式能解决的，不要用高层次解耦方式。代码解耦 → 组件解耦 → 服务解耦，成本越来越高；
  - 组件拆分原则
    - 组件拆分粒度关于要不要拆、拆到什么维度，要不要分层、分几层，没有银弹，这里也只能提供一些原则，这些原则是上面的抽象原则的具体化。从一个视角(例如：读写分离、服务隔离等) + 上面的各种原则，可能会对自己的服务的不合理之处有新的认知。
      - (1) **衡量成本**。凡是拆分，必有成本（修改成本、部署发布成本），能用低层次拆分的不用高层次拆分组件（代码层面→线程层面→ 进程层面 ），该指标由：组件聚合原则之间的矛盾得出；
      - (2) **迭代快慢**。受到函数式编程的启发，拆分不变与可变，架构层面我们可以根据变化快慢来拆分组件；
      - (3) **组织架构**。复用、发布等效原则+单一职责原则；
      - (4) **稳定性需求**。根据接口隔离原则，架构层面不应该让不稳定的组件影响稳定的组件；
- 摘自：[知乎：如何评价 Bob 大叔的新书《架构整洁之道》？](https://www.zhihu.com/question/301498382/answer/1018334384)


## 互联网分层架构
- 【2020-12-02】沈剑
    - [互联网分层架构的本质](https://blog.csdn.net/wuhenyouyuyouyu/article/details/80687483)是数据移动，[出处](https://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651960455&idx=1&sn=02cb2345ae9862edad11113726c49512&chksm=bd2d015b8a5a884d9619cdf7ae0dc1a480979a95abb24bac2645cecd54caec4c6bdb3aa617d7&scene=21#wechat_redirect)
    - 为什么说，MapReduce，颠覆了互联网分层架构的本质？
    - 缓存架构，到底设计些什么？
    - “选redis还是memcache”，面试官究竟想考察啥？


- ![](https://img-blog.csdn.net/20180614082228180)  
 
上图是一个典型的互联网分层架构：  
*   客户端层：典型调用方是browser或者APP
*   站点应用层：实现核心业务逻辑，从下游获取数据，对上游返回html或者json
*   数据-缓存层：加速访问存储
*   数据-数据库层：固化数据存储
 
如果实施了服务化，这个分层架构图可能是这样：
 
![](https://img-blog.csdn.net/20180614082236456)  
 
中间多了一个服务层。
 
![](https://img-blog.csdn.net/20180614082243804)  
 
同一个层次的内部，例如端上的APP，以及web-server，也都有进行MVC分层：
*   view层：展现
*   control层：逻辑
*   model层：数据
 
可以看到，每个工程师骨子里，都潜移默化的实施着分层架构。

那么，**互联网分层架构的本质究竟是什么**呢？
 
如果我们仔细思考会发现，不管是**跨进程**的分层架构，还是**进程内**的**MVC分层**，都是一个“数据移动”，然后“被处理”和“被呈现”的过程，归根结底一句话：<font color='red'>互联网分层架构，是一个数据移动，处理，呈现的过程，其中数据移动是整个过程的核心</font>。
 
![](https://img-blog.csdn.net/20180614082254952)  
 
如上图所示：
 
数据处理和呈现要CPU计算，CPU是固定不动的：
*   db/service/web-server都部署在固定的集群上
*   端上，不管是browser还是APP，也有固定的CPU处理

数据是移动的：
*   跨进程移动：数据从数据库和缓存里，转移到service层，到web-server层，到client层
*   同进程移动：数据从model层，转移到control层，转移到view层
 
![](https://img-blog.csdn.net/20180614082305760)  
 
数据要移动，所以有两个东西很重要：
*   数据传输的格式
*   数据在各层次的形态
 
先看数据传输的格式，即协议很重要：
*   service与db/cache之间，二进制协议/文本协议是数据传输的载体
*   web-server与service之间，RPC的二进制协议是数据传输的载体
*   client和web-server之间，http协议是数据传输的载体
 
再看数据在各层次的形态，以用户数据为例：
*   db层，数据是以“行”为单位存在的row(uid, name, age)
*   cache层，数据是以kv的形式存在的kv(uid -> User)
*   service层，会把row或者kv转化为对程序友好的User对象
*   web-server层，会把对程序友好的User对象转化为对http友好的json对象
*   client层：最终端上拿到的是json对象
 
结论：**互联网分层架构的本质，是数据的移动**。
 
为什么要说这个，这将会引出“分层架构演进”的核心原则与方法：
*   让上游更高效的获取与处理数据，复用
*   让下游能屏蔽数据的获取细节，封装
 
弄清楚这个原则与方法，再加上一些经验积累，就能回答网友经常在评论中提出的这些问题了：
*   是否需要引入DAO层，什么时机引入
*   是否需要服务化，什么时机服务化
*   是否需要抽取通用中台业务，什么时机抽取
*   是否需要前后端分离，什么时机分离
 
（网友们的这些提问，其实很难回答。在不了解业务发展阶段，业务规模，数据量并发量的情况下，妄下YES或NO的结论，本身就是不负责任的。）
 
更具体的分层架构演进细节，下一篇和大家细究。
 
总结
*   互联网分层架构的本质，是数据的移动
*   互联网分层架构中，数据的传输格式（协议）与数据在各层次的形态很重要
*   互联网分层架构演进的核心原则与方法：封装与复用
    
 
思考
- 哪一个系统的架构，不是“固定CPU，移动数据”，而是“固定数据，移动CPU”呢？

# HTTP

- HTTP常见的方法：
    - GET：浏览器告知服务器：只 获取 页面上的信息并发给我。这是最常用的方法。
    - POST：浏览器告诉服务器：想在 URL 上 发布 新信息。并且，服务器必须确保 数据已存储且仅存储一次。这是 HTML 表单通常发送数据到服务器的方法。
    - PUT：类似 POST 但是服务器可能触发了存储过程多次，多次覆盖掉旧值。你可 能会问这有什么用，当然这是有原因的。考虑到传输中连接可能会丢失，在 这种 情况下浏览器和服务器之间的系统可能安全地第二次接收请求，而 不破坏其它东西。因为 POST 它只触发一次，所以用 POST 是不可能的。
    - DELETE：删除给定位置的信息。


- 参考：[HTTP请求时POST参数到底应该怎么传?](https://blog.csdn.net/j550341130/article/details/82012961)，[HTTP POST/GET 在线请求测试工具](https://www.sojson.com/httpRequest/)

## HTTP请求头

- 请求三要素
    - ![](https://img-blog.csdn.net/2018082410162352)

- 根据应用场景的不同,HTTP请求的请求体有三种不同的形式, 通过header中的content-type指定, 这里只分析两个:
    1. **表单方式**：APPlication/x-www-form-urlencoded(默认类型)
        - 如果不指定其他类型的话, 默认是x-www-form-urlencoded, 此类型要求参数传递样式为<font color='blue'>key1=value1&key2=value2</font>
            - Flask代码：request.form得到字典
        - ![](https://www.seotest.cn/d/file/news/20190605/20180824110103426.png)
        - ![](https://img2018.cnblogs.com/blog/594801/201910/594801-20191029105138255-1197736174.png)
    2. **json方式**：application/json
        - 更适合传递大数据的形式, 参数样式就是json格式, 例如<font color='blue'>{"key1":"value1","key2":[1,2,3]}</font>等.
            - Flask代码：request.json得到字典
        - ![](https://www.seotest.cn/d/file/news/20190605/20180824110018525.png)
        - ![](https://img2018.cnblogs.com/blog/594801/201910/594801-20191029105052405-1022058048.png)

- GET方式获取地址栏参数
    - Flask代码：request.args得到字典
    - ![](https://img2018.cnblogs.com/blog/594801/201910/594801-20191029105256399-1220928345.png)


## HTTP响应头

- 响应三要素
    - ![](https://img-blog.csdn.net/20180824101548255)


## post/get参数获取

- [flask的post,get请求及获取不同格式的参数](https://www.cnblogs.com/leijiangtao/p/11757554.html)
- ![](https://img2018.cnblogs.com/blog/594801/201910/594801-20191029104937449-1769417565.png)

- PostMan界面
    - ![](https://img2018.cnblogs.com/blog/594801/201910/594801-20191029105052405-1022058048.png)



# API

- API(application programming interfaces)，即应用程序编程接口。API由服务器（Server）提供（服务器有各种各样的类型，一般我们浏览网页用到的是web server，即网络服务器），通过API，计算机可以读取、编辑网站数据，就像人类可以加载网页、提交信息等。通俗地，API可以理解为家用电器的插头，用户只提供插座，并执行将插头插入插座的行为，不需要考虑电器内部如何运作。从另外一个角度上讲API是一套协议，规定了与外界的沟通方式：如何发送请求和接受响应。

## 理解RESTful API

- RESTful API即满足RESTful风格设计的API，RESTful表示的是一种互联网软件架构(以网络为基础的应用软件的架构设计)，如果一个架构符合REST原则，就称它为RESTful架构。RESTful架构的特点：
- 每一个URI代表一种资源；
- 客户端和服务器之间，传递这种资源的某种表现层；把"资源"具体呈现出来的形式，叫做它的"表现层"（Representation）。比如，文本可以用txt格式表现，也可以用HTML格式、XML格式、JSON格式表现，甚至可以采用二进制格式；图片可以用JPG格式表现，也可以用PNG格式表现。
- 客户端通过四个HTTP动词，四个表示操作方式的动词：GET、POST、PUT、DELETE。它们分别对应四种基本操作：GET用来获取资源，POST用来新建资源（也可以用于更新资源），PUT用来更新资源，DELETE用来删除资源。



# RPC

- 【2020-12-25】[为啥需要RPC，而不是简单的HTTP？](https://www.toutiao.com/i6898582988620202500/)
- 企业开发的模式一直定性为HTTP接口开发，即常说的RESTful风格的服务接口。对于接口不多、系统与系统交互较少的情况下，解决信息孤岛初期常使用的一种通信手段；
- 优点就是简单、直接、开发方便。利用现成的http协议进行传输。要写一大份接口文档，严格地标明输入输出是什么，说清楚每一个接口的请求方法，以及请求参数需要注意的事项等。
- 但是对于大型企业来说，内部子系统较多、接口非常多的情况下，RPC框架的好处就显示出来了
    - 首先就是长链接，不必每次通信都要像http一样去3次握手什么的，减少了网络开销；
    - 其次就是RPC框架一般都有注册中心，有丰富的监控管理；
    - 发布、下线接口、动态扩展等，对调用方来说是无感知、统一化的操作。

## 基本概念

- [什么是RPC](https://www.jianshu.com/p/7d6853140e13)
- RPC（Remote Procedure Call）远程过程调用，简单的理解是一个节点请求另一个节点提供的服务
- **本地过程调用**：如果需要将本地student对象的age+1，可以实现一个addAge()方法，将student对象传入，对年龄进行更新之后返回即可，本地方法调用的函数体通过函数指针来指定。
- **远程过程调用**：上述操作的过程中，如果addAge()这个方法在服务端，执行函数的函数体在远程机器上，如何告诉机器需要调用这个方法呢？
    - 1.首先客户端需要告诉服务器，需要调用的函数，这里函数和进程ID存在一个映射，客户端远程调用时，需要查一下函数，找到对应的ID，然后执行函数的  - 代码。
    - 2.客户端需要把本地参数传给远程函数，本地调用的过程中，直接压栈即可，但是在远程调用过程中不再同一个内存里，无法直接传递函数的参数，因此需  - 要客户端把参数转换成字节流，传给服务端，然后服务端将字节流转换成自身能读取的格式，是一个序列化和反序列化的过程。
    - 3.数据准备好了之后，如何进行传输？网络传输层需要把调用的ID和序列化后的参数传给服务端，然后把计算好的结果序列化传给客户端，因此TCP层即可完成上述过程，gRPC中采用的是HTTP2协议。
- 总结
    - Client端 ：Student student = Call(ServerAddr, addAge, student)
        - 1. 将这个调用映射为Call ID。
        - 2. 将Call ID，student（params）序列化，以二进制形式打包
        - 3. 把2中得到的数据包发送给ServerAddr，这需要使用网络传输层
        - 4. 等待服务器返回结果
        - 5. 如果服务器调用成功，那么就将结果反序列化，并赋给student，年龄更新
    - Server端
        - 1. 在本地维护一个Call ID到函数指针的映射call_id_map，可以用Map<String, Method> callIdMap
        - 2. 等待服务端请求
        - 3. 得到一个请求后，将其数据包反序列化，得到Call ID
        - 4. 通过在callIdMap中查找，得到相应的函数指针
        - 5. 将student（params）反序列化后，在本地调用addAge()函数，得到结果
        - 6. 将student结果序列化后通过网络返回给Client
- 图示
    - ![](https://upload-images.jianshu.io/upload_images/7632302-ca0ba3118f4ef4fb.png?imageMogr2/auto-orient/strip|imageView2/2/w/560/format/webp)
- 微服务的设计中，一个服务A如果访问另一个Module下的服务B，可以采用HTTP REST传输数据，并在两个服务之间进行序列化和反序列化操作，服务B把执行结果返回过来。
- 由于HTTP在应用层中完成，整个通信的代价较高，远程过程调用中直接基于TCP进行远程调用，数据传输在传输层TCP层完成，更适合对效率要求比较高的场景，RPC主要依赖于客户端和服务端之间建立Socket链接进行，底层实现比REST更复杂。
- ![](https://upload-images.jianshu.io/upload_images/7632302-19ad38cdd9a4b3ec.png?imageMogr2/auto-orient/strip|imageView2/2/w/723/format/webp)

## RPC 架构：

- 一个完整的RPC架构里面包含了四个核心的组件，分别是Client ,Server,Client Stub以及Server Stub，这个Stub大家可以理解为存根。分别说说这几个组件：
    - 客户端（Client），服务的调用方。
    - 服务端（Server），真正的服务提供者。
    - 客户端存根，存放服务端的地址消息，再将客户端的请求参数打包成网络消息，然后通过网络远程发送给服务方。
    - 服务端存根，接收客户端发送过来的消息，将消息解包，并调用本地的方法。
- ![](https://p3-tt.byteimg.com/origin/pgc-image/28f3cdf8370647f9a2966b4bf352e52b?from=pc)

## 什么时候需要PRC

- RPC通信方式，已经不仅仅是远程，这个远程就是指不在一个进程内，只能通过其他协议来完成，通常都是TCP或者是Http。
- 希望是和在同一个进程里，一致的体验
- http做不到，Http（TCP）本身的三次握手协议，就会带来大概1MS的延迟。每发送一次请求，都会有一次建立连接的过程，加上Http报文本身的庞大，以及Json的庞大，都需要作一些优化。
- 一般的场景下，没什么问题，但是对于Google这种级别的公司，他们接受不了。几MS的延迟可能就导致多出来几万台服务器，所以他们想尽办法去优化，优化从哪方面入手？
    - 1.减少传输量。
    - 2.简化协议。
    - 3.用长连接，不再每一个请求都重新走三次握手流程
- Http的协议就注定了，在高性能要求的下，不适合用做线上分布式服务之间互相使用的通信协议。
- RPC服务主要是针对大型企业的，而HTTP服务主要是针对小企业的，因为RPC效率更高，而HTTP服务开发迭代会更快。

## gRPC与REST

- REST通常以业务为导向，将业务对象上执行的操作映射到HTTP动词，格式非常简单，可以使用浏览器进行扩展和传输，通过JSON数据完成客户端和服务端之间的消息通信，直接支持请求/响应方式的通信。不需要中间的代理，简化了系统的架构，不同系统之间只需要对JSON进行解析和序列化即可完成数据的传递。
- 但是REST也存在一些弊端，比如只支持请求/响应这种单一的通信方式，对象和字符串之间的序列化操作也会影响消息传递速度，客户端需要通过服务发现的方式，知道服务实例的位置，在单个请求获取多个资源时存在着挑战，而且有时候很难将所有的动作都映射到HTTP动词。
- 正是因为REST面临一些问题，因此可以采用gRPC作为一种替代方案
- gRPC 是一种基于**二进制流**的消息协议，可以采用基于**Protocol Buffer**的IDL定义grpc API,这是Google公司用于序列化结构化数据提供的一套语言中立的序列化机制，客户端和服务端使用HTTP/2以Protocol Buffer格式交换二进制消息。
- gRPC的优势是，设计复杂更新操作的API非常简单，具有高效紧凑的进程通信机制，在交换大量消息时效率高，远程过程调用和消息传递时可以采用双向的流式消息方式，同时客户端和服务端支持多种语言编写，互操作性强；
- 不过gRPC的缺点是不方便与JavaScript集成，某些防火墙不支持该协议。
- 注册中心：当项目中有很多服务时，可以把所有的服务在启动的时候注册到一个注册中心里面，用于维护服务和服务器之间的列表，当注册中心接收到客户端请求时，去找到该服务是否远程可以调用，如果可以调用需要提供服务地址返回给客户端，客户端根据返回的地址和端口，去调用远程服务端的方法，执行完成之后将结果返回给客户端。这样在服务端加新功能的时候，客户端不需要直接感知服务端的方法，服务端将更新之后的结果在注册中心注册即可，而且当修改了服务端某些方法的时候，或者服务降级服务多机部署想实现负载均衡的时候，我们只需要更新注册中心的服务群即可。
- ![](https://upload-images.jianshu.io/upload_images/7632302-0b09dd85b8baa318.png?imageMogr2/auto-orient/strip|imageView2/2/w/790/format/webp)

### thrift

- [thrift c++ rpc](https://www.cnblogs.com/Forever-Kenlen-Ja/p/9649724.html)
- 【2020-12-26】thrift是Facebook开源的一套rpc框架，目前被许多公司使用
    - 使用IDL语言生成多语言的实现代码，程序员只需要实现自己的业务逻辑
    - 支持序列化和反序列化操作，底层封装协议，传输模块
    - 以同步rpc调用为主，使用libevent evhttp支持http形式的异步调用
    - rpc服务端线程安全，客户端大多数非线程安全
    - 相比protocol buffer效率差些，protocol buffer不支持rpc，需要自己实现rpc扩展，目前有grpc可以使用
    - 由于thrift支持序列化和反序列化，并且支持rpc调用，其代码风格较好并且使用方便，对效率要求不算太高的业务，以及需要rpc的场景，可以选择thrift作为基础库
![](https://img2018.cnblogs.com/blog/524932/201809/524932-20180915020117562-1191051189.png)


# 微服务

- 【2020-12-18】[微服务入门这一篇就够了](https://www.jianshu.com/p/7293b148028f)
- 知乎：[什么是微服务架构](https://www.zhihu.com/question/65502802)
    - ![](https://pic4.zhimg.com/80/v2-3578297e7768e6c99d1fa1f33ebde659_720w.jpg?source=1940ef5c)

## 什么是微服务

### 单体应用

- 没有提出微服务的概念的“远古”年代，一个软件应用，往往会将应用所有功能都开发和打包在一起，那时候的一个B/S应用架构往往是这样的
    - （1）B/S架构
    - ![](https://upload-images.jianshu.io/upload_images/7584230-15823c00f06065e9.png)
- 当用户访问量变大导致一台服务器无法支撑时怎么办呢？加服务器加负载均衡
    - （2）B/S+负载均衡
    - ![](https://upload-images.jianshu.io/upload_images/7584230-86a2f52455c26c42.png)
- 后来发现把静态文件独立出来，通过CDN等手段进行加速，可以提升应用的整体响应
    - （3）B/S+前后端分离
    - ![](https://upload-images.jianshu.io/upload_images/7584230-52d4cbf05f0694c8.png)
- 上面3种架构都还是单体应用，只是在部署方面进行了优化，所以避免不了单体应用的根本的缺点：
    - 代码臃肿，应用启动时间长；（代码超过1G的项目都有！）
    - 回归测试周期长，修复一个小小bug可能都需要对所有关键业务进行回归测试。
    - 应用容错性差，某个小小功能的程序错误可能导致整个系统宕机；
    - 伸缩困难，单体应用扩展性能时只能整个应用进行扩展，造成计算资源浪费。
    - 开发协作困难，一个大型应用系统，可能几十个甚至上百个开发人员，大家都在维护一套代码的话，代码merge复杂度急剧增加。

### 微服务

- 技术演进都是有迹可循的，任何新技术的出现都是为了解决原有技术无法解决的需求，所以，微服务的出现就是因为**原来单体应用架构已经无法满足当前互联网产品的技术需求**。
- 在微服务架构之前还有一个概念：`SOA`（Service-Oriented Architecture）- **面向服务的体系架构**。
- SOA只是一个架构模型的方法论，并不是一个明确而严谨的架构标准，只是后面很多人将SOA与The Open Group的SOA参考模型等同了，认为严格按照TOG-SOA标准的才算真正的SOA架构。SOA就已经提出的面向服务的架构思想，所以微服务应该算是SOA的一种演进吧。
- 撇开架构先不说，什么样的服务才算微服务呢？
    - 单一职责的。一个微服务应该都是单一职责的，这才是“微”的体现，一个微服务解决一个业务问题（注意是一个业务问题而不是一个接口）。
    - 面向服务的。将自己的业务能力封装并对外提供服务，这是继承SOA的核心思想，一个微服务本身也可能使用到其它微服务的能力。
- 满足以上两点就可以认为典型的微服务。


## 微服务典型架构

- 微服务架构，核心是为了解决应用微服务化之后的服务治理问题。
- 应用微服务化之后，首先遇到的第一个问题就是服务发现问题，一个微服务如何发现其他微服务呢？最简单的方式就是每个微服务里面配置其他微服务的地址，但是当微服务数量众多的时候，这样做明显不现实。所以需要使用到微服务架构中的一个最重要的组件：服务注册中心，所有服务都注册到服务注册中心，同时也可以从服务注册中心获取当前可用的服务清单
- ![](https://upload-images.jianshu.io/upload_images/7584230-878e10904e206df0.png)
- 解决服务发现问题后，接着需要解决微服务分布式部署带来的第二个问题：服务配置管理的问题。当服务数量超过一定程度之后，如果需要在每个服务里面分别维护每一个服务的配置文件，运维人员估计要哭了。那么，就需要用到微服务架构里面第二个重要的组件：配置中心，微服务架构就变成下面这样了：
- ![](https://upload-images.jianshu.io/upload_images/7584230-9ec9d0d62f548d00.png)
- 以上应用内部的服务治理，当客户端或外部应用调用服务的时候怎么处理呢？服务A可能有多个节点，服务A、服务B和服务C的服务地址都不同，服务授权验证在哪里做？这时，就需要使用到服务网关提供统一的服务入口，最终形成典型微服务架构：
- ![](https://upload-images.jianshu.io/upload_images/7584230-186f38bae8b64850.png)
- 上面是一个典型的微服务架构，当然微服务的服务治理还涉及很多内容，比如：
    - 通过熔断、限流等机制保证高可用；
    - 微服务之间调用的负载均衡；
    - 分布式事务（2PC、3PC、TCC、LCN等）；
    - 服务调用链跟踪等等

## 微服务框架

- 目前国内企业使用的微服务框架主要是`Spring Cloud`和`Dubbo`（或者DubboX），但是Dubbo那两年的停更严重打击了开发人员对它的信心，Spring Cloud已经逐渐成为主流
- Spring Cloud全家桶提供了各种各样的组件，基本可以覆盖微服务的服务治理的方方面面，以下列出了Spring Cloud一些常用组件：
- ![](https://upload-images.jianshu.io/upload_images/7584230-16df8f7fbee37f37.png)

- [Python微服务框架nameko的简单使用](https://blog.csdn.net/eagleuniversityeye/article/details/102722741)
- [基于 Go 语言的微服务框架 Jupiter](https://www.oschina.net/question/4487475_2317201)

## 下一代微服务

- 目前网上很多说是下一代微服务架构就是Service Mesh，Service Mesh主流框架有Linkerd和Istio，其中Istio有大厂加持所以呼声更高。




# Python Web框架

- 参考：[Python Web服务器并发性能测试](https://blog.csdn.net/bandaoyu/article/details/88546515)

Python 常见部署方法有 ：
- `fcgi` ：用 spawn-fcgi 或者框架自带的工具对各个 project 分别生成监听进程，然后和 http 服务互动
- `wsgi` ：利用 http 服务的 mod_wsgi 模块来跑各个 project(Web 应用程序或框架简单而通用的 Web 服务器 之间的接口)。
- `uWSGI` 是一款像 php-cgi 一样监听同一端口，进行统一管理和负载平衡的工具，uWSGI，既不用 wsgi 协议也不用 fcgi 协议，而是自创了一个 uwsgi 的协议，据说该协议大约是 fcgi 协议的 10 倍那么快。

其实 WSGI 是分成 server 和 framework (即 application) 两部分 (当然还有 middleware)。严格说 WSGI 只是一个协议, 规范 server 和 framework 之间连接的接口。

- 所有的 Python Web框架都要遵循 WSGI 协议
- WSGI 中有一个非常重要的概念：每个Python Web应用都是一个可调用（callable）的对象。
    - 在 flask 中，这个对象就是 app = Flask(name) 创建出来的 app，图中的绿色Application部分。
    - 要运行web应用，必须有 web server，如熟悉的apache、nginx，或者python中的gunicorn，werkzeug提供的WSGIServer，是图的黄色Server部分
    - Server和Application之间怎么通信，就是WSGI的功能，规定了 app(environ, start_response) 的接口，server会调用 application，并传给它两个参数：environ 包含了请求的所有信息，start_response 是 application 处理完之后需要调用的函数，参数是状态码、响应头部还有错误信息。
    - ![](https://img-blog.csdn.net/20170530093502586)
    - WSGI application 非常重要的特点是可以嵌套。可以写个application，调用另外一个 application，然后再返回（类似一个 proxy）。一般来说，嵌套的最后一层是业务应用，中间就是 middleware。好处是可以解耦业务逻辑和其他功能，比如限流、认证、序列化等都实现成不同的中间层，不同的中间层和业务逻辑是不相关的，可以独立维护；而且用户也可以动态地组合不同的中间层来满足不同的需求。
    - Flask基于Werkzeug WSGI工具箱和Jinja2 模板引擎。Flask也被称为“microframework”，因为它使用简单的核心，用extension增加其他功能。Flask没有默认使用的数据库、窗体验证工具。然而，Flask保留了扩增的弹性，可以用Flask-extension加入这些功能：ORM、窗体验证工具、文件上传、各种开放式身份验证技术。Flask是一个核心，而其他功能则是一些插件
    - ![](https://img-blog.csdn.net/20170530093535180)
    - Flask是怎么将代码转换为可见的Web网页?
        - 从Web程序的一般流程来看，当客户端想要获取动态资源时，（比如ASP和PHP这类语言写的网站），会发起一个HTTP请求（比如用浏览器访问一个URL），Web应用程序就会在服务器后台进行相应的业务处理（比如对数据库进行操作或是进行一些计算操作等），取出用户需要的数据，生成相应的HTTP响应（当然，如果访问的是 静态资源 ，服务器则会直接返回用户所需的资源，不会进行业务处理）
        - ![](https://img-blog.csdn.net/20170530093546915)
        - 实际应用中，不同的请求可能会调用相同的处理逻辑，即Web开发中所谓的路由分发
        - ![](https://img-blog.csdn.net/20170530093643676)
        - Flask中，使用werkzeug来做路由分发，werkzeug是Flask使用的底层WSGI库（WSGI，全称 Web Server Gateway interface，或者 Python Web Server Gateway Interface，是为 Python 语言定义的Web服务器和Web应用程序之间的一种简单而通用的接口）。
        - WSGI将Web服务分成两个部分：服务器和应用程序。
            - WGSI服务器只负责与网络相关的两件事：接收浏览器的HTTP请求、向浏览器发送HTTP应答；
            - 而对HTTP请求的具体处理逻辑，则通过调用WSGI应用程序进行。
        - ![](https://img-blog.csdn.net/20170530093621801)
        - 参考：[Flask运行原理解析](https://blog.csdn.net/sunhuaqiang1/article/details/72808619)，[Flask应用运行过程剖析](https://blog.csdn.net/weixin_34250434/article/details/89072137)

WSGI server 把服务器功能以 WSGI 接口暴露出来。比如 mod_wsgi 是一种 server, 把 apache 的功能以 WSGI 接口的形式提供出来。
- WSGI framework 就是我们经常提到的 Django 这种框架。不过需要注意的是, 很少有单纯的 WSGI framework , 基于 WSGI 的框架往往都自带 WSGI server。比如 Django、CherryPy 都自带 WSGI server 主要是测试用途, 发布时则使用生产环境的 WSGI server。而有些 WSGI 下的框架比如 pylons、bfg 等, 自己不实现 WSGI server。使用 paste 作为 WSGI server。
- Paste 是流行的 WSGI server, 带有很多中间件。还有 flup 也是一个提供中间件的库。
搞清除 WSGI server 和 application, 中间件自然就清楚了。除了 session、cache 之类的应用, 前段时间看到一个 bfg 下的中间件专门用于给网站换肤的 (skin) 。中间件可以想到的用法还很多。
- 这里再补充一下, 像 django 这样的框架如何以 fastcgi 的方式跑在 apache 上的。这要用到 flup.fcgi 或者 fastcgi.py (eurasia 中也设计了一个 fastcgi.py 的实现) 这些工具, 它们就是把 fastcgi 协议转换成 WSGI 接口 (把 fastcgi 变成一个 WSGI server) 供框架接入。
    - 整个架构是这样的: django -> fcgi2wsgiserver -> mod_fcgi -> apache 。
- 虽然我不是 WSGI 的粉丝, 但是不可否认 WSGI 对 python web 的意义重大。有意自己设计 web 框架, 又不想做 socket 层和 http 报文解析的同学, 可以从 WSGI 开始设计自己的框架。在 python 圈子里有个共识, 自己随手搞个 web 框架跟喝口水一样自然, 非常方便。或许每个 python 玩家都会经历一个倒腾框架的

uWSGI 的主要特点如下：
- 超快的性能。
- 低内存占用（实测为 apache2 的 mod_wsgi 的一半左右）。
- 多app管理。
- 详尽的日志功能（可以用来分析 app 性能和瓶颈）。
- 高度可定制（内存大小限制，服务一定次数后重启等）。

Django就没有用异步，通过线程来实现并发，这也是WSGI普遍的做法，跟tornado不是一个概念


## web框架对比

- Python web框架的性能响应排行榜
    - 从并发性上看Fastapi完全碾压了 Flask (实际上也领先了同为异步框架的tornado 不少)
    - ![](https://pic4.zhimg.com/80/v2-7e31e8992685cc11594c5c31a65bc357_720w.jpg)
- 【2020-11-26】[Python Web 框架：Django、Flask 与 Tornado 的性能对比](https://www.jianshu.com/p/9960a9667a5c)，结论
   - Django：Python 界最全能的 web 开发框架，battery-include 各种功能完备，可维护性和开发速度一级棒。常有人说 Django 慢，其实主要慢在 Django ORM 与数据库的交互上，所以是否选用 Django，取决于项目对数据库交互的要求以及各种优化。而对于 Django 的同步特性导致吞吐量小的问题，其实可以通过 Celery 等解决，倒不是一个根本问题。Django 的项目代表：Instagram，Guardian。
   - Tornado：天生异步，性能强悍是 Tornado 的名片，然而 Tornado 相比 Django 是较为原始的框架，诸多内容需要自己去处理。当然，随着项目越来越大，框架能够提供的功能占比越来越小，更多的内容需要团队自己去实现，而大项目往往需要性能的保证，这时候 Tornado 就是比较好的选择。Tornado项目代表：知乎。
   - Flask：微框架的典范，号称 Python 代码写得最好的项目之一。Flask 的灵活性，也是双刃剑：能用好 Flask 的，可以做成 Pinterest，用不好就是灾难（显然对任何框架都是这样）。Flask 虽然是微框架，但是也可以做成规模化的 Flask。加上 Flask 可以自由选择自己的数据库交互组件（通常是 Flask-SQLAlchemy），而且加上 celery +redis 等异步特性以后，Flask 的性能相对 Tornado 也不逞多让，也许Flask 的灵活性可能是某些团队更需要的。

作者：Tim_Lee
链接：https://www.jianshu.com/p/9960a9667a5c


## Flask

![](https://pic3.zhimg.com/v2-ddbbe5dcf4fa4b35f11bca5f0546ecc3_1440w.jpg?source=172ae18b)

- [用Python 的Flask实现 RESTful API(学习篇)](https://zhuanlan.zhihu.com/p/32202156)


### 部署

- 示例代码

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.run()
```

- 浏览器上输入http://127.0.0.1:5000/，便会看到 Hello World！ 字样
- ![](https://picb.zhimg.com/80/v2-ea6c68e52462fb5025992cbb6b9728ed_720w.jpg)


### 传参

- 传递请求参数的方式有两种
    - 一是打包成 JSON 之后再传递
        - 一般用 POST 请求来传递参数，然后用 FLASK 中 request 模块的 get_json() 方法获取参数。
    - 二是直接放进 URL 进行传递 。
        - 一般用 GET 请求传递参数，然后从 request.args 中用 get() 方法获取参数
    - 不过需要说明的是用 POST 请求也可以通过 URL 的方式传递参数，而且获取参数的方式与 GET 请求相同。

```python
from flask import request, jsonify

@app.route('/', methods = ["GET", "POST"])
def post_data():
	# 假设有如下 JSON 数据
    #{"obj": [{"name":"John","age":"20"}] }
    
    #可以通过 request 的 args 属性来获取GET参数
    name = request.args.get("name")
    age = request.args.get("age")

    # ----- POST -----
    # 方法一
    data = request.get_json()                # 获取 JSON 数据
    data = pd.DataFrame(data["obj"])   # 获取参数并转变为 DataFrame 结构
    
    # 方法二
    # data = request.json        # 获取 JOSN 数据
    # data = data.get('obj')     #  以字典形式获取参数
    
    # ======= 统一 ======
    if request.method == 'POST':
        data = request.json
        data = request.form.to_dict()
        data = request.values
    elif request.method == 'GET':
        data = request.args

    # 经过处理之后得到要传回的数据
    res = some_function(data)
    
    # 将 DataFrame  数据再次打包为 JSON 并传回
    # 方法一
    res = '\{\{"obj": {} \}\}'.format(res.to_json(orient = "records", force_ascii = False))
    # 方法二
    # res = jsonify({"obj":res.to_json(orient = "records", force_ascii = False)})
    
    return res
```


### 自动生成APIs文档

- 【2020-8-22】[自动为Flask写的API生成帮助文档](https://segmentfault.com/a/1190000013420209)
    - ![](https://segmentfault.com/img/remote/1460000013420214?w=1760&h=1424)
- [使用swagger 生成 Flask RESTful API](https://segmentfault.com/a/1190000010144742)
- [Flask 系列之 构建 Swagger UI 风格的 WebAPI](https://www.cnblogs.com/hippieZhou/p/10848023.html), 基于 Flask 而创建 Swagger UI 风格的 WebAPI 包有很多，如
    - [flasgger](https://github.com/rochacbruno/flasgger)
    - [flask-swagger-ui](https://github.com/sveint/flask-swagger-ui)
    - [swagger-ui-py](https://github.com/PWZER/swagger-ui-py)
    - [flask_restplus](https://www.cnblogs.com/leejack/p/9162367.html)
    - ![](https://img2018.cnblogs.com/blog/749711/201905/749711-20190511131630516-1117259038.png)

- 实践
    - 安装：
        - flask_restplus实践失败，个别依赖不满足，放弃
        - pip install [flasgger](https://github.com/flasgger/flasgger)
    - 测试：如下 


```python
# coding:utf8

#/**************************************************************************
# * 
# * Copyright (c) 2020, Inc. All Rights Reserved
# * 
# **************************************************************************
# * @file main.py
# * @author wangqiwen
# * @date 2020/08/22 08:32
# **************************************************************************

from flask import Flask, request, render_template
#from flask_restplus import Api
from flasgger import Swagger, swag_from

app = Flask(__name__)
# swagger api封装，每个接口的注释文档中按照yaml格式排版
Swagger(app)

@app.route('/')
#@app.route("/index",methods=["GET","POST"])
#@app.route("/index/<int,>")
def hello_world():

    """
    API说明
    副标题（点击才能显示）
    ---
    tags:
      - 自动生成示例
    parameters:
      - name: language
        in: path
        type: string
        required: true
        description: 变量含义
    responses:
      500:
        description: 自定义服务端错误
      200:
        description: 自定义状态描述
        schema:
          id: awesome
          properties:
            language:
              type: string
              description: The language name
              default: Lua
    """ 
    return render_template('index.html')

@app.route("/tmp",methods=["GET","POST"])
def tmp():
    """
        临时接口
    """
    return render_template('index.html')

if __name__ == '__main__':
    #app.run()
    #app.run(debug=True)
    app.run(debug=True, host='10.26.15.30', port='8044')

# */* vim: set expandtab ts=4 sw=4 sts=4 tw=400: */
```

- 【2020-8-26】页面测试功能对POST无效，传参失败
    - 已提交issue：[Failed to get parameters by POST method in “try it out” feature](https://github.com/flasgger/flasgger/issues/428)


### 全局变量

- 参考: [Flask 上下文全局变量](https://www.jianshu.com/p/dfe1ee1dc1ec)
- Flask 在分发请求之前激活(或推送)程序和请求上下文，请求处理完成后再将其删除。程 序上下文被推送后，就可以在线程中使用 current_app 和 g 变量。类似地，请求上下文被 推送后，就可以使用 request 和 session 变量。如果使用这些变量时我们没有激活程序上 下文或请求上下文，就会导致错误。

|变量名|	上下文|	说明|
|---|---|---|
|current_app	| 程序上下文|	当前激活程序的程序实例|
|g	|程序上下文	| 处理请求时用作临时存储的对象，每次请求都会重设这个变量|
|request	| 请求上下文|	请求对象，封装了客户端发出的HTTP请求中的内容|
|session	| 请求上下文|	用户会话，用于存储请求之间需要记住的值的词典|

- 代码示例：[flask中4种全局变量](https://www.jianshu.com/p/f24e2c9b548e)

**Session设置**

- 代码

```python
from flask import Flask,session
import os
from datetime import timedelta
app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)
#SESSION_TYPE = "redis"
# 添加数据到session中
# 操作session的时候 跟操作字典是一样的。
# SECRET_KEY

@app.route('/')
def hello_world():
    session['username'] = 'zhangsan'
    # 如果没有指定session的过期时间，那么默认是浏览器关闭就自动结束
    # 如果设置了session的permanent属性为True，那么过期时间是31天。
    session.permanent = True
    return 'Hello World!'

@app.route('/get/')
def get():
    # session['username']   如果username不存在则会抛出异常
    # session.get('username')   如果username不存在会得到 none 不会报错 推荐使用
    return session.get('username')

@app.route('/delete/')
def delete():
    print(session.get('username'))
    session.pop('username')
    print(session.get('username'))
    return 'success'

@app.route('/clear/')
def clear():
    print(session.get('username'))
    # 删除session中的所有数据
    session.clear()
    print(session.get('username'))
    return 'success'

if __name__ == '__main__':
    app.run(debug=True)
```

**分布式session**

- 【2020-9-11】以上代码仅适用单机版，如果部署在分布式环境，流量负载均衡，会出现session找不到的现象
- 分布式session一致性：
    - 客户端发送一个请求，经过负载均衡后该请求会被分配到服务器中的其中一个，由于不同服务器含有不同的web服务器(例如Tomcat)，不同的web服务器中并不能发现之前web服务器保存的session信息，就会再次生成一个JSESSIONID，之前的状态就会丢失

- 【2020-9-18】Flask Session共享的一种实现方式：使用出问题（待核实原因），改用redis直接存储session变量
    - [flask-session 在redis中存储session](https://www.cnblogs.com/jackadam/p/9822680.html)

```python
import os
from flask import Flask, session, request
from flask_session import Session
from redis import Redis

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'redis'   #session存储格式为redis
app.config['SESSION_REDIS'] = Redis(    #redis的服务器参数
    host='192.168.1.3',                 #服务器地址
    port=6379)                           #服务器端口

app.config['SESSION_USE_SIGNER'] = True   #是否强制加盐，混淆session
app.config['SECRET_KEY'] = os.urandom(24)  #如果加盐，那么必须设置的安全码，盐
app.config['SESSION_PERMANENT'] = False  #sessons是否长期有效，false，则关闭浏览器，session失效
app.config['PERMANENT_SESSION_LIFETIME'] = 3600   #session长期有效，则设定session生命周期，整数秒，默认大概不到3小时。
Session(app)


@app.route('/')
def default():
    return session.get('key', 'not set')

@app.route('/test/')
def test():
    session['key'] = 'test'
    return 'ok'

@app.route('/set/')
def set():
    arg = request.args.get('key')
    print(arg)
    session['key'] = arg
    return 'ok'


@app.route('/get/')
def get():
    return session.get('key', 'not set')


@app.route('/pop/')
def pop():
    session.pop('key')
    return session.get('key', 'not set')


@app.route('/clear/')
def clear():
    session.clear()
    return session.get('key', 'not set')

if __name__ == "__main__":
    app.run(debug=True)
```


- 解决方法：
    - 参考：
        - [如何配置 flask将session 保存在redis中](https://www.cnblogs.com/wangkun122/articles/9118009.html)
        - [4种分布式session解决方案](https://blog.csdn.net/qq_35620501/article/details/95047642)
        - [分布式session的几种实现方式](https://www.cnblogs.com/daofaziran/p/10933221.html)

- 方案一：**客户端存储**
    - 直接将信息存储在cookie中
    - cookie是存储在客户端上的一小段数据，客户端通过http协议和服务器进行cookie交互，通常用来存储一些不敏感信息
    - 缺点：
        - 数据存储在客户端，存在安全隐患
        - cookie存储大小、类型存在限制
        - 数据存储在cookie中，如果一次请求cookie过大，会给网络增加更大的开销
- 方案二：**session复制**
    - session复制是小型企业应用使用较多的一种服务器集群session管理机制，在真正的开发使用的并不是很多，通过对web服务器(例如Tomcat)进行搭建集群。
    - 存在的问题：
        - session同步的原理是在同一个局域网里面通过发送广播来异步同步session的，一旦服务器多了，并发上来了，session需要同步的数据量就大了，需要将其他服务器上的session全部同步到本服务器上，会带来一定的网路开销，在用户量特别大的时候，会出现内存不足的情况
    - 优点：
        - 服务器之间的session信息都是同步的，任何一台服务器宕机的时候不会影响另外服务器中session的状态，配置相对简单
        - Tomcat内部已经支持分布式架构开发管理机制，可以对tomcat修改配置来支持session复制，在集群中的几台服务器之间同步session对象，使每台服务器上都保存了所有用户的session信息，这样任何一台本机宕机都不会导致session数据的丢失，而服务器使用session时，也只需要在本机获取即可
- 方案三：**session绑定**
    - Nginx介绍：Nginx是一款自由的、开源的、高性能的http服务器和反向代理服务器
    - Nginx能做什么：反向代理、负载均衡、http服务器（动静代理）、正向代理
    - 如何使用nginx进行session绑定
        - 利用nginx的反向代理和负载均衡，之前是客户端会被分配到其中一台服务器进行处理，具体分配到哪台服务器进行处理还得看服务器的负载均衡算法(轮询、随机、ip-hash、权重等)，但是我们可以基于nginx的ip-hash策略，可以对客户端和服务器进行绑定，同一个客户端就只能访问该服务器，无论客户端发送多少次请求都被同一个服务器处理
    - 缺点：
        - 容易造成单点故障，如果有一台服务器宕机，那么该台服务器上的session信息将会丢失
        - 前端不能有负载均衡，如果有，session绑定将会出问题
    - 优点：
        - 配置简单
- 方案四：**session持久化到数据库**
    - 如：基于redis存储session方案
    - 原理：就不用多说了吧，拿出一个数据库，专门用来存储session信息。保证session的持久化。
    - 优点：服务器出现问题，session不会丢失
    - 缺点：如果网站的访问量很大，把session存储到数据库中，会对数据库造成很大压力，还需要增加额外的开销维护数据库。
    - 优点：
        - 企业中使用的最多的一种方式
        - spring为我们封装好了spring-session，直接引入依赖即可
        - 数据保存在redis中，无缝接入，不存在任何安全隐患
        - redis自身可做集群，搭建主从，同时方便管理
    - 缺点：
        - 多了一次网络调用，web容器需要向redis访问
    - 基于redis存储session方案流程示意图
![](https://img-blog.csdnimg.cn/2019070810495327.png)

- 方案五：**session复制**
    - terracotta实现session复制
    - Terracotta的基本原理是对于集群间共享的数据，当在一个节点发生变化的时候，Terracotta只把变化的部分发送给Terracotta服务器，然后由服务器把它转发给真正需要这个数据的节点。对服务器session复制的优化。

```python
SESSION_TYPE = "redis"

#在settings.py中写上这句话就能够让flask把session写在  redis中去
SESSION_REDIS = Redis(host='192.168.0.94', port='6379')

```

- 【2020-9-24】[深夜，我偷听到程序员要对Session下手……](https://www.toutiao.com/i6875568455475528203/)，演变历史：
    - **单机服务器**(静态) → 单机服务器(动态) → **分布式服务器**（Nginx） → Redis**独立存储** → **Token时代**
    - （1）**单台Web服务器-静态**：一个web服务器，每天处理的不过是一些静态资源文件，像HTML、CSS、JS、图片等等，按照HTTP协议的规范处理请求即可。
        - ![](https://p6-tt.byteimg.com/origin/pgc-image/da73c2849fb04ad3b5e47ec55dc47d0a)
    - （2）**单台Web服务器-动态**：
        - 动态交互的网络应用开始如雨后春笋般涌现，像各种各样的论坛啊，购物网站啊之类
        - Session诞生：记住每一个请求背后的用户是谁
        - 浏览器登陆以后，服务器分配一个session id，表示一个会话，然后返回给浏览器保存着。后续再来请求的时候，带上，就能知道是谁
        - ![](https://p6-tt.byteimg.com/origin/pgc-image/1c616a10971e41929a9408e990eb3a12)
    - （3）**分布式Web服务器**：
        - 没几年，互联网的发展实在是太快，用户量蹭蹭上涨，session id数量也与日俱增，服务器不堪重负
        - 增加nginx来进行负载均衡，单台服务器变成了3台web服务器组成的小集群
        - ![](https://p6-tt.byteimg.com/origin/pgc-image/3fd170a8dec5461996e19b3d9c6ee107)
        - 压力虽然减少，但session id的管理问题却变得复杂起来
            - 请求如果发到某台机器，登记了session id，但下次请求说不定就发到第二胎，一会儿又发到第三台，这样各个服务器上的信息不一致，就会出现一些异常情况，用户估计要破口大骂：这什么辣鸡网站？
            - （3.1）nginx：同一个用户来的请求都发给同一台机器
        - 好景不长，各服务器相继出现宕机情况，这时候nginx还得把请求交给还在工作的机器，原来的问题就又出现了
            - （3.2）session同步：有新增、失效的情况都给其他机器招呼一下，大家都管理一份，这样就不会出现不一致的问题
            - ![](https://p3-tt.byteimg.com/origin/pgc-image/a94ead3997324b24ac73ad59cccdc576)
        - 搞了半天，又回到从前，一个人管理所有session id的情况了，不仅如此，还要抽出时间和几位兄弟同步，把session id搬来搬去，工作量不减反增了。
    - （4）**独立缓存**——Redis
        - session id都统一存在redis里面
        - ![](https://p6-tt.byteimg.com/origin/pgc-image/ea7f5139129c416ab80ca4efb60c2764)
    - （5）**Token时代**
        - Redis也不是万能的，也有崩溃的风险，一崩溃就全完了
        - JWT（JSON Web Token） 技术，硬说让redis来管理保存session id负担太重了，以后不保存了
        - 没有session id，但是换了一个token，用它来识别用户
        - ![](https://p3-tt.byteimg.com/origin/pgc-image/863480eff55a489b879373ff4fb7dcf1)
        - 第一部分是JWT的基本信息，然后把用户的身份信息放在第二部分，接着和第一部分合在一起做一个计算，计算的时候加入了一个只有我们才知道的密钥secretkey，计算结果作为第三部分。最后三部分拼在一起作为最终的token发送给客户端保存着···再收到这个token的时候，就可以通过同样的算法验证前面两部分的结果和第三部分是不是相同，就知道这个token是不是伪造的啦！因为密钥只有我们知道，别人没办法伪造出一个token的！最后确认有效之后，再取第二部分的用户身份信息，就知道这是谁了
        - ![](https://p3-tt.byteimg.com/origin/pgc-image/32c0bd9dfa704f0d808a452106bfa930)
    - JWT：目前有两种实现方式
        - ![](https://img2018.cnblogs.com/blog/1552472/201911/1552472-20191115165339758-1975183863.png)
        - JWS(JSON Web Signature)
            - ![](https://img2018.cnblogs.com/blog/1552472/201911/1552472-20191115161445577-896569505.png)
            - 分成三个部分：
                - 头部（Header）：用于描述关于该JWT的最基本的信息，例如:其类型、以及签名所用的算法等。JSON内容要经Base64 编码生成字符串成为Header。
                - 载荷（PayLoad）：payload的五个字段都是由JWT的标准所定义的。
                    - iss: 该JWT的签发者
                    - sub: 该JWT所面向的用户
                    - aud: 接收该JWT的一方
                    - exp(expires): 什么时候过期，这里是一个Unix时间戳
                    - iat(issued at): 在什么时候签发的
                    - 后面的信息可以按需补充。 JSON内容要经Base64 编码生成字符串成为PayLoad。
                - 签名（signature）：这个部分header与payload通过header中声明的加密方式，使用密钥secret进行加密，生成签名。JWS的主要目的是保证了数据在传输过程中不被修改，验证数据的完整性。但由于仅采用Base64对消息内容编码，因此不保证数据的不可泄露性。所以不适合用于传输敏感数据。
        - JWE(JSON Web Encryption)
            - 相对于JWS，JWE则同时保证了安全性与数据完整性。 JWE由五部分组成：
            - ![](https://img2018.cnblogs.com/blog/1552472/201911/1552472-20191115161640088-1851802272.png)
            - JWE的计算过程相对繁琐，不够轻量级，因此适合与数据传输而非token认证，但该协议也足够安全可靠，用简短字符串描述了传输内容，兼顾数据的安全性与完整性
            - 具体生成步骤为：
                - JOSE含义与JWS头部相同。
                - 生成一个随机的Content Encryption Key （CEK）。
                - 使用RSAES-OAEP 加密算法，用公钥加密CEK，生成JWE Encrypted Key。
                - 生成JWE初始化向量。
                - 使用AES GCM加密算法对明文部分进行加密生成密文Ciphertext,算法会随之生成一个128位的认证标记Authentication Tag。 6.对五个部分分别进行base64编码。
    -  Python实现：PyJWT
    - 详情：[flask项目--认证方案Json Web Token(JWT)](https://www.cnblogs.com/oklizz/p/11414429.html)

```python
import jwt
from jwt import PyJWTError
from datetime import datetime, timedelta

payload = {  # jwt设置过期时间的本质 就是在payload中 设置exp字段, 值要求为格林尼治时间
    "user_id": 1,
    'exp': datetime.utcnow() + timedelta(seconds=30)
}

screct_key = "test"
# 生成token
token = jwt.encode(payload, key=screct_key, algorithm='HS256')
print(token)
# 验签token  返回payload    pyjwt会自动校验过期时间
try:
    data = jwt.decode(token, key=screct_key, algorithms='HS256')
    print(data)
except PyJWTError as e:
    print("jwt验证失败: %s" % e)
```


## Django



## [Fastapi](https://github.com/tiangolo/fastapi)

![](https://pic1.zhimg.com/v2-76eee9e74c12fdf22c682fe5475f2ab2_1440w.jpg?source=172ae18b)

- [FastAPI使用小结](https://zhuanlan.zhihu.com/p/136621431)
- [全面拥抱 FastApi — 多应用程序管理蓝图APIRouter](https://zhuanlan.zhihu.com/p/120885265)
- [（入门篇）Python框架之FastAPI——一个比Flask和Tornado更高性能的API 框架](https://zhuanlan.zhihu.com/p/131618992)
- [（进阶篇）Python web框架FastAPI——一个比Flask和Tornada更高性能的API 框架](https://mp.weixin.qq.com/s?__biz=MzU3MzQxMjE2NA==&mid=2247486752&idx=1&sn=0036ae16fe1a80895e2b31d02d1dac84&chksm=fcc34b0bcbb4c21d104541dc28fa1786eafd77072da068b3e8b537a13dbb8f96cb9c643fd6e3&scene=21#wechat_redirect)
- [（完结篇）Python框架之FastAPI——一个比Flask和Tornado更高性能的API 框架](https://zhuanlan.zhihu.com/p/131625459)

### 简介

- FastAPI是一个现代、快速（高性能）的 Web 框架，基于标准 Python 类型提示，使用 Python 3.6+ 构建 API。
- 几点感受：
    - 性能并发更强了，支持异步 async
    - 基于 Pydantic 的类型声明，自动校验参数
    - 自动生成交互式的 API 接口文档
        - Django REST Framework 的主要功能是自动 API 文档。 API 文档有个标准叫 [Swagger](https://swagger.io/) ，用 JSON 或 YAML 来描述。
    - 上手简单，能快速编码
- 主要特征是：
    - 高速：与NodeJS和Go相当，拥有高性能。 现有最快的Python框架之一。
        - 并发性能可以和 NodeJS 以及 Go 相媲美。它是基于Starlette框架, 类似于Starlette 的一个子类。
    - 快速编码：将功能开发速度提高约200％至300％。
    - 更少的Bug：减少约40％的人为（开发人员）导致的错误。
    - 直观：更好的编辑支持。补全任何地方。更少的调试时间。
    - 简单：方便使用和学习。减少阅读文档的时间。
    - 简介：最小化代码重复。每个参数声明的多个要素。更少的错误。
    - 健壮：获取便于生产的代码。带自动交互式文档。
    - 基于标准：基于（并完全兼容）API 的开放标准：OpenAPI（以前称为Swagger）和 JSON Schema。
- [文档](https://fastapi.tiangolo.com)

### 部署

```shell
# 安装
pip install fastapi
pip install uvicorn
pip install gunicorn # 或者
#使用uvicorn启动
uvicorn sql_app.main:app --reload
# 指定host和port
uvicorn main:app --host=0.0.0.0 --port=8800
```

- 访问
    - http://127.0.0.1:8000
    - 打开自动生成的[文档](http://127.0.0.1:8000/docs)：http://127.0.0.1:8000/docs，可以动态传入数据
        - ![](https://picb.zhimg.com/80/v2-27e0a1f1fa58c3fbde1839b010e482ff_720w.jpg)


### 使用

#### 代码示例

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def index():
    return "Hello world"


@app.get("/items/{item_id}")
async def read_item(item_id: str, q: str = None, short: bool = False):
    item = {"item_id": item_id}
    if q:
        item.update({"q": q})
    if not short:
        item.update(
            {"description": "This is an amazing item that has a long description"}
        )
    return item
```


# 前端

- 【2020-8-22】[微信聊天窗口界面](https://github.com/kuangwk/wechat-chat-interface)
    - ![](https://github.com/kuangwk/wechat-chat-interface/raw/css/screenshot.png)
- 【2020-8-28】[EasyMock](https://www.easy-mock.com/login)[文档](https://easy-mock.com/docs)，[Github地址](https://github.com/easy-mock/easy-mock)，Easy Mock 是一个可视化，并且能快速生成 模拟数据 的持久化服务
    - ![](https://camo.githubusercontent.com/e3e9c378dd2f6d8349922f9e3cb0f7ee095533a9/687474703a2f2f696d672e736f756368652e636f6d2f6632652f33313362333661616137643061336166303837313863333861323836393533342e706e67)


## js

- 【2020-8-26】[JavaScript运行机制](https://www.toutiao.com/i6748661672522547719/)
- JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。那么，为什么JavaScript不能有多个线程呢？这样能提高效率啊。
- JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？
- 所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。
- 所有任务分成两种，一种是同步任务（synchronous）
    - 另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；
    - 异步任务指的是，不进入主线程、而进入”任务队列”（task queue）的任务，只有”任务队列”通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。
        - 异步执行的运行机制如下：(这种运行机制又称为Event Loop（事件循环）)
            - 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
            - 主线程之外，还存在一个”任务队列”（task queue）。只要异步任务有了运行结果，就在”任务队列”之中放置一个事件。
            - 一旦”执行栈”中的所有同步任务执行完毕，系统就会读取”任务队列”，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
            - 主线程不断重复上面的第三步。
        - ![](https://p1-tt.byteimg.com/origin/pgc-image/e508259a15a04b3bbda091e0989390fb?from=pc)

```javascript
console.log(1);
setTimeout(function(){
console.log(3);
},0);
console.log(2);
//请问数字打印顺序是什么？
```


## HTML

- 【2020-8-24】Web页面分栏效果实现
    - HTML中Frame实现左右分栏或上下分栏
    - FrameSet中的Cols属性就控制了页面中的左右分篮，相应的rows则控制上下分栏
    - 分栏的比例就有用逗号分开的10，*来确定

```html
<frameset border=10 framespacing=10 cols=”10,*” frameborder="1"   TOPMARGIN="0"  LEFTMARGIN="0" MARGINHEIGHT="0" MARGINWIDTH="0">
  <frame>
 <frame>
</framset>
```

## ajax

- [ajax post 请求发送 json 字符串](https://www.cnblogs.com/virgosnail/p/10108997.html)

代码：

```javascript
    $.ajax({
        // 请求方式
        type:"post",
        // contentType 
        contentType:"application/json",
        // dataType
        dataType:"json",
        // url
        url:url,
        // 把JS的对象或数组序列化一个json 字符串
        data:JSON.stringify(data),
        // result 为请求的返回结果对象
        success:function (result) {
            if (200 == result.code){
                alert("启动成功");
            }else{
                alert("启动失败");
            }
        }
    });
```



# 结束
















