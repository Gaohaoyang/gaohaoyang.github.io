---
layout: post
title:  "canvas 绘图技术与图片处理"
categories: JavaScript
tags: 动画 Canvas 绘图 图片
author: HyG
mathjax: true
---

* content
{:toc}

本文将讲述一些 canvas 相关的绘图技术，其中包括：

- 绘图 API
- 图片加载
- 像素处理




# 绘图 API

相关 api 可参考，这里不展开详讲。

- [CanvasRenderingContext2D](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D)

<!-- ## 常用绘图 api

- 填充和描边样式
  - `strokeStyle`
    - `strokeStyle` 是 Canvas 2D API 描述画笔（绘制图形）颜色或者样式的属性。默认值是 #000。
  - `fillStyle`
    - `fillStyle` 是 Canvas 2D API 使用内部方式描述颜色和样式的属性。默认值是 #000 （黑色）。
- 绘制矩形
  - `fillRect(x, y, width, height)`
    - `fillRect()` 方法绘制一个填充了内容的矩形，这个矩形的开始点（左上点）在 `(x, y)` ，它的宽度和高度分别由 `width` 和 `height` 确定，填充样式由当前的 `fillStyle` 决定。
  - `strokeRect(x, y, width, height)`
    - `strokeRect()` 方法绘制一个描边矩形，其起点为(x, y) ，其大小由宽度和高度指定。
  - `clearRect(x, y, width, height)`
    - 设置指定矩形区域内（以 点 (x, y) 为起点，范围是(width, height) ）所有像素变成透明，并擦除之前绘制的所有内容。
- 绘制文本
  - `fillText(text, x, y, [maxWidth])`
    - 在(x,y)位置绘制（填充）文本。使用当前的 font, textAlign, textBaseline 和 direction 值对文本进行渲染。`maxWidth` 绘制的最大宽度。如果指定了值，并且经过计算字符串的值比最大宽度还要宽，字体为了适应会水平缩放（如果通过水平缩放当前字体，可以进行有效的或者合理可读的处理）或者使用小号的字体。
  - `strokeText(text, x, y [, maxWidth])`
    - 在(x,y)位置绘制（描边）文本。
  - `measureText(text)`
    - 返回 TextMetrics 对象。 -->


下面举几个示例

## 鼠标绘图

代码如下：

```html
<canvas id="mainCanvas" style="background-color: #fff;" width="800" height="400"></canvas>
```

```js
const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const context = canvas.getContext('2d')
  if (context) {
    const { offsetLeft, offsetTop } = canvas
    let x
    let y

    const mouseMoveHandler = (e: MouseEvent) => {
      x = e.pageX
      y = e.pageY
      x -= offsetLeft
      y -= offsetTop
      context.lineTo(x, y)
      context.lineCap = 'round'
      context.lineJoin = 'round'
      context.stroke()
    }

    canvas.addEventListener('mousedown', (e) => {
      context.beginPath()
      context.moveTo(e.pageX - offsetLeft, e.pageY - offsetTop)
      canvas.addEventListener('mousemove', mouseMoveHandler)
    })

    canvas.addEventListener('mouseup', () => {
      canvas.removeEventListener('mousemove', mouseMoveHandler)
    })
  }
}
```

效果如下

