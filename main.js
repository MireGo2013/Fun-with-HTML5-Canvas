
const canvas = document.getElementById('draw');
const clearBtn = document.getElementById('clearCanvasBtn')
canvas.width = document.body.clientWidth / 1.2;
canvas.height = document.body.clientHeight / 1.2;
const ctx = canvas.getContext('2d');

let isDrawing = false;
let derection = true;
let hue = 0;

function draw(e) {
	if (!isDrawing) return;
	ctx.beginPath()
	ctx.moveTo(lastX, lastY)
	ctx.lineTo(e.offsetX, e.offsetY)
	ctx.stroke();
	[lastX, lastY] = [e.offsetX, e.offsetY];
	changHue()
	changSizeBrush()
}

function changHue() {
	ctx.strokeStyle = `hsl(${hue}, 100%, 50%)`;
	hue++;
	if (hue >= 360) {
		hue = 0;
	}
}

function changSizeBrush() {
	ctx.lineJoin = 'round';
	ctx.lineCap = 'round';
	if (ctx.lineWidth >= 100 || ctx.lineWidth <= 1) {
		derection = !derection
	}
	if (derection) {
		ctx.lineWidth++
	} else {
		ctx.lineWidth--
	}
}

function startDraw(e) {
	if (e.which !== 1) return;
	isDrawing = true;
	[lastX, lastY] = [e.offsetX, e.offsetY]
	canvas.addEventListener('mousemove', draw)
}

function stopDraw(e) {
	isDrawing = false;
}

canvas.addEventListener('mousedown', startDraw)
canvas.addEventListener('mouseup', stopDraw)
canvas.addEventListener('mouseover', startDraw)

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height)
}

clearBtn.addEventListener('click', clearCanvas)