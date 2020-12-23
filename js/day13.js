const fs = require("fs");

const input = fs
    .readFileSync("../input/day13.input", "utf8")
    .trim()
    .split("\n");

function part1() {
    const ref = +input[0];
    const buses = input[1]
        .split(",")
        .map(x => +x)
        .filter(x => !isNaN(x));

    let timetable = {};

    for (b of buses) {
        timetable[b] = (Math.floor(ref / b) + 1) * b;
    }

    const [id, timestamp] = Object.entries(timetable).sort(
        (e1, e2) => e1[1] - e2[1]
    )[0];

    return (timestamp - ref) * +id;
}

console.log(part1());
