import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
  ParseIntPipe,
  UseInterceptors,
  UseGuards,
  Inject,
  HttpService,
} from '@nestjs/common';
import { DogsService } from './dogs.service';

import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { ExcludeNullInterceptor } from 'src/interceptors/exclude_null.interceptor';
import { AuthGuard } from '../guards/auth.guard';

@UseInterceptors(LoggingInterceptor)
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ExcludeNullInterceptor)
@UseGuards(AuthGuard)
@Controller('api/dogs')
export class DogsController {
  constructor(private readonly dogService: DogsService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return await this.dogService.getAllDogs();
  }

  @Get()
  async findOne(@Query('id', ParseIntPipe) id: number) {
    return this.dogService.getQueryDog(id);
  }

  @Get(':id')
  async findSingle(@Param('id', ParseIntPipe) prodId: number) {
    return await this.dogService.getQueryDog(prodId);
  }

  @Post()
  async addOne(@Body() completeBody: {}) {
    return await this.dogService.insertDog(completeBody);
  }

  @Patch(':id')
  async changeSingle(
    @Param('id', ParseIntPipe) prodId: number,
    @Body() completeBody: {},
  ) {
    return await this.dogService.updateDog(prodId, completeBody);
  }

  @Delete(':id')
  async deleteSingle(@Param('id', ParseIntPipe) prodId: number) {
    return await this.dogService.deleteDog(prodId);
  }
}
