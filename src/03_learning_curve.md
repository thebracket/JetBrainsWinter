# Is Rust’s steep learning curve still a problem in 2025, or has the ecosystem matured enough to ease newcomers in?

Pre-1.0, Rust looked *terrifying*:

```rust
fn main() {
    // Owned box (heap allocation), the '~' symbol has been removed in modern Rust
    let mut x: ~int = ~10; // 'mut' was also a property of the field/binding

    // Reference counted pointer, '@' has also been removed for ownership semantics
    let y: @int = @20;

    // A pure function declaration (pure was a keyword)
    pure fn add(a: int, b: int) -> int {
        ret a + b; // 'ret' was used instead of 'return'
    }

    log(fmt!("%d + %d = %d", *x, *y, add(*x, *y)));

    // Lifetimes were indicated with a '\' instead of '\''
    // e.g., fn get_str(s: \&str) -> \&str { s }
}
```

And we talked about memory a lot. So you might fear running into code like this:

```rust
fn allocate_memory_with_rust() {
    use std::alloc::{alloc, dealloc, Layout};

    unsafe {
        // Allocate memory with Rust. It's safer to force alignment.
        let layout = Layout::new::<u16>();
        let ptr = alloc(layout);

        // Set the allocated variable - dereference the pointer and set to 42
        *ptr = 42;
        assert_eq!(42, *ptr);

        // Free the memory - this is not automatic
        dealloc(ptr, layout);
    }
}
```

Here's the good news: unless you're writing really deep library code (which you won't be, if you just started!) - Rust looks more like this:

```rust
use axum::{routing::get, Router};

#[tokio::main]
async fn main() {
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3001").await.unwrap();

    let app = Router::new()
        .route("/", get(say_hello));

    axum::serve(listener, app).await.unwrap();
}

async fn say_hello() -> &'static str {
    "Hello, World!"
}
```

That's a complete, working webserver. It looks a lot like *Express* and other webservers. Rust scales with you. It's really easy to get started making something useful.