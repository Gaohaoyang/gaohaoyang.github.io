---
layout: post
title:  "React Hooks 系列之8 custom Hook"
categories: JavaScript
tags: React hooks
author: HyG
---

* content
{:toc}

掌握 React Hooks api 将更好的帮助你在工作中使用，对 React 的掌握更上一层楼。本系列将使用大量实例代码和效果展示，非常易于初学者和复习使用。

截至目前，学习了官方的这么多 hooks api，我们也可以创造一些自己的 hooks，甚至官方也在鼓励开发者将组件逻辑抽象到自定义 hooks 中，方便复用。

自定义 Hook 是一个函数，其名称以 “use” 开头，函数内部可以调用其他的 Hook。

通过自定义 Hook，可以将组件逻辑提取到可重用的函数中。




## useDocumentTitle 示例

### function 普通写法

我们想创建一个计数器，计数器的值改变后，希望改变页面的 Title

DocTitleOne.tsx

``` jsx
import React, { useState, useEffect } from 'react'

function DocTitleOne() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = `Count - ${count}`
  }, [count])
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >Count - {count}</button>
    </div>
  )
}

export default DocTitleOne

```

App.tsx

``` jsx
import React from 'react'
import './App.css'

import DocTitleOne from './components/31DocTitleOne'

const App = () => {
  return (
    <div className="App">
      <DocTitleOne />
    </div>
  )
}

export default App
```

页面展示如下

