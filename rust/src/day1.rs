use rayon::prelude::*;
use std::collections::HashSet;
use std::fs;

pub fn run(filename: &str, target_sum: i128) {
    let data = fs::read_to_string(filename).expect("IO Error");

    let numbers: Vec<i128> = data.lines().map(|x| x.trim().parse().unwrap()).collect();
    let hset: HashSet<i128> = numbers.iter().cloned().collect();

    part1(&numbers, target_sum, &hset);
    part2(&numbers, target_sum, &hset);
}

fn part1(numbers: &[i128], target_sum: i128, hset: &HashSet<i128>) {
    numbers.par_iter().any(|&i| {
        let j = target_sum - i;
        if hset.contains(&j) {
            println!("{}", i * j);
            return true;
        }
        return false;
    });
}

fn part2(numbers: &[i128], target_sum: i128, hset: &HashSet<i128>) {
    numbers.par_iter().any(|&i| {
        numbers.par_iter().any(|&j| {
            let k = target_sum - (i + j);
            if hset.contains(&k) {
                println!("{}", i * j * k);
                return true;
            }
            return false;
        })
    });
}
