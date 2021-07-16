---
layout: post
title:  "Linux开发技能"
date:   2016-06-25 23:35:00
categories: 编程语言
tags: Linux Shell Git yaml github
excerpt: Linux环境开发技能总结
mathjax: true
---
* content
{:toc}

- 汇总linux下开发知识

# Linux系统

- 良好的 Linux 素养会让你在日常的工作中如鱼得水，在命令行里体会流水般的畅快感。

![](https://raw.githubusercontent.com/woaielf/woaielf.github.io/master/_posts/Pic/1709/170915-1.png)
![](https://raw.githubusercontent.com/woaielf/woaielf.github.io/master/_posts/Pic/1709/170915-2.png)
![](https://raw.githubusercontent.com/woaielf/woaielf.github.io/master/_posts/Pic/1709/170915-3.png)

## 内核

- [漫画图解linux内核-原版](http://www.techug.com/post/carton-inside-the-linux-kernel.html)，[国内源](https://blog.csdn.net/passerbysrs/article/details/81604498)
- 解读一幅来自 TurnOff.us 的漫画 “[InSide The Linux Kernel](http://turnoff.us/geek/inside-the-linux-kernel/)[1]” 

![](https://static.oschina.net/uploads/space/2017/0206/122129_TqPO_12.jpeg)


## 文件

[图解 Linux 最常用命令](https://www.toutiao.com/a6756106065248518664/)

### linux的目录结构

[linux的目录结构](https://p3-tt.byteimg.com/origin/pgc-image/ab3bdd7224a14682a35e60fe1ee802cf?from=pc)

![](https://p3-tt.byteimg.com/origin/pgc-image/ab3bdd7224a14682a35e60fe1ee802cf?from=pc)

下级目录结构
- bin (binaries)存放二进制可执行文件
- sbin (super user binaries)存放二进制可执行文件，只有root才能访问
- etc (etcetera)存放系统配置文件
- usr (unix shared resources)用于存放共享的系统资源
- home 存放用户文件的根目录
- root 超级用户目录
- dev (devices)用于存放设备文件
- lib (library)存放跟文件系统中的程序运行所需要的共享库及内核模块
- mnt (mount)系统管理员安装临时文件系统的安装点
- boot 存放用于系统引导时使用的各种文件
- tmp (temporary)用于存放各种临时文件
- var (variable)用于存放运行时需要改变数据的文件

### 文件权限

![图解 Linux 最常用命令](https://p3-tt.byteimg.com/origin/pgc-image/61a15ef57bd4472e949236049ce0bdda?from=pc)

linux文件权限的描述格式解读
- r 可读权限，w可写权限，x可执行权限（也可以用二进制表示 111 110 100 --> 764）
- 第1位：文件类型（d 目录，- 普通文件，l 链接文件）
- 第2-4位：所属用户权限，用u（user）表示
- 第5-7位：所属组权限，用g（group）表示
- 第8-10位：其他用户权限，用o（other）表示
- 第2-10位：表示所有的权限，用a（all）表示

![](https://p6-tt.byteimg.com/origin/pgc-image/3000314a51c249cab168bc400dd7c5f3?from=pc)

### 文件操作命令

- [文件操作命令](https://p3-tt.byteimg.com/origin/pgc-image/6fe9b14521964698aad985d270cf6d9b?from=pc)
![](https://p3-tt.byteimg.com/origin/pgc-image/6fe9b14521964698aad985d270cf6d9b?from=pc)
![](https://p1-tt.byteimg.com/origin/pgc-image/dba5dffe4dcd446987f9b252f0b21c50?from=pc)
![](https://p1-tt.byteimg.com/origin/pgc-image/80d9bc3abcf34b3eb7efc9655698e6f6?from=pc)
- 文件压缩
  - .tar 使用tar命令压缩或解压
    - tar cvfz archive.tar.gz dir/
    - tar xvfz. archive.tar.gz
  - .bz2 使用bzip2命令操作
  - .gz 使用gzip命令操作
  - .zip 使用unzip命令解压
  - .rar 使用unrar命令解压
  - ![](https://p3-tt.byteimg.com/origin/pgc-image/0ffce7c93b324bed86a2e5dabdf92049?from=pc)

### 解压命令

如下：
- (1) *.tar 用 tar –xvf 解压
- (2) *.gz 用 gzip -d或者gunzip 解压
- (3) *.tar.gz和*.tgz 用 tar –xzf 解压
- (4) *.bz2 用 bzip2 -d或者用bunzip2 解压
- (5) *.tar.bz2用tar –xjf 解压
- (6) *.Z 用 uncompress 解压
- (7) *.tar.Z 用tar –xZf 解压
- (8) *.rar 用 unrar e解压
- (9) *.zip 用 unzip 解压
- (10) *.xz 用 xz -d 解压
- (11) *.tar.xz 用 tar -zJf 解压


## 常用命令

- [linux常用命令脑图](https://www.cnblogs.com/hzg110/p/6914963.html)

![](https://images2015.cnblogs.com/blog/31127/201705/31127-20170530141401383-1329040140.png)

- [linux命令汇总](https://www.toutiao.com/w/i1694976027465741/)
![](https://p6.toutiaoimg.com/img/tos-cn-i-0022/057f03b362234ad5a702ad00c5f9f797~tplv-obj:975:1280.image?from=post)

### 系统命令

- [系统常用命令](https://p6-tt.byteimg.com/origin/pgc-image/15e52c0fb24a444d99784798bbf6aba3?from=pc)
  - ![](https://p6-tt.byteimg.com/origin/pgc-image/15e52c0fb24a444d99784798bbf6aba3?from=pc)
  - ![](https://p1-tt.byteimg.com/origin/pgc-image/2107086df3244564a9ca41908b482da5?from=pc)
  - ![](https://p1-tt.byteimg.com/origin/pgc-image/300ef1e7824342afb93a24f988bd7151?from=pc)
- 快捷键
  - ![](https://p6-tt.byteimg.com/origin/pgc-image/4621e6095a834b078b0a6ced28ebf5cc?from=pc)

## linux工具

史上最全，[linux内核调试工具](https://www.toutiao.com/a1674325657904128)都在这里了，我们来看看：
1. 内存相关的：free, vmstate, slabtop
2. cpu相关的：top, ps, pidstat, mpstat
3. 块设备IO相关的：iostat, iotop, blktrace
4. 网络相关的：ping, tcpdump, traceroute, ip, nicstat, netstat
5. 系统调用相关的：strace, lstrace, sysdig, perf
6. linux内核调试和优化相关的：perf, dtrace, stap, lttng, ktap, sysdig

重点说一下perf，这个工具非常强大，可以说是做linux性能优化的首选工具，它可以：
1. 统计出你的程序是花在cpu计算上、还是IO上；
2. 统计出你的程序执行的时候经过了多少次进程切换。进程切换的多，说明系统的吞吐率较好，但是频繁的切换也会影响性能；
3. 统计出你的程序运行过程中的cache-misses的计数，我们知道cache-misses过多，则表示访问内存的性能不佳；
4. 统计出你的进程在运行过程中发生了多少次 CPU 迁移，即被调度器从一个 CPU 转移到另外一个 CPU 上运行；

这个工具简直就是做linux内核性能优化的”瑞士军刀“，有木有？

perf既然这么强大，那它的实现原理是什么呢？
- perf其实依赖的是内核里的Tracepoint。
- Tracepoint 是散落在内核源代码中的一些 hook，一旦使能，它们便可以在特定的代码被运行到时被触发，这一特性可以被各种 trace/debug 工具所使用。Perf 就是该特性的用户之一。假如您想知道在应用程序运行期间，内核内存管理模块的行为，便可以利用潜伏在 slab 分配器中的 tracepoint。当内核运行到这些 tracepoint 时，便会通知 perf。Perf 将 tracepoint 产生的事件记录下来，生成报告，通过分析这些报告，调优人员便可以了解程序运行时期内核的种种细节，对性能症状作出更准确的诊断。

总结：

![](https://p1-tt-ipv6.byteimg.com/img/tos-cn-i-0022/a75094f8b23645fdbc244851528c1c3b~tplv-obj:2664:1542.image?from=post)


- nl的功能和cat -n一样，同样是从第一行输出全部内容，并且把行号显示出来
- more的功能是将文件从第一行开始，根据输出窗口的大小，适当的输出文件内容。当一页无法全部输出时，可以用“回车键”向下翻行，用“空格键”向下翻页。退出查看页面，请按“q”键。另外，more还可以配合管道符“|”（pipe）使用，例如:ls -al | more
- less的功能和more相似，但是使用more无法向前翻页，只能向后翻。less可以使用【pageup】和【pagedown】键进行前翻页和后翻页，这样看起来更方便。
- cat的功能是将文件从第一行开始连续的将内容输出在屏幕上。当文件大，行数比较多时，屏幕无法全部容下时，只能看到一部分内容。所以通常使用重定向的方式，输出满足指定格式的内容
  - cat语法：cat [-n]  文件名 （-n ： 显示时，连行号一起输出）
- tac的功能是将文件从最后一行开始倒过来将内容数据输出到屏幕上。我们可以发现，tac实际上是cat反过来写。这个命令不常用。
  - tac语法：tac 文件名。

### tcpdump常用命令

- 用简单的话来定义tcpdump，就是：dump the traffic on a network，根据使用者的定义对网络上的数据包进行截获的包分析工具。 tcpdump可以将网络中传送的数据包的“头”完全截获下来提供分析。它支持针对网络层、协议、主机、网络或端口的过滤，并提供and、or、not等逻辑语句来帮助你去掉无用的信息。

实用命令实例，
```shell
#将某端口收发的数据包保存到文件
sudo tcpdump -i any port 端口 -w 文件名.cap
# 打印请求到屏幕<br>
sudo tcpdump -i any port 端口 -Xnlps0
# 默认启动
tcpdump
# 普通情况下，直接启动tcpdump将监视第一个网络接口上所有流过的数据包。
#监视指定网络接口的数据包
tcpdump -i eth1
#如果不指定网卡，默认tcpdump只会监视第一个网络接口，一般是eth0，下面的例子都没有指定网络接口。
```

## 任务管理

### crontab使用

- [Linux定时任务Crontab命令详解](https://www.cnblogs.com/intval/p/5763929.html)，[crontab在线测试](https://tool.lu/crontab/)
- 通过crontab 命令，我们可以在固定的间隔时间执行指定的系统指令或 shell script脚本。时间间隔的单位可以是分钟、小时、日、月、周及以上的任意组合。这个命令非常设合周期性的日志分析或数据备份等工作。
- 命令参数：
  - -u user：用来设定某个用户的crontab服务，例如，“-u ixdba”表示设定ixdba用户的crontab服务，此参数一般有root用户来运行。
  - file：file是命令文件的名字,表示将file做为crontab的任务列表文件并载入crontab。如果在命令行中没有指定这个文件，crontab命令将接受标准输入（键盘）上键入的命令，并将它们载入crontab。
  - -e：编辑某个用户的crontab文件内容。如果不指定用户，则表示编辑当前用户的crontab文件。
  - -l：显示某个用户的crontab文件内容，如果不指定用户，则表示显示当前用户的crontab文件内容。
  - -r：从/var/spool/cron目录中删除某个用户的crontab文件，如果不指定用户，则默认删除当前用户的crontab文件。
  - -i：在删除用户的crontab文件时给确认提示。

```shell
#安装crontab：
yum install crontabs
#服务操作说明：
/sbin/service crond start # 启动服务
/sbin/service crond stop # 关闭服务
/sbin/service crond restart # 重启服务
/sbin/service crond reload # 重新载入配置
/sbin/service crond status # 启动服务
# 查看
crontab [-u user] file
crontab [-u user] [ -e | -l | -r ] # l显示，e编辑
# 看日志
tail -n 2 /var/log/cron

# 更新系统时间
ntpdate time.windows.com

```

- 每一行都代表一项任务，每行的每个字段代表一项设置，它的格式共分为六个字段，前五段是时间设定段，第六段是要执行的命令段，格式如下：
   - minute hour day month week command
      - minute： 表示分钟，可以是从0到59之间的任何整数。
      - hour：表示小时，可以是从0到23之间的任何整数。
      - day：表示日期，可以是从1到31之间的任何整数。
      - month：表示月份，可以是从1到12之间的任何整数。
      - week：表示星期几，可以是从0到7之间的任何整数，这里的0或7代表星期日。
      - command：要执行的命令，可以是系统命令，也可以是自己编写的脚本文件。
   - ![](https://images2015.cnblogs.com/blog/513841/201608/513841-20160812102124078-171184924.png)
- 示例

```shell
* * * * * cd /home/work/code/training_platform/web && python t.py
```




# Shell语言

## Shell知识点

在 Linux 的基础上再度深入学习 Shell，可以极大的减少重复工作的压力。毕竟批量处理才是工作的常态呢~

![](https://raw.githubusercontent.com/woaielf/woaielf.github.io/master/_posts/Pic/1709/170920-1.png)
![](https://raw.githubusercontent.com/woaielf/woaielf.github.io/master/_posts/Pic/1709/170920-2.png)
![](https://raw.githubusercontent.com/woaielf/woaielf.github.io/master/_posts/Pic/1709/170920-3.png)

## 常规语法

### 数组

- 代码：

```shell
string="hello,shell,split,test" 
#将,替换为空格 
array=(${string//,/ })  # 空格区分，用()转数组
array=(`echo $string | tr ',' ' '` ) # 方法2

for var in ${array[@]}
do
   echo $var
done 
```

### 字符串

- 特殊的字符串处理方法

```shell
url="http://c.biancheng.net/index.html"
echo ${url#*/}    #结果为 /c.biancheng.net/index.html
echo ${url##*/}   #结果为 index.html
str="---aa+++aa@@@"
echo ${str#*aa}   #结果为 +++aa@@@
echo ${str##*aa}  #结果为 @@@
echo ${url%/*}  #结果为 http://c.biancheng.net
echo ${url%%/*}  #结果为 http:
str="---aa+++aa@@@"
echo ${str%aa*}  #结果为 ---aa+++
echo ${str%%aa*}  #结果为 ---
```

### 彩色日志

- 代码

```shell
【2018-10-12】
# 彩色文字设置
Color_Off="[0m" # Text Reset
# Bold High Intensty
BIBlack="[1;90m" # Black
BIRed="[1;91m" # Red
BIGreen="[1;92m" # Green
BIYellow="[1;93m" # Yellow
BIBlue="[1;94m" # Blue
BIPurple="[1;95m" # Purple
BICyan="[1;96m" # Cyan
BIWhite="[1;97m" # White
 
echo ${BRed} "===开始检测===!" ${Color_Off}
function log(){
    [ $# -eq 0 ]&& { echo "date [`"+%Y-%m-%d %H:%M:%S"`] 请输入要打印的日志！";exit 1; }
    [ $# -eq 1 ]&& { level="INFO";log_info=$1; }
    [ $# -gt 1 ]&& { level=$1;log_info=$2; }
    #echo "[`"+%Y-%m-%d %H:%M:%S"`] [$level] $log_info"
    cur_color="$BIWhite"
    case $level in
        "INFO") cur_color="$BIWhite";;
        "WARNING") cur_color="$BIYellow";;
        "ERROR") cur_color="$BIPurple";;
        "FETAL") cur_color="$BIRed";;
        *) cur_color="$BIWhite";;
    esac
    echo ${cur_color} "[`date "+%Y-%m-%d %H:%M:%S"`] [$level] $log_info" ${Color_Off}
}
```
## 文本处理

- grep 、sed、awk被称为linux中的"三剑客"。
   - grep 更适合单纯的查找或匹配文本
   - sed 更适合编辑匹配到的文本
   - awk 更适合格式化文本，对文本进行较复杂格式处理

## 编码转换

- 【2021-6-4】linux下转换文件编码格式，命令：

```shell
# 从gbk转utf8
iconv -f gbk -t utf8 pattern_0603.txt -o pattern.txt
# 上面命令失败的用下面
iconv -f gbk -t utf8 pattern_0603.txt > pattern.txt
```

## awk

- awk是逐行处理的，逐行处理的意思就是说，当awk处理一个文本时，会一行一行进行处理，处理完当前行，再处理下一行，awk默认以"换行符"为标记，识别每一行，也就是说，awk跟我们人类一样，每次遇到"回车换行"，就认为是当前行的结束，新的一行的开始，awk会按照用户指定的分割符去分割当前行，如果没有指定分割符，默认使用空格作为分隔符。

### 多路输出

- 代码：
```shell
【2019-06-04】awk多路输出： 
head data_ivr_20190401_20190430.txt | awk -F'\t' '{if($2~/01:/){print $0>>"tmp_a.txt"}else{print $0>>"tmp_b.txt"}}'
head data_ivr_20190401_20190430.txt | awk -F'\t' 'BEGIN{a="tmp_a.txt";b="tmp_b.txt";system(">"a";>"b);}{if($2~/01:/){print $0>>a}else{print $0>>b}}'
# 文件分流示例
train_file='a.txt'
test_file='b.txt'
[ -e $train_file ] && > $train_file;
[ -e $test_file ] && > $test_file;
less error.txt | awk -v a=$train_file -v b=$test_file 'BEGIN {srand();OFS="\t";N=20} {r=int(rand()*N); if(r%N==1)print $0>>a; else{print $0>>b}}'
less error.txt | awk 'BEGIN {srand();OFS="\t"} {print $0,rand()*1000}' |sort -k2nr -k5n|awk 'BEGIN {OFS="\t"} {print}'
```


## sed


## grep


# 数学公式编辑

## Latex

- [LaTeX快速入门：一文浅谈TeX排版语法](https://blog.csdn.net/qingdujun/article/details/80805613)
- 行内公式：是$a^2+b^2=c^2$行内公式
- 单行公式：勾股定理$$3^2+4^2=5^2$$其中
- 求和：$$\sum_{i=1}^{n}i=\frac{n(n+1)}{2}$$
- 极限：$$\lim_{x\rightarrow{\infty}}(1+\frac{1}{x})^{x}=e$$
- 积分：$$\int_{a}^{b}f(x)dx=F(b)-F(a)$$
- 求导：$$\frac{\partial f(x)}{\partial x}=x^2$$
- 多行公式：
\begin{eqnarray}
x+y = z\\a=4
\end{eqnarray}
- 矩阵
\begin{array}{ccc}
 a_{11} &  a_{12} & a_{13}   \\
  a_{21}&  a_{22} & a_{23}  \\
  a_{31}&  a_{32} & a_{33}  
\end{array}
- 状态图


# Git使用

- [图解Git命令](https://www.bbsmax.com/A/kmzLrMwG5G/)
- [牛逼哄哄的 Git 命令动画演示，一看就懂！](https://www.cnblogs.com/lzkwin/p/12658029.html)，[CS Visualized: Useful Git Commands](https://links.jianshu.com/go?to=https%3A%2F%2Fdev.to%2Flydiahallie%2Fcs-visualized-useful-git-commands-37p1)
![](https://tukuimg.bdstatic.com/scrop/80a43c9d8428273cc9cabe71256eb9ef.gif)

- 【2021-2-10】用vscode在线查看github代码库，方法：加1s即可，详见：[github1s](https://github.com/conwnet/github1s)
- github新功能，在线编辑IDE，[codespace](https://github.com/features/codespaces)


## 基本概念

- Git有四个工作区域：
  - **工作目录**（Working Directory）
  - **暂存区**(Stage/Index)
  - **资源库**(Repository或Git Directory)
  - **git仓库**(Remote Directory)。
- ![](https://bbsmax.ikafan.com/static/L3Byb3h5L2h0dHAvd3d3LnJ1YW55aWZlbmcuY29tL2Jsb2dpbWcvYXNzZXQvMjAxNS9iZzIwMTUxMjA5MDEucG5n.jpg)
- [Git快速入门](https://www.cnblogs.com/polk6/p/git-introduce.html)
   - ![](https://images2017.cnblogs.com/blog/153475/201710/153475-20171013183602293-822234036.png)
- 文件的四种状态
  - **Untracked**:未跟踪, 此文件在文件夹中, 但并没有加入到git库, 不参与版本控制. 通过git add 状态变为Staged.
  - **Staged**:暂存状态. 执行git commit则将修改同步到库中, 这时库中的文件和本地文件又变为一致, 文件为Unmodify状态. 执行git reset HEAD filename取消暂存,文件状态为Modified;
  - **Mosified**:文件已修改, 仅仅是修改, 并没有进行其他的操作.
  - **Committed**: 文件已提交修改；
- [Git文件状态流程图](https://blog.csdn.net/leyangjun/article/details/52540590)
   - ![](https://img-blog.csdn.net/20160918100329572?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)
- .git的目录结构：进入隐藏的 .git 目录之后可以看到如上图所示结构
  - 核心文件： config，objects，HEAD，index，refs 这 5 个文件夹

## 项目中如何选择分支模式

- 【2021-3-26】[Git原理及如何选择分支模式](https://www.toutiao.com/a6858060508738945547/)
- 在项目开发的过程中，选择一个合适的分支模式来管理代码至为重要，那么如何根据这身的业务特点和团队规模来选择合适的分支模式呢？这部分将对几种主流的Git分支模式进行介绍，下边将介绍`TBD`（**主干开发**模式）、**Git-Flow**模式、**Github-Flow**和**Gitlab-Flow**模式。
- 分支总结: 根据每个项目的实际情况的不同选择不同的分支模式：
1. git-flow模式对于开发周期长的项目是比较好的选择，可以很好解决新功能开发，版本发布，线上问题修复等问题；
2. 如项目发布周期短，需持续发布维护，功能较为简单，TBD和GitHub-flow是个不错的选择；
3. 如果对一些复杂功能的上线前增加一些验证，可选gitlab-flow模式。

还有一些其他的分支策略，比如定义一个主干分支，然后每个成员已自己名字命名的开发分支等等，结合我们的业务需求选择分支策略最为重要。

【2021-5-11】[Google 和腾讯为什么都采用主干开发模式？](https://www.toutiao.com/i6960592771484779046/), 《Google 工程效能三板斧之三：主干开发》
软件业界常用的软件分支模式有多种，但本质上可以分为两类：
- **主干**开发模式（Trunk Based Development）
  - 开发人员直接向主干（习惯上主干分支通常为：trunk 或 master）提交 / 推送代码。通常，开发团队的成员 1 天至少 1 次地将代码提交到主干分支。在到达发布条件时，从主干拉出发布分支（通常为 release），用于发布。若发现缺陷，直接在主干上修复，并根据需要 cherry pick 到对应版本的发布分支。
- **特性分支**开发模式（Feature Branch Development）
  - 为一个或多个特定的需求 / 缺陷 / 任务创建代码分支（branch），在其上完成相应的开发（一般经过增量测试）后，把它合并（merge）到主干 / 集成分支的开发模式。
  - 如：Git-Flow 模式、Github-Flow 模式和 Gitlab-Flow 模式等。这些模式只有细节上的差异

### Google谷歌

互联网巨头 Google 大部分业务开发都采用主干开发模式，国内巨头腾讯也在推行主干开发（试点业务团队大部分已经采用）。

他们采用主干开发的原因在于对主干开发的优点有强烈诉求，而且有能力和资源弥补其缺点：
- 都是互联网企业，竞争激烈，因此对迭代速度要求高；
- 基础架构能力强：都能自研强大的持续集成平台，Google 有自研的 Forge，腾讯有自研的蓝盾；
- 自动化测试能力强：都推行 TDD，强调开发负责质量，减少甚至取消手工测试人员（少量必要的手工测试转外包），自动化测试覆盖率高；
- 都有严格的 CR 机制确保代码质量：Google 极其严苛的可读性认证（Readability）在业界已经是标杆，腾讯是国内少有正在采用类似实践的互联网企业。严格的代码可读性认证和根据此标准执行的严格代码评审制度，能有效的保证合入主干的代码质量不会降低。

主干开发的最大优点是：效率和质量，而这 2 者是软件和互联网企业的核心诉求。主干开发的缺点，巨头有能力和资源来填平这些坑。

因此，从 ROI（Ratio of Investment）的角度来看，Google 和腾讯采用主干开发实属必然。

Google 的工程效能（也叫研发效能）核心理念只有简单的 3 条：
- 使用单体代码仓库（参考：Google 工程效能三板斧之一：单体代码仓库）
- 使用 Bazel 构建（参考：Google 工程效能三板斧之二：使用 Bazel 构建）
- 主干开发；

为了保证主干代码的质量，避免出现工程师合入到主干的代码 break 掉主干的情况，Google 采取了以下实践：
- 代码合入事件触发通过持续集成，确保合入到主干的代码经过充分且必要测试；
- 通过 Bazel 实现相关代码（指依赖变更代码的代码）的精准测试；
- 至少 2 个合资格的 reviewer （代码评审人）的 LGTM（Look Good To Me），才允许代码合入主干；
- 合资格的 reviewer 都是在 Google 内部通过 Readability （代码可读性）认证的员工；

### 腾讯在主干开发的实践

腾讯某 BG 在 2018 年开始的“930 变革”后，在各试点团队推动主干开发（注：并未全公司普遍采用），具体的举措包括：
- 以度量牵引：通过对特性分支）的生命期监控和预警，实现非主干分支的生命期缩短，倒逼开发团队采用主干开发；
- 投大力气统一 BG 内的持续集成工具、开发自动化测试平台；
- 制定了 7 大编程语言的编码规范，并自研代码静态扫描工具；
- 并参考 Google 推行代码可读性（Readability）、可测试性（Testability）认证制度；
- 强力推行 CR （代码评审）制度，确保代码的可读性（命名、代码风格、设计、复杂度）。

效果：
- 质量提升：代码质量从可测量的维度得到明显提升（代码规范率、单元测试覆盖率）；
- 迭代速度提升：试点团队的迭代周期从 4 周或 2 周提升至 1 周；
- 代码从“私有”变“公有”：通过代码评审制度，提高了代码可读性，使代码从个人拥有（只有写代码的人能看懂），变成团队拥有（整个团队都能看懂）；这一点对于企业非常重要，接手过别人代码的程序们都有感受；
- 代码的自动化测试覆盖率提升明显，为未来的重构构筑了一张安全网；

### 中小企业

有些中小企业的技术决策者非常认可持续集成 / 持续交付的理念，从而更希望采用主干开发，但对于主干开发的缺点（或说弥补缺点的成本）存在顾虑。

对此，我有如下建议：
- 基础架构要求：可以考虑采用开源软件，如持续集成采用 Jenkins、Travis CI、Gitlab CI 等，通过简单部署可以投入使用；同时配合代码静态分析工具（如 SonarQube、CheckStyle），确保代码基本质量过关；
- 自动化测试要求：工具上不存在障碍，现代编程语言（如 java、go、c++）都有内建或第三方的单元测试框架；难点只在于成员的开发习惯，可以通过测试覆盖率工具，以增量覆盖率指标保证新增代码都有完备的自动化测试，从而逐步改变团队的研发文化；
- 代码评审要求：开源的 Git 服务器（如 Gitlab）基本都支持 push hook，配合开源的 Gerrit 等 CR 工具，可以实现在代码推送（push）或 pull request（合入请求）时触发 1 个代码评审请求，实现评审通过后，代码才正式合入的功能；剩下的就是研发文化问题了，需要在团队内部推行代码规范、代码可读性等宣导和教育工作；
- 发布时的特性开关：如果要求不高，可以通过代码 hard code 一个常量作为特性开关；如果要求高，也有开源的特性开关（比如：unleash、piranha、flipper）工具可供选择。参考上述建议，并充分认识到主干开发的成本和困难的情况下，中小企业开发团队也并非不可以考虑主干开发的实践


### TBD(主干开发模式)

- TBD，即**主干开发模式**，所有的开发都在一个开发分支上进行协作开发，只保留一条长期稳定的开发分支，不允许新建任何长期存在的开发分支，任何代码的变更都更新到主干分支上，当需要发布时，建议根据版本号拉一个release分支进行发布，可以通过merge或者cherry pick将代码弄到发布分支上。
- ![](https://p3-tt.byteimg.com/origin/pgc-image/9469e92a4b7b40ff969a7ca093db91aa?from=pc)

TBD模式注意点：
1. 因为所有的改动及变更都在主干分支上，所以确保改动足够小，每次的改动都是可控的，能段时间完成验证；
2. 每次主干分支上的改动能得到快速验证，有完善的团队协作及自动化测试，随时做好上线的准备，避免引主干上的功能缺陷而影响发布。

因为主干开发要求每次变更提交都要小，并且要快速验证完，保证主干是处在可发布状态。对于一些处在开发过程中的特性，如每次变更提交，并非意味着完整特性的完成，为了隔离“特性半成品”对主干的影响，一般会采用特性开关（Feature Toggle）的方式进行隔离。即频繁的代码变更提交，可以先做集成及验证，但是在发布的角度，通过（Feature Toggle）先隐藏相关特性，只有当特性都完成之后，才打开开关，特性完全透出。

TBD模式优点：
1. 分支少，合并冲突小，实践简单；
2. 适合持续交付及部署，简单密集需求交付

TBD模式缺点：
1. 对团队协作及成熟度合集成测试有很高的要求；
2. 不适合开发一些持续时间长的需求及功能复杂的业务；

### Git-Flow模式

- 随着敏捷开发的广泛使用，越来越多的团队协作完成某一特性或者分别完成不用的用户故事，根据不同的特性或者用户故事来创建开发分支就应运而生。最有代表性的就是Git-Flow模式。
- Git-Flow 模式很好解决了不同特性之间并行开发需要的工作方式。每一个特性都能同时开工，结合敏捷开发的例子，每个迭代开始时从主干分支拉出一个特性分支，命名结构参考feature/xxx-232，所有关于此特性的开发都在此分支上进行，当开发完成后把特性分支合并回主干分支上，测试通过后进行发布。

Git原理及如何选择分支模式
![](https://p3-tt.byteimg.com/origin/pgc-image/02fd057c7eed4e6ba7abaded26e5401e?from=pc)

Git-Flow模式一般有以下分支结构：
- feature分支：开发者进行特性功能开发的分支；
- develop分支：开发主干分支，包含所有的特性功能；
- release分支：版本发布分支；
- master分支：稳定分支，保存最新的已发布代码；
- hotfix分支：线上问题缺陷修复分支；

工作流程：
- 在开发者接到一个开发需求时，从develop分支拉一个feature分支进行开发，最好已ID进行命名，避免重复，为了减少后边合入develop的冲突，最好在开始coding前把develop分支合到feature分支上再进行开发；
- 当在feature分支完成开发并验证通过后，将feature分支合入develop分支；
- develop分支用于集成功能验证，当集成测试成功后将基于develop分支拉一个release版本分支进行发布，如果在release上测试发现bug则在release上修复，之后将代码合入develop，当上线完成后将release合入master分支进行最新上线代码保存；
- 如果线上发现bug,则基于master拉一条hotfix分支进行修复，修复完成后将hotfix分支合入master进行发布，最后将hotfix代码也同步到develop上。

注意：对一些已完成的feature分支及hotfix分支进行及时删除。

【2021-4-20】[Git Flow工作流](https://p1.pstatp.com/large/pgc-image/676bee8ded6140ddba8f5d8cb13a90bf)

![](https://p1.pstatp.com/large/pgc-image/676bee8ded6140ddba8f5d8cb13a90bf)

Git-Flow模式的优点
1. 特性并行开发，效率高，代码独立；
2. 支持复杂业务、大团队协同开发；
3. 支持多版本发布；

Git-Flow模式的缺点
1. 分支多，合并冲突较为频繁
2. 需要进行维护分支，对分支代码进行更新

### Github-Flow 模式

- Github-Flow就是简化版的Git-Flow，更轻量，减少分支。对于 GitHub-Flow 来说，发布应该是持续地，当一个版本准备好，它就可以被部署，feature跟hotfix本质上都是一样的，都属于特性分支，并移除了release分支。
![](https://p6-tt.byteimg.com/origin/pgc-image/62bfda1a1e4049ae8e583ccae319ba97?from=pc)

分支情况如下：
- 在master分支上的代码都是最新的，可部署的；
- 在特性分支合到master分支时需要发起Pull Request代码评审，评审后方可合入master；
- 在master上进行持续版本发布。

优点：
1. 支持并行开发；
2. 分支结构简单，有明确的规则定义，持续集成持续部署

缺点：
1. 对测试要求高，一些功能复杂的需求需要持续长的时间验证或者中断则影响整个计划；
2. 不能很好的处理一些很紧急的上线需求；

### Gitlab-Flow模式

GitLab-Flow 相比于 GitHub-Flow 来说，在开发侧的区别不大，只是将 pull request 改成了 merge request，而 merge request 的用法与 pull request 类似，都可以做为代码评审、获取反馈意见的一种沟通方式。

最大的区别体现在发布侧，即引入了对应生产环境的 production 分支和对应预发环境的 pre-production 分支（如果有预发环境的话）。这样，master 分支反映的是部署在集成环境上的代码，pre-production 分支反映的是部署在预发环境的代码，production 分支反映的最新部署在生产环境的代码。

当一个特性开发完成，提交 merge request，将特性开发的代码合并到 master，并部署到集成环境进行验证；当验证通过之后，提交 merge reqeust，合并 master 到 pre-production 分支，并部署到预发环境，进行预发环境上验证；当预发环境验证成功之后，再提交 merge request，将 pre-production 分支上的代码合并到 production 分支上。

![](https://p6-tt.byteimg.com/origin/pgc-image/c4cc0d7b45c24ce38aaa19513d893113?from=pc)


## 常用命令

- [阮一峰的常用git命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
- 常用命令如下：

```shell
#下载一个项目
git clone [url]
git clone --recursive [url] # 【2021-5-7】用于循环克隆git子项目(包含别的仓库代码), 一次性解决模块依赖
# git clone 中途报错（early EOF），进入主目录，补充执行以下命令
git submodule update --init --recursive 

#添加所有你修改的文件到暂存区
git add -A
#把本地的备注提交到暂存区
git commit -m"[message]对你修改过代码一个备注"
#常用：
git  pull orgin master # 将本地master拉取到远程仓库origin的master分支
# 拉取远程仓库，并与本地仓库的代码合并
git pull [remote]  [branch]
git  pull orgin master # 将本地master拉取到远程仓库origin的master分支
# 上传本地指定分支到远程仓库
git push [remote] [branch]
git push origin master # pull大致同理
git push –all [variable name] # 将所有分支推送到你的远程存储库。
git push [variable name] : [branch name] # 删除远程存储库上的分支
# 查看变更信息或者冲突
git status
# 查看提交的历史
git log 
# 撤销本地修改
#没有commit到暂存仓库的情况下：
# 恢复之前上一次暂存区的所有文件到工作区
git branch # 查看本地分支
git branch dev #创建分支dev
git checkout dev #切换到分支dev
git branch -r # 查看所有远程分支
git branch -a # 查看存储库的所有当前分支，包括本地和远程分支。
git branch -a --merged # 合并到当前分支的所有分支
git checkout -b dev # 创建并切换到分支dev
git branch -d dev # 删除分支
git branch -D branch_2 # 删除本地分支，即使尚未合并，这也会删除该分支！
git push origin dev #提交后，别人才能看到分支
git checkout -- myfile #从本地仓库恢复文件（用于撤销本地修改）

git checkout 
git checkout 分支名称 # 切换分支

git stash save # 临时存储所有已修改的跟踪文件
git stash pop # 恢复最近存放的文件。
git stash list # 列出所有隐藏的变更集。
git stash drop # 将丢弃最近存放的变更集。
git stash apply # 恢复工作现场
git stash apply stash@{0} # 恢复指定的工作现场，当你保存了不只一份工作现场时

git merge 分支名称 # 合并分支
git tag [commitID] # 用于将标签赋予指定的提交。
#或者恢复暂存区的指定的某个文件到本地工作区
git checkout [file]
# 在commit之后撤销修改的情况下：
# 重置到上一次暂存区版本
git reset --hard [版本号]
# 或者不管的情况下直接重新修改代码再commit一次
# 或者通过使用git log查看版本号后回退到暂存区的某个版本
git reset [版本号]

# 【2020-9-8】 
git reset [file] # 取消暂存文件，但保留文件内容
git reset [commit] # 在指定的提交后撤消所有提交，并在本地保留更改。
git reset --soft 19462f6f46cf4cbc211d366359afac0c17a7c190
git reset –hard [commit] # 将丢弃所有历史记录，并返回到指定的提交
# 注意 --hard 参数会抛弃当前工作区的修改
# 使用 --soft 参数的话会回退到之前的版本，但是保留当前工作区的修改，可以重新提交
git push  --forced # 远程推送的话
git remote add [variable name] [Remote Server Link] # 将本地存储库连接到远程服务器。
# 更新master → release分支的操作步骤
git branch release # 创建release分支，用于上线
git checkout release # 切换到release分支
git merge master -m '合并到release分支' # 合并master到本地
git push origin release # 同步到远程分支
# 撤销merge操作
git revert 【方法二撤销merge时提交的commit的版本号，这里是88edd6d】
git revert -m 【要撤销的那条merge线的编号，从1开始计算（怎么看哪条线是几啊？）】 【merge前的版本号】

# 【2020-8-21】
git config --list 
git config -l # 查看已有配置列表
git config -e # 直接编辑配置信息
git config --global user.email "输入你的邮箱" # 设置变量
git config --global user.name "输入你的用户名"
git config --global --replace-all user.email "输入你的邮箱" # 覆盖已有变量
git config --global --replace-all user.name "输入你的用户名"
git config   --global --unset  user.name # 取消命名

# 生成公钥
ssh-keygen -t rsa

# [2020-9-1]
git log # 查看历史提交信息
git log –follow [file] # 列出了文件的版本历史记录，包括文件的重命名。
# git对比分支代码
git log dev ^master # dev 有， master没有
git log master ^dev # master有，而dev没有
git log master..dev # dev比 master 中多提交了哪些内容
git log dev..master # master 比 dev 多提交了什么
git log dev...master # 仅仅查看有什么不一样
git log --left-right dev...master # 每次提交都在哪个分支上
# 注意 commit 后面的箭头，根据我们在 –left-right dev…master 的顺序，左箭头 < 表示是 dev 的，右箭头 > 表示是 master的。
git log --pretty=oneline # 精简模式：单行
# 设置别名
alias gitp='git log --pretty=oneline' # 单行模式
alias gitg="git log --graph --pretty=format:'%Cred%h%Creset -%C(yellow)%d%Creset %s %Cgreen(%cr) %C(bold blue)<%an>%Creset' --abbrev-commit" # 图模式
git config --global alias.s status # git别名 git s
git show [commit] # 显示指定提交的元数据和内容更改。

# 【2020-9-10】git免密pull/push，以下命令自动保存密码
git config --global credential.helper store

git diff # 此命令显示尚未暂存的文件差异
git diff –staged # 此命令显示暂存区域中的文件与当前最新版本之间的差异
git diff [first branch] [second branch] # 两个分支之间的差异

git rm [file] # 从你的工作目录中删除文件，然后进行删除。

# 【2021-5-21】----------- 第三方库 --------------
# 直接把第三方的版本库合并到自己的库中. 示例如下：
git clone https://git.oschina.net/gaofeifps/body.git # 主库
cd body
git submodule add https://git.oschina.net/gaofeifps/leg.git # 添加第三方库
git status # 多了一个 leg的库, 和一个.gitmodules的文件, 现在提交一下
git commit -am "add leg"
git push
# 版本库中不会存第三方引入库的实体文件, 而是通过 .gitmodules的方式存储三方的联系方式, 当下载到本地运行的时候才会再拉取文件
# 而且这个时候在其他的地方安装body这个库的时候直接运行 git clone 是生成不了完整的文件的, 缺少了 leg库的文件
# 因为这个时候的 body/leg目录是空的需要多走一步, 这时为什么呢? 
git clone https://git.oschina.net/gaofeifps/body.git
git submodule init && git submodule update
#下面这一句的效果和上面三条命令的效果是一样的,多加了个参数  `--recursive`
git clone https://git.oschina.net/gaofeifps/body.git --recursive # 获取完整库
git submodule foreach git checkout master # 批量更新所有第三方库，按照 .gitmodules会根据path寻找所有的三方模块, 并在每一个模块中都执行 foreach 后的命令
git submodule deinit <submodule-name> # 删除第三方库
# 作者：guanguans，https://www.jianshu.com/p/e27a978ddb88
# ----------------------------------

# 查看某个文件谁改过代码
git blame filename
```

- [Git对比两个分支](https://www.cnblogs.com/mkl34367803/p/9196563.html)
- [Git Clone克隆仓库速度太慢怎么办？](https://zhuanlan.zhihu.com/p/144016106)
  - 修改Hosts：分别解析http://ithub.global.ssl.fastly.net和http://github.com网站的ip地址，加入host中；mac刷新host文件，sudo killall -HUP mDNSResponder
  - 使用码云：
    - (1) 使用git clone git@gitee.com:Evllis/novice.git克隆仓库到本地
  - cgit（git换cgit）
    - 安装：git clone https://github.com/killf/cgit.git && sudo ./cgit/install.sh
    - 使用：cgit clone https://github.com/killf/cgit.git （亲测有效）

【2021-4-1】[git思维导图](https://p6.toutiaoimg.com/img/tos-cn-i-0022/c661edf2db1e41ef97ff21347c8ca89a~tplv-obj:1674:4096.image?from=post)

![](https://p6.toutiaoimg.com/img/tos-cn-i-0022/c661edf2db1e41ef97ff21347c8ca89a~tplv-obj:1674:4096.image?from=post)

【2021-6-7】git大文件管理，[Git LFS操作指南](https://zzz.buzz/zh/2016/04/19/the-guide-to-git-lfs/)
- Git LFS（Large File Storage, 大文件存储）是可以把音乐、图片、视频等指定的任意文件存在 Git 仓库之外，而在 Git 仓库中用一个占用空间 1KB 不到的文本指针来代替的小工具。通过把大文件存储在 Git 仓库之外，可以减小 Git 仓库本身的体积，使克隆 Git 仓库的速度加快，也使得 Git 不会因为仓库中充满大文件而损失性能。
- 使用 Git LFS，在默认情况下，只有当前签出的 commit 下的 LFS 对象的当前版本会被下载。此外，我们也可以做配置，只取由 Git LFS 管理的某些特定文件的实际内容，而对于其他由 Git LFS 管理的文件则只保留文件指针，从而节省带宽，加快克隆仓库的速度；也可以配置一次获取大文件的最近版本，从而能方便地检查大文件的近期变动。详见后文进阶使用

## git问题

###  OpenSSL SSL_read

- 现象：windows下git pull，出错：

> fatal: unable to access 'https://github.com/wqw547243068/wqw547243068.github.io.git/': OpenSSL SSL_read: Connection was reset, errno 10054

- 解决方法
  - 参考[解法](http://www.9lyp.com/article/info/details/id/76)，有多种原因，如文件名或路径太长
  - git config --global core.longpaths true

### 443

- 执行git push，错误提示：

> fatal: unable to access 'https://github.com/wqw547243068/wqw547243068.github.io.git/': Failed to connect to github.com port 443: Timed out

- 解法
  - Internet与网络的设置，有代理导致，需要勾选：自动检测设置，[详见](https://blog.csdn.net/yy339452689/article/details/104040279)

### 速度慢

- [解决github 打开、拉取、推送速度慢的问题](https://blog.csdn.net/natahew/article/details/81387885)

## github问题

- 【2021-3-18】github访问受限，速度慢, 知乎专题：[github打开慢？无法访问？](https://zhuanlan.zhihu.com/p/356790236)
  - （1）修改 HOSTS 文件进行加速，手动把cdn和ip地址绑定
    - 第一步：获取 github 的 global.ssl.fastly 地址访问：http://github.global.ssl.fastly.net.ipaddress.com/#ipinfo 获取cdn和ip域名，得到：199.232.69.194 https://github.global.ssl.fastly.net
    - 第二步：获取github.com地址， 访问：https://github.com.ipaddress.com/#ipinfo 获取cdn和ip，得到：140.82.114.4 http://github.com
    - 第三步：修改 host 文件映射上面查找到的 IP
      - windows系统：1、修改C:\Windows\System32\drivers\etc\hosts文件的权限，指定可写入：右击->hosts->属性->安全->编辑->点击Users->在Users的权限“写入”后面打勾。然后点击确定。
      - 2、右击->hosts->打开方式->选定记事本（或者你喜欢的编辑器）->在末尾处添加以下内容：199.232.69.194 github.global.ssl.fastly.net 和 140.82.114.4 github.com
    - 附：DNS[查询工具](https://myssl.com/dns_check.html)或[IPaddress](https://www.ipaddress.com/)，[switchhost](https://oldj.github.io/SwitchHosts/#cn)管理hosts文件
  - （2）Gitee中转fork仓库，如[码云](https://gitee.com/)，导入github项目即可，web编辑，还能**同步到github**，[示例项目](https://gitee.com/wqw547243068)
  - （3）[GitHub镜像源](https://www.zhihu.com/question/38192507?sort=created)，克隆版的 GitHub，你可以访问上面的镜像网站，网站的内容跟 GitHub 是完整同步的镜像, 如网站: [fastgit](https://hub.fastgit.org/),[cnpmjs](https://github.com.cnpmjs.org),
  - （4）仅查看代码：github.com → github1s.com，就能按照vs code模式查看代码
- Github 加速下载
  - 只需要复制当前 GitHub 地址粘贴到输入框中就可以代理加速下载！[地址](http://toolwa.com/github/)
  - GitHub raw 加速：GitHub raw 域名并非 github.com 而是 raw.githubusercontent.com，上方的 GitHub 加速如果不能加速这个域名，那么可以使用 Static CDN 提供的反代服务。将 raw.githubusercontent.com 替换为 raw.staticdn.net 即可加速。
  - 进入指定网站([zhlh6](https://github.zhlh6.cn)或[toolwa](http://toolwa.com/github/))，输入 Github 仓库地址，使用生成的地址进行 git ssh 等操作
  - 谷歌浏览器GitHub加速[插件](https://chrome.google.com/webstore/detail/mfnkflidjnladnkldfonnaicljppahpg): 
    - 链接: https://pan.baidu.com/s/1u_lBrU4S8jG5KCu2gscsTQ 
    - 提取码: i21n
  - gitclone缓存加速[网站](https://gitclone.com/)
- 参考：[github镜像加速](https://blog.csdn.net/guoxinian/article/details/108874469)
- github与gitee同步
  - 终端下同时连接github和gitee，设置方法：vim ~/.git/config

```yaml
[remote "origin"]
	url = https://gitee.com/wqw547243068/wqw547243068.github.io.git
   url = https://github.com/wqw547243068/wqw547243068.github.io.git
	fetch = +refs/heads/*:refs/remotes/origin/*
```     



## 交互式学习

- [可视化学习Git](http://marklodato.github.io/visual-git-guide/index-en.html)
- [交互式学习Git](https://learngitbranching.js.org/)

![](https://user-images.githubusercontent.com/7308241/39848730-040bd09e-53df-11e8-964e-2d48f35a4355.gif)

# 本文编辑器

- [主流文本编辑器学习曲线](https://coolshell.cn/articles/3125.html)
- 几个经典的文本编辑器的学习曲线，不排除其中有调侃和幽默的味道

## 终端

- 【2021-5-15】Next Terminal 是一款开源的远程登录工具，需要自己部署，可以在任何一个浏览器远程访问Windows/Linux/macOS系统，方便快捷。Next Terminal 基于 Apache Guacamole 开发，使用到了guacd 服务。在线[DEMO](https://next-terminal.typesafe.cn/)，即开即用,（用户名/密码 test/test），打开后就能看到后台了
- 具体功能如下：
  - 授权凭证管理（密码、密钥）
  - 资产管理（支持RDP、SSH、VNC、TELNET 协议）
  - 指令管理（预设命令行）
  - 批量执行命令
  - 在线会话管理（监控、强制断开）
  - 离线会话管理（查看录屏）
  - 双因素认证
  - 多用户登录
  - 资产授权
  - 用户分组
  - ![](https://img3.appinn.net/images/202101/vnc.jpg)
  - [Next Terminal – 用浏览器访问远程桌面，支持 RDP、SSH、VNC 和 Telnet](https://www.appinn.com/next-terminal/)
- 【2021-5-10】[terminus](https://eugeny.github.io/terminus/)，[下载地址](https://github.com/Eugeny/terminus/releases/tag/v1.0.138)
![](https://gitee.com/mirrors/terminus/raw/master/docs/readme.png)

- 【2020-9-1】[tmux](https://www.ruanyifeng.com/blog/2019/10/tmux.html)
- Tmux 就是会话与窗口的"解绑"工具，将它们彻底分离。
  - （1）它允许在单个窗口中，同时访问多个会话。这对于同时运行多个命令行程序很有用。
  - （2） 它可以让新窗口"接入"已经存在的会话。
  - （3）它允许每个会话有多个连接窗口，因此可以多人实时共享会话。
  - （4）它还支持窗口任意的垂直和水平拆分。

- 【2020-9-2】[Linux：在终端中查看图片和电影](https://blog.csdn.net/weixin_34072159/article/details/92473531)
   - 安装工具(cacaview)：yum install caca-utils -y
   - 查看图片：cacaview test.jpg
   - 按d改变图片配色
   - ![](https://static.xjh.me/wp-content/uploads/2017/11/www.xjh.me-2017-11-04_17-18-14_961742-2.png)


## Vim技能

- vi / vim是Linux上最常用的文本编辑器而且功能非常强大。只有命令，没有菜单，下图表示vi命令的各种模式的切换图。
  - ![](https://p3-tt.byteimg.com/origin/pgc-image/89e2d5d5a06e40d498f169c6bfde54fb?from=pc)
- 【2019-07-18】编辑器学习曲线:
   - ![](https://github.com/wqw547243068/wangqiwen/blob/master/other/figure/mmexport1563449034348.jpg?raw=true)
- [如何使用VIM搭建IDE？](http://harttle.com/2015/11/04/vim-ide.html),[vim键盘图大全](http://www.cnblogs.com/yu-lang/p/5413279.html),[所见即所得，像IDE一样使用vim](https://github.com/yangyangwithgnu/use_vim_as_ide)，![VIM键盘图](http://harttle.com/assets/img/blog/vim-key.png)
- ![vim命令图解](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1513414506184&di=5592bf051e8a3b337830632ac037b1c0&imgtype=jpg&src=http%3A%2F%2Fimg4.imgtn.bdimg.com%2Fit%2Fu%3D3339508074%2C1265491893%26fm%3D214%26gp%3D0.jpg)
- [台湾人总结的vim命令图解（pdf打印版）](http://img.my.csdn.net/uploads/201211/24/1353759337_6781.png)
- 【2017-12-14】[awk思维导图](http://s1.51cto.com/wyfs02/M01/7D/18/wKiom1bf0R6wMA_sABZGEQxE4yg982.png)，[sed思维导图](http://scc.qibebt.cas.cn/docs/linux/script/sed%CB%BC%CE%AC%B5%BC%CD%BC.jpg),[更多linux工具总结](http://scc.qibebt.cas.cn/docs/doc-main.php?dir=linux)
- pacvim，[vim学习游戏](https://linux.cn/article-9738-1.html)
   - 命令：git clone https://github.com/jmoon018/PacVim.git
   - ![](https://img.linux.net.cn/data/attachment/album/201806/12/104234m10a8uuhxh08kxx5.png)

### vim主题

- 【2021-1-12】vim配色，[大全](http://vimcolors.com/)
- 设置类似sublime的主题包：[vim-monokai](https://github.com/sickill/vim-monokai)
   - ![](https://camo.githubusercontent.com/b7d019bb849ebced5559fbde94e152f72b86855e07ab302c7ee27890f503674c/68747470733a2f2f692e696d6775722e636f6d2f4e5058324d584d2e706e67)


```shell
# 下载sublime主题
git clone https://github.com/sickill/vim-monokai.git
# 创建主题目录
mkdir -p ~/.vim/colors
# 复制主题
cp vim-monokai/colors/monokai.vim ~/.vim/colors
# 设置vim主题, ~/.vimrc
syntax enable
colorscheme monokai
```

- 完整版主题设置

```python
set encoding=utf-8
set fileencoding=utf-8
set fileencodings=ucs-bom,utf-8,chinese,cp936
set guifont=Consolas:h15
language messages zh_CN.utf-8
" set lines=45 columns=100 # 这行不能加，否则按O进入编辑状态时，视觉错位
set number
set autoindent
set smartindent
set tabstop=4
set autochdir

set shiftwidth=4
set foldmethod=manual

syntax enable
colorscheme monokai
set nocompatible
set nobackup
```

### vim技巧

|命令|说明|备注|
|---|---|---|
|:s/searchStr/replaceStr/g	|替换当前行中的所有 searchStr 到 replaceStr||
|:s/searchStr/replaceStr/	|替换当前行中的第一个 searchStr 到 replaceStr||
|:%s/searchStr/replaceStr/	|替换每一行中的第一个 searchStr 到 replaceStr||
|:%s/searchStr/replaceStr/g	|替换每一行中的每一个 searchStr 到 replaceStr||
|h、j、k、l	|左下上右||
|i	|插入||
|A	|从末尾开始编辑||
|w / e|	下一个单词开头 / 结尾||
|b	|上一个单词||
|u	|撤消操作||
|x	|删除当前字符||
|H M L	|屏幕的上 / 中 / 下||

- 积累常见问题解决方法
1. vim粘贴多行文本时，编辑器自动换行，格式乱
   - 解决：粘贴前，使用命令：set paste即可, 如果想恢复自动换行，set nopaste
1. 待定

# jupyter notebook

- Jupyther notebook ,也就是一般说的 Ipython notebook，是一个可以把代码、图像、注释、公式和作图集于一处，从而实现可读性分析的一种灵活的工具。 
- 默认情况下，Jupyter Notebook 使用Python内核，这就是为什么它原名 IPython Notebook。Jupyter notebook是Jupyter项目的产物——Jupyter这个名字是它要服务的三种语言的缩写：Julia，Python和R，这个名字与“木星（jupiter）”谐音。

## 安装

- 安装：
```shell
pip install jupyter
```
- 速度慢？设置清华源：
```shell
pip config set global.index-url https://pypi.tuna.tsinghua.edu.cn/simple
```


## 自定义主题

- 代码：

```shell
# 安装扩展插件
pip install jupyter_contrib_nbextensions
jupyter contrib nbextension install --user
pip install jupyter_nbextensions_configurator
jupyter nbextensions_configurator enable --user
#重启jupyter

# 安装jupyter主题包
pip install jupyterthemes
#更新主题
pip install --upgrade jupyterthemes 
# 启用主题
jt -t grade3 -f fira -fs 13 -cellw 90% -ofs 11 -dfs 11 -T 
# 启动jupyter服务

```

## 远程访问

- 【2017-12-18】参考：[远程访问Jupyter Notebook](http://www.cnblogs.com/zhanglianbo/p/6109939.html)

详细步骤如下：
- 查看服务端ip：ifconfig \| grep "inet " \| grep -v 127.0.0.1，如ip=10.97.182.142
- 生成配置文件：
  - 服务端：jupyter notebook --generate-config
- 打开ipython，生成密码：
  - 服务端终端输入：ipython
  - 继续输入：
    - from notebook.auth import passwd;passwd() # python2
    - from IPython.lib import passwd;passwd() # python3
  - 输入访问密码
  - 复制生成的密文：'sha:ce.....',
- 修改配置文件
  - vim ~/.jupyter/jupyter_notebook_config.py
  - 更新如下参数：
    - c.NotebookApp.ip='*' # 就是设置所有ip皆可访问
    - c.NotebookApp.password = u'sha:ce...刚才复制的那个密文'
    - c.NotebookApp.open_browser = False # 禁止自动打开浏览器
    - c.NotebookApp.port =8888 #随便指定一个端口
- 启动服务端jupyter
  - 执行：jupyter notebook --ip=10.84.154.79 # ip可以省略
  - 扔后台：nohup jupyter notebook --ip=10.84.154.79 &
- 客户端访问：http://10.97.182.142:8888/tree
  - 初次需要账户登录，输入设置过的访问密码
- 注：请及时替换ip
  - jupyter notebook --no-browser --port 6000 --ip=192.168.1.103
- [2018-1-4]如果依赖python虚拟环境(virtualenv)，需要先激活再启动notebook
  - source ~/wqw/bin/activate
  - nohup jupyter notebook --ip=`ifconfig eth | awk '/inet/{print $2}'` &>log.txt &


## 显示图片

- 【2020-8-4】两种方法，代码如下：
```python
img_file = 'fsm.png'
# （1）pillow包
from PIL import Image
Image.open(img_file)
# （2）Ipython包
from IPython.display import Image
Image(img_file)
```

# java

- 【2021-1-20】
- 安装：先装[java](https://www.oracle.com/java/technologies/javase-jdk15-downloads.html), open JDK[清华源下载](https://mirror.tuna.tsinghua.edu.cn/AdoptOpenJDK/15/jdk/x64/linux/)
- 配置环境变量：vim /etc/profile
   - export JAVA_HOME=/usr/local/src/jdk1.8.0_171 （根据自己的完整路径修改）
   - export PATH=$PATH:$JAVA_HOME/bin:$JAVA_HOME/jre/bin:$PATH
   - export CLASSPATH=.:$JAVA_HOME/lib:$JAVA_HOME/jre/lib
- 查看版本：java -version


# python开发环境

- [Cython中def,cdef,cpdef的区别](https://www.cnblogs.com/lidyan/p/7474244.html)
   - cpdef 函数让Cython产生一个 cdef 函数（使得从Cython进行快速的函数调用）和一个 def 函数（使得我们可以从Pyhton调用）。就允许的变量类型而言，cpdef 函数具有 cdef 和 def 函数的限制。

## python编译安装

- 代码如下：

```shell
# 下载python3
src_file='https://www.python.org/ftp/python/3.8.3/Python-3.8.3.tgz'
file_name="${src_file##*/}"
install_dir=~/bin

[ -e ${file_name} ]||{
        wget ${src_file}
        echo "下载完毕..."
}&& echo "文件已存在, $file_name"
# 解压
tar zxvf ${file_name}
echo "安装目录: $install_dir"
# 安装
new_dir=${file_name%.*}
cd $new_dir
./configure --prefix=${install_dir}/python38
# 如果不设置安装目录prefix, 就会提示sudo权限
make && make install
echo "安装完毕，请设置环境变量"

# 设置环境变量
#vim ~/.bash_profile
echo "
alias python3='${install_dir}/python38/bin/python3.8'
alias pip3='${install_dir}/python38/bin/pip3'
" >> ~/.bash_profile

echo '生效'
source ~/.bash_profile

echo '检测'
python3 -c "print('hello world!')"
pip3 list

```



# Linux工具

## 日期

- 【2020-9-21】时间矫正

```shell
 sudo ntpdate cn.pool.ntp.org # 矫正系统时间
 ```

## 文件传输

- 【2017-12-16】远程文件传输的几种方式：
   - secureCRT、ftpxp客户端
   - scp命令
   - rsync命令
   - ftp、http服务
      - 【2018-1-4】python搭建简易web服务，可以下载文件
         - 服务端：python -m SimpleHTTPServer 8088
         - 客户端浏览器：http://uemc-train-srv00.gz01:8088/
         - 参考：[三种Shell脚本编程中避免SFTP输入密码的方法](http://blog.csdn.net/hereiskxm/article/details/7861759)
   - sftp服务
   - szrz命令
   - nc命令
      - Linux网络工具中的“瑞士军刀”盛誉的netcat,能通过TCP和UDP在网络中读写数据
      - (1) 检测端口是否可用：
         - nc -v www.thanks.live 80
      - （2）文件传输
         - 接收端：nc -l 9995 > tmp
         - 发送端：nc 10.200.0.79 9995 < send_file
         - 注：
            - 端口范围(1024,65535)
            - 发送、接收顺序不限
            - 传输目录
               - 接收端：nc -l 9995 \| tar xfvz -
               - 发送端：tar cfz - * \| nc 10.0.1.162 9995
      - （3）聊天功能
         - 类似文件传输操作步骤，去掉文件定向（<>）即可
         - A：nc -l 9995
         - B：nc 10.200.0.79 9995
      - （4）telnet服务器（远程登录）
         - 服务端：nc -l -p 9995 -e bash
         - 客户端：nc 10.200.0.79 9995
   - samba

## 自动登录

- [2018-3-26]自动登录鲁班测试机
- 方法一：

```shell
#参考expect用法
passwd="***"
expect -c "
        spawn ssh user@host -p 8022
    expect {
        \"*assword:\" {send \"$passwd\r\"; exp_continue }
    }
"
```
- 方法二：
   - login.sh内容：

```shell
#!/usr/bin/expect -f
set host luban@10.84.176.174
set port 8022
set pwd M95B8RBR
 
spawn ssh "$host" -p $port
set timeout 30
expect "password:"
send "$pwd\r"
interact
```
   - 执行：expect login.sh
   - 自动登录, ~/.bash_profile里配置别名即可一直使用
   - alias luban='expect ~/login.sh'


# ADB

【2021-6-23】[Android 调试桥 (adb)](https://developer.android.google.cn/studio/command-line/adb)

Android 调试桥 (adb) 是一种功能多样的命令行工具，可让您与设备进行通信。adb 命令可用于执行各种设备操作（例如安装和调试应用），并提供对 Unix shell（可用来在设备上运行各种命令）的访问权限。它是一种客户端-服务器程序，包括以下三个组件：
- 客户端：用于发送命令。客户端在开发计算机上运行。您可以通过发出 adb 命令从命令行终端调用客户端。
- 守护程序 (adbd)：用于在设备上运行命令。守护程序在每个设备上作为后台进程运行。
- 服务器：用于管理客户端与守护程序之间的通信。服务器在开发机器上作为后台进程运行。

adb 包含在 Android SDK 平台工具软件包中。您可以使用 SDK 管理器下载此软件包，该管理器会将其安装在 android_sdk/platform-tools/ 下。或者，如果您需要独立的 Android SDK 平台工具软件包，也可以点击此处进行下载。


# 小项目

## python健康打卡

- 【2020-7-9】[python实现网页自动健康打卡以及腾讯文档打卡](https://blog.csdn.net/rglkt/article/details/105351363)



