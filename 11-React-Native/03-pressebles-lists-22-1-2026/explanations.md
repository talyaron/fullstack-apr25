# React Native Lists and Pressable Elements

A comprehensive guide to all list components and interactive/pressable elements in React Native.

---

## Part 1: List Elements

React Native provides several components for rendering lists of data, each optimized for different use cases.

### FlatList

The most commonly used list component. It renders only visible items for optimal performance with large datasets.

```javascript
import { FlatList, View, Text } from 'react-native';

const data = [
  { id: '1', title: 'Item 1' },
  { id: '2', title: 'Item 2' },
  { id: '3', title: 'Item 3' },
];

function MyList() {
  const renderItem = ({ item, index }) => (
    <View style={styles.item}>
      <Text>{item.title}</Text>
    </View>
  );

  return (
    <FlatList
      data={data}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
}
```

#### Key Props

| Prop | Type | Description |
|------|------|-------------|
| `data` | Array | The array of items to render |
| `renderItem` | Function | Returns the component for each item. Receives `{ item, index, separators }` |
| `keyExtractor` | Function | Extracts unique key for each item |
| `horizontal` | Boolean | Renders list horizontally |
| `numColumns` | Number | Multiple columns (only works with `horizontal={false}`) |
| `initialNumToRender` | Number | How many items to render initially |
| `maxToRenderPerBatch` | Number | Max items rendered per batch |
| `windowSize` | Number | Determines render window size (default: 21) |
| `removeClippedSubviews` | Boolean | Unmount off-screen components (Android) |
| `inverted` | Boolean | Reverses scroll direction |
| `onEndReached` | Function | Called when scroll reaches end |
| `onEndReachedThreshold` | Number | How far from end to trigger `onEndReached` (0-1) |
| `onRefresh` | Function | Called on pull-to-refresh |
| `refreshing` | Boolean | Whether currently refreshing |
| `ListHeaderComponent` | Component | Rendered at the top |
| `ListFooterComponent` | Component | Rendered at the bottom |
| `ListEmptyComponent` | Component | Rendered when list is empty |
| `ItemSeparatorComponent` | Component | Rendered between items |
| `getItemLayout` | Function | Optimization for fixed-size items |
| `extraData` | Any | Triggers re-render when changed |

#### Advanced FlatList Example

```javascript
function AdvancedList() {
  const [data, setData] = useState(initialData);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    const newData = await fetchData();
    setData(newData);
    setRefreshing(false);
  };

  const loadMore = () => {
    // Load more items when reaching end
  };

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => <ListItem item={item} />}
      keyExtractor={(item) => item.id}
      
      // Pull to refresh
      onRefresh={onRefresh}
      refreshing={refreshing}
      
      // Infinite scroll
      onEndReached={loadMore}
      onEndReachedThreshold={0.5}
      
      // Header & Footer
      ListHeaderComponent={<Header />}
      ListFooterComponent={<LoadingIndicator />}
      ListEmptyComponent={<EmptyState />}
      
      // Separator
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      
      // Performance optimization for fixed height items
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
      
      // Re-render when this changes
      extraData={selectedId}
    />
  );
}
```

---

### SectionList

For lists with grouped data organized into sections with headers.

```javascript
import { SectionList, View, Text } from 'react-native';

const DATA = [
  {
    title: 'Fruits',
    data: ['Apple', 'Banana', 'Orange'],
  },
  {
    title: 'Vegetables',
    data: ['Carrot', 'Broccoli', 'Spinach'],
  },
];

function MySectionList() {
  return (
    <SectionList
      sections={DATA}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text>{item}</Text>
        </View>
      )}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.header}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      )}
      renderSectionFooter={({ section }) => (
        <Text>{section.data.length} items</Text>
      )}
    />
  );
}
```

#### Key Props

