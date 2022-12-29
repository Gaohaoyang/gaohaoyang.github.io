---
layout: post
title:  "计算机图形学 - Computer Graphic"
date:   2022-09-28 09:03:00
categories: 计算机基础 计算机视觉
tags: 图形学 opengl webgl three.js 游戏 vtk
excerpt: 计算机图形学及相关应用
mathjax: true
permalink: /graphic
---

* content
{:toc}


# 总结

- 图形 + 数学 + 体系结构 + 操作系统 + 软件工程 + 设计模式 + 编译原理 + (C++功力) ≈ 更好的3D 软件工程师

## WebGL，OpenGL和OpenGL ES

OpenGL作为一个规范/接口告诉驱动如何和 GPU 通信，发展至今嵌入式设备崛起，OpenGL ES 也应运而生，WebGL 是基于 OpenGL ES 可以让其在浏览器上通过 Javascript 调用的规范/接口，但 WebGL 门槛不低，要和GPU通信，就需要了解计算机图形学知识，那肯定也需要用到着色器，所以 Three.js 封装好成为三维引擎，也不用知道那么多底层知识，就可以创建 Web 3D。

OpenGL ES可以说是OpenGL为了满足嵌入式设备需求而开发一个特殊版本，是其一个子集；而WebGL，是为了网页渲染效果，将JavaScript和OpenGL ES 2.0结合在一起，通过增加OpenGL ES 2.0的一个JavaScript绑定得到。基本关系如[图](https://img-blog.csdnimg.cn/20200828172505903.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3FxXzIzMDM0NTE1,size_16,color_FFFFFF,t_70)
- 实际应用过程中，前端的WebGL是通过JS语句，操作本地的OpenGL的部分接口，对于移动设备这是操作OpenGL ES的接口，来实现页面的图形的渲染，WebGL只是绑定外面接口的一层，内部的一些核心内容，如着色器，材质，灯光等都是需要借助GLSL ES语法来操作的。

[WebGL，OpenGL和OpenGL ES三者的关系](https://blog.csdn.net/qq_23034515/article/details/108283747)
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TIjrlHx4QVO7yC~noop.image)

# 计算机图形学

## 介绍

- 【2022-12-29】[计算机图形学学习笔记（一）：图形学概论](https://zhuanlan.zhihu.com/p/331804333)
- [速通计算机图形学基础](https://zhuanlan.zhihu.com/p/539347633)

### 图形图像的区别

图形图像的区别
- 说法一：图形是由计算机绘制而成的，而图像则是人为的用外部设备所捕捉到的外部景象。
- 说法二：图形是**矢量图**，而图像是**位图** (点阵图)

### 什么计算机图形学

计算机图形学
- 计算机图形是计算机产生的图像。
- 计算机图形学就是研究如何在计算机中表示图形、以及利用计算机进行图形的计算、处理和显示的相关原理和算法。
- IEEE定义：Comput graphics is the art or science of producing graphical images with the aid of computer.

计算机图形学的发展和应用在某种意义上已成为计算机软、硬件发展水平的标志。


### 位图和矢量图定义

位图 (点阵图)
- 点阵图或像素图，计算机屏幕上的图是由屏幕上的像素构成的，每个点用二进制数据来描述其颜色与亮度等信息。

矢量图
- 面向对象的图形或绘图图形，是用数学方式描述的曲线及曲线围成的色块制作的图形。
- 矢量文件中的图形元素称为对象。每个对象都是一个自成一体的实体，它具有颜色、形状、轮廓、大小和屏幕位置等属性。

位图和矢量图区别

（1）存储方式：
- 点阵文件存储图的各个像素点的位置信息、颜色信息以及灰度信息。
- 矢量文件是用数学方程、数学形式对图形进行描述，通常使用图形的形状参数和属性参数来表示图形。
- 因此，点阵文件存储空间比矢量文件大。

（2）缩放
- 点阵文件与分辨率有关，即在一定面积的图像上包含有固定数量的像素。
- 矢量图形与分辨率无关，可以将它缩放到任意大小和以任意分辨率在输出设备上打印出来，不会影响清晰度。

（3）存储格式
- 位图存储格式：BMP、TIFF、GIF、JPEG、PNG
- 矢量图存储格式：DXF、SVG、EPS、WMF、EMF

总结
- ![](https://pic2.zhimg.com/80/v2-a2687e34c4b14d17860b779c24099c45_720w.webp)

### 图形 (像) 的构成属性

几何属性
- 刻画对象的轮廓、形状。包括点、线、面、体等。

非几何属性
- 视觉属性，刻画对象的颜色、材质等。包括明暗、色彩、纹理、透明性、线型、线宽。

从构图要素上看，将图形分为两类
- 几何属性有突出作用：工程图、等高线地图、曲面的线框图
- 非几何属性有突出作用 (明暗图)：真实感图形

### 研究内容

主要研究内容
- 如何在计算机中表示图形、以及利用计算机进行图形的计算、处理和显示的相关原理与算法，构成了计算机图形学的主要研究内容。

计算机生成一副表示物体的图形的三个步骤
- （1）造型技术
  - 在计算机中建立所要生成图像的物体的模型，即给出表示该物体的几何数据和拓扑关系
  - 比如教室里的桌子、椅子、墙，用圆柱、平面等表示出来。
- （2）光照模型
  - 希望用一些简单的数学模型来近似、代替那些物理学的模型，为模拟物体表面的光照物理现象的数学模型叫光照模型。
- （3）绘制（渲染）技术
  - 选择适当的绘制算法来把这个场景画 (渲染) 出来。
  - 绘制一幅三维物体图像所涉及的知识，实际上就是计算机图形中每个像素看上去应该是什么颜色的问题。

## 发展历史

发展历史
- 1950年，第一台图形显示器作为美国麻省理工学院 (MIT) 旋风 I 号计算机的附件诞生。
- 1963年，Suther land 发表博士论文。其中第一次提出了 graphics 这个词。 Suther land 被公认为开创交互式图形技术的奠基人，被称为 "计算机图形学之父"，并于 1988 年获 "图灵奖"。
- 1962年，雷诺汽车公司的工程师 Bezier 提出 Bezier 曲线、曲面的理论，成为 CAGD (计算机辅助几何设计) 的先驱。
- 1964年，MIT教授 Steven A. Coons 提出了超限插值的新思想，通过插值四条任意的边界曲线来构造曲面。
- 70年代，光栅显示器出现了。光栅显示器屏幕是由像素组成的，由此诞生了大量算法，如区域填充、裁剪、消隐等基本图形概念、及其相应算法。真实感图形和几何造型技术这个时候也开始出现了。
- 1975年，Phong 提出了著名的简单光照模型 - Phong模型 (标志着真实感图形的出现和实用化，直到现在 Phong 模型还被大量的采用)
- 1980年，Whitted 提出了光透视模型 - Whitted 模型，成为第一次提出光线跟踪算法的范例。

几何造型技术：通俗地讲，该技术就像小孩搭积木，用简单的一些体素来构建复杂的模型。

![img](https://pic1.zhimg.com/80/v2-8c31b465e2d3ef3d861986bd51115f68_720w.webp)

计算机图形的发展方向
- 准确性 -> 真实性 -> 实时性


### 计算机图形系统组成

五大功能
- 一个交互式计算机图形系统应具有计算、存储、对话、输入和输出等 5 个方面的功能。
- ![img](https://pic2.zhimg.com/80/v2-41fdde6e66ff65e6445c572f67d86e0d_720w.webp)

图形系统

（1）图形软件
- 图形应用数据结构：对应一组图形数据文件，其中存放着欲生成的图形对象的全部描述信息。
- 图形应用软件
  - 解决某种应用问题的图形软件，是图形系统中的核心部分，包括了各种图形生成和处理技术。如：photoshop、3Dmax等。
- 图形支撑软件：大多数图形应用程序是建立在一定的图形支撑软件上。图形支撑软件需具有规范接口。

（2）图形硬件


#### 图形显示设备
  
  - 阴级射线管
    - 使用广泛：现在的图形显示设备绝大多数是基于阴极射线管 (CRT) 的显示器。
  - 阴极射线管的技术指标
    - 分辨率：一个阴极射线管在水平和垂直方向单位长度上能识别出的最大光点数称之为分辨率。光点亦称之为像素 (pixel)。
  - 显示速度
    - 要保持荧光屏上有稳定的图像就必须不断地发射电子束。只有刷新频率高到一定值后，图像才能稳定显示。大约达到每秒 60 帧即 60Hz 时，人眼才能感觉到屏幕不闪烁，要人眼觉得舒服，一般必须有 85Hz 以上的刷新频率。
  - 彩色阴极射线管
    - 三只电子枪，分别涂有红、绿、蓝三种颜色的光。
- CRT图形显示器
  - 随机扫描的图形显示器 (画线设备)
    - 电子束的扫描轨迹随显示内容而变化，只在需要的地方扫描，而不必全屏扫描，因此速度快，图像清晰。一条线一条线地画图，因此也称为向量显示器。
    - 随机扫描系统是为画线应用设计的，因此不能显示逼真的有阴影场景。
  - 光栅扫描显示器 (画点设备)
    - 不能直接从一个可编地址的像素画一条直线到另一个可编地址的像素，只可能用尽可能靠近这条直线路径的像素点来近似地表示这条直线。
    - 在光栅扫描系统中，电子束横向扫描屏幕，一次一行，从上到底顺次进行。当电子束横向沿每一行移动时，电子束的强度不断变化来建立亮点的图案。
    - 由于光栅扫描系统具有存储每一个屏幕点亮度信息的能力，所以，最适合显示浓淡和色彩图形。

## 基础知识

- 光栅图形学
- 扫描转换、区域填充、裁减、反走样、消隐
- 二维、三维图形变换及观察

几何造型
- 参数曲线曲面基本概念、Bezier曲线曲面、B样条曲线等

真实感图形学
- 颜色模型、简单光照模型、纹理映射、光线跟踪

### 图形学相关概念

分辨率
- 光点：光点指电子束打在显示器荧光屏上，显示器能够显示的最小的发光点，一般用其直径来表明光点的大小。

像素点
- 像素点是指图形显示在屏幕上时候，按当前的图形显示分辨率所能提供的最小元素点。

屏幕分辨率
- 屏幕上显示的像素个数，以 (水平像素数 * 垂直像素数) 表示。

显示分辨率
- 计算机显示控制器所能够控制的显示模式分辨率，简称显示模式。
- 对于文本显示方式，显示分辨率用水平和垂直方向上所能显示的字符总数的乘积来表示。
- 对于图形显示方式，则用水平和垂直方向上所能显示的像素点总数的乘积来表示。

显卡分辨率
- 显卡分辨率就是表示显卡输出给显示器，并能在显示器上描绘像素点的数量。
- 一台电脑的最高分辨率是由显卡和显示器共同决定的。显示器最高分辨率是可以显示出来的最大分辨率。显卡的最大分辨率是最大能支持多少分辨率。
- 电脑的最高分辨率取决于显卡和显示器最低的一个。

显示器的点距
- 指相邻像素点之间的距离。两点之间的距离越小越好。
- 15寸显示器，点距达到0.28mm就足够。17寸显示器，需要0.27mm、0.25mm等。

液晶显示器的显示原理
- 液晶的电光效应：当液晶分子的某种排列状态在电场作用下变为另一种排列状态时，液晶的光学性质随之改变。
- 液晶显示的机理是通过能阻塞或传递光的液晶材料，传递来自周围的或内部光源的偏振光。
- 观察方向——>垂直偏转板→垂直网格线→液晶层----->水平网格线——>水平偏转板——>反射层

显示卡的作用与性能指标
- 显示卡的基本作用就是显示图文，显示卡和显示器构成了计算机的显示系统。
- 除了CPU和内存外，显卡对计算机的显示性能起着决定性的作用。

### 【渲染管线】

可编程渲染管线的流程

顶点数据
- 摄像机位置------>顶点着色器（进入几何阶段）1------>几何、曲面细分着色器1------>裁剪2------>屏幕映射3------>三角形设置3

光照纹理
- （进入光栅化阶段）------>三角形遍历3------>片元着色器1------>片元操作2------>帧缓存
- 1可编程 2可配置 3固定

输顶壳曲域，几流光像输
- 0、计算着色阶段：
  - 对GPU资源进行全局、通用的读写操作
- 1、输入装配阶段
  - 将顶点和索引数据装配成基本类型数据（图元）
  - 图元拓扑：告知D3D如何用顶点数据装配图元
- 2、顶点着色阶段
  - 对每个顶点单独处理，进行MVP变换（model、view、projection）、可以设置颜色
- 3、外壳着色阶段
  - 将模型的单个表面分成多个三角形
- 4、曲面细分阶段
  - 硬件处理，将大域细分为许多小域
- 5、域着色阶段
  - 计算每个新域对应的顶点位置
- 6、几何着色阶段
  - 可以生成新的图元或删减图元
  - 绘制billboard：可以输出多个顶点
  - 程序决定流输出（最多四个流输出对象可以被设置）or光栅化
- 7、流输出阶段
  - 顶点信息回流到顶点缓冲区，重新走一遍渲染管线
  - 设备上下文有方法可以获取到从流输出阶段过来的顶点，可以用来绘制分形的雪花，每次绘制的顶点数是上次的4倍
- 8、光栅化阶段
  - 进行透视除法和viewport变换，剔除不可见的顶点，图元转为片元
  - 光栅器：在MVP后的屏幕空间，给定屏幕宽高和图元信息，光栅器将遍历所有图元做透视除法变到NDC空间，再做viewport变换变换到屏幕空间，为每个像素通过插值生成片元
  - 片元和像素的区别：片元 >> 测试与混合 >> 像素
- 9、像素/片元着色阶段（可编程）
  - 像素着色是dx的，片段着色是opengl的
  - 处理局部光照模型A+D+S
  - 反射、阴影
- 10、输出合并
  - 进行透明混合、模板测试、深度测试，产生最终画面
  - 模板测试：模板值具有屏蔽的作用，用于控制绘制的区域，使屏幕上某些区域可画，某些区域不可画。 ​
  - 深度测试：对同一个位置的片段进行深度测试，选择离摄像机最近的片段进行绘制 ​
  - 透明混合/alpha混合：将透明物体和其后面的物体进行片段颜色混合，实现透明的效果

### 【变换】

坐标系与变换矩阵
- 1、local space/object space模型空间
  - 绕自身坐标系旋转时矩阵是右乘
- 2、model模型变换 >> world space世界空间
  - SRT矩阵
  - 绕世界坐标系旋转时矩阵是左乘
- 3、view视图变换 >> view space相机空间/视图空间
  - 视图变换：移动全部物体使摄像机位于世界坐标原点，摄像机朝z轴正方向
  - 相机空间：原点在摄像面中心
- 4、projection投影变换 >> clip space裁剪空间
  - 正交投影变换：视锥体是长方体，由缩放+平移得到变换矩阵
  - 透视投影变换：视锥体是四棱锥，利用远平面和近平面的相似性（相似比是2个z值的比），将视锥体变为正交后，用正交投影的方法处理
- 5、透视除法 >> NDC标准化设备坐标
  - 透视除法：将w分量转为1
  - 最后坐落在\[-1, 1\]^3的这个经典立方体里面去
- 6、viewport视口变换 >> screen space屏幕空间
  - 从经典的标准立方体到\[0,width\] \[0,height\]的变换，剔除z轴

基础变换矩阵
- 缩放矩阵
- 旋转矩阵
- 平移矩阵
- warping
- 欧氏变换：不变长度夹角体积
- 相似变换：不变体积比
- 仿射变换：不变体积比、平行性；特点：长度角度变，比例不变；仿射变换 = 线性变换 + 平移；线性变换：旋转、缩放、切变；切变：y轴倾斜，矩形变平行四边形
- 射影变换：不变相交性

引入齐次坐标作用
- 平移不是线性变换
- 旋转和缩放是矩阵相乘，但平移却是矩阵相加
- 引入齐次坐标的目的主要是合并矩阵运算中的乘法和加法

分量w意义
- w为0表示向量，w为1表示点

点与点分量相减可得向量

左乘 VS 右乘
- 外左内右
- 左乘（变换矩阵坐标矩阵）：绕世界坐标系旋转（外旋），多矩阵左乘时运算要加括号；MVP是左乘，因为M中的Rotate是外旋
- 右乘（坐标矩阵变换矩阵）：绕自身坐标系旋转（内旋）；世界空间to模型空间unity_WorldToObject做反M，是内旋

TBN矩阵
- 1、局部normal ,经过 TBN 矩阵变换，变成世界坐标下的一个方向向量；
- 2、和TBN矩阵和NormalMap结合，计算某个点在世界坐标系下的法线方向

### 【光栅化】

光栅器
- 在MVP后的屏幕空间，给定屏幕宽高和图元信息，光栅器将遍历所有图元做透视除法变到NDC空间，再做viewport变换变换到屏幕空间，为每个像素通过插值生成片元

片元判定
- Bresenham算法绘制直线

片元插值
- 普通线性插值
- 透视矫正插值（原因：从view空间到屏幕空间发生了非线性的变换，包括视口变换和非线性的透视除法两部分）

滤波filter
- 滤波用于抹去指定的频率
- 高通滤波：抹除低频，再通过逆傅里叶变换转换为图像空间时，能看见图片的色差边界
- 低通滤波：抹除高频，再通过逆傅里叶变换转换为图像空间时，能看见图片的模糊化

高频信息对应图像的色差边界

反走样
- 用离散量表示连续量引起的锯齿状失真，称为走样
- 频率越高的函数，我们通过相对低频的采样点还原得到的函数 偏差就越大

个人理解：
- 边缘的片元属于高频信息，分辨率（采样点的数量）属于采样的速度

抗锯齿
- 1、非加权区域采样：根据不同颜色覆盖率计算像素颜色
- 2、加权区域采样：像素亮度正比于线到像素中心点的距离
- 3、MSAA（MultiSampling Anti-Aliasing）：找出在边缘走样的像素，并四等分这些像素，每个大像素通过计算可得到25%、50%、75%、100%的信息
- 4、SSAA（Super Sampling Anti-Aliasing）：四等分屏幕的所有像素
- 5、FXAA：与采样无关，直接跳过抗锯齿渲染出有锯齿的图形，找到有锯齿的边界，直接替换成无锯齿边界
- 6、TAA：把采样的样本分布到时间上的方法

傅里叶级数展开
- 任何周期函数都可以写作一系列正弦余弦函数的线性组合
- 傅立叶级数展开是针对周期性函数的，傅里叶变换是针对非周期性函数

傅里叶变换
- 通过公式把图像从图像空间（时域）转换到频率空间（频域）

即使用离散信号拟合成给定的三角函数

### 【光照】

光照模型分类
- 算法理论：基于物理理论的（物理的度量和统计方法）、基于经验模型的（特定的概率公式）
- 使用角度：局部光照模型（分解光照的种类，计算时只考虑其中的一种）、全局光照模型（考虑到所有的光照种类，一套算法涵盖所有的光照，计算量大）

环境光Ambient
- 闫令琪：由于太过复杂，环境光一般设置为一个常数
- 最终颜色= la ⊗ ma
- 其中环境光颜色向量为la，物体材质对环境光的反射颜色向量为ma

Lambert模型
- diffuse = max(NdotL, 0)
- 最终颜色 = ld ⊗ (md/k)
- ⊗表示各个分量(r,g,b,a)相乘，漫反射光颜色向量为ld，物体材质对漫反射光的反射颜色向量为md，k通过朗伯余弦定理求出

Phong模型
- specular = pow(max(VdotR, 0)),shininess)
- 为什么用pow？为了可以控制高光范围

Blinn-Phong模型
- H = normalize(L + V)
- specular = pow(max(NdotH, 0), shininess);

局部光照模型的升级弥补
- 1、IBL光照： 基于图像的环境光渲染，用于提高环境光颜色和强度的分布 和 镜面反射效果
- 2、SSAO：基于屏幕空间的环境光遮挡计算，用于提高光照的体积感
- 3、SSR：基于屏幕空间的反射计算，用于模拟增强反射效果，和IBL光照效果搭配使用
- 4、VXGI：基于场景的低精度全局光效果计算

光线追踪算法的主要思想
- 1、光线投射：从每一个像素射出一条射线，然后找到最接近的物体挡住射线的路径，而视平面上每个像素的颜色取决于从可见光表面产生的亮度。
- 2、加上光线追踪

在光线投射的基础上，加入光与物体表面的交互，让光线在物体表面沿着反射、折射等方式上继续传播，直到与光源相交。
- 从视点向成像平面上的像素发射光线，找到与该光线相交的最近物体的交点。如此递归下去，直到达到结束条件（光线与光源相交、逃逸出场景或者达到设定的最大递归深度）
- ![](https://pic1.zhimg.com/80/v2-872a5f266bd13efeccf784b3043ec230_720w.webp)

简单光线追踪过程
- 1、对每个屏幕像素，由摄像机向场景中发射一条光线。
- 2、对每条光线，一直追踪到它碰到某物体表面。
- 3、对每个与表面相交的点，向光源发出一条影子探测光线，来查看是否每个光源都可见，并依此来对该像素点着色（此时已知V、N、L）。
- 4、如果相交的表面材质是漫反射的就停止①； 如果相交的表面材质是镜面反射/折射的，则根据物理中反射或折射原理计算得出镜面反射/折射方向并发射一条新的光线。
- 5、重复1到4，直到达到设定的最大追踪深度，或者碰到光源，或者碰到漫反射表面。

①（这里优化看pathTracing）

Whitted-Style复杂模型
- 考虑了折射
- 存在问题：只体现镜面反射，没有考虑漫反射，没有考虑粗糙度对反射角的影响

Path Tracing
- 作用：解决了Whitted-Style模型的问题

Path Tracing之蒙特卡洛积分
- 作用：解决了渲染方程积分不好求的问题
- 原理：在积分域内随机采样，求得多个小长方形的面积，从而推算出近似的定积分

Path Tracing之俄罗斯轮盘赌
- 如果光线被强行停止在某次弹射，那么丢失的能量去哪了呢？
- 作用：解决了递归不停止的问题
- 原理：自定义一个超参P[0,1]，P概率递归，1-P概率不递归

新问题：看上去递归次数少了，总体会变暗，怎么解决？
- 答：不用解决，每次的取值的期望值是Lo/P，新递归的单位面积光通量Lo/P * P + 0 * (1-P) = Lo，很神奇吧，最终的期望依旧是Lo

raymarching光线行进
- 整个场景是用sceneSDF（范围[-1,1]）来定义的

```c++
float depth = start;
for (int i = 0; i < MAX_MARCHING_STEPS; i++) {
    float dist = sceneSDF(eye + depth * viewRayDirection);
    if (dist < 0.0001) {
        // We're inside the scene surface!
        return depth;
    }
    // Move along the view ray
    depth += dist;

    if (depth >= 设定的最大距离) {
        // Gone too far; give up
        return end;
    }
}
return end;
```

### 【深度】

深度测试ZTest
- 对同一个像素位置的所有片元进行深度测试，选择深度值最低（离摄像机最近）的片元作为最终像素进行绘制

深度写入ZWrite
- 决定是否将该片元的深度写入深度缓冲区中

透明混合alpha blending
- 1、要十分小心物体的渲染顺序
- 2、关闭该半透明对象的ZWrite：防止被挡住的不透明物体被ZTest剔除
- 3、开启对该半透明对象的ZTest：如果该半透明对象比深度缓冲区中的片元更远，就不做混合操作（因为不透明是可以挡住透明的）

其中一种公式：
- R = alpha*R(B)+(1-alpha)*R(A)
- G = alpha*G(B)+(1-alpha)*G(A)
- B = alpha*B(B)+(1-alpha)*B(A)

透明测试alpha test
- 一个像素的alpha太小的话，那么它就会被片元着色器discard

ZTest、ZWrite全开

z-fighting
- 场景中离视点较远的物体会有闪烁的现象

原因：
- 1、离视点较远的物体a和b位置较近，深度测试时有时a片段通过有时b片段通过，导致交替显示
- 2、透视除法导致离视点越近的物体片段深度值越精确，离视点距离越远的物体片段深度值越不精确

解决方法：
- 1、最简单也是最实际的。永远不要让两个物体太过靠近。
- 2、更远的近平面和更近的远平面。这意味着在Zbuffer精度不变的情况下。需要存储的深度更小了。
- 3、最粗暴的，提高Zbuffer的精度。
- 4、Reversed-Z

Reversed-Z
- zview\[0.01,0.1\]就占了整个zbuffer的\[0.0,0.9\]的精度，浮点的精度都集中在靠近近平面的地方

方法：将原来近裁剪面的深度映射到1，远裁剪面映射到0

early-z
- 光栅化阶段之后、像素着色器之前直接进行一次深度测试；减少不必要的开销，小解决overdraw，无法避免overdraw
- 与AlphaTest、AlphaBlend冲突了

HSR
- 隐面剔除Hidden Surface Removal（PowerVR出品，一般是IOS的设备）

在硬件层面对被遮挡的点进行剔除
- 比Early-Z更加高效：1、不用排序；2、保证一个点不被重复渲染

其他
- z-culling、z-perpass、hi-z

### 【透明】

- 1、blending
  - 物体排序后，根据alpha值通过各种混合模式进行混合
- 2、alpha test
  - 一个片元的alpha小于一个阈值时，它就会被discard
  - 特点：ZTest、ZWrite全开
- 3、alpha coverage
  - 类似于MSAA（采样四周像素颜色取平均值coverage）
  - alpha coverage不用采样多次，直接使用它的alpha作为coverage
  - 特点：不需要排序
- 4、two pass
  - 特点：效率好，适用于处理中心不透明、轮廓半透明的物体，比如草、头发
  - Pass1渲染中心不透明：ZWrite开，alphaTest开，colorWrite关 （省性能）
  - Pass2渲染轮廓透明：ZWrite关，alphaBlend开，colorWrite开
- 5、weight blended
  - 传统的alpha计算方式通过经验公式做了简化
  - 特点：效率非常高，效果接近但不正确，可以挑公式，不需要排序
- 6、moment based
  - 使用概率论的方法去考虑一个像素被其他像素遮挡的概率
  - 特点：和weight blended一样也是基于经验公式的，效果比weight blended好一些
- 7、depth peeling
  - 从离相机最近的一层到最远的一层，进行多层渲染最后叠加
  - 特点：开销四倍以上，效果比较好
- 8、GPU Linked List
  - 利用最新graphics API的功能（原子计数器、SSBO等），可以实现每像素排序的透明度。
  - 特点：因为是基于像素的，所以效果非常正确（基于物体的话，相机稍微挪一点就会一个物体跑到另一个物体前面来）
  - 底层实现：
    - 片元结点的next指向远处（摄像机方向）的下一个片元
    - 甚至可以在结构体中加一个enum来自定义混合模式，做到不同像素使用不同的混合模式
- 9、其他
  - triangle sorting、Depth proxy、shortcut、hybird

### 【碰撞检测】

分离轴定理SAT
- 360度无限宽的平行光照射，投影一旦出现分离则不碰撞

GJK算法
- 用于计算两个凸体之间的距离

明可夫斯基和：物体1所有点和物体2所有点的和集

2D 点p是在扇形内（王者荣耀技能）
- 以扇形顶点为原点，一条边为x轴
- ∠xop < ∠xob 且 po < bo

2D 圆与扇形碰撞检测（王者荣耀技能）
- 首先用圆心p同上做一次判断后，再加一个判断，看圆是否与这2条线段相交

2D 两个aabb碰撞检测
- 两个重心在x轴上的距离 < 2条x边的和除以2，y轴同理，则相交

2D 圆与AABB矩形（3D 球与AABB盒）碰撞检测
- 简述：利用矩形的对称性可以将圆心映射到以矩形右上角为原点的坐标系 then 根据圆心在第一二三四象限分别进行讨论就可以了

### 【硬件】

GPU多级缓存结构及速度排序：寄存器、共享内存、L1缓存、L2缓存、显存、系统内存

GPU架构分2种：`分离式`（移动）、`耦合式`（游戏主机）

GPU架构
- tips：移动端没有显存，需要依赖Tile Memory

overdraw：雾蒙蒙的挡风玻璃；老生常谈的性能话题

SRAM与DRAM
- SRAM：GPU的OnChip memory。可以理解为小区的便利店。虽然比较小，但是访问速度快
- DRAM：显存，离GPU较远，可以理解为市中心的超市。比较大，但是访问速度慢。

IMR（Immediate Mode Rendering）
- 一般用于PC平台；能耗大，不用存储vertex buffer

为什么TBR这么好却不用？因为DRAM上进行读写的速度是最快的
- 提交的每个指令都会立即开始执行，并且每一个drawcall完成了整个渲染管线流程写入帧缓冲frameBuffer才会开始渲染下一个drawcall

TBR（Tile-Based Rendering）
- 一般用于移动平台；本质上就是DeferredRendering

TBR架构在gpu很近的位置增加了一片称为Tile Memory的高速缓存（SRAM）。并且将需要渲染的画面分成一个个的矩形区块（tile），tile一般是16x16或者32x32的矩形块

对每个tile缓存所有指令直到最后才绘制tile中的每个图元，最后把tile拷贝到帧缓冲frameBuffer（DRAM）

TBDR（Tile-Based Deferred Rendering）
- TBDR新增了一个阶段叫HSR & Depth Test；TBR没有解决Overdraw问题；只有PowerVR的GPU是TBDR架构的；硬件级别的支持；early-z又无法完全避免Overdraw；TBDR不需要eralyz完全解决OverDraw
- TBR：Vertex Shading - Defer - 光栅化 - Pixel Shading
- TBDR：Vertex Shading - Defer - 光栅化 - Defer HSR - Pixel Shading

强烈注意：
- 移动端的early-z发生在哪个阶段，不是传统地在光栅化和ps之间，而是更早的对framedata的处理过程中。

### 【PBR】反射方程

主流程
- 一、求直接光Diffuse
  - 朗伯余弦定理（NoL）
- 二、求直接光Specular
  - 求D（高光反射系数）：经典blinn-Phong模型（NdotH），引入roughness和正态分布函数，TRggx
  - 求G（几何遮蔽系数）：roughness越高的微平面间相互遮蔽的概率就越高，史密斯法同时考虑了这2次遮蔽
  - 求F（菲涅尔系数）：metalic影响基础反射率F0；1-HdotV越大，F值就越大
- 三、求间接光Diffuse
  - 不同引擎不同方案，常见方案有unity球谐函数等
- 四、求间接光Specular
  - 不同引擎不同方案，常见方案有三线性插值采样IBL图后再采样虚幻引擎那张著名的红色贴图等等

## 如何让3D空间点坐标转为屏幕2D二维点坐标？

浅看 3D空间点 to 屏幕 2D二维点
- 当对每个物体🦖 建模的时候，物体本身是有自己的独立坐标系`局部坐标系` Local Space，但 🦖 🌸🌸🌱🌿 放到场景中就有不同放置位置，所有物体共享同一个坐标系，叫`世界坐标系` World Space
- 在`世界坐标系`场景下，我们是从正面某个位置去观察 🦖，如果视角变化至沿着Z轴负方向看呢？又是另外一个画面，叫做`视觉坐标系` View Space。
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TIjrn35GD6Sakr~noop.image?_iz=58558&from=article.pc_detail&x-expires=1665021396&x-signature=ccdph1LNEKoVPdzXxsuUoZa1KDY%3D)

还有两个坐标系说明：
- `裁剪坐标系` Clip Space /DNC: 归一化处理，和 需要判断哪个片段需要展示在屏幕内。(这里不做展开跟机器学习归一化目标一致，统计学中数据收敛作用)
- `屏幕坐标系` Screen Space：根据裁剪坐标系计算，再转换为屏幕坐标。最后将数据传到光栅器。

通俗理解
- 我们每个人都是一个独立个体都以"自我为中心" (`局部`坐标系)
- 随着我们长大要进入社会 (`世界`坐标系)，学习、工作 ....
- 在这个过程中，有人仰视你，有人俯视你，你可以选择平视他们 或者 后脑勺对着他们，总之其他人会站在自己的角度看问题 或者 看你 (`视觉`坐标系) ....
- AnyWay，过程中你可能会生活磨平棱角 (`裁剪`坐标系)，变成了你小时候最讨厌的人，
- But，你就是你，是不一样的烟火，.... 让蔷薇开出一种结果 (`屏幕`坐标系)

## 图形学与线性代数

坐标系转换过程离不开线性代数基础知识
- （1）`局部`空间->`世界`空间，涉及矩阵的平移、缩放、旋转
  - 缩放：代表多少倍，缩放S1、S2、S3 倍数
    - ![](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TIjrn3XA5q9ZqO~noop.image?_iz=58558&from=article.pc_detail&x-expires=1665021396&x-signature=qQsLXYyqsl2pyBWLN7U0oDzol34%3D)
  - 平移：
    - ![](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TIjrn428e5mWnm~noop.image?_iz=58558&from=article.pc_detail&x-expires=1665021396&x-signature=skMIw87L75j58a2uY4iFlzPenNo%3D)
  - 旋转：由 P(x, y, z) 变为 P' (x', y', z')，旋转 θ 角度，略过 ... 变换 - LearnOpenGL CN
- （2）`世界`空间 -> `视觉`空间，构建线性变换矩阵
  - 任何方位观察到的物体都是不同的，从A 位置 变换至 B 位置，只要知道 变换前后的基向量，就能知道 运动至哪里，方法通过矩阵相乘(对几何空间的线性变化) ....
  - 矩阵向量乘积: 变换后的基向量* 未变化前的位置 (x, y) = 基向量变换后新(x', y')
- （3）`视觉`空间 -> `裁剪`空间 -> `屏幕`空间
  - 将 3D 点 表示到 2D 点， 投影->点积(实际上会更复杂些) ....
  - 再将能视觉展示的空间展示，不能展示的被剪裁掉
  - 剪裁后点位，会归一化处理，保证交付给发光二极管。

## 图形渲染管线

初中数学计算立方体面积，老师在 2D 黑板上画了XYZ 轴，并骗你这是个 3D立方体(视觉上)。
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TIjrmCXAHtzkk1~noop.image)

任何用3D空间中表示的事物，在 🖥 中都是2D像素数组，而 WebGL/OpenGL 大部分工作也是把3D坐标转换为2D像素。这个过程叫做 图`形渲染管线` RenderPipeline。

结合上面那些个GPU 模型里的破管子，有一堆原始图形数据 经过 一个破管子后，最终输出至屏幕中的过程就是 `图形渲染管线`。

图形渲染管线 Render Pipeline 被划分为几个阶段，跟咱们的ByteCycle 流水线一样，每个阶段会把上个阶段的输出作为输入，也可以理解是函数式编程 pipeline 模式。也就是说，每个阶段都有专门的函数 / 小程序去处理，函数 / 小程序 ≈ 着色器 (Shader)。
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TIjrmD8anxR5T~noop.image)

CPU 和 GPU 是通力合作的关系来渲染图像
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TIjrmEUEPcy8Vh~noop.image?_iz=58558&from=article.pc_detail&x-expires=1665021396&x-signature=ZNfLxj6lWpJMg0cjTPnQGDJ6WZM%3D)

渲染管线抽象流程
- 3D坐标 转为 另一种3D坐标(后面会解释 从局部到世界坐标系)，并对顶点属性进行处理。
- 计算一个像素的最终颜色。例如一个立方体在灯光照射下会有阴影，这里也会将其处理。

顶点着色器
- 图元的装配：将 顶点着色器 输出的点作为输入，并绘制成图元形状。
- 几何着色器：将 图元形状 构造成新的图元 或 其他形状。
- 光栅化过程：把 图元 映射为 最终屏幕上相应的 像素。
- 片段着色器
- 测试与混合：例如 有3D遮挡场景 或 物体是透明，在这个过程中就需要判断是否在该帧被丢弃。
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TIjrmF6JDTEgkK~noop.image?_iz=58558&from=article.pc_detail&x-expires=1665021396&x-signature=dzyTooVljPV7DrOLIcg4sl7o%2B7E%3D)

