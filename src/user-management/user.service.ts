import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserListDto } from './dto/user-list.dto';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers(limit?: number, offset?: number): Promise<UserListDto> {
    const total = await this.prisma.user.count();
    const users = await this.prisma.user.findMany({ take: limit, skip: offset });

    return { data: users, total, limit: limit || 10, offset: offset || 0 };
  }
}
