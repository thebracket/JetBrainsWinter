# Why does Rust emphasize immutability by default, and when is mutability the right choice?

> Bjarne Stroustrup of C++ fame pointed out that C++ and Rust are very similar, but with the defaults reversed.

This really is a stylistic thing, and a hangover from the ML/O'Camel heritage. It does make it easier to read about code:

```rust
let a = 1;
```

You can now be sure that `a` won't be changed somewhere. It might be aliased, interior mutability can blow up your assumption - but for straightforward code it keeps you from slipping side-effects in by mistake that blow up your code.