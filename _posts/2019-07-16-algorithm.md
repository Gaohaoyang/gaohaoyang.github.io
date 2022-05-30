---
layout: post
title:  "计算机经典基础算法总结-Classical Algorithm"
categories: 计算机基础
tags:  数据结构 算法 KMP Morris 二叉树 字符串 leetcode 面试
author: 风之筝
excerpt: 有哪些经典算法让人拍手称快、赞叹不已？
mathjax: true
---

* content
{:toc}

- 本栏目汇总各类经典的基础算法

# 总结

- 【2022-5-24】[脉脉帖子](https://maimai.cn/web/gossip_detail/30456623): 近期面试了100多人，大部分人能力都比较差。
  - 凸包算法，经提示能写出来的2个。
  - 二叉树的 morris 遍历，能写出来的5个。
  - 孤岛问题，10来个人。
  - 接雨水，能想到双指针法的10个不到，动规或单调栈的10来个，哪怕最起码暴力解也不到一半人。
  - 最简单的二分，依然有30％以上做不出来。
  - 是我收到简历的质量太差了吗？看脉脉，几乎人均秒 medium , hard 也不是什么难事；
  - 有趣的是，我向大家透露了社招真实环境里这些题目的能写出来的比例，这可比 lc 上的 ac 率真实多了，被一顿狂喷。那些喷我的人，他们下次当面试官时，照样去 Ic 上找几道 medium 甚至 hard ，稍微改改考面试者。
- 【2022-2-28】[labuladong 的算法小抄](https://mp.weixin.qq.com/s/yN4cHQRsFa5SWlacopHXYQ)，[fucking-algorithm](https://github.com/labuladong/fucking-algorithm)，[GitHub Pages](https://labuladong.github.io/algo/)，总共 60 多篇原创文章，都是基于 LeetCode 的题目，涵盖了所有题型和技巧，而且一定要做到举一反三，通俗易懂，绝不是简单的代码堆砌，后面有目录。刷题刷题，刷的是题，培养的是思维，本仓库的目的就是传递这种算法思维。
- 【2021-11-7】[The Algorithms](https://the-algorithms.com/#aboutUs)，[项目地址](https://github.com/TheAlgorithms), 分别提供了用 Python、Java、C、C++ 等数十种编程语言实现的算法，每种语言都有自己的 GitHub 算法代码库。如下领域的算法：
  - 排序（Sorts）算法
  - 搜索（Searches）算法
  - 动态规划（Dynamic Programming）算法: 编辑距离（Edit Distance）、子集和问题（Sum of Sunset）、最小分区（Minimum Partition）等子算法。
  - 加密（Ciphers）算法
  - 数据结构（Data Structures）算法
  - 数学（Math）算法
  - 数字图像处理（Digital Image Processing）算法
- 【2022-5-24】[计算机基础笔记](https://note.youdao.com/s/bN1i6C7J)，有道云


## 观点

【2012-8-22】陈皓：[为什么我反对纯算法面试题](https://coolshell.cn/articles/8138.html)
- 问难的算法题并没有错，错的很多面试官只是在肤浅甚至错误地理解着面试算法题的目的。
- 能解算法题并不意味着这个人就有能力就能在工作中解决问题，你可以想想，小学奥数题可能比这些题更难，但并不意味着那些奥数能手就能解决实际问题。
- **纯算法题根本不能反映一个程序员的综合能力**
- 要考量程序员的那些综合素质呢？
	- 会不会做需求分析？怎么理解问题的？
	- 解决问题的思路是什么？想法如何？
	- 会不会对基础的算法和数据结构灵活运用？
- 工程上，难是的是这些挑战：
	- 软件的维护成本远远大于软件的开发成本。
	- 软件的质量变得越来越重要，所以，测试工作也变得越来越重要。
	- 软件的需求总是在变的，软件的需求总是一点一点往上加的。
	- 程序中大量的代码都是在处理一些错误的或是不正常的流程。
- 对于编程能力上，应该主要考量程序员如下能力：
	- 设计是否满足对需求的理解，并可以应对可能出现的需求变化。
	- 程序是否易读，易维护？
	- 重构代码的能力如何？
	- 会不会测试自己写好的程序？

## 代码实战

【2022-5-20】[wqw547243068/DS_Algorithm](https://github.com/wqw547243068/DS_Algorithm/blob/master/LeetCode%E5%AD%A6%E4%B9%A0%E7%AC%94%E8%AE%B0.ipynb)
- crack the coding interview： C++ 编写
- 剑指offer


# 数据结构与算法

- 数据结构算法可视化网站[visualgo](https://visualgo.net/en)
- 基础算法可视化algorithm-visualizer，[GitHub地址](https://github.com/algorithm-visualizer/algorithm-visualizer),[演示地址](https://algorithm-visualizer.org/)
- 【2020-1-2】[清华大学邓俊辉](https://dsa.cs.tsinghua.edu.cn/~deng/ds/dsacpp/)数据结构,[视频](https://www.bilibili.com/video/av81804191)

<iframe src="//player.bilibili.com/player.html?aid=81804191&cid=139968407&page=24" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="600" width="100%"> </iframe>

- 【2020-6-18】快速刷题：[算法模板](https://github.com/greyireland/algorithm-pattern)，最科学的刷题方式，最快速的刷题路径，你值得拥有~ [Gitbook](https://greyireland.gitbook.io/algorithm-pattern/ru-men-pian/quickstart)
![](https://camo.githubusercontent.com/dec4d9e996c2357647a28b995307e826531f994f/68747470733a2f2f696d672e667569626f6f6d2e636f6d2f696d672f6c656574636f64655f6578706c6f72652e706e67)
- 【2021-1-23】可视化解释A*、Dijkstra、BFS寻路算法，[在线体验地址](https://interactive-pathfinding.netlify.app/)，完整代码[Interactive pathfinding](https://github.com/npretto/pathfinding) - Visual explanation of pathfinding algorithms and how a*, Dijkstra and BFS can be seen as the same algorithm with different parameter/data structures used under the hood' by Nicolò Pretto
- 【2021-4-14】算法经验总结，[labuladong](https://labuladong.gitee.io/algo/), [gitee地址]([labuladong](https://labuladong.gitee.io/algo/))，各种类型题目解题思路，如[动态规划](https://github.com/labuladong/fucking-algorithm/blob/master/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E7%B3%BB%E5%88%97/%E5%8A%A8%E6%80%81%E8%A7%84%E5%88%92%E8%AF%A6%E8%A7%A3%E8%BF%9B%E9%98%B6.md)，[pdf文件](https://share.weiyun.com/vdGvmPMe)

- 【2021-5-8】基础[算法笔记](https://dairongpeng.github.io/algorithm-note/)，[Github地址](https://github.com/Dairongpeng/algorithm-note)，Morris算法可以实现二叉树遍历O(N)时间+O(1)空间

目录概览

- [x] [第一节 复杂度、排序、二分、异或](https://dairongpeng.github.io/algorithm-note/01)
- [x] [第二节 链表、栈、队列、递归、哈希表、顺序表](https://dairongpeng.github.io/algorithm-note/02)
- [x] [第三节 归并排序、随机快排介绍](https://dairongpeng.github.io/algorithm-note/03)
- [x] [第四节 比较器与堆](https://dairongpeng.github.io/algorithm-note/04)
- [x] [第五节 前缀树、桶排序以及排序总结](https://dairongpeng.github.io/algorithm-note/05)
- [x] [第六节 链表相关面试题总结](https://dairongpeng.github.io/algorithm-note/06)
- [x] [第七节 二叉树基本算法](https://dairongpeng.github.io/algorithm-note/07)
- [x] [第八节 二叉树的递归思维建立](https://dairongpeng.github.io/algorithm-note/08)
- [x] [第九节 认识贪心算法](https://dairongpeng.github.io/algorithm-note/09)
- [x] [第十节 并查集、图相关算法介绍](https://dairongpeng.github.io/algorithm-note/10)
- [x] [第十一节 暴力递归思维、动态规划思维建立](https://dairongpeng.github.io/algorithm-note/11)
- [x] [第十二节 用简单暴力递归思维推导动态规划思维](https://dairongpeng.github.io/algorithm-note/12)
- [x] [第十三节 单调栈和窗口及其更新结构](https://dairongpeng.github.io/algorithm-note/13)
- [x] [第十四节 类似斐波那契数列的递归](https://dairongpeng.github.io/algorithm-note/14)
- [x] [第十五节 认识KMP算法与bfprt算法](https://dairongpeng.github.io/algorithm-note/15)
- [x] [第十六节 认识Manacher(马拉车)算法](https://dairongpeng.github.io/algorithm-note/16)
- [x] [第十七节 认识Morris遍历](https://dairongpeng.github.io/algorithm-note/17)
- [x] [第十八节 线段树](https://dairongpeng.github.io/algorithm-note/18)
- [x] [第十九节 打表技巧和矩阵处理技巧](https://dairongpeng.github.io/algorithm-note/19)
- [x] [第二十节 组累加和问题整理](https://dairongpeng.github.io/algorithm-note/20)
- [x] [第二十一节 哈希函数有关的结构和岛问题](https://dairongpeng.github.io/algorithm-note/21)
- [x] [第二十二节 解决资源限制类题目](https://dairongpeng.github.io/algorithm-note/22)
- [x] [第二十三节 有序表原理及扩展](https://dairongpeng.github.io/algorithm-note/23)
- [x] [第二十四节 AC自动机和卡特兰数](https://dairongpeng.github.io/algorithm-note/23)

## 总结

- [数据结构总结篇](https://blog.csdn.net/weixin_46733442/article/details/105923468)
- [数据结构之线性表](https://www.cnblogs.com/chengxiao/p/5979059.html)

**数据结构**与**算法**是程序设计的两大基础，大型的IT企业面试时也会出数据结构和算法的题目，它可以说明你是否有良好的逻辑思维，用来测试潜力，即使技术存在某些缺陷，面试公司也会认为你很有培养价值，至少在一段时间之后，技术可以很快得到提高

### （1）数据结构

- 逻辑结构
- 集合：无逻辑关系
- 线性结构
	- 一般：线性表，元素顺序排列；
	- 顺序表：基本思想：元素的存储空间是**连续**的。在内存中是以顺序存储，内存划分的区域是连续的。
	- **链式表**：
	  - 基本思想：元素的存储空间是**离散**的，单独的（物理），它们可以通过在逻辑上**指针**的联系使得它成为了整体的链表。
	  - 链表每个节点分成**数据域** data + **指针域** next，[图](https://img-blog.csdn.net/20140417154704718)
		- 单链表：head指向头节点，尾节点next指针为空（null）
		- 双链表：除了next，新增pre指针，指向上一个节点，尾结点的next指针仍然为空，[图](https://img-blog.csdn.net/20140417160445843)
		- 循环链表：尾结点指向头结点，形成环状，[图](https://img-blog.csdn.net/20140417160438046)
	- 特殊：队列、栈
	- 推广：数组、广义表
- 非线性结构：树、图、多维数组
- 存储结构：涉及多种存储结构
- 顺序、链式、索引、散列

### （2）算法

- 排序：
- 内部排序：只用内存
	- 插入排序：直接插入排序、希尔排序
	- 选择排序：简单选择排序、堆排序
	- 交换排序：冒泡排序、快速排序
	- 归并排序：
	- 基数排序：
- 外部排序：内存和外存结合使用
- 查找：
  - 静态查找表
	- 二分查找
	- 顺序查找
	- 分块查找
  - 动态查找表
    - 二叉排序树
	- 平衡二叉树
	- B-树


## 基础算法

栈和队列是特殊的线性表，既然特殊就有不同点。

### 顺序 vs 链式

顺序存储结构
- 优点
  - 实现比较简单
  - 查找指定位置的元素效率很快，时间复杂度为常数阶O(1)　
  - 无需额外存储元素之间的逻辑关系（链式存储由于存储空间随机分配，需要存储元素之间的逻辑关系）
- 缺点
  - 需要预先分配存储空间，如果数据元素数量变化较大，很难确定存储容量，并导致空间浪费
  - 若频繁进行插入删除操作，则可能需要频繁移动大量数据元素
- 顺序存储结构，是用一段地址连续的存储单元依次存储线性表的数据元素
- ![](https://images2015.cnblogs.com/blog/1024555/201610/1024555-20161022154805467-38556657.png)

链式存储结构
- 优点
  - 不需要提前分配存储空间，元素个数不受限制
  - 对于插入删除操作，在已找到目标位置前提下，效率很高，仅需处理元素之间的引用关系，时间复杂度为O(1)
- 缺点
  - 实现相对复杂
  - 查找效率较低，最坏情况下需要遍历整张表
  - 由于物理存储位置不固定，需要额外存储数据元素之间的逻辑关系
- 链式存储结构，用一组任意的存储单元来存储数据元素，不要求物理存储单元的连续性，由一系列结点组成，每个结点除了要存储数据外，还需存储指向后继结点或前驱结点的存储地址。
- ![](https://images2015.cnblogs.com/blog/1024555/201610/1024555-20161022155916467-1811275833.png)


### 栈

顺序栈（Sequence Stack）
- 基本思想：后进先出（先进后出）即栈中元素被处理时，按后进先出的顺序进行，栈又叫后进先出表（LIFO）。

（1）数组实现栈
- C：[stack_usingarray.c](https://github.com/LeechanX/Data-Structures-and-Algorithms-in-C/blob/master/Stack/stack_usingarray.c)

```c++
#include <stdio.h>
#include <stdlib.h>
// 完整版
struct Stack{
	int capability;
	int sp;
	int *data;
};
typedef struct Stack *slink;

// 精简版
typedef struct {
    ElemType *elem; // 元素类型
    int top; // 栈顶元素位置
    int size; // 栈空间
    int increment;
} SqSrack;
```

（2）链表实现栈
- C：[stack_usinglist.c](https://github.com/LeechanX/Data-Structures-and-Algorithms-in-C/blob/master/Stack/stack_usinglist.c)

```c++
#include <stdio.h>
#include <stdlib.h>

struct Stack{
	int size;
	struct List{ // 链表节点
		int item;
		struct List *next;
	} *head; // 定义链表
};
typedef struct Stack *slink;
```

### 队列

队列（Sequence Queue）
- 基本思想：先进先出即先被接收的元素将先被处理，又叫先进先出表（FIFO）。

分类
- 顺序队列
  - 判断队满和队空的标志，总结：
  1. 队空：head = tail
  2. 队满：tail = m
- 循环队列
  - 判断队满和队空
  1. 队空：head = tail
  2. 队满：tail + 1 = head(在队列中会留一个空着的空间，所以要加1)

队列数据结构

（1）使用数组实现队列

```c++
#include <stdio.h>
#include <stdlib.h>
// 完整格式
struct Queue{
	int capibility; // 容量
	int *data; // 数组内容指针
	int head; // 头元素位置
	int rear; // 尾元素位置
};
typedef struct Queue *qlink;
// 精简格式
typedef struct {
    ElemType * elem;
    int front;
    int rear;
    int maxSize;
}SqQueue;
```

完整代码：
- C：[queue_usingarray.c](https://github.com/LeechanX/Data-Structures-and-Algorithms-in-C/blob/master/Queue/queue_usingarray.c)

（2）使用链表list实现队列

```c++
#include <stdio.h>
#include <stdlib.h>
// 定义链表
struct List{
	int item;
	struct List *next;
};
// 定义队列
struct Queue{
	int size; // 队列大小
	struct List *head; // 头指针
	struct List *rear; // 尾指针
};
typedef struct Queue *qlink; // 定义队列
```

完整代码
- C：[queue_usinglist.c](https://github.com/LeechanX/Data-Structures-and-Algorithms-in-C/blob/master/Queue/queue_usinglist.c)


循环队列
- ![](https://pic2.zhimg.com/80/v2-fdd496a89d7dba22ed9f5ad7c7fda4fd_1440w.jpg)
- SqQueue.rear++

非循环队列
- ![](https://pic2.zhimg.com/80/v2-60ea7426edeb776fae2564a712d1d3e9_1440w.jpg)
- SqQueue.rear = (SqQueue.rear + 1) % SqQueue.maxSize

其它队列
- LRU : Least recently used 最近最少使用
  - 新数据插入链表头部
  - 缓存数据访问时，将数据移到链表头部
  - 链表满时，淘汰尾部数据
- Two queues：两个缓存队列，一个**FIFO**队列，一个**LRU**队列
  - 新数据插入FIFO队列
  - 若FIFO里的数据没有被访问，则按照FIFO规则淘汰
  - FIFO队列里的数据再次被访问，则移到LRU队列头部
  - LRU队列里的数据再次被访问，则移到头部
  - LRU队列淘汰尾部的数据
- Multi Queue（MQ）
- LFU: Least Frequently Used 历史最少使用
  - 每个数据都需要维护引用计数
  - 新数据插入队列尾部 (因为引用计数为1)
  - 队列数据被访问后，引用计数增加，队列重新排序
  - 淘汰数据时，从尾部淘汰 (淘汰引用计数最小的数据)


### 顺序表

顺序表数据结构

```c++
typedef struct {
    ElemType *elem;
    int length;
    int size;
    int increment;
} SqList;
```


### 链表

三者的区别（从上面三个图我们可以总结出来）：
- 1、它们都有数据域（data(p)）和指针域(next(p))，但是从图中可以看出双链表有两个指针域，一个指向它的前节点，一个指向它的后节点。
- 2、单链表最后一个节点的指针域为空，没有后继节点；循环链表和双链表最后一个节点的指针域指向头节点，下一个结点为头节点，构成循环；
- 3、单链表和循环链表只可向一个方向遍历；双链表和循环链表，首节点和尾节点被连接在一起，可视为“无头无尾”；双链表可以向两个方向移动，灵活度更大。

代码

```c++
// 定义链表节点
struct LinkNode
{
	int data; // 数据域
	struct LinkNode *next; // 指针域
	//struct LinkNode *pre; // 双链表
};
// 定义链表，一个指向节点的指针即可
typedef struct LinkNode *llink; 

// 精简版：链表结构
typedef struct LNode {
    ElemType data;
    struct LNode *next;
} LNode, *LinkList; 
```

完整函数实现：
- C：[list.h](https://github.com/LeechanX/Data-Structures-and-Algorithms-in-C/blob/master/List/list.h)
- C++ 


C++类来表示节点的结构如下：[参考](http://c.biancheng.net/view/1570.html)

```c
struct Node{
   int m_data;//存储数据部分
   Node* m_next;//存储下一个节点的地址
};
// 或者
struct ListNode
{
    double value;
    ListNode *next;
};
// 定义链表：定义一个空的head指针即可
ListNode *head = nullptr;
// 创建链表
head = new ListNode; //分配新结点
head->value = 12.5; //存储值
head->next = nullptr; //表示链表的结尾


List a;//创建一个链表对象a
a.push_back(1);//将整数1放入链表a

void push_back(Node*& b, int i)
{
    b = new Node;
    b->m_data = i;
    b->m_next = nullptr;
}

Node* a = nullptr;
push_back(a, 1);
push_back(a, 2); // 错误，指针没有移动
// 改正
push_back(a, 1);
push_back(a->m_next, 2);
push_back(a->m_next->m_next, 3);
push_back(a->m_next->m_next->m_next, 4);
// 改进，增加尾指针
Node* a = nullptr; 
Node* tail = nullptr;
push_back(a, 1); 
tail = a;
push_back(tail->m_next, 2); 
tail = tail->m_next;
push_back(tail->m_next, 3); 
tail = tail->m_next;

```

C++ 方式
- 给它提供一个或多个构造函数，那将会带来很大的方便，因为这样将使得结点在创建时即可初始化。前文还曾经提到过，构造函数可以像常规函数一样，使用默认形参来定义，而为结点的后继指针提供一个默认的 nullptr 形参是很常见的。

```c++
struct ListNode
{
    double value;
    ListNode *next;
    //构造函数
    ListNode(double valuel, ListNode *nextl = nullptr)
    {
        value = value1;
        next = next1;
    }
};
// 创建链表
ListNode *secondPtr = new ListNode(13.5);
ListNode *head = new ListNode(12.5, secondPtr);
// 循环创建链表
double number;
while (numberFile >> number)
{
    //创建一个结点以保存该数字
    numberList = new ListNode(number, numberList);
}
// 遍历链表
ListNode *ptr = numberList;
while (ptr != nullptr)
{
    cout << ptr->value << " "; //处理结点（显示结点内容）
    ptr = ptr->next; //移动到下一个结点
}
```

完整示例

```c++
// This program illustrates the building
// and traversal of a linked list.
#include <iostream>
#include <fstream>
using namespace std;
struct ListNode
{
    double value;
    ListNode *next;
    // Constructor
    ListNode(double value1, ListNode *next1 = nullptr)
    {
        value = value1; next = next1;
    }
};

int main()
{
    double number; // Used to read the file
    ListNode *numberList = nullptr; // List of numbers
    // Open the file
    ifstream numberFile("numberFile•dat");
    if (!numberFile)
    {
        cout << "Error in opening the file of numbers.";
        exit (1);
    }
    //Read the file into a linked list
    cout << "The contents of the file are: " << endl;
    while (numberFile >> number)
    {
        cout << number << " ";
        // Create a node to hold this number
        numberList = new ListNode(number, numberList);
    }
    // Traverse the list while printing
    cout << endl << "The contents of the list are: " << endl;
    ListNode *ptr = numberList;
    while (ptr != nullptr)
    {
        cout << ptr->value << " "; // Process node
        ptr = ptr->next; // Move to next node
    }
    return 0;
}
```

### hash哈希

哈希函数：
- H(key): K -> D , key ∈ K
构造方法
- 直接定址法
- 除留余数法
- 数字分析法
- 折叠法
- 平方取中法
冲突处理方法
- 链地址法：key 相同的用单链表链接
- 开放定址法
  - 线性探测法：key 相同 -> 放到 key 的下一个位置，Hi = (H(key) + i) % m
  - 二次探测法：key 相同 -> 放到 Di = 1^2, -1^2, …, ±（k)^2,(k<=m/2）
  - 随机探测法：H = (H(key) + 伪随机数) % m

作者：[tcpisopen](https://zhuanlan.zhihu.com/p/516819910)

```c++
typedef char KeyType;

typedef struct {
    KeyType key;
}RcdType;

typedef struct {
    RcdType *rcd;
    int size;
    int count;
    bool *tag;
}HashTable;
```


## 排序算法


- 直观学习排序算法 [视觉直观感受若干常用排序算法](http://www.blogjava.net/todayx-org/archive/2012/01/08/368091.html)
- 【2020-7-18】真人表演排序算法
  - [冒泡排序](https://www.ixigua.com/6737477016913759499/)
  - [插入排序](https://www.ixigua.com/6746112027594378504/)
  - [归并排序](https://www.ixigua.com/6748741660663926024/)
- 中文版VisuAlgo网站为[VisuAlgo - 数据结构和算法动态可视化](https://zh.visualgo.net/) (Chinese)

### 总结

口诀：**快希堆归并**
- 快希堆：nlog(n)
- 堆选归并：不稳定

| 排序算法 | 平均时间复杂度 | 最差时间复杂度 | 空间复杂度 | 数据对象稳定性 |
| --- | --- | --- | --- | --- |
| 冒泡排序 | O(n2) | O(n2) | O(1) | 稳定 |
| 选择排序 | O(n2) | O(n2) | O(1) | 数组不稳定、链表稳定 |
| 插入排序 | O(n2) | O(n2) | O(1) | 稳定 |
| 快速排序 | O(n*log2n) | O(n2) | O(log2n) | 不稳定 |
| 堆排序 | O(n*log2n) | O(n*log2n) | O(1) | 不稳定 |
| 归并排序 | O(n*log2n) | O(n*log2n) | O(n) | 稳定 |
| 希尔排序 | O(n*log2n) | O(n2) | O(1) | 不稳定 |
| 计数排序 | O(n+m) | O(n+m) | O(n+m) | 稳定 |
| 桶排序 | O(n) | O(n) | O(m) | 稳定 |
| 基数排序 | O(k*n) | O(n2) | 稳定 |  |

均按从小到大排列
- k：代表数值中的 “数位” 个数
- n：代表数据规模
- m：代表数据的最大值减最小值

[img](https://img-blog.csdn.net/20140508213426500) ![img](https://img-blog.csdn.net/20140508213426500)

### 插入排序

- （1）简介：直接插入排序，从字面意思可以看出，直接插入数据完成排序
- （2）基本思想：在插入第i个数时，假设**前i-1数已经排好序**了，只需要将第i个数插入到i-1中，使得这i个数也是顺序的
  - 注意：插入时，片段整体后移
- [](https://img-blog.csdn.net/20140508144743875) ![](https://img-blog.csdn.net/20140508144743875)


```c++
void insertSort(vector<int>& nums){
  int len=nums.size();
  for(int i=1;i<len;i++){
    int key=nums[i];
    int j=i-1;
    while(j>=0 and nums[j]>key){
      nums[j+1]=nums[j];
      j--;
    }
    nums[j+1]=key;
  }
}
```

### 希尔排序（Shell）—— 改进插入排序

- （1）简介： 希尔排序又称为**缩小增量**排序，是对直接插入排序方法的改进。（挪动次数太多）
- （2）基本思想：从局部有序到整体有序
  - 将整个序列分成多个**子序列**，然后分别进行**直接插入排序**，直到整个序列中的所有数基本有序时，再对整体进行一次直接插入排序。
- [](https://img-blog.csdn.net/20140508145900203) ![](https://img-blog.csdn.net/20140508145900203)
- 案例：假设有10个数
  1. d1 = n/2 = 5, 每隔5个元素相互比较，执行直接插入排序
  1. d2 = d1/2 = 3, 取奇数
  1. d3 = d2/2 = 1, 取奇数

### 简单选择排序

- （1）简介：简单选择排序也叫**直接选择排序**，其实说白了跟直接插入排序的道理特别简单，**效率低**。
- （2）基本思想：前半部分**全局有序**
  - 首先在 n个数中选择一个**最小**的数，并将它从中删除，作为新的一组数的第一个；
  - 再在剩下的数中选择最小的数，将它从中删除，作为新的一组数的第二个。。。。
  - 如此反复，直到排序完成，最后得到一组从小到大排序的数。
- [img](https://img-blog.csdn.net/20140508153237937) ![](https://img-blog.csdn.net/20140508153237937)

### 冒泡排序

- （1）简介：冒泡排序，就跟水里的物体一样，小的往上浮，大的往下沉。
- （2）基本思想：将数组垂直排列，取出最后一个元素逐个向上交换，得到大数（小数），继续步骤一的操作，直到排序完成。
- [img](https://img-blog.csdn.net/20140508172643703) ![img](https://img-blog.csdn.net/20140508172643703)

### 快排 —— 内排中速度最快

- （1）简介：快速排序是目前内部排序中**速度最快**的一种排序算法。
- （2）基本思想：
  - 选取一个数据（通常是数组的第一个数）作为关键数据，然后将所有比它小的数都放在它**前面**，所有比它大的数都放在它**后面**，这个过程称为一趟**快速排序**
  - 再从分开的部分选取**基准数**，进行分组划分，重复执行，直到完成。
- [img](https://img-blog.csdn.net/20140508210528000) ![](https://img-blog.csdn.net/20140508210528000)

快排存在的问题，如何优化
* 3 种快排基准选择方法：随机（rand函数）、固定（队首、队尾）、三数取中（队首、队中和队尾的中间数）

* 4种优化方式：
- 优化1：当待排序序列的长度分割到一定大小后，使用插入排序
- 优化2：在一次分割结束后，可以把与Key相等的元素聚在一起，继续下次分割时，不用再对与key相等元素分割
- 优化3：优化递归操作
- 优化4：使用并行或多线程处理子序列

```c++
void swap(vector<int>& vec,int a,int b){
    vec[a]=vec[a]^vec[b];
    vec[b]=vec[a]^vec[b];
    vec[a]=vec[a]^vec[b];
}
int partition(vector<int>& vec,int start,int end){
    int pivot=vec[start+(end-start)/2];
    while(start<end){
        while(start<end and vec[start]<pivot) start++;
        while(start<end and vec[end]>pivot) end--;
        if(start<end) swap(vec,start,end);
    }
    return start;
}
void quickSort(vector<int>& vec,int start,int end){
    if(start>end) return;
    int pivot=partition(vec,start,end);
    quickSort(vec,start,pivot-1);
    quickSort(vec,pivot+1,end);
}
```

### 归并排序

- （1）简介：归并排序又称为**二路合并**操作，使用合并操作完成排序的算法。
- （2）基本思想：将两个或两个以上的有序表合并成一个新的有序表，最后将所有的有序表合成一个整体有序表。
- [img](https://img-blog.csdn.net/20140508211303359) ![img](https://img-blog.csdn.net/20140508211303359)

### 基数排序

- （1）简介：前面介绍的排序方法都是对**元素**进行的，基数排序是对**元组**进行的。
- （2）基本思想：从低位到高位依次对待排序的数进行分配和收集，经过d趟分配和收集，就可以得到一个有序序列。
- [img](https://img-blog.csdn.net/20140508211640812) ![img](https://img-blog.csdn.net/20140508211640812)

### 堆排序——简单选择排序改进

- （1）简介：**堆排序**是一个相当有用的排序技术，特别适用于对**大量**的记录进行排序。同时，堆排序也是对简单选择排序的改进。
  - 堆的定义：n个元素的序列｛K1，K2，...，Kn｝当满足下列关系时，称为堆：Ki≤K2i且Ki≤K2i+1或者Ki≥K2i且Ki≥K2i+1。注意：堆树必须是一颗完全二叉树。
- （2）基本思想：利用堆积树这种数据结构所设计的一种排序，可以利用数组的特点快速的定位指定索引的元素。

种类
- 最大堆：父结点大于或等于儿子结点
- [img](https://img-blog.csdn.net/20140508161744921) ![](https://img-blog.csdn.net/20140508161744921)
- 最小堆：父结点小于或等于儿子结点
- [img](https://img-blog.csdn.net/20140508161805046) ![](https://img-blog.csdn.net/20140508161805046)

堆排序的基本过程：
* 将n个元素的序列构建一个大顶堆或小顶堆
* 将堆顶的元素放到序列末尾
* 将前n-1个元素重新构建大顶堆或小顶堆，重复这个过程，直到所有元素都已经排序

将序列｛20,60,26,30,36,10｝调整为**递增**序列。
- 1、首先将数据建立**完全二叉树**，填充规则是按**层次**遍历将数据一一填入，最后构建最小堆；
  - [img](https://img-blog.csdn.net/20140508171206859) ![](https://img-blog.csdn.net/20140508171206859)
- 2、提取堆顶并调整删除队顶后的元素为新堆；
- 3、重复第2步，直到堆空；
  - [img](https://img-blog.csdn.net/20140508171501937) ![img](https://img-blog.csdn.net/20140508171501937)
- 4、每次提取的**堆顶**依次排序即为**递增**序列。
  - [img](https://img-blog.csdn.net/20140508171608046) ![img](https://img-blog.csdn.net/20140508171608046)


整体时间复杂度为nlogn

```c++
#include<iostream>
#include<vector>
using namespace std;
void swap(vector<int>& arr, int a,int b){
    arr[a]=arr[a]^arr[b];
    arr[b]=arr[a]^arr[b];
    arr[a]=arr[a]^arr[b];
}
void adjust(vector<int>& arr,int len,int index){
    int maxid=index;
    // 计算左右子节点的下标   left=2*i+1  right=2*i+2  parent=(i-1)/2
    int left=2*index+1,right=2*index+2;

    // 寻找当前以index为根的子树中最大/最小的元素的下标
    if(left<len and arr[left]<arr[maxid]) maxid=left;
    if(right<len and arr[right]<arr[maxid]) maxid=right;

    // 进行交换，记得要递归进行adjust,传入的index是maxid
    if(maxid!=index){
        swap(arr,maxid,index);
        adjust(arr,len,maxid);
    }
}
void heapsort(vector<int>&arr,int len){
    // 初次构建堆，i要从最后一个非叶子节点开始，所以是(len-1-1)/2，0这个位置要加等号
    for(int i=(len-1-1)/2;i>=0;i--){
        adjust(arr,len,i);
    }

    // 从最后一个元素的下标开始往前遍历，每次将堆顶元素交换至当前位置，并且缩小长度（i为长度），从0处开始adjust
    for(int i=len-1;i>0;i--){
        swap(arr,0,i);
        adjust(arr,i,0);// 注意每次adjust是从根往下调整，所以这里index是0！
    }
}
int main(){
    vector<int> arr={3,4,2,1,5,8,7,6};

    cout<<"before: "<<endl;
    for(int item:arr) cout<<item<<" ";
    cout<<endl;

    heapsort(arr,arr.size());

    cout<<"after: "<<endl;
    for(int item:arr)cout<<item<<" ";
    cout<<endl;

    return 0;
}
```

### 外部排序

**外排序**（External sorting）是指能够处理极大量数据的排序算法。通常来说，外排序处理的数据不能一次装入内存，只能放在读写较慢的外存储器（通常是硬盘）上。外排序通常采用的是一种“排序-归并”的策略。在排序阶段，先读入能放在内存中的数据量，将其排序输出到一个临时文件，依此进行，将待排序数据组织为多个有序的临时文件。尔后在归并段阶将这些临时文件组合为一个大的有序文件，也即排序结果。


## 查找

- 查找：
  - 静态查找表
	- 二分查找
	- 顺序查找
	- 分块查找
  - 动态查找表
    - 二叉排序树
	- 平衡二叉树
	- B-树

### 总结

| 查找算法 | 平均时间复杂度 | 空间复杂度 | 查找条件 |  |
| --- | --- | --- | --- | --- |
| 顺序查找 | O(n) | O(1) | 无序或有序 |  |
| 二分查找（折半查找） | O(log2n) | O(1) | 有序 |  |
| 插值查找 | O(log2(log2n)) | O(1) | 有序 |  |
| 斐波那契查找 | O(log2n) | O(1) | 有序 |  |
| 哈希查找 | O(1) | O(n) | 无序或有序 |  |
| 二叉查找树（二叉搜索树查找） | O(log2n) |  |  |  |
| 红黑树 | O(log2n) |  |  |  |
| 2-3树 | O(log2n | - | log3n) |  |
| B树/B+树 | O(log2n) |  |  |  |

### 静态查找

静态查找
- 若查找目的是为了查询某个特定的数据是否在表中或检索某个特定数据的各种属性，则此类查找表为**静态查找表**。

性能分析
- [img](https://img-blog.csdn.net/20140516085246828) ![](https://img-blog.csdn.net/20140516085246828)

#### 顺序查找

基本原理：
- 从表一端开始逐个和关键字进行比较，若找到一个记录和给定值相等，则查找成功，反之失败。
- 再简单点就是，一个一个的比大小，看看是否相等。

顺序查找更适合于**顺序**存储结构和**链式**存储结构的查找表。顺序查找需要一个个的去比较，**效率很低**。

#### 折半查找（二分查找）

基本原理：
1. 把序列分成左中右三部分，左部分小于中间值，右部分大于中间值；
2. 把给定值与中间值比较，确定下次查找是在左部分还是右部分
3. 继续上面两步操作，直到成功或失败。

注意：折半查找需要注意给定的序列必须是一个有序序列。

#### 分块查找（折中）

基本原理：
- 顺序查找和二分法查找的折中，先分块，在块中顺序查找。

注意：
- 分成的各块内部数据可能无序；
- 各块之间有序（第二个块中的元素都比第一个块中元素都大）；
- 建立了索引表，索引表按关键字有序。

[img](https://img-blog.csdn.net/20140515153642875) ![img](https://img-blog.csdn.net/20140515153642875)

### 动态查找（修改表）

若再查找的过程中同时插入查找表中不存在的数据，或从查找表中删除已存在的某个数据，则称此类查找表为**动态查找表**。

#### 二叉排序树

定义：
1. 若它的左子树非空，则左子树上所有的结点的值均小于根结点的值；
2. 若它的右子树非空，则右子树上所有的结点的值均大于根结点的值；
3. 左右子树本身就是两棵二叉排序树。

[img](https://img-blog.csdn.net/20140516090805187) ![](https://img-blog.csdn.net/20140516090805187)

定义看上去不是特别好理解，其实特别简单，我们再以例子简单的说一下。左子树的所有节点：3，1，6，4，7，都小于父节点8，右子树所有节点：10，14，13，都大于父节点。什么时候都是父节点大于左孩子，小于右孩子例如：8>3，8<10；3>1，3<6。

#### 平衡二叉树

定义：
1. 它或者是一棵空树
2. 或者树中任一结点的左右子树深度相差不超过1。

注意：
- 从定义我们可得到：想要一颗树平衡，有三种情况，节点的平衡度要么为了0，要么为1，要么为-1。（平衡度：节点左子树的高度减去其右子树的高度。）
- [img](https://img-blog.csdn.net/20140516092326312) ![](https://img-blog.csdn.net/20140516092326312)
每个节点上标出了平衡度，所有的节点的平衡度的绝对值都小于等于0或1，所以它是一棵平衡二叉树。


## 递归

递归概念
- 函数直接或间接地调用自身

递归与分治

分治法
- 问题的分解
- 问题规模的分解

- 折半查找（递归）
- 归并查找（递归）
- 快速排序（递归）

递归与迭代
- 迭代：反复利用变量旧值推出新值
- 折半查找（迭代）
- 归并查找（迭代）


## 树

### 基本概念

[图](https://img-blog.csdn.net/20140424155921046)
- ![](https://img-blog.csdn.net/20140424155921046)

- 1、结点的度
  - 结点的度是子结点的个数。例如：结点1有三个字结点2，3，4，所以结点1的度为3。
- 2、树的度
  - 树的度等于所有结点度中度最高的值。例如：上图中结点度最高为3，所以树的度为3。
- 3、叶子结点
  - 叶子结点是度为0的结点即没有子结点的结点。例如：上图中3，5，6，7，9，10。
- 4、分支结点
  - 分支结点是除了叶子结点，树中的其他所有结点。例如：上面树的分支结点为1，2，4，8。
- 5、内部结点
  - 内部结点是除了根结点以及叶子结点或在分支结点的基础之上在去掉根结点。例如：上面树的内部结点为2，4，8。
- 6、父结点、子结点、兄弟结点
  - 父节点、子结点和兄弟结点是相对而言的。例如：结点1是结点2，3，4的父节点，结点2，3，4也是结点1的子结点，结点2，3，4又是兄弟结点。
- 7、层次
  - 图中我们已经表出来了，根为第一层，根的孩子为第二层，依此类推，若某结点在第i层，则其孩子结点在第i+1层。

树与二叉树区别
- 1、树可以有多个子结点，二叉树最多只能两个结点。
- 2、树中的子结点是无序的，二叉树是分左子结点和右子结点。
- 3、二叉树不是特殊树，而是独立的数据结构。

### 代码定义

C 完整代码
- C：[binarytree.h](https://github.com/LeechanX/Data-Structures-and-Algorithms-in-C/blob/master/Tree/BinaryTree/binarytree.h)

```c++
struct BTree{
	int vertex;
	struct BTree *left;
	struct BTree *right;
};
typedef struct BTree *btlink;
```


### 二叉树

[数据结构(二)之二叉树](https://www.cnblogs.com/chengxiao/p/6395265.html)

性质
- 非空二叉树第 i 层最多 2(i-1) 个结点 （i >= 1）
- 深度为 k 的二叉树最多 2k - 1 个结点 （k >= 1）
- 度为 0 的结点数为 n0，度为 2 的结点数为 n2，则 n0 = n2 + 1
- 有 n 个结点的完全二叉树深度 k = ⌊ log2(n) ⌋ + 1
- 对于含 n 个结点的完全二叉树中编号为 i （1 <= i <= n） 的结点
  - 若 i = 1，为根，否则双亲为 ⌊ i / 2 ⌋
  - 若 2i > n，则 i 结点没有左孩子，否则孩子编号为 2i
  - 若 2i + 1 > n，则 i 结点没有右孩子，否则孩子编号为 2i + 1存储结构二叉树数据结构typedef struct BiTNode

```c++
{
    TElemType data;
    struct BiTNode *lchild, *rchild;
}BiTNode, *BiTree;
```

树的存储结构
- 双亲表示法
- 双亲孩子表示法
- 孩子兄弟表示法


### 遍历方式

遍历方式
- **先**序遍历
- **中**序遍历
- **后**续遍历
- **层次**遍历

- 1、**前序**遍历：前序遍历就是先访问根结点，再访问叶子结点。
  - 图中树的前序遍历为：1，2，5，6，7，3，4，8，9，10。
- 2、**后序**遍历：本后序遍历就是先访问子结点，再访问根结点。
  - 图中树的后序遍历为：5，6，7，2，3，9，10，8，4，1。
- 3、**层次**遍历：从第一层开始，依此遍历每层，直到结束。
  - 图中树的层次遍历为：1，2，3，4，5，6，7，8，9，10。

![](https://images2015.cnblogs.com/blog/1024555/201702/1024555-20170213202419816-108138766.png)

### 节点删除

对于二叉排序树的其他操作，比如插入，遍历等，比较容易理解；而删除操作相对复杂些。对于要删除的结点，有以下三种情况：
1. 叶子结点；
2. 仅有左子树或右子树的结点；
3. 左右子树都有结点；

对于1（要删除结点为叶子结点）直接删除，即直接解除父节点的引用即可，对于第2种情况（要删除的结点仅有一个儿子），只需用子结点替换掉父节点即可；而对于要删除的结点有两个儿子的情况，比较常用处理逻辑为，在其子树中找寻一个结点来替换，而这个结点我们成为中序后继结点。
- ![](https://images2015.cnblogs.com/blog/1024555/201702/1024555-20170213202802972-1815415724.png)


### 特殊二叉树

[图](https://img-blog.csdn.net/20140424162035437)

![](https://img-blog.csdn.net/20140424162035437)

一般二叉树性质：
- 在非空二叉树的k层上，至多有2^k个节点(k>=0)
- 高度为k的二叉树中,最多有2^(k+1)-1个节点(k>=0)
- 对于任何一棵非空的二叉树,如果叶节点个数为n0，度数为2的节点个数为n2，则有: n0 = n2 + 1

完全二叉树性质:
- 具有n个节点的完全二叉树的高度k为\[log2n]
- 对于具有n个节点的完全二叉树,如果按照从上(根节点)到下(叶节点)和从左到右的顺序对二叉树中的所有节点从0开始到n-1进行编号,则对于任意的下标为k的节点，有：
  - 如果k=0,则它是根节点，它没有父节点；如果k>0,则它的父节点的下标为[(i-1)/2];
  - 如果2k+1 <= n-1,则下标为k的节点的左子结点的下标为2k+1;否则,下标为k的节点没有左子结点.
  - 如果2k+2 <= n-1,则下标为k的节点的右子节点的下标为2k+2;否则,下标为k的节点没有右子节点

满二叉树性质:
- 在满二叉树中，叶节点的个数比分支节点的个数多1


分类
- **满二叉树**
- **完全二叉树**（堆）
  - 大顶堆：根 >= 左 && 根 >= 右
  - 小顶堆：根 <= 左 && 根 <= 右
- **二叉查找树**（二叉排序树）：左 < 根 < 右
- **平衡二叉树**（AVL树）：\| 左子树树高 - 右子树树高 \| <= 1
- **最小失衡树**：平衡二叉树插入新结点导致失衡的子树：调整：
  - LL型：根的左孩子右旋
  - RR型：根的右孩子左旋
  - LR型：根的左孩子左旋，再右旋
  - RL型：右孩子的左子树，先右旋，再左旋


### b树和它的应用场景有哪些

B树也叫做B-树，或者平衡多路树，它是每个节点最多有m个子树的**平衡树**。一个m阶的B树具有如下几个特征：
1. 根结点至少有两个子女。
2. 每个中间节点都包含至多m个子树 ， 每个节点包含的元素个数是其子树个数-1（其中 m/2 <= k <= m）
3. 所有的叶子结点都位于同一层。
4. 每个节点中的元素从小到大排列，节点当中k-1个元素正好是k个子树包含的元素的值域分划。

b树主要应用于文件系统中，在数据库中（mongoDB）也有应用，与B+树相比好处应该是有时不需要访问到叶节点就可以获取数据。查询时间复杂度是logN

### B+树

B+树是一种特殊的B树，它把数据都存储在叶子节点，并且叶节点间有指针连接。内部只存关键字（其中叶子节点的最小值作为索引）和孩子指针，简化了内部节点。应用场景主要是数据库的索引，查询时间复杂度也是logN

### B/B+树区别

这都是由于B+树和B具有不同的存储结构所造成的区别，以一个m阶树为例。
1. 关键字的数量不同；B+树中分支结点有m个关键字，其叶子结点也有m个，其关键字只是起到了一个索引的作用，但是B树虽然也有m个子结点，但是其只拥有m-1个关键字。
2. 存储的位置不同；B+树中的数据都存储在叶子结点上，也就是其所有叶子结点的数据组合起来就是完整的数据，但是B树的数据存储在每一个结点中，并不仅仅存储在叶子结点上。
3. 分支结点的构造不同；B+树的分支结点仅仅存储着关键字信息和儿子的指针（这里的指针指的是磁盘块的偏移量），也就是说内部结点仅仅包含着索引信息。
4. 查询不同；B树在找到具体的数值以后，则结束，而B+树则需要通过索引找到叶子结点中的数据才结束，也就是说B+树的搜索过程中走了一条从根结点到叶子结点的路径。

B+树优点：由于B+树的数据都存储在叶子结点中，分支结点均为索引，方便扫库，只需要扫一遍叶子结点即可，但是B树因为其分支结点同样存储着数据，我们要找到具体的数据，需要进行一次中序遍历按序来扫，所以B+树更加适合在区间查询的情况，所以通常B+树用于数据库索引，而B树则常用于文件索引。

### 红黑树

红黑树是一种特殊的二叉查找树，它在每一个节点上都使用红色或黑色进行标记，通过一些性质确保它是始终平衡的。
它的性质是这样的：
1. 每个节点不是红色就是黑色。
2. 根节点是黑色的。
3. 叶节点的空节点是黑色的。
4. 如果一个节点是红色的，那么它的两个子节点是黑色的。
5. 对于任意节点，从它到叶节点的每条路径上都有相同数目的黑色节点。

红黑树的插入，查询，删除在一般情况和最坏情况下的时间复杂度都是O(log(n))

应用场景主要是STL中map，set的实现，优点在于支持频繁的修改，因为查询删除插入时间复杂度都是logN

## 图

### 总结

| 图搜索算法 | 数据结构 | 遍历时间复杂度 | 空间复杂度 |  |
| --- | --- | --- | --- | --- |
| BFS广度优先搜索 | 邻接矩阵 | 邻接链表 | O(|v|2) | O(|v|+|E|) |
| DFS深度优先搜索 | 邻接矩阵 | 邻接链表 | O(|v|2) | O(|v|+|E|) |

其他算法

| 算法 | 思想 | 应用 |
| --- | --- | --- |
| 分治法 | 把一个复杂的问题分成两个或更多的相同或相似的子问题，直到最后子问题可以简单的直接求解，原问题的解即子问题的解的合并 | 循环赛日程安排问题、排序算法（快速排序、归并排序） |
| 动态规划 | 通过把原问题分解为相对简单的子问题的方式求解复杂问题的方法，适用于有重叠子问题和最优子结构性质的问题 | 背包问题、斐波那契数列 |
| 贪心法 | 一种在每一步选择中都采取在当前状态下最好或最优（即最有利）的选择，从而希望导致结果是最好或最优的算法 | 旅行推销员问题（最短路径问题）、最小生成树、哈夫曼编码 |

### 简介

树具有层次关系，上层元素可以与下一个多个元素连接，但是只能和上层的一个元素连接。在图结构中，节点间的连接是任意的，任何一个元素都可以与其他元素连接。

### 图遍历

从图中某一个顶点出发，访问图中的每一个结点，并要求只能访问一次，不能重复访问
- [img](https://img-blog.csdn.net/20140430081437625) ![](https://img-blog.csdn.net/20140430081437625)
总结，图的**广度**优先遍历和**深度**优先遍历的结果并不唯一。

#### （1）广度优先遍历

- 基本思想：首先访问顶点，再访问顶点的全部未访问的邻结点，再访问邻结点的所有结点即可（类似树的层次遍历）。
- 广度优先遍历：V1，V2，V3，V4，V5，V6或V1，V4，V3，V2，V6，V5

#### （2）深度优先遍历

- 基本思想：首先访问顶点，再访问顶点的每个邻结点，从该点继续深度优先遍历（类似于树的前序遍历）
- 深度优先遍历：V1，V2，V5，V3，V6，V4或V1，V4，V6，V3，V5，V2

### 最小生成树

#### （1）普里姆（Prim）算法

- 基本思想：选一个顶点开始，查找与顶点**相邻**且**代价**（边值）**最小**的边的另一个顶点，直到最后。
- 例如：V1作为顶点，V1->V3->V6->V4，V3->V2->V5，连接图中所有的结点即可。

#### （2）克鲁斯卡尔（Kruskal）算法

- 基本思想：选择图中**最小**的边，直到所有结点都连通。
- 例如：第一小边：V1->V3，第二小边：V4->V6，第三小边：V2-V5，第四小边：V3->V6，第五小边：V3->V2，此时所有的结点都连到了一起。

#### （3）算法对比

- 普里姆算法更加注重的是结点，点与点之间距离最短的优先；
- 克鲁斯卡尔算法更加注重的是边，将边排序，最小边排在前面，最大边排在后面。


## 串匹配算法

串匹配在实际使用中有着广泛的需求，从计算机领域简单的文本搜索，到生物科学领域复杂的氨基酸序列匹配，都离不开高效的串匹配方法。

KMP算法是经典的串匹配算法，由Knuth和Pratt师徒发明，同一时间Morris也发明了这一算法。因此按照姓氏首字母，这一算法得名“KMP”算法。简单而言，KMP算法主要通过根据**对成功匹配段的复用**以及**对失败匹配段的学习**来加快字符串匹配的速度，其时间复杂度为O(n)。

为方便下文的表述，我们作如下的约定：
- **文本**串 T（Text String）：需要查询的全量字符串，其长度为n
- **模式**串 P（Pattern String）：查询的片段字符串，其长度为m
- 匹配算法的结果为模式串在文本串中首次出现的位置（序号从0开始），不存在时应返回-1。

例如文本串`T = "helloworldhello"`，模式串`P = "ello"`，则匹配算法应返回1。

字符串匹配问题是在给定符号序列（文本）中按照一定的匹配条件，搜索给定符号序列或给定符号序列集合中元素（模式）出现位置的搜索问题。
- 搜索给定符号序列 → 只有一个模式 → `单模式匹配`
- 搜索给定符号序列“集合”→ 要同时搜索多个模式 → `多模式匹配`
- 按一定搜索条件 → 允许一定匹配误差, 不要求模式一定完全出现，搜索最像模式的局部 → `模糊匹配 `

### 单模式匹配

- BF（Brute Force）算法 - 暴力算法
	- 复杂度：最好的情况下只需进行 p次比较，最坏情况下要进行p*(s-p+1)次比较，时间复杂度为O(s*p)。
	- 没有从前一次的失败匹配中学习到任何信息
	- ![](https://pic3.zhimg.com/50/v2-817073ca77f6c75d234392f207a3c81b_hd.webp)
- KMP 算法(Knuth-Morris-Pratt)
	- 参考：[如何更好地理解和掌握 KMP 算法?](https://www.zhihu.com/question/21923021)
	- 思想
		- 1、而每一次失败都换来一些信息：已匹配部分（在已匹配部分，主串和模式串是完全相同的）。
		- 2、根据已匹配部分的最大的 一致“前缀和后缀“，增大模式串移动的步长。（前缀后缀重叠的部分肯定匹配不上，可以跳过）
		- 3、对于模式串，使用next 数组（动态规划），记录失配字符位置应移动的步长
	- 示例图
		- ![](https://pic1.zhimg.com/50/v2-f29d822e4faf22542875de6c73fe07d0_hd.webp)
		- ![](https://pic1.zhimg.com/80/v2-67dd66b86323d3d08f976589cf712a1a_720w.jpg)
		- ![](https://pic1.zhimg.com/80/v2-d6c6d433813595dce5aad08b40dc0b72_720w.jpg)
	- 复杂度：时间复杂度 O(s+p)
	- 特点：充分利用了已匹配部分和模式串自身的信息
	- 为什么说 KMP 算法和状态机有关？KMP实际上是AC自动机的退化版本，即模式串个数为1的情况
		- 模式匹配就是状态转移，KMP 算法最关键的步骤就是构造这个状态转移图。要确定状态转移的行为，得明确两个变量，一个是当前的匹配状态，另一个是遇到的字符；确定了这两个变量后，就可以知道这个情况下应该转移到哪个状态。
		- ![](https://pic2.zhimg.com/50/v2-aaa16eea8cf11b2957d207c249a49276_hd.webp)
- [BM算法](https://www.ruanyifeng.com/blog/2013/05/boyer-moore_string_search_algorithm.html)

### 多模式匹配

- KMP实际上是AC自动机的退化版本，即模式串个数为1的情况。
- 同时执行多个模式匹配，怎么办？

- （1）笨方法：拆成多个单模匹配问题
	- 但是在文本串较大、目标字符串众多的时候效率比较低。
- （2）ac自动机
	- 内容参考自：[多模字符串匹配算法之AC自动机—原理与实现](https://www.cnblogs.com/nullzx/p/7499397.html)
	- AC自动机的基础是[Trie树](https://www.cnblogs.com/huangxincheng/archive/2012/11/25/2788268.html)。和Trie树不同的是，树中的每个结点除了有指向孩子的指针，还有一个fail指针，它表示输入的字符与当前结点的所有孩子结点都不匹配时，自动机的状态应转移到的状态。fail指针的功能可以类比于KMP算法中next数组的功能。每个结点的fail指针表示由根结点到该结点所组成的字符序列的所有后缀　和　整个Trie树中的所有前缀 两者中最长公共的部分。
	- AC自动机匹配过程
		- 1）表示当前结点的指针指向AC自动机的根结点，即curr = root
		- 2）从文本串中读取（下）一个字符
		- 3）从当前结点的所有孩子结点中寻找与该字符匹配的结点，
			- 若成功：判断当前结点以及当前结点fail指向的结点是否表示一个字符串的结束，若是，则将文本串中索引起点记录在对应字符串保存结果集合中（索引起点= 当前索引-字符串长度+1）。curr指向该孩子结点，继续执行第2步
			- 若失败：执行第4步。
		- 4）若fail == null（说明目标字符串中没有任何字符串是输入字符串的前缀，相当于重启状态机）curr = root, 执行步骤2，
			- 否则，将当前结点的指针指向fail结点，执行步骤3)
	- 特点
		- 本质是前缀树加上KMP算法
		- 前缀树能加速的本质是因为采用了哈希算法；但与哈希表也稍有不同。采用了树形结构，树形结构能让其采用更少的储存空间，避免了哈希冲突。
		- KMP算法的本质是因为能够复用已经比较过计算，从而提升匹配的效率。
	- 工程实现
		- [Ahocorasick](https://hkn.eecs.berkeley.edu/~dyoo/python/ahocorasick/)：使用Aho-Corasick自动机的方式，根据一组关键词进行匹配，返回关键词出现的位置。用C实现，python包装
		- [Acora](http://pypi.python.org/pypi/acora/1.5)：多关键字搜索引擎，使用Aho-Corasick以及NFA-to-DFA自动机的方式
		- [Esmre](http://code.google.com/p/esmre/)：也是使用的AhoCorasick自动机的方式，做了一些细微的修改。也是用C实现，python包装
- （3）[WM（Wu-Manber）算法](https://blog.csdn.net/joylnwang/article/details/6801720)
	- WM算法是对BM算法的延伸继承，用BM算法的核心框架，用字符块来计算shift表（取代坏字符表）进行跳转，在进行匹配时，用hash和prefix计算前后缀的hash值来从众多可选的模式串中快速筛选出正确匹配的模式串。


### 模糊匹配

- 不要求精确匹配，允许部分损失

- A：笨方法，一点点移动算编辑距离
	- 类似BF算法，移动一次算一次编辑距离，最后取最大的编辑距离得分。
	- 时间复杂度：移动 S（长字符串） 次，每次计算编辑距离  P^2, 所以总体复杂度= S * P * P
- B: [fuzzywuzzy](https://github.com/seatgeek/fuzzywuzzy),  先找出相似片段，在片段附近计算最大编辑距离得分
	- 1、找出所有相似片段（所有的最长公共字串）
		- 基本复杂度：<= S*P
		- difflab.SequenceMatcher  (python 官方库，可以比较任何类型的序列对，只要序列元素为 hashable 对象)
			- [api文档](https://docs.python.org/zh-cn/3/library/difflib.html#difflib.SequenceMatcher)
			- 自动垃圾启发式计算: SequenceMatcher 支持使用启发式计算来自动将特定序列项视为垃圾。
		- SequenceMatcher 在最坏情况下为平方时间而在一般情况下的行为受到序列中有多少相同元素这一因素的微妙影响；在最佳情况下则为线性时间。
		- python-Levenshtein.SequenceMatcher（针对字符串匹配做了优化，可以做到4-10倍的加速）
	- 2、对每个相似片段（共K个），在长文本S的位置，向前后扩充到 模式 P 的长度，进行编辑距离得分计算。
		- 计算编辑距离复杂度  K*P^2
	- 3、找出最大的编辑距离相似度，作为模式的最终得分
		- 复杂度 ：K

### 深度语义匹配

- 如DSSM等系列

### 蛮力算法

字符串匹配的蛮力算法，可以将模式串逐一与文本串中长度为m的子串进行匹配。例如在文本串"abcabdab"中查找子串"abd"：

|序号|0|1|2|3|4|5|6|7|8|
|文本串|a|b|c|a|b|d|a|b|d|
|匹配1|<b><font color="#ff0000">a</font></b>|<b><font color="#ff0000">b</font></b>|<del>d</del>|||||||
|匹配2||<del>a</del>|<font color="#aaaaaa">b</font>|<font color="#aaaaaa">d</font>||||||
|匹配3|||<del>a</del>|<font color="#aaaaaa">b</font>|<font color="#aaaaaa">d</font>|||||
|匹配4||||<b><font color="#ff0000">a</font></b>|<b><font color="#ff0000">b</font></b>|<b><font color="#ff0000">d</font></b>||||

其对应的暴力算法代码为（Java）：

```java
public int match(String P, String T) {
	int n = T.length(); // 文本串长度
	int m = P.length(); // 模式串长度
	for (int i = 0; i < n - m + 1; i ++) { // 文本串中的起始查找位置
		if (T.substring(i, i + m).equals(P)) return i; // 匹配子串
	}
	return -1;
}
```

为了披露更多的算法细节，这里我们不使用Java内置函数实现，以为接下来的KMP算法的理解做准备：

```java
public int match(String P, String T) {
	int n = T.length(), i = 0; // 文本串长度及当前比对字符
	int m = P.length(), j = 0; // 模式串长度及当前比对字符
	while ((i < n) && (j < m)) {
		if (T.charAt(i) == P.charAt(j)) {
			i ++; j ++; // 匹配，转到下一字符
		} else {
			i -= j - 1; j = 0; // 文本串回退，模式串复位
		}
	}
	return (i - j > n - m) ? -1 : i - j; // 若匹配成功，则i-j表示匹配初始位置
}
```

很显然，蛮力算法由于需要对于每个子串进行比较，其时间复杂度在最差情况下为O(mn)。

### 蛮力算法的思考

再次回顾蛮力算法过程的例子：

|序号|0|1|2|3|4|5|6|7|8|
|文本串|a|b|c<font color="#0000ff">(i=2)</font>|a|b|d|a|b|d|
|匹配1|<b><font color="#ff0000">a</font></b>|<b><font color="#ff0000">b</font></b>|<del>d</del><font color="#0000ff">(j=2)</font>|||||||

第一次匹配在`i=2`及`j=2`处失败后，文本串回退，模式串复位：

|序号|0|1|2|3|4|5|6|7|8|
|文本串|a|b<font color="#0000ff">(i=1)</font>|c|a|b|d|a|b|d|
|匹配2||<del>a</del><font color="#0000ff">(j=0)</font>|<font color="#aaaaaa">b</font>|<font color="#aaaaaa">d</font>||||||

很显然第二次匹配的时候同样失败了。那这个失败是偶然的吗？并不是。可以发现由于第一次匹配时已经成功匹配了字符串`"ab"`，因此文本串一定是`"abxxxxxx"`。因此在i=1的位置，模式串一定不能和文本串进行匹配，因此这次失败是注定的。

## KMP算法

为了使得已经成功的信息得到充分的利用，KMP算法对于“注定的失败”采取了聪明的避让措施，该算法的核心是next数组。

### next数组

为了尽可能地利用已经匹配的信息，我们可以在安全的前提下，对模式串进行快速移动，而不是像暴力算法一样一次仅前进一格。很显然，模式串向右移动的距离之和自身有关，即无论何时，只要匹配到`"abd"`中的`'d'`失败后，就需要将模式串的`j`移动到`next[j]`的位置，称之为模式串P的next数组。

例如在上述的例子中，匹配到`"abd"`中的`'d'`失败后，我们知道当前位置的前两个字符一定为`"ab"`，因此我们可以直接向右将模式串移动两位，即`next[2] = 0`，表示将j=2对应的'd'字符直接移动到'a'字符进行比对。这一比对过程为：

|序号|0|1|2|3|4|5|6|7|8|备注|
|文本串|a|b|c|a|b|d|a|b|d||
|匹配1|<b><font color="#ff0000">a</font></b>|<b><font color="#ff0000">b</font></b>|<del>d</del><font color="#0000ff">(j=2)</font>|||||||j=2匹配失败，移动j=next[j]=0|
|移动模式串|||<font color="#aaaaaa">a</font><font color="#0000ff">(j=0)</font>|<font color="#aaaaaa">b</font>|<font color="#aaaaaa">d</font>||||||

当文本串与模式串的第一个字符都不匹配时，模式串应当右移一位，继续和下一和文本串字符进行对比。为了统一起见，我们可以令`next[0] = -1`，表示当第0号字符不匹配时，需要将其移动到-1的位置，也即向右移动一位模式串。

通过上述例子，我们可以写出任意模式串的next数组，例如对于`P = "chinchilla"`，其next表为：

|j|0|1|2|3|4|5|6|7|8|9|
|T[j]|c|h|i|n|c|h|i|l|l|a|
|next[j]|-1|0|0|0|0|1|2|3|0|0|

- j = 0时，匹配失败说明该位置的文本串与模式串的第一位不相等，此时应右移一位，即`next[0] = -1`;
- j = 1时，文本串中`"c"`匹配成功，说明文本串格式为`"cxxxx"`，应向右移动一位，即`next[1] = 0`;
- j = 2时，文本串中`"ch"`匹配成功，说明文本串格式为`"chxxxx"`，应向右移动两位（因为如果只移动一位，文本串变为`"hxxxx"`，模式串为`"chin..."`，必然匹配失败），即`next[2] = 0`;
- j = 3时，文本串中`"chi"`匹配成功，说明文本串格式为`"chixxxx"`，应向右移动三位，即`next[3] = 0`;
- j = 4时，文本串中`"chin"`匹配成功，说明文本串格式为`"chinxxxx"`，应向右移动四位，即`next[4] = 0`;
- j = 5时，文本串中`"chinc"`匹配成功，说明文本串格式为`"chincxxxx"`，此时我们发现如果将模式串右移四位，则文本串变为`"cxxxx"`，与模式串`"chin..."`有可能匹配成功，因此`next[5] = 1`，即使得字符`'h'`移动到前面的`'h'`处;
- ...
- j = 8时，文本串中`"chinchil"`匹配成功，说明文本串格式为`"chinchilxxxx"`，此时我们必须将模式串右移8位，否则无论如何均不能与模式串`"chinchilla"`匹配成功，因此`next[8] = 0`；
- ...

通过上述方法，我们即可得到任意字符串的next数组。

### KMP算法匹配

根据next数组的定义，我们可以很快写出KMP算法进行匹配计算的代码：

```java
public int KMP(String P, String T) {
	int n = T.length(), i = 0; // 文本串指针
	int m = P.length(), j = 0; // 模式串指针
	int[] next = buildNext(P); // 构建模式串P的next表
	while ((j < m) && (i < n)) {
		if ((j < 0) || (P.charAt(j) == T.charAt(i))) { // 匹配时，移动到下一字符
			j ++; i ++;
		} else { // 不匹配时，加速移动模式串
			j = next[j];
		}
	}
	return (i - j > n - m) ? -1 : i - j;
}
```

由于文本串指针永远不会后退，模式串指针只可能进行加1操作或者next操作（相等于做减法），因此该方法最多只可能进行2*n次操作，因此KMP算法中除next表构建外，其时间复杂度为O(n)。根据后续的分析，我们得到next表的构建最多需要O(m)时间，因此KMP算法的时间复杂度不超过O(m+n)。同时对于构建好的next表，只要模式串不发生变化，就可以连续不断使用，这也使得渐进复杂度接近于O(n)。

### next数组的改进

当模式串`P = "chinchilla"`时，我们构造以下文本串`T = "chincy..."`，其比对过程如下：

|序号|0|1|2|3|4|5|6|7|8|9|备注|
|文本串|c|h|i|n|c|y<font color="#0000ff">(i=5)</font>|x|x|x|x||
|匹配1|<b><font color="#ff0000">c</font></b>|<b><font color="#ff0000">h</font></b>|<b><font color="#ff0000">i</font></b>|<b><font color="#ff0000">n</font></b>|<b><font color="#ff0000">c</font></b>|<del>h</del><font color="#0000ff">(j=5)</font>|<font color="#aaaaaa">i</font>|<font color="#aaaaaa">l</font>|<font color="#aaaaaa">l</font>|<font color="#aaaaaa">a</font>|j=5匹配失败，j=next[j]=1|
|移动模式串|||||<font color="#aaaaaa">c</font>|<font color="#aaaaaa">h</font><font color="#0000ff">(j=1)</font>|<font color="#aaaaaa">i</font>|<font color="#aaaaaa">n</font>|<font color="#aaaaaa">c</font>|<font color="#aaaaaa">h</font>|

显然这次匹配也会失败，而这次失败也是必然的。我们发现，当模式串匹配到`"chinch"`而失败时，不仅说明此时文本串为`"chincxxxx"`，同时还说明文本串中下一个字符必不为`'h'`。掌握这个细节，我们可以对next数组进行改进：

|j|0|1|2|3|4|5|6|7|8|9|
|T[j]|c|h|i|n|c|h|i|l|l|a|
|next[j]|-1|0|0|0|-1|0|0|3|0|0|

- j = 4时，文本串中`"chin"`匹配成功，`'c'`匹配失败，说明文本串格式为`"chin[非c]xxxx"`，此时我们现如果将模式串右移4位，则文本串变为`"[非c]xxxx"`，与模式串`"chin..."`仍然匹配失败，因此必须将模式串移动5位，即`next[4] = -1`（注意和改进前的区别）;
- j = 5时，文本串中`"chinc"`匹配成功，`'h'`匹配失败，说明文本串格式为`"chinc[非h]xxx"`，此时我们发现如果将模式串右移4位，则文本串变为`"c[非h]xxx"`，与模式串`"chin..."`仍然匹配失败，因此必须将模式串移动5位，即`next[5] = 0`（注意和改进前的区别）;
- j = 7时，文本串中`"chinchi"`匹配成功，`'l'`匹配失败，说明文本串格式为`"chinchi[非l]xxxx"`，此时我们将模式串右移4位，文本串变为`"chi[非l]xxxx"`，与模式串有概率匹配。因此`next[7] = 3`；

利用这种方式创建的next表，不仅可以从“成功”中获取经验，还可以从“失败”中获取教训，使得模式串可以尽可能快地移动。

### next表构建分析

通过上述分析，我们已经对next表的计算方法有了一定的认知。总结来看，next表中next[j]的计算方法为：

![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180805_next1.png)

1. 由于模式串匹配到j位时失败，因此对于模式串的前j-1位必然与文本串匹配，即`P[0, j) = T[i - j, i)`。同时由于匹配失败，还可以得到`P[j] ≠T[i]`。
2. 若我们下一轮匹配时，令T[i]和P[t]对齐，说明我们将模式串向右移动了j-t位。若此时能有与已知的文本串匹配，应有`P[0, t) = T[i - t, i]`，同时在`P[t] ≠P[j]`的情况下才有可能与T[i]进行匹配。
3. 若存在很多组t，保险起见我们应当使得移动距离最小，因此需要使得`next[j] = max(t)`。

归纳为数学语言如下：

```java
next[j] = max({ t | P[0, t) = P[j - t, j) 且 P[t] ≠P[j] })
```

因此实质上，next表的构建是一个自我匹配的过程，仿照匹配代码，我们可以写出next表的构建代码：

```java
public int[] buildNext(String P) {
	int m = P.length();
	int[] next = new int[m];
	next[0] = -1; // 初始化next表
	int t = -1, j = 0; // j为“主”串指针，t为移动串指针
	while (j < m - 1) {
		if ((t < 0) || (P.charAt(j) == P.charAt(t))) {
			// 匹配的情况下，若后一元素不相等时才能移动到t，否则要直接移动到next[t]
			j ++; t ++;
			next[j] = (P.charAt(j) != P.charAt(t) ? t : next[t]);
		} else { // 不匹配时，加速移动模式串
			t = next[t];
		}
	}
	return next;
}
```

这里可以看出来，当模式串进行移动的时候，只有next[t]才能成为候选者，因此利用已构建的部分next表，可以避免无用的移动。

### 手动计算next表

使用代码计算next表的过程很快，但是却不够直观。根据next表的数学定义，我们可以采用稍微繁琐，但是却非常直观地方式进行手动计算：

1. 在第一行写上完整的模式串P，并标明其序号；
2. 依次向右移动模式串，若可以匹配，则继续向后写，否则停止，并在后面标明首次失配位置indexT(首次失配位置在原串中的位置)和indexP（首次失配时在移动串中的位置）。需要注意的是，全匹配时，失配位置不存在；
3. 查找next[j]时，由上向下查找indexT列，首次出现j值的行对应的indexP值即为next[j]。若不存在j值，则应填-1。

以`"chinchillach"`为例，手动计算其next表如下：

|0|1|2|3|4|5|6|7|8|9|10|11|indexT|indexP|
|c|h|i|n|c|h|i|l|l|a|c|h|||
||c|||||||||||1|0|
|||c||||||||||2|0|
||||c|||||||||3|0|
|||||c|h|i|n|||||7|3|
||||||c|||||||5|0|
|||||||c||||||6|0|
||||||||c|||||7|0|
|||||||||c||||8|0|
||||||||||c|||9|0|
|||||||||||c|h|-|-|
||||||||||||c|11|0|

根据上述表格，我们可以轻易得到next表的结果为：

|j|0|1|2|3|4|5|6|7|8|9|10|11|
|P[j]|c|h|i|n|c|h|i|l|l|a|c|h|
|next[j]|-1|0|0|0|-1|0|0|3|0|0|-1|0|

再以字符串`"abababb"`为例，其计算过程为：

|0|1|2|3|4|5|6|indexT|indexP|
|a|b|a|b|a|b|b|||
||a||||||1|0|
|||a|b|a|b|a|6|4|
||||a||||3|0|
|||||a|b|a|6|2|
||||||a||5|0|
|||||||a|6|0|

因此其next表为：

|j|0|1|2|3|4|5|6|
|P[j]|a|b|a|b|a|b|b|
|next[j]|-1|0|-1|0|-1|0|4|

通过这两个例子，想必对于next表的手动计算也不会再害怕了。


二叉树是一种常用的数据结构，一般意义上对树的遍历均需要`O(n)`的时间复杂度和`O(logn)`的空间复杂度。本文将介绍一种`O(1)`空间复杂度的算法，这就是Morris树遍历算法。


## 二叉树的遍历

一般意义上来说，二叉树由很多个树节点构成的，非线性的数据结构。每个节点都拥有两个“子节点”，这个节点也被称之为子节点的“父节点”。通常地，我们称没有父节点的节点为“根节点”，两个子节点均为null的节点为“叶子节点”，如下图所示。

![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_binarytree.png)

为统一起见，本文定义树节点的格式为：

```java
class TreeNode {
	public Value val;       // 节点的值
	public TreeNode left;   // 左孩子
	public TreeNode right;  // 右孩子
}
```

而为了将这种非线性结构转化为线性结构使用，各种遍历顺序应运而生，一般包括：

1. 先序遍历：按照 `父节点 -> 左孩子 -> 右孩子` 的顺序遍历，与DFS（深度优先搜索）有一定联系；
2. 中序遍历：按照 `左孩子 -> 父节点 -> 右孩子` 的顺序遍历。当二叉树为二叉搜索树时，中序遍历返回结果为有序序列，因此也叫顺序遍历；
3. 后序遍历：按照 `左孩子 -> 右孩子 -> 父节点` 的顺序遍历。
4. 层次遍历：从左到右，一层一层遍历整个树，与BFS（广度优先搜索）有一定联系。

### 递归遍历方法

利用递归处理二叉树的遍历问题非常方便，以先序遍历为例，其遍历方法如下：

```java
public void preOrderTraversal(TreeNode root) {
	if (root == null) return;
	visit(root);                    // 访问节点
	preOrderTraversal(root.left);   // 访问左子树
	preOrderTraversal(root.right);  // 访问右子树
}
```

中序遍历、后序遍历与先序遍历类似，仅仅需要调整访问顺序即可。可以看出，递归方法的时间复杂度为`O(n)`，空间复杂度与递归深度有关，最优情况与一般情况下为`O(logn)`，最差情况下甚至需要`O(n)`的空间。

层次遍历利用递归则稍显复杂，在此不赘述。

### 非递归遍历方法

为使用非递归遍历方法遍历整个二叉树，往往需要借助栈/队列等数据结构辅助实现。

#### 先序遍历

![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_preorder.png)

先序遍历的概念非常清晰，利用栈的辅助，在访问完该节点之后将子树入栈即可：

```java
public void preOrderTraversal(TreeNode root) {
	if (root == null) return;
	Stack<TreeNode> stack = new Stack<TreeNode>(); // 利用栈进行临时存储
	stack.push(root);

	while (!stack.isEmpty()) {
		TreeNode node = stack.pop(); // 取出一个节点，表示开始访问以该节点为根的子树
		visit(node); // 首先访问该节点（先序），之后顺序入栈右子树、左子树
		if (node.right != null) stack.push(node.right);
		if (node.left != null) stack.push(node.left);
	}
}
```

或者使用如下方法，在节点到达null层时进行判断：

```java
public void preOrderTraversal2(TreeNode root) {
	if (root == null) return;
	Stack<TreeNode> stack = new Stack<TreeNode>(); // 利用栈进行临时存储
	TreeNode node = root;
	
	while (!stack.isEmpty() || node != null) { // stack为空且node为null时，说明已经遍历结束
		if (node != null) { // 可以深入左孩子时，先访问，再深入
			visit(node);
			stack.push(node);
			node = node.left;
		} else { // 否则深入栈中节点的右孩子
			node = stack.pop().right;
		}
	}
}
```

以之前的树为例，其先序遍历结果应为：`2 -> 0 -> 1 -> 4 -> 3 -> 5 -> 6`

#### 中序遍历

![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_inorder.png)

中序遍历的思想是：

1. 若节点还有左子树，就要先把左子树访问完
2. 没有左子树可访问时，访问该节点，并尝试访问右子树

按照这种思路，我们可以写出一种直接的方法：

```java
public void inOrderTraversal(TreeNode root) {
	if (root == null) return;
	Stack<TreeNode> stack = new Stack<TreeNode>(); // 利用栈进行临时存储
	TreeNode node = root;
	
	while (node != null) { // 当node为null时，说明已经遍历结束
		if (node.left != null) { // 存在左子树时，入栈并深入左子树
			stack.push(node);
			node = node.left;
		} else { // 否则就寻找可以深入右子树的节点
			while (!stack.isEmpty() && node.right == null) {
				// 对于不能深入右子树的节点：直接访问，此时子树访问结束
				visit(node);
				node = stack.pop();
			}
			visit(node); // 如果可以深入右子树，访问该节点后，深入右子树
			node = node.right;
		}
	}
}
```

或者根据先序遍历方法2进行修改，在节点出栈时访问节点：

```java
public void inOrderTraversal2(TreeNode root) {
	if (root == null) return;
	Stack<TreeNode> stack = new Stack<TreeNode>(); // 利用栈进行临时存储
	TreeNode node = root;
	
	while (!stack.isEmpty() || node != null) { // stack为空且node为null时，说明已经遍历结束
		if (node != null) { // 可以深入左孩子
			stack.push(node);
			node = node.left;
		} else { // 否则访问栈中节点，并深入右孩子
			node = stack.pop();
			visit(node);
			node = node.right;
		}
	}
}
```

以之前的树为例，其中序遍历结果应为：`0 -> 1 -> 2 -> 3 -> 4 -> 5 -> 6`

#### 后序遍历

![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_postorder.png)

后序遍历从想法上是最难实现的，其主要思想是：

1. 尝试按顺序访问该节点的左右子树
2. 当左右子树都访问完毕时，才可以访问该节点

因此可以考虑采用栈的方式，依次将根节点、右孩子、左孩子入栈，以保证访问次序。由于后续遍历的回溯过程只可能上升一层，因此可以添加临时变量lastNode记录刚刚访问的节点，如果当前节点是上次访问节点的父节点，则说明子树访问完成，可以访问当前节点了。

```java
public void postOrderTraversal(TreeNode root) {
	if (root == null) return;
	Stack<TreeNode> stack = new Stack<TreeNode>(); // 利用栈进行临时存储
	stack.push(root);
	TreeNode lastNode = root; // 为了判断父子节点关系
	
	while (!stack.isEmpty()) {
		TreeNode node = stack.pop(); // 取出一个节点，表示开始访问以该节点为根的子树
		if ((node.left == null && node.right == null) || // 如果该节点为叶子节点
			(node.left == lastNode || node.right == lastNode)) { // 或者已经访问过该节点的子节点
			visit(node); // 直接访问
			lastNode = node;
		} else { // 否则就按顺序把当前节点、右孩子、左孩子入栈
			stack.push(node); 
			if (node.right != null) stack.push(node.right);
			if (node.left != null) stack.push(node.left);
		}
	}
}
```

当然，对上述方法的一个修改是添加“哨兵”节点，用于判断回溯位置。不过显然这种方式还需要对一些方法进行添加，并不是特别“优雅”：

```java
public void postOrderTraversal2(TreeNode root) {
	if (root == null) return;
	Stack<TreeNode> stack = new Stack<TreeNode>(); // 利用栈进行临时存储
	stack.push(root);
	
	while (!stack.isEmpty()) {
		TreeNode node = stack.pop(); // 取出一个节点，表示开始访问以该节点为根的子树
		if (!node.isValid()) { // 判断是“哨兵”节点，说明之后的节点为父节点，可以直接访问
			node = stack.pop();
			visit(node);
		} else if ((node.left == null && node.right == null)) { // 如果该节点为叶子节点，也可直接访问
			visit(node);
		} else { // 否则就按顺序把当前节点、“哨兵”节点、右孩子、左孩子入栈
			stack.push(node); 
			stack.push(new TreeNode(new Value(Value.INVALID_VALUE)));
			if (node.right != null) stack.push(node.right);
			if (node.left != null) stack.push(node.left);
		}
	}
}
```

以之前的树为例，其后序遍历结果应为：`1 -> 0 -> 3 -> 6 -> 5 -> 4 -> 2`

#### 层次遍历

![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_levelorder.png)

相较于前面几种遍历方式，层次遍历是最直观的遍历方式，可以利用队列来辅助实现：

```java
public void levelTraversal(TreeNode root) {
	if (root == null) return;
	Queue<TreeNode> queue = new LinkedList<TreeNode>(); // 利用队列进行临时存储
	queue.offer(root);
	
	while(!queue.isEmpty()) { // 取出一个节点，并将其左右节点入列
		TreeNode node = queue.poll();
		visit(node);
		if (node.left != null) queue.offer(node.left);
		if (node.right != null) queue.offer(node.right);
	}
}
```

可以看到，层次遍历和先序遍历相比，只是将栈换成了队列，其余处理方式完全相同。以之前的树为例，其层次遍历结果应为：`2 -> 0 -> 4 -> 1 -> 3 -> 5 -> 6`

#### 复杂度分析

很显然，无论哪种遍历方式，一个节点最多只可能被访问两次，因此其时间复杂度均为`O(n)`。而由于借助了栈和队列这样的辅助数据结构，其空间复杂度与树高有直接关系，因此其空间复杂度为最好和平均`O(logn)`，最差`O(n)`，与递归方式的实现相同。

## Morris遍历

- 摘自：[风之筝](https://ghh3809.github.io/2018/08/06/morris-traversal/)

### 主要思想

Morris遍历方法打破了一般遍历思想上的“禁锢”，通过临时对子节点引用的修改来实现“后继”节点的保存，之后再次遍历到时可以恢复树的结构，以此仅仅通过`O(1)`的空间实现树的遍历。没错，这又是KMP算法里面的Morris发明的（为什么别人可以这么聪明……）

先以中序遍历为例，介绍Morris算法的核心思想。

回顾一下中序遍历的内容：
1. 若节点还有左子树，就要先把左子树访问完
2. 没有左子树可访问时，访问该节点，并尝试访问右子树

之前提到过，如果这棵树是一棵二叉搜索树，那么中序遍历的结果应当是一个有序数组。为了方便起见，我们可以按照中序遍历的结果，将整个树组成一个链表，每一个节点都有“前驱”节点和“后继”节点。例如在之前示例的二叉树上，0是1的前驱节点，而2是1的后继节点。
- ![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_succ.png)

显然，中序遍历可以转化为对后继节点的计算过程。后继节点的计算方法为：
1. 对于存在右子树的节点A，其后继节点是其右子树中最左侧的节点；
2. 对于没有右子树的节点B，其后继节点是其自下而上的父节点中第一个将其作为左子树的节点。

节点A的后继计算非常简单。然而由于二叉树的信息中不包括父节点的信息，因此第2条操作起来非常困难，这也是为何之前采用了栈/队列的方式存储父节点的信息。

但是我们注意到，虽然对于这样的节点B，求取其后继节点非常困难；但是其后继节点来说，由于节点B是其子树中的一个节点，因此求前驱节点就很容易了！为了使得访问到节点B时能够直接得到后继信息，我们可以暂时**使用B节点右子树的链接，存储后继节点**，以实现对后继节点的直接获取，同时不占用额外的空间。这就是Morris遍历算法的主要思想。

### Morris中序遍历算法

根据上述分析，我们可以写出程序的主要计算过程：
1. 从根节点开始访问。
2. 如果当前节点C不存在左子树，按中序遍历的规则，应当访问节点C，并进入其右子树进行遍历。
3. 如果当前节点C存在左子树，就找到C的前驱节点B，并将B的右孩子指向C（存储后继），同时当前节点转入左子树进行遍历。
4. 步骤2中访问右子树时，如果节点本身没有右子树，则会直接转入其后继节点C。根据中序遍历的规则，说明此时C的左子树遍历完成。为了还原树结构，我们需要重新找到C的前驱节点，并将其右孩子设置为null。之后我们访问节点C，并进入其右子树进行遍历。

以之前的示例树为例，图解一下morris遍历的部分过程：
- ![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_morris1.png)
- ![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_morris2.png)
- ![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_morris3.png)
- ![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_morris4.png)
- ![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_morris5.png)

因此，我们写出Morris中序遍历算法的程序如下：

```java
public void morrisInOrderTraversal(TreeNode root) {
	TreeNode node = root, prev = null; // 仅存放两个临时变量，O(1)空间复杂度
	while (node != null) { // 当前节点为空时，说明访问完成
		if (node.left == null) { // 左子树不存在时，访问+进入右节点
			visit(node);
			node = node.right;
		} else { // 左子树存在，寻找前驱节点。注意寻找前驱节点时，会不断深入右子树。不加判断时，若前驱节点的右子树已指向自己，会引起死循环
			prev = node.left;
			while (prev.right != null && prev.right != node) prev = prev.right;
			if (prev.right == null) { // 前驱节点未访问过，存放后继节点
				prev.right = node;
				node = node.left;
			} else { // 前驱节点已访问过，恢复树结构
				visit(node); // 确定访问过左子树后，访问当前节点
				prev.right = null;
				node = node.right;
			}
		}
	}
}
```

其中最关键的一步是判断前驱节点是否访问过。注意到如果前驱节点访问过，则其右孩子必然为当前节点，否则必然为空。据此可以判断应当深入左子树还是右子树。

### 复杂度分析

`O(1)`的空间复杂度是毋庸置疑的，但是该算法是否与普通的遍历算法具有相同的时间效率？我们对时间复杂度进行简要的分析。

整个计算过程中，我们可以看到，主要的复杂度为计算前驱的循环，这里的复杂度与树高有直接关系，一般为`O(logn)`。但这是否说明Morris遍历的复杂度为`O(nlogn)`呢？仔细分析后发现，对于每一个有左子树的节点，其寻找前驱的过程只会执行两次，一次是建立前驱-后继关系的时候，一次是恢复树结构的时候。因此事实上，二叉树的每条路最多只可能被循环访问两次，其时间复杂度必然为`O(n)`。
- ![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_complex.png)

当然，我们也可以逐层计算循环总计算次数。例如对于一棵满二叉树，其倒数第二层的节点树为n/4，寻找前驱的长度为2，以此类推，我们可以得到：

<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default"></script>

$$C = \sum_{i=1}^{\log_2(n/2)} \frac{n}{2^{i+1}} \times i = \frac{n}{4} \times 1 + \frac{n}{8} \times 2 + \frac{n}{16} \times 3 + \cdots + 1 \times \log_2(\frac{n}{2}) = n - 1 - \log_2(n) \sim O(n)$$

### Morris先序遍历与后序遍历算法

介绍完了Morris中序遍历，其先序遍历和后序遍历都是在中序遍历的基础之上加以改动得到的。例如先序遍历时，需要先访问节点，再决定深入左子树或右子树：

```java
public void morrisPreOrderTraversal(TreeNode root) {
	TreeNode node = root, prev = null; // 仅存放两个临时变量，O(1)空间复杂度
	while (node != null) { // 当前节点为空时，说明访问完成
		if (node.left == null) { // 左子树不存在时，访问+进入右节点
			visit(node);
			node = node.right;
		} else { // 左子树存在，寻找前驱节点。注意寻找前驱节点时，会不断深入右子树。不加判断时，若前驱节点的右子树已指向自己，会引起死循环
			prev = node.left;
			while (prev.right != null && prev.right != node) prev = prev.right;
			if (prev.right == null) { // 前驱节点未访问过，存放后继节点
				visit(node); // 在确定前驱节点未访问过时，访问当前节点（注意与中序遍历的区别）
				prev.right = node;
				node = node.left;
			} else { // 前驱节点已访问过，恢复树结构
				prev.right = null;
				node = node.right;
			}
		}
	}
}
```

后序遍历相比中序遍历稍微复杂一些，但是后序遍历也有其特性：若一个节点是右孩子，或该节点是左孩子但是没有兄弟节点，则访问完该节点后立刻会访问该节点的父节点。

![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_morris_post.png)

推广到Morris遍历里，可以得到：
- 当访问到任何节点C的前驱节点B时，由B到C的路径（不包括节点C）即为之后的访问顺序。

因此所有的访问过程可以化为由B到C的访问。得到的Morris后序遍历程序如下，注意为了保证程序能够顺利访问右子树，为根节点添加了一个哨兵节点：

```java
public void morrisPostOrderTraversal(TreeNode root) {
	TreeNode temp = new TreeNode(new Value(Value.INVALID_VALUE)), node = temp, prev = null; // 仅存放一个“哨兵”节点和两个临时变量，O(1)空间复杂度
	temp.left = root;
	while (node != null) { // 当前节点为空时，说明访问完成
		if (node.left == null) { // 左子树不存在时，进入右节点
			node = node.right;
		} else { // 左子树存在，寻找前驱节点。注意寻找前驱节点时，会不断深入右子树。不加判断时，若前驱节点的右子树已指向自己，会引起死循环
			prev = node.left;
			while (prev.right != null && prev.right != node) prev = prev.right;
			if (prev.right == null) { // 前驱节点未访问过，存放后继节点
				prev.right = node;
				node = node.left;
			} else { // 前驱节点已访问过，恢复树结构
				visitReverse(node.left, prev); // 确定访问过左子树后，逆序访问沿路节点（注意与中序遍历的区别）
				prev.right = null;
				node = node.right;
			}
		}
	}
}
```

对于逆序访问函数`visitReverse()`，我们可以采用链表翻转的方式实现，一个参考实现如下：

```java
public void visitReverse(TreeNode node1, TreeNode node2) {
	reverse(node1, node2); // 首先进行翻转
	TreeNode node = node2; // 之后进行顺序访问
	while (node != node1) {
		visit(node);
		node = node.right;
	}
	visit(node1);
	reverse(node2, node1); // 恢复结构
}

public void reverse(TreeNode node1, TreeNode node2) {
	// 实现链表翻转
	TreeNode prev = node1;
	TreeNode current = prev.right;
	TreeNode next = current.right;
	while (prev != node2) {
		current.right = prev;
		prev = current;
		current = next;
		next = next.right;
	}
}
```

以此实现后序遍历结果。由于相比较其他两种遍历，后序遍历多了逆序访问的过程，其时间复杂度与链表长度成正比。因此后序遍历的时间复杂度仍然为O(n)。

## 常见问题

### 最长公共子串

【2022-5-17】[最长公共子序列和最长公共子串](https://zhuanlan.zhihu.com/p/68409952)

问题描述：
- 给定两个序列：X[ 1...m ] 和 Y[ 1...n ]，求在两个序列中同时出现的**最长子序列**的长度。
- 假设 X 和 Y 的序列如下：
  - X[ 1...m] = {A, B, C, B, D, A, B}
  - Y[ 1...n] = {B, D, C, A, B, A}

**最长公共子串**（Longest Common Substring）与**最长公共子序列**（Longest Common Subsequence）的区别： 
- 子串要求在原字符串中是**连续**的，而子序列则只需保持**相对顺序**，并不要求连续。
- 例如 X = {a, Q, 1, 1}; Y = {a, 1, 1, d, f}，那么，{a, 1, 1}是X和Y的最长公共子序列，但不是它们的最长公共字串。

#### 最长公共子串

X 和 Y 的最长公共子串有：BD, AB

最大公共子串要求的字串是连续的

求子串的方法和求子序列方法类似：
- 当str1\[i] == str2\[j]时，子序列长度veca\[i]\[j] = veca\[i - 1][j - 1] + 1；
- 当str1\[i] != str2\[j]时，veca\[i]\[j]长度要为0，而不是 max{ veca\[i - 1]\[j], veca\[i][j - 1] }。

下面是求解时的动态规划表，可以看出 X 和 Y 的最长公共子串的长度为2：
- ![](https://pic1.zhimg.com/80/v2-b59f7f61a57d7b648af3783ee6eaa7bc_720w.jpg)

```c++
// 动态规划求解LCS问题
#include <iostream>
#include <string>
#include <vector>
using namespace std;
 
int max(int a, int b) 
{
	return (a>b)? a:b;
}
 
/**
 * 返回X[0...m-1]和Y[0...n-1]的LCS的长度 
 */
int lcs(string &X, string &Y, int m, int n)
{
	int biggest = 0;
	// 动态规划表，大小(m+1)*(n+1)
	vector<vector<int>> table(m+1,vector<int>(n+1));  
 
	for(int i=0; i<m+1; ++i)
	{
		for(int j=0; j<n+1; ++j)
		{
			// 第一行和第一列置0
			if (i == 0 || j == 0)
				table[i][j] = 0;
			else if(X[i-1] == Y[j-1])
			{
				table[i][j] = table[i-1][j-1] + 1;
				if(table[i][j] > biggest)  // 增加了一个最大值
                                        biggest = table[i][j];
			}
			else
				table[i][j] = 0;  // 此处变化
		}
	}
 
	return biggest;
}
 
int main()
{
	string X = "ABCBDAB";
	string Y = "BDCABA";
 
	cout << "The length of LCS is " << lcs(X, Y, X.length(), Y.length());
	cout << endl;
 
	getchar();
	return 0;
}
```

求解时的动态规划表，可以看出 X 和 Y 的最长公共子串的长度为2：
- ![](https://pic3.zhimg.com/80/v2-541861d0d359988663b6d6100ffa719a_720w.jpg)

输出最长公共子串很简单，只需要判断table\[i]\[j]是否等于**最长公共子串的长度**即可，然后沿着**对角线**往左上角找大于等于1的数字即可；
- 如果table\[i]\[j] == lcs_len（lcs_len指最长公共子串长度），则把这个字符放入LCS中，并跳入table\[i-1]\[j-1]中继续进行判断；
- 直到table\[i]\[j] < 1为止；倒序输出LCS放入set中。
从上图的红色路径显示，X 和 Y 的最长公共子串有 3 个，分别为 “BD”、“AB”、“AB”。因“AB”与“AB”重复，故只输出“BD”、“AB”即可。

```c++
// 动态规划求解并输出所有LCS
#include <iostream>
#include <string>
#include <vector>
#include <set>
#include <algorithm>
using namespace std;

string x = "ABCBDAB";
string y = "BDCABA";
vector<vector<int>> table; // 动态规划表
set<string> setOflcs;      // set保存所有的LCS

/**
 * 构造表，并返回X和Y的LCS的长度
 */
int lcs(int m, int n)
{
    int biggest = 0;
    // 表的大小为(m+1)*(n+1)
    table = vector<vector<int>>(m+1, vector<int>(n+1));
    for(int i = 0; i < m+1; i++)
    {
        for(int j = 0; j < n+1; j++)
        {
            // 第一行和第一列置0
            if(i == 0 || j == 0)
                table[i][j] = 0;
            else if(x[i-1] == y[j-1])
            {
		table[i][j] = table[i-1][j-1] + 1;
		if(table[i][j] > biggest)
                    biggest = table[i][j]; // 存放LCS的长度
	    }
	    else
		table[i][j] = 0;
        }
    }
    return biggest;
}

/**
 * 求出所有的最长公共子串，并放入set中
 */
void traceBack(int m, int n, int lcs_len)
{
    string strOflcs;
    for(int i = 1; i < m+1; i++)
    {
        for(int j = 1; j < n+1; j++)
        {
            // 查到等于lcs_len的值，取字符
            if(table[i][j] == lcs_len)
            {
                int ii = i, jj = j;
                while(table[ii][jj] >= 1)
                {
                    strOflcs.push_back(x[ii-1]);
                    ii--;
                    jj--;
                }
                string str(strOflcs.rbegin(), strOflcs.rend()); // strOflcs逆序
                if((int)str.size() == lcs_len)                       // 判断str的长度是否等于lcs_len
                {
                    setOflcs.insert(str);
                    strOflcs.clear();                           // 清空strOflcs
                }
            }
        }
    }
}

// 输出set
void print()
{
    set<string>::iterator iter = setOflcs.begin();
    for(; iter != setOflcs.end(); iter++)
        cout << *iter << endl;
}

int main()
{
    int m = x.length();
    int n = y.length();
    int res = lcs(m, n);
    cout << "res = " << res << endl;

    traceBack(m, n, res);
    print();

    getchar();
    return 0;
}
```

#### 最长公共子序列 

X 和 Y 的最长公共子序列有 “BDAB”、“BCAB”、“BCBA”，即长度为4。

（1）穷举法

用穷举法来解决这个问题，即求出 X 中所有子序列，看 Y 中是否存在该子序列。
- X 有多少子序列 —— 2m 个
- 检查一个子序列是否在 Y 中 —— θ(n)
穷举法在最坏情况下的时间复杂度是 θ(n * 2m)，也就是说花费的时间是**指数级**的

（2）动态规划

LCS 问题是否具有动态规划问题的两个特性。
- ① 最优子结构
  - 设 C[ i,j] = | LCS(x[ 1...i], y[ 1...j]) |，即 C[ i,j] 表示序列 X[ 1...i] 和 Y[ 1...j] 的最长公共子序列的长度，则 C[ m,n] = |LCS(x,y)|就是问题的解。
  - 递归推导式：
    - ![](https://pic2.zhimg.com/80/v2-0df332d4e230d9ab8f14744991ef3a01_720w.jpg)
  - 从这个递归公式可以看出，问题具有**最优子结构**性质！
- ② 重叠子问题
  - 求LCS长度的递归伪代码：

```c++
LCS(x,y,i,j)
if x[i] = y[j]
	then C[i,j] ← LCS(x,y,i-1,j-1)+1
else C[i,j] ← max{LCS(x,y,i-1,j),LCS(x,y,i,j-1)}
	return C[i,j]
```

【2022-5-17】小冰命中一次，写成半成品

```python
# x = "ace"
# y = "bcedf"
# dp: lcs -> f(n) = max{ f(n-1)+1, f(n-1) }
max_seq = []

def lcs(x, y, max_seq):
	""" 最长公共子串 """
	# (0 ) 边界条件
	if not ( len(x) and len(y)):
		return 0
	# (1) 最后一位相同
	if x[0] == y[0]:
		max_seq.append(x[0])
		return lcs(x[1:], y[1:], max_seq)
	else: # (2) 最后一位不同，取大
		tmp = [lcs(x[1:], y, max_seq), lcs(x, y[1:], max_seq), lcs(x[1:], y[1:], max_seq)]
		# 字符串不连续时清空
		if tmp[0] == tmp[2]:
			max_seq = []
		return max(tmp)

print(''.join(max_seq))
# 效率：O(mn)
# 优化：备忘录、DP Table
```


c++简单递归求解

```c++
// 简单的递归求解LCS问题
#include <iostream>
#include <string>
using namespace std;
 
int max(int a, int b) 
{
	return (a>b)? a:b;
}
 
// Return the length of LCS for X[0...m-1] and Y[0...n-1]
int lcs(string &X, string &Y, int m, int n)
{
	if (m == 0 || n == 0)
		return 0;
	if (X[m-1] == Y[n-1])
		return lcs(X, Y, m-1, n-1) + 1;
	else
		return max(lcs(X, Y, m, n-1), lcs(X, Y, m-1, n));
}

int main()
{
	string X = "ABCBDAB";
	string Y = "BDCABA";
	// 输出最长公共子序列长度
	cout << "The length of LCS is " << lcs(X, Y, X.length(), Y.length());
	cout << endl;
	getchar();
	return 0;
}
```

简单递归，在**最坏**情况下（X 和 Y 的所有字符都不匹配，即LCS的长度为0）的时间复杂度为 **θ(2n)**。这和**穷举法**一样还是**指数级**的，太慢了。

根据程序中 X 和 Y 的初始值，画出部分递归树：
- ![](https://pic2.zhimg.com/80/v2-601c7c49b6e50bf006285865a1c6af89_720w.jpg)
递归树中**红框**标记的部分被调用了两次。画出完整的递归树后，可以发现有很多重复调用，这个问题具有**重叠子问题**的特性。

递归之所以和穷举法一样慢，因为在递归过程中进行了大量的重复调用。而**动态规划**就是解这个问题的，通过用一个**表**来保存子问题的结果，避免重复的计算，以**空间**换**时间**。前面已经证明，最长公共子序列问题具有动态规划所要求的两个特性，所以 LCS 问题可以用动态规划来求解。
- ![](https://pic3.zhimg.com/80/v2-2a9422e517d8fc878a7583388204bdda_720w.jpg)

改进版：DP Table存储，防止重复计算数值

```c++
// 动态规划求解LCS问题 
#include <iostream>
#include <string>
#include <vector>
using namespace std;
 
int max(int a, int b) 
{
	return (a>b)? a:b;
}
 
/**
 * 返回X[0...m-1]和Y[0...n-1]的LCS的长度 
 */
int lcs(string &X, string &Y, int m, int n)
{
	// 动态规划表，大小(m+1)*(n+1)
	vector<vector<int>> table(m+1,vector<int>(n+1));  
 
	for(int i=0; i<m+1; ++i)
	{
		for(int j=0; j<n+1; ++j)
		{
			// 第一行和第一列置0
			if (i == 0 || j == 0)
				table[i][j] = 0;
			else if(X[i-1] == Y[j-1])
				table[i][j] = table[i-1][j-1] + 1;
			else
				table[i][j] = max(table[i-1][j], table[i][j-1]);
		}
	}
	return table[m][n];
}
 
int main()
{
	string X = "ABCBDAB";
	string Y = "BDCABA";
 
	cout << "The length of LCS is " << lcs(X, Y, X.length(), Y.length());
	cout << endl;
 
	getchar();
	return 0;
}
```

动态规划解决LCS问题的时间复杂度为**θ(mn)**，这比简单递归实现要快多了。
- 空间复杂度是θ(mn)，因为使用了一个**动态规划表**。
- 当然，空间复杂度还可以进行优化，即根据递推式可以只保存填下一个位置所用到的几个位置就行了。

总结：
- 动态规划将原来具有**指数级**时间复杂度的搜索算法改进成了具有**多项式**时间复杂度的算法。
- 其中的关键在于解决**冗余**（重复计算），这是动态规划算法的根本目的。
- 动态规划实质上是一种**以空间换时间**的技术，它在实现的过程中，不得不存储产生过程中的各种状态，所以它的空间复杂度要大于其它的算法。

动态规划解决最优化问题的一般步骤：
1. 分析最优解的性质，并刻划其结构特征。
1. 递归地定义最优值。
1. 以自底向上的方式或自顶向下的记忆化方法计算出最优值。
1. 根据计算最优值时得到的信息，构造一个最优解。

步骤(1)—(3)是动态规划算法的基本步骤。在只需要求出最优值的情形，步骤(4)可以省略，若需要求出问题的一个最优解，则必须执行步骤(4)。此时，在步骤(3)中计算最优值时，通常需记录更多的信息，以便在步骤(4)中，根据所记录的信息，快速地构造出一个最优解。

输出一个最长公共子序列并不难（网上很多相关代码），难点在于输出**所有**的最长公共子序列，因为 LCS 通常不唯一。

总之，需要在动态规划表上进行**回溯** —— 从table\[m][n]，即右下角的格子，开始进行判断：
- 如果格子table\[i]\[j]对应的X\[i-1] == Y\[j-1]，则把这个字符放入 LCS 中，并跳入table\[i-1]\[j-1]中继续进行判断；
- 如果格子table\[i]\[j]对应的 X\[i-1] ≠ Y\[j-1]，则比较table\[i-1]\[j]和table\[i]\[j-1]的值，跳入值较大的格子继续进行判断；
- 直到 i 或 j 小于等于零为止，倒序输出 LCS 。
如果出现table\[i-1]\[j]等于table\[i]\[j-1]的情况，说明最长公共子序列有多个，故两边都要进行回溯（这里用到递归）
- ![](https://pic1.zhimg.com/80/v2-b0f663ab82935625d3e28c18d9f3ff3c_720w.jpg)
- 从上图的红色路径显示，X 和 Y 的最长公共子序列有 3 个，分别为 “BDAB”、“BCAB”、“BCBA”。

```c++
// 动态规划求解并输出所有LCS
#include <iostream>
#include <string>
#include <vector>
#include <set>
#include <algorithm>
using namespace std;

string X = "ABCBDAB";
string Y = "BDCABA";
vector<vector<int>> table; // 动态规划表
set<string> setOfLCS;      // set保存所有的LCS

int max(int a, int b)
{
	return (a>b)? a:b;
}

/**
 * 构造表，并返回X和Y的LCS的长度
 */
int lcs(int m, int n)
{
	// 表的大小为(m+1)*(n+1)
	table = vector<vector<int>>(m+1,vector<int>(n+1));

	for(int i=0; i<m+1; ++i)
	{
		for(int j=0; j<n+1; ++j)
		{
			// 第一行和第一列置0
			if (i == 0 || j == 0)
				table[i][j] = 0;
			else if(X[i-1] == Y[j-1])
				table[i][j] = table[i-1][j-1] + 1;
			else
				table[i][j] = max(table[i-1][j], table[i][j-1]);
		}
	}

	return table[m][n];
}

/**
 * 求出所有的最长公共子序列，并放入set中
 */
void traceBack(int i, int j, string lcs_str, int lcs_len)
{
	while (i>0 && j>0)
	{
		if (X[i-1] == Y[j-1])
		{
			lcs_str.push_back(X[i-1]);
			--i;
			--j;
		}
		else
		{
			if (table[i-1][j] > table[i][j-1])
				--i;
			else if (table[i-1][j] < table[i][j-1])
				--j;
			else   // 相等的情况
			{
				traceBack(i-1, j, lcs_str, lcs_len);
				traceBack(i, j-1, lcs_str, lcs_len);
				return;
			}
		}
	}

	string str(lcs_str.rbegin(), lcs_str.rend()); // lcs_str逆序
        if((int)str.size() == lcs_len)                // 判断str的长度是否等于lcs_len
            setOfLCS.insert(str);
}

void print()
{
    set<string>::iterator beg = setOfLCS.begin();
	for( ; beg!=setOfLCS.end(); ++beg)
		cout << *beg << endl;
}
int main()
{
	int m = X.length();
	int n = Y.length();
	int length = lcs(m, n);
	cout << "The length of LCS is " << length << endl;

	string str;
	traceBack(m, n, str, length);
	print();

	getchar();
	return 0;
}
```


### 反转一个链表（招银网络二面）

```c++
ListNode* reverse(ListNode* root){
  ListNode* pre=nullptr,cur=root,nxt;
  while(cur!=nullptr){
    nxt=cur->next;
    cur->next=pre;
    pre=cur;cur=nxt;
  }
  return pre;
}
```

### Top K问题（重点）

*Top K 问题的常见形式：*
>给定10000个整数，找第K大（第K小）的数<br>
 给定10000个整数，找出最大（最小）的前K个数<br>
给定100000个单词，求前K词频的单词<br>

*解决Top K问题若干种方法*
* 使用最大最小堆。求最大的数用最小堆，求最小的数用最大堆。
* Quick Select算法。使用类似快排的思路，根据pivot划分数组。
* 使用排序方法，排序后再寻找top K元素。
* 使用选择排序的思想，对前K个元素部分排序。
* 将1000.....个数分成m组，每组寻找top K个数，得到m×K个数，在这m×k个数里面找top K个数。

1. 使用最大最小堆的思路 （以top K 最大元素为例）<br>
按顺序扫描这10000个数，先取出K个元素构建一个大小为K的最小堆。每扫描到一个元素，如果这个元素大于堆顶的元素（这个堆最小的一个数），就放入堆中，并删除堆顶的元素，同时整理堆。如果这个元素小于堆顶的元素，就直接pass。最后堆中剩下的元素就是最大的前Top K个元素，最右的叶节点就是Top 第K大的元素。

>note：最小堆的插入时间复杂度为log(n)，n为堆中元素个数，在这里是K。最小堆的初始化时间复杂度是nlog(n)

C++中的最大最小堆要用标准库的priority_queue来实现。
```c++
struct Node {
    int value;
    int idx;
    Node (int v, int i): value(v), idx(i) {}
    friend bool operator < (const struct Node &n1, const struct Node &n2) ; 
};

inline bool operator < (const struct Node &n1, const struct Node &n2) {
    return n1.value < n2.value;
}

priority_queue<Node> pq; // 此时pq为最大堆
```

2. 使用Quick Select的思路（以寻找第K大的元素为例）<br>
Quick Select脱胎于快速排序，提出这两个算法的都是同一个人。算法的过程是这样的：
首先选取一个枢轴，然后将数组中小于该枢轴的数放到左边，大于该枢轴的数放到右边。
此时，如果左边的数组中的元素个数大于等于K，则第K大的数肯定在左边数组中，继续对左边数组执行相同操作；
如果左边的数组元素个数等于K-1，则第K大的数就是pivot；
如果左边的数组元素个数小于K，则第K大的数肯定在右边数组中，对右边数组执行相同操作。

这个算法与快排最大的区别是，每次划分后只处理左半边或者右半边，而快排在划分后对左右半边都继续排序。
```java
//此为Java实现
public int findKthLargest(int[] nums, int k) {
  return quickSelect(nums, k, 0, nums.length - 1);
}

// quick select to find the kth-largest element
public int quickSelect(int[] arr, int k, int left, int right) {
  if (left == right) return arr[right];
  int index = partition(arr, left, right);
  if (index - left + 1 > k)
    return quickSelect(arr, k, left, index - 1);
  else if (index - left + 1 == k)
    return arr[index];
  else
    return quickSelect(arr, k - (index - left + 1), index + 1, right);

}
```

3. 使用选择排序的思想对前K个元素排序 （ 以寻找前K大个元素为例）<br>
扫描一遍数组，选出最大的一个元素，然后再扫描一遍数组，找出第二大的元素，再扫描一遍数组，找出第三大的元素。。。。。以此类推，找K个元素，时间复杂度为O(N*K)

####  8G的int型数据，计算机的内存只有2G，怎么对它进行排序？（外部排序）（百度一面）

可以使用外部排序来对它进行处理。首先将整个文件分成许多份，比如说m份，划分的依据就是使得每一份的大小都能放到内存里。然后我们用快速排序或者堆排序等方法对每一份数据进行一个内部排序，变成有序子串。接着对这m份有序子串进行m路归并排序。取这m份数据的最小元素，进行排序，输出排序后最小的元素到结果中，同时从该元素所在子串中读入一个元素，直到所有数据都被输出到结果中为止。

### 布隆过滤器原理与优点

布隆过滤器是一个比特向量或者比特数组，它本质上是一种概率型数据结构，用来查找一个元素是否在集合中，支持高效插入和查询某条记录。常作为针对超大数据量下高效查找数据的一种方法。

**它的具体工作过程是这样子的：**
假设布隆过滤器的大小为m（比特向量的长度为m），有k个哈希函数，它对每个数据用这k个哈希函数计算哈希，得到k个哈希值，然后将向量中相应的位设为1。在查询某个数据是否存在的时候，对这个数据用k个哈希函数得到k个哈希值，再在比特向量中相应的位查找是否为1，如果某一个相应的位不为1，那这个数据就肯定不存在。但是如果全找到了，则这个数据有可能存在。

**为什么说有可能存在呢？**
因为不同的数据经过哈希后可能有相同的哈希值，在比特向量上某个位置查找到1也可能是由于某个另外的数据映射得到的。

**支持删除操作吗**
目前布隆过滤器只支持插入和查找操作，不支持删除操作，如果要支持删除，就要另外使用一个计数变量，每次将相应的位置为1则计数加一，删除则减一。

布隆过滤器中哈希函数的个数需要选择。如果太多则很快所有位都置为1，如果太少会容易误报。

**布隆过滤器的大小以及哈希函数的个数怎么选择？**
k 为哈希函数个数，m 为布隆过滤器长度，n 为插入的元素个数，p 为误报率

### 智力题

#### （1） 100层楼，只有2个鸡蛋，想要判断出那一层刚好让鸡蛋碎掉，给出策略（滴滴笔试中两个铁球跟这个是一类题）
* （给定了楼层数和鸡蛋数的情况）二分法+线性查找  从100/2=50楼扔起，如果破了就用另一个从0扔起直到破。如果没破就从50/2=25楼扔起，重复。
* 动态规划
#### （2） 毒药问题，1000瓶水，其中有一瓶可以无限稀释的毒药，要快速找出哪一瓶有毒，需要几只小白鼠
用二进制的思路解决问题。2的十次方是1024，使用十只小鼠喝一次即可。方法是先将每瓶水编号，同时10个小鼠分别表示二进制中的一个位。将每瓶水混合到水瓶编号中二进制为1的小鼠对应的水中。喝完后统计，将死亡小鼠对应的位置为1，没死的置为0，根据死亡小鼠的编号确定有毒的是哪瓶水，如0000001010表示10号水有毒。
#### （4） 先手必胜策略问题：100本书，每次能够拿1-5本，怎么拿能保证最后一次是你拿
寻找每个回合固定的拿取模式。最后一次是我拿，那么上个回合最少剩下6本。那么只要保持每个回合结束后都剩下6的倍数，并且在这个回合中我拿的和对方拿的加起来为6（这样这个回合结束后剩下的还是6的倍数），就必胜。关键是第一次我必须先手拿（100%6=4）本（这不算在第一回合里面）。
#### （5） 放n只蚂蚁在一条树枝上，蚂蚁与蚂蚁之间碰到就各自往反方向走，问总距离或者时间。
碰到就当没发生，继续走，相当于碰到的两个蚂蚁交换了一下身体。其实就是每个蚂蚁从当前位置一直走直到停止的总距离或者时间。
#### （6） 瓶子换饮料问题：1000瓶饮料，3个空瓶子能够换1瓶饮料，问最多能喝几瓶
拿走3瓶，换回1瓶，相当于减少2瓶。但是最后剩下4瓶的时候例外，这时只能换1瓶。所以我们计算1000减2能减多少次，直到剩下4.（1000-4=996，996/2=498）所以1000减2能减498次直到剩下4瓶，最后剩下的4瓶还可以换一瓶，所以总共是1000+498+1=1499瓶。
#### （7）在24小时里面时针分针秒针可以重合几次
24小时中时针走2圈，而分针走24圈，时针和分针重合24-2=22次，而只要时针和分针重合，秒针一定有机会重合，所以总共重合22次
#### （8） 有一个天平，九个砝码，一个轻一些，用天平至少几次能找到轻的？
至少2次：第一次，一边3个，哪边轻就在哪边，一样重就是剩余的3个；
第二次，一边1个，哪边轻就是哪个，一样重就是剩余的那个；
#### （9） 有十组砝码每组十个，每个砝码重10g，其中一组每个只有9g，有能显示克数的秤最少几次能找到轻的那一组砝码？
砝码分组1~10，第一组拿一个，第二组拿两个以此类推。。第十组拿十个放到秤上称出克数x，则y = 550 - x，第y组就是轻的那组
#### （10）生成随机数问题：给定生成1到5的随机数Rand5()，如何得到生成1到7的随机数函数Rand7()？
思路：由大的生成小的容易，比如由Rand7()生成Rand5()，所以我们先构造一个大于7的随机数生成函数。
记住下面这个式子：
- RandNN= N( RandN()-1 ) + RandN() ;// 生成1到N^2之间的随机数
可以看作是在数轴上撒豆子。N是跨度/步长，是RandN()生成的数的范围长度，RandN()-1的目的是生成0到N-1的数，是跳数。后面+RandN()的目的是填满中间的空隙

比如` Rand25= 5( Rand5()-1 ) + Rand5()`可以生成1到25之间的随机数。我们可以只要1到21（3*7）之间的数字，所以可以这么写
```c++
int rand7(){
  int x=INT_MAX;
  while(x>21){
    x=5*(rand5()-1)+rand5();
  }
  return x%7+1;
}
```
#### 赛马：有25匹马，每场比赛只能赛5匹，至少要赛多少场才能找到最快的3匹马？
* 第一次，分成5个赛道ABCDE，每个赛道5匹马，每个赛道比赛一场，每个赛道的第12345名记为 A1,A2,A3,A4,A5  B1,B2,B3,B4,B5等等，这一步要赛5场。 
* 第二次，我们将每个赛道的前三名，共15匹。分成三组，然后每组进行比赛。这一步要赛3场。
* 第三次，我们取每组的前三名。共9匹，第一名赛道的马编号为1a,1b,1c，第二名赛道的马编号为2a,2b,2c，第三名赛道的马编号为3a,3b,3c。这时进行分析，1a表示第一名里面的第一名，绝对是所有马中的第一，所以不用再比了。2c表示第二名的三匹里头的最后一匹，3b和3c表示第三名里面的倒数两匹，不可能是所有马里面的前三名，所以也直接排除，剩下1b,1c,2a,2b,,3a，共5匹，再赛跑一次取第一第二名，加上刚筛选出来的1a就是所有马里面的最快3匹了。这一步要赛1场。
* 所以一共是5+3+1=9场。
#### 烧 香/绳子/其他 确定时间问题：有两根不均匀的香，燃烧完都需要一个小时，问怎么确定15分钟的时长？
（说了求15分钟，没说开始的15分钟还是结束的15分钟，这里是可以求最后的15分钟）点燃一根A，同时点燃另一根B的两端，当另一根B烧完的时候就是半小时，这是再将A的另一端也点燃，从这时到A燃烧完就正好15分钟。

#### 掰巧克力问题 N*M块巧克力，每次掰一块的一行或一列，掰成1*1的巧克力需要多少次？（1000个人参加辩论赛，1V1，输了就退出，需要安排多少场比赛）
每次拿起一块巧克力，掰一下（无论横着还是竖着）都会变成两块，因为所有的巧克力共有N\*M块，所以要掰N\*M-1次，-1是因为最开始的一块是不用算进去的。

每一场辩论赛参加两个人，消失一个人，所以可以看作是每一场辩论赛减少一个人，直到最后剩下1个人，所以是1000-1=999场。


# Done
