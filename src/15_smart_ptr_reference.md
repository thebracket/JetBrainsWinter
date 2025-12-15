# When should I use references (&T) versus smart pointers like Box or Rc?

This really boils down to ownership, and more importantly: how do you want this to be cleaned up?

For a function that reads something, acts on it and doesn't do any sort of cleanup: Use a reference.

If you're transferring ownership, the default move semantic or `Box` if it's on the heap is the right answer.

If you don't really know who owns an object, and want it to go away whenever it is no longer in use by anyone: use `Rc` or `Arc`.

And if you're in async, learn to love `Arc`!