import {
  Controller,
  Get,
  Post,
  Body,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { AuthDto } from '../dtos/auth.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { ExcludeNullInterceptor } from '../interceptors/exclude_null.interceptor';

@UseInterceptors(LoggingInterceptor)
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ExcludeNullInterceptor)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // ----------- Miscroservice Events
  @MessagePattern({ cmd: 'token', role: 'auth' })
  async isVerifyToken(data: any): Promise<boolean> {
    console.log(data);
    return await this.authService.verifyAuth(data.token).then(
      function (valor) {
        console.log(valor);
        if (valor) {
          return true;
        } else {
          return false;
        }
      },
      function (motivo) {
        return false;
      },
    );
  }

  // ----------- Server events
  @Get()
  async isAuthenticated(@Query('key') key: string) {
    return this.authService.getUser(key);
  }

  @Post('/login')
  async loginAuth(@Body(new ValidationPipe()) completeBody: AuthDto) {
    return this.authService.login(completeBody.username, completeBody.password);
  }

  @Get('logoff')
  async logoffAuth(@Query('key') key: string) {
    return this.authService.logoff(key);
  }

  @Post('register')
  async registerAuth(@Body(new ValidationPipe()) completeBody: AuthDto) {
    return this.authService.register(
      completeBody.username,
      completeBody.password,
    );
  }

  @Get('remove')
  async removeUser(@Query('key') key: string) {
    return this.authService.deleteUser(key);
  }
}
