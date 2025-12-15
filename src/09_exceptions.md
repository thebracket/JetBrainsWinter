# Why are there no throwing and catching exceptions in Rust?

Let's look at a timeline:

* **C** - let's return an error integer. FAST, but not very clear. It's also really easy to forget to check the result code.
* **C++** - let's throw exceptions that can stop the program, include stack-traces and messages. Great as long as you keep them *exceptional*, and quite large on some platforms. It's also easy to forget an exception thrower. `-f noexcept` becomes common in a lot of places.
* **Java** - let's throw exceptions and make checking them mandatory. Awesome, but now lots of programs have `try { .. } catch (Exception ex) { .. }` at the top because nobody wants to do that. Ada exists.

So Rust wanted a bit of everything.

`Result<T, Error>` forces you to at least acknowledge that an error might occur. You can still `unwrap`, but you are at least saying that either:

a) This won't happen. (Programmer assertion)
b) If this does happen, it's so bad I just want to stop (runtime assertion).

Or you can:

```rust
match result {
    Ok(value) => // Do the good path
    Err(e) => // Handle the error
}
```

## And The Dirty Secret

Ever noticed that if you `panic!`, you get a stack trace? This uses the platform's stack unwinder, just like exceptions do. You can make your Rust program really small by replacing the default panic handler - and removing all that (if you need to).