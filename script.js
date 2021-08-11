const liquidBtn = document.querySelector('.liquid');
const distortBtn = document.querySelector('.distort');
const haywareBtn = document.querySelector('.hayware');
const turbulence = document.querySelector('feTurbulence');
let verticalFrequency = 0.01;
let horizontalFrequency = 0.1;
const steps = 60;
const interval = 10;
turbulence.setAttribute(
	'baseFrequency',
	`${verticalFrequency} ${horizontalFrequency}`
);

liquidBtn.addEventListener('mouseover', e => {
	console.log('hello');
	verticalFrequency = 0.1;
	horizontalFrequency = 0.1;
	animatePerlNoise(
		verticalFrequency,
		horizontalFrequency,
		0.002,
		0.002,
		steps,
		interval
	);
});

distortBtn.addEventListener('mouseover', e => {
	animatePerlNoise(
		verticalFrequency,
		horizontalFrequency,
		0.0,
		0.015,
		steps,
		interval
	);
});

haywareBtn.addEventListener('mouseover', e => {
	animatePerlNoise(
		verticalFrequency,
		horizontalFrequency,
		0.3,
		0.0,
		steps,
		interval
	);
});

/**
 *
 * @param {number} vfq  Base vertical Frequency
 * @param {number} hfq  Base horizontal Frequency
 * @param {number} vfqInc vertical feq increase
 * @param {number} hfqInc horizontal feq increase
 * @param {number} steps animation steps
 * @param {number} interval time interval in milliseconds
 */
function animatePerlNoise(vfq, hfq, vfqInc, hfqInc, steps, interval) {
	for (i = 0; i < steps; i++) {
		setTimeout(() => {
			vfq += vfqInc;
			hfq += hfqInc;
			turbulence.setAttribute('baseFrequency', `${vfq} ${hfq}`);
		}, i * interval);
	}
	setTimeout(() => {
		vfq = 0;
		hfq = 0;
		turbulence.setAttribute('baseFrequency', `${vfq} ${hfq}`);
	}, steps * interval);
}
