/*// 超升级版（列数和每一列的宽度、元素块之间的边距为不定值，兼容IE6~8，实现响应式布局）
var waterfallParent = document.getElementById("waterfall");
var flowItems = getClassName(waterfallParent, "flow");
// 声明瀑布流浮动参数
// parent：瀑布流包裹容器，类型为DOM对象；floowItems：瀑布流布局子元素组，类型为DOM对象数组；pin：列数，类型为int；
// width：每个瀑布流布局元素的宽度，类型为int；horizontalMargin：元素块之间的水平间距，类型为int；
// verticalMargin：元素块之间的垂直间距，类型为int；
var currentFlow = {
    parent: waterfallParent,
    flowItems: flowItems,
    pin: 4,
    width: 260,
    horizontalMargin: 13,
    verticalMargin: 15
};

// 声明响应式的响应断点
var deviceWidth = {
    D: 1200,
    C: 960,
    B: 767,
    A: 320
};

// 响应式瀑布流布局绘制
window.onresize = responseFlow;
window.onload = function () {
    // setTimeout(function () {
        responseFlow();
    // },2000);
};

function responseFlow() {
    var deviceW;
    // 判断当前的设备屏幕宽度
    function checkDeviceW() {
        var screenW = document.documentElement.offsetWidth || document.body.offsetWidth;
        if (screenW >= deviceWidth.A && screenW < deviceWidth.B) {
            deviceW = "A";
        } else if (screenW >= deviceWidth.B && screenW < deviceWidth.C) {
            deviceW = "B";
        } else if (screenW >= deviceWidth.C && screenW < deviceWidth.D) {
            deviceW = "C";
        } else if (screenW >= deviceWidth.D) {
            deviceW = "D";
        }
    }
    checkDeviceW();

    // 修改不同响应下瀑布流布局的列数
    switch (deviceW) {
        case "A":
            currentFlow.pin = 1;
            break;
        case "B":
            currentFlow.pin = 2;
            break;
        case "C":
            currentFlow.pin = 3;
            break;
        case "D":
            currentFlow.pin = Math.floor(currentFlow.parent.offsetWidth / currentFlow.width);
            break;
    }
    // 瀑布流重绘
    waterfall(currentFlow);
}

// 其中flow是一个对象，分别包含如下键值：
// pin：列数，类型为int；
function waterfall(flow) {
    // 声明瀑布流中每一列高度的数组pin[]
    var pin = new Array(flow.pin);
    //最大列高度
    var maxH = 0;
    // 瀑布流框块数组
    var flowItems = flow.flowItems;
    // 声明每一列高度的初始值
    for (var j = 0, pinLen = pin.length; j < pinLen; j++) {
        pin[j] = flowItems[j].offsetTop + flowItems[j].offsetHeight;
    }
    // 循环瀑布流元素的高度
    for (var i = 0, len = flowItems.length; i < len; i++) {
        if (flow.width) {
            flowItems[i].style.width = flow.width + "px";
        }

        if (i >= flow.pin) {
            // 获取pin数组中的最小值
            var minH = Math.min.apply(null, pin);
            var tempH = Math.max.apply(null, pin);
            if (tempH > maxH) {
                maxH = tempH;
            }
            // 获取高度数组中最小高度的索引
            var minHItem = pin.indexOf(minH);
            // 把当前元素在视觉上置于最小高度的一列
            flowItems[i].style.left = minHItem * (flow.width + flow.horizontalMargin) + "px";
            flowItems[i].style.top = minH + flow.verticalMargin + "px";
            // 重置列的高度
            pin[minHItem] += flowItems[i].offsetHeight + flow.verticalMargin;
        } else if (i < flow.pin) {
            flowItems[i].style.top = 0;
            flowItems[i].style.left = (i % flow.pin) * (flow.width + flow.horizontalMargin) + "px";
        }
    }
    // 计算瀑布流容器的宽度
    flow.parent.style.width = flow.pin * flow.width + (flow.pin - 1) * flow.horizontalMargin + "px";

    var lastItem = flowItems[flowItems.length - 1];
    var lastH = lastItem.offsetHeight + lastItem.offsetTop;
    maxH = maxH > lastH ? maxH : lastH;
    flow.parent.style.height = maxH + 'px';
}

// 获取className的元素集合
// 参数：obj指父元素；oClassName为元素的class属性值
function getClassName(obj, oClassName) {
    // IE9+及标准浏览器可以直接使用getElementsByClassName()获取className元素集合
    if (document.getElementsByClassName) {
        return obj.getElementsByClassName(oClassName);
    } else {
        // classNameArr用来装载class属性值为oClassName的元素；
        var classNameArr = [];
        // 获取obj的直接子元素
        var objChild = obj.children || obj.childNodes;
        // 遍历obj元素，获取class属性值为oClassName的元素列表
        for (var i = 0; i < objChild.length; i++) {
            // 判断obj子元素的class属性值中是否含有oClassName
            if (hasClassName(objChild[i], oClassName)) {
                classNameArr.push(objChild[i]);
            }
        }
        return classNameArr;
    }
}

// Array.indexOf()函数的兼容性重写
if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = function(ele) {
        // 获取数组长度
        var len = this.length;
        // 检查值为数字的第二个参数是否存在，默认值为0
        var fromIndex = Number(arguments[1]) || 0;
        // 当第二个参数小于0时，为倒序查找，相当于查找索引值为该索引加上数组长度后的值
        if (fromIndex < 0) {
            fromIndex += len;
        }
        // 从fromIndex起循环数组
        while (fromIndex < len) {
            // 检查fromIndex是否存在且对应的数组元素是否等于ele
            if (fromIndex in this && this[fromIndex] === ele) {
                return fromIndex;
            }
            fromIndex++;
        }
        // 当数组长度为0时返回不存在的信号：-1
        if (len === 0) {
            return -1;
        }
    }
}
*/
