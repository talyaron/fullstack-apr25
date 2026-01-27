import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

// This layout creates BOTTOM TABS
// Each Tabs.Screen corresponds to a file in this (tabs) folder

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#007AFF', // Blue when active
      }}
    >
      {/* Tab 1: Home - matches index.tsx */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />

      {/* Tab 2: Explore - matches explore.tsx */}
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />

      {/* Tab 3: Profile - matches profile.tsx */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
       
    </Tabs>
  );
}
