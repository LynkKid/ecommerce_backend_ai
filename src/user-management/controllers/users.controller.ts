import { Controller, Get, Query } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(@Query() query: Partial<UserDto>): string {
    return JSON.stringify(query);
  }
}