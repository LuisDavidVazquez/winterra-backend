# Winterra Backend - Microservicios con Docker y Nginx

Este proyecto contiene microservicios dockerizados con un balanceador de carga Nginx.

## Arquitectura

```
Internet → Nginx (Load Balancer) → user-service (puerto 3000)
                                → avatar-service (puerto 3001)
                                → community-service (puerto 3002)
                                → habits-service (puerto 3003)
                                → RabbitMQ (puerto 5672)
```

## Servicios

- **Nginx**: Balanceador de carga y proxy inverso (puerto 80)
- **user-service**: Microservicio de usuarios (puerto 3000)
- **avatar-service**: Microservicio de avatares (puerto 3001)
- **community-service**: Microservicio de comunidades (puerto 3002)
- **habits-service**: Microservicio de hábitos (puerto 3003)
- **RabbitMQ**: Broker de mensajes (puerto 5672, Management UI: 15672)

## Rutas disponibles

### A través de Nginx (recomendado)
- `http://localhost/users` → user-service
- `http://localhost/avatars` → avatar-service
- `http://localhost/communities` → community-service
- `http://localhost/habits` → habits-service
- `http://localhost/api/users` → user-service (con prefijo /api)
- `http://localhost/api/avatars` → avatar-service (con prefijo /api)
- `http://localhost/api/communities` → community-service (con prefijo /api)
- `http://localhost/api/habits` → habits-service (con prefijo /api)
- `http://localhost/health` → Health check de Nginx

### Acceso directo a servicios
- `http://localhost:3000` → user-service
- `http://localhost:3001` → avatar-service
- `http://localhost:3002` → community-service
- `http://localhost:3003` → habits-service

### RabbitMQ Management
- `http://localhost:15672` → Interfaz de administración de RabbitMQ
  - Usuario: `guest`
  - Contraseña: `guest`

## Endpoints por servicio

### User Service
- `GET /` - Información del servicio
- `GET /users` - Lista de usuarios (ejemplo)

### Avatar Service
- `GET /` - Información del servicio
- `GET /avatars` - Lista de avatares (ejemplo)

### Community Service
- `GET /` - Información del servicio
- `GET /communities` - Lista de comunidades
- `GET /communities/:id` - Detalles de una comunidad
- `GET /communities/:id/members` - Miembros de una comunidad
- `GET /communities/:id/posts` - Posts de una comunidad
- `POST /communities` - Crear nueva comunidad

### Habits Service
- `GET /` - Información del servicio
- `GET /habits` - Lista de hábitos
- `GET /habits/:id` - Detalles de un hábito
- `GET /habits/:id/progress` - Progreso de un hábito
- `GET /habits/categories` - Categorías de hábitos
- `POST /habits` - Crear nuevo hábito
- `POST /habits/:id/progress` - Registrar progreso de un hábito

## Comandos

### Levantar todos los servicios
```bash
docker compose up --build
```

### Levantar en segundo plano
```bash
docker compose up --build -d
```

### Ver logs
```bash
docker compose logs -f
```

### Ver logs de un servicio específico
```bash
docker compose logs -f nginx
docker compose logs -f user-service
docker compose logs -f avatar-service
docker compose logs -f community-service
docker compose logs -f habits-service
```

### Detener servicios
```bash
docker compose down
```

### Detener y eliminar volúmenes
```bash
docker compose down -v
```

## Características de Nginx

- **Balanceo de carga**: Distribuye tráfico entre microservicios
- **Rate limiting**: 10 requests/segundo por IP
- **Compresión Gzip**: Para mejorar rendimiento
- **Headers de seguridad**: Protección contra ataques comunes
- **Health checks**: Endpoint `/health` para monitoreo
- **Logging**: Logs detallados de acceso y errores

## Variables de entorno

Los servicios están configurados con las siguientes variables de entorno:
- `RABBITMQ_URL`: URL de conexión a RabbitMQ

## Desarrollo

Para desarrollo local, puedes acceder directamente a los servicios en sus puertos originales o usar Nginx como gateway unificado.

## Estructura del proyecto

```
winterra backend/
├── user-service/
├── avatar-service/
├── community-service/
├── habits-service/
├── nginx/
│   ├── nginx.conf
│   └── conf.d/
│       └── default.conf
├── docker-compose.yml
└── README.md
```
