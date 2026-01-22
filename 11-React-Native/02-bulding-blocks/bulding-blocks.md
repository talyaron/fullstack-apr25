# The Basic Building Blocks of React Native

React Native allows you to build mobile apps using only JavaScript and React. It uses the same fundamental UI building blocks as regular iOS and Android apps, but you put those blocks together using JavaScript.

---

## 1. Core Components
React Native provides a set of built-in components that map directly to the native UI elements of the platform you are building for.

| React Native Component | Native Equivalent (iOS/Android) | Web Equivalent (HTML) |
| :--- | :--- | :--- |
| **`<View>`** | `UIView` / `ViewGroup` | `<div>` |
| **`<Text>`** | `UITextView` / `TextView` | `<p>` or `<span>` |
| **`<Image>`** | `UIImageView` / `ImageView` | `<img>` |
| **`<ScrollView>`** | `UIScrollView` / `ScrollView` | `<div>` with overflow |
| **`<TextInput>`** | `UITextField` / `EditText` | `<input type="text">` |



---

## 2. JSX (JavaScript XML)
JSX is a syntax extension that allows you to write your UI structure in a way that looks like HTML, but inside your JavaScript file. It makes the code more readable and easier to visualize.

---

## 3. Props (Properties)
Props are the configuration options for components. They are passed from a parent component to a child component to tell it how it should look or behave. 
* Props are **immutable** (read-only) for the component that receives them.

---

## 4. State
State is the internal "memory" of a component. Use state to track data that changes over time (like a user's input, a toggle switch, or data fetched from an API). When state updates, the component automatically re-renders.

---

## 5. Styling & Flexbox
React Native does not use CSS. Instead, it uses a JavaScript-based styling system.
* **Flexbox:** Used to handle layouts across different screen sizes.
* **Key Difference:** In React Native, `flexDirection` defaults to `column` (vertical), whereas on the web it defaults to `row`.



---

## 6. The Native Bridge & Fabric
React Native works by running your JavaScript code on a separate thread. 
* **The Bridge:** Historically, this was the communication layer that sent JSON messages back and forth between JavaScript and the Native side.
* **Fabric:** The modern rendering system that allows for more direct, synchronous communication for better performance.

---

## 7. Simple Implementation Example
Here is a basic example combining these concepts:

```javascript
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';

const WelcomeApp = () => {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome, {name || 'Guest'}!</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        onChangeText={text => setName(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
});

export default WelcomeApp;