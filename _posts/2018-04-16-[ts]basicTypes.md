---
layout:  post 
title:  "1. basicTypes"
date: 2018-04-16
categories: explanation
tags: typescript
---

// tuple
// 고정된 요소수 만큼의 자료형을 미리 선언후 배열을 표현
```
let x: [string, number];
x = ['hello', 10]; // OK
```
// enum
// 열거형. 숫자값 집합에 이름을 지정한 것
```
enum Color1 { Red, Green, Blue };
let c1: Color1 = Color1.Green;

console.log(c1); // 1
enum Color2 { Red = 1, Green, Blue };
let c2: Color2 = Color2.Green;

console.log(c2); // 2
enum Color3 { Red = 1, Green = 2, Blue = 4 };
let c3: Color3 = Color3.Blue;

console.log(c3); // 4
```

// any
// 타입 체크가 필요없는 변수는 any 타입으로 선언 = 아무거나 가능
```
let notSure: any = 4;
notSure = 'maybe a string instead';
```
// union
// 둘중하나의 타입이 될 수 있다.
```
var val: string | number
val = 12
console.log("numeric value of val " + val)
val = "This is a string"
console.log("string value of val " + val)
```
// never
// 결코 발생하지 않는 값
```
let foo: never; // Okay
let bar: never = (() => { throw new Error('Throw my hands in the air like I just dont care') })();
```
// void
// 반환값이 없을 경우
```
function Void(): void {
  console.log("hi");
}
```