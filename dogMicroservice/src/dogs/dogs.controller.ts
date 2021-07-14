import {
  Controller,
  ParseIntPipe,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from '../dtos/create-dog.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { ExcludeNullInterceptor } from 'src/interceptors/exclude_null.interceptor';
import { MessagePattern } from '@nestjs/microservices';

@UseInterceptors(LoggingInterceptor)
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ExcludeNullInterceptor)
@Controller('dogs')
export class DogsController {
  constructor(private readonly dogService: DogsService) {}

  // ----------- Miscroservice Events
  @MessagePattern({ cmd: 'dog', role: 'getAllDogs' })
  async findAllDogs(): Promise<any[]> {
    return await this.dogService.getAlldogs();
  }

  @UsePipes(new ParseIntPipe())
  @MessagePattern({ cmd: 'dog', role: 'getOneDog' })
  async findOneDog(id: number): Promise<any[]> {
    return await this.dogService.getQueryDog(id);
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern({ cmd: 'dog', role: 'createDog' })
  async createDog(body: CreateDogDto): Promise<any> {
    return await this.dogService.insertDog(
      body.title,
      body.description,
      body.size,
      body.price,
    );
  }

  @UsePipes(new ValidationPipe())
  @MessagePattern({ cmd: 'dog', role: 'changeDog' })
  async changeDog(id: number, body: CreateDogDto): Promise<any> {
    return await this.dogService.updateDog(
      id,
      body.title,
      body.description,
      body.size,
      body.price,
    );
  }

  @UsePipes(new ParseIntPipe())
  @MessagePattern({ cmd: 'dog', role: 'deleteDog' })
  async deleteDog(id: number): Promise<any> {
    return await this.dogService.deleteDog(id);
  }
}
