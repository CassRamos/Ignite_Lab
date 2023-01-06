import { MakeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationsRepository } from '@test/repositories/in-memory-notifications-repository';
import { GetRecipientNotification } from './get-recipient-notifications';

describe('Count recipients notifications', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationRepository = new InMemoryNotificationsRepository();
    const getRecipientNotification = new GetRecipientNotification(
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

    const { notifications } = await getRecipientNotification.execute({
      recipientID: 'recipient-id-1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientID: 'recipient-2' }),
        expect.objectContaining({ recipientID: 'recipient-2' }),
      ]),
    );
  });
});
