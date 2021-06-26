import { Controller, Get, Render, Res, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //Static
  @Get()
  @Render('index')
  getHello() {
    return { message: 'Hello Cats!' };
  }

  //Dynamic
  @Get('ola')
  root(@Res() res: Response) {
    const data = this.appService.getViewName();
    return res.render(data[0], data[1]);
  }
}
