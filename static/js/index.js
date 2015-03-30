$(document).ready(function() {


    fixFooterInit();

});

function fixFooterInit() {
    var footerHeight = $('footer').outerHeight();
    /*var footerMarginTop = getFooterMarginTop();*/
    var footerMarginTop = 80;
    
    fixFooter(footerHeight,footerMarginTop);//fix footer at the beginning

    $(window).resize(function() {           //when resize window, footer can auto get the postion
        fixFooter(footerHeight,footerMarginTop);
    });
}

/* fix footer */
function fixFooter(footerHeight,footerMarginTop) {
    var windowHeight = $(window).height();
    var contentHeight = $('body>.container').outerHeight() + $('body>.container').offset().top + footerHeight + footerMarginTop;
    if (contentHeight < windowHeight) {
        $('footer').addClass('navbar-fixed-bottom');
    } else {
        $('footer').removeClass('navbar-fixed-bottom');
    }
}
/*RegExp for fixFooter
* I don't know why there is a bug. 
* When you resize the height of the window to the bottom of container, 
* there is a throb of the footer.
* So the code below I don't use now.
*/
function getFooterMarginTop() {
    var margintop = $('footer').css('marginTop');
    var patt = new RegExp("[0-9]*");
    var re = patt.exec(margintop);
    console.log(re[0]);
    return re[0];
}