---
layout: post
title:  "目标检测--Obeject Detection"
date:   2020-03-08 18:30:00
categories: 计算机视觉
tags: 深度学习 计算机视觉 GAN  yolo
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

- **目标检测**（Object Detection），在计算机视觉领域的任务就是给定一张图片，将图片中的物体识别并且框定出来。
- object detection的算法主要可以分为两大类：**two-stage** detector和**one-stage** detector。
  - One-Stage检测算法是指类似Faster RCNN，RFCN这样需要region proposal的检测算法，这类算法可以达到很高的准确率，但是速度较慢。虽然可以通过减少proposal的数量或降低输入图像的分辨率等方式达到提速，但是速度并没有质的提升。
  - Two-Stage检测算法是指类似YOLO，SSD这样不需要region proposal，直接回归的检测算法，这类算法速度很快，但是准确率不如前者。
 - PS：Multi-Stage检测算法的Selective Search、Feature extraction、Location regression、Class SVM等环节都是分开训练，操作繁杂而且效果不好，所以这里默认忽视。
 - focal loss的出发点也是希望one-stage detector可以达到two-stage detector的准确率，同时不影响原有的速度。
 - 参考：[目标检测算法综述](https://blog.csdn.net/liuxinnanshou/article/details/104467821)
- One-Stage检测算法的初衷是提升速度，而Two-Stage中比较耗时就是proposal建议区域生成，所以索性One-Stage方法就是直接从图像建议区域提取特征进行分类和定位回归。
   - 图像建议区域是直接从backbone的特征层中进行密集选取，所以一些one-stage算法也称为密集检测器。同时可以看出，one-stage主要处理的问题是：特征提取、分类和定位回归。即关键点全部在特征提取这一块上。
  ![](https://img-blog.csdnimg.cn/202002232128149.png)
- Two-Stage检测算法可以通过ROI pooling layer（以Faster R-CNN为例）进行结构划分，前部分提出可能存在目标的区域，后部分即目标分类和定位回归。结构如下
   - two-stage主要处理的几个问题是：backbone进行特征提取、proposal建议区域的生成、分类和定位回归。
![](https://img-blog.csdnimg.cn/2020022321273620.png)

# 算法综述

- 【2018-4-7】[从RCNN到SSD，这应该是最全的一份目标检测算法盘点](https://www.jiqizhixin.com/articles/2018-04-27)

本文对目标检测进行了整体回顾，第一部分从 RCNN 开始介绍基于候选区域的目标检测器，包括 Fast R-CNN、Faster R-CNN 和 FPN 等。第二部分则重点讨论了包括 YOLO、SSD 和 RetinaNet 等在内的单次检测器，它们都是目前最为优秀的方法。

## 基于候选区域的目标检测器

### 滑动窗口检测器

自从 AlexNet 获得 ILSVRC 2012 挑战赛冠军后，用 CNN 进行分类成为主流。一种用于目标检测的暴力方法是从左到右、从上到下滑动窗口，利用分类识别目标。为了在不同观察距离处检测不同的目标类型，我们使用不同大小和宽高比的窗口。
 
![](https://image.jiqizhixin.com/uploads/editor/56fda0e6-5626-4a49-b2e5-41cd518914a2/1524810326548.jpg)
 
_滑动窗口（从右到左，从上到下）_

我们根据滑动窗口从图像中剪切图像块。由于很多分类器只取固定大小的图像，因此这些图像块是经过变形转换的。但是，这不影响分类准确率，因为分类器可以处理变形后的图像。

![](https://image.jiqizhixin.com/uploads/editor/877ad5ad-acab-47ea-8b03-f25f31503dec/1524810326235.jpg)

_将图像变形转换成固定大小的图像_

变形图像块被输入 CNN 分类器中，提取出 4096 个特征。之后，我们使用 SVM 分类器识别类别和该边界框的另一个线性回归器。

![](https://image.jiqizhixin.com/uploads/editor/def0df24-c295-45f0-b6f0-83c86524ec34/1524810326396.jpg)
 
_滑动窗口检测器的系统工作流程图。_
 
下面是伪代码。我们创建很多窗口来检测不同位置的不同目标。要提升性能，一个显而易见的办法就是减少窗口数量。
 
```python
for window in windows
    patch = get_patch(image, window)
    results = detector(patch)
```
 
### 选择性搜索
 
我们不使用暴力方法，而是用**候选区域**方法（region proposal method）创建目标检测的感兴趣区域（ROI）。在选择性搜索（selective search，SS）中，我们首先将每个像素作为一组。然后，计算每一组的纹理，并将两个最接近的组结合起来。但是为了避免单个区域吞噬其他区域，我们首先对较小的组进行分组。我们继续合并区域，直到所有区域都结合在一起。下图第一行展示了如何使区域增长，第二行中的蓝色矩形代表合并过程中所有可能的 ROI。
 
![](https://image.jiqizhixin.com/uploads/editor/75aef501-16d3-47f4-8403-3cc4fe2fa5d5/1524810327069.jpg)
 
_图源：van de Sande et al. ICCV'11_
 
#### R-CNN
 
R-CNN 利用候选区域方法创建了约 2000 个 ROI。这些区域被转换为固定大小的图像，并分别馈送到卷积神经网络中。该网络架构后面会跟几个全连接层，以实现目标分类并提炼边界框。
 
![](https://image.jiqizhixin.com/uploads/editor/b4d6c68f-eb44-4c43-bd4e-9101aec1d61e/1524810326762.jpg)
 
_使用候选区域、CNN、仿射层来定位目标。_
 
以下是 R-CNN 整个系统的流程图：
 
![](https://image.jiqizhixin.com/uploads/editor/9d20688e-8dad-4586-a931-92c34cb5c56a/1524810326853.jpg)
 
通过使用更少且更高质量的 ROI，R-CNN 要比滑动窗口方法更快速、更准确。
 
```python
ROIs = region_proposal(image)
for ROI in ROIs
    patch = get_patch(image, ROI)
    results = detector(patch)
```
 
### 边界框回归器
 
候选区域方法有非常高的计算复杂度。为了加速这个过程，我们通常会使用计算量较少的候选区域选择方法构建 ROI，并在后面使用线性回归器（使用全连接层）进一步提炼边界框。
 
![](https://image.jiqizhixin.com/uploads/editor/531fe028-4fe9-4f75-8493-a68485bad3a7/1524810327599.jpg)
 
_使用回归方法将蓝色的原始边界框提炼为红色的。_
 
#### Fast R-CNN
 
R-CNN 需要非常多的候选区域以提升准确度，但其实有很多区域是彼此重叠的，因此 R-CNN 的训练和推断速度非常慢。如果我们有 2000 个候选区域，且每一个都需要独立地馈送到 CNN 中，那么对于不同的 ROI，我们需要重复提取 2000 次特征。
 
此外，CNN 中的特征图以一种密集的方式表征空间特征，那么我们能直接使用特征图代替原图来检测目标吗？
 
![](https://image.jiqizhixin.com/uploads/editor/89dfd079-2c83-4edd-8cb5-e09627fa1ada/1524810327749.jpg)
 
![](https://image.jiqizhixin.com/uploads/editor/71a18c9a-364d-4569-95b5-373850deabfc/1524810327979.jpg)
 
_直接利用特征图计算 ROI。_
 
Fast R-CNN 使用特征提取器（CNN）先提取整个图像的特征，而不是从头开始对每个图像块提取多次。然后，我们可以将创建候选区域的方法直接应用到提取到的特征图上。例如，Fast R-CNN 选择了 VGG16 中的卷积层 conv5 来生成 ROI，这些关注区域随后会结合对应的特征图以裁剪为特征图块，并用于目标检测任务中。我们使用 ROI 池化将特征图块转换为固定的大小，并馈送到全连接层进行分类和定位。因为 Fast-RCNN 不会重复提取特征，因此它能显著地减少处理时间。
 
![](https://image.jiqizhixin.com/uploads/editor/22c8abb3-9c67-4c5d-a613-3bebb3d7374f/1524810328074.jpg)
 
_将候选区域直接应用于特征图，并使用 ROI 池化将其转化为固定大小的特征图块。_
 
以下是 Fast R-CNN 的流程图：
 
![](https://image.jiqizhixin.com/uploads/editor/d1e3b8d5-a71b-4f44-8856-9414e98b12fc/1524810328159.jpg)
 
在下面的伪代码中，计算量巨大的特征提取过程从 For 循环中移出来了，因此速度得到显著提升。Fast R-CNN 的训练速度是 R-CNN 的 10 倍，推断速度是后者的 150 倍。
 
```python
feature_maps = process(image)
ROIs = region_proposal(feature_maps)
for ROI in ROIs
    patch = roi_pooling(feature_maps, ROI)
    results = detector2(patch)
```
 
Fast R-CNN 最重要的一点就是包含特征提取器、分类器和边界框回归器在内的整个网络能通过多任务损失函数进行端到端的训练，这种多任务损失即结合了分类损失和定位损失的方法，大大提升了模型准确度。
 
### ROI 池化
 
因为 Fast R-CNN 使用全连接层，所以我们应用 ROI 池化将不同大小的 ROI 转换为固定大小。

为简洁起见，我们先将 8×8 特征图转换为预定义的 2×2 大小。
*   下图左上角：特征图。
*   右上角：将 ROI（蓝色区域）与特征图重叠。
*   左下角：将 ROI 拆分为目标维度。例如，对于 2×2 目标，我们将 ROI 分割为 4 个大小相似或相等的部分。
*   右下角：找到每个部分的最大值，得到变换后的特征图。
 
![](https://image.jiqizhixin.com/uploads/editor/5df513df-c595-4383-89ba-22bbaa57b3a4/1524810328239.jpg)
 
_输入特征图（左上），输出特征图（右下），ROI (右上，蓝色框)。_
 
按上述步骤得到一个 2×2 的特征图块，可以馈送至分类器和边界框回归器中。
 
### Faster R-CNN
 
Fast R-CNN 依赖于外部候选区域方法，如选择性搜索。但这些算法在 CPU 上运行且速度很慢。在测试中，Fast R-CNN 需要 2.3 秒来进行预测，其中 2 秒用于生成 2000 个 ROI。
 
```python
feature_maps = process(image)
ROIs = region_proposal(feature_maps)         # Expensive!
for ROI in ROIs
    patch = roi_pooling(feature_maps, ROI)
    results = detector2(patch)
```
 
Faster R-CNN 采用与 Fast R-CNN 相同的设计，只是它用内部深层网络代替了候选区域方法。新的候选区域网络（RPN）在生成 ROI 时效率更高，并且以每幅图像 10 毫秒的速度运行。
 
![](https://image.jiqizhixin.com/uploads/editor/20725eb0-4f5b-4e59-8349-2ab85171c267/1524810328304.jpg)
 
_Faster R-CNN 的流程图与 Fast R-CNN 相同。_
 
![](https://image.jiqizhixin.com/uploads/editor/64f78e7b-b530-4623-b86f-cbe126fc4ec0/1524810328439.jpg)
 
_外部候选区域方法代替了内部深层网络。_
 
### 候选区域网络
 
候选区域网络（RPN）将第一个卷积网络的输出特征图作为输入。它在特征图上滑动一个 3×3 的卷积核，以使用卷积网络（如下所示的 ZF 网络）构建与类别无关的候选区域。其他深度网络（如 VGG 或 ResNet）可用于更全面的特征提取，但这需要以速度为代价。ZF 网络最后会输出 256 个值，它们将馈送到两个独立的全连接层，以预测边界框和两个 objectness 分数，这两个 objectness 分数度量了边界框是否包含目标。我们其实可以使用回归器计算单个 objectness 分数，但为简洁起见，Faster R-CNN 使用只有两个类别的分类器：即带有目标的类别和不带有目标的类别。
 
![](https://image.jiqizhixin.com/uploads/editor/2f1780b3-e2df-4819-90a3-26ebc491fdc1/1524810328499.jpg)
 
对于特征图中的每一个位置，RPN 会做 k 次预测。因此，RPN 将输出 4×k 个坐标和每个位置上 2×k 个得分。下图展示了 8×8 的特征图，且有一个 3×3 的卷积核执行运算，它最后输出 8×8×3 个 ROI（其中 k=3）。下图（右）展示了单个位置的 3 个候选区域。
 
![](https://image.jiqizhixin.com/uploads/editor/3e80aa19-4f58-4e20-adff-9579aeb8a61b/1524810332097.jpg)
 
此处有 3 种猜想，稍后我们将予以完善。由于只需要一个正确猜想，因此我们最初的猜想最好涵盖不同的形状和大小。因此，Faster R-CNN 不会创建随机边界框。相反，它会预测一些与左上角名为「锚点」的参考框相关的偏移量（如𝛿x、𝛿y）。我们限制这些偏移量的值，因此我们的猜想仍然类似于锚点。
 
![](https://image.jiqizhixin.com/uploads/editor/9d9653ea-fbdc-4c08-8992-6d8466100395/1524810332177.jpg)
 
要对每个位置进行 k 个预测，我们需要以每个位置为中心的 k 个锚点。每个预测与特定锚点相关联，但不同位置共享相同形状的锚点。
 
![](https://image.jiqizhixin.com/uploads/editor/de8d482c-85ba-4833-9d67-2caf341647ad/1524810332568.jpg)
 
这些锚点是精心挑选的，因此它们是多样的，且覆盖具有不同比例和宽高比的现实目标。这使得我们可以以更好的猜想来指导初始训练，并允许每个预测专门用于特定的形状。该策略使早期训练更加稳定和简便。
 
![](https://image.jiqizhixin.com/uploads/editor/0921d244-ef15-49fc-9d3e-fa3c4b217a01/1524810332665.jpg)
 
Faster R-CNN 使用更多的锚点。它部署 9 个锚点框：3 个不同宽高比的 3 个不同大小的锚点框。每一个位置使用 9 个锚点，每个位置会生成 2×9 个 objectness 分数和 4×9 个坐标。  
![](https://image.jiqizhixin.com/uploads/editor/be45acdf-9fdf-487b-8d67-5c3a1fcff82d/1524810648533.jpg)
 
_图源：https://arxiv.org/pdf/1506.01497.pdf_
 
### R-CNN 方法的性能
 
如下图所示，Faster R-CNN 的速度要快得多。
 
![](https://image.jiqizhixin.com/uploads/editor/085815f8-00f0-4677-8eae-50cdff80a8f9/1524810679225.jpg)
 
基于区域的全卷积神经网络（R-FCN）
 
假设我们只有一个特征图用来检测右眼。那么我们可以使用它定位人脸吗？应该可以。因为右眼应该在人脸图像的左上角，所以我们可以利用这一点定位整个人脸。
 
![](https://image.jiqizhixin.com/uploads/editor/b158b797-a090-4290-b261-2ee1b25895f4/1524810332828.jpg)
 
如果我们还有其他用来检测左眼、鼻子或嘴巴的特征图，那么我们可以将检测结果结合起来，更好地定位人脸。
 
现在我们回顾一下所有问题。在 Faster R-CNN 中，检测器使用了多个全连接层进行预测。如果有 2000 个 ROI，那么成本非常高。
 
```python
feature_maps = process(image)
ROIs = region_proposal(feature_maps)
for ROI in ROIs
    patch = roi_pooling(feature_maps, ROI)
    class_scores, box = detector(patch)         # Expensive!
    class_probabilities = softmax(class_scores)
```
 
R-FCN 通过减少每个 ROI 所需的工作量实现加速。上面基于区域的特征图与 ROI 是独立的，可以在每个 ROI 之外单独计算。剩下的工作就比较简单了，因此 R-FCN 的速度比 Faster R-CNN 快。
 
```python
feature_maps = process(image)
ROIs = region_proposal(feature_maps)         
score_maps = compute_score_map(feature_maps)
for ROI in ROIs
    V = region_roi_pool(score_maps, ROI)     
    class_scores, box = average(V)                   # Much simpler!
    class_probabilities = softmax(class_scores)
```
 
现在我们来看一下 5 × 5 的特征图 M，内部包含一个蓝色方块。我们将方块平均分成 3 × 3 个区域。现在，我们在 M 中创建了一个新的特征图，来检测方块的左上角（TL）。这个新的特征图如下图（右）所示。只有黄色的网格单元 \[2, 2\] 处于激活状态。
 
![](https://image.jiqizhixin.com/uploads/editor/561c6af5-c064-49d2-87e3-50630d94538a/1524810332733.jpg)
 
_在左侧创建一个新的特征图，用于检测目标的左上角。_
 
我们将方块分成 9 个部分，由此创建了 9 个特征图，每个用来检测对应的目标区域。这些特征图叫作位置敏感得分图（position-sensitive score map），因为每个图检测目标的子区域（计算其得分）。
 
![](https://image.jiqizhixin.com/uploads/editor/eec9f89a-48d0-4883-bb57-9d4b56e3381f/1524810332931.jpg)
 
_生成 9 个得分图_
 
下图中红色虚线矩形是建议的 ROI。我们将其分割成 3 × 3 个区域，并询问每个区域包含目标对应部分的概率是多少。例如，左上角 ROI 区域包含左眼的概率。我们将结果存储成 3 × 3 vote 数组，如下图（右）所示。例如，vote_array\[0\]\[0\] 包含左上角区域是否包含目标对应部分的得分。
 
![](https://image.jiqizhixin.com/uploads/editor/cfc8f00b-e286-46f4-978b-e331daa1609a/1524810333011.jpg)
 
_将 ROI 应用到特征图上，输出一个 3 x 3 数组。_
 
将得分图和 ROI 映射到 vote 数组的过程叫作位置敏感 ROI 池化（position-sensitive ROI-pool）。该过程与前面讨论过的 ROI 池化非常接近。
 
![](https://image.jiqizhixin.com/uploads/editor/a1e25668-6c3c-4abe-92b2-78d28536d83b/1524810333098.jpg)
 
_将 ROI 的一部分叠加到对应的得分图上，计算 V\[i\]\[j\]。_
 
在计算出位置敏感 ROI 池化的所有值后，类别得分是其所有元素得分的平均值。
 
![](https://image.jiqizhixin.com/uploads/editor/08dc47c6-31d3-4404-8816-d2ca9222cc1f/1524810333178.jpg)
 
_ROI 池化_
 
假如我们有 C 个类别要检测。我们将其扩展为 C + 1 个类别，这样就为背景（非目标）增加了一个新的类别。每个类别有 3 × 3 个得分图，因此一共有 (C+1) × 3 × 3 个得分图。使用每个类别的得分图可以预测出该类别的类别得分。然后我们对这些得分应用 softmax 函数，计算出每个类别的概率。
 
以下是数据流图，在我们的案例中，k=3。
 
![](https://image.jiqizhixin.com/uploads/editor/122f41d5-8ca5-4bd1-b5ef-bac0452706da/1524810333259.jpg)
 
## 总结
 
首先了解了基础的滑动窗口算法：
 
```python
for window in windows
    patch = get_patch(image, window)
    results = detector(patch)
```
 
然后尝试减少窗口数量，尽可能减少 for 循环中的工作量。
 
```
ROIs = region_proposal(image)
for ROI in ROIs
    patch = get_patch(image, ROI)
    results = detector(patch)
```
 
### 单次目标检测器
 
第二部分，我们将对单次目标检测器（包括 SSD、YOLO、YOLOv2、YOLOv3）进行综述。我们将分析 FPN 以理解多尺度特征图如何提高准确率，特别是小目标的检测，其在单次检测器中的检测效果通常很差。然后我们将分析 Focal loss 和 RetinaNet，看看它们是如何解决训练过程中的类别不平衡问题的。
 
单次检测器
 
Faster R-CNN 中，在分类器之后有一个专用的候选区域网络。
 
![](https://image.jiqizhixin.com/uploads/editor/9e0c5beb-6dc0-494c-bbf8-8da1b4666472/1524810328366.jpg)
 
_Faster R-CNN 工作流_
 
基于区域的检测器是很准确的，但需要付出代价。Faster R-CNN 在 PASCAL VOC 2007 测试集上每秒处理 7 帧的图像（7 FPS）。和 R-FCN 类似，研究者通过减少每个 ROI 的工作量来精简流程。
 
```python
feature_maps = process(image)
ROIs = region_proposal(feature_maps)
for ROI in ROIs
    patch = roi_align(feature_maps, ROI)
    results = detector2(patch)    # Reduce the amount of work here!
```
 
作为替代，我们是否需要一个分离的候选区域步骤？我们可以直接在一个步骤内得到边界框和类别吗？
 
```python
feature_maps = process(image)
results = detector3(feature_maps) # No more separate step for ROIs
```
 
让我们再看一下滑动窗口检测器。我们可以通过在特征图上滑动窗口来检测目标。对于不同的目标类型，我们使用不同的窗口类型。以前的滑动窗口方法的致命错误在于使用窗口作为最终的边界框，这就需要非常多的形状来覆盖大部分目标。更有效的方法是将窗口当做初始猜想，这样我们就得到了从当前滑动窗口同时预测类别和边界框的检测器。
 
![](https://image.jiqizhixin.com/uploads/editor/761e85fe-c0c2-4443-a3f9-063f4733fee3/1524810333381.jpg)
 
_基于滑动窗口进行预测_
 
这个概念和 Faster R-CNN 中的锚点很相似。然而，单次检测器会同时预测边界框和类别。例如，我们有一个 8 × 8 特征图，并在每个位置做出 k 个预测，即总共有 8 × 8 × k 个预测结果。
 
![](https://image.jiqizhixin.com/uploads/editor/c8430d56-3284-4d64-9059-e7b68e64f358/1524810333471.jpg)
 
_64 个位置_
 
在每个位置，我们有 k 个锚点（锚点是固定的初始边界框猜想），一个锚点对应一个特定位置。我们使用相同的 锚点形状仔细地选择锚点和每个位置。
 
![](https://image.jiqizhixin.com/uploads/editor/ac7f956c-60be-4bea-b09d-1a2c50af547b/1524810333511.jpg)
 
_使用 4 个锚点在每个位置做出 4 个预测。_
 
以下是 4 个锚点（绿色）和 4 个对应预测（蓝色），每个预测对应一个特定锚点。
 
![](https://image.jiqizhixin.com/uploads/editor/9266681b-9fac-412f-a547-c9f34cce649c/1524810333616.jpg)
 
_4 个预测，每个预测对应一个锚点。_
 
在 Faster R-CNN 中，我们使用卷积核来做 5 个参数的预测：4 个参数对应某个锚点的预测边框，1 个参数对应 objectness 置信度得分。因此 3× 3× D × 5 卷积核将特征图从 8 × 8 × D 转换为 8 × 8 × 5。
 
![](https://image.jiqizhixin.com/uploads/editor/9313cd65-7fd9-480d-a369-401d9ac1257a/1524810333689.jpg)
 
_使用 3x3 卷积核计算预测。_
 
在单次检测器中，卷积核还预测 C 个类别概率以执行分类（每个概率对应一个类别）。因此我们应用一个 3× 3× D × 25 卷积核将特征图从 8 × 8 × D 转换为 8 × 8 × 25（C=20）。
 
![](https://image.jiqizhixin.com/uploads/editor/73521513-3959-4bcd-9a38-c8be01ef6a63/1524810333748.jpg)
 
_每个位置做出 k 个预测，每个预测有 25 个参数。_
 
单次检测器通常需要在准确率和实时处理速度之间进行权衡。它们在检测太近距离或太小的目标时容易出现问题。在下图中，左下角有 9 个圣诞老人，但某个单次检测器只检测出了 5 个。
 
![](https://image.jiqizhixin.com/uploads/editor/e4a52e23-2282-4859-a369-20fb309bceb5/1524810334979.jpg)
 
## SSD
 
SSD 是使用 VGG19 网络作为特征提取器（和 Faster R-CNN 中使用的 CNN 一样）的单次检测器。我们在该网络之后添加自定义卷积层（蓝色），并使用卷积核（绿色）执行预测。
 
![](https://image.jiqizhixin.com/uploads/editor/71bca5b1-ad0c-400b-b866-afded83f55f9/1524810333805.jpg)
 
_同时对类别和位置执行单次预测。_
 
然而，卷积层降低了空间维度和分辨率。因此上述模型仅可以检测较大的目标。为了解决该问题，我们从多个特征图上执行独立的目标检测。
 
![](https://image.jiqizhixin.com/uploads/editor/096bf171-b014-48d5-b20e-b3f6b369367b/1524810334669.jpg)
 
_使用多尺度特征图用于检测。_
 
以下是特征图图示。
 
![](https://image.jiqizhixin.com/uploads/editor/bd0d98b9-10d3-4c94-bc29-a41b42587dcd/1524810334737.jpg)
 
_图源：https://arxiv.org/pdf/1512.02325.pdf_
 
SSD 使用卷积网络中较深的层来检测目标。如果我们按接近真实的比例重绘上图，我们会发现图像的空间分辨率已经被显著降低，且可能已无法定位在低分辨率中难以检测的小目标。如果出现了这样的问题，我们需要增加输入图像的分辨率。
 
![](https://image.jiqizhixin.com/uploads/editor/b9064245-5c94-46bb-a50b-13252dffa59b/1524810338669.jpg)
 
## YOLO
 
YOLO 是另一种单次目标检测器。
 
YOLO 在卷积层之后使用了 DarkNet 来做特征检测。
 
![](https://image.jiqizhixin.com/uploads/editor/b76a02d5-2a4a-43fd-90e7-052335d88146/1524810338743.jpg)
 
然而，它并没有使用多尺度特征图来做独立的检测。相反，它将特征图部分平滑化，并将其和另一个较低分辨率的特征图拼接。例如，YOLO 将一个 28 × 28 × 512 的层重塑为 14 × 14 × 2048，然后将它和 14 × 14 ×1024 的特征图拼接。之后，YOLO 在新的 14 × 14 × 3072 层上应用卷积核进行预测。
 
YOLO（v2）做出了很多实现上的改进，将 mAP 值从第一次发布时的 63.4 提高到了 78.6。YOLO9000 可以检测 9000 种不同类别的目标。
 
![](https://image.jiqizhixin.com/uploads/editor/0e8e87de-4082-4450-9e68-5a17cae766bd/1524810338854.jpg)
 
_图源：https://arxiv.org/pdf/1612.08242.pdf_
 
以下是 YOLO 论文中不同检测器的 mAP 和 FPS 对比。YOLOv2 可以处理不同分辨率的输入图像。低分辨率的图像可以得到更高的 FPS，但 mAP 值更低。
 
![](https://image.jiqizhixin.com/uploads/editor/c8b94c58-c362-4593-a982-a42165f2bddc/1524810338786.jpg)
 
_图源：https://arxiv.org/pdf/1612.08242.pdf_

 
## YOLOv3
 
YOLOv3 使用了更加复杂的骨干网络来提取特征。DarkNet-53 主要由 3 × 3 和 1× 1 的卷积核以及类似 ResNet 中的跳过连接构成。相比 ResNet-152，DarkNet 有更低的 BFLOP（十亿次浮点数运算），但能以 2 倍的速度得到相同的分类准确率。
 
![](https://image.jiqizhixin.com/uploads/editor/32ac614a-e215-4fcf-b6e7-74d91fc65f8a/1524810338923.jpg)
 
_图源：https://pjreddie.com/media/files/papers/YOLOv3.pdf_
 
YOLOv3 还添加了特征金字塔，以更好地检测小目标。以下是不同检测器的准确率和速度的权衡。
 
![](https://image.jiqizhixin.com/uploads/editor/fca7d1e5-c6dc-44b0-804e-0db90fdf5426/1524810339015.jpg)
 
_图源：https://pjreddie.com/media/files/papers/YOLOv3.pdf_
 
### 特征金字塔网络（FPN）
 
检测不同尺度的目标很有挑战性，尤其是小目标的检测。特征金字塔网络（FPN）是一种旨在提高准确率和速度的特征提取器。它取代了检测器（如 Faster R-CNN）中的特征提取器，并生成更高质量的特征图金字塔。
 
数据流
 
![](https://image.jiqizhixin.com/uploads/editor/e7d97947-30b4-4d2a-b274-927ed338cf91/1524810339079.jpg)
 
_FPN（图源：https://arxiv.org/pdf/1612.03144.pdf）_
 
FPN 由自下而上和自上而下路径组成。其中自下而上的路径是用于特征提取的常用卷积网络。空间分辨率自下而上地下降。当检测到更高层的结构，每层的语义值增加。
 
![](https://image.jiqizhixin.com/uploads/editor/765cf51f-787e-4089-9591-026d6ebf6476/1524810339174.jpg)
 
_FPN 中的特征提取（编辑自原论文）_
 
SSD 通过多个特征图完成检测。但是，最底层不会被选择执行目标检测。它们的分辨率高但是语义值不够，导致速度显著下降而不能被使用。SSD 只使用较上层执行目标检测，因此对于小的物体的检测性能较差。
 
![](https://image.jiqizhixin.com/uploads/editor/7ff17ace-6c7f-4709-bff2-31189fc63563/1524810339224.jpg)
 
_图像修改自论文 https://arxiv.org/pdf/1612.03144.pdf_
 
FPN 提供了一条自上而下的路径，从语义丰富的层构建高分辨率的层。
 
![](https://image.jiqizhixin.com/uploads/editor/45f068b6-b9f8-4b49-85ba-4d5565b11647/1524810339278.jpg)
 
_自上而下重建空间分辨率（编辑自原论文）_
 
虽然该重建层的语义较强，但在经过所有的上采样和下采样之后，目标的位置不精确。在重建层和相应的特征图之间添加横向连接可以使位置侦测更加准确。
 
![](https://image.jiqizhixin.com/uploads/editor/7f3114e0-7196-44cd-b884-7d29364e1b90/1524810339123.jpg)
 
_增加跳过连接（引自原论文）_
 
下图详细说明了自下而上和自上而下的路径。其中 P2、P3、P4 和 P5 是用于目标检测的特征图金字塔。
 
![](https://image.jiqizhixin.com/uploads/editor/e1f56dc7-4ace-475d-aed4-dc25bbaae97b/1524810340484.jpg)
 
### FPN 结合 RPN
 
FPN 不单纯是目标检测器，还是一个目标检测器和协同工作的特征检测器。分别传递到各个特征图（P2 到 P5）来完成目标检测。
 
![](https://image.jiqizhixin.com/uploads/editor/62d44f55-6bf2-4cca-aac6-731a08b0644b/1524810339366.jpg)
 
FPN 结合 Fast R-CNN 或 Faster R-CNN
 
在 FPN 中，我们生成了一个特征图的金字塔。用 RPN（详见上文）来生成 ROI。基于 ROI 的大小，我们选择最合适尺寸的特征图层来提取特征块。
 
![](https://image.jiqizhixin.com/uploads/editor/91682d7d-4a09-490c-97b7-963b8b5f1100/1524810340550.jpg)
 
困难案例
 
对于如 SSD 和 YOLO 的大多数检测算法来说，我们做了比实际的目标数量要多得多的预测。所以错误的预测比正确的预测要更多。这产生了一个对训练不利的类别不平衡。训练更多的是在学习背景，而不是检测目标。但是，我们需要负采样来学习什么是较差的预测。所以，我们计算置信度损失来把训练样本分类。选取最好的那些来确保负样本和正样本的比例最多不超过 3:1。这使训练更加快速和稳定。
 
推断过程中的非极大值抑制
 
检测器对于同一个目标会做出重复的检测。我们利用非极大值抑制来移除置信度低的重复检测。将预测按照置信度从高到低排列。如果任何预测和当前预测的类别相同并且两者 IoU 大于 0.5，我们就把它从这个序列中剔除。
 
Focal Loss（RetinaNet）
 
类别不平衡会损害性能。SSD 在训练期间重新采样目标类和背景类的比率，这样它就不会被图像背景淹没。Focal loss（FL）采用另一种方法来减少训练良好的类的损失。因此，只要该模型能够很好地检测背景，就可以减少其损失并重新增强对目标类的训练。我们从交叉熵损失 CE 开始，并添加一个权重来降低高可信度类的 CE。
 
![](https://image.jiqizhixin.com/uploads/editor/93473e21-749b-4404-b25f-93cc063baa43/1524810340587.jpg)
 
例如，令 γ = 0.5, 经良好分类的样本的 Focal loss 趋近于 0。
 
![](https://image.jiqizhixin.com/uploads/editor/ae73225e-7c50-45e1-a924-66cd0696aefc/1524810340628.jpg)
 
_编辑自原论文_
 
这是基于 FPN、ResNet 以及利用 Focal loss 构建的 RetianNet。
 
![](https://image.jiqizhixin.com/uploads/editor/5526e1b4-fe6c-46ec-bdf6-9347e903383a/1524810340700.jpg)
 
_RetinaNet_


# 目标检测实践

![](https://imgconvert.csdnimg.cn/aHR0cHM6Ly9tbWJpei5xcGljLmNuL21tYml6X2dpZi8xTXRuQXhtV1N3TnBlWHVvOFAyd1ZpY2lhVkswdEEzcXBQMmliRHp2anRpY0N0NU1WSllzUFVCb2liZXU0TjZxbUxSZTJrTG13SWljRHNXY2hNRFE4aWJZam9jb1EvNjQw?x-oss-process=image/format,png)

- 【2021-5-18】[4种YOLO目标检测的C++和Python两种版本实现](https://www.toutiao.com/i6963503613297689102/)
- 2020年，新出了几个新版本的YOLO目标检测，最多的有YOLOv4，Yolo-Fastest，YOLObile以及百度提出的PP-YOLO。C++编写一套基于OpenCV的YOLO目标检测，这个程序里包含了经典的YOLOv3，YOLOv4，Yolo-Fastest和YOLObile这4种YOLO目标检测的实现
- Yolo-Fastest运行速度最快，YOLObile号称是实时的，但是从结果看并不如此。并且查看它们的模型文件，可以看到Yolo-Fastest的是最小的。
- opencv实现yolov5目标检测，程序依然是包含了C++和Python两种版本的实现，地址: [python](https://github.com/hpc203/yolov5-dnn-cpp-python),  [C++](https://github.com/hpc203/yolov5-dnn-cpp-python-v2)

![](https://p6-tt.byteimg.com/origin/pgc-image/3ae75db8898d47eaac8b9649a0ff5a97?from=pc)

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


