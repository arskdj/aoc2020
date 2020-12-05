const fs = require("fs");

fs.readFile("../input/day3.input", "utf-8", (err, data) => {
    const input = data.trim().split("\n");

    console.log(part1(input, 3, 1));
});
debugger;

function part1(input, incX, incY) {
    let [x, y] = [0, 0];
    let trees = 0;
    let width = input[0].length;

    while (y < input.length) {
        let ch = input[y][x];
        if (ch === "#") {
            trees++;
        }

        x = (x + incX) % width;
        y = y + incY;
    }

    debugger;
    return trees;
}
