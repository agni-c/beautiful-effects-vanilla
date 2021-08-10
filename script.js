/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');

/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
const mouse = { x: undefined, y: undefined };
let hue = 0;

window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

canvas.addEventListener('click', e => {
	mouse.x = e.x;
	mouse.y = e.y;
	for (let i = 0; i < 10; i++) {
		particlesArray.push(new Particle());
	}
});
canvas.addEventListener('mousemove', e => {
	mouse.x = e.x;
	mouse.y = e.y;
	for (let i = 0; i < 1; i++) {
		particlesArray.push(new Particle());
	}
});

class Particle {
	constructor() {
		this.x = mouse.x;
		this.y = mouse.y;
		this.size = Math.random() * 10 + 1; // 1 -> 16
		this.speedX = Math.random() * 3 - 1.5; // +1.5 -> -1.5
		this.speedY = Math.random() * 3 - 1.5; // +1.5 -> -1.5
		this.color = `hsl(${hue},100%,50%)`;
	}
	update() {
		this.x += this.speedX;
		this.y += this.speedY;
		if (this.size > 0.2) this.size -= 0.1;
	}
	draw() {
		ctx.fillStyle = this.color;
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

function handleParticles() {
	for (let i = 0; i < particlesArray.length; i++) {
		particlesArray[i].update();
		particlesArray[i].draw();

		for (let j = i; j < particlesArray.length; j++) {
			//getting distance between two particles on two plains
			const dx = particlesArray[i].x - particlesArray[j].x;
			const dy = particlesArray[i].y - particlesArray[j].y;
			//finding out the 2d distance with pithagoras theorem
			//sqrt of pow(x)+pow(y)
			const dist = Math.sqrt(dx * dx + dy * dy); //it's the first time I loved math so much ❤

			if (dist < 100) {
				ctx.beginPath();
				ctx.strokeStyle = particlesArray[i].color;
				ctx.lineWidth = 0.2;
				ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
				ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
				ctx.stroke();
				ctx.closePath();
			}
		}

		//delete particles when too small
		if (particlesArray[i].size <= 0.3) {
			particlesArray.splice(i, 1);
			i--;
		}
	}
}
function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	// ctx.fillStyle = `black`;
	// ctx.fillRect(0, 0, canvas.width, canvas.height);
	handleParticles();
	hue += 0.5;
	requestAnimationFrame(animate);
}
animate();
