/* jshint asi:true */
/////////////////////////content////////////////////////////
generateContent()

/**
 * [generateContent description]
 */
function generateContent() {
    var contentToc = document.querySelector('#markdown-toc')


    if (contentToc === null) {
        document.querySelector('#content').style.display = 'none'
    } else {
        //为了平滑滚动，使用了第三方库scroll.js
        //要给每个a标签添加class=scroll
        var aTags = contentToc.querySelectorAll('a')
        for (var i = 0; i < aTags.length; i++) {
            aTags[i].setAttribute('class', 'scroll')
        }

        // 将内容转移
        var contentHtml = contentToc.innerHTML
        var sideContentUl = document.querySelector('#content-side')
        sideContentUl.innerHTML = contentHtml
    }

    // 若无相似文章，隐藏这部分
    var relatedPost = document.querySelector('.related-post');
    if (relatedPost.innerHTML.trim() === '') {
        relatedPost.style.display = 'none'
    }
}

fixSidebar()

/**
 * [fixSidebar description]
 * 滚轮滚到一定位置时，将 sidebar-wrap 添加 fixed 样式
 * 反之，取消样式
 */
function fixSidebar() {
    var sidebarWrap = document.querySelector('.sidebar-wrap')
    window.onscroll = function() {
        var sidebarWrapTop = sidebarWrap.getBoundingClientRect().top
        if (sidebarWrapTop < 21) {
            sidebarWrap.classList.add('fixed')
        }
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
        if (scrollTop < 78) {
            sidebarWrap.classList.remove('fixed')
        }
    }
}

controlHeight()

/**
 * [controlHeight description]
 * 控制 sidebar 的高度
 */
function controlHeight() {
    //先获取similar posts 的高度
    //和用户浏览器窗口的高度
    //给content设置最大高度
    var similarDiv = document.querySelector('.related-post')
    var contentUl = document.querySelector('.content-ul')
    var similarDivHeight = similarDiv.offsetHeight
    var windowHeight = window.innerHeight
    var contentMaxHeight = windowHeight - similarDivHeight - 77 - 60

    contentUl.style.maxHeight = contentMaxHeight + 'px'
}
