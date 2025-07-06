// src/api/progresoService.ts

import { PublicacionProgresoDTO, CreatePublicacionProgreso } from '../types/progresoTypes';

// Datos simulados en memoria para propósitos de desarrollo
let mockProgresoPosts: PublicacionProgresoDTO[] = [
    {
        id: 201,
        titulo: 'Progreso Semanal de Peso',
        contenido: 'Seguimiento de mi peso durante la última semana.',
        fechaCreacion: '2023-04-10T10:00:00',
        autor: 'Laura Fit',
        verificada: true,
        fechaInicio: '2023-04-03',
        fechaFin: '2023-04-09',
        pesoInicio: 70.5,
        pesoFin: 69.8,
        promedioPeso: 70.15,
        cambioPeso: -0.7,
        userId: 123, // Simula el ID del usuario
    },
    {
        id: 202,
        titulo: 'Avance Mensual de Entrenamiento',
        contenido: 'Resumen de mi progreso en el gimnasio este mes.',
        fechaCreacion: '2023-04-20T14:00:00',
        autor: 'Roberto Power',
        verificada: false,
        fechaInicio: '2023-03-20',
        fechaFin: '2023-04-19',
        pesoInicio: 80.0,
        pesoFin: 81.2,
        promedioPeso: 80.6,
        cambioPeso: 1.2,
        userId: 456, // Otro usuario simulado
    },
    {
        id: 203,
        titulo: 'Mi Progreso de 30 Días',
        contenido: 'Resultados de mi desafío de fitness de un mes.',
        fechaCreacion: '2023-05-01T09:00:00',
        autor: 'Laura Fit',
        verificada: true,
        fechaInicio: '2023-04-01',
        fechaFin: '2023-04-30',
        pesoInicio: 69.0,
        pesoFin: 68.5,
        promedioPeso: 68.75,
        cambioPeso: -0.5,
        userId: 123,
    },
];

let nextProgresoId = Math.max(...mockProgresoPosts.map(p => p.id)) + 1;

/**
 * @namespace progresoService
 * @description Un objeto que simula las llamadas a la API para las publicaciones de progreso.
 * Utiliza datos en memoria para el desarrollo.
 */
export const progresoService = {
    /**
     * @method create
     * @description Simula la creación de una nueva publicación de progreso.
     * @param {CreatePublicacionProgreso} data - Los datos de la nueva publicación de progreso.
     * @param {string} userId - El ID del usuario que crea la publicación.
     * @returns {Promise<PublicacionProgresoDTO>} Una promesa que resuelve con la publicación de progreso creada.
     */
    create: async (data: CreatePublicacionProgreso, userId: string): Promise<PublicacionProgresoDTO> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const cambioPeso = data.pesoFin - data.pesoInicio;
                const promedioPeso = (data.pesoInicio + data.pesoFin) / 2;

                const newPost: PublicacionProgresoDTO = {
                    id: nextProgresoId++,
                    titulo: data.titulo,
                    contenido: data.contenido,
                    fechaCreacion: new Date().toISOString(), // Simular fecha de creación
                    autor: 'Usuario Mock', // Simular autor
                    verificada: false, // Por defecto no verificada
                    fechaInicio: data.fechaInicio,
                    fechaFin: data.fechaFin,
                    pesoInicio: data.pesoInicio,
                    pesoFin: data.pesoFin,
                    promedioPeso: promedioPeso,
                    cambioPeso: cambioPeso,
                    userId: parseInt(userId.replace('user-', '')),
                };
                mockProgresoPosts.push(newPost);
                resolve(newPost);
            }, 500);
        });
    },

    /**
     * @method getOwnPosts
     * @description Simula la obtención de publicaciones de progreso de un usuario específico.
     * @param {string} userId - El ID del usuario cuyas publicaciones se van a obtener.
     * @returns {Promise<PublicacionProgresoDTO[]>} Una promesa que resuelve con la lista de publicaciones de progreso del usuario.
     */
    getOwnPosts: async (userId: string): Promise<PublicacionProgresoDTO[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const numericUserId = parseInt(userId.replace('user-', ''));
                const userPosts = mockProgresoPosts.filter(post => post.userId === numericUserId);
                resolve([...userPosts]);
            }, 300);
        });
    },

    /**
     * @method eliminar
     * @description Simula la eliminación de una publicación de progreso por su ID.
     * @param {number} id - El ID de la publicación a eliminar.
     * @returns {Promise<boolean>} Una promesa que resuelve a `true` si la eliminación fue exitosa.
     */
    eliminar: async (id: number): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const initialLength = mockProgresoPosts.length;
                mockProgresoPosts = mockProgresoPosts.filter(post => post.id !== id);
                if (mockProgresoPosts.length < initialLength) {
                    resolve(true);
                } else {
                    reject(new Error('Publicación de progreso no encontrada o no se pudo eliminar.'));
                }
            }, 400);
        });
    },
};
