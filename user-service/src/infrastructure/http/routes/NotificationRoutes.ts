import { Router } from 'express';
import { CreateNotificationController } from '../controllers/CreateNotificationController';
import { GetNotificationsController } from '../controllers/GetNotificationsController';
import { MarkNotificationAsReadController } from '../controllers/MarkNotificationAsReadController';
import { MarkAllNotificationsAsReadController } from '../controllers/MarkAllNotificationsAsReadController';
import { DeleteNotificationController } from '../controllers/DeleteNotificationController';

const router = Router();

// Crear notificación
router.post('/notifications', async (req, res) => {
  const controller = new CreateNotificationController(req.app.locals.createNotificationUseCase);
  await controller.handle(req, res);
});

// Obtener notificaciones de un usuario
router.get('/users/:userId/notifications', async (req, res) => {
  const controller = new GetNotificationsController(req.app.locals.getNotificationsUseCase);
  await controller.handle(req, res);
});

// Marcar notificación como leída
router.put('/notifications/:notificationId/read', async (req, res) => {
  const controller = new MarkNotificationAsReadController(req.app.locals.markNotificationAsReadUseCase);
  await controller.handle(req, res);
});

// Marcar todas las notificaciones de un usuario como leídas
router.put('/users/:userId/notifications/read-all', async (req, res) => {
  const controller = new MarkAllNotificationsAsReadController(req.app.locals.markAllNotificationsAsReadUseCase);
  await controller.handle(req, res);
});

// Eliminar notificación
router.delete('/notifications/:notificationId', async (req, res) => {
  const controller = new DeleteNotificationController(req.app.locals.deleteNotificationUseCase);
  await controller.handle(req, res);
});

export default router; 