---
layout: post
title:  "Git 如何 clone 非 master 分支的代码"
categories: GitHub
tags:  Git GitHub 分支
---

* content
{:toc}

## 问题描述

我们每次使用命令

```
git clone git@gitlab.xxx.com:xxxxx.git
```

默认 clone 的是这个仓库的 master 分支。如果最新的代码不在 master 分支上，该如何拿到呢？如下图所示，最新的代码可能在`daily/1.4.1`分支上，我们希望拿到这个分支上的代码。




![7f07c8f6deef169ef6be5103bbd3e932f8676bb1.png](https://ooo.0o0.ooo/2016/07/07/577e349ab42ed.png)

## 解决方法

**刚刚开周会的时候，自己洋洋得意的分享我的解决方案，但是……经过与团队成员的的讨论，自己的方法弱爆了，现在把更优雅的方法写一下。原来写的方法并不太适合用在这个场景里。** 我之前写的方法在文章后面。

直接使用命令

```
git branch -r #查看远程分支
```
或

```
git branch -a #查看所有分支
```

会显示

```
origin/HEAD -> origin/master
origin/daily/1.2.2
origin/daily/1.3.0
origin/daily/1.4.1
origin/develop
origin/feature/daily-1.0.0
origin/master
```

然后直接

```
git checkout origin/daily/1.4.1
```

就好了。。。

## 原来的解决方案

**其实我原来写的这个方法更多的是：设置已有的本地分支跟踪一个刚刚拉取下来的远程分支，或者想要修改正在跟踪的上游分支。**

我们在本地先建立一个分支，建议名称和远程的想要同步的分支名称一样。

```
git branch daily/1.4.1
```

在切换到这个本地分支

```
git checkout daily/1.4.1
# Switched to branch 'daily/1.4.1'
```

接下来就可以去建立上游分支的关联了，但是这个命令比较长，不好记，我们可以直接先`pull`一下，git 会提示我们相应的操作和命令。

```
git pull
There is no tracking information for the current branch.
Please specify which branch you want to merge with.
See git-pull(1) for details.

    git pull <remote> <branch>

If you wish to set tracking information for this branch you can do so with:

    git branch --set-upstream-to=origin/<branch> daily/1.4.1
```

我们看到最后一行，执行这个命令，即可完成与上游分支的关联。

```
git branch --set-upstream-to=origin/daily/1.4.1 daily/1.4.1
# Branch daily/1.4.1 set up to track remote branch daily/1.4.1 from origin.
```

然后再`pull`一下就好了！

```
git pull
```
