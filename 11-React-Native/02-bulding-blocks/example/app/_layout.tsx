import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { ItemCard } from '@/components/ItemCard/ItemCard';


const data = [
  { id: 1, title: 'Card One', description: 'This is the first card description.' },
  { id: 2, title: 'Card Two', description: 'This is the second card description.' },
  { id: 3, title: 'Card Three', description: 'This is the third card description.' },
  { id: 4, title: 'Card Four', description: 'This is the fourth card description.' },
  { id: 5, title: 'Card Five', description: 'This is the fifth card description.' },
  { id: 6, title: 'Card Six', description: 'This is the sixth card description.' },
  { id: 7, title: 'Card Seven', description: 'This is the seventh card description.' },
  { id: 8, title: 'Card Eight', description: 'This is the eighth card description.' },
  { id: 9, title: 'Card Nine', description: 'This is the ninth card description.' },
  { id: 10, title: 'Card Ten', description: 'This is the tenth card description.' },
  { id: 11, title: 'Card Eleven', description: 'This is the eleventh card description.' },
  { id: 12, title: 'Card Twelve', description: 'This is the twelfth card description.' },
];

export default function App() {
  const [isActive, setIsActive] = useState(false);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="light" />
       <View style={styles.header}>
          <Text style={styles.title}>React Native Styling</Text>
          <Text style={styles.subtitle}>Learning Example</Text>
        </View>
        {/* Header Section */}
       
       <FlatList
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <ItemCard title={item.title} description={item.description} />}
      />


      

        {/* Row of colored boxes */}
        <View style={styles.boxContainer}>
          <View style={[styles.box, { backgroundColor: '#FF6B6B' }]} />
          <View style={[styles.box, { backgroundColor: '#4ECDC4' }]} />
          <View style={[styles.box, { backgroundColor: '#45B7D1' }]} />
        </View>

        {/* Interactive button */}
        <TouchableOpacity
          style={[styles.button, isActive && styles.buttonActive]}
          onPress={() => setIsActive(!isActive)}
        >
          <Text style={styles.buttonText}>
            {isActive ? 'Active' : 'Tap Me'}
          </Text>
        </TouchableOpacity>

        {/* Info section */}
        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>Style Properties Used:</Text>
          <Text style={styles.infoText}>• StyleSheet.create()</Text>
          <Text style={styles.infoText}>• Flexbox (flex, flexDirection, justifyContent)</Text>
          <Text style={styles.infoText}>• Colors & backgrounds</Text>
          <Text style={styles.infoText}>• Borders & border radius</Text>
          <Text style={styles.infoText}>• Shadows & elevation</Text>
          <Text style={styles.infoText}>• Padding & margins</Text>
          <Text style={styles.infoText}>• Conditional styling</Text>
        </View>
    
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#6C63FF',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#ffb663',
    padding: 30,
    paddingTop: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  card: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  cardText: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    gap: 10,
  },
  box: {
    width: 80,
    height: 80,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  button: {
    backgroundColor: '#6C63FF',
    marginHorizontal: 20,
    marginVertical: 10,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonActive: {
    backgroundColor: '#4CAF50',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  infoSection: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6C63FF',
    marginBottom: 40,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 6,
    lineHeight: 22,
  },
});
