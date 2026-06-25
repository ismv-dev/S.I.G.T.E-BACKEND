import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateAccessLogDto } from './dto/create-access-log.dto';
import { UpdateAccessLogDto } from './dto/update-access-log.dto';
import { AccessService } from './access.service';

@Controller('access')
export class AccessController {
  constructor(private accessService: AccessService) {}

  @Get()
  async findAll() {
    return this.accessService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.accessService.findOne(id);
  }

  @Post()
  async create(@Body() createAccessLogDto: CreateAccessLogDto) {
    return this.accessService.create(createAccessLogDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateAccessLogDto: UpdateAccessLogDto) {
    return this.accessService.update(id, updateAccessLogDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.accessService.remove(id);
  }
}
