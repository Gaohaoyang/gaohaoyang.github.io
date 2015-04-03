
$(document).ready(function() {

    categoryDisplay();

});

/**
 * load方法，页面的加载完成后触发
 * @param  {[type]} ) {fixFooterInit();} 固定Footer栏
 * @return {[type]}   
 */
$(window).load(function() {
    fixFooterInit();
});

/**
 * 固定底栏的初始化方法
 * 在一开始载入页面时，使用fixFooter()方法固定底栏。
 * 在浏览器窗口改变大小是，依然固定底栏
 * @return {[type]} [description]
 */
function fixFooterInit() {
    var footerHeight = $('footer').outerHeight();
    var footerMarginTop = getFooterMarginTop()-0;//类型转换
    // var footerMarginTop = 80;
    
    fixFooter(footerHeight,footerMarginTop);//fix footer at the beginning

    $(window).resize(function() {           //when resize window, footer can auto get the postion
        fixFooter(footerHeight,footerMarginTop);
    });
}

/**
 * 固定底栏
 * @param  {number} footerHeight    底栏高度
 * @param  {number} footerMarginTop 底栏MarginTop
 * @return {[type]}                 [description]
 */
function fixFooter(footerHeight,footerMarginTop) {
    var windowHeight = $(window).height();
    var contentHeight = $('body>.container').outerHeight() + $('body>.container').offset().top + footerHeight + footerMarginTop;
    // console.log("window---"+windowHeight);
    // console.log("$('body>.container').outerHeight()---"+$('body>.container').outerHeight() );
    // console.log("$('body>.container').height()---"+$('body>.container').height() );
    // console.log("$('#main').height()--------"+$('#main').height());
    // console.log("$('body').height()--------"+$('body').height());
    //console.log("$('#main').html()--------"+$('#main').html());
    // console.log("$('body>.container').offset().top----"+$('body>.container').offset().top);
    // console.log("footerHeight---"+footerHeight);
    // console.log("footerMarginTop---"+footerMarginTop);
    // console.log(contentHeight);
    if (contentHeight < windowHeight) {
        $('footer').addClass('navbar-fixed-bottom');
    } else {
        $('footer').removeClass('navbar-fixed-bottom');
    }
}

/**
 * 使用正则表达式得到底栏的MarginTop
 * @return {string} 底栏的MarginTop
 */
function getFooterMarginTop() {
    var margintop = $('footer').css('marginTop');
    var patt = new RegExp("[0-9]*");
    var re = patt.exec(margintop);
    // console.log(re[0]);
    return re[0];
}

/**
 * 分类展示
 * 点击右侧的分类展示时
 * 左侧的相关裂变展开或者收起
 * @return {[type]} [description]
 */
function categoryDisplay() {
    /*only show All*/
    $('.post-list-body>div[post-cate!=All]').hide();
    /*show category when click categories list*/
    $('.categories-list-item').click(function() {
        var cate = $(this).attr('cate');//get category's name
        
        $('.post-list-body>div[post-cate!='+cate+']').hide(250);
        $('.post-list-body>div[post-cate='+cate+']').show(400);

    });
}