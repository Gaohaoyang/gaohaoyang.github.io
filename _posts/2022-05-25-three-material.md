---
layout: post
title:  "Three.js 之 7 Materials 材质"
categories: Three.js
tags:  Three.js WebGL
author: HyG
---

* content
{:toc}

本系列为 [Three.js journey](https://threejs-journey.com/) 教程学习笔记。

Materials 材质

Materials 是用来给几何体的每个可见像素上色的。其中的算法程序成为 shaders。我们暂时不学习如何写 shaders，我们先使用内置的 materials，具体可以参考文档 [Material](https://threejs.org/docs/index.html#api/zh/materials/Material)





# MeshBasicMaterial 基础网格材质

一个以简单着色（平面或线框）方式来绘制几何体的材质。

这种材质不受光照的影响。

## map 颜色贴图

先将上节中学到的 Texture 载入

```js
const textureLoader = new THREE.TextureLoader()
const doorColorTexture = textureLoader.load('../assets/textures/door/color.jpg')
```

map 颜色贴图，用于添加纹理贴图, 纹理添加可以使用2种方式。

直接在构造函数中传入

```js
const material = new THREE.MeshBasicMaterial({
  map: doorColorTexture,
})
```

后续修改属性

```js
const material = new THREE.MeshBasicMaterial()
material.map = doorColorTexture
```

效果相同，如下

![](https://gw.alicdn.com/imgextra/i3/O1CN01EIJhbO1sc2OJLjuGX_!!6000000005786-1-tps-895-395.gif)

## color

材质的颜色(Color)，默认值为白色 (0xffffff)。

```js
const material = new THREE.MeshBasicMaterial()
material.color = new THREE.Color('#ff0fff')
```

![](https://gw.alicdn.com/imgextra/i1/O1CN01JY3bwE1c8ElabE1JE_!!6000000003555-1-tps-895-395.gif)

详见 [Color 类的文档](https://threejs.org/docs/index.html#api/zh/math/Color)

```js
//empty constructor - will default white
const color1 = new THREE.Color();

//Hexadecimal color (recommended)
const color2 = new THREE.Color( 0xff0000 );

//RGB string
const color3 = new THREE.Color("rgb(255, 0, 0)");
const color4 = new THREE.Color("rgb(100%, 0%, 0%)");

//X11 color name - all 140 color names are supported.
//Note the lack of CamelCase in the name
const color5 = new THREE.Color( 'skyblue' );

//HSL string
const color6 = new THREE.Color("hsl(0, 100%, 50%)");

//Separate RGB values between 0 and 1
const color7 = new THREE.Color( 1, 0, 0 );
```

如果结合 texture 和 color 将会叠加，效果如下

```js
const material = new THREE.MeshBasicMaterial()
material.map = doorColorTexture
material.color = new THREE.Color('#009688')
```

![](https://gw.alicdn.com/imgextra/i1/O1CN01Aaph1923mXF6Le0j5_!!6000000007298-1-tps-895-395.gif)

## wireframe

```js
const material = new THREE.MeshBasicMaterial()
material.wireframe = true
```

![](https://gw.alicdn.com/imgextra/i1/O1CN014lNc6N1uNV3BnUbPQ_!!6000000006025-1-tps-895-395.gif)

## opacity and transparent

.opacity : Float

值为在 0.0 - 1.0 的范围内的浮点数，表明材质的透明度。值 0.0 表示完全透明，1.0 表示完全不透明。
如果材质的 transparet 属性未设置为 true，则材质将保持完全不透明，此值仅影响其颜色。 默认值为 1.0。

.transparent : Boolean

定义此材质是否透明。这对渲染有影响，因为透明对象需要特殊处理，并在非透明对象之后渲染。
设置为true时，通过设置材质的opacity属性来控制材质透明的程度。
默认值为false。

```js
const material = new THREE.MeshBasicMaterial()
material.transparent = true
material.opacity = 0.5
```

![](https://gw.alicdn.com/imgextra/i4/O1CN01P2YeKs2ABAEd0Av0x_!!6000000008164-1-tps-895-395.gif)

## alphaMap

.alphaMap : Texture

alpha贴图是一张灰度纹理，用于控制整个表面的不透明度。（黑色：完全透明；白色：完全不透明）。 默认值为 null。

仅使用纹理的颜色，忽略alpha通道（如果存在）。 对于RGB和RGBA纹理，WebGL渲染器在采样此纹理时将使用绿色通道， 因为在DXT压缩和未压缩RGB 565格式中为绿色提供了额外的精度。 Luminance-only以及luminance/alpha纹理也仍然有效。

doorAlphaTexture 图片为

![](https://gw.alicdn.com/imgextra/i2/O1CN01vVMzQS1nXOICRA86A_!!6000000005099-0-tps-1024-1024.jpg)

```js
const material = new THREE.MeshBasicMaterial()
material.map = doorColorTexture
material.transparent = true
material.alphaMap = doorAlphaTexture
```

![](https://gw.alicdn.com/imgextra/i3/O1CN01IeBxoc1iID5NsHiLA_!!6000000004389-1-tps-895-395.gif)

可以看到 alphaMap 的黑色部分叠加到 map 上的的纹理部分透明了。

## side

定义将要渲染哪一面 - 正面，背面或两者。 默认为 THREE.FrontSide。其他选项有 THREE.BackSide 和 THREE.DoubleSide。

如果要将相机放在一个立方体内，看其内部，如现在比较流行的3d看房，那么就需要将其设置为 THREE.BackSide。

要注意的是，THREE.DoubleSide 尽量不要使用，因为会给 GPU 带来更多大压力

demo 上设置 THREE.DoubleSide 效果如下，可以看到门的背面也被附上了纹理

![](https://gw.alicdn.com/imgextra/i2/O1CN01Kst8ld1EMOECj1S6b_!!6000000000337-1-tps-895-395.gif)

# MeshNormalMaterial 法线网格材质

一种把法向量映射到 RGB 颜色的材质。详见文档 [MeshNormalMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshNormalMaterial)

法向量 总是从物体的外表面向外辐射。

```js
const material = new THREE.MeshNormalMaterial()
```

![](https://gw.alicdn.com/imgextra/i2/O1CN014hqBUH1tRKkc8poyO_!!6000000005898-2-tps-1128-597.png)

我们打印球体的属性，可以看到法向量变量

```js
console.log(sphere.geometry.attributes)
```

![](https://gw.alicdn.com/imgextra/i2/O1CN01hI4jd81olsRBfWpOt_!!6000000005266-2-tps-1032-279.png)

下图为法线 normal 的示例

![](https://gw.alicdn.com/imgextra/i1/O1CN017kkSFl29YgxyZsLbu_!!6000000008080-2-tps-720-460.png)

法线可以用于光照、反射、折射等，所以 MeshNormalMaterial 材质自身也具有一定的光学特性。

与 MeshBasicMaterial 类似也具有 wireframe, transparent, opacity, side 属性。不过还拥有一个 flatShading 属性

## flatShading

定义材质是否使用平面着色进行渲染。默认值为 false。设置为 true 后，一位置顶点之间由平面连接，不会再进行顶点之间的法线插值了，效果如下：

```js
const material = new THREE.MeshNormalMaterial()
material.flatShading = true
```

![](https://gw.alicdn.com/imgextra/i3/O1CN01rNR9xs1JSPVw44jSA_!!6000000001027-1-tps-895-395.gif)

MeshNormalMaterial 通常用于 debug 法线。

# MeshMatcapMaterial

MeshMatcapMaterial 由一个材质捕捉（MatCap，或光照球（Lit Sphere））纹理所定义，其编码了材质的颜色与明暗。

由于mapcap图像文件编码了烘焙过的光照，因此MeshMatcapMaterial 不对灯光作出反应。它将会投射阴影到一个接受阴影的物体上(and shadow clipping works)，但不会产生自身阴影或是接受阴影。

参考文档 [MeshMatcapMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshMatcapMaterial)

我们使用这样的纹理测试

![](https://gw.alicdn.com/imgextra/i4/O1CN01U9kza21cuKM3JdVGN_!!6000000003660-2-tps-256-256.png)

```js
const matcapTexture = textureLoader.load('../assets/textures/matcaps/1.png')
const material = new THREE.MeshMatcapMaterial()
material.matcap = matcapTexture
```

![](https://gw.alicdn.com/imgextra/i2/O1CN01Qbdy4e27nghWSaFBe_!!6000000007842-1-tps-895-395.gif)

![](https://gw.alicdn.com/imgextra/i4/O1CN01jKScC81JBSrSeNroX_!!6000000000990-2-tps-256-256.png)

![](https://gw.alicdn.com/imgextra/i1/O1CN017uombI1yuFq6ydjO5_!!6000000006638-1-tps-895-395.gif)

在这里可以找到非常多的 matcap 纹理素材 [https://github.com/nidorx/matcaps](https://github.com/nidorx/matcaps)

# MeshDepthMaterial 深度网格材质

一种按深度绘制几何体的材质。深度基于相机远近平面。白色最近，黑色最远。详见文档 [MeshDepthMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshDepthMaterial)

```js
const material = new THREE.MeshDepthMaterial()
```

![](https://gw.alicdn.com/imgextra/i2/O1CN01bZRuMr1ddDAYYEo3L_!!6000000003758-2-tps-1121-593.png)

这个材质可以被用来创建雾中在环境等场景

# 加一点光

接下来的材质都具有光学特性，所以我们加一些光照，后续会详细讲解光照

```js
/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight('#ffffff', 0.5)
scene.add(ambientLight)

const pointLight = new THREE.PointLight('#ffffff', 1, 100)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
```

# MeshLambertMaterial(Lambert网格材质)

[MeshLambertMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshLambertMaterial)

一种非光泽表面的材质，没有镜面高光。

该材质使用基于非物理的 Lambertian 模型来计算反射率。 这可以很好地模拟一些表面（例如未经处理的木材或石材），但不能模拟具有镜面高光的光泽表面（例如涂漆木材）。

使用 Gouraud 着色模型计算着色。这将计算每个顶点的着色（即在vertex shader中）并在多边形的面上插入结果。

由于反射率和光照模型的简单性，MeshLambertMaterial 是所有受光照材质中性能最好的，但是其牺牲了精度，离近看可以看到一些奇怪的纹理。

```js
const material = new THREE.MeshDepthMaterial()
```

![](https://gw.alicdn.com/imgextra/i4/O1CN01A8qYLB1GztcqB5t2m_!!6000000000694-1-tps-822-452.gif)

# MeshPhongMaterial(Phong网格材质)

MeshPhongMaterial 与 MeshLambertMaterial 相似。但表面奇怪的纹理有所减少，并且可以在几何体表面看到光的反射。

一种用于具有镜面高光的光泽表面的材质。可[参考文档](https://threejs.org/docs/index.html#api/zh/materials/MeshPhongMaterial)。

该材质使用非物理的Blinn-Phong模型来计算反射率。 与MeshLambertMaterial中使用的Lambertian模型不同，该材质可以模拟具有镜面高光的光泽表面（例如涂漆木材）且精度更高。

使用Phong着色模型计算着色时，会计算每个像素的阴影（在fragment shader， AKA pixel shader中），与MeshLambertMaterial使用的Gouraud模型相比，该模型的结果更准确，但代价是牺牲一些性能。 MeshStandardMaterial和MeshPhysicalMaterial也使用这个着色模型。

MeshPhongMaterial 的性能会稍差与 MeshLambertMaterial，但是影响并不大。

```js
const material = new THREE.MeshLambertMaterial()
```

![](https://gw.alicdn.com/imgextra/i1/O1CN01Kqv97h1Gn4XIodpoV_!!6000000000666-1-tps-822-452.gif)

`.shininess : Float`

.specular 高亮的程度，越高的值越闪亮。默认值为 30。

`.specular : Color`

材质的高光颜色。默认值为0x111111（深灰色）的颜色Color。

```js
const material = new THREE.MeshPhongMaterial()
material.shininess = 60
material.specular = new THREE.Color('#00ff00')
```

![](https://gw.alicdn.com/imgextra/i4/O1CN012LYmuq1CaTAhXUXnP_!!6000000000097-1-tps-822-452.gif)

# MeshToonMaterial

卡通风格

MeshToonMaterial 的属性与 MeshLambertMaterial 类似，不过是卡通风格

![](https://gw.alicdn.com/imgextra/i2/O1CN010qnJSH1PGOozmS9Pq_!!6000000001813-2-tps-1123-595.png)

默认是2个颜色阶梯（一个是阴影，一个是高亮）。如果想增加更多颜色阶梯，可以使用 gradientMap 和增加一个纹理

如下图，是一个 3*1 px 的非常小的灰阶图片

![](https://gw.alicdn.com/imgextra/i2/O1CN01ota0oH1s9BRNxJtrC_!!6000000005723-0-tps-3-1.jpg)

```js
const gradientTexture = textureLoader.load('../assets/textures/gradients/3.jpg')
const material = new THREE.MeshToonMaterial()
material.gradientMap = gradientTexture
```

![](https://gw.alicdn.com/imgextra/i2/O1CN01MiQKNz1FchxRC9b0V_!!6000000000508-2-tps-1124-587.png)

由于提供的纹理图片太小，放大滤镜算法需要重新指定，这样就可以看到 3 色灰阶了

```js
const gradientTexture = textureLoader.load('../assets/textures/gradients/3.jpg')
gradientTexture.magFilter = THREE.NearestFilter
const material = new THREE.MeshToonMaterial()
material.gradientMap = gradientTexture
```

![](https://gw.alicdn.com/imgextra/i3/O1CN01Kj7XHI1vQ4tecLBKI_!!6000000006166-2-tps-1128-584.png)

同样我们可以使用 5 色灰阶。如下图，是一个 5*1 px 的非常小的灰阶图片

![](https://gw.alicdn.com/imgextra/i2/O1CN01F7YGkN1oskNXgfyNr_!!6000000005281-0-tps-5-1.jpg)

```js
const gradientTexture = textureLoader.load('../assets/textures/gradients/5.jpg')
gradientTexture.magFilter = THREE.NearestFilter
const material = new THREE.MeshToonMaterial()
material.gradientMap = gradientTexture
```

![](https://gw.alicdn.com/imgextra/i1/O1CN01nZbH2u1a6kFPkn7x3_!!6000000003281-2-tps-1125-593.png)

# MeshStandardMaterial(标准网格材质)

[MeshStandardMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshStandardMaterial) 是基于物理渲染的（physically based rendering, PBR）。它支持光效，并有一个更拟真的算法，支持了更多参数如粗糙度、金属性。

之所以是 Standard 因为 PBR 已经在很多软件、引擎和库里成为一种标准。

这种方法与旧方法的不同之处在于，不使用近似值来表示光与表面的相互作用，而是使用物理上正确的模型。 我们的想法是，不是在特定照明下调整材质以使其看起来很好，而是可以创建一种材质，能够“正确”地应对所有光照场景。

在实践中，该材质提供了比MeshLambertMaterial 或MeshPhongMaterial 更精确和逼真的结果，代价是计算成本更高。

计算着色的方式与MeshPhongMaterial相同，都使用Phong着色模型， 这会计算每个像素的阴影（即在fragment shader， AKA pixel shader中）， 与MeshLambertMaterial使用的Gouraud模型相比，该模型的结果更准确，但代价是牺牲一些性能。

```js
const material = new THREE.MeshStandardMaterial()
```

![](https://gw.alicdn.com/imgextra/i3/O1CN01hETBw51dYdDBMwuS9_!!6000000003748-2-tps-1128-594.png)

```js
const material = new THREE.MeshStandardMaterial()
material.metalness = 0.45
material.roughness = 0.65
```

## `.metalness : Float`

材质与金属的相似度。非金属材质，如木材或石材，使用0.0，金属使用1.0，通常没有中间值。 默认值为0.0。0.0到1.0之间的值可用于生锈金属的外观。如果还提供了metalnessMap，则两个值相乘。

## `.roughness : Float`

材质的粗糙程度。0.0表示平滑的镜面反射，1.0表示完全漫反射。默认值为1.0。如果还提供roughnessMap，则两个值相乘。


![](https://gw.alicdn.com/imgextra/i1/O1CN01kdGrqa20osQ8WbbQo_!!6000000006897-2-tps-1126-588.png)

Add a debug UI

这次选用 lil-gui 作为 debug UI，可以查看其官网了解用法 [lil-gui](https://lil-gui.georgealways.com/)。

```js
import * as dat from 'lil-gui'

...

const gui = new dat.GUI()

gui.add(material, 'metalness').min(0).max(1).step(0.0001)
gui.add(material, 'roughness').min(0).max(1).step(0.0001)
```

![](https://gw.alicdn.com/imgextra/i2/O1CN01iRMKLS1iwVwVmg7iD_!!6000000004477-2-tps-267-87.png)

![](https://gw.alicdn.com/imgextra/i3/O1CN01lBE1fX1lwv91vKGzR_!!6000000004884-1-tps-1125-443.gif)

## `.map : Texture`

颜色贴图。默认为null。纹理贴图颜色由漫反射颜色.color调节。

```js
material.map = doorColorTexture
```

![](https://gw.alicdn.com/imgextra/i3/O1CN01zpU6Jw1exC4GIyjDd_!!6000000003937-2-tps-1121-555.png)

## `.aoMap : Texture`

ambient occlusion map，该纹理的红色通道用作环境遮挡贴图。默认值为null。aoMap需要第二组UV。

我们先为3个几何体添加第二组 uv 属性

```js
sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))
plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))
torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

console.log(sphere.geometry)
```

![](https://gw.alicdn.com/imgextra/i2/O1CN01bCUpOo1UZFCMtC0WP_!!6000000002531-2-tps-938-312.png)

```js
material.aoMap = doorAmbientOcclusionTexture
material.aoMapIntensity = 1
```

这里使用的 ao 纹理贴图 (doorAmbientOcclusionTexture) 为

![](https://gw.alicdn.com/imgextra/i4/O1CN01lGpRzm1UulodEbFzy_!!6000000002578-0-tps-1024-1024.jpg)

## `.aoMapIntensity : Float`

环境遮挡效果的强度。默认值为1。零是不遮挡效果。

增加一个 debug 项 aoMapIntensity，可以更直观的看到阴影效果强度。

```js
gui.add(material, 'aoMapIntensity').min(0).max(1).step(0.0001)
```

![](https://gw.alicdn.com/imgextra/i3/O1CN01SAvBiq1F7Z1eMWA3D_!!6000000000440-1-tps-1125-504.gif)

## `.displacementMap : Texture`

位移贴图会影响网格顶点的位置，与仅影响材质的光照和阴影的其他贴图不同，移位的顶点可以投射阴影，阻挡其他对象， 以及充当真实的几何体。位移纹理是指：网格的所有顶点被映射为图像中每个像素的值（白色是最高的），并且被重定位。

我们 displacementMap 使用的 doorHeightTexture 贴图如下

![](https://gw.alicdn.com/imgextra/i1/O1CN01G079ye1mhdXdGwprp_!!6000000004986-0-tps-1024-1024.jpg)

```js
material.displacementMap = doorHeightTexture
```

![](https://gw.alicdn.com/imgextra/i1/O1CN01tnmlYP1N9rwfsQJoh_!!6000000001528-2-tps-1140-549.png)

看起来很糟糕，因为我们的几何体顶点太少导致，并且 displacementMap 默认位移太大导致的。

## `.displacementScale : Float`

位移贴图对网格的影响程度（黑色是无位移，白色是最大位移）。如果没有设置位移贴图，则不会应用此值。默认值为1。

```js
material.displacementScale = 0.05

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material)
sphere.position.set(-1.5, 0, 0)

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material)

const torus = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.2, 64, 128), material)
torus.position.set(1.5, 0, 0)

gui.add(material, 'displacementScale').min(0).max(0.1).step(0.0001)
```

可以看到位移贴图的效果如下

![](https://gw.alicdn.com/imgextra/i2/O1CN01qJcNGT1W0YQtbE6PG_!!6000000002726-1-tps-1125-504.gif)

## `.metalnessMap : Texture`

该纹理的蓝色通道用于改变材质的金属度。

## `.roughnessMap : Texture`

该纹理的绿色通道用于改变材质的粗糙度。

使用 metalnessMap 和 roughnessMap 代替 metalness roughness

metalness.jpg

![](https://gw.alicdn.com/imgextra/i4/O1CN01dFaCfK269YNjppqGN_!!6000000007619-0-tps-1024-1024.jpg)

roughness.jpg

![](https://gw.alicdn.com/imgextra/i4/O1CN018ailjB1YUtuQbZ40j_!!6000000003063-0-tps-1024-1024.jpg)

```js
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
```

![](https://gw.alicdn.com/imgextra/i3/O1CN01wMzdrV1CgQK4JV5bU_!!6000000000110-2-tps-1130-495.png)

看起来反射有些奇怪，这是因为之前设置的 `metalness` 和 `roughness` 属性依然生效，我们需要将这2 个属性值设置为默认值

```js
material.metalnessMap = doorMetalnessTexture
material.roughnessMap = doorRoughnessTexture
material.metalness = 0
material.roughness = 1
```

![](https://gw.alicdn.com/imgextra/i2/O1CN01qBttNh1TuwLaCH5UL_!!6000000002443-2-tps-1135-498.png)

## `.normalMap : Texture`

用于创建法线贴图的纹理。RGB值会影响每个像素片段的曲面法线，并更改颜色照亮的方式。法线贴图不会改变曲面的实际形状，只会改变光照。

使用如下的法线贴图

![](https://gw.alicdn.com/imgextra/i1/O1CN01Rly6mW1EoKOUa2lSD_!!6000000000398-0-tps-1024-1024.jpg)

```js
material.normalMap = doorNormalTexture
```

效果如下，可以看出材质表面光照效果已经不是平面了，光照射时可以明显的看到法线起伏的效果

![](https://gw.alicdn.com/imgextra/i4/O1CN01i0kcRy1X2DU42gGKc_!!6000000002865-2-tps-2480-1326.png)

## `.normalScale : Vector2`

法线贴图对材质的影响程度。典型范围是0-1。默认值是Vector2设置为（1,1）。

```js
material.normalMap = doorNormalTexture
material.normalScale.set(0.5, 0.5)
```

## `.alphaMap : Texture`

alpha贴图是一张灰度纹理，用于控制整个表面的不透明度。（黑色：完全透明；白色：完全不透明）。 默认值为null。

我们使用 alphaMap 图片为

![](https://gw.alicdn.com/imgextra/i2/O1CN01TXzNdh1fx1XRRjYea_!!6000000004072-0-tps-1024-1024.jpg)

```js
material.alphaMap = doorAlphaTexture
material.transparent = true
```

![](https://gw.alicdn.com/imgextra/i1/O1CN01cDcI4G24zBnxAOmZ0_!!6000000007461-2-tps-1130-554.png)

![](https://gw.alicdn.com/imgextra/i3/O1CN01yY9rnf24ihY1P5DYr_!!6000000007425-2-tps-1134-547.png)

至此我们就得到了一个很精致好看的门，MeshStandardMaterial 的属性基本也学习的差不多了。

demo 和源码

在线 [demo 链接](https://gaohaoyang.github.io/threeJourney/12-materials/)

[demo 源码](https://github.com/Gaohaoyang/threeJourney/tree/main/src/12-materials)


# MeshPhysicalMaterial 物理网格材质

`Material → MeshStandardMaterial →`

详见文档 [MeshPhysicalMaterial](https://threejs.org/docs/index.html#api/zh/materials/MeshPhysicalMaterial)

MeshStandardMaterial 的扩展，提供了更高级的基于物理的渲染属性：

- Clearcoat: 有些类似于车漆，碳纤，被水打湿的表面的材质需要在面上再增加一个透明的，具有一定反光特性的面。而且这个面说不定有一定的起伏与粗糙度。Clearcoat 可以在不需要重新创建一个透明的面的情况下做到类似的效果。

- 基于物理的透明度:.opacity属性有一些限制:在透明度比较高的时候，反射也随之减少。使用基于物理的透光性.transmission属性可以让一些很薄的透明表面，例如玻璃，变得更真实一些。

- 高级光线反射: 为非金属材质提供了更多更灵活的光线反射。

# PointsMaterial

用于粒子效果，后续会深入学习粒子特效

# ShaderMaterial and RawShaderMaterial

在创建自己的 materials 时使用，后续会深入学习。用于创建 shaders

# Environment map

环境贴图，在几何体上用于反射出周围环境的一种纹理贴图。

使用 6 张图片，形成一个立方体，所以我们需要使用 [CubeTextureLoader](https://threejs.org/docs/index.html#api/zh/loaders/CubeTextureLoader) 来加载

![](https://gw.alicdn.com/imgextra/i2/O1CN01NkGTiA29ee7PPx9wS_!!6000000008093-2-tps-666-150.png)

```js
const envMapTexture = new THREE.CubeTextureLoader()
  .setPath('../assets/textures/environmentMaps/0/')
  .load(['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'])

const material = new THREE.MeshStandardMaterial()
material.metalness = 0.7
material.roughness = 0.2
material.envMap = envMapTexture
```

效果如下

![](https://gw.alicdn.com/imgextra/i4/O1CN01XjtBjn1EsuLwASvAX_!!6000000000408-1-tps-1125-504.gif)

可以调节 metalness 和 roughness 观察变化。能够看到反射的不同效果。

demo 和源码

在线 [demo 链接](https://gaohaoyang.github.io/threeJourney/12-materialsEnvironmentMap/)

[demo 源码](https://github.com/Gaohaoyang/threeJourney/tree/main/src/12-materialsEnvironmentMap)

## 在哪寻找环境贴图

有个很好的网站 [https://polyhaven.com/](https://polyhaven.com/) HDRIHaven 是免费的并且使用了 [CC0 license](https://polyhaven.com/license)

下载了 hdr 图片文件后，可以在 [https://matheowis.github.io/HDRI-to-CubeMap/](https://matheowis.github.io/HDRI-to-CubeMap/) 在线转换为6张 cube map 图片。

![](https://gw.alicdn.com/imgextra/i4/O1CN01ZRLUvn1WwijV0eJbg_!!6000000002853-2-tps-1131-483.png)

# 小结

本节我们研究了 Three.js 中的基础材质、法线材质、MatCap 材质、Depth 深度材质，以及与光相关的 Lambert/Phong/Toon/Standard/Physical Material。剩下了后续粒子动效和 Shader 会细讲的 2 个材质。最后又学习了环境贴图，模拟物体金属反光的效果。

下一节将学习 3D 文字。
