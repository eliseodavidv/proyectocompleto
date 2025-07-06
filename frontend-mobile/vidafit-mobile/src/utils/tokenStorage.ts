// src/utils/tokenStorage.ts

import AsyncStorage from '@react-native-async-storage/async-storage';

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'user_data';

/**
 * Utilidades para manejo de tokens y datos de usuario
 */
export const TokenStorage = {
    /**
     * Guarda el token de autenticación
     */
    async saveToken(token: string): Promise<void> {
        try {
            await AsyncStorage.setItem(TOKEN_KEY, token);
            console.log('Token guardado exitosamente');
        } catch (error) {
            console.error('Error guardando token:', error);
            throw new Error('No se pudo guardar el token de autenticación');
        }
    },

    /**
     * Obtiene el token de autenticación
     */
    async getToken(): Promise<string | null> {
        try {
            const token = await AsyncStorage.getItem(TOKEN_KEY);
            return token;
        } catch (error) {
            console.error('Error obteniendo token:', error);
            return null;
        }
    },

    /**
     * Elimina el token de autenticación
     */
    async removeToken(): Promise<void> {
        try {
            await AsyncStorage.removeItem(TOKEN_KEY);
            console.log('Token eliminado exitosamente');
        } catch (error) {
            console.error('Error eliminando token:', error);
        }
    },

    /**
     * Guarda los datos del usuario
     */
    async saveUserData(userData: any): Promise<void> {
        try {
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(userData));
            console.log('Datos de usuario guardados');
        } catch (error) {
            console.error('Error guardando datos de usuario:', error);
        }
    },

    /**
     * Obtiene los datos del usuario
     */
    async getUserData(): Promise<any | null> {
        try {
            const userData = await AsyncStorage.getItem(USER_KEY);
            return userData ? JSON.parse(userData) : null;
        } catch (error) {
            console.error('Error obteniendo datos de usuario:', error);
            return null;
        }
    },

    /**
     * Elimina los datos del usuario
     */
    async removeUserData(): Promise<void> {
        try {
            await AsyncStorage.removeItem(USER_KEY);
            console.log('Datos de usuario eliminados');
        } catch (error) {
            console.error('Error eliminando datos de usuario:', error);
        }
    },

    /**
     * Limpia todos los datos almacenados
     */
    async clearAll(): Promise<void> {
        try {
            await AsyncStorage.multiRemove([TOKEN_KEY, USER_KEY]);
            console.log('Todos los datos eliminados');
        } catch (error) {
            console.error('Error limpiando datos:', error);
        }
    }
};