
展示分类更好的方式：

http://stackoverflow.com/a/24745825

Bonus:

If you want to display only the posts in a certain tag/category (and not all posts), you can change the first for loop (the one inside the capture) to one of these:

{% for post in site.tags['whatever'] %}

{% for post in site.categories['whatever'] %}

===========

