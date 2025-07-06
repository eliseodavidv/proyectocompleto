// src/screens/LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { authService } from '../api/authService'; // Import our mock authentication service
import { RootStackParamList } from '../navigation/AppNavigator'; // Import RootStackParamList
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the eye icon

/**
 * @interface LoginScreenProps
 * @description Defines the props for the LoginScreen component.
 * @property {StackNavigationProp<RootStackParamList, 'Login'>} navigation - Navigation prop from React Navigation.
 */
interface LoginScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'Login'>;
}

/**
 * @function LoginScreen
 * @description A React Native functional component for user login.
 * It handles user input for email and password, calls the mock `authService.login`
 * and provides feedback on login status (loading, success, error).
 * On successful login, it navigates to the 'MainTabs' screen.
 * @param {LoginScreenProps} props - The component's props.
 * @returns {JSX.Element} The rendered Login screen.
 */
const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [showPassword, setShowPassword] = useState<boolean>(false); // State for password visibility

    /**
     * @function handleLogin
     * @description Handles the login button press.
     * Calls the `authService.login` with provided credentials.
     * Manages loading state and displays alerts for success or failure.
     */
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error de Entrada', 'Por favor, ingresa tu correo electrónico y contraseña.');
            return;
        }

        setLoading(true);
        try {
            const response = await authService.login({ email, password });
            Alert.alert('Inicio de Sesión Exitoso', `¡Bienvenido! Token: ${response.token}`);
            // In a real app, you'd store the token (e.g., in AsyncStorage) and navigate to the main app flow
            // Navigate to the MainTabs navigator and specify 'MyPosts' as the initial screen within it
            navigation.replace('MainTabs', { screen: 'MyPosts' });
        } catch (error: any) {
            console.error('Login error:', error);
            Alert.alert('Fallo al Iniciar Sesión', error.message || 'Ocurrió un error inesperado. Por favor, inténtalo de nuevo.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.header}>¡Bienvenido a VidaFit!</Text>
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
                    placeholder="Contraseña"
                    placeholderTextColor="#999"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword} // Toggle password visibility
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
                onPress={handleLogin}
                disabled={loading}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Iniciar Sesión</Text>
                )}
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerText}>¿No tienes una cuenta? <Text style={styles.registerLink}>Regístrate aquí</Text></Text>
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
    registerText: {
        marginTop: 25,
        fontSize: 15,
        color: '#555',
    },
    registerLink: {
        color: '#007AFF', // Standard link blue
        fontWeight: 'bold',
    },
});

export default LoginScreen;
