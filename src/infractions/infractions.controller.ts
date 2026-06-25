import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateInfractionDto } from './dto/create-infraction.dto';
import { UpdateInfractionDto } from './dto/update-infraction.dto';
import { InfractionsService } from './infractions.service';

@Controller('infractions')
export class InfractionsController {
  constructor(private infractionsService: InfractionsService) {}

  @Get()
  async findAll() {
    return this.infractionsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.infractionsService.findOne(id);
  }

  @Post()
  async create(@Body() createInfractionDto: CreateInfractionDto) {
    return this.infractionsService.create(createInfractionDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateInfractionDto: UpdateInfractionDto) {
    return this.infractionsService.update(id, updateInfractionDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.infractionsService.remove(id);
  }
}
