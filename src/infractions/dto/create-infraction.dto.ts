import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { InfractionType } from '@prisma/client';

export class CreateInfractionDto {
  @IsNotEmpty()
  @IsString()
  vehicleId: string;

  @IsNotEmpty()
  @IsString()
  guardId: string;

  @IsEnum(InfractionType)
  type: InfractionType;

  @IsNotEmpty()
  @IsString()
  description: string;
}
