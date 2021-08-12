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
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawSin();
	drawCos();
	drawSinCos();
	requestAnimationFrame(animate);
}

function drawSin() {
	let angle = number * 0.01; //slow
	// let angle = number * 0.1;
	let radius = scale * Math.sqrt(number);
	let size = 15;
	let posY = 500 * Math.cos(angle) + canvas.height / 2;
	let posX = canvas.width / 2;
	// let posX = canvas.width / 2 + number;

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

function drawCos() {
	let angle = number * 0.01; //slow

	// let angle = number * 0.09;
	let radius = scale * Math.sqrt(number);
	let size = 15;
	// let posY = canvas.height / 5 + number;
	let posY = canvas.height / 2;
	let posX = 500 * Math.sin(angle) + canvas.width / 2;

	ctx.beginPath();
	ctx.arc(posX, posY, size, 0, Math.PI * 2);
	ctx.fillStyle = 'blue';
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 1;
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	number++;
}
function drawSinCos() {
	let angle = number * 0.01; //slow

	// let angle = number * 0.09;
	let radius = scale * Math.sqrt(number);
	let size = 15;
	let posY = 500 * Math.cos(angle) + canvas.height / 2;
	let posX = 500 * Math.sin(angle) + canvas.width / 2;

	ctx.beginPath();
	ctx.arc(posX, posY, size, 0, Math.PI * 2);
	ctx.fillStyle = 'green';
	ctx.strokeStyle = 'white';
	ctx.lineWidth = 1;
	ctx.closePath();
	ctx.fill();
	ctx.stroke();

	number++;
}
