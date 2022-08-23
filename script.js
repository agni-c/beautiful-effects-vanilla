/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const adjustX = window.innerWidth / 8;
const adjustY = window.innerHeight / 4;

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
    // console.log(mouse.x, mouse.y);
});

ctx.fillStyle = 'white';
ctx.font = '30px Verdana';
ctx.fillText('AGNIBHA', 0, 30); // change your name here
const textCoordinates = ctx.getImageData(0, 0, 200, 300);

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

        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;

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
    //scan matrix based on text coordinate width and height
    for (let y = 0, y2 = textCoordinates.height; y < y2; y++) {
        for (let x = 0, x2 = textCoordinates.height; x < x2; x++) {
            let imageOpacityCoordinates = y * 4 * textCoordinates.width + x * 4 + 3;
            if (textCoordinates.data[imageOpacityCoordinates] > 128) {
                let positionX = x * 10 + adjustX;
                let positionY = y * 10 + adjustY;
                particlesArray.push(new Particle(positionX, positionY));
            }
        }
    }
    animate();
}

function connect() {
    for (let a = 0; a < particlesArray.length; a++) {
        for (let b = a; b < particlesArray.length; b++) {
            let dx = particlesArray[a].x - particlesArray[b].x;
            let dy = particlesArray[a].y - particlesArray[b].y;
            let distance = Math.sqrt(dx * dx + dy * dy);
            // console.log(particlesArray[a].x);

            if (distance < 20) {
                ctx.strokeStyle = 'white';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                ctx.stroke();
            }
        }
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].draw();
        particlesArray[i].update();
    }
    connect();
    requestAnimationFrame(animate);
}
init();

console.log({ textCoordinates });

// TODO : dynamically change line colors
// TODO : dynamically change particle color inside the mouse radius