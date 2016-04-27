---
layout: page
title: Collections
permalink: /collection/
icon: bookmark
---

* content
{:toc}

## 前端工具

* [box-shadow generator](http://www.cssmatic.com/box-shadow)

    生成 box-shadow 的工具。

* [gradient-generator](http://www.cssmatic.com/gradient-generator)

    渐变生成器。


## ES6 相关

* [http://www.ecma-international.org/ecma-262/6.0/](http://www.ecma-international.org/ecma-262/6.0/)

## 类库与插件

* [Masonry](http://masonry.desandro.com/)

    瀑布流布局库。

* [jssor](http://www.jssor.com/)

    图片轮播图其 GitHub 地址 [jssor/slider](https://github.com/jssor/slider)

* [cssslider](http://cssslider.com/)

    纯 CSS 的图片轮播图。

## 框架

### React

* [深入理解 React -Thinking in React 中文版](http://reactjs.cn/react/docs/thinking-in-react.html)
* [Thinking in React](http://facebook.github.io/react/docs/thinking-in-react.html)

## 技术的博客

* [凳子_Joinery 邓智容  http://www.dengzhr.com/](http://www.dengzhr.com/)

## 编辑器

### Atom 中常用插件

* auto-beautify
* autoprefixer
* block-comment
* color-picker
* docblockr
* emmet
* jquery-snippets
* jshint
* linter
* linter-csslint
* linter-htmlhint
* minimap
* minimap-git-diff
* open-in-browser
* uglify
* active-power-mode
* atom-terminal-panel
* linter-scss-linter

常用的主题：

UI Theme: One Dark

Syntax Theme: Atom Dark or One Dark


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
