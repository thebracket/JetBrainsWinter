# How do I know when my struct should be Copy, Clone, or neither?

> Confession: I have `#[derive(Clone)]` macroed.

If a structure (or enum) implements `Clone`, you can use `.clone()` to make a deep copy. This can be slow, but it's also really useful. Sometimes, you want to copy things!

> For beginners: adding `clone()` everywhere until it works is a hallmark of learning Rust, not something to be ashamed of!

Adding `Copy` is a trickier. Copy actually just denotes "if I move this object, it remains valid" - and you can only apply `Copy` if everything is copyable. So typically, add `Copy` if everything inside is a primitive (ints, etc.).

As for neither? If something is really heavy to clone (big!), you probably want to avoid people cloning it if at all possible. So make that impossible. Or maybe it represents *just one of something* - that isn't logically cloneable.

And gripe time - the clone wars have begun:

Rust abuses the `clone` word. The correct way to increment a reference counter and get your very own shared pointer (`Arc` or `Rc`) to something is... `clone`. So the poor user gets no real indication if something is designed to be cloned (and clone is super cheap). Fortunately, there's work towards fixing this going on.