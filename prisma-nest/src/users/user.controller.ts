import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User as UserModel, Post as PostModel } from '@prisma/client';
import { UserDTO } from './user.dto';

@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService,
  ) {}
  //create user
  @Post('user')
  async signupUser(
    @Body() userData: UserDTO,
  ): Promise<UserModel> {
    return this.userService.createUser(userData);
  }
}
