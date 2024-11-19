import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Alert,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { db } from '../../db/firebaseconfig';
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

export default function GestionLibros({ navigation }) {
  const [books, setBooks] = useState([]);
  const [editingBook, setEditingBook] = useState(null);

  // Obtener la lista de libros
  useEffect(() => {
    const fetchBooks = async () => {
      const querySnapshot = await getDocs(collection(db, 'Libros'));
      const booksList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(booksList);
    };

    fetchBooks();
  }, []);

  // Actualizar un libro
  const updateBook = async (book) => {
    if (!editingBook.title || !editingBook.author || !editingBook.price) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    const docRef = doc(db, 'Libros', book.id);
    await updateDoc(docRef, {
      title: editingBook.title,
      author: editingBook.author,
      price: editingBook.price,
      description: editingBook.description,
      image: editingBook.image,
    });

    Alert.alert('Éxito', 'Libro actualizado correctamente');
    setEditingBook(null);
    refreshBooks();
  };

  // Eliminar un libro
  const deleteBook = async (id) => {
    Alert.alert('Eliminar libro', '¿Estás seguro de eliminar este libro?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Eliminar',
        onPress: async () => {
          const docRef = doc(db, 'Libros', id);
          await deleteDoc(docRef);
          Alert.alert('Éxito', 'Libro eliminado correctamente');
          refreshBooks();
        },
      },
    ]);
  };

  // Refrescar la lista de libros después de actualizar o eliminar
  const refreshBooks = async () => {
    const querySnapshot = await getDocs(collection(db, 'Libros'));
    const booksList = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setBooks(booksList);
  };

  // Renderizar la lista de libros
  const renderBookItem = ({ item }) => (
    <View style={styles.bookItem}>
      {editingBook?.id === item.id ? (
        <View>
          <TextInput
            style={styles.input}
            value={editingBook.title}
            onChangeText={(text) =>
              setEditingBook({ ...editingBook, title: text })
            }
            placeholder="Título"
          />
          <TextInput
            style={styles.input}
            value={editingBook.author}
            onChangeText={(text) =>
              setEditingBook({ ...editingBook, author: text })
            }
            placeholder="Autor"
          />
          <TextInput
            style={styles.input}
            value={editingBook.price}
            onChangeText={(text) =>
              setEditingBook({ ...editingBook, price: text })
            }
            placeholder="Precio"
            keyboardType="numeric"
          />
          <Button
            title="Guardar"
            onPress={() => updateBook(editingBook)}
          />
          <Button
            title="Cancelar"
            color="red"
            onPress={() => setEditingBook(null)}
          />
        </View>
      ) : (
        <View>
          <Text style={styles.bookText}>Título: {item.title}</Text>
          <Text style={styles.bookText}>Autor: {item.author}</Text>
          <Text style={styles.bookText}>Precio: {item.price}</Text>
          <View style={styles.actionButtons}>
            <Button
              title="Editar"
              onPress={() => setEditingBook(item)}
            />
            <Button
              title="Eliminar"
              color="red"
              onPress={() => deleteBook(item.id)}
            />
          </View>
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        renderItem={renderBookItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  bookItem: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    elevation: 3,
  },
  bookText: {
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
});
