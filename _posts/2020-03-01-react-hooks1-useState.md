---
layout: post
title:  "React Hooks 系列之1 useState"
categories: JavaScript
tags: React hooks
author: HyG
---

* content
{:toc}

本系列将讲述 React Hooks 的使用方法，从 useState 开始，将包含如下内容：

- [useState](https://juejin.im/post/5e8324ade51d45470921f86a)
- [useEffect](https://juejin.im/post/5eb910b35188256d58312c7e)
- [useContext](https://juejin.im/post/5eb912246fb9a0436e47f947)
- [useReducer](https://juejin.im/post/5ebba47fe51d454dd5062f5b)
- [useCallback](https://juejin.im/post/5ec2465a5188256d841a552a)
- [useMemo](https://juejin.im/post/5ec293a55188256d754876fc)
- [useRef](https://juejin.im/post/5ecbf486f265da7711699c3a)
- [custom hooks](https://juejin.im/post/5ecd4c86f265da76ff6d0f16)

掌握 React Hooks api 将更好的帮助你在工作中使用，对 React 的掌握更上一层楼。本系列将使用大量实例代码和效果展示，非常易于初学者和复习使用。

前提，需要会使用 React Class 的写法，会使用 `setState()` 和 props。

下面从第一个例子开始吧。




## 简单的useState - Counter 计数器示例

点击+1的计数器

### Class 组件的写法

CounterClass.tsx

``` jsx
import React, { Component } from 'react'

class CounterClass extends Component {

  state = {
    count: 0
  }

  incrementCount = () => {
    this.setState({
      count: this.state.count + 1
    })
  }

  render() {
    const { count } = this.state
    return (
      <div>
        <button onClick={this.incrementCount}>Count {count}</button>
      </div>
    )
  }
}

export default CounterClass

```

App.tsx

``` jsx
import React from 'react'

import './App.css'

import CounterClass from './components/CounterClass'

const App = () => {
  return (
    <div className="App">
      <CounterClass />
    </div>
  )
}

export default App
```

效果如下

![](https://gw.alicdn.com/tfs/TB1oZQLveL2gK0jSZPhXXahvXXa-306-179.gif)

创建这样的一个计数器分为简单的3步

1. 创建一个 Class 组件
2. 创建 state
3. 创建 increment 方法

接下来看看如何使用 Function Component 和 state hook 实现

### State Hook 实现

HookCounter.tsx

``` jsx
import React, { useState } from 'react'

function HookCounter() {
  const [count, setCount] = useState(0)
  return (
    <div>
      <button onClick={() => {
        setCount(count + 1)
      }}>Count {count}</button>
    </div>
  )
}

export default HookCounter
```

App.tsx

``` jsx
import React from 'react'

import './App.css'

// import CounterClass from './components/1CounterClass'
import HookCounter from './components/1HookCounter'

const App = () => {
  return (
    <div className="App">
      <HookCounter />
    </div>
  )
}

export default App

```

效果与 Class 组件写法相同

![](https://gw.alicdn.com/tfs/TB1oZQLveL2gK0jSZPhXXahvXXa-306-179.gif)

我们来看 useState 的使用方法

``` js
const [state, setState] = useState(initialState)
```

这行代码返回一个 state，以及更新 state 的函数。

在初始渲染期间，返回的状态 (state) 与传入的第一个参数 (initialState) 值相同。

setState 函数用于更新 state。它接收一个新的 state 值并将组件的一次重新渲染加入队列。

### 小结 Hooks 的使用规则

- 只能在顶层作用域调用 Hooks
  - 不能在内部的循环、条件判断、嵌套的方法中使用
- 只能在 React Function 里使用 Hooks
  - 不能在其他普通的 function 中使用 Hooks

## useState with Previous State

本节讲述如何使用 previous state，当你的 state 值依赖上一个状态值时，就会用到 previous state。

依然通过 Counter 的例子说明，增加了按钮点击 +1 或 -1

### Counter 示例

HookCounter.tsx

``` jsx
import React, { useState } from 'react'

function HookCounter() {

  const initialCount = 0
  const [count, setCount] = useState(initialCount)

  return (
    <div>
      Count: {count}
      <button onClick={() => {
        setCount(initialCount)
      }}>Reset</button>
      <button onClick={() => {
        setCount(count + 1)
      }}> + 1 </button>
      <button onClick={() => {
        setCount(count - 1)
      }}> - 1 </button>
    </div>
  )
}

export default HookCounter
```

App.tsx

``` jsx
import React from 'react'

import './App.css'

import HookCounter from './components/3HookCounter'

const App = () => {
  return (
    <div className="App">
      <HookCounter />
    </div>
  )
}

export default App
```

效果如下：

![](https://gw.alicdn.com/tfs/TB13LIYva61gK0jSZFlXXXDKFXa-306-179.gif)

看起来效果没有问题，**但是这样写是不安全的！** 这不是更改计数器的正确方法。下面告诉你为什么：

同样也是举个例子，在上述的示例中再增加一个按钮，每次累加5

代码如下

``` diff
import React, { useState } from 'react'

function HookCounter() {

  const initialCount = 0
  const [count, setCount] = useState(initialCount)

+  const increment5 = () => {
+    for (let i = 0; i < 5; i++) {
+      setCount(count + 1)
+    }
+  }

  return (
    <div>
      Count: {count}
      <button onClick={() => {
        setCount(initialCount)
      }}>Reset</button>
      <button onClick={() => {
        setCount(count + 1)
      }}> + 1 </button>
      <button onClick={() => {
        setCount(count - 1)
      }}> - 1 </button>
+      <button onClick={increment5}> + 5 </button>
    </div>
  )
}

export default HookCounter
```

点击 + 5 时，只加了 1

![](https://gw.alicdn.com/tfs/TB1AdMTvoz1gK0jSZLeXXb9kVXa-306-179.gif)

这是因为 setCount 方法是异步的，不能立即反应并更新，瞬间调动多次入参中的 count 仍然是旧的值，没有被更新。

将代码修改如下：

``` diff
import React, { useState } from 'react'

function HookCounter() {

  const initialCount = 0
  const [count, setCount] = useState(initialCount)

  const increment5 = () => {
    for (let i = 0; i < 5; i++) {
+      setCount(prevCount => prevCount + 1)
    }
  }

  return (
    <div>
      Count: {count}
      <button onClick={() => {
        setCount(initialCount)
      }}>Reset</button>
      <button onClick={() => {
        setCount(count + 1)
      }}> + 1 </button>
      <button onClick={() => {
        setCount(count - 1)
      }}> - 1 </button>
      <button onClick={increment5}> + 5 </button>
    </div>
  )
}

export default HookCounter
```

![](https://gw.alicdn.com/tfs/TB1ZG3WvkL0gK0jSZFAXXcA9pXa-306-179.gif)

注意到如果要使用 previous state，则需要通过 function 的方式传入 value 再返回变化后的新 value，将 `+ 1` `-1` 的功能也修改一下，完善后的代码如下：

``` jsx
import React, { useState } from 'react'

function HookCounter() {

  const initialCount = 0
  const [count, setCount] = useState(initialCount)

  const increment5 = () => {
    for (let i = 0; i < 5; i++) {
      setCount(prevCount => prevCount + 1)
    }
  }

  return (
    <div>
      Count: {count}
      <button onClick={() => {
        setCount(initialCount)
      }}>Reset</button>
      <button onClick={() => {
        setCount(prevCount => prevCount + 1)
      }}> + 1 </button>
      <button onClick={() => {
        setCount(prevCount => prevCount - 1)
      }}> - 1 </button>
      <button onClick={increment5}> + 5 </button>
    </div>
  )
}

export default HookCounter
```

### 小结

使用 previousState 时，要使用 setter function 的方式，传参给 setState 方法。来确保拿到的是准确的 previous state。

在重新渲染中，useState 返回的第一个值将始终是更新后最新的 state。

## useState with Object

当 useState 中的 state 为对象时，调用相应的 setState 有一些要注意的地方，useState 不会自动合并更新对象，你可以用函数式的 setState 结合展开运算符来达到合并更新对象的效果。

### 错误示例 firstName & lastName

HookCounter.tsx

``` jsx
import React, { useState } from 'react'

function HookCounter() {

  const [name, setName] = useState({
    firstName: '',
    lastName: ''
  })

  return (
    <form>
      <input
        type="text"
        value={name.firstName}
        onChange={e => {
          setName({
            firstName: e.target.value
          })
        }}
      />
      <input
        type="text"
        value={name.lastName}
        onChange={e => {
          setName({
            lastName: e.target.value
          })
        }}
      />
      <h2>Your first name is {name.firstName}</h2>
      <h2>Your last name is {name.lastName}</h2>
    </form>
  )
}

export default HookCounter
```

注意到 input 标签上的 onChange 中，每次 setName 时，只对对象中的一个属性做了操作。只给 firstName 赋值时，lastName 属性会消失，这是一种错误的写法。

由于我使用了 tsx 来写组件，我的编译器直接就报错了：

![](https://gw.alicdn.com/tfs/TB1q8E0voY1gK0jSZFCXXcwqXXa-1098-822.jpg)

浏览器也直接报错了

![](https://gw.alicdn.com/tfs/TB1FIMVvhD1gK0jSZFsXXbldVXa-910-832.jpg)

### 正确示例-手动合并对象

这里要使用展开运算符，来解决这个对象的问题

``` jsx
import React, { useState } from 'react'

function HookCounter() {

  const [name, setName] = useState({
    firstName: '',
    lastName: ''
  })

  return (
    <form>
      <input
        type="text"
        value={name.firstName}
        onChange={e => {
          setName({
            ...name,
            firstName: e.target.value
          })
        }}
      />
      <input
        type="text"
        value={name.lastName}
        onChange={e => {
          setName({
            ...name,
            lastName: e.target.value
          })
        }}
      />
      <h2>Your first name is {name.firstName}</h2>
      <h2>Your last name is {name.lastName}</h2>
      <h2>{JSON.stringify(name)}</h2>
    </form>
  )
}

export default HookCounter
```

![](https://gw.alicdn.com/tfs/TB1mfIUvXY7gK0jSZKzXXaikpXa-373-215.gif)

### 小结

state hook 中操作对象时，不会自动合并对象中的属性，需要我们手动来合并，可以运用展开运算符。

那么，数组也是类似的，见下一节。

## useState with Array

### 列表示例

点击按钮，列表增加一个1-10的随机数

UseStateWithArray.tsx

``` jsx
import React, { useState } from 'react'

interface ItemType {
  id: number
  value: number
}

function UseStateWithArray() {
  const [items, setItems] = useState<ItemType[]>([])

  const addItem = () => {
    setItems([
      ...items,
      {
        id: items.length,
        value: Math.ceil(Math.random() * 10)
      }
    ])
  }

  return (
    <div>
      <button onClick={addItem}>add a number</button>
      <ul>
        {
          items.length > 0 && items.map((item: ItemType) => (
            <li key={item.id}>{item.value}</li>
          ))
        }
      </ul>
    </div>
  )
}

export default UseStateWithArray
```

效果如下：

![](https://gw.alicdn.com/tfs/TB1vcE7vXY7gK0jSZKzXXaikpXa-418-215.gif)

注意 typeScript 在 hooks 中的使用方法，可参考如下文章

- [TypeScript 中使用React Hook](https://juejin.im/post/5ce0134b5188256a220235eb)

## useState 总结

关于 useState 的使用就到这里，这里稍作总结。

- 可以在函数式组件中使用 state
- 在类组件中，state 是一个对象，但是 useState 中，state可以不是对象，可以是任何类型
- useState 返回2个元素的数组
  - 第一个是 state 的当前值
  - 第二个是 state 的 setter 方法，调用时会触发 rerender
    - 若当前的 state 依赖 previous state，可以传入一个函数到 state 的 setter 方法中，入参为 previous state，返回新的 state
- 对于对象和数组，注意 state 中不会自动补全旧的变量，需要使用展开运算符自己手动补充

useState 的学习就到这里，下一篇将一起来学习 useEffect 的使用。



