import { CreateNotificationController } from '../controllers/CreateNotificationController';
import { GetNotificationsController } from '../controllers/GetNotificationsController';
import { MarkNotificationAsReadController } from '../controllers/MarkNotificationAsReadController';
import { MarkAllNotificationsAsReadController } from '../controllers/MarkAllNotificationsAsReadController';
import { DeleteNotificationController } from '../controllers/DeleteNotificationController';

import { CreateNotificationUseCase } from '../../../application/use-cases/CreateNotificationUseCase';
import { GetNotificationsUseCase } from '../../../application/use-cases/GetNotificationsUseCase';
import { MarkNotificationAsReadUseCase } from '../../../application/use-cases/MarkNotificationAsReadUseCase';
import { MarkAllNotificationsAsReadUseCase } from '../../../application/use-cases/MarkAllNotificationsAsReadUseCase';
import { DeleteNotificationUseCase } from '../../../application/use-cases/DeleteNotificationUseCase';

import { PostgreSQLNotificationRepository } from '../../repositories/PostgreSQLNotification';
import { UUIDService } from '../../services/UUIDService';

// Repositories
export const notificationRepository = new PostgreSQLNotificationRepository();

// Use Cases
export const createNotificationUseCase = new CreateNotificationUseCase(
  notificationRepository,
  new UUIDService()
);

export const getNotificationsUseCase = new GetNotificationsUseCase(notificationRepository);

export const markNotificationAsReadUseCase = new MarkNotificationAsReadUseCase(notificationRepository);

export const markAllNotificationsAsReadUseCase = new MarkAllNotificationsAsReadUseCase(notificationRepository);

export const deleteNotificationUseCase = new DeleteNotificationUseCase(notificationRepository);

// Controllers
export const createNotificationController = new CreateNotificationController(createNotificationUseCase);
export const getNotificationsController = new GetNotificationsController(getNotificationsUseCase);
export const markNotificationAsReadController = new MarkNotificationAsReadController(markNotificationAsReadUseCase);
export const markAllNotificationsAsReadController = new MarkAllNotificationsAsReadController(markAllNotificationsAsReadUseCase);
export const deleteNotificationController = new DeleteNotificationController(deleteNotificationUseCase); 