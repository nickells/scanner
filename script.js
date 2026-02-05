const canvas1 = document.getElementById("canvas");

canvas1.width = window.innerWidth;
canvas1.height = window.innerHeight;

const context1 = canvas1.getContext("2d");

const canvas2 = document.getElementById("canvas-top");

canvas2.width = window.innerWidth;
canvas2.height = window.innerHeight;

const context2 = canvas2.getContext("2d");

const image = new Image();
image.crossOrigin = "anonymous";

image.src =
  "https://media.istockphoto.com/id/1385217969/photo/ginger-cat-walks.jpg?s=612x612&w=0&k=20&c=mBhFzDA2dp23dV4jq6FooaSzG2tmCZMKP6TV56hMVII=";

const scanner = document.getElementById("scanner");

const uploadButton = document.getElementById("upload");

const uploadReal = document.getElementById("fileInput");

const download = document.getElementById("download");

const reset = document.getElementById("reset");

const noSpace = function (e) {
  if (e.keyCode == 32) {
    e.preventDefault();
  }
};

uploadButton.onkeydown = noSpace;
download.onkeydown = noSpace;
reset.onkeydown = noSpace;

uploadButton.addEventListener("click", function () {
  uploadReal.click();
});

uploadReal.addEventListener("change", function (e) {
  const file = e.target.files[0];
  const reader = new FileReader();

  reader.onloadend = function () {
    image.src = reader.result;
  };

  if (file) {
    reader.readAsDataURL(file);
  }
});

download.addEventListener("click", function () {
  const dataURL = canvas2.toDataURL("image/png");

  const link = document.createElement("a");
  link.href = dataURL;
  link.download = "download.png"; // The name of the downloaded file
  link.click();
});

let state = {
  scanX: 0,
  done: false,
  scanning: false,
};

reset.addEventListener("click", function () {
  state.scanX = 0;
  state.done = false;
  state.scanning = false;
  context1.clearRect(0, 0, canvas1.width, canvas1.height);
  context2.clearRect(0, 0, canvas1.width, canvas1.height);
});

image.addEventListener("load", (evt) => {
  (state.width = image.width / 2), (state.height = image.height / 2);
});

canvas1.addEventListener("mousemove", (evt) => {
  const x = evt.clientX;
  const y = evt.clientY;

  const imageX = x - state.width / 2;
  const imageY = y - state.height / 2;
  state.imageX = imageX;
  state.imageY = imageY;
});

document.addEventListener("keydown", (evt) => {
  if (evt.code === "Space") {
    if (state.scanning === false) {
      state.scanning = true;

      if (state.scanX >= canvas1.width) {
        state.scanX = 0;
        context1.clearRect(0, 0, canvas1.width, canvas1.height);
        context2.clearRect(0, 0, canvas1.width, canvas1.height);
      }
    } else {
      state.scanning = false;
    }
  }
});

const scan_width = 1;

const render = () => {
  // draws on first image
  context1.clearRect(0, 0, canvas1.width, canvas1.height);
  context1.drawImage(
    image,
    state.imageX,
    state.imageY,
    state.width,
    state.height
  );

  scanner.style.left = state.scanX + "px";
  if (state.scanning) {
    state.scanX += scan_width;

    // keep contents of first image on second image
    context2.drawImage(
      canvas1,
      state.scanX, // source X start
      0, // source Y start
      scan_width, // source width
      canvas1.height, // source height
      state.scanX, // destination X start
      0, // destination Y start
      scan_width, // destination width
      canvas1.height
    ); // destination height
  }

  if (state.scanX >= canvas1.width) {
    state.scanning = false;
    state.done = true;
    context1.clearRect(0, 0, canvas1.width, canvas1.height);
  }

  requestAnimationFrame(render);
};

render();

document.getElementById('year').innerText = new Date().getFullYear();
