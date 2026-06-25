import { IsBoolean, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { AccessDirection, AccessMethod } from '@prisma/client';

export class CreateAccessLogDto {
  @IsNotEmpty()
  @IsString()
  vehicleId: string;

  @IsOptional()
  @IsString()
  userId?: string;

  @IsOptional()
  @IsString()
  guardId?: string;

  @IsEnum(AccessMethod)
  method: AccessMethod;

  @IsEnum(AccessDirection)
  direction: AccessDirection;

  @IsOptional()
  @IsString()
  blockId?: string;

  @IsOptional()
  @IsBoolean()
  authorized?: boolean;

  @IsOptional()
  @IsString()
  note?: string;
}
