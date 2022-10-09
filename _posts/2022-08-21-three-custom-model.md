---
layout: post
title:  "Three.js 之 18 使用 Blender 设计和导出模型"
categories: Three.js
tags:  Three.js WebGL
author: HyG
---

* content
{:toc}

本系列为 [Three.js journey](https://threejs-journey.com/) 教程学习笔记。

使用 Blender 设计和导出模型

有很多 3D 建模的软件，比如 Cinema 4D、Maya、3DS Max、Blender、ZBrush 等。本节课我们将学习 Blender 因为它是免费的，并且性能也还不错。

本节课学习完成后，你并不会成为 Blender 的专家，因为它需要更多完整的课程才能熟练。我们只是学习的软件的入门，以便能够应对更多地简单模型。熟悉一个模型的制作以及它是如何被导出并导入到 WebGL 中去的。





# Blender 的界面与基本操作

如下图，就是 Blender 的界面，由多个区域组成。

- 3D viewport
- Timeline
- OutLiner
- Properties

![](https://gw.alicdn.com/imgextra/i2/O1CN01GanMJs1bJOpCM23LW_!!6000000003444-2-tps-1832-1142.png)

## 改变区域

可以点击左上角的下拉菜单，修改。如下图

![](https://gw.alicdn.com/imgextra/i4/O1CN01c2hvl11SjCaxhOOvg_!!6000000002282-2-tps-784-424.png)

## 划分与合并区域

可以将鼠标移动至区域的左上角，成为十字的时候，可以划分和合并区域，如下图

![](https://gw.alicdn.com/imgextra/i1/O1CN0157RqaW22HYrRKhz51_!!6000000007095-1-tps-1131-542.gif)

## 快捷键

Blender 的优势之一是它的快捷方式。 它们有很多，一旦你掌握了基础知识，你就会非常有效率

对于 Blender 的操作，这里建议使用鼠标，而非触摸板，因为我们会用到很多鼠标滚轮的点击。

### 旋转视角

![](https://gw.alicdn.com/imgextra/i1/O1CN01C30VKB1gFnn87ItDV_!!6000000004113-2-tps-1920-1080.png)

按住滚轮中键，移动鼠标

![](https://gw.alicdn.com/imgextra/i3/O1CN01b1RQXO1LdylfiGL6H_!!6000000001323-1-tps-974-534.gif)

### 视角平移

![](https://gw.alicdn.com/imgextra/i1/O1CN01EyeSSF1Er4mkeXlPt_!!6000000000404-2-tps-1920-1080.png)

![](https://gw.alicdn.com/imgextra/i3/O1CN019u6QSn1bUOKWzLDPm_!!6000000003468-2-tps-1920-1080.png)

按住 `shift` 同时按住鼠标中键可以进行视角平移

![](https://gw.alicdn.com/imgextra/i4/O1CN01vSjQjq1ErXBGPAv7u_!!6000000000405-1-tps-974-534.gif)

### 视角缩放

![](https://gw.alicdn.com/imgextra/i1/O1CN01RPBg8K26MpsyBBXcZ_!!6000000007648-2-tps-1920-1080.png)

鼠标滚轮旋转控制视角缩放

![](https://gw.alicdn.com/imgextra/i4/O1CN01YWSKo21Ty98SO0a5K_!!6000000002450-1-tps-719-459.gif)

需要注意的是，我们使用滚轮的缩放是不会超过物体中心的，如果想要超过中心，可以使用快捷键 `shift+ctrl+滚轮中键点击移动鼠标`。如下图

![](https://gw.alicdn.com/imgextra/i4/O1CN01VvyfH91GcXRftQFoG_!!6000000000643-1-tps-719-459.gif)

### 自由视角移动

使用自由视角移动，我们要进入 Walk mode。进入这个模式的快捷键是 `shift + back quote` 数字 1 旁边的点，然后可以用 wasd 或方向键控制前后左右平移，用鼠标控制视角，类似 FPS 游戏视角。效果如下：

![](https://gw.alicdn.com/imgextra/i4/O1CN014qzuem1pTO58yKs3O_!!6000000005361-1-tps-719-459.gif)

### 正交或景深视角切换

小键盘数字键 5 可以快速切换。

![](https://gw.alicdn.com/imgextra/i3/O1CN01HGoFsE1R8jRF0kMCi_!!6000000002067-1-tps-792-459.gif)

### 坐标轴视角

小键盘数字键 1、3、7 分别为 x、y、z 轴视角，效果如下

![](https://gw.alicdn.com/imgextra/i3/O1CN01yR0yEq1LDPnWTF8NV_!!6000000001265-1-tps-792-459.gif)

### 相机视角

小键盘数字 0 可以快速切换场景中的相机视角

![](https://gw.alicdn.com/imgextra/i1/O1CN01FOwR3T1Xw5p1R301f_!!6000000002987-1-tps-792-459.gif)

### reset

有时可能视角移动找不到场景了，这一使用快捷键 `shift + c` 回到主场景。如下图

![](https://gw.alicdn.com/imgextra/i1/O1CN01YxYkQw1RmZtjbOcdH_!!6000000002154-1-tps-792-459.gif)

### 聚焦

我们如果想聚焦到一个对象上，可以使用小键盘数字键 `.`。

![](https://gw.alicdn.com/imgextra/i3/O1CN01rCE40Z1QexhCLQbTg_!!6000000002002-1-tps-827-490.gif)

如果想聚焦到一个对象上，同时又隐藏其他对象，可以使用小键盘 `/`

![](https://gw.alicdn.com/imgextra/i2/O1CN01AyGhn01iVwzPDOuef_!!6000000004419-1-tps-827-490.gif)

### 选择

- 使用 `shift + 鼠标左键` 可以多选对象。
- 使用 `cmd + z` 可以撤销选择
- 使用 `A` 可以全选
- 使用 `双击 A` 可以全不选
- 使用 `B` 可以划区域选择
- 使用 `C` 可以类似笔刷选择，同时可以使用鼠标滚轮控制笔刷区域大小

这里举例快捷键 `B` + `双击 A`，先选中2个对象，再取消所有选择

![](https://gw.alicdn.com/imgextra/i1/O1CN01cmvV9i1nRtYkUuowf_!!6000000005087-1-tps-827-490.gif)

## 创建物体与相关操作

我们来创建物体，实际操作一下。其中也有非常多的快捷键。

创建物体之前我们先学会删除物体

### 删除物体

快捷键 `X`，选中物体，然后使用快捷键 X 进行删除操作，如下图

![](https://gw.alicdn.com/imgextra/i4/O1CN01upJyWz1oY8Zis6rWJ_!!6000000005236-1-tps-827-490.gif)

### 创建物体

快捷键 `shift + A` 出现菜单，通过菜单创建物体

![](https://gw.alicdn.com/imgextra/i4/O1CN01N9j3Yv22ln0C4a1MD_!!6000000007161-1-tps-827-490.gif)

创建好物体后，有个菜单可以控制物体的面数等信息。如果它消失了可以按快捷键 `F9` 重新打开。

![](https://gw.alicdn.com/imgextra/i2/O1CN01JZgvKB1kPCNe6r3zu_!!6000000004675-2-tps-762-470.png)

### 隐藏物体

- 选中一个物体，按 `H` 进行隐藏
- 重新展示隐藏的物体可以按 `Alt + H`
- 隐藏非选中的物体，按 `shift + H`

### 物体变换

- 使用快捷键 `G` 进行位置变换，变换后鼠标右击取消，左击确认。
- 使用快捷键 `R` 进行旋转
- 使用快捷键 `S` 进行缩放

如果使用了变换快捷键，然后再按 X、Y、Z 就可以进行轴向上的变换操作

如下图，位置变换展示，先按 G 再按 x

![](https://gw.alicdn.com/imgextra/i1/O1CN01cD8guE1bqNL4uNWXl_!!6000000003516-1-tps-827-490.gif)

### 改变模式与编辑模式

目前我们使用的是物体模式（Object Mode）我们可以改变模式方便其他操作

快捷键 `shift + tab`

![](https://gw.alicdn.com/imgextra/i3/O1CN01lUH4981DaIf5yiVI1_!!6000000000232-2-tps-683-446.png)

可以看到有以下多种模式，我们接下来会用到编辑模式，我们先来讲一下

进入 Edit Mode 后，我们可以修改顶点、线和面，同时也可以使用 `G、R、S` 这些快捷键进行编辑。

下图的操作是，按 `shift + tab` 进入 edit mode，默认选中了点操作，我们选一个顶点，按 `G` 再按 `X`，将其按照 X 轴进行移动操作。

![](https://gw.alicdn.com/imgextra/i1/O1CN01cbv7gZ1wwQV9wDKq3_!!6000000006372-1-tps-827-490.gif)

## Shading 渲染着色

我们可以使用快捷键 Z 选择不同的渲染着色方式

![](https://gw.alicdn.com/imgextra/i1/O1CN01Fm4KdX23BtZtHGth9_!!6000000007218-2-tps-1020-568.png)

- Solid: The default with the same material for every objects.
- Material: Like the Solid shading, but with a preview of the materials and their textures.
- Wireframe: All the geometries are in wireframe.
- Renderer: Low quality render —it's the most realistic but the least performant.

例如在 renderer shading 模式下的效果，可以看到光和影

![](https://gw.alicdn.com/imgextra/i2/O1CN01SUHQRT1ftMO2869Aq_!!6000000004064-1-tps-827-490.gif)

## Properties 属性区域

右下角的区域就是 Properties 区域。

![](https://gw.alicdn.com/imgextra/i2/O1CN01Zg31NI1dv4dU0UsWs_!!6000000003797-2-tps-286-412.png)

可以看到左侧的图标中间是有比较大的间距的，上面的那些是与场景相关的。

![](https://gw.alicdn.com/imgextra/i2/O1CN01QC23V225errUpu0Bk_!!6000000007552-2-tps-98-374.png)

上面的几个图标中第2个icon，是可以选择渲染引擎的。

默认是 Eevee

3个引擎的区别和特点分别是：

- Eevee: A real-time render engine. It uses the GPU just like Three.js, it's very performant, but it has limitations like realism, light bounce, reflection, and refraction.
- Workbench: A legacy render engine that we don't use a lot anymore. Its performance is pretty good, but the result isn't very realistic.
- Cycles: A raytracing engine. It's very realistic. It handles light bounce, deep reflection, deep refraction, and many other features, but it's very sluggish, and you might end up waiting hours or even days to render your scene.

默认的 Eevee 是一个实时渲染引擎。如果想渲染场景，可以按 F12 通过场景中的相机进行渲染。

下图为用 Cycles 这个光追引擎进行渲染的几个物体，非常漂亮，可以看到红色的反光效果，这就是光追效果的魅力。

![](https://gw.alicdn.com/imgextra/i4/O1CN01ehlwOT1v6Nszz5HqG_!!6000000006123-2-tps-1920-1080.png)

下面的这些是与选中的对象物体相关

![](https://gw.alicdn.com/imgextra/i4/O1CN01Kesx0n1qvc6hXCdaM_!!6000000005558-2-tps-112-498.png)

对象相关的我们暂时需要关注第1、2个，以及倒数第2个。分别是物体属性、Modifier 属性，和材质。

材质中的 `Principled BSDF` 就是使用了 PBR 原则的属性，和 Three.js 中的 MeshStandardMaterial 相同。

## 搜索

快捷键 `F3`，可以打开搜索框，可以输入关键字进行提示。

![](https://gw.alicdn.com/imgextra/i3/O1CN01r80Udh1zhGEnlHDv5_!!6000000006745-2-tps-967-507.png)

## 保存预设状态

我们将场景清空，保留一个立方体和点光源。将下面的两个视图分别改为Z和Y轴视角。并且渲染为 wireframe。然后保存预设 `File > Defaults > Save Startup File`。再次打开时就是这个界面模式了。

![](https://gw.alicdn.com/imgextra/i4/O1CN01KemDV922uwvGUzYHp_!!6000000007181-2-tps-1831-1114.png)

# 汉堡模型制作

接下来我们将开始汉堡模型的制作，并且最终我们会将其导入到 Three.js 中。

## 单位统一

![](https://gw.alicdn.com/imgextra/i4/O1CN01OTEjlx1IIVLr1q4Mg_!!6000000000870-2-tps-374-172.png)

默认单位是 m，对于制作一个汉堡来说就太奇怪了，所以我们索性就将单位设置为 none。

![](https://gw.alicdn.com/imgextra/i1/O1CN01XpCJem1lwvA15OKd9_!!6000000004884-2-tps-373-403.png)

汉堡的直径大概是 10 cm，我们就制作一个直径大概在 10 个单位的汉堡吧。

## 汉堡底部的面包

首先我们创建一个尺寸大约为10的立方体。

![](https://gw.alicdn.com/imgextra/i4/O1CN01qOBc2e1GpovlRJwoN_!!6000000000672-2-tps-1831-1114.png)

使用 Subdivision Surface 将立方体细分面，如下图

![](https://gw.alicdn.com/imgextra/i3/O1CN01m9Fn5S1d8z3BW96A8_!!6000000003692-2-tps-1535-825.png)

我们可以在物体上右击，再点击 Shade Smooth 将物体的面变得光滑。

然后再进入编辑模式，将立方体上表面进行移动。

![](https://gw.alicdn.com/imgextra/i4/O1CN01Ie2ytq1XK4wvll1sV_!!6000000002904-2-tps-1238-756.png)

再按 `Ctrl + R` 来增加循环边（loop cut 环切)

![](https://gw.alicdn.com/imgextra/i3/O1CN01avRcxT1Yv0V6lWGyn_!!6000000003120-2-tps-1266-823.png)

我们可以再次使用增加循环边，是面包底部更平坦

![](https://gw.alicdn.com/imgextra/i4/O1CN01Rh3LTv1GL8OTl4p6B_!!6000000000605-2-tps-1078-452.png)

保存后，我们会发现，会有2个文件同时存在，一个是后缀名为 blend 另一个是 blend1，这是因为1结尾是的备份，如果有问题，你可以将 blend1 文件改名为 blend 继续使用。

## 肉饼制作

我们可以复制一个汉堡底部面包，然后再经过调整，得到一个肉饼！

![](https://gw.alicdn.com/imgextra/i2/O1CN01lL1src1XNHip7KaCY_!!6000000002911-2-tps-1213-753.png)

## 芝士片

我们使用 plane 几何体制作芝士片

![](https://gw.alicdn.com/imgextra/i2/O1CN01xP14r029tlCdSltxk_!!6000000008126-2-tps-1181-724.png)

现在看起来还太假，我们需要为它增加曲线弧度和厚度。

编辑模式，选择芝士片的面，右击，选择 Subdivide

![](https://gw.alicdn.com/imgextra/i2/O1CN01Wc26c121TBI9NkrME_!!6000000006985-2-tps-700-510.png)

Number of Cut 可以设置为 12

![](https://gw.alicdn.com/imgextra/i1/O1CN01SbeiFr22i7paGxsXL_!!6000000007153-2-tps-1235-683.png)

在编辑模式下，选择 Proportional Editing（成比例编辑），可以移动一组点，让芝士看起来更真实

![](https://gw.alicdn.com/imgextra/i1/O1CN01naJ8G61YO1z2MIfLd_!!6000000003048-2-tps-773-579.png)

回到 Object 模式，我们可以在芝士上右击，选择 Smooth

接下来需要增加一些厚度，选择 solidify

![](https://gw.alicdn.com/imgextra/i1/O1CN01BbKrTJ1z7XLMoatl9_!!6000000006667-2-tps-1434-702.png)

可以看到芝士的已经有了厚度，我们想让边缘更锋利一些，可以选择 Object Data Properties 里的 Normals 的 auto smooth 角度修改

![](https://gw.alicdn.com/imgextra/i2/O1CN01Na0eWS1ltFzXHNxkT_!!6000000004876-2-tps-1633-820.png)

我们可以复制2层肉饼和芝士，并稍微旋转一下，效果如下

![](https://gw.alicdn.com/imgextra/i1/O1CN01056MGH1zo8B0d0SU7_!!6000000006760-2-tps-1286-633.png)

## 上层面包

我们将下层面包复制一个，并旋转。

![](https://gw.alicdn.com/imgextra/i4/O1CN01AT79j01avaEEyb5OJ_!!6000000003392-2-tps-790-409.png)

## 材质

可以再撒点芝麻增加一些材质。我们给汉堡增加颜色，并将面包和肉饼的粗糙度调整到最大，芝士的粗糙度相对低一些。

![](https://gw.alicdn.com/imgextra/i4/O1CN01IpOF5v1KDaKR47gnU_!!6000000001130-2-tps-1302-824.png)

Blender 自带的渲染效果如下：

![](https://gw.alicdn.com/imgextra/i3/O1CN01slwSna1P94VIQOd7j_!!6000000001797-2-tps-1920-1080.png)

## 导出模型

File > Export > glTF 2.0 (.glb/.gltf)

![](https://gw.alicdn.com/imgextra/i3/O1CN01kZcQTf1YGFFcaJ0Fm_!!6000000003031-2-tps-948-604.png)

导出配置如下设置

![](https://gw.alicdn.com/imgextra/i1/O1CN01vxrB3L1i7DbQhbEq2_!!6000000004365-2-tps-346-716.png)

# Three.js 中渲染

使用上一节学习的导入模型渲染，效果如下：

![](https://gw.alicdn.com/imgextra/i3/O1CN01Byp1xO1Bx5887ToQR_!!6000000000011-2-tps-1256-680.png)

在线 [demo 链接](https://gaohaoyang.github.io/threeJourney/24-customModelsWithBlender/)

[demo 源码](https://github.com/Gaohaoyang/threeJourney/tree/main/src/24-customModelsWithBlender)

看起来颜色和 Blender 里渲染的不太一样，我们下一节会详细讲讲如何做到真实渲染。
# 小结

本节学习了 Blender 的快捷键和基本操作，并制作了一个汉堡模型，导出模型，导入到 Three.js 中渲染。下一节将学习什么是真实渲染。
