/** @type{HTMLCanvasElement} */
const canvas = document.getElementById('fibb-canvas');
const ctx = canvas.getContext('2d');

//canvas fullscreen
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
window.addEventListener('resize', () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
});

let scale = 10;
let number = 0;

//Animate
animate();

function animate() {
	drawFlower();
	requestAnimationFrame(animate);
}

function drawFlower() {
	let angle = number * 2;
	let radius = scale * Math.sqrt(number);
	let size = 02;
	let posY = radius * Math.cos(angle) + canvas.height / 2;
	let posX = radius * Math.sin(angle) + canvas.width / 2;
	console.log(angle);
	ctx.beginPath();
	ctx.arc(posX, posY, size, 0, Math.PI * 2);
	ctx.fillStyle = 'red';
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 1;
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	number++;
}
