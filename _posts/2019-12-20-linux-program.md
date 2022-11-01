---
layout: post
title:  Linux程序设计
subtitle:   Linux程序开发
date:   2019-12-20 15:43:00
author:  鹤啸九天
categories: 编程语言
tags: Linux 编程技能 C/C++ make
excerpt: Linux程序开发，含C/C++编译工具（make）
mathjax: true
header-img: img/post-bg-ios10.jpg
catalog: true
permalink: /linux-program
---

* content
{:toc}

# Linux 程序设计 阅读笔记

## [参考链接](https://github.com/wangpengcheng/wangpengcheng.github.io/tree/master/_posts)：

- [Linux内核文档首页](https://www.kernel.org/doc/Documentation/)
- [Linux文档](https://linux.die.net/)
- [Linux c 开发手册](https://legacy.gitbook.com/book/wizardforcel/linux-c-api-ref/details)
- [Linux Kernel API](https://www.kernel.org/doc/htmldocs/kernel-api/index.html)
- [书中代码地址](http://www.wrox.com/WileyCDA/WroxTitle/Beginning-Linux-Programming-4th-Edition.productCd-0470147628,descCd-DOWNLOAD.html)


## 第一章 入门

#### 1.1.1  unix
_参考链接：_ [POSIX标准总体分析](https://blog.csdn.net/novagx/article/details/2077561);[POSIX](https://baike.baidu.com/item/POSIX/3792413?fr=aladdin)

unix系统特点

- 简单性：
- 集中性：
- 可重用组件
- 过滤器
- 开放的文件格式
- 灵活性

几乎所有的UNIX编写的程序都可以在Linux上编译运行

GNU项目软件：

- GCC:GNU编译器集，包括GUN c
- G++：c++编译器，是GCC的一部分。
- GDB:源代码级别的调试器
- GNU make:NUIX make李明亮的免费版本
- Bison:与UNIX yacc兼容的语法分析生成器。
- bash:命令与解释器
- GNU Emacs:文本编辑器计环境

linux支持的编程语言：

![linux支持的编程语言](https://wangpengcheng.github.io/img/2019-08-14-19-05-38.png)

普通用户可执行程序搜索路径

- `/bin`：二进制文件目录，用于存放启动系统时用到的程序
- `/usr/bin`：用户二进制文件目录，用于存放启动系统时用到的程序
- `/usr/local/bin`：本地二进制目录，用于存放软件安装的程序
- `/usr/sbin`或`/sbin`：root登录后的PATH变量和程序存在的路径
- `/opt`:第三方应用程序，可能被安装的目录。

注意当操作系统升级的时候，只有目录`/opt`和`/usr/local`里面的内容需要保留，对于系统级应用程序，建议放在`/usr/local`中，个人应用程序放在`home`文件夹中。

#### 1.2.4 开发系统引导
_参考链接：_ [Linux系统目录结构说明](https://blog.csdn.net/mzl87/article/details/79673012);[Linux 系统目录结构](https://www.runoob.com/linux/linux-system-contents.html);[ubuntu获取源码方法](https://blog.csdn.net/Oliverlyn/article/details/55272286)


头文件位置:/usr/include,特定版本依赖，一般都在`/usr/include/sys`或者`/usr/include/linux`中

库文件:一般存储在`/lib`和`/usr/lib`目录中。包括`.a`静态函数库和`.so`动态函数库。

注意：当静态库被多个应用程序使用时，内存中就会存在同一函数的多个副本，将大量消耗内存和磁盘空间。

额外的搜索路径可以在/etc/ld.so.conf中配置。

## 第二章 shell程序设计

Linux中一般工具的开发都是先用shell实现，当追求速度时，再使用c/c++,Perl或者其它语言实现。

![内核应用程序关系](https://wangpengcheng.github.io/img/2019-08-14-19-49-19.png)

shell中*匹配字符串，`?`匹配单个字符，`[]`和`{}`匹配多个字符串。

```shell
more `grep -l POSIX`

#等价于

more ${grep -l POSIX *}
```
脚本中第一行的`#!/bin/bash`告诉脚本它的执行软件。注意绝对路径不要超过32个字符，因为老版本的识别不了。

shell中变量直接声明，使用时使用`$`，赋值时等号两边不能有空格。
shell中"'"只是输出字符串，"""进行变量解析。

**环境变量**

![环境变量表格](https://wangpengcheng.github.io/img/2019-08-14-20-08-07.png)

**参数变量**
当脚本运行时带有参数时，一些额外的变量就会被创建。环境变量`$#`始终存在，只是当无参数传递时为0；

![输入参数变化](https://wangpengcheng.github.io/img/2019-08-14-20-10-42.png)

![$@和$*之间的区别](https://wangpengcheng.github.io/img/2019-08-14-20-13-14.png)

注意：$#是未知变量的个数

下面是简单的测试脚本程序

```shell
#!/bin/bash

#shell file name try_var

salutation="hello"
echo $salutation
echo "The parameter 0 is : $0"
echo "The parameter 1 is : $1"
echo "The parameter 2 is : $2"
echo "The parameter list is : $*"
echo "The parameter list is : $@"
echo "The user's home directory is $HOME "

echo "Please enter a new greeting "
read salutation
echo $salutation
echo "The script is now complete"
exit 0


```
输入： ./try_var.sh 1 2 3
输出：
```
hello
The parameter 0 is : ./try_var.sh
The parameter 1 is : 1
The parameter 2 is : 2
The parameter list is : 1 2 3
The user's home directory is /home/wangpengcheng 
Please enter a new greeting 
123
123
The script is now complete
```

#### 2.6.2 条件

`test`或`[`命令，使用`[`时，通常以`]`符号来结尾。`test`用的较少。例如：

```shell
#!/bin/bash
#检查是否存在文件
if test -f fred.c
then
    ...
fi
#还可以写成下面这样
if [ -f fred.c ]
then
...
fi
```

注意命令使用时后面必须存在空格。

**常见比较表达式**

![常见比较](https://wangpengcheng.github.io/img/2019-08-14-20-29-38.png)

![文件测试](https://wangpengcheng.github.io/img/2019-08-14-20-30-25.png)

#### 2.6.3 控制结构

```shell
if condition
then 
    statements1
elif condition
    statements2
else
    statements3
fi
```
注意对百年来那个字符串进行比较时，最好使用`""`让变量初始化。

可以使用`printf`代替`echo`就可以自定义，换行符。

**for语句**

```shell
for variable in value
do
    statements
done
```

示例：
```shell
#!/bin/bash
for file in $(ls f*.sh);
do
    lpr $file
done
exit 0
```
**while语句**
```shell
while condition do
    statements
done
```

**untill语句**

循环执行，直到满足条件

```shell
until [[ condition ]]; do
    statements
done
```

**case语句**

```shell
case variable in
    pattern [ | pattern ] ...) statements;;
    pattern [ | pattern ] ...) statements;;
    ...
esac
```

注意每个模式都应该以双分号结尾。

使用示例:
```shell
#!/bin/bash
echo "Is it morning? Please answer yes or no"
read timeofday

case "$timeofday" in
    yes | y | Yes | TES )   
        echo "test"
        echo "Good morning";;
    n* | N* )               echo "Good Afternoon";;
    * )                     echo "Sorry,answer not reconized";;
esac
exit 0
```
**列表命令**

- AND 列表：`&&`执行and条件，注意前后有空格
- OR 列表： `|| `直到有一条命令成功运行。

**语句块**

使用`{}`来构造执行语句块。

#### 2.6.4 函数
格式：
```
function_name()
{
    statements
}
```

注意：当一个函数被调用时，脚本程序的位置参数($*、$@、$#、$1、$2等)会被替换为函数的参数。这也是读取传递给函数的参数的办法。当函数执行完毕后，参数会恢复为它们先前的值。

函数操作字符串，一般是提前声明变量，或者使用`local`关键子在shell中声明局部变量，说明变量范围。否则都是按照全局变量处理。
下面是一个简单的示例：

```shell
#!/bin/bash

# file name yes_or_no 

yes_or_no(){
    echo "Is your name $* ?"
    while [[ true ]]; do
         echo -n "Enter yes or no: "
         read x
         case "$x" in
             y | yes ) return 0;;
             n | no ) return 1;;
             * ) echo "Answer yes or no"
         esac
     done 
}

echo "Original parameter are $* "
#将脚本输入的第一个参数，函数的第一个参数

if yes_or_no "$1"
then
    echo "Hi $1 , nice name"
else
    echo "Never mind"
fi

exit 0
# 输入： ./yes_or_no.sh  Rick Neil
# 输出

# Original parameter are Rick Neil 
# Is your name Rick ?
# Enter yes or no: y
# Hi ./yes_or_no.sh  Rick Neil, nice name

```

#### 2.6.5 命令

shell脚本中可以执行的命令分为两类:

- 内置命令：shell中内置的命令,linux中大多数内部命令都提供了外部版本
- 外置命令:非shell中的内置命令。

**常用命令**

- `break`:跳出一层循环。
- `:`：是一个空命令。相当于true的别名，运行的比true快。例如`:${var:=value}`没有':'，shell将试图把$var作为一条命令来处理。
- `continue`：跳过剩下的直接进行下一次循环。
- `.`：表示在当前shell中执行命令`.`命令和`source`命令功能相同，可以避免创建shell执行时，由于新的环境所造成的变量丢失。例如:`. ./shell_script.sh`脚本中执行的变量会在当前shell中生效。
- `echo`: 现代脚本中推荐使用`printf`命令。
- `eval`：允许你对参数进行求值,相当于一个额外的`$`

```shell
#!/bin/bash

foo=10
x=foo
y='$'$x
echo $y

eval z='$'$x
echo $z 
# 输出： $foo 10
```
注意：`z='$'$x`单独的输出是`foo`基本无效。

- `exec`:
    + 将当前shell替换为一个不同的程序，exec后面的代码不会执行。如:`exec wall "Thanks for all"`
    + 修改当前文件描述符:`exec 3< afile`。
- `exit n`：脚本以结束码`n`退出。0表示成功退出，`1-125`是脚本可以使用的错误代码。其余数字有保留含义。
- `export`：将作为它参数的变量导出到子shell中，并使之在子shell中有效。主要是设置环境变量，这个环境变量可以被当前程序调用的其它脚本程序看到。
- `expr`：将他的参数，当做一个表达式来进行求值；如:

```
x=`expr $x +1 ` 

#或

x=$(expr $x + 1)
```
可以使用`$()`代替反引号。在比较新的脚本程序送`expr`命令被`$(())`命令所代替。

![常见表达式操作](https://wangpengcheng.github.io/img/2019-08-15-14-46-09.png)

- `printf`：字符输出命令;例如`prinf "%s \n" hello`

![支持的转义序列](https://wangpengcheng.github.io/img/2019-08-15-14-47-34.png)

![字符转换限定符](https://wangpengcheng.github.io/img/2019-08-15-14-49-16.png)

- `return`:函数的返回参数，没有指定参数则默认返回最后一条命令的退出码。
- `set`：设置shell参数变量，可以结合`$*`和`$2`等来进行参数变量的设置。
- `shift`：所有变量左移一个位置，将`$2`变为`$1`，`$3`变为`$2`。
- `trap`:`tarp command signal`,接收signal信号，再采取`command`行动。

![signal信号](https://wangpengcheng.github.io/img/2019-08-15-14-59-31.png)

- `unset`：从环境中删除变量或者函数。
- `find`:`find [path] [option] [testss] [actions]`找寻。

![find命令参数选项](https://wangpengcheng.github.io/img/2019-08-15-15-06-50.png)

![find测试部分](https://wangpengcheng.github.io/img/2019-08-15-15-08-40.png)

![find操作符](https://wangpengcheng.github.io/img/2019-08-15-15-09-28.png)

![find动作](https://wangpengcheng.github.io/img/2019-08-15-15-13-23.png)

- `grep`：`grep [option] PATTERN [FILES]`

![grep命令参数](https://wangpengcheng.github.io/img/2019-08-15-15-13-23.png)

##### 正则表达式

![正则表达式含义](https://wangpengcheng.github.io/img/2019-08-15-15-17-31.png)

![特殊匹配模式](https://wangpengcheng.github.io/img/2019-08-15-15-18-44.png)
![特殊匹配模式](https://wangpengcheng.github.io/img/2019-08-15-15-19-42.png)

`-E`扩展匹配选项：

![匹配选项](https://wangpengcheng.github.io/img/2019-08-15-15-21-47.png)

例如：

```shell
#查找以e结尾的字符

grep e$ words2.txt
#查找a-z重复10次的匹配字符

grep -E [a-z]\{10\} words2.txt

```

#### 2.6.6 命令的执行

脚本中获取命令结果可以使用`$()` ，例如`$(pwd)`获取当前输出文件夹。

##### 2.6.6.1 算术扩展

使用`expr`或者`$(())`可以进行算术扩展。

`${}`的使用：

![扩展参数列表](https://wangpengcheng.github.io/img/2019-08-15-15-32-32.png)

#### 2.6.8 调试脚本程序

![脚本程序调试选项](https://wangpengcheng.github.io/img/2019-08-15-15-35-31.png)

### 2.7 迈向图形化:dialog工具

使用dialog可以在shell中创建图形工具并且实现交互；

```
dialog --msgbox "hello word" 9 18
```

![对话框主要类型](https://wangpengcheng.github.io/img/2019-08-15-15-39-49.png)

![对话框参数](https://wangpengcheng.github.io/img/2019-08-15-15-41-11.png)

使用示例:

```
dialog --title "Check me" --checklist "Pick Numbers" 15 25 3 1 "one" "off" 2 "two" "on" 3 "tree" "off"
```

### 2.8 综合应用

[代码地址](https://github.com/wangpengcheng/Learning-Note/blob/master/code/Begining_linux_Proramming_/ch02/app/cd_db)


## 参考链接：

- [Linux内核文档首页](https://www.kernel.org/doc/Documentation/)
- [Linux文档](https://linux.die.net/)
- [Linux c 开发手册](https://legacy.gitbook.com/book/wizardforcel/linux-c-api-ref/details)
- [Linux Kernel API](https://www.kernel.org/doc/htmldocs/kernel-api/index.html)
- [书中代码地址](http://www.wrox.com/WileyCDA/WroxTitle/Beginning-Linux-Programming-4th-Edition.productCd-0470147628,descCd-DOWNLOAD.html)

## 第三章 文件操作

linux 一切皆文件的思想本质上就是为了操作的一致性，即使是硬件，也可以利用系統调用进行读写操作。

### 3.1 linux文件结构

_参考链接：_　
- [每天进步一点点——Linux中的文件描述符与打开文件之间的关系](https://blog.csdn.net/cywosp/article/details/38965239)；
- [Linux文件读写机制及优化方式](https://blog.csdn.net/u014743697/article/details/52663975);
- [【Linux学习笔记】标准IO缓冲：行缓冲、全缓冲、无缓冲](https://blog.csdn.net/LYJwonderful/article/details/80646602)

linux中一切皆是文件。

文件除了本身的文件内容外，还有文件的附属管理信息，这些保存在`inode`节点中。目录是用于保存其他文件的节点号和节点名字的文件，目录文件中的每个数据项都是指向某个文件节点的链接，删除文件名就是删除与之对应的链接。
删除文件时，就是删除了文件的目录项，并且指向该文件的链接数目-1。文件中的数据仍然能够通过其它指向链接访问到。被链接数为0时，才会被正真删除。

引文linux中一切皆是文件的思想，其中硬件设备都是文件，可以使用，mount进行设备的挂载：

```
mount -t iso9660 /dev/hdc/ /mnt/cdrom
cd /mut/cdrom
```

重要的控制设备目录有三个：

- /dev/console:控制台设备
- /dev/tty: 控制终端
- /dev/null: 空设备，所有向这个设备中的输出都将被丢弃。

操作系统的内核是一组 **设备驱动程序**；内核提供了用于访问设备驱动程序的底层函数(系统调用)：open、read、write、close、ioctl等相关信息。

输入输出底层系统调用的效率非常低。
- 会影响系统性能：linux需要从用户态，切换到内核状态。因此应该每次读写大量的数据而不是每次仅仅读写一个字符。
- 硬件会限制对底层系统调用一次能读写的数据块的大小。

针对上述情况，linux提供了标准的函数接口`stdio.h`。

![文件读取调用](https://wangpengcheng.github.io/img/2019-08-24-14-17-46.png)

#### 3.4.1 write调用

格式：
```c++
#include <unistd.h>

size_t write(int fildes,const void *buf,size_t nbytes);
```

将缓冲区buf的前nbytes个字节写入文件描述符`fildes`关联的文件中返回实际的字节数，如果存在错误，返回的实际字节数可能小鱼`nbytes`。

#### 3.4.2 read系统调用

```c++
#include <unistd.h>

size_t read(int fildes,void *buf, size_t nbytes);

```

和上面基本相同只是变成了读取

```c
#include <unistd.h>
#include <stdlib.h>

int main()
{
    char buffer[128];
    int nread;

    nread = read(0, buffer, 128);
    if (nread == -1)
        write(2, "A read error has occurred\n", 26);

    if ((write(1,buffer,nread)) != nread)
        write(2, "A write error has occurred\n",27);

    exit(0);
}

# input : hello there | ./simple_read
# output :hello there
```

#### 3.4.3 open 系统调用

```c
#include <fcntl.h>
#include <sys/types.h>
#include <sys/stat.h>

int open(const char *path,int oflags);
int open(const char *path,int oflags,mode_t mode);

```
open建立了一条文件或者设备的访问方式。调用成功，返回一个可以被read、write和其它系统调用的文件描述符fildes。这个不会和其它正在运行中的进程共享。即便是同一文件，不同进程，也会产生不同的共享访问符号。因此文件同时读写的时候，会相互副高。一般使用文件锁来防止出现冲突。

![open的访问模式](https://wangpengcheng.github.io/img/2019-08-24-14-41-31.png)

POSIX规范还标准化了一个creat调用，相当于`oflags=O_CREAT|O_WONLY|O_TRUNC`

#### 3.4.4 访问权限设置

使用`O_CREAT`标志的open滴啊用来创建文件时，需要用3个参数格式的open调用。第三个参数mode是几个标志按位或后得到的。

- S_IRUSR:读权限，文件属主。
- S_IWUSR:写权限，文件属主。
- S_IXUSR:执行权限，文件属主。
- S_IRGRP:读权限，文件所属组。
- S_IWGRP:写权限，文件所属组。
- S_IXGRP:执行权限，文件所属组。
- S_IROTH:读权限，其它用户。
- S_IWOTH:写权限，其它用户。
- S_IXOTH:执行权限，其它用户。

示例：
```c

open("myfile",O_CREAT,S_IRUSR|S_IXOTH);

```
##### 3.4.4.1 umask

这里的权限设置，实际上海市发送权限请请求，是否被设置，取决于当时umask的值。

![umask取值的含义1](https://wangpengcheng.github.io/img/2019-08-24-14-56-18.png)

![umask取值的含义2](https://wangpengcheng.github.io/img/2019-08-24-14-57-20.png)

chmod操作也就是在直接更改umask的值。

##### 3.4.4.2 close系统调用

```c
#include <unistd.h>

int close(int fildes);

```
这里使用close主要是滴啊用终止文件描述符fildes与文件之间的关联。文件描述符被释放能够重新使用。返回正确为0，返回错误为-1

注意：对于网络文件系统，可能不会在关闭文件之前报告文件写操作中出现的错误。因为在执行写操作时，数据可能未被确认写入。

##### 3.4.4.3 ioctl系统调用

```c
#include <unistd.h>

int ioctl(int fildes,int cmd,...); 
```

提供了一个用于控制设备及其描述符行为和配置服务的借口。

#### 3.4.5 其它文件管理有关的系统调用

##### 3.4.5.1 lseek系统调用

对文件描述符`fildes`的读写指针进行设置，可以用来设置文件的下一个读写位置。位置可以是文件中的绝对位置，也可以使相对于当前位置或者文件尾部的某个而相对位置。

```c
#includ <unistd.h>

#includ <sys/types.h>

off_t lseek(int fildes,off_t offset,int whence);

```
whence是一个枚举值，用来定义该值便宜的用法：

- SEEK_SET: offset是一个绝对值
- SEEK_CUR: offset是相对于当前位置的一个相对位置。
- SEEK_END: offset是相对于文件尾的一个相对位置。

##### 3.4.5.2 fstat、stat、和lstat系统调用

这些是文件描述符相关的问价状态信息，该信息将会写到一个buf结构中，buf的地址以参数形式传递给fstat。其原型如下：

```
#include <unistd.h>

#include <sys/stat.h>

#include <sys/types.h>

int fstat(int fildes,struct stat *buf);
int stat(const char *path,struct stat *buf);
int lstat(const char *path,struct stat *buf);

```

stat和lstat返回的是通过文件名查找到的状态信息。但是当文件是符号链接时，lstat返回符号链接本身信息，stat返回 **符号链接指向的信息**。stat结构成员内容如下：

![结构体成员](https://wangpengcheng.github.io/img/2019-08-24-15-30-18.png)

st_mode关键字定义在头文件`sys/stat.h`中。这些宏包括对访问权限、问价类型标志以及一些用于帮助测试特定类型和权限的掩码的定义。

- S_IFBLK: 文件是一个特殊的块设备。
- S_IFDIR: 文件是一个目录
- S_IFCHR: 文件是一个特殊的字符设备
- S_IFIFO: 文件是一个FIFO(命名管道)
- S_IFREG: 文件是一个普通文件。
- S_FLNK: 文件是一个链接符号。

其它模式标志：

- S_ISUID:文件设置了SUID位。
- S_ISGID:文件设置了SGID位。

![其它文件类型](https://wangpengcheng.github.io/img/2019-08-24-15-36-41.png)

##### 3.4.5.3 dup和dup2系统调用

```c
#include <unistd.h>

int dup(int fildes);
int dup2(int fildes,int fildes2);
```

上面主要是复制文件描述符，可以通过更多的文件描述符访问同一个文件。

### 3.5 标准I/O库

_参考链接：_ [Linux下标准I/O缓冲机制](https://blog.csdn.net/gkzscs/article/details/83033337)

与c标准I/O相同，但是与C++中的输入和书而出流不同，c++中是单独的输出流模型，同时为了兼容C，与C的输入输出同步，会比较慢，因此可以使用`ios::sync_with_stdio(false);`,这样c++流会块很多。

其中的主要函数有：

- fopen:
- fclose:
- fread:
- fwrite:
- fflush:将文件流中的所有未写出的数据立刻写处理啊，确保程序继续执行前数据都已经被写到磁盘上了，flclose中隐含了一次fflush调用。
- fseek:与lseek对应的文件流函数。为下一次读写操作指定位置。

```c++
#include <stdio.h>

int fseek(FILE *stream,long int offset, int whence);

```

- fgetc,getc,getchar:fgetc和getc基本相同，都是从文件流中取出一个字符返回，当它达到文件文件末尾过着出现错误时返回EOF；getchar相当于get(stdin),从标准输入里读取下一个字符。

- fputc、putc和putchar和基本一致，不过多了输出字符参数`c`。
- fgets和gets：前者从文件流stream中读取一个字符串，遇到换行符或者结束文件末尾，将换行符传递到接收字符串中并添加`\n`表示字符串结尾，因此实际输出字符串数目为`n-1`。后者从标准输入中读取数据并丢弃遇到的换行符。在接收字符传的尾部加上一个null字符。

注意： gets对传输字符的个数并没有限制，所以可能会溢出自己的传输缓冲区。因此，你应该避免使用它，并用fgets来代替。([[Linux]标准IO全缓冲和行缓冲](https://www.cnblogs.com/yiyide266/p/10566160.html))


### 3.6 格式化输入和输出

- print、fprintf和sprintf:第一个将其送到标准输出.fprintf将自己输出输送到一个指定的文件流。sprintf将输出和一个结尾空字符写到作为参数传递过来的字符串s里。
![输出格式1](https://wangpengcheng.github.io/img/2019-08-24-19-17-41.png)
![输出格式2](https://wangpengcheng.github.io/img/2019-08-24-19-18-16.png)
- scanf、fscanf、sscanf：与printf基本相同。
![输入格式](https://wangpengcheng.github.io/img/2019-08-24-19-19-55.png)
- fgetpos:获取当前文件流读写的位置。
- fsetpos:设置文件流的当前读写位置
- ftell:返回文件流当前读写位置的偏移
- freopen:重新使用一个文件流。
- setvbuf:设置文件流的缓冲机制
- remove:相当于unlink函数，如果path是一个目录，则相当于rmdir函数。
- ferror:测试一个文件流的错误标识，如果该标识被设置就返回一个非零值，否则返回0
- feof:测试一个文件流的文件尾标识，被设置则返回非零值。否则返回0.
- clearerr:重新清除错误信息。
- fileno:获取文件流使用的底层文件描述符。失败返回-1
- fdopen:在已经打开的文件描述符上，创建一个新的文件流。实际所用是为一个已经打开的文件描述符提供stdio缓冲区。


### 3.7 文件和目录的维护

- chmod:改变文件或者目录的访问权限
```
#include <sys/types.h>
#include <unistd.h>

int chown(const char *path,uid_t owner,git_t group);
```
- unlink、link和symlink:管理文件链接数目，具体的卡伊参考第二章中内容。

```
#include <unistd.h>

int unlink(const char *path);
int link(const char *path1,const char *path2);
int symlink(cosnt char *path1,const char *path2);
```

- mkdir和rmdir:文件夹的创建与删除。
- chdir和getcwd:访问和文件夹路径，获取当前文件夹路径。
- opendir: 创建一个目录，并返回创建的目录流。如果成功，它返回一个指向DIR结构的指针，可以用于读取目录数据。
- readdir:返回一个指针，结构里，保存一个目录流dirp中下一个目录的资料，直到返回NULL;
- telldir:返回目录流中当前的位置。
- seekdir:设置目录流dirp的目录项指针。loc的值用来设置指针位置。

```cpp
#include <sys/types.h>
#include <dirent.h>

void seekdir(DIR *dirp,long int loc);
```

- closedir：关闭目录流。

一个目录扫描程序

```c++
#include <unistd.h>

#include <stdio.h>

#include <dirent.h>

#include <string.h>

#include <sys/stat.h>

#include <stdlib.h>

void printdir(char *dir, int depth)
{
    DIR *dp;
    struct dirent *entry;
    struct stat statbuf;

    if((dp = opendir(dir)) == NULL) {
        fprintf(stderr,"cannot open directory: %s\n", dir);
        return;
    }
    chdir(dir);
    while((entry = readdir(dp)) != NULL) {
        lstat(entry->d_name,&statbuf);
        if(S_ISDIR(statbuf.st_mode)) {
            /* Found a directory, but ignore . and .. */
            if(strcmp(".",entry->d_name) == 0 || 
                strcmp("..",entry->d_name) == 0)
                continue;
            printf("%*s%s/\n",depth,"",entry->d_name);
            /* Recurse at a new indent level */
            printdir(entry->d_name,depth+4);
        }
        else printf("%*s%s\n",depth,"",entry->d_name);
    }
    chdir("..");
    closedir(dp);
}

/*  Now we move onto the main function.  */

int main()
{
    printf("Directory scan of /home:\n");
    printdir("/home",0);
    printf("done.\n");

    exit(0);
}

```

### 3.9 错误处理

错误代码存在子啊头文件`errno.h`中，关键内容如下所示：

![错误处理图片](https://wangpengcheng.github.io/img/2019-08-24-20-03-29.png)

### 3.10 /proc文件处理系统

linux提供了一个特殊的文件系统procfs，通常以/proc目录的形式呈现。包含了许多特殊文件用来对驱动程序和内核信息进行更高层次的访问。只要有正确的访问权限，就可以通过读写这些文件来获取信息或者设置参数。

proc文件夹中包含以PID命名的文件夹和其它设备文件夹，设备的基本信息就放在其中。可以直接读取这些文件就可以获取其状态信息。例如：`cat /proc/cpuinfo`

输出信息如下：
```shell

processor   : 0
vendor_id   : GenuineIntel
cpu family  : 6
model       : 94
model name  : Intel(R) Core(TM) i5-6400 CPU @ 2.70GHz
stepping    : 3
microcode   : 0xcc
cpu MHz     : 1652.835
cache size  : 6144 KB
physical id : 0
siblings    : 4
core id     : 0
cpu cores   : 4
apicid      : 0
initial apicid  : 0
fpu     : yes
fpu_exception   : yes
cpuid level : 22
wp      : yes

......

```

可以使用`cat /proc/net/sockstat`获得网络套接字的使用统计。

### 3.11 高级主题 fcnt1和mmap

#### 3.11.1 fcnt1系统调用

- `fcnt1(fildes,F_DUPFD,newfd)`:返回一个新的文件描述符，其数值等于或者大于整数`newfd`;
- `fcnt1(fildes,F_GETFD)`：返回在fcntl.h头文件中定义的文件描述符标志。其中包括FD_CLOEXEX，它的作用是决定是否在成功调用了某个exec系列的系统调用之后关闭该文件描述符。
- `fcnt1(fildes,F_SETFD，flag)`:设置文件描述符标志
- `fcnt1(fildes,F_GETFL)`和`fcnt1(fildes,F_GETFL，flags)`:获取和设置文件庄涛标志和访问模式。

可以使使用fcntl实现建议性文件锁

#### 3.11.2 mmap函数(内存映射)

建立一段可被两个或更多个程序读写的内存。一个程序对它所做出的修改可以被其它程序看见。

mmap创建一个指向一段内存区域的指针，该内存区域与可以通过一个打开文件的描述符访问的内容相关。
```c++
#include <sys/mman.h>

void *mmap(void *addr,size_t len,int prot,int flags,int fildes,off_t off);
``` 
使用off参数来改变，经过共享内存段访问的文件中数据的起始偏移。打开的文件描述符有`fildes`参数给出。可以访问的数据量(内存段的成都)由len参数设置。
使用addr来请求地址，如果取值为0，结果指针将会自动分配。
prot参数用于设置内存段的访问权限，下面是其按位OR的结果

- `PROT_READ`:允许读该内存段。
- `PROT_WRITE`:允许写该内存段。
- `PROT_EXEC`:允许执行该内存段。
- `PROT_NONE`:该内存段不能被访问。
flags参数影响如下：

![选项图片](https://wangpengcheng.github.io/img/2019-08-30-14-14-16.png)

使用`msync`函数：把在该内存段的某个部分或整段中的修改写回到被映射的文件中(或者从被映射文件里读出)

```c++
#include <sys/mman.h>
int msync(void *addr,size_t len,int flags);
```
flags参数如下所示：

![flags相关参数](https://wangpengcheng.github.io/img/2019-08-30-14-24-19.png)

释放内存段

```c

/*  We start by defining a RECORD structure
    and then create NRECORDS versions each recording their number.
    These are appended to the file records.dat. 
*/

#include <unistd.h>
#include <stdio.h>
#include <sys/mman.h>
#include <fcntl.h>
#include <stdlib.h>

typedef struct {
    int integer;
    char string[24];
} RECORD;

#define NRECORDS (100)

int main(int argc,char* argv[])
{
    //使用record数据结构用来保存相关记录和编号。

    RECORD record, *mapped;
    int i, f;
    FILE *fp;

    fp = fopen("records.dat","w+");
    for(i=0; i<NRECORDS; i++) {
        record.integer = i;
        //输出相关信息

        sprintf(record.string,"RECORD-%d",i);
        //将信息写入到文件中

        fwrite(&record,sizeof(record),1,fp);
    }
    fclose(fp);

    fp = fopen("records.dat","r+");
    //重置seek中的记录为第43条

    fseek(fp,43*sizeof(record),SEEK_SET);
    //读取相关数据

    fread(&record,sizeof(record),1,fp);

    record.integer = 143;
    //输出相关的信息

    sprintf(record.string,"RECORD-%d",record.integer);

    fseek(fp,43*sizeof(record),SEEK_SET);
    fwrite(&record,sizeof(record),1,fp);
    fclose(fp);


    //将记录映射到内存中，访问第43条记录，把它的整数值改为243(同时更新该记录中的字符串)
    
    //打开文件

    f = open("records.dat",O_RDWR);
    //进行函数映射

    mapped = (RECORD *)mmap(0, NRECORDS*sizeof(record), 
                          PROT_READ|PROT_WRITE, MAP_SHARED, f, 0);

    //获取mmap中的第43个数据

    mapped[43].integer = 243;
    //将数据保存在mapped[43].string中

    sprintf(mapped[43].string,"RECORD-%d",mapped[43].integer);
    //将修改添加到文件中

    msync((void *)mapped, NRECORDS*sizeof(record), MS_ASYNC);
    //销毁映射的内存。

    munmap((void *)mapped, NRECORDS*sizeof(record));
    close(f);

    exit(0);
}
```

## 4 Linux环境

在linux命令行中，建议每一个命令行开关都应该以一个短横线开头，其后包含单个字母或数字。获取参数和检查的代码如下：

```c++
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    int arg;

    for(arg = 0; arg < argc; arg++) {
        if(argv[arg][0] == '-')
            printf("option: %s\n", argv[arg]+1);
        else
            printf("argument %d: %s\n", arg, argv[arg]);
    }
    exit(0);
}
```

linux中提供了getopt函数，支持需要关联值和不需要关联值的选项

```c++
#include <unistd.h>

int getopt(int aegc,char *const argv[],const char *optstring);
extern char *optarg;
extern int optind,opterr,optopt;
```

使用示例如下：

```c++
#include <stdio.h>

#include <unistd.h>

#include <stdlib.h>

int main(int argc, char *argv[])
{
    int opt;

    while((opt = getopt(argc, argv, ":if:lr")) != -1) {
        switch(opt) {
        case 'i':
        case 'l':
        case 'r':
            printf("option: %c\n", opt);
            break;
        case 'f':
            printf("filename: %s\n", optarg);
            break;
        case ':':
            printf("option needs a value\n");
            break;
        case '?':
            printf("unknown option: %c\n", optopt);
            break;
        }
    }
    for(; optind < argc; optind++)
        printf("argument: %s\n", argv[optind]);
    exit(0);
}

//输入： ./argopt -i -lr 'hi there' -f fred.c -q

/*
输出：

option: i
option: l
option: r
filename: fred.c
unknown option: q
argument :hi there

*/

```

getopt_long:接受以双划线(--)开始的长参数。使用示例如下：

```c++
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

#define _GNU_SOURCE
#include <getopt.h>

int main(int argc, char *argv[])
{
    int opt;
    struct option longopts[] = {
	{"initialize", 0, NULL, 'i'},
	{"file", 1, NULL, 'f'},
	{"list", 0, NULL, 'l'},
	{"restart", 0, NULL, 'r'},
    //注意必须包含全为0的结构结尾

	{0,0,0,0}
    };

    while((opt = getopt_long(argc, argv, ":if:lr", longopts, NULL)) != -1) {
        switch(opt) {
        case 'i':
        case 'l':
        case 'r':
            printf("option: %c\n", opt);
            break;
        case 'f':
            printf("filename: %s\n", optarg);
            break;
        case ':':
            printf("option needs a value\n");
            break;
        case '?':
            printf("unknown option: %c\n", optopt);
            break;
        }
    }
    for(; optind < argc; optind++)
        printf("argument: %s\n", argv[optind]);
    exit(0);
}


```

![option结构体](https://wangpengcheng.github.io/img/2019-08-30-15-42-39.png)

### 4.2 环境变量

linux中使用`getenv(const char* env_name)`和`int putenv(const char *string)`来进行环境变量的读取和设置。

### 4.3 日期和时间

linux中可以使用time函数来得到底层的时间值，它返回的是从纪元开始至今的秒数，tloc不是一个空指针，time函数还会把返回值写入tloc指针指向的位置。

- difftime(time_t time1,time_t time2): 计算两个时间点之间的时间差。值作为浮点数返回。
- `struct tm *gmttime(const time_t timeval)`:将底层时间值分解为一个结构函数。

![tm结构的成员函数](https://wangpengcheng.github.io/img/2019-08-30-21-22-52.png)

```c++
#include <time.h>
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

int main()
{
    int i;
    time_t the_time;

    for(i = 1; i <= 10; i++) {
        the_time = time((time_t *)0);
        printf("The time is %ld\n", the_time);
        sleep(2);
    }
    exit(0);
}

```
下面是gmtime函数的使用示例：

```c++
#include <time.h>
#include <stdio.h>
#include <stdlib.h>

int main()
{
    struct tm *tm_ptr;
    time_t the_time;
    (void) time(&the_time);
    tm_ptr=gmtime(&the_time);

    printf("Raw time is %ld\n",the_time);
    printf("gmtime gives \n");
    printf("date: %02d/%02d/%02d\n", 
        tm_ptr->tm_year,tm_ptr->tm_mon+1,tm_ptr->tm_mday);
    printf("time: %02d:%02d:%02d\n",
        tm_ptr->tm_hour, tm_ptr->tm_min, tm_ptr->tm_sec);
    exit(0);

}
```

- `localtime(const time_t *timeval)`:会根据时区进行更正。
- `mktime(struct tm *timeptr)`:将timeptr转换为原始的mktime函数。
- `char *asctime(const struct tm *timeptr)`:返回时间字符串。表示实际的时间。
- `char *ctime(const time_t *timeval)`:相当于`asctime(localtime(timeval))`,转换为更简单的本地时间。
- `size_t strftime(char *s,size_t maxsize,const char *format, struct tm *timeptr)`:函数格式化timeptr指针指向的tm结构所表示的时间和日期，并将结果放在字符串s中。
- `size_t strptime(const char *buff,const char *format,struct tm *timeptr)`:函数格式化timeptr指针指向的tm结构所表示的时间和日期，并将结果放在字符串s中。

![strftime的一般格式](https://wangpengcheng.github.io/img/2019-08-30-21-44-41.png)

### 4.4 临时文件

linux中可以使用相关的函数，进行临时文件的操作。

- `char *tmpnam(char *s)`:生成一个唯一的文件名。但是注意这里可能会存在另外一个程序创建出的文件名同名的文件。
- `FILE *tmpfile(void)`:生成唯一的文件索引，可以避免重名的情况发生。返回一个文件流指针。该文件以读写的方式打开(通过w+方式的fopen),当对它的所有引用全部关闭时，该文件会被自动删除。
- `char *mktemp(char* template)/int mkstemp(char *template)`：指定函数模板返回创建的文件。template参数必须是一个以6个x字符结尾的字符串。

### 4.5 用户信息

在`sys/types.h`中存在类型`uid_t`。它通常是一个小整数，一般情况下UID的值都大于100。可以使用`getuid`函数返回程序关联的UID，它通常是启动程序的用户的UID。getlogin函数返回与当前用户关联的登录名称。

用户账号数据库。通常保存在系统文件`/etc/passwd`中。每行分别对应用户的：用户名、加密口令、用户标识符(UID)、组标识符(GID)、全名、home目录、默认shell.

由此可以实现用户名和密码的相关查找信息可以进行修改和访问,密码信息一般放在`/etc/shadow`文件中。用相关的密码访问接口。

```c++
#include <sys/types.h>

#include <pwd.h>

struct passwd *getpwuid(uid_t uid);
struct passwd *getpwnam(const char *name);
```

下面是passwd关键的数据结构

![passwd相关数据结构](https://wangpengcheng.github.io/img/2019-09-02-14-42-41.png)

从密码数据库中提取相关信息
```c++

#include <sys/types.h>
#include <pwd.h>

#include <stdio.h>

#include <unistd.h>

#include <stdlib.h>

int main()
{
    //定义uid和

    uid_t uid;
    gid_t gid;
    //定义结构体

    struct passwd *pw;
    uid=getuid();
    gid=getgit();

    printf("User is %s \n",getlogin());

    printf("User IDs: uid=%d,gid=%d\n",uid,gid);
    pw=getpwuid(uid);
    //输出对应的参数

    printf("UID passwd entry:\n name=%s, uid=%d,home=%s,shell=%s \n",pw->pw_name,pw->pw_uid,pw->pw_gid,pw->pw_dir,pw->pw_shell);
    //获取root用户的相关信息

    pw=getpwnam("root");
    printf("root passwd entry: \n");
    printf("UID passwd entry:\n name=%s, uid=%d,home=%s,shell=%s \n",pw->pw_name,pw->pw_uid,pw->pw_gid,pw->pw_dir,pw->pw_shell);
    exit(0);
}

```
### 4.6 主机信息

主机信息结构体`utsname`存储在`sys/utsname.h`文件中。可以使用`int gethostname(char* name,size_t namelen)`函数来进行查询。成功返回0，否则返回-1。

```c++
#include <sys/utsname.h>

int uname(struct utsname *name);

```
![uname相关参数](https://wangpengcheng.github.io/img/2019-09-02-14-59-20.png)

下面是简单的使用示例：

```c++

#include <sys/utsname.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

int main()
{
    char computer[256];
    struct utsname uts;

    //获取相关参数
    if(gethostname(computer, 255) != 0 || uname(&uts) < 0) {
        fprintf(stderr, "Could not get host information\n");
        exit(1);
    }

    printf("Computer host name is %s\n", computer);
    printf("System is %s on %s hardware\n", uts.sysname, uts.machine);
    printf("Nodename is %s\n", uts.nodename);
    printf("Version is %s, %s\n", uts.release, uts.version);
    exit(0);
}

```

### 4.7 使用日志

一般linux的系统日志文件保存在`/usr/adm`或者`/var/log`目录中。文件`/var/log/message`包含所有的系统信息。`/var/log/mail`包含来自邮件系统的其它日志信息，`/var/log/debug`可能包含调试信息。具体的可以根据`/etc/syslog.conf`文件或者`/etc/syslog-ng/sys-log-ng.conf`文件来检查系统的配置。我的Ubuntu 18.04 优麒麟存在于`/etc/rsyslog.conf`文件中。

可以使用如下的API进行操作

```c++

#include <syslog.h>
//输出日志函数

void syslog(int priority,const char* message,arguments...);
//关闭和打开日志函数

void closelog(void);
void openlog(const char *ident,int logopt,int facility);
//设置日志掩码,控制日志的优先级

int setlogmask(int maskpri);

```
这个函数向系统的日志发送一条日志信息。每条信息中的priority参数对应了日志的级别。

![LOG_USER相对值](https://wangpengcheng.github.io/img/2019-09-02-15-44-49.png)

![logopt参数选项](https://wangpengcheng.github.io/img/2019-09-02-15-48-42.png)

下面是简单是示例：

```c++
#include <syslog.h>

#include <stdio.h>

#include <unistd.h>

#include <stdlib.h>

int main()
{
    int logmask;

    openlog("logmask", LOG_PID|LOG_CONS, LOG_USER);
    syslog(LOG_INFO,"informative message, pid = %d", getpid());
    syslog(LOG_DEBUG,"debug message, should appear");
    logmask = setlogmask(LOG_UPTO(LOG_NOTICE));
    syslog(LOG_DEBUG,"debug message, should not appear");
    exit(0);
}
```

### 4.8 资源和限制

在`limit.h`中定义了许多代表操作系统方面限制的显示。相关常量如下所示：

![限制常量使用](https://wangpengcheng.github.io/img/2019-09-02-15-58-48.png)

相关的设置函数

```c++
#include <sys/resource.h>

int getpriority(int which,id_t who);
int getpriority(int which,id_t who,int priority);
int getrlimit(int resource,struct rlimit *r_limit);
int getrlimit(int resource,const struct rlimit *r_limit);
int getrusage(int who,struct rusage *r_usage);
```
cpu耗费时间参数

![确定cpu耗费时间参数](https://wangpengcheng.github.io/img/2019-09-02-16-03-03.png)

其中`timeval`结构定义在头文件`sys/time.h`中。

一个程序耗费的CPU时间可分为：

- 用户时间： 程序自身的指令所耗费等待时间。
- 系统时间： 操作系统为程序执行所需要花费的时间，即执行输入输出操作的系统调用或其它系统函数所花费的时间。

**注意：多线程中程序运行时间的统计不能使用`ctime.h`中的`clock()`函数；因为它是根据cpu总的cpu运转时钟来的，会比单个的时间长；使用`time`(最小单位为s)或`timeval`(纳秒和微秒)函数来通过系统时间对多线程耗费的时间进行统计计算。([多线程C++运行时间统计](https://blog.csdn.net/u012526003/article/details/80862801))**

可以使用getrusage函数将cpu时间信息写入参数`r_usage`指向的`rusage`结构中。参数`who`可以是一下常量：

![who常量选值](https://wangpengcheng.github.io/img/2019-09-02-16-24-09.png)

使用which参数确定优先级

![获取用户当前优先级](https://wangpengcheng.github.io/img/2019-09-02-16-25-17.png)

使用`getrlimit`和`setrlimit`来读取和设置系统资源方面的限制函数。

![软件限制参数](https://wangpengcheng.github.io/img/2019-09-02-16-45-10.png)

linux中一般的线程数量限制([Linux最大线程数限制](https://www.cnblogs.com/guojintao/articles/10389713.html);[Linux资源限制](https://blog.csdn.net/qq_36441027/article/details/81040229))为
- 系统：62228
- 用户最大进程数：1024
- 单个进程最大线程数：1024
- 线程栈的大小(一般限制因素)：8M([Linux最大线程数限制](https://blog.csdn.net/qq_37924084/article/details/78403764))

除了线程数和内存，linux中还有其它许多因素可以进行限制；它们一般由`rlimit`函数中的`resource`参数指定。在头文件`sys/resource.h`中定义

![相关限制参数](https://wangpengcheng.github.io/img/2019-09-02-16-56-19.png)

## 第五章 终端

终端输入和输出的模式：

1. 标准模式与非标准模式：
- 标准模式：用户按下回车键之后，程序接受终端的输入，允许退格和删除。
- 非标准模式：用户输入接收程序的设置。

linux会暂存用户输入的内容，直到用户按下回车键。linux终端的输出缓冲设置是行缓冲。因此会以行为单位进行输出和输入。

注意：linux/unix都是以换行符`\n`表示一行的结束，并不是换行符，其它操作系统(如MS-DOS)用回车符和换行符两个自读的结合来表示一行的结束。使用重定向输出(`>`或`>>`)和输入(`<`或`<<`)可以重新定义输入和输出。

使用`unistd.h`中的`int isatty(int fd)`可以判断出该描述符是否连接到了一个终端(连接返回1，否则返回0)。

linux中的`/dev/tty`特殊设备直接对终端进行读写，指向当前的终端或登录会话.

### 5.3 终端驱动程序和通用终端接口

linux中可以使用通用终端接口(GTI)来控制终端。

![终端模型结构图](https://wangpengcheng.github.io/img/2019-09-03-20-17-24.png)

主要的控制功能有：

- 行编辑:是否允许使用退格键进行编辑。
- 缓存：是立即读取字符，还是等待一段可配置的延迟之后再读取它们。
- 回显：允许控制字符的回显，例如读取密码时。
- 回车/换行(CR/LF):定义如何在输入/输出时映射回车/换行符，比如打印`\n`字符时如何处理。
- 线速:很少用于PC控制台，但对调制解调器或通过串行线连接的终端非常重要。

下面是uinux中的硬件模型

![设备模型](https://wangpengcheng.github.io/img/2019-09-03-20-31-02.png)

### 5.4 termios结构

termios数据结构和相关单数调用都定义在头文件`termios.h`中，当使用其中的函数时，需要添加动态连接库`ncurses`。

![最小termios的结构体定义](https://wangpengcheng.github.io/img/2019-09-03-20-39-54.png)

可以使用`int tcgetattr(int fd,struct termios *termios_p)`来进行结构体的初始化，再使用`int tcsetattr(int fd,int actions,const strcut termios *termios_p)`来进行对应值的修改。

action选项如下：
- TCSANON:立刻对值进行修改。
- TCSADRAIN:等当前的输出完成之后再对值进行修改。
- TCSAFLUSH:等当前的输出完成之后再对值进行修改,但丢弃还未从`read`调用返回的当前可用的任何输入。
设置的值，影响的功能按照不同的模式被分成一下几组：

- 输入模式：输入模式控制输入数据(终端驱动程序从串行口或者键盘接收到的字符)在被传递给程序之前的处理方式。设置`c_iflag`成员的标志进行控制，其可选值如下：

![c_iflags相关选项](https://wangpengcheng.github.io/img/2019-09-03-20-48-47.png)

- 输出模式：控制输出模式的字符串，通过设置`c_oflag`成员的标志对输出模式进行控制。选项如下所示：
![输出标志设置](https://wangpengcheng.github.io/img/2019-09-03-20-55-51.png)

注意：如果没有设置OPOST，则所有其它标志都被忽略。
- 控制模式：控制终端的硬件特性。`c_cflag`成员的标志对控制模式进行配置。可选参数如下：

![硬件相关设置](https://wangpengcheng.github.io/img/2019-09-03-20-58-38.png)

- 本地模式：控制终端的各种特性。更改`c_lflag`参数，成员的宏内容如下：

![c_lflag宏定义内容](https://wangpengcheng.github.io/img/2019-09-03-21-11-59.png)

这里最重要的两个标志是ECHO(抑制键入字符的回显)和ICANON(将终端在两个截然不同的接收字符处理模式间进行切换，设置了ICANON标志，就启用标准输入行进行处理模式，否则，就启用非标准处理模式)。

- 特殊控制字符：对于一些特殊的组合按键(如`ctrl+c`)进行处理。并且使用`c_cc`数组成员将各种特殊控制字符映射到对应的支持函数。每个字符的位置是由一个宏进行定义的，但并不限制这些字符必须是控制字符。根据模式的不同数组下标不同
    + 标准模式的数组下标：

![标准模式的数组下标](https://wangpengcheng.github.io/img/2019-09-03-21-33-43.png)
    + 非标准模式的数组下标：

![非标准模式下的数组下标](https://wangpengcheng.github.io/img/2019-09-03-21-35-32.png)

#### 5.4.2 特殊控制字符

![特殊控制字符](https://wangpengcheng.github.io/img/2019-09-03-21-36-41.png)

#### 5.4.3 TIME和MIN值

TIME和MIN的值只能用于非标准模式，两者结合起来共同控制对输入的读取。两者的结合分为四中情况：

- MIN=0&&TIME=0:read调用总是立刻返回，如果存在待处理的字符，就会返回；如果没有就会返回0,并且不读取任何字符。
- MIN=0&&TIME>0:字符可以处理或者是经过TIME个十分之一秒的时间间隔，read调用就返回。如果因为超时而未读到任何字符，read就返回0，否则返回读取的字符数目。
- MIN>0&&TIME=0:这种情况下，read将一直等待，直到有MIN个字符可以读取时才返回读取字符的数量。达到文件尾时返回0.
- MIN>0&&TIME>0:当read被调用时，会等待接收一个字符，在接收到一个字符以及后续的每个字符之后，一个字符间隔定时器被启动(或者重启)。当有MIN个字符可读或两个字符之间的时间间隔超过TIME*0.1s时，read调用返回。

#### 5.4.4 通过shell王文终端模式


```shell
#查看当前的termios.h设置情况

stty -a

#重新设置标识符的快捷键

stty sane
# 通过保存设置和重新读取来更改终端设置

#输出和保存设置

stty -g > save_stty
#读取设置

stty $(cat save_stty)

#直接操作设置

stty -icanon min 1 time0

#重新恢复启用回显功能

stty -echo

```

#### 5.4.5 终端速度

使用如下函数更改终端的刷新速度

```c++
#include <termios.h>
speed_t cfgetispeed(const struct termios *);
speed_t cfgetospeed(const struct termios *);
int cfsetispeed(struct termios *,speed_t speed);
int cfsetospeed(struct termios *,speed_t speed);
```
speed_t 相关参数：

- B0:挂起终端
- B1200：1200波特
- B2400：2400波特
- B9600：9600波特
- B19200：19200波特
- B38400：38400波特


#### 5.4.6 其它函数

```c++
#include <termios.h>

//让调用程序一直等待

int tcdrain(int fd);
//暂停或重新开始输出

int tcflow(int fd,int flowtypes);
//清空输入、输出或者两者都清空

int tcflush(int fd,int in_out_selector);

```

### 5.5 终端的输出

使用`curses.h`中的`terminfo()`函数可以实现相关信息的查询。

使用`echo $TERM`可以识别当前的终端类型.终端的相关信息保存在`/usr/lib/terminfo`或`/usr/share/terminfo`目录中。

查看终端输出设置

```shell
infocmp vt100 

#	Reconstructed via infocmp from file: /lib/terminfo/v/vt100
vt100|vt100-am|dec vt100 (w/advanced video),
    am, mc5i, msgr, xenl, xon,
    cols#80, it#8, lines#24, vt#3,
    acsc=``aaffggjjkkllmmnnooppqqrrssttuuvvwwxxyyzz\{\{\|\|\}\}~~,
    bel=^G, blink=\E[5m$<2>, bold=\E[1m$<2>,
    clear=\E[H\E[J$<50>, cr=^M, csr=\E[%i%p1%d;%p2%dr,
    cub=\E[%p1%dD, cub1=^H, cud=\E[%p1%dB, cud1=^J,
    cuf=\E[%p1%dC, cuf1=\E[C$<2>,
    cup=\E[%i%p1%d;%p2%dH$<5>, cuu=\E[%p1%dA,
    cuu1=\E[A$<2>, ed=\E[J$<50>, el=\E[K$<3>, el1=\E[1K$<3>,
    enacs=\E(B\E)0, home=\E[H, ht=^I, hts=\EH, ind=^J, ka1=\EOq,
    ka3=\EOs, kb2=\EOr, kbs=^H, kc1=\EOp, kc3=\EOn, kcub1=\EOD,
    kcud1=\EOB, kcuf1=\EOC, kcuu1=\EOA, kent=\EOM, kf0=\EOy,
    kf1=\EOP, kf10=\EOx, kf2=\EOQ, kf3=\EOR, kf4=\EOS, kf5=\EOt,
    kf6=\EOu, kf7=\EOv, kf8=\EOl, kf9=\EOw, lf1=pf1, lf2=pf2,
    lf3=pf3, lf4=pf4, mc0=\E[0i, mc4=\E[4i, mc5=\E[5i, rc=\E8,
    rev=\E[7m$<2>, ri=\EM$<5>, rmacs=^O, rmam=\E[?7l,
    rmkx=\E[?1l\E>, rmso=\E[m$<2>, rmul=\E[m$<2>,
    rs2=\E>\E[?3l\E[?4l\E[?5l\E[?7h\E[?8h, sc=\E7,
    sgr=\E[0%?%p1%p6%|%t;1%;%?%p2%t;4%;%?%p1%p3%|%t;7%;%?%p4%t;5%;m%?%p9%t\016%e\017%;$<2>,
    sgr0=\E[m\017$<2>, smacs=^N, smam=\E[?7h, smkx=\E[?1h\E=,
    smso=\E[7m$<2>, smul=\E[4m$<2>, tbc=\E[3g,

```

可以使用`int setupterm(char *term,int fd,int *errret)`设置终端的输出功能。

### 5.6 检测击键动作

参考链接：[linux键盘驱动](https://www.cnblogs.com/lifexy/p/7553861.html)

使用一般方法进行相关的键盘检测。

### 5.7 虚拟控制台

linux中提供了虚拟控制台的功能，一组终端设备共享PC电脑的屏幕、键盘和鼠标。虚拟控制台可以通过字符设备文件/dev/ttyN进行使用。一般从数字1开始。


# Linux 程序设计 阅读笔记(三)

## 参考链接：

- [Linux内核文档首页](https://www.kernel.org/doc/Documentation/)
- [Linux文档](https://linux.die.net/)
- [Linux c 开发手册](https://legacy.gitbook.com/book/wizardforcel/linux-c-api-ref/details)
- [Linux Kernel API](https://www.kernel.org/doc/htmldocs/kernel-api/index.html)
- [书中代码地址](http://www.wrox.com/WileyCDA/WroxTitle/Beginning-Linux-Programming-4th-Edition.productCd-0470147628,descCd-DOWNLOAD.html)

## 第6章 使用curses函数库管理基于文本的屏幕

### 6.1 使用curses函数库进行编译

添加头文件`-I/usr/include/nucurses`,添加动态链接库`-lncurses`。

curses中输出字符的过程如下：

- 使用curses函数刷新逻辑屏幕。
- 要求curses使用refresh函数来刷新物理屏幕。

逻辑屏幕的布局通过一个字符数组来实现，它以屏幕的左上角为坐标原点。一般坐标表示(行，列)，y值在前、x值(列号)在后。

![相关函数](https://wangpengcheng.github.io/img/2019-09-04-15-27-49.png)

一个简单示例：

```c++

#include <unistd.h>

#include <stdlib.h>

#include <curses.h>

int main()
{
    //初始化屏幕

    initscr();
    //移动画笔位置
    move(5,15);

    printw("%s","Hello word");
    //刷新屏幕

    refresh();
    sleep(2);
    //结束窗口

    endwin();
    exit(EXIT_SUCCESS);
}
```
### 6.3 屏幕

使用`WINDOW *initscr(void)`进行窗口的初始化。这个函数在一个程序中只能调用一次。当结束窗口时就是使用`endwin()`函数进行相关资源的销毁，当函数成功时返回OK否则返回ERR。

#### 6.3.1 输出到屏幕

curses函数库提供了一些用于刷新屏幕的基本函数，它们是：


- `int addch(const chtype char_to_add)`:。
- `int addchstr(chtype  *const string_to_add)`:。
- `int printw(char* format,...)`:
- `int refresh(void)`
- `int box(WINDOW *win_ptr,chtype vertical_char,chtype horizontal_char)`
- `int insch(chtype char_to_insert)`：插入一个字符，将已有字符向右移动
- `int insertln(void)`
- `int delch(void)`
- `int delectln(void)`
- `int beep(void)`
- `int flash(void)`
- `int erase(void)`:清除屏幕，在每个屏幕位置写上空白字符。
- `int clear(void)`:调用erase后，再使用clearok来强制重现屏幕原文。彻底清除整个屏幕。
- `int clrtobot`函数清除当前光标位置直到屏幕结尾的所有内容。
- `int clrtobot`函数清除当前光标位置直到光标所处行位。
- `int move(int new_y,int new_x)`:将逻辑光标的位置移动到指定地点。希望变化立即显现使用`refresh`函数。
- `int leaveok(WINDOW *window_ptr,bool leave_flag)`；添加bool标志位，控制在屏幕刷新后curses刷新物理光标所放的位置。默认false，刷新后，硬件光标停留在屏幕上逻辑光标所处的位置。true,硬件光标会被随机地防止在屏幕的任意位置之上。

注意：curses拥有自己的字符类型chtype，比标准char类型包含跟多的二进制。

#### 6.3.5 字符属性

- `int attron(chtype attribute)`：启用指定的属性
- `int attroff(chtype attribute)`：关闭指定的属性
- `int attrset(chtype attribute)`:设置curses属性。
- `int standout(void)`:标准的输出
- `int standend(void)`:标准输出

### 6.4 键盘

设置键盘的相关函数

- `int echo(void)`：输出。
- `int noecho(void)`：。
- `int cbreak(void)`:
- `int raw(void)`:
- `int noraw(void)`:

#### 6.4.2 键盘输入

`int getch(void)`、`int getstr(char *string)`、`int getnstr(char* string,int number_of_characters)`、`int scanw(char *format,...)`。

### 6.5 窗口

#### 6.5.1 WINDOW窗口

使用`WINDOW * newwin(int num_of_lines,int num_of_cols,int start_y,int start_x)`来出那个键一个新窗口。`int delwin(WINDOW *window_to_delete)`删除一个窗口

注意：千万不要尝试删除curses自己的窗口和stdscr和curscr。

#### 6.5.3 移动和更新窗口

```c++
#include <curses.h>

int mvwin(WINDOW *window_to_move,int new_y,int new_x);
int wrefresh(WINDOW *window_ptr);
int wclear(WINDOW *window_ptr)
int werase(WINDOW *window_ptr);
int touchwin(WINDOW *window_ptr);
int scrollok(WINDOW *window_ptr,bool scroll_flag);
int scroll(WINDOW *window_ptr);
```

使用示例：

```c++
/*  As usual let's get our definitions sorted first.  */

#include <unistd.h>

#include <stdlib.h>

#include <curses.h>

int main()
{
    WINDOW *new_window_ptr;
    WINDOW *popup_window_ptr;
    int x_loop;
    int y_loop;
    char a_letter = 'a';
    //初始化显示

    initscr();

/*  Then we fill the base window with characters,
    refreshing the actual screen once the logical screen has been filled:

    move(5, 5);
    printw("%s", "Testing multiple windows");
    refresh();

    for (x_loop = 0; x_loop < COLS - 1; x_loop++) {
        for (y_loop = 0; y_loop < LINES - 1; y_loop++) {
            mvwaddch(stdscr, y_loop, x_loop, a_letter);
            a_letter++;
            if (a_letter > 'z') a_letter = 'a';
        }
    }

    refresh();
    sleep(2);
*/
/*  Now we create a new 10x20 window
    and add some text to it before drawing it on the screen.  */

    //创建新窗口

    new_window_ptr = newwin(10, 20, 5, 5);
    //移动窗口并进行写操作
    mvwprintw(new_window_ptr, 2, 2, "%s", "Hello World");

    mvwprintw(new_window_ptr, 5, 2, "%s", "Notice how very long lines wrap inside the window");
    //刷新窗口

    wrefresh(new_window_ptr);
    sleep(2);

/*  We now change the contents of the background window and, when we
refresh the screen, the window pointed to by new_window_ptr is obscured.  */

   a_letter = '0';
     for (x_loop = 0; x_loop < COLS - 1; x_loop++) {
        for (y_loop = 0; y_loop < LINES -1; y_loop++) {
            mvwaddch(stdscr, y_loop, x_loop, a_letter);
            a_letter++;
            if (a_letter > '9') a_letter = '0';
        }
    }

    refresh();
    sleep(2);

/*  If we make a call to refresh the new window, nothing will change,
    because we haven't changed the new window.  */

    wrefresh(new_window_ptr);
    sleep(2);

/*  But if we touch the window first
    and trick curses into thinking that the window has been changed.
    The next call to wrefresh will bring the new window to the front again.  */

    touchwin(new_window_ptr);
    wrefresh(new_window_ptr);
    sleep(2);

/*  Next, we add another overlapping window with a box around it.  */

    popup_window_ptr = newwin(10, 20, 8, 8);
    box(popup_window_ptr, '|', '-');
    mvwprintw(popup_window_ptr, 5, 2, "%s", "Pop Up Window!");
    wrefresh(popup_window_ptr);
    sleep(2);

/*  Then we fiddle with the new and pop-up windows before clearing and deleting them.  */

    touchwin(new_window_ptr);
    wrefresh(new_window_ptr);
    sleep(2);

    wclear(new_window_ptr);
    wrefresh(new_window_ptr);
    sleep(2);
    
    delwin(new_window_ptr);

    touchwin(popup_window_ptr);
    wrefresh(popup_window_ptr);
    sleep(2);
    
    delwin(popup_window_ptr);
    
    touchwin(stdscr);
    refresh();
    sleep(2);

    endwin();
    exit(EXIT_SUCCESS);
}

```

#### 6.5.4 优化屏幕刷新

- `int wnoutrefresh(WINDOW *window_ptr)`：把那些字符发送到屏幕上，实际的发送工作由dpupdate完成
- `int doupdate(void)`：可以进行相关数据的更新工作。
- `WINDOW *subwin(WINDOW *parent,int num_of_lines,int num_of_cols,int start_y,int start_x)`：创建子窗口

#### 6.4 keypad模式

使用`int keypad(WINDOW *window_ptr,bool keypad_on)`设置keypad_on为true来启用keypad模式。让curses接管按键转义序列的处理工作。读取用户按下的键，还将返回与逻辑按键对应的KEY_定义。

注意：识别escape转义序列的过程是与时间相关的，为了能够区分单独按下Escape按键和一个以Escape字符开头的键盘转义序列。不能处理二义性的escape转义序列。如果终端上两个而不同的按键会产生完全相同的专业序列，curses将不会处理这个转义序列，因为它不知道该返回哪个逻辑按键。

下面是简单的使用示例：

```c
#include <unistd.h>

#include <stdlib.h>

#include <curses.h>

#define LOCAL_ESCAPE_KEY    27

int main()
{
    int key;

    initscr();
    crmode();
    keypad(stdscr, TRUE);

/*  Next, we must turn echo off
    to prevent the cursor being moved when some cursor keys are pressed.
    The screen is cleared and some text displayed.
    The program waits for each key stroke
    and, unless it's q, or produces an error, the key is printed.
    If the key strokes match one of the terminal's keypad sequences, 
    then that sequence is printed instead.  */
    //截断输出

    noecho();
    //清除

    clear();
    //移动输出

    mvprintw(5, 5, "Key pad demonstration. Press 'q' to quit");
    move(7, 5);
    //刷新

    refresh();
    //获取字符

    key = getch();
    while(key != ERR && key != 'q') {
        move(7, 5);
        clrtoeol();

        if ((key >= 'A' && key <= 'Z') ||
            (key >= 'a' && key <= 'z')) {
            printw("Key was %c", (char)key);
        }else {
            switch(key) {
            case LOCAL_ESCAPE_KEY: printw("%s", "Escape key"); break;
            case KEY_END: printw("%s", "END key"); break;
            case KEY_BEG: printw("%s", "BEGINNING key"); break;
            case KEY_RIGHT: printw("%s", "RIGHT key"); break;
            case KEY_LEFT: printw("%s", "LEFT key"); break;
            case KEY_UP: printw("%s", "UP key"); break;
            case KEY_DOWN: printw("%s", "DOWN key"); break;
            default: printw("Unmatched - %d", key); break;
            } /* switch */
        } /* else */

        refresh();
        key = getch();
    } /* end while */

    endwin();
    exit(EXIT_SUCCESS);
}

```

### 6.8 彩色显示

使用has_color()和start_color()可以实现对颜色例程的初始化。

```c++
#include <curses.h>


bool has_colors(void);
int start_color(void);

```
在将颜色作为属性使用之前，你必须首先调用`init_pair()`函数对准备使用的颜色组合进行初始化。对颜色属性的访问是通过COLOR_PAIR函数来完成的。

```c
#include <curses.h>

//定义颜色组合

int init_pair(short pair_number.short foreground,short background);
//

int COLOR_PAIT(int pair_number);
//获取已有的颜色组合

int pair_content(short pair_number,short *foreground,short *background);
//重定义色彩

int init_color(short color_number,short red,short green,short blue); 
```

颜色的调用示例：

```c

#include <unistd.h>

#include <stdlib.h>

#include <stdio.h>

#include <curses.h>

int main()
{
    int i;

    //初始化curses

    initscr();
    //检查是支持色彩的终端

    if (!has_colors()) {
        endwin();
        fprintf(stderr, "Error - no color support on this terminal\n");
        exit(1);
    }
    //初始化色彩选项

    if (start_color() != OK) {
        endwin();
        fprintf(stderr, "Error - could not initialize colors\n");
        exit(2);
    }

/*  We can now print out the allowed number of colors and color pairs.
    We create seven color pairs and display them one at a time.  */
    //清除屏幕

    clear();
    //输出文字

    mvprintw(5, 5, "There are %d COLORS, and %d COLOR_PAIRS available",
             COLORS, COLOR_PAIRS);
    //进行刷新

    refresh();
    //初始化颜色

    init_pair(1, COLOR_RED, COLOR_BLACK);
    init_pair(2, COLOR_RED, COLOR_GREEN);
    init_pair(3, COLOR_GREEN, COLOR_RED);
    init_pair(4, COLOR_YELLOW, COLOR_BLUE);
    init_pair(5, COLOR_BLACK, COLOR_WHITE);
    init_pair(6, COLOR_MAGENTA, COLOR_BLUE);
    init_pair(7, COLOR_CYAN, COLOR_WHITE);
    //输出显色字符串

    for (i = 1; i <= 7; i++) {
        //开启属性设置

        attroff(A_BOLD);
        //设置颜色属性

        attrset(COLOR_PAIR(i));
        //输出文字

        mvprintw(5 + i, 5, "Color pair %d", i);
        //设置属性

        attrset(COLOR_PAIR(i) | A_BOLD);
        //输出文字

        mvprintw(5 + i, 25, "Bold color pair %d", i);
        //刷新

        refresh();
        //睡眠

        sleep(1);
    }

    endwin();
    exit(EXIT_SUCCESS);
}

```

### 6.9 pad
curses提供了特殊的数据结构pad来控制尺寸大于正常窗口的逻辑屏幕。相关接口如下;

```c
//初始化pad

WINDOW *newpad(int number_of_lines,int number_of_columns);
//执行刷新操作。指定放到屏幕上的pad范围和放置在屏幕上的位置。prefresh函数用于完成这一功能。


int prefresh(WINDOW *pad_ptr,
            int pad_row,
            int pad_column,
            int screen_row_min,//显示区域的坐标范文
            int screen_col_min,
            int screen_row_max,
            int screen_col_max
            )
```
pad的简单示例：

```c
#include <unistd.h>

#include <stdlib.h>

#include <curses.h>

int main()
{
    WINDOW *pad_ptr;
    int x, y;
    int pad_lines;
    int pad_cols;
    char disp_char;

    initscr();

    pad_lines = LINES + 50;
    pad_cols = COLS + 50;
    //创建pad

    pad_ptr = newpad(pad_lines, pad_cols);

    disp_char = 'a';
    //在内部添加字符串

    for (x = 0; x < pad_lines; x++) {
        for (y = 0; y < pad_cols; y++) {
            mvwaddch(pad_ptr, x, y, disp_char);
            if (disp_char == 'z') disp_char = 'a';
            else disp_char++;
        }
    }

/*  We can now draw different areas of the pad on the screen at different locations before quitting.  */
    //更新局部窗口
    
    prefresh(pad_ptr, 5, 7, 2, 2, 9, 9);
    sleep(1);
    //更新大范围窗口

    prefresh(pad_ptr, LINES + 5, COLS + 7, 5, 5, 21, 19);
    sleep(1);

    delwin(pad_ptr);

    endwin();
    exit(EXIT_SUCCESS);
}

```

## 第七章 数据管理

本章中的主要内容
- 动态内存管理：可以做什么以及Linux不允许做什么。
- 文件锁定：协调锁、共享文件的锁定区域和避免死锁。
- dbm数据库：一个大多数linux系统都提供的、基本的、不基于SQL的数据库函数库。

### 7.1 内存释放

linux中的内存管理中一般情况下是265M的堆栈大小。linux中可以使用标准的c语言接口进行内存分配。注意当linux中的内存耗尽的时候，会linux内核会使用交换空间(独立的磁盘空间)。内核会在物理内存和交换空间之间移动数据和程序代码。
每个Linux系统中运行的程序都只能看到属于自己的内存映像，不同的程序看到的内存映像不同。只有操作系统知道物理内存是如何安排的。

Linux可以允许输出空指针，但是不允许空指针写入内存。

**linux中一旦程序调用free释放了一块内存，它就不再属于这个进程。它将由malloc函数库负责管理。在对一块内存调用free之后，就绝不能再对其进行读写操作了**

其它内存释放函数：

- `void *calloc(size_t number_of_elements,size_t element_size);`:结构数组分配内存，需要元素个数和每个元素的大小作为其参数。并且分配的内存全部初始化为0.返回数组中第一个元素的指针。
- `void *realloc(void *existing_memory,size_t new_size);`:释放内存。


### 7.2 文件锁定

文件锁与线程锁类似，都是使用锁来进行的。可以使用原子文件锁，来直接锁定文件，也可以只锁定文件的一部分，从而可以独享对这一部分内容的访问。

创建文件锁后，通常被放在一个特定的位置，linux中通常会在/var/spool目录中创建一个文件。
注意：**文件锁只是建议锁，不是强制锁**

可以贼打开文件时使用锁，想干参数在`fcnt.h`中，在此不做过多叙述。第三章中函数有详细叙述。

文件读取使用fread时，将整个文件都读取到了内存中，再传递给程序，文件内容中未被锁定的部分。当其它部分被更改后，内容锁消失；但是因为程序获取的还是fread上次读取的内容，因此会产生数据的错误。可以使用`read()`和`write()`读取部分内容，避免这个问题的发生。

下面是一个简单的读写锁示例

```c++
#include <unistd.h>

#include <stdlib.h>

#include <stdio.h>

#include <fcntl.h>

const char *test_file = "/tmp/test_lock";

int main() {
    int file_desc;
    int byte_count;
    char *byte_to_write = "A";
    struct flock region_1;
    struct flock region_2;
    int res;

        /* open a file descriptor */

    file_desc = open(test_file, O_RDWR | O_CREAT, 0666);
    if (!file_desc) {
        fprintf(stderr, "Unable to open %s for read/write\n", test_file);
        exit(EXIT_FAILURE);
    }

        /* put some data in the file */

    for(byte_count = 0; byte_count < 100; byte_count++) {
        (void)write(file_desc, byte_to_write, 1);
    }

        /* setup region 1, a shared lock, from bytes 10 -> 30 */

    region_1.l_type = F_RDLCK;
    region_1.l_whence = SEEK_SET;
    region_1.l_start = 10;
    region_1.l_len = 20; 
    
        /* setup region 2, an exclusive lock, from bytes 40 -> 50 */

    region_2.l_type = F_WRLCK;
    region_2.l_whence = SEEK_SET;
    region_2.l_start = 40;
    region_2.l_len = 10;

        /* now lock the file */

    printf("Process %d locking file\n", getpid());
    res = fcntl(file_desc, F_SETLK, &region_1);
    if (res == -1) fprintf(stderr, "Failed to lock region 1\n");
    res = fcntl(file_desc, F_SETLK, &region_2);
    if (res == -1) fprintf(stderr, "Failed to lock region 2\n");    

        /* and wait for a while */
        
    sleep(60);

    printf("Process %d closing file\n", getpid());    
    close(file_desc);
    exit(EXIT_SUCCESS);
}
```

下图显示了当程序开始等待时文件锁定的状态

![文件锁定状态](https://wangpengcheng.github.io/img/2019-09-11-22-05-31.png)

#### 7.2.5 其它锁命令

使用lockf函数。通过文件描述符进行操作

```c
#include <unistd.h>

int lockf(int filds,int function ,off_t size_to_lock);
```
function参数取值如下：

- F_ULOCK:解锁
- F_LOCK:设置独占锁
- F_TLOCK:测试并设置独占锁
- F_TEST:特使其它进程设置的锁

size_to_clock参数是操作的字节数，它从文件的当前偏移值开始计算。

### 7.3 数据库

#### 7.3.1 abm数据库

这里主要介绍dbm数据库，这个是linux中数据库自带的基本的版本。其基本文件包含在`ndbm.h`中可以使用`-I/usr/include/gdbm -lgdbm`参数进行链接。

#### 7.3.3 dbm访问函数

```c
#include <ndbm.h>
//打开数据库

DBM *dbm_open(const char* filename,int file_open_flags,mode_t file_mode);
//存储数据库

int dbm_store(DBM *database_descriptor,datum key, datum content ,int store_mode );
//数据库查询函数

datum dbm_fetch(DBM *database_descriptor,datum key);
//关闭数据库

datum dbm_close(DBM *database_descriptor);
```
其它操作函数

```c
//删除数据库

int dbm_delete(DBM *database_descriptor,datum key);
//测试数据库错误

int dbm_error(DBM *database_descriptor);
//清除数据库中所有以被置位的错误条件标志

int dbm_clearerr(DBM *database_descriptor);
//获取第一个关键数据
int dbm_firstkey(DBM *database_descriptor);
//获取第二个关键数据

int dbm_nextkey(DBM *database_descriptor);

```
## 第 八 章 MySQL

### MySQL安装

参考连接:
- [Ubuntu 16.04 mysql安装配置](https://www.jianshu.com/p/3111290b87f4)
- [Ubuntu18.04 安装MySQL](https://blog.csdn.net/weixx3/article/details/80782479)

可以从官网下载，也可以直接使用`sudo apt-get install mysql-server`进行安装。

安装完成后使用`sudo mysql_secure_installation`命令进行初始化设置。

再使用`sudo mysql -uroot -p`进行登录。`use database`使用数据库。

具体的请参考mysql对应文章。

### 8.3 使用c语言访问mysql

使用样例：

```c
#include <stdlib.h>
#include <stdio.h>
#include "mysql.h"

MYSQL my_connection;
MYSQL_RES *res_ptr;
MYSQL_ROW sqlrow;

int main(int argc, char *argv[]) {
   int res;

   mysql_init(&my_connection);  
   if (mysql_real_connect(&my_connection, "localhost", "rick", "secret", "foo", 0, NULL, 0)) {
   printf("Connection success\n");
   res = mysql_query(&my_connection, "SELECT childno, fname, age FROM children WHERE age > 5");
   if (res) {
      printf("SELECT error: %s\n", mysql_error(&my_connection));
   } else {
      res_ptr = mysql_store_result(&my_connection);
      if (res_ptr) {
       printf("Retrieved %lu rows\n", (unsigned long)mysql_num_rows(res_ptr));
       while ((sqlrow = mysql_fetch_row(res_ptr))) {
         printf("Fetched data...\n");
       }
       if (mysql_errno(&my_connection)) {
         fprintf(stderr, "Retrive error: %s\n", mysql_error(&my_connection)); 
       }
       mysql_free_result(res_ptr);
      }
   }
   mysql_close(&my_connection);
   } else {
      fprintf(stderr, "Connection failed\n");
      if (mysql_errno(&my_connection)) {
         fprintf(stderr, "Connection error %d: %s\n",
                  mysql_errno(&my_connection), mysql_error(&my_connection));
      }
   }
   return EXIT_SUCCESS;
}
```

## 第 9 章 开发工具

### 9.2 make命令和makefile

make 选项参数：
- -k:make发生错误时仍然继续执行。
- -n:即刻输出将要执行的操作而不进行执行。
- -f:使用那个文件作为makefile文件。

具体参看makefile相关文章

- [跟我一起写makefile](https://wangpengcheng.github.io/2019/07/06/write_makefile_with_me/)

### 9.3 源代码控制

- SCCS:源代码控制系统。
- RCS：版本控制系统。
- CVS：并发版本控制系统。


## 第 10 章 调试

### 10.1 错误类型

- 功能定义错误:程序的功能被错误的定义了。
- 设计规划错误：程序设计需要多花时间进行思考。
- 代码编写错误：代码编写过程中的错误。

### 10.2 常用调试技巧

- 测试：找出程序中存在的缺陷或者错误
- 固化：让程序的错误可重现
- 定位：确定相关的代码行
- 纠正：修改代码纠正错误
- 验证：确定修改解决了问题。

### 10.3 使用gdb进行调试

参考链接:

- [Linux环境下的GDB调试方法](https://blog.csdn.net/horotororensu/article/details/82256832)
- [Linux下gdb的安装及使用入门](https://www.cnblogs.com/chenmingjun/p/8280889.html)

重要指令和相关操作

- `gdb project_name (-tui)`:启动gdb(gui形式)
- `help`:显示帮助信息
- `run`:程序开始运行。
- `backtrace`:栈跟踪。
- `print value_name`:输出变量的值。
- `list`:列出源代码
- `breakpoint`:设置断点。
- `display array[0]@5`,显示连续的数据项。
- `info display`：获取显示信息。
- `info break`:显示断点信息。


### 10.4 其它调试工具

- `splint`:工具可以提供有用的代码审查注释。
- `ctags`：为程序中的所有函数创建索引。
- `cxref`：分析c语言源代码并生成一个交叉引用表。
- `cflow`：打印出一个函数调用树。
- `prof/gprof`产生执行存档


使用`assert(int expression)`对表达式进行求值，如果结果非零，就向标准错误写一些诊断信息，然后调用abort函数结束程序的运行。

```c++
#include <assert.h>

void assert(int expression);
```
**注意：assert中的宏受NDEBUG的影响，存在这个宏定义时会关闭断言功能**

### 10.6 内存调试

在一个已经分配的内存块的尾部的后面(或者在它头部的前面)写数据，就可能会破坏malloc库用于记录内存分配情况的数据结构。
使用ElectricFence函数库可以使用Linux的虚拟内存保护机制来保护malloc和free所使用的内存。

### 10.6.2 valgrind

这个是一个工具，有能力检测出前面讨论中的很多问题。

## 第 11 章 进程和信号


### 进程通信

为什么进程间需要通信？
- 1). 数据传输: 一个进程需要将它的数据发送给另一个进程;
- 2). 资源共享: 多个进程之间共享同样的资源;
- 3). 通知事件: 一个进程需要向另一个或一组进程发送消息，通知它们发生了某种事件;
- 4). 进程控制: 有些进程希望完全控制另一个进程的执行(如Debug进程)，该控制进程希望能够拦截另一个进程的所有操作，并能够及时知道它的状态改变。
基于以上几个原因，所以就有了进程间通信的概念

进程通信：
- 每个进程各自有不同的用户地址空间,任何一个进程的全局变量在另一个进程中都看不到，所以进程之间要交换数据必须通过内核,在内核中开辟一块缓冲区,进程A把数据从用户空间拷到内核缓冲区,进程B再从内核缓冲区把数据读走,内核提供的这种机制称为进程间通信。
- ![](https://pic3.zhimg.com/80/v2-19d4ac7dccc826737fab858d8e84de52_720w.jpg)

linux 进程间通信方式主要有：
- `管道`（pipe 和 fifo）
  - 首先调用系统函数 pipe，它会在内核中开辟出一块缓冲区用来进行进程间通信，这块缓冲区称为管道，它有一个读端和一个写端。
- `信号`（signal）
- `消息队列`
- `共享内存`
- `信号量`
- `套接字`（socket)

[进程通信的八种方法](https://cloud.tencent.com/developer/article/1690556)
- 1 匿名管道通信
  - 匿名管道( pipe )：管道是一种半双工的通信方式，数据只能单向流动，而且只能在具有亲缘关系的进程间使用。进程的亲缘关系通常是指父子进程关系。
  - 通过匿名管道实现进程间通信的步骤如下：
    - 父进程创建管道，得到两个⽂件描述符指向管道的两端
      - ![](https://pic3.zhimg.com/80/v2-1bb5c4fb3afa6e16259816dda05d756e_720w.jpg)
    - 父进程fork出子进程，⼦进程也有两个⽂件描述符指向同⼀管道。
      - ![](https://pic4.zhimg.com/80/v2-32ffb053af31b54b2eede40c3a34f40b_720w.jpg)
    - 父进程关闭fd[0],子进程关闭fd[1]，即⽗进程关闭管道读端,⼦进程关闭管道写端（因为管道只支持单向通信）。⽗进程可以往管道⾥写,⼦进程可以从管道⾥读,管道是⽤环形队列实现的,数据从写端流⼊从读端流出,这样就实现了进程间通信。
      - ![](https://pic3.zhimg.com/80/v2-46a0bc1d51bccdeead5b65aee2a9c66e_720w.jpg)
- 2 高级管道通信
  - 高级管道(popen)：将另一个程序当做一个新的进程在当前程序进程中启动，则它算是当前程序的子进程，这种方式我们成为高级管道方式。
- 3 有名管道通信
  - 有名管道 (named pipe) ： 有名管道也是半双工的通信方式，但是它允许无亲缘关系进程间的通信。
- 4 消息队列通信
  - 消息队列( message queue ) ： 消息队列是由消息的链表，存放在内核中并由消息队列标识符标识。消息队列克服了信号传递信息少、管道只能承载无格式字节流以及缓冲区大小受限等缺点。
- 5 信号量通信
  - 信号量( semophore ) ： 信号量是一个计数器，可以用来控制多个进程对共享资源的访问。它常作为一种锁机制，防止某进程正在访问共享资源时，其他进程也访问该资源。因此，主要作为进程间以及同一进程内不同线程之间的同步手段。
- 6 信号
  - 信号 ( sinal ) ： 信号是一种比较复杂的通信方式，用于通知接收进程某个事件已经发生。
- 7 共享内存通信
  - 共享内存( shared memory ) ：共享内存就是映射一段能被其他进程所访问的内存，这段共享内存由一个进程创建，但多个进程都可以访问。共享内存是最快的 IPC 方式，它是针对其他进程间通信方式运行效率低而专门设计的。它往往与其他通信机制，如信号两，配合使用，来实现进程间的同步和通信。
- 8 套接字通信
  - 套接字( socket ) ： 套接口也是一种进程间通信机制，与其他通信机制不同的是，它可用于不同机器间的进程通信。

### 进程查看

进程：一个其中运行着一个或者多个线程的地址空间和这些线程所需要的系统资源。进程是操作系统进行资源分配的最小单元。

两个用户同时运行相同程序的进程资源分布图

![两个用户同时运行相同程序](https://wangpengcheng.github.io/img/2019-09-18-18-44-44.png)

使用`ps -ef`指令进行进程表的查询。

使用`ps ax`进行现在运行进程的状态查询。

下面是stat状态码

![stat状态码](https://wangpengcheng.github.io/img/2019-09-18-18-56-40.png)

在Linux中执行期短的突发性任务比持续占用处理器来进行计算或者不断轮训系统来查看是否有新的输入达到的程序要更好。这个是是进程优先级的重要因素。称为nice,一个进程的nice值默认为0并将根据这个程序的表现而不断变化。长期不剪短运行的程序的优先级一般会比较低。这样可以帮助与用户进行呼叫的程序保持及时的响应。

可以使用`ps -l`查看linux进程中的nice值。

### 11.3 启动新进程

#### 11.3.1 替换进程映像

```c
#include <stdlib.h>

int system(const char *string);
```

system运行以字符串参数的形式传递给它的命令，并等待命令的完成。命令的执行情况就如同下面的情况`sh -c string`。

注意：这里system函数并不是启动气他进程的理想手段，应为它必须用一个shell来启动需要的程序。

可以优先使用`exec`系列函数。
- exec函数可以把当前进程替换为一个新进程，新进程由path或者file参数指定。可以使用exec函数将程序的执行从一个程序切换到另外一个程序。exec函数比system函数更有效，因为在新的程序启动后，原来的程序就不再运行了。

```c++
#include <unistd.h>
char **environ;
//参数可变函数

int execl(const char *path,const char *arg0,...,(char*)0);
int execlp(const char *file,const char *arg0,...,(char*)0);
int execle(const char *path,const chat *arg0,...,(char*)0,char *const envp[]);
//参数不可变函数。

int execv(const char *path,char *const argv[]);
int execvp(const char *file,char *const argv[]);
int execve(const char *path,char *const argv[],char *const envp[]);
```

注意：使用exec函数相当于直接进行了进程的切换，因此在exec函数之后的都不会进行。

#### 11.3.2 复制进程映像

可以使用线程或者从源程序中创建一个全分离的进程，后者就想init的做法一样，而不想exec调用那样用新程序替换当前执行的线程。可以使用fork创建一个新进程。

```c
#include <sys/type.h>
#include <unistd.h>

pid_t fork(void);
```
![fork函数的使用示意图](https://wangpengcheng.github.io/img/2019-09-18-19-46-39.png)

一个简单的fork示例：

```c
#include <sys/types.h>
#include <unistd.h>
#include <stdio.h>
#include <stdlib.h>

int main()
{
    pid_t pid;
    char *message;
    int n;
    printf("fork pogram starting\n");
    pid=fork();
    switcg(pid){
        case -1:
            perror("fork failed");
            exit(1);
        case 0:
            message="This is the child";
            n=5;
            break;
        default:
            message="This is the parent";
            n=3;
            break;
    }
    for(;n>0;--n){
        puts(message);
        sleep(1);
    }
    exit(0);
}
```

子进程被创建并且输出消息5次。原进程(即父进程)，只输出消息3次。具体结果如下

```shell
fork program starting
This is the parent
This is the child
This is the parent
This is the child
This is the parent
This is the child
This is the child
This is the child
```

#### 等待一个进程

当使用fork启动以这个子进程时，子进程就有了它自己的声明周期并将独立运行。可以在父进程中调用`wait()`函数让父进程等待子进程的结束。

```c
#include <sys/types.h>
#include <sys/wait.h>

pid_t wait(int *stat_loc);
//等待特定进程
pid_t waitpid(pid_t pid,int *stat_loc,int options);
```

wait系统调用将暂停父进程直到它的子进程结束为止，这个调用返回子进程的PID。

![wait信号处理](https://wangpengcheng.github.io/img/2019-09-18-20-19-14.png)

```c++
if(pid!=0){
    int stat_val;
    pid_t child_pid;
    child_pid=wait(&stat_val);
    printf("child has finished:PID =%d\n",childe_pid);
    if(WIFEXITED(stat_val))
        printf("Child exited with code %d\n",WEXITSTATUS(stat_val));
    else
        printf("Childe terminated abnormally \n");
}
```

#### 僵尸进程

当子进程终结时，它与父进程之间的关联还会保持，直到父进程也正常终止或者父进程调用wait才结束，在这段时间内，虽然子进程已经不再运行，但它仍然存在于系统中，因为它的退出码还需要保存起来，以备父进程今后的wait调用使用。这时称其为一个死(defunct)进程或者僵尸进程。

#### 11.3.4 线程

线程可以共享内存段。但从本质上来说，它们是操作系统内各自独立的实体。

### 11.4 信号

linux中由(raise)表示一个信号的产生，使用术语(catch)表示接收到一个信号。信号的名称在头文件`signal.h`中定义的。它们以SIG开头

![相关操作的实现](https://wangpengcheng.github.io/img/2019-09-18-20-38-49.png)

如果进程接收到这些信号中的一个，但事先没有安排捕获它，进程将会立刻终止。**系统将生成核心转储存文件core**,并将其放在当前目录下。该文件是进程在内存中的映像，它对程序的调试很有用处。

![其它信号](https://wangpengcheng.github.io/img/2019-09-18-20-41-32.png)

相关函数
```c
#include <signal.h>

void (*signal(int sig, void((*func)(int))))(int);
```

注意:这里并不推荐使用`signal()`接口，建议使用`sigaction()`函数。

#### 11.4.1 发送信号

```c
#include <sys/types.h>
#include <signal.h>

int kill(pid_t pid,int sig);

//使用闹钟设置指定时间后运行
unsigned int alarm(unsigned int seconds);
```

kill函数将参数sig给定的信号发送给由参数pid给出的进程号所指定的进程，成功时返回0。错误时返回-1并设置errno变量。其类型如下：
- EINVAL:给定的信号无效。
- EPERM:发送进程权限不够。
- ESRCH:目标进程不存在。

信号接受使用pause(),将一个程序的执行挂起直到有一个信号出现位置。当程序接收到一个信号时，预先设置好的信号处理函数将开始运行。程序也将恢复正常的执行。

```c
#include <unistd.h>

int pause(void);
```

**一个简装的信号接口**

```c
#include <signal.h>

int sigaction(int sig,const struct sigaction *act,struct sigaction *oact);
```

sigaction结构定义在接收到参数sig指定的信号后应该采取的行动。该结构至少应该包括以下几个成员：

```c
void (*) (int) sa_handler  //函数指针
sigset_t sa_mask //指定了信号集
int sa_flags //对信号处理重置的效果，必须在sa_flags成员中包含值SA_RESETHAND
```

#### 11.4.2 信号集

```c
#include <signal.h>

//将信号集中添加信号
int sigaddset(sigset_t *set,int signo);
//将信号集初始化为空
int sigemptyset(sigset_t *set);
//sigfillset将信号集初始化为包含所有已定义的信号。
int sigfillset(sigset_t *set);
//从信号集中删除信号
int sigdelset(sigset_t *set,int signo);
//判断一个给定的信号是否是一个信号集的成员。如果是就返回1，不是返回0，信号无效就返回-1并设置errno
int sigismember(sigset_t *set,int signo);
//信号屏蔽字的设置和检查
int sigprocmask(int how,const sigset_t *set,sigset_t *oset);
//将被阻塞的信号中停留在待处理状态的一组信号写到参数set指向的信号集合中。进程挂起自己的执行，直到信号集中的一个信号到达为止。
int sigpending(sigset_t *set);
//将进程的屏蔽字替换为由参数sigmask给出的信号集，然后挂起程序的执行。
int sigsuspend(const sigset_t *sigmask);
```


sigprocmask中how的取值如下
- ![sigprocmask中how的取值](https://wangpengcheng.github.io/img/2019-09-18-21-14-51.png)

**sigaction标志**

![sigaction标志](https://wangpengcheng.github.io/img/2019-09-18-21-23-13.png)

**Linux常用信号参考**

![linux常用信号参考](https://wangpengcheng.github.io/img/2019-09-18-21-24-33.png)

引起信号异常终止信号：
- ![引起信号异常终止信号](https://wangpengcheng.github.io/img/2019-09-18-21-25-37.png)

接收之后挂起的信号
- ![接收之后挂起的信号](https://wangpengcheng.github.io/img/2019-09-18-21-26-43.png)

下面信号是重启被暂停的进程
- ![重启被暂停的进程](https://wangpengcheng.github.io/img/2019-09-18-21-27-46.png)


# Linux 程序设计 阅读笔记(四)

## 参考链接：

- [Linux内核文档首页](https://www.kernel.org/doc/Documentation/)
- [Linux文档](https://linux.die.net/)
- [Linux c 开发手册](https://legacy.gitbook.com/book/wizardforcel/linux-c-api-ref/details)
- [Linux Kernel API](https://www.kernel.org/doc/htmldocs/kernel-api/index.html)
- [书中代码地址](http://www.wrox.com/WileyCDA/WroxTitle/Beginning-Linux-Programming-4th-Edition.productCd-0470147628,descCd-DOWNLOAD.html)
- [POSIX thread (pthread) libraries](https://www.cs.cmu.edu/afs/cs/academic/class/15492-f07/www/pthreads.html)

## 第 12 章 POSIX线程

### 12.1 什么是线程

线程：一个程序中的多个执行线路就叫线程(thread)。或者说线程是一个进程内部的一个控制序列。

当使用fork()函数时，创建一个进程，这个新进程拥有自己的变量和自己的PID.时间调度也是独立的，并且拥有自己的栈。与创建者共享全局变量、文件描述符、信号处理函数和当前目录状态

编写多线程程序时，我们通过定义宏`_REENTRANT`来告诉编译器我们需要可重入功能，这个宏的定义必须位于程序中的任何#include之前。

```c
#include <pthread.h>
//创建利用函数和相关参数创建线程
int pthread_create(pthread_t *thread,pthread_attr_t *attr,void *(*start_rountine)(void *),void *arg);
//终止相关线程
void pthread_exit(void *retval);
//收集子进程信息的wait函数
int pthread_join(pthread_t th,void **thread_return);
```

下面是一个简单的pthread使用示例：

```c++
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>

void *thread_function(void *arg);

char message[] = "Hello World";

int main() {
    int res;
    pthread_t a_thread;
    void *thread_result;
    //创建对应的函数
    res = pthread_create(&a_thread, NULL, thread_function, (void *)message);
    if (res != 0) {
        perror("Thread creation failed");
        exit(EXIT_FAILURE);
    }
    printf("Waiting for thread to finish...\n");
    res = pthread_join(a_thread, &thread_result);
    if (res != 0) {
        perror("Thread join failed");
        exit(EXIT_FAILURE);
    }
    printf("Thread joined, it returned %s\n", (char *)thread_result);
    printf("Message is now %s\n", message);
    exit(EXIT_SUCCESS);
}

void *thread_function(void *arg) {
    printf("thread_function is running. Argument was %s\n", (char *)arg);
    sleep(3);
    strcpy(message, "Bye!");
    pthread_exit("Thank you for the CPU time");
}
```

### 12.4 同时执行

下面来编写一个程序让两个同时进行

```c++
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <pthread.h>

void *thread_function(void *arg);
int run_now = 1;
char message[] = "Hello World";

int main() {
    int res;
    pthread_t a_thread;
    void *thread_result;
    int print_count1 = 0;
    //创建线程

    res = pthread_create(&a_thread, NULL, thread_function, (void *)message);
    if (res != 0) {
        perror("Thread creation failed");
        exit(EXIT_FAILURE);
    }
    //在这里等待一段时间
    while(print_count1++ < 20) {
        if (run_now == 1) {
            printf("1");
            run_now = 2;
        }
        else {
            sleep(1);//没有则不断检查，这种方式称之为忙等待
        }
    }
    printf("\nWaiting for thread to finish...\n");
    //等待线程完成和结束
    res = pthread_join(a_thread, &thread_result);
    if (res != 0) {
        perror("Thread join failed");
        exit(EXIT_FAILURE);
    }
    printf("Thread joined\n");
    exit(EXIT_SUCCESS);
}

void *thread_function(void *arg) {
    int print_count2 = 0;

    while(print_count2++ < 20) {
        if (run_now == 2) {
            printf("2");
            run_now = 1;
        }
        else {
            sleep(1);
        }
    }
    sleep(3);
}

```
### 12.5 同步

同步的两种基本方法：信号量和互斥量。

#### 12.5.1 用信号量进行同步

信号量函数的名字都以`sem_`开头，而不想大多数线程函数那样以pthread_开头。线程中使用的基本信号量函数有4个，它们都非常简单

```c++
#include <semaphore.h>

//初始化sem指向的信号量对象，设置共享量和初始
int sem_init(sem_t *sem,int pshared,unsigned int value);
//等待传入信号量，以原子操作的方式将信号量-
int sem_wait(sem_t *sem);
//发射信号量,以原子操作的方式将信号量+
int sem_post(sem_t *sem);
//在使用玩信号量之后，对其进行销毁
int sem_destroy(sem_t *sem);
```

信号量的简单使用
```c++
#include <stdio.h>
#include <unistd.h
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <semaphore.h>

void *thread_function(void *arg);
sem_t bin_sem;

#define WORK_SIZE 1024

char work_area[WORK_SIZE];

int main() {
    int res;
    pthread_t a_thread;
    void *thread_result;

    res = sem_init(&bin_sem, 0, 0);
    if (res != 0) {
        perror("Semaphore initialization failed");
        exit(EXIT_FAILURE);
    }
    res = pthread_create(&a_thread, NULL, thread_function, NULL);
    if (res != 0) {
        perror("Thread creation failed");
        exit(EXIT_FAILURE);
    }

    printf("Input some text. Enter 'end' to finish\n");
    while(strncmp("end", work_area, 3) != 0) {
      if (strncmp(work_area, "FAST", 4) == 0) {
        sem_post(&bin_sem);
        strcpy(work_area, "Wheeee...");
      } else {
        fgets(work_area, WORK_SIZE, stdin);
      }
      sem_post(&bin_sem);
    }

    printf("\nWaiting for thread to finish...\n");
    res = pthread_join(a_thread, &thread_result);
    if (res != 0) {
        perror("Thread join failed");
        exit(EXIT_FAILURE);
    }
    printf("Thread joined\n");
    sem_destroy(&bin_sem);
    exit(EXIT_SUCCESS);
}

void *thread_function(void *arg) {
    sem_wait(&bin_sem);
    while(strncmp("end", work_area, 3) != 0) {
        printf("You input %d characters\n", strlen(work_area) -1);
        sem_wait(&bin_sem);
    }
    pthread_exit(NULL);
}

```

#### 12.5.2 用互斥量进行同步

它允许程序员锁住某个对象，使得每次只有一个线程访问它。进入这段代码之前锁住一个互斥量，在完成操作之后解锁它

```c
#include <pthread.h>
//初始化互斥量
int pthread_mutex_init(pthread_mutex_t *mutex,const pthread_mutexattr_t);
//互斥量加锁
int pthread_mutex_lock(pthread_mutex_t *mutex);
//互斥量解锁
int pthread_mutex_unlock(pthread_mutex_t *mutex);
//互斥量销毁
int pthread_mutex_destroy(pthread_mutex_t *mutex);
```

注意：互斥量的属性相关值默认为fast，如果一个程序试图对一个已经加了锁的互斥量调用thread_mutex_lock程序就会被阻塞，当互斥量拥有线程被阻塞时，就会形成死锁。

下面是使用的简单示例：

```c++
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <semaphore.h>

void *thread_function(void *arg);

pthread_mutex_t work_mutex; /* protects both work_area and time_to_exit */

#define WORK_SIZE 1024
char work_area[WORK_SIZE];
int time_to_exit = 0;

int main() {
    int res;
    pthread_t a_thread;
    void *thread_result;
    //初始化信号量

    res = pthread_mutex_init(&work_mutex, NULL);
    if (res != 0) {
        perror("Mutex initialization failed");
        exit(EXIT_FAILURE);
    }
    //创建线程

    res = pthread_create(&a_thread, NULL, thread_function, NULL);
    if (res != 0) {
        perror("Thread creation failed");
        exit(EXIT_FAILURE);
    }
    //线程加锁
    pthread_mutex_lock(&work_mutex);
    //执行操作
    printf("Input some text. Enter 'end' to finish\n");
    //接受输入参数
    while(!time_to_exit) {
        fgets(work_area, WORK_SIZE, stdin);
        pthread_mutex_unlock(&work_mutex);
        //循环等待并加
        while(1) {
            pthread_mutex_lock(&work_mutex);
            if (work_area[0]!='\0') {/*读到末尾直接解锁*/
                pthread_mutex_unlock(&work_mutex);
                sleep(1);
            }
            else {
                break;
            }
        }
    }
    //解锁线程
    pthread_mutex_unlock(&work_mutex);
    printf("\nWaiting for thread to finish...\n");
    //等待子线程结束
    res = pthread_join(a_thread, &thread_result);
    if (res != 0) {
        perror("Thread join failed");
        exit(EXIT_FAILURE);
    }
    printf("Thread joined\n");
    //销毁信号量
    pthread_mutex_destroy(&work_mutex);
    exit(EXIT_SUCCESS);
}

void *thread_function(void *arg) {
    sleep(1);
    //互斥量加锁
    pthread_mutex_lock(&work_mutex);
    //当检测到了end函数
    while(strncmp("end", work_area, 3) != 0) {
        printf("You input %d characters\n", strlen(work_area) -1);
        work_area[0] = '\0';
        pthread_mutex_unlock(&work_mutex);
        sleep(1);
        pthread_mutex_lock(&work_mutex);
        while (work_area[0] == '\0' ) {
            pthread_mutex_unlock(&work_mutex);
            sleep(1);
            pthread_mutex_lock(&work_mutex);
        }
    }
    time_to_exit = 1;
    work_area[0] = '\0';
    pthread_mutex_unlock(&work_mutex);
    pthread_exit(0);
}

```
实际工作中我们应该尽量使用信号量来避免出现轮寻的情况。

### 12.6 线程的属性

_参考链接：_ [POSIX thread (pthread) libraries](https://www.cs.cmu.edu/afs/cs/academic/class/15492-f07/www/pthreads.html)


在上一节中我们了解到，线程的属性的存在,我们可以使用。对应的函数对相关的函数进行修改。

```c
#include <pthread.h>

//初始化属性
int pthread_attr_init(pthread_attr_t *attr);
//设置detachedstate属性，是否可以获取另外一个线程的状态。
int pthread_attr_setdetachstate(pthread_attr_t *attr,int detachstate);
int pthread_attr_getdetachstate(const pthread_attr_t *attr,int *detachstate);
//设置schedpolicy线程的调度方式
int pthread_attr_setschedpolicy(pthread_attr_t *attr,int policy);
int pthread_attr_getschedpolicy(const pthread_attr_t *attr,int *policy);
//和上一个属性结合使用。可以对SCHED_OTHER策略运行的线程的调度进行控制
int pthread_attr_setschedparam(pthread_attr_t *attr,const struct sched_param *param);
int pthread_attr_getschedparam(const pthread_attr_t *attr,const struct sched_param *param);
//是否继承其创建者使用的参数。
int pthread_attr_setinheritsched(pthread_attr_t *attr, int inherit);
int pthread_attr_getinheritsched(const pthread_attr_t *attr, int *inherit);
//控制线程调度的计算方式
int pthread_attr_setscope(pthread_attr_t *attr,int scope);
int pthread_attr_getscope(const pthread_attr_t *attr,int *scope);
//控制线程创建栈的大小
int pthread_attr_setstacksize(pthread_attr_t *attr,int scope);
int pthread_attr_getstacksize(const pthread_attr_t *attr,int *scope);
```

下面是一个简单的使用示例

```c++
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <string.h>
#include <pthread.h>
#include <semaphore.h>

void *thread_function(void *arg);

pthread_mutex_t work_mutex; /* protects both work_area and time_to_exit */

#define WORK_SIZE 1024
char work_area[WORK_SIZE];
int time_to_exit = 0;

int main() {
    int res;
    pthread_t a_thread;
    void *thread_result;
    res = pthread_mutex_init(&work_mutex, NULL);
    if (res != 0) {
        perror("Mutex initialization failed");
        exit(EXIT_FAILURE);
    }
    res = pthread_create(&a_thread, NULL, thread_function, NULL);
    if (res != 0) {
        perror("Thread creation failed");
        exit(EXIT_FAILURE);
    }
    pthread_mutex_lock(&work_mutex);
    printf("Input some text. Enter 'end' to finish\n");
    while(!time_to_exit) {
        fgets(work_area, WORK_SIZE, stdin);
        pthread_mutex_unlock(&work_mutex);
        while(1) {
            pthread_mutex_lock(&work_mutex);
            if (work_area[0] != '\0') {
                pthread_mutex_unlock(&work_mutex);
                sleep(1);
            }
            else {
                break;
            }
        }
    }
    pthread_mutex_unlock(&work_mutex);
    printf("\nWaiting for thread to finish...\n");
    res = pthread_join(a_thread, &thread_result);
    if (res != 0) {
        perror("Thread join failed");
        exit(EXIT_FAILURE);
    }
    printf("Thread joined\n");
    pthread_mutex_destroy(&work_mutex);
    exit(EXIT_SUCCESS);
}

void *thread_function(void *arg) {
    sleep(1);
    pthread_mutex_lock(&work_mutex);
    while(strncmp("end", work_area, 3) != 0) {
        printf("You input %d characters\n", strlen(work_area) -1);
        work_area[0] = '\0';
        pthread_mutex_unlock(&work_mutex);
        sleep(1);
        pthread_mutex_lock(&work_mutex);
        while (work_area[0] == '\0' ) {
            pthread_mutex_unlock(&work_mutex);
            sleep(1);
            pthread_mutex_lock(&work_mutex);
        }
    }
    time_to_exit = 1;
    work_area[0] = '\0';
    pthread_mutex_unlock(&work_mutex);
    pthread_exit(0);
}
```

可以使用`sched_get_priority_max`和`sched_get_priority_min`这两个函数来查找可用的优先级级别。

使用示例如下：

```c++
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <pthread.h>

void *thread_function(void *arg);

char message[] = "Hello World";
int thread_finished = 0;

int main() {
    int res;
    pthread_t a_thread;
    void *thread_result;
    pthread_attr_t thread_attr;
    //定义一些额外的变量

    int max_priority;
    int min_priority;
    struct sched_param scheduling_value;
    //设置对应的调度策略

    res = pthread_attr_init(&thread_attr);
    if (res != 0) {
        perror("Attribute creation failed");
        exit(EXIT_FAILURE);
    }
    res = pthread_attr_setschedpolicy(&thread_attr, SCHED_OTHER);
    if (res != 0) {
        perror("Setting schedpolicy failed");
        exit(EXIT_FAILURE);
    }
    res = pthread_attr_setdetachstate(&thread_attr, PTHREAD_CREATE_DETACHED);
    if (res != 0) {
        perror("Setting detached attribute failed");
        exit(EXIT_FAILURE);
    }
    res = pthread_create(&a_thread, &thread_attr, thread_function, (void *)message);
    if (res != 0) {
        perror("Thread creation failed");
        exit(EXIT_FAILURE);
    }
    //查找允许的优先级范围

    max_priority = sched_get_priority_max(SCHED_OTHER);
    min_priority = sched_get_priority_min(SCHED_OTHER);
    //设置优先级

    scheduling_value.sched_priority = min_priority;
    res = pthread_attr_setschedparam(&thread_attr, &scheduling_value);
    if (res != 0) {
        perror("Setting schedpolicy failed");
        exit(EXIT_FAILURE);
    }
    (void)pthread_attr_destroy(&thread_attr);
    while(!thread_finished) {
        printf("Waiting for thread to say it's finished...\n");
        sleep(1);
    }
    printf("Other thread finished, bye!\n");
    exit(EXIT_SUCCESS);
}

void *thread_function(void *arg) {
    printf("thread_function is running. Argument was %s\n", (char *)arg);
    sleep(4);
    printf("Second thread setting finished flag, and exiting now\n");
    thread_finished = 1;
    pthread_exit(NULL);
}
```

### 12.7 取消一个线程

```c
#include <pthread.h>
//向线程发送取消信
int pthread_cancel(pthread_t thread);
//设置线程自己的取消状态,state是接受/忽略取消请求，oldstate指针用于获取先前的取消状
int pthread_setcancelstate(int state,int *oldstate);
//进入第二个层次设置取消类
int pthread_setcanceltype(int type,int *oldtype);
```

下面是一个简答的使用示例;
```c++
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <pthread.h>

void *thread_function(void *arg);

int main() {
    int res;
    pthread_t a_thread;
    void *thread_result;

    res = pthread_create(&a_thread, NULL, thread_function, NULL);
    if (res != 0) {
        perror("Thread creation failed");
        exit(EXIT_FAILURE);
    }
    sleep(3);
    printf("Canceling thread...\n");
    res = pthread_cancel(a_thread);
    if (res != 0) {
        perror("Thread cancelation failed");
        exit(EXIT_FAILURE);
    }
    printf("Waiting for thread to finish...\n");
    res = pthread_join(a_thread, &thread_result);
    if (res != 0) {
        perror("Thread join failed");
        exit(EXIT_FAILURE);
    }
    exit(EXIT_SUCCESS);
}

void *thread_function(void *arg) {
    int i, res, j;
    res = pthread_setcancelstate(PTHREAD_CANCEL_ENABLE, NULL);
    if (res != 0) {
        perror("Thread pthread_setcancelstate failed");
        exit(EXIT_FAILURE);
    }
    res = pthread_setcanceltype(PTHREAD_CANCEL_DEFERRED, NULL);
    if (res != 0) {
        perror("Thread pthread_setcanceltype failed");
        exit(EXIT_FAILURE);
    }
    printf("thread_function is running\n");
    for(i = 0; i < 10; i++) {
        printf("Thread is still running (%d)...\n", i);
        sleep(1);
    }
    pthread_exit(0);
}
```
### 12.8 多线程运行实例

```c++
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>
#include <pthread.h>

#define NUM_THREADS 6

void *thread_function(void *arg);

int main() {
    int res;
    pthread_t a_thread[NUM_THREADS];
    void *thread_result;
    int lots_of_threads;

    for(lots_of_threads = 0; lots_of_threads < NUM_THREADS; lots_of_threads++) {

        res = pthread_create(&(a_thread[lots_of_threads]), NULL, thread_function, (void *)&lots_of_threads);
        if (res != 0) {
            perror("Thread creation failed");
            exit(EXIT_FAILURE);
        }
        sleep(1);
    }
    printf("Waiting for threads to finish...\n");
    for(lots_of_threads = NUM_THREADS - 1; lots_of_threads >= 0; lots_of_threads--) {
        res = pthread_join(a_thread[lots_of_threads], &thread_result);
        if (res == 0) {
            printf("Picked up a thread\n");
        }
        else {
            perror("pthread_join failed");
        }
    }
    printf("All done\n");
    exit(EXIT_SUCCESS);
}

void *thread_function(void *arg) {
    int my_number = *(int *)arg;
    int rand_num;

    printf("thread_function is running. Argument was %d\n", my_number);
    rand_num=1+(int)(9.0*rand()/(RAND_MAX+1.0));
    sleep(rand_num);
    printf("Bye from %d\n", my_number);
    pthread_exit(NULL);
}
```

## 第 13 章 进程间通信：管道

_参考链接：_ [Linux进程间通信-管道深入理解](https://www.linuxidc.com/Linux/2018-04/151680.htm);[Linux进程间通信的几种方式总结](https://blog.csdn.net/gatieme/article/details/50908749)

管道通常是把一个进程的输出通过管道连接到另外一个进程的输入。如下所示

`cmd1 | cmd2`
shell负责安排两个命令的标准输入和标准输出

- cmd1的标准输入来自终端键盘
- cmd2的标准输出传递给cmd2,作为它的标准输入
- cmd2的标准输出链接到终端屏幕。

![管道流程图](https://wangpengcheng.github.io/img/2019-09-20-10-48-12.png)

进程间通信的四种方式：
- [管道](https://www.linuxidc.com/Linux/2018-04/151680.htm)
- [命名管道](https://www.linuxidc.com/Linux/2018-04/151681.htm)
- [消息队列](https://www.linuxidc.com/Linux/2018-04/151682.htm)
- [共享内存](https://www.linuxidc.com/Linux/2018-04/151683.htm)


管道出现的四种特殊情况：
1. 写端关闭，读端不关闭；
  - 那么管道中剩余的数据都被读取后,再次read会返回0,就像读到文件末尾一样。
2. 写端不关闭，但是也不写数据，读端不关闭；
  - 此时管道中剩余的数据都被读取之后再次read会被阻塞，直到管道中有数据可读了才重新读取数据并返回；
3. 读端关闭，写端不关闭；
  - 此时该进程会收到信号SIGPIPE，通常会导致进程异常终止。
4. 读端不关闭，但是也不读取数据，写端不关闭；
  - 此时当写端被写满之后再次write会阻塞，直到管道中有空位置了才会写入数据并重新返回。

使用管道的缺点：
1. 两个进程通过一个管道只能实现单向通信，如果想双向通信必须再重新创建一个管道或者使用sockpair才可以解决这类问题；
2. 只能用于具有亲缘关系的进程间通信，例如父子，兄弟进程。

### 13.2 进程管道

进程之间的数据传递方法就是使用popen和pclose函数。使用原型如下所示：

```c++
#include <stdio.h>

FILE *popen(const char* command,const char *open_mode);
int pclose(FILE *stream_to_close);
```

popen函数是将一个程序命令来作为一个新进程来启动。可以传递程序名和相关参数给它。open_mode必须是"r"(被调用程序的输出可以被调用程序使用，返回FILE*文件流指针)或"w"(可以使用fwrite调用向被调用程序发送数据)。

程序结束时使用`pclose`函数关闭与之关联的文件流。`pclose`调用只在`popen`启动的进程结束之后才返回。下面是一个简单的实验程序

```c++
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main()
{
    FILE *read_fp;
    char buffer[BUFSIZE+1];
    int chars_read;
    memset(buffer,'\0',sizeof(buffer));
    //创建管道文件

    read_fp=popen("uname -a","r");
    if(read_fp!=NULL){
        //读取管道输出的结果

        chars_read=fread(buffer,sizeof(char),BUFSIZ,read_fp);
        if(chars_read>0){
            printf("Output was: -\n%s\n",buffer);
        }
        //关闭管道

        pclose(read_fp);
        exit(EXIT_SUCCESS);
    }
    exit(EXIT_FAILURE);
}
```

输出结果如下所示

```shell
Output was:-
Linux wangpengcheng-Inspiron-3650 4.15.0-50-generic 
#54~16.04.1-Ubuntu SMP Wed May 8 15:55:19 UTC 2019 x86_64 x86_64 x86_64 GNU/Linux

```

管道的写入如下所示

```c++
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main()
{
    FILE *write_fp;
    char buffer[BUFSIZ+1];
    sprintf(buffer,"Once upon a time,there was ...\n");
    write_fp=popen("od -c","w");
    if(write_fp!=NULL){
        fwrite(buffer,sizeof(char),strlen(buffer),write_fp);
        pclose(write_fp);
        exit(EXIT_SUCCESS);
    }
    exit(EXIT_FAILURE);
}
```
执行结果：

```shell
0000000   O   n   c   e       u   p   o   n       a       t   i   m   e
0000020   ,       t   h   e   r   e       w   a   s   .   .   .  \n
0000037
```

#### 13.3.1 传递更多的数据

当数据过大时可以使用buffer来设置块的大小，按照块来进行读取。关键代码如下

```c++
if(read_fp!=NULL){
    char_read=fread(buffer,sizeof(char),BUFSIZ,read_fp);
    while(chars_read>0){
        buffer[chars_read-1]='\0';
        prinft("Reading %d: -n %s \n",BUFSIZ,buffer);
        chars_read=fread(buffer,sizeof(char),BUFSIZ,read_fp);
    }
    pclose(read_fp);
    exit(EXIT_SUCCESS);
}
```

按照上述执行ps命令输出结果如下所示：

```shell
Reading 819:-
   PID TTY      STAT   TIME COMMAND
    1 ?        Ss     0:10 /sbin/init splash
    2 ?        S      0:00 [kthreadd]
    4 ?        I<     0:00 [kworker/0:0H]
    6 ?        I<     0:00 [mm_percpu_wq]
    7 ?        S      0:19 [ksoftirqd/0]
    8 ?        I      6:06 [rcu_sched]
    9 ?        I      0:00 [rcu_bh]
   10 ?        S      0:00 [migration/0]
   11 ?        S      0:01 [watchdog/0]
   12 ?        S      0:00 [cpuhp/0]
   13 ?        S      0:00 [cpuhp/1]
   14 ?        S      0:01 [watchdog/1]
   15 ?        S      0:00 [migration/1]
   16 ?        S      0:21 [ksoftirqd/1]
   18 ?        I<     0:00 [kworker/1:0H]
   19 ?        S      0:00 [cpuhp/2]
   20 ?        S      0:01 [watchdog/2]
   21 ?        S      0:00 [migration/2]
   22 ?        S      0:17 [ksoftirqd/2]
   24 ?        I<     
Reading 819:-
 :00 [kworker/2:0H]
   25 ?        S      0:00 [cpuhp/3]
   26 ?        S      0:01 [watchdog/3]
   27 ?        S      0:00 [migration/3]
   28 ?        S      0:21 [ksoftirqd/3]
   30 ?        I<     0:00 [kworker/3:0H]
   31 ?        S      0:00 [kdevtmpfs]
   32 ?        I<     0:00 [netns]
   33 ?        S      0:00 [rcu_tasks_kthre]
   34 ?        S      0:00 [kauditd]
   37 ?        S      0:00 [khungtaskd]
   38 ?        S      0:00 [oom_reaper]
   39 ?        I<     0:00 [writeback]
   40 ?        S      0:00 [kcompactd0]
   41 ?        SN     0:00 [ksmd]
   42 ?        SN     0:01 [khugepaged]
   43 ?        I<     0:00 [crypto]
   44 ?        I<     0:00 [kintegrityd]
   45 ?        I<     0:00 [kblockd]
   48 ?        I<     0:00 [ata_sff]
   49 ?        I<     0:00 [md]
   50 ?        I<     0:00
Reading 819:-
 [edac-poller]
   51 ?        I<     0:00 [devfreq_wq]
   52 ?        I<     0:00 [watchdogd]
   55 ?        S      0:58 [kswapd0]
   56 ?        I<     0:00 [kworker/u9:0]
   57 ?        S      0:00 [ecryptfs-kthrea]
   99 ?        I<     0:00 [kthrotld]
  100 ?        I<     0:00 [acpi_thermal_pm]
  104 ?        I<     0:00 [ipv6_addrconf]
  114 ?        I<     0:00 [kstrp]
  131 ?        I<     0:00 [charger_manager]
  178 ?        S      0:00 [scsi_eh_0]
  179 ?        I<     0:00 [scsi_tmf_0]
  180 ?        S      0:00 [scsi_eh_1]
  181 ?        I<     0:00 [scsi_tmf_1]
  182 ?        S      0:00 [scsi_eh_2]
  183 ?        I<     0:00 [scsi_tmf_2]
  184 ?        S      0:00 [scsi_eh_3]
  185 ?        I<     0:00 [scsi_tmf_3]
  190 ?        S      0:00 [nvidia-modeset]
  193 ?        I<     0:11 [kworker
Reading 819:-
 2:1H]
  218 ?        S      0:02 [jbd2/sda12-8]
  219 ?        I<     0:00 [ext4-rsv-conver]
  235 ?        S      0:00 [jbd2/sda14-8]
  236 ?        I<     0:00 [ext4-rsv-conver]
  265 ?        Ss     0:19 /lib/systemd/systemd-journald
  281 ?        I<     0:00 [kworker/0:1H]
  294 ?        I<     0:00 [kworker/1:1H]
  299 ?        Ss     0:01 /lib/systemd/systemd-udevd
  328 ?        S<     0:00 [loop1]
  330 ?        S<     0:00 [loop2]
  331 ?        S<     0:04 [loop3]
  332 ?        I<     0:04 [kworker/3:1H]
  348 ?        S      0:00 [irq/127-mei_me]
  436 ?        I<     0:00 [cfg80211]
  508 ?        I<     0:00 [kworker/u9:1]
  524 ?        S      0:00 [UVM global queu]
  525 ?        S      0:00 [UVM Tools Event]
  558 ?        I<     0:00 [kmemstick]
  620 ?        Sl     0:03 /usr/lib/chromiu
  ....

```

popen的本质还是使用shell进行命令的发送和接收。一次每次执行函数都会调用一次shell执行程序。

### 13.4 pipe调用

这个函数可以在两个程序之间传递数据不需要启动一个shell来解释请求的命令。同时提供了对读写数据的更多控制

```c
#include <unistd.h>

int pipe(int file_descriptor[2]);
```

![pipe函数](https://wangpengcheng.github.io/img/2019-09-20-14-15-04.png)

使用示例：

```c++
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main()
{
    int data_processed;
    int file_pipes[2];
    const char some_data[] = "123";
    char buffer[BUFSIZ + 1];
    pid_t fork_result;

    memset(buffer, '\0', sizeof(buffer));
    //创建pipe成功

    if (pipe(file_pipes) == 0) {
        //创建子进程

        fork_result = fork();
        if (fork_result == -1) {
            fprintf(stderr, "Fork failure");
            exit(EXIT_FAILURE);
        }
// We've made sure the fork worked, so if fork_result equals zero, we're in the child process.

        if (fork_result == 0) {
            data_processed = read(file_pipes[0], buffer, BUFSIZ);
            printf("Read %d bytes: %s\n", data_processed, buffer);
            exit(EXIT_SUCCESS);
        }
// Otherwise, we must be the parent process.

        else {
            data_processed = write(file_pipes[1], some_data,
                                   strlen(some_data));
            printf("Wrote %d bytes\n", data_processed);
        }
    }
    exit(EXIT_SUCCESS);
}

```

输出结果：

```shell
Wrote 3 bytes
Read 3 bytes: 123

```

上面先用pipe调用创建一个管道，接着用fork调用创建一个新进程。如果调用fork成功；父进程就写数据到管道中，而子进程从管道中读取数据。

### 13.5 父进程和子进程

使用exec函数来调用子进程，并且无需使用shell
下面是一个程序pipe3调用pipe4的代码示例：

**pipe3:**

```c++
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main()
{
    int data_proccessed;
    int file_pipe[2];
    const char some_data[]="123";
    char buffer[BUFSIZ+1];
    pid_t fork_result;
    //分配内存

    memset(buffer,'\0',sizeof(buffer));
    //创建管道

    if(pipe(file_pipes)==0){
        fork_result=fork();
        if(fork_result==(pid_t)-1){
            fprintf(stderr,"Fork failure");
            exit(EXIT_FAILURE);
        }
    }
    //成功创建分支

    if(fork_result==0){
        sprintf(buffer,"%d",file_pipes[0]);
        //执行对应的程序和函数

        (void)execl("pip4","pip4",buffer,(char*)0);
        exit(EXIT_FAILURE);
    }else{
        date_processed=write(file_pipes[1],some_data,strlen(some_data));
        printf("%d - wrote %d bytes \n",getpid(),data_processed);
    }
}
```

pip4代码如下所示：

```c++
// The 'consumer' program, pipe4.c, that reads the data is much simpler.
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main(int argc, char *argv[])
{
    int data_processed;
    char buffer[BUFSIZ + 1];
    int file_descriptor;

    memset(buffer, '\0', sizeof(buffer));
    sscanf(argv[1], "%d", &file_descriptor);
    data_processed = read(file_descriptor, buffer, BUFSIZ);

    printf("%d - read %d bytes: %s\n", getpid(), data_processed, buffer);
    exit(EXIT_SUCCESS);
}
```

输出结果如下：
```shell
15115 - wrote 3 bytes
15116 - read 3 bytes: 123
```

#### 13.5.1 管道关闭后的读操作

没有数据可以读取时，管道read通常会阻塞。对一个已关闭写数据的管道做read调用将返回0(无效是返回-1)而不是阻塞。当fork对管道进行调用时，会有两个而不同的文件描述符用于向管道写数据。在子进程中。只有把父子进程中的针对管道的写文件描述符都关闭，管道才会被认为是关闭了。调用read()才会失败。

#### 13.5.2 把管道用作标准输入和标准输出

可以使用dup函数复制管道文件描述符，来进行更简单的管道读取操作。
```
#include <unistd.h>

int dup(int file_descriptor);
int dup2(int file_descriptor_one,int file_descriptor_two);
```

![dup操作](https://wangpengcheng.github.io/img/2019-09-20-15-44-30.png)

关闭文件描述符，调用dup发生了什么的最简单方法，4个文件描述符的状态在这一个过程中的改变情况。

![相关描述符操作](https://wangpengcheng.github.io/img/2019-09-20-15-46-48.png)

下面是文件描述符的相关操作

```c
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>

int main()
{
    int data_processed;
    int file_pipes[2];
    const char some_data[] = "123";
    pid_t fork_result;

    if (pipe(file_pipes) == 0) {//在这里创建管道
        //执行fork创建子进程

        fork_result = fork();
        if (fork_result == (pid_t)-1) {
            fprintf(stderr, "Fork failure");
            exit(EXIT_FAILURE);
        }

        if (fork_result == (pid_t)0) {
            //子进程先关闭它的标准输入

            close(0);
            //将与管道读取相关的文件描述符复制为file_pipes[0]，即标准输入

            dup(file_pipes[0]);
            //关闭原来的文件读取描述符

            close(file_pipes[0]);
            //关闭子进程的管道写数据符。此时子进程只有一个与管道关联的文件描述符即标准输入文件描述符0

            close(file_pipes[1]);
            //启动从任何标准输入读取数据的程序

            execlp("od", "od", "-c", (char *)0);
            exit(EXIT_FAILURE);
        }
        else {
            //父进程首先关闭读取端管程通道，

            close(file_pipes[0]);
            //向管道中写入数据

            data_processed = write(file_pipes[1], some_data,
                                   strlen(some_data));
            //关闭管道写入端并退出

            close(file_pipes[1]);
            printf("%d - wrote %d bytes\n", (int)getpid(), data_processed);
        }
    }
    exit(EXIT_SUCCESS);
}
/*
输出结果：
0000000   1   2   3
0000003

*/

```
od成都读取写到管道中的3个字节数据之后，后续的读操作将返回0字节，表示已到达文件末尾，当读操作返回0时，od程序就会退出运行。相当于运行od命令然后Ctrl+D组合键发送文件尾部标志。


![管道情况对比](https://wangpengcheng.github.io/img/2019-09-20-17-07-52.png)

**注意:管道的大小最多为64KB**

### 13.6 命名管道：FIFO

使用FIFO文件来实现不相关进程之间的数据交换。通常也被命名为**命名管道(named pipe)**。它是一种特殊的文件，可以使用`mkfifo filename `或者`mknod filename p`来创建命名管道。

然后在程序中使用不同的函数来进行调用

```c
#include <sys/types.h>
#include <sys/stat.h>

int mkinfo(const char *filename,mode_t mode);
int mknod(const char *filename,mode_t mode | S_IFIFO, (dev_t)0);

```

mknod主要用来创建多种类型的特殊文件。

创建的管道文件会，会成为一个特殊文件，文件类型为p。接下来就可以对这个文件进行一系列的共享操作。

可以在两个终端中分别执行下面的语句`cat /temp/my_info`和`echo "Hello Word" > /tmp/my_info`单独执行其中一个都会应为管道中没有数据流动造成阻塞。当另外一个启动时，因为数据的正常流动，因此程序可以正常运行并退出。这里与pipe函数创建的相关进程不同。

注意：

- 使用open打开FIFO文件，不能设置读写模式；只能设置成为单一模式，即:`O_RDONLY`、`O_WRONLY`和`O_NONBLOCK`方式进行。
- 使用`O_NONBLOCK`无文件锁操作时，即便没有另外一个操作也会立即返回。
- 当接受数据过大时：
  - 如果请求写入的数据的长度小于等于PIPE_BUF字节，调用失败，数据不能写入。
  - 如果请求写入的数据的长度大于PIPE_BUF字节，将写入部分数据，返回实际写入的自己数，也可能返回0。
- `PIPE_BUF`通常定义在`limits.h`中。一般是4096B即2KB。
- 当多个进程进行读取或者写入时，由操作系统保证文件操作的原子性

下面是使用FIFO的生产者、消费者示例


```c++
//生产者

// Let's start with the header files, a #define and the check that the correct number
// of command-line arguments have been supplied.

#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <fcntl.h>
#include <sys/types.h>
#include <sys/stat.h>

#define FIFO_NAME "/tmp/my_fifo"

int main(int argc, char *argv[])
{
    int res;
    int open_mode = 0;
    int i;

    if (argc < 2) {
        fprintf(stderr, "Usage: %s <some combination of\
               O_RDONLY O_WRONLY O_NONBLOCK>\n", *argv);
        exit(EXIT_FAILURE);
    }

// Assuming that the program passed the test, we now set the value of open_mode
// from those arguments.

    for(i = 1; i < argc; i++) {
        if (strncmp(*++argv, "O_RDONLY", 8) == 0)
             open_mode |= O_RDONLY;
        if (strncmp(*argv, "O_WRONLY", 8) == 0)
             open_mode |= O_WRONLY;
        if (strncmp(*argv, "O_NONBLOCK", 10) == 0)
             open_mode |= O_NONBLOCK;
     }

// We now check whether the FIFO exists and create it if necessary.
// Then the FIFO is opened and output given to that effect while the program
// catches forty winks. Last of all, the FIFO is closed.

    if (access(FIFO_NAME, F_OK) == -1) {
        res = mkfifo(FIFO_NAME, 0777);
        if (res != 0) {
            fprintf(stderr, "Could not create fifo %s\n", FIFO_NAME);
            exit(EXIT_FAILURE);
        }
    }

    printf("Process %d opening FIFO\n", getpid());
    res = open(FIFO_NAME, open_mode);
    printf("Process %d result %d\n", getpid(), res);
    sleep(5);
    if (res != -1) (void)close(res);
    printf("Process %d finished\n", getpid());
    exit(EXIT_SUCCESS);
}

```

消费者程序

```c++
//消费者程序

#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <fcntl.h>
#include <limits.h>
#include <sys/types.h>
#include <sys/stat.h>

#define FIFO_NAME "/tmp/my_fifo"
#define BUFFER_SIZE PIPE_BUF
#define TEN_MEG (1024 * 1024 * 10)

int main()
{
    int pipe_fd;
    int res;
    int open_mode = O_WRONLY;
    int bytes_sent = 0;
    char buffer[BUFFER_SIZE + 1];

    if (access(FIFO_NAME, F_OK) == -1) {
        res = mkfifo(FIFO_NAME, 0777);
        if (res != 0) {
            fprintf(stderr, "Could not create fifo %s\n", FIFO_NAME);
            exit(EXIT_FAILURE);
        }
    }

    printf("Process %d opening FIFO O_WRONLY\n", getpid());
    pipe_fd = open(FIFO_NAME, open_mode);
    printf("Process %d result %d\n", getpid(), pipe_fd);

    if (pipe_fd != -1) {
        while(bytes_sent < TEN_MEG) {
            res = write(pipe_fd, buffer, BUFFER_SIZE);
            if (res == -1) {
                fprintf(stderr, "Write error on pipe\n");
                exit(EXIT_FAILURE);
            }
            bytes_sent += res;
        }
        (void)close(pipe_fd);
    }
    else {
        exit(EXIT_FAILURE);
    }

    printf("Process %d finished\n", getpid());
    exit(EXIT_SUCCESS);
}

```
#### 13.6.2 高级主题：使用FIFO的客户段/服务器应用程序

一个客户端服务器的例子：
客户端头文件：client.h

```c++
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <string.h>
#include <fcntl.h>
#include <limits.h>
#include <sys/types.h>
#include <sys/stat.h>

#define SERVER_FIFO_NAME "/tmp/serv_fifo"
#define CLIENT_FIFO_NAME "/tmp/cli_%d_fifo"
#define BUFFER_SIZE 20

//定义传输的数据结构

struct data_to_pass_st {
    //客户端id
    pid_t  client_pid;
    //传输的信息
    char   some_data[BUFFER_SIZE - 1];
};
```

client.cpp

```c++
#include "client.h"
#include <ctype.h>

int main()
{
    int server_fifo_fd, client_fifo_fd;
    //声明发送数据

    struct data_to_pass_st my_data;
    int times_to_send;
    char client_fifo[256];
    //打开sever FIFO文件

    server_fifo_fd = open(SERVER_FIFO_NAME, O_WRONLY);
    if (server_fifo_fd == -1) {
        fprintf(stderr, "Sorry, no server\n");
        exit(EXIT_FAILURE);
    }

    my_data.client_pid = getpid();
    //创建命名管道信息

    sprintf(client_fifo, CLIENT_FIFO_NAME, my_data.client_pid);

    if (mkfifo(client_fifo, 0777) == -1) {
        fprintf(stderr, "Sorry, can't make %s\n", client_fifo);
        exit(EXIT_FAILURE);
    }

    //循环5次，每次循环中，客户将数据发送给服务器，然后打开客户FIFO(只读)并读回数据。最后关闭服务器FIFO并将客户端从文件系统中删除

    for(times_to_send = 0; times_to_send < 5; times_to_send++) {
        sprintf(my_data.some_data, "Hello from %d"，my_data.client_pid);
        printf("%d sent %s, ", my_data.client_pid, my_data.some_data);
        write(server_fifo_fd, &my_data, sizeof(my_data));
        //打开client相关文件；描述符

        client_fifo_fd = open(client_fifo, O_RDONLY);
        if (client_fifo_fd != -1) {
            //读取数据并输出相关信息

            if (read(client_fifo_fd, &my_data, sizeof(my_data)) > 0) {
                printf("received: %s\n", my_data.some_data);
            }
            close(client_fifo_fd);
        }
    }
    //关闭服务器连接

    close(server_fifo_fd);
    unlink(client_fifo);
    exit(EXIT_SUCCESS);
}
```

下面是服务器端的相关代码：

```c++
//server.
#include "client.h"
#include <ctype.h>

int main()
{
    int server_fifo_fd, client_fifo_fd;
    struct data_to_pass_st my_data;
    int read_res;
    char client_fifo[256];
    char *tmp_char_ptr;
    //创建管程

    mkfifo(SERVER_FIFO_NAME, 0777);
    //打开管程文件

    server_fifo_fd = open(SERVER_FIFO_NAME, O_RDONLY);
    if (server_fifo_fd == -1) {
        fprintf(stderr, "Server fifo failure\n");
        exit(EXIT_FAILURE);
    }

    sleep(10); /* lets clients queue for demo purposes */

    do {
        //读取对应数据

        read_res = read(server_fifo_fd, &my_data, sizeof(my_data));
        if (read_res > 0) {
            //获取对应的char字符串

            tmp_char_ptr = my_data.some_data;
            //处理字符串，变为大写并输出

            while (*tmp_char_ptr) {
                *tmp_char_ptr = toupper(*tmp_char_ptr);
                tmp_char_ptr++;
            }
            //将my_data.client_pid和CLIENT_FIFO_NAME合并到client_fifo并输出

            sprintf(client_fifo, CLIENT_FIFO_NAME, my_data.client_pid);
            //打开客户端管道，将处理过的数据发送回去，最后关闭服务器管道的文件描述符

            client_fifo_fd = open(client_fifo, O_WRONLY);
            if (client_fifo_fd != -1) {
                write(client_fifo_fd, &my_data, sizeof(my_data));
                close(client_fifo_fd);
            }
        }
    } while (read_res > 0);
    //关闭服务器的文件描述符

    close(server_fifo_fd);
    unlink(SERVER_FIFO_NAME);
    exit(EXIT_SUCCESS);
}

```

启动服务器执行下面的指令

```bash
#让服务器在后台运行

./server &
#这里让客户端连续读取5次数据

for i in 1 2 3 4 5
do 
    ./client &
done
```

输出结果如下所示

```bash
28375 sent Hello from 28375, received: HELLO FROM 28375
28377 sent Hello from 28377, received: HELLO FROM 28377
28374 sent Hello from 28374, received: HELLO FROM 28374
28373 sent Hello from 28373, received: HELLO FROM 28373
28376 sent Hello from 28376, received: HELLO FROM 28376
28375 sent Hello from 28375, received: HELLO FROM 28375
28377 sent Hello from 28377, received: HELLO FROM 28377
28373 sent Hello from 28373, received: HELLO FROM 28373
28376 sent Hello from 28376, received: HELLO FROM 28376
28375 sent Hello from 28375, received: HELLO FROM 28375
28374 sent Hello from 28374, received: HELLO FROM 28374
28373 sent Hello from 28373, received: HELLO FROM 28373
28375 sent Hello from 28375, received: HELLO FROM 28375
28376 sent Hello from 28376, received: HELLO FROM 28376
28373 sent Hello from 28373, received: HELLO FROM 28373
28374 sent Hello from 28374, received: HELLO FROM 28374
28375 sent Hello from 28375, received: HELLO FROM 28375
28377 sent Hello from 28377, received: HELLO FROM 28377
28376 sent Hello from 28376, received: HELLO FROM 28376
28374 sent Hello from 28374, received: HELLO FROM 28374
28377 sent Hello from 28377, received: HELLO FROM 28377
28376 sent Hello from 28376, received: HELLO FROM 28376
28377 sent Hello from 28377, received: HELLO FROM 28377
28373 sent Hello from 28373, received: HELLO FROM 28373
28374 sent Hello from 28374, received: HELLO FROM 28374
```

注意这里的数据交互管道基本打开就结束了，服务器持续运行，直到最后一个客户端关闭服务器管道为止。这将使服务器的read调用失败(返回0)，从而跳出循环。

因此需要持续等待客户端时，需要进行修改：

- 对自己的服务器管道打开一个文件描述符，这样read调用将总是阻塞而不是返回0。
- 当read返回0时，关闭并重新打开服务器，使得服务器进程阻塞在open调用处以等待客户的到来。


## 第 14 章 信号量、共享内存和消息队列

### 14.1 信号量

操作系统中存在的临界区域会，造成较大的影响。**临界区域**中代码的更新和执行都是独占式的。

信号量：只允许对它进行等待和发送信号这个两个操作。

- P(信号量变量):用于等待
- V(信号量变量)：用于发送信号

二进制信号(最简单的信号)sv,其pv操作结果如下所示

![操作定义表](https://wangpengcheng.github.io/img/2019-09-22-15-01-05.png)

下面代码展示了简单的临界区工作：

```
semaphore sv=1;
loop forever{
    P(sv);
    critical code section;
    V(sv);
    noncritical code section;
}
```

![pv操作守护临界区](https://wangpengcheng.github.io/img/2019-09-22-15-03-56.png)

下面是信号量函数的定义

```c
#include <sys/sem.h>


int semctl(int sem_id,int sem_num,int comman,...);
//创建一个新信号量或者取得一个已有信号量的键，num_sems函数基本都为1

int semget(key_t key,int num_sems,int sem_flags);
//

int semop(int sem_id,struct sembuf *sen_ops,size_t num_sem_ops);
```

上面的key作用很像一个文件名，它代表程序可能要使用的某个资源。不同的进程可以使用它访问同一个信号量。**程序对所有信号量的访问都是间接的，先提供一个键，再生成一个相应的信号量标识符。** 只有semget函数才直接使用信号量。函数使用成功时返回一个正数值，作为**其它信号量函数将用到的信号量标识符**

**2.semop函数**

改变信号量的值，其中`sem_id`是semget返回的信号量标识符。第二个参数sem_ops结构如下所示：

```c
struct sembuf{
    short sem_num;//信号量编号，一般为0
    short sem_op;//信号量需要改变的值
    short sem_flg;//通常为SEM_UNDO，让进程在没有释放该信号量的情况下终止
}
```

**3.semctl函数**

直接控制信号量信息。sem_id是信号量标识符。sem_num参数是信号量编号。对成组信号量需要用到这个，此时会有第四个参数关键结构如下：

```c
union semun{
    int val;
    struct semid_ds *buf;
    unsigned short *array;
}
```
command参数值如下：

- SETVAL:将信号量初始化为一个已知的值。
- IPC_RMID:用于深处一个已经无需继续使用的信号量标识符。

下面是信号量的一个简单使用

```c++
#include <unistd.h>
#include <stdlib.h>
#include <stdio.h>
#include <sys/sem.h>

#if defined(__GNU_LIBRARY__) && !defined(_SEM_SEMUN_UNDEFINED)
    /* union semun is defined by including <sys/sem.h> */
#else
    /* according to X/OPEN we have to define it ourselves */
    union semun {
        int val;                    /* value for SETVAL */
        struct semid_ds *buf;       /* buffer for IPC_STAT, IPC_SET */
        unsigned short int *array;  /* array for GETALL, SETALL */
        struct seminfo *__buf;      /* buffer for IPC_INFO */
    };
#endif
//设置静态韩式

static int set_semvalue(void);
static void del_semvalue(void);
static int semaphore_p(void);
static int semaphore_v(void);

static int sem_id;

int main(int argc,char *argv[])
{
    int i;
    int pause_time;
    char op_char='O';

    srand((int)getpid());
    //创建信号量标识符sem_id

    sem_id=semget((key_t)1234,0666|IPC_CREAT);
    //如果程序第一此被调用，带有一个参数argc>1

    printf("pid:%d,sem_id%d \n",getpid(),sem_id);fflush(stdout);
    if(argc>1){
        //成功初始化信号量

        if(set_semvalue()){

            fprintf(stderr,"Failed to initialize semaphore\n");
            exit(EXIT_FAILURE);
        }
        //设置op_char，第一个是使用的X

        op_char='X';
        sleep(2);
    }
    //循环10次不断进入和离开临界区

    for(i=0;i<10;++i){
        //程序进入临界区域时设置信号量以等待进入

        if(!semaphore_p()) exit(EXIT_FAILURE);
        //输出对应值

        printf("%c",op_char);
        //刷新缓冲，立即输出

        fflush(stdcout);
        //睡眠1-3秒

        pause_time=rand()%3;
        sleep(pause_time);
        //离开临界区时，打印一个字符

        printf("%c",op_char);
        fflush(stdout);
        //执行v操作释放临界区域

        if(!semaphore_v()) exit(EXIT_FAILURE);
        pause_time=rand()%2;
        sleep(pause_time);
    }
    printf("\n %d-finished\n ",getpid());
    if(argc>1){
        sleep(10);
        del_semvalue();
    }
    exit(EXIT_SUCCESS);
}
//其它相关函数的定义

static int set_semvalue(void)
{
    union semun sem_union;
    sem_union.val=1;
    //初始化信号量

    if(semctl(sem_id,0,SETVAL,sem_union)==-1) return(0);
    return(1);
}


static int del_semvalue(void)
{
    union semun sem_union;
    sem_union.val=1;
    //删除信号量

    if(semctl(sem_id,0,IPC_RMID,sem_union)==-1) {
        fprintf(stderr,"Failed to delete semaphore\n");
    }
}
//对信号量做-1操作

static int semaphore_p(void)
{
    struct sembuf sem_b;
    sem_b.sem_num=0;
    sem_b.sem_op=-1;
    sem_b.sem_flg=SEM_UNDO;
    if(semop(sem_id,&sem_b,1)==-1){
        fprintf(stderr,"semaphore_p failed\n");
        return(0);
    }
    return(1);
}

//释放操作，信号量+1

static int semaphore_v(void)
{
    struct sembuf sem_b;
    sem_b.sem_num=0;
    sem_b.sem_op=1;
    sem_b.sem_flg=SEM_UNDO;
    if(semop(sem_id,&sem_b,1)==-1){
        fprintf(stderr,"semaphore_p failed\n");
        return(0);
    }
    return(1);
}
```

上述程序可以使用多次启用的方法来进行使用。注意这里的临界区就是输出缓冲。并且在执行时，二者的sem_id相同。

### 14.2 共享内存

_参考链接：_ 
- [进程间通信之-共享内存Shared Memory--linux内核剖析（十一）](https://blog.csdn.net/gatieme/article/details/51005811)
- [linux 共享内存、互斥锁介绍](https://blog.csdn.net/lizhengze1117/article/details/89450495)

共享内存允许两个相关的进程访问**同一个逻辑内存**。共享内存是在两个正在运行的进程之间传递数据的一种非常有效的方式。

共享内存是由IPC为进程创建的一个特殊的地址范围，它将出现在该进程的地址空间中。使用起来好像就是自己分配的一样。但是并未提供同步机制。共享内存的访问同步控制必须由程序员自己来负责

![共享内存方式](https://wangpengcheng.github.io/img/2019-09-22-16-55-29.png)

共享内存使用的函数类似于信号量函数，他们的定义如下：

```c
#include <sys/shm.h>

void *shmat(int shm_id,const void *shm_addr,int shmflg);
int shmctl(int shm_id,int cmd,struct shmid_ds *buf);
int shmdt(const void *shm_addr);
int shmget(key_t key,size_t size,int shmflg);
```

#### 14.2.1 shmget函数

`int shmget(key_t key,size_t size,int shmflg);`

使用key可以创建共享内存，并为共享内存段命名。成功执行返回一个内存标识符。shmflg包括9个比特的权限标志。`IPC_CREAT`定义的特殊比特必须和权限标志按位或才能创建一个新的共享内存段。如果失败就返回-1。

#### 14.2.2 shmat函数

`void *shmat(int shm_id,const void *shm_addr,int shmflg);`

内存分配后，不能被任何进程访问。这时需要将其连接到一个进程的地址空间中。这项工作由shmat函数完成。shm_addr指定的是共享内存链接到当前进程中的地址位置。它通常是一个空指针，表示让系统来选择共享内存出现的地址。这个主要是映射共享内存。
shmflg是一组标志，可能取值是`SHM_RND`和`SHM_RDONLY`(内存只读)。调用成功，他返回指向共享内存第一个字节的指针；如果失败，它就返回-1。

#### 14.2.3 shmdt

将共享内存从当前进程中分离。参数是shmat返回的地址指针。成功时返回0，失败时返回-1。这里只是使得共享内存对当前进程不再可用。

#### 14.2.4 shmctl

`int shmctl(int shm_id,int cmd,struct shmid_ds *buf);`

共享内存控制函数，`shmid_ds`结构至少包括一下内容：
```c
struct shmid_da{
    uid_t shm_perm.uid;
    uid_t shm_perm.gid;
    mode_t shm_perm.mode;
}
```
command参数是要采取的动作，它可以取3个值，如下所示：

![command动作](https://wangpengcheng.github.io/img/2019-09-22-19-26-12.png)

buf是一个指针，它指向包含共享内存模式和访问权限的结构。成功时返回0，失败时返回-1。通常被删除的共享内存段还能继续使用，直到它从最后一个进程中分离为止。

下面是一段简单的实验代码
**公共头文件，定义共享内存结构**

```c
//file shm_com.h

#define TEXT_SZ 2048

struct shared_use_st{
    int written_by_you;
    char some_text[TEXT_SZ];
}

```
**shm1.c消费者程序**

```c++
#include <unistd.h>

#include <stdlib.h>

#include <stdio.h>

#include <string.h>

#include <sys/shm.h>

#include "shm_com.h"

int main()
{
    int running=1;
    //创建内存空指针

    void *shared_memory=(void*)0;
    //定义内存结构体模型
    
    struct shared_use_st *shared_stuff;
    int shmid;

    srand((unsigned int)getpid());
    //进行内存分配

    shmid=shmget((key_t)1234,sizeof(struct shared_use_st),0666|IPC_CREAT);
    if(shmid==-1){
        fprintf(stderr,"shmget failed\n");
        exit(EXIT_FAILURE);
    }
    //将共享内存指向当前进程的指针。

    shared_memory=shmat(shmid,(void*)0,0);
    //内存映射失败，返回错误值

    if(shared_memory==(void*)-1){
        fprintf(stderr,"shmat failed\n");
        exit(EXIT_FAILURE);
    }
    printf("Memory attached at %X\n",(int)shared_memory);
    //将指针中的内存转换为可用的指针格式

    shared_stuff=(struct shared_use_st*)shared_memory;
    share_stuff->written_by_you=0;
    while(running){
        //如果其中的数据被写入

        if(shared_stuff->witten_by_you){
            printf("You wrote:%s",shared_stuff->some_text);
            //休眠一段时间让其它进程等待

            sleep(rang()%4);
            shared_stuff->written_by_you=0;
        }
    }
    //最后分离共享内存

    if(shmdt(shared_memory)==-1){
        fprintf(stderr,"shmdt failed \n");
        exit(EXIT_FAILURE);
    }
    //删除和释放共享内存

    if(shmctl(shmid,IPC_RMID,0)==-1){
        fprintf(stderr,"shmctk(IPC_RMID) faild\n");
        exit(EXIT_FAILURE);
    }
}

```

**shm2.c生产者程序**

向消费者程序输入数据，与shml.c很相似。主要代码如下：

```c++
#include <unistd.h>

#include <stdlib.h>

#include <stdio.h>

#include <string.h>

#include <sys/shm.h>

#include "shm_com.h"

int main()
{
    int running=1;
    void *shared_memory=(void*)0;
    struct shared_use_st *shared_stuff;
    //程序缓冲

    char buffer[BUFSIZ];
    //共享内存标识符

    int shmid;
    //注意这里再次分配一块已经存在的内存块，不会创建新的页面，而只会返回一个标识内存块的标识符

    shmid = shmget((key_t)1234, sizeof(struct shared_use_st), 0666 | IPC_CREAT);

    if (shmid == -1) {
        fprintf(stderr, "shmget failed\n");
        exit(EXIT_FAILURE);
    }

    shared_memory = shmat(shmid, (void *)0, 0);
    if (shared_memory == (void *)-1) {
        fprintf(stderr, "shmat failed\n");
        exit(EXIT_FAILURE);
    }

    printf("Memory attached at %X\n", (int)shared_memory);
    //将内存转换为指针

    shared_stuff = (struct shared_use_st *)shared_memory;
    while(running) {
        while(shared_stuff->written_by_you == 1) {
            sleep(1);
            printf("waiting for client...\n");
        }
        //等待输入

        printf("Enter some text: ");
        fgets(buffer, BUFSIZ, stdin);
        //输入的buffer拷贝到shared_stuff中

        strncpy(shared_stuff->some_text, buffer, TEXT_SZ);
        //重置信号量，表示已经生产了字符

        shared_stuff->written_by_you = 1;
        //buffer后检查到了end字符

        if (strncmp(buffer, "end", 3) == 0) {
                //停止工作

                running = 0;
        }
    }
    //从当前进程中卸载内存。

    if (shmdt(shared_memory) == -1) {
        fprintf(stderr, "shmdt failed\n");
        exit(EXIT_FAILURE);
    }
    exit(EXIT_SUCCESS);
}

```
先后执行shm1和shm2就可以创建简单的读写者程序。其实上面更改为信号量来可能更加合适。

### 14.3 消息队列

消息队列提供了一种从一个进程向另外一个进程发送一个数据块的方法。独立于发送和接收进程而存在。消除了在同步命名管道的打开和关闭时可能产生的一些困难。但是消息与管道一样存在着数据块大小的限制。这些限制被写在`MSGMAX`和`MSGMNB`这两个系统宏定义中。

消息队列函数的定义如下

```c
#include <sys/msg.h>

int msgctl(int msqid,int cmd,struct msqid_ds *buf);
int msgget(key_t key,int msgflg);
int msgrcv(int msgid,void *msg_ptr,size_t msg_sz,long int msgtype,int msgflg);
int msgsnd(int msqid,const void *msg_ptr,size_t mag_sz,int magflg);
```

#### 14.3.1 msgget函数

利用键值来命名某个特定的消息队列。特殊键值`IPC_PRIVATE`用于创建私有队列，应该只能被当前进程访问。但是在实际的操作系统中存在许多不同的状况。由`IPC_CREAT`定义的一个特殊位必须和权限标志按位或才能创建一个新的消息队列。

#### 14.3.2 msgsnd函数

消息的结构的成都必须小于系统规定的上限，其次，它必须以一个长整形变量成员开始，接受函数将用这个成员变量来确定消息的类型。当使用消息时，最好把消息结构定义为下面这样：

```c
struct my_message{
    long int message_type;
}
```
函数参数`msg_ptr`是一个指向准备发送消息的指针，消息必须像刚才说的呢样以一个长整型成员变量开始。`msg_sz`和`msg_ptr`指向的消息的长度，不能包括长整型消息类型成员变量的长度。

在`msgflg`中设置了`IPC_NOWAIT`标志，函数将立刻返回，不发送消息就返回-1.如果立即放松标志被秦楚，则发送进程将挂起以等待队列中腾出可用空间。

#### 14.3.3 msgrcv函数

从一个消息队列中获取消息,

`int msgrcv(int msgid,void *msg_ptr,size_t msg_sz,long int msgtype,int msgflg);`

msg_ptr指向一个准备接受消息的指针，消息必须以一个长整型成员变量开始。
msg_sz和msg_ptr指向的消息的长度，它不包括长整型消息类型成员变量的长度。
msgtype是一个长整数，可以实现简单形式的接首优先级。如果其值为0，就获取队列中的第一个可用消息(按照消息发送的顺序来接收他们)。如果大于0，将获取具有相同消息类型的第一个消息(接收某一特定类型的消息)。如果小于0，将获取消息类型等于或小鱼msgtype的绝对值的第一个消息(接受类型小于或者等于n的消息)。


#### 14.3.4 msgctl函数

它的作用与共享内存的控制函数非常相似:

`int msgctl(int msqid,int cmd,struct msqid_ds *buf);`

msqid_ds结构至少包括以下成员函数

```c
struct msqid_ds{

    uid_t msg_perm.uid;
    uid_t msg_perm.gid;
    mode_t msg_perm,mode;
}
```

command可用参数值如下

![command可用参数](https://wangpengcheng.github.io/img/2019-09-23-16-10-52.png)

下面是一个接受者和使用者的消息队列示例：

**接受者msg1.c**

```c++
/* Here's the receiver program. */

#include <stdlib.h>

#include <stdio.h>

#include <string.h>

#include <errno.h>

#include <unistd.h>

#include <sys/msg.h>

//定义接收的结构体

struct my_msg_st {
    //消息的类型

    long int my_msg_type;
    //主要的消息字段

    char some_text[BUFSIZ];
};

int main()
{
    int running = 1;
    int msgid;
    struct my_msg_st some_data;
    long int msg_to_receive = 0;

    //创建消息队列

    msgid = msgget((key_t)1234, 0666 | IPC_CREAT);

    if (msgid == -1) {
        fprintf(stderr, "msgget failed with error: %d\n", errno);
        exit(EXIT_FAILURE);
    }
    //循环从队列中获取消息，直到遇到end消息为止

    while(running) {
        //接受消息

        if (msgrcv(msgid, (void *)&some_data, BUFSIZ,msg_to_receive, 0) == -1) {
            fprintf(stderr, "msgrcv failed with error: %d\n", errno);
            exit(EXIT_FAILURE);
        }
        printf("You wrote: %s", some_data.some_text);
        if (strncmp(some_data.some_text, "end", 3) == 0) {
            running = 0;
        }
    }
    //接受消息完毕之后，销毁消息

    if (msgctl(msgid, IPC_RMID, 0) == -1) {
        fprintf(stderr, "msgctl(IPC_RMID) failed\n");
        exit(EXIT_FAILURE);
    }

    exit(EXIT_SUCCESS);
}

```

**生产者msg2.c**

```c++

/* The sender program is very similar to msg1.c. In the main set up, delete the
 msg_to_receive declaration and replace it with buffer[BUFSIZ], remove the message
 queue delete and make the following changes to the running loop.
 We now have a call to msgsnd to send the entered text to the queue. */

#include <stdlib.h>

#include <stdio.h>

#include <string.h>

#include <errno.h>

#include <unistd.h>

#include <sys/msg.h>

#define MAX_TEXT 512

struct my_msg_st {
    long int my_msg_type;
    char some_text[MAX_TEXT];
};

int main()
{
    int running = 1;
    struct my_msg_st some_data;
    int msgid;
    char buffer[BUFSIZ];
    //创建消息

    msgid = msgget((key_t)1234, 0666 | IPC_CREAT);

    if (msgid == -1) {
        fprintf(stderr, "msgget failed with error: %d\n", errno);
        exit(EXIT_FAILURE);
    }
    //一直在运行
    
    while(running) {
        printf("Enter some text: ");
        //获取标准输入

        fgets(buffer, BUFSIZ, stdin);
        //设置消息类型

        some_data.my_msg_type = 1;
        //将文字转换到some_data结构体中

        strcpy(some_data.some_text, buffer);
        //获取消息返回

        if (msgsnd(msgid, (void *)&some_data, MAX_TEXT, 0) == -1) {
            fprintf(stderr, "msgsnd failed\n");
            exit(EXIT_FAILURE);
        }
        //检查是否输入end

        if (strncmp(buffer, "end", 3) == 0) {
            running = 0;
        }
    }

    exit(EXIT_SUCCESS);
}

```

上述程序执行结果如下：

```bash
./msg2
Enter some text: 123456
Enter some text: 123564
Enter some text: 121355
Enter some text: end
./msg1
You wrote: 123456
You wrote: 123564
You wrote: 121355
You wrote: end


```

### 14.5 IPC状态命令

大多数linux提供了一组命令，用于从命令行上访问IPC信息以及清理游离的IPC机制。`ipcs`和`ipcrm`来清理程序执行过程中遗留的IPC资源(如消息队列中的数据)。

#### 14.5.1 显示信号量状态

使用`ipcs -s`显示信号量状态并使用`ipcrm -s smgid`来对信号量进行删除。

#### 14.5.2 显示共享内存状态

使用`ipcs -m`显示共享内存状态。

#### 14.5.3 显示消息队列状态

使用`ipcs -q`和`ipcrm -q <id>`可以显示消息的状态。


# Linux 程序设计 阅读笔记(五)

## 参考链接：

- [Linux内核文档首页](https://www.kernel.org/doc/Documentation/)
- [Linux文档](https://linux.die.net/)
- [Linux c 开发手册](https://legacy.gitbook.com/book/wizardforcel/linux-c-api-ref/details)
- [Linux Kernel API](https://www.kernel.org/doc/htmldocs/kernel-api/index.html)
- [书中代码地址](http://www.wrox.com/WileyCDA/WroxTitle/Beginning-Linux-Programming-4th-Edition.productCd-0470147628,descCd-DOWNLOAD.html)
- [POSIX thread (pthread) libraries](https://www.cs.cmu.edu/afs/cs/academic/class/15492-f07/www/pthreads.html)

## 第 15 章 套接字(socket)

socket是管道概念的一个廓镇。使用与管道类似的方法来使用套接字，套接字中还包括了计算机网络中的通信。
本章主要内容：

- 套接字链接的工作原理
- 套接字的属性、地址和通信
- 网络信息和互联网守护进程(inetf/xinetd)
- 客户和服务器

### 15.1 什么是套接字

套接字(socket)是一种通信机制，客户端/服务器系统的开发工作既可以在本地进行，也可以跨网络进行。socket明确的将客户端与服务器区分开来，这也是socket区别于管道通信的地方。

### 15.2 socket连接

1. 服务器应用程序用系统调用socket来创建一个socket套接字。它是系统分配个该服务器进程的类似文件描述符的资源，不能与其它进行共享。
2. 服务器会给socket起一个名字，本地socket名称是Linux文件系统中的文件名。一般放在/tmp或者/usr/tmp目录中。Linux将进入的特定端口号的连接转接到正确的拂去其进程。服务器系统使用bind来给套接字命名，然后服务器进程就开始等待客户连接到命名套接字。系统使用listen创建一个队列并将其用于存放来自客户端的接入连接。条用accept来接受客户端的连接。
3. 服务器调用accept时，新建一个与特定客户端相关的新的套接字来方便通信。

下面是一个简单的本地客户端

```c++
/*  Make the necessary includes and set up the variables.  */

#include <sys/types.h>

#include <sys/socket.h>

#include <stdio.h>

#include <sys/un.h>

#include <unistd.h>

#include <stdlib.h>

int main()
{
    //声明sockfd文件描述索引

    int sockfd;
    int len;
    //声明地址

    struct sockaddr_un address;
    int result;
    char ch = 'A';
    //创建socket

    sockfd = socket(AF_UNIX, SOCK_STREAM, 0);

    //设置socket名称，作为服务器请求和答应

    address.sun_family = AF_UNIX;
    strcpy(address.sun_path, "server_socket");
    len = sizeof(address);
    //将我们的套接字连接到服务器的套接字上

    result = connect(sockfd, (struct sockaddr *)&address, len);

    if(result == -1) {
        perror("oops: client1");
        exit(1);
    }
    //通过sockfd进行读写
    write(sockfd, &ch, 1);
    read(sockfd, &ch, 1);
    //输出获取的信息

    printf("char from server = %c\n", ch);
    //关闭连接

    close(sockfd);
    exit(0);
}

```

**server1.c服务器创建**

```c++
/*  Make the necessary includes and set up the variables.  */

#include <sys/types.h>

#include <sys/socket.h>

#include <stdio.h>

#include <sys/un.h>

#include <unistd.h>

#include <stdlib.h>

int main()
{
    int server_sockfd, client_sockfd;
    int server_len, client_len;
    //服务器address

    struct sockaddr_un server_address;
    //客户端地址

    struct sockaddr_un client_address;
    //这里删除以前的套接字，为服务器创建一个未命名的套接字

    unlink("server_socket");

    server_sockfd = socket(AF_UNIX, SOCK_STREAM, 0);
    //对套接字进行命名

    server_address.sun_family = AF_UNIX;
    strcpy(server_address.sun_path, "server_socket");
    server_len = sizeof(server_address);
    bind(server_sockfd, (struct sockaddr *)&server_address, server_len);
    //创建一个连接队列，开始等待客户进行连接

    listen(server_sockfd, 5);
    //循环等待

    while(1) {
        char ch;
        printf("server waiting\n");
        //获取client长度

        client_len = sizeof(client_address);
        //接收一个client客户端请求，并产生一个套接字文件

        client_sockfd = accept(server_sockfd,(struct sockaddr *)&client_address, &client_len);
        //client_sockfd套接字上的客户端进行读写操作。

        read(client_sockfd, &ch, 1);
        ch++;
        write(client_sockfd, &ch, 1);
        //关闭客户端连接

        close(client_sockfd);
    }
}
```
使用如下命令在启动客户端和服务器`./server1 &` 和`./clinet1`。输出结果如下：

```bash
server waiting
char from server = B

```
注意用完一个套接字后，就应该把它删除掉，即使是在程序因接受到一个信号而异常终止的情况下。

#### 15.2.1 套接字(socket)属性

socket的主要属性如下：

1. 域(domain):指定socket通信中使用的网络介质。常见的套接字域是`AF_INET`，表示Internet网络协议。其底层的协议--网际协议(IP)只有一个地址族。常用服务端口号通常小于1024,有:打印机缓冲队列进程(515)、rlogin(513)、ftp(21)和httpd(80)等。小于1024的端口都是为系统服务保留的。并且所有服务的进程必须具有超级用户权限。在netdb.h中定义了一个常量`IPPORT_RESERVED`，代表保留端口号的最大值。也可以使用`AF_UNIX`表示UNIX文件系统域
2. 类型(type):因为Internet网中提供了两种不同的通信机制:流(stream)和数据报(datagram)，因此这里也提供了两种截然不同的套接字类型。
   1. 流套接字:提供一个有序、可靠、双向字节流的连接。发送出去的数据可以确保不会丢失、复制或者乱序到达。错误不会被显示。主要由`SOCK_STREAM`指定，在AF_INET域中，通过TCP/IP连接实现。
   2. 数据报套接字：由`SOCK_DGRAM`指定，不建立和维持一个连接。数据报长度有限制，数据报作为一个单独的网络消息被传输。存在错误。主要由UDP/IP连接实现的。但是开销小。不需要维持网络连接。速度较快。
3. 协议(protocol):底层传输机制，允许不止一个协议来提供要求的套接字类型。


#### 15.2.2 创建套接字

```c
#include <sys/types.h>
#include <sys/socket.h>

int socket(int domain,int type,int protocol);
```
`domain`指定协议族(INET/UNIX)，type参数指定通信类型(SOCK_STREAM/SOCK_DGRAM);protocol指定协议类型

domain参数可以指定的协议族如下：

![](https://wangpengcheng.github.io/img/2019-09-23-20-45-18.png)

#### 15.2.3 套接字地址

`AF_UNIX`地址结构由`sockaddr_un`来描述，该结构定义子啊头文件`sys/un.h`中

```c++
struct sockaddr_un
  {
    sa_family_t sun_family;
    /* Path name.  */
    char sun_path[];
  };
//下面是Ubuntu16.04 中的相关定义

struct sockaddr_un
  {
    __SOCKADDR_COMMON (sun_);
    /* Path name.  */
    char sun_path[108];
  };
```

如上所示Linux规定长度是108个字符。

在`AF_INET`中，地址结构由`sockaddr_in`来指定，该结构定义在头文件`netinet/in.h`中，它至少包括以下几项：

```c++
struct sockaddr_in{
    short int           sin_family;     /*AF_INET*/
    unsigned short int  sin_port;       /*Port number*/
    struct in_addr      sin_addr;       /*Internet address*/
}
```

ip地址结构定义如下:

```c++
typedef uint32_t in_addr_t;
struct in_addr
  {
    in_addr_t s_addr;
  };
```

#### 15.2.4 命名套接字

使用bind函数可以让创建的套接字可以被其它进程使用，服务器程序必须给套接字命名。这样`AF_UNIX`套接字就会关联到一个文件系统的路径名。AF_INET就会关联到一个IP端口号。

```c
#include <sys/socket.h>

int bind(int socket,const struct sockaddr *address,size_t address_len);
```

bind将address中的地址分配给与文件描述符socket关联的未命名套接字。地址长度由address_len传递。

**地址的长度和格式取决于地址族**，然后bind调用一个特定的地址结构指针转换为指向通用的地址类型(struct sockaddr*);调用成功返回0，失败返回-1，并设置errno为表15-2中的一个值

![套接字域和错误码](https://wangpengcheng.github.io/img/2019-09-23-21-07-48.png)

#### 15.2.5 创建套接字队列

服务器程序必须创建一个队列来保存未处理的请求。使用`listen`系统调用来完成这项工作。

```c++
int listen(int socket,int backlog)
```

backlog设置接收队列长度的值。Linux系统中也对可以容纳的未处理连接的最大数目做出限制。多出的连接将被拒绝。常用参数值是5。

#### 15.2.6 接受连接

服务器通过accept接受来自客户的等待队列的事件处理和连接:

```c++
int accept(int socket,struct sockaddr *address,size_t *address_len);
```

accept只有当排队的第一个未处理程序，试图连接到由socket参数指定的套接字上时才返回。accept函数将创建一个新套接字来与该客户进行通信，并返回新套接字的描述符。新套接字的类型和服务器监听套接字类型是一样的。

**注意：套接字必须事先bind调用命名，并且由listen调用分配给它一个连接队列。** 连接客户段的之地将被放入address参数指向的sockaddr结构中。也可以将其指定为空。

参数address_len指定客户地址结构的长度，超过则会被截断。因此address_len必须被设置为预期的地址长度。当调用返回时，长度会被设置成客户地址结构的实际长度。

如果等待队列为空，贼accept将会阻塞(程序将暂停)直到有客户建立连接为止。我们可以通过对套接字文件描述符设置`O_NONBLOCK`标志来改变这个行为。

```c++
int flags=fcntl(socket,F_GETFL,0);
fcntl(socket,F_SETFL,O_NONBLOCK|flags);
```

当有未处理的客户连接时，accept函数将返回一个新的套接字文件描述符。发生错误时返回-1，`O_NONBLOCK`对应`EWOULDBLOCK`错误，后者是当进程阻塞在accept调用时，执行被中断而产生的错误。

#### 15.2.7 请求连接

客户端使用未命名套接字和服务器监听套接字之间建立连接的方法来连接到服务器。它们通过connect调用来完成这个工作。

```c++
#include <sys/socket.h>

int connect(int socket,const struct sockaddr *address,size_t address_len);
```

socket指定的套接字是通过socket调用获得的一个有效的文件描述符。connect调用成功返回0，失败返回-1.可能的错误代码如下：

![可能存在的错误码](https://wangpengcheng.github.io/img/2019-09-24-10-14-07.png)

如果不能立刻建立连接，connect将调用阻塞一段不确定的时间。一旦超过这个时间到达，连接将被放弃。connect调用失败。但如果连接被信号中断，该信号又得到了处理，connect调用还是会失败，但是连接尝试并不会被放弃。而是以异步的方式继续建立。

#### 15.2.8 关闭套接字

使用close来关闭套接字。服务器read返回0时关闭套接字;但如果套接字是一个面向连接类型的，并且设置了SOCK_LINGER选项，close调用会在该套接字还有未传输数据时阻塞。

#### 15.2.9 套接字通信

应该尽量使用网络socket，文件系统的socket的缺点是，操作系统创建的套接字将创建子啊服务器程序的当前目录下。对于网路socket只需要选择一个未被使用的端口号即可。

端口号以及它们提供的服务通常都列在系统文件`/etc/services`中。

下面是一个修改过的客户端程序client2.c，它通过回路网络连接到一个网络套接字。这个程序有一个硬件相关的细微错误，我们将在本章的后面再讨论它

```c++
#include <sys/types.h>
#include <sys/socket.h>
#include <stdio.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <stdlib.h>

int main()
{
  int sockfd;
  int len;
  struct sockaddr_in address;
  int result;
  char ch='A';
  //为客户创建一个socket
  sockfd=socket(AF_INET,SOCK_STREAM,0);
  //命名套接字，与服务器保持一致
  address.sin_family=AF_INET;
  address.sin_addr.s_addr=inet_addr("127.0.0.1");
  address.sin_port=9734;
  len=sizeof(address);
}
```

这个程序会查找本地的9734端口。

服务器端(server2.c)需要添加的设置如下：

```c++
#include <sys/types.h>
#include <sys/socket.h>
#include <stdio.h>
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <stdlib.h>

int main()
{
  int server_sockfd,client_sockfd;
  int server_len,client_len;
  struct sockaddr_in server_address;
  struct sockaddr_in client_address;
  //创建一个未命名的套接字
  server_sockfd=socket(AF_INET,SOCK_STREAM,0);
  //设置套接字名字
  server_address.sin_family=AF_INET;
  server_address.sin_addr.s_addr=inet_addr("127.0.0.1");
  server_address.sin_port=9734;
  server_len=sizeof(server_address);
  bind(server_socked,(struct sockaddr *)&server_address,server_len);

}

```

### 15.2.10 主机字节序和网络字节序

可以使用`netstat`命令来查看网络连接状况。

### 15.3 网络信息

一般可以通过网络信息函数决定应该使用的地址和端口号

可以将自己的服务添加到/etc/services文件中的已知服务列表中。并且在这个文件中为端口号分配一个名字，使用户可以使用符号化的服务名字而不是端口号的名字。

主句地址映射函数定义在netdb.h中，函数接口如下所示：

```c
#include <netdb.h>
/* 查询host地址 */
struct hostent *gethostbyaddr(const void *addr,size_t len,int type);
struct hostent *gethostbyname(const char *name);
/* 查询端口号相关信息 */
struct servent *getservbyname(const char *name,const char *proto);
struct servent *getservbyport(int port,const char *proto);
```

返回的hostnet和event结构中至少包含一下几个成员:

```c++
struct hostent{
  char *h_name;
  char **h_aliases;
  int h_addrtype;
  int h_length;
}

struct servent{
  char *s_name;
  char **s_aliases;
  int s_port;
  char *s_proto;
}
```

要把返回的地址列表转换为正确的地址类型，并用函数`inet_ntoa`将它们从网络字节序转换为可打印的字符。函数`inet_ntoa`的定义如下。

```c++
#include <arpa/inet.h>
//将一个intel主机地址转换为一个点四元组格式的字符串，它在失败时返回-1,
char *inet_ntoa(struct in_addr in);

#include <unistd.h>
//将当前主机的名字写入name指向的字符串中。主机名以null结尾。参数namelength指定了字符串name的长度。如果主机名太长会被截断
int gethostname(char *name,int namelength);
```

下面使用getname.c来获取一台主机的信息

```c++
/*  As usual, make the appropriate includes and declare the variables.  */
#include <netinet/in.h>
#include <arpa/inet.h>
#include <unistd.h>
#include <netdb.h>
#include <stdio.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    char *host, **names, **addrs;
    struct hostent *hostinfo;

/* 将host变量设置为getname程序所提供的命令行参数，或默认设置为用户主机的主机名 */
    if(argc == 1) {
        char myname[256];
        gethostname(myname, 255);
        host = myname;
    }
    else
        host = argv[1];

/* 调用gethostname,如果未找到相应的信息就报告一条错误 */
    hostinfo = gethostbyname(host);
    if(!hostinfo) {
        fprintf(stderr, "cannot get info for host: %s\n", host);
        exit(1);
    }

/* 显示主机名和它可能有的所有别名 */
    printf("results for host %s:\n", host);
    printf("Name: %s\n", hostinfo -> h_name);
    printf("Aliases:");
    names = hostinfo -> h_aliases;
    while(*names) {
        printf(" %s", *names);
        names++;
    }
    printf("\n");

/* 如果查询的主机不是一个IP主机，就发出警告并退出 */

    if(hostinfo -> h_addrtype != AF_INET) {
        fprintf(stderr, "not an IP host!\n");
        exit(1);
    }

/* 否则，显示它的所有IP地址 */
    addrs = hostinfo -> h_addr_list;
    while(*addrs) {
        printf(" %s", inet_ntoa(*(struct in_addr *)*addrs));
        addrs++;
    }
    printf("\n");
    exit(0);
}
```

下面是连接到标准服务，查看服务器的当前日期和时间

```c++
/* 准备必要的头文件 */
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

int main(int argc, char *argv[])
{
    char *host;
    int sockfd;
    int len, result;
    struct sockaddr_in address;
    struct hostent *hostinfo;
    struct servent *servinfo;
    char buffer[128];

    if(argc == 1)
        host = "localhost";
    else
        host = argv[1];

/* 查找host对应的信息 */

    hostinfo = gethostbyname(host);
    if(!hostinfo) {
        fprintf(stderr, "no host: %s\n", host);
        exit(1);
    }

/* 查找主机时间服务信息 */

    servinfo = getservbyname("daytime", "tcp");
    if(!servinfo) {
        fprintf(stderr,"no daytime service\n");
        exit(1);
    }
    printf("daytime port is %d\n", ntohs(servinfo -> s_port));

/* 创建一个socket */

    sockfd = socket(AF_INET, SOCK_STREAM, 0);

/* 设置对应的连接参数 */

    address.sin_family = AF_INET;
    address.sin_port = servinfo -> s_port;
    address.sin_addr = *(struct in_addr *)*hostinfo -> h_addr_list;
    len = sizeof(address);

/* 连接并且获取相关信息 */

    result = connect(sockfd, (struct sockaddr *)&address, len);
    if(result == -1) {
        perror("oops: getdate");
        exit(1);
    }

    result = read(sockfd, buffer, sizeof(buffer));
    buffer[result] = '\0';
    printf("read %d bytes: %s", result, buffer);

    close(sockfd);
    exit(0);
}
```

#### 15.3.1 因特网守护进程(xineted/inetd)

超级服务程序同时监听许多端口地址上的连接。当有客户端连接到某项服务时，守护进程就运行相应的服务器。这使得针对各项网络服务的服务器不需要一直运行着。可以在需要时启动。

因特网守护进程在现代linux系统中是通过xinetd来实现的。xinetd实现方式取代了原来的UNIX的inetd。可以直接修改`/etc/xinetd.conf`和`/etc/xinetd.d`目录中的文件来进行配置。

#### 15.3.2 套接字选项

可以使用`setsocket`函数用于控制这些选项。它的定义如下：

```c++
#include <sys/socket.h>

int setsocket(int socket,int level,int option_name,const void *option_value,size_t option_len);
```

level是相关的协议等级，想要正常使用，必须设置对应的编号。option_name和option_value分别指向需要设置参数名称和值。level设置参数如下

![相关参数设置](https://wangpengcheng.github.io/img/2019-09-25-22-16-47.png)

#### 15.4.1 select系统调用

在编写Linux程序时，经常会遇到需要检查键盘等设备的输入而不得不进行忙等待循环。这种比较消耗CPU时间。

select系统调用允许程序同时在多个底层文件描述符上等待输入的到达。主要是对数据结构`fd_set`进行操作，它是由打开的文件描述符构成的集合。有一组定义好的宏可以来控制这个集合。

```c++
#include <sys/types.h>
#include <sys/time.h>
/* 将fd_set初始化为空 */
void FD_ZERO(fd_set *fdset);
/* 清除传递的文件符 */
void FD_CLR(int fd,fd_set *fdset);
/* 设置传递的文件符 */
void FD_SET(int fd,fd_set *fdset);
/* 检查fd设置的文件描述符是否是fdset集合中的元素 */
void FD_ISSET(int fd,fd_set *fdset);
```

select函数可以设置一个超时来防止无限期的阻塞。这个超时值由一个timeval结构给出。这个结构定义在头文件`sys/time.h`中，它由以下几个成员组成:

```c++
struct timeval{
    time_t tv_sec; /* seconds */
    long   tv_usec; /* microseconds */
}
```

select系统调用的原型如下：

```c++
#include <sys/types.h>
#include <sys/time.h>

int select(int nfds,fd_set *readfds,fd_set *writefds, fd_set *errorfds,struct timeval *timeout);
```

nfds指定需要测试的文件描述符数目，测试的描述符范围从0到nfds-1。3个描述符集合都可以被设置为空指针，这表示不执行相应的测试。

select函数会在以下情况时返回:
- `readfds`：集合中有描述符可读
- `writefds`：集合中有描述符可写
- `errorfds`：集合中有描述符遇到错误条件

如果以上三种条件都没有发生，select将在timeout指定的超时时间经过后返回。如果timeout参数是一个空指针并且套接字上也没有任何活动，这个调用将一直阻塞下去。

下面是一个简单的select调用实验：

```c++
/* 开始和必要的头文件 */
#include <sys/types.h>
#include <sys/time.h>
#include <stdio.h>
#include <fcntl.h>
#include <sys/ioctl.h>
#include <unistd.h>
#include <stdlib.h>

int main()
{
    char buffer[128];
    int result, nread;

    fd_set inputs, testfds;
    struct timeval timeout;

    FD_ZERO(&inputs);
    FD_SET(0,&inputs);

/*  设置标准输入最多等待输入2.5s  */

    while(1) {
        testfds = inputs;
        timeout.tv_sec = 2;
        timeout.tv_usec = 500000;
        /* 进行选择等待输入 */
        result = select(FD_SETSIZE, &testfds, (fd_set *)0, (fd_set *)0, &timeout);

/*  经过这段时间之后，对result进行测试。如果没有输入，程序将再次循环，出现一个错误，程序将退出运行  */

        switch(result) {
        case 0:
            printf("timeout\n");
            break;
        case -1:
            perror("select");
            exit(1);

/* 如果在等待期间，对文件描述符采取了一些动嘴，程序将读取标准输入stdin上的输入，并在接收到行尾字符之后将他们都回显到屏幕上。ctrl+D，就退出程序 */
        default:
            if(FD_ISSET(0,&testfds)) {
                ioctl(0,FIONREAD,&nread);
                if(nread == 0) {
                    printf("keyboard done\n");
                    exit(0);
                }
                nread = read(0,buffer,nread);
                buffer[nread] = 0;
                printf("read %d from keyboard: %s", nread, buffer);
            }
            break;
        }
    }
}
```

#### 15.4.2 多客户端

服务器可以让select调用同时检查监听套接字和客户端的连接套接字。一旦select调用指示有活动发生，就可以用FD_ISSET来遍历所有可能的文件描述符，以检查是哪个上面有活动发生。然后调用accept而不用担心发生阻塞的可能。如果是一个客户描述符，则该描述符上有一个客户端请求需要我们读取和处理。如果读取返回0个字节，这表示有一个客户进程已经结束，你可以关闭该套接字并把它从集合中删除。

下面是一个简单的使用示例：

```c++
/*  For our final example, server5.c, 
    we include the sys/time.h and sys/ioctl.h headers in place of signal.h
    in our last program and declare some extra variables to deal with select.  */

#include <sys/types.h>
#include <sys/socket.h>
#include <stdio.h>
#include <netinet/in.h>
#include <sys/time.h>
#include <sys/ioctl.h>
#include <unistd.h>
#include <stdlib.h>

int main()
{
    int server_sockfd, client_sockfd;
    int server_len, client_len;
    struct sockaddr_in server_address;
    struct sockaddr_in client_address;
    int result;
    fd_set readfds, testfds;

    /* 为服务器创建一个socket描述符 */

    server_sockfd = socket(AF_INET, SOCK_STREAM, 0);
    /* 设置socket属性 */
    server_address.sin_family = AF_INET;
    server_address.sin_addr.s_addr = htonl(INADDR_ANY);
    server_address.sin_port = htons(9734);
    server_len = sizeof(server_address);

    bind(server_sockfd, (struct sockaddr *)&server_address, server_len);

/*  创建一个连接队列，初始化readfds以处理来自server_sockfd的输入  */

    listen(server_sockfd, 5);

    FD_ZERO(&readfds);
    FD_SET(server_sockfd, &readfds);

/* 在while循环中等待客户和请求的到来。 */

    while(1) {
        char ch;
        int fd;
        int nread;

        testfds = readfds;

        printf("server waiting\n");
        /* 注意这里timeout参数传递的是一个空指针，因此select调用将不会发生超时状况 */

        result = select(FD_SETSIZE, &testfds, (fd_set *)0,
            (fd_set *)0, (struct timeval *) 0);

        if(result < 1) {
            perror("server5");
            exit(1);
        }

 /* 一旦有活动发生，可以使用FD_ISSET来依次检查每个描述符，以发现活动发生在那个描述符上 */

        for(fd = 0; fd < FD_SETSIZE; fd++) {
            if(FD_ISSET(fd,&testfds)) {

/* 活动发生在server_sockfd上，它肯定是一个新的连接请求，将相关client_sockfd添加到描述符集合中 */

                if(fd == server_sockfd) {
                    client_len = sizeof(client_address);
                    client_sockfd = accept(server_sockfd,
                        (struct sockaddr *)&client_address, &client_len);
                    FD_SET(client_sockfd, &readfds);
                    printf("adding client on fd %d\n", client_sockfd);
                }

/*  没有发生在服务器socket server_sockfd上,则是一个新的连接请求生成相关的client_sockfd添加到描述符集合中 */

                else {
                    ioctl(fd, FIONREAD, &nread);
                    //判断是否是离开的请求，如果是就直接将其文件描述符删除

                    if(nread == 0) {
                        close(fd);
                        FD_CLR(fd, &readfds);
                        printf("removing client on fd %d\n", fd);
                    }
                    //否则直接进行读取和输出

                    else {
                        read(fd, &ch, 1);
                        sleep(5);
                        printf("serving client on fd %d\n", fd);
                        ch++;
                        write(fd, &ch, 1);
                    }
                }
            }
        }
    }
}

```

### 15.5 数据报(UDP)

UDP使用的是不稳定链接，因此不需要进行过多的更改和连接状态的确定。UDP在局域网中非常可靠。一样使用套接字和close系统调用，但是需要使用**sendto和recvfrom**来代替原来使用在套接字上的read和write调用。下面是一个修改过的getdate.c版本

```c++
#include <sys/socket.h>
#include <netinet/in.h>
#include <netdb.h>
#include <stdio.h>
#include <unistd.h>
#include <stdlib.h>

int main(int argc,char *argv[])
{
    //host主机地址

    char *host;
    int sockfd;
    int len,result;
    struct sockaddr_in address;
    struct hostent *hostinfo;

    struct servent *serinfo;
    //缓冲buffer队列

    char buffer[128];
    if(argc==1)
        host="localhost";
    else
        host=argv[1];
    /* 通过名字在host中查找对用的ip地址和信息 */
    hostinfo=gethostbyname(host);

    if(!hostinfo){
        fprintf(stderr,"no host: %s\n",host);
        exit(1);
    }
    /* 确认服务器时钟 */
    servinfo=getservbyname("daytime","udp");
    if(!servinfo){
        fprintf(stderr,"no daytime service \n");
        exit(1);
    }
    printf("daytime port is %d \n",ntohs(servinfo->s_port));
    /* 创建一个udp socket */

    sockfd=socket(AF_INET,SOCK_DGRAM,0);
    /* 设置address相关参数 */
    address.sin_family=AF_INEF;
    address.sin_port=servinfo->s_port;
    address.sin_addr=*(struct in_addr*)*hostinfo->h_addr_list;
    len=sizeof(address);
    /* 进行消息发送 */
    result=sendto(sockfd，buffer,1,0,(struct sockaddr*)&address,len);
    /* 返回接收的最后位置 */
    result=recvfrom(sockfd,buffer,sizeof(buffer),0),(struct sockaddr*)&address,&len);
    buffer[result]='\0';
    printf("read %d bytes:% s".result,buffer);
    close(sockfd);
    exit(0);
}
```

UDP关键函数如下：

```c++
/* 这里的flags参数一般被设置为0 */
int sendto(int sockfd,void *buffer,size_t len,int flags,struct sockaddr *to,socklen_t tolen);
int recvfrom(int sockfd,void *buffer,size_t len,int flags,struct sockaddr *from,socklent_t *fromlen);
```

上述失败时会返回-1,并设置errno，可能错误表如下所示：

![错误信息](https://wangpengcheng.github.io/img/2019-09-27-20-41-54.png)

## 第 16 章 使用GTK+进行gnome编程

### 16.1 x视窗系统简介

X服务，运行在用户的本地机器上，在屏幕上完成底层的绘图工作。X服务通过鼠标和键盘监听用户输入，将键盘按键和鼠标点击传输给X客户端应用程序。这个被称为(event)事件。

#### 16.1.2 X客户端

X客户端可以以X视窗作为GUI的任何程序。X客户端不需要和X服务运行在同一台机器上。

#### 16.1.3 X协议

X服务器与X客户端之间使用X协议进行通信。这使得客户端和服务器可以通过网络进行分离。

#### 16.1.4 Xlib库

Xlib是X客户端间用于产生X协议消息的库。

#### 16.1.5 X工具包
X工具包是一个GUI库，X客户端可以利用它来极大地简化窗口、菜单和按钮等的创建。

#### 16.1.6 窗口管理器

X中负责定位屏幕上的窗口。窗口管理器通常支持独立的“工作区域”，这些工作区将桌面分割，增大用户可以互交的区域。常见窗口管理器有如下内容:

- Metacity:GNOME桌面的默认窗口管理器
- KWin:KDE桌面的默认窗口管理器
- Openbox:旨在节约资源，用于较老的、较慢的系统中。
- Enlightenment:一个有着出色图形和效果的窗口管理器。

### 16.2 GTX+简介

GTK+是一个函数库，提供了一组已经制作好的被成为构建的组件。可以使用逻辑组合，极大地简化了GUI的创建。主要函数模块如下：

- GLib:提供底层数据结构、类型、线程支持、事件循环和动态加载
- GObject:使用c语言而不是C++语言实现了一个面向对象系统
- Pango:支持文本渲染和布局
- ATK:用来创建可访问引用程序，并允许用户使用屏幕阅读器和其它协助工具来运行你的程序。
- GDK(GIMP绘图工具包)：在Xlib之上处理底层图形渲染。
- GdkPixbuf:在GTK+程序中帮助处理图像。
- Xlib:在linux和UNIX系统上提供底层图形

### 16.2.3 GNOME简介

GTK+之上的一个扩展图像桌面

### 16.3 事件、信号和回调函数

这个是所有GUI中都存在的必然相关程序。具体的不再过多赘述。

### 16.4 组装盒构建

与QTGUI布局相似，存在`gtk_hbox_new`和`gtk_vbox_new`等函数。

### 16.5 GTK+中的对应构件

_参考连接：_

- [GTK+中的构件II(Widgets)](https://www.cnblogs.com/xchsp/p/4322028.html)
- [GTK+中的构件（GTK+ Widgets）](https://www.cnblogs.com/boer-utopia/articles/2261422.html)
- [GTK+构件](https://blog.csdn.net/u012150792/article/details/50607723)



GTK+主要构件列表和API如下表：

- GtxWindow:窗口基本元素，用来持有构件
![主要窗口层级](https://wangpengcheng.github.io/img/2019-09-27-21-17-17.png)
- GtkEntry:单行文本输入构件，用于输入简单的文本信息。
![GtkEntry](https://wangpengcheng.github.io/img/2019-09-27-21-18-49.png)
- GtkSpinButton:可选数字输入框
![GtkSpinButton](https://wangpengcheng.github.io/img/2019-09-27-21-20-18.png)
- GtkButton:按钮选项
![GtkButton](https://wangpengcheng.github.io/img/2019-09-27-21-22-20.png)  
    1. GtkToogleButton：
    ![GtkToogleButton](https://wangpengcheng.github.io/img/2019-09-27-21-23-05png)
    2. GtkCheckButton:单选确认框
    ![GtkCheckButton](https://wangpengcheng.github.io/img/2019-09-27-21-24-32.png) 
    3. GtkRadioButton:圆形按钮
    ![GtkRadioButton](https://wangpengcheng.github.io/img/2019-09-27-21-25-38.png)
- GtkTreeView:树状结构;
    ![](https://wangpengcheng.github.io/img/2019-09-27-21-27-15.png)
    其主要组成部分如下：
    - GtkTreeView:树和列表视图
    - GtkTreeViewColumn:代表一个列表或树的列
    - GtkCellRenderer:控制绘图单元
    - GtkTreeModel:代表树和列表数据
  
### 16.7 GNOME菜单
就是Qt中的QMenu选项，主要结构和内容如下：

![下拉菜单选项](https://wangpengcheng.github.io/img/2019-09-27-21-31-02.png)

### 16.8 对话框

#### 16.8.1 GtkDialog
GtkDialog是GtkWindow的一个子类，继承了其所有函数和属性：

![GtkDialog](https://wangpengcheng.github.io/img/2019-09-27-21-32-59.png)

#### 16.8.2 模式对话框

设置GTK_DIALOG_MODEAL标记和调用gtk_widget_show函数，将一个对话框转变为模式对话框。可以使用gtk_dialog_run通过阻止程序的进一步执行。返回对应的选择的结果类型。

#### 16.8.3 非模式对话框

不使用gtk_dialog_run而是使用GtkDialog的“response”信号(按钮按下或窗口被关闭时发出)。将回调函数连接到信号，但是存在一个额外的response参数。

#### 16.8.4 GtkMessageDialog

一个简单对话框

![GtkMessageDialog](https://wangpengcheng.github.io/img/2019-09-27-21-38-53.png)

还可以选择一个GTK_MESSAGE_OTHER值如下

![GTK_MESSAGE_OTHER](https://wangpengcheng.github.io/img/2019-09-27-21-40-09.png)

## 第 17 章 使用Qt进行KDE编程

这个不需要多说了,看参考连接。。。。

- [Qt Documentation](https://doc.qt.io/qt-5/reference-overview.html)

## 第 18 章 Linux标准

### 18.1 C语言编程标准

没什么好说的

### 18.2 接口和LSB

c语言之上，高一个层次由操作系统提供的接口(系统接口)。

权威文档是[LSB](https://www.linuxbase.org)。

Linux中的常见系统运行级别表

![运行级别](https://wangpengcheng.github.io/img/2019-09-28-10-01-02.png)

`/etc/init.d/`目录下存在不同的脚本，提供其服务相关联的名字

![配置脚本目录](https://wangpengcheng.github.io/img/2019-09-28-10-03-08.png)

### 18.3 文件系统层次结构标准

[层次结构标准](https://www.pathname.com/fhs/),主要目的是定义Linux文件系统的标准路径。
下面是一些顶级目录结构和一些必须存在的子目录和一小部分可选目录

![目录结构](https://wangpengcheng.github.io/img/2019-09-28-10-07-35.png)

### 18.4 更多标准

查看一下参考连接获取相关资料

- [事物标准化](http://www.openi18n.org/)
- [GNU网站](http://www.gnu.org)

> 2019-08-11 16:04:58


# 结束