GLSL 语言，类似C语言，以下是顶点着色器的例子

```shell
 #version 300 es #声明了着色器版本号 300 代表是 3.0 之后版本
in vec4 aPos ;
# in = 输入变量 浮点型向量vec4 变量名称 aPos
# eg: aPos = {1.0, 1.0, 1.0, 1.0}
voidmain
{
  gl_Position = aPos ;
  # 顶点着色器的内置输出变量
}
```

## 应用领域

### 人机交互和图形用户界面

最理想的是开发 "能听、能说、能理解人类语言" 的计算机，人们可以和计算机交谈，而不像现在这样仅限于窗口、图标、鼠标、指针 (WIMP) 界面。

### 计算机辅助设计与制造 (CAD/CAM)

CAD/CAM 是计算机图形学在工业界最广泛、最活跃的应用领域。
- 飞机、汽车、船舶、宇宙飞船的外形设计
- 发电厂、化工厂等的布局

### 景物仿真

真实感图形实时绘制与自然景物仿真
- 计算机中重现真实世界的场景叫做真实感绘制。

### 计算机动画、游戏、电影

### 计算机艺术

- 计算机艺术是科学与技术相结合的一门新兴的交叉学科，是计算机应用的一个崭新、富有时代气息的领域。


### 计算机仿真

