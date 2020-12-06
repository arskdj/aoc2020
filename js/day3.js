const fs = require("fs");

fs.readFile("../input/day3.input", "utf-8", (_, data) => {
    const input = data.trim().split("\n");

    console.log(part1(input, 3, 1));
    console.log(part2(input));
});

function part1(input, incX, incY) {
    return input
        .filter((_, i) => i % incY === 0)
        .filter((row, y) => {
            const x = (incX * y) % row.length;
            return row[x] === "#";
        }).length;
}

function part2(input) {
    const slopes = [
        [1, 1],
        [3, 1],
        [5, 1],
        [7, 1],
        [1, 2],
    ];

    return slopes.reduce(
        (result, [incX, incY]) => result * part1(input, incX, incY),
        1
    );
}
