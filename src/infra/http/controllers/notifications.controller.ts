import { CancelNotification } from '@app/use-cases/cancel-notification';
import { CountRecipientNotification } from '@app/use-cases/count-recipient-notifications';
import { GetRecipientNotification } from '@app/use-cases/get-recipient-notifications';
import { ReadNotification } from '@app/use-cases/read-notifications';
import { UnreadNotification } from '@app/use-cases/unread-notifications';
import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { SendNotification } from 'src/app/use-cases/send-notification';
import { CreateNotificationBody } from '../dtos/create.notification.body';
import { NotificationViewModel } from '../view-models/notification-view-model';

@Controller('notifications')
export class NotificationsController {
  constructor(
    private sendNotification: SendNotification,
    private cancelNotification: CancelNotification,
    private readNotification: ReadNotification,
    private unreadNotification: UnreadNotification,
    private countRecipientNotification: CountRecipientNotification,
    private getRecipientNotification: GetRecipientNotification,
  ) {}

  @Patch(':id/cancel')
  async cancel(@Param('id') id: string) {
    await this.cancelNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/read')
  async read(@Param('id') id: string) {
    await this.readNotification.execute({
      notificationId: id,
    });
  }

  @Patch(':id/unread')
  async unread(@Param('id') id: string) {
    await this.unreadNotification.execute({
      notificationId: id,
    });
  }

  @Get('count/from/recipientID')
  async countFromRecipient(@Param('recipientID ') recipientID: string) {
    const { count } = await this.countRecipientNotification.execute({
      recipientID,
    });
    return { count };
  }

  @Get('count/from/recipientID')
  async getFromRecipient(@Param('recipientID ') recipientID: string) {
    const { notifications } = await this.getRecipientNotification.execute({
      recipientID,
    });
    return { notifications: notifications.map(NotificationViewModel.toHTTP) };
  }

  @Post()
  async create(@Body() body: CreateNotificationBody) {
    const { recipientID, content, category } = body;

    const { notification } = await this.sendNotification.execute({
      recipientID,
      content,
      category,
    });
    return { notification: NotificationViewModel.toHTTP(notification) };
  }
}
