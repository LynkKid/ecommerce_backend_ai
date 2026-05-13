import { IsArray, IsNumber, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class ProductListDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProductDto)
  data: ProductDto[];

  @IsNumber()
  total: number;

  @IsNumber()
  limit: number;

  @IsNumber()
  offset: number;
}
