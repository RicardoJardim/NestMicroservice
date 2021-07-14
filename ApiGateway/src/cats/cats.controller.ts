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
import { CatsService } from './cats.service';
import { ValidationPipe } from '../pipes/validation.pipe';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { ExcludeNullInterceptor } from 'src/interceptors/exclude_null.interceptor';
import { AuthGuard } from '../guards/auth.guard';

@UseInterceptors(LoggingInterceptor)
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ExcludeNullInterceptor)
@UseGuards(AuthGuard)
@Controller('api/cats')
export class CatsController {
  constructor(private readonly catService: CatsService) {}

  @Get()
  async findAll(): Promise<any[]> {
    return await this.catService.getAllCats();
  }

  @Get()
  async findOne(@Query('id', ParseIntPipe) id: number) {
    return this.catService.getQueryCat(id);
  }

  @Get(':id')
  findSingle(@Param('id', ParseIntPipe) prodId: number) {
    return this.catService.getQueryCat(prodId);
  }

  @Post()
  async addCat(@Body() completeBody: {}) {
    return await this.catService.insertCat(completeBody);
  }

  @Patch(':id')
  async changeSingle(
    @Param('id', ParseIntPipe) prodId: number,
    @Body() completeBody: {},
  ) {
    return await this.catService.updateCat(prodId, completeBody);
  }

  @Delete(':id')
  async deleteSingle(@Param('id', ParseIntPipe) prodId: number) {
    return await this.catService.deleteCat(prodId);
  }
}
