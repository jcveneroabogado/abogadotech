## **📄 DOCUMENTO TÉCNICO**

### **SISTEMA: ABOGADO TECH**

### **MÓDULO INICIAL: CÁLCULO DE PENA**

### **VERSIÓN: v0.001 (DEMO CONTROLADA)**

---

## **1\. VISIÓN GENERAL DEL SISTEMA**

**Abogado Tech** es una plataforma web orientada a profesionales del derecho (principalmente abogados penalistas y fiscales), diseñada para ofrecer herramientas digitales que optimicen el análisis, cálculo y toma de decisiones jurídicas.

El sistema se concibe como una plataforma modular, donde cada funcionalidad se implementa como un módulo independiente. Esto permitirá escalar progresivamente agregando nuevas herramientas sin afectar el funcionamiento del sistema existente.

En su fase inicial, el sistema contará con un único módulo:

👉 **Módulo de Cálculo de Pena**

Este módulo permitirá a los usuarios calcular rangos de penas en base a parámetros legales definidos, replicando inicialmente el comportamiento de una aplicación legacy (APK), pero con una arquitectura moderna, escalable y mantenible.

---

## **2\. OBJETIVO DE LA VERSIÓN v0.001 (DEMO CONTROLADA)**

La versión v0.001 tiene como propósito principal validar el uso real del sistema con usuarios profesionales.

Los objetivos específicos son:

* Replicar el comportamiento funcional del APK original  
* Implementar autenticación de usuarios desde el inicio  
* Generar confianza mediante acceso seguro y controlado  
* Permitir el uso del sistema en entornos reales de trabajo  
* Recoger feedback directo de usuarios expertos (fiscales/abogados)  
* Identificar mejoras, errores y oportunidades de expansión

Esta versión no busca perfección, sino validación.

---

## **3\. ALCANCE DEL SISTEMA (v0.001)**

### **3.1 Funcionalidades incluidas**

* Sistema de autenticación (login con email y contraseña)  
* Gestión manual de usuarios (sin registro público)  
* Control de acceso basado en tiempo (trial)  
* Módulo de cálculo de pena (replicación funcional del APK)  
* Interfaz web accesible desde navegador  
* Despliegue en entorno cloud  
* Flujo completo desde login hasta resultado de cálculo

---

### **3.2 Funcionalidades NO incluidas (en esta versión)**

* Registro libre de usuarios  
* Múltiples módulos  
* Historial de cálculos  
* Almacenamiento de casos  
* Exportación de resultados  
* Integraciones externas  
* Motor legal avanzado dinámico  
* Panel administrativo completo

---

## **4\. ARQUITECTURA DEL SISTEMA**

El sistema sigue una arquitectura moderna basada en servicios desacoplados.

---

### **4.1 Frontend**

* Framework: Next.js  
* Lenguaje: TypeScript  
* Renderizado: híbrido (SSR \+ CSR según necesidad)  
* Objetivo: interfaz rápida, clara y profesional

---

### **4.2 Backend (BaaS)**

Se utilizará **Supabase** como backend principal.

Responsabilidades:

* Autenticación de usuarios  
* Gestión de sesiones  
* Base de datos (PostgreSQL)  
* Control de acceso básico

---

### **4.3 Hosting**

* Plataforma: Vercel  
* Despliegue automático desde repositorio  
* Entorno optimizado para Next.js

---

### **4.4 Entorno de desarrollo**

* Desarrollo local (máquina del desarrollador)  
* Conexión a servicios cloud (Supabase)  
* Control de versiones con Git

---

## **5\. PRINCIPIOS DE DISEÑO DEL SISTEMA**

El desarrollo del sistema seguirá los siguientes principios:

---

### **5.1 Modularidad**

Cada funcionalidad será desarrollada como módulo independiente.  
 Esto permitirá escalar el sistema sin romper funcionalidades existentes.

---

### **5.2 Simplicidad**

La interfaz debe ser clara, rápida y enfocada en productividad.  
 El usuario debe obtener resultados en el menor número de pasos posible.

---

### **5.3 Precisión**

Los cálculos deben ser coherentes con la lógica legal utilizada.  
 Aunque inicialmente sean simplificados, deben ser consistentes.

