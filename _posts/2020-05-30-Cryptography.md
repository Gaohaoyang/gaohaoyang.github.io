---
layout: post
title:  "密码学"
date:   2020-05-30 00:13:00
categories: 密码学
tags: 密码学
excerpt: 密码学知识，常见的加密、解码算法
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 密码学

## 历史

- 古代密码：凯撒密码，20多个罗马字母简单替换，一直用到二战（日本）
![](https://upload-images.jianshu.io/upload_images/2990730-495421d41bf4b8ab.png)
- 艾伦·麦席森·图灵在二战期间主要负责破译德国人的密码系统Enigma，破解密码需要大量的计算，图灵深知工欲善其事必先利其器的道理，于是一台叫作CO-LOSSUS的计算机在1943年被研制出来，后来这种电子计算机总共生产了10台，他们出色完成了密码破译工作。
- 图灵机的诞生确实加快了二战的结束
- 图灵机也就是战胜了对称加密算法。
- 电影《模仿游戏》，影片改编自安德鲁·霍奇斯编著的传记《艾伦·图灵传》

![](https://img-blog.csdn.net/2018061821395310)


## 分类

- 加密算法可以分成三类：`对称加密`算法，`非对称加密`算法和`Hash`算法。
- 注意：
    - Base64编码只是一种编码格式并不是加密算法，它可用于在HTTP环境下传递较长的标识信息。
- 加密算法的选择
    - 对称加密算法不能实现签名，因此签名只能非对称算法。
    - 验证文件或字符一致性用hash算法
    - 数据量大用对称加密算法、小则可以用非对称加密
    - 还可以非对称与对称集成，参考https请求原理
    - RSA建议采用1024位的数字，ECC建议采用160位，AES采用128为即可

### 对称加密

- 1976年以前，所有的加密方法都是同一种模式即对称加密，特点是加密和解密使用相同的密钥

![](https://img-blog.csdn.net/20180618214056767)

- 优点：对称加密算法的优点是算法公开、计算量小、加密速度快、加密效率高。
- 缺点：在数据传送前，发送方和接收方必须商定好秘钥，然后双方保存好秘钥。如果一方的秘钥被泄露，那么加密信息也就不安全了
- 使用场景：本地数据加密、https通信、网络传输等
- 常见算法：AES、DES、3DES、DESX、Blowfish、IDEA、RC4、RC5、RC6


### 非对称加密

![](https://img-blog.csdn.net/20180618214208603)

- 1976年，两位美国计算机学家Whitfield Diffie 和 Martin Hellman，提出了一种崭新构思，可以在不直接传递密钥的情况下，完成解密。这被称为“Diffie-Hellman密钥交换算法”。这个算法启发了其他科学家。人们认识到，加密和解密可以使用不同的规则，只要这两种规则之间存在某种对应关系即可，这样就避免了直接传递密钥。这种新的加密模式被称为”非对称加密算法”。

![](https://img-blog.csdn.net/20180704143158193)

- 优点：非对称加密与对称加密相比其安全性更好
- 缺点：加密和解密花费时间长、速度慢，只适合对少量数据进行加密。
- 使用场景：https会话前期、CA数字证书、信息加密、登录认证等
- 常见算法：RSA、ECC（移动设备用）、Diffie-Hellman、El Gamal、DSA（数字签名用）

### Hash

- Hash算法特别的地方在于它是一种单向算法，用户可以通过Hash算法对目标信息生成一段特定长度的唯一的Hash值，却不能通过这个Hash值重新获得目标信息。因此Hash算法常用在不可还原的密码存储、信息完整性校验等。

![](https://img-blog.csdn.net/20180618214402978)

- 优点：不可逆、易计算、特征化
- 缺点：可能存在散列冲突
- 使用场景：文件或字符串一致性校验、数字签名、鉴权协议
- 常见算法：MD2、MD4、MD5、HAVAL、SHA、SHA-1、HMAC、HMAC-MD5、HMAC-SHA1


## 典型密码

### RSA密码

- 主要概念
    - 欧拉函数
    - 欧拉定理
    - 费马小定理
- RSA密码诞生

![](https://upload-images.jianshu.io/upload_images/2990730-1e446769f7fd0fa2.png)

## 资料

- [常见加密算法简介](https://blog.csdn.net/u014044812/article/details/80723009)
- [RSA原理探究](https://www.jianshu.com/p/ca659dbc6f46)
- [RSA算法基础详解](https://www.cnblogs.com/hykun/p/RSA.html)
- [密码学入门总结](https://www.jianshu.com/p/a8070920810d)
- [密码学 2015版（斯坦福大学）](https://www.bilibili.com/video/BV1wt411V79d)

<iframe src="//player.bilibili.com/player.html?aid=59014949&bvid=BV1wt411V79d&cid=102869806&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="600" width="100%"> </iframe>

- [MIT密码学 MIT 6.875, Cryptography Sp 2018](https://www.bilibili.com/video/BV1qt411L74p)
<iframe src="//player.bilibili.com/player.html?aid=58961353&bvid=BV1qt411L74p&cid=102774363&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="600" width="100%"> </iframe>

- [《模仿游戏》人工智能之父阿兰图灵的一生](https://www.bilibili.com/video/BV1fW411F7AM)
<iframe src="//player.bilibili.com/player.html?aid=25026545&bvid=BV1fW411F7AM&cid=42296927&page=1" scrolling="no" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="600" width="100%"> </iframe>

# 结束


