import { Injectable } from '@nestjs/common';
import { Content } from '../entities/content';
import { Notification } from '../entities/notification';
import { NotificationRepository } from '../repositories/notifications-repository';

interface SendNotificationsRequest {
  recipientID: string;
  content: string;
  category: string;
}

interface SendNotificationResponse {
  notification: Notification;
}

@Injectable()
export class SendNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: SendNotificationsRequest,
  ): Promise<SendNotificationResponse> {
    const { recipientID, content, category } = request;

    const notification = new Notification({
      recipientID,
      content: new Content(content),
      category,
    });

    await this.notificationRepository.create(notification);

    return {
      notification,
    };
  }
}
