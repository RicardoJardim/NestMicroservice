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
import { CreateDogDto } from '../dtos/create-dog.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { ExcludeNullInterceptor } from 'src/interceptors/exclude_null.interceptor';
import { AuthGuard } from '../guards/auth.guard';
import { ClientProxy } from '@nestjs/microservices';

@UseInterceptors(LoggingInterceptor)
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ExcludeNullInterceptor)
@UseGuards(AuthGuard)
@Controller('api/dogs')
export class DogsController {
  constructor(
    private readonly catService: DogsService,
    private readonly httpService: HttpService,
  ) {}

  // @MessagePattern({ cmd: 'sum' })
  // async accumulate(data: number[]): Promise<number> {
  //   return (data || []).reduce((a, b) => a + b);
  // }

  // @EventPattern('sum2')
  // async accumulate2(data: number[]): Promise<number> {
  //   return (data || []).reduce((a, b) => a + b);
  // }

  @Get('/cats')
  async findCatsDogs(): Promise<any> {
    const headersRequest = {
      Authorization: `Bearer 12345`,
    };

    const cats: any = await this.httpService
      .get('http://localhost:3000/api/cats', { headers: headersRequest })
      .toPromise();

    const dogs: any = await this.catService.getAllCats();
    return { dogs: dogs, cats: cats.data };
  }

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
    return this.catService.getSingleCat(prodId);
  }

  @Patch(':id')
  changeSingle(
    @Param('id', ParseIntPipe) prodId: number,
    @Body(new ValidationPipe()) completeBody: CreateDogDto,
  ) {
    this.catService.updateCat(
      prodId,
      completeBody.title,
      completeBody.description,
      completeBody.size,
      completeBody.price,
    );
    return null;
  }

  @Delete(':id')
  deleteSingle(@Param('id', ParseIntPipe) prodId: number) {
    return this.catService.deleteCat(prodId);
  }

  /*  @Post()
    addCat(@Body('title') catTitle:string,@Body('description') catDes:string, @Body('price') catPrice:number): any{
        this.catService.insertCats
    } */
  @Post()
  addCat(@Body(new ValidationPipe()) completeBody: CreateDogDto) {
    let id = this.catService.insertCats(
      completeBody.title,
      completeBody.description,
      completeBody.size,
      completeBody.price,
    );
    return { id: id };
  }
}