计算机仿真是计算机技术建立被仿真系统的模型，并在某些实验条件下对模型进行动态实验的一门综合性技术。


### 科学计算可视化

虚拟现实
- 虚拟现实是利用计算机模拟现实的场景，使参与者获得与现实一样的感觉。
- 准确地说，是利用电脑模拟产生一个三维空间的虚拟世界，提供使用者关于视觉、听觉、触觉等感官的模拟，让使用者如同身历其境一般，可以及时、没有限制地观察三度空间内的事物。


### 地理信息系统

地理信息系统是建立在地理图形之上的关于各种资源的综合信息管理系统，是计算机图形学的一个重要应用领域。


### 农业上的应用

借助计算机图形生成技术来保存和再现不同作物种类和不同生长时期的植物形态，模拟植物的生长过程，从而合理地进行选种、播种、田间管理以及收获等。


# OpenGL


## OpenGl简介

OpenGL(Open Graphics Library)
>- OpenGL is a cross-language, cross-platform application programming interface (API) for rendering 2D and 3D vector graphics. The API is typically used to interact with a graphics processing unit (GPU), to achieve hardware-accelerated rendering.
>- OpenGL 是API 、是规范。GPU 硬件厂商需要满足统一OpenGL规范。而 OpenGL ES (Open Graphics Library for Embedded Systems) 是 OpenGL 子集，专门针对手机等嵌入式设备而设计的。

