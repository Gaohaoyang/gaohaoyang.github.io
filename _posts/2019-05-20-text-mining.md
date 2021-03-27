---
layout: post
title:  "文本挖掘实战-Text Mining Implementation"
date:   2019-05-20 13:00:00
categories: 实战案例
tags: 生活大爆炸 NLP 自然语言处理 台词 可视化 身份证 华为 微信 诗歌 simhash
excerpt: 深入挖掘分析生活大爆炸（Big Bang）的台词信息，看看各个角色的常用词汇有哪些
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# NLP技能

- 汇总NLP技能
- 【2020-11-17】[奥森轨迹数据可视化分析](https://zhuanlan.zhihu.com/p/44857246)
- Github跑步数据可视化[示例](https://github.com/yihong0618/running_page)，[代码](https://running.leeyom.top/)
    - ![](https://p9-tt-ipv6.byteimg.com/img/pgc-image/8bc936dfa8c54211a71e21a22b5d1355~tplv-obj:1233:793.image?from=post)
- 【2020-9-2】[文本挖掘实操课！手把手教你用文本挖掘剖析54万首诗歌](https://blog.csdn.net/BF02jgtRS00XKtCx/article/details/108191211)
    - ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9uSUFtMTZ5VWdQajJtamFJdzdLM1hxYld3elF0TTlNY0Q3RVF6alJTRkhlSXBwT2JaempFN0MyNFVyMlloMXBlZzBFaWFCSTVHaHI2M2lickpQUEZaZkVnLzY0MA?x-oss-process=image/format,png)
    - ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9uSUFtMTZ5VWdQajJtamFJdzdLM1hxYld3elF0TTlNYzVGcmljYmhCREVoU2E2N0NadGZXYktDVlNPeU1ZdDBZdmhobFpXc01HSnpUY1U4T3RCUlFFMXcvNjQw)
    - ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9uSUFtMTZ5VWdQajJtamFJdzdLM1hxYld3elF0TTlNYzZIeGUzOHBMWUtnUXZiNXpJbXJ0TTBGc29aSjVBTXZGenZaaG1hejdDYzN6RnBmeGhWNVRSdy82NDA?x-oss-process=image/format,png)
    - ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9uSUFtMTZ5VWdQajJtamFJdzdLM1hxYld3elF0TTlNY3NMYWtrRmtuTHRmNFpMbFFTMmljSWV0c0R5UUhjdlFxdEdLZk1vM1hmZnVNdUo1U2JUOVhjV3cvNjQw?x-oss-process=image/format,png)
    - ![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X3BuZy9uSUFtMTZ5VWdQajJtamFJdzdLM1hxYld3elF0TTlNYzhPVVRwUGx0bjByNk5IT1VuNGhtZ0k0WERhZGljZGlhM21VRlJhYmliUjFqaWJyMWE1UkNOVWlhTmJ3LzY0MA?x-oss-process=image/format,png)

## 编辑距离

