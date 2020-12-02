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
  const [_, a, b, letter, password] = parse_line(input);
  const letter_count = [...password].filter((x) => x === letter).length;
  return letter_count >= a && letter_count <= b;
}

function validate_password2(input) {
  const [_, a, b, letter, password] = parse_line(input);
  return (password[a - 1] === letter) ^ (password[b - 1] === letter);
}

function part1(lines) {
  let result = 0;
  lines.forEach((x) => {
    if (validate_password(x)) result += 1;
  });
  console.log(result);
}

function part2(lines) {
  let result = 0;
  lines.forEach((x) => {
    if (validate_password2(x)) result += 1;
  });
  console.log(result);
}