| Prop | Type | Description |
|------|------|-------------|
| `sections` | Array | Array of section objects with `title` and `data` |
| `renderItem` | Function | Renders each item |
| `renderSectionHeader` | Function | Renders section headers |
| `renderSectionFooter` | Function | Renders section footers |
| `stickySectionHeadersEnabled` | Boolean | Headers stick to top while scrolling |
| `SectionSeparatorComponent` | Component | Rendered between sections |

#### SectionList with Sticky Headers

```javascript
function ContactList() {
  const contacts = [
    { title: 'A', data: ['Alice', 'Adam', 'Andrew'] },
    { title: 'B', data: ['Bob', 'Beth', 'Brian'] },
    { title: 'C', data: ['Charlie', 'Carol'] },
  ];

  return (
    <SectionList
      sections={contacts}
      keyExtractor={(item, index) => item + index}
      renderItem={({ item }) => <ContactItem name={item} />}
      renderSectionHeader={({ section: { title } }) => (
        <View style={styles.stickyHeader}>
          <Text style={styles.stickyHeaderText}>{title}</Text>
        </View>
      )}
      stickySectionHeadersEnabled={true}
      SectionSeparatorComponent={() => <View style={styles.sectionGap} />}
    />
  );
}
```

---

### VirtualizedList

The base implementation for FlatList and SectionList. Use when you need more control or have non-array data.

```javascript
import { VirtualizedList } from 'react-native';

function MyVirtualizedList() {
  const getItem = (data, index) => ({
    id: Math.random().toString(12).substring(0),
    title: `Item ${index + 1}`,
  });

  const getItemCount = (data) => 1000;

  return (
    <VirtualizedList
      initialNumToRender={10}
      renderItem={({ item }) => <Item title={item.title} />}
      keyExtractor={(item) => item.id}
      getItemCount={getItemCount}
      getItem={getItem}
    />
  );
}
```

#### Key Props

| Prop | Type | Description |
|------|------|-------------|
| `getItem` | Function | Returns item at given index |
| `getItemCount` | Function | Returns total number of items |
| `data` | Any | Raw data (passed to getItem/getItemCount) |

---

### ScrollView

For scrollable content when you don't need virtualization. Renders all children at once.

```javascript
import { ScrollView, View, Text } from 'react-native';

function MyScrollView() {
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      horizontal={false}
      showsVerticalScrollIndicator={true}
    >
      <View style={styles.item}><Text>Item 1</Text></View>
      <View style={styles.item}><Text>Item 2</Text></View>
      <View style={styles.item}><Text>Item 3</Text></View>
      {/* All children render immediately */}
    </ScrollView>
  );
}
```

#### Key Props

| Prop | Type | Description |
|------|------|-------------|
| `horizontal` | Boolean | Horizontal scrolling |
| `pagingEnabled` | Boolean | Snap to pages |
| `scrollEnabled` | Boolean | Enable/disable scrolling |
| `showsVerticalScrollIndicator` | Boolean | Show vertical scrollbar |
| `showsHorizontalScrollIndicator` | Boolean | Show horizontal scrollbar |
| `bounces` | Boolean | Bounce effect at edges (iOS) |
| `overScrollMode` | String | Over-scroll behavior (Android) |
| `contentContainerStyle` | Style | Style for inner content container |
| `stickyHeaderIndices` | Array | Indices of sticky children |
| `keyboardShouldPersistTaps` | String | Keyboard behavior on tap |
| `refreshControl` | Component | Pull-to-refresh component |
| `onScroll` | Function | Called on scroll |
| `scrollEventThrottle` | Number | Scroll event frequency (ms) |
| `snapToInterval` | Number | Snap to intervals |
| `snapToOffsets` | Array | Snap to specific offsets |
| `decelerationRate` | Number/String | Scroll deceleration rate |

#### ScrollView with Paging

```javascript
function ImageCarousel({ images }) {
  const { width } = useWindowDimensions();

  return (
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      decelerationRate="fast"
      snapToInterval={width}
      snapToAlignment="center"
    >
      {images.map((image, index) => (
        <Image
          key={index}
          source={{ uri: image }}
          style={{ width, height: 300 }}
        />
      ))}
    </ScrollView>
  );
}
```

