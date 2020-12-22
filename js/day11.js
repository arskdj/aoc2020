const fs = require("fs");

const input = fs
    .readFileSync("../input/day11.input", "utf8")
    .trim()
    .split("\n")
    .map(line => [...line]);

function getNeighbours(x, y, input) {
    const minY = Math.max(0, y - 1);
    const maxY = Math.min(y + 2, input.length);
    const minX = Math.max(0, x - 1);
    const maxX = Math.min(x + 2, input[0].length);
    return input.slice(minY, maxY).map(row => row.slice(minX, maxX));
}

function isFlippable(x, y, input) {
    const seat = input[y][x];
    if (seat === ".") return false;

    let count = getNeighbours(x, y, input)
        .flat()
        .filter(s => s === "#").length;

    if (seat === "#") return count > 4;
    if (seat === "L") return count === 0;
}

function flip(seat) {
    return seat === "#" ? "L" : "#";
}

function simulate(input, isFlippable) {
    let table = input.map(y => y.map(x => x));
    let result = { flipped: false, table };
    let cells = [];

    for (let y = 0; y < table.length; y++)
        for (let x = 0; x < table[0].length; x++)
            if (isFlippable(x, y, table)) {
                cells.push({ x, y });
            }

    result.flipped = cells.length > 0;

    for (c of cells) {
        table[c.y][c.x] = flip(table[c.y][c.x]);
    }

    return result;
}

function part1(isFlippable) {
    let round = simulate(input, isFlippable);
    while (round.flipped) {
        round = simulate(round.table, isFlippable);
    }

    return round.table.flat().filter(x => x === "#").length;
}

function isFlippable2(x, y, input) {
    const seat = input[y][x];
    if (seat === ".") return false;

    let count = Object.values(getNeighbours2(x, y, input)).reduce(
        (a, b) => a + b
    );

    if (seat === "#") return count >= 5;
    if (seat === "L") return count === 0;
}

function getNeighbours2(x, y, input) {
    return {
        L: scan(x, y, input, "left", "_"),
        R: scan(x, y, input, "right", "_"),
        U: scan(x, y, input, "_", "up"),
        D: scan(x, y, input, "_", "down"),
        LU: scan(x, y, input, "left", "up"),
        LD: scan(x, y, input, "left", "down"),
        RU: scan(x, y, input, "right", "up"),
        RD: scan(x, y, input, "right", "down"),
    };
}

function scan(x, y, input, dirX, dirY) {
    const cond = {
        left: () => x >= 0,
        up: () => y >= 0,
        right: () => x < input[0].length,
        down: () => y < input.length,
        _: () => true,
    };

    const go = {
        left: () => x--,
        up: () => y--,
        right: () => x++,
        down: () => y++,
        _: () => null,
    };

    go[dirX]();
    go[dirY]();

    while (cond[dirX]() && cond[dirY]()) {
        if (input[y][x] === "#") return 1;
        if (input[y][x] === "L") return 0;
        go[dirX]();
        go[dirY]();
    }
    return 0;
}

function part2() {
    return part1(isFlippable2);
}

console.log(part1(isFlippable));
console.log(part2());
