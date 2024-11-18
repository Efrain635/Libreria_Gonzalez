import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { db } from '../../db/firebaseconfig';
import { collection, getDocs } from 'firebase/firestore';

export default function Estadisticas() {
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    const fetchStats = async () => {
      const querySnapshot = await getDocs(collection(db, 'Libros'));
      setTotalBooks(querySnapshot.size);
    };

    fetchStats();
  }, []);

  return (
    <View>
      <Text>Total de Libros: {totalBooks}</Text>
    </View>
  );
}
