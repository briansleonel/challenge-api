import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNumber,
  IsPositive,
  IsString,
  MinLength,
} from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Product name' })
  @IsString()
  @MinLength(4)
  name: string;

  @ApiProperty({ description: 'Product description' })
  @IsString()
  @MinLength(4)
  description: string;

  @ApiProperty({ description: 'Product price' })
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ description: 'Product stock' })
  @IsInt()
  @IsPositive()
  stock: number;
}
