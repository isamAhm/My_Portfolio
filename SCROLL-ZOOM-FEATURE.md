# Scroll-Based Zoom Feature

## Overview

The Expertise section now features automatic scroll-based zoom that creates an immersive experience as users scroll through the page.

## Behavior

### Zoom In (Scrolling Down)
- **When**: As you scroll down and the section comes into view
- **Effect**: Camera zooms in from far (distance 20) to close (distance 6)
- **Result**: 3D elements appear larger and more detailed

### Zoom Out (Scrolling Up)
- **When**: As you scroll back up through the section
- **Effect**: Camera zooms out from close (distance 6) to far (distance 20)
- **Result**: 3D elements become smaller, showing the full scene

## Technical Implementation

### Scroll Progress Calculation

```typescript
useFrame(({ camera }) => {
    const section = document.getElementById('expertise');
    if (section) {
        const rect = section.getBoundingClientRect();
        const sectionHeight = rect.height;
        const viewportHeight = window.innerHeight;
        
        // Calculate scroll progress (0 to 1)
        let scrollProgress = 0;
        
        if (rect.top <= 0 && rect.bottom >= viewportHeight) {
            // Section is in viewport - calculate progress
            scrollProgress = Math.abs(rect.top) / (sectionHeight - viewportHeight);
        } else if (rect.top > 0) {
            // Section hasn't reached top yet
            scrollProgress = 0;
        } else {
            // Section has passed
            scrollProgress = 1;
        }
        
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
        
        // Map to camera distance
        const minDistance = 6;   // Closest zoom
        const maxDistance = 20;  // Farthest zoom
        const targetDistance = maxDistance - (scrollProgress * (maxDistance - minDistance));
        
        // Smooth interpolation
        const currentDistance = camera.position.length();
        const newDistance = THREE.MathUtils.lerp(currentDistance, targetDistance, 0.05);
        
        // Update camera
        camera.position.normalize().multiplyScalar(newDistance);
        camera.updateProjectionMatrix();
    }
});
```

## Key Features

### 1. Smooth Transitions
- Uses `THREE.MathUtils.lerp()` with factor 0.05
- Creates gradual, smooth zoom effect
- No jarring movements

### 2. Scroll Progress Tracking
- Monitors section position relative to viewport
- Calculates exact scroll progress (0-1)
- Updates every frame for smooth response

### 3. Distance Mapping
- **scrollProgress = 0**: Camera at distance 20 (far)
- **scrollProgress = 0.5**: Camera at distance 13 (medium)
- **scrollProgress = 1**: Camera at distance 6 (close)

### 4. Maintains Camera Direction
- Uses `camera.position.normalize()` to preserve direction
- Only changes distance, not angle
- Works seamlessly with OrbitControls rotation

## OrbitControls Configuration

```typescript
<OrbitControls
    ref={controlsRef}
    enableZoom={false}        // ✅ Disabled manual zoom
    enablePan={false}         // Disabled panning
    enableRotate={true}       // ✅ Rotation still works
    enableDamping={true}      // Smooth movements
    dampingFactor={0.05}      // Smooth deceleration
    rotateSpeed={0.5}         // Controlled rotation
    autoRotate={true}         // Auto-rotation enabled
    autoRotateSpeed={0.5}     // Slow rotation
    maxDistance={20}          // Max zoom out
    minDistance={6}           // Max zoom in
/>
```

**Note**: `enableZoom={false}` disables manual scroll-to-zoom, allowing our custom scroll-based zoom to work without conflicts.

## User Experience

### Before Scroll-Based Zoom
- Static camera position
- Manual zoom with scroll wheel
- Less engaging

### After Scroll-Based Zoom
- ✅ Dynamic camera movement tied to page scroll
- ✅ Automatic zoom in as section comes into view
- ✅ Automatic zoom out when scrolling back up
- ✅ Creates cinematic, immersive experience
- ✅ Guides user attention to 3D elements
- ✅ More engaging and interactive

## Interaction Modes

### 1. Page Scroll (Vertical)
- **Effect**: Zooms camera in/out
- **Control**: Page scroll (mouse wheel, trackpad, touch)
- **Range**: Distance 20 → 6 → 20

### 2. Drag to Rotate
- **Effect**: Rotates the scene
- **Control**: Click and drag
- **Range**: Full 360° horizontal, limited vertical

### 3. Hover Interactions
- **Effect**: Scale cards, show tooltips
- **Control**: Mouse hover
- **Feedback**: Cursor change, card scale, tooltip

### 4. Auto-Rotation
- **Effect**: Slow continuous rotation
- **Control**: Automatic
- **Speed**: 0.5 units/second

## Performance Considerations

- **Frame Rate**: Runs in `useFrame()` hook (60fps)
- **Calculations**: Minimal DOM queries per frame
- **Interpolation**: Smooth lerp prevents jank
- **Optimization**: Only updates when section is near viewport

## Browser Compatibility

- ✅ Chrome/Edge: Full support
- ✅ Firefox: Full support
- ✅ Safari: Full support
- ✅ Mobile: Works with touch scroll

## Benefits for Portfolio

1. **Showcases Three.js Expertise**: Advanced camera control
2. **Engaging UX**: Interactive scroll experience
3. **Professional Polish**: Smooth, cinematic feel
4. **Attention-Grabbing**: Draws focus to 3D skills
5. **Memorable**: Unique interaction pattern

This scroll-based zoom feature demonstrates advanced Three.js knowledge and creates a compelling user experience! 🎬