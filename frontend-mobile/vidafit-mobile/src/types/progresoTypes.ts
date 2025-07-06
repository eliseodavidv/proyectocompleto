// src/types/progresoTypes.ts

import { PublicacionBaseDTO } from './publicacionTypes'; // Importar la base DTO

/**
 * @interface PublicacionProgresoDTO
 * @description Representa un DTO para una publicación de progreso.
 * Extiende PublicacionBaseDTO para incluir campos comunes de publicación.
 */
export interface PublicacionProgresoDTO extends PublicacionBaseDTO {
    // id: number; // Heredado de PublicacionBaseDTO
    // titulo: string; // Heredado de PublicacionBaseDTO
    // contenido: string; // Heredado de PublicacionBaseDTO
    fechaInicio: string;
    fechaFin: string;
    pesoInicio: number;
    pesoFin: number;
    promedioPeso: number;
    cambioPeso: number;
    // fechaCreacion: string; // Heredado de PublicacionBaseDTO
    // autor: string; // Heredado de PublicacionBaseDTO
    // verificada: boolean; // Heredado de PublicacionBaseDTO
    userId: number; // Mantener para la lógica de mock de frontend
}

/**
 * @interface CreatePublicacionProgreso
 * @description Interfaz para la creación de una nueva publicación de progreso.
 * Corresponde al `CrearPublicacionProgresoDTO` en el backend.
 */
export interface CreatePublicacionProgreso {
    titulo: string;
    contenido: string;
    fechaInicio: string;
    fechaFin: string;
    pesoInicio: number;
    pesoFin: number;
}
