// src/screens/RegisterScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { authService } from '../api/authService'; // Import our mock authentication service
import { RootStackParamList } from '../navigation/AppNavigator'; // Import RootStackParamList
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the eye icon

/**
 * @interface RegisterScreenProps
 * @description Defines the props for the RegisterScreen component.
 * @property {StackNavigationProp<RootStackParamList, 'Register'>} navigation - Navigation prop from React Navigation.
 */
interface RegisterScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'Register'>;
}

/**
 * @function RegisterScreen
 * @description A React Native functional component for new user registration.
 * It handles user input for name, email, and password, calls the mock `authService.register`
 * and provides feedback on registration status (loading, success, error).
 * On successful registration, it navigates to the 'ProductList' screen.
 * @param {RegisterScreenProps} props - The component's props.
 * @returns {JSX.Element} The rendered Register screen.
 */
const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>(''); // New state for confirm password
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false); // State for password visibility

    /**
     * @function handleRegister
     * @description Handles the register button press.
     * Calls the `authService.register` with provided user data.
     * Manages loading state and displays alerts for success or failure.
     */
    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Error de Entrada', 'Por favor, completa todos los campos.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Error de Contraseña', 'Las contraseñas no coinciden. Por favor, inténtalo de nuevo.');
            return;
        }

        setLoading(true);
        try {
            const response = await authService.register({ name, email, password });
            Alert.alert('Registro Exitoso', `¡Bienvenido, ${name}! Token: ${response.token}`);
            // In a real app, you'd store the token (e.g., in AsyncStorage) and navigate to the main app flow
            // Navigate to the MainTabs navigator and specify 'MyPosts' as the initial screen within it
            navigation.replace('MainTabs', { screen: 'MyPosts' });
        } catch (error: any) {
            console.error('Registration error:', error);
            Alert.alert('Fallo al Registrar', error.message || 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Crear Cuenta</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
                autoCorrect={false}
            />
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                placeholderTextColor="#999"
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
            />
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Contraseña (mínimo 6 caracteres)"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                />
                <TouchableOpacity
                    style={styles.togglePasswordButton}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#999"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.passwordContainer}>
                <TextInput
                    style={styles.passwordInput}
                    placeholder="Confirmar Contraseña"
                    placeholderTextColor="#999"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry={!showPassword} // Use the same showPassword state for consistency
                />
                <TouchableOpacity
                    style={styles.togglePasswordButton}
                    onPress={() => setShowPassword(!showPassword)}
                >
                    <Ionicons
                        name={showPassword ? 'eye-off' : 'eye'}
                        size={24}
                        color="#999"
                    />
                </TouchableOpacity>
            </View>
            <TouchableOpacity
                style={[styles.button, loading && styles.buttonDisabled]}
                onPress={handleRegister}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Registrarse</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginText}>¿Ya tienes una cuenta? <Text style={styles.loginLink}>Inicia sesión aquí</Text></Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e0f7fa', // Light blue background
        padding: 20,
    },
    header: {
        fontSize: 34,
        fontWeight: 'bold',
        color: '#00796b', // Dark teal
        marginBottom: 40,
        textAlign: 'center',
    },
    input: {
        width: '90%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#b2dfdb', // Light teal border
        borderRadius: 12,
        marginBottom: 18,
        backgroundColor: '#ffffff',
        fontSize: 16,
        color: '#333',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    passwordContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        borderWidth: 1,
        borderColor: '#b2dfdb',
        borderRadius: 12,
        marginBottom: 18,
        backgroundColor: '#ffffff',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
        elevation: 3,
    },
    passwordInput: {
        flex: 1,
        padding: 15,
        fontSize: 16,
        color: '#333',
    },
    togglePasswordButton: {
        padding: 10,
    },
    button: {
        width: '90%',
        backgroundColor: '#00796b', // Dark teal
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
    },
    buttonDisabled: {
        backgroundColor: '#80cbc4', // Lighter teal when disabled
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginText: {
        marginTop: 25,
        fontSize: 15,
        color: '#555',
    },
    loginLink: {
        color: '#007AFF', // Standard link blue
        fontWeight: 'bold',
    },
});

export default RegisterScreen;
