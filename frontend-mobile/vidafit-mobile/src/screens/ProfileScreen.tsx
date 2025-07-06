// src/screens/ProfileScreen.tsx

import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { UserDTO } from '../types/userTypes';
import { userService } from '../api/userService';
import { authService } from '../api/authService';
import { RootStackParamList } from '../navigation/AppNavigator';

/**
 * @interface ProfileScreenProps
 * @description Define las propiedades para el componente ProfileScreen.
 * @property {StackNavigationProp<RootStackParamList, 'Profile'>} navigation - Propiedad de navegación de React Navigation.
 */
interface ProfileScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'Profile'>;
}

/**
 * @function ProfileScreen
 * @description Un componente funcional de React Native que muestra el perfil del usuario.
 * Incluye detalles del usuario y un botón de cierre de sesión.
 * @param {ProfileScreenProps} props - Las propiedades del componente.
 * @returns {JSX.Element} La pantalla renderizada del Perfil.
 */
const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
    const [user, setUser] = useState<UserDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Simular un ID de usuario logueado. En una app real, esto vendría del estado de autenticación global.
    const mockLoggedInUserId = 'user-123'; // This should ideally come from a global auth context

    /**
     * @function fetchUserProfile
     * @description Obtiene los detalles del perfil del usuario desde el servicio.
     * Maneja el estado de carga y el reporte de errores.
     */
    const fetchUserProfile = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedUser = await userService.getCurrentUser(mockLoggedInUserId);
            if (fetchedUser) {
                setUser(fetchedUser);
            } else {
                setError('No se pudo cargar la información del usuario.');
            }
        } catch (err) {
            console.error('Error al obtener el perfil del usuario:', err);
            setError('Error al cargar el perfil. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    }, [mockLoggedInUserId]);

    /**
     * @function handleLogout
     * @description Maneja el cierre de sesión del usuario.
     * Llama al servicio de autenticación para simular el cierre de sesión
     * y luego navega a la pantalla de inicio de sesión.
     */
    const handleLogout = async () => {
        Alert.alert(
            'Cerrar Sesión',
            '¿Estás seguro de que quieres cerrar tu sesión?',
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Cerrar Sesión',
                    onPress: async () => {
                        try {
                            await authService.logout();
                            // En una aplicación real, aquí borrarías el token de AsyncStorage/SecureStore
                            Alert.alert('Sesión Cerrada', 'Has cerrado sesión exitosamente.');
                            navigation.replace('Login'); // Navegar a la pantalla de Login y limpiar la pila
                        } catch (err) {
                            console.error('Error al cerrar sesión:', err);
                            Alert.alert('Error', 'No se pudo cerrar la sesión. Por favor, inténtalo de nuevo.');
                        }
                    },
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        );
    };

    // Usar useFocusEffect para volver a obtener datos cuando la pantalla entra en foco
    useFocusEffect(
        useCallback(() => {
            fetchUserProfile();
        }, [fetchUserProfile])
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Cargando perfil...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchUserProfile}>
                    <Text style={styles.retryButtonText}>Reintentar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!user) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>No se encontraron datos de usuario.</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Mi Perfil</Text>

            <View style={styles.profileCard}>
                <Text style={styles.label}>Nombre:</Text>
                <Text style={styles.value}>{user.name}</Text>

                <Text style={styles.label}>Email:</Text>
                <Text style={styles.value}>{user.email}</Text>

                <Text style={styles.label}>Rol:</Text>
                <Text style={styles.value}>{user.role}</Text>

                {/* You can add more user details here */}
            </View>

            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Text style={styles.logoutButtonText}>Cerrar Sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        padding: 20,
        paddingTop: 50,
        alignItems: 'center',
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    errorText: {
        fontSize: 18,
        color: '#D32F2F',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 30,
        textAlign: 'center',
    },
    profileCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 25,
        width: '90%',
        maxWidth: 400,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginBottom: 30,
    },
    label: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginBottom: 5,
        marginTop: 10,
    },
    value: {
        fontSize: 18,
        color: '#333',
        marginBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        paddingBottom: 5,
    },
    logoutButton: {
        backgroundColor: '#e74c3c', // Red color for logout
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    logoutButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ProfileScreen;
