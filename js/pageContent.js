/* jshint asi:true */

/**
 * [fixSidebar description]
 * 滚轮滚到一定位置时，将 sidebar-wrap 添加 fixed 样式
 * 反之，取消样式
 */
(function() {
    if (window.innerWidth > 770) {

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
        setContentMaxHeightInPC()//设置目录最大高度(PC端)
    }
    moveTOC()//将Content内容转移
}());

/**
 * 设置目录最大高度
 */
function setContentMaxHeightInPC() {
    var windowHeight = window.innerHeight
    var contentUl = document.querySelector('.content-ul')
    var contentMaxHeight = windowHeight-77-60
    contentUl.style.maxHeight = contentMaxHeight + 'px'
}


//-------------mobile--------------
/**
 * 屏幕宽度小于770px时，点击锚点按钮，弹出目录框
 * @param  {[type]} function( [description]
 * @return {[type]}           [description]
 */
(function() {
    if (window.innerWidth <= 770) {
        var anchorBtn = document.querySelector('.anchor')
        var rightDiv = document.querySelector('.right')

        /**
         * 监听锚点按钮
         */
        anchorBtn.onclick = function(e) {
            e.stopPropagation()
            rightDiv.classList.add('right-show')
            anchorBtn.classList.add('anchor-hide')
        }

        //监听body，点击body，隐藏Content
        document.querySelector('body').addEventListener('click', function() {
            rightDiv.classList.remove('right-show')
            anchorBtn.classList.remove('anchor-hide')
        })

        ancherPostion(anchorBtn, rightDiv)//目录锚的位置固定
        setContentMaxHeight()//设置目录最大高度
    }
}());

/**
 * 目录锚的位置固定
 */
function ancherPostion(anchorBtn, rightDiv) {
    window.addEventListener('scroll', function() {
        // console.log('scroll');
        var top = anchorBtn.getBoundingClientRect().top
            // console.log(top);
        var scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop)
        if (scrollTop > 50) {
            anchorBtn.style.top = '20px'
            rightDiv.style.top = '20px'
        } else {
            anchorBtn.style.top = '76px'
            rightDiv.style.top = '76px'
        }
    })
}

/**
 * 设置目录最大高度
 */
function setContentMaxHeight() {
    var windowHeight = window.innerHeight
    var contentUl = document.querySelector('.content-ul')
    var contentMaxHeight = windowHeight-180
    contentUl.style.maxHeight = contentMaxHeight + 'px'
}

//-------------post Content----------------------
//将Content内容转移
function moveTOC() {
    if (document.querySelector('#markdown-toc')!==null) {
        var TOCString = document.querySelector('#markdown-toc').innerHTML
        var contentUl = document.querySelector('#content-side')
        contentUl.insertAdjacentHTML('afterbegin', TOCString)//插入字符串

        //添加scroll样式，为了平滑滚动
        //add class "scroll", for smooth scroll
        var aTags = document.querySelectorAll('#content-side a')

        //add class for everyone
        // aTags.forEach(function () {
        //     console.log(this);
        // })
        for (var i = 0; i < aTags.length; i++) {
            if(!aTags[i].classList.contains('scroll')){
                aTags[i].classList.add('scroll')
            }
        }
    }
}
