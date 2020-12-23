const fs = require("fs");

const input = fs
    .readFileSync("../input/day12.input", "utf8")
    .trim()
    .split("\n")
    .map(x => {
        return { dir: x[0], value: +x.slice(1) };
    });

const dirs = ["E", "S", "W", "N"];

function part1() {
    let position = { x: 0, y: 0, dir: "E" };
    input.forEach(cmd => move(cmd, position));
    return manhattan(position.x, position.y);
}

function move(cmd, position) {
    const go = {
        N: () => (position.y += cmd.value),
        E: () => (position.x += cmd.value),
        S: () => (position.y -= cmd.value),
        W: () => (position.x -= cmd.value),
        R: () => rotate(cmd.value, position),
        L: () => rotate(-cmd.value, position),
        F: () => go[position.dir](),
    };

    go[cmd.dir]();
}

function rotate(degrees, position) {
    const index = modulo(
        dirs.findIndex(x => x === position.dir) + degrees / 90,
        dirs.length
    );
    position.dir = dirs[index];
}

function modulo(x, n) {
    return ((x % n) + n) % n;
}

function manhattan(a, b) {
    return Math.abs(a) + Math.abs(b);
}

function part2() {
    let waypoint = { x: 10, y: 1 };
    let ship = { x: 0, y: 0 };

    input.forEach(cmd => move2(cmd, ship, waypoint));

    return manhattan(ship.x, ship.y);
}

function move2(cmd, ship, waypoint) {
    const go = {
        N: () => (waypoint.y += cmd.value),
        E: () => (waypoint.x += cmd.value),
        S: () => (waypoint.y -= cmd.value),
        W: () => (waypoint.x -= cmd.value),
        R: () => rotateWaypointR(cmd.value, waypoint),
        L: () => rotateWaypointL(cmd.value, waypoint),
        F: () => {
            ship.x += cmd.value * waypoint.x;
            ship.y += cmd.value * waypoint.y;
        },
    };

    go[cmd.dir]();
}

function rotateWaypointR(degrees, waypoint) {
    for (i = 0; i < degrees / 90; i++) {
        const { x, y } = waypoint;
        waypoint.x = y;
        waypoint.y = -x;
    }
}

function rotateWaypointL(degrees, waypoint) {
    for (i = 0; i < degrees / 90; i++) {
        const { x, y } = waypoint;
        waypoint.x = -y;
        waypoint.y = x;
    }
}

console.log(part1());
console.log(part2());
