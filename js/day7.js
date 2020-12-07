const fs = require("fs");

const input = fs
    .readFileSync("../input/day7.input", "utf8")
    .trim()
    .split("\n")
    .flatMap(parseEdges);

console.log(part1());
console.log(part2());

function parseEdges(row) {
    const regex = /(\d+ )?([a-z]+ [a-z]+) bag/g;
    const matches = [...row.matchAll(regex)];
    const [, , from] = matches.shift();
    return matches.map(
        ([, weight, to]) => new Object({ from, to, weight: +weight })
    );
}

function part1() {
    return new Set(
        input.filter(edge => contains(edge, "shiny gold")).map(e => e.from)
    ).size;
}

function contains(edge, bagColor) {
    if (edge.to === bagColor) return true;
    if (isNaN(edge.weight)) return false;

    return input
        .filter(e => e.from === edge.to)
        .some(e => contains(e, bagColor));
}

function part2() {
    return countBagsIn("shiny gold");
}

function countBagsIn(bagName) {
    const bags = input.filter(e => e.from === bagName);
    const isEmptyBag = bags.length === 1 && isNaN(bags[0].weight);

    if (isEmptyBag) return 0;

    return bags.reduce(
        (sum, edge) => sum + edge.weight * (1 + countBagsIn(edge.to)),
        0
    );
}
