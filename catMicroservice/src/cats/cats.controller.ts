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
  UseFilters,
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
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcValidationFilter } from 'src/filters/rcp_validation_filter.filters';

//TODO: Verificar todos os metodos
@UseInterceptors(LoggingInterceptor)
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ExcludeNullInterceptor)
@UseFilters(RpcValidationFilter) // TODO: Verificar se funciona assim, caso contrario e necessario meter em cada metodo
@Controller('cats')
export class CatsController {
  constructor(private readonly catService: CatService) {}

  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
  @MessagePattern({ cmd: 'cat', role: 'getAllCats' })
  async findAllCat(): Promise<any[]> {
    return await this.catService.getAllCats();
  }

  @MessagePattern({ cmd: 'cat', role: 'getOneCat' })
  async findOneCat(@Payload(new ParseIntPipe()) id: number): Promise<any[]> {
    return await this.catService.getQueryCat(id);
  }

  @MessagePattern({ cmd: 'cat', role: 'createCat' })
  async createCat(
    @Payload(new ValidationPipe()) body: CreateCatDto,
  ): Promise<any> {
    return await this.catService.insertCats(
      body.title,
      body.description,
      body.price,
    );
  }

  @MessagePattern({ cmd: 'cat', role: 'changeCat' })
  async changeCat(
    @Payload(new ParseIntPipe()) id: number,
    @Payload(new ValidationPipe()) body: CreateCatDto,
  ): Promise<any> {
    return await this.catService.updateCat(
      id,
      body.title,
      body.description,
      body.price,
    );
  }

  @MessagePattern({ cmd: 'cat', role: 'deleteCat' })
  async deleteCat(@Payload(new ParseIntPipe()) id: number): Promise<any> {
    return await this.catService.deleteCat(id);
  }
}
