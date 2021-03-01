---
layout: post
title:  "前端弹性动画与 framer-motion 动画库初探"
categories: JavaScript
tags: 动画
author: HyG
mathjax: true
---

* content
{:toc}

前端动画的开发一直是我所热衷探索与研究的内容，本文将描述什么是拟真的动画效果，目前所流行的 React 动画库，以及一些基于 framer-motion 动画库的 demos。




{% raw %}
## 动画效果的真实体验

### `timing-function` 的不足

说到拟真的的动画体验，本质是动画中的过渡动画带来的体感。通常情况开发一个前端动画，会使用 CSS transition 来实现，动画中的变量值（如 div 的位移或角度等）与时间的关系是三次贝塞尔曲线（cubic-bezier），即 `timing-function` 中常用的 `ease`, `ease-in`, `ease-out`, `ease-in-out` 等，或给三次贝塞尔曲线传入 4 个参数来控制曲线的形态。如下

<a href="https://cubic-bezier.com/">
  <img width="70%" src="https://gw.alicdn.com/imgextra/i4/O1CN01rCo6Er1jz5h57YNjg_!!6000000004618-2-tps-978-352.png"/>
</a>

**但是，真实世界中，没有任何一个物体的运动是符合三次贝塞尔曲线的**。因为物体的运动受到自身的质量、阻力、弹力等因素有关，这也是为什么会诞生物理引擎。接下来一步一步讲讲弹簧阻尼系统中的运动。

### 弹簧-阻尼系统中的运动

在很多 native 动画中，特别是 iOS 的系统动画中，可以感受到“拉动越小，回弹越小；拉动越大，回弹越大”的感受，这便是弹簧动画的效果

