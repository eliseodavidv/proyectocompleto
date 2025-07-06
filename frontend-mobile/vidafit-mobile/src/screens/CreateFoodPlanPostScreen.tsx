// src/screens/CreateFoodPlanPostScreen.tsx

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
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { CreatePlanAlimentacion } from '../types/planAlimentacionTypes';
import { planAlimentacionService } from '../api/planAlimentacionService';
import { RootStackParamList } from '../navigation/AppNavigator';

/**
 * @interface CreateFoodPlanPostScreenProps
 * @description Define las propiedades para el componente CreateFoodPlanPostScreen.
 * @property {StackNavigationProp<RootStackParamList, 'CreateFoodPlanPost'>} navigation - Propiedad de navegación de React Navigation.
 * @property {RouteProp<RootStackParamList, 'CreateFoodPlanPost'>} route - Propiedad de ruta de React Navigation (no utilizada aquí, pero buena práctica).
 */
interface CreateFoodPlanPostScreenProps {
    navigation: StackNavigationProp<RootStackParamList, 'CreateFoodPlanPost'>;
    route: RouteProp<RootStackParamList, 'CreateFoodPlanPost'>;
}

/**
 * @function CreateFoodPlanPostScreen
 * @description Un componente funcional de React Native para crear una nueva publicación de plan de alimentación.
 * Proporciona un formulario para la entrada del usuario y llama al servicio simulado `planAlimentacionService`
 * para crear la publicación. En caso de éxito, navega hacia atrás.
 * @param {CreateFoodPlanPostScreenProps} props - Las propiedades del componente.
 * @returns {JSX.Element} La pantalla renderizada de Crear Publicación de Plan de Alimentación.
 */
const CreateFoodPlanPostScreen: React.FC<CreateFoodPlanPostScreenProps> = ({ navigation }): React.JSX.Element => {
    const [titulo, setTitulo] = useState('');
    const [contenido, setContenido] = useState('');
    const [tipoDieta, setTipoDieta] = useState('');
    const [calorias, setCalorias] = useState(''); // Convert to number before sending
    const [objetivos, setObjetivos] = useState('');
    const [restricciones, setRestricciones] = useState('');
    const [isAddingFoodPlanPost, setIsAddingFoodPlanPost] = useState(false);

    // Simular un ID de usuario logueado.
    const mockLoggedInUserId = 'user-123';

    /**
     * @function handleAddFoodPlanPost
     * @description Maneja el envío del formulario para agregar una nueva publicación de plan de alimentación.
     * Valida los datos y llama al servicio simulado.
     * Navega hacia atrás en caso de éxito.
     */
    const handleAddFoodPlanPost = async () => {
        if (!titulo || !contenido || !tipoDieta || !calorias || !objetivos || !restricciones) {
            Alert.alert('Error de Entrada', 'Por favor, completa todos los campos.');
            return;
        }

        const caloriasNum = parseInt(calorias, 10);
        if (isNaN(caloriasNum) || caloriasNum <= 0) {
            Alert.alert('Error de Entrada', 'Las calorías deben ser un número positivo.');
            return;
        }

        const newPostData: CreatePlanAlimentacion = {
            titulo,
            contenido,
            tipoDieta,
            calorias: caloriasNum,
            objetivos,
            restricciones,
        };

        setIsAddingFoodPlanPost(true);
        try {
            const addedPost = await planAlimentacionService.create(newPostData, mockLoggedInUserId);
            Alert.alert('Éxito', `¡Plan de alimentación "${addedPost.titulo}" agregado!`);
            navigation.goBack();
        } catch (err) {
            console.error('Error al agregar publicación de plan de alimentación:', err);
            Alert.alert('Error', 'No se pudo agregar la publicación de plan de alimentación.');
        } finally {
            setIsAddingFoodPlanPost(false);
        }
    };

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.header}>Crear Publicación de Plan de Alimentación</Text>

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
            <TextInput
                style={styles.input}
                placeholder="Tipo de Dieta (ej. Mediterránea, Keto)"
                placeholderTextColor="#999"
                value={tipoDieta}
                onChangeText={setTipoDieta}
            />
            <TextInput
                style={styles.input}
                placeholder="Calorías (ej. 2000)"
                placeholderTextColor="#999"
                value={calorias}
                onChangeText={setCalorias}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Objetivos (ej. Pérdida de peso, Ganancia muscular)"
                placeholderTextColor="#999"
                value={objetivos}
                onChangeText={setObjetivos}
            />
            <TextInput
                style={styles.input}
                placeholder="Restricciones (ej. Sin gluten, Vegetariano)"
                placeholderTextColor="#999"
                value={restricciones}
                onChangeText={setRestricciones}
            />

            <TouchableOpacity
                style={[styles.addButton, isAddingFoodPlanPost && styles.addButtonDisabled]}
                onPress={handleAddFoodPlanPost}
                disabled={isAddingFoodPlanPost}
            >
                {isAddingFoodPlanPost ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.addButtonText}>Crear Publicación de Plan de Alimentación</Text>
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

export default CreateFoodPlanPostScreen;
