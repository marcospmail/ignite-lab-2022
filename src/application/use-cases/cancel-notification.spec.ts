import { makeNotification } from '@test/factories/notification-factory';
import { randomUUID } from 'node:crypto';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CancelNotification } from './cancel-notification';
import { NotificationNotFound } from './errors/notification-not-found';

describe('Send Notification', () => {
  it('should be able to cancel notification', async () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();

    const notification = makeNotification();

    await inMemoryNotificationRepository.create(notification);

    const cancelNotification = new CancelNotification(
      inMemoryNotificationRepository,
    );

    await cancelNotification.execute({
      notificationId: notification.id,
    });

    expect(inMemoryNotificationRepository.notifications[0].canceledAt).toEqual(
      expect.any(Date),
    );
  });

  it('should not be able to cancel a non existing notification', async () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();

    const cancelNotification = new CancelNotification(
      inMemoryNotificationRepository,
    );

    expect(async () => {
      return await cancelNotification.execute({
        notificationId: randomUUID(),
      });
    }).rejects.toThrowError(NotificationNotFound);
  });
});
