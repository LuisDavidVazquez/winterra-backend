# Habits Service

Microservicio para la gestión de hábitos de usuarios en la aplicación Winterra.

## 🏗️ Arquitectura

Este servicio sigue la arquitectura hexagonal (Domain-Driven Design) con las siguientes capas:

- **Domain**: Entidades, Value Objects, Repositorios (interfaces)
- **Application**: Casos de Uso, DTOs
- **Infrastructure**: Controladores, Repositorios (implementaciones), Modelos

## 📊 Estructura de Base de Datos

### Tablas Principales

1. **habit_types**: Tipos de hábito disponibles (Ejercicio, Estudio, Sueño, etc.)
2. **habit_categories**: Categorías de hábitos (Salud, Aprendizaje, etc.)
3. **habits**: Hábitos disponibles en el sistema
4. **user_habits**: Hábitos personalizados de los usuarios

### Campos Importantes

- **routine_days**: Formato de 7 caracteres (0s y 1s) representando los días de la semana
  - Ejemplo: `"1010100"` = Lunes, Miércoles, Viernes activos

## 🚀 Endpoints

### Habit Types
- `POST /api/habits/habit-types` - Crear tipo de hábito
- `GET /api/habits/habit-types` - Obtener todos los tipos de hábito

### User Habits
- `POST /api/habits/{userId}/habits` - Crear hábito de usuario
- `GET /api/habits/{userId}/habits` - Obtener hábitos de un usuario

### Health Check
- `GET /health` - Verificar estado del servicio

## 🛠️ Configuración

### Variables de Entorno

```env
NODE_ENV=development
PORT=3003
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_DATABASE=habits_service
RABBITMQ_URL=amqp://guest:guest@rabbitmq:5672
```

### Instalación

```bash
# Instalar dependencias
npm install

# Desarrollo
npm run dev

# Producción
npm run build
npm start
```

## 📝 Ejemplos de Uso

### Crear Tipo de Hábito
```json
POST /api/habits/habit-types
{
  "name": "Ejercicio",
  "description": "Actividades físicas y deportivas"
}
```

### Crear Hábito de Usuario (Sistema)
```json
POST /api/habits/{userId}/habits
{
  "habitId": "uuid-del-habito",
  "routineDays": "1010100"
}
```

### Crear Hábito de Usuario (Personalizado)
```json
POST /api/habits/{userId}/habits
{
  "customName": "Leer 30 minutos",
  "customDescription": "Leer un libro por 30 minutos antes de dormir",
  "routineDays": "1111100"
}
```

## 🧪 Testing

Importa la colección de Postman `Habits-Service-Postman-Collection.json` para probar los endpoints.

## 🔧 Desarrollo

### Estructura de Archivos
```
src/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   ├── repositories/
│   └── services/
├── application/
│   ├── use-cases/
│   └── dtos/
└── infrastructure/
    ├── http/
    │   ├── controllers/
    │   ├── routes/
    │   └── dependencies/
    ├── repositories/
    ├── models/
    └── services/
```

### Agregar Nuevos Endpoints

1. Crear Value Objects en `domain/value-objects/`
2. Crear Entidades en `domain/entities/`
3. Crear Repositorio (interfaz) en `domain/repositories/`
4. Crear Modelo en `infrastructure/models/`
5. Crear Repositorio (implementación) en `infrastructure/repositories/PostgreSQL/`
6. Crear DTOs en `application/dtos/`
7. Crear Caso de Uso en `application/use-cases/`
8. Crear Controlador en `infrastructure/http/controllers/`
9. Agregar a dependencias en `infrastructure/http/dependencies/`
10. Crear rutas en `infrastructure/http/routes/`
11. Registrar rutas en `src/index.ts`

## 📚 Dependencias Principales

- **Express**: Framework web
- **TypeORM**: ORM para PostgreSQL
- **UUID**: Generación de IDs únicos
- **CORS**: Middleware para CORS
- **Reflect-metadata**: Para decoradores de TypeORM 