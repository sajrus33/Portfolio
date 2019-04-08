"use strict";
class ProgresCircle {
    constructor(canvas, duration, progress, size, color, colorMid, font, alpha) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");

        this.progress = progress;
        this.duration = duration;
        let _time = this.duration;
        this.percent = this.progress / this.duration;

        this.loaded = 0;

        this.color = color;
        this.colorMid = colorMid;
        this.font = font;
        this.alpha = alpha;

        this.reSize = () => {
            console.log("Circle Progress Bar -> resized");
            this.canvas.height = this.canvas.clientHeight;
            this.canvas.width = this.canvas.clientWidth;
            this.x = this.canvas.width / 2;
            this.y = this.x;
            this.size = this.x * size;
            this.sizeMid = this.size - this.size * .66;
            this.border = this.x - this.size;
        };


        this.init = () => {
            this.reSize();
            this.ctx.lineWidth = this.size;
            this.ctx.alpha = this.alpha;
            this.ctx.textAlign = "center";
            this.ctx.fillStyle = "white";
            this.ctx.font = this.font;
        };


        this.update = () => {
            this.loaded += this.percent;
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.beginPath();
            this.ctx.strokeStyle = "white";
            this.ctx.lineWidth = this.sizeMid;

            this.ctx.arc(this.x, this.y, this.border, 0, Math.PI * 2);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.strokeStyle = this.color;
            this.ctx.lineWidth = this.size;

            this.ctx.arc(this.x, this.y, this.border, 4.72, Math.PI * 2 * this.loaded + 4.72);
            this.ctx.fillText(String(Math.round(this.loaded * 100)) + "%", this.x, this.y * 1.2);

            this.ctx.stroke();

        };
        this.run = () => {
            if (_time) {
                _time--;
                this.update();
                requestAnimationFrame(this.run);
            } else {
                _time = this.duration;
                this.loaded = 0;
            }
        };
    }

}



