/* jshint asi:true */

/**
 * [fixSidebar description]
 * 滚轮滚到一定位置时，将 sidebar-wrap 添加 fixed 样式
 * 反之，取消样式
 */
(function fixSidebar() {
    var sidebarWrap = document.querySelector('.right>.wrap')

    //fix 之后百分比宽度会失效，这里用js赋予宽度
    sidebarWrap.style.width = sidebarWrap.offsetWidth + "px"
    window.onscroll = function() {
        var sidebarWrapTop = sidebarWrap.getBoundingClientRect().top
        if (sidebarWrapTop < 21) {
            sidebarWrap.classList.add('fixed')
        }
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
        if (scrollTop < 77) {
            sidebarWrap.classList.remove('fixed')
        }
    }
})()
