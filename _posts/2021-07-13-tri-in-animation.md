---
layout: post
title:  "动画中的三角学"
categories: JavaScript
tags: 动画 Canvas 三角
author: HyG
mathjax: true
---

* content
{:toc}

本文将讲述一些 canvas 动画绘图中三角学的应用，其中包括：

- 三角函数
- 旋转
- 波形
- 圆与椭圆
- 勾股定理
- 两点间距离




# 角

## 弧度与角度

在开始之前我们要先熟悉弧度与角度，因为在 JavaScript 自带的 Math 对象的三角函数方法均使用的是弧度制。

中学学过 `360°` 等于 `2π` 弧度，所以角度与弧度的转换公式为：

```
弧度 = 角度 * Math.PI / 180
角度 = 弧度 * 180 / Math.PI
```

## canvas 坐标系

canvas 画布中左上角为为 `(0, 0)`。如下图：

![](https://gw.alicdn.com/imgextra/i1/O1CN01cFpNJc1PdIYlBe5sX_!!6000000001863-55-tps-224-197.svg)

除了坐标系比较特殊外，其角度测量也有特点，即顺时针为正，逆时针为负，如下图：

![](https://gw.alicdn.com/imgextra/i1/O1CN013Kyw9Q1yRrDo7Matw_!!6000000006576-55-tps-224-283.svg)

## 三角函数

三角函数将直角三角形的内角和它的两个边的比值相关联，也可以等价地用与单位圆有关的各种线段的长度来定义。

![](https://gw.alicdn.com/imgextra/i1/O1CN01WHlUyc1QrmhixGATC_!!6000000002030-55-tps-209-121.svg)

### 正弦：对边比斜边

例如：30° 的正弦为 0.5

```js
console.log(Math.sin(30 * Math.PI / 180)) // 0.49999999999999994
```

不等于 0.5 的原因是 JavaScript 中浮点数存储，具体这里不做展开

同样 -30° 的正弦为 -0.5 如下

```js
console.log(Math.sin(-30 * Math.PI / 180)) // -0.49999999999999994
```

### 余弦：邻边比斜边

```js
console.log(Math.cos(30 * Math.PI / 180)) // 0.8660254037844387
console.log(Math.cos(60 * Math.PI / 180)) // 0.5000000000000001
```

### 正切：对边比邻边

![](https://gw.alicdn.com/imgextra/i4/O1CN01v3oYfF1nbyBn2pK2W_!!6000000005109-55-tps-136-121.svg)

![](https://gw.alicdn.com/imgextra/i3/O1CN01BXhytW1bC4PG8lBI5_!!6000000003428-55-tps-130-122.svg)

需要注意其正负的特性

```js
console.log(Math.tan(45 * Math.PI / 180)) // 0.9999999999999999
console.log(Math.tan(-45 * Math.PI / 180)) // -0.9999999999999999
```

### 反正弦与反余弦

简单来说就是正弦与余弦的逆运算，输入一个比率，得到对应的角的弧度

例如：

```js
console.log(Math.asin(1/2) * 180 / Math.PI) // 30.000000000000004
console.log(Math.acos(1/2) * 180 / Math.PI) // 60.00000000000001
```

### 反正切

![](https://gw.alicdn.com/imgextra/i3/O1CN01ziLXU71GreQnJPbHS_!!6000000000676-55-tps-245-203.svg)

反正切是正切的逆运算，给一个比率，得出对应的角的弧度

例如三角形 A 和 B 的反正切为：

```js
console.log(Math.atan(-1/-1) * 180 / Math.PI) // 45
console.log(Math.atan(1/1) * 180 / Math.PI) // 45
```

但此时我们无法区分这个反正切的值对应的角是三角形 A 还是 B。这就需要另一个可以算出方位角的反正切函数 `atan2`，其接受2个参数，对边的长度和邻边的长度，例如：

```js
console.log(Math.atan2(-1, -1) * 180 / Math.PI) // -135
console.log(Math.atan2(1, 1) * 180 / Math.PI) // 45
```

可以看出第一个结果为 -135°，恰好为三角形 A 的方位角。

# 旋转

复习了三角函数，接下来做一个实践。实现一个总是指向鼠标的箭头吧。

## 总是指向鼠标的箭头

首先画一个箭头，创建一个 Arrow 类

```js
class Arrow {
  x: number

  y: number

  color: string

  rotation: number

  constructor() {
    this.x = 0
    this.y = 0
    this.color = '#42A5F5'
    this.rotation = 0
  }

  draw(context: CanvasRenderingContext2D) {
    context.save()
    context.translate(this.x, this.y)
    context.rotate(this.rotation)
    context.lineWidth = 2
    context.fillStyle = this.color
    context.beginPath()
    context.moveTo(-50, -25)
    context.lineTo(0, -25)
    context.lineTo(0, -50)
    context.lineTo(50, 0)
    context.lineTo(0, 50)
    context.lineTo(0, 25)
    context.lineTo(-50, 25)
    context.lineTo(-50, -25)
    context.closePath()
    context.fill()
    context.stroke()
    context.restore()
  }
}

export default Arrow
```

创建 `<canvas>` 标签，展示这个箭头

```html
<canvas id="mainCanvas" style="background-color: #fff;" width="800" height="400"></canvas>
```

把箭头放置在画布的中央

```js
import Arrow from '../common/Arrow'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const context = canvas.getContext('2d')
  const arrow = new Arrow()
  arrow.x = canvas.width / 2
  arrow.y = canvas.height / 2
  if (context) {
    arrow.draw(context)
  }
}
```

看到效果如下：

![](https://gw.alicdn.com/imgextra/i3/O1CN01sWNZxi1l3V9ckkdgy_!!6000000004763-2-tps-1578-782.png)

监听鼠标移动，创建一个 util.ts 文件，增加鼠标位置的监听

```js
const captureMouse = (element: HTMLElement) => {
  const mouse: {
    x: number
    y: number
    event: MouseEvent | null
  } = {
    x: 0,
    y: 0,
    event: null,
  }
  const { offsetLeft, offsetTop } = element

  element.addEventListener('mousemove', (e) => {
    let x
    let y
    x = e.pageX
    y = e.pageY
    x -= offsetLeft
    y -= offsetTop
    mouse.x = x
    mouse.y = y
    mouse.event = e
  })
  return mouse
}

export { captureMouse }
```

再将鼠标位置的监听增加到 canvas 主逻辑上

```js
import Arrow from '../common/Arrow'
import { captureMouse } from '../common/utils'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const context = canvas.getContext('2d')
  const arrow = new Arrow()
  arrow.x = canvas.width / 2
  arrow.y = canvas.height / 2

  const pos = captureMouse(canvas) // 监听鼠标位置

  if (context) {
    const drawFrame = () => {
      window.requestAnimationFrame(drawFrame) // 每帧执行
      context.clearRect(0, 0, canvas.width, canvas.height) // 清除画布内容
      if (pos.x && pos.y) {
        const dx = pos.x - arrow.x
        const dy = pos.y - arrow.y
        arrow.rotation = Math.atan2(dy, dx) // 这里计算出方位角
      }
      arrow.draw(context)
    }
    drawFrame()
  }
}
```

巧妙的使用了方位角反正切函数，效果如下：

![](https://gw.alicdn.com/imgextra/i1/O1CN01EsRvtO1rWFi9law2I_!!6000000005638-1-tps-787-358.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/01-rotate-to-mouse/](https://gaohaoyang.github.io/canvas-practice/01-rotate-to-mouse/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/01-rotate-to-mouse/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/01-rotate-to-mouse/index.ts)

# 波

![](https://gw.alicdn.com/imgextra/i4/O1CN01RfNFfr1fjjz7TkyRW_!!6000000004043-2-tps-600-315.png)

## 简谐运动的小球

我们可以使用正弦波做出无阻尼的简谐振动效果，我们使用一个圆形，让其在水平方向上做简谐运动。首先声明一个 `Ball` 类，代码如下

```js
class Ball {
  radius: number

  color: string

  x: number

  y: number

  lineWidth: number

  constructor(radius: number = 40, color: string = '#795548') {
    this.radius = radius
    this.color = color
    this.x = 0
    this.y = 0
    this.lineWidth = 1
  }

  /**
   * draw
   */
  public draw(context: CanvasRenderingContext2D) {
    context.save()
    context.translate(this.x, this.y)
    context.lineWidth = this.lineWidth
    context.fillStyle = this.color
    context.beginPath()
    context.arc(0, 0, this.radius, 0, Math.PI * 2, true)
    context.closePath()
    context.fill()
    if (this.lineWidth > 0) {
      context.stroke()
    }
    context.restore()
  }
}

export default Ball
```

将其绘制到画布上看下效果

```html
<canvas id="mainCanvas" style="background-color: #fff;" width="800" height="400"></canvas>
```

```js
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const context = canvas.getContext('2d')

  if (context) {
    const ball = new Ball()
    ball.x = canvas.width / 2
    ball.y = canvas.height / 2
    ball.draw(context)
  }
}
```

效果如下：

![](https://gw.alicdn.com/imgextra/i1/O1CN01zYG2fx1VNchUMI698_!!6000000002641-2-tps-1566-774.png)

现在我们让其在水平方向上做简谐运动

```js
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const context = canvas.getContext('2d')

  if (context) {
    const ball = new Ball()
    ball.x = canvas.width / 2
    ball.y = canvas.height / 2
    let angle = 0

    const drawFrame = () => {
      window.requestAnimationFrame(drawFrame)
      context.clearRect(0, 0, canvas.width, canvas.height)
      // 正弦运动
      ball.x = canvas.width / 2 + Math.sin(angle) * 50
      angle += 0.1 // 角不断增加
      ball.draw(context)
    }
    drawFrame()
  }
}
```

效果如下：

![](https://gw.alicdn.com/imgextra/i1/O1CN01gRXxu223bXfw9Gxeo_!!6000000007274-1-tps-787-358.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/02-left-right-motion/](https://gaohaoyang.github.io/canvas-practice/02-left-right-motion/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/02-left-right-motion/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/02-left-right-motion/index.ts)

## 高刷屏下保持速度一致

大部分显示器的刷新率为60Hz，但随着科技的进步，120Hz、144Hz 的显示设备越来越多，我们要保证同样的速度，并保证高刷屏下的细腻感。所以上述代码如果不改的话，运动的速度在 120Hz 的屏幕下是 60Hz 屏幕下的2倍，我们可以使用每帧的时间乘速度来解决这个问题。

```js
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const context = canvas.getContext('2d')

  if (context) {
    const ball = new Ball()
    ball.x = canvas.width / 2
    ball.y = canvas.height / 2
    const speed = 4 // 速度
    let angle = 0

    let then = 0
    // raf cb 的入参是当前帧的时间
    const drawFrame = (time: number) => {
      const timeInSeconds = time * 0.001
      const deltaTimeInSeconds = timeInSeconds - then // 每帧耗时，单位s
      then = timeInSeconds

      window.requestAnimationFrame(drawFrame)
      context.clearRect(0, 0, canvas.width, canvas.height)
      ball.x = canvas.width / 2 + Math.sin(angle) * 50
      angle += speed * deltaTimeInSeconds // 位移 = 速度 * 每帧的时间
      ball.draw(context)
    }
    drawFrame(0)
  }
}
```

效果如下：

![](https://gw.alicdn.com/imgextra/i3/O1CN01GgzTri1vtOBIMQ2NK_!!6000000006230-1-tps-787-358.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/03-left-right-motion-speed/](https://gaohaoyang.github.io/canvas-practice/03-left-right-motion-speed/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/03-left-right-motion-speed/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/03-left-right-motion-speed/index.ts)

## 正弦曲线轨迹

我们依旧使用 Ball 类，将其半径设置的很小，保留其运动轨迹

```js
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const context = canvas.getContext('2d')

  if (context) {
    const ball = new Ball(1)
    ball.y = canvas.height
    ball.x = 0
    const speedY = 2
    const speedX = 50

    let angle = 0

    let then = 0
    const drawFrame = (time: number) => {
      const timeInSeconds = time * 0.001
      const deltaTimeInSeconds = timeInSeconds - then
      then = timeInSeconds
      ball.x += speedX * deltaTimeInSeconds // 水平方向位移
      ball.y = canvas.height / 2 + Math.sin(angle) * 50 // 垂直方向位移
      angle += speedY * deltaTimeInSeconds
      ball.draw(context)
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}
```

效果如下：

![](https://gw.alicdn.com/imgextra/i4/O1CN01n8qnJ81bj2vGIkCMO_!!6000000003500-1-tps-787-358.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/04-sin-track/](https://gaohaoyang.github.io/canvas-practice/04-sin-track/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/04-sin-track/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/04-sin-track/index.ts)

# 圆与椭圆

![](https://gw.alicdn.com/imgextra/i2/O1CN01eF0fQD1cVau7iLOWs_!!6000000003606-55-tps-202-202.svg)

如图，已知圆的半径，那么圆上的一点的坐标为

```
x = r * cosθ
y = r * sinθ
```

根据这个我们可以做出圆周运动

## 圆周运动

根据上述公式，设置半径为 100，代码如下

```html
<canvas id="mainCanvas" style="background-color: #fff;" width="800" height="400"></canvas>
```

```js
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const context = canvas.getContext('2d')

  if (context) {
    const ball = new Ball(5)
    const ball2 = new Ball(50, '#3949AB')
    ball.x = canvas.width / 2
    ball.y = canvas.height / 2
    ball2.x = canvas.width / 2
    ball2.y = canvas.height / 2
    const speed = 2
    const r = 100

    let angle = 0

    let then = 0
    const drawFrame = (time: number) => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      const timeInSeconds = time * 0.001
      const deltaTimeInSeconds = timeInSeconds - then
      then = timeInSeconds
      ball.x = canvas.width / 2 + r * Math.cos(angle)
      ball.y = canvas.height / 2 + r * Math.sin(angle)
      angle += speed * deltaTimeInSeconds
      ball.draw(context)
      ball2.draw(context)
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}
```

效果如下

![](https://gw.alicdn.com/imgextra/i1/O1CN01Hu7Qfa1EXNfevsLsP_!!6000000000361-1-tps-780-361.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/05-circle/](https://gaohaoyang.github.io/canvas-practice/05-circle/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/05-circle/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/05-circle/index.ts)

## 椭圆周运动

椭圆周运动，需要分别设置 x 方向半径和 y 方向半径。

```html
<canvas id="mainCanvas" style="background-color: #fff;" width="800" height="400"></canvas>
```

```js
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const context = canvas.getContext('2d')

  if (context) {
    const ball = new Ball(5)
    const ball2 = new Ball(50, '#3949AB')
    ball.x = canvas.width / 2
    ball.y = canvas.height / 2
    ball2.x = canvas.width / 2
    ball2.y = canvas.height / 2
    const speed = 2
    const rx = 100
    const ry = 60

    let angle = 0

    let then = 0
    const drawFrame = (time: number) => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      const timeInSeconds = time * 0.001
      const deltaTimeInSeconds = timeInSeconds - then
      then = timeInSeconds
      ball.x = canvas.width / 2 + rx * Math.cos(angle)
      ball.y = canvas.height / 2 + ry * Math.sin(angle)
      angle += speed * deltaTimeInSeconds
      ball.draw(context)
      ball2.draw(context)
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}
```

效果如下

![](https://gw.alicdn.com/imgextra/i4/O1CN013nYae01tYCd8O2kIe_!!6000000005913-1-tps-780-361.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/06-oval/](https://gaohaoyang.github.io/canvas-practice/06-oval/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/06-oval/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/06-oval/index.ts)

# 勾股定理

![](https://gw.alicdn.com/imgextra/i1/O1CN01WHlUyc1QrmhixGATC_!!6000000002030-55-tps-209-121.svg)

勾股定理：平面上的直角三角形的两条直角边的长度的平方和等于斜边长的平方。

```
c ^ 2 = a ^ 2 + b ^ 2
```

我们主要使用勾股定理来计算亮点之间的距离。

## 两点间距离

声明2个小圆形，随机摆放在画布上，计算出两个圆心的距离

```html
<canvas id="mainCanvas" style="background-color: #fff;" width="800" height="400"></canvas>
<div id="distance">distance is: </div>
```

```js
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')
const distanceDom: HTMLDivElement | null = document.querySelector('#distance')

if (canvas) {
  const context = canvas.getContext('2d')

  if (context) {
    const ball = new Ball(5, '#AED581')
    const ball2 = new Ball(5, '#3949AB')
    const pos1 = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    }
    const pos2 = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    }
    ball.x = pos1.x
    ball.y = pos1.y
    ball2.x = pos2.x
    ball2.y = pos2.y

    const drawFrame = () => {
      ball.draw(context)
      ball2.draw(context)
      const dx = ball.x - ball2.x
      const dy = ball.y - ball2.y
      const distance = Math.sqrt(dx ** 2 + dy ** 2)
      if (distanceDom) {
        distanceDom.insertAdjacentHTML('beforeend', String(distance))
      }
    }
    drawFrame()
  }
}
```

效果如下

![](https://gw.alicdn.com/imgextra/i4/O1CN01HBNVRV1uLfP5z2vc2_!!6000000006021-1-tps-816-435.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/07-distance/](https://gaohaoyang.github.io/canvas-practice/07-distance/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/07-distance/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/07-distance/index.ts)

## 鼠标指针与点之间的距离

为了看得更加直观，我们可以观察一下鼠标指针到点的距离，并连一条线

```html
<canvas id="mainCanvas" style="background-color: #fff;" width="800" height="400"></canvas>
<div id="distance"></div>
```

```js
import Ball from '../common/Ball'
import { captureMouse } from '../common/utils'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')
const distanceDom: HTMLDivElement | null = document.querySelector('#distance')

if (canvas) {
  const context = canvas.getContext('2d')
  const mousePos = captureMouse(canvas)

  if (context) {
    const ball = new Ball(5, '#AED581')
    const pos1 = {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
    }
    ball.x = pos1.x
    ball.y = pos1.y

    const drawFrame = () => {
      context.clearRect(0, 0, canvas.width, canvas.height)

      ball.draw(context)
      const dx = ball.x - mousePos.x
      const dy = ball.y - mousePos.y
      const distance = Math.sqrt(dx ** 2 + dy ** 2)
      if (distanceDom) {
        distanceDom.innerHTML = String(distance)
      }

      // 画一条鼠标指针到指定点的线
      context.save()
      context.moveTo(ball.x, ball.y)
      context.lineTo(mousePos.x, mousePos.y)
      context.closePath()
      context.stroke()

      window.requestAnimationFrame(drawFrame)
    }
    drawFrame()
  }
}
```

效果如下

![](https://gw.alicdn.com/imgextra/i1/O1CN01unMj5w1gd9uYTMne1_!!6000000004164-1-tps-816-435.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/08-mouse-distance/](https://gaohaoyang.github.io/canvas-practice/08-mouse-distance/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/08-mouse-distance/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/08-mouse-distance/index.ts)

# 总结

本文我们主要研究了三角学在 canvas 绘图中的一些应用，学习了角度与弧度的转换、canvas 2d 坐标系的特点、三角函数、旋转、波、圆与椭圆周运动、计算两点之间距离等。这为后续开发更复杂的互动场景提供了基础和帮助。

```
角度与弧度转换
弧度 = 角度 * Math.PI / 180
角度 = 弧度 * 180 / Math.PI

朝鼠标或任意一点旋转
const dx = pos.x - arrow.x
const dy = pos.y - arrow.y
arrow.rotation = Math.atan2(dy, dx) // 这里计算出方位角

波
ball.x = canvas.width / 2 + Math.sin(angle) * 50
angle += speed * deltaTimeInSeconds // 位移 = 速度 * 每帧的时间

圆周运动
ball.x = canvas.width / 2 + r * Math.cos(angle)
ball.y = canvas.height / 2 + r * Math.sin(angle)
angle += speed * deltaTimeInSeconds

椭圆周运动
ball.x = canvas.width / 2 + rx * Math.cos(angle)
ball.y = canvas.height / 2 + ry * Math.sin(angle)
angle += speed * deltaTimeInSeconds

两点之间的距离
const dx = ball.x - ball2.x
const dy = ball.y - ball2.y
const distance = Math.sqrt(dx ** 2 + dy ** 2)
```
