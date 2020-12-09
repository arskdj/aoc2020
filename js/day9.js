const fs = require("fs");

const input = fs
    .readFileSync("../input/day9.input", "utf8")
    .trim()
    .split("\n")
    .map(x => +x);

const preamble = 25;
const x = part1(preamble);
console.log(x);
console.log(part2(x));

function part1(preamble) {
    for (let i = preamble; i < input.length; i++)
        if (!isValid(input[i], i - preamble, i)) return input[i];
}

function isValid(x, start, end) {
    for (let i = start; i < end; i++)
        for (let j = i; j < end; j++)
            if (input[i] + input[j] === x) return true;
    return false;
}

function part2(num) {
    const [a, b] = findContSpace(num);
    const space = input.slice(a, b);
    return Math.min(...space) + Math.max(...space);
}

function findContSpace(x) {
    let a = 0;
    let b = 1;
    let sum = input[a];

    while (a < input.length && sum !== x) {
        if (sum < x) sum += input[b++];
        else sum -= input[a++];
    }

    return [a, b];
}
