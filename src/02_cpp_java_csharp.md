# What do you see as the biggest mindset shift developers need to make when coming to Rust from C++, Java, or C#?

In **Java** and **C#** you run `MyThing o = new MyThing()` and an instance of `MyThing` appears on the heap. It'll be deleted when the garbage collector notices that it is no longer reachable.

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

> This pattern is called RAII - Resource Acquisition is Initialization. You can tell that C++ invented the name, because it's a vital concept - and not very descriptive!

In **C**, **C++** and **Rust** you have a *stack* and a *heap*. The stack is fast, small and local - the heap is where you put big things!

In C++ (and C#!) you can define a destructor. Let's use this to illustrate stack cleanup; your C++ object is automatically cleaned up the moment it goes out of scope (absolutely deterministic):

```cpp
#include <iostream>

struct MyClass {
    MyClass() {}
    ~MyClass() {
        std::cout << "Being Destroyed\n";
    }
};

int main() {
    auto c = MyClass();
    return 0;
}
```

This will always print:

```
Being destroyed
```

Rust looks suspiciously similar - you'd almost think that Rust was designed by C++ users looking to fix the common issues!

```rust
struct MyClass {}

impl Drop for MyClass {
    fn drop(&mut self) {
        println!("Being Destroyed");
    }
}

fn main() {
    let c = MyClass{};
}
```

This also prints:

```
Being destroyed
```

## Pointers and the Heap

C, C++ and Rust don't automatically put anything on the heap for you --- they even work on platforms that *don't have one*.