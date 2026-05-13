import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserCreateDto } from './dto/user-create.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UserCreateController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'User created successfully.', type: UserCreateDto })
  async createUser(@Body() userData: UserCreateDto): Promise<void> {
    return this.userService.createUser(userData);
  }
}
