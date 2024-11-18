// screens/Home.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet, Image } from 'react-native';
import { db } from '../../db/firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';
import BookCard from '../components/BookCard';
import Button from '../components/Button';

const Home = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(collection(db, 'Libros'));
      const booksList = querySnapshot.docs.map((doc) => doc.data());
      setBooks(booksList);
    };
    fetchBooks();
  }, []);

  const handlePress = (book) => {
    // Redirigir a la pantalla de detalles
    navigation.navigate('Detalles', { book });
  };

  return (
    <View style={styles.container}>
      {/* Imagen de fondo centrada */}
      <Image
        source={require('../../Imagenes/Logo.jpg')} // Asegúrate de que la imagen exista en esta ruta.
        style={styles.backgroundImage}
      />

      <Text style={styles.title}>Bienvenido a la Librería</Text>
      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <BookCard
            title={item.title}
            author={item.author}
            image={item.image}
            onPress={() => handlePress(item)}
          />
        )}
      />
      <Button title="Agregar Libro" onPress={() => navigation.navigate('AgregarLibro')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Centrar el texto
  },
  backgroundImage: {
    width: 200, // Tamaño mediano
    height: 200,
    resizeMode: 'contain', // Ajustar sin distorsión
    alignSelf: 'center', // Centrar horizontalmente
    marginBottom: 20, // Espacio debajo de la imagen
  },
});

export default Home;