![](https://gw.alicdn.com/imgextra/i4/O1CN01r7hDZ81Uulic8TukO_!!6000000002578-2-tps-216-139.png)

首先来看弹簧的受力情况，根据胡克定律得到如下公式：

$$
F_s=-kX
$$

$k$ 为弹簧劲度系数

考虑到阻力，$c$ 为摩擦系数，$v$ 为速度

$$
F_d=-cv
$$

弹簧上的合力则为：

$$
F=F_s+F_d=-kX-cv
$$

再根据牛顿第二定律

$$
F=ma
$$

联立两个方程

$$
\begin{cases}
  F=-kX-cv \\
  F=ma
\end{cases}
$$

为了简单起见，我们假设质量值为 1（即 $m=1$）,这样就可以得到：

$$
a=-kX-cv
$$

$X$代表物体从其平衡位置开始移动。这就意味着，如果我们想从 $x=x$ 到 $x=1$，那么我们要每次移动 $x-1$  才能到达那个指定位置（微分的思想）。

$$
X=x-1
$$

得到运动方程

$$
a=-k(x-1)-cv
$$

接下来使用微分公式来计算出物体运动的位置和时间的关系

$$
x=f(t)
$$

根据位置计算速度

$$
v=\frac{dx}{dt}=f'(t)
$$

计算加速度

$$
a=\frac{dv}{dt}=f''(t)
$$

结合之前得出的运动方程

$$
\begin{cases}
  a=-k(x-1)-cv \\ \\
  a=\dfrac{dv}{dt}=f''(t) \\ \\
  v=\dfrac{dx}{dt}=f'(t) \\ \\
  x=f(t)
\end{cases}
$$

得出

$$
f''(t)=-k(f(t)-1)-cf'(t)
$$

接下来就是解这个微分方程了。

考虑一下边界条件，我们让块移动之前，块的位置假设在 $x=0$，也就是说块的初始位置是 $x=0$，初始时间是 $t=0$

$$
f(0)=0
$$

$$
f'(0)=0
$$

再假设劲度系数 $k=180$，摩擦系数为 $c=12$

$$
\begin{cases}
  f(0) = 0 \\
  f'(0) = 0 \\
  f''(t) = -180(f(t) - 1) - 12f'(t)
\end{cases}
$$

解方程的具体过程这里就不细讲了，而且有一个强大的搜索引擎 [WolframAlpha](https://www.wolframalpha.com/input/?i=f%280%29+%3D+0%3B+f%27%280%29+%3D+0%3B+f%27%27%28t%29+%3D+-180%28f%28t%29+-+1%29+-+12f%27%28t%29) 可以用来解各种微积分方程，将方程用以下的方式输入

```
f(0) = 0; f'(0) = 0; f''(t) = -180(f(t) - 1) - 12f'(t)
```

如下图

![](https://gw.alicdn.com/imgextra/i3/O1CN01vGtrEZ20XvfoF2xqJ_!!6000000006860-2-tps-1008-1080.png)

可以看到上述截图，方程经过傅里叶变换得到

$$
f(t)=-\frac{1}{2}e^{-6t}(-2e^{6t}+sin(12t)+2cos(12t))
$$

这个函数图像在二维坐标系中绘制如下：

![](https://gw.alicdn.com/imgextra/i1/O1CN01Z8zVrh1a5pMTrVSWe_!!6000000003279-2-tps-1209-605.png)

是不是非常像 timing-fuction 中的三次贝塞尔曲线？是的，三次贝塞尔曲线是在模拟这个计算结果，而我们刚刚的计算真实的还原了质量为 1、劲度系数为 180、摩擦系数为 12 时的弹簧运动轨迹。

### 简谐运动

说到上述的这个运动轨迹，其本质就是一个简谐运动。这里再复习一下什么是简谐运动：

> 简谐运动，或称简谐振动、谐振、SHM（Simple Harmonic Motion），即是最基本也是最简单的一种机械振动。当某物体进行简谐运动时，物体所受的力跟位移成正比，并且力总是指向平衡位置。

如下图，简谐运动的阻尼大小分为 4 种情况

- 零阻尼 (zero damping)：图中虚线为零阻尼的情况，物体将永不停歇的做周期运动
- 欠阻尼 (light damping)：图中蓝线为欠阻尼情况，物体在平衡位置震荡，但振幅减小，最终回到平衡位置
- 临界阻尼 (critical damping)：图中红线为临界阻尼情况，物体以最快速度回到平衡位置。现实生活中，许多大楼内房间或卫生间的门上在装备自动关门的扭转弹簧的同时，都相应地装有阻尼铰链，使得门的阻尼接近临界阻尼，这样人们关门或门被风吹动时就不会造成太大的声响，同时又能以最快速度关闭。另外汽车的避震弹簧也是使用了临界阻尼的原理
- 过阻尼 (over damping)：图中绿线为过阻尼情况，物体以非常缓和的方式回到平衡位置

![](https://gw.alicdn.com/imgextra/i1/O1CN01K5B0EF1xUm65Kz4YF_!!6000000006447-2-tps-422-170.png)

<table>
<tr>
  <td>
    <video src="https://g.alicdn.com/ltao-fe/assets/damping.mp4" autoplay controls preload loop muted width="300px"></video>
  </td>
  <td>
    <a href="https://gaohaoyang.github.io/framer-motion-practice/#/Spring">点击或扫码体验</a> <br />
    <img src="https://gw.alicdn.com/imgextra/i2/O1CN011yInSb1UIIRunzpdL_!!6000000002494-2-tps-200-200.png"/>
  </td>
</tr>
</table>

可以看出，前文解出来的方程即一种欠阻尼的简谐运动。这些都是真实世界中的弹性运动，显然 timing-function 中的三次贝塞尔曲线无法模拟，需要一个能够模拟弹簧阻尼系统的动画库。

## 基于 React 的弹性动画库

目前业内有3种基于 react 的弹性动画库，我们来分析对比一下：

- [react-motion](https://github.com/chenglou/react-motion)
  - spring 动画的提出者，不支持 hooks api，3年内未更新
- [react-spring](https://www.react-spring.io/)
  - 灵感来源于 react-motion，支持 hooks，功能强大
- [framer-motion](https://www.framer.com/motion/)
  - 支持 hooks，功能强大，同时增加了很多声明式属性，api 简洁友好

再来对比一下3个库的 npm 下载情况，基本是差不多的

name | download values
--- | ---
react-motion | <img src="https://gw.alicdn.com/imgextra/i1/O1CN01jwQeCd21tHkxwg9h1_!!6000000007042-2-tps-528-110.png" width="300px"/>
react-spring | <img src="https://gw.alicdn.com/imgextra/i1/O1CN01EZY4kL1zfswDwcpgZ_!!6000000006742-2-tps-510-114.png" width="300px"/>
framer-motion | <img src="https://gw.alicdn.com/imgextra/i4/O1CN01RsV09s1abQgessyq0_!!6000000003348-2-tps-526-114.png" width="300px"/>

其中 framer-motion 可以说是异军突起，发展非常迅猛

![](https://gw.alicdn.com/imgextra/i1/O1CN01SWjSmq1yf8fnymlCS_!!6000000006605-2-tps-364-175.png)

![](https://gw.alicdn.com/imgextra/i3/O1CN017jtfSs1mRbaCrPZGb_!!6000000004951-2-tps-397-199.png)

2020年10月的周下载量几乎是2019年同期的10倍，这大部分得益于其 api 的友好性。接下来将一起探索一下 framer-motion 的使用方式。

## framer-motion

什么是 framer-motion？先看下官网[https://www.framer.com/motion/](https://www.framer.com/motion/)的一段话

> A production-ready motion library for React. Utilize the power behind Framer, the best prototyping tool for teams. Proudly open source.

framer motion 是一个生产级的 React 动画库，为他们自家原型工具产品 Framer 提供了支持，并自豪的进行了开源。事实上，framer motion 作为动画库，提供了一些极其简洁的 api 帮助我们创建复杂的动效，这些 api 帮助然我们抽象出动画背后的复杂性，让创建动画变得简单。

官网强调了几个特性，这也是其极简 api 的一些特性

- 声明式api
- 组件间共享布局动画
- 手势支持

接下来看一些我开发的 demo 吧，上述的弹簧阻尼特性就是使用了 framer-motion 进行开发

### 弹簧阻尼 demo

```jsx
import React from 'react'
import { motion } from 'framer-motion'

import './index.css'

function index() {
  return (
    <>
      <div className="wrap">
        <div className="title">零阻尼</div>
        <motion.div
          className="ball"
          animate={{
            x: 150,
            transition: {
              type: 'spring',
              damping: 0,
            },
          }}
        />
      </div>
      <div className="wrap">
        <div className="title">欠阻尼</div>
        <motion.div
          className="ball"
          animate={{
            x: 150,
            transition: {
              type: 'spring',
              damping: 2,
            },
          }}
        />
      </div>
      <div className="wrap">
        <div className="title">过阻尼</div>
        <motion.div
          className="ball"
          animate={{
            x: 150,
            transition: {
              type: 'spring',
              damping: 100,
            },
          }}
        />
      </div>
      <div className="wrap">
        <div className="title">临界阻尼</div>
        <motion.div
          className="ball"
          animate={{
            x: 150,
            transition: {
              type: 'spring',
              damping: 17,
            },
          }}
        />
      </div>

      <br />
      <br />
      <br />
      <button
        type="button"
        onClick={() => {
          window.location.reload()
        }}
      >
        reload this page
      </button>
    </>
  )
}

export default index
```

demo 页面链接 [https://gaohaoyang.github.io/framer-motion-practice/#/Spring](https://gaohaoyang.github.io/framer-motion-practice/#/Spring)

可以看到代码确实非常简洁。本质上代码分为两部分：
- motion 为前缀的 HTML 或 SVG 标签结合在一起创建的基础组件
- 通过 prop 与组件对接的 api

代码中修改位移、阻尼的地方如下，代码中只设置了 div 需要运动的位移 x，和阻尼值（质量和劲度系数使用默认值），就完成了动画的触发。这是与传统的 transition 设置 duration 等值的动画理念完全不同。

```jsx
animate={{
  x: 150,
  transition: {
    type: 'spring', // 弹簧动画
    damping: 0, // 阻尼值
  },
}}
```

再看下页面渲染时的标签上的属性变化

<video src="https://g.alicdn.com/ltao-fe/assets/damping_render.mp4" autoplay controls preload loop muted width="100%"></video>

可以看到每一帧 `translateX` 的值在发生变化，同时 framer-motion 出于性能的考虑，又增加了 `translateZ(0px)` 这个属性。

### fadeInOut demo

接下来再看一个元素展示和隐藏时的动画 demo。正常情况下，在元素消失时，我们要监听 `transitionend` 事件，然后再移除 dom 节点，但 framer-motion 也帮我们封装好了，只需要 `AnimatePresence` 这个标签即可，代码如下：

```jsx
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

function index() {
  const [toggleShow, setToggleShow] = useState(true)
  return (
    <>
      <br />
      <br />
      <button
        onClick={() => {
          setToggleShow((pre) => !pre)
        }}
        type="button"
      >
        toggleShow
      </button>
      <br />
      <br />

      <AnimatePresence>
        {toggleShow && (
          <motion.div
            style={{
              backgroundColor: '#ddd',
              width: '50vw',
              height: '80vw',
            }}
            key="modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, x: 100 }}
            exit={{ opacity: 0, x: 0 }}
          >
            fadeInOut animation
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default index
```

<table>
<tr>
  <td>
    <video src="https://g.alicdn.com/ltao-fe/assets/fadeInOut.mp4" autoplay controls preload loop muted width="300px"></video>
  </td>
  <td>
    <a href="https://gaohaoyang.github.io/framer-motion-practice/#/FadeInOut">点击或扫码体验</a> <br />
    <img src="https://gw.alicdn.com/imgextra/i1/O1CN01zm3ZKY1x4D7uLkixa_!!6000000006389-2-tps-200-200.png"/>
  </td>
</tr>
</table>

代码中，我们可以看到使用 useState 设置了 div 展示或隐藏的状态。在需要有移除操作的动效中，使用 `AnimatePresence` 标签包裹，设置 exit 属性就好了

```js
exit={{ opacity: 0, x: 0 }}
```

再看下页面渲染时的标签的变化

<video src="https://g.alicdn.com/ltao-fe/assets/fadeInOut_render.mp4" autoplay controls preload loop muted width="100%"></video>

点击 toggle 按钮时，先执行动画再进行了 dom 移除操作。

### drag demo

```jsx
import React from 'react'
import { motion } from 'framer-motion'
import './index.css'

function index() {
  return (
    <div className="container">
      <div
        className="box"
        style={{
          width: '300px',
          height: '500px',
        }}
      >
        <motion.div
          style={{ width: '44px', height: '44px' }}
          className="ball"
          drag
          dragConstraints={{
            top: -228,
            bottom: 228,
            left: -128,
            right: 128,
          }}
          dragElastic={0.2}
        />
      </div>
    </div>
  )
}

export default index
```

效果如下：

<table>
<tr>
  <td>
    <video src="https://g.alicdn.com/ltao-fe/assets/drag.mp4" autoplay controls preload loop muted width="300px"></video>
  </td>
  <td>
    <a href="https://gaohaoyang.github.io/framer-motion-practice/#/DragBall">点击或扫码体验</a> <br />
    <img src="https://gw.alicdn.com/imgextra/i3/O1CN01WRs9RF1MjIsVUyAcm_!!6000000001470-2-tps-200-200.png"/>
  </td>
</tr>
</table>

可以看到代码非常简单，给 div 设置 drag 属性、dragElastic 弹性、drag 边界条件，即可得到这样的效果，并且在 drag 过程中松手时，div 会随着惯性继续移动。

同样在浏览器中渲染时，出于性能优化的考虑，framer-motion 使用了 translate3d() 来开启 GPU 加速。

```
transform: translate3d(128px, 228px, 0px);
```

其他更多 demo 请访问 [https://gaohaoyang.github.io/framer-motion-practice/](https://gaohaoyang.github.io/framer-motion-practice/)

或扫码：

![](https://gw.alicdn.com/imgextra/i2/O1CN01i01FKn1XJcRQhnuKc_!!6000000002903-2-tps-200-200.png)

demo 的 git 地址：[https://github.com/Gaohaoyang/framer-motion-practice](https://github.com/Gaohaoyang/framer-motion-practice)

### framer-motion 主要 api

framer-motion 不止拥有 spring 动画，同样也具有 tween 补间动画，keyframes 动画，同时还提供了动画编排、丰富的手势、各种 hooks api，详情可以参考官网文档 [https://www.framer.com/api/motion/](https://www.framer.com/api/motion/)

![](https://gw.alicdn.com/imgextra/i4/O1CN01zqTgCa1nV6DfcZSCu_!!6000000005094-2-tps-1572-996.png)

## 总结

不同复杂度的动画可以使用不同的动画库。对于拟真的大面积布局/dom/svg react/rax动画可以考虑使用 framer-motion。framer-motion 具有极其简洁的 api，并支持了 spring 弹性动画，手势拖拽，hooks api 等。

这些是物理和数学的魅力，感谢伟大的科学先驱们：

![](https://gw.alicdn.com/imgextra/i3/O1CN01iN0CRO1I7y83KjN6g_!!6000000000847-2-tps-1758-634.png)

{% endraw %}
