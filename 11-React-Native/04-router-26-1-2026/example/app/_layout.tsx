import { Stack } from 'expo-router';

// This is the ROOT layout - it wraps your entire app
// Stack = screens stack on top of each other (like a deck of cards)

export default function RootLayout() {
  return (
    <Stack>
      {/* The (tabs) folder contains our tab navigation */}
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
      />

      {/* Modal screen - opens on top of everything */}
      <Stack.Screen
        name="modal"
        options={{
          presentation: 'modal',
          title: 'Modal Example'
        }}
      />
    </Stack>
  );
}
