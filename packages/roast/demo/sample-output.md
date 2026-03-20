# Demo Output Samples

These are representative outputs from `roast` at different intensity levels.

## `roast examples/bad.js` (brutal mode)

```
──────────────────────────────────────────────────────
  🔥 ROAST REPORT
──────────────────────────────────────────────────────

Oh. Oh no. WHAT IS THIS?!

This code is so RAW it's still mooing! Let me break down
this culinary catastrophe:

🔪 **The Pyramid of Doom (lines 3-15)**
Five nested if-statements?! This isn't code, it's a
BLOODY RUSSIAN NESTING DOLL! Ever heard of early returns?
Guard clauses? ANYTHING?!

```js
// What you wrote (disgusting):
if (d[i].active == true) {
  if (d[i].age > 18) {
    if (d[i].name != null) {
      // 🤮

// What a CHEF would write:
const isValid = (u) => u.active && u.age > 18 && u.name;
const result = d.filter(isValid).map(u => ({...}));
```

🔪 **`var` in 2026?!**
Using `var` is like cooking with a MICROWAVE in a Michelin
kitchen! Use `const` and `let`, you donut!

🔪 **Single-letter variables**
`d`? `n`? `a`? `e`? This reads like you're playing
bloody SCRABBLE, not writing code! Name. Your. Variables.

🔪 **Global mutable state**
`GLOBAL_USERS`, `GLOBAL_COUNT`, `temp`... You've got more
globals than a McDonald's has franchises! This is a
RECIPE FOR DISASTER!

🔪 **`== true` comparison**
`d[i].active == true` — WHY?! Just use `d[i].active`!
It's like saying "if true equals true is true"! IDIOTIC!

**Rating: 2/10** — I've seen better code written by a
toaster. The only thing saving you from a 1 is that it
probably runs. Probably.

Now get back in there and CLEAN THIS UP! 🔥

──────────────────────────────────────────────────────
```

## `roast --level mild examples/bad.py`

```
──────────────────────────────────────────────────────
  🔥 ROAST REPORT
──────────────────────────────────────────────────────

Hey! Let's take a look at this code together 😊

A few things I noticed:

📝 **Unused imports** — You're importing `os`, `sys`,
`re`, `time`, `random`, and `math` but never using them.
That's like packing 6 suitcases for a weekend trip!

📝 **Bare `except: pass`** — This silently swallows ALL
exceptions. That's how bugs hide! Try catching specific
exceptions instead.

📝 **The `calc` function** — 9 parameters is... a lot!
Consider using `*args` or a config object. Your future
self will thank you 🙏

📝 **`!= None` → `is not None`** — It's the Pythonic
way. PEP 8 recommends it!

📝 **The `process` method** — All three branches do the
same thing (append x). You could simplify this to:
```python
valid_types = {'A', 'B', 'C'}
return [x for x in input if x['type'] in valid_types]
```

Overall: Not bad for a first draft! With some cleanup
this could be really clean code ✨

──────────────────────────────────────────────────────
```
