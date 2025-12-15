# Do I need to use iterators whenever possible, or is writing a loop just as fine?

You'll find that experienced Rust developers tend to use iterators. But there's *nothing* wrong with using loops (iterators are sometimes a touch faster). Sometimes, you even want to keep using loop to avoid the "my iterator function can't return" trap!

With *Rayon*, you suddenly can replace `iter()` with `par_iter()` and magically speed up a lot of operations. That's a good reason to learn the iterator approach.

I've been writing Rust for a decade, and I still sometimes write a loop first and then turn it into an iterator when I think someone might peek at my code!