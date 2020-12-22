const fs = require("fs");

const input = fs
    .readFileSync("../input/day12.input", "utf8")
    .trim()
    .split("\n")
    .map(x => {
        return { dir: x[0], value: +x.slice(1) };
    });

const dirs = ["E", "S", "W", "N"];

function part1() {
    let position = { x: 0, y: 0, dir: "E" };
    input.forEach(cmd => move(cmd, position));
    return Math.abs(position.x) + Math.abs(position.y);
}

function move(cmd, position) {
    const go = {
        N: () => (position.y -= cmd.value),
        S: () => (position.y += cmd.value),
        E: () => (position.x += cmd.value),
        W: () => (position.x -= cmd.value),
        R: () => (position.dir = rotate(cmd, position)),
        L: () => go.R(),
        F: () => go[position.dir](),
    };

    go[cmd.dir]();
    console.log(position);
}

function modulo(x, n) {
    return ((x % n) + n) % n;
}

function rotate(cmd, position) {
    let degrees = cmd.value / 90;
    if (cmd.dir === "L") degrees = -degrees;
    const index = modulo(
        dirs.findIndex(x => x === position.dir) + degrees,
        dirs.length
    );
    return dirs[index];
}

//console.log(input);
console.log(part1());
