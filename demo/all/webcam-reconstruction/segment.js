var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var gCanvas = document.getElementById('gCanvas');
var sCanvas = document.getElementById('sCanvas');
var imgCount =0;
var model1;
var model2;

function isAndroid() {
  return /Android/i.test(navigator.userAgent);
}

function isiOS() {
  return /iPhone|iPad|iPod/i.test(navigator.userAgent);
}

function isMobile() {
  return isAndroid() || isiOS();
}
      
const videoWidth = 500;
const videoHeight = 500;
const color = 'aqua';

async function setupCamera() {
  if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert(
        'Browser API navigator.mediaDevices.getUserMedia not available');
  }

  const video = document.getElementById('video');

  const mobile = isMobile();
  try{
  const stream = await navigator.mediaDevices.getUserMedia({
    'audio': false,
    'video': {
      facingMode: 'user',
      width: mobile ? undefined : videoWidth,
      height: mobile ? undefined : videoHeight,
    },
  });
  
  video.srcObject = stream;
}catch(err){alert(err)}
  return new Promise((resolve) => {
    video.onloadedmetadata = () => {
      resolve(video);
    };
  });
}

async function loadVideo() {
  const video = await setupCamera();
  loadModel();
  video.play();
  render();
  
}	   	    
function drawPoint(ctx, y, x, r, color) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, 2 * Math.PI);
  ctx.fillStyle = color;
  ctx.fill();
}

async function render()
{
    count = 0;
    grace = 0;
    let oldX;
    let oldY;
    var $this = video; //cache
    (function loop() {
      if (!$this.paused && !$this.ended) {
        drawCanvas($this);
        setTimeout(loop, 30); // drawing at 30fps
      }
    })();
}

function drawCanvas($this)
{
    ctx.clearRect(0, 0, videoWidth, videoHeight); 
    ctx.save();
    ctx.scale(-1, 1);
    ctx.translate(-videoWidth, 0);
    ctx.drawImage($this, 0, 0, videoWidth, videoHeight);
    ctx.restore();
}

function startPred()
{
  (function loop() {
    const imgData = getImageData();
    const input = tf.fromPixels(imgData)
    var pred = predict(model1, input);
    tf.toPixels(pred, sCanvas);
    pred = pred.mul(tf.scalar(255.0));
    pred = predict(model2, pred);
    tf.toPixels(pred, gCanvas);
    setTimeout(loop, 60); // drawing at 30fps
  })();
}
/*
get the current image data 
*/
function getImageData() {
    //get image data according to dpi 
    const dpi = window.devicePixelRatio    
    const x = 0 
    const y = 0 
    const w = canvas.width * dpi 
    const h = canvas.height * dpi 
    const imgData = ctx.getImageData(x, y, w, h)
    return imgData
}

/*
get the prediction 
*/
function predict(model, input) {
    return tf.tidy(() => {
        //get the prediction 
        const gImg = model.predict(preprocess(input))
        //post process 
        const postImg = postprocess(gImg)
        return postImg   
    })
}

/*
preprocess the data
*/
function preprocess(input) {
    return tf.tidy(() => {
        //convert to a tensor 
        const tensor = input.toFloat()

        //resize 
        const resized = tf.image.resizeBilinear(tensor, [256, 256])
                
        //normalize 
        const offset = tf.scalar(127.5);
        const normalized = resized.div(offset).sub(tf.scalar(1.0));

        //We add a dimension to get a batch shape 
        const batched = normalized.expandDims(0)
        
        return batched
    })
}

/*
post process 
*/
function postprocess(tensor){
     const w = gCanvas.width  
     const h = gCanvas.height 
     
     return tf.tidy(() => {
        //normalization factor  
        const scale = tf.scalar(0.5);
        
        //unnormalize and sqeeze 
        const squeezed = tensor.squeeze().mul(scale).add(scale)

        //resize to canvas size 
        const resized = tf.image.resizeBilinear(squeezed, [w, h])
        return resized
    })
}

/*
load the model
*/
async function loadModel() {
    //load the model 
    model1 = await tf.loadModel("model1/model.json");
    model2 = await tf.loadModel("model2/model.json");

    //warm up 
    model1.predict(tf.zeros([1, 256, 256, 3]))

    //enable prediction 
    $('#start').prop('disabled', false);
}

function start()
{
  loadVideo();
  loadModel();
}

start();
