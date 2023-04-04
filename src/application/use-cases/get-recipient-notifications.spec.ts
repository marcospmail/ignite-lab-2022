import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotifications } from './get-recipient-notifications';
import { randomUUID } from 'crypto';
import { makeNotification } from '@test/factories/notification-factory';

describe('Get Recipient Notifications', () => {
  it('should be able to get the recipient notifications', async () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();

    const getRecipientNotifications = new GetRecipientNotifications(
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

    const { notifications } = await getRecipientNotifications.execute({
      recipientId,
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          recipientId,
        }),
        expect.objectContaining({
          recipientId,
        }),
      ]),
    );
  });
});
