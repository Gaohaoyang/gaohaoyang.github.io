---
layout: post
title:  "Three.js 之 19 realistic render 真实渲染"
categories: Three.js
tags:  Three.js WebGL
author: HyG
---

* content
{:toc}

本系列为 [Three.js journey](https://threejs-journey.com/) 教程学习笔记。

我们上一节最后将汉堡模型导入到了 Three.js 的场景中了，但是颜色效果很奇怪。为了让它渲染的更真实，我们需要做一些额外的操作，接下来就一起看看吧~





我们导入复杂一点模型进行展示，我们导入之前了解过的飞行员头盔。

![](https://gw.alicdn.com/imgextra/i1/O1CN01U8hkPS23CLz1bMesk_!!6000000007219-2-tps-130-130.png)

# 模型导入

```js
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

// ...

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader()

// ...

/**
 * Models
 */
gltfLoader.load('../assets/models/FlightHelmet/glTF/FlightHelmet.gltf', (gltf) => {
  gltf.scene.scale.set(8, 8, 8)
  gltf.scene.position.set(0, -3.4, 0)
  gltf.scene.rotation.set(0, Math.PI * 0.5, 0)
  scene.add(gltf.scene)
})
```

再加一些灯光

```js
const directionLight = new THREE.DirectionalLight('#ffffff', 3)
directionLight.position.set(0.25, 3, -2.25)
scene.add(directionLight)
```

<img src="https://gw.alicdn.com/imgextra/i1/O1CN01UWgK3n1OIOy7M3p9I_!!6000000001682-2-tps-1089-1308.png" width="400px" />

# 真实渲染优化

接下来我们做一些真实渲染的优化操作

## physicallyCorrectLights 物理上正确的光照模式

我们将切换到使用物理正确的照明强度计算。物理正确的照明与基于物理的渲染不是一回事，但是，将两者同时使用以便给我们一个完整的物理准确的场景是有意义的。

物理正确的照明意味着使用真实世界的物理方程计算光线如何随着距离光源（衰减）而衰减。这是相当简单的计算，你可以在任何物理教科书找到这些方程。

另一方面，基于物理的渲染涉及以物理正确的方式计算光线与表面的反应。这些方程要复杂得多。幸运的是，我们不必完全理解原理就可以使用它们！

只需要如下设置

```js
renderer.physicallyCorrectLights = true
```

<!-- 背后本质是通过乘以 π 将 luminous intensity(发光强度) 转化为了 luminous power(f发光功率) -->

效果如下
physicallyCorrectLights false | physicallyCorrectLights true
--- | ---
<img src="https://gw.alicdn.com/imgextra/i3/O1CN01j2Q1Pa1a3ztqRGX2G_!!6000000003275-2-tps-1125-2436.png" width="300px" /> | <img src="https://gw.alicdn.com/imgextra/i1/O1CN012Q3zXa1hTpY91nPvn_!!6000000004279-2-tps-1125-2436.png" width="300px" />

## 环境贴图

目前我们只有微弱的平行光，所以可能看不到阴影里的内容。我们现在加一些环境贴图看看效果。

我们添加如下效果的环境贴图

<img src="https://gw.alicdn.com/imgextra/i4/O1CN01WHVNSw1uptdSV1SwA_!!6000000006087-2-tps-1229-922.png" width="700px"/>

并环境贴图添加至场景中

```js
/**
 * Loaders
 */
const cubeTextureLoader = new THREE.CubeTextureLoader()

/**
 * Environment map
 */
const environmentMap = cubeTextureLoader.load([
  '../assets/textures/environmentMaps/3/px.jpg',
  '../assets/textures/environmentMaps/3/nx.jpg',
  '../assets/textures/environmentMaps/3/py.jpg',
  '../assets/textures/environmentMaps/3/ny.jpg',
  '../assets/textures/environmentMaps/3/pz.jpg',
  '../assets/textures/environmentMaps/3/nz.jpg',
])

scene.background = environmentMap // 将环境贴图添加至场景中
```

遍历模型中的 Mesh，并添加材质的环境贴图，将环境贴图强度设置为 2.5

```js
const debugObject = {
  envMapIntensity: 2.5,
}
/**
 * Update all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
      console.log(child)
      child.material.envMap = environmentMap
      child.material.envMapIntensity = debugObject.envMapIntensity
    }
  })
}

gui.add(debugObject, 'envMapIntensity').min(0).max(10).step(0.001)
  .onChange(updateAllMaterials)

/**
 * Models
 */
gltfLoader.load('../assets/models/FlightHelmet/glTF/FlightHelmet.gltf', (gltf) => {
  // ...
  updateAllMaterials()
})

```

无环境贴图 | 有环境贴图
--- | ---
<img src="https://gw.alicdn.com/imgextra/i1/O1CN012Q3zXa1hTpY91nPvn_!!6000000004279-2-tps-1125-2436.png" width="300px" /> | <img src="https://gw.alicdn.com/imgextra/i3/O1CN01aHYoHk1PyMs9ycfro_!!6000000001909-2-tps-1125-2436.png" width="300px" />

## Renderer 渲染器相关拟真优化

物体现在越来越真实，但还是有些不自然，我们需要处理一下颜色相关的部分，可以控制 WebGLRenderer 的一些属性实现。

### outputEncoding 渲染器的输出编码

`.outputEncoding : number`

定义渲染器的输出编码。默认为 `THREE.LinearEncoding`

```
THREE.LinearEncoding
THREE.sRGBEncoding
THREE.BasicDepthPacking
THREE.RGBADepthPacking
```

这些常量用于纹理的encoding属性。

推荐使用的是 sRGBEncoding

```js
renderer.outputEncoding = THREE.sRGBEncoding
```

对比效果

outputEncoding LinearEncoding | outputEncoding sRGBEncoding
--- | ---
<img src="https://gw.alicdn.com/imgextra/i3/O1CN01aHYoHk1PyMs9ycfro_!!6000000001909-2-tps-1125-2436.png" width="300px" />|<img src="https://gw.alicdn.com/imgextra/i1/O1CN01eUlWY01MbyfDrWlc8_!!6000000001454-2-tps-1125-2436.png" width="300px">


可以看出纹理变得更加明亮了，这些纹理也会影响环境贴图。

另一个可以调整的值是 THREE.GammaEncoding。这种编码的优点是可以让你使用一个叫做 gammaFactor 的值，它的作用有点像亮度，但我们不会使用这个。

Gamma 编码是一种存储颜色的方法，同时根据人眼敏感度优化存储明暗值的方式。当我们使用 sRGBEncoding 时，就像使用 GammaEncoding 一样，默认 gamma 因子为 2.2，这是常用值。

虽然有些人可能认为 GammaEncoding 比 sRGBEncoding 更好，因为我们可以控制更暗或更亮场景的 gamma 因子，但这在物理上看起来并不正确，我们稍后会看到如何以更好的方式管理“亮度”。

相关资料可参考
- [https://www.donmccurdy.com/2020/06/17/color-management-in-threejs/](https://www.donmccurdy.com/2020/06/17/color-management-in-threejs/)
- [https://medium.com/game-dev-daily/the-srgb-learning-curve-773b7f68cf7a](https://medium.com/game-dev-daily/the-srgb-learning-curve-773b7f68cf7a)

### Textures encoding

环境贴图颜色现在是不太正确的。它们看起来是灰色的，并且淡化了。即使效果看起来很不错，但保留正确的颜色更令人满意。

原因是我们的渲染器 outputEncoding 是 THREE.sRGBEncoding，而环境贴图纹理默认是 THREE.LinearEncoding。

规则很简单。我们可以直接看到的所有纹理，比如地图，应该是 THREE.sRGBEncoding 作为编码，所有其他的纹理，比如 normalMap，应该是 THREE.LinearEncoding。

我们可以将 environmentMap 纹理编码改成 THREE.sRGBEncoding：

```js
environmentMap.encoding = THREE.sRGBEncoding
```

但是模型纹理呢？幸运的是，GLTFLoader 实现了这个规则，从它加载的所有纹理都会自动进行正确的编码。

对比如下

environmentMap.encoding  LinearEncoding | environmentMap.encoding sRGBEncoding
--- | ---
<img src="https://gw.alicdn.com/imgextra/i1/O1CN01eUlWY01MbyfDrWlc8_!!6000000001454-2-tps-1125-2436.png" width="300px" />|<img src="https://gw.alicdn.com/imgextra/i1/O1CN01hliATr1BzN7a2AwN1_!!6000000000016-2-tps-1125-2436.png" width="300px">

### toneMapping 色调映射

`.toneMapping : Constant`

默认是 NoToneMapping。查看 Renderer constants 以获取其它备选项

```
THREE.NoToneMapping
THREE.LinearToneMapping
THREE.ReinhardToneMapping
THREE.CineonToneMapping
THREE.ACESFilmicToneMapping
```

这些常量定义了 WebGLRenderer 中 toneMapping 的属性。这个属性用于在普通计算机显示器或者移动设备屏幕等低动态范围介质上，模拟、逼近高动态范围（HDR）效果。

这里我们先使用 ReinhardToneMapping

toneMapping NoToneMapping | toneMapping ReinhardToneMapping
--- | ---
<img src="https://gw.alicdn.com/imgextra/i1/O1CN01hliATr1BzN7a2AwN1_!!6000000000016-2-tps-1125-2436.png" width="300px"> | <img src="https://gw.alicdn.com/imgextra/i3/O1CN01ZAftt51r8RCxq4dn9_!!6000000005586-2-tps-1125-2436.png" width="300px" />

### toneMappingExposure 色调映射的曝光级别

我们还可以更改色调映射曝光。你可以看到我们让多少光进入，算法会按照自己的方式处理它。

`.toneMappingExposure : Number`

色调映射的曝光级别。默认是1

```js
renderer.toneMappingExposure = 2.5
```

toneMappingExposure 1 | toneMappingExposure 2.5
--- | ---
<img src="https://gw.alicdn.com/imgextra/i3/O1CN01ZAftt51r8RCxq4dn9_!!6000000005586-2-tps-1125-2436.png" width="300px"> | <img src="https://gw.alicdn.com/imgextra/i3/O1CN01JF2Iu81PDeTbEnsKZ_!!6000000001807-2-tps-1125-2436.png" width="300px" />

### Anti Aliasing 抗锯齿

我们仔细观察，会在某些特定的角度看到阶梯状的锯齿，通常出现在几何图形的边缘。

这是一个众所周知的问题。当一个像素的渲染发生时，会检查该像素中正在渲染什么几何图形，并计算颜色，最后，该颜色出现在屏幕上。但是几何边缘通常不会与屏幕像素的垂直线和水平线完全对齐，这就是为什么你会看到这个锯齿状的阶梯。

有很多方法可以解决这个问题，开发人员多年来一直在努力解决这个问题。

一个简单的解决方案是增加我们渲染的分辨率。当调整到正常大小时，每个像素颜色将自动从渲染的 4 个像素中取平均值。

这种解决方案称为超采样 (SSAA) 或全屏采样 (FSAA)，它是最简单且更高效的解决方案。不过，这意味着要渲染 4 倍以上的像素，这可能会导致性能问题。

另一种解决方案称为多重采样 (MSAA)。同样，这个方法是为每个像素渲染多个值（通常是 4 个），就像超级采样一样，但只在几何体的边缘上。然后对像素的值进行平均以获得最终的像素值。

最新的 GPU 可以执行这种多重采样抗锯齿，Three.js 会自动处理设置。我们只需要在实例化期间将 antialias 属性更改为 true

```js
// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
})
```

锯齿消失了。放大观察会更加明显。

antialias false | antialias true
--- | ---
<img src="https://gw.alicdn.com/imgextra/i3/O1CN01JF2Iu81PDeTbEnsKZ_!!6000000001807-2-tps-1125-2436.png" width="300px"> | <img src="https://gw.alicdn.com/imgextra/i4/O1CN011ocjd71s2JWpvlETh_!!6000000005708-2-tps-1125-2436.png" width="300px" />

局部放大

antialias false | antialias true
--- | ---
<img src="https://gw.alicdn.com/imgextra/i2/O1CN01ylYR2N25bChoKbko7_!!6000000007544-2-tps-339-339.png" width="339px"> | <img src="https://gw.alicdn.com/imgextra/i2/O1CN01lPd58w23UfpHm0IGc_!!6000000007259-2-tps-339-339.png" width="339px" />

使用抗锯齿会消耗一些资源。像素比（pixel ratio）大于 1 的屏幕实际上并不需要抗锯齿。比较好的方法是只为像素比大于 2 的屏幕激活它。我们将在以后的学习中看到如何实现它，以及其他优化。

## Shadows 影

最后我们再添加一些光影效果。我们之前在已经学习过了。

首先将 WebGLRenderer 的 shadow 打开

```js
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
```

打开平行光发射投影

```js
directionLight.castShadow = true
```

添加 CameraHelper 观察一下光照范围是否将物体全部包裹住

```js
const directionalLightCameraHelper = new THREE.CameraHelper(directionLight.shadow.camera)
scene.add(directionalLightCameraHelper)

directionLight.shadow.camera.far = 15
directionLight.shadow.mapSize.set(1024, 1024)
```

`.mapSize : Vector2` 一个 Vector2 定义阴影贴图的宽度和高度。

较高的值会以计算时间为代价提供更好的阴影质量。值必须是 2 的幂，最大为给定设备的 `WebGLRenderer.capabilities.maxTextureSize`，尽管宽度和高度不必相同（例如，(512, 1024) 是有效的）。 默认值为(512, 512)。

由于我们需要逼真和精确的阴影，并且因为我们只有一盏灯，我们可以将阴影贴图的大小增加到 1024x1024，而不必担心帧率下降。

<img src="https://gw.alicdn.com/imgextra/i1/O1CN01OILgXL1PoIA6fkYax_!!6000000001887-2-tps-763-805.png" width="400px" />

最后，我们可以激活模型所有网格上的阴影。由于我们已经在 updateAllMaterials 函数中遍历模型，让我们简单地激活所有 children 的 castShadow 和 receiveShadow

```js
/**
 * Update all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
      // ...
      child.castShadow = true
      child.receiveShadow = true
    }
  })
}
```

no shadow | shadow
--- | ---
<img src="https://gw.alicdn.com/imgextra/i4/O1CN011ocjd71s2JWpvlETh_!!6000000005708-2-tps-1125-2436.png" width="300px"> | <img src="https://gw.alicdn.com/imgextra/i4/O1CN013pBPL01XVWrOIZ3Ui_!!6000000002929-2-tps-1125-2436.png" width="300px" />

## 最终微调

现在我们已经准备就绪，我们可以调整值，确保 directionalLight 对应于环境贴图中的灯光，尝试其他环境贴图，测试不同的色调映射，添加动画等。

这些由你个人决定。花点时间，查看渲染，环顾四周，因为您需要现实生活中的标记，确保您的屏幕颜色良好，也可以问问周围的朋友建议，直到一切都正确设置。

这里我调整了环境贴图的强度和光照强度，看起来和环境融合会更真实一些

光照调整前 | 光照调整后
--- | ---
<img src="https://gw.alicdn.com/imgextra/i4/O1CN013pBPL01XVWrOIZ3Ui_!!6000000002929-2-tps-1125-2436.png" width="300px"> | <img src="https://gw.alicdn.com/imgextra/i1/O1CN01r1gBJe1yvd3Z7inzX_!!6000000006641-2-tps-1125-2436.png" width="300px" />

最终对比过程

![](https://gw.alicdn.com/imgextra/i2/O1CN01Ww0nWf1vntWNoZwVf_!!6000000006218-2-tps-2250-1949.png)

在线 [demo 链接](https://gaohaoyang.github.io/threeJourney/25-realisticRender/)

[demo 源码](https://github.com/Gaohaoyang/threeJourney/tree/main/src/25-realisticRender)

# 汉堡模型

还记得上一节我们做的汉堡模型吗？我们也将它重新渲染一下看看效果。

导入并渲染后发现表面有一些小条纹，这被称为 shadow acne（阴影粉刺 or 阴影痤疮）

![](https://gw.alicdn.com/imgextra/i3/O1CN01uAveqz1FPstdmmYK9_!!6000000000480-2-tps-374-402.png)

这是因为在计算表面是否在阴影中时，出于精确原因，阴影粉刺可能会出现在光滑和平坦的表面上。 这里发生的事情是汉堡包在它自己的表面上投下了阴影。我们可以使用以下2个属性解决问题

`.bias : Float` 用于平面

阴影贴图偏差，在确定曲面是否在阴影中时，从标准化深度添加或减去多少。
默认值为0.此处非常小的调整（大约0.0001）可能有助于减少阴影中的伪影

`.normalBias : Float` 用于曲面

定义用于查询阴影贴图的位置沿对象法线偏移多少。 默认值为 0。增加此值可用于减少阴影粉刺，尤其是在光线以浅角度照射到几何体上的大型场景中。 代价是阴影可能会出现扭曲。

我们添加如下代码

```js
directionLight.shadow.normalBias = 0.05
```

最终效果如下

<img src="https://gw.alicdn.com/imgextra/i4/O1CN01P3VIFK1hpMAIHdT9h_!!6000000004326-2-tps-1125-2436.png" width="400px" />

在线 [demo 链接](https://gaohaoyang.github.io/threeJourney/25-realisticRenderBurger/)

[demo 源码](https://github.com/Gaohaoyang/threeJourney/tree/main/src/25-realisticRenderBurger)

与上一节的汉堡对比，就会发现之前的很丑毫无胃口，哈哈哈

<img src="https://gw.alicdn.com/imgextra/i3/O1CN01Byp1xO1Bx5887ToQR_!!6000000000011-2-tps-1256-680.png" width="600px" />

# 小结

本节学习了如何让模型更加真实的渲染。通过添加环境贴图、renderer 拟真优化等方式完成。通过 physicallyCorrectLights, environmentMap, outputEncoding, textures encoding, toneMapping, toneMappingExposure, antialias, Shadows 等让渲染显得更加真实。

让物体在3D空间中更加真实的渲染非常酷。虽然我们做了很多努力，但有时看上去还是不够真实，任重道远。
