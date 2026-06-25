import { IsBoolean, IsEnum, IsOptional, IsString } from 'class-validator';
import { AccessDirection, AccessMethod } from '@prisma/client';

export class UpdateAccessLogDto {
  @IsOptional()
  @IsEnum(AccessMethod)
  method?: AccessMethod;

  @IsOptional()
  @IsEnum(AccessDirection)
  direction?: AccessDirection;

  @IsOptional()
  @IsBoolean()
  authorized?: boolean;

  @IsOptional()
  @IsString()
  note?: string;
}
