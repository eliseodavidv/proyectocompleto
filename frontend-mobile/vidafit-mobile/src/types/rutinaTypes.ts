// src/types/rutinaTypes.ts

import { PublicacionBaseDTO } from './publicacionTypes'; // Importar la base DTO

/**
 * @interface EjercicioDTO
 * @description Representa un DTO (Data Transfer Object) para Ejercicio.
 * Contiene detalles sobre un ejercicio, incluyendo nombre, descripción, grupo muscular,
 * y parámetros específicos de entrenamiento como series, repeticiones, descanso y peso.
 */
export interface EjercicioDTO {
    id: number;
    nombre: string;
    descripcion: string;
    grupoMuscular: string; // Este campo está en el DTO de respuesta del backend
    series: number;
    repeticiones: number;
    descansoSegundos: number;
    pesoKg: number;
    imagenUrl?: string; // Nuevo campo para la URL de la imagen
}

/**
 * @interface CrearEjercicioDTO
 * @description Interfaz para la creación de un nuevo Ejercicio.
 * Corresponde al `CrearEjercicioDTO` en el backend.
 * Nota: 'grupoMuscular' no está incluido aquí para compatibilidad con el DTO de creación del backend.
 */
export interface CrearEjercicioDTO {
    nombre: string;
    descripcion: string;
    series: number;
    repeticiones: number;
    descansoSegundos: number;
    pesoKg: number;
    imagenUrl?: string; // Nuevo campo para la URL de la imagen, opcional para la creación
}

/**
 * @interface CreatePublicacionRutina
 * @description Interfaz para la creación de una nueva PublicacionRutina.
 * Corresponde al `CrearRutinaDTO` en el backend.
 * Extiende PublicacionRequestBaseDTO para incluir campos comunes de publicación.
 */
export interface CreatePublicacionRutina {
    titulo: string;
    descripcion: string;
    nombreRutina: string;
    duracion: number; // en minutos o semanas, según tu backend
    frecuencia: string; // ej., "Diaria", "3 veces por semana"
    dificultad: string; // ej., "Principiante", "Intermedio", "Avanzado"
    ejercicioIds: number[];
}

/**
 * @interface PublicacionRutinaDTO
 * @description Interfaz para la representación de una PublicacionRutina existente (respuesta del backend).
 * Corresponde al `PublicacionRutinaResponseDTO` en el backend.
 * Extiende PublicacionBaseDTO para incluir campos comunes de publicación.
 */
export interface PublicacionRutinaDTO extends PublicacionBaseDTO {
    nombreRutina: string;
    duracion: number;
    frecuencia: string;
    nivel: string; // 'dificultad' en el DTO de creación, 'nivel' en el de respuesta
    userId: number; // Mantener para la lógica de mock de frontend
    ejercicios: EjercicioDTO[];
}

/**
 * @interface AsignarEjerciciosDTO
 * @description Interfaz para asignar ejercicios a una rutina existente.
 * Corresponde al `AsignarEjerciciosDTO` en el backend.
 */
export interface AsignarEjerciciosDTO {
    rutinaId: number;
    ejerciciosIds: number[];
}

/**
 * @interface RutinaConEjerciciosDTO
 * @description Interfaz para la respuesta de una rutina con ejercicios.
 * Corresponde al `RutinaConEjerciciosDTO` en el backend.
 */
export interface RutinaConEjerciciosDTO {
    id_publicacion: number;
    titulo: string;
    descripcion: string;
    nombreRutina: string;
    duracion: number;
    frecuencia: string;
    dificultad: string;
    ejercicios: EjercicioDTO[];
}
