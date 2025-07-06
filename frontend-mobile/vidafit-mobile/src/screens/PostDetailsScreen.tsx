// src/screens/PostDetailsScreen.tsx

import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    ActivityIndicator,
    ScrollView,
    Alert,
    TouchableOpacity,
    Image // Import Image for displaying exercise images
} from 'react-native';
import { RouteProp, useRoute, useFocusEffect } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../navigation/AppNavigator';
import { PublicacionPlanAlimentacionDTO } from '../types/planAlimentacionTypes';
import { PublicacionProgresoDTO } from '../types/progresoTypes';
import { PublicacionRutinaDTO, EjercicioDTO } from '../types/rutinaTypes';
import { planAlimentacionService } from '../api/planAlimentacionService';
import { progresoService } from '../api/progresoService';
import { rutinaService } from '../api/rutinaService';

// Define un tipo de unión para todos los DTO de publicación posibles
type AnyPostDTO = PublicacionPlanAlimentacionDTO | PublicacionProgresoDTO | PublicacionRutinaDTO;

/**
 * @interface PostDetailsScreenProps
 * @description Define las propiedades para el componente PostDetailsScreen.
 * @property {StackNavigationProp<RootStackParamList, 'PostDetails'>} navigation - Propiedad de navegación de React Navigation.
 * @property {RouteProp<RootStackParamList, 'PostDetails'>} route - Propiedad de ruta de React Navigation,
 * que contiene los parámetros postId y postType.
 */
interface PostDetailsScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'PostDetails'>;
    route: RouteProp<RootStackParamList, 'PostDetails'>;
}

/**
 * @function PostDetailsScreen
 * @description Un componente funcional de React Native que muestra los detalles completos de una publicación.
 * La publicación a mostrar se determina por los parámetros `postId` y `postType` pasados a través de la ruta.
 * Fetch los detalles de la publicación utilizando el servicio apropiado y los renderiza.
 * @param {PostDetailsScreenProps} props - Las propiedades del componente.
 * @returns {JSX.Element} La pantalla renderizada de Detalles de la Publicación.
 */
