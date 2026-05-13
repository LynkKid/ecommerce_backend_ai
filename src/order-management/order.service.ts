import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';

@Injectable()
export class OrderService {
  constructor(private readonly prisma: PrismaService) {}

  async createOrder(createOrderDto: CreateOrderDto): Promise<OrderDto> {
    const orderItems = await this.prisma.orderItem.findMany({ where: { id: { in: createOrderDto.items } } });
    const totalAmount = orderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Validate payment method
    if (!this.validatePaymentMethod(createOrderDto.paymentMethod)) {
      throw new Error('Invalid payment method');
    }

    const order = await this.prisma.order.create({ data: { items: orderItems, totalAmount } });

    return {
      items: orderItems,
      totalAmount,
    };
  }

  private validatePaymentMethod(method: string): boolean {
    // Implement payment method validation logic here
    return ['credit_card', 'debit_card', 'paypal'].includes(method);
  }
}
