# How do I choose between using structs, enums, and traits when modeling data and behavior in Rust?

So at the very high level...

A *struct* is a collection of data that typically represents *something*:

```rust
struct Drink {
    brand: String,
    size: i32,
}
```

An *enum* represents a possible set of things:

```rust
enum DrinkType { Coffee, Soda, Water }
```

Where enums get fun is that they can also carry data (like a tagged union from C, or a variant from C++):

```rust
enum DrinkType { 
    Coffee { roast: CoffeeRoast },
    Soda { brand: Brand },
    Water
}
```

This really shines when you want to *only store things that are possible* - make impossible things unrepresentable.

Either of these can use `impl` to define functions. Adding a *trait* applies an interface to them - so now you can represent the type as a trait, and know that certain methods are available without knowing the concrete type.

So:

* Typically a `struct` is the right place if an entry is going to have all (or most) of the same fields.
* An `enum` is the right choice if you want to restrict to a valid type.
* A `trait` extends these to offer something. For example, the `Display` trait makes them all work with `format!` without having to write a `format` for all of them. You can also use traits for dynamic dispatch if you need single layer polymorphism.