#### ScrollView with Pull-to-Refresh

```javascript
import { ScrollView, RefreshControl } from 'react-native';

function RefreshableScrollView() {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchData();
    setRefreshing(false);
  };

  return (
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={['#007AFF']}        // Android
          tintColor="#007AFF"         // iOS
          title="Pull to refresh"    // iOS
        />
      }
    >
      {/* Content */}
    </ScrollView>
  );
}
```

---

### When to Use Each List Component

| Component | Use Case |
|-----------|----------|
| **FlatList** | Long lists of similar items, infinite scroll, performance-critical |
| **SectionList** | Grouped data with headers (contacts, settings) |
| **VirtualizedList** | Custom data structures, non-array data sources |
| **ScrollView** | Small content, mixed content types, forms, non-list scrollable content |

---

## Part 2: Pressable Elements

React Native provides several components for handling touch interactions.

### Pressable

The modern, flexible, and recommended approach for handling press interactions. Introduced in React Native 0.63.

```javascript
import { Pressable, Text, StyleSheet } from 'react-native';

function MyButton() {
  return (
    <Pressable
      onPress={() => console.log('Pressed!')}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
    >
      {({ pressed }) => (
        <Text style={[styles.text, pressed && styles.textPressed]}>
          {pressed ? 'Pressed!' : 'Press Me'}
        </Text>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
  },
  buttonPressed: {
    backgroundColor: '#0056b3',
    opacity: 0.8,
  },
  text: {
    color: 'white',
    textAlign: 'center',
  },
  textPressed: {
    color: '#ccc',
  },
});
```

#### Key Props

| Prop | Type | Description |
|------|------|-------------|
| `onPress` | Function | Called on press release |
| `onPressIn` | Function | Called when press starts |
| `onPressOut` | Function | Called when press ends |
| `onLongPress` | Function | Called on long press |
| `delayLongPress` | Number | Long press delay (ms, default: 500) |
| `disabled` | Boolean | Disables all interactions |
| `hitSlop` | Number/Object | Extends touchable area |
| `pressRetentionOffset` | Object | How far touch can move before deactivating |
| `android_ripple` | Object | Android ripple effect configuration |
| `android_disableSound` | Boolean | Disable Android press sound |
| `unstable_pressDelay` | Number | Delay before `onPressIn` fires |

#### Pressable with HitSlop and Ripple

```javascript
function IconButton({ icon, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      android_ripple={{
        color: 'rgba(0, 0, 0, 0.2)',
        borderless: true,
        radius: 24,
      }}
      style={({ pressed }) => ({
        opacity: pressed ? 0.5 : 1,
        padding: 12,
      })}
    >
      <Icon name={icon} size={24} />
    </Pressable>
  );
}
```

#### Pressable States

```javascript
function StatefulButton() {
  return (
    <Pressable
      onPressIn={() => console.log('Press started')}
      onPressOut={() => console.log('Press ended')}
      onPress={() => console.log('Press complete')}
      onLongPress={() => console.log('Long press!')}
      delayLongPress={800}
    >
      {({ pressed, hovered, focused }) => (
        <View
          style={[
            styles.button,
            pressed && styles.pressed,
            hovered && styles.hovered,  // Web/desktop
            focused && styles.focused,   // Accessibility
          ]}
        >
          <Text>Interactive Button</Text>
        </View>
      )}
    </Pressable>
  );
}
```

---

### TouchableOpacity

Reduces opacity on press. Simple and widely used, but Pressable is now preferred.

```javascript
import { TouchableOpacity, Text } from 'react-native';

function OpacityButton() {
  return (
    <TouchableOpacity
      onPress={() => console.log('Pressed!')}
      activeOpacity={0.7}
      style={styles.button}
    >
      <Text style={styles.text}>Press Me</Text>
    </TouchableOpacity>
  );
}
```

