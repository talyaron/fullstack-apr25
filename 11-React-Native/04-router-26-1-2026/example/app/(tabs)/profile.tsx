import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router, usePathname } from 'expo-router';

// This is the PROFILE screen
// File location: app/(tabs)/profile.tsx
// Route: "/profile"

export default function ProfileScreen() {
  // usePathname hook - get current route path
  const pathname = usePathname();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Screen</Text>
      <Text style={styles.subtitle}>Third tab with hooks example</Text>

      {/* Show current path using hook */}
      <View style={styles.pathBox}>
        <Text style={styles.pathLabel}>Current path:</Text>
        <Text style={styles.pathValue}>{pathname}</Text>
      </View>

      {/* Navigation buttons */}
      <Pressable
        style={styles.button}
        onPress={() => router.push('/modal')}
      >
        <Text style={styles.buttonText}>Open Modal</Text>
      </Pressable>

      <Pressable
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.replace('/')}
      >
        <Text style={styles.secondaryButtonText}>
          Replace with Home (no back)
        </Text>
      </Pressable>

      {/* Hooks reference */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Useful Hooks:</Text>
        <Text style={styles.infoText}>• usePathname() - current path</Text>
        <Text style={styles.infoText}>• useRouter() - router object</Text>
        <Text style={styles.infoText}>• useLocalSearchParams() - URL params</Text>
        <Text style={styles.infoText}>• useSegments() - route segments</Text>
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
  pathBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#e8f4fd',
    borderRadius: 8,
  },
  pathLabel: {
    fontSize: 14,
    color: '#333',
  },
  pathValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#007AFF',
    marginLeft: 8,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#007AFF',
  },
  secondaryButtonText: {
    color: '#007AFF',
    fontSize: 14,
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
