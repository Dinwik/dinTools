let result = "";
let id = [];
let state = [];
let x = [];
let y = [];
let z = [];
let special = [];
let cstart = [];
let cend = [];

function textGenerate() {
	reset();
	const input = document.getElementById("textInput");
	const output = document.getElementById("Output");
	const textSpacing = document.getElementById("textSpacing");
	const spacing = textSpacing.value;
	const text = input.value;
	for (let i = 0; i < text.length; i++) {
		block(13, 0, i * spacing, 0, 0, text.charCodeAt(i));
	}
	end();
	output.textContent = result;
}

function reset() {
	result = "";
	id = [];
	state = []
	x = [];
	y = [];
	z = [];
	special = [];
	cstart = [];
	cend = [];
	}

function block(blockId, blockState, blockX, blockY, blockZ, blockSpecial) {
	id.push(blockId);
	state.push(blockState);
	x.push(blockX);
	y.push(blockY);
	z.push(blockZ);
	special.push(blockSpecial);
}

function end() {
	for (let i = 0; i < id.length; i++) {
		result = result + id[i] + ',';
		result = result + state[i] + ',';
		result = result + x[i] + ',';
		result = result + y[i] + ',';
		result = result + z[i] + ',';
		if (special[i] != '-') {
			result = result + special[i];
		}
		result = result + ';';
	}
	result = result.slice(0, -1);
	result = result + '?'
	for (let i = 0; i < cstart.length; i++) {
		result = result + cstart[i] + ',';
		result = result + cend[i] + ';';
	}
	result = result.slice(0, -1);
	result = result + '?'
	result = result + '?'
}

function clipboard() {
	navigator.clipboard.writeText(result);
}

function sphereGenerate() {
	reset();
	const input = document.getElementById("sphereRadius");
	const output = document.getElementById("Output");
	const radius = input.value;
	for (let x = 0; x <= radius; x++) {
		for (let y = 0; y <= radius; y++) {
			for (let z = 0; z <= radius; z++) {
				if (Math.floor(Math.sqrt(x*x + y*y + z*z)) == radius) {
					block(14, 0, x, y, z, '-');
					block(14, 0, -x, y, z, '-');
					block(14, 0, x, -y, z, '-');
					block(14, 0, -x, -y, z, '-');
					block(14, 0, x, y, -z, '-');
					block(14, 0, -x, y, -z, '-');
					block(14, 0, x, -y, -z, '-');
					block(14, 0, -x, -y, -z, '-');
				}
			}
		}
	}
	end();
	output.textContent = result;
}

function connect(start, end) {
	cstart.push(start);
	cend.push(end);
}

function adder(bits) {
	reset();
	for (let i = 0; i < bits; i++) {
		block(5, 0, 0, i, 0, '-');
		block(5, 0, 2, i, 0, '-');
		block(3, 0, 0, i, 2, '-');
		block(3, 0, 2, i, 2, '-');
		block(3, 0, 0, i, 3, '-');
		block(1, 0, 2, i, 3, '-');
		block(3, 0, 0, i, 4, '-');
		block(1, 0, 2, i, 4, '-');
		block(2, 0, 1, i, 2, '-');
		block(1, 0, 1, i, 3, '-');
		block(6, 0, 1, i, 4, '-');
		connect(11*i+1, 11*i+3);
		connect(11*i+2, 11*i+4);
		connect(11*i+3, 11*i+5);
		connect(11*i+4, 11*i+6);
		connect(11*i+3, 11*i+6);
		connect(11*i+4, 11*i+5);
		connect(11*i+5, 11*i+7);
		connect(11*i+5, 11*i+8);
		connect(11*i+6, 11*i+9);
		connect(11*i+8, 11*i+9);
		connect(11*i+7, 11*i+11);
		if (i < bits-1) {
			connect(11*i+9, 11*i+21);
		}
		connect(11*i+10, 11*i+7);
		connect(11*i+10, 11*i+8);
	}
	block(5, 0, 4, 0, 0, '-');
	block(6, 0, 1, bits, 4, '-');
	connect(11*bits-1, 11*bits+2);
	connect(11*bits+1, 10);
}

function circuitGenerate() {
	reset();
	const input = document.getElementById("circuitType");
	const output = document.getElementById("Output");
	const type = input.value;
	if (type == "adder4bit") {
		adder(4);
	}
	if (type == "adder8bit") {
		adder(8);
	}
	if (type == "adder16bit") {
		adder(16);
	}
	end();
	output.textContent = result;
}