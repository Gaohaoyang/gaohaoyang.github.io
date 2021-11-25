---
layout: post
title:  "Web前端服务知识-Web-Serving"
date:   2020-08-07 19:17:00
categories: 技术工具
tags: Web web Python Flask Django Fastapi Restful Swagger HTML JavaScript Session RPC 微服务 GraphQL UML Gunicorn supervisor genvent grequests node.js vue 前端 低代码 拖拽 api
author : 鹤啸九天
excerpt: Web开发相关技术知识点
mathjax: true
---

* content
{:toc}

# 总结

- 待定

# HTTP

HTTP常见的方法：
- `GET`：浏览器告知服务器：只 获取 页面上的信息并发给我。这是最常用的方法。
- `POST`：浏览器告诉服务器：想在 URL 上 发布 新信息。并且，服务器必须确保 数据已存储且仅存储一次。这是 HTML 表单通常发送数据到服务器的方法。
- `PUT`：类似 POST 但是服务器可能触发了存储过程多次，多次覆盖掉旧值。你可 能会问这有什么用，当然这是有原因的。考虑到传输中连接可能会丢失，在 这种 情况下浏览器和服务器之间的系统可能安全地第二次接收请求，而 不破坏其它东西。因为 POST 它只触发一次，所以用 POST 是不可能的。
- `DELETE`：删除给定位置的信息。


