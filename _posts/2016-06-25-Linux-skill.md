---
layout: post
title:  "Linux技能大全"
date:   2016-06-25 23:35:00
categories: 编程语言
tags: Linux Shell Git yaml github 文件服务 vscode crontab curl post
excerpt: Linux使用技能总结，持续更新
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

### 文件大小

du 是 Disk Usage 的缩写， Linux 上最受欢迎的命令之一，用来估算文件或目录占用的磁盘空间
- -a: 显示目录中所有文件以及文件夹大小
- -h: 以 Kb、Mb 、Gb 等易读的单位显示大小
- --si: 类似 -h 选项，但是计算是用 1000 为基数而不是1024
- -s: 显示目录总大小
- -d: 是 --max-depth=N 选项的简写，表示深入到第几层目录,超过指定层数目录则忽略
- -c: 除了显示目录大小外，额外一行显示总占用量
- --time: 显示每一个目录下最近修改文件的时间
- -t: 是 --threshold=SIZE 的简写，过滤掉小于 SIZE 大小的文件以及目录
- --exclude=PATTERN：过滤与 PATTERN 匹配的文件名或者目录名

[du命令详解](https://www.cnblogs.com/wanng/p/linux-du-command.html)

```shell
tree -d temp/ # 显示目录深度
du -d 1 temp/ # 指定目录深度（1级）
du --max-depth=2 temp/ # 最多两级
du temp # 默认情况下只显示目录大小，不显示文件大小。即执行du temp/ 只会显示目录大小
du -a temp/ # 子目录大小
du -b temp/ # 默认显示的大小只有一个孤零零的数字，没有单位
du -h temp/ # 易读方式显示
du -sh temp/ # 易读方式显示目录总大小，基数是 1024
du --si temp/ # --si 选项默认计算基数是 1000，更精确
```

### 时间戳

[Linux下文件的三种时间标记](https://www.cnblogs.com/cherishry/p/5885098.html)

三种时间戳
- **访问**时间：读一次文件的内容，这个时间就会更新。比如more、cat等命令。ls、stat命令不会修改atime
- **修改**时间：修改时间是文件内容最后一次被修改的时间。比如：vim操作后保存文件。ls -l列出的就是这个时间
- 状态**改动**时间是该文件的inode节点最后一次被修改的时间，通过chmod、chown命令修改一次文件属性，这个时间就会更新。

stat字段说明及ls命令查询时间戳

| column | column | column|column|
|--------|--------|
| 字段 | 说明 |例子|ls(-l)|
|st_atime| 文件内容最后访问时间 |read|-u|
|st_mtime|文件内容的最后修改时间|write|缺省|
|st_ctime|文件状态的最后更改时间|chown、chmod|-c|

touch命令修改文件时间
- -a 修改文件的存取时间
- -c 不创建文件file
- -m 修改文件file的修改时间
- -r ref_file 将参照文件ref_file相应的时间戳的数值作为指定文件file时间戳记的新值
- -t time 使用指定时间值time作为指定文件file相应时间戳的新值，此处的time规定如下形式的十进制数

```shell
#!/bin/bash
stat filename # 显示三种时间戳
stat -c %Y log_cron.txt  # 获取最后修改的时间戳
date +%s -d "2022-01-04 09:00:17" # 字符串转时间戳

# 时间戳比较
date1="2008-4-09 12:00:00"
date2="2008-4-10 15:00:00"
t1=`date -d "$date1" +%s`
t2=`date -d "$date2" +%s`
if [ $t1 -gt $t2 ]; then
    echo "$date1 > $date2"
elif [ $t1 -eq $t2 ]; then
    echo "$date1 == $date2"
else
    echo "$date1 < $date2"
fi

# 过期删除功能（超过两分钟）
dir=`ls /root/20160705/`
DIR_PATH="/root/20160705/"
for fi in $dir
do
    FILE_NAME=${DIR_PATH}${fi}
    echo $FILE_NAME
    a=`stat -c %Y $FILE_NAME`
    b=`date +%s`
    if [ $[ $b - $a ] -gt 120 ];then
       echo "delete file:$FILE_NAME"
       rm -rf $FILE_NAME
    fi
done
 
echo "done"
```

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

### 账户管理

Linux 系统中，具有最高权限的用户——root。
- root 用户是系统中**唯一**的一个**超级**管理员，拥有了系统中的所有权限，可以执行任何想要执行的操作，也正因为如此，处于安全考虑，一般情况下不推荐使用 root 用户进行日常使用。
- root 用户所在的用户组称为 “root组”，处于 root 组的普通用户，能够通过 sudo 命令获取 root 权限。

Linux 将用户账号、密码等相关的信息分别存储在四个文件夹下：
- /etc/passwd —— 管理用户UID/GID重要参数
  - 账号名称 : 密码 : UID : GID : 用户信息说明列 : 主文件夹 : shell
  - root : x : 0 : 0 : root : /root : /bin/bash
  - 密码项显示 “x” 是出于安全考虑，Linux 将密码信息移到 /etc/shadow 进行存储；
- /etc/shadow —— 管理用户密码
  - 账号名称 : 密码 : 最近改动密码的日期 : 密码不可被改变的天数 : 密码需要重新更改的天数 : 更改提醒天数 : 密码过期后账号的宽限时间 : 账号失效日期 : 保留
  - root : (字符串，此处打码) : 200 : 0 : 99999 : 7 : : :
- /etc/group —— 管理用户组相关信息
  - 用户组名称 : 用户组密码 : GID : 此用户组包含的账号名称
  - root : x : 0 : root
- /etc/gshadow —— 管理用户组管理员相关信息
  - 用户组名 : 密码 : 用户组管理员账号 : 该用户组包含的账号名称
  - root : : : root

adduser 与 useradd 在一些方面存在不同。
- useradd 创建用户，但是不创建密码等其他用户信息，需要使用 passwd 设置密码才能使用；而 adduser 能通过交互界面，由用户直接输入密码等，设置用户信息。
- useradd 默认不在 /home 下创建用户同名的主文件夹，而 adduser 默认创建。
- useradd 是一个命令，而 adduser 被理解为一个 “简单的应用程序”。

```shell
# 查询用户信息
id <user> # 展示指定user的UID、GID、用户组信息等，默认为当前有效用户
who am i  # 等同于 who -m，仅显示当前登录用户相关信息
whoami    #   仅显示当前有效用户的用户名
w         # 展示当前正在登录主机的用户信息及正在执行的操作
who       # 展示当前正在登录主机的用户信息
last <user>  # 展示指定用户的历史登录信息，默认为当前有效用户
lastlog -u <user> # 展示指定用户最近的一次登录信息，默认显示所有用户

useradd # 新增用户，只是创建了一个用户名，如 （useradd  +用户名 ），它并没有在/home目录下创建同名文件夹，也没有创建密码，因此利用这个用户登录系统，是登录不了的
useradd -m wqw  # 添加用户：
passwd wqw # 设置密码

su wqw # 切换用户
sudo -i -u aisearch # 【2022-1-16】root下切换账户
userdel  -r  wqw # 删除用户
# 类似useradd，但adduser更实用，交互式创建用户
adduser tommy # 添加一个名为tommy的用户，
#passwd tommy  # 修改密码
# 赋予root权限： 修改 /etc/sudoers 文件，找到下面一行，把前面的注释(#)去掉
#    %wheel ALL=(ALL)    ALL
# 修改用户，使其属于root组(wheel)
usermod -g root tommy
# 用户组的添加和删除：
groupadd testgroup # 组的添加
groupdel testgroup # 组的删除
```

sudo
- 普通用户可以通过 sudo 命令，使用 root 用户权限来执行命令。
- 当然，不是所有的用户都能执行 sudo 命令的，而是在 /etc/sudoers 文件内的用户才能执行这个命令。

sudo 的执行流程大致为：
- 系统到 /etc/sudoers 下检查用户是否有执行 sudo 的权限
- 若有 sudo 权限，则需要输入本用户的密码（root 用户执行 sudo 不需要密码）
- 验证成功后执行命令
- 因此，关键在于执行 sudo 的用户是否存在于 /etc/sudoers 文件内


### 系统命令

- [系统常用命令](https://p6-tt.byteimg.com/origin/pgc-image/15e52c0fb24a444d99784798bbf6aba3?from=pc)
  - ![](https://p6-tt.byteimg.com/origin/pgc-image/15e52c0fb24a444d99784798bbf6aba3?from=pc)
  - ![](https://p1-tt.byteimg.com/origin/pgc-image/2107086df3244564a9ca41908b482da5?from=pc)
  - ![](https://p1-tt.byteimg.com/origin/pgc-image/300ef1e7824342afb93a24f988bd7151?from=pc)
- 快捷键
  - ![](https://p6-tt.byteimg.com/origin/pgc-image/4621e6095a834b078b0a6ced28ebf5cc?from=pc)

### 软件包

linux软件包：如yum、apt等

yum软件包

```shell
yum check-update # 列出所有可更新的软件清单
yum update # 安装所有更新软件
yum update gcc # 安装gcc更新软件
yum -y update gcc # 安装gcc更新软件，自动yes
yum install gcc # 仅安装指定的软件
yum -y install gcc # 自动回答yes
yum list # 列出所有可安裝的软件清单
yum list pam* # pam开头的软件包
yum search samba # 查找
yum info samba # 显示软件信息
yum remove samba # 删除samba
# 清楚缓存
yum clean all
yum clean packages # 清除缓存目录下的软件包
yum clean headers # 清除缓存目录下的 headers
yum clean oldheaders # 清除缓存目录下旧的 headers
yum clean, yum clean all (= yum clean packages; yum clean oldheaders) # 清除缓存目录下的软件包及旧的 headers
yum makecache # 生成缓存
```


## linux工具

史上最全，[linux内核调试工具](https://www.toutiao.com/a1674325657904128)都在这里了，我们来看看：
1. 内存相关的：free, vmstate, slabtop
2. cpu相关的：top, ps, pidstat, mpstat
  - 【2021-8-23】根据关键词快速杀死进程：ps axu \| grep start_all \| awk '{print $2}' \| xargs kill
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
- ![](https://p1-tt-ipv6.byteimg.com/img/tos-cn-i-0022/a75094f8b23645fdbc244851528c1c3b~tplv-obj:2664:1542.image?from=post)

- nl的功能和cat -n一样，同样是从第一行输出全部内容，并且把行号显示出来
- more的功能是将文件从第一行开始，根据输出窗口的大小，适当的输出文件内容。当一页无法全部输出时，可以用“回车键”向下翻行，用“空格键”向下翻页。退出查看页面，请按“q”键。另外，more还可以配合管道符“\|”（pipe）使用，例如:ls -al \| more
- less的功能和more相似，但是使用more无法向前翻页，只能向后翻。less可以使用【pageup】和【pagedown】键进行前翻页和后翻页，这样看起来更方便。
- cat的功能是将文件从第一行开始连续的将内容输出在屏幕上。当文件大，行数比较多时，屏幕无法全部容下时，只能看到一部分内容。所以通常使用重定向的方式，输出满足指定格式的内容
  - cat语法：cat [-n]  文件名 （-n ： 显示时，连行号一起输出）
- tac的功能是将文件从最后一行开始倒过来将内容数据输出到屏幕上。我们可以发现，tac实际上是cat反过来写。这个命令不常用。
  - tac语法：tac 文件名。


### curl 网络请求

curl功能非常强大，命令行参数多达几十种。如果熟练的话，完全可以取代 Postman 这一类的图形界面工具。
- curl支持包括HTTP、HTTPS、ftp等众多协议，还支持POST、cookies、认证、从指定偏移处下载部分文件、用户代理字符串、限速、文件大小、进度条等特征。
  - GET: 
    - curl http://127.0.0.1:8080/login?admin&passwd=12345678
  - POST
    - curl -d "user=admin&passwd=12345678" http://127.0.0.1:8080/login
    - curl -H "Content-Type:application/json" -X POST -d '{"user": "admin", "passwd":"12345678"}' http://127.0.0.1:8000/login
- [curl用法指南](https://blog.csdn.net/weixin_39715290/article/details/110611606)

```shell
# ------ GET --------
# 直接GET请求
curl https://www.example.com
# 指定客户端的用户代理表头（User-Agent）， -A参数； 等效于直接使用chrome浏览器
curl -A 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/76.0.3809.100 Safari/537.36' https://google.com
curl -H 'User-Agent: php/1.0' https://google.com # -H 也可以直接指定标头，更改UA
curl -H 'Accept-Language: en-US' https://google.com # 添加 HTTP 请求的标头
curl -H 'Accept-Language: en-US' -H 'Secret-Message: xyzzy' https://google.com # 添加 HTTP 标头Accept-Language: en-US
curl -d '{"login": "emma", "pass": "123"}' -H 'Content-Type: application/json' https://google.com/login # 添加两个标头
# -i参数打印出服务器回应的 HTTP 标头
curl -i https://www.example.com
# -I参数向服务器发出 HEAD 请求，然会将服务器返回的 HTTP 标头打印出来
curl -I https://www.example.com
# --head参数等同于-I
curl --head https://www.example.com
# -k参数指定跳过 SSL 检测。不会检查服务器的 SSL 证书是否正确。
curl -k https://www.example.com
# -L参数会让 HTTP 请求跟随服务器的重定向。curl 默认不跟随重定向
curl -L -d 'tweet=hi' https://api.twitter.com/tweet
# --limit-rate用来限制 HTTP 请求和回应的带宽，模拟慢网速的环境
curl --limit-rate 200k https://google.com # 每秒 200K 字节
# -o参数将服务器的回应保存成文件，等同于wget命令
curl -o example.html https://www.example.com # 将http://www.example.com保存成example.html
# -O参数将服务器回应保存成文件，并将 URL 的最后部分当作文件名。
curl -O https://www.example.com/foo/bar.html # 将服务器回应保存成文件，文件名为bar.html
# -s参数将不输出错误和进度信息
curl -s https://www.example.com
curl -s -o /dev/null https://google.com # # 不产生任何输出
curl -s -o /dev/null https://google.com # -S参数指定只输出错误信息，通常与-o一起使用
# -u参数用来设置服务器认证的用户名和密码。
curl -u 'bob:12345' https://google.com/login
curl https://bob:12345@google.com/login # curl 能够识别 URL 里面的用户名和密码，将其转为上个例子里面的 HTTP 标头
curl -u 'bob' https://google.com/login # 只设置了用户名，执行后，curl 会提示用户输入密码
# -v参数输出通信的整个过程，用于调试。
curl -v https://www.example.com
# --trace参数也可以用于调试，还会输出原始的二进制数据。
curl --trace - https://www.example.com
# -x参数指定 HTTP 请求的代理。
curl -x socks5://james:cats@myproxy.com:8080 https://www.example.com # 指定 HTTP 请求通过http://myproxy.com:8080的 socks5 代理发出。如果没有指定代理协议，默认为 HTTP。
curl -x james:cats@myproxy.com:8080 https://www.example.com # 请求的代理使用 HTTP 协议。
# -X参数指定 HTTP 请求的方法。
curl -X POST https://www.example.com

# 移出UA标头
curl -A '' https://google.com
# 发送cookie给服务器，生成一个标头Cookie: foo=bar
curl -b 'foo=bar' https://google.com
curl -b 'foo1=bar' -b 'foo2=baz' https://google.com # 两个cookie
curl -b cookies.txt https://www.google.com # 本地文件cookies.txt
# 服务器端cookie写入本地文件cookies.txt
curl -c cookies.txt https://www.google.com 
# -e参数用来设置 HTTP 的标头Referer，表示请求的来源
curl -e 'https://google.com?q=example' https://www.example.com
curl -H 'Referer: https://google.com?q=example' https://www.example.com # -H参数可以通过直接添加标头Referer，达到同样效果

# ------ POST --------
# -d参数，HTTP请求会自动加上标头Content-Type : application/x-www-form-urlencoded。并且会自动将请求转为 POST 方法，因此可以省略-X POST。
curl -d 'login=emma＆password=123' -X POST https://google.com/login
curl -d 'login=emma' -d 'password=123' -X POST  https://google.com/login
curl -d '@data.txt' https://google.com/login # 省略-X POST； 读取data.txt文件的内容，作为数据体向服务器发送
# --data-urlencode参数等同于-d，发送 POST 请求的数据体，区别在于会自动将发送的数据进行 URL 编码
curl --data-urlencode 'comment=hello world' https://google.com/login


# -F参数用来向服务器上传二进制文件
curl -F 'file=@photo.png' https://google.com/profile # 给 HTTP 请求加上标头Content-Type: multipart/form-data，然后将文件photo.png作为file字段上传
# -F参数可以指定 MIME 类型
curl -F 'file=@photo.png;type=image/png' https://google.com/profile # 指定 MIME 类型为image/png，否则 curl 会把 MIME 类型设为application/octet-stream
curl -F 'file=@photo.png;filename=me.png' https://google.com/profile # -F参数也可以指定文件名，原始文件名为photo.png，但是服务器接收到的文件名为me.png
# -G参数用来构造 URL 的查询字符串
curl -G -d 'q=kitties' -d 'count=20' https://google.com/search #  GET 请求，实际请求的 URL 为https://google.com/search?q=k...。如果省略--G，会发出一个 POST 请求。如果数据需要 URL 编码，可以结合--data--urlencode参数。
curl -G --data-urlencode 'comment=hello world' https://www.example.com


```


### 文件服务

一行命令搭建文件服务

```shell
# python2
python -m SimpleHTTPServer 8001
# python3下直接执行以下命令即可
cd $your_dir # 要共享的目录
# 启动文件服务，ip填下本机ip，默认端口8000
python -m http.server
python -m http.server 8001 # 指定端口
nohup python -m http.server -b 10.200.24.101 &>log.txt & 
# 打开网页: http://10.200.24.101:8000/
```

注意：
- 当前目录下不要放index.html，会被服务识别为主页，自动加载
- http.server建的文件服务器是单线程的，意味着如果多个用户访问会被阻塞，同时只能一个用户访问

多线程改进方案

```python
import socket
import SocketServer
import BaseHTTPServer
from SimpleHTTPServer import SimpleHTTPRequestHandler

class ForkingHTTPServer(SocketServer.ForkingTCPServer):

   allow_reuse_address = 1

   def server_bind(self):
       """Override server_bind to store the server name."""
       SocketServer.TCPServer.server_bind(self)
       host, port = self.socket.getsockname()[:2]
       self.server_name = socket.getfqdn(host)
       self.server_port = port

def test(HandlerClass=SimpleHTTPRequestHandler,
        ServerClass=ForkingHTTPServer):
   BaseHTTPServer.test(HandlerClass, ServerClass)


if __name__ == '__main__':
   test()
```

代码命名为MultiHTTPServer.py 放置到 python的lib库里面, 如Python/2.7/lib/python/site-packages

```shell
# 多线程文件服务器版本
python -m MultiHTTPServer.py
```

### 邮件

【2021-11-19】[Linux 命令行发送邮件的 5 种方法](https://linux.cn/article-11663-1.html)

 Linux中邮件命令怎么把邮件传递给收件人的？
 - 邮件命令撰写邮件并发送给一个本地**邮件传输代理**（MTA，如 sendmail、Postfix）。邮件服务器和远程邮件服务器之间通信以实际发送和接收邮件。下面的流程可以看得更详细。
 - ![](https://img.linux.net.cn/data/attachment/album/201912/11/081830xntnd4iny5nl9ran.png)

最流行的 5 个命令行邮件客户端，你可以选择其中一个。这 5 个命令分别是：
- mail / mailx
  - 安装： yum install mailx
- mutt
  - 安装：yum install mutt
- mpack
  - 安装：yum install mpack
- sendmail
  - 安装：yum install sendmail
- ssmtp
  - ssmtp 是类似 sendmail 的一个**只发送不接收**的工具，可以把邮件从本地计算机传递到配置好的 邮件主机（mailhub）。用户可以在 Linux 命令行用 ssmtp 把邮件发送到 SMTP 服务器。可以运行下面的命令从官方发行版仓库安装 ssmtp 命令。
  - 安装：yum install ssmtp

```shell
# ------ mail ------
echo "This is the mail body" | mail -s "Subject" 2daygeek@gmail.com
# 带附件
# -a：用于在基于 Red Hat 的系统上添加附件。
# -A：用于在基于 Debian 的系统上添加附件。
# -s：指定消息标题。
echo "This is the mail body" | mail -a test1.txt -s "Subject" 2daygeek@gmail.com

# -------- mutt -------
echo "This is the mail body" | mutt -s "Subject" 2daygeek@gmail.com
# 带附件
echo "This is the mail body" | mutt -s "Subject" 2daygeek@gmail.com -a test1.txt

# -------- mpack ---------
echo "This is the mail body" | mpack -s "Subject" 2daygeek@gmail.com
# 附件
echo "This is the mail body" | mpack -s "Subject" 2daygeek@gmail.com -a test1.txt

# --------- sendmail ---------
# 准备邮件内容：
echo -e "Subject: Test Mail\nThis is the mail body" > /tmp/send-mail.txt
# 发送
sendmail 2daygeek@gmail.com < send-mail.txt

# ---------- ssmtp ------------
echo -e "Subject: Test Mail\nThis is the mail body" > /tmp/ssmtp-mail.txt
ssmtp 2daygeek@gmail.com < /tmp/ssmtp-mail.txt

```


### tcpdump常用命令

- 用简单的话来定义tcpdump，就是：dump the traffic on a network，根据使用者的定义对网络上的数据包进行截获的包分析工具。 tcpdump可以将网络中传送的数据包的“头”完全截获下来提供分析。它支持针对网络层、协议、主机、网络或端口的过滤，并提供and、or、not等逻辑语句来帮助你去掉无用的信息。

实用命令实例
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

### 端口显示

#### lsof

lsof(list open files)是一个列出当前系统打开文件的工具。

lsof 查看端口占用语法格式：
- lsof -i:端口号

```shell
lsof -i:8080 # 查看8080端口占用（NAME字段就是端口）
# COMMAND   PID USER   FD   TYPE   DEVICE SIZE/OFF NODE NAME
# nodejs  26993 root   10u  IPv4 37999514      0t0  TCP *:8000 (LISTEN)
lsof abc.txt # 显示开启文件abc.txt的进程
lsof -c abc # 显示abc进程现在打开的文件
lsof -c -p 1234 # 列出进程号为1234的进程所打开的文件
lsof -g gid # 显示归属gid的进程情况
lsof +d /usr/local/ # 显示目录下被进程开启的文件
lsof +D /usr/local/ # 同上，但是会搜索目录下的目录，时间较长
lsof -d 4 # 显示使用fd为4的进程
lsof -i -U # 显示所有打开的端口和UNIX domain文件
```

#### netstat

netstat -tunlp 用于显示 tcp，udp 的端口和进程等相关情况

netstat 查看端口占用语法格式：
- netstat -tunlp | grep 端口号
- 参数
  - -t (tcp) 仅显示tcp相关选项
  - -u (udp)仅显示udp相关选项
  - -n 拒绝显示别名，能显示数字的全部转化为数字
  - -l 仅列出在Listen(监听)的服务状态
  - -p 显示建立相关链接的程序名

```shell
netstat -tunlp | grep 8000
# tcp        0      0 0.0.0.0:8000            0.0.0.0:*               LISTEN      26993/nodejs   
netstat -ntlp   # 查看当前所有tcp端口
netstat -ntulp | grep 80   # 查看所有80端口使用情况
netstat -ntulp | grep 3306   # 查看所有3306端口使用情况
```

#### kill


命令杀死进程
- kill -9 26993


## 进程

## linux进程

一个进程包括代码、数据和分配给进程的资源。fork（）函数通过**系统调用**创建一个与原来进程几乎完全相同的进程，也就是两个进程可以做完全相同的事，但如果初始参数或者传入的变量不同，两个进程也可以做不同的事。
- 一个进程调用fork（）函数后，系统先给新的进程分配资源，例如存储数据和代码的空间。
- 然后把原来的进程的所有值都复制到新的新进程中，只有少数值与原来的进程的值不同。相当于克隆了一个自己。

fork函数创建子进程

```c++
#include <unistd.h>  
#include <stdio.h>   
int main ()   
{   
    pid_t fpid; //fpid表示fork函数返回的值  
    int count=0;  
    fpid = fork();  // 创建子进程（克隆），返回0，错误时返回负数
    if (fpid < 0)  
        printf("error in fork!");   
    else if (fpid == 0) {  
        printf("i am the child process, my process id is %d\n", getpid());   
        printf("我是爹的儿子\n");//对某些人来说中文看着更直白。  
        count++;  
    }  
    else {  
        printf("i am the parent process, my process id is %d\n", getpid());   
        printf("我是孩子他爹\n");  
        count++;  
    }  
    printf("统计结果是: %d\n",count);  
    return 0;  
}
```

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

- 每一行都代表一项任务，每行的每个字段代表一项设置，它的格式共分为六个字段，前五段是时间设定段，第六段是要执行的命令段，格式如下：minute hour day month week command
  1. minute： 表示分钟，可以是从0到59之间的任何整数。
  1. hour：表示小时，可以是从0到23之间的任何整数。
  1. day：表示日期，可以是从1到31之间的任何整数。
  1. month：表示月份，可以是从1到12之间的任何整数。
  1. week：表示星期几，可以是从0到7之间的任何整数，这里的0或7代表星期日。
  1. command：要执行的命令，可以是系统命令，也可以是自己编写的脚本文件。
  - ![](https://images2015.cnblogs.com/blog/513841/201608/513841-20160812102124078-171184924.png)
- 示例

```shell
#分 时 天 月 周 命令
* * * * * cd /home/work/code/training_platform/web && python t.py

# 每一分钟执行一次 /bin/ls
* * * * * /bin/ls
# 12 月内, 每天的早上 6 点到 12 点，每隔 3 个小时 0 分钟执行一次 /usr/bin/backup
0 6-12/3 * 12 * /usr/bin/backup
# 周一到周五每天下午 5:00 寄一封信给 alex@domain.name：
0 17 * * 1-5 mail -s "hi" alex@domain.name < /tmp/maildata
# 每月每天的午夜 0 点 20 分, 2 点 20 分, 4 点 20 分....执行 echo "haha"：
20 0-23/2 * * * echo "haha"

0 */2 * * * /sbin/service httpd restart # 每两个小时重启一次apache 
50 7 * * * /sbin/service sshd start # 每天7：50开启ssh服务 
50 22 * * * /sbin/service sshd stop  # 每天22：50关闭ssh服务 
0 0 1,15 * * fsck /home  # 每月1号和15号检查/home 磁盘 
1 * * * * /home/bruce/backup  # 每小时的第一分执行 /home/bruce/backup这个文件 
00 03 * * 1-5 find /home "*.xxx" -mtime +4 -exec rm {} \; # 每周一至周五3点钟，在目录/home中，查找文件名为*.xxx的文件，并删除4天前的文件。
30 6 */10 * * ls # 每月的1、11、21、31日是的6：30执行一次ls命令

# 当程序在你所指定的时间执行后，系统会发一封邮件给当前的用户，显示该程序执行的内容，若是你不希望收到这样的邮件，请在每一行空一格之后加上 > /dev/null 2>&1 即可
20 03 * * * . /etc/profile;/bin/sh /var/www/runoob/test.sh > /dev/null 2>&1 

```

[crontab无法执行](https://www.runoob.com/linux/linux-comm-crontab.html)
- 用crontab来定时执行脚本无法执行，但是如果直接通过命令（如：./test.sh)又可以正常执行，这主要是因为**无法读取环境变量**。
- 解决方法：
  - 1、所有命令需要写成绝对路径形式，如: /usr/local/bin/docker。
  - 2、在 shell 脚本开头使用以下代码，. /etc/profile; . ~/.bash_profile
  - 3、在 /etc/crontab 中添加环境变量，在可执行命令之前添加命令 . /etc/profile;/bin/sh，使得环境变量生效
    - 20 03 * * * . /etc/profile;/bin/sh /var/www/runoob/test.sh


## linux I/O模式

【2021-12-17】[Linux 五种 IO 模式及 select、poll、epoll 详解](https://www.toutiao.com/i7042313859834724877)

从事 Web 服务器开发的后端程序员，必然绕不开**网络编程**，而其中最基础也是最重要的部分就是 Linux **I/O模式** 及 **Socket 编程**。

### 基础概念

基础概念
- 1.1、**用户**空间和**内核**空间
  - 对于32位操作系统而言，它的寻址空间是4G（2的32次方），注意这里的4G是**虚拟内存**空间大小。以 Linux 为例，它将最高的1G字节给内核使用，称为**内核空间**，剩下的3G给用户进程使用，称为**用户空间**。这样做的好处就是隔离，保证内核安全。
- 1.2、进程**切换**
  - 这是内核要干的事，字面意思很好理解，挂起正在运行的 A 进程，然后运行 B 进程，当然这其中的流程比较复杂，涉及到上下文切换，且非常消耗资源，感兴趣的同学可以去深入研究。
- 1.3、进程的**阻塞**
  - 进程阻塞是本进程的行为，比如和其他进程通信时，等待请求的数据返回；进程进入阻塞状态时不占用CPU资源的
- 1.4、文件描述符
  - 在 Linux 世界里，**一切皆文件**。怎么理解呢？当程序打开一个现有文件或创建新文件时，内核会向进程返回一个文件描述符，文件描述符在形式上是一个非负整数，其实就是一个索引值，指向该进程打开文件的记录表（它是由内核维护的）。
- 1.5、**缓存** I/O
  - 和标准 IO 是一个概念，当应用程序需要从内核读数据时，数据先被拷贝到操作系统的**内核缓冲区**（page cache），然后再从该缓冲区拷贝到应用程序的地址空间。

当应用程序发起一次 read 调用时，会经历以下两个阶段：
1. 等待数据准备 (Waiting for the data to be ready)
1. 将数据从**内核**拷贝到**进程**中 (Copying the data from the kernel to the process)
正式因为这两个阶段，Linux 系统产生了下述五种 IO 方式：
1. **阻塞** I/O（blocking IO）：blocking IO的特点就是在IO执行的两个阶段都被block了
1. **非阻塞** I/O（nonblocking IO）：non-blocking IO 的特点是用户进程需要不断的主动询问内核 “ 数据好了吗？”
1. **异步** I/O（asynchronous IO）
  - **同步**：synchronous IO做”IO operation”的时候会将process阻塞。之前所述的blocking IO，non-blocking IO，IO multiplexing 都属于 synchronous IO。各IO模式比较：
    - ![](https://p26.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/a5ccc4d198354858a16ab4994c20a3f7?from=pc)
    - 对于 non-blocking IO中，虽然进程大部分时间都不会被 block，但是它仍然要求进程去主动的 check，并且当数据准备完成以后，也需要进程主动的再次调用recvfrom来将数据拷贝到用户内存。
  - **异步**：asynchronous IO 完全不同于 no-blocking IO，它就像是用户进程将整个 IO 操作交给了内核完成，然后内核做完后发出信号通知。在此期间，用户进程不需要去检查 IO 操作的状态，也不需要主动的去拷贝数据。
1. I/O **多路复用**（ IO multiplexing）：
  - 通过一种机制一个进程能同时等待多个文件描述符，而这些文件描述符（套接字描述符）其中的任意一个进入读就绪状态，select()函数就可以返回。
  - select，poll，epoll 都是 IO 多路复用的机制，它们都需要在读写事件就绪后自己负责进行读写，也就是说这个读写过程是阻塞的。
1. **信号驱动** I/O（ signal driven IO）（很少见，可忽略）


## 网络编程（socket）

socket编程基于**传输层**，是应用层和传输层之间的一个抽象层。在使用socket API时，实际上每创建一个socket，都会分配两个**缓冲区**：**输入**缓冲区和**输出**缓冲区（大小一般是8K）
- Linux下**一切皆文件**的思想，两台主机在进行通信时，**write** 函数是向缓冲区里**写**，**read** 函数是从缓冲区里**读**，至于缓冲区里的数据什么时候被传输，有没有达到目标主机，这些都交给传输层的TCP/UDP来做。
- 但Windows中，将 **socket文件** 和 **普通文件** 分开，所以不能用write函数和read函数实现，而是用**send**函数和**recv**函数。

每次通信都打开了一个socket文件，所以通信结束后，在进程关闭前，要关闭所有的socket文件。

进程通信的概念最初来源于单机系统。由于每个进程都在自己的地址范围内运行，为保证两个相互通信的进程之间既互不干扰又协调一致工作，操作系统为进程通信提供了相应设施，如
- UNIX BSD有：**管道**（pipe）、**命名管道**（named pipe）**软中断信号**（signal）
- UNIX system V有：**消息**（message）、**共享存储区**（shared memory）和**信号量**（semaphore)等.
仅限于用在**本机**进程之间通信。**网间**进程通信要解决的是不同主机进程间的相互通信问题（同机进程通信是特例）。
- 同一主机上，不同进程可用**进程号**（process ID）唯一标识。
- 但在网络环境下，各主机独立分配的进程号不能唯一标识该进程。不同机器有相同进程号，另外，操作系统支持的网络协议众多，不同协议的工作方式不同，地址格式也不同。网间进程通信还要解决多重协议的识别问题。 
- TCP/IP协议族已经解决了这个问题，网络层的“**ip地址**”可以唯一标识网络中的主机，而传输层的“**协议**+**端口**”可以唯一标识主机中的应用程序（进程）。这样利用**三元组**（ip地址，协议，端口）就可以标识网络的进程了，网络中的进程通信就可以利用这个标志与其它进程进行交互。
TCP/IP协议的应用程序通常采用应用编程接口：UNIX  BSD的**套接字**（socket）和UNIX System V的**TLI**（已经被淘汰）来实现网络进程之间的通信。目前几乎所有的应用程序都是采用**socket**，而现在又是网络时代，网络中进程通信是无处不在，这就是我为什么说“**一切皆socket**”。

### TCP -- 三次握手、四次挥手

socket的API是在三次握手和四次挥手的基础上设置的接口
- 结构体：ip地址 + 端口号，如：sockaddr、sockaddr_in
总的来说，不管是 struct sockaddr 还是 struct sockaddr_in 都是存放了一个**ip地址**，一个**端口号**，和ip的**类型**(IPV4还是IPV6)

注意：
- 每次输入的ip要通过inet_addr(“127.0.0.1”)函数转化，将一个点分十进制ip转换成长无符号整形，头文件在<arpa/inet.h>中
- 端口号要转换成小端

三次握手
- 一个客户端只有一个sock（文件描述符），而一个服务器最少有两个（一个是自己创建socket时的sock，剩下的是每有一个客户端连接服务器就生成一个sock文件描述符）。数据传输过程相当于文件的读写操作
- ![img](https://img-blog.csdnimg.cn/20190406214540878.png)
- ![img](https://img-blog.csdnimg.cn/20190406214552329.png)
四次挥手
- 四次挥手在socket API上的接口表示为关闭各自拥有的文件描述符即可

### 什么是socket

什么是 Socket 呢？简单理解，就是： **ip地址** + **端口号**。

当两个进程间需要通信时，首先要创建**五元组**（源ip地址、目的ip地址、源端口号、目的端口号、协议），建立 tcp 连接，建立好连接之后，两个进程各自有一个 Socket 来标识，这两个 socket 组成的 socket pair 也就唯一标识了一个连接。有了连接之后，应用程序得要从 tcp 流上获取数据，然后再处理数据。

### socket工作原理

工作原理：“open—write/read—close”模式。
- 服务器端先**初始化**Socket，然后与端口**绑定**(bind)，对端口进行**监听**(listen)，调用accept**阻塞**，等待客户端连接。
- 这时如果有个客户端初始化一个Socket，然后连接服务器(connect)，如果连接成功，这时客户端与服务器端的连接就建立了。
- 客户端发送数据请求，服务器端接收请求并处理请求，然后把回应数据发送给客户端，客户端读取数据
- 最后关闭连接，一次交互结束。
涉及的函数
- （1）socket初始化：
  - int  socket(int protofamily, int type, int protocol); //返回sockfd
- （2）bind()函数把一个地址族中的特定地址赋给socket。
  - int bind(int sockfd, const struct sockaddr *addr, socklen_t addrlen);
- （3）listen()：调用listen()来监听这个socket，如果客户端这时调用connect()发出连接请求，服务器端就会接收到这个请求
  - int listen(int sockfd, int backlog); // backlog排队的最大连接个数
  - socket()函数创建的socket默认是一个**主动**类型的，listen函数将socket变为**被动**类型的，等待客户的连接请求。
- （4）connect()函数: 客户端通过调用connect函数来建立与TCP服务器的连接
  - int connect(int sockfd, const struct sockaddr *addr, socklen_t addrlen);
- （5）accept()函数
  - TCP服务器端依次调用socket()、bind()、listen()之后，就会监听指定的socket地址了。TCP客户端依次调用socket()、connect()之后就向TCP服务器发送了一个连接请求。TCP服务器监听到这个请求之后，就会调用accept()函数取接收请求，这样连接就建立好了。之后就可以开始网络I/O操作了，即类同于普通文件的读写I/O操作。
  - int accept(int sockfd, struct sockaddr *addr, socklen_t *addrlen); //返回连接connect_fd
- （6）read()、write()等函数：调用网络I/O进行读写操作
  - read()/write()
  - recv()/send()
  - readv()/writev()
  - recvmsg()/sendmsg() // 最通用的I/O函数
  - recvfrom()/sendto()
- （7）close()函数
  - 在服务器与客户端建立连接之后，会进行一些读写操作，完成了读写操作就要关闭相应的socket描述字，好比操作完打开的文件要调用fclose关闭打开的文件。
  - close一个TCP socket的缺省行为时把该socket标记为以关闭，然后立即返回到调用进程。该描述字不能再由调用进程使用，也就是说不能再作为read或write的第一个参数。
  - 注意：close操作只是使相应socket描述字的引用计数-1，只有当引用计数为0的时候，才会触发TCP客户端向服务器发送终止连接请求。

### socket 实现 TCP

参考
- [linux socket编程详解](https://www.cnblogs.com/jiangzhaowei/p/8261174.html)
- [Linux下简单socket编程](https://blog.csdn.net/weixin_41249411/article/details/89060985)


代码: 
- 客户端向服务器发送数据
- 服务器向客户端响应
- C编译：gcc  socket_test.cpp -o socket
- C++：g++  socket_test.cpp -o socket -std=c++11

```c++
// 一直监听本机的8000号端口，如果收到连接请求，将接收请求并接收客户端发来的消息，并向客户端返回消息。
#include<stdio.h>  
#include<stdlib.h>  
#include<string.h>  
#include<errno.h>  
#include<sys/types.h>  
#include<sys/socket.h>  
#include<netinet/in.h>  
#include <unistd.h> // fork/close

#define DEFAULT_PORT 8000  
#define MAXLINE 4096 

int main(int argc, char** argv)  
{  
    int    socket_fd, connect_fd;  
    struct sockaddr_in     servaddr;  
    char    buff[4096];  
    int     n;  
    //初始化Socket  
    if( (socket_fd = socket(AF_INET, SOCK_STREAM, 0)) == -1 ){  
        printf("create socket error: %s(errno: %d)\n",strerror(errno),errno);  
        exit(0);  
    }  
    //初始化  
    memset(&servaddr, 0, sizeof(servaddr));  
    servaddr.sin_family = AF_INET;  
    servaddr.sin_addr.s_addr = htonl(INADDR_ANY); //IP地址设置成INADDR_ANY,让系统自动获取本机的IP地址。  
    servaddr.sin_port = htons(DEFAULT_PORT); //设置的端口为DEFAULT_PORT  
  
    //将本地地址绑定到所创建的套接字上  
    if( bind(socket_fd, (struct sockaddr*)&servaddr, sizeof(servaddr)) == -1){  
        printf("bind socket error: %s(errno: %d)\n",strerror(errno),errno);  
        exit(0);  
    }  
    //开始监听是否有客户端连接  
    if( listen(socket_fd, 10) == -1){  
        printf("listen socket error: %s(errno: %d)\n",strerror(errno),errno);  
        exit(0);  
    }  
    printf("======waiting for client's request======\n");  
    while(1){  
//阻塞直到有客户端连接，不然多浪费CPU资源。  
        if( (connect_fd = accept(socket_fd, (struct sockaddr*)NULL, NULL)) == -1){  
            printf("accept socket error: %s(errno: %d)",strerror(errno),errno);  
            continue;  
        }  
        //接受客户端传过来的数据  
        n = recv(connect_fd, buff, MAXLINE, 0);  
        //向客户端发送回应数据  
        if(!fork()){ /*紫禁城*/  
            if(send(connect_fd, "Hello,you are connected!\n", 26,0) == -1)  
            perror("send error");  
            close(connect_fd);  
            exit(0);  
        }  
        buff[n] = '\0';  
        printf("recv msg from client: %s\n", buff);  
        close(connect_fd);  
    }  
    close(socket_fd);  
}
```

```c++
/* File Name: client.c */  
#include<stdio.h>  
#include<stdlib.h>  
#include<string.h>  
#include<errno.h>  
#include<sys/types.h>  
#include<sys/socket.h>  
#include<netinet/in.h>  
  
#define MAXLINE 4096  

int main(int argc, char** argv)  
{  
    int    sockfd, n,rec_len;  
    char    recvline[4096], sendline[4096];  
    char    buf[MAXLINE];  
    struct sockaddr_in    servaddr;  
  
    if( argc != 2){  
        printf("usage: ./client <ipaddress>\n");  
        exit(0);  
    }  
  
    if( (sockfd = socket(AF_INET, SOCK_STREAM, 0)) < 0){  
        printf("create socket error: %s(errno: %d)\n", strerror(errno),errno);  
        exit(0);  
    }  
  
    memset(&servaddr, 0, sizeof(servaddr));  
    servaddr.sin_family = AF_INET;  
    servaddr.sin_port = htons(8000);  
    // inet_pton 是Linux下IP地址转换函数，可以在将IP地址在“点分十进制”和“整数”之间转换 ，是inet_addr的扩展。
    if( inet_pton(AF_INET, argv[1], &servaddr.sin_addr) <= 0){  
        printf("inet_pton error for %s\n",argv[1]);  
        exit(0);  
    }  
    if( connect(sockfd, (struct sockaddr*)&servaddr, sizeof(servaddr)) < 0){  
        printf("connect error: %s(errno: %d)\n",strerror(errno),errno);  
        exit(0);  
    }  
    printf("send msg to server: \n");  
    fgets(sendline, 4096, stdin);  
    if( send(sockfd, sendline, strlen(sendline), 0) < 0)  
    {  
        printf("send msg error: %s(errno: %d)\n", strerror(errno), errno);  
        exit(0);  
    }  
    if((rec_len = recv(sockfd, buf, MAXLINE,0)) == -1) {  
       perror("recv error");  
       exit(1);  
    }  
    buf[rec_len]  = '\0';  
    printf("Received : %s ",buf);  
    close(sockfd);  
    exit(0);  
}  
```

测试：

```shell
# 编译server.c
gcc -o server server.c
# 启动进程：
./server
# 显示结果并等待客户端连接。
# ======waiting for client's request======
# 编译 client.c
gcc -o client server.c
# 客户端去连接server：
./client 127.0.0.1 
# 等待输入消息
# 发送一条消息，输入：c++，服务端就能看到
# 可以不用client,可以使用telnet来测试：
telnet 127.0.0.1 8000
```

服务端：

```c++
/*serve_tcp.c*/
#include<stdio.h>
#include<sys/socket.h>
#include<netinet/in.h>
#include<stdlib.h>
#include<arpa/inet.h>
#include<unistd.h>
#include<string.h>

int main(){
	//创建套接字
	int serv_sock = socket(AF_INET, SOCK_STREAM, IPPROTO_TCP);

	//初始化socket元素
	struct sockaddr_in serv_addr;
	memset(&serv_addr, 0, sizeof(serv_addr));
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");
	serv_addr.sin_port = htons(1234);

	//绑定文件描述符和服务器的ip和端口号
	bind(serv_sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr));

	//进入监听状态，等待用户发起请求
	listen(serv_sock, 20);
	//接受客户端请求
	//定义客户端的套接字，这里返回一个新的套接字，后面通信时，就用这个clnt_sock进行通信
	struct sockaddr_in clnt_addr;
	socklen_t clnt_addr_size = sizeof(clnt_addr);
	int clnt_sock = accept(serv_sock, (struct sockaddr*)&clnt_addr, &clnt_addr_size);

	//接收客户端数据，并相应
	char str[256];
	read(clnt_sock, str, sizeof(str));
	printf("client send: %s\n",str);
	strcat(str, "+ACK");
	write(clnt_sock, str, sizeof(str));

	//关闭套接字
	close(clnt_sock);
	close(serv_sock);

	return 0;
}
```


客户端：

```c++
/*client_tcp.c*/
#include<stdio.h>
#include<string.h>
#include<stdlib.h>
#include<unistd.h>
#include<arpa/inet.h>
#include<sys/socket.h>

int main(){
	//创建套接字
	int sock = socket(AF_INET, SOCK_STREAM, 0);
	//服务器的ip为本地，端口号1234
	struct sockaddr_in serv_addr;
	memset(&serv_addr, 0, sizeof(serv_addr));
	serv_addr.sin_family = AF_INET;
	serv_addr.sin_addr.s_addr = inet_addr("127.0.0.1");
	serv_addr.sin_port = htons(1234);
	//向服务器发送连接请求
	connect(sock, (struct sockaddr*)&serv_addr, sizeof(serv_addr));
	//发送并接收数据
	char buffer[40];
	printf("Please write:");
	scanf("%s", buffer);
	write(sock, buffer, sizeof(buffer));
	read(sock, buffer, sizeof(buffer) - 1);
	printf("Serve send: %s\n", buffer);
	//断开连接
	close(sock);

	return 0;
}
```

### Socket编程方法

三种高效的 Socket 编程方法：**select**、**poll** 和 **epoll**.

select，poll，epoll 都是 IO 多路复用的机制，它们都需要在读写事件就绪后自己负责进行读写，也就是说这个读写过程是阻塞的。select、poll、epoll 三者区别
- ![](https://p26.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/38c2a3040b2046559f91e8872d0ebe7e?from=pc)

总结：
- epoll是 Linux 目前大规模网络并发程序开发的**首选**模型。在绝大多数情况下性能远超 select 和 poll。目前流行的高性能web服务器Nginx正式依赖于epoll提供的高效网络套接字轮询服务。
- 但是，在并发连接不高的情况下，多线程 + 阻塞 IO 方式可能性能更好。

### select -- 数组，O(N)

select 最多能同时监视 1024 个 socket（因为 fd_set 结构体大小是 128 字节，每个 bit 表示一个文件描述符）。用户需要维护一个临时数组，存储文件描述符。当内核有事件发生时，内核将 fd_set 中没发生的文件描述符清空，然后拷贝到用户区。select 返回的是整个数组，它需要遍历整个数组才知道谁发生了变化。
- ![](https://p26.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/f22c3ae6f83a435196360e909f8891cf?from=pc)

代码：

```c++
#include<stdio.h>
#include<sys/types.h>
#include<sys/socket.h>
#include<unistd.h>
#include<netinet/in.h>
#include<arpa/inet.h>
#include<stdlib.h>
#include<string.h>
#include<sys/time.h>
static void Usage(const char* proc)
{
    printf("%s [local_ip] [local_port]\n",proc);
}
int array[4096];
static int start_up(const char* _ip,int _port)
{
    int sock = socket(AF_INET,SOCK_STREAM,0);
    if(sock < 0)
    {
        perror("socket");
        exit(1);
    }
    struct sockaddr_in local;
    local.sin_family = AF_INET;
    local.sin_port = htons(_port);
    local.sin_addr.s_addr = inet_addr(_ip);
    if(bind(sock,(struct sockaddr*)&local,sizeof(local)) < 0)
    {
        perror("bind");
        exit(2);
    }
    if(listen(sock,10) < 0)
    {
        perror("listen");
        exit(3);
    }
    return sock;
}
int main(int argc,char* argv[])
{
    if(argc != 3)
    {
        Usage(argv[0]);
        return -1;
    }
    int listensock = start_up(argv[1],atoi(argv[2]));
    int maxfd = 0;
    fd_set rfds;
    fd_set wfds;
    array[0] = listensock;
    int i = 1;
    int array_size = sizeof(array)/sizeof(array[0]);
    for(; i < array_size;i++)
    {
        array[i] = -1;
    }
    while(1)
    {
        FD_ZERO(&rfds);
        FD_ZERO(&wfds);
        for(i = 0;i < array_size;++i)
        {
            if(array[i] > 0)
            {
                FD_SET(array[i],&rfds);
                FD_SET(array[i],&wfds);
                if(array[i] > maxfd)
                {
                    maxfd = array[i];
                }
            }
        }
        switch(select(maxfd + 1,&rfds,&wfds,NULL,NULL))
        {
            case 0:
                {
                    printf("timeout\n");
                    break;
                }
            case -1:
                {
                    perror("select");
                    break;
                }
             default:
                {
                    int j = 0;
                    for(; j < array_size; ++j)
                    {
                        if(j == 0 && FD_ISSET(array[j],&rfds))
                        {
                            //listensock happened read events
                            struct sockaddr_in client;
                            socklen_t len = sizeof(client);
                            int new_sock = accept(listensock,(struct sockaddr*)&client,&len);
                            if(new_sock < 0)//accept failed
                            {
                                perror("accept");
                                continue;
                            }
                            else//accept success
                            {
                                printf("get a new client%s\n",inet_ntoa(client.sin_addr));
                                fflush(stdout);
                                int k = 1;
                                for(; k < array_size;++k)
                                {
                                    if(array[k] < 0)
                                    {
                                        array[k] = new_sock;
                                        if(new_sock > maxfd)
                                            maxfd = new_sock;
                                        break;
                                    }
                                }
                                if(k == array_size)
                                {
                                    close(new_sock);
                                }
                            }
                        }//j == 0
                        else if(j != 0 && FD_ISSET(array[j], &rfds))
                        {
                            //new_sock happend read events
                            char buf[1024];
                            ssize_t s = read(array[j],buf,sizeof(buf) - 1);
                            if(s > 0)//read success
                            {
                                buf[s] = 0;
                                printf("clientsay#%s\n",buf);
                                if(FD_ISSET(array[j],&wfds))
                                {
                                    char *msg = "HTTP/1.0 200 OK <\r\n\r\n<html><h1>yingying beautiful</h1></html>\r\n";
                                    write(array[j],msg,strlen(msg));

                                }
                            }
                            else if(0 == s)
                            {
                                printf("client quit!\n");
                                close(array[j]);
                                array[j] = -1;
                            }
                            else
                            {
                                perror("read");
                                close(array[j]);
                                array[j] = -1;
                            }
                        }//else j != 0  
                    }
                    break;
                }
        }
    }
    return 0;
}
```


### poll -- 链表，O(N)

poll 就是把 select 中的 fd_set 数组换成了链表，其他和 select 没什么不同。
- ![img](https://p26.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/8b557aa29c4a430b9585e5e868e4932e?from=pc)

代码：
- poll()函数返回fds集合中就绪的读、写，或出错的描述符数量，返回0表示超时，返回-1表示出错；
- fds是一个struct pollfd类型的数组，用于存放需要检测其状态的socket描述符，并且调用poll函数之后fds数组不会被清空；
- nfds记录数组fds中描述符的总数量；
- timeout是调用poll函数阻塞的超时时间，单位毫秒；
- 一个pollfd结构体表示一个被监视的文件描述符，通过传递fds[]指示 poll() 监视多个文件描述符。其中，结构体的events域是监视该文件描述符的事件掩码，由用户来设置这个域，结构体的revents域是文件描述符的操作结果事件掩码，内核在调用返回时设置这个域。events域中请求的任何事件都可能在revents域中返回。

```c++
#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#include<sys/types.h>
#include<sys/socket.h>
#include<netinet/in.h>
#include<arpa/inet.h>
#include<poll.h>
static void usage(const char *proc)
{
    printf("%s [local_ip] [local_port]\n",proc);
}
int start_up(const char*_ip,int _port)
{
    int sock = socket(AF_INET,SOCK_STREAM,0);
    if(sock < 0)
    {
        perror("socket");
        return 2;
    }
    int opt = 1;
    setsockopt(sock,SOL_SOCKET,SO_REUSEADDR,&opt,sizeof(opt));
    struct sockaddr_in local;
    local.sin_family = AF_INET;
    local.sin_port = htons(_port);
    local.sin_addr.s_addr = inet_addr(_ip);
    if(bind(sock,(struct sockaddr*)&local,sizeof(local)) < 0)
    {
        perror("bind");
        return 3;
    }
    if(listen(sock,10) < 0)
    {
        perror("listen");
        return 4;
    }
    return sock;
}
int main(int argc, char*argv[])
{
    if(argc != 3)
    {
        usage(argv[0]);
        return 1;
    }
    int sock = start_up(argv[1],atoi(argv[2]));
    struct pollfd peerfd[1024];
    peerfd[0].fd = sock;
    peerfd[0].events = POLLIN;
    int nfds = 1;
    int ret;
    int maxsize = sizeof(peerfd)/sizeof(peerfd[0]);
    int i = 1;
    int timeout = -1;
    for(; i < maxsize; ++i)
    {
        peerfd[i].fd = -1;
    }
    while(1)
    {
        switch(ret = poll(peerfd,nfds,timeout))
        {
            case 0:
                printf("timeout...\n");
                break;
            case -1:
                perror("poll");
                break;
            default:
                {
                        if(peerfd[0].revents & POLLIN)
                        {
                            struct sockaddr_in client;
                            socklen_t len = sizeof(client);
                            int new_sock = accept(sock,\
                                    (struct sockaddr*)&client,&len);
                            printf("accept finish %d\n",new_sock);
                            if(new_sock < 0)
                            {
                                perror("accept");
                                continue;
                            }
                            printf("get a new client\n");
                                int j = 1;
                                for(; j < maxsize; ++j)
                                {
                                    if(peerfd[j].fd < 0)
                                    {
                                        peerfd[j].fd = new_sock;
                                        break;
                                    }
                                }
                                if(j == maxsize)
                                {
                                    printf("to many clients...\n");
                                    close(new_sock);
                                }
                                peerfd[j].events = POLLIN;
                                if(j + 1 > nfds)
                                    nfds = j + 1;
                        }
                        for(i = 1;i < nfds;++i)
                        {
                            if(peerfd[i].revents & POLLIN)
                        {
                            printf("read ready\n");
                            char buf[1024];
                            ssize_t s = read(peerfd[i].fd,buf, \
                                    sizeof(buf) - 1);
                            if(s > 0)
                            {
                                buf[s] = 0;
                                printf("client say#%s",buf);
                                fflush(stdout);
                                peerfd[i].events = POLLOUT;
                            }
                        else if(s <= 0)
                            {
                                close(peerfd[i].fd);
                                peerfd[i].fd = -1;
                            }
                            else
                            {

                            }
                        }//i != 0
                        else if(peerfd[i].revents & POLLOUT)
                        {
                            char *msg = "HTTP/1.0 200 OK \
                                         <\r\n\r\n<html><h1> \
                                         yingying beautiful \
                                         </h1></html>\r\n";
                            write(peerfd[i].fd,msg,strlen(msg));
                            close(peerfd[i].fd);
                            peerfd[i].fd = -1;
                        }
                        else
                        {
                        }
                    }//for
                }//default
                break;
        }
    }
    return 0;
}

```

### epoll -- 哈希，O(1)，主流

epoll 是基于事件驱动的 IO 方式，它没有文件描述符个数限制，它将用户关心的文件描述符的事件存放到内核的一个事件表中（简单来说，就是由内核来负责存储（红黑树）有事件的 socket 句柄），这样在用户空间和内核空间的copy只需一次。优点如下：
- 没有最大并发连接的限制，能打开的fd上限远大于1024（1G的内存能监听约10万个端口）
- 采用回调的方式，效率提升。只有活跃可用的fd才会调用callback函数，也就是说 epoll 只管你“活跃”的连接，而跟连接总数无关；
- 内存拷贝。使用mmap()文件映射内存来加速与内核空间的消息传递，减少复制开销。
epoll 有两种工作方式：
- LT模式（水平触发）：若就绪的事件一次没有处理完，就会一直去处理。也就是说，将没有处理完的事件继续放回到就绪队列之中（即那个内核中的链表），一直进行处理。
- ET模式（边缘触发）：就绪的事件只能处理一次，若没有处理完会在下次的其它事件就绪时再进行处理。而若以后再也没有就绪的事件，那么剩余的那部分数据也会随之而丢失。
由此可见：ET模式的效率比LT模式的效率要高很多。只是如果使用ET模式，就要保证每次进行数据处理时，要将其处理完，不能造成数据丢失，这样对编写代码的人要求就比较高。

![img](https://p26.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/e16129dbd4d844728257b8f32af1a558?from=pc)


```c++
#include<stdio.h>
#include<sys/types.h>
#include<sys/socket.h>
#include<netinet/in.h>
#include<arpa/inet.h>
#include<stdlib.h>
#include<string.h>
#include<sys/epoll.h>

static Usage(const char* proc)
{
    printf("%s [local_ip] [local_port]\n",proc);
}
int start_up(const char*_ip,int _port)
{
    int sock = socket(AF_INET,SOCK_STREAM,0);
    if(sock < 0)
    {
        perror("socket");
        exit(2);
    }
    struct sockaddr_in local;
    local.sin_family = AF_INET;
    local.sin_port = htons(_port);
    local.sin_addr.s_addr = inet_addr(_ip);
    if(bind(sock,(struct sockaddr*)&local,sizeof(local)) < 0)
    {
        perror("bind");
        exit(3);
    }
    if(listen(sock,10)< 0)
    {
        perror("listen");
        exit(4);
    }
    return sock;
}
int main(int argc, char*argv[])
{
    if(argc != 3)
    {
        Usage(argv[0]);
        return 1;
    }
    int sock = start_up(argv[1],atoi(argv[2]));
    int epollfd = epoll_create(256);
    if(epollfd < 0)
    {
        perror("epoll_create");
        return 5;
    }
    struct epoll_event ev;
    ev.events = EPOLLIN;
    ev.data.fd = sock;
    if(epoll_ctl(epollfd,EPOLL_CTL_ADD,sock,&ev) < 0)
    {
        perror("epoll_ctl");
        return 6;
    }
    int evnums = 0;//epoll_wait return val
    struct epoll_event evs[64];
    int timeout = -1;
    while(1)
    {
        switch(evnums = epoll_wait(epollfd,evs,64,timeout))
        {
            case 0:
     printf("timeout...\n");
     break;
            case -1:
     perror("epoll_wait");
     break;
default:
     {
         int i = 0;
         for(; i < evnums; ++i)
         {
             struct sockaddr_in client;
             socklen_t len = sizeof(client);
             if(evs[i].data.fd == sock \
                     && evs[i].events & EPOLLIN)
             {
                 int new_sock = accept(sock, \
                         (struct sockaddr*)&client,&len);
                 if(new_sock < 0)
                 {
                     perror("accept");
                     continue;
                 }//if accept failed
                 else 
                 {
                     printf("Get a new client[%s]\n", \
                             inet_ntoa(client.sin_addr));
                     ev.data.fd = new_sock;
                     ev.events = EPOLLIN;
                     epoll_ctl(epollfd,EPOLL_CTL_ADD,\
                             new_sock,&ev);
                 }//accept success

             }//if fd == sock
             else if(evs[i].data.fd != sock && \
                     evs[i].events & EPOLLIN)
             {
                 char buf[1024];
                 ssize_t s = read(evs[i].data.fd,buf,sizeof(buf) - 1);
                 if(s > 0)
                 {
                     buf[s] = 0;
                     printf("client say#%s",buf);
                     ev.data.fd = evs[i].data.fd;
                     ev.events = EPOLLOUT;
                     epoll_ctl(epollfd,EPOLL_CTL_MOD, \
                             evs[i].data.fd,&ev);
                 }//s > 0
                 else
                 {
                     close(evs[i].data.fd);
                     epoll_ctl(epollfd,EPOLL_CTL_DEL, \
                             evs[i].data.fd,NULL);
                 }
             }//fd != sock
             else if(evs[i].data.fd != sock \
                     && evs[i].events & EPOLLOUT)
             {
                 char *msg =  "HTTP/1.0 200 OK <\r\n\r\n<html><h1>yingying beautiful </h1></html>\r\n";
                 write(evs[i].data.fd,msg,strlen(msg));
                 close(evs[i].data.fd);
                 epoll_ctl(epollfd,EPOLL_CTL_DEL, \
                             evs[i].data.fd,NULL);
             }//EPOLLOUT
             else
             {
             }
         }//for
     }//default
     break;
        }//switch
    }//while
    return 0;
}
```

- epoll_create函数创建一个epoll句柄，参数size表明内核要监听的描述符数量。调用成功时返回一个epoll句柄描述符，失败时返回-1。
- epoll_ctl函数注册要监听的事件类型。四个参数解释如下： epfd表示epoll句柄； op表示fd操作类型：EPOLL_CTL_ADD（注册新的fd到epfd中），EPOLL_CTL_MOD（修改已注册的fd的监听事件），EPOLL_CTL_DEL（从epfd中删除一个fd）；fd是要监听的描述符； event表示要监听的事件，
- epoll_wait 函数等待事件的就绪，成功时返回就绪的事件数目，调用失败时返回 -1，等待超时返回 0。maxevents告诉内核events的大小，timeout表示等待的超时事件

epoll_event结构体定义如下：

```c++
struct epoll_event { 
  __uint32_t events; /* Epoll events */ 
  epoll_data_t data; /* User data variable */ 
}; 
typedef union epoll_data {
  void *ptr; 
  int fd; 
  __uint32_t u32;
  __uint64_t u64; 
} epoll_data_t;
```



# Shell语言

## Shell知识点

在 Linux 的基础上再度深入学习 Shell，可以极大的减少重复工作的压力。毕竟批量处理才是工作的常态呢~

![](https://raw.githubusercontent.com/woaielf/woaielf.github.io/master/_posts/Pic/1709/170920-1.png)
![](https://raw.githubusercontent.com/woaielf/woaielf.github.io/master/_posts/Pic/1709/170920-2.png)
![](https://raw.githubusercontent.com/woaielf/woaielf.github.io/master/_posts/Pic/1709/170920-3.png)

## 常规语法

### 时间日期

[date用法](https://www.cnblogs.com/alsodzy/p/8403870.html)

```shell
cal # 日历

date +%Y%m%d 
date +%F
now=$(date +%y%m%d) # 获取今天时期
date +%Y%m%d%H%M%S # 当前时间，时分秒
date +%m%d%H%M%y.%S # 具体到毫秒
date +%w    # 今天是星期几
date +%W   # 当前为今年的第几周
# 时间戳
date +%s   # 获取时间戳
date -d @1521563928  # 将时间戳换算成日期
date +%s -d "2017-03-21 00:38:48" # 将日期换算成时间戳

# 相对时间
date -d 'now'    #显示当前时间
date -d tomorrow +%y%m%d # 明天
date -d yesterday +%Y%m%d # 获取昨天时期
date -d '30 second ago'    #显示30秒前的时间
date -d -2day +%Y%m%d # 获取前天日期
date -d '7 days ago' +%Y%m%d # 一星期前
date -d '1 weeks ago' +%Y%m%d # 一星期前
date -d '2 days ago'    #显示2天前的时间
date -d -10day +%Y%m% # 获取10天前的日期
date -d `date +%y%m01`"-1 day" # 上月最后一天
date -d '3 month 1 day'    # 显示3月零1天以后的时间
date -d "n days ago" +%y%m%d # 或n天前的
date -d '25 Dec' +%j    #显示12月25日在当年的哪一天

date -d "-3 day" # 3天前
date -d "+3 month"  # 3月后
date -d "-3 year" # 3年前，类似的，hour、minute、second
date -d `date -d "-3 month" +%y%m01`"-1 day" # 4个月前最后一天
date -d `date -d "+12 month" +%y%m01`"-1 day" # 11个月后第一天
date -d `date -d "+12 month" +%y%m01`"-1 day" +%Y%m%d # 11个月前最后一天

```


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

[shell彩色文字](https://blog.csdn.net/andylauren/article/details/60873400)
- 特效格式
  - \033[0m  关闭所有属性  
  - \033[1m   设置高亮度  
  - \03[4m   下划线  
  - \033[5m   闪烁  
  - \033[7m   反显  
  - \033[8m   消隐  
  - \033[30m ~ \033[37m   设置前景色  
  - \033[40m ~ \033[47m   设置背景色
- 光标位置
  - \033[nA  光标上移n行  
  - \03[nB   光标下移n行  
  - \033[nC   光标右移n行  
  - \033[nD   光标左移n行  
  - \033[y;xH设置光标位置  
  - \033[2J   清屏  
  - \033[K   清除从光标到行尾的内容  
  - \033[s   保存光标位置  
  - \033[u   恢复光标位置  
  - \033[?25l   隐藏光标  
  - \33[?25h   显示光标
- 特效可以叠加，需要使用“;”隔开
  - 例如：闪烁+下划线+白底色+黑字为 \033[5;4;47;30m闪烁+下划线+白底色+黑字为\033[0m

| 编码 | 颜色/动作 |
| --- | --- |
| 　　0 | 重新设置属性到缺省设置 |
| 　　1 | 设置粗体 |
| 　　2 | 设置一半亮度(模拟彩色显示器的颜色) |
| 　　4 | 设置下划线(模拟彩色显示器的颜色) |
| 　　5 | 设置闪烁 |
| 　　7 | 设置反向图象 |
| 　　22 | 设置一般密度 |
| 　　24 | 关闭下划线 |
| 　　25 | 关闭闪烁 |
| 　　27 | 关闭反向图象 |
| 　　30 | 设置黑色前景 |
| 　　31 | 设置红色前景 |
| 　　32 | 设置绿色前景 |
| 　　33 | 设置棕色前景 |
| 　　34 | 设置蓝色前景 |
| 　　35 | 设置紫色前景 |
| 　　36 | 设置青色前景 |
| 　　37 | 设置白色前景 |
| 　　38 | 在缺省的前景颜色上设置下划线 |
| 　　39 | 在缺省的前景颜色上关闭下划线 |
| 　　40 | 设置黑色背景 |
| 　　41 | 设置红色背景 |
| 　　42 | 设置绿色背景 |
| 　　43 | 设置棕色背景 |
| 　　44 | 设置蓝色背景 |
| 　　45 | 设置紫色背景 |
| 　　46 | 设置青色背景 |
| 　　47 | 设置白色背景 |
| 　　49 | 设置缺省黑色背景 |


```shell
# !/bin/bash

#【2021-12-28】
echo -e "\033[4;31m 下划线红字 \033[0m" 
echo -e "\033[5;34m 红字在闪烁 \033[0m" #闪烁
echo -e "\033[8m 消隐 \033[0m " #反影

# 彩色文字设置
prefix="\033["
Color_Off="0m" # Text Reset
# Bold High Intensty
BIBlack="30m" # "[1;90m" # Black
BIRed="31m" # "[1;91m" # Red
BIGreen="32m" # "[1;92m" # Green
BIYellow="33m" # "[1;93m" # Yellow
BIBlue="34m" # "[1;94m" # Blue
BIPurple="35m" # "[1;95m" # Purple
BICyan="36m" # "[1;96m" # Cyan
BIWhite="37m" # "[1;97m" # White
 
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
	# echo -e "\033[4;31;42m 文字 \033[0m"
    echo -e  "${prefix}${cur_color} [`date "+%Y-%m-%d %H:%M:%S"`] [$level] $log_info ${prefix}${Color_Off}"
}
log "INFO" "TEST INFO"
log "WARNING" "TEST WARNING"
log "ERROR" "TEST ERROR"
log "FETAL" "TEST FETAL"

# ------- 失效 -------
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

### 随机抽奖

Shell随机创建手机号码与随机抽奖：
- 随机生成1000个以136开头的手机号码

```shell
#! usr/bin/bash

# 生成的手机号码存放到指定的目录的文件
filePath="/home/phoneNum.txt"

#(())语法类似C语法的括号
for((i=1;i<=1000;i++))
do
	# 取模
	num1=$[$RANDOM%10] # $RANDOM代表随机函数，是操作系统的全局变量
	num2=$[$RANDOM%10]
	num3=$[$RANDOM%10]
	num4=$[$RANDOM%10]
	num5=$[$RANDOM%10]
	num6=$[$RANDOM%10]
	num7=$[$RANDOM%10]
	num8=$[$RANDOM%10]
	num9=$[$RANDOM%10]
	# 将结果输到指定的文件里面
	echo "136$num1$num2$num3num4$num5$num6$num7$num8$num9" >> $filePath
done

# 寻找第100个的手机号码
head -100 phoneNum.txt | tail -1
# 查看是否有重复的手机号码
cat phoneNum.txt | sort -u|wc -l

# ================
# 抽取幸运的5位手机号码并去除已经抽取过的用户

#! usr/bin/bash
filePath="/home/phoneNum.txt"

# 循环读取5位用户手机号码
for((i=1;i<=5;i++))
do
	# 定位幸运观众所在行数
	#line=`wc -l $filePath | cut -d ' ' -f1`
  line=`wc -l $filePath | awk '{print $1}'
	#计算幸运行
	luck_line=$[RANDOM%line+1]
	#取出幸运观众所在行的电话号码,-1代表是一个
	luck_num=`head -$luck_line $filePath | tail -1` 
	#显示到屏幕,截取后位的号码数字
	echo "136****${luck_num:7:4}"
	# 将抽中的手机号码放到一个文本
	echo $luck_num >> luck.txt
	# 将抽中的手机号码在文本删除，防止下一次又抽中
	sed -i "/$luck_num/d" $filePath
done
# 查看还有多少行手机号码
wc -l /home/phoneNum.txt 

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

### 字符串切割

```shell
test="cluster	8	平使用面积|你有啥用|使用多少？|使用年限|使用率|使用率多少|套内使用面积|车位使用权多久"
echo $test | awk '{split($3,a,"|");for(i in a) print $2"\t"a[i]}' > out.txt
echo "123" | awk '{print length}' # 字符串长度
awk -F ',' '{print substr($3,6)}'  # 表示是从第3个字段里的第6个字符开始，一直到设定的分隔符","结束.
substr($3,10,8)  # 表示是从第3个字段里的第10个字符开始，截取8个字符结束.
substr($3,6)     # 表示是从第3个字段里的第6个字符开始，一直到结尾
awk '$0 ~ /abc/ {gsub("a\d+c", "def", $0); print $1, $3}' abc.txt # 字符串替换，正则模式
```

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

- 待补充

## grep

- 待补充

## shell案例


### 自定义通用函数

common.sh包含的函数：
- 打日志
- 发邮件
- 发短信
- 多功能等待

```shell
#!/bin/bash
# -*- coding: utf-8 -*-
 
#===============================================================================
#            File:  common.sh
#           Usage:  sh common.sh
#     Description:  定义了常用函数
#    LastModified:  6/12/2012 16:28 PM CST
#         Created:  1/4/2012 11:06 AM CST
# 
#          AUTHOR:  wangqiwen(wangqiwen@*.com)
#         COMPANY:  baidu Inc
#         VERSION:  1.0
#            NOTE:  
#           input:  
#          output:  
#===============================================================================
 
ulimit -c unlimited
#init_log <log_file>
init_log()#清空log文件打一条日志
{
    >$LogFile # conf/var.sh中定义
    log "====================================="
    log "LogFile=$LogFile"
    log "\t\tshort-cut-pretreat"
    local day=`date "+%Y-%m-%d %H:%M:%S"`
    log "\t\t$day"
    log "====================================="
    declare -i log_count=0 # 整型局部变量
}
 
log()
{
    let log_count++
    echo -e "\n--------------------------[$log_count]th log--------------------------------\n"
    echo -e `date "+%Y-%m-%d %H:%M:%S"`"\t$@"
}
 
#read_mail <mail.conf> 结果在mail_receivers变量中
read_alarm_mail(){
    declare -i flag=0 # 整型局部变量
 
    if [ -f "$1" ];then
        cut -d "#" -f 1 "$1" |grep -v "^$" >tmp.$$
        while read line; do
            if [ $flag -eq 0 ];then
                mail_receivers=$line # 整型全局变量
                flag=1
            else
                mail_receivers="$mail_receivers,$line"
            fi
        done < tmp.$$
        rm -f tmp.$$
    else
        #设定一个默认值
        mail_receivers="-"
    fi
    echo "报警邮件接收人:$mail_receivers"
}
 
#向指定的邮件发送邮件告警
#$1:    告警主题
#$2:    需要被告警的详细内容
send_alarm_mail( )
{
        if [ $# -ne 2 ]; then
                return -1
        fi
    #获取收件人列表
        echo "$2" | mail -s "$1" "$mail_receivers"
        if [ $? -ne 0 ]; then
                log "[`date "+%Y-%m-%d %H:%M:%S"`] [ERROR] 发送到 $mail_receivers 的邮件($1)失败!"
        else
                log "[`date "+%Y-%m-%d %H:%M:%S"`] [NOTE] 成功将邮件($1---$2) 发送至 $mail_receivers !"
        fi
        return 0
}
#对所有手机报警
#$1:    报警内容
send_list_msgs( )
{ # 传入两个参数: $1 --> 报警短信内容  $n (n>=2) --> 报警接收人的手机号
        if [ $# -lt 2 ]; then
        echo "短信报警函数send_list_msgs参数不够!"
                return -1
        fi
    local i="-"
    local phone_number="-"
    for((i=2;i<=$#;i++))
    do
        eval "phone_number=\${$i}"
        # 向$phone_number发送报警信息$1
        gsmsend -s $GSMSERVER1:$GSMPORT1 -s $GSMSERVER2:$GSMPORT2 *$GSMPIORITY*"$phone_number@$1"
        if [ $? -ne 0 ];then
            log "[`date "+%Y-%m-%d %H:%M:%S"`] [ERROR] 报警短信发送失败 !"
        else
            log "[`date "+%Y-%m-%d %H:%M:%S"`] [NOTE] 报警信息 ($1) 成功发送到 $phone_number !"
        fi 
    done
}
#------------------------------------------------------
# 2012-2-25 PM 22:33   wangqiwen@*.com
# input: 每次等5min
# type=1 检测多个目录，各目录tag文件命名规则一致，且都在上一级目录
#(1) wait_hadoop_file   hadoop  time  1 tag_file   hadoop_dir1   hadoop_dir2   hadoop_dir3  
# 公用tag文件名（非绝对路径，tag文件默认在目录的上一层）
# 示例：wait_hadoop_file $hadoop 10   1  done        /a/b/c        /a/m/c       /a/m/d
# 或：  wait_hadoop_file $hadoop 10   1  finish.txt  /a/b/c        /a/m/c       /a/m/d
#   目录/a/b/c,/a/m/c,/a/m/d
#   若tag文件分别为:/a/b/c.done和/a/m/c.done和/a/m/d.done，那么，tag_file="done"
#   否则，所有目录的tag文件名相同，tag_file可自定义为某文件名
#
# type=2 检测多个目录，各目录的tag文件路径无规则，需直接指定其完整路径
#(2) wait_hadoop_file hadoop    time   2  hadoop_dir1 tag_file1  hadoop_dir2 tag_file2  # 私用tag文件名，绝对路径
# 示例：wait_hadoop_file $hadoop 10   2  /a/b/c      /a/b/c.done /a/m/c     /a/m/c.txt   /a/m/d     /a/m_d.txt 
# 目录与tag文件要依次成对出现
#
# type=3 检测多个集群文件（非目录），无须tag文件
#(3) wait_hadoop_file    hadoop    time   3 hadoop_file1    hadoop_file2   hadoop_file3   # 判断多个hadoop文件的存在性
# 示例：wait_hadoop_file $hadoop    10    3     /a/b/file1.txt  /a/b/file2.txt  /a/m/file3.log 
#
# output: 通过变量FILE_READY记录，返回状态值0~3 
#   0 : 检查完毕，或成功删除临时目录
#   1 : 参数输入有误：个数、奇偶性不对。type=2时要保证tag文件与目录依次成对出现
#   2 : 超时，停止检查
#   3 : _temporary目录删除失败,但不影响hadoop任务，属于成功状态
#   成功状态值: 0 和 3
#------------------------------------------------------
#shopt -s -o nounset  # 变量声明才能使用
wait_hadoop_file(){
    local FILE_READY=1 # 检查结果
    local ARG_NUM=$# # 参数个数
    [ $ARG_NUM -lt 4 ] && {  echo -e "input error ! $ARG_NUM < 4 , please check !\t参数有误，小于4个，请确认！";return $FILE_READY;} 
    local HADOOP=$1 # Hadoop集群客户端地址
    local HADOOP_CHECK_PATH="/" # 待检查的集群目录或文件
    local HADOOP_TEMP_PATH="/" # _temporary目录
    local HADOOP_CHECK_TAG="/"  # 待检查的tag文件
    local HADOOP_WATI_TIME=$2 # 最长等待时间（单位：分钟）
    local CURRENT_ERRORTIME=1 # 等待时间
    local CURRENT_PATH=1  # 当前遍历目录数
    local PATH_INDEX=0  # 当前检测目录所在的参数位置
    local TAG_INDEX=0  # 当前检测tag文件所在的参数位置
    local TAG_NAME="/"
    local DIR_NUM=0  # 待检测目录数
    local TYPE=$3  # type
    # 根据类型分别处理
    # type=1,2时，输入参数至少5个；type=3时，输入参数至少4个
    case $TYPE in
    1) 
        [ $ARG_NUM -eq 4 ] && {  echo -e "input error ! $ARG_NUM < 5 , please check !\t参数有误，小于5个，请确认！";return $FILE_READY;}
        DIR_NUM=$(($ARG_NUM-4));;  # 待检测的目录数
    2)
        [ $ARG_NUM -eq 4 ] && {  echo -e "input error ! $ARG_NUM < 5 , please check !\t参数有误，小于5个，请确认！";return $FILE_READY;}
        [ $((($ARG_NUM-3)%2)) -ne 0 ] && { FILE_READY=1; echo -e "Input error ! Dirs miss to match tags in pairs ...";return $FILE_READY;} # 目录和tag文件不成对，退出case
        DIR_NUM=$((($ARG_NUM-3)/2));;  # 待检测的目录数
    3)  
        DIR_NUM=$(($ARG_NUM-3));; # 待检测文件数
    *)
        echo "Input error ! Type value $TYPE illegal... type参数值错误，1-3，非$TYPE"
        return $FILE_READY;;
    esac
 
    while [ $CURRENT_PATH -le $DIR_NUM ]
    do
        # path/tag参数位置获取
        if [ $TYPE -eq 1 ];then
            PATH_INDEX=$((4+$CURRENT_PATH))
            TAG_INDEX=4
            eval "HADOOP_CHECK_PATH=\${$PATH_INDEX}"  # 待检查的集群目录
            eval "TAG_NAME=\${$TAG_INDEX}"
            if [ "$TAG_NAME" == "done" ];then #tag文件在上一级目录
                HADOOP_CHECK_TAG="${HADOOP_CHECK_PATH%/*}/${HADOOP_CHECK_PATH##*/}.$TAG_NAME" # tag文件名为：上一级目录名字.done
            else
                HADOOP_CHECK_TAG="${HADOOP_CHECK_PATH%/*}/$TAG_NAME" # 上一级目录自定义tag文件名
            fi
        elif [ $TYPE -eq 2 ];then
            PATH_INDEX=$((4+2*($CURRENT_PATH-1))) 
            TAG_INDEX=$(($PATH_INDEX+1))
            eval "HADOOP_CHECK_PATH=\${$PATH_INDEX}"  # 待检查的集群目录
            eval "HADOOP_CHECK_TAG=\${$TAG_INDEX}" # tag文件的绝对路径
        else
            PATH_INDEX=$((3+$CURRENT_PATH))
            eval "HADOOP_CHECK_PATH=\${$PATH_INDEX}"  # 待检查的集群文件
        fi
        while [ $CURRENT_ERRORTIME -le $HADOOP_WATI_TIME ]
        do
            $HADOOP fs -test -e $HADOOP_CHECK_PATH  # 检测path目录是否存在
            if [ $? -eq 0 ];then # 目录存在
                break
            else  # 目录不存在，等待生成
                CURRENT_ERRORTIME=$(($CURRENT_ERRORTIME+1))
                date "+%Y-%m-%d %H:%M:%S"
                sleep 5m
            fi
        done
        [ $CURRENT_ERRORTIME -gt $HADOOP_WATI_TIME ] && { FILE_READY=2; echo -e "Time out when checking dirs[$HADOOP_CHECK_PATH] ...\t等待超时，目录未检查完毕！" ;break;}
        if [ $TYPE -eq  3 ];then
            CURRENT_PATH=$(($CURRENT_PATH+1)) # 检查下一个目录
        else
            HADOOP_TEMP_PATH="${HADOOP_CHECK_PATH}/_temporary" # 临时目录
            # 检测tag文件，并删除临时目录
            while [ $CURRENT_ERRORTIME -le $HADOOP_WATI_TIME ]
            do
                $HADOOP fs -test -e $HADOOP_CHECK_TAG # 检测tag文件是否存在
                if [ $? -eq 0 ];then  # tag文件存在  [2012-12-4]停止临时文件删除
                    #$HADOOP fs -test -e $HADOOP_TEMP_PATH  # 检查临时目录是否存在
                    #if [ $? -eq 0 ];then  # 临时目录存在
                    #   $HADOOP fs -rmr $HADOOP_TEMP_PATH  # 删除临时目录
                    #   [ $? -ne 0 ] && { FILE_READY=3; echo -e "Failed to delete temp dir[$HADOOP_TEMP_PATH]...\t临时目录删除失败";} #break 2; } # 删除失败，退出2重循环 [2012-2-23]不退出，继续检查
                    #fi
                    CURRENT_PATH=$(($CURRENT_PATH+1)) # 检查下一个目录
                    break
                else  # tag文件不存在，错误次数自增，循环等待
                    CURRENT_ERRORTIME=$(($CURRENT_ERRORTIME+1))
                    date "+%Y-%m-%d %H:%M:%S"
                    sleep 5m
                fi
            done
        fi
    done
    [ $CURRENT_PATH -gt $DIR_NUM ] && { [ $FILE_READY -ne 3 ] && FILE_READY=0;  echo "All dirs ready ! 目录检查完毕！";} # 所有目录都准备好,新增成功状态3,[2012-2-23]
    return $FILE_READY
}
```

### 循环任务

从某个日期开始，往前递推N天，并启动任务

```shell
[ $# -ge 1 ] && date=$1 || date=`date -d "1 days ago" +%Y%m%d`
readonly rp_hadoop="/home/work/bin/hadoop-client-rp-product/hadoop/bin/hadoop"
i=1;n=3
while [ $i -le $n ]
do
    d=`date -d "${i} days ago $date" +%Y%m%d`
    echo "[`date "+%Y-%m-%d %H:%M:%S"`] 第 $i 天 ($d)"
    sh start.sh $d
    [ $? -ne 0 ] && { echo "[`date "+%Y-%m-%d %H:%M:%S"`] 第 $i 天 ($d) oneday-pretreat 执行失败...";exit -1; } || { echo "[`date "+%Y-%m-%d %H:%M:%S"`] 第 $i 天( $d ) oneday-pretreat 执行成功...";  }
    cd ../../short-cut-pretreat-v2/navigation
    sh start.sh $d
    [ $? -ne 0 ] && { echo "[`date "+%Y-%m-%d %H:%M:%S"`] 第 $i 天 ($d) short-cut-pretreat 执行失败...";exit -1; } || { echo "[`date "+%Y-%m-%d %H:%M:%S"`] 第 $i 天( $d ) short-cut-pretreat 执行成功..."; ((i++)); }
    cd -
done
```

### shell调度MapReduce任务

单次案例：

```shell
#!/bin/bash
# -*- coding: utf-8 -*-
 
#===============================================================================
#            File:  start_hadoop.sh [session]
#           Usage:  
#     Description:  pc端session日志的hadoop启动脚本 
#    LastModified:  2013-3-28 12:51 PM 
#         Created:  27/12/2012 11:17 AM CST
#          AUTHOR:  wangqiwen(wangqiwen@*.com)
#         COMPANY:  baidu Inc
#         VERSION:  1.0
#            NOTE:  
#           input:  
#          output:  
#===============================================================================
#:<<note
# online 
set -x
if [ $# -ne 9 ]; then
    echo "[$0] [ERROR] [`date "+%Y-%m-%d %H:%M:%S"`] [session] input error ! \$#=$# not 9"
    exit -1
fi
hadoop=$1;input=${2//;/ -input };output=$3
jobname=$4;main_dir=$5;date=$6;task_prefix=$7
map_con_num=$8;reduce_num=$9
#note

:<<note
# test
date="20130314"
jobname="session"
hadoop="/home/work/hadoop-rp-rd-nj/hadoop/bin/hadoop"
#input="/log/22307/nj_rpoffline_session_ting/$date/0000/szwg-ston-hdfs.dmop/0000"
input="/log/22307/nj_rpoffline_session_ting/$date/0000/szwg-ston-hdfs.dmop/0000/part-00000"
# baike http://cq01-test-nlp2.cq01.baidu.com:8130/table/view?table_id=347
output="/user/rp-rd/wqw/test/sm/$jobname/$date/0000"
map_con_num=200
reduce_num=200
main_dir="/home/work/wqw/sm-navi-data-cookie/new/bin"
note

echo "=========================$jobname start ============================="
done_file="${output%/*}/${output##*/}.done"
${hadoop} fs -test -e ${output} && ${hadoop} fs -rmr ${output}
${hadoop} fs -test -e ${done_file} && ${hadoop} fs -rm ${done_file}
echo "-------输出目录,标记文件清理完毕---------------------"
echo "[$0] [NOTE] [`date "+%Y-%m-%d %H:%M:%S"`] [$jobname] start to commit hadoop job"
${hadoop} streaming \
        -jobconf mapred.job.name="${task_prefix}" \
        -jobconf mapred.job.priority=HIGH \
        -jobconf mapred.task.timeout=600000 \
        -jobconf mapred.map.tasks=$map_con_num \
        -jobconf mapred.reduce.tasks=$reduce_num \
        -jobconf stream.memory.limit=1000 \
        -jobconf stream.num.map.output.key.fields=2 \
        -jobconf num.key.fields.for.partition=1 \
        -cacheArchive /user/rp-product/dcache/thirdparty/python2.7.tar.gz#py27 \
        -partitioner org.apache.hadoop.mapred.lib.KeyFieldBasedPartitioner \
        -jobconf mapred.job.map.capacity=$map_con_num -jobconf mapred.job.reduce.capacity=$reduce_num \
        -jobconf mapred.map.max.attempts=10 -jobconf mapred.reduce.max.attempts=10 \
        -file $main_dir/hadoop_jobs/session/*.py \
        -file $main_dir/tools/hadoop_tool/py27.sh \
        -file $main_dir/tools/url_normalize/m \
        -cmdenv date_of_data=$date \
        -output ${output} \
        -input ${input} \
        -mapper "sh py27.sh mapper.py" \
        -reducer "./m"
 
if [ $? -ne 0 ]; then
    echo "[$0] [Error] [`date "+%Y-%m-%d %H:%M:%S"`] [$jobname] job failed !"
    exit -1
fi
#${hadoop} fs -touchz ${done_file}
 
echo "[$0] [NOTE] [`date "+%Y-%m-%d %H:%M:%S"`] [$jobname] hadoop job finished"
echo "=========================$jobname end ============================="
exit 0
```

多任务调度

```shell
#!/bin/bash
# -*- coding: utf-8 -*-
#
#===============================================================================
#            File:  start.sh [oneday-pretreat]
#           Usage:  
#                运行指定日期：    sh start.sh  20120104
#        正常运行(昨天):   sh start.sh
#        查看运行日志：    tail -f ../log/20120104/run_log_20120103.txt
#     Description: oneday-pretreat总控脚本
#    LastModified:  12/13/2012 15:29 AM CST
#         Created:  1/4/2012 11:16 AM CST
# 
#          AUTHOR:  wangqiwen(wangqiwen@*.com)
#         COMPANY:  baidu Inc
#         VERSION:  1.0
#            NOTE: 
#       input:  mergeOneDay和dump
#      output:  作为short-cut-pretreat的输入
#===============================================================================
 
#搭建执行环境
source ./build.sh
#读入路径、时间配置
if [ $# -eq 1 ];then
    date_check=`echo "$1" | sed -n '/^[0-9]\{8\}$/p'`
    if [ -z $date_check ];then
        # 如果字符串为空,表明输入参数不当
        echo "[`date "+%Y-%m-%d %H:%M:%S"`] [ERROR] date of start.sh input error ... 启动脚本的日期参数错误!"
        exit -1
    else
        source $ConfDir/vars.sh $1
    fi
else
    source $ConfDir/vars.sh
fi
 
#####################for mini#############################
export HADOOP_HOME=${rp_hadoop%/*/*}
export JAVA_HOME=${HADOOP_HOME%/*}/java6
# build.sh中读入BinDir
source $BinDir/oneday_onlyUrl_mini/mini/output/jjpack2text/conf/dlb_env.sh
export PATH=$PATH:$HADOOP_HOME/bin
##########################################################
 
#是否开启调试模式
if [ $debug_on -eq 1 ];then
        set -x
else
    set +x
fi
 
#导入公共函数
source ./common.sh #增加./,防止与环境变量重名
#日志初始化
init_log  #common.sh中定义
 
#重定向标准输入和输出到指定文件
exec 3<>$LogFile  #LogFile在conf/var.sh中定义
exec 1>&3 2>&1
 
log "$alarm_module_info" #模块信息
log "[`date "+%Y-%m-%d %H:%M:%S"`] [NOTE] load conf file 加载配置文件..."
#读入邮件配置
read_alarm_mail $ConfDir/mail.conf # read_alarm_mail源于common.sh
#读入短信配置
source $ConfDir/msg_conf.sh
#=========================hadoop任务函数封装===================
check_jobs_input()
{  # 参数: job type name warning msg_receiver 外部依赖才有短信报警
    [ $# -lt 5 ] && { echo "check_jobs_input input ($@) error ! ($#>= 5)";exit -1; }
    local my_job=$1
    local job_name="${my_job}-$date"
    local my_type=$2
    local hadoop_file="-"
    case $my_type in
    1)  # 内部依赖,超时仅发送邮件
        eval "hadoop_file=\$${my_job}_input_tag_in";;
    2)  # 外部依赖,超时发报警短信\短信，另外增加预警
        eval "hadoop_file=\$${my_job}_input_tag_out";;
    *)
        echo "check_jobs_input input error ! type=[1,2]"
        exit -1;;
    esac
    eval "local wait_time=\$${my_job}_wait_time" # 2012-5-22
    local name=$3
    local warning=$4  # 是否需要预警
    local msg_receiver=$5
    for((i=6;i<=$#;i++))
    do
        eval "msg_receiver=\"\$msg_receiver \${$i}\""
    done
    # 外部依赖，先等待，超时发出预警，继续等待最后时间
    if [ $warning -ne 0 ];then
        # 数据生成较晚，提醒相关人员关注
        eval "local wait_time_notice=\$${my_job}_wait_time_notice"
        # 验证${my_job}中是否定义提醒时间
        [ -e $wait_time_notice ] && { log "[`date "+%Y-%m-%d %H:%M:%S"`] [ERROR] $job_name ---[check_jobs_input] 未定义的变量: ${my_job}_wait_time_notice ";exit -1; }    
        wait_hadoop_file $rp_hadoop $wait_time_notice 3 $hadoop_file # 等待文件ready  2012-5-22
        return_value=$?
        if [ $return_value -ne 0 ];then
            rest_time=$(echo $wait_time_notice | awk '{print $0/12.0}')
            log "[`date "+%Y-%m-%d %H:%M:%S"`] [WARNING] [返回值: $return_value] $job_name 上游数据 ($date,$name) 还没生成,存在风险...再等待 $rest_time 小时..... "
            [  $alarm_mail_off -eq 0 ] && send_alarm_mail "[oneday-pretreat] [WARNING] $job_name 预警时间已到,请及时推进" "[`date "+%Y-%m-%d %H:%M:%S"`] [WARNING] [返回值:$return_value] $job_name 预警时间已到,上游数据 ($date,$name) 还未生成,存在风险,再等待 $rest_time 小时...请 [$alarm_module_RP_rd] 及时跟进, $alarm_module_info" # 邮件报警
            [  $alarm_msg_off -eq 0 -a $my_type -eq 2 ] && send_list_msgs  "[oneday-pretreat] [WARNING] [返回值]:$return_value] $job_name 预警时间已到,上游数据 ($date,$name) 还未生成,存在风险,再等待 $rest_time 小时,请 [$alarm_module_RP_rd] 及时跟进." $msg_receiver 
        else
            return 0  # 预警时间内，数据ready，函数退出
        fi
        # 最晚抢救时间已到，当天挖掘无法更新，进入自动补数据阶段
        eval "local wait_time_warning=\$${my_job}_wait_time_warning"
        # 验证${my_job}中是否定义预警时间
        [ -e $wait_time_warning ] && { log "[`date "+%Y-%m-%d %H:%M:%S"`] [ERROR] $job_name --- [check_jobs_input] 未定义的变量: ${my_job}_wait_time_warning ";exit -1; } 
        wait_hadoop_file $rp_hadoop $wait_time_warning 3 $hadoop_file # 等待文件ready  2012-5-22
        return_value=$?
        if [ $return_value -ne 0 ];then
            rest_time=$(echo $wait_time_warning | awk '{print $0/12.0}')
            log "[`date "+%Y-%m-%d %H:%M:%S"`] [WARNING] [返回值: $return_value ] $job_name 接口数据最晚等待时间已到! 上游数据 ($date,$name) 还没生成,当天挖掘赶不上,自动进入补数据阶段...再等待 $rest_time 小时...请及时处理."
            [  $alarm_mail_off -eq 0 ] && send_alarm_mail "[oneday-pretreat] [WARNING] $job_name 预警时间已到,请及时推进..." "[`date "+%Y-%m-%d %H:%M:%S"`] [WARNING] [返回值:$return_value] $job_name 接口数据最晚等待时间已到 !上游数据 ($date,$name) 还未生成,当天挖掘赶不上,自动进入补数据阶段,再等待 $rest_time 小时...请 [$alalarm_module_RP_rd] 及时跟进,$alarm_module_info" # 邮件报警
            [  $alarm_msg_off -eq 0 -a $my_type -eq 2 ] && send_list_msgs  "[oneday-pretreat] [WARNING] [返回值 $return_value ] $job_name 接口数据最晚等待时间已到 !,上游数据 ($date,$name) 还未生成,当天挖掘赶不上,自动进入补数据阶段,再等待 $rest_time 小时,请[ $alarm_module_RP_rd ]及时跟进." $msg_receiver
        else
            return 0   # 补数据成功，程序返回  
        fi
    fi
    # 补数据超时失败,程序退出
    wait_hadoop_file $rp_hadoop $wait_time 3 $hadoop_file # 等待文件ready  2012-5-22
    return_value=$?
    if [ $return_value -ne 0 ];then
        log "[`date "+%Y-%m-%d %H:%M:%S"`] [ERROR] [返回值: $return_value] $job_name 等待超时 ! 上游数据 ($date,$name) 未按时生成..."  # 打运行日志
        [  $alarm_mail_off -eq 0 ] && send_alarm_mail "[oneday-pretreat] [ERROR] $job_name 等待超时!" " [`date "+%Y-%m-%d %H:%M:%S"`][ERROR][返回值: $return_value] $job_name 失败! 上游数据 ($date,$name) 未按时生成..请联系 [$alarm_module_RP_rd] 处理,$alarm_module_info" # 邮件报警
        [  $alarm_msg_off -eq 0 -a $my_type -eq 2 ] && send_list_msgs  "[oneday-pretreat] [ERROR] [返回值: $return_value] $job_name 等待超时!上游数据 ($date,$name) 未按时生成...请 [$alarm_module_RP_rd] 处理,$alarm_module_info" $msg_receiver # 短信报警 
        exit -1 # 超时等待，退出
    fi
}
 
hadoop_dir_search()
{   # 参数: job_name type  name 
    # 仅用于接口数据的自动查找,替换
    [ $# -lt 3 ] && echo "[`date "+%Y-%m-%d %H:%M:%S"`] [ERROR] hadoop_dir_search input error ! ($# >= 3)"
    local job_name=$1
    local my_type=$2 # 区分正常产出数据(type=1)和转储日志(type非1)
    local name=$3
    local tmp_date='-'
    local tmp_path='-'
    local tmp_tag='-'
    eval "local days=\$${name}_findDays"
    eval "wait_hadoop_file \$rp_hadoop \$${name}_wait_time 3 \$${name}_tag"
    return_value=$?
    if [ $return_value -ne 0 ];then
        log "[`date "+%Y-%m-%d %H:%M:%S"`] [WARNING] [$job_name] 当天目录 ${name}_dir/$date/0000.done 不存在,请核实 !"
        [  $alarm_mail_off -eq 0 ] && send_alarm_mail "[oneday-pretreat] [WARNING] 上游数据 $name($date) 不存在!" "[`date "+%Y-%m-%d %H:%M:%S"`] [WARNING] 上游数据 $name($date) 不存在...请联系 [$alarm_module_RP_rd] 追查原因,$alarm_module_info"
        # 当天数据超时未生成,common_query 需要自动搜索最近的数据
        for((i=1;i<=$days;i++))
        do
            tmp_date=`date -d "-$i day $date" +%Y%m%d` # 获取前i天日期
            if [ $my_type -eq 1 ];then
                eval "tmp_path=\"\${${name}_dir%/*/*}/$tmp_date/0000\"" # 拼接临时目录----正常产出数据
                eval "tmp_tag=\"\${${name}_dir%/*/*}/$tmp_date/0000.done\"" # 拼接临时目录----正常产出数据
            else
                eval "tmp_path=\"\${${name}_dir%/*/*/*}/$tmp_date/0000/0000\"" # 拼接临时目录----转储日志
                eval "tmp_tag=\"\${${name}_dir%/*/*/*}/$tmp_date/0000/@manifest\"" # 拼接临时目录----转储日志
            fi
            $rp_hadoop fs -test -e $tmp_tag  # 检查默认的目录标记文件 [20130218]
            if [ $? -eq 0 ];then
                eval "${name}_dir=\"$tmp_path\""  # 更改原目录值
                eval "${name}_tag=\"$tmp_tag\""   # 更改原标记文件
                break
            else
                log "[`date "+%Y-%m-%d %H:%M:%S"`] [WARNING] [$job_name] $tmp_tag 不存在,请核实 !"
                [  $alarm_mail_off -eq 0 ] && send_alarm_mail "[oneday-pretreat] [WARNING] 上游数据 $name($tmp_date) 不存在!" "[`date "+%Y-%m-%d %H:%M:%S"`] [WARNING] 上游数据 $name($d) 不存在...请联系 [$alarm_module_RP_rd] 追查原因,$alarm_module_info"
            fi
        done
        [ $i -ge $days ] && exit -1
    fi
}
start_hadoop_jobs()
{  # 参数: jobname arg1 arg2 ...  不包括基本参数
    [ $# -lt 1 ] && echo "start_hadoop_jobs input error ! ($# >= 1)"
    local myjob=$1
    local myjob_name="${1}-$date"
    local args=""
    if [ $# -ge 2 ];then
        # 获取额外参数
        for((i=2;i<=$#;i++))
        do
            eval "args=\"$args \${$i}\""
        done
    fi
    #启动任务
    eval "cd \$${myjob}_local_dir"
    eval "\$shellBin start_hadoop.sh \$rp_hadoop \$${myjob}_input \$${myjob}_output \$myjob_name \$${myjob}_map_con_num \$${myjob}_reduce_num \$args"
    return_value=$?
    if [ $return_value -eq 0 ];then
        log "[`date "+%Y-%m-%d %H:%M:%S"`] [NOTE] [返回值: $return_value] $myjob_name finished ! $myjob_name 执行成功..."
        eval output=\$${myjob}_output
        ${rp_hadoop} cr -register ${output} -cronID $cronID # zk注册数据状态
        if [ $? -ne 0 ];then
            log "[`date "+%Y-%m-%d %H:%M:%S"`] [ERROR] $myjob_name zk状态注册失败.."
            [  $alarm_mail_off -eq 0 ] && send_alarm_mail "[oneday-pretreat] [ERROR] $myjob_name zk状态注册失败.."  " [`date "+%Y-%m-%d %H:%M:%S"`] [ERROR] $myjob_name zk状态注册失败...请联系 $alarm_module_stra_rd 处理,谢谢! $alarm_module_info"
        fi
    else
        log "[`date "+%Y-%m-%d %H:%M:%S"`] [ERROR] [返回值: $return_value] $myjob_name failed ! $myjob_name 执行失败..."
        [  $alarm_mail_off -eq 0 ] && send_alarm_mail "[oneday-pretreat] [ERROR] $myjob_name Failed !"  " [`date "+%Y-%m-%d %H:%M:%S"`] [ERROR] $myjob_name failed when running ! $myjob_name 执行过程中失败...请联系 $alarm_module_stra_rd 处理,谢谢! $alarm_module_info"
        exit -1
    fi
    cd -
}
 
#=======================启动子任务==============================
 
#---------------oneday_onlyUrl----------------------
#  作用: 抽取URL,去重,方便下一步的网页库查询           |
#  输入: mergeOneDay和database_dump                    |
#  输出: oneday_onlyUrl                                       |
#-------------------------------------------------------
jobname1="oneday_onlyUrl"
oneday_onlyUrl()
{
    # 等待接口数据
    check_jobs_input $jobname1 2  "mergeOneDay&database_dump" 1 $MOBILE_LIST_ALL # 外部依赖,需要预警
    #从集群上下载记录mergeOneDay信息的xml文件
    local_xml_mergeOneDay_file="${DataDir}/${mergeOneDay_tag##*/}" #提取文件名
    [ -e $local_xml_mergeOneDay_file ] && rm $local_xml_mergeOneDay_file # 删除已有文件
    sleep 5 # 等待5S，防止原xml文件不完整
    $rp_hadoop fs -copyToLocal $mergeOneDay_tag $DataDir #复制xml文件到本地
    cd $CheckDir # 2012-12-11
    $pythonBin mergeOneDay_check.py $local_xml_mergeOneDay_file #检验mergeOneDay数据源是否满足要求
    cd - # 2012-12-11
    return_value=$?
    if [ $return_value -ne 0 ];then
        log "[`date "+%Y-%m-%d %H:%M:%S"`] [ERROR] [返回值:$return_value] $jobname1 失败!上游数据 mergeOneDay-$date 缺失过多,不满足要求..."
        [  $alarm_mail_off -eq 0 ] && send_alarm_mail "[oneday-pretreat] [ERROR] [返回值:$return_value] $jobname1 失败!" " [`date "+%Y-%m-%d %H:%M:%S"`] [ERROR] $jobname1 失败!上游数据 mergeOneDay-$date 数据源缺失过多,不满足要求...请联系 [$alarm_module_RP_rd] 追查原因,$alarm_module_info"
        [  $alarm_msg_off -eq 0 ] && send_list_msgs  "[oneday-pretreat] [ERROR] [返回值:$return_value] $jobname1 失败!上游数据 mergeOneDay-$date 数据源缺失过多,不满足要求...请 [$alarm_module_RP_rd] 追查原因,谢谢! $alarm_module_info" $MOBILE_LIST_ALL
        exit -1
    fi
    $rp_hadoop fs -touchz $mergeOneDay_ok # 数据验证通过，创建标记文件，通知下游模块启动 
    start_hadoop_jobs "oneday_onlyUrl"
}
if [ $oneday_onlyUrl_pass -eq 0 ];then
    oneday_onlyUrl
    $rp_hadoop fs -touchz $mergeOneDay_ok # 数据验证通过，创建标记文件，通知下游模块启动 
    ${rp_hadoop} cr -register $mergeOneDay_ok -cronID $cronID # 注册数据状态
    if [ $? -ne 0 ];then
        log "[`date "+%Y-%m-%d %H:%M:%S"`] [ERROR] mergeOneDay_ok zk状态注册失败.."
        [  $alarm_mail_off -eq 0 ] && send_alarm_mail "[oneday-pretreat] [ERROR] mergeOneDay_ok zk状态注册失败.."  " [`date "+%Y-%m-%d %H:%M:%S"`] [ERROR] mergeOneDay_ok zk状态注册失败...请联系 $alarm_module_stra_rd 处理,谢谢! $alarm_module_info"
        fi
fi
 
#-----------oneday_onlyUrl_mini-------------------------
#  作用: mini网页库查询                                |
#  输入: oneday_onlyUrl                                |
#  输出: oneday_onlyUrl_mini                           |
#-------------------------------------------------------
jobname2="oneday_onlyUrl_mini"
oneday_onlyUrl_mini()
{
     
    check_jobs_input $jobname2 1  "oneday_onlyUrl" 0 $MOBILE_LIST_ALL # 内部依赖
    cd $oneday_onlyUrl_mini_local_dir/mini/output
    # ----------通过vars.sh中的路径配置,python程序解析修改test.xml
    less $ConfDir/oneday_onlyUrl_mini_conf.xml | awk -v input=$oneday_onlyUrl_mini_hdfs_input -v output=$oneday_onlyUrl_mini_hdfs_output -v bin_path="$oneday_onlyUrl_mini_bin_path" '{
        if($0~/<hdfs_input>.*<\/hdfs_input>/)
            print "\t\t<hdfs_input>"input"</hdfs_input>"
        else if($0~/<hdfs_output>.*<\/hdfs_output>/)
            print "\t\t<hdfs_output>"output"</hdfs_output>"
        else if($0~/<bin_path>.*<\/bin_path>/)
            print "\t\t<bin_path>"bin_path"</bin_path>"
        else
            print $0
    }' > test.xml 
    echo "=======================mini网页库========================="
    $pythonBin Xml2stream.py test.xml  # 启动网页库查询,后台操作
    ${rp_hadoop} fs -test -e "${oneday_onlyUrl_mini_output}/part-00999" # part-00999存在才证明mini查询成功
    if [ $? -eq 0 ];then
        # 任务执行完毕后，创建便于检测的tag文件
        $rp_hadoop fs -touchz "${oneday_onlyUrl_mini_output%/*}/${oneday_onlyUrl_mini_output##*/}.done"
        ${rp_hadoop} cr -register ${oneday_onlyUrl_mini_output} -cronID $cronID # 注册数据状态
        if [ $? -ne 0 ];then
            log "[`date "+%Y-%m-%d %H:%M:%S"`] [ERROR] oneday_onlyUrl_mini zk状态注册失败.."
            [  $alarm_mail_off -eq 0 ] && send_alarm_mail "[oneday-pretreat] [ERROR] oneday_onlyUrl_mini zk状态注册失败.."  " [`date "+%Y-%m-%d %H:%M:%S"`] [ERROR] oneday_onlyUrl_mini zk状态注册失败...请联系 $alarm_module_stra_rd 处理,谢谢! $alarm_module_info"
        fi
    fi
    # 删除多余的临时目录
    echo "----清除临时文件 $oneday_onlyUrl_mini_hdfs_tmp ------"
    #exec 1>/dev/null 2>&1 # 将以下删除信息扔到位桶里
    for dir in $oneday_onlyUrl_mini_hdfs_tmp
    do
 
        echo "删除临时目录:${oneday_onlyUrl_mini_output%/*}/$dir"
        $rp_hadoop fs -rmr "${oneday_onlyUrl_mini_output%/*}/$dir" &>/dev/null
    done
    #exec 1>&3 2>&1  # 恢复重定向到日志文件
    echo "========================结束============================"
    cd -
    log "[`date "+%Y-%m-%d %H:%M:%S"`] [NOTE] $jobname2 百灵库查询完毕..."
}
 
if [ $oneday_onlyUrl_mini_pass -eq 0 ];then
    oneday_onlyUrl_mini 
fi
#------------oneday_baiduid---------------------------------
#  作用:                                               |
#  输入: mergeOneDay和baiduid                          |
#  输出: oneday_baiduid                                |
#-------------------------------------------------------
jobname3="oneday_baiduid"
#-----------后台等待baiduid---------------------
oneday_baiduid(){
    check_jobs_input $jobname3 2  "mergeOneDay" 0 $MOBILE_LIST_ALL # 外部依赖
    start_hadoop_jobs $jobname3 $oneday_baiduid_max_freq $oneday_baiduid_min_time 
}
 
if [ $oneday_baiduid_pass -eq 0 ];then
    oneday_baiduid &  # 后台运行
fi
 
#------------oneday_onlyUrl_mini_plus------------------
#  作用: 网页库查询结果上附加unifyUrl和commonQuery     |
#  输入: oneday_onlyUrl_mini,urlunify,commonQuery      |
#  输出: oneday_onlyUrl_mini_plus                      |
#-------------------------------------------------------
jobname4="oneday_onlyUrl_mini_plus"
oneday_onlyUrl_mini_plus(){
    hadoop_dir_search $jobname4 1 "common_query" # 检查并查找可替代的commonQuery数据  统计产出(2013-5-15)
    hadoop_dir_search $jobname4 1 "oneday_onlyUrl_mini" # 检查并查找可替代的mini数据  原始日志
    #check_jobs_input $jobname4 1  "oneday_onlyUrl_mini" 0 $MOBILE_LIST_STRA  # 内部
    oneday_onlyUrl_mini_plus_input="$urlunify_dir $common_query_dir $oneday_onlyUrl_mini_dir"
    start_hadoop_jobs $jobname4 $oneday_onlyUrl_mini_plus_input_str1 $oneday_onlyUrl_mini_plus_input_str2 $oneday_onlyUrl_mini_plus_input_str3
    reset_common_query # 恢复common_query原始值
}
if [ $oneday_onlyUrl_mini_plus_pass -eq 0 ];then
    oneday_onlyUrl_mini_plus
fi
 
 
#------------oneday_baiduid_plus----------------------------
#  作用: oneday_baiduid附加URL信息                         |
#  输入: oneday_baiduid和oneday_onlyUrl_mini               |
#  输出: oneday_baiduid_plus                               |
#-------------------------------------------------------
jobname5="oneday_baiduid_plus"
oneday_baiduid_plus()
{
    check_jobs_input $jobname5 1  "oneday_baiduid|oneday_onlyUrl_mini_plus" 0 $MOBILE_LIST_STRA # 内部依赖
    start_hadoop_jobs $jobname5 $oneday_baiduid_plus_input_str1 $oneday_baiduid_plus_input_str2
}
 
if [ $oneday_baiduid_plus_pass -eq 0 ];then
    oneday_baiduid_plus
fi
 
#------------oneday_uid_plus----------------------------
#  作用: baiduid映射成uid                              |
#  输入: baiduid-uid-mapping和oneday_baiduid_plus      |
#  输出: oneday_uid_plus                           |
#-------------------------------------------------------
jobname6="oneday_uid_plus"
#-----------后台等待baiduid-uid-mapping-------------------
oneday_uid_plus(){
    hadoop_dir_search $jobname6 1 "baiduid_uid_mapping" # 检查并查找可替代的baiduid-uid数据---程序产出
    check_jobs_input $jobname6 1  "oneday_baiduid_plus" 0 $MOBILE_LIST_STRA # 内部依赖
    oneday_uid_plus_input="${baiduid_uid_mapping_dir} ${oneday_baiduid_plus_output}"
    start_hadoop_jobs $jobname6  $oneday_uid_plus_input_str1 $oneday_uid_plus_input_str2 
    reset_baiduid_uid_mapping # 恢复baiduid_uid_mapping原始值
}
 
if [ $oneday_uid_plus_pass -eq 0 ];then
    oneday_uid_plus  & # 后台运行
fi
 
#------------oneday_activeBaiduid_plus------------------
#  作用: baiduid映射成uid                              |
#  输入: activeBaiduid和oneday_baiduid_plus           |
#  输出: oneday_activeBaiduid_plus                     |
#-------------------------------------------------------
jobname7="oneday_activeBaiduid_plus"
#-----------后台等待 activeBaiduid-------------------
oneday_activeBaiduid_plus(){
    hadoop_dir_search $jobname7 1 "activeBaiduid" # 检查并查找可替代的baiduid-uid数据---程序产出
    check_jobs_input $jobname7 1  "oneday_baiduid_plus" 0 $MOBILE_LIST_STRA # 内部依赖
    oneday_activeBaiduid_plus_input="${activeBaiduid_dir} ${oneday_baiduid_plus_output}"
    start_hadoop_jobs $jobname7  $oneday_activeBaiduid_plus_input_str1 $oneday_activeBaiduid_plus_input_str2 
    reset_activeBaiduid # 恢复activeBaiduid原始值
}
 
if [ $oneday_activeBaiduid_plus_pass -eq 0 ];then
    oneday_activeBaiduid_plus
fi
 
#------------oneday_dump_urlUnify----------------------
#  作用: 用网页库查询结果归一化全库数据database_dump   |
#  输入: databse_dump和oneday_onlyUrl_mini             |
#  输出: oneday_dump_urlUnify                          |
#-------------------------------------------------------
jobname8="oneday_dump_urlUnify"
oneday_dump_urlUnify(){ # 后台运行
    check_jobs_input $jobname8 2  "database_dump" 0 $MOBILE_LIST_ALL # 外部依赖
    check_jobs_input $jobname8 1  "oneday_onlyUrl_mini_plus" 0 $MOBILE_LIST_STRA # 内部依赖
    start_hadoop_jobs $jobname8 $oneday_dump_urlUnify_input_str1 $oneday_dump_urlUnify_input_str2
}
 
if [ $oneday_dump_urlUnify_pass -eq 0 ];then
    oneday_dump_urlUnify  &
fi
 
#------------------end-----------------------
log "[`date "+%Y-%m-%d %H:%M:%S"`] [NOTE] oneday-pretreat success ! oneday-pretreat 模块执行完毕！"
 
#关闭重定向
exec 3<&-
```


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

- 待补充

## 总结

- [图解Git命令](https://www.bbsmax.com/A/kmzLrMwG5G/)
- [牛逼哄哄的 Git 命令动画演示，一看就懂！](https://www.cnblogs.com/lzkwin/p/12658029.html)，[CS Visualized: Useful Git Commands](https://links.jianshu.com/go?to=https%3A%2F%2Fdev.to%2Flydiahallie%2Fcs-visualized-useful-git-commands-37p1)
![](https://tukuimg.bdstatic.com/scrop/80a43c9d8428273cc9cabe71256eb9ef.gif)


## VSCode 

### 在线体验（解决访问受限问题）

【2021-2-10】用vscode在线查看github代码库，方法：
- （1）加`1s` ，详见：[github1s](https://github.com/conwnet/github1s)
- （2）com→`dev`: [VSCode福利来了，在github上面像本地一样开发](https://zhuanlan.zhihu.com/p/398867445)
  - dev == 点击键盘上的 . 符号进入 web editor
  - 问题：【2021-8-17】没有push功能，修改的东西如何提交？是要付费才行吗？
- github新功能，在线编辑IDE，[codespace](https://github.com/features/codespaces)，Github 自从被微软收购后，和 vscode 的联动，真的是强强联手，从 GitHub Codespaces 和 GitHub Copilot 来看，好功能一个接一个

### 远程连接

[使用VScode连接远程服务器进行开发](https://zhuanlan.zhihu.com/p/141205262)
- 直接在插件中搜索ssh，即可找到Remote-SSH，点击install安装
- 左侧会出现一个远程资源管理的图标，选择SSH Targets，进入config配置文件
- 可选：通过跳板机连接服务器
- 点击SSH TARGETS下的服务器旁边的按钮纽行连接

配置文件

```shell
Host c00
    HostName xxx.xxx.xxx.xxx（跳板机IP）
    User lyfeng

Host c01
    HostName 192.168.0.10（内网地址）
    User lyfeng
    ProxyCommand "openssh的安装路径"\ssh.exe -W %h:%p -q c00
    # 连接c00, 再通过c00的局域网ssh到c01
```

## 基本概念

- Git有四个工作区域：
  - **工作目录**（Working Directory）
  - **暂存区**(Stage/Index)
  - **资源库**(Repository或Git Directory)
  - **git仓库**(Remote Directory)。
- [图](https://bbsmax.ikafan.com/static/L3Byb3h5L2h0dHAvd3d3LnJ1YW55aWZlbmcuY29tL2Jsb2dpbWcvYXNzZXQvMjAxNS9iZzIwMTUxMjA5MDEucG5n.jpg)
- [Git快速入门](https://www.cnblogs.com/polk6/p/git-introduce.html)
   - [图](https://images2017.cnblogs.com/blog/153475/201710/153475-20171013183602293-822234036.png)
- 文件的四种状态
  - **Untracked**:未跟踪, 此文件在文件夹中, 但并没有加入到git库, 不参与版本控制. 通过git add 状态变为Staged.
  - **Staged**:暂存状态. 执行git commit则将修改同步到库中, 这时库中的文件和本地文件又变为一致, 文件为Unmodify状态. 执行git reset HEAD filename取消暂存,文件状态为Modified;
  - **Mosified**:文件已修改, 仅仅是修改, 并没有进行其他的操作.
  - **Committed**: 文件已提交修改；
- [Git文件状态流程图](https://blog.csdn.net/leyangjun/article/details/52540590)
   - [图](https://img-blog.csdn.net/20160918100329572?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQv/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/Center)
- .git的目录结构：进入隐藏的 .git 目录之后可以看到如上图所示结构
  - 核心文件： config，objects，HEAD，index，refs 这 5 个文件夹

提交的准则
1. 除了源码相关的东西之外，其他build产生的东西（如：maven的target文件夹，.idea文件夹等），均不能提交进入源码仓库，添加到 .gitignore 文件中忽略掉。
2. 撰写规范的提交说明。一份好的提交说明可以帮助协作者更轻松更有效地配合工作。
3. 要严格按照我们定的流程切换到指定分支，开发相应的功能。

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
- Git-Flow 模式很好解决了不同特性之间**并行开发**需要的工作方式。每一个特性都能同时开工，结合敏捷开发的例子，每个迭代开始时从主干分支拉出一个特性分支，命名结构参考feature/xxx-232，所有关于此特性的开发都在此分支上进行，当开发完成后把特性分支合并回主干分支上，测试通过后进行发布。

Git原理及如何选择分支模式
- ![](https://p3-tt.byteimg.com/origin/pgc-image/02fd057c7eed4e6ba7abaded26e5401e?from=pc)

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

【2021-12-15】[Git Flow 工作流程使用寿命](https://www.toutiao.com/i7041475885186187783)

分支简述
- ![](https://p3.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/8754e82b34e54524bba712bbd1dbb1fd?from=pc)

主要分支简述
- 天蓝色圆点 所在的线源码的**主线**（master）。
  - master分支用来记录官方发布轨迹
  - 天蓝色方形 指向的节点就是每一个发布版本的**标签**（tag）。
- 紫色圆点 所在的线为**主要分支**线（develop）。
  - 集成分支，用来记录开发新功能的轨迹。
  - ![](https://p3.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/6e0a33e7571d4543b33c00ae21f4ec0b?from=pc)
- 注意：
  - 除了 master 主线和 develop 主分支线，其他的分支都是**临时**分支，有一定的生命周期的，其余的工作流程分支都是围绕这两个分支之间的区别进行的。
- 其它分支
  - 橙色圆点 所在的线为**新功能**开发分支线（feature）。
    - 每一个新的功能都应该创建一个独立的分支，从develop分支中派生出来。当功能完成后，要合并（merged）回develop分支，合并后它的生命周期就结束。新功能分支**不会**与master分支有直接的交汇。
    - 所有新功能分支会合并到develop分支。但这个Gitflow工作流不会在此结束。
    - ![](https://p3.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/6e0a33e7571d4543b33c00ae21f4ec0b?from=pc)
  - 绿色圆点 所在的线为新版本**发布**线（release）。
    - 一旦开发的功能已经满足发布条件（或预定发布日期接近），应该合并所有满足发布条件的新功能分支到develop分支中
    - 然后开一个**发布**分支（Release）发布版本。这个分支不能再添加新的功能，只有bug修复和该版本为导向的任务。
    - 一旦到了发布日期，Release就要合并回master发布，并打出版本标签。
    - 另外，还需要合并回develop分支。
    - ![](https://p3.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/be9a0373c9b34ec98b56e8deb11d6dda?from=pc)
  - 红色圆点 所在的线为发布版本**bug修复**线（hotfix）。
    - 维护分支也就是线上bug修复分支，使用来快速修复生产环境的紧急问题。
    - 唯一一个开放过程中直接从master分支派生来的分支。快速的修复问题后，它应该被合并回master和develop（或者当前发布分支），然后，master分支需要打一个版本标签。
    - 一个专门的错误修复开发线，可以让团队在不等待下一个发布周期，导致中断工作流程情况下解决问题。可以将维护分支当做主要的问题修复分支，与master并行。
    - ![](https://p3.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/4aed012a912044be806ef6b6f9e6e7e2?from=pc)

命名约定
- 主分支名称：master
- 主开发分支名称：develop
- 标签（tag）名称：v*.RELEASE，其中”*“ 为版本号，“RELEASE”大写，如：v1.0.0.RELEASE
- 新功能开发分支名称：feature-* or feature/*，其中 “*” 为新功能简述，如：feature-item-activity-list
- 发布分支名称：release-* or release/*，其中 * 为版本号，“release”小写，如：release-1.0.0
- master的bug修复分支名称：hotfix-* or hotfix/*，其中 * 为bug简述，如：hotfix/item-update-bug


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

# 拉取远程仓库，并与本地仓库的代码合并
# git pull [remote]  [branch]
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
git checkout -b dev origin/dev # 创建远程dev分支轨迹版本

git branch -d dev # 删除分支
git branch -D branch_2 # 删除本地分支，即使尚未合并，这也会删除该分支！

git push origin dev # 注意：本地分支提交后，别人才能看到分支
git push -u origin develop # 推送到服务器

git checkout -- myfile #从本地仓库恢复文件（用于撤销本地修改）

git checkout 
git checkout 分支名称 # 切换分支

git stash save # 临时存储所有已修改的跟踪文件
git stash pop # 恢复最近存放的文件。
git stash list # 列出所有隐藏的变更集。
git stash drop # 将丢弃最近存放的变更集。
git stash apply # 恢复工作现场
git stash apply stash@{0} # 恢复指定的工作现场，当你保存了不只一份工作现场时

git merge dev # 合并分支dev到master

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

git diff # 此命令显示尚未暂存的文件差异，查看当前没有add 的内容修改
git diff HEAD # 查看当前没有add和commit的改动
git status # 同上
git diff --cached # 查看已经add 没有commit 的改动
git diff –staged # 此命令显示暂存区域中的文件与当前最新版本之间的差异
git diff 版本号码1 版本号码2 # 查看任意两个版本之间的改动
git diff 版本号码1 版本号码2  src # 比较两个版本号码的src 文件夹的差异
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

### fetch

git fetch 有四种基本用法
1. git fetch
  - 这将更新git remote 中所有的远程repo 所包含分支的最新commit-id, 将其记录到.git/FETCH_HEAD文件中
2. git fetch remote_repo
  - 这将更新名称为remote_repo 的远程repo上的所有branch的最新commit-id，将其记录。 
3. git fetch remote_repo remote_branch_name
  - 这将这将更新名称为remote_repo 的远程repo上的分支： remote_branch_name
4. git fetch remote_repo remote_branch_name:local_branch_name
  - 这将这将更新名称为remote_repo 的远程repo上的分支： remote_branch_name ，并在本地创建local_branch_name 本地分支保存远端分支的所有数据。

FETCH_HEAD： 是一个版本链接，记录在本地的一个文件中，指向着目前已经从远程仓库取下来的分支的末端版本。


### pull

git pull 操作其实是git fetch 与 git merge 两个命令的集合。
- git pull 等效于先执行 git **fetch** origin 当前分支名, 再执行 git **merge** FETCH_HEAD.

如果要合并代码就并不一定要用git merge命令了，也可以用git pull命名的，比如要把远程origin仓库的 xx 分支合并到本地的 yy 分支，可以有如下两种做法。

```shell
#（1）第一种，传统标准的做法：
# 举例说明：将远程origin仓库的xx分支合并到本地的yy分支。
git fetch origin xx # fetch到远程仓库目标分支的最新commit记录到  ./git/FETCH_HEAD文件中
git checkout yy # 切换到要合并的分支
git merge FETCH_HEAD # 将目标分支最新的commit记录合并到当前分支

# （2）第二种，直接使用pull命令，将远程仓库的目标分支合并到本地的分支：
# git pull <remoterepo_name> <branch_name> 
# 举例说明：将远程origin仓库的xx分支合并到本地的yy分支
git checkout yy
git pull origin xx
# （3）第三种
git checkout xx
git pull   # 如果本地没有xx分支的，这一步都可以不执行。
git checkout yy  # 切换到yy分支
git merge xx # 将xx分支合并到yy分支  这一步可以加上 --no-ff 参数，即 git merge --no-ff

```

### cherry-pick

[git 教程 --git cherry-pick 命令](https://zhuanlan.zhihu.com/p/355413226)

一般代码的合并分为两种：一种是**整个分支**的合并，一个是挑选**部分**的commit来合并, 使用指令git cherry-pick。

git cherry-pick基础用法

```shell
# ------ （1）基础用法 --------
# 挑选一个commit-id合并
# 注意：合并过来的commit-id将会变掉，产生一个新的commit-id，跟原来的不在相同
git cherry-pick commit-id

# 挑选多个commit-id合并
git cherry-pick commit-idA commit-idB

# 挑选连续的多个commit-id合并
# 该指令是将从commit-idA开始到commit-idB之间的所有commit-id提交记录都合并过来，需要注意的是，commit-idA必须比commit-idB提前提交，也就是说在被挑选的分支上，先有的commit-idA，然后才有的commit-idB
git cherry-pick commit-idA..commit-idB

# 第一步：需要合并人解决对应的冲突文件，然后提交到暂存区
git add . 
# 第二步：使用下面的命令继续执行
git cherry-pick --continue
```

（2）高级用法 

使用上面的指令基本上可以玩转很大部分的场景，但是总有一些我们预想不到或者相对不是很丝滑的场景

① 合并冲突：
- 在实际合并的过程中，总有一些冲突的情况，遇到这些情况下，该如何使用cherry-pick的组合命令来解决问题?
- 首先在使用cherry-pick时，如果遇到了代码冲突，其实合并过程会停止，需要使用其他的方式来继续对应的操作

② 继续合并--continue
- 第一步：需要合并人解决对应的冲突文件，然后提交到暂存区
  - git add . 
- 第二步：使用下面的命令继续执行
  - git cherry-pick --continue

![](https://pic4.zhimg.com/80/v2-3e2afc3e1495e3427e31546488b89703_1440w.jpg)

③ 放弃合并，回归原始状态--abort
- 使用当前的指令，合并的动作暂停，并且回归到操作前的样子
  - git cherry-pick --abort

![](https://pic1.zhimg.com/80/v2-bdaa65e8c73bbcf49648a7419874ba00_1440w.jpg)

④ 放弃合并，保留状态 --quit
- 使用当前的指令，会保留车祸现场，退出cherry-pick
  - git cherry-pick --quit


### git lfs

【2021-6-7】git大文件管理，[Git LFS操作指南](https://zzz.buzz/zh/2016/04/19/the-guide-to-git-lfs/)
- Git LFS（Large File Storage, 大文件存储）是可以把音乐、图片、视频等指定的任意文件存在 Git 仓库之外，而在 Git 仓库中用一个占用空间 1KB 不到的文本指针来代替的小工具。通过把大文件存储在 Git 仓库之外，可以减小 Git 仓库本身的体积，使克隆 Git 仓库的速度加快，也使得 Git 不会因为仓库中充满大文件而损失性能。
- 使用 Git LFS，在默认情况下，只有当前签出的 commit 下的 LFS 对象的当前版本会被下载。此外，我们也可以做配置，只取由 Git LFS 管理的某些特定文件的实际内容，而对于其他由 Git LFS 管理的文件则只保留文件指针，从而节省带宽，加快克隆仓库的速度；也可以配置一次获取大文件的最近版本，从而能方便地检查大文件的近期变动。详见后文进阶使用

普通场景不论是针对小型的代码文本文件、还是比较大型的图片文件，在相关变更从本地提交到远端仓库时，所有的相关文件资源都会完整的存储在git server。就图片中的例子而言，如果图片文件越来越多，改动频次越来越大，仓库的体积将极速膨胀起来。

Git 是业界流行的分布式版本控制工具，本地仓库与远端仓库同样保存了全量的文件和变更历史，这样让代码协作变得简单和高效。但也正因为如此，Git针对大型文件（例如图片、视频或其他二进制文件）的版本控制，也会存在一些问题，主要有两点：
- 效率变慢：不管实际上用户是否使用到这些大文件的历史，都需要把每一个文件的每一个版本下载到本地仓库。毫无疑问，下载耗时的增加给用户带来了更多的等待时间。
- 空间变大：一个Git仓库存放的大型的文件越多，加之伴随着其关联提交不断增多，Git仓库会以非常快的速率膨胀，占用更多的磁盘空间。

Git LFS 为了解决大文件托管的效率问题，提供了五大特性，抽象看来为：
- 更大：支持GB级别的大文件版本控制。
- 更小：让Git仓库空间占用减小。
- 更快：仓库的克隆和拉取更快。
- 透明：Git使用上对用户完全透明。
- 兼容：权限控制上完全兼容（兼容Codeup权限控制）。


LFS处理流程

- ![](https://help-static-aliyun-doc.aliyuncs.com/assets/img/zh-CN/4613725161/p240002.png)

参考：[如何使用Git LFS](https://help.aliyun.com/document_detail/206889.html)

安装

```shell
curl -s https://packagecloud.io/install/repositories/github/git-lfs/script.deb.sh | sudo bash
yum install git-lfs
git lfs install
```


使用方法
- 执行 git lfs install 开启lfs功能
- 使用 git lfs track 命令进行大文件追踪 例如git lfs track "*.png" 追踪所有后缀为png的文件
- 使用 git lfs track 查看现有的文件追踪模式
- 提交代码需要将gitattributes文件提交至仓库. 它保存了文件的追踪记录
- 提交后运行git lfs ls-files 可以显示当前跟踪的文件列表
- 将代码 push 到远程仓库后，LFS 跟踪的文件会以『Git LFS』的形式显示:
- clone 时 使用'git clone' 或 git lfs clone均可

限制
- Window平台，单个文件不支持超过4G，issues 2434
- Window用户必须保证已经安装Git Credential Manager，否则可能导致操作被无限挂起，issues 1763
- 不同于Gitlab硬编码的LFS下载token超时时间(30分钟)，Codeup会根据将要下载的文件列表动态计算token超时时间，但是如果位于网络环境不好的环境，仍旧可能导致token超时的情况。如果需要根据需求调整，可以联系Codeup系统管理员处理。


## git命令问题

### dev分支push被拒

【2021-9-28】参考[地址](https://blog.csdn.net/whiteBearClimb/article/details/118733543)，错误信息：

```
To https://git.lianjia.com/aisearch/speech/nlu-service.git
 ! [remote rejected] dev-wqw -> dev-wqw (pre-receive hook declined)
error: failed to push some refs to 'https://git.lianjia.com/aisearch/speech/nlu-service.git'
```

分析：
- 原因1：本地git没有配置好用户信息
  - 解决：添加配置信息
    - 配置gitlab的邮箱：git config user.email jojo.jiang@XXXXadmin.com
    - 配置gitlab用户名：git config --global user.name “jojo.jiang”
    - 查看：git config --list
    - 随便修改某个文件，直接提交：git push origin dev-wqw （这个步骤不能省）
- 原因2：自身权限不够（mainteiner以下），dev分支被protected
  - 解决：找管理员提升权限


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

### 不能撤销本地修改(error:path…is unmerged)

【2021-12-1】[不能撤销本地修改(error:path…is unmerged)](https://kb.kaifa99.com/git/post_228038)

- 做了错误操作，应该先进行重置，先取消暂存文件，然后签出，再恢复本地更改。

```shell
git reset foo/bar.txt # 重置
git checkout foo/bar.txt # 恢复本地
```

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

缩进统一：tab -> 4个空格，只需在代码文件中加一行

```python
# */* vim: set expandtab ts=4 sw=4 sts=4 tw=400: */
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

【2017-12-16】远程文件传输的几种方式：
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
- Git LFS


### nc（NetCat，瑞士军刀）

[NetCat](http://netcat.sourceforge.net/)（简称nc），在网络工具中有“**瑞士军刀**”美誉，其有Windows和Linux的版本。
- 因为它**短小精悍**（1.84版本也不过25k，旧版本或缩减版甚至更小）、**功能实用**，被设计为一个简单、可靠的网络工具，可通过TCP或UDP协议传输读写数据。
- 还是一个网络应用**Debug分析器**，因为它可以根据需要创建各种不同类型的网络连接。
- 参考：[nc命令详解](https://www.cnblogs.com/wenbiao/p/3375811.html)

【2021-12-8】亲测，使用nc命令局域网跨系统传输大文件夹（13G），mac → Ubuntu，Windows也可以安装，但安装包被win10拦截

安装：
- Windows系统安装：[nc下载链接](https://eternallybored.org/misc/netcat/)，把解压的文件存到c:\WINDOWS\system32路径下。
打开cmd 输入nc -help，查看命令使用方法。
- linux/mac一般自带，安装命令如下：

```shell
# linux yum
yum install -y nc
# linux rpm
rpm -q nc
```

参数：
- -g<网关> 设置路由器跃程通信网关，最多可设置8个。
- -G<指向器数目> 设置来源路由指向器，其数值为4的倍数。
- -h 在线帮助。
- -i<延迟秒数> 设置时间间隔，以便传送信息及扫描通信端口。
- -l 使用监听模式，管控传入的资料。
- -n 直接使用IP地址，而不通过域名服务器。
- -o<输出文件> 指定文件名称，把往来传输的数据以16进制字码倾倒成该文件保存。
- -p<通信端口> 设置本地主机使用的通信端口。
- -r 乱数指定本地与远端主机的通信端口。
- -s<来源地址> 设置本地主机送出数据包的IP地址。
- -u 使用UDP传输协议。
- -v 显示指令执行过程。
- -w<超时秒数> 设置等待连线的时间。
- -z 使用0输入/输出模式，只在扫描通信端口时使用。

注意：
  - 端口范围(1024,65535)
  - 发送、接收顺序不限

用法：

```shell
# （0）远程聊天：a与b两台机器
# --- 接收 ----
nc -l 1234  # a端开启监听
nc -lp 22222 # 或者
# --- 发送 ----
nc  192.168.200.27 1234 # b端开启
nc -nv 40.2.214.139 22222 # 或者

# （1）远程复制
#     s1(发送端) → s2(接收端)
nc -l 1234 > 1234.txt # s2上开通监听端口1234
nc -w 1 192.168.200.27 1234 < abc.txt # 发送端，传入文件abc.txt

nc -lp 22222 > log.rar # 接收端
nc -nc -vn 26.5.189.16 22222 < log.rar # 发送端

# 发送完后自动断开连接（超时3s）
nc –n ip port > yyy # 接收
nc –n –l –p port –vv –w 3 < xxx # 发送

# 传目录
nc -l 9995 | tar xfvz - # 发送端
tar cfz - * | nc 10.0.1.162 9995 # 发送端，当前目录

# （2）硬盘/分区 克隆
#     基本相似，由dd获得硬盘或分区的数据，然后传输即可。克隆硬盘或分区的操作，不应在已经mount的的系统上进行。
nc -l -p 1234 | dd of=/dev/sda # s2开启监听
dd if=/dev/sda | nc 192.168.200.27 1234 # s1上开始传输

# （3）端口扫描
nc -nvv 192.168.0.1 80 //扫描 80端口
nc -v www.thanks.live 80 # 检测端口80是否可用
nc -v -w 1 192.168.200.29 -z 20-30 # 从20依次扫描到30
nc -v -z -w2 192.168.0.3 1-100 # TCP端口扫描
nc -u -z -w2 192.168.0.1 1-1000 # UDP扫描192.168.0.3 的端口 范围是 1-1000

# （4）telnet服务器（远程登录）
nc -l -p 9995 -e bash # 服务端
nc 10.200.0.79 9995 # 客户端
```



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



