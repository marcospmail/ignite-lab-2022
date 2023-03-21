import { Content } from '@application/entities/content';
import { Notification } from '@application/entities/notification';
import { randomUUID } from 'crypto';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';
import { CountRecipientNotifications } from './count-recipient-notification';

describe('Count Recipient Notifications', () => {
  it('should be able to count the recipient notifications', async () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new CountRecipientNotifications(
      inMemoryNotificationRepository,
    );

    const recipientId = randomUUID();
    const otherRecipientId = randomUUID();

    inMemoryNotificationRepository.create(
      new Notification({
        recipientId,
        content: new Content('Hello World'),
        category: 'some category',
      }),
    );

    inMemoryNotificationRepository.create(
      new Notification({
        recipientId,
        content: new Content('Hello World'),
        category: 'some category',
      }),
    );

    inMemoryNotificationRepository.create(
      new Notification({
        recipientId: otherRecipientId,
        content: new Content('Hello World'),
        category: 'some category',
      }),
    );

    const { count } = await sendNotification.execute({
      recipientId,
    });

    expect(count).toEqual(2);
  });
});
