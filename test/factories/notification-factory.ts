import { Notification, NotificationProps } from '@app/entities/notification';
import { Content } from '@app/entities/content';

type Override = Partial<NotificationProps>;

export function MakeNotification(override: Override = {}) {
  return new Notification({
    content: new Content('Nova solicitação de amizade'),
    category: 'social',
    recipientID: 'recipient-id-1',
    ...override,
  });
}
