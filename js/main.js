/**
 * some JavaScript code for this blog theme
 */
/* jshint asi:true */

/////////////////////////header////////////////////////////
headerFun()

/**
 * header function
 */
function headerFun() {
    _clickMenu()
}

/**
 * clickMenu
 */
function _clickMenu() {
    var menuBtn = document.querySelector('#headerMenu')
    var nav = document.querySelector('#headerNav')
    menuBtn.onclick = function(e) {
        e.stopPropagation()
        if (menuBtn.classList.contains('active')) {
            // fadeOut(nav)
            nav.style.display = 'none'
            menuBtn.classList.remove('active')
        } else {
            // fadeIn(nav)
            nav.style.display = 'block'
            menuBtn.classList.add('active')
        }
    }
    if (window.innerWidth <= 770) {
        document.querySelector('body').onclick = function() {
            nav.style.display = 'none'
            menuBtn.classList.remove('active')
        }
    }
}

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
        var contentHtml = contentToc.innerHTML
        var sideContentUl = document.querySelector('#content-side')
        sideContentUl.innerHTML = contentHtml
    }

    // 若无相似文章，隐藏这部分
    var relatedPost = document.querySelector('.related-post');
    if (relatedPost.innerHTML.trim()==='') {
        relatedPost.style.display='none'
    }
}

function fixSidebar() {

}
