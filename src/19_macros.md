# What are macros in Rust, and when should a beginner actually use them?

It's actually really funny teaching Rust. `cargo new hello`, and voila:

```rust
fn main() {
    println!("Hello, World");
}
```

And right up-front, you're hitting the user with a macro and explaining "oh, this is a macro because `println` doesn't actually follow the syntax rules *of the language you're introducing*. It's unavoidable, but it's not my favourite start!

Then you use `#[derive(Debug)]` and realize that *something* is writing code for you.

Rust has two macros systems, and a third (Macros 2.0) is coming! I once saw a RustConf talk in which someone used macros to make XML into compilable Rust. I don't recommend it.

I use the simplest macros when I'm doing something over, and over again. I use procedural macros for derivation. In both cases, I think about it - and try to document it.

There have been times macros have saved my bacon. In Advanced Hands-on Rust, I use a macro to setup some of the "game phases" and the systems they run (and received a few grumbles about it!). The Bevy engine changed the underlying systems code several times while I wrote the book - just being able to adapt the macro was really handy.

> I don't recommend beginners start with macros. This isn't LISP!
