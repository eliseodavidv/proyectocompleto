// src/screens/MetasScreen.tsx

import React, { useState, useCallback } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    TextInput,
    Modal,
    Platform, // Import Platform to check OS for date picker
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { MetaDTO, CreateMetaDTO } from '../types/metaTypes';
import { metaService } from '../api/metaService';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker

/**
 * @interface MetasScreenProps
 * @description Define las propiedades para el componente MetasScreen.
 * Actualmente, no se requieren propiedades específicas.
 */
interface MetasScreenProps { }

/**
 * @function MetasScreen
 * @description Un componente funcional de React Native que muestra y gestiona las metas del usuario.
 * Permite ver metas, añadir nuevas y marcarlas como cumplidas.
 * @param {MetasScreenProps} props - Las propiedades del componente.
 * @returns {JSX.Element} La pantalla renderizada de Metas.
 */
const MetasScreen: React.FC<MetasScreenProps> = () => {
    const [metas, setMetas] = useState<MetaDTO[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isAddingMeta, setIsAddingMeta] = useState(false);
    const [newMetaDescription, setNewMetaDescription] = useState('');
    const [newMetaFechaFin, setNewMetaFechaFin] = useState(''); // Stores date as YYYY-MM-DD string
    const [isModalVisible, setIsModalVisible] = useState(false);

    // State for DatePicker
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date()); // Date object for the picker

    // Simular un ID de usuario logueado.
    const mockLoggedInUserId = 'user-123';

    /**
     * @function fetchMetas
     * @description Obtiene la lista de metas del usuario desde el servicio.
     * Maneja el estado de carga y el reporte de errores.
     */
    const fetchMetas = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const fetchedMetas = await metaService.getMetasByUserId(mockLoggedInUserId);
            setMetas(fetchedMetas);
        } catch (err) {
            console.error('Error al obtener metas:', err);
            setError('No se pudieron cargar las metas. Por favor, inténtalo de nuevo más tarde.');
        } finally {
            setLoading(false);
        }
    }, []);

    // Usar useFocusEffect para volver a obtener datos cuando la pantalla entra en foco
    useFocusEffect(
        useCallback(() => {
            fetchMetas();
        }, [fetchMetas])
    );

    /**
     * @function onDateChange
     * @description Maneja el cambio de fecha en el DatePicker.
     * Actualiza la fecha seleccionada y el formato de string para el input.
     * @param {Event} event - El evento del cambio de fecha.
     * @param {Date | undefined} date - La fecha seleccionada.
     */
    const onDateChange = (event: any, date?: Date) => {
        setShowDatePicker(Platform.OS === 'ios'); // Keep picker open on iOS until confirmed
        if (date) {
            setSelectedDate(date);
            setNewMetaFechaFin(date.toISOString().split('T')[0]); // Format to YYYY-MM-DD
        }
    };

    /**
     * @function handleAddMeta
     * @description Maneja la creación de una nueva meta.
     * Valida la entrada y llama al servicio para crear la meta.
     */
    const handleAddMeta = async () => {
        if (!newMetaDescription.trim() || !newMetaFechaFin.trim()) {
            Alert.alert('Error de Entrada', 'Por favor, ingresa la descripción y la fecha de fin de la meta.');
            return;
        }

        // Basic date format validation (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(newMetaFechaFin)) {
            Alert.alert('Formato de Fecha Inválido', 'La fecha de fin debe estar en formato YYYY-MM-DD.');
            return;
        }

        setIsAddingMeta(true);
        try {
            const newMeta: CreateMetaDTO = {
                descripcion: newMetaDescription,
                fechaInicio: new Date().toISOString().split('T')[0], // Current date as YYYY-MM-DD
                fechaFin: newMetaFechaFin,
            };
            const createdMeta = await metaService.createMeta(newMeta, mockLoggedInUserId);
            setMetas(prevMetas => [...prevMetas, createdMeta]);
            Alert.alert('Éxito', `¡Meta "${createdMeta.descripcion}" creada!`);
            setNewMetaDescription('');
            setNewMetaFechaFin('');
            setSelectedDate(new Date()); // Reset selected date for next time
            setIsModalVisible(false); // Close modal on success
        } catch (err) {
            console.error('Error al crear meta:', err);
            Alert.alert('Error', 'No se pudo crear la meta.');
        } finally {
            setIsAddingMeta(false);
        }
    };

    /**
     * @function handleMarkAsCompleted
     * @description Maneja el marcado de una meta como cumplida.
     * @param {number} metaId - El ID de la meta a marcar.
     * @param {string} descripcion - La descripción de la meta (para el mensaje de confirmación).
     */
    const handleMarkAsCompleted = async (metaId: number, descripcion: string) => {
        Alert.alert(
            'Confirmar Cumplimiento',
            `¿Estás seguro de que quieres marcar la meta "${descripcion}" como cumplida?`,
            [
                { text: 'Cancelar', style: 'cancel' },
                {
                    text: 'Marcar',
                    onPress: async () => {
                        try {
                            const success = await metaService.markMetaAsCompleted(metaId);
                            if (success) {
                                setMetas(prevMetas =>
                                    prevMetas.map(meta =>
                                        meta.id === metaId ? { ...meta, cumplida: true } : meta
                                    )
                                );
                                Alert.alert('Éxito', `¡Meta "${descripcion}" marcada como cumplida!`);
                            } else {
                                Alert.alert('Error', `No se pudo marcar la meta "${descripcion}" como cumplida.`);
                            }
                        } catch (err) {
                            console.error('Error al marcar meta como cumplida:', err);
                            Alert.alert('Error', 'Ocurrió un error al marcar la meta.');
                        }
                    },
                    style: 'default',
                },
            ],
            { cancelable: true }
        );
    };

    /**
     * @function renderMetaItem
     * @description Renderiza un elemento de meta en la FlatList.
     * @param {Object} item - El elemento de meta a renderizar.
     * @returns {JSX.Element} El componente del elemento de meta renderizado.
     */
    const renderMetaItem = ({ item }: { item: MetaDTO }) => (
        <View style={[styles.metaCard, item.cumplida && styles.metaCardCompleted]}>
            <View style={styles.metaContent}>
                <Text style={styles.metaDescription}>{item.descripcion}</Text>
                <Text style={styles.metaDates}>
                    Inicio: {item.fechaInicio} | Fin: {item.fechaFin}
                </Text>
                <Text style={[styles.metaStatus, item.cumplida ? styles.statusCompleted : styles.statusPending]}>
                    Estado: {item.cumplida ? 'Cumplida' : 'Pendiente'}
                </Text>
            </View>
            {!item.cumplida && (
                <TouchableOpacity
                    style={styles.completeButton}
                    onPress={() => handleMarkAsCompleted(item.id, item.descripcion)}
                >
                    <Text style={styles.completeButtonText}>✓</Text>
                </TouchableOpacity>
            )}
        </View>
    );

    if (loading) {
        return (
            <View style={styles.centered}>
                <ActivityIndicator size="large" color="#007AFF" />
                <Text style={styles.loadingText}>Cargando tus metas...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.centered}>
                <Text style={styles.errorText}>{error}</Text>
                <TouchableOpacity style={styles.retryButton} onPress={fetchMetas}>
                    <Text style={styles.retryButtonText}>Reintentar</Text>
                </TouchableOpacity>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Mis Metas</Text>

            {metas.length === 0 ? (
                <Text style={styles.noMetasText}>Aún no has establecido ninguna meta. ¡Crea una!</Text>
            ) : (
                <FlatList
                    data={metas}
                    renderItem={renderMetaItem}
                    keyExtractor={(item) => item.id.toString()}
                    contentContainerStyle={styles.listContent}
                />
            )}

            {/* Botón Flotante para Añadir Meta */}
            <TouchableOpacity
                style={styles.fab}
                onPress={() => setIsModalVisible(true)}
            >
                <Text style={styles.fabText}>+</Text>
            </TouchableOpacity>

            {/* Modal para Crear Nueva Meta */}
            <Modal
                animationType="slide"
                transparent={true}
                visible={isModalVisible}
                onRequestClose={() => setIsModalVisible(false)}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>Crear Nueva Meta</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Descripción de la meta"
                            placeholderTextColor="#999"
                            value={newMetaDescription}
                            onChangeText={setNewMetaDescription}
                            multiline
                        />
                        {/* Date Picker Integration */}
                        <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePickerButton}>
                            <Text style={styles.datePickerButtonText}>
                                Fecha de Fin: {newMetaFechaFin || 'Seleccionar fecha'}
                            </Text>
                        </TouchableOpacity>
                        {showDatePicker && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={selectedDate}
                                mode="date"
                                display="default"
                                onChange={onDateChange}
                            />
                        )}

                        <TouchableOpacity
                            style={[styles.modalAddButton, isAddingMeta && styles.modalAddButtonDisabled]}
                            onPress={handleAddMeta}
                            disabled={isAddingMeta}
                        >
                            {isAddingMeta ? (
                                <ActivityIndicator color="#fff" />
                            ) : (
                                <Text style={styles.modalButtonText}>Añadir Meta</Text>
                            )}
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.modalCancelButton}
                            onPress={() => setIsModalVisible(false)}
                        >
                            <Text style={styles.modalButtonText}>Cancelar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f0f4f8',
        paddingTop: 50,
        paddingHorizontal: 16,
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
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2c3e50',
        marginBottom: 20,
        textAlign: 'center',
    },
    listContent: {
        paddingBottom: 20,
    },
    metaCard: {
        backgroundColor: '#ffffff',
        borderRadius: 12,
        padding: 15,
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    metaCardCompleted: {
        backgroundColor: '#e6ffe6', // Light green for completed goals
        borderColor: '#2ecc71',
        borderWidth: 1,
    },
    metaContent: {
        flex: 1,
        marginRight: 10,
    },
    metaDescription: {
        fontSize: 18,
        fontWeight: '600',
        color: '#333',
        marginBottom: 5,
    },
    metaDates: {
        fontSize: 14,
        color: '#777',
        marginBottom: 5,
    },
    metaStatus: {
        fontSize: 15,
        fontWeight: 'bold',
    },
    statusCompleted: {
        color: '#2ecc71',
    },
    statusPending: {
        color: '#e74c3c',
    },
    completeButton: {
        backgroundColor: '#3498db',
        padding: 10,
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    completeButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    noMetasText: {
        textAlign: 'center',
        fontSize: 16,
        color: '#777',
        marginTop: 50,
    },
    fab: {
        position: 'absolute',
        bottom: 20,
        right: 20, // Changed to right for consistency with other add buttons
        backgroundColor: '#007AFF',
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 8,
    },
    fabText: {
        color: '#fff',
        fontSize: 30,
        lineHeight: 32,
    },
    modalOverlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 25,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        maxWidth: 400,
    },
    modalHeader: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
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
    datePickerButton: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginBottom: 15,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'flex-start',
    },
    datePickerButtonText: {
        fontSize: 16,
        color: '#333',
    },
    modalAddButton: {
        backgroundColor: '#2ecc71',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
        marginBottom: 10,
    },
    modalAddButtonDisabled: {
        backgroundColor: '#a9dfbf',
    },
    modalButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: '600',
    },
    modalCancelButton: {
        backgroundColor: '#95a5a6',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        width: '100%',
        alignItems: 'center',
    },
});

export default MetasScreen;