---

### **5.4 Escalabilidad**

El sistema debe permitir:

* agregar nuevos módulos  
* mejorar lógica existente  
* integrar nuevas fuentes de datos

sin necesidad de reestructuración completa.

---

### **5.5 Separación de responsabilidades**

* UI separada de lógica  
* lógica separada de datos  
* datos controlados desde backend

---

### **5.6 Control de acceso**

Todo acceso al sistema estará condicionado por:

* autenticación válida  
* vigencia del usuario (trial activo)

---

## **6\. ESTRUCTURA GENERAL DEL SISTEMA**

El sistema estará compuesto por los siguientes componentes:

---

### **6.1 Módulo de autenticación**

* Login de usuarios  
* Gestión de sesión  
* Protección de rutas

---

### **6.2 Módulo de cálculo de pena**

* Selección de delito  
* Selección de condiciones (agravantes, etc.)  
* Procesamiento de cálculo  
* Visualización de resultados

---

### **6.3 Sistema de control de acceso**

* Validación de expiración de cuenta  
* Restricción de uso  
* Mensajes de acceso denegado

---

### **6.4 Interfaz de usuario**

* Navegación simple  
* Flujo guiado  
* Diseño orientado a profesionales

---

# **🧠 NOTA IMPORTANTE PARA DESARROLLO**

Este documento define la base conceptual del sistema.  
 La implementación debe respetar esta estructura y evitar soluciones improvisadas fuera de este marco.

**7\. FLUJO DE USUARIO (USER FLOW)**

El sistema debe ser diseñado para que un usuario profesional pueda obtener un resultado en el menor tiempo posible, con el menor número de pasos.

---

### **7.1 Flujo general**

El flujo principal del sistema será:

1. Usuario accede al sistema  
2. Usuario inicia sesión  
3. Sistema valida acceso (trial activo)  
4. Usuario accede al módulo de cálculo  
5. Usuario ingresa datos del caso  
6. Sistema procesa cálculo  
7. Sistema muestra resultado

---

### **7.2 Flujo detallado**

---

#### **7.2.1 Pantalla: Login**

**Objetivo:** Autenticación del usuario

Campos:

* Email  
* Password

Acciones:

* Botón “Ingresar”

Validaciones:

* Credenciales correctas  
* Usuario existente

Resultados:

* Login exitoso → redirige al sistema  
* Error → mostrar mensaje claro

---

#### **7.2.2 Validación de acceso (post-login)**

Después del login, el sistema debe validar:

* si el usuario tiene acceso activo  
* si el trial no ha expirado

Condición:

* Si `fecha_actual > fecha_expiración`  
   → bloquear acceso

Resultado:

* Mostrar mensaje: “Tu acceso ha expirado”  
* No permitir uso del sistema

---

#### **7.2.3 Pantalla: Selección de módulo**

En v0.001:

* Solo existe un módulo visible:  
   👉 “Cálculo de Pena”

Acción:

* Botón de acceso al módulo

---

#### **7.2.4 Pantalla: Formulario de cálculo**

**Objetivo:** Recopilar los datos necesarios para el cálculo

---

##### **Inputs iniciales (base del APK)**

Los inputs deben replicar el comportamiento del APK original.

Ejemplo de estructura:

* Tipo de delito (select)  
* Condiciones del delito (checkbox / select)  
* Factores adicionales (si aplica)

---

##### **Tipos de inputs**

* Select (para delitos)  
* Checkbox (para agravantes)  
* Input numérico (si aplica)  
* Opciones condicionales (dependen del delito)

---

##### **Reglas de UX**

* No saturar pantalla  
* Mostrar opciones progresivamente  
* Evitar formularios largos

---

#### **7.2.5 Acción: Calcular**

Botón:  
 👉 “Calcular pena”

Acción:

* Recoger todos los inputs  
* Enviar a función de cálculo  
* Procesar resultado

---

#### **7.2.6 Pantalla: Resultado**

**Objetivo:** Mostrar resultado claro y útil

Debe mostrar:

* Pena mínima  
* Pena máxima  
* Resumen del cálculo

Opcional (recomendado):

