import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

// This is the EXPLORE screen
// File location: app/(tabs)/explore.tsx
// Route: "/explore"

export default function ExploreScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Explore Screen</Text>
      <Text style={styles.subtitle}>This is the second tab!</Text>

      {/* Navigate back to home */}
      <Link href="/" style={styles.link}>
        <Text style={styles.linkText}>← Back to Home</Text>
      </Link>

      {/* File structure explanation */}
      <View style={styles.codeBox}>
        <Text style={styles.codeTitle}>File Structure:</Text>
        <Text style={styles.code}>app/</Text>
        <Text style={styles.code}>  _layout.tsx    → Root layout</Text>
        <Text style={styles.code}>  modal.tsx      → /modal</Text>
        <Text style={styles.code}>  (tabs)/</Text>
        <Text style={styles.code}>    _layout.tsx  → Tab config</Text>
        <Text style={styles.code}>    index.tsx    → / (Home)</Text>
        <Text style={styles.code}>    explore.tsx  → /explore</Text>
        <Text style={styles.code}>    profile.tsx  → /profile</Text>
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
  codeBox: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#1e1e1e',
    borderRadius: 10,
    width: '100%',
  },
  codeTitle: {
    color: '#4EC9B0',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  code: {
    fontFamily: 'monospace',
    color: '#d4d4d4',
    fontSize: 12,
    lineHeight: 20,
  },
});
