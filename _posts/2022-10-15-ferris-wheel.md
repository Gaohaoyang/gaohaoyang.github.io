---
layout: post
title:  "摩天轮动画的实现揭秘"
categories: JavaScript
tags:  Animation
author: HyG
---

* content
{:toc}

摩天轮动画的实现揭秘

![](https://gw.alicdn.com/imgextra/i2/O1CN01WMJfsa23yty2Z4YOn_!!6000000007325-1-tps-600-329.gif)

恰好近期业务上开发了类似这样的摩天轮动画，我将其中的实现原理分享给大家。摩天轮动画主要分为 2 部分，一个是摩天轮上每个房间位置布局，另一个就是旋转动画了。





# 摩天轮布局

我们需要将每个车厢均匀的布局在一个圆环上，这需要一些三角函数的知识。

以圆心为原点，半径为r，则正多边形的第1个顶点坐标为 `(rcosθ, rsinθ)`，其中 `θ` 可以看做是 `360/多边形边数`。第2个顶点坐标为 `(rcos2θ, rsin2θ)`，如下图

![](https://gw.alicdn.com/imgextra/i1/O1CN01vucWNA1GKg0lvyXPs_!!6000000000604-2-tps-807-585.png)

还需要注意 JavaScript 使用弧度制，而非角度，因此我们需要转换一下

`degree2Radian.ts`

```js
/**
 * 角度转为弧度
 * @param radius 角度
 * @returns 弧度
 */
const getRadian = (radius: number) => (radius * Math.PI) / 180

export default getRadian
```

各个顶点坐标定位如下

```js
import degree2Radian from './degree2Radian'

/**
 * 获取位置
 * @param r 半径
 * @param count 个数
 */
const getPos = (r: number, count: number) => {
  const angleRadian = degree2Radian(360 / count)
  const res: Array<{
    x: number
    y: number
  }> = []
  for (let i = 0; i < count; i += 1) {
    res.push({
      x: r * Math.cos(angleRadian * i),
      y: r * Math.sin(angleRadian * i),
    })
  }
  return res
}

export default getPos
```

我们尝试使用其渲染一下

{% raw %}
```jsx
<div className={styles.ferris}>
  <div className={styles.wheel} ref={wheelDomRef}>
    <div className={styles.roomsArea}>
      {
        getPos(202 / 2, 8).map((item, index) => (
          <div
            key={index}
            className={`${styles.room} wheelRooms`}
            style={{
              top: `${item.y}px`,
              left: `${item.x - 20}px`,
            }}
          />
        ))
      }
    </div>
  </div>
  <div className={styles.bottom} />
</div>
```
{% endraw %}

注意 left 值，我们减去了自身宽度的一半保证居中

![](https://gw.alicdn.com/imgextra/i4/O1CN01Whjysk1U1oJbwgmcm_!!6000000002458-2-tps-756-420.png)

我们可以通过控制 UI 来设置多个车厢，验证没有问题。

![](https://gw.alicdn.com/imgextra/i4/O1CN01YbapA224kX9sxhCZh_!!6000000007429-1-tps-600-354.gif)

# 摩天轮旋转动画

接下来我们看看动画部分，这里动画的可以拆解为2部分，一个是主轮的旋转，另一个是周围的车厢要同步反向旋转。如下图

![](https://gw.alicdn.com/imgextra/i1/O1CN01cMfM4F1yTEVAdKWjz_!!6000000006579-2-tps-538-549.png)

这里我们使用 anime.js 这个动画库来实现

使用 anime 动画库的原因是：
- 代码简洁，api完善，便于控制暂停播放
- 时间线 api，保证2部分动画同步
- 适配高刷屏，不会出现倍速问题
- anime.js 很小，17k，gzip后8.2k

核心代码如下，可以看到代码真的非常简洁。

```js
this.timeline = anime.timeline({
  easing: 'linear',
  duration: 8000,
  loop: true,
  autoplay: autoPlay,
})
this.timeline
  .add({
    targets: this.wheelDom,
    rotate: 360,
  })
  .add(
    {
      targets: this.roomsDoms,
      rotate: -360,
    },
    0,
  )
```

我们使用了时间线 api，将大轮和车厢进行相反方向旋转。

并且要注意，要设置车厢的顶部中间为旋转圆心，有一种悬吊的感觉。

```css
transform-origin: top center;
```

再添加一些动画播放控制的功能，stop、play、reverse、reset 等，在生产环境中可能会有用，例如在页面滚动到可视区外，或页面上有弹窗弹出时，我们可以暂停动画以提升页面运行时的性能。

最终 demo

![](https://gw.alicdn.com/imgextra/i1/O1CN01vMIISX1GHvdQCHvsB_!!6000000000598-1-tps-500-281.gif)

可扫码访问

![](https://gw.alicdn.com/imgextra/i1/O1CN01g3TIqr1SEySyIIqeC_!!6000000002216-2-tps-200-200.png)

在线 [demo 链接](https://gaohaoyang.github.io/demos/#/FerrisWheel)

[demo 源码](https://github.com/Gaohaoyang/demos/tree/main/src/FerrisWheel)

最后附一张生产环境的引用截图，很不错吧~

![](https://gw.alicdn.com/imgextra/i2/O1CN01yfrf7X1yNHM49XI9g_!!6000000006566-1-tps-320-398.gif)

# 小结

本文主要分析了如何开发一个摩天轮动画，包含摩天轮车厢的布局和旋转动画部分，复习了一点点三角函数的知识，创作出了非常棒的动画效果~
