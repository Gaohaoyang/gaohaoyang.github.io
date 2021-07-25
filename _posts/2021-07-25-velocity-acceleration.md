---
layout: post
title:  "canvas动画之速度与加速度"
categories: JavaScript
tags: 动画 Canvas 速度
author: HyG
mathjax: true
---

* content
{:toc}

本文将开始讲述动画编程的部分，会从基本的运动属性开始：速度、向量和加速度

- 速度
- 加速度




# 速度向量

速度向量指某个方向上的速度。这里包含速度的值和方向（既有大小，又有方向）。

任何一个速度向量又可以被分解为 x 方向和 y 方向。

![](https://gw.alicdn.com/imgextra/i1/O1CN01WPKEIm1RfFU3WNga3_!!6000000002138-2-tps-233-197.png)

接下来的示例中，我们会使用 vx 表示 x 轴上的速度向量，vy 表示 y 轴上的速度向量。

## 匀速直线运动

匀速直线运动是指运动快慢不变（即速度不变）、沿着直线的运动。在匀速直线运动中，路程与时间成正比，用公式 s=vt 计算。

$$
s = vt
$$

这里复用《动画中的三角学》一文中创建的 Ball 类，进行小球的匀速直线运动示例

### 已知x、y分速度的运动

代码如下

```js
import stats from '../../common/stats'
import Ball from '../../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const vx = 10 // x 方向速度， 10 像素/s
const vy = 20 // y 方向速度， 20 像素/s
const x0 = 20 // 初始位置
const y0 = 20

if (canvas) {
  canvas.width = window.screen.width
  canvas.height = window.screen.height
  const context = canvas.getContext('2d')

  const ball = new Ball(10, '#1E88E5')
  if (context) {
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位

      context.clearRect(0, 0, canvas.width, canvas.height)
      ball.x = vx * timeInSeconds + x0
      ball.y = vy * timeInSeconds + y0
      ball.draw(context)

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}
```

核心代码为

```js
ball.x = vx * timeInSeconds + x0
ball.y = vy * timeInSeconds + y0
```

效果如下

![](https://gw.alicdn.com/imgextra/i3/O1CN01MpcTv41Ul9QwSjb1d_!!6000000002557-1-tps-386-416.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/17-uniform-linear-motion/](https://gaohaoyang.github.io/canvas-practice/17-uniform-linear-motion/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/17-uniform-linear-motion/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/17-uniform-linear-motion/index.ts)

### 基于速度向量的运动

上述是通过速度的分量 vx 和 vy 进行计算的，如果未知速度的分量，只知道小球延45度每秒10像素运动，该如何实现呢？这就用到了三角函数，不清楚三角函数的可以回顾之前的文章《动画中的三角学》。

![](https://gw.alicdn.com/imgextra/i2/O1CN01tpYtrv1rnCMsinvlZ_!!6000000005675-2-tps-133-133.png)

其分量为

```
vx = 10 * cos(45)
vy = 10 * sin(45)
```

所以完整代码如下

```js
import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const alpha = 45 // 角度 45 度
const v = 10 // 速度， 10 像素/s
const x0 = 20 // 初始位置
const y0 = 20

if (canvas) {
  canvas.width = window.screen.width
  canvas.height = window.screen.height
  const context = canvas.getContext('2d')

  const ball = new Ball(10, '#1E88E5')
  if (context) {
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位

      context.clearRect(0, 0, canvas.width, canvas.height)
      ball.x = v * Math.cos((alpha * Math.PI) / 180) * timeInSeconds + x0
      ball.y = v * Math.sin((alpha * Math.PI) / 180) * timeInSeconds + y0
      ball.draw(context)

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}
```

![](https://gw.alicdn.com/imgextra/i1/O1CN01OP2dne1CPw06KjJUq_!!6000000000074-1-tps-386-416.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/18-uniform-linear-motion2/](https://gaohaoyang.github.io/canvas-practice/18-uniform-linear-motion2/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/18-uniform-linear-motion2/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/18-uniform-linear-motion2/index.ts)

注意这里的 `timeInSeconds` 是一个连续的时间，在 canvas 绘图中可能会经常使用每一帧的时间片段来进行计算，接下来讲到。

### 基于每帧时间间隔的实现

```js
import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const alpha = 45 // 角度 45 度
const v = 10 // 速度， 10 像素/s
const x0 = 20 // 初始位置
const y0 = 20

if (canvas) {
  canvas.width = window.screen.width
  canvas.height = window.screen.height
  const context = canvas.getContext('2d')

  const ball = new Ball(10, '#1E88E5')
  ball.x = x0
  ball.y = y0

  if (context) {
    let then = 0
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTime = timeInSeconds - then
      then = timeInSeconds

      context.clearRect(0, 0, canvas.width, canvas.height)
      ball.x += v * Math.cos((alpha * Math.PI) / 180) * deltaTime
      ball.y += v * Math.sin((alpha * Math.PI) / 180) * deltaTime
      ball.draw(context)

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}
```

效果与上一个 demo 相同，这里的核心逻辑为

每次计算每帧内的位移，再进行累加

```js
ball.x += v * Math.cos((alpha * Math.PI) / 180) * deltaTime
ball.y += v * Math.sin((alpha * Math.PI) / 180) * deltaTime
```

demo 链接 [https://gaohaoyang.github.io/canvas-practice/19-uniform-linear-frame-time/](https://gaohaoyang.github.io/canvas-practice/19-uniform-linear-frame-time/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/19-uniform-linear-frame-time/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/19-uniform-linear-frame-time/index.ts)

## 移动到点击位置

在《动画中的三角学》一文中，我们实现了总是指向鼠标的箭头，现在我们将其稍加改造，改为总是移动到点击位置。

```js
import stats from '../common/stats'
import Arrow from '../common/Arrow'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const v = 100 // 速度 10 像素/s

/**
 * 获取鼠标点击位置
 */
const getClickPos = (element: HTMLElement) => {
  const pos = {
    x: 0,
    y: 0,
  }
  element.addEventListener('click', (e: MouseEvent) => {
    pos.x = e.pageX
    pos.y = e.pageY
  })
  return pos
}

if (canvas) {
  canvas.width = window.screen.width
  canvas.height = window.screen.height
  const context = canvas.getContext('2d')

  const arrow = new Arrow()
  arrow.x = canvas.width / 2
  arrow.y = canvas.height / 2

  const mousePos = getClickPos(canvas)

  let then = 0
  if (context) {
    const drawFrame = (time: number) => {
      stats.begin()

      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTimeInSeconds = timeInSeconds - then // 每帧的间隔时间，单位s
      then = timeInSeconds

      context.clearRect(0, 0, canvas.width, canvas.height)
      const dx = mousePos.x - arrow.x
      const dy = mousePos.y - arrow.y
      const angle = Math.atan2(dy, dx)

      arrow.x += v * Math.cos(angle) * deltaTimeInSeconds
      arrow.y += v * Math.sin(angle) * deltaTimeInSeconds
      arrow.rotation = angle

      arrow.draw(context)

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}
```

![](https://gw.alicdn.com/imgextra/i3/O1CN01gJ80VJ1rJQckivf2K_!!6000000005610-1-tps-386-416.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/20-arrow-to-tap/](https://gaohaoyang.github.io/canvas-practice/20-arrow-to-tap/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/20-arrow-to-tap/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/20-arrow-to-tap/index.ts)

## 总是跟随鼠标的箭头

要实现这个demo，只需将上述的点击事件换为 mousemove 事件即可

```js
import stats from '../common/stats'
import Arrow from '../common/Arrow'
import { captureMouse } from '../common/utils'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const v = 100 // 速度 10 像素/s

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const context = canvas.getContext('2d')

  const arrow = new Arrow()
  arrow.x = canvas.width / 2
  arrow.y = canvas.height / 2

  const mousePos = captureMouse(canvas)

  let then = 0
  if (context) {
    const drawFrame = (time: number) => {
      stats.begin()

      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTimeInSeconds = timeInSeconds - then // 每帧的间隔时间，单位s
      then = timeInSeconds

      context.clearRect(0, 0, canvas.width, canvas.height)
      const dx = mousePos.x - arrow.x
      const dy = mousePos.y - arrow.y
      const angle = Math.atan2(dy, dx)

      arrow.x += v * Math.cos(angle) * deltaTimeInSeconds
      arrow.y += v * Math.sin(angle) * deltaTimeInSeconds
      arrow.rotation = angle

      arrow.draw(context)

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}
```

![](https://gw.alicdn.com/imgextra/i1/O1CN01N54hn51LLeqZXexj4_!!6000000001283-1-tps-637-482.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/21-arrow-to-mouse-move/](https://gaohaoyang.github.io/canvas-practice/21-arrow-to-mouse-move/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/21-arrow-to-mouse-move/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/21-arrow-to-mouse-move/index.ts)

# 加速度

中学物理中，加速运动的位移一般是通过连续时间变量来计算的，但 canvas 绘图中我们更多的是使用每一帧之间的时间片段。我们先回顾一下基于连续时间的加速度。
## 基于连续时间的加速度

匀加速直线运动的速度公式

$$
v_t = v_0 + at
$$

匀加速直线运动的位移公式

$$
x = \dfrac{v_0+v_t}{2}t = v_0t + \dfrac{1}{2}at^2
$$

示例

```js
import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const v0x = 60 // x 方向初速度， 单位 像素/s
const v0y = 0 // x 方向初速度， 单位 像素/s
const ax = 0 // x 方向加速度， 单位 像素/s^2
const ay = 600 // y 方向加速度， 单位 像素/s^2
const x0 = 60 // 初始位置
const y0 = 20

if (canvas) {
  canvas.width = window.screen.width
  canvas.height = window.screen.height
  const context = canvas.getContext('2d')

  const ball = new Ball(10, '#1E88E5')
  if (context) {
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位

      context.clearRect(0, 0, canvas.width, canvas.height)
      ball.x = v0x * timeInSeconds + (1 / 2) * ax * timeInSeconds ** 2 + x0
      ball.y = v0y * timeInSeconds + (1 / 2) * ay * timeInSeconds ** 2 + y0

      ball.draw(context)

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}
```

效果如下

![](https://gw.alicdn.com/imgextra/i2/O1CN01XzDaWR1iPXMkVGGS8_!!6000000004405-1-tps-655-482.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/22-accelerate/](https://gaohaoyang.github.io/canvas-practice/22-accelerate/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/22-accelerate/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/22-accelerate/index.ts)

## 基于每帧间隔时间的加速运动

```js
import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const v0x = 60 // x 方向初速度， 单位 像素/s
const v0y = 0 // x 方向初速度， 单位 像素/s
const ax = 0 // x 方向加速度， 单位 像素/s^2
const ay = 600 // y 方向加速度， 单位 像素/s^2
const x0 = 60 // 初始位置
const y0 = 20

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight
  const context = canvas.getContext('2d')

  const ball = new Ball(10, '#1E88E5')
  ball.x = x0
  ball.y = y0
  let vx = v0x
  let vy = v0y

  if (context) {
    let then = 0
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTime = timeInSeconds - then
      then = timeInSeconds

      context.clearRect(0, 0, canvas.width, canvas.height)

      vx += ax * deltaTime
      vy += ay * deltaTime

      ball.x += vx * deltaTime
      ball.y += vy * deltaTime

      // ball.x = v0x * timeInSeconds + (1 / 2) * ax * timeInSeconds ** 2 + x0
      // ball.y = v0y * timeInSeconds + (1 / 2) * ay * timeInSeconds ** 2 + y0

      ball.draw(context)

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}
```

![](https://gw.alicdn.com/imgextra/i2/O1CN01zoFULK1Umz1Dcu23D_!!6000000002561-1-tps-655-482.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/23-accelerate-time/](https://gaohaoyang.github.io/canvas-practice/23-accelerate-time/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/23-accelerate-time/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/23-accelerate-time/index.ts)

## 使用方向键控制小球加速

```js
import stats from '../common/stats'
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const v0x = 0 // x 方向初速度， 单位 像素/s
const v0y = 0 // x 方向初速度， 单位 像素/s
let ax = 0 // x 方向加速度， 单位 像素/s^2
let ay = 0 // y 方向加速度， 单位 像素/s^2
const x0 = window.innerWidth / 2 // 初始位置
const y0 = window.innerHeight / 2

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    console.log(e.key)
    switch (e.key) {
      case 'ArrowLeft':
        ax = -100
        break
      case 'ArrowRight':
        ax = 100
        break
      case 'ArrowUp':
        ay = -100
        break
      case 'ArrowDown':
        ay = 100
        break
      default:
        break
    }
  })
  document.addEventListener('keyup', () => {
    ax = 0
    ay = 0
  })

  const context = canvas.getContext('2d')

  const ball = new Ball(10, '#1E88E5')
  ball.x = x0
  ball.y = y0
  let vx = v0x
  let vy = v0y

  if (context) {
    let then = 0
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTime = timeInSeconds - then
      then = timeInSeconds

      context.clearRect(0, 0, canvas.width, canvas.height)

      vx += ax * deltaTime
      vy += ay * deltaTime

      ball.x += vx * deltaTime
      ball.y += vy * deltaTime

      ball.draw(context)
      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}
```

![](https://gw.alicdn.com/imgextra/i3/O1CN01RaTyZG1dYd9JEIiDS_!!6000000003748-1-tps-655-482.gif)


demo 链接 [https://gaohaoyang.github.io/canvas-practice/24-ctrl-ball-accelerate/](https://gaohaoyang.github.io/canvas-practice/24-ctrl-ball-accelerate/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/24-ctrl-ball-accelerate/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/24-ctrl-ball-accelerate/index.ts)

### 添加重力加速度

真实世界中，物体总是受到向下的重力，如果我们想模拟这个场景，只需要在上个示例中添加2行代码，让小球总有一个向下的加速度，如下

```js
const gravity = 50

...

vy += gravity * deltaTime
```

![](https://gw.alicdn.com/imgextra/i4/O1CN01LnDwrw1Wn6LsQ02gV_!!6000000002832-1-tps-655-482.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/25-ctrl-ball-accelerate-gravity/](https://gaohaoyang.github.io/canvas-practice/25-ctrl-ball-accelerate-gravity/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/25-ctrl-ball-accelerate-gravity/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/25-ctrl-ball-accelerate-gravity/index.ts)

## 宇宙飞船

使用本章前面学到的知识，实现一个模拟宇宙飞船正常飞行的能力吧

首先绘制宇宙飞船，新建一个 `Ship` 类，代码如下

```js
/* eslint-disable no-param-reassign */
class Ship {
  x = 0

  y = 0

  width = 25

  height = 20

  rotation = 0

  showFlame = true

  /**
   * draw
   */
  public draw(c: CanvasRenderingContext2D) {
    c.save()
    c.translate(this.x, this.y)
    c.rotate(this.rotation)
    c.lineWidth = 1
    c.strokeStyle = '#ffffff'
    c.beginPath()
    c.moveTo(10, 0)
    c.lineTo(-10, 10)
    c.lineTo(-5, 0)
    c.lineTo(-10, -10)
    c.lineTo(10, 0)
    c.stroke()

    if (this.showFlame) {
      c.beginPath()
      c.moveTo(-7.5, -5)
      c.lineTo(-15, 0)
      c.lineTo(-7.5, 5)
      c.stroke()
    }

    c.restore()
  }
}

export default Ship
```

将其先绘制到 canvas 上看看

```js
import Ship from '../common/Ship'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const x0 = window.innerWidth / 2 // 初始位置
const y0 = window.innerHeight / 2

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const context = canvas.getContext('2d')

  const ship = new Ship()
  ship.x = x0
  ship.y = y0

  if (context) {
    ship.draw(context)
  }
}
```

效果如下

![](https://gw.alicdn.com/imgextra/i1/O1CN01ZvIGVq1XWtxemEsoo_!!6000000002932-2-tps-1162-660.png)

有喷射火焰时：

![](https://gw.alicdn.com/imgextra/i4/O1CN01bo4Qk51fiMnn7paOE_!!6000000004040-2-tps-1086-578.png)

接下来写控制逻辑，飞船有3中控制方式左转、右转、点火，代码如下：

```js
import stats from '../common/stats'
import Ship from '../common/Ship'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

const aRotation = 80 // 飞船旋转角加速度
const aThrust = 50 // 推进加速度
const x0 = window.innerWidth / 2 // 初始位置
const y0 = window.innerHeight / 2

let aRotationShip = 0 // 旋转角加速度
let vRotationShip = 0 // 旋转角速度
let aThrustShip = 0 // 推进加速度
let vThrustShip = 0 // 推进速度

if (canvas) {
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight

  const ship = new Ship()
  ship.x = x0
  ship.y = y0

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    console.log(e.key)
    switch (e.key) {
      case 'ArrowLeft':
        aRotationShip = -aRotation
        break
      case 'ArrowRight':
        aRotationShip = aRotation
        break
      case 'ArrowUp':
        aThrustShip = aThrust
        ship.showFlame = true
        break
      case 'ArrowDown':
        aThrustShip = -aThrust
        break
      default:
        break
    }
  })
  document.addEventListener('keyup', () => {
    aRotationShip = 0
    aThrustShip = 0
    ship.showFlame = false
  })

  const context = canvas.getContext('2d')

  if (context) {
    let then = 0
    const drawFrame = (time: number) => {
      stats.begin()
      const timeInSeconds = time / 1000 // 将毫秒转为秒单位
      const deltaTime = timeInSeconds - then
      then = timeInSeconds

      context.clearRect(0, 0, canvas.width, canvas.height)

      vRotationShip += aRotationShip * deltaTime
      ship.rotation += (vRotationShip * deltaTime * Math.PI) / 180

      vThrustShip += aThrustShip * deltaTime
      if (vThrustShip <= 0) {
        vThrustShip = 0
      }
      const angle = ship.rotation
      ship.x += vThrustShip * deltaTime * Math.cos(angle)
      ship.y += vThrustShip * deltaTime * Math.sin(angle)

      ship.draw(context)

      stats.end()
      window.requestAnimationFrame(drawFrame)
    }
    drawFrame(0)
  }
}
```

![](https://gw.alicdn.com/imgextra/i3/O1CN01ykyUOq1ESniMhv3OO_!!6000000000351-1-tps-655-482.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/26-space-ship/index.html](https://gaohaoyang.github.io/canvas-practice/26-space-ship/index.html)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/26-space-ship/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/26-space-ship/index.ts)

可以看到代码中先监听了键盘事件，将旋转角加速度常量值赋给真正飞船的旋转角加速度。然后根据角加速度算出飞船每帧的旋转角度

```js
vRotationShip += aRotationShip * deltaTime // 计算角速度
ship.rotation += (vRotationShip * deltaTime * Math.PI) / 180 // 计算角度
```

对于飞船喷射逻辑，我们也监听了键盘事件，将推进加速度常量赋值给飞船的推进加速度。然后通过飞船加速度计算得出飞船速度。

```js
vThrustShip += aThrustShip * deltaTime // 计算出飞船速度
if (vThrustShip <= 0) {
  vThrustShip = 0
}
```

注意这里我们增加了判断飞船可以一直减速，但不能倒退。然后再根据飞船的速度和角度，计算出飞船x、y方向上的位移

```js
const angle = ship.rotation
ship.x += vThrustShip * deltaTime * Math.cos(angle)
ship.y += vThrustShip * deltaTime * Math.sin(angle)
```

# 总结

匀速直线运动

```
s = v * t + s0 // 速度 乘 时间 加 初始位置
```

即

$$
s = vt
$$

获取速度分量的方式

```js
vx = 某个方向的速度 * cos(该方向的角度)
vy = 某个方向的速度 * sin(该方向的角度)

ball.x = v * Math.cos((alpha * Math.PI) / 180) * timeInSeconds + x0
ball.y = v * Math.sin((alpha * Math.PI) / 180) * timeInSeconds + y0
```

加速度

```js
s = v0 * t + (1 / 2) * a * t ^ 2
```

$$
x = \dfrac{v_0+v_t}{2}t = v_0t + \dfrac{1}{2}at^2
$$

但在真正的动画开发中，经常会使用每帧的时间间隔来计算画面内物体的位移。这样做有2个好处

1. 便于处理每帧内的实时变化，例如加速度改变、速度改变，直接得出当前帧内的位移情况，进行累加
2. 在不同刷新率的手机上，保证物体运动速度一致

因此物体速度一般可以如下表示

```js
x += v * deltaTime
```

对于速度向量来说，可以使用三角函数进行计算物体的位移

```js
x += v * deltaTime * Math.cos(angle)
y += v * deltaTime * Math.sin(angle)
```

如果是加速运动，可以先算出通过加速度计算出速度，再使用速度计算出位移

```js
v += a * deltaTime
x += v * deltaTime
```

最后的宇宙飞船示例中，还引入了角加速度的概念，与普通加速度类似，我们在计算的时候也是先将其转换为角速度，再转换为角度。

```js
vRotation += aRotation * deltaTime // 计算角速度
ship.rotation += (vRotation * deltaTime * Math.PI) / 180 // 计算角度
```

另外在示例中我们还引入了重力加速度的概念，重力加速度无非就是在 y 方向上计算速度时再引入一个加速度变量

```js
const gravity = 50

...

vy += gravity * deltaTime
```

学习了速度与加速度的概念和计算方式，后续就可以开发更多的动画了！
