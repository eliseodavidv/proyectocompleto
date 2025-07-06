// src/types/planAlimentacionTypes.ts

import { PublicacionBaseDTO } from './publicacionTypes'; // Importar la base DTO

/**
 * @interface PublicacionPlanAlimentacionDTO
 * @description Representa un DTO para una publicación de plan de alimentación.
 * Extiende PublicacionBaseDTO para incluir campos comunes de publicación.
 */
export interface PublicacionPlanAlimentacionDTO extends PublicacionBaseDTO {
  // id: number; // Heredado de PublicacionBaseDTO
  // titulo: string; // Heredado de PublicacionBaseDTO
  // contenido: string; // Heredado de PublicacionBaseDTO
  tipoDieta: string;
  calorias: number;
  objetivos: string;
  restricciones: string;
  // fechaCreacion: string; // Heredado de PublicacionBaseDTO
  // autor: string; // Heredado de PublicacionBaseDTO
  // verificada: boolean; // Heredado de PublicacionBaseDTO
  userId: number; // Mantener para la lógica de mock de frontend
}

/**
 * @interface CreatePlanAlimentacion
 * @description Interfaz para la creación de un nuevo plan de alimentación.
 * Corresponde al `CrearPlanAlimentacionDTO` en el backend.
 */
export interface CreatePlanAlimentacion {
  titulo: string;
  contenido: string;
  tipoDieta: string;
  calorias: number;
  objetivos: string;
  restricciones: string;
}