* explicación breve del resultado

---

## **8\. DEFINICIÓN DEL MÓDULO: CÁLCULO DE PENA**

Este es el núcleo del sistema.

---

### **8.1 Objetivo del módulo**

Calcular el rango de pena en función de:

* tipo de delito  
* condiciones específicas  
* factores agravantes/atenuantes

---

### **8.2 Enfoque inicial (v0.001)**

El módulo debe:

👉 replicar el comportamiento del APK  
 👉 mantener coherencia con su lógica  
 👉 mejorar estructura interna

---

### **8.3 Estructura lógica del cálculo**

El cálculo debe dividirse en:

---

#### **1\. Identificación del delito**

Cada delito tiene:

* pena mínima base  
* pena máxima base

---

#### **2\. Aplicación de condiciones**

Dependiendo del caso:

* se agregan incrementos  
* se modifican rangos

---

#### **3\. Ajustes finales**

* validación de límites  
* normalización de resultados

---

#### **4\. Resultado**

Salida final:

* rango de pena

---

## **9\. MODELO DE DATOS (LÓGICA INTERNA)**

Aunque inicialmente se usen datos hardcodeados, deben estructurarse como si fueran persistentes.

---

### **9.1 Entidad: Delito**

Campos:

* id  
* nombre  
* pena\_min\_base  
* pena\_max\_base

---

### **9.2 Entidad: Condición**

Campos:

* id  
* nombre  
* tipo (agravante / atenuante)  
* impacto\_min  
* impacto\_max

---

### **9.3 Relación**

Un delito puede tener múltiples condiciones asociadas.

---

## **10\. FUNCIÓN DE CÁLCULO (ABSTRACTO)**

La lógica debe seguir este patrón:

---

### **Entrada:**

* delito seleccionado  
* lista de condiciones

---

### **Proceso:**

1. obtener pena base  
2. aplicar cada condición  
3. ajustar valores

---

### **Salida:**

* pena mínima final  
* pena máxima final

---

## **11\. REGLAS IMPORTANTES DE IMPLEMENTACIÓN**

---

### **11.1 No hardcodear lógica en UI**

La lógica debe estar separada:

* archivo o módulo independiente

---

### **11.2 Código limpio y extensible**

Evitar:

* lógica repetida  
* condiciones desordenadas

---

### **11.3 Preparado para base de datos**

Aunque al inicio sea local:

👉 debe poder migrarse a base de datos sin cambios grandes

---

# **🧠 NOTA CLAVE**

Este módulo es el corazón del sistema.  
 Si la lógica está mal estructurada desde el inicio, escalar será difícil.

## **12\. MODELO DE BASE DE DATOS (SUPABASE)**

El sistema utilizará una base de datos PostgreSQL gestionada por Supabase.

El diseño debe ser:

* simple (para v0.001)  
* escalable (para futuras versiones)  
* desacoplado de la lógica de frontend

---

## **12.1 PRINCIPIOS DEL MODELO DE DATOS**

* Evitar duplicación de datos  
* Mantener relaciones claras  
* Preparar el sistema para múltiples módulos  
* Permitir control de usuarios y acceso

---

## **12.2 ESTRUCTURA GENERAL**

En v0.001 se implementarán las siguientes tablas principales:

* profiles (usuarios extendidos)  
* modules (módulos del sistema)  
* user\_modules (acceso a módulos)

---

## **13\. TABLA: PROFILES (USUARIOS EXTENDIDOS)**

Supabase ya maneja autenticación con su tabla interna (`auth.users`).

Se creará una tabla adicional para extender información del usuario.

---

### **13.1 Estructura**

Tabla: profiles

Campos:

* id (UUID, PK, referencia a auth.users.id)  
* email (texto)  
* full\_name (texto, opcional)  
* role (texto, default: “user”)  
* trial\_start\_date (timestamp)  
* trial\_end\_date (timestamp)  
* is\_active (boolean, default: true)  
* created\_at (timestamp)

---

### **13.2 Propósito**

Permitir:

* controlar acceso  
* definir expiración  
* gestionar usuarios manualmente

---

## **14\. TABLA: MODULES**

Define los módulos disponibles en el sistema.