![](https://gw.alicdn.com/tfs/TB1ilw2HUY1gK0jSZFMXXaWcVXa-407-221.gif)

运行没有问题，接下来又有一个需求的增量，就是页面要在另一个组件中也能改变页面的 Title，接下来我们创建一个新的组件。

DocTitleTwo.tsx

``` jsx
import React, { useState, useEffect } from 'react'

function DocTitleTwo() {
  const [count, setCount] = useState(0)
  useEffect(() => {
    document.title = `Count - ${count}`
  }, [count])
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >Count - {count}</button>
    </div>
  )
}

export default DocTitleTwo
```

App.tsx

``` jsx
import React from 'react'
import './App.css'

import DocTitleOne from './components/31DocTitleOne'
import DocTitleTwo from './components/31DocTitleTwo'

const App = () => {
  return (
    <div className="App">
      <DocTitleOne />
      <DocTitleTwo />
    </div>
  )
}

export default App
```

页面展示如下

![](https://gw.alicdn.com/tfs/TB1sNg1HUz1gK0jSZLeXXb9kVXa-407-221.gif)

回顾代码，DocTitleTwo 显然重复了 DocTitleOne 的代码，设想一下如果有 10 个组件都要修改页面 title 的话，你肯定不想重复这些代码。这时就需要自定义 Hook 了。

这个示例中，我们可以创建一个自定义 Hook 来设置页面的 title。然后使用这个自定义 Hook 在不同的组件中。

### 抽象出 useDocumentTitle hook

useDocumentTitle.tsx

``` jsx
import { useEffect } from 'react'

function useDocumentTitle(count: number) {
  useEffect(() => {
    document.title = `Count - ${count}`
  }, [count])
}

export default useDocumentTitle
```

DocTitleOne.tsx

``` jsx
import React, { useState } from 'react'
import useDocumentTitle from './hooks/useDocumentTitle'

function DocTitleOne() {
  const [count, setCount] = useState(0)
  useDocumentTitle(count)
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >Count - {count}</button>
    </div>
  )
}

export default DocTitleOne
```

DocTitleTwo.tsx

``` jsx
import React, { useState } from 'react'
import useDocumentTitle from './hooks/useDocumentTitle'

function DocTitleTwo() {
  const [count, setCount] = useState(0)
  useDocumentTitle(count)
  return (
    <div>
      <button
        onClick={() => {
          setCount(count + 1)
        }}
      >Count - {count}</button>
    </div>
  )
}

export default DocTitleTwo
```

App.tsx

``` jsx
import React from 'react'
import './App.css'

import DocTitleOne from './components/31DocTitleOne'
import DocTitleTwo from './components/31DocTitleTwo'

const App = () => {
  return (
    <div className="App">
      <DocTitleOne />
      <DocTitleTwo />
    </div>
  )
}

export default App
```

页面展示如下

![](https://gw.alicdn.com/tfs/TB1sNg1HUz1gK0jSZLeXXb9kVXa-407-221.gif)

我们回顾一下代码

在 DocTitleOne 中，引入了我们定义的 useDocumentTitle，传入了 count 这个状态的值。useDocumentTitle 中执行代码，将页面title 初始值设置为 0，然后继续渲染 DocTitleOne jsx 部分。点击按钮时，count 变为 1，触发了 DocTitleOne 的 rerender，useDocumentTitle 中入参也变为了 1，将页面 title 变为 1。

## useCounter 示例

### 冗余的写法

CounterOne.tsx

``` jsx
import React, {useState} from 'react'

function CounterOne() {
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(prevCount => prevCount + 1)
  }
  const decrement = () => {
    setCount(prevCount => prevCount - 1)
  }
  const reset = () => {
    setCount(0)
  }
  return (
    <div>
      <h2>Count - {count}</h2>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

export default CounterOne
```

CounterTwo.tsx

``` jsx
import React, {useState} from 'react'

function CounterTwo() {
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(prevCount => prevCount + 1)
  }
  const decrement = () => {
    setCount(prevCount => prevCount - 1)
  }
  const reset = () => {
    setCount(0)
  }
  return (
    <div>
      <h2>Count - {count}</h2>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

export default CounterTwo
```

App.tsx

``` jsx
import React from 'react'
import './App.css'
import CounterOne from './components/32CounterOne'
import CounterTwo from './components/32CounterTwo'

const App = () => {
  return (
    <div className="App">
      <CounterOne />
      <CounterTwo />
    </div>
  )
}

export default App
```

页面展示如下

![](https://gw.alicdn.com/tfs/TB1Kf78HQL0gK0jSZFxXXXWHVXa-407-347.gif)

相同的问题，我们有大量重复代码，接下来我们来看如何使用自定义 hook 来进行优化。

### useCounter 抽象

useCounter.tsx

``` jsx
import { useState } from 'react'

function useCounter() {
  const [count, setCount] = useState(0)
  const increment = () => {
    setCount(prevCount => prevCount + 1)
  }
  const decrement = () => {
    setCount(prevCount => prevCount - 1)
  }
  const reset = () => {
    setCount(0)
  }
  return [count, increment, decrement, reset]
}

export default useCounter
```

CounterOne.tsx

``` jsx
import React from 'react'
import useCounter from './hooks/useCounter'

function CounterOne() {
  const [count, increment, decrement, reset] = useCounter()
  return (
    <div>
      <h2>Count - {count}</h2>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

export default CounterOne
```

CounterTwo.tsx

``` jsx
import React from 'react'
import useCounter from './hooks/useCounter'

function CounterTwo() {
  const [count, increment, decrement, reset] = useCounter()
  return (
    <div>
      <h2>Count - {count}</h2>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
      <button onClick={reset}>reset</button>
    </div>
  )
}

export default CounterTwo
```

App.tsx
``` jsx
import React from 'react'
import './App.css'
import CounterOne from './components/32CounterOne'
import CounterTwo from './components/32CounterTwo'

const App = () => {
  return (
    <div className="App">
      <CounterOne />
      <CounterTwo />
    </div>
  )
}

export default App
```

页面展示依然如下

![](https://gw.alicdn.com/tfs/TB1Kf78HQL0gK0jSZFxXXXWHVXa-407-347.gif)

可以看到目前我们的代码结构就比较好了，我们还可以在 useCounter 中给 counter 设置初始值，如下

useCounter.tsx

``` jsx
import { useState } from 'react'

function useCounter(initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  const increment = () => {
    setCount(prevCount => prevCount + 1)
  }
  const decrement = () => {
    setCount(prevCount => prevCount - 1)
  }
  const reset = () => {
    setCount(initialValue)
  }
  return [count, increment, decrement, reset]
}

export default useCounter
```

使用时，对应的可以传入初始值

``` jsx
const [count, increment, decrement, reset] = useCounter(10)
```

我们还可以修改每次增加或减少的数字，如下

``` jsx
import { useState } from 'react'

function useCounter(initialValue = 0, value = 1) {
  const [count, setCount] = useState(initialValue)
  const increment = () => {
    setCount(prevCount => prevCount + value)
  }
  const decrement = () => {
    setCount(prevCount => prevCount - value)
  }
  const reset = () => {
    setCount(initialValue)
  }
  return [count, increment, decrement, reset]
}

export default useCounter
```

使用时，对应的也可以增加入参

``` jsx
const [count, increment, decrement, reset] = useCounter(10, 5)
```

## useInput 示例

示例是一个简单表单，用户可以填写姓名

### function 普通写法

UserForm.tsx

``` jsx
import React, { useState, FormEvent } from 'react'

function UserForm() {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    console.log(`Hello ${firstName} ${lastName}`)
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="">First name</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value)
            }}
          />
        </div>
        <div>
          <label htmlFor="">Last name</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value)
            }}
          />
        </div>
        <button>submit</button>
      </form>
    </div>
  )
}

export default UserForm
```

App.tsx

``` jsx
import React from 'react'
import './App.css'

import UserForm from './components/33UserForm'

const App = () => {
  return (
    <div className="App">
      <UserForm />
    </div>
  )
}

export default App
```

![](https://gw.alicdn.com/tfs/TB105U6HQL0gK0jSZFtXXXQCXXa-696-241.gif)

### 抽象出 useInput hook

useInput.tsx

``` jsx
import { useState } from 'react'

function useInput(initialValue: string) {
  const [value, setValue] = useState(initialValue)
  const reset = () => {
    setValue(initialValue)
  }
  const bind = {
    value,
    onChange(e: any) {
      setValue(e.target.value)
    }
  }
  return [value, bind, reset]
}

export default useInput
```

UserForm.tsx

``` jsx
import React, { FormEvent } from 'react'
import useInput from './hooks/useInput'

function UserForm() {

  const [firstName, bindFirstName, resetFirstName] = useInput('')
  const [lastName, bindLastName, resetLastName] = useInput('')

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    console.log(`Hello ${firstName} ${lastName}`)
    // @ts-ignore
    resetFirstName()
    // @ts-ignore
    resetLastName()
  }
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor="">First name</label>
          <input
            type="text"
            {...bindFirstName}
          />
        </div>
        <div>
          <label htmlFor="">Last name</label>
          <input
            type="text"
            {...bindLastName}
          />
        </div>
        <button>submit</button>
      </form>
    </div>
  )
}

export default UserForm
```

页面展示

![](https://gw.alicdn.com/tfs/TB1zXxbH7T2gK0jSZFkXXcIQFXa-696-241.gif)

## 小结

本章我们主要学习了自定义 Hook，举了 3 个例子，帮助我们学习抽象与复用代码。社区上还有很多人写了自己的自定义 Hook，大家也可以前去学习。也鼓励大家创造一些自己的自定义 Hook。

至此，本系列完结。祝一切顺利，大家都能学到东西。
