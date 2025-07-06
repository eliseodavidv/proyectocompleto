// src/api/authService.ts

import { LoginReq, RegisterReq, JwtAuthResponse } from '../types/authTypes';
import { UserDTO, Role } from '../types/userTypes';

const BACKEND_URL = 'http://192.168.101.11:8090';

export const authService = {
  login: async (credentials: LoginReq): Promise<JwtAuthResponse> => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) throw new Error('Credenciales inválidas');

      const data = await response.json();

      // Usar los datos reales del backend
      return {
        token: data.token,
        user: data.user
      };
    } catch (error) {
      throw new Error('Error de conexión al backend');
    }
  },

  register: async (userData: RegisterReq): Promise<JwtAuthResponse> => {
    try {
      const response = await fetch(`${BACKEND_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) throw new Error('Error en el registro');

      const data = await response.json();

      // Usar los datos reales del backend
      return {
        token: data.token,
        user: data.user
      };
    } catch (error) {
      throw new Error('Error de conexión al backend');
    }
  },

  logout: async (): Promise<void> => {
    // Limpiar datos locales si es necesario
  },
};