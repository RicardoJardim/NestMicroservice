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
  UsePipes,
} from '@nestjs/common';
import { CatService } from './cats.service';
import { CreateCatDto } from '../dtos/create-cat.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { ExcludeNullInterceptor } from 'src/interceptors/exclude_null.interceptor';
import { Roles } from '../decorators/roles.decorator';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../enums/role.enum';
import { MessagePattern } from '@nestjs/microservices';

@UseInterceptors(LoggingInterceptor)
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ExcludeNullInterceptor)
@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatService) {}

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @MessagePattern({ cmd: 'cat', role: 'getAllCats' })
  async findAllDogs(): Promise<any[]> {
    return await this.catService.getAllCats();
  }

  @UsePipes(new ParseIntPipe())
  @MessagePattern({ cmd: 'cat', role: 'getOneCat' })
  async findOneDog(id: number): Promise<any[]> {
    return await this.catService.getQueryCat(id);
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern({ cmd: 'cat', role: 'createCat' })
  async createDog(body: CreateCatDto): Promise<any> {
    return await this.catService.insertCats(
      body.title,
      body.description,
      body.price,
    );
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern({ cmd: 'cat', role: 'changeCat' })
  async changeDog(id: number, body: CreateCatDto): Promise<any> {
    return await this.catService.updateCat(
      id,
      body.title,
      body.description,
      body.price,
    );
  }

  @UsePipes(new ParseIntPipe())
  @MessagePattern({ cmd: 'cat', role: 'deleteCat' })
  async deleteDog(id: number): Promise<any> {
    return await this.catService.deleteCat(id);
  }
}