![](https://gw.alicdn.com/imgextra/i4/O1CN01Z3BgUp1dKtGTH8pIA_!!6000000003718-1-tps-789-380.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/09-mouse-draw/](https://gaohaoyang.github.io/canvas-practice/09-mouse-draw/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/09-mouse-draw/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/09-mouse-draw/index.ts)

## 绘制曲线

### 二次贝塞尔曲线

具体 api 可参考文档 [CanvasRenderingContext2D.quadraticCurveTo()](https://developer.mozilla.org/zh-CN/docs/Web/API/CanvasRenderingContext2D/quadraticCurveTo)

```
ctx.quadraticCurveTo(cpx, cpy, x, y);
```

它需要2个点。第一个点是控制点，第二个点是终点。起始点是当前路径最新的点，当创建二次贝赛尔曲线之前，可以使用 `moveTo()` 方法进行改变。

接下来实现一个 demo，用鼠标位置作为控制点，控制这个二次贝塞尔曲线。

```js
const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const context = canvas.getContext('2d')
  const { offsetLeft, offsetTop } = canvas

  const x0 = 300
  const y0 = 100
  const x1 = 600
  const y1 = 300

  if (context) {
    canvas.addEventListener('mousemove', (e) => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      const x = e.pageX - offsetLeft
      const y = e.pageY - offsetTop

      context.beginPath()
      context.moveTo(x0, y0)
      context.quadraticCurveTo(x, y, x1, y1)
      context.stroke()
    })
  }
}
```

效果如下

![](https://gw.alicdn.com/imgextra/i1/O1CN014ZVi8S1iP4xncnamu_!!6000000004404-1-tps-789-380.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/10-quadratic/](https://gaohaoyang.github.io/canvas-practice/10-quadratic/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/10-quadratic/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/10-quadratic/index.ts)

### 穿过控制点的二次贝塞尔曲线

```js
const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const context = canvas.getContext('2d')
  const { offsetLeft, offsetTop } = canvas

  const x0 = 300
  const y0 = 100
  const x1 = 600
  const y1 = 300

  if (context) {
    canvas.addEventListener('mousemove', (e) => {
      context.clearRect(0, 0, canvas.width, canvas.height)
      const x = e.pageX - offsetLeft
      const y = e.pageY - offsetTop

      const cpx = x * 2 - (x0 + x1) / 2
      const cpy = y * 2 - (y0 + y1) / 2

      context.beginPath()
      context.moveTo(x0, y0)
      context.quadraticCurveTo(cpx, cpy, x1, y1)
      context.stroke()
    })
  }
}
```

其核心是

```js
const cpx = x * 2 - (x0 + x1) / 2
const cpy = y * 2 - (y0 + y1) / 2
```

效果如下

![](https://gw.alicdn.com/imgextra/i1/O1CN0141W6VM1dv4YGBPGuG_!!6000000003797-1-tps-789-380.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/11-quadratic-through/](https://gaohaoyang.github.io/canvas-practice/11-quadratic-through/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/11-quadratic-through/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/11-quadratic-through/index.ts)

### 多条曲线

绘制平滑的曲线，用多个点控制

```js
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const ctx = canvas.getContext('2d')

  if (ctx) {
    const points = []
    const num = 4

    for (let i = 0; i < num; i += 1) {
      const ball = new Ball(2)
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      points.push({
        x,
        y,
      })
      ball.x = x
      ball.y = y
      ball.draw(ctx)
    }

    ctx.beginPath()
    ctx.moveTo(points[0].x, points[0].y)

    for (let i = 1; i < num - 2; i += 1) {
      const xAv = (points[i].x + points[i + 1].x) / 2
      const yAv = (points[i].y + points[i + 1].y) / 2
      ctx.quadraticCurveTo(points[i].x, points[i].y, xAv, yAv)
    }
    ctx.quadraticCurveTo(points[num - 2].x, points[num - 2].y, points[num - 1].x, points[num - 1].y)
    ctx.stroke()
  }
}
```

xAv, yAv 围边设置为循环中当前点和后续点的x,y坐标的平均值，这样就能绘制一条平滑的曲线了

效果如下

![](https://gw.alicdn.com/imgextra/i1/O1CN01IMWRyw1RDliYwzPpA_!!6000000002078-1-tps-789-380.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/12-multi-quadratic/](https://gaohaoyang.github.io/canvas-practice/12-multi-quadratic/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/12-multi-quadratic/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/12-multi-quadratic/index.ts)

### 闭合的多条曲线

```js
import Ball from '../common/Ball'

const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const ctx = canvas.getContext('2d')

  if (ctx) {
    const points = []
    const num = 4

    for (let i = 0; i < num; i += 1) {
      const ball = new Ball(2)
      const x = Math.random() * canvas.width
      const y = Math.random() * canvas.height
      points.push({
        x,
        y,
      })
      ball.x = x
      ball.y = y
      ball.draw(ctx)
    }

    const xAv1 = (points[0].x + points[num - 1].x) / 2
    const yAv1 = (points[0].y + points[num - 1].y) / 2

    ctx.beginPath()
    ctx.moveTo(xAv1, yAv1)

    for (let i = 0; i < num - 1; i += 1) {
      const xAv = (points[i].x + points[i + 1].x) / 2
      const yAv = (points[i].y + points[i + 1].y) / 2
      ctx.quadraticCurveTo(points[i].x, points[i].y, xAv, yAv)
    }
    ctx.quadraticCurveTo(points[num - 1].x, points[num - 1].y, xAv1, yAv1)
    ctx.stroke()
  }
}
```

![](https://gw.alicdn.com/imgextra/i2/O1CN01sXkKam1UQ5DPHL8Kf_!!6000000002511-1-tps-789-380.gif)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/13-multi-quadratic-close/](https://gaohaoyang.github.io/canvas-practice/13-multi-quadratic-close/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/13-multi-quadratic-close/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/13-multi-quadratic-close/index.ts)

## 图形与填充色

一般来说绘图顺序如下：

- beginPath 开始绘制
- moveTo 移动起点
- lineStyle 线样式
- fillStyle 填充样式
- lineTo 或 quadraticCurveTo 等绘制曲线
- closePath 闭合
- fill 填充
- stroke 描边

### 渐变色

`ctx.createLinearGradient(x0, y0, x1, y1)`

createLinearGradient() 方法需要指定四个参数，分别表示渐变线段的开始和结束点。

`ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)`

`arc()` 是 Canvas 2D API 绘制圆弧路径的方法。 圆弧路径的圆心在 (x, y) 位置，半径为 r ，根据anticlockwise （默认为顺时针）指定的方向从 startAngle 开始绘制，到 endAngle 结束。

```js
const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const ctx = canvas.getContext('2d')

  if (ctx) {
    ctx.beginPath()
    const gradient = ctx.createLinearGradient(100, 100, 200, 200)
    gradient.addColorStop(0, '#ff0000')
    gradient.addColorStop(1, '#000000')
    ctx.fillStyle = gradient
    ctx.fillRect(100, 100, 100, 100)

    const gradient2 = ctx.createLinearGradient(200, 200, 300, 300)
    gradient2.addColorStop(0, '#ff0000')
    gradient2.addColorStop(0.6, '#008880')
    gradient2.addColorStop(1, '#000000')
    ctx.fillStyle = gradient2
    ctx.fillRect(200, 200, 100, 100)

    const gradient3 = ctx.createRadialGradient(500, 200, 0, 500, 200, 100)
    gradient3.addColorStop(0, '#000000')
    gradient3.addColorStop(1, '#ff0000')
    ctx.arc(500, 200, 100, 0, 2 * Math.PI)
    ctx.fillStyle = gradient3
    ctx.fill()
  }
}
```

效果如下：

![](https://gw.alicdn.com/imgextra/i4/O1CN013amNZU1d9tlIvGgim_!!6000000003694-2-tps-1588-788.png)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/14-gradient/](https://gaohaoyang.github.io/canvas-practice/14-gradient/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/14-gradient/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/14-gradient/index.ts)

# 图片加载

有些场景，可能需要在 canvas 内绘制一张图片，接下来我们看看绘制图片的方式

## 绘制图片

```js
const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const img = new Image()
    img.src = 'https://gw.alicdn.com/imgextra/i2/O1CN01gR6ymq1dfV5RmYxYk_!!6000000003763-2-tps-658-411.png'
    img.addEventListener('load', () => {
      ctx.drawImage(img, 0, 0, 658, 329, 0, 0, 800, 400)
    })
  }
}
```

效果如下

![](https://gw.alicdn.com/imgextra/i2/O1CN01l8iuWx1dCBk4FiWnp_!!6000000003699-2-tps-1624-826.png)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/15-image/](https://gaohaoyang.github.io/canvas-practice/15-image/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/15-image/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/15-image/index.ts)

## 操作像素

接下来我们尝试将上述demo中的所有绿色像素移除，看看是什么效果

```js
const canvas: HTMLCanvasElement | null = document.querySelector('#mainCanvas')

if (canvas) {
  const ctx = canvas.getContext('2d')
  if (ctx) {
    const img = new Image()
    img.src = '../assets/1.png'
    img.addEventListener('load', () => {
      ctx.drawImage(img, 0, 0, 658, 329, 0, 0, canvas.width, canvas.height)

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const pixels = imageData.data
      for (let i = 0; i < pixels.length; i += 4) {
        pixels[i + 1] = 0
      }
      ctx.putImageData(imageData, 0, 0)
    })
  }
}
```

效果如下：

![](https://gw.alicdn.com/imgextra/i4/O1CN01xBiumq1CvXKhyFYn9_!!6000000000143-2-tps-800-400.png)

demo 链接 [https://gaohaoyang.github.io/canvas-practice/16-image-pixel/](https://gaohaoyang.github.io/canvas-practice/16-image-pixel/)

源码链接 [https://github.com/Gaohaoyang/canvas-practice/blob/main/src/16-image-pixel/index.ts](https://github.com/Gaohaoyang/canvas-practice/blob/main/src/16-image-pixel/index.ts)

# 总结

本文虽然没有涉及过多动画，但还是举例介绍了 canvas 2d 绘图的方式，并且介绍了如何加载图片与操作像素。这为后续的动画学习垫定了基础。
