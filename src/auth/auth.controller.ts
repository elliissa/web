import { Controller, Post, Body, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() user: User) {
    return this.authService.login(user);
  }

  @Post('signup')
  signup(@Body() user: User) {
    return this.authService.signup(user);
  }
}
