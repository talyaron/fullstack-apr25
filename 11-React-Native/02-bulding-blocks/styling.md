# React Native Styling Guide

React Native uses a JavaScript-based styling system that resembles CSS but with some key differences. This guide covers the fundamentals and best practices.

## Core Concepts

### StyleSheet API

React Native provides a StyleSheet API for creating optimized style objects:

```javascript
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

function MyComponent() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello World</Text>
    </View>
  );
}
```

Using `StyleSheet.create()` offers performance benefits by validating styles at compile time and creating a reference ID instead of repeatedly creating new objects.

### Inline Styles

You can also use inline styles directly, though this is less performant for complex styles:

```javascript
<View style={{ backgroundColor: '#fff', padding: 10 }}>
  <Text style={{ color: 'blue' }}>Inline styled text</Text>
</View>
```

### Combining Styles

Pass an array to combine multiple styles. Later styles override earlier ones:

```javascript
<Text style={[styles.base, styles.active, { color: 'red' }]}>
  Combined styles
</Text>
```

## Layout with Flexbox

React Native uses Flexbox for layout, with some default differences from web CSS.

### Default Behavior

- `flexDirection` defaults to `'column'` (not `'row'`)
- `alignContent` defaults to `'flex-start'`
- `flexShrink` defaults to `0`

### Common Flexbox Properties

```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,                    // Take all available space
    flexDirection: 'row',       // 'row', 'column', 'row-reverse', 'column-reverse'
    justifyContent: 'center',   // Main axis alignment
    alignItems: 'center',       // Cross axis alignment
    flexWrap: 'wrap',           // Allow wrapping
    gap: 10,                    // Space between items (RN 0.71+)
  },
  item: {
    flexGrow: 1,                // Grow to fill space
    flexShrink: 0,              // Don't shrink
    flexBasis: 100,             // Initial size before flex
  },
});
```

### Justify Content Values

- `flex-start` – Items at the start
- `flex-end` – Items at the end
- `center` – Items centered
- `space-between` – Equal space between items
- `space-around` – Equal space around items
- `space-evenly` – Even distribution

### Align Items Values

- `flex-start` – Align to cross-axis start
- `flex-end` – Align to cross-axis end
- `center` – Center on cross-axis
- `stretch` – Stretch to fill (default)
- `baseline` – Align text baselines

## Dimensions

### Fixed Dimensions

```javascript
const styles = StyleSheet.create({
  box: {
    width: 100,
    height: 100,
  },
});
```

### Percentage Dimensions

```javascript
const styles = StyleSheet.create({
  halfWidth: {
    width: '50%',
    height: '100%',
  },
});
```

### Responsive Dimensions

```javascript
import { Dimensions, useWindowDimensions } from 'react-native';

// Static (doesn't update on rotation)
const { width, height } = Dimensions.get('window');

// Hook-based (updates on dimension changes)
function ResponsiveComponent() {
  const { width, height } = useWindowDimensions();
  
  return (
    <View style={{ width: width * 0.8, height: height * 0.5 }}>
      {/* Content */}
    </View>
  );
}
```

## Common Style Properties

### View Styles

```javascript
const viewStyles = StyleSheet.create({
  example: {
    // Background
    backgroundColor: '#f0f0f0',
    opacity: 0.9,

    // Borders
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    borderTopLeftRadius: 16,

    // Spacing
    padding: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    margin: 10,
    marginTop: 20,

    // Shadows (iOS)
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,

    // Elevation (Android)
    elevation: 5,

    // Positioning
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,

    // Overflow
    overflow: 'hidden',
  },
});
```

### Text Styles

```javascript
const textStyles = StyleSheet.create({
  example: {
    // Font
    fontSize: 16,
    fontWeight: '600',        // '100' to '900', 'normal', 'bold'
    fontStyle: 'italic',
    fontFamily: 'System',

    // Color & Decoration
    color: '#333',
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',

    // Alignment
    textAlign: 'center',      // 'left', 'right', 'center', 'justify'
    textAlignVertical: 'center', // Android only

    // Spacing
    lineHeight: 24,
    letterSpacing: 0.5,

    // Transform
    textTransform: 'uppercase', // 'none', 'uppercase', 'lowercase', 'capitalize'
  },
});
```

### Image Styles

```javascript
const imageStyles = StyleSheet.create({
  example: {
    width: 200,
    height: 200,
    resizeMode: 'cover',      // 'cover', 'contain', 'stretch', 'center'
    borderRadius: 100,        // Circular image
    tintColor: 'blue',        // Color overlay
  },
});
```

## Platform-Specific Styles

### Using Platform Module

```javascript
import { Platform, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'ios' ? 20 : 0,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
});
```

### Platform-Specific Files

Create separate files for each platform:

- `styles.ios.js`
- `styles.android.js`

React Native automatically imports the correct one.

## Conditional Styling

```javascript
function Button({ disabled, primary }) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        primary && styles.primaryButton,
        disabled && styles.disabledButton,
      ]}
    >
      <Text style={[styles.text, disabled && styles.disabledText]}>
        Press Me
      </Text>
    </TouchableOpacity>
  );
}
```

## Dynamic Styling

```javascript
function DynamicBox({ size, color }) {
  return (
    <View
      style={[
        styles.box,
        {
          width: size,
          height: size,
          backgroundColor: color,
        },
      ]}
    />
  );
}
```

## Best Practices

- **Use StyleSheet.create()** – Always use the StyleSheet API for better performance and validation.
- **Avoid inline styles for complex components** – Extract styles to StyleSheet objects to prevent unnecessary re-renders.
- **Use semantic naming** – Name styles by purpose, not appearance (e.g., `errorText` instead of `redText`).
- **Organize styles** – Keep styles close to their components or create shared style files for consistency.
- **Use constants for design tokens** – Define colors, spacing, and typography in a central theme file.
- **Leverage flexbox** – Master flexbox for responsive layouts instead of fixed positioning.
- **Test on both platforms** – iOS and Android render differently; always test on both.

### Theme Example

```javascript
// theme.js
export const colors = {
  primary: '#007AFF',
  secondary: '#5856D6',
  background: '#F2F2F7',
  text: '#000000',
  textSecondary: '#8E8E93',
  error: '#FF3B30',
  success: '#34C759',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const typography = {
  h1: { fontSize: 32, fontWeight: '700' },
  h2: { fontSize: 24, fontWeight: '600' },
  body: { fontSize: 16, fontWeight: '400' },
  caption: { fontSize: 12, fontWeight: '400' },
};

// Usage
import { colors, spacing, typography } from './theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    padding: spacing.md,
  },
  title: {
    ...typography.h1,
    color: colors.text,
  },
});
```

## Summary

React Native styling combines the familiarity of CSS-like properties with the power of JavaScript. Key points to remember:

- Styles are JavaScript objects, not strings
- Flexbox is the primary layout system with `column` as default direction
- All dimensions are unitless (density-independent pixels)
- Use `StyleSheet.create()` for performance
- Handle platform differences explicitly
- Build a consistent design system with shared constants