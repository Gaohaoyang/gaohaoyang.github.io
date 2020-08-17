---
layout: post
title:  "队列在前端弹窗中的应用"
categories: JavaScript
tags: dialog queue
author: HyG
---

* content
{:toc}


![](https://gw.alicdn.com/tfs/TB1rgXfXYY1gK0jSZTEXXXDQVXa-700-404.png)

前端开发中，如果遇到复杂的交互逻辑，数据结构的知识将帮助你理清思路，抽象逻辑，完成稳定可靠的逻辑代码。

本文就讲讲我在开发弹窗时加入的队列数据结构，也许有人疑问弹窗不是很简单吗，还需要引入队列？其实在复杂交互中，特别是互动类的界面中，很容易就会有超过 10 个弹窗对话框，万一同时被触发时，逻辑就会混乱，我们希望一个接一个的方式弹出，这里就需要队列了。





## 什么是队列

![](https://gw.alicdn.com/tfs/TB1y4MYXND1gK0jSZFKXXcJrVXa-406-274.png)

**队列（Queue）** 是先进先出（FIFO, First-In-First-Out）的线性表。在具体应用中通常用链表或者数组来实现。队列只允许在尾部进行插入操作（入队 enqueue），在头部进行删除操作（出队 dequeue）。队列的操作方式和堆栈类似，唯一的区别在于队列只允许新数据在后端进行添加。上图清晰的描述了队列的特性。

## JavaScript 实现队列

一个队列数据结构要包含以下 api

- 入队
- 出队
- 获取头部元素
- 获取尾部元素
- 队列是否为空

使用 JavaScript/TypeScript 数组可以模拟出这些 api，代码如下

```ts
class Queue {
  private dataStore: any[]

  constructor() {
    this.dataStore = []
  }

  public enqueue(e: any): void {
    this.dataStore.push(e)
  }

  public dequeue() {
    this.dataStore.shift()
  }

  public front() {
    return this.dataStore[0]
  }

  public back() {
    return this.dataStore[this.dataStore.length - 1]
  }

  public isEmpty(): boolean {
    if (this.dataStore.length === 0) {
      return true
    }
    return false
  }

  public toString() {
    return this.dataStore.join(',')
  }
}

export default Queue
```

可以写些测试用例来验证这个队列的功能，保证我们的队列运行正常

```js
import Queue from './Queues'

describe('Queue', () => {
  const q = new Queue()
  q.enqueue(1123)
  q.enqueue('chuanshi')
  q.enqueue('666')
  test('queue', () => {
    expect(q.toString()).toBe('1123,chuanshi,666')
    q.dequeue()
    expect(q.toString()).toBe('chuanshi,666')
    expect(q.front()).toBe('chuanshi')
    expect(q.back()).toBe('666')
    expect(q.isEmpty()).toBe(false)
    q.dequeue()
    q.dequeue()
    expect(q.isEmpty()).toBe(true)
  })
})
```

这样我们就得到了一个队列的数据结构。

## 对话框弹窗（Dialog）与队列的结合

弹窗被触发唤起会有以下3种情况：
1. 同一时间段只有一个 Dialog 被触发
2. 同一时间段有2个 Dialog 同时被触发
3. Dialog 正在展示时，又触发了另一个 Dialog

为了满足以上3种情况，需要在主线程和弹窗展示之间加一个队列控制逻辑，它们的时序图如下：

<!-- ![](https://gw.alicdn.com/tfs/TB124dgXYr1gK0jSZR0XXbP8XXa-333-313.svg)

![](https://gw.alicdn.com/tfs/TB1zk4gXYj1gK0jSZFOXXc7GpXa-411-526.svg)

![](https://gw.alicdn.com/tfs/TB1QIhfX7T2gK0jSZPcXXcKkpXa-411-526.svg) -->

```plantuml
title 队列弹窗逻辑之1个弹窗

right footer by Chuanshi 20190712

skinparam activityBackgroundColor #efefef
skinparam activityBorderColor #454545
skinparam activityArrowColor #666666
skinparam style strictuml

participant DialogA order 10
participant Main order 1
participant QueueCtrl order 2

activate Main

Main -> QueueCtrl: showDialogA
activate QueueCtrl
QueueCtrl -> QueueCtrl: enqueue eventA

QueueCtrl -> DialogA: show
activate DialogA
DialogA -> DialogA: showing
DialogA -> QueueCtrl: close
deactivate DialogA
QueueCtrl -> QueueCtrl: dequeue eventA
```

```plantuml
title 队列弹窗逻辑之2个弹窗同时被触发

right footer by Chuanshi 20190712

skinparam activityBackgroundColor #efefef
skinparam activityBorderColor #454545
skinparam activityArrowColor #666666
skinparam style strictuml

participant DialogA order 20
participant DialogB order 30
participant Main order 1
participant QueueCtrl order 2

activate Main

Main -> QueueCtrl: showDialogA
activate QueueCtrl
QueueCtrl -> QueueCtrl: enqueue eventA
Main -> QueueCtrl: showDialogB
QueueCtrl -> QueueCtrl: enqueue eventB

QueueCtrl -> DialogA: show
activate DialogA
DialogA -> DialogA: showing
DialogA -> QueueCtrl: close
deactivate DialogA
QueueCtrl -> QueueCtrl: dequeue eventA

QueueCtrl -> DialogB: show
activate DialogB
DialogB -> DialogB: showing
DialogB -> QueueCtrl: close
deactivate DialogB
QueueCtrl -> QueueCtrl: dequeue eventB
```

```plantuml
title 队列弹窗逻辑之1个正在展示时又触发另一个弹窗

right footer by Chuanshi 20190712

skinparam activityBackgroundColor #efefef
skinparam activityBorderColor #454545
skinparam activityArrowColor #666666
skinparam style strictuml

participant DialogA order 20
participant DialogB order 30
participant Main order 1
participant QueueCtrl order 2

activate Main

Main -> QueueCtrl: showDialogA
activate QueueCtrl
QueueCtrl -> QueueCtrl: enqueue eventA
QueueCtrl -> DialogA: show
activate DialogA
DialogA -> DialogA: showing
Main -> QueueCtrl: showDialogB
QueueCtrl -> QueueCtrl: enqueue eventB
DialogA -> QueueCtrl: close
deactivate DialogA
QueueCtrl -> QueueCtrl: dequeue eventA
QueueCtrl -> DialogB: show
activate DialogB
DialogB -> DialogB: showing
DialogB -> QueueCtrl: close
deactivate DialogB
QueueCtrl -> QueueCtrl: dequeue eventB
```

上述时序图清晰的表达了弹窗触发的各种情况，那么起到关键作用的队列控制（QueueCtrl）部分应该如何编写呢？其实也很简单，它的逻辑如下：

<!-- ![](https://gw.alicdn.com/tfs/TB1q6NfX.T1gK0jSZFrXXcNCXXa-274-420.svg) -->

```plantuml

skinparam activityBackgroundColor #efefef
skinparam activityBorderColor #454545
skinparam activityArrowColor #666666
skinparam style strictuml

title 队列弹窗逻辑活动图

right footer by Chuanshi 20190712

start
fork
  :元素入队;
fork again
while (队列为空?) is (false)
  :队首弹窗触发;
  :队首弹窗关闭;
  :队首元素出队;
endwhile (true)
endfork
stop
```

当空队列的第一个元素入队后，上图的右侧循环部分开始启动，同时依然可以有元素入队，直到右侧循环逻辑将队列所有元素出队后，整个活动停止。

核心代码如下：

``` ts
import Queue from './Queues'

const queue = new Queue() // 实例化上文写好的队列类

/**
 * 将弹窗事件名推入队列
 */
const push = (eventName: globalEventName) => {
  if (queue.isEmpty()) {
    queue.enqueue(eventName)
    openDialog() // 启动出队逻辑
  } else {
    queue.enqueue(eventName) // 循环中依然可以同时入队新的元素
  }
}

/**
 * 打开弹窗，递归，循环出队
 */
const openDialog = () => {
  // 打开弹窗
  document.dispatchEvent(new Event(queue.front()))

  // 监听弹窗关闭
  document.addEventListener(`${queue.front()}Close`, () => {
    queue.dequeue() // 出队
    if (!queue.isEmpty()) { // 队列不为空时，递归
      openDialog()
    }
  })
}

export default {
  push,
}
```

只需要调用 `push()` 就可以达到我们的目的，可以看到使用队列这种数据结构，不到20行代码，非常简洁优雅的解决了这个问题！

## Toast 与队列的结合

与 Dialog 类似，为了避免多次触发导致的 Toast 堆叠，把每一个要弹出的 Toast 内容入队，每个 Toast 完成时，出队，并递归调用展示，直到队列内容为空。这里不展开说明了。

## 小结

当然上面的需求不使用队列也可以实现，但是队列数据结构的意义在于可以让整个实现更加规范化、抽象化且易于维护。

熟练掌握数据结构的知识，可以让开发的过程中思路更加清晰，代码抽象化程度更高，更加合理的组织代码，提高开发效率。当遇到棘手的问题时，可以多思考一些数据结构中的知识点，说不定可以达到事半功倍的效果呢！
