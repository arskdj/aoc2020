const fs = require("fs");
const { exit } = require("process");

let input = fs.readFileSync("../input/day13.input", "utf8").trim().split("\n");
input[0] = +input[0];
input[1] = input[1].split(",").map(x => +x);

function part1() {
    const ref = input[0];
    const buses = input[1].filter(x => !isNaN(x));

    let timetable = {};

    for (b of buses) {
        timetable[b] = (Math.floor(ref / b) + 1) * b;
    }

    const [id, timestamp] = Object.entries(timetable).sort(
        (e1, e2) => e1[1] - e2[1]
    )[0];

    return (timestamp - ref) * +id;
}

function part2() {
    const buses = input[1]
        .map((b, i) => {
            return { index: input[1].length - i - 1, id: b };
        })
        .filter(b => !isNaN(b.id));

    return crt(buses) - BigInt(buses[0].index);
}

// bus ids are prime => chinese remainder theorem
function crt(buses) {
    const b = buses.map(b => b.index);
    const ids = buses.map(b => b.id);
    const product = ids.reduce((product, n) => n * product, 1);
    const N = ids.map(n => product / n);
    const inverts = N.map((n, i) => invert(n, ids[i]));
    const sum = N.reduce(
        (sum, n, i) => sum + BigInt(n) * BigInt(b[i]) * BigInt(inverts[i]),
        0n
    );
    return sum % BigInt(product);
}

function invert(a, n) {
    let t = 0;
    let newt = 1;
    let r = n;
    let newr = a;

    while (newr > 0) {
        quotient = Math.floor(r / newr);
        [t, newt] = [newt, t - quotient * newt];
        [r, newr] = [newr, r - quotient * newr];
    }

    if (t < 0) t += n;
    return t;
}

console.log(part1());
console.log(part2());
