let blocks;
let connections;
let data = "";

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

function addBlockData(toadd, comma=true) {
    if (toadd == 0) {
        if (comma) {
            data += ",";
        }
    } else {
        data += toadd;
        if (comma) {
            data += ",";
        }
    }
}

function compileData() {
    if (blocks.length > 0) {
        for (const block of blocks) {
            addBlockData(block.type);
            addBlockData(block.state);
            addBlockData(block.x);
            addBlockData(block.y);
            addBlockData(block.z);
            addBlockData(block.type, false);
            data += ";";
        }
    data = data.slice(0, -1);
    }
    data += "?";
    if (connections.length > 0) {
        for (const connection of connections) {
            data += `${connection.start},${connection.end};`;
        }
    data = data.slice(0, -1);
    }
    data += "??";
    return data;
}

function copy(data) {
    navigator.clipboard.writeText(data);

}
