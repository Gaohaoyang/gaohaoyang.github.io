---
layout: post
title:  "目标检测"
date:   2020-03-08 18:30:00
categories: 计算机视觉
tags: 深度学习 计算机视觉 GAN 
excerpt: 计算机视觉之目标检测知识汇总
author: 鹤啸九天
mathjax: true
---

* content
{:toc}

# 目标检测背景

- 计算机视觉领域的典型任务就是目标检测
- 目标检测最新趋势：[deep_learning_object_detection](https://github.com/hoya012/deep_learning_object_detection)
- 发展历史：
![](https://github.com/hoya012/deep_learning_object_detection/raw/master/assets/deep_learning_object_detection_history.PNG)
![](https://img-blog.csdnimg.cn/20200223212931503.png)
- 【2020-4-23】技术总结
![](https://pic1.zhimg.com/80/v2-0c98fb30a9e589fa164d99c50e6ca711_1440w.jpg)

## 类型

- 目标检测（Object Detection），在计算机视觉领域的任务就是给定一张图片，将图片中的物体识别并且框定出来。随着近年来的发展，其主要分成了两大类别，Two-Stage检测算法（以Faster R-CNN为代表）和以及One-Stage检测算法（以YOLO为代表）。
   - PS：Multi-Stage检测算法的Selective Search、Feature extraction、Location regression、Class SVM等环节都是分开训练，操作繁杂而且效果不好，所以这里默认忽视。
   - 参考：[目标检测算法综述](https://blog.csdn.net/liuxinnanshou/article/details/104467821)
- One-Stage检测算法的初衷是提升速度，而Two-Stage中比较耗时就是proposal建议区域生成，所以索性One-Stage方法就是直接从图像建议区域提取特征进行分类和定位回归。
   - 图像建议区域是直接从backbone的特征层中进行密集选取，所以一些one-stage算法也称为密集检测器。同时可以看出，one-stage主要处理的问题是：特征提取、分类和定位回归。即关键点全部在特征提取这一块上。
  ![](https://img-blog.csdnimg.cn/202002232128149.png)
- Two-Stage检测算法可以通过ROI pooling layer（以Faster R-CNN为例）进行结构划分，前部分提出可能存在目标的区域，后部分即目标分类和定位回归。结构如下
   - two-stage主要处理的几个问题是：backbone进行特征提取、proposal建议区域的生成、分类和定位回归。
![](https://img-blog.csdnimg.cn/2020022321273620.png)


# 目标检测实践


## Real-Time-Person-Removal

- [实时隐身不留痕项目作者：Jason Mayes](https://mp.weixin.qq.com/s?__biz=MzU1NTUxNTM0Mg==&mid=2247493105&idx=1&sn=7726468d8faaf777284f32997ee33750&chksm=fbd18950cca60046ac133d3fde0857ecfeb7a93769dd135f4a915b923f1da386eeb5264e912a&scene=126&sessionid=1583675043&key=6dc1e3ec383dbb13146e922235a89f44535156bfd8c1191ba4da2e1c3d0365f4f30f345dd86d90910b1a201f10123e81b09a81195d6b3ab30bb32c563907f5525316a57147dc102623de78139e3578d1&ascene=1&uin=OTY1NzE1MTYw&devicetype=Windows+10&version=62080079&lang=zh_CN&exportkey=AX872ydDK0J27zzwMHx%2Fm7c%3D&pass_ticket=5I0Z9AD6y0vIicNPU2j%2BnyzrIe8dG1OkhbEAOwj1UMnKZY%2F9N8SIhRHlOQiY2k%2Bd)
- [Real-Time-Person-Removal](https://github.com/jasonmayes/Real-Time-Person-Removal)
- [Demo 地址](https://codepen.io/jasonmayes/pen/GRJqgma)

<iframe src="https://codepen.io/jasonmayes/pen/GRJqgma" scrolling="yes" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width='800' height='600'> </iframe>

### 实时人物分割

- 【2019-04-11】[浏览器上跑：TensorFlow发布实时人物分割模型，秒速25帧24个部位](https://www.toutiao.com/a6658462631025705480/?tt_from=mobile_qq&utm_campaign=client_share&timestamp=1554985015&app=news_article&utm_source=mobile_qq&utm_medium=toutiao_android&req_id=201904112016540100230730289583E63&group_id=6658462631025705480)
  - TensorFlow开源了一个实时人物分割模型，叫BodyPix。这个模型，在浏览器上用TensorFlow.js就能跑。而且，帧率还很可观，在默认设定下：
    - 用2018版15吋MacBook Pro跑，每秒25帧。用iPhone X跑，每秒21帧。
  - 如果不和其他模型搭配的话，BodyPix只适用于单人影像。

<iframe src="https://storage.googleapis.com/tfjs-models/demos/body-pix/index.html" scrolling="yes" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width='800' height='600'> </iframe>

## 基于tensorflow.js的实时检测Demo

- 参考：[In-browser real-time object detection with TensorFlow.js and React](https://github.com/juandes/tensorflowjs-objectdetection-tutorial)

![](https://github.com/juandes/tensorflowjs-objectdetection-tutorial/raw/master/gif/1.gif)

### 实时检测Demo

{% include wqw_object_detection.html %}

<iframe src="https://nanonets.com/object-detection-with-tensorflowjs-demo/" scrolling="yes" border="0" frameborder="no" framespacing="0" allowfullscreen="true" width='800' height='600'> </iframe>

### 代码

- detect.js内容

```javascript
class App extends React.Component {
  // reference to both the video and canvas
  videoRef = React.createRef();
  canvasRef = React.createRef();

  // we are gonna use inline style
  styles = {
    position: 'fixed',
    top: 150,
    left: 150,
  };


  detectFromVideoFrame = (model, video) => {
    model.detect(video).then(predictions => {
      this.showDetections(predictions);

      requestAnimationFrame(() => {
        this.detectFromVideoFrame(model, video);
      });
    }, (error) => {
      console.log("Couldn't start the webcam")
      console.error(error)
    });
  };

  showDetections = predictions => {
    const ctx = this.canvasRef.current.getContext("2d");
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    const font = "24px helvetica";
    ctx.font = font;
    ctx.textBaseline = "top";

    predictions.forEach(prediction => {
      const x = prediction.bbox[0];
      const y = prediction.bbox[1];
      const width = prediction.bbox[2];
      const height = prediction.bbox[3];
      // Draw the bounding box.
      ctx.strokeStyle = "#2fff00";
      ctx.lineWidth = 1;
      ctx.strokeRect(x, y, width, height);
      // Draw the label background.
      ctx.fillStyle = "#2fff00";
      const textWidth = ctx.measureText(prediction.class).width;
      const textHeight = parseInt(font, 10);
      // draw top left rectangle
      ctx.fillRect(x, y, textWidth + 10, textHeight + 10);
      // draw bottom left rectangle
      ctx.fillRect(x, y + height - textHeight, textWidth + 15, textHeight + 10);

      // Draw the text last to ensure it's on top.
      ctx.fillStyle = "#000000";
      ctx.fillText(prediction.class, x, y);
      ctx.fillText(prediction.score.toFixed(2), x, y + height - textHeight);
    });
  };

  componentDidMount() {
    if (navigator.mediaDevices.getUserMedia || navigator.mediaDevices.webkitGetUserMedia) {
      // define a Promise that'll be used to load the webcam and read its frames
      const webcamPromise = navigator.mediaDevices
        .getUserMedia({
          video: true,
          audio: false,
        })
        .then(stream => {
          // pass the current frame to the window.stream
          window.stream = stream;
          // pass the stream to the videoRef
          this.videoRef.current.srcObject = stream;

          return new Promise(resolve => {
            this.videoRef.current.onloadedmetadata = () => {
              resolve();
            };
          });
        }, (error) => {
          console.log("Couldn't start the webcam")
          console.error(error)
        });

      // define a Promise that'll be used to load the model
      const loadlModelPromise = cocoSsd.load();
      
      // resolve all the Promises
      Promise.all([loadlModelPromise, webcamPromise])
        .then(values => {
          this.detectFromVideoFrame(values[0], this.videoRef.current);
        })
        .catch(error => {
          console.error(error);
        });
    }
  }

  // here we are returning the video frame and canvas to draw,
  // so we are in someway drawing our video "on the go"
  render() {
    return (
      <div> 
        <video
          style={this.styles}
          autoPlay
          muted
          ref={this.videoRef}
          width="720"
          height="600"
        />
        <canvas style={this.styles} ref={this.canvasRef} width="720" height="650" />
      </div>
    );
  }
}

const domContainer = document.querySelector('#root');
ReactDOM.render(React.createElement(App), domContainer);
```


## 资料

- 更多[Demo地址](http://wqw547243068.github.io/demo)

# 结束


