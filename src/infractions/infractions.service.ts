import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class InfractionsService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.infraction.findMany({
      include: {
        vehicle: true,
        user: true,
        guard: true,
      },
    });
  }

  async findOne(id: string) {
    const infraction = await this.prisma.infraction.findUnique({
      where: { id },
      include: {
        vehicle: true,
        user: true,
        guard: true,
      },
    });
    if (!infraction) {
      throw new NotFoundException('Infraction not found');
    }
    return infraction;
  }

  async create(data: any) {
    return this.prisma.infraction.create({ data });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.infraction.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.infraction.delete({ where: { id } });
    return { deleted: true };
  }
}
