import { randomUUID } from 'crypto';
import { SendNotification } from './send-notification';
import { InMemoryNotificationRepository } from '../../../test/repositories/in-memory-notifications-repository';

describe('Send Notification', () => {
  it('should be able to send notification', async () => {
    const inMemoryNotificationRepository = new InMemoryNotificationRepository();
    const sendNotification = new SendNotification(
      inMemoryNotificationRepository,
    );

    const { notification } = await sendNotification.execute({
      recipientId: randomUUID(),
      content: 'Some content',
      category: 'Some category',
    });

    expect(inMemoryNotificationRepository.notifications).toHaveLength(1);
    expect(inMemoryNotificationRepository.notifications[0]).toEqual(
      notification,
    );
  });
});
