---
layout: post
title:  "Three.js 之 3 画布与全屏"
categories: Three.js
tags:  Three.js WebGL
author: HyG
---

* content
{:toc}

本系列为 [Three.js journey](https://threejs-journey.com/) 教程学习笔记。

画布充满窗口，resize，像素比，双击全屏等功能





# 画布充满窗口

让画布充满窗口需要设置尺寸，可以使用 `window.innerWidth` 属性，同时移除 canvas 标签上设置的宽高

html 代码如下

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>08 fullscreenAndResizing</title>
  </head>

  <body>
    <canvas id="mainCanvas" class="webgl"></canvas>
    <script src="<%= path %>" charset="utf-8"></script>
  </body>
</html>
```

js 代码如下

```js
// Size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}
```

使用 `innerWidth, innerHeight` 获取视口的宽高。

同时需要设置一些标签的 CSS 属性，如下

```css
html,
body {
  overflow: hidden; /* 避免滚动时出现问题 */
}

body {
  margin: 0;
  padding: 0;
}

.webgl {
  position: fixed;
  top: 0;
  left: 0;
  outline: none;
}
```

这样我们的画布就完整的充满屏幕了

![](https://gw.alicdn.com/imgextra/i1/O1CN011jnNUh1CgsiTbgyrd_!!6000000000111-1-tps-395-679.gif)

# resize

考虑到 resize 窗口时的处理，需要监听 resize 事件

```js
window.addEventListener('resize', () => {
  // update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // update renderer
  renderer.setSize(sizes.width, sizes.height)
})
```

![](https://gw.alicdn.com/imgextra/i3/O1CN01M3QBa41mTRG2mLEwa_!!6000000004955-1-tps-924-667.gif)

在线 [demo 链接](https://gaohaoyang.github.io/threeJourney08-fullscreenAndResizing/)

[demo 源码](https://github.com/Gaohaoyang/threeJourney/tree/main/src08-fullscreenAndResizing)

# pixel ratio 像素比

可以看到屏幕上立方体的边缘出现了锯齿，这是像素比问题，我们可以通过设置像素比解决这个问题

```js
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
```

不需要设置过高，过高的像素比设定可能会带来性能问题，最大值设置为 2 已经能满足绝大部分场景了。

同时需要设置在 `resize` 事件中，因为有可能用户使用显示器连接多块像素比不同的屏幕，我们将页面拖动到另一个屏幕中时，需要赋予新的像素比

```diff
window.addEventListener('resize', () => {
  // update sizes
  sizes.width = window.innerWidth
  sizes.height = window.innerHeight

  // update camera
  camera.aspect = sizes.width / sizes.height
  camera.updateProjectionMatrix()

  // update renderer
  renderer.setSize(sizes.width, sizes.height)
+  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})
```

在线 [demo 链接](https://gaohaoyang.github.io/threeJourney08-fullscreenAndResizing/)

[demo 源码](https://github.com/Gaohaoyang/threeJourney/tree/main/src08-fullscreenAndResizing)

# 全屏

用户一般习惯双击全屏，所以我们要监听双击事件

```js
window.addEventListener('dblclick', () => {
  if (document.fullscreenElement) {
    document.exitFullscreen()
  } else {
    canvas.requestFullscreen()
  }
})
```

添加如上的代码，就完成了双击进入全屏，再次双击退出全屏。为了解决 safari 浏览器的兼容问题，需要加 `webkit` 前缀

```js
window.addEventListener('dblclick', () => {
  const fullscreenElement = document.fullscreenElement || document.webkitFullscreenElement
  if (fullscreenElement) {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else {
      document.webkitExitFullscreen()
    }
  } else {
    if (canvas.requestFullscreen) {
      canvas.requestFullscreen()
    } else {
      canvas.webkitRequestFullscreen()
    }
  }
})
```

完整代码和 demo 如下

在线 [demo 链接](https://gaohaoyang.github.io/threeJourney08-fullscreenAndResizing/)

[demo 源码](https://github.com/Gaohaoyang/threeJourney/tree/main/src08-fullscreenAndResizing)

# 小结

本节我们学习了设置满屏画布、resize 时适配、高分辨率屏幕像素比、双击全屏等功能。下一节讲讲几何体。


