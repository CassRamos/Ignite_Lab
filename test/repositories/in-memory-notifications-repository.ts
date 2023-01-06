import { Notification } from 'src/app/entities/notification';
import { NotificationRepository } from 'src/app/repositories/notifications-repository';

const notifications: Notification[] = [];

export class InMemoryNotificationsRepository implements NotificationRepository {
  async findManyByRecipientId(recipientID: string): Promise<Notification[]> {
    return this.notifications.filter(
      (notification) => notification.recipientID == recipientID,
    );
  }

  async countManyByRecipientId(recipientID: string): Promise<number> {
    return this.notifications.filter(
      (notification) => notification.recipientID == recipientID,
    ).length;
  }
  public notifications: Notification[] = [];

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = this.notifications.find(
      (item) => item.id == notificationId,
    );
    if (!notification) {
      return null;
    }
    return notification;
  }

  async create(notication: Notification) {
    this.notifications.push(notication);
  }
  async save(notification: Notification): Promise<void> {
    const notificationIndex = this.notifications.findIndex(
      (item) => item.id == notification.id,
    );
    if (notificationIndex >= 0) {
      this.notifications[notificationIndex] = notification;
    }
  }
}
