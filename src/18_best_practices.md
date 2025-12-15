# What are some best practices for organizing Rust projects – modules, files, and workspace structure?

This is a HUGE question, so I'll only touch on it. I'm also very aware that any answer I give will upset *someone*! So I'm going to focus on how I like to do things!

Put similar things together. Say you have a `Widget` repository (data storage of some type). Create a `widget` module. `mod.rs` (or `widget.rs`) is *just* the public interface with very little code in it. Inside the directory, I define the types and operations - and then offer a public API. That forces anyone using my widget module to use my accessor code; and now it doesn't matter how I've implemented it. I can even break it off into its own crate (replace `mod.rs` with `lib.rs`) later.

This applies at the next level up, so you typically end up with a `data` or `repository` section - containing the various data repositories.

If I have to then break that off into a separate service for some reason, I keep the API in `lib.rs` and move the logic to a `main.rs` (you can have both!) - and the `lib.rs` will handle calling the service. That keeps the cognitive load of breaking out into more and more services low.

So, *traits*. This is where the pitchforks come out. I personally almost never say "oh, my widget repo needs an abstract trait and should be instantiated in case I decide to build a mock or change database completely" when I start. You *can* do that, but you're adding quite a bit of cognitive load and ceremony to your task. And for me, the task is usually: make the darned thing work!

That's not to say you can't *later* insert a trait, basing the trait interface off of the functions you've discovered that you need - and use that to define a mock. I personally won't do that until I *actually want one*!
