const fs = require("fs");

fs.readFile("../input/day4.input", "utf8", (_, data) => {
    const input = data
        .trim()
        .split(/^\s*$/m)
        .map(x => x.replace(/\n/g, " ").trim())
        .map(createObj);

    console.log(part1(input));
    console.log(part2(input));
});

function createObj(row) {
    return row
        .split(" ")
        .map(pair => pair.split(":"))
        .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
        }, {});
}

function part1(input) {
    return input.filter(hasMandatoryFields).length;
}

function hasMandatoryFields(passport) {
    const fields = Object.keys(passport).filter(key => key !== "cid");
    const mandatory = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
    return mandatory.every(m => fields.includes(m));
}

function part2(input) {
    return input.filter(validate).length;
}

function validate(passport) {
    const { byr, iyr, eyr, hgt, hcl, ecl, pid } = passport;
    const result =
        hasMandatoryFields(passport) &&
        validateHeight(hgt) &&
        isBetween(byr, 1920, 2002) &&
        isBetween(iyr, 2010, 2020) &&
        isBetween(eyr, 2020, 2030) &&
        hcl.match(/^#[0-9a-f]{6}$/) !== null &&
        pid.match(/^\d{9}$/) !== null &&
        ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(ecl);
    return result;
}

function isBetween(value, min, max) {
    const i = parseInt(value);
    return min <= i && i <= max;
}

function validateHeight(hgt) {
    const result = hgt.match(/^(\d+)(cm|in)$/);
    if (result === null) return false;

    const [, value, unit] = result;
    if (unit === "cm") return isBetween(value, 150, 193);
    if (unit === "in") return isBetween(value, 59, 76);
    return false;
}
