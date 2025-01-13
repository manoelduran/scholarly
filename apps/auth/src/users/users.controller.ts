import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto, CurrentUser, UserDocument } from '@app/common';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async listUsers() {
    return this.usersService.list();
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  async getUser(@CurrentUser() user: UserDocument) {
    return user;
  }
}
