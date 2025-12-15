# What’s ownership and borrowing? Why do we need these things in Rust? What’s the best way to really “get” them?

If you've been writing C and C++, you already know about the concepts on some level.

*Ownership* is "who owns this object, and who is responsible for destroying it". In C & C++, you have to understand this or terrible things happen. Rust makes the concept explicit.

So in C++, you create a `unique_ptr<MyThing>` - and when it falls out of scope, it's destroyed. Rust is *exactly* the same.

C++ has the scary `std::move` (it's actually a cast!) for conceptually *moving* ownership of a variable - it now *belongs* to the recipient. Rust is *move by default* - you can't accidentally use the thing you just moved. But the principle is the same: *someone owns the thing*.

It's like a car. If I give you the keys and the title, it's now *yours* (you can of course give it back).

On the other hand, in C++ you "take a reference" to things all the time:

```cpp
struct MyThing {};

void do_something(MyThing & thing) {
    // Code
}

int main() {
    auto thing = MyThing();
    do_something(thing);
    return 0;
}
```

`do_something` is working on the original *thing* - the reference is just a pointer with more strict rules about *null*.

Rust is the same thing, just more explicit:

```rust
struct MyThing {}

fn do_something(thing: &MyThing) {
    // Code
}

fn main() {
    let thing = MyThing{};
    do_something(&thing);
}
```

So borrowing is letting someone have the keys to your car, but it's still your car - and you get it back when they are done. Rust won't let them change your car unless you specifically give them mutability.

Rust *also* won't let you share a car that no longer exists, or let 5 people try and steer the same car at once. That's *why* the borrow checker and ownership exist. It stops you from accidentally hurting yourself. It also won't let you have a car that you also pretend is a bicycle (aliasing).

> The golden rule: you can borrow something immutably as much as you want - read only. (Exclusive) Or - you can borrow something mutably (read-write) exactly once at a time. Anything else can lead to danger!