// src/screens/CreateExerciseScreen.tsx

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
    Image, // Import Image for displaying selected image
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { CrearEjercicioDTO } from '../types/rutinaTypes';
import { rutinaService } from '../api/rutinaService';
import { RootStackParamList } from '../navigation/AppNavigator';
import * as ImagePicker from 'expo-image-picker'; // Import ImagePicker

/**
 * @interface CreateExerciseScreenProps
 * @description Define las propiedades para el componente CreateExerciseScreen.
 * @property {StackNavigationProp<RootStackParamList, 'CreateExercise'>} navigation - Propiedad de navegación de React Navigation.
 * @property {RouteProp<RootStackParamList, 'CreateExercise'>} route - Propiedad de ruta de React Navigation (no utilizada aquí).
 */
interface CreateExerciseScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'CreateExercise'>;
    route: RouteProp<RootStackParamList, 'CreateExercise'>;
}

/**
 * @function CreateExerciseScreen
 * @description Un componente funcional de React Native para crear un nuevo ejercicio.
 * Proporciona un formulario para la entrada del usuario, permite la selección de una imagen,
 * y llama al servicio simulado `rutinaService` para crear el ejercicio.
 * En caso de éxito, navega hacia atrás.
 * @param {CreateExerciseScreenProps} props - Las propiedades del componente.
 * @returns {JSX.Element} La pantalla renderizada de Crear Ejercicio.
 */
const CreateExerciseScreen: React.FC<CreateExerciseScreenProps> = ({ navigation }): React.JSX.Element => {
    const [nombre, setNombre] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [series, setSeries] = useState('');
    const [repeticiones, setRepeticiones] = useState('');
    const [descansoSegundos, setDescansoSegundos] = useState('');
    const [pesoKg, setPesoKg] = useState('');
    const [imageUri, setImageUri] = useState<string | null>(null); // State to hold the URI of the selected image
    const [imageFile, setImageFile] = useState<any>(null); // State to hold the image file data for upload
    const [isCreatingExercise, setIsCreatingExercise] = useState(false);

    /**
     * @function pickImage
     * @description Abre la galería de imágenes del dispositivo para que el usuario seleccione una imagen.
     * Almacena la URI de la imagen seleccionada y los datos del archivo.
     */
    const pickImage = async () => {
        // Request media library permissions
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permiso Requerido', 'Necesitamos permiso para acceder a tu galería de fotos para seleccionar una imagen.');
            return;
        }

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) {
            const selectedAsset = result.assets[0];
            setImageUri(selectedAsset.uri);
            // For mock service, we can just pass the URI or a simple object.
            // In a real app, you'd prepare a FormData object with the actual file.
            setImageFile(selectedAsset); // Store the asset object for potential upload
        }
    };

    /**
     * @function handleCreateExercise
     * @description Maneja el envío del formulario para crear un nuevo ejercicio.
     * Valida los datos y llama al servicio simulado.
     * Navega hacia atrás en caso de éxito.
     */
    const handleCreateExercise = async () => {
        if (!nombre || !descripcion || !series || !repeticiones || !descansoSegundos || !pesoKg) {
            Alert.alert('Error de Entrada', 'Por favor, completa todos los campos.');
            return;
        }

        const seriesNum = parseInt(series, 10);
        const repeticionesNum = parseInt(repeticiones, 10);
        const descansoSegundosNum = parseInt(descansoSegundos, 10);
        const pesoKgNum = parseFloat(pesoKg);

        if (isNaN(seriesNum) || isNaN(repeticionesNum) || isNaN(descansoSegundosNum) || isNaN(pesoKgNum) ||
            seriesNum < 0 || repeticionesNum < 0 || descansoSegundosNum < 0 || pesoKgNum < 0) {
            Alert.alert('Error de Entrada', 'Por favor, ingresa valores numéricos válidos y no negativos para series, repeticiones, descanso y peso.');
            return;
        }

        const newExerciseData: CrearEjercicioDTO = {
            nombre,
            descripcion,
            series: seriesNum,
            repeticiones: repeticionesNum,
            descansoSegundos: descansoSegundosNum,
            pesoKg: pesoKgNum,
            // imagenUrl will be set by the service if imageFile is provided
        };

        setIsCreatingExercise(true);
        try {
            // Pass the imageFile to the service. The mock service will simulate upload.
            const createdExercise = await rutinaService.createEjercicio(newExerciseData, imageFile);
            Alert.alert('Éxito', `¡Ejercicio "${createdExercise.nombre}" creado!`);
            navigation.goBack(); // Volver a la pantalla anterior (CreateRoutinePostScreen)
        } catch (err) {
            console.error('Error al crear ejercicio:', err);
            Alert.alert('Error', 'No se pudo crear el ejercicio.');
        } finally {
            setIsCreatingExercise(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Crear Nuevo Ejercicio</Text>

            <TextInput
                style={styles.input}
                placeholder="Nombre del Ejercicio"
                placeholderTextColor="#999"
                value={nombre}
                onChangeText={setNombre}
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
                placeholder="Series (ej. 3)"
                placeholderTextColor="#999"
                value={series}
                onChangeText={setSeries}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Repeticiones (ej. 10)"
                placeholderTextColor="#999"
                value={repeticiones}
                onChangeText={setRepeticiones}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Descanso (segundos, ej. 60)"
                placeholderTextColor="#999"
                value={descansoSegundos}
                onChangeText={setDescansoSegundos}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Peso (kg, ej. 20.5)"
                placeholderTextColor="#999"
                value={pesoKg}
                onChangeText={setPesoKg}
                keyboardType="numeric"
            />

            {/* Image Picker Section */}
            <TouchableOpacity style={styles.imagePickerButton} onPress={pickImage}>
                <Text style={styles.imagePickerButtonText}>Seleccionar Imagen</Text>
            </TouchableOpacity>
            {imageUri && (
                <Image source={{ uri: imageUri }} style={styles.selectedImage} />
            )}

            <TouchableOpacity
                style={[styles.addButton, isCreatingExercise && styles.addButtonDisabled]}
                onPress={handleCreateExercise}
                disabled={isCreatingExercise}
            >
                {isCreatingExercise ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.addButtonText}>Crear Ejercicio</Text>
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
    imagePickerButton: {
        backgroundColor: '#3498db',
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        alignItems: 'center',
        marginBottom: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
        elevation: 5,
    },
    imagePickerButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    selectedImage: {
        width: '100%',
        height: 200,
        borderRadius: 10,
        marginBottom: 15,
        resizeMode: 'cover', // Ensure the image covers the area
        borderColor: '#ccc',
        borderWidth: 1,
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

export default CreateExerciseScreen;
