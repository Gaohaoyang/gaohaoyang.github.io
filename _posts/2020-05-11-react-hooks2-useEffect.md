---
layout: post
title:  "React Hooks 系列之2 useEffect"
categories: JavaScript
tags: React hooks
author: HyG
---

* content
{:toc}

掌握 React Hooks api 将更好的帮助你在工作中使用，对 React 的掌握更上一层楼。本系列将使用大量实例代码和效果展示，非常易于初学者和复习使用。

今天我们讲讲 useEffect 的使用方法。





## 为什么使用 useEffect

### 生命周期中写逻辑的问题

react 中旧的生命周期可能会有副作用，比如页面的 title 要展示点击次数时，代码如下：

``` js
componentDidMount() {
  document.title = `${this.state.count} times`
}
componentDidUpdate() {
  document.title = `${this.state.count} times`
}
```

在 componentDidMount 和 componentDidUpdate 中都写了同样的代码，我们不能在组件的生命周期中挂载一次，这就导致了代码重复的问题。

另一个例子，页面中包含了倒计时，并且在页面销毁时要清除倒计时 timer

``` js
componentDidMount() {
  this.interval = setInterval(this.tick, 1000)
}
componentWillUnmount() {
  clearInterval(this.interval)
}
```

如果这个组件比较复杂，同时包含了上述的两种逻辑，那么代码如下：

``` js
componentDidMount() {
  document.title = `${this.state.count} times`
  this.interval = setInterval(this.tick, 1000)
}
componentDidUpdate() {
  document.title = `${this.state.count} times`
}
componentWillUnmount() {
  clearInterval(this.interval)
}
```

我们看到2个问题

1. 代码重复。设置标题的代码重复了1遍
2. 代码分散。逻辑看起来就分散在了组件生命周期的各个地方

因此，我们需要更好的方法解决

### useEffect 解决的问题

- EffectHook 用于函数式组件中副作用，执行一些相关的操作，解决上述的问题
- 可以认为是 componentDidMount, componentDidUpdate, componentWillUnmount 的替代品

接下来学习如何使用 useEffect。

## useEffect After Render 的使用

举个例子，通过一个点击按钮，修改页面 title 的例子来说明

### Class 组件的写法示例

7ClassCounter.tsx

``` jsx
import React, { Component } from 'react'

class ClassCounter extends Component {

  state = {
    count: 0
  }

  componentDidMount() {
    document.title = `${this.state.count} times`
  }
  componentDidUpdate() {
    document.title = `${this.state.count} times`
  }

  render() {
    return (
      <div>
        <button onClick={() => {
          this.setState({
            count: this.state.count + 1
          })
        }}>
          Clicked {this.state.count} times
        </button>

      </div>
    )
  }
}

export default ClassCounter
```

App.tsx

``` jsx
import React from 'react'

import './App.css'

import ClassCounter from './components/7ClassCounter'

const App = () => {
  return (
    <div className="App">
      <ClassCounter />
    </div>
  )
}

export default App

```

效果如下

