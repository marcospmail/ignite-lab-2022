import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { UnreadNotification } from './unread-notification';

describe('Read Notification', () => {
  it('should be able to unread a notification', async () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();

    const unreadNotification = new UnreadNotification(
      inMemoryNotificationRepository,
    );

    const notification = makeNotification({
      readAt: new Date(),
    });

    inMemoryNotificationRepository.create(notification);

    await unreadNotification.execute({
      notificationId: notification.id,
    });

    const notificationFound = await inMemoryNotificationRepository.findById(
      notification.id,
    );

    expect(notificationFound?.readAt).toBeNull();
  });

  it('should not be able to read a non existing notification', () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();

    const unreadNotification = new UnreadNotification(
      inMemoryNotificationRepository,
    );

    expect(() => {
      return unreadNotification.execute({
        notificationId: 'non-existing-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
