import { View, Text, StyleSheet, Pressable } from 'react-native';
import { router } from 'expo-router';

// This is a MODAL screen
// It opens on top of everything (see _layout.tsx: presentation: 'modal')
// File location: app/modal.tsx
// Route: "/modal"

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal Screen</Text>
      <Text style={styles.subtitle}>
        This opens on top of the tabs!
      </Text>

      {/* Close modal - go back */}
      <Pressable
        style={styles.button}
        onPress={() => router.back()}
      >
        <Text style={styles.buttonText}>Close (router.back)</Text>
      </Pressable>

      {/* Dismiss modal specifically */}
      <Pressable
        style={[styles.button, styles.secondaryButton]}
        onPress={() => router.dismiss()}
      >
        <Text style={styles.secondaryButtonText}>
          Dismiss Modal (router.dismiss)
        </Text>
      </Pressable>

      {/* Info about modals */}
      <View style={styles.infoBox}>
        <Text style={styles.infoTitle}>Modal Setup:</Text>
        <Text style={styles.infoText}>
          In _layout.tsx, set:{'\n'}
          presentation: 'modal'
        </Text>
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
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 8,
    marginVertical: 8,
    minWidth: 250,
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
  },
  infoTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    fontFamily: 'monospace',
  },
});
