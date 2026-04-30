import React, { useEffect, useState } from 'react';
import { 
  View, Text, FlatList, StyleSheet, SafeAreaView, 
  TouchableOpacity, ActivityIndicator, StatusBar 
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { createClient } from '@supabase/supabase-js';

// --- 1. CONEXÃO COM O MUNDO EXTERIOR ---
// Substitua as strings abaixo pelas chaves que você copiou do painel
const SUPABASE_URL = 'https://hsltcerernhqjperuchv.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhzbHRjZXJlcm5ocWpwZXJ1Y2h2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc1NjAyNjcsImV4cCI6MjA5MzEzNjI2N30.X67KpMexfafTlvCDFOk9S-YL15eMLrf5s88jAwLbVKY';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

// --- 2. TELA DE LISTAGEM ---
function ListaScreen() {
  const [produtos, setProdutos] = useState([]);
  const [carregando, setCarregando] = useState(true);

  // Função que vai buscar os dados no banco
  const buscarDados = async () => {
    try {
      setCarregando(true);
      // Aqui dizemos: "Supabase, selecione tudo (*) da tabela 'produtos'"
      const { data, error } = await supabase.from('produtos').select('*');

      if (error) throw error; // Se houver erro, pula para o catch
      setProdutos(data);      // Se deu certo, guarda os dados no estado
    } catch (error) {
      alert("Erro ao buscar: " + error.message);
    } finally {
      setCarregando(false);
    }
  };

  // Dispara a busca assim que a tela abre
  useEffect(() => {
    buscarDados();
  }, []);

  // Como cada item da lista será desenhado
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.nome}>{item.nome}</Text>
      <Text style={styles.preco}>R$ {item.preco}</Text>
      <Text style={styles.categoria}>Eletrônicos</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Cabeçalho Azul */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Produtos (Supabase)</Text>
      </View>

      <View style={styles.badge}>
        <Text style={styles.badgeText}>Conectado ao Supabase</Text>
      </View>

      {carregando ? (
        <ActivityIndicator size="large" color="#2196F3" style={{ marginTop: 50 }} />
      ) : (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.lista}
        />
      )}

      {/* Botão de Atualizar (Refresh) */}
      <TouchableOpacity style={styles.fab} onPress={buscarDados}>
        <Ionicons name="refresh" size={28} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

// --- 3. NAVEGAÇÃO POR ABAS ---
const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'white',
          tabBarStyle: { backgroundColor: '#2196F3', height: 60, paddingBottom: 5 },
        }}
      >
        <Tab.Screen 
          name="Lista" 
          component={ListaScreen} 
          options={{ tabBarIcon: ({color}) => <Ionicons name="list" size={24} color={color} /> }}
        />
        <Tab.Screen 
          name="Adicionar" 
          component={View} // Tela vazia para exemplo
          options={{ tabBarIcon: ({color}) => <Ionicons name="add-circle" size={24} color={color} /> }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

// --- 4. ESTILIZAÇÃO (Visual) ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { backgroundColor: '#2196F3', padding: 25, paddingTop: 50 },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  badge: { backgroundColor: '#4CAF50', alignSelf: 'center', paddingHorizontal: 15, paddingVertical: 5, borderRadius: 20, marginVertical: 20 },
  badgeText: { color: 'white', fontWeight: 'bold', fontSize: 12 },
  lista: { paddingHorizontal: 20 },
  card: { backgroundColor: 'white', padding: 15, borderRadius: 10, marginBottom: 15, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4 },
  nome: { fontSize: 18, fontWeight: 'bold' },
  preco: { fontSize: 16, color: '#2196F3', marginVertical: 5, fontWeight: 'bold' },
  categoria: { fontSize: 14, color: '#888' },
  fab: { position: 'absolute', right: 20, bottom: 20, backgroundColor: '#2196F3', width: 56, height: 56, borderRadius: 28, justifyContent: 'center', alignItems: 'center', elevation: 5 }
});