- 参考：[HTTP请求时POST参数到底应该怎么传?](https://blog.csdn.net/j550341130/article/details/82012961)，[HTTP POST/GET 在线请求测试工具](https://www.sojson.com/httpRequest/)

## HTTP请求头

- 请求三要素
  - ![](https://img-blog.csdn.net/2018082410162352)

- 根据应用场景的不同,HTTP请求的请求体有三种不同的形式, 通过header中的content-type指定, 这里只分析两个:
  1. **表单方式**：APPlication/x-www-form-urlencoded(默认类型)
      - 如果不指定其他类型的话, 默认是x-www-form-urlencoded, 此类型要求参数传递样式为<font color='blue'>key1=value1&key2=value2</font>
          - Flask代码：request.form得到字典
      - ![](https://www.seotest.cn/d/file/news/20190605/20180824110103426.png)
      - ![](https://img2018.cnblogs.com/blog/594801/201910/594801-20191029105138255-1197736174.png)
  2. **json方式**：application/json
      - 更适合传递大数据的形式, 参数样式就是json格式, 例如<font color='blue'>{"key1":"value1","key2":[1,2,3]}</font>等.
          - Flask代码：request.json得到字典
      - ![](https://www.seotest.cn/d/file/news/20190605/20180824110018525.png)
      - ![](https://img2018.cnblogs.com/blog/594801/201910/594801-20191029105052405-1022058048.png)

- GET方式获取地址栏参数
  - Flask代码：request.args得到字典
  - ![](https://img2018.cnblogs.com/blog/594801/201910/594801-20191029105256399-1220928345.png)


## HTTP响应头

- 响应三要素
  - ![](https://img-blog.csdn.net/20180824101548255)


## post/get参数获取

- [flask的post,get请求及获取不同格式的参数](https://www.cnblogs.com/leijiangtao/p/11757554.html)
- ![](https://img2018.cnblogs.com/blog/594801/201910/594801-20191029104937449-1769417565.png)

- PostMan界面
  - ![](https://img2018.cnblogs.com/blog/594801/201910/594801-20191029105052405-1022058048.png)


## 状态码

【2021-4-26】HTTP[状态码说明](http://restful.p2hp.com/resources/http-status-codes)，HTTP定义了四十个标准状态代码，可用于传达客户端请求的结果。状态代码分为以下五个类别

| 类别 | 要点       | 描述     | 示例    |
| ---- | ---------- | ---------------------- | ---------------------------- |
| 1xx  | 信息       | 通信传输协议级信息                           | 100（客户端发送请求）         |
| 2xx  | 成功       | 表示客户端的请求已成功接受                   | 200（OK），201（创建），202（已接受），204（无内容），                                                                                                        |
| 3xx  | 重定向     | 表示客户端必须执行一些其他操作才能完成其请求 | 301（永久移动），302（找到），303（见其他），304（未修改），307（临时重定向）                                                                                 |
| 4xx  | 客户端错误 | 此类错误状态代码指向客户端                   | 400（不良请求），401（未经授权），403（禁止），404（未找到），405（不允许的方法），406（不可接受），412（前提条件失败），415（不支持的媒体类型），499（超时） |
| 5xx  | 服务器错误 | 服务器负责这些错误状态代码                   | 500（内部服务器错误），501（未实施）       |




# API

- **API**(application programming interfaces)，即应用程序编程接口。API由服务器（Server）提供（服务器有各种各样的类型，一般我们浏览网页用到的是web server，即网络服务器），通过API，计算机可以读取、编辑网站数据，就像人类可以加载网页、提交信息等。通俗地，API可以理解为家用电器的插头，用户只提供插座，并执行将插头插入插座的行为，不需要考虑电器内部如何运作。从另外一个角度上讲API是一套协议，规定了与外界的沟通方式：如何发送请求和接受响应。

## 理解RESTful API

- RESTful API即满足RESTful风格设计的API，RESTful表示的是一种互联网软件架构(以网络为基础的应用软件的架构设计)，如果一个架构符合REST原则，就称它为RESTful架构。RESTful架构的特点：
- 每一个URI代表一种资源；
- 客户端和服务器之间，传递这种资源的某种表现层；把"资源"具体呈现出来的形式，叫做它的"表现层"（Representation）。比如，文本可以用txt格式表现，也可以用HTML格式、XML格式、JSON格式表现，甚至可以采用二进制格式；图片可以用JPG格式表现，也可以用PNG格式表现。
- 客户端通过四个HTTP动词，四个表示操作方式的动词：GET、POST、PUT、DELETE。它们分别对应四种基本操作：GET用来获取资源，POST用来新建资源（也可以用于更新资源），PUT用来更新资源，DELETE用来删除资源。

## API设计规范

在移动互联网，分布式、微服务盛行的今天，现在项目绝大部分都采用的微服务框架，**前后端分离**方式,一般系统的大致整体架构图
- ![](https://filescdn.proginn.com/195712466d8fa71a7e933534a00b8251/1e22e56dc3ece99738d7eae1aa78dd1e.webp)

接口交互
- 前端和后端进行交互，前端按照约定请求URL路径，并传入相关参数，后端服务器接收请求，进行业务处理，返回数据给前端。

API与客户端用户的通信协议，总是使用HTTPS协议，以确保交互数据的传输安全。

其它要求：
- **限流**设计、**熔断**设计、**降级**设计，大部分都用不到，当用上了基本上也都在网关中加这些功能。

资料：
- [API接口设计规范](https://cloud.tencent.com/developer/article/1590150)
- [API接口规范](https://www.jianshu.com/p/3f8953f73a79)
- [RESTful API定义及使用规范](https://zhuanlan.zhihu.com/p/31298060)

### path路径规范

域名设计：
- 应该尽量将API部署在专用域名之下：https://api.example.com
- 如果确定API很简单,不会有进一步扩展,可以考虑放在主域名下：https://www.example.com/api

路径又称"终点"（end point），表示API的具体网址。
- 1、在RESTful架构中，每个网址代表一种**资源**(resource),所以网址中不能有动词，只能有**名词**。【所用的名词往往与数据库的**表格名**对应】
- 2、数据库中的表一般都是同种记录的"**集合**"(collection),所以API中的名词也应该使用复数。

例子: 
- https://api.example.com/v1/products
- https://api.example.com/v1/users
- https://api.example.com/v1/employees

| 动作 | 前缀 | 备注|
|---|---|---|
|获取|get|get{XXX}|
|获取|get|get{XXX}List|
|新增|add|add{XXX}|
|修改|update|update{XXX}|
|保存|save| save{XXX}|
|删除|delete| delete{XXX}|
|上传| upload| upload{XXX}|
|发送|send|send{XXX}|

### 版本控制

https://api.example.com/v{n}

- 1、应该将API的版本号放入URL。
- 2、采用多版本并存，增量发布的方式。
- 3、n代表版本号，分为整型和浮点型
  - 整型： 大功能版本，  如v1、v2、v3 ...
  - 浮点型： 补充功能版本， 如v1.1、v1.2、v2.1、v2.2 ...
- 4、对于一个 API 或服务，应在生产中最多保留 3 个最详细的版本

### 请求方式


- GET（SELECT）：    从服务器取出资源（一项或多项）。
- POST（CREATE）：   在服务器新建一个资源。
- PUT（UPDATE）：    在服务器更新资源（客户端提供改变后的完整资源）。
- DELETE（DELETE）： 从服务器删除资源。

例子： 
- GET    /v1/products      获取所有商品
- GET    /v1/products/ID   获取某个指定商品的信息
- POST   /v1/products      新建一个商品
- PUT    /v1/products/ID   更新某个指定商品的信息
- DELETE /v1/products/ID   删除某个商品,更合理的设计详见【9、非RESTful API的需求】
- GET    /v1/products/ID/purchases      列出某个指定商品的所有投资者
- GET    /v1/products/ID/purchases/ID   获取某个指定商品的指定投资者信息

### 请求参数

传入参数分为4种类型：
- 1、cookie：         一般用于OAuth认证
- 2、request header： 一般用于OAuth认证
- 3、请求body数据：
- 4、地址栏参数： 
  - 1）restful 地址栏参数 /v1/products/ID ID为产品编号，获取产品编号为ID的信息
  - 2）get方式的查询字段
详情：
- Query
  - url?后面的参数，存放请求接口的参数数据。
- Header
  - 请求头，存放公共参数、requestId、token、加密字段等。
- Body
  - Body 体，存放请求接口的参数数据。
- 公共参数
  - APP端请求：network（网络：wifi/4G）、operator（运营商：中国联通/移动）、platform（平台：iOS/Android）、system（系统：ios 13.3/android 9）、device（设备型号：iPhone XY/小米9）、udid（设备唯一标识）、apiVersion（API版本号：v1.1）
  - Web端请求：appKey（授权key），调用方需向服务方申请 appKey（请求时使用） 和 secretKey（加密时使用）。
- 安全规范
  - 敏感参数加密处理：登录密码、支付密码，需加密后传输，建议使用 非对称加密。
- 参数命名规范：建议使用**驼峰**命名，首字母小写。
- requestId 建议携带唯一标示追踪问题。

若记录数量很多，服务器不可能返回全部记录给用户。API应该提供分页参数及其它筛选参数，过滤返回结果。
- /v1/products?page=1&pageSize=20     指定第几页，以及每页的记录数。
- /v1/products?sortBy=name&order=asc  指定返回结果按照哪个属性排序，以及排序顺序。


### 返回格式

【2021-11-16】
- [RestFul API 统一响应格式与自动包装](https://zhuanlan.zhihu.com/p/126603159)
- [如何设计 API 接口，实现统一格式返回？](https://jishuin.proginn.com/p/763bfbd6c335)

#### 整体格式

响应结构有两种：
- 方式一：**包装**响应格式，会在真正的响应数据外面包装一层，比如code、message等数据，如果接口报错，响应Status依然为200，更改响应数据里的code。
- 方式二：**不包装**响应数据，需要什么返回什么，如果接口报错，更改响应Status，同时换另一种响应格式，告知前端错误信息。

两种方式各有千秋，这里不谈孰优孰劣

第一种：
- code只是示例，实际项目中应为项目提前定义好的业务异常code，如10025，如果希望得到建议，可以参考另一篇文章异常及错误码定义。
- 这种方式接口响应的Status均为200，使用响应体中的code来区分状态。
无论如何，接口返回响应的数据结构都是一致的。实现提来也比较简单，每个接口都返回统一的一个类型即可，也可以各自返回各自的，再统一进行包装。

```json
// 接口正常
{
	code: 200, 
	msg: null,
	data: {
        "name": "张三",
        "age": 108
	}
}
// 接口异常
{
	code: 500,
	msg: "系统开小差了，稍后再试吧。"
}
```

第二种：不包装响应数据
- 这种方式，成功的时候只返回请求的数据，而失败时才会返回失败信息，两种情况数据结构是不同的，需要通过响应的status来区分。
- 这里的code指的是业务上的**错误码**，并不是简单的http status

```json
// 正常
{
    "name": "张三",
    "age": 108
}
// 异常
{
	code: 500,
	msg: ""
}

```

#### 典型数据字段

后端返回给前端数据, 一般用JSON体方式，定义如下：

```shell
{
	#返回状态码
	code:integer,		
	#返回信息描述
	message:string,
	#返回值
	data:object
}
```

##### （1）code
- code表示返回状态码，一般开发时需要什么，就添加什么。如接口要返回用户权限异常，加一个状态码为101吧，下一次又要加一个数据参数异常，就加一个102的状态码。这样虽然能够照常满足业务，但状态码太凌乱了，可以参考HTTP请求返回的状态码
- ![](https://pic1.zhimg.com/80/v2-675d06d91948b580be09a845eaef869c_720w.jpg)
常见的HTTP状态码：
- 200 - 请求成功
- 301 - 资源（网页等）被永久转移到其它URL
- 404 - 请求的资源（网页等）不存在
- 500 - 内部服务器错误
这样做的好处是就把错误类型归类到某个**区间**内，如果区间不够，可以设计成4位数。
- 1000～1999 区间表示参数错误
- 2000～2999 区间表示用户错误
- 3000～3999 区间表示接口异常
前端开发人员在得到返回值后，根据状态码就可以知道，大概什么错误，再根据message相关的信息描述，可以快速定位。

总结：
- 接口正常访问情况下，服务器返回2××的HTTP状态码；如200一切正常、201资源被创建、204资源被删除
- 当用户访问接口出错时，服务器会返回给一个合适的4××或者5××的HTTP状态码；以及一个application/json格式的消息体，消息体中包含错误码code和错误说明message。
  - 5××错误(500 =< status code)为服务器或程序出错，客户端只需要提示“服务异常，请稍后重试”即可，该类错误不在每个接口中列出。
  - 4××错误(400 =< status code<500)为客户端的请求错误，需要根据具体的code做相应的提示和逻辑处理，message仅供开发时参考，不建议作为用户提示。

##### （2）Message
- 这个字段相对理解比较简单，就是发生错误时，如何友好的进行提示。一般的设计是和code状态码一起设计

##### （3）data
- 需要返回给前端的数据。这个data内的数据一定要是JSON格式，方便前端的解析。

数据常见的有2个大类：
- 业务操作结果
  - 业务操作的过程，能否封装、优化要看实际情况，但是业务操作的最终结果，即最终得到的要返回给前端的数据，可以使用AOP统一封装的前面提到的统一格式中，而不用每次手动封装。
- 参数校验结果
  - 参数的校验如果不使用第三方库，会在代码中多出很多的冗余代码，所以，最好使用oval、hibernate validate或者Spring等参数校验方式，可以大幅度美观代码。

#### 字段
- 数据脱敏
  - 用户手机号、用户邮箱、身份证号、支付账号、邮寄地址等要进行脱敏，部分数据加 * 号处理。
- 属性名命名时，建议使用**驼峰**命名，首字母小写。
- 属性值为空时，严格按类型返回**默认值**。
- 金额类型/时间日期类型的属性值，如果仅用来显示，建议后端返回可以显示的字符串。
- 业务逻辑的状态码和对应的文案，建议后端两者都返回。
- 调用方不需要的属性，不要返回。

| 参数 | 类型| 说明|备注|
|---|---|---|---|
|code|Number|结果码|成功=1失败=-1未登录=401无权限=403|
|showMsg|String|显示信息|系统繁忙，稍后重试|
|errorMsg|String|错误信息|便于研发定位问题|
|data|Object|数据|JSON 格式|

```json
{
    "code": 1,
    "showMsg": "success",
    "errorMsg": "",
    "data": {
        "list": [],
        "pagination": {
            "total": 100,
            "currentPage": 1,
            "prePageCount": 10
        }
    }
}
```

API接口：

```shell
# response：
#----------------------------------------
{
   status: 200,               // 详见【status】

   data: {
      code: 1,                // 详见【code】
      data: {} || [],         // 数据
      message: '成功',        // 存放响应信息提示,显示给客户端用户【须语义化中文提示】
      sysMsg: 'success'       // 存放响应信息提示,调试使用,中英文都行
      ...                     // 其它参数，如 total【总记录数】等
   },

   message: '成功',            // 存放响应信息提示,显示给客户端用户【须语义化中文提示】
   sysMsg: 'success'          // 存放响应信息提示,调试使用,中英文都行
}
#----------------------------------------
【status】:
           200: OK       400: Bad Request        500：Internal Server Error       
                         401：Unauthorized
                         403：Forbidden
                         404：Not Found

【code】:
         1: 获取数据成功 | 操作成功             0：获取数据失败 | 操作失败
```

### 签名设计（权限）

权限分为
- none：无需任何授权；
- token：需要用户登录授权，可通过header Authorization和Cookie CoSID传递；
- admintoken：需要管理员登录授权，可通过header Authorization和Cookie CoCPSID传递；
- token或admintoken：用户登录授权或管理员登录授权都可以；
- sign：需要签名，一般用于服务端内部相互调用，详见 孩宝API HMAC-SHA1签名。

签名验证没有确定的规范，自己制定就行，可以选择使用 对称加密、 非对称加密、 单向散列加密 等，分享下原来写的签名验证，供参考。
- [Go 签名验证](https://mp.weixin.qq.com/s?__biz=MjM5NDM4MDIwNw==&mid=2448835322&idx=1&sn=80d2d77c9c81d63b482b2651fab9a19e&scene=21#wechat_redirect)
- [PHP 签名验证](https://mp.weixin.qq.com/s?__biz=MjM5NDM4MDIwNw==&mid=2448834957&idx=1&sn=fe3c63ad05a2412856892ad790c26fae&scene=21#wechat_redirect)


### 日志平台设计

日志平台有利于故障定位和日志统计分析。

日志平台的搭建可以使用的是 ELK 组件，使用 Logstash 进行收集日志文件，使用 Elasticsearch 引擎进行搜索分析，最终在 Kibana 平台展示出来。

### 幂等性设计

我们无法保证接口的每一次调用都是有返回结果的，要考虑到出现网络异常的情况。
- 举个例子，订单创建时，我们需要去减库存，这时接口发生了超时，调用方进行了重试，这时是否会多扣一次库存？

解决这类问题有 2 种方案：
- 一、服务方提供相应的查询接口，调用方在请求超时后进行查询，如果查到了，表示请求处理成功了，没查到就走失败流程。
- 二、调用方只管重试，服务方保证一次和多次的请求结果是一样的。

对于第二种方案，就需要服务方的接口支持**幂等性**。

大致设计思路是这样的：
- 调用接口前，先获取一个全局唯一的令牌（Token）
- 调用接口时，将 Token 放到 Header 头中
- 解析 Header 头，验证是否为有效 Token，无效直接返回失败
- 完成业务逻辑后，将业务结果与 Token 进行关联存储，设置失效时间
- 重试时不要重新获取 Token，用要上次的 Token

### 非Restful API

- 1、实际业务开展过程中，可能会出现各种的api不是简单的restful 规范能实现的。
- 2、需要有一些api突破restful规范原则。
- 3、特别是移动互联网的api设计，更需要有一些特定的api来优化数据请求的交互。

1)、删除单个 | 批量删除  ： DELETE  /v1/product      body参数{ids：[]}

2)、页面级API :  把当前页面中需要用到的所有数据通过一个接口一次性返回全部数据

### 接口文档

- 1、尽量采用**自动化**接口文档，可以做到在线测试，同步更新。
  - 生成的工具为apidoc，详细阅读官方文档：http://apidocjs.com
- 2、应包含：接口BASE地址、接口版本、接口模块分类等。
- 3、每个接口应包含：
  - 接口地址：不包含接口BASE地址。
  - 请求方式: get、post、put、delete等。
  - 请求参数：数据格式【默认JSON、可选form data】、数据类型、是否必填、中文描述。
  - 响应参数：类型、中文描述。

### 测试工具

推荐Chrome浏览器插件`Postman`作为接口测试工具， [Postman下载地址](https://chrome.google.com/webstore/detail/postman/fhbjgbiflinjbdggehcddcbncdddomop)
- ![](https://pic2.zhimg.com/80/v2-2c3dcfc9251b9d1c2be62d24ba2d5f51_720w.jpg)

### 示例

```python
# !/usr/bin/env python
# -*- coding:utf8 -*- 

# **************************************************************************
# * Copyright (c) 2021 *.com, Inc. All Rights Reserved
# **************************************************************************
# * @file main.py FAQ推荐服务
# * @author ****
# * @date 2021/11/06 10:44
# **************************************************************************

from flask import Flask, request, render_template, make_response, g
from flasgger import Swagger
from functools import wraps # 装饰器工具，用于时间统计
import logging # 日志模块
import os
import json
import time

# flask服务
app = Flask(__name__)
main_dir = '..'
log_path =  '{}/logs/recommend/'.format(main_dir)
# -------- log -------------
if not os.path.exists(log_path):
    # 目录不存在，进行创建操作
    os.makedirs(log_path)
# logging.basicConfig函数对日志的输出格式及方式做相关配置
# 第一步，创建一个logger
logger = logging.getLogger()
logger.setLevel(logging.INFO)  # Log等级总开关
# 第二步，创建一个handler，用于写入日志文件
rq = time.strftime('%Y%m%d%H%M', time.localtime(time.time()))
log_name = log_path + rq + '.log'
logfile = log_name
fh = logging.FileHandler(logfile, mode='w')
fh.setLevel(logging.DEBUG)  # 输出到file的log等级的开关
# 第三步，定义handler的输出格式
formatter = logging.Formatter("%(asctime)s - %(filename)s[line:%(lineno)d] - %(levelname)s: %(message)s")
fh.setFormatter(formatter)
# 第四步，将logger添加到handler里面
logger.addHandler(fh)
# --------- 启动服务 ----------
project_name = 'aionsite_newhouse' # aionsite_newhouse,contract_center,isc_ssc,homespeech_smarthome

# 配置文件主目录
conf_dir = 'infrastructure/engines/legacy'

# swagger api
Swagger(app)

@app.route('/', methods=['GET', 'POST'])
def home():
    # 服务主页
    res = {"msg":"-", "status":0, "req":{} , "resp":{}}
    req_data = {}
    if request.method == 'GET':
        req_data = request.values # 表单形式
    elif request.method == 'POST':
        req_data = request.json # json形式
    else:
        res['msg'] = '异常请求(非GET/POST)'
        res['status'] = -1
    res['req'] = req_data
    res['msg'] = "服务主页"
    return render_template("index.html")

@app.route('/recommend', methods=['GET', 'POST'])
def recommend():
    """
    新房驻场客服问题推荐请求接口
    2021-11-5
    ---
    tags:
      - NLU服务接口
    parameters:
      - name: product
        in: path
        type: string
        required: true
        description: newhouse (新房电子驻场客服）
      - name: project_id
        in: path
        type: string
        required: true
        description: 楼盘id
      - name: city_name
        in: path
        type: string
        required: True
        description: 城市名
      - name: position
        in: path
        type: string
        required: false
        description: 展示位置, detail（盘源详情页）、pop（弹窗页）
      - name: raw_text
        in: path
        type: string
        required: false
        description: 检索词(暂时不用)
    responses:
      500:
        description: 自定义服务端错误
      200:
        description: 自定义状态描述
    """
    # 各业务线接口, product字段区分，status >= 0合法，1截取topn，2补足topn
    res = {"message":"-", "errno":0, "data":{}}
    req_data = {}
    if request.method == 'GET':
        req_data = request.values # 表单形式
    elif request.method == 'POST':
        req_data = request.json # json形式
    else:
        res['message'] = '异常请求(非GET/POST)'
        res['errno'] = -1
    req_dict = {}
    # 参数处理
    for k in ['product', 'project_id', 'city_name', 'position']:
        req_dict[k] = req_data.get(k, "-")
    # 保存请求信息
    #res['req'].update(req_data)
    if req_dict['product'] != 'newhouse':
        res.update({"errno": -2, "message":"product取值无效"})
        return res
    if req_dict['position'] not in ('detail', 'pop'):
        res.update({"errno": -3, "message":"position缺失/取值无效"})
        return res
    # 处理请求信息
    res['data'] = {
            "project_id": 671289,
            "project_name": "天朗·富春原颂", 
			"pv": 230, # 楼盘累计请求数（包含点击、文字、语音所有触发请求的行为）
			"percent": 0.02, # 累计累计请求数占比
            "question_num": 9, # 累计点击问题数
            "click_num": 24, # 累计点击次数，含：更多问题
            "question_list":
            [ # 字段说明：问题id，点击次数，点击占比（分母限该楼盘），楼盘名
                {"pos": 1, "question_id": 8, "click_num": 5, "click_percent": 26.316, "question_name": "项目基本信息"}, 
				{"pos": 2, "question_id": 1, "click_num": 5, "click_percent": 26.316, "question_name": "售楼处地址及接待信息"}, 
				{"pos": 3, "question_id": 2, "click_num": 3, "click_percent": 15.789, "question_name": "在售户型信息？"}, 
				{"pos": 4, "question_id": 6, "click_num": 2, "click_percent": 10.526, "question_name": "此项目激励政策是什么？"}, 
				{"pos": 5, "question_id": 13, "click_num": 1, "click_percent": 5.263, "question_name": "带看规则及注意事项是什么？"}, 
				{"pos": 6, "question_id": 10, "click_num": 1, "click_percent": 5.263, "question_name": "物业信息"}, 
				{"pos": 7, "question_id": 4, "click_num": 1, "click_percent": 5.263, "question_name": "当前有哪些开发商优惠？"}, 
				{"pos": 8, "question_id": 3, "click_num": 1, "click_percent": 5.263, "question_name": "在售楼栋信息？"}
            ],
    }
    res['errno'] = 0
    res['message'] = '请求正常'
    # 后处理：①空值 ②不足5-6个 ③超纲
    # 默认配置信息: detail页(详情页: 8,2,1,28,3,6)，pop页(弹窗页: 8,2,1,3,6)
    default_info = {}
    # 弹窗页默认答案
    default_info['pop'] = [
        {"pos": 1, "question_id": 8, "click_num": 0, "click_percent": 0.0, "question_name": "项目基本信息"}, 
        {"pos": 2, "question_id": 2, "click_num": 0, "click_percent": 0.0, "question_name": "在售户型信息？"},
        {"pos": 3, "question_id": 1, "click_num": 0, "click_percent": 0.0, "question_name": "售楼处地址及接待信息"},
        {"pos": 4, "question_id": 3, "click_num": 0, "click_percent": 0.0, "question_name": "在售楼栋信息？"},
        {"pos": 5, "question_id": 6, "click_num": 0, "click_percent": 0.0, "question_name": "此项目激励政策是什么？"}
    ]
    # 详情页默认答案
    default_info['detail'] = [
        {"pos": 1, "question_id": 8, "click_num": 0, "click_percent": 0.0, "question_name": "项目基本信息"}, 
        {"pos": 2, "question_id": 2, "click_num": 0, "click_percent": 0.0, "question_name": "在售户型信息？"},
        {"pos": 3, "question_id": 1, "click_num": 0, "click_percent": 0.0, "question_name": "售楼处地址及接待信息"},
        {"pos": 4, "question_id": 28, "click_num": 0, "click_percent": 0.0, "question_name": "项目笔记"},
        {"pos": 5, "question_id": 3, "click_num": 0, "click_percent": 0.0, "question_name": "在售楼栋信息？"},
        {"pos": 6, "question_id": 6, "click_num": 0, "click_percent": 0.0, "question_name": "此项目激励政策是什么？"}
    ]
    top_num = len(default_info[req_dict['position']])
    diff_num = res['data']['question_num'] - top_num
    diff_num = -2
    if diff_num > 0:
        res['data']['question_list'] = res['data']['question_list'][:top_num]
        res['errno'] = 1
        res['message'] = '截取TopN'
    elif diff_num == 0:
        pass
    else: # 补默认值
        id_list = [i["question_id"] for i in res['data']['question_list']]
        cnt = 0
        for i in default_info[req_dict['position']]:
            if cnt + diff_num >= 0:
                break
            if i["question_id"] in id_list:
                continue
            i["pos"] = res['data']['question_list'][-1]['pos'] + 1
            res['data']['question_list'].append(i)
            cnt += 1
        res['errno'] = 2
        res['message'] = '补足topN'
    logger.info(json.dumps(res, ensure_ascii=False))
    return res

if __name__ == '__main__':
    #app.run(host='0.0.0.0', port=8089)
    app.run(host='10.200.24.101', port=8092)
    #app.run(host='10.200.24.101', port=8092)
```

# SDK

SDK是什么
- SDK全称software development kit，软件开发工具包。第三方服务商提供的实现产品软件某项功能的工具包
- 一般都是一些软件工程师为特定的软件包、软件框架、硬件平台、操作系统等建立应用软件时的开发工具的集合。


- API是一个函数，有其特定的功能；而SDK是一个很多功能函数的集合体，一个工具包。
- API是数据接口，SDK相当于开发集成工具环境，要在SDK的环境下来调用API。
- API接口对接过程中需要的环境需要自己提供，SDK不仅提供开发环境，还提供很多API。
- 简单功能调用，API调用方便快捷；复杂功能调用，SDK功能齐全。

# RPC

资料
- 【2020-12-25】[为啥需要RPC，而不是简单的HTTP？](https://www.toutiao.com/i6898582988620202500/)
- 【2021-11-24】[1万行代码，单机50万QPS，今年最值得学习的开源RPC框架！](http://it.taocms.org/11/94072.htm)

企业开发的模式一直定性为**HTTP接口**开发，即常说的 RESTful 风格的服务接口。对于接口不多、系统与系统交互较少的情况下，解决信息孤岛初期常使用的一种通信手段；
- 优点：简单、直接、开发方便。利用现成的http协议进行传输。要写一大份接口文档，严格地标明输入输出是什么，说清楚每一个接口的请求方法，以及请求参数需要注意的事项等。
- 但是对于大型企业来说，**内部子系统较多、接口非常多**的情况下，RPC框架的好处就显示出来了
  - 首先，**长链接**，不必每次通信都要像http一样去3次握手什么的，减少了网络开销；
  - 其次，RPC框架一般都有**注册中心**，有丰富的监控管理；
  - 发布、下线接口、动态扩展等，对调用方来说是**无感知**、统一化的操作。

## 什么是RPC

- [什么是RPC](https://www.jianshu.com/p/7d6853140e13)

|调用类型|过程| 代码 |示意图| 备注 |
|---|---|---|--——| --- |
| 本地函数调用 | 传参→本地函数代码→执行→返回结果| int result = Add(1, 2); | ![](http://cdn1.taocms.org/imgpxy.php?url=gnp%3Dtmf_xw%3F046%2FA4JAWAtPcfAaM6mUOrOJtvOA29yCSf7ciISf1Fccln8svRpUwftH6VbDxxRbifkHGL95EQ6UrM431yOYhkcxzerY%2Fgnp_zibmm_zs%2Fnc.cipq.zibmm%2F%2F%3Asptth) | 所有动作发生同一个进程空间 |
| 远程过程调用 | 传参→远程调用→远程执行→返回结果 | int result = Add(1, 2);（socket通信） |![](http://cdn1.taocms.org/imgpxy.php?url=gnp%3Dtmf_xw%3F046%2FQMTbiMcucicJlpTXIbigNciUc0rVf7I0psdaYGsMbi2mjCdr7M6nsVAG4h1DxxRbifkHGL95EQ6UrM431yOYhkcxzerY%2Fgnp_zibmm_zs%2Fnc.cipq.zibmm%2F%2F%3Asptth) | 跨进程、跨服务器 | 


RPC（Remote Procedure Call）**远程过程调用**，简单的理解是一个节点请求另一个节点提供的服务
- **本地过程调用**：如果需要将本地student对象的age+1，可以实现一个addAge()方法，将student对象传入，对年龄进行更新之后返回即可，本地方法调用的函数体通过函数指针来指定。
- **远程过程调用**：上述操作的过程中，如果addAge()这个方法在服务端，执行函数的函数体在远程机器上，如何告诉机器需要调用这个方法呢？
  - 1.首先客户端需要告诉服务器，需要调用的函数，这里函数和进程ID存在一个映射，客户端远程调用时，需要查一下函数，找到对应的ID，然后执行函数的代码。
  - 2.客户端需要把本地参数传给远程函数，本地调用的过程中，直接压栈即可，但是在远程调用过程中不再同一个内存里，无法直接传递函数的参数，因此需要客户端把参数转换成字节流，传给服务端，然后服务端将字节流转换成自身能读取的格式，是一个序列化和反序列化的过程。
  - 3.数据准备好了之后，如何进行传输？网络传输层需要把调用的ID和序列化后的参数传给服务端，然后把计算好的结果序列化传给客户端，因此TCP层即可完成上述过程，gRPC中采用的是HTTP2协议。

总结
- Client端 ：Student student = Call(ServerAddr, addAge, student)
  - 1. 将这个调用映射为Call ID。
  - 2. 将Call ID，student（params）序列化，以二进制形式打包
  - 3. 把2中得到的数据包发送给ServerAddr，这需要使用网络传输层
  - 4. 等待服务器返回结果
  - 5. 如果服务器调用成功，那么就将结果反序列化，并赋给student，年龄更新
- Server端
  - 1. 在本地维护一个Call ID到函数指针的映射call_id_map，可以用Map<String, Method> callIdMap
  - 2. 等待服务端请求
  - 3. 得到一个请求后，将其数据包反序列化，得到Call ID
  - 4. 通过在callIdMap中查找，得到相应的函数指针
  - 5. 将student（params）反序列化后，在本地调用addAge()函数，得到结果
  - 6. 将student结果序列化后通过网络返回给Client

- 图示
    - ![](https://upload-images.jianshu.io/upload_images/7632302-ca0ba3118f4ef4fb.png)
- 微服务的设计中，一个服务A如果访问另一个Module下的服务B，可以采用HTTP REST传输数据，并在两个服务之间进行序列化和反序列化操作，服务B把执行结果返回过来。
- 由于HTTP在应用层中完成，整个通信的代价较高，远程过程调用中直接基于TCP进行远程调用，数据传输在传输层TCP层完成，更适合对效率要求比较高的场景，RPC主要依赖于客户端和服务端之间建立Socket链接进行，底层实现比REST更复杂。
- ![](https://upload-images.jianshu.io/upload_images/7632302-19ad38cdd9a4b3ec.png)

## RPC框架

### 为什么需要RPC框架呢？

如果没有统一的RPC框架，各个团队的服务提供方就需要各自实现一套序列化、反序列化、网络框架、连接池、收发线程、超时处理、状态机等“业务之外”的重复技术劳动，造成整体的低效。

RPC框架的职责，就是要屏蔽各种复杂性：
- （1）调用方client感觉就像调用本地函数一样，来调用服务；
- （2）提供方server感觉就像实现一个本地函数一样，来实现服务；

### 什么时候需要RPC

- RPC通信方式，已经不仅仅是远程，这个远程就是指不在一个进程内，只能通过其他协议来完成，通常都是TCP或者是Http。
- 希望是和在同一个进程里，一致的体验
- http做不到，Http（TCP）本身的三次握手协议，就会带来大概1MS的延迟。每发送一次请求，都会有一次建立连接的过程，加上Http报文本身的庞大，以及Json的庞大，都需要作一些优化。
- 一般的场景下，没什么问题，但是对于Google这种级别的公司，他们接受不了。几MS的延迟可能就导致多出来几万台服务器，所以他们想尽办法去优化，优化从哪方面入手？
  - 1.减少传输量。
  - 2.简化协议。
  - 3.用长连接，不再每一个请求都重新走三次握手流程
- Http的协议就注定了，在高性能要求的下，不适合用做线上分布式服务之间互相使用的通信协议。
- RPC服务主要是针对大型企业的，而HTTP服务主要是针对小企业的，因为RPC效率更高，而HTTP服务开发迭代会更快。

### RPC基本组件

一个完整的RPC架构里面包含了四个核心的组件，分别是Client ,Server,Client Stub以及Server Stub，这个Stub大家可以理解为存根。分别说说这几个组件：
- 客户端（Client），服务的调用方。
- 服务端（Server），真正的服务提供者。
- 客户端存根，存放服务端的地址消息，再将客户端的请求参数打包成网络消息，然后通过网络远程发送给服务方。
- 服务端存根，接收客户端发送过来的消息，将消息解包，并调用本地的方法。
- ![](https://p3-tt.byteimg.com/origin/pgc-image/28f3cdf8370647f9a2966b4bf352e52b?from=pc)

### 常见RPC框架

有哪些常见的，出圈的RPC框架呢？
- （1）gRPC，Google出品，支持多语言；
- （2）Thrift，Facebook出品，支持多语言；
- （3）Dubbo，阿里开源的，支持Java；
- （4）bRPC，百度开源的，支持C++，Java；
- （5）tRPC，腾讯RPC框架，支持多语言；
- （6）srpc，作者是搜狗的媛架构师liyingxin，基于WF，代码量1W左右：
  - ① 非常适合用来学习RPC的架构设计；
  - ② 又是一个工业级的产品，QPS可以到50W，应该是行业能目前性能最好的RPC框架了吧，有不少超高并发的线上应用都使用它。
- （7）。。。

### gRPC与REST

- REST通常以业务为导向，将业务对象上执行的操作映射到HTTP动词，格式非常简单，可以使用浏览器进行扩展和传输，通过JSON数据完成客户端和服务端之间的消息通信，直接支持请求/响应方式的通信。不需要中间的代理，简化了系统的架构，不同系统之间只需要对JSON进行解析和序列化即可完成数据的传递。
- 但是REST也存在一些弊端，比如只支持请求/响应这种单一的通信方式，对象和字符串之间的序列化操作也会影响消息传递速度，客户端需要通过服务发现的方式，知道服务实例的位置，在单个请求获取多个资源时存在着挑战，而且有时候很难将所有的动作都映射到HTTP动词。
- 正是因为REST面临一些问题，因此可以采用gRPC作为一种替代方案
- gRPC 是一种基于**二进制流**的消息协议，可以采用基于**Protocol Buffer**的IDL定义grpc API,这是Google公司用于序列化结构化数据提供的一套语言中立的序列化机制，客户端和服务端使用HTTP/2以Protocol Buffer格式交换二进制消息。
- gRPC的优势是，设计复杂更新操作的API非常简单，具有高效紧凑的进程通信机制，在交换大量消息时效率高，远程过程调用和消息传递时可以采用双向的流式消息方式，同时客户端和服务端支持多种语言编写，互操作性强；
- 不过gRPC的缺点是不方便与JavaScript集成，某些防火墙不支持该协议。
- 注册中心：当项目中有很多服务时，可以把所有的服务在启动的时候注册到一个注册中心里面，用于维护服务和服务器之间的列表，当注册中心接收到客户端请求时，去找到该服务是否远程可以调用，如果可以调用需要提供服务地址返回给客户端，客户端根据返回的地址和端口，去调用远程服务端的方法，执行完成之后将结果返回给客户端。这样在服务端加新功能的时候，客户端不需要直接感知服务端的方法，服务端将更新之后的结果在注册中心注册即可，而且当修改了服务端某些方法的时候，或者服务降级服务多机部署想实现负载均衡的时候，我们只需要更新注册中心的服务群即可。
- ![](https://upload-images.jianshu.io/upload_images/7632302-0b09dd85b8baa318.png)

### thrift

- [thrift c++ rpc](https://www.cnblogs.com/Forever-Kenlen-Ja/p/9649724.html)
- 【2020-12-26】thrift是Facebook开源的一套rpc框架，目前被许多公司使用
    - 使用IDL语言生成多语言的实现代码，程序员只需要实现自己的业务逻辑
    - 支持序列化和反序列化操作，底层封装协议，传输模块
    - 以同步rpc调用为主，使用libevent evhttp支持http形式的异步调用
    - rpc服务端线程安全，客户端大多数非线程安全
    - 相比protocol buffer效率差些，protocol buffer不支持rpc，需要自己实现rpc扩展，目前有grpc可以使用
    - 由于thrift支持序列化和反序列化，并且支持rpc调用，其代码风格较好并且使用方便，对效率要求不算太高的业务，以及需要rpc的场景，可以选择thrift作为基础库
![](https://img2018.cnblogs.com/blog/524932/201809/524932-20180915020117562-1191051189.png)


### sRPC

【2021-11-24】[1万行代码，单机50万QPS，今年最值得学习的开源RPC框架！](http://it.taocms.org/11/94072.htm)
- [github地址](https://github.com/sogou/srpc)，作者[知乎](https://www.zhihu.com/people/liyingxin1412/posts)

#### 什么是srpc？

- 基于WF的轻量级，超高性能，工业级RPC框架，兼容多协议，例如百度bRPC，腾讯tRPC，Google的gRPC，以及FB的thrift协议。

#### srpc特点

srpc有些什么特点？
- （1）支持多种IDL格式，包括Protobuf，Thrift等，对于这类项目，可以一键迁移；
- （2）支持多种序列化方式，包括Protobuf，Thrift，json等；
- （3）支持多压缩方法，对应用透明，包括gzip，zlib，lz4，snappy等；
- （4）支持多协议，对应用透明，包括http，https，ssl，tcp等；
- （5）高性能；不同客户端线程压力下的性能表现非常稳定，QPS在50W左右，优于同等压测配置的bRPC与thrift。
  - ![](http://cdn1.taocms.org/imgpxy.php?url=gnp%3Dtmf_xw%3F046%2FgXKBtRFZZne43bDPrPX1MRzprUHQqfyBH2rOtM10b9hL3t4JdGxTVlDxxRbifkHGL95EQ6UrM431yOYhkcxzerY%2Fgnp_zibmm_zs%2Fnc.cipq.zibmm%2F%2F%3Asptth)
- （6）轻量级，低门槛，1W行左右代码，只需引入一个静态库；

#### 设计思路

srpc的架构设计思路是怎样的？

作为一个RPC框架，srpc的架构是异常清晰的，用户需要关注这3个层次：
- （1）IDL接口描述文件层；
- （2）RPC序列化协议层；
- （3）网络通讯层；

同时，每一层次又提供了多种选择，用户可以任意的组合
- ![](http://cdn1.taocms.org/imgpxy.php?url=gnp%3Dtmf_xw%3F046%2FweBRbi95Ko72pjseO1IXggym7TYHnQPtz04CuPci3QTgHeykEpciyIKsNDxxRbifkHGL95EQ6UrM431yOYhkcxzerY%2Fgnp_zibmm_zs%2Fnc.cipq.zibmm%2F%2F%3Asptth)
- （1）IDL层，用户可以选择Protobuf或者Thrift；
- （2）协议层，可以选择Thrift，bRPC，tRPC等；
画外音：因此，才能和其他RPC框架无缝互通。
- （3）通信层，可以选择tcp或者http；

RPC的客户端要做什么工作，RPC的服务端要做什么工作，srpc框架又做了什么工作呢？

首先必须在IDL中要定义好：
- （1）逻辑请求包request；
- （2）逻辑响应包response；
- （3）服务接口函数method；
- ![](http://cdn1.taocms.org/imgpxy.php?url=gnp%3Dtmf_xw%3F046%2FwarKvQllah52wJ8UciZaiPGcgVUR0vyssGCJutjtLVPeJ8jWqy1Qlq5YDxxRbifkHGL95EQ6UrM431yOYhkcxzerY%2Fgnp_zibmm_zs%2Fnc.cipq.zibmm%2F%2F%3Asptth)

RPC-client的工作就异常简单了：
- （1）调用method；
- （2）绑定回调函数，处理回调；
对应上图中顶部方框的**绿色**部分。

RPC-server的工作也非常简单，像实现一个本地函数一样，提供远程的服务：
- （1）实现method；
- （2）接受request，逻辑处理，返回response；
对应上图中底部方框的**黄色**部分。

srpc框架完成了绝大部分的工作：
- （1）对request序列化，压缩，处理生成二进制报文；
- （2）连接池，超时，任务队列，异步等处理；
- （3）对request二进制报文处理，解压缩，反序列化；
对应上图中中间的方框的**红色**部分，以及大部分流程。

在这个过程中，srpc采用插件化设计，各种复杂性细节，对接口调用方与服务提供方，都是透明的，并且具备良好的扩展性。
- ![](http://cdn1.taocms.org/imgpxy.php?url=gnp%3Dtmf_xw%3F046%2FAHBbiQaiZSATQVPSEHrghOWhdBNLaima3b67OzKRqIkGGkVzBpDujwl51DxxRbifkHGL95EQ6UrM431yOYhkcxzerY%2Fgnp_zibmm_zs%2Fnc.cipq.zibmm%2F%2F%3Asptth)

另外，定义好IDL之后，服务端的代码可以利用框架提供的工具自动生成代码，业务服务提供方，只需要专注于业务接口的实现即可，你说帅气不帅气？
画外音：具体的生成工具，与生成方法，请参看git上的文档。

最后，我觉得这个srpc最帅气的地方之一，就是：开源版本即线上工程版本，更新快，issue响应快，并且文档真的很全！
画外音：不少大公司，公司内部的版本和开源的版本是两套代码，开源版本没有文档，KPI完成之后，开源就没人维护了，结果坑了一大票人。

#### 如何快速上手

三个步骤
- 第一步：定义IDL描述文件。
- 第二步：生成代码，并实现ServiceIMPL，server端就搞定了。
- 第三步：自己定义一个请求客户端，向服务端发送echo请求。

代码：

```c++
// (1) 第一步：定义IDL描述文件
syntax = "proto3";// proto2 or proto3
message EchoRequest {
   string message = 1;
   string name = 2;

};

message EchoResponse {
   string message = 1;

};

service Example {
   rpc Echo(EchoRequest) returns (EchoResponse);

};

// (2) 第二步：生成代码，并实现ServiceIMPL，server端就搞定了
class ExampleServiceImpl : public Example::Service
{
public
   void Echo(EchoRequest *request,
        EchoResponse *response,
        RPCContext *ctx) override
    {
       response->set_message("Hi, " + request->name());
    }
};

// (3) 第三步：自己定义一个请求客户端，向服务端发送echo请求。
int main()
{
   Example::SRPCClient client("127.0.0.1", 1412);
   EchoRequest req;
   req.set_message("Hello, srpc!");
   req.set_name("zhangsan");
   client.Echo(&req, 
        [](EchoResponse *response, RPCContext *ctx){});
   return 0;
}
```

# GraphQL

## GraphQL简介
  - GraphQL是一种新的API标准，它提供了一种比REST更有效、更强大和更灵活的替代方案。
- Facebook开发并开源的，现在由来自世界各地的公司和个人组成的大型社区维护。
- GraphQL本质上是一种**基于api的查询语言**，现在大多数应用程序都需要从服务器中获取数据，这些数据存储可能存储在数据库中，API的职责是提供与应用程序需求相匹配的存储数据的接口。
- 数据库无关的，而且可以在使用API的任何环境中有效使用，GraphQL是基于API之上的一层封装，目的是为了更好，更灵活的适用于业务的需求变化。
- 总结
  - 强大的API查询语言
  - 客户端服务器间通信中介
  - 比Restful API更高效、灵活

## GraphQL 对比 REST API 

- 【2021-2-6】总结

| 维度     | Restful API                    | GraphQL                                                                                                     |
| -------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------- |
| 接口     | 接口灵活性差、操作流程繁琐     | 声明式数据获取，接口数据精确返回，查询流程简洁，照顾了客户端的灵活性                                        |
| 扩展性   | 不断编写新接口（依赖于服务端） | 一个服务仅暴露一个 GraphQL 层，消除了服务器对数据格式的硬性规定，客户端按需请求数据，可进行单独维护和改进。 |
| 传输协议 | HTTP协议，不能灵活选择网络协议 | 传输层无关、数据库技术无关，技术栈选择更灵活                                                                |

## 介绍
- 举例说明：前端向后端请求一个book对象的数据及其作者信息。
- REST API动图演示：
  - ![](https://pic4.zhimg.com/v2-c9260410f4c294c8e0e4ce94d4ac6767_b.webp)
- GraphQL动图演示：
  - ![](https://pic1.zhimg.com/v2-6a2d8af7087b156cf3dde52ccf5d7d08_b.webp)
- 与REST多个endpoint不同，每一个的 GraphQL 服务其实对外只提供了一个用于调用内部接口的端点，所有的请求都访问这个暴露出来的唯一端点。
  - ![](https://pic2.zhimg.com/80/v2-6c849555869fbd25ceb69e2530273949_720w.jpg)
- GraphQL 实际上将多个 HTTP 请求聚合成了一个请求，将多个 restful 请求的资源变成了一个从根资源 POST 访问其他资源的 Comment 和 Author 的图，多个请求变成了一个请求的不同字段，从原有的**分散式**请求变成了**集中式**的请求，因此GraphQL又可以被看成是**图数据库**的形式。
  - ![](https://pic4.zhimg.com/80/v2-4efc7e2a78697e086b5bceec3f82b3c7_720w.jpg)

- GraphQL的核心概念：**图表模式**（Schema）
- GraphQL设计了一套Schema模式（可以理解为语法），其中最重要的就是数据类型的定义和支持。类型（Type）就是模式（Schema）最核心的东西
- 什么是类型？
  - 对于数据模型的抽象是通过类型（Type）来描述的，每一个类型有若干字段（Field）组成，每个字段又分别指向某个类型（Type）。这很像Java、C#中的类（Class）。
  - GraphQL的Type简单可以分为两种，一种叫做Scalar Type(标量类型)，另一种叫做Object Type(对象类型)。

## GraphQL特点总结

- **声明式数据获取**（可以对API进行查询）: 声明式的数据查询带来了接口的精确返回，服务器会按数据查询的格式返回同样结构的 JSON 数据、真正照顾了客户端的灵活性。
- 一个微服务仅暴露**一个 GraphQL 层**：一个微服务只需暴露一个GraphQL endpoint，客户端请求相应数据只通过该端点按需获取，不需要再额外定义其他接口。
- **传输层无关、数据库技术无关**：带来了更灵活的技术栈选择，比如我们可以选择对移动设备友好的协议，将网络传输数据量最小化，实现在网络协议层面优化应用。

## GraphQL接口设计

- GraphQL获取数据三步骤
  - 首先要设计数据模型，用来描述数据对象，它的作用可以看做是VO，用于告知GraphQL如何来描述定义的数据，为下一步查询返回做准备；
  - 前端使用模式查询语言（Schema）来描述需要请求的数据对象类型和具体需要的字段（称之为声明式数据获取）；
  - 后端GraphQL通过前端传过来的请求，根据需要，自动组装数据字段，返回给前端。
- ![](https://pic4.zhimg.com/v2-4bafe3f3e71c4b06d58b9d5b556df6df_b.webp)
- 设计思想：GraphQL 以图的形式将整个 Web 服务中的资源展示出来，客户端可以按照其需求自行调用，类似添加字段的需求其实就不再需要后端多次修改了。
- 创建GraphQL服务器的最终目标是：允许查询通过图和节点的形式去获取数据。
  - ![](https://pic2.zhimg.com/80/v2-942b7a4fbc8c8e5dcd016bc072895a9d_720w.jpg)

## GraphQL支持的数据操作
- GraphQL对数据支持的操作有：
  - 查询（Query）：获取数据的基本查询。
  - 变更（Mutation）：支持对数据的增删改等操作。
  - 订阅（Subscription）：用于监听数据变动、并靠websocket等协议推送变动的消息给对方。

## GraphQL执行逻辑

- 有人会问：
  - 使用了GraphQL就要完全抛弃REST了吗？
  - GraphQL需要直接对接数据库吗？
  - 使用GraphQL需要对现有的后端服务进行大刀阔斧的修改吗？
- 答案是：NO！不需要！
- 它完全可以以一种不侵入的方式来部署，将它作为前后端的中间服务，也就是，现在开始逐渐流行的 前端 —— 中端 —— 后端 的三层结构模式来部署！
- 那就来看一下这样的部署模式图：
  - ![](https://pic3.zhimg.com/80/v2-bd8655c1d1d472088ae593674491df12_720w.jpg)
- 完全可以搭建一个GraphQL服务器，专门来处理前端请求，并处理后端服务获取的数据，重新进行组装、筛选、过滤，将完美符合前端需要的数据返回。
- 新的开发需求可以直接就使用GraphQL服务来获取数据了，以前已经上线的功能无需改动，还是使用原有请求调用REST接口的方式，最低程度的降低更换GraphQL带来的技术成本问题！
- 如果没有那么多成本来支撑改造，那么就不需要改造！
- 只有当原有需求发生变化，需要对原功能进行修改时，就可以换成GraphQL了。

## GraphQL服务框架：

- 框架
  - Apollo Engine:一个用于监视 GraphQL 后端的性能和使用的服务。
  - Graphcool(github): 一个 BaaS（后端即服务），它为你的应用程序提供了一个 GraphQL 后端，且具有用于管理数据库和存储数据的强大的 web ui。
  - Tipe (github): 一个 SaaS（软件即服务）内容管理系统，允许你使用强大的编辑工具创建你 的内容，并通过 GraphQL 或 REST API 从任何地方访问它。
  - AWS AppSync：完全托管的 GraphQL 服务，包含实时订阅、离线编程和同步、企业级安全特性以及细粒度的授权控制。
  - Hasura：一个 BaaS（后端即服务），允许你在 Postgres 上创建数据表、定义权限并使用 GraphQL 接口查询和操作。
- 工具
  - graphiql (npm): 一个交互式的运行于浏览器中的 GraphQL IDE。
  - Graphql Language Service: 一个用于构建 IDE 的 GraphQL 语言服务（诊断、自动完成等） 的接口。
  - quicktype (github): 在 TypeScript、Swift、golang、C#、C++ 等语言中为 GraphQL 查 询生成类型。
- 想要获取更多关于Graphql的一些框架、工具，可以去awesome-graphql：一个神奇的社区，维护一系列库、资源等。更多Graphql的知识，可以去http://GraphQL.cn

# Python Web框架

- 参考：
  - [Python Web服务器并发性能测试](https://blog.csdn.net/bandaoyu/article/details/88546515)
  - [从0到1，Python Web开发的进击之路](https://zhuanlan.zhihu.com/p/25038203)

Python 常见部署方法有 ：
- `fcgi` ：用 spawn-fcgi 或者框架自带的工具对各个 project 分别生成监听进程，然后和 http 服务互动
- `wsgi` ：利用 http 服务的 mod_wsgi 模块来跑各个 project(Web 应用程序或框架简单而通用的 Web 服务器 之间的接口)。
- `uWSGI` 是一款像 php-cgi 一样监听同一端口，进行统一管理和负载平衡的工具，uWSGI，既不用 wsgi 协议也不用 fcgi 协议，而是自创了一个 uwsgi 的协议，据说该协议大约是 fcgi 协议的 10 倍那么快。

其实 WSGI 是分成 server 和 framework (即 application) 两部分 (当然还有 middleware)。严格说 WSGI 只是一个协议, 规范 server 和 framework 之间连接的接口。

- 所有的 Python Web框架都要遵循 WSGI 协议
- WSGI 中有一个非常重要的概念：每个Python Web应用都是一个可调用（callable）的对象。
    - 在 flask 中，这个对象就是 app = Flask(name) 创建出来的 app，图中的绿色Application部分。
    - 要运行web应用，必须有 web server，如熟悉的apache、nginx，或者python中的gunicorn，werkzeug提供的WSGIServer，是图的黄色Server部分
    - Server和Application之间怎么通信，就是WSGI的功能，规定了 app(environ, start_response) 的接口，server会调用 application，并传给它两个参数：environ 包含了请求的所有信息，start_response 是 application 处理完之后需要调用的函数，参数是状态码、响应头部还有错误信息。
    - ![](https://img-blog.csdn.net/20170530093502586)
    - WSGI application 非常重要的特点是可以嵌套。可以写个application，调用另外一个 application，然后再返回（类似一个 proxy）。一般来说，嵌套的最后一层是业务应用，中间就是 middleware。好处是可以解耦业务逻辑和其他功能，比如限流、认证、序列化等都实现成不同的中间层，不同的中间层和业务逻辑是不相关的，可以独立维护；而且用户也可以动态地组合不同的中间层来满足不同的需求。
    - Flask基于Werkzeug WSGI工具箱和Jinja2 模板引擎。Flask也被称为“microframework”，因为它使用简单的核心，用extension增加其他功能。Flask没有默认使用的数据库、窗体验证工具。然而，Flask保留了扩增的弹性，可以用Flask-extension加入这些功能：ORM、窗体验证工具、文件上传、各种开放式身份验证技术。Flask是一个核心，而其他功能则是一些插件
    - ![](https://img-blog.csdn.net/20170530093535180)
    - Flask是怎么将代码转换为可见的Web网页?
        - 从Web程序的一般流程来看，当客户端想要获取动态资源时，（比如ASP和PHP这类语言写的网站），会发起一个HTTP请求（比如用浏览器访问一个URL），Web应用程序就会在服务器后台进行相应的业务处理（比如对数据库进行操作或是进行一些计算操作等），取出用户需要的数据，生成相应的HTTP响应（当然，如果访问的是 静态资源 ，服务器则会直接返回用户所需的资源，不会进行业务处理）
        - ![](https://img-blog.csdn.net/20170530093546915)
        - 实际应用中，不同的请求可能会调用相同的处理逻辑，即Web开发中所谓的路由分发
        - ![](https://img-blog.csdn.net/20170530093643676)
        - Flask中，使用werkzeug来做路由分发，werkzeug是Flask使用的底层WSGI库（WSGI，全称 Web Server Gateway interface，或者 Python Web Server Gateway Interface，是为 Python 语言定义的Web服务器和Web应用程序之间的一种简单而通用的接口）。
        - WSGI将Web服务分成两个部分：服务器和应用程序。
            - WGSI服务器只负责与网络相关的两件事：接收浏览器的HTTP请求、向浏览器发送HTTP应答；
            - 而对HTTP请求的具体处理逻辑，则通过调用WSGI应用程序进行。
        - ![](https://img-blog.csdn.net/20170530093621801)
        - 参考：[Flask运行原理解析](https://blog.csdn.net/sunhuaqiang1/article/details/72808619)，[Flask应用运行过程剖析](https://blog.csdn.net/weixin_34250434/article/details/89072137)

WSGI server 把服务器功能以 WSGI 接口暴露出来。比如 mod_wsgi 是一种 server, 把 apache 的功能以 WSGI 接口的形式提供出来。
- WSGI framework 就是我们经常提到的 Django 这种框架。不过需要注意的是, 很少有单纯的 WSGI framework , 基于 WSGI 的框架往往都自带 WSGI server。比如 Django、CherryPy 都自带 WSGI server 主要是测试用途, 发布时则使用生产环境的 WSGI server。而有些 WSGI 下的框架比如 pylons、bfg 等, 自己不实现 WSGI server。使用 paste 作为 WSGI server。
- Paste 是流行的 WSGI server, 带有很多中间件。还有 flup 也是一个提供中间件的库。
搞清除 WSGI server 和 application, 中间件自然就清楚了。除了 session、cache 之类的应用, 前段时间看到一个 bfg 下的中间件专门用于给网站换肤的 (skin) 。中间件可以想到的用法还很多。
- 这里再补充一下, 像 django 这样的框架如何以 fastcgi 的方式跑在 apache 上的。这要用到 flup.fcgi 或者 fastcgi.py (eurasia 中也设计了一个 fastcgi.py 的实现) 这些工具, 它们就是把 fastcgi 协议转换成 WSGI 接口 (把 fastcgi 变成一个 WSGI server) 供框架接入。
    - 整个架构是这样的: django -> fcgi2wsgiserver -> mod_fcgi -> apache 。
- 虽然我不是 WSGI 的粉丝, 但是不可否认 WSGI 对 python web 的意义重大。有意自己设计 web 框架, 又不想做 socket 层和 http 报文解析的同学, 可以从 WSGI 开始设计自己的框架。在 python 圈子里有个共识, 自己随手搞个 web 框架跟喝口水一样自然, 非常方便。或许每个 python 玩家都会经历一个倒腾框架的

uWSGI 的主要特点如下：
- 超快的性能。
- 低内存占用（实测为 apache2 的 mod_wsgi 的一半左右）。
- 多app管理。
- 详尽的日志功能（可以用来分析 app 性能和瓶颈）。
- 高度可定制（内存大小限制，服务一定次数后重启等）。

Django就没有用异步，通过线程来实现并发，这也是WSGI普遍的做法，跟tornado不是一个概念

作者：[HylaruCoder](https://www.zhihu.com/question/297267614/answer/505683007)

简单说下几种部署方式 
- Flask 内置 WebServer + Flask App = 弱鸡版本的 Server, 单进程（单 worker) / 失败挂掉 / 不易 Scale
- Gunicorn + Flask App = 多进程（多 worker) / 多线程 / 失败自动帮你重启 Worker / 可简单Scale
- 多 Nginx + 多 Gunicorn + Flask App = 小型多实例 Web 应用，一般也会给 gunicorn 挂 supervisor

在生产环境中, 一般都是请求的走向都是 Nginx->gunicorn->flask/django app 

第一个问题，Flask 作为一个 Web 框架，内置了一个 webserver, 但这自带的 Server 到底能不能用？ 
- 官网的介绍： While lightweight and easy to use, Flask’s built-in server is not suitable for production as it doesn’t scale well. Some of the options available for properly running Flask in production are documented here. 
- 很显然，内置的 webserver 是能用的。但不适合放在生产环境。这个 server 本来就是给开发者用的。框架本身并不提供生产环境的 web 服务器，SpringBoot 这种内置 Tomcat 生产级服务器 是例外。 
- 查看 flask 代码的时候也可以看到这个 WebServer 的名称也叫做 run_simple , too simple 的东西往往不太适合生产。 

```python
from werkzeug.serving import run_simple
run_simple('localhost', 5000, application, use_reloader=True)
```

来看看为什么？ 假设我们使用的是 Nginx+Flask Run 来当作生产环境，全部部署在一台机器上。 

劣势如下： 
- 『单 Worker』只有一个进程在跑所有的请求，而由于实现的简陋性，内置 webserver 很容易卡死。并且只有一个 Worker 在跑请求。在多核 CPU 下，仅仅占用一核。当然，其实也可以多起几个进程。
- 『缺乏 Worker 的管理』接上，加入负载量上来了，Gunicorn 可以调节 Worker 的数量。而这个东西，内置的 Webserver 是不适合做这种事情的。

一言以蔽之，太弱，几个请求就打满了。 

第二个问题，Gunicorn 作为 Server 相对而言可以有什么提升。 

gunicorn 的优点如下
- 帮我 scale worker, 进程挂了帮我重启
- 用 python 的框架 flask/django/webpy 配置起来都差不多。
- 还有信号机制。可以支持多种配置。

在管理 worker 上，使用了 pre-fork 模型，即一个 master 进程管理多个 worker 进程，所有请求和响应均由 Worker 处理。Master 进程是一个简单的 loop, 监听 worker 不同进程信号并且作出响应。比如接受到 TTIN 提升 worker 数量，TTOU 降低运行 Worker 数量。如果 worker 挂了，发出 CHLD, 则重启失败的 worker, 同步的 Worker 一次处理一个请求。 

PS: 如果没有静态资源并且无需反向代理的话，抛弃 Nginx 直接使用 Gunicorn 和 Flask app 也能搞定。

## Gunicorn

Gunicorn“绿色独角兽”是一个被广泛使用的**高性能**的python WSGI UNIX HTTP服务器，移植自Ruby的独角兽（Unicorn）项目，使用pre-fork worker模式具有使用非常简单，轻量级的资源消耗，以及高性能等特点。
- pre-fork worker模式: 一个中央master进程来管理一系列的工作进程，master并不知道各个独立客户端。所有的请求和响应完全由工作进程去完成。master通过一个循环不断监听各个进程的信号并作出相应反应，这些信号包括TTIN、TTOU和CHLD。TTIN和TTOU告诉master增加或者减少正在运行的进程数，CHLD表明一个子进程被终止了，在这种情况下master进程会自动重启这个失败的进程。

Gunicorn是主流的WSGI容器之一，它易于配置，兼容性好，CPU消耗很少，它支持多种worker模式：
- 同步worker：默认模式，也就是一次只处理一个请求。最简单的同步工作模式
- 异步worker：通过Eventlet、Gevent实现的异步模式,gevent和eventlet都是基于greenlet库，利用python协程实现的
- 异步IOWorker：目前支持gthread和gaiohttp; gaiohttp利用aiohttp库实现异步IO，支持web socket; gthread采用的事线程工作模式，利用线程池管理连接
- Tronado worker：tornado框架,利用python Tornado框架实现

工作模式是通过work_class参数配置的值：缺省值：sync
- sync
- Gevent
- Eventlet
- tornado
- gaiohttp
- gthread

[Gunicorn使用详解](https://www.cnblogs.com/shijingjing07/p/9110619.html), [Gunicorn的使用](https://www.jianshu.com/p/8ea438251e44/)
![](https://img.jbzj.com/file_images/article/201907/2019722104302288.jpg?2019622104331)
Gunicorn(Green Unicorn)是一个WSGI HTTP服务器,python自带的有个web服务器，叫做wsgiref，Gunicorn的优势在于，它使用了pre-fork worker模式，gunicorn在启动时，会在主进程中预先fork出指定数量的worker进程来处理请求，gunicorn依靠操作系统来提供负载均衡，推进的worker数量是(2*$num_cores)+1
python是单线程的语言，当进程阻塞时，后续请求将排队处理。所用pre-fork worker模式，极大提升了服务器请求负载。

安装

```shell
pip install gunicorn
```

使用,编写wsgi接口,test.py代码

```python
def application(environ,start_response):
    start_response('200 OK',[('Content-Type','text/html')])
    return b'<h1>Hello,web!</h1>'
```

使用gunicorn监听请求，运行以下命令
- -w:指定fork的worker进程数
- -b:指定绑定的端口
- test:模块名,python文件名
- application:变量名,python文件中可调用的wsgi接口名称

```shell
gunicorn -w 2 -b 0.0.0.0:8000 test.application
```

gunicorn相关参数
- 1) -c CONFIG,--config=CONFIG, 指定一个配置文件（py文件）
- 2) -b BIND,--bind=BIND 与指定socket进行板顶
- 3) -D,--daemon 后台进程方式运行gunicorn进程
- 4) -w WORKERS,--workers=WORKERS, 工作进程的数量
  - 获取CPU个数: python -c 'import multiprocessing;print(multiprocessing.cpu_count())'
- 5) -k WORKERCLASS,--worker-class=WORKERCLASS, 工作进程类型，包括sync（默认）,eventlet,gevent,tornado,gthread,gaiohttp
- 6) --backlog INT 最大挂起的连接数
- 7)--log-level LEVEL 日志输出等级
- 8) --access-logfile FILE 访问日志输出文件
- 9)--error-logfile FILE 错误日志输出文件

gunicorn可以写在配置文件中，下面举列说明配置文件的写法,gunicorn.conf.py

```python
bind = "0.0.0.0:8000"
workers = 2
```

运行以下命令:
- gunicorn -c gunicorn.conf.py test:application

## supervisor

[使用Gunicorn与Supervisor部署Flask](https://blog.csdn.net/henghenghalala/article/details/103685602)

supervisor实现程序的后台守护运行, 也可以实现开机自动重启

```shell
# 下载安装supervisor， 请注意此时所在目录还是项目目录 /root/xubobo/project
pip install supervisor
# 初始化配置文件
echo_supervisord_conf > supervisor.conf
# 此时目录下多了一个配置文件， 修改此配置文件
vim supervisor.conf
# 在配置文件最底部加入如下配置
[program: githook]
command=/root/xubobo/githook/venv/bin/gunicorn -w 3 -b 0.0.0.0:5000 app:app   ; 启动命令
directory=/root/xubobo/githook                                   ; 项目的文件夹路径
startsecs=0                                                      ; 启动时间
stopwaitsecs=0                                                   ; 终止等待时间
autostart=true                                                   ; 是否自动启动
autorestart=true                                                 ; 是否自动重启
stdout_logfile=/data/python/SMT/log/gunicorn.log                 ; log 日志
stderr_logfile=/data/python/SMT/log/gunicorn.err                 ; 错误日志

# 指定配置文件来启动supervisord
supervisord -c supervisor.conf
# 检查状态
supervisorctl -c supervisor.conf status
# 可以看到 githook 应用已经是RUNNING状态了
```

supervisor的常用命令

```shell
# 通过配置文件启动supervisor
supervisord -c supervisor.conf       
# 察看supervisor的状态
supervisorctl -c supervisor.conf status
# 重新载入 配置文件
supervisorctl -c supervisor.conf reload
# 启动指定/所有 supervisor管理的程序进程
supervisorctl -c supervisor.conf start [all]|[appname]
# 关闭指定/所有 supervisor管理的程序进程
supervisorctl -c supervisor.conf stop [all]|[appname]
```

## gevent/grequests

[python中grequests模块简单应用](https://blog.csdn.net/cong_da_da/article/details/84325849)

用requests向某个url批量发起POST请求，交互的内容很简单，若开启多线程去访问占用太多资源不合理。
想到了使用协程gevent，grequests 模块相当于是封装了gevent的requests模块

安装
- 若是联网安装，直接 pip install grequests 完事
- 若是离线安装，需要先安装 greenlet模块 和 gevent模块 ，再安装 grequests模块 

```python
# coding:utf-8
adata = json.dumps({"key": "value"})
header = {"Content-type": "appliaction/json", "Accept":"application/json"}
url = "http://www.baidu.com"

task = []
req = grequests.request("POST", url=url, data=adata, headers=header)
task.append(req)
# 此处map的requests参数是装有实例化请求对象的列表,其返回值也是列表， size参数可以控制并发的数量
resp = grequests.map(task)
print resp
# 查看返回值的属性值，我们关注的一般就是text json links  url headers 等了
print dir(resp[0])
#==============
urls = ["http://www.baidu.com", "http://www.baidu.com", "http://www.baidu.com"]
req = (grequests.get(u) for u in urls)
resp = grequests.map(req)
```

grequests和requests的对比
- grequests比单个的requests请求要快一点，当网络延迟较高时，grequests优势比较明显，修改 map的size参数进行尝试,合理的设置size值，不要太大，超过阀值再大也没有用

```python
# coding:utf-8
import grequests
import time
import json
import requests
 
 
adata = json.dumps({"key": "value"})
header = {"Content-type": "appliaction/json", "Accept":"application/json"}

def use_grequests(num):
    task = []
    urls = ["http://hao.jobbole.com/python-docx/" for i in range(num)]
    while urls:
        url = urls.pop(0)
        rs = grequests.request("POST", url, data=adata, headers=header)
        task.append(rs)
    resp = grequests.map(task, size=5)
    return resp
 
def use_requests(num):
    urls = ["http://hao.jobbole.com/python-docx/" for i in range(num)]
    index = 0
    while urls:
        url = urls.pop(0)
        resp = requests.post(url=url, headers=header, data=adata)
        index += 1
        if index % 10 == 0:
            print u'目前是第{}个请求'.format(index)

def main(num):
    time1 = time.time()
    finall_res = use_requests(num)
    print finall_res
    time2 = time.time()
    T = time2 - time1
    print u'use_requests发起{}个请求花费了{}秒'.format(num, T)
 
    print u'正在使用grequests模块发起请求...'
    time3 = time.time()
    finall_res2 = use_grequests(num)
    print finall_res2
    time4 = time.time()
    T2 = time4 - time3
    print u'use_grequests发起{}个请求花费了{}秒'.format(num, T2)
 
if __name__ == '__main__':
    main(100)
```

手动使用gevent配合requests模块

```python
# coding:utf-8
import gevent
import time
from gevent import monkey
import requests
monkey.patch_all()
 
datali = [x for x in range(100)]
task = []
def func(i):
	print u'第{}个请求'.format(i)
    url = "http://hao.jobbole.com/python-docx/"
    resp = requests.get(url=url)
    return resp
 
time1 = time.time()
for i in datali:
    task.append(gevent.spawn(func, i))
res = gevent.joinall(task)
print len(res)
time2 = time.time()
T = time2 - time1
print u'消耗了{}秒'.format(T)
```


## web框架对比

- Python web框架的性能响应排行榜
    - 从并发性上看Fastapi完全碾压了 Flask (实际上也领先了同为异步框架的tornado 不少)
    - ![](https://pic4.zhimg.com/80/v2-7e31e8992685cc11594c5c31a65bc357_720w.jpg)
- 【2020-11-26】[Python Web 框架：Django、Flask 与 Tornado 的性能对比](https://www.jianshu.com/p/9960a9667a5c)，结论
   - Django：Python 界最全能的 web 开发框架，battery-include 各种功能完备，可维护性和开发速度一级棒。常有人说 Django 慢，其实主要慢在 Django ORM 与数据库的交互上，所以是否选用 Django，取决于项目对数据库交互的要求以及各种优化。而对于 Django 的同步特性导致吞吐量小的问题，其实可以通过 Celery 等解决，倒不是一个根本问题。Django 的项目代表：Instagram，Guardian。
   - Tornado：天生异步，性能强悍是 Tornado 的名片，然而 Tornado 相比 Django 是较为原始的框架，诸多内容需要自己去处理。当然，随着项目越来越大，框架能够提供的功能占比越来越小，更多的内容需要团队自己去实现，而大项目往往需要性能的保证，这时候 Tornado 就是比较好的选择。Tornado项目代表：知乎。
   - Flask：微框架的典范，号称 Python 代码写得最好的项目之一。Flask 的灵活性，也是双刃剑：能用好 Flask 的，可以做成 Pinterest，用不好就是灾难（显然对任何框架都是这样）。Flask 虽然是微框架，但是也可以做成规模化的 Flask。加上 Flask 可以自由选择自己的数据库交互组件（通常是 Flask-SQLAlchemy），而且加上 celery +redis 等异步特性以后，Flask 的性能相对 Tornado 也不逞多让，也许Flask 的灵活性可能是某些团队更需要的。

作者：Tim_Lee
链接：https://www.jianshu.com/p/9960a9667a5c


## Flask

- 【2021-3-18】flask 1.0和1.1版本的差异，api返回值类型不同，前者不能直接返回python的dict类型，需要用json.dumps转换为string，后者可以直接返回dict结构，自动转换

![](https://pic3.zhimg.com/v2-ddbbe5dcf4fa4b35f11bca5f0546ecc3_1440w.jpg?source=172ae18b)

- [用Python 的Flask实现 RESTful API(学习篇)](https://zhuanlan.zhihu.com/p/32202156)


### 部署

- 示例代码

```python
from flask import Flask
app = Flask(__name__)

@app.route('/')
def hello_world():
    return 'Hello World!'

if __name__ == '__main__':
    app.run()
```

- 浏览器上输入http://127.0.0.1:5000/，便会看到 Hello World！ 字样
- ![](https://picb.zhimg.com/80/v2-ea6c68e52462fb5025992cbb6b9728ed_720w.jpg)


### 传参

- 传递请求参数的方式有两种
    - 一是打包成 JSON 之后再传递
        - 一般用 POST 请求来传递参数，然后用 FLASK 中 request 模块的 get_json() 方法获取参数。
    - 二是直接放进 URL 进行传递 。
        - 一般用 GET 请求传递参数，然后从 request.args 中用 get() 方法获取参数
    - 不过需要说明的是用 POST 请求也可以通过 URL 的方式传递参数，而且获取参数的方式与 GET 请求相同。

```python
from flask import request, jsonify

@app.route('/', methods = ["GET", "POST"])
def post_data():
	# 假设有如下 JSON 数据
    #{"obj": [{"name":"John","age":"20"}] }
    
    #可以通过 request 的 args 属性来获取GET参数
    name = request.args.get("name")
    age = request.args.get("age")

    # ----- POST -----
    # 方法一
    data = request.get_json()                # 获取 JSON 数据
    data = pd.DataFrame(data["obj"])   # 获取参数并转变为 DataFrame 结构
    
    # 方法二
    # data = request.json        # 获取 JOSN 数据
    # data = data.get('obj')     #  以字典形式获取参数
    
    # ======= 统一 ======
    if request.method == 'POST':
        data = request.json
        data = request.form.to_dict()
        data = request.values
    elif request.method == 'GET':
        data = request.args

    # 经过处理之后得到要传回的数据
    res = some_function(data)
    
    # 将 DataFrame  数据再次打包为 JSON 并传回
    # 方法一
    res = '\{\{"obj": {} \}\}'.format(res.to_json(orient = "records", force_ascii = False))
    # 方法二
    # res = jsonify({"obj":res.to_json(orient = "records", force_ascii = False)})
    
    return res
```

### app模块化 blueprint

一个py文件中写入了很多路由, 维护代码非常麻烦，时长出现重名，错乱，然而并不能想普通py代码一样直接导入别的路由 → 路由**模块化**

Flask提供一个特有的模块化处理方式blueprint，Blueprint 是一个存储操作方法的容器，这些操作在这个Blueprint 被注册到一个应用之后就可以被调用，Flask 可以通过Blueprint来组织URL以及处理请求。

Flask使用Blueprint让应用实现模块化，在Flask中，Blueprint具有如下属性：
- 一个应用app可以具有多个Blueprint
- 可以将一个Blueprint**注册**到任何一个未使用的URL下比如 “/”、“/sample”或者子域名
- 在一个应用中，一个模块可以注册**多次**
- Blueprint可以单独具有自己的模板、静态文件或者其它的通用操作方法，它并不是必须要实现应用的视图和函数的
- 在一个应用初始化时，就应该要注册需要使用的Blueprint
但是一个Blueprint并不是一个完整的应用，它不能独立于应用运行，而必须要注册到某一个应用中。

蓝图/Blueprint对象用起来和一个应用/Flask对象差不多，最大的区别在于**蓝图对象没有办法独立运行**，必须将它注册到一个应用对象上才能生效

使用蓝图可以分为三个步骤, 应用启动后,通过/admin/可以访问到蓝图中定义的视图函数

```python
# 1,创建一个蓝图对象
admin=Blueprint('admin',__name__)　
# 2,在这个蓝图对象上进行操作,注册路由,指定静态文件夹,注册模版过滤器
@admin.route('/')
def admin_home():
    return 'admin_home'
# 3,在应用对象上注册这个蓝图对象
app.register_blueprint(admin,url_prefix='/admin')

```

运行机制
- 蓝图是保存了一组将来可以在应用对象上执行的操作，注册路由就是一种操作. 当在应用对象上调用 route 装饰器注册路由时,这个操作将修改对象的url_map路由表. 然而，蓝图对象根本没有路由表，当我们在蓝图对象上调用route装饰器注册路由时,它只是在内部的一个延迟操作记录列表defered_functions中添加了一个项
- 当执行应用对象的 register_blueprint() 方法时，应用对象将从蓝图对象的 defered_functions 列表中取出每一项，并以自身作为参数执行该匿名函数，即调用应用对象的 add_url_rule() 方法，这将真正的修改应用对象的路由表

蓝图的url前缀
- 当我们在应用对象上注册一个蓝图时，可以指定一个url_prefix关键字参数（这个参数默认是/）
- 在应用最终的路由表 url_map中，在蓝图上注册的路由URL自动被加上了这个前缀，这个可以保证在多个蓝图中使用相同的URL规则而不会最终引起冲突，只要在注册蓝图时将不同的蓝图挂接到不同的自路径即可

url_for
url_for('admin.index') # /admin/

### 自动生成APIs文档

- 【2020-8-22】[自动为Flask写的API生成帮助文档](https://segmentfault.com/a/1190000013420209)
    - ![](https://segmentfault.com/img/remote/1460000013420214?w=1760&h=1424)
- [使用swagger 生成 Flask RESTful API](https://segmentfault.com/a/1190000010144742)
- [Flask 系列之 构建 Swagger UI 风格的 WebAPI](https://www.cnblogs.com/hippieZhou/p/10848023.html), 基于 Flask 而创建 Swagger UI 风格的 WebAPI 包有很多，如
    - [flasgger](https://github.com/rochacbruno/flasgger)
    - [flask-swagger-ui](https://github.com/sveint/flask-swagger-ui)
    - [swagger-ui-py](https://github.com/PWZER/swagger-ui-py)
    - [flask_restplus](https://www.cnblogs.com/leejack/p/9162367.html)
    - ![](https://img2018.cnblogs.com/blog/749711/201905/749711-20190511131630516-1117259038.png)

flasgger配置文件解析：
- 在flasgger的配置文件中，以**yaml格式**描述了flasgger页面的内容；
- **tags标签**中可以放置对这个api的描述和说明；
- **parameters标签**中可以放置这个api所需的参数
  - 如果是GET方法，可以放置url中附带的请求参数
  - 如果是POST方法，可以将参数放置在body参数 **schema子标签**下面；
- responses标签中可以放置返回的信息，以状态码的形式分别列出，每个状态码下可以用schema标签放置返回实体的格式；

- 【2020-8-26】页面测试功能（try it out）对GET/POST无效，传参失败
  - 已提交issue：[Failed to get parameters by POST method in “try it out” feature](https://github.com/flasgger/flasgger/issues/428)
- 【2021-7-19】参考帖子[Parameter in body does not work in pydoc #461](https://github.com/flasgger/flasgger/issues/461)，正确的使用方法：parameter针对url path里的参数，如果启用post需要新增body参数，里面注明post参数信息

- 安装：
    - flask_restplus实践失败，个别依赖不满足，放弃
    - pip install [flasgger](https://github.com/flasgger/flasgger)
- 测试：如下 


```python
# coding:utf8

#/**************************************************************************
# * 
# * Copyright (c) 2020, Inc. All Rights Reserved
# * 
# **************************************************************************
# * @file main.py
# * @author wangqiwen
# * @date 2020/08/22 08:32
# **************************************************************************

from flask import Flask, request, render_template, jsonify, request
#from flask_restplus import Api
from flasgger import Swagger, swag_from

app = Flask(__name__)
# swagger api封装，每个接口的注释文档中按照yaml格式排版
Swagger(app)

@app.route('/api/<arg>')
#@app.route("/index",methods=["GET","POST"])
#@app.route("/index/<int,>")
def hello_world():

    """
    API说明
    副标题（点击才能显示），url请求示例：[点击](http://10.200.24.101:8082/nlu?query_info=%E4%BD%A0%E5%A5%BD%E5%B0%8F%E8%B4%9D,%E5%8C%97%E4%BA%AC%E6%98%AF%E4%B8%AA%E5%A4%A7%E5%9F%8E%E5%B8%82&action_info=ner||seg||pos||keyword||summary)
    ---
    tags:
      - 自动生成示例
    parameters:
      - name: arg # path参数区
        in: path
        type: string
        enum: ['all', 'rgb', 'cmyk'] # 枚举类型
        required: false
        description: 变量含义
      - name: body  # post 参数区（与get冲突）
        in: body
        required: true
        schema:
          id: 用户注册
          required:
            - username
            - password
          properties:
            username:
              type: string
              description: 用户名.
            password:
              type: string
              description: 密码.
            inn_name:
              type: string
              description: 客栈名称.
    responses:
      500:
        description: 自定义服务端错误
      200:
        description: 自定义状态描述
        schema:
          id: awesome
          properties:
            language:
              type: string
              description: The language name
              default: Lua
    """ 
    res = {"code":0, "msg":'-', "data":{}}
    if request.method == 'GET':
        req_data = request.values # 表单形式
    elif request.method == 'POST':
        req_data = request.json # json形式
    else:
        res['msg'] = '异常请求(非GET/POST)'
        res['status'] = -1
    # return jsonify(result) # 方法①
    # return json.dumps(res, ensure_ascii=False) # 方法②
    return render_template('index.html')

@app.route("/tmp",methods=["GET","POST"])
def tmp():
    """
        临时接口
    """
    return render_template('index.html')

if __name__ == '__main__':
    #app.run()
    #app.run(debug=True)
    app.run(debug=True, host='10.26.15.30', port='8044')

# */* vim: set expandtab ts=4 sw=4 sts=4 tw=400: */
```



### 全局变量

- 参考: [Flask 上下文全局变量](https://www.jianshu.com/p/dfe1ee1dc1ec)
- Flask 在分发请求之前激活(或推送)程序和请求上下文，请求处理完成后再将其删除。程 序上下文被推送后，就可以在线程中使用 current_app 和 g 变量。类似地，请求上下文被 推送后，就可以使用 request 和 session 变量。如果使用这些变量时我们没有激活程序上 下文或请求上下文，就会导致错误。

| 变量名      | 上下文     | 说明                                                   |
| ----------- | ---------- | ------------------------------------------------------ |
| current_app | 程序上下文 | 当前激活程序的程序实例                                 |
| g           | 程序上下文 | 处理请求时用作临时存储的对象，每次请求都会重设这个变量 |
| request     | 请求上下文 | 请求对象，封装了客户端发出的HTTP请求中的内容           |
| session     | 请求上下文 | 用户会话，用于存储请求之间需要记住的值的词典           |

- 代码示例：[flask中4种全局变量](https://www.jianshu.com/p/f24e2c9b548e)

**Session设置**

- 代码

```python
from flask import Flask,session
import os
from datetime import timedelta
app = Flask(__name__)
app.config['SECRET_KEY'] = os.urandom(24)
app.config['PERMANENT_SESSION_LIFETIME'] = timedelta(days=7)
#SESSION_TYPE = "redis"
# 添加数据到session中
# 操作session的时候 跟操作字典是一样的。
# SECRET_KEY

@app.route('/')
def hello_world():
    session['username'] = 'zhangsan'
    # 如果没有指定session的过期时间，那么默认是浏览器关闭就自动结束
    # 如果设置了session的permanent属性为True，那么过期时间是31天。
    session.permanent = True
    return 'Hello World!'

@app.route('/get/')
def get():
    # session['username']   如果username不存在则会抛出异常
    # session.get('username')   如果username不存在会得到 none 不会报错 推荐使用
    return session.get('username')

@app.route('/delete/')
def delete():
    print(session.get('username'))
    session.pop('username')
    print(session.get('username'))
    return 'success'

@app.route('/clear/')
def clear():
    print(session.get('username'))
    # 删除session中的所有数据
    session.clear()
    print(session.get('username'))
    return 'success'

if __name__ == '__main__':
    app.run(debug=True)
```

**分布式session**

- 【2020-9-11】以上代码仅适用单机版，如果部署在分布式环境，流量负载均衡，会出现session找不到的现象
- 分布式session一致性：
    - 客户端发送一个请求，经过负载均衡后该请求会被分配到服务器中的其中一个，由于不同服务器含有不同的web服务器(例如Tomcat)，不同的web服务器中并不能发现之前web服务器保存的session信息，就会再次生成一个JSESSIONID，之前的状态就会丢失

- 【2020-9-18】Flask Session共享的一种实现方式：使用出问题（待核实原因），改用redis直接存储session变量
    - [flask-session 在redis中存储session](https://www.cnblogs.com/jackadam/p/9822680.html)

```python
import os
from flask import Flask, session, request
from flask_session import Session
from redis import Redis

app = Flask(__name__)
app.config['SESSION_TYPE'] = 'redis'   #session存储格式为redis
app.config['SESSION_REDIS'] = Redis(    #redis的服务器参数
    host='192.168.1.3',                 #服务器地址
    port=6379)                           #服务器端口

app.config['SESSION_USE_SIGNER'] = True   #是否强制加盐，混淆session
app.config['SECRET_KEY'] = os.urandom(24)  #如果加盐，那么必须设置的安全码，盐
app.config['SESSION_PERMANENT'] = False  #sessons是否长期有效，false，则关闭浏览器，session失效
app.config['PERMANENT_SESSION_LIFETIME'] = 3600   #session长期有效，则设定session生命周期，整数秒，默认大概不到3小时。
Session(app)


@app.route('/')
def default():
    return session.get('key', 'not set')

@app.route('/test/')
def test():
    session['key'] = 'test'
    return 'ok'

@app.route('/set/')
def set():
    arg = request.args.get('key')
    print(arg)
    session['key'] = arg
    return 'ok'


@app.route('/get/')
def get():
    return session.get('key', 'not set')


@app.route('/pop/')
def pop():
    session.pop('key')
    return session.get('key', 'not set')


@app.route('/clear/')
def clear():
    session.clear()
    return session.get('key', 'not set')

if __name__ == "__main__":
    app.run(debug=True)
```


- 解决方法：
    - 参考：
        - [如何配置 flask将session 保存在redis中](https://www.cnblogs.com/wangkun122/articles/9118009.html)
        - [4种分布式session解决方案](https://blog.csdn.net/qq_35620501/article/details/95047642)
        - [分布式session的几种实现方式](https://www.cnblogs.com/daofaziran/p/10933221.html)

- 方案一：**客户端存储**
    - 直接将信息存储在cookie中
    - cookie是存储在客户端上的一小段数据，客户端通过http协议和服务器进行cookie交互，通常用来存储一些不敏感信息
    - 缺点：
        - 数据存储在客户端，存在安全隐患
        - cookie存储大小、类型存在限制
        - 数据存储在cookie中，如果一次请求cookie过大，会给网络增加更大的开销
- 方案二：**session复制**
    - session复制是小型企业应用使用较多的一种服务器集群session管理机制，在真正的开发使用的并不是很多，通过对web服务器(例如Tomcat)进行搭建集群。
    - 存在的问题：
        - session同步的原理是在同一个局域网里面通过发送广播来异步同步session的，一旦服务器多了，并发上来了，session需要同步的数据量就大了，需要将其他服务器上的session全部同步到本服务器上，会带来一定的网路开销，在用户量特别大的时候，会出现内存不足的情况
    - 优点：
        - 服务器之间的session信息都是同步的，任何一台服务器宕机的时候不会影响另外服务器中session的状态，配置相对简单
        - Tomcat内部已经支持分布式架构开发管理机制，可以对tomcat修改配置来支持session复制，在集群中的几台服务器之间同步session对象，使每台服务器上都保存了所有用户的session信息，这样任何一台本机宕机都不会导致session数据的丢失，而服务器使用session时，也只需要在本机获取即可
- 方案三：**session绑定**
    - Nginx介绍：Nginx是一款自由的、开源的、高性能的http服务器和反向代理服务器
    - Nginx能做什么：反向代理、负载均衡、http服务器（动静代理）、正向代理
    - 如何使用nginx进行session绑定
        - 利用nginx的反向代理和负载均衡，之前是客户端会被分配到其中一台服务器进行处理，具体分配到哪台服务器进行处理还得看服务器的负载均衡算法(轮询、随机、ip-hash、权重等)，但是我们可以基于nginx的ip-hash策略，可以对客户端和服务器进行绑定，同一个客户端就只能访问该服务器，无论客户端发送多少次请求都被同一个服务器处理
    - 缺点：
        - 容易造成单点故障，如果有一台服务器宕机，那么该台服务器上的session信息将会丢失
        - 前端不能有负载均衡，如果有，session绑定将会出问题
    - 优点：
        - 配置简单
- 方案四：**session持久化到数据库**
    - 如：基于redis存储session方案
    - 原理：就不用多说了吧，拿出一个数据库，专门用来存储session信息。保证session的持久化。
    - 优点：服务器出现问题，session不会丢失
    - 缺点：如果网站的访问量很大，把session存储到数据库中，会对数据库造成很大压力，还需要增加额外的开销维护数据库。
    - 优点：
        - 企业中使用的最多的一种方式
        - spring为我们封装好了spring-session，直接引入依赖即可
        - 数据保存在redis中，无缝接入，不存在任何安全隐患
        - redis自身可做集群，搭建主从，同时方便管理
    - 缺点：
        - 多了一次网络调用，web容器需要向redis访问
    - 基于redis存储session方案流程示意图
![](https://img-blog.csdnimg.cn/2019070810495327.png)

- 方案五：**session复制**
    - terracotta实现session复制
    - Terracotta的基本原理是对于集群间共享的数据，当在一个节点发生变化的时候，Terracotta只把变化的部分发送给Terracotta服务器，然后由服务器把它转发给真正需要这个数据的节点。对服务器session复制的优化。

```python
SESSION_TYPE = "redis"

#在settings.py中写上这句话就能够让flask把session写在  redis中去
SESSION_REDIS = Redis(host='192.168.0.94', port='6379')

```

- 【2020-9-24】[深夜，我偷听到程序员要对Session下手……](https://www.toutiao.com/i6875568455475528203/)，演变历史：
    - **单机服务器**(静态) → 单机服务器(动态) → **分布式服务器**（Nginx） → Redis**独立存储** → **Token时代**
    - （1）**单台Web服务器-静态**：一个web服务器，每天处理的不过是一些静态资源文件，像HTML、CSS、JS、图片等等，按照HTTP协议的规范处理请求即可。
        - ![](https://p6-tt.byteimg.com/origin/pgc-image/da73c2849fb04ad3b5e47ec55dc47d0a)
    - （2）**单台Web服务器-动态**：
        - 动态交互的网络应用开始如雨后春笋般涌现，像各种各样的论坛啊，购物网站啊之类
        - Session诞生：记住每一个请求背后的用户是谁
        - 浏览器登陆以后，服务器分配一个session id，表示一个会话，然后返回给浏览器保存着。后续再来请求的时候，带上，就能知道是谁
        - ![](https://p6-tt.byteimg.com/origin/pgc-image/1c616a10971e41929a9408e990eb3a12)
    - （3）**分布式Web服务器**：
        - 没几年，互联网的发展实在是太快，用户量蹭蹭上涨，session id数量也与日俱增，服务器不堪重负
        - 增加nginx来进行负载均衡，单台服务器变成了3台web服务器组成的小集群
        - ![](https://p6-tt.byteimg.com/origin/pgc-image/3fd170a8dec5461996e19b3d9c6ee107)
        - 压力虽然减少，但session id的管理问题却变得复杂起来
            - 请求如果发到某台机器，登记了session id，但下次请求说不定就发到第二胎，一会儿又发到第三台，这样各个服务器上的信息不一致，就会出现一些异常情况，用户估计要破口大骂：这什么辣鸡网站？
            - （3.1）nginx：同一个用户来的请求都发给同一台机器
        - 好景不长，各服务器相继出现宕机情况，这时候nginx还得把请求交给还在工作的机器，原来的问题就又出现了
            - （3.2）session同步：有新增、失效的情况都给其他机器招呼一下，大家都管理一份，这样就不会出现不一致的问题
            - ![](https://p3-tt.byteimg.com/origin/pgc-image/a94ead3997324b24ac73ad59cccdc576)
        - 搞了半天，又回到从前，一个人管理所有session id的情况了，不仅如此，还要抽出时间和几位兄弟同步，把session id搬来搬去，工作量不减反增了。
    - （4）**独立缓存**——Redis
        - session id都统一存在redis里面
        - ![](https://p6-tt.byteimg.com/origin/pgc-image/ea7f5139129c416ab80ca4efb60c2764)
    - （5）**Token时代**
        - Redis也不是万能的，也有崩溃的风险，一崩溃就全完了
        - JWT（JSON Web Token） 技术，硬说让redis来管理保存session id负担太重了，以后不保存了
        - 没有session id，但是换了一个token，用它来识别用户
        - ![](https://p3-tt.byteimg.com/origin/pgc-image/863480eff55a489b879373ff4fb7dcf1)
        - 第一部分是JWT的基本信息，然后把用户的身份信息放在第二部分，接着和第一部分合在一起做一个计算，计算的时候加入了一个只有我们才知道的密钥secretkey，计算结果作为第三部分。最后三部分拼在一起作为最终的token发送给客户端保存着···再收到这个token的时候，就可以通过同样的算法验证前面两部分的结果和第三部分是不是相同，就知道这个token是不是伪造的啦！因为密钥只有我们知道，别人没办法伪造出一个token的！最后确认有效之后，再取第二部分的用户身份信息，就知道这是谁了
        - ![](https://p3-tt.byteimg.com/origin/pgc-image/32c0bd9dfa704f0d808a452106bfa930)
    - JWT：目前有两种实现方式
        - ![](https://img2018.cnblogs.com/blog/1552472/201911/1552472-20191115165339758-1975183863.png)
        - JWS(JSON Web Signature)
            - ![](https://img2018.cnblogs.com/blog/1552472/201911/1552472-20191115161445577-896569505.png)
            - 分成三个部分：
                - 头部（Header）：用于描述关于该JWT的最基本的信息，例如:其类型、以及签名所用的算法等。JSON内容要经Base64 编码生成字符串成为Header。
                - 载荷（PayLoad）：payload的五个字段都是由JWT的标准所定义的。
                    - iss: 该JWT的签发者
                    - sub: 该JWT所面向的用户
                    - aud: 接收该JWT的一方
                    - exp(expires): 什么时候过期，这里是一个Unix时间戳
                    - iat(issued at): 在什么时候签发的
                    - 后面的信息可以按需补充。 JSON内容要经Base64 编码生成字符串成为PayLoad。
                - 签名（signature）：这个部分header与payload通过header中声明的加密方式，使用密钥secret进行加密，生成签名。JWS的主要目的是保证了数据在传输过程中不被修改，验证数据的完整性。但由于仅采用Base64对消息内容编码，因此不保证数据的不可泄露性。所以不适合用于传输敏感数据。
        - JWE(JSON Web Encryption)
            - 相对于JWS，JWE则同时保证了安全性与数据完整性。 JWE由五部分组成：
            - ![](https://img2018.cnblogs.com/blog/1552472/201911/1552472-20191115161640088-1851802272.png)
            - JWE的计算过程相对繁琐，不够轻量级，因此适合与数据传输而非token认证，但该协议也足够安全可靠，用简短字符串描述了传输内容，兼顾数据的安全性与完整性
            - 具体生成步骤为：
                - JOSE含义与JWS头部相同。
                - 生成一个随机的Content Encryption Key （CEK）。
                - 使用RSAES-OAEP 加密算法，用公钥加密CEK，生成JWE Encrypted Key。
                - 生成JWE初始化向量。
                - 使用AES GCM加密算法对明文部分进行加密生成密文Ciphertext,算法会随之生成一个128位的认证标记Authentication Tag。 6.对五个部分分别进行base64编码。
    -  Python实现：PyJWT
    - 详情：[flask项目--认证方案Json Web Token(JWT)](https://www.cnblogs.com/oklizz/p/11414429.html)

```python
import jwt
from jwt import PyJWTError
from datetime import datetime, timedelta

payload = {  # jwt设置过期时间的本质 就是在payload中 设置exp字段, 值要求为格林尼治时间
    "user_id": 1,
    'exp': datetime.utcnow() + timedelta(seconds=30)
}

screct_key = "test"
# 生成token
token = jwt.encode(payload, key=screct_key, algorithm='HS256')
print(token)
# 验签token  返回payload    pyjwt会自动校验过期时间
try:
    data = jwt.decode(token, key=screct_key, algorithms='HS256')
    print(data)
except PyJWTError as e:
    print("jwt验证失败: %s" % e)
```

### flask高并发问题

- 【2021-6-18】[Flask+Gunicorn(协程)高并发的解决方法探究](https://www.toutiao.com/i6735284444271215117), 直接使用flask的python code.py的方式运行，简单但不能解决高并发问题，不稳定，有一定概率遇到连接超时无返回的情况，不能用于生产环境。
  - （1）通过设置app.run()的参数，来达到多进程的效果。但threaded与processes不能同时打开，如果同时设置的话，将会出错
    - app.run(threaded=1, processes=2)
  - （2）使用gevent做协程解决高并发问题
  - （3）通过Gunicorn(with gevent)的形式对app进行包装，从而来启动服务【推荐】
    - 指定进程和端口号： -w: 表示进程（worker） --bind：表示绑定ip地址和端口号（bind） —threads 多线程 -k 异步方案

[image](https://p1-tt.byteimg.com/origin/pgc-image/a8fe60b01ff7415a9ec130d8fcfcae2e?from=pc)

![](https://p1-tt.byteimg.com/origin/pgc-image/9102d29dad204e608f407ef1f84b3922?from=pc)

### 进程、协程和线程

定义
- 进程：操作系统中资源分配/拥有的最小单位
- 线程：操作系统中独立调度的最小单位
  - 线程是操作系统的内核对象，多线程编程时，如果线程数过多，就会导致频繁的上下文切换，这些 cpu时间是一个额外的耗费。
- 协程：非操作系统调度，而是程序猿代码控制
  - 协程在应用层模拟的线程，避免了上下文切换的额外耗费，兼顾了多线程的优点。简化了高并发程序的复杂度。
  - goroutine 就是协程。 不同的是，Golang 在 runtime、系统调用等多方面对 goroutine 调度进行了封装和处理，当遇到长时间执行或者进行系统调用时，会主动把当前 goroutine 的CPU (P) 转让出去，让其他 goroutine 能被调度并执行，也就是 Golang 从语言层面支持了协程。

区别
- 线程之间可以共享内存
- ![](https://p1-tt.byteimg.com/origin/pgc-image/a8fe60b01ff7415a9ec130d8fcfcae2e?from=pc)


### 模板使用


if/for控制语句

前端的Jinja2语法中，if可以进行判断：存在的参数是否满足条件。
- 跟python很像，只是需要添加：大括号+百分号
- ![](https://pic2.zhimg.com/80/v2-7c8b008840b966bee55a1ae71caf5e11_720w.jpg)

```python
from flask import Flask  #导入模块
from flask import render_template

app  = Flask(__name__)

@app.route('/table')  #定义第一页视图
def choice():
    goods = [{'name':'包包', 'price':'500元'}, \
             {'name':'口红', 'price':'300元'}, \
             {'name':'冰淇淋', 'price':'20元'}]
    # locals指定所有变量
    return render_template('goods.html', **locals())

@app.route('/user')
def user():
    user = 'dongGe'
    #user = ['dongGe'] # 列表
    #user = {'name':'dongGe'} # 字典
    return render_template('user.html',user=user)

@app.route('/loop')
 def loop():
    fruit = ['apple','orange','pear','grape']
    return render_template('loop.html',fruit=fruit)

if __name__ == '__main__':
    app.run(debug=True)
```

web页面代码 (为了避开jeklly语法冲突，%号和{中间间用空格隔开，实际使用时去掉！)

```html
 <html>
 <head>
     { % if user % }
        <title> hello {{user}} </title>
        <!-- <title> hello {{user[0]}} </title> -->
        <!-- <title> hello {{user.name}} </title> -->
    { % else % }
         <title> welcome to flask </title>        
    { % endif % }
 </head>

 <body>
     <h1>hello world</h1>
    <ul>
        { % for index in fruit % }
            <li>{{ index }}</li>
        { % endfor % }
    </ul>
  <!-- good.html -->
    <table>
      <thead>
          <th>商品名称</th>
          <th>商品价格</th>
      </thead>
      <tbody>
      { % for good in goods % }
          <tr>
              <td>{{good.name}}    </td>
              <td>{{good.price}}    </td>
          </tr>
      { % endfor % }
      </tbody>
    </table>
  <!-- 临时变量 -->
  { % set links = [
      ('home',url_for('.home')),
      ('service',url_for('.service')),
      ('about',url_for('.about')),
    ] %-}
  <nav>
      { % for label,link in links % }
          <!-- loop获取循环信息，loop.index表示下标, 从1开始 -->
          { % if not loop.first % }|{ % endif % }
          <a href="{ % if link is current_link % }#
          { % else % }
          {{ link }}
          { % endif % }
          ">{{ label }}</a>
      { % endfor % }
  </nav>
 </body>
 </html>
 ```


### 文件上传下载

参考：
- [Python Flask:一个极简的web服务+文件上传](https://xu3352.github.io/python/2018/04/29/python-flask-web-server)
- [Python实现文件上传下载](https://blog.csdn.net/songling515010475/article/details/106409521)，使用socket

步骤
- 限制指定的后缀文件才可以上传
- 上传成功后, 跳转到成功页面
- 成功页面可以再返回上传页面
- 文件上传到指定的目录, 目录需要提前创建好



```python
import os
from flask import Flask, request, redirect, url_for
from werkzeug import secure_filename

UPLOAD_FOLDER = '/tmp/uploads'
ALLOWED_EXTENSIONS = set(['txt', 'pdf', 'png', 'jpg', 'jpeg', 'gif'])

app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1] in ALLOWED_EXTENSIONS

@app.route('/', methods=['GET', 'POST'])
@app.route('/upload/', methods=['GET', 'POST'])
def upload_file():
    if request.method == 'POST':
        file = request.files['file']
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
            return redirect(url_for('upload_success', filename=filename))
    return '''
    <!doctype html>
    <title>Upload new File</title>
    <h1>Upload new File</h1>
    <form action="" method=post enctype=multipart/form-data>
      <p><input type=file name=file>
         <input type=submit value=Upload>
    </form>
    '''

@app.route('/upload_success')
def upload_success():
    return '''
    <!doctype html>
    <title>上传成功</title>
    <h1>上传成功</h1>
    <a href="/upload/">继续上传</a>
    '''

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)
```

另一个上传/下载完整示例

```python
#!/usr/bin/env python3
# -*- coding:utf-8 -*-

import os, sys
from flask import Flask, render_template, request, send_file, send_from_directory

app = Flask(__name__)
BASE_PATH = os.path.dirname(os.path.abspath(__file__))

@app.route("/")
def index():
    # 文件上传页面
    html="""<html>
        <head>
          <title>文件上传测试</title>
        </head>
        <body>
            <form action="/upload" method="POST" enctype="multipart/form-data">
                <input type="file" name="file" multiple="multiple" />
                <input type="submit" value="提交" />
            </form>
        </body>
        </html>"""
    return html

@app.route("/upload", methods=["POST"])
def upload_file():
    try:
        # f = request.files["file"]
        for f in request.files.getlist('file'):
            filename = os.path.join(BASE_PATH, "upload", f.filename)
            print(filename)
            f.save(filename)
        return "file upload successfully!"
    except Exception as e:
        return "failed!"


@app.route("/download/<filename>", methods=["GET"])
def download_file(filename):
    # 下载方法：http://10.200.24.101:8093/download/log.txt
    dir = os.path.join(BASE_PATH, 'download')
    return send_from_directory(dir, filename, as_attachment=True)


def mkdir(dirname):
    dir = os.path.join(BASE_PATH, dirname)
    if not os.path.exists(dir):
        os.makedirs(dir)


if __name__ == "__main__":
    mkdir('download')
    mkdir('upload')
    app.run(host="10.200.24.101", port=8093, debug=False)
```


## Django

【2021-7-16】python为后端，vue为前端的web开发框架整合demo，拿来即用，[django-vue-demo](https://github.com/realjf/django-vue-demo.git)，安装详情：[Django后端 + Vue前端 构建Web开发框架](https://realjf.io/python/django-vue-web/)，覆盖node、mysql、vue等工具包




## [Fastapi](https://github.com/tiangolo/fastapi)

![](https://pic1.zhimg.com/v2-76eee9e74c12fdf22c682fe5475f2ab2_1440w.jpg?source=172ae18b)

- [FastAPI使用小结](https://zhuanlan.zhihu.com/p/136621431)
- [全面拥抱 FastApi — 多应用程序管理蓝图APIRouter](https://zhuanlan.zhihu.com/p/120885265)
- [（入门篇）Python框架之FastAPI——一个比Flask和Tornado更高性能的API 框架](https://zhuanlan.zhihu.com/p/131618992)
- [（进阶篇）Python web框架FastAPI——一个比Flask和Tornada更高性能的API 框架](https://mp.weixin.qq.com/s?__biz=MzU3MzQxMjE2NA==&mid=2247486752&idx=1&sn=0036ae16fe1a80895e2b31d02d1dac84&chksm=fcc34b0bcbb4c21d104541dc28fa1786eafd77072da068b3e8b537a13dbb8f96cb9c643fd6e3&scene=21#wechat_redirect)
- [（完结篇）Python框架之FastAPI——一个比Flask和Tornado更高性能的API 框架](https://zhuanlan.zhihu.com/p/131625459)

### 简介

- FastAPI是一个现代、快速（高性能）的 Web 框架，基于标准 Python 类型提示，使用 Python 3.6+ 构建 API。
- 几点感受：
    - 性能并发更强了，支持异步 async
    - 基于 Pydantic 的类型声明，自动校验参数
    - 自动生成交互式的 API 接口文档
        - Django REST Framework 的主要功能是自动 API 文档。 API 文档有个标准叫 [Swagger](https://swagger.io/) ，用 JSON 或 YAML 来描述。
    - 上手简单，能快速编码
- 主要特征是：
    - 高速：与NodeJS和Go相当，拥有高性能。 现有最快的Python框架之一。
        - 并发性能可以和 NodeJS 以及 Go 相媲美。它是基于Starlette框架, 类似于Starlette 的一个子类。
    - 快速编码：将功能开发速度提高约200％至300％。
    - 更少的Bug：减少约40％的人为（开发人员）导致的错误。
    - 直观：更好的编辑支持。补全任何地方。更少的调试时间。
    - 简单：方便使用和学习。减少阅读文档的时间。
    - 简介：最小化代码重复。每个参数声明的多个要素。更少的错误。
    - 健壮：获取便于生产的代码。带自动交互式文档。
    - 基于标准：基于（并完全兼容）API 的开放标准：OpenAPI（以前称为Swagger）和 JSON Schema。
- [文档](https://fastapi.tiangolo.com)

- 【2021-5-8】问题：严格的参数验证、没有类似flask的全局变量

### 部署

```shell
# 安装
pip install fastapi
pip install uvicorn
pip install gunicorn # 或者
#使用uvicorn启动
uvicorn sql_app.main:app --reload
# 指定host和port
uvicorn main:app --host=0.0.0.0 --port=8800
```

- 访问
    - http://127.0.0.1:8000
    - 打开自动生成的[文档](http://127.0.0.1:8000/docs)：http://127.0.0.1:8000/docs，可以动态传入数据
        - ![](https://picb.zhimg.com/80/v2-27e0a1f1fa58c3fbde1839b010e482ff_720w.jpg)


### 使用

#### 代码示例

```python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
async def index():
    return "Hello world"


@app.get("/items/{item_id}")
async def read_item(item_id: str, q: str = None, short: bool = False):
    item = {"item_id": item_id}
    if q:
        item.update({"q": q})
    if not short:
        item.update(
            {"description": "This is an amazing item that has a long description"}
        )
    return item
```


# 前端

- 【2020-8-22】[微信聊天窗口界面](https://github.com/kuangwk/wechat-chat-interface)
    - ![](https://github.com/kuangwk/wechat-chat-interface/raw/css/screenshot.png)
- 【2020-8-28】[EasyMock](https://www.easy-mock.com/login)[文档](https://easy-mock.com/docs)，[Github地址](https://github.com/easy-mock/easy-mock)，Easy Mock 是一个可视化，并且能快速生成 模拟数据 的持久化服务
    - ![](https://camo.githubusercontent.com/e3e9c378dd2f6d8349922f9e3cb0f7ee095533a9/687474703a2f2f696d672e736f756368652e636f6d2f6632652f33313362333661616137643061336166303837313863333861323836393533342e706e67)
- 【2021-5-13】[机器学习建模与部署--以垃圾消息识别为例](https://kuhungio.me/2019/flask_vue_ml/?utm_source=zhihu&utm_campaign=ml_sys_design#%E5%89%8D%E7%AB%AF-vue), 项目地址 [kuhung/flask_vue_ML](https://github.com/kuhung/flask_vue_ML)
  - ![](https://kuhungio.me/images/flask_vue_ML/flask_vue_ml.jpg)

## 简介


前端三要素
- HTML(结构层) : 超文本标记语言(Hyper Text Markup Language) ，决定网页的结构和内容
- CSS(表现层) : 层叠样式表(Cascading Style sheets) ，设定网页的表现样式。CSS预处理器：
  - ①SASS：基于Ruby，通过服务端处理，功能强大。解析效率稿。需要学习 Ruby 语言，上手难度高于LESS。
  - ②LESS：基于 NodeJS，通过客户端处理，使用简单。功能比 SASS 简单，解析效率也低于 SASS，但在实际开发中足够了，所以后台人员如果需要的话，建议使用 LESS。
- JavaScript(行为层) : 是一种弱类型脚本语言，其源代码不需经过编译，而是由浏览器解释运行,用于控制网页的行为
  - ①原生JS开发，也就是让我们按照【ECMAScript】标准的开发方式，简称是ES,特点是所有浏览器都支持。
  - ②TypeScript是一种由微软开发的自由和开源的编程语言。它是JavaScript的一个超集，而且本质上向这个语言添加了可选的静态类型和基于类的面向对象编程。由安德斯海尔斯伯格（C#、Delphi、TypeScript 之父； .NET 创立者）主导。该语言的特点就是除了具备 ES 的特性之外还纳入了许多不在标准范围内的新特性，所以会导致很多浏览器不能直接支持 TypeScript 语法，需要编译后（编译成 JS ）才能被浏览器正确执行。

【2021-7-21】[Vue快速入门学习笔记(更新ing)](https://www.cnblogs.com/melodyjerry/p/13768594.html)

## js

- 总结
  - [JavaScript基础知识总结笔记](https://blog.csdn.net/weixin_41651627/article/details/79106164)
  - [JavaScript笔记总结](https://blog.csdn.net/weixin_43862596/article/details/109783431)
  - [JS知识点思维导图](https://github.com/daniellidg/javascript-knowhow)

- JavaScript一种直译式脚本语言，一种基于对象和事件驱动并具有安全性的客户端脚本语言；也是一种广泛应用客户端web开发的脚本语言。简单地说，JavaScript是一种运行在浏览器中的解释型的编程语言。

### 运行机制

- 【2020-8-26】[JavaScript运行机制](https://www.toutiao.com/i6748661672522547719/)
- JavaScript语言的一大特点就是单线程，也就是说，同一个时间只能做一件事。那么，为什么JavaScript不能有多个线程呢？这样能提高效率啊。
- JavaScript的单线程，与它的用途有关。作为浏览器脚本语言，JavaScript的主要用途是与用户互动，以及操作DOM。这决定了它只能是单线程，否则会带来很复杂的同步问题。比如，假定JavaScript同时有两个线程，一个线程在某个DOM节点上添加内容，另一个线程删除了这个节点，这时浏览器应该以哪个线程为准？
- 所以，为了避免复杂性，从一诞生，JavaScript就是单线程，这已经成了这门语言的核心特征，将来也不会改变。
- 所有任务分成两种，一种是同步任务（synchronous）
    - 另一种是异步任务（asynchronous）。同步任务指的是，在主线程上排队执行的任务，只有前一个任务执行完毕，才能执行后一个任务；
    - 异步任务指的是，不进入主线程、而进入”任务队列”（task queue）的任务，只有”任务队列”通知主线程，某个异步任务可以执行了，该任务才会进入主线程执行。
        - 异步执行的运行机制如下：(这种运行机制又称为Event Loop（事件循环）)
            - 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
            - 主线程之外，还存在一个”任务队列”（task queue）。只要异步任务有了运行结果，就在”任务队列”之中放置一个事件。
            - 一旦”执行栈”中的所有同步任务执行完毕，系统就会读取”任务队列”，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
            - 主线程不断重复上面的第三步。
        - ![](https://p1-tt.byteimg.com/origin/pgc-image/e508259a15a04b3bbda091e0989390fb?from=pc)

```javascript
console.log(1);
setTimeout(function(){
console.log(3);
},0);
console.log(2);
//请问数字打印顺序是什么？
```

### 基础知识

- JS中的变量的**数据类型**
  - 数据类型有7种： number、boolean、symbol、string、object、undefined、function。null 有属于自己的数据类型 Null
  - String：字符串类型。用""和''包裹的内容，称为字符串。
  - Number：数值类型。可以是小数，也可以是正数。Number可以表示十进制，八进制，十六进制整数，浮点数，科学记数法，最大整数是2^53，BigInt可以表述任意大的整数
  - boolean：真假，可选值true/false。
  - Object：（复杂数据类型）
  - Null：表示为空的引用。var a = null; null表示一个对象不存在，其数据类型为Object
  - Undefined：未定义，用var声明的变量，没有进行初始化赋值。var a; 
    - 声明了但未赋值的变量，其值是 undefined ，typeof 也返回 undefined
    - 任何变量均可通过设置值为 undefined 进行清空。其类型也将是 undefined
    - 空值与 undefined 不是一回事，空的字符串变量既有值也有类型。
- 语句
  - 语句分号（ ；）结尾，大括号包裹语句块（基本与Java语法类似）；严格区分大小写；没有添加分号时浏览器自动添加，但是消耗资源并且可能添加出错
- 类型判断（[js数据类型判断](https://www.cnblogs.com/yadiblogs/p/10750775.html)）
  - typeof(a)
  - toString最完美
  - instanceof
    - instanceof 是用来判断 A 是否为 B 的实例，表达式为：A instanceof B，如果 A 是 B 的实例，则返回 true,否则返回 false。 在这里需要特别注意的是：instanceof 检测的是原型
  - constructor
    - constructor是原型prototype的一个属性，当函数被定义时候，js引擎会为函数添加原型prototype
    - ![](https://img2018.cnblogs.com/blog/1334093/201904/1334093-20190422154822998-1507326377.png)
    - 注意：①null 和 undefined 无constructor，这种方法判断不了。②如果自定义对象，开发者重写prototype之后，原有的constructor会丢失
- 元素遍历, [js数组遍历](https://www.cnblogs.com/woshidouzia/p/9304603.html)
  - 1.for循环： 4个元素的arr， 普通for循环最优雅
    - for(j = 0; j < arr.length; j++) # 循环4次
    - for(j = 0,len=arr.length; j < len; j++) # 循环4次，优化，算一次长度
    - for(j = 0; arr[j]!=null; j++) # 性能弱于上面
  - forin
    - for(a in arr) # 循环5次，末尾是undefine
  - 2.foreach循环
  - 3.map循环
  - 4.forof遍历
    - for(let value of arr) # 需要ES6支持，forin＜性能＜for
  - 5.filter遍历
  - 6.every遍历
  - 7.some遍历
  - 8.reduce
  - 9.reduceRight
  - 10.find
  - 11.findIndex
  - 12.keys，values，entries
- 总结: [JS几种数组遍历方式总结](https://blog.csdn.net/function__/article/details/79555301)
  - ![](https://dailc.github.io/jsfoundation-perfanalysis/staticresource/performanceAnalysis/demo_js_performanceAnalysis_jsarrayGoThrough_1.png)
- [JavaScript基础知识整理](https://zhuanlan.zhihu.com/p/68963487)
- 变量
  - 变量是用于存储信息的"容器"，是命名的内存空间，可以使用变量名称找到该内存空间；
  - JavaScript 的变量是松散类型（弱类型）的，就是用来保存任何类型的数据。在定义变量的时候不需要指定变量的数据类型。
  - JavaScript 定义变量有四种方法：const、let、var，还有一种是直接赋值，比如a = " a"（不规范，不推荐使用）
    - var 定义的变量可以修改，如果不初始化会输出undefined，不会报错。
    - let let是块级作用域，定义的变量只在let 命令所在的代码块内有效，变量需要先声明再使用。
    - const 定义的变量不可以修改，而且必须初始化，const定义的是一个恒定的常量，声明一个只读的常量或多个，一旦声明，常量值就不能改变。
  - 作用域
    - 在函数外声明的变量作用域是**全局**的，全局变量在 JavaScript 程序的任何地方都可以访问；
    - 在函数内声明的变量作用域是**局部**的（函数内），函数内使用 var 声明的变量只能在函数内容访问。
- 对象
  - JavaScript 对象是拥有属性和方法的数据，是变量的容器。对象：是封装一个事物的属性和功能的程序结构，是内存中保存多个属性和方法的一块存储空间。JavaScript中所有事物都是对象：数字、字符串、日期、数组等。JavaScript对象可以是字面量创建、分配给变量，数组和其他对象的属性、
作为参数传递给函数、有属性和作为返回值。
- JS**对象**分为三类：
  - **内置**对象（静态对象）：js本身已经写好的对象，可以直接使用不需要定义它。
    - 常见的内置对象有 Global、Math（它们也是本地对象，根据定义每个内置对象都是本地对象）。
  - **本地**对象（非静态对象）：必须实例化才能使用其方法和属性的就是本地对象。
    - 常见的本地对象有 Object、Function、Data、Array、String、Boolean、Number、RegExp、Error等
  - **宿主**对象：js运行和存活的地方，它的生活环境就是DOM（文档对象模式）和BOM（浏览器对象模式）。
- JavaScript函数
  - 使用函数前要先定义才能调用，函数的定义分为三部分：函数名，参数列表
  - 四种**调用**模式：
    - 函数调用模式（通过函数调用）
    - 方法调用模式（通过对象属性调用）
    - 构造函数模式（如果是作为构造函数来调用，那么this指向new创建的新对象）
    - 函数上下文（借用方法模式：它的this指向可以改变，而前三种模式是固定的）；
    - 函数上下文就是函数作用域；基本语法：apply 和 call 后面都是跟两个参数。）
  - 在javascript函数中，函数的**参数**一共有两种形式：（实际参数与形式参数）
    - **形参**：在函数定义时所指定的参数就称之为“函数的形参”。
    - **实参**：在函数调用时所指定的参数就称之为“函数的实参”。
- this
  - 方法中的this指向调用它所在方法的对象。单独使用this，指向全局对象。函数中，函数所属者默认绑定到this上。
- 闭包
  - 闭包是指有权访问另一个函数作用域中的变量的函数。创建闭包就是创建了一个不销毁的作用域。闭包需要了解的几个概念： 作用域链、执行上下文、变量对象。
- Window
  - 所有浏览器都支持 window 对象。它表示浏览器窗口。所有 JavaScript 全局对象、函数以及变量均自动成为 window 对象的成员。
  - 全局变量是 window 对象的属性。全局函数是 window 对象的方法。
  - 如：Document对象包含当前文档的信息，例如：标题、背景、颜色、表格等，screen，location，history等
- JSON
  - JSON 是一种轻量级的数据交换格式；JSON是独立的语言 ；JSON 易于理解。
- 输出方式
  - document.write()	//向body中写入字符串，输出到页面，会以HTML的语法解析里面的内容
  - cosole.log()	//向控制台输出
  - alert()		//弹出框，会以文本的原格式输出
  - prompt('提示文字'，'默认值') // 输入框---不常用

```JS
myObj =  { "name":"Nya", "age":21, "car":null };
// 访问对象JSON值,嵌套的JSON对象，使用点号和括号访问嵌套的JSON对象
x = myObj.name;
x = myObj["name"];

console.log(typeof null);	//返回object

function demo(){  
	console.log('demo');  
}  
console.log(typeof demo);	// 返回function 
// 分支
var a = 1;
switch(a){
    case 1:
        console.log("1");
        break;
    case 2:
        console.log("2");
        break;
    default:
        console.log("其他");
        break;
}
// for
function p(i){
    document.write(i);
    document.write("<br>");
 }
for(var i = 0; i < 10; i++){
 	 p(i);
 }
// for in
for (x in myObj){
	document.write(myObj[x] + "<br />")
}

//new创建对象
var person = new Person();
person.name = "Nya";
person.age = 21;
person.sex = "男";
//创建了对象的一个新实例，并向其添加了四个属性
//函数创建对象
function person(name, age, sex){
    this.name = name;
    this.age = age;
    this.sex = sex	//在JS中，this通常指向的是我们正在执行的函数本身，或者是指向该函数所属的对象（运行时）
}
//创建对象实例
var myFather = new person("Ton", 51, "男");
var myMother = new person("Sally", 49, "女");
// 返回一个包含所有的cookie的字符串，每条cookie以分号和空格(; )分隔(即key*=*value键值对)：
allCookies = document.cookie;
// 设置高度、宽度
document.write("可用宽度: " + screen.availWidth + '高度：' +screen.availHeight); 
//改变当前网页地址（加载新的网页）：
location.href = 'http://www.baidu.com';
//返回（当前页面的)整个URL：
document.write(location.href);
// 自调用函数，匿名函数
(function () {
    var x = "Hello!!";      // 我将调用自己
})();
//以上函数实际上是一个匿名自我调用的函数(没有函数名)
```

- html示例：
  - 上一页/下一页

```html
<script type="text/javascript"> 
    自己编写的js代码
</script>
<!-- ① 将上面的代码放在<head></head>或者<body></body>之间 -->
<!-- ② 直接保存为js文件，然后外部调用<script type="text/javascript" src="js文件"></script> -->

<input type="button" value="Back" onclick="goBack()">
<script>
	function goBack(){
    	window.history.back()
	}
</script>

<input type="button" value="Forward" onclick="goForward()">
<script>
    function goBack(){
    	window.history.forwardk()
	}
</script>

<!-- 交互事件 -->
<h1 onclick="this.innerHTML='Ooops!'">点击文本!</h1>

<!-- 操作DOM元素，例：向button元素分配onclick事件 -->
document.getElementById("myBtn").onclick=function(){displayDate()};
<!-- 操作style样式 -->
document.getElementsByClassName('box')[0].style.background = 'red';

```

### JavaScript 框架（库）

前端三大框架：Angular、React、Vue
- jQuery: 大家熟知的JavaScript框架，优点是简化了DOM操作，缺点是DOM操作太频繁,影响前端性能;在前端眼里使用它仅仅是为了兼容IE6、7、8。
  - jQuery 函数是 $() 函数（jQuery 函数）。jQuery 库包含以下功能：
  - HTML 元素选取、元素操作、CSS 操作、HTML 事件函数、JavaScript 特效和动画、
  - HTML DOM 遍历和修改、AJAX、Utilities
  - 面向对象编程包括 创建对象、原型继承、class继承。
  - 类是对象的类型模板；实例是根据类创建的对象。
- （1）`Angular`: Google收购的前端框架，由一群Java程序员开发，其特点是将后台的MVC模式搬到了前端并增加了模块化开发的理念，与微软合作，采用TypeScript语法开发;对后台程序员友好，对前端程序员不太友好;最大的缺点是版本迭代不合理(如: 1代-> 2代，除了名字，基本就是两个东西;截止发表博客时已推出了Angular6)。
  - 其最为核心的特性为：MVC、模块化、自动化双向数据绑定、语义化标签及依赖注入等。
- （2）`React`: Facebook出品，一款高性能的JS前端框架;特点是提出了新概念[虚拟DOM]用于减少真实DOM操作，在内存中模拟DOM操作，有效的提升了前端渲染效率;缺点是使用复杂，因为需要额外学习一门[JSX] 语言。
  - React被称为构建用户接口而提供的Javascript库；主要用来构建UI，其专注于MVC的V部分。
- （3）`Vue`:一款渐进式JavaScript框架，所谓渐进式就是逐步实现新特性的意思，如实现模块化开发、路由、状态管理等新特性。其特点是综合了Angular (模块化)和React (虚拟DOM)的优点;。
  - vue.js 是用来构建web应用接口的一个库，技术上，Vue.js 重点集中在MVVM模式的ViewModel层，它连接视图和数据绑定模型通过两种方式。
  - 【2021-10-28】[Vue可视化拖拽编辑工具附源码](https://www.toutiao.com/i7023912492678005262)，拖拽生成vue代码
  - ![](https://p6.toutiaoimg.com/origin/pgc-image/6ca0532facf74b0aac668b0ca44bf132?from=pc)
- Axios :前端通信框架；因为Vue 的边界很明确，就是为了处理DOM，所以并不具备通信能力，此时就需要额外使用一个通信框架与服务器交互；当然也可以直接选择使用jQuery提供的AJAX通信功能。
- D3.js
  - 数据可视化和图表是Web应用中不可或缺的一部分。d3.js就是最流行的可视化库之一，它允许绑定任意数据到DOM，然后将数据驱动转换应用到Document中。

UI框架
- Ant-Design：阿里巴巴出品，基于React的UI框架
- ElementUI、 iview、 ice: 基于Vue的UI框架
- Bootstrap：Twitter推出的一个用于前端开发
- AmazeUI：又叫"妹子UI"，一款HTML5跨屏前端框架

JavaScript构建工具
- Babel: JS编译工具，主要用于浏览器不支持的ES新特性，比如用于编译TypeScript
- WebPack: 模块打包器，主要作用是打包、压缩、合并及按序加载

### JavaScript本地储存

- 【2021-3-23】[JavaScript本地储存有localStorage、sessionStorage、cookie多种方法](https://www.jb51.net/article/197357.htm)
1. **sessionStorage**：仅在当前会话下有效，关闭页面或浏览器后被清除；
  - setItem(key,value) 设置数据
  - getItem(key) 获取数据
  - removeItem(key) 移除数据
  - clear() 清除所有值
2. **localStorage** ：HTML5 标准中新加入的技术，用于长久保存整个网站的数据，保存的数据没有过期时间，直到手动去删除；
  - localStorage和sessionStorage最大一般为5MB，仅在客户端（即浏览器）中保存，不参与和服务器的通信；
  - 主要方法同sessionStorage
3. **Cookie**
  - Cookie 是一些数据, 存储于你电脑上的文本文件中，用于存储 web 页面的用户信息. Cookie 数据是以键值对的形式存在的，每个键值对都有过期时间。如果不设置时间，浏览器关闭，cookie就会消失，当然用户也可以手动清除cookie. Cookie每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题, Cookie内存大小受限，一般每个域名下是4K左右，每个域名大概能存储50个键值对
  - 通过访问document.cookie可以对cookie进行创建，修改与获取。默认情况下，cookie 在浏览器关闭时删除，你还可以为 cookie的某个键值对 添加一个过期时间. 如果设置新的cookie时，某个key已经存在，则会更新这个key对应的值，否则他们会同时存在cookie中
- **总结**
  - 相同点：都保存在浏览器端
  - 不同点
    - ① **传递方式**不同
      - cookie数据始终在**同源http请求**中携带（即使不需要），即cookie在浏览器和服务器间来回传递。
      - sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。
    - ② **数据大小**不同
      - cookie数据还有路径（path）的概念，可以限制cookie只属于某个路径下。
      - 存储大小限制也不同，cookie数据不能超过4k，同时因为每次http请求都会携带cookie，所以cookie只适合保存很小的数据，如会话标识。
      - sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。
    - ③ 数据**有效期**不同
      - sessionStorage：仅在**当前浏览器窗口**关闭前有效，自然也就不可能持久保持；
      - localStorage：**始终有效**，窗口或浏览器关闭也一直保存，因此用作持久数据；
      - cookie只在设置的cookie**过期时间之前**一直有效，即使窗口或浏览器关闭。
    - ④ **作用域**不同
      - sessionStorage不在**不同浏览器窗口**中共享，即使是同一个页面；
      - localStorage 在所有同源窗口中都是共享的；
      - cookie也是在**所有同源窗口**中都是共享的。
      - Web Storage 支持事件通知机制，可以将数据更新的通知发送给监听者。Web Storage 的 api 接口使用更方便。

- 代码

```js
// ============sessionStorage============
// 添加数据
window.sessionStorage.setItem("name","李四")
window.sessionStorage.setItem("age",18)
// 获取数据
console.log(window.sessionStorage.getItem("name")) // 李四
// 清除某个数据
window.sessionStorage.removeItem("gender")
// 清空所有数据
window.sessionStorage.clear()
// ============localStorage============
// 添加数据
window.localStorage.setItem("name","张三")
window.localStorage.setItem("age",20)
window.localStorage.setItem("gender","男")
// 获取数据
console.log(window.localStorage.getItem("name")) // 张三
// 清除某个数据
window.localStorage.removeItem("gender")
// 清空所有数据
window.localStorage.clear()
// ===========cookie==========
// 设置cookie
document.cookie = "username=orochiz"
document.cookie = "age=20"
// 读取cookie
var msg = document.cookie
console.log(msg) // username=orochiz; age=20
// 添加过期时间（单位：天）
var d = new Date() // 当前时间 2019-9-25
var days = 3    // 3天
d.setDate(d.getDate() + days)
document.cookie = "username=orochiz;"+"expires="+d
// 删除cookie （给某个键值对设置过期的时间）
d.setDate(d.getDate() - 1)
console.log(document.cookie)
```

### 异步请求Ajax

- 请求：
  - 同步请求:只有当一次请求完全结束以后才能够发起另一次请求
  - 异步请求:不需要其他请求结束就可以向服务器发起请求
- 向服务器发起请求的时候，服务器不会像浏览器响应整个页面，而是只有局部刷新。它是一个异步请求，浏览器页面只需要进行局部刷新，效率非常的高

## HTML

- 【2020-8-24】Web页面分栏效果实现
    - HTML中Frame实现左右分栏或上下分栏
    - FrameSet中的Cols属性就控制了页面中的左右分篮，相应的rows则控制上下分栏
    - 分栏的比例就有用逗号分开的10，*来确定

```html
<frameset border=10 framespacing=10 cols=”10,*” frameborder="1"   TOPMARGIN="0"  LEFTMARGIN="0" MARGINHEIGHT="0" MARGINWIDTH="0">
  <frame>
 <frame>
</framset>
```

### 下拉框

- 【2021-6-8】下拉框提供选项，触发onchange时间，[示例](https://bbs.csdn.net/topics/270085808)：

```html
<html>
<head>
    <script language="javascript" type="text/javascript">
    function modify(osel){ // 下拉框动作变更通知
        value = osel.options[osel.selectedIndex].text; //text
        alert('你已选择：'+value);
        //sessionStorage.setItem("product", value); // 本地session
        //var product = window.sessionStorage.getItem('product');
    	//content.innerHTML += product;
    }
    function SetIndex(v){
      var s=document.getElementById('selectSS');
      s.selectedIndex=v;
      if(s.onchange)s.onchange();
      //sessionStorage.setItem("product", v);
    }
    </script>
</head>

<body>
  <select id="selectSS" onChange="modify(this)">
        <option value="1">第一项</option>
        <option selected value="2">第二项(默认选中)</option>
        <option value="3">第三项</option>
        <option value="4">第四项</option>
  </select>
  <a href="#" onclick="SetIndex(0)">重置</a>
   
   <div class=content>
   获取的选项内容：
   </div>
</body>
</html>
```

### 输入框提示

HTML5的datalist可以实现[历史消息提示](https://www.cnblogs.com/jacko/p/6034196.html)

```html
<input id="country_name" name="country_name" type="text" list="city" />  
<datalist id="city">  
    <option value="中国 北京">  
    <option value="中国 上海">  
    <option value="中国 广州">  
    <option value="中国 深圳">  
    <option value="中国 东莞">  
</datalist> 

```

## ajax

- [ajax post 请求发送 json 字符串](https://www.cnblogs.com/virgosnail/p/10108997.html)

代码：

```javascript
    $.ajax({
        // 请求方式
        type:"post",
        // contentType 
        contentType:"application/json",
        // dataType
        dataType:"json",
        // url
        url:url,
        // 把JS的对象或数组序列化一个json 字符串
        data:JSON.stringify(data),
        // result 为请求的返回结果对象
        success:function (result) {
            if (200 == result.code){
                alert("启动成功");
            }else{
                alert("启动失败");
            }
        }
    });
```


## node.js

node.js、npm、vue、webpack之间的关系
- **node.js**是javascript运行的环境，以前只能浏览器解析js，现在直接用chrome的v8引擎封装成nodejs，实现js独立于浏览器也可以解析运行
- **npm**，前端依赖包管理器（包含在nodejs中），类似maven，帮助下载和管理前端的包，这个下载源是外国服务器，如果想提高下载速度的话，建议更换成淘宝镜像，类似maven之于阿里云镜像。
- **vue.js** 前端框架，其他大火的前端框架：anjularjs
- **WebPack** webpack能够把.vue后缀名的文件打包成浏览器能够识别的js，而这个.vue文件装换需要打包器vue-loader→npm下载→node包管理工具
  - 可以看做是模块打包机，它做的事情：分析你的项目结构，找到JavaScript模块以及其它的一些浏览器不能直接运行的拓展语言（Scss，TypeScript等），并将其转换和打包为合适的格式供浏览器使用。

## vue

【2021-7-21】[vue学习笔记（超详细）](https://blog.csdn.net/fmk1023/article/details/111381876)


## 低代码平台

- 【2021-11-15】[基于 magic-api 搭建自己的低代码平台](https://www.toutiao.com/i7000242091813126670/)，2021 开年“低代码”成了热门话题，各大云厂商都在加码。

- 阿里推出了易搭，通过简单的拖拽、配置，即可完成业务应用的搭建
- 腾讯则是推出了微搭，通过行业化模板、拖放式组件和可视化配置快速构建多端应用（小程序、H5 应用、Web 应用等），打通了小程序、云函数。
- 低代码开源项目：百度 amis、h5-Dooring 和 magic-api。
  - 百度 amis（前端）：百度 amis 是一套前端低代码框架，通过 JSON 配置就能生成各种后台页面，极大减少开发成本，甚至可以不需要了解前端。
    - ![](https://p9.toutiaoimg.com/origin/pgc-image/f75e701db958418d8a5ecb0a5af497ed?from=pc)
  - [h5-Dooring](http://h5.dooring.cn)（前端）：h5-Dooring，让 H5 制作像搭积木一样简单, 轻松搭建 H5 页面, H5 网站, PC 端网站, 可视化设计。
    - ![](https://p9.toutiaoimg.com/origin/pgc-image/61b16a01a9bc46ae88391a5165c8b3e2?from=pc)
  - magic-api（后端）：magic-api 是一个基于 Java 的接口快速开发框架，编写接口将通过 magic-api 提供的 UI 界面完成，自动映射为 HTTP 接口，无需定义 Controller、Service、Dao、Mapper、XML、VO 等 Java 对象即可完成常见的 HTTP API 接口开发。

# 结束
















