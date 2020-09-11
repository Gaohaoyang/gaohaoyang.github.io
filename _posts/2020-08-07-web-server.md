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


- 解决方法：
    - 参考：
        - [如何配置 flask将session 保存在redis中](https://www.cnblogs.com/wangkun122/articles/9118009.html)
        - [4种分布式session解决方案](https://blog.csdn.net/qq_35620501/article/details/95047642)
        - [分布式session的几种实现方式](https://www.cnblogs.com/daofaziran/p/10933221.html)

- 方案一：客户端存储
    - 直接将信息存储在cookie中
    - cookie是存储在客户端上的一小段数据，客户端通过http协议和服务器进行cookie交互，通常用来存储一些不敏感信息
    - 缺点：
        - 数据存储在客户端，存在安全隐患
        - cookie存储大小、类型存在限制
        - 数据存储在cookie中，如果一次请求cookie过大，会给网络增加更大的开销
- 方案二：session复制
    - session复制是小型企业应用使用较多的一种服务器集群session管理机制，在真正的开发使用的并不是很多，通过对web服务器(例如Tomcat)进行搭建集群。
    - 存在的问题：
        - session同步的原理是在同一个局域网里面通过发送广播来异步同步session的，一旦服务器多了，并发上来了，session需要同步的数据量就大了，需要将其他服务器上的session全部同步到本服务器上，会带来一定的网路开销，在用户量特别大的时候，会出现内存不足的情况
    - 优点：
        - 服务器之间的session信息都是同步的，任何一台服务器宕机的时候不会影响另外服务器中session的状态，配置相对简单
        - Tomcat内部已经支持分布式架构开发管理机制，可以对tomcat修改配置来支持session复制，在集群中的几台服务器之间同步session对象，使每台服务器上都保存了所有用户的session信息，这样任何一台本机宕机都不会导致session数据的丢失，而服务器使用session时，也只需要在本机获取即可
- 方案三：session绑定：
    - Nginx介绍：Nginx是一款自由的、开源的、高性能的http服务器和反向代理服务器
    - Nginx能做什么：反向代理、负载均衡、http服务器（动静代理）、正向代理
    - 如何使用nginx进行session绑定
        - 利用nginx的反向代理和负载均衡，之前是客户端会被分配到其中一台服务器进行处理，具体分配到哪台服务器进行处理还得看服务器的负载均衡算法(轮询、随机、ip-hash、权重等)，但是我们可以基于nginx的ip-hash策略，可以对客户端和服务器进行绑定，同一个客户端就只能访问该服务器，无论客户端发送多少次请求都被同一个服务器处理
    - 缺点：
        - 容易造成单点故障，如果有一台服务器宕机，那么该台服务器上的session信息将会丢失
        - 前端不能有负载均衡，如果有，session绑定将会出问题
    - 优点：
        - 配置简单
- 方案四：session持久化到数据库
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

- 方案五：session复制
    - terracotta实现session复制
    - Terracotta的基本原理是对于集群间共享的数据，当在一个节点发生变化的时候，Terracotta只把变化的部分发送给Terracotta服务器，然后由服务器把它转发给真正需要这个数据的节点。对服务器session复制的优化。

```python
SESSION_TYPE = "redis"

#在settings.py中写上这句话就能够让flask把session写在  redis中去
SESSION_REDIS = Redis(host='192.168.0.94', port='6379')

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
















