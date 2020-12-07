const fs = require("fs");

const input = fs
    .readFileSync("../input/day7.input", "utf8")
    .trim()
    .split("\n")
    .reduce((map, row) => {
        [key, value] = parseRow(row);
        map[key] = value;
        return map;
    }, {});

console.log(part1());
console.log(part2());

function parseRow(row) {
    const regex = /(\d+ )?([a-z]+ [a-z]+) bag/g;
    const matches = [...row.matchAll(regex)];
    const [, , key] = matches.shift();

    bagDict = matches.reduce((bags, [, n, bag]) => {
        bags[bag] = isNaN(+n) ? 0 : +n;
        return bags;
    }, {});

    return [key, bagDict];
}

function part1() {
    return Object.keys(input).filter(b => contains(b, "shiny gold")).length;
}

function contains(bagKey, x) {
    bag = input[bagKey];
    if (bag.hasOwnProperty(x)) return true;
    if (bag.hasOwnProperty("no other")) return false;
    return Object.keys(bag).some(bag => contains(bag, x));
}

function part2() {
    return countBagsIn("shiny gold");
}

function countBagsIn(bagKey) {
    const bags = input[bagKey];
    if (bags.hasOwnProperty("no other")) return 0;
    return Object.entries(bags).reduce(
        (sum, [bag, n]) => sum + n * (1 + countBagsIn(bag)),
        0
    );
}