---

### **14.1 Estructura**

Tabla: modules

Campos:

* id (UUID, PK)  
* name (texto)  
* code (texto único)  
* description (texto)  
* is\_active (boolean)  
* created\_at (timestamp)

---

### **14.2 Ejemplo inicial**

* name: “Cálculo de Pena”  
* code: “pena\_calc”

---

## **15\. TABLA: USER\_MODULES**

Relaciona usuarios con módulos disponibles.

---

### **15.1 Estructura**

Tabla: user\_modules

Campos:

* id (UUID, PK)  
* user\_id (UUID, FK → profiles.id)  
* module\_id (UUID, FK → modules.id)  
* is\_enabled (boolean)  
* created\_at (timestamp)

---

### **15.2 Propósito**

Permitir en el futuro:

* vender módulos por separado  
* activar/desactivar funcionalidades  
* manejar suscripciones

---

## **16\. CONTROL DE ACCESO (TRIAL)**

El sistema debe validar acceso en base a:

---

### **16.1 Condiciones**

Un usuario puede acceder si:

* is\_active \= true  
* fecha\_actual \<= trial\_end\_date

---

### **16.2 Comportamiento**

Si no cumple:

* bloquear acceso  
* mostrar mensaje claro  
* impedir uso de módulos

---

---

## **17\. AUTENTICACIÓN**

Se utilizará el sistema de autenticación de Supabase.

---

### **17.1 Tipo de autenticación**

* Email \+ Password

---

### **17.2 Flujo**

1. Usuario creado manualmente  
2. Usuario recibe credenciales  
3. Usuario inicia sesión  
4. Supabase gestiona sesión

---

---

## **18\. SEGURIDAD (NIVEL v0.001)**

Aunque es una demo, se deben aplicar buenas prácticas desde el inicio.

---

### **18.1 Reglas básicas**

* No exponer lógica sensible en frontend  
* Validar acceso en cada carga de módulo  
* Usar variables de entorno para credenciales  
* No guardar datos sensibles en cliente

---

---

## **19\. VARIABLES DE ENTORNO**

El sistema debe utilizar variables de entorno para conexión con Supabase.

---

### **19.1 Variables necesarias**

* SUPABASE\_URL  
* SUPABASE\_ANON\_KEY

---

### **19.2 Uso**

* solo en backend o configuración segura  
* nunca hardcodear en código

---

---

## **20\. GESTIÓN DE USUARIOS (ADMINISTRACIÓN INICIAL)**

En v0.001 no habrá panel admin.

---

### **20.1 Gestión manual**

El desarrollador:

* crea usuarios en Supabase  
* asigna fechas de trial  
* controla acceso

---

### **20.2 Flujo**

1. Crear usuario en Auth  
2. Crear registro en profiles  
3. Definir trial  
4. (opcional) asignar módulo

---

---

## **21\. ESCALABILIDAD FUTURA DEL MODELO**

El diseño actual permite:

* agregar nuevos módulos  
* implementar suscripciones  
* crear roles (admin, premium, etc.)  
* integrar pagos  
* activar/desactivar funcionalidades

---

👉 Sin necesidad de rediseñar la base de datos

---

# **🧠 NOTA CRÍTICA**

Aunque esta es una versión demo, el modelo de datos ya está diseñado como producto real.

Esto evita:

* rehacer base de datos  
* migraciones complejas  
* pérdida de tiempo

## **22\. ESTRUCTURA DEL PROYECTO (CÓDIGO)**

El proyecto debe seguir una estructura clara, modular y escalable desde el inicio.

---

### **22.1 Estructura base**

/abogado-tech  
│  
├── /app  
│   ├── /login  
│   ├── /dashboard  
│   ├── /modulos  
│   │   └── /calculo-pena  
│   │       ├── page.tsx  
│   │       ├── components/  
│   │       └── hooks/  
│  
├── /components  
│   ├── ui/  
│   ├── layout/  
│  
├── /lib  
│   ├── supabase/  
│   ├── auth/  
│   ├── utils/  
│  
├── /modules  
│   └── calculoPena/  
│       ├── domain/  
│       │   ├── types.ts  
│       │   ├── constants.ts  
│       │   └── calculator.ts  
│       │  
│       ├── application/  
│       │   └── useCalculatePenalty.ts  
│       │  
│       └── infrastructure/  
│           └── data.ts  
│  
├── /styles  
│  
├── .env.local  
├── package.json  
└── README.md  
---

