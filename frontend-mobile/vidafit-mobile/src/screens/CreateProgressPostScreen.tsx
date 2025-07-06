// src/screens/CreateProgressPostScreen.tsx

import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    ActivityIndicator,
    Alert,
    ScrollView,
    Platform, // Import Platform to check OS for date picker
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { CreatePublicacionProgreso } from '../types/progresoTypes';
import { progresoService } from '../api/progresoService';
import { RootStackParamList } from '../navigation/AppNavigator';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import DateTimePicker

/**
 * @interface CreateProgressPostScreenProps
 * @description Define las propiedades para el componente CreateProgressPostScreen.
 * @property {StackNavigationProp<RootStackParamList, 'CreateProgressPost'>} navigation - Propiedad de navegación de React Navigation.
 * @property {RouteProp<RootStackParamList, 'CreateProgressPost'>} route - Propiedad de ruta de React Navigation (no utilizada aquí, pero buena práctica).
 */
interface CreateProgressPostScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'CreateProgressPost'>;
    route: RouteProp<RootStackParamList, 'CreateProgressPost'>;
}

/**
 * @function CreateProgressPostScreen
 * @description Un componente funcional de React Native para crear una nueva publicación de progreso.
 * Proporciona un formulario para la entrada del usuario y llama al servicio simulado `progresoService`
 * para crear la publicación. En caso de éxito, navega hacia atrás.
 * @param {CreateProgressPostScreenProps} props - Las propiedades del componente.
 * @returns {JSX.Element} La pantalla renderizada de Crear Publicación de Progreso.
 */
const CreateProgressPostScreen: React.FC<CreateProgressPostScreenProps> = ({ navigation }): React.JSX.Element => {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [fechaInicio, setFechaInicio] = useState(''); // Stores date as YYYY-MM-DD string
    const [fechaFin, setFechaFin] = useState(''); // Stores date as YYYY-MM-DD string
    const [pesoInicio, setPesoInicio] = useState('');
    const [pesoFin, setPesoFin] = useState('');
    const [isAddingProgressPost, setIsAddingProgressPost] = useState(false);

    // State for DatePickers
    const [showStartDatePicker, setShowStartDatePicker] = useState(false);
    const [selectedStartDate, setSelectedStartDate] = useState(new Date());

    const [showEndDatePicker, setShowEndDatePicker] = useState(false);
    const [selectedEndDate, setSelectedEndDate] = useState(new Date());

    // Simular un ID de usuario logueado.
    const mockLoggedInUserId = 'user-123';

    /**
     * @function onStartDateChange
     * @description Handles the change of start date in the DatePicker.
     * Updates the selected date and the formatted string for the input.
     * @param {Event} event - The date change event.
     * @param {Date | undefined} date - The selected date.
     */
    const onStartDateChange = (event: any, date?: Date) => {
        setShowStartDatePicker(Platform.OS === 'ios'); // Keep picker open on iOS until confirmed
        if (date) {
            setSelectedStartDate(date);
            setFechaInicio(date.toISOString().split('T')[0]); // Format to YYYY-MM-DD
        }
    };

    /**
     * @function onEndDateChange
     * @description Handles the change of end date in the DatePicker.
     * Updates the selected date and the formatted string for the input.
     * @param {Event} event - The date change event.
     * @param {Date | undefined} date - The selected date.
     */
    const onEndDateChange = (event: any, date?: Date) => {
        setShowEndDatePicker(Platform.OS === 'ios'); // Keep picker open on iOS until confirmed
        if (date) {
            setSelectedEndDate(date);
            setFechaFin(date.toISOString().split('T')[0]); // Format to YYYY-MM-DD
        }
    };

    /**
     * @function handleAddProgressPost
     * @description Maneja el envío del formulario para agregar una nueva publicación de progreso.
     * Valida los datos y llama al servicio simulado.
     * Navega hacia atrás en caso de éxito.
     */
    const handleAddProgressPost = async () => {
        if (!titulo || !contenido || !fechaInicio || !fechaFin || !pesoInicio || !pesoFin) {
            Alert.alert('Error de Entrada', 'Por favor, completa todos los campos.');
            return;
        }

        const pesoInicioNum = parseFloat(pesoInicio);
        const pesoFinNum = parseFloat(pesoFin);

        if (isNaN(pesoInicioNum) || isNaN(pesoFinNum) || pesoInicioNum <= 0 || pesoFinNum <= 0) {
            Alert.alert('Error de Entrada', 'El peso inicial y final deben ser números positivos.');
            return;
        }

        // Basic date format validation (YYYY-MM-DD)
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(fechaInicio) || !dateRegex.test(fechaFin)) {
            Alert.alert('Formato de Fecha Inválido', 'Las fechas deben estar en formato YYYY-MM-DD.');
            return;
        }

        const newPostData: CreatePublicacionProgreso = {
            titulo,
            contenido,
            fechaInicio,
            fechaFin,
            pesoInicio: pesoInicioNum,
            pesoFin: pesoFinNum,
        };

        setIsAddingProgressPost(true);
        try {
            const addedPost = await progresoService.create(newPostData, mockLoggedInUserId);
            Alert.alert('Éxito', `¡Publicación de progreso agregada!`);
            navigation.goBack();
        } catch (err) {
            console.error('Error al agregar publicación de progreso:', err);
            Alert.alert('Error', 'No se pudo agregar la publicación de progreso.');
        } finally {
            setIsAddingProgressPost(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Crear Publicación de Progreso</Text>

            <TextInput
                style={styles.input}
                placeholder="Título"
                placeholderTextColor="#999"
                value={titulo}
                onChangeText={setTitulo}
            />
            <TextInput
                style={styles.input}
                placeholder="Contenido"
                placeholderTextColor="#999"
                value={contenido}
                onChangeText={setContenido}
                multiline
            />

            {/* Start Date Picker */}
            <TouchableOpacity onPress={() => setShowStartDatePicker(true)} style={styles.datePickerButton}>
                <Text style={styles.datePickerButtonText}>
                    Fecha de Inicio: {fechaInicio || 'Seleccionar fecha'}
                </Text>
            </TouchableOpacity>
            {showStartDatePicker && (
                <DateTimePicker
                    testID="startDatePicker"
                    value={selectedStartDate}
                    mode="date"
                    display="default"
                    onChange={onStartDateChange}
                />
            )}

            {/* End Date Picker */}
            <TouchableOpacity onPress={() => setShowEndDatePicker(true)} style={styles.datePickerButton}>
                <Text style={styles.datePickerButtonText}>
                    Fecha de Fin: {fechaFin || 'Seleccionar fecha'}
                </Text>
            </TouchableOpacity>
            {showEndDatePicker && (
                <DateTimePicker
                    testID="endDatePicker"
                    value={selectedEndDate}
                    mode="date"
                    display="default"
                    onChange={onEndDateChange}
                />
            )}

            <TextInput
                style={styles.input}
                placeholder="Peso Inicial (kg)"
                placeholderTextColor="#999"
                value={pesoInicio}
                onChangeText={setPesoInicio}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Peso Final (kg)"
                placeholderTextColor="#999"
                value={pesoFin}
                onChangeText={setPesoFin}
                keyboardType="numeric"
            />

            <TouchableOpacity
                style={[styles.addButton, isAddingProgressPost && styles.addButtonDisabled]}
                onPress={handleAddProgressPost}
                disabled={isAddingProgressPost}
            >
                {isAddingProgressPost ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.addButtonText}>Crear Publicación de Progreso</Text>
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

export default CreateProgressPostScreen;
