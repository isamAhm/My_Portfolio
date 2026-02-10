# Scroll Zoom Customization Guide

## Overview

The scroll-based zoom feature is now fully customizable with clear configuration points. You can easily adjust when the zoom starts, ends, and how smooth it feels.

## Location

File: `src/components/threejs-skills-section.tsx`
Function: `ThreeJSScene()` → `useFrame()` hook

## Adjustable Parameters

### 1. 🎯 ZOOM_START_OFFSET

**Location**: Line ~207
```typescript
const ZOOM_START_OFFSET = 0.3;  // 🎯 ADJUST THIS
```

**What it does**: Controls when the zoom animation begins as you scroll through the section.

**Values**:
- `0` = Zoom starts immediately when section enters viewport
- `0.3` = Zoom starts after scrolling 30% through the section (current setting)
- `0.5` = Zoom starts halfway through the section
- `1` = Zoom starts at the very end (not recommended)

**Example scenarios**:
- Want zoom to start earlier? Use `0.1` or `0.2`
- Want zoom to start later? Use `0.4` or `0.5`
- Want immediate zoom? Use `0`

### 2. 🎯 ZOOM_END_OFFSET

**Location**: Line ~210
```typescript
const ZOOM_END_OFFSET = 0.9;  // 🎯 ADJUST THIS
```

**What it does**: Controls when the zoom animation completes.

**Values**:
- `0.5` = Zoom completes halfway through section
- `0.9` = Zoom completes at 90% through section (current setting)
- `1` = Zoom completes at the very end

**Example scenarios**:
- Want faster zoom? Use `0.6` or `0.7`
- Want slower, more gradual zoom? Use `0.95` or `1`
- Want zoom to finish before reaching next section? Use `0.8`

### 3. 🎯 minDistance (Closest Zoom)

**Location**: Line ~250
```typescript
const minDistance = 6;  // 🎯 ADJUST THIS
```

**What it does**: How close the camera gets to the 3D objects (zoomed in state).

**Values**:
- Smaller number = Closer zoom (more dramatic)
- Larger number = Less close (more conservative)

**Examples**:
- `4` = Very close, dramatic zoom
- `6` = Current setting, balanced
- `8` = More distant, subtle zoom

**Warning**: Too small (< 4) might clip through objects!

### 4. 🎯 maxDistance (Farthest Zoom)

**Location**: Line ~251
```typescript
const maxDistance = 20;  // 🎯 ADJUST THIS
```

**What it does**: How far the camera starts from the 3D objects (zoomed out state).

**Values**:
- Smaller number = Starts closer
- Larger number = Starts farther away

**Examples**:
- `15` = Starts closer, less zoom range
- `20` = Current setting, good range
- `25` = Starts very far, dramatic zoom effect

### 5. 🎯 LERP_FACTOR (Smoothness)

**Location**: Line ~259
```typescript
const LERP_FACTOR = 0.05;  // 🎯 ADJUST THIS
```

**What it does**: Controls how smoothly the camera moves (interpolation speed).

**Values**:
- `0.01` = Very smooth and slow, buttery transitions
- `0.05` = Balanced smoothness (current setting)
- `0.1` = Fast, snappy response
- `0.2` = Very fast, almost instant

**Examples**:
- Want cinematic slow zoom? Use `0.02`
- Want responsive zoom? Use `0.08`
- Want instant zoom? Use `0.15`

## Common Customization Scenarios

### Scenario 1: "Zoom starts too early"
**Solution**: Increase `ZOOM_START_OFFSET`
```typescript
const ZOOM_START_OFFSET = 0.4;  // Was 0.3, now starts later
```

### Scenario 2: "Zoom is too fast"
**Solution**: Increase `ZOOM_END_OFFSET` and/or decrease `LERP_FACTOR`
```typescript
const ZOOM_END_OFFSET = 0.95;   // Was 0.9, now takes longer
const LERP_FACTOR = 0.03;        // Was 0.05, now smoother
```

### Scenario 3: "Want more dramatic zoom"
**Solution**: Increase distance range
```typescript
const minDistance = 4;   // Was 6, now gets closer
const maxDistance = 25;  // Was 20, now starts farther
```

### Scenario 4: "Zoom feels jerky"
**Solution**: Decrease `LERP_FACTOR`
```typescript
const LERP_FACTOR = 0.02;  // Was 0.05, now much smoother
```

### Scenario 5: "Want zoom to complete before reaching Technologies section"
**Solution**: Decrease `ZOOM_END_OFFSET`
```typescript
const ZOOM_END_OFFSET = 0.75;  // Was 0.9, now finishes earlier
```

## Recommended Presets

### Preset 1: Cinematic (Slow & Smooth)
```typescript
const ZOOM_START_OFFSET = 0.2;
const ZOOM_END_OFFSET = 0.95;
const minDistance = 5;
const maxDistance = 22;
const LERP_FACTOR = 0.02;
```

### Preset 2: Snappy (Fast & Responsive)
```typescript
const ZOOM_START_OFFSET = 0.3;
const ZOOM_END_OFFSET = 0.8;
const minDistance = 6;
const maxDistance = 18;
const LERP_FACTOR = 0.08;
```

### Preset 3: Dramatic (Big Zoom Range)
```typescript
const ZOOM_START_OFFSET = 0.25;
const ZOOM_END_OFFSET = 0.9;
const minDistance = 4;
const maxDistance = 25;
const LERP_FACTOR = 0.04;
```

### Preset 4: Subtle (Conservative Zoom)
```typescript
const ZOOM_START_OFFSET = 0.4;
const ZOOM_END_OFFSET = 0.85;
const minDistance = 8;
const maxDistance = 16;
const LERP_FACTOR = 0.06;
```

## Testing Tips

1. **Save the file** after making changes
2. **Scroll through the Expertise section** multiple times
3. **Try scrolling at different speeds** (fast vs slow)
4. **Check the transition** to the Technologies section
5. **Test on mobile** if possible (touch scrolling behaves differently)

## Visual Guide

```
Section Progress:  0%        30%       50%       90%      100%
                   |---------|---------|---------|---------|
Camera Distance:   20 -----> 20 -----> 13 -----> 6 -----> 6
                   (far)     (start)   (mid)    (end)   (close)
                             zoom      zooming   zoom
                             starts              ends

ZOOM_START_OFFSET = 0.3 (30%)
ZOOM_END_OFFSET = 0.9 (90%)
```

## Current Settings (Your Request)

Based on your feedback that zoom starts too early, the current settings are:

```typescript
const ZOOM_START_OFFSET = 0.3;  // Starts after 30% scroll
const ZOOM_END_OFFSET = 0.9;    // Ends at 90% scroll
const minDistance = 6;           // Close zoom
const maxDistance = 20;          // Far zoom
const LERP_FACTOR = 0.05;        // Balanced smoothness
```

**To make it start even later**, try:
```typescript
const ZOOM_START_OFFSET = 0.4;  // or 0.5
```

All parameters are clearly marked with 🎯 in the code for easy finding!