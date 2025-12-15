# How quickly should I master writing async code if I want to develop real projects?

It's definitely worth learning synchronous Rust first.

Async Rust is a really powerful beast, but it can also get confusing when you step beyond well-defined webservers (and similar). The compiler actually converts all your async code into state machines (often with self-reference), which makes the borrow checker actually troublesome: you need to become friendly with `Arc`, and possibly pinning when you get into advanced async code.

> I'm actually teaching this as an all-day workshop at Rust Nation in London, in February.

It kind-of depends upon what you're doing. You can do a *lot* without ever touching async code. You can do a lot with async code that lets the libraries do the hard bit (webservers). It's when you start to need to create async stream adapters and similar that it gets tough.
