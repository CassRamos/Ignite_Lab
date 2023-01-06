import { MakeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notifications';

describe('Count recipients notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const countRecipientNotification = new CountRecipientNotification(
      notificationRepository,
    );

    await notificationRepository.create(
      MakeNotification({ recipientID: 'recipient-1' }),
    );

    await notificationRepository.create(
      MakeNotification({ recipientID: 'recipient-2' }),
    );

    await notificationRepository.create(
      MakeNotification({ recipientID: 'recipient-2' }),
    );

    const { count } = await countRecipientNotification.execute({
      recipientID: 'recipient-id-1',
    });

    expect(count).toEqual(2);
  });
});
