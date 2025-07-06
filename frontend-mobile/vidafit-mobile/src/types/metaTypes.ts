// src/types/metaTypes.ts

/**
 * @interface MetaDTO
 * @description Representa un DTO (Data Transfer Object) para una Meta.
 * Contiene detalles sobre un objetivo del usuario, incluyendo descripción,
 * fechas de inicio y fin, estado de cumplimiento, y el ID del usuario.
 * Corresponde al `MetaDTO` en el backend.
 */
export interface MetaDTO {
    id: number;
    descripcion: string;
    fechaInicio: string; // Usar string para LocalDate, se puede formatear en el frontend
    fechaFin: string;    // Usar string para LocalDate, se puede formatear en el frontend
    cumplida: boolean;
    userId: number;
}

/**
 * @interface CreateMetaDTO
 * @description Interfaz para la creación de una nueva Meta.
 * Excluye el `id` y `cumplida` ya que son generados o inicializados por el backend.
 * Nota: El backend espera un objeto `Meta` completo para la creación, pero para el frontend
 * es útil definir un DTO de creación más simple.
 */
export interface CreateMetaDTO {
    descripcion: string;
    fechaInicio: string;
    fechaFin: string;
}