#### Key Props

| Prop | Type | Description |
|------|------|-------------|
| `activeOpacity` | Number | Opacity when pressed (0-1, default: 0.2) |
| `onPress` | Function | Called on press |
| `onLongPress` | Function | Called on long press |
| `disabled` | Boolean | Disables interactions |
| `hitSlop` | Object | Extends touchable area |

---

### TouchableHighlight

Shows an underlay color on press. Good for list items.

```javascript
import { TouchableHighlight, Text, View } from 'react-native';

function HighlightButton() {
  return (
    <TouchableHighlight
      onPress={() => console.log('Pressed!')}
      underlayColor="#DDDDDD"
      activeOpacity={0.9}
      style={styles.button}
    >
      <View>
        <Text>Press Me</Text>
      </View>
    </TouchableHighlight>
  );
}
```

#### Key Props

| Prop | Type | Description |
|------|------|-------------|
| `underlayColor` | Color | Background color when pressed |
| `activeOpacity` | Number | Opacity of content when pressed |
| `onShowUnderlay` | Function | Called when underlay shows |
| `onHideUnderlay` | Function | Called when underlay hides |

**Note:** TouchableHighlight must have exactly one child component (wrap multiple children in a View).

---

### TouchableWithoutFeedback

Handles press without visual feedback. Use sparingly as users expect visual response.

```javascript
import { TouchableWithoutFeedback, View } from 'react-native';

function InvisibleTouchable() {
  return (
    <TouchableWithoutFeedback
      onPress={() => console.log('Pressed!')}
    >
      <View style={styles.area}>
        {/* Content */}
      </View>
    </TouchableWithoutFeedback>
  );
}
```

**Note:** Must have exactly one child. Often used for dismissing keyboards or modals.

```javascript
import { TouchableWithoutFeedback, Keyboard, View } from 'react-native';

function DismissKeyboard({ children }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={{ flex: 1 }}>{children}</View>
    </TouchableWithoutFeedback>
  );
}
```

---

### TouchableNativeFeedback (Android Only)

Uses Android's native ripple effect.

```javascript
import { TouchableNativeFeedback, View, Text, Platform } from 'react-native';

function NativeButton() {
  if (Platform.OS !== 'android') {
    return <TouchableOpacity {...props} />;
  }

  return (
    <TouchableNativeFeedback
      onPress={() => console.log('Pressed!')}
      background={TouchableNativeFeedback.Ripple('#rgba(0,0,0,0.2)', false)}
      useForeground={true}
    >
      <View style={styles.button}>
        <Text>Native Ripple</Text>
      </View>
    </TouchableNativeFeedback>
  );
}
```

#### Key Props

| Prop | Type | Description |
|------|------|-------------|
| `background` | Object | Ripple configuration |
| `useForeground` | Boolean | Ripple over content (API 23+) |

#### Background Types

```javascript
// Ripple effect (API 21+)
TouchableNativeFeedback.Ripple(color, borderless, radius)

// Bounded ripple
TouchableNativeFeedback.Ripple('rgba(0,0,0,0.2)', false)

// Borderless ripple
TouchableNativeFeedback.Ripple('rgba(0,0,0,0.2)', true)

// Selective drawable (older APIs)
TouchableNativeFeedback.SelectableBackground()
TouchableNativeFeedback.SelectableBackgroundBorderless()
```

---

### Button

A basic button component. Limited customization but quick to implement.

```javascript
import { Button, View } from 'react-native';

function SimpleButton() {
  return (
    <View>
      <Button
        title="Press Me"
        onPress={() => console.log('Pressed!')}
        color="#007AFF"
        disabled={false}
      />
    </View>
  );
}
```

#### Key Props

| Prop | Type | Description |
|------|------|-------------|
| `title` | String | Button text (required) |
| `onPress` | Function | Press handler (required) |
| `color` | Color | Button color |
| `disabled` | Boolean | Disable button |
| `accessibilityLabel` | String | Accessibility label |

