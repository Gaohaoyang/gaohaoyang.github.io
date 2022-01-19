---
layout: post
title:  GO语言学习笔记
subtitle:  新语言
date:   2017-05-04 15:17:00
author:  wangqiwen
categories: 编程语言
tags: go web
excerpt: 编程语言知识点
mathjax: true
header-img: img/post-bg-ios10.jpg
catalog: true
---

* content
{:toc}


# 汇总


# go语言简介

- [Go语言教程](http://www.yiibai.com/go/go_start.html)
- 酷壳：[go语言简洁](http://coolshell.cn/articles/8460.html)，[附加](http://coolshell.cn/articles/8489.html）
- [Go的50坑：新Golang开发者要注意的陷阱、技巧和常见错误]()
go vim颜色显示：进入目录 ~/.vim/bundle，git clone https://github.com/fatih/vim-go.git
命令行：
go env    显示go环境变量配置
Go常用命令：
go get:获取远程包，需提前安装git或hg
go run:直接运行程序
go build:测试编译，检查是否有编译错误
go fmt:格式化源码(部分IDE在保存时自动调用)
go install:编译包文件并编译整个程序
go test:运行测试文件
go doc:查看文档(chm手册)
在浏览器上浏览go官方网站：命令行输入：godoc -http=:8080    即可在浏览器输入：localhost:8080查看
go是一种编译型（翻译成更低级的语言，如汇编）、具有静态类型和类c风格语法的语言，并具具备垃圾回收机制，编译型语言特点：运行快，开发慢；不同于解释型语言

## Go安装

- 从链接[Go下载](http://golang.org/dl/) 中下载最新版本的Go可安装的归档文件。将/usr/local/go/bin添加到PATH环境变量
  - win地址：https://go.dev/dl/go1.17.6.windows-amd64.msi
  - mac地址： wget https://go.dev/dl/go1.17.6.darwin-amd64.pkg
  - linux地址: wget https://go.dev/dl/go1.17.6.linux-amd64.tar.gz
- 环境变量：vim ~/.bash_profile

```shell
export GOROOT=/usr/local/go
export PATH=$PATH:$GOROOT/bin
```

验证：
- 创建一个test.go的go文件。编写并保存以下代码到 test.go 文件中。

```go
package main    // 声明 main 包
import (
    "fmt"       // 导入 fmt 包，打印字符串是需要用到
)
func main() {   // 声明 main 主函数
    fmt.Println("Hello World!") // 打印 Hello World!
}
```

现在运行test.go查看结果并验证输出结果如下：
- go run test.go Hello, World!

## go编译

Go语言是编译型的静态语言（和C语言一样），所以在运行Go语言程序之前，先要将其编译成二进制的可执行文件。

Go语言提供的go build或者go run命令对Go语言程序进行编译：
- go env：显示环境变量
- go version：显示版本
- go **build** 命令可以将Go语言程序代码编译成二进制的可执行文件，但是需要我们手动运行该二进制文件；
  - 有参数：
    - main包：生成一个与第一个 fileName 同名的可执行文件
    - 非main包：编译器将只对该包进行语法检查，不生成可执行文件。
  - 无参数：如果当前目录下存在 main 包，则会生成一个与当前目录名同名的“目录名.exe”可执行文件
    - 有main包：生成一个与当前目录名同名的“目录名.exe”可执行文件
    - 无main包：只对当前目录下的程序源码进行语法检查，不会生成可执行文件。
- go **run** 命令则更加方便，go run命令将编译和执行指令合二为一
  - 编译后直接运行Go语言程序，编译过程中会产生一个临时文件，但不会生成可执行文件，这个特点很适合用来调试程序。


## Go项目

注：设置 **GoRoot**（安装目录）和 **GoPath** （工作目录）！

一个Go语言项目的目录一般包含以下三个子目录：
- src 目录：放置项目和库的源文件；
- pkg 目录：放置编译后生成的包/库的归档文件；
- bin 目录：放置编译后生成的可执行文件。

GoPath：go项目工作目录，需在环境变量中设置，多个用分号隔开
- /src：项目源文件
  - project_1：具体项目代码
    - hello.go
    - hello_test.go
  - project_2：
- /bin：编译后的可执行文件
- /pkg：编译后的包文件（hello.a）
注：bin和pkg可不用创建，执行go install会自动创建

- 问题：如何避免新增一个GO项目就要往GOPATH中增加一个路径？
- 答：加入脚本：《[go目录结构](http://blog.studygolang.com/2012/12/go%E9%A1%B9%E7%9B%AE%E7%9A%84%E7%9B%AE%E5%BD%95%E7%BB%93%E6%9E%84/)》

## 包的使用

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

导入包的多种方式：三种模式：**正常**模式、**别名**模式、**简便**模式
- 直接根据$GOPATH/src目录导入import "test/lib"(路径其实是$GOPATH/src/test/lib)
- 别名导入：import alias_name "test/lib" ，这样使用的时候，可以直接使用别名
- 使用点号导入：import . "test/lib"，作用是使用的时候直接省略包名
- 使用下划线导入：improt _ "test/lib"，该操作其实只是引入该包。当导入一个包时，它所有的init()函数就会被执行，但有些时候并非真的需要使用这些包，仅仅是希望它的init()函数被执行而已。这个时候就可以使用_操作引用该包。即使用_操作引用包是无法通过包名来调用包中的导出函数，而是只是为了简单的调用其init函数()。往往这些init函数里面是注册自己包里面的引擎，让外部可以方便的使用，例如实现database/sql的包，在init函数里面都是调用了sql.Register(name string, driver driver.Driver)注册自己，然后外部就可以使用了。
- 相对路径导入     import   "./model"  //当前文件同一目录的model目录，但是不建议这种方式import

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

## 标识符

Go标识符是用于标识变量，函数或任何其他用户定义项目的名称。标识符以字母A到Z或a到z或下划线_开头，后跟零个或多个字母，下划线和数字(0到9)组成。
- 标识符 = \[字母_] {字母 | unicode数字_}。
Go不允许在标识符中使用标点符号，例如@, $ 和 %。 Go是一种区分大小写的编程语言。 因此，Manpower和manpower在Go中是两个不同的标识符

## 关键词

break,default,func,interface,select,case,defer,go,map,struct,chan,else,goto,package,switch,const,fallthrough,if,range,type,continue,for,import,return,var
 
## 函数使用

- 类型：按值调用、按引用调用
- 局部变量、全局变量（main函数之外定义）
- 函数可以接受任意参数（类型在变量后面），返回任意参数

```go
package main
import "fmt"
var c, python, java bool //全局变量定义,var声明
var c, python, java = true, false, "no!" //带初始化语句时可省略类型
c, python, java := true, false, "no!"//短声明:=，可以省略var关键字，注：func外不能使用短声明
 
func add(x int, y int) int {
return x + y 
//return // 裸返回：没有参数的 return 语句返回各个返回变量的当前值
}  
func swap(x, y string) (string, string) { //多个输出
   //函数参数同类型时可以缩写
return y, x 
}
func main() {
fmt.Println(add(42, 13))
a, b := swap("hello", "world") // :=，局部变量，函数体内定义
fmt.Println(a, b)
}
```

## 变参函数

变参函数

```go
package main
import "fmt"
var x string = "hello"//错误！字符串要用双引号，字节才是单引号
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

## 匿名函数

Go语言支持匿名函数，通过**闭包方式**实现。匿名函数在想要定义函数而不必命名时非常有用（内联函数）

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

## goroutine

GoRoutine主要是使用go关键字来调用函数，还可以使用匿名函数。可以把go关键字调用的函数想像成pthread_create，创建线程。
 
```go
package main
import "fmt"
func f(msg string) {
    fmt.Println(msg)
}
func main(){
    go f("goroutine")
 
    go func(msg string) {
        fmt.Println(msg)
    }("going")
}
```

并发安全性
- goroutine有个特性，也就是说，如果一个goroutine没有被阻塞，那么别的goroutine就不会得到执行。这并不是真正的并发，如果你要真正的并发，你需要在你的main函数的第一行加上下面的这段代码：

```go
import "runtime"
...
runtime.GOMAXPROCS(4)
```

以上代码存在并发安全性问题，需要上锁

[参考地址](http://coolshell.cn/articles/8489.html)
 
## 数据类型

| 编号| 类型 | 说明 |
|---|---|---|
| 1| 布尔类型 | 它们是布尔类型，由两个预定义常量组成：(a)true(b)false|
| 2| 数字类型 | 它们是算术类型，在整个程序中表示：a)整数类型或 b)浮点值。|
| 3| 字符串类型 | 字符串类型表示字符串值的集合。它的值是一个字节序列。 字符串是不可变的类型，一旦创建后，就不可能改变字符串的内容。预先声明的字符串类型是string。|
| 4| 派生类型 | 包括(a)指针类型，(b)数组类型，(c)结构类型，(d)联合类型和(e)函数类型(f)切片类型(g)函数类型(h)接口类型(i) 类型|
 
所有类型：
- bool  
- string  
- int  int8  int16  int32  int64 
- uint uint8 uint16 uint32 uint64 uintptr  
- byte // uint8 的别名  
- rune // int32 的别名。代表一个Unicode码  
- float32 float64  
- complex64 complex128
- int，uint 和 uintptr 类型在32位的系统上一般是32位，而在64位系统上是64位。当你需要使用一个整数类型时，应该首选 int，仅当有特别的理由才使用定长整数类型或者无符号整数类型。

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

## 字符串

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
- 后缀： strings.HasSuffix("suffix", "fix")

### strings使用方法

```go
package main
import s "strings" //strings取个别名
import "fmt"

var p = fmt.Println//我们给 fmt.Println 一个短名字的别名，我们随后将会经常用到。
func main() {
//注意都是包中的函数，不是字符串对象自身的方法，调用时传递字符作为第一个参数进行传递。
    p("Contains:  ", s.Contains("test", "es")) // true,包含判断，注意s.Contains("", "")=true
 p(s.ContainsAny("test", "e")) // e&s(且),e|s(或)
 p(s.ContainsRune("我爱中国", '我'))  //字符匹配，注意是单引号！
 p(s.EqualFold("Go", "go")) //判等，忽略大小写
 p(s.Fields("a b c")) //字符串变列表["a" "b" "c"]
    p("Count:     ", s.Count("test", "t")) //2 计数
    p("HasPrefix: ", s.HasPrefix("test", "te"))// true 前缀判断
    p("HasSuffix: ", s.HasSuffix("test", "st"))// true 后缀判断
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
    p("Join:      ", s.Join([]string{"a", "b"}, "-")) //a-b slice连接成字符串
    p("Repeat:    ", s.Repeat("a", 5)) // aaaaa 重复
    p("Replace:   ", s.Replace("foo", "o", "0", -1)) //f00 全部替换
    p("Replace:   ", s.Replace("foo", "o", "0", 1))//f0o 1次替换
    p("Split:     ", s.Split("a-b-c-d-e", "-"))//[a b c d e] string转array（slice？）
fmt.Printf("%qn", strings.SplitAfter("/home/m_ta/src", "/")) //["/" "home/" "m_ta/" "src"]
fmt.Printf("%qn", strings.SplitAfterN("/home/m_ta/src", "/", 2)) //["/" "home/m_ta/src"]
fmt.Printf("%qn", strings.SplitN("/home/m_ta/src", "/", 2)) //["/" "home/" "m_ta/" "src"]
   fmt.Printf("%qn", strings.SplitN("/home/m_ta/src", "/", -1)) //["" "home" "m_ta" "src"]
fmt.Println(strings.Title("her royal highness")) //首字符大写？
fmt.Println(strings.ToTitle("loud noises"))
    p("ToLower:   ", s.ToLower("TEST"))//test 小写
    p("ToUpper:   ", s.ToUpper("test"))//TEST 大写
    fmt.Printf("[%q]", strings.Trim(" !!! Achtung !!! ", "! ")) // ["Achtung"]
fmt.Printf("[%q]", strings.TrimLeft(" !!! Achtung !!! ", "! ")) // ["Achtung !!! "]
fmt.Println(strings.TrimSpace(" tn a lone gopher ntrn")) // a lone gopher
    p("Len: ", len("hello"))// 5 长度
    p("Char:", "hello"[1])// 101 取字符
}
```

参考：[go字符串操作示例](http://studygolang.com/articles/771)

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

## 控制流
 
Go编程语言提供以下类型的决策语句。单击以下相关链接以学习或了解其详细信息。

| 语句| 描述| 
|---|---|
| if语句| if语句由布尔表达式后跟一个或多个语句组成。|
| if…else语句| if语句后面可以是一个可选的else语句，当布尔表达式为false时执行else语句。|
| 嵌套if语句| 可在另一个if或else if语句中使用一个if或else if语句。|
|switch语句| switch语句允许根据值列表测试变量的相等性。|
|select语句| select语句与switch语句类似，因为case语句指的是通道通信。|

循环控制语句：break、continue、goto

### for

Go 只有一种循环结构 —— for 循环。（while语句通过for实现）

基本的 for 循环包含三个由分号分开的组成部分：
- 初始化语句：在第一次循环执行前被执行
- 循环条件表达式：每轮迭代开始前被求值
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

### if

就像 for 循环一样，Go 的 if 语句也不要求用( ) 将条件括起来，同时，{ }还是必须有的
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

### switch

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

defer 语句会延迟函数的执行直到上层函数返回。
- 延迟调用的参数会立刻生成，但是在上层函数返回前函数都不会被调用
- 延迟的函数调用被压入一个栈中。当函数返回时， 会按照后进先出的顺序调用被延迟的函数调用。
 
```go
func main() {     
fmt.Println("counting")      
for i := 0; i < 10; i++ {  //defer会将后面的语句压栈
   defer fmt.Println(i)     
} //输出9，8，7，。。。
fmt.Println("done") 
}
```
 
## 指针

类型 *T 是指向类型 T的值的指针。其零值是 nil 。不同于C，go指针没有指针运算！

```go
var p *int
i := 42 
p = &i
fmt.Println(*p) // 通过指针 p 读取 
i *p = 21         // 通过指针 p 设置 i
```

指针有很多但很简单的概念，它们对Go编程非常重要。

下面几个重要的指针概念，对于Go程序员应该要清楚：

|概念| 描述|
|---|---|
| [Go指针数组](http://www.yiibai.com/go/go_array_of_pointers.html)| 可以定义数组来保存一些指针|
| Go指针的指针| Go允许有指针指向指针等等|
| 传递指针到函数| 通过引用或地址传递参数都允许被调用函数在调用函数中更改传递的参数。|
 
## 结构体

一个结构体( struct )就是一个字段的集合。(而 type 的含义跟其字面意思相符。)
- Go的结构体和C的基本上一样，不过在初始化时有些不一样，Go支持带名字的初始化
- go中的struct可以实现oop中的类、方法。go语言中的struct成员可以是任何类型，如普通类型、复合类型、函数、struct、interface等。
 
```go
type Vertex struct {
X int     
Y int 
}  
func main() {     
fmt.Println(Vertex{1, 2}) //大括号！初始化
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
 
注意：Go语言中没有public, protected, private的关键字，所以，如果你想让一个方法可以被别的包访问的话，你需要把这个方法的第一个字母大写。这是一种约定。


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

## 结构体方法

go语言中的oop很另类，类在go里面叫做receiver，receiver可以是除了interface之外的任何类型。方法和类并非组织在一起，传统的oop方法和类放在一个文件里面，而go语言只要在同一个包里就可，可分散在不同文件里。go的理念就是数据和实现分离

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

## 数组（array）

```go
var a [10]int //定义数组时需要制定大小s
```

- 数组的长度是其类型的一部分，因此数组不能改变大小——怎么办？用slice！
- 数组在Go语言中很重要，应该需要了解更多的信息。以下几个与数组相关的重要概念应该向Go程序员明确：

| 概念| 描述|
|---|---|
|多维数组|Go支持多维数组，多维数组的最简单的形式是二维数组。|
| 将数组传递给函数| 可以通过指定数组的名称而不使用索引，将指向数组的指针传递给函数。|
 
 
## 切片(slice)
 
一个 slice 会指向一个序列的值，并且包含了长度信息。slice包含了array的基本操作

```go
func main() {
x := [3]int{3,5,6} //指明大小就是array！否则slice
x := [3]int{} //数组
s := []int{2, 3, 5, 7, 11, 13}
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

- 不只是数组，go语言中的大多数类型在函数中当作参数传递都是值语义的。也就是任何值语义的一种类型当作参数传递到调用的函数中，都会经过一次内容的copy，从一个方法栈中copy到另一个方法栈
- go说到底不是一种纯粹的面向对象的语言，更多的是一种更简单高效的C，所以在参数传递上跟C保持着基本的一致性。一些较大的数据类型，比如结构体、数组等，最好使用传递指针的方式，这样就能避免在函数传递时对数据的copy。
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

映射(Map)，它将唯一键映射到值。 键是用于在检索值的对象。 给定一个键和一个值就可以在Map对象中设置值

```go
var countryCapitalMap map[string]string    
/* create a map*/    
countryCapitalMap = make(map[string]string) //string -> string
/* insert key-value pairs in the map*/    
countryCapitalMap["France"] = "Paris"
delete(countryCapitalMap,"France");//删除
   /* print map using keys*/    
for country := range countryCapitalMap {       
   fmt.Println("Capital of",country,"is",countryCapitalMap[country])    
}
// `range` on map iterates over key/value pairs.     
kvs := map[string]string{"a": "apple", "b": "banana"} //初始化！
for k, v := range kvs {         
fmt.Printf("%s -> %s\n", k, v)     
}      
// `range` can also iterate over just the keys of a map.     
for k := range kvs {         
    fmt.Println("key:", k)     
}      
// `range` on strings iterates over Unicode code points. The first value is the starting byte index of the `rune` and the second the `rune` itself.     
for i, c := range "go" {  //字符串时遍历字符
   fmt.Println(i, c)     
}
//嵌套map
m := map[string]map[string]string{}
mm, ok := m["kkk"]
if !ok {
    mm = make(map[string]string)
    m["kkk"] = mm
}
mm[k1k1k1] = "sssss"
```

- 【2017-06-21】map存在性判断

if _, ok := map[key]; ok {//存在}
- 【教训】go禁止对map成员取地址。。。但slice成员可以，好变态

```go
test := map[string]int{"a":1,"b":2}
// ./multi_map.go:34: cannot take the address of test["a"]
fmt.Println("三层取地址:",&copyWriteDict["female"][1]) //slice成员可以取地址
fmt.Println("三层取地址:",&copyWriteDict["female"][1]["real"]) //cannot take the address of copy
```

解决办法：
- （1）不传指针 
- （2）提前用临时变量缓存，再传非map类的地址


## golang log使用

Golang的标准库提供了log的机制，但是该模块的功能较为简单（看似简单，其实他有他的设计思路）。不过比手写fmt. Printxxx还是强很多的。至少在输出的位置做了线程安全的保护。其官方手册见Golang log (天朝的墙大家懂的)。

一个简单使用的例子：

```go
package main
import ( 
    "log"
)
func main(){ 
    log.Fatal("Come with fatal,exit with 1 \n")
}
```

编译运行后，会看到程序打印了 Come with fatal,exit with 1 然后就退出了，如果用 echo $? 查看退出码，会发现是 “1”。

## 一般接口

Golang's log模块主要提供了3类接口。分别是 “Print 、Panic 、Fatal ”。当然是用前先包含log包。
- import( "log")
为了方便是用，Golang和Python一样，在提供接口时，提供一个简单的包级别的使用接口。不同于Python，其输出默认定位到标准错误 可以通过SetOutput 进行修改。
对每一类接口其提供了3中调用方式，分别是 "Xxxx 、 Xxxxln 、Xxxxf" 比如对于Print就有:
- log.Print, log.Printf, log.Println
- log.Print ：表示其参数的调用方式和 fmt.Print 是类似的，即输出对象而不用给定特别的标志符号。
- log.Printf ： 表示其参数的调用方式和 fmt.Printf 是类似的，即可以用C系列的格式化标志表示输出对象的类型，具体类型表示 可以参考fmt.Printf的文档
- log.Println： 表示其调用方式和fmt.Println 类似，其和log.Print基本一致，仅仅是在输出的时候多输出一个换行
更多[参考](http://gotaly.blog.51cto.com/8861157/1405754)

## 接口interface

Go编程提供了另一种称为接口(interfaces)的数据类型，它代表一组方法签名。struct数据类型实现这些接口以具有接口的方法签名的方法定义。
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

Go具有两个分配内存的机制，分别是内建的函数new和make。他们所做的事不同，所应用到的类型也不同，这可能引起混淆，但规则却很简单。
- new 是一个分配内存的内建函数，但不同于其他语言中同名的new所作的工作，它只是将内存清零，而不是初始化内存。new(T)为一个类型为T的新项目分配了值为零的存储空间并返回其地址，也就是一个类型为*T的值。用Go的术语来说，就是它返回了一个指向新分配的类型为T的零值的指针。
- make(T, args)函数的目的与new(T)不同。它仅用于创建切片、map和chan（消息管道），并返回类型T（不是*T）的一个被初始化了的（不是零）实例。这种差别的出现是由于这三种类型实质上是对在使用前必须进行初始化的数据结构的引用。例如，切片是一个具有三项内容的描述符，包括指向数据（在一个数组内部）的指针、长度以及容量，在这三项内容被初始化之前，切片值为nil。对于切片、映射和信道，make初始化了其内部的数据结构并准备了将要使用的值

new不常使用

## 通道channel

通道是连接并发goroutine的管道。（队列，先进先出，非栈）
- 可以从一个goroutine向通道发送值，并在另一个goroutine中接收到这些值。
- 使用make(chan val-type)创建一个新通道，通道由输入的值传入。
- 使用通道 <- 语法将值发送到通道

### 通道

```go
package main  
import "fmt" 

func main() {      
// Create a new channel with `make(chan val-type)`.     
// Channels are typed by the values they convey.     
messages := make(chan string)//默认无缓冲，只能存储一个值
messages := make(chan string, 2) //设置缓冲，存储2个值（先进先出）
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

```go
// Here we `make` a channel of strings buffering up to  2 values.     
messages := make(chan string, 2)      
// Because this channel is buffered, we can send these values into the channel without a corresponding concurrent receive.     
messages <- "buffered"     
messages <- "channel"      
// Later we can receive these two values as usual.     
fmt.Println(<-messages)     
fmt.Println(<-messages) //输出buffered、channel
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

Go语言的选择(select)可等待多个通道操作。将goroutine和channel与select结合是Go语言的一个强大功能。

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

 
## defer

Go语言引入了Defer来确保那些被打开的文件能被关闭
Go的defer语句预设一个函数调用（延期的函数），该调用在函数执行defer返回时立刻运行。该方法显得不同常规，但却是处理上述情况很有效，无论函数怎样返回，都必须进行资源释放。

一个defer函数的示例：

```go
for i := 0; i < 5; i++ {  
    defer fmt.Printf("%d ", i) 
}
```

被延期的函数以后进先出（LIFO）的顺行执行，因此以上代码在返回时将打印4 3 2 1 0

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


## 时间

时间戳 
- 当前时间戳
  - fmt.Println(time.Now().Unix())  # 1389058332
- str格式化时间
  - 当前格式化时间
  - fmt.Println(time.Now().Format("2006-01-02 15:04:05"))  // 这是个奇葩,必须是这个时间点, 据说是go诞生之日, 记忆方法:6-1-2-3-4-5 # 2014-01-07 09:42:20
- 时间戳转str格式化时间
  - str_time := time.Unix(1389058332, 0).Format("2006-01-02 15:04:05")
  - fmt.Println(str_time) # 2014-01-07 09:32:12
- str格式化时间转时间戳
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

## go与json

Go内置了对JSON数据的编码和解码，这些数据的类型包括内置数据类型和自定义数据类型。
内置的encoding/json反序列化方法：《[go语言json简洁](http://cizixs.com/2016/12/19/golang-json-guide)》
- struct：需要提前知道json内容格式
- interface：未限定格式，任意动态的内容都可以解析成 interface，但缺点是必须自己做类型转换
- 延迟解析：json.RawMessage
- 自定义解析

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
type Response2 struct {
    Page   int      `json:"page"`
    Fruits []string `json:"fruits"`
} //golang json里的struct变量首字母需要大写的，如果给你的json是小写咋办？在type后面跟着别名就可以了，格式是 json:"字段名"
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


## Sync 用法

刚才看golang的sync的包，看见一个很有用的功能。就是WaitGroup。
先说说WaitGroup的用途：它能够一直等到所有的goroutine执行完成，并且阻塞主线程的执行，直到所有的goroutine执行完成。
这里要注意一下，他们的执行结果是没有顺序的，调度器不能保证多个 goroutine 执行次序，且进程退出时不会等待它们结束。
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

## Go语言单元测试

【2017-07-13】新功能引入旧策略bug（回归测试）

Go语言似乎是个偏执狂，牺牲了不必要的灵活性，带来一些强制的编程风格和约定。比如：
- 无任何形式的Makefile，模块就是目录、包就是目录、编译配制就是目录！
- 不光目录被用上了，文件名还能指定用途。文件名后缀为_test.go的都是单元测试文件，_linux32.go就是32位linux特定的代码。
- 不光文件名被用上了，函数名还有特定用途。
  - 在单元测试文件中，测试函数以Test开头。
  - 以大写字母开头的变量、类型和函数是外部可见的，小写字母开头的变量、类型和函数是外部不可见的。
类似的约定也不好说是go语言首创，在一些文件格式中也有类似规范。但是我暂时不知道到有什么其它编程语言对编程风格这么带强制性。

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
1. 命名：骆驼命名法（不要用下划线）

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

    // 变量初始化
    var v4 int = 10
    // 等价于:
    var v5 = 10
    // 一般这样就好
    v6 := 10

    // 赋值，多重赋值
    v1 = 10
    v2, v3 = 20, "test"
    // 匿名变量 _
    _, v4 = v5, v6

    fmt.Println(v1, v2, v3, v4)

    // 常量
    const Pi float64 = 3.1415926
    const MaxPlayer = 10

    // 枚举
    const (
        Sunday = iota // iota从0递增
        Mondy
        Tuesday
        // ...
    )

    // 类型
    // 1. 布尔
    var b1 bool
    b1 = true
    b1 = (1 == 2)

    fmt.Println(b1)

    // 2. 整形
    // int8 uint8 int16 uint16 int32 uint32 int64 uint64 int uint uintptr
    var i32 int32
    // 强制转换
    i32 = int32(64)
    // 运算：+, -, *, /, %（求余）
    // 比较：>, <, ==, >=, <=, !=
    // 位运算：x << y, x >> y, x ^ y, x & y, x | y, ^x （取反）

    fmt.Println(i32)

    // 3. 浮点
    // float32, float64
    var f1 float64 = 1.0001
    var f2 float64 = 1.0002
    // 浮点比较
    isEqual := math.Dim(f1, f2) < 0.0001

    fmt.Println(isEqual)

    // 4. 字符串
    var s1 string
    s1 = "abc"
    // 字符串连接
    s1 = s1 + "ddd"
    // 取长度
    n := len(s1)
    // 取字符
    c1 := s1[0]
    // 反引号，不转义，常用于正则表达式
    s1 = `\w+`

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
    }{{"Tim", 18}, {"Jim", 20}}

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

    delete(m2, 1)

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

    switch {
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
    // 小写为private
    x, y float64
    // 大写为public
    Width, Height float64
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

// 匿名组合
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

// once.Do(someFunction)

// 7. 网络编程
// import "net"
// net.Dial("tcp", "127.0.0.1:8080")

// 8. json处理
// import "encoding/json"
// json.Marshal(obj) 序列化
// json.Unmarshal() 反序列化

// 9. Web开发
// import "net/http"
// 模板
// import "html/template"

// 10. 常用库
// import "os"
// import "io"
// import "flag"
// import "strconv"
// import "crypto/sha1"
// import "crypto/md5"

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
// import "io/ioutil"
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
// import "time"
func TestTimeDemo(t *testing.T) {
    // Parse
    postDate, err := time.Parse("2006-01-02 15:04:05", "2015-09-30 19:19:00")
    fmt.Println(postDate, err)

    // Format
    assert.Equal(t, "2015/Sep/30 07:19:00", postDate.Format("2006/Jan/02 03:04:05"))
    assert.Equal(t, "2015-09-30T19:19:00Z", postDate.Format(time.RFC3339))
}

// 4. 正则表达式
// import "regexp"
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


# 经验总结

## Go的50坑：新Golang开发者要注意的陷阱、技巧和常见错误

Go的50坑：新Golang开发者要注意的陷阱、技巧和常见错误

### 初级篇

- 开大括号不能放在单独的一行
- 未使用的变量
- 未使用的Imports
- 简式的变量声明仅可以在函数内部使用
- 使用简式声明重复声明变量
- 偶然的变量隐藏Accidental Variable Shadowing
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

