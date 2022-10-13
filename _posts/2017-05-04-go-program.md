---
layout: post
title:  GO语言学习笔记
subtitle:  新语言
date:   2017-05-04 15:17:00
author:  wangqiwen
categories: 编程语言
tags: go Go web 输入提示 模型部署 hertz oop 面向对象 workflow 流程引擎
excerpt: 编程语言知识点
mathjax: true
header-img: img/post-bg-ios10.jpg
catalog: true
permalink: /go
---

* content
{:toc}


# go语言

- [Go语言教程](http://www.yiibai.com/go/go_start.html)
- 酷壳：[go语言简洁](http://coolshell.cn/articles/8460.html)，[附加](http://coolshell.cn/articles/8489.html)
- [Go的50坑：新Golang开发者要注意的陷阱、技巧和常见错误]()

## go介绍

go语言不像C或C++那样难于学习，但速度仍然很快，并且拥有一个强大的社区以及许多有趣且有用的软件包和库。该语言也是由Google计算机科学界的一些最聪明的人开发的。

go是一种**编译型**（翻译成更低级的语言，如汇编）、具有**静态**类型和**类c**风格语法的语言，并具具备垃圾回收机制，编译型语言特点：运行快，开发慢；不同于解释型语言

Go程序员常常被称为`地鼠`（gopher）, [img](https://go.dev/images/gophers/motorcycle.svg)
- <img src="https://go.dev/images/gophers/motorcycle.svg" height="100%" width="100" />

更多编程语言介绍：
- [编程语言发展历史]({{ site.baseurl}}{% post_url 2010-07-26-computer-history %}#编程语言变迁)

### go 优点

优点
- <span style='color:blue'>高性能、高并发</span>
- 语法简单、学习曲线平缓
- 丰富的标准库
- 完善的工具链
- <span style='color:blue'>静态编译</span>
- <span style='color:blue'>跨平台</span>
- <span style='color:blue'>垃圾回收</span>

### 大公司为什么用go

字节为啥全面转Go？
- 最初使用Python，由于性能问题换成了Go
- C++不适合**在线Web**业务
- 早期团队**非Java**背景
- <span style='color:blue'>性能比较好</span>
- 部署简单、学习成本低
- <span style='color:blue'>内部RPC和HTTP框架推广</span>

### go特点

Go有很多特性，有一些是独特的，有一些借鉴于一些其它编程语言：
- 内置**并发**编程支持：
  - 使用`协程`（goroutine）做为基本的计算单元。轻松地创建协程。
  - 使用`通道`（channel）来实现协程间的同步和通信。
- 内置了`映射`（map）和`切片`（slice）类型。
- 支持`多态`（polymorphism）。
- 使用`接口`（interface）来实现`裝盒`（value boxing）和`反射`（reflection）。
- 支持`指针`。
- 支持`函数闭包`（closure）。
- 支持`方法`。
- 支持`延迟函数调用`（defer）。
- 支持类型`内嵌`（type embedding）。
- 支持类型`推断`（type deduction or type inference）。
- 内存安全。
- 自动**垃圾回收**。
- 良好的代码跨平台性。
- 自定义`泛型`（从Go 1.18开始）。

除了以上特性，Go还有如下亮点：
- **语法简洁**且和其它流行语言相似。 这使得具有一定编程经验的程序员很容易上手Go编程。 当然，对于没有编程经验的初学者，Go也比很多其它流行编程语言更容易上手一些。
- **标准库齐全**。这个标准库提供了很多常用的功能。
- 活跃和回应快速的社区。 社区贡献了[大量高质量的第三方库包和应用](https://github.com/avelino/awesome-go)。

### go入门路线图

【2022-9-30】go学习路线图
- ![](https://www.topgoer.com/static/kaiyuan/luxian.png)

## Go安装

- 从链接[Go下载](http://golang.org/dl/) 中下载最新版本的Go可安装的归档文件。将/usr/local/go/bin添加到PATH环境变量
  - win地址：https://go.dev/dl/go1.17.6.windows-amd64.msi
  - mac地址： wget https://go.dev/dl/go1.17.6.darwin-amd64.pkg
  - linux地址: wget https://go.dev/dl/go1.17.6.linux-amd64.tar.gz


### go环境变量

- 环境变量：

```shell
# vim ~/.bash_profile
export GOROOT=/usr/local/go
export PATH=$PATH:$GOROOT/bin
```

安装新包时，会下载到 GOPATH/src下

```shell
# go get github.com/jmoiron/sqlx
import "github.com/test"
# 下载到 src/github.com/test
```

### helloworld

验证：
- 创建一个test.go的go文件。编写并保存以下代码到 test.go 文件中。
- 所有Go源代码文件必须以.go后缀结尾

```go
package main    // 声明 main 包
import (
    "fmt"       // 导入 fmt 包，输入和输出的默认库，打印字符串是需要用到
)
func main() {   // 声明 main 主函数
    fmt.Println("Hello World!") // 打印 Hello World!
}
```

现在运行test.go查看结果并验证输出结果如下：
- go run test.go
- Hello, World!

### vim语法高亮

go vim颜色显示：
- 进入目录 ~/.vim/bundle
- git clone https://github.com/fatih/vim-go.git

[配置方法](https://aceld.gitbooks.io/how-do-go/content/1-gohuan-jing-de-an-zhuang/vim-pei-zhi-go-yu-fa-gao-liang.html)
 
```shell
# (1)下载Vundle.vim（vim安装插件的工具）.
git clone https://github.com/VundleVim/Vundle.vim.git ~/.vim/bundle/Vundle.vim
# (2) 配置。在~/.vimrc粘贴如下代码
# (3) 安装vim-go插件。在vim中使用`:PluginInstall`命令进行vim-go的安装
```

打开go文件即可看到：
- ![](https://aceld.gitbooks.io/how-do-go/content/assets/go3.png)


## go命令

命令行：
- go `version` 查看版本
- go `env`: 显示go环境变量配置

Go常用命令：
- go `build`: 测试编译，检查是否有编译错误
- go **build** 将Go语言程序代码编译成二进制的可执行文件，但是需要手动运行该二进制文件；
  - ①**有参数**：
    - main包：生成一个与第一个 fileName 同名的可执行文件
    - 非main包：编译器将只对该包进行语法检查，不生成可执行文件。
  - ②**无参数**：如果当前目录下存在 main 包，则会生成一个与当前目录名同名的“目录名.exe”可执行文件
    - 有main包：生成一个与当前目录名同名的“目录名.exe”可执行文件
    - 无main包：只对当前目录下的程序源码进行语法检查，不会生成可执行文件。
- go `run`: 直接运行程序；命令则更加方便，go run命令将编译和执行指令合二为一
  - 编译后直接运行Go语言程序，编译过程中会产生一个临时文件，但不会生成可执行文件，这个特点很适合用来调试程序。
- go `fmt`: **格式化**源码(部分IDE在保存时自动调用)，使用同一种代码风格
- go `install`: 编译包文件并编译整个程序
  - go `install` example.com/<span style='color:blue'>program</span>@latest 来安装一个第三方Go程序的最新版本（至GOBIIN目录）。 
  - Go官方工具链1.16版本前，命令：go get -u example.com/program（已废弃）。
  - 实际上, <span style='color:blue'>go get = git clone + go install</span>
  - go install 是 Go 中自动包安装工具：如需要将包安装到本地它会从远端仓库下载包：检出、编译和安装一气呵成。
  - go install 只是将编译的中间文件放在 GOPATH 的 pkg 目录下，以及固定地将编译结果放在 GOPATH 的 bin 目录下。
  - 分成了两步操作：第一步是生成**结果文件**（可执行文件或者 .a 包），第二步会把编译好的结果移到 $GOPATH/pkg 或者 $GOPATH/bin。
- go `test`: 运行测试文件
- go `doc`: 查看文档(chm手册)
  - 在浏览器上浏览go官方网站：命令行输入：go doc -http=:8080    即可在浏览器输入：localhost:8080查看
- go `vet`
  - 子命令可以用来检查可能的代码逻辑错误（即警告）；run、build和install不会输出代码逻辑错误！
- go `mod`：go模块特性，简化依赖管理
  - go mod init example.com/myproject命令可以用来在当前目录中生成一个go.mod文件。 当前目录将被视为一个名为example.com/myproject的模块（即当前项目）的根目录。 此go.mod文件将被用来记录当前项目需要的依赖模块和版本信息。 我们可以手动编辑或者使用go子命令来修改此文件。
  - go mod tidy命令用来通过扫描当前项目中的所有代码来添加未被记录的依赖至go.mod文件或从go.mod文件中删除不再被使用的依赖。
- go `get`: 获取远程包，需提前安装git或hg
  - go get命令用拉添加、升级、降级或者删除单个依赖。此命令不如 go mod tidy 命令常用。
  - 第三方包下载并解压到GOPATH路径下的src文件夹里面

注意：
- <span style='color:blue'>go run 只是用来临时运行单个文件，正式项目不推荐使用</span> → go build

### go install

【2022-9-29】[go install命令——编译并安装](http://c.biancheng.net/view/122.html)

go install 只是将编译的中间文件放在 GOPATH 的 pkg 目录下，以及固定地将编译结果放在 GOPATH 的 bin 目录下。

这个命令在内部实际上分成了两步操作：
- 第一步是生成结果文件（可执行文件或者 .a 包）
- 第二步会把编译好的结果移到 $GOPATH/pkg 或者 $GOPATH/bin。

本小节需要用到的代码位置是./src/chapter11/goinstall。

go install 的编译过程有如下规律：
- go install 是建立在 GOPATH 上的，无法在独立的目录里使用 go install。
- GOPATH 下的 bin 目录放置的是使用 go install 生成的可执行文件，可执行文件的名称来自于编译时的包名。
- go install 输出目录始终为 GOPATH 下的 bin 目录，无法使用-o附加参数进行自定义。
- GOPATH 下的 pkg 目录放置的是编译期间的中间文件。

使用 go install 来执行代码，参考下面的 shell：

```shell
export GOPATH=/home/davy/golangbook/code
go install chapter11/goinstall
```

编译完成后的目录结构如下：

```go
.
├── bin
│   └── goinstall
├── pkg
│   └── linux_amd64
│       └── chapter11
│           └── goinstall
│               └── mypkg.a
└── src
    └── chapter11
        ├── gobuild
        │   ├── lib.go
        │   └── main.go
        └── goinstall
            ├── main.go
            └── mypkg
                └── mypkg.go
```

### go mod

go module 是go官方自带的go**依赖管理库**，在**1.13版本**正式推荐使用。
- go module可以将某个项目(文件夹)下的所有依赖整理成一个go.mod 文件,写入了依赖的版本等
  - 用go module之后<span style='color:red'>不用关心GOPATH，也不用将代码放置在src下了</span>。
- go module 管理依赖后, 在项目根目录下生成两个文件 `go.mod`（记录当前项目的所依赖）和 `go.sum`（记录每个依赖库的版本和哈希值）

GO111MODULE是 go modules 功能的开关
- GO111MODULE=**off**: 不使用 modules 功能。
- GO111MODULE=**on**: 使用 modules 功能，不会去 GOPATH 下面查找依赖包。
- GO111MODULE=**auto**: Golang 自己检测是不是使用 modules 功能。这种情况下可以分为两种情形：
  - （1）当前目录在GOPATH/src之外且该目录包含go.mod文件，开启模块支持。
  - （2）当前文件在包含go.mod文件的目录下面。

推荐使用 Go 模块时，将 GO111MODULE 设置为 on 而不是 atuo，将以下语句添加进 ~/bashrc 中，然后重开Terminal

```shell
gedit ~/.bashrc
# 添加 
export GO111MODULE=on
```

#### go mod 配置

第一次使用 GO MODULE(项目中还没有go.mod文件) ，cd进入项目文件夹，初始化 MODULE

```shell
cd /home/zhongzhanhui/GoProject/Seckill   
go mod init Seckill  	#Seckill是项目名
```

此时项目根目录会出现一个 go.mod 文件，此时的 go.mod 文件只标识了项目名和go的版本,这是正常的,因为只是初始化了。 go.mod 文件内容如下：

```go
module SecKill

go 1.13
```

go mod tidy
- tidy会检测该文件夹目录下所有引入的依赖,写入 go.mod 文件，写入后会发现 go.mod 文件有所变动

```go
module SecKill

go 1.13

require (
	github.com/gin-contrib/sessions v0.0.1
	github.com/gin-gonic/gin v1.5.0
	github.com/jinzhu/gorm v1.9.11
	github.com/kr/pretty v0.1.0 // indirect
	gopkg.in/yaml.v2 v2.2.2
)
```

【2022-9-29】[go安装依赖包（go get, go module）](https://blog.csdn.net/weixin_41519463/article/details/103501485)

#### go mod命令

```shell
# 初始化模块：
go mod init <项目模块名称>
# 依赖关系处理，根据go.mod文件
go mod tidy
# 将依赖包复制到项目的vendor目录
go mod vendor
# 显示依赖关系
go list -m all
# 显示详细依赖关系
go list -m -json all
# 下载依赖
go mod download [path@version]
```


#### go mod 错误信息

【2022-9-30】如果设置为on，但是当前目录没有go.mod文件，就会出现错误信息，[详见](https://blog.csdn.net/longgeaisisi/article/details/121288696)
> no required module provides package xxx: go.mod file not found in current directory or any parent directory; see 'go help modules'

解决方法
- go env -w GO111MODULE=auto

## go编译

### 编译命令

Go语言是编译型的静态语言（和C语言一样），所以在运行Go语言程序之前，先要将其编译成二进制的可执行文件。
- go build: `go文件` --(go build 编译)--> `可执行文件` --(运行)--> `结果`
- go run:   `go文件` --(go run 编译+运行)--> `结果`

<div class="mermaid">
    graph LR
    A(源码文件.go):::orange -->|编译,go build| B(可执行文件):::green
    B -->|执行| C(执行结果):::blue
    A -->|编译+执行,go run|C
    %%A & B -->|运行,go run | C(执行结果)

    classDef red fill:#f02; 
    classDef green fill:#5CF77B; 
    classDef blue fill:#6BE0F7; 
    classDef orange fill:#F7CF6B;
</div>


```shell
go build test.go # 先编译再运行（推荐build）
go run test.go # 直接运行
# 可以自定义生成可执行文件名，在mac/linux上是可执行文件，在window下必须是.exe后缀
go build -o 自定义文件名 test.go # 自定义名字
go build -o myHelloWorld HelloWorld.go # mac
go build -o myHelloWorld.exe HelloWorld.go # win
```

参考：[go build和run区别](https://chowdera.com/2022/02/202202080303161398.html)

### go 编译器

GO的标准编译器常称为`gc`（Go compiler的缩写，不是垃圾回收garbage collection）。 
- Go官方团队也维护着另外一个编译器，`gccgo`。 gccgo是gcc编译器项目的一个子项目。 gccgo的使用广泛度大不如gc， 它的主要作用是做为一个参考，来保证gc的实现正确性。 
- 目前两个编译器的开发都很活跃，尽管Go开发团队在gc的开发上花费的精力更多。

`gc编译器`是Go官方工具链中一个组件。 
- Go官方工具链1.0发布于2012年三月。 
- Go语言规范的最新版本和Go官方工具链的最新版本总是保持一致。 每年Go官方工具链发行两个主版本。

gc支持**跨平台**编译。 比如，可以在Linux平台上编译出Windows程序，反之亦然。

使用Go编写的程序常常编译得**非常快**。
- 编译时间的长短是开发愉悦度的一个重要因素。 
- 编译时间短是很多程序员喜欢Go的一个原因。

Go程序生成的二进制可执行文件常常拥有以下优点：
- 内存消耗少
- 执行速度快
- 启动快

很多C家族语言，比如C/C++/Rust等，也拥有上述的优点。 但它们缺少Go语言的几个重要优点：
- 程序编译时间短
- 像动态语言一样灵活
- 内置并发支持

目前，Go主要用于网络开发、系统工具开发、数据库开发和区块链开发。 随着从Go 1.18开始支持自定义泛型，预期Go会在更多开发领域流行起来，比如图形界面、游戏、大数据和人工智能等。

## Go目录结构

Go语言中通过包来组织代码文件，可以引用第三方包也可以发布自己的包，但为了防止不同包的项目名冲突，通常使用**顶级域名**来作为包名的**前缀**，这样就规避了项目名冲突问题。

因为不是每个个人开发者都拥有自己的顶级域名，所以目前流行的方式是使用个人的github用户名来区分不同的包。

示意[图](https://www.topgoer.com/static/2/7.png)
- ![](https://www.topgoer.com/static/2/7.png)

注：设置 **GoRoot**（安装目录）和 **GoPath** （工作目录）！

一个Go语言项目的目录一般包含以下三个子目录：
- src 目录：放置项目和库的**源**文件；
- pkg 目录：放置编译后生成的包/库的**归档**文件；
- bin 目录：放置编译后生成的**可执行**文件。

GoPath：go项目工作目录，需在环境变量中设置，多个用分号隔开
- /src：项目源文件
  - project_1：具体项目代码
    - hello.go
    - hello_test.go
  - project_2：
- /bin：编译后的可执行文件
- /pkg：编译后的包文件（hello.a）
注：bin和pkg可不用创建，执行go install会自动创建

```shell
# GOPATH
bin # 存放编译后的二进制文件
pkg # 存放编译后的库文件，如 go module
src # 自己的代码
\-- github.com
------ project1
------------ module1
------------ module2
------ project2
```

- ![](https://www.topgoer.com/static/2/6.png)
- [参考](https://www.topgoer.com/%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83/%E9%85%8D%E7%BD%AEgopath.html)

- 问题：如何避免新增一个GO项目就要往GOPATH中增加一个路径？
- 答：加入脚本：《[go目录结构](http://blog.studygolang.com/2012/12/go%E9%A1%B9%E7%9B%AE%E7%9A%84%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84/)》


### 大项目

正式大项目中，不推荐使用 go run
- 最好使用 go build 或者 go install 子命令构建可执行程序文件来运行Go程序。
- 支持Go模块特性的Go项目, 根目录下需要一个 go.mod 文件。此文件可以使用 go mod init 子命令来生成
- 名称以 _ 和 . 开头的源代码文件将被Go官方工具链工具忽略掉。


## 包的使用

### go包介绍

Go语言以“包”作为管理单位，每个 Go 源文件必须先声明它所属的包，所以我们会看到每个 Go 源文件的开头都是一个 package 声明

Go语言的包与文件夹是一一对应的，它具有以下几点特性：
- 一个目录下的同级文件属于同一个包。
- 包名可以与其目录名不同。
- main 包 是Go语言程序的入口包，一个Go语言程序**必须**有且仅有一个 **main包**。如果一个程序没有 main 包，那么编译时将会出错，无法生成可执行文件。

每个 Go 程序都是由包组成的。
- 程序运行的入口是包 main 。
- 这个程序使用并导入了包 “fmt“ 和 “math/rand“ 。
- 按照惯例，包名与导入路径的最后一个目录一致。例如，”math/rand“ 包由 package rand 语句开始。
注意：
- 这个程序的运行环境是确定性的，因此 rand.Intn 每次都会返回相同的数字。
- 导入的包中不能含有代码中没有使用到的包，否则Go编译器会报编译错误，例如 imported and not used: "xxx"，"xxx" 表示包名。

Go 程序的执行（程序启动）顺序如下：
1. 按顺序导入所有被 main 包引用的其它包，然后在每个包中执行如下流程：
1. 如果该包又导入了其它的包，则从第一步开始递归执行，但是每个包只会被导入一次。
1. 然后以相反的顺序在每个包中初始化常量和变量，如果该包含有 init 函数的话，则调用该函数。
1. 在完成这一切之后，main 也执行同样的过程，最后调用 main 函数开始执行程序。

### go包导入

导入包的多种方式：三种模式：**正常**模式、**别名**模式、**简便**模式
- **直接**根据 $GOPATH/src 目录导入 import "test/lib" (路径其实是 $GOPATH/src/test/lib )
- **别名**导入：import alias_name "test/lib" ，这样使用的时候，可以直接使用别名
- 使用**点号**导入：import . "test/lib"，作用是使用的时候直接省略包名
- 使用**下划线**导入：improt _ "test/lib"，该操作其实只是引入该包。当导入一个包时，它所有的init()函数就会被执行，但有些时候并非真的需要使用这些包，仅仅是希望它的init()函数被执行而已。这个时候就可以使用_操作引用该包。即使用_操作引用包是无法通过包名来调用包中的导出函数，而是只是为了简单的调用其init函数()。往往这些init函数里面是注册自己包里面的引擎，让外部可以方便的使用，例如实现database/sql的包，在init函数里面都是调用了sql.Register(name string, driver driver.Driver)注册自己，然后外部就可以使用了。
- **相对路径**导入 : import   "./model"  //当前文件同一目录的model目录，但是不建议这种方式import

```go
package main  //必备，go程序在包中运行(每个包都有个相关的路径)

import ( //圆括号批量导入包
    "fmt" //预处理命令，包含fmt里的所有文件（如Println方法）
    "math/rand" // 包名与最后一个目录一致，如rand
    "./haoel"  //import当前目录里haoel子目录里的所有的go文件
    "haoel"  //import 环境变量 $GOPATH/src/haoel子目录里的所有的go文件
)  //可以使用相对路径，如./,../,如果没有使用相对路径， go会去找$GOPATH/src/目录
 
//main是程序入口
func main() { // 括号必须这种方式，否则报错！
    fmt.Println("My favorite number is", rand.Intn(10))
    /* 只能导入包里的首字母大写的方法（如fmt.Println,go包方法导出的命名规定），Foo 和 FOO 都是被导出的名称。名称 foo 是不会被导出的 */
    //fmt包和libc里的那堆使用printf， scanf，fprintf，fscanf 很相似
    fmt.Printf("%t\n", 1==2)
    fmt.Printf("二进制：%b\n", 255)
    fmt.Printf("八进制：%o\n", 255)
    fmt.Printf("十六进制：%X\n", 255)
    fmt.Printf("十进制：%d\n", 255)
    fmt.Printf("浮点数：%f\n", math.Pi)
    fmt.Printf("字符串：%s\n", "hello world")
    fmt.Printf("打印：%v\n", 255) //v 通用类型,自动适配,http://www.cnblogs.com/golove/p/3284304.html
 }
```

从go1.11开始，您可以使用新的模块系统;
- 切换到go mod模式后, 原先基于GOPATH方式的模块引用可能会不正常, 可用如下命令关闭：go env -w GO111MODULE=off

生成go.mod包
- go mod init suggestion

### 安装第三方包: 汉字转拼音

【2022-9-29】安装汉字转拼音工具包
- [go-pinyin](https://github.com/mozillazg/go-pinyin)
- [pinyin](https://github.com/chain-zhang/pinyin)

原理
- 将所有的汉字对应的 rune码，对应上它的拼音，也即是，有一个这样的 map\[rune]string, 其中 key 为汉字的 rune码，value 就是汉字的拼音了。这个 map 是通过文件来生成的。

文件内容示例
- 其中的拼音都是带声调的。不需要声调的话，可以替换成没有声调的字符。

```shell
3400=>qiū
3401=>tiàn
3404=>kuà
3405=>wǔ
3406=>yǐn
340C=>yí
3416=>xié
341C=>chóu
```

Mode 介绍
- InitialsInCapitals: 首字母大写, 不带音调
- WithoutTone: 全小写,不带音调
- Tone: 全小写带音调


```shell
# 安装pinyin
#go install github.com/mozillazg/go-pinyin/cmd/pinyin@latest
# 1.8之前用get get

# 新建测试目录
mkdir pinyin && cd pinyin
touch pinyin_test.go 
echo "...." > pinyin_test.go  # 内容如下
# 初始化当前目录为模块，解除path依赖
go mod init
# 获取 go-pinyin工具包
go get github.com/mozillazg/go-pinyin
#go get github.com/chain-zhang/pinyin 
# 执行测试脚本
go run pinyin_test.go
```

#### pinyin (失败)

[pinyin](https://www.jianshu.com/p/57b86a6bd9f9) 示例

```go
package main

import(
    "fmt"
     "github.com/chain-zhang/pinyin"
)

func main()  {
    str, err := pinyin.New("我是中国人").Split("").Mode(InitialsInCapitals).Convert()
    if err != nil {
        // 错误处理
    }else{
        fmt.Println(str)
    }

    str, err = pinyin.New("我是中国人").Split(" ").Mode(pinyin.WithoutTone).Convert()
    if err != nil {
        // 错误处理
    }else{
        fmt.Println(str)
    }

    str, err = pinyin.New("我是中国人").Split("-").Mode(pinyin.Tone).Convert()
    if err != nil {
        // 错误处理
    }else{
        fmt.Println(str)
    }

    str, err = pinyin.New("我是中国人").Convert()
    if err != nil {
        // 错误处理
    }else{
        fmt.Println(str)
    }   
}
```

#### go-pinyin (测试通过)

测试代码：go-pinyin

```go
package main

import (
	"fmt"
	"github.com/mozillazg/go-pinyin"
)

func main() {
	hans := "中国人"
	// 默认
	a := pinyin.NewArgs()
	fmt.Println(pinyin.Pinyin(hans, a)) // [[zhong] [guo] [ren]]
	// 包含声调
	a.Style = pinyin.Tone
	fmt.Println(pinyin.Pinyin(hans, a)) // [[zhōng] [guó] [rén]]
	// 声调用数字表示
	a.Style = pinyin.Tone2
	fmt.Println(pinyin.Pinyin(hans, a)) // [[zho1ng] [guo2] [re2n]]
	// 开启多音字模式
	a = pinyin.NewArgs()
	a.Heteronym = true
	fmt.Println(pinyin.Pinyin(hans, a)) // [[zhong zhong] [guo] [ren]]
	a.Style = pinyin.Tone2
	fmt.Println(pinyin.Pinyin(hans, a)) // [[zho1ng zho4ng] [guo2] [re2n]]
	fmt.Println(pinyin.LazyPinyin(hans, pinyin.NewArgs())) // [zhong guo ren]
	fmt.Println(pinyin.Convert(hans, nil)) // [[zhong] [guo] [ren]]
	fmt.Println(pinyin.LazyConvert(hans, nil)) // [zhong guo ren]
}
```


## go语言极速入门


2015年09月28日 Go语言极速入门手册.go

[Github](https://github.com/coderzh/CodeTips)
- gotips_test.go: Golang速学速查速用代码手册
- [Source](github.com/coderzh/CodeTips/blob/master/gotips_test.go)
- [Blog](http://blog.coderzh.com)

《Go语言编程》

```go
package main

import (
    "errors"
    "fmt"
    "github.com/stretchr/testify/assert"
    "io"
    "io/ioutil"
    "log"
    "math"
    "os"
    "path/filepath"
    "regexp"
    "strings"
    "sync"
    "testing"
    "time"
)
```


规范：
1. 命名：**骆驼**命名法（不要用下划线）

命令:
- go get github.com/coderzh/xxx
- go build calc
- go run xxx.go
- go install calc


```go
// 1. Hello World
func helloWorld() {
    fmt.Println("Hello, 世界")
}

// 2.变量类型
func typeDemo() {
    // 变量声明
    var v1 int
    var (
        v2 int
        v3 string
    )
    //var p *int // 指针类型
    var v4 int = 10 // 变量初始化
    var v5 = 10 // 等价于:
    v6 := 10 // 一般这样就好
    v1 = 10 // 赋值
    v2, v3 = 20, "test" // 多重赋值
    _, v4 = v5, v6 // 匿名变量 _
    fmt.Println(v1, v2, v3, v4)
    const Pi float64 = 3.1415926 // 常量
    const MaxPlayer = 10
    const ( // 枚举
        Sunday = iota // iota从0递增
        Mondy
        Tuesday
        // ...
    )

    // 类型
    var b1 bool // 1. 布尔
    b1 = true
    b1 = (1 == 2)
    fmt.Println(b1)

    // 2. 整形
    // int8 uint8 int16 uint16 int32 uint32 int64 uint64 int uint uintptr
    var i32 int32
    i32 = int32(64) // 强制转换
    // 运算：+, -, *, /, %（求余）
    // 比较：>, <, ==, >=, <=, !=
    // 位运算：x << y, x >> y, x ^ y, x & y, x | y, ^x （取反）
    fmt.Println(i32)
    // 3. 浮点
    var f1 float64 = 1.0001 // float32, float64
    var f2 float64 = 1.0002
    isEqual := math.Dim(f1, f2) < 0.0001 // 浮点比较
    fmt.Println(isEqual)
    // 4. 字符串
    var s1 string
    s1 = "abc"
    s1 = s1 + "ddd" // 字符串连接
    n := len(s1) // 取长度
    c1 := s1[0] // 取字符
    s1 = `\w+` // 反引号，不转义，常用于正则表达式
    fmt.Println(c1)
    fmt.Println(strings.HasPrefix("prefix", "pre")) // true
    fmt.Println(strings.HasSuffix("suffix", "fix")) // true

    // 字节遍历
    for i := 0; i < n; i++ {
        ch := s1[i]
        fmt.Println(ch)
    }
    // Unicode字符遍历
    for i, ch := range s1 {
        fmt.Println(i, ch)
    }

    // 5. 数组
    var arr1 [32]int
    //var arr2 [3][8]int // 二维数组
    // 初始化
    arr1 = [32]int{0}
    array := [5]int{1, 2, 3, 4, 5}
    // 临时结构体数组
    structArray := []struct {
        name string
        age  int
    } { {"Tim", 18}, {"Jim", 20} }

    // 数组遍历
    for i := 0; i < len(array); i++ {
        fmt.Println(array[i])
    }
    for i, v := range structArray {
        fmt.Println(i, v)
    }
    // 数组是值类型，每次参数传递都是一份拷贝
    // 数组切片Slice
    var mySlice []int = arr1[:2]
    mySlice1 := make([]int, 5)
    mySlice2 := make([]int, 5, 10)

    fmt.Println("len(mySlice2:", len(mySlice2)) // 5
    fmt.Println("cap(mySlice2:", cap(mySlice2)) // 10

    mySlice3 := append(mySlice, 2, 3, 4)
    mySlice4 := append(mySlice, mySlice1...)

    copy(mySlice3, mySlice4)

    // 6. Map
    var m map[int]string
    m[1] = "ddd"
    m1 := make(map[int]string)
    m2 := map[int]string{
        1: "a",
        2: "b",
    }
    delete(m2, 1) // 删除map元素
    value, ok := m1[1]
    if ok {
        fmt.Println(value)
    }
    for k, v := range m2 {
        fmt.Println(k, v)
    }
}
// 3. 流程控制
func flowDemo() {
    // if else
    a := 10
    if a < 10 {
        // ..
    } else {
        // ..
    }
    // switch
    switch a {
    case 0:
        fmt.Println("0")
    case 10:
        fmt.Println("10")
    default:
        fmt.Println("default")
    }
    switch { // 无判断条件
    case a < 10:
        fmt.Println("<10")
    case a < 20:
        fmt.Println("<20")
    }

    // 循环
    for i := 0; i < 10; i++ {
    }
    // 无限循环
    sum := 0
    for {
        sum++
        if sum > 10 {
            break
            // 指定break
            // break JLoop
        }
    }
    goto JLoop

JLoop:
    // break to here
}

// 4. 函数
// func 函数名(参数列表)(返回值列表) {
// }
func sum1(value1 int, value2 int) (result int, err error) {
    // err = errors.New("xxxx")
    return value1 + value2, nil
}

func sum2(value1, value2 int) int {
    return value1 + value2
}
// 不定参数
// myFunc(1, 2, 3, 4, 5)
func myFunc(args ...int) {
    for _, arg := range args {
        fmt.Println(arg)
    }
    // 传递
    // myFunc2(args...)
    // myFunc2(args[1:]...)
}

// 任意类型的不定参数
func myPrintf(args ...interface{}) {
    for _, arg := range args {
        switch arg.(type) {
        case int:
            fmt.Println(arg, "is int")
        case string:
            fmt.Println(arg, "is string")
        default:
            fmt.Println(arg, "is unknown")
        }
    }
}

// 匿名函数
func anonymousFunc() {
    f := func(a, b int) int {
        return a + b
    }
    f(1, 2)
}

// defer
func deferDemo(path string) {
    f, err := os.Open(path)
    if err != nil {
        return
    }
    defer f.Close()
    // or
    defer func() {
        if r := recover(); r != nil {
            fmt.Printf("Runtime error caught: %v", r)
        }
    }()
}

// 5. 结构体
type Rect struct {
    x, y float64 // 小写为private
    Width, Height float64 // 首字母大写为public
}
// 大写方法为public，小写为private
func (r *Rect) Area() float64 {
    return r.Width * r.Height
}
func netRect(x, y, width, height float64) *Rect {
    // 实例化结构体
    // rect1 := new(Rect)
    // rect2 := &Rect{}
    // rect3 := &Rect{Width:100, Height:200}
    return &Rect{x, y, width, height}
}

// 匿名组合： “类”的继承顺序：Base → Foo → Bar
type Base struct {
    Name string
}
func (base *Base) Foo() {}
func (base *Base) Bar() {}

type Foo struct {
    Base
    *log.Logger
}
func (foo *Foo) Bar() {
    foo.Base.Bar()
    // ...
}

// 非侵入式接口
type IFile interface {
    Read(buf []byte) (n int, err error)
    Write(buf []byte) (n int, err error)
}

type File struct {
}

func (file *File) Read(buf []byte) (n int, err error) {
    return 0, nil
}

func (file *File) Write(buf []byte) (n int, err error) {
    return 0, nil
}

func interfaceDemo() {
    // 只要实现了Read, Write方法即可
    var file IFile = new(File)
    // 接口查询
    // 是否实现了IFile接口
    if file2, ok := file.(IFile); ok {
        file2.Read([]byte{})
    }
    // 实例类型是否是File
    if file3, ok := file.(*File); ok {
        file3.Read([]byte{})
    }
    // 类型查询
    switch v := file.(type) {
    }
}

// 6. 并发编程
func counting(ch chan int) {
    ch <- 1
    fmt.Println("counting")
}

func channelDemo() {
    chs := make([]chan int, 10)
    for i := 0; i < len(chs); i++ {
        chs[i] = make(chan int)
        // 带缓冲区大小
        // c: = make(chan int, 1024)
        // for i:= range c {
        // }
        go counting(chs[i])
    }
    for _, ch := range chs {
        <-ch
        // channel select
        /*
            select {
            case <-ch:
                // ...
            case ch <- 1:
            }
        */
    }
    // 单向Channel
    var ch1 chan<- int // 只能写入int
    var ch2 <-chan int // 只能读出int
    // 关闭Channel
    close(ch1)
    _, ok := <-ch2
    if !ok {
        // already closed
    }
}

// 锁
var m sync.Mutex

func lockDemo() {
    m.Lock()
    // do something
    defer m.Unlock()
}
// 全局唯一操作
var once sync.Once
once.Do(someFunction)
// 7. 网络编程
import "net"
net.Dial("tcp", "127.0.0.1:8080")
// 8. json处理
import "encoding/json"
json.Marshal(obj) 序列化
json.Unmarshal() 反序列化
// 9. Web开发
import "net/http"
import "html/template" // 模板
// 10. 常用库
import "os"
import "io"
import "flag"
import "strconv"
import "crypto/sha1"
import "crypto/md5"
// 11. 单元测试
// _test结尾的go文件： xxx_test.go
// 函数名以Test开头
func TestDemo(t *testing.T) {
    r := sum2(2, 3)
    if r != 5 {
        t.Errorf("sum2(2, 3) failed. Got %d, expect 5.", r)
    }
    assert.Equal(t, 1, 1)
}

// 12. 性能测试
func benchmarkAdd(b *testing.B) {
    b.StopTimer()
    // dosometing
    b.StartTimer()
}
```

 其他常用的代码片段

```go
// 1. 遍历文件 filepath.Walk
// import "path/filepath"
func doHashWalk(dirPath string) error {
    fullPath, err := filepath.Abs(dirPath)
    if err != nil {
        return err
    }
    callback := func(path string, fi os.FileInfo, err error) error {
        return hashFile(fullPath, path, fi, err)
    }
    return filepath.Walk(fullPath, callback)
}

func hashFile(root string, path string, fi os.FileInfo, err error) error {
    if fi.IsDir() {
        return nil
    }
    rel, err := filepath.Rel(root, path)
    if err != nil {
        return err
    }
    log.Println("hash rel:", rel, "abs:", path)
    return nil
}

// 2. 读取文件
import "io/ioutil"
func readFileDemo(filename string) {
    content, err := ioutil.ReadFile(filename)
    if err != nil {
        //Do something
    }
    lines := strings.Split(string(content), "\n")
    fmt.Println("line count:", len(lines))
}
// 判断目录或文件是否存在
func existsPathCheck(path string) (bool, error) {
    // 判断不存在
    if _, err := os.Stat(path); os.IsNotExist(err) {
        // 不存在
    }
    // 判断是否存在
    _, err := os.Stat(path)
    if err == nil {
        return true, nil
    }
    if os.IsNotExist(err) {
        return false, nil
    }
    return true, err
}
// 文件目录操作
func fileDirDemo() {
    // 级联创建目录
    os.MkdirAll("/path/to/create", 0777)
}
// 拷贝文件
func copyFile(source string, dest string) (err error) {
    sf, err := os.Open(source)
    if err != nil {
        return err
    }
    defer sf.Close()
    df, err := os.Create(dest)
    if err != nil {
        return err
    }
    defer df.Close()
    _, err = io.Copy(df, sf)
    if err == nil {
        si, err := os.Stat(source)
        if err != nil {
            err = os.Chmod(dest, si.Mode())
        }
    }
    return
}
// 拷贝目录
func copyDir(source string, dest string) (err error) {
    fi, err := os.Stat(source)
    if err != nil {
        return err
    }
    if !fi.IsDir() {
        return errors.New(source + " is not a directory")
    }
    err = os.MkdirAll(dest, fi.Mode())
    if err != nil {
        return err
    }
    entries, err := ioutil.ReadDir(source)
    for _, entry := range entries {
        sfp := filepath.Join(source, entry.Name())
        dfp := filepath.Join(dest, entry.Name())
        if entry.IsDir() {
            err = copyDir(sfp, dfp)
            if err != nil {
                fmt.Println(err)
            }
        } else {
            err = copyFile(sfp, dfp)
            if err != nil {
                fmt.Println(err)
            }
        }

    }
    return nil
}
// 3. 时间处理
import "time"
func TestTimeDemo(t *testing.T) {
    // Parse
    postDate, err := time.Parse("2006-01-02 15:04:05", "2015-09-30 19:19:00")
    fmt.Println(postDate, err)
    // Format
    assert.Equal(t, "2015/Sep/30 07:19:00", postDate.Format("2006/Jan/02 03:04:05"))
    assert.Equal(t, "2015-09-30T19:19:00Z", postDate.Format(time.RFC3339))
}
// 4. 正则表达式
import "regexp"
func TestRegexp(t *testing.T) {
    // 查找匹配
    re := regexp.MustCompile(`(\d+)-(\d+)`)
    r := re.FindAllStringSubmatch("123-666", -1)
    assert.Equal(t, 1, len(r))
    assert.Equal(t, "123", r[0][1])
    assert.Equal(t, "666", r[0][2])
}
func main() {
    helloWorld()
}
```

# GO语法

## Go教程

- 【2022-7-28】[Go语言圣经（中文版）](https://books.studygolang.com/gopl-zh/ch0/ch0-03.html)
- [Go语言101](https://gfw.go101.org/article/101.html)是关于Go语言编程的一系列丛书。 [github](https://github.com/golang101/golang101) 目前本系列丛书包括：
  - 《Go语言（基础知识）101》是一本着墨于Go语法语义（除了自定义泛型）以及运行时相关知识点的编程指导书。
  - 《Go自定义泛型101》详细介绍了Go自定义泛型中的方方面面。
  - 《Go编程优化101》列出了一些Go编程中的一些性能优化技巧和建议。
  - 《Go细节和小技巧101》搜集了很多Go编程中的细节和小技巧。

```shell
git clone https://github.com/golang101/golang101.git
cd golang101
git pull
go run . # 启动服务: 本地阅读
# 未打开浏览器？手动访问 http://localhost:12345
# 命令行选项：
# -port=1234
# -theme=light # 或者 dark （默认为 auto）
```

## 单引号、双引号、反引号

Go语言的字符串类型string在本质上就与其他语言的字符串类型不同：
- Java的String、C++的std::string以及Python3的str类型都只是定宽字符序列
- Go语言的字符串是一个用UTF-8编码的变宽字符序列，它的每一个字符都用一个或多个字节表示
即：一个Go语言字符串是一个**任意字节**的常量序列。

Golang的双引号和反引号都可用于表示一个常量字符串，不同在于：
- **双引号**用来创建可解析的字符串字面量(支持转义，但不能用来引用多行)
- **反引号**用来创建原生的字符串字面量，这些字符串可能由多行组成(不支持任何转义序列)，原生的字符串字面量多用于书写多行消息、HTML以及正则表达式
- **单引号**则用于表示Golang的一个特殊类型：rune，类似其他语言的byte但又不完全一样，是指：**码点字面量**（Unicode code point），不做任何转义的原始内容。

## 分隔符

Go语言中，行分隔符键是语句终止符，无需指明用;分割
- 和C一样，Go的正式的语法使用分号来终止语句。和C不同的是，这些分号由词法分析器在扫描源代码过程中使用简单的规则自动插入分号，因此输入源代码多数时候就不需要分号了。
- 规则是这样的：如果在一个新行前方的最后一个标记是一个标识符（包括像int和float64这样的单词）、一个基本的如数值这样的文字、或以下标记中的一个时，会自动插入分号：
- break continue fallthrough return ++ -- ) }

通常Go程序仅在for循环语句中使用分号，以此来分开初始化器、条件和增量单元。如果你在一行中写多个语句，也需要用分号分开。
- 注意：无论任何时候，你都不应该将一个控制结构（(if、for、switch或select)的左大括号放在下一行。如果这样做，将会在大括号的前方插入一个分号，这可能导致出现不想要的结果。


## 数据类型

四种重要的数据类型，即整数，浮点数，字符串和布尔值。
- 整数是整数，浮点数是数字，字符串是"文本"，布尔值是真值，因此是true或false。
- 无符号变量，数值永远不能为负。使用带符号的变量，可以为负

![](https://p26.toutiaoimg.com/origin/pgc-image/d0e5e844a87845c4a54fa205d7a6eac2?from=pc)

详解：
- Numeric：分 int 和 float
- String
- Boolean：true 或 false
- Derived：分 Pointer、Array、Structure、Mp以及Interface

| 编号 | 类型 | 说明 |
|---|---|---|
| 1| **布尔**类型 | 由两个预定义常量组成：(a) true (b) false|
| 2| **数字**类型 | 算术类型，在整个程序中表示：<br>a)整数类型<br>b)浮点值。|
| 3| **字符串**类型 | 字符串类型表示字符串值的集合。它的值是一个字节序列。 字符串是不可变的类型，一旦创建后，就不可能改变字符串的内容。预先声明的字符串类型是string。|
| 4| **派生**类型 | 包括<br>(a)指针类型<br>(b)数组类型<br>(c)结构类型<br>(d)联合类型<br>(e)函数类型<br>(f)切片类型<br>(g)函数类型<br>(h)接口类型<br>(i) 类型|
 
所有类型：
- bool  
- string  
- int  int8(byte)  int16  int32(rune)  int64 
- uint uint8 uint16 uint32 uint64 uintptr  
- byte // uint8 的别名  
- rune // int32 的别名。代表一个Unicode码  
- float32 float64  
- complex64 complex128
- int，uint 和 uintptr 类型在**32位**的系统上一般是32位，而在**64位**系统上是64位。当需要使用一个整数类型时，应该首选 int，仅当有特别的理由才使用定长整数类型或者无符号整数类型。

```go
package main

import (
    "fmt"
    "math/cmplx" 
) 

var ( //组合定义变量
     ToBe   bool       = false
     MaxInt uint64     = 1<<64 – 1
     z      complex128 = cmplx.Sqrt(-5 + 12i) 
     x // 变量在定义时没有明确的初始化时会赋值为 零值(“”,0,false…) 
     var i int = 42
     var f float64 = float64(i) //类型强转,不同于C，必须显示转换，不存在隐式转换
     f := float64(i) //短声明，简洁形式
     const Pi = 3.14 //定义常量
     const World = "世界"
) 
const (     
     Big   = 1 << 100     
     Small = Big >> 99 
)
 
func main() {
    const f = "%T(%v)\n"
    fmt.Printf(f, ToBe, ToBe)
    fmt.Printf(f, MaxInt, MaxInt)
    fmt.Printf(f, z, z) 
}
```

### 自定义类型 type

type-keyword创建的模板

```go
type people []string

func main() {
    var stu = people{"max", "anna"}
    fmt.Println(stu)
}
```

## 字符串


### 字符串定义

```go
package main 
import (
  "fmt"
  "strings" 
)

func main() {    
    greetings :=  []string{"Hello","world!"}    
    fmt.Println(strings.Join(greetings, " "))  //字符串连接
}
```
 
- 前缀：strings.HasPrefix("prefix", "pre")
- 后缀：strings.HasSuffix("suffix", "fix")

### 字符串格式化

【2022-9-16】[fmt.Sprintf 格式化字符串](https://www.runoob.com/go/go-fmt-sprintf.html)

sprintf
- 格式化样式：字符串形式，格式化符号以 % 开头， %s 字符串格式，%d 十进制的整数格式。
- 参数列表：多个参数以逗号分隔，个数必须与格式化样式中的个数一一对应，否则运行时会报错。

| 格式 | 描述 | 示例 |
|---|---|---|
| %v |按值的本来值输出 | {1 2} |
| %+v |在基础上，对结构体字段名和值进行展开 | {x:1 y:2} |
| %#v |输出Go 语言语法格式的值 | main.point{x:1, y:2} |
| %T |输出Go 语言语法格式的类型和值 | main.point |
| %% |输出%本体 | |
| %b |整型以二进制方式显示 | |
| %o |整型以八进制方式显示 | |
| %d |整型以十进制方式显示 | |
| %x |整型以十六进制方式显示 | |
| %X |整型以十六进制、字母大写方式显示 | |
| %U |Unicode字符 | |
| %f |浮点数 | |
| %p |指针，十六进制方式显示 | |

```go
package main

import (
    "fmt"
    "os"
)

type point struct {
    x, y int
}

func main() {
    p := point{1, 2}
    fmt.Printf("%v\n", p) // {1 2}
    fmt.Printf("%+v\n", p) // {x:1 y:2}
    fmt.Printf("%#v\n", p) // main.point{x:1, y:2}
    fmt.Printf("%T\n", p) // main.point
    fmt.Printf("%t\n", true)
    fmt.Printf("%d\n", 123)
    fmt.Printf("%b\n", 14)
    fmt.Printf("%c\n", 33)
    fmt.Printf("%x\n", 456)
    fmt.Printf("%f\n", 78.9)
    fmt.Printf("%e\n", 123400000.0)
    fmt.Printf("%E\n", 123400000.0)
    fmt.Printf("%s\n", "\"string\"")
    fmt.Printf("%q\n", "\"string\"")
    fmt.Printf("%x\n", "hex this")
    fmt.Printf("%p\n", &p)
    fmt.Printf("|%6d|%6d|\n", 12, 345)
    fmt.Printf("|%6.2f|%6.2f|\n", 1.2, 3.45)
    fmt.Printf("|%-6.2f|%-6.2f|\n", 1.2, 3.45)
    fmt.Printf("|%6s|%6s|\n", "foo", "b")
    fmt.Printf("|%-6s|%-6s|\n", "foo", "b")
    s := fmt.Sprintf("a %s", "string")
    fmt.Println(s)
    fmt.Fprintf(os.Stderr, "an %s\n", "error")
}
```


### 字符串操作大全

strings使用方法
- Contains* 包含
- Count 技术
- HasPrefix，HasSuffix 前缀、后缀判断
- Index* 找子串
- Join 连接
- Split 分割
- Replace 替换

```go
package main
import s "strings" //strings取个别名
import "fmt"

var p = fmt.Println//给 fmt.Println 一个短名字的别名，随后将会经常用到。
func main() {
//注意都是包中的函数，不是字符串对象自身的方法，调用时传递字符作为第一个参数进行传递。
    p("Contains:  ", s.Contains("test", "es")) // true,包含判断，注意s.Contains("", "")=true
    p(s.ContainsAny("test", "e")) // e&s(且),e|s(或)
    p(s.ContainsRune("我爱中国", '我'))  //字符匹配，注意是单引号！
    p(s.EqualFold("Go", "go")) //判等，忽略大小写
	// Fields 去除s字符串的空格字符，并按照空格分割返回slice
	fmt.Println(strings.Fields("  I love you   !  ")) // 返回 ["I","love","you","!"]
    p(s.Fields("a b c")) //字符串变列表["a" "b" "c"]
    p("Count:     ", s.Count("test", "t")) //2 计数
    p("HasPrefix: ", s.HasPrefix("test", "te"))// true 前缀判断
    p("HasSuffix: ", s.HasSuffix("test", "st"))// true 后缀判断
    // Contains 字符串s中是否包含substr，返回bool值
	fmt.Println(strings.Contains("seafood", "foo"))
	fmt.Println(strings.Contains("seafood", "bar"))
    // Index 在字符串s中查找substr所在的位置，返回位置值，找不到返回-1
	fmt.Println(strings.Index("zhaoxu", "ox"))
	fmt.Println(strings.Index("zhaoxu", "oocc"))
    p("Index:     ", s.Index("test", "e"))// 1 查找子串
    p("Index:     ", s.IndexAny("我是中国人", "中"))// 返回任意一个
    p("Index:     ", s.IndexRune("我是中国人", '中'))// 字符
    p("Index:     ", s.LastIndex("go gopher", "go"))// 1 查找子串
    p("Index:     ", s.LastIndexAny("go gopher", "go"))// 1 查找子串
    rot13 := func(r rune) rune {
        switch {
            case r >= 'A' && r <= 'Z':
                return 'A' + (r-'A'+13)%26
            case r >= 'a' && r <= 'z':
                return 'a' + (r-'a'+13)%26
		}
		return r
	}
    fmt.Println(strings.Map(rot13, "'Twas brillig and the slithy gopher...")) //相当于python中的map
    // Join 字符串连接，将slice a通过sep连接
	fmt.Println(strings.Join([]string{"I", "Love", "You"}, "-->"))
    p("Join:      ", s.Join([]string{"a", "b"}, "-")) //a-b slice连接成字符串
    // Repeat 重复s，count次，返回重复的字符串
	fmt.Println(strings.Repeat("Love", 5))
    p("Repeat:    ", s.Repeat("a", 5)) // aaaaa 重复
    p("Replace:   ", s.Replace("foo", "o", "0", -1)) //f00 全部替换
    p("Replace:   ", s.Replace("foo", "o", "0", 1))//f0o 1次替换
    p("Replace:   ", s.Replace("foo", "o", "0", 2))//f0o 2次替换，从前往后逐个替换
    // Split 把字符串按照sep分割，返回分割后的slice
	fmt.Println(strings.Split("I love you", " ")) // 按空格分隔字符串
	fmt.Println(strings.Split(" zxy ", ""))
    p("Split:     ", s.Split("a-b-c-d-e", "-"))//[a b c d e] string转array（slice？）
    fmt.Printf("%qn", strings.SplitAfter("/home/m_ta/src", "/")) //["/" "home/" "m_ta/" "src"]
    fmt.Printf("%qn", strings.SplitAfterN("/home/m_ta/src", "/", 2)) //["/" "home/m_ta/src"]
    fmt.Printf("%qn", strings.SplitN("/home/m_ta/src", "/", 2)) //["/" "home/" "m_ta/" "src"]
   fmt.Printf("%qn", strings.SplitN("/home/m_ta/src", "/", -1)) //["" "home" "m_ta" "src"]
    fmt.Println(strings.Title("her royal highness")) //首字符大写？
    fmt.Println(strings.ToTitle("loud noises"))
    p("ToLower:   ", s.ToLower("TEST"))//test 小写
    p("ToUpper:   ", s.ToUpper("test"))//TEST 大写
    // 截断
    fmt.Printf("[%q]", strings.Trim(" !!! Achtung !!! ", "! ")) // ["Achtung"]
    fmt.Printf("[%q]", strings.TrimLeft(" !!! Achtung !!! ", "! ")) // ["Achtung !!! "]
    fmt.Println(strings.TrimSpace(" tn a lone gopher ntrn")) // a lone gopher
    p("Len: ", len("hello"))// 5 长度
    p("Char:", "hello"[1])// 101 取字符
}
```

参考：[go字符串操作示例](http://studygolang.com/articles/771)

## 数组（array）—— 固定大小

```go
var a [10]int //定义数组时需要制定大小s
var stu = [2]string{"a", "b"}
stu[0] = "c"
ftm.Println(stu)
// 变长数组
var stu = []string{"a", "b"}
std = append(std, "c")
fmt.Println(stu)
// 遍历数组
for i, v := range stu {
    fmt.Println(i, v)
}
// 不要下标
for _, v := range stu {
    fmt.Println(v)
}
```

### 字符串替换

字符串替换
- sprintf
  - 格式化样式：字符串形式，格式化符号以 % 开头， %s 字符串格式，%d 十进制的整数格式。
  - 参数列表：多个参数以逗号分隔，个数必须与格式化样式中的个数一一对应，否则运行时会报错。
- os.Expand：参考[go模板替换](https://blog.csdn.net/puss0/article/details/120897665)
- 正则表达式

```go
package main

import (
    "fmt"
    "io"
    "os"
)

func main() {
    // ======= 方法一 ========
    // go 中格式化字符串并赋值给新串，使用 fmt.Sprintf
    // %s 表示字符串
    var stockcode="000987"
    var enddate="2020-12-31"
    var url="Code=%s&endDate=%s"
    var target_url=fmt.Sprintf(url,stockcode,enddate)
    fmt.Println(target_url)
    // 另外一个实例，%d 表示整型
    const name, age = "Kim", 22
    s := fmt.Sprintf("%s is %d years old.\n", name, age)
    io.WriteString(os.Stdout, s) // 简单起见，忽略一些错误
    // ======== 方法二 ========
    var config = `
    app.name = ${appName}
    app.ip = ${appIP}
    app.port = ${appPort}
    `
    var dev = map[string]string{
        "appName": "my_app",
        "appIP":   "0.0.0.0",
        "appPort": "8080",
    }
    // config 字符串模板（占位符 ${x},其中{}是可以省略），dev是变量字典，通过匿名函数来实现替换
    s := os.Expand(config, func(k string) string { return dev[k] })
	fmt.Println(s)
}
```


- 数组的长度是其类型的一部分，因此数组不能改变大小——怎么办？用slice！
- 数组在Go语言中很重要，应该需要了解更多的信息。

以下几个与数组相关的重要概念应该向Go程序员明确：

| 概念| 描述|
|---|---|
|多维数组|Go支持多维数组，多维数组的最简单的形式是二维数组。|
| 将数组传递给函数| 可以通过指定数组的名称而不使用索引，将指向数组的指针传递给函数。|
 
 
## 切片(slice) —— 大小不定
 
一个 slice 会指向一个序列的值，并且包含了长度信息。slice包含了array的基本操作

```go
func main() {
    x := [3]int{3,5,6} //指明大小就是array！否则slice
    x := [3]int{} // 数组
    s := []int{2, 3, 5, 7, 11, 13} // slice
    a := make([]int, 5)  // len(a)=5,用make构造slice（默认取值0）
    b := make([]int, 0, 5) // len(b)=0, cap(b)=5，指定容量
    var z []int //nil slice空切片,z=nil
    z = append(z, 0) //append追加元素
    z = append(z, 1,4,3)//多个元素
    copy(a,b) //复制
    fmt.Println("s ==", s)      
    fmt.Println("s[1:4] ==", s[1:4]) //s[:4],s[:5]同python
    game := [][]string{ //二维切片
       []string{"_", "_", "_"}, 
       []string{"_", "_", "_"}
    }
    for i := 0; i < len(s); i++ {         
        fmt.Printf("s[%d] == %d\n", i, s[i])  
            fmt.Printf("%s\n", strings.Join(s[i], " ")) //连接二维切片里的一维
    } 
}

func test_array(array [5]int){ //array值传递，未改变原参数值 
    newarray := array 
    newarray[0] = 88 
}
func test_slice(slice []int){ //slice引用传递，值改变了
    newslice := slice
    newslice[0] = 88
}
```

- 不只是数组，go语言中的大多数类型在函数中当作参数传递都是**值**语义的。任何值语义的一种类型当作参数传递到调用的函数中，都会经过一次内容的copy，从一个方法栈中copy到另一个方法栈
- go不是一种纯粹的面向对象语言，更多的是一种更**简单高效的C**，所以在参数传递上跟C保持着基本的一致性。一些较大的数据类型，比如结构体、数组等，最好使用传递指针的方式，这样就能避免在函数传递时对数据的copy。
- 虽然slice在传递时是按照引用语义传递，但是又因为append()操作的问题，导致即使是引用传递还是不能顺利解决一些问题

## 范围（range）

range关键字在for循环中用于遍历数组，切片，通道或映射的项目

| 范围表达式 | 第1个值 | 第2个值(可选)|
|---|---|---|
| 数组或切片a\[n]E | 索引 i 整数 | a\[i]E|
| Strubg s字符串| 索引 i 整数| 符文整数|
| map m map\[K]V| key k K | value m\[k] V
| channel c chan E | element e E | none |

循环遍历slice、map

```go
var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}  
func main() {
   for i, v := range pow { //取index、value
        fmt.Printf("2**%d = %d\n", i, v)     
   }
    pow := make([]int, 10)     
    for i := range pow {  // 取index
        pow[i] = 1 << uint(i)     
    }
    for _, value := range pow { //取value（index用_忽略）
        fmt.Printf("%d\n", value)     
    }
}
```

## 哈希map

`映射`(Map)，它将唯一键映射到值。 键是用于在检索值的对象。 给定一个键和一个值就可以在Map对象中设置值

```go
var countryCapitalMap map[string]string  // 创建map
countryCapitalMap = make(map[string]string) // string -> string
/* insert key-value pairs in the map*/    
countryCapitalMap["France"] = "Paris" // 插入元素
delete(countryCapitalMap,"France"); // 删除
   /* print map using keys*/    
for country := range countryCapitalMap {    // （1）按照key遍历map   
   fmt.Println("Capital of",country,"is",countryCapitalMap[country])    
}
// `range` on map iterates over key/value pairs.     
kvs := map[string]string{"a": "apple", "b": "banana"} //初始化！
for k, v := range kvs {    // （2）按照键值对遍历map
    fmt.Printf("%s -> %s\n", k, v)     
}      
// `range` can also iterate over just the keys of a map.     
for k := range kvs {    // （1）按照key遍历map
    fmt.Println("key:", k)     
}      
// `range` on strings iterates over Unicode code points. The first value is the starting byte index of the `rune` and the second the `rune` itself.     
for i, c := range "go" {  //字符串时遍历字符
   fmt.Println(i, c)     
}
m := map[string]map[string]string{} // 嵌套map
mm, ok := m["kkk"]
if !ok {
    mm = make(map[string]string)
    m["kkk"] = mm
}
mm[k1k1k1] = "sssss"
//【2017-06-21】map存在性判断
//【教训】go禁止对map成员取地址。。。但slice成员可以，好变态
if _, ok := map[key]; ok {//存在
}

test := map[string]int{"a":1,"b":2}
// ./multi_map.go:34: cannot take the address of test["a"]
fmt.Println("三层取地址:",&copyWriteDict["female"][1]) //slice成员可以取地址
fmt.Println("三层取地址:",&copyWriteDict["female"][1]["real"]) //cannot take the address of copy
```

解决办法：
- （1）不传指针 
- （2）提前用临时变量缓存，再传非map类的地址

## 变量

Go标识符是用于标识**变量**、**函数**或任何其他用户定义项目的名称。
- 标识符以字母A到Z或a到z或下划线_开头，后跟零个或多个字母，下划线和数字(0到9)组成。
- 标识符 = \[字母_] {字母 \| unicode数字_}。

Go不允许在标识符中使用**标点符号**，例如@, $ 和 %。 Go是一种区分大小写的编程语言。 
- 因此，Manpower和manpower在Go中是两个不同的标识符

go 变量的特殊之处：没有空值描述尚未分配值的变量的值。而是，每个变量类型都有一个默认值，具体取决于变量的数据类型。
- 如果声明没有值的变量，则必须指定数据类型，否则变量类型是可选的

两种定义变量的方法：
- 经典方法（使用variable-keyword）
- 简写语法

```go
// ---- 经典方式 -----
var name string
var name string = "max" // 指定初始值
var name = "max" // 不提供类型，go自动根据取值推断类型
var age int
var age, grade int = 15, 9 // 一次定义多个
var adult bool
var height float32
const name =" Max" // 常量变量，不容修改
// ---- 简写方式 -----
tmp := "max" // 函数外部失效

func main(){
    fmt.Println(name) // ""
    fmt.Println(age) // 0
    fmt.Println(adult) // false
    fmt.Println(height) // 0
    tmp := "max" // 简写方式函数内部才行
    tmp = "变量覆盖"
    fmt.Println(tmp)
    var first string
    fmt.Scanln(&first) // 读值到变量中
    fmt.Print("输入了值："+first+"\n")
}
```

## 关键词

关键词总结
- break, default, func, interface, select, case, defer, go, map, struct, chan, else, goto, package, switch, const, fallthrough, if, range, type, continue, for, import, return, var
 
## 函数

- 类型：按**值**调用、按**引用**调用
- **局部**变量、**全局**变量（main函数之外定义）
- 函数可以接受**任意**参数（类型在变量后面），返回任意参数

注意
- 函数必须包含return语句！

### 自定义函数

Go中自定义函数由6部分组成：关键字`func`、`函数名`、`参数列表`、`返回值类型`(可选）、`函数体`、关键字`return`（可选）
- 其中参数列表又分为带参数和不带参数两种类型
- 如果带参数的话，必须在参数列表里指明该参数的数据类型。

注意
- 自定义函数中如果注明了返回值类型，就必须包含return关键字
- 如果缺失了return关键字的话，系统会报错"missing return at end of function"提醒

自定义函数还可以作为另一个自定义函数中的参数，称为`自定义函数嵌套`。

```go
package main

import "fmt"

// 自定义函数：有返回值类型，所以必须有return
func hostname(model string, number string) string {
    result := model + "-" + number
    return result
}
// 自定义函数：无返回值类型，其中一个参数是函数
func hostname_with_ip(original_hostname func(string, string) string, ip string) {
    result := original_hostname("ISR4400", "1")
    fmt.Println(result + "-" + ip)
}

func main() {
    // 将函数当做参数传入
    hostname_with_ip(hostname, "192.168.1.1")
}
```

### 显式函数

```go
package main
import "fmt"

var c, python, java bool //全局变量定义,var声明
var c, python, java = true, false, "no!" //带初始化语句时可省略类型
c, python, java := true, false, "no!"//短声明:=，可以省略var关键字，注：func外不能使用短声明
// 参数
func add(x int, y int) int {
    return x + y 
    //return // 裸返回：没有参数的 return 语句返回各个返回变量的当前值
}

func swap(x, y string) (string, string) { //多个输出，返回多个值
   //函数参数同类型时可以缩写
    return y, x 
}

func main() {
    fmt.Println(add(42, 13))
    a, b := swap("hello", "world") // :=，局部变量，函数体内定义
    fmt.Println(a, b)
}
```

### 匿名函数

Go语言支持**匿名**函数，通过**闭包方式**实现。匿名函数在想要定义函数而不必命名时非常有用（**内联函数**）

```go
import "fmt"

func intSeq() func() int {   //i记录调用次数，相当于计数器
    i := 0     //定义初始值
    return func() int { //通过闭包方式隐藏变量i    
        i += 1         
        return i     
    } 
}
func main(){
    nextInt := intSeq() // 返回函数，nextInt是函数名
    fmt.println(nextInt())  //1,每次调用都会更新
    fmt.println(nextInt())  //2
    newInt := intSeq()
    fmt.println(newInt()) //1
}
```

### 特殊函数

自定义函数时要避开系统内置的特殊函数

#### init函数

init函数
- init 函数最主要的作用，就是完成一些初始化的工作
- 每个源文件都可以包含一个 init  函数，该函数会在 main 函数执行前，被 Go 运行框架调用，也就是说 init 会在 main 函数前被调用
- 如果文件同时包含全局变量定义，init  函数和 main  函数，则执行的流程是：
  - 全局变量定义 -> init函数 -> main 函数。

```go
package main
import "fmt"

var g_a int = 10 // 全局变量

type new_type struct {
	x int
	y string
}

func init(){
	fmt.Println("系统自动调用：main函数前")
	fmt.Println("init: ", g_a)
}

func change(p *new_type){
	p.x = 5
	p.y = "changing ..."
}


func main(){
	fmt.Println("hello")
	s := new_type{x:3, y:"world"}
	fmt.Println(s)
	fmt.Println(s.y)
	//change(s)
	change(&s)
	fmt.Println(s)
	g_a = 30
	fmt.Println("main: ", g_a)
}
```

输出

```shell
系统自动调用：main函数前
init:  10
hello
{3 world}
world
{5 changing ...}
main:  30
```

## 参数

### 外部参数

运行：
- go run main.go <font color='blue'>name = max </font>

```go
import (
    "fmt"
    "os"
)

func main() {
    arg := os.Args[1] // 访问第二个参数，即 name
    fmt.Println(arg) // 输出 max
}
```

### 函数参数

```go
func add(x int, y int) int {
    return x + y 
    //return // 裸返回：没有参数的 return 语句返回各个返回变量的当前值
}
// 参数简写
func add(x, y int) int {
    return x + y 
}
```


### 变参函数

参数数量不确定时，可以使用变参

```go
package main
import "fmt"

var x string = "hello" //错误！字符串要用双引号，字节才是单引号
var sms = [...]string{"a","b","x"} //可变参数

// 这个函数可以传入任意数量的整型参数
func sum(nums ...int) {
    fmt.Print(nums, " ")
    total := 0
    for _, num := range nums {
        total += num
    }
    fmt.Println(total)
}
func main() {
    // 支持可变长参数的函数调用方法和普通函数一样
    // 也支持只有一个参数的情况
    sum(1, 2)
    sum(1, 2, 3)
    // 如果你需要传入的参数在一个切片中，像下面一样
    // "func(slice...)"把切片打散传入
    nums := []int{1, 2, 3, 4}
    sum(nums...)
}
```

## 包：文件导入

Golang项目中，一次只应有一个main.go，但是所有文件都可以使用同一个包，即main。
- 只需要在使用它的文件中导入像fmt这样的外部包即可
- 如 main.go 和 greet.go
- 运行；go run greet.go main.go

```go
//-------- main.go ----------
package main

func main() {
    greet()
}
//--------greet.go----------
package main
import "fmt"

func greet() {
    fmt.Println("hello")
}
```


### 相对导入

【2022-1-19】

- 错误信息：
  - build command-line-arguments: cannot find module for path XXX
- 原因：
- 解决办法：参考[解法](https://blog.csdn.net/qq_43265072/article/details/120389784)
  - 执行：go env -w GO111MODULE=auto

src/add/add.go

```go
package add

func Add(a int ,b int) int {
	return a+b
}
```

文件：src/main.go

```go
package main
 
import (
	"fmt"
	"./add"
)
func main() {
	res := add.Add(10, 20)
	fmt.Println(res)
}
```

### go.mod导入

代码结构：

```yaml
- cfg
  - test.go
- go.mod
- main.go
```

包代码

```go
//test.go 
package cfg
import "fmt"

func Test() {
    fmt.Println("test")
}
```

主函数代码

```go
package main

import (
    "fmt"
    "demo/cfg" // 错误用法, demo包不存在
    //"app/cfg" // 正确用法, demo→app
)

func main() {
    cfg.Test()
    fmt.println("Hello")
}
```

- 错误信息：local import "./cfg" in non-local package
- 原因：命令 go mod init **app** 和代码 import "demo/cfg" 不对应
- 解决办法：包名保持一致，[详情](https://www.jianshu.com/p/246ffe580ebd)

运行：

```shell
go mod init app # 创建本地包app
go build # 编译
```

注意：
- **module名**和工程所在**文件夹名**无必然关联。

## 控制流
 
Go编程语言提供以下类型的决策语句。

| 语句| 描述| 
|---|---|
| if语句| if语句由布尔表达式后跟一个或多个语句组成。|
| if…else语句| if语句后面可以是一个可选的else语句，当布尔表达式为false时执行else语句。|
| 嵌套if语句| 可在另一个if或else if语句中使用一个if或else if语句。|
| switch语句| switch语句允许根据值列表测试变量的相等性。|
| select语句| select语句与switch语句类似，因为case语句指的是通道通信。|

循环控制语句：
- break、continue、goto

### for 循环

Go **只有**一种循环结构 —— for 循环。（while语句通过for实现）

基本的 for 循环包含三个由分号分开的组成部分：
- 初始化语句：在第一次循环执行前被执行
- 循环条件表达式：每轮迭代开始前被求值
  - 注意：<font color='red'>for循环部分没有()!</font>
- 后置语句：每轮迭代后被执行

初始化语句一般是一个短变量声明，这里声明的变量仅在整个 for 循环语句可见。如果条件表达式的值变为 false，那么迭代将终止。
- 注意：不像 C，Java，或者 Javascript 等其他语言，for 语句的三个组成部分并不需要用括号括起来，但循环体必须用{ }括起来。

```go
package main
import "fmt"

func main() {
    sum := 0
    for i := 0; i < 10; i++ {
         sum += i     
    }     
    for ; sum < 1000; {//前置和后置语句可以省略 
    //for sum < 1000 { //for是go语言里的while实现
    //for { //死循环！
         sum += sum     
    }
    fmt.Println(sum) 
}
```

### while（没有）

```go
// 用for循环实现while效果
for 6 > 5 {
    fmt.Println("hi")
}
// 简洁版
for {
    fmt.Println("hi")
}
```

### if 语句

就像 for 循环一样，Go 的 if 语句也不要求用 () 将条件括起来，同时，{}还是必须有的
- 跟 for 语句一样， if 语句可以在条件之前执行一个简单语句

```go
if x < 0 { 
    //if v := math.Pow(x, n); v < lim { //判断前增加一条语句,v的作用于尽在if-else中
    return sqrt(-x) + "i"     
} else {         
   fmt.Printf("%g >= %g\n", v, lim)     
}
//v变量此处失效
```

### switch 语句

从上至下，直至匹配成功才停止

```go
func main() {
    fmt.Print("Go runs on ")     
    //switch {//没有条件的 switch 同 switch true 一样,等效于if-then-else
    switch os := runtime.GOOS; os {     
        case "darwin": fmt.Println("OS X.")     
        case "linux":  fmt.Println("Linux.")     
        default:  fmt.Printf("%s.", os)     
    } 
}
```

注意：没有break！

## Defer栈

Go语言引入了Defer来确保那些被打开的文件能被关闭

Go的defer语句预设一个函数调用（延期的函数），该调用在函数执行defer返回时立刻运行。该方法显得不同常规，但却是处理上述情况很有效，无论函数怎样返回，都必须进行资源释放。[img](https://ask.qcloudimg.com/http-save/yehe-3346134/4hqkf6c9jv.jpeg?imageView2/2/w/1620)
- ![](https://ask.qcloudimg.com/http-save/yehe-3346134/4hqkf6c9jv.jpeg?imageView2/2/w/1620)
- [聊聊golang的defer](https://cloud.tencent.com/developer/article/1755347)

defer
- return先赋值(对于命名返回值)，然后执行defer，最后函数返回
- defer函数调用的执行顺序与它们分别所属的defer语句的执行顺序相反
- defer后面的表达式可以是func或者是method的调用，如果defer的函数为nil，则会panic

一个defer函数的示例：

```go
for i := 0; i < 5; i++ {  
    defer fmt.Printf("%d ", i) 
}
```

注意：<font color='red'>没有break！</font>

## 指针

类型 *T 是指向类型 T的值的指针, 零值是 nil 。不同于C，<font color='red'>go指针没有指针运算！</font>

```go
var p *int
i := 42 
p = &i // 取地址
fmt.Println(*p) // 通过指针 p 读取内容
i *p = 21         // 通过指针 p 设置 i
```

指针有很多但很简单的概念，它们对Go编程非常重要。

下面几个重要的指针概念，对于Go程序员应该要清楚：

|概念| 描述|
|---|---|
| [Go指针数组](http://www.yiibai.com/go/go_array_of_pointers.html)| 可以定义数组来保存一些指针|
| Go指针的**指针**| Go允许有指针指向指针等等|
| 传递指针到函数| 通过引用或地址传递参数都允许被调用函数在调用函数中更改传递的参数。|


## 结构体

一个`结构体`( struct )就是一个字段的**集合**。(而 type 的含义跟其字面意思相符。)
- Go的结构体和C基本上一样，不过在初始化时有些不一样，<font color='blue'>Go支持带名字的初始化</font>
- go中的struct可以实现oop中的类、方法——**面向对象编程**
- go语言中的struct成员可以是任何类型，如普通类型、复合类型、函数、struct、interface等。
 
### 结构体定义

```go
type Vertex struct {
    X int     
    Y int 
}

func main() {     
    fmt.Println(Vertex{1, 2}) //大括号！初始化
    v = Vertex{}
    fmt.Println(v.X)
    p := &v //结构体指针
    p.X = 19
    //结构体符文
    v1 = Vertex{1, 2}  // 类型为 Vertex     
    v2 = Vertex{X: 1}  // Y:0 被省略     
    v3 = Vertex{}      // X:0 和 Y:0     
    p  = &Vertex{1, 2} // 类型为 *Vertex
}
```
 
注意：
- Go语言中<font color='red'>没有public, protected, private的关键字</font>
- 让一个方法可以被别的包访问，需要把这个方法的**第一个字母大写**。这是一种约定。

```go
// 【2017-6-8】
type A struct {
    MemberA string
}
type B struct {
    A //展开结构体A的数值,没有类型
    MemberB string
}
```

### 结构体方法

go语言中的oop很另类，**类**在go里面叫做**receiver**，receiver可以是除了interface之外的任何类型。
- 方法和类并非组织在一起，传统的oop方法和类放在一个文件里面，而go语言只要在同一个包里就可，可分散在不同文件里。
- go的理念就是**数据**和**实现**分离

```go
type IntVector []int
 
func (v IntVector) Sum() (s int) {
    for _, x := range v {
        s += x
    }
    return
}
// reciever最好定义成指针的形式。对已非指针形式的reciever会自动转换成指针形式。如

func (u *User) Iter() {
    // …
}
u:=User{"liming",22}
u.Iter() //会转换成&User
 // 大写方法为public，小写为private
```

## defer栈

Go语言引入了Defer来确保那些被打开的文件能被关闭

Go的defer语句预设一个**函数调用**（**延期**的函数），该调用在函数执行defer返回时立刻运行。该方法显得不同常规，但却是处理上述情况很有效，无论函数怎样返回，都必须进行资源释放。

一个defer函数的示例：

```go
for i := 0; i < 5; i++ {  
    defer fmt.Printf("%d ", i) 
}
```

被延期的函数以**后进先出**（LIFO）的顺行执行，因此以上代码在返回时将打印：4 3 2 1 0

defer 语句会延迟函数的执行直到上层函数返回。
- 延迟调用的参数会立刻生成，但是在上层函数返回前函数都不会被调用
- 延迟的函数调用被压入一个`栈`中。当函数返回时， 会按照**后进先出**的顺序调用被延迟的函数调用。
 
```go
func main() {     
    fmt.Println("counting")      
    for i := 0; i < 10; i++ {  //defer会将后面的语句压栈
       defer fmt.Println(i)     
    } //输出9，8，7，。。。
    fmt.Println("done") 
}
```

## 一般接口

Golang's log模块主要提供了3类接口。分别是: `Print` 、`Panic` 、`Fatal`。当然是用前先包含log包。
- import( "log")

为了方便是用，Golang和Python一样，在提供接口时，提供一个简单的包级别的使用接口。不同于Python，其输出默认定位到标准错误 可以通过SetOutput 进行修改。
对每一类接口其提供了3中调用方式，分别是 "Xxxx 、 Xxxxln 、Xxxxf" 比如对于Print就有:
- log.Print, log.Printf, log.Println
- log.Print ：表示其参数的调用方式和 fmt.Print 是类似的，即输出对象而不用给定特别的标志符号。
- log.Printf ： 表示其参数的调用方式和 fmt.Printf 是类似的，即可以用C系列的格式化标志表示输出对象的类型，具体类型表示 可以参考fmt.Printf的文档
- log.Println： 表示其调用方式和fmt.Println 类似，其和log.Print基本一致，仅仅是在输出的时候多输出一个换行

更多[参考](http://gotaly.blog.51cto.com/8861157/1405754)

## 接口interface

Go编程提供了另一种称为`接口`(interfaces)的数据类型，它代表一组方法签名。struct数据类型实现这些接口以具有接口的方法签名的方法定义。
类似面向对象里的多态

```go
/* define an interface */
type Shape interface {   
   area() float64
}
/* define a circle */ 
type Circle struct {    
   x,y,radius float64 
}  
/* define a rectangle */ 
type Rectangle struct {    
   width, height float64 
}  
/* define a method for circle (implementation of Shape.area())*/ 
func(circle Circle) area() float64 {    
  return math.Pi * circle.radius * circle.radius 
}  
/* define a method for rectangle (implementation of Shape.area())*/ 
func(rect Rectangle) area() float64 {    
   return rect.width * rect.height 
}  
/* define a method for shape */ 
func getArea(shape Shape) float64 {    
   return shape.area() 
}
```

## 错误处理

Go编程提供了一个非常简单的错误处理框架，以及内置的错误接口类型

```go
func Sqrt(value float64)(float64, error) {    
    if(value < 0){ 
        return 0, errors.New("Math: negative number passed to Sqrt")    
    }    
    return math.Sqrt(value) 
}
```
 
## 内存分配new和make

Go具有两个分配内存的机制，分别是内建的函数`new`和`make`。他们所做的事不同，所应用到的类型也不同，这可能引起混淆，但规则却很简单。
- new 是一个**分配内存**的内建函数，但不同于其他语言中同名的new所作的工作，它只是将内存清零，而不是初始化内存。new(T)为一个类型为T的新项目分配了值为零的存储空间并返回其地址，也就是一个类型为*T的值。用Go的术语来说，就是它返回了一个指向新分配的类型为T的零值的指针。
- make(T, args)函数的目的与new(T)不同。它仅用于创建**切片、map和chan**（消息管道），并返回类型T（不是*T）的一个被初始化了的（不是零）实例。这种差别的出现是由于这三种类型实质上是对在使用前必须进行初始化的数据结构的引用。例如，切片是一个具有三项内容的描述符，包括指向数据（在一个数组内部）的指针、长度以及容量，在这三项内容被初始化之前，切片值为nil。对于切片、映射和信道，make初始化了其内部的数据结构并准备了将要使用的值

new不常使用

## go routine


### 高并发

目前比较主流的并发实现方式：

1. **多线程**：每个线程一次处理一个请求，线程越多可并发处理的请求数就越多，但是在高并发下，多线程开销会比较大。
2. **协程**：无需抢占式的调度，开销小，可以有效的提高线程的并发性，从而避免了线程的缺点的部分
3. 基于**异步回调**的IO模型
  - 比如nginx使用的就是epoll模型，通过事件驱动的方式与异步IO回调，使得服务器持续运转，来支撑高并发的请求

为了追求更高效和低开销的并发，golang的goroutine来了

### go routine 简介

goroutine的简介
- 定义：在go里面，每一个并发执行的**活动**成为goroutine。
- 详解：goroutine 是**轻量级**的**线程**，与创建线程相比，创建成本和开销都很小，每个goroutine的堆栈只有几kb，并且堆栈可根据程序的需要增长和缩小(线程的堆栈需指明和固定)，所以go程序从语言层面支持了**高并发**。
- 程序执行的背后：当一个程序启动的时候，只有一个goroutine来调用main函数，称它为**主goroutine**，新的goroutine通过**go语句**进行创建。

### go routine 使用

Go Routine主要是使用go关键字来调用函数，还可以使用匿名函数。可以把go关键字调用的函数想像成pthread_create，创建线程。

Go Routine可以使用**go关键字**来调用函数，还可以使用**匿名函数**。
- go关键字调用的函数想像成 pthread_create，<font color='blue'>创建线程。</font>
 
```go
package main
import "fmt"

func f(msg string) {
    fmt.Println(msg)
}
func main(){
    // （1）go关键词使用 go routine
    go f("goroutine")
    // （2）匿名函数调用 go routine
    go func(msg string) {
        fmt.Println(msg)
    }("going")
}
```

并发安全性
- goroutine有个特性，如果一个goroutine没有被阻塞，那么别的goroutine就不会得到执行。这并不是真正的并发，如果要真正并发，在main函数的第一行加上下面的这段代码：

```go
import "runtime"
runtime.GOMAXPROCS(4) // 真正的并发
```

以上代码存在并发安全性问题，需要上锁
- [参考地址](http://coolshell.cn/articles/8489.html)
- 【2022-8-25】[一看就懂系列之Golang的goroutine和通道](https://blog.csdn.net/u011957758/article/details/81159481)

#### 单个goroutine创建

在函数或者方法前面加上关键字go，即创建一个并发运行的新goroutine
- 注意：main函数返回时，所有的gourutine都是**暴力终结**的，然后程序退出。

```go
package main

import (
	"fmt"
	"time"
)

func HelloWorld() {
	fmt.Println("Hello world goroutine")
}

func main() {
	go HelloWorld() // 开启一个新的并发运行
	time.Sleep(1*time.Second) // 执行速度很快，一定要加sleep，不然你一定可以看到goroutine里头的输出
    // 匿名函数
    go func(msg string) {
        fmt.Println(msg)
    }("going")
    fmt.Println("我后面才输出来")
}
```

输出：
- Hello world goroutine
- 我后面才输出来

#### 多个goroutine创建

当程序执行go FUNC()的时候，只是简单的调用然后就立即返回了，并不关心函数里头发生的故事情节，所以不同的goroutine直接不影响，main会继续按顺序执行语句。
- DelayPrint里头有sleep，第二个goroutine并不会堵塞/等待


```go
package main

import (
	"fmt"
	"time"
)

func DelayPrint() {
	for i := 1; i <= 4; i++ {
		time.Sleep(250 * time.Millisecond)
		fmt.Println(i)
	}
}

func HelloWorld() {
	fmt.Println("Hello world goroutine")
}

func main() {
	go DelayPrint()    // 开启第一个goroutine
	go HelloWorld()    // 开启第二个goroutine
	time.Sleep(2*time.Second)
	fmt.Println("main function")
}
```

输出

```shell
Hello world goroutine
1
2
3
4
5
main function
```

### go routine 死锁

并发安全性
- goroutine有个特性，也就是说，如果一个goroutine没有被阻塞，那么别的goroutine就不会得到执行。这并不是真正的并发，如果你要真正的并发，你需要在你的main函数的第一行加上下面的这段代码：

```go
import "runtime"
...
runtime.GOMAXPROCS(4)
```

以上代码存在并发安全性问题，需要上锁
- [参考地址](http://coolshell.cn/articles/8489.html)

死锁现场

```go
// (1) 现场一
package main

func main() {
	ch := make(chan int)
	<- ch // 阻塞main goroutine, 通道被锁
}
// (2) 现场二
package main

func main() {
	cha, chb := make(chan int), make(chan int)
	go func() {
		cha <- 1 // cha通道的数据没有被其他goroutine读取走，堵塞当前goroutine
		chb <- 0
	}()
	<- chb // chb 等待数据的写
}
// (3) 例外
func main() {
    ch := make(chan int)
    go func() {
       ch <- 1
    }()
}
```

为什么会有死锁的产生？
- 非缓冲通道上如果发生了流入无流出，或者流出无流入，就会引起死锁。
- goroutine的非缓冲通道里头一定要一进一出，成对出现才行。

上面例子属于：
- (1) 流出无流入；
  - fatal error: all goroutines are asleep - deadlock!
- (2) 流入无流出
  - fatal error: all goroutines are asleep - deadlock!
- (3) 无报错，因为没有数据流入，不会被阻塞报错——goroutine还没执行完，main函数自己就跑完了

如何解决死锁？
1. 把没取走的取走便是
1. 创建缓冲通道

```go
package main

func main() {
	cha, chb := make(chan int), make(chan int)
	go func() {
		cha <- 1 // cha通道的数据没有被其他goroutine读取走，堵塞当前goroutine
		chb <- 0
	}()
	<- cha // 取走便是
	<- chb // chb 等待数据的写
}
```

```go
package main

func main() {
	cha, chb := make(chan int, 3), make(chan int)
	go func() {
		cha <- 1 // cha通道的数据没有被其他goroutine读取走，堵塞当前goroutine
		chb <- 0
	}()
	<- chb // chb 等待数据的写
}
```


## 通道channel (goroutine间通信机制)

### 什么是通道

如果说`goroutine`是Go并发的**执行体**，那么`通道`就是他们之间的**连接**。
- 通道: 让一个goroutine发送特定值到另外一个goroutine的**通信机制**
- goroutine1 -> chan -> goroutine2

通道是连接并发goroutine的`管道`。（`队列`，先进先出，非栈）
- 可以从一个goroutine向通道发送值，并在另一个goroutine中接收到这些值。
- 使用 make(chan val-type)创建一个**新通道**，通道由输入的值传入。
- 使用通道 <- 语法将值发送到通道

### 通道定义


```go
var ch chan int      // 声明一个传递int类型的channel
ch := make(chan int) // 使用内置函数make()定义一个channel
//=========
ch <- value          // 将一个数据value写入至channel，这会导致阻塞，直到有其他goroutine从这个channel中读取数据
value := <-ch        // 从channel中读取数据，如果channel之前没有写入数据，也会导致阻塞，直到channel中被写入数据为止
// 注意：阻塞是默认的channel的接收和发送，其实也有非阻塞的
//=========
close(ch)            // 关闭channel
```

### 通道种类

四种通道使用
1. `无缓冲通道`
  - 无缓冲通道上的发送操作将会被阻塞，直到另一个goroutine在对应的通道上执行接收操作，此时值才传送完成，两个goroutine都继续执行。
1. `管道`：通道可以用来连接goroutine，这样一个的输出是另一个输入。
  - goroutine1 -> chan -> goroutine2 -> chan -> goroutine3
1. `单向通道类型`
  - 当程序则够复杂的时候，为了代码可读性更高，拆分成一个一个的小函数是需要的。
  - go提供了单向通道的类型，来实现函数之间channel的传递。
1. `缓冲管道`
  - goroutine的通道默认是是阻塞的，那么有什么办法可以缓解阻塞？加一个缓冲区。

图解
- [The Nature Of Channels In Go](https://www.ardanlabs.com/blog/2014/02/the-nature-of-channels-in-go.html)
- ![](https://www.ardanlabs.com/images/goinggo/Screen+Shot+2014-02-16+at+10.10.54+AM.png)
- ![](https://www.ardanlabs.com/images/goinggo/Screen+Shot+2014-02-17+at+8.38.15+AM.png)

### 无缓冲通道

```go
package main

import (
	"fmt"
	"time"
)
var done chan bool

func HelloWorld() {
	fmt.Println("Hello world goroutine")
	time.Sleep(1*time.Second)
	done <- true
}
func main() {
	done = make(chan bool)  // 创建一个无缓冲channel
	go HelloWorld()
	<-done
}
```

示例：

```go
package main  
import "fmt" 

func main() {      
    // Create a new channel with `make(chan val-type)`.     
    // Channels are typed by the values they convey.     
    messages := make(chan string)//默认无缓冲，只能存储一个值
    // messages := make(chan string, 2) //设置缓冲，存储2个值（先进先出）
    // _Send_ a value into a channel using the `channel <-`     
    // syntax. Here we send `"ping"`  to the `messages`     
    // channel we made above, from a new goroutine.     
    go func() { messages <- "ping" }() //匿名函数 
    // The `<-channel` syntax _receives_ a value from the     
    // channel. Here we'll receive the `"ping"` message     
    // we sent above and print it out.     
    msg := <-messages     
    fmt.Println(msg) 
}
```

### 缓冲通道

goroutine的通道默认是是阻塞的，那么有什么办法可以缓解阻塞？
- 答案是：加一个**缓冲区**。

```go
ch := make(chan string, 3) // 创建了缓冲区为3的通道
len(ch)   // 长度计算
cap(ch)   // 容量计算
//=========
// Here we `make` a channel of strings buffering up to  2 values.     
messages := make(chan string, 2)      
// Because this channel is buffered, we can send these values into the channel without a corresponding concurrent receive.     
messages <- "buffered"     
messages <- "channel"      
// Later we can receive these two values as usual.     
fmt.Println(<-messages)     
fmt.Println(<-messages) //输出buffered、channel
```

### 管道

```go
package main

import (
	"fmt"
	"time"
)
var echo chan string
var receive chan string

// 定义goroutine 1 
func Echo() {
	time.Sleep(1*time.Second)
	echo <- "咖啡色的羊驼"
}

// 定义goroutine 2
func Receive() {
	temp := <- echo // 阻塞等待echo的通道的返回
	receive <- temp
}

func main() {
	echo = make(chan string)
	receive = make(chan string)
	go Echo()
	go Receive()
	getStr := <-receive   // 接收goroutine 2的返回
	fmt.Println(getStr)
}
```

不一定要去关闭channel，因为底层的垃圾回收机制会根据它是否可以访问来决定是否自动回收它

### 单向通道

```go
package main

import (
	"fmt"
	"time"
)
// 定义goroutine 1
func Echo(out chan<- string) {   // 定义输出通道类型
	time.Sleep(1*time.Second)
	out <- "咖啡色的羊驼"
	close(out)
}
// 定义goroutine 2
func Receive(out chan<- string, in <-chan string) { // 定义输出通道类型和输入类型
	temp := <-in // 阻塞等待echo的通道的返回
	out <- temp
	close(out)
}

func main() {
	echo := make(chan string)
	receive := make(chan string)

	go Echo(echo)
	go Receive(receive, echo)

	getStr := <-receive   // 接收goroutine 2的返回

	fmt.Println(getStr)
}
```


### 通道通信

类似信号量

```go
package main  
import "fmt" 
import "time"  

// This is the function we'll run in a goroutine. The `done` channel will be used to notify another goroutine that this function's work is done. 
func worker(done chan bool) {     
    fmt.Print("working...")     
    time.Sleep(time.Second)     
    fmt.Println("done")      
    // Send a value to notify that we're done.     
    done <- true 
}  
func main() {      
    // Start a worker goroutine, giving it the channel to   notify on.     
    done := make(chan bool, 1)     
    go worker(done)      
    // Block until we receive a notification from the  worker on the channel.        <-done 
}
```
 
### 通道路线

当使用通道作为函数参数时，可以指定通道是否仅用于发送或接收值。这种特殊性增加了程序的类型安全性。
 
### select多通道等待

Go语言的`选择`(select)可等待多个通道操作。将goroutine和channel与select结合是Go语言的一个强大功能。

定义：
- select功能与epoll(nginx)/poll/select的功能类似，都是坚挺IO操作，当IO操作发生的时候，触发相应的动作。

【2022-8-25】[一看就懂系列之Golang的goroutine和通道](https://blog.csdn.net/u011957758/article/details/81159481)

#### select用法

select有几个重要的点要强调：
1. 如果有多个case都可以运行，select会随机公平地选出一个执行，其他不会执行
2. case后面必须是channel操作，否则报错。
3. select中的default子句总是可运行的。所以没有default的select才会阻塞等待事件
4. 没有运行的case，那么将会阻塞事件发生报错(死锁)

```go
package main
import "fmt"

func main() {
	ch := make (chan int, 1)
	ch<-1 // 如果注释此句，会报错！没有输入 → 死锁报错
	select {
	case <-ch:
		fmt.Println("咖啡色的羊驼")
	case <-ch:
		fmt.Println("黄色的羊驼")
    //case 3: // case后面（3）非channel操作，报错！
	//	fmt.Println("黄色的羊驼")
    default: // default子句总是可运行的。没有default的select会阻塞等待事件
		fmt.Println("黄色的羊驼")
	}
}
// 输出：两种羊驼随机出现
```

#### select应用场景

select应用场景
1. timeout 机制(超时判断)
2. 判断channel是否阻塞(或者说channel是否已经满了)
3. 退出机制

（1）超时判断

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	timeout := make (chan bool, 1)
	go func() {
		time.Sleep(1*time.Second) // 休眠1s，如果超过1s还没I操作则认为超时，通知select已经超时啦～
		timeout <- true
	}()
	ch := make (chan int)
	select {
	case <- ch:
	case <- timeout:
		fmt.Println("超时啦!")
	}
}
```

正规版

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	ch := make (chan int)
	select {
	case <-ch:
	case <-time.After(time.Second * 1): // 利用time来实现，After代表多少时间后执行输出东西
		fmt.Println("超时啦!")
	}
}
```

（2）判断是否阻塞

```go
package main

import (
	"fmt"
)

func main() {
	ch := make (chan int, 1)  // 注意这里给的容量是1
	ch <- 1
	select {
	case ch <- 2:
	default:
		fmt.Println("通道channel已经满啦，塞不下东西了!")
	}
}
```

（3）退出机制

```go
package main

import (
	"fmt"
	"time"
)

func main() {
	i := 0
	ch := make(chan string, 0)
	defer func() {
		close(ch)
	}()

	go func() {
		DONE: 
		for {
			time.Sleep(1*time.Second)
			fmt.Println(time.Now().Unix())
			i++

			select {
			case m := <-ch:
				println(m)
				break DONE // 跳出 select 和 for 循环
			default:
			}
		}
	}()

	time.Sleep(time.Second * 4)
	ch<-"stop"
}
```


#### select死锁

select不注意也会发生死锁
1. 如果没有数据需要发送，select中又存在接收通道数据的语句，那么将发送死锁
1. 空select，也会引起死锁

```go
package main
// （1）没有数据要发送
func main() {  
    ch := make(chan string)
    select {
    case <-ch:
    }
}
// （2）空select
package main

func main() {  
    select {}
}

```


### 超时等待

超时对于连接到外部资源或在不需要绑定执行时间的程序很重要。在Go编程中由于使用了通道和选择(select),实现超时是容易和优雅的。

### 非阻塞通道

通道的基本发送和接收都阻塞。但是，可以使用select和default子句来实现非阻塞发送，接收，甚至非阻塞多路选择(select)。
 
### 关闭通道

关闭通道表示不会再发送更多值。这对于将完成通信到通道的接收器是很有用的。

在这个例子中，我们将使用一个作业通道来完成从main()goroutine到worker goroutine的工作。当没有更多的工作时，则将关闭工作通道。

 
### 范围通道

在前面的例子中，我们已经看到了for和range语句如何为基本数据结构提供迭代。还可以使用此语法对从通道接收的值进行迭代。
此范围在从队列接收到的每个元素上进行迭代。因为关闭了上面的通道，迭代在接收到2个元素后终止。




## Sync 用法

刚才看golang的sync的包，看见一个很有用的功能。就是WaitGroup。

WaitGroup的用途：它能够一直等到所有的goroutine执行完成，并且阻塞主线程的执行，直到所有的goroutine执行完成。

注意：执行结果是没有顺序的，调度器不能保证多个 goroutine 执行次序，且进程退出时不会等待它们结束。

WaitGroup总共有三个方法：Add(delta int),Done(),Wait()。简单的说一下这三个方法的作用。
- Add:添加或者减少等待goroutine的数量
- Done:相当于Add(-1)
- Wait:执行阻塞，直到所有的WaitGroup数量变成0
如：

```go
package main

import ( 
    "fmt" 
    "sync" 
    "time"
) 

func main() { 
    var wg sync.WaitGroup  
    for i := 0; i > 5; i = i + 1 { 
        wg.Add(1) 
        go func(n int) { 
            // defer wg.Done(),注意这个Done的位置，是另一个函数 
            defer wg.Add(-1) 
            EchoNumber(n) 
        }(i) 
    }  
    wg.Wait()
} 

func EchoNumber(i int) { 
    time.Sleep(3e9) 
    fmt.Println(i)
}
```

golang中的同步是通过sync.WaitGroup来实现的．WaitGroup的功能：
- 实现了一个类似队列的结构，可以一直向队列中添加任务，当任务完成后便从队列中删除，如果队列中的任务没有完全完成，可以通过Wait()函数来出发阻塞，防止程序继续进行，直到所有的队列任务都完成为止．
- WaitGroup的特点是Wait()可以用来阻塞直到队列中的所有任务都完成时才解除阻塞，而不需要sleep一个固定的时间来等待．但是其缺点是无法指定固定的goroutine数目．但是其缺点是无法指定固定的goroutine数目．可能通过使用channel解决此问题。

另一个例子：

```go
package main 
import ( 
    "fmt" 
    "sync"
) 
//声明一个全局变量
var waitgroup sync.WaitGroup 
func Afunction(shownum int) { 
    fmt.Println(shownum) 
    waitgroup.Done() //任务完成，将任务队列中的任务数量-1，其实.Done就是.Add(-1)
} 
func main() { 
    for i := 0; i < 10; i++ { 
        waitgroup.Add(1) //每创建一个goroutine，就把任务队列中任务的数量+1 
        go Afunction(i) 
    } 
    waitgroup.Wait() //.Wait()这里会发生阻塞，直到队列中所有的任务结束就会解除阻塞
}
```

## 面向对象

面向对象特征
- 封装，是面向对象方法的重要原则，就是把对象的属性和操作（或服务）结合为一个独立的整体，并尽可能隐藏对象的内部实现细节。
- 继承是指这样一种能力：它可以使用现有类的所有功能，并在无需重新编写原来的类的情况下对这些功能进行扩展。
- 多态性（polymorphisn）是允许你将父对象设置成为和一个或更多的他的子对象相等的技术，赋值之后，父对象就可以根据当前赋值给它的子对象的特性以不同的方式运作

【2022-8-12】[详解go面向对象](https://blog.csdn.net/qq_38378384/article/details/123322069)

### go 是面向对象语言吗

官方回答：是也不是
- go是明显允许面向对象的编程风格的，但同时又缺乏一些Java和C++中的常见类型或者说是关键字。
- Go的interface也和Java中的用法十分不同, 官方觉得这一套挺好的，更加的容易使用且通用性更强。大多数情况下我们都是使用OOP 的思想来组织 go 项目的，但是如果你要完全按照 Java 这种思想去思考 go，会发现十分的别扭。

### go 如何实现面向对象

GO没有 class、extend 怎么才能实现面向对象呢？
- go以结构体的方式去定义一个所谓的类，将相关的方法绑定在这个结构体上，作为一个整体的集合, 也就是类。

#### 结构体

```go
type Person struct {
	name string
	age int32
}
// 类实例化的两种方式
p1 := new(Persion)
p2 := &Person{
	name : "MClink"
	age : 25
}
p3 := &Person{}
p4 := &Person{"MClink", 25}
var p5  Person{}
```

- p1 和 p3 的效果是一样的，但是分配的内存大小是不同，类的属性在不主动初始化赋值的情况下都是默认的**零值**。
  - 字符串的零值是 “”， int32 的零值是 0。
- p2 、p4 则是在实例化的同时，对属性也做了相应的赋值。

所谓的**类**实际上是一种**类型**。因此 new 函数实际上的形参是一种类型，而不是值，返回的是这个类型的零值的指针。


### 方法

- go 种的方法实际上是依附于某个**类**（结构体类型，或者说是接收者）的 func。
- go 的 func 是支持**多返回值**的，十分特别的。以前，如果要返回多个返回值，一般通过使用数组或者集合的方式进行返回。
- 两个方法的接收者有点不同，一个是 p *T ，一个是 p T，分别称之为 **指针方法**和**值方法**
- 指针方法集合包含了值方法的集合；如果返回值需要改动，就用指针方法。

```go
// 指针方法
func (p *Person) GetName(name string) error {
	p.name = name 
	return nil
}
// 值方法
func (p Person) SetName() (string, error) {
	return p.name, nil
}
```

### 继承

Go 语言没有 public、protected、private 三种范围修饰词；
- Go 使用组合的方式来实现继承
- 组合方式，让一些公共的部分单独抽离出来，像搭积木那样，将多个积木进行组合，达到自己所需的功能集合。组合内外如果出现名字重复问题，只会访问到最外层，内层会被隐藏，不会报错，即类似java中方法覆盖/重写。

```go
type Person struct {
	name string
	age int32
}

func (p *Person) GetName(name string) error {
	p.name = name 
	return nil
}

func (p Person) SetName() (string, error) {
	return p.name, nil
}

type Man struct {
	Person // 继承了Person类的所有方法和成员属性
	phone string
}

type WoMan struct {
	*Person // 以指针继承了 Person类的所有方法和成员属性
	phone string
}
```

### 接口

Go 保留了**接口**。接口的作用主要是将定义与实现分离，降低耦合度。

接口是一堆方法的集合，定义了对象的一组行为，主要是用来规范行为的。
- 其他语言的接口实现是**显式**的，一般使用 implement 显式实现。
- 而Go是隐式的，只要实现了 接口内的所有方法，便是继承了这个接口。

```go
func (p *Man) Say() string {
	return ""
}

func (p *Man) Eat(something string) error {
	fmt.Print("man eat " +  something)
	return nil
}

func (w *WoMan) Say() string {
	return ""
}

func (w *WoMan) Eat(something string) error {
	fmt.Print("woman eat " +  something)
	return nil
}

type ManI interface {
	Say() string
	Eat(something string) error
}

var mi ManI = new(Man)
mi.Say()
var mi2 ManI = new（Woman)
mi2.Eat("好吃的")
```

Man 类就实现了 ManI 接口。只要类实现了该接口的所有方法，即可将该类赋值给这个接口，接口主要用于多态化方法。即对接口定义的方法，不同的实现方式。

接口赋值

```go
// 接口赋值
func Call (mi ManI) {
    mi.Eat("牛肉粿条")
}

var mi ManI
t := "woman"
switch t {
case "woman":
    mi = new(Woman)
case "man":
    mi = new(Man)
}
Call(mi)
```

也可以将一个接口赋值给另一个接口，需要满足以下的条件
- 两个接口拥有相同的方法列表（与次序无关），即使是两个相同的接口，也可以相互赋值
- 接口赋值只需要接口A的方法列表是接口B的子集（即假设接口A中定义的所有方法，都在接口B中有定义），那么B接口的实例可以赋值给A的对象。反之不成立。

```go
type ManI interface {
	Say() string
	Eat(something string) error
}

type ManI2 interface {
	Say() string
}

func (p *Man) Say() string {
	return ""
}

func (p *Man) Eat(something string) error {
	return nil
}
var mi ManI
var mi2 ManI2
mi = mi2 // 会报错
mi2 = mi // 可以

```

接口的判断
- 可以使用类型断言的方式，判断一个接口类型是否实现了某个接口。

```go
func (p *Man) Say() string {
	return ""
}

func (p *Man) Eat(something string) error {
	return nil
}

type Man struct {
	Person // 继承了 Person类的所有方法
	phone  string
}

type ManI interface {
	Say() string
	Eat(something string) error
}

func main() {
	var mi ManI = &Man{
  		Person: Person{},
  		phone:  "",
	 }
	if _, ok := mi.(*Man); ok {
		fmt.Print("true") //结果是true
	} else {
		fmt.Println("false")
	}
	return
}
```

接口的组合
- 接口和类型一样，也是可以组合的。几个小接口可以组合成一个大接口

```go
type Human interface {
	ManI
	WoManI
}

type ManI interface {
	Say() string
	Eat(something string) error
}

type WoManI interface {
	Born() error
}
```

万能的黑洞
- 空接口 interface{} 是一个没有方法的接口，因此任何类型都是他的实现，当你的参数无法确定类型时，interface{} 就是一个很好的容器。

### oop实例

```go
package main

import "fmt"

// 定义接口
type Human interface {
	Say(string)
	Eat(string)
}

// 定义类
type Man struct {
}
// 实例化方法，一般是 New+类名作为实例化的方法
func NewMan() *Man {
 return &Man{}
}
// 实现Human接口的Say
func (m *Man) Say(something string) {
	fmt.Println(something)
}
// 实现Human接口的Eat
func (m *Man) Eat(something string) {
	fmt.Println(something)
}

// 定义员工类，其中包含 Human 接口的值
type employees struct {
	man Human
}
// 实现实例化方法
func newEmployees() *employees {
 return &employees{
		man: NewMan(), // 实现该类型的接口值可以赋值该类型的对象
	}
}

func main() {
 // 获取员工类实例化对象
 emp := newEmployees()
 // 通过员工类中包含的 Human 接口值间接调用 Man 类的 Say 方法
 emp.man.Say("EAT")
}
```

## 设计模式

[go设计模式实践](https://lailin.xyz/post/go-design-pattern.html)
- [代码仓库](https://github.com/mohuishou/go-design-pattern)

### 设计原则

SOLID设计原则
- ![](https://img.lailin.xyz/image/1612154616603-6328f638-0536-407e-afdf-7f2b33a97f91.jpeg)

### go设计模式

Go 设计模式
- 单例模式包含饿汉式和懒汉式两种实现
- 工厂模式包含简单工厂、工厂方法、抽象工厂、DI 容器
- 代理模式包含静态代理、动态代理（采用 go generate 模拟）
- 观察者模式包含观察者模式、eventbus

汇总: [img](https://img.lailin.xyz/image/1612154618733-bb131bea-bf76-4244-bb78-8bed8bfdddf1.jpeg)
- ![](https://img.lailin.xyz/image/1612154618733-bb131bea-bf76-4244-bb78-8bed8bfdddf1.jpeg)

|  **类型**  |   **设计模式（Github）**   | **常用** |     **博客**      |
| :--------: | :----------------------: | :------: | :--------------: |
| **创建型** |       [单例模式(Singleton Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/01_singleton)       |    ✅     |            [Go设计模式01-单例模式](https://lailin.xyz/post/singleton.html)            |
|            |         [工厂模式(Factory Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/02_factory)         |    ✅     |         [Go设计模式02-工厂模式&DI容器](https://lailin.xyz/post/factory.html)          |
|            |        [建造者模式(Builder Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/03_builder)        |    ✅     |            [Go设计模式03-建造者模式](https://lailin.xyz/post/builder.html)            |
|            |       [原型模式(Prototype Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/04_prototype)       |    ❌     |            [Go设计模式04-原型模式](https://lailin.xyz/post/prototype.html)            |
| **结构型** |           [代理模式(Proxy Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/05_proxy)           |    ✅     | [Go设计模式06-代理模式(generate实现类似动态代理)](https://lailin.xyz/post/proxy.html) |
|            |          [桥接模式(Bridge Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/06_bridge)          |    ✅     |             [Go设计模式07-桥接模式](https://lailin.xyz/post/bridge.html)              |
|            |      [装饰器模式(Decorator Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/07_decorator)      |    ✅     |           [Go设计模式08-装饰器模式](https://lailin.xyz/post/decorator.html)           |
|            |        [适配器模式(Adapter Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/08_adapter)        |    ✅     |            [Go设计模式09-适配器模式](https://lailin.xyz/post/adapter.html)            |
|            |          [门面模式(Facade Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/09_facade)          |    ❌     |             [Go设计模式10-门面模式](https://lailin.xyz/post/facade.html)              |
|            |       [组合模式(Composite Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/10_composite)       |    ❌     |            [Go设计模式11-组合模式](https://lailin.xyz/post/composite.html)            |
|            |       [享元模式(Flyweight Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/11_flyweight)       |    ❌     |            [Go设计模式12-享元模式](https://lailin.xyz/post/flyweight.html)            |
| **行为型** |       [观察者模式(Observer Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/12_observer)       |    ✅     | [Go设计模式13-观察者模式(实现简单的EventBus)](https://lailin.xyz/post/observer.html)  |
|            |    [模板模式(Template Method Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/13_template)     |    ✅     |            [Go模板模式14-模板模式](https://lailin.xyz/post/template.html)             |
|            |    [策略模式(Strategy Method Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/14_strategy)     |    ✅     |            [Go设计模式15-策略模式](https://lailin.xyz/post/strategy.html)             |
|            | [职责链模式(Chain Of Responsibility Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/15_chain) |    ✅     |    [Go设计模式16-职责链模式(Gin的中间件实现)](https://lailin.xyz/post/chain.html)     |
|            |           [状态模式(State Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/16_state)           |    ✅     |              [Go设计模式17-状态模式](https://lailin.xyz/post/state.html)              |
|            |       [迭代器模式(Iterator Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/17_iterator)       |    ✅     |           [Go设计模式18-迭代器模式](https://lailin.xyz/post/iterator.html)            |
|            |  [访问者模式(Visitor Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/18_visitor/visitor.go)   |    ❌     |            [Go设计模式19-访问者模式](https://lailin.xyz/post/visitor.html)            |
|            |        [备忘录模式(Memento Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/19_memento)        |    ❌     |            [Go设计模式20-备忘录模式](https://lailin.xyz/post/memento.html)            |
|            |         [命令模式(Command Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/20_command)         |    ❌     |             [Go设计模式21-命令模式](https://lailin.xyz/post/command.html)             |
|            |    [解释器模式(Interpreter Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/21_interpreter)    |    ❌     |          [Go设计模式22-解释器模式](https://lailin.xyz/post/interpreter.html)          |
|            |        [中介模式(Mediator Design Pattern)](https://github.com/mohuishou/go-design-pattern/blob/master/22_mediator)        |    ❌     |            [Go设计模式23-中介模式](https://lailin.xyz/post/mediator.html)             |

# 专项功能

## 命令行参数

```go
package main
 
import (
    "flag"
    "fmt"
    "os"
)
//先编译 go build -o args.exe args_test.go
//执行 args.exe -name ..
func main() {
    // ----- 第一种 ------
    //获取命令行参数
    //fmt.Print(os.Args)
    for i,v := range os.Args{
        fmt.Print(i,v)
    }
     
    //------ 第二种 ------
    //自定义命令行参数
    //定义参数
    //String代表获取的参数类型为字符串，参数的名字为-name，值默认为空，usage为提示
    namePtr := flag.String("name", "", "姓名")
    agePtr := flag.Int("age",18,"年龄")
    rmbPtr := flag.Float64("rmb",10000,"资产")
    alivePtr := flag.Bool("alive",true,"是否健在")
 
    //解析获取参数，丢入参数的指针中
    flag.Parse()
    fmt.Print(*namePtr,*agePtr,*rmbPtr,*alivePtr)
 
    //------ 第三种 ------
    //var name *string 这里在栈里面占了名字，但是没有分配内存空间，所以没有地址
    //  //flag.StringVar(name,"name", "", "姓名")
    var name string//这里是有地址的
    var age int
    var rmb float64
    var alive bool
    flag.StringVar(&name,"name", "", "姓名")
    flag.IntVar(&age,"age",18,"年龄")
    flag.Float64Var(&rmb,"rmb",10000,"资产")
    flag.BoolVar(&alive,"alive",true,"是否健在")
    flag.Parse()
    fmt.Print(name,age,rmb,alive)
}
```

## os库

```go
package main
 
import (
    "fmt"
    "os"
)
 
func main(){
    //获得当前工作目录：默认当前工程目录
    dir,err := os.Getwd()
    fmt.Print(dir)
    fmt.Print(err)
 
    //获得指定环境变量
    //paths := os.Getenv(key:"Path")
    //goroot := os.Getenv(key:"GOROOT")
    //fmt.Print(paths)
    //fmt.Print(goroot)
 
 
    //修改文件访问时间和修改时间
    //err2 := os.Chtimes(
    //  name:"",
    //  time.Now().AddDate(years:-1,months:0,days:0)
    //  )
 
    //获得所有环境变量
    envs := os.Environ()
    for _,env :=  range envs{
        fmt.Print(env)
    }
 
    //在网络中的主机名
    hostname,err := os.Hostname()
    if err == nil {
        fmt.Print(hostname)
    }else {
        fmt.Print("出错了")
    }
 
    //获得系统的临时文件夹路径：临时数据的保存路径
    fmt.Print(os.TempDir())
 
    //判断某字符是否路径分隔符
    fmt.Print("//是路径分隔符吗？",os.IsPathSeparator('\\'))
    //fmt.Print("\\是路径分隔符吗？",os.IsPathSeparator(c:'\'))
    fmt.Print("$是路径分隔符吗？",os.IsPathSeparator('\\'))
 
    //fmt.Print(os.IsPathSeparator(c:'\\'))
    //fmt.Print(os.IsPathSeparator(c:'$'))
 
    //获得文件信息
    fileInfo,err := os.Stat("C:/users/...")
    if err == nil {
        fmt.Print(fileInfo)
    }else {
        fmt.Print("出错了")
    }
}
```

## 时间处理

时间戳 
- 当前时间戳
  - fmt.Println(time.Now().Unix())  # 1389058332
- str**格式化**时间
  - 当前格式化时间
  - fmt.Println(time.Now().Format("2006-01-02 15:04:05"))  // 这是个奇葩,必须是这个时间点, 据说是go诞生之日, 记忆方法:6-1-2-3-4-5 # 2014-01-07 09:42:20
- **时间戳**转str**格式化**时间
  - str_time := time.Unix(1389058332, 0).Format("2006-01-02 15:04:05")
  - fmt.Println(str_time) # 2014-01-07 09:32:12
- str**格式化**时间转**时间戳**
  - the_time := time.Date(2014, 1, 7, 5, 50, 4, 0, time.Local)
  - unix_time := the_time.Unix()
  - fmt.Println(unix_time) # 389045004
- 还有一种方法,使用time.Parse

```go
the_time, err := time.Parse("2006-01-02 15:04:05", "2014-01-08 09:04:41")
if err == nil {
        unix_time := the_time.Unix()
	fmt.Println(unix_time)		
}
// 1389171881
```

time库使用

```go
package main

import (
"time"
"fmt"
)
 
func main(){
    //本地时间
    nowTime := time.Now()
    //年月日
    year := nowTime.Year(); fmt.Printf("%s",year)
    month := nowTime.Month(); fmt.Printf("%s",month)
    y,m,d := nowTime.Date(); fmt.Printf("%d:%d:%d",y,m,d)
    //周月年中的第几天
    day := nowTime.Day(); fmt.Printf("%d",day)
    yearDay := nowTime.YearDay(); fmt.Printf("%d",yearDay)
    weekDay := nowTime.Weekday(); fmt.Printf("%d",weekDay)
    //时分秒
    fmt.Printf("%s",nowTime.Hour())
    fmt.Printf("%s",nowTime.Minute())
    fmt.Printf("%s",nowTime.Second())
    fmt.Printf("%s",nowTime.Nanosecond())
    //创建时间
    date := time.Date(2019,time.September,8,15,0,0,0,time.Now().Location()); fmt.Printf("%s",date)
    //Add方法和Sub方法是相反的
    //获取t0和t1的时间距离d是使用Sub
    //将t0加d获取t1就是使用Add方法
    now := time.Now()
    //一天之前
    duration,_ := time.ParseDuration("-24h0m0s"); fmt.Printf("%s",now.Add(duration))
    //一周之前
    fmt.Printf("%s",now.Add(duration * 7))
    //一月之前
    fmt.Printf("%s",now.Add(duration * 30))
    //计算时间差
    fmt.Printf("%s",now.Sub(now.Add(duration)))
}
```


```go
// 01: 获取当前时间
dateTime := time.Now()
fmt.Println(dateTime)
// 02: 获取年 月 日 时 分 秒 纳秒
year := time.Now().Year() //年
fmt.Println(year)
month := time.Now().Month() //月
fmt.Println(month)
day := time.Now().Day() //日
fmt.Println(day)
hour := time.Now().Hour() //小时
fmt.Println(hour)
minute := time.Now().Minute() //分钟
fmt.Println(minute)
second := time.Now().Second() //秒
fmt.Println(second)
nanosecond := time.Now().Nanosecond() //纳秒
fmt.Println(nanosecond)
// 03: 获取当前时间戳
timeUnix := time.Now().Unix()         //单位秒
timeUnixNano := time.Now().UnixNano() //单位纳秒
fmt.Println(timeUnix)
fmt.Println(timeUnixNano)
// 04: 将时间戳格式化
fmt.Println(time.Now().Format("2006-01-02 15:04:05"))
// 05: 时间戳转为go格式的时间
var timeUnix int64 = 1562555859
fmt.Println(time.Unix(timeUnix,0))
// 之后可以用Format 比如
fmt.Println(time.Unix(timeUnix, 0).Format("2006-01-02 15:04:05"))
// 06: str格式化时间转时间戳
t := time.Date(2014, 1, 7, 5, 50, 4, 0, time.Local).Unix()
fmt.Println(t)
// 时间的计算
// 01: 获取今天0点0时0分的时间戳
currentTime := time.Now()
startTime := time.Date(currentTime.Year(), currentTime.Month(), currentTime.Day(), 0, 0, 0, 0, currentTime.Location())
fmt.Println(startTime)
fmt.Println(startTime.Format("2006/01/02 15:04:05"))
// 02: 获取今天23:59:59秒的时间戳
currentTime := time.Now()
endTime := time.Date(currentTime.Year(), currentTime.Month(), currentTime.Day(), 23, 59, 59, 0, currentTime.Location())
fmt.Println(endTime)
fmt.Println(endTime.Format("2006/01/02 15:04:05"))
// 03: 获取1分钟之前的时间
m, _ := time.ParseDuration("-1m")
result := currentTime.Add(m)
fmt.Println(result)
fmt.Println(result.Format("2006/01/02 15:04:05"))
// 04: 获取1小时之前的时间
m, _ := time.ParseDuration("-1h")
result := currentTime.Add(m)
fmt.Println(result)
fmt.Println(result.Format("2006/01/02 15:04:05"))
// 05: 获取1分钟之后的时间
m, _ := time.ParseDuration("1m")
result := currentTime.Add(m)
fmt.Println(result)
fmt.Println(result.Format("2006/01/02 15:04:05"))
// 06: 获取1小时之后的时间
m, _ := time.ParseDuration("1h")
result := currentTime.Add(m)
fmt.Println(result)
fmt.Println(result.Format("2006/01/02 15:04:05"))
// 07 :计算两个时间戳
afterTime, _ := time.ParseDuration("1h")
result := currentTime.Add(afterTime)
beforeTime, _ := time.ParseDuration("-1h")
result2 := currentTime.Add(beforeTime)
m := result.Sub(result2)
fmt.Printf("%v 分钟 \n", m.Minutes())
h := result.Sub(result2)
fmt.Printf("%v小时 \n", h.Hours())
d := result.Sub(result2)
fmt.Printf("%v 天\n", d.Hours()/24)
// 08: 判断一个时间是否在一个时间之后
stringTime, _ := time.Parse("2006-01-02 15:04:05", "2019-12-12 12:00:00")
beforeOrAfter := stringTime.After(time.Now())
if true == beforeOrAfter {
    fmt.Println("2019-12-12 12:00:00在当前时间之后!")
} else {
    fmt.Println("2019-12-12 12:00:00在当前时间之前!")
}
// 09: 判断一个时间相比另外一个时间过去了多久
startTime := time.Now()
time.Sleep(time.Second * 5)
fmt.Println("离现在过去了：", time.Since(startTime))
```

## 正则表达式（regexp）

代码示例

```go
package main
import "bytes"
import "fmt"
import "regexp"
func main() {

    match, _ := regexp.MatchString("p([a-z]+)ch", "peach")//是否匹配（每次运行都得编译，慢）
    fmt.Println(match)
    r, _ := regexp.Compile("p([a-z]+)ch")
    fmt.Println(r.MatchString("peach"))//先用 Compile 优化，再匹配 Regexp 结构体
    fmt.Println(r.FindString("peach punch"))//查找匹配字符串
    fmt.Println(r.FindStringIndex("peach punch"))//查找第一次匹配，但返回开始和结束位置索引，非匹配的内容
    fmt.Println(r.FindStringSubmatch("peach punch"))//返回完全匹配和局部匹配的字符串。返回 p([a-z]+)ch 和 `([a-z]+) 的信息。
    fmt.Println(r.FindStringSubmatchIndex("peach punch"))//类似的，返回完全匹配和局部匹配的索引位置。
    fmt.Println(r.FindAllString("peach punch pinch", -1))//带 All 的这个函数返回所有的匹配项
    fmt.Println(r.FindAllStringSubmatchIndex("peach punch pinch", -1))//All 同样可以对应到上面的所有函数。
    fmt.Println(r.FindAllString("peach punch pinch", 2))//这个函数提供一个正整数来限制匹配次数。
//上面的例子中，我们使用了字符串作为参数，并使用了如 MatchString 这样的方法。我们也可以提供 []byte参数并将 String 从函数命中去掉。
    fmt.Println(r.Match([]byte("peach")))
//创建正则表示式常量时，可以使用 Compile 的变体MustCompile 。因为 Compile 返回两个值，不能用语常量。
    r = regexp.MustCompile("p([a-z]+)ch")
    fmt.Println(r)
    fmt.Println(r.ReplaceAllString("a peach", "<fruit>"))//regexp 包也可以用来替换部分字符串为其他值。
    in := []byte("a peach")
    out := r.ReplaceAllFunc(in, bytes.ToUpper)//Func变量允许传递匹配内容到一个给定的函数中，
    fmt.Println(string(out))
}
```

## go与json

Go内置了对JSON数据的**编码**和**解码**，这些数据的类型包括内置数据类型和自定义数据类型。
内置的encoding/json反序列化方法：《[go语言json简洁](http://cizixs.com/2016/12/19/golang-json-guide)》
- struct：需要提前知道json内容格式
- interface：未限定格式，任意动态的内容都可以解析成 interface，但缺点是必须自己做类型转换
- 延迟解析：json.RawMessage
- 自定义解析

```go
package main
import "fmt"
import "encoding/json"

type Student struct {
   Name string   `json:"name"`
   Age  int      `json:"age"`
   Data []string `json:"data"`
}

func main() {
   jsonString := `{"name":"张三","age":20,"data":["男","未婚"]}`
   // 指定解析格式
   var stu Student
   // 不指定格式
   // m := make(map[string]interface{}, 4)
   err := json.Unmarshal([]byte(jsonString), &stu)
   if err!= nil {
      fmt.Println(err)
      return
   }
   fmt.Println(stu)
}

```

simplejson工具

```go
package main
import "encoding/json"
import "fmt"
import "os"

//  我们使用两个结构体来演示自定义数据类型的JSON数据编码和解码。
type Response1 struct {
    Page   int
    Fruits []string
}
// 【2022-10-11】json里的变量名(page)要加双引号！
type Response2 struct {
    Page   int      `json:"page"`
    Fruits []string `json:"fruits"`
} //golang json里的struct变量首字母需要大写的，如果json是小写咋办？在type后面跟着别名就可以了，格式是 json:"字段名"
// http://xiaorui.cc/2016/03/06/golang%E8%A7%A3%E6%9E%90%E5%88%9B%E5%BB%BA%E5%A4%8D%E6%9D%82%E5%B5%8C%E5%A5%97%E7%9A%84json%E6%95%B0%E6%8D%AE/

func main() {

    // 首先我们看一下将基础数据类型编码为JSON数据
    bolB, _ := json.Marshal(true);fmt.Println(string(bolB))//true
    intB, _ := json.Marshal(1);fmt.Println(string(intB)) //1
    fltB, _ := json.Marshal(2.34);fmt.Println(string(fltB)) //2.34
    strB, _ := json.Marshal("gopher");fmt.Println(string(strB)) //gopher

    // 这里是将切片和字典编码为JSON数组或对象
    slcD := []string{"apple", "peach", "pear"}
    slcB, _ := json.Marshal(slcD);fmt.Println(string(slcB))//["apple","peach","pear"]

    mapD := map[string]int{"apple": 5, "lettuce": 7}
    mapB, _ := json.Marshal(mapD);fmt.Println(string(mapB)) // {"apple":5,"lettuce":7}

    // JSON包可以自动地编码自定义数据类型。结果将只包括自定义类型中的可导出成员的值并且默认情况下，这些成员名称都作为JSON数据的键
    res1D := &Response1{
        Page:   1,
        Fruits: []string{"apple", "peach", "pear"}}
    res1B, _ := json.Marshal(res1D)
    fmt.Println(string(res1B))//{"Page":1,"Fruits":["apple","peach","pear"]}

    // 你可以使用tag来自定义编码后JSON键的名称
    res2D := &Response2{
        Page:   1,
        Fruits: []string{"apple", "peach", "pear"}}
    res2B, _ := json.Marshal(res2D)
    fmt.Println(string(res2B))//{"page":1,"fruits":["apple","peach","pear"]}

    // 现在我们看看解码JSON数据为Go数值
    byt := []byte(`{"num":6.13,"strs":["a","b"]}`)
    // 我们需要提供一个变量来存储解码后的JSON数据，这里的`map[string]interface{}`将以Key-Value的方式保存解码后的数据，Value可以为任意数据类型
    var dat map[string]interface{}
    // 解码过程，并检测相关可能存在的错误
    if err := json.Unmarshal(byt, &dat); err != nil {
        panic(err)
    }
    fmt.Println(dat)//map[num:6.13 strs:[a b]]
    // 为了使用解码后map里面的数据，我们需要将Value转换为它们合适的类型，例如我们将这里的num转换为期望的float64
    num := dat["num"].(float64)
    fmt.Println(num) // 6.13
    // 访问嵌套的数据需要一些类型转换
    strs := dat["strs"].([]interface{})
    str1 := strs[0].(string)
    fmt.Println(str1) //a
    // 我们还可以将JSON解码为自定义数据类型，这有个好处是可以为我们的程序增加额外的类型安全并且不用再在访问数据的时候进行类型断言
    str := `{"page": 1, "fruits": ["apple", "peach"]}`
    res := &Response2{}
    json.Unmarshal([]byte(str), &res)
    fmt.Println(res)//&{1 [apple peach]}
    fmt.Println(res.Fruits[0])//apple

    // 上面的例子中，我们使用bytes和strings来进行原始数据和JSON数据之间的转换，我们也可以直接将JSON编码的数据流写入`os.Writer`或者是HTTP请求回复数据。
    enc := json.NewEncoder(os.Stdout)
    d := map[string]int{"apple": 5, "lettuce": 7}
    enc.Encode(d) //{"apple":5,"lettuce":7}
}
```

运行结果
- 6.13
- a
- apple

## 打日志-log使用

### 官方log包

Golang的标准库提供了log的机制，但是该模块的功能较为简单（看似简单，其实他有他的设计思路）。不过比手写fmt. Printxxx还是强很多的。至少在输出的位置做了线程安全的保护。其官方手册见Golang log (天朝的墙大家懂的)。

log包定义了Logger类型，该类型提供了一些格式化输出的方法。

```go
type Logger struct {
    mu     sync.Mutex // ensures atomic writes; protects the following fields
    prefix string     // prefix on each line to identify the logger (but see Lmsgprefix)
    flag   int        // properties
    out    io.Writer  // destination for output
    buf    []byte     // for accumulating text to write
}
```

- mu属性主要是为了确保原子操作
- prefix设置每一行的前缀
- flag设置输出的各种属性，比如时间、行号、文件路径等。
- out输出的方向，用于把日志存储文件。

一个简单使用的例子：

```go
package main
import ( 
    "log"
)
func main(){
    log.Print("常规日志输出，相当于 info \n")
    log.Println("常规日志输出，相当于 info（不用换行）")
    v := "优雅的"
    log.Printf("这是一个%s日志\n", v)
    log.Panic("日志输出，相当于 warning \n")
    log.Panicln("日志输出，相当于 warning \n")
    log.Fatal("错误日志输出，相当于 fatal \n")
    log.Fatalln("错误日志输出，相当于 fatal \n")
}
```

编译运行后，会看到程序打印了 Come with fatal,exit with 1 然后就退出了，如果用 echo $? 查看退出码，会发现是 “1”。

### 优化log包

[Golang中log日志包的使用](https://blog.csdn.net/MrKorbin/article/details/110422715)

基于官方的log包，封装出自己的log日志包
- 获取当前事件
- 对 Logger实例进行加锁操作
- 判断Logger的标志位是否包含 Lshortfile 或 Llongfile,　如果包含进入步骤4, 如果不包含进入步骤5
- 获取当前函数调用所在的文件和行号信息
- 格式化数据，并将数据写入到 l.out 中，完成输出
- 解锁操作

```go
// logger.go
package logger

import (
	"io"
	"log"
	"os"
)
const (
	flag           = log.Ldate | log.Ltime | log.Lshortfile
	preDebug       = "[DEBUG]"
	preInfo        = "[INFO]"
	preWarning     = "[WARNING]"
	preError       = "[ERROR]"
)
var (
	logFile       io.Writer
	debugLogger   *log.Logger
	infoLogger    *log.Logger
	warningLogger *log.Logger
	errorLogger   *log.Logger
	defaultLogFile = "/var/log/web.log"
)
func init() {
	var err error
	logFile, err = os.OpenFile(defaultLogFile, os.O_CREATE|os.O_APPEND|os.O_RDWR, 0666)
	if err != nil {
		defaultLogFile = "./web.log"
		logFile, err = os.OpenFile(defaultLogFile, os.O_CREATE|os.O_APPEND|os.O_RDWR, 0666)
		if err != nil {
			log.Fatalf("create log file err %+v", err)
		}
	}
	debugLogger = log.New(logFile, preDebug, flag)
	infoLogger = log.New(logFile, preInfo, flag)
	warningLogger = log.New(logFile, preWarning, flag)
	errorLogger = log.New(logFile, preError, flag)
}

func Debugf(format string, v ...interface{}) {
	debugLogger.Printf(format, v...)
}

func Infof(format string, v ...interface{}) {
	infoLogger.Printf(format, v...)
}

func Warningf(format string, v ...interface{}) {
	warningLogger.Printf(format, v...)
}

func Errorf(format string, v ...interface{}) {
	errorLogger.Printf(format, v...)
}

func SetOutputPath(path string) {
	var err error
	logFile, err = os.OpenFile(path, os.O_CREATE|os.O_APPEND|os.O_RDWR, 0666)
	if err != nil {
		log.Fatalf("create log file err %+v", err)
	}
	debugLogger.SetOutput(logFile)
	infoLogger.SetOutput(logFile)
	warningLogger.SetOutput(logFile)
	errorLogger.SetOutput(logFile)
}
```

调用logger包

```go
package main
import "yourPath/logger"

func main() {
	author := "korbin"
	logger.Debugf("hello,%s",author)
	logger.Infof("hello,%s",author)
	logger.Warningf("hello,%s",author)
	logger.Errorf("hello,%s",author)
}
/*
[DEBUG]2020/12/01 11:33:07 logger.go:43: hello,korbin
[INFO]2020/12/01 11:33:07 logger.go:47: hello,korbin
[WARNING]2020/12/01 11:33:07 logger.go:51: hello,korbin
[ERROR]2020/12/01 11:33:07 logger.go:55: hello,korbin
*/
```

## 文件读写

两种方案

```go
package main

import (
    "bufio" //这是什么包？
    "fmt"
    "io"
    "io/ioutil"
    "os"
)

// Reading files requires checking most calls for errors.This helper will streamline our error checks below.
func check(e error) {
    if e != nil {
        panic(e)
    }
}

func main() {
    // Perhaps the most basic file reading task is slurping（咕噜咕噜的喝） a file's entire contents into memory.
    dat, err := ioutil.ReadFile("/tmp/dat") //一次性加载到内存
    check(err)
    fmt.Print(string(dat))
    // You'll often want more control over how and what parts of a file are read. For these tasks, start by `Open`ing a file to obtain an `os.File` value.
    f, err := os.Open("/tmp/dat") //
    check(err)
    // Read some bytes from the beginning of the file. Allow up to 5 to be read but also note how many actually were read.
    b1 := make([]byte, 5)
    n1, err := f.Read(b1) //读一部分内容
    check(err)
    fmt.Printf("%d bytes: %s\n", n1, string(b1))
    // You can also `Seek` to a known location in the file and `Read` from there.
    o2, err := f.Seek(6, 0) //自定义开始点
    check(err)
    b2 := make([]byte, 2)
    n2, err := f.Read(b2)
    check(err)
    fmt.Printf("%d bytes @ %d: %s\n", n2, o2, string(b2))
    // The `io` package provides some functions that may be helpful for file reading. For example, reads like the ones above can be more robustly implemented with `ReadAtLeast`.
    o3, err := f.Seek(6, 0)
    check(err)
    b3 := make([]byte, 2)
    n3, err := io.ReadAtLeast(f, b3, 2)
    check(err)
    fmt.Printf("%d bytes @ %d: %s\n", n3, o3, string(b3))
    // There is no built-in rewind, but `Seek(0, 0)` accomplishes this.
    _, err = f.Seek(0, 0)
    check(err)
    // The `bufio` package implements a buffered reader that may be useful both for its efficiency with many small reads and because of the additional reading methods it provides.
    r4 := bufio.NewReader(f)
    b4, err := r4.Peek(5)
    check(err)
    fmt.Printf("5 bytes: %s\n", string(b4)
    // Close the file when you're done (usually this would be scheduled immediately after `Open`ing with `defer`).
    f.Close()
//开始写文件部分
    // To start, here's how to dump a string (or just bytes) into a file.
    d1 := []byte("hello\ngo\n")
    err := ioutil.WriteFile("dat1.txt", d1, 0644)//一次性写文件
    check(err)
    // For more granular（粒状，精细） writes, open a file for writing.
    f, err := os.Create("dat2.txt")
    check(err)
    // It's idiomatic（惯用的） to defer a `Close` immediately after opening a file.
    defer f.Close()
    // You can `Write` byte slices as you'd expect.
    d2 := []byte{115, 111, 109, 101, 10}
    n2, err := f.Write(d2)
    check(err)
    fmt.Printf("wrote %d bytes\n", n2)
    // A `WriteString` is also available.
    n3, err := f.WriteString("writes\n")
    fmt.Printf("wrote %d bytes\n", n3)
    // Issue a `Sync` to flush writes to stable storage.
    f.Sync()
    // `bufio` provides buffered writers in addition to the buffered readers we saw earlier.
    w := bufio.NewWriter(f)
    n4, err := w.WriteString("buffered\n")
    fmt.Printf("wrote %d bytes\n", n4)
    // Use `Flush` to ensure all buffered operations have been applied to the underlying writer.
    w.Flush()
//追加
f, err := os.OpenFile(fileName, os.O_WRONLY|os.O_APPEND, 0666)
}
```

## 定时器

在将来的某个时间点执行Go代码，或者在某个时间间隔重复执行。 Go的内置计时器和自动接收器功能使这两项任务变得容易。

定时器代表未来的一个事件。可告诉定时器您想要等待多长时间，它提供了一个通道，在当将通知时执行对应程序

```go
package main
import "time"
import "fmt"

func main() {
    // Timers represent a single event in the future. You tell the timer how long you want to wait, and it provides a channel that will be notified at that time. This timer will wait 2 seconds.
    timer1 := time.NewTimer(time.Second * 2)
    // The `<-timer1.C` blocks on the timer's channel `C` until it sends a value indicating that the timer expired.
    <-timer1.C  //<-timer1.C阻塞定时器的通道C，直到它发送一个指示定时器超时的值。如果只是想等待，可以使用time.Sleep。定时器可能起作用的一个原因是在定时器到期之前取消定时器
    fmt.Println("Timer 1 expired")
    // If you just wanted to wait, you could have used `time.Sleep`. One reason a timer may be useful is that you can cancel the timer before it expires.Here's an example of that.
    timer2 := time.NewTimer(time.Second)
    go func() {
        <-timer2.C
        fmt.Println("Timer 2 expired")
    }()
    stop2 := timer2.Stop() //提前取消计时器
    if stop2 {
        fmt.Println("Timer 2 stopped")
    }
t := time.Tick(10)//
<- t // 
}
```

## socket编程

系统调用

执行命令行

用标准输入输出

命令行参数：用os.Args，像python的getops一样

## 随机数

[go获取随机数](http://www.tuicool.com/articles/ZVrmQjr)

```go
package main

import (
	"fmt"
	"math/rand"
)

func main() {
// 根据时间设置随机数种子
    	rand.Seed(int64(time.Now().Nanosecond()))
	// 获取随机整数
	for i := 0; i < 5; i++ {
		fmt.Printf("%v ", rand.Int())
	}
	fmt.Println()

	// 获取随机的32位整数
	for i := 0; i < 5; i++ {
		fmt.Printf("%v ", rand.Int31())
	}
	fmt.Println()

	// 获取指定范围内的随机数
	for i := 0; i < 5; i ++ {
		fmt.Printf("%v ", rand.Intn(10))
	}
	fmt.Println()

	// 获取浮点型数[0.0, 1.0)之间
	for i := 0; i < 5; i ++ {
		fmt.Printf("%v ", rand.Float32())
	}
	fmt.Println()
}
//获取两个数字之间的数字
func RandInt64(min,max int64) int64{
    maxBigInt:=big.NewInt(max)
    i,_:=rand.Int(rand.Reader,maxBigInt)
    if i.Int64()<min{
        RandInt64(min,max)    
    }
    return i.Int64()
}
//产生不重复的随机数
//rand库的Perm方法可以返回[0,n)直接的随机数
```


## 单元测试

【2017-07-13】新功能引入旧策略bug（回归测试）

Go语言似乎是个偏执狂，牺牲了不必要的灵活性，带来一些强制的编程风格和约定。比如：
- 无任何形式的Makefile，模块就是目录、包就是目录、编译配制就是目录！
- 不光目录被用上了，文件名还能指定用途。文件名后缀为_test.go的都是单元测试文件，_linux32.go就是32位linux特定的代码。
- 不光文件名被用上了，函数名还有特定用途。
  - 在单元测试文件中，测试函数以Test开头。
  - 以大写字母开头的变量、类型和函数是外部可见的，小写字母开头的变量、类型和函数是外部不可见的。
类似的约定也不好说是go语言首创，在一些文件格式中也有类似规范。但是我暂时不知道到有什么其它编程语言对编程风格这么带强制性。

## Go Test

Go语言通过testing包提供**自动化测试**功能。包内测试只要运行命令 go test，就能自动运行符合规则的测试函数。

Go语言测试约定规则
1. 一般测试func TestXxx(*testing.T)
  - 测试行必须Test开头，Xxx为字符串，第一个X必须大写的\[A-Z]的字幕
  - 为了测试方法和被测试方法的可读性，一般Xxx为被测试方法的函数名。
2. 性能测试func BenchmarkXxx(*testing.B)
  - 性能测试用Benchmark标记，Xxx同上。
3. 测试文件名约定
  - go语言测试文件名约定规则是必须以_test.go结尾，放在相同包下，为了方便代码阅读，一般go源码文件加上_test
  - 比如源文件my.go 那么测试文件如果交your_test.go,her_test.go,my_test.go都可以，不过最好的还是my_test.go，方便阅读

举例，源文件my.go

```go
package my

func add(x, y int) int {  
    return x + y  
}
```

创建一个my_test.go文件，需要引入testing

```go
package my  
import "testing"  
  
func TestAdd(t *testing.T) {  
    if add(1, 2) != 3 {  
        t.Error("test foo:Addr failed")  
    } else {  
        t.Log("test foo:Addr pass")  
    }  
}  
func BenchmarkAdd(b *testing.B) {  
    // 如果需要初始化，比较耗时的操作可以这样：  
    // b.StopTimer()  
    // .... 一堆操作  
    // b.StartTimer()  
    for i := 0; i < b.N; i++ {  
        add(1, 2)  
    }  
}  
```

运行测试 go test，输出：
- PASS
- ok github.com/my 0.010s

要运行性能测试，执行命令
- go test -test.bench=".*"

输出
- PASS
- BenchmarkAdd 2000000000 0.72 ns/op
- ok github.com/my 1.528s

## 图片

### 动图生成

[Go生成gif图片](https://books.studygolang.com/gopl-zh/ch1/ch1-04.html)

![](https://books.studygolang.com/gopl-zh/images/ch1-01.png)

- go build gopl.io/ch1/lissajous
- ./lissajous >out.gif

```go
// Lissajous generates GIF animations of random Lissajous figures.
package main

import (
    "image"
    "image/color"
    "image/gif"
    "io"
    "math"
    "math/rand"
    "os"
    "time"
)

var palette = []color.Color{color.White, color.Black}

const (
    whiteIndex = 0 // first color in palette
    blackIndex = 1 // next color in palette
)

func main() {
    // The sequence of images is deterministic unless we seed
    // the pseudo-random number generator using the current time.
    // Thanks to Randall McPherson for pointing out the omission.
    rand.Seed(time.Now().UTC().UnixNano())
    lissajous(os.Stdout)
}

func lissajous(out io.Writer) {
    const (
        cycles  = 5     // number of complete x oscillator revolutions
        res     = 0.001 // angular resolution
        size    = 100   // image canvas covers [-size..+size]
        nframes = 64    // number of animation frames
        delay   = 8     // delay between frames in 10ms units
    )

    freq := rand.Float64() * 3.0 // relative frequency of y oscillator
    anim := gif.GIF{LoopCount: nframes}
    phase := 0.0 // phase difference
    for i := 0; i < nframes; i++ {
        rect := image.Rect(0, 0, 2*size+1, 2*size+1)
        img := image.NewPaletted(rect, palette)
        for t := 0.0; t < cycles*2*math.Pi; t += res {
            x := math.Sin(t)
            y := math.Sin(t*freq + phase)
            img.SetColorIndex(size+int(x*size+0.5), size+int(y*size+0.5),
                blackIndex)
        }
        phase += 0.1
        anim.Delay = append(anim.Delay, delay)
        anim.Image = append(anim.Image, img)
    }
    gif.EncodeAll(out, &anim) // NOTE: ignoring encoding errors
}
```


## Web服务

### 浏览原理

浏览器访问过程
- 浏览器本身是一个**客户端**，当你输入 URL 的时候，首先浏览器会去请求 **DNS 服务器**，通过 DNS 获取相应的域名对应的 **IP**
- 然后通过 IP 地址找到 IP 对应的**服务器**后，要求建立 **TCP 连接**，等浏览器发送完 HTTP Request（请求）包后，服务器接收到请求包之后才开始处理请求包，服务器调用自身服务，返回 HTTP Response（响应）包；
- 客户端收到来自服务器的响应后开始渲染这个 Response 包里的主体（body），等收到全部的内容随后断开与该服务器之间的 TCP 连接。
- ![](https://cdn.learnku.com/build-web-application-with-golang/images/3.1.web2.png?raw=true)

Web 服务器的工作原理可以简单地归纳为：
- 客户机通过 TCP/IP 协议建立到服务器的 TCP 连接
- 客户端向服务器发送 HTTP 协议请求包，请求服务器里的资源文档
- 服务器向客户机发送 HTTP 协议应答包，如果请求的资源包含有动态语言的内容，那么服务器会调用动态语言的解释引擎负责处理 “动态内容”，并将处理得到的数据返回给客户端
- 客户机与服务器断开。由客户端解释 HTML 文档，在客户端屏幕上渲染图形结果

### Web 框架

Go 提供的 net/http库 对于HTTP协议实现非常好，基于此再构造框架会更容易，因此生态中出现了很多框架。

常见的web框架
- Echo，[教程](http://echo.topgoer.com/)
- Beego，[教程](https://www.topgoer.com/beego%E6%A1%86%E6%9E%B6/)
- Gin，[教程](https://www.topgoer.com/gin%E6%A1%86%E6%9E%B6/)
- Revel，教程
- Chi，教程
- Iris，[教程](https://www.topgoer.com/Iris/%E5%85%B3%E4%BA%8E.html)

<div class="mermaid">
    flowchart LR
    classDef red fill:#f02;
    classDef green fill:#5CF77B;
    classDef blue fill:#6BE0F7;
    classDef orange fill:#F7CF6B;
    classDef grass fill:#C8D64B;

    O(web框架) -->|Go自带| A[net/http]:::grass
    A -->|国际,无session,ORM,日志| B(Gin):::blue
    A -->|国内,无测试框架,路由冲突| C(Beego):::blue
    A -->|国际,无日志,ORM| D(Iris):::blue
    A --> E(Echo)
    A --> F(Revel)
    A --> F1(Fasthttp)
    A --> G(Buffalo)
    A -->|国内,模块化| GF(GoFrame):::green
    B -->|2016,字节| G1(Ginex) -->|2020,微服务,2022开源| H(Hertz):::orange
    B -->|2016,rpc框架| Kite -->|2020,微服务,2021开源| KiteX:::orange
    E & F1 -- 借鉴 --> H
</div>


#### 主流框架对比

【2019-10-14】
- [Golang六款优秀Web框架对比](https://www.51cto.com/article/604248.html)
- [Golang框架选型比较: goframe, beego, iris和gin](https://goframe.org/pages/viewpage.action?pageId=3673375), 最终采用 GoFrame，但性能不如 gin

六款Web框架
- 从流行度、社区支持及内建功能等角度对六款知名Go语言Web框架做对比。

|框架|代码|流行度（stars）|简介|优点|缺点|
|---|---|---|---|---|---|
|[Gin](https://gin-gonic.github.io/gin)|[gin](https://github.com/gin-gonic/gin)|24181|Go语言编写的HTTP Web框架，它以更好的性能实现了类似Martini的API，性能更好|||
|[Beego](https://beego.me)|[beego](https://github.com/astaxie/beego)|18812|面向Go编程语言的开源高性能web框架|||
|[Iris](https://iris-go.com)|[iris](https://github.com/kataras/iris)|13565|全宇宙最快的Go语言Web框架，完备MVC支持，拥抱未来|||
|[Echo](https://echo.labstack.com)|[echo](https://github.com/labstack/echo)|12861|高性能、极简Go语言Web框架|||
|[Revel](https://revel.github.io) | [revel](https://github.com/revel/revel) |10723|Go语言的高效、全栈Web框架 |||
|[Buffalo](https://gobuffalo.io)|[buffalo](https://github.com/gobuffalo/buffalo)|3935|使用Go语言快速构建Web应用|||

Web框架核心功能对比 [img](https://s1.51cto.com/oss/201910/14/ea751b3b6f5c3c20b9e896912eadd9b3.jpg)
- ![](https://s1.51cto.com/oss/201910/14/ea751b3b6f5c3c20b9e896912eadd9b3.jpg)

几个知名的Go语言Web框架(Echo、Gin和Buffalo)由于没有完备支持所有功能，并不能算是真正意义上的Web框架，但大部分go社区认为是，因此，将这几个框架也列在表格中可以和Iris、Beego、Revel做比较。
- 以上这些框架，除了Beego和Revel之外，都可以适配任意 net/http中间件，其中一部分框架可以轻松地做适配，另外一些可能就需要额外的努力
- 目测goframe类似django，Gin类似flask。

### net/http （原生）

#### 简介

Go 语言里面提供了一个完善的 `net/http` 包，通过 http 包可以很方便的就搭建起来一个可以运行的 Web 服务。同时使用这个包能很简单地对 Web 的路由，静态文件，模版，cookie 等数据进行设置和操作。
- net/http涵盖了HTTP客户端和服务端具体的实现方式。内置的net/http包提供了最简洁的HTTP客户端实现方式，无须借助第三方网络通信库，就可以直接使用HTTP中用得最多的GET和POST方式请求数据。

#### 使用方法

(1) HTTP协议客户端实现

- request请求：含GET/POST
  - http.NewRequest()
- GET方法
  - client.Get()
  - http.Get()
- POST方法
  - client.Post() 或 client.PostForm()
  - http.Post() 或 http.PostForm()
  - http的Post()函数或PostForm()，就是对DefaultClient.Post()或DefaultClient.PostForm()的封装

(2) HTTP协议服务端实现

HTTP服务器主要应完成如下功能
- ① 处理动态请求：处理浏览网站，登录帐户或发布图片等用户传入的请求。
  - 用 http.HandleFunc 函数注册一个新的 Handler 来处理动态请求。
    - 第一个参数是请求路径的匹配模式
    - 第二个参数是一个函数类型，表示针对这个请求要执行的功能。
- ② 提供静态文件：将JavaScript，CSS和图像等静态文件提供给浏览器，服务于用户。
  - http.FileServer() 方法提供 Javascript，CSS或图片等静态文件。
  - 参数是文件系统接口，可以使用http.Dir()来指定文件所在的路径。如果该路径中有index.html文件，则会优先显示html文件，否则会显示文件目录。
- ③ 接受连接请求：HTTP服务器必须监听指定端口从而接收来自网络的连接请求。
  - http.ListenAndServer()函数用来启动HTTP服务器，并且在指定的 IP 地址和端口上监听客户端请求
- ④ 获取客户端数据
  - 客户端提交的数据全部位于 *http.Request 中


```go
package main

import (
	"fmt"
	"net/http"
)

func main() {
	testHttpNewRequest()
    // 处理动态请求
    http.HandleFunc("/", func (w http.ResponseWriter, r *http.Request) {
        fmt.Fprint(w, "Welcome to my website!")
    })
    // 提供静态文件
    fs := http.FileServer(http.Dir("static/")) // 返回值是 Handler 类型
    http.Handle("/static/", http.StripPrefix("/static/", fs)) // 添加路由
    // 接收请求，两个参数：监听地址、HTTP处理器 Handler
    http.ListenAndServe(":80", nil)
}

func testHttpNewRequest() {
	//1.创建一个客户端
	client := http.Client{}
	//2. 创建一个请求，请求方式可以是GET或POST
	request, err := http.NewRequest("GET", "http://www.baidu.com", nil)
	checkErr(err)
    // 或调用http/client.Get方法
    response, err := http.Get("http://www.baidu.com")
    response, err := client.Get("http://www.baidu.com")
    checkErr(err)
    fmt.Printf("响应状态码: %v\n", response.StatusCode)
    if response.StatusCode == 200 {
		fmt.Println("网络请求成功")
		defer response.Body.Close()
	}
    // 或调用client.Post 方法
    resp, err := http.Post("http://example.com/upload", "image/jpeg", &buf)
    // 或调用client.PostForm 方法
    resp, err := http.PostForm("http://example.com/form",
	url.Values{"key": {"Value"}, "id": {"123"}})
	//3.客户端发送请求
	cookName := &http.Cookie{Name: "username", Value: "Steven"}
	//添加cookie
	request.AddCookie(cookName)
	response, err := client.Do(request)
	checkErr(err)
	//设置请求头
	request.Header.Set("Accept-Lanauage", "zh-cn")
	defer response.Body.Close()
	//查看请求头的数据
	fmt.Printf("Header:%+v\n", request.Header)
	fmt.Printf("响应状态码: %v\n", response.StatusCode)
	//4.操作数据
	if response.StatusCode == 200 {
		fmt.Println("网络请求成功")
		checkErr(err)
	} else {
		fmt.Println("网络请求失败", response.Status)
	}
}

//检查错误
func checkErr(err error) {
	defer func() {
		if ins, ok := recover().(error); ok {
			fmt.Println("程序出现异常: ", ins.Error())
		}
	}()
	if err != nil {
		panic(err)
	}
}
```

详见：[Golang启动HTTP服务器](https://shuzang.github.io/2020/golang-start-http-server/)



#### 代码示例

【2022-7-28】启动web服务

```go
// web_test.go
package main

import (
    "fmt"
    "net/http"
    "strings"
    "log"
    "sync"
)

var mu sync.Mutex // 互斥锁
var count int // 全局变量

func sayhello(w http.ResponseWriter, r *http.Request) {
    r.ParseForm()  // 解析参数，默认是不会解析的
    fmt.Print("path: ", r.URL.Path, "\tscheme: ", r.URL.Scheme, "\turl_long: ", r.Form["url_long"])
    // 读取表单
    for k, v := range r.Form {
        fmt.Println("key: ", k, "\tval: ", strings.Join(v, ""))
    }
    // 读取Header
    for name, headers := range req.Header {
        for _, h := range headers {
            fmt.Fprintf(w, "%v: %v\n", name, h)
        }
    }
    // 输出信息到客户端: Fprintf
    fmt.Fprintf(w, "Hello astaxie!") // 这个写入到 w 的是输出到客户端的
}

type indexHandler struct {
    content string
}

func counter(w http.ResponseWriter, r *http.Request) {
    mu.Lock()
    fmt.Fprintf(w, "Count %d\n", count)
    mu.Unlock()
}

func main() {
    // 注册路由: Handle, HandleFunc这两个函数最终都由 DefaultServeMux 调用 Handle 方法来完成路由的注册
    // 区别：Handle直接返回结构体信息，不用经过自定义函数
    http.Handle("/", &indexHandler{content: "hello world!"}) // 直接返回内容
    http.HandleFunc("/", sayhello) // 设置访问的路由
    http.HandleFunc("/count", counter) // 另一个路由
    err := http.ListenAndServe(":9090", nil) // 设置监听的端口
    if err != nil {
        log.Fatal("ListenAndServe: ", err)
    }
    // 更新全局变量
    mu.Lock()
    count++
    mu.Unlock()

}
```

过程
- go build web_test.go
- ./web_test
- 或直接运行：
  - go run web_test.go &
- 浏览器访问：http://localhost:9090，页面显示：Hello astaxie!
- 换一个地址：http://localhost:9090/?url_long=111&url_long=222，浏览器显示输入的参数

注：
- PHP 程序员也许就会问，nginx、apache 服务器不需要吗？—— Go 就是不需要这些，因为直接就监听 tcp 端口了，做了 nginx 做的事情，然后 sayhelloName 这个其实就是我们写的逻辑函数了，跟 php 里面的控制层（controller）函数类似。
- Python 程序员，会觉得跟 tornado 代码很像—— 没错，Go 就是拥有类似 Python 这样动态语言的特性，写 Web 应用很方便。
- Ruby 程序员会发现和 ROR 的 /script/server 启动有点类似。

### http包原理

服务器端的几个概念
- Request：用户请求的信息，用来解析用户的请求信息，包括 post、get、cookie、url 等信息
- Response：服务器需要反馈给客户端的信息
- Conn：用户的每次请求链接
- Handler：处理请求和生成返回信息的处理逻辑

工作模式流程图
- ![](https://cdn.learnku.com/build-web-application-with-golang/images/3.3.http.png)

http 包执行流程
- 创建 Listen Socket, 监听指定的端口，等待客户端请求到来。
- Listen Socket 接受客户端的请求，得到 Client Socket, 接下来通过 Client Socket 与客户端通信。
- 处理客户端的请求，首先从 Client Socket 读取 HTTP 请求的协议头，如果是 POST 方法，还可能要读取客户端提交的数据，然后交给相应的 handler 处理请求，handler 处理完毕准备好客户端需要的数据，通过 Client Socket 写给客户端。

基于 HTTP 构建的网络应用包括两个端，即`客户端` ( Client ) 和`服务端` ( Server )。
- 两个端的交互行为包括从客户端发出 request、服务端接受 request 进行处理并返回 response 以及客户端处理 response。
- http 服务器的工作就在于如何接受来自客户端的 request，并向客户端返回 response。

典型的 http 服务端的处理流程：
- 服务器在接收到请求时，首先会进入路由 ( router )，这是一个 Multiplexer，路由的工作在于为这个 request 找到对应的处理器 ( handler )
- 处理器对 request 进行处理，并构建 response。
- Golang 实现的 http server 同样遵循这样的处理流程。


问题
- 如何监听端口？
- 如何接收客户端请求？
- 如何分配 handler？

Go 是通过一个函数 ListenAndServe 来处理这些事情的，这个底层其实这样处理的：
- 初始化一个 server 对象，然后调用了 net.Listen("tcp", addr)，也就是底层用 TCP 协议搭建了一个服务，然后监控我们设置的端口。

源码

```go
// 处理接收客户端的请求信息
func (srv *Server) Serve(l net.Listener) error {
    defer l.Close()
    var tempDelay time.Duration // how long to sleep on accept failure
    // 循环接受 Listener 请求
    for {
        rw, e := l.Accept()
        if e != nil {
            if ne, ok := e.(net.Error); ok && ne.Temporary() {
                if tempDelay == 0 {
                    tempDelay = 5 * time.Millisecond
                } else {
                    tempDelay *= 2
                }
                if max := 1 * time.Second; tempDelay > max {
                    tempDelay = max
                }
                log.Printf("http: Accept error: %v; retrying in %v", e, tempDelay)
                time.Sleep(tempDelay)
                continue
            }
            return e
        }
        tempDelay = 0
        c, err := srv.newConn(rw)
        if err != nil {
            continue
        }
        go c.serve()
    }
}
```

![](https://cdn.learnku.com/build-web-application-with-golang/images/3.3.illustrator.png?raw=true)

Go 的 http 有两个核心功能：Conn、ServeMux

### http/template 模板引擎

【2022-9-22】[Go语言标准库之http/template](https://www.liwenzhou.com/posts/Go/go_template/)

html/template包实现了**数据驱动**的模板，用于生成可防止代码注入的安全的HTML内容。它提供了和text/template包相同的接口，Go语言中输出HTML的场景都应使用html/template这个包
- 模板：事先定义好的HTML文档文件
- 模板渲染机制：文本替换操作–使用相应的数据去替换HTML文档中事先准备好的标记。
- 类似Python语言中Flask框架中使用的jinja2模板引擎。

Go语言内置文本模板引擎 **text**/template 和 用于HTML文档的 **html**/template。

text/template与html/tempalte的区别
- html/template针对的是需要返回HTML内容的场景，在模板渲染过程中会对一些有风险的内容进行转义，以此来防范跨站脚本攻击。

作用机制归纳如下：
- 模板文件通常定义为 .tmpl 和 .tpl 为后缀（也可以使用其他的后缀），必须使用UTF8编码。
- 模板文件中使用\{\{和\}\}包裹和标识需要传入的数据。
- 传给模板这样的数据就可以通过点号（.）来访问，如果数据是复杂类型的数据，可以通过{ \{ .FieldName \}}来访问它的字段。
- 除\{\{和\}\}包裹的内容外，其他内容均不做修改原样输出。

#### 模板引擎组成

Go语言模板引擎的使用可以分为三部分：
- **定义**模板文件: 按照相关语法规则去编写
- **解析**模板文件: 常用方法去解析模板文件，得到模板对象
  - func (t \*Template) <span style='color:blue'>Parse</span>(src string) (*Template, error)
  - func <span style='color:blue'>ParseFiles</span>(filenames ...string) (*Template, error)
  - func <span style='color:blue'>ParseGlob</span>(pattern string) (*Template, error)
  - 用func <span style='color:blue'>New</span>(name string) *Template函数创建一个名为name的模板
- 模板**渲染**: 用数据去填充模板，当然实际上可能会复杂很多
  - func (t *Template) <span style='color:blue'>Execute</span>(wr io.Writer, data interface{}) error
  - func (t *Template) <span style='color:blue'>ExecuteTemplate</span>(wr io.Writer, name string, data interface{}) error

#### 模板引擎示例

Go模板语法定义一个 hello.tmpl 的模板文件
- 模板语法都包含在双大括号中，其中的.表示当前对象
- 传入结构体对象时，可以根据.来访问结构体的对应字段

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Hello</title>
</head>
<body>
    <p>Hello \{\{.\}\}</p>
    <p>Hello \{\{.Name\}\}</p>
    <p>性别：\{\{.Gender\}\}</p>
    <p>年龄：\{\{.Age\}\}</p>
    <img src="https://go.dev/images/gophers/motorcycle.svg" width=400>
</body>
</html>
```

HTTP server端代码: main.go

```go
type UserInfo struct {
	Name   string
	Gender string
	Age    int
}

func sayHello(w http.ResponseWriter, r *http.Request) {
	// 解析指定文件生成模板对象
	tmpl, err := template.ParseFiles("./hello.tmpl")
	if err != nil {
		fmt.Println("create template failed, err:", err)
		return
	}
    user := UserInfo{
		Name:   "小王子",
		Gender: "男",
		Age:    18,
	}
	// 利用给定数据渲染模板，并将结果写入w
	// tmpl.Execute(w, "沙河小王子")
    tmpl.Execute(w, user) // 传入结构体
}
func main() {
	http.HandleFunc("/", sayHello)
	err := http.ListenAndServe(":9090", nil)
	if err != nil {
		fmt.Println("HTTP server failed,err:", err)
		return
	}
}
```

将上面的main.go文件编译执行，然后使用浏览器访问http://127.0.0.1:9090就能看到页面上显示了“Hello 沙河小王子”。


#### 模板语法

- \{\{\}\}: 模板变量
- pipeline：管道操作，\|连接
- 移出空格： \{\{- .Name -\}\}, 去除模板内容左侧的所有空白符号
- 条件判断
  - \{\{if pipeline\}\} T1 \{\{end\}\}
  - \{\{if pipeline\}\} T1 \{\{else\}\} T0 \{\{end\}\}
  - \{\{if pipeline\}\} T1 \{\{else if pipeline\}\} T0 \{\{end\}\}
- range: 遍历元素，数组、切片、字典或者通道
  - \{\{range x\}\} T1 \{\{end\}\} x长度为0，不会有任何输出
  - \{\{range x\}\} T1 \{\{else\}\} T0 \{\{end\}\} x长度为0，会执行T0
- with: 
  - \{\{with pipeline\}\} T1 \{\{end\}\}
  - 如果pipeline为empty不产生输出，否则将dot设为pipeline的值并执行T1。不修改外面的dot。
  - \{\{with pipeline\}\} T1 \{\{else\}\} T0 \{\{end\}\}
  - 如果pipeline为empty，不改变dot并执行T0，否则dot设为pipeline的值并执行T1。
- 预定义函数
  - 执行模板时，函数从两个函数字典中查找：首先是模板函数字典，然后是全局函数字典。一般不在模板内定义函数，而是使用Funcs方法添加函数到模板里
  - and, or, not, len, index, print, printf, println, html, urlquery, js, call
- 比较函数
  - eq, ne, lt, le, gt, ge
- 自定义函数: go中定义，tmpl中调用
- 嵌套template: 单独的模板文件、代码块
  - \{\{template "ol.tmpl"\}\}
- block：定义模板和执行模板的缩写
- 修改默认的标识符
  - 自定义标志符，不用\{\{\}\}
  - template.New("test").Delims("{[", "]}").ParseFiles("./t.tmpl")

### hertz


#### hertz 简介

【2022-8-8】字节跳动开源的go微服务框架hertz
- [CloudWeGo](https://www.cloudwego.io/): A leading practice for building enterprise cloud native middleware!
- 包含的开源组件：
  - [Kitex](https://www.cloudwego.io/docs/kitex/): Kitex \[kaɪt’eks] is a high-performance and strong-extensibility Golang `RPC` framework
  - [Hertz](https://www.cloudwego.io/docs/hertz/): Hertz \[həːts] is a high-performance, high-usability, extensible `HTTP` framework for Go; 
    - Hertz was inspired by other open-source frameworks like [fasthttp](https://github.com/valyala/fasthttp), [gin](https://github.com/gin-gonic/gin), and [echo](https://github.com/labstack/echo), in combination with unique challenges faced by ByteDance, Hertz has become production ready and powered ByteDance’s internal services over the years.
    - Hertz supports Linux, macOS, and Windows systems.
  - [Netpoll](https://www.cloudwego.io/docs/netpoll/)：Netpoll is a high-performance non-blocking I/O networking framework, which focused on RPC scenarios, developed by ByteDance.
    - RPC is usually heavy on processing logic and therefore cannot handle I/O serially. But Go’s standard library net is designed for blocking I/O APIs, so that the RPC framework can only follow the One Conn One Goroutine design. It will waste a lot of cost for context switching, due to a large number of goroutines under high concurrency. Besides, net.Conn has no API to check Alive, so it is difficult to make an efficient connection pool for RPC framework, because there may be a large number of failed connections in the pool.
    - On the other hand, the open source community currently lacks Go network libraries that focus on RPC scenarios. Similar repositories such as: evio, gnet, etc., are all focus on scenarios like Redis, HAProxy.
    - But now, Netpoll was born and solved the above problems. It draws inspiration from the design of evio and netty, has excellent Performance, and is more suitable for microservice architecture. Also Netpoll provides a number of Features, and it is recommended to replace net in some RPC scenarios.
    - We developed the RPC framework Kitex and HTTP framework Hertz (coming soon) based on Netpoll, both with industry-leading performance.

架构图
- ![](https://www.cloudwego.io/img/docs/hertz.png)

#### hertz 发展历史

大约 2014 年左右，字节就已经开始尝试做一些 Golang 业务的转型。
- 2016 年，基于已开源的 Golang HTTP 框架 Gin 框架，封装了 Ginex。
- 2020 年初 Hertz 立项
- 2020 年 10 月，Hertz 发布第一个可用版本。
- 2022 年 6 月，Hertz 正式开源。 
- 截至目前，Hertz 在字节内部已经支撑超过 1.4 万个业务服务，日峰值 QPS 超过 5000 万。

##### Ginex

2017 - 2019 年期间，也就是 Ginex 发布之后，问题逐渐显现。

主要有以下几点：
- 迭代受开源项目限制
  - Ginex 是一个基于 Gin 的开源封装，所以它本身在迭代方面是受到一些限制的。一旦有针对公司级的需求开发，以及 Bugfix 等等，我们都需要和开源框架 Gin 做联合开发和维护，这个周期不能完全由我们自己控制。
- 代码混乱膨胀、维护困难
  - 由于和业务同学共同开发和维护 Ginex 框架，因此对于控制整个框架的走向没有完全的自主权，从而导致了整体代码混乱膨胀，到后期发现越来越难维护。
- 无法满足性能敏感业务需求
  - 另外，能用 Gin 做的性能优化非常少，因为 Gin 的底层是基于 Golang 的一个原生库，所以如果要做优化，需要在原生库的基础上做很多改造，这个其实是非常困难的。
- 无法满足不同场景的功能需求
  - 内部逐渐出现了一些新的场景，因此会有对 HTTP Client 的需求，支持 Websocket、支持 HTTP/2 以及支持 HTTP/3 等等需求，而在原生的 Ginex 上还是很难扩展的这些功能需求。

[字节跳动大规模企业级 HTTP 框架 Hertz 设计实践](https://www.toutiao.com/article/7153881024156664320)

##### KiteX

- 2016年，Kite 和 Ginex 发布
  - 由于很多功能版本过低，包括 Thrift 当时只有 v0.9.2，它们其实存在很多问题，再加上 Golang 迎来数轮大版本迭代，Kite 甚至连 golang context 参数都没有 。
  - 综上种种原因，Kite 已经满足不了内部使用需求。
- 2019 年中，服务框架团队正式启动了 Kite 这个字节自有 RPC 框架的重构。
  - 这是一个自下而上的整体升级重构，围绕性能和可扩展性的诉求展开设计。
- 2020 年 10 月，团队完成了 KiteX 发布，仅仅两个月后，KiteX 就已经接入超过 1000 个服务。

Kite 作为字节跳动第一代 Golang RPC 框架，主要存在以下缺陷：
- Kite 为了快速支持业务发展需求，不可避免地耦合了部分中台业务的功能；
- Kite 对 Go modules 支持不友好（Go modules 在 2019 年才进入语言核心）；
- Kite 自身的代码拆分成多仓库，版本更新时推动业务升级困难；
- Kite 强耦合了早期版本的 Apache Thrift，协议和功能拓展困难；
- Kite 的生成代码逻辑与框架接口强耦合，成为了性能优化的天花板。

因此，业务的快速发展和需求场景的多样化，催生了新一代 Golang RPC 框架 Kitex。

[字节跳动微服务架构体系演进](https://zhuanlan.zhihu.com/p/382833278)

#### hertz 安装

安装 [hertz](https://github.com/cloudwego/hertz)

```shell
# hertz源码
git clone https://github.com/cloudwego/hertz.git
# go命令行安装hertz
# 确保PATH、GOPATH 已配置
# export GOPATH=~/go
# export PATH=${PATH}:${GOPATH}/bin;
# export PATH=$GOPATH/bin:$PATH # 或
# 安装命令行工具hz
go install github.com/cloudwego/hertz/cmd/hz@latest
```

#### hertz 命令行


hertz 命令行工具
- hz 是 Hertz 框架提供的一个用于**生成代码**的**命令行**工具。
- 目前，hz 可以基于 thrift 和 protobuf 的 IDL 生成 Hertz 项目的脚手架
- 使用 thrift 或 protobuf 的 IDL 生成代码，需要安装相应的编译器：[thriftgo](https://github.com/cloudwego/thriftgo) 或 [protoc](https://github.com/protocolbuffers/protobuf/releases) 
- hz 生成的代码里
  - 一部分是底层的**编译器**生成的（通常是关于 IDL 里定义的结构体）
  - 另一部分是 IDL 中用户定义的**路由、method** 等信息。用户可直接运行该代码。
- 从执行流上来说，当 hz 使用 thrift IDL 生成代码时，hz 会调用 thriftgo 来生成 go 结构体代码，并将自身作为 thriftgo 的一个插件（名为 thrift-gen-hertz）来执行来生成其他代码。当用于 protobuf IDL 时亦是如此。



### caddy web服务框架

【2022-3-10】[自带 HTTPS 的开源 Web 服务器](https://www.toutiao.com/i7064892846268006924/)

常见的开源 Web 服务器有久负盛名的 `Apache`、性能强劲的 `Nginx`。

采用 Go 编写的 Web 服务端“后起之秀”：[Caddy](github.com/caddyserver/caddy)
- 拥有下载无需安装就能用、零配置实现 HTTPS 等特点，从而在强者如云的 Web 服务器中占据了一席之地。
- Caddy 凭借无需额外配置自动 HTTPS，分分钟完成 HTTPS 站点搭建，使它成为了中小型 Web 服务的首选服务器。Caddy 深受开源爱好者们的喜爱，2014 年开源至今共收获了 3.6 万颗星。

Caddy 可以在 Linux、Mac、Windows 上快速部署 http(s) 站点或反向代理服务。支持：
- HTTP/1.1 和 HTTP/2
- 同时接受 HTTPS 自动签发和手动管理
- 虚拟主机 (多个站点工作在单个端口上)
- 原生 IPv4 和 IPv6 支持
- 静态文件分发
- 平滑重启/重载
- 反向代理 (HTTP 或 WebSocket)
- 负载均衡和健康性检查
- Markdown 渲染
- 文件浏览服务
与传统的 Nginx 或者 Apache 相比，Caddy 整体只有一个可执行文件，安装便捷不易出现奇怪的依赖问题，配置文件结构清晰语法简单易于上手，依托于模块化架构可以使用 Go 语言快速开发扩展模块。

![](https://p6.toutiaoimg.com/origin/tos-cn-i-qvj2lq49k0/e02138991e5346baa4d53e43fedc5bbb?from=pc)

### 输入提示

【2022-1-19】用go实现输入提示功能，[suggestion代码](https://github.com/wklken/suggestion);
- 在搜索输入框等位置,用户输入关键词,系统提示可以使用的关键字,提升用户体验
- ![](https://raw.githubusercontent.com/wklken/gallery/master/suggestion/suggestion.gif)

方法一：**easymap**
- 适用: 小型系统, 关键词在 10W 左右(中文+拼音+拼音首字母共30W左右)
- 优点: 逻辑简单结构清晰, 代码足够少, 方便扩展(e.g. 可自行修改存储结构,在返回中加入图片等额外信息)
- 缺点: 内存占用,30W关键词,平均词长3,占用800M内存, 另外对cpu也有一定消耗
- 处理和实践: 
  - python版本 加一层redis/memcached, python版本, 单机8进程, 16核, 占用1G内存, 每天总请求量在300-500w左右, qps峰值在 300 左右, 没什么压力
  - golang版本完全没在生产上试过, 应该毫无压力
方法二：**double-array-trie**
- 用实现了double-array-trie的[darts实现](https://github.com/awsong/go-darts)
- 适用: 关键词在10w 以上的系统
- 优点: 内存占用小, 性能保证
- 缺点: 底层依赖double-array-trie,逻辑有点绕,自定义不是很方便
- 处理和实践: 加一层redis/memcached

使用方法：

```shell
git clone https://github.com/wklken/suggestion.git # 下载代码库
# 方法一：简易版，easymap
cd suggestion/easymap
python suggest.py
go run suggest.go
# 方法二：double-array-trie, 启动web服务
go run test_run.go # 无web服务
go run test_web.go # 有web服务
# 访问本地服务 http://localhost:9090
# 输入检索词，input
```

test_web.go 代码

```go
package main

import (
	"./darts"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	//"strings"
	// "path"
)

//【2022-10-11】json字符串转结构体时，转换后变量名(value)要加双引号!
type ValueJson struct {
	Value string `json:"value"`
}

func dartsInit() (darts.Darts, error) {
	d, err := darts.Import("data.txt", "data.lib")
	if err != nil {
		fmt.Println("ERROR: darts initial failed!")
	} else {
		fmt.Println("INFO: darts initial success!")
	}
	return d, err
}

var dart, err = dartsInit()

// 输入提示api
func simpleSuggest(w http.ResponseWriter, r *http.Request) {
	// valueList := make([]ValueJson, 10)
	var valueList []ValueJson
	r.ParseForm() //解析参数，默认是不会解析的
	keyword := r.Form["keyword"]
	fmt.Println("keyword:", keyword)
	if len(keyword) == 0 {
	} else {
		results := dart.Search([]rune(keyword[0]), 0)
		for i := 0; i < len(results); i++ {
			var value ValueJson
			value.Value = string(results[i].Key)
			valueList = append(valueList, value)
		}
	}
	if len(valueList) > 10 {
		valueList = valueList[:10]
	}
	fmt.Println("return", valueList)
	if len(valueList) > 0 {
		b, err := json.Marshal(valueList)
		if err != nil {
			fmt.Println("json err:", err)
		}
		fmt.Fprintf(w, string(b)) //这个写入到w的是输出到客户端的
	} else {
		fmt.Fprintf(w, "[]") //这个写入到w的是输出到客户端的
	}
	return
}
// 主页api
func index(w http.ResponseWriter, r *http.Request) {
	http.ServeFile(w, r, "templates/index.html")
}

func main() {
	// index
	http.HandleFunc("/", index) //设置访问的路由
	// suggest
	http.HandleFunc("/suggest/", simpleSuggest) //设置访问的路由
	// static
	http.HandleFunc("/static/", func(w http.ResponseWriter, r *http.Request) {
		http.ServeFile(w, r, r.URL.Path[1:])
	})
	var host = "127.0.0.1"
	var port = "9090"
	var url = host + ":" + port
	err := http.ListenAndServe(url, nil) //设置监听的端口
	if err != nil {
		log.Fatal("ListenAndServe: ", err)
	}else {
		log.Println("服务开启："+url)
	}
}
```

## 模型部署

【2022-8-2】[Go 语言部署TensorFlow机器学习模型](https://www.knowlesys.cn/ab/qa/2020-12-05/c4fa60df527fe4b4ee2bfefd4b26c92b.html)

Python 是当下最流行的机器学习语言，有很多开源资源可以使用。而 Go语言的**速度快**，能很好地处理**并发**，可以编译成单一的二进制文件。所以在实际开发时综合二者的优势，用 Python做**模型训练**，用Go做**预测服务**。

### TensorFlow模型

保存模型

```python
from tensorflow.python.saved_model.builder_impl import SavedModelBuilder

with tf.Session() as session:  
    # 训练模型操作。。。
    
    # 保存模型
    builder = SavedModelBuilder("存储路径")
    # 保存时需要定义tag
    builder.add_meta_graph_and_variables(session, ["tag"])
    builder.save()
```

### Go 推理模型

注意：
- 载入模型时，需要传参：
  - 模型保存路径，Python保存模型时定义的Tag。这里tag 需要为[]string{}类型。
- 模型入参需要通过 tf.NewTensor() 转为 Tensor；
- 输入输出节点操作名称需要根据Python定义的模型操作节点名称填写；
- 输出节点和Python类似，可以传递多个操作名获取多个值。

```go
package main

import (
	"fmt"
	tf "github.com/tensorflow/tensorflow/tensorflow/go"
)

func main() {
	m, err := tf.LoadSavedModel("modelPath", []string{"modelTag"}, nil) // 载入模型
	if err != nil {
		// 模型加载失败
		fmt.Printf("err: %v", err)
	}
	// 打印出所有的Operator
	for _, op := range m.Graph.Operations() {
		fmt.Printf("Op name: %v", op.Name())
	}
	// 构造输入Tensor。根据你的模型入参格式来定义
	x := [1][8]int32{
		{0,1,2,3,4,5,6,7},
	}
	tensor_x, err := tf.NewTensor(x)
	if err != nil {
		fmt.Printf("err: %s", err.Error())
		return
	}
	kb, err := tf.NewTensor(float32(1))
	if err != nil {
		fmt.Printf("err: %s", err.Error())
		return
	}
	s := m.Session
	feeds := map[tf.Output]*tf.Tensor{
		// operation name 需要根据你的模型入参来写
		m.Graph.Operation("input_x").Output(0): tensor_x,
		m.Graph.Operation("keep_prob").Output(0): kb,
	}
	fetches := []tf.Output{
		// 输出层的name 也要根据你的模型写
		m.Graph.Operation("score/ArgMax").Output(0),
	}
	result, err:= s.Run(feeds, fetches,nil)
	if err != nil {
		// 模型预测失败
		fmt.Printf("err: %s  ", err.Error())
	}
	fmt.Printf("%#v", result)
}
```

## 流程引擎

【2022-9-16】[workflow引擎](https://www.toutiao.com/article/7143622506199843332/)


### 引擎代码

流程引擎代码

```go
import (
	"errors"
	"fmt"
	"github.com/go-redis/redis"
	"sync"
)

//分布式workflow
type DFlow struct {
	RC      *redis.ClusterClient
	LockKey string
	Func    map[string]Func
	Depend  map[string][]string
	Force   bool
}

//workflow引擎
type flowCore struct {
	funcs map[string]*flowStruct
}

type Func func(interface{}) (interface{}, error)

type flowStruct struct {
	Deps  []string
	Ctr   int
	Fn    Func
	C     chan error
	Res   interface{}
	force bool
	once  sync.Once
}

//workflow节点已执行
func (fs *flowStruct) done(e error) {
	for i := 0; i < fs.Ctr; i++ {
		fs.C <- e
	}
}

//关闭workflow节点channel
func (fs *flowStruct) close() {
	fs.once.Do(func() {
		close(fs.C)
	})
}

//初始化channel
func (fs *flowStruct) init() {
	fs.C = make(chan error)
}

//创建workflow
func create() *flowCore {
	return &flowCore{
		funcs: make(map[string]*flowStruct),
	}
}

//增加workflow节点
func (flw *flowCore) add(name string, d []string, fn Func, fc bool) *flowCore {
	flw.funcs[name] = &flowStruct{
		Deps:  d,
		Fn:    fn,
		Ctr:   1,
		force: fc,
	}
	return flw
}

//workflow检查并启动
func (flw *flowCore) start() map[string]error {
	for name, fn := range flw.funcs {
		for _, dep := range fn.Deps {
			// prevent self depends
			if dep == name {
				return map[string]error{name: errors.New(name + " not depends of it self")}
			}
			// prevent no existing dependencies
			if _, exists := flw.funcs[dep]; exists == false {
				return map[string]error{dep: errors.New(dep + " not exists")}
			}
			flw.funcs[dep].Ctr++
		}
	}
	return flw.do()
}

//执行workflow节点
func (flw *flowCore) do() map[string]error {
	result := map[string]error{}
	for name, f := range flw.funcs {
		f.init()
		go func(name string, fs *flowStruct) {
			do := true
			defer func() {
				if r := recover(); r != nil {
					fmt.Println(r)
				}
			}()
			if len(fs.Deps) > 0 {
				for _, dep := range fs.Deps {
					err, ok := <-flw.funcs[dep].C
					if !fs.force && (err != nil || !ok) {
						do = false
					}
				}
			}
			if do {
				//匹配pipeline条件
				if len(fs.Deps) == 1 {
					fs.Res, result[name] = fs.Fn(flw.funcs[fs.Deps[0]].Res)
				} else {
					fs.Res, result[name] = fs.Fn(nil)
				}
				fs.done(result[name])
			} else {
				for _, fn := range flw.funcs {
					fn.close()
				}
			}
		}(name, f)
	}
	return result
}

//运行workflow
func (df *DFlow) Run() map[string]error {
	lock := SyncMutex{LockKey: df.LockKey, LockTime: 15, Rc: df.RC}
	//加锁
	if lock.Lock() {
		defer func() {
			// 释放锁
			lock.UnLock()
		}()
		fl := create()
		for k, v := range df.Depend {
			fl.add(k, v, df.Func[k], df.Force)
		}
		return fl.start()
	}
	return nil
}
运行示例：

var (
	RC, _ = RedisConnect()
)

type test struct {
}

func (t *test) a(interface{}) (interface{}, error) {
	fmt.Println("a")
        fmt.Println("==========")
	return "a ok", nil
}
func (t *test) b(i interface{}) (interface{}, error) {
	fmt.Println(i)
	fmt.Println("b")
        fmt.Println("==========")
	return "b ok", nil
}
func (t *test) c(i interface{}) (interface{}, error) {
	fmt.Println(i)
	fmt.Println("c")
        fmt.Println("==========")
	return nil, errors.New("c error")
}
func (t *test) d(i interface{}) (interface{}, error) {
	fmt.Println(i)
	fmt.Println("d")
        fmt.Println("==========")
	return "d ok", nil
}
func init() {
	t := test{}
	Func := map[string]common.Func{"a": t.a, "b": t.b, "c": t.c, "d": t.d}
	Depend := map[string][]string{"a": {}, "b": {"a"}, "c": {"b"}, "d": {"c"}}
	df := common.DFlow{RC: RC, LockKey: "workflow_test", Func: Func, Depend: Depend}
	result := df.Run()
	fmt.Println(result)
}
```

### 示例

运行示例：

```go
var (
	RC, _ = RedisConnect()
)

type test struct {
}

func (t *test) a(interface{}) (interface{}, error) {
	fmt.Println("a")
        fmt.Println("==========")
	return "a ok", nil
}
func (t *test) b(i interface{}) (interface{}, error) {
	fmt.Println(i)
	fmt.Println("b")
        fmt.Println("==========")
	return "b ok", nil
}
func (t *test) c(i interface{}) (interface{}, error) {
	fmt.Println(i)
	fmt.Println("c")
        fmt.Println("==========")
	return nil, errors.New("c error")
}
func (t *test) d(i interface{}) (interface{}, error) {
	fmt.Println(i)
	fmt.Println("d")
        fmt.Println("==========")
	return "d ok", nil
}
func init() {
	t := test{}
	Func := map[string]common.Func{"a": t.a, "b": t.b, "c": t.c, "d": t.d}
	Depend := map[string][]string{"a": {}, "b": {"a"}, "c": {"b"}, "d": {"c"}}
	df := common.DFlow{RC: RC, LockKey: "workflow_test", Func: Func, Depend: Depend}
	result := df.Run()
	fmt.Println(result)
}
```

### 执行结果

执行结果

```shell
a # 执行
# ==========
a ok # a执行输出
b # 执行
# ==========
b ok # b执行输出
c # 执行错误,流水线中断
# ==========
map[a:<nil> b:<nil> c:c error]
# 流水线节点执行结果
```


# 经验总结


## go面试题

【2022-9-29】[go面试题](https://www.toutiao.com/article/7148322989774504463)

### 1、在进行项目开发时，遇到的关于golang的问题有哪些？

工作中用到的东西，`协程`，`通道`，`框架`、`加密`等等，说一些关键的技术点

### 2、golang中grpc和rest优劣势

两种API架构概述
- `RPC`(remote procedure call **远程过程调用**)框架目标就是让远程服务调用更加简单、透明。RPC 框架负责屏蔽底层的**传输**方式（TCP 或者 UDP）、**序列化**方式（XML/Json/ 二进制）和**通信**细节。服务调用者可以像调用本地接口一样调用远程的服务提供者，而不需要关心底层通信细节和调用过程。
- `grpc`：gRPC是RPC框架中的一种, RPC是一种设计理念，而gRPC是基于此种设计理念设计的真实框架。
- `rest`：描述的是在网络中client和server的一种交互形式；一个架构样式的网络系统，指的是一组架构约束条件和原则。

grpc相对于rest的优势
- gRPC 对接口有严格的约束条件，安全性更高，对于**高并发**的场景更适用

为什么选择grpc
- grpc有明确的接口规范和对于流的支持；
- RPC 效率更高。RPC使用自定义的 TCP 协议，可以让请求报文体积更小，或者使用 HTTP2 协议，也可以很好的减少报文的体积，提高传输效率。

### 3、golang里面常用到的技术栈有哪些？

协程、通道、web框架、密码学等

### 4、gin框架的好处是什么？

gin框架
- 快速：基于Radix树的路由,性能非常强大。
- 支持中间件：内置许多中间件，如 Logger,Gzip,Authorization 等。
- 崩溃恢复：可以捕捉 pani c引发的程序崩溃，使Web服务可以一直运行。
- JSON验证：可以验证请求中 JSON 数据格式。
- 多种数据渲染方式：支持 HTML、JSON、YAML、XML 等数据格式的响应。
- 扩展性：非常简单扩展中间件。

### 5、无缓冲通道和缓冲通道的区别是什么？

- `无缓冲通道`，在通道满了之后就会阻塞所在的goroutine。
  - 需要在其他goroutine中取出该通道中的元素，才能解除它所在通道的阻塞，不然就会一直阻塞下去。
- `缓冲通道`，存完了东西可以不取出来，不会阻塞;
- 缓冲通道相较于无缓冲区的通道在用法上是要**灵活**一些的，不会出现一次写入，一次读完就会堵塞。

### 6 、select的用处是什么？

过select可以监听channel上的数据流动。

`select`的用法与`switch`语言非常类似，由select开始一个新的选择块，每个选择条件由case语句来描述。

示例代码如下:

```go
select {
    case <-chan1:
        // 如果chan1成功读到数据，则进行该case处理语句
    case chan2 <- 1:
        // 如果成功向chan2写入数据，则进行该case处理语句
    default:
        // 如果上面都没有成功，则进入default处理流程
}
```

### 7、defer的用途和使用场景是什么？

defer作用：
- 可用于**捕获程序异常**，方法中出现异常时，defer可捕获此异常并进行打印，使用关键字defer向函数声明退出调用，即主函数退出时，defer后的函数才被调用。
- defer语句的作用是<span style='color:blue'>不管程序是否出现异常，均在函数退出时自动执行相关代码</span>。

### 8、defer的执行顺序是什么？

defer语句并不会马上执行，而是会进入一个`栈`，函数return前，会按先进后出的顺序执行。也说是说最先被定义的defer语句最后执行。

注：
- **先进后出**的原因是后面定义的函数可能会依赖前面的资源，自然要先执行；
- 否则，如果前面先执行，那后面函数的依赖就没有

### 9、defer函数遇到return以后是怎么执行的？

先defer再return，函数执行之后，return返回之前，按照先进后出的顺序执行

### 10、对于进程，线程，协程的理解是什么？

- `线程`可以理解为轻量级的`进程`, 协程可以理解为轻量级的`线程`
  - `进程` → `线程` → `协程`
- 协程最大的优势就是可以轻松的创建上百万个，而不会导致系统资源衰减

详解请参考：进程、线程、协程

### 11、空结构体的作用

空结构体不占任何内存，使用空结构体，可以帮咱们节省内存空间，提升性能golang

### 12、map怎么顺序读取？

map不能顺序读取，是因为他是无序的，想要有序读取，首先的解决的问题就是，把key变为有序，所以可以把key放入切片，对切片进行排序，遍历切片，通过key取值。

代码示例：

```go
package main

import (
  "fmt"
  "sort" // 排序包
)

func main()  {
  map1 := make(map[int]string)
  map1[1] = "红孩儿"
  map1[2] = "牛魔王"
  map1[3] = "白骨精"
  map1[4] = "小钻风"
  map1[5] = "黄袍怪"
  map1[6] = "孔雀大明王"
  map1[7] = "白毛鼠"
  //获取所有的key，取值后存储到切片
  keys := make([]int,0,len(map1))
  for k,_ := range map1{
    keys = append(keys,k)
  }
  fmt.Println(keys)
  //对key值进行排序
  //内置函数sort包下的排序方法
  sort.Ints(keys)
  fmt.Println(keys)
  for _,key := range keys{
    fmt.Println(key,"-->",map1[key])
  }
  //冒泡排序方法
  for i := 1;i<len(keys);i++ {
    for j := 0;j<len(keys)-1;j++ {
      if keys[j] > keys[j+1] {
        keys[j],keys[j+1] = keys[j+1],keys[j]
      }
    }
  }
  for i := 1;i<=len(keys);i++ {
    fmt.Println(i,"-->",map1[i])
  }
}
```

### 13、项目里用到什么数据结构，例如map、slice

都会用到，包括
- 基本数据类型：int、float、string、bool
- 复合数据类型有：指针、数组、切片、字典（map）、通道、结构和接口

注：map和slice也会用到，当有明确的key值时，使用map，如果没有明显的key，就使用切片

### 14、用range修改切片元素的值会发生什么？

我们经常会使用到range来帮助我们遍历一些数据，通常情况下都是查看操作多一些，但是当需要对其原地址上的内容进行变更时，通常都是使用 `for i:=0; i<len(); i++` 来修改值。在使用range的时候，通常会将该数据结构进行拷贝，来遍历这一份拷贝后的副本，使用的是一个值传递，如果我们进行修改，修改的就只是副本，对原地址上的值不会产生任何影响。

### 15、了解空指针吗？

当一个指针被定义后没有分配到任何变量时，它的值为 nil。
- nil 指针也称为`空指针`。
- nil在概念上和其它语言的null、None、nil、NULL一样，都指代零值或空值。

### 16、怎么用go去实现一个set

Go中是不提供Set类型，Set是一个集合，其本质就是一个List，只是List里的元素不能重复。
- Go提供了map类型，但map类型的key是不能重复的，所以，咱们能够利用这一点，来实现一个set

构造一个Set的方法
- 构造一个set，首先定义set的类型svg

```go
//set类型
type Set struct {
    m map[int]Empty
}
```

为一个结构体类型，内部一个成员为一个map，这也是主要咱们存储值的容器函数产生set的工厂性能

```go
//返回一19et
func SetFactory() *Set{
    return &Set{
        m:map[int]Empty{} // 所谓并发编程是指在一台处理器上“同时”处理多个任务。
    }
}
```

### 17、怎么判断两个结构体是否相等？

一般没有效率太高的方法：
- **if判断**比较：使用if一个个比较两个结构体中元素的值：if(p1->age==p2->age)，如果有一个元素不等，即是两个实例不相等。
- **指针**直接比较：如果保存的是同一个实例地址，则(p1==p2)为真。

### 18、make和new的区别是什么？

- make 只用于 chan，map，slice 的初始化；
- new 用于给类型分配内存空间，并且置零；
- make 返回类型**本身**，new 返回指向类型的**指针**。

### 19、说一下你对并发编程的理解？

所谓并发编程是指在一台处理器上“同时”处理多个任务。
- 宏观的并发是指在一段时间内，有多个程序在同时运行。
- 并发在微观上，是指在同一时刻只能有一条指令执行，但多个程序指令被快速的轮换执行，使得在宏观上具有多个进程同时执行的效果，但在微观上并不是同时执行的，只是把时间分成若干段，使多个程序快速交替的执行。

### 20、碰到过分布式锁的问题吗？分布式锁的原理你清楚吗？

golang中的分布式锁可使用etcd进行实现，实现原理如下：
- 在ectd系统里创建一个key
- 如果创建失败，key存在，则监听该key的变化事件，直到该key被删除，回到1
- 如果创建成功，则认为我获得了锁

## Go的50坑：陷阱、技巧和常见错误

Go的50坑：新Golang开发者要注意的陷阱、技巧和常见错误

### 初级篇

- **开大括号**不能放在单独成行
- 未使用的变量
- 未使用的Imports
- 简式的变量声明仅可以在函数内部使用
- 使用简式声明重复声明变量
- 偶然的变量隐藏 Accidental Variable Shadowing
- 不使用显式类型，无法使用“nil”来初始化变量
- 使用“nil” Slices and Maps
- Map的容量
- 字符串不会为“nil”
- Array函数的参数
- 在Slice和Array使用“range”语句时的出现的不希望得到的值
- Slices和Arrays是一维的
- 访问不存在的Map Keys
- Strings无法修改
- String和Byte Slice之间的转换
- String和索引操作
- 字符串不总是UTF8文本
- 字符串的长度
- 在多行的Slice、Array和Map语句中遗漏逗号
- log.Fatal和log.Panic不仅仅是Log
- 内建的数据结构操作不是同步的
- String在“range”语句中的迭代值
- 对Map使用“for range”语句迭代
- "switch"声明中的失效行为
- 自增和自减
- 按位NOT操作
- 操作优先级的差异
- 未导出的结构体不会被编码
- 有活动的Goroutines下的应用退出
- 向无缓存的Channel发送消息，只要目标接收者准备好就会立即返回
- 向已关闭的Channel发送会引起Panic
- 使用"nil" Channels
- 传值方法的接收者无法修改原有的值

### 进阶篇

- 关闭HTTP的响应
- 关闭HTTP的连接
- 比较Structs, Arrays, Slices, and Maps
- 从Panic中恢复
- 在Slice, Array, and Map "range"语句中更新引用元素的值
- 在Slice中"隐藏"数据
- Slice的数据“毁坏”
- "走味的"Slices
- 类型声明和方法
- 从"for switch"和"for select"代码块中跳出
- "for"声明中的迭代变量和闭包
- Defer函数调用参数的求值
- 被Defer的函数调用执行
- 失败的类型断言
- 阻塞的Goroutine和资源泄露

### 高级篇

- 使用指针接收方法的值的实例
- 更新Map的值
- "nil" Interfaces和"nil" Interfaces的值
- 栈和堆变量
- GOMAXPROCS, 并发, 和并行
- 读写操作的重排顺序
- 优先调度


# 结束

