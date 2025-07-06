// src/config/apiConfig.ts

import { Platform } from 'react-native';

/**
 * Configuración de la API
 */
export const API_CONFIG = {
    BASE_URL: 'http://192.168.101.11:8090',

    ENDPOINTS: {
        AUTH: {
            LOGIN: '/auth/login',
            REGISTER: '/auth/register',
            LOGOUT: '/auth/logout'
        },
        PUBLICACIONES: '/api/publicaciones',
        PLANES: '/api/publicaciones/planes',
        RUTINAS: '/api/publicaciones/rutinas',
        PROGRESO: '/api/publicaciones/progreso',
        METAS: '/api/metas',
        COMENTARIOS: '/api/comentarios',
        EJERCICIOS: '/api/ejercicios'
    },

    HEADERS: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
};

/**
 * Timeout para las requests (en milisegundos)
 */
export const REQUEST_TIMEOUT = 10000; // 10 segundos