import { Controller, Get, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CartDto } from './dto/cart.dto';

@ApiTags('Carts')
@Controller('carts')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Cart retrieved successfully.', type: CartDto })
  async getCart(): Promise<CartDto> {
    return this.cartService.getCart();
  }
}
