---
layout: post
title:  "Three.js 之 2 Camera 相机"
categories: Three.js
tags:  Three.js WebGL
author: HyG
---

* content
{:toc}

本系列为 [Three.js journey](https://threejs-journey.com/) 教程学习笔记。

Camera 相机

查看 Three.js 的文档，可以看到 [Camera](https://threejs.org/docs/index.html#api/en/cameras/Camera) 是一个抽象类，一般不直接使用，其他类型的 Camera 实现了这个抽象类。有

- ArrayCamera 包含着一组子摄像机，常用于多人同屏的渲染，更好地提升VR场景的渲染性能
- StereoCamera 双透视摄像机（立体相机），常用于创建 3D 立体影像，比如 3D 电影之类或 VR
- CubeCamera 有6个渲染，分别是立方体的6个面，常用于渲染环境、反光等
- OrthographicCamera 正交相机，在这种投影模式下，无论物体距离相机距离远或者近，在最终渲染的图片中物体的大小都保持不变。这对于渲染2D场景或者UI元素是非常有用的。
- PerspectiveCamera 透视相机，这一投影模式被用来模拟人眼所看到的景象，它是3D场景的渲染中使用得最普遍的投影模式。





# PerspectiveCamera 透视相机

```js
PerspectiveCamera(fov : Number, aspect : Number, near : Number, far : Number)
```

- fov — 摄像机视锥体垂直视野角度
- aspect — 摄像机视锥体长宽比
- near — 摄像机视锥体近端面
- far — 摄像机视锥体远端面

这些参数一起定义了摄像机的 viewing frustum（视锥体）。

![](https://gw.alicdn.com/imgextra/i2/O1CN01PyRDNn1oe5asMv6pZ_!!6000000005249-2-tps-700-304.png)

透视图中，灰色的部分是视锥体，是可能被渲染的物体所在的区域。fov 是视锥体竖直方向上的张角（是角度制而非弧度制），如侧视图所示。

aspect 等于 width / height，是照相机水平方向和竖直方向长度的比值，通常设为 Canvas 的横纵比例。

near 和 far 分别是照相机到视锥体最近、最远的距离，均为正值，且 fa r应大于 near。

但请注意，不要将 near 和 far 设置为比较极端的数值，如 0.0001 和 99999，这可能引起 bug，让 threejs 无法分辨物体的前后，导致闪动

```js
import * as THREE from 'three'
// Canvas
const canvas = document.querySelector('#mainCanvas') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()

// Object
const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x607d8b,
  }),
)
scene.add(cube)

// Camera
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 1, 100)
camera.position.set(1, 1, 3)
camera.lookAt(cube.position)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(canvas.clientWidth, canvas.clientHeight)
renderer.render(scene, camera)
```

![](https://gw.alicdn.com/imgextra/i3/O1CN01eebvAJ26keSOXhdcV_!!6000000007700-2-tps-762-559.png)

# OrthographicCamera 正交相机

构造函数

```
OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
```

- left — 摄像机视锥体左侧面。
- right — 摄像机视锥体右侧面。
- top — 摄像机视锥体上侧面。
- bottom — 摄像机视锥体下侧面。
- near — 摄像机视锥体近端面。
- far — 摄像机视锥体远端面。

这些参数一起定义了摄像机的 viewing frustum（视锥体），下图灰色部分为 frustum，只有在视景体内部（下图中的灰色部分）的物体才可能显示在屏幕上，而视景体外的物体会在显示之前被裁减掉。

![](https://gw.alicdn.com/imgextra/i2/O1CN01hD4lrM1H1GhifTQiH_!!6000000000697-2-tps-700-632.png)

为了保持照相机的横竖比例，需要保证 `(right - left)` 与 `(top - bottom)` 的比例与 Canvas 宽度与高度的比例一致。

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
    color: 0x607d8b,
  }),
)
scene.add(cube)

// Camera
const aspectRatio = canvas.clientWidth / canvas.clientHeight
const camera = new THREE.OrthographicCamera(-1 * aspectRatio, 1 * aspectRatio, 1, -1, 1, 100)
camera.position.set(2, 2, 2)
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

效果如下：

![](https://gw.alicdn.com/imgextra/i1/O1CN01uwTnlt1jGCy7GzaiV_!!6000000004520-1-tps-774-559.gif)

# 相机控制

尝试用鼠标控制相机的位置，首先创建一个监听 mousemove 的事件工具函数

```js
export const captureMouse = (element: HTMLElement) => {
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
```

引入到画布中

```js
import * as THREE from 'three'
import stats from '../common/stats'
import { captureMouse } from '../common/utils'

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
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 1, 100)
camera.position.set(0, 0, 3)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(canvas.clientWidth, canvas.clientHeight)

// mouse postion
const mouse = captureMouse(canvas)

// Animations
const tick = () => {
  stats.begin()

  // Uppdate camera
  camera.position.x = (mouse.x / canvas.clientWidth - 0.5) * 4
  camera.position.y = -(mouse.y / canvas.clientWidth - 0.5) * 4

  // Render
  renderer.render(scene, camera)
  stats.end()
  requestAnimationFrame(tick)
}

tick()
```

效果如下

![](https://gw.alicdn.com/imgextra/i2/O1CN01arzuIS1KGKgQ7jXoq_!!6000000001136-1-tps-774-559.gif)

如果设置了 `camera.lookAt(cube.position)` 则效果如下：

```js
// Animations
const tick = () => {
  stats.begin()

  // Uppdate camera
  camera.position.x = (mouse.x / canvas.clientWidth - 0.5) * 4
  camera.position.y = -(mouse.y / canvas.clientWidth - 0.5) * 4
  camera.lookAt(cube.position)

  // Render
  renderer.render(scene, camera)
  stats.end()
  requestAnimationFrame(tick)
}
```

![](https://gw.alicdn.com/imgextra/i4/O1CN01tcaVl51ENJ19aFmxS_!!6000000000339-1-tps-774-559.gif)

看起来有点复杂，幸运的是 Three.js 内置了一些控制器

# Three.js 内置的控制器

- `FlyControls` 启用了一种类似于数字内容创建工具（例如Blender）中飞行模式的导航方式。 你可以在3D空间中任意变换摄像机，并且无任何限制（例如，专注于一个特定的目标）。
- `FirstPersonControls` 该类是 FlyControls 的另一个实现。
- `PointerLockControls` 该类的实现是基于Pointer Lock API的。 对于第一人称3D游戏来说， PointerLockControls 是一个非常完美的选择。
- `OrbitControls` （轨道控制器）可以使得相机围绕目标进行轨道运动。
- `TrackballControls` 与 OrbitControls 相类似。然而，它不能恒定保持摄像机的up向量。 这意味着，如果摄像机绕过“北极”和“南极”，则不会翻转以保持“右侧朝上”。
- `TransformControls` 该类可提供一种类似于在数字内容创建工具（例如Blender）中对模型进行交互的方式，来在3D空间中变换物体。 和其他控制器不同的是，变换控制器不倾向于对场景摄像机的变换进行改变。
- `DragControls` 该类被用于提供一个拖放交互。

接下来我们使用 OrbitControls

```js
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
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
const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 1, 100)
camera.position.set(0, 0, 3)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(canvas.clientWidth, canvas.clientHeight)

// Animations
const tick = () => {
  stats.begin()

  controls.update()
  // Render
  renderer.render(scene, camera)
  stats.end()
  requestAnimationFrame(tick)
}

tick()
```

其中设置了 enableDamping 开启阻尼，需要在 requestAnimationFrame update controls

```js
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
```

![](https://gw.alicdn.com/imgextra/i2/O1CN012ZXoZ31bYyGoroKdJ_!!6000000003478-1-tps-774-559.gif)

在线 [demo 链接](https://gaohaoyang.github.io/threeJourney/07-camera/)

[demo 源码](https://github.com/Gaohaoyang/threeJourney/tree/main/src/07-camera)

# 小结

我们已经学习了相机的概念和相机的一些控制器，什么时候使用内置控制器也取决于你的项目场景，不过内置的控制器已经能满足绝大部分场景了。

下一节将讲讲全屏和窗口大小。


