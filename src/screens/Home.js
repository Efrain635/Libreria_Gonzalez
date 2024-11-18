// screens/Home.js
import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
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
      <Text style={styles.title}>Bienvenido a la Librería</Text>
      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <BookCard
            title={item.title}
            author={item.author}
            image={item.image}
            onPress={() => handlePress(item)} // Aquí se usa `navigation`
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
  },
});

export default Home;
