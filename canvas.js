// This script is a proof of concept for drawing a rect on a canvas, and then 
// recording the coordinates of the rect in a database. The script is
// intended to be used with the "canvas" element in HTML5.

// The rect should be drawn by a user, and activates on click.

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// The canvas is drawn on the page
canvas.width = 700;
canvas.height = 700;

// Provide a ipsum image to the canvas backround
const img = new Image();
img.crossOrigin = "anonymous";
img.src = '33a0c8_2a20866012684002852095b34c4223f6.png';
img.onload = function() {
    ctx.drawImage(img, 0, 0);
};

// The canvas is drawn on the page
ctx.fillRect(0, 0, canvas.width, canvas.height);

// On click, allow the user to draw a rect
canvas.addEventListener('click', function(e) {
    // The coordinates of the click are recorded
    const x = e.clientX;
    const y = e.clientY;

    // The rect is drawn on the canvas, with a red stroke and faint white fill
    ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
    ctx.fillRect(x, y, 100, 100);
    ctx.strokeStyle = 'red';
    ctx.strokeRect(x, y, 100, 100);
});

// After mouseup, the coordinates of the rect are recorded
canvas.addEventListener('mouseup', function(e) {
    // The coordinates of the rect are recorded
    const x = e.clientX;
    const y = e.clientY;
    const width = 100;
    const height = 100;
    
    // Each rect needs its own ID 
    const id = Math.floor(Math.random() * 100000000);

    // Then the coordinates are sent to the server
    const data = {
        id: id,
        x: x,
        y: y,
        width: width,
        height: height
    };

    // Once the data is prepared, we also need Javascript to clip the image contained within
    // the rect, and send it to the server. The clipped image must be associated with the ID
    // of the rect. The image is sent to the server as a base64 string.

    const imgData = ctx.getImageData(x, y, width, height);

    // now, create a second canvas to hold the image data
    const canvas2 = document.createElement('canvas');
    const ctx2 = canvas2.getContext('2d');
    canvas2.width = width;
    canvas2.height = height;
    ctx2.putImageData(imgData, 0, 0);

    const base64 = canvas2.toDataURL("image/png");


    console.log("=====================================")
    console.log("clipped image", imgData);
    console.log("base64", base64)
    console.log("data", data);

});

