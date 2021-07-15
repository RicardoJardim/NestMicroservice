import {
  Controller,
  ParseIntPipe,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from '../dtos/create-dog.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { ExcludeNullInterceptor } from 'src/interceptors/exclude_null.interceptor';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { RpcValidationFilter } from 'src/filters/rcp_validation_filter.filters';

@UseInterceptors(LoggingInterceptor)
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ExcludeNullInterceptor)
@UseFilters(RpcValidationFilter) // TODO: Verificar se funciona assim, caso contrario e necessario meter em cada metodo
@Controller('dogs')
export class DogsController {
  constructor(private readonly dogService: DogsService) {}

  // ----------- Miscroservice Events
  @MessagePattern({ cmd: 'dog', role: 'getAllDogs' })
  async findAllDogs(): Promise<any[]> {
    return await this.dogService.getAlldogs();
  }

  @MessagePattern({ cmd: 'dog', role: 'getOneDog' })
  async findOneDog(@Payload(new ParseIntPipe()) id: number): Promise<any[]> {
    return await this.dogService.getQueryDog(id);
  }

  @MessagePattern({ cmd: 'dog', role: 'createDog' })
  async createDog(
    @Payload(new ValidationPipe()) body: CreateDogDto,
  ): Promise<any> {
    return await this.dogService.insertDog(
      body.title,
      body.description,
      body.size,
      body.price,
    );
  }

  @MessagePattern({ cmd: 'dog', role: 'changeDog' })
  async changeDog(
    @Payload(new ParseIntPipe()) id: number,
    @Payload(new ValidationPipe()) body: CreateDogDto,
  ): Promise<any> {
    return await this.dogService.updateDog(
      id,
      body.title,
      body.description,
      body.size,
      body.price,
    );
  }

  @MessagePattern({ cmd: 'dog', role: 'deleteDog' })
  async deleteDog(@Payload(new ParseIntPipe()) id: number): Promise<any> {
    return await this.dogService.deleteDog(id);
  }
}
