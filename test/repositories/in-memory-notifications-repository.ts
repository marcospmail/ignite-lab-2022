import { NotificationRepository } from '@application/repositories/notification-repository';
import { Notification } from '@application/entities/notification';

export class InMemoryNotificationRepository extends NotificationRepository {
  public notifications: Notification[] = [];

  async create(notification: Notification) {
    this.notifications.push(notification);
  }

  async findById(id: string): Promise<Notification | null> {
    const notification = Promise.resolve(
      this.notifications.find((notification) => notification.id === id) ?? null,
    );

    if (!notification) {
      return null;
    }

    return notification;
  }

  async save(notification: Notification): Promise<void> {
    this.notifications = this.notifications.map((v) =>
      v.id === notification.id ? notification : v,
    );

    return Promise.resolve();
  }

  countManyByRecipientId(recipientId: any): Promise<number> {
    return Promise.resolve(
      this.notifications.filter((v) => v.recipientId === recipientId).length,
    );
  }

  findManyByRecipientId(recipientId: any): Promise<Notification[]> {
    return Promise.resolve(
      this.notifications.filter((v) => v.recipientId === recipientId),
    );
  }
}
