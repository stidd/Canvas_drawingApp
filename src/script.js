const canvas = document.getElementById("draw");
const ctx = canvas.getContext("2d");
const sliderRed = document.getElementById("red");
const sliderGreen = document.getElementById("green");
const sliderBlue = document.getElementById("blue");
let isDrawing = false;
const dlImage = document.getElementById("dlImage");
const imageURLBtn = document.getElementById("imageURLBtn");
const rectWidthSlider = document.getElementById("rectWidth");
const rectHeightSlider = document.getElementById("rectHeight");
const galleryBtn = document.getElementById("addToGalleryBtn");
const artGallery = document.getElementById("artGallery");
const clearCanvas = document.getElementById("clearCanvas");
const imgContainer = document.getElementById("imgContainer");

let redValue = 255;
let greenValue = 0;
let blueValue = 0;

let rectWidth = 10;
let rectHeight = 10;

// window.onload = function(){
//   ctx.canvas.width = window.innerWidth;
//   ctx.canvas.height = 400;
// }

// window.addEventListener('resize', function(){
//     ctx.canvas.width = window.innerWidth;
//     ctx.canvas.height = 400;
// });

canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", () => (isDrawing = false));
canvas.addEventListener("mousedown", event => {
  isDrawing = true;
  draw(event);
});

// listen for slider changes
sliderRed.addEventListener("change", function() {
  redValue = sliderRed.value;
});

sliderGreen.addEventListener("change", function() {
  greenValue = sliderGreen.value;
});

sliderBlue.addEventListener("change", function() {
  blueValue = sliderBlue.value;
});

rectWidthSlider.addEventListener("change", function() {
  rectWidth = rectWidthSlider.value;
});
rectHeightSlider.addEventListener("change", function() {
  rectHeight = rectHeightSlider.value;
});

// draw stuffff
function draw(event) {
  if (!isDrawing) return;
  ctx.fillStyle = `rgba(${redValue}, ${greenValue}, ${blueValue}, ${0.7})`;

  ctx.fillRect(event.clientX, event.clientY, rectWidth, rectHeight);
}

// upload image to draw on
imageURLBtn.addEventListener("click", uploadImg);

function uploadImg() {
  //const imageURLInput = document.getElementById('imageURL').value;
  const userPrompt = prompt("paste a data url here");
  const img = new Image();
  img.addEventListener("load", function() {
    ctx.drawImage(img, 150, 150, ctx.canvas.width / 2, ctx.canvas.height / 2);
  });
  img.src = userPrompt;
}

// downloading image
dlImage.addEventListener("click", downloadCanvas);

function downloadCanvas() {
  const link = document.createElement("a");
  link.download = "my-image.png";
  link.href = canvas.toDataURL("image/png;base64");
  link.click();
}

// add image to gallery
galleryBtn.addEventListener("click", function() {
  //resize drawing for the gallery
  let img1 = new Image();
  img1.src = canvas.toDataURL();
  let resizedImg = "";
  img1.onload = function() {
    resizedImg = resizeImage(img1, 300, 300);
    resizedImg.onload = function() {
      imgContainer.appendChild(resizedImg);
    };
  };
});

function resizeImage(img, w, h) {
  const result = new Image();
  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  canvas.getContext("2d").drawImage(img, 0, 0, w, h);
  result.src = canvas.toDataURL();

  return result;
}

// clear canvas
clearCanvas.addEventListener("click", function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
