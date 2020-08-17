---
layout: post
title:  "React Hooks 系列之7 useRef"
categories: JavaScript
tags: React hooks
author: HyG
---

* content
{:toc}

掌握 React Hooks api 将更好的帮助你在工作中使用，对 React 的掌握更上一层楼。本系列将使用大量实例代码和效果展示，非常易于初学者和复习使用。

接下来我们要一起学习 useRef hook，它可以让我们直接访问到组件中的的 Dom 节点。我们今天通过一个 input 输入框获取焦点的需求为例，来学习一下 useRef。




## 页面载入 input 获取焦点示例

FocusInput.tsx

``` jsx
import React, { useEffect, useRef} from 'react'

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current && inputRef.current.focus()
  }, [])

  return (
    <div>
      <input ref={inputRef} type="text" />
    </div>
  )
}

export default FocusInput
```

App.tsx

``` jsx
import React from 'react'
import './App.css'

import FocusInput from './components/28FocusInput'

const App = () => {
  return (
    <div className="App">
      <FocusInput />
    </div>
  )
}

export default App
```

页面展示效果

![](https://gw.alicdn.com/tfs/TB1lxWlHkY2gK0jSZFgXXc5OFXa-363-125.gif)

注意与 TypeScript 结合使用时的方式，需要先声明好泛型

``` jsx
const inputRef = useRef<HTMLInputElement>(null)
```

同时使用时需要判空

``` jsx
inputRef.current && inputRef.current.focus()
```

关于 ts 和 hooks 结合的方式可以参考文章 [TypeScript and React: Hooks](https://fettblog.eu/typescript-react/hooks/#useref)。

> `useRef` 返回一个可变的 ref 对象，其 `.current` 属性被初始化为传入的参数（initialValue）。返回的 ref 对象在组件的整个生命周期内保持不变。

Refs 提供了一种方式，允许我们访问 DOM 节点或在 render 方法中创建的 React 元素。

在典型的 React 数据流中，props 是父组件与子组件交互的唯一方式。要修改一个子组件，你需要使用新的 props 来重新渲染它。但是，在某些情况下，你需要在典型数据流之外强制修改子组件。被修改的子组件可能是一个 React 组件的实例，也可能是一个 DOM 元素。对于这两种情况，React 都提供了解决办法。

### 下面是几个适合使用 refs 的情况

- 管理焦点，文本选择或媒体播放。
- 触发强制动画。
- 集成第三方 DOM 库。

避免使用 refs 来做任何可以通过声明式实现来完成的事情。举个例子，避免在 Dialog 组件里暴露 open() 和 close() 方法，最好传递 isOpen 属性。

### 勿过度使用 Refs

你可能首先会想到使用 refs 在你的 app 中“让事情发生”。如果是这种情况，请花一点时间，认真再考虑一下 state 属性应该被安排在哪个组件层中。通常你会想明白，让更高的组件层级拥有这个 state，是更恰当的。查看 状态提升 以获取更多有关示例。

更多关于 refs 和 Dom 的相关信息可以访问 React 官网 [Refs and the DOM](https://zh-hans.reactjs.org/docs/refs-and-the-dom.html)

下面我们再来学习一下 useRef 在另一个场景的使用。

## 可以停止的计时器示例

需求是页面上有一个每隔1秒自动加一的计时器，并且有个按钮，点击后计时器停止，先使用 Class 组件完成这样的需求

### Class 组件示例

ClassTimer.tsx

``` jsx
import React, { Component } from 'react'

export default class ClassTimer extends Component<{}, { timer: number }> {
  interval!: number
  constructor(props: Readonly<{}>) {
    super(props)
    this.state = {
      timer: 0
    }
  }

  componentDidMount() {
    this.interval = window.setInterval(() => {
      this.setState(prevState => ({
        timer: prevState.timer + 1
      }))
    }, 1000)
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  render() {
    return (
      <div>
        Timer - {this.state.timer}
        <br/>
        <button
          onClick={() => {
            clearInterval(this.interval)
          }}
        >Clear Timer</button>
      </div>
    )
  }
}
```

App.tsx

``` jsx
import React from 'react'
import './App.css'

import ClassTimer from './components/29ClassTimer'

const App = () => {
  return (
    <div className="App">
      <ClassTimer />
    </div>
  )
}

export default App
```

页面展示如下

![](https://gw.alicdn.com/tfs/TB1J31IHHr1gK0jSZFDXXb9yVXa-437-179.gif)

### Function 组件示例

HookTimer.tsx

``` jsx
import React, { useState, useEffect, useRef } from 'react'

function HookTimer() {
  const [timer, setTimer] = useState(0)

  //  @ts-ignore
  const intervalRef = useRef(null) as { current: number }

  useEffect(() => {
    intervalRef.current = window.setInterval(() => {
      setTimer(pre => pre + 1)
    }, 1000)
    return () => {
      clearInterval(intervalRef.current)
    }
  }, [])
  return (
    <div>
      HookTimer - {timer}
      <br />
      <button
        onClick={() => {
          clearInterval(intervalRef.current)
        }}
      >Clear Hook Timer</button>
    </div>
  )
}

export default HookTimer
```

App.tsx

``` jsx
import React from 'react'
import './App.css'

import ClassTimer from './components/29ClassTimer'
import HookTimer from './components/29HookTimer'

const App = () => {
  return (
    <div className="App">
      <ClassTimer />
      <hr />
      <HookTimer />
    </div>
  )
}

export default App
```

页面展示如下

![](https://gw.alicdn.com/tfs/TB1v51OHQL0gK0jSZFxXXXWHVXa-437-227.gif)

这就是 useRef 的第二种用法，可以用它创建一个通用的容器，用来保存变量。

## 小结

本章我们学习了 useRef 的两种用法：一是让我们允许访问 Dom 节点；二是成为一个容器，用来缓存变量。第二种用法较为少见，需要多加注意，遇到类似的场景可以尝试使用。
