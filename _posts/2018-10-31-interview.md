---
layout: post
title:  "面试指南及算法工程师成长-The Guide for Interview"
date:   2018-10-31 20:08:00
categories: 人生规划
excerpt : AI初学者不要过于迷信企业项目，忽略基本功的学习，不要mnist都没研究透彻就嫌简单，直奔难度更大的resnet，好高骛远，得不偿失，学东西请务必戒骄戒躁，一步一个脚印，才能越走越远。企业项目的事实跟你想象的大不一样
tags: 实习 应届生 AI 算法工程师 面试 工业界 学术界 简历 危机 能力 等级 调参 调包
permalink: /interview
---

* content
{:toc}


# 面试

Facebook（Meta）[Investing in the Future: Introducing New Work Choices in EMEA](https://www.metacareers.com/life/investing-in-the-future-introducing-new-work-choices-in-emea)

## 企业需求

企业招聘要求
- 为公司解决问题，带来收益 ＞ 个人学习成长 
- 帮上司排忧解难，超出预期的解决问题

企业需要什么样的人
- 【2018-8-22】这里的企业特指互联网企业，算法研发岗
- 【2018-10-16】阿里不是很重视校招，喜欢捡现成的，即便是校招，要求也是很高，2015年阿里校招面试，我面了两天，8+9=17人，都是清北中之类的，硕士以上，通过率不到30%，当时的标准是：大公司实习经历+学校学历好+理论基础好+动手能力强，只要有一个面试官犹豫不决，就否了。
- 【2020-5-21】面试本身就是不公平的，40-50分钟内，面试官试图通过几个点(问题)来感知候选人全方位的能力，这本身就不容易，关键这几个点还是面试官在自己熟悉的领域里挑选的（甚至提前准备好答案），不能答错，也不能答不出来，或者牵强附会，更不能指出面试官的错误，还要适当主导面试进程，不停地展示自己的技能，难…不同面试可能会出现截然相反的评论。所以，通过与否一定程度上靠缘分…

## 优秀候选人

如何成为那20%？
- 二八定律无处不在，20% 的候选人占据了市场上 80% 的offer，反之，另外 80% 的候选人只能苦哈哈的陷入那 20% offer中竞争

如何成为20%？

个人经验：
1. 代码算法：
  - C字符串函数
  - 基本算法（如快排等，需要熟练掌握）
  - 剑指Offer：面试经常出相似的题，类似书籍《编程珠玑》、《编程之美》、《程序员面试宝典》
  - LeetCode（增强动手能力）【2019-06-06】[程序员小吴](https://www.cxyxiaowu.com/)的[图解Leetcode](https://github.com/MisterBooo/LeetCodeAnimation)
1. 计算机功底
  - 熟练使用Linux开发环境：shell+vim+awk+git
  - 操作系统、web（浏览器工作原理）、cpu、内存
  - 数学基础：概率、线代、优化、微积分等
1. 数据挖掘（特征工程）
  - excel、awk、python
  - Hadoop/Hive/Spark
  - [教你如何迅速秒杀掉：99%的海量数据处理面试题](https://link.zhihu.com/?target=http%3A//blog.csdn.net/v_july_v/article/details/7382693)。（基本每次都有一道海量数据处理的面试题）
  - 分析技巧：趋势、比较、细分，参考：[数据分析的三个常用方法：数据趋势、对比和细分分析](http://www.woshipm.com/data-analysis/676038.html)
  - 注：数据分析没有想象的那么容易，那么低级，占据了算法工程师高达70-80%的时间
  - 要点：<font color='red'>知其然，知其所以然</font>
    - 深入理解业务，培养数据敏感度，见微知著
    - 不要只关心算法，不理业务！
    - 开阔视野，与时俱进，复合人才：[人人都是产品经理](http://www.woshipm.com/)、极客公园、36Kr、雷锋、机器之心等
1. 机器学习：
  - 李航《统计学习方法》（读3遍都不为过）
  - Coursera Stanford《Machine Learning》（讲得很基础，但是没有告诉你所以然）
  - Coursera 台湾大学《机器学习高级技法》、李宏毅的深度学习等（里面详解了SVM，Ensemble等模型的推导，优劣）
  - 此处资料太多。。。
1. 项目经验
  - 请详细地回忆自己做过的项目
    - 项目用了什么算法，为什么用它，有什么优缺点等。
    - 注意：逻辑严密、思路清晰
1. 技术影响力
  - 技术竞赛：阿里天池、Kaggle、KDD等
  - 顶会论文
  - 书籍出版
  - 最好有自己的github，有自己的项目（不只是clone），并且定期更新

面试技巧
- 自信、淡定：一紧张就会漏洞百出，发挥失常 —— “不就一次面试嘛，没什么大不了的”
- 三思而行：开口前多换位思考，面试官到底想问什么，为什么会这样问，怎么回答比较好
- 反客为主：主动引导，从跌倒的地方爬起来
- 个人品质：诚实可靠，虚怀若谷，积极上进，尽量不要让面试官难堪
学习方法
- 构建自己的知识体系，终身学习
- 想牛人看齐，主动营造积极向上的环境
- 时刻反思哪里做的不好，下次改进

## 面试流程（面试官）

面试官代表着公司的形象，一言一行要礼貌、谨慎；我们面别人时，同时也是被面，其中的每个表情，每句话都会被记住，甚至“发扬光大”

基本流程：
- （1）面试前
  - 给候选人倒水，嘘寒问暖，路上是否堵车，有没有紧急的事情
  - 尊重对方感受，别让人等太久（尤其是特殊时间段，如午饭）
- （2）面试中
轻松的氛围，不宜过于严肃，咄咄逼人，或者挑衅，不合适的质疑
面试内容要覆盖全面，参考以下《面试要求》
- （3）面试后，问候选人是否有问题，或者没问到的优点，面试感觉如何
- （4）送别时，最好亲自送出门
  - 关于结果，需要统一话术：
    - 很满意：当天给，询问是否有要求、顾虑
    - 比较满意：几天内给答复，适当指出优点（暗示）
    - 不太满意：一个星期内等消息（几天后短信回复结果），同时可以指出优点（避免候选人丧气）和不足（暗示）
    - 很不满意：坦诚指出不足，提供有价值的资料，让候选人有收获，感觉到被尊重
- 面试结论及时同步出来，尽可能减小面试官之间的方差
  - 如果拿捏不定是否通过，就加面，或者就否掉（犹豫意味着候选人还不够优秀，企业招聘一般要超出标准的，面试造火箭，工作拧螺丝）

注：
> 实习生面试最好由资深的人面，或者经过面试培训（口头交待也行）的新人，发offer、指导人应该由资深的人负责


## 面试要求

面试时，要时刻注意候选人心态+情绪，刚开始不宜直接出算法题，先聊项目，稳定情绪，完成冷启动，然后在从项目入手出题目，由浅入深，不停追问，挖掘出候选人的知识体系+思考方法+个人品质，直至不会。如果出现不适（发抖，面色凝重，生气），要适时调整

| 事项 | 重要性 | 时间比例 | 考察点 | 题目 | 备注| 
|---|--|---|------------------------|----------|---------|
| 基本功 | B | 20-30% |（1）编程题目（不敢写或写的不好的人动手不多），算法基础<br>（2）灵活多变，分别从广度和深度上扩充，不断拔高，直到不会。<br>（3）观察编程功能+潜力，挤掉刷题党 | 经典题目：排序，树，图，文本处理 | 看个人的开发习惯<br>①代码熟练程度<br>②性能意识（时空复杂度）<br>③代码风格（洁癖）|
| 理论知识| C | 10-25% | 机器学习、深度学习经典算法的原理、优缺点、关系、应用经验 | ①LR，GBDT,RF,XGBOOST区别<br>②tf-idf，word2vec，fasttext | ①理论体系的完整度<br>②理解是否透彻|
| 项目 | C | 30-50% | ①前因后果，逻辑推理，解决问题的方式<br>②多找几个点，深入问，多几个为什么，怎么样<br>③以点带面，询问相关技术体系（考察广度和深度） | ①让候选自己说最好的项目<br>②优缺点，如何改进<br>③开放问题：如何识别暴恐分子？ | 核实项目真实性，逻辑推理| 
|个人品质 | A | 10% | ①是否踏实（不会就不会，大方承认）<br>②是否谦逊（被人质疑怎么办）<br>③学习方法（看什么书，做笔记）<br>④是否好相处（油盐不进，自言自语，攻击型）| ①你觉得自己的优缺点是啥<br>②这个地方有问题吧，怎么能这样？<br>③你这个想法很不错（故意夸张）<br>④碰到不会的问题会怎么办 | 第一位| 
| 求职意愿 | A | 5% | 目前拿到哪些offer，来面试的目的，侧重点（薪资、职位、地理位置等） | 你有什么要了解的（看候选人关心什么：待遇/氛围/地域等） | 面试态度：凑数、有机会就试试、无所谓、很想来。。。 |

注：
> 个人品质最容易忽略，因为大部分人的品质都没啥问题，即便是有问题的，也难以通过几次面试锁定，所以这一块一般指态度

### 评分原则

基本原则
- 找亮点：我手比较松，一般很少挂人，总是会试图找应聘者的亮点、时间紧时也会让应聘者自述亮点，所以对于应聘者来说最好把自己的亮点准备好，在一个小时的面试时间中尽量展现。
- 只问简历上写了的知识点、当然-如果知识面窄是不会拿到高分的。

挂什么样的人
- 态度恶劣，尤其是傲娇的
- 答不上来时找各种理由强行解释的，比如说“你问的太细了、这问题太底层了、这问题太偏理论了”等等，这是个学习态度问题，大方承认这是自己的知识盲区并表示会学习补上并不难，每个人都会有盲区、不可耻、可耻的是不敢承认自己的不足、还要为不足强行找理由。

考察哪些方面
- coding、算法、数学，面试过程中也会看出一个人的沟通能力、team work能力、学习能力等。

对于转专业
- 一般会问问他们自学历程+cs基本知识，如果自学时间短、水平也够 -- 那说明此人够聪明、是加分项。

### 面试评价

常用评语
1. 同学你面试评价不错，概率很大，请耐心等待;
2. 你的排名比较靠前，不要担心，耐心等待;
3. 问题不大，正在审批，不要着急签其他公司，等等我们!
4. 预计9月中下旬，安心过节;5下周会有结果，请耐心等待下;
6. 可能国庆节前后，一有结果我马上通知你;
7. 预计10月中旬，再坚持一下:
8. 正在走流程，就这两天了;
9. 同学，结果我也不知道，你如果查到了也告诉我一声;
10. 同学你出线不明朗，建议签其他公司保底!
11. 同学你找了哪些公司，我也在找工作。

## 面试问题


### 基础算法

#### top k 问题

【20】[拜托，面试别再问我TopK了](https://mp.weixin.qq.com/s?__biz=MjM5ODYxMDA5OQ==&mid=2651961587&idx=1&sn=54bf39db7043cc638315caf70f24d94b&chksm=bd2d0d2f8a5a84395246be4522d10fbfc1f744658047d5fb3fad8e9f3c3d76baab3a2ce84867&mpshare=1&scene=23&srcid=1105ZuGdQ1PGSyatSFc4tzqt%23rd)

TopK，是问得比较多的几个问题之一，到底有几种方法，这些方案里蕴含的优化思路究竟是怎么样的
- 问题描述：从 arr[1, n] 这n个数中，找出最大的k个数，这就是经典的TopK问题。
- 栗子：从 arr[1, 12] = {5,3,7,1,8,2,9,4,7,2,6,6} 这n=12个数中，找出最大的k=5个。

TopK，不难；其思路优化过程，不简单：
1. **全局排序**，<font color='red'>O(n*lg(n))</font>
  - 最简单：将n个数排序之后，取出最大的k个
  - 分析：明明只需要TopK，却将全局都排序了，这也是这个方法复杂度非常高的原因。那能不能不全局排序，而只局部排序呢？
1. **局部排序**，只排序TopK个数，<font color='red'>O(n*k)</font>
  - 不再全局排序，只对最大的k个排序；冒泡是一个很常见的排序方法，每冒一个泡，找出最大值，冒k个泡，就得到TopK。
  - 分析：冒泡，将全局排序优化为了局部排序，非TopK的元素是不需要排序的，节省了计算资源。不少朋友会想到，需求是TopK，是不是这最大的k个元素也不需要排序呢？这就引出了第三个优化方法。
1. **堆**，TopK个数也**不排序**了，<font color='red'>O(n*lg(k))</font>
  - 思路：只找到TopK，不排序TopK，将冒泡的TopK排序优化为了TopK不排序，节省了计算资源
    - 先用前k个元素生成一个**小顶堆**，这个小顶堆用于存储，当前最大的k个元素
    - 接着从第k+1个元素开始扫描，和**堆顶**（堆中最小的元素）比较，如果被扫描的元素大于堆顶，则替换堆顶的元素，并调整堆，以保证堆内的k个元素，总是当前最大的k个元素。
    - 直到，扫描完所有n-k个元素，最终堆中的k个元素，就是猥琐求的Top
1. TopK的另一个解法：随机选择+partition
  - 随机选择算在是《算法导论》中一个经典的算法，其时间复杂度为O(n)，是一个线性复杂度的方法。核心算法思想是，分治法。
  - `分治法`（ Divide & Conquer），把一个大的问题，转化为若干个子问题（Divide），每个子问题“都”解决，大的问题便随之解决（Conquer）。这里的关键词是“都”。从伪代码里可以看到，快速排序递归时，先通过partition把数组分隔为两个部分，两个部分“都”要再次递归。
  - `减治法`（ Reduce & Conquer），分治法特例,把一个大的问题，转化为若干个子问题（Reduce），这些子问题中“只”解决一个，大的问题便随之解决（Conquer）。这里的关键词是“只”。二分查找binary_search，BS，是一个典型的运用减治法思想的算法
  - 分治法：每个分支“都要”递归，例如：快速排序，<font color='red'>O(n*lg(n))</font>
  - 减治法：分治法特例叫减治法。“只要”递归一个分支，例如：二分查找O(lg(n))，随机选择O(n); 二分查找，大问题可以用一个mid元素，分成左半区，右半区两个子问题。而左右两个子问题，只需要解决其中一个，递归一次，就能够解决二分查找全局的问题。
  - 通过分治法与减治法的描述，可以发现，分治法的复杂度一般来说是大于减治法的：
  - TopK是希望求出 arr[ 1,n] 中最大的k个数，那如果找到了第k大的数，做一次partition，不就一次性找到最大的k个数了么？问题变成了arr[1, n]中找到第k大的数
  - **随机选择**（randomized_select），找到arr[1, n]中第k大的数，再进行一次partition，就能得到TopK的结果
知其然，知其所以然。思路比结论重要。


分治和减治
- 分治法，大问题分解为小问题，小问题都要递归各个分支，例如：快速排序 O(n*lg(n))
- 减治法，大问题分解为小问题，小问题只要递归一个分支，例如：二分查找 O(lg(n))，随机选择

```c++
// 快排伪代码 —— 分治算法
void quick_sort(int[]arr, int low, inthigh){
         if(low== high) return;
         int i = partition(arr, low, high); // 快排核心，比i小的放左边，否则右边，保持整体大致有序
         quick_sort(arr, low, i-1);
         quick_sort(arr, i+1, high);
}
// 二分法伪代码 —— 减治算法
int BS(int[]arr, int low, inthigh, int target){
         if(low> high) return -1;
         mid= (low+high)/2;
         if(arr[mid]== target) return mid;
         if(arr[mid]> target)
                   return BS(arr, low, mid-1, target);
         else
                   return BS(arr, mid+1, high, target);
}
// 随机选择算法randomized_select，RS —— 减治算法
int RS(arr, low, high, k){
  if(low== high) return arr[low];
  i= partition(arr, low, high);
  temp= i-low; //数组前半部分元素个数
  if(temp>=k)
      return RS(arr, low, i-1, k); //求前半部分第k大
  else
      return RS(arr, i+1, high, k-i); //求后半部分第k-i大
}
```


### 数学问题

#### 跳台阶

有十五级台阶，每次最多跳三下，需要跳多少次能跳完

#### 扑克牌

有一百张牌，每张牌有一个数字，依次翻牌看牌后面的数字，用什么样的策略能保证拿到的牌是最大的

#### 赛马问题

#### 最优停止理论


#### 等概率抽样

[水库抽样算法精简总结](http://www.voidcn.com/article/p-ecjrnlye-eo.html)

- 空间亚线性算法：由于大数据算法中涉及到的数据是海量的，数据难以放入内存计算，所以一种常用的处理办法是不对全部数据进行计算，而只向内存里放入小部分数据，仅使用内存中的小部分数据，就可以得到一个有质量保证的结果。
- 数据流算法：是指数据源源不断地到来，根据到来的数据返回相应的部分结果。适用于两种情况：
  - 第一、数据量非常大仅能扫描一次时，可以把数据看成数据流，把扫描看成数据到来。
  - 第二、数据更新非常快，不能把所有数据都保存下来再计算结果，此时可以把数据看成是一个数据流。
在一些情况下，空间亚线性算法也叫数据流算法。

#### 任意分布函数拟合（反采样/逆采样）

用均匀分布拟合任意分布，用于随机数生成

[逆采样(Inverse Sampling)和拒绝采样(Reject Sampling)原理详解](https://blog.csdn.net/anshuai_aw1/article/details/84840446)
- 通过F的反函数将一个0到1均匀分布的随机数转换成了符合exp分布的随机数，注意，以上推导对于CDF可逆的分布都是一样的

#### 被父母打的概率

【2022-5-10】[知乎](https://www.zhihu.com/question/441647108/answer/2271041327)，考试砸了回到家，母亲打我的概率是 1/2，父亲打我的概率也是 1/2，那我被打的概率是多少？

被打的概率P主要取决于你爸妈行为之间的相关性ρ（注意P和ρ是两个不同字母）先看三种比较特殊ρ值的情况。
- （1）假设ρ=0，也即你爸是否打你和你妈是否打你两个随机变量之间**完全相互独立**，那么你被打的概率等于1减去你不被打的概率，也即1-1/2*1/2 = 3/4，也即75%。
- （2）假设ρ=1，也即你爸妈的行为**完全相关**，也就是完全趋同。如果其中一个打你，另外一个也会一起打你。如果其中一个放过你，另外一个也放过你。那么你被打的概率是 1/2，也即50%。
- （3）假设ρ=-1，也即假设你爸妈的行为**完全负相关**，也就是完全反着来。如果其中一个打你，另外一个选择放过你。如果其中一个选择放过你，另外一个就一定打你。那么很遗憾，你被打的概率是1，也即100%。

假设ρ取[-1 ,1]区间的其它值，就需要有P关于ρ的表达式，推理稍微有些复杂。但由于概率P和相关性ρ之间的线性关系（严格来说需要证明），而且根据上面三种特殊情况，已经明确的知道了直线上三个特殊点的坐标分别为（0 , 0.75）、(1 , 0.5)、(-1 , 1)。通过其中任意两点可以推出P关于ρ的线性关系式为:
- P = 0.75 - 0.25ρ 。 
可见概率P的取值范围是[0.5 , 1]区间。整体趋势而言是你爸妈的行为越趋同，你被打的概率越低。行为越趋反，你挨打的概率越高。所以我的建议是，如果你爸妈平时感情很好总是夫唱妇随的话，你勇敢进家门就好了，好歹有约一半的概率不被打（当然也有约一半的概率遭遇男女混合双打）。如果他俩喜欢唱反调，或者总是喜欢红脸黑脸地演戏，你看下今晚能不能去爷爷奶奶家或者同学家借住一宿。

严格解答：

设随机变量![[公式]](https://www.zhihu.com/equation?tex=X%3D%5Cbegin%7Bcases%7D0%2C%26%E7%88%B6%E4%BA%B2%E4%B8%8D%E6%89%93%E4%BD%A0%3B%5C%5C1%2C%26%E7%88%B6%E4%BA%B2%E6%89%93%E4%BD%A0%2C%5Cend%7Bcases%7D)![[公式]](https://www.zhihu.com/equation?tex=Y%3D%5Cbegin%7Bcases%7D0%2C%26%E6%AF%8D%E4%BA%B2%E4%B8%8D%E6%89%93%E4%BD%A0%3B%5C%5C1%2C%26%E6%AF%8D%E4%BA%B2%E6%89%93%E4%BD%A0%2C%5Cend%7Bcases%7D)则 ![[公式]](https://www.zhihu.com/equation?tex=X%2C+Y%5Csim+B%281%2C1%2F2%29) 。设你会挨打的概率是 ![[公式]](https://www.zhihu.com/equation?tex=p) , 则
- ![[公式]](https://www.zhihu.com/equation?tex=P%5C%7BX%3D0%2CY%3D0%5C%7D%3DP%5C%7BX%3D1%2CY%3D1%5C%7D%3D1-p%2C+)
- ![[公式]](https://www.zhihu.com/equation?tex=P%5C%7BX%3D0%2CY%3D1%5C%7D%3DP%5C%7BX%3D1%2CY%3D0%5C%7D%3Dp-1%2F2.)
因此 ![[公式]](https://www.zhihu.com/equation?tex=1%2F2%5Cle+p%5Cle+1) . 设 ![[公式]](https://www.zhihu.com/equation?tex=%5Crho%3D%5Crho_%7BXY%7D) 为 ![[公式]](https://www.zhihu.com/equation?tex=X%2CY) 的相关系数，则我们有
- ![[公式]](https://www.zhihu.com/equation?tex=%5Cfrac%7B%5Crho%7D%7B4%7D%3D%5Cmathrm%7BCov%7D%28X%2CY%29%3DE%28XY%29-EX%5Ccdot+EY%3D%5Cfrac34-p%2C+%5Cquad+p%3D%5Cfrac%7B3-%5Crho%7D%7B4%7D.)
 
由 ![[公式]](https://www.zhihu.com/equation?tex=1%2F2%5Cle+p%5Cle+1) 可知 ![[公式]](https://www.zhihu.com/equation?tex=-1%5Cle%5Crho%5Cle1) .
 
**结论**：父母行动越一致，你被打的概率越低。
*   如果父母喜欢同时行动，那么你只有 ![[公式]](https://www.zhihu.com/equation?tex=1%2F2) 几率会被打；
*   如果两人行动完全不相关，此时两人的行动恰好也是独立的（由联合分布律可知），挨打几率为 ![[公式]](https://www.zhihu.com/equation?tex=3%2F4) ；
*   如果两人喜欢对着干，相关系数为 ![[公式]](https://www.zhihu.com/equation?tex=-1) ，那你就惨了， ![[公式]](https://www.zhihu.com/equation?tex=100%5C%25) 被打。

注意![[公式]](https://www.zhihu.com/equation?tex=100%5C%25)被打并不代表一定会被打。举个例子，从 ![[公式]](https://www.zhihu.com/equation?tex=%5B0%2C1%5D) 上取点，父亲在小于 ![[公式]](https://www.zhihu.com/equation?tex=0.5) 时打你，母亲在大于 ![[公式]](https://www.zhihu.com/equation?tex=0.5) 时打你，此时 ![[公式]](https://www.zhihu.com/equation?tex=%5Crho%3D-1) ，你虽然不被打几率是 ![[公式]](https://www.zhihu.com/equation?tex=0%5C%25) ，但仍可能发生。实际上此时有 ![[公式]](https://www.zhihu.com/equation?tex=P%5C%7BX%3D1-Y%5C%7D%3D1) ，而必定被打指的是 ![[公式]](https://www.zhihu.com/equation?tex=X%3D1-Y) 。
 
最后注意如果父母打你几率不正好都是 ![[公式]](https://www.zhihu.com/equation?tex=%5Cfrac12) ，相关系数 ![[公式]](https://www.zhihu.com/equation?tex=%5Crho_%7BXY%7D) 一般不能取满 ![[公式]](https://www.zhihu.com/equation?tex=%5B-1%2C1%5D) 。


### 机器学习

参考
- [不容错过的12个深度学习面试问题](https://www.toutiao.com/article/6781378793861808644/)
- [百度2015校招机器学习笔试题](http://www.itmian4.com/thread-7042-1-1.html)

特征工程
- 离散、连续特征一般怎么处理（onehot、归一化、why、方法 等）；
- 特征变换、构造/衍生新特征（woe、iv、统计量 等）；
- 特征筛选（离散、连续、多重共线性 等）；
- 采样（除了随机呢？）；
- 缺失值处理（离散、连续）...
算法模型
- 常用loss、正则、sgd、l-bfgs、auc公式及优缺点、数据不平衡时的调参...
- booting：gbdt的loss、分裂节点依据、防过拟合；
- xgb的loss选择、泰勒展开、正则（gbdt能加么）、并行、vs lightGBM；
- lambdaMart的loss--如何直接优化metric（如NDCG）--学习/train过程；
- svm的优化目标、软间隔、调参；
- lr；rf；

深度学习
- dnn为什么要“deep”、deep后带来的信息传递/梯度传递问题及其优化策略（可以从网络结构、activation、normalization等方面阐述）；
- 卷积层学习过程（前后向）及参数数量估计；
- polling作用、优缺点、why用的越来越少；
- rnn长依赖问题、梯度问题；
- lstm的input output forget gate作用于哪、gru的update gate呢？
- 常用loss（分类、回归）、activation、optimizer（从一阶矩估计到二阶）、加了BN后做predict均值方差从哪来、常用的attention举例

强化学习
- 什么问题适合RL/MLE的缺陷、trail-and-error search、policy-based vs value-based、on-policy vs off-policy等
- q learning中q值得更新（其实很好记：当前q值 += 学习率*（环境reward+ 新状态下最大的q值*衰减值）、为什么要乘衰减值）；
- DQN使用network代替q_table的初衷（q表规模大时维护成本高）、两个network（结构一致、参数交替更新）、存储记忆 off-policy；（经验回放+固定目标）
- policy gradients如何学习/拟合目标（ -log(prob)*vt 像不像交叉熵...）、按概率选action vs epsilon-greedy；
- Actor-Critic中的actor与critic、优缺点、收敛问题、DDPG、

#### 机器学习流程

机器学习流程
- 1 抽象成数学问题 
  - 明确问题是进行机器学习的第一步。机器学习的训练过程通常都是一件非常耗时的事情，胡乱尝试时间成本是非常高的。
  - 这里的抽象成数学问题，指的我们明确我们可以获得什么样的数据，目标是一个分类还是回归或者是聚类的问题，如果都不是的话，如果划归为其中的某类问题。
- 2 **获取数据** 
  - 数据决定了机器学习结果的上限，而算法只是尽可能逼近这个上限。
  - 数据要有代表性，否则必然会过拟合。
  - 而且对于分类问题，数据偏斜不能过于严重，不同类别的数据数量不要有数个数量级的差距。
  - 而且还要对数据的量级有一个评估，多少个样本，多少个特征，可以估算出其对内存的消耗程度，判断训练过程中内存是否能够放得下。如果放不下就得考虑改进算法或者使用一些降维的技巧了。如果数据量实在太大，那就要考虑分布式了。
- 3 **特征预处理与特征选择** 
  - 良好的数据要能够提取出良好的特征才能真正发挥效力。
  - 特征预处理、数据清洗是很关键的步骤，往往能够使得算法的效果和性能得到显著提高。归一化、离散化、因子化、缺失值处理、去除共线性等，数据挖掘过程中很多时间就花在它们上面。这些工作简单可复制，收益稳定可预期，是机器学习的基础必备步骤。
  - 筛选出显著特征、摒弃非显著特征，需要机器学习工程师反复理解业务。这对很多结果有决定性的影响。特征选择好了，非常简单的算法也能得出良好、稳定的结果。这需要运用特征有效性分析的相关技术，如相关系数、卡方检验、平均互信息、条件熵、后验概率、逻辑回归权重等方法。
- 4 **训练模型与调优** 
  - 直到这一步才用到我们上面说的算法进行训练。现在很多算法都能够封装成黑盒供人使用。但是真正考验水平的是调整这些算法的（超）参数，使得结果变得更加优良。这需要我们对算法的原理有深入的理解。理解越深入，就越能发现问题的症结，提出良好的调优方案。
- 5 **模型诊断**
  - 如何确定模型调优的方向与思路呢？这就需要对模型进行诊断的技术。
  - 过拟合、欠拟合 判断是模型诊断中至关重要的一步。常见的方法如交叉验证，绘制学习曲线等。过拟合的基本调优思路是增加数据量，降低模型复杂度。欠拟合的基本调优思路是提高特征数量和质量，增加模型复杂度。
  - 误差分析 也是机器学习至关重要的步骤。通过观察误差样本，全面分析误差产生误差的原因:是参数的问题还是算法选择的问题，是特征的问题还是数据本身的问题……
  - 诊断后的模型需要进行调优，调优后的新模型需要重新进行诊断，这是一个反复迭代不断逼近的过程，需要不断地尝试， 进而达到最优状态。
- 6 **模型融合** 
  - 一般来说，模型融合后都能使得效果有一定提升。而且效果很好。
  - 工程上，主要提升算法准确度的方法是分别在模型的前端（特征清洗和预处理，不同的采样模式）与后端（模型融合）上下功夫。因为他们比较标准可复制，效果比较稳定。而直接调参的工作不会很多，毕竟大量数据训练起来太慢了，而且效果难以保证。
- 7 **上线运行** 
  - 这一部分内容主要跟工程实现的相关性比较大。工程上是结果导向，模型在线上运行的效果直接决定模型的成败。不单纯包括其准确程度、误差等情况，还包括其运行的速度(时间复杂度)、资源消耗程度（空间复杂度）、稳定性是否可接受。
  - 这些工作流程主要是工程实践上总结出的一些经验。并不是每个项目都包含完整的一个流程。这里的部分只是一个指导性的说明，只有大家自己多实践，多积累项目经验，才会有自己更深刻的认识。
  - 故，基于此，七月在线每一期ML算法班都特此增加特征工程、模型调优等相关课。比如，这里有个公开课视频《特征处理与特征选择》。


#### 判别式和生成式

- **判别**方法：由数据直接学习决策函数 Y = f（X），或者由条件分布概率 P（Y\|X）作为预测模型，即判别模型。
  - 常见的判别模型有：K近邻、SVM、决策树、感知机、线性判别分析（LDA）、线性回归、传统的神经网络、逻辑斯蒂回归、boosting、条件随机场
- **生成**方法：由数据学习联合概率密度分布函数 P（X,Y）,然后求出条件概率分布P(Y\|X)作为预测的模型，即生成模型。
  - 常见的生成模型有：朴素贝叶斯NB、隐马尔可夫模型HMM、高斯混合模型GMM、文档主题生成模型（LDA）、限制玻尔兹曼机RBM
- 由生成模型可以得到判别模型，但由判别模型得不到生成模型。

#### 模型参数 与 超参数

数据集上找到了最适合问题的模型**参数**。它具有以下几个特征:
- 用于预测新数据
- 显示了使用的模型的能力。通常用准确性来表示，即准确率。
- 直接从训练数据集学习
- 通常不需要人工设置
- 模型参数有多种形式，如神经网络**权值**、支持向量机中的**支持向量**、线性回归或逻辑回归算法中的**系数**。

![](https://p3.toutiaoimg.com/origin/pgc-image/6681c70830c94474bbe2b3d6e0bebbb8?from=pc)

什么是模型的超参数？
- 模型**参数**是由训练数据集本身建模的
- 模型**超参数** 不是。它完全在模型之外，不依赖于训练数据。

它的目的是什么?
- 用于训练过程中，帮助模型找到最合适的参数
- 通常是由模型训练的参与者手工挑选的
- 基于几种启发式策略来定义

模型超参数的例子：
- 训练人工神经网络时的**学习率**
- 训练支持向量机时的 C 和 sigma参数
- 最近邻模型中的 k系数

#### 学习率

![](https://p3.toutiaoimg.com/origin/pgc-image/0de738e3d2b940bea2abb50b0ca61c86?from=pc)

- 模型学习率太低时，模型训练将会进行得非常慢，因为它对权重进行非常小的更新。在到达局部最优点之前需要多次更新。
- 学习率过高，则由于权值更新过大，模型可能会不收敛。有可能在一个更新权值的步骤中，模型跳出了局部优化，使得模型以后很难更新到最优点，而是在在局部优化点附近跳来跳去。

#### 基本概念：Epoch、Batch 和 Iteration

- Epoch：表示整个数据集的迭代(所有内容都包含在训练模型中)。
- Batch：是指当我们不能一次将整个数据集放到神经网络中时，我们将数据集分割成几批较小的数据集。
- 迭代：是运行 epoch 所需的批数。假设有 10,000 个图像作为数据，批处理的大小(batch_size)为 200。然后一个 epoch 将包含 50 个迭代(10,000 除以 200)。


#### BP 反向传播工作原理

![](https://p3.toutiaoimg.com/origin/pgc-image/94504016163346599a95a86b5f7c9562?from=pc)

- 前向过程(前向计算)是一个帮助模型计算每一层权重的过程，其结果计算将产生一个yp结果。此时将计算损失函数的值，损失函数的值将显示模型的好坏。如果损失函数不够好，我们需要找到一种方法来降低损失函数的值。训练神经网络本质上是最小化损失函数。损失函数 L(yp，yt)表示yp模型的输出值与yt数据标签的实际值的差别程度。
- 为了降低损失函数的值，使用导数。反向传播帮助计算网络每一层的导数。根据每个层上的导数值，优化器(Adam、SGD、AdaDelta…)应用梯度下降更新网络的权重。
- 反向传播使用**链式规则**或导数函数计算每一层从最后一层到第一层的梯度值。


#### 激活函数

激活函数的意义
- 激活函数的产生是为了打破神经网络的**线性**特性。这些函数可以简单地理解为用一个**滤波器**来决定信息是否通过神经元。
- 在神经网络训练中，激活函数在调节导数斜率中起着重要的作用。一些激活函数，如 sigmoid、fishy 或 ReLU。

这些**非线性**函数的性质使得神经网络能够学习比仅仅使用**线性**函数更复杂的函数的表示。大多数激活函数是**连续可微**函数。
- 如果输入的变量很小且可微(在其定义域内的每一点都有导数)，那么输出就会有一个小的变化。

当然，导数的计算是非常重要的，它是决定我们的神经元能否被训练的决定性因素。

常用的激活函数，如 Sigmoid, Softmax, ReLU。
- ![](https://p3.toutiaoimg.com/origin/pgc-image/bcc3c503a4ca48cd92c7a3e745b4021c?from=pc)

激活函数的饱和区间
- Tanh、Sigmoid、ReLU 等非线性激活函数都有**饱和区间**。
- 触发函数的**饱和范围**是指即使输入值改变，函数的输出值也不改变的区间。

变化区间存在两个问题
- 在**正向**传播中，该层的数值逐渐落入激活函数的饱和区间，将逐渐出现多个相同的输出。这将在整个模型中产生相同的数据流。这种现象就是**协方差移位**现象。
- 在**反向**传播中，导数在饱和区域为零，因此网络几乎什么都学不到。这就是将值范围设置为均值为 0 的原因，如 Batch 归一化一节中所述。

#### bias 和 Variance 之间的权衡关系

什么是bias？
- bias是当前模型的平均预测与实际结果之间的差异。
- 一个高 bias 的模型表明它对训练数据的关注较少。这使得模型过于简单，在训练和测试中都没有达到很好的准确性。这种现象也被称为**欠拟合**。

什么是方差？
- Variance 可以简单理解为模型输出在一个数据点上的**分布**。
- Variance 越大，模型越有可能密切关注训练数据，而不提供从未遇到过的数据的泛化。
- 因此，该模型在训练数据集上取得了非常好的结果，但是与测试数据集相比，结果非常差，这就是**过拟合**的现象。

偏差与方差关系
- E = V + B^2 + ε
- ![](https://p3.toutiaoimg.com/origin/pgc-image/a25ab7f117bf4a3e8a48b17c38cbcc8b?from=pc)

复杂模型有大量的参数，会有**高方差**和**低偏差**。
- ![](https://p3.toutiaoimg.com/origin/pgc-image/164634157dfc494d878fcb4854f1f6ab?from=pc)

#### 过拟合

[机器学习之Logistic回归(逻辑蒂斯回归）](http://blog.csdn.net/sinat_35512245/article/details/54881672)

正则化是针对过拟合而提出的，以为在求解模型最优的是一般优化最小的经验风险，现在在该经验风险上加入模型复杂度这一项（正则化项是模型参数向量的范数），并使用一个rate比率来权衡模型复杂度与以往经验风险的权重，如果模型复杂度越高，结构化的经验风险会越大，现在的目标就变为了结构经验风险的最优化，可以防止模型训练过度复杂，有效的降低过拟合的风险。

奥卡姆剃刀原理，能够很好的解释已知数据并且十分简单才是最好的模型。
L1和L2正则先验分别服从什么分布，L1是拉普拉斯分布，L2是高斯分布。

L1和L2区别
- L1范数（L1 norm）是指向量中各个元素绝对值之和，也有个美称叫“稀疏规则算子”（Lasso regularization）。
  - 比如 向量A=[ 1，-1，3 ]， 那么A的L1范数为 \|1\|+\|-1\|+\|3\|. 
  - 简单总结一下就是：
    - L1范数: 为x向量各个元素绝对值之和。
    - L2范数: 为x向量各个元素平方和的1/2次方，L2范数又称Euclidean范数或Frobenius范数
    - Lp范数: 为x向量各个元素绝对值p次方和的1/p次方. 
  - 在支持向量机学习过程中，L1范数实际是一种对于成本函数求解最优的过程，因此，L1范数正则化通过向成本函数中添加L1范数，使得学习得到的结果满足稀疏化，从而方便人类提取特征。
  - L1范数可以使权值稀疏，方便特征提取。
- L2范数可以防止过拟合，提升模型的泛化能力。

#### 为什么要做归一化

- [为什么一些机器学习模型需要对数据进行归一化？](http://www.cnblogs.com/LBSer/p/4440590.html)
- [深度学习中的归一化](http://www.julyedu.com/video/play/69/686)

不是所有模型都需要归一化：概率模型不需要归一化，因为它们不关心变量的值，而是关心变量的分布和变量之间的条件概率，如决策树、RF。而像Adaboost、GBDT、XGBoost、SVM、LR、KNN、KMeans之类的最优化问题就需要归一化。

#### 梯度下降

梯度下降法并不是下降最快的方向，它只是目标函数在当前的点的切平面（当然高维问题不能叫平面）上下降最快的方向。在Practical Implementation中，牛顿方向（考虑海森矩阵）才一般被认为是下降最快的方向，可以达到Superlinear的收敛速度。梯度下降类的算法的收敛速度一般是Linear甚至Sublinear的（在某些带复杂约束的问题）。

为什么不用牛顿法？
- 计算量大，目标函数的二阶导数(Hessian Matrix)
- 小批量情形下，牛顿法对二阶导的估计噪音太大
- 目标函数非凸时，牛顿法容易受鞍点/极值点影响

梯度消失/弥散
- （1）梯度消失：
  - 根据链式法则，如果每一层神经元对上一层的输出的偏导乘上权重结果都小于1的话，那么即使这个结果是0.99，在经过足够多层传播之后，误差对输入层的偏导会趋于0。
  - 可以采用ReLU激活函数有效的解决梯度消失的情况。
- 为什么会有梯度消失？
  - 神经网络的训练中，通过改变神经元的权重，使网络的输出值尽可能逼近标签以降低误差值，训练普遍使用BP算法，核心思想是，计算出输出与标签间的损失函数值，然后计算其相对于每个神经元的梯度，进行权值的迭代。
  - 梯度消失会造成权值更新缓慢，模型训练难度增加。造成梯度消失的一个原因是，许多激活函数将输出值挤压在很小的区间内，在激活函数两端较大范围的定义域内梯度为0，造成学习停止。
  - 反向传播中链式法则带来的连乘，如果有数很小趋于0，结果就会特别小（梯度消失）；如果数都比较大，可能结果会很大（梯度爆炸）。
- （2）梯度膨胀：
  - 根据链式法则，如果每一层神经元对上一层的输出的偏导乘上权重结果都大于1的话，在经过足够多层传播之后，误差对输入层的偏导会趋于无穷大。

LSTM为什么优于RNN
- 推导forget gate，input gate，cell state， hidden information等的变化；因为LSTM有进有出且当前的cell informaton是通过input gate控制之后叠加的，RNN是叠乘，因此LSTM可以防止梯度消失或者爆炸。

知识点链接：[一文清晰讲解机器学习中梯度下降算法（包括其变式算法）](http://blog.csdn.net/wemedia/details.html?id=45460)

#### batch normalization 的意义

Batch Normalization 是训练神经网络模型的一种有效方法。

该方法的目标是将**特征**(每层激活后的输出)**归一化**为均值为 0，标准差为 1。

所以问题在于非零均值是如何影响模型训练的：
- 首先，非零均值是指数据不围绕 0 值分布，但数据中大多数值大于零或小于零。结合高方差问题，数据变得非常大或非常小。这个问题在训练层数很多的神经网络时很常见。特征没有在**稳定区间**内分布(由小到大)，这将影响网络的优化过程。众所周知，优化神经网络需要使用**导数**计算。假设一个简单的层计算公式是 y = (Wx + b)， y 对 w 的导数是: dy = dWx。因此，x 的取值直接影响导数的取值(当然，神经网络模型中梯度的概念并不是那么简单，但从理论上讲，x 会影响导数)。因此，如果 x 带来不稳定的变化，其导数可能太大，也可能太小，导致学习模型不稳定。当使用 Batch Normalization 时可以在训练中使用更高的学习率。
- Batch Normalization 可以避免 x 值经过非线性激活函数后趋于**饱和**的现象。因此，它确保激活值不会过高或过低。这有助于权重的学习，当不使用时有些权重可能永远无法进行学习，而用了之后，基本上都可以学习到。这有助于我们减少对参数初始值的依赖。
- Batch Normalization 也是一种**正则化**形式，有助于最小化过拟合。使用 Batch Normalization，不需要使用太多的 dropout，这是有意义的，因为不需要担心丢失太多的信息，实际使用时，仍然建议结合使用这两种技术。

#### 不均衡数据集

常见方法
- 选择正确的**度量**来评估模型：对于不平衡的数据集，使用**准确率**来评估非常危险。应选择**精度**、**召回**、**F1** 分数、**AUC**等合适的评价量。
- **重新采样**训练数据集：除了使用不同的评估标准，人们还可以使用一些技术来获得不同的数据集。从一个不平衡的数据集中创建一个平衡的数据集有两种方法，即**欠采样**和**过采样**，具体技术包括重复、bootstrapping 或 hits(综合少数过采样技术)等方法。
- 许多不同模型的**集成**：通过创建更多的数据来概括模型在实践中并不总是可行的。例如，你有两个层，一个拥有 1000 个数据的罕见类，一个包含 10,000 个数据样本的大型类。因此，我们可以考虑一个 10 个模型的训练解决方案，而不是试图从一个罕见的类中找到 9000 个数据样本来进行模型训练。每个模型由 1000 个稀有类和 1000 个大规模类训练而成。然后使用集成技术获得最佳结果。
- 重新设计模型—**损失函数**：使用惩罚技术对代价函数中的多数类进行严厉惩罚，帮助模型本身更好地学习稀有类的数据。这使得损失函数的值在类中更全面。


#### LR

把LR从头到脚都给讲一遍。建模，现场数学推导，每种解法的原理，正则化，LR和maxent模型啥关系，LR为啥比线性回归好。有不少会背答案的人，问逻辑细节就糊涂了。原理都会? 那就问工程，并行化怎么做，有几种并行化方式，读过哪些开源的实现。还会，那就准备收了吧，顺便逼问LR模型发展历史

- 逻辑回归和线性回归首先都是广义线性回归
- 其次经典线性模型的优化目标函数是最小二乘，而逻辑回归则是似然函数， 
- 另外线性回归在整个实数域范围内进行预测，敏感度一致，而分类范围，需要在[0,1]。逻辑回归就是一种减小预测范围，将预测值限定为[0,1]间的一种回归模型，因而对于这类问题来说，逻辑回归的鲁棒性比线性回归的要好。

[机器学习之Logistic回归(逻辑蒂斯回归）](http://blog.csdn.net/sinat_35512245/article/details/54881672)

#### SVM

SVM，全称是support vector machine，中文名叫支持向量机。SVM是一个面向数据的分类算法，它的目标是为确定一个分类超平面，从而将不同的数据分隔开。

扩展：支持向量机学习方法包括构建由简至繁的模型：线性可分支持向量机、（近似）线性支持向量机及非线性支持向量机。
- 当训练数据线性可分时，通过硬间隔最大化，学习一个线性的分类器，即线性可分支持向量机，又称为硬间隔支持向量机；
- 当训练数据近似线性可分时，通过软间隔最大化，也学习一个线性的分类器，即线性支持向量机，又称为软间隔支持向量机；
- 当训练数据线性不可分时，通过使用核技巧及软间隔最大化，学习非线性支持向量机。

LR与SVM区别

联系：
- 1、LR和SVM都可以处理分类问题，且一般都用于处理线性二分类问题（在改进的情况下可以处理多分类问题） 
- 2、两个方法都可以增加不同的正则化项，如L1、L2等等。所以在很多实验中，两种算法的结果是很接近的。

区别：
- 1、LR是参数模型，SVM是非参数模型。
- 2、从目标函数来看，区别在于逻辑回归采用的是Logistical Loss，SVM采用的是hinge loss.这两个损失函数的目的都是增加对分类影响较大的数据点的权重，减少与分类关系较小的数据点的权重。
- 3、SVM的处理方法是只考虑Support Vectors，也就是和分类最相关的少数点，去学习分类器。而逻辑回归通过非线性映射，大大减小了离分类平面较远的点的权重，相对提升了与分类最相关的数据点的权重。
- 4、逻辑回归相对来说模型更简单，好理解，特别是大规模线性分类时比较方便。而SVM的理解和优化相对来说复杂一些，SVM转化为对偶问题后,分类只需要计算与少数几个支持向量的距离,这个在进行复杂核函数计算时优势很明显,能够大大简化模型和计算。
- 5、Logic 能做的 SVM能做，但可能在准确率上有问题，SVM能做的Logic有的做不了。

资料
- [支持向量机通俗导论（理解SVM的三层境界）](https://www.cnblogs.com/v-July-v/archive/2012/06/01/2539022.html)
- [机器学习之深入理解SVM](http://blog.csdn.net/sinat_35512245/article/details/54984251)
- [机器学习常见问题](http://blog.csdn.net/timcompp/article/details/62237986)

#### xgb

为什么xgb用泰勒展开
- XGBoost使用了一阶和二阶偏导, 二阶导数有利于梯度下降的更快更准. 使用泰勒展开取得二阶倒数形式, 可以在不选定损失函数具体形式的情况下用于算法优化分析.本质上也就把损失函数的选取和模型算法优化/参数选择分开了. 这种去耦合增加了XGBoost的适用性。

xgb如何寻找最优特征
- XGBoost在训练的过程中给出各个特征的评分，从而表明每个特征对模型训练的重要性.。XGBoost利用梯度优化模型算法, 样本是不放回的(想象一个样本连续重复抽出,梯度来回踏步会不会高兴)。但XGBoost支持子采样, 也就是每轮计算可以不使用全部样本。

xgb和gbdt区别
- XGBoost类似于GBDT的优化版，不论是精度还是效率上都有了提升。
与GBDT相比，具体的优点有：
- 损失函数是用泰勒展式二项逼近，而不是像GBDT里的就是一阶导数；
- 对树的结构进行了正则化约束，防止模型过度复杂，降低了过拟合的可能性；
- 节点分裂的方式不同，GBDT是用的基尼系数，XGBoost是经过优化推导后的。
- 特征选择：借鉴RF，可并行

[集成学习的总结](https://xijunlee.github.io/2017/06/03/%E9%9B%86%E6%88%90%E5%AD%A6%E4%B9%A0%E6%80%BB%E7%BB%93/)

#### CRF与HMM

哪个不属于CRF模型对于HMM和MEMM模型的优势（ ）
- A. 特征灵活 
- B. 速度快 
- C. 可容纳较多上下文信息 
- D. 全局最优 

解答：
- 首先，CRF，HMM(隐马模型)，MEMM(最大熵隐马模型)都常用来做序列标注的建模。
- 隐马模型一个最大的缺点就是由于其输出独立性假设，导致其不能考虑上下文的特征，限制了特征的选择。
- 最大熵隐马模型则解决了隐马的问题，可以任意选择特征，但由于其在每一节点都要进行归一化，所以只能找到局部的最优值，同时也带来了标记偏见的问题，即凡是训练语料中未出现的情况全都忽略掉。
- 条件随机场则很好的解决了这一问题，他并不在每一个节点进行归一化，而是所有特征进行全局归一化，因此可以求得全局的最优值。

#### CNN：图像尺寸增加1倍，参数数量增加多少

CNN 模型的参数数量取决于滤波器的数量和大小，而不是输入图像。因此，将图像的大小加倍并不会改变模型的参数数量。
- ![](https://p3.toutiaoimg.com/origin/pgc-image/88e0aa6d29234818be1754e9d00f845e?from=pc)

### 计算机基础考题

hash冲突：关键字值不同的元素可能会映象到哈希表的同一地址上就会发生哈希冲突。解决办法：
- 1）**开放定址法**：当冲突发生时，使用某种探查(亦称探测)技术在散列表中形成一个探查(测)序列。沿此序列逐个单元地查找，直到找到给定 的关键字，或者碰到一个开放的地址(即该地址单元为空)为止（若要插入，在探查到开放的地址，则可将待插入的新结点存人该地址单元）。查找时探查到开放的 地址则表明表中无待查的关键字，即查找失败。
- 2）**再哈希法**：同时构造多个不同的哈希函数。
- 3）**链地址法**：将所有哈希地址为i的元素构成一个称为同义词链的单链表，并将单链表的头指针存在哈希表的第i个单元中，因而查找、插入和删除主要在同义词链中进行。链地址法适用于经常进行插入和删除的情况。
- 4）建立**公共溢出区**：将哈希表分为基本表和溢出表两部分，凡是和基本表发生冲突的元素，一律填入溢出表。


### 应用考题

几种类型：
- 纯leetcode题目：无背景信息，无需过多介绍，目标明确，但题目有一定随机性，容易让候选人发懵
- 背景相关题目：包含领域（如NLP）背景，根据候选简历信息而定

过程：题目从易到难，逐级提升，直至不会
- 易：具备编程基础就能写出来 → 看编程熟悉程度，代码风格，异常条件
- 中：性能提升，引入基础数据结构知识
- 难：知识点深入扩展（横向、纵向）


#### ML：嫌疑犯侦测

- 题目：设计一套机器学习系统，通过身份证信息+神态识别火车站里的嫌疑犯
- 数据：只有1000个样本，其中10个正例，990个负例。
- 知识点：抽样、不平衡、过拟合、评估指标（召回+准确+精确+F1）

机器学习系统设计：
- 数据处理：采集、缺失值、异常值
  - 训练集、验证集、测试集划分
- 特征工程：正负样本不平衡、特征变换（连续、离散）
  - 样本不平衡：欠采样（删除→SMOTE）、过采样（复制→easy ensamble）
  - 特征变换
- 模型：分类还是回归？还是异常检测？（i-forest，3倍标准差）
  - 过拟合、欠拟合，如何解决
  - 如何调参？线搜索、网格搜索、贝叶斯优化、学习率。。。
  - 时间不够，如何快速迭代
- 预测：模型如何加载？分布式情形？
- 评估：重精确还是召回？
  - 离线：k-fold交叉验证，F1，精确召回（表达式），AUC、ROC
  - 在线：小流量灰度实验、ab-test或inter-leaving
- 服务部署：如何形成闭环？系统监控、字段监控、数据上云
- 其它：产品策略不当、排期紧张怎么办？多人如何协作分配？

注意：
> 不要迷信刷题！要从题目中找知识体系的漏洞


#### ML：LR回归

考察机器人基本流程熟悉程度：
- 数据准备：训练集、测试集、验证集
- 评估指标：分类、回归
- 模型定义：网络结构，用sklearn、pytorch、TensorFlow实现
- 优化器：adam
- 训练
- 推断

#### ML：优化算法——训练曲线

模型训练环节，损失函数出现不同情形，如何快速定位？
- ![](https://pic4.zhimg.com/80/v2-287f28b3a1f34657c3a7dba0e6d4b55f_720w.jpg)
- 知识点
  - 学习率：学习率越大，波动越剧烈，学习率越小，波动越平缓。
  - 过拟合
  - batch size：batchsize越小，波动越剧烈，batchsize越大，波动越平缓。
  - 梯度下降算法：梯度就是曲线的斜率，如果要最小化目标函数，反向传播过程中，每个参数在梯度方向上减小一定幅度，最终网络收敛到一个局部最优值，减小的幅度大小由学习率决定。

[链接](https://www.zhihu.com/question/472162326/answer/2308198711)

训练的时候 loss 不下降
- 模型结构问题。当模型结构不好、规模小时，模型对数据的拟合能力不足。
- 训练时间问题。不同的模型有不同的计算量，当需要的计算量很大时，耗时也会很大
- 权重初始化问题。常用的初始化方案有全零初始化、正态分布初始化和均匀分布初始化等，合适的初始化方案很重要，之前提到过神经网络初始化为0可能会带来的影响
- 正则化问题。L1、L2以及Dropout是为了防止过拟合的，当训练集loss下不来时，就要考虑一下是不是正则化过度，导致模型欠拟合了。正则化相关可参考正则化之L1 & L2
- 激活函数问题。全连接层多用ReLu，神经网络的输出层会使用sigmoid 或者 softmax。激活函数可参考常用的几个激活函数。在使用Relu激活函数时，当每一个神经元的输入为负时，会使得该神经元输出恒为0，导致失活，由于此时梯度为0，无法恢复。
- 优化器问题。优化器一般选取Adam，但是当Adam难以训练时，需要使用如SGD之类的其他优化器。常用优化器可参考机器学习中常用的优化器有哪些？
- 学习率问题。学习率决定了网络的训练速度，但学习率不是越大越好，当网络趋近于收敛时应该选择较小的学习率来保证找到更好的最优点。所以，我们需要手动调整学习率，首先选择一个合适的初始学习率，当训练不动之后，稍微降低学习率。
- 梯度消失和爆炸。这时需要考虑激活函数是否合理，网络深度是否合理，可以通过调节sigmoid -> relu，假如残差网络等，相关可参考为什么神经网络会有梯度消失和梯度爆炸问题？如何解决？
- batch size问题。过小，会导致模型损失波动大，难以收敛，过大时，模型前期由于梯度的平均，导致收敛速度过慢。
- 数据集问题。
  - （1）数据集未打乱，可能会导致网络在学习过程中产生一定的偏见
  - （2）噪声过多、标注有大量错误时，会导致神经网络难以学到有用的信息，从而出现摇摆不定的情况，噪声、缺失值、异常值
  - （3）数据类别不均衡使得少数类别由于信息量不足，难以学到本质特征，样本不均衡相关可以看样本不均衡及其解决办法。
- 特征问题。特征选择不合理，会使网络学习难度增加。之前有提到过特征选择的文章，如何找到有意义的组合特征,特征选择方法

2 测试的时候 loss 不下降
- 训练的时候过拟合导致效果不好 
  - 交叉检验，通过交叉检验得到较优的模型参数;
  - 特征选择，减少特征数或使用较少的特征组合，对于按区间离散化的特征，增大划分的区间;
  - 正则化，常用的有 L1、L2 正则。而且 L1正则还可以自动进行特征选择;
  - 如果有正则项则可以考虑增大正则项参数;
  - 增加训练数据可以有限的避免过拟合;
  - Bagging ,将多个弱学习器Bagging 一下效果会好很多，比如随机森林等.
  - 早停策略。本质上是交叉验证策略，选择合适的训练次数，避免训练的网络过度拟合训练数据。
  - DropOut策略。
- 应用场景不同导致。本来训练任务是分类猫和狗，测试用的皮卡丘和葫芦娃。
- 噪声问题。训练数据大概率都是经过去噪处理的，而真实测试时也应该去除噪声。

#### ML：P/R指标——如何评估分类效果

分类问题中，直接使用精度precision指标衡量模型效果，不一定管用，比如：对于不平衡的数据问题
- 网络攻击的预测模型 (假设攻击请求占请求总数的 1/100000)。全部预测成非攻击请求，精确度高达 99.9%，没有意义
- 改进：
  - 混淆矩阵
    - ![](https://p3.toutiaoimg.com/origin/pgc-image/164d89c0bed64dbd9631eb3ed3dfe680?from=pc)
  - ROC曲线
    - 理想的 ROC 曲线是最接近左上角的橙色线。真阳性比较高，假阳性比较低。
    - ![](https://p3.toutiaoimg.com/origin/pgc-image/d263621d145f46aeaddadfcd713dbd99?from=pc)

- 实现precision、recall计算

#### NLP考题

NLP
- 词法/序列标注相关：hmm、crf、lstm、lstm+crf（细节：对于转移特征、转移概率 hmm crf lstm+crf分别是怎么学的？）
- 句法：有了依存关系 如何确定主谓宾、举几个例子
- word2vector：层次softmax、负采样、 vs GloVe
- topic相关：lsa（可以引到svd、基于mse的fm）；lda why引入共轭先验分布、调参（针对两个先验）；
- +DL：cnn filter的设计、seq2seq+attention的padding问题（对padding的字符如何做attention、如何忽略、用tensorflow/pytorch大致写一下）、tree lstm
- 任务相关：beam search做生成、dialog中对回复做lable smooth 提高回复多样性...


#### NLP：词频统计

- 题目：统计简历里的Top 5关键词
- 数据：简历文件cv.txt（或者两会专题新闻）
- 思路：逐行读入，分词，用一个字典存储频次，排序，输出top 5。
- 性能：时间复杂度O(N)+O(nlogn)，空间复杂度n——N是所有单词数，n是去重后的单词数
- 改进：
  - **时间**复杂度优化：能不能更快？
    - 排序环节：只需top5，排序时不用计算所有频次，堆排序（小根堆） + 单向冒泡
  - **空间**复杂度优化：
    - 读取环节：非得遍历完整个文件？牺牲准确率（类似bloom filter），分布式，随机抽样，水库抽样（等概率流式采样），逆采样和拒绝采样
- 发散：
  - 预计会是什么样的词？（业务敏感度 + NLP功底）—— 标点符号、停用词，高频词，需要加tf-idf权重
  - 如何挑关键词？分词、词性标注、相似词（字面+语义word2vec）
  - 数据量大：
    - 单机（4G以内）：不要一次加载到内存
    - 内存装不下（20G）：磁盘分片存储，逐个加载到内存（linux流式处理），可以分别取top5吗？
    - 磁盘装不下（1T）：分布式计算，Hadoop，MapReduce代码→HQL→jobtracker数据倾斜

#### NLP：新词发现

- 背景：word2vec 向量训练，cbow、skip-gram模式
- 需求：从文档中挖掘新出现的top k词汇, 长度3以内 （词频统计进阶版）
  - 输入：文档 D = { s1, s2, ..., sn}
  - 输出：W = [ [w1, 23], [w2, 10], ..., [wk, ck] ]
- 方法：
  - 思路：是否使用 tf-idf ？
  - 传统方法：n-gram思路，挨个遍历uni-gram, bi-gram, tri-gram, 取topk

#### NLP：MLM输出

- 背景：BERT模型用了MLM模型
- 需求：准备MLM语料，用于模型训练
  - 输入：文档 D = { s1, s2, ..., sn}, 其中 si = [ '这是一条句子' ] (m维)，musk策略与BERT类似
  - 输出：M = { [s1', m1], [s2', m2], ..., [sn', mn]}
- 方法
  - 思路：是否了解BERT的掩码策略？
  - 传统：

#### NLP：语义向量

- 背景：句向量 embedding
- 需求：找出与query最相似的几个句子
  - 输入：句向量集合 D = { v1, v2, ..., vn}, 其中 vi = [ 2, 5, 1 ] (m维)，任意向量 vx
  - 输出：与vx最相似的 top k个句子
- 方法：
  1. 每来一个vx，依次遍历D，得到距离集合，排序，取 top k输出 —— 时间复杂度 O(nm)+O(nlogn)，空间复杂度 O(n)，重复计算
  1. 改进：提前聚类，计算D中各向量距离
  1. 改进：类似 kd树，m维距离映射到一维数组上，就近取top k

#### NLP：NSP预测

- 背景：
- 需求：
  - 输入：
  - 输出：
- 方法：

#### NLP：编辑距离

- 背景：
- 需求：
  - 输入：
  - 输出：
- 方法：
  - 动态规划

#### NLP：transformer QKV计算


- 背景：
- 需求：
  - 输入：
  - 输出：
- 方法：

[用于Transformer的6种注意力的数学原理和代码实现](https://www.toutiao.com/article/7081075103982731808)

Full Attention: 2017的《Attention is All You Need》中的编码器-解码器结构实现中提出。它结构并不复杂，所以不难理解。
- ![](https://p26.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/612d7a3ac49c4847ac1702c5df8b9c25?from=pc)
左侧显示了 Scaled Dot-Product Attention 的机制。
- ![](https://p26.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/af533feb4f1044fe92cfae366b08accd?from=pc)

```python
class FullAttention(nn.Module):
  def __init__(self, mask_flag=True, factor=5, scale=None, attention_dropout=0.1, output_attention=False):
    super(FullAttention, self).__init__()
    self.scale = scale
    self.mask_flag = mask_flag
    self.output_attention = output_attention
    self.dropout = nn.Dropout(attention_dropout)

  def forward(self, queries, keys, values, attn_mask):
    B, L, H, E = queries.shape
    _, S, _, D = values.shape
    scale = self.scale or 1. / sqrt(E)
    scores = torch.einsum("blhe,bshe->bhls", queries, keys)
    if self.mask_flag:
    if attn_mask is None:
    attn_mask = TriangularCausalMask(B, L, device=queries.device)
    scores.masked_fill_(attn_mask.mask, -np.inf)
    A = self.dropout(torch.softmax(scale * scores, dim=-1))
    V = torch.einsum("bhls,bshd->blhd", A, values)
    if self.output_attention:
      return (V.contiguous(), A)
    else:
      return (V.contiguous(), None)
```

#### CV：人脸识别

问题：假设已经有了 1000 万个人脸向量，如何通过查询来找到新的人脸？

问题的关键是数据的索引方法

One Shot learning 来进行人脸识别的方法。
- 将每个人脸转换成一个**向量**
- 而新的人脸识别是寻找与输入人脸**最接近**(最相似)的向量。

通常，人们会使用 triplet loss 损失函数的深度学习模型来实现这一点。
- ![](https://p3.toutiaoimg.com/origin/pgc-image/561c354177b94db38839eb1dad8b8dab?from=pc)

然而，数据量大时，计算速度越来越慢；
- 每次识别中计算到 1000 万个向量的距离

在实向量空间上索引数据
- 将数据划分为便于查询新数据的结构(可能类似于**树结构**)。
- 当有新数据可用时，在树中进行查询有助于快速找到距离最近的向量。
- ![](https://p3.toutiaoimg.com/origin/pgc-image/32451f6ca67244b9ad193669da90800b?from=pc)

几种方法可以用于这种目的，比如
- Locality Sensitive Hashing—LSH 局部敏感哈希
- Approximate Nearest Neighbors 近似最近邻 — Annoy Indexing


### 开放问题

开放性问题：
- 对XX公司有什么了解，知道这个职位是做的吗？
- 对XX公司什么看法，看好还是看衰，对自己的职业规划
- 未来的打算，认为自己有什么优势劣势，做最成功和最失败的事情是什么

### 为什么离开上家公司

【2021-10-10】猎头：面试被问**短板是什么**、**为什么要离开上一家公司**，怎么办？
1. 建议坦诚但积极。本质上不是面试官想知道答案，而是想通过你的回答，看出你是一个什么样的人。而且，不少公司都会做背景调查，所以如果离职原因和真实的原因相差太远，那么在做背调时很难过关。回答起来确实是有些不舒服的，这是面试官在刻意施压，撇开具体的回答不说，光从回答问题的方式，就能看出如何化解压力，同时还可以了解是否有自知之明。
2. 如果回答扭扭捏捏，甚至被面试官看出来编造答案，那么十有八九很难通过的，所以要坦诚。但是，这些问题本身就是负面的，如果负面的回答出来，那面试结果也可想而知，所以你要用积极的话再说一遍。
3. 比如，面试中问有哪些短板。我自己在应聘一家企业的企业大学校长一职的时候就被CEO问过这个问题。根据刚才那个**坦诚但积极**的回答方式，回答：首先非常坦诚的说，自己在做执行的过程中，往往因为追求速度，而忽视细节。并且举一个真实的例子，在某个项目中，我因为决策速度太快，在一个执行细节上考虑不周全，结果险些造成损失。但是如果就这么回答，显然，对方是不会请一个这么急躁的人来做企业大学校长的。我接着说道：第一，通过复盘我意识到了，自己的确有决策时候太过追求效率的缺点。其次，现在自己养成了一个习惯，也就是每次在帮自己做决策时，必须要拿出，笔和纸，用金字塔原理，把问题拆解清楚，做到不重复不遗漏。所以像上次那样的决策失误，几乎就再也没有出现过。这就是积极，不但告诉了面试官如何在具体的某件事情上进步，而且我的学习能力快，这个优点，也符合企业大学的这个角色的要求。
4. 尤其是不要把一盆脏水全泼到上一家公司，对前东家大放阙词，这会给HR传递一个非常不好的信息，你是一个刺头。其实，正常来说，一个人的离职原因，HR们也心知肚明，要么就是钱没给够，要么就是发展不够顺。你可以更注重，对于应聘公司的仰慕出发，谈一谈这家公司，在你的职业发展目标中扮演什么样的角色。是因为这家公司吸引了你，而不是因为上一家公司耽误了你。

## Q&A

【2018-11-13】
### 问题：公司文化真的存在吗？

答：比如百度发邮件没写标题就请吃鸡翅，同事相互之间称同学，穿着越随意级别越高；阿里多是拜山头，老大一发话，大家撸起袖子拼命干，做好了一起荣华富贵，做差了，各自散伙儿，hr权利尤其大，对技术人员拥有一票否决权；腾讯，没呆过，不清楚

### 问：这种文化来源上级的灌输吗？

答：也许不是上级，但很可能是上级的上级，权利多大，影响力就多大，大到可以改变一个公司的文化，中国公司，乃至亚洲公司普遍服从权力，所谓官高一级压死人，这是皇权社会根深蒂固的影响，人治大于法制，这点逊于欧美公司，当然他们也有类似情形，只是程度不同

### 问：公司文化和个人兴趣哪个更重要？

答：这就是环境与个人的关系，不得不承认，人是渺小的，极易受环境影响，能出淤泥而不染的少之又少，更不用说改变环境的。如果文化与兴趣冲突，要么适应要么离开，不过别担心，大体上公司文化不太会与个人冲突，除了个别的条例，比如过度侵犯个人隐私，甚至过于扭曲的价值观

### 问题：知识图谱+公司选择

我在阿里iDST做过一段时间的知识图谱，也听过不少大拿的讲座，这个领域在电商上，大概就是各个商品的关系了，图谱方向五年前百度、搜狗就发力了，后来被深度学习盖过去了。kg其实是个持续半个世纪的老话题，语义网，本体，图谱，换汤不换药。Google在2000年左右就开始做了，长达8年，才有一个像样的图谱，据说准确率83%左右，看着很高，但还不能大规模商用，实际情形太复杂了，对图谱的要求很高，目前看开放领域图谱基本没有出路，垂直领域倒是可以试试，不过少不了一大堆脏活累活。图谱的未来是光明的，但道路是坎坷的，只是不知道渺小的个体能否熬到黎明的那一刻；这条路相对较窄，作为应届生，不建议刚开始就进入一条窄胡同
关于图谱方向，你可以看看鲍捷的系列文章；关于jd，我的感觉整体氛围偏传统风格，老气横秋，技术人员没有普通互联网公司那么阳光。具体有什么问题，你可以整理下，我找内部人员给你解答
面试时，遇到同道中人都会兴奋，酒逢知己千杯少，这种感觉很难碰到。个人的局限性一方面在于能力，另一面在于视野。选择大于努力。国内互联网格局上看，jd的发展受限于阿里和腾讯，只要阿里在，jd就是腾讯的马前卒，千年老二。如果是想做研究，不推荐上班，国外读博更好。企业研究院虽是研究，但有业务压力，不可能心无旁骛，所以像阿里iDST一样出现了既要学术成果，又要工程落地，还要商业变现的三不像，结果就是分分合合，不成大器。面试时聊的技术，实际应用中未必用，大多用来筛选、吓唬人的。工业届做的做法可能low到想吐。另外，DL领域，技术更新换代很快，这个时候的GAN，过五年十年就烟消云散了。
还是那个话题，个人与环境的关系，绝大部分人都是环境的影响者，只有极个别的聪明人和傻子能减少影响。比如绝顶聪明的天才elon musk，做了30年冷板凳的hinton，改变了环境；不过也有另一个极端，坚持下去越来越孤独，直至自我灭亡，遁入另一个世界。个人与潮流，重在借势。
如何做出科学的决策？不偏听，不盲从，多方求证，理性分析，最大程度的降低感性的影响。有人说，所谓的选择困难症，就是穷；我想说，那是因为信息不对称，另一种意义上的穷。


## IT英语

### 如何学机器学习？

【2022-4-9】作者：吴恩达, [链接](https://www.zhihu.com/question/266291909/answer/2429781356)

Do you want to become an AI professional? The key to machine learning mastery is to approach your learning systematically!  
- Machine learning is the science of making a computer perform work without explicit programming.  In the past decade, machine learning has enabled utilities such as **self-driving cars** 自动驾驶, **real-time speech recognition** 实时语音识别, efficient web search 网络搜索, and boosting our knowledge of the human genome 人类基因组. 
- Many researchers believe that machine learning promises the greatest possibility in realizing **human-level AI**. 
- Here, I‘d like to share **three steps** to learn machine learning in a systematic way: 
- First, you should learn **coding basics** 编程基础. 
- Second, you should study machine learning and deep learning. 
- Third, you should focus on the **role** you would like to have.  

Fundamental programming skills are a prerequisite for building machine learning systems. You will need to be able to write a simple computer program (function calls 函数调用, for loops 循环, conditional statements 条件语句, basic mathematical operations 基础数学操作) before you can start implementing preliminary machine learning algorithms. 

Knowing more math can give you an edge, but it won’t be necessary to spend much time on specific mathematical issues such as linear algebra, probability and statistics. 

Having gained some fundamental coding skills, you can officially begin your journey of machine learning. My Machine Learning course from Stanford University is a great choice. It provides a general introduction to **machine learning**, **data mining**, and the statistical approach of **pattern recognition**. The course will also help you to develop your practical understanding of how to use machine learning in the **real world**. For instance, when to use supervised learning, unsupervised learning, and machine learning.  The machine learning course draws insights from （洞察力） numerous case studies and applications. It is suitable for learning how to apply algorithms to a wide-variety of tasks, such as **intelligent robots** building (perception, control), natural language understanding NLU领域 (web search, anti-spam emails), **computer vision** (identifying diseases in medical imagery, finding defects in manufacturing), and much more. 

Deep learning is a subset 子集 of machine learning that is growing more important, and is worth your attention as well. It uses neural networks to make powerful predictions, and is the driving force behind many of today’s most exciting technologies. For example, self-driving cars, advanced web search, and face recognition all use deep learning. The Deep Learning Specialization, developed by DeepLearning.AI, covers the knowledge you need to build deep learning applications in fields such as computer vision, natural language processing, and speech recognition. You will conduct **case studies** 案例分析 in healthcare, **autonomous driving**, **sign language reading** 收拾语言理解, **music creation** 音乐创作, and natural language processing NLP领域, so you can familiarize yourself with the practical application of deep learning in various industries while mastering theoretical knowledge 理论知识 at the same time. 

Once you have learned the foundations of machine learning and deep learning, the next move depends on the role you have in mind. For example, do you want to be a **data scientist** 数据科学家,  **engineer** 工程师, or machine learning researcher? 研究院 Or, do you consider developing AI skills to complement your existing expertise? If so, you can learn AI as a way to better apply your expertise to real-world problems. 

After deciding the role, it's time to move on to real practice. You’ll want to get experience working on projects 项目经验 and as a part of a team 团队协作. Identifying viable 可行的 and valuable 有价值的 projects is an important skill, and it’s one that you’ll continue to develop throughout your career. The best way to start is to volunteer to help with other peoples’ projects. Eventually 最终 you will develop the confidence and experience to **lead your own** 独当一面. 

For completing a project, **teamwork** is more likely to succeed than **solo** effort 单打独斗. It is critical to have the ability to collaborate with others, give and take advice, as this helps you build connections. Teamwork also helps you build out your network of professional connections. You can call on people who you have worked with in the past to provide advice and support as you move through your career.  

The ultimate goal 终极目标, of course, is to find a job in machine learning. This will come after you have acquired both **theoretical knowledge** 理论知识 as well as **practical experience** 实际经验. When looking for a job, don’t be shy about reaching out to people you have met while taking courses or working on projects. You can also connect directly with professionals who are already working in the field. Many of them are happy to **act as your mentor**.  

Finding your first job, however, is a small step in a long-term career 职业生涯. It is important to cultivate **self-discipline** 自律 and commit to **constant learning** 持续学习. People around you may not be able to tell whether you spend your weekends studying or on your smartphone, but day by day, and year over year, it will make a difference. Discipline ensures that you move forward while staying healthy. 

I hope these suggestions could open the door to machine learning and help get you job-ready. The journey ahead will surely be a bumpy （ˈbʌmpi] 曲折的）one, but rest assured that what you encounter along the way will help you succeed. By the way, courses from DeepLearning.AI will be available on Zhihu soon. **Stay tuned** 敬请 and see you next time! Keep Learning! Andrew

## 简历


### 简历范例

【2022-5-7】[HR喜欢什么样的简历](https://www.toutiao.com/w/1732040255594510)

有工作经验的朋友，简历的内容要包含个人信息，求职意向，教育经历，工作经历(项目经历)、相关技能及自我介绍几个板块
1. `个人信息`: 别的不强调了，开始工作时间要写上，毕竟不少公司还是“越老越吃香”的，这样也方便判定从业年限。(在这个位置要标注下求职岗位以及到岗时间，【薪资部分】可写可不写)
2. `教育经历`: 工作以后，教育经历就没必要放在黄金位置了，除非背景特别好的，如果想罗列教育经历，只写专业排名以及和岗位沾边的专业课即可
3. `工作经历`: 三要素一定要有，工作**所属行业**、**岗位**及从业**起止时间**，要多展现数据，同一类型的工作内容只写【最优解】即可，往期的待遇可以标注，也给用人方一个参考范围(这部分可以对照着岗位的 JD去写，邀约率更高)
4. `项目经历`: 这个是加分项，经历过项目的朋友，对全局更加有把握，项目经历要遵从【**5W1H**】的原则，将项目的起止时间、个人角色以及取得怎样的结果说清楚
  - 5W1H：
5. `岗位技能`: 有证书是最好的，没证书的要要将工作内容进行拆解，拿新媒体运营岗位举例子，可以说具备内容编写、平台发布等技能
6. `自我评价`: 自我评价我建议可以放在黄金位置，通过对个人过往的总结，可以让用人方迅速了解到你的能力，减少筛选时间

![](https://p3.toutiaoimg.com/img/tos-cn-i-qvj2lq49k0/ccea536aac674d5e925fc0ca396a1099~tplv-obj:1080:1439.image?from=post)

# 算法入门

[没有企业项目经验怎么办？](http://ai.yanxishe.com/page/questionDetail/8455)

## 初学者的困惑

AI初学者不要过于迷信企业项目，忽略基本功的学习，不要mnist都没研究透彻就嫌简单，直奔难度更大的resnet，好高骛远，得不偿失，学东西请务必戒骄戒躁，一步一个脚印，才能越走越远。企业项目的事实跟你想象的大不一样。

## 真相：学术 vs 工业

- ①企业项目侧重工程实践，尤其重视数据闭环，从采集到入库（Hive+Storm+HBase），到模型训练（单机+分布式），到线上预估（qps，压测），到效果评估（ab test），再到业务报表和数据回流，整个过程里算法比重不到20%
- ②算法上越简单越好，如果能用LR就不会用神经网络，能用规则就不用模型，尤其注重风险可控性，学院派看来模型太low，然后一旦让学院派来做，却又无从下手，做出来的系统无法上线运行。工业界的算法往往滞后于学术界几年，一方面因为推广速度，另一方面，学术界的模型算法往往过于理想，停留在Demo阶段，对实际应用场景缺乏了解，很多paper上的方法其实行不通，一个paper导向，固定的实验集上取得好的效果就行，一个却是实打实的应用场景，必须可实施，二者截然不同。所以，千万不要眼高手低，把学院派的作风带到工作中，还埋怨企业算法low，多思考为什么
- ③结果导向，不管什么模型算法，最终谁带来的业务收益大谁就是赢家。这点很好理解，学校的项目大多没有实际应用，toy example，玩玩而已，出发点一开始就不是为了应用，而是所谓的“高大上”的算法，一到实际场景，发现各种漏洞，堵了一个又来一个，真烦。企业面向的是实际场景，有营收压力，解决问题是首要的
- ④系统思维，企业项目涉及的点非常多，一个部分没考虑到位就可能带来灾难性的后果，这些思维是学院派不具备的，一个完整的项目如果带到培训班里，学院估计会嫌蛮，讲那么多，大部分都是工程，只有一部分是算法，觉得没学到“干货”，大部分人认为的干货就是各种牛叉的算法模型，其它都不是。
总之，企业更加侧重工程能力，系统思维，结果导向，这些是培训不具备的。

【2022-4-29】人工智能：学术研究 Vs 工业研发

学术界研究 与 工业界研发
- **学术界**的研究更像**恋爱**中的男女
  - 每一点进步都让你们开心无比，同时还希望不停地有进步，达到新的高度看到的全是女孩好的一面
  - 你们可以自由地憧憬暫没人催你生孩子（产品）
  - 你们憧憬生一个小孩（产品）会多么美好认为孩子一定是世界上最聪明最乖巧的，因为反正不用真的把孩子生出来
- **工业界**研发更像**结婚**后的男女
  - 发现生娃（产品）成了你们最首要的任务，父母（公司老板）天天催着你生娃（产品）
  - 你们以为孩子生出来会很乖巧，可生出来后才发现一堆的问题，一堆的毛病，社会（用户）也不喜欢他／她
  - 你不停根据经验和用户反馈来进行调教最后孩子强大了，你也头白了，脊椎坏了，但看着孩子（产品）还是一脸的满足幸福

## 如何具备企业项目能力？

- ①实习，参与到企业项目中，慢慢体会，实际应用总是跟想象的不一样。大多数实习生做不了多少核心工作，大多打杂，提升工程能力
- ②精耕细作，找一个小项目，哪怕是mnist，想各种办法，不停的优化，尽可能提升泛化能力，黑白mnist玩腻了，换服装领域试试？换cfair-10试试？换web demo，实施手写识别试试？很多人容易犯的错就是，浅尝辄止，好高骛远，以为跑一边github的demo，就会深度学习了，too simple，sometimes naive！这种学习态度是不可能学会深度学习的
- ③多看多动手多做笔记，构建自己的知识体系。

## 算法工程师职业道路

### 算法工程师等级划分

【2017-5-23】北冥乘海生：[20万、50万、100万的算法工程师，到底有什么区别？](https://zhuanlan.zhihu.com/p/27072134)
- 进阶之路：入门级（**工具**） → 进阶级（**改造**） → 高级（**定义**）

- （1）入门级 "`Operating`"：会使用**工具** —— `调包党`、`调参侠`，<font color='red'>20w年薪</font>
  - 能力：熟悉常用模型，业务数据来了，能找到合适的模型
  - 问题：门槛越来越低
    - 以前会LDA、SVM，再玩过几次libnear、mahout等开源工具，就可以用数据跑个结果。
    - 深度学习时代，更简单：管它什么问题，不都是拿神经网络往上堆嘛！自以为跑通了Tensorflow的demo就会深度学习；
    - 任凭你十八般开源工具用的再熟，也不可能搞出个战胜柯洁的机器人来
    - `NFL` **没有免费午餐**定理：
      - 如果有两个模型搞一次多回合的比武，每个回合用的数据集不同，而且数据集没什么偏向性，那么最后的结果，十有八九是双方打平。
      - 管你是普通模型、文艺模型还是2B模型，谁也别瞧不起谁。
      - 考虑一种**极端**情况：有一个参赛模型是“随机猜测”，也就是无根据地胡乱给个答案，结果如何呢？对，还是打平！
      - 所以，请再也不要问“聚类用什么算法效果好”这样的傻问题了。
    - 实际问题的数据分布总是有一定特点. 比方说人脸识别，图中间怎么说都得有个大圆饼。因此，问“人脸识别用什么模型好”这样的问题，就有意义了。
    - 而算法工程师的真正价值，就是**洞察问题的数据先验特点**，把他们表达在模型中，而这个，就需要下一个层次的能力了。
- （2）进阶级 "`Optimization`"：能改造模型 —— <font color='red'>50w年薪</font>
  - 能力：根据具体问题的数据特点对模型进行改造，并采用相应合适的最优化算法，以追求最好的效果。
  - 不论前人的模型怎么美妙，都是基于**当时**观察到的数据先验特点设计的。
    - LDA是在语料质量不高的情况下，在PLSA基础上引入**贝叶斯估计**，以获得更加稳健的主题。
    - 虽说用LDA不会大错，但是要在具体问题上跑出最好的效果，根据数据特点做模型上的精准改造，是不可避免的。
    - 互联网数据更明显，百度的点击率模型，有数十亿的特征，大规模的定制计算集群，独特的深度神经网络结构，抄过来也没用。用教科书上的模型不变应万变，结果只能是刻舟求剑。
  - 两方面的素养：
    - 一、深入了解机器学习的**原理和组件**。
      - 正则化怎么做？什么时候应该选择什么样的基本分布？贝叶斯先验该怎么设？两个概率分布的距离怎么算？
      - ![](https://pic2.zhimg.com/80/v2-2e6654cb4bd3f7d8d8b344b8da088f59_720w.jpg)
    - 二、熟练掌握**最优化**方法。机器学习从业者不懂最优化，相当于武术家只会耍套路。
      - 最优化是机器学习最重要的基础
      - 目标函数及其导数的各种情形下，应该如何选择优化方法；各种方法的时间空间复杂度、收敛性如何；还要知道怎样构造目标函数，才便于用凸优化或其他框架来求解。
      - 早期，RNN由于“梯度消失”现象的存在，RNN很难对长程的上下文依赖建模。天才的J. Schmidhuber设计了带有门结构的LSTM模型，让数据自行决定哪些信息要保留，那些要忘掉。
  - 根据问题特点调整模型，并解决优化上的障碍，是一名合格的算法工程师应该追求的能力
- （3）高级 "`Objective`"：定义问题 —— <font color='red'>100w年薪</font>
  - 能力：针对某个实际问题，给出量化的目标函数；
  - 有明确的量化目标函数，正是科学方法区别于玄学方法、神学方法的重要标志。
  - 目标函数有时能用一个**解析**形式（Analytical form）写出来，有时则不能。
    - 网页搜索这个问题，有两种目标函数：一种是**nDCG**，这是一个在标注好的数据集上可以明确计算出来的指标；另一种则是人工看**badcase的比例**，显然这个没法用公式计算，但是其结果也是定量的，也可以作为目标函数。
  - 目标函数的定义没那么容易，在意识和技术上都有很高的门槛
    - 一、要建立“万般皆下品、唯有目标高”的意识。
      - 一个团队/项目只要确立了正确、可衡量的目标，那么达到这个目标就只是时间和成本的问题。假设nDCG是搜索的正确目标函数，那么微软也好、Yahoo!也好，迟早也能追上Google，遗憾的是，nDCG这个目标是有点儿问题的，所以后来这两家被越拉越远。
      - 一个项目开始时，总是应该先做两件事：
        - 一是讨论定义清楚量化的目标函数；
        - 二是搭建一个能够对目标函数做线上A/B测试的实验框架。
        - 而收集什么数据、采用什么模型，倒都在其次了。
    - 二、能够构造准确(信)、可解(达)、优雅(雅)的目标函数。
      - 目标函数要尽可能反应实际**业务目标**，同时又有可行的**优化**方法。一般来说，**优化目标**与**评测目标**是有所不同的。比如说在语音识别中，评测目标是“词错误率”，但这个不可导所以没法直接优化；因此，我们还要找一个“代理目标”，比如似然值或者后验概率，用于求解模型参数。评测目标的定义往往比较直觉，但是要把它转化成一个高度相关，又便于求解的优化目标，是需要相当的经验与功力的。在语音建模里，即便是计算似然值，也需要涉及Baum-Welch等比较复杂的算法，要定义清楚不是简单的事儿。
      - 优雅是更高层次的要求；遇到重大问题时，优雅却往往是不二法门。因为，往往只有漂亮的框架才更接近问题的本质。关于这点，必须要提一下近年来最让人醍醐灌顶的大作——生成对抗网络（GAN）。优雅得象个哲学问题，却又实实在在可以追寻。
  - 一个团队的定海神针，就是能把问题转化成目标函数的那个人——哪怕他连开源工具都不会用。

### 算法模型进阶经验

【2021-9-18】[数十位算法工程师的经验总结](https://www.toutiao.com/w/i1711154806904832/)

总结mm中对于算法工作的论述，虽然有调侃之意，但对于指导工作难道没有意义吗？
1. 从0到1，用**简单模型**；可解释性强，简单易实现，能快速验证思路，也有利于奠定后期的提升空间；（指标：78％）
2. 加强**特征工程**工作，特征离散化，特征交叉，新增特征等等。（指标：81％）
3. 换用经典的**高级模型**，如从LR到GBDT，再到DeepFM，DIN等等。（指标：85％）
4. **精细化**调整，分人群优化，针对badcase优化；（指标：85.5％）
5. **模型调参**，尝试各种前沿模型结构，调整数据采样方式，增加统计特征，清洗数据等等（85.6％）
6. 继续想各种**鬼点子**优化（85.66％）

- 运气好的话，赶上环比波动，赶紧上线总结（到底是不是模型带来的，就是玄学了，哈哈）；
- 运气不好的话，模型指标莫名其妙下跌，大家怎么应对呢？

### 算法工程师危机

[算法工程师危机](https://mp.weixin.qq.com/s?__biz=MzUzNzYxMzAxMA==&mid=2247484241&idx=1&sn=68cd7a36e67a2d057d1f62908c8ca277&chksm=fae504eccd928dfa975321ae8cf66a09528fe234291e06aba000fbdc78d47e92c25a7c133d6a&mpshare=1&scene=23&srcid=1120QSdMTsxIETt9bSx0UKgP#rd), [地址](https://www.cnblogs.com/buptzym/p/9790828.html)
- ![](https://pic1.zhimg.com/80/v2-badb5a43ca548e8817edde30c1b7abdc_720w.jpg)
- 讯飞AI同传语音造假的新闻刷爆科技圈，科大讯飞股价应声下跌3.89%（不是65.3%，标题党文章害死人）。 吃瓜群众纷纷感慨，有多少人工，就有多少智能。
- NIPS会议，人满为患，改改网络结构，弄个激活函数就想水一篇paper; 到处都是AI算法的培训广告，三个月，让你年薪45万！在西二旗或望京的地铁车厢里打个喷嚏，就能让10个算法工程师第二天因为感冒请假。
- 谁也不知道这波热潮还能持续多久，但笔者作为一线算法工程师，已经能明显感受到危机的味道：以大红大紫的图像为例，图像方向简历堆满了HR的办公台，连小学生都在搞单片机和计算机视觉。
- 人工智能部门正在从早前研究院性质的组织架构分别向**前台**和**后台**迁移：
  - 前者进入业务部门，背上繁重的KPI，与外部竞争者贴身肉搏；
  - 后者则完全融入基础架构，像数据库一样普通和平凡。
- 之前安逸的偏研究生活被打破， AI早已走下神坛。

算法工程师危机包含两部分：
- 一方面是来自**人的竞争**，大量便宜的毕业生和培训生涌入这个行业，人才缺口被迅速填满甚至饱和，未来的竞争会更激烈；
- 另一方面则是来自**机器的竞争**，大量算法工程师会很快被他们每天研究的算法所代替。 这两者互相恶化，AI人才市场终会变成一片红海。

- 工具和框架本身的发展，让设计模型所需的代码写得越来越简洁。10年前从头用C++和矩阵库实现梯度下降还是有不小的门槛的，动辄上千行。而当今几十行Keras甚至图形化的模型构建工具，让小学生都能设计出可用的二分类模型。
- **强大的类库吞噬了知识，掩盖了内部的复杂性**，但也给从业者带来了不小的**惰性**。从业者的技术水平，和使用模型的复杂程度关系不大，越是大牛，用的技术更底层更make sense。
- 深度学习本身的性质，造成了明显的数学鸿沟。与SVM, 决策树不同，由于模型存在大量的非线性和复杂的层次关系，且输入信号（例如图像，文本）也很复杂，因此严格的数学论证是需要极高的抽象技巧的。
- 只有凤毛棱角的专家，能深入到模型最深处，用数值分析和理论证明给出严谨的答案。 大部分人在入门后便进入漫长的平台期，美其名曰参数调优，实际就像太上老君炼丹一样。

AI学习曲线，左侧是稍显陡峭的入门期，需要学习基本的矩阵论，微积分和编程，之后便是漫长的平台期。 随着复杂性越来越高，其学习曲线也越来越陡峭，大部分人也就止步于此。 越来越易用的工具，让曲线左侧变得平坦，入门期变短，却并不能改变右侧的陡峭程度。
- ![](https://pic1.zhimg.com/80/v2-69f8c2c2824bab13472a1486becdf404_720w.jpg)

入门容易深入难，这条曲线同时也能描述AI人才的收入水平。而真正处于危机的，莫过于夹在中间的芸芸众人：对理论一知半解，对工具非常依赖。可替代性很强，一旦AI浪潮过去，就知道谁是在裸泳。

市场和业务变化越来越快，能有哪些核心业务，是能让工程师静心调个一年半载的呢？当一个从培训学校里出来的人都能做模型时，有多少业务能让公司多花两三倍的人力成本，而仅带来1%的性能提升呢？

算法岗比工程岗更容易被取代。 在现有技术下，由于业务需求的复杂性， 自动生成一套软件App或服务几乎不可能的（否则就已经进入强人工智能时代了），但模型太容易被形式化地定义了。根据数据性质，自动生成各个领域的端到端(end2end)的模型也逐渐在工业上可用了：图像语音和广告推荐的飞速发展，直接套用即可。理论和经验越来越完善，人变得越来越可替代。
- 以前需要大力气搭建的数据回流和预测的链路，已经成了公司的基础组件，数据工程师没事干了； 
- 特征可以自动生成和优选，特征工程师失业了；
- 深度网络采用经典结构即能满足一般业务需求，参数搜索在AutoML下变得越来越方便，调参工程师的饭碗也丢了 。
- 此处引用老板经常说的一句话：机器都能干了，要你干吗？

应用领域
- **广告/推荐**领域已经逐渐成熟，很多技巧沉淀为一整套方法论，已进入平台期；
- 下一个即将被攻陷的领域应该是**图像**；
- 而**文本**由于其内在的抽象性和模糊性，应该是算法工程师最后的一块净土，但这个门槛，五年内就会有爆发式的突破
  - 2018年谷歌BERT横扫11项NLP任务记录，麻蛋。

人工智能一定会更加两极化：偏基础的功能一般程序员就能搞定，像白开水一样普通。而针对更复杂模型甚至强人工智能的研究会成为少数人的专利。

传统意义的软件开发和产品设计，远比AI算法的需求来的多。算法永远是锦上添花，而非雪中送炭，再好的算法也拯救不了落后的业务和商业模式。一旦经济下行，企业首要干掉的就是锦上添花且人力成本较高的部分。

如果你是顶级的算法专家，这样的问题根本不需担心。但是，对大部分人来说，如何找到自己的梯度上升方向，实现最优的人生优化器呢？

一些不成熟的小建议，供读者抛砖引玉：
- 首先是**深入原理和底层**，类似TensorFlow的核心代码至少要读一遍吧？就算没有严格的理论基础，最起码也不能瞎搞啊。 切莫不能被工具带来的易用性迷惑双眼。要熟悉工具箱里每种函数的品性，对流动在模型里的数据有足够的嗅觉，在调参初期就能对不靠谱的参数快速剪枝。
- 其次，**工程能力不能丢**，太多做算法眼高手低的例子了：一个文件写所有，毫无架构和封装；遍地是临时方案和trick，前人挖坑后人栽；稳定性考虑不足，导致线上服务经常挂掉。 没有工程和架构的积累，在团队作战时可能还不是太大问题，单兵打天下则处处碰壁。
  - 按个人理解，做算法带来的最大收获是科学精神和实验思维，这是做工程很难培养出来的。以前看论文看了introduction和模型设计，草草地读一下实验结果就完事儿了。殊不知AB实验设计很可能才是论文的核心：实验样本是否无偏，实验设计是否严谨，核心效果是否合理，是否能证明论文结论。也许一行代码和一个参数的修改，背后是艰辛的思考和实验，做算法太需要严谨和缜密的思维了。即使未来不做算法，这些经验都会是非常宝贵的财富。
- 再者是尽早面向**领域**，面向**人**和**业务**。AI本身只是工具，它的抽象性并不能让其成为各个领域的灵丹妙药。 如果不能和AI专家在深度上竞争，就在业务领域专精深挖，拥有比业务人员更好的数据敏感度，成为跨界专家。现在已经有大量AI+金融， AI+医疗，AI+体育的成功案例。 人能熟悉领域背后的数据，背后的人性，这是机器短时间内无法代替的，跨界带来的组合爆炸，也许暗含着危机中的机会吧。

## 停止学习框架，专注基础知识

[停止学习框架，专注基础知识](https://ai.yanxishe.com/page/blogDetail/10548)
- 【2019-05-08】[Stop Learning Frameworks](https://sizovs.net/2018/12/17/stop-learning-frameworks/)

### 观点：直接学tensorflow、pytorch，别学数学+python了
- 我们每天学习编程语言、框架和库。我们知道的工具越新越好。但这一切都是在浪费时间！
- 时间是我们拥有的最宝贵的资源。时间是有限的，不可更新的，并且是你不能买到的。
- 科技就像时尚一样，它也在以光速变化。为了赶上时间的变化，我们需要跑得很快。这场比赛没有赢家，因为它没有终点。
> 技术变了又变，但它们都有共通性。正确地设置优先级：你需要把 80% 的时间花在基础学习上，然后剩下 20% 的时间留给框架，库和工具的学习

- 技术存在的时间越长，学习它就越安全。
- 不要急于学习新技术——它有很高的消亡概率。
- 时间是最好的导师，它会证明哪些技术值得学习，所以请学会等待。
- 十年过去了，我经历了 50 个不同的软件项目。感谢这些建议，我学到的所有东西都可以跨公司、团队、跨领域使用。今天，我所学的知识仍然有用。我没有浪费时间。
- 只有深入研究项目的本质，你才会发现它们都是相似的：
   - 编程语言是不同的，但设计是相似的。
   - 框架是不同的，但设计模式是可以通用的。
   - 开发者是不同的，但与人打交道的规则是统一的。
- 记住：框架、库和工具是会变化的。时间是宝贵的。
- 请将宝贵的时间花在可移植的技能上：
   - 微服务→框架进化体系结构
   - 新的编程语言→干净的代码，设计模式，DDD
   - 量少安全→精简编码原则
   - 高端→容错的模式
   - 容器→持续交付
   - Angular→网页、HTTP 和 REST

<font color="red">初学者要恶补的是基础知识，一口吃不了胖子，踏实点儿，知识体系完善了，才能在不同项目中游刃有余</font>

## 什么是优秀

【2021-8-12】

（1）我眼中的优秀：
- ① 理论基础，广度深度兼备，自圆其说，具备相对完整的知识体系，尤其是基础知识，sota技术半年一更新，但基础知识几十年不变
- ② 工程能力，linux，数据库，机器学习，web服务，编程语言等
- ③ 学习能力和好奇心，短时间内掌握某门技术，较强的领域迁移能力，同时不但探索未知，走出舒适区
- ④ 项目思维，业务理解，任务拆分，数据分析，使命必达。

我经常问候选人的一道题，生活中常见的暴恐识别，70%的人提到分类（未必分得清与回归的关系），50%的人分得清训练集/测试集/验证集，30%的人正确设置评估指标/知晓特征工程，20%的人意识到不均衡问题，10%知道模型部署/漂移，5%能转化到异常检测，1%随手用TensorFlow写出LR代码

（2）怎么在简历中证明？

技术博客/笔记，github项目和竞赛可以支撑①②，论文支持①，实习支持②③④；以上非必须，有更好，不过别“露馅”：技术博客/github几年不更新；论文也只是挂挂名，打打杂，核心亮点吱吱呜呜；实习项目说不清楚背景、目标、指标、技术链路、问题

（3）应届生/在校生如何准备？
- ① 找项目练手，全程参与，不一定非得实习（参考：https://www.yanxishe.com/questionDetail/8455），kaggle上任务多得是，还有优秀“答案”，比赛除了名次，更重要的是培养业务/项目思维，与高手过招，打通技术领域隔阂
- ② 从项目中提炼技术点，看书/博客深入研究、总结，沉淀出自己的笔记. 30-40%候选人能解释清楚项目中的技术点，但只有10%的人能说清楚为什么这么做
- ③ 代码练习，触类旁通；阿里校招时，有个985学霸说leetode刷了3-5遍，我变了下题目，跪了。

（4）应届生典型画像
- ① 沉迷各种sota算法，看不上数据挖掘/机器学习/架构，不停造demo，无法落地
- ② 视野狭窄，局限在某个小领域，工作后拿锤子找钉子
- ③ 业务思维不足，忽略数据背后的意义，导致数据敏感度不足，遇到业务问题一筹莫展
- ④ 迷茫，不知道学什么，该做什么，被动完成任务，没有主动思考项目/任务目标

（5）优秀的人不怕卷：同样是学习，有的人看几个月资料，过半年忘光光；有的人却能写本书



# End