import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { ProductListDto } from './dto/product-list.dto';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getProducts(minPrice?: number, maxPrice?: number, limit?: number, offset?: number): Promise<ProductListDto> {
    const where = minPrice || maxPrice ? { price: {} } : {};
    if (minPrice) where.price = Object.assign(where.price, { gte: minPrice });
    if (maxPrice) where.price = Object.assign(where.price, { lte: maxPrice });

    const total = await this.prisma.product.count({ where });
    const products = await this.prisma.product.findMany({ where, take: limit, skip: offset });

    return {
      data: products,
      total,
      limit,
      offset,
    };
  }
}
