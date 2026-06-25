import { IsBoolean, IsInt, IsOptional, IsString, Min } from 'class-validator';

export class UpdateParkingBlockDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsInt()
  @Min(0)
  capacity?: number;

  @IsOptional()
  @IsBoolean()
  isDefault?: boolean;
}
