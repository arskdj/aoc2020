const fs = require("fs");

const input = fs
    .readFileSync("../input/day8.input", "utf8")
    .trim()
    .split("\n")
    .map(line => line.split(" "))
    .map(ins => [ins[0], +ins[1]]);

console.log(part1());
console.log(part2());

function part1() {
    let acc = 0;
    let i = 0;
    let history = [].fill(false, 0, input.length - 1);

    while (i < input.length && !history[i]) {
        history[i] = true;
        [acc, i] = execute(input[i], acc, i);
    }

    return [acc, history[i - 1]];
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

    flip(flippables[0]);
    for (let i = 1; i < flippables.length; i++) {
        flip(flippables[i]);
        flip(flippables[i - 1]);

        const [acc, ok] = part1();
        if (ok) return acc;
    }
}

function flip(i) {
    const ins = input[i];
    if (ins[0] === "nop") ins[0] = "jmp";
    else if (ins[0] === "jmp") ins[0] = "nop";
}
