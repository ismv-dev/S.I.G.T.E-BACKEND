import { Module } from '@nestjs/common';
import { InfractionsService } from './infractions.service';
import { InfractionsController } from './infractions.controller';

@Module({
  controllers: [InfractionsController],
  providers: [InfractionsService],
})
export class InfractionsModule {}