人话版：发动机(GPU) 驱动是方向盘、离合器等等，OpenGL 定义操纵 发动机(GPU) 发动规范，OpenGL 不关心方向盘是圆的还是方的，驱动 发动机(GPU) 干活啦。

用方向盘 (驱动器) -> 依照调用标准使用 (OpenGL) -> 指挥发动机 (GPU) 干活

# GLSL

GLSL(OpenGL Shading Language)

后面讲到图形渲染管线会说到，这里浅浅先通过例子感受下 立方体 demo。

代码阉割版：有类C语言的着色器语言、有我们熟悉JS语言、有矩阵相乘 ...


# WebGL

【2022-9-29】[Web 3D 从入门到跑路](https://www.toutiao.com/article/7148436169880142369)

## WebGL简介

WebGL(Web Graphics Library)
>- WebGL is a cross-platform, royalty-free open web standard for a low-level 3D graphics API based on OpenGL ES, exposed to ECMAScript via the HTML5 Canvas element.
>- WebGL 是在 OpenGL ES 基础上建立的在 浏览器跑起来的图形学标准，同理是浏览器厂商规范 ≈ 让JS 操作接口。光有规范是不够的，还要程序告诉 GPU 如何进行渲染。

WebGL，是一项用来在网页上绘制和渲染复杂三维图形（3D图形），并允许用户与之交互的技术。随着个人计算机和浏览器的性能越来越强，我们能够在Web上创建越来越精美、越来越复杂的3D图形。

从传统意义上来说，为了显示三维图形，开发者需要使用C或C++语言，辅以专门的计算机图形库，如OpenGL或Direct3D，来开发一个独立的应用程序。现在有了WebGL，我们只需要向已经熟悉的HTML和JS中添加一些额外的三维图形学的代码，就可以在网页上显示三维图形了。

WebGL是内嵌在浏览器中的，不必安装插件和库就可以直接使用它。

## 3D建模

3D 建模概念必备
- 如果你是个大导演，有一天你想请 安琪拉大宝贝儿 来北京 献歌一曲，
- 要有地点 Scene 场景，选择 人民大会堂作为 舞台吧；
- 要有灯光 Light 灯光, 才能让观众看到 安琪拉大宝贝儿 唱歌；
- 关于 安琪拉大宝贝 作为 模型，来之前要保养一下，皮肤看起来吹弹可破材质 Material；
- XXX 大品牌疯狂赞助，并要求她穿上新一季 服饰 和 配上妆发 贴图与纹理 Texture;
- 一切准备就绪后，N个机器 Camera 相机360 度无死角的拍摄，她唱 XXX歌曲。

脑海里构建出来的画面 ≈ 渲染器 Render
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TIjro986FYHQIz~noop.image?_iz=58558&from=article.pc_detail&x-expires=1665021396&x-signature=DqOTlUFAjtE%2B02pUnmIXHCl7jGY%3D)

