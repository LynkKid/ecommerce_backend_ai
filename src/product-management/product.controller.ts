import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ProductService } from './product.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { ProductListDto } from './dto/product-list.dto';

@ApiTags('Products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Product list retrieved successfully.', type: ProductListDto })
  async getProducts(@Query('minPrice') minPrice?: number, @Query('maxPrice') maxPrice?: number, @Query('limit') limit?: number, @Query('offset') offset?: number): Promise<ProductListDto> {
    return this.productService.getProducts(minPrice, maxPrice, limit, offset);
  }
}
