// src/screens/CreateRoutinePostScreen.tsx

import React, { useState, useEffect, useCallback } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    ScrollView,
    FlatList
} from 'react-native';
import { useFocusEffect, RouteProp } from '@react-navigation/native'; // Corrected import for useFocusEffect
import { StackNavigationProp } from '@react-navigation/stack';
import { CreatePublicacionRutina, EjercicioDTO } from '../types/rutinaTypes';
import { rutinaService } from '../api/rutinaService'; // Import the new service
import { RootStackParamList } from '../navigation/AppNavigator';

/**
 * @interface CreateRoutinePostScreenProps
 * @description Define las propiedades para el componente CreateRoutinePostScreen.
 * @property {StackNavigationProp<RootStackParamList, 'CreateRoutinePost'>} navigation - Propiedad de navegación de React Navigation.
 * @property {RouteProp<RootStackParamList, 'CreateRoutinePost'>} route - Propiedad de ruta de React Navigation (no utilizada aquí, pero buena práctica).
 */
interface CreateRoutinePostScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'CreateRoutinePost'>;
    route: RouteProp<RootStackParamList, 'CreateRoutinePost'>;
}

/**
 * @function CreateRoutinePostScreen
 * @description Un componente funcional de React Native para crear una nueva publicación de rutina.
 * Proporciona un formulario para los detalles de la rutina y permite seleccionar ejercicios de una lista.
 * Llama al servicio simulado `rutinaService` para crear la publicación. En caso de éxito, navega hacia atrás.
 * Incluye un botón para navegar a la pantalla de creación de ejercicios y recarga la lista de ejercicios
 * cuando la pantalla vuelve a estar en foco.
 * @param {CreateRoutinePostScreenProps} props - Las propiedades del componente.
 * @returns {JSX.Element} La pantalla renderizada de Crear Publicación de Rutina.
 */
