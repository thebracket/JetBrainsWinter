# What does Rust mean by “zero-cost abstractions”?

Much the same as C++:

* You only pay for what you *use*,
* The compiler will optimize away much of the additional decoration.

It lets you have nice things without making your program run really slowly.

Zero-cost also applies at multiple levels. At the high-level, it means you won't "pay extra" performance cost for the compact:

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let even_sum: i32 = numbers
        .iter()
        .filter(|&num| num % 2 == 0) // Filter for even numbers
        .sum();                     // Sum the results
    println!("Sum of even numbers: {}", even_sum);
}
```

As opposed to the loop-based:

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4, 5];
    let mut even_sum = 0;
    for i in 0..numbers.len() {
        let num = numbers[i];
        if num % 2 == 0 {
            even_sum += num;
        }
    }
    println!("Sum of even numbers: {}", even_sum);
}
```

It can *also* mean:

* "Zero-Sized Types" (markers) don't even exist in the compiled code. So you can use them for clear code, and not have to pay.
* Traits are "monomorphized" - compiled to a single code path per type used (concrete implementations). So unless you add the `dyn` keyword, you aren't having dynamic/run-time dispatch added to your program.
* `Result` and `Option` are simple compare/branches in compiled code - no hidden cost for exception handling.
