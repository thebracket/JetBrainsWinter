# The Heap

In **C**, you learn to love `malloc` and `free` for putting things on the heap:

```c
struct MyThing{};


int main() {
    MyThing * c = malloc(sizeof(MyThing));
    free(c); // Thing won't be removed from the heap if you forget!

    return 0;
}
```

In **Older C++**, you have `new` and `delete`:

```cpp
struct MyThing{};


int main() {
    auto c = new MyThing{};
    delete c; // Thing won't be removed from the heap if you forget!

    return 0;
}
```

In **Modern C++**, you can use a *smart pointer*:

```cpp
#include <memory>

struct MyThing {};

int main() {
    auto c = std::make_unique<MyThing>();
} // c will self-delete when it goes out of scope
```

You *can* use `alloc()` (and even `malloc()` if you want to) with unsafe Rust, but most of the time you'll use the built-in smart pointers:

```rust
struct MyThing {};

fn main() {
    let c = Box::new(MyThing{});
}
```