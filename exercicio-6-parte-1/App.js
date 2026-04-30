import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// --- PASSO 2, 3 e 4: Componente da Tela de Comparativo ---
function TelaComparativo() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2196F3" />
      
      {/* Cabeçalho Customizado */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bancos de Dados na Nuvem</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.cardsRow}>
          
          {/* Card Supabase */}
          <View style={[styles.card, { borderColor: '#4CAF50' }]}>
            <View style={[styles.iconPlaceholder, { backgroundColor: '#1C1C1C' }]}>
               <Text style={{color: '#3ECF8E', fontWeight: 'bold'}}>S</Text>
            </View>
            <Text style={styles.cardTitle}>Supabase</Text>
            <Text style={styles.cardSubtitle}>SQL / PostgreSQL</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>• Tabelas relacionais</Text>
              <Text style={styles.bulletItem}>• Dashboard visual</Text>
              <Text style={styles.bulletItem}>• Auth integrado</Text>
            </View>
          </View>

          {/* Card MongoDB Atlas */}
          <View style={[styles.card, { borderColor: '#4CAF50' }]}>
            <View style={[styles.iconPlaceholder, { backgroundColor: '#E8F5E9' }]}>
               <Text style={{color: '#47A248', fontWeight: 'bold'}}>M</Text>
            </View>
            <Text style={styles.cardTitle}>MongoDB Atlas</Text>
            <Text style={styles.cardSubtitle}>NoSQL / Documentos</Text>
            <View style={styles.bulletList}>
              <Text style={styles.bulletItem}>• Documentos JSON</Text>
              <Text style={styles.bulletItem}>• Flexível</Text>
              <Text style={styles.bulletItem}>• API REST</Text>
            </View>
          </View>
          
        </View>

        {/* Botão Informativo Inferior */}
        <View style={styles.infoButton}>
          <Text style={styles.infoButtonText}>Ambos têm plano gratuito para estudos</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

// --- PASSO 1: Configuração do Stack Navigator ---
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TelaComparativo" component={TelaComparativo} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

// --- PASSO 5: Estilização (CSS-in-JS) ---
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    backgroundColor: '#2196F3',
    padding: 20,
    paddingTop: 40,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
  },
  cardsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  card: {
    backgroundColor: 'white',
    width: '48%',
    borderRadius: 12,
    borderWidth: 2,
    padding: 12,
    alignItems: 'center',
    // Shadow para iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Elevation para Android
    elevation: 3,
  },
  iconPlaceholder: {
    width: 40,
    height: 40,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center',
  },
  cardSubtitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#444',
    marginBottom: 10,
    textAlign: 'center',
  },
  bulletList: {
    alignSelf: 'flex-start',
  },
  bulletItem: {
    fontSize: 11,
    color: '#666',
    marginBottom: 4,
  },
  infoButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 25,
    width: '100%',
  },
  infoButtonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: '500',
  },
});