let result = "";
let id = [];
let state = [];
let x = [];
let y = [];
let z = [];
let special = [];

function textGenerate() {
	reset();
	const input = document.getElementById("textInput");
	const output = document.getElementById("Output");
	const text = input.value;
	for (let i = 0; i < text.length; i++) {
		block(13, 0, i, 0, 0, text.charCodeAt(i));
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
	result = result + '???'
}

function clipboard() {
	navigator.clipboard.writeText(result);
}