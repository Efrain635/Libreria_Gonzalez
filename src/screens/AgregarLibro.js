import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet, ImageBackground } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { db } from '../../db/firebaseconfig';
import { addDoc, collection } from 'firebase/firestore';

export default function AgregarLibro() {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');
  const [genre, setGenre] = useState('Novela romántica');

  const handleGenreChange = (itemValue) => {
    setGenre(itemValue);
    Alert.alert('Género seleccionado', `Has seleccionado el género: ${itemValue}`);
  };

  const addBook = async () => {
    await addDoc(collection(db, 'Libros'), {
      title,
      author,
      price,
      quantity,
      image,
      description,
      genre,
    });
    setTitle('');
    setAuthor('');
    setPrice('');
    setQuantity('');
    setImage('');
    setDescription('');
    setGenre('Novela romántica');
    Alert.alert('Éxito', 'Libro agregado correctamente');
  };

  return (
    <ImageBackground
      source={{ uri: 'https://media.istockphoto.com/id/475120238/es/vector/vector-de-fondo-reservar-en-el-estante-de-la-biblioteca-vector-plano-ilustraciones.jpg?s=1024x1024&w=is&k=20&c=OiicKypCUVDk6fwmglmC_9ctoUaQUtXUq1uz58rENNg=' }} // Cambia esta URL por la imagen que desees usar.
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Fila 1 */}
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Título del Libro"
            value={title}
            onChangeText={setTitle}
          />
          <TextInput
            style={styles.input}
            placeholder="Autor"
            value={author}
            onChangeText={setAuthor}
          />
        </View>

        {/* Fila 2 */}
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Precio"
            keyboardType="numeric"
            value={price}
            onChangeText={setPrice}
          />
          <TextInput
            style={styles.input}
            placeholder="Cantidad (Almacén)"
            keyboardType="numeric"
            value={quantity}
            onChangeText={setQuantity}
          />
        </View>

        {/* Fila 3 */}
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Imagen (URL)"
            value={image}
            onChangeText={setImage}
          />
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
        </View>

        {/* Fila 4 */}
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            placeholder="Descripción"
            value={description}
            onChangeText={setDescription}
          />
        </View>

        {/* Botón */}
        <Button title="Publicar" onPress={addBook} />
      </View>
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fondo semitransparente para mayor legibilidad.
    margin: 20,
    borderRadius: 10,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#fff',
  },
  picker: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
