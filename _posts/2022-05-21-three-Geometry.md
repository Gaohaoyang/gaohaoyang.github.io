---
layout: post
title:  "Three.js 之 4 Geometry 几何体"
categories: Three.js
tags:  Three.js WebGL
author: HyG
---

* content
{:toc}

本系列为 [Three.js journey](https://threejs-journey.com/) 教程学习笔记。

先前我们一直使用立方体，本节我们将学习一下其他几何体。

Threejs 中几何体的基类是 `BufferGeometry`，而 BufferGeometry 是面片、线或点几何体的有效表述。包括顶点位置，面片索引、法相量、颜色值、UV 坐标和自定义缓存属性值。使用 BufferGeometry 可以有效减少向 GPU 传输上述数据所需的开销。





# Threejs 内置几何体

Threejs 内置几何体可以直接前往 [threejs 官网文档](https://threejs.org/docs/index.html#api/zh/geometries/BoxGeometry) 查看。这里我们主要看看如何创建自己的几何体

# 创建自己的几何体

使用 `BufferGeometry` 和 `BufferAttribute` 描述顶点的位置，可以创建自己的几何体，代码入下

## 创建三角形

![](https://gw.alicdn.com/imgextra/i4/O1CN01p74PlN1uQhoy4rroP_!!6000000006032-1-tps-1131-489.gif)

```js
import * as THREE from 'three'
import './style.css'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import stats from '../common/stats'
import { listenResize, dbClkfullScreen } from '../common/utils'

// Canvas
const canvas = document.querySelector('#mainCanvas') as HTMLCanvasElement

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BufferGeometry()

const vertices = new Float32Array([
  0, 0, 0,
  1, 0, 0,
  0, 1, 0,
])

geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

const material = new THREE.MeshBasicMaterial({
  color: 0x607d8b,
  // wireframe: true,
})
const triangle = new THREE.Mesh(geometry, material)
scene.add(triangle)

// Size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 100)
camera.position.set(0, 0, 3)

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true
// controls.enabled = false

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

dbClkfullScreen(canvas)
listenResize(sizes, camera, renderer)

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

完整代码和 demo 如下

在线 [demo 链接](https://gaohaoyang.github.io/threeJourney/09-geometry/)

[demo 源码](https://github.com/Gaohaoyang/threeJourney/tree/main/src/09-geometry)

## 随机三角形

我们也可以使用随机数创造非常多的顶点，绘制三角形，效果如下

```js
// Object
const geometry = new THREE.BufferGeometry()

const triangleVertices = []
for (let index = 0; index < 300; index += 1) {
  triangleVertices.push(Math.random() - 0.5)
}

const vertices = new Float32Array(triangleVertices)

geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3))

const material = new THREE.MeshBasicMaterial({
  color: 0x607d8b,
  wireframe: true,
})
const triangle = new THREE.Mesh(geometry, material)
scene.add(triangle)
```

![](https://gw.alicdn.com/imgextra/i1/O1CN01BrURqS26VzmtArZLT_!!6000000007668-1-tps-1131-581.gif)

完整代码和 demo 如下

在线 [demo 链接](https://gaohaoyang.github.io/threeJourney/09-geometry2/)

[demo 源码](https://github.com/Gaohaoyang/threeJourney/tree/main/src/09-geometry2)

# 小结

我们学习了 threejs 内置的集合体，也学会了如何创建自己的几何体。
