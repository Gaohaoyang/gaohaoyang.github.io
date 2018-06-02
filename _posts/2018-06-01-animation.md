---
layout: post
title:  "提升用户体验的前端动画"
categories: JavaScript
tags: 动画 手势
author: HyG
---

* content
{:toc}

与其他开发人员不同的是，前端开发都是在端上游走舞者，直接与用户交流沟通，这就需要前端开发具有更敏锐的交互体验思考，或者能更精准地理解设计师们意图，将最佳的用户体验带给用户。优质的交互体验对于用户来说学习成本应该是极低的，都是非常自然的操作，却可以让用户感到畅快愉悦，甚至惊喜。本文将通过一个看似简单的 poplayer 来分析我在这其中通过思考做的体验优化，获得类似 native 的体验感。

![](https://ws1.sinaimg.cn/large/7011d6cfgy1frx9jv0kpfj208w0fracu.jpg)




> 关于 poplayer 是什么，详见 [POPLAYER起来HIGH~~](https://github.com/amfe/article/issues/18)

简单的说下需求，这个弹层希望可以像 native 在商品详情页的弹层一样，从下向上滑出，点击遮罩或按钮时关闭。为了给用户带来更好的体验，我在这个基础上又增加了一些手势和过渡的动画效果，如下图。下面简单的拆分一下动画细节：

- 页面载入，卡片向上滑入
- 增加 pan 的手势，卡片跟随手指滑动
- 随着手指滑动，增加遮罩透明度与卡片阴影变化
- 增加向上和向下的边界条件的处理

## 动画与手势的运用

这些动画利用 CSS 3 的一些属性再加上手势操作即可完成，这里手势操作我选择了老牌的 [HammerJS](https://hammerjs.github.io/)。

点击超级会员专享，折上95折 banner，卡片向上滑入

<video src="http://cloud.video.taobao.com//play/u/263674894/p/1/e/6/t/1/50072164318.mp4" autoplay controls preload loop muted width="300px"></video>

这里直接使用 `transition` 控制过渡。发生样式变化的有 3 个地方：

- 卡片位置，使用 `transform: translateY` 控制纵向位置
- 遮罩透明度，随着卡片上滑，背景遮罩由透明变为半透明
- 卡片的阴影，注意仔细观察，随着卡片的上滑，为了凸显出弹层是悬浮在底层的视觉效果，其阴影的 `blur`,`spread`,`color` 也跟随变重

下面再加入 pan 手势，即拖拽或平移，这里我们使用这个手势实现弹层的拖拽和相关动画。手指不离开屏幕进行滑动操作，如下图：

<video src="http://cloud.video.taobao.com//play/u/263674894/p/1/e/6/t/1/50072178262.mp4"  controls preload loop muted width="300px"></video>

我们把最外层容器节点作为参数，实例化 hammer 对象，默认 pan 手势只有横向操作，这里设置为所有方向。在监听 pandown panup 时，根据手指移动的差值控制卡片位置、背景遮罩透明度、卡片阴影的样式。代码如下：

```js
const hammer = new Hammer(containerEl)
hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL })
hammer.on('pandown panup', panDownUp)

const panDownUp = (ev) => {
  const opacity = 0.7 - ev.deltaY / 1024
  coverEle.style.opacity = opacity

  const boxShadowBlur = 12 - ev.deltaY / 46
  const boxShadowSpread = 3 - ev.deltaY / 180
  const boxShadowColorAlpha = ''
  popWrapEle.style.boxShadow = `0 0 ${boxShadowBlur}px ${boxShadowSpread}px rgba(0,0,0,${opacity})`

  const scrollY = ev.deltaY * 1.2
  popWrapEle.style.transform = `translateY(${scrollY}px)`
}
```

对于各个样式属性的值，通过乘系数等方式得到需要的值。

这里要注意，pan 的操作中是不需要原有的 transition 过渡的，因为滑动操作时，希望让动画非常跟手，而 transition 是一个消耗时间的过渡，而且多次触发 transition 也会导致性能问题，我们要在 panstart 将其移除，panend 再加回来，添加如下代码：

```js
hammer.on('panstart', () => {
  popWrapEle.classList.remove('pop-wrap-transition')
  coverEle.classList.remove('cover-transition')
})
hammer.on('panend', (ev) => {
  popWrapEle.classList.add('pop-wrap-transition')
  coverEle.classList.add('cover-transition')
})
```

## 向下滑出的处理

用户在向下滑动松手时的距离，如果大于某个值，让卡片滑出，关闭 poplayer，小于某个值，则回弹到原位。

这比较符合用户体验、防止误关闭，同时滑出的关闭方式也给了用户一种流畅感。经过本人多次测试，最终选择的下滑临界值为 180。效果如下图：

<video src="http://cloud.video.taobao.com//play/u/263674894/p/1/e/6/t/1/50072156428.mp4"  controls preload loop muted width="300px"></video>

在 panend 事件中加入这个逻辑判断

```js
hammer.on('panend', (ev) => {
  if (ev.deltaY > 180) {
    closePoplayer()
  } else {
    popWrapEle.style.transform = 'translateY(0)'
    popWrapEle.style.boxShadow = '0 0 12px 3px rgba(0,0,0,.74)'
    coverEle.style.opacity = '0.7'
  }
  // ...
})
```

## 向上滑动的溢出感

这个卡片本身是无法再向上滑动的，但是如果用户想继续滑呢？为了让这个弹层增添一些活力，我在这个操作中让卡片微微膨胀，增添亲和力，仿佛用户想滑动它，但是它又存在着一股粘滞力无法大距离的移动，甚至满足了用户心中的小小控制欲。

效果如下：

<video src="http://cloud.video.taobao.com//play/u/263674894/p/1/e/6/t/1/50072160378.mp4"  controls preload loop muted width="300px"></video>

在向上滑动事件中加入如下代码：

```js
const panDownUp = (ev) => {
  if (ev.deltaY < 0) {
    console.log(ev.deltaY)
    const scrollUpY = ev.deltaY / 80
    const scaleX = -ev.deltaY / 20000 + 1
    popWrapEle.style.transform = `scale(${scaleX}) translateY(${scrollUpY}px)`
    return
  }
  // ...
}
```

## 其他小坑

webkit 前缀。ios 8 下部分 CSS 3 属性需要添加 `-webkit-` 前缀。参考[flexbox布局的兼容性](http://www.ayqy.net/blog/flexbox%E5%B8%83%E5%B1%80%E7%9A%84%E5%85%BC%E5%AE%B9%E6%80%A7/)。

覆盖 status bar。iOS 11 起，需要在 meta 标签中添加 `viewport-fit=cover`，才能使得 webView 覆盖到顶部的 status bar，meta 标签最终可以写为：

``` html
<meta name="viewport" content="viewport-fit=cover,width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no">
```

## 总结

交互体验体现在各个细节之中，没有大而全的规则，但整体方向就是让用户在使用软件的时候感到更加的自然畅快。而动画只是交互体验中的一小部分。

我认为前端的本质，就是将最优质的用户体验带给用户，我也在为之不断努力，欢迎交流。
