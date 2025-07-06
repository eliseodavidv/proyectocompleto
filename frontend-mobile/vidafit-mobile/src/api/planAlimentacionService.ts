// src/api/planAlimentacionService.ts

import { PublicacionPlanAlimentacionDTO, CreatePlanAlimentacion } from '../types/planAlimentacionTypes';

// Datos simulados en memoria para propósitos de desarrollo
let mockFoodPlanPosts: PublicacionPlanAlimentacionDTO[] = [
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

let nextFoodPlanId = Math.max(...mockFoodPlanPosts.map(p => p.id)) + 1;

/**
 * @namespace planAlimentacionService
 * @description Un objeto que simula las llamadas a la API para las publicaciones de planes de alimentación.
 * Utiliza datos en memoria para el desarrollo.
 */
export const planAlimentacionService = {
    /**
     * @method create
     * @description Simula la creación de una nueva publicación de plan de alimentación.
     * @param {CreatePlanAlimentacion} data - Los datos del nuevo plan de alimentación.
     * @param {string} userId - El ID del usuario que crea el plan.
     * @returns {Promise<PublicacionPlanAlimentacionDTO>} Una promesa que resuelve con el plan de alimentación creado.
     */
    create: async (data: CreatePlanAlimentacion, userId: string): Promise<PublicacionPlanAlimentacionDTO> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const newPost: PublicacionPlanAlimentacionDTO = {
                    id: nextFoodPlanId++,
                    titulo: data.titulo,
                    contenido: data.contenido,
                    fechaCreacion: new Date().toISOString(), // Simular fecha de creación
                    autor: 'Usuario Mock', // Simular autor
                    verificada: false, // Por defecto no verificada
                    tipoDieta: data.tipoDieta,
                    calorias: data.calorias,
                    objetivos: data.objetivos,
                    restricciones: data.restricciones,
                    userId: parseInt(userId.replace('user-', '')),
                };
                mockFoodPlanPosts.push(newPost);
                resolve(newPost);
            }, 500);
        });
    },

    /**
     * @method getOwnPosts
     * @description Simula la obtención de publicaciones de planes de alimentación de un usuario específico.
     * @param {string} userId - El ID del usuario cuyas publicaciones se van a obtener.
     * @returns {Promise<PublicacionPlanAlimentacionDTO[]>} Una promesa que resuelve con la lista de planes de alimentación del usuario.
     */
    getOwnPosts: async (userId: string): Promise<PublicacionPlanAlimentacionDTO[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const numericUserId = parseInt(userId.replace('user-', ''));
                const userPosts = mockFoodPlanPosts.filter(post => post.userId === numericUserId);
                resolve([...userPosts]);
            }, 300);
        });
    },

    /**
     * @method getById
     * @description Simula la obtención de una publicación de plan de alimentación por su ID.
     * @param {number} id - El ID de la publicación a obtener.
     * @returns {Promise<PublicacionPlanAlimentacionDTO | undefined>} Una promesa que resuelve con la publicación o undefined si no se encuentra.
     */
    getById: async (id: number): Promise<PublicacionPlanAlimentacionDTO | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const post = mockFoodPlanPosts.find(p => p.id === id);
                resolve(post);
            }, 200);
        });
    },

    /**
     * @method eliminar
     * @description Simula la eliminación de una publicación de plan de alimentación por su ID.
     * @param {number} id - El ID de la publicación a eliminar.
     * @returns {Promise<boolean>} Una promesa que resuelve a `true` si la eliminación fue exitosa.
     */
    eliminar: async (id: number): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const initialLength = mockFoodPlanPosts.length;
                mockFoodPlanPosts = mockFoodPlanPosts.filter(post => post.id !== id);
                if (mockFoodPlanPosts.length < initialLength) {
                    resolve(true);
                } else {
                    reject(new Error('Publicación de plan de alimentación no encontrada o no se pudo eliminar.'));
                }
            }, 400);
        });
    },
};
