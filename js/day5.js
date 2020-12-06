const fs = require("fs");

fs.readFile("../input/day5.input", "utf8", (_, data) => {
    const input = data.trim().split("\n");
    console.log(part1(input));
    console.log(part2(input));
    //console.log(getSeatID("FBFBBFFRLR"));
});

function part1(input) {
    return Math.max(...input.map(getSeatID));
}

function getSeatID(code) {
    const initialRange = {
        minRow: 0,
        maxRow: 127,
        minCol: 0,
        maxCol: 7,
    };

    const reduced = [...code].reduce((id, dir) => {
        if (dir === "F")
            return { ...id, maxRow: id.maxRow - half(id.minRow, id.maxRow) };
        if (dir === "B")
            return { ...id, minRow: id.minRow + half(id.minRow, id.maxRow) };
        if (dir === "L")
            return { ...id, maxCol: id.maxCol - half(id.minCol, id.maxCol) };
        if (dir === "R")
            return { ...id, minCol: id.minCol + half(id.minCol, id.maxCol) };
    }, initialRange);

    return reduced.minRow * 8 + reduced.minCol;
}

function half(min, max) {
    return (max - min + 1) / 2;
}

function part2(input) {
    return (
        input
            .map(getSeatID)
            .sort((a, b) => a - b)
            .find((id, index, input) => id !== input[0] + index) - 1
    ); //min seatID = input[0] = 27
}