## **23\. SEPARACIÓN DE RESPONSABILIDADES**

---

### **23.1 UI (Frontend)**

Ubicación:

/app  
/components

Responsabilidad:

* renderizar interfaz  
* capturar inputs  
* mostrar resultados

---

### **23.2 Lógica de negocio**

Ubicación:

/modules/calculoPena/domain

Responsabilidad:

* cálculo de penas  
* reglas del sistema

---

### **23.3 Casos de uso**

Ubicación:

/modules/calculoPena/application

Responsabilidad:

* orquestar lógica  
* conectar UI con dominio

---

### **23.4 Datos**

Ubicación:

/modules/calculoPena/infrastructure

Responsabilidad:

* definir datos (hardcode inicial)  
* preparar futura conexión con DB

---

---

## **24\. CONVENCIONES DE CÓDIGO**

---

### **24.1 Lenguaje**

* Código: inglés  
* UI: español

---

### **24.2 Nombres**

* variables: camelCase  
* funciones: verbos (get, calculate, validate)  
* archivos: kebab-case o camelCase

---

### **24.3 Tipado**

* usar TypeScript estrictamente  
* evitar “any”

---

---

## **25\. REGLAS PARA EL USO DE CODEX (CRÍTICO)**

Este proyecto se desarrollará con asistencia de IA.

Para evitar errores, se deben seguir estas reglas:

---

### **25.1 Codex NO debe:**

* inventar lógica legal  
* modificar estructura sin indicación  
* mezclar UI con lógica  
* duplicar funciones

---

### **25.2 Codex SÍ debe:**

* respetar este documento  
* generar código modular  
* seguir estructura definida  
* escribir código limpio y legible

---

### **25.3 Estrategia de uso**

El desarrollador debe:

* pedir tareas específicas  
* validar resultados  
* no delegar decisiones críticas

---

---

## **26\. FLUJO DE DESARROLLO**

---

### **26.1 Fase inicial**

1. Crear proyecto Next.js  
2. Configurar Supabase  
3. Implementar login  
4. Crear estructura base

---

---

### **26.2 Desarrollo del módulo**

1. Definir datos (delitos)  
2. Crear lógica de cálculo  
3. Crear UI del formulario  
4. Conectar lógica con UI  
5. Mostrar resultados

---

---

### **26.3 Integración**

* validar login  
* validar acceso  
* probar flujo completo

---

---

### **26.4 Deploy**

* subir a GitHub  
* conectar con Vercel  
* configurar variables de entorno

---

---

## **27\. CONTROL DE VERSIONES**

---

### **27.1 Repositorio**

* usar GitHub

---

### **27.2 Estrategia**

* commits pequeños  
* mensajes claros

Ejemplo:

* “feat: add login page”  
* “fix: penalty calculation bug”

---

---

## **28\. ERRORES COMUNES A EVITAR**

---

### **28.1 Técnicos**

* mezclar lógica y UI  
* hardcodear todo en componentes  
* no tipar datos  
* duplicar código

---

### **28.2 De producto**

* querer hacer todo desde el inicio  
* no validar con usuarios  
* ignorar feedback real

---

---

## **29\. EVOLUCIÓN DEL SISTEMA**

---

Este sistema está diseñado para evolucionar hacia:

* múltiples módulos  
* sistema de suscripciones  
* panel administrativo  
* inteligencia legal avanzada

---

---

## **30\. CONCLUSIÓN**

La versión v0.001 no es un producto final.

Es:

👉 una herramienta funcional  
 👉 una base técnica sólida  
 👉 un punto de validación real

---

El éxito del sistema dependerá de:

* calidad de implementación  
* feedback de usuarios  
* iteración constante

---

# **🧠 CIERRE FINAL**

Con este documento tienes:

👉 dirección clara  
 👉 arquitectura definida  
 👉 reglas de desarrollo  
 👉 base escalable

---

 