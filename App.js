import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './src/screens/Home';
import AgregarLibro from './src/screens/AgregarLibro';
import EditarLibro from './src/screens/EditarLibro';
import Estadisticas from './src/screens/Estadistica';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="AgregarLibro" component={AgregarLibro} />
        <Stack.Screen name="EditarLibro" component={EditarLibro} />
        <Stack.Screen name="Estadisticas" component={Estadisticas} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
