---
layout: post
title:  "同步一个 fork"
date:   2015-04-12 15:14:54
categories: GitHub
excerpt: fork 了之后同步，fork了别人的代码，保持远程同步。
---

* content
{:toc}


## 如何使用搜索引擎

其实这个问题并不难，我又被坑了。百度搜的东西不靠谱啊，以后这种问题一定要用**英文**在 [Google](http://www.google.com) 或者 [Bing](http://cn.bing.com/) 上搜索，这样才能搜到原汁原味的答案。就当是一个教训吧。   

搜索 fork sync，就可以看到 GitHub 自己的帮助文档 [Syncing a fork](https://help.github.com/articles/syncing-a-fork/) 点进去看这篇的时候，注意到有一个 Tip: Before you can sync your fork with an upstream repository, you must [configure a remote that points to the upstream repository](https://help.github.com/articles/configuring-a-remote-for-a-fork/) in Git.    
根据这两篇文章，问题迎刃而解！   

---

## 具体方法

---

### Configuring a remote for a fork

* 给 fork 配置一个 remote   

* 主要使用 `git remote -v` 查看远程状态。   


<pre><code>git remote -v
# origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
# origin  https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
</code></pre>

* 添加一个将被同步给 fork 远程的上游仓库      


<pre><code>git remote add upstream https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git
</code></pre>


* 再次查看状态确认是否配置成功。   

<pre><code>git remote -v
# origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (fetch)
# origin    https://github.com/YOUR_USERNAME/YOUR_FORK.git (push)
# upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (fetch)
# upstream  https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY.git (push)
</code></pre>

---

### Syncing a fork

* 从上游仓库 fetch 分支和提交点，传送到本地，并会被存储在一个本地分支 upstream/master   
`git fetch upstream`    

<pre><code>git fetch upstream
# remote: Counting objects: 75, done.
# remote: Compressing objects: 100% (53/53), done.
# remote: Total 62 (delta 27), reused 44 (delta 9)
# Unpacking objects: 100% (62/62), done.
# From https://github.com/ORIGINAL_OWNER/ORIGINAL_REPOSITORY
#  * [new branch]      master     -> upstream/master
</code></pre>

* 切换到本地主分支(如果不在的话)    
`git checkout master`    

<pre><code>git checkout master
# Switched to branch 'master'
</code></pre>

* 把 upstream/master 分支合并到本地 master 上，这样就完成了同步，并且不会丢掉本地修改的内容。    
`git merge upstream/master`      

<pre><code>git merge upstream/master
# Updating a422352..5fdff0f
# Fast-forward
#  README                    |    9 -------
#  README.md                 |    7 ++++++
#  2 files changed, 7 insertions(+), 9 deletions(-)
#  delete mode 100644 README
#  create mode 100644 README.md
</code></pre>

* 如果想更新到 GitHub 的 fork 上，直接 `git push origin master` 就好了。