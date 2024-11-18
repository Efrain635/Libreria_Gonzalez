import React, { useState, useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import { db } from '../../db/firebaseconfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

export default function EditarLibro({ route }) {
  const { id } = route.params;
  const [book, setBook] = useState({});

  useEffect(() => {
    const fetchBook = async () => {
      const docRef = doc(db, 'Libros', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setBook(docSnap.data());
      }
    };

    fetchBook();
  }, []);

  const updateBook = async () => {
    const docRef = doc(db, 'Libros', id);
    await updateDoc(docRef, book);
  };

  return (
    <View>
      <TextInput
        value={book.title}
        onChangeText={text => setBook({ ...book, title: text })}
      />
      <TextInput
        value={book.author}
        onChangeText={text => setBook({ ...book, author: text })}
      />
      <TextInput
        value={book.price}
        onChangeText={text => setBook({ ...book, price: text })}
      />
      <TextInput
        value={book.image}
        onChangeText={text => setBook({ ...book, image: text })}
      />
      <TextInput
        value={book.description}
        onChangeText={text => setBook({ ...book, description: text })}
      />
      <Button title="Actualizar" onPress={updateBook} />
    </View>
  );
}
