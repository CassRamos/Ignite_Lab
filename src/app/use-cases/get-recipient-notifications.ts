import { Notification } from '@app/entities/notification';
import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notifications-repository';

interface GetRecipientNotificationRequest {
  recipientID: string;
}

interface GetRecipientNotificationResponse {
  notifications: Notification[];
}

@Injectable()
export class GetRecipientNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: GetRecipientNotificationRequest,
  ): Promise<GetRecipientNotificationResponse> {
    const { recipientID } = request;

    const notifications =
      await this.notificationRepository.findManyByRecipientId(recipientID);
    return { notifications };
  }
}
