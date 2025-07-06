// src/api/rutinaService.ts

import { PublicacionRutinaDTO, CreatePublicacionRutina, EjercicioDTO, CrearEjercicioDTO } from '../types/rutinaTypes';
import { mockRoutinePosts, mockEjerciciosData } from '../data/mockRoutinePosts';

// Base de datos simulada para rutinas
let currentMockRoutines: PublicacionRutinaDTO[] = [...mockRoutinePosts];
let nextRoutineId = Math.max(...mockRoutinePosts.map(r => r.id)) + 1;

// Base de datos mutable para ejercicios (ya que las rutinas dependen de ellos y se pueden crear nuevos)
let currentMockEjercicios: EjercicioDTO[] = [...mockEjerciciosData];
let nextEjercicioId = Math.max(...mockEjerciciosData.map(e => e.id)) + 1;

/**
 * @namespace rutinaService
 * @description Un objeto que simula las llamadas a la API para las publicaciones de rutinas y ejercicios.
 * Utiliza datos en memoria para el desarrollo.
 */
export const rutinaService = {
    /**
     * @method createRutina
     * @description Simula la creación de una nueva publicación de rutina.
     * @param {CreatePublicacionRutina} data - Los datos de la nueva rutina.
     * @param {string} userId - El ID del usuario que crea la rutina.
     * @returns {Promise<PublicacionRutinaDTO>} Una promesa que resuelve con la rutina creada.
     */
    createRutina: async (data: CreatePublicacionRutina, userId: string): Promise<PublicacionRutinaDTO> => {
        console.log(`Mock API: Creando nueva publicación de rutina para el usuario ${userId}...`);
        return new Promise((resolve) => {
            setTimeout(() => {
                const selectedEjercicios: EjercicioDTO[] = currentMockEjercicios.filter(ej => data.ejercicioIds.includes(ej.id));

                const newRoutine: PublicacionRutinaDTO = {
                    id: nextRoutineId++,
                    titulo: data.titulo,
                    contenido: data.descripcion,
                    fechaCreacion: new Date().toISOString(),
                    autor: 'Usuario Mock',
                    verificada: false,
                    nombreRutina: data.nombreRutina,
                    duracion: data.duracion,
                    frecuencia: data.frecuencia,
                    nivel: data.dificultad,
                    userId: parseInt(userId.replace('user-', '')),
                    ejercicios: selectedEjercicios,
                };
                currentMockRoutines.push(newRoutine);
                console.log('Mock API: Nueva publicación de rutina creada:', newRoutine);
                resolve(newRoutine);
            }, 500);
        });
    },

    /**
     * @method getOwnRoutines
     * @description Simula la obtención de publicaciones de rutinas de un usuario específico.
     * @param {string} userId - El ID del usuario cuyas rutinas se van a obtener.
     * @returns {Promise<PublicacionRutinaDTO[]>} Una promesa que resuelve con la lista de rutinas del usuario.
     */
    getOwnRoutines: async (userId: string): Promise<PublicacionRutinaDTO[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const numericUserId = parseInt(userId.replace('user-', ''));
                const userRoutines = currentMockRoutines.filter(routine => routine.userId === numericUserId);
                resolve([...userRoutines]);
            }, 300);
        });
    },

    /**
     * @method getAllEjercicios
     * @description Simula la obtención de todos los ejercicios disponibles.
     * @returns {Promise<EjercicioDTO[]>} Una promesa que resuelve con la lista de todos los ejercicios.
     */
    getAllEjercicios: async (): Promise<EjercicioDTO[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve([...currentMockEjercicios]);
            }, 200);
        });
    },

    /**
     * @method createEjercicio
     * @description Simula la creación de un nuevo ejercicio.
     * @param {CrearEjercicioDTO} data - Los datos del nuevo ejercicio.
     * @param {any} [imageFile] - Opcional: El archivo de imagen a "subir".
     * @returns {Promise<EjercicioDTO>} Una promesa que resuelve con el ejercicio creado.
     */
    createEjercicio: async (data: CrearEjercicioDTO, imageFile?: any): Promise<EjercicioDTO> => {
        console.log('Mock API: Creando nuevo ejercicio...');
        return new Promise((resolve) => {
            setTimeout(() => {
                let imageUrl: string | undefined;
                if (imageFile) {
                    // Simulate image upload and get a URL
                    imageUrl = `https://placehold.co/200x200/ABCDEF/000000?text=Ejercicio+${nextEjercicioId}`;
                    console.log('Mock API: Imagen "subida" a:', imageUrl);
                }

                const newEjercicio: EjercicioDTO = {
                    id: nextEjercicioId++,
                    nombre: data.nombre,
                    descripcion: data.descripcion,
                    grupoMuscular: 'General', // Asignar un valor predeterminado ya que no está en CrearEjercicioDTO del backend
                    series: data.series,
                    repeticiones: data.repeticiones,
                    descansoSegundos: data.descansoSegundos,
                    pesoKg: data.pesoKg,
                    imagenUrl: imageUrl, // Asignar la URL de la imagen
                };
                currentMockEjercicios.push(newEjercicio);
                console.log('Mock API: Nuevo ejercicio creado:', newEjercicio);
                resolve(newEjercicio);
            }, 500);
        });
    },

    /**
     * @method getById
     * @description Simula la obtención de una publicación de rutina por su ID.
     * @param {number} id - El ID de la publicación a obtener.
     * @returns {Promise<PublicacionRutinaDTO | undefined>} Una promesa que resuelve con la publicación o undefined si no se encuentra.
     */
    getById: async (id: number): Promise<PublicacionRutinaDTO | undefined> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                const post = currentMockRoutines.find(p => p.id === id);
                resolve(post);
            }, 200);
        });
    },

    /**
     * @method eliminar
     * @description Simula la eliminación de una publicación de rutina por su ID.
     * @param {number} id - El ID de la rutina a eliminar.
     * @returns {Promise<boolean>} Una promesa que resuelve a `true` si la eliminación fue exitosa.
     */
    eliminar: async (id: number): Promise<boolean> => {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const initialLength = currentMockRoutines.length;
                currentMockRoutines = currentMockRoutines.filter(routine => routine.id !== id);
                if (currentMockRoutines.length < initialLength) {
                    console.log(`Mock API: Publicación de rutina con ID ${id} eliminada.`);
                    resolve(true);
                } else {
                    console.log(`Mock API: Publicación de rutina con ID ${id} no encontrada para eliminar.`);
                    reject(new Error('Rutina no encontrada o no se pudo eliminar.'));
                }
            }, 400);
        });
    },
};
