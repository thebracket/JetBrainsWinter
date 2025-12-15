# Let's Get Racy

Rust makes data races *not compile*.

For example:

```cpp
#include <thread>
#include <vector>
#include <atomic>
#include <iostream>

int main() {
  int counter = 0;
  std::vector<std::thread> handles;
    
  for (int i=0; i<3; i++) {
    handles.push_back(
      std::thread([&counter]() { 
        for (int i=0; i<100000; i++) {
          counter++;
        }
      })
    );
  }

  for (int i=0; i<handles.size(); i++) {
    handles[i].join();
  }

  std::cout << "Counter: " << counter << "\n";
  return 0;
}
```

This gives you a *different answer every time* - there's a race condition with multiple threads updating `counter` all at once. 

Rust won't even let you compile this:

```rust
fn main() {
    let mut counter = 0;
    let mut handles = Vec::new();
    for _ in 0..3 {
        handles.push(std::thread::spawn(|| {
            for _ in 0..100_000 {
                counter += 1;
            }
        }))
    }
    for handle in handles {
      handle.join();
    }
}
```

It will fail to compile. The actual compilation error is comically large:

```
   Compiling playground v0.0.1 (/playground)
error[E0373]: closure may outlive the current function, but it borrows `counter`, which is owned by the current function
 --> src/main.rs:5:41
  |
5 |         handles.push(std::thread::spawn(|| {
  |                                         ^^ may outlive borrowed value `counter`
6 |             for _ in 0..100_000 {
7 |                 counter += 1;
  |                 ------- `counter` is borrowed here
  |
note: function requires argument type to outlive `'static`
 --> src/main.rs:5:22
  |
5 |           handles.push(std::thread::spawn(|| {
  |  ______________________^
6 | |             for _ in 0..100_000 {
7 | |                 counter += 1;
8 | |             }
9 | |         }))
  | |__________^
help: to force the closure to take ownership of `counter` (and any other referenced variables), use the `move` keyword
  |
5 |         handles.push(std::thread::spawn(move || {
  |                                         ++++

error[E0499]: cannot borrow `counter` as mutable more than once at a time
   --> src/main.rs:5:41
    |
  5 |           handles.push(std::thread::spawn(|| {
    |                        -                  ^^ `counter` was mutably borrowed here in the previous iteration of the loop
    |  ______________________|
    | |
  6 | |             for _ in 0..100_000 {
  7 | |                 counter += 1;
    | |                 ------- borrows occur due to use of `counter` in closure
  8 | |             }
  9 | |         }))
    | |__________- argument requires that `counter` is borrowed for `'static`
    |
note: requirement that the value outlives `'static` introduced here
   --> /playground/.rustup/toolchains/stable-x86_64-unknown-linux-gnu/lib/rustlib/src/rust/library/std/src/thread/mod.rs:728:15
    |
728 |     F: Send + 'static,
    |               ^^^^^^^

Some errors have detailed explanations: E0373, E0499.
For more information about an error, try `rustc --explain E0373`.
error: could not compile `playground` (bin "playground") due to 2 previous errors
```

Rust *really* doesn't want you to make this mistake! (You can solve this particular problem with an `AtomicUsize`, or use a proper `Mutex`)