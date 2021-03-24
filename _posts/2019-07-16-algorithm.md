---
layout: post
title:  "经典算法总结-Classical Algorithm"
categories: 计算机基础
tags:  数据结构 算法 KMP Morris 二叉树 字符串
author: 风之筝
excerpt: 有哪些经典算法让人拍手称快、赞叹不已？
mathjax: true
---

* content
{:toc}

- 本栏目汇总各类经典的基础算法

# 数据结构与算法

- 【2020-1-2】[清华大学邓俊辉](https://dsa.cs.tsinghua.edu.cn/~deng/ds/dsacpp/)数据结构,[视频](https://www.bilibili.com/video/av81804191)

<iframe src="//player.bilibili.com/player.html?aid=81804191&cid=139968407&page=24" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="600" width="100%"> </iframe>

- 【2020-6-18】快速刷题：[算法模板](https://github.com/greyireland/algorithm-pattern)，最科学的刷题方式，最快速的刷题路径，你值得拥有~ [Gitbook](https://greyireland.gitbook.io/algorithm-pattern/ru-men-pian/quickstart)
![](https://camo.githubusercontent.com/dec4d9e996c2357647a28b995307e826531f994f/68747470733a2f2f696d672e667569626f6f6d2e636f6d2f696d672f6c656574636f64655f6578706c6f72652e706e67)
- 【2021-1-23】可视化解释A*、Dijkstra、BFS寻路算法，[在线体验地址](https://interactive-pathfinding.netlify.app/)，完整代码[Interactive pathfinding](https://github.com/npretto/pathfinding) - Visual explanation of pathfinding algorithms and how a*, Dijkstra and BFS can be seen as the same algorithm with different parameter/data structures used under the hood' by Nicolò Pretto



## 观点

- 【2012-8-22】陈皓：[为什么我反对纯算法面试题](https://coolshell.cn/articles/8138.html)
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


## 排序算法

- 【2020-7-18】真人表演排序算法
	- [冒泡排序](https://www.ixigua.com/6737477016913759499/)
	- [插入排序](https://www.ixigua.com/6746112027594378504/)
	- [归并排序](https://www.ixigua.com/6748741660663926024/)

### 插入排序

```C++
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

### 快排

快排存在的问题，如何优化
* 3 种快排基准选择方法：随机（rand函数）、固定（队首、队尾）、三数取中（队首、队中和队尾的中间数）

* 4种优化方式：
- 优化1：当待排序序列的长度分割到一定大小后，使用插入排序
- 优化2：在一次分割结束后，可以把与Key相等的元素聚在一起，继续下次分割时，不用再对与key相等元素分割
- 优化3：优化递归操作
- 优化4：使用并行或多线程处理子序列

```C++
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


### 堆排序

堆排序的基本过程：
* 将n个元素的序列构建一个大顶堆或小顶堆
* 将堆顶的元素放到序列末尾
* 将前n-1个元素重新构建大顶堆或小顶堆，重复这个过程，直到所有元素都已经排序

整体时间复杂度为nlogn
```C++
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


## 树

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


## 串匹配算法

串匹配在实际使用中有着广泛的需求，从计算机领域简单的文本搜索，到生物科学领域复杂的氨基酸序列匹配，都离不开高效的串匹配方法。

KMP算法是经典的串匹配算法，由Knuth和Pratt师徒发明，同一时间Morris也发明了这一算法。因此按照姓氏首字母，这一算法得名“KMP”算法。简单而言，KMP算法主要通过根据**对成功匹配段的复用**以及**对失败匹配段的学习**来加快字符串匹配的速度，其时间复杂度为O(n)。

为方便下文的表述，我们作如下的约定：

- 文本串T（Text String）：需要查询的全量字符串，其长度为n
- 模式串P（Pattern String）：查询的片段字符串，其长度为m
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

``` java
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

``` java
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

``` java
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

```
next[j] = max({ t | P[0, t) = P[j - t, j) 且 P[t] ≠P[j] })
```

因此实质上，next表的构建是一个自我匹配的过程，仿照匹配代码，我们可以写出next表的构建代码：

``` java
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

``` java
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

``` java
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

``` java
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

``` java
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

``` java
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

``` java
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

``` java
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

``` java
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

``` java
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

我们先以中序遍历为例，介绍Morris算法的核心思想。回顾一下中序遍历的内容：

1. 若节点还有左子树，就要先把左子树访问完
2. 没有左子树可访问时，访问该节点，并尝试访问右子树

之前我们还提到过，如果这棵树是一棵二叉搜索树，那么中序遍历的结果应当是一个有序数组。为了方便起见，我们可以按照中序遍历的结果，将整个树组成一个链表，每一个节点都有“前驱”节点和“后继”节点。例如在之前示例的二叉树上，0是1的前驱节点，而2是1的后继节点。

![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_succ.png)

显然，中序遍历可以转化为对后继节点的计算过程。后继节点的计算方法为：

```
1. 对于存在右子树的节点A，其后继节点是其右子树中最左侧的节点；
2. 对于没有右子树的节点B，其后继节点是其自下而上的父节点中第一个将其作为左子树的节点。
```

节点A的后继计算非常简单。然而由于二叉树的信息中不包括父节点的信息，因此第2条操作起来非常困难，这也是为何之前采用了栈/队列的方式存储父节点的信息。

但是我们注意到，虽然对于这样的节点B，求取其后继节点非常困难；但是其后继节点来说，由于节点B是其子树中的一个节点，因此求前驱节点就很容易了！为了使得访问到节点B时能够直接得到后继信息，我们可以暂时**使用B节点右子树的链接，存储后继节点**，以实现对后继节点的直接获取，同时不占用额外的空间。这就是Morris遍历算法的主要思想。

### Morris中序遍历算法

根据上述分析，我们可以写出程序的主要计算过程：

1. 从根节点开始访问。
2. 如果当前节点C不存在左子树，按中序遍历的规则，应当访问节点C，并进入其右子树进行遍历。
3. 如果当前节点C存在左子树，就找到C的前驱节点B，并将B的右孩子指向C（存储后继），同时当前节点转入左子树进行遍历。
4. 步骤2中访问右子树时，如果节点本身没有右子树，则会直接转入其后继节点C。根据中序遍历的规则，说明此时C的左子树遍历完成。为了还原树结构，我们需要重新找到C的前驱节点，并将其右孩子设置为null。之后我们访问节点C，并进入其右子树进行遍历。

以之前的示例树为例，图解一下morris遍历的部分过程：

![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_morris1.png)

![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_morris2.png)

![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_morris3.png)

![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_morris4.png)

![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_morris5.png)

因此，我们写出Morris中序遍历算法的程序如下：

``` java
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

![](https://raw.githubusercontent.com/ghh3809/ghh3809.github.io/master/_posts/_pic/20180806_complex.png)

当然，我们也可以逐层计算循环总计算次数。例如对于一棵满二叉树，其倒数第二层的节点树为n/4，寻找前驱的长度为2，以此类推，我们可以得到：

<script type="text/javascript" src="http://cdn.mathjax.org/mathjax/latest/MathJax.js?config=default"></script>

$$C = \sum_{i=1}^{\log_2(n/2)} \frac{n}{2^{i+1}} \times i = \frac{n}{4} \times 1 + \frac{n}{8} \times 2 + \frac{n}{16} \times 3 + \cdots + 1 \times \log_2(\frac{n}{2}) = n - 1 - \log_2(n) \sim O(n)$$

### Morris先序遍历与后序遍历算法

介绍完了Morris中序遍历，其先序遍历和后序遍历都是在中序遍历的基础之上加以改动得到的。例如先序遍历时，需要先访问节点，再决定深入左子树或右子树：

``` java
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

```
当访问到任何节点C的前驱节点B时，由B到C的路径（不包括节点C）即为之后的访问顺序。
```

因此所有的访问过程可以化为由B到C的访问。得到的Morris后序遍历程序如下，注意为了保证程序能够顺利访问右子树，为根节点添加了一个哨兵节点：

``` java
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

``` java
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

### 反转一个链表（招银网络二面）

```C++
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
```C++
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
```
RandNN= N( RandN()-1 ) + RandN() ;// 生成1到N^2之间的随机数
可以看作是在数轴上撒豆子。N是跨度/步长，是RandN()生成的数的范围长度，RandN()-1的目的是生成0到N-1的数，是跳数。后面+RandN()的目的是填满中间的空隙
```
比如` Rand25= 5( Rand5()-1 ) + Rand5()`可以生成1到25之间的随机数。我们可以只要1到21（3*7）之间的数字，所以可以这么写
```
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
