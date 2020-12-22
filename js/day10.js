const fs = require("fs");

const input = fs
    .readFileSync("../input/day10.test", "utf8")
    .trim()
    .split("\n")
    .map(x => +x)
    .sort((a, b) => a - b);

input.unshift(0);
input.push(input[input.length - 1] + 3);

function part1() {
    const [ones, , threes] = countDiffs(input);
    return ones * threes;
}

function countDiffs(input) {
    const diffs = [0, 0, 0];

    for (let i = 1; i < input.length; i++) {
        diffs[input[i] - input[i - 1] - 1]++;
    }

    return diffs;
}

//note: tribonacci
function part2() {
    const combinations = [2, 4, 7];
    let result = 1;

    let i = input.length;

    while (i > -1) {
        if (isContiguous(i - 5, i)) {
            result *= combinations[2];
            i -= 5;
        } else if (isContiguous(i - 4, i)) {
            result *= combinations[1];
            i -= 4;
        } else if (isContiguous(i - 3, i)) {
            result *= combinations[0];
            i -= 3;
        } else {
            i--;
        }
    }

    return result;
}

function isContiguous(start, end) {
    return countDiffs(input.slice(start, end))[0] === end - start - 1;
}

console.log(part1());
console.log(part2());
