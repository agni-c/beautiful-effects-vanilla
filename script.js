/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particlesArray = [];

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

// handle mouse
const mouse = {
    x: null,
    y: null,
    radius: 250
};

window.addEventListener('mousemove', e => {
    mouse.x = e.x;
    mouse.y = e.y;
    console.log(mouse.x, mouse.y);
});

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText('AGNIBHA', 0, 30);
const textCoordinates = ctx.getImageData(0, 0, 200, 100);

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 3; // 1 -> 6
        this.baseX = this.x;
        this.baseY = this.y;
        this.density = Math.random() * 40 + 1; // 1-30
    }
    update() {
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;

        let distance = Math.sqrt(dx * dx + dy * dy);

        // when we combine  2 we get tangent (tan)
        // if they divide and cancel out we get 1 (tan45) if it is in that position
        let forceDirectionX = dx / distance; // lombo by oti (sin angle) |_
        let forceDirectionY = dy / distance; //lombo by oti (sine angle) |_

        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance; // the smaller the distance ,slower the obj
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;
        if (distance < maxDistance) {
            // this.size = 20;
            this.x -= directionX;
            this.y -= directionY;
        } else {
            if (this.x !== this.baseX) {
                let dx = this.x - this.baseX; // displacement of the x axis
                let dy = this.y - this.baseY; // displacement of the x axis
                this.x -= dx / 10; // getting them close by 1/10 of the speed in x axis
                this.y -= dy / 10; // getting them close by 1/10 of the speed in y axis
            }
        }
    }
    draw() {
        ctx.fillStyle = 'white';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
    }
}

function init() {
    particlesArray = [];
    for (let i = 0; i < 1000; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
    }
    animate();
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
    }

    requestAnimationFrame(animate);
}
init();

console.log({ particlesArray });