Three.js demo 自己去对照着想象这个👻，就是 安琪拉大宝贝儿 吧

以上几个关键词是：Scene 场景、Light 灯光、模型、材质 Material、Texture、Camera 相机、渲染器 Render。

理解了以上的几个概念后，对我们实践上手应用 Three.js 非常的关键。

### 3D建模工具: three.js 与 Unity

作者：[ThingJS](https://www.zhihu.com/question/273431132/answer/1531831742)

- Three.js是大多数开发者首次接触的WebGL 3D库
- Unity为游戏开发、美术、建筑、汽车设计、影视制作在内的创作者提供一整套软件解决方案。
- ThingJS是更为上层的抽象，不用关心渲染、mesh、光线等复杂概念

总结
- unity3d打包出来的web项目占用系统资源比较大(非常大)，但是开发复杂交互的项目比threejs快很多倍
- threejs只适合于做展示的项目，开发速度相对慢一些，因为这个库的封装层面相对unity3d更底层一些。

three.js优势
- Three.js是大多数开发者首次接触的WebGL 3D库，Threejs库的出现解决了底层的渲染细节和复杂的数据结构，可以支持如一个房间级别,或一个楼层级别的渲染,或符合特殊要求的大量同类模型的渲染。

three.js和Unity开发性能比较
- three.js对WebGL进行了封装,提供了更高层的渲染接口,提供摄影机、视口的控制,提供场景组织方式,能够加载多种文件格式,通过创建材质、贴图并编写shader来实现物体效果,创建立方体、球等基本元素,提供灯光、阴影、点云等等底层功能。
- 相比而言，Unity 3D需要下载和安装**Unity编辑器**以便创建3D项目，C#语言面向对象的特性完整，有利于程序设计。 
- Unity编辑器提供了丰富的游戏开发功能，包括场景的渲染、物体创建、各种效果在编辑中调整，应用商店提供了丰富的扩展能力，更适合影视动画开发生态。这一点和Unity的开发优势趋同，基于Unity强大的编辑器,提供了丰富的游戏开发功能。包括场景的渲染、物体创建、各种效果在编辑中调整、物理系统、地形系统、植物系统、粒子系统、过场动画编辑、人物角色动画编辑等等。并且通过应用商店提供了丰富的扩展能力

three.js不足之处
- 虽然Three.js底层引擎级别的三维图形库，有很多开源库对它进行扩展，但较为松散，适合做轻量级可视化应用，复杂应用则需要基于此库进行大量封装才行。尤其场景输出层面，需要3 3DSMax、Maya、CAD等专业美术人员,通过建模再做一定的导出工作才能得到需要的模型，团队协作成本高。

问题加餐：three.js，thingjs 3D框架对比
- ThingJS是新兴的3D框架，2018年诞生，由北京优锘科技公司研发，旨在简化3D应用开发。
- 轻量化的表现在：
  - 1、ThingJS封装了对模型交互事件的API、对模型的操作及层次关系，一个个具体的模型抽象把初学者从复杂的3D概念中解放出来，
  - 2、加载简单场景仅需1行代码，发布方式支持iframe, 微信和PC发布，在线化更方便
  - 3、ThingJS是一个完成的物联网可视化应用开发生态，提供CampusBuilder, CityBuilder等场景搭建SAAS、场景存储云空间（无需付费）和10万个场景资源……
- 如果是你是初学者，three.js用起来更花费时间，就一个加载模型、调光、选择模型弹框的功能，就能写出Threejs上百行代码，ThingJS是更为上层的抽象，不用关心渲染、mesh、光线等复杂概念，更适合项目团队提高开发效率。


## Three.js

### Three.js简介

WebGL学习有门槛，[Three.js](https://threejs.org/) 作为方向入门，就像 jQuery 一样的存在，可以快速的创建出三维场景。
- ![](https://p3-sign.toutiaoimg.com/tos-cn-i-tjoges91tu/TIjrlIT9pDUcGs~noop.image)

基于浏览器，通过Javascript 来实现编程技术，能在 2D屏幕 上看到 3D效果。
- 基础能力：数学、物理 ....
- 能力支持：基于 GPU 图形渲染管线架构设计，在 Web端 通过 WebGL (-> OpenGL ES -> OpenGL) 和 着色器 (着色器GLSL 语言实现)，实现驱动能力。(任何语言实现都是以硬件为基础)

### Three.js 效果

[官方示例](https://threejs.org/examples/#webgl_animation_keyframes)

<iframe src="https://threejs.org/examples/#webgl_animation_keyframes" width='100%' height='600' frameborder='0' scrolling='no' allowfullscreen="true"></iframe>

自定义开发Demo

<iframe src="{{ site.url }}/wqw/demo/three.js.html" frameborder='0' scrolling='no' allowfullscreen="true"></iframe>

- [鞋子](https://threejs.org/examples/webgl_loader_gltf_variants.html)
  - <iframe src="https://threejs.org/examples/webgl_loader_gltf_variants.html" width='100%' height='600' frameborder='0' scrolling='no' allowfullscreen="true"></iframe>
- 室内场景：[果盘](https://threejs.org/examples/webgl_loader_gltf_transmission.html)
  - <iframe src="https://threejs.org/examples/webgl_loader_gltf_transmission.html" width='100%' height='600' frameborder='0' scrolling='no' allowfullscreen="true"></iframe>
- [初音未来](https://threejs.org/examples/webgl_loader_mmd.html)
  - <iframe src="https://threejs.org/examples/webgl_loader_mmd.html" width='100%' height='600' frameborder='0' scrolling='no' allowfullscreen="true"></iframe>
- [人物模型](https://threejs.org/examples/webgl_loader_obj_mtl.html)
  - <iframe src="https://threejs.org/examples/webgl_loader_obj_mtl.html" width='100%' height='600' frameborder='0' scrolling='no' allowfullscreen="true"></iframe>
- [沙滩豪车](https://threejs.org/examples/webgl_materials_envmaps_groundprojected.html)
  - <iframe src="https://threejs.org/examples/webgl_materials_envmaps_groundprojected.html" width='100%' height='600' frameborder='0' scrolling='no' allowfullscreen="true"></iframe>

## 游戏

### Three.js

3D游戏：[First Three.js Game](https://discourse.threejs.org/t/smelly-cat-first-three-js-game/12894), [smelly cat](https://defnetuncer98.github.io/smellycat/#)

### Godot

【2022-10-13】[Godot 引擎](https://godotengine.org/)是一款免费、由开源社区驱动的 2D 和 3D 游戏引擎
- [中文文档](https://docs.godotengine.org/zh_CN/latest/getting_started/first_2d_game/index.html)

[程序员用12小时复刻《羊了个羊》，代码已开源](https://www.toutiao.com/article/7153542634227876383)
- [Godot版羊了个羊](https://gitcode.net/hello_tute/SheepASheep)


### 微信跳一跳

2018年风靡一时的小游戏：跳一跳，背后原理分析，[微信跳一跳解题报告](https://charlesliuyx.github.io/2018/01/19/%E5%BE%AE%E4%BF%A1%E8%B7%B3%E4%B8%80%E8%B7%B3%E8%A7%A3%E9%A2%98%E6%8A%A5%E5%91%8A/#%E6%B8%B8%E6%88%8F%E6%9C%BA%E5%88%B6)
1. 问题描述
2. 游戏机制
3. 解决方案


# 三维可视化

## VTK

C++三维可视化工具包：[Visualization Toolkit](https://vtk.org/) (VTK)

### pyVista

#### 简介

【2022-11-14】[pyvista](https://github.com/pyvista/pyvista)
- 3D plotting and mesh analysis through a streamlined interface for the Visualization Toolkit (VTK)

PyVista is...
- Pythonic VTK: a high-level API to the [Visualization Toolkit](https://vtk.org/) (VTK)
- mesh data structures and filtering methods for spatial datasets
- 3D plotting made simple and built for large/complex data geometries

PyVista is a helper module for the Visualization Toolkit (VTK) that wraps the VTK library through NumPy and direct array access through a variety of methods and classes. This package provides a Pythonic, well-documented interface exposing VTK's powerful visualization backend to facilitate rapid prototyping, analysis, and visual integration of spatially referenced datasets.

This module can be used for scientific plotting for presentations and research papers as well as a supporting module for other mesh 3D rendering dependent Python modules; see Connections for a list of projects that leverage PyVista.

#### 代码示例

[文档](https://docs.pyvista.org/), [example](https://docs.pyvista.org/examples/index.html)
- ![](https://docs.pyvista.org/examples/index.html)

```python
from pyvista import examples
mesh = examples.download_st_helens()
warped = mesh.warp_by_scalar('Elevation')
surf = warped.extract_surface().triangulate()
surf = surf.decimate_pro(0.75)  # reduce the density of the mesh by 75%
surf.plot(cmap='gist_earth')
```


# 结束


