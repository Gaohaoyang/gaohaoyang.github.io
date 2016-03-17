/**
 * some JavaScript code for this blog theme
 */
/* jshint asi:true */

// ////////////////////common util////////////////////////////////
//
// /**
//  * [fadeOut description]
//  * @param  {element} el element
//  * @return {[type]}    [description]
//  */
// function fadeOut(el) {
//     el.style.opacity = 1;
//
//     (function fade() {
//         if ((el.style.opacity -= 0.1) < 0) {
//             el.style.display = "none";
//         } else {
//             requestAnimationFrame(fade);
//         }
//     })();
// }
//
// /**
//  * [fadeIn description]
//  * @param  {element} el      [description]
//  * @param  {property} display [description]
//  * @return {[type]}         [description]
//  */
// function fadeIn(el, display) {
//     el.style.opacity = 0;
//     el.style.display = display || "block";
//
//     (function fade() {
//         var val = parseFloat(el.style.opacity);
//         if (!((val += 0.1) > 1)) {
//             el.style.opacity = val;
//             requestAnimationFrame(fade);
//         }
//     })();
// }

/////////////////////////header////////////////////////////
headerFun();

/**
 * header function
 */
function headerFun() {
    _clickMenu();
}

/**
 * clickMenu
 */
function _clickMenu() {
    var menuBtn = document.querySelector('#headerMenu')
    var nav =  document.querySelector('#headerNav')
    menuBtn.onclick = function() {
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
}
