const fs = require("fs");

fs.readFile("./day2.input", "utf8", (err, data) => {
    if (err) {
        console.error(err);
        return;
    }

    const lines = data.trim().split("\n");

    part1(lines);
    part2(lines);
});

function parse_line(line) {
    const regex = /(\d+)-(\d+) (\w): (\w+)$/;
    return line.match(regex);
}

function validate_password(input) {
    const [, min, max, letter, password] = parse_line(input);
    const letter_count = [...password].filter(x => x === letter).length;
    return letter_count >= min && letter_count <= max;
}

function validate_password2(input) {
    const [, a, b, letter, password] = parse_line(input);
    return (password[a - 1] === letter) ^ (password[b - 1] === letter);
}

function part1(lines) {
    let result = lines.filter(x => validate_password(x)).length;
    console.log(result);
}

function part2(lines) {
    let result = lines.filter(x => validate_password2(x)).length;
    console.log(result);
}
