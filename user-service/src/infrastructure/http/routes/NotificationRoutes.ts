import { Router } from 'express';
import {
  createNotificationController,
  getNotificationsController,
  markNotificationAsReadController,
  markAllNotificationsAsReadController,
  deleteNotificationController
} from '../dependencies/NotificationDependencies';

const router = Router();

// Crear notificación
router.post('/notifications', (req, res) => createNotificationController.handle(req, res));

// Obtener notificaciones de un usuario
router.get('/:userId/notifications', (req, res) => getNotificationsController.handle(req, res));

// Marcar notificación como leída
router.put('/notifications/:notificationId/read', (req, res) => markNotificationAsReadController.handle(req, res));

// Marcar todas las notificaciones de un usuario como leídas
router.put('/:userId/notifications/read-all', (req, res) => markAllNotificationsAsReadController.handle(req, res));

// Eliminar notificación
router.delete('/notifications/:notificationId', (req, res) => deleteNotificationController.handle(req, res));

export default router; 