**Limitations:** Cannot customize shape, padding, text style, or add icons. Use Pressable for custom buttons.

---

### Comparison Table

| Component | Visual Feedback | Customization | Recommended |
|-----------|-----------------|---------------|-------------|
| **Pressable** | Fully customizable | High | ✅ Yes |
| **TouchableOpacity** | Opacity change | Medium | For simple cases |
| **TouchableHighlight** | Underlay color | Medium | List items |
| **TouchableWithoutFeedback** | None | Low | Special cases only |
| **TouchableNativeFeedback** | Native ripple | Medium | Android only |
| **Button** | Platform default | Very low | Quick prototypes |

---

## Creating Custom Pressable Components

### Reusable Button Component

```javascript
import { Pressable, Text, StyleSheet, ActivityIndicator } from 'react-native';

function CustomButton({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || loading}
      style={({ pressed }) => [
        styles.button,
        styles[variant],
        styles[size],
        pressed && styles.pressed,
        disabled && styles.disabled,
      ]}
    >
      {({ pressed }) => (
        <>
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              {icon && <View style={styles.icon}>{icon}</View>}
              <Text
                style={[
                  styles.text,
                  styles[`${variant}Text`],
                  styles[`${size}Text`],
                ]}
              >
                {title}
              </Text>
            </>
          )}
        </>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  },
  
  // Variants
  primary: {
    backgroundColor: '#007AFF',
  },
  secondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  danger: {
    backgroundColor: '#FF3B30',
  },
  
  // Sizes
  small: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  medium: {
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  large: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  
  // States
  pressed: {
    opacity: 0.8,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
  
  // Text
  text: {
    fontWeight: '600',
  },
  primaryText: {
    color: 'white',
  },
  secondaryText: {
    color: '#007AFF',
  },
  dangerText: {
    color: 'white',
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
  
  icon: {
    marginRight: 8,
  },
});
```

### Pressable List Item

```javascript
function ListItem({ title, subtitle, onPress, rightElement }) {
  return (
    <Pressable
      onPress={onPress}
      android_ripple={{ color: 'rgba(0,0,0,0.1)' }}
      style={({ pressed }) => [
        styles.listItem,
        pressed && Platform.OS === 'ios' && styles.listItemPressed,
      ]}
    >
      <View style={styles.listItemContent}>
        <Text style={styles.listItemTitle}>{title}</Text>
        {subtitle && (
          <Text style={styles.listItemSubtitle}>{subtitle}</Text>
        )}
      </View>
      {rightElement}
    </Pressable>
  );
}
```

---

## Accessibility Considerations

Always include accessibility props for pressable elements:

```javascript
<Pressable
  onPress={handlePress}
  accessible={true}
  accessibilityLabel="Submit form"
  accessibilityHint="Double tap to submit your information"
  accessibilityRole="button"
  accessibilityState={{
    disabled: isDisabled,
    selected: isSelected,
    busy: isLoading,
  }}
>
  <Text>Submit</Text>
</Pressable>
```

### Common Accessibility Props

| Prop | Description |
|------|-------------|
| `accessible` | Groups children as single selectable component |
| `accessibilityLabel` | Text read by screen reader |
| `accessibilityHint` | Additional context about action result |
| `accessibilityRole` | Semantic role (button, link, checkbox, etc.) |
| `accessibilityState` | Current state (disabled, selected, checked, busy) |
| `accessibilityActions` | Custom actions for assistive technologies |

---

## Summary

**Lists:**
- Use **FlatList** for most list needs with large datasets
- Use **SectionList** for grouped data with headers
- Use **ScrollView** for small, mixed content
- Use **VirtualizedList** for custom data structures

**Pressables:**
- Use **Pressable** as the default choice for all interactive elements
- Use **TouchableOpacity** for simple opacity feedback
- Use **TouchableHighlight** for list items with underlay
- Avoid **TouchableWithoutFeedback** except for special cases
- Use **Button** only for quick prototypes