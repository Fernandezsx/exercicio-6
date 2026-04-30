import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker'; // PASSO 2
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function TelaCamera() {
  const [image, setImage] = useState(null);


  const abrirCamera = async () => {
    const permissao = await ImagePicker.requestCameraPermissionsAsync();
    
    if (permissao.granted === false) {
      Alert.alert("Permissão Necessária", "Precisamos de acesso à câmera!");
      return;
    }

    let resultado = await ImagePicker.launchCameraAsync({
      allowsEditing: true, 
      aspect: [1, 1],     
      quality: 1,
    });

    if (!resultado.canceled) {
      setImage(resultado.assets[0].uri);
    }
  };


  const abrirGaleria = async () => {
    let resultado = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!resultado.canceled) {
      setImage(resultado.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Minha Foto de Perfil</Text>
      </View>

      <View style={styles.content}>
        {}
        <View style={styles.avatarContainer}>
          {image ? (
            <Image source={{ uri: image }} style={styles.avatar} />
          ) : (
            <View style={[styles.avatar, styles.avatarPlaceholder]}>
               <Text style={{color: '#666'}}>Sem Foto</Text>
            </View>
          )}
        </View>

        <View style={styles.badgeVerde}>
          <Text style={styles.badgeText}>Foto pronta para o Supabase</Text>
        </View>

        {}
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.btnAzul} onPress={abrirCamera}>
            <Text style={styles.btnText}>Tirar Foto</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.btnCinza} onPress={abrirGaleria}>
            <Text style={styles.btnText}>Escolher da Galeria</Text>
          </TouchableOpacity>
        </View>

        {}
        {image && (
          <View style={styles.urlBox}>
            <Text style={styles.urlLabel}>URL local da foto:</Text>
            <Text style={styles.urlText} numberOfLines={1}>{image}</Text>
          </View>
        )}
      </View>

      {image && (
        <View style={styles.footerSuccess}>
          <Text style={styles.footerText}>Imagem carregada com sucesso!</Text>
        </View>
      )}
    </SafeAreaView>
  );
}


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="TelaCamera" component={TelaCamera} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F0F0' },
  header: { backgroundColor: '#007BFF', padding: 20, paddingTop: 50 },
  headerTitle: { color: '#FFF', fontSize: 20, fontWeight: 'bold' },
  content: { flex: 1, alignItems: 'center', padding: 20 },
  avatarContainer: {
    marginTop: 40,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  avatar: {
    width: 200,
    height: 200,
    borderRadius: 100, 
    borderWidth: 4,
    borderColor: '#FFF',
  },
  avatarPlaceholder: {
    backgroundColor: '#DDD',
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeVerde: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginTop: 20,
  },
  badgeText: { color: '#FFF', fontWeight: '500' },
  buttonRow: {
    flexDirection: 'row',
    marginTop: 30,
    gap: 10,
  },
  btnAzul: { backgroundColor: '#007BFF', padding: 15, borderRadius: 8, flex: 1, alignItems: 'center' },
  btnCinza: { backgroundColor: '#888', padding: 15, borderRadius: 8, flex: 1, alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold' },
  urlBox: {
    backgroundColor: '#FFF',
    width: '100%',
    padding: 15,
    borderRadius: 10,
    marginTop: 30,
    borderWidth: 1,
    borderColor: '#DDD',
  },
  urlLabel: { fontWeight: 'bold', color: '#333' },
  urlText: { color: '#666', fontSize: 12 },
  footerSuccess: {
    backgroundColor: '#4CAF50',
    padding: 15,
    alignItems: 'center',
  },
  footerText: { color: '#FFF', fontWeight: 'bold' },
});