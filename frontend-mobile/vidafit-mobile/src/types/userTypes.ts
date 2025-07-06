// src/types/userTypes.ts

/**
 * @enum Role
 * @description Define los roles de usuario disponibles en el sistema.
 */
export enum Role {
    USER = 'USER',
    ADMIN = 'ADMIN',
    ESPECIALISTA = 'ESPECIALISTA'
}

/**
 * @interface UserDTO
 * @description Representa un DTO (Data Transfer Object) para la información del usuario.
 * Corresponde al `UserDTO` en el backend.
 */
export interface UserDTO {
    id: number;
    name: string;
    email: string;
    role: Role;
}
