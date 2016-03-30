/**
 * some JavaScript code for this blog theme
 */
/* jshint asi:true */

/////////////////////////header////////////////////////////
/**
 * clickMenu
 */
(function _clickMenu() {
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
})();
