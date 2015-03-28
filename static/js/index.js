$(document).ready(function() {
    /*footer position suitable*/
    fixfooter();
    $(window).resize(function() {
        fixfooter();
    });

});

function fixfooter() {
    var windowHeight = $(window).height();
    var contentHeight = $('body>.container').outerHeight() + $('body>.container').offset().top + $('footer').outerHeight() + 30;
    if (contentHeight < windowHeight) {
        $('footer').addClass('navbar-fixed-bottom');
    } else {
        $('footer').removeClass('navbar-fixed-bottom');
    }
}