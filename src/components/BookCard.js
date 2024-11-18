// components/BookCard.js

import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Componente BookCard
const BookCard = ({ title, author, image, onPress }) => {
  return (
    <View style={styles.card}>
      {/* Imagen del libro */}
      <Image source={{ uri: image }} style={styles.image} />
      
      {/* Detalles del libro */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.author}>{author}</Text>
      </View>

      {/* Botón de acción (opcional) */}
      {onPress && (
        <Text style={styles.button} onPress={onPress}>
          Ver detalles
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    elevation: 3, // Sombra en Android
    shadowColor: '#000', // Sombra en iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  image: {
    width: 100,
    height: 150,
    borderRadius: 8,
  },
  textContainer: {
    marginLeft: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  author: {
    fontSize: 14,
    color: '#555',
  },
  button: {
    color: '#0066cc',
    marginTop: 10,
    fontWeight: 'bold',
  },
});

export default BookCard;
