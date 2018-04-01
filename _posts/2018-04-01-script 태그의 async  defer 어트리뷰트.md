---
layout:  post 
title:  "script 태그의 async defer 어트리뷰트"
date: 2018-04-01
categories: explanation
tags: script
---

```javascript
<script async src="extern.js"></script>
<script defer src="extern.js"></script>
```
![이미지 테스트](https://s31.postimg.org/3t2g1jujv/script-execution.jpg)

`
async :
웹페이지 파싱과 외부 스크립트 파일의 다운로드가 동시에 진행된다. 스크립트는 다운로드 완료 직후 실행된다. IE9 이하 버전은 지원하지 않는다.
`

`
defer :
웹페이지 파싱과 외부 스크립트 파일의 다운로드가 동시에 진행된다. 스크립트는 웹페이지 파싱 완료 직후 실행된다. IE9 이하 버전에서 정상적으로 동작하지 않을 수 있다.
`

`
async와 defer 어트리뷰트는 웹페이지 파싱과 외부 스크립트 파일의 다운로드가 동시에 진행된다는 면에서는 동일하다. 하지만 스크립트의 실행 시점이 다르다.
`