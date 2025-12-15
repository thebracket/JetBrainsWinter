# Oopsies

Rust takes a lot of care to avoid common pitfalls.

This will compile and run in C++:

```cpp
#include <iostream>

struct MyThing{
    int i;
};

int main() {
    auto c = new MyThing();
    c->i = 3;
    delete c;
    std::cout << c->i << "\n";
    return 0;
}
```

> This might print 3. It usually will. It might also unleash nasal demons - the C++ standard says so!

Equivalent Rust won't compile:

```rust
struct MyThing { i: i32 }

fn main() {
    let c = Box::new(MyThing { i: 32 });
    drop(c);
    println!("{}", c.i);
}
```

This will compile and run in C++:

```cpp
#include <vector>
#include <iostream>

int main() {
    std::vector<int> numbers = {1, 2, 3, 4};
    for (int i=0; i<6; i++) {
        std::cout << numbers[i] << "\n";
    }
    return 0;
}
```

> In the playground, I got "1, 2, 3, 4, 0, 6897". It's anybody's guess what you'll get. It might be state secrets!

In Rust:

```rust
fn main() {
    let numbers = vec![1, 2, 3, 4];
    for i in 0..6 {
        println!("{}", numbers[i]);
    }
}
```

Instead of revealing state secrets, Rust "panics" (crashes) - just like the managed languages:

```
thread 'main' (14) panicked at src/main.rs:4:31:
index out of bounds: the len is 4 but the index is 4
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

That's a *good* thing. You don't want to read into invalid memory and see what's there!