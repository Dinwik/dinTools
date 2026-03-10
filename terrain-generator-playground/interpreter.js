var c = document.getElementById("output");
var ctx = c.getContext("2d");
var height = c.height;
var width = c.width;

function tokenize(line) {

    let tokens = [""];

    for (let i = 0; i < line.length; i++) {

        switch(line[i]) {

            case " ":
                tokens.push("");
                break;
            
            case "#":
                i = line.length;
                break;

            default:
                tokens[tokens.length - 1] += line[i];
        }
    }

    tokens = tokens.filter(token => token !== " " && token !== "");

    return tokens;
}

function interpret(x, y) {

    const code = document.getElementById("code");
    const list = code.value.split("\n");
    
    let vars = {};

    for (let i = 0; i < list.length; i++) {

        let tokens = tokenize(list[i]);
        
        if (tokens[0] == "return")
            if (vars[tokens[1]] === undefined)
                return 0;
            else
                return vars[tokens[1]];

        else if (tokens[0] == "var")
            vars[tokens[1]] = 0;

        else if (tokens[0] == "noise")
            vars[tokens[1]] = noise(x, y, 0, tokens[3], tokens[4]);

        else if (tokens[0] == "math") {

            let a = isNaN(tokens[3]) ? vars[tokens[3]] : Number(tokens[3]);
            let b = isNaN(tokens[5]) ? vars[tokens[5]] : Number(tokens[5]);

            if (tokens[4] == "+") vars[tokens[1]] = a + b;
            if (tokens[4] == "-") vars[tokens[1]] = a - b;
        }

    }

    return 0;
}

function generate() {

    for (let x = 0; x < width; x += 2) {
        for (let y = 0; y < height; y += 2) {

            let value = interpret(x, y);
            if (value < -1)
                value = -1;
            if (value > 1)
                value = 1;
            value += 1;
            value *= 128;

            ctx.fillStyle = `rgb(${value}, ${value}, ${value})`;
            ctx.fillRect(x, y, 2, 2);
        }
    }
}