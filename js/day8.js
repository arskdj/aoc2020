const fs = require("fs");

const input = fs
    .readFileSync("../input/day8.input", "utf8")
    .trim()
    .split("\n")
    .map(line => line.split(" "))
    .map(ins => [ins[0], +ins[1]]);

console.log(part1(input));
console.log(part2());

function part1(input) {
    let acc = 0;
    let i = 0;
    let history = [].fill(false, 0, input.length - 1);

    while (i < input.length) {
        if (history[i]) return [acc, false];
        history[i] = true;
        [acc, i] = execute(input[i], acc, i);
    }

    return [acc, true];
}

function execute(instruction, acc, i) {
    const [op, n] = instruction;
    if (op === "acc") return [acc + n, i + 1];
    if (op === "jmp") return [acc, i + n];
    return [acc, i + 1];
}

function part2() {
    const flippables = input
        .map((_, i) => i)
        .filter(i => ["nop", "jmp"].includes(input[i][0]));

    for (i of flippables) {
        const test_input = [
            ...input.slice(0, i),
            flip(input[i]),
            ...input.slice(i + 1),
        ];

        const [acc, ok] = part1(test_input);
        if (ok) return acc;
    }
}

function flip(instruction) {
    let op;
    if (instruction[0] === "nop") op = "jmp";
    else if (instruction[0] === "jmp") op = "nop";
    return [op, instruction[1]];
}
