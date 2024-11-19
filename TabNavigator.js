import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons'; // Puedes cambiar el ícono según prefieras
import Home from './src/screens/Home'; // Catálogo de libros
import AgregarLibro from './src/screens/AgregarLibro'; // Agregar libro
import EditarLibro from './src/screens/EditarLibro'; // Lista de libros
import Estadistica from './src/screens/Estadistica'; // Estadísticas

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Inicio') {
              iconName = 'home';
            } else if (route.name === 'Agregar') {
              iconName = 'add-circle';
            } else if (route.name === 'Lista') {
              iconName = 'list';
            } else if (route.name === 'Estadísticas') {
              iconName = 'stats-chart';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2E8B57',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Inicio" component={Home} />
        <Tab.Screen name="Agregar" component={AgregarLibro} />
        <Tab.Screen name="Lista" component={EditarLibro} />
        <Tab.Screen name="Estadísticas" component={Estadistica} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigator;
