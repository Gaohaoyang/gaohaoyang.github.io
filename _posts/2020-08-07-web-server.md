---
layout: post
title:  "Web服务知识-Web-Serving"
date:   2020-08-07 19:17:00
categories: 技术工具
tags: Web Python Flask Django Fastapi Restful Swagger HTML JavaScript
author : 鹤啸九天
excerpt: Web开发相关技术知识点
mathjax: true
---

* content
{:toc}

# 总结

- ![](https://raw.githubusercontent.com/woaielf/woaielf.github.io/master/_posts/Pic/1611/161115-1.png)



# HTTP

- HTTP常见的方法：
    - GET：浏览器告知服务器：只 获取 页面上的信息并发给我。这是最常用的方法。
    - POST：浏览器告诉服务器：想在 URL 上 发布 新信息。并且，服务器必须确保 数据已存储且仅存储一次。这是 HTML 表单通常发送数据到服务器的方法。
    - PUT：类似 POST 但是服务器可能触发了存储过程多次，多次覆盖掉旧值。你可 能会问这有什么用，当然这是有原因的。考虑到传输中连接可能会丢失，在 这种 情况下浏览器和服务器之间的系统可能安全地第二次接收请求，而 不破坏其它东西。因为 POST 它只触发一次，所以用 POST 是不可能的。
    - DELETE：删除给定位置的信息。


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



# API

- API(application programming interfaces)，即应用程序编程接口。API由服务器（Server）提供（服务器有各种各样的类型，一般我们浏览网页用到的是web server，即网络服务器），通过API，计算机可以读取、编辑网站数据，就像人类可以加载网页、提交信息等。通俗地，API可以理解为家用电器的插头，用户只提供插座，并执行将插头插入插座的行为，不需要考虑电器内部如何运作。从另外一个角度上讲API是一套协议，规定了与外界的沟通方式：如何发送请求和接受响应。

## 理解RESTful API

- RESTful API即满足RESTful风格设计的API，RESTful表示的是一种互联网软件架构(以网络为基础的应用软件的架构设计)，如果一个架构符合REST原则，就称它为RESTful架构。RESTful架构的特点：
- 每一个URI代表一种资源；
- 客户端和服务器之间，传递这种资源的某种表现层；把"资源"具体呈现出来的形式，叫做它的"表现层"（Representation）。比如，文本可以用txt格式表现，也可以用HTML格式、XML格式、JSON格式表现，甚至可以采用二进制格式；图片可以用JPG格式表现，也可以用PNG格式表现。
- 客户端通过四个HTTP动词，四个表示操作方式的动词：GET、POST、PUT、DELETE。它们分别对应四种基本操作：GET用来获取资源，POST用来新建资源（也可以用于更新资源），PUT用来更新资源，DELETE用来删除资源。


# Python Web框架

- 参考：[Python Web服务器并发性能测试](https://blog.csdn.net/bandaoyu/article/details/88546515)

Python 常见部署方法有 ：
- `fcgi` ：用 spawn-fcgi 或者框架自带的工具对各个 project 分别生成监听进程，然后和 http 服务互动
- `wsgi` ：利用 http 服务的 mod_wsgi 模块来跑各个 project(Web 应用程序或框架简单而通用的 Web 服务器 之间的接口)。
- `uWSGI` 是一款像 php-cgi 一样监听同一端口，进行统一管理和负载平衡的工具，uWSGI，既不用 wsgi 协议也不用 fcgi 协议，而是自创了一个 uwsgi 的协议，据说该协议大约是 fcgi 协议的 10 倍那么快。

其实 WSGI 是分成 server 和 framework (即 application) 两部分 (当然还有 middleware)。

严格说 WSGI 只是一个协议, 规范 server 和 framework 之间连接的接口。

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


## web框架对比

- Python web框架的性能响应排行榜
    - 从并发性上看Fastapi完全碾压了 Flask (实际上也领先了同为异步框架的tornado 不少)
    - ![](https://pic4.zhimg.com/80/v2-7e31e8992685cc11594c5c31a65bc357_720w.jpg)


## Flask

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
    res = '{{"obj": {} }}'.format(res.to_json(orient = "records", force_ascii = False))
    # 方法二
    # res = jsonify({"obj":res.to_json(orient = "records", force_ascii = False)})
    
    return res
```


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

- 实践
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

from flask import Flask, request, render_template
#from flask_restplus import Api
from flasgger import Swagger, swag_from

app = Flask(__name__)
# swagger api封装，每个接口的注释文档中按照yaml格式排版
Swagger(app)

@app.route('/')
#@app.route("/index",methods=["GET","POST"])
#@app.route("/index/<int,>")
def hello_world():

    """
    API说明
    副标题（点击才能显示）
    ---
    tags:
      - 自动生成示例
    parameters:
      - name: language
        in: path
        type: string
        required: true
        description: 变量含义
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

- 【2020-8-26】页面测试功能对POST无效，传参失败
    - 已提交issue：[Failed to get parameters by POST method in “try it out” feature](https://github.com/flasgger/flasgger/issues/428)


### 全局变量

- 参考: [Flask 上下文全局变量](https://www.jianshu.com/p/dfe1ee1dc1ec)
- Flask 在分发请求之前激活(或推送)程序和请求上下文，请求处理完成后再将其删除。程 序上下文被推送后，就可以在线程中使用 current_app 和 g 变量。类似地，请求上下文被 推送后，就可以使用 request 和 session 变量。如果使用这些变量时我们没有激活程序上 下文或请求上下文，就会导致错误。

|变量名|	上下文|	说明|
|---|---|---|
|current_app	| 程序上下文|	当前激活程序的程序实例|
|g	|程序上下文	| 处理请求时用作临时存储的对象，每次请求都会重设这个变量|
|request	| 请求上下文|	请求对象，封装了客户端发出的HTTP请求中的内容|
|session	| 请求上下文|	用户会话，用于存储请求之间需要记住的值的词典|

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


## Django



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


## js

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



# 结束
















