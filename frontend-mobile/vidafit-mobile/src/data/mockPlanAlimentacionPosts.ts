// src/data/mockFoodPlanPosts.ts (Conceptual location for this data)

import { PublicacionPlanAlimentacionDTO } from '../types/planAlimentacionTypes';

// Datos simulados en memoria para propósitos de desarrollo
export const mockFoodPlanPosts: PublicacionPlanAlimentacionDTO[] = [
  {
    id: 101,
    titulo: 'Plan de Alimentación para Ganancia Muscular',
    contenido: 'Este plan está diseñado para maximizar la ganancia de masa muscular magra.',
    fechaCreacion: '2023-05-01T08:00:00',
    autor: 'Carlos Fitness',
    verificada: true,
    tipoDieta: 'Hipercalórica',
    calorias: 3000,
    objetivos: 'Ganancia muscular',
    restricciones: 'Ninguna',
    userId: 123, // Simula el ID del usuario
  },
  {
    id: 102,
    titulo: 'Dieta Mediterránea para la Salud',
    contenido: 'Un enfoque equilibrado para una vida saludable y pérdida de peso moderada.',
    fechaCreacion: '2023-05-05T12:00:00',
    autor: 'Ana Saludable',
    verificada: true,
    tipoDieta: 'Mediterránea',
    calorias: 2000,
    objetivos: 'Salud general, pérdida de peso',
    restricciones: 'Alimentos procesados',
    userId: 456, // Otro usuario simulado
  },
  {
    id: 103,
    titulo: 'Plan de Mantenimiento de Peso',
    contenido: 'Ideal para mantener tu peso actual con una alimentación balanceada.',
    fechaCreacion: '2023-05-10T09:30:00',
    autor: 'Carlos Fitness',
    verificada: false,
    tipoDieta: 'Balanceada',
    calorias: 2500,
    objetivos: 'Mantenimiento de peso',
    restricciones: 'Azúcares añadidos',
    userId: 123,
  },
];
