import { Controller, Post, Body } from '@nestjs/common';
import { LoginService } from './login.service';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) {}

  @Post()
  async loginUser(
    @Body('email') email: string,
    @Body('password') plainTextPassword: string,
  ) {
    return await this.loginService.loginUser(email, plainTextPassword);
  }
}
