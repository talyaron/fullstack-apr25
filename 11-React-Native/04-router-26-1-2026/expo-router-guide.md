# Expo Router: A Complete Guide for React Developers

Welcome! Since you're already proficient in React and familiar with React Native basics, this guide will help you understand Expo Router by building on what you already know—especially if you've used React Router.

---

## What is Expo Router?

Expo Router is a **file-based routing system** for React Native and web applications built with Expo. Think of it as Next.js routing, but for mobile apps.

**Key insight:** If you know Next.js App Router or file-based routing from frameworks like Remix, Expo Router will feel very familiar.

---

## Why Expo Router?

Before Expo Router, React Native navigation typically meant using React Navigation with manual route configuration. Expo Router simplifies this by:

| Traditional React Navigation | Expo Router |
|------------------------------|-------------|
| Manual route configuration | File-based (automatic) |
| Separate navigation setup | Routes = folder structure |
| Complex nested navigators | Intuitive layout files |
| No deep linking by default | Deep linking built-in |

---

## Getting Started

### Installation

```bash
npx create-expo-app@latest --template tabs
```

Or add to an existing project:

```bash
npx expo install expo-router expo-linking expo-constants expo-status-bar
```

### Project Structure

Your `app/` directory **is** your routing structure:

```
app/
├── _layout.tsx      # Root layout (like App.tsx wrapper)
├── index.tsx        # Home screen (/)
├── about.tsx        # About screen (/about)
├── settings/
│   ├── _layout.tsx  # Settings section layout
│   ├── index.tsx    # Settings home (/settings)
│   └── profile.tsx  # Profile screen (/settings/profile)
└── [id].tsx         # Dynamic route (/:id)
```

---

## Core Concepts

### 1. Basic Routes

Every file in `app/` becomes a route. The filename = the URL path.

```tsx
// app/index.tsx → route: "/"
export default function HomeScreen() {
  return (
    <View>
      <Text>Home Screen</Text>
    </View>
  );
}
```

```tsx
// app/about.tsx → route: "/about"
export default function AboutScreen() {
  return (
    <View>
      <Text>About Screen</Text>
    </View>
  );
}
```

### 2. Navigation Between Screens

