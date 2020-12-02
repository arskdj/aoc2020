mod day1;
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();

    match &args[1][..] {
        "1" => day1::run("../input/day1.input", 2020),
        "1b" => day1::run("../input/day1.bigboy", 99920044),
        _ => eprint!("Give day number as argument. nb for big boy"),
    }
}
