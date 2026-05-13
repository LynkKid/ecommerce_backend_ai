import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UserListDto } from './dto/user-list.dto';
import { ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '../auth/auth.guard';

@ApiTags('Users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiQuery({ name: 'offset', required: false, type: Number })
  @ApiResponse({ status: 200, description: 'User list retrieved successfully.', type: UserListDto })
  async getUsers(@Query('limit') limit?: number, @Query('offset') offset?: number): Promise<UserListDto> {
    return this.userService.getUsers(limit, offset);
  }
}
