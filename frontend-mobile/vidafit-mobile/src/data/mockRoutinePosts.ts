// src/data/mockRoutinePosts.ts

import { PublicacionRutinaDTO, EjercicioDTO } from '../types/rutinaTypes';

// Mock exercises that can be referenced by routine posts
// These are now fully defined with series, repeticiones, descansoSegundos, and pesoKg
export const mockEjerciciosData: EjercicioDTO[] = [
    { id: 1, nombre: 'Flexiones', descripcion: 'Ejercicio de pecho y tríceps', grupoMuscular: 'Pecho', series: 3, repeticiones: 10, descansoSegundos: 60, pesoKg: 0 },
    { id: 2, nombre: 'Sentadillas', descripcion: 'Ejercicio de piernas y glúteos', grupoMuscular: 'Piernas', series: 4, repeticiones: 12, descansoSegundos: 90, pesoKg: 50 },
    { id: 3, nombre: 'Dominadas', descripcion: 'Ejercicio de espalda y bíceps', grupoMuscular: 'Espalda', series: 3, repeticiones: 8, descansoSegundos: 90, pesoKg: 0 },
    { id: 4, nombre: 'Plancha', descripcion: 'Ejercicio de core', grupoMuscular: 'Core', series: 3, repeticiones: 0, descansoSegundos: 45, pesoKg: 0 }, // Repeticiones 0 para ejercicios de tiempo
    { id: 5, nombre: 'Press de Hombros', descripcion: 'Ejercicio de hombros', grupoMuscular: 'Hombros', series: 3, repeticiones: 10, descansoSegundos: 60, pesoKg: 30 },
    { id: 6, nombre: 'Zancadas', descripcion: 'Ejercicio para piernas y glúteos', grupoMuscular: 'Piernas', series: 3, repeticiones: 10, descansoSegundos: 60, pesoKg: 20 },
    { id: 7, nombre: 'Remo con Barra', descripcion: 'Ejercicio de espalda', grupoMuscular: 'Espalda', series: 4, repeticiones: 8, descansoSegundos: 75, pesoKg: 40 },
    { id: 8, nombre: 'Curl de Bíceps', descripcion: 'Ejercicio para bíceps', grupoMuscular: 'Brazos', series: 3, repeticiones: 12, descansoSegundos: 60, pesoKg: 15 },
];

/**
 * @constant mockRoutinePosts
 * @description Un array de datos simulados para "PublicacionRutina" (Publicaciones de Rutina).
 * Esta data simula publicaciones de rutinas de ejercicio de diferentes usuarios
 * con ejercicios predefinidos.
 */
export const mockRoutinePosts: PublicacionRutinaDTO[] = [
    {
        id: 301, // Changed from id_publicacion to id
        titulo: 'Rutina de Fuerza para Principiantes',
        contenido: 'Una rutina completa para construir fuerza básica, ideal para quienes recién empiezan.',
        fechaCreacion: '2023-01-15T10:00:00',
        autor: 'Juan Perez',
        verificada: true,
        nombreRutina: 'Fuerza Inicial',
        duracion: 45,
        frecuencia: '3 veces por semana',
        nivel: 'Principiante',
        userId: 123, // Corresponds to 'user-123'
        ejercicios: [
            mockEjerciciosData[0], // Flexiones
            mockEjerciciosData[1], // Sentadillas
            mockEjerciciosData[3], // Plancha
        ],
    },
    {
        id: 302, // Changed from id_publicacion to id
        titulo: 'Rutina de Cardio Intenso',
        contenido: 'Sesión de cardio de alta intensidad para quemar calorías y mejorar la resistencia.',
        fechaCreacion: '2023-01-20T11:30:00',
        autor: 'Maria Garcia',
        verificada: false,
        nombreRutina: 'Cardio Explosivo',
        duracion: 30,
        frecuencia: 'Diaria',
        nivel: 'Intermedio',
        userId: 456, // Corresponds to 'user-456'
        ejercicios: [], // Cardio routines might not have specific "exercises" in this context
    },
    {
        id: 303, // Changed from id_publicacion to id
        titulo: 'Entrenamiento de Espalda y Brazos',
        contenido: 'Rutina enfocada en fortalecer la espalda y los brazos con ejercicios específicos.',
        fechaCreacion: '2023-02-01T09:00:00',
        autor: 'Juan Perez',
        verificada: true,
        nombreRutina: 'Espalda y Bíceps',
        duracion: 60,
        frecuencia: '2 veces por semana',
        nivel: 'Avanzado',
        userId: 123, // Same user as 301
        ejercicios: [
            mockEjerciciosData[2], // Dominadas
            mockEjerciciosData[6], // Remo con Barra
            mockEjerciciosData[7], // Curl de Bíceps
        ],
    },
    {
        id: 304, // Changed from id_publicacion to id
        titulo: 'Rutina de Piernas y Glúteos',
        contenido: 'Un entrenamiento intenso para tonificar y fortalecer las piernas y glúteos.',
        fechaCreacion: '2023-02-10T14:00:00',
        autor: 'Juan Perez',
        verificada: false,
        nombreRutina: 'Tren Inferior Poderoso',
        duracion: 50,
        frecuencia: '2 veces por semana',
        nivel: 'Intermedio',
        userId: 123, // Same user as 301 and 303
        ejercicios: [
            mockEjerciciosData[1], // Sentadillas
            mockEjerciciosData[5], // Zancadas
        ],
    },
];
