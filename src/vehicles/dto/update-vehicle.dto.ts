import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateVehicleDto {
  @IsOptional()
  @IsString()
  plate?: string;

  @IsOptional()
  @IsString()
  make?: string;

  @IsOptional()
  @IsString()
  model?: string;

  @IsOptional()
  @IsString()
  color?: string;

  @IsOptional()
  @IsBoolean()
  authorized?: boolean;

  @IsOptional()
  @IsBoolean()
  blacklisted?: boolean;

  @IsOptional()
  @IsString()
  currentBlockId?: string;
}
