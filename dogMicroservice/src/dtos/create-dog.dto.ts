import {
  IsString,
  IsInt,
  Min,
  Max,
  MinLength,
  IsNumber,
} from 'class-validator';

export class CreateDogDto {
  @IsString()
  @MinLength(5, {
    message: 'Title must be longer than or equal to 5 characters',
  })
  title: string;

  @IsString()
  @MinLength(5, {
    message: 'Description must be longer than or equal to 5 characters',
  })
  description: string;

  @IsNumber()
  @Min(1)
  @Max(5)
  size: number;

  @IsNumber()
  @Min(1)
  @Max(100)
  price: number;
}
