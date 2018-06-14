---
layout:  post 
title:  "html, css, js 파일 수정시 브라우저 리로드(liveServer)여러 종류"
date: 2018-06-14
categories: explanation
tags: etc
---

1. 크롬확장프로그램 livepage
  - https://chrome.google.com/webstore/detail/livepage/pilnojpmdoofaelbinaeodfpjheijkbh?hl=en 
2. html페이지마다 삽입 
```
<script type="text/javascript" src="http://livejs.com/live.js "></script>
```

4. 3. node.js의 gulp모듈과 Browsersync 어플리케이션 설치
  -  https://www.browsersync.io/  https://blog.outsider.ne.kr/1216
4. node.js의 gulp모듈과 gulp-watch , gulp-liverload 플러그인 사용
  - http://hochulshin.com/gulp-livereload-sample/ 
  - http://hochulshin.com/very-simple-hapi-server-sample/ 
  - http://webclub.tistory.com/471 
5. node.js의 gulp 모듈과 grunt-countrib-watch, grunt-express 플러그인 사용
6. 크롬확장프로그램 liveeload, guard(루비설치필요)
  - https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei/related?hl=en  
  - https://github.com/guard/guard-livereload
7. Chromix

_ _ _

다음은 툴에서 지원하는 방식입니다.
방식8-[아톰(Atom)/패키지] atom-live-server (실시간 미리보기) http://recoveryman.tistory.com/302  
방식9-[브라켓(Brackets)] 실시간 미리보기 http://recoveryman.tistory.com/139  
방식10-드림위버사용 https://helpx.adobe.com/kr/dreamweaver/using/previewing-pages.html  
방식11-웹스톰(유료) https://www.youtube.com/watch?v=UHYtQm-8N0k  
방식12-sublime text 사용 http://demun.tistory.com/2345  
방식13-[비주얼 스튜디오 코드(Visual Studio Code)] live server http://recoveryman.tistory.com/383  



_ _ _
참고로 Browsersync 가 기능면에서 가장 강력하고 livepage 가장 심플했습니다.
,live.js 도 나름 좋았습니다.(내부코드보면 로컬일때만 동작하게 되어있네요)
nodejs,tomcat 등을 사용하지 않고 테스트하려면 간단히 다음의 방법을 사용하면 됩니다.
파이썬  python -m SimpleHTTPServer 8080
루비 ruby -run -e httpd . -p 8080


원본글 : [okky](https://okky.kr/article/456242)


