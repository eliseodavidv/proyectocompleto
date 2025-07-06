// src/types/publicacionTypes.ts

/**
 * @interface PublicacionRequestBaseDTO
 * @description Representa el DTO base para crear una publicación en el backend.
 * Contiene los campos comunes que todas las publicaciones comparten al ser creadas.
 * Corresponde al `PublicacionRequestDTO` en el backend.
 */
export interface PublicacionRequestBaseDTO {
    titulo: string;
    contenido: string;
}

/**
 * @interface PublicacionBaseDTO
 * @description Representa el DTO base para una publicación en el backend.
 * Contiene los campos comunes que todas las publicaciones comparten al ser recuperadas.
 * Corresponde al `PublicacionResponseDTO` en el backend.
 */
export interface PublicacionBaseDTO {
    id: number;
    titulo: string;
    contenido: string;
    fechaCreacion: string; // Usar string para LocalDateTime, se puede formatear en el frontend
    autor: string;
    verificada: boolean;
}
