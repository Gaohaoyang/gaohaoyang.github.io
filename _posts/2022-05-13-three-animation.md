---
layout: post
title:  "Three.js 之 1 Animation 动画"
categories: Three.js
tags:  Three.js WebGL
author: HyG
---

* content
{:toc}

本系列为 [Three.js journey](https://threejs-journey.com/) 教程学习笔记。

Animation 动画

Three.js 中的动画与其他 Canvas 动画类似，都是使用了 `requestAnimationFrame` api，接下来就详细讲讲基于时间间隔动画、Threejs 内置的时钟、以及第三方动画库





# 基于时间间隔

为了避免高刷屏上动画速度变快，我们需要把动画播放与时间关联，而非帧数关联。

可以使用 requestAnimationFrame 获取时间差，动画基于这个时间差

```js
import * as THREE from 'three'
import stats from '../common/stats'

// Canvas
const canvas = document.querySelector('#mainCanvas') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()

// Object
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
  }),
)
scene.add(cube)

// Camera
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight)
camera.position.set(1, 1, 3)
camera.lookAt(cube.position)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(canvas.clientWidth, canvas.clientHeight)

// Time
let time = Date.now()

// Animations
const tick = (currentTime: number) => {
  stats.begin()
  const deltaTime = currentTime - time
  time = currentTime

  cube.rotation.y += 0.001 * deltaTime

  // Render
  renderer.render(scene, camera)
  stats.end()
  requestAnimationFrame(tick)
}

tick(0)
```

效果如下：可以看到左上角的帧数为 144

![](https://gw.alicdn.com/imgextra/i4/O1CN01H1wK4125cZrNhDT7v_!!6000000007547-1-tps-774-559.gif)

# 基于 THREE 内置的 Clock

## `clock.getDelta()` 实现动画

```js
import * as THREE from 'three'
import stats from '../common/stats'

// Canvas
const canvas = document.querySelector('#mainCanvas') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()

// Object
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
  }),
)
scene.add(cube)

// Camera
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight)
camera.position.set(1, 1, 3)
camera.lookAt(cube.position)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(canvas.clientWidth, canvas.clientHeight)

// Clock
const clock = new THREE.Clock()

// Animations
const tick = () => {
  stats.begin()

  const delta = clock.getDelta()

  cube.rotation.y += 1 * delta

  // Render
  renderer.render(scene, camera)
  stats.end()
  requestAnimationFrame(tick)
}

tick()
```

效果同上一个 demo

关于 [Clock 详见 threejs 文档](https://threejs.org/docs/index.html#api/zh/core/Clock)

该对象用于跟踪时间。如果 performance.now 可用，则 Clock 对象通过该方法实现，否则回落到使用略欠精准的 Date.now 来实现。所以基于 three.js 内置的 Clock 理论上应该会比上一个示例更加精准

- `.getElapsedTime () : Float`
获取自时钟启动后的秒数，同时将 .oldTime 设置为当前时间。
如果 .autoStart 设置为 true 且时钟并未运行，则该方法同时启动时钟。

- `.getDelta () : Float`
获取自 .oldTime 设置后到当前的秒数。 同时将 .oldTime 设置为当前时间。
如果 .autoStart 设置为 true 且时钟并未运行，则该方法同时启动时钟。

## `getElapsedTime()` 实现圆周运动

使用三角函数，可以让物体在三维空间做圆周运动

效果如下

![](https://gw.alicdn.com/imgextra/i1/O1CN01TjqFGj1bmi9IsZHXa_!!6000000003508-1-tps-774-559.gif)

```js
import * as THREE from 'three'
import stats from '../common/stats'

// Canvas
const canvas = document.querySelector('#mainCanvas') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()

// Object
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x607D8B,
  }),
)
scene.add(cube)

// Camera
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight)
camera.position.set(0, 0, 3)
camera.lookAt(cube.position)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(canvas.clientWidth, canvas.clientHeight)

// Clock
const clock = new THREE.Clock()

// Animations
const tick = () => {
  stats.begin()

  const elapsedTime = clock.getElapsedTime()

  cube.position.y = Math.sin(elapsedTime)
  cube.position.x = Math.cos(elapsedTime)

  // Render
  renderer.render(scene, camera)
  stats.end()
  requestAnimationFrame(tick)
}

tick()
```

其中核心代码是这 2 行

```js
cube.position.y = Math.sin(elapsedTime)
cube.position.x = Math.cos(elapsedTime)
```

当然我们也可以让物体不动，让相机运动出现的效果相同

```js
camera.position.y = Math.sin(elapsedTime)
camera.position.x = Math.cos(elapsedTime)
```

### 让相机总是指向方块

还可以让相机在圆周运动的同时总是指向物体，效果如下

```js
// Animations
const tick = () => {
  stats.begin()

  const elapsedTime = clock.getElapsedTime()

  camera.position.y = Math.sin(elapsedTime)
  camera.position.x = Math.cos(elapsedTime)
  camera.lookAt(cube.position)

  // Render
  renderer.render(scene, camera)
  stats.end()
  requestAnimationFrame(tick)
}
```

![](https://gw.alicdn.com/imgextra/i4/O1CN016LKeoi1Z02piuD3Ut_!!6000000003131-1-tps-774-559.gif)

## 使用 GSAP 实现动画

除了手写位移或三角函数实现动画外，也可以使用第三方库来实现，例如下个例子使用了 GSAP

```js
import * as THREE from 'three'
import gsap from 'gsap'
import stats from '../common/stats'

// Canvas
const canvas = document.querySelector('#mainCanvas') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()

// Object
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x607d8b,
  })
)
scene.add(cube)

// Camera
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight)
camera.position.set(0, 0, 3)
camera.lookAt(cube.position)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(canvas.clientWidth, canvas.clientHeight)

gsap.fromTo(
  cube.position,
  {
    x: -1.5,
  },
  {
    x: 1.5,
    duration: 1,
    yoyo: true,
    repeat: -1,
    ease: 'sine.inOut',
  },
)

// Animations
const tick = () => {
  stats.begin()

  // Render
  renderer.render(scene, camera)
  stats.end()
  requestAnimationFrame(tick)
}

tick()
```

![](https://gw.alicdn.com/imgextra/i3/O1CN01c9NKzu1a354heHmTI_!!6000000003273-1-tps-774-559.gif)

在线 [demo 链接](https://gaohaoyang.github.io/threeJourney/06-animation/)

[demo 源码](https://github.com/Gaohaoyang/threeJourney/tree/main/src/06-animation)

# 小结

我们已经学习了解了几个实现 Three.js 动画的方法，什么场景选择什么方案并没有标准答案，这取决于你的项目你熟悉的库等等因素。大部分情况使用三角函数能够解决大部分问题，但对于复杂的动画，就需要依赖动画库了。

下一节将讲讲 Camera 相机。
