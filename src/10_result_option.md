# Why does Rust have both Result and Option types – how do I know which one to use?

Great question!

An *Option* represents cases where the absence of a value is still a valid response. It's similar to `null` in many languages (but you don't get to ignore it or de-reference a null and ruin your afternoon).

For example:

```rust
fn get_user(user_id: UserId) -> Option<User> {
    if user_exists {
        Some(user)
    } else {
        None
    }
}
```

The non-existence of a user with that ID isn't really an error (depending upon your logic). It's an absence of data.

Whereas this is an error:

```rust
fn load_user_from_database(user_id: UserId) -> Result<User, DbError> {
    return Err(DbError::DatabaseServerOnFire)
}
```

An error - a result - tells you if the operation *succeeded*, and *if not, why not*. Requesting a record from a database, but the connection fails? That's an error. Requesting a record from a database, but it doesn't exist? That's usually an `Option`.

As a result, it's not at all uncommon to express this as:

```rust
fn get_user(user: UserId) -> Result<Option<User>, DbError> { .. }
```

It's all about making intent really explicit, and making sure that you are handling different cases appropriately.