![](https://gw.alicdn.com/tfs/TB1yhhavy_1gK0jSZFqXXcpaXXa-418-215.gif)

### 使用 useEffect 改写上述示例

接下来使用函数时组件实现上述的例子

7HookCounter.tsx

``` jsx
import React, { useState, useEffect } from 'react'

function HookCounter() {
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `${count} times`
  })

  return (
    <div>
      <button onClick={() => {
        setCount(prevCount => prevCount + 1)
      }} >Clicked {count} times</button>
    </div>
  )
}

export default HookCounter
```

效果和 Class 组件相同

![](https://gw.alicdn.com/tfs/TB1yhhavy_1gK0jSZFqXXcpaXXa-418-215.gif)

可以看到 useEffect 的第一个入参是一个匿名函数，它会在每次 render 后调用。在第一次 render 和后续的更新 render 都会被调用。

另外，useEffect 写在函数式组件内，这样就可以直接拿到 props 和 state 的值，不用写 this 之类的代码。

## 有条件地执行 useEffect

上一节了解到 useEffect 会在每次 render 后执行里面的函数，这可能会有一些性能问题，接下来就讲一讲如何有条件地执行 useEffect 中的匿名函数。

在上一节的示例上进行扩展一个输入 name 的功能，通过判断只执行 count 变化带来的逻辑。

### Class 组件的写法示例

``` jsx
import React, { Component } from 'react'

interface stateType {
  count: number
  name: string
}

class ClassCounter extends Component {

  state = {
    count: 0,
    name: '',
  }

  componentDidMount() {
    document.title = `${this.state.count} times`
  }

  componentDidUpdate(prevProps: any, prevState: stateType) {
    if (prevState.count !== this.state.count) {
      console.log('Update title')
      document.title = `${this.state.count} times`
    }
  }

  render() {
    return (
      <div>
        <input
          type="text"
          value={this.state.name}
          onChange={(e) => {
            this.setState({
              name: e.target.value
            })
          }}
        />
        <button onClick={() => {
          this.setState({
            count: this.state.count + 1
          })
        }}>
          Clicked {this.state.count} times
        </button>
      </div>
    )
  }
}

export default ClassCounter
```

![](https://gw.alicdn.com/tfs/TB1aX7.voz1gK0jSZLeXXb9kVXa-610-312.gif)

为了更好的性能，注意代码中判断了 prevState

### useEffect 的写法

``` jsx
import React, { useState, useEffect } from 'react'

function HookCounter() {
  const [count, setCount] = useState(0)
  const [name, setName] = useState('')

  useEffect(() => {
    console.log('useEffect - update title')
    document.title = `You clicked ${count} times`
  }, [count])

  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => {
          setName(e.target.value)
        }}
      />
      <button onClick={() => {
        setCount(prevCount => prevCount + 1)
      }} >Clicked {count} times</button>
    </div>
  )
}

export default HookCounter
```

![](https://gw.alicdn.com/tfs/TB1efJbvAY2gK0jSZFgXXc5OFXa-610-312.gif)

注意到 useEffect 的第二个参数 `[count]`，这个参数是一个数组，元素是要被观察的 state 或 props，只有指定的这个变量发生变化时，才会触发 useEffect 中的第一个参数匿名函数的执行。这有利于性能的保证。

## 只执行1次 useEffect

本节通过一个记录鼠标坐标的示例研究一下如何只执行一次 useEffect

### 记录鼠标位置示例 Class 写法

``` jsx
import React, { Component } from 'react'

class RunEffectsOnlyOnce extends Component {
  state = {
    x: 0,
    y: 0
  }

  logMousePos = (e: MouseEvent) => {
    this.setState({
      x: e.clientX,
      y: e.clientY
    })
  }

  componentDidMount() {
    document.addEventListener('mousemove', this.logMousePos)
  }

  render() {
    return (
      <div>
        Y - {this.state.y}, X - {this.state.x}
      </div>
    )
  }
}

export default RunEffectsOnlyOnce
```

![](https://gw.alicdn.com/tfs/TB1ydpavET1gK0jSZFrXXcNCXXa-295-225.gif)

这里只在 componentDidMount 中做了事件绑定，只执行了一次事件绑定

### useEffect 中记录鼠标坐标

上述效果改造为函数式组件

``` jsx
import React, { useState, useEffect } from 'react'

function RunEffectsOnlyOnce() {

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const logMousePos = (e: MouseEvent) => {
    setX(e.clientX)
    setY(e.clientY)
  }

  useEffect(() => {
    console.log('addEventListener')
    document.addEventListener('mousemove', logMousePos)
  }, [])

  return (
    <div>
      Y - {y}, X - {x}
    </div>
  )
}

export default RunEffectsOnlyOnce
```

注意到 useEffect 方法的第二个参数传入一个空数组，有效的避免了多次调用的问题。

> 如果想执行只运行一次的 effect（仅在组件挂载和卸载时执行），可以传递一个空数组（[]）作为第二个参数。这就告诉 React 你的 effect 不依赖于 props 或 state 中的任何值，所以它永远都不需要重复执行。这并不属于特殊情况 —— 它依然遵循依赖数组的工作方式。
>
> 如果你传入了一个空数组（[]），effect 内部的 props 和 state 就会一直拥有其初始值。尽管传入 [] 作为第二个参数更接近大家更熟悉的 `componentDidMount` 和 `componentWillUnmount` 思维模式，但我们有更好的方式来避免过于频繁的重复调用 effect。除此之外，请记得 React 会等待浏览器完成画面渲染之后才会延迟调用 `useEffect`，因此会使得额外操作很方便。

## 需要清除的 Effect

本节研究如何实现 willUnmount 这个生命周期，实现组件销毁时，清除 effect 逻辑。

在上一个demo中增加一个逻辑，点击按钮展示或隐藏鼠标的坐标组件。

### 显示与移除组件

共三个文件，结构如下

![](https://gw.alicdn.com/tfs/TB1R_pPFHY1gK0jSZTEXXXDQVXa-309-277.png)

<!-- ``` plantuml

skinparam style strictuml

App -- MouseContainer
MouseContainer -- MousePos

``` -->

App.tsx
``` jsx
import React from 'react'

import './App.css'

import MouseContainer from './components/10MouseContainer'

const App = () => {
  return (
    <div className="App">
      <MouseContainer />
    </div>
  )
}

export default App

```

MouseContainer.tsx

``` jsx
import React, { useState } from 'react'

import RunEffectsOnlyOnce from './9RunEffectsOnlyOnce'

function MouseContainer() {
  const [display, setDisplay] = useState(true)
  return (
    <div>
      <button onClick={() => setDisplay(!display)}>Toggle display</button>
      {display && <RunEffectsOnlyOnce />}
    </div>
  )
}

export default MouseContainer
```

MousePos

``` jsx
import React, { useState, useEffect } from 'react'

function RunEffectsOnlyOnce() {

  const [x, setX] = useState(0)
  const [y, setY] = useState(0)

  const logMousePos = (e: MouseEvent) => {
    setX(e.clientX)
    setY(e.clientY)
  }

  useEffect(() => {
    console.log('addEventListener')
    document.addEventListener('mousemove', logMousePos)
  }, [])

  return (
    <div>
      Y - {y}, X - {x}
    </div>
  )
}

export default RunEffectsOnlyOnce
```

![](https://gw.alicdn.com/tfs/TB1nYXavEH1gK0jSZSyXXXtlpXa-579-284.gif)

执行后发现隐藏了位置组件后，有一个错误警告。这是因为没有正确卸载子组件导致的。mousemove 事件依然被监听着和执行。并且可能会导致内存泄露。

### componentWillUnmount

因此要在卸载组件时，确保所有的监听和订阅都已经被移除。若是在 Class 组件中，可以如下代码

``` js
componentWillUnmount() {
  document.removeEventListener('mousemove', this.logMousePos)
}
```

但是在 useEffect 该如何写呢？请往下看

``` jsx
  useEffect(() => {
    console.log('addEventListener')
    document.addEventListener('mousemove', logMousePos)
    return () => {
      document.removeEventListener('mousemove', logMousePos)
    }
  }, [])
```

在 useEffect 的第一个参数中添加一个 return 匿名函数，这个匿名函数将在组件卸载的时候执行，因此我们在这里移除监听就好了。

![](https://gw.alicdn.com/tfs/TB1eAcBvX67gK0jSZPfXXahhFXa-579-284.gif)

如果需要一些在组件卸载时清除功能的代码，就写在 useEffect 第一个参数的返回匿名函数中吧。

## useEffect 中依赖错误导致的 bug

useEffect 的依赖(第二个参数)错误导致的问题。

以每秒 +1 的计数器为示例

### Class 组件示例

11Counter.tsx

``` jsx
/**
 * 每秒 +1 的计数器
 */

import React, { Component } from 'react'

class Counter extends Component {

  state = {
    count: 0
  }

  timer: number | undefined

  tick = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  componentDidMount() {
    this.timer = window.setInterval(this.tick, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.timer)
  }


  render() {
    return (
      <div>
        <span>{this.state.count}</span>
      </div>
    )
  }
}

export default Counter

```

App.tsx

``` jsx
import React from 'react'

import './App.css'

import IntervalCounter from './components/11Counter'

const App = () => {
  return (
    <div className="App">
      <IntervalCounter />
    </div>
  )
}

export default App

```

执行没有问题，效果如下

![](https://gw.alicdn.com/tfs/TB1CiNxx9f2gK0jSZFPXXXsopXa-487-270.gif)

### hooks 示例

IntervalCounterHooks.tsx

``` jsx
import React, { useState, useEffect } from 'react'

function IntervalCouterHooks() {

  const [count, setCount] = useState(0)

  const tick = () => {
    setCount(count + 1)
  }

  useEffect(() => {
    const interval = setInterval(tick, 1000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <div>
      {count}
    </div>
  )
}

export default IntervalCouterHooks

```

App.tsx

``` jsx
import React from 'react'

import './App.css'

import IntervalCounter from './components/11Counter'
import IntervalCounterHooks from './components/11IntervalCouterHooks'

const App = () => {
  return (
    <div className="App">
      <IntervalCounter />
      <IntervalCounterHooks />
    </div>
  )
}

export default App

```

但是计数器没有正常工作，效果如下

![](https://gw.alicdn.com/tfs/TB13TdBx7T2gK0jSZPcXXcKkpXa-425-270.gif)

传入空的依赖数组 `[]`，意味着该 hook 只在组件挂载时运行一次，并非重新渲染时。但如此会有问题，在 `setInterval` `的回调中，count` 的值不会发生变化。因为当 effect 执行时，我们会创建一个闭包，并将 `count` 的值被保存在该闭包当中，且初值为 0。每隔一秒，回调就会执行 `setCount(0 + 1)`，因此，`count` 永远不会超过 1。

解法一：这里我们不能将 useEffect 的第二个参数设置为空数组，而是 `[count]`。

指定 `[count]` 作为依赖列表就能修复这个 Bug，但会导致每次改变发生时定时器都被重置。事实上，每个 `setInterval` 在被清除前（类似于 setTimeout）都会调用一次。但这并不是我们想要的。要解决这个问题，我们可以使用 setState 的函数式更新形式。它允许我们指定 state 该如何改变而不用引用当前 state，即下面的解法二

解法二：

将

``` js
setCount(count + 1)
```

改为

``` js
setCount((preCount) =>  preCount + 1)
```

useEffect 的依赖数组里依然使用空数组。这里设置了 count 的值是和上一个值有关，也解决了问题。此时，`setInterval` 的回调依旧每秒调用一次，但每次 setCount 内部的回调取到的 `count` 是最新值（在回调中变量命名为 c）。

![](https://gw.alicdn.com/tfs/TB1eq1qAeT2gK0jSZFvXXXnFXXa-433-292.gif)

### 多个 useEffect

如果代码中有多个业务逻辑，可以将他们写在不同的 useEffect 中，并且可以写多个 useState 和他们匹配分组使用，会让业务逻辑更加清晰。

## Fetch Data with Effect Hook

### 简单获取数据

本节讲述使用 useEffect 来获取数据，本文使用 axios 库示例。

https://jsonplaceholder.typicode.com/ 网站提供了示例的请求，返回了一些 json 数据。

```jsx
import React, { useState, useEffect } from 'react'

import axios from 'axios'

interface postType {
  userId: number
  id: number
  title: string
  body: string
}

function FetchData() {

  const [posts, setPosts] = useState<postType[]>([])

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts').then((res) => {
      const data: postType[] = res.data
      console.log(data)
      setPosts(data)
    }).catch((rej) => {
      console.log(rej)
    })
  }, [])

  return (
    <div>
      <ul>
        {
          posts.map((item) => (
            <li
              key={item.id}
            >
              {item.title}
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default FetchData
```

![](https://gw.alicdn.com/tfs/TB1UAWCAlr0gK0jSZFnXXbRRXXa-802-814.jpg)

这里注意 ts 在 useState 中的写法。

``` jsx
const [posts, setPosts] = useState<postType[]>([])
```

注意 useEffect 第二个依赖参数传入空数组，保证了 useEffect 只执行一次。

### 输入id获取不同数据

``` jsx
import React, { useState, useEffect } from 'react'

import axios from 'axios'

interface postType {
  userId: number
  id: number
  title: string
  body: string
}

function FetchData() {
  const [post, setPost] = useState<postType>()
  const [id, setId] = useState('1')

  useEffect(() => {
    if (id) {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`).then((res) => {
        const data: postType = res.data
        console.log(data)
        setPost(data)
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [id])

  return (
    <div>
      <input
        type="text"
        value={id}
        onChange={(e) => {
          setId(e.target.value)
        }}
      />
      <div>
        {
          post && post.title
        }
      </div>
    </div>
  )
}

export default FetchData

```

![](https://gw.alicdn.com/tfs/TB1wvCvAXP7gK0jSZFjXXc5aXXa-432-292.gif)

### button 点击触发 effect

监听按钮点击触发变化，执行 effect 方法

``` jsx
import React, { useState, useEffect } from 'react'

import axios from 'axios'

interface postType {
  userId: number
  id: number
  title: string
  body: string
}

function FetchData() {
  const [post, setPost] = useState<postType>()
  const [id, setId] = useState('1')
  const [idFromBtnClick, setIdFromBtnClick] = useState('1')

  useEffect(() => {
    if (idFromBtnClick) {
      axios.get(`https://jsonplaceholder.typicode.com/posts/${idFromBtnClick}`).then((res) => {
        const data: postType = res.data
        console.log(data)
        setPost(data)
      }).catch((err) => {
        console.log(err)
      })
    }
  }, [idFromBtnClick])

  return (
    <div>
      <input
        type="text"
        value={id}
        onChange={(e) => {
          setId(e.target.value)
        }}
      />
      <button
        onClick={() => {
          setIdFromBtnClick(id)
        }}
      >Fetch Post</button>
      <div>
        {
          post && post.title
        }
      </div>
    </div>
  )
}

export default FetchData
```

![](https://gw.alicdn.com/tfs/TB1sH2tAi_1gK0jSZFqXXcpaXXa-432-292.gif)

## 小结

本章从为什么使用 useEffect 开始说起，用户解决代码重复代码分散的问题，useEffect 可以更好的组织代码。

useEffect api 的用法，第一个参数为匿名函数，作为 effect 要执行的内容。第二个参数为数组，用于观察改变的 props 或 state 进行有条件的触发 effect，或者传入空数组，让 effect 只执行一次。useEffect 返回一个匿名函数，在组件销毁是执行，可以有效避免内存泄露的风险。

最后举了几个例子来展示如何在 useEffect 中执行发起请求获取数据的逻辑。下一章将讲述 useContext 这个 api。
