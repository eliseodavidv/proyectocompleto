# 16
# Red Social para Compartir Hábitos Saludables: *Vida Fit Red*

---

## Curso  
*Desarrollo Basado en Plataforma*  

## Integrantes
- Efrén Paolo Centeno Rosas  
- Fabio Eduardo Dávila Venturo  
- Darlene Priyanka Escobar Hinojosa  
- Letizia Estefanía Torres Mariño  
- Eliseo David Velasquez Diaz  

## Profesor  
*Mateo Noel Rabines*  


---

## Índice

- [1. Introducción](#1-introducción)  
  - [1.1. Contexto](#11-contexto)  
  - [1.2. Objetivos del Proyecto](#12-objetivos-del-proyecto)  
- [2. Identificación del Problema o Necesidad](#2-identificación-del-problema-o-necesidad)  
  - [2.1. Descripción del Problema](#21-descripción-del-problema)  
  - [2.2. Justificación](#22-justificación)  
- [3. Descripción de la Solución](#3-descripción-de-la-solución)  
  - [3.1. Funcionalidades Implementadas](#31-funcionalidades-implementadas)  
  - [3.2. Tecnologías Utilizadas](#32-tecnologías-utilizadas)  
- [4. Modelo de Entidades](#4-modelo-de-entidades)  
  - [4.1. Diagrama Entidad-Relación (ER)](#41-diagrama-entidad-relación-er)  
  - [4.2. Descripción de Entidades y Relaciones](#42-descripción-de-entidades-y-relaciones)  
- [5. Testing y Manejo de Errores](#5-testing-y-manejo-de-errores)  
  - [5.1. Niveles de Testing Realizados](#51-niveles-de-testing-realizados)  
  - [5.2. Resultados Obtenidos](#52-resultados-obtenidos)  
  - [5.3. Manejo de Errores y Excepciones](#53-manejo-de-errores-y-excepciones)  
- [6. Medidas de Seguridad Implementadas](#6-medidas-de-seguridad-implementadas)  
  - [6.1. Seguridad de Datos](#61-seguridad-de-datos)  
  - [6.2. Prevención de Vulnerabilidades](#62-prevención-de-vulnerabilidades)  
- [7. Eventos y Asincronía](#7-eventos-y-asincronía)  
  - [7.1. Eventos Utilizados](#71-eventos-utilizados)  
  - [7.2. Importancia y Implementación Asíncrona](#72-importancia-y-implementación-asíncrona)  
- [8. Uso de GitHub](#8-uso-de-github)  
  - [8.1. GitHub Projects (Issues, Deadlines)](#81-github-projects-issues-deadlines)  
  - [8.2. Flujo de Trabajo con GitHub Actions](#82-flujo-de-trabajo-con-github-actions)  
- [9. Conclusión](#9-conclusión)  
  - [9.1. Logros del Proyecto](#91-logros-del-proyecto)  
  - [9.2. Aprendizajes Clave](#92-aprendizajes-clave)  
  - [9.3. Trabajo Futuro](#93-trabajo-futuro)  
- [10. Apéndices](#10-apéndices)  
  - [10.1. Licencia](#101-licencia)  
  - [10.2. Referencias](#102-referencias)  

  # 1. Introducción

## 1.1. Contexto
El bienestar físico y mental es una prioridad creciente, y las aplicaciones de salud han proliferado, pero muchas solo registran datos como calorías o pasos. Sin embargo, lo que realmente necesitan las personas es un acompañante digital que motive, inspire y conecte. VidaFit nace para llenar ese vacío, ofreciendo no solo una app, sino una comunidad digital que transforma hábitos de forma personalizada y sostenible.

## 1.2. Objetivos del Proyecto
- Fomentar hábitos saludables mediante un enfoque integral: seguimiento físico, motivación social y contenido personalizado.
- Brindar recomendaciones inteligentes alineadas con los objetivos y progreso del usuario.
- Gamificar el proceso con logros, desafíos y estadísticas visuales para mantener la constancia.
- Integrar tecnologías de seguimiento como APIs de salud y dispositivos wearables para mayor precisión.
- Crear una comunidad para que los usuarios se agrupen, compartan experiencias e inspiren mutuamente.

# 2. Identificación del Problema o Necesidad

## 2.1. Descripción del Problema
Muchos abandonan su intento de mejorar su salud por falta de motivación, recomendaciones personalizadas y plataformas sin una experiencia humana o colaborativa. Sin una guía adecuada, lo que comienza con entusiasmo termina en frustración.

## 2.2. Justificación
Este problema es urgente, ya que el sedentarismo y la mala alimentación causan enfermedades prevenibles. VidaFit ofrece una solución, combinando tecnología, contenido personalizado y motivación comunitaria, ayudando tanto a principiantes como a entusiastas del fitness a mantener la constancia y mejorar su calidad de vida.

# 3. Descripción de la Solución

## 3.1. Funcionalidades Implementadas
VidaFit ofrece una solución integral para el seguimiento de hábitos saludables, combinando funcionalidad social, personalización y tecnología. Las funcionalidades clave son:
- *Autenticación con JWT y Spring Security*: Implementación de roles (USER, ADMIN, ESPECIALISTA), validación de tokens y extracción de userId.
- *Publicaciones Especializadas con Herencia JOINED*: Tres tipos de publicaciones:
  - *PublicacionRutina*: Rutinas de ejercicio personalizadas.
  - *PublicacionPlanAlimentacion*: Planes nutricionales.
  - *PublicacionProgreso*: Registros de progreso corporal.
- *Gestión de Rutinas y Ejercicios (ManyToMany)*: Rutinas compartidas entre usuarios con ejercicios reutilizables (series, repeticiones, descanso y peso).
- *Sistema de Grupos Comunitarios*: Grupos públicos y privados, administración, validación de nombres y operaciones transaccionales.
- *Seguimiento de Progreso Personal*: Registro de peso y visualización de tendencias mediante publicaciones automáticas.
- *Sistema de Metas Personalizadas*: Metas con fechas, descripción y seguimiento del progreso.
- *Red de Especialistas Verificados*: Herencia SINGLE_TABLE para añadir campos como especialidad, URL de certificado y descripción profesional.
- *Notificaciones por Correo Electrónico*: Envío asincrónico de correos HTML con JavaMailSender, utilizando eventos y @Async.

## 3.2. Tecnologías Utilizadas
- *Lenguaje y Framework*: Java 17, Spring Boot 3.0
- *Seguridad*: Spring Security, JWT con extracción de userId, BCrypt para contraseñas
- *Base de Datos*: PostgreSQL (puerto 5433), H2 Console para entorno local
- *ORM y Arquitectura*: Spring Data JPA, Hibernate, herencia JOINED y SINGLE_TABLE, patrón Repository
- *Correo Electrónico*: JavaMailSender, MimeMessage con HTML, ApplicationEventPublisher
- *Otras herramientas*: Maven, Lombok, Jackson, configuración CORS habilitada, servidor en puerto 8090

# 4. Modelo de Entidades

## 4.1. Diagrama Entidad-Relación (ER)

## 4.2. Descripción de Entidades y Relaciones
- *Usuario*: Entidad base para autenticación y gestión de perfil, con roles (USER, ADMIN, ESPECIALISTA) implementados con Spring Security.  
  Atributos: id, nombre, email, password (encriptada), fechaNacimiento, altura, peso, rol.  
  Relaciones: One-to-many con Meta, Progreso, Logro, Recomendación, Publicación; Many-to-many con Grupo.

- *Especialista: Subtipo de Usuario con rol **ESPECIALISTA* (herencia SINGLE_TABLE).  
  Atributos adicionales: especialidad, certificadoUrl, descripción profesional.

- *Publicación (abstracta): Base con herencia **JOINED*, con tres subtipos:
  - *PublicacionRutina*: Atributos: frecuencia, duración, nivel. Relación: Many-to-many con Ejercicio.
  - *PublicacionPlanAlimentacion*: Atributos: calorías, tipoDieta, restricciones.
  - *PublicacionProgreso*: Atributos: promedioPeso, historial, fecha. Relación: Con múltiples registros de Progreso.

- *Ejercicio*: Atributos: nombre, series, repeticiones, descanso, peso. Relación: Many-to-many con PublicacionRutina.

- *Grupo*: Comunidades de usuarios con intereses comunes.  
  Atributos: nombre, descripción, tipo (Público/Privado), admin.  
  Relación: Many-to-many con Usuario.

- *Meta*: Objetivos del usuario.  
  Atributos: descripción, fechaInicio, fechaFin, cumplida.

- *Logro*: Premios desbloqueados según hitos.  
  Atributos: nombre, descripción, fecha.

- *Progreso*: Registros cronológicos de peso.  
  Atributos: peso, fecha. Relación: Con PublicacionProgreso para análisis de tendencias.

- *Recomendación*: Contenido personalizado basado en el perfil del usuario.  
  Atributos: tipo, contenido, fecha.

# 5. Testing y Manejo de Errores

## 5.1. Niveles de Testing Realizados
Se implementaron varios niveles de pruebas para garantizar la calidad del software:
- *Pruebas Unitarias*: Usando Mockito y JUnit en servicios clave (UsuarioService, GrupoService, PublicacionService) para validar la lógica de negocio.
- *Pruebas de Integración: Con **Testcontainers* para probar relaciones complejas (Grupo-Usuario, Rutina-Ejercicio) sobre una base de datos PostgreSQL embebida.
- *End-to-End Testing*: Simulación de flujos completos (registro, login, publicación de progreso) para verificar el comportamiento integral del sistema.
- *Cobertura de Testing*: Se cubrieron controladores clave y validación de roles, detectando errores antes del despliegue.

## 5.2. Resultados Obtenidos
- Se corrigieron errores de validación en formularios de publicación y metas.
- Se validaron relaciones *ManyToMany* y la correcta generación de tokens *JWT* y entidades enlazadas.
- Se confirmó la correcta autenticación de usuarios y recuperación de datos.

## 5.3. Manejo de Errores y Excepciones
- *Manejo Global*: Uso de GlobalExceptionHandler para capturar excepciones no controladas y devolver respuestas JSON estandarizadas.
- *Excepciones Personalizadas: Clases específicas como **GrupoYaExisteException, **UsuarioNoEncontradoException, y **MetaVencidaException*.
- *Validaciones de Entrada*: Protecciones con anotaciones como @NotBlank, @Email, @Valid para asegurar datos válidos.
- *Mensajes Amigables*: Errores comunicados de forma clara, sin revelar detalles internos, protegiendo la seguridad del backend.

# 6. Medidas de Seguridad Implementadas

## 6.1. Seguridad de Datos
El sistema utiliza *Spring Security* con configuración personalizada para proteger los datos:
- *Autenticación con JWT*: Se verifica la validez de los tokens con JwtAuthenticationFilter para garantizar que solo usuarios autenticados accedan a recursos protegidos.
- *Contraseñas encriptadas: Se usan algoritmos **BCrypt* para almacenar contraseñas de forma segura.
- *Sesiones sin estado (Stateless)*: La arquitectura no utiliza sesiones tradicionales, reduciendo riesgos como el secuestro de sesión.
- *Protección de Endpoints*: Control de acceso basado en roles con @Secured y @PreAuthorize para restringir operaciones a usuarios autorizados.

## 6.2. Prevención de Vulnerabilidades
Se implementaron medidas para prevenir amenazas comunes:
- *Configuración de CORS*: Acceso controlado entre frontend y backend para evitar intercambios no autorizados de datos.
- *Desactivación de CSRF*: Se desactivó solo en rutas públicas, ya que el uso de JWT elimina la necesidad de tokens de sesión.
- *Validación de Entrada: Validaciones estrictas para prevenir ataques como **SQL Injection* o *XSS*.
- *Manejo Centralizado de Errores*: Uso de GlobalExceptionHandler para gestionar errores de manera segura, evitando la filtración de detalles internos.

# 7. Eventos y Asincronía

## 7.1. Eventos Utilizados
El sistema utiliza eventos de *Spring Framework* para desacoplar procesos y mejorar la escalabilidad. Ejemplos:
- *HelloEmailEvent*: Evento que envía correos electrónicos sin bloquear el hilo principal, activado al registrar un nuevo usuario.
- *EmailListener: Componente que escucha los eventos y gestiona el envío de correos con **EmailService*, separando responsabilidades y facilitando futuras extensiones.
  
Este enfoque mejora la mantenibilidad y escalabilidad del sistema.

## 7.2. Importancia e Implementación Asíncrona
El envío de correos es costoso en recursos, por lo que se maneja de forma asincrónica con @Async. Esto permite:
- Evitar bloqueos en la aplicación durante el envío de correos.
- Mejorar el rendimiento al no interrumpir el flujo principal.
- Ofrecer una experiencia de usuario más fluida, sin demoras tras registrar o crear contenido.

Este patrón de diseño mejora la escalabilidad y facilita la implementación de nuevas funcionalidades basadas en eventos.

# 8. Uso de GitHub

## 8.1. GitHub Projects (Issues y Deadlines)
Herramienta principal para colaboración y control de versiones. Se utilizaron ramas independientes para cada funcionalidad, como *entidad-especialista, **herencia-publicación-rutina, entre otras. Se emplearon **Issues* para distribuir tareas, asignar responsables y hacer seguimiento, incluyendo:
- Descripción clara del objetivo.
- Checklist de tareas.
- Etiquetas (feature, bug, refactor).

Al finalizar, las ramas se probaron, revisaron y fusionaron a la rama principal mediante *Pull Requests*, asegurando la estabilidad y un historial limpio de commits.

## 8.2. Flujo de Trabajo con GitHub Actions
Aunque no se implementó un pipeline avanzado, se siguieron buenas prácticas como:
- Uso de ramas separadas por funcionalidad.
- Verificación manual del código y pruebas antes del merge.
- Estructura de commits clara y revisión cruzada de código.

Como mejora futura, se planea integrar *GitHub Actions* para automatizar el testing y la compilación, mejorando el control de calidad y facilitando el despliegue.

# 9. Conclusión

## 9.1. Logros del Proyecto
Durante el desarrollo de VidaFit, se logró implementar una arquitectura sólida, segura y escalable, permitiendo a los usuarios interactuar en un entorno motivacional y saludable.  
Uno de los principales logros fue la correcta gestión de autenticación y autorización mediante *JWT* y roles diferenciados (USER, ADMIN, ESPECIALISTA), lo cual garantiza la protección de los datos personales y el control de acceso a funcionalidades específicas.  
También se destaca la implementación de:
- Publicaciones especializadas con herencia *JOINED*.
- Gestión avanzada de rutinas personalizadas.
- Seguimiento individual del progreso mediante publicaciones automáticas.
- Eventos y asincronía para el envío eficiente de correos, mejorando la experiencia del usuario.

VidaFit se consolidó como una red social funcional, segura y con potencial de crecimiento, alineada con buenas prácticas de desarrollo backend y enfocada en promover hábitos saludables de forma colaborativa.

## 9.2. Aprendizajes Clave
- *Planificación previa*: Se planificó el desarrollo desde el inicio, priorizando la seguridad y la escalabilidad, permitiendo trabajar con orden y eficiencia en cada etapa.
- *Análisis del modelo entidad-relación: Se revisaron a fondo las entidades y sus relaciones, optimizando el diseño, garantizando la integridad y facilitando su implementación en **JPA*.
- *Implementación de Repositorios: Se optó por **JpaRepository* en lugar de *CRUDRepository*, simplificando las operaciones CRUD y evitando problemas con funcionalidades avanzadas del ORM.
- *Servicios del modelo de negocio*: Se aplicaron buenas prácticas al separar la lógica del negocio en servicios, lo que permitió mantener un código limpio, reutilizable y de fácil mantenimiento.
- *Definición de DTOs*: Se diseñaron DTOs específicos para controlar los datos expuestos en la API, protegiendo información sensible y alineándose con principios de desarrollo seguro y encapsulado.

## 9.3. Trabajo Futuro
En futuras versiones de VidaFit, se planea implementar mejoras funcionales accesibles que aumenten la interacción y personalización del sistema:
- Comentarios y reacciones en publicaciones, fomentando la interacción entre usuarios dentro de los grupos.
- Mejora de notificaciones por correo, recordatorios sobre metas próximas a vencer o mensajes de felicitación al cumplir logros.
- Sección de “Recomendaciones del día”, que muestre sugerencias automáticas de rutinas, recetas o frases motivacionales según los intereses del usuario.
- Perfiles enriquecidos, donde los usuarios puedan mostrar públicamente sus metas cumplidas y logros destacados.
- Preparación para una app móvil, adaptando los endpoints actuales para facilitar la integración con clientes externos sin rediseñar la lógica central.

# 10. Apéndices

## 10.1. Licencia
Este proyecto se desarrolla con fines educativos en el marco del curso *Desarrollo Basado en Plataformas* (UTEC, 2025-1).  
VidaFit se distribuye bajo la *Licencia MIT*, permitiendo su uso, modificación y redistribución para fines no comerciales, siempre que se otorgue el crédito correspondiente al equipo desarrollador.

## 10.2. Referencias
- *Smart Fit App*: Plataforma de referencia para rutinas y motivación fitness.  
  [https://www.smartfit.com.pe](https://www.smartfit.com.pe)
- *MyFitnessPal*: Aplicación de control alimenticio y metas saludables.  
  [https://www.myfitnesspal.com](https://www.myfitnesspal.com)
