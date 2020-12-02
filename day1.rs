use std::fs;

fn main() {
    let data = fs::read_to_string("day1.input")
        .expect("IO Error");

    let numbers: Vec<i32> = 
        data
        .lines()
        .map(|x| x.trim().parse().unwrap())
        .collect();

    println!("{:#?}", numbers);
}
