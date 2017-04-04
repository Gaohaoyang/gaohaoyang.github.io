---
layout: post
title:  "three.js 中的光与影"
categories: JavaScript
tags:  threeJS webGL
---

* content
{:toc}

在了解了 three.js 中渲染器、场景、相机、几何体等基本知识后，我们来研究一下 three.js 中的光与影。


本文是根据百度前端学院的任务安排进行探索和研究的。算是 [WebGL No. 2 - 光与影](http://ife.baidu.com/course/detail/id/28) 的学习笔记吧。

- 任务描述
  - 学习《Three.js 入门指南》第 8 章光与影；
    - 理解不同类型灯光的区别和适用场景；
    - 学会为场景添加合适的灯光；
    - 思考灯光的位置对哪些类型的灯光是无所谓的，以及为什么；
    - 思考为什么有些灯光无法形成阴影；
  - 在第 1 题场景的基础上，增加光照效果；
    - 如果你没做第 1 题，也可以随便在场景中创建一些物体；
    - 为物体设置合适的材质（预习第 4 章），使得物体的亮度根据光照有所区别
  - 创建一个地板平面，并将小车投影到地板上
    - 尝试并思考，一个物体（比如甜甜圈）如何将阴影投射到自身（Self-Shadow，自阴影）；
    - 实现软阴影的效果（即阴影的边缘有明暗的渐变）。

## 光

构造函数：

```js
Light(color, intensity)
```

- 颜色 color - (optional) hexadecimal color of the light. Default is 0xffffff (white).
- 强度 intensity - (optional) numeric value of the light's strength/intensity. Default is 1.

光的基类，被其他光类所继承。

### 环境光

AmbientLight ['æmbɪənt] 平均照亮场景中的所有物体。

无方向，不产生影子。

```js
var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
```  

### 点光源

PointLight 从一个孤立的点向各个方向发射。没有遮盖的灯泡就是一个典型的例子。

可以产生影子。

```js
var light = new THREE.PointLight(0xff0000, 1, 100);
light.position.set(50, 50, 50);
scene.add(light);
```

### 平行光

DirectionalLight 有特定方向的光。光线平行，无限远。用于模拟日光。太阳足够远，可以认为是无限远的，并且发射的光线是平行的。

可以产生影子。[平行光的影子 DirectionalLightShadow](https://threejs.org/docs/index.html#Reference/Lights.Shadows/DirectionalLightShadow)。

```js
// White directional light at half intensity shining from the top.
var directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);
```

- 属性

  - `.position`

    This is set equal to Object3D.DefaultUp (0, 1, 0), so that the light shines from the top down.

    光线从平面 (0, 1, 0) 的法向射出。


### 聚光灯

SpotLight 光从孤立点射出，沿着一个椎体向远处延伸。

可以产生影子。

```js
// white spotlight shining from the side, casting a shadow

var spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(100, 1000, 100);

spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;

scene.add(spotLight);
```

### 半球光

HemisphereLight 光源位于场景上方，光线颜色从天空过度到地面。

不能产生影子。

```js
var light = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(light);
```

### 矩形光

RectAreaLight 从一个矩形面均匀发射的光。常被用于明亮的窗户，

## 影子
