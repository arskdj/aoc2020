const fs = require("fs");

fs.readFile("../input/day6.input", "utf8", (_, data) => {
    const input = data
        .trim()
        .split(/^$/m)
        .map(x => x.trim().split("\n"));

    console.log(part1(input));
    console.log(part2(input));
});

function part1(input) {
    return input.map(countAnswers).reduce((sum, group) => sum + group, 0);
}

function countAnswers(group) {
    const str = "".concat(...group);
    return new Set([...str]).size;
}

function part2(input) {
    return input.map(countAnswers2).reduce((sum, group) => sum + group, 0);
}

function countAnswers2(group) {
    const people = group.length;
    const str = "".concat(...group);
    const counts = [...str].reduce((counts, ans) => {
        counts[ans] = counts[ans] ? counts[ans] + 1 : 1;
        return counts;
    }, {});

    return Object.values(counts).filter(v => v === people).length;
}
