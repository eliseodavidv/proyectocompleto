// src/api/metaService.ts

import { MetaDTO, CreateMetaDTO } from '../types/metaTypes';

// Base de datos simulada para metas
let mockMetas: MetaDTO[] = [
    {
        id: 1,
        descripcion: 'Correr 5km en menos de 30 minutos',
        fechaInicio: '2024-01-01',
        fechaFin: '2024-06-30',
        cumplida: false,
        userId: 123, // Simula el ID del usuario
    },
    {
        id: 2,
        descripcion: 'Perder 5 kg de peso',
        fechaInicio: '2024-02-15',
        fechaFin: '2024-05-15',
        cumplida: false,
        userId: 123,
    },
    {
        id: 3,
        descripcion: 'Leer 10 libros sobre nutrición',
        fechaInicio: '2023-01-01',
        fechaFin: '2023-12-31',
        cumplida: true,
        userId: 123,
    },
    {
        id: 4,
        descripcion: 'Aprender a cocinar 10 recetas saludables nuevas',
        fechaInicio: '2024-03-01',
        fechaFin: '2024-08-31',
        cumplida: false,
        userId: 456, // Otro usuario simulado
    },
];

let nextMetaId = Math.max(...mockMetas.map(m => m.id)) + 1;

/**
 * @namespace metaService
 * @description Un objeto que simula las llamadas a la API para las metas del usuario.
 * Utiliza datos en memoria para el desarrollo.
 */
export const metaService = {
    /**
     * @method createMeta
     * @description Simula la creación de una nueva meta para un usuario.
     * @param {CreateMetaDTO} data - Los datos de la nueva meta.
     * @param {string} userId - El ID del usuario que crea la meta.
     * @returns {Promise<MetaDTO>} Una promesa que resuelve con la meta creada.
     */
    createMeta: async (data: CreateMetaDTO, userId: string): Promise<MetaDTO> => {
        console.log(`Mock API: Creando nueva meta para el usuario ${userId}...`);
        return new Promise((resolve) => {
            setTimeout(() => {
                const newMeta: MetaDTO = {
                    id: nextMetaId++,
                    descripcion: data.descripcion,
                    fechaInicio: data.fechaInicio,
                    fechaFin: data.fechaFin,
                    cumplida: false, // Por defecto, una meta nueva no está cumplida
                    userId: parseInt(userId.replace('user-', '')), // Convertir ID de usuario mock
                };
                mockMetas.push(newMeta);
                console.log('Mock API: Nueva meta creada:', newMeta);
                resolve(newMeta);
            }, 500);
        });
    },

    /**
     * @method getMetasByUserId
     * @description Simula la obtención de todas las metas de un usuario específico.
     * @param {string} userId - El ID del usuario cuyas metas se van a obtener.
     * @returns {Promise<MetaDTO[]>} Una promesa que resuelve con la lista de metas del usuario.
     */
    getMetasByUserId: async (userId: string): Promise<MetaDTO[]> => {
        console.log(`Mock API: Obteniendo metas para el usuario ID: ${userId}...`);
        return new Promise((resolve) => {
            setTimeout(() => {
                const numericUserId = parseInt(userId.replace('user-', ''));
                const userMetas = mockMetas.filter(meta => meta.userId === numericUserId);
                console.log(`Mock API: Encontradas ${userMetas.length} metas para el usuario ${userId}.`);
                resolve([...userMetas]); // Devolver una copia
            }, 300);
        });
    },

    /**
     * @method markMetaAsCompleted
     * @description Simula marcar una meta como cumplida.
     * @param {number} metaId - El ID de la meta a marcar como cumplida.
     * @returns {Promise<boolean>} Una promesa que resuelve a `true` si la operación fue exitosa.
     */
    markMetaAsCompleted: async (metaId: number): Promise<boolean> => {
        console.log(`Mock API: Marcando meta con ID ${metaId} como cumplida...`);
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const metaIndex = mockMetas.findIndex(meta => meta.id === metaId);
                if (metaIndex !== -1) {
                    mockMetas[metaIndex] = { ...mockMetas[metaIndex], cumplida: true };
                    console.log(`Mock API: Meta con ID ${metaId} marcada como cumplida.`);
                    resolve(true);
                } else {
                    console.log(`Mock API: Meta con ID ${metaId} no encontrada.`);
                    reject(new Error('Meta no encontrada.'));
                }
            }, 400);
        });
    },
};
