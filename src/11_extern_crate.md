# Which external crate should I learn about first?

I personally like to start by introducing `colored` when I'm teaching, just because I like it:

```rust
println!("{}", "Oh No!".red());
```

In practice, a lot of users run into `serde` (and associated `serde_json`) first. It's *really* nice:

```rust
use serde::{Serialize, Deserialize};

#[derive(Serialize, Deserialize)]
pub struct Thing {
    pub n: i32,
}

fn main() -> anyhow::Result<()> {
    let things = vec![Thing { n: 1}, Thing { n: 2}];
    let json = serde_json::to_string_pretty(&things)?;
    let things: Vec<Thing> = serde_json::from_str(&json)?;
    Ok(())
}
```

I'd also look at `anyhow` and `thiserror` to make the error handling a lot easier.
