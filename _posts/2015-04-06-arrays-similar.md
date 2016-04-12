---
layout: post
title:  "判断两个数组是否相似 (arraysSimilar)"
date:   2015-04-06 15:14:54
categories: JavaScript
tags: JavaScript Array 算法 慕课网
---

* content
{:toc}

## 题目

题目来自 [慕课网 JavaScript 深入浅出 1-6 编程练习](http://imooc.com/code/5760)    

请在 index.html 文件中，编写 arraysSimilar 函数，实现判断传入的两个数组是否相似。具体需求：   

1. 数组中的成员类型相同，顺序可以不同。例如 [1, true] 与 [false, 2] 是相似的。
2. 数组的长度一致。
3. 类型的判断范围，需要区分: String, Boolean, Number, undefined, null, 函数, 日期, window.





当以上全部满足，则返回**"判定结果:通过"**，否则返回**"判定结果:不通过"**。    

题目给出了 index.html 如下：

```html
<!DOCTYPE HTML>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=gb18030">
    <title>Untitled Document</title>

</head>
<body>
    <script type="text/javascript">   
        /*
         * param1 Array
         * param2 Array
         * return true or false
         */
        function arraysSimilar(arr1, arr2){

        }
    </script>
    <script src="testData.js"></script>
</body>
</html>
```

其中 testData.js 是测试用例，代码如下

```js
var result = function() {
    //以下为多组测试数据
    var cases = [{
        arr1: [1, true, null],
        arr2: [null, false, 100],
        expect: true
    }, {
        arr1: [
            function() {},
            100
        ],
        arr2: [100, {}],
        expect: false
    }, {
        arr1: [null, 999],
        arr2: [{},
            444
        ],
        expect: false
    }, {
        arr1: [window, 1, true, new Date(), "hahaha", (function() {}), undefined],
        arr2: [undefined, (function() {}), "okokok", new Date(), false, 2, window],
        expect: true
    }, {
        arr1: [new Date()],
        arr2: [{}],
        expect: false
    }, {
        arr1: [window],
        arr2: [{}],
        expect: false
    }, {
        arr1: [undefined, 1],
        arr2: [null, 2],
        expect: false
    }, {
        arr1: [new Object, new Object, new Object],
        arr2: [{}, {},
            null
        ],
        expect: false
    }, {
        arr1: null,
        arr2: null,
        expect: false
    }, {
        arr1: [],
        arr2: undefined,
        expect: false
    }, {
        arr1: "abc",
        arr2: "cba",
        expect: false
    }];

    //使用for循环, 通过arraysSimilar函数验证以上数据是否相似，如相似显示“通过”,否则"不通过",所以大家要完成arraysSimilar函数,具体要求，详见任务要求。    
    for (var i = 0; i < cases.length; i++) {
        if (arraysSimilar(cases[i].arr1, cases[i].arr2) !== cases[i].expect) {
            document.write("不通过！case" + (i + 1) + "不正确！arr1=" + JSON.stringify(cases[i].arr1) + ", arr2=" + JSON.stringify(cases[i].arr2) + " 的判断结果不是" + cases[i].expect);
            return false;
        }
    }
    return true;

}();
document.write("判定结果:" + (result ? "通过" : "不通过"));
```

---

## 解答

各位读者在看解答前也可以自己考虑一下，看看咱们的想法是否一致，期待您在本文的留言。

---

### 思路

通过观察测试用例，可以发现，最后三个用例有不是数组的。所以我们可以先判断传入的参数是否是数组。   
又因为题目中要求数组长度必须一致，这也是第二个限制条件。   
最后再区分具体的类型。   

理清思路我们可以分为以下步骤：   

1. 判断传入的参数是否为数组 (使用 `instanceof` 方法)
2. 检查两个数组长度是否一致
3. 分别判断数组内元素的基本数据类型 (使用 `typeof` 方法)
4. 因为 `typeof` 只能检查基本数据类型，对于 `null`, `Date`, `window` 返回的都是 `object`，所以使用 `Object.prototype.toString.apply()` 来检查这些对象类型，其返回值为：`'[object Null]'`, `'[object Date]'`, `'[object global]'`
5. 分别比较每个数组内元素的各种类型的个数，如果都相等，那么这两个数组是相似的。

### 具体实现代码

JavaScript代码如下

```js
/**
 * =====================================================
 * 请在index.html文件中，编写arraysSimilar函数，实现判断传入的两个数组是否相似。具体需求：
 * 1. 数组中的成员类型相同，顺序可以不同。例如[1, true] 与 [false, 2]是相似的。
 * 2. 数组的长度一致。
 * 3. 类型的判断范围，需要区分:String, Boolean, Number, undefined, null, 函数，日期, window.
 *
 * 当以上全部满足，则返回"判定结果:通过"，否则返回"判定结果:不通过"。
 * =====================================================
 */

/*
* param1 Array
* param2 Array
* return true or false
*/
function arraysSimilar(arr1, arr2){
    if (arr1 instanceof Array && arr2 instanceof Array ) {    //先判断传入的是否是数组
        if (arr1.length == arr2.length) {                    //判断数组长度
            console.log("same-length");
            console.log(arr1);
            console.log(arr2);
            //开始判断数组内部是否相似
            return sameLengthArraysSimilar(arr1, arr2);
        } else{
            //两个数组长度不同返回false
            return false;
        }
    } else {
        //传入的参数不是数组返回false
        return false;
    }
}

/**
 * 判断两个等长的数组内部是否相似
 * 遍历数组
 * arr1中元素各种类型出现的个数是否和arr2中元素各种类型出现的个数相同
 * @param  {Array} arr1 数组1
 * @param  {Array} arr2 数组2
 * @return {true,false}
 */
function sameLengthArraysSimilar(arr1,arr2) {
    var numInArr1 = 0;
    var numInArr2 = 0;
    var booleanInArr1 = 0;
    var booleanInArr2 = 0;
    var funInArr1 = 0;
    var funInArr2 = 0;
    var undefinedInArr1 = 0;
    var undefinedInArr2 = 0;
    var stringInArr1 = 0;
    var stringInArr2 = 0;
    var nullInArr1 = 0;
    var nullInArr2 = 0;
    var dateInArr1 = 0;
    var dateInArr2 = 0;
    var windowInArr1 = 0;
    var windowInArr2 = 0;

    for (var i = 0; i < arr1.length; i++) {
        if(typeof arr1[i] === 'number' ){
            numInArr1 ++;
        } else if(typeof arr1[i] === 'boolean'){
            booleanInArr1 ++;
        } else if(typeof arr1[i] === 'function'){
            funInArr1 ++;
        } else if(typeof arr1[i] === 'undefined'){
            undefinedInArr1 ++;
        } else if(typeof arr1[i] === 'string'){
            stringInArr1 ++;
        } else if(typeof arr1[i] ==='object'){
            if(Object.prototype.toString.apply(arr1[i]) === '[object Null]'){
                nullInArr1 ++;
            } else if(Object.prototype.toString.apply(arr1[i]) === '[object Date]'){
                dateInArr1 ++;
            } else if(Object.prototype.toString.apply(arr1[i]) === '[object global]'){
                windowInArr1 ++;
            }
        }

        if(typeof arr2[i] === 'number'){
            numInArr2 ++;
        } else if(typeof arr2[i] === 'boolean'){
            booleanInArr2 ++;
        } else if(typeof arr2[i] === 'function'){
            funInArr2 ++;
        } else if(typeof arr2[i] === 'undefined'){
            undefinedInArr2 ++;
        } else if(typeof arr2[i] === 'string'){
            stringInArr2 ++;
        } else if(typeof arr2[i] ==='object'){
            if(Object.prototype.toString.apply(arr2[i]) === '[object Null]'){
                nullInArr2 ++;
            } else if(Object.prototype.toString.apply(arr2[i]) === '[object Date]'){
                dateInArr2 ++;
            } else if(Object.prototype.toString.apply(arr2[i]) === '[object global]'){
                windowInArr2 ++;
            }
        }
    }

    console.log("num---"+numInArr1);
    console.log("num---"+numInArr2);
    console.log("boo---"+booleanInArr1);
    console.log("boo---"+booleanInArr2);
    console.log("null---"+nullInArr1);
    console.log("null---"+nullInArr2);
    console.log("window---"+windowInArr1);
    console.log("window---"+windowInArr2);
    console.log("date---"+dateInArr1);
    console.log("date---"+dateInArr2);
    console.log("string---"+stringInArr1);
    console.log("string---"+stringInArr2);
    console.log("fun---"+funInArr1);
    console.log("fun---"+funInArr2);
    console.log("undefined---"+undefinedInArr1);
    console.log("undefined---"+undefinedInArr2);

    if(numInArr1 == numInArr2 && booleanInArr1==booleanInArr2 && funInArr1==funInArr2 && undefinedInArr1==undefinedInArr2 && stringInArr1==stringInArr2 && nullInArr1==nullInArr2 && dateInArr1==dateInArr2 && windowInArr1==windowInArr2){
        console.log('================================true');
        return true;
    }else{
        console.log('================================false');
        return false;
    }
}
```

## 总结

* 上述代码完美的跑完所有的测试用例，读者 [点击这里查看结果](http://gaohaoyang.github.io/javascript-test/arraysSimilar/)，并且可以按 `f12` 看 Console 信息， 里面有代码的执行过程。  
* 当然你也可以复制本文的 JavaScript 代码，在 [慕课网的习题](http://imooc.com/code/5760) 下跑一下，也可以看到 `判定结果:通过` 的结果
* 完整源代码在我的 GitHub [javascript-test/arraysSimilar/](https://github.com/Gaohaoyang/javascript-test/tree/master/arraysSimilar) 仓库中   
* 其实我的代码逻辑并不复杂，有点**空间换时间**的感觉，执行效率应该是较高的。没有用 JavaScript 封装的任何函数，完全是自己写的。其实代码除去 `console.log()` 也并没有多少行。
* 各位读者有什么好的想法欢迎留言交流！
