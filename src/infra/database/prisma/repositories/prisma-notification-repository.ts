import { Injectable } from '@nestjs/common';
import { Notification } from '@application/entities/notification';
import { NotificationRepository } from '@application/repositories/notification-repository';
import { PrismaService } from '../prisma.service';
import { PrismaNotificationMapper } from '../mappers/prisma-notification-mapper';

@Injectable()
export class PrismaNotificationRepository extends NotificationRepository {
  constructor(private prismaService: PrismaService) {
    super();
  }

  async create(notification: Notification): Promise<void> {
    const raw = PrismaNotificationMapper.toPrisma(notification);

    await this.prismaService.notification.create({
      data: raw,
    });
  }

  async findById(id: string): Promise<Notification | null> {
    const notificationRaw = await this.prismaService.notification.findUnique({
      where: {
        id,
      },
    });

    if (!notificationRaw) {
      return null;
    }

    return PrismaNotificationMapper.toDomain(notificationRaw);
  }

  async save(notification: Notification): Promise<void> {
    const rawNotification = PrismaNotificationMapper.toPrisma(notification);

    console.log({ rawNotification });

    await this.prismaService.notification.update({
      where: {
        id: rawNotification.id,
      },
      data: rawNotification,
    });
  }

  async countManyByRecipientId(recipientId: any): Promise<number> {
    const count = await this.prismaService.notification.count({
      where: {
        recipientId,
      },
    });

    return count;
  }

  async findManyByRecipientId(recipientId: any): Promise<Notification[]> {
    const notification = await this.prismaService.notification.findMany({
      where: {
        recipientId,
      },
    });

    return notification.map(PrismaNotificationMapper.toDomain);
  }
}
