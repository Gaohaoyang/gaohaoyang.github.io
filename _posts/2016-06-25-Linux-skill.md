---
layout: post
title:  "Linux开发技能"
date:   2016-06-25 23:35:00
categories: 编程语言
tags: Linux Shell Git YAML
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

## 常用命令

- [linux常用命令脑图](https://www.cnblogs.com/hzg110/p/6914963.html)

![](https://images2015.cnblogs.com/blog/31127/201705/31127-20170530141401383-1329040140.png)

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


## 任务管理

### contab使用

- [Linux定时任务Crontab命令详解](https://www.cnblogs.com/intval/p/5763929.html)，[crontab在线测试](https://tool.lu/crontab/)

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

## 基本概念

- ![](https://bbsmax.ikafan.com/static/L3Byb3h5L2h0dHAvd3d3LnJ1YW55aWZlbmcuY29tL2Jsb2dpbWcvYXNzZXQvMjAxNS9iZzIwMTUxMjA5MDEucG5n.jpg)
- [Git快速入门](https://www.cnblogs.com/polk6/p/git-introduce.html)
   - ![](https://images2017.cnblogs.com/blog/153475/201710/153475-20171013183602293-822234036.png)
- [Git文件状态流程图](https://blog.csdn.net/leyangjun/article/details/52540590)
   - ![](https://img-blog.csdn.net/20160918100329572?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)

## 常用命令

- [阮一峰的常用git命令清单](http://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html)
- 常用命令如下：

```shell
#下载一个项目
git clone [url]
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
# 查看变更信息或者冲突
git status
# 查看提交的历史
git log
# 撤销本地修改
#没有commit到暂存仓库的情况下：
# 恢复之前上一次暂存区的所有文件到工作区
git branch #查看分支
git branch dev #创建分支
git checkout dev #切换到分支dev
git branch -r # 查看所有远程分支
git branch -a # 查看存储库的所有当前分支，包括本地和远程分支。
git branch -a --merged # 合并到当前分支的所有分支
git checkout -b dev #创建并切换到分支dev
git branch -d dev #删除分支
git branch -D branch_2 # 删除本地分支，即使尚未合并，这也会删除该分支！
git push origin dev #提交后，别人才能看到分支
git checkout -- myfile #从本地仓库恢复文件（用于撤销本地修改）

git checkout 
git checkout 分支名称 # 切换分支

git branch # 查看分支
git branch -a # 所有分支
git branch -r # 远程所有分支

git merge 分支名称 # 合并分支

#或者恢复暂存区的指定的某个文件到本地工作区
git checkout [file]
# 在commit之后撤销修改的情况下：
# 重置到上一次暂存区版本
git reset --hard
# 或者不管的情况下直接重新修改代码再commit一次
# 或者通过使用git log查看版本号后回退到暂存区的某个版本
git reset [版本号]

# 【2020-9-8】
git log # 查看历史提交信息, 
git reset --soft 19462f6f46cf4cbc211d366359afac0c17a7c190
# 注意 --hard 参数会抛弃当前工作区的修改
# 使用 --soft 参数的话会回退到之前的版本，但是保留当前工作区的修改，可以重新提交

# 更新master → release分支的操作步骤
git branch release # 创建release分支，用于上线
git checkout release # 切换到release分支
git merge master -m '合并到release分支' # 合并master到本地
git push origin release # 同步到远程分支


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
# git对比分支代码
git log dev ^master # dev 有， master没有
git log master ^dev # master有，而dev没有
git log master..dev # dev比 master 中多提交了哪些内容
git log dev..master # master 比 dev 多提交了什么
git log dev...master # 仅仅查看有什么不一样
git log --left-right dev...master # 每次提交都在哪个分支上
# 注意 commit 后面的箭头，根据我们在 –left-right dev…master 的顺序，左箭头 < 表示是 dev 的，右箭头 > 表示是 master的。

# 【2020-9-10】git免密pull/push，以下命令自动保存密码
git config --global credential.helper store

```

- [Git对比两个分支](https://www.cnblogs.com/mkl34367803/p/9196563.html)
- [Git Clone克隆仓库速度太慢怎么办？](https://zhuanlan.zhihu.com/p/144016106)
   - 修改Hosts：分别解析http://ithub.global.ssl.fastly.net和http://github.com网站的ip地址，加入host中；mac刷新host文件，sudo killall -HUP mDNSResponder
   - 使用码云：
      - (1) 使用git clone git@gitee.com:Evllis/novice.git克隆仓库到本地
   - cgit（git换cgit）
      - 安装：git clone https://github.com/killf/cgit.git && sudo ./cgit/install.sh
      - 使用：cgit clone https://github.com/killf/cgit.git （亲测有效）


## 交互式学习

- [可视化学习Git](http://marklodato.github.io/visual-git-guide/index-en.html)
- [交互式学习Git](https://learngitbranching.js.org/)

![](https://user-images.githubusercontent.com/7308241/39848730-040bd09e-53df-11e8-964e-2d48f35a4355.gif)

# 本文编辑器

- [主流文本编辑器学习曲线](https://coolshell.cn/articles/3125.html)
- 几个经典的文本编辑器的学习曲线，不排除其中有调侃和幽默的味道

## 终端

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
set lines=45 columns=100
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


# 小项目

## python健康打卡

- 【2020-7-9】[python实现网页自动健康打卡以及腾讯文档打卡](https://blog.csdn.net/rglkt/article/details/105351363)



