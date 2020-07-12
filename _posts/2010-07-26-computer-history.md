---
layout: post
title:  "计算机发展史-Computer History"
date:   2010-07-26 23:42:00
categories: 计算机基础
tags: 高德纳 乔姆斯基 图灵 冯·诺依曼 陈皓
excerpt: 计算机发展历史，编程语言诞生过程，及几位关键人物
mathjax: true
---

* content
{:toc}

# [计算机编程简史](https://coolshell.cn/articles/2724.html)

- 一张经典的图揭示计算机发展历史
- 可以看到，其中很大一部分人都和Unix有着不解之缘
   - 参见《[Unix传奇上篇](https://coolshell.cn/articles/2322.html)，[Unix传奇下篇](https://coolshell.cn/articles/2324.html)》
 
*   [英文原版](http://www.smashingmagazine.com/2010/06/06/designing-the-world-of-programming-infographic/)
*   [中文翻译版](http://www.mazingtech.com/cn/list.aspx/News/1/%E5%9B%BE%E8%AF%B4%E8%AE%A1%E7%AE%97%E6%9C%BA%E7%BC%96%E7%A8%8B%E7%AE%80%E5%8F%B2)

---

[![](https://coolshell.cn/wp-content/uploads/2010/07/aboutprogramming04.eng_-409x1024.jpg "计算机编程简史图（英文版） ")](https://coolshell.cn/wp-content/uploads/2010/07/aboutprogramming04.eng_.jpg)
 
计算机编程简史图（英文版）
---
 
[![](https://coolshell.cn/wp-content/uploads/2010/07/aboutprogramming04_cn-409x1024.jpg "计算机编程简史图（中文版） ")](https://coolshell.cn/wp-content/uploads/2010/07/aboutprogramming04_cn.jpg)
 
计算机编程简史图（中文版）

## 计算机之父
- “计算机之父”这种笼统的称谓没有明确的结果。你可以认为是图灵，也可以认为是冯·诺依曼，你认为是谁就是谁。
- 非要叫的话可以是：
   - `巴贝奇`Charles Babbage——**通用计算机**之父
      - 巴贝奇在1834年所构思的分析机（通用计算机），就已有了计算机的五个部分：处理器、控制器、存储器、输入与输出装置，而不是到了冯·诺依曼才提出的。
      - 生活在机械时代，却构思出了完整的计算机结构，领先世界一百年。
      - [机械美学：差分机的运作](https://v.qq.com/x/page/i0164fo4om1.html)
      - <iframe frameborder="0" src="https://v.qq.com/txp/iframe/player.html?vid=d0319t31fw9" allowFullScreen="true" height="600" width="100%"></iframe>
   - `图灵`Alan Turing——**计算机科学**之父
      - 图灵在现在毫无疑问是名气最大的，有套书以他命名，还有个公司用他咬过的苹果做logo。
      - 图灵也是个天才，他的工作非常有开创性，系统建构了计算机科学的基础，提出了图灵机、图灵测试，所以被称为“计算机科学之父”。
   - `约翰·阿坦那索夫`John Vincent Atanasoff——**电子计算机**之父
      - 阿坦纳索夫和克利福德·贝瑞在1939年制造了`ABC机`。
      - 在电子时代，作为第一台电子计算机的发明者，拔得了头筹，也够资格被称为“电子计算机之父”了。
      - 那时也已经开始使用二进制了，所以二进制也不是冯·诺依曼首创的。
   - `冯·诺依曼`John von Neumann——**现代计算机**之父
      - 在科学界名声很响，有许多开创性的工作，包括数学、量子力学、计算机和经济学领域。
      - 他对二战的贡献很大，不仅参与原子弹研制，还对ENIAC作了关键改进。
      - 另外他还最终完善了计算机的模型，提出冯诺依曼机，奠定了我们现代所使用的计算机的基础。所以把冯诺依曼称为“现代计算机之父”是实至名归的。

- 参考作者：[滑稽现实主义](https://www.zhihu.com/question/27883465/answer/93161520)


## 图灵

- ![](https://pic2.zhimg.com/80/v2-acdf678e24dba6143bc5cfeea626afb0_720w.jpg)
- 艾伦·麦席森·图灵（英语：Alan Mathison Turing，1912年6月23日—1954年6月7日），英国数学家、逻辑学家，被称为计算机科学之父，人工智能之父。
- 1931年图灵进入剑桥大学国王学院，毕业后到美国普林斯顿大学攻读博士学位，第二次世界大战爆发后回到剑桥，后曾协助军方破解德国的著名密码系统Enigma，帮助盟军取得了二战的胜利。
- 1952年，英国政府对图灵的同性恋取向定罪，随后图灵接受化学阉割（雌激素注射）。
- 1954年6月7日，图灵吃下含有氰化物的苹果中毒身亡，享年41岁。
- 2013年12月24日，在英国司法大臣克里斯·格雷灵的要求下，英国女王伊丽莎白二世向图灵颁发了皇家赦免。
- 图灵对于人工智能的发展有诸多贡献，提出了一种用于判定机器是否具有智能的试验方法，即图灵试验，至今，每年都有试验的比赛。此外，图灵提出的著名的图灵机模型为现代计算机的逻辑工作方式奠定了基础。

### 图灵奖


## 冯诺依曼

- ![](https://pic2.zhimg.com/80/v2-e4d433440561afc5f86bb3e14abd500f_720w.jpg)
- `冯·诺依曼`体系计算机又称存储程序计算，主要由以下几部分组成：
   - CPU（Central Processing Unit）：由控制器、运算器以及寄存器组成
   - 存储器（Memory）:即我们常说的内存
   - I/O设备：输入输出设备
- ![](https://pic2.zhimg.com/80/v2-7c443e162c8c42a605c63dedb96dda1e_720w.jpg)
- 主要特点
   - 程序存储执行
      - 计算机是靠诸多晶体管控制电路而运行，早期的计算机是靠手动控制电路执行，这种设计缺点在于，程序是一次性执行，即没办法存储起来反复执行；
      - 冯·诺依曼体系计算机，则提出了程序是可存储执行，即人们把要执行的程序存储在一个地方，然后在运行的时候让CPU去固定的地方去取，这样做的好处是程序可以存储起来多次运行，且修改程序不需要手动调整电路；
   - 二进制逻辑
      - 十进制逻辑的计数有利于人类阅读，但不利于电路设计，在电路中，状态一般有两种开启或者关闭，二进制逻辑的设计简化了计算机内部电路的设计

## 高德纳
- [Donald Knuth](https://www-cs-faculty.stanford.edu/~knuth/)，高德纳，《[计算机程序与设计](http://www-cs-faculty.stanford.edu/~uno/taocp.html)》作者，计算科学之父
   - 计算机科学技术中两个最基本的概念：“`算法`”(Algorithm)和“`数据结构`”(Data Structure)就是高德纳于 29 岁时提出来的
   - 艺术是人类智慧的最高形式
   - 高德纳是他的中文名，是 1977 年他访问中国之前所取的，命名者是姚储枫(姚期智的夫人，夫妇都是计算机科学家)。
   - [计算机鼻祖-Donald Knuth（高德纳） 的传奇](https://blog.csdn.net/gatieme/article/details/25613645)

![](http://5b0988e595225.cdn.sohucs.com/images/20180116/caa893f622634d1a8cf8e52f27a99bce.jpeg)




# 结束