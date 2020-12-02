const fs = require("fs");

fs.readFile("./day1.input", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const numbers = data
    .split("\n")
    .map((x) => parseInt(x))
    .filter((x) => !isNaN(x));

  part1(numbers);
  part2(numbers);
});

function part1(numbers) {
  for (i of numbers)
    for (j of numbers)
      if (i + j === 2020) {
        console.log(`${i} * ${j} = ${i * j}`);
        return;
      }
}

function part2(numbers) {
  const set = new Set(numbers);
  for (i of numbers)
    for (j of numbers) {
      const k = 2020 - (i + j);
      if (set.has(k)) {
        console.log(`${i} * ${j} * ${k} = ${i * j * k}`);
        return;
      }
    }
}
