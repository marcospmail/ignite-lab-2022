import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { randomUUID } from 'crypto';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notification';
import { makeNotification } from '@test/factories/notification-factory';

describe('Count Recipient Notifications', () => {
  it('should be able to count the recipient notifications', async () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();
    const countRecipientNotifications = new CountRecipientNotifications(
      inMemoryNotificationRepository,
    );

    const recipientId = randomUUID();
    const otherRecipientId = randomUUID();

    inMemoryNotificationRepository.create(
      makeNotification({
        recipientId,
      }),
    );

    inMemoryNotificationRepository.create(
      makeNotification({
        recipientId,
      }),
    );

    inMemoryNotificationRepository.create(
      makeNotification({
        recipientId: otherRecipientId,
      }),
    );

    const { count } = await countRecipientNotifications.execute({
      recipientId,
    });

    expect(count).toEqual(2);
  });
});
