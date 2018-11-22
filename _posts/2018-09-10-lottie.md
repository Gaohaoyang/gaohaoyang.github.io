---
layout: post
title:  "从设计师和开发的角度使用 lottie"
categories: JavaScript
tags: 动画 CSS airbnb lottie JavaScript
author: HyG
---

* content
{:toc}

![](https://gw.alicdn.com/tfs/TB1yLBduDqWBKNjSZFAXXanSpXa-800-600.gif)

## 简介

[lottie](https://airbnb.design/lottie/) 是一个可以轻易的给各种 native app 添加高质量动画的类库。可以在 iOS、Android 和 React Native 实时渲染 After Effects 动画，就像使用静态图片一样容易。上图即为 lottie 的 logo。

简单的说，lottie 动画制作的流程是，通过 Bodymovin 扩展将 AE 动画导出为 json 数据，然后再将这个 json 渲染在客户端或者 web 端。如下图：





![](https://gw.alicdn.com/tfs/TB1G3F7u67nBKNjSZLeXXbxCFXa-617-255.png)

官网宣传了3个特性：
- 灵活使用AE的特性
- 随心所欲控制你的动画
- 很小的文件体积

个人认为 lottie 最大的优势就是可以将设计师设计的动图原原本本的在页面上展现出来，完美还原了动画的精细度，并且对动画拥有足够的控制能力。目前所有使用 gif 或 apng 的场景应该都可以使用 lottie，当然 lottie 不局限与此场景。

本文主要从设计师视角和开发者视角讲述 lottie-web 的原理和使用以及 lottie 在 weex/rax 中的使用。

[Demo](https://gaohaoyang.github.io/lottie-test/)

<video src="http://cloud.video.taobao.com//play/u/4121310810/p/1/e/6/t/1/50255502072.mp4" autoplay controls preload loop muted width="300px"></video>

![](https://gw.alicdn.com/tfs/TB1xhmyutcnBKNjSZR0XXcFqFXa-300-300.png)

<iframe width="375px" height="500px" src="https://gaohaoyang.github.io/lottie-test/" frameborder="0"></iframe>

## 设计师视角

### 准备

在 AE 中为 lottie 创作动画，你需要以下准备
- [Adobe After Effects](https://www.adobe.com/products/aftereffects.html)
- [Bodymovin AE 插件](http://airbnb.io/lottie/after-effects/bodymovin-installation.html)
- Lottiefiles preview app (集成了 lottie sdk 的 app)

安装 Bodymovin 插件的流程如下：
1. 关闭 AE
2. 安装 ZXP installer。 ZXP Installer 就是专门用来安装 Adobe 公司的软件产品的插件的工具。
3. 下载最新的 bodymovin 扩展。
  https://github.com/airbnb/lottie-web/blob/master/build/extension/bodymovin.zxp
  ![](https://gw.alicdn.com/tfs/TB1Q6dipMZC2uNjSZFnXXaxZpXa-2012-620.png)
4. 打开 ZXP installer 并把 bodymovin 扩展拖拽进来
5. 打开 AE，在菜单 `Window > Extensions` 中，你会看到安装好的扩展

安装插件详见 [http://airbnb.io/lottie/after-effects/bodymovin-installation.html](http://airbnb.io/lottie/after-effects/bodymovin-installation.html)

### 从 Sketch/SVG/Illustrator 到 Lottie 的工作流

下面讲讲如何从 Sketch 开始，制作一个 lottie 动画文件。如果你使用 svg 图片，跳到步骤3。如果你使用 AI，跳到步骤4。需要准备好 Sketch，AI，AE，并安装好 Bodymovin 插件。下面开始：

1. 在 sketch 中确保要导出的内容已经群组为一个 group
2. 将这个 group 导出为 svg
3. 在 AI 中打开 svg，并转存为 `.ai` 文件
4. 将 `.ai` 文件导入到 AE 中
5. 在 AE 中创建组件，设置动画持续时间和帧率
6. 将 ai 文件转为 shape layers。
   在组件中选中你的图层，菜单 Layer 中选择 Create shapes from vector layer
7. **添加你想要的任何动画，这一部分是你主要工作的步骤**
8. 使用 Bodymovin 导出为 json
   菜单中选择 Window > Extensions > Bodymovin
9. 测试动画。
   确保动画中没有[不支持的特性](http://airbnb.io/lottie/supported-features.html)，然后可以拖拽到 [lottieFiles](https://www.lottiefiles.com/) 中查看效果。
   当然也可以上传到 lottieFiles 里，然后使用 lottie preview app 扫码查看。
   这时你就可以将动画交付给开发同学啦！

更多细节可查看官方文档 [Sketch/SVG/Illustrator to Lottie workflow](http://airbnb.io/lottie/after-effects/artwork-to-lottie-walkthrough.html)

### 注意事项&优化建议

*AE 特性大部分已经支持，具体可以查看 [Supported Features（支持列表）](http://airbnb.io/lottie/supported-features.html)，设计师应该避免使用不支持 AE 的特性。

目前开看，支持较好的属性有：
- Shapes
- Fills
- Strokes
- Transforms
- Interpolation

不完全支持的属性分类有：
- Masks
- Mattes
- Merge Paths
- Layer Effects
- Text

[![](https://gw.alicdn.com/tfs/TB1ndK3uBsmBKNjSZFFXXcT9VXa-795-535.png)](http://airbnb.io/lottie/supported-features.html)


*设计过程中的优化建议和注意事项 [General tips & guidelines](http://airbnb.io/lottie/after-effects/general-tips.html)

- 尽量保持简单小巧
  在相同的图层上复制相同的关键帧会增加额外的代码，只有在必要时才使用路径关键帧动画。
- 导出 1x 图
- No expressions or effects
  Lottie 还不支持 expressions 或 effects 菜单中的任何 effects
- Matte and mask 尺寸问题
  使用半透明遮罩会影响性能。如果必须使用遮罩，请覆盖最小的区域。
- 不支持 Blending modes 或 Luma mattes
- 不支持图层样式
  图层效果不支持drop shadow, color overlay 或 stroke
- 全屏动画，导出比最大屏幕宽度更宽一点的图像，在 Android 和 iOS 上可以分别裁切
  ![](http://airbnb.io/lottie/images/LottieFullScreen.gif)

## 开发者视角

### 使用

首先当然是看[开发文档](http://airbnb.io/lottie/)。这里我简单说说其中 lottie-web 的使用。

可以通过 script 标签

``` html
<script src="https://cdnjs.com/libraries/bodymovin" type="text/javascript"></script>
```

或 npm 包 [lottie-web](https://www.npmjs.com/package/lottie-web) 引用

``` bash
npm i -S lottie-web
```

``` js
import lottie from 'lottie-web'
```

调用 loadAnimation()

``` js
const myLottie = lottie.loadAnimation({
  container: document.querySelector('.img-area'),
  renderer: 'svg',
  name: 'myLottieAnim',
  loop: true,
  autoplay: true,
  path: './assets/cycle_animation.json',
})
```

### 参数/api/事件

loadAnimation 的参数

名称 | 描述
--- | ---
container | 用于渲染的容器，一般使用一个 div 即可
renderer | 渲染器，可以选择 'svg' / 'canvas' / 'html'，个人测试发现 svg 效果和兼容性最好
name | 动画名称，用于 reference
loop | 循环
autoplay | 自动播放
path | json 路径，页面会通过一个 http 请求获取 json
animationData | json 动画数据，与 path 互斥，建议使用 path，因为 animationData 会将数据打包进来，会使得 js bundle 过大

获取到 lottie 实例后，可以调用 api 控制动画，例如上述代码中可以使用

``` js
myLottie.pause()
```

相关 api

名称 | 参数 | 描述
--- | --- | ---
stop | 无 | 停止动画
play | 无 | 播放动画
pause | 无 | 暂停
setSpeed | Number | 设置播放速度，1 表示1倍速度，0.5 表示 0.5倍速度
setDirection | Number | 正反向播放，1 表示 正向，-1 表示反向
goToAndStop | Number, [Boolean] | 跳到某一帧或某一秒停止，第二个参数 iFrame 为是否基于帧模式还是时间，默认为 false
goToAndPlay | Number, [Boolean] | 跳到某一帧或某一秒开始，第二个参数 iFrame 为是否基于帧模式还是时间，默认为 false
playSegments | Array, [Boolean] | 播放片段，参数1为数组，两个元素为开始帧和结束帧；参数2为，是否立即播放片段，还是等之前的动画播放完成
destroy | 无 | 销毁

事件

- onComplete
- onLoopComplete
- onEnterFrame
- onSegmentStart

也可以使用 addEventListener 监听以下事件

- complete
- loopComplete
- enterFrame
- segmentStart
- config_ready (when initial config is done)
- data_ready (when all parts of the animation have been loaded)
- data_failed (when part of the animation can not be loaded)
- loaded_images (when all image loads have either succeeded or errored)
- DOMLoaded (when elements have been added to the DOM)
- destroy

具体也可以查看[组件文档](https://github.com/airbnb/lottie-web/)

### 优化建议

- 使用压缩混淆过的 js，毕竟目前 lottie-web 还是有点大，gzip 后大概 57k
- 尽量使用简单小巧的 json，其实也是需要在 AE 中做一些优化，这需要前端和设计一起配合完成，例如
  - 避免使用很大的形状，但是用很小的 mask 切出来
  - 太多的节点也会影响性能

## weex/rax 中使用 lottie

weex/rax 已经提供了 lottie 组件，由于是内部文档，暂不放链接。

api 支持没有 airbnb 官方完整，投入生产环境时还需要严格测试一下

[vue-weex demo](http://dotwe.org/vue/946e8283f5cf31cfab2f923ec8cea07c)

![](https://gw.alicdn.com/tfs/TB1h65XuCMmBKNjSZTEXXasKpXa-256-256.png)


使用[@ali/rax-lottie](http://web.npm.alibaba-inc.com/package/@ali/rax-lottie) 的 [rax demo](https://market.m.taobao.com/app/tmall-wireless/rax-life-progress/pages/my-lottie?wh_weex=true) 如下

[![](https://gw.alicdn.com/tfs/TB16qbPuBjTBKNjSZFwXXcG4XXa-200-200.png)](https://market.m.taobao.com/app/tmall-wireless/rax-life-progress/pages/my-lottie?wh_weex=true)

<video src="http://cloud.video.taobao.com//play/u/4121310810/p/1/e/6/t/1/50255438306.mp4" autoplay controls preload loop muted width="300px"></video>

<iframe width="375px" height="200px" src="https://market.m.taobao.com/app/tmall-wireless/rax-life-progress/pages/my-lottie?wh_weex=true" frameborder="0"></iframe>

## 小结

在我看来，追求更精细完美的动画体验一直是设计师和前端开发的使命。lottie 的出现可以替代传统的 gif，并且提供的 api 可以更好的控制动画。lottie 可能不适合用于过于复杂的大场景动画，但是局部的小动画，再适合不过了。

lottie 应该是一个发展趋势，甚至未来浏览器说不定就原生直接支持了这种 json 动画，设计和开发之间的壁垒也会越来越小。