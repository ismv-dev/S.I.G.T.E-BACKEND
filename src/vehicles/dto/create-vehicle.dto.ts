import { IsBoolean, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateVehicleDto {
  @IsNotEmpty()
  @IsString()
  plate: string;

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

  @IsNotEmpty()
  @IsString()
  ownerId: string;
}
