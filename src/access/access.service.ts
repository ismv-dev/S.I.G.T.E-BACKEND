import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AccessService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.accessLog.findMany({
      include: {
        vehicle: true,
        user: true,
        guard: true,
        block: true,
      },
    });
  }

  async findOne(id: string) {
    const log = await this.prisma.accessLog.findUnique({
      where: { id },
      include: {
        vehicle: true,
        user: true,
        guard: true,
        block: true,
      },
    });
    if (!log) {
      throw new NotFoundException('Access log not found');
    }
    return log;
  }

  async create(data: any) {
    return this.prisma.accessLog.create({ data });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.accessLog.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.accessLog.delete({ where: { id } });
    return { deleted: true };
  }
}
