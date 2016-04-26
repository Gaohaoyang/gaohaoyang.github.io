//先等图片都加载完成
//再执行布局函数
//
(function() {
    var imgs = document.querySelectorAll('.grid img');
    var totalImgs = imgs.length;
    var count = 0;
    //console.log(imgs);
    for (var i = 0; i < totalImgs; i++) {
        if (imgs[i].complete) {
            //console.log('complete');
            count++;
        } else {
            imgs[i].onload = function() {
                // alert('onload');
                count++;
                //console.log('onload' + count);
                if (count == totalImgs) {
                    //console.log('onload---bbbbbbbb');
                    initGrid()
                }
            }
        }
    }
    if (count == totalImgs) {
        //console.log('---bbbbbbbb');
        initGrid()
    }

}());

function initGrid() {
    var msnry = new Masonry('.grid', {
        // options
        itemSelector: '.grid-item',
        columnWidth: 250,
        isFitWidth: true,
        gutter: 20,
    });
}
