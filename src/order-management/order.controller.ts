import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrderDto } from './dto/order.dto';

@ApiTags('Orders')
@Controller('orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Order created successfully.', type: OrderDto })
  async createOrder(@Body() createOrderDto: CreateOrderDto): Promise<OrderDto> {
    return this.orderService.createOrder(createOrderDto);
  }
}
