import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UserListDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => UserDto)
  data: UserDto[];

  @IsInt()
  total: number;

  @IsInt()
  limit: number;

  @IsInt()
  offset: number;
}

export class UserDto {
  @IsString()
  id: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsOptional()
  @IsString()
  role?: string;
}
