---
layout:  post 
title:  "vscode ftp 연결"
date: 2018-05-06
categories: explanation
tags: vscode ftp
---

# vscode에서 ftp연결하기 

1. 확장프로그램에서 ftp-simple 다운. 

2. f1누르고 >ftp-simple:config 엔터. 

3. ftp정보 입력. 
   - name : ftp연결에 대한 이름 . ex.내홈피
   - host : 연결 주소 . 이부분에서 계속 막혔었는데 http://호스트 주소가 아닌 http://를 제외한 주소 . http://naver.com(x) -> naver.com
   - port : 포트 번호 . 굳이 없다면 기본값인 21로. 
   - username : 로그인 id
   - password : 접속 비번
   - path : 실제 접속이 시작되는 경로. 여기서부터 시작해서 안으로 들어가면서 폴더를 찾고 찾은 폴더부터 시작할수있으니 / 로 잡아도 됨. 

4. 저장한 값  그대로 ctrl + s 눌러서 저장. 

5. f1을 누르고 ftp-simple:remote 엔터. ftp-simple:config 에 저장한 이름 엔터. 

- 연결 해제는 ftp-simple:close가 있지만 연결해제는 안되는 거 같고..그냥 연결된 폴더 해제를 해야될거 같다. 
