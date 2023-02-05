import { NotificationRepository } from '../../src/application/repositories/notification-repository';
import { Notification } from '../../src/application/entities/notification';

export class InMemoryNotificationRepository extends NotificationRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }
}
