---
layout: post
title:  "Three.js 之 9 Light 光"
categories: Three.js
tags:  Three.js WebGL
author: HyG
---

* content
{:toc}

本系列为 [Three.js journey](https://threejs-journey.com/) 教程学习笔记。

lights 光

我们之前学习了简单的添加光源到场景中。接下来就详细讲讲各种各样的光源、参数以及如何使用。





# 创建一组几何体

先创建一组几何体用于接受光照。使用 `MeshStandardMaterial` 因为最能真实反馈光效。并将粗糙度设置为 0.4 观察反射情况。并增加一点环境光 AmbientLight 否则会看不到物体。效果如下

![](https://gw.alicdn.com/imgextra/i4/O1CN01YL8T7W23EdwLVtEEP_!!6000000007224-2-tps-1146-511.png)

若看不清楚，可以只观察其 wireframe

![](https://gw.alicdn.com/imgextra/i3/O1CN018KnWPH1w3Sxe63JeC_!!6000000006252-2-tps-1138-503.png)

完整代码如下

```js
import * as THREE from 'three'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import * as dat from 'lil-gui'
import stats from '../common/stats'
import { listenResize, dbClkfullScreen } from '../common/utils'

// Canvas
const canvas = document.querySelector('#mainCanvas') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
// Material
const material = new THREE.MeshStandardMaterial()
material.metalness = 0
material.roughness = 0.4

// Objects
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material)
sphere.position.set(-1.5, 0, 0)

const cube = new THREE.Mesh(new THREE.BoxGeometry(0.75, 0.75, 0.75), material)

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 32, 64), material)
torus.position.set(1.5, 0, 0)

const plane = new THREE.Mesh(new THREE.PlaneGeometry(5, 5), material)
plane.rotation.set(-Math.PI / 2, 0, 0)
plane.position.set(0, -0.65, 0)

scene.add(sphere, cube, torus, plane)

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

// Size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.set(1, 1, 2)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.autoRotate = true
// controls.enabled = false

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

listenResize(sizes, camera, renderer)
dbClkfullScreen(document.body)

// Clock
const clock = new THREE.Clock()

// Animations
const tick = () => {
  stats.begin()

  const elapsedTime = clock.getElapsedTime()

  // Update Objects
  sphere.rotation.y = 0.1 * elapsedTime
  cube.rotation.y = 0.1 * elapsedTime
  torus.rotation.y = 0.1 * elapsedTime

  sphere.rotation.x = 0.15 * elapsedTime
  cube.rotation.x = 0.15 * elapsedTime
  torus.rotation.x = 0.15 * elapsedTime

  controls.update()
  // Render
  renderer.render(scene, camera)
  stats.end()
  requestAnimationFrame(tick)
}

tick()

/**
 * Debug
 */
const gui = new dat.GUI()

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
gui.add(material, 'wireframe')
```

# AmbientLight 环境光

环境光会均匀的照亮场景中的所有物体。

环境光不能用来投射阴影，因为它没有方向。

AmbientLight 继承自 Light，因此具有 Light 的公共属性

```
Object3D → Light → AmbientLight
```

因此在构造函数的声明变量也可以直接在其示例上修改，如下

```js
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
scene.add(ambientLight)

// Equals
const ambientLight = new THREE.AmbientLight()
ambientLight.color = new THREE.Color(0xffffff)
ambientLight.intensity = 0.5
scene.add(ambientLight)
```

可以在 gui 中增加一行观察环境光强度

```js
gui.add(ambientLight, 'intensity').min(0).max(1).step(0.001)
```

![](https://gw.alicdn.com/imgextra/i2/O1CN01iUHdcG20AZZbt0QGL_!!6000000006809-1-tps-1008-464.gif)

在现实世界中，如果使用光照射一个物体，物体的背面不是全黑的，这是因为会有墙面或其他物体反光。但是在 Three.js 中，由于性能问题，没有反光的特性，所以可以使用微弱的环境光 AmbientLight 来模拟这种反光。

# DirectionalLight 平行光

平行光是沿着特定方向发射的光。这种光的表现像是无限远,从它发出的光线都是平行的。常常用平行光来模拟太阳光 的效果; 太阳足够远，因此我们可以认为太阳的位置是无限远，所以我们认为从太阳发出的光线也都是平行的。平行光可以投射阴影。

我们在 demo 上增加平行光

```js
const directionalLight = new THREE.DirectionalLight('#ffffaa', 0.5)
scene.add(directionalLight)
```

效果如下

![](https://gw.alicdn.com/imgextra/i4/O1CN01KLXvbd1FLIufFKAug_!!6000000000470-2-tps-1127-403.png)

默认平行光是从顶部直射的，我们可以使用 position 属性设置位置

```js
const directionalLight = new THREE.DirectionalLight('#ffffaa', 0.5)
directionalLight.position.set(1, 0.25, 0)
scene.add(directionalLight)
```

![](https://gw.alicdn.com/imgextra/i3/O1CN01P8yquT1XFxNANPibM_!!6000000002895-2-tps-1132-408.png)


在线 [demo 链接](https://gaohaoyang.github.io/threeJourney/15-lights/)

可扫码访问

![](https://gw.alicdn.com/imgextra/i4/O1CN01e57rdB26UAD3byA7j_!!6000000007664-2-tps-200-200.png)

[demo 源码](https://github.com/Gaohaoyang/threeJourney/tree/main/src/15-lights)

可以看到光来自右侧。

我们暂时不考虑光线的传播距离，默认是来自无穷远，并发散到无穷远

# HemisphereLight 半球光

光源直接放置于场景之上，类似环境光 AmbientLight，但光照颜色从天空光线颜色渐变到地面光线颜色。

半球光不能投射阴影。

```js
const hemisphereLight = new THREE.HemisphereLight('#B71C1C', '#004D40', 0.6)
scene.add(hemisphereLight)
```

![](https://gw.alicdn.com/imgextra/i4/O1CN01zJl8gV1F6BqD1NogD_!!6000000000437-1-tps-1008-464.gif)

在线 [demo 链接](https://gaohaoyang.github.io/threeJourney/15-lights/)

可扫码访问

![](https://gw.alicdn.com/imgextra/i4/O1CN01e57rdB26UAD3byA7j_!!6000000007664-2-tps-200-200.png)

[demo 源码](https://github.com/Gaohaoyang/threeJourney/tree/main/src/15-lights)

# PointLight 点光源

从一个点向各个方向发射的光源。一个常见的例子是模拟一个灯泡发出的光。该光源可以投射阴影。

其特点是光源无线小，光线向各个方向传播。
- 第一个参数 color 是颜色
- intensity 是强度。
- distance 这个距离表示从光源到光照强度为0的位置。当设置为0时，光永远不会消失(距离无穷大)。缺省值 0.
- decay 沿着光照距离的衰退量。缺省值 1。 在 physically correct 模式中，decay = 2。

```js
PointLight( color : Integer, intensity : Float, distance : Number, decay : Float )
```

```js
const pointLight = new THREE.PointLight(0xff9000, 0.5)
pointLight.position.set(1, 1, 1)
scene.add(pointLight)
```

![](https://gw.alicdn.com/imgextra/i1/O1CN011kUjGp1mGcAxbjTJc_!!6000000004927-1-tps-1008-532.gif)

gui 增加调节 distance 和 decay 的代码如下

```js
pointLightFolder.add(pointLight, 'distance', 0, 100, 0.00001)
pointLightFolder.add(pointLight, 'decay', 0, 10, 0.00001)
```

![](https://gw.alicdn.com/imgextra/i4/O1CN013IgpOp1sTnGih2B0K_!!6000000005768-1-tps-1008-585.gif)

# RectAreaLight 平面光光源

平面光光源从一个矩形平面上均匀地发射光线。这种光源可以用来模拟像明亮的窗户或者条状灯光光源。它混合了平行光与发散光。

不支持阴影。只支持 MeshStandardMaterial 和 MeshPhysicalMaterial 两种材质。


```js
RectAreaLight( color : Integer, intensity : Float, width : Float, height : Float )
```

- color - (可选参数) 十六进制数字表示的光照颜色。缺省值为 0xffffff (白色)
- intensity - (可选参数) 光源强度／亮度 。缺省值为 1。
- width - (可选参数) 光源宽度。缺省值为 10。
- height - (可选参数) 光源高度。缺省值为 10。

```js
const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 10, 1, 1)
rectAreaLight.position.set(-1.5, 0, 1.5)
rectAreaLight.lookAt(new THREE.Vector3())
scene.add(rectAreaLight)
```

效果如下

![](https://gw.alicdn.com/imgextra/i3/O1CN01Qk17KU1cPdpJS3JVh_!!6000000003593-1-tps-1124-616.gif)

开关 helper 效果如下

![](https://gw.alicdn.com/imgextra/i2/O1CN01TM012g1spJsuEe4zZ_!!6000000005815-1-tps-1124-616.gif)

在线 [demo 链接](https://gaohaoyang.github.io/threeJourney/15-lights/)

可扫码访问

![](https://gw.alicdn.com/imgextra/i4/O1CN01e57rdB26UAD3byA7j_!!6000000007664-2-tps-200-200.png)

[demo 源码](https://github.com/Gaohaoyang/threeJourney/tree/main/src/15-lights)

# SpotLight 聚光灯

光线从一个点沿一个方向射出，随着光线照射的变远，光线圆锥体的尺寸也逐渐增大。该光源可以投射阴影。

构造函数

```js
SpotLight( color : Integer, intensity : Float, distance : Float, angle : Radians, penumbra : Float, decay : Float )
```

- color - (可选参数) 十六进制光照颜色。 缺省值 0xffffff (白色)。
- intensity - (可选参数) 光照强度。 缺省值 1。
- distance - 从光源发出光的最大距离，其强度根据光源的距离线性衰减。
- angle - 光线散射角度，最大为Math.PI/2。
- penumbra - 聚光锥的半影衰减百分比。在0和1之间的值。默认为0。
- decay - 沿着光照距离的衰减量。

```js
const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1)
spotLight.position.set(0, 2, 3)
scene.add(spotLight)
```

![](https://gw.alicdn.com/imgextra/i4/O1CN01KFCbUY1fhS4b5cuaK_!!6000000004038-2-tps-1129-617.png)

intensity 与 distance 调节

![](https://gw.alicdn.com/imgextra/i3/O1CN01ivo6q81QGgh9aBaS4_!!6000000001949-1-tps-1124-616.gif)

angle 调节

![](https://gw.alicdn.com/imgextra/i1/O1CN0192v2rP28ah5bpWI6d_!!6000000007949-1-tps-1124-616.gif)

penumbra(半影衰减) 调节

![](https://gw.alicdn.com/imgextra/i3/O1CN01YGvXhl1hnWYQ3Vm1u_!!6000000004322-1-tps-1124-616.gif)

decay 调节

![](https://gw.alicdn.com/imgextra/i4/O1CN01KMpoUF20pnDhvSSGD_!!6000000006899-1-tps-1124-616.gif)

# 性能考虑

光照效果很好，但是会非常消耗性能。GPU 会对其进行大量计算。

Minimal cost:

- AmbientLight
- HemisphereLight

Moderate cost:

- DirectionalLight
- PointLight

High cost:

- SpotLight
- RectAreaLight

所以要尽量少的添加灯光，就会带来更好的性能。想要少的灯光，但又想有很好的光效该怎么办呢？可以考虑 Baking 光照的方案。

# Baking 烘焙光照

原理是将光照烘焙到贴图纹理(Texture)中，这个过程可以在 3D 建模软件中实现。但不足的是，不能移动光线，因为根本没有光，都是再贴图纹理中。后续会深入学习。

# 小结

本节学习了 Three.js 内置的所有光效，并学习了其 Helper 的使用。了解了其性能的排序，以及光照烘焙的方案。下一节将学习投影。



