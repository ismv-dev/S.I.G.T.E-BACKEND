import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VehiclesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.vehicle.findMany({
      include: {
        owner: { select: { id: true, email: true, name: true, universityId: true, role: true } },
        currentBlock: true,
      },
    });
  }

  async findOne(id: string) {
    const vehicle = await this.prisma.vehicle.findUnique({
      where: { id },
      include: {
        owner: { select: { id: true, email: true, name: true, universityId: true, role: true } },
        currentBlock: true,
      },
    });
    if (!vehicle) {
      throw new NotFoundException('Vehicle not found');
    }
    return vehicle;
  }

  async create(data: any) {
    return this.prisma.vehicle.create({ data });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.vehicle.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.vehicle.delete({ where: { id } });
    return { deleted: true };
  }
}
