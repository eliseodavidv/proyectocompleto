// src/navigation/AppNavigator.ts

/**
 * @interface RootStackParamList
 * @description Define el tipo para las rutas del navegador de pila raíz y sus parámetros.
 * Esto ayuda con la verificación de tipos de las propiedades de navegación en toda la aplicación.
 * Cada propiedad representa una pantalla en la pila, y su valor es el tipo
 * de parámetros que espera (undefined si no hay parámetros).
 */
export type RootStackParamList = {
    Login: undefined;
    Register: undefined;
    MyPosts: undefined;
    CreateFoodPlanPost: undefined;
    CreateProgressPost: undefined;
    CreateRoutinePost: undefined;
    CreateExercise: undefined;
    PostDetails: { postId: number; postType: 'FoodPlan' | 'ProgressPost' | 'RoutinePost' };
    Metas: undefined;
    // Updated MainTabs to accept a 'screen' parameter for nested navigation
    MainTabs: { screen?: 'MyPosts' | 'Metas' | 'Profile' }; // <-- ¡ACTUALIZADO!
    Profile: undefined;
};
