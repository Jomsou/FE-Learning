# Principles of Redux

- The whole state of the application is represented as a javascript object. All changes are explicit.
- The state tree is readonly. It cannot be modified. Instead, anytime you want to change it, you'll have to dispatch an `action`.
`action` is a plain object which represents the state change, it usually should contains an key named 'type'.