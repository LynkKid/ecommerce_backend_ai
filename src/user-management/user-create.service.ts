import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserCreateDto } from './dto/user-create.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserCreateService {
  constructor(private readonly prisma: PrismaService) {}

  async createUser(userData: UserCreateDto): Promise<void> {
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    delete userData.password; // Remove password from the object before saving

    await this.prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });
  }
}
