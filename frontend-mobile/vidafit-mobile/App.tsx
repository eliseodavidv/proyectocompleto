// App.tsx

import 'react-native-gesture-handler'; // Debe importarse al principio
import React, { useState, useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, ActivityIndicator, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Importar Ionicons

// Importa tus pantallas
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import MyPostsScreen from './src/screens/MyPostsScreen';
import CreateFoodPlanPostScreen from './src/screens/CreateFoodPlanPostScreen';
import CreateProgressPostScreen from './src/screens/CreateProgressPostScreen';
import CreateRoutinePostScreen from './src/screens/CreateRoutinePostScreen';
import CreateExerciseScreen from './src/screens/CreateExerciseScreen';
import PostDetailsScreen from './src/screens/PostDetailsScreen';
import MetasScreen from './src/screens/MetasScreen';
import ProfileScreen from './src/screens/ProfileScreen'; // ¡NUEVO!
import { RootStackParamList } from './src/navigation/AppNavigator';

/**
 * @constant Stack
 * @description Crea una instancia de navegador de pila usando `createStackNavigator`.
 * Este navegador gestiona una pila de pantallas, donde cada nueva pantalla es apilada
 * en la parte superior de la pila.
 */
const Stack = createStackNavigator<RootStackParamList>();

/**
 * @constant Tab
 * @description Crea una instancia de navegador de pestañas inferiores usando `createBottomTabNavigator`.
 * Este navegador permite cambiar entre diferentes pantallas a través de pestañas en la parte inferior.
 */
const Tab = createBottomTabNavigator();

/**
 * @function MainTabs
 * @description Componente que define la estructura del navegador de pestañas inferiores.
 * Contiene las pantallas principales de la aplicación accesibles a través de pestañas.
 * @returns {JSX.Element} El componente del navegador de pestañas.
 */
function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false, // Ocultar el encabezado por defecto para las pantallas de las pestañas
        tabBarActiveTintColor: '#007AFF', // Color del icono/texto activo
        tabBarInactiveTintColor: '#888', // Color del icono/texto inactivo
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e0e0e0',
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
        },
        tabBarIconStyle: {
          marginTop: 5,
        },
      }}
    >
      <Tab.Screen
        name="MyPosts"
        component={MyPostsScreen}
        options={{
          title: 'Mi Feed', // Título de la pestaña
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Metas"
        component={MetasScreen}
        options={{
          title: 'Metas', // Título de la nueva pestaña
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="trophy-outline" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          title: 'Mi Perfil', // Título de la nueva pestaña
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="person-outline" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

/**
 * @function App
 * @description El punto de entrada principal de tu aplicación móvil Expo.
 * Configura el contenedor de React Navigation y define la pila de navegación.
 * La ruta inicial se determina según el estado de inicio de sesión del usuario.
 * @returns {JSX.Element} El componente raíz de la aplicación.
 */
export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Simular estado de autenticación

  // Simular la verificación del estado de inicio de sesión al inicio de la aplicación
  useEffect(() => {
    const checkLoginStatus = async () => {
      // En una aplicación real, verificarías un token almacenado (ej., en AsyncStorage)
      // y lo validarías con tu backend.
      // Por ahora, solo simularemos una verificación.
      await new Promise(resolve => setTimeout(resolve, 1500)); // Simular verificación asíncrona
      const userIsActuallyLoggedIn = false; // Establecer en true para probar MyPosts como inicial
      setIsLoggedIn(userIsActuallyLoggedIn);
      setIsLoading(false);
    };

    checkLoginStatus();
  }, []);

  if (isLoading) {
    // Mostrar un indicador de carga mientras se verifica el estado de inicio de sesión
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f0f4f8" />
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? "MainTabs" : "Login"}>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={RegisterScreen}
            options={{ title: 'Registro' }}
          />
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateFoodPlanPost"
            component={CreateFoodPlanPostScreen}
            options={{ title: 'Nueva Publicación de Plan de Alimentación' }}
          />
          <Stack.Screen
            name="CreateProgressPost"
            component={CreateProgressPostScreen}
            options={{ title: 'Nueva Publicación de Progreso' }}
          />
          <Stack.Screen
            name="CreateRoutinePost"
            component={CreateRoutinePostScreen}
            options={{ title: 'Nueva Publicación de Rutina' }}
          />
          <Stack.Screen
            name="CreateExercise"
            component={CreateExerciseScreen}
            options={{ title: 'Crear Nuevo Ejercicio' }}
          />
          <Stack.Screen
            name="PostDetails"
            component={PostDetailsScreen}
            options={{ title: 'Detalles de la Publicación' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f4f8',
  },
});
