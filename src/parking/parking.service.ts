import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ParkingService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.parkingBlock.findMany({ include: { vehicles: true, accessLogs: true } });
  }

  async findOne(id: string) {
    const block = await this.prisma.parkingBlock.findUnique({
      where: { id },
      include: { vehicles: true, accessLogs: true },
    });
    if (!block) {
      throw new NotFoundException('Parking block not found');
    }
    return block;
  }

  async create(data: any) {
    return this.prisma.parkingBlock.create({ data });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.parkingBlock.update({ where: { id }, data });
  }

  async remove(id: string) {
    await this.findOne(id);
    await this.prisma.parkingBlock.delete({ where: { id } });
    return { deleted: true };
  }
}
