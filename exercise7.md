# Self-Check Questions

## How to implement cascade stop for reels?

**Main idea:** Use a `canStop` flag for each reel to control when it can stop.

**Steps:**

1. **Add `canStop` flag to each reel's state:**
```typescript
const reels = [
  {symbol: reel1, spinning: false, y: 150, targetY: 150, canStop: false},
  {symbol: reel2, spinning: false, y: 150, targetY: 150, canStop: false},
  {symbol: reel3, spinning: false, y: 150, targetY: 150, canStop: false},
]
```

2. **When starting a spin, reset `canStop = false` for all reels:**
```typescript
reels.forEach((reel, index) => {
  reel.spinning = true
  reel.canStop = false  // Prevent stopping
  // ...
})
```

3. **Use `setTimeout` with different delays for each reel:**
```typescript
setTimeout(() => {
  reel.symbol.text = symbols[Math.floor(Math.random() * symbols.length)]
  reel.canStop = true  // Allow stopping after different times
}, index * SPIN_DELAY)  // 0ms, 500ms, 1000ms
```

4. **In animation, check `canStop` before stopping:**
```typescript
if (reel.y < reel.targetY) {
  // Moving towards target - continue
  reel.y += 5
} else if (reel.canStop) {
  // Reached target AND has permission - stop
  reel.spinning = false
} else {
  // Reached target but no permission - reset position and keep spinning
  reel.y = 50
}
```

**Why it works:**
- Without `canStop`, all reels stop simultaneously because they all have the same `targetY`.
- With `canStop`, each reel waits for its permission and stops at its own time.
- Delays via `setTimeout` create a cascade: first at 0ms, second at 500ms, third at 1000ms.

**Summary:** `canStop` is the "green light" for stopping. Each reel gets it at its own time, creating a cascade effect.

---

## Why is `canSpin` needed?

**Main purpose:** Prevent multiple clicks on the SPIN button while reels are spinning.

**How it works:**

1. **When clicking the button:**
```typescript
button.on('pointerdown', () => {
  if (!canSpin) return  // If already spinning - exit
  // ...
  canSpin = false  // Block ability to start new spin
})
```

2. **During animation:**
   - `canSpin = false` → button is blocked
   - Repeated clicks are ignored

3. **After all reels stop:**
```typescript
if (allStopped && !canSpin) {
  canSpin = true  // Unblock button for new spin
  // ...
}
```

**Why it's important:**

- **Without `canSpin`:** You could click multiple times during a spin, which leads to:
  - Multiple simultaneous spins
  - Animation glitches
  - Incorrect balance deduction
  - Logic errors

- **With `canSpin`:**
  - Only one spin at a time
  - Button is blocked during spinning
  - After all reels stop, button is unblocked

**Summary:** `canSpin` is protection against repeated clicks. It ensures that a new spin can only start after the previous one is completely finished.

---

## How to check if all reels have stopped?

**Main idea:** Use an `allStopped` flag that checks the state of each reel.

**Algorithm:**

The check happens inside `app.ticker.add()`, which is set up once at the beginning:

```typescript
// Animation
app.ticker.add(() => {
  let allStopped = true  // Initialize flag - assume all are stopped

  // Check each reel in a loop
  reels.forEach((reel) => {
    if (reel.spinning) {
      // If reel is spinning - not all are stopped
      allStopped = false
      
      // Reel movement logic...
    }
    // If reel.spinning === false, reel is stopped
  })
})
```

**Why it works:**

- `allStopped = true` by default - we assume all are stopped
- If at least one reel has `reel.spinning === true`, we set `allStopped = false`
- If no reels are spinning, `allStopped` remains `true`
- Additional check `!canSpin` ensures that a spin was actually started

**Important:**
- `app.ticker.add()` is added **once at the beginning** of the animation setup, not on each spin
- The callback function inside `app.ticker.add()` runs **automatically every frame**
- `allStopped` is reset every frame and recalculated from scratch
- This ensures accurate detection of when all reels have stopped

**Summary:** Use the `allStopped` flag, which becomes `false` if at least one reel is spinning, and remains `true` when all reels are stopped (`reel.spinning === false` for all). The check happens automatically every frame through `app.ticker.add()` that was set up once at the start.
