const fs = require("fs");

fs.readFile("../input/day5.input", "utf8", (_, data) => {
    const input = data.trim().split("\n");
    console.log(part1(input));
    console.log(part2(input));
    //console.log(getSeatID("FBFBBFFRLR"));
    // 963 592
});

function part1(input) {
    return Math.max(...input.map(getSeatID));
}

function getSeatID(code) {
    return [...code].reduce(
        (id, dir) => (id << 1) | (dir === "B" || dir === "R"),
        0
    );
}

function part2(input) {
    return (
        input
            .map(getSeatID)
            .sort((a, b) => a - b)
            .find((id, index, input) => id !== input[0] + index) - 1
    ); //min seatID = input[0] = 27
}
