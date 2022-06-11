---
layout: post
title:  设计模式-Design Pattern
subtitle:   各类设计模式
date:   2019-12-19 15:43:00
author:  wangqiwen
categories: 编程语言
tags: 设计模式 编程技能 UML
excerpt: C/C++编程语言笔记
mathjax: true
header-img: img/post-bg-ios10.jpg
catalog: true
---

* content
{:toc}

# 总结

- [github地址](https://github.com/me115/design_patterns)
- [图说设计模式](https://design-patterns.readthedocs.io/zh_CN/latest/)
- [设计模式C++实现笔记](https://www.jianshu.com/c/c3f6140b8315)
- [C++ 设计模式](https://blog.csdn.net/liang19890820/article/details/66974516)
- [C++设计模式代码地址](https://github.com/Waleon/DesignPatterns)
- [设计模式(可复用面向对象的软件的基础)](https://pan.baidu.com/disk/home#/all?path=%2FLearning_Note%2F%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9B%BE%E4%B9%A6%2F%E8%BD%AF%E4%BB%B6%E5%B7%A5%E7%A8%8B%E5%92%8C%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86&vmode=list)
- [C++设计模式视频](https://www.bilibili.com/video/av52251106)


# 设计模式

一张图总结 [23种设计模式关系](https://cloud.tencent.com/developer/article/1034577)
- ![](http://dl.iteye.com/upload/attachment/0083/1179/57a92d42-4d84-3aa9-a8b9-63a0b02c2c36.jpg)

## 22种设计模式的C++实现

[22种设计模式的C++实现](https://zhuanlan.zhihu.com/p/476220724)
- [代码仓库](https://github.com/TOMO-CAT/CppDesignPattern)

### 前置知识

* [UML类图与面向对象编程](https://www.yuque.com/tomocat/txc11h/ggfxqt)
* [软件设计原则与SOLID原则](https://www.yuque.com/tomocat/txc11h/smpv9w)

### 创建型模式

1. [工厂方法模式（Factory Method）](https://www.yuque.com/tomocat/txc11h/ibccsp)
2. [抽象工厂模式（Abstract Factory）](https://www.yuque.com/tomocat/txc11h/idexyk)
3. [生成器模式（Builder）](https://www.yuque.com/tomocat/txc11h/lzc73y)
4. [原型模式（Prototype）](https://www.yuque.com/tomocat/txc11h/uanyqa)
5. [单例模式（Singleton）](https://www.yuque.com/tomocat/txc11h/dq5xse)

```c++
//========== Singleton.h ===========
#ifndef SINGLETON_H_
#define SINGLETON_H_

#include <iostream>
#include <string>

class Singleton {
 public:
    static Singleton* GetInstance() {
        if (instance_ == nullptr) {
            instance_ = new Singleton();
        }
        return instance_;
    }
 private:
    Singleton() {}
    static Singleton* instance_;
};

#endif  // SINGLETON_H_
// ================= Singlton.cpp =========
#include "Singleton.h"

// 静态变量instance初始化不要放在头文件中, 如果多个文件包含singleton.h会出现重复定义问题
Singleton* Singleton::instance_ = nullptr;
//================== main.cpp ===========
#include <iostream>
#include "Singleton.h"

int main() {
    Singleton *s1 = Singleton::GetInstance();
    Singleton *s2 = Singleton::GetInstance();

    std::cout << "s1地址: " << s1 << std::endl;
    std::cout << "s2地址: " << s2 << std::endl;
    return 0;
}

```

编译运行：

```shell
g++ -g main.cpp Singleton.cpp -std=c++11 -o singleton
./singleton 
# s1地址: 0x95a040
# s2地址: 0x95a040
```


### 结构型模式

1. [适配器模式（Adapter）](https://www.yuque.com/tomocat/txc11h/gxqi5t)
2. [桥接模式（Bridge）](https://www.yuque.com/tomocat/txc11h/uprdy7)
3. [组合模式（Composite）](https://www.yuque.com/tomocat/txc11h/ma2o38)
4. [装饰模式（Decorator）](https://www.yuque.com/tomocat/txc11h/xpq6gl)
5. [外观模式（Facade）](https://www.yuque.com/tomocat/txc11h/hn35tg)
6. [享元模式（Flyweight）](https://www.yuque.com/tomocat/txc11h/nlepg2)
7. [代理模式（Proxy）](https://www.yuque.com/tomocat/txc11h/rckuhg)

### 行为型模式

1. [责任链模式（Chain of Responsibility）](https://www.yuque.com/tomocat/txc11h/wrxva9)
2. [命令模式（Command）](https://www.yuque.com/tomocat/txc11h/ot2s5n)
3. [迭代器模式（Iterator）](https://www.yuque.com/tomocat/txc11h/gnnfxz)
4. [中介者模式（Mediator）](https://www.yuque.com/tomocat/txc11h/oao48u)
5. [备忘录模式（Memento）](https://www.yuque.com/tomocat/txc11h/tyg1v4)
6. [观察者模式（Observer）](https://www.yuque.com/tomocat/txc11h/if8ga9)
7. [状态模式（State）](https://www.yuque.com/tomocat/txc11h/cm34i3)
8. [策略模式（Strategy）](https://www.yuque.com/tomocat/txc11h/pql7er)
9. [模板方法模式（Template Method）](https://www.yuque.com/tomocat/txc11h/fm5hlm)
10. [访问者模式（Vistor）](https://www.yuque.com/tomocat/txc11h/uix9hy)

## 分类

- 创建型模式，共5种：工厂方法模式、抽象工厂模式、单例模式、建造者模式、原型模式。
- 结构型模式，共7种：适配器模式、装饰器模式、代理模式、外观模式、桥接模式、组合模式、享元模式。
- 行为型模式，共11种：策略模式、模板方法模式、观察者模式、迭代子模式、责任链模式、命令模式、备忘录模式、状态模式、访问者模式、中介者模式、解释器模式。
- 其实还有两类：**并发**型模式和**线程池**模式。

- 【2020-1-27】[图解23种设计模式](https://cloud.tencent.com/developer/article/1190060)，两张图；另一个[版本](https://www.jianshu.com/p/4a02646f7c9d)，包含23种模式总结
- 【2022-3-27】[非常简洁的设计模式备忘录，英文、中文各一版](https://www.toutiao.com/w/1728260246562827)
- ![](https://p9.toutiaoimg.com/img/tos-cn-i-qvj2lq49k0/2100743ddc4040389bfe4750acd56c7b~tplv-obj:1700:2200.image?from=post)
- ![](https://p9.toutiaoimg.com/img/tos-cn-i-qvj2lq49k0/4239b80af4ec4448b4db2606d96ddba4~tplv-obj:1700:2200.image?from=post)


## 设计模式原则

总原则：**开闭原则**（Open Close Principle）
- 开闭原则就是说对扩展开放，对修改关闭。在程序需要进行拓展的时候，不能去修改原有的代码，而是要扩展原有代码，实现一个热插拔的效果。所以一句话概括就是：为了使程序的扩展性好，易于维护和升级。想要达到这样的效果，我们需要使用接口和抽象类等，后面的具体设计中我们会提到这点。

软件设计原则与SOLID原则

## 1、单一职责原则

不要存在多于一个导致类变更的原因，也就是说每个类应该实现单一的职责，如若不然，就应该把类拆分。

## 2、里氏替换原则（Liskov Substitution Principle）

里氏代换原则(Liskov Substitution Principle LSP)面向对象设计的基本原则之一。 里氏代换原则中说，任何基类可以出现的地方，子类一定可以出现。 LSP是继承复用的基石，只有当衍生类可以替换掉基类，软件单位的功能不受到影响时，基类才能真正被复用，而衍生类也能够在基类的基础上增加新的行为。里氏代换原则是对“开-闭”原则的补充。实现“开-闭”原则的关键步骤就是抽象化。而基类与子类的继承关系就是抽象化的具体实现，所以里氏代换原则是对实现抽象化的具体步骤的规范。—— From Baidu 百科

历史替换原则中，子类对父类的方法尽量不要重写和重载。因为父类代表了定义好的结构，通过这个规范的接口与外界交互，子类不应该随便破坏它。

## 3、依赖倒转原则（Dependence Inversion Principle）

这个是开闭原则的基础，具体内容：面向接口编程，依赖于抽象而不依赖于具体。写代码时用到具体类时，不与具体类交互，而与具体类的上层接口交互。

## 4、接口隔离原则（Interface Segregation Principle）

这个原则的意思是：每个接口中不存在子类用不到却必须实现的方法，如果不然，就要将接口拆分。使用多个隔离的接口，比使用单个接口（多个接口方法集合到一个的接口）要好。

## 5、迪米特法则（最少知道原则）（Demeter Principle）

就是说：一个类对自己依赖的类知道的越少越好。也就是说无论被依赖的类多么复杂，都应该将逻辑封装在方法的内部，通过public方法提供给外部。这样当被依赖的类变化时，才能最小的影响该类。

最少知道原则的另一个表达方式是：只与直接的朋友通信。类之间只要有耦合关系，就叫朋友关系。耦合分为依赖、关联、聚合、组合等。我们称出现为成员变量、方法参数、方法返回值中的类为直接朋友。局部变量、临时变量则不是直接的朋友。我们要求陌生的类不要作为局部变量出现在类中。

## 6、合成复用原则（Composite Reuse Principle）

原则是尽量首先使用合成/聚合的方式，而不是使用继承。


## C++ 面向对象设计

- 封装：隐藏内部实现
- 继承：复用现有代码
- 多态：改写对象行为

设计模式关键在于**分解**和**抽象**; 设计模式的主要目的是**易于变化**

**面向对象设计原则--比设计模式更加重要**

违背了设计原则，设计模式是错误的。

- **依赖倒置原则**(DIP)--实现隔离变化
  - 高层模块(稳定)不应该依赖于底层模块(变化)，二者都应该依赖于抽象(稳定)。
  - 抽象(稳定)不应该依赖于实现细节(变化)，细节应该依赖于抽象(稳定)。
  - 解释，将需要变动的部分，作为稳定公共抽象基类的子类，将公共方法写在基类中，关键方法作为虚函数交给子类实现。调用公共函数时，只用管理基类指针，使用基类指针调用公共虚函数，就可以调用对应的子函数。实现稳定与不稳定的隔离。
- **开放封闭原则**(OCP):
  - 对扩展开放，对更改封闭
  - 类模块应该是可扩展的，但是不可修改。
  - 解释：增加中间抽象，避免过多的更改，保证可扩展性。
- **单一职责原则**(SRP)
  - 一个类应该仅有一个引起它变化的原因。
  - 变化的方向隐含着类的责任
- **Liskov替换原则**(LSP)
  - 子类必须能够替换他们的基类(IS-A)
  - 继承表达抽象。
- **接口隔离**(ISP)
  - 不应该强迫客户程序依赖它们不用的方法。
  - 接口应该小而完备。
- 优先使用对象组合，而不是类继承
  - 继承类通常为"白箱复用"，对象组合通常为"黑箱复用"。
  - 继承在某种程度上破坏了封装性，子类父类耦合度高。
  - 对象组合则只被要求被组合的对象具有良好定义的接口，耦合度低。
- 封装变化点
  - 使用封装来创建对象之间的分界层，让设计者可以在分界层中任意一侧进行修改，而不会对另外一侧产生不良的影响，从而实现层次间的松耦合。
- 针对接口编程，而不是针对实现编程
  - 不将变量类型声明为某个具体的类，而是声明为某个接口。
  - 客户端程序无需获知对象的具体类型，只需要知道对象所具有的接口。
  - 减少系统中各个部分的依赖关系，从而实现“高内聚”、“松耦合”的类型设计方案。

## 接口标准化

- 设计习语：描述与特定编程语言相关的低层模式，技巧，惯用法(例如，effictive C++等)
- 设计模式：描述“类与相互通信的对象之间的组织关系，包括它们的角色，职责，协作方式等方面”。
- 架构模式：描述系统中与基本结构组织关系密切的高层模式，包括子系统划分，职责，以及如果组织它们之间关系的规则。

## C++ 模板化方法

COF-23设计模式分类

- 从目的来看
  - 创建型：将对象的部分创建工作延迟到子类，或者其它对象，从而应对需求变化为对象创建具体的类时，带来的冲击
  - 结构型：通过类的继承或者对象的组合获得更加灵活的结构，从而应对需求变化为对象的结构带来的冲击。
  - 行为型：通过类继承或者对象的组合，明确类与对象间的职责，从而应对需求变化为多个交互的对象的冲击。
- 从范围来看：
  - 类模式处理与子类的静态关系
  - 对象模式处理对象之间的动态关系。

## 从封装变化角度对模式分类

### 重构的关键技法

- 静态-> 动态
- 早绑定 -> 晚绑定：前调用后—>后调用前
- 继承 -> 组合
- 编译时依赖  -> 运行时依赖
- 紧耦合 -> 松耦合

### “组建协作”模式：

- “框架与应用”分离，“组件协作”模式通过晚期绑定,来实现框架与应用之间的松耦合，是二者之间协作时常用的模式。

#### 模板方法

定义一个操作中的算法的骨架(稳定)，而将一些操作(变化)延迟到子类(通常使用虚函数)。Temlpate Method使得子类可以(复用)一个算法的结构即可重定义(override重写)；某些特定的步奏。

**设计模式的核心，在于查找稳定部分非稳定部分，用不同的模式，来设计两者之间的关系**

![设计模式](https://img-blog.csdn.net/2018051615452165?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L1dpS2lfU3U=/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)


# 看懂UML类图和时序图
 
## 图说设计模式阅读笔记-创建型模式

## 简单工厂模式( Simple Factory Pattern )


### 1.1 模式动机
--------------------
考虑一个简单的软件应用场景，一个软件系统可以提供多个外观不同的按钮（如圆形按钮、矩形按钮、菱形按钮等），
这些按钮都源自同一个基类，不过在继承基类后不同的子类修改了部分属性从而使得它们可以呈现不同的外观，如果我们希望在使用这些按钮时，不需要知道这些具体按钮类的名字，只需要知道表示该按钮类的一个参数，并提供一个调用方便的方法，把该参数传入方法即可返回一个相应的按钮对象，此时，就可以使用简单工厂模式。 

### 1.2 模式定义
--------------------
简单工厂模式(Simple Factory Pattern)：又称为静态工厂方法(Static Factory Method)模式，它属于类创建型模式。在简单工厂模式中，可以根据参数的不同返回不同类的实例。简单工厂模式专门定义一个类来负责创建其他类的实例，被创建的实例通常都具有共同的父类。


### 1.3 模式结构

简单工厂模式包含如下角色：

- Factory：工厂角色
    工厂角色负责实现创建所有实例的内部逻辑
- Product：抽象产品角色
    抽象产品角色是所创建的所有对象的父类，负责描述所有实例所共有的公共接口
- ConcreteProduct：具体产品角色
    具体产品角色是创建目标，所有创建的对象都充当这个角色的某个具体类的实例。

![_static/SimpleFactory.jpg](https://design-patterns.readthedocs.io/zh_CN/latest/_images/SimpleFactory.jpg)

### 1.4 时序图
--------------------

![时序图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/seq_SimpleFactory.jpg)

### 1.5 代码分析
--------------------

```c++
///////////////////////////////////////////////////////////
//  Factory.cpp
//  Implementation of the Class Factory
//  Created on:      01-十月-2014 18:41:33
//  Original author: colin
///////////////////////////////////////////////////////////

#include "Factory.h"
#include "ConcreteProductA.h"
#include "ConcreteProductB.h"
Product* Factory::createProduct(string proname){
	if ( "A" == proname )
	{
		return new ConcreteProductA();
	}
	else if("B" == proname)
	{
		return new ConcreteProductB();
	}
	return  NULL;
}
```


### 1.6 模式分析
--------------------

- 将对象的创建和对象本身业务处理分离可以降低系统的耦合度，使得两者修改起来都相对容易。
- 在调用工厂类的工厂方法时，由于工厂方法是静态方法，使用起来很方便，可通过类名直接调用，而且只需要传入一个简单的参数即可，在实际开发中，还可以在调用时将所传入的参数保存在XML等格式的配置文件中，修改参数时无须修改任何源代码。
- 简单工厂模式最大的问题在于工厂类的职责相对过重，增加新的产品需要修改工厂类的判断逻辑，这一点与开闭原则是相违背的。
- 简单工厂模式的要点在于：当你需要什么，只需要传入一个正确的参数，就可以获取你所需要的对象，而无须知道其创建细节。

### 实例
--------------------

```c++
/* Product.h */
/* 定义产品 */

class Product
{

public:
	Product();
	virtual ~Product();
	
	virtual void Use() = 0;

};

/* 定义不同的产品 */
#include "Product.h"
#include <string>
using namespace std;

class ConcreteProductA : public Product
{

public:
	ConcreteProductA();
	virtual ~ConcreteProductA();
	virtual void Use();

};
void ConcreteProductA::Use()
{
	cout << "use productB" << endl;
}

class ConcreteProductB : public Product
{
public:
	ConcreteProductB();
	virtual ~ConcreteProductB();
	
	virtual void Use();

};
void ConcreteProductB::Use()
{
	cout << "use productB" << endl;	
}
/* 定义工厂类 */
class Factory
{

public:
	Factory();
	virtual ~Factory();

	static Product * createProduct(string proname);

};
/* 工厂类的实现函数 */
Product* Factory::createProduct(string proname){
	if ( "A" == proname )
	{
		return new ConcreteProductA();
	}
	else if("B" == proname)
	{
		return new ConcreteProductB();
	}
	return  NULL;
}

/* 使用实例 */

int main(int argc, char *argv[])
{
	Product * prod = Factory::createProduct("A");
	prod->Use();
	delete prod;
	return 0;
}

```

简单工厂模式的优点
--------------------

- 工厂类含有必要的判断逻辑，可以决定在什么时候创建哪一个产品类的实例，客户端可以免除直接创建产品对象的责任，而仅仅“消费”产品；简单工厂模式通过这种做法实现了对责任的分割，它提供了专门的工厂类用于创建对象。
- 客户端无须知道所创建的具体产品类的类名，只需要知道具体产品类所对应的参数即可，对于一些复杂的类名，通过简单工厂模式可以减少使用者的记忆量。
- 通过引入配置文件，可以在不修改任何客户端代码的情况下更换和增加新的具体产品类，在一定程度上提高了系统的灵活性。

简单工厂模式的缺点
--------------------

- 由于工厂类集中了所有产品创建逻辑，一旦不能正常工作，整个系统都要受到影响。
- 使用简单工厂模式将会增加系统中类的个数，在一定程序上增加了系统的复杂度和理解难度。
- 系统扩展困难，一旦添加新产品就不得不修改工厂逻辑，在产品类型较多时，有可能造成工厂逻辑过于复杂，不利于系统的扩展和维护。
- 简单工厂模式由于使用了静态工厂方法，造成工厂角色无法形成基于继承的等级结构。

适用环境
--------------------
在以下情况下可以使用简单工厂模式：

- 工厂类负责创建的对象比较少：由于创建的对象较少，不会造成工厂方法中的业务逻辑太过复杂。
- 客户端只知道传入工厂类的参数，对于如何创建对象不关心：客户端既不需要关心创建细节，甚至连类名都不需要记住，只需要知道类型所对应的参数。

模式应用
--------------------
1. JDK类库中广泛使用了简单工厂模式，如工具类java.text.DateFormat，它用于格式化一个本地日期或者时间。

```java
public final static DateFormat getDateInstance();
public final static DateFormat getDateInstance(int style);
public final static DateFormat getDateInstance(int style, Locale locale);
```

2. Java加密技术

获取不同加密算法的密钥生成器:

```java
KeyGenerator keyGen=KeyGenerator.getInstance("DESede");
```

创建密码器:

```java
Cipher cp=Cipher.getInstance("DESede");
```

### 1.12 总结

- 创建型模式对类的实例化过程进行了抽象，能够将对象的创建与对象的使用过程分离。
- 简单工厂模式又称为静态工厂方法模式，它属于类创建型模式。在简单工厂模式中，可以根据参数的不同返回不同类的实例。简单工厂模式专门定义一个类来负责创建其他类的实例，被创建的实例通常都具有共同的父类。
- 简单工厂模式包含三个角色：工厂角色负责实现创建所有实例的内部逻辑；抽象产品角色是所创建的所有对象的父类，负责描述所有实例所共有的公共接口；具体产品角色是创建目标，所有创建的对象都充当这个角色的某个具体类的实例。
- 简单工厂模式的要点在于：当你需要什么，只需要传入一个正确的参数，就可以获取你所需要的对象，而无须知道其创建细节。
- 简单工厂模式最大的优点在于实现对象的创建和对象的使用分离，将对象的创建交给专门的工厂类负责，但是其最大的缺点在于工厂类不够灵活，增加新的具体产品需要修改工厂类的判断逻辑代码，而且产品较多时，工厂方法代码将会非常复杂。
- 简单工厂模式适用情况包括：工厂类负责创建的对象比较少；客户端只知道传入工厂类的参数，对于如何创建对象不关心。


## 2 工厂方法模式(Factory Method Pattern)

### 2.1 模式动机

不仅仅只是调用对应的创建函数，更多的是定义具体的相关方法和属性(根据输入请求)；现在对该系统进行修改，不再设计一个按钮工厂类来统一负责所有产品的创建，而是将具体按钮的创建过程交给专门的工厂子类去完成，我们先定义一个抽象的按钮工厂类，再定义具体的工厂类来生成圆形按钮、矩形按钮、菱形按钮等，它们实现在抽象按钮工厂类中定义的方法。这种抽象化的结果使这种结构可以在不修改具体工厂类的情况下引进新的产品，如果出现新的按钮类型，只需要为这种新类型的按钮创建一个具体的工厂类就可以获得该新按钮的实例，这一特点无疑使得工厂方法模式具有超越简单工厂模式的优越性，更加符合“开闭原则”。

### 2.2 模式定义

工厂方法模式(Factory Method Pattern)又称为工厂模式，也叫虚拟构造器(Virtual Constructor)模式或者多态工厂(Polymorphic Factory)模式，它属于类创建型模式。在工厂方法模式中，工厂父类负责定义创建产品对象的公共接口，而工厂子类则负责生成具体的产品对象，这样做的目的是将产品类的实例化操作延迟到工厂子类中完成，即通过工厂子类来确定究竟应该实例化哪一个具体产品类。

### 2.3 模式结构和时序图

- Product：抽象产品
- ConcreteProduct：具体产品
- Factory：抽象工厂
- ConcreteFactory：具体工厂

模式结构：
- ![模式结构](https://design-patterns.readthedocs.io/zh_CN/latest/_images/FactoryMethod.jpg)

时序图：
- ![时序图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/seq_FactoryMethod.jpg)

### 2.4 代码分析

```c++
///////////////////////////////////////////////////////////
//  ConcreteFactory.cpp
//  Implementation of the Class ConcreteFactory
//  Created on:      02-十月-2014 10:18:58
//  Original author: colin
///////////////////////////////////////////////////////////

#include "Factory.h"
#include "ConcreteFactory.h"
#include "Product.h"
#include <iostream>
using namespace std;

Product* ConcreteFactory::factoryMethod(){

	return  new ConcreteProduct();
}

int main(int argc, char *argv[])
{
    //创建对应的工厂
	Factory * fc = new ConcreteFactory();
	//创建对应产品
    Product * prod = fc->factoryMethod();
	prod->use();
	delete fc;
	delete prod;
	return 0;
}
```

### 2.6 模式分析

工厂方法模式是简单工厂模式的进一步抽象和推广，将产品细分到各个子场中去。使用不同的厂来创建对应的产品。在工厂方法模式中，核心的工厂类不再负责所有产品的创建，而是将具体创建工作交给子类去做。这个核心类仅仅负责给出具体工厂必须实现的接口，而不负责哪一个产品类被实例化这种细节，这使得工厂方法模式可以允许系统在不修改工厂角色的情况下引进新产品。

### 2.7 实例

日志记录器

某系统日志记录器要求支持多种日志记录方式，如文件记录、数据库记录等，且用户可以根据要求动态选择日志记录方式， 现使用工厂方法模式设计该系统。

结构图：
- ![结构图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/loger.jpg)

时序图：
- ![时序图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/seq_loger.jpg)

### 2.8 工厂方法模式的优先

- 工厂无需关心细节，甚至无序知道具体产品的类名称。
- 工厂角色和茶农角色的多态性设计是工厂方法模式的关键。它能确定创建的产品对象；创建细节完全封装在具体工厂内部。所有的具体工厂类都具有同一抽象父类。
- 添加新产品时，只需要添加一个具体的工厂和具体产品就可以了，系统的扩展性较好，完全符合"开闭原则"。

### 2.9 工厂模式的缺点

- 添加新产品时，需要编写新的具体产品类，而且需要提供与之赌赢的工厂类，系统中类的个数将成对增加，会带来额外的编译开销。
- 由于考虑到系统的可扩展性，需要引入抽象层，在客户端代码中均使用抽象层进行定义，增加了系统的抽象性和理解难度，且在实现时可能需要用到DOM、反射等技术，增加了系统的实现难度。

### 2.10 适用环境

在以下情况下可以使用工厂方法模式：

- 一个类不知道它所需要的对象的类：在工厂方法模式中，客户端不需要知道具体产品类的类名，只需要知道所对应的工厂即可，具体的产品对象由具体工厂类创建；客户端需要知道创建具体产品的工厂类。
- 一个类通过其子类来指定创建哪个对象：在工厂方法模式中，对于抽象工厂类只需要提供一个创建产品的接口，而由其子类来确定具体要创建的对象，利用面向对象的多态性和里氏代换原则，在程序运行时，子类对象将覆盖父类对象，从而使得系统更容易扩展。
- 将创建对象的任务委托给多个工厂子类中的某一个，客户端在使用时可以无须关心是哪一个工厂子类创建产品子类，需要时再动态指定，可将具体工厂类的类名存储在配置文件或数据库中。

### 2.12 扩展模式

- 使用多个工厂方法：在抽象工厂角色中可以定义多个工厂方法，从而使具体工厂角色实现这些不同的工厂方法，这些方法可以包含不同的业务逻辑，以满足对不同的产品对象的需求。
- 产品对象的重复使用：工厂对象将已经创建过的产品保存到一个集合（如数组、List等）中，然后根据客户对产品的请求，对集合进行查询。如果有满足要求的产品对象，就直接将该产品返回客户端；如果集合中没有这样的产品对象，那么就创建一个新的满足要求的产品对象，然后将这个对象在增加到集合中，再返回给客户端。
- 多态性的丧失和模式的退化：如果工厂仅仅返回一个具体产品对象，便违背了工厂方法的用意，发生退化，此时就不再是工厂方法模式了。一般来说，工厂对象应当有一个抽象的父类型，如果工厂等级结构中只有一个具体工厂类的话，抽象工厂就可以省略，也将发生了退化。当只有一个具体工厂，在具体工厂中可以创建所有的产品对象，并且工厂方法设计为静态方法时，工厂方法模式就退化成简单工厂模式。

### 2.13 总结

- 工厂方法模式又称为工厂模式，它属于类创建型模式。产品类的是咯花操作延迟到工厂子类中完成，即通过工厂子类来确定具体实例化的类。
- 工厂方法模式包含四个角色：抽象产品是定义产品的接口，是工厂方法模式所创建对象的超类型，即产品对象的共同父类或接口；具体产品实现了抽象产品接口，某种类型的具体产品由专门的具体工厂创建，它们之间往往一一对应；抽象工厂中声明了工厂方法，用于返回一个产品，它是工厂方法模式的核心，任何在模式中创建对象的工厂类都必须实现该接口；具体工厂是抽象工厂类的子类，实现了抽象工厂中定义的工厂方法，并可由客户调用，返回一个具体产品类的实例。
- 系统可以在不修改工厂角色的情况下，引进新产品。
- 适合情况：
    - 一个类不需要直到它所需要的对象的类;
    - 一个类通过其子类来指定创建哪个对象；
    - 客户端产品在使用时无序关心是哪个工厂子类创建子产品，需要时再动态指定。


## 3 抽象工厂模式

### 3.1 模式动机

- 工厂模式中，需要一个模式能够提供多个产品对象。因此需要细化产品，通过产品等级结构(即产品的继承结构)、和产品族(同一个工厂生产的，位于不同产品等级结构的一组产品)
- 当系统所提供的工厂所需生产的具体产品并不是一个简单的对象，而是多个位于不同产品等级结构中属于不同类型的具体产品时需要使用抽象工厂模式。
- 抽象工厂模式是所有形式的工厂模式中最为抽象和最具一般性的一种形态。
- 抽象工厂模式与工厂方法模式最大的区别在于，工厂方法模式针对的是一个产品等级结构，而抽象工厂模式则需要面对多个产品等级结构，一个工厂等级结构可以负责多个不同产品等级结构中的产品对象的创建 。当一个工厂等级结构可以创建出分属于不同产品等级结构的一个产品族中的所有对象时，抽象工厂模式比工厂方法模式更为简单、有效率。
- 抽象工厂模式是所有形式的工厂模式中最为抽象和最具一般性的一种形态。
- 抽象工厂模式相对于工厂模式，更加抽象化。

### 3.2 模式定义

抽象工厂模式(Abstract Factory Pattern)：提供一个创建一系列相关或相互依赖对象的接口，而无须指定它们具体的类。抽象工厂模式又称为Kit模式，属于对象创建型模式。

### 3.3 模式结构和时序图

抽象工厂模式包含如下角色：

- AbstractFactory：抽象工厂
- ConcreteFactory：具体工厂
- AbstractProduct：抽象产品
- Product：具体产品

![抽象工厂模式](https://design-patterns.readthedocs.io/zh_CN/latest/_images/AbatractFactory.jpg)

时序图：
- ![时序图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/seq_AbatractFactory.jpg)

### 3.5 代码分析

```c
#include <iostream>
#include "AbstractFactory.h"
#include "AbstractProductA.h"
#include "AbstractProductB.h"
#include "ConcreteFactory1.h"
#include "ConcreteFactory2.h"
using namespace std;

int main(int argc, char *argv[])
{
	AbstractFactory * fc = new ConcreteFactory1();
	AbstractProductA * pa =  fc->createProductA();
	AbstractProductB * pb = fc->createProductB();
	pa->use();
	pb->eat();
	
	AbstractFactory * fc2 = new ConcreteFactory2();
	AbstractProductA * pa2 =  fc2->createProductA();
	AbstractProductB * pb2 = fc2->createProductB();
	pa2->use();
	pb2->eat();
}
///////////////////////////////////////////////////////////
//  ConcreteFactory1.cpp
//  Implementation of the Class ConcreteFactory1
//  Created on:      02-十月-2014 15:04:11
//  Original author: colin
///////////////////////////////////////////////////////////

#include "ConcreteFactory1.h"
#include "ProductA1.h"
#include "ProductB1.h"
/* 定义工厂生产线 */
AbstractProductA * ConcreteFactory1::createProductA(){
	return new ProductA1();
}


AbstractProductB * ConcreteFactory1::createProductB(){
	return new ProductB1();
}
///////////////////////////////////////////////////////////
//  ProductA1.cpp
//  Implementation of the Class ProductA1
//  Created on:      02-十月-2014 15:04:17
//  Original author: colin
///////////////////////////////////////////////////////////

#include "ProductA1.h"
#include <iostream>
using namespace std;
/* 产品函数功能 */
void ProductA1::use(){
	cout << "use Product A1" << endl;
}
```

### 3.8 优点

- 隔离了具体类的生成，使得客户端并不需要直到什么被创建。变换具体工厂就更加容易。所有的工厂体都实现了抽象工厂定义中的公共接口。应用抽象工厂模式可以实现高内聚低耦合的设计目的，因此抽象工厂模式得到了广泛的应用。
- 当一个产品族中的多个对象被设计成一起工作时，它能够保证客户端始终只使用同一个产品族中的对象。这对一些需要根据当前环境来决定其行为的软件系统来说，是一种非常实用的设计模式。
- 增加新的具体工厂和产品族很方便，无须修改已有系统，符合“开闭原则”。

### 3.9 缺点

- 添加新的产品对象时，可能需要对抽象工厂角色进行更改。
- 开闭原则的倾斜性（增加新的工厂和产品族容易，增加新的产品等级结构麻烦）。

### 3.10 适用环境

- 一个系统不应当依赖于产品类实例如何被创建、组合和表达的细节，这对于所有类型的工厂模式都是重要的。
- 系统中有多于一个的产品族，而每次只使用其中某一产品族。
- 属于同一个产品族的产品将在一起使用，这一约束必须在系统的设计中体现出来。
- 系统提供一个产品类的库，所有的产品以同样的接口出现，从而使客户端不依赖于具体实现。

### 3.11 应用

在很多软件系统中需要更换界面主题，要求界面中的按钮、文本框、背景色等一起发生改变时，可以使用抽象工厂模式进行设计。调用接口相同，只需要切换style工厂，就能实现内容的更新和设计。

### 3.12 模式扩展

- **开闭原则**：对系统扩展开放，对修改关闭，通过扩展达到增强其功能的目的。
- 抽象工厂模式以一种倾斜的方式支持增加新的产品，为新产品族的增加提供方便，但不能为新的产品等级结构的增加提供这样的方便。
- **工厂模式的退化**:当每个工厂只创建一个产品时，其退化为工厂方法模式。当工厂方法模式中抽象工厂与具体工厂合并时，提供一个统一的工厂来创建产品对象，并将创建的对象的工厂方法设计为静态方法时，工厂方法退化为简单工厂模式。

## 4. 建造者模式

### 4.1 模式动机


复杂对象的构建逐步分离，例如各个成员变量的初始化函数，和对应的不同成员变量的功能函数。不同的建造者实现的函数功能呢不同，最终产生的产品也不同

### 4.2 模式定义

造者模式(Builder Pattern)：将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。

建造者模式是一步一步创建一个复杂的对象，它允许用户只通过指定复杂对象的类型和内容就可以构建它们，用户不需要知道内部的具体构建细节。建造者模式属于对象创建型模式。根据中文翻译的不同，建造者模式又可以称为生成器模式。

### 4.3 模式结构

建造者模式包含如下角色：
- Builder：抽象建造者
- ConcreteBuilder：具体建造者
- Director：指挥者
- Product：产品角色

![建造者类图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/Builder.jpg)

时序图

![建造者时序图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/seq_Builder.jpg)

通过选择建造者，然后一步步实现产品的生产。

### 4.5 代码分析

```c
#include <iostream>
#include "ConcreteBuilder.h"
#include "Director.h"
#include "Builder.h"
#include "Product.h"

using namespace std;

int main(int argc, char *argv[])
{
	//获取建造者
	ConcreteBuilder * builder = new ConcreteBuilder();
	//操作者
	Director  director;
	//设置建造者
	director.setBuilder(builder);
	//创建产品
	Product * pd =  director.constuct();
	pd->show();
	
	delete builder;
	delete pd;
	return 0;
}
/* 建造者的定义 */

///////////////////////////////////////////////////////////
//  ConcreteBuilder.cpp
//  Implementation of the Class ConcreteBuilder
//  Created on:      02-十月-2014 15:57:03
//  Original author: colin
///////////////////////////////////////////////////////////

#include "ConcreteBuilder.h"

ConcreteBuilder::ConcreteBuilder(){

}

ConcreteBuilder::~ConcreteBuilder(){

}

void ConcreteBuilder::buildPartA(){
	m_prod->setA("A Style "); //不同的建造者，可以实现不同产品的建造  
}


void ConcreteBuilder::buildPartB(){
	m_prod->setB("B Style ");
}


void ConcreteBuilder::buildPartC(){
	m_prod->setC("C style ");
}
/* 定义建造函数 */
///////////////////////////////////////////////////////////
//  Director.cpp
//  Implementation of the Class Director
//  Created on:      02-十月-2014 15:57:01
//  Original author: colin
///////////////////////////////////////////////////////////

#include "Director.h"

Director::Director(){
}

Director::~Director(){
}

Product* Director::constuct(){
	m_pbuilder->buildPartA();
	m_pbuilder->buildPartB();
	m_pbuilder->buildPartC();
	
	return m_pbuilder->getResult();
}


void Director::setBuilder(Builder* buider){
	m_pbuilder = buider;
}


```

### 4.6 模式分析

建造者类中定义了产品的创建方法和返回方法，并使用了指挥者，进行隔离和指挥。它和工厂模式有所区别，工厂模式是将所有的产品添加到工厂中，含有全部的对象和方法，这个是可以有选择的创建工厂对象。避免了重用。**主要用于，本身对象建立十分复杂的类的构建**

在客户端代码中，无须关心产品对象的具体组装过程，只需确定具体建造者的类型即可，建造者模式将复杂对象的构建与对象的表现分离开来，这样使得同样的构建过程可以创建出不同的表现。

### 4.7 实例：

实例：KFC套餐

类图设计如下

![KFC类图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/KFCBuilder.jpg)

### 4.8 优点

- 在建造者模式中， 客户端不必知道产品内部组成的细节，将产品本身与产品的创建过程解耦，使得相同的创建过程可以创建不同的产品对象。
- 建造者相对独立，用户使用不同的建造者创建不同的产品对象
- 可以更加精细的控制产品的创建过程
- 增加新的具体建造者无须修改原有类库的代码，指挥者类针对抽象者类编程，扩展系统方便。

### 4.9 缺点

- 产品相似，当需求产品间差距较大时，不适合。
- 如果内部变化复杂。可能会导致需要定义很多类，导致代码庞大。

### 4.10 适用环境

- 生成对象有复杂的内部结构，产品对象有多个成员属性
- 产品对象属性，相互依赖,需要指定其生成顺序。
- 对象的创建过程独立于创建该对象的类。在建造者模式中引入了指挥者类，将创建过程封装在指挥者类中，而不在建造者类中。
- 隔离复杂对象的创建和使用，并使得相同的创建过程可以创建不同的产品。

### 4.11 模式应用

在很多游戏软件中，地图包括天空、地面、背景等组成部分，人物角色包括人体、服装、装备等组成部分，可以使用建造者模式对其进行设计，通过不同的具体建造者创建不同类型的地图或人物。

### 4.12 模式扩展

建造者模式的简化:

- 省略抽象建造者角色：如果系统中只需要一个具体建造者的话，可以省略掉抽象建造者。
- 省略指挥者角色：在具体建造者只有一个的情况下，如果抽象建造者角色已经被省略掉，那么还可以省略指挥者角色，让Builder角色扮演指挥者与建造者双重角色。

建造者模式与抽象工厂模式的比较:

- **建造者模式返回一个组装好的完整产品 ，而抽象工厂模式返回一系列相关的产品，这些产品位于不同的产品等级结构，构成了一个产品族。**
- 抽象工厂模式中，客户端需要实例化工厂类，然后再进行创建产品对象，建造者模式中，客户端可以不直接调用建造者的相关方法，而是通过指挥者类来指导如何生成对象。**它侧重于一步步构造一个复杂对象，返回一个完整的对象。**
- 如果将抽象工厂模式看成 **汽车配件**生产工厂 ，生产一个产品族的产品，那么建造者模式就是一个 **汽车组装工厂**，通过对部件的组装可以返回一辆完整的汽车。--就是主要负责复杂组成的类的生成。

### 4.13 总结

- 建造者模式将一个复杂对象的构建与它的表示分离，使得同样的构建过程可以创建不同的表示。
- 建造者模式的主要优点在于客户端不必知道产品内部组成的细节，将**产品本身**与产品的**创建过程**解耦。
- 建造者模式适用于，需要生成的产品对象有复杂的内部结构的情况，成员复杂，并且相互间具有依赖性的情况。

## 5. 单例模式

### 5.1 模式动机

系统中的某些类，只能有一个实例，如时间统计函数，打印机等。一般会被实例化为全局静态函数。

### 5.2 模式定义

单例模式(Singleton Pattern)：单例模式确保某一个类只有一个实例，而且自行实例化并向整个系统提供这个实例，这个类称为单例类，它提供全局访问的方法。

单例模式的要点有三个：一是某个类只能有一个实例；二是它必须自行创建这个实例；三是它必须自行向整个系统提供这个实例。单例模式是一种对象创建型模式。单例模式又名单件模式或单态模式。

### 5.3 模式结构

单例模式值包含单例(Singleton)一个角色

![单例模式](https://design-patterns.readthedocs.io/zh_CN/latest/_images/Singleton.jpg)

![时序图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/seq_Singleton.jpg)

### 5.5 代码分析

```c
#include <iostream>
#include "Singleton.h"
using namespace std;

int main(int argc, char *argv[])
{
	//获取对象指针
	Singleton * sg = Singleton::getInstance();
	//使用对象方法
	sg->singletonOperation();
	
	return 0;
}
///////////////////////////////////////////////////////////
//  Singleton.cpp
//  Implementation of the Class Singleton
//  Created on:      02-十月-2014 17:24:46
//  Original author: colin
///////////////////////////////////////////////////////////

#include "Singleton.h"
#include <iostream>
using namespace std;

//创建静态单例模式
Singleton * Singleton::instance = NULL;
Singleton::Singleton(){

}

Singleton::~Singleton(){
	delete instance;
}

Singleton* Singleton::getInstance(){
	if (instance == NULL)
	{
		instance = new Singleton();
	}
	
	return  instance;
}


void Singleton::singletonOperation(){
	cout << "singletonOperation" << endl;
}
```

### 5.6 模式分析

单例模式的目的是保证一个类仅有一个实例，并提供一个访问它的全局访问点。单例类拥有一个私有构造函数，确保用户无法通过new关键字直接实例化它。除此之外，该模式中包含一个静态私有成员变量与静态公有的工厂方法，该工厂方法负责检验实例的存在性并实例化自己，然后存储在静态成员变量中，以确保只有一个实例被创建。

在单例模式的实现过程中，需要注意如下三点：

- 单例类的构造函数为私有；
- 提供一个自身的静态私有成员变量；
- 提供一个公有的静态工厂方法。

### 5.8 优点

- 提供了对唯一实例的受控访问。因为单例类封装了它的唯一实例，所以它可以严格控制客户怎样以及何时访问它，并为设计及开发团队提供了共享的概念。
- 由于在系统内存中只存在一个对象，因此可以节约系统资源，对于一些需要频繁创建和销毁的对象，单例模式无疑可以提高系统的性能。
- 允许可变数目的实例。我们可以基于单例模式进行扩展，使用与单例控制相似的方法来获得指定个数的对象实例。

### 5.9 缺点

- 由于单例模式中没有抽象层，因此单例类的扩展有很大的困难。
- 单例类的职责过重，在一定程度上违背了“单一职责原则”。
- 滥用单例将带来一些负面问题，如为了节省资源将数据库连接池对象设计为单例类，可能会导致共享连接池对象的程序过多而出现连接池溢出；现在很多面向对象语言(如Java、C#)的运行环境都提供了自动垃圾回收的技术，因此，如果实例化的对象长时间不被利用，系统会认为它是垃圾，会自动销毁并回收资源，下次利用时又将重新实例化，这将导致对象状态的丢失。

### 5.10 适用环境

- 系统只需要一个实例对象，如系统要求提供一个唯一的序列号生成器，或者需要考虑资源消耗太大而只允许创建一个对象。
- 客户调用类的单个实例只允许使用一个公共访问点，除了该公共访问点，不能通过其他途径访问该实例。
- 在一个系统中要求一个类只有一个实例时才应当使用单例模式。反过来，如果一个类可以有几个实例共存，就需要对单例模式进行改进，使之成为多例模式。

### 5.11 模式应用

一个具有自动编号主键的表可以有多个用户同时使用，但数据库中只能有一个地方分配下一个主键编号，否则会出现主键重复，因此该主键编号生成器必须具备唯一性，可以通过单例模式来实现。

> 2019-11-10 21:41:49

# 图说设计模式阅读笔记

_参考链接：_ 

- [github地址](https://github.com/me115/design_patterns)
- [图说设计模式](https://design-patterns.readthedocs.io/zh_CN/latest/)
- [设计模式C++实现笔记](https://www.jianshu.com/c/c3f6140b8315)
- [C++ 设计模式](https://blog.csdn.net/liang19890820/article/details/66974516)
- [C++设计模式代码地址](https://github.com/Waleon/DesignPatterns)
- [设计模式(可复用面向对象的软件的基础)](https://pan.baidu.com/disk/home#/all?path=%2FLearning_Note%2F%E8%AE%A1%E7%AE%97%E6%9C%BA%E5%9B%BE%E4%B9%A6%2F%E8%BD%AF%E4%BB%B6%E5%B7%A5%E7%A8%8B%E5%92%8C%E9%A1%B9%E7%9B%AE%E7%AE%A1%E7%90%86&vmode=list)
- [C++设计模式视频](https://www.bilibili.com/video/av52251106)

# 结构型模式

结构型模式(Structural Pattern)描述如何将类或者对 象结合在一起形成更大的结构，就像搭积木，可以通过 简单积木的组合形成复杂的、功能更为强大的结构。

结构型模式可以分为类结构型模式和对象结构型模式：

- 类结构型模式关心类的组合，由多个类可以组合成一个更大的系统，在类结构型模式中一般只存在继承关系和实现关系。 
- 对象结构型模式关心类与对象的组合，通过关联关系使得在一 个类中定义另一个类的实例对象，然后通过该对象调用其方法。 
  
根据“合成复用原则”，在系统中尽量使用关联关系来替代继 承关系，因此大部分结构型模式都是对象结构型模式。

结构型模式的重点在于外观模式和适配器模式，享元模式不怎么重要。

## 1. 适配器模式

_参考链接：_ [C++ 适配器模式](https://blog.csdn.net/liang19890820/article/details/66973296)

- 客户端可以通过目标类的结构访问它所提供的服务。但是接口不一定是客户端所期望的。
- 适配器模式，提供这样的接口来，实现用户期望的结果。
- 适配器模式定义一个包装类，包装不兼容接口的对象，给适配对象(客户端)；提供对应的接口。

### 1.2 模式定义

适配器模式(Adapter Pattern) ：将一个接口转换成客户希望的另一个接口，适配器模式使接口不兼容的那些类可以一起工作，其别名为包装器(Wrapper)。适配器模式既可以作为类结构型模式，也可以作为对象结构型模式。

**适配器模式（Adapter Pattern）是一种补救模式，将一个类的接口转换成客户希望的另外一个接口，从而使原本由于接口不兼容而不能一起工作的类可以一起工作。**

### 1.3 模式结构

适配器模式包含如下角色：

- Target：目标抽象类
- Adapter：适配器类
- Adaptee：适配者类
- Client：客户类

适配器模式有对象适配器和类适配器两种实现：

对象适配器：

![对象适配器](https://design-patterns.readthedocs.io/zh_CN/latest/_images/Adapter.jpg)

类适配器

![类适配器模式](https://design-patterns.readthedocs.io/zh_CN/latest/_images/Adapter_classModel.jpg)

![时序图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/seq_Adapter.jpg)

### 1.5 代码分析

```c
/* main function */
#include <iostream>
#include "Adapter.h"
#include "Adaptee.h"
#include "Target.h"

using namespace std;

int main(int argc, char *argv[])
{
    //创建适配器
	Adaptee * adaptee  = new Adaptee();
	//获取目标
    Target * tar = new Adapter(adaptee);
	//执行方法
    tar->request();
	
	return 0;
}
/* 定义适配器 */
///////////////////////////////////////////////////////////
//  Adapter.h
//  Implementation of the Class Adapter
//  Created on:      03-十月-2014 17:32:00
//  Original author: colin
///////////////////////////////////////////////////////////

#ifndef ADAPTER_H
#define ADAPTER_H

#include "Target.h"
#include "Adaptee.h"

class Adapter : public Target
{

public:
	Adapter(Adaptee *adaptee);
	virtual ~Adapter();

	virtual void request();

private:
	Adaptee* m_pAdaptee;

};
#endif // ADAPTER_H
/* 适配器实现 */
///////////////////////////////////////////////////////////
//  Adapter.cpp
//  Implementation of the Class Adapter
//  Created on:      03-十月-2014 17:32:00
//  Original author: colin
///////////////////////////////////////////////////////////

#include "Adapter.h"

Adapter::Adapter(Adaptee * adaptee){
	m_pAdaptee =  adaptee;
}
Adapter::~Adapter(){

}
/* 实现请求方法 */
void Adapter::request(){
	m_pAdaptee->specificRequest();
}

/* 适配者方法 */

///////////////////////////////////////////////////////////
//  Adaptee.h
//  Implementation of the Class Adaptee
//  Created on:      03-十月-2014 17:32:00
//  Original author: colin
//////////////////////////////////////////////////////////D

#ifndef ADAPTEE_H
#define ADAPTEE_H
/* 关键类适配器 */
class Adaptee
{

public:
	Adaptee();
	virtual ~Adaptee();

	void specificRequest();

};
#endif // !ADAPTEE_H

```
### 1.8 优点

- 将目标类和适配者类解耦，通过引入一个适配器类来重用现有的适配者类，而无须修改原有代码。
- 增加了类的透明性和复用性，将具体的实现封装在适配者类中，对于客户端类来说是透明的，而且提高了适配者的复用性。
- 灵活性和扩展性都非常好，通过使用配置文件，可以很方便地更换适配器，也可以在不修改原有代码的基础上增加新的适配器类，完全符合“开闭原则”。
  
**类适配器模式还具有如下优点：**
由于适配器类是适配者类的子类，因此可以在适配器类中置换一些适配者的方法，使得适配器的灵活性更强。
**对象适配器模式还具有如下优点：**
一个对象适配器可以把多个不同的适配者适配到同一个目标，也就是说，同一个适配器可以把适配者类和它的子类都适配到目标接口。

### 1.9 缺点

- 类适配器：
  - 对于Java、C#等不支持多重继承的语言，一次最多只能适配一个适配者类，而且目标抽象类只能为抽象类，不能为具体类，其使用有一定的局限性，不能将一个适配者类和它的子类都适配到目标接口。
- 对象适配器：
  - 与类适配器模式相比，要想置换适配者类的方法就不容易。如果一定要置换掉适配者类的一个或多个方法，就只好先做一个适配者类的子类，将适配者类的方法置换掉，然后再把适配者类的子类当做真正的适配者进行适配，实现过程较为复杂。

### 1.10 使用环境

- 系统需要使用现有的类，而这些类的接口不符合系统的需要。
- 想要建立一个可以重复使用的类，用于与一些彼此之间没有太大关联的一些类，包括一些可能在将来引进的类一起工作。

### 1.11 模式应用

java的JDBC给出一个客户端通用的抽象接口，每个具体数据库引擎（如SQL Server、Oracle、MySQL等）的JDBC驱动软件都是一个介于JDBC接口和数据库引擎接口之间的适配器软件。

### 1.12 模式扩展

当不需要全部实现接口提供的方法时，可先设计一个抽象类实现接口，并为该接口中每个方法提供一个默认实现（空方法），那么该抽象类的子类可有选择地覆盖父类的某些方法来实现需求，它适用于一个接口不想使用其所有的方法的情况。因此也称为单接口适配器模式。

## 2 桥接模式

桥接模式将继承关系转换为关联关系，从而降低了类与类之间的耦合，减少了代码编写量。适用于对于多种属性组合的情况。

### 2.2 模式定义

桥接模式(Bridge Pattern)：将抽象部分与它的实现部分分离，使它们都可以独立地变化。它是一种对象结构型模式，又称为柄体(Handle and Body)模式或接口(Interface)模式。

### 2.3 模式结构

桥接模式包含如下角色：

- Abstraction：抽象类
- RefinedAbstraction：扩充抽象类
- Implementor：实现类接口
- ConcreteImplementor：具体实现类

![桥接模式](https://design-patterns.readthedocs.io/zh_CN/latest/_images/Bridge.jpg)

时序图

![时序图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/seq_Bridge.jpg)

```c
/* main.c */
#include <iostream>
#include "ConcreteImplementorA.h"
#include "ConcreteImplementorB.h"
#include "RefinedAbstraction.h"
#include "Abstraction.h"

using namespace std;

int main(int argc, char *argv[])
{
	
	Implementor * pImp = new ConcreteImplementorA();
	Abstraction * pa = new RefinedAbstraction(pImp);
	//注意这里是对公共抽象接口的调用
	pa->operation();
	
	Abstraction * pb = new RefinedAbstraction(new ConcreteImplementorB());
	pb->operation();
	
	delete pa;
	delete pb;
	
	return 0;
}
/* RefinedAbstraction.h */

///////////////////////////////////////////////////////////
//  RefinedAbstraction.h
//  Implementation of the Class RefinedAbstraction
//  Created on:      03-十月-2014 18:12:43
//  Original author: colin
///////////////////////////////////////////////////////////

#if !defined(EA_4BA5BE7C_DED5_4236_8362_F2988921CFA7__INCLUDED_)
#define EA_4BA5BE7C_DED5_4236_8362_F2988921CFA7__INCLUDED_

#include "Abstraction.h"

class RefinedAbstraction : public Abstraction
{

public:
	RefinedAbstraction();
	RefinedAbstraction(Implementor* imp);
	virtual ~RefinedAbstraction();

	virtual void operation();

};

RefinedAbstraction::RefinedAbstraction(){

}

RefinedAbstraction::RefinedAbstraction(Implementor* imp)
	:Abstraction(imp)
{
}

RefinedAbstraction::~RefinedAbstraction(){

}

void RefinedAbstraction::operation(){
	cout << "do something else ,and then " << endl;
	m_pImp->operationImp();
}

 
#endif // !defined(EA_4BA5BE7C_DED5_4236_8362_F2988921CFA7__INCLUDED_)

///////////////////////////////////////////////////////////
//  ConcreteImplementorA.cpp
//  Implementation of the Class ConcreteImplementorA
//  Created on:      03-十月-2014 18:12:43
//  Original author: colin
///////////////////////////////////////////////////////////

#include "ConcreteImplementorA.h"
#include <iostream>
using namespace std;

ConcreteImplementorA::ConcreteImplementorA(){

}
ConcreteImplementorA::~ConcreteImplementorA(){

}
//A中定义的操作函数，与B基本相同
void ConcreteImplementorA::operationImp(){
	cout << "imp in ConcreteImplementorA style." << endl;
}

```

### 2.6 模式分析

桥接模式就是在适配器模式的基础上，更改为了多种可桥接的方法。**主要目的是将抽象部分与它的实现部分分离，使得他们都可以独立进行变化。抽象类只控制抽象部分，具体的实现部分由继承的实现类本身来完成。通过公共虚函数接口的实现或者重载，来对其进行控制。**

- 抽象化：抽象化就是忽略一些信息，把不同的实体当作同样的实体对待。在面向对象中，将对象的共同性质抽取出来形成类的过程即为抽象化的过程。
- 抽象化：抽象化就是忽略一些信息，把不同的实体当作同样的实体对待。在面向对象中，将对象的共同性质抽取出来形成类的过程即为抽象化的过程。
- 实现化：针对抽象化给出的具体实现，就是实现化，抽象化与实现化是一对互逆的概念，实现化产生的对象比抽象化更具体，是对抽象化事物的进一步具体化的产物。
- 脱耦：脱耦就是将抽象化和实现化之间的耦合解脱开，或者说是将它们之间的强关联改换成弱关联，将两个角色之间的继承关系改为关联关系。桥接模式中的所谓脱耦，就是指在一个软件系统的抽象化和实现化之间使用关联关系（组合或者聚合关系）而不是继承关系，从而使两者可以相对独立地变化，这就是桥接模式的用意。

### 2.7 实例

参考示例：[链接](https://blog.csdn.net/liang19890820/article/details/79501177)

### 2.8 优点

- 分离抽象接口及其实现部分。
- 桥接模式有时类似于多继承方案，但是多继承方案违背了类的单一职责原则（即一个类只有一个变化的原因），复用性比较差，而且多继承结构中类的个数非常庞大，桥接模式是比多继承方案更好的解决方法。
- 桥接模式提高了系统的可扩充性，在两个变化维度中任意扩展一个维度，都不需要修改原有系统。
- 实现细节对客户透明，可以对用户隐藏实现细节。

### 2.9 缺点

- 桥接模式的引入会增加系统的理解与设计难度，由于聚合关联关系建立在抽象层，要求开发者针对抽象进行设计与编程。 
- 桥接模式要求正确识别出系统中两个独立变化的维度，因此其使用范围具有一定的局限性。

### 2.10 适用环境

- 在两个具体的角色之间，建立静态的继承联系，通过桥接模式，将两个函数进行抽象化并建立相关的联系。
- 抽象化的角色之和实现化的角色可以以继承的方式独立扩展而互不影响。
- 一个类存在两个独立变化的维度，且这两个唯独都需要进行扩展。
- 使用继承来实现，抽象化角色和具体角色的独立
- 不希望使用继承。

## 3 装饰模式

对于类或者对象的行为增加，一般有两种方式：

- 继承机制:使用继承机制，直接进行函数的添加。
- 关联机制，即将一个类的对象嵌入另外一个对象中，由另外一个对象来决定是否调用嵌入对象的行为，以便扩展自己的行为。，我们称这个嵌入的对象为“装饰器”。

## 3.2 模式定义：

装饰模式(Decorator Pattern) ：动态地给一个对象增加一些额外的职责(Responsibility)，就增加对象功能来说，装饰模式比生成子类实现更为灵活。其别名也可以称为包装器(Wrapper)，与适配器模式的别名相同，但它们适用于不同的场合。根据翻译的不同，装饰模式也有人称之为“油漆工模式”，它是一种对象结构型模式。

### 3.3 模式结构

包含角色如下：

- Component: 抽象构件
- ConcreteComponent: 具体构件
- Decorator: 抽象装饰类
- ConcreteDecorator: 具体装饰类

![结构模式图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/Decorator.jpg)

时序图:

![时序图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/seq_Decorator.jpg)

**装饰模式中的装饰类一般拥有为抽象构建成员，通过具体构建类来进行添加操作，成为具体的装饰类，最终实现具体的类操作的扩展，装饰器一般也来自于基础的抽象构件**

### 3.7 实例

> 星巴克（Starbucks）

在星巴克购买咖啡时，可以要求在其中加入各种调味品（辅料）。调味品很多，有些不收费（例如：白砂糖、香草粉等），有些则需要额外收费（例如：奶油、摩卡、糖浆等），所以充分利用起来吧！倘若咖啡不带劲，我们想要添加奶油、摩卡和糖浆，这时，就可以利用装饰者模式思想来实现。

### 3.8 代码实现

```c
/* 所有饮料的基类实现，即抽象构建实现 */
// component.h
#ifndef COMPONENT_H
#define COMPONENT_H

#include <string>

using namespace std;

// 所有饮料的基类
class IBeverage
{
public:
    virtual string Name() = 0;  // 名称
    virtual double Cost() = 0;  // 价钱
};

#endif // COMPONENT_H

/* 由基类，创建具体构建 */
// concrete_component.h
#ifndef CONCRETE_COMPONENT_H
#define CONCRETE_COMPONENT_H

#include "component.h"

/********** 具体的饮料（咖啡）**********/

// 黑咖啡，属于混合咖啡
class HouseBlend : public IBeverage
{
public:
    string Name() {
        return "HouseBlend";
    }

    double Cost() {
        return 30.0;
    }
};

// 深度烘培咖啡豆
class DarkRoast : public IBeverage
{
public:
    string Name() {
        return "DarkRoast";
    }

    double Cost() {
        return 28.5;
    }
};

#endif // CONCRETE_COMPONENT_H

/* 以抽象构建为成员，创建装饰类 */
// decorator.h
#ifndef DECORATOR_H
#define DECORATOR_H

#include "component.h"

// 调味品
class CondimentDecorator : public IBeverage
{
public :
    CondimentDecorator(IBeverage *beverage) : m_pBeverage(beverage) {}

    string Name() {
        return m_pBeverage->Name();
    }

    double Cost() {
        return m_pBeverage->Cost();
    }

protected :
    IBeverage *m_pBeverage;
} ;

#endif // DECORATOR_H

/* 添加具体装饰 */
// concrete_decorator.h
#ifndef CONCRETE_DECORATOR_H
#define CONCRETE_DECORATOR_H

#include "decorator.h"

/********** 具体的饮料（调味品）**********/

// 奶油
class Cream : public CondimentDecorator
{
public:
    Cream(IBeverage *beverage) : CondimentDecorator(beverage) {}

    string Name() {
        return m_pBeverage->Name() + " Cream";
    }

    double Cost() {
        return m_pBeverage->Cost() + 3.5;
    }
};

// 摩卡
class Mocha : public CondimentDecorator
{
public:
    Mocha(IBeverage *beverage) : CondimentDecorator(beverage) {}

    string Name() {
        return m_pBeverage->Name() + " Mocha";
    }

    double Cost() {
        return m_pBeverage->Cost() + 2.0;
    }
};

// 糖浆
class Syrup : public CondimentDecorator
{
public:
    Syrup(IBeverage *beverage) : CondimentDecorator(beverage) {}

    string Name() {
        return m_pBeverage->Name() + " Syrup";
    }

    double Cost() {
        return m_pBeverage->Cost() + 3.0;
    }
};

#endif // CONCRETE_DECORATOR_H

/* 创建客户端并使用 */

// main.cpp
#include "concrete_component.h"
#include "concrete_decorator.h"
#include <iostream>

#ifndef SAFE_DELETE
#define SAFE_DELETE(p) { if(p){delete(p); (p)=NULL;} }
#endif

int main()
{
    /********** 黑咖啡 **********/
    IBeverage *pHouseBlend = new HouseBlend();
    cout << pHouseBlend->Name() << " : " << pHouseBlend->Cost() << endl;

    // 黑咖啡 + 奶油
    CondimentDecorator *pCream = new Cream(pHouseBlend);
    cout << pCream->Name() << " : " << pCream->Cost() << endl;

    // 黑咖啡 + 摩卡
    CondimentDecorator *pMocha = new Mocha(pHouseBlend);
    cout << pMocha->Name() << " : " << pMocha->Cost() << endl;

    // 黑咖啡 + 糖浆
    CondimentDecorator *pSyrup = new Syrup(pHouseBlend);
    cout << pSyrup->Name() << " : " << pSyrup->Cost() << endl;

    /********** 深度烘培咖啡豆 **********/
    IBeverage *pDarkRoast = new DarkRoast();
    cout << pDarkRoast->Name() << " : " << pDarkRoast->Cost() << endl;

    // 深度烘培咖啡豆 + 奶油
    CondimentDecorator *pCreamDR = new Cream(pDarkRoast);
    cout << pCreamDR->Name() << " : " << pCreamDR->Cost() << endl;

    // 深度烘培咖啡豆 + 奶油 + 摩卡
    CondimentDecorator *pCreamMocha = new Mocha(pCreamDR);
    cout << pCreamMocha->Name() << " : " << pCreamMocha->Cost() << endl;

    // 深度烘培咖啡豆 + 奶油 + 摩卡 + 糖浆
    CondimentDecorator *pCreamMochaSyrup = new Syrup(pCreamMocha);
    cout << pCreamMochaSyrup->Name() << " : " << pCreamMochaSyrup->Cost() << endl;

    SAFE_DELETE(pSyrup);
    SAFE_DELETE(pMocha);
    SAFE_DELETE(pCream);
    SAFE_DELETE(pHouseBlend);

    SAFE_DELETE(pCreamMochaSyrup);
    SAFE_DELETE(pCreamMocha);
    SAFE_DELETE(pCreamDR);
    SAFE_DELETE(pDarkRoast);

    getchar();

    return 0;
}
/*
输出如下：
HouseBlend : 30 
HouseBlend Cream : 33.5 
HouseBlend Mocha : 32 
HouseBlend Syrup : 33 
DarkRoast : 28.5 
DarkRoast Cream : 32 
DarkRoast Cream Mocha : 34 
DarkRoast Cream Mocha Syrup : 37

*/
```
如上所示，构建，通过共同具体的装饰器，添加种种不同的功能。装饰器通过，添加基类的成员变量，实现模拟继承。

### 3.8 优点

- 装饰模式提供比继承更多的灵活度
- 可以通过配置文件在运行时，选择不同的装饰器，从而实现不同的行为。
- 可以通过不同具体装饰器的排列组合，创造出不同行为的组合。为具体的基础构件，创建更加强大的对象。
- 具体构件类与具体装饰类可以独立变化，用户可以根据需要增加新的具体构件类和具体装饰类，在使用时再对其进行组合，原有代码无须改变，符合“开闭原则”。
  
### 3.9 缺点

- 使用装饰模式时，因为层层递进关系，会产生很多无用的小对象；和具体的装饰类。
- 这种比继承更加灵活机动的特性，也同时意味着装饰模式比继承更加易于出错，排错也很困难，对于多次装饰的对象，调试时寻找错误可能需要逐级排查，较为烦琐。

## 4 外观模式

外观模式(Facade Pattern)：外部与一个子系统的通信必须通过一个统一的外观对象进行，为子系统中的一组接口提供一个一致的界面，外观模式定义了一个高层接口，这个接口使得这一子系统更加容易使用。外观模式又称为门面模式，它是一种对象结构型模式。

Façade 为子系统中的一组接口提供了一个统一的高层接口，该接口使得子系统更加容易使用。

适配器模式和装饰者模式的区别：

**适配器将一个对象包装起来以改变其接口；装饰者将一个对象包装起来以增强新的行为和责任；而外观将一群对象包装起来以简化其接口。要注意装饰者模式的两个抽象类，一个是Compent, 还有一个是Decorator。**

### 4.3 模式结构

外观模式包含角色如下：

- Facade: 外观角色;模式的核心，被 Client 调用，知晓相关子系统的功能和责任。在正常情况下，它将所有从 Client 发来的请求委派到相应的子系统去，让子系统处理.
- SubSystem:子系统角色;可以同时有一个或者多个子系统，子系统可以是一个单独的类或类的集合。每个子系统都可以被 Client 直接调用，或者被 Facade 调用，它处理由 Facade 传过来的请求。子系统并不知道 Facade 的存在，对于子系统而言，Facade 仅仅是另外一个 Client 而已。

![外观模式类结构](https://design-patterns.readthedocs.io/zh_CN/latest/_images/Facade.jpg)

时序图：

![外观模式时序图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/seq_Facade.jpg)


### 4.5 案例分析

京东快递，下单过程，需要有订单团队，供应商和快递员的三方共同协作才能实现：

#### 4.5.1 创建子系统

子系统包含 3 个，订单团队（确认付款、联系供应商）、供应商（确认库存、包装、联系快递）、快递员（分配人员、派送包裹）。

```c
// sub_system.h
#ifndef SUB_SYSTEM_H
#define SUB_SYSTEM_H

#include <iostream>
#include <string>
#include <windows.h>

const std::string c_stateToStrCourier[] = { "收到", "验证可达性", "分配人员", "派送包裹", "获取交货确认", "完成" };
const std::string c_stateToStrVendor[] = { "收到", "确认库存", "从仓库得到物品", "包装", "联系快递员", "完成" };
const std::string c_stateToStrOrderTeam[] = { "收到", "确认付款", "联系供应商", "完成" };
const int c_nMsec = 300;  // 休眠时间（毫秒） - Sleep(c_nMsec) 处可以替换为一些有用的代码

// 订单团队
class OrderTeam
{
public:
    void submitRequest() {
        m_nState = 0;
    }

    // 检测状态
    bool checkStatus() {
        std::cout << "订单团队 - 当前状态：" << c_stateToStrOrderTeam[m_nState] << std::endl;

        Sleep(c_nMsec);
        m_nState++;

        return (m_nState == Complete);
    }

private:
    enum States {
        Received,  // 收到
        VerifyPayment,  // 确认付款
        ContactVendor,  // 联系供应商
        Complete  // 完成
    };
    int m_nState;
};

// 供应商
class Vendor
{
public:
    void submitRequest() {
        m_nState = 0;
    }

    // 检测状态
    bool checkStatus() {
        std::cout << "供应商 - 当前状态：" << c_stateToStrVendor[m_nState] << std::endl;

        Sleep(c_nMsec);
        m_nState++;

        return (m_nState == Complete);
    }

private:
    enum States {
        Received,  // 收到
        VerifyInventory,  // 确认库存
        GetItemFromWareHouse,  // 从仓库得到物品
        PackItem,  // 包装
        ContactCourier,  // 联系快递员
        Complete  // 完成
    };
    int m_nState;
};

// 快递员
class Courier
{
public:
    // 将请求转发给快递员
    void submitRequest() {
        m_nState = 0;
    }

    // 检测状态
    bool checkStatus() {
        std::cout << "快递员 - 当前状态：" << c_stateToStrCourier[m_nState] << std::endl;

        Sleep(c_nMsec);
        m_nState++;

        return (m_nState == Complete);
    }

private:
    enum States {
        Received,  // 收到
        VerifyReachbility,  // 验证可达性
        AssignPerson,  // 分配人员
        DispatchPackage,  // 派送包裹
        GetDeliveryConfirmation,  // 获取交货确认
        Complete  // 完成
    };
    int m_nState;
};

#endif // SUB_SYSTEM_H
```
#### 4.5.2 创建外观

```c
// facade.h
#ifndef FACADE_H
#define FACADE_H

#include "sub_system.h"

// 网购外观
class OnlineShoppingFacade
{
public:
    OnlineShoppingFacade() {
        m_nCount = 0;
    }

    // 返回跟踪次数
    int followupNum() {
        return m_nCount;
    }

    // 提交订单
    void submitRequest() {
        m_nState = 0;
    }

    // 跟踪订单
    bool checkStatus(){
        // 收到订单请求
        switch (m_nState) {
        case Received:
            m_nState++;
            // 将请求转发给订单团队
            m_order.submitRequest();
            std::cout << "********** 提交给订单团队，跟踪次数：" << m_nCount << " **********" << std::endl;
            break;
        case SubmittedToOrderTeam:
            // 如果订单团队完成验证，则向供应商发出请求
            if (m_order.checkStatus()) {
                m_nState++;
                m_vendor.submitRequest();
                std::cout << "********** 提交给供应商，跟踪次数：" << m_nCount << " **********" << std::endl;
            }
            break;
        case SubmittedToVendor:
            // 如果供应商已将包裹打包，将其转发给快递员
            if (m_vendor.checkStatus()) {
                m_nState++;
                m_courier.submitRequest();
                std::cout << "********** 提交给快递员，跟踪次数：" << m_nCount << " **********" << std::endl;
            }
            break;
        case SubmittedToCourier:
            // 如果包裹交付，订单完成
            if (m_courier.checkStatus())
                return true;
        default:
            break;
        }

        m_nCount++;

        // 订单未完成
        return false;
    }

private:
    enum States {
        Received,  // 收到
        SubmittedToOrderTeam,  // 提交给订单团队
        SubmittedToVendor,  // 提交给供应商
        SubmittedToCourier  // 提交给快递员
    };

    int m_nState;  // 订单状态
    int m_nCount;  // 跟踪次数

    OrderTeam m_order;
    Vendor m_vendor;
    Courier m_courier;
};

#endif // FACADE_H
```
#### 4.5.2 创建客户端

```c
// main.cpp
#include "facade.h"

int main()
{
    OnlineShoppingFacade facade;

    // 提交订单
    facade.submitRequest();

    // 跟踪订单，直到订单完成
    while (!facade.checkStatus());

    std::cout << "********** 订单完成，跟踪次数：" << facade.followupNum() << " **********" << std::endl;

    getchar();

    return 0;
}
```

输出：

```bash
********** 提交给订单团队，跟踪次数：0 ********** 
订单团队 - 当前状态：收到 
订单团队 - 当前状态：确认付款 
订单团队 - 当前状态：联系供应商 
********** 提交给供应商，跟踪次数：3 ********** 
供应商 - 当前状态：收到 
供应商 - 当前状态：确认库存 
供应商 - 当前状态：从仓库得到物品 
供应商 - 当前状态：包装 
供应商 - 当前状态：联系快递员 
********** 提交给快递员，跟踪次数：8 ********** 
快递员 - 当前状态：收到 
快递员 - 当前状态：验证可达性 
快递员 - 当前状态：分配人员 
快递员 - 当前状态：派送包裹 
快递员 - 当前状态：获取交货确认 
********** 订单完成，跟踪次数：13 **********
```

### 4.8 优缺点

优点：
-  Client 屏蔽子系统组件，减少了 Client 处理的对象数目，并使得子系统使用起来更加容易。通过引入外观模式，Client 的代码将变得很简单，与之关联的对象也很少。
-  实现了子系统与 Client 之间的松耦合关系，这使得子系统的组件变化不会影响到调用它的 Client，只需要调整 Facade 即可。
-  降低了大型软件系统中的编译依赖性，并简化了系统在不同平台之间的移植过程，因为编译一个子系统一般不需要编译所有其他的子系统。一个子系统的修改对其他子系统没有任何影响，而且子系统内部变化也不会影响到外观对象。
-  只是提供了一个访问子系统的统一入口，并不影响用户直接使用子系统类。
缺点：

- 不能很好地限制 Client 使用子系统类，如果对 Client 访问子系统类做太多的限制，则会减少可变性和灵活性。
- 在不引入抽象外观类的情况下，增加新的子系统可能需要修改 Facade 或 Client 的源代码，违背了“开闭原则”。

### 4.9 适用场景

- 当要为一个复杂子系统提供一个简单接口时。该接口可以满足大多数用户的需求，而且用户也可以越过外观类直接访问子系统。
- Client 与多个子系统之间存在很大的依赖性。引入外观类将子系统与 Client 以及其他子系统解耦，可以提高子系统的独立性和可移植性。
- 在层次化结构中，可以使用外观模式定义系统中每一层的入口。层与层之间不直接产生联系，而通过外观类建立联系，降低层之间的耦合度。

### 4.12 模式扩展

不要试图通过外观类为子系统增加新行为；外观应该是对复杂模式的重新组装，而不是添加新功能。添加新功能应该使用装饰模式。

## 5 享元模式

_参考链接：_ [享元模式之C++实现](https://blog.csdn.net/JXH_123/article/details/38039703)

### 5.1 模式动机

- 通过共享计数实现相同或者相似对象的重用。
- 可以共享的内容称为内部状态,不能共享的称为外部状态。
- 享元模式中通常会出现工厂模式，需要创建享元工厂来负责维护一个享元池(FlyweightPool)用于存储具有相同内部状态的享元对象。
- 因为内部状态能共享的有限性，享元对象一般都设计为较小的对象，它所包含的内部状态比较少，这种对象也称为细粒度对象。享元模式通过，使用共享计数，实现大量细粒度对象的复用(加锁的问题？？？)；

### 5.2 模式定义

享元模式(Flyweight Pattern)：运用共享技术有效地支持大量细粒度对象的复用。系统只使用少量的对象，而这些对象都很相似，状态变化很小，可以实现对象的多次复用。由于享元模式要求能够共享的对象必须是细粒度对象，因此它又称为轻量级模式，它是一种对象结构型模式。

### 5.3 结构模式

- Flyweight: 抽象享元类;通常是一个抽象类，在抽象享元类中声明了具体享元类公共的方法，这些方法可以向外界提供享元对象的内部数据（内部状态），同时也可以通过这些方法来设置外部数据（外部状态）。
- ConcreteFlyweight: 具体享元类;实现了抽象享元类，其实例称为享元对象；在具体享元类中为内部状态提供了存储空间。通常可以结合单例模式来设计具体享元类，为每一个具体享元类提供唯一的享元对象。
- UnsharedConcreteFlyweight: 非共享具体享元类;并不是所有抽象享元类的子类都需要被共享，不能被共享的子类可设计为非共享具体享元类，当需要一个非共享具体享元类的对象时可以直接通过实例化创建。
- FlyweightFactory: 享元工厂类;用于创建并管理享元对象，它针对抽象享元类编程，将各种类型的具体享元对象存储在一个享元池中，享元池一般设计为一个存储“键值对”的集合（也可以是其他类型的集合），可以结合工厂模式进行设计；当用户请求一个具体享元对象时，享元工厂提供一个存储在享元池中已创建的实例或者创建一个新的实例（如果不存在的话），返回新创建的实例并将其存储在享元池中。

![享元结构模式](https://design-patterns.readthedocs.io/zh_CN/latest/_images/Flyweight.jpg)

**时序图**

![享元模式时序图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/seq_Flyweight.jpg)

### 5.5 实例和代码分析

> 《反恐精英》 - Counter Strike
> 
> CS 将玩家分为“恐怖份子”（Terrorists）与“反恐精英”（Counter Terrorists）两个阵营，每个队伍必须在地图上进行多回合的战斗。在“爆破模式”中，T 阵营的任务是在指定时间内装置 C4 并引爆，而 CT 阵营的任务是拆除被装置的 C4。当玩家请求武器时，系统会为其分配所需的武器。
> 
> 现在，有 n 个玩 CS 的玩家，如果创建 n 个对象（每个玩家一个），这势必会占用大量内存。为了解决这个问题，可以使用享元模式（减少玩家数量），只需要为恐怖分子和反恐精英创建两个对象，在需要时反复使用即可。
> 


#### 5.5.1 内部状态和外部状态

- 内部状态（Intrinsic State）：“任务”就是两种玩家的内部状态，不会随外部环境的变而变化。两个队伍的“任务”基本是永远不变的。
- 外部状态（Intrinsic State）：“武器”等随环境改变而改变的，享元对象的外部状态通常由客户端保存，需要时再传入享元

由于区分了内部状态和外部状态，因此可以将具有相同内部状态的对象存储在享元池中来实现共享。当需要时，将对象从享元池中取出以实现对象的复用。通过向取出的对象注入不同的外部状态，可以得到一系列相似的对象，而这些对象在内存中实际上只存储一份。

#### 5.5.2 代码实现

**创建抽象享元**

```c
// flyweight.h
#ifndef FLYWEIGHT_H
#define FLYWEIGHT_H

#include <iostream>
#include <string>

// 玩家 - 有武器和使命
class IPlayer
{
public:
    virtual ~IPlayer() {}

    // 分配武器
    virtual void assignWeapon(std::string weapon) = 0;

    // 使命
    virtual void mission() = 0;

protected:
    std::string m_task; // 内部状态
    std::string m_weapon; // 外部状态
};

#endif // FLYWEIGHT_H
```

**创建具体享元**
具体享元类有两个-Terrorist、CounterTerrorist

```c
// concrete_flyweight.h
#ifndef CONCRETE_FLYWEIGHT_H
#define CONCRETE_FLYWEIGHT_H

#include "flyweight.h"

// 恐怖分子
class Terrorist : public IPlayer
{
public:
    Terrorist() {
        m_task = "Plant a bomb";
    }

    virtual void assignWeapon(std::string weapon) override {
        m_weapon = weapon;
    }

    virtual void mission() override {
        std::cout << "Terrorist with weapon " + m_weapon + "," + " Task is " + m_task << std::endl;
    }
};

// 反恐精英
class CounterTerrorist : public IPlayer
{
public:
    CounterTerrorist() {
        m_task = "Diffuse bomb";
    }

    virtual void assignWeapon(std::string weapon) override {
        m_weapon = weapon;
    }

    virtual void mission() override {
        std::cout << "Counter Terrorist with weapon " + m_weapon + "," + " Task is " + m_task << std::endl;
    }
};

#endif // CONCRETE_FLYWEIGHT_H
```
**创建享元工厂**
享元工厂的作用在于提供一个用于存储享元对象的享元池，当需要对象时，首先从享元池中获取，如果不存在，则创建一个新的享元对象，将其保存至享元池中并返回：

```c
// flyweight_factory.h
#ifndef FLYWEIGHT_FACTORY_H
#define FLYWEIGHT_FACTORY_H

#include "concrete_flyweight.h"
#include <map>

// 用于获取玩家
class PlayerFactory
{
public:
    // 如果 T/CT 对象存在，则直接从享元池获取；否则，创建一个新对象并添加到享元池中，然后返回。
    static IPlayer* getPlayer(std::string type)
    {
        IPlayer *p = NULL;
        if (m_map.find(type) != m_map.end()) {
            p = m_map[type];
        }
        else {
            // 创建 T/CT 对象
            if (type == "T") {
                std::cout << "Terrorist Created" << std::endl;
                p = new Terrorist();
            }
            else if (type == "CT") {
                std::cout << "Counter Terrorist Created" << std::endl;
                p = new CounterTerrorist();
            }
            else {
                std::cout << "Unreachable code!" << std::endl;
            }
            // 一旦创建，将其插入到 map 中
            m_map.insert(std::make_pair(type, p));
        }
        return p;
    }

private:
    // 存储 T/CT 对象（享元池）
    static std::map<std::string, IPlayer*> m_map;
};

#endif // FLYWEIGHT_FACTORY_H
```
**创建客户端**

```c
// main.cpp
#include "concrete_flyweight.h"
#include "flyweight_factory.h"
#include <ctime>

std::map<std::string, IPlayer*> PlayerFactory::m_map = std::map<std::string, IPlayer*>();

// 玩家类型和武器
static std::string s_playerType[2] = { "T", "CT" };
static std::string s_weapons[4] = { "AK-47", "Maverick", "Gut Knife", "Desert Eagle" };

#define GET_ARRAY_LEN(array, len) {len = (sizeof(array) / sizeof(array[0]));}

int main()
{
    srand((unsigned)time(NULL));

    int playerLen;
    int weaponsLen;
    GET_ARRAY_LEN(s_playerType, playerLen);
    GET_ARRAY_LEN(s_weapons, weaponsLen);

    // 假设，游戏中有十位玩家
    for (int i = 0; i < 10; i++) {
        // 获取随机玩家和武器
        int typeIndex = rand() % playerLen;
        int weaponIndex = rand() % weaponsLen;
        std::string type = s_playerType[typeIndex];
        std::string weapon = s_weapons[weaponIndex];

        // 获取玩家
        IPlayer *p = PlayerFactory::getPlayer(type);

        // 从武器库中随机分配武器
        p->assignWeapon(weapon);

        // 派玩家去执行任务
        p->mission();
    }

    getchar();

    return 0;
}
```
输出如下：
```sh
Counter Terrorist Created 
Counter Terrorist with weapon AK-47, Task is Diffuse bomb 
Counter Terrorist with weapon Gut Knife, Task is Diffuse bomb 
Counter Terrorist with weapon Maverick, Task is Diffuse bomb 
Counter Terrorist with weapon Maverick, Task is Diffuse bomb 
Terrorist Created 
Terrorist with weapon Desert Eagle, Task is Plant a bomb 
Counter Terrorist with weapon Maverick, Task is Diffuse bomb 
Counter Terrorist with weapon AK-47, Task is Diffuse bomb 
Counter Terrorist with weapon Maverick, Task is Diffuse bomb 
Terrorist with weapon Gut Knife, Task is Plant a bomb 
Counter Terrorist with weapon AK-47, Task is Diffuse bomb
```

### 5.6 模式分析

享元模式是一个考虑系统性能的设计模式，通过使用享元模式可以节约内存空间，提高系统的性能。

其核心在于享元工厂类，提供一个用于存储元对象的享元池，用户需要对象时，首先从享元池中获取，如果不存在再创建并，保存在享元池中。

### 5.8 优缺点 

优点：

- 可以极大减少内存中对象的数量，使得相同或相似对象在内存中只保存一份，从而可以节约系统资源，提高系统性能。
- 享元模式的外部状态相对独立，而且不会影响其内部状态，从而使得享元对象可以在不同的环境中被共享。

缺点：

- 享元模式使得系统变得复杂，需要分离出内部状态和外部状态，这使得程序的逻辑复杂化。
- 为了使对象可以共享，享元模式需要将享元对象的部分状态外部化，而读取外部状态将使得运行时间变长。

### 5.10 适用环境

- 一个系统有大量相同或者相似的对象，由于这类对象的大量使用，造成内存的大量耗费。
- 对象的大部分状态都可以外部化，可以将这些外部状态传入对象中。
- 使用享元模式需要维护一个存储享元对象的享元池，而这需要耗费资源，因此，应当在多次重复使用享元对象时才值得使用享元模式。

### 5.12. 模式扩展

- 单纯享元模式：所有的享元对象都是可以共享的，所有的抽象享元的子类都可以共享，不存在非共享具体享元类
- 符合享元模式：将一些单纯享元使用组合模式加以组合，可以形成复合享元对象，这样的复合享元对象本身不能共享，但是它们可以分解成单纯享元对象，而后者则可以共享。

享元模式与其他模式的联用

- 在享元模式的享元工厂类中通常提供一个静态的工厂方法用于返回享元对象，使用简单工厂模式来生成享元对象
- 在一个系统中，通常只有唯一一个享元工厂，因此享元工厂类可以使用单例模式进行设计。
- 享元模式可以结合组合模式形成复合享元模式，统一对享元对象设置外部状态。

## 6. 代理模式

_参考链接：_ [C++设计模式9--代理模式--万能的中间层](https://blog.csdn.net/gatieme/article/details/18035751)

### 6.1 模式动机

使用组合代理，将客户端不能使用的类或者接口，进行一次封装。具体由代理类来实现。代理类起到一个中间桥梁的作用。

### 6.2 模式定义

代理模式(Proxy Pattern) ：给某一个对象提供一个代 理，并由代理对象控制对原对象的引用。代理模式的英 文叫做Proxy或Surrogate，它是一种对象结构型模式。

### 6.3 模式结构

代理模式包含角色如下：

- Subject:抽象主题角色；声明了 RealSubject 与 Proxy 的共同接口，定义了某个/些功能。
- RealSubject（真实主题）：通常执行具体的业务逻辑，Proxy 控制对它的访问。
- Proxy:持有一个 RealSubject 引用（指针），可以在需要时将请求转发给 RealSubject，以此起到代理的作用。
- Client（客户端）：通过 Proxy 间接地与 RealSubject 进行交互。

**注意：** Proxy 和 RealSubject 都实现了 Subject 的接口，这允许 Client 可以像处理 RealSubject 一样处理 Proxy。

![结构模式类图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/Proxy.jpg)

时序图

![结构模式时序图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/seq_Proxy.jpg)


### 6.5 代码分析

#### 6.5.1 案例分析

> 中国移动 - 代理商
> 中国移动代理商：移动公司把充值的职责托付给代理点，代理点代替移动公司充值，客户直接与代理点打交道，而非移动公司。

#### 6.5.2 代码实现

##### 6.5.2.1 抽象主题

定义一个电信运行商 ITelco，并为其提供一个接口 Recharge()，用于充值：

```c
// subject.h
#ifndef SUBJECT_H
#define SUBJECT_H

// 电信运营商
class ITelco
{
public:
    virtual ~ITelco(){}
    virtual void Recharge(int money) = 0;  // 充值
};

#endif // SUBJECT_H
```
##### 6.5.2.2 创建真实主题

```c
// real_subject.h
#ifndef REAL_SUBJECT_H
#define REAL_SUBJECT_H

#include "subject.h"
#include <iostream>

// 中国移动
class CMCC : public ITelco
{
public:
    void Recharge(int money) override {
        std::cout << "Recharge " << money;
    }
};

#endif // REAL_SUBJECT_H
```
##### 6.5.2.3 创建代理
```c
// proxy.h
#ifndef PROXY_H
#define PROXY_H

#include "subject.h"
#include "real_subject.h"
#include <iostream>

// 代理点
class Proxy : public ITelco
{
public:
    Proxy() : m_pCMCC(NULL) {}
    ~Proxy() { delete m_pCMCC; }

    // 低于 50 不充
    void Recharge(int money) override {
        if (money >= 50) {
            if (m_pCMCC == NULL)
                m_pCMCC = new CMCC();
            m_pCMCC->Recharge(money);
        } else {
            std::cout << "Sorry, too little money" << std::endl;
        }
    }

private:
    CMCC *m_pCMCC;//代理移动成员变量
};

#endif // PROXY_H
```
**注意：** 注意： 代理类也是抽象主题类的子类，调用时可以在原有业务方法的基础上附加一些新的方法，来对功能进行扩充或约束。

##### 6.5.2.4 创建客户端

```c
// main.cpp
#include "proxy.h"

#ifndef SAFE_DELETE
#define SAFE_DELETE(p) { if(p){delete(p); (p)=NULL;} }
#endif

int main()
{
    Proxy* proxy = new Proxy();
    proxy->Recharge(20);
    proxy->Recharge(100);

    SAFE_DELETE(proxy);

    getchar();

    return 0;
}
```

输出结果：

```shell
Sorry, too little money 
Recharge 100
```

### 6.8 优缺点

优点:
- 代理模式能将代理对象与真正被调用的对象分离，在一定程度上降低了系统的耦合度。
- 在客户端和目标对象之间，代理起到一个中介作用，这样可以保护目标对象。在对目标对象调用之前，代理对象也可以进行其他操作。

缺点：
- 这种模式引入了另一个抽象层，这有时可能是一个问题。如果真实主题被某些客户端直接访问，并且其中一些客户端可能访问代理类，这可能会导致不同的行为。
- 由于在客户端和真实主题之间增加了代理对象，因此有些类型的代理模式可能会造成请求的处理速度变慢。
- 实现代理模式需要额外的工作，有些代理模式的实现非常复杂。

### 6.9 适用场景

- 远程代理（Remote Proxy）：为一个位于不同地址空间的对象提供一个本地代理，对代理的方法调用会导致对远程对象的方法调用。ATM 就是一个例子，ATM 可能会持有（存在于远程服务器中的）银行信息的一个代理对象。
- 虚拟代理（Virtual Proxy）：使用虚拟代理，代理可以作为一个（资源消耗较大的）对象的代表。虚拟代理经常延迟对象的创建，直到需要为止。在创建对象之前（及创建对象过程中），虚拟代理也可以作为对象的代理；之后，代理将请求直接委托给 RealSubject。
- 保护代理（Protection Proxy）:根据访问权限，可以使用保护代理来控制对资源的访问。例如，有一个员工对象，保护代理可以允许普通员工调用对象的某些方法，管理员调用其他方法。
- 缓冲代理（Cache Proxy）:为某一个目标操作的结果提供临时的存储空间，以便多个客户端可以共享这些结果。
- 智能引用代理（Smart Reference Proxy）:当一个对象被引用时，提供一些额外的操作（例如：将对象被调用的次数记录下来）。

## 7 组合模式
_参考链接：_ [C++ 组合模式](https://blog.csdn.net/liang19890820/article/details/71240662)

### 7.1 模式定义

组合模式（Composite Pattern）:组合多个对象形成树形结构以表示具有“整体-部分”关系的层次结构。组合模式对单个对象（即：叶子构件）和组合对象（即：容器构件）的使用具有一致性，组合模式又被称为“整体-部分”（Part-Whole）模式，属于对象结构型模式。

### 7.2 模式结构

成员说明：

- Component（抽象构件）：为叶子构件和容器构件对象定义接口，可以包含所有子类共有行为的声明和实现。在抽象构件中，声明了访问及管理子构件的接口（例如：Add()、Remove()、GetChild() 等）。
- Leaf（叶子构件）：叶子节点没有子节点。它实现了 Component 中定义的行为，对于访问及管理子构件的接口，可以通过异常等方式进行处理。
- Composite（容器构件）：容器节点包含子节点（可以是叶子构件，也可以是容器构件）。它提供了一个集合用于存储子节点，实现了 Component 中定义的行为，包括访问及管理子构件的接口，在其业务方法中可以递归调用其子节点的业务方法。

UML结构图（透明组合模式）：

![UML结构图（透明组合模式）](https://img-blog.csdn.net/20170505195903712?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbGlhbmcxOTg5MDgyMA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

UML结构图（安全组合模式）：

![UML结构图（安全组合模式）](https://img-blog.csdn.net/20170505195913620?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbGlhbmcxOTg5MDgyMA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

### 7.3 透明组合模式和安全组合模式

根据 Component 的定义形式，可将组合模式分为两种形式：

- 透明组合模式:
  - 在 Component 中定义了用于访问和管理子构建的接口，这样做的好处是确保所有的构件类都有相同的接口。
  - 在 Client 看来，Leaf 与 Composite 所提供的接口一致，Client 可以相同地对待所有的对象。
- 安全组合模式
  - 在 Component 中不定义任何用于访问和管理子构建的接口，而在 Composite 中声明并实现
  - 这种做法是安全的，因为不需要向 Leaf 提供这些管理成员对象的接口，对于 Leaf 来说，Client 不可能调用到这些接口。

透明组合模式的缺点是不够安全，因为 Leaf 和 Composite 在本质上是有区别的。Leaf 不可能有下一个层级，因此为其提供 Add()、Remove()、GetChild() 等接口没有意义。这在编译阶段不会出错，但在运行阶段如果调用这些接口可能会出错（如果没有提供相应的异常处理）。

安全组合模式的缺点是不够透明，因为 Leaf 和 Composite 具有不同的接口，且 Composite 中那些用于访问和管理子构建的接口没有在 Component 中定义，因此 Client 不能完全针对抽象编程，必须有区别地对待 Leaf 和 Composite。

PS： 透明组合模式是组合模式的标准形式，但在实际应用中，安全组合模式的使用频率也非常高。

### 7.4 优缺点

优点：

- 组合模式可以清楚地定义分层次的复杂对象，表示对象的全部或部分层次，它让 Client 忽略了层次的差异，方便对整个层次结构进行控制。
- Client 可以一致地使用一个组合结构或其中单个对象，不必关心处理的是单个对象还是整个组合结构，简化了 Client 的代码。
- 在组合模式中，增加新的叶子构件和容器构件很方便，无须对现有类进行任何修改，符合“开闭原则”。
- 为树形结构提供了一种灵活的解决方案，通过递归组合容器对象和叶子对象，可以形成复杂的树形结构，但对树形结构的控制却非常简单。

缺点：

- 使设计变得更加抽象，对象的业务规则如果很复杂，则实现组合模式具有很大挑战性，而且不是所有的方法都与叶子对象子类都有关联。

### 7.5 适用场景

- 表示对象的“整体-部分”层次结构（树形结构）
- 希望用户忽略组合对象与单个对象的不同，统一地使用组合结构中的所有对象。

### 7.6 案例

适用组合模式，进行公司部门和人员的管理

#### 7.6.1 透明组合模式

**创建抽象构件**
Component 需要定义访问及管理子构件的接口：

```c
// component.h
#ifndef COMPONENT_H
#define COMPONENT_H

#include <iostream>
#include <string>

using namespace std;

class Component
{
public:
    Component(string name) : m_strName(name) {}
    virtual ~Component() {}
    virtual void Add(Component *cmpt) = 0;  // 添加构件
    virtual void Remove(Component *cmpt) = 0;  // 删除构件
    virtual Component* GetChild(int index) = 0;  // 获取构件
    virtual void Operation(int indent) = 0;  // 显示构件（以缩进的方式）

private:
    Component();  // 不允许

protected:
    string m_strName;
};

#endif // COMPONENT_H
/* 安全组合模式 */

// component.h
#ifndef COMPONENT_H
#define COMPONENT_H

#include <iostream>
#include <string>

using namespace std;

class Component
{
public:
    Component(string name) : m_strName(name) {}
    virtual ~Component() {}
    virtual void Operation(int indent) = 0;  // 显示构件（以缩进的方式）

private:
    Component();  //注意这里将其构造函数设置为了私有函数，不允许在栈中分配内存，只能输入参数进行工作

protected:
    string m_strName;
};

#endif // COMPONENT_H

```

**创建叶子构建**

作为Component的子类，Leaf需要实现Component中定义的所有接口，但是Leaf不能包含子构件。因此，**在Leaf中实现访问和管理子构件的函数时，需要进行异常处理或错误提示。**当然，这无疑会给Leaf的实现带来麻烦。

```c
// leaf.h
#ifndef LEAF_H
#define LEAF_H

#include "component.h"

class Leaf : public Component
{
public:
    Leaf(string name) : Component(name){}
    virtual ~Leaf(){}
    void Add(Component *cmpt) {
        cout << "Can't add to a Leaf" << endl;
    }
    void Remove(Component *cmpt) {
        cout << "Can't remove from a Leaf" << endl;
    }
    Component* GetChild(int index) {
        cout << "Can't get child from a Leaf" << endl;
        return NULL;
    }
    void Operation(int indent) {
        string newStr(indent, '-');
        cout << newStr << " " << m_strName <<endl;
    }

private:
    Leaf();  // 不允许
};

#endif // LEAF_H
/* 安全模式接口 */

// leaf.h
#ifndef LEAF_H
#define LEAF_H

#include "component.h"

class Leaf : public Component
{
public:
    Leaf(string name) : Component(name){}
    virtual ~Leaf(){}
    void Operation(int indent) {
        string newStr(indent, '-');
        cout << newStr << " " << m_strName <<endl;
    }

private:
    Leaf();  // 不允许
};

#endif // LEAF_H
```
**注意**： 与透明模式不同，这里已经没有了访问及管理子构件的接口，所有的接口都在 Composite 中，不再赘述（同上）。

**创建容器构建**

由于容器构建中可以包含叶子节点，因此对容器构建进行处理时可以使用递归的方式。

```c
// composite.h
#ifndef COMPOSITE_H
#define COMPOSITE_H

#include <vector>
#include "component.h"

#ifndef SAFE_DELETE
#define SAFE_DELETE(p) { if(p){delete(p); (p)=NULL;} }
#endif

class Composite : public Component
{
public:
    Composite (string name) : Component(name) {}
    virtual ~Composite() {
        while (!m_elements.empty()) {
            vector<Component*>::iterator it = m_elements.begin();
            SAFE_DELETE(*it);
            m_elements.erase(it);
        }
    }
    void Add(Component *cmpt) {
        m_elements.push_back(cmpt);
    }
    void Remove(Component *cmpt) {
        vector<Component*>::iterator it = m_elements.begin();
        while (it != m_elements.end())  {
            if (*it == cmpt) {
                SAFE_DELETE(cmpt);
                m_elements.erase(it);
                break;
            }
            ++it;
        }
    }
    Component* GetChild(int index) {
        if (index >= m_elements.size())
            return NULL;

        return m_elements[index];
    }
    // 递归显示
    void Operation(int indent) {
        string newStr(indent, '-');
        cout << newStr << "+ " << m_strName << endl;
        // 显示每个节点的孩子
        vector<Component*>::iterator it = m_elements.begin();
        while (it != m_elements.end()) {
            (*it)->Operation(indent + 2);
            ++it;
        }
    }

private:
    Composite();  // 不允许

private:
    vector<Component *> m_elements;
};

#endif // COMPOSITE_H
```
**创建客户端**
主程序的客户端创建如下：

```c
// main.cpp
#include "composite.h"
#include "leaf.h"

int main()
{
    // 创建一个树形结构
    // 创建根节点
    Component *pRoot = new Composite("江湖公司（任我行）");

    // 创建分支
    Component *pDepart1 = new Composite("日月神教（东方不败）");
    pDepart1->Add(new Leaf("光明左使（向问天）"));
    pDepart1->Add(new Leaf("光明右使（曲洋）"));
    pRoot->Add(pDepart1);

    Component *pDepart2 = new Composite("五岳剑派（左冷蝉）");
    pDepart2->Add(new Leaf("嵩山（左冷蝉）"));
    pDepart2->Add(new Leaf("衡山（莫大）"));
    pDepart2->Add(new Leaf("华山（岳不群）"));
    pDepart2->Add(new Leaf("泰山（天门道长）"));
    pDepart2->Add(new Leaf("恒山（定闲师太）"));
    pRoot->Add(pDepart2);

    // 添加和删除叶子
    pRoot->Add(new Leaf("少林（方证大师）"));
    pRoot->Add(new Leaf("武当（冲虚道长）"));
    Component *pLeaf = new Leaf("青城（余沧海）");
    pRoot->Add(pLeaf);

    // 小丑，直接裁掉
    pRoot->Remove(pLeaf);

    // 递归地显示组织架构
    pRoot->Operation(1);

    // 删除分配的内存
    SAFE_DELETE(pRoot);

    getchar();

    return 0;
}
```

输出如下：
```sh
-+ 江湖公司（任我行） 
—+ 日月神教（东方不败） 
—– 光明左使（向问天） 
—– 光明右使（曲洋） 
—+ 五岳剑派（左冷蝉） 
—– 嵩山（左冷蝉） 
—– 衡山（莫大） 
—– 华山（岳不群） 
—– 泰山（天门道长） 
—– 恒山（定闲师太） 
— 少林（方证大师） 
— 武当（冲虚道长）
```

> 2019-11-10 21:41:49

# 行为型模式

## 1 命令模式

对象之间发送命令骑牛，不需要直到发送者是谁，只需要指定具体的接收请求者即可。

命令模式可以对发送者和接收者完全解耦，发送者与接收者之间没有直接引用关系，发送请求的对象只需要知道如何发送请求，而不必知道如何完成请求。这就是命令模式的模式动机。例如Qt的信号和槽函数，来实现命令模式

### 1.2 模式定义

命令模式（Command Pattern）是一种数据驱动的设计模式，它属于行为型模式。请求以命令的形式包裹在对象中，并传递给调用对象。调用对象寻找可以处理该命令的合适对象，并把该命令传给相应的对象，该对象执行命令。

### 1.3 模式结构

命令模式包含如下角色：

- Command: 抽象命令类；定义命令的接口，声明执行的方法。
- ConcreteCommand: 具体命令类：命令接口实现对象，通常会持有接收者，并调用接收者的功能来完成命令要执行的操作。
- Invoker: 调用者：要求命令对象执行请求，通常会持有命令对象，可以持有很多的命令对象。这个是客户端真正触发命令并要求命令执行相应操作的地方，也就是说相当于使用命令对象的入口。
- Receiver: 接收者，真正执行命令的对象。任何类都可能成为一个接收者，只要它能够实现命令要求实现的相应功能。
- Client:客户类：创建具体命令的对象，并设置其接收者;

![模式结构](https://design-patterns.readthedocs.io/zh_CN/latest/_images/Command.jpg)

![时序图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/seq_Command.jpg)

### 1.4 代码实现和实例

**打车队列**
使用打车队列实现一个简单的命令模式队列

command原型类，主要功能是定义命令执行的接口
```c
/* command.h */
#ifndef COMMAND_H
#define COMMAND_H

class Reciever;

// 提供执行命令的接口
class Command
{
public:
    Command(Reciever *reciever);
    virtual void execute() = 0;  // 执行命令
protected:
    Reciever *m_pReciever;
};

// 打车
class TakeCommand : public Command
{
public:
    TakeCommand(Reciever *reciever);
    void execute();
};

// 付款
class PayCommand : public Command
{
public:
    PayCommand(Reciever *reciever);
    void execute();
};

#endif // COMMAND_H
```
```c
/* command.cpp */
#include "command.h"
#include "reciever.h"
#include <iostream>

Command::Command(Reciever *reciever)
    : m_pReciever(reciever)
{

}

// 打车
TakeCommand::TakeCommand(Reciever *reciever)
    : Command(reciever)
{

}

void TakeCommand::execute()
{
    std::cout << "Take command..." << std::endl;
    m_pReciever->takeOrder();
}

// 付款
PayCommand::PayCommand(Reciever *reciever)
    : Command(reciever)
{

}

void PayCommand::execute()
{
    std::cout << "Pay command..." << std::endl;
    m_pReciever->receipt();
}
```
有了 Command，就需要有对应的 Invoker 来持有命令，然后进行触发。
```c
/* invoker.h */
#ifndef INVOKER_H
#define INVOKER_H

#include <list>
#include "command.h"

// 命令的持有者
class Invoker
{
public:
    Invoker();
    void addCmd(Command *cmd);  // 添加命令
    void deleteCmd(Command *cmd);  // 删除命令
    void notify();  // 执行命令

private:
    std::list<Command *> m_cmds;  // 命令队列
};

#endif // INVOKER_H
```

```c
/* invoker.cpp */
#include "invoker.h"

Invoker::Invoker()
{

}

void Invoker::addCmd(Command *cmd)
{
    m_cmds.push_back(cmd);
}

void Invoker::deleteCmd(Command *cmd)
{
    m_cmds.remove(cmd);
}

void Invoker::notify()
{
    std::list<Command *>::iterator it = m_cmds.begin();
    while (it != m_cmds.end()) {
        (*it)->execute();
        ++it;
    }
}
```
最后是 Reciever，也就是司机，用于执行命令（接单/收款）。

```c
/* reciever.h */
#ifndef RECIEVER_H
#define RECIEVER_H

// 司机
class Reciever
{
public:
    void takeOrder();  // 接单
    void receipt();  // 收款
};

#endif // RECIEVER_H

/* reciever.cpp */
#include "reciever.h"
#include <iostream>

// 接单
void Reciever::takeOrder()
{
    std::cout << "Take order..." << std::endl;
}

// 收款
void Reciever::receipt()
{
    std::cout << "Receipt..." << std::endl;
}

```
主要创建和接收方法：

```c
#include "invoker.h"
#include "reciever.h"
#include "command.h"

int main()
{
    Reciever *rev = new Reciever();
    Command *cmd1 = new TakeCommand(rev);
    PayCommand *cmd2 = new PayCommand(rev);
    Invoker inv;

    inv.addCmd(cmd1);
    inv.addCmd(cmd2);
    //发射信号执行函数
    inv.notify();

    delete cmd1;
    delete cmd2;
    delete rev;

    return 0;
}
/*
//输出内容如下;

Take command… 
Take order… 
Pay command… 
Receipt…

*/

```


### 1.5 优缺点

优点：

- 降低系统的耦合度。
- 新的命令可以很容易地加入到系统中。
- 可以比较容易地设计一个命令队列和宏命令（组合命令）。
- 可以方便地实现对请求的Undo和Redo。

缺点：

- 使用命令模式可能会导致某些系统有过多的具体命令类。因为针对每一个命令都需要设计一个具体命令类，因此某些系统可能需要大量具体命令类，这将影响命令模式的使用。(qt通过函数指针和宏定义来解决了这个问题)
- 

### 1.6 适用环境

- 系统需要将请求调用者和请求接收者解耦，使得调用者和接收者不直接交互。
- 系统需要在不同的时间指定请求、将请求排队和执行请求。
- 系统需要支持命令的撤销(Undo)操作和恢复(Redo)操作。
- 系统需要将一组操作组合在一起，即支持宏命令。

注意命令行的本质还是对于对象之间消息的接收和发送。

## 2. 中介者模式

在多对象的相互行为合作中，它们之间的联系和行为存在相似性，但是每个对象之间又存在独立性。系统的扩展度较低，往往需要单独为两个对象之间编写对应的接口函数；增大了系统的耦合性。

使用中介者模式来连接不同对象之间的相似，行为对系统进行松耦合。

**中介者模式（Mediator Pattern）**用一个中介对象来封装一系列的对象交互。中介者使各对象不需要显式地相互引用，从而使其耦合松散，而且可以独立地改变它们之间的交互。

### 2.1 模式结构
中介者模式包含如下角色：

- Mediator: 抽象中介者:为 Colleague 对象之间的通信定义接口。
- ConcreteMediator: 具体中介者:实现 Mediator 接口，并需要了解和维护各个 Colleague 对象，负责协调他们之间的通信。
- Colleague: 抽象同事类:定义与其他 Colleague 通信的接口。
- ConcreteColleague: 具体同事类:实现 Colleague 接口，并通过 Mediator 与其他 Colleague 进行沟通。

![中介者模式结构图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/Mediator.jpg)

**时序图**

![时序图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/seq_Mediator.jpg)

### 2.2 案例

> 房东-中介-客户

使用中介完善房东与客户之间的相似行为。

### 2.3 代码分析

**创建抽象中介者**

中介者除了要注册参与者之外，还需要将发送者的消息传递出去。

```c
// mediator.h
#pragma once

#include "colleague.h"
#include <list>

class IColleague;

// 抽象中介者
class IMediator
{
public:
    // 注册参与者
    virtual void registerColleague(IColleague* colleague) { m_colleagues.emplace_back(colleague); }
    const std::list<IColleague*>& getColleagues() const { return m_colleagues; }

    // 将发送者的消息发送给所有参与者
    virtual void distributeMessage(const IColleague* sender, const std::string& message) const = 0;

private:
    std::list<IColleague*> m_colleagues;//两边的类列表
};
```
**创建具体中介者**
具体中介者的职责是遍历所有的参与者，将发送者的消息通知到每一个人：
```c
// concrete_mediator.h
#ifndef CONCRETE_MEDIATOR_H
#define CONCRETE_MEDIATOR_H

#include "mediator.h"

// 具体中介者
class ConcreteMediator : public IMediator
{
public:
    // 将发送者的消息发送给所有参与者（但不包括发送者自己）
    virtual void distributeMessage(const IColleague* sender, const std::string& message) const override {
        for (const IColleague* c : getColleagues())
            if (c != sender)  // 不要将消息发送给自己
                c->receiveMessage(sender, message);
    }
};

#endif // CONCRETE_MEDIATOR_H
```
**创建抽象同事**
由于房东和租客均由同事类表示，所以既需要（房东）发送消息，又需要（租客）接收消息：
```c
// colleague.h
#pragma once

#include "mediator.h"
#include <string>

class IMediator;

// 抽象同事类
class IColleague
{
public:
    IColleague(const std::string& name) : m_strName (name) {}
    std::string getName() const { return m_strName; }

    // 通过中介者，将自己的消息发布出去
    virtual void sendMessage(const IMediator& mediator, const std::string& message) const = 0;
    // 接收来自发送者的消息
    virtual void receiveMessage(const IColleague* sender, const std::string& message) const = 0;

private:
    std::string m_strName;
};

```
**创建具体同事**
在内部，具体的消息发送由中介者完成:

```c
// concrete_colleague.h
#ifndef CONCRETE_COLLEAGUE_H
#define CONCRETE_COLLEAGUE_H

#include "colleague.h"
#include <iostream>

// 具体同事类
class ConcreteColleague : public IColleague
{
public:
    using IColleague::IColleague;

    // 通过中介者，将自己的消息发布出去
    virtual void sendMessage(const IMediator& mediator, const std::string& message) const override {
        mediator.distributeMessage(this, message);
    }

private:
    // 接收来自发送者的消息
    virtual void receiveMessage(const IColleague* sender, const std::string& message) const override {
        std::cout << getName() << " received the message from "
                  << sender->getName() << ": " << message << std::endl;
    }
};

#endif // CONCRETE_COLLEAGUE_H

```

**创建客户端**

找房啦！一旦房东将房子挂出去，中介便会通知所有需要租房的人：

```c
// main.cpp
#include "concrete_colleague.h"
#include "concrete_mediator.h"

#ifndef SAFE_DELETE
#define SAFE_DELETE(p) { if(p){delete(p); (p)=NULL;} }
#endif

int main()
{
    // 房东
    IColleague *landlord = new ConcreteColleague("Tom");

    // 租客
    IColleague *jerry = new ConcreteColleague("Jerry");
    IColleague *tuffy = new ConcreteColleague("Tuffy");

    // 中介者 - 添加租客
    ConcreteMediator mediator;
    mediator.registerColleague(jerry);
    mediator.registerColleague(tuffy);

    // 房东通过中介将消息发送出去
    landlord->sendMessage(mediator, "Xi'erqi, two bedroom house, 6000/month.");

    SAFE_DELETE(jerry);
    SAFE_DELETE(tuffy);

    getchar();

    return 0;
}
/*
输出如下：

Jerry received the message from Tom: Xi’erqi, two bedroom house, 6000/month. 
Tuffy received the message from Tom: Xi’erqi, two bedroom house, 6000/month.
*/
```

### 2.8 优缺点

优点：

- 简化了对象之间的交互。
- 将各同事解耦。
- 减少子类生成。
- 可以简化各同事类的设计和实现。

缺点：

- 在具体中介者类中包含了同事之间的交互细节，可能会导致具体中介者类非常复杂，使得系统难以维护。

该模式主要应用于MVC交媾中的控制器部分。Controller 作为一种中介者，它负责控制视图对象View和模型对象Model之间的交互。如在Struts中，Action就可以作为JSP页面与业务对象之间的中介者。

中介者模式也应用于GUI中，在比较复杂的界面中可能存在多个界面组件之间的互交关系。

### 2.9 模式扩展

迪米特法则：中介模式中，创建一个中介者对象，将系统中有关的对象所引用的其它对象数目减少到最少，使得一个对象与其同事之间的相互作用被取代。


### 2.10 总结
- 使用中介者将需要发送的消息通过中介者进行发送。和命令模式不同的是，**命令模式着重，信号前后的行为，不管具体对象；重点在于command**。中介者模式主要是通过中介将消息的接收者进行同一管理，重点在与接收者。
- 中介者模式，使得各个对象不需要显式地相互调用
- 使用中介者模式可以有效的隐藏中间消息传递筛选细节。

## 3 观察者模式

上述模式中，需要使用明显的调用函数，来进行两个对象之间的通信，但是能否建立一种关系，使得一个对象发生改变时，自动通知其它对象，做出反映。这种模式就是观察者模式

### 3.2 模式定义

**观察者模式(Observer Pattern)**：定义对象间的一种一对多依赖关系，使得每当一个对象状态发生改变时，其相关依赖对象皆得到通知并被自动更新。观察者模式又叫做发布-订阅（Publish/Subscribe）模式、模型-视图（Model/View）模式、源-监听器（Source/Listener）模式或从属者（Dependents）模式。

观察者模式是一种对象行为型模式。

### 3.3 模式结构
观察者模式包含如下角色：

- Subject: 目标主题：跟踪所有观察者，并提供添加和删除观察者的接口。
- ConcreteSubject: 具体目标；将有关状态存入各 ConcreteObserver 对象。当具体主题的状态发生任何更改时，通知所有观察者。
- Observer: 观察者：为所有的具体观察者定义一个接口，在得到主题的通知时进行自我更新。
- ConcreteObserver: 具体观察者；实现 Observer 所要求的更新接口，以便使本身的状态与主题的状态相协调。

类图如下：

![观察者类图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/Obeserver.jpg)

时序图：

![时序图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/seq_Obeserver.jpg)


### 3.4 实际案例

滴滴平台中，司机相当于观察者，滴滴相当于主题。

### 3.5 代码实现

**创建抽象主题**
提供注册、注销、通知观察者的接口

```c
// subject.h
#ifndef SUBJECT_H
#define SUBJECT_H

class IObserver;

// 抽象主题
class ISubject
{
public:
    virtual void Attach(IObserver *) = 0;  // 注册观察者
    virtual void Detach(IObserver *) = 0;  // 注销观察者
    virtual void Notify() = 0;  // 通知观察者
};

#endif // SUBJECT_H
```
**创建具体主题**
抽象主题的具体实现，用于管理所有的观察者：
```c
// concrete_subject.h
#ifndef CONCRETE_SUBJECT_H
#define CONCRETE_SUBJECT_H

#include "subject.h"
#include "observer.h"
#include <iostream>
#include <list>

using namespace std;

// 具体主题
class ConcreteSubject : public ISubject
{
public:
    ConcreteSubject() { m_fPrice = 10.0; }

    void SetPrice(float price) {
        m_fPrice = price;
    }

    void Attach(IObserver *observer) {
        m_observers.push_back(observer);
    }

    void Detach(IObserver *observer) {
        m_observers.remove(observer);
    }

    void Notify() {
        list<IObserver *>::iterator it = m_observers.begin();
        while (it != m_observers.end()) {
            (*it)->Update(m_fPrice);
            ++it;
        }
    }

private:
    list<IObserver *> m_observers;  // 观察者列表
    float m_fPrice;  // 价格
};

#endif // CONCRETE_SUBJECT_H
```
**创建抽象观察者**

提供一个 Update() 接口，用于更新价格：
```c
// observer.h
#ifndef OBSERVER_H
#define OBSERVER_H

// 抽象观察者
class IObserver
{
public:
    virtual void Update(float price) = 0;  // 更新价格
};

#endif // OBSERVER_H
```

**创建具体观察者**

抽象观察者的具体实现，当接收到通知后，调整对应的价格：
```c

// concrete_observer.h
#ifndef CONCRETE_OBSERVER_H
#define CONCRETE_OBSERVER_H

#include "observer.h"
#include <iostream>
#include <string>

using namespace std;

// 具体观察者
class ConcreteObserver : public IObserver
{
public:
    ConcreteObserver(string name) { m_strName = name; }

    void Update(float price) {
        cout << m_strName << " - price: " << price << "\n";
    }

private:
     string m_strName;  // 名字
};

#endif // CONCRETE_OBSERVER_H
```
**创建客户端**

创建主题以及对应的观察者，并添加观察者并更新价格：
```c
// main.cpp
#include "concrete_subject.h"
#include "concrete_observer.h"

#ifndef SAFE_DELETE
#define SAFE_DELETE(p) { if(p){delete(p); (p)=NULL;} }
#endif

int main()
{
    // 创建主题、观察者
    ConcreteSubject *pSubject = new ConcreteSubject();
    IObserver *pObserver1 = new ConcreteObserver("Jack Ma");
    IObserver *pObserver2 = new ConcreteObserver("Pony");

    // 注册观察者
    pSubject->Attach(pObserver1);
    pSubject->Attach(pObserver2);

    // 更改价格，并通知观察者
    pSubject->SetPrice(12.5);
    pSubject->Notify();

    // 注销观察者
    pSubject->Detach(pObserver2);
    // 再次更改状态，并通知观察者
    pSubject->SetPrice(15.0);
    pSubject->Notify();

    SAFE_DELETE(pObserver1);
    SAFE_DELETE(pObserver2);
    SAFE_DELETE(pSubject);

    getchar();

    return 0;
}
/*
输出如下：
Jack Ma - price: 12.5 
Pony - price: 12.5 
Jack Ma - price: 15

 */
```
它和中介者模式的重要区别在于，使用subject代替了中介者的connect；实现了**不同类的1对多**的消息监听和传递；重点在于**消息**。但是中介者模式是**同一类中多对多的**；重点在于对象。命令模式基本上是**一对一的且重点在命令**；**上述都是针对客户端的实现来说的**


### 3.8 优缺点

优点：

- 观察者和被观察者是抽象耦合的
- 建立一套触发机制
- 实现表示层与逻辑层的分离，并定义了稳定的消息更新传递机制
- 观察者模式支持广播通信。

缺点：

- 如果一个被观察者对象有很多的直接和间接的观察者，将所有的观察者都通知到会花费很多时间。
- 如果在观察者和观察目标之间有循环依赖的话，观察目标会触发它们之间进行循环调用，可能导致系统崩溃。
- 观察者模式没有相应的机制让观察者知道所观察的目标对象是怎么发生变化的，而仅仅只是知道观察目标发生了变化。

### 3.9 适用情况

- 一个抽象模型有两个方面，其中一个方面依赖于另一个方面。将这些方面封装在独立的对象中使它们可以各自独立地改变和复用。
- 一个对象的改变将导致其他一个或多个对象也发生改变，而不知道具体有多少对象将发生改变，可以降低对象之间的耦合度。
- 一个对象必须通知其他对象，而并不知道这些对象是谁。
- 需要在系统中创建一个触发链，A对象的行为将影响B对象，B对象的行为将影响C对象……，可以使用观察者模式创建一种链式触发机制。

### 3.10 模式应用

观察者模式在软件开发中应用非常广泛，如某电子商务网站可以在执行发送操作后给用户多个发送商品打折信息，某团队战斗游戏中某队友牺牲将给所有成员提示等等，凡是涉及到一对一或者一对多的对象交互场景都可以使用观察者模式。

### 3.11 模式扩展

MVC模式是一种架构模式，它包含三个角色：模型(Model)，视图(View)和控制器(Controller)。观察者模式可以用来实现MVC模式，观察者模式中的观察目标就是MVC模式中的模型(Model)，而观察者就是MVC中的视图(View)，控制器(Controller)充当两者之间的中介者(Mediator)。当模型层的数据发生改变时，视图层将自动改变其显示内容。


## 4 状态模式

类中存在状态成员变量，来描述对象中不同状态的变化；状态模式就是监听不同对象的状态变化的情况并，做出反映。从客户端来说，主要的状态变化和消息传递，都是直接封装在相似对象类中；不是观察者模式直接将消息类化，也不是中介者模式，使用中介者来管理链接。而是直接使用环境类，来进行状态的改变。当对象根据其内部状态改变其行为时，将使用状态设计模式。

### 4.2 模式定义

状态模式(State Pattern) ：允许一个对象在其内部状态改变时改变它的行为，对象看起来似乎修改了它的类。其别名为状态对象(Objects for States)，状态模式是一种对象行为型模式。

### 4.3 模式结构

- Context（上下文）：定义一个与 Client 交互的接口。它维护对 ConcreteState 对象的引用，可以用该对象来定义当前状态。
- State（抽象状态）：定义接口，来声明每个 ConcreteState 应该做什么。
- ConcreteState（具体状态）：为 State 中定义的方法提供实现。

![状态类图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/State.jpg)

![状态模式时序图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/seq_State.jpg)


### 4.4 案例分析

> 交通信号灯
> 交通信号灯的不同状态，是进行交通规则管制的关键。

可以看到，交通信号灯的状态流：红灯 -> 绿灯 -> 黄灯。不同的状态是程序的关键。

### 4.5 代码实现

#### 4.5.1 创建上下文
上下文由 TrafficLights 表示，该类有一个 IState 变量，在构造中被初始化为 RedLight（红灯）：
```c
// context.h
#ifndef CONTEXT_H
#define CONTEXT_H

#include "concrete_state.h"

// 交通信号灯
class TrafficLights
{
public:
    TrafficLights() { m_pState = new RedLight(this); }
    void SetState(IState* state) { m_pState = state; }
    void Request() { m_pState->Handle(); }

private:
    IState* m_pState;//state关键成员
};

#endif // CONTEXT_H
```
**注意： 在上下文提供的方法中，实际上使用的是 IState 的相应方法。**

#### 4.5.2 state
**创建抽象状态**

IState 有一个 Handle() 接口，用于改变状态：
```c
// state.h
#ifndef STATE_H
#define STATE_H

// 信号灯的状态
class IState
{
public:
    virtual void Handle() = 0;
};
#endif // STATE_H
```
**创建具体状态**

具体的状态有三个 - 红灯、绿灯、黄灯：
```c
// concrete_state.h
#ifndef CONCRETE_STATE_H
#define CONCRETE_STATE_H

#include "state.h"

class TrafficLights;

// 红灯
class RedLight : public IState
{
public:
    RedLight(TrafficLights* context);
    virtual void Handle() override;

private:
    TrafficLights* m_pContext;
};

// 绿灯
class GreenLight : public IState
{
public:
    GreenLight(TrafficLights* context);
    virtual void Handle() override;

private:
    TrafficLights* m_pContext;
};

// 黄灯
class YellowLight : public IState
{
public:
    YellowLight(TrafficLights* context);
    virtual void Handle() override;
private:
    TrafficLights* m_pContext;
};
#endif // CONCRETE_STATE_H
```
它们所提供的方法有对上下文对象的引用，并且能够改变它的状态：
```c
// concrete_state.cpp
#include "concrete_state.h"
#include "context.h"
#include <iostream>

// 红灯
RedLight::RedLight(TrafficLights* context) : m_pContext(context) {}

void RedLight::Handle()
{
    std::cout << "Red Light" << std::endl;
    m_pContext->SetState(new GreenLight(m_pContext));
    delete this;
}

// 绿灯
GreenLight::GreenLight(TrafficLights* context) : m_pContext(context) {}

void GreenLight::Handle()
{
    std::cout << "Green Light" << std::endl;
    m_pContext->SetState(new YellowLight(m_pContext));
    delete this;
}

// 黄灯
YellowLight::YellowLight(TrafficLights* context) : m_pContext(context) {}

void YellowLight::Handle()
{
    std::cout << "Yellow Light" << std::endl;
    m_pContext->SetState(new RedLight(m_pContext));
    delete this;
}
```
#### 4.5.3 创建客户端

```c
// main.cpp
#include "context.h"
#include <iostream>
#include <windows.h>

int main()
{
    //交通灯
    TrafficLights tl;

    enum TLState {Red, Green, Yellow};

    TLState state = Red;  // 初始状态为红灯
    int i = 0;  // 总次数
    int seconds;  // 秒数

    while (true) {
        // 表示一个完整的状态流（红灯->绿灯->黄灯）已经完成
        if (i % 3 == 0)
            std::cout << "**********" << "Session " << ((i+1)/3)+1 << "**********" << std::endl;

        // 根据当前状态来设置持续时间，红灯（6秒）、绿灯（4秒）、黄灯（2秒）
        if (state == Red) {
            seconds = 6;
            state = Green;
        } else if (state == Green) {
            seconds = 4;
            state = Yellow;
        } else if (state == Yellow) {
            seconds = 2;
            state = Red;
        }

        // 休眠
        Sleep(seconds * 1000);

        tl.Request();
        i++;
    }

    return 0;
}

/*
//输出如下：
*****Session 1***** 
Red Light 
Green Light 
Yellow Light 
*****Session 2***** 
Red Light 
Green Light 
Yellow Light 
*****Session 3***** 
Red Light 
Green Light 
Yellow Light 
*****Session n***** 
*/
```
### 4.8 优缺点

优点：

- 封装了转换规则。；枚举了可能的状态，避免了未定义行为
- 很容易添加状态来支持额外的行为。
- 在状态模式中，对象的行为是其状态中函数的结果，并且在运行时根据状态改变行为，这就消除了对 switch/case 或 if/else 条件逻辑的依赖。
- 可以提高内聚性，因为状态特定的行为被聚合到具体的类中，这些类被放在代码中的一个位置。

缺点：

- 使用状态模式，必然会增加系统中类和对象的个数。
- 由于状态模式的结构与实现较为复杂，一旦使用不当，将会导致程序结构和代码的混乱。
- 若要添加新的状态，则需要修改负责转换的源代码，否则无法转换到新增的状态，而且修改某个状态的行为也要修改源代码。

### 4.9 适用环境

- 对象的行为依赖于它的状态（属性）并且可以根据它的状态改变而改变它的相关行为。
- 代码中包含大量与对象状态有关的条件语句，这些条件语句的出现，会导致代码的可维护性和灵活性变差，不能方便地增加和删除状态，使客户类与类库之间的耦合增强。在这些条件语句中包含了对象的行为，而且这些条件对应于对象的各种状态。

### 4.10 模式应用

在游戏或者业务办理流程中，文件和人物存在多个状态；尚未办理；正在办理；正在批示；正在审核；已经完成等；这些状态非常重要，此时应该适用状态模式，以状态为中心。**总体来说，对象的状态就是程序的核心，程序需要建立单独的状态类**

## 5 策略模式

完成任务，往往根据不同的条件和要求，使用不同的策略，例如对于目标检测，使用深度相机和双目相机都能进行目标的检测和识别，但是针对不同的输入需要进行模块的设计来进行策略的修改。为了解决这些问题，可以定义一些独立的类来封装不同的算法，每一个类封装一个具体的算法，在这里，每一个封装算法的类我们都可以称之为策略(Strategy)，为了保证这些策略的一致性，一般会用一个抽象的策略类来做算法的定义，而具体每种算法则对应于一个具体策略类。

### 5.1 模式定义

**策略模式(Strategy Pattern)**：定义一系列算法，将每一个算法封装起来，并让它们可以相互替换。策略模式让算法独立于使用它的客户而变化，也称为政策模式(Policy)。

策略模式是一种对象行为型模式。

### 5.3 模式结构

- Context（环境角色）：持有一个对 Strategy 的引用，最终给客户端调用。
- Strategy（抽象策略）：定义了一个公共接口，让不同的算法以不同的方式来实现。通过这个接口，Context 可以调用不同的算法。
- ConcreteStrategy（具体策略）：实现 Strategy 定义的接口，提供具体算法的实现。

**结构图：**

![策略模式结构图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/Strategy.jpg)

**时序图：**

![策略模式时序图](https://design-patterns.readthedocs.io/zh_CN/latest/_images/seq_Strategy.jpg)

### 5.4 案例分析

对于出行，有不同的出行方式，每一种出行方式都是一种具体的策略。如何选择需要根据成本、便利和时间之间的权衡。

### 5.4 代码实现

#### 5.4.1 创建抽象策略

抽象策略由 IStrategy 表示，它提供了一个 Travel() 接口，用于提供出行方式：

```c
// strategy.h
#ifndef STRATEGY_H
#define STRATEGY_H

// 出行策略
class IStrategy
{
public:
    //关键出行方式
    virtual void Travel() = 0;
};
#endif // STRATEGY_H
```
#### 5.4.2 创建具体策略

有三种具体的策略可供选择，骑自行车、开车、坐火车：
```c
// concrete_strategy.h
#ifndef CONCRETE_STRATEGY_H
#define CONCRETE_STRATEGY_H

#include "strategy.h"
#include <iostream>

// 骑自行车
class BikeStrategy : public IStrategy
{
public:
    virtual void Travel() override { std::cout << "Travel by bike" << std::endl; }
};

// 开车
class CarStrategy : public IStrategy
{
public:
    virtual void Travel() override { std::cout << "Travel by car" << std::endl; }
};

// 坐火车
class TrainStrategy : public IStrategy
{
public:
    virtual void Travel() override { std::cout << "Travel by train" << std::endl; }
};

#endif // CONCRETE_STRATEGY_H
```
#### 5.4.3 创建环境角色

环境角色对外提供了一个Travel接口，最终由客户端调用。在内部，它最终调用的是IStrategy的相应方法：
```c
// context.h
#ifndef CONTEXT_H
#define CONTEXT_H

#include "strategy.h"

class Context
{
public:
    Context(IStrategy *strategy) { m_pStrategy = strategy; }
    void Travel() { m_pStrategy->Travel(); }

private:
    IStrategy *m_pStrategy;
};

#endif // CONTEXT_H
```
#### 5.4.4 创建客户端

```c
// main.cpp
#include "context.h"
#include "concrete_strategy.h"

#ifndef SAFE_DELETE
#define SAFE_DELETE(p) { if(p){delete(p); (p)=NULL;} }
#endif

int main()
{
    // 创建不同的策略
    IStrategy *bike = new BikeStrategy();
    IStrategy *car = new CarStrategy();
    IStrategy *train = new TrainStrategy();

    //创建策略上下文

    Context *bikeContext = new Context(bike);
    Context *carContext = new Context(car);
    Context *trainContext = new Context(train);
    //执行策略

    bikeContext->Travel();
    carContext->Travel();
    trainContext->Travel();

    SAFE_DELETE(bike);
    SAFE_DELETE(car);
    SAFE_DELETE(train);

    SAFE_DELETE(bikeContext);
    SAFE_DELETE(carContext);
    SAFE_DELETE(trainContext);

    getchar();

    return 0;
}

/*
输出如下：

Travel by bike 
Travel by car 
Travel by train

*/
```
### 5.6 模式分析

- 策略模式是一个比较容易理解和使用的设计模式，策略模式是对算法的封装，将算法的责任和算法本身分隔开，将其委派给不同的对象管理。
- 策略角色的选择主要由客户端决定
- 策略模式仅仅封装算法，算法是选择由客户端来决定。

### 5.8 优缺点

优点：

- 各自使用封装的算法，可以很容易地引入新的算法来满足相同的接口。
- 由于实现的是同一个接口，所以策略之间可以自由切换。
- Strategy 使客户端能够选择所需的算法，而无需使用 switch/case 或 if/else 语句。
- 算法的细节完全封装在 Strategy 类中，因此，可以在不影响 Context 类的情况下更改算法的实现。

缺点：

- 客户端必须知道所有的策略，了解它们之间的区别，以便适时选择恰当的算法。
- 策略模式将造成产生很多策略类，可以通过使用享元模式在一定程度上减少对象的数量。

### 5.9 适用场景

- 多个类有不同的表现形式，每种表现形式可以独立成单独的算法。
- 需要在不同情况下使用不同的算法，以后算法可能还会增加。
- 对客户端隐藏具体算法的实现细节，彼此完全独立。

## 6 模板方法模式

**模版方法模式（Template Method Pattern）**:定义一个操作中算法的骨架，而将一些步骤延迟到子类中。模板方法使得子类可以不改变一个算法的结构即可重定义该算法的某些特定步骤。

### 6.1 模板结构

- 抽象类（AbstractClass）：定义抽象的原语操作，具体的子类将重定义它们以实现一个算法的各步骤。主要是实现一个模板方法，定义一个算法的骨架。该模板方法不仅调用原语操作，也调用定义在 AbstractClass 或其他对象中的操作。
- 具体类（ConcreteClass）：实现原语操作以完成算法中与特定子类相关的步骤。


结构模式如下：

![模板方法结构模式](https://img-blog.csdn.net/20180228180146301?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMTAxMjkzMg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### 6.2 案例分析

> 招聘会。
> 不同的公司招聘流程基本相同，
> 
> 都含有“宣讲会 -> 接收简历 -> 面试 -> 发放 Offer”；这些固定的流程
> 
> 不同公司的细节不同，可以使用模板类来减少代码的重用与设计

### 6.3 代码实现

#### 6.3.1 创建抽象类

抽象类由 Company 表示，它提供了一套固定的模板方法 Recruit()，用于标准化算法的骨架：
```c
// abstract_class.h
#ifndef ABSTRACT_CLASS_H
#define ABSTRACT_CLASS_H

#include <iostream>

// 公司
class Company
{
public:
    virtual ~Company() {}
    // 校园招聘
    void Recruit() {
        std::cout << "---------- Begin ----------" << std::endl;
        CareerTalk();
        ReceiveResume();
        Interview();
        Offer();
        std::cout << "---------- End ----------" << std::endl;
    }
    // 宣讲会
    void CareerTalk() {
        std::cout << "Delivery" << std::endl;
    }
    // 接收简历
    void ReceiveResume() {
        std::cout << "Receive Resume" << std::endl;
    }
    // 面试
    virtual void Interview() = 0;
    // 发放 Offer
    virtual void Offer() = 0;
};

#endif // ABSTRACT_CLASS_H
```
**注意：**相同的行为 CareerTalk() 和 ReceiveResume() 有默认实现，不同的行为 Interview() 和 Offer() 采用“占位符”方式，需要由具体公司来实现。

#### 6.3.2 创建具体类

具体公司有两个 - Alibaba、Tencent，它们的面试、录用方式不同：
```c
// concrete_class.h
#ifndef CONCRETE_CLASS_H
#define CONCRETE_CLASS_H

#include "abstract_class.h"
#include <iostream>

// 阿里
class Alibaba : public Company
{
public:
    virtual void Interview() override {
        std::cout << "First interview -> Second interview -> Third interview" << std::endl;
    }

    virtual void Offer() override {
        std::cout << "30W" << std::endl;
    }
};

// 腾讯
class Tencent : public Company
{
public:
    virtual void Interview() override {
        std::cout << "First interview -> Second interview" << std::endl;
    }

    virtual void Offer() override {
        std::cout << "25W" << std::endl;
    }
};

#endif // CONCRETE_CLASS_H
```
#### 5.3.3 创建客户端

```c
// main.cpp
#include "concrete_class.h"

#ifndef SAFE_DELETE
#define SAFE_DELETE(p) { if(p){delete(p); (p)=NULL;} }
#endif

int main()
{
    // 阿里校招
    Company *alibaba = new Alibaba();
    alibaba->Recruit();

    // 腾讯校招
    Company *tencent = new Tencent();
    tencent->Recruit();

    SAFE_DELETE(tencent);
    SAFE_DELETE(alibaba);

    getchar();

    return 0;
}

/*
输出结果;

———- Begin ———- 
Delivery 
Receive Resume 
First interview -> Second interview -> Third interview 
30W 
———- End ———- 
———- Begin ———- 
Delivery 
Receive Resume 
First interview -> Second interview 
25W 
———- End ———-
————————————————

*/
```

### 6.8 优缺点
优点：

- 在父类中形式化地定义一个算法，而由其子类实现细节的处理，在子类实现详细的处理算法时并不会改变算法中步骤的执行次序。
- 模板方法模式是一种代码复用技术，在类库设计中尤为重要，它提取了类库中的公共行为，将公共行为放在父类中，而通过其子类来实现不同的行为，它鼓励我们恰当使用继承来实现代码复用。
- 可实现一种反向控制结构，通过子类覆盖父类的钩子方法来决定某一特定步骤是否需要执行。
- 在模板方法模式中，可以通过子类来覆盖父类的基本方法，不同的子类可以提供基本方法的不同实现，更换和增加新的子类很方便，符合单一职责原则和开闭原则。
  
缺点：

- 需要为每一个基本方法的不同实现提供一个子类，如果父类中可变的基本方法太多，将会导致类的个数增加，系统更加庞大，设计也更加抽象，此时，可结合桥接模式来进行设计。

### 6.9 使用场景

- 对一些复杂的算法进行分割，将算法中固定不变的部分设计为模板方法和父类具体方法，而一些可变的细节由子类实现。
- 各子类中公共的行为应被提取出来并集中到一个公共父类中，以避免代码重复。
- 需要通过子类来决定父类算法中某个步骤是否执行，实现子类对父类的反向控制。


## 7 备忘录模式

**备忘录模式（Memento Pattern）**：在不破坏封装的前提下，捕获一个对象的内部状态，并在该对象之外保存这个状态，这样可以在以后将对象恢复到原先保存的状态。

### 7.2 模式结构

基本成员如下：

- Originator（发起人）：负责创建一个 Memento，以记录当前时刻自身的内部状态，并可以使用 Memento 恢复内部状态。Originator 可以根据需要决定 Memento 储存自己的哪些内部状态。
- Memento（备忘录）：负责存储 Originator 对象的内部状态，并可以防止 Originator 以外的其他对象访问备忘录。
- Caretaker（管理者）：负责管理 Memento，但不能对 Memento 的内容进行访问或者操作。

模式结构图：

![模式结构图](https://img-blog.csdn.net/20180208175956201?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMTAxMjkzMg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### 7.3 案例分析

> 月光宝盒 - 让时光倒流
>
> 备忘录模式提供了时光倒流的机制，将一个对象某个时刻的状态进行备份，当用户后悔（需要返回之前的状态）时，可以把备份调用出来！

### 7.4 代码实现

#### 7.4.1 创建备忘录

穿越至某一时刻，这个时刻指具体的日期时间，用 DateTime 表示，并为其提供相应的 setter 和 getter 方法：

```c
// memento.h
#ifndef MEMENTO_H
#define MEMENTO_H

#include <iostream>
#include <string>

// 日期时间
class DateTime
{
public:
    DateTime(std::string dt)
        : m_dateTime(dt) {}
    void SetDateTime(std::string dt) {
        m_dateTime = dt;
    }
    std::string GetDateTime() {
        return m_dateTime;
    }
private:
    std::string m_dateTime;
};
#endif // MEMENTO_H
```
#### 7.4.2 创建发起人
Life 用于创建 DateTime，以记录当前的日期时间，并可以使用 DateTime 进行恢复：
```c
// originator.h
#ifndef ORIGINATOR_H
#define ORIGINATOR_H

#include "memento.h"
#include <iostream>
#include <string>

// 一生
class Life
{
public:
    void SetDateTime(std::string dt) {
        std::cout << "Set date time to " << dt << std::endl;
        m_dateTime = dt;
    }
    // 仅用于打印
    std::string GetDateTime() {
        return m_dateTime;
    }

    // 恢复日期时间
    void SetMemento(DateTime *dt) {
        m_dateTime = dt->GetDateTime();
    }

    // 创建日期时间
    DateTime *CreateMemento() {
        return new DateTime(m_dateTime);
    }
private:
    std::string m_dateTime;
};
#endif // ORIGINATOR_H
```
#### 7.4.3 创建管理者
这是时光倒流的关键，通过 PandoraBox，至尊宝才可以弥补遗憾：
```c
// care_taker.h
#ifndef CARE_TAKER_H
#define CARE_TAKER_H

#include "originator.h"
#include <iostream>
#include <vector>

// 月光宝盒
class PandoraBox
{
public:
    PandoraBox(Life *life)
        : m_pLife(life) {}

    ~PandoraBox() {
        for (int i = 0; i < m_history.size(); i++) {
            delete m_history.at(i);
        }
        m_history.clear();
    }

    // 保存备份
    void Save() {
        std::cout << "Save ..." << std::endl;;
        m_history.push_back(m_pLife->CreateMemento());
    }

    // 穿越至上一时刻
    void Undo() {
        std::cout << "Undo ..." << std::endl;;
        m_pLife->SetMemento(m_history.back());
        m_history.pop_back();
    }

private:
    Life *m_pLife;
    std::vector<DateTime *> m_history;
};

#endif // CARE_TAKER_H
```
#### 7.4.4 创建客户端

```c
// main.cpp
#include "originator.h"
#include "care_taker.h"

#ifndef SAFE_DELETE
#define SAFE_DELETE(p) { if(p){delete(p); (p)=NULL;} }
#endif

int main()
{
    //创建状态发起人
    Life *life = new Life();
    PandoraBox *box = new PandoraBox(life);

    // 设置并保存一个历史时间
    life->SetDateTime("2000/10/01 00:00:00");
    box->Save();

    // 设置并保存一个历史时间
    life->SetDateTime("2010/10/01 00:00:00");
    box->Save();

    // 设置一个历史时间
    life->SetDateTime("2018/10/01 00:00:00");

    // 穿越--更改状态
    box->Undo();
    std::cout << "Actual date time is " << life->GetDateTime() << std::endl;

    // 再次穿越
    box->Undo();
    std::cout << "Actual date time is " << life->GetDateTime() << std::endl;

    SAFE_DELETE(life);
    SAFE_DELETE(box);

    getchar();

    return 0;
}
/*
输出如下：

Set date time to 2000/10/01 00:00:00 
Save … 
Set date time to 2010/10/01 00:00:00 
Save … 
Set date time to 2018/10/01 00:00:00 
Undo … 
Actual date time is 2010/10/01 00:00:00 
Undo … 
Actual date time is 2000/10/01 00:00:00

*/

```

### 7.8 优缺点

优点：

- 提供了一种状态恢复机制，使用户能够方便地回到某个历史的状态。
- 实现了信息的封装，使得用户不需要关心状态的保存细节。

缺点：

- 如果 Originator 对象很大，那么 Memento 对象也会很大，这势必会占用较大的存储空间，而且每保存一次都需要消耗一定的系统资源。

### 7.9 适用场景

- 保存一个对象在某一个时刻的全部（或部分）状态，这样在以后需要时便能够恢复到先前的状态，实现撤销操作。
- 防止外界对象破坏一个对象历史状态的封装性，避免将对象历史状态的实现细节暴露给外界对象。

## 8 职责链模式

**职责链模式**（Chain of Responsibility Pattern）：使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系。将这些对象连成一条链，并沿着这条链传递该请求，直到有一个对象处理它为止。

### 8.1 模式结构

UML结构图：

![UML结构图](https://img-blog.csdn.net/20180116180244435?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvbGlhbmcxOTg5MDgyMA==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70/gravity/SouthEast)

- Handler（抽象处理者）：定义了处理请求所需的接口。
- ConcreteHandler（具体处理者）：处理自己负责的请求，如果无法处理，则将请求传递给与之保持联系的后继者（即：successor）。
- Client（客户端）：请求的发起者，将访问 Handler 来处理它。

### 8.3 案例分析

> 请假 - 流程处理
>  
> 工作人员请假流程处理：
> 
> 链中的处理者可以对请求作出响应或者将其传递给上级。每个处理者都有自己的一套规则，而这套规则是他们可以批准的。审批流程：经理（1 天及以下） -> 总监（3 天及以下） -> 总裁（7 天为界限）

### 8.4 代码实现

#### 8.4.1 创建抽象处理者
抽象处理者除了提供一个处理请假的接口之外，还有哦一个关键的后继者定义，这样就可以构建一条链：

```c
// handler.h
#ifndef HANDLER_H
#define HANDLER_H

#include <iostream>

// 抽象处理者
class IHandler
{
public:
    IHandler() { m_pSuccessor = NULL; }
    virtual ~IHandler() {}
    void SetSuccessor(IHandler *successor) { m_pSuccessor = successor; }
    virtual void HandleRequest(float days) = 0;

protected:
    IHandler *m_pSuccessor;  // 后继者,用来表示处理者链
};

#endif // HANDLER_H

```
#### 8.4.2 创建具体处理者

具体处理者包含 Manager、Director、CEO，它们的实现基本相同，只是批准的天数不一样：
```c
// concrete_handler.h
#ifndef CONCRETE_HANDLER_H
#define CONCRETE_HANDLER_H

#include "handler.h"

// 经理
class Manager : public IHandler
{
public:
    Manager() {}
    ~Manager() {}
    virtual void HandleRequest(float days) override {
        if (days <= 1) {
            std::cout << "Manager 批准了 " << days << " 天假" << std::endl;
        } else {
            m_pSuccessor->HandleRequest(days);
        }
    }
};

// 总监
class Director : public IHandler
{
public:
    Director() {}
    ~Director() {}
    virtual void HandleRequest(float days) override {
        if (days <= 3) {
            std::cout << "Director 批准了 " << days << " 天假" << std::endl;
        } else {
            m_pSuccessor->HandleRequest(days);
        }
    }
};

// 总裁
class CEO : public IHandler
{
public:
    CEO() {}
    ~CEO() {}
    virtual void HandleRequest(float days) override {
        if (days <= 7) {
            std::cout << "CEO 批准了 " << days << " 天假" << std::endl;
        } else {
            std::cout << "给你放长假，以后不用来上班啦！" << std::endl;
        }
    }
};

#endif // CONCRETE_HANDLER_H
```
**注意： 由于 CEO 位于最高层（处于链的末尾），所以请求到此结束，不会继续向下传递。**
#### 8.4.3 创建客户端

开始请假，说出你的理由：
```c
// main.cpp
#include "concrete_handler.h"

#ifndef SAFE_DELETE
#define SAFE_DELETE(p) { if(p){delete(p); (p)=NULL;} }
#endif

int main()
{
    IHandler *manager = new Manager();
    IHandler *director = new Director();
    IHandler *ceo = new CEO();

    // 职责链：经理 -> 总监 -> 总裁
    manager->SetSuccessor(director);
    director->SetSuccessor(ceo);

    manager->HandleRequest(1);
    manager->HandleRequest(2);
    manager->HandleRequest(5);
    manager->HandleRequest(10);

    SAFE_DELETE(manager);
    SAFE_DELETE(director);
    SAFE_DELETE(ceo);

    getchar();

    return 0;
}
/*
输出如下:
Manager 批准了 1 天假 
Director 批准了 2 天假 
CEO 批准了 5 天假 
给你放长假，以后不用来上班啦！
*/

```

### 8.6 优缺点

#### 8.6.1 优点

- 降低耦合度，将请求的发送者和接收者解耦。
- 简化了对象，使得对象不需要知道链的结构。
- 增强给对象指派职责的灵活性，通过改变链内的成员或者调整它们的次序来动态改变职责。
- 增加新的具体处理者很方便，无须修改原有代码，只需要在客户端重新建链即可。

#### 8.6.2 缺点

- 由于没有明确的接收者，所以无法保证请求一定会被处理（可能直到链的末端都得不到处理，也可能因为链没有配置正确而得不到处理。）
- 对于较长的职责链来说，请求可能涉及到多个处理对象，这将会使系统性能受到一定影响，而且不利于代码调试。
- 如果建链不当，可能会造成循环调用，这将导致系统陷入死循环。

### 8.7 适用场景

- 有多个对象可以处理同一请求，具体哪个对象处理由运行时刻自动确定。客户端只负责提交请求，而无须关心请求的处理对象是谁以及它是如何处理的。
- 在不明确指定接受者的情况下，向多个对象中的一个提交一个请求。
- 可动态指定一组对象处理请求，客户端可以动态创建职责链来处理请求，还可以改变链中处理者之间的先后次序。

## 9 访问者模式

**访问者模式**（Visitor Pattern）表示一个作用于某对象结构中的各元素的操作，它使你可以在不改变各元素类的前提下定义作用于这些元素的新操作。

### 9.2 模式结构

- Vistor（访问者）：为对象结构中每一个 ConcreteElement 声明一个 visit() 操作，从这个操作的名称或参数类型可以清楚知道需要访问的具体元素的类型。
- ConcreteVisitor（具体访问者）：实现每个由 Visitor 声明的操作。
- Element（元素）：定义一个 accept() 操作，它通常以一个 Vistor 作为参数。
- ConcreteElement（具体元素）：实现 accept() 操作，通过调用 Visitor 的 visit() 方法来实现对元素的访问。
- ObjectStructure（对象结构）：能够枚举它的元素，同时提供一个高层的接口，以允许访问者访问它的元素。

**UML图**

![访问模式UML图](https://img-blog.csdn.net/20180224180336621?watermark/2/text/aHR0cDovL2Jsb2cuY3Nkbi5uZXQvdTAxMTAxMjkzMg==/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

### 9.3 案例分析

> 古城西安 - 访问记
> 
> 在访问西安时，访问者会参观各个景点。对于景点来说，无论访问者是谁，它们都是不变的。而作为访问者，不同角色的访问方式也不尽相同，游客只负责旅游 - 吃喝玩乐，而清洁工则需要打扫卫生、清理垃圾。
> 
> 这里，游客和清洁工是具体访问者，兵马俑、钟楼等景点是具体元素，西安这座城市是结构对象。

### 9.4 代码实现

#### 9.4.1 创建访问者

访问者需要为每个景点都提供一个访问方法：
```c
// visitor.h
#ifndef VISITOR_H
#define VISITOR_H

class BellTower;
class TerracottaWarriors;

// 访问者
class IVisitor
{
public:
    virtual ~IVisitor() {}
    virtual void Visit(BellTower *) = 0;//根据地点的不同，访问的执行方法也不同
    virtual void Visit(TerracottaWarriors *) = 0;
};

#endif // VISITOR_H
```
####  9.4.2 创建元素
景点中定义了一个 Accept() 接口，用于接受访问者的访问：
```c
// element.h
#ifndef ELEMENT_H
#define ELEMENT_H

class IVisitor;

// 地方
class IPlace
{
public:
    virtual ~IPlace() {}
    virtual void Accept(IVisitor *visitor) = 0;
};

#endif // ELEMENT_H
```

#### 9.4.3 创建具体元素

具体元素有两个 - 钟楼、兵马俑，它们实现了 Accept() 方法：
```c
// concrete_element.h
#ifndef CONCRETE_ELEMENT_H
#define CONCRETE_ELEMENT_H

#include "element.h"
#include "visitor.h"
#include <iostream>

// 钟楼
class BellTower : public IPlace
{
public:
    virtual void Accept(IVisitor *visitor) override {
        std::cout << "Bell Tower is accepting visitor." << std::endl;
        visitor->Visit(this);
    }
};

// 兵马俑
class TerracottaWarriors : public IPlace
{
public:
    virtual void Accept(IVisitor *visitor) override {
        std::cout << "Terracotta Warriors is accepting visitor." << std::endl;
        visitor->Visit(this);
    }
};

#endif // CONCRETE_ELEMENT_H
```
**注意： 在 Accept() 方法中，通过调用 Visitor 的 visit() 方法（以当前对象为参数）来实现对景点的访问。**

#### 9.4.4 创建对象结构

添加景点，并为每一个景点添加访问者：
```c
// object_structure.h
#ifndef OBJECT_STRUCTURE_H
#define OBJECT_STRUCTURE_H

#include "element.h"
#include <list>

// 城市（西安）
class City
{
public:
    void Attach(IPlace *place) {
        m_places.push_back(place);
    }

    void Detach(IPlace *place) {
        m_places.remove(place);
    }

    void Accept(IVisitor *visitor) {
        // 为每一个 element 设置 visitor，进行对应的操作
        for (std::list<IPlace*>::iterator it = m_places.begin(); it != m_places.end(); ++it) {
            (*it)->Accept(visitor);
        }
    }

private:
    std::list<IPlace *> m_places;
};

#endif // OBJECT_STRUCTURE_H
```

#### 9.4.5 创建客户端

```c
// main.cpp
#include "concrete_visitor.h"
#include "object_structure.h"

#ifndef SAFE_DELETE
#define SAFE_DELETE(p) { if(p){delete(p); (p)=NULL;} }
#endif

int main()
{
    City *city = new City();

    // 景点 - 钟楼、兵马俑
    IPlace *bellTower = new BellTower();
    IPlace *warriors = new TerracottaWarriors();

    // 访问者 - 游客、清洁工
    IVisitor *tourist = new Tourist();
    IVisitor *cleaner = new Cleaner();

    // 添加景点
    city->Attach(bellTower);
    city->Attach(warriors);

    // 接受访问
    city->Accept(tourist);
    city->Accept(cleaner);

    SAFE_DELETE(cleaner);
    SAFE_DELETE(tourist);
    SAFE_DELETE(warriors);
    SAFE_DELETE(bellTower);
    SAFE_DELETE(city);

    getchar();

    return 0;
}
/*
输出如下：
Bell Tower is accepting visitor. 
I’m visiting the Bell Tower! 
Terracotta Warriors is accepting visitor. 
I’m visiting the Terracotta Warriors! 
Bell Tower is accepting visitor. 
I’m cleaning up the garbage of Bell Tower! 
Terracotta Warriors is accepting visitor. 
I’m cleaning up the garbage of Terracotta Warriors!
*/

```

### 9.5 优缺点

#### 9.5.1 优点

- 增加新的访问操作很方便。使用访问者模式，增加新的访问操作就意味着增加一个新的具体访问者类，实现简单，无须修改源代码，符合“开闭原则”。
- 将有关元素对象的访问行为集中到一个访问者对象中，而不是分散在一个个的元素类中。类的职责更加清晰，有利于对象结构中元素对象的复用，相同的对象结构可以供多个不同的访问者访问。
- 让用户能够在不修改现有元素类层次结构的情况下，定义作用于该层次结构的操作。

#### 9.5.2 缺点

- 增加新的元素类困难。每增加一个新的元素类都意味着要在访问者中增加一个新的操作，并在每一个具体访问者类中增加相应的具体操作，这违背了“开闭原则”的要求。
- 破坏封装。访问者模式要求访问者对象访问并调用每一个元素对象的操作，这意味着元素对象有时候必须暴露一些自己的内部操作和内部状态，否则无法供访问者访问。

#### 9.6 适用场景

- 一个对象结构包含多个类型的对象，希望对这些对象实施一些依赖其具体类型的操作。在访问者中针对每一种具体的类型都提供了一个访问操作，不同类型的对象可以有不同的访问操作。
- 需要对一个对象结构中的对象进行很多不同的并且不相关的操作，而需要避免让这些操作“污染”这些对象的类，也不希望在增加新操作时修改这些类。访问者模式使得我们可以将相关的访问操作集中起来定义在访问者类中，对象结构可以被多个不同的访问者类所使用，将对象本身与对象的访问操作分离。
- 对象结构中对象对应的类很少改变，但经常需要在此对象结构上定义新的操作。




# 结束