const PostDetailsScreen: React.FC<PostDetailsScreenProps> = ({ navigation }) => {
    const route = useRoute<RouteProp<RootStackParamList, 'PostDetails'>>();
    const { postId, postType } = route.params;

    const [postData, setPostData] = useState<AnyPostDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    /**
     * @function fetchPostDetails
     * @description Obtiene los detalles de la publicación específica según su tipo y ID.
     * Utiliza un `switch` para llamar al servicio correcto.
     */
    const fetchPostDetails = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            let fetchedPost: AnyPostDTO | undefined;
            switch (postType) {
                case 'FoodPlan':
                    fetchedPost = await planAlimentacionService.getById(postId);
                    break;
                case 'ProgressPost':
                    fetchedPost = await progresoService.getById(postId);
                    break;
                case 'RoutinePost':
                    fetchedPost = await rutinaService.getById(postId);
                    break;
                default:
                    setError('Tipo de publicación desconocido.');
                    return;
            }

            if (fetchedPost) {
                setPostData(fetchedPost);
            } else {
                setError('Publicación no encontrada.');
            }
        } catch (err) {
            console.error('Error al obtener detalles de la publicación:', err);
            setError('No se pudieron cargar los detalles de la publicación. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    }, [postId, postType]);

    // Usar useFocusEffect para volver a obtener datos cuando la pantalla entra en foco
    useFocusEffect(
        useCallback(() => {
            fetchPostDetails();
        }, [fetchPostDetails])
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Cargando detalles de la publicación...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchPostDetails}>
                    <Text style={styles.retryButtonText}>Reintentar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    if (!postData) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>No se encontraron datos para esta publicación.</Text>
            </View>
        );
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>{postData.titulo}</Text>
            <Text style={styles.postContent}>{postData.contenido}</Text>

            {/* Common Details for all posts */}
            <View style={styles.commonDetails}>
                <Text style={styles.detailText}>Autor: {postData.autor}</Text>
                <Text style={styles.detailText}>Creado: {new Date(postData.fechaCreacion).toLocaleDateString()}</Text>
                <Text style={styles.detailText}>Verificado: {postData.verificada ? 'Sí' : 'No'}</Text>
            </View>

            {postType === 'FoodPlan' && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Detalles del Plan de Alimentación</Text>
                    <Text style={styles.detailText}>Tipo de Dieta: {(postData as PublicacionPlanAlimentacionDTO).tipoDieta}</Text>
                    <Text style={styles.detailText}>Calorías: {(postData as PublicacionPlanAlimentacionDTO).calorias}</Text>
                    <Text style={styles.detailText}>Objetivos: {(postData as PublicacionPlanAlimentacionDTO).objetivos}</Text>
                    <Text style={styles.detailText}>Restricciones: {(postData as PublicacionPlanAlimentacionDTO).restricciones}</Text>
                </View>
            )}

            {postType === 'ProgressPost' && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Detalles de la Publicación de Progreso</Text>
                    <Text style={styles.detailText}>Fecha Inicio: {(postData as PublicacionProgresoDTO).fechaInicio}</Text>
                    <Text style={styles.detailText}>Fecha Fin: {(postData as PublicacionProgresoDTO).fechaFin}</Text>
                    <Text style={styles.detailText}>Peso Inicial: {(postData as PublicacionProgresoDTO).pesoInicio} kg</Text>
                    <Text style={styles.detailText}>Peso Final: {(postData as PublicacionProgresoDTO).pesoFin} kg</Text>
                    <Text style={styles.detailText}>Promedio Peso: {(postData as PublicacionProgresoDTO).promedioPeso} kg</Text>
                    <Text style={[styles.detailText, (postData as PublicacionProgresoDTO).cambioPeso > 0 ? styles.weightGain : styles.weightLoss]}>
                        Cambio: {(postData as PublicacionProgresoDTO).cambioPeso > 0 ? '+' : ''}{(postData as PublicacionProgresoDTO).cambioPeso} kg
                    </Text>
                </View>
            )}

            {postType === 'RoutinePost' && (
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Detalles de la Rutina de Ejercicio</Text>
                    <Text style={styles.detailText}>Nombre Rutina: {(postData as PublicacionRutinaDTO).nombreRutina}</Text>
                    <Text style={styles.detailText}>Duración: {(postData as PublicacionRutinaDTO).duracion} minutos</Text>
                    <Text style={styles.detailText}>Frecuencia: {(postData as PublicacionRutinaDTO).frecuencia}</Text>
                    <Text style={styles.detailText}>Nivel: {(postData as PublicacionRutinaDTO).nivel}</Text>
                    <Text style={styles.detailText}>Ejercicios:</Text>
                    {(postData as PublicacionRutinaDTO).ejercicios && (postData as PublicacionRutinaDTO).ejercicios.length > 0 ? (
                        <View style={styles.exercisesList}>
                            {(postData as PublicacionRutinaDTO).ejercicios.map((ej: EjercicioDTO) => (
                                <View key={ej.id} style={styles.exerciseDetailCard}>
                                    {ej.imagenUrl && (
                                        <Image source={{ uri: ej.imagenUrl }} style={styles.exerciseImage} />
                                    )}
                                    <Text style={styles.exerciseDetailName}>{ej.nombre}</Text>
                                    <Text style={styles.exerciseDetailText}>Grupo Muscular: {ej.grupoMuscular}</Text>
                                    <Text style={styles.exerciseDetailText}>Descripción: {ej.descripcion}</Text>
                                    <Text style={styles.exerciseDetailText}>Series: {ej.series}</Text>
                                    <Text style={styles.exerciseDetailText}>Repeticiones: {ej.repeticiones}</Text>
                                    <Text style={styles.exerciseDetailText}>Descanso: {ej.descansoSegundos}s</Text>
                                    <Text style={styles.exerciseDetailText}>Peso: {ej.pesoKg}kg</Text>
                                </View>
                            ))}
                        </View>
                    ) : (
                        <Text style={styles.exerciseItem}>No hay ejercicios asignados.</Text>
                    )}
                </View>
            )}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        padding: 20,
        paddingTop: 50,
    },
    centered: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f4f8',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#555',
    },
    errorText: {
        fontSize: 18,
        color: '#D32F2F',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryButton: {
        backgroundColor: '#007AFF',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 8,
    },
    retryButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 15,
        textAlign: 'center',
    },
    postContent: {
        fontSize: 16,
        color: '#555',
        marginBottom: 20,
        lineHeight: 24,
    },
    commonDetails: {
        borderTopWidth: 1,
        borderTopColor: '#eee',
        paddingTop: 15,
        marginBottom: 20,
    },
    section: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    sectionTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#34495e',
        marginBottom: 10,
    },
    detailText: {
        fontSize: 15,
        color: '#777',
        marginBottom: 5,
    },
    weightGain: {
        color: '#2ecc71',
        fontWeight: 'bold',
    },
    weightLoss: {
        color: '#e74c3c',
        fontWeight: 'bold',
    },
    exercisesList: {
        marginTop: 10,
        // marginLeft: 10, // Removed to allow full width for exercise cards
    },
    exerciseItem: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    exerciseDetailCard: {
        backgroundColor: '#f8f8f8', // Slightly different background for nested card
        borderRadius: 8,
        padding: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e0e0e0',
    },
    exerciseImage: {
        width: '100%',
        height: 150,
        borderRadius: 8,
        marginBottom: 10,
        resizeMode: 'cover',
        backgroundColor: '#eee', // Placeholder background
    },
    exerciseDetailName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    exerciseDetailText: {
        fontSize: 14,
        color: '#555',
        marginBottom: 2,
    },
});

export default PostDetailsScreen;
