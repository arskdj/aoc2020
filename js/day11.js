const fs = require("fs");

const input = fs
    .readFileSync("../input/day11.input", "utf8")
    .trim()
    .split("\n")
    .map(line => [...line]);

function part1() {
    let round = simulate(input);
    while (round.flipped) {
        round = simulate(round.table);
    }

    return round.table.flat().filter(x => x === "#").length;
}

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
    if (seat === "#") return "L";
    return "#";
}

function simulate(input) {
    let result = { flipped: false };

    result.table = input.map((row, y) =>
        row.map((seat, x) => {
            if (isFlippable(x, y, input)) {
                seat = flip(seat);
                result.flipped = true;
            }
            return seat;
        })
    );
    return result;
}

console.log(part1());
