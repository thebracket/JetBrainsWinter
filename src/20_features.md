# How do Cargo features work, and when should beginners start using them?

Learn to love:

```
cargo add serde -F derive
```

That's usually the first encounter with feature flags (often alongside "Why didn't deriving Serialize work?").

Feature flags are defined in `Cargo.toml`, and can affect both the dependencies that are pulled in by a crate, and what functions and types are included. `derive` is a common one, because proc-macros wind up in a separate crate.

For beginners, this can be daunting: what features do I *need*? You'll probably wind up typing `cargo add tokio -F full` because figuring them out is tricky!

So my advice is that you shouldn't *add* feature flags to your crate until you really need them. The first time I used them, I needed to support multiple back-ends for a rendering system (OpenGL, wgpu, etc.).