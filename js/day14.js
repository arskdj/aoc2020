const fs = require("fs");

const input = fs
    .readFileSync("../input/day14.input", "utf8")
    .trim()
    .split("\n");

function part1(setMem) {
    let mask = {};
    let mem = {};
    const set = {
        mas: line => {
            mask.str = parseMask(line);
        },
        mem: setMem,
    };
    input.forEach(line => set[line.slice(0, 3)](line, mask, mem));
    return Object.values(mem).reduce((sum, x) => sum + BigInt(x), 0n);
}

function parseMask(line) {
    return line.match(/mask = ([X01]{36})/)[1];
}

function parseMem(line) {
    return line.match(/mem\[(\d+)\] = (\d+)/);
}

function applyMask(value, mask) {
    mask[0] = mask.str.replace(/X/g, "1");
    mask[0] = BigInt("0b" + mask[0]);

    mask[1] = mask.str.replace(/X/g, "0");
    mask[1] = BigInt("0b" + mask[1]);

    return (BigInt(value) & mask[0]) | mask[1];
}

function setMem(line, mask, mem) {
    const [, address, value] = parseMem(line);
    mem[address] = applyMask(value, mask);
}

function setMem2(line, mask, mem) {
    const [, address10, value] = parseMem(line);
    const address2 = (+address10).toString(2).padStart(mask.str.length, "0");
    const result = applyMask2(address2, mask);
    const addresses = getAddresses(result);

    addresses.forEach(a => (mem[a] = value));
}

function applyMask2(address2, mask) {
    return [...mask.str].map((m, i) => (m === "0" ? address2[i] : m)).join("");
}

function getPermutations(floatingBits) {
    let permutations = [];
    for (i = 0; i < 2 ** floatingBits; i++)
        permutations.push(i.toString(2).padStart(floatingBits, "0"));
    return permutations;
}

function getAddresses(bin_str) {
    const floatingBits = [...bin_str].filter(x => x === "X").length;
    const permutations = getPermutations(floatingBits);

    let addresses = [];

    permutations.forEach(p => {
        let address = bin_str;
        [...p].forEach(digit => (address = address.replace("X", digit)));
        addresses.push(BigInt("0b" + address));
    });

    return addresses;
}

console.table(part1(setMem));
console.table(part1(setMem2));
