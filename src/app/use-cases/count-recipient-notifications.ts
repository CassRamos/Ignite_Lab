import { Injectable } from '@nestjs/common';
import { NotificationRepository } from '../repositories/notifications-repository';
import { NotificationNotFound } from './errors/notification-not-found';

interface CountRecipientNotificationRequest {
  recipientID: string;
}

interface CountRecipientNotificationResponse {
  count: number;
}

@Injectable()
export class CountRecipientNotification {
  constructor(private notificationRepository: NotificationRepository) {}

  async execute(
    request: CountRecipientNotificationRequest,
  ): Promise<CountRecipientNotificationResponse> {
    const { recipientID } = request;

    const count = await this.notificationRepository.countManyByRecipientId(
      recipientID,
    );
    return { count };
  }
}
