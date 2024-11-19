import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ImageBackground, Image, TouchableOpacity, Text, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../db/firebaseconfig';
import { addDoc, collection } from 'firebase/firestore';


export default function AgregarLibro() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState(null);
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('Novela romántica');

  const handleGenreChange = (itemValue) => {
    setGenre(itemValue);
    Alert.alert('Género seleccionado', `Has seleccionado el género: ${itemValue}`);
  };

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permiso denegado', 'Se requiere acceso a la galería para seleccionar una imagen.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  const addBook = async () => {
    if (!title || !author || !price || !quantity || !image || !description) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }
  
    try {
      await addDoc(collection(db, 'Libros'), {
        title,
        author,
        price: parseFloat(price), // Asegúrate de convertir a número
        quantity: parseInt(quantity, 10), // Asegúrate de convertir a número
        image,
        description,
        genre,
      });
  
      setTitle('');
      setAuthor('');
      setPrice('');
      setQuantity('');
      setImage(null);
      setDescription('');
      setGenre('Novela romántica');
      Alert.alert('Éxito', 'Libro agregado correctamente');
    } catch (error) {
      Alert.alert('Error', 'No se pudo agregar el libro. Inténtalo de nuevo.');
      console.error('Error al agregar libro:', error);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: 'https://media.istockphoto.com/id/475120238/es/vector/vector-de-fondo-reservar-en-el-estante-de-la-biblioteca-vector-plano-ilustraciones.jpg?s=1024x1024&w=is&k=20&c=OiicKypCUVDk6fwmglmC_9ctoUaQUtXUq1uz58rENNg=',
      }}
      style={styles.background}
    >
      <ScrollView contentContainerStyle={styles.container}>
        {/* Título */}
        <TextInput
          style={styles.input}
          placeholder="Título del Libro"
          value={title}
          onChangeText={setTitle}
        />

        {/* Autor */}
        <TextInput
          style={styles.input}
          placeholder="Autor"
          value={author}
          onChangeText={setAuthor}
        />

        {/* Precio */}
        <TextInput
          style={styles.input}
          placeholder="Precio"
          keyboardType="numeric"
          value={price}
          onChangeText={setPrice}
        />

        {/* Cantidad */}
        <TextInput
          style={styles.input}
          placeholder="Cantidad (Almacén)"
          keyboardType="numeric"
          value={quantity}
          onChangeText={setQuantity}
        />

        {/* Imagen */}
        <TouchableOpacity style={styles.imagePicker} onPress={selectImage}>
          {image ? (
            <Image source={{ uri: image }} style={styles.imagePreview} />
          ) : (
            <Text style={styles.imagePickerText}>Seleccionar Imagen</Text>
          )}
        </TouchableOpacity>

        {/* Género */}
        <Picker
          selectedValue={genre}
          style={styles.picker}
          onValueChange={handleGenreChange}
        >
          <Picker.Item label="Novela romántica" value="Novela romántica" />
          <Picker.Item label="Ciencia ficción" value="Ciencia ficción" />
          <Picker.Item label="Fantasía" value="Fantasía" />
          <Picker.Item label="Misterio y suspenso" value="Misterio y suspenso" />
          <Picker.Item label="Historia y biografía" value="Historia y biografía" />
          <Picker.Item label="Desarrollo personal" value="Desarrollo personal" />
          <Picker.Item label="Aventura" value="Aventura" />
          <Picker.Item label="Infantil y juvenil" value="Infantil y juvenil" />
          <Picker.Item label="Clásicos de la literatura" value="Clásicos de la literatura" />
          <Picker.Item label="Poesía" value="Poesía" />
          <Picker.Item label="Autoayuda" value="Autoayuda" />
          <Picker.Item label="Viajes y turismo" value="Viajes y turismo" />
          <Picker.Item label="Negocios y finanzas" value="Negocios y finanzas" />
          <Picker.Item label="Salud y bienestar" value="Salud y bienestar" />
          <Picker.Item label="Educación y academia" value="Educación y academia" />
        </Picker>

        {/* Descripción */}
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Descripción"
          value={description}
          onChangeText={setDescription}
          multiline
        />

        {/* Botón */}
        <Button title="Agregar" onPress={addBook} />
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    padding: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    margin: 20,
    borderRadius: 10,
    alignItems: 'stretch',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  picker: {
    marginVertical: 15,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: '#fff',
  },
  imagePicker: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#eaeaea',
    borderRadius: 5,
    height: 150,
    marginBottom: 15,
  },
  imagePickerText: {
    color: '#888',
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
});
