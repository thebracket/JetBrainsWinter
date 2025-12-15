# How do I understand and use pattern matching effectively, and why is it so central in Rust?

Rust offers really rich algebraic data types. So you can wind up with something like:

```rust
enum DrinkType { 
    Coffee { roast: CoffeeRoast },
    Soda { brand: Brand },
    Water
}

pub fn get_drink_from_vending_machine(..) -> Result<Option<DrinkType>, VendingMachineError>
```

Without pattern matching, this would *hurt*. So `match` lets you easily extract the bits:

```rust
let d = get_drink_from_vending_machine();
match d {
    Ok(Some(DrinkType::Coffee { roast })) => println!("It's coffee ({})", roast),
    Ok(None) => println!("There is no drink"),
    Err(VendingMachineError::VendingMachineOnFire) => println!("Oh no"),
    // etc.
}
```

Matching is exhaustive, so if you add an enumeration entry - forgetting to handle it becomes a compilation error. That's *great* for refactors.

You can also use the shorthands:

```rust
if let Ok(Some(DrinkType::Coffee {roast})) = d {
    // It's a coffee of roast type
}
let Ok(Some(DrinkType::Coffee {roast })) = d else {
    panic!("They took away my coffee!");
}
```