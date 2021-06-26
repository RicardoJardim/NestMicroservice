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
} from '@nestjs/common';
import { CatService } from './cats.service';
import { CreateCatDto } from '../dtos/create-cat.dto';
import { ValidationPipe } from '../pipes/validation.pipe';
import { LoggingInterceptor } from '../interceptors/logging.interceptor';
import { TransformInterceptor } from '../interceptors/transform.interceptor';
import { ExcludeNullInterceptor } from 'src/interceptors/exclude_null.interceptor';
import { Roles } from '../decorators/roles.decorator';
import { AuthGuard } from '../guards/auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Role } from '../enums/role.enum';

@UseInterceptors(LoggingInterceptor)
@UseInterceptors(TransformInterceptor)
@UseInterceptors(ExcludeNullInterceptor)
@UseGuards(new AuthGuard())
@Controller('api/cats')
export class CatsController {
  constructor(private readonly catService: CatService) {}

  @Get()
  @Roles(Role.Admin)
  @UseGuards(RolesGuard)
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
  @Roles(Role.Admin)
  changeSingle(
    @Param('id', ParseIntPipe) prodId: number,
    @Body(new ValidationPipe()) completeBody: CreateCatDto,
  ) {
    this.catService.updateCat(
      prodId,
      completeBody.title,
      completeBody.description,
      completeBody.price,
    );
    return null;
  }

  @Delete(':id')
  @Roles(Role.Admin)
  deleteSingle(@Param('id', ParseIntPipe) prodId: number) {
    return this.catService.deleteCat(prodId);
  }

  /*  @Post()
    addCat(@Body('title') catTitle:string,@Body('description') catDes:string, @Body('price') catPrice:number): any{
        this.catService.insertCats
    } */
  @Post()
  @Roles(Role.Admin)
  addCat(@Body(new ValidationPipe()) completeBody: CreateCatDto) {
    let id = this.catService.insertCats(
      completeBody.title,
      completeBody.description,
      completeBody.price,
    );
    return { id: id };
  }
}
