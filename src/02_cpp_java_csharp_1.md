# No Runtime!

Rust compiles down to the same machine code as C and C++ - there is no need to have a runtime.

So you don't have to ship a JVM/.NET Runtime.

Unlike C++, Rust statically compiles its Rust-crate libraries - so the entire Rust standard library is included in your binary by default. You can opt out of that (with `no_std`), but generally Rust ships with everything it needs to run. It will still usually rely on platform libraries such as libc/glibc, unless you are targeting a platform such as MUSL (that is entirely statically linked).