- 【2020-2-17】[python-Levenshtein包的一些用法总结](https://www.cnblogs.com/laogao123/p/11309490.html)
   - sudo pip install python-Levenshtein
- 编辑距离使用方式如下：

```python
#! /usr/bin/python
# -*- coding: utf8 -*-
# @Time    : 2018/8/30 10:11
# @Author  : yukang
 
from Levenshtein import *
 
# 个人总结的 关于 Levenshtein 所有函数的用法 和 注释
apply_edit()  #根据第一个参数editops（）给出的操作权重，对第一个字符串基于第二个字符串进行相对于权重的操作
distance() #计算2个字符串之间需要操作的绝对距离
editops() #找到将一个字符串转换成另外一个字符串的所有编辑操作序列
hamming() #计算2个字符串不同字符的个数，这2个字符串长度必须相同
inverse() #用于反转所有的编辑操作序列
jaro() #计算2个字符串的相识度，这个给与相同的字符更高的权重指数
jaro_winkler() #计算2个字符串的相识度，相对于jaro 他给相识的字符串添加了更高的权重指数，所以得出的结果会相对jaro更大（%百分比比更大）
matching_blocks() #找到他们不同的块和相同的块，从第六个开始相同，那么返回截止5-5不相同的1，第8个后面也开始相同所以返回8-8-1，相同后面进行对比不同，最后2个对比相同返回0
median() #找到一个列表中所有字符串中相同的元素，并且将这些元素整合，找到最接近这些元素的值，可以不是字符串中的值。
median_improve() #通过扰动来改进近似的广义中值字符串。
opcodes() #给出所有第一个字符串转换成第二个字符串需要权重的操作和操作详情会给出一个列表，列表的值为元祖，每个元祖中有5个值
    #[('delete', 0, 1, 0, 0), ('equal', 1, 3, 0, 2), ('insert', 3, 3, 2, 3), ('replace', 3, 4, 3, 4)]
    #第一个值是需要修改的权重，例如第一个元祖是要删除的操作,2和3是第一个字符串需要改变的切片起始位和结束位，例如第一个元祖是删除第一字符串的0-1这个下标的元素
    #4和5是第二个字符串需要改变的切片起始位和结束位，例如第一个元祖是删除第一字符串的0-0这个下标的元素，所以第二个不需要删除
quickmedian() #最快的速度找到最相近元素出现最多从新匹配出的一个新的字符串
ratio() #计算2个字符串的相似度，它是基于最小编辑距离
seqratio() #计算两个字符串序列的相似率。
setmedian() #找到一个字符串集的中位数(作为序列传递)。 取最接近的一个字符串进行传递，这个字符串必须是最接近所有字符串，并且返回的字符串始终是序列中的字符串之一。
setratio() #计算两个字符串集的相似率(作为序列传递)。
subtract_edit() #从序列中减去一个编辑子序列。看例子这个比较主要的还是可以将第一个源字符串进行改变，并且是基于第二个字符串的改变，最终目的是改变成和第二个字符串更相似甚至一样
 
# print(hamming('Hello world!', 'Holly world!'))
# print(jaro_winkler("yukangrtyu",'yukangrtyn'))
# fixme = ['Levnhtein', 'Leveshein', 'Leenshten', 'Leveshtei', 'Lenshtein', 'Lvenstein', 'Levenhtin', 'evenshtei']
# print(opcodes('spam', 'park'))
# print(ratio('spam', 'spark'))
# print(jaro_winkler('spam', 'spark'))
# print(jaro('spam', 'spark'))
# print(seqratio('spam', 'spark'))
# print(seqratio(['newspaper', 'litter bin', 'tinny', 'antelope'],['caribou', 'sausage', 'gorn', 'woody']))
# print(setratio(['newspaper', 'litter bin', 'tinny', 'antelope'],['caribou', 'sausage', 'gorn', 'woody']))
# e = editops('man', 'scotsman')
# e1 = e[:3]
# bastard = apply_edit(e1, 'man', 'scotsman')
# print(e)
# print(e1)
# print(bastard)
# print(subtract_edit(e, e1))
# print(apply_edit(subtract_edit(e, e1), bastard, 'scotsman'))
 
def acquaintance(a,b):
    for i in a:
        item = {}
        for j in b:
            if ratio(u"%s"%i,u"%s"%j):
                item[ratio(u"%s"%i,u"%s"%j)] = (i,j)
        d = item[max(list(item.keys()))]
        c = '"%s"和"%s"-最相似---匹配度为：%f'%(d[0],d[1],max(list(item.keys())))
        print(c)
 
a = ["你好",'hello,world','计算偏差大不大啊？','文本可以吗','请看这里']
b = ['helloworld',"你好吗？",'可以吗','请这里','计算偏差大不大']
acquaintance(a,b)
```

## simhash

- 文本聚类，计算长文本相似度并聚类

```python
import jieba
from simhash import Simhash
import json
#new = json.loads(df.loc[1]['room_info'])
#new
print(df.columns)
output = open('/home/work/data/mian_out.txt', 'w')
sim_list = []
for line in df.loc[:,:].itertuples():
    #print(line[4])
    new = json.loads(line[4])
    #print(new)
    res = new['overall_review'].get('score', '-')
    if res != '-':
        out = [str(res['pass']), str(res['total_score']), 
           '%s_%s'%(res['language']['score'], res['language']['name']),
          '%s_%s'%(res['logic']['score'], res['logic']['name']),
          '%s_%s'%(res['explain_ability']['score'], res['explain_ability']['name']),
          '%s_%s'%(res['knowledge']['score'], res['knowledge']['name'])]
    else:
        out = ['-', '-', '-', '-', '-', '-']
    # asr的key：['question_order', 'quest_weight', 'quest_score', 'second_category', 'asr_result', 'question_id', 'S3_url', 'tips', 'duration', 'difficulty', 'third_category', 'question_review', 'answer', 'judge_rule', 'std_duration', 'question_content', 'sub_score', 'readtime']
    #print(new['questions'][0].keys())
    ans_list = []
    for item in new['questions']:
        ans_list.append('&'.join(item['asr_result']['sentences']))
        #print('\t'.join([str(item['question_id']),str(item['question_order']), str(item['quest_score']), item['question_content'][0], '&'.join(item['asr_result']['sentences'])])) # ['sentences']
    ans_str = '|'.join(ans_list)
    words = jieba.lcut(ans_str, cut_all=True)
    sim = Simhash(words).value
    sim_list.append([str(line[3]), line[5], new['room_id'],sim])
    # [agent_id, time, room_id, sim, pass, total_score, s1,s2,s3,s4, ans_str]
    #print('\t'.join([str(line[3]), line[5], new['room_id'], str(sim)]+out+[ans_str]))
    output.writelines('\t'.join([str(line[3]), line[5], new['room_id'], str(sim)]+out+[ans_str])+'\n')
output.close()
print(len(sim_list))
```

# Big Bang台词分析

- [代码](https://github.com/wqw547243068/Python-learning/blob/master/courses/chapter_3/big_bang_theory.ipynb)

## Big Bang台词分析
- 【2019-05-20】王奇文，wqw547243068@163.com
- 大数据文摘文章：[临别给《生活大爆炸》做个台词数据分析，你猜谢耳朵最爱说什么](https://mp.weixin.qq.com/s?timestamp=1558708847&src=3&ver=1&signature=KlqS*ur2d8xVLWaUi-thU4chjCE1wQ8qLNtnhdkBaKnrGwmx3zRm2vNGWl7Ba3wqB4eh0Zr5cmAUUBBGxYPohtROnHsQ*V6uXbL*7NJAbMXlUEBefEkWJSMruY9evzeFIevtNMqJHcKezOTZojLDyKq*0wd7Q18B3jQBoiYvSJQ=)
### 生活大爆炸
- 《生活大爆炸》（英文：The Big Bang Theory 简称：TBBT）
- 《生活大爆炸》是CBS电视台最具风格的一部情景喜剧，该剧以越来越盛行的“宅文化”吸引了一大批固定收视人群，虽然在各大奖项上暂无作为，但《生活大爆炸》的火爆程度和逐年上升的收视率是有目共睹的
- 2019年5月1日，《生活大爆炸》最后一集宣布正式杀青

### 人物介绍

- 主要人物：
   - Leonard Hofstadter —约翰尼·盖尔克奇 饰
   - Sheldon Cooper —吉姆·帕森斯 饰
   - Penny—卡蕾·措科 饰
   - Howard Wolowitz —西蒙·赫尔伯格 饰
   - Raj Koothrappali —昆瑙·内亚 饰
   - Leslie Winkle —莎拉·吉尔伯特 饰
   - Mrs. Hofstadter—克里斯汀·芭伦斯基 饰
   - Bernadette—梅丽莎·劳奇 饰
   - Mrs.Wolowitz—卡萝尔·安·苏希 饰
   - Amy Farrah Fowler—Mayim Bialik 饰
   - Priya—Aarti Mann 饰
- ![](https://pmcvariety.files.wordpress.com/2019/05/the-big-bang-theory-artisans.jpg?w=1000&h=563&crop=1)

### 其它
- 官方台词[big bang theory transcripts](https://bigbangtrans.wordpress.com/)
- 台词数据数据获取[地址](https://github.com/skashyap7/TBBTCorpus)
- ![](https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1558371710386&di=9a83fe8f4ed1302d9e341bb6dd50eaf9&imgtype=jpg&src=http%3A%2F%2Fimg1.imgtn.bdimg.com%2Fit%2Fu%3D20824956%2C3357565608%26fm%3D214%26gp%3D0.jpg)
- [生活大爆炸(TBBT)：台词爬取、词云生成与NLP分析](https://blog.csdn.net/Tele_Anti_Nomy/article/details/88092709)

## 数据准备

- 下载数据，将json格式加载进来
- 发现一共202篇台词


```bash
%%bash
# 数据来自：https://github.com/skashyap7/TBBTCorpus
#http_file='https://github.com/skashyap7/TBBTCorpus/raw/master/data/final.json'
http_file='https://github.com/skashyap7/TBBTCorpus/raw/master/preprocessing/corpus.json'
wget $http_file
```


```bash
%%bash
#rm corpus.json.* # 删除重复文件
du -sh * # 计算文件大小,42m
```

    3.4M	corpus.json
    55M	sample_data
    

```python
import json
import sys
#data_file = 'C:/Users/wqw/Desktop/corpus.json'
data_file = 'corpus.json'
data_raw = json.load(open(data_file))
#data_raw = json.loads(open(data_file).readlines())
print(len(data_raw.keys()), data_raw.keys())
len(data_raw['1_1'])
```


## 计算台词数目
- 每个场景下，每个人物的台词数据处理
- 统计台词数目


```python
import sys
#data_raw['8_9']
# 每个场景、每个人
sen_dict = {}
# 每个场景、人物的累计台词数
sen_count_dict = {'scene':{}, 'person':{}}
cnt = 0
for k, v in data_raw.items():
    cnt += 1
    if cnt > 2:
        #break
        pass
    # 读取每篇文章
    first_line = False
    for line in v.strip().split('\n'):
        # 场景提取：
        #  第一种情形（文本首句）：\n\t\t\t\tScene: The apartment.\nLeonard: The math is all there.
        #  第二种情形（文本中间）：Penny: Okay, look, you promised me you would keep my secret so you’re just going to have to figure out a way to do it.
        # Scene: The apartment.
        # Scene: Rothman’s office. Sheldon is trying to affix paper over a fiercely blowing air vent.
        # (Scene turns into a Bollywood musical), 'The stairwell, approaching the apartment door'
        scene_1 = '-'
        if line.find('Scene:') != -1:
            scene_1 = line.split(':')[1]
            scene = scene_1.split('.')[0].strip()
            if scene.find(',') != -1:
                scene = scene.split(',')[0]
            # 分情形处理
            if first_line:
                # 文本中间,再次出现
                pass
            else:
                # 文本首句，首次出现
                if len(scene) < 2:
                    continue
                first_line = True
                continue
        if line.find('Like this') != -1:
            # 剔除尾部无效对白
            continue
        # 提取对话模式， person: sentence
        arr = [i.strip() for i in line.strip().split(': ')]
        if len(arr) < 2:
            if arr and arr[0].strip():
                pass
                #print('旁白:%s, %s, %s'%(len(arr), scene_1, line))
            continue
        person = arr[0]
        sen = ''.join(arr[1:])
        # 数据清洗，Sheldon (on video)， Like this
        if person.find(' (') != -1:
            person = person.split(' (')[0]
        if person.find('(') != -1:
            person = person.strip('(')[0]
        if not scene in sen_dict:
            sen_dict[scene] = {}
        # 聚合每个场景下的同一个人
        if not person in sen_dict[scene]:
            sen_dict[scene][person] = []
        sen_dict[scene][person].append(sen)
        sen_count_dict['scene'][scene] = sen_count_dict['scene'].get(scene, 0) + 1
        sen_count_dict['person'][person] = sen_count_dict['person'].get(person, 0) + 1
    #print('summury: {}\t{}\t{}'.format(k, scene, arr))
print(sen_dict.keys())
print(sen_dict['The stairwell']['Leonard'][:10])
print(sen_count_dict['scene'])
print(sen_count_dict['person'])
```

    ['I was unstoppable. I mean, I was, I was on fire. It was like my mind and my body were totally connected, like, like athletes must feel when they’re in the zone.', 'Admit it, you’re a little turned on.', 'Why not?', 'Hey.', 'Okay.', 'Okay.', 'Well, we’re, we’re very happy for you.', 'Why a turtle?', 'Well, congratulations. Who would’ve thought you two would be the first in our group to start a family?', 'Yeah. If you had told anyone that you were going away on a train by yourself across the country, do you know what they would have said?']
    
### 可视化

<iframe src="https://github.com/wqw547243068/Python-learning/blob/master/courses/chapter_3/heatmap_freq.html" scrolling="yes" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="400" width="600"> </iframe>

## 台词数目整体可视化
- 场景台词分布
- 人物台词分布


```python
import numpy as np
MAX = 20
category = 'scene'
name_list = list(sen_count_dict[category].keys())
freq_list = list(sen_count_dict[category].values())
a = np.array(name_list)
b = np.array(freq_list)
print(len(a), len(b)) # 一共485种取值，太多，截取top
idx = b.argsort()[-MAX:]
print(a[idx])
print(b[idx])
```

    485 485
    ['The lobby' 'Howard and Bernadette’s house' 'A restaurant'
     'Leonard’s bedroom' 'The hallway' 'Howard’s bedroom' 'Sheldon’s bedroom'
     'The living room' 'Amy’s apartment' 'Leonard’s car'
     'The university cafeteria' 'The same' 'Raj’s apartment'
     'Howard and Bernadette’s apartment' 'The Cheesecake Factory'
     'The comic book store' 'The cafeteria' 'The stairwell'
     'Penny’s apartment' 'The apartment']
    [  452   474   479   508   509   510   516   555   605   642   737   760
       767   824   892  1145  1477  1483  3490 12594]

```python
!pip install pyecharts==0.5.1
```
    


```python
import numpy as np
import pyecharts as pe
from IPython.display import HTML, SVG

page = pe.Page('老友记台词整体分布')
category = 'scene'
MAX = 20 # 显示最多类目
for category in ['scene', 'person']:
    name_list = list(sen_count_dict[category].keys())
    freq_list = list(sen_count_dict[category].values())
    a = np.array(name_list)
    b = np.array(freq_list)
    idx = b.argsort()[-MAX:]
    name_list = a[idx]
    freq_list = b[idx]
    #chart = pe.WordCloud('Scene: %s'%(scene), subtitle='Person: %s'%(person), title_pos='center')
    chart1 = pe.Bar('台词整体分布-%s-Top %s'%(category, MAX), title_pos='center')
    chart1.add("", name_list, freq_list, mark_point=['max','min'], width=900, is_label_show=True)
    page.add(chart1)
    chart2 = pe.Pie('台词整体分布-%s-Top %s'%(category, MAX), title_pos='center')
    chart2.add("", name_list, freq_list, is_legend_show=False,is_label_show=True)
    page.add(chart2)
# 添加台词数分布
# bar = pe.Bar()
# name_list = person_count.keys()
# val_list = person_count.values()
# bar.add("", name_list, val_list)
# page.add(bar)
output_file = 'vis_summary.html'
page.render(output_file)
#page
HTML(output_file)
```

## 台词可视化

<iframe src="https://github.com/wqw547243068/Python-learning/blob/master/courses/chapter_3/vis_summary.html" scrolling="yes" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="600" width="100%"> </iframe>

# 华为任正非讲话挖掘分析

<a href="https://colab.research.google.com/github/wqw547243068/Python-learning/blob/master/data_mining/huawei.ipynb" target="_parent"><img src="https://colab.research.google.com/assets/colab-badge.svg" alt="Open In Colab"/></a>

- 大数据文摘：[卅年春秋，谁主沉浮？从400篇任正非演讲稿分析中，一探华为
](https://mp.weixin.qq.com/s?__biz=MjM5MTQzNzU2NA==&mid=2651670909&idx=1&sn=d690d8efa7237594312c6ee7c3741312&chksm=bd4c6eee8a3be7f8f39240a6c4fd1d04f26dfb0a9af6644e1d5acd13974d0b5d2e79f025c33b&mpshare=1&scene=23&srcid=#rd)
- ![](https://inews.gtimg.com/newsapp_bt/0/9091216116/641)
- 分析结果[展示](https://wqw547243068.github.io/Python-learning/data_mining/huawei)
- ![](http://pic.caixin.com/blog/Mon_1905/m_1558778021_IcqBAS.png)
## 目标
- 词频统计：
   - 1.词频排名（选取Top10）
   - 2.生成词云：以Top500的词汇为基础
   - 3.美国、苹果、三星出现的次数
   - 4.三个阶段的词频排名（分别是 95年-03年，04年-2012年，2012年-2019年）
- 文本相似度分析：任正非和胸怀、创新、格局、领导力的相似度
- 还可以加一个每年发表声明字数，看看媒体曝光量

## 数据准备
- 从[github](https://github.com/benmahr/RenZhengfei)上下载任正非的历次讲话稿
- 时间范围：1994-2018

```python
#!git clone https://github.com/benmahr/RenZhengfei.git
#[2019-06-20]由于原repo里的数据被删除，更新地址
!wget https://github.com/wqw547243068/Python-learning/raw/master/data_mining/RenZhengfei.zip
!unzip RenZhengfei
!ls RenZhengfei
```

    Archive:  RenZhengfei.zip
       creating: RenZhengfei/
       creating: RenZhengfei/1994/
      inflating: RenZhengfei/1994/19940118_赴美考察散记.md  
      inflating: RenZhengfei/1994/19940126_团结奋斗_再创华为佳绩.md  
      。。。
      inflating: RenZhengfei/2018/20181119_加强与国内大学合作，吸纳全球优秀人才，共同推动中国基础研究.md  
      inflating: RenZhengfei/2018/20181121_任正非在日本研究所业务汇报.md  
      inflating: RenZhengfei/R&D.md      
      inflating: RenZhengfei/README.md   
      inflating: RenZhengfei/SUMMARY.md  
     1994   1997   2000   2003   2006   2009   2012   2015	 2018	     SUMMARY.md
     1995   1998   2001   2004   2007   2010   2013   2016	'R&D.md'
     1996   1999   2002   2005   2008   2011   2014   2017	 README.md
    


```python
ls RenZhengfei/2010
```

    2000_以客户为中心，加大平台投入，开放合作，实现共赢.md
    20091231_春风送暖入屠苏.md
    20101206_五彩云霞飞遍天涯.md
    20110104_以“选拔制”建设干部队伍，按流程梳理和精简组织，推进组织公开性和均衡性建设.md
    


```python
import os
import sys
import jieba
from jieba import analyse
import json

data_dir = 'RenZhengfei'
# 存储文件、目录类型的数据
data_dict = {'dir':{'list':[], 'title':{}}, 
             'file':{'list':[]},
             'word_list':[],
             'word_dict':{},
            }
def get_keywords(name):
    """
        分词、分句
    """
    word_dict = {}
    speak_list = []
    def extract_kw(w):
        #seg_list = jieba.cut(text)
        #res = analyse.TFIDF(w) # tf-idf提取关键词
        res = analyse.extract_tags(w)
        #res = analyse.textrank(w) # text-rank提取关键词
        return res
    if type(name) == str:
        # 直接对文本提取关键词
        speak_list.append(name)
        #extract_kw(name)
    elif type(name) == list:
        # 文件列表
        speak_list = name
        
    else:
        print('输入数据类型异常: {}'.format(name))
        return word_dict
    for w in speak_list:
        # 提取关键词
        for word in res:
            word_dict[word] = word_dict.get(word, 0) + 1

# 读取文本文件
for d in os.listdir(data_dir):
    if d.startswith('.'):
        # 过滤隐藏文件
        continue
    p = os.path.join(data_dir, d) 
    # 筛选指定目录
    if os.path.isdir(p):
        if not d.isnumeric():
            #过滤非数字目录
            print('过滤目录: {}'.format(d))
            continue
        data_dict['dir']['list'].append(d)
        data_dict['dir']['title'][d] = os.listdir(p)
        #print('目录: ',p)
    elif os.path.isfile(p):
        print('文件: ',p)
        data_dict['file']['list'].append(d)
    else:
        print('其他：',p, type(p))
print(json.dumps(data_dict, indent=2, ensure_ascii=False))
```

```python
s='19950110_不前进就免职.md'
res = pattern_title.match(s)
if res:
    print(res.groups()[0])
```

    不前进就免职

```python
import jieba
from jieba import analyse
import re

# 标题提取正则, 19990520_能工巧匠是我们企业的宝贵财富.md
pattern_title = re.compile('.*_(.*?)\.md')
presentation_dict = {'num':{}, 'kw_title':{},'kw_article':{},
                     'kw_part':{'1994-2005':{}, '2006-2012':{}, '2013-2018':{}}
                    }
# 词库补充
w_set = ('诺亚方舟', '华为大学', '自我批判', '能工巧匠', '中国农话网', '世博', '火车头')
#jieba.load('a.txt')# w f pos
for w in w_set:
    jieba.add_word(w)
for k,v in data_dict['dir']['title'].items():
    # 遍历每年的讲话文本
    print(k, v)
    # (1)读取文件标题
    v1 = []
    for article in v:
        # 提取标题内容
        #res = pattern_title.search(article)
        res = pattern_title.match(article)
        if res:
            #v1.append(res[0])
            title = res.groups()[0]
            v1.append(title)
            # 提取关键词
            res = analyse.extract_tags(title)
            for r in res:
                presentation_dict['kw_title'][r] = presentation_dict['kw_title'].get(r, 0) + 1
            #presentation_dict['kw'].append(res)
        # (2)读取列表文件内容
        file_name = 'RenZhengfei/{}/{}'.format(k,article)
        idx = 0
        for line in open(file_name):
            if not line.strip():
                continue
            idx += 1
            #print(idx,line)
            # 提取关键词
            res = analyse.extract_tags(title)
            for r in res:
                # 全部词频
                presentation_dict['kw_article'][r] = presentation_dict['kw_article'].get(r, 0) + 1
                # 分阶段词频
                part_k = '-'
                if int(k) <= 2005: # 1994-2005,2006-2012,2013-2018
                    part_k = '1994-2005'
                elif int(k) <= 2012:
                    part_k = '2006-2012'
                else:
                    part_k = '2013-2018'
                presentation_dict['kw_part'][part_k][r] = presentation_dict['kw_part'][part_k].get(r, 0) + 1
    presentation_dict[k] = v1
    presentation_dict['num'][k] = len(v)
#print(json.dumps(presentation_dict['kw'], ensure_ascii=False, indent=2))

```

    1995 ['19950110_不前进就免职.md', '19951226_目前我们的形势和任务.md', '199507_要建立一个均衡的平台.md', '19950110_英雄好汉站出来.md', '19951118_解放思想，迎接96年市场大战.md', '19951116_在第四届国际电子通信展华为庆祝酒会的发言.md', '19950110_励精图治，再创辉煌.md', '19950109_坚定不移地坚持发展的方向.md', '19950618_上海电话信息技术和业务管理研讨会致谢词.md']
    2001 ['20010424_北国之春.md', '20010208_我的父亲母亲.md', '20010118_雄赳赳气昂昂跨过太平洋.md', '20010201_华为的冬天.md']


```python
import pandas as pd

# key_list = sorted(presentation_dict['num'].keys())
# val_list = [ presentation_dict['num'][i] for i in key_list]
#df = pd.DataFrame.from_dict(presentation_dict['num'], orient='index')
df = pd.DataFrame(list(presentation_dict['num'].items()), columns=['year','number'])
# pd.DataFrame(list(my_dict.items()), columns=['A', 'B'])
# df.hist()
df.sort_values(by=['year'], ascending=False)[:10]
#df.filter(lambda x: x.year in ['1995'])
#df[(True^df['year'].isin(['1995','1999']))] # 过滤特定值
```

```python
# 需要实际含义的关键词表
null_list = ['讲话','纪要','座谈', '座谈会','会议', '大会', '汇报', '汇报会', '交流','我们', '一个', '关于', '代表会', '代表处', '就是',
            '目前', '到底', '不断', '多少', '会上', '没有', '知道', '哪里', '不是', '进展', '可以', '不要',
            '提高', '学员', '找到', '分享', '构建', '建设', '增长', '追求', '沟通', '今天', '坚持', '多久',
            '实现', '加强', '最大', '路上', '如何', '还要', '成为', '产生', '方向', '坚苦',
            '任正非', '工作', '企业', '10', 'IFS', 'BG']
#df[(True^df['keyword'].isin(null_list))]
# 标题关键词
df_w_t = pd.DataFrame(list(presentation_dict['kw_title'].items()), columns=['keyword', 'count'])
df_w_t = df_w_t[(True^df_w_t['keyword'].isin(null_list))] # 过滤信息量不大的词语
df_w_t_sort = df_w_t.sort_values(by='count', ascending=False)
# 内容关键词-整体
df_w_a = pd.DataFrame(list(presentation_dict['kw_article'].items()), columns=['keyword', 'count'])
df_w_a = df_w_a[(True^df_w_a['keyword'].isin(null_list))] # 过滤信息量不大的词语
df_w_a_sort = df_w_a.sort_values(by='count', ascending=False)
# 内容关键词-分阶段
part_dict = {}
for part in presentation_dict['kw_part']:
    part_dict[part] = {}
    df_w_p = pd.DataFrame(list(presentation_dict['kw_part'][part].items()), columns=['keyword', 'count'])
    df_w_p = df_w_p[(True^df_w_p['keyword'].isin(null_list))] # 过滤信息量不大的词语
    part_dict[part] = df_w_p.sort_values(by='count', ascending=False)
# 显示top样例
top_n = 10
# df_w_t_sort[:top_n]
# df_w_a_sort[:top_n]
# part_dict[part]
#df_w_t_sort['count'][:top_n]
df_w_a_sort[120:]
```


```python
#每次在colab刷新笔记时，需要重新执行安装程序
#!pip install pyecharts==0.5.1
```


```python
#presentation_dict['num']
```


```python
#先安装pip install pyecharts==0.5.1
from IPython.display import HTML, SVG
# from IPython.core.magic import register_cell_magic

import pyecharts as pe

page = pe.Page('任正非历年讲话挖掘')
# (1) 历年讲话次数
key_list = sorted(presentation_dict['num'].keys())
val_list = [presentation_dict['num'][i] for i in key_list]
overlap = pe.Overlap()
t1 = '任正非历年公开讲话次数变化'
s1 = '时间跨度: 1994-2018, 过滤部分无实际意义的高频词汇'
bar = pe.Bar(t1, subtitle=s1, title_pos='center')
bar.add('bar', key_list, val_list, legend_pos='right')
#bar.use_theme('dark')
es = pe.EffectScatter(t1)
es.add("es",key_list, val_list, effect_scale=2)
line = pe.Line(t1, title_pos='center')
line.add('line', key_list, val_list, legend_pos='right', mark_point=['min','max'], is_more_utils=True,is_label_show=True)
overlap.add(line)
overlap.add(bar)
overlap.add(es)
page.add(overlap)
# (2) 标题关键词词云
#person_count = {}
kw_list = df_w_t_sort['keyword']
freq_list = df_w_t_sort['count']
#-饼图
top_n = 30
pie = pe.Pie('历年讲话主题词-源自标题', subtitle=s1, title_pos='center')
pie.add("", kw_list[:top_n], freq_list[:top_n], legend_pos='bottom', is_label_show=True,is_more_utils=True)
page.add(pie)
#-词云
chart = pe.WordCloud('历年讲话主题词-源自标题', subtitle=s1, title_pos='center')
#chart.add("", kw_list, freq_list, word_size_range=[10, 500], rotate_step=66) # 这种设置会丢失高频词
chart.add("", kw_list, freq_list,is_more_utils=True)
page.add(chart)
# 统计台词数
#person_count[person] = person_count.get(person, 0) + len(sen_dict[scene][person])

# wordcloud参数说明: https://www.jianshu.com/p/23200304409c
# (3) 内容关键词词云-总体
kw_list = df_w_a_sort['keyword']
freq_list = df_w_a_sort['count']
#-饼图
pie = pe.Pie('历年讲话主题词-源自内容', subtitle=s1, title_pos='center')
pie.add("", kw_list[:top_n], freq_list[:top_n], legend_pos='bottom', is_label_show=True,is_more_utils=True)
page.add(pie)
#-词云
chart = pe.WordCloud('历年讲话主题词-源自内容-整体', subtitle=s1, title_pos='center')
chart.add("", kw_list, freq_list)
#chart.add("", kw_list, freq_list, word_size_range=[10, 1000], rotate_step=66)
page.add(chart)
top_n = 40
# (4) 内容关键词词云-分阶段, 1994-2005, 2006-2012, 2013-2018
for part in part_dict:
    kw_list = part_dict[part]['keyword'][:top_n]
    freq_list = part_dict[part]['count'][:top_n]
    #-饼图
    pie = pe.Pie('饼图-历年讲话主题词-源自内容-局部', subtitle='{},Top {}'.format(part,top_n), title_pos='center')
    pie.add("", kw_list[:top_n], freq_list[:top_n], legend_pos='bottom', is_more_utils=True,is_label_show=True)
    page.add(pie)
    #-词云
    chart = pe.WordCloud('词云-历年讲话主题词-源自内容-局部', subtitle='{},Top {}'.format(part,top_n), title_pos='center')
    #chart.add("", kw_list, freq_list, word_size_range=[10, 800], rotate_step=66)
    chart.add("", kw_list, freq_list, shape='circle')
    page.add(chart)

# 统一绘制、落地
out_file = 'page_huawei.html'
page.render(out_file)
HTML(out_file)
```

```python
from google.colab import drive
drive.mount('/content/drive/')
```
    

```python
!cp page_huawei.html "$dest_dir"
```


```python
import os
#!ls /content/drive/My\ Drive
dest_dir = '/content/drive/My Drive/huawei'
os.listdir(dest_dir)
#os.chdir()

```


```bash
%%bash
#git clone https://github.com/wqw547243068/Python-learning.git
ls Python-learning/data_mining/
```

    huawei.ipynb
    page_huawei.html
    

```bash
%%bash
cp page_huawei.html Python-learning/data_mining/
cd Python-learning/data_mining/
git config --global user.email "wqw547243068@163.com"
git config --global user.name "wqw547243068"
git add page_huawei.html
git commit -m "增加华为分析结果"
git push
# !ls RenZhengfei/2016
```

    [master c9c44e8] 增加华为分析结果
     1 file changed, 23170 insertions(+)
     create mode 100644 data_mining/page_huawei.html
    

## 分词


```python
import jieba

str='中国是世界上人口最多的国家，有悠久的文明和历史'
a=jieba.cut(str,cut_all=False)
print('/'.join(a))
```

    中国/是/世界/上/人口/最多/的/国家/，/有/悠久/的/文明/和/历史
    


```python
import json
import jieba
from jieba import analyse

# (1)自定义字典
#jieba.load_userdict(file_name) # file_name 为文件类对象或自定义词典的路径
jieba.add_word('中国科学院计算所')
jieba.add_word('京都大学')
# (2)测试数据
text = u"一个傻子在北京,难受想哭很不开心啊"
text = u'小明硕士毕业于中国科学院计算所，后在日本京都大学深造,我来到北京清华大学堂'
#print(json.dumps(fool.cut(text),ensure_ascii=False))
# ['一个', '傻子', '在', '北京']
# (3)开始分词
#seg_list = jieba.cut(text)
seg_list = jieba.lcut(text)
#seg_list = jieba.cut(text, cut_all=True)
print("jieba分词: " + "/ ".join(seg_list))  # 精确模式
# (4)关键词提取
#res = jieba.analyse.TFIDF(text)
res = analyse.extract_tags(text)
print(u'TF-IDF关键词提取：'+json.dumps(res,ensure_ascii=False))
res = analyse.textrank(text)
print(u'TextRank关键词提取：'+json.dumps(res,ensure_ascii=False))
```
- 输出：
   - jieba分词: 小明/ 硕士/ 毕业/ 于/ 中国科学院计算所/ ，/ 后/ 在/ 日本京都大学/ 深造/ ,/ 我/ 来到/ 北京/ 清华大学/ 堂
   - TF-IDF关键词提取：["日本京都大学", "中国科学院计算所", "小明", "深造", "硕士", "清华大学", "毕业", "来到", "北京"]
   - TextRank关键词提取：["深造", "硕士", "来到", "毕业", "北京"]
    


```python
import jieba
text = """我是一条天狗呀！
我把月来吞了，
我把日来吞了，
我把一切的星球来吞了，
我把全宇宙来吞了。
我便是我了！"""
sentences = text.split()
sent_words = [list(jieba.cut(sent0)) for sent0 in sentences]
document = [" ".join(sent0) for sent0 in sent_words]
print(document)
# ['我 是 一条 天狗 呀 ！', '我 把 月 来 吞 了 ，', '我 把 日来 吞 了 ，', '我 把 一切 的 星球 来 吞 了 ，', '我 把 全宇宙 来 吞 了 。', '我 便是 我 了 ！']
```

- ['我 是 一条 天狗 呀 ！', '我 把 月 来 吞 了 ，', '我 把 日来 吞 了 ，', '我 把 一切 的 星球 来 吞 了 ，', '我 把 全宇宙 来 吞 了 。', '我 便是 我 了 ！']
    


```python
from sklearn.feature_extraction.text import TfidfVectorizer
tfidf_model = TfidfVectorizer().fit(document)
print(tfidf_model.vocabulary_)
# {'一条': 1, '天狗': 4, '日来': 5, '一切': 0, '星球': 6, '全宇宙': 3, '便是': 2}
sparse_result = tfidf_model.transform(document)
print(sparse_result)
```

    {'一条': 1, '天狗': 4, '日来': 5, '一切': 0, '星球': 6, '全宇宙': 3, '便是': 2}
      (0, 4)	0.7071067811865476
      (0, 1)	0.7071067811865476
      (2, 5)	1.0
      (3, 6)	0.7071067811865476
      (3, 0)	0.7071067811865476
      (4, 3)	1.0
      (5, 2)	1.0
    

## 词向量训练
- 挖掘文本背后的含义

### word2vec词向量
- 诞生于2013年，业界流行的语义向量训练方法


```python
# 参考地址：http://www.52nlp.cn/%E4%B8%AD%E8%8B%B1%E6%96%87%E7%BB%B4%E5%9F%BA%E7%99%BE%E7%A7%91%E8%AF%AD%E6%96%99%E4%B8%8A%E7%9A%84word2vec%E5%AE%9E%E9%AA%8C
import logging  
import os  
import time  
  
import gensim  
from gensim.models import word2vec  
import jieba  
#import nltk 
import json
  
logging.basicConfig(format='%(asctime)s:%(levelname)s:%(message)s',level=logging.INFO)    
start1 = time.clock()   
input_file_name = u'E:/百度云/IT技术_new/编程语言/python/demo/word/result.txt' # 原始文件Unicode编码
input_file_f = open(input_file_name,'r')  
#contents = input_file_f.read() # 整个文件读到一个变量里
print '读取文件耗时：',time.clock()
#sentences = [i.strip().split(" ") for  i in contents[:10]]
sentences = []
print '转换后:\n','|'.join(['&'.join(i) for i in sentences])
# 开始逐行处理
for line in input_file_f.readlines(): 
    #按行读取 
    sentences.append(line.strip().split(" "))
#print '行数:%s,内容:\n'%(len(sentences)),json.dumps(sentences,ensure_ascii=False)
#sentences是句子序列，句子又是单词列表，比如，sentences = [['first', 'sentence'], ['second', 'sentence']]
model = word2vec.Word2Vec(sentences,min_count=2,size=200) #min_count表示小于该数的单词会被剔除，默认值为5;size表示神经网络的隐藏层单元数，默认为100
#保存生成的训练模型
output_model = u'E:/百度云/IT技术_new/编程语言/python/demo/word/model'
model.save(output_model)#加载模型文件new_model = gensim.models.Word2Vec.load('model/mymodel4')
```


```python

#加载模型文件
new_model = gensim.models.Word2Vec.load(output_model)
dir(new_model) # 多种函数方法,
print new_model.vector_size # 词向量维度
print ','.join(new_model.index2word) # index2word保存单词
# 计算指定词的所以相似词
test_word = '经理'
similar_word_list = new_model.most_similar(test_word)
print json.dumps(similar_word_list,ensure_ascii=False)
#print json.dumps(similar_word_list,ensure_ascii=False,indent=4)
# 抽取北京的搜索session：select query_list from user_satisfy_query where dt=20160918 and province rlike '^010' and count > 1;
#print json.dumps(new_model.most_similar(u'天安门'),ensure_ascii=False)
#In [76]: print json.dumps(new_model.most_similar(u'旅店'),ensure_ascii=False)
#[["莫泰", 0.8472937345504761], ["易佰", 0.8139138221740723], ["168", 0.7009128928184509], ["连锁", 0.6979336738586426], ["旅馆", 0.6874777674674988], ["旺子成", 0.6520262360572815], ["快捷", 0.6426747441291809], ["家庭旅馆", 0.6317397356033325], ["人在旅途", 0.6164605021476746], ["寺易佰", 0.6112728714942932]]
#In [77]: print json.dumps(new_model.most_similar(u'菜馆'),ensure_ascii=False)
#[["家常菜", 0.8295753598213196], ["风味", 0.8144116401672363], ["正宗", 0.8008058071136475], ["菜", 0.787124514579773], ["饺子馆", 0.7830443382263184], ["刀削面", 0.7752013802528381], ["特色", 0.7629570364952087], ["面馆", 0.7591361403465271], ["面", 0.7421250939369202], ["农家菜", 0.7410575747489929]]
#In [158]: print json.dumps(new_model.most_similar(u'软件园'),ensure_ascii=False)  
#[["用友", 0.7017531991004944], ["金蝶", 0.6142528057098389], ["孵化器", 0.5947192907333374], ["网易", 0.5910834074020386], ["f11", 0.584527850151062], ["软件", 0.5816747546195984], ["租贷", 0.5489269495010376], ["卵", 0.5268262624740601], ["鲜花网", 0.5116425156593323], ["广联达", 0.507921576499939]]
#In [171]: print json.dumps(new_model.most_similar(u'美食'),ensure_ascii=False)
#[["中餐", 0.8337364196777344], ["川菜", 0.7456749677658081], ["快餐", 0.7315336465835571], ["西餐", 0.6596412658691406], ["自助餐", 0.6401817202568054], ["老姬", 0.6020432710647583], ["日本料理", 0.5849108099937439], ["合利屋", 0.5827316045761108], ["nokia", 0.5804284811019897], ["早点", 0.5785887241363525]]
#In [176]: print json.dumps(new_model.most_similar(u'麦当劳'),ensure_ascii=False)
#[["肯德基", 0.857654869556427], ["肯德鸡", 0.6457746028900146], ["KFC", 0.6434839963912964], ["kfc", 0.6308714151382446], ["街鼎", 0.6141167283058167], ["FSDT", 0.589178204536438], ["康得基", 0.5770742893218994], ["得来", 0.5747169852256775], ["十佛营", 0.5702893137931824], ["必胜客", 0.5698955655097961]]
print '（1）找某个词的相似词汇如下:\n词汇\t相似度\n','\n'.join(['%s\t%s'%(i[0],i[1]) for i in similar_word_list])
# 计算任意两个词的相似度
word_1 = '经理';word_2 = '数据'
print '（2）任意两个词汇的相似度(%s与%s)'%(word_1,word_2),new_model.similarity(word_1,word_2)
word_set_1 = ['经理','效率'];word_set_2 = ['数据','流程','重复']
print '（3）两个数据集间的余弦距离(%s)与(%s)：'%(json.dumps(word_set_1,ensure_ascii=False),json.dumps(word_set_1,ensure_ascii=False)),new_model.n_similarity(word_set_1, word_set_2) 
print '（4）找集合中不同的一项：(%s)'%(json.dumps(word_set_2,ensure_ascii=False)),new_model.doesnt_match(word_set_2)
# 独特的组合加减法
print json.dumps(new_model.most_similar(positive=[u'麦当劳'],negative=[u'肯德基',u'真功夫']),ensure_ascii=False)
```

### BERT词向量
- [如何用 Python 和 BERT 做中文文本二元分类？](https://www.jianshu.com/p/9b88d0cd9e8d)
- ![](https://upload-images.jianshu.io/upload_images/64542-d90f0950c31be5ae.png)
- ULMfit 和 BERT 都属于预训练语言模型（Pre-trained Language Modeling），具有很多的相似性

## 结果可视化

<iframe src="https://wqw547243068.github.io/Python-learning/data_mining/huawei" scrolling="yes" border="0" frameborder="no" framespacing="0" allowfullscreen="true" height="600" width="100%"> </iframe>

## 贾跃亭
- 参考：[我们文本分析了贾跃亭2017年全部公开信，发现他近期喜欢用“责任”“致歉”](https://mp.weixin.qq.com/s?__biz=MjM5MTQzNzU2NA==&mid=2651655947&idx=1&sn=b7f48e48b7505fd3b67c4a22e42cd1ad&chksm=bd4c28988a3ba18e365be4a852c8b870d0ca5539b36fb4a427b3ee420c79e8e89eaeaaec4261&mpshare=1&scene=23&srcid=0522kZpRnblIcs8MIWwrY4na#rd)


```python
# 测试数据地址：https://wallstreetcn.com/articles/3523533
s="""
任何一个人都是在给定条件下来实现目标的。

本文由华商韬略原创， 作者：曹谨浩，首发于微信公众号：华商韬略（id：hstl8888）

创业二十载，贾跃亭的“伟大梦想”坑哭了投资者，纸糊的财务外皮终于罩不住扯到肾的扩张步伐。

4月26日，乐视网发布2018年报及关于暂停上市前的停牌公告，前者显示，公司净资产负30亿，后者则让乐视的退市进入倒计时。

4月29日，因涉嫌信息披露违法，证监会决定对贾跃亭进行立案调查。
王健林曾说：先定个小目标，挣他一个亿。一个亿不小，但对于企业经营者，要有远大理想，先在给定条件下，一步一步实现小目标，却是远大理想的必须路径。

路要一步步走，饭要一口口吃，步子大了容易扯着蛋，如果步子大太了不光扯着蛋，连心脏也会被扯掉。

如果贾跃亭可以现实一点，踏踏实实做视频、手机、电视，任何一样，他都已经卡到了不错的位置，也应该会有不错的前景。若能做成视频领先，手机领先，电视领先，甚至从中国领先做成世界领先，并且持续发展，就能够称得上是伟大了。
"""
import sys

#print(open('贾跃亭.txt', 'w'), s)
```

- NFM模型代码


```python
"""
    NFM模型代码
"""
from sklearn.feature_extraction.text import TfidfVectorizer, CountVectorizer 
from sklearn.datasets import fetch_20newsgroups 
from sklearn.decomposition import NMF, LatentDirichletAllocation 

#data_file = 'C:/Users/wqw/Desktop/贾跃亭数据分析/贾跃亭数据分析/公开信时间整理.txt'
data_file = '贾跃亭.txt'
def display_topics(model, feature_names, no_top_words): 
    for topic_idx, topic in enumerate(model.components_): 
         print ("Topic %d:" % (topic_idx) )
         print (" ".join([feature_names[i]
         for i in topic.argsort()[:-no_top_words - 1:-1]]) )
        
dataset = open(data_file, encoding='utf-8').readlines()
documents = dataset
no_features = 1000
no_features = 100

#提取tf-idf特征
tfidf_vectorizer = TfidfVectorizer(max_df=0.95, min_df=2, max_features=no_features, stop_words='english') 
tfidf = tfidf_vectorizer.fit_transform(documents) 
tfidf_feature_names = tfidf_vectorizer.get_feature_names() 

no_topics = ['乐视','资金', '变革', '生态', '布局', '硬件', '用户', '承诺', '责任','质疑', '债务', '歉意']
# 隐含语义向量维数
no_topics = 3
# NMF模型
nmf = NMF(n_components=no_topics, random_state=1, alpha=.1, l1_ratio=.5, init='nndsvd').fit(tfidf) 

#top words数目
no_top_words = 15

# 显示
display_topics(nmf, tfidf_feature_names, no_top_words) 
```




```python
# 绘制词汇分散图
import jieba
import re
import nltk

# Open the book
with open(data_file,encoding='utf-8') as t:
    text = [l.strip() for l in t]

# PLEASE STAY LOW!
text = [t.lower() for t in text][:-10]

# Remove 'chapter i' strings
regexp = re.compile(r'chapter \d')
text = [t for t in text if not re.match(regexp, t)]

# Raw text (one huge giant string)
raw = ' '.join(text)

# Here's the magic
tokens = [t for t in nltk.word_tokenize(raw) if t not in (',', '¡°', '¡±', '"')]
#tokens = [t for t in jieba.cut(raw) if t not in (',', '¡°', '¡±', '"')]

# (1) lexical_richness
distinct_tokens = set(tokens)
lexical_richness = len(distinct_tokens) / len(tokens)


from pylab import mpl 
mpl.rcParams['font.sans-serif'] = ['SimHei']
ntext = nltk.Text(tokens)
keyword_list = ['乐视','资金', '变革', '生态', '布局', '硬件', '用户', '承诺', '责任','质疑', '债务', '歉意']
ntext.dispersion_plot(keyword_list)
```




```python
#!/usr/bin/env python
# -*- coding: utf-8 -*-
"""
    词向量代码
"""
from gensim.models import word2vec,Phrases
from gensim.models.doc2vec import Doc2Vec,TaggedDocument,TaggedLineDocument
import logging
import warnings
from pprint import  pprint
import multiprocessing
warnings.filterwarnings("ignore")
cores = multiprocessing.cpu_count()

logging.basicConfig(format='%(asctime)s : %(levelname)s : %(message)s', level=logging.INFO)
sentences =word2vec.Text8Corpus(data_file) 
model = word2vec.Word2Vec(sentences,sg=0, min_count=10,size=100,seed=1,workers=cores,window=5)  #  skip-gram;window=5

# 找最相似的词
model.wv.most_similar(['责任'],topn=15)
```


## 微信朋友圈分析


- 想不想知道自己的朋友圈隐藏着什么信息？

### 思路

- 用itchat工具获取微信好友信息，再用NLP技术分析，统计，echarts可视化出来

### 效果

{% include wqw_wechat.html %}

### 代码

- [分析代码](https://github.com/wqw547243068/wangqiwen/blob/master/demo/itchat/itchat-test.ipynb)

```python
# coding: utf8
"""
    微信好友分析
"""
import configparser
import os
import logging
import json
import numpy as np
import pandas as pd
import itchat
import jieba
import re
import pyecharts as pe
from optparse import OptionParser

def get_icon(img_dir):
    """
        获取微信好友头像
    """
    #itchat.search_friends()
    print('获取微信好友头像')
    if not os.path.isdir(img_dir):
        os.mkdir(img_dir)
    for friend in itchat.get_friends(update=True)[0:]:
        #可以用此句print查看好友的微信名、备注名
        img_name = friend['NickName']+"_"+friend['RemarkName']
        img_content = itchat.get_head_img(userName=friend["UserName"])
        img_file = '%s/%s.jpg'%(img_dir, img_name)
        print(img_file)
        try:
            with open(img_file,'wb') as f:
                f.write(img_content)
        except Exception as e:
            print(repr(e))



def stitch_icon(img_dir, out_dir):
    """
        拼接好友微信头像
    """
    import math
    import random
    #pip install pillow
    from PIL import Image
    x = 0
    y = 0
    imgs = os.listdir(img_dir)
    random.shuffle(imgs)
    # 创建640*640的图片用于填充各小图片
    newImg = Image.new('RGBA', (640, 640))
    # 以640*640来拼接图片，math.sqrt()开平方根计算每张小图片的宽高，
    width = int(math.sqrt(640 * 640 / len(imgs)))
    # 每行图片数
    numLine = int(640 / width)

    for i in imgs:
        img_file = './%s/%s'%(img_dir, i)
        try:
            img = Image.open(img_file)
        except Exception:
            print('图片文件读取异常：%s'%(img_file))
            continue
        # 缩小图片
        img = img.resize((width, width), Image.ANTIALIAS)
        # 拼接图片，一行排满，换行拼接
        newImg.paste(img, (x * width, y * width))
        x += 1
        if x >= numLine:
            x = 0
            y += 1
    out_file = '%s/all_%s.png'%(out_dir, user)
    newImg.save(out_file)
    return out_file

if __name__ == '__main__':
    """
        主程序
    """
    usage = "usage: %start.py [options] [tasks]"
    parser = OptionParser(usage=usage)
    parser.add_option("-r", "--sequence_run", action = "store_false", dest = "rerun", default = False, help = "run task from the begining")
    parser.add_option("-c", "--config_file", dest = "config_file", default = "../conf/config.ini", help = "configure file path")

    (options, tasks) = parser.parse_args()
    logging.info('参数信息:')
    for opt in dir(options):
        if not opt.startswith('s_'):
            continue
        print('\t%s\t%s'%(opt, getattr(options, opt)))
    logging.info('---test---')
    # 读配置文件
    config = configparser.ConfigParser()
    config.read(options.config_file)
    print('配置信息：', options, config)
    raw_data_file = config.get('sys','raw_data_file')
    stopword_file = config.get('sys','stopword_file')
    print('raw_data_file : ', raw_data_file)
    print('stopword_file : ', stopword_file)
    #k1 = config.getint('section','key')
    options.rerun = True
    # 先登录
    if options.rerun:
        #关键字实参hotReload取True使得短时间内无需再次扫码登录
        #itchat.auto_login(hotReload=True)
        itchat.login()
        # 获取好友列表
        friends = itchat.get_friends(update=True)[0:]
        #print(friends)
    else:
        # 从文件中恢复
        friends = np.load(raw_data_file)
    #friends[0].keys()
    json.dumps(friends[0], ensure_ascii=False)
    # 获取账户主人名字
    user = friends[0]['NickName']
    user_dir = '../data/%s'%(user)
    img_dir = '%s/img'%(user_dir)
    if not os.path.isdir(user_dir):
        os.mkdir(user_dir)
    if options.rerun:
        np.save('%s/wechat_data.npy'%(user_dir), friends)
    # 遍历这个列表，列表里第一位是自己，所以从"自己"之后开始计算
    input_format = ['UserName', 'City', 'DisplayName', 'UniFriend', 'OwnerUin', 'MemberList', 'PYQuanPin', 'RemarkPYInitial', 'Uin', 'AppAccountFlag', 'VerifyFlag', 'Province', 'KeyWord', 'RemarkName', 'PYInitial', 'ChatRoomId', u'IsOwner', 'HideInputBarFlag', u'HeadImgFlag', 'EncryChatRoomId', 'AttrStatus', 'SnsFlag', 'MemberCount', u'WebWxPluginSwitch', 'Alias', 'Signature', 'ContactFlag', 'NickName', 'RemarkPYQuanPin', 'HeadImgUrl', 'Sex', 'StarFriend', 'Statues']
    output_format = ['NickName','Province','City','PYQuanPin','RemarkName','DisplayName','Sex','Signature']
    out_list = []
    for item in friends:
        #new_item = [item[i] for i in output_format if not isinstance(item[i],'unicode') else item[i].encode('gbk')]
        cur_list = []
        for i in output_format:
            new_value = item[i]
            #if isinstance(item[i],unicode):#python2专用
            #    new_value = new_value.encode('utf8')
            cur_list.append(new_value)
        print('\t'.join([str(i) for i in cur_list]))
        out_list.append(cur_list)
        #print json.dumps(new_item, ensure_ascii=False)
    #print json.dumps(friends[:5], ensure_ascii=False)
    #=======================
    dh = pd.DataFrame(out_list, columns=output_format)
    #out_list
    #!pip install xlwt
    dh.to_excel('%s/wechat_data.xls'%(user_dir))# 保存数据到本地
    print('{0}好友信息抓取完毕{0}'.format('-'*10))
    # 初始化计数器，有男有女，当然，有些人是不填的
    # 1表示男性，2女性
    sex_dict = {'1':['男',0], '2':['女',0], '0':['其他',0]}
    for i in friends[1:]:
        sex = str(i["Sex"])
        sex_dict[sex][1] += 1
    # 计算性别比
    total = len(friends[1:])
    male = sex_dict['1'][1]
    female = sex_dict['2'][1]
    other = sex_dict['0'][1]
    # 打印结果
    print("男性好友：%d, 一共%s, 比例 %.2f%%" % (male, total, float(male) / total * 100))
    print(u"女性好友：%d, 一共%s, 比例 %.2f%%" % (female, total, float(female) / total * 100))
    print(u"其他：%d, 一共%s, 比例 %.2f%%" % (other, total, float(other) / total * 100))
    print(sex_dict)

    # 地理位置分布
    location_list = dh.filter(['Province','City']).values
    location_dict = {}
    city_dict = {}
    for i in location_list:
        location_dict[i[0]] = location_dict.get(i[0], 0) + 1
        city_dict[i[1]] = city_dict.get(i[1], 0) + 1
    #location_dict
    #city_dict

    #jieba自定义词库
    # ①一个个添加
    word_seg_list = ['邹市明','不冒不失','大数据','机器学习','星辰大海','本','删人','微信','蝶变','蹉跎']
    for i in word_seg_list:
        jieba.add_word(i) # 添加
    #jieba.del_word("不冒") # 删除
    # 直接加载字典文件
    #格式：一个词占一行；每一行分三部分：词语、词频（可省略）、词性（可省略），用空格隔开，顺序不可颠倒。
    #file_name 若为路径或二进制方式打开的文件，则文件必须为 UTF-8 编码。
    #jieba.load_userdict(file_name)
    # 中文停用词表，下载地址：
    # ①https://download.csdn.net/download/ybk233/10606306
    # ②1893个，https://blog.csdn.net/shijiebei2009/article/details/39696571
    #stopword_file = 'stopword_china.txt'
    stopword_list = [i.strip() for i in open(stopword_file, encoding='utf8')]
    #stopword_list

    sign_list = []
    cut_list = []
    sign_dict = {'empty':{'男':0, '女':0, '其他':0},
                 'not':{'男':0, '女':0, '其他':0},
                 'all':{'男':0, '女':0, '其他':0}}
    word_dict = {} # 词频记录
    print(sex_dict)
    for i in friends:
        signature = i["Signature"]
        signature.replace(" ", "").replace("span", "").replace("class", "").replace("emoji", "")
        #rep = re.compile("1f\d.+")
        rep = re.compile("<span.*?>.*?</span>")
        signature = rep.sub("", signature.replace('\n','|'))
        # 当前信息
        cur_name = i['NickName']
        cur_sex = sex_dict[str(i['Sex'])][0]# 性别
        sign_dict['all'][cur_sex] += 1
        if signature:
            sign_dict['not'][cur_sex] += 1
        else:
            sign_dict['empty'][cur_sex] += 1
            continue
        # 当前签名分词
        sign_cut = [w for w in jieba.cut(signature)]#, cut_all=True)
        for w in sign_cut:
            w = w.strip()
            if w not in word_dict:
                word_dict[w] = {'男':0,'女':0,'其他':0, 'all':0}
            word_dict[w][cur_sex] += 1
            word_dict[w]['all'] += 1
        sign_list.append([signature, cur_sex])
        cut_list.extend(sign_cut)
        print('[%s]\t%s\t%s ==> %s'%( cur_sex, cur_name, signature, '/'.join(sign_cut)))
    #print(word_dict)
    word_list = []
    # 去停用词
    for w in word_dict:
        if not w or w in stopword_list:
            #word_dict.pop(w)
            continue
        word_list.append([w, word_dict[w]])
    #print(word_list)
    word_list = sorted(word_list, key=lambda x:x[1]['all'], reverse=True)
    print(word_list[:10])
    print('{0}数据准备完毕{0}'.format('-'*10))
    # 生成报告
    page = pe.Page('%s微信好友分析报告'%(user))
    #--------
    # scatter = pe.Scatter("散点图示例")
    # v1, v2 = scatter.draw("%s/冉云飞_.jpg"%(img_dir), color=(255,255,255))
    # scatter.add("pyecharts", v1, v2, is_random=True)
    # page.add(scatter)
    #-------性别分布---------
    attr = []
    val = []
    for _, v in sex_dict.items():
        attr.append(v[0])
        val.append(v[1])
    pie = pe.Pie('%s的%s微信好友性别分布'%(user, total), title_pos='center')
    pie.add('百分比', attr, val, radius=[10,50],
            is_label_show=True, legend_orient='vertical',legend_pos='right',
           label_text_color='green', is_more_utils=True)#,rosetype=True)
    page.add(pie)
    #-------签名习惯-------------
    attr = ['无', '有']
    val1 = [sign_dict['empty']['男'], sign_dict['not']['男']]
    val2 = [sign_dict['empty']['女'], sign_dict['not']['女']]
    val3 = [sign_dict['empty']['其他'], sign_dict['not']['其他']]
    pie = pe.Pie('%s的朋友是否有签名(男，女，其他)'%(user), title_pos='center')
    pie.add('男性签名倾向', attr, val1, radius=[5,30],
            is_label_show=True, legend_orient='vertical',legend_pos='right',
           label_text_color='green')#,rosetype=True)#is_random=True,
    pie.add('女性签名倾向', attr, val2, radius=[35,60],
            is_label_show=True, legend_orient='vertical',legend_pos='right',
            label_text_color='green')#,rosetype=True)
    pie.add('其他签名倾向', attr, val3, radius=[65,80],
            is_label_show=True, legend_orient='vertical',legend_pos='right',
           label_text_color='green', is_more_utils=True)#,rosetype=True)
    page.add(pie)
    #------------地理位置分布-------
    #先安装扩展包
    #pip install echarts-countries-pypkg echarts-china-provinces-pypkg echarts-china-cities-pypkg echarts-china-counties-pypkg echarts-china-misc-pypkg
    attr = location_dict.keys()
    value = location_dict.values()
    #value = [155, 10, 66, 78, 33, 80, 190, 53, 49.6]
    #attr = ["福建", "山东", "北京", "上海", "甘肃", "新疆", "河南", "广西", "西藏"]
    map = pe.Map("%s的微信好友地理分布"%(user), title_pos='center')#, width=600, height=400
    map.add("好友人数",attr,value,maptype="china", #world,china
        is_visualmap=True,visual_text_color="#050",legend_pos='left', is_more_utils=True)
    map.render('map_china.html')
    page.add(map)
    #-----------词云--------
    name = [i[0] for i in word_list]
    value_all = [i[1]['all'] for i in word_list]
    value_male = [i[1]['男'] for i in word_list]
    value_female = [i[1]['女'] for i in word_list]
    value_other = [i[1]['其他'] for i in word_list]
    wc1 = pe.WordCloud('%s微信好友签名关键词-男'%(user), title_pos='center')
    wc1.add("关键词", name, value_male, word_size_range=[10, 100], is_more_utils=True)
    page.add(wc1)
    wc2 = pe.WordCloud('%s微信好友签名关键词-女'%(user), title_pos='center')
    wc2.add("关键词", name, value_female, word_size_range=[10, 100], is_more_utils=True)
    page.add(wc2)
    wc3 = pe.WordCloud('%s微信好友签名关键词-其他'%(user), title_pos='center')
    wc3.add("关键词", name, value_other, word_size_range=[10, 100], is_more_utils=True)
    page.add(wc3)
    wc4 = pe.WordCloud('%s微信好友签名关键词-所有'%(user), title_pos='center')
    wc4.add("关键词", name, value_all, word_size_range=[10, 100], is_more_utils=True)
    page.add(wc4)
    #---------------------
    page.render('%s/wechat.html'%(user_dir))
    #page
    print('{0}报表渲染完毕{0}'.format('-'*10))
    # 微信头像保存地址
    # 下载微信头像
    if options.rerun:
        get_icon(img_dir)
    # 拼接微信头像
    out_file = stitch_icon(img_dir, user_dir)
    # 将这张得到的图片发送到你的微信
    itchat.send_image(out_file)
    # 当然你也可以将这张得到的图片分享给你的好友
    itchat.send_image(out_file, toUserName='filehelper')
    print('{0}微信头像处理完毕{0}'.format('-'*10))

```



## 身份证解析

- 【2020-8-3】从身份证号码中提取出生年月日、籍贯信息（具体到区/县）
- 依赖文件
    - user.txt：[name card_id]
    - 行政区划表：身份证行政地区码对照表(2020版).xls, [下载地址](https://download.csdn.net/download/caishenye/12104214)
- 代码如下：

```python
import pandas as pd
from datetime import datetime
 
class IDnumber(object):
    '''身份证号码类'''
 
    def __init__(self, adcode='-'):
        #data.loc[:,['name']]
        df = pd.read_excel(adcode)
        df.head()
        conf_dict = {'province':{}, 'address':{}}
        for idx, item in df.iterrows():
            #print(idx, item)
            conf_dict['province'][str(item['pre2'])] = item['province']
            conf_dict['address'][str(item['pre6'])] = '-'.join(map(str, [item['provincialLevel'], item['prefectureLevel'],item['countyDistrict']]))
        print(conf_dict['province'])
        #print(conf_dict['address'])
        #类属性 IDnumber.address_codes 单元包含了身份证前6位的行政区划代码。
        self.address_codes = conf_dict['address']
        #类属性 IDnumber.provinces 单元包含了省级行政区划代码。
        self.provinces = conf_dict['province']
        #类属性 IDnumber.weights 储存乘法权重
        self.weights = (7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2)
        # 类属性 IDnumber.mod_codes 储存了余数和正确校验码的对应关系
        self.mod_codes = {0:'1',1:'0',2:'X',3:'9',4:'8',5:'7',6:'6',7:'5',8:'4',9:'3',10:'2'}
    
    def extract(self,id=None, name='Null'):
        self.id = id    # 身份证号
        self.name = name # 姓名
        self.native_place = self.get_native_place()	# 籍贯
        if not self.native_place:
            self.flag = False
            return False
        self.birthday = self.get_birthday()		# 出生日期
        self.age = self.get_age()			#年龄
        self.gender = self.get_gender()		# 性别
        self.flag = False
        if self.native_place and self.birthday and self.age and self.gender and self.check_CRC():
            self.flag = True
 
    def get_native_place(self):
        """从身份证号中检查并获取籍贯"""
        #print(ID_DIC[Num[0:2]+'0000'],ID_DIC[Num[0:4]+'00'],ID_DIC[Num[0:6]])
        #result = { k:v for k,v in IDnumber.address_codes.items() if self.id[:6] == k }
        #result = [IDnumber.address_codes.get(self.id[:2]+'0000','[空]'),
        #    IDnumber.address_codes.get(self.id[:4]+'00','[空]'),
        #    IDnumber.address_codes.get(self.id[:6],'[空]')]
        try:
            result = self.address_codes.get(self.id[:6], '[空]')
        except Exception as err:
            print(self.name, self.id, err)
        if result in ('[空]'):
            return False
        return result
 
    def get_birthday(self):
        """从身份证号中检查并获取出生日期"""
        try:
            cur_y = datetime.now().year		#当前年
            cur_m = datetime.now().month	#当前月
            cur_d = datetime.now().day		#当前日
            year = int(self.id[6:10])		#出生年
            mon = int(self.id[10:12])		#出生月
            day = int(self.id[12:14])		#出生日
            if year not in range(cur_y-120,cur_y+1):    # 检查年份是否在120年内
                print("出生年份不在120年之内。")
                return False
            if mon not in range(1,13):  # 检查月份
                print("出生月份不合逻辑。")
                return False
            if day not in range(1,32):  # 检查日
                print("出生日不合逻辑。")
                return False
            if mon == 2 and day > 29:  # 检查日
                print("出生日期为2月30日或者31日。")
                return False
            if year % 400 != 0 and (year % 4 != 0 or year % 100 == 0):	# 非闰年时
                if mon == 2 and day == 29 :
                    print("出生于非闰年的2月29日。")
                    return False
            return self.id[6:10] + '-' + self.id[10:12] + '-' + self.id[12:14]
        except:
            print("校验出生日期时发现，出生日期中有非数字字符。")
            return False
 
    def get_age(self):
        """从身份证号中检查并获取年龄"""
        try:
            cur_y = datetime.now().year		#当前年
            cur_m = datetime.now().month	#当前月
            cur_d = datetime.now().day		#当前日
            year = int(self.id[6:10])		#出生年
            mon = int(self.id[10:12])		#出生月
            day = int(self.id[12:14])		#出生日
            return cur_y - year -int((cur_m,cur_d) < (mon,day))
        except:
            print("计算年龄时发现出生日期内有非数字字符。")
            return False
 
    def get_gender(self):
        "检查身份证号中的顺序码并获取性别"
        try:
            if int(self.id[14:17]) == 0:
                print("顺序码为“000”。")
                return False
            return '男' if int(self.id[16:17]) % 2 != 0 else '女'
        except:
            print("顺序码中有非数字字符。")
            return False
 
    def check_CRC(self):
        """检查校验码是否正确"""
        try:
            he = sum([self.weights[i] * int(self.id[i]) for i in range(0,17) if self.id[i]])
            # 获取正确的校验码
            crc_str = [self.mod_codes[i] for i in self.mod_codes if he % 11 == i][0]
            if (self.id[-1] == 'x' and crc_str == 'X') or self.id[17] == crc_str:
                return True
            else:
                print("校验码错误。最后一位是" + self.id[17] + "，应该是" + crc_str)
                return False
        except:
            print("身份证号码前17位中有非数字字符,或者身份证号码长度不够18位。")
            return False
 
    def show(self):
        """显示身份证是否存在，及有关信息"""
        if self.flag == True:
            #print("姓名：\t身份证：\t性别：\t出生日期：\t年龄：\t籍贯："
            print("\t".join([self.name, self.id, self.gender, self.birthday, str(self.age), self.native_place]))
        else:
            # print("———————————————————————————————————")
            print("{}的身份证号码{}不存在！".format(self.name, self.id))
 
if __name__ == '__main__':
    # 格式【name card_id】
    data = pd.read_table('user.txt')
    print(data)
    # 下载地址: https://download.csdn.net/download/caishenye/12104214
    adcode = './身份证行政地区码对照表(2020版).xls'
    my_parse = IDnumber(adcode=adcode)
    #tests = ['1234v31987061334778','999999195611283460','14445620181115001','421126198702042817']
    tests = data.loc[:,['name','id']]
    print(tests)
    for m in tests.values.tolist():
        res = my_parse.extract(name=m[0], id=m[1])
        my_parse.show()
```



