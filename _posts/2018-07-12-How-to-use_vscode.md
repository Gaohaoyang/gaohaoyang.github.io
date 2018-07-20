---
layout:  post 
title:  "How-to-use_vscode"
date: 2018-07-12
categories: explanation 
tags: vscode
---

* content
{:toc}

## visual studio code (이하 vscode)
[설치하기](https://code.visualstudio.com/)

- vscode 는 마이크로소프트가 제작한 툴입니다. (요새 마소 열일 하는거 아시죠? 깃허브도 먹었고..)

- 외국 또는 국내 프론트엔드 개발자가 많이 쓰는 툴입니다.
[인텔리제이와 vscode 스펙 비교글](https://www.slant.co/versus/1958/5982/~intellij-idea_vs_visual-studio-code)

- 내장 터미널과 젠코딩을 기본적으로 포함하고 있으며, 무료이지만 다양한 패키지들로 다른 유료 툴 (jetbrain제품들 : intellij, webstorm 등등)들과 비교하여 뒤쳐지지 않습니다. (업데이트로 jetbrain제품들의 기능이 추가되는 중입니다.)
![Alt text](/img/vs_vscode.png)

- 아톰과 달리 패키지를 설치해도 크게 무거워지지 않고, 깃허브계정으로 패키지 동기화가 가능합니다.(다른 pc가서도 설치했던 패키지를 불러올 수 있습니다.) 비슷한 이름인 visual studio와는 다릅니다. 

- 기본 설정에 익숙한 사람들에게는 추가 기능을 파악하기 힘들고, ftp 연결이 불편하다는 단점이 있습니다.(동기화가 빠르지 않고, 저장시 한번 더 확인이 필요합니다.)


### 1. ui설명

#### 1. 사이드메뉴
![Alt text](/img/menu.png)
1. 탐색기 : 열려있는 파일과 폴더구조를 볼수있음 
2. 디버그모드 : 디버그모드(추후에 추가 작성)
3. git : git과 연결된 폴더 관리
4. 패키지 관리 : 패키지(extension) 관리
5. 검색 : 기본 단축키로 대체 됨. ctrl+f, ctrl + h

** 사이드 바에서 마우스 오른쪽 클릭하여 보이고 안보이고 해제 가능.**
** ctrl+b로 토글 **

#### 2. 콘솔(터미널)
하단에 콘솔로 git 연결 등등 기능을 할수있다. 

#### 3. 판넬(?)
창을 드래그하여 왼쪽의 메뉴에서 끌어다 놓을 수 있다. 놓는 위치에 따라 각각의 사분면으로 분할 할 수 있다. 
**ctrl + 1~4로 창을 분할 및 포커스 이동 할 수 있다. **

##### 개요
![Alt text](/img/filter.png)
탐색기에서 아래쪽의 개요를 이용하여 전체 구조를 볼 수 있다.
js인 경우 변수와 함수로 구분되며, 전역변수가 맨 밑에 위치한다. 
html인 경우 태그로 인식한다. 
css인 경우 클래스로 인식한다. 




### 2. 단축키 및 셋팅
- 설정 : 파일 - 기본설정 - 설정 에서 설정을 변경할 수 있다. 
  기본 셋팅은 왼쪽에 있고, 오른족에 추가로 작성하여 덮어 쓰는 방식으로 설정을 바꿀수있다. 
  
- 단축키 설정 : 파일 - 기본설정 - 바로가기 키에서 단축키 변경 및 확인은 할 수 있다. 
  keybindings.json으로 패키지 설치시 패키지 기능과 추가적인 단축키 셋팅을 할 수 있다.

- f1의 기능 : 설치된 패키지 및 내부 기능을 사용할수있다. 
  - wrapping : 선택된 것의 앞뒤로 태그 추가 기능
  - theme : 테마 선택
  - sync, simple-ftp 등등
  - f1을 누른후 백스페이스로 > 지운후에는 파일명을 검색 할수 있다.(확장자로도 가능)

- 터미널 열기 ctrl + `
- 라인정렬 ctrl + k,f & ctrl + k,d & shift + alt + f
- 공백지우기 ctrl + k,x (라인정렬에 기능포함)
- 라인 간소화 ctrl + j
- code folding ctrl + shift + [,]
- 열린 파일의 경로로 터미널 경로 잡아주기 ctrl + alt + o
- 전체 ui 사이즈 조절 ctrl +,-
- ctrl + g 입력한 라인으로 커서 이동하기
```
// 키 바인딩을 이 파일에 넣어서 기본값을 덮어씁니다.
[
  {//터미널로 포커스 이동하기
   "key": "alt+4","command": "workbench.action.terminal.focus",
   "when":"!termianlFocus"
  },
  {//열려있는 창 목록 보기
    "key": "ctrl+numpad1",
    "command": "workbench.action.showAllEditors"
  },
  {//마크다운 파일 보기
    "key": "ctrl+d ctrl+f",
    "command": "markdown.showPreviewToSide"
  },
  {//터미널에 포커스가 있을때 터미널 클리어
    "key": "ctrl+c",
    "command": "workbench.action.terminal.clear",
    "when": "terminalFocus"
  },
  {//웹으로 바로보기
    "key": "ctrl+f1",
    "command": "extension.inBrowser",
    "when": "editorTextFocus"
  },
]
```




### 3. 패키지
[패키지 보러가기](https://rudwnok123.github.io/2018/06/07/vscode-%ED%8C%A8%ED%82%A4%EC%A7%80/)

#### sync로 vscode 패키지 저장
[설명](https://rudwnok123.github.io/2018/03/19/vscode-%ED%8C%A8%ED%82%A4%EC%A7%80-%EC%A0%80%EC%9E%A5%ED%95%98%EA%B8%B0/) : 작성중..

#### simple-ftp로 ftp연결 
[보러가기](https://rudwnok123.github.io/2018/05/06/vscode-ftp%EC%97%B0%EA%B2%B0/) : 수정중..D:\rudwn\code\rudwnok123.github.io\_config.yml

- 패키지를 받을 시 git history나 git lens등 다양한 git 관련 기능을 사용할 수 있습니다. 

### 4. git
![Alt text](/img/git_remote.png)
기본적인 git 명령어: add, push, pull, commit 같은건 내장된 터미널 상에서 할수있고,
자체적으로 소스트리와 github desktop처럼 ui에서 push, pull, commit을 지원한다. 연결된 레포가 있다면 왼쪽 사이드 방의 가지모양에서 소스제어 공급자 아래에 목록이 생긴다. 
연결된 파일을 수정하게 되면 수정한 것이 변경 내용에 뜨고 커밋메시지를 입력후 빨간색 표시를 눌러 push(등등 목록이 나온다.)를 할수있다.

**git 자체의 명령어나 데이터 이동에 대한 건 심오한 내용이라 여기선 다루지 않습니다**

### 5. 다른 에디터들

#### atom 
- 무료. 패키지 종류가 많다. 단축키화는 불편한듯.. ftp연결은 vscode보다 낫다. 패키지 설치시 무거워짐

#### editplus 
- 기본적으로 유료. ftp관리 편함 

-- 추가 작성중

{% include comments.html %}