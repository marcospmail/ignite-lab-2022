import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';
import { ReadNotification } from './read-notification';

describe('Read Notification', () => {
  it('should be able to read a notification', async () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();

    const readNotification = new ReadNotification(
      inMemoryNotificationRepository,
    );

    const notification = makeNotification();

    inMemoryNotificationRepository.create(notification);

    await readNotification.execute({
      notificationId: notification.id,
    });

    const notificationFound = await inMemoryNotificationRepository.findById(
      notification.id,
    );

    expect(notificationFound?.readAt).toEqual(expect.any(Date));
  });

  it('should not be able to read a non existing notification', () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();

    const readNotification = new ReadNotification(
      inMemoryNotificationRepository,
    );

    expect(() => {
      return readNotification.execute({
        notificationId: 'non-existing-notification-id',
      });
    }).rejects.toThrow(NotificationNotFound);
  });
});
