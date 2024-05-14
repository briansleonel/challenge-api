import { IsEnum, IsOptional, IsString } from 'class-validator';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { Order } from 'src/common/enums/order.enum';

export class ProductQueryDto extends PaginationQueryDto {
  @IsString()
  @IsOptional()
  text?: string = '';

  @IsOptional()
  @IsEnum(Order)
  order?: Order = Order.DESC;
}
