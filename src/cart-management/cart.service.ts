import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CartDto } from './dto/cart.dto';

@Injectable()
export class CartService {
  constructor(private readonly prisma: PrismaService) {}

  async getCart(): Promise<CartDto> {
    const cartItems = await this.prisma.cartItem.findMany({ where: { userId: <userId> } });
    const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    return {
      items: cartItems,
      totalPrice,
    };
  }
}
