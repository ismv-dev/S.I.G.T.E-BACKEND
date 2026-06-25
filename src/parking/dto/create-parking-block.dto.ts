import { IsInt, IsNotEmpty, IsOptional, IsString, Min } from 'class-validator';

export class CreateParkingBlockDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  capacity: number;

  @IsOptional()
  isDefault?: boolean;
}
