import { Injectable } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UsersService {
  private users: Partial<UserDto>[] = [
    { id: 1, username: 'john_doe', email: 'john@example.com', role_id: 1 },
    { id: 2, username: 'jane_doe', email: 'jane@example.com', role_id: 2 }
  ];

  getUsers(query: Partial<UserDto>): Partial<UserDto[]> {
    const filteredUsers = this.users.filter(user => {
      return (!query.id || user.id === query.id) &&
             (!query.username || user.username === query.username) &&
             (!query.email || user.email === query.email) &&
             (!query.role_id || user.role_id === query.role_id);
    });
    return filteredUsers;
  }
}