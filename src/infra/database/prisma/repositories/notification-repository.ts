import { Injectable } from '@nestjs/common';
import { Notification } from '../../../../app/entities/notification';
import { NotificationRepository } from '../../../../app/repositories/notifications-repository';
import { PrismaNotificationMapper } from '../mappers/prisma-notification.mapper';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PrismaNotificationRepository implements NotificationRepository {
  constructor(private prisma: PrismaService) {}

  async findById(notificationId: string): Promise<Notification | null> {
    const notification = await this.prisma.notification.findUnique({
      where: {
        id: notificationId,
      },
    });

    if (!notification) {
      return null;
    }
    return PrismaNotificationMapper.toDomain(notification);
  }

  async findManyByRecipientId(recipientID: string): Promise<Notification[]> {
    const notification = await this.prisma.notification.findMany({
      where: {
        recipientID,
      },
    });
    return notification.map(PrismaNotificationMapper.toDomain);
  }

  async countManyByRecipientId(recipientID: string): Promise<number> {
    const count = await this.prisma.notification.count({
      where: {
        recipientID,
      },
    });
    return count;
  }

  async save(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.update({
      where: {
        id: raw.id,
      },
      data: raw,
    });
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prisma.notification.create({
      data: raw,
    });
  }
}
