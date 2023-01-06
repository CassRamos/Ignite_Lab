import { Notification } from '../entities/notification';

export abstract class NotificationRepository {
  abstract create(notification: Notification): Promise<void>;
  abstract findById(notificationId: string): Promise<Notification | null>;
  abstract save(notification: Notification): Promise<void>;
  abstract countManyByRecipientId(recipientID: string): Promise<number>;
  abstract findManyByRecipientId(recipientID: string): Promise<Notification[]>;
}
