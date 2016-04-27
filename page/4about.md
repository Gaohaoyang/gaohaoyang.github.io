---
layout: page
title: About
permalink: /about/
icon: heart
---

* content
{:toc}

## 关于我

在校硕士研究生一枚，就读于西安交通大学软件工程专业，2016年毕业。即将入职阿里巴巴，前端开发工程师。

主要兴趣集中在前端开发，大前端的概念深入我心。将更多的业务逻辑放在前端中，这很有趣。同时，将自己构想的内容实现出来，这种感觉很愉快。

热爱美好的事物，热爱摇滚乐，组过乐队，卖过唱。

很喜欢崔健的歌词：现实像块石头，精神像个蛋，石头虽然坚硬，可蛋里才是生命。

还有，学习是一个非常愉快的过程。共同加油！

## 联系我

* email：gaohaoyang126@126.com
* QQ：793940046
* Weibo：Haoyang
* 知乎：Gaohaoyang
* 豆瓣：Gaohaoyang
* 豆瓣音乐人：浩阳的小站


## 关于本站

## 友情链接



## Comments

{% if site.duoshuo_shortname %}
<!-- 多说评论框 start -->
<div class="ds-thread" data-thread-key="{{ site.url }}{{ page.url }}" data-title="{{page.title}}" data-url="{{ site.url }}{{ page.url }}"></div>
<!-- 多说评论框 end -->
{% endif %}

{% if site.disqus_shortname %}
<div id="disqus_thread"></div>
<script>
/**
* RECOMMENDED CONFIGURATION VARIABLES: EDIT AND UNCOMMENT THE SECTION BELOW TO INSERT DYNAMIC VALUES FROM YOUR PLATFORM OR CMS.
* LEARN WHY DEFINING THESE VARIABLES IS IMPORTANT: https://disqus.com/admin/universalcode/#configuration-variables
*/

var disqus_config = function () {
this.page.url = '{{ site.url }}{{ page.url }}'; // Replace PAGE_URL with your page's canonical URL variable
this.page.identifier = '{{ site.url }}{{ page.url }}'; // Replace PAGE_IDENTIFIER with your page's unique identifier variable
};

(function() { // DON'T EDIT BELOW THIS LINE
var d = document, s = d.createElement('script');

s.src = '//{{site.disqus_shortname}}.disqus.com/embed.js';

s.setAttribute('data-timestamp', +new Date());
(d.head || d.body).appendChild(s);
})();
</script>
<noscript>Please enable JavaScript to view the <a href="https://disqus.com/?ref_noscript" rel="nofollow">comments powered by Disqus.</a></noscript>
{% endif %}

<script>
/**
 * target _blank
 */
(function() {
    var aTags = document.querySelectorAll('.left a')
    for (var i = 0; i < aTags.length; i++) {
        aTags[i].setAttribute('target', '_blank')
    }
}());
</script>
