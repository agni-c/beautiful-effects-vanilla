/** @type {HTMLCanvasElement} */
const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const particlesArray = [];
class Particle {
	constructor() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.size = Math.random() * 5 + 1; // 1 -> 6
		this.weight = 2;
	}
	update() {
		this.weight *= 0.3;
		this.y += this.weight;
	}
	draw() {
		ctx.fillStyle = 'pink';
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
		ctx.fill();
	}
}

function animate() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	handleParticles();
	requestAnimationFrame(animate);
}
window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});
