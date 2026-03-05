var c = document.getElementById("output");
var ctx = c.getContext("2d");
var height = c.height;
var width = c.width;

function generate() {

    ctx.fillStyle = "#ffffff";
    for (let x = 0; x < width; x++) {
        for (let y = 0; y < height; y++) {
            ctx.fillRect(x, y, 1, 1);
        }
    }
}