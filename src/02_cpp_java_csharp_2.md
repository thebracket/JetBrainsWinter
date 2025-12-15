# Stack vs Heap

This mostly affects coming from Java/C#.

Java and C# let you view memory as this big, amorphous blob. The runtime does garbage collection, and cleans up after you. It's hard to make memory errors (but sometimes possible), because the runtime will try and keep objects alive until nothing refers to them.

Both languages (outside of FFI/unsafe) typically view memory as one big heap. In **Java** and **C#** you run `MyThing o = new MyThing()` and an instance of `MyThing` appears on the heap. It'll be deleted when the garbage collector notices that it is no longer reachable.

Both let you make the destruction explicit:

```java
try (MyThing thing = new MyThing()) {
    // Do my thing
} catch (ThingException ex) {
    // Handle the errors
} // Thing is destroyed
```

```c#
using (MyThing thing = new MyThing()) {

} // Thing is destroyed
```

In **C**, **C++**, and Rust most things are on the *stack* unless you say otherwise. The stack is tiny (8 Mb by default on Linux) - but you can write simple programs without ever touching memory management:

```cpp
struct MyThing{};

int main() {
    MyThing c = MyThing{};
    return 0;
} // Thing is guaranteed to be destroyed *right now*
```

```rust
struct MyThing{}

fn main() {
    let c = MyThing{};
} // Thing is guaranteed to be destroyed *right now*
```

So from a C++ point-of-view, you have:

* `Box` in Rust (which is basically C++'s `unique_ptr`).
* `Rc` in Rust (which is basically C++'s `shared_ptr` in single-threaded mode)
* `Arc` in Rust (which is basically C++'s `shared_ptr` in multi-threaded mode)