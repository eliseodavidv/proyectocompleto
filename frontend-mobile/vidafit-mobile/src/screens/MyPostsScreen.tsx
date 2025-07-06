// src/screens/MyPostsScreen.tsx

import React, { useEffect, useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  findNodeHandle,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { PublicacionPlanAlimentacionDTO } from '../types/planAlimentacionTypes';
import { PublicacionProgresoDTO } from '../types/progresoTypes';
import { PublicacionRutinaDTO, EjercicioDTO } from '../types/rutinaTypes';
import { planAlimentacionService } from '../api/planAlimentacionService';
import { progresoService } from '../api/progresoService';
import { rutinaService } from '../api/rutinaService';
import { RootStackParamList } from '../navigation/AppNavigator';

// Define un tipo para las opciones de filtro
type PostFilterType = 'All' | 'FoodPlan' | 'ProgressPost' | 'RoutinePost';

/**
 * @interface MyPostsScreenProps
 * @description Propiedades para el componente MyPostsScreen.
 * Actualmente, no se requieren propiedades específicas, pero es una buena práctica
 * definirlas para futuras extensiones.
 */
interface MyPostsScreenProps { }

/**
 * @function MyPostsScreen
 * @description Un componente funcional de React Native que muestra un feed de publicaciones del usuario.
 * Ahora maneja "PublicacionPlanAlimentacion" (Planes de Alimentación),
 * "PublicacionProgreso" (Publicaciones de Progreso) y "PublicacionRutina" (Publicaciones de Rutina).
 * Incluye capacidades de filtrado y funcionalidades básicas para añadir/eliminar.
 * Un botón de acción flotante permite al usuario seleccionar qué tipo de publicación añadir.
 * @param {MyPostsScreenProps} props - Las propiedades del componente.
 * @returns {JSX.Element} La pantalla renderizada del Feed de Mis Publicaciones.
 */
const MyPostsScreen: React.FC<MyPostsScreenProps> = (): React.JSX.Element => {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();

  const [foodPlanPosts, setFoodPlanPosts] = useState<PublicacionPlanAlimentacionDTO[]>([]);
  const [progressPosts, setProgressPosts] = useState<PublicacionProgresoDTO[]>([]);
  const [routinePosts, setRoutinePosts] = useState<PublicacionRutinaDTO[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filterType, setFilterType] = useState<PostFilterType>('All');

  // Estado para controlar el modal de selección de tipo de publicación
  const [isPostTypeSelectionVisible, setIsPostTypeSelectionVisible] = useState(false);

  // Simular un ID de usuario logueado.
  const mockLoggedInUserId = 'user-123';

  /**
   * @function fetchPosts
   * @description Obtiene publicaciones basadas en el tipo de filtro actual y el usuario logueado.
   * Maneja el estado de carga y el reporte de errores para todos los tipos de publicación.
   */
  const fetchPosts = useCallback(async () => {
    setLoading(true);
    setError(null);
    console.log('MyPostsScreen: Iniciando fetchPosts con filterType:', filterType);
    try {
      if (filterType === 'All' || filterType === 'FoodPlan') {
        console.log('MyPostsScreen: Llamando a planAlimentacionService.getOwnPosts...');
        const fetchedFoodPlans = await planAlimentacionService.getOwnPosts(mockLoggedInUserId);
        setFoodPlanPosts(fetchedFoodPlans);
      } else {
        setFoodPlanPosts([]);
      }

      if (filterType === 'All' || filterType === 'ProgressPost') {
        console.log('MyPostsScreen: Llamando a progresoService.getOwnPosts...');
        const fetchedProgressPosts = await progresoService.getOwnPosts(mockLoggedInUserId);
        setProgressPosts(fetchedProgressPosts);
      } else {
        setProgressPosts([]);
      }

      if (filterType === 'All' || filterType === 'RoutinePost') {
        console.log('MyPostsScreen: Llamando a rutinaService.getOwnRoutines...');
        const fetchedRoutinePosts = await rutinaService.getOwnRoutines(mockLoggedInUserId);
        setRoutinePosts(fetchedRoutinePosts);
      } else {
        setRoutinePosts([]);
      }
    } catch (err) {
      console.error('MyPostsScreen: Error al obtener publicaciones:', err);
      setError('No se pudieron cargar las publicaciones. Por favor, inténtalo de nuevo más tarde.');
    } finally {
      setLoading(false);
      console.log('MyPostsScreen: fetchPosts finalizado.');
    }
  }, [filterType]);

  /**
   * @function handleDeleteFoodPlanPost
   * @description Maneja la eliminación de una publicación de plan de alimentación.
   * @param {number} id - El ID de la publicación a eliminar.
   * @param {string} title - El título de la publicación (para el mensaje de confirmación).
   */
  const handleDeleteFoodPlanPost = async (id: number, title: string) => {
    Alert.alert(
      'Confirmar Eliminación',
      `¿Estás seguro de que quieres eliminar el plan de alimentación "${title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              const success = await planAlimentacionService.eliminar(id);
              if (success) {
                setFoodPlanPosts(prevPosts => prevPosts.filter(p => p.id !== id));
                Alert.alert('Éxito', `Plan de alimentación "${title}" eliminado.`);
              } else {
                Alert.alert('Error', `No se pudo eliminar el plan de alimentación "${title}".`);
              }
            } catch (err) {
              console.error('Error al eliminar publicación de plan de alimentación:', err);
              Alert.alert('Error', 'Ocurrió un error durante la eliminación.');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  /**
   * @function handleDeleteProgressPost
   * @description Maneja la eliminación de una publicación de progreso.
   * @param {number} id - El ID de la publicación a eliminar.
   */
  const handleDeleteProgressPost = async (id: number) => {
    Alert.alert(
      'Confirmar Eliminación',
      `¿Estás seguro de que quieres eliminar esta publicación de progreso?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              const success = await progresoService.eliminar(id);
              if (success) {
                setProgressPosts(prevPosts => prevPosts.filter(p => p.id !== id));
                Alert.alert('Éxito', `Publicación de progreso eliminada.`);
              } else {
                Alert.alert('Error', `No se pudo eliminar la publicación de progreso.`);
              }
            } catch (err) {
              console.error('Error al eliminar publicación de progreso:', err);
              Alert.alert('Error', 'Ocurrió un error durante la eliminación.');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  /**
   * @function handleDeleteRoutinePost
   * @description Maneja la eliminación de una publicación de rutina.
   * @param {number} id - El ID de la publicación a eliminar.
   * @param {string} title - El título de la publicación (para el mensaje de confirmación).
   */
  const handleDeleteRoutinePost = async (id: number, title: string) => {
    Alert.alert(
      'Confirmar Eliminación',
      `¿Estás seguro de que quieres eliminar la rutina "${title}"?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          onPress: async () => {
            try {
              const success = await rutinaService.eliminar(id);
              if (success) {
                setRoutinePosts(prevPosts => prevPosts.filter(p => p.id !== id));
                Alert.alert('Éxito', `Rutina "${title}" eliminada.`);
              } else {
                Alert.alert('Error', `No se pudo eliminar la rutina "${title}".`);
              }
            } catch (err) {
              console.error('Error al eliminar publicación de rutina:', err);
              Alert.alert('Error', 'Ocurrió un error durante la eliminación.');
            }
          },
          style: 'destructive',
        },
      ],
      { cancelable: true }
    );
  };

  // Usar useFocusEffect para volver a obtener datos cuando la pantalla entra en foco
  useFocusEffect(
    useCallback(() => {
      fetchPosts();
    }, [fetchPosts])
  );

  /**
   * @function renderFoodPlanItem
   * @description Renderiza un elemento de publicación de plan de alimentación en la FlatList.
   * @param {Object} item - El elemento de publicación de plan de alimentación a renderizar.
   * @returns {JSX.Element} El componente del elemento de publicación de plan de alimentación renderizado.
   */
  const renderFoodPlanItem = ({ item }: { item: PublicacionPlanAlimentacionDTO }) => (
    <TouchableOpacity
      style={styles.postCard}
      onPress={() => navigation.navigate('PostDetails', { postId: item.id, postType: 'FoodPlan' })}
    >
      <Text style={styles.postTypeLabel}>Plan de Alimentación</Text>
      <Text style={styles.postTitle}>{item.titulo}</Text>
      <Text style={styles.postContent}>{item.contenido}</Text>
      <View style={styles.postDetails}>
        <Text style={styles.detailText}>Dieta: {item.tipoDieta}</Text>
        <Text style={styles.detailText}>Calorías: {item.calorias}</Text>
        <Text style={styles.detailText}>Objetivos: {item.objetivos}</Text>
        <Text style={styles.detailText}>Restricciones: {item.restricciones}</Text>
        {/* Removed Autor, Creado, Verificado */}
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteFoodPlanPost(item.id, item.titulo)}
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  /**
   * @function renderProgressPostItem
   * @description Renderiza un elemento de publicación de progreso en la FlatList.
   * @param {Object} item - El elemento de publicación de progreso a renderizar.
   * @returns {JSX.Element} El componente del elemento de publicación de progreso renderizado.
   */
  const renderProgressPostItem = ({ item }: { item: PublicacionProgresoDTO }) => (
    <TouchableOpacity
      style={styles.postCard}
      onPress={() => navigation.navigate('PostDetails', { postId: item.id, postType: 'ProgressPost' })}
    >
      <Text style={styles.postTypeLabel}>Publicación de Progreso</Text>
      <Text style={styles.postTitle}>Progreso de Peso</Text>
      <Text style={styles.postContent}>Del {item.fechaInicio} al {item.fechaFin}</Text>
      <View style={styles.postDetails}>
        <Text style={styles.detailText}>Peso Inicial: {item.pesoInicio} kg</Text>
        <Text style={styles.detailText}>Peso Final: {item.pesoFin} kg</Text>
        <Text style={styles.detailText}>Peso Promedio: {item.promedioPeso} kg</Text>
        <Text style={[styles.detailText, item.cambioPeso > 0 ? styles.weightGain : styles.weightLoss]}>
          Cambio: {item.cambioPeso > 0 ? '+' : ''}{item.cambioPeso} kg
        </Text>
        {/* Removed Autor, Creado, Verificado */}
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteProgressPost(item.id)}
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  /**
   * @function renderRoutinePostItem
   * @description Renderiza un elemento de publicación de rutina en la FlatList.
   * @param {Object} item - El elemento de publicación de rutina a renderizar.
   * @returns {JSX.Element} El componente del elemento de publicación de rutina renderizado.
   */
  const renderRoutinePostItem = ({ item }: { item: PublicacionRutinaDTO }) => (
    <TouchableOpacity
      style={styles.postCard}
      onPress={() => navigation.navigate('PostDetails', { postId: item.id, postType: 'RoutinePost' })}
    >
      <Text style={styles.postTypeLabel}>Rutina de Ejercicio</Text>
      <Text style={styles.postTitle}>{item.titulo}</Text>
      <Text style={styles.postContent}>{item.contenido}</Text>
      <View style={styles.postDetails}>
        <Text style={styles.detailText}>Nombre: {item.nombreRutina}</Text>
        <Text style={styles.detailText}>Duración: {item.duracion} minutos</Text>
        <Text style={styles.detailText}>Frecuencia: {item.frecuencia}</Text>
        <Text style={styles.detailText}>Nivel: {item.nivel}</Text>
        {/* Removed Autor, Creado, Verificado */}
        <Text style={styles.detailText}>Ejercicios:</Text>
        {item.ejercicios && item.ejercicios.length > 0 ? (
          <View style={styles.exercisesList}>
            {item.ejercicios.map(ej => (
              <Text key={ej.id} style={styles.exerciseItem}>
                • {ej.nombre} ({ej.grupoMuscular}) - {ej.series} series, {ej.repeticiones} reps, {ej.descansoSegundos}s descanso, {ej.pesoKg}kg
              </Text>
            ))}
          </View>
        ) : (
          <Text style={styles.exerciseItem}>No hay ejercicios asignados.</Text>
        )}
      </View>
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => handleDeleteRoutinePost(item.id, item.titulo)}
      >
        <Text style={styles.deleteButtonText}>X</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  // Determinar qué publicaciones mostrar según el filterType
  const displayedPosts = React.useMemo(() => {
    let all: any[] = [];
    if (filterType === 'FoodPlan' || filterType === 'All') {
      all = [...all, ...foodPlanPosts.map(post => ({ ...post, type: 'FoodPlan', key: `food-${post.id}` }))];
    }
    if (filterType === 'ProgressPost' || filterType === 'All') {
      all = [...all, ...progressPosts.map(post => ({ ...post, type: 'ProgressPost', key: `progress-${post.id}` }))];
    }
    if (filterType === 'RoutinePost' || filterType === 'All') {
      all = [...all, ...routinePosts.map(post => ({ ...post, type: 'RoutinePost', key: `routine-${post.id}` }))];
    }

    // Ordenar por un criterio común, ej., fecha de creación (simulado por ID)
    return all.sort((a, b) => {
      const idA = a.id;
      const idB = b.id;
      return idB - idA; // Ordenar descendente por ID (más reciente primero)
    });
  }, [filterType, foodPlanPosts, progressPosts, routinePosts]);

  /**
   * @function navigateToCreatePost
   * @description Navega a la pantalla de creación de publicación especificada.
   * @param {'CreateFoodPlanPost' | 'CreateProgressPost' | 'CreateRoutinePost'} screenName - El nombre de la pantalla a la que navegar.
   */
  const navigateToCreatePost = (screenName: 'CreateFoodPlanPost' | 'CreateProgressPost' | 'CreateRoutinePost') => {
    setIsPostTypeSelectionVisible(false); // Cerrar el modal
    navigation.navigate(screenName);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Cargando tus publicaciones...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.retryButton} onPress={fetchPosts}>
          <Text style={styles.retryButtonText}>Reintentar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Mi Feed</Text>

      {/* Botones de Filtro */}
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'All' && styles.filterButtonActive]}
          onPress={() => setFilterType('All')}
        >
          <Text style={styles.filterButtonText}>Todas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'FoodPlan' && styles.filterButtonActive]}
          onPress={() => setFilterType('FoodPlan')}
        >
          <Text style={styles.filterButtonText}>Planes Alimenticios</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'ProgressPost' && styles.filterButtonActive]}
          onPress={() => setFilterType('ProgressPost')}
        >
          <Text style={styles.filterButtonText}>Progreso</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.filterButton, filterType === 'RoutinePost' && styles.filterButtonActive]}
          onPress={() => setFilterType('RoutinePost')}
        >
          <Text style={styles.filterButtonText}>Rutinas</Text>
        </TouchableOpacity>
      </View>

      {/* Posts List */}
      {displayedPosts.length === 0 ? (
        <Text style={styles.noPostsText}>Aún no hay publicaciones de este tipo. ¡Agrega una usando el botón '+'!</Text>
      ) : (
        <FlatList
          data={displayedPosts}
          renderItem={({ item }) => {
            if (item.type === 'FoodPlan') {
              return renderFoodPlanItem({ item: item as PublicacionPlanAlimentacionDTO });
            } else if (item.type === 'ProgressPost') {
              return renderProgressPostItem({ item: item as PublicacionProgresoDTO });
            } else if (item.type === 'RoutinePost') {
              return renderRoutinePostItem({ item: item as PublicacionRutinaDTO });
            }
            return null;
          }}
          keyExtractor={item => item.key}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Botón de Acción Flotante */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => setIsPostTypeSelectionVisible(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </TouchableOpacity>

      {/* Modal de Selección de Tipo de Publicación */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isPostTypeSelectionVisible}
        onRequestClose={() => setIsPostTypeSelectionVisible(false)}
      >
        <TouchableOpacity
          style={styles.modalOverlay}
          activeOpacity={1}
          onPressOut={() => setIsPostTypeSelectionVisible(false)}
        >
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Elegir Tipo de Publicación</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => navigateToCreatePost('CreateFoodPlanPost')}
            >
              <Text style={styles.modalButtonText}>Publicación de Plan de Alimentación</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => navigateToCreatePost('CreateProgressPost')}
            >
              <Text style={styles.modalButtonText}>Publicación de Progreso</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => navigateToCreatePost('CreateRoutinePost')}
            >
              <Text style={styles.modalButtonText}>Publicación de Rutina</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.modalButton, styles.modalCancelButton]}
              onPress={() => setIsPostTypeSelectionVisible(false)}
            >
              <Text style={styles.modalButtonText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
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
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    flexWrap: 'wrap',
  },
  filterButton: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    backgroundColor: '#e0e7eb',
    margin: 4,
  },
  filterButtonActive: {
    backgroundColor: '#3498db',
  },
  filterButtonText: {
    color: '#2c3e50',
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 20,
  },
  postCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
  },
  postTypeLabel: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: '#007AFF',
    color: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    fontSize: 12,
    fontWeight: 'bold',
    zIndex: 1,
  },
  postTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#34495e',
    marginBottom: 8,
    marginTop: 25,
  },
  postContent: {
    fontSize: 15,
    color: '#555',
    marginBottom: 10,
  },
  postDetails: {
    marginTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 10,
  },
  detailText: {
    fontSize: 14,
    color: '#777',
    marginBottom: 3,
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
    marginTop: 5,
    marginLeft: 10,
  },
  exerciseItem: {
    fontSize: 13,
    color: '#666',
    marginBottom: 2,
  },
  deleteButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#e74c3c',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
  },
  deleteButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  noPostsText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#777',
    marginTop: 50,
  },
  fab: {
    position: 'absolute',
    bottom: 20,
    left: 20,
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
    width: '80%',
    maxWidth: 300,
  },
  modalHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  modalButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  modalCancelButton: {
    backgroundColor: '#95a5a6',
    marginTop: 10,
  },
});

export default MyPostsScreen;
