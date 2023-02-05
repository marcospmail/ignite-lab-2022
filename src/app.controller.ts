import { Controller, Get, Post } from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from './prisma.service';

@Controller()
export class AppController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  list() {
    return this.prismaService.notification.findMany();
  }

  @Post()
  create() {
    return this.prismaService.notification.create({
      data: {
        id: randomUUID(),
        recipientId: randomUUID(),
        category: 'Category qualquer',
        content: 'Content qualquer',
      },
    });
  }
}
