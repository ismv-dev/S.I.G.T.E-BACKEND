import { IsEnum, IsOptional, IsString } from 'class-validator';
import { InfractionStatus } from '@prisma/client';

export class UpdateInfractionDto {
  @IsOptional()
  @IsEnum(InfractionStatus)
  status?: InfractionStatus;

  @IsOptional()
  @IsString()
  description?: string;
}
