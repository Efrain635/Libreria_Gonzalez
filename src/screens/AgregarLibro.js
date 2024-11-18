import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import { db } from '../../db/firebaseconfig';
import { addDoc, collection } from 'firebase/firestore';

export default function AgregarLibro() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  const addBook = async () => {
    await addDoc(collection(db, 'Libros'), {
      title,
      author,
      price,
      image,
      description,
    });
  };

  return (
    <View>
      <TextInput placeholder="Título" onChangeText={setTitle} />
      <TextInput placeholder="Autor" onChangeText={setAuthor} />
      <TextInput placeholder="Precio" onChangeText={setPrice} />
      <TextInput placeholder="Imagen" onChangeText={setImage} />
      <TextInput placeholder="Descripción" onChangeText={setDescription} />
      <Button title="Guardar" onPress={addBook} />
    </View>
  );
}
