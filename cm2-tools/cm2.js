let blocks;
let connections;

function setup() {
    blocks = [];
    connections = [];
}

function addBlock(type, state, posX, posY, posZ, data = "") {
    blocks.push({
        type: String(type),
        state: String(state),
        x: String(posX),
        y: String(posY),
        z: String(posZ),
        data: String(data)
    });
}

function connect(start, end) {
    connections.push({
        start: String(start),
        end: String(end)
    });
}

function compileData() {
    let data = "";
    if (blocks.length > 0) {
    for (let i = 0; i < blocks.length; i++) {
            data += blocks[i].type + ",";
            data += blocks[i].state + ",";
            data += blocks[i].x + ",";
            data += blocks[i].y + ",";
            data += blocks[i].z + ",";
            data += blocks[i].data;
            data += ";";
        }
    data = data.slice(0, -1);
    }
    data += "?";
    if (connections.length > 0) {
        for (let i = 0; i < connections.length; i++) {
            data += connections[i].start + ",";
            data += connections[i].end;
            data += ";";
        }
    data = data.slice(0, -1);
    }
    data += "??";
    return data;
}

function copy(data) {
    navigator.clipboard.writeText(data);
}