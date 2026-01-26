import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Link, router } from 'expo-router';

// This is the HOME screen (index.tsx = "/" route)
// File location: app/(tabs)/index.tsx

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>
      <Text style={styles.subtitle}>Welcome to Expo Router!</Text>

      {/* ========== NAVIGATION EXAMPLES ========== */}

      {/* Method 1: Using <Link> component (like React Router) */}
      <Link href="/explore" style={styles.link}>
        <Text style={styles.linkText}>Go to Explore (Link)</Text>
      </Link>

      {/* Method 2: Link with asChild - wraps your component */}
      <Link href="/profile" asChild>
        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Go to Profile (asChild)</Text>
        </Pressable>
      </Link>

      {/* Method 3: Using router.push() - programmatic navigation */}
      <Pressable
        style={styles.button}
        onPress={() => router.push('/modal')}
      >
        <Text style={styles.buttonText}>Open Modal (router.push)</Text>
      </Pressable>

      {/* ========== KEY CONCEPTS ========== */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Key Navigation Methods:</Text>
        <Text style={styles.infoText}>• Link href="/path" - declarative</Text>
        <Text style={styles.infoText}>• router.push() - adds to history</Text>
        <Text style={styles.infoText}>• router.replace() - no back</Text>
        <Text style={styles.infoText}>• router.back() - go back</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  link: {
    marginVertical: 10,
    padding: 15,
  },
  linkText: {
    color: '#007AFF',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  infoBox: {
    marginTop: 40,
    padding: 15,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    width: '100%',
  },
  infoTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    marginVertical: 2,
  },
});
