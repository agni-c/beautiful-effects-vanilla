/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const titleEle = document.getElementById('title');
let titleMeasurement = titleEle.getBoundingClientRect();
console.log(titleMeasurement);
let title = {
	x: titleMeasurement.x,
	y: titleMeasurement.y,
	width: titleMeasurement.width,
	height: 10,
};

const particlesArray = [];
class Particle {
	constructor(x, y) {
		this.x = x;
		this.y = y;
		this.size = Math.random() * 15 + 1;
		this.weight = Math.random() * 5 + 1;
		this.windX = 2.5;
	}
	update() {
		if (this.y > canvas.height) {
			this.y = 0 - this.size;
			this.weight = Math.random() * 5 + 1;
			this.x = Math.random() * canvas.width * 1.4;
		}
		this.weight += 0.06;
		this.y += this.weight;
		this.x -= this.windX;
		// collision detection
		if (
			this.x < title.x + title.width &&
			this.x + this.size > title.x &&
			this.y < title.y + title.height &&
			this.y + this.size > title.y
		) {
			this.y -= 3;
			this.weight *= -0.3;
		}
	}
	draw() {
		ctx.fillStyle = 'red';
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.closePath();
		ctx.fill();
	}
}

function initParticleRain() {
	for (let i = 0; i < 1000; i++) {
		const x = Math.random() * canvas.width;
		const y = Math.random() * canvas.height;
		particlesArray.push(new Particle(x, y));
	}
}

function animate() {
	// ctx.clearRect(0, 0, canvas.width, canvas.height);
	ctx.fillStyle = `rgba(255,255,255,0.03)`;
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	particlesArray.forEach(particle => {
		particle.update();
		particle.draw();
	});

	requestAnimationFrame(animate);
}
window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	titleMeasurement = titleEle.getBoundingClientRect();
	console.log(titleMeasurement);
	title = {
		x: titleMeasurement.x,
		y: titleMeasurement.y,
		width: titleMeasurement.width,
		height: 10,
	};
	init();
});

initParticleRain();
animate();