const CreateRoutinePostScreen: React.FC<CreateRoutinePostScreenProps> = ({ navigation }): React.JSX.Element => {
    const [titulo, setTitulo] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [nombreRutina, setNombreRutina] = useState('');
    const [duracion, setDuracion] = useState(''); // Convert to number before sending
    const [frecuencia, setFrecuencia] = useState('');
    const [dificultad, setDificultad] = useState('');
    const [selectedEjercicioIds, setSelectedEjercicioIds] = useState<number[]>([]);
    const [allEjercicios, setAllEjercicios] = useState<EjercicioDTO[]>([]);
    const [loadingEjercicios, setLoadingEjercicios] = useState(true);
    const [isAddingRoutinePost, setIsAddingRoutinePost] = useState(false);

    // Simular un ID de usuario logueado.
    const mockLoggedInUserId = 'user-123';

    /**
     * @function fetchEjercicios
     * @description Obtiene todos los ejercicios disponibles del servicio.
     */
    const fetchEjercicios = useCallback(async () => {
        setLoadingEjercicios(true);
        try {
            const ejercicios = await rutinaService.getAllEjercicios();
            setAllEjercicios(ejercicios);
        } catch (error) {
            console.error('Error al cargar ejercicios:', error);
            Alert.alert('Error', 'No se pudieron cargar los ejercicios.');
        } finally {
            setLoadingEjercicios(false);
        }
    }, []);

    // Usar useFocusEffect para volver a obtener ejercicios cuando la pantalla entra en foco
    useFocusEffect(
        useCallback(() => {
            fetchEjercicios();
        }, [fetchEjercicios])
    );

    /**
     * @function toggleEjercicioSelection
     * @description Alterna la selección de un ejercicio.
     * @param {number} ejercicioId - El ID del ejercicio a seleccionar/deseleccionar.
     */
    const toggleEjercicioSelection = (ejercicioId: number) => {
        setSelectedEjercicioIds(prev =>
            prev.includes(ejercicioId)
                ? prev.filter(id => id !== ejercicioId)
                : [...prev, ejercicioId]
        );
    };

    /**
     * @function handleAddRoutinePost
     * @description Maneja el envío del formulario para agregar una nueva publicación de rutina.
     * Valida los datos y llama al servicio simulado.
     * Navega hacia atrás en caso de éxito.
     */
    const handleAddRoutinePost = async () => {
        if (!titulo || !descripcion || !nombreRutina || !duracion || !frecuencia || !dificultad || selectedEjercicioIds.length === 0) {
            Alert.alert('Error de Entrada', 'Por favor, completa todos los campos y selecciona al menos un ejercicio.');
            return;
        }

        const duracionNum = parseInt(duracion, 10);
        if (isNaN(duracionNum) || duracionNum <= 0) {
            Alert.alert('Error de Entrada', 'La duración debe ser un número positivo.');
            return;
        }

        const newPostData: CreatePublicacionRutina = {
            titulo,
            descripcion,
            nombreRutina,
            duracion: duracionNum,
            frecuencia,
            dificultad,
            ejercicioIds: selectedEjercicioIds,
        };

        setIsAddingRoutinePost(true);
        try {
            const addedPost = await rutinaService.createRutina(newPostData, mockLoggedInUserId);
            Alert.alert('Éxito', `¡Rutina "${addedPost.titulo}" agregada!`);
            navigation.goBack();
        } catch (err) {
            console.error('Error al agregar publicación de rutina:', err);
            Alert.alert('Error', 'No se pudo agregar la publicación de rutina.');
        } finally {
            setIsAddingRoutinePost(false);
        }
    };

    const renderEjercicioItem = ({ item }: { item: EjercicioDTO }) => (
        <TouchableOpacity
            style={[
                styles.ejercicioItem,
                selectedEjercicioIds.includes(item.id) && styles.ejercicioItemSelected,
            ]}
            onPress={() => toggleEjercicioSelection(item.id)}
        >
            <Text style={styles.ejercicioName}>{item.nombre}</Text>
            <Text style={styles.ejercicioGroup}>{item.grupoMuscular}</Text>
            <Text style={styles.ejercicioDetails}>
                {item.series} series, {item.repeticiones} reps, {item.descansoSegundos}s descanso, {item.pesoKg}kg
            </Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Crear Publicación de Rutina</Text>

            <TextInput
                style={styles.input}
                placeholder="Título"
                placeholderTextColor="#999"
                value={titulo}
                onChangeText={setTitulo}
            />
            <TextInput
                style={styles.input}
                placeholder="Descripción"
                placeholderTextColor="#999"
                value={descripcion}
                onChangeText={setDescripcion}
                multiline
            />
            <TextInput
                style={styles.input}
                placeholder="Nombre de la Rutina"
                placeholderTextColor="#999"
                value={nombreRutina}
                onChangeText={setNombreRutina}
            />
            <TextInput
                style={styles.input}
                placeholder="Duración (en minutos, ej. 60)"
                placeholderTextColor="#999"
                value={duracion}
                onChangeText={setDuracion}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Frecuencia (ej. Diaria, 3 veces/semana)"
                placeholderTextColor="#999"
                value={frecuencia}
                onChangeText={setFrecuencia}
            />
            <TextInput
                style={styles.input}
                placeholder="Dificultad (ej. Principiante, Intermedio, Avanzado)"
                placeholderTextColor="#999"
                value={dificultad}
                onChangeText={setDificultad}
            />

            <View style={styles.sectionHeaderContainer}>
                <Text style={styles.sectionHeader}>Seleccionar Ejercicios:</Text>
                <TouchableOpacity
                    style={styles.createExerciseButton}
                    onPress={() => navigation.navigate('CreateExercise')} // Navegar a la pantalla de creación de ejercicios
                >
                    <Text style={styles.createExerciseButtonText}>+ Crear Ejercicio</Text>
                </TouchableOpacity>
            </View>

            {loadingEjercicios ? (
                <ActivityIndicator size="small" color="#007AFF" />
            ) : (
                <View style={styles.ejerciciosContainer}>
                    <FlatList
                        data={allEjercicios}
                        renderItem={renderEjercicioItem}
                        keyExtractor={(item) => item.id.toString()}
                        numColumns={2} // Display in two columns
                        columnWrapperStyle={styles.ejercicioColumnWrapper}
                        scrollEnabled={false} // Disable FlatList's own scroll as it's inside a ScrollView
                    />
                </View>
            )}

            <TouchableOpacity
                style={[styles.addButton, isAddingRoutinePost && styles.addButtonDisabled]}
                onPress={handleAddRoutinePost}
                disabled={isAddingRoutinePost}
            >
                {isAddingRoutinePost ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.addButtonText}>Crear Publicación de Rutina</Text>
                )}
            </TouchableOpacity>
            <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => navigation.goBack()}
            >
                <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
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
    header: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 30,
        textAlign: 'center',
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 15,
        fontSize: 16,
        color: '#333',
        backgroundColor: '#fff',
    },
    sectionHeaderContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 15,
    },
    sectionHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#2c3e50',
    },
    createExerciseButton: {
        backgroundColor: '#3498db',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
    },
    createExerciseButtonText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    ejerciciosContainer: {
        // Add styles for the container if needed
    },
    ejercicioColumnWrapper: {
        justifyContent: 'space-between',
    },
    ejercicioItem: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#e0e0e0',
        marginBottom: 10,
        width: '48%', // Approx half width for two columns
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
        elevation: 2,
    },
    ejercicioItemSelected: {
        borderColor: '#3498db',
        backgroundColor: '#eaf6fa', // Light blue background for selected
    },
    ejercicioName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
    },
    ejercicioGroup: {
        fontSize: 13,
        color: '#777',
        marginTop: 4,
        textAlign: 'center',
    },
    ejercicioDetails: {
        fontSize: 12,
        color: '#555',
        marginTop: 4,
        textAlign: 'center',
    },
    addButton: {
        backgroundColor: '#2ecc71',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    addButtonDisabled: {
        backgroundColor: '#a9dfbf',
    },
    addButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    cancelButton: {
        backgroundColor: '#95a5a6',
        paddingVertical: 15,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    cancelButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default CreateRoutinePostScreen;
