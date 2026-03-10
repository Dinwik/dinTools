function random(x, y, seed, scale) {
    
    let r = x * 374761393 + y * 668265263 + seed * 2147483647;

    r = (r ^ (r >>> 13)) * 1274126177;
    r = (r ^ (r >>> 16));
    r = (r >>> 0) / 4294967295;

    return r * scale;
}

function fade(x) {
    return 6*x*x*x*x*x - 15*x*x*x*x + 10*x*x*x;
}

function lerp(a, b, t) {
    return a + t*(b - a);
}

function noise(x, y, seed, scale, resolution) {
    x /= resolution;
    y /= resolution;

    let cellX = Math.floor(x);
    let cellY = Math.floor(y);
    x = x - cellX;
    y = y - cellY;

    let r;
    r = random(cellX, cellY, seed, 6.28);
    let g00x = Math.cos(r);
    let g00y = Math.sin(r);

    r = random(cellX + 1, cellY, seed, 6.28);
    let g01x = Math.cos(r);
    let g01y = Math.sin(r);

    r = random(cellX, cellY + 1, seed, 6.28);
    let g10x = Math.cos(r);
    let g10y = Math.sin(r);

    r = random(cellX + 1, cellY + 1, seed, 6.28);
    let g11x = Math.cos(r);
    let g11y = Math.sin(r);

    let n00 = g00x*x +       g00y*y;
    let n01 = g01x*(x - 1) + g01y*y;
    let n10 = g10x*x +       g10y*(y - 1);
    let n11 = g11x*(x - 1) + g11y*(y - 1);

    let u = fade(x);
    let v = fade(y);

    let nx0 = lerp(n00, n01, u);
    let nx1 = lerp(n10, n11, u);

    let result = lerp(nx0, nx1, v);

    result *= scale*Math.SQRT2;

    return result;
}