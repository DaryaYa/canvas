'use strict';
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var radius = canvas.height / 2;

ctx.translate(radius, radius);
radius = radius * 0.9;
// Запускаем анимацию.
function animate() {
    requestAnimationFrame(animate);
    drawClock();
}
requestAnimationFrame(animate);

//setInterval(drawClock, 1000);

function drawClock() {
    drawFace(ctx, radius);
    drawNumbers(ctx, radius);
    drawCircle(ctx, radius);
    drawTime(ctx, radius);

}

function drawFace(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI);
    ctx.fillStyle = 'yellow';
    ctx.strokeStyle = 'black';
    ctx.fill();

}

function drawCircle(ctx, radius) {
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.07, 0, 2 * Math.PI);
    ctx.fillStyle = '#333';
    ctx.fill();
}

function drawNumbers(ctx, radius) {
    ctx.font = radius * 0.2 + "px arial";
    ctx.textBaseline = 'middle';
    ctx.textAlign = 'center';

    var ang, i;
    for (i = 1; i <= 12; i++) {
        ang = i * Math.PI / 6;
        ctx.rotate(ang);
        ctx.translate(0, -radius * 0.8);
        ctx.rotate(-ang);

        ctx.beginPath();
        ctx.fillStyle = 'lime';
        ctx.arc(0, 0, radius * 0.15, 0, 2 * Math.PI);
        ctx.closePath();
        ctx.fill();

        ctx.lineWidth = radius * 0.01;
        ctx.strokeText(i.toString(), 0, 0);
        ctx.stroke();
        ctx.rotate(ang);
        ctx.translate(0, radius * 0.8);
        ctx.rotate(-ang);
    }
}

function drawTime(ctx, radius) {

    var time = new Date();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var second = time.getSeconds();

    hour = hour % 12;
    hour = (hour * Math.PI / 6) + (minute * Math.PI / (6 * 60)) + (second * Math.PI / (360 * 60));
    drawHand(ctx, hour, radius / 2, radius * 0.07);

    minute = (minute * Math.PI / 30) + (second * Math.PI / (30 * 60));
    drawHand(ctx, minute, radius * 0.8, radius * 0.05);

    second = (second * Math.PI / 30);
    drawHand(ctx, second, radius * 0.9, radius * 0.02);
    //--- часы с циырами ---
    ctx.translate(0, -radius);
    ctx.fillStyle = 'darkgreen';
    ctx.fill();
    ctx.font = radius * 0.15 + 'px arial';
    ctx.fillText(time.toTimeString().substr(0, 8), 0, radius / 1.5);
    ctx.translate(0, radius);
}

function drawHand(ctx, pos, length, width) {
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.rotate(pos);
    ctx.lineTo(0, -length);
    ctx.strokeStyle = '#333';
    ctx.stroke();
    ctx.rotate(-pos);


}