**Using the `Link` component** (similar to React Router's `<Link>`):

```tsx
import { Link } from 'expo-router';

export default function HomeScreen() {
  return (
    <View>
      <Text>Home</Text>
      
      {/* Simple navigation */}
      <Link href="/about">
        <Text>Go to About</Text>
      </Link>
      
      {/* With styles */}
      {/* Creates a navigational link component that renders its child element as a clickable link to the "/settings" route. The `asChild` prop merges the Link's functionality with the child component instead of wrapping it in an additional element, useful for maintaining proper semantic HTML structure and avoiding nested interactive elements. */}
      <Link href="/settings" asChild>
        <Pressable>
          <Text>Open Settings</Text>
        </Pressable>
      </Link>
    </View>
  );
}
```

**Using the `router` object** (imperative navigation):

```tsx
import { router } from 'expo-router';

function handleLogin() {
  // After login logic...
  
  router.push('/dashboard');      // Add to history stack
  router.replace('/dashboard');   // Replace current screen (no back)
  router.back();                  // Go back
  router.navigate('/home');       // Smart navigation (won't duplicate)
}
```

**Comparison with React:**

| React Router | Expo Router |
|--------------|-------------|
| `<Link to="/path">` | `<Link href="/path">` |
| `useNavigate()` | `router` from 'expo-router' |
| `navigate('/path')` | `router.push('/path')` |
| `navigate(-1)` | `router.back()` |

---

### 3. Layouts (`_layout.tsx`)

Layouts wrap child routes—similar to how you might use `<Outlet>` in React Router, but more powerful.

**Root Layout Example:**

```tsx
// app/_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ title: 'Home' }} 
      />
      <Stack.Screen 
        name="about" 
        options={{ title: 'About Us' }} 
      />
    </Stack>
  );
}
```

**Available Layout Types:**

```tsx
import { Stack, Tabs, Drawer } from 'expo-router';

// Stack Navigator (screens stack on top of each other)
<Stack />

// Tab Navigator (bottom tabs)
<Tabs />

// Drawer Navigator (side menu)
<Drawer />
```

---

### 4. Tab Navigation

```tsx
// app/(tabs)/_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: '#007AFF' }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
```

**Folder structure for tabs:**

```
app/
├── (tabs)/
│   ├── _layout.tsx    # Tab navigator setup
│   ├── index.tsx      # First tab (Home)
│   ├── explore.tsx    # Second tab (Explore)
│   └── profile.tsx    # Third tab (Profile)
└── _layout.tsx        # Root layout
```

---

### 5. Dynamic Routes

Use square brackets `[param]` for dynamic segments—just like Next.js!

```tsx
// app/user/[id].tsx → matches /user/123, /user/abc, etc.
import { useLocalSearchParams } from 'expo-router';

export default function UserProfile() {
  const { id } = useLocalSearchParams();
  
  return (
    <View>
      <Text>User ID: {id}</Text>
    </View>
  );
}
```

**Navigating to dynamic routes:**

```tsx
// These all work:
<Link href="/user/123">View User</Link>
<Link href={{ pathname: '/user/[id]', params: { id: '123' } }}>View User</Link>

router.push('/user/123');
router.push({ pathname: '/user/[id]', params: { id: '123' } });
```

**Catch-all routes:**

```tsx
// app/[...missing].tsx → catches all unmatched routes (404 page)
export default function NotFound() {
  return <Text>Page not found!</Text>;
}
```

---

### 6. Route Groups

Parentheses `(groupName)` create logical groupings without affecting the URL.

```
app/
├── (auth)/
│   ├── _layout.tsx    # Auth-specific layout (no header, etc.)
│   ├── login.tsx      # /login (not /auth/login!)
│   └── register.tsx   # /register
├── (app)/
│   ├── _layout.tsx    # Main app layout (with header, tabs)
│   ├── index.tsx      # /
│   └── settings.tsx   # /settings
└── _layout.tsx
```

**Use cases:**
- Different layouts for authenticated vs. unauthenticated users
- Organizing code without affecting URLs
- Applying different navigation patterns to route groups

---

### 7. Passing Data Between Screens

**Via URL params:**

```tsx
// Sending
router.push({
  pathname: '/details',
  params: { name: 'John', age: '25' }
});

// Receiving (app/details.tsx)
import { useLocalSearchParams } from 'expo-router';

export default function Details() {
  const { name, age } = useLocalSearchParams();
  return <Text>Hello {name}, age {age}</Text>;
}
```

**Via global state** (recommended for complex data):

Use React Context, Zustand, or Redux as you normally would in React.

---

### 8. Screen Options

Configure headers and screen behavior:

```tsx
// Static options (in the screen file)
export default function ProfileScreen() {
  return <View>...</View>;
}

// Export options from the screen file
export const unstable_settings = {
  initialRouteName: 'index',
};

// Or configure in layout
<Stack.Screen
  name="profile"
  options={{
    title: 'My Profile',
    headerShown: true,
    headerStyle: { backgroundColor: '#f4511e' },
    headerTintColor: '#fff',
    presentation: 'modal', // Opens as modal
  }}
/>
```

**Dynamic options using `useNavigation`:**

```tsx
import { useNavigation } from 'expo-router';
import { useLayoutEffect } from 'react';

export default function ProductScreen() {
  const navigation = useNavigation();
  const { name } = useLocalSearchParams();

  useLayoutEffect(() => {
    navigation.setOptions({
      title: name || 'Product',
    });
  }, [navigation, name]);

  return <View>...</View>;
}
```

---

### 9. Authentication Flow Pattern

A common pattern for handling auth state:

```tsx
// app/_layout.tsx
import { Stack, useRouter, useSegments } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';

export default function RootLayout() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;

    const inAuthGroup = segments[0] === '(auth)';

    if (!user && !inAuthGroup) {
      // Redirect to login if not authenticated
      router.replace('/login');
    } else if (user && inAuthGroup) {
      // Redirect to home if authenticated but on auth screen
      router.replace('/');
    }
  }, [user, segments, isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Stack>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(app)" options={{ headerShown: false }} />
    </Stack>
  );
}
```

---

### 10. Modals

Present screens as modals:

```tsx
// app/_layout.tsx
<Stack>
  <Stack.Screen name="index" />
  <Stack.Screen
    name="modal"
    options={{
      presentation: 'modal',
      headerShown: false,
    }}
  />
</Stack>
```

```tsx
// Navigate to modal
router.push('/modal');

// Close modal (go back)
router.back();
// or
router.dismiss(); // Specifically for modals
```

---

## Hooks Reference

| Hook | Purpose | React Router Equivalent |
|------|---------|------------------------|
| `useRouter()` | Get router object for navigation | `useNavigate()` |
| `useLocalSearchParams()` | Get current route params | `useParams()` |
| `useGlobalSearchParams()` | Get params from any segment | - |
| `useSegments()` | Get current route segments | - |
| `usePathname()` | Get current pathname | `useLocation().pathname` |
| `useFocusEffect()` | Run effect when screen focuses | - |
| `useNavigation()` | Access navigation object | `useNavigation()` (React Navigation) |

---

## Common Patterns

### Back Button Handling

```tsx
import { Stack, router } from 'expo-router';

<Stack.Screen
  name="form"
  options={{
    headerLeft: () => (
      <Button title="Cancel" onPress={() => router.back()} />
    ),
  }}
/>
```

### Preventing Back Navigation

```tsx
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export default function ImportantForm() {
  const navigation = useNavigation();

  useEffect(() => {
    const unsubscribe = navigation.addListener('beforeRemove', (e) => {
      // Prevent default back behavior
      e.preventDefault();
      
      // Show confirmation dialog
      Alert.alert('Discard changes?', 'You have unsaved changes.', [
        { text: 'Stay', style: 'cancel' },
        { text: 'Discard', style: 'destructive', onPress: () => navigation.dispatch(e.data.action) },
      ]);
    });

    return unsubscribe;
  }, [navigation]);

  return <View>...</View>;
}
```

### Typed Routes (TypeScript)

```tsx
// app/_layout.tsx
export type RootStackParamList = {
  index: undefined;
  'user/[id]': { id: string };
  settings: { section?: string };
};

// Usage with type safety
router.push<'/user/[id]'>({
  pathname: '/user/[id]',
  params: { id: '123' }
});
```

---

## Quick Tips

1. **`index.tsx`** is always the default route for a folder (like `index.html`)

2. **Prefixes matter:**
   - `_layout.tsx` → Layout wrapper (not a route)
   - `[param].tsx` → Dynamic segment
   - `(group)/` → Route group (doesn't affect URL)
   - `[...catchAll].tsx` → Catch-all route

3. **Use `asChild` with Link** when you want custom components:
   ```tsx
   <Link href="/profile" asChild>
     <Pressable><Text>Profile</Text></Pressable>
   </Link>
   ```

4. **`router.replace()` vs `router.push()`:**
   - `push`: Adds to history (user can go back)
   - `replace`: Replaces current (user can't go back to it)

5. **Debug routes** by logging segments:
   ```tsx
   const segments = useSegments();
   console.log('Current route:', segments);
   ```

---

## Exercise Ideas

1. **Basic:** Create a 3-tab app with Home, Search, and Profile tabs
2. **Intermediate:** Add a dynamic route `/post/[id]` that shows post details
3. **Advanced:** Implement an auth flow with protected routes

---

## Resources

- [Official Expo Router Docs](https://docs.expo.dev/router/introduction/)
- [Expo Router GitHub](https://github.com/expo/router)
- [React Navigation Docs](https://reactnavigation.org/) (underlying navigation library)

---

Happy routing! 🚀
