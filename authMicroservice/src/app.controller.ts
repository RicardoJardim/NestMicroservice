import { Controller, Get, Render, Res, UseInterceptors } from '@nestjs/common';
import { Response } from 'express';
import { AppService } from './app.service';

@Controller()
export class AppController {}
