import { Module } from '@nestjs/common';
import { SendNotification } from '@app/use-cases/send-notification';
import { DataBaseModule } from '../database/database.module';
import { NotificationsController } from './controllers/notifications.controller';
import { CancelNotification } from '@app/use-cases/cancel-notification';
import { ReadNotification } from '@app/use-cases/read-notifications';
import { UnreadNotification } from '@app/use-cases/unread-notifications';
import { CountRecipientNotification } from '@app/use-cases/count-recipient-notifications';
import { GetRecipientNotification } from '@app/use-cases/get-recipient-notifications';

@Module({
  imports: [DataBaseModule],
  controllers: [NotificationsController],
  providers: [
    SendNotification,
    CancelNotification,
    ReadNotification,
    UnreadNotification,
    CountRecipientNotification,
    GetRecipientNotification,
  ],
})
export class HttpModule {}
