import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateParkingBlockDto } from './dto/create-parking-block.dto';
import { UpdateParkingBlockDto } from './dto/update-parking-block.dto';
import { ParkingService } from './parking.service';

@Controller('parking')
export class ParkingController {
  constructor(private parkingService: ParkingService) {}

  @Get()
  async findAll() {
    return this.parkingService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.parkingService.findOne(id);
  }

  @Post()
  async create(@Body() createParkingBlockDto: CreateParkingBlockDto) {
    return this.parkingService.create(createParkingBlockDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateParkingBlockDto: UpdateParkingBlockDto) {
    return this.parkingService.update(id, updateParkingBlockDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.parkingService.remove(id);
  }
}
