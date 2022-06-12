---
layout: post
title:  "Three.js 之 5 debug UI"
categories: Three.js
tags:  Three.js WebGL
author: HyG
---

* content
{:toc}

本系列为 [Three.js journey](https://threejs-journey.com/) 教程学习笔记。

本节将学习 debug UI。用于实时方便调整动画或物体的各种参数。我们可以自己开发，也可以使用一个三方库，这里我们选择使用现成的库。




常见的库有

- dat.GUI
- control-panel
- ControlKit
- Guify
- Oui

# dat.GUI

我们将学习 [dat.GUI](https://github.com/dataarts/dat.gui)，这个 debugUI 的 api 也非常简单可以直接参考 [api文档](https://github.com/dataarts/dat.gui/blob/master/API.md)

我们添加如下代码

```js
/**
 * Debug
 */
const gui = new dat.GUI({
  // closed: true,
  width: 400,
})
// gui.hide() // press H to show

gui.add(cubeMesh.position, 'y').min(-3).max(3).step(0.01)
  .name('cubeMesh Y') // 别名
gui.add(cubeMesh.position, 'x').min(-3).max(3).step(0.01)
gui.add(cubeMesh.position, 'z').min(-3).max(3).step(0.01)

gui.add(cubeMesh, 'visible') // boolean
gui.add(cubeMesh.material, 'wireframe') // boolean

const debugObj = {
  color: defaultColor,
  spin() {
    gsap.to(cubeMesh.rotation, {
      duration: 1,
      y: cubeMesh.rotation.y + Math.PI * 2,
    })
  },
}

gui.addColor(debugObj, 'color').onChange((e) => {
  cubeMesh.material.color.set(e)
})

gui.add(debugObj, 'spin') // function
```

效果如下

![](https://gw.alicdn.com/imgextra/i4/O1CN014PYQlU1eZprccV5TV_!!6000000003886-2-tps-410-224.png)

动态演示

![](https://gw.alicdn.com/imgextra/i2/O1CN01ITDxTh1rEqit3lgtY_!!6000000005600-1-tps-1131-581.gif)

完整代码和 demo 如下

在线 [demo 链接](https://gaohaoyang.github.io/threeJourney/10-debugUI/)

[demo 源码](https://github.com/Gaohaoyang/threeJourney/tree/main/src/10-debugUI)

# 小结

项目开发的过程中就可以添加 debug UI，开发过程可以不断调整，